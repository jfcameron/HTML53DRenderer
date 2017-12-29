// © 2017 Joseph Cameron - All Rights Reserved
// Project: HTM53DRenderer
// Created on 2017-12-22.

import Debug from "Engine/Debug"
import Exceptions from "Engine/Debug/Exceptions"
import Vector2 from "Engine/Math/Vector2"
import WebAPIs from "Engine/WebAPIs"

const TAG: string = "Mouse";

const DELTA_VALUE_LIFETIME_MS: number = 16;

/**
* @description synchronous wrapper for mouse related apis.
*/
class Mouse
{
    private m_Buttons: {[code: number]: number} = {};

    private m_ClientPosition: Vector2 = new Vector2();

    private m_Delta: Vector2 = new Vector2();
    private m_DeltaTimestamp: number = 0;

    /**
     * @description returns true if the button was just pressed or has been pressed for a while
     * @param aButton index of the button.
     */
    public getButton(aButton: number): boolean
    {
        return this.m_Buttons[aButton] != undefined;
    }

    /**
     * @description returns true only if the button was just pressed
     * @param aButton index of the button.
     */
    public getButtonDown(aButton: number): boolean
    {
        return this.m_Buttons[aButton] != undefined ? WebAPIs.performance.now() - this.m_Buttons[aButton] < DELTA_VALUE_LIFETIME_MS: false;
    }
    
    public getViewportPosition(): Vector2 
    {
        return this.m_ClientPosition;
    }

    public getDelta(): Vector2 
    {
        if (WebAPIs.performance.now() - this.m_DeltaTimestamp > DELTA_VALUE_LIFETIME_MS)
            this.m_Delta.set(0,0);

        return this.m_Delta;
    }

    constructor()
    {
        if (!(this instanceof Mouse)) throw new Exceptions.Sealed();

        document.onmousedown = (event: MouseEvent) =>
        {
            if (this.m_Buttons[event.button] === undefined)
                this.m_Buttons[event.button] = event.timeStamp;
        };

        document.onmouseup = (event: MouseEvent) =>
        {
            this.m_Buttons[event.button] = undefined;
        };

        document.addEventListener("visibilitychange",():void =>
        {
            for (let button in this.m_Buttons)
                this.m_Buttons[button] = undefined;
        });

        document.addEventListener("mousemove", (event: MouseEvent) =>
        {
            this.m_ClientPosition.set(event.clientX, event.clientY);

            this.m_Delta.set(event.movementX, event.movementY);
            this.m_DeltaTimestamp = event.timeStamp;
        }, 
        false);
    }
};

export default new Mouse;
