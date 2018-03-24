isDebug = true;
var canvas = document.createElement("canvas");
document.body.appendChild(canvas);

canvas.width  = 800;
canvas.height = 300;

canvas.style.border = "solid 0.5px gray";
var canvatte = new Canvate(canvas);
    //canvatte.debug = debug;
/*
var container = canvatte.getClip();
var imgList = ["img/heures09.png", "img/metier10.png", "img/heures09.png", "img/metier10.png"];
var url;
for(var index = 0; index < imgList.length; index++){
    img      = canvatte.getClip();
    img.debug = debug;
    img.x    = index * 200;
    img.name = "i" + index;
    this[img.name] = img;
    url = imgList[index];
    img.loadImage(url);
    container.addClip(img);
}

canvatte.addClip(container)
*/
added = {}
function debug (inner, name, data){
    if(added[name] == undefined){
        var p = document.createElement("p");
            p.innerHTML = name
        var section = document.createElement("section");
            section.appendChild(p);
            section.appendChild(inner)
        document.body.appendChild(section);
        added[name]  = data;
    }
}

function debugMouse(clip){
}

function onClick(event){
    console.log("CLICK!")
}
/*
var w   = canvatte.getClip();
    w.x = 300;
    w.y = 20;
    w.addEventListener("imageLoaded", onLoadImage);
    w.loadImage("img/heures09.png");
    
    w.setText("Ayu hermosa de mi corazón!!!");
    w.fontsize = 30;
    w.addEventListener("over", onOver);
canvatte.addClip(w);
w.debug = debug;
*/
function onImageLoaded(event){
    g.visible = true;
    console.log("LOADED");
    
}

var g = canvatte.getClip();
    g.visible = false;
    g.addEventListener(g.IMAGE_LOADED, onImageLoaded);
    g.addEventListener("click", onClick);
    g.loadImage("img/cat.png");

canvatte.addClip(g);
    
g.debug = debugMouse;