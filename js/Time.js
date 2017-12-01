// © 2017 Joseph Cameron - All Rights Reserved
// Project: ${PROJECTNAME}
// Created on ${YEAR-MONTH-DAY}.

function Time()
{
    //*************
    // Data members
    //*************
    var m_IntervalHandle = null; //handle to setInterval callback
    var m_TimeSinceStart = 0;    //Counts time since program start
    
    //**********
    // Accessors
    //**********
    this.getTime = function()
    {
        return m_TimeSinceStart;
    };
    
    this.setDeltaTime = function(aReferenceToAnUpdateFunction,aTimeInMiliseconds)
    {
        clearInterval(aReferenceToAnUpdateFunction);
        m_IntervalHandle = setInterval(aReferenceToAnUpdateFunction,aTimeInMiliseconds);
        setInterval(function(){m_TimeSinceStart++;},aTimeInMiliseconds);  
    }
    
    //***************
    // Time interface
    //***************
    this.start = function(aReferenceToAnUpdateFunction,aTimeInMiliseconds)
    {
        this.setDeltaTime(aReferenceToAnUpdateFunction,aTimeInMiliseconds);
        
    };   
}
