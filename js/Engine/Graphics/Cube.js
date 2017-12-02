// © 2017 Joseph Cameron - All Rights Reserved
// Project: CSS3DRenderer
// Created on 2017-12-02.
"use strict";

define(
[
    "Engine/Debug/Exceptions",
    "Engine/Graphics/GraphicsObject"
], 
function(Exceptions, GraphicsObject) 
{
    var Cube = function()
    {
        GraphicsObject.call(this, document.getElementById("theCube"));

        this.Update = function()
        {
            
        };

        // Constructors
        if (arguments.length == 0)
        {
        }
        else
        {
            throw Exceptions.Constructor;
        }
    };

    Cube.prototype.Tag = "Cube";

    return Cube;
});
