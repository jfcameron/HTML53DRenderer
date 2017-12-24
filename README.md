# HTML53DRenderer 
![alt tag](http://jfcameron.github.io/Github/CSSRender/Render.png "")

## Description
![asdf](https://img.shields.io/badge/development%20status-active-green.svg)
![asdf](https://img.shields.io/badge/platforms-web-lightgrey.svg)

Exploring 3D transform and perspective projection capabilities of HTML5's transform style

## Tools used
* TypeScript 2.6.2
* Node
* Chai
* Typedoc
* WebPack
* UglifyJs

## Usage
Repo is split into Engine and Adhoc. Engine represents the abstraction I am building, Adhoc is an example App that depends on it.

### Engine scripts:
* ./Engine/unit-tests.sh - run test suite
* ./Engine/generate-documents.sh - generate html docs

### Adhoc scripts:
* ./Adhoc/build-debug.sh - build adhoc with sourcemaps etc. 
* ./Adhoc/build-release.sh - build mangled, minified build
