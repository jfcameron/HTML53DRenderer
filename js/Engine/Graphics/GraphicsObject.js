// © 2017 Joseph Cameron - All Rights Reserved
// Project: CSS3DRenderer
// Created on 2017-12-02.
"use strict";

define(
[
    "Engine/Debug/Exceptions"
], 
function() 
{
    var GraphicsObject = function()
    {
        // Public interface
        
        // Constructors
        if (arguments.length == 0)
        {
            throw "GraphicsObject is a stub!";
        }
        else
        {
            throw Exceptions.Constructor;
        }
    };

    GraphicsObject.prototype.Tag = "GraphicsObject";

    return GraphicsObject;
});
