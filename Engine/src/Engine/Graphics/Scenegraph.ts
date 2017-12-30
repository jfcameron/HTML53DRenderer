// © 2017 Joseph Cameron - All Rights Reserved
// Project: HTML53DRenderer
// Created on 2017-12-28.

import Debug from "Engine/Debug"
import Exceptions from "Engine/Debug/Exceptions"
import GraphicsObject from "Engine/Graphics/GraphicsObject";
import Style from "Engine/Graphics/Style"

const TAG: string = "Scenegraph";

/**
* @description root object of a 3D Scene.
*/
class Scenegraph
{
    private readonly m_SceneGraphDivHandle = document.createElement("div");

    public getRootDiv(): HTMLElement
    {
        return this.m_SceneGraphDivHandle;
    }

    public hide(): void
    {
        this.m_SceneGraphDivHandle.style.visibility = "hidden";
    }

    public show(): void
    {
        this.m_SceneGraphDivHandle.style.visibility = "visible";
    }

    constructor()
    {
        if (!(this instanceof Scenegraph)) throw new Exceptions.Sealed();

        this.m_SceneGraphDivHandle.className += Style.Class.SceneGraph;
    }
}

export default Scenegraph;
