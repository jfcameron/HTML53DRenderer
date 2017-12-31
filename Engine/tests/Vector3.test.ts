// © 2017 Joseph Cameron - All Rights Reserved
// Project: HTM53DRenderer
// Created on 2017-12-24.

import { expect } from 'chai'
import Vector3 from "Engine/Math/Vector3"

describe("Vector3", () => 
{
    //=================
    // Public interface
    //=================
    it("length", () => 
    {
        const a = new Vector3(100, 100, 100);

        expect
        (
            Math.floor(a.length()) === 173
        )
        .to.equal(true);
    });

    it("normalize", () => 
    {
        const a = new Vector3(1, 2, 3).normalize();

        expect
        (
            a.x === 0.2672612419124244 &&
            a.y === 0.5345224838248488 &&
            a.z === 0.8017837257372732
        )
        .to.equal(true);
    });

    it("multiply", () => 
    {
        const a = new Vector3(1,2,3);
        const b = 3;
        const c = a.multiply(b);

        expect
        (
            c.x === 3 &&
            c.y === 6 &&
            c.z === 9
        )
        .to.equal(true);
    });

    it("add", () => 
    {
        const a = new Vector3(1,2,3);
        const b = new Vector3(3,4,5);
        const c = a.add(b);

        expect
        (
            c.x === 4 &&
            c.y === 6 &&
            c.z === 8
        )
        .to.equal(true);
    });

    it("set", () => 
    {
        const a = new Vector3(0, 0, 0);
        a.set(1, 1, 1);

        expect
        (
            a.x === 1 && a.y === 1 && a.z === 1
        )
        .to.equal(true);
    });

    it("equalTo", () => 
    {
        const a = new Vector3(10, 20, 30);
        const b = new Vector3(10, 20, 30);

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
        const z = 3;
        const a = new Vector3(x, y, z);

        expect
        (
            a.toString() === `{${x}, ${y}, ${z}}`
        )
        .to.equal(true);
    });

    //=============
    // Constructors
    //=============
    it("Default constructor", () => 
    {
        const a = new Vector3(0, 0, 0);

        expect
        (
            new Vector3().equalTo(a)
        )
        .to.equal(true);
    });

    it("Copy constructor", () => 
    {
        const a = new Vector3(1, 2, 3);
        const b = new Vector3(a);
        
        expect
        (
            a.equalTo(b)
        )
        .to.equal(true);
    });

    it("number, number, number constructor", () => 
    {
        const a = new Vector3(1, 2, 3);

        expect
        (
            a.x === 1 &&
            a.y === 2 &&
            a.z === 3
        )
        .to.equal(true);
    });
});
