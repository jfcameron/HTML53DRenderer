// © 2017 Joseph Cameron - All Rights Reserved
// Project: CSS3DRenderer
// Created on 2017-12-01.
"use strict";

define(
[
    "Engine/Debug/Exceptions"
], 
function(Exceptions) 
{ 
    const TAG = "Time";
    
    const Time = function()
    {
        let m_IntervalHandle = null; 
        let m_TimeSinceStart = 0;

        // Public interface
        this.GetTime = Object.freeze(() =>
        {
            return m_TimeSinceStart;
        });

        this.Clear = Object.freeze(() =>
        {
            clearInterval(m_IntervalHandle);
        });

        // Constructors
        if (arguments.length === 2)
        {
            const updateCallback     = arguments[0];
            const aTimeInMiliseconds = arguments[1];

            if (typeof(updateCallback) !== 'function') throw Exceptions.Constructor;
            if (isNaN(aTimeInMiliseconds))             throw Exceptions.Constructor;
            if (aTimeInMiliseconds <= 0 )              throw Exceptions.Constructor;

            clearInterval(updateCallback);

            m_IntervalHandle = setInterval(updateCallback, aTimeInMiliseconds);

            setInterval(()=>{ m_TimeSinceStart++; }, aTimeInMiliseconds);
        }
        else
        {
            throw Exceptions.Constructor;
        }
    }

    Time.prototype = Object.create(Object.prototype);
    
    return Time;
});
