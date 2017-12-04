// © 2017 Joseph Cameron - All Rights Reserved
// Project: CSS3DRenderer
// Created on 2017-12-01.
"use strict";

define(
[
    "Engine/Debug/Exceptions"
], 
function(Exceptions)
{
    const Tag = "Input";
    
    let Input = function()
    {
        // Public interface
        this.KEY =
        {
            //Top Row
             Escape : 27, F1 : 112, F2 : 113, F3 : 114, F4 : 115, F5 : 116, F6 : 117, F7 : 118, F8 : 119, 
             F9 : 120, F10 : 121, F11 : 122, F12 : 123, PrintScreen : 44, ScrollLock : 145, PauseBreak : 19,
            
            //Alphabetical characters
             Q : 81, W : 87, E : 69, R : 82, T : 84, Y : 89, U : 85, I : 73, O : 79, P : 80, 
             A : 65, S : 83, D : 68, F : 70, G : 71, H : 72, J : 74, K : 75, L : 76, 
             Z : 90, X : 88, C : 67, V : 86, B : 66, N : 78, M : 77,
            
            //Number row
             One : 49, Two : 50, Three : 51, Four : 52, Five : 53, Six : 54, Seven : 55, Eight : 56, Nine : 57, Zero : 48,  
             Tilda : 192, Minus : 109, Equals : 187, Backspace : 8, Home : 37, End : 35,
            
            //Q row
             Tab : 9, OpenBracket : 219, CloseBracket : 221, Backslash : 220, Insert : 45, PageUp : 33,
            
            //A row
             Capslock : 20, SemiColon : 186, Quote : 22, Enter : 13, Delete : 46, PageDown : 34,
            
            //Z row
             LeftShift : 16, Comma : 188, Period : 190, ForwardSlash : 191, RightShift : 16,
            
            //Bottom row
             LeftControl : 17, LeftAlt : 18, Space : 32, RightAlt : 18, RightControl : 17,
            
            //Arrow keys
             LeftArrow : 37, RightArrow : 39, UpArrow : 38, DownArrow : 40,
            
            //Numpad
             Numlock : 12, NumSlash : 111, NumAsterisk : 106, NumMinus : 109,
             Num7 : 55, Num8 : 56, Num9 : 57, NumPlus : 107,
             Num4 : 52, Num5 : 53, Num6 : 54, 
             Num1 : 49, Num2 : 50, Num3 : 51, NumEnter : 13,
             Num0 : 48, NumPeriod : 110
        };

        this.update = function()
        {
            mouseUpdate();
        };
        
        this.getKey = function(aKey)
        {
            return m_Keys[aKey];
        };
        
        this.getMouseDelta = function()
        {
            return m_CurrentMousePos;
        };

        // Data members
        let canvas = document.getElementById("canvas");
        
        let m_Keys = {};
        
        let m_CurrentMousePos = [0,0];
        
        // Private methods
        let mouselock = function()
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
        
        let initMouseHandler = function()
        {
            canvas.onclick = mouselock;
            
            let check_pointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;

            if (check_pointerLock)
            {   
                canvas.requestPointerLock = canvas.requestPointerLock || canvas.mozRequestPointerLock || canvas.webkitRequestPointerLock;
                canvas.requestPointerLock();  
            }
        };
        
        let keyDown = function (event)
        {
            //console.log(event);

            m_Keys[event.keyCode] = true;
        };

        let keyUp = function (event)
        {
            m_Keys[event.keyCode] = false;
        };
        
        let mouseUpdate = function()
        {
            m_CurrentMousePos = [0,0];
            
            if (getKey(Input.KEY.Escape))
                document.removeEventListener("mousemove", mouseMove, false);
        };
        
        let mouseMove = function (e)
        {
            let movementX = e.movementX || e.mozMovementX || e.webkitMovementX || 0;
            let movementY = e.movementY || e.mozMovementY || e.webkitMovementY || 0;
            
            m_CurrentMousePos = [movementX ,movementY];
        };

        // Constructors
        if (arguments.length === 0)
        {
            document.onkeydown = keyDown;
            document.onkeyup = keyUp;

            //initMouseHandler();
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
