// © 2017 Joseph Cameron - All Rights Reserved
// Project: CSS3DRenderer
// Created on 2017-12-03.
"use strict";
"DEPRECATED";

import Debug from "Engine/Debug"
import Exceptions from "Engine/Debug/Exceptions"

const TAG = "Color";

function Color()
{
    this.r = 0;
    this.g = 0;
    this.b = 0;
    this.a = 1;
    
    if (arguments.length === 0)
    {
    }
    else if (arguments.length === 3 || arguments.length === 4)
    {
        const aR = arguments[0];
        const aG = arguments[1]; 
        const aB = arguments[2];
        const aA = typeof (arguments[3]) !== "undefined" ? arguments[3] : 1;

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

    Object.preventExtensions(this);
};

Color.prototype = Object.create(Object.prototype);
Color.prototype.constructor = Color;

Object.defineProperties(Color.prototype,
{
    "toString": {value: function()
    {
        if (arguments.length !== 0) throw Exceptions.BadArgument;

        return "{" + this.r + ", " + this.g + ", " + this.b + ", " + this.a + "}";
    }},

    "equalTo": {value: function(aOther)
    {
        if (arguments.length !== 1)    throw Exceptions.BadArgument;
        if (!aOther instanceof(Color)) throw Exceptions.BadArgument;

        return this.r === aOther.r && this.g === aOther.g && this.b === aOther.b && this.a === aOther.a ? true : false;
    }}
});

Object.freeze(Color);

export default Color;
