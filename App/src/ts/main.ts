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
import TileGrid from "GDK/TileGrid"
import DebugCameraController from "GDK/Debug/DebugCameraController"

// Adhoc
import API from "./apiTests"

const SCALE_FACTOR = 50;

const TAG: string = "Main";

class Player
{
    private readonly tspeed = 2;
    private readonly rspeed = 0.25;

    private readonly m_GraphicsObject: GraphicsObject;
    private readonly m_Sprite: Sprite;

    private u: number = 0;
    private i: number = 0;

    private pos: Vector3;
    private rot = new Vector3(0,0,0);
    private sca = new Vector3(5*SCALE_FACTOR,5*SCALE_FACTOR,5*SCALE_FACTOR);

    public getPosition()
    {
        return new Vector3(this.pos);
    }

    public update(aDeltaTime: number)
    {
        const translationBuffer = new Vector3();

        //if (Keyboard.getKey("ArrowUp"))    translationBuffer.z --;
        //if (Keyboard.getKey("ArrowDown"))  translationBuffer.z ++;
        if (Keyboard.getKey("ArrowLeft"))  translationBuffer.x --;
        if (Keyboard.getKey("ArrowRight")) translationBuffer.x ++;

        //translationBuffer.z += Gamepads.get(0).getAxis(1);
        translationBuffer.x += Gamepads.get(0).getAxis(0);

        translationBuffer.normalize();
        translationBuffer.multiply(this.tspeed * aDeltaTime);

        this.pos.add(translationBuffer);

        if (translationBuffer.length() != 0)
            this.u = ++this.i % 16 === 0 ? this.u < 3 ? 1 + this.u : 0 : this.u;
        else
        {
            this.u = 1;
            this.i = 0;
        }
    }

    public draw(aDeltaTime: number)
    {
        this.m_GraphicsObject.draw
        (
            new Vector3
            (
                this.pos.x + (0.5 * voxelSize.x),
                this.pos.y - (0.5 * voxelSize.y),
                this.pos.z
            ), 
            this.rot, 
            this.sca
        );
        this.m_Sprite.draw(this.u, 0, 16, 17);
    }

    constructor(aPosition: Vector3)
    {
        this.pos = aPosition;

        const myshape = Shapes.Quad();
        myshape.style.backgroundImage = "none";

        this.m_Sprite = new Sprite(myshape,"img/Blocky.png");
        this.m_GraphicsObject = new GraphicsObject(myshape,gfxscenegraph);
    }
}

//=========
// Mainline
//=========
const gfxscenegraph = new Scenegraph();
const gfxCamera = new Camera(document.body, gfxscenegraph);

const camera = gfxscenegraph.getRootDiv();
const aPosition = new Vector3(0,+7.5*SCALE_FACTOR,0);
const aRotation = new Vector3();
const aScale    = Vector3.One;
const scalar = 30;

const cameraController = new DebugCameraController(gfxCamera);

const voxdat = 
[
    [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,1,1,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0],
        [0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,1,1,1,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,1,0],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],  
    ],
];

function voxprocessingstage(aThisVoxel: {x: number, y: number, z: number, value: number}, aNeighbourData: {north: number, south: number, east: number, west: number, up: number, down: number}): Array<HTMLDivElement>
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
};

//Offset origin from center to bottom left
const voxelSize = new Vector3(5*SCALE_FACTOR,5*SCALE_FACTOR,5*SCALE_FACTOR);
const voxelFieldOffset = new Vector3
(
    voxdat[0][0].length * voxelSize.x * 0.5,
    voxdat[0].length * voxelSize.y * -0.5,
    0
);

//asdf
const player = new Player(new Vector3(0,-voxelSize.y,0));

const gfxobj = new GraphicsObject(Shapes.VoxelField(voxdat,Shapes.VoxelFieldOrientation.Vertical,voxprocessingstage),gfxscenegraph, voxelFieldOffset, Vector3.Zero, voxelSize);


///////////
const tileGrid = new TileGrid(SCALE_FACTOR);


///////////
const mainLoop = new IntervalTimer(16,(aDeltaTime: number) =>
{
    player.update(aDeltaTime);

    const buff = player.getPosition();

    buff.multiply(-1);
    buff.z -= 1750;
    buff.y += 700;

    //gfxCamera.setTransform(buff,new Vector3(-10,0,0));
    cameraController.update(aDeltaTime);
});

const renderLoop = new AnimationTimer((aDeltaTime: number) =>
{
    player.draw(aDeltaTime);
});

const idleLoop = new IdleTimer((aDeltaTime: number) =>
{

});
