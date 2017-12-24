import { expect } from 'chai'

import Vector2 from "Engine/Math/Vector2"

describe("Vector2 tests", () => 
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

    it("set", () => 
    {
        const a = new Vector2(0, 0);
        a.set(1, 1);

        expect
        (
            a.x === 1 && a.y === 1
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
