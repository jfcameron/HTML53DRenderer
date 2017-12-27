// © 2017 Joseph Cameron - All Rights Reserved
// Project: HTML53DRenderer
// Created on 2017-12-20.

import Debug from "Engine/Debug"
import Exceptions from "Engine/Debug/Exceptions"

const TAG: string = "Vector2";

/**
* @description Represents 2d position, speed, rotation, etc.
*/
class Vector2
{
    static readonly Zero: Vector2 = new Vector2();
    static readonly One: Vector2 = new Vector2(1,1);

    public x: number = 0;
    public y: number = 0;

    public length(): number
    {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }

    public normalize(): Vector2
    {
        const magnitude: number = this.length();
                
        if (magnitude !== 0)
        {
            this.x /= magnitude;
            this.y /= magnitude;
        }
        
        return this;
    }

    public multiply(aScalar: number): void
    {
        this.x *= aScalar;
        this.y *= aScalar;
    }

    public add(aOther: Vector2): void
    {
        this.x += aOther.x;
        this.y += aOther.y;
    }

    public set(aX: number, aY: number)
    {
        this.x = aX;
        this.y = aY;
    }

    public equalTo(aOther: Vector2): boolean
    {
        return (
            this.x === aOther.x && 
            this.y === aOther.y
        );
    }

    public toString(): string
    {
        return `{${this.x}, ${this.y}}`
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
