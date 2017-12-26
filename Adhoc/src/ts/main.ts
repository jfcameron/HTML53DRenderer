// © 2017 Joseph Cameron - All Rights Reserved
// Project: HTML53DRenderer
// Created on 2017-12-20.

// Resources inc
import "Awesome.png"
import "Blocky.png"
import "brick.png"
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
import Keyboard from "Engine/Input/Keyboard"
import Mouse from "Engine/Input/Mouse"
import Gamepad from "Engine/Input/Gamepad"

// Adhoc
import API from "./apiTests"

const TAG: string = "Main";

const pos = new Vector3();
const rot = new Vector3();
const sca = new Vector3(100,100,100);

const voxdat = 
[
    [
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [1,1,1,1,1,1,1],
    ],

    [
        [0,1,1,1,1,1,0],
        [0,1,0,0,0,1,0],
        [0,1,0,0,0,1,0],
        [0,1,0,0,0,1,0],
        [0,1,1,1,1,1,0],
        [1,1,1,1,1,1,1],
    ],

    [
        [0,1,0,0,0,1,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,1,1,1,1,1,0],
        [1,1,1,1,1,1,1],
    ],

    [
        [0,1,0,0,0,1,0],
        [0,0,0,0,0,0,0],
        [0,0,0,1,0,0,0],
        [0,0,0,1,0,0,0],
        [0,1,1,1,1,1,0],
        [1,1,1,1,1,1,1],
    ],

    [
        [0,1,0,0,0,1,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,1,1,1,1,1,0],
        [1,1,1,1,1,1,1],
    ],

    [
        [0,1,1,1,1,1,0],
        [0,1,0,0,0,1,0],
        [0,1,0,0,0,1,0],
        [0,1,0,0,0,1,0],
        [0,1,1,1,1,1,0],
        [1,1,1,1,1,1,1],
    ],

    [
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [1,1,1,1,1,1,1],
    ],
];

//Cube(aPosition: Vector3, aRotation: Vector3, aScale: Vector3)
const gfxobj = new GraphicsObject(Shapes.VoxelField(voxdat),pos,rot,sca);
//const gfxobj = new GraphicsObject(Shapes.Cube(new Vector3(0,0,0), new Vector3(), new Vector3(1,1,1)),pos,rot,sca);
//const gfxobj = new GraphicsObject(Shapes.Quad(new Vector3(0,0,0), new Vector3(0,0,0), new Vector3(1,1,1)),pos,rot,sca);

//=========
// Mainline
//=========
const gamepad = new Gamepad(0);

const tspeed = 5;
const rspeed = 0.25;

const myTimer = new Timer(16,(aDeltaTime: number) =>
{
    if (Keyboard.getKey("KeyA")) rot.y += rspeed * aDeltaTime;
    if (Keyboard.getKey("KeyD")) rot.y -= rspeed * aDeltaTime;
    if (Keyboard.getKey("KeyW")) rot.x -= rspeed * aDeltaTime;
    if (Keyboard.getKey("KeyS")) rot.x += rspeed * aDeltaTime;

    if (Keyboard.getKey("ArrowUp"))    pos.z += tspeed * aDeltaTime;
    if (Keyboard.getKey("ArrowDown"))  pos.z -= tspeed * aDeltaTime;
    if (Keyboard.getKey("ArrowLeft"))  pos.x += tspeed * aDeltaTime;
    if (Keyboard.getKey("ArrowRight")) pos.x -= tspeed * aDeltaTime;

    pos.x += gamepad.getAxis(0) * 3 * aDeltaTime;
    pos.y += gamepad.getAxis(1) * 3 * aDeltaTime;
    rot.y += gamepad.getAxis(2) * aDeltaTime;
    rot.x += gamepad.getAxis(3) * aDeltaTime;

    rot.y += 1;
});

//(<any>window).requestIdleCallback(update);

const draw = (timestamp: number) =>
{
    gfxobj.draw(pos,rot,sca);

    window.requestAnimationFrame(draw);
}

window.requestAnimationFrame(draw);
