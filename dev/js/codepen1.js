// Get the HTML5 canvas reference.
var canvas   = document.getElementById("Example1");

// Create the Canvate.
var canvate  = new Canvate(canvas);

// Add new Clip
var logo = canvate.addNewClip();

//Load the image into the clip
    logo.loadImage("http://www.sakuracode.com/canvate/img/sakura-code.svg");