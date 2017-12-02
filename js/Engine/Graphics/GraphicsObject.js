// © 2017 Joseph Cameron - All Rights Reserved
// Project: CSS3DRenderer
// Created on 2017-12-02.
"use strict";

define(
[
    "Engine/Debug/Exceptions",
    "Engine/Math/Vector3"
], 
function(Exceptions, Vector3)
{
    var GraphicsObject = function()
    {
        var m_DivHandle = null;

        var m_Position = new Vector3();
        var m_Rotation = new Vector3();

        if (arguments.length == 0)
        {
            throw "GraphicsObject is a stub!";
        }
        else if (arguments.length == 1)
        {
            //todo: div
        }
        else
        {
            throw Exceptions.Constructor;
        }
    };

    GraphicsObject.prototype.Update = function()
    {

    };

    GraphicsObject.prototype.Tag = "GraphicsObject";

    return GraphicsObject;
});
