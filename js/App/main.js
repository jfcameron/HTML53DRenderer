// © 2017 Joseph Cameron - All Rights Reserved
// Project: CSS3DRenderer
// Created on 2017-12-01.
"use strict";

requirejs.config(
{
    baseUrl: 'js/app',

    paths: {
        Engine:     '../engine',
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
    const Colors  = require("Engine/Graphics/Colors");
    //App inc
    const Player = require("./Player");
    const NPC    = require("./NPC");

    const Sprite = require("Engine/Graphics/Sprite");

    Debug.Log("Neato", (new Sprite()) instanceof Node);

    let myPlayer = new Player();
    let myNPC    = new NPC();

    let mySceneGraph = document.getElementById("MyHardcodedSceneGraph");

    let aPosition = new Vector3();
    let aRotation = new Vector3();

    let test = new Vector3(1,2,3);
    Debug.Log("TEST", test, ", ", test.Length(), ", ", test.Normalize());

    let mytest = new Vector3();
    Debug.Log("CoolTest", mytest.test);
    //Object.freeze(mytest);
    //mytest.a = "hello";
    let myColor = Colors.DarkGreen();

    Debug.Log("sadfasdf",Colors.Constants.DeathlyPink);
    
    //myColor.r = 1;

    Debug.Log("ColorTestConst: ",myColor, ", ", myColor.equalTo(Colors.Constants.DarkGreen));

    function update()
    {
        myPlayer.Update();

        myNPC.Update();

        //aRotation.y += 0.5;

        mySceneGraph.style.transform = 
            "translate3d(" + aPosition.x + "vw," + aPosition.y + "vw," + aPosition.z + "vw) " + 
            "rotateX(" + aRotation.x + "deg) " + "rotateY(" + aRotation.y + "deg) " + "rotateZ(" + aRotation.z + "deg) ";
    }

    let obj = new Object();
    let vec = new Vector3(1,0,0);
    console.log(vec);
    Debug.Log("Hello",vec.Length());
    Debug.Log("asdf", obj instanceof Vector3);
    Debug.Log("123", vec instanceof Vector3);
    Debug.Log("123213", new Vector3(0,1,2));
});
