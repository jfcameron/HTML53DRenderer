// © 2017 Joseph Cameron - All Rights Reserved
// Project: HTML53DRenderer
// Created on 2017-12-27.

import Debug from "Engine/Debug"
import Exceptions from "Engine/Debug/Exceptions"
import Style from "Engine/Graphics/Style"
import Scenegraph from "Engine/Graphics/Scenegraph"

const TAG: string = "Camera";

/**
* @description a brief description of Camera
* @warning Camera has not been documented!
*/
class Camera
{
    private readonly m_CameraDivHandle = document.createElement("div");

    public getDiv(): HTMLElement
    {
        return this.m_CameraDivHandle;
    }

    public set(): void
    {
        throw new Exceptions.Unimplemented();
    }

    public toString(): string
    {
        throw new Exceptions.Unimplemented();
    }

    public equalTo(aOther: Camera): boolean
    {
        throw new Exceptions.Unimplemented();
    }
    
    public destruct(): void
    {
        throw new Exceptions.Unimplemented();
    }

    constructor(aParentDocumentNode: HTMLElement, aScenegraph: Scenegraph)
    {
        if (!(this instanceof Camera)) throw new Exceptions.Sealed();

        this.m_CameraDivHandle.className += Style.Class.Camera;
        
        this.m_CameraDivHandle.appendChild(aScenegraph.getRootDiv());

        aParentDocumentNode.appendChild(this.m_CameraDivHandle);
    }
}

export default Camera;
