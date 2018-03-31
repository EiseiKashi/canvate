
![CANVATE.JS](http://sakuracode.com/img/Ryu-github.svg)<br>
A Javascript library for multiple interactive Images and Sprite Sheet, using only one canvas.
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

## Clip properties

### Transformation properties
| Property | Description |
| ------------- | ------------- |
| **``` width ```** | Number in pixels that specifies the **width**.  |
| **``` height ```** | Number in pixels that specifies the **height**.  |
| **``` x ```** | Number in pixels that specifies the **x position** of a [clip](https://github.com/EiseiKashi/canvate/blob/master/README.md#what-is-a-clip), related to his parent.  |
| **``` y ```** | Number in pixels that specifies the **y position** of a [clip](https://github.com/EiseiKashi/canvate/blob/master/README.md#what-is-a-clip), related to his parent.  |
| **``` scaleX ```** | Specifies the **scale X**. Default value is **1**.  Values between 0 and 1 represent values from 0 to 100%.  |
| **``` scaleY ```** | Specifies the **scale Y**. Default value is **1**.  Values between 0 and 1 represent values from 0 to 100%.  |
| **``` rotation ```** | Number that specifies the **angle of rotation in degrees**.  |
| **``` pivotX ```** | A related **x** point based on the clip width. The rotation and resizing it'll be based arround this point. For instance, 0 is top-left of the [clip](https://github.com/EiseiKashi/canvate/blob/master/README.md#what-is-a-clip), 1 is the bottom right of the [clip](https://github.com/EiseiKashi/canvate/blob/master/README.md#what-is-a-clip). |
| **``` pivotY ```** | A related **y** point based on the [clip](https://github.com/EiseiKashi/canvate/blob/master/README.md#what-is-a-clip) width. The rotation and resizing it'll be based arround this point. For instance, 0 is top-left of the [clip](https://github.com/EiseiKashi/canvate/blob/master/README.md#what-is-a-clip), 1 is the bottom right of the [clip](https://github.com/EiseiKashi/canvate/blob/master/README.md#what-is-a-clip). |

## Text properties
| Property | Description |
| ------------- | ------------- |
| **``` text ```** | String that sets the **text** for the [clip](https://github.com/EiseiKashi/canvate/blob/master/README.md#what-is-a-clip).|
| **``` interline ```** | Number of the **inteline text**. The default value is: **1.313**.|
| **```fontSize ```** | Number that defines the **fontSize** of the text in pixels. The default value is: **12**.|
| **``` font ```** | String that defines the **font family** of the text.|
| **``` fontColor ```** | String or Number that defines the **text color**.|
| **``` textBaseline ```** | String that defines the **vertical alingment** of the text. The accepted values are:  ```top``` (default value)\|```bottom``` \| ```middle```. | 
| **``` textAlign ```** | String that defines the **horizontal alingment** of the text. The accpeted values are: ```start``` (default value)\|```end``` \| ```center``` \| ```left``` \| ```right```\, the difference between ```start``` and ```left``` is: The ```start``` value does align left when you are using a LTR (left to right) browser. In RTL browsers, the start value aligns right. And the other way around with ```end``` and ```right```.| 

### Other properties
| Property | Description |
| ------------- | ------------- |
| **``` name ```** | And String that specifies the **name** of the [clip](https://github.com/EiseiKashi/canvate/blob/master/README.md#what-is-a-clip). By default it takes the read only property: ```id```.|
| **``` alpha ```** | Number that specifies the **transparency**. Values between 0 and 1 represent values from 0 to 100%.  |
| **``` visible ```** | Boolean property. If its ```false```, makes the [clip](https://github.com/EiseiKashi/canvate/blob/master/README.md#what-is-a-clip) invisible and it wont be rendered at all. |
| **``` isLoop ```** | Boolean property that specify if the cycle animation like:  **```play ```**or **```playBetween```**, shoud be in loop. |
| **``` background ```** | It sets or returns the color, gradient, or pattern used to fill the [clip](https://github.com/EiseiKashi/canvate/blob/master/README.md#what-is-a-clip) **background**. The values could be color\|gradient\|pattern. For more information check please [fillStyle](https://www.w3schools.com/tags/canvas_fillstyle.asp). |

## Clip methods
[clip](https://github.com/EiseiKashi/canvate/blob/master/README.md#what-is-a-clip)

### General methods
| Property | Description |
| -------------------------------- | ------------- |
| **``` getId() ```** | Returns the [clip](https://github.com/EiseiKashi/canvate/blob/master/README.md#what-is-a-clip)'s **id**.|
| **``` getParent() ```** | Returns the [clip](https://github.com/EiseiKashi/canvate/blob/master/README.md#what-is-a-clip)'s **parent**.|
| **``` isMask() ```** | Gets true if the [clip](https://github.com/EiseiKashi/canvate/blob/master/README.md#what-is-a-clip) is **mask** and false if not.|
| **``` hasButton() ```** | Gets true if the [clip](https://github.com/EiseiKashi/canvate/blob/master/README.md#what-is-a-clip) has listening to any **mouse event** and false if not.|

### Frame methods
| Property | Description |
| -------------------------------- | ------------- |
| **``` getTotalFrames() ```** | Returns the [clip](https://github.com/EiseiKashi/canvate/blob/master/README.md#what-is-a-clip)'s **total frames**.|
| **``` getCurrentFrame() ```** | Returns the [clip](https://github.com/EiseiKashi/canvate/blob/master/README.md#what-is-a-clip)'s **total frames**.|
| **``` setFrameRate() ```** | Sets the [clip](https://github.com/EiseiKashi/canvate/blob/master/README.md#what-is-a-clip)'s **frame rate**.|
| **``` getFrameRate() ```** | Gets the [clip](https://github.com/EiseiKashi/canvate/blob/master/README.md#what-is-a-clip)'s **frame rate**.|
| **``` setCycle(x, y, width, height, totalFrames, gapX, gapY) ```** | Lets work with a **sprite sheet**. Use the **```x```** and **```y```** to specify from where the cycle must be set. The **```width```** and **```height```** parameters indicates the **tile** size. The **```totalFrames```** parameter is optional, if no parameter is given it will use the maximun **tile** posible based on the size of the **image**. Use optional parameter **```gapX```** and **```gapY```** to specify e gap between **tiles**. After the **cycle** is set it can be used the frames method, for instance: ```play```, ```stop```, ```playBetween```, etc.|

### Transformation methods
| Property | Description |
| -------------------------------- | ------------- |
| **``` setPivotXY(x, y) ```** | Sets the **x and y pivot**. |
| **``` setPivot (pivot) ```** | Sets the same value for **x and y pivot**. |
| **``` setScaleXY(x, y) ```** | Sets the **x and y scale**. |
| **``` setScale(scale) ```** | Sets the same value for **x and y scale**. |
| **``` setPositionXY(x, y) ```** | Sets the **x and y position** in pixels.  |
| **``` setPositionXY(position) ```** | Sets the same value for **x and y position** in pixels.  |
| **``` setSize(width, height) ```** | Sets the **width and height** in pixels. The accepted values are Number and the ```String``` **"auto"**|
| **``` setSize(width, height) ```** | Sets the **width and height** in pixels. The accepted values are Number and the ```String``` **"auto"**|
| **``` setAutoWidth() ```** | Sets the **proportional width** of the [clip](https://github.com/EiseiKashi/canvate/blob/master/README.md#what-is-a-clip) based on his height.|
| **``` setAutoHeight() ```** | Sets the **proportional height** of the [clip](https://github.com/EiseiKashi/canvate/blob/master/README.md#what-is-a-clip) based on his width.|

### Image methods
| Property | Description |
| -------------------------------- | ------------- |
| **``` removeViewPort() ```** | Remove the set **view port**.|
| **``` fitInto(maxWidth, maxHeight, offsetX, offsetY) ```** | Fit the [clip](https://github.com/EiseiKashi/canvate/blob/master/README.md#what-is-a-clip) into the defined area from the parameters **```width```** and **```height```** without distortion and center it based on the current position. The parameters **```offsetX```** and **```offsetY```** ar optional, the default values is 0 for both. |
| **``` setImage(image, width, height) ```** | Sets the **image** of the clip. The **```width```** and **```height```** are optional, the default value is the **image size**.|

### other methods
| Property | Description |
| -------------------------------- | ------------- |


        // Sets the background
        this.setBackground = function(fillStyle){
            this.background = fillStyle;
        }
        
        // Sets the text
        this.setText = function(text, size, font, color){
            this.text      = text;
            this.fontSize  = null == size  ? this.fontSize  : 12;
            this.font      = null == font  ? this.font      : font;
            this.fontColor = null == color ? this.fontColor : color;
            emit(_self.TEXT_SET, {text:this.text});
        }
        
        //Sets the rect
        this.setRect = function(width, height, color){
            if(null == width || null == height || isNaN(width) || isNaN(height)){
                return;
            }
            
            _self.width   = null;
            _self.height  = null;
            _cropWidth    = null;
            _cropHeight   = null;
            
            var canvas            = document.createElement("canvas");
                canvas.width      = width;
                canvas.height     = height;
           
            var context           = canvas.getContext("2d");
                context.fillStyle = color;
                context.fillRect(0,0,width,height);
            
            var img = document.createElement("img");
                img.src = canvas.toDataURL('image/png');
                img.crossOrigin = "Anonymous";
            
            this.setImage(canvas);
        }
        
        // IMAGE
        //Load image from URL
        this.loadImage = function(url, width, height){
            _canvas = null;
            _initialWidth   = null;
            _initialHeight  = null;
            
            var image        = new Image();
                image.onload = function() {
                    _self.setImage(image, width, height);
                    emit(_self.IMAGE_LOADED, {image:image})
                }
                
                image.onerror = function(event){
                    emit(_self.IMAGE_ERROR, {url:url})
                }
                
                image.src = url + '?' + new Date().getTime();
                image.crossOrigin = "Anonymous";
        }
        
        //Crop
        this.crop = function(x, y, width, height, finalWidth, finalHeight){
            var x         = null == x      ? _cropX      : x;
            var y         = null == y      ? _cropY      : y;
            var width     = null == width  ? _cropWidth  : width;
            var height    = null == height ? _cropHeight : height;
            
            _self.width   = null;
            _self.height  = null;
            _cropWidth    = null;
            _cropHeight   = null;
            
            var canvas        = document.createElement("canvas");
                canvas.width  = width;
                canvas.height = height;
           
            finalWidth  = null == finalWidth  || isNaN(finalWidth)  ? width  : finalWidth;
            finalHeight = null == finalHeight || isNaN(finalHeight) ? height : finalHeight; 
            
            var context = canvas.getContext("2d");
                context.drawImage(_image, x, y, width, height, 0, 0, finalWidth, finalHeight);
            
            
            var img               = document.createElement("img");
                img.src           = canvas.toDataURL('image/png');
                img.crossOrigin   = "Anonymous";
            
            this.setImage(canvas);
        }
        
        //CHILDREN
        // Get new Clip
        this.getNewClip = function(image){
            return new Clip(image);
        }
        
        // Add new Clip
        this.addNewClip = function(image){
            var clip = new Clip(image);
            this.addClip(clip);
            return clip;
        }
        
        // Get the Clip by depth
        this.getClipAt = function(index){
            return _clipList[index];
        }
        
        // Add clip
        this.addClip = function(clip){
            if(null == clip || clip == this){
                // Early return
                return;
            }
            
            this.addClipAt(clip, _clipList.length);
        }
        
        // Add clip at specific depth
        this.addClipAt = function(clip, indexTarget){
            if(null == clip || clip == this || isNaN(indexTarget)){
                return;
            }
            
            var parent = clip.parent();
            if(parent != null){
                parent.removeClip(clip);
            }
            _clipList.splice(indexTarget, 0, clip);
            _parentClip[clip.id()] = this;
            emit(_self.CLIP_ADDED, {parent:parent});
        }
        
        // Remove Clip
        this.removeClip = function(clip){
            if(null == clip || clip == this){
                return;
            }
            var length = _clipList.length;
            var clipTmp;
            for(var index=0; index <length; index++){
                clipTmp = _clipList[index];
                if(clipTmp == clip){
                     return this.removeClipAt(index);
                }
            }
        }
        
        // Remove Clip at certaiin depth
        this.removeClipAt = function(indexTarget){
            if(isNaN(indexTarget || indexTarget < 0 || !(indexTarget < _clipList.length))){
                return;
            }
            var clip = _clipList.splice(indexTarget, 1)[0];
            var parent = _parentClip[clip.id()];
                _parentClip[clip.id()] = null;
            emit(_self.CLIP_REMOVED, {parent:parent});
            return clip;
        }
        
        // Remove all Clips
        this.removeAllClips = function(){
            while(_clipList.length > 0){
                this.removeClipAt(0);
            }
        }
        
        // Get total clip
        this.getTotalClip = function(){
            return _clipList.length;
        }
        
        // Set the depth of specific Clip
        this.setDepth = function(clip, indexTarget){
            if(null == clip || clip == this || isNaN(indexTarget)){
                return;
            }
            var indexTarget = Math.max(indexTarget, 0);
            var length      = _clipList.length;
            var clipTmp;
            for(var index   = 0; index <length; index++){
                clipTmp     = _clipList[index];
                if(clipTmp == clip){
                     _clipList.splice(indexTarget, 0, _clipList.splice(index, 1)[0]);
                }
            }
        }
        
        // Interchange the depth of 2 Clips
        this.swapClips = function (clip1, clip2){
            if(null == clip1 || null == clip2){
                return;
            }
            
            var index1; var index2; var clip;
            var index = _clipList.length;
            while(--index > -1){
                clip = _clipList[index];
                if(clip1 == clip){
                    index1 = index;
                }
                
                if(clip2 == clip){
                    index2 = index;
                }
            }
            
            if(null != index1 && null != index2){
                var newClip1      = _clipList[index1];
                var newClip2      = _clipList[index2];
                _clipList[index1] = newClip2;
                _clipList[index2] = newClip1;
            }
        }
        
        // Bring a Clip to front
        this.toFront = function (clip){
            if(null == clip){
                return;
            }
            this.setDepth(clip, _clipList.length-1);
        }
        
        // Bring a Clip to back
        this.toBack = function (clip){
            if(null == clip){
                return;
            }
            this.setDepth(clip, 0);
        }
        
        // FRAME
        var _playUntil = function (index){
            _increment = _frameIndex >= index ? -1 : 1;
            _endIndex  = index;
        }
        
        var getIndexByFrame = function(frame){
            if(isNaN(frame)){
                throw new Error("The frame must be a integer and is: " + frame);
            }
            indexFrame = frame - 1;
            indexFrame = indexFrame < 0 ? 0 : indexFrame;
            indexFrame = indexFrame >= _framesList.length ? _framesList.length-1 : indexFrame;
            
            return indexFrame;
        }
        
        // Play a cycle
        this.play = function(){
            _lastTime       = Date.now();
            indexFrame      = _framesList.length-1;
            _lastAction     = "play";
            _fromIndexFrame = 0;
            _playUntil(indexFrame);
        }
        
        // Play a cycle from frame
        this.playFrom = function(frame){
            _lastTime       = Date.now();
            indexFrame      = getIndexByFrame(frame);
            _currentFrame   = indexFrame+1;
            _frameIndex     = indexFrame;
            _fromIndexFrame = indexFrame;
            _lastAction = "playFrom";
            _playUntil(_framesList.length-1);
        }
        
        // Play cycle until frame
        this.playUntil = function(frame){
            _lastTime       = Date.now();
            indexFrame      = getIndexByFrame(frame);
            _fromIndexFrame = _frameIndex;
            _lastAction     = "playUntil";
            _playUntil(indexFrame);
        }
        
        // Play cycle between frames
        this.playBetween = function(fromFrame, untilFrame){
            _lastTime       = Date.now();
            fromIndexFrame  = getIndexByFrame(fromFrame);
            untilIndexFrame = getIndexByFrame(untilFrame);
            _frameIndex     = fromIndexFrame;
            _fromIndexFrame = fromIndexFrame;
            _currentFrame   = fromIndexFrame+1;
            _lastAction     = "playBetween";
            _playUntil(untilIndexFrame);
        }
        
        // Stop cycle
        this.stop = function(){
            _lastTime     = Date.now();
            indexFrame    = _frameIndex;
            _currentFrame = indexFrame+1;
            _endIndex     = indexFrame;
            _lastAction   = "stop";
            _currentFrame = null;
            _lastAction   = null;
        }
        
        // Stop cycle at specific frame
        this.stopAt = function(frame){
            _lastTime     = Date.now();
            indexFrame    = getIndexByFrame(frame);
            _currentFrame = indexFrame+1;
            _frameIndex   = Math.max(Math.min(indexFrame, _framesList.length), 0);
            _endIndex     = indexFrame;
            _lastAction   = "stopAt";
            _currentFrame = null;
            _lastAction   = null;
        }
        
        // Move to the next frame
        this.nextFrame = function(){
            if(_frameIndex >= _framesList.length-1){
                if(this.isLoop){
                    _frameIndex = 0;
                }else{
                    // Early return
                    return;
                }
            }
            _lastTime     = Date.now();
            indexFrame    = Math.max(Math.min(_frameIndex+1, _framesList.length), 0);
            _currentFrame = indexFrame+1;
            _frameIndex   = indexFrame;
            _endIndex     = indexFrame;
            _lastAction   = "nextFrame";
        }
        
        // Move to the prev frame
        this.prevFrame = function(){
            if(_frameIndex == 0){
                if(this.isLoop){
                    _frameIndex = _framesList.length-1;
                }else{
                    // Early return
                    return;
                }
            }
            _lastTime     = Date.now();
            indexFrame    = Math.max(Math.min(_frameIndex-1, _framesList.length), 0);
            _currentFrame = indexFrame+1;
            _frameIndex   = indexFrame;
            _endIndex     = indexFrame;
            _lastAction   = "prevFrame";
        }
        
        // RENDER
        //Set mask wit another clip
        this.setMask = function(mask, type){
            if(null == mask){
                // Early return
                return;
            }
            
            _maskClip[mask.id()] = this;
            _typeMask            = _maskTypes[type] || _maskTypes.mask;
            _mask                = mask;
        }
        
        //Remove the mask
        this.removeMask = function(){
            _typeMask = "source-over";
            if(_mask == null){
                // Early return
                return;
            }
            _maskClip[_mask.id()] = null;
            _mask = null;
        }
        
        var wrap = function(text, limit, yText) {
          if (text.length > limit) {
            var e1 = text.slice(0, limit).lastIndexOf(' ');
            var e2 = text.slice(0, limit).lastIndexOf('-');
            var edge = Math.max(e1, e2);
            if (edge > 0) {
              var line      = text.slice(0, edge + (e2==edge?1:0));
              var remainder = text.slice(edge + 1);
              _innerContext.fillText(line, 0, yText);
              yText += _lineHeight;
              wrap(remainder, limit, yText);
              return;
            }else{
                var e1 = text.indexOf('-');
                var e2 = text.indexOf(' ');
                var edge;
                if(e1 == -1 || e2 == -1){
                    edge = (Math.max(e1, e2));
                }else{
                    edge = (Math.min(e1, e2));
                }
                if(edge > 0){
                    var line      = text.slice(0, edge + (e2==edge?0:1));
                    var remainder = text.slice(edge + 1);
                    _innerContext.fillText(line, 0, yText);
                    yText += _lineHeight;
                    wrap(remainder, limit, yText);
                    return;
                }
            }
          }
          _innerContext.fillText(text, 0, yText);
          return text;
        }

        // EVENT HANDLING
        this.emitMouseEvent = function(type, x, y){
            if(_markToEmmit == this){
                emit(type, {x:x-_self.x, y:y-_self.y});
            }
        }
        
        // Get is has button event handler
        this.hasMouse = function(){
            return _hasMouse;
        }
        
        // Add listener
        this.addEventListener = function (type, listener, context){
            _emitter.addEventListener(type, listener, context);
            _hasMouse = _emitter.hasMouse();
        }
        
        // Remove Listener
        this.removeEventListener = function (type, listener, context){
            _emitter.removeEventListener(type, listener, context);
            _hasMouse = _emitter.hasMouse();
        }
        
        var emit = function(type, data){
            _emitter.emit(type, data);
        }
       
       // DEBUG
       this.debug = function(){
            
        }
        
        /* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */
        /* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */
        /*  R E N D E R                 R E N D E R                  R E N D E R  */
        /* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */
        /* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */
        
        this.render = function(canvasWidth, canvasHeight, mouseX, mouseY, asMask){
            
            if((_clipList.length == 0 && null == _canvas) || false == this.visible || this.isMask() && !asMask){
                return {};
            }
            
            indexRender     = _frameIndex;
            cropDataRender  = _framesList[indexRender];
            try{
                _cropX      = cropDataRender.x;
                _cropY      = cropDataRender.y;
                _cropWidth  = cropDataRender.width;
                _cropHeight = cropDataRender.height;
            }catch(error){
                var name = this.name;
                //debugger
            }
            
            // FRAME RENDER
            this.currentFrame = indexRender+1;
            nowRender         = Date.now();
            
            if((nowRender - this.lastTime) >= 1000/_frameRate){
                this.lastTime = nowRender;
                if(_frameIndex !=  this.endIndex){
                   _frameIndex += _increment;
                   _frameIndex = Math.max(0, _frameIndex);
                }else if(_increment != 0){
                    if(this.isLoop){
                        switch(this.lastAction){
                            case "playBetween" :
                            case "playUntil" :
                            case "playFrom" :
                            _frameIndex = _fromIndexFrame;
                                break;
                            case "play" :
                                _frameIndex = 0;
                        }
                    }else{
                        _increment = 0;
                    }
                    
                    emit(_self.FRAME_UPDATE, {frame:this.currentFrame, action:this.lastAction})
                }
            }
            
            xRender          = this.x;
            yRender          = this.y;
            scaleXrender     = this.scaleX;
            scaleYrender     = this.scaleY;
            widthRender      = this.width  * scaleXrender;
            heightRender     = this.height * scaleYrender;
            pivotXrender     = this.pivotX * widthRender  *scaleXrender;
            pivotYrender     = this.pivotY * heightRender *scaleYrender;
            cropXrender      = _cropX;
            cropYrender      = _cropY;
            cropWidthRender  = _cropWidth;
            cropHeightRender = _cropHeight;
            rotationRender   = this.rotation * (Math.PI)/180;
            
            var minX;var minY;var maxX;var maxY;var pivotX;var pivotY;
            var bounds;var clipBounds;
            var renderList = [];

            var renderNew = function(){
                minX = null;
                minY = null;
                maxX = null;
                maxY = null;
                if(null != _canvas){
                    bounds = calculateBounds ( 0
                                              ,xRender         ,yRender
                                              ,-(pivotXrender) ,-(pivotYrender)
                                              ,widthRender     ,heightRender );
                    minX = bounds.minX;
                    minY = bounds.minY;
                    maxX = bounds.maxX;
                    maxY = bounds.maxY;
                }
                
                // RENDER CHILDREN
                var rx;
                var ry;
                if(null != _canvas){
                    rx = widthRender  / _initialWidth;
                    ry = heightRender / _initialHeight;
                    rx = isNaN(rx) ? 1 : rx;
                    ry = isNaN(ry) ? 1 : ry;
                }else{
                    rx = 1;
                    ry = 1;
                }
                
                rx *= scaleXrender;
                ry *= scaleYrender;
                
                var clipBounds;
                
                _clipMouse    = null;
                var positionX = xRender-pivotXrender;
                var positionY = yRender-pivotYrender;
                var length    = _clipList.length;
                
                for(indexRender = 0; indexRender < length; indexRender++){
                    clipRender = _clipList[indexRender];
                    clipData   = clipRender.render(canvasWidth, canvasHeight, 
                                                   mouseX-_self.x, mouseY-_self.y, 
                                                   false);
                    canvasRender = clipData.inner;
                    if(null != canvasRender){
                        clipBounds = clipData.bounds;
                        renderList.push({canvas:clipData.inner, x:clipBounds.minX, y:clipBounds.minY});
                        
                        if(Boolean(clipData.clipMouse)){
                            _clipMouse = clipData.clipMouse;
                        }
                        
                        if(null != minX){
                            minX = Math.min((clipBounds.minX+positionX)*rx, minX);
                            minY = Math.min((clipBounds.minY+positionY)*ry, minY);
                            maxX = Math.max((clipBounds.maxX+positionX)*rx, maxX);
                            maxY = Math.max((clipBounds.maxY+positionY)*ry, maxY);
                        }else{
                            minX = (clipBounds.minX+positionX)*rx;
                            minY = (clipBounds.minY+positionY)*ry;
                            maxX = (clipBounds.maxX+positionX)*rx;
                            maxY = (clipBounds.maxY+positionY)*ry;
                        }
                    }
                }
                
                var totalWidth  = Math.abs(maxX-minX);
                var totalHeight = Math.abs(maxY-minY);
                var pivotX      = (xRender - minX);
                var pivotY      = (yRender - minY);
                
                bounds = calculateBounds ( rotationRender
                                          ,xRender    ,yRender
                                          ,-(pivotX)  ,-(pivotY)
                                          ,totalWidth ,totalHeight );
                
                minX = bounds.minX;
                minY = bounds.minY;
                maxX = bounds.maxX;
                maxY = bounds.maxY;
                
                _innerCanvas.width  = null != _canvasWidth  ? _canvasWidth  : bounds.width;
                _innerCanvas.height = null != _canvasHeight ? _canvasHeight : bounds.height;
                
                _innerContext.save();
                _innerContext.globalAlpha = _self.alpha;
                
                var translateX = (0.5 + xRender-minX) << 0;
                var translateY = (0.5 + yRender-minY) << 0;
                
                _innerContext.translate(translateX, translateY);
                _innerContext.rotate(rotationRender);
                
                if(_self.background != null){
                    _innerContext.fillStyle = _self.background;
                    _innerContext.fillRect(0, 0, _innerCanvas.width ,_innerCanvas.height );
                }
                
                if(null != _canvas){
                    cropXrender      = (0.5 + cropXrender)      << 0;
                    cropYrender      = (0.5 + cropYrender)      << 0;
                    cropWidthRender  = (0.5 + cropWidthRender)  << 0;
                    cropHeightRender = (0.5 + cropHeightRender) << 0;
                    pivotXrender     = (0.5 + pivotXrender)     << 0;
                    pivotYrender     = (0.5 + pivotYrender)     << 0;
                    widthRender      = (0.5 + widthRender)      << 0;
                    heightRender     = (0.5 + heightRender)     << 0;
                    
                    _innerContext.drawImage( _canvas
                                            ,cropXrender     ,cropYrender
                                            ,cropWidthRender ,cropHeightRender
                                            ,-pivotXrender   ,-pivotYrender
                                            ,widthRender     ,heightRender );
                }else{
                   _self.width      = totalWidth;
                   _self.height     = totalHeight;
                   
                   _initialWidth    = totalWidth;
                   _initialHeight   = totalHeight;
                   
                   cropWidthRender  = totalWidth;
                   cropHeightRender = totalHeight;
                }
                
                if(null != _self.text){
                    _innerContext.textAlign    = _self.textAlign;
                    _innerContext.textBaseline = _self.textBaseline;
                    _innerContext.fillStyle    = _self.fontColor;
                    _innerContext.font         = _self.fontSize + "px " + _self.font;
                    var maxWidth  = _self.width;
                    var wordWidth = 0;
                    var ems       = "M";
                    while(wordWidth < maxWidth){
                        wordWidth = Math.round(_innerContext.measureText(ems).width);
                        ems += "M";
                    }
                    _lineHeight = _self.interline * _self.fontSize;
                    wrap(_self.text, Math.max(ems.length, 1), 0);
                }
                
                var canvas;var x;var y;var w;var h;
                
                var clip;
                var length = renderList.length;
                for(var index=0; index < length; index++){
                    clip = renderList[index];
                    if(null != clip){
                        canvas = clip.canvas;
                        x = (0.5 + (clip.x-pivotXrender)* rx) << 0;
                        y = (0.5 + (clip.y-pivotYrender)* ry) << 0;
                        w = (0.5 + (canvas.width  * rx))      << 0;
                        h = (0.5 + (canvas.height * ry))      << 0;
                        _innerContext.drawImage( clip.canvas ,x ,y, w, h);
                    }
                }
                
                if(_hasMouse){
                    var pixel = _innerContext.getImageData(mouseX, mouseY, 1, 1).data;
                    alphaRender = pixel[3];
                    
                    if(alphaRender > 0){
                        _clipMouse = _self;
                    }
                }
                
                // MASK RENDER
                clipRender  = _mask;
                if(null != clipRender){
                    clipData= clipRender.render(canvasWidth, canvasHeight, mouseX-_self.x, mouseY-_self.y, true);
                    canvasRender = clipData.inner;
                    if(null != canvasRender){
                        clipBounds = clipData.bounds;
                        x = clipBounds.minX;
                        y = clipBounds.minY;
                        x = (0.5 + (x-pivotXrender)* rx)        << 0;
                        y = (0.5 + (y-pivotYrender)* ry)        << 0;
                        w = (0.5 + (canvasRender.width   * rx)) << 0;
                        h = (0.5 + (canvasRender.height  * ry)) << 0;
                        _innerContext.globalCompositeOperation = 'destination-in';
                        _innerContext.drawImage( canvasRender ,x ,y, w, h);
                        
                        alphaRender= _innerContext.getImageData(mouseX, mouseY, 1, 1).data[3];
                        if(alphaRender == 0){
                            _clipMouse = null;
                        }
                        
                        _innerContext.globalCompositeOperation = 'source-over';
                    }
                }
                
                _innerContext.restore();
            }
            ///////////////////////////////////////////////////////////////////
            var renderMe = renderNew;
            //REMOVE ME when after refactor.
            renderMe();
            ///////////////////////////////////////////////////////////////////
            // RETURN CANVAS AND CLIP MOUSE
            _innerCanvas.id = _self.name;
            var data = {inner:_innerCanvas, clipMouse:_clipMouse, bounds:bounds, x:minX, y:minY};
            emit(_self.RENDER, {clip:_self});
            _self.debug(_innerCanvas, _self.name);
            return data;
        }

