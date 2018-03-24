var canvas = document.createElement("canvas");
document.body.appendChild(canvas);

canvas.width  = 768;
canvas.height = 1024;
canvas.style.position = "absolute";

var canvatte      = new Canvate(canvas);
var background    = canvatte.addNewClip();
    background.name = "BACKGROUND";
    background.setRect(canvas.width, canvas.height, "black");
    background.onClick = function(){
        console.log("AYU TE AMO!!");
    }