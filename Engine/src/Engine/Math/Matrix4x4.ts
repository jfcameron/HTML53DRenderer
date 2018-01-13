// © 2018 Joseph Cameron - All Rights Reserved
// Project: HTML53DRenderer
// Created on 2018-01-12.

import Debug from "Engine/Debug"
import Exceptions from "Engine/Debug/Exceptions"

const TAG: string = "Matrix4x4";

/**
* @description a brief description of Matrix4x4
* @warning Matrix4x4 has not been documented!
*/
class Matrix4x4
{
    public m00: number = 1; public m10: number = 0; public m20: number = 0; public m30: number = 0;
    public m01: number = 0; public m11: number = 1; public m21: number = 0; public m31: number = 0;
    public m02: number = 0; public m12: number = 0; public m22: number = 1; public m32: number = 0;
    public m03: number = 0; public m13: number = 0; public m23: number = 0; public m33: number = 1;

    public set(
        m00: number, m10: number, m20: number, m30: number,
        m01: number, m11: number, m21: number, m31: number,
        m02: number, m12: number, m22: number, m32: number,
        m03: number, m13: number, m23: number, m33: number,
    ): void
    {
        this.m00 = m00; this.m10 = m10; this.m20 = m20; this.m30 = m30;
        this.m01 = m01; this.m11 = m11; this.m21 = m21; this.m31 = m31;
        this.m02 = m02; this.m12 = m12; this.m22 = m22; this.m32 = m32;
        this.m03 = m03; this.m13 = m13; this.m23 = m23; this.m33 = m33;
    }

    public toFloat32Array(): Float32Array
    {
        return new Float32Array([
            this.m00, this.m10, this.m20, this.m30,
            this.m01, this.m11, this.m21, this.m31,
            this.m02, this.m12, this.m22, this.m32,
            this.m03, this.m13, this.m23, this.m33,
        ]);
    }

    public toString(): string
    {
        return `{${this.m00}, ${this.m10}, ${this.m20}, ${this.m30}, ${this.m01}, ${this.m11}, ${this.m21}, ${this.m31}, ${this.m02}, ${this.m12}, ${this.m22}, ${this.m32}, ${this.m03}, ${this.m13}, ${this.m23}, ${this.m33}}`
    }

    public equalTo(aOther: Matrix4x4): boolean
    {
        return (
            this.m00 === aOther.m00 && this.m10 === aOther.m10 && this.m20 === aOther.m20 && this.m30 === aOther.m30 &&
            this.m01 === aOther.m01 && this.m11 === aOther.m11 && this.m21 === aOther.m21 && this.m31 === aOther.m31 &&
            this.m02 === aOther.m02 && this.m12 === aOther.m12 && this.m22 === aOther.m22 && this.m32 === aOther.m32 &&
            this.m03 === aOther.m03 && this.m13 === aOther.m13 && this.m23 === aOther.m23 && this.m33 === aOther.m33
        );
    }
    
    constructor()
    constructor(aVector4: Matrix4x4)
    constructor(
        m00: number, m10: number, m20: number, m30: number,
        m01: number, m11: number, m21: number, m31: number,
        m02: number, m12: number, m22: number, m32: number,
        m03: number, m13: number, m23: number, m33: number
    )
    constructor(
        a0?:  any,    m10?: number, m20?: number, m30?: number,
        m01?: number, m11?: number, m21?: number, m31?: number,
        m02?: number, m12?: number, m22?: number, m32?: number,
        m03?: number, m13?: number, m23?: number, m33?: number
    )
    {
        if (!(this instanceof Matrix4x4)) throw new Exceptions.Sealed();

        if (arguments.length === 1)
        {
            this.set(
                a0.m00, a0.m10, a0.m20, a0.m30,
                a0.m01, a0.m11, a0.m21, a0.m31,
                a0.m02, a0.m12, a0.m22, a0.m32,
                a0.m03, a0.m13, a0.m23, a0.m33    
            );
        }
        else if (arguments.length === 16)
        {
            this.set(
                a0,  m10, m20, m30,
                m01, m11, m21, m31,
                m02, m12, m22, m32,
                m03, m13, m23, m33
            );
        }
    }
}

export default Matrix4x4;
