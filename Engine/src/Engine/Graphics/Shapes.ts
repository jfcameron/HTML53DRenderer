// © 2017 Joseph Cameron - All Rights Reserved
// Project: HTML53DRenderer
// Created on 2017-12-21.

import Debug from "Engine/Debug"
import Vector3 from "Engine/Math/Vector3"
import Color from "Engine/Graphics/Color"
import Colors from "Engine/Graphics/Colors"

const TAG: string = "Shapes";

/**
* @description contains definitions for basic HTMLDivElement based geometry.
*/
module Shapes
{
    /**
    * @description Creates and prepares a div element for 3D rendering in the document
    */
    export function Quad(aPosition: Vector3, aRotation: Vector3, aScale: Vector3, aHideBackface?: boolean): HTMLDivElement
    {
        if (aHideBackface === undefined) aHideBackface = true;

        //aPosition = new Vector3(), aRotation = new Vector3(), aScale = new Vector3(1,1,1);
        const aColor: Color = Colors.Black;

        const face: HTMLDivElement = document.createElement("div");

        face.style.position       = "absolute";
        face.style.transformStyle = "preserve-3d"; 
        face.style.transformOrigin = "50% 50% 50%";

        face.style.width  = aScale.x + "px";
        face.style.height = aScale.y + "px";

        face.style.transform = 
        "translate3d(" + ((-aScale.x/2) + (aPosition.x)) + "px," + (((-aScale.y/2)) + ((aPosition.y))) + "px," + ((0) + (aPosition.z)) + "px)" +
        "rotateX(" +     aRotation.x + "deg)rotateY(" + aRotation.y + "deg)rotateZ(" + aRotation.z + "deg)" +
        "";

        face.style.backgroundColor = "rgba(" + aColor.r + "," + aColor.g + "," + aColor.b +"," + aColor.a + ")";
        face.style.backgroundImage = "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAIAAABLbSncAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAbSURBVBhXY/j////Mm68wSQasokByMOr4/x8A0warIZLZpA8AAAAASUVORK5CYII=')";
        face.style.backgroundSize  = "contain";
        face.style.backgroundImage = "url('img/brick.png')";//"url('img/Awesome.png')";

        //Performance
        if (aHideBackface)
            face.style.backfaceVisibility = "hidden";

        (<any>face.style).willChange = "transform"; //prevents composite draw stage issues
        
        return face;
    }

    /**
    * @description Creates and prepares a collection of div elements in a cube shape for 3D rendering in the document
    */
    export function Cube(aPosition: Vector3, aRotation: Vector3, aScale: Vector3): Array<HTMLDivElement>
    {
        return Voxel(aPosition, aRotation, aScale, true, true, true, true, true, true);
    }

    /**
     * @description an object created from a series of intersecting planes
     */
    export function Intersection(aHorizontalPlaneCount: number, aVerticalPlaneCount: number): Array<HTMLDivElement>
    {
        const aPosition = new Vector3(), aRotation = new Vector3(), aScale = new Vector3(1,1,1);
        const hsize = new Vector3(aScale.x/2, aScale.y/2, aScale.z/2);

        const output: Array<HTMLDivElement> = new Array<HTMLDivElement>();

        for (let i = 0; i < aHorizontalPlaneCount; ++i)
            output.push(Quad(new Vector3(aPosition.x + 0, aPosition.y + 0, aPosition.z + 0), new Vector3(aRotation.x + 90, aRotation.y + i*(180/aHorizontalPlaneCount), aRotation.z + 0), aScale, false));
        
        for (let i = 0; i < aVerticalPlaneCount; ++i)
            output.push(Quad(new Vector3(aPosition.x + 0, aPosition.y + 0, aPosition.z + 0), new Vector3(aRotation.x + 0, aRotation.y +   i*(180/aVerticalPlaneCount), aRotation.z + 0), aScale, false));
            

        return output;
    }

