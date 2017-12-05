// © 2017 Joseph Cameron - All Rights Reserved
// Project: CSS3DRenderer
// Created on 2017-12-03.
"use strict";

define(
[
    "Engine/Debug",
    "Engine/Debug/Exceptions"
], 
function(Debug, Exceptions) 
{
    const TAG = "Sprite";

    const Sprite = function()
    {
        Object.freeze(this);
    };

    Sprite.prototype.createSprite = Object.freeze(()=>
    {
        const canvas = document.createElement("canvas"); 
        canvas.style.width  ='100%';
        canvas.style.height ='100%';

        const context = canvas.getContext('2d');
        context.webkitImageSmoothingEnabled = false;
        context.imageSmoothingEnabled       = false;
    
        const img = new Image();
        img.src = 'img/Blocky.png';

        canvas.SpriteData = Object.freeze(function()
        {
            //TODO: Is state appropriate?
        });

        img.onload = function() 
        {
            const sx = 0; //TODO: Parameterize?
            const sy = 0;
            const sWidth = 16;
            const sHeight = 17;

            const dx = 0;
            const dy = 0;
            const dWidth = canvas.width;
            const dHeight = canvas.height;

            context.drawImage(img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
        }

        canvas.Update = Object.freeze(function(aU, aV, cellWidth, cellHeight)
        {
            if (arguments.length === 0) throw Exceptions.BadArgument;

            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(img, aU * 16, aV * 17, cellWidth, cellHeight, 0, 0, this.width, this.height);
        });

        Object.freeze(canvas);

        return canvas;
    });

    return new Sprite();
});
