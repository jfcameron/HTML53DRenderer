// © 2017 Joseph Cameron - All Rights Reserved
// Project: HTML53DRenderer
// Created on 2017-12-23.

import Debug from "Engine/Debug"
import Exceptions from "Engine/Debug/Exceptions"

const TAG: string = "Gamepad";

class Gamepad
{
    public toString(): string
    {
        throw new Exceptions.Unimplemented();
    }

    public equalTo(aOther: Gamepad): boolean
    {
        throw new Exceptions.Unimplemented();
    }

    constructor()
    {
        if (!(this instanceof Gamepad)) throw new Exceptions.Sealed();

        throw new Exceptions.Unimplemented();
    }
};

export default Gamepad;
