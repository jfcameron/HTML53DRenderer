// © 2018 Joseph Cameron - All Rights Reserved
// Project: HTML53DRenderer
// Created on 2018-01-09.

import Debug from "Engine/Debug"
import Exceptions from "Engine/Debug/Exceptions"

const TAG: string = "VertexFormat";

/**
 * @description how to interpret raw vertex data array and how to bind that data (assuming it conforms)
 * @note a format is made up of attributes. An attribute is eg UV or Pos (they are in fact completely arbitrary).
 * a typical format could look like {pos: {x, y, z}, uv: {u, v}, normal: {x, y, z}}
 */
class VertexFormat
{
    private static readonly GL_FLOAT_BYTES = 4; //Consider more appropriate source of truth

    /**@description an attribute is a contiguous set of floats within a single vertex format that is a logical group eg UV eg POS eg TANGENT */
    private readonly m_VertexAttributes: {name: string, size: number}[];
    /**@description size of vertex format in bytes. required to determine vertex interval in buffer. precalced in ctor for speed. */
    private readonly m_Stride: number = 0;
    /**@description a component is a single float within a vertex attribute. Count is total # of components in a format eg POS(3) + UV(2) = 5 */
    private readonly m_AttributeComponentCount: number = 0;

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
        
        for (const attribute of this.m_VertexAttributes)
            this.m_AttributeComponentCount += attribute.size;
            
        this.m_Stride = VertexFormat.GL_FLOAT_BYTES * this.m_AttributeComponentCount;
    }
}

export default VertexFormat;
