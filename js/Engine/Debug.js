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

    const Debug = function()
    {
        Object.freeze(this);
    }

    Debug.prototype.Log = Object.freeze((aTag) =>
    {
        if (typeof(aTag) !== 'string') throw Exceptions.BadArgument;

        let stringBuffer = "D/" + aTag + ": ";

        for (const arg of arguments)
            stringBuffer += arg;
    
        console.log(stringBuffer);
    });

    Debug.prototype.Error = Object.freeze((aTag) =>
    {
        if (typeof(aTag) !== 'string') throw Exceptions.BadArgument;

        let stringBuffer = "E/" + aTag + ": ";
    
        for (const arg of arguments)
            stringBuffer += arg;
        
        console.log(stringBuffer);
    });

    return new Debug();
});
