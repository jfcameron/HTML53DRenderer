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
import DocCamera from "Engine/Graphics/Camera"
import Scenegraph from "Engine/Graphics/Scenegraph"

// GDK inc
import DebugCameraController from "GDK/Debug/DebugCameraController"

// Adhoc
const TAG: string = "Main";

//=====
// Data
//=====
var vertexSource = `
attribute highp vec3 a_Pos;
attribute lowp  vec2 a_UV;

varying lowp vec2 v_UV;

uniform highp float _Time;

void main()
{
    highp vec4 position = vec4(a_Pos,1.0);
    {
        mat4 rotationMatrix;
        rotationMatrix[0][0] = cos(_Time); rotationMatrix[1][0] =-sin(_Time); rotationMatrix[2][0] = 0.0 ; rotationMatrix[3][0] = 0.0;
        rotationMatrix[0][1] = sin(_Time); rotationMatrix[1][1] = cos(_Time); rotationMatrix[2][1] = 0.0 ; rotationMatrix[3][1] = 0.0;
        rotationMatrix[0][2] = 0.0 ;       rotationMatrix[1][2] = 0.0       ; rotationMatrix[2][2] = 1.0 ; rotationMatrix[3][2] = 0.0;
        rotationMatrix[0][3] = 0.0 ;       rotationMatrix[1][3] = 0.0       ; rotationMatrix[2][3] = 0.0 ; rotationMatrix[3][3] = 1.0;
        
        position = rotationMatrix*position;
        
        //position.x += sin(_Time)*0.5;
        //position.y += cos(_Time*2.0)/2.0;
    }
    
    gl_Position = position;
    
    v_UV = a_UV;
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

//*****************
// Global variables
//*****************
//Object references
let shaderProgram: any = null; //Reference to the shader program used to render triangle

/**
 * @description OO wrapper for Canvas with WebGL context
 */
class WebGLCanvas
{
    private readonly m_Canvas: HTMLCanvasElement;
    private readonly m_Context: any;

    public getSize()
    {
        return new Vector2(this.m_Canvas.width, this.m_Canvas.height);
    }

    /**
     * @description js wrapper for opengl apis
     * @note spec is WebGL 1.0 if no vendor extensions are enabled. (~=GLES 2.0 subset)
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

        aParent.appendChild(this.m_Canvas);
    }
}

/**
 * @description oo wrapper for shader program handle & shader related glapis
 */
class Shader
{
    private readonly m_ShaderProgramHandle: any;
    
    /** @description webgl context to which the shader handle belongs */
    private readonly gl: any;

    public draw(aVertexFormat: VertexFormat)
    {
        this.gl.useProgram(this.m_ShaderProgramHandle);

        aVertexFormat.bindAttributes(this.gl, this.m_ShaderProgramHandle);
    }

    constructor(gl: any, aVertexShaderSource: string, aFragmentShaderSource: string)
    {
        this.gl = gl;

        //Create two empty shaders for Vertex/Frag program
        var vertexShader = this.gl.createShader(this.gl.VERTEX_SHADER);
        var fragShader = this.gl.createShader(this.gl.FRAGMENT_SHADER); 

        //Compile the shaders
        this.gl.shaderSource(vertexShader, aVertexShaderSource);
        this.gl.compileShader(vertexShader);
        this.gl.shaderSource(fragShader, aFragmentShaderSource);
        this.gl.compileShader(fragShader); 

        //Check for compile errors
        if(!this.gl.getShaderParameter(vertexShader, this.gl.COMPILE_STATUS))
        {
            throw this.gl.getShaderInfoLog(vertexShader);
        }
        if(!this.gl.getShaderParameter(fragShader, this.gl.COMPILE_STATUS))
        {
            throw this.gl.getShaderInfoLog(fragShader);
        }
        
        //Create the shader program & compile shaders into graphics programs
        this.m_ShaderProgramHandle = this.gl.createProgram();
        this.gl.attachShader(this.m_ShaderProgramHandle, fragShader);
        this.gl.attachShader(this.m_ShaderProgramHandle, vertexShader);
        this.gl.linkProgram(this.m_ShaderProgramHandle);

        //HGACK
        shaderProgram = this.m_ShaderProgramHandle;
    }
}

/**
 * @description oo wrapper for world transform offsets, perspective mul, viewport apis
 */
class CameraGL
{
    private readonly m_ClearColor: Color;

    public draw(aWebGLCanvas: WebGLCanvas, aNormalizedViewportSize: Vector2)
    {
        const canvasSize = aWebGLCanvas.getSize();
        const gl = aWebGLCanvas.gl();

        gl.viewport(0, 0, aNormalizedViewportSize.x * canvasSize.x, aNormalizedViewportSize.y * canvasSize.y);
        gl.clearColor(this.m_ClearColor.r, this.m_ClearColor.g, this.m_ClearColor.b, this.m_ClearColor.a);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    }

    constructor(aClearColor: Color)
    {
        this.m_ClearColor =  aClearColor;
    }
}

/**
 * @description how to interpret raw vertex data array and how to bind that data (assuming it conforms)
 * @note a format is made up of attributes. An attribute is eg UV or Pos (they are in fact completely arbitrary).
 * a typical format could look like {pos: {x, y, z}, uv: {u, v}, normal: {x, y, z}}
 */
class VertexFormat
{
    private static readonly GL_FLOAT_BYTES = 4;

    private readonly m_VertexAttributes: {name: string, size: number}[];
    /**@description size of vertex format in bytes. required to determine vertex interval in buffer. precalced in ctor for speed. */
    private readonly m_Stride: number;
    private readonly m_AttributeComponentCount: number;

    public getComponentCount(): number
    {
        return this.m_AttributeComponentCount;
    }

    /**
     * @description create vertex attrib pointers for the shader
     */
    public bindAttributes(gl: any, aShaderProgramHandle: any)
    {
        let currentbyteOffset = 0;

        for (const attribute of this.m_VertexAttributes)
        {
            const attributeLocation = gl.getAttribLocation(aShaderProgramHandle, attribute.name);

            if (attributeLocation != undefined)
            {
                gl.enableVertexAttribArray(attributeLocation);

                gl.vertexAttribPointer
                (
                    attributeLocation,
                    attribute.size,
                    gl.FLOAT,
                    false, 
                    this.m_Stride,
                    currentbyteOffset
                );
            }

            currentbyteOffset += (VertexFormat.GL_FLOAT_BYTES * attribute.size);
        }
    }

    constructor(vertexAttributes: {name: string, size: number}[])
    {
        this.m_VertexAttributes = vertexAttributes;
        
        this.m_Stride = (()=>
        {
            let buff = 0;
            
            for (const attribute of this.m_VertexAttributes)
                buff += attribute.size;
            buff *= VertexFormat.GL_FLOAT_BYTES;

            return buff;
        })();

        //m_AttributeComponentCount
        this.m_AttributeComponentCount = 5; //TODO: FIX!!!
    }
}

/**
 * @description containter for vertex buffer data and format
 */
class VertexData
{
    private readonly m_VertexFormat: VertexFormat;
    private readonly m_VertexDataBuffer: Float32Array;

    public getVertexFormat()
    {
        return this.m_VertexFormat;
    }

    public getVertexCount()
    {
        return this.m_VertexDataBuffer.length / (this.m_VertexFormat.getComponentCount());
    }

    /**
     * @decription upload data to VRAM, returns handle to vram copy. Optionally overwrite existing data
     * @param gl glcontext that owns the vbo
     * @param aVBOHandle handle to preexisting vbo, allowing a rewrite
     */
    public bind(gl: any, aVBOHandle?: number): number
    {
        const vbo = aVBOHandle != undefined ? aVBOHandle : gl.createBuffer();

        gl.bindBuffer( gl.ARRAY_BUFFER, vbo );
        gl.bufferData( gl.ARRAY_BUFFER, this.m_VertexDataBuffer, gl.STATIC_DRAW );

        return vbo;
    }

    constructor(aVertexFormat: VertexFormat, aVertexData: number[])
    {
        this.m_VertexFormat = aVertexFormat;
        this.m_VertexDataBuffer = new Float32Array(aVertexData);
    }
}

/**
 * @description oo wrapper for tex buffer + tex binding and manipulation apis
 */
class Texture
{
    private readonly gl: any;
    private readonly m_TextureHandle: any;

    public draw(): void
    {
        this.gl.activeTexture(this.gl.TEXTURE0);
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.m_TextureHandle);
        this.gl.uniform1i(this.gl.getUniformLocation(shaderProgram, "_Texture"), 0);
    }

    constructor(gl: any, aImgURL: string)
    {
        this.gl = gl;

        this.m_TextureHandle = gl.createTexture();

        const image = new Image();
        image.src = "./img/Awesome.png";

        image.onload = () =>
        {
            gl.bindTexture(gl.TEXTURE_2D, this.m_TextureHandle); //bind the texture to work on it

            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, //Set up the texture
            gl.UNSIGNED_BYTE, image);
        
            //set the texture's parameters
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
            gl.generateMipmap(gl.TEXTURE_2D);
            gl.bindTexture(gl.TEXTURE_2D, null);    
        }
    }
}

/**
 * @description wraps vertex data (float array)
 */
class Mesh
{
    public draw(aShader: Shader)
    {

    }

    constructor()
    {
        throw "unimplemented!";
    }
}

/**
 * base class for uniform apis.
 * uniforms offer mechanism for uploading per shader info (rather than per vert via attribs or per frag via varying)
 */
abstract class UniformCollection<T>
{
    abstract bind(aUniformName: string, aT: T): void;

    constructor()
    {

    }
}

class FloatUniformCollection extends UniformCollection<number>
{
    public bind(aUniformName: string, aT: number): void
    {
        
    }

    constructor()
    {
        super();
    }
}

const myCollection = new FloatUniformCollection();

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const webglCanvas = new WebGLCanvas(document.body);

const camera = new CameraGL(new Color(
    0.392156862745098,
    0.584313725490196,
    0.929411764705882,
    1
));

const camera2 = new CameraGL(new Color(
    1,
    0,
    0,
    1
));

const shader = new Shader(webglCanvas.gl(), vertexSource, fragSource);
const texture = new Texture(webglCanvas.gl(), "./img/Awesome.png");

const vertexData = new VertexData(
    new VertexFormat
    ([
        {name: "a_Pos", size: 3},
        {name: "a_UV",  size: 2}
    ]),
    [
        //x,                y,    z,   u,   v,  
        0.5 -0.25,  0.5 -0.25,  0.0, 1.0, 0.0, // 1--0
        0.0 -0.25,  0.5 -0.25,  0.0, 0.0, 0.0, // | /
        0.0 -0.25,  0.0 -0.25,  0.0, 0.0, 1.0, // 2
                                   
        0.5 -0.25,  0.5 -0.25,  0.0, 1.0, 0.0, //    0
        0.0 -0.25,  0.0 -0.25,  0.0, 0.0, 1.0, //  / |
        0.5 -0.25,  0.0 -0.25,  0.0, 1.0, 1.0, // 1--2
    ]
);


////hacsk abound
let triangleVertexArray: any = null; //Reference to the VBO containing Triangle vertex data
let webGLWindow: any = webglCanvas.gl();

triangleVertexArray = vertexData.bind(webGLWindow);

console.log(vertexData.getVertexCount());

const renderLoop = new AnimationTimer((aDeltaTime: number) =>
{
    camera.draw(webglCanvas, new Vector2(1, 1));
    shader.draw(vertexData.getVertexFormat());

    //refactor into abstraction
    webGLWindow.bindBuffer(webGLWindow.ARRAY_BUFFER, triangleVertexArray);
    
    //*******************************************
    // 3. Pass uniform data to the shader program
    //*******************************************
    //pass time uniform
    var uTime = webGLWindow.getUniformLocation(shaderProgram, "_Time");
    if (uTime != -1)
        webGLWindow.uniform1f(uTime, performance.now()*0.005);

    texture.draw();
   
    //*********************************************************************************
    // 4. All the data is ready, finally call draw and push that data down the pipeline
    //*********************************************************************************
    webGLWindow.drawArrays( webGLWindow.TRIANGLES, 0, vertexData.getVertexCount() ); 
});

const updateLoop = new IntervalTimer(16,(aDeltaTime: number) =>
{
    
});
