// © 2017 Joseph Cameron - All Rights Reserved
// Project: HTM53DRenderer
// Created on 2017-12-24.

import { expect } from 'chai'
import GraphicsObject from "Engine/Graphics/GraphicsObject"
import Scenegraph from "Engine/Graphics/Scenegraph"
import Vector3 from "Engine/Math/Vector3"

describe("GraphicsObject", () => 
{
    //=================
    // Public interface
    //=================
    it("draw", () => 
    {
        const a = document.createElement("div");
        const b = new Scenegraph();
        const c = new GraphicsObject(a,b);

        const d = new Vector3();
        const e = new Vector3();
        const f = new Vector3();

        c.draw(d,e,f);

        expect
        (
            c !== undefined
        )
        .to.equal(true);
    });

    it("getRootDiv", () => 
    {
        const a = document.createElement("div");
        const b = new Scenegraph();
        const c = new GraphicsObject(a,b);

        expect
        (
            c.getRootDiv() instanceof HTMLDivElement
        )
        .to.equal(true);
    });

    //=============
    // Constructors
    //=============
    it("HTMLDivElement, Scenegraph constructor", () => 
    {
        const a = document.createElement("div");
        const b = new Scenegraph();
        const c = new GraphicsObject(a,b);

        expect
        (
            c !== undefined
        )
        .to.equal(true);
    });

    it("HTMLDivElement[], Scenegraph constructor", () => 
    {
        const a = [document.createElement("div")];
        const b = new Scenegraph();
        const c = new GraphicsObject(a,b);

        expect
        (
            c !== undefined
        )
        .to.equal(true);
    });

    it("HTMLDivElement, Scenegraph, Vector3, Vector3 constructor", () => 
    {
        const a = document.createElement("div");
        const b = new Scenegraph();
        const c = new Vector3();
        const d = new Vector3();
        const e = new GraphicsObject(a,b,c,d);

        expect
        (
            e !== undefined
        )
        .to.equal(true);
    });

    it("HTMLDivElement[], Scenegraph, Vector3, Vector3 constructor", () => 
    {
        const a = [document.createElement("div")];
        const b = new Scenegraph();
        const c = new Vector3();
        const d = new Vector3();
        const e = new GraphicsObject(a,b,c,d);

        expect
        (
            e !== undefined
        )
        .to.equal(true);
    });

    it("HTMLDivElement, Scenegraph, Vector3, Vector3, Vector3 constructor", () => 
    {
        const a = document.createElement("div");
        const b = new Scenegraph();
        const c = new Vector3();
        const d = new Vector3();
        const e = new Vector3();
        const f = new GraphicsObject(a,b,c,d);

        expect
        (
            f !== undefined
        )
        .to.equal(true);
    });

    it("HTMLDivElement[], Scenegraph, Vector3, Vector3, Vector3 constructor", () => 
    {
        const a = [document.createElement("div")];
        const b = new Scenegraph();
        const c = new Vector3();
        const d = new Vector3();
        const e = new Vector3();
        const f = new GraphicsObject(a,b,c,d);

        expect
        (
            f !== undefined
        )
        .to.equal(true);
    });
});
