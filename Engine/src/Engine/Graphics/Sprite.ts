// © 2017 Joseph Cameron - All Rights Reserved
// Project: HTML53DRenderer
// Created on 2017-12-21.

import Debug from "Engine/Debug"
import Exceptions from "Engine/Debug/Exceptions"
import Style from "Engine/Graphics/Style"

const TAG: string = "Sprite";

/**
* @description draws subsections of an image using canvas 2d context.
* Useful for rendering packed textures or spritesheets.
*/
class Sprite
{
    private readonly m_Canvas: HTMLCanvasElement  = document.createElement("canvas");
    private readonly m_Context: CanvasRenderingContext2D = this.m_Canvas.getContext('2d');
    private readonly m_Image: HTMLImageElement;

    public draw(aU: number, aV: number, cellWidth: number, cellHeight: number): void
    {
        this.m_Context.clearRect(0, 0, this.m_Canvas.width, this.m_Canvas.height);

        this.m_Context.drawImage(this.m_Image, aU * cellWidth, aV * cellHeight, cellWidth, cellHeight, 0, 0, this.m_Canvas.width, this.m_Canvas.height);
    }

    /**
     * @param aDiv div to be used as a surface for the sprite's canvas
     * @param aImage an image to use for drawing. Fetch does not have to be completed.
     */
    constructor(aDiv: HTMLDivElement, aImage: HTMLImageElement)
    /** @param aImageURL url to image local or cross domain (usual security does not apply) */
    constructor(aDiv: HTMLDivElement, aImageURL: string)
    constructor(aDiv: HTMLDivElement, aData?: any)
    {
        if (!(this instanceof Sprite)) throw new Exceptions.Sealed();

        this.m_Canvas.className += Style.Class.Canvas;
        
        this.m_Context.webkitImageSmoothingEnabled = false;
        this.m_Context.imageSmoothingEnabled = false;

        aDiv.style.backgroundColor = "rgba(0, 0, 0, 0)";

        aDiv.appendChild(this.m_Canvas);
        
        if (typeof aData === "string")
        {
            this.m_Image = new Image();
            this.m_Image.src = aData;
        }
        else if (aData instanceof HTMLImageElement)
        {
            this.m_Image = aData;
        }

        this.m_Image.complete ? 
            this.draw(0, 0, this.m_Canvas.width, this.m_Canvas.height): 
            this.m_Image.onload = () => { this.draw(0, 0, this.m_Canvas.width, this.m_Canvas.height);};
    }
};

export default Sprite;
