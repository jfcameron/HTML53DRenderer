// © 2017 Joseph Cameron - All Rights Reserved
// Project: HTML53DRenderer
// Created on 2017-12-31.

import { expect } from 'chai'
import Shapes from "Engine/Graphics/Shapes"
import Vector3 from "Engine/Math/Vector3"

describe("Shapes", () => 
{
    //=================
    // Public interface
    //=================
    it("Quad", () => 
    {
        expect
        (
            Shapes.Quad() instanceof HTMLDivElement
        )
        .to.equal(true);
    });

    it("Quad - Vector3, Vector3, Vector3, boolean overload", () => 
    {
        const a = new Vector3();
        const b = new Vector3();
        const c = new Vector3();
        const d = false;

        expect
        (
            Shapes.Quad(a,b,c,d) instanceof HTMLDivElement
        )
        .to.equal(true);
    });

    it("Cube", () => 
    {
        const a = Shapes.Cube();

        expect
        (
            a instanceof Array &&
            a[0] instanceof HTMLDivElement
        )
        .to.equal(true);
    });

    it("Cube - Vector3, Vector3, Vector3 overload", () => 
    {
        const b = new Vector3();
        const c = new Vector3();
        const d = new Vector3();

        const a = Shapes.Cube(b,c,d);

        expect
        (
            a instanceof Array &&
            a[0] instanceof HTMLDivElement
        )
        .to.equal(true);
    });

    it("Intersection", () => 
    {
        const a = 1;
        const b = 2;
        const c = Shapes.Intersection(a,b);

        expect
        (
            c instanceof Array &&
            c[0] instanceof HTMLDivElement
        )
        .to.equal(true);
    });

    it("Voxel", () => 
    {
        const a = new Vector3();
        const b = new Vector3();
        const c = new Vector3();
        const n = true;
        const s = true;
        const e = true;
        const w = true;
        const u = true;
        const d = true;

        const voxel = Shapes.Voxel(a,b,c,n,s,e,w,u,d);

        expect
        (
            voxel instanceof Array &&
            voxel[0] instanceof HTMLDivElement
        )
        .to.equal(true);
    });

    it("VoxelField", () => 
    {
        const a = 
        [
            [
                [1,2,3,4],
                [1,2,3,4],
                [1,2,3,4],
            ]
        ];

        const b = Shapes.VoxelFieldOrientation.Horizontal;

        const c = (aThisVoxel: {x: number, y: number, z: number, value: number}, aNeighbourData: {north: number, south: number, east: number, west: number, up: number, down: number}): Array<HTMLDivElement> =>
        {
            const north = aNeighbourData.north === undefined ? true : aNeighbourData.north === 0;
            const south = aNeighbourData.south === undefined ? true : aNeighbourData.south === 0;
            const east  = aNeighbourData.east  === undefined ? true : aNeighbourData.east  === 0;
            const west  = aNeighbourData.west  === undefined ? true : aNeighbourData.west  === 0;
            const up    = aNeighbourData.up    === undefined ? true : aNeighbourData.up    === 0;
            const down  = aNeighbourData.down  === undefined ? true : aNeighbourData.down  === 0;

            return Shapes.Voxel(new Vector3(0,0,0), new Vector3(0,0,0), new Vector3(1,1,1), north, south, east, west, up, down);
        };

        const d = Shapes.VoxelField(a,b,c);

        expect
        (
            d instanceof Array &&
            d[0] instanceof HTMLDivElement
        )
        .to.equal(true);
    });
});
