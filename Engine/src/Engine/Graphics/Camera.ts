// © 2017 Joseph Cameron - All Rights Reserved
// Project: HTML53DRenderer
// Created on 2017-12-27.

import Debug from "Engine/Debug"
import Exceptions from "Engine/Debug/Exceptions"
import Style from "Engine/Graphics/Style"
import Scenegraph from "Engine/Graphics/Scenegraph"
import Vector3 from "Engine/Math/Vector3"

const TAG: string = "Camera";

/**
* @description defines the viewport bounds and perspective mul to be applied to a Scenegraph & its contents.
* @note because perspective style is propagated recursively through document node tree, the camera's div must be
* the parent of the scenegraph(s) it will render. This also means that if the user wants to render the same scene with
* multiple cameras, the original scenegraph must be duplicated for each additional camera. This is currently not supported
* by this project.
*/
class Camera
{
    private readonly m_CameraDivHandle = document.createElement("div");
    private readonly m_SceneGraph: Scenegraph;

    public setTransform(aPosition: Vector3, aRotation: Vector3)
    {
        this.m_SceneGraph.getRootDiv().style.transform = 
            "rotateX(" +     aRotation.x + "deg)rotateY(" + aRotation.y + "deg)rotateZ(" + aRotation.z + "deg)" +
            "translate3d(" + aPosition.x + "px," +          aPosition.y + "px," +          aPosition.z + "px)"
        ;
    }

    public getDiv(): HTMLElement
    {
        return this.m_CameraDivHandle;
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

        this.m_SceneGraph = aScenegraph;
    }
}

export default Camera;
