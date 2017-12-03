// © 2017 Joseph Cameron - All Rights Reserved
// Project: CSS3DRenderer
// Created on 2017-12-02.
"use strict";

define(
[
    "Engine/Debug/Exceptions",
    "Engine/Graphics/GraphicsObject",
    "Engine/Math/Vector2"
], 
function(Exceptions, GraphicsObject, Vector2) 
{
    var Quad = function()
    {
        // Constructors
        if (arguments.length === 1)
        {
            let aSize = arguments[0];

            if (!aSize instanceof Vector2) throw Exceptions.Constructor;

            let root  = document.createElement("div");
            let front = document.createElement("div");
    
            const size = 100;
            const halfSize = size/2;
            
            root.style.position       = "relative";
            root.style.width          = size + "px";
            root.style.transformStyle = "preserve-3d";
    
            front.style.position        = "absolute";
            front.style.width           = size + "px";
            front.style.height          = size + "px";
            front.style.transform       = "translateZ(" + 0 + "px)" + "translateY(" + -halfSize + "px)";
            front.style.backgroundColor = "orange";
            
            root.appendChild(front);
            
            document.getElementById("MyHardcodedSceneGraph").appendChild(root);
    
            GraphicsObject.call(this, root);
        }
        else
        {
            throw Exceptions.Constructor;
        }
    };

    Quad.prototype.Tag = "Quad";

    return Quad;
});
