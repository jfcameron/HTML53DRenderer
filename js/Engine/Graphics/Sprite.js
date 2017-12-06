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

    Sprite.prototype.createSprite = Object.freeze((aImageURL) =>
    {
        if (typeof(aImageURL) === 'undefined') aImageURL = "img/Blocky.png";

        if (typeof(aImageURL) !== 'string') throw Exceptions.Constructor;

        const canvas = document.createElement("canvas");
        canvas.style.width  ='100%';
        canvas.style.height ='100%';

        const context = canvas.getContext('2d');
        context.webkitImageSmoothingEnabled = false;
        context.imageSmoothingEnabled       = false;
    
        const img = new Image();
        img.src = aImageURL;

        img.onload = Object.freeze(() => 
        {
            canvas.Update(0, 0, canvas.width, canvas.height);
        });

        canvas.Update = Object.freeze(function(aU, aV, cellWidth, cellHeight)
        {
            if (arguments.length === 0) throw Exceptions.BadArgument;

            context.clearRect(0, 0, canvas.width, canvas.height);

            context.drawImage(img, aU * cellWidth, aV * cellHeight, cellWidth, cellHeight, 0, 0, this.width, this.height);
        });

        Object.freeze(canvas);

        return canvas;
    });

    return Object.freeze(new Sprite());
});
