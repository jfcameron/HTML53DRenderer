// © 2018 Joseph Cameron - All Rights Reserved
// Project: HTML53DRenderer
// Created on 2018-01-09.

import Debug from "Engine/Debug"
import Exceptions from "Engine/Debug/Exceptions"
import VertexFormat from "Engine/Graphics/WebGL/VertexFormat"
import Texture from "Engine/Graphics/WebGL/Texture"

const TAG: string = "Shader";

/**
 * @description oo wrapper for shader program handle & shader related glapis
 */
class Shader
{
    /** @description webgl context to which the shader handle belongs */
    private readonly gl: any;
    /** @description handle to the shaderprogram in VRAM */
    private readonly m_ShaderProgramHandle: any;

    private readonly m_FloatUniformCollection: FloatUniformCollection = new FloatUniformCollection();
    private readonly m_TextureUniformCollection: TextureUniformCollection = new TextureUniformCollection();

    public draw(aVertexFormat: VertexFormat)
    {
        this.gl.useProgram(this.m_ShaderProgramHandle);
        
        this.m_FloatUniformCollection.bind(this.gl, this.m_ShaderProgramHandle);
        this.m_TextureUniformCollection.bind(this.gl, this.m_ShaderProgramHandle);

        aVertexFormat.bindAttributes(this.gl, this.m_ShaderProgramHandle);
    }

    public setFloatUniform(aUniformName: string, aValue: number): void
    {
        this.m_FloatUniformCollection.put(aUniformName, aValue);
    }

    public setTextureUniform(aUniformName: string, aTexture: Texture): void
    {
        this.m_TextureUniformCollection.put(aUniformName, aTexture);
    }

    constructor(gl: any, aVertexShaderSource: string, aFragmentShaderSource: string)
    {
        this.gl = gl;

        //Compile programmable stage objects. WebGL1.0 Only supports VERTEX and FRAGMENT
        let vertexShader = this.gl.createShader(this.gl.VERTEX_SHADER);
        this.gl.shaderSource(vertexShader, aVertexShaderSource);
        this.gl.compileShader(vertexShader);
        
        if(!this.gl.getShaderParameter(vertexShader, this.gl.COMPILE_STATUS)) 
            throw this.gl.getShaderInfoLog(vertexShader);

        let fragShader = this.gl.createShader(this.gl.FRAGMENT_SHADER); 
        this.gl.shaderSource(fragShader, aFragmentShaderSource);
        this.gl.compileShader(fragShader); 
        
        if(!this.gl.getShaderParameter(fragShader, this.gl.COMPILE_STATUS))
            throw this.gl.getShaderInfoLog(fragShader);
        
        //Compile the pipeline program object
        this.m_ShaderProgramHandle = this.gl.createProgram();
        this.gl.attachShader(this.m_ShaderProgramHandle, fragShader);
        this.gl.attachShader(this.m_ShaderProgramHandle, vertexShader);
        this.gl.linkProgram(this.m_ShaderProgramHandle);
    }
}

/**
 * @description Base uniformcollection behaviour & derived class contract (bind/unbind)
 */
abstract class UniformCollection<T>
{
    protected readonly m_UniformMap: {[uniformName: string]: T} = {};
    
    public put(aName: string, aUniformData: T): void
    {
        this.m_UniformMap[aName] = aUniformData;
    }
    
    public get(aName: string): T
    {
        return this.m_UniformMap[aName];
    }
    
    public abstract bind(gl: any, aShaderProgramHandle: number): void;
    public abstract unbind(gl: any, aShaderProgramHandle: number): void;
}

/**
 * @description manages float data exchange from JS to Shader
 */
class FloatUniformCollection extends UniformCollection<number>
{
    public bind(gl: any, aShaderProgramHandle: number): void
    {
        for(const uniform in this.m_UniformMap)
        {
            const uniformHandle: number = gl.getUniformLocation(aShaderProgramHandle, uniform);

	        if (uniformHandle != -1)
		        gl.uniform1f(uniformHandle, this.m_UniformMap[uniform]);
        }
    }

    public unbind(gl: any, aShaderProgramHandle: number): void
    {
        for(const uniform in this.m_UniformMap)
        {
            const uniformHandle: number = gl.getUniformLocation(aShaderProgramHandle, uniform);

	        if (uniformHandle != -1)
		        gl.uniform1f(uniformHandle, 0);
        }
    }
}

/**
 * @description manages texture data exchange from JS to Shader
 */
class TextureUniformCollection extends UniformCollection<Texture>
{
    public bind(gl: any, aShaderProgramHandle: number): void
    {
        let currentTextureUnit = 0;

        for(const uniform in this.m_UniformMap)
        {
            let uniformHandle  = gl.getUniformLocation(aShaderProgramHandle, uniform);
            let theTextureType = gl.TEXTURE_2D;
        
            if (uniformHandle == -1) //really questionable failure behaviour. Need tests. Need redesign.
	        	return;
        
            switch (currentTextureUnit)
        	{
        		case  1: gl.activeTexture(gl.TEXTURE1);  break;
                case  2: gl.activeTexture(gl.TEXTURE2);  break;
        		case  3: gl.activeTexture(gl.TEXTURE3);  break;
	    	    case  4: gl.activeTexture(gl.TEXTURE4);  break;
		        case  5: gl.activeTexture(gl.TEXTURE5);  break;
        		case  6: gl.activeTexture(gl.TEXTURE6);  break;
                case  7: gl.activeTexture(gl.TEXTURE7);  break;
                case  8: gl.activeTexture(gl.TEXTURE8);  break;
                case  9: gl.activeTexture(gl.TEXTURE9);  break;
                case 10: gl.activeTexture(gl.TEXTURE10); break;
                case 11: gl.activeTexture(gl.TEXTURE11); break;
                case 12: gl.activeTexture(gl.TEXTURE12); break;
                case 13: gl.activeTexture(gl.TEXTURE13); break;
                case 14: gl.activeTexture(gl.TEXTURE14); break;
                case 15: gl.activeTexture(gl.TEXTURE15); break;
                
                default: gl.activeTexture(gl.TEXTURE0); break;	
	        }
        
            gl.bindTexture(theTextureType, (<any>this.m_UniformMap[uniform]).m_TextureHandle);
            gl.uniform1i(uniformHandle, currentTextureUnit);

            currentTextureUnit++;
        }
    }

    public unbind(gl: any, aShaderProgramHandle: number): void
    {
        throw Exceptions.Unimplemented;
    }
}

export default Shader;
