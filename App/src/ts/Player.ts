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

//
import TileGrid from "./TileGrid"

const TAG: string = "Player";

class TileGridObject
{
    protected m_CurrentTileGrid: TileGrid;
    protected m_Position: Vector2;

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

class SpriteAnimator
{

}

class TileCollidable
{

}

/**
* @description a brief description of Player
* @warning Player has not been documented!
*/
class Player extends TileGridObject
{
    private readonly tspeed = 0.005;

    private readonly m_GraphicsObject: GraphicsObject;
    private readonly m_Sprite: Sprite;

    private u: number = 0;
    private i: number = 0;

    private rot = new Vector3(0,0,0);
    private sca: Vector3;

    

    

    public update(aDeltaTime: number): void
    {
        const translationBuffer = new Vector2();

        if (Keyboard.getKey("ArrowLeft"))  translationBuffer.x --;
        if (Keyboard.getKey("ArrowRight")) translationBuffer.x ++;

        translationBuffer.x += Gamepads.get(0).getAxis(0);

        translationBuffer.normalize();
        translationBuffer.multiply(this.tspeed * aDeltaTime);

        this.m_Position.add(translationBuffer);

        if (translationBuffer.length() != 0)
            this.u = ++this.i % 16 === 0 ? this.u < 3 ? 1 + this.u : 0 : this.u;
        else
        {
            this.u = 1;
            this.i = 0;
        }

        if (this.m_CurrentTileGrid)
        {
            console.log(this.m_CurrentTileGrid.getTileValue(Math.floor(this.m_Position.x),Math.floor(this.m_Position.y)));
        }
    }

    public draw(aDeltaTime: number)
    {
        this.m_GraphicsObject.draw
        (
            new Vector3
            (
                (this.m_Position.x * this.sca.x) + (0.5 * this.sca.x),
                (this.m_Position.y * -this.sca.y) - (0.5 * this.sca.y),
                0
            ), 
            this.rot, 
            this.sca
        );
        this.m_Sprite.draw(this.u, 0, 16, 17);
    }

    constructor(aTileSize: number, aPosition: Vector2, aScenegraph: Scenegraph, aTileGrid: TileGrid)
    {
        super(aTileGrid, aPosition);

        this.sca = new Vector3(aTileSize,aTileSize,aTileSize);

        const myshape = Shapes.Quad();
        myshape.style.backgroundImage = "none";

        this.m_Sprite = new Sprite(myshape,"img/Blocky.png");
        this.m_GraphicsObject = new GraphicsObject(myshape, aScenegraph);
    }
}

export default Player;
