// © 2017 Joseph Cameron - All Rights Reserved
// Project: HTML53DRenderer
// Created on 2017-12-20.

// Resources inc
import "Awesome.png"
import "Blocky.png"
import "favicon.ico"
import "index.html"
import "style.css"

// Engine inc
import Timer from "Engine/Time/Timer"
import Debug from "Engine/Debug"
import Exceptions from "Engine/Debug/Exceptions"
import Vector2 from "Engine/Math/Vector2"
import Vector3 from "Engine/Math/Vector3"
import Color from "Engine/Graphics/Color"
import Colors from "Engine/Graphics/Colors"
import GraphicsObject from "Engine/Graphics/GraphicsObject"
import Shapes from "Engine/Graphics/Shapes"
import Sprite from "Engine/Graphics/Sprite"

const TAG: string = "Main";

const myGraphicsObject = new GraphicsObject(Shapes.Cube(new Vector3(0,0,0),new Vector3(0,0,0),new Vector3(100,100,100)));
const pos = new Vector3(+240,-160,0);
const rot = new Vector3();
const sca = new Vector3(1,1,1);


const myQuad = Shapes.Quad(new Vector3(0,0,0),new Vector3(0,0,0),new Vector3(100,100,100));
const mySprite = new Sprite(myQuad, "img/Blocky.png");

const myGraphicsObject2 = new GraphicsObject(myQuad);
const pos2 = new Vector3(-150,0,0);
const rot2 = new Vector3();
const sca2 = new Vector3(1,1,1);

let animationTimer: number = 0;

const myTimer = new Timer(16, (): void =>
{
    rot.x +=1;
    rot.y +=0.5;
    rot.z +=0.333;
    myGraphicsObject.Update(pos,rot,sca);

    pos.x += (Math.cos(myTimer.getElapsedTime() * 0.03)) * 5;
    pos.y += (Math.sin(myTimer.getElapsedTime() * 0.03)) * 5;

    Debug.Log(TAG, Math.cos(myTimer.getElapsedTime()));

    myGraphicsObject2.Update(pos2,rot2,sca2);

    mySprite.Update(animationTimer, 0, 16, 17);

    if (myTimer.getElapsedTime() % 16 === 0)
        animationTimer++;

    if (animationTimer > 3)
        animationTimer = 0;
});
