// © 2017 Joseph Cameron - All Rights Reserved
// Project: CSS3DRenderer
// Created on 2017-12-02.
"use strict";

import Debug from "Engine/Debug"
import Exceptions from "Engine/Debug/Exceptions"
import Vector3 from "Engine/Math/Vector3"

const TAG = "GraphicsObject";

const GraphicsObject = function()
{
    // Private instanced data
    let m_RootDivHandle = null;

    // Public instanced inteface
    this.GetRootDivHandle = Object.freeze(() => 
    { 
        return m_RootDivHandle; 
    });
        
    this.Update = Object.freeze((aPosition, aRotation, aScale) =>
    {
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
    if (arguments.length >= 0)
    {
        m_RootDivHandle = document.createElement("div");
            
        m_RootDivHandle.style.position       = "relative";
        m_RootDivHandle.style.transformStyle = "preserve-3d";
            
        document.getElementById("MyHardcodedSceneGraph").appendChild(m_RootDivHandle);
    }
    else if (arguments.length === 2 || arguments.length === 3)
    {
        const aPosition = arguments[0];
        const aRotation = arguments[1];
        const aScale    = typeof (arguments[2]) !== "undefined" ? arguments[2] : new Vector3(1,1,1);

        if (!(aPosition instanceof Vector3)) throw Exceptions.BadArgument;
        if (!(aRotation instanceof Vector3)) throw Exceptions.BadArgument;
        if (!(aScale    instanceof Vector3)) throw Exceptions.BadArgument;

        this.Update(aPosition, aRotation, aScale);
    }
    else
    {
        throw Exceptions.Constructor;
    }

        Object.freeze(this);
    };

GraphicsObject.prototype = Object.create(Object.prototype);

export default GraphicsObject;
