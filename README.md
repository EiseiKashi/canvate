
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
A Clip its an visual object of used inside the Canvate. The clip acts as button when a Mouse Event is added to it.<br>
It could be used: external images,  sprite sheet or the following HTML elements: img, canvas and video.<br>
Inside the clip it can be added more clip to manipulate all as one or for the construction of complex images and animation.<br>
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
Get the reference of the img, canvas, or video. Add a [clip](https://github.com/EiseiKashi/canvate/blob/master/README.md#what-is-a-clip) into the Canvate.<br>
And set the image to the [clip](https://github.com/EiseiKashi/canvate/blob/master/README.md#what-is-a-clip) when is created.
```jsx
var image     = document.getElementById("MY_IMAGE");

var myCanvas  = document.getElementById("myCanvasId");
var myCanvate = new Canvate(myCanvas);

var clip      = myCanvate.addNewClip(image);
```
At anytime the image of the [clip](https://github.com/EiseiKashi/canvate/blob/master/README.md#what-is-a-clip) can be set.
```jsx
clip.setImage(image);
```

### Clip properties

| Property | Description |
| ------------- | ------------- |
| **``` name ```** | And String that specifies the name of the [clip](https://github.com/EiseiKashi/canvate/blob/master/README.md#what-is-a-clip). By default it takes the read only property: ```id```|
| **``` width ```** | Number in pixels that specifies the width.  |
| **``` height ```** | Number in pixels that specifies the height.  |
| **``` x ```** | Number in pixels that specifies the x position of a [clip](https://github.com/EiseiKashi/canvate/blob/master/README.md#what-is-a-clip), related to his parent.  |
| **``` y ```** | Number in pixels that specifies the y position of a [clip](https://github.com/EiseiKashi/canvate/blob/master/README.md#what-is-a-clip), related to his parent.  |
| **``` scaleX ```** | Specifies the scale X. Default value is 1.  Values between 0 and 1 represent values from 0 to 100%.  |
| **``` scaleY ```** | Specifies the scale Y. Default value is 1.  Values between 0 and 1 represent values from 0 to 100%.  |
| **``` rotation ```** | Number that specifies the angle of rotation in degrees.  |
| **``` pivotX ```** | A related x point based on the clip width. The rotation and resizing it'll be based arround this point. For instance, 0 is top-left of the [clip](https://github.com/EiseiKashi/canvate/blob/master/README.md#what-is-a-clip), 1 is the bottom right of the [clip](https://github.com/EiseiKashi/canvate/blob/master/README.md#what-is-a-clip). |
| **``` pivotY ```** | A related y point based on the [clip](https://github.com/EiseiKashi/canvate/blob/master/README.md#what-is-a-clip) width. The rotation and resizing it'll be based arround this point. For instance, 0 is top-left of the [clip](https://github.com/EiseiKashi/canvate/blob/master/README.md#what-is-a-clip), 1 is the bottom right of the [clip](https://github.com/EiseiKashi/canvate/blob/master/README.md#what-is-a-clip). |
| **``` alpha ```** | Number that specifies the transparency. Values between 0 and 1 represent values from 0 to 100%.  |
| **``` visible ```** | Boolean property. If its false, makes the [clip](https://github.com/EiseiKashi/canvate/blob/master/README.md#what-is-a-clip) invisible and it wont be rendered at all. |
| **``` isLoop ```** | Boolean property that specify if the cycle animation like:  ```play ```or ```playBetween```, shoud be in loop. |
| **`` background ```** | It sets or returns the color, gradient, or pattern used to fill the [clip](https://github.com/EiseiKashi/canvate/blob/master/README.md#what-is-a-clip). The values could be color\|gradient\|pattern. For more information check please [fillStyle](https://www.w3schools.com/tags/canvas_fillstyle.asp) |
| **``` text ```** | String that sets the text fort the [clip](https://github.com/EiseiKashi/canvate/blob/master/README.md#what-is-a-clip).|
| **``` interline ```** | Number if the inteline text. The default value is: 1.313|
| **```fontSize ```** | Number that defines the fontSize of the text in pixels. The default value is: 12|
| **``` font ```** | String that defines the font family of the text|
| **``` fontColor ```** | String or Number that defines the text color|
| **``` textBaseline ```** | String that defines the vertical alingment of the text. The accepted values are:  ```top``` (default value)\|```bottom``` \| ```middle``` | 
| **``` textAlign ```** | String that defines the horizontal alingment of the text. The accpeted values are: ```start``` (default value)\|```end``` \| ```center``` \| ```left``` \| ```right```\, the difference between ```start``` and ```left``` is: The ```start``` value does align left when you are using a LTR (left to right) browser. In RTL browsers, the start value aligns right. And the other way around with ```end``` and ```right```| 
