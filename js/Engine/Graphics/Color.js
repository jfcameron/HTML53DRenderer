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
    const TAG = "Color";

    var Color = function()
    {
        // Public interface
        this.r = 0;
        this.g = 0;
        this.b = 0;
        this.a = 1;
        
        // Constructors
        if (arguments.length === 0)
        {
        }
        if (arguments.length === 4)
        {
            let aR = arguments[0], aG = arguments[1], aB = arguments[2], aA = arguments[3];

            if (isNaN(aR)) throw Exceptions.Constructor;
            if (isNaN(aG)) throw Exceptions.Constructor;
            if (isNaN(aB)) throw Exceptions.Constructor;
            if (isNaN(aA)) throw Exceptions.Constructor;

            this.r = aR;
            this.g = aG;
            this.b = aB;
            this.a = aA;
        }
        else
        {
            throw Exceptions.Constructor;
        }
    };

    Color.prototype = Object.create(Object.prototype);

    Color.prototype.toString = function() {return "{" + "Color" + "}";}

    return Color;
});
