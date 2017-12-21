// © 2017 Joseph Cameron - All Rights Reserved
// Project: HTML53DRenderer
// Created on 2017-12-20.

import Timer from "Engine/Time/Timer"
import Debug from "Engine/Debug"
import Exceptions from "Engine/Debug/Exceptions"

function Update(): void
{
    console.log("hello");
}

Debug.Log("MYTAG", 123, "asdf", true);

const myTimer = new Timer(Update, 16);
