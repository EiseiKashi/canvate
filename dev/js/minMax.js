var canvas = document.createElement("canvas");
document.body.appendChild(canvas);

canvas.width  = 200;
canvas.height = 200;

var canvatte      = new Canvate(canvas);
    canvatte.name = "Stage";
    canvatte.setRect(200, 600, "yellow");
    canvatte.debug = debug;
    
var background    = canvatte.addNewClip();
    background.name = "Background";
    background.setRect(50, 50, "red");
/*    
 var red    = canvatte.addNewClip();
    red.setRect(5, 5, "red");


     
    
    background.x = 50;
    background.y = 50;
    
    background.setPivot(0, 0);

    background.debug = debug;

var data;

 */
 function debug(width){
    console.log(width)
 }