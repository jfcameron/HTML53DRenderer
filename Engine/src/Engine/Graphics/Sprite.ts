// © 2017 Joseph Cameron - All Rights Reserved
// Project: HTML53DRenderer
// Created on 2017-12-21.

import Debug from "Engine/Debug"
import Exceptions from "Engine/Debug/Exceptions"

const TAG: string = "Sprite";

class Sprite
{
    private readonly m_Canvas  = document.createElement("canvas");
    private readonly m_Context = this.m_Canvas.getContext('2d');
    private readonly m_Image: HTMLImageElement;

    public toString(): string
    {
        throw new Exceptions.Unimplemented();
    }

    public equalTo(aOther: Sprite): boolean
    {
        throw new Exceptions.Unimplemented();
    }

    public draw(aU: number, aV: number, cellWidth: number, cellHeight: number): void
    {
        this.m_Context.clearRect(0, 0, this.m_Canvas.width, this.m_Canvas.height);

        this.m_Context.drawImage(this.m_Image, aU * cellWidth, aV * cellHeight, cellWidth, cellHeight, 0, 0, this.m_Canvas.width, this.m_Canvas.height);
    }

    constructor(aDiv: HTMLDivElement, aImage: HTMLImageElement)
    constructor(aDiv: HTMLDivElement, aImageURL: string)
    constructor(aDiv: HTMLDivElement, aData?: any)
    {
        if (!(this instanceof Sprite)) throw new Exceptions.Sealed();

        this.m_Canvas.style.width  ='100%';
        this.m_Canvas.style.height ='100%';

        this.m_Context.webkitImageSmoothingEnabled = false;
        this.m_Context.imageSmoothingEnabled       = false;

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
