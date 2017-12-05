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
    const TAG = "Debug";

    let Debug = function(){}

    Debug.prototype.Log = Object.freeze(function(aTag)
    {
        if (!arguments.length > 0)     throw Exceptions.BadArgument;
        if (typeof(aTag) !== 'string') throw Exceptions.BadArgument;

        let stringBuffer = "D/" + aTag + ": ";

        for (let arg of arguments)
            stringBuffer += arg;
    
        console.log(stringBuffer);
    });

    Debug.prototype.Error = Object.freeze(function(aTag)
    {
        if (!arguments.length > 0)     throw Exceptions.BadArgument;
        if (typeof(aTag) !== 'string') throw Exceptions.BadArgument;

        let stringBuffer = "E/" + aTag + ": ";
    
        for (let arg of arguments)
            stringBuffer += arg;
        
        console.log(stringBuffer);
    });

    Debug = new Debug();

    return Debug;
});
