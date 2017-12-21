// © 2017 Joseph Cameron - All Rights Reserved
// Project: HTML53DRenderer
// Created on 2017-12-20.

import Exceptions from "Engine/Debug/Exceptions"

const TAG: string = "Timer";

interface updateSignature { (): void }

class Timer
{
    private readonly m_IntervalHandle: number; 
    private m_TimeSinceStart: number;

    public getElapsedTime(): number
    {
        return this.m_TimeSinceStart;
    }

    public clear(): void
    {
        clearInterval(this.m_IntervalHandle);
    }

    constructor(aTimeInMiliseconds: number, aUpdateCallback: updateSignature) 
    {
        this.m_IntervalHandle = setInterval
        (
            () =>
            {
                aUpdateCallback();
                this.m_TimeSinceStart++;
            }, 
            aTimeInMiliseconds
        );
    }
}

export default Timer;
