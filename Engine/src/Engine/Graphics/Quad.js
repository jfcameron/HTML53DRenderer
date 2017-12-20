// © 2017 Joseph Cameron - All Rights Reserved
// Project: CSS3DRenderer
// Created on 2017-12-02.
"use strict";

import Debug from "Engine/Debug.js"
import Exceptions from "Engine/Debug/Exceptions"
import GraphicsObject from "Engine/Graphics/GraphicsObject"
import Vector2 from "Engine/Math/Vector2"
import Vector3 from "Engine/Math/Vector3"
import Color from "Engine/Graphics/Color"
import Colors from "Engine/Graphics/Colors"

const TAG = "Quad";

function Quad()
{
    GraphicsObject.call(this);

    // Constructors
    if (arguments.length >= 2 && arguments.length <= 6)
    {
        const aPosition     = arguments[0];
        const aRotation     = arguments[1];
        const aScale        = new Vector3(1,1,1);//typeof (arguments[2]) !== "undefined" ? arguments[2] : new Vector3(1,1,1);
        const aColor        = typeof (arguments[3]) !== "undefined" ? arguments[3] : Colors.DeathlyPink();
        const aBackfaceCull = typeof (arguments[4]) !== "boolean"   ? arguments[4] : false;
        const aChildNode    = typeof (arguments[5]) !== "undefined" ? arguments[5] : null;

                                if (!(aPosition     instanceof Vector3))     throw Exceptions.Constructor;
                                if (!(aRotation     instanceof Vector3))     throw Exceptions.Constructor;
                                if (!(aScale        instanceof Vector3))     throw Exceptions.Constructor;
                                if (!(aColor        instanceof Color))       throw Exceptions.Constructor;
                                if (!(typeof(aBackfaceCull) === "boolean" )) throw Exceptions.Constructor;
        if (aChildNode != null) if (!(aChildNode    instanceof Node))        throw Exceptions.Constructor;
            
        const root  = this.GetRootDivHandle();
        const front = document.createElement("div");
    
        front.style.position        = "absolute";
        front.style.width           = 100 + "px";
        front.style.height          = 100 + "px";
        front.style.transform       = //"translate3d(" + (0) + "px," + (-1/2) + "px," + 0 + "px)" +
                                          "scale3d("+ aScale.x + "," + aScale.y + "," + aScale.z + ")";

        front.style.backgroundColor = "rgba(" + aColor.r + "," + aColor.g + "," + aColor.b +"," + aColor.a + ")";
        //front.style.backgroundImage = "url('img/Awesome.png')";
        front.style.backgroundImage = "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAIAAABLbSncAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAbSURBVBhXY/j////Mm68wSQasokByMOr4/x8A0warIZLZpA8AAAAASUVORK5CYII=')";
        front.style.backgroundSize  = "contain";

        if (aBackfaceCull)
            front.style.backfaceVisibility = "hidden";
            
        root.appendChild(front);

        this.Update(aPosition, aRotation, aScale);

        if (aChildNode)
            front.appendChild(aChildNode);
    }
    else
    {
        throw Exceptions.Constructor;
    }

    Object.freeze(this);
};

Quad.prototype = Object.create(GraphicsObject.prototype);
Quad.prototype.constructor = Quad;

Object.defineProperties(Quad.prototype,
{
    "toString": {value: function()
    {
        if (arguments.length !== 0) throw Exceptions.BadArgument;
        
        throw Exceptions.Unimplemented;
    }},
        
    "equalTo": {value: function(aOther)
    {
        if (arguments.length !== 1)    throw Exceptions.BadArgument;
        if (!aOther instanceof(Color)) throw Exceptions.BadArgument;
        
        throw Exceptions.Unimplemented;
    }}
});

Object.freeze(Quad);

export default Quad;
