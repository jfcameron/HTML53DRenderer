// © 2017 Joseph Cameron - All Rights Reserved
// Project: HTML53DRenderer
// Created on 2017-12-30.

import Debug from "Engine/Debug"
import Exceptions from "Engine/Debug/Exceptions"
import Camera from "Engine/Graphics/Camera"
import Vector3 from "Engine/Math/Vector3"
import Keyboard from "Engine/Input/Keyboard"
import Mouse from "Engine/Input/Mouse"
import Gamepads from "Engine/Input/Gamepads"

const TAG: string = "DebugCameraController";

/**
* @description a brief description of DebugCameraController
* @warning DebugCameraController has not been documented!
*/
class DebugCameraController
{
    private readonly m_Camera: Camera;
    
    private readonly m_Position: Vector3 = new Vector3(Vector3.Zero);
    private readonly m_Rotation: Vector3 = new Vector3(Vector3.Zero);

    public update(aDelta: number): void
    {
        //Keyboard
        if (Keyboard.getKey("KeyQ")) this.m_Rotation.y -= 1;
        if (Keyboard.getKey("KeyE")) this.m_Rotation.y += 1;
    
        if (Keyboard.getKey("Digit1")) this.m_Rotation.x -= 1;
        if (Keyboard.getKey("Digit2")) this.m_Rotation.x += 1;
    
        if (Keyboard.getKey("Space")) this.m_Position.y += 10;
        if (Keyboard.getKey("ControlLeft")) this.m_Position.y -= 10;
    
        const scalar = 30;

        if (Keyboard.getKey("KeyW"))
        {
            this.m_Position.x -= Math.sin((this.m_Rotation.y * Math.PI /180)) * scalar;
            this.m_Position.z += Math.cos((this.m_Rotation.y * Math.PI /180)) * scalar;
        }
    
        if (Keyboard.getKey("KeyS"))
        {
            this.m_Position.x += Math.sin((this.m_Rotation.y * Math.PI /180)) * scalar;
            this.m_Position.z -= Math.cos((this.m_Rotation.y * Math.PI /180)) * scalar;
        }
    
        if (Keyboard.getKey("KeyA"))
        {
            this.m_Position.x -= Math.sin(((this.m_Rotation.y-90) * Math.PI /180)) * scalar;
            this.m_Position.z += Math.cos(((this.m_Rotation.y-90) * Math.PI /180)) * scalar;
        }
    
        if (Keyboard.getKey("KeyD"))
        {
            this.m_Position.x -= Math.sin(((this.m_Rotation.y+90) * Math.PI /180)) * scalar;
            this.m_Position.z += Math.cos(((this.m_Rotation.y+90) * Math.PI /180)) * scalar;
        }
    
        //Controller
        if (Gamepads.get(0).getAxis(1) != 0)
        {
            let mag = Gamepads.get(0).getAxis(1);

            this.m_Position.x += Math.sin((this.m_Rotation.y * Math.PI /180)) * scalar * mag;
            this.m_Position.z -= Math.cos((this.m_Rotation.y * Math.PI /180)) * scalar * mag;
        }

        if (Gamepads.get(0).getAxis(0) != 0)
        {
            let mag = Gamepads.get(0).getAxis(0);

            this.m_Position.x += Math.sin(((this.m_Rotation.y-90) * Math.PI /180)) * scalar * mag;
            this.m_Position.z -= Math.cos(((this.m_Rotation.y-90) * Math.PI /180)) * scalar * mag;
        }

        if (Gamepads.get(0).getAxis(2) != 0)
        {
            let mag = Gamepads.get(0).getAxis(2);

            this.m_Rotation.y += mag;    
        }

        if (Gamepads.get(0).getAxis(3) != 0)
        {
            let mag = Gamepads.get(0).getAxis(3);

            this.m_Rotation.x -= mag;    
        }

        if (Gamepads.get(0).getButton(6) != 0)
        {
            this.m_Position.y += Gamepads.get(0).getButton(6) * scalar;
        }

        if (Gamepads.get(0).getButton(7) != 0)
        {
            this.m_Position.y -= Gamepads.get(0).getButton(7) * scalar;
        }

        this.m_Camera.setTransform(this.m_Position, this.m_Rotation);
    }

    constructor(aCamera: Camera)
    {
        this.m_Camera = aCamera;
    }
}

export default DebugCameraController;
