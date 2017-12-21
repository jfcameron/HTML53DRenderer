// © 2017 Joseph Cameron - All Rights Reserved
// Project: HTML53DRenderer
// Created on 2017-12-21.

import Vector3 from "Engine/Math/Vector3"
import Color from "Engine/Graphics/Color"
import Colors from "Engine/Graphics/Colors"

module Shapes
{
    export function Quad(aPosition: Vector3, aRotation: Vector3, aScale: Vector3): HTMLDivElement
    {
        const aColor: Color = Colors.Green;

        const face: HTMLDivElement = document.createElement("div");

        face.style.position       = "absolute";
        face.style.transformStyle = "preserve-3d";

        face.style.width           = aScale.x + "px";
        face.style.height          = aScale.y + "px";

        face.style.transform       = "translate3d(" + ((-aScale.x/2) + (aPosition.x)) + "px," + ((-aScale.y/2) + (aPosition.y)) + "px," + ((0) + (aPosition.z)) + "px)"+
                                     "rotateX(" +     aRotation.x + "deg)rotateY(" + aRotation.y + "deg)rotateZ(" + aRotation.z + "deg)";

        face.style.backgroundColor = "rgba(" + aColor.r + "," + aColor.g + "," + aColor.b +"," + aColor.a + ")";
        face.style.backgroundImage = "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAIAAABLbSncAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAbSURBVBhXY/j////Mm68wSQasokByMOr4/x8A0warIZLZpA8AAAAASUVORK5CYII=')";
        face.style.backgroundSize  = "contain";
        face.style.backfaceVisibility = "hidden";
        //face.style.backgroundImage = "url('img/Awesome.png')";

        return face;
    }

    export function Cube(): Array<HTMLDivElement>
    {
        const output: Array<HTMLDivElement> = new Array<HTMLDivElement>();

        const size = 100;
        const hsize = size/2;

        output.push(Quad(new Vector3(0, 0,  hsize), new Vector3(0, 0, 0), new Vector3(size, size, size)));
        output.push(Quad(new Vector3(0, 0, -hsize), new Vector3(0, 180, 0), new Vector3(size, size, size)));

        output.push(Quad(new Vector3(0,  hsize,  0), new Vector3(90, 180, 0), new Vector3(size, size, size)));
        output.push(Quad(new Vector3(0, -hsize,  0), new Vector3(90, 0, 0), new Vector3(size, size, size)));

        output.push(Quad(new Vector3( hsize, 0, 0), new Vector3(0, 90, 0), new Vector3(size, size, size)));
        output.push(Quad(new Vector3(-hsize, 0, 0), new Vector3(0, 270, 0), new Vector3(size, size, size)));

        return output;
    }
}

export default Shapes;
