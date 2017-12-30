// © 2017 Joseph Cameron - All Rights Reserved
// Project: GDK
// Created on 2017-12-29.

import Debug from "Engine/Debug"
import Exceptions from "Engine/Debug/Exceptions"
import Vector3 from "Engine/Math/Vector3"

const TAG: string = "TileGrid";

/**
* @description a brief description of TileGrid
* @warning TileGrid has not been documented!
*/
class TileGrid
{
    constructor(aTileSize: number)
    {
        if (!(this instanceof TileGrid)) throw new Exceptions.Sealed();

        //throw new Exceptions.Unimplemented();
    }
}

export default TileGrid;
