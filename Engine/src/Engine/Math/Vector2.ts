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

    public length(): number
    {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }

    public toString(): string
    {
        return "{" + 
            this.x + ", " + 
            this.y + 
        "}";
    }

    public equalTo(aOther: Vector2): boolean
    {
        return (
            this.x === aOther.x && 
            this.y === aOther.y
        );
    }

    public set(aX: number, aY: number)
    {
        this.x = aX;
        this.y = aY;
    }

    constructor()
    constructor(aVector2: Vector2)
    constructor(aX: number, aY: number)
    constructor(a1?: any, a2?: any)
    {
        if (!(this instanceof Vector2)) throw new Exceptions.Sealed();
        
        if (arguments.length === 1)
        {
            this.set(a1.x, a1.y);
        }
        else if (arguments.length === 2)
        {
            this.set(a1, a2);
        }
    }
};

export default Vector2;
