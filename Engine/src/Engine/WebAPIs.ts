// © 2017 Joseph Cameron - All Rights Reserved
// Project: HTML53DRenderer
// Created on 2017-12-27.

import Debug from "Engine/Debug"
import Exceptions from "Engine/Debug/Exceptions"

const TAG: string = "WebAPIs";

const _performance = typeof performance !== "undefined" ? performance : undefined;
const _window = typeof window !== "undefined" ? window : undefined;
const _clearInterval = typeof clearInterval !== "undefined" ? clearInterval : undefined;
const _setInterval = typeof setInterval !== "undefined" ? setInterval : undefined;
const _document = typeof document !== "undefined" ? document : undefined;

/**
* @description wrapper of immature WebAPIs used throughout the project.
*/
module WebAPIs
{
    export module document
    {
        export let onkeydown = _document.onkeydown;
        export let onkeyup = _document.onkeyup;
        
        export function addEventListener(aEventName: string, aCallback: (event: Event)=> void, aCapture?: boolean)
        {
            _document.addEventListener(aEventName, aCallback, aCapture);
        }

        export module body
        {
            export let onmousedown = _document.onmousedown;
            export let onmouseup = _document.onmouseup;
        }
    }

    export module window 
    {
        export function requestAnimationFrame(aCallback: ()=> void)
        {
            (<any>_window).requestAnimationFrame(aCallback);
        }

        export function cancelAnimationFrame(aCallbackHandle: number)
        {
            (<any>_window).cancelAnimationFrame(aCallbackHandle);
        }

        export function requestIdleCallback(aCallback: ()=> void)
        {
            (<any>_window).requestIdleCallback(aCallback);
        }

        export function cancelIdleCallback(aCallbackHandle: number)
        {
            (<any>_window).cancelIdleCallback(aCallbackHandle);
        }
    }
    
    export function setInterval(aFunc: ()=> void, aDelay: number): any
    {
        return _setInterval(aFunc, aDelay);
    }

    export function clearInterval(aIntervalID: number): void
    {
        _clearInterval(aIntervalID);
    }

    export module performance
    {
        export function now(): number {return _performance.now()}
    }
}

export default WebAPIs;
