// © 2017 Joseph Cameron - All Rights Reserved
// Project: HTML53DRenderer
// Created on 2017-12-31.

import { expect } from 'chai'
import IdleTimer from "Engine/Time/IdleTimer"

describe("IdleTimer", () => 
{
    //=================
    // Public interface
    //=================
    it("destruct", () => 
    {
        const a = new IdleTimer(()=>{});
        a.destruct();

        expect
        (
            a instanceof IdleTimer
        )
        .to.equal(true);
    });

    //=============
    // Constructors
    //=============
    it("number, updateSignature constructor", () => 
    {
        const a = new IdleTimer(()=>{});

        expect
        (
            a instanceof IdleTimer
        )
        .to.equal(true);
    });
});
