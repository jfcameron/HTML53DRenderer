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
    const Tag = "Time";
    
    var Time = function()
    {
        var m_IntervalHandle = null; 
        var m_TimeSinceStart = 0;

        // Public interface
        this.getTime = function()
        {
            return m_TimeSinceStart;
        };
        
        this.setDeltaTime = function(aReferenceToAnUpdateFunction, aTimeInMiliseconds)
        {
            clearInterval(aReferenceToAnUpdateFunction);

            m_IntervalHandle = setInterval(aReferenceToAnUpdateFunction, aTimeInMiliseconds);

            setInterval
            (
                function(){ m_TimeSinceStart++; }, 
                aTimeInMiliseconds
            );
        }

        // Constructors
        if (arguments.length === 2)
        {
            let updateCallback = arguments[0], aTimeInMiliseconds = arguments[1];

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

    Time.prototype = Object.create(Object.prototype);
    
    return Time;
});
