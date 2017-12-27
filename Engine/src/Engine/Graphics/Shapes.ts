// © 2017 Joseph Cameron - All Rights Reserved
// Project: HTML53DRenderer
// Created on 2017-12-21.

import Debug from "Engine/Debug"
import Vector3 from "Engine/Math/Vector3"
import Color from "Engine/Graphics/Color"
import Colors from "Engine/Graphics/Colors"

const TAG: string = "Shapes";

/**
* @Brief contains definitions for basic HTMLDivElement based geometry.
*/
module Shapes
{
    /**
    * @Brief Creates and prepares a div element for 3D rendering in the document
    */
    export function Quad(aPosition: Vector3, aRotation: Vector3, aScale: Vector3): HTMLDivElement
    {
        //aPosition = new Vector3(), aRotation = new Vector3(), aScale = new Vector3(1,1,1);
        const aColor: Color = Colors.Green;

        const face: HTMLDivElement = document.createElement("div");

        face.style.position       = "absolute";
        face.style.transformStyle = "preserve-3d"; 
        face.style.transformOrigin = "50% 50% 50%";

        face.style.width           = aScale.x + "px";
        face.style.height          = aScale.y + "px";

        face.style.transform = 
        "translate3d(" + ((-aScale.x/2) + (aPosition.x)) + "px," + (((-aScale.y/2)) + ((aPosition.y))) + "px," + ((0) + (aPosition.z)) + "px)" +
        "rotateX(" +     aRotation.x + "deg)rotateY(" + aRotation.y + "deg)rotateZ(" + aRotation.z + "deg)" +
        "";

        //face.style.backgroundColor = "rgba(" + aColor.r + "," + aColor.g + "," + aColor.b +"," + aColor.a + ")";
        face.style.backgroundImage = "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAIAAABLbSncAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAbSURBVBhXY/j////Mm68wSQasokByMOr4/x8A0warIZLZpA8AAAAASUVORK5CYII=')";
        face.style.backgroundSize  = "contain";
        face.style.backgroundImage = "url('img/brick.png')";//"url('img/Awesome.png')";

        //Performance
        face.style.backfaceVisibility = "hidden";
        (<any>face.style).willChange = "transform"; //prevents composite draw stage issues
        
        return face;
    }

    /**
    * @Brief Creates and prepares a collection of div elements in a cube shape for 3D rendering in the document
    */
    export function Cube(aPosition: Vector3, aRotation: Vector3, aScale: Vector3): Array<HTMLDivElement>
    {
        return Voxel(aPosition, aRotation, aScale, true, true, true, true, true, true);
    }

    /**
    * @Brief Creates and prepares a cube or sections of a cube made out of divs
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
    * @Brief Signature of the per voxel operations block available at voxel processing stage of VoxelField renderer
    * @Param aThisVoxel contains the index and value of the voxel currently being processed
    * @Param aNeighbours contains the value of the 6 cardinal neighbours
    */
    export interface VoxelProcessingStageSignature
    {
        (aThisVoxel: {x: number, y: number, z: number, value: number}, aNeighbours: {north: number, south: number, east: number, west: number, up: number, down: number}): Array<HTMLDivElement>
    }

    /**
    * @Brief Processes scalar field, producing a cubic mesh from it. 
    * @Note If no aPerVoxelProcessingStageCallback is specified, the default behaviour is to render a surface only if the neighbour value is 0.
    * @Note If implementing a custom VoxelProcessingStageCallback, keep in mind a neighbour value will be undefined if the neighbour index is out of bounds
    */
    export function VoxelField(aDataField: number[][][], aPerVoxelProcessingStageCallback?: VoxelProcessingStageSignature): Array<HTMLDivElement>
    {
        if (!aPerVoxelProcessingStageCallback)
        {
            aPerVoxelProcessingStageCallback = (aThisVoxel: {x: number, y: number, z: number, value: number}, aNeighbourData: {north: number, south: number, east: number, west: number, up: number, down: number}): Array<HTMLDivElement> =>
            {
                const north = aNeighbourData.north === undefined ? false : aNeighbourData.north != 0;
                const south = aNeighbourData.south === undefined ? false : aNeighbourData.south != 0;
                const east  = aNeighbourData.east  === undefined ? false : aNeighbourData.east  != 0;
                const west  = aNeighbourData.west  === undefined ? false : aNeighbourData.west  != 0;
                const up    = aNeighbourData.up    === undefined ? false : aNeighbourData.up    != 0;
                const down  = aNeighbourData.down  === undefined ? false : aNeighbourData.down  != 0;

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

                        //offset!
                        aPosition.x += aScale.x * 1;
                        aPosition.y += aScale.y * 1;
                        aPosition.z += aScale.z * 0.5;

                        aPosition.x -= aScale.x * 0.5 * aDataField[0][0].length;
                        aPosition.y -= aScale.y * 0.5 * aDataField[0].length;
                        aPosition.z -= aScale.z * 0.5 * aDataField.length;
 
                        //check neighbours...
                        let north = 0, south = 0, east = 0, west = 0, up = 0, down = 0;

                        if (zi+1 < aDataField.length) {if (aDataField[zi + 1][yi][xi] === 0) north = 1;} else {north = undefined;}
                        if (zi-1 >= 0)                {if (aDataField[zi - 1][yi][xi] === 0) south = 1;} else {south = undefined;}

                        if (yi+1 < aDataField[0].length) {if (aDataField[zi][yi + 1][xi] === 0) down = 1;} else {down = undefined;}
                        if (yi-1 >= 0)                   {if (aDataField[zi][yi - 1][xi] === 0) up   = 1;} else {up = undefined;}

                        if (xi+1 < aDataField[0][0].length) {if (aDataField[zi][yi][xi +1] === 0) west = 1;} else {west = undefined;}
                        if (xi-1 >= 0)                      {if (aDataField[zi][yi][xi -1] === 0) east = 1;} else {east = undefined;}

                        const voxbuff: Array<HTMLDivElement> = aPerVoxelProcessingStageCallback
                        (
                            {x: xi, y: yi, z: zi, value: aDataField[zi][yi][xi]},
                            {north: north, south: south, east: east, west: west, up: up, down: down}
                        );

                        const wrapper: HTMLDivElement = document.createElement("div");
                        wrapper.style.position       = "absolute";
                        wrapper.style.transformStyle = "preserve-3d";
                        //wrapper.style.overflow = "hidden";
                        //wrapper.style.transformOrigin = "50% 50% 50%";
                        wrapper.style.left   = "100%";
                        wrapper.style.width  = "100%";
                        wrapper.style.height = "100%";

                        wrapper.style.transform = 
                            "rotateX(" +     aRotation.x + "deg)rotateY(" + aRotation.y + "deg)rotateZ(" + aRotation.z + "deg)" +
                            "translate3d(" + (aPosition.x - (aScale.x/2)) + "px," + (aPosition.y - (aScale.y/2)) + "px," +          aPosition.z + "px)" + 
                            "scale3d(" +     aScale.x +    "," +            aScale.y +    "," +            aScale.z + ")"
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
