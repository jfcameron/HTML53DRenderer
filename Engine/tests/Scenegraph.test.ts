// © 2017 Joseph Cameron - All Rights Reserved
// Project: HTML53DRenderer
// Created on 2017-12-31.

import { expect } from 'chai'
import Scenegraph from "Engine/Graphics/Scenegraph"

describe("Scenegraph", () => 
{
    //=================
    // Public interface
    //=================
    it("getRootDiv", () => 
    {
        const a = new Scenegraph();

        expect
        (
            a.getRootDiv() instanceof HTMLElement
        )
        .to.equal(true);
    });

    it("hide", () => 
    {
        const a = new Scenegraph();

        a.hide();

        expect
        (
            a instanceof Scenegraph
        )
        .to.equal(true);
    });

    it("show", () => 
    {
        const a = new Scenegraph();

        a.show();

        expect
        (
            a instanceof Scenegraph
        )
        .to.equal(true);
    });

    //=============
    // Constructors
    //=============
    it("Default constructor", () => 
    {
        const a = new Scenegraph();

        expect
        (
            a instanceof Scenegraph
        )
        .to.equal(true);
    });
});
