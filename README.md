
![CANVATE.JS](http://sakuracode.com/img/canvate.svg)<br>
JavaScript library for canvas based interactive animation.
- **Buttons with irregular shapes:** build buttons with irregular shapes with any kind of images for instance png, svg,  or other canvas. Canvate make it easy to build buttons "inside" de canvas.
- **Animate images inside the canvas**  using JQuery, Greensock or your custom code to animate your sprite sheet and images.
- **Masking:** is and easy task with Canvate. Images,other canvas and sprite sheet can be mnasked.
- **Nesting images** to create complex object and animate and manipulate all as one.
- **Text wrap:** Canvate lets wrap the text inside the canvas.
- **Pivot, point of rotation and transformation:** with Canvate, easly set the images' pivot inside the canvas to make transformation like rotation and resize arround a point.

##

### How to start?
Load the canvate.js.
Get a reference of the canvas in your page.<br>
Pass this reference to the Canvate when is instantiated.
```jsx
var myCanvas  = document.getElementById("myCanvasId");
var myCanvate = new Canvate(myCanvas);
```
### What is a Clip?
A Clip its an visual object of used inside the Canvate. The clip acts as button when a Mouse Event is added to it.<br>
It can be used: external images as PNG, JPG, SVG,  sprite sheet or the following HTML elements: img, canvas and video.<br>
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
Get the reference of the img, canvas, or video. Add a **[clip](https://github.com/EiseiKashi/canvate/blob/master/README.md#what-is-a-clip)** into the Canvate.<br>
And set the image to the **[clip](https://github.com/EiseiKashi/canvate/blob/master/README.md#what-is-a-clip)** when is created.
```jsx
var image     = document.getElementById("MY_IMAGE");

var myCanvas  = document.getElementById("myCanvasId");
var myCanvate = new Canvate(myCanvas);

var clip      = myCanvate.addNewClip(image);
```
At anytime the image of the **[clip](https://github.com/EiseiKashi/canvate/blob/master/README.md#what-is-a-clip)** can be set.
```jsx
clip.setImage(image);
```

## Clip properties

### Transformation properties
| Property | Description |
| ------------- | ------------- |
| **``` x ```** | Number in pixels that specifies the **x position** of a [clip](https://github.com/EiseiKashi/canvate/blob/master/README.md#what-is-a-clip), related to his parent.  |
| **``` y ```** | Number in pixels that specifies the **y position** of a [clip](https://github.com/EiseiKashi/canvate/blob/master/README.md#what-is-a-clip), related to his parent.  |
| **``` width ```** | Number in pixels that specifies the **width**.  |
| **``` height ```** | Number in pixels that specifies the **height**.  |
| **``` scaleX ```** | Specifies the **scale X**. Default value is **1**.  Values between 0 and 1 represent values from 0 to 100%.  |
| **``` scaleY ```** | Specifies the **scale Y**. Default value is **1**.  Values between 0 and 1 represent values from 0 to 100%.  |
| **``` rotation ```** | Number that specifies the **angle of rotation in degrees**.  |
| **``` pivotX ```** | A related **x** point based on the clip width. The rotation and resizing it'll be based arround this point. For instance, 0 is top-left of the **[clip](https://github.com/EiseiKashi/canvate/blob/master/README.md#what-is-a-clip)**, 1 is the bottom right of the **[clip](https://github.com/EiseiKashi/canvate/blob/master/README.md#what-is-a-clip)**. |
| **``` pivotY ```** | A related **y** point based on the **[clip](https://github.com/EiseiKashi/canvate/blob/master/README.md#what-is-a-clip)** width. The rotation and resizing it'll be based arround this point. For instance, 0 is top-left of the **[clip](https://github.com/EiseiKashi/canvate/blob/master/README.md#what-is-a-clip)**, 1 is the bottom right of the **[clip](https://github.com/EiseiKashi/canvate/blob/master/README.md#what-is-a-clip)**. |

## Text properties
| Property | Description |
| ------------- | ------------- |
| **``` text ```** | String that sets the **text** for the **[clip](https://github.com/EiseiKashi/canvate/blob/master/README.md#what-is-a-clip)**.|
| **``` interline ```** | Number of the **inteline text**. The default value is: **1.313**.|
| **```fontSize ```** | Number that defines the **fontSize** of the text in pixels. The default value is: **12**.|
| **``` font ```** | String that defines the **font family** of the text.|
| **``` fontColor ```** | String or Number that defines the **text color**.|
| **``` textBaseline ```** | String that defines the **vertical alingment** of the text. The accepted values are:  **```top```** (default value)\|**```bottom```** \| **```middle```**. | 
| **``` textAlign ```** | String that defines the **horizontal alingment** of the text. The accpeted values are: **```start```** (default value) \|**```end```** \| **```center```** \| **```left```** \| **```right```**, the difference between **```start```** and **```left```** is: The **```start```** value does align left when you are using a **LTR** (left to right) browser. In **RTL** browsers, the start value aligns right. And the other way around with **```end```** and **```right```**.| 

### Other properties
| Property | Description |
| ------------- | ------------- |
| **``` name ```** | And String that specifies the **name** of the **[clip](https://github.com/EiseiKashi/canvate/blob/master/README.md#what-is-a-clip)**. By default it takes the read only property: ```id```.|
| **``` alpha ```** | Number that specifies the **transparency**. Values between 0 and 1 represent values from 0 to 100%.  |
| **``` visible ```** | Boolean property. If its ```false```, makes the **[clip](https://github.com/EiseiKashi/canvate/blob/master/README.md#what-is-a-clip)** invisible and it wont be rendered at all. |
| **``` isLoop ```** | Boolean property that specify if the cycle animation like:  **```play ```**or **```playBetween```**, shoud be in loop. |
| **``` background ```** | It sets or returns the color, gradient, or pattern used to fill the **[clip](https://github.com/EiseiKashi/canvate/blob/master/README.md#what-is-a-clip)** **background**. The values could be color\|gradient\|pattern. For more information check please **[```fillStyle```](https://www.w3schools.com/tags/canvas_fillstyle.asp)**. |

## Clip methods
[clip](https://github.com/EiseiKashi/canvate/blob/master/README.md#what-is-a-clip)

### Transformation methods
| Property | Description |
| -------------------------------- | ------------- |
| **``` setPosition(x, y) ```** | Sets the **x and y position** in pixels.  |
| **``` setSize(width, height) ```** | Sets the **width and height** in pixels. The accepted values are Number and the ```String``` **"auto"**|
| **``` setScale(x, y) ```** | Sets the **x and y scale**. Default value is 1 and it represent the 100% of the size. |
| **``` setPivot(x, y) ```** | Sets the **x and y pivot**. This value its a rate based on the width and heihgt of the **[clip](https://github.com/EiseiKashi/canvate/blob/master/README.md#what-is-a-clip)**. For instance **x** and **y** 0 is the top-left, 0.5 is the center, and 1 is the bottom rigth.|
| **``` fitInto(maxWidth, maxHeight, offsetX, offsetY) ```** | Fit the **[clip](https://github.com/EiseiKashi/canvate/blob/master/README.md#what-is-a-clip)** into the defined area from the parameters **```width```** and **```height```** without distortion and center it based on the current position. The parameters **```offsetX```** and **```offsetY```** ar optional, the default values is 0 for both. |
| **``` setAutoWidth() ```** | Sets the **proportional width** of the **[clip](https://github.com/EiseiKashi/canvate/blob/master/README.md#what-is-a-clip)** based on his height.|
| **``` setAutoHeight() ```** | Sets the **proportional height** of the **[clip](https://github.com/EiseiKashi/canvate/blob/master/README.md#what-is-a-clip)** based on his width.|
| **``` crop(x, y, width, height, finalWidth, finalHeight) ```** | Crops the **[clip](https://github.com/EiseiKashi/canvate/blob/master/README.md#what-is-a-clip)** using the parameters **```x```**, **```y```**,**```width```** and **```height```**. The parameters **```finalWidth```** and **```finalWidth```** are optional in order to set another size. |
 **``` setViewPort(width, height) ```** | Sets the **view port** of the **[clip](https://github.com/EiseiKashi/canvate/blob/master/README.md#what-is-a-clip)** in pixels. All the children outside the **view port** wont be rendered.The **view port** doesnt affect the **width** and **height** of the **[clip](https://github.com/EiseiKashi/canvate/blob/master/README.md#what-is-a-clip)**.|
| **``` getViewPortX() ```** | Gets the **view Port X**, if the view port wasnt set, returns **```null```**.|
| **``` getViewPortY() ```** | Gets the **view Port Y**, if the view port wasnt set, returns **```null```**.|
| **``` removeViewPort() ```** | Remove the set **view port**.|

### Image methods
| Property | Description |
| -------------------------------- | ------------- |
| **``` setImage(image) ```** | Sets the **image** of the clip. It can be used: external images as PNG, JPG, SVG,  sprite sheet or the following HTML elements: **img**, **canvas** and **video**.|
| **``` loadImage(url, isAntiCache) ```** | Loads an external image as **PNG**, **JPG**, etc, inside the **[clip](https://github.com/EiseiKashi/canvate/blob/master/README.md#what-is-a-clip)**. The parameters **```isAntiCache```** is optional to avoid the cache, the default value is false.|
| **``` setMask(clip) ```** | Sets a **[clip](https://github.com/EiseiKashi/canvate/blob/master/README.md#what-is-a-clip)** as a mask.|
| **``` removeMask() ```** | Removes a **[clip](https://github.com/EiseiKashi/canvate/blob/master/README.md#what-is-a-clip)** as a mask.|
| **``` isMask() ```** | Gets true if the **[clip](https://github.com/EiseiKashi/canvate/blob/master/README.md#what-is-a-clip)** is **mask** and false if not.|
| **``` setBackground(fillStyle)```** | Sets the **[clip](https://github.com/EiseiKashi/canvate/blob/master/README.md#what-is-a-clip)**'s**bakcgfround**. Please see the **[```backround```](https://github.com/EiseiKashi/canvate/blob/master/README.md#other-properties)** property. |
| **``` setRect(width, height, color) ```** | Sets a **rectangle** with the **```width```** and **```height```**, size in pixels. The **```color```** parameter is optional, the default value is: **"black"** |

### Text methods
| Property | Description |
| -------------------------------- | ------------- |
| **``` setText(text, size, font, color) ```** | Sets the **text**. The optional parameters are: **```size```**, **```font```** and **```color```**. Please check the **[text properties](https://github.com/EiseiKashi/canvate/blob/master/README.md#text-properties)** property.|

### Children methods
| Property | Description |
| -------------------------------- | ------------- |
| **``` getId() ```** | Returns the **[clip](https://github.com/EiseiKashi/canvate/blob/master/README.md#what-is-a-clip)**'s **id**.|
| **``` addNewClip（image） ```** | Creates and add a **[clip](https://github.com/EiseiKashi/canvate/blob/master/README.md#what-is-a-clip)**．The **```image```** parameter is optional. Please see the method **```setImage```**. IIf the image parameter is null, an empty Clip is created. |
| **``` getNewClip（image） ```** | Creates and return a **[clip](https://github.com/EiseiKashi/canvate/blob/master/README.md#what-is-a-clip)** without adding it．The **```image```** parameter is optional. Please see the method **```setImage```**. IIf the image parameter is null, an empty Clip is created.|
| **``` getClipAt(depth) ```** | Gets a **[clip](https://github.com/EiseiKashi/canvate/blob/master/README.md#what-is-a-clip)** at the specific depth, countinf from 0. |
| **``` addClip(clip) ```** | Adds the specific [clip](https://github.com/EiseiKashi/canvate/blob/master/README.md#what-is-a-clip). |
| **``` addClipAt(clip, depth) ```** | Adds the specific **[clip](https://github.com/EiseiKashi/canvate/blob/master/README.md#what-is-a-clip)** at specific **depth**. |
| **``` removeClip(clip) ```** | Removes the specific **[clip](https://github.com/EiseiKashi/canvate/blob/master/README.md#what-is-a-clip)**. |
| **``` removeClipAt(depth) ```** | Removes a **[clip](https://github.com/EiseiKashi/canvate/blob/master/README.md#what-is-a-clip)** at the specific **```depth```**. |
| **``` removeAllClips() ```** | Removes all **[clip](https://github.com/EiseiKashi/canvate/blob/master/README.md#what-is-a-clip)**. |
| **``` getTotalClip()  ```** | Returns the amount of **[clip](https://github.com/EiseiKashi/canvate/blob/master/README.md#what-is-a-clip)**. |
| **``` setDepth(clip, depth) ```** | Sets the depth of the specific **[clip](https://github.com/EiseiKashi/canvate/blob/master/README.md#what-is-a-clip)**. |
| **``` swapClips(clip1, clip2) ```** | Interchange the depth of two **[clip](https://github.com/EiseiKashi/canvate/blob/master/README.md#what-is-a-clip)**. |
| **``` toFront(clip) ```** | Bring the **[clip](https://github.com/EiseiKashi/canvate/blob/master/README.md#what-is-a-clip)** to front (the highest depth). |
| **``` toBack(clip) ```** | Bring the **[clip](https://github.com/EiseiKashi/canvate/blob/master/README.md#what-is-a-clip)** to back (the lowest depth). |
| **``` getParent() ```** | Returns the **[clip](https://github.com/EiseiKashi/canvate/blob/master/README.md#what-is-a-clip)**'s **parent**.|

### Sprite sheet methods
| Property | Description |
| -------------------------------- | ------------- |
| **``` getTotalFrames() ```** | Returns the **[clip](https://github.com/EiseiKashi/canvate/blob/master/README.md#what-is-a-clip)**'s **total frames**.|
| **``` getCurrentFrame() ```** | Returns the **[clip](https://github.com/EiseiKashi/canvate/blob/master/README.md#what-is-a-clip)**'s **total frames**.|
| **``` setFrameRate() ```** | Sets the **[clip](https://github.com/EiseiKashi/canvate/blob/master/README.md#what-is-a-clip)**'s **frame rate**.|
| **``` getFrameRate() ```** | Gets the **[clip](https://github.com/EiseiKashi/canvate/blob/master/README.md#what-is-a-clip)**'s **frame rate**.|
| **``` setCycle(x, y, width, height, totalFrames, gapX, gapY) ```** | Lets work with a **sprite sheet**. Use the **```x```** and **```y```** to specify from where the cycle must be set. The **```width```** and **```height```** parameters indicates the **tile** size. The **```totalFrames```** parameter is optional, if no parameter is given it will use the maximun **tile** posible based on the size of the **image**. Use optional parameter **```gapX```** and **```gapY```** to specify e gap between **tiles**. After the **cycle** is set it can be used the frames method, for instance: ```play```, ```stop```, ```playBetween```, etc.|
| **``` play() ```** | Plays the cycle.|
| **``` playFrom(frame) ```** | Plays the cycle from specific frame, counting from 1.|
| **``` playUntil(frame) ```** | Plays the cycle until specific **frame**, counting from 1. **If the frame is less than the currentFrame, it plays backwards**|
| **``` playBetween(fromFrame, untilFrame) ```** | Plays the cycle between specific **frame**. **If the ```fromFrame``` is less than the ```untilFrame```, it plays backwards**|
| **``` stop() ```** | Stops the cycle.|
| **``` stopAt(frame) ```** | Stops the cycle at the specific **frame** counting from 1.|
| **``` nextFrame() ```** | Stops at the **next frame**.|
| **``` prevFrame() ```** | Stops at the **prev frame**.|

### Event methods
| Property | Description |
| -------------------------------- | ------------- |
| **``` hasButton() ```** | Gets true if the **[clip](https://github.com/EiseiKashi/canvate/blob/master/README.md#what-is-a-clip)** has listening to any **mouse event** and false if not.|
| **``` addEventListener(type, listener, context) ```** | Adds a ```listener``` to a specific event ```type```. The parameter ```context``` is optional, the listener can be called in a specific context.|
| **``` removeEventListener(type, listener, context) ```** | Removes a ```listener``` to a specific event ```type```. To remove a listener that was added with a specific ```context```, use it to remove the listener.|
