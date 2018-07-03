// © 2017 Joseph Cameron - All Rights Reserved
// Project: HTML53DRenderer
// Created on 2017-12-22.

import Debug from "Engine/Debug"
import Exceptions from "Engine/Debug/Exceptions"
import WebAPIs from "Engine/WebAPIs"

const TAG: string = "Keyboard";

const KEY_JUST_PRESSED_WINDOW: number = 16;

/**
* @description synchronous wrapper for keyboard related apis
*/
class Keyboard
{
    private m_Keys: {[code: string]: number} = {};
    
    /**
     * @description returns true if the key was just pressed or has been pressed for a while
     * @param aCode keycode for the key.
     */
    public getKey(aKeyCode: string): boolean
    {
        return this.m_Keys[aKeyCode] != undefined;
    }

    /**
     * @description returns true only if the key was just pressed
     * @param aCode keycode for the key.
     */
    public getKeyDown(aCode: string): boolean
    {
        return this.m_Keys[aCode] != undefined ? 
            WebAPIs.performance.now() - this.m_Keys[aCode] < KEY_JUST_PRESSED_WINDOW: 
            false;
    }

    constructor()
    {
        if (!(this instanceof Keyboard)) throw new Exceptions.Sealed();

        window.onkeydown = (event: KeyboardEvent): void =>
        {
            if (this.m_Keys[event.code] === undefined) this.m_Keys[event.code] = event.timeStamp;
        };

        window.onkeyup = (event: KeyboardEvent): void =>
        {
            this.m_Keys[event.code] = undefined;
        };

        document.addEventListener("visibilitychange",():void =>
        {
            for (let key in this.m_Keys) this.m_Keys[key] = undefined;
        });
    }
};

export default new Keyboard();
