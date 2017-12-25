// © 2017 Joseph Cameron - All Rights Reserved
// Project: HTML53DRenderer
// Created on 2017-12-20.

import Exceptions from "Engine/Debug/Exceptions"
import Logger from "Engine/Debug/Logger"
import {loggable} from "Engine/Debug/Logger"

const TAG: string = "Debug";

/**
* @Brief Prefixed logging utilities
*/
abstract class Debug
{
    private static readonly m_Loggers: {[name: string]: Logger} =
    {
        "D": new Logger("D"),
        "E": new Logger("E")
    };

    public static Silence(aLoggerName: string, aTagName?: string)
    {
        if (this.m_Loggers[aLoggerName])
            arguments.length === 1 ?
                this.m_Loggers[aLoggerName].silence() :
                this.m_Loggers[aLoggerName].silenceTag(aTagName);
    }

    public static Log(aTag: string, ...rest: loggable[])
    {
        this.m_Loggers["D"].Log(aTag, ...rest);
    }

    public static Error(aTag: string, ...rest: loggable[])
    {
        this.m_Loggers["E"].Log(aTag, ...rest);
    }
}

export default Debug;
