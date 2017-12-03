// © 2017 Joseph Cameron - All Rights Reserved
// Project: CSS3DRenderer
// Created on 2017-12-02.
"use strict";

define(
[
    "Engine/Debug/Exceptions",
    "Engine/Graphics/GraphicsObject"
], 
function(Exceptions, GraphicsObject) 
{
    const Tag = "Cube";

    var Cube = function()
    {
        let root   = document.createElement("div");
        let front  = document.createElement("div");
        let back   = document.createElement("div");
        let left   = document.createElement("div");
        let right  = document.createElement("div");
        let top    = document.createElement("div");
        let bottom = document.createElement("div");

        const size = 200;
        const halfSize = size/2;
        
        root.style.position       = "relative";
        root.style.width          = size + "px";
        root.style.transformStyle = "preserve-3d";

        front.style.position        = "absolute";
        front.style.width           = size + "px";
        front.style.height          = size + "px";
        front.style.transform       = "translateZ(" + halfSize + "px)";
        front.style.backgroundColor = "orange";
        
        back.style.position        = "absolute";
        back.style.width           = size + "px";
        back.style.height          = size + "px";
        back.style.transform       = "translateZ(-" + halfSize + "px) rotateY(180deg)";
        back.style.backgroundColor = "red";
        
        left.style.position        = "absolute";
        left.style.width           = size + "px";
        left.style.height          = size + "px";
        left.style.transform       = "rotateY(270deg) translateX(-" + halfSize + "px)";
        left.style.backgroundColor = "blue";
        left.style.transformOrigin = "center left";

        right.style.position        = "absolute";
        right.style.width           = size + "px";
        right.style.height          = size + "px";
        right.style.transform       = "rotateY(-270deg) translateX(" + halfSize + "px)";
        right.style.backgroundColor = "green";
        right.style.transformOrigin = "top right";

        top.style.position        = "absolute";
        top.style.width           = size + "px";
        top.style.height          = size + "px";
        top.style.transform       = "rotateX(-90deg) translateY(-" + halfSize + "px)";
        top.style.backgroundColor = "yellow";
        top.style.transformOrigin = "top center";

        bottom.style.position        = "absolute";
        bottom.style.width           = size + "px";
        bottom.style.height          = size + "px";
        bottom.style.transform       = "rotateX(90deg) translateY(" + halfSize + "px)";
        bottom.style.backgroundColor = "purple";
        bottom.style.transformOrigin = "bottom center";

        root.appendChild(front);
        root.appendChild(back);
        root.appendChild(left);
        root.appendChild(right);
        root.appendChild(top);
        root.appendChild(bottom);

        document.getElementById("MyHardcodedSceneGraph").appendChild(root);

        GraphicsObject.call(this, root);

        // Constructors
        if (arguments.length === 0)
        {
        }
        else
        {
            throw Exceptions.Constructor;
        }
    };

    Cube.prototype = Object.create(GraphicsObject.prototype);

    return Cube;
});
