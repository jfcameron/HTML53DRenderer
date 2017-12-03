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
    var NPC = function()
    {
        var position = new Vector3();
        var rotation = new Vector3();

        var m_GraphicsObject = new Cube();

        this.Update = function()
        {
            rotation.y += 1;

            m_GraphicsObject.Update(position, rotation);
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

    NPC.prototype.Tag = "NPC";

    return NPC;
});
