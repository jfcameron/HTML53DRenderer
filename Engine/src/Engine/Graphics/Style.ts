// © 2017 Joseph Cameron - All Rights Reserved
// Project: HTML53DRenderer
// Created on 2017-12-27.

import Debug from "Engine/Debug"
import Images from "Engine/Graphics/Images"
import Colors from "Engine/Graphics/Colors"
import WebAPIs from "Engine/WebAPIs"
import Color from "./Color";

const PREFIX: string = "HTML53DRenderer_";

/**
* @description defines styles used throughout the project
*/
export module Style
{
    export module Class
    {
        export const Canvas: string     = PREFIX + "Canvas";
        export const Object3D: string   = PREFIX + "Object3D";
        export const Quad: string       = PREFIX + "Quad";
        export const Camera: string     = PREFIX + "Camera";
        export const SceneGraph: string = PREFIX + "SceneGraph";

        (() => 
        {
            let style: HTMLStyleElement = document.createElement("style");

            style.innerHTML = 
            `
            .${Object3D}, .${SceneGraph}, .${Camera}, .${Canvas}, .${Quad}
            {
                position: absolute;
                transform-style: preserve-3d;
            }

            .${SceneGraph}
            {
                top: 50%;
                left: 50%;

                transform-origin: 0px +5px 800px; /* Clearly wrong. Figure out how to generalize this magic */
            }

            .${Camera}
            {
                perspective:800px;
                overflow: hidden;
                width: 100%;
                height: 100%;
                background-color: rgba(${Colors.CornflowerBlue.r + ", " + Colors.CornflowerBlue.g + ", " + Colors.CornflowerBlue.b + ", " + Colors.CornflowerBlue.a});
            }

            .${Canvas}
            {
                width: 100%;
                height: 100%;
                top: 0px;
            }

            .${Quad}
            {
                background-color: rgba(0, 0, 0, 1);
                background-image: url(${Images.CheckeredTextureOfDeath()});
                background-size: contain;
                overflow: auto;
            }
            `;

            document.head.appendChild(style);
        })();
    }
}

export default Style;
