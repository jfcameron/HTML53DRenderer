// © 2017 Joseph Cameron - All Rights Reserved
// Project: GDK
// Created on 2017-12-19.
"use strict";

import Debug from "Engine/Debug"
import Exceptions from "Engine/Debug/Exceptions"

const TAG = "Collider";

function Collider()
{
    // Public data
        
    // Constructors
    if (arguments.length === 0)
    {
        throw "Collider is a stub!";
    }
    else
    {
        throw Exceptions.Constructor;
    }

    // Extension rules
    Object.freeze(this); //Object.preventExtensions(this); //if (this.constructor === Collider) Object.preventExtensions(this);
};

Collider.prototype = Object.create(Object.prototype);
Collider.prototype.constructor = Collider;

// Public functions & static data
Object.defineProperties(Collider.prototype,
{
    "toString": {value: function()
    {
        if (arguments.length !== 0) throw Exceptions.BadArgument;

        throw Exceptions.Unimplemented;
    }},

    "equalTo": {value: function(aOther)
    {
        if (arguments.length !== 1)    throw Exceptions.BadArgument;
        if (!aOther instanceof(Collider)) throw Exceptions.BadArgument;

        throw Exceptions.Unimplemented;
    }}
});

Collider.prototype = Object.freeze(Object.prototype);

export default Collider;
