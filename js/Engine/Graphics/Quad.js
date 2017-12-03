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
    
            const size = aSize;
            
            root.style.position       = "relative";
            root.style.width          = size.x + "px";
            root.style.transformStyle = "preserve-3d";
    
            front.style.position        = "absolute";
            front.style.width           = size.x + "px";
            front.style.height          = size.y + "px";
            front.style.transform       = "translateZ(" + 0 + "px)" + "translateY(" + -(size.y/2) + "px)";
            front.style.backgroundColor = "orange";
            
            let canvas = document.createElement("canvas");
            canvas.width  = aSize.x;
            canvas.height = aSize.y;

            let ctx = canvas.getContext('2d');
            let img = new Image();
        
            // Disable antialiasing
            ctx.mozImageSmoothingEnabled    = false;
            ctx.webkitImageSmoothingEnabled = false;
            ctx.imageSmoothingEnabled       = false;
            
            img.src = 'img/Blocky.png';

            img.onload = function() 
            {
                let sx = 0;
                let sy = 0;
                let sWidth = 16;
                let sHeight = 17;

                let dx = 0;
                let dy = 0;
                let dWidth = canvas.width;
                let dHeight = canvas.height;

                ctx.drawImage(img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
            }

            front.appendChild(canvas);
            
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
