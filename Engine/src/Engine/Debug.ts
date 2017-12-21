// © 2017 Joseph Cameron - All Rights Reserved
// Project: HTML53DRenderer
// Created on 2017-12-20.

import Exceptions from "Engine/Debug/Exceptions"

const TAG: string = "Debug";

interface toStringAble 
{
    toString(): string;
}

abstract class Debug
{
    public static Log(aTag: string, ...rest: toStringAble[])
    {
        let stringBuffer: string = "D/" + aTag + ": ";

        for (const arg of rest)
            stringBuffer += arg;
    
        console.log(stringBuffer);
    }

    public static Error(aTag: string, ...rest: toStringAble[])
    {
        let stringBuffer: string = "E/" + aTag + ": ";

        for (const arg of rest)
            stringBuffer += arg;
    
        console.log(stringBuffer);
    }
}

export default Debug;
