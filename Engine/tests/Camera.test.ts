// © 2017 Joseph Cameron - All Rights Reserved
// Project: HTML53DRenderer
// Created on 2017-12-31.

import { expect } from 'chai'
import Camera from "Engine/Graphics/Camera"
import Scenegraph from "Engine/Graphics/Scenegraph"
import Vector3 from "Engine/Math/Vector3"

describe("Camera", () => 
{
    //=================
    // Public interface
    //=================
    it("setTransform", () => 
    {
        const a = document.createElement("div");
        const b = new Scenegraph();
        const c = new Camera(a,b);
        const d = new Vector3(1,2,3);
        const e = new Vector3(4,5,6);

        c.setTransform(d,e);

        expect
        (
            true
        )
        .to.equal(true);
    });

    it("getDiv", () => 
    {
        const a = document.createElement("div");
        const b = new Scenegraph();
        const c = new Camera(a,b);

        expect
        (
            c.getDiv() != undefined
        )
        .to.equal(true);
    });

    //=============
    // Constructors
    //=============
    it("HTMLElement, Scenegraph constructor", () => 
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
