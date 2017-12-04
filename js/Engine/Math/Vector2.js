// © 2017 Joseph Cameron - All Rights Reserved
// Project: CSS3DRenderer
// Created on 2017-12-02.
"use strict";

define(
[
    "Engine/Debug/Exceptions"
], 
function(Exceptions) 
{
    const Tag = "Vector2";

    let Vector2 = function()
    {
        // Public interface
        this.x = 0.0;
        this.y = 0.0;
        
        // Constructors
        if (arguments.length === 0)
        {
        }
        else if (arguments.length === 2)
        {
            let aX = arguments[0], aY = arguments[1];

            if (isNaN(aX)) throw Exceptions.Constructor;
            if (isNaN(aY)) throw Exceptions.Constructor;

            this.x = aX;
            this.y = aY;
        }
        else
        {
            throw Exceptions.Constructor;
        }
    };

    Vector2.prototype = Object.create(Object.prototype);

    Vector2.prototype.Length = function()
    {
        return Math.sqrt( Math.pow(this.x, 2) + Math.pow(this.y, 2) );
    };
    
    Vector2.prototype.toString = function() {return "{" + this.x + ", " + this.y + "}";}

    return Vector2;
});
