// © 2017 Joseph Cameron - All Rights Reserved
// Project: HTML53DRenderer
// Created on 2017-12-20.

// Resources inc
import "favicon.ico"
import "index.html"
import "style.css"

import "Awesome.png"
import "Blocky.png"
import "brick.png"
import "grass.png"

// Engine inc
import IntervalTimer from "Engine/Time/IntervalTimer"
import AnimationTimer from "Engine/Time/AnimationTimer"
import IdleTimer from "Engine/Time/IdleTimer"
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
import Gamepads from "Engine/Input/Gamepads"
import Camera from "Engine/Graphics/Camera"
import Scenegraph from "Engine/Graphics/Scenegraph"

// GDK inc
import DebugCameraController from "GDK/Debug/DebugCameraController"

// Adhoc
import API from "./apiTests"
import TileGrid from "./TileGrid"
import Player from "./Player"

const TAG: string = "Main";

//=========
// Mainline
//=========
const TileSize = 50*5;

const scenegraph = new Scenegraph();
const camera = new Camera(document.body, scenegraph);

const tileGrid = new TileGrid
(
    scenegraph,
    TileSize,
    [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,1,1,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0],
        [0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,1,1,1,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,1,0],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],  
    ],
    (aThisVoxel: {x: number, y: number, z: number, value: number}, aNeighbourData: {north: number, south: number, east: number, west: number, up: number, down: number}): Array<HTMLDivElement> =>
    {
        const north = aNeighbourData.north === undefined ? true  : aNeighbourData.north === 0;
        const south = aNeighbourData.south === undefined ? false : aNeighbourData.south === 0;
        const east  = aNeighbourData.east  === undefined ? false : aNeighbourData.east  === 0;
        const west  = aNeighbourData.west  === undefined ? false : aNeighbourData.west  === 0;
        const up    = aNeighbourData.up    === undefined ? true  : aNeighbourData.up    === 0;
        const down  = aNeighbourData.down  === undefined ? false : aNeighbourData.down  === 0;

        const vox = Shapes.Voxel(new Vector3(0,0,0), new Vector3(0,0,0), new Vector3(1,1,1), north, south, east, west, up, down);

        for (let face of vox)
            face.style.backgroundImage = "url(img/brick.png)";

        return vox;
    }
);

const player = new Player(TileSize, new Vector2(0,2), scenegraph, tileGrid);

const mainLoop = new IntervalTimer(16,(aDeltaTime: number) =>
{
    player.update(aDeltaTime);

    const buff = player.getPosition();

    camera.setTransform(new Vector3(-buff.x * TileSize, ( -buff.y * TileSize) +1500,-1750),new Vector3(-10,0,0));
});

const renderLoop = new AnimationTimer((aDeltaTime: number) =>
{
    player.draw(aDeltaTime);
});

const idleLoop = new IdleTimer((aDeltaTime: number) =>
{

});
