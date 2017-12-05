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
    const TAG = "GraphicsObject";

    let GraphicsObject = function()
    {
        // Private instanced data
        let m_RootDivHandle = null;

        // Public instanced inteface
        this.GetRootDivHandle = Object.freeze(() => { return m_RootDivHandle; });
        
        this.Update = Object.freeze(function(aPosition, aRotation, aScale)
        {
            if (arguments.length !== 3)        throw Exceptions.BadArgument;
            if (!aPosition instanceof Vector3) throw Exceptions.BadArgument;
            if (!aRotation instanceof Vector3) throw Exceptions.BadArgument;
            if (!aScale    instanceof Vector3) throw Exceptions.BadArgument;

            m_RootDivHandle.style.transform = 
                "translate3d(" + aPosition.x + "vw," + aPosition.y + "vw," + aPosition.z + "vw)" + 
                "rotateX(" + aRotation.x + "deg)" + "rotateY(" + aRotation.y + "deg)" + "rotateZ(" + aRotation.z + "deg)" +
                "scale3d("+ aScale.x + "," + aScale.y + "," + aScale.z + ")"
            ;
        });

        // Constructors
        if (arguments.length === 0)
        {
            m_RootDivHandle = document.createElement("div");

            m_RootDivHandle.style.position       = "relative";
            m_RootDivHandle.style.transformStyle = "preserve-3d";

            document.getElementById("MyHardcodedSceneGraph").appendChild(m_RootDivHandle);
        }
        else
        {
            throw Exceptions.Constructor;
        }
    };

    GraphicsObject.prototype = Object.create(Object.prototype);

    return GraphicsObject;
});
