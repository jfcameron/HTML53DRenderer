// © 2017 Joseph Cameron - All Rights Reserved
// Project: HTML53DRenderer
// Created on 2017-12-27.

import Debug from "Engine/Debug"
import Exceptions from "Engine/Debug/Exceptions"

const TAG: string = "Camera";

/**
* @description a brief description of Camera
* @warning Camera has not been documented!
*/
class Camera
{
    public set(): void
    {
        throw new Exceptions.Unimplemented();
    }

    public toString(): string
    {
        throw new Exceptions.Unimplemented();
    }

    public equalTo(aOther: Camera): boolean
    {
        throw new Exceptions.Unimplemented();
    }
    
    public destruct(): void
    {
        throw new Exceptions.Unimplemented();
    }

    constructor()
    {
        if (!(this instanceof Camera)) throw new Exceptions.Sealed();

        throw new Exceptions.Unimplemented();
    }
}

export default Camera;
