// © 2017 Joseph Cameron - All Rights Reserved
// Project: CSS3DRenderer
// Created on 2017-12-02.
"use strict";

define(
[
    "Engine/Debug/Exceptions",
    "Engine/Math/Vector3",
    "Engine/Graphics/Cube"
], 
function(Exceptions, Vector3, Cube)
{
    const Tag = "NPC";

    let NPC = function()
    {
        let m_Position = new Vector3(0,0,-10);
        let m_Rotation = new Vector3();
        let m_Scale    = new Vector3(1, 1, 1);

        let m_GraphicsObject = new Cube();

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
    };

    NPC.prototype = Object.create(Object.prototype);

    return NPC;
});
