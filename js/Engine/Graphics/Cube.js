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
    var Cube = function()
    {
        let root   = document.createElement("div");
        let front  = document.createElement("div");
        let back   = document.createElement("div");
        let left   = document.createElement("div");
        let right  = document.createElement("div");
        let top    = document.createElement("div");
        let bottom = document.createElement("div");
        
        root.style.position       = "relative";
        root.style.width          = "200px";
        root.style.transformStyle = "preserve-3d";

        front.style.position        = "absolute";
        front.style.width           = "200px";
        front.style.height          = "200px";
        front.style.transform       = "translateZ(100px)";
        front.style.backgroundColor = "orange";
        
        back.style.position        = "absolute";
        back.style.width           = "200px";
        back.style.height          = "200px";
        back.style.transform       = "translateZ(-100px) rotateY(180deg)";
        back.style.backgroundColor = "red";
        
        left.style.position        = "absolute";
        left.style.width           = "200px";
        left.style.height          = "200px";
        left.style.transform       = "rotateY(270deg) translateX(-100px)";
        left.style.backgroundColor = "blue";
        left.style.transformOrigin = "center left";

        right.style.position        = "absolute";
        right.style.width           = "200px";
        right.style.height          = "200px";
        right.style.transform       = "rotateY(-270deg) translateX(100px)";
        right.style.backgroundColor = "green";
        right.style.transformOrigin = "top right";

        top.style.position        = "absolute";
        top.style.width           = "200px";
        top.style.height          = "200px";
        top.style.transform       = "rotateX(-90deg) translateY(-100px)";
        top.style.backgroundColor = "yellow";
        top.style.transformOrigin = "top center";

        bottom.style.position        = "absolute";
        bottom.style.width           = "200px";
        bottom.style.height          = "200px";
        bottom.style.transform       = "rotateX(90deg) translateY(100px)";
        bottom.style.backgroundColor = "purple";
        bottom.style.transformOrigin = "bottom center";

        root.appendChild(front);
        root.appendChild(back);
        root.appendChild(left);
        root.appendChild(right);
        root.appendChild(top);
        root.appendChild(bottom);

        document.getElementById("SceneGraph").appendChild(root);

        GraphicsObject.call(this, root);

        // Constructors
        if (arguments.length == 0)
        {
        }
        else
        {
            throw Exceptions.Constructor;
        }
    };

    Cube.prototype.Tag = "Cube";

    return Cube;
});
