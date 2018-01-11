// © 2018 Joseph Cameron - All Rights Reserved
// Project: HTML53DRenderer
// Created on 2018-01-09.

import Debug from "Engine/Debug"
import Exceptions from "Engine/Debug/Exceptions"
import VertexFormat from "Engine/Graphics/WebGL/VertexFormat"

const TAG: string = "VertexData";

/**
 * @description containter for vertex buffer data and format
 */
class VertexData
{
    static readonly UNINITIALIZED_HANDLE = -2;

    /** @description raw vertex data, opaque array of floats */
    private readonly m_VertexDataBuffer: Float32Array;
    /** @description metadata describing how to interpret data in vertexdatabuffer */
    private readonly m_VertexFormat: VertexFormat;
    /** @description handle to vram copy of vertex data */
    private m_VertexBufferHandle: number = VertexData.UNINITIALIZED_HANDLE;

    public getVertexFormat()
    {
        return this.m_VertexFormat;
    }

    public getVertexCount()
    {
        return this.m_VertexDataBuffer.length / (this.m_VertexFormat.getComponentCount());
    }

    public draw(gl: any)
    {
        if (this.m_VertexBufferHandle === VertexData.UNINITIALIZED_HANDLE) this.bind(gl);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.m_VertexBufferHandle);
        gl.drawArrays(gl.TRIANGLES, 0, this.getVertexCount()); 
    }

    /**
     * @description upload data to VRAM
     * @param gl glcontext that owns the vbo
     * @param aVBOHandle handle to preexisting vbo, allowing a rewrite
     */
    public bind(gl: any, aVBOHandle?: number): void // FIX THIS SIGNATURE
    {
        const vbo = aVBOHandle != undefined ? aVBOHandle : gl.createBuffer();

        gl.bindBuffer( gl.ARRAY_BUFFER, vbo );
        gl.bufferData( gl.ARRAY_BUFFER, this.m_VertexDataBuffer, gl.STATIC_DRAW );

        this.m_VertexBufferHandle = vbo;
    }

    constructor(aVertexFormat: {name: string, size: number}[], aVertexData: number[])
    {
        this.m_VertexFormat = new VertexFormat(aVertexFormat);
        this.m_VertexDataBuffer = new Float32Array(aVertexData);
    }
}

export default VertexData;
