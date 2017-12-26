// © 2017 Joseph Cameron - All Rights Reserved
// Project: HTML53DRenderer
// Created on 2017-12-20.

import Debug from "Engine/Debug"
import Exceptions from "Engine/Debug/Exceptions"
import Timer from "Engine/Time/Timer"
import { updateSignature } from "Engine/Time/Timer"

const TAG: string = "IntervalTimer";

/**
* @Brief oo wrapper of setInterval
*/
class IntervalTimer extends Timer
{
    protected readonly m_IntervalHandle: number;
    protected          m_LastTime: number = performance.now();

    public destruct(): void
    {
        clearInterval(this.m_IntervalHandle);
    }

    constructor(aTickSizeInMiliseconds: number, aUpdateCallback: updateSignature) 
    {
        super();
        
        setInterval(() =>
        {
            aUpdateCallback(performance.now() - this.m_LastTime);

            this.m_LastTime = performance.now();
        }, 
        aTickSizeInMiliseconds);

        if (!(this instanceof IntervalTimer)) throw new Exceptions.Sealed();
    }
}

export default IntervalTimer;