    /**
    * @description Creates and prepares a cube or sections of a cube made out of divs
    */
    export function Voxel(aPosition: Vector3, aRotation: Vector3, aScale: Vector3, aNorth: boolean, aSouth: boolean, aEast: boolean, aWest: boolean, aUp: boolean, aDown: boolean): Array<HTMLDivElement>
    {
        const output: Array<HTMLDivElement> = new Array<HTMLDivElement>();

        const hsize = new Vector3(aScale.x/2, aScale.y/2, aScale.z/2);

        if (aNorth) output.push(Quad(new Vector3(aPosition.x + 0, aPosition.y + 0, aPosition.z +  hsize.z), new Vector3(aRotation.x + 0, aRotation.y +   0, aRotation.z + 0), aScale));
        if (aSouth) output.push(Quad(new Vector3(aPosition.x + 0, aPosition.y + 0, aPosition.z + -hsize.z), new Vector3(aRotation.x + 0, aRotation.y + 180, aRotation.z + 0), aScale));

        if (aEast) output.push(Quad(new Vector3(aPosition.x + -hsize.x, aPosition.y + 0, aPosition.z + 0), new Vector3(aRotation.x + 0, aRotation.y + 270, aRotation.z + 0), aScale));
        if (aWest) output.push(Quad(new Vector3(aPosition.x +  hsize.x, aPosition.y + 0, aPosition.z + 0), new Vector3(aRotation.x + 0, aRotation.y +  90, aRotation.z + 0), aScale));
        
        if (aUp)   output.push(Quad(new Vector3(aPosition.x + 0, aPosition.y + aPosition.z + -hsize.y,  0), new Vector3(aRotation.x + 90, aRotation.y +   0, aRotation.z + 0), aScale));
        if (aDown) output.push(Quad(new Vector3(aPosition.x + 0, aPosition.y + aPosition.z +  hsize.y,  0), new Vector3(aRotation.x + 90, aRotation.y + 180, aRotation.z + 0), aScale));
                
        return output;
    }

    /**
    * @description Signature of the per voxel operations block available at voxel processing stage of VoxelField renderer
    * @param aThisVoxel contains the index and value of the voxel currently being processed
    * @param aNeighbours contains the value of the 6 orthogonal neighbours
    * @Note If implementing a custom VoxelProcessingStageCallback, keep in mind a neighbour value will be undefined if the neighbour index is out of bounds
    */
    export interface VoxelProcessingStageSignature
    {
        (aThisVoxel: {x: number, y: number, z: number, value: number}, aNeighbours: {north: number, south: number, east: number, west: number, up: number, down: number}): Array<HTMLDivElement>
    }

    /**
    * @description associates 3d data array passed to VoxelField with the spacial dimensions
    */
    export enum VoxelFieldOrientation
    {
        /** process data as an array of width, height planes */
        Vertical,
        /** process data as an array of width, depth planes */
        Horizontal
    }

