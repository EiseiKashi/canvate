var canvas = document.createElement("canvas");
document.body.appendChild(canvas);

canvas.width  = 768;
canvas.height = 1024;
canvas.style.position = "absolute";

var canvatte = new Canvate(canvas);
    canvatte.setColorBackground("black");
    
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
    ,width    : 625
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
    ,backgroundColor : "red"
}

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
var buildSplash = function(){
    var length = dataList.length;
    for(var index = 0; index < length; index++){
        clip   = canvatte.getClip();
        data   = dataList[index];
        clip.x = data.x;
        clip.y = data.y;
        
        clip.setSize(data.width, data.height);
        
        if(null != data.backgroundColor){
            clip.setColorBackground(data.backgroundColor);
        }
        
        if(null != data.urlImage){
            clip.loadImage(data.urlImage, function(){console.log("OK")}, function(){alert("ERROR!")});
        }
        
        data.clip = clip;
        
        canvatte.addClip(clip);
    }
}

buildSplash();
