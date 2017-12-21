// © 2017 Joseph Cameron - All Rights Reserved
// Project: CSS3DRenderer
// Created on 2017-12-20.

class Timer
{
    fullName: string;

    //let m_IntervalHandle = null; 
    //let m_TimeSinceStart = 0;

    constructor(public firstName: string, public middleInitial: string, public lastName: string) 
    {
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
}

export default Timer;
