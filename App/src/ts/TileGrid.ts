// © 2017 Joseph Cameron - All Rights Reserved
// Project: GDK
// Created on 2017-12-29.

import Debug from "Engine/Debug"
import Exceptions from "Engine/Debug/Exceptions"
import Vector3 from "Engine/Math/Vector3"
import Vector2 from "Engine/Math/Vector2"
import Shapes from "Engine/Graphics/Shapes"
import GraphicsObject from "Engine/Graphics/GraphicsObject"
import Scenegraph from "Engine/Graphics/Scenegraph"

const TAG: string = "TileGrid";

/**
* @description a brief description of TileGrid
* @warning TileGrid has not been documented!
*/
class TileGrid
{
    private readonly m_TileData: number[][];

    public getTileValue(aPos: Vector2): number
    public getTileValue(aX: number, aY: number): number
    public getTileValue(a0?: any, a1?: any): number
    {
        return arguments.length === 2 ? this.m_TileData[a1][a0] : a0;
    }

    constructor(aSceneGraph: Scenegraph, aTileSize: number, aTileData: number[][], aVoxelProcessingStageCallback: Shapes.VoxelProcessingStageSignature)
    {
        if (!(this instanceof TileGrid)) throw new Exceptions.Sealed();

        this.m_TileData = aTileData;

        const voxelSize = new Vector3(aTileSize,aTileSize,aTileSize);
        const voxelFieldOffset = new Vector3
        (
            aTileData[0].length * voxelSize.x * 0.5,
            aTileData.length * voxelSize.y * -0.5,
            0
        );

        const voxdat = Array();
        voxdat.push(aTileData);

        const gfxobj = new GraphicsObject
        (
            Shapes.VoxelField(voxdat,Shapes.VoxelFieldOrientation.Vertical,aVoxelProcessingStageCallback),
            aSceneGraph, 
            voxelFieldOffset, 
            Vector3.Zero, 
            voxelSize
        );
    }
}

export default TileGrid;
