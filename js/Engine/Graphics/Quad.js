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
    "Engine/Graphics/Colors"
], 
function(Debug, Exceptions, GraphicsObject, Vector2, Colors) 
{
    const TAG = "Quad";

    var Quad = function()
    {
        // Constructors
        if (arguments.length === 1 || arguments.length === 2)
        {
            let aSize      = arguments[0];
            let aChildNode = arguments[1];

            if (!aSize instanceof Vector2)   throw Exceptions.Constructor;
            if (!aChildNode instanceof Node) throw Exceptions.Constructor;

            GraphicsObject.call(this);

            const defaultColor = Colors.DeathlyPink();

            let root = this.GetRootDivHandle();

            let front = document.createElement("div");
    
            front.style.position        = "absolute";
            front.style.width           = aSize.x + "px";
            front.style.height          = aSize.y + "px";
            front.style.transform       = "translate3d(" + (-aSize.y/2) + "px," + (-aSize.y/2) + "px," + 0 + "px)";
            front.style.backgroundColor = "rgba(" + defaultColor.r + "," + defaultColor.g + "," + defaultColor.b +"," + defaultColor.a + ")";
            front.style.backgroundImage = "url('img/Awesome.png')";
            front.style.backgroundSize  = "contain";
            
            if (aChildNode instanceof Node)
                front.appendChild(aChildNode);
            
            root.appendChild(front);
        }
        else
        {
            throw Exceptions.Constructor;
        }
    };

    Quad.prototype = Object.create(GraphicsObject.prototype);

    return Quad;
});
