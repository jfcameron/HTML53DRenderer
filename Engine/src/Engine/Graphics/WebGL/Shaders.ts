// © 2018 Joseph Cameron - All Rights Reserved
// Project: HTML53DRenderer
// Created on 2018-01-09.

import Debug from "Engine/Debug"
import Exceptions from "Engine/Debug/Exceptions"
import Shader from "Engine/Graphics/WebGL/Shader"
import Matrix4x4 from "Engine/Math/Matrix4x4"

const TAG: string = "Shaders";

/**
* @description a brief description of Shaders
* @warning Shaders has not been documented!
*/
module Shaders
{
/**
 * @description creates an unlit shaderprogram that discards frags with alpha level under threshold specified by _Threshold
 * @param gl weblgl context to register this AlphaCutOff shader with
 */
export function AlphaCutOff(gl: any): Shader { return new class extends Shader { constructor() { super(gl,
    `
    attribute highp vec3 a_Pos;
    attribute lowp  vec2 a_UV;

    uniform highp float _Time;
    uniform highp mat4 _MVP;

    varying lowp vec2 v_UV;

    void main()
    {
        highp vec4 position = vec4(a_Pos,1.0);
        {
            /*mat4 rotationMatrix;
            rotationMatrix[0][0] = cos(_Time); rotationMatrix[1][0] =-sin(_Time); rotationMatrix[2][0] = 0.0; rotationMatrix[3][0] = 0.0;
            rotationMatrix[0][1] = sin(_Time); rotationMatrix[1][1] = cos(_Time); rotationMatrix[2][1] = 0.0; rotationMatrix[3][1] = 0.0;
            rotationMatrix[0][2] = 0.0;        rotationMatrix[1][2] = 0.0;        rotationMatrix[2][2] = 1.0; rotationMatrix[3][2] = 0.0;
            rotationMatrix[0][3] = 0.0;        rotationMatrix[1][3] = 0.0;        rotationMatrix[2][3] = 0.0; rotationMatrix[3][3] = 1.0;
        
            position = rotationMatrix*position;*/

            mat4 rotationMatrix;
            rotationMatrix[0][0] = 1.0; rotationMatrix[1][0] = 0.0; rotationMatrix[2][0] = 0.0; rotationMatrix[3][0] = 0.0;
            rotationMatrix[0][1] = 0.0; rotationMatrix[1][1] = 1.0; rotationMatrix[2][1] = 0.0; rotationMatrix[3][1] = 0.0;
            rotationMatrix[0][2] = 0.0; rotationMatrix[1][2] = 0.0; rotationMatrix[2][2] = 1.0; rotationMatrix[3][2] = 0.0;
            rotationMatrix[0][3] = 0.0; rotationMatrix[1][3] = 0.0; rotationMatrix[2][3] = 0.0; rotationMatrix[3][3] = 1.0;
        
            //position = rotationMatrix* position;

            //position.x += sin(_Time)*0.5;
            //position.y += cos(_Time*2.0)/2.0;

            position = _MVP * position;
        }
    
        gl_Position = position;
    
        v_UV = a_UV;
    }`,
    `
    precision mediump float;

    varying lowp vec2 v_UV;

    uniform sampler2D _Texture;
    uniform lowp float _Threshold;

    void main()
    {
        lowp vec4 rvalue = vec4(0);
        {
            rvalue = texture2D(_Texture, v_UV);
        
            if (rvalue[3] < _Threshold)
            {
                discard;
            }   
        }

        gl_FragColor = rvalue;
    }`);
    
    this.setFloatUniform("_Time", 0);
    this.setMatrix4x4("_MVP", new Matrix4x4());

    this.setFloatUniform("_Threshold", 1.0);

}};}


}

export default Shaders;
