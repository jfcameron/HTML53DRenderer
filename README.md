# HTML53DRenderer 
![alt tag](http://jfcameron.github.io/Github/CSSRender/iframe-voxel-sprite-example.png "")

## Description
![asdf](https://img.shields.io/badge/development%20status-active-green.svg)
![asdf](https://img.shields.io/badge/platforms-Chrome-lightgrey.svg)

Library for developing 3D applications with mixed style.transform content, context 2d and WebGL content. While WebGL should generally be preferred for performance reasons, style.transform based geometry allows the user to inject novel web content directly into their 3D Scenes (hyperlinks, iframes, video elements) and to style the scene via familiar js/css techniques.

## Layout
Repo is split into Engine and App. Engine represents the abstraction I am building, App is a webpack based workspace for dependent app projects. App includes demo usage of the engine, such as div based voxel renderer.

### Engine scripts:
* ./Engine/unit-tests.sh - run test suite
* ./Engine/generate-documents.sh - generate html docs

### App scripts:
* ./App/build-debug.sh - build current workspace project with sourcemaps etc. 
* ./App/build-release.sh - build mangled, minified build of current project
* ./App/build-voxel-example.sh - a voxel renderer example with custom voxel processing stage
* ./App/build-iframe-example.sh - a 3D scene with a keyboard/gamepad controlled player object and a iframe embedded into background geometry

## Usage
add Engine/src/ to your project's include path.
Refer to html docs for more info. A snapshot is available [here](http://jfcameron.github.io/Github/CSSRender/docs) but ./Engine/generate-documents.sh should be run for up to date documentation.

### Example code
```typescript
import Gamepads from "Engine/Input/Gamepads"
import Shapes from "Engine/Graphics/Shapes"
import GraphicsObject from "Engine/Graphics/GraphicsObject"
import Vector3 from "Engine/Math/Vector3"
import IntervalTimer from "Engine/Time/IntervalTimer"
import AnimationTimer from "Engine/Time/AnimationTimer"

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

const pos = new Vector3.Zero;
const rot = new Vector3.Zero;
const sca = new Vector3(10,10,10);

const gfxobj = new GraphicsObject(Shapes.VoxelField(voxdat),pos,rot,sca);

const mainLoop = new IntervalTimer(16,() =>
{
    pos.x += Gamepads.get(0).getAxis(0) *3;
    pos.y += Gamepads.get(0).getAxis(1) *3;
    rot.y += Gamepads.get(0).getAxis(2);
    rot.x += Gamepads.get(0).getAxis(3);
});

const renderLoop = new AnimationTimer((aDeltaTime: number) =>
{
    gfxobj.draw(pos,rot,sca);
});
```

## Tools used
* TypeScript 2.6.2
* Node
* Chai
* Typedoc
* WebPack
* UglifyJs
