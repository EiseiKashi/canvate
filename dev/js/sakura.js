var myCanvas   = document.getElementById("Example1");
var myCanvate  = new Canvate(myCanvas);

var background = myCanvate.addNewClip();
    background.loadImage("img/fujisan-sakura.png");
    
var logo = myCanvate.addNewClip();
    logo.height = 73;
    logo.setAutoWidth();
    logo.setPosition(10, 10);
    logo.loadImage("img/sakura-code.svg");