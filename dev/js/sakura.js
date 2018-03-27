isDebug = true;
var canvas = document.createElement("canvas");
document.body.appendChild(canvas);

canvas.width  = 800;
canvas.height = 300;

canvas.style.border = "solid 0.5px gray";
var canvatte = new Canvate(canvas);
var hanaList = [];
var HanaSakura = function(image){
    var clip = canvatte.addNewClip(image);
    clip.x = (Math.random()*(canvas.width/2)) +canvas.width/2;
    clip.y = (Math.random()*(canvas.height/2))+canvas.height/2;
    var speedX = Math.random()*30;
    var speedY = Math.random()*30;
    this.move = function(){
        clip.x += speedX;
        clip.y += speedY;
        clip.rotation += 0.5;
    }
}
var added = {};

function debug (inner, name){
    if(added[name] == undefined){
        var p = document.createElement("p");
            p.innerHTML = name
        var section = document.createElement("section");
            section.appendChild(p);
            section.appendChild(inner)
        document.body.appendChild(section);
        added[name]  = true;
    }
}

function onImageLoaded(event){
    imageClip.crop(0,900,250,250);
    var totalSakura = 50;
    for(var index = 0; index < totalSakura; index++){
        var hana = new HanaSakura(imageClip.canvas);
        hanaList.push(hana);
    }
    
    setInterval(sakuraFubuki, 50);
}

var imageClip = canvatte.getNewClip();
    imageClip.name = "sakura";
    imageClip.addEventListener(canvatte.IMAGE_LOADED, onImageLoaded);
    imageClip.loadImage("img/sakura2.png");
    
    canvatte.addClip(imageClip);
    
function sakuraFubuki(){
    for(var index = 0; index < hanaList.length; index++){
        var hana = hanaList[index];
        hana.move.call(hana);
    }
}
