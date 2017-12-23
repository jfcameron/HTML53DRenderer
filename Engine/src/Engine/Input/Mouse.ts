// © 2017 Joseph Cameron - All Rights Reserved
// Project: HTM53DRenderer
// Created on 2017-12-22.

import Debug from "Engine/Debug"
import Exceptions from "Engine/Debug/Exceptions"
import Vector2 from "Engine/Math/Vector2"

const TAG: string = "Mouse";

class Mouse
{
    private m_Buttons: {[code: number]: boolean} = {};

    private m_ClientPosition: Vector2 = new Vector2();
    private m_Delta: Vector2 = new Vector2();

    public getButton(aButton: number): boolean
    {
        return this.m_Buttons[aButton] != undefined ? this.m_Buttons[aButton] : false;
    }

    public lock(aCanvas: HTMLCanvasElement): void 
    {
        aCanvas.requestPointerLock();
    }

    public unlock(): void 
    {
        document.exitPointerLock();
    }
    
    public getViewportPosition(): Vector2 
    {
        return this.m_ClientPosition;
    }

    public getDelta(): Vector2 
    {
        return this.m_Delta;
    }

    public update()
    {
        this.m_Delta.set(0,0);
    }

    constructor()
    {
        if (!(this instanceof Mouse)) throw new Exceptions.Sealed();

        document.body.onmousedown = (event: MouseEvent) =>
        {
            this.m_Buttons[event.button] = true;
        };

        document.body.onmouseup = (event: MouseEvent) =>
        {
            this.m_Buttons[event.button] = false;
        };

        document.addEventListener("mousemove", (event: MouseEvent) =>
        {
            this.m_Delta.set(event.movementX, event.movementY);
            this.m_ClientPosition.set(event.clientX, event.clientY);
        }, 
        false);
    }
};

export default new Mouse;