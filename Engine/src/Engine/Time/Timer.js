// © 2017 Joseph Cameron - All Rights Reserved
// Project: CSS3DRenderer
// Created on 2017-12-01.
"use strict";

import Exceptions from "Engine/Debug/Exceptions"

const TAG = "Timer";
    
function Timer()
{
    let m_IntervalHandle = null; 
    let m_TimeSinceStart = 0;

    this.getTime = Object.freeze(() =>
    {
        return m_TimeSinceStart;
    });

    Object.defineProperties(this,
    {
        "setDeltaTime": {value: (aReferenceToAnUpdateFunction, aTimeInMiliseconds) => 
        {
            if (typeof(aReferenceToAnUpdateFunction) !== 'function') throw Exceptions.BadArgument;
            if (isNaN(aTimeInMiliseconds))                           throw Exceptions.BadArgument;

            clearInterval(aReferenceToAnUpdateFunction);

            m_IntervalHandle = setInterval(aReferenceToAnUpdateFunction, aTimeInMiliseconds);

            setInterval(()=>{ m_TimeSinceStart++; }, aTimeInMiliseconds);
        }}
    });
    
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

    Object.preventExtensions(this);
}

Timer.prototype = Object.create(Object.prototype);
Timer.prototype.constructor = Timer;

Object.defineProperties(Timer.prototype,
{
    "toString": {value: function()
    {
        if (arguments.length !== 0) throw Exceptions.BadArgument;

        throw Exceptions.Unimplemented;
    }},

    "equalTo": {value: function(aOther)
    {
        if (arguments.length !== 1)    throw Exceptions.BadArgument;
        if (!aOther instanceof(Color)) throw Exceptions.BadArgument;

        throw Exceptions.Unimplemented;
    }}
});

Object.freeze(Timer);
    
export default Timer;
