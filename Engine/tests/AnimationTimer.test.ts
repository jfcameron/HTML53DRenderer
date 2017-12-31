// © 2017 Joseph Cameron - All Rights Reserved
// Project: HTML53DRenderer
// Created on 2017-12-31.

import { expect } from 'chai'
import AnimationTimer from "Engine/Time/AnimationTimer"

describe("AnimationTimer", () => 
{
    //=================
    // Public interface
    //=================
    it("destruct", () => 
    {
        const a = new AnimationTimer(()=>{});
        a.destruct();

        expect
        (
            a instanceof AnimationTimer
        )
        .to.equal(true);
    });

    //=============
    // Constructors
    //=============
    it("number, updateSignature constructor", () => 
    {
        const a = new AnimationTimer(()=>{});

        expect
        (
            a instanceof AnimationTimer
        )
        .to.equal(true);
    });
});
