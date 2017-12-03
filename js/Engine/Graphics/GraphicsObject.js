// © 2017 Joseph Cameron - All Rights Reserved
// Project: CSS3DRenderer
// Created on 2017-12-02.
"use strict";

define(
[
    "Engine/Debug",
    "Engine/Debug/Exceptions",
    "Engine/Math/Vector3"
], 
function(Debug, Exceptions, Vector3)
{
    const Tag = "GraphicsObject";

    var GraphicsObject = function()
    {
        // Private data
        var m_RootDivHandle = null;

        // Public inteface
        this.GetRootDivHandle = () => { return m_RootDivHandle; };
        
        this.Update = function(aPosition, aRotation)
        {
            if (arguments.length !== 2)        throw Exceptions.BadArgument;
            if (!aPosition instanceof Vector3) throw Exceptions.BadArgument;
            if (!aRotation instanceof Vector3) throw Exceptions.BadArgument;

            m_RootDivHandle.style.transform = 
                "translate3d(" + aPosition.x + "vw," + aPosition.y + "vw," + aPosition.z + "vw) " + 
                "rotateX(" + aRotation.x + "deg) " + "rotateY(" + aRotation.y + "deg) " + "rotateZ(" + aRotation.z + "deg) ";  
        };

        // Constructors
        if (arguments.length === 1)
        {
            let aHandleToDiv = arguments[0];

            Debug.Log(Tag, "graphicsobject stuff", this instanceof (GraphicsObject));

            if (aHandleToDiv.tagName !== "DIV") throw Exceptions.Constructor;
            
            m_RootDivHandle = aHandleToDiv;
        }
        else
        {
            throw Exceptions.Constructor;
        }
    };

    GraphicsObject.prototype = Object.create(Object.prototype);

    return GraphicsObject;
});