    /**
    * @description Processes scalar field, producing a cubic mesh from it. 
    * @param aDataField represents 3D scalar field. Exactly how these values impact the output mesh is up to implementation of aPerVoxelProcessingStageCallback.
    * @param aPerVoxelProcessingStageCallback optional callback that specifies how to process the datafield from the perspective of the voxel at {x,y,z}
    * @note If no aPerVoxelProcessingStageCallback is specified, the default behaviour is to render a surface only if the neighbour value is 0.
    * @note If implementing a custom VoxelProcessingStageCallback, keep in mind a neighbour value will be undefined if the neighbour index is out of bounds
    */
    export function VoxelField(aDataField: number[][][], aOrientation?: VoxelFieldOrientation, aPerVoxelProcessingStageCallback?: VoxelProcessingStageSignature): Array<HTMLDivElement>
    {
        if (aOrientation === VoxelFieldOrientation.Horizontal)
        {
            const buff: number[][][] = new Array();

            for (let yi = 0; yi < aDataField[0].length; ++yi)
            {
                buff.push(new Array());

                for(let zi = 0; zi < aDataField.length; ++zi)
                {
                    buff[yi].push(new Array());

                    for (let xi = 0; xi < aDataField[0][0].length; ++xi)
                    {
                        buff[yi][zi].push(aDataField[zi][yi][xi]);
                    }
                }
            }

            aDataField = buff;
        }

        if (!aPerVoxelProcessingStageCallback)
        {
            aPerVoxelProcessingStageCallback = (aThisVoxel: {x: number, y: number, z: number, value: number}, aNeighbourData: {north: number, south: number, east: number, west: number, up: number, down: number}): Array<HTMLDivElement> =>
            {
                const north = aNeighbourData.north === undefined ? true : aNeighbourData.north === 0;
                const south = aNeighbourData.south === undefined ? true : aNeighbourData.south === 0;
                const east  = aNeighbourData.east  === undefined ? true : aNeighbourData.east  === 0;
                const west  = aNeighbourData.west  === undefined ? true : aNeighbourData.west  === 0;
                const up    = aNeighbourData.up    === undefined ? true : aNeighbourData.up    === 0;
                const down  = aNeighbourData.down  === undefined ? true : aNeighbourData.down  === 0;

                return Voxel(new Vector3(0,0,0), new Vector3(0,0,0), new Vector3(1,1,1), north, south, east, west, up, down);
            };
        }

        const voxelSize = new Vector3(1,1,1);

        const output: Array<HTMLDivElement> = new Array<HTMLDivElement>();

        for(let zi = 0; zi < aDataField.length; ++zi)
        {
            for (let yi = 0; yi < aDataField[0].length; ++yi)
            {
                for (let xi = 0; xi < aDataField[0][0].length; ++xi)
                {
                    if (aDataField[zi][yi][xi] !== 0)
                    {
                        const aScale: Vector3 = voxelSize;
                        const aRotation: Vector3 = new Vector3();
                        const aPosition: Vector3 = new Vector3(xi * voxelSize.x, yi * voxelSize.y, zi * voxelSize.z);

                        //offset
                        aPosition.x += aScale.x * 1;
                        aPosition.y += aScale.y * 1;
                        aPosition.z += aScale.z * 0.5;

                        aPosition.x -= aScale.x * 0.5 * aDataField[0][0].length;
                        aPosition.y -= aScale.y * 0.5 * aDataField[0].length;
                        aPosition.z -= aScale.z * 0.5 * aDataField.length;
 
                        //check neighbours...
                        let north = 0, south = 0, east = 0, west = 0, up = 0, down = 0;

                        north = zi+1 < aDataField.length ? aDataField[zi + 1][yi][xi] : undefined;
                        south = zi-1 >= 0                ? aDataField[zi - 1][yi][xi] : undefined;

                        down = yi+1 < aDataField[0].length ? aDataField[zi][yi + 1][xi] : down = undefined;
                        up   = yi-1 >= 0                   ? aDataField[zi][yi - 1][xi] : up   = undefined;

                        west = xi+1 < aDataField[0][0].length ? aDataField[zi][yi][xi +1] : west = undefined;
                        east = xi-1 >= 0                      ? aDataField[zi][yi][xi -1] : east = undefined;

                        const voxbuff: Array<HTMLDivElement> = aPerVoxelProcessingStageCallback
                        (
                            {x: xi, y: yi, z: zi, value: aDataField[zi][yi][xi]},
                            {north: north, south: south, east: east, west: west, up: up, down: down}
                        );

                        const wrapper: HTMLDivElement = document.createElement("div");
                        wrapper.style.position       = "absolute";
                        wrapper.style.transformStyle = "preserve-3d";

                        wrapper.style.transform = 
                            "rotateX(" +     aRotation.x + "deg)rotateY(" + aRotation.y + "deg)rotateZ(" + aRotation.z + "deg)" +
                            "translate3d(" + (aPosition.x - (aScale.x/2)) + "px," + (aPosition.y - (aScale.y/2)) + "px," +          aPosition.z + "px)" + 
                            "scale3d(" +     aScale.x +    "," +            aScale.y +    "," +            aScale.z + ")" +
                        "";

                        for (const vox of voxbuff)
                            wrapper.appendChild(vox);
                        
                        output.push(wrapper);
                    }
                }
            }
        }

        return output;
    }
}

export default Shapes;
