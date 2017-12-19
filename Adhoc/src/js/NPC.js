// © 2017 Joseph Cameron - All Rights Reserved
// Project: CSS3DRenderer
// Created on 2017-12-02.
"use strict";

import Exceptions from "Engine/Debug/Exceptions"
import Vector3 from "Engine/Math/Vector3"
import Cube from "Engine/Graphics/Cube"

const Tag = "NPC";

const NPC = function()
{
    const m_Position = new Vector3(0, 0, -10);
    const m_Rotation = new Vector3();
    const m_Scale    = new Vector3(1, 1, 1);

    const m_GraphicsObject = new Cube();

    this.Update = Object.freeze(() =>
    {
        m_Rotation.x += 0.25;
        m_Rotation.y += 0.5;
        m_Rotation.z += 1;

        m_GraphicsObject.Update(m_Position, m_Rotation, m_Scale);
    });
        
    // Constructors
    if (arguments.length === 0)
    {
    }
    else
    {
        throw Exceptions.Constructor;
    }

    Object.preventExtensions(this);
};

NPC.prototype = Object.create(Object.prototype);

export default NPC;
