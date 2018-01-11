// © 2018 Joseph Cameron - All Rights Reserved
// Project: HTML53DRenderer
// Created on 2018-01-09.

import Debug from "Engine/Debug"
import Exceptions from "Engine/Debug/Exceptions"
import Color from "Engine/Graphics/Color"
import WebGLCanvas from "Engine/Graphics/WebGL/WebGLCanvas"
import Vector2 from "Engine/Math/Vector2"

const TAG: string = "Camera";

/**
 * @description oo wrapper for world transform offsets, perspective mul, viewport apis
 */
class Camera
{
    private readonly gl: any;

    private m_ClearMode: Camera.ClearMode = Camera.ClearMode.Color;
    private readonly m_ClearColor: Color;

    private m_ProjectionMode: Camera.ProjectionMode;

    public setClearMode(aClearMode: Camera.ClearMode): void
    {
        this.m_ClearMode = aClearMode;
    }

    public setClearColor(aColor: Color): void
    public setClearColor(aR: number, aG: number, aB: number, aA: number): void
    public setClearColor(a0?: any, aG?: number, aB?: number, aA?: number): void
    {
        if (a0 instanceof Color) this.m_ClearColor.set(a0);
        else this.m_ClearColor.set(a0, aG, aB, aA);
    }

    public draw(aCanvasSize: Vector2, aNormalizedViewportPosition: Vector2, aNormalizedViewportSize: Vector2) //TODO: refer to GDK, bad sig bad imp
    {
        const viewportPixelPosition = new Vector2(aNormalizedViewportPosition).hadamard(aCanvasSize);
        const viewportPixelSize = new Vector2(aNormalizedViewportSize).hadamard(aCanvasSize);
        
        this.gl.viewport(viewportPixelPosition.x, viewportPixelPosition.y, viewportPixelSize.x, viewportPixelSize.y);
        this.gl.scissor(viewportPixelPosition.x, viewportPixelPosition.y, viewportPixelSize.x, viewportPixelSize.y);
        
        switch(this.m_ClearMode)
        {
            case Camera.ClearMode.Color:
                this.gl.clearColor(this.m_ClearColor.r, this.m_ClearColor.g, this.m_ClearColor.b, this.m_ClearColor.a);
                this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
                break;
            
            case Camera.ClearMode.DepthOnly:
                this.gl.clear(this.gl.DEPTH_BUFFER_BIT);
                break;
            
            default:
                break;
        }
    }

    constructor(gl: any)
    {
        this.gl = gl;

        gl.enable(gl.SCISSOR_TEST);
        gl.enable(gl.DEPTH_TEST);

        this.m_ClearColor =  new Color(
            0.392156862745098,
            0.584313725490196,
            0.929411764705882,
            1
        );
    }
}

module Camera
{
    export enum ClearMode
    {
        Nothing,
        Color,
        DepthOnly
    }

    export enum ProjectionMode
    {
        Perspective,
        Orthographic
    }
}

export default Camera;
