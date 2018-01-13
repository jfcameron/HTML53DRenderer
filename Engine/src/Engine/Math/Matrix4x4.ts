// © 2018 Joseph Cameron - All Rights Reserved
// Project: HTML53DRenderer
// Created on 2018-01-12.

import Debug from "Engine/Debug"
import Exceptions from "Engine/Debug/Exceptions"
import Vector3 from "Engine/Math/Vector3"

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

    public translate(aVector: Vector3): Matrix4x4 
    {
        this.m30 = this.m00 * aVector.x + this.m10 * aVector.y + this.m20 * aVector.z + this.m30;
        this.m31 = this.m01 * aVector.x + this.m11 * aVector.y + this.m21 * aVector.z + this.m31;
        this.m32 = this.m02 * aVector.x + this.m12 * aVector.y + this.m22 * aVector.z + this.m32;
        this.m33 = this.m03 * aVector.x + this.m13 * aVector.y + this.m23 * aVector.z + this.m33;

        return this;
    }

    //======================================================================================================
    public rotateX(ang: number): Matrix4x4
    {
        let res = this;
        let sin: number, cos: number;

        if (ang === Math.PI || ang === -Math.PI) 
        {
            cos = -1.0;
            sin =  0.0;
        } 
        else if (ang === Math.PI * 0.5 || ang === -Math.PI * 1.5) 
        {
            cos = 0.0;
            sin = 1.0;
        } 
        else if (ang === -Math.PI * 0.5 || ang === Math.PI * 1.5) 
        {
            cos = 0.0;
            sin = -1.0;
        } 
        else 
        {
            cos = Math.cos(ang);
            sin = Math.sin(ang);
        }

        let rm11 = +cos;
        let rm12 = +sin;
        let rm21 = -sin;
        let rm22 = +cos;
        // add temporaries for dependent values
        let nm10 = this.m10 * rm11 + this.m20 * rm12;
        let nm11 = this.m11 * rm11 + this.m21 * rm12;
        let nm12 = this.m12 * rm11 + this.m22 * rm12;
        let nm13 = this.m13 * rm11 + this.m23 * rm12;
        // set non-dependent values directly
        res.m20 = this.m10 * rm21 + this.m20 * rm22;
        res.m21 = this.m11 * rm21 + this.m21 * rm22;
        res.m22 = this.m12 * rm21 + this.m22 * rm22;
        res.m23 = this.m13 * rm21 + this.m23 * rm22;
        // set other values
        res.m10 = nm10;
        res.m11 = nm11;
        res.m12 = nm12;
        res.m13 = nm13;
        res.m00 = this.m00;
        res.m01 = this.m01;
        res.m02 = this.m02;
        res.m03 = this.m03;
        res.m30 = this.m30;
        res.m31 = this.m31;
        res.m32 = this.m32;
        res.m33 = this.m33;
        
        return res;
    }

    /*
    public Mat4x4 rotateX(float ang, Mat4x4 res) 
    {
        float sin, cos;
        if (ang == (float) Math.PI || ang == -(float) Math.PI) {
            cos = -1.0f;
            sin = 0.0f;
        } else if (ang == (float) Math.PI * 0.5f || ang == -(float) Math.PI * 1.5f) {
            cos = 0.0f;
            sin = 1.0f;
        } else if (ang == (float) -Math.PI * 0.5f || ang == (float) Math.PI * 1.5f) {
            cos = 0.0f;
            sin = -1.0f;
        } else {
            cos = (float) Math.cos(ang);
            sin = (float) Math.sin(ang);
        }
        float rm11 = +cos;
        float rm12 = +sin;
        float rm21 = -sin;
        float rm22 = +cos;
        // add temporaries for dependent values
        float nm10 = m10 * rm11 + m20 * rm12;
        float nm11 = m11 * rm11 + m21 * rm12;
        float nm12 = m12 * rm11 + m22 * rm12;
        float nm13 = m13 * rm11 + m23 * rm12;
        // set non-dependent values directly
        res.m20 = m10 * rm21 + m20 * rm22;
        res.m21 = m11 * rm21 + m21 * rm22;
        res.m22 = m12 * rm21 + m22 * rm22;
        res.m23 = m13 * rm21 + m23 * rm22;
        // set other values
        res.m10 = nm10;
        res.m11 = nm11;
        res.m12 = nm12;
        res.m13 = nm13;
        res.m00 = m00;
        res.m01 = m01;
        res.m02 = m02;
        res.m03 = m03;
        res.m30 = m30;
        res.m31 = m31;
        res.m32 = m32;
        res.m33 = m33;
        return res;
    }
    */

    public rotateY(aAng: number): Matrix4x4 {throw Exceptions.Unimplemented;}
    public rotateZ(aAng: number): Matrix4x4 {throw Exceptions.Unimplemented;}

    public scale(aVector: Vector3): void {throw Exceptions.Unimplemented;}

    public mul(right: Matrix4x4): Matrix4x4 {throw Exceptions.Unimplemented;}

    //======================================================================================================
    public static perspective(aFOV: number, aAspectRatio: number, aNearClippingDistance: number, aFarClippingDistance: number):Matrix4x4 
    {
        throw Exceptions.Unimplemented;
    }

    //======================================================================================================

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
            this.m00, this.m01, this.m02, this.m03,
            this.m10, this.m11, this.m12, this.m13,
            this.m20, this.m21, this.m22, this.m23,
            this.m30, this.m31, this.m32, this.m33,
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
