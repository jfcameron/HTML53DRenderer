// © 2017 Joseph Cameron - All Rights Reserved
// Project: HTML53DRenderer
// Created on 2017-12-20.

// Resources inc
import "favicon.ico"
import "index.html"
import "style.css"

import "Awesome.png"
import "Blocky.png"
import "brick.png"
import "grass.png"

// Engine inc
import IntervalTimer from "Engine/Time/IntervalTimer"
import AnimationTimer from "Engine/Time/AnimationTimer"
import IdleTimer from "Engine/Time/IdleTimer"
import Debug from "Engine/Debug"
import Exceptions from "Engine/Debug/Exceptions"
import Vector2 from "Engine/Math/Vector2"
import Vector3 from "Engine/Math/Vector3"
import Color from "Engine/Graphics/Color"
import Colors from "Engine/Graphics/Colors"
import GraphicsObject from "Engine/Graphics/GraphicsObject"
import Shapes from "Engine/Graphics/Shapes"
import Sprite from "Engine/Graphics/Sprite"
import Keyboard from "Engine/Input/Keyboard"
import Mouse from "Engine/Input/Mouse"
import Gamepads from "Engine/Input/Gamepads"
import Camera from "Engine/Graphics/Camera"
import Scenegraph from "Engine/Graphics/Scenegraph"

// GDK inc
import DebugCameraController from "GDK/Debug/DebugCameraController"

// Adhoc

const TAG: string = "Main";

//*****************
// Global variables
//*****************
//Data
var time = 0.0;
//Object references
var webGLWindow: any         = null; //Reference to the gl context
var shaderProgram: any       = null; //Reference to the shader program used to render triangle
var triangleVertexArray: any = null; //Reference to the VBO containing Triangle vertex data
var cubeTexture: any         = null;
var cubeImage: any           = null;
var clearColor = [0.25,0.25,0.5,1.0];
	
//**************
//Shader sources
//**************
var vertexSource = `
attribute highp vec3 vPos;
attribute lowp  vec2 vUV;

varying lowp vec2 v_UV;

uniform   highp float _Time;

void main()
{
    highp vec4 position = vec4(vPos,1.0);
    {
        mat4 rotationMatrix;
        rotationMatrix[0][0] = cos(_Time); rotationMatrix[1][0] =-sin(_Time); rotationMatrix[2][0] = 0.0 ; rotationMatrix[3][0] = 0.0;
        rotationMatrix[0][1] = sin(_Time); rotationMatrix[1][1] = cos(_Time); rotationMatrix[2][1] = 0.0 ; rotationMatrix[3][1] = 0.0;
        rotationMatrix[0][2] = 0.0       ; rotationMatrix[1][2] = 0.0       ; rotationMatrix[2][2] = 1.0 ; rotationMatrix[3][2] = 0.0;
        rotationMatrix[0][3] = 0.0       ; rotationMatrix[1][3] = 0.0       ; rotationMatrix[2][3] = 0.0 ; rotationMatrix[3][3] = 1.0;
        
        position = rotationMatrix*position;
        
        //position.x += sin(_Time)*0.5;
        //position.y += cos(_Time*2.0)/2.0;
    }
    
    gl_Position = position;
    
    v_UV = vUV;
}`;

var fragSource = `
precision mediump float;
varying lowp vec2 v_UV;

uniform lowp vec4 _Color;
uniform sampler2D _Texture;

void main()
{
    lowp vec4 rvalue = vec4(0);
    {
        rvalue = texture2D(_Texture, v_UV); //v_UV
        
        if (rvalue[3] < 1.0)
        {
            discard;
        }   
    }

    gl_FragColor = rvalue;
}`;

/**
 * @description OO wrapper for Canvas with WebGL context
 */
class WebGLCanvas
{
    private readonly m_Canvas: HTMLCanvasElement;
    private readonly m_Context: any;

    /**
     * @description js wrapper for opengl apis
     * @note standard is WebGL 1.0 by default (~=GLES 2.0)
     */
    public gl()
    {
        return this.m_Context;
    }

