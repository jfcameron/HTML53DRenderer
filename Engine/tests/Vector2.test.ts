// © 2017 Joseph Cameron - All Rights Reserved
// Project: HTM53DRenderer
// Created on 2017-12-24.

import { expect } from 'chai'
import Vector2 from "Engine/Math/Vector2"

describe("Vector2", () => 
{
    //=================
    // Public interface
    //=================
    it("length", () => 
    {
        let a = new Vector2(100, 100);

        expect
        (
            Math.floor(a.length()) === 141
        )
        .to.equal(true);
    });

    it("normalize", () => 
    {
        let a = new Vector2(100, 0);

        a.normalize();

        expect
        (
            a.x === 1 &&
            a.y === 0
        )
        .to.equal(true);
    });

    it("multiply", () => 
    {
        const a = new Vector2(1,2);
        const b = 3;
        const c = a.multiply(b);

        expect
        (
            c.x === 3 &&
            c.y === 6
        )
        .to.equal(true);
    });

    it("add", () => 
    {
        const a = new Vector2(1,2);
        const b = new Vector2(3,4);
        const c = a.add(b);

        expect
        (
            c.x === 4 &&
            c.y === 6
        )
        .to.equal(true);
    });

    it("set - number, number overload", () => 
    {
        const a = new Vector2(0, 0);
        a.set(1, 1);

        expect
        (
            a.x === 1 && a.y === 1
        )
        .to.equal(true);
    });

    it("set - Vector2 overload", () => 
    {
        const a = new Vector2(0, 0);
        a.set(new Vector2(1,1));

        expect
        (
            a.x === 1 && a.y === 1
        )
        .to.equal(true);
    });

    it("equalTo", () => 
    {
        const a = new Vector2(10,20);
        const b = new Vector2(10,20);

        expect
        (
            a.equalTo(b)
        )
        .to.equal(true);
    });

    it("toString", () => 
    {
        const x = 1;
        const y = 2;
        const a = new Vector2(x, y);

        expect
        (
            a.toString() === `{${x}, ${y}}`
        )
        .to.equal(true);
    });

    //=============
    // Constructors
    //=============
    it("Default constructor", () => 
    {
        const a = new Vector2(0, 0);

        expect
        (
            new Vector2().equalTo(a)
        )
        .to.equal(true);
    });

    it("number, number constructor", () => 
    {
        const a = new Vector2(1, 2);

        expect
        (
            a.x === 1 &&
            a.y === 2
        )
        .to.equal(true);
    });

    it("Copy constructor", () => 
    {
        const a = new Vector2(1, 2);
        const b = new Vector2(a);
        
        expect
        (
            a.equalTo(b)
        )
        .to.equal(true);
    });
});
