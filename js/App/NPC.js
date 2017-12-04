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

    var NPC = function()
    {
        var m_Position = new Vector3(0,0,-10);
        var m_Rotation = new Vector3();
        var m_Scale    = new Vector3(1, 1, 1);

        var m_GraphicsObject = new Cube();

        this.Update = function()
        {
            m_Rotation.x += 0.25;
            m_Rotation.y += 0.5;
            m_Rotation.z += 1;

            m_GraphicsObject.Update(m_Position, m_Rotation, m_Scale);
        }
        
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
