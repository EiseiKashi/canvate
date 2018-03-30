
![CANVATE.JS](http://sakuracode.com/img/Ryu-github.svg)<br>
A Javascript library for multiple interactive Images and Sprite Sheet, using only one canvas.
- **Buttons with irregular shapes:** build buttons with irregular shapes with any kind of images for instance png, svg,  or other canvas. Canvate make it easy to build buttons "inside" de canvas.
- **Animate images inside the canvas**  using JQuery, Greensock or your custom code to animate your sprite sheet and images.
- **Masking:** is and easy task with Canvate. Images,other canvas and sprite sheet can be mnasked.
- **Nesting images** to create complex object and animate and manipulate all as one.
- **Text wrap:** Canvate lets wrap the text inside the canvas.
- **Pivot, point of rotation and transformation:** with Canvate, easly set the images' pivot inside the canvas to make transformation like rotation and resize arround a point.

## Usage
Load the canvate-v0-0-1.js
Get a reference of the canvas in your page and create the Canvate.

```jsx
var myCanvas  = document.getElementById("myCanvasId");
var myCanvate = new Canvate(myCanvas);
```

### Loading external image
A clip can be an image like png, svg, canvas or video.
Add new clip to the canvas.
```jsx
var clip = myCanvate.addNewClip();
```
Add event handler and load the image
```jsx
var onImageLoaded = function(event){
  console.log("Image loaded!!");
}
var clip.addEventListener(canvatte.IMAGE_LOADED, onImageLoaded);
```

### Capturing image from the page
Get the reference of the img, canvas, or video and add a clip into the Canvate.
```jsx
var image = document.getElementById("MY_IMAGE");
var clip  = myCanvate.addNewClip();
```
Set the image to the clip.
```jsx
clip.setImage(image);
```