    constructor(aParent: HTMLElement)
    {
        this.m_Canvas = document.createElement("canvas");
        this.m_Canvas.width = 500;
        this.m_Canvas.height = 500;

        this.m_Context = this.m_Canvas.getContext("webgl");        
        this.m_Context.viewportWidth  = this.m_Canvas.width;
        this.m_Context.viewportHeight = this.m_Canvas.height;

        aParent.appendChild(this.m_Canvas);
    }
}

/**
 * @description oo wrapper for shader program handle & shader related glapis
 */
class Shader
{
    private readonly m_ShaderProgram: any;

    public draw()
    {
        webGLWindow.useProgram(this.m_ShaderProgram);

        //These belong in a model or vertex attrib class not the shader.
        this.m_ShaderProgram.vertexPositionAttribute = webGLWindow.getAttribLocation(this.m_ShaderProgram, "vPos");
        webGLWindow.enableVertexAttribArray(this.m_ShaderProgram.vertexPositionAttribute);

        this.m_ShaderProgram.uvAttribute = webGLWindow.getAttribLocation( this.m_ShaderProgram, "vUV");
        webGLWindow.enableVertexAttribArray( this.m_ShaderProgram.uvAttribute);
    }

    constructor()
    {
        //Create two empty shaders for Vertex/Frag program
        var vertexShader = webGLWindow.createShader( webGLWindow.VERTEX_SHADER   );
        var fragShader   = webGLWindow.createShader( webGLWindow.FRAGMENT_SHADER ); 

        //Compile the shaders
        webGLWindow.shaderSource( vertexShader, vertexSource );
        webGLWindow.compileShader( vertexShader );
        webGLWindow.shaderSource( fragShader, fragSource);
        webGLWindow.compileShader( fragShader); 

        //Check for compile errors
        if(!webGLWindow.getShaderParameter(vertexShader, webGLWindow.COMPILE_STATUS))
        {
            throw webGLWindow.getShaderInfoLog(vertexShader);
        }
        if(!webGLWindow.getShaderParameter(fragShader, webGLWindow.COMPILE_STATUS))
        {
            throw webGLWindow.getShaderInfoLog(fragShader);
        }
        
        //Create the shader program & compile shaders into graphics programs
        this.m_ShaderProgram = webGLWindow.createProgram();
        webGLWindow.attachShader(this.m_ShaderProgram, fragShader);
        webGLWindow.attachShader(this.m_ShaderProgram, vertexShader);
        webGLWindow.linkProgram(this.m_ShaderProgram);

        //HGACK
        shaderProgram = this.m_ShaderProgram;
    }
}
   
// createVertexBuffer
// args: none
// returns: none
// hardcodes the vertex data for the quad mesh
function createVertexBuffer() 
{
    triangleVertexArray = webGLWindow.createBuffer();
    webGLWindow.bindBuffer( webGLWindow.ARRAY_BUFFER, triangleVertexArray );
        
    var vertices = 
    [
        //x,                y,    z,   u,   v,  
        0.5 -0.25,  0.5 -0.25,  0.0, 1.0, 0.0, // 1--0
        0.0 -0.25,  0.5 -0.25,  0.0, 0.0, 0.0, // | /
        0.0 -0.25,  0.0 -0.25,  0.0, 0.0, 1.0, // 2
                                   
        0.5 -0.25,  0.5 -0.25,  0.0, 1.0, 0.0, //    0
        0.0 -0.25,  0.0 -0.25,  0.0, 0.0, 1.0, //  / |
        0.5 -0.25,  0.0 -0.25,  0.0, 1.0, 1.0, // 1--2
    ];
    
    webGLWindow.bufferData( webGLWindow.ARRAY_BUFFER, new Float32Array(vertices), webGLWindow.STATIC_DRAW );
    triangleVertexArray.itemSize = 5;
    triangleVertexArray.numItems = 6;
}

