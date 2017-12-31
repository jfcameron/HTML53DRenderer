// © 2017 Joseph Cameron - All Rights Reserved
// Project: HTML53DRenderer
// Created on 2017-12-31.

import { expect } from 'chai'
import IntervalTimer from "Engine/Time/IntervalTimer"

describe("IntervalTimer", () => 
{
    //=================
    // Public interface
    //=================
    it("destruct", () => 
    {
        const a = new IntervalTimer(16, ()=>{});
        a.destruct();

        expect
        (
            a instanceof IntervalTimer
        )
        .to.equal(true);
    });

    //=============
    // Constructors
    //=============
    it("number, updateSignature constructor", () => 
    {
        const a = new IntervalTimer(16, ()=>{});

        expect
        (
            a instanceof IntervalTimer
        )
        .to.equal(true);
    });
});
