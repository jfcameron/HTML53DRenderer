// © 2018 Joseph Cameron - All Rights Reserved
// Project: HTML53DRenderer
// Created on 2018-01-12.

import Debug from "Engine/Debug"
import Exceptions from "Engine/Debug/Exceptions"

const TAG: string = "Vector4";

/**
* @description a brief description of Vector4
* @warning Vector4 has not been documented!
*/
class Vector4
{
    public x: number = 0;
    public y: number = 0;
    public z: number = 0;
    public w: number = 1;

    public set(aX: number, aY: number, aZ: number, aW: number): void
    {
        this.x = aX;
        this.y = aY;
        this.z = aZ;
        this.w = aW;
    }

    public equalTo(aOther: Vector4): boolean
    {
        return (
            this.x === aOther.x &&
            this.y === aOther.y && 
            this.z === aOther.z &&
            this.w === aOther.w
        );
    }

    public toString(): string
    {
        return `{${this.x}, ${this.y}, ${this.z}, ${this.w}}`
    }

    constructor()
    constructor(aVector4: Vector4)
    constructor(aX: number, aY: number, aZ: number, aW: number)
    constructor(a1?: any, a2?: any, a3?: any, a4?: any)
    {
        if (!(this instanceof Vector4)) throw new Exceptions.Sealed();

        if (arguments.length === 1)
        {
            this.set(a1.x, a1.y, a1.z, a1.w);
        }
        else if (arguments.length === 4)
        {
            this.set(a1, a2, a3, a4);
        }
    }
}

export default Vector4;