function initTextures() 
{
    cubeTexture = webGLWindow.createTexture();
    cubeImage = new Image();
    cubeImage.onload = function() { handleTextureLoaded(cubeImage, cubeTexture); }
    cubeImage.src = "./img/Awesome.png";
}

function handleTextureLoaded(image: any, texture: any) 
{
    console.log("handleTextureLoaded, image = " + image);
    webGLWindow.bindTexture(webGLWindow.TEXTURE_2D, texture); //bind the texture to work on it

    webGLWindow.texImage2D(webGLWindow.TEXTURE_2D, 0, webGLWindow.RGBA, webGLWindow.RGBA, //Set up the texture
    webGLWindow.UNSIGNED_BYTE, image);
        
    //set the texture's parameters
    webGLWindow.texParameteri(webGLWindow.TEXTURE_2D, webGLWindow.TEXTURE_MAG_FILTER, webGLWindow.LINEAR);
    webGLWindow.texParameteri(webGLWindow.TEXTURE_2D, webGLWindow.TEXTURE_MIN_FILTER, webGLWindow.LINEAR_MIPMAP_NEAREST);
    webGLWindow.generateMipmap(webGLWindow.TEXTURE_2D);
    webGLWindow.bindTexture(webGLWindow.TEXTURE_2D, null);    
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const updateLoop = new IntervalTimer(16,(aDeltaTime: number) =>
{
    time += 0.01;
});

const renderLoop = new AnimationTimer((aDeltaTime: number) =>
{
    webGLWindow.viewport  ( 0, 0, webGLWindow.viewportWidth, webGLWindow.viewportHeight);
    webGLWindow.clearColor(clearColor[0],clearColor[1],clearColor[2],clearColor[3]);
    webGLWindow.clear     ( webGLWindow.COLOR_BUFFER_BIT | webGLWindow.DEPTH_BUFFER_BIT );

    shader.draw();

    //**********************************************************
    // 1. Select the "mesh" to be drawn (the vertex data buffer)
    //**********************************************************
    webGLWindow.bindBuffer( webGLWindow.ARRAY_BUFFER, triangleVertexArray );
        
    //**************************************************************************
    // 2. Tell OpenGL about the vertex's attributes (the x,y,z and the u,v etc.)
    // This must be done since vertex formats are arbitrary
    //**************************************************************************
    //Position attribute pointer
    webGLWindow.vertexAttribPointer
    (
        shaderProgram.vertexPositionAttribute,
        3, //triangleVertexArray.itemSize,
        webGLWindow.FLOAT,
        false, 
        4*(3+2), //stride is size of vertex format in bytes. 4 is float size, 3 pos, 2 uv 
        0 
    );

    //UV attribute pointer
    webGLWindow.vertexAttribPointer
    (
        shaderProgram.uvAttribute,
        2, //triangleVertexArray.itemSize,
        webGLWindow.FLOAT,
        false, 
        4*(3+2), //stride is size of vertex format in bytes. 4 is float size, 3 pos, 2 uv 
        4*3 
    );

    //*******************************************
    // 3. Pass uniform data to the shader program
    //*******************************************
    //pass time uniform
    var uTime = webGLWindow.getUniformLocation(shaderProgram,"_Time");
    if (uTime != -1)
        webGLWindow.uniform1f(uTime, time);

    //pass texture
    webGLWindow.activeTexture(webGLWindow.TEXTURE0);
    webGLWindow.bindTexture  (webGLWindow.TEXTURE_2D, cubeTexture);
    webGLWindow.uniform1i    (webGLWindow.getUniformLocation(shaderProgram, "_Texture"), 0);
   
    //*********************************************************************************
    // 4. All the data is ready, finally call draw and push that data down the pipeline
    //*********************************************************************************
    //draw
    webGLWindow.drawArrays( webGLWindow.TRIANGLES, 0, triangleVertexArray.numItems ); 
});

const webglCanvas = new WebGLCanvas(document.body);
webGLWindow = webglCanvas.gl(); //hack. Global GL is inappropriate.
const shader = new Shader();

createVertexBuffer();
initTextures();
