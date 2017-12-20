// © 2017 Joseph Cameron - All Rights Reserved
// Project: CSS3DRenderer
// Created on 2017-12-02.
"use strict";

import Exceptions from "Engine/Debug/Exceptions"
import GraphicsObject from "Engine/Graphics/GraphicsObject"
import Quad from "Engine/Graphics/Quad"
import Color from "Engine/Graphics/Color"
import Vector3 from "Engine/Math/Vector3"
import Vector2 from "Engine/Math/Vector2"
    
const TAG = "Cube";

function Cube()
{
    GraphicsObject.call(this);

    const root = this.GetRootDivHandle();

    const len = 10;
    const hlen = len/2;

    root.appendChild(new Quad(new Vector3(0,0, hlen), new Vector3(), new Vector3(len,len,len), new Color(255,0,0,1), true).GetRootDivHandle());
    root.appendChild(new Quad(new Vector3(0,0,-hlen), new Vector3(), new Vector3(len,len,len), new Color( 0,255,0,1), true).GetRootDivHandle());

    root.appendChild(new Quad(new Vector3(0, hlen,0), new Vector3(90,0,0), new Vector3(len,len,len), new Color(0,  0,255,1), true).GetRootDivHandle());
    root.appendChild(new Quad(new Vector3(0,-hlen,0), new Vector3(90,0,0), new Vector3(len,len,len), new Color(0,255,255,1), true).GetRootDivHandle());

    root.appendChild(new Quad(new Vector3( hlen, 0,0), new Vector3(0,90,0), new Vector3(len,len,len), new Color(255, 0,255,1), true).GetRootDivHandle());
    root.appendChild(new Quad(new Vector3(-hlen, 0,0), new Vector3(0,90,0), new Vector3(len,len,len), new Color(255, 255,0,1), true).GetRootDivHandle());

    if (arguments.length === 0)
    {
    }
    else
    {
        throw Exceptions.Constructor;
    }

    Object.freeze(this);
};

Cube.prototype = Object.create(GraphicsObject.prototype);
Cube.prototype.constructor = Cube;

Object.defineProperties(Cube.prototype,
{
    "toString": {value: function()
    {
        if (arguments.length !== 0) throw Exceptions.BadArgument;
    
        throw Exceptions.Unimplemented;
    }},
    
    "equalTo": {value: function(aOther)
    {
        if (arguments.length !== 1)       throw Exceptions.BadArgument;
        if (!aOther instanceof(Collider)) throw Exceptions.BadArgument;
    
        throw Exceptions.Unimplemented;
    }}
});

Object.freeze(Cube);

export default Cube;
