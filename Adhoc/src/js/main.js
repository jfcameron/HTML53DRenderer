// © 2017 Joseph Cameron - All Rights Reserved
// Project: CSS3DRenderer
// Created on 2017-12-01.
"use strict";

//Resources
import "Awesome.png"
import "Blocky.png"
import "favicon.ico"
import "index.html"
import "style.css"

//Eng inc
import Color from "Engine/Graphics/Color"
import Colors from "Engine/Graphics/Colors"
import Cube from "Engine/Graphics/Cube"
import Debug from "Engine/Debug"
import Exceptions from "Engine/Debug/Exceptions"
import GraphicsObject from "Engine/Graphics/GraphicsObject"
import Input from "Engine/Input"
import Quad from "Engine/Graphics/Quad"
import Sprite from "Engine/Graphics/Sprite"
import Timer from "Engine/Time/Timer"
import Vector2 from "Engine/Math/Vector2"
import Vector3 from "Engine/Math/Vector3"

//App inc
import GameObject from "GameObject"
import NPC from "NPC"
import Player from "Player"
import Collider from "Collider"

const TAG = "Main";

//const myCollider = new Collider();

(()=>
{
    Debug.Log(TAG, Exceptions.Constructor);
   // Debug.Log = 123;
});//();

//ES6 Class testing
(()=>
{
    const a = new GameObject();
    
    a.Update();
    Debug.Log(TAG, "The secret is: ", a.GetSecret());
    a.Update(1,2,3,4,5);
    a.Update = 123;
    a.Update();
});//();

//immutable public interface
(()=>
{
    const myColor = new Color();
    
    Debug.Log(TAG, myColor.toString());
})();

//Unsorted
(()=>
{
    const mySprite = Sprite.createSprite();

    Debug.Log("SpriteTest: ", mySprite instanceof Node? true : false);

    const myPlayer = new Player();
    const myNPC    = new NPC();

//    const asdf = new GraphicsObject();

    //Debug.Log(TAG, myPlayer.constructor.name);

    //myPlayer.Update = 0;
    //console.log(myPlayer.prototype);
    //myPlayer.prototype.c_TranslateSpeed = 123;

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

    const myTimer = new Timer(() =>
    {
        myPlayer.Update();

        myNPC.Update();

        /*mySceneGraph.style.transform = 
            "translate3d(" + aPosition.x + "vw," + aPosition.y + "vw," + aPosition.z + "vw) " + 
            "rotateX(" + aRotation.x + "deg) " + "rotateY(" + aRotation.y + "deg) " + "rotateZ(" + aRotation.z + "deg) ";*/
    }, 16);
})();
