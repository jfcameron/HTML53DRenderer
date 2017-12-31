// © 2017 Joseph Cameron - All Rights Reserved
// Project: HTM53DRenderer
// Created on 2017-12-24.

import { expect } from 'chai'
import Mouse from "Engine/Input/Mouse"
import Vector2 from "Engine/Math/Vector2"

describe("Mouse", () => 
{
    //=================
    // Public interface
    //=================
    it("getButton", () => 
    {
        expect
        (
            Mouse.getButton(0) === false
        )
        .to.equal(true);
    });

    it("getButtonDown", () => 
    {
        expect
        (
            Mouse.getButtonDown(0) === false
        )
        .to.equal(true);
    });

    it("getViewportPosition()", () => 
    {
        expect
        (
            Mouse.getViewportPosition().equalTo(new Vector2())
        )
        .to.equal(true);
    });

    it("getDelta", () => 
    {
        expect
        (
            Mouse.getViewportPosition().equalTo(new Vector2())
        )
        .to.equal(true);
    });
});
