// © 2018 Joseph Cameron - All Rights Reserved
// Project: HTML53DRenderer
// Created on 2018-01-09.

import Debug from "Engine/Debug"
import Exceptions from "Engine/Debug/Exceptions"
import Vector2 from "Engine/Math/Vector2"

const TAG: string = "WebGLCanvas";

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

export default WebGLCanvas;
