// © 2017 Joseph Cameron - All Rights Reserved
// Project: CSS3DRenderer
// Created on 2017-12-02.
"use strict";

define(
[
    "Engine/Debug",
    "Engine/Debug/Exceptions",
    "Engine/Graphics/GraphicsObject",
    "Engine/Math/Vector2",
    "Engine/Graphics/Color",
    "Engine/Graphics/Colors"
], 
function(Debug, Exceptions, GraphicsObject, Vector2, Color, Colors) 
{
    const TAG = "Quad";

    let Quad = function()
    {
        // Constructors
        if (arguments.length === 1 || arguments.length === 2 || arguments.length === 3)
        {
            const aSize      = arguments[0];
            const aChildNode = typeof (arguments[1]) !== "undefined" ? arguments[1] : null;
            const aColor     = typeof (arguments[2]) !== "undefined" ? arguments[2] : Colors.DeathlyPink();

            if (!aSize instanceof Vector2)   throw Exceptions.Constructor;
            if (!aChildNode instanceof Node) throw Exceptions.Constructor;
            if (!aColor instanceof Color)    throw Exceptions.Constructor;

            GraphicsObject.call(this);
            
            let root = this.GetRootDivHandle();

            let front = document.createElement("div");
    
            front.style.position        = "absolute";
            front.style.width           = aSize.x + "px";
            front.style.height          = aSize.y + "px";
            front.style.transform       = "translate3d(" + (-aSize.y/2) + "px," + (-aSize.y/2) + "px," + 0 + "px)";
            front.style.backgroundColor = "rgba(" + aColor.r + "," + aColor.g + "," + aColor.b +"," + aColor.a + ")";
            front.style.backgroundImage = "url('img/Awesome.png')";
            front.style.backgroundSize  = "contain";
            
            if (aChildNode)
                front.appendChild(aChildNode);
            
            root.appendChild(front);
        }
        else
        {
            throw Exceptions.Constructor;
        }

        // Extension rules
        Object.preventExtensions(this);
    };

    Quad.prototype = Object.freeze(GraphicsObject.prototype);

    return Quad;
});
