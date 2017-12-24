# HTML53DRenderer 
![alt tag](http://jfcameron.github.io/Github/CSSRender/Render.png "")

## Description
![asdf](https://img.shields.io/badge/development%20status-active-green.svg)
![asdf](https://img.shields.io/badge/platforms-web-lightgrey.svg)

Exploring 3D transform and perspective projection capabilities of HTML5's transform style

## Layout
Repo is split into Engine and Adhoc. Engine represents the abstraction I am building, Adhoc is an example App that depends on it.

### Engine scripts:
* ./Engine/unit-tests.sh - run test suite
* ./Engine/generate-documents.sh - generate html docs

### Adhoc scripts:
* ./Adhoc/build-debug.sh - build adhoc with sourcemaps etc. 
* ./Adhoc/build-release.sh - build mangled, minified build

## Usage
add Engine/src/ to your project's include path.
See html docs for more info.

### Example code
    import Gamepad from "Engine/Input/Gamepad"
    import Shapes from "Engine/Graphics/Shapes"
    import GraphicsObject from "Engine/Graphics/GraphicsObject"
    import Vector3 from "Engine/Math/Vector3"
    import Timer from "Engine/Time/Timer"

    const voxdat = 
    [
        [
            [1,0,1],
            [0,0,0],
            [1,0,1]
        ],
    
        [
            [0,0,0],
            [0,1,0],
            [0,0,0]
        ],

        [
            [1,0,1],
            [0,0,0],
            [1,0,1]
        ]
    ];

    const pos = new Vector3();
    const rot = new Vector3();
    const sca = new Vector3(10,10,10);

    const gfxobj = new GraphicsObject(Shapes.VoxelField(voxdat),pos,rot,sca);

    const gamepad = new Gamepad(0);

    const myTimer = new Timer(16,() =>
    {
        pos.x += gamepad.getAxis(0) *3;
        pos.y += gamepad.getAxis(1) *3;
        rot.y += gamepad.getAxis(2);
        rot.x += gamepad.getAxis(3);
    });

    const draw = () =>
    {
        gfxobj.draw(pos,rot,sca);

        window.requestAnimationFrame(draw);
    }

    window.requestAnimationFrame(draw);

## Tools used
* TypeScript 2.6.2
* Node
* Chai
* Typedoc
* WebPack
* UglifyJs
