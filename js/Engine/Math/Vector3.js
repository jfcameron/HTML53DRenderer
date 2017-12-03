// © 2017 Joseph Cameron - All Rights Reserved
// Project: CSS3DRenderer
// Created on 2017-12-01.
"use strict";

define(
[
    "Engine/Debug/Exceptions"
], 
function(Exceptions) 
{
    var Vector3 = function()
    {
        // Public data
        this.x = 0.0;
        this.y = 0.0;
        this.z = 0.0;
        
        // Constructors
        if (arguments.length === 0)
        {
        }
        else if (arguments.length === 1)
        {
            let aVector3 = arguments[0];

            if (!aVector3 instanceof Vector3) throw Exceptions.Constructor;

            this.x = aVector3.x;
            this.y = aVector3.y;
            this.z = aVector3.z;
        }
        else if (arguments.length === 3)
        {
            let aX = arguments[0], aY = arguments[1], aZ = arguments[2];

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
    };

    Vector3.prototype.Length = function()
    {
        if (arguments.length > 0) throw Exceptions.BadArgument;

        return Math.sqrt( Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2) );
    };

    Vector3.prototype.Normalize = function()
    {
        if (arguments.length > 0) throw Exceptions.BadArgument;

        let magnitude = this.Length();
        
        if (magnitude !== 0)
        {
            this.x /= magnitude;
            this.y /= magnitude;
            this.z /= magnitude;
        }

        return this;
    }

    Vector3.prototype.Tag = "Vector3";
    
    Vector3.prototype.toString = function() {return "{" + this.x + ", " + this.y + ", " + this.z + "}";}

    return Vector3;
});
