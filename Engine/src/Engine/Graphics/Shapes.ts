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
    export function Quad(aPosition: Vector3, aRotation: Vector3, aScale: Vector3): HTMLDivElement
    {
        const aColor: Color = Colors.Green;

        const face: HTMLDivElement = document.createElement("div");

        face.style.position       = "absolute";//position:relative absolute
        face.style.transformStyle = "preserve-3d"; 

        face.style.width           = aScale.x + "px";
        face.style.height          = aScale.y + "px";

        face.style.transform = 
        "translate3d(" + ((-aScale.x/2) + (aPosition.x)) + "px," + (((-aScale.y/2)) + ((aPosition.y))) + "px," + ((0) + (aPosition.z)) + "px)" +
        "rotateX(" +     aRotation.x + "deg)rotateY(" + aRotation.y + "deg)rotateZ(" + aRotation.z + "deg)" +
        "";

        face.style.backgroundColor = "rgba(" + aColor.r + "," + aColor.g + "," + aColor.b +"," + aColor.a + ")";
        face.style.backgroundImage = "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAIAAABLbSncAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAbSURBVBhXY/j////Mm68wSQasokByMOr4/x8A0warIZLZpA8AAAAASUVORK5CYII=')";
        face.style.backgroundSize  = "contain";
        face.style.backfaceVisibility = "hidden";
        face.style.backgroundImage = "url('img/Awesome.png')";

        (<any>face.style).willChange = "transform"; //prevents composite draw stage issues
        
        return face;
    }

    export function Cube(aPosition: Vector3, aRotation: Vector3, aScale: Vector3): Array<HTMLDivElement>
    {
        return Voxel(aPosition, aRotation, aScale, true, true, true, true, true, true);
    }

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

    export function VoxelField(aDataField: number[][][]): Array<HTMLDivElement>
    {
        const voxelSize = new Vector3(1,1,1);

        const output: Array<HTMLDivElement> = new Array<HTMLDivElement>();
        let count = 0;
        for(let zi = 0; zi < aDataField.length; ++zi)
        {
            for (let yi = 0; yi < aDataField[0].length; ++yi)
            {
                for (let xi = 0; xi < aDataField[0][0].length; ++xi)
                {
                    count ++;
                    console.log("voxel ", count, ": ", xi,", ",yi,", ",zi," val: ",aDataField[zi][yi][xi]);

                    if (aDataField[zi][yi][xi] !== 0)
                    {
                        const aScale: Vector3 = voxelSize;
                        const aRotation: Vector3 = new Vector3();
                        const aPosition: Vector3 = new Vector3(xi * voxelSize.x, yi * voxelSize.y, zi * voxelSize.z);

                        aPosition.x -= aDataField[0][0].length * 0.5 * aScale.x * 0.5 ;
                        aPosition.y -= aDataField[0].length * 0.5    * aScale.y * 0.5 ;
                        aPosition.z -= aDataField.length * 0.5       * aScale.z * 0.5 ;

                        const voxbuff: Array<HTMLDivElement> = Cube(new Vector3(0,0,0), new Vector3(0,0,0), new Vector3(1,1,1));

                        const wrapper: HTMLDivElement = document.createElement("div");
                        wrapper.style.position       = "absolute";
                        wrapper.style.transformStyle = "preserve-3d";
                        wrapper.style.transform = 
                            "rotateX(" +     aRotation.x + "deg)rotateY(" + aRotation.y + "deg)rotateZ(" + aRotation.z + "deg)" +
                            "translate3d(" + (aPosition.x - (aScale.x/2)) + "px," + (aPosition.y - (aScale.y/2)) + "px," +          aPosition.z + "px)" + 
                            "scale3d(" +     aScale.x +    "," +            aScale.y +    "," +            aScale.z + ")"
                        "";

                        for (const vox of voxbuff)
                        {
                            wrapper.appendChild(vox);
                        }
                        
                        output.push(wrapper);
                    }
                }
            }
        }

        return output;
    }
}

export default Shapes;
