# HTML53DRenderer 
![alt tag](http://jfcameron.github.io/Github/CSSRender/Render.png "")

## Description
![asdf](https://img.shields.io/badge/development%20status-active-green.svg)
![asdf](https://img.shields.io/badge/platforms-Chrome-lightgrey.svg)

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
