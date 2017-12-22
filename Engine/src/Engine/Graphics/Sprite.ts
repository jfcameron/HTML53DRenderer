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
    private readonly m_Image   = new Image();

    public toString(): string
    {
        throw new Exceptions.Unimplemented();
    }

    public equalTo(aOther: Sprite): boolean
    {
        throw new Exceptions.Unimplemented();
    }

    public Update(aU: number, aV: number, cellWidth: number, cellHeight: number): void
    {
        this.m_Context.clearRect(0, 0, this.m_Canvas.width, this.m_Canvas.height);

        this.m_Context.drawImage(this.m_Image, aU * cellWidth, aV * cellHeight, cellWidth, cellHeight, 0, 0, this.m_Canvas.width, this.m_Canvas.height);
    }

    constructor(aDiv: HTMLDivElement, aImageURL: string)
    {
        if (!(this instanceof Sprite)) throw new Exceptions.Sealed();

        this.m_Canvas.style.width  ='100%';
        this.m_Canvas.style.height ='100%';

        this.m_Context.webkitImageSmoothingEnabled = false;
        this.m_Context.imageSmoothingEnabled       = false;
        
        this.m_Image.src = aImageURL;
        this.m_Image.onload = () =>
        {
            this.Update(0, 0, this.m_Canvas.width, this.m_Canvas.height);
        };

        aDiv.appendChild(this.m_Canvas);
    }
};

export default Sprite;
