// © 2017 Joseph Cameron - All Rights Reserved
// Project: HTML53DRenderer
// Created on 2017-12-27.

import Debug from "Engine/Debug"
import Exceptions from "Engine/Debug/Exceptions"

const TAG: string = "Touch";

/**
* @description a brief description of Touch
* @warning Touch has not been documented!
*/
class Touch
{
    public set(): void
    {
        throw new Exceptions.Unimplemented();
    }

    public toString(): string
    {
        throw new Exceptions.Unimplemented();
    }

    public equalTo(aOther: Touch): boolean
    {
        throw new Exceptions.Unimplemented();
    }
    
    public destruct(): void
    {
        throw new Exceptions.Unimplemented();
    }

    constructor()
    {
        if (!(this instanceof Touch)) throw new Exceptions.Sealed();

        throw new Exceptions.Unimplemented();
    }
}

export default Touch;
