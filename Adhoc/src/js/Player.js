// © 2017 Joseph Cameron - All Rights Reserved
// Project: CSS3DRenderer
// Created on 2017-12-02.
"use strict";

import Debug from "Engine/Debug"
import Exceptions from "Engine/Debug/Exceptions"
import Input from "Engine/Input"
import Vector2 from "Engine/Math/Vector2"
import Vector3 from "Engine/Math/Vector3"
import Quad from "Engine/Graphics/Quad"
import Color from "Engine/Graphics/Color"
import Sprite from "Engine/Graphics/Sprite"

const TAG = "Player";

const c_TranslateSpeed = 1;
const c_RotateSpeed = 1;

function Player()
{
    const m_Position = new Vector3(0,0,750);
    const m_Rotation = new Vector3();
    const m_Scale = new Vector3(10, 10, 10);
    const m_Sprite = Sprite.createSprite();

    const m_GraphicsObject = new Quad(m_Position, m_Rotation, m_Scale, new Color(0,0,255,1), false, m_Sprite);

    let m_Timer = 0;
    let m_U = 0;

    Object.defineProperties(this,
    {
        "Update": {value: () =>
        {
            //Translation
            if (Input.getKey(Input.KEY.A) || Input.getKey(Input.KEY.LeftArrow))
            {
                m_Position.x -= c_TranslateSpeed;
            }   
            
            if (Input.getKey(Input.KEY.D) || Input.getKey(Input.KEY.RightArrow))
            {
                m_Position.x += c_TranslateSpeed;
            }
            
            if (Input.getKey(Input.KEY.W) || Input.getKey(Input.KEY.UpArrow))
            {
                m_Position.z -= c_TranslateSpeed;
            }
            
            if (Input.getKey(Input.KEY.S) || Input.getKey(Input.KEY.DownArrow))
            {
                m_Position.z += c_TranslateSpeed;
            }
                
            if (Input.getKey(Input.KEY.Space))
            {
                m_Position.y -= c_TranslateSpeed;
            }
                
            if (Input.getKey(Input.KEY.C))
            {
                m_Position.y += c_TranslateSpeed;
            }
            
            //Rotation
            if (Input.getKey(Input.KEY.E))
            {   
                m_Rotation.y += c_RotateSpeed;
            }
            
            if (Input.getKey(Input.KEY.Q))
            {
                m_Rotation.y -= c_RotateSpeed;  
            }

            if (Input.getKey(Input.KEY.R))
            {
                m_Rotation.z += c_RotateSpeed;
            }
            
            if (Input.getKey(Input.KEY.T))
            {
                m_Rotation.z -= c_RotateSpeed;  
            }

            if (Input.getKey(Input.KEY.F))
            {
                m_Rotation.x += c_RotateSpeed;
            }
            
            if (Input.getKey(Input.KEY.G))
            {
                m_Rotation.x -= c_RotateSpeed;  
            }

            if (m_Timer++ > 10)
            {
                m_Timer = 0;

                if (m_U++ > 2)
                    m_U = 0;
            }
            
            m_GraphicsObject.Update(m_Position, m_Rotation, m_Scale);
            m_Sprite.Update(m_U, 0, 16, 17);
        }}
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

Player.prototype = Object.create(Object.prototype);
Player.prototype.constructor = Player;

Object.defineProperties(Player.prototype,
{
    "toString": {value: function()
    {
        if (arguments.length !== 0) throw Exceptions.BadArgument;
        
        throw Exceptions.Unimplemented;
    }},
        
    "equalTo": {value: function(aOther)
    {
        if (arguments.length !== 1)       throw Exceptions.BadArgument;
        if (!aOther instanceof(Collider)) throw Exceptions.BadArgument;
        
        throw Exceptions.Unimplemented;
    }}
});

Object.freeze(Player);

export default Player;
