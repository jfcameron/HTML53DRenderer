// © 2017 Joseph Cameron - All Rights Reserved
// Project: HTML53DRenderer
// Created on 2017-12-23.

import Debug from "Engine/Debug"
import Exceptions from "Engine/Debug/Exceptions"

const TAG: string = "Gamepad";

type _Gamepad = Gamepad;

const GAMEPAD_POLL_INTERVAL_MS: number = 16;

/**
    * @description Synchronous management for all gamepads attached to the device
    * 
    * @Warning Only works on Chrome browser.
    */
module Gamepads
{
    /**
    * @description Tracks the input state of the gamepad connected at the provided index.
    * Can survive reconnection events.
    * 
    * @Warning Only works on Chrome browser.
    */
    class Gamepad
    {
        private m_GamepadHandle: _Gamepad;

        public getButton(aButtonIndex: number): boolean
        {
            //console.log(this.m_GamepadHandle.timestamp);

            return this.m_GamepadHandle && this.m_GamepadHandle.buttons.length >= aButtonIndex -1 ?
                this.m_GamepadHandle.buttons[aButtonIndex].pressed : 
                false;
        }
        
        public getAxis(aAxisIndex: number): number
        {
            return this.m_GamepadHandle && this.m_GamepadHandle.axes.length >= aAxisIndex -1 ?
                this.m_GamepadHandle.axes[aAxisIndex] : 
                0;
        }
        
        /** @param aIndex zeroed index of the connected controller this instance will track */
        constructor(aIndex: number)
        {
            if (!(this instanceof Gamepad)) throw new Exceptions.Sealed();
            
            if (aIndex < 0) throw "index must be positive";
            
            setInterval(() =>
            {
                this.m_GamepadHandle = navigator.getGamepads().length >= aIndex -1 ?
                    this.m_GamepadHandle = navigator.getGamepads()[aIndex] :
                    this.m_GamepadHandle = undefined;
            }, 
            GAMEPAD_POLL_INTERVAL_MS);
        }
    }

    const m_Gamepads: {[code: number]: Gamepad} = {};

    /**
     * @description returns gamepad at index. Guaranteed to be non null
     */
    export function get(aIndex: number): Gamepad
    {
        if (!m_Gamepads[aIndex])
            m_Gamepads[aIndex] = new Gamepad(aIndex);

        return m_Gamepads[aIndex];
    }
}

export default Gamepads;
