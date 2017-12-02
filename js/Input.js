// © 2017 Joseph Cameron - All Rights Reserved
// Project: CSS3DRenderer
// Created on 2017-12-01.

function Input()
{
    //*****************
    // Public interface
    //*****************
    this.KEY = new function()
    {
        //Top Row
        this.Escape = 27; this.F1 = 112; this.F2 = 113; this.F3 = 114; this.F4 = 115; this.F5 = 116; this.F6 = 117; this.F7 = 118; this.F8 = 119; 
        this.F9 = 120; this.F10 = 121; this.F11 = 122; this.F12 = 123; this.PrintScreen = 44; this.ScrollLock = 145; this.PauseBreak = 19;

        //Alphabetical characters
        this.Q = 81; this.W = 87; this.E = 69; this.R = 82; this.T = 84; this.Y = 89; this.U = 85; this.I = 73; this.O = 79; this.P = 80; 
        this.A = 65; this.S = 83; this.D = 68; this.F = 70; this.G = 71; this.H = 72; this.J = 74; this.K = 75; this.L = 76; 
        this.Z = 90; this.X = 88; this.C = 67; this.V = 86; this.B = 66; this.N = 78; this.M = 77;
    
        //Number row
        this.One = 49; this.Two = 50; this.Three = 51; this.Four = 52; this.Five = 53; this.Six = 54; this.Seven = 55; this.Eight = 56; this.Nine = 57; this.Zero = 48;   
        this.Tilda = 192; this.Minus = 109; this.Equals = 187; this.Backspace = 8; this.Home = 37; this.End = 35;
    
        //Q row
        this.Tab = 9; this.OpenBracket = 219; this.CloseBracket = 221; this.Backslash = 220; this.Insert = 45; this.PageUp = 33;
    
        //A row
        this.Capslock = 20; this.SemiColon = 186; this.Quote = 22; this.Enter = 13; this.Delete = 46; this.PageDown = 34;
    
        //Z row
        this.LeftShift = 16; this.Comma = 188; this.Period = 190; this.ForwardSlash = 191; this.RightShift = 16;
    
        //Bottom row
        this.LeftControl = 17; this.LeftAlt = 18; this.Space = 32; this.RightAlt = 18; this.RightControl = 17;
    
        //Arrow keys
        this.LeftArrow = 37; this.RightArrow = 39; this.UpArrow = 38; this.DownArrow = 40;
    
        //Numpad
        this.Numlock = 12; this.NumSlash = 111; this.NumAsterisk = 106; this.NumMinus = 109;
        this.Num7 = 55; this.Num8 = 56; this.Num9 = 57; this.NumPlus = 107;
        this.Num4 = 52; this.Num5 = 53; this.Num6 = 54; 
        this.Num1 = 49; this.Num2 = 50; this.Num3 = 51; this.NumEnter = 13;
        this.Num0 = 48; this.NumPeriod = 110;
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

    //*************
    // Data members
    //*************
    var canvas = document.getElementById("canvas");
    
    var m_Keys = {};
    
    var m_CurrentMousePos = [0,0];
    
    //****************
    // Private methods
    //****************
    mouselock = function()
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
    
    initKeyHandlers = function()
    {
        document.onkeydown   = keyDown;
        document.onkeyup     = keyUp;
    };
    
    initMouseHandler = function()
    {
        canvas.onclick = mouselock;
        
        var check_pointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;

        if(check_pointerLock)
        {   
            canvas.requestPointerLock = canvas.requestPointerLock || canvas.mozRequestPointerLock || canvas.webkitRequestPointerLock;
            canvas.requestPointerLock();  
        }
    };
    
    keyDown = function (event)
    {
        //console.log(event);

        m_Keys[event.keyCode] = true;
    };

    keyUp = function (event)
    {
        m_Keys[event.keyCode] = false;
    };
    
    mouseUpdate = function()
    {
        m_CurrentMousePos = [0,0];
        
        if (m_Keys[27])
            document.removeEventListener("mousemove", mouseMove, false);
    };
    
    mouseMove = function (e)
    {
        var movementX = e.movementX || e.mozMovementX || e.webkitMovementX || 0;
        var movementY = e.movementY || e.mozMovementY || e.webkitMovementY || 0;
        
        m_CurrentMousePos = [movementX ,movementY];
    };
    
    initKeyHandlers();
    //initMouseHandler();    
}
