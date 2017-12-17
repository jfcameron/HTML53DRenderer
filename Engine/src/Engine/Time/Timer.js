// © 2017 Joseph Cameron - All Rights Reserved
// Project: CSS3DRenderer
// Created on 2017-12-01.
"use strict";

define(
[
    "Engine/Debug/Exceptions"
], 
(Exceptions) =>
{ 
    const TAG = "Timer";
    
    const Timer = function()
    {
        let m_IntervalHandle = null; 
        let m_TimeSinceStart = 0;

        // Public interface
        this.getTime = Object.freeze(() =>
        {
            return m_TimeSinceStart;
        });
        
        this.setDeltaTime = Object.freeze((aReferenceToAnUpdateFunction, aTimeInMiliseconds) =>
        {
            if (typeof(aReferenceToAnUpdateFunction) !== 'function') throw Exceptions.BadArgument;
            if (isNaN(aTimeInMiliseconds))                           throw Exceptions.BadArgument;

            clearInterval(aReferenceToAnUpdateFunction);

            m_IntervalHandle = setInterval(aReferenceToAnUpdateFunction, aTimeInMiliseconds);

            setInterval(()=>{ m_TimeSinceStart++; }, aTimeInMiliseconds);
        });

        // Constructors
        if (arguments.length === 2)
        {
            const updateCallback     = arguments[0];
            const aTimeInMiliseconds = arguments[1];

            if (typeof(updateCallback) !== 'function') throw Exceptions.Constructor;
            if (isNaN(aTimeInMiliseconds))             throw Exceptions.Constructor;
            if (aTimeInMiliseconds <= 0 )              throw Exceptions.Constructor;

            this.setDeltaTime(updateCallback, aTimeInMiliseconds);
        }
        else
        {
            throw Exceptions.Constructor;
        }
    }

    Timer.prototype = Object.create(Object.prototype);
    
    return Timer;
});
