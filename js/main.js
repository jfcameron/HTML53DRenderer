// © 2017 Joseph Cameron - All Rights Reserved
// Project: CSS3DRenderer
// Created on 2017-12-01.

TIME = new Time(update, 16);
INPUT = new Input();
DEBUG = new Debug();

var sceneGraphDiv = document.getElementById("SceneGraph");
var cubeDiv = document.getElementById("theCube");

var position = new Vector3();
var rotation = new Vector3();

DEBUG.Log("UPDATE", typeof(update));
DEBUG.Log("UPDATE", 1,2,3,4,5);
DEBUG.Log("UPDATE");

function update()
{
    if (INPUT.getKey(INPUT.KEY.A))
    {
        position.x -= 1;
    }   
    
    if (INPUT.getKey(INPUT.KEY.D))
    {
        position.x += 1;
    }
    
    if (INPUT.getKey(INPUT.KEY.W))
    {
        position.z -= 1;
    }
    
    if (INPUT.getKey(INPUT.KEY.S))
    {
        position.z += 1;
    }
    
    if (INPUT.getKey(INPUT.KEY.Space))
    {
        position.y -= 1;
    }
    
    if (INPUT.getKey(INPUT.KEY.LeftControl))
    {
        position.y += 1;
    
    }
    
    if (INPUT.getKey(INPUT.KEY.E))
    {
        rotation.y += 1;
    }
    
    if (INPUT.getKey(INPUT.KEY.Q))
    {
        rotation.y -=2 ;  
    }
    
    //cubeDiv
    cubeDiv.style.transform = "translate3d(" + position.x + "vw," + position.y + "vw," + position.z + "vw) " + "rotateX(" + rotation.x + "deg) " + "rotateY(" + rotation.y + "deg) " + "rotateZ(" + rotation.z + "deg) ";
}
