// © 2017 Joseph Cameron - All Rights Reserved
// Project: HTML53DRenderer
// Created on 2017-12-26.

import Debug from "Engine/Debug"
import Exceptions from "Engine/Debug/Exceptions"
import Timer from "Engine/Time/Timer"
import { updateSignature } from "Engine/Time/Timer"
import WebAPIs from "Engine/WebAPIs"

const TAG: string = "AnimationTimer";

/**
* @description oo wrapper of requestAnimationFrame api
* @note callback is invoked whenever the browser deems it safe to render the screen.
*/
class AnimationTimer extends Timer
{
    protected readonly m_IntervalHandle: number;
    protected m_LastTime: number = WebAPIs.performance.now();

    public destruct(): void
    {
        WebAPIs.window.cancelAnimationFrame(this.m_IntervalHandle);
    }

    constructor(aUpdateCallback: updateSignature)
    {
        super();

        const callbackwrapper = () => 
        {
            aUpdateCallback(WebAPIs.performance.now() - this.m_LastTime);

            this.m_LastTime = WebAPIs.performance.now();
    
            WebAPIs.window.requestAnimationFrame(callbackwrapper);
        }

        WebAPIs.window.requestAnimationFrame(callbackwrapper);

        if (!(this instanceof AnimationTimer)) throw new Exceptions.Sealed();
    }
}

export default AnimationTimer;
