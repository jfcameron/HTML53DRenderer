// © 2017 Joseph Cameron - All Rights Reserved
// Project: HTML53DRenderer
// Created on 2017-12-24.

import { expect } from 'chai'
import Keyboard from "Engine/Input/Keyboard"

describe("Keyboard", () => 
{
    //=================
    // Public interface
    //=================
    it("getKey", () => 
    {
        const a = Keyboard;

        expect
        (
            a.getKey("KeyW") === false
        )
        .to.equal(true);
    });

    it("getKeyDown", () => 
    {
        const a = Keyboard;

        expect
        (
            a.getKeyDown("KeyW") === false
        )
        .to.equal(true);
    });
});
