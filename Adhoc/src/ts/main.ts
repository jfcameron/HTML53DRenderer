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
import Keyboard from "Engine/Input/Keyboard"
import Mouse from "Engine/Input/Mouse"

const TAG: string = "Main";

const pos = new Vector3();
const rot = new Vector3();
const sca = new Vector3(10,10,10);

const voxdat = 
[
    [
        [1,0,1],
        [0,1,0],
        [1,0,1]
    ],

    [
        [1,0,1],
        [0,1,0],
        [1,0,1]
    ],

    [
        [1,0,1],
        [0,1,0],
        [1,0,1]
    ]
];

const gfxobj = new GraphicsObject(Shapes.VoxelField(voxdat),pos,rot,sca);

//=========
// Mainline
//=========
const myTimer = new Timer(16,() =>
{
    if (Keyboard.getKey("KeyA")) rot.y += 1;
    if (Keyboard.getKey("KeyD")) rot.y -= 1;
    if (Keyboard.getKey("KeyW")) rot.x -= 1;
    if (Keyboard.getKey("KeyS")) rot.x += 1;

    if (Keyboard.getKey("ArrowUp"))    pos.z += 3;
    if (Keyboard.getKey("ArrowDown"))  pos.z -= 3;
    if (Keyboard.getKey("ArrowLeft"))  pos.x += 3;
    if (Keyboard.getKey("ArrowRight")) pos.x -= 3;

    Mouse.update();
});

(()=>
{
    const draw = (timestamp: number) =>
    {
        gfxobj.draw(pos,rot,sca);

        window.requestAnimationFrame(draw);
    }

    window.requestAnimationFrame(draw);
})();
