// © 2017 Joseph Cameron - All Rights Reserved
// Project: CSS3DRenderer
// Created on 2017-12-02.
"use strict";

define(
[
    "./Exceptions"
], 
function() 
{
    var Interfaces = function()
    {
        // Public interface
        
        // Constructors
        if (arguments.length == 0)
        {
            throw "Interfaces is a stub!";
        }
        else
        {
            throw Exceptions.Constructor;
        }
    };

    Interfaces.prototype.Tag = "Interfaces";

    return Interfaces;
});
