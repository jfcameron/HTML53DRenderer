// © 2017 Joseph Cameron - All Rights Reserved
// Project: HTM53DRenderer
// Created on 2017-12-24.

import { expect } from 'chai'
import Gamepads from "Engine/Input/Gamepads"

describe("Gamepads", () => 
{
    //=================
    // Public interface
    //=================
    it("getButton", () => 
    {
        expect
        (
            Gamepads.get(0).getButton(0) === 0
        )
        .to.equal(true);
    });

    it("getButtonDown", () => 
    {
        expect
        (
            Gamepads.get(0).getButtonDown(0) === 0
        )
        .to.equal(true);
    });

    it("getAxis", () => 
    {
        expect
        (
            Gamepads.get(0).getAxis(0) === 0
        )
        .to.equal(true);
    });

    it("get", () => 
    {
        expect
        (
            Gamepads.get(0) != undefined && 
            Gamepads.get(1) != undefined && 
            Gamepads.get(100) != undefined
        )
        .to.equal(true);
    });
});
