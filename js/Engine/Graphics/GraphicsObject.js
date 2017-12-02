// © 2017 Joseph Cameron - All Rights Reserved
// Project: CSS3DRenderer
// Created on 2017-12-02.
"use strict";

define(
[
    "Engine/Debug/Exceptions",
    "Engine/Math/Vector3"
], 
function(Exceptions)
{
    var GraphicsObject = function(aHandleToDiv)
    {
        // Private data
        var m_DivHandle = null;

        // Derived class interface
        this.Update = () => { throw Exceptions.Unimplemented; };
        
        // Constructors
        if (arguments.length === 1)
        {
            if (aHandleToDiv.tagName !== "DIV")
                throw Exceptions.Constructor;
            
            m_DivHandle = aHandleToDiv;
        }
        else
        {
            throw Exceptions.Constructor;
        }
    };

    GraphicsObject.prototype.Tag = "GraphicsObject";

    return GraphicsObject;
});
