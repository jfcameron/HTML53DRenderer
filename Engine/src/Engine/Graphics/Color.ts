// © 2017 Joseph Cameron - All Rights Reserved
// Project: HTML53DRenderer
// Created on 2017-12-21.

import Debug from "Engine/Debug"
import Exceptions from "Engine/Debug/Exceptions"

const TAG: string = "Color";

/**
* @description represents 4 channel color
* @note A value is a normalized value (0-1) range
* @note RGB values are 0-255.
*/
class Color
{
    public r: number = 0;
    public g: number = 0;
    public b: number = 0;
    public a: number = 1;

    public set(aOther: Color): void
    public set(aR: number, aG: number, aB: number, aA: number): void
    public set(a0?: any, aG?: number, aB?: number, aA?: number): void
    {
        if (arguments.length === 1) 
            this.set(a0.r, a0.g, a0.b, a0.a);    
        else
        {
            this.r = a0;
            this.g = aG;
            this.b = aB;
            this.a = aA;
        }
    }

    public toString(): string
    {
        return `{${this.r}, ${this.g}, ${this.b}, ${this.a}}`;
    }

    public equalTo(aOther: Color): any
    {
        return (
            this.r === aOther.r &&
            this.g === aOther.g &&
            this.b === aOther.b &&
            this.a === aOther.a 
        );
    }

    constructor(aOther: Color);
    constructor(aR: number, aG: number, aB: number);
    constructor(aR: number, aG: number, aB: number, aA: number);
    constructor(a1?: any, a2?: any, a3?: any, a4?: any)
    {
        if (!(this instanceof Color)) throw new Exceptions.Sealed();

        if      (arguments.length === 4) this.set(a1  , a2  , a3  , a4  );
        else if (arguments.length === 3) this.set(a1  , a2  , a3  ,  1  );
        else if (arguments.length === 1) this.set(a1.r, a1.g, a1.b, a1.a);
    }
};

export default Color;
