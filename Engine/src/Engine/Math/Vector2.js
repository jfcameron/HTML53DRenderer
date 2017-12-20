// © 2017 Joseph Cameron - All Rights Reserved
// Project: CSS3DRenderer
// Created on 2017-12-02.
"use strict";

import Exceptions from "Engine/Debug/Exceptions"

const TAG = "Vector2";

function Vector2()
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
Vector2.prototype.constructor = Vector2;

Object.defineProperties(Vector2.prototype,
{
    "toString": {value: function()
    {
        if (arguments.length !== 0) throw Exceptions.BadArgument;

        return "{" + this.x + ", " + this.y + "}";
    }},

    "equalTo": {value: function(aOther)
    {
        if (arguments.length !== 1)    throw Exceptions.BadArgument;
        if (!aOther instanceof(Color)) throw Exceptions.BadArgument;

        return this.x === aOther.x && this.y === aOther.y ? true : false;
    }},

    "Length": {value: function()
    {
        if (arguments.length !== 0) throw Exceptions.BadArgument;
        
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }}
});

Object.freeze(Vector2);
    
export default Vector2;
