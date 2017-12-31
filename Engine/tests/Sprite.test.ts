// © 2017 Joseph Cameron - All Rights Reserved
// Project: HTML53DRenderer
// Created on 2017-12-31.

import { expect } from 'chai'
import Sprite from "Engine/Graphics/Sprite"

describe("Sprite", () => 
{
    //=================
    // Public interface
    //=================
    //public draw(aU: number, aV: number, cellWidth: number, cellHeight: number): void
    it("draw", () => 
    {
        const c = "ThisIsAString";
        const b = document.createElement("div");
        const a = new Sprite(b,c);

        const q = 0;
        const w = 0;
        const e = 0;
        const r = 0;

        a.draw(q,w,e,r);

        expect
        (
            typeof a.draw === "function"
        )
        .to.equal(true);
    });

    //=============
    // Constructors
    //=============
    it("Default HTMLDivElement, HTMLImageElement constructor", () => 
    {
        const c = new Image();
        const b = document.createElement("div");
        const a = new Sprite(b,c);

        expect
        (
            a instanceof Sprite
        )
        .to.equal(true);
    });

    it("Default HTMLDivElement, string constructor", () => 
    {
        const c = "ThisIsAString";
        const b = document.createElement("div");
        const a = new Sprite(b,c);

        expect
        (
            a instanceof Sprite
        )
        .to.equal(true);
    });
});
