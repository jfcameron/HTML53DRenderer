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
import Gamepad from "Engine/Input/Gamepad"
import Camera from "Engine/Graphics/Camera"
import Scenegraph from "Engine/Graphics/Scenegraph"

// Adhoc
import API from "./apiTests"

const TAG: string = "Main";

const gfxscenegraph = new Scenegraph(document.body);
const gfxCamera = new Camera(document.body, gfxscenegraph);

const gamepad = new Gamepad(0);

const voxdat = 
[
    [
        [1,0,1,0,1,0,1],
        [0,1,0,0,0,1,0],
        [0,0,0,0,0,0,0],
        [0,0,0,1,0,0,0],
        [0,0,0,1,0,0,0],
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

        if (Keyboard.getKey("KeyA")) this.rot.y += this.rspeed * aDeltaTime;
        if (Keyboard.getKey("KeyD")) this.rot.y -= this.rspeed * aDeltaTime;
        //if (Keyboard.getKey("KeyW")) this.rot.x -= this.rspeed * aDeltaTime;
        //if (Keyboard.getKey("KeyS")) this.rot.x += this.rspeed * aDeltaTime;

        if (Keyboard.getKey("ArrowUp"))    translationBuffer.z -= this.tspeed * aDeltaTime;
        if (Keyboard.getKey("ArrowDown"))  translationBuffer.z += this.tspeed * aDeltaTime;
        if (Keyboard.getKey("ArrowLeft"))  translationBuffer.x -= this.tspeed * aDeltaTime;
        if (Keyboard.getKey("ArrowRight")) translationBuffer.x += this.tspeed * aDeltaTime;

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

const player = new Player();

const floor = new GraphicsObject(Shapes.Cube(),gfxscenegraph,new Vector3(0,500,-5000),new Vector3(0,+500,0),new Vector3(5000,500,5000));
const gfxobj = new GraphicsObject(Shapes.VoxelField(voxdat,Shapes.VoxelFieldOrientation.Vertical),gfxscenegraph, new Vector3(0,-1000,-8000), Vector3.Zero, new Vector3(500,500,500));

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


//const cameraLeft  = document.getElementById("MyCamera");
//const cameraRight = document.getElementById("MyOtherCamera");

const idleLoop = new IdleTimer((aDeltaTime: number) =>
{
    /*while (cameraRight.firstChild) cameraRight.removeChild(cameraRight.firstChild);
    
    for (let i = 0; i < cameraLeft.childNodes.length; ++i)
        cameraRight.appendChild(cameraLeft.childNodes[i].cloneNode(true));*/
});
