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
    private m_Buttons: {[code: number]: boolean} = {};

    private m_ClientPosition: Vector2 = new Vector2();

    private m_Delta: Vector2 = new Vector2();
    private m_DeltaTimestamp: number = 0;

    public getButton(aButton: number): boolean
    {
        return this.m_Buttons[aButton] != undefined ? this.m_Buttons[aButton] : false;
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

        WebAPIs.document.body.onmousedown = (event: MouseEvent) =>
        {
            this.m_Buttons[event.button] = true;
        };

        WebAPIs.document.body.onmouseup = (event: MouseEvent) =>
        {
            this.m_Buttons[event.button] = false;
        };

        WebAPIs.document.addEventListener("mousemove", (event: MouseEvent) =>
        {
            this.m_ClientPosition.set(event.clientX, event.clientY);

            this.m_Delta.set(event.movementX, event.movementY);
            this.m_DeltaTimestamp = event.timeStamp;
        }, 
        false);
    }
};

export default new Mouse;
