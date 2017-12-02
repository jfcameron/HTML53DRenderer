// © 2017 Joseph Cameron - All Rights Reserved
// Project: CSS3DRenderer
// Created on 2017-12-01.
"use strict";

requirejs.config({
    baseUrl: 'js/app',

    paths: {
        Engine: '../engine',
        Thirdparty: '../thirdparty'
    }
});

// Requirejs Entrypoint
define(function(require)
{
    const Vector3 = require("Engine/Math/Vector3");
    
    const Debug = new (require("Engine/Debug"))();
    const Input = new (require("Engine/Input"))();
    const Time  = new (require("Engine/Time"))(update, 16);

    Debug.Log("TAG",123);

    var obj = new Object();
    var vec = new Vector3(1,0,0);

    console.log(vec);

    Debug.Log("Hello",vec.Length());

    Debug.Log("asdf", obj instanceof Vector3);
    Debug.Log("123", vec instanceof Vector3);

    Debug.Log("123213", new Vector3(0,1,2));

    var position = new Vector3();
    var rotation = new Vector3();

    var sceneGraphDiv = document.getElementById("SceneGraph");
    var cubeDiv = document.getElementById("theCube");

    function update()
    {
        if (Input.getKey(Input.KEY.A) || Input.getKey(Input.KEY.LeftArrow))
        {
            position.x -= 1;
        }   
        
        if (Input.getKey(Input.KEY.D) || Input.getKey(Input.KEY.RightArrow))
        {
            position.x += 1;
        }
        
        if (Input.getKey(Input.KEY.W) || Input.getKey(Input.KEY.UpArrow))
        {
            position.z -= 1;
        }
        
        if (Input.getKey(Input.KEY.S) || Input.getKey(Input.KEY.DownArrow))
        {
            position.z += 1;
        }
        
        if (Input.getKey(Input.KEY.Space))
        {
            position.y -= 1;
        }
        
        if (Input.getKey(Input.KEY.LeftControl))
        {
            position.y += 1;
        }
        
        if (Input.getKey(Input.KEY.E))
        {
            rotation.y += 1;
        }
        
        if (Input.getKey(Input.KEY.Q))
        {
            rotation.y -= 1;  
        }
        
        //cubeDiv
        cubeDiv.style.transform = "translate3d(" + position.x + "vw," + position.y + "vw," + position.z + "vw) " + "rotateX(" + rotation.x + "deg) " + "rotateY(" + rotation.y + "deg) " + "rotateZ(" + rotation.z + "deg) ";
    }
});
