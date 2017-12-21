// © 2017 Joseph Cameron - All Rights Reserved
// Project: CSS3DRenderer
// Created on 2017-12-01.
"use strict";
"DEPRECATED";

import Exceptions from "Engine/Debug/Exceptions"

const TAG = "Vector3";

function Vector3()
{
    // Public instance data
    this.x = 0.0;
    this.y = 0.0;
    this.z = 0.0;
        
    // Constructors
    if (arguments.length === 0)
    {
    }
    else if (arguments.length === 1)
    {
        const aVector3 = arguments[0];

        if (!aVector3 instanceof Vector3) throw Exceptions.Constructor;

        this.x = aVector3.x;
        this.y = aVector3.y;
        this.z = aVector3.z;
    }
    else if (arguments.length === 3)
    {
        const aX = arguments[0], aY = arguments[1], aZ = arguments[2];

        if (isNaN(aX)) throw Exceptions.Constructor;
        if (isNaN(aY)) throw Exceptions.Constructor;
        if (isNaN(aZ)) throw Exceptions.Constructor;

        this.x = aX;
        this.y = aY;
        this.z = aZ;
    }
    else
    {
        throw Exceptions.Constructor;
    }

    Object.preventExtensions(this);
};

Vector3.prototype = Object.create(Object.prototype);
Vector3.prototype.constructor = Vector3;

Object.defineProperties(Vector3.prototype,
{
    "toString": {value: function() 
    {
        if (arguments.length !== 0) throw Exceptions.BadArgument;
        
        return "{" + 
                    this.x + ", " + 
                    this.y + ", " + 
                    this.z + 
                "}";
    }},
    
    "equalTo": {value: function(aOther)
    {
        if (arguments.length !== 1)    throw Exceptions.BadArgument;
        if (!aOther instanceof(Color)) throw Exceptions.BadArgument;
    
        return  this.x === aOther.x &&
                this.y === aOther.y && 
                this.z === aOther.z ? 
                true : false;
    }},
    
    "Length": {value: function()
    {
        if (arguments.length > 0) throw Exceptions.BadArgument;

        return Math.sqrt( Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2) );
    }},

    "Normalize": {value: function()
    {
        if (arguments.length > 0) throw Exceptions.BadArgument;
        
        const magnitude = this.Length();
                
        if (magnitude !== 0)
        {
            this.x /= magnitude;
            this.y /= magnitude;
            this.z /= magnitude;
        }
        
        return this;
    }}
});

Object.freeze(Vector3);
    
export default Vector3;
