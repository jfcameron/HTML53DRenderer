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

        root.className   = "cube";
        front.className  = "front";
        back.className   = "back";
        left.className   = "left";
        right.className  = "right";
        top.className    = "top";
        bottom.className = "bottom";

        root.appendChild(front);
        root.appendChild(back);
        root.appendChild(left);
        root.appendChild(right);
        root.appendChild(top);
        root.appendChild(bottom);

        document.getElementById("SceneGraph").appendChild(root);

        GraphicsObject.call(this, document.getElementById("theCube"));

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
