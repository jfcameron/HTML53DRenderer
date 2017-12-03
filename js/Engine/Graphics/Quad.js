// © 2017 Joseph Cameron - All Rights Reserved
// Project: CSS3DRenderer
// Created on 2017-12-02.
"use strict";

define(
[
    "Engine/Debug",
    "Engine/Debug/Exceptions",
    "Engine/Graphics/GraphicsObject",
    "Engine/Math/Vector2"
], 
function(Debug, Exceptions, GraphicsObject, Vector2) 
{
    let Tag = "Quad";

    var Quad = function()
    {
        // Constructors
        if (arguments.length === 1 || arguments.length === 2)
        {
            let aSize      = arguments[0];
            let aChildNode = arguments[1];

            if (!aSize instanceof Vector2)   throw Exceptions.Constructor;
            if (!aChildNode instanceof Node) throw Exceptions.Constructor;

            let root  = document.createElement("div");
            let front = document.createElement("div");
    
            const size = aSize;
            
            root.style.position       = "relative";
            root.style.width          = size.x + "px";
            root.style.transformStyle = "preserve-3d";
    
            front.style.position        = "absolute";
            front.style.width           = size.x + "px";
            front.style.height          = size.y + "px";
            front.style.transform       = "translateZ(" + 0 + "px)" + "translateY(" + -(size.y/2) + "px)";
            front.style.backgroundColor = "orange";
            
            if (aChildNode instanceof Node)
                front.appendChild(aChildNode);
            
            root.appendChild(front);
            
            document.getElementById("MyHardcodedSceneGraph").appendChild(root);
    
            GraphicsObject.call(this, root);
        }
        else
        {
            throw Exceptions.Constructor;
        }
    };

    Quad.prototype = Object.create(GraphicsObject.prototype);

    return Quad;
});
