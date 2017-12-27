// © 2017 Joseph Cameron - All Rights Reserved
// Project: HTML53DRenderer
// Created on 2017-12-26.

import Debug from "Engine/Debug"
import Exceptions from "Engine/Debug/Exceptions"
import Timer from "Engine/Time/Timer"
import { updateSignature } from "Engine/Time/Timer"

const TAG: string = "IdleTimer";

/**
* @description oo wrapper of requestIdleCallback api
* @note callback invoked whenever the browser is idling
*/
class IdleTimer extends Timer
{
    protected readonly m_IntervalHandle: number;
    protected          m_LastTime: number = performance.now();

    public destruct(): void
    {
        (<any>window).cancelIdleCallback(this.m_IntervalHandle);
    }

    constructor(aUpdateCallback: updateSignature)
    {
        super();

        const callbackwrapper = () => 
        {
            aUpdateCallback(performance.now() - this.m_LastTime);

            this.m_LastTime = performance.now();
    
            (<any>window).requestIdleCallback(callbackwrapper);
        }

        (<any>window).requestIdleCallback(callbackwrapper);

        if (!(this instanceof IdleTimer)) throw new Exceptions.Sealed();
    }
}

export default IdleTimer;
