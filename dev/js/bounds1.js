var canvas = document.createElement("canvas");
document.body.appendChild(canvas);

canvas.width  = 200;
canvas.height = 200;

var canvatte      = new Canvate(canvas);
    canvatte.name = "Stage";
 var s = canvatte;
 var red    = canvatte.addNewClip();
     red.setRect(10, 10, "red");

 var background    = canvatte.addNewClip();
    background.setRect(30, 70, "lightBlue");
    
    background.x = 60;
    background.y = 20;
    
    background.setPivot(0.5, 0.5);
    
    background.debug = debug;
    
    background.addClip(red);

var data;
var counter = 0
 function debug(a, b, c, d, canvas){
    if(++counter%1 == 0){
        background.rotation +=1;
    }
 }