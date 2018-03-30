window.Canvate = function(element) {
    'use strict';
    window.check = true;
    var lastTime = 0;
    var vendors  = ['ms', 'moz', 'webkit', 'o'];
    
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame  = window[vendors[x]+'CancelAnimationFrame'] 
                                     || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
    
    if (!window.requestAnimationFrame){
        window.requestAnimationFrame = function(callback, element) {
            var currTime   = Date.now();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id         = window.setTimeout(function() { callback(currTime + timeToCall); }, timeToCall);
            lastTime       = currTime + timeToCall;
            return id;
        };
    }
    
    if (!window.cancelAnimationFrame){
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        }
    }

    var Emitter = function(target){
        'use strict';
        
        var _click   = 0;
        var _over    = 0;
        var _out     = 0;
        var _down    = 0;
        var _up      = 0;
        var _hasMouse= false;
        
        var CONTEXT  = 0;
        var LISTENER = 1;
        var _target  = target;
        
        var _listenerTypes = {};
        var _listenerList;
        
        var listener;
        
        this.addEventListener = function(type, listener, context){
            if(null == type || type == "" || typeof listener !== "function" ){
                return;
            }
            _listenerList = _listenerTypes[type];
            if(null == _listenerList){
                _listenerList = _listenerTypes[type] = [];
            }
            
            var length = _listenerList.length;
            for(var index=0; index < length; index++){
                if(listener[LISTENER] == listener && 
                   listener[CONTEXT]  == context){
                    return;
                }
            }
            _listenerTypes[type].push([context, listener]);
            switch(type){
                case "click" : 
                    _click++;
                    break;
                case "over" : 
                    _over++;
                    break;
                case "out" : 
                    _out++;
                    break;
                case "down" : 
                    _down++;
                    break;
                case "up" : 
                    _up++;
                    break;
            }
            _hasMouse = _click + _over + _out + _down + _up > 0;
            return true;
        }
        
        this.removeEventListener = function(type, listener, context){
            if(null == type || type == "" || typeof listener !== "function" ){
                return;
            }
            
            _listenerList = _listenerTypes[type];
            if(null == _listenerList){
                return
            }
            
            var length = _listenerList.length;
            for(var index=0; index < length; index++){
                listener = _listenerList[index];
                if(listener[LISTENER] == listener && 
                   listener[CONTEXT]  == context){
                    _listenerTypes[type].splice(index, 1);
                    switch(type){
                        case "click" : 
                            _click--;
                            break;
                        case "over" : 
                            _over--;
                            break;
                        case "out" : 
                            _out--;
                            break;
                        case "down" : 
                            _down--;
                            break;
                        case "up" : 
                            _up--;
                            break;
                    }
                    _hasMouse = _click + _over + _out + _down + _up > 0;
                    return true;
                }
            }
        }
        
        this.emit = function(type, data){
            if(null == type || type == ""){
                return;
            }
            _listenerList = _listenerTypes[type];
            if(null == _listenerList){
                return
            }
            
            data.type   = type;
            data.target = _target;
            var length  = _listenerList.length;
            for(var index=0; index < length; index++){
                listener = _listenerList[index];
            listener[LISTENER].apply(listener[CONTEXT], [data]);
            }
        }
        
        this.hasMouse = function(){
            return _hasMouse;
        }
    }
    
    var calculateBounds = function(theta, xx, yy, pivotX,pivotY, wwidth,hheight){
        'use strict';
        
        var pivotXX;var pivotYY;var minX;var minY;var maxX;var maxY;var cos;
        var sin;var pxc;var pys;var pxs;var pyc;var pxw;var pyh;var pwc;var pws;
        var phs;var phc;var x1;var y1;var x2;var y2;var x3;var y3;var x4;var y4;
        
        pivotXX = pivotX - xx;
        pivotYY = pivotY - yy; 
        cos = Math.cos(theta);
        sin = Math.sin(theta);
        pxc = pivotX * cos;
        pys = pivotY * sin;
        pxs = pivotX * sin;
        pyc = pivotY * cos;
        pxw = pivotX + wwidth;
        pyh = pivotY + hheight;
        pwc = pxw    * cos;
        pws = pxw    * sin;
        phs = pyh    * sin;
        phc = pyh    * cos;
        x1  = pxc    - pys + xx;
        y1  = pxs    + pyc + yy;
        x2  = pwc    - pys + xx;
        y2  = pws    + pyc + yy;
        x3  = pwc    - phs + xx;
        y3  = pws    + phc + yy;
        x4  = pxc    - phs + xx;
        y4  = pxs    + phc + yy;
        
        minX = Math.min(Math.min(x1, x2), Math.min(x3, x4));
        minY = Math.min(Math.min(y1, y2), Math.min(y3, y4));
        
        maxX = Math.max(Math.max(x1, x2), Math.max(x3, x4));
        maxY = Math.max(Math.max(y1, y2), Math.max(y3, y4));
        
        return { minX   : minX        ,minY    : minY, 
                 maxX   : maxX        ,maxY    : maxY, 
                 width  : Math.abs(maxX-minX) ,height : Math.abs(maxY-minY)};
    }
    
    var clipCounter  = 0;
    var _parentClip  = {};
    var _allClipList = {};
    var _markToEmmit;
    var _maskClip    = {};
    var _maskTypes   = {
                           mask  : 'destination-in'
                          ,slice : 'destination-out'
                        // source-over     : default
                        // source-in       : renders source only in the intersections
                        // source-out      : renders source only in the non intersections
                        
                        // source-atop     : renders the base and the interseccion with source
                        
                        // destination-in  : renders base only in the intersections
                        // destination-out : renders base only in the non intersection
                        
                        // xor             : erases only intersection
                       }
    
    // ::: CLIP ::: //
    var Clip = function (image){
        ("VERSION 0.0.89")
        
        'use strict';
        
        var _self          = this;
                           
        this.TEXT_SET      = "textSet";
        this.IMAGE_SET     = "imageSet";
        this.IMAGE_LOADED  = "imageLoaded";
        this.IMAGE_ERROR   = "imageError";
        this.CLIP_ADDED    = "clipAdded";
        this.CLIP_REMOVED  = "clipRemoved";
        this.FRAME_UPDATE  = "frameUpdate";
        this.RENDER        = "render";
        
        clipCounter++;
        var _id            = "clip" + clipCounter;
        _allClipList[_id]  = this;
        
        this.name          = _id;
        this.x             = 0;
        this.y             = 0;
        this.width         = 0;
        this.height        = 0;
        this.alpha         = 1;
        this.scaleX        = 1;
        this.scaleY        = 1;
        this.rotation      = 0;
        this.pivotX        = 0;
        this.pivotY        = 0;
        this.visible       = true;
        this.isLoop        = false;
        this.background    = null;
        this.text;
        this.interline     = 1.313;
        this.fontSize      = 12;
        this.font          = "sans-serif";
        this.textAlign     = "start"; // end | center | left | right
        this.textBaseline  = "top";//bottom | middle
        this.fontColor     = "black";
        
        //TODO  image
        var _image;
        var _canvas;
        var _context;
        var _increment     = 0;
        var _frameIndex    = 0;
        var _frameRate     = 60;
        var _totalFrames   = 1;
        var _cropX         = 0;
        var _cropY         = 0;
        var _cropWidth     = 0;
        var _cropHeight    = 0;
        var _emitter       = new Emitter(this);
        var _innerCanvas   = document.createElement("canvas");
        var _innerContext  = _innerCanvas.getContext('2d');
        var _clipList      = [];
        var _framesList    = [];
        var _initialWidth  = null;
        var _initialHeight = null;
        var _canvasWidth;
        var _canvasHeight;
        var _mask;
        var _clipMouse;
        var _lineHeight;
        var _hasMouse;
        var _fromIndexFrame;
        var _endIndex;
        var _currentFrame;
        var _lastTime;
        var _lastAction
        
        // HELPERS VARIABLES
        var tileXsetCycle;var tileYsetCycle;var widthSetCycle;var heightSetCycle;
        var indexSetCycle;var gapX;var gapY;var tempCanvas;var tempContext;
        var lastWidth;var indexFrame;var fromIndexFrame;var untilIndexFrame;
        var indexRender;var cropDataRender;var nowRender;var xRender;var yRender;
        var widthRender;var heightRender;var cropXrender;var cropYrender;var bounds;
        var cropWidthRender;var cropHeightRender;var pivotXrender;var pivotYrender;
        var alphaRender;var canvasRender;var clipRender;var rotationRender;
        var scaleXrender;var scaleYrender; var clipData;
        
        // GETTERS

        //Returns the first occurence of a Clip with the same property and value.
        this.getClipByProp = function (propName, value){
            var list = getClipListByProp(propName, value);
            return list[0];
        }

        //Returns a list of Clip with the same property and value.
        this.getClipListByProp = function (propName, value){
            var length = _clipList.length;
            var clip;
            var list = [];
            for(var index = 0; index < length; index++){
                var clip = _clipList[index];
                if(clip[propName] == value){
                    list.push[clip];
                }
            }
            return list;
        }
        
        // Returns the id
        this.getId  = function(){
            return _id;
        }
        
        // Returns the totalFrames
        this.getTotalFrames = function(){
            return _totalFrames;
        }
        
        // Returns the parent
        this.getParent = function (){
            return _parentClip[_id];
        }
        
        // Returns if is a mask
        this.isMask = function(){
            return _maskClip[_id];
        }
        
        // Returns if has button event handler
        this.hasButton = function(){
            return _hasButton;
        }
        
        this.getCurrentFrame = function(){
            return _currentFrame;
        }
        
        this.setFrameRate = function(frameRate){
            if(null == frameRate || isNaN(frameRate)){
                //Early return
                return;
            }
            _frameRate = frameRate;
        }
        
        this.getFrameRate = function(){
            return _frameRate;
        }
        
        // Sets the same pivot X and Y
        this.setPivot = function(num){
            var isNum = !(num == null || isNaN(num));
            if(!isNum){
                return;
            }
            
            this.pivotX = this.pivotY = num;
        }
        
        // Sets the same scale X and Y
        this.setScale = function(num){
            var isNum = !(num == null || isNaN(num));
            if(!isNum){
                return;
            }
            
            this.scaleX = this.scaleY = num;
        }
        
        // Sets the same position X and Y
        this.setPosition = function(x, y){
            var isNum = !(x == null || isNaN(x));
            if(!isNum){
                return;
            }
            
            var isNum = !(y == null || isNaN(y));
            if(!isNum){
                return;
            }
            
            this.x = x;
            this.y = y;
        }
        
        // Sets the same size width and height
        this.setSize = function(width, height){
            var isNotWidth  = (width  == null) || (isNaN(width)  && width  != "auto");
            var isNotHeight = (height == null) || (isNaN(height) && height != "auto");
            
            if(isNotWidth || isNotHeight || (width == "auto" && height=="auto")){
                return;
            }
            
            if(null != _initialWidth || null != _initialHeight){
                if(width == "auto"){
                    width  = (height / _initialHeight) * _initialWidth;
                }
                
                if(height == "auto"){
                    height = (width / _initialWidth)   * _initialHeight;
                }
            }
            
            this.width   = width;
            this.height  = height;
        }
        
        // Set the view port of the image
        this.setViewPort = function(width, height){
            if(null == width || null == height || isNaN(width) || isNaN(height)){
                return;
            }
            _canvasWidth  = width;
            _canvasHeight = height;
        }
        
        // Removes the view port
        this.removeViewPort = function(){
            _canvasWidth  = null;
            _canvasHeight = null;
        }
        
        //Fits an image into a specific area
        this.fitInto = function(maxWidth, maxHeight, offsetX, offsetY){
            if(null == maxWidth || null == maxHeight || isNaN(maxWidth) || isNaN(maxHeight)){
                return;
            }
            
            if(null == offsetX || isNaN(offsetX)){
                offsetX = 0;
            }
            
            if(null == offsetY || isNaN(offsetY)){
                offsetY = 0;
            }
            
            var ratio  = Math.min(maxWidth / _initialWidth, maxHeight / _initialHeight);
            var width  = _initialWidth  * ratio;
            var height = _initialHeight * ratio;
            
            this.setSize(Math.floor(width), "auto");
            
            var x  = Math.floor((maxWidth-width)/2);
            var y  = Math.floor((maxHeight-height)/2);
            
            this.x = x + (this.pivotX * width)  + offsetX;
            this.y = y + (this.pivotY * height) + offsetY;
        }
        
        // Set the width proportional to the height
        this.setAutoWidth = function(){
            this.setSize("auto", this.height);
        }

        // Set the height proportional to the width
        this.setAutoHeight = function(){
            this.setSize(this.width, "auto");
        }
        
        // Sets the image Clip
        this.setImage = function(image, width, height){
            if(null == image){
                // Early return
                return;
            }
            
            _image         = image;
            _image.crossOrigin = "Anonymous";
            _initialWidth      = image.width;
            _initialHeight     = image.height;
            _canvas        = document.createElement('canvas');
            _canvas.width  = _initialWidth;
            _canvas.height = _initialHeight;
            _context       = _canvas.getContext('2d');
            _context.drawImage(image, 0, 0, _initialWidth, _initialHeight);
            
            this.setSize(width ==undefined?this.width :width, 
                         height==undefined?this.height:height);
            
            this.width  = null == this.width  || 0 == this.width  ? _initialWidth  : this.width;
            this.height = null == this.height || 0 == this.height ? _initialHeight : this.height;
            _cropWidth  = null == _cropWidth  || 0 == _cropWidth  ? _initialWidth  : _cropWidth;
            _cropHeight = null == _cropHeight || 0 == _cropHeight ? _initialHeight : _cropHeight;
            
            this.setCycle(_cropX, _cropY, _cropWidth, _cropHeight);
            emit(_self.IMAGE_SET, {image:image})
        }
        
        // Sets the Cycle animation
        this.setCycle = function(x, y, width, height, totalFrames, gapX, gapY){
            tileXsetCycle  = _cropX      = null == x      || isNaN(x)      ? _cropX      : x;
            tileYsetCycle  = _cropY      = null == y      || isNaN(y)      ? _cropY      : y;
            widthSetCycle  = _cropWidth  = null == width  || isNaN(width)  ? _cropWidth  : width;
            heightSetCycle = _cropHeight = null == height || isNaN(height) ? _cropHeight : height;
            
            gapX = null == gapX || isNaN(gapX) ? 0 : gapX;
            gapY = null == gapY || isNaN(gapY) ? 0 : gapY;
            
            if(null == totalFrames || isNaN(totalFrames)){
                var totalWidth  = Math.floor(_image.width/widthSetCycle);
                var totalHeight = Math.floor(_image.height/heightSetCycle);
                totalFrames     = _totalFrames = totalWidth * totalHeight;
            }
            
            if(_totalFrames == 0){
                _totalFrames = 1;
            }
            
            _canvas        = document.createElement('canvas');
            _canvas.width  = widthSetCycle*_totalFrames;
            _canvas.height = heightSetCycle;
            _context       = _canvas.getContext('2d');
            
            _framesList.length = 0;
            var rowX;
            for(indexSetCycle=0; indexSetCycle < _totalFrames; indexSetCycle++){
                rowX = widthSetCycle*indexSetCycle;
                
                _framesList.push({
                                    x      : rowX,
                                    y      : 0,
                                    width  : widthSetCycle,
                                    height : heightSetCycle
                                });
                
                _context.drawImage(_image, 
                                   tileXsetCycle, tileYsetCycle, 
                                   widthSetCycle, heightSetCycle, 
                                   rowX, 0, 
                                   widthSetCycle, heightSetCycle);
                
                tileXsetCycle += widthSetCycle;
                if(tileXsetCycle >= _initialWidth){
                    tileXsetCycle = 0;
                    tileYsetCycle += heightSetCycle;
                    if(_cropY > _initialHeight){
                        throw new Error("The total frames is out of bound");
                    }
                }
            }
        }
        
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
        
        this.render = function(canvasWidth, canvasHeight, mouseX, mouseY, asMask, stroke){
            stroke -= 10;
            
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
                                                   false, stroke);
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
                    clipData= clipRender.render(canvasWidth, canvasHeight, mouseX-_self.x, mouseY-_self.y, true, stroke);
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
        
        // SET THE INITIAL IMAGE
        this.setImage(image);
    }
    
    // ::: PROPERTIES MEMBER ::: //
    var _mainCanvas = element;
    var _context    = _mainCanvas.getContext("2d");
    var hovering    = function(){};
    var _mainCanvasOff;
    var _mainContextOff;
    var _lastX;
    var _lastY;
    var _mouseX;
    var _mouseY;
    var _bounds;
    var _lastClipOvered;
    var _clipMouse;
    var _stage;
    var mouseCursor;
    
    var canvasUpdate;
    var canvasData;
    var clipMouse;
    
    // ::: BUTTON ::: //
    var resolveOver = function(){
        
        if(undefined == _lastX || undefined == _lastY){
            return;
        }
        
        mouseCursor = "default";
        if(Boolean(_clipMouse) && _clipMouse.hasMouse()){
            mouseCursor = "pointer";
           
            if(_clipMouse != _lastClipOvered){
                resolveOut();
                _lastClipOvered = _clipMouse;

                _markToEmmit = _clipMouse;
                _clipMouse.emitMouseEvent("over");
                _markToEmmit = null;
             }
             
        }else {
            resolveOut();
        }
        _mainCanvas.style.cursor = mouseCursor;
    }
    
    var resolveOut = function(isLeave){
        if(Boolean(_lastClipOvered) && _lastClipOvered.hasMouse()){
            _markToEmmit = _lastClipOvered;
            _lastClipOvered.emitMouseEvent("out", _lastX, _lastY);
            if(isLeave){
                _lastClipOvered.emitMouseEvent("up", _lastX, _lastY);
            }
            _lastClipOvered = null;
            _clipMouse      = null;
            _markToEmmit    = null;
        }
    }
    
    // ::: RENDER ::: //
    var update = function (){
        _clipMouse            = null;
        _mainCanvas.width     = _stage.width;
        _mainCanvas.height    = _stage.height;
        _mainCanvasOff.width  = _stage.width;
        _mainCanvasOff.height = _stage.height;
       //                                      canvasWidth, canvasHeight, mouseX, mouseY, asMask, stroke
        canvasData   = _stage.render(_mainCanvas.width, _mainCanvas.height, _lastX, _lastY, false, 30);
        canvasUpdate = canvasData.inner;

        if(Boolean(canvasUpdate)){
            
            _context.drawImage(canvasUpdate, canvasData.x, canvasData.y);
            clipMouse = canvasData.clipMouse;
            if(null != clipMouse){
                _clipMouse = clipMouse;
            }
        }
        hovering();
       // _context.drawImage(_mainCanvasOff, 0, 0);
        requestAnimationFrame(update);
    }
    
     // ::: INITIALIZATION ::: //
    var initialize = function() {
        _mainCanvas.width     = _mainCanvas.width;
        _mainCanvas.height    = _mainCanvas.height;
        
        _mainCanvasOff        = _mainCanvas.cloneNode();
        _mainContextOff       = _mainCanvasOff.getContext('2d');
        _mainCanvasOff.width  = _mainCanvas.width;
        _mainCanvasOff.height = _mainCanvas.height;
        
        _stage = new Clip();
        _stage.name = "stage";
        _stage.setImage(_mainCanvas);
        
        _mainCanvas.onmousemove = function(event) {
            event.preventDefault();
            _bounds = _mainCanvas.getBoundingClientRect();
            _mouseX = event.clientX;
            _mouseY = event.clientY;
            _lastX  = (_mouseX - _bounds.left) * (_mainCanvas.width/_bounds.width);
            _lastY  = (_mouseY - _bounds.top) * (_mainCanvas.width/_bounds.width);
            hovering = resolveOver;
        };
        
        _mainCanvas.onclick = function(event){
            event.preventDefault();
            if(Boolean(_clipMouse) && _clipMouse.hasMouse()){
                _markToEmmit = _clipMouse;
                _clipMouse.emitMouseEvent("click", _lastX, _lastY);
                _markToEmmit = null;
            }
        };
        
        _mainCanvas.onmousedown = function(event){
            event.preventDefault();
            if(Boolean(_clipMouse)&& _clipMouse.hasMouse()){
                _markToEmmit = _clipMouse;
                _clipMouse.emitMouseEvent("down", _lastX, _lastY);
                _markToEmmit = null;
            }
        };
        
        _mainCanvas.onmouseup = function(event){
            event.preventDefault();
            if(Boolean(_clipMouse)&& _clipMouse.hasMouse()){
                _markToEmmit = _clipMouse;
                _clipMouse.emitMouseEvent("up", _lastX, _lastY);
                _markToEmmit = null;
            }
        };
        
        window.onmouseleave = function(event){
            console.log("WINDOW LEFT!!");
        };
        
        document.onmouseleave = _mainCanvas.onmouseleave = function(event){
            resolveOut(true);
            hovering = function(){};
        };
        
        var _mainEmitter = new Emitter(_mainCanvas);
        
        update();
    }
    
    initialize();
    return _stage;
 };