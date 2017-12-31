// © 2017 Joseph Cameron - All Rights Reserved
// Project: HTML53DRenderer
// Created on 2017-12-30.

import Debug from "Engine/Debug"
import Exceptions from "Engine/Debug/Exceptions"
import GraphicsObject from "Engine/Graphics/GraphicsObject"
import Sprite from "Engine/Graphics/Sprite"
import Vector3 from "Engine/Math/Vector3"
import Vector2 from "Engine/Math/Vector2"
import Keyboard from "Engine/Input/Keyboard"
import Gamepads from "Engine/Input/Gamepads"
import Shapes from "Engine/Graphics/Shapes"
import Scenegraph from "../../../Engine/src/Engine/Graphics/Scenegraph";

// wip inc
import TileGrid from "./TileGrid"

const TAG: string = "Player";

class TileGridObject
{
    protected m_CurrentTileGrid: TileGrid;
    protected m_Position: Vector2;
    protected rot = new Vector3(0,0,0);

    public getPosition(): Vector2
    {
        return this.m_Position;
    }

    public setCurrentTileGrid(aTileGrid: TileGrid): void
    {
        this.m_CurrentTileGrid = aTileGrid;
    }

    constructor(aCurrentTileGrid: TileGrid, aPosition: Vector2)
    {
        this.m_CurrentTileGrid = aCurrentTileGrid;
        this.m_Position = aPosition;
    }
}

class TileGridCharacterGraphicHandler
{
    private u: number = 0;
    private i: number = 0;

    private readonly m_GraphicsObject: GraphicsObject;
    private readonly m_Sprite: Sprite;

    public update(aDeltaTime: number, aSpeed: number)
    {
        if (this.i > 80)
        {
            this.i = 0;

            if (this.u++ > 2)
                this.u = 0;
        }

        this.i += aDeltaTime;
    }

    public draw(aPosition: Vector2, aScale: Vector3, aRot: Vector3)
    {
        this.m_GraphicsObject.draw
        (
            new Vector3
            (
                (aPosition.x *  aScale.x) + (0.0 * aScale.x),
                (aPosition.y * -aScale.y) - (0.5 * aScale.y),
                0
            ), 
            aRot, 
            aScale
        );
        this.m_Sprite.draw(this.u, 0, 16, 17);
    }

    constructor(aScenegraph: Scenegraph)
    {
        const myshape = Shapes.Quad();
        myshape.style.backgroundImage = "none";

        this.m_Sprite = new Sprite(myshape,"img/Blocky.png");
        this.m_GraphicsObject = new GraphicsObject(myshape, aScenegraph);
    }
}

class TileCollisionHandler
{
    public update(aTileGrid: TileGrid, aPosition: Vector2)
    {
        if (!aTileGrid)
            return;

        const points =
        {
            this: aPosition,

            up:   new Vector2(aPosition.x, aPosition.y+1),
            down: new Vector2(aPosition.x, aPosition.y-1),
            
            left:  new Vector2(aPosition.x-1, aPosition.y),
            right: new Vector2(aPosition.x+1, aPosition.y),
        }
    }

    constructor()
    {

    }
}

/**
* @description a brief description of Player
* @warning Player has not been documented!
*/
class Player extends TileGridObject
{
    private readonly m_TileGridCharacterGraphicHandler: TileGridCharacterGraphicHandler;
    private readonly m_TileCollisionHandler: TileCollisionHandler;

    private readonly tspeed = 0.005;
    private sca: Vector3;

    private handlePlayerInput(aDeltaTime: number): Vector2
    {
        const translationBuffer = new Vector2();

        if (Keyboard.getKey("ArrowLeft"))  translationBuffer.x --;
        if (Keyboard.getKey("ArrowRight")) translationBuffer.x ++;

        if (Keyboard.getKey("ArrowUp")) translationBuffer.y ++;
        if (Keyboard.getKey("ArrowDown")) translationBuffer.y --;

        translationBuffer.x += Gamepads.get(0).getAxis(0);

        translationBuffer.normalize();
        translationBuffer.multiply(this.tspeed * aDeltaTime);

        return translationBuffer;
    }

    private readonly gravityBuffer = new Vector2(0,-0.01);

    private jump()
    {
        this.gravityBuffer.y = 0.2;
    }

    public update(aDeltaTime: number): void
    {        
        const translationBuffer = this.handlePlayerInput(aDeltaTime);

        ////////////////////////////////////////////////////////////////////////////////
        const collisionPoints =
        {
            bottom:      (aOffsetX: number, aOffsetY: number)=> { return new Vector2(this.m_Position.x -aOffsetX,       this.m_Position.y - aOffsetY - 0.01)},
            bottomLeft:  (aOffsetX: number, aOffsetY: number)=> { return new Vector2(this.m_Position.x -aOffsetX - 0.3, this.m_Position.y - aOffsetY - 0.01)},
            bottomRight: (aOffsetX: number, aOffsetY: number)=> { return new Vector2(this.m_Position.x -aOffsetX + 0.3, this.m_Position.y - aOffsetY - 0.01)},
            
            top:      (aOffsetX: number, aOffsetY: number)=> { return new Vector2(this.m_Position.x -aOffsetX,       this.m_Position.y - aOffsetY + 1.01)},
            topLeft:  (aOffsetX: number, aOffsetY: number)=> { return new Vector2(this.m_Position.x -aOffsetX - 0.3, this.m_Position.y - aOffsetY + 1.01)},
            topRight: (aOffsetX: number, aOffsetY: number)=> { return new Vector2(this.m_Position.x -aOffsetX + 0.3, this.m_Position.y - aOffsetY + 1.01)},

            left:  (aOffsetX: number, aOffsetY: number)=> { return new Vector2(this.m_Position.x -aOffsetX - 0.3, this.m_Position.y - aOffsetY + 0.5)},
            right: (aOffsetX: number, aOffsetY: number)=> { return new Vector2(this.m_Position.x -aOffsetX + 0.3, this.m_Position.y - aOffsetY + 0.5)},
        }

        const tileIntersection =
        {
            bottom:      false,
            bottomLeft:  false,
            bottomRight: false,

            top:      false,
            topLeft:  false,
            topRight: false,

            left:  false,
            right: false,
        }

        //--------------------------
        // collect intersection data
        //--------------------------
        if (this.m_CurrentTileGrid.getTileValue(collisionPoints.bottom(0,0)))      tileIntersection.bottom = true;
        if (this.m_CurrentTileGrid.getTileValue(collisionPoints.bottomLeft(0,0)))  tileIntersection.bottomLeft = true;
        if (this.m_CurrentTileGrid.getTileValue(collisionPoints.bottomRight(0,0))) tileIntersection.bottomRight = true;
            
        if (this.m_CurrentTileGrid.getTileValue(collisionPoints.top(0,0)))      tileIntersection.top = true;
        if (this.m_CurrentTileGrid.getTileValue(collisionPoints.topLeft(0,0)))  tileIntersection.topLeft = true;
        if (this.m_CurrentTileGrid.getTileValue(collisionPoints.topRight(0,0))) tileIntersection.topRight = true;

        if (this.m_CurrentTileGrid.getTileValue(collisionPoints.left(0,0)))  tileIntersection.left = true;
        if (this.m_CurrentTileGrid.getTileValue(collisionPoints.right(0,0))) tileIntersection.right = true;

        //-----------------------
        // react to intersections
        //-----------------------
        const positionBuffer = new Vector2(this.m_Position);
        
        const pushBuffer =
        {
            bottom: {val: undefined as Vector2, iterations: undefined as number, name: "" as string},
            top:    {val: undefined as Vector2, iterations: undefined as number, name: "" as string},
            left:   {val: undefined as Vector2, iterations: undefined as number, name: "" as string},
            right:  {val: undefined as Vector2, iterations: undefined as number, name: "" as string},
        }

        if (tileIntersection.bottom || tileIntersection.bottomLeft || tileIntersection.bottomRight)
        {
            let i = 0;
            while(this.m_CurrentTileGrid.getTileValue(collisionPoints.bottom(0,0))        
            ||    this.m_CurrentTileGrid.getTileValue(collisionPoints.bottomLeft(0,0)) 
            ||    this.m_CurrentTileGrid.getTileValue(collisionPoints.bottomRight(0,0)))
            {
                ++i;
                this.m_Position.y += 0.001;
            }

            pushBuffer.bottom.val = new Vector2(this.m_Position);
            pushBuffer.bottom.iterations = i;
            pushBuffer.bottom.name = "bottom";
            this.m_Position.set(positionBuffer);
        }

        if (tileIntersection.top || tileIntersection.topLeft || tileIntersection.topRight)
        {
            let i = 0;
            while(this.m_CurrentTileGrid.getTileValue(collisionPoints.top(0,0))        
            ||    this.m_CurrentTileGrid.getTileValue(collisionPoints.topLeft(0,0)) 
            ||    this.m_CurrentTileGrid.getTileValue(collisionPoints.topRight(0,0)))
            {
                ++i;
                this.m_Position.y -= 0.001;
            }

            pushBuffer.top.val = new Vector2(this.m_Position);
            pushBuffer.top.iterations = i;
            pushBuffer.top.name = "top";
            this.m_Position.set(positionBuffer);
        }

        if (tileIntersection.left || tileIntersection.topLeft || tileIntersection.bottomLeft)
        {
            let i = 0;
            while(this.m_CurrentTileGrid.getTileValue(collisionPoints.left(0,0))        
            ||    this.m_CurrentTileGrid.getTileValue(collisionPoints.topLeft(0,0)) 
            ||    this.m_CurrentTileGrid.getTileValue(collisionPoints.bottomLeft(0,0)))
            {
                ++i;
                this.m_Position.x += 0.001;
            }

            pushBuffer.left.val = new Vector2(this.m_Position);
            pushBuffer.left.iterations = i;
            pushBuffer.left.name = "left";
            this.m_Position.set(positionBuffer);
        }

        if (tileIntersection.right || tileIntersection.topRight || tileIntersection.bottomRight)
        {
            let i = 0;
            while(this.m_CurrentTileGrid.getTileValue(collisionPoints.right(0,0))        
            ||    this.m_CurrentTileGrid.getTileValue(collisionPoints.topRight(0,0)) 
            ||    this.m_CurrentTileGrid.getTileValue(collisionPoints.bottomRight(0,0)))
            {
                ++i;
                this.m_Position.x -= 0.001;
            }

            pushBuffer.right.val = new Vector2(this.m_Position);
            pushBuffer.right.iterations = i;
            pushBuffer.right.name = "right";
            this.m_Position.set(positionBuffer);
        }

        //
        // cull non cardinal 
        //


        //------------------------
        // Select the final offset
        //------------------------
        let finalOffset = undefined;

        for (const item in pushBuffer) //replace this nonsense init loop
        {
            if (item)
            {
                finalOffset = (<any>pushBuffer)[item];
                break;
            }
        }

        if (finalOffset != undefined)
        {
            for (const item in pushBuffer)
            {
                if (item)
                {
                    if (!finalOffset.iterations)
                        finalOffset = (<any>pushBuffer)[item];

                    if ((<any>pushBuffer)[item].iterations && finalOffset.iterations)
                    {
                        if ((<any>pushBuffer)[item].iterations < finalOffset.iterations)
                        {
                            finalOffset = (<any>pushBuffer)[item];
                        }
                    }
                }
            }
        }
    
        //------------------------
        // Finally do some work
        //------------------------
        console.log(pushBuffer);
        console.log(finalOffset);
        
        if (finalOffset != undefined)
        {
            if ((<any>finalOffset).val != undefined)
            {
                this.m_Position.set((<any>finalOffset).val);
            }
            
            if ((<any>finalOffset).iterations != undefined && finalOffset === pushBuffer.bottom)
            {
                this.gravityBuffer.y = 0;

                if (Keyboard.getKey("Space"))
                    this.jump();
            }
            else
            {
                this.gravityBuffer.y = -0.01 + (this.gravityBuffer.y * 1.025);
            }

            if ((<any>finalOffset).iterations != undefined && finalOffset === pushBuffer.top)
            {
                this.gravityBuffer.y = 0;
            }
        }

        ////////////////////////////////////////////////////////////////////////////////

        this.m_Position.add(translationBuffer.add(this.gravityBuffer));

        //animate
        this.m_TileGridCharacterGraphicHandler.update(aDeltaTime, 0);
    }

    public draw(aDeltaTime: number)
    {
        this.m_TileGridCharacterGraphicHandler.draw(this.m_Position,this.sca,this.rot);
    }

    constructor(aTileSize: number, aPosition: Vector2, aScenegraph: Scenegraph, aTileGrid: TileGrid)
    {
        super(aTileGrid, aPosition);

        this.sca = new Vector3(aTileSize,aTileSize,aTileSize);

        this.m_TileGridCharacterGraphicHandler = new TileGridCharacterGraphicHandler(aScenegraph);
        this.m_TileCollisionHandler = new TileCollisionHandler();
    }
}

export default Player;
