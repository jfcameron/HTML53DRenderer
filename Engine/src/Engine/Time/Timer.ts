// © 2017 Joseph Cameron - All Rights Reserved
// Project: CSS3DRenderer
// Created on 2017-12-20.

import Exceptions from "Engine/Debug/Exceptions"

interface updateSignature { (): void }

class Timer
{
    private readonly m_IntervalHandle: number; 
    private m_TimeSinceStart: number;

    public clear(): void
    {
        clearInterval(this.m_IntervalHandle);
    }

    public toString = () : string => 
    {
        throw new Exceptions.Unimplemented();
    }

    public equalTo = () : boolean =>
    {
        throw new Exceptions.Unimplemented();
    }

    constructor(aUpdateCallback: updateSignature, aTimeInMiliseconds: number) 
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
