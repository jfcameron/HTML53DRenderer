// © 2017 Joseph Cameron - All Rights Reserved
// Project: HTML53DRenderer
// Created on 2017-12-20.

import Exceptions from "Engine/Debug/Exceptions"

const TAG: string = "Debug";

interface toStringAble { toString(): string; }

/**
* @Brief Prefixed logger with tag & logger based silencing
*/
class Logger
{
    private m_TagBlock: {[tagName: string]: boolean} = {};
    private m_Disabled = false;

    public silenceTag(aTag: string)
    {
        this.m_TagBlock[aTag] = true;
    }

    public silence()
    {
        this.m_Disabled = true;
    }

    public Log(aTag: string, ...rest: toStringAble[])
    {
        if (!this.m_Disabled && !this.m_TagBlock[aTag])
        {
            let stringBuffer: string = this.m_ChannelPrefix + "/" + aTag + ": ";

            for (const arg of rest)
                stringBuffer += arg;
    
            console.log(stringBuffer);
        }
    }

    constructor(public readonly m_ChannelPrefix: string){}
}

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

    public static Log(aTag: string, ...rest: toStringAble[])
    {
        this.m_Loggers["D"].Log(aTag, ...rest);
    }

    public static Error(aTag: string, ...rest: toStringAble[])
    {
        this.m_Loggers["E"].Log(aTag, ...rest);
    }
}

export default Debug;
