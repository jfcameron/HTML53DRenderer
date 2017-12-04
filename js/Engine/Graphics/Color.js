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

    let Color = function()
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
        if (arguments.length === 3 || arguments.length === 4)
        {
            let aR = arguments[0];
            let aG = arguments[1]; 
            let aB = arguments[2];
            let aA = typeof (arguments[3]) !== "undefined" ? arguments[3] : 1;

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

    Color.prototype.toString = Object.freeze(function() 
    {
        return "{" + this.r + ", " + this.g + ", " + this.b + ", " + this.a + "}";
    });

    Color.prototype.equalTo = Object.freeze(function()
    {
        let aOther = arguments[0];

        if (arguments.length !== 1) throw Exceptions.BadArgument;
        if (!aOther instanceof Color) throw Exceptions.BadArgument;
        
        return this.r === aOther.r && this.g === aOther.g && this.b === aOther.b && this.a === aOther.a ? true : false; 
    });

    return Color;
});
