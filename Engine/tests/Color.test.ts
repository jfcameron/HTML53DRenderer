// © 2017 Joseph Cameron - All Rights Reserved
// Project: HTM53DRenderer
// Created on 2017-12-24.

import { expect } from 'chai'
import Color from "Engine/Graphics/Color"

describe("Color", () => 
{
    //=================
    // Public interface
    //=================
    it("set - RGBA overload", () => 
    {
        const r = 255, g = 128, b = 75, a = 0.5;
        const col = new Color(0,0,0,0);

        col.set(r, g, b, a);

        expect
        (
            col.equalTo(new Color(r, g, b, a))
        )
        .to.equal(true);
    });

    it("set - Color overload", () => 
    {
        const another = new Color(4,3,2,1);
        const col = new Color(1,1,1,1);

        col.set(another);

        expect
        (
            col.equalTo(another)
        )
        .to.equal(true);
    });

    it("toString", () => 
    {
        const r = 0, g = 0, b = 0, a = 0.25;
        const col = new Color(r,g,b,a);

        expect
        (
            "" + col == `{${r}, ${g}, ${b}, ${a}}`
        )
        .to.equal(true);
    });

    it("equalTo", () => 
    {
        const r = 1, g = 2, b = 3, a = 0;
        const c1 = new Color(r,g,b,a);
        const c2 = new Color(r,g,b,a);

        expect
        (
            c1.equalTo(c2)
        )
        .to.equal(true);
    });

    //=============
    // Constructors
    //=============
    it("RGBA constructor", () => 
    {
        const r = 0, g = 0, b = 255, a = 0;
        const col = new Color(r, g, b, a);

        expect
        (
            col.equalTo(new Color(r, g, b, a))
        )
        .to.equal(true);
    });

    it("RGB constructor", () => 
    {
        const r = 0, g = 0, b = 255;
        const col = new Color(r, g, b);

        expect
        (
            col.equalTo(new Color(r, g, b, 1))
        )
        .to.equal(true);
    });
});
