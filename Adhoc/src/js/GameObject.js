// © 2017 Joseph Cameron - All Rights Reserved
// Project: CSS3DRenderer
// Created on 2017-12-19.
"use strict";

import Debug from "Engine/Debug"

const TAG = "GameObject";

class GameObject
{
    constructor()
    {
        this.Secret = 1234;
    }

    GetSecret()
    {
        return this.Secret;
    }

    Update()
    {
        Debug.Log(TAG, "update");
    }
}

export default GameObject;
