// © 2017 Joseph Cameron - All Rights Reserved
// Project: HTML53DRenderer
// Created on 2017-12-20.

import Debug from "Engine/Debug"
import Exceptions from "Engine/Debug/Exceptions"
import Timer from "Engine/Time/Timer"
import { updateSignature } from "Engine/Time/Timer"
import WebAPIs from "Engine/WebAPIs"

const TAG: string = "IntervalTimer";

/**
* @description oo wrapper of setInterval
* @note callback is called every number of miliseconds specified by user in aTickSizeInMiliseconds ctor param
*/
class IntervalTimer extends Timer
{
    protected readonly m_IntervalHandle: number;
    protected m_LastTime: number = WebAPIs.performance.now();

    public destruct(): void
    {
        WebAPIs.clearInterval(this.m_IntervalHandle);
    }

    constructor(aTickSizeInMiliseconds: number, aUpdateCallback: updateSignature) 
    {
        super();
        
        this.m_IntervalHandle = WebAPIs.setInterval(() =>
        {
            aUpdateCallback(WebAPIs.performance.now() - this.m_LastTime);

            this.m_LastTime = WebAPIs.performance.now();
        }, 
        aTickSizeInMiliseconds);

        if (!(this instanceof IntervalTimer)) throw new Exceptions.Sealed();
    }
}

export default IntervalTimer;
