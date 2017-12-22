// © 2017 Joseph Cameron - All Rights Reserved
// Project: HTM53DRenderer
// Created on 2017-12-22.

import Debug from "Engine/Debug"
import Exceptions from "Engine/Debug/Exceptions"
import Vector2 from "Engine/Math/Vector2"

const TAG: string = "Mouse";

class Mouse
{
    private m_Position: Vector2 = new Vector2();
    private m_Delta: Vector2 = new Vector2();

    public test(): void {}

    public lock(aCanvas: HTMLCanvasElement): void {throw new Exceptions.Unimplemented;}
    public unlock(): void {throw new Exceptions.Unimplemented;}
    
    public getScreenPosition(): Vector2 {throw new Exceptions.Unimplemented;}
    public getDelta(): Vector2 {throw new Exceptions.Unimplemented;}

    constructor()
    {
        if (!(this instanceof Mouse)) throw new Exceptions.Sealed();

        document.addEventListener("mousemove", (event: MouseEvent) =>
        {
            console.log(event);
        }, 
        false);
    }
};

export default new Mouse;
