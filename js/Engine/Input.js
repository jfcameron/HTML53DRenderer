// © 2017 Joseph Cameron - All Rights Reserved
// Project: CSS3DRenderer
// Created on 2017-12-01.
"use strict";

define(
[
    "Engine/Debug/Exceptions",
    "Engine/Input/Keys"
], 
function(Exceptions, Keys)
{
    const TAG = "Input";
    
    let Input = function()
    {
        // Data members
        let canvas = document.getElementById("canvas");
        let m_CurrentMousePos = [0,0];
        
        let m_Keys = {};
        
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
            canvas.requestPointerLock();
            
            if ( document.pointerLockElement === canvas || document.mozPointerLockElement === canvas || document.webkitPointerLockElement === canvas )
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
            canvas.onclick = mouselock;
            
            let check_pointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;

            if (check_pointerLock)
            {   
                canvas.requestPointerLock = canvas.requestPointerLock || canvas.mozRequestPointerLock || canvas.webkitRequestPointerLock;
                canvas.requestPointerLock();  
            }
        };
        
        const keyDown = (event) =>
        {
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
            let movementX = e.movementX || e.mozMovementX || e.webkitMovementX || 0;
            let movementY = e.movementY || e.mozMovementY || e.webkitMovementY || 0;
            
            m_CurrentMousePos = [movementX ,movementY];
        };

        // Constructors
        if (arguments.length === 0)
        {
            document.onkeydown = keyDown;
            document.onkeyup   = keyUp;
        }
        else
        {
            throw Exceptions.Constructor;
        }
    }

    Input.prototype = Object.create(Object.prototype);

    Input = new Input();

    return Input;
});
