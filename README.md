
![CANVATE.JS](http://sakuracode.com/img/Ryu-github.svg)<br>
A Javascript library for multiple interactive Images and Sprite Sheet, using only one canvas.
- **Buttons with irregular shapes:** build buttons with irregular shapes with any kind of images for instance png, svg,  or other canvas. Canvate make it easy to build buttons "inside" de canvas.
- **Animate images inside the canvas**  using JQuery, Greensock or your custom code to animate your sprite sheet and images.
- **Masking:** is and easy task with Canvate. Images,other canvas and sprite sheet can be mnasked.
- **Nesting images** to create complex object and animate and manipulate all as one.
- **Text wrap:** Canvate lets wrap the text inside the canvas.
- **Pivot, point of rotation and transformation:** with Canvate, easly set the images' pivot inside the canvas to make transformation like rotation and resize arround a point.

## Usage
Load the canvate.js.
Get a reference of the canvas in your page.<br>
Pass this reference to the Canvate when is instantiated.
```jsx
var myCanvas  = document.getElementById("myCanvasId");
var myCanvate = new Canvate(myCanvas);
```
### What is a Clip?
A Clip its a Canvate object that let manipulate images inside the Canvate.<br>
You can think about the Clip as a container and manager of images and Sprite sheet of the Canvate.<br>
Example of an empty clip.
```jsx
var myCanvas  = document.getElementById("myCanvasId");
var myCanvate = new Canvate(myCanvas);
var clip      = myCanvate.addNewClip();
```
### Loading external image
```jsx
var myCanvas  = document.getElementById("myCanvasId");
var myCanvate = new Canvate(myCanvas);
var clip      = myCanvate.addNewClip();

var onImageLoaded = function(event){
  console.log("Image loaded!!");
}
clip.addEventListener("imageLoaded", onImageLoaded);

clip.loadImage("img/sakura.png");
```
### Capturing image from the page
Get the reference of the img, canvas, or video. Add a clip into the Canvate.<br>
And set the image to the clip when is created.
```jsx
var image     = document.getElementById("MY_IMAGE");

var myCanvas  = document.getElementById("myCanvasId");
var myCanvate = new Canvate(myCanvas);

var clip      = myCanvate.addNewClip(image);
```
At anytime the image of the clip can be set.
```jsx
clip.setImage(image);
```

### Clip visual properties
The list of the visual properties.

| Property | Description |
| ------------- | ------------- |
| **```width```** | Specifies the width of a Clip, in pixels.  |
| **```height```** | Specifies the height of a Clip, in pixels.  |
| **```x```** | Specifies the x position of a Clip, in pixels related to his parent.  |
| **```y```** | Specifies the y position of a Clip, in pixels related to his parent.  |
| **```scaleX```** | Specifies the scale X. Default value is 1. For instance: the half is 0.5, the double is 2.  |
| **```scaleY```** | Specifies the scale Y. Default value is 1. For instance: the half is 0.5, the double is 2.  |
| **```rotation```** | Specifies the angle of rotation in degrees.  |
| **```pivotX```** | A related x point based on the clip width. The rotation and resizing it'll be based arround this point. For instance, 0 is top-left of the clip, 0.5 is the center of the Clip. |
| **```pivotY```** | A related y point based on the clip width. The rotation and resizing it'll be based arround this point. For instance, 0 is top-left of the clip, 0.5 is the center of the Clip. |
| **```alpha```** | Specifies the transparency. Values between 0 and 1.  |
| **```visible```** | Boolean property. If its false, makes the clip invisible and it wont be rendered at all. |
