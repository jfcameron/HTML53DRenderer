// © 2017 Joseph Cameron - All Rights Reserved
// Project: HTML53DRenderer
// Created on 2017-12-26.

import Debug from "Engine/Debug"
import Exceptions from "Engine/Debug/Exceptions"
import WebAPIs from "Engine/WebAPIs"

const TAG: string = "Timer";

/**
 * @description signature of all timer callbacks.
 * @param deltaTime time since last invocation in miliseconds
 */
export interface updateSignature { (aDeltaTime: number): void }

/**
* @description commonalities of instantiable Timer types
*/
abstract class Timer
{
    protected readonly m_StartTime: number = WebAPIs.performance.now();

    /**
     * @description get miliseconds since timer was instantiated
     */
    public getElapsedTime(): number
    {
        return WebAPIs.performance.now() - this.m_StartTime;
    }

    constructor(){}
}

export default Timer;
