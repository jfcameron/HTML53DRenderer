// © 2017 Joseph Cameron - All Rights Reserved
// Project: CSS3DRenderer
// Created on 2017-12-01.
"use strict";
"DEPRECATED";

import Exceptions from "Engine/Debug/Exceptions"

const TAG = "Debug";

function Debug()
{
    Object.freeze(this);
}

Object.defineProperties(Debug.prototype,
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
    }},

    "Log": {value: function(aTag)
    {
        if (typeof(aTag) !== 'string') throw Exceptions.BadArgument;

        let stringBuffer = "D/" + aTag + ": ";

        [].shift.call(arguments);

        for (const arg of arguments)
            stringBuffer += arg;
    
        console.log(stringBuffer);
    }},

    "Error": {value: function(aTag)
    {
        if (typeof(aTag) !== 'string') throw Exceptions.BadArgument;

        let stringBuffer = "E/" + aTag + ": ";

        [].shift.call(arguments);
    
        for (const arg of arguments)
            stringBuffer += arg;
        
        console.log(stringBuffer);
    }}
});

Object.freeze(Debug);

export default new Debug();
