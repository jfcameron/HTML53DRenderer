// © 2017 Joseph Cameron - All Rights Reserved
// Project: HTML53DRenderer
// Created on 2017-12-24.

import Exceptions from "Engine/Debug/Exceptions"

const TAG: string = "Logger";

/**
* @description type requirement for Logger.Log(...) params
*/
export interface loggable { toString(): string; }

/**
* @description Prefixed logger with tag & logger based silencing
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

    /**
     * @param aTag special string to identify caller by location in code, can be used to suppress certain logs
     * @param rest anything that can be represented as a string
     */
    public Log(aTag: string, ...rest: loggable[])
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

export default Logger
