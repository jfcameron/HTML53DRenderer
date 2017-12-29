// © 2017 Joseph Cameron - All Rights Reserved
// Project: HTML53DRenderer
// Created on 2017-12-29.

import Debug from "Engine/Debug"
import Exceptions from "Engine/Debug/Exceptions"

const TAG: string = "List";

/**
* @description a brief description of List
* @warning List has not been documented!
*/
class List
{
    public set(): void
    {
        throw new Exceptions.Unimplemented();
    }

    public toString(): string
    {
        throw new Exceptions.Unimplemented();
    }

    public equalTo(aOther: List): boolean
    {
        throw new Exceptions.Unimplemented();
    }
    
    public destruct(): void
    {
        throw new Exceptions.Unimplemented();
    }

    constructor()
    {
        if (!(this instanceof List)) throw new Exceptions.Sealed();

        throw new Exceptions.Unimplemented();
    }
}

export default List;
