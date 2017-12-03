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
    const Cube    = require("Engine/Graphics/Cube");
    //App inc
    const Player = require("./Player");
    const NPC    = require("./NPC");

    var myPlayer = new Player();
    var myNPC = new NPC();

    var mySceneGraph = document.getElementById("MyHardcodedSceneGraph");

    var aPosition = new Vector3();
    var aRotation = new Vector3();

    var test = new Vector3(1,2,3);
    Debug.Log("TEST", test, ", ", test.Length(), ", ", test.Normalize());

    function update()
    {
        myPlayer.Update();

        myNPC.Update();

        //aRotation.y += 0.5;

        mySceneGraph.style.transform = 
            "translate3d(" + aPosition.x + "vw," + aPosition.y + "vw," + aPosition.z + "vw) " + 
            "rotateX(" + aRotation.x + "deg) " + "rotateY(" + aRotation.y + "deg) " + "rotateZ(" + aRotation.z + "deg) ";
    }

    var obj = new Object();
    var vec = new Vector3(1,0,0);
    console.log(vec);
    Debug.Log("Hello",vec.Length());
    Debug.Log("asdf", obj instanceof Vector3);
    Debug.Log("123", vec instanceof Vector3);
    Debug.Log("123213", new Vector3(0,1,2));
});
