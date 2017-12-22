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

Mouse.test();

const sh = Shapes.Quad(new Vector3(), new Vector3(), new Vector3(100,100,100));
const sp = new Sprite(sh, "img/Blocky.png");
const go = new GraphicsObject(sh);

const pos = new Vector3();
const rot = new Vector3();
const sca = new Vector3(1,1,1);

const updater: Array<string> = new Array<string>();

const myTimer = new Timer(16,() =>
{
    rot.x += 1;

    sp.Update(0,0,16,17);
    go.Update(pos,rot,sca);
});
