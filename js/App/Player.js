// © 2017 Joseph Cameron - All Rights Reserved
// Project: CSS3DRenderer
// Created on 2017-12-02.
"use strict";

define(
[
    "Engine/Debug/Exceptions",
    "Engine/Input",
    "Engine/Math/Vector3",
    "Engine/Graphics/GraphicsObject"
], 
function(Exceptions, Input, Vector3, GraphicsObject)
{
    var Player = function()
    {
        var position = new Vector3();
        var rotation = new Vector3();

        var m_GraphicsObject = new GraphicsObject(document.getElementById("theCube"));

        this.Update = function()
        {
            if (Input.getKey(Input.KEY.A) || Input.getKey(Input.KEY.LeftArrow))
            {
                position.x -= 1;
            }   
            
            if (Input.getKey(Input.KEY.D) || Input.getKey(Input.KEY.RightArrow))
            {
                position.x += 1;
            }
            
            if (Input.getKey(Input.KEY.W) || Input.getKey(Input.KEY.UpArrow))
            {
                position.z -= 1;
            }
            
            if (Input.getKey(Input.KEY.S) || Input.getKey(Input.KEY.DownArrow))
            {
                position.z += 1;
            }
            
            if (Input.getKey(Input.KEY.Space))
            {
                position.y -= 1;
            }
            
            if (Input.getKey(Input.KEY.C))
            {
                position.y += 1;
            }
            
            if (Input.getKey(Input.KEY.E))
            {
                rotation.y += 1;
            }
            
            if (Input.getKey(Input.KEY.Q))
            {
                rotation.y -= 1;  
            }
            
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

    Player.prototype.Tag = "Player";

    return Player;
});
