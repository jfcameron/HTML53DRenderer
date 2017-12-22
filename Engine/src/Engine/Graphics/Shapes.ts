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

        face.style.transform = "translate3d(" + ((-aScale.x/2) + (aPosition.x)) + "px," + ((-aScale.y/2) + (aPosition.y)) + "px," + ((0) + (aPosition.z)) + "px)" +
                               "rotateX(" +     aRotation.x + "deg)rotateY(" + aRotation.y + "deg)rotateZ(" + aRotation.z + "deg)";

        face.style.backgroundColor = "rgba(" + aColor.r + "," + aColor.g + "," + aColor.b +"," + aColor.a + ")";
        face.style.backgroundImage = "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAIAAABLbSncAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAbSURBVBhXY/j////Mm68wSQasokByMOr4/x8A0warIZLZpA8AAAAASUVORK5CYII=')";
        face.style.backgroundSize  = "contain";
        face.style.backfaceVisibility = "hidden";
        //face.style.backgroundImage = "url('img/Awesome.png')";

        return face;
    }

    export function Cube(aPosition: Vector3, aRotation: Vector3, aScale: Vector3): Array<HTMLDivElement>
    {
        const output: Array<HTMLDivElement> = new Array<HTMLDivElement>();

        //const size = 100;
        //const hsize = size/2;

        const hsize = new Vector3(aScale.x/2, aScale.y/2, aScale.z/2);

        output.push(Quad(new Vector3(aPosition.x + 0, aPosition.y + 0, aPosition.z +  hsize.z), new Vector3(aRotation.x + 0, aRotation.y +   0, aRotation.z + 0), aScale));
        output.push(Quad(new Vector3(aPosition.x + 0, aPosition.y + 0, aPosition.z + -hsize.z), new Vector3(aRotation.x + 0, aRotation.y + 180, aRotation.z + 0), aScale));

        output.push(Quad(new Vector3(aPosition.x + 0, aPosition.y + aPosition.z +  hsize.y,  0), new Vector3(aRotation.x + 90, aRotation.y + 180, aRotation.z + 0), aScale));
        output.push(Quad(new Vector3(aPosition.x + 0, aPosition.y + aPosition.z + -hsize.y,  0), new Vector3(aRotation.x + 90, aRotation.y +   0, aRotation.z + 0), aScale));

        output.push(Quad(new Vector3(aPosition.x +  hsize.x, aPosition.y + 0, aPosition.z + 0), new Vector3(aRotation.x + 0, aRotation.y +  90, aRotation.z + 0), aScale));
        output.push(Quad(new Vector3(aPosition.x + -hsize.x, aPosition.y + 0, aPosition.z + 0), new Vector3(aRotation.x + 0, aRotation.y + 270, aRotation.z + 0), aScale));

        return output;
    }
}

export default Shapes;
