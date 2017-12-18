// © 2017 Joseph Cameron - All Rights Reserved
// Project: CSS3DRenderer
// Created on 2017-12-04.
"use strict";

const Debug = require("Engine/Debug");
const Exceptions = require("Engine/Debug/Exceptions");

module.exports = Object.freeze
({    
    //Top Row
    Escape : Object.freeze(27), F1 : Object.freeze(112), F2 : Object.freeze(113), F3 : Object.freeze(114), F4 : Object.freeze(115), F5 : Object.freeze(116), F6 : Object.freeze(117), F7 : Object.freeze(118), F8 : Object.freeze(119), 
    F9 : Object.freeze(120), F10 : Object.freeze(121), F11 : Object.freeze(122), F12 : Object.freeze(123), PrintScreen : Object.freeze(44), ScrollLock : Object.freeze(145), PauseBreak : Object.freeze(19),
        
    //Alphabetical characters
    Q : Object.freeze(81), W : Object.freeze(87), E : Object.freeze(69), R : Object.freeze(82), T : Object.freeze(84), Y : Object.freeze(89), U : Object.freeze(85), I : Object.freeze(73), O : Object.freeze(79), P : Object.freeze(80), 
    A : Object.freeze(65), S : Object.freeze(83), D : Object.freeze(68), F : Object.freeze(70), G : Object.freeze(71), H : Object.freeze(72), J : Object.freeze(74), K : Object.freeze(75), L : Object.freeze(76), 
    Z : Object.freeze(90), X : Object.freeze(88), C : Object.freeze(67), V : Object.freeze(86), B : Object.freeze(66), N : Object.freeze(78), M : Object.freeze(77),
        
    //Number row
    One : Object.freeze(49), Two : Object.freeze(50), Three : Object.freeze(51), Four : Object.freeze(52), Five : Object.freeze(53), Six : Object.freeze(54), Seven : Object.freeze(55), Eight : Object.freeze(56), Nine : Object.freeze(57), Zero : Object.freeze(48),  
    Tilda : Object.freeze(192), Minus : Object.freeze(109), Equals : Object.freeze(187), Backspace : Object.freeze(8), Home : Object.freeze(37), End : Object.freeze(35),
        
    //Q row
    Tab : Object.freeze(9), OpenBracket : Object.freeze(219), CloseBracket : Object.freeze(221), Backslash : Object.freeze(220), Insert : Object.freeze(45), PageUp : Object.freeze(33),
        
    //A row
    Capslock : Object.freeze(20), SemiColon : Object.freeze(186), Quote : Object.freeze(222), Enter : Object.freeze(13), Delete : Object.freeze(46), PageDown : Object.freeze(34),
        
    //Z row
    LeftShift : Object.freeze(16), Comma : Object.freeze(188), Period : Object.freeze(190), ForwardSlash : Object.freeze(191), RightShift : Object.freeze(16),
        
    //Bottom row
    LeftCommand: Object.freeze(91), RightCommand:(93), LeftControl : Object.freeze(17), LeftAlt : Object.freeze(18), Space : Object.freeze(32), RightAlt : Object.freeze(18), RightControl : Object.freeze(17),
        
    //Arrow Keys
    LeftArrow : Object.freeze(37), RightArrow : Object.freeze(39), UpArrow : Object.freeze(38), DownArrow : Object.freeze(40),
        
    //Numpad
    Numlock : Object.freeze(12), NumSlash : Object.freeze(111), NumAsterisk : Object.freeze(106), NumMinus : Object.freeze(109),
    Num7 : Object.freeze(55), Num8 : Object.freeze(56), Num9 : Object.freeze(57), NumPlus : Object.freeze(107),
    Num4 : Object.freeze(52), Num5 : Object.freeze(53), Num6 : Object.freeze(54), 
    Num1 : Object.freeze(49), Num2 : Object.freeze(50), Num3 : Object.freeze(51), NumEnter : Object.freeze(13),
    Num0 : Object.freeze(48), NumPeriod : Object.freeze(110)
});
