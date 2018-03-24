isDebug = true;
var canvas = document.createElement("canvas");
document.body.appendChild(canvas);

canvas.width  = 800;
canvas.height = 300;

canvas.style.border = "solid 0.5px gray";
var canvatte = new Canvate(canvas);
/*
//canvatte.debug = debug;

var t      = canvatte.getClip();
    t.name = "thumb";
    t.x    = 100;
    t.y    = 50;
    

for(var index = 0; index < 1; index++){
    img      = canvatte.getClip();
    img.x    = index * 200;
    img.name = "i" + index;
    this[img.name] = img
    img.loadImage("img/metier10.png");
    t.addClip(img);
}

console.log(img.x);

var canvasTest
function debug (name, data){
   console.log(name);
   console.log(data);
   console.log("------------");
}
setInterval(function(){i0.x += 0.5})
canvatte.addClip(t);
*/

for(var index = 0; index <2; index++){
    img      = canvatte.getClip();
    img.x    = index * 200;
    img.name = "i" + index;
    this[img.name] = img
    img.loadImage("img/metier10.png");
}

canvatte.addClip(i0);
i0.addClip(i1);