// © 2017 Joseph Cameron - All Rights Reserved
// Project: CSS3DRenderer
// Created on 2017-12-01.
"use strict";

define(
[
    
], 
function() 
{ 
    return function(aReferenceToAnUpdateFunction, aTimeInMiliseconds)
    {
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

        // Data members
        var m_IntervalHandle = null; 
        var m_TimeSinceStart = 0;
        
        // Constructors
        if ( typeof(aReferenceToAnUpdateFunction) === 'function' &&
            !isNaN(aTimeInMiliseconds) &&
            aTimeInMiliseconds > 0 )
        {
            this.setDeltaTime(aReferenceToAnUpdateFunction, aTimeInMiliseconds);
        }
        else
        {
            throw "Invalid args";
        }
    }
});
