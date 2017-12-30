// © 2017 Joseph Cameron - All Rights Reserved
// Project: HTML53DRenderer
// Created on 2017-12-23.

import Debug from "Engine/Debug"
import Exceptions from "Engine/Debug/Exceptions"
import WebAPIs from "Engine/WebAPIs"

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
        private m_Buttons: {[code: number]: {value: number, timestamp: number}} = {};
        private m_Axes: {[code: number]: number} = {};

        /**
        * @description returns non zero normalized value if the button was just pressed or has been pressed for a while.
        * @param aButtonIndex index of the button.
        * @example
        * if (Gamepads.get(0).getButton(0))
        * {
        *   player.jump();
        * }
        * @example
        * translationbuffer.z += Gamepads.get(0).getButton(4) \* deltaTime \* moveSpeed;
        */
        public getButton(aButtonIndex: number): number
        {
            return this.m_Buttons[aButtonIndex] ? 
                this.m_Buttons[aButtonIndex].timestamp != undefined ?
                    this.m_Buttons[aButtonIndex].value :
                    0:
                0;
        }

        /**
        * @description returns non zero normalized value only if the button was just pressed
        * @param aButtonIndex index of the button.
        */
        public getButtonDown(aButtonIndex: number): number
        {
            return this.m_Buttons[aButtonIndex] ? 
                this.m_Buttons[aButtonIndex].timestamp != undefined ?
                    WebAPIs.performance.now() - this.m_Buttons[aButtonIndex].timestamp < GAMEPAD_POLL_INTERVAL_MS ?
                        this.m_Buttons[aButtonIndex].value :
                        0 :
                    0 : 
                0;
        }
        
        /**
         * @description returns normalized (0-1) value representing how far a joystick axis is pushed, paddle depressed, etc.
         * @param aAxisIndex 
         */
        public getAxis(aAxisIndex: number): number
        {
            return this.m_Axes[aAxisIndex] != undefined ?
                this.m_Axes[aAxisIndex] :
                0;
        }
        
        /** @param aIndex zeroed index of the connected controller this instance will track */
        constructor(aIndex: number)
        {
            if (!(this instanceof Gamepad)) throw new Exceptions.Sealed();
            
            setInterval(() =>
            {
                if (aIndex < navigator.getGamepads().length)
                {
                    const gamepad = navigator.getGamepads()[aIndex];

                    if (gamepad !== null)
                    {
                        for (let i = 0; i < gamepad.buttons.length; ++i)
                        {
                            if (this.m_Buttons[i] === undefined)
                                this.m_Buttons[i] = {} as {value: number, timestamp: number};

                            this.m_Buttons[i].timestamp = gamepad.buttons[i].pressed ?
                                !(typeof this.m_Buttons[i] === "number") ?
                                    WebAPIs.performance.now() :
                                    this.m_Buttons[i].timestamp :
                                undefined;

                            this.m_Buttons[i].value = gamepad.buttons[i].value;
                        }

                        for (let i = 0; i < gamepad.axes.length; ++i)
                            this.m_Axes[i] = gamepad.axes[i];
                    }
                    else
                    {
                        this.m_Buttons = {};
                        this.m_Axes = {};
                    }
                }
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
