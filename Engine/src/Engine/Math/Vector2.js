// © 2017 Joseph Cameron - All Rights Reserved
// Project: CSS3DRenderer
// Created on 2017-12-02.
"use strict";

const Exceptions = require("Engine/Debug/Exceptions");

const Tag = "Vector2";

const Vector2 = function()
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
        const aX = arguments[0], aY = arguments[1];

        if (isNaN(aX)) throw Exceptions.Constructor;
        if (isNaN(aY)) throw Exceptions.Constructor;

        this.x = aX;
        this.y = aY;
    }
    else
    {
        throw Exceptions.Constructor;
    }

    Object.preventExtensions(this);
};

Vector2.prototype = Object.create(Object.prototype);

Vector2.prototype.toString = Object.freeze(function() 
{
    if (arguments.length !== 0) throw Exceptions.BadArgument;
        
    return "{" + this.x + ", " + this.y + "}";
});

Vector2.prototype.Length = Object.freeze(function()
{
    if (arguments.length !== 0) throw Exceptions.BadArgument;

    return Math.sqrt( Math.pow(this.x, 2) + Math.pow(this.y, 2) );
});
    
module.exports = () => Vector2;
