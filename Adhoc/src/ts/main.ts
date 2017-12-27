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

// Adhoc
import API from "./apiTests"

const TAG: string = "Main";

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

//Cube(aPosition: Vector3, aRotation: Vector3, aScale: Vector3)
//const gfxobj = new GraphicsObject(Shapes.VoxelField(voxdat,Shapes.VoxelFieldOrientation.Horizontal),pos,rot,sca);
//const gfxobj = new GraphicsObject(Shapes.Cube(new Vector3(0,0,0), new Vector3(), new Vector3(1,1,1)),pos,rot,sca);
//const gfxobj = new GraphicsObject(Shapes.Quad(new Vector3(0,0,0), new Vector3(0,0,0), new Vector3(1,1,1), false),pos,rot,sca);

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
        if (Keyboard.getKey("KeyW")) this.rot.x -= this.rspeed * aDeltaTime;
        if (Keyboard.getKey("KeyS")) this.rot.x += this.rspeed * aDeltaTime;

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
        this.m_GraphicsObject = new GraphicsObject(myshape);
    }
}

//=========
// Mainline
//=========
const camera = document.getElementById("MyHardcodedSceneGraph");
const aPosition = new Vector3();
const aRotation = new Vector3();
const aScale    = new Vector3(1,1,1);

const player = new Player();

const floor = new GraphicsObject(Shapes.Cube());
floor.draw(new Vector3(0,500,-5000),new Vector3(0,+500,0),new Vector3(5000,500,5000));

const mainLoop = new IntervalTimer(16,(aDeltaTime: number) =>
{
    Debug.Log(TAG, Keyboard.getKeyDown("KeyA") ? "getKeyDown" : Keyboard.getKey("KeyA") ? "getKey" : "keyUp");

    player.update(aDeltaTime);    

    camera.style.transform = 
        "rotateX(" +     aRotation.x + "deg)rotateY(" + aRotation.y + "deg)rotateZ(" + aRotation.z + "deg)" +
        "translate3d(" + aPosition.x + "px," +          aPosition.y + "px," +          aPosition.z + "px)" + 
        
        //"scale3d(" +     aScale.x +    "," +            aScale.y +    "," +            aScale.z + ")"
    "";

    if (Keyboard.getKey("KeyQ")) aRotation.y -= 1;
    if (Keyboard.getKey("KeyE")) aRotation.y += 1;

    if (Keyboard.getKey("Digit1")) aRotation.x -= 1;
    if (Keyboard.getKey("Digit2")) aRotation.x += 1;

    if (Keyboard.getKey("Space")) aPosition.y += 10;
    if (Keyboard.getKey("ControlLeft")) aPosition.y -= 10;
    if (Keyboard.getKey("KeyW")) aPosition.z += 10;
    if (Keyboard.getKey("KeyS")) aPosition.z -= 10;
});

const renderLoop = new AnimationTimer((aDeltaTime: number) =>
{
    player.draw(aDeltaTime);
});

const idleLoop = new IdleTimer((aDeltaTime: number) =>
{
    
});
