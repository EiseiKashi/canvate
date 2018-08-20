![CANVATE.JS](http://sakuracode.com/img/ryu-github-2.svg)<br>
Canvate is a JavaScript library that provides straight forward solutions for working with rich graphics and interactivity with HTML5 canvas easily.

- **Buttons with irregular shapes:** build buttons with irregular shapes with any kind of images for instance png, svg,  or other HTML5 canvas. Canvate make it easy to build buttons "inside" de HTML5 canvas.
- **Animate images inside the canvas**  using JQuery, Greensock or your custom code to animate your sprite sheet and images.
- **Masking:** is and easy task with Canvate. Images,other canvas and sprite sheet can be mnasked.
- **Nesting images** to create complex object and animate and manipulate all as one.
- **Text wrap:** Canvate lets wrap the text inside the canvas.
- **Pivot, point of rotation and transformation:** with Canvate, easly set the images' pivot inside the canvas to make transformation like rotation and resize arround a point.

##

### How to start?
Load the canvate.js.
Get a reference of the canvas or the canvas id in your page.<br>
Pass this reference to the Canvate when is instantiated.
```jsx
var myCanvate = new Canvate("myCanvasId");
```
### How it works?
Many images or text can be added inside the Canvate. The added images or text acts as button when a Mouse Event is added to it.<br>
It can be used: external images as PNG, JPG, SVG,  sprite sheet or the following HTML elements: img, canvas and video.<br>
Inside an image can be added more images to manipulate all as one or for the construction of complex images and animation.<br>

### Loading external image
```jsx
var myCanvate = new Canvate("myCanvasId");
var clip      = myCanvate.addNewByURL("img/sakura.png");

// The listener can be added after the loading statement.
    clip.addEventListener("imageLoaded", onImageLoaded);

var onImageLoaded = function(event){
  console.log("Image loaded!!");
}
```
### Capturing image from the page
Add img, canvas, or video into the Canvate.<br>
```jsx
var myCanvate = new Canvate("myCanvasId");

var image = document.getElementById("MY_IMAGE");
var myCanvateImage = myCanvate.addNew(image);

```

## Properties

### Transformation properties
| Property | Description |
| ------------- | ------------- |
| **``` x ```** | Number in pixels that specifies the **x position** of an image, related to his parent.  |
| **``` y ```** | Number in pixels that specifies the **y position** of a image, related to his parent.  |
| **``` width ```** | Number in pixels that specifies the **width**.  |
| **``` height ```** | Number in pixels that specifies the **height**.  |
| **``` scaleX ```** | Specifies the **scale X**. Default value is **1**.  Values between 0 and 1 represent values from 0 to 100%.  |
| **``` scaleY ```** | Specifies the **scale Y**. Default value is **1**.  Values between 0 and 1 represent values from 0 to 100%.  |
| **``` rotation ```** | Number that specifies the **angle of rotation in degrees**.  |
| **``` pivotX ```** | A related **x** point based on the image width. The rotation and resizing it'll be based arround this point. For instance, 0 is top-left, 1 is the bottom right. |
| **``` pivotY ```** | A related **y** point based on the image width. The rotation and resizing it'll be based arround this point. For instance, 0 is top-left, 1 is the bottom right.  |

## Text properties
| Property | Description |
| ------------- | ------------- |
| **``` text ```** | String that sets the **text** for the  image.|
| **``` interline ```** | Number of the **inteline text**. The default value is: **1.313**.|
| **```fontSize ```** | Number that defines the **fontSize** of the text in pixels. The default value is: **12**.|
| **``` font ```** | String that defines the **font family** of the text.|
| **``` fontColor ```** | String or Number that defines the **text color**.|
| **``` textAlign ```** | String that defines the **horizontal alingment** of the text. The accpeted values are: **```start```** (default value) \|**```end```** \| **```center```** \| **```left```** \| **```right```**, the difference between **```start```** and **```left```** is: The **```start```** value does align left when you are using a **LTR** (left to right) browser. In **RTL** browsers, the start value aligns right. And the other way around with **```end```** and **```right```**.| 

### Other properties
| Property | Description |
| ------------- | ------------- |
| **``` name ```** | And String that specifies the **name** of the iamge. By default it takes the read only property: ```id```.|
| **``` alpha ```** | Number that specifies the **transparency**. Values between 0 and 1 represent values from 0 to 100%.  |
| **``` visible ```** | Boolean property. If its ```false```, makes the invisible invisible and it wont be rendered at all. |
| **``` isLoop ```** | Boolean property that specify if the cycle animation like:  **```play ```**or **```playBetween```**, shoud be in loop. |
| **``` background ```** | It sets or returns the color, gradient, or pattern used to fill the image **background**. The values could be color\|gradient\|pattern. For more information check please **[```fillStyle```](https://www.w3schools.com/tags/canvas_fillstyle.asp)**. |

## Methods

### Transformation methods
| Property | Description |
| -------------------------------- | ------------- |
| **``` setPosition(x, y) ```** | Sets the **x and y position** in pixels.  |
| **``` setSize(width, height) ```** | Sets the **width and height** in pixels. The accepted values are Number and the ```String``` **"auto"**|
| **``` setScale(x, y) ```** | Sets the **x and y scale**. Default value is 1 and it represent the 100% of the size. |
| **``` setPivot(x, y) ```** | Sets the **x and y pivot**. This value its a rate based on the width and heihgt of the image. For instance **x** and **y** 0 is the top-left, 0.5 is the center, and 1 is the bottom rigth.|
| **``` fitInto(maxWidth, maxHeight, offsetX, offsetY) ```** | Fit the image into the defined area from the parameters **```width```** and **```height```** without distortion and center it based on the current position. The parameters **```offsetX```** and **```offsetY```** ar optional, the default values is 0 for both. |
| **``` setAutoWidth() ```** | Sets the **proportional width** of the image based on his height.|
| **``` setAutoHeight() ```** | Sets the **proportional height** of the image based on his width.|
| **``` crop(x, y, width, height, finalWidth, finalHeight) ```** | Crops the image using the parameters **```x```**, **```y```**,**```width```** and **```height```**. The parameters **```finalWidth```** and **```finalWidth```** are optional in order to set another size. |
| **``` setViewPort(width, height) ```** | Sets the **view port** of the image in pixels. All the children outside the **view port** wont be rendered.The **view port** doesnt affect the **width** and **height** of the image.|
| **``` getViewPortWidth() ```** | Gets the **view Port width**, if the view port wasnt set, returns **```null```**.|
| **``` getViewPortHeight() ```** | Gets the **view Port height**, if the view port wasnt set, returns **```null```**.|
| **``` removeViewPort() ```** | Make all the clip visible without the view port set before.|

### Image methods
| Property | Description |
| -------------------------------- | ------------- |
| **``` setImage(image) ```** | Sets the **image** of the image. It can be used: external images as PNG, JPG, SVG,  sprite sheet or the following HTML elements: **img**, **canvas** and **video**.|
| **``` setImageById(id) ```** | Sets the **image** of the image using the ```id``` of the following HTML elements: **img**, **canvas** and **video**.|
| **``` loadImage(src, isAntiCache) ```** | Loads an external image as **PNG**, **JPG**, etc, inside the image. The parameters **```isAntiCache```** is optional to avoid the cache, the default value is false.|
| **``` setMask() ```** | Sets a image as a mask.|
| **``` removeMask() ```** | Removes the mask.|
| **``` isMask() ```** | Returns a Boolean if is a mask.|
| **``` setBackground(fillStyle)```** | Sets the image's**bakcgfround**. Please see the **[```backround```](https://github.com/EiseiKashi/canvate/blob/master/README.md#other-properties)** property. |
| **``` setRect(width, height, color) ```** | Sets a **rectangle** with the **```width```** and **```height```**, size in pixels. The **```color```** parameter is optional, the default value is: **"black"** |

### Text methods
| Property | Description |
| -------------------------------- | ------------- |
| **``` setText(text, size, font, color, textAlign, width, height, interline) ```** | Sets the **text**. The optional parameters are: **```size```**, **```font```**, **```color```**, **```textAlign```**, **```width```**, **```height```**, **```interline```**. Please check the **[text properties](https://github.com/EiseiKashi/canvate/blob/master/README.md#text-properties)** property.|
| **``` textToImage() ```** | Converts the **text** and can not be editable.|
| **``` getTextWidth() ```** | gets the text width.|
| **``` getTextHeight ```** | gets the text height.|
| **``` fitToText ```** | Set the width and height of the image to the text.|


### Children methods
| Property | Description |
| -------------------------------- | ------------- |
| **``` getId() ```** | Returns the image's **id**.|
| **``` addNew（image） ```** | Creates and add a image．The **```image```** parameter is optional. Please see the method **```setImage```**. If the image parameter is null, an empty image is created. |
| **``` addNewById（id） ```** | Creates and add an image from img, video or canvas using it id. |
| **``` addNewByURL（id） ```** | Creates and add an image from URL, it can be a JPG, SVG or PNG. |
| **``` getAt(depth) ```** | Gets a image at the specific depth, countinf from 0. |
| **``` add(image) ```** | Adds the image reference. |
| **``` addAt(image, depth) ```** | Adds the specific image at specific **depth**. |
| **``` remove(image) ```** | Removes the specific image. |
| **``` removeAt(depth) ```** | Removes a image at the specific **```depth```**. |
| **``` removeAll() ```** | Removes all image. |
| **``` getTotal()  ```** | Returns the amount of image. |
| **``` setDepth(clip, depth) ```** | Sets the depth of the specific image. |
| **``` swap(canvate, canvate) ```** | Interchange the depth of two image. |
| **``` toFront() ```** | Bring the image to front (the highest depth). |
| **``` toBack() ```** | Bring the image to back (the lowest depth). |
| **``` getParent() ```** | Returns the image's **parent**.|

### Sprite sheet methods
| Property | Description |
| -------------------------------- | ------------- |
| **``` getTotalFrames() ```** | Returns the image's **total frames**.|
| **``` getCurrentFrame() ```** | Returns the image's **total frames**.|
| **``` setFrameRate() ```** | Sets the image's **frame rate**.|
| **``` getFrameRate() ```** | Gets the image's **frame rate**.|
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
| **``` hasButton() ```** | Gets true if the image has listening to any **mouse event** and false if not.|
| **``` addEventListener(type, listener, context) ```** | Adds a ```listener``` to a specific event ```type```. The parameter ```context``` is optional, the listener can be called in a specific context.|
| **``` removeEventListener(type, listener, context) ```** | Removes a ```listener``` to a specific event ```type```. To remove a listener that was added with a specific ```context```, use it to remove the listener.|

### Events
All the Event object has the properties: 
**```type```**: name of the Event.
**```target```**: the emiter of the Event.

| Property | Description |
| -------------------------------- | ------------- |
| **"imageSet"** | This event is trigger when an image is set. The event has the property ```image```, the reference to the imageset.|
| **"imageLoaded"** | This event is trigger when an image is loaded by the method ```loadImage```. The event has the property ```image```, the reference to the image and the source in the property ```src```.|
| **"imageError"** | This event is trigger when an image it can not be loaded by ```loadImage```. Ths event has the property ```src```.|
| **"clipAdded"** | This event is trigger when a image is added inside another one. The event has the property ```parent```.|
| **"clipRemoved"** | This event is trigger when a image is removed from another one. The event has the property ```parent```.|
| **"cycleStart"** | This event is trigger when a cycle starts. The event has the prorperties: ```currentFrame``` and ```cycle```, that has the name of the cycle. The possible cycles are: ```play```, ```playFrom```, ```playUntil```, ```playBetween```, ```stop```, ```stopAt```, ```nextFrame``` and ```prevFrame```.|
| **"cycleEnd"** | This event is trigger when a cycle ends. The event has the prorperties: ```currentFrame``` and ```cycle```, that has the name of the cycle. The possible cycles are: ```play```, ```playFrom```, ```playUntil```, ```playBetween```, ```stop```, ```stopAt```, ```nextFrame``` and ```prevFrame```.|
| **"render"** | This event is trigger when a image was rendered.|
