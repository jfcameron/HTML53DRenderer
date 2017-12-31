// © 2017 Joseph Cameron - All Rights Reserved
// Project: HTML53DRenderer
// Created on 2017-12-31.

import { expect } from 'chai'
import Camera from "Engine/Graphics/Camera"
import Scenegraph from "Engine/Graphics/Scenegraph"

describe("Camera", () => 
{
    //=================
    // Public interface
    //=================
    /*it("set", () => 
    {
        const a = new Camera();

        expect
        (
            false
        )
        .to.equal(true);
    });

    it("toString", () => 
    {
        const x = 0, y = 0;
        const a = new Camera();

        expect
        (
            "" + a == `{${x}, ${y}}`
        )
        .to.equal(true);
    });

    it("equalTo", () => 
    {
        const a = new Camera();
        const b = new Camera();

        expect
        (
            a.equalTo(b);
        )
        .to.equal(true);
    });*/

    //=============
    // Constructors
    //=============
    it("Default constructor", () => 
    {
        const a = document.createElement("div");
        const b = new Scenegraph();
        const c = new Camera(a,b);

        expect
        (
            c !== undefined
        )
        .to.equal(true);
    });
});
