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
        // Public interface
        this.x = 0.0;
        this.y = 0.0;
        this.z = 0.0;
        
        // Constructors
        if (arguments.length === 0)
        {
        }
        else if (arguments.length === 3)
        {
            if (isNaN(arguments[0])) throw Exceptions.Constructor;
            if (isNaN(arguments[1])) throw Exceptions.Constructor;
            if (isNaN(arguments[2])) throw Exceptions.Constructor;

            this.x = arguments[0];
            this.y = arguments[1];
            this.z = arguments[2];
        }
        else
        {
            throw Exceptions.Constructor;
        }
    };

    Vector3.prototype.Length = function()
    {
        return Math.sqrt( Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2) );
    };

    Vector3.prototype.Tag = "Vector3";
    
    Vector3.prototype.toString = function() {return "{" + this.x + ", " + this.y + ", " + this.z + "}";}

    return Vector3;
});
