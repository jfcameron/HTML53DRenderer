// © 2017 Joseph Cameron - All Rights Reserved
// Project: HTML53DRenderer
// Created on 2017-12-26.

import Debug from "Engine/Debug"
import Exceptions from "Engine/Debug/Exceptions"

const TAG: string = "Timer";

export interface updateSignature { (aDeltaTime: number): void }

/**
* @Brief commonalities of instantiable Timer types
*/
abstract class Timer
{
    protected readonly m_StartTime: number = performance.now();

    public getElapsedTime(): number
    {
        return performance.now() - this.m_StartTime;
    }

    constructor(){}
}

export default Timer;
