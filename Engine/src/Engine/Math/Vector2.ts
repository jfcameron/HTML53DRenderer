// © 2017 Joseph Cameron - All Rights Reserved
// Project: HTML53DRenderer
// Created on 2017-12-20.

import Debug from "Engine/Debug"
import Exceptions from "Engine/Debug/Exceptions"

const TAG: string = "Vector2";

class Vector2
{
    public x: number = 0;
    public y: number = 0;

    constructor()
    constructor(aX: number, aY: number)
    constructor(a1?: any, a2?: any)
    {
        if (arguments.length === 0)
        {
            this.x = 0;
            this.y = 0;
        }
        else
        {
            this.x = a1;
            this.y = a2;
        }
    }

    public length(): number
    {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }

    public toString(): string
    {
        return "{" + this.x + ", " + this.y + "}";
    }

    public equalTo(aOther: Vector2): boolean
    {
        return this.x === aOther.x && this.y === aOther.y ? true : false;
    }
};

export default Vector2;
