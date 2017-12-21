// © 2017 Joseph Cameron - All Rights Reserved
// Project: HTML53DRenderer
// Created on 2017-12-20.

import Exceptions from "Engine/Debug/Exceptions"

const TAG: string = "Debug";

abstract class Debug
{
    public static Log = function(aTag: string, ...rest: any[])
    {
        let stringBuffer: string = "D/" + aTag + ": ";

        for (const arg of rest)
            stringBuffer += arg;
    
        console.log(stringBuffer);
    }

    public static Error = function(aTag: string, ...rest: any[])
    {
        let stringBuffer: string = "E/" + aTag + ": ";

        for (const arg of rest)
            stringBuffer += arg;
    
        console.log(stringBuffer);
    }

    public toString = () : string => 
    {
        throw new Exceptions.Unimplemented();
    }

    public equalTo = () : boolean =>
    {
        throw new Exceptions.Unimplemented();
    }
}

export default Debug;
