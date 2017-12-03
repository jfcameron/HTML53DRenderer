// © 2017 Joseph Cameron - All Rights Reserved
// Project: CSS3DRenderer
// Created on 2017-12-02.
"use strict";

define(
[
    "Engine/Debug/Exceptions",
    "Engine/Math/Vector3"
], 
function(Exceptions, Vector3)
{
    var GraphicsObject = function(aHandleToDiv)
    {
        // Private data
        var m_DivHandle = null;

        // Derived class interface
        //this.Update = (aVec3Position, aVec3) => { throw Exceptions.Unimplemented; };
        
        this.Update = function(aPosition, aRotation)
        {
            if (arguments.length !== 2)
                throw Exceptions.BadArgument;
            if (!aPosition instanceof Vector3)
                throw Exceptions.BadArgument;
            if (!aRotation instanceof Vector3)
                throw Exceptions.BadArgument;

            m_DivHandle.style.transform = 
                "translate3d(" + aPosition.x + "vw," + aPosition.y + "vw," + aPosition.z + "vw) " + 
                "rotateX(" + aRotation.x + "deg) " + "rotateY(" + aRotation.y + "deg) " + "rotateZ(" + aRotation.z + "deg) ";  
        };

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
