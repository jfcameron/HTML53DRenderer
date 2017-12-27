// © 2017 Joseph Cameron - All Rights Reserved
// Project: HTML53DRenderer
// Created on 2017-12-27.

import Debug from "Engine/Debug"
import Exceptions from "Engine/Debug/Exceptions"

const TAG: string = "WebAPIs";

const _performance = performance;
const _clearInterval = clearInterval;
const _setInterval = setInterval;

/**
* @description wrapper of all WebAPIs used throughout the project.
*/
module WebAPIs
{
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

    (()=>
    {
        console.log(_performance);
    })();
}

export default WebAPIs;
