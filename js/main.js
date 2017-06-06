TIME = new Time();
INPUT = new Input();

var m_Objects = [];

var playerX = 0;
var playerY = 0;
var playerZ = 0;

//create the world
{
    var worldDiv  = document.createElement("div");
    worldDiv.id = "m_World";

    worldDiv.style.padding = "0"; //padding:0;
    worldDiv.style.margin = "0"; //margin:0;
    
    //worldDiv.style.height="100%";                 //height:100%;
    //worldDiv.style.list-style="none";             //list-style:none;
    worldDiv.style.position="absolute";           //position:absolute;
    //worldDiv.style.width:$slideSize";            //width:$slideSize;
    //worldDiv.style.height:$slideSize;           //height:$slideSize;
    worldDiv.style.left="50%";                    //left:50%;
    worldDiv.style.top="50%";                     //top:50%;
    //worldDiv.style.margin-left=:-$slideSize/2;   //margin-left:-$slideSize/2;
    //worldDiv.style.margin-top:-$slideSize/2;    //margin-top:-$slideSize/2;
    worldDiv.style.overflow="visible";            //overflow:visible;
    worldDiv.style.WebkitPerspective="500px";  //-webkit-perspective: 500px;
    worldDiv.style.perspective="500px";          //perspective: 500px;

    document.body.appendChild(worldDiv);
    
}

//public
function createDiv(aX,aY,aZ, aRotX, aRotY, aRotZ,aColor)
{
    var div = document.createElement("div");
    
    div.innerHTML = m_Objects.length +"<br>Move:WASD,<br>RotZ:QE<br>RotX:RF";
    div.style.width = "100px";
    div.style.height = "100px";
    div.style.background = aColor;
    div.style.color = "white";
    div.style.transform = "rotateX("+aRotX+"deg) translate3d("+aX+"vw,"+aY+"vw,"+aZ+"vw)";
    
    
    
    
    div.tX = aX;
    div.tY = aY;
    div.tZ = aZ;
    
    div.rX = aRotX;
    div.rY = aRotY;
    div.rZ = aRotZ;
   
    div.update = function()
    {
        if (INPUT.getKeys()[65])//A
        {
            div.tX-=1;
        }
        
        if (INPUT.getKeys()[68])//D
        {
            div.tX+=1;
        }
        
        if (INPUT.getKeys()[87])//W
        {
            div.tY-=1;
        }
        
        if (INPUT.getKeys()[83])//S
        {
            div.tY+=1;
        }
        
        if (INPUT.getKeys()[69])//E
        {
            div.rZ+=2;    
        }
        
        if (INPUT.getKeys()[81])//Q
        {
            div.rZ-=2;  
        }
        
        if (INPUT.getKeys()[82])//R
        {
            div.rX-=2;  
        }
        
        if (INPUT.getKeys()[70])//F
        {
            div.rX+=2;  
        }
        //
        
        if (INPUT.getKeys()[73])//I
        {
            playerY-=10;
        }
        if (INPUT.getKeys()[75])//K
        {
            playerY+=10;
        }
        if (INPUT.getKeys()[74])//J
        {
            playerX-=10;
        }
        if (INPUT.getKeys()[76])//L
        {
            playerX+=10;
        }
                
        div.style.transform = "translate3d("+div.tX+"vw,"+div.tY+"vw,"+div.tZ+"vw) "+"rotateX("+div.rX+"deg) "+"rotateY("+div.rY+"deg) "+"rotateZ("+div.rZ+"deg) ";
        
        var oX =10*TIME.getTime();
        var oY =0;
        //div.style.WebkitPerspectiveOrigin = oX+"px "+oY+"px";
        //div.style.perspectiveOrigin       = oX+"px "+oY+"px";
        
        //div.style.perspectiveOrigin       = playerX + '% ' + playerY + '%';
        //div.style.webkitPerspectiveOrigin = playerX + '% ' + playerY + '%';
        
        worldDiv.style["-webkit-transform"] = "translateZ("+playerY+"px)";

        
    };

    
    //document.body.appendChild(div);
    document.getElementById("m_World").appendChild(div);    
    
    m_Objects.push(div);
    return div;

}

createDiv(0  ,0,  0, 0,0,0, "red");
createDiv(10 ,0,-10, 0,0,0, "green");
createDiv(-10,0,-30, 0,0,0, "pink");

function update()
{
    for(var i=0; i<m_Objects.length;i++)
    {
        m_Objects[i].update();
        
    }
    
    
}

TIME.start(update,16);

var m_IntervalHandle = setTimeout(update, 16);


for(var i=0; i<m_Objects.length;i++)
{
    
}
