// © 2017 Joseph Cameron - All Rights Reserved
// Project: HTML53DRenderer
// Created on 2017-12-28.

import Debug from "Engine/Debug"
import Exceptions from "Engine/Debug/Exceptions"
import GraphicsObject from "Engine/Graphics/GraphicsObject";
import Style from "Engine/Graphics/Style"

const TAG: string = "Scenegraph";

/**
* @description a brief description of Scenegraph
* @warning Scenegraph has not been documented!
*/
class Scenegraph
{
    private readonly m_SceneGraphDivHandle = document.createElement("div");

    public getRootDiv(): HTMLElement
    {
        return this.m_SceneGraphDivHandle;
    }

    public set(): void
    {
        throw new Exceptions.Unimplemented();
    }

    public toString(): string
    {
        throw new Exceptions.Unimplemented();
    }

    public equalTo(aOther: Scenegraph): boolean
    {
        throw new Exceptions.Unimplemented();
    }
    
    public destruct(): void
    {
        throw new Exceptions.Unimplemented();
    }

    constructor(aParentDocumentNode: HTMLElement)
    {
        if (!(this instanceof Scenegraph)) throw new Exceptions.Sealed();

        this.m_SceneGraphDivHandle.className += Style.Class.SceneGraph;
    }
}

export default Scenegraph;
