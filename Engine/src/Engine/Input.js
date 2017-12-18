// © 2017 Joseph Cameron - All Rights Reserved
// Project: CSS3DRenderer
// Created on 2017-12-01.
"use strict";

import Exceptions from "Engine/Debug/Exceptions"
import Debug from "Engine/Debug"
import Keys from "Engine/Input/Keys"

const TAG = "Input";
    
const Input = function()
{
    // Data members
    const m_Canvas = Object.freeze(document.getElementById("m_Canvas"));

    const m_CurrentMousePos = Object.preventExtensions([0,0]);
        
    const m_Keys = {};
        
    // Public interface
    this.KEY = Object.freeze(Keys);

    this.update = Object.freeze(() =>
    {
        mouseUpdate();
    });
        
    this.getKey = Object.freeze((aKey) =>
    {
        if (isNaN(aKey)) throw Exceptions.BadArgument;

        return m_Keys[aKey];
    });
        
    this.getMouseDelta = Object.freeze(() =>
    {
        return m_CurrentMousePos;
    });
        
    // Private methods
    const mouselock = () =>
    {
        m_Canvas.requestPointerLock();
            
        if ( document.pointerLockElement === m_Canvas || document.mozPointerLockElement === m_Canvas || document.webkitPointerLockElement === m_Canvas )
        {
            //document.removeEventListener("mousemove", mouseMove, false);
        }
        else 
        {
            document.addEventListener("mousemove", mouseMove, false);
        }
    };
        
    const initMouseHandler = () =>
    {
        m_Canvas.onclick = mouselock;
            
        const check_pointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;

        if (check_pointerLock)
        {   
            m_Canvas.requestPointerLock = m_Canvas.requestPointerLock || m_Canvas.mozRequestPointerLock || m_Canvas.webkitRequestPointerLock;
            m_Canvas.requestPointerLock();  
        }
    };
        
    const keyDown = (event) =>
    {
        console.log(event.keyCode);
        m_Keys[event.keyCode] = true;
    };

    const keyUp = (event) =>
    {
        m_Keys[event.keyCode] = false;
    };
        
    const mouseUpdate = () =>
    {
        m_CurrentMousePos = [0,0];
            
        if (getKey(Input.KEY.Escape))
            document.removeEventListener("mousemove", mouseMove, false);
    };
        
    const mouseMove = (e) =>
    {
        const movementX = e.movementX || e.mozMovementX || e.webkitMovementX || 0;
        const movementY = e.movementY || e.mozMovementY || e.webkitMovementY || 0;
            
        m_CurrentMousePos = [movementX ,movementY];
    };

    // Constructors
    if (arguments.length === 0)
    {
        document.onkeydown = keyDown;
        document.onkeyup   = keyUp;

        Object.keys(this.KEY).forEach((key) =>
        {
            m_Keys[Keys[key]] = false;
        });
            
        Object.preventExtensions(m_Keys);
    }
    else
    {
        throw Exceptions.Constructor;
    }

    Object.freeze(this);
}

Input.prototype = Object.create(Object.prototype);

export default Object.freeze(new Input());
