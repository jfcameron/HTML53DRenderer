// © 2017 Joseph Cameron - All Rights Reserved
// Project: HTML53DRenderer
// Created on 2017-12-26.

import Debug from "Engine/Debug"
import Exceptions from "Engine/Debug/Exceptions"
import Timer from "Engine/Time/Timer"
import { updateSignature } from "Engine/Time/Timer"

const TAG: string = "AnimationTimer";

/**
* @Brief oo wrapper of requestAnimationFrame api
*/
class AnimationTimer extends Timer
{
    protected readonly m_IntervalHandle: number;
    protected          m_LastTime: number = performance.now();

    public destruct(): void
    {
        (<any>window).cancelAnimationFrame(this.m_IntervalHandle);
    }

    constructor(aUpdateCallback: updateSignature)
    {
        super();

        const callbackwrapper = () => 
        {
            aUpdateCallback(performance.now() - this.m_LastTime);

            this.m_LastTime = performance.now();
    
            (<any>window).requestAnimationFrame(callbackwrapper);
        }

        (<any>window).requestAnimationFrame(callbackwrapper);

        if (!(this instanceof AnimationTimer)) throw new Exceptions.Sealed();
    }
}

export default AnimationTimer;
