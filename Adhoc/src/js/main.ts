// © 2017 Joseph Cameron - All Rights Reserved
// Project: HTML53DRenderer
// Created on 2017-12-20.

import Timer from "Engine/Time/Timer"
import Debug from "Engine/Debug"
import Exceptions from "Engine/Debug/Exceptions"

import Vector2 from "Engine/Math/Vector2"
import Vector3 from "Engine/Math/Vector3"

const TAG: string = "Main";

function Update(): void
{
    console.log("hello");
}

Debug.Log(TAG, 123, "asdf", true);

const myVector2: Vector2 = new Vector2(1);

Debug.Log(TAG, myVector2);

const myTimer = new Timer(Update, 16);
