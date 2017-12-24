// © 2017 Joseph Cameron - All Rights Reserved
// Project: HTML53DRenderer
// Created on 2017-12-22.

import Debug from "Engine/Debug"
import Exceptions from "Engine/Debug/Exceptions"

const TAG: string = "Keyboard";

/**
* @Brief synchronous wrapper for keyboard related apis
*/
class Keyboard
{
    private m_Keys: {[code: string]: boolean} = {};
    
    public getKey(aCode: string): boolean
    {
        return this.m_Keys[aCode] != undefined ? this.m_Keys[aCode] : false;
    }

    constructor()
    {
        if (!(this instanceof Keyboard)) throw new Exceptions.Sealed();

        document.onkeydown = (event: KeyboardEvent): void =>
        {
            this.m_Keys[event.code] = true;
            //console.log(event);
        };

        document.onkeyup = (event: KeyboardEvent): void =>
        {
            this.m_Keys[event.code] = false;
        };
    }
};

export default new Keyboard();
