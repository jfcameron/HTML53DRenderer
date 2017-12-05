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

    /*let Sprite = function()
    {
        let canvas = document.createElement("canvas"); 

        canvas.name = "asdf";

        this = function() {};

        console.log(canvas);

        canvas.style.width='100%';
        canvas.style.height='100%';

        let ctx = canvas.getContext('2d');
        ctx.webkitImageSmoothingEnabled = false;
        ctx.imageSmoothingEnabled       = false;
    
        let img = new Image();
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

        //this = canvas;
    };

    Sprite.prototype = Object.create(Node.prototype);*/

    //let Sprite = canvas;

    /*let Sprite = function()
    {
        
        
        // Constructors
        if (arguments.length === 0)
        {
        

            //let canvas = document.createElement("canvas");
            //canvas.width  = aSize.x;
            //canvas.height = aSize.y;

            canvas.style.width='100%';
            canvas.style.height='100%';
    
            let ctx = canvas.getContext('2d');
            ctx.mozImageSmoothingEnabled    = false;
            ctx.webkitImageSmoothingEnabled = false;
            ctx.imageSmoothingEnabled       = false;
            
            let img = new Image();
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
        }
        else
        {
            throw Exceptions.Constructor;
        }
    };

    Sprite.prototype = Object.create(Node.prototype);

    Sprite.prototype.toString = function() {return "{" + "Sprite" + "}";}*/

    ////////////////////////////////////

    let Sprite = function()
    {
        Object.freeze(this);
    };

    Sprite.prototype.createSprite = Object.freeze(()=>
    {
        let canvas = document.createElement("canvas"); 
        
        canvas.style.width='100%';
        canvas.style.height='100%';

        let ctx = canvas.getContext('2d');
        ctx.webkitImageSmoothingEnabled = false;
        ctx.imageSmoothingEnabled       = false;
    
        let img = new Image();
        img.src = 'img/Blocky.png';

        canvas.SpriteData = Object.freeze(function()
        {

        });

        img.onload = function() 
        {
            let sx = 0; //TODO: let etc.
            let sy = 0;
            let sWidth = 16;
            let sHeight = 17;

            let dx = 0;
            let dy = 0;
            let dWidth = canvas.width;
            let dHeight = canvas.height;

            ctx.drawImage(img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
        }

        canvas.Update = Object.freeze(function(aU, aV, cellWidth, cellHeight)
        {
            if (arguments.length === 0) throw Exceptions.BadArgument;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, aU*16, aV*17, cellWidth, cellHeight, 0, 0, this.width, this.height);
        });

        return canvas;
    });

    return new Sprite();
});
