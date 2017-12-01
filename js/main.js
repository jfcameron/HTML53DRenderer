// © 2017 Joseph Cameron - All Rights Reserved
// Project: ${PROJECTNAME}
// Created on ${YEAR-MONTH-DAY}.

TIME = new Time(update, 16);
INPUT = new Input();

var sceneGraphDiv = document.getElementById("SceneGraph");
var cubeDiv = document.getElementById("theCube");

var x = 0, y = 0, z = 0;
var rX = 0, rY = 0, rZ = 0;

function update()
{
    //console.log(INPUT.KEY);

    if (INPUT.getKey(INPUT.KEY.A))
    {
        x-=1;
    }   
    
    if (INPUT.getKey(INPUT.KEY.D))
    {
        x+=1;
    }
    
    if (INPUT.getKey(INPUT.KEY.W))
    {
        z-=1;
    }
    
    if (INPUT.getKey(INPUT.KEY.S))
    {
        z+=1;
    }
    
    if (INPUT.getKey(INPUT.KEY.Space))
    {
        y-=1;
    }
    
    if (INPUT.getKey(INPUT.KEY.LeftControl))
    {
        y+=1;
    
    }
    
    if (INPUT.getKey(INPUT.KEY.E))
    {
        rY+=1;
    }
    
    if (INPUT.getKey(INPUT.KEY.Q))
    {
        rY-=2;  
    }
    
    //cubeDiv
    cubeDiv.style.transform = "translate3d("+x+"vw,"+y+"vw,"+z+"vw) "+"rotateX("+rX+"deg) "+"rotateY("+rY+"deg) "+"rotateZ("+rZ+"deg) ";
}
