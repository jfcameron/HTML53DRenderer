// © 2017 Joseph Cameron - All Rights Reserved
// Project: CSS3DRenderer
// Created on 2017-12-01.
"use strict";

//Resources
import "index.html"
import "favicon.ico"
import "style.css"
import "Blocky.png"
import "Awesome.png"

//Eng inc
const Timer   = require("Engine/Time/Timer");
const Debug   = require("Engine/Debug");
const Input   = require("Engine/Input");
const Vector3 = require("Engine/Math/Vector3");
const Vector2 = require("Engine/Math/Vector2");
const Cube    = require("Engine/Graphics/Cube");
const Colors  = require("Engine/Graphics/Colors");
const Sprite  = require("Engine/Graphics/Sprite");
const Quad    = require("Engine/Graphics/Quad");

//App inc
const Player = require("./Player");
const NPC    = require("./NPC");

const myTimer = new Timer(update, 16);
const mySprite = Sprite.createSprite();

Debug.Log("SpriteTest: ", mySprite instanceof Node? true : false);

const myPlayer = new Player();
const myNPC    = new NPC();

const mySceneGraph = document.getElementById("MyHardcodedSceneGraph");

const aPosition = new Vector3();
const aRotation = new Vector3();

const test = new Vector3(1,2,3);
Debug.Log("TEST", test, ", ", test.Length(), ", ", test.Normalize());

const mytest = new Vector3();
Debug.Log("CoolTest", mytest.test);

const myColor = Colors.DarkGreen();

const obj = new Object();
const vec = new Vector3(1,0,0);
console.log(vec);

function update()
{
    myPlayer.Update();

    myNPC.Update();

    /*mySceneGraph.style.transform = 
        "translate3d(" + aPosition.x + "vw," + aPosition.y + "vw," + aPosition.z + "vw) " + 
        "rotateX(" + aRotation.x + "deg) " + "rotateY(" + aRotation.y + "deg) " + "rotateZ(" + aRotation.z + "deg) ";*/
}
