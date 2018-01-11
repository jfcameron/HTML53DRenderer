// © 2018 Joseph Cameron - All Rights Reserved
// Project: HTML53DRenderer
// Created on 2018-01-09.

import Debug from "Engine/Debug"
import Exceptions from "Engine/Debug/Exceptions"

const TAG: string = "Texture";

/**
 * @description oo wrapper for tex buffer + tex binding and manipulation apis
 */
class Texture
{
    /** @description webgl context to which the shader handle belongs */
    private readonly gl: any;
    /** @description handle to the texture buffer in VRAM */
    private readonly m_TextureHandle: any;

    constructor(gl: any, aImgURL: string)
    {
        this.gl = gl;

        this.m_TextureHandle = gl.createTexture();

        const image = new Image();
        image.src = aImgURL;

        image.onload = () =>
        {
            gl.bindTexture(gl.TEXTURE_2D, this.m_TextureHandle);

            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, //Set up the texture
            gl.UNSIGNED_BYTE, image);
        
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
            gl.generateMipmap(gl.TEXTURE_2D);
            gl.bindTexture(gl.TEXTURE_2D, null);    
        }
    }
}

export default Texture;
