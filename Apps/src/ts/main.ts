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

// Adhoc
import API from "./apiTests"

const TAG: string = "Main";

const gfxscenegraph = new Scenegraph(document.body);
const gfxCamera = new Camera(document.body, gfxscenegraph);

const voxdat = 
[
    [
        [1,0,1,0,1,0,1],
        [0,1,1,1,1,1,0],
        [0,1,0,0,0,1,0],
        [0,1,0,0,0,1,0],
        [0,1,0,0,0,1,0],
        [0,1,1,1,1,1,0],
        [1,1,1,1,1,1,1],
    ]
];

class Player
{
    private readonly tspeed = 2;
    private readonly rspeed = 0.25;

    private readonly m_GraphicsObject: GraphicsObject;
    private readonly m_Sprite: Sprite;

    private u: number = 0;
    private i: number = 0;

    private pos = new Vector3(0,0,-6000);
    private rot = new Vector3(0,0,0);
    private sca = new Vector3(500,500,500);

    public update(aDeltaTime: number)
    {
        const translationBuffer = new Vector3();

        if (Keyboard.getKey("ArrowUp"))    translationBuffer.z -= 1;
        if (Keyboard.getKey("ArrowDown"))  translationBuffer.z += 1;
        if (Keyboard.getKey("ArrowLeft"))  translationBuffer.x -= 1;
        if (Keyboard.getKey("ArrowRight")) translationBuffer.x += 1;

        translationBuffer.z += Gamepads.get(0).getAxis(1);
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
        this.m_GraphicsObject.draw(this.pos, this.rot, this.sca);
        this.m_Sprite.draw(this.u, 0, 16, 17);
    }

    constructor()
    {
        const myshape = Shapes.Quad();
        myshape.style.backgroundImage = "none";

        this.m_Sprite = new Sprite(myshape,"img/Blocky.png");
        this.m_GraphicsObject = new GraphicsObject(myshape,gfxscenegraph);
    }
}

//=========
// Mainline
//=========
const camera = gfxscenegraph.getRootDiv();
const aPosition = new Vector3(0,+750,0);
const aRotation = new Vector3();
const aScale    = Vector3.One;
const scalar = 30;

const quad = Shapes.Quad(new Vector3(0,-1000,-8000),new Vector3(), new Vector3(1500,1500,1500),true);
/*const iframe = document.createElement("iframe");
iframe.setAttribute("src", "https://www.youtube.com/embed/52Gg9CqhbP8");
iframe.style.width = 1500+"px";
iframe.style.height = 1500+"px";
quad.appendChild(iframe);*/

const myiframeobject = new GraphicsObject(quad,gfxscenegraph);

const player = new Player();

function voxprocessingstage(aThisVoxel: {x: number, y: number, z: number, value: number}, aNeighbourData: {north: number, south: number, east: number, west: number, up: number, down: number}): Array<HTMLDivElement>
{
    const north = aNeighbourData.north === undefined ? true : aNeighbourData.north === 0;
    const south = aNeighbourData.south === undefined ? true : aNeighbourData.south === 0;
    const east  = aNeighbourData.east  === undefined ? true : aNeighbourData.east  === 0;
    const west  = aNeighbourData.west  === undefined ? true : aNeighbourData.west  === 0;
    const up    = aNeighbourData.up    === undefined ? true : aNeighbourData.up    === 0;
    const down  = aNeighbourData.down  === undefined ? true : aNeighbourData.down  === 0;

    const vox = Shapes.Voxel(new Vector3(0,0,0), new Vector3(0,0,0), new Vector3(1,1,1), north, south, east, west, up, down);

    for (let face of vox)
        face.style.backgroundImage = "url(img/brick.png)";

    return vox;
};

const floorgfx = Shapes.Cube();

for(let face of floorgfx)
    face.style.backgroundImage = "url(img/grass.png)";

const floor = new GraphicsObject(floorgfx,gfxscenegraph,new Vector3(0,500,-5000),new Vector3(),new Vector3(5000,500,5000));
const gfxobj = new GraphicsObject(Shapes.VoxelField(voxdat,Shapes.VoxelFieldOrientation.Vertical,voxprocessingstage),gfxscenegraph, new Vector3(0,-1000,-8000), Vector3.Zero, new Vector3(500,500,500));

const mainLoop = new IntervalTimer(16,(aDeltaTime: number) =>
{
    player.update(aDeltaTime);    

    camera.style.transform = 
        "rotateX(" + aRotation.x + "deg)rotateY(" + aRotation.y + "deg)rotateZ(" + aRotation.z + "deg)" +
        "translate3d(" + aPosition.x + "px," + aPosition.y + "px," + aPosition.z + "px)";

    if (Keyboard.getKey("KeyQ")) aRotation.y -= 1;
    if (Keyboard.getKey("KeyE")) aRotation.y += 1;

    if (Keyboard.getKey("Digit1")) aRotation.x -= 1;
    if (Keyboard.getKey("Digit2")) aRotation.x += 1;

    if (Keyboard.getKey("Space")) aPosition.y += 10;
    if (Keyboard.getKey("ControlLeft")) aPosition.y -= 10;

    if (Keyboard.getKey("KeyW"))
    {
        aPosition.x -= Math.sin((aRotation.y * Math.PI /180)) * scalar;
        aPosition.z += Math.cos((aRotation.y * Math.PI /180)) * scalar;
    }

    if (Keyboard.getKey("KeyS"))
    {
        aPosition.x += Math.sin((aRotation.y * Math.PI /180)) * scalar;
        aPosition.z -= Math.cos((aRotation.y * Math.PI /180)) * scalar;
    
    }

    if (Keyboard.getKey("KeyA"))
    {
        aPosition.x -= Math.sin(((aRotation.y-90) * Math.PI /180)) * scalar;
        aPosition.z += Math.cos(((aRotation.y-90) * Math.PI /180)) * scalar;
    }

    if (Keyboard.getKey("KeyD"))
    {
        aPosition.x -= Math.sin(((aRotation.y+90) * Math.PI /180)) * scalar;
        aPosition.z += Math.cos(((aRotation.y+90) * Math.PI /180)) * scalar;
    }
});

const renderLoop = new AnimationTimer((aDeltaTime: number) =>
{
    player.draw(aDeltaTime);
});

const idleLoop = new IdleTimer((aDeltaTime: number) =>
{

});
