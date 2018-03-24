var canvas = document.createElement("canvas");
document.body.appendChild(canvas);

canvas.width  = 768;
canvas.height = 1024;
canvas.style.position = "absolute";

var canvatte      = new Canvate(canvas);
    canvatte.name = "Stage";
var background    = canvatte.addNewClip();
    background.setRect(canvas.width, canvas.height, "black");

var dataList = [
]

var marginX = 33;
var marginY = 50;

var background = {
     x      : marginX
    ,y      : marginY
    ,width  : canvatte.width  - (marginX*2)
    ,height : canvatte.height - (marginY)
    ,backgroundColor : "white"
}

var logo = {
     x        : 82
    ,y        : 93
    ,width    : 768-(82*2)
    ,height   : "auto"
    ,urlImage : "img/logo.svg"
}

var watch = {
     x        : marginX
    ,y        : 472
    ,width    : canvatte.width - (marginX*2)
    ,height   : "auto"
    ,urlImage : "img/splash1.jpg"
}

var title = {
     x        : 95
    ,y        : 830
    ,width    : 240
    ,height   : "auto"
    ,urlImage : "img/title.svg"
}

var slider = {
     x        : 93
    ,y        : 855
    ,width    : 588
    ,height   : 133
    ,overflow : 1
}
/*
var thumb = {
     x        : 0
    ,y        : 0
    ,width    : 110
    ,height   : 133
    ,backgroundColor : "green"
}
/*
var sliderMask = {
     x        : 93
    ,y        : 855
    ,width    : 240
    ,height   : "auto"
}
*/
dataList.push(background);
dataList.push(logo);
dataList.push(watch);
dataList.push(title);
dataList.push(slider);

var data;
var clip;
var slider;
var thumb;
var buildSplash = function(){
    var length = dataList.length;
    for(var index = 0; index < length; index++){
        clip   = canvatte.getClip();
        data   = dataList[index];
        clip.x = data.x;
        clip.y = data.y;
        
        clip.width  = data.width;
        clip.height = data.height;
        
        clip.setSize(data.width, data.height);
        
        if(null != data.backgroundColor){
            clip.setRect(data.width, data.height, data.backgroundColor);
        }
        
        if(null != data.urlImage){
            clip.loadImage(data.urlImage);
        }
        
        if(1 == data.overflow){
            //clip.hideOverflow(data.width, data.height);
        }
        
        data.clip = clip;
        
        canvatte.addClip(clip);
    }
}

var id_I    = 0;
var url_I   = 1;
var title_I = 2;

categoriList = [
     [ 1, "img/patrimony01.png",     "Patrimony"]
    ,[ 2, "img/traditionelle02.png", "Traditionelle"]
    ,[ 3, "img/fiftysix03.png",      "Fiftysix"]
    ,[ 4, "img/overseas04.png",      "Overseas"]
    ,[ 5, "img/historiques05.png",   "Historiques"]
    ,[ 6, "img/malte07.png",         "Malte"]
    ,[ 7, "img/quai08.png",          "Quai"]
    ,[ 8, "img/heures09.png",        "Heures"]
    ,[ 9, "img/metier10.png",        "Metier"]
]

function onloadThumb(thumb){
    return function(){ thumb.fitInto(110, 113, .0, 25);}
}

function debug (a, b, c){
    console.log(a);
    console.log(b);
    console.log(c);
    console.log("-------");
}

var container;
 var thumb;
var buildSlider = function(){
    slider     = slider.clip;
    slider.name = "Slider";
    container     = canvatte.getClip();
    container.name = "Container";
    //container.setViewPort(1200, 153);
    
    var gap    = (slider.width-(95*2))/5;
    var length = categoriList.length;
    var data;
   
    for(var index=0; index < length; index++){
        data = categoriList[index];
        
        thumb           = canvatte.getClip();
        thumb.name      = "thumb"+index;
        //thumb.setPivot(0.5);
       // thumb.setViewPort(110, 153);
        var x = index * gap;
        thumb.x = (index * gap) + thumb.width/2;
        
        img             = canvatte.getClip();
        img.loadImage(data[url_I], onloadThumb(img));
        
        thumb.addClip(img);
        
        thumb.onClick = function(){
           console.log(this.name);
        }
        
        thumb.onOver = function(){
            console.log("overing!!!");
        }
        
        container.addClip(thumb);
        
        this["i" + index] = img;
    }
    
    canvatte.addClip(container);
    container.x = 95;
    container.Y = 855;
}

buildSplash();
buildSlider();
