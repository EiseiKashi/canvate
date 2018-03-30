var HanaSakura = function(image){
    var maxX   = mainCanvas.width
    var maxY   = mainCanvas.height/2
    var clip   = canvatte.addNewClip(image);

        clip.width  = 15;
        clip.height = 15;
        clip.x      = maxX;
        clip.y      = (Math.random()*maxY);
    
    var speedX = (Math.random()*30)+15;
    var speedY = Math.random()*10;

    this.move = function(){
        clip.x -= speedX;
        clip.y += speedY;
        clip.rotation += 1;
        if(clip.x < 0 || clip.x > 800){
            speedX *= -1;
        }
        if(clip.y < 0 || clip.y > 300){
            speedY *= -1;
        }
    }
}

function debug (inner, name){
    if(added[name] == undefined){
        var p           = document.createElement("p");
            p.innerHTML = name
        var section = document.createElement("section");
            section.appendChild(p);
            section.appendChild(inner)
        document.body.appendChild(section);
        added[name] = true;
    }
}

function onImageLoaded(event){
    imageClip.crop(0,900,250,250);
    var totalSakura = 1500;
    for(var index = 0; index < totalSakura; index++){
        var hana = new HanaSakura(imageClip.canvas);
        hanaList.push(hana);
    }
    
    window.requestAnimationFrame(sakuraFubuki);
}
    
function sakuraFubuki(){
    for(var index = 0; index < hanaList.length; index++){
        var hana = hanaList[index];
        hana.move.call(hana);
    }
    window.requestAnimationFrame(sakuraFubuki);
}

isDebug = true;

var mainCanvas              = document.createElement("canvas");
    mainCanvas.width        = 800;
    mainCanvas.height       = 300;
    mainCanvas.style.border = "solid 0.5px gray";
    mainCanvas.id           = "MAIN_CANVAS";
    document.body.appendChild(mainCanvas);

var canvatte = new Canvate(mainCanvas);
var hanaList = [];
var added    = {};

var imageClip      = canvatte.getNewClip();
    imageClip.name = "sakura";
    imageClip.addEventListener(canvatte.IMAGE_LOADED, onImageLoaded);
    imageClip.loadImage("img/sakura2.png");