var isDebug = true;
var canvas  = document.createElement("canvas");
document.body.appendChild(canvas);

canvas.width  = 200;
canvas.height = 200;

var canvatte      = new Canvate(canvas);
    canvatte.name = "Stage";
 var red = canvatte.addNewClip();
     red.name = "red"
     red.setRect(100, 20, "red");
     red.x = 20;

 var background    = canvatte.addNewClip();
     background.name = "bkg"
     background.setRect(40, 80, "lightBlue");
    
     background.x = 50;
     background.y = 50;
     background.setPivot(0.5, 0.5);
     background.rotation = 45;
     background.debug = debug;
     
     background.addClip(red);

var data;
var counter = 0
 function debug(a, b, c, d, canvas){
    if(++counter%1 == 0){
        background.rotation +=1;
    }
 }