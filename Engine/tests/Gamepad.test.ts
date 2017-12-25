// © 2017 Joseph Cameron - All Rights Reserved
// Project: HTM53DRenderer
// Created on 2017-12-24.

import { expect } from 'chai'
import Gamepad from "Engine/Input/Gamepad"

describe("Gamepad", () => 
{
    //=================
    // Public interface
    //=================

    //=============
    // Constructors
    //=============
    it("index constructor", () => 
    {
        const a = new Gamepad(0);

        expect
        (
            a != undefined
        )
        .to.equal(true);
    });
});
