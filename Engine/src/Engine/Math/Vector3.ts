// © 2017 Joseph Cameron - All Rights Reserved
// Project: HTML53DRenderer
// Created on 2017-12-20.

import Debug from "Engine/Debug"
import Exceptions from "Engine/Debug/Exceptions"

const TAG: string = "Vector3";

class Vector3
{
    public x: number = 0;
    public y: number = 0;
    public z: number = 0;

    public length(): number
    {
        return Math.sqrt( Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2) );
    }

    public normalize(): Vector3
    {
        const magnitude: number = this.length();
                
        if (magnitude !== 0)
        {
            this.x /= magnitude;
            this.y /= magnitude;
            this.z /= magnitude;
        }
        
        return this;
    }

    public toString(): string
    {
        throw new Exceptions.Unimplemented();
    }

    public equalTo(aOther: Vector3): boolean
    {
        throw new Exceptions.Unimplemented();
    }

    constructor(aVector3: Vector3 = {} as Vector3)
    {
        let {x = 0, y = 0, z = 0} = aVector3;
        
        this.x = x;
        this.y = y;
        this.z = z;
    }
};

export default Vector3;
