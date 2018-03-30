
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

### Clip transformation
The properties that can be changed are:
| Property | Description |
| --- | --- |
| `width` | List all *new or modified* files |
| `height` | Show file differences that **haven't been** staged |
