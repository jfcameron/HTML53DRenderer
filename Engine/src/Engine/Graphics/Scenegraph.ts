// © 2017 Joseph Cameron - All Rights Reserved
// Project: HTML53DRenderer
// Created on 2017-12-27.

import Debug from "Engine/Debug"
import Exceptions from "Engine/Debug/Exceptions"

const TAG: string = "Scenegraph";

/**
* @description wrapper for root of document subtree representing 3D scene
* @root document note must be a node descendant of a Camera to render to screen!
*/
class Scenegraph
{
    public set(): void
    {
        throw new Exceptions.Unimplemented();
    }

    public toString(): string
    {
        throw new Exceptions.Unimplemented();
    }

    public equalTo(aOther: Scenegraph): boolean
    {
        throw new Exceptions.Unimplemented();
    }
    
    public destruct(): void
    {
        throw new Exceptions.Unimplemented();
    }

    constructor()
    {
        if (!(this instanceof Scenegraph)) throw new Exceptions.Sealed();

        
    }
}

export default Scenegraph;
