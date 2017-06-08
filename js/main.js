TIME = new Time();
INPUT = new Input();

var sceneGraphDiv = document.getElementById("SceneGraph");
var cubeDiv = document.getElementById("theCube");

var x = 0, y = 0, z = 0;
var rX = 0, rY = 0, rZ = 0;

function update()
{
    if (INPUT.getKeys()[65])//A
    {
        x-=1;
    }
    
    if (INPUT.getKeys()[68])//D
    {
        x+=1;
    }
    
    if (INPUT.getKeys()[87])//W
    {
        z-=1;
    }
    
    if (INPUT.getKeys()[83])//S
    {
        z+=1;
    }
    
    if (INPUT.getKeys()[32])//Space
    {
        y-=1;
    }
    
    if (INPUT.getKeys()[17])//Ctrl
    {
        y+=1;
    
    }
    
    if (INPUT.getKeys()[69])//E
    {
        rY+=1;
    }
    
    if (INPUT.getKeys()[81])//Q
    {
        rY-=2;  
    }
    
    //cubeDiv
    cubeDiv.style.transform = "translate3d("+x+"vw,"+y+"vw,"+z+"vw) "+"rotateX("+rX+"deg) "+"rotateY("+rY+"deg) "+"rotateZ("+rZ+"deg) ";
    
}

TIME.start(update,16);