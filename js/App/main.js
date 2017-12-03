// © 2017 Joseph Cameron - All Rights Reserved
// Project: CSS3DRenderer
// Created on 2017-12-01.
"use strict";

requirejs.config({
    baseUrl: 'js/app',

    paths: {
        Engine: '../engine',
        Thirdparty: '../thirdparty'
    }
});

// Requirejs Entrypoint
define(function(require)
{
    //Eng inc
    const Time    = new (require("Engine/Time"))(update, 16);
    const Debug   = require("Engine/Debug");
    const Input   = require("Engine/Input");
    const Vector3 = require("Engine/Math/Vector3");
    //Graphics
    const Cube = require("Engine/Graphics/Cube");
    //App inc
    const Player = require("./Player");

    //mainline
    var myPlayer = new Player();
    var myGraphicsObject = new Cube();


    var cubeDiv = document.getElementById("theCube");
    Debug.Log("Cube", typeof(cubeDiv));
    Debug.Log("Cube", cubeDiv.tagName);

    function update()
    {
        myPlayer.Update();

        //myGraphicsObject.Update();
    }

    var obj = new Object();
    var vec = new Vector3(1,0,0);
    console.log(vec);
    Debug.Log("Hello",vec.Length());
    Debug.Log("asdf", obj instanceof Vector3);
    Debug.Log("123", vec instanceof Vector3);
    Debug.Log("123213", new Vector3(0,1,2));
});
