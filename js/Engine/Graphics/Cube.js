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
    const TAG = "Cube";

    const Cube = function()
    {
        GraphicsObject.call(this);

        const root = this.GetRootDivHandle();

        const front  = document.createElement("div");
        const back   = document.createElement("div");
        const left   = document.createElement("div");
        const right  = document.createElement("div");
        const top    = document.createElement("div");
        const bottom = document.createElement("div");

        const size = 200;
        const halfSize = size / 2;
        
        front.style.position           = "absolute";
        front.style.width              = size + "px";
        front.style.height             = size + "px";
        front.style.transform          = "translate3d(" + -halfSize + "px," + -halfSize + "px," + halfSize + "px)";
        front.style.backgroundColor    = "orange";
        front.style.backgroundImage    = "url('img/Awesome.png')";
        front.style.backgroundSize     = "contain";
        front.style.backfaceVisibility = "hidden";
        
        back.style.position           = "absolute";
        back.style.width              = size + "px";
        back.style.height             = size + "px";
        back.style.transform          = "translate3d(" + -halfSize + "px," + -halfSize + "px," + -halfSize + "px)rotateY(180deg)";
        back.style.backgroundColor    = "red";
        back.style.backgroundImage    = "url('img/Awesome.png')";
        back.style.backgroundSize     = "contain";
        back.style.backfaceVisibility = "hidden";
        
        left.style.position           = "absolute";
        left.style.width              = size + "px";
        left.style.height             = size + "px";
        left.style.transform          = "translate3d(" + -halfSize + "px," + -halfSize + "px," + -halfSize + "px)rotateY(270deg)";
        left.style.transformOrigin    = "center left";
        left.style.backgroundColor    = "blue";
        left.style.backgroundImage    = "url('img/Awesome.png')";
        left.style.backgroundSize     = "contain";
        left.style.backfaceVisibility = "hidden";

        right.style.position           = "absolute";
        right.style.width              = size + "px";
        right.style.height             = size + "px";
        right.style.transform          = "translate3d(" + -halfSize + "px," + -halfSize + "px," + -halfSize + "px)rotateY(-270deg)";
        right.style.backgroundColor    = "green";
        right.style.transformOrigin    = "top right";
        right.style.backgroundImage    = "url('img/Awesome.png')";
        right.style.backgroundSize     = "contain";
        right.style.backfaceVisibility = "hidden";

        top.style.position           = "absolute";
        top.style.width              = size + "px";
        top.style.height             = size + "px";
        top.style.transform          = "translate3d(" + -halfSize + "px," + -halfSize + "px," + halfSize + "px)rotateX(-90deg)";
        top.style.backgroundColor    = "yellow";
        top.style.transformOrigin    = "top center";
        top.style.backgroundImage    = "url('img/Awesome.png')";
        top.style.backgroundSize     = "contain";
        top.style.backfaceVisibility = "hidden";

        bottom.style.position           = "absolute";
        bottom.style.width              = size + "px";
        bottom.style.height             = size + "px";
        bottom.style.transform          = "translate3d(" + -halfSize + "px," + -halfSize + "px," + halfSize + "px)rotateX(90deg)";
        bottom.style.backgroundColor    = "purple";
        bottom.style.transformOrigin    = "bottom center";
        bottom.style.backgroundImage    = "url('img/Awesome.png')";
        bottom.style.backgroundSize     = "contain";
        bottom.style.backfaceVisibility = "hidden";

        root.appendChild(front);
        root.appendChild(back);
        root.appendChild(left);
        root.appendChild(right);
        root.appendChild(top);
        root.appendChild(bottom);

        // Constructors
        if (arguments.length === 0)
        {
        }
        else
        {
            throw Exceptions.Constructor;
        }

        Object.preventExtensions(this);
    };

    Cube.prototype = Object.freeze(GraphicsObject.prototype);

    return Cube;
});
