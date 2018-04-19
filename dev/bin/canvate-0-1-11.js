// "VERSION 0.1.11"
// View port functionality, removed
//minified by https://javascript-minifier.com/

window.Canvate = function(element) {
    'use strict';
    
    var isString = typeof element === "string";
    if(isString){
        element = document.getElementById(element);
        if(null == element){
            throw "There is no element with the 'id': " + element;
        }
    }
    
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
    
    var MOUSE_OVER      = "mouseOver";
    var MOUSE_OUT       = "mouseOut";
    var MOUSE_UP        = "mouseUp";
    var MOUSE_DOWN      = "mouseDown";
    var CLICK           = "click";
    var FUNCTION        = "function";
    var OBJECT          = "object";
    var CANVAS          = "canvas";
    var D2              = "2d";
    var IMG             = "img";
    var IMG_PNG         = "image/png";
    var ANONYMOUS       = "Anonymous";
    var SOURCE_OVER     = "source-over";
    var DESTINATION_IN  = "destination-in";
    var DESTINATION_OUT = "destination-out";
    var CLIP            = "clip";
    var PLAY            = "play";
    var PLAY_FROM       = "playFrom";
    var PLAY_UNTIL      = "playUntil";
    var PLAY_BETWEEN    = "playBetween";
    var STOP            = "stop";
    var STOP_AT         = "stopAt";
    var NEXT_FRAME      = "nextFrame";
    var PREV_FRAME      = "prevFrame";
    var DEFAULT         = "default";
    var POINTER         = "pointer";
    var STAGE           = "canvateStage";

    var Emitter = function(target){
        'use strict';
        
        var _click         = 0;
        var _over          = 0;
        var _out           = 0;
        var _down          = 0;
        var _up            = 0;
        var _hasMouse      = false;
                           
        var CONTEXT        = 0;
        var LISTENER       = 1;
        var _target        = target;
        
        var _listenerTypes = {};
        var _listenerList;
        
        var listener;
        
        this.addEventListener = function(type, listener, context){
            if(null == type || type == "" || typeof listener !== FUNCTION ){
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
                case CLICK : 
                    _click++;
                    break;
                case MOUSE_OVER : 
                    _over++;
                    break;
                case MOUSE_OUT : 
                    _out++;
                    break;
                case MOUSE_DOWN : 
                    _down++;
                    break;
                case MOUSE_UP : 
                    _up++;
                    break;
            }
            _hasMouse = _click + _over + _out + _down + _up > 0;
            return true;
        }
        
        this.removeEventListener = function(type, listener, context){
            if(null == type || type == "" || typeof listener !== FUNCTION ){
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
                        case CLICK : 
                            _click--;
                            break;
                        case MOUSE_OVER : 
                            _over--;
                            break;
                        case MOUSE_OUT : 
                            _out--;
                            break;
                        case MOUSE_DOWN : 
                            _down--;
                            break;
                        case MOUSE_UP : 
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
            data        = null == data || typeof data != OBJECT ? {} : data;
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
                           mask  : DESTINATION_IN
                          ,slice : DESTINATION_OUT
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
        'use strict';
        
        var _self          = this;
                           
        this.TEXT_SET      = "textSet";
        this.IMAGE_SET     = "imageSet";
        this.IMAGE_LOADED  = "imageLoaded";
        this.IMAGE_ERROR   = "imageError";
        this.CLIP_ADDED    = "clipAdded";
        this.CLIP_REMOVED  = "clipRemoved";
        this.CYCLE_END     = "cycleEnd";
        this.CYCLE_START   = "cycleStart";
        this.RENDER        = "render";
        this.START         = "start";
        this.END           = "end";
        this.CENTER        = "center";
        this.LEFT          = "left";
        this.RIGHT         = "right";
        this.TOP           = "top";
        this.BOTTOM        = "bottom";
        this.MIDDLE        = "middle";
        
        
        clipCounter++;
        var _id            = CLIP + clipCounter;
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
        this.textAlign     = this.START; // end | center | left | right
        this.textBaseline  = "top";//bottom | middle
        this.fontColor     = "black";
        
        var AUTO           = "auto";
        
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
        var _innerCanvas   = document.createElement(CANVAS);
        var _innerContext  = _innerCanvas.getContext(D2);
        var _clipList      = [];
        var _framesList    = [];
        var _initialWidth  = null;
        var _initialHeight = null;
        var _mask;
        var _clipMouse;
        var _lineHeight;
        var _hasMouse;
        var _fromIndexFrame;
        var _endIndex;
        var _currentFrame;
        var _lastTime;
        var _lastAction;
        
        // HELPERS VARIABLES
        var tileXsetCycle;var tileYsetCycle;var widthSetCycle;var heightSetCycle;
        var indexSetCycle;var gapX;var gapY;var tempCanvas;var tempContext;
        var lastWidth;var indexFrame;var fromIndexFrame;var untilIndexFrame;
        var indexRender;var cropDataRender;var nowRender;var xRender;var yRender;
        var widthRender;var heightRender;var cropXrender;var cropYrender;var bounds;
        var cropWidthRender;var cropHeightRender;var pivotXrender;var pivotYrender;
        var alphaRender;var canvasRender;var clipRender;var rotationRender;
        var scaleXrender;var scaleYrender; var clipData;
        
        // TRANSFORMATION METHODS
        this.setPosition = function(x, y){
            var isNum
            isNum = !(x == null || isNaN(x));
            if(isNum){
                this.x = x;
            }
            
            isNum = !(y== null || isNaN(y));
            if(isNum){
                this.y = y;
            }
        }

        this.setSize = function(width, height){
            var isNotWidth  = (width  == null) || (isNaN(width)  && width  != AUTO);
            var isNotHeight = (height == null) || (isNaN(height) && height != AUTO);
            
            if(isNotWidth || isNotHeight || (width == AUTO && height==AUTO)){
                return;
            }
            
            if(null != _initialWidth || null != _initialHeight){
                if(width == AUTO){
                    width  = (height / _initialHeight) * _initialWidth;
                }
                
                if(height == AUTO){
                    height = (width / _initialWidth)   * _initialHeight;
                }
            }
            
            this.width  = width;
            this.height = height;
        }
        
        this.setScale = function(x, y){
            var isNum
            isNum = !(x == null || isNaN(x));
            if(isNum){
                this.scaleX = x;
            }
            
            isNum = !(y== null || isNaN(y));
            if(isNum){
                this.scaleY = y;
            }
        }

        this.setPivot = function(x, y){
            var isNum
            isNum = !(x == null || isNaN(x));
            if(isNum){
                this.pivotX = x;
            }
            
            isNum = !(y== null || isNaN(y));
            if(isNum){
                this.pivotY = y;
            }
        }
        
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
            
            this.setSize(Math.floor(width), AUTO);
            
            var x  = Math.floor((maxWidth-width)/2);
            var y  = Math.floor((maxHeight-height)/2);
            
            this.x = x + (this.pivotX * width)  + offsetX;
            this.y = y + (this.pivotY * height) + offsetY;
        }
        
        this.setAutoWidth = function(){
            this.setSize(AUTO, this.height);
        }

        this.setAutoHeight = function(){
            this.setSize(this.width, AUTO);
        }
        
        this.crop = function(x, y, width, height, finalWidth, finalHeight){
            var x        = null == x      ? _cropX      : x;
            var y        = null == y      ? _cropY      : y;
            var width    = null == width  ? _cropWidth  : width;
            var height   = null == height ? _cropHeight : height;
                         
            _self.width  = null;
            _self.height = null;
            _cropWidth   = null;
            _cropHeight  = null;
            
            var canvas        = document.createElement(CANVAS);
                canvas.width  = width;
                canvas.height = height;
           
            finalWidth  = null == finalWidth  || isNaN(finalWidth)  ? width  : finalWidth;
            finalHeight = null == finalHeight || isNaN(finalHeight) ? height : finalHeight; 
            
            var context = canvas.getContext(D2);
                context.drawImage(_image, x, y, width, height, 0, 0, finalWidth, finalHeight);
            
            
            var img             = document.createElement(IMG);
                img.crossOrigin = ANONYMOUS;
                img.src         = canvas.toDataURL(IMG_PNG);
            
            this.setImage(canvas);
            this.setSize(finalWidth, finalHeight);
        }

        //IMAGE METHODS
        // Sets the image Clip
        this.setImage = function(image){
            if(null == image){
                // Early return
                return;
            }
            
            _image             = image;
            _image.crossOrigin = ANONYMOUS;
            _initialWidth      = image.width;
            _initialHeight     = image.height;
            this.width         = null == this.width  || 0 == this.width  ? _initialWidth  : this.width;
            this.height        = null == this.height || 0 == this.height ? _initialHeight : this.height;
            _canvas            = document.createElement(CANVAS);
            _canvas.width      = this.width;
            _canvas.height     = this.height;
            _context           = _canvas.getContext(D2);
            _context.drawImage(image, 0, 0, _initialWidth, _initialHeight);
            
            this.setSize(this.width, this.height);
            
            _cropWidth  = null == _cropWidth  || 0 == _cropWidth  ? _initialWidth  : _cropWidth;
            _cropHeight = null == _cropHeight || 0 == _cropHeight ? _initialHeight : _cropHeight;
            
            
            
            this.setCycle(_cropX, _cropY, _cropWidth, _cropHeight);
            emit(_self.IMAGE_SET, {image:image})
        }
        
        this.setImageById = function(id){
            var image = document.getElementById(id);
                image.crossOrigin = ANONYMOUS;
            if(image == null){
                throw "There is no element with the id: " + id;
                return;
            }
            setImage(image);
            return image;
        }
        
        //Load image from SRC
        this.loadImage = function(src, isAntiCache){
            var image        = new Image();
                image.onload = function() {
                    _self.setImage(image);
                    emit(_self.IMAGE_LOADED, {image:image, src:src})
                }
                
                image.onerror = function(event){
                    emit(_self.IMAGE_ERROR, {src:src})
                }
                var antiCache     = isAntiCache ? '?' + new Date().getTime() : "";
                image.crossOrigin = ANONYMOUS;
                image.src         = src + antiCache;
        }
        
        //Set mask wit another clip
        this.setMask = function(mask, type){
            if(null == mask){
                // Early return
                return;
            }
            
            _maskClip[mask.getId()] = this;
            _typeMask               = _maskTypes[type] || _maskTypes.mask;
            _mask                   = mask;
        }
        
        //Remove the mask
        this.removeMask = function(){
            _typeMask = SOURCE_OVER;
            if(_mask == null){
                // Early return
                return;
            }
            _maskClip[_mask.getId()] = null;
            _mask = null;
        }
        
        // Returns if is a mask
        this.isMask = function(){
            return _maskClip[_id];
        }
        
        // Sets the background
        this.setBackground = function(fillStyle){
            this.background = fillStyle;
        }
        
        //Sets the rect
        this.setRect = function(width, height, color){
            if(null == width || null == height || isNaN(width) || isNaN(height)){
                return;
            }
            
            _self.width  = null;
            _self.height = null;
            _cropWidth   = null;
            _cropHeight  = null;
            
            var canvas            = document.createElement(CANVAS);
                canvas.width      = width;
                canvas.height     = height;
           
            var context           = canvas.getContext(D2);
                context.fillStyle = color;
                context.fillRect(0,0,width,height);
            
            var img               = document.createElement(IMG);
                img.crossOrigin   = ANONYMOUS;
                img.src           = canvas.toDataURL(IMG_PNG);
            
            this.setImage(canvas);
        }
        
        // Sets the text
        this.setText = function(text, size, font, color){
            this.text      = text;
            this.fontSize  = null == size  ? this.fontSize  : 12;
            this.font      = null == font  ? this.font      : font;
            this.fontColor = null == color ? this.fontColor : color;
            emit(_self.TEXT_SET, {text:this.text});
        }
        
        // CHILDREN METHODS
        // Returns the id
        this.getId  = function(){
            return _id;
        }
        
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
            
            var parent = clip.getParent();
            if(parent != null){
                parent.removeClip(clip);
            }
            _clipList.splice(indexTarget, 0, clip);
            _parentClip[clip.getId()] = this;
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
            var parent = _parentClip[clip.getId()];
                _parentClip[clip.getId()] = null;
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
        
        // Returns the parent
        this.getParent = function (){
            return _parentClip[_id];
        }
        
        //Returns the first occurence of a Clip with the same property and value.
        this.getClipByProp = function (propName, value){
            var list = getClipListByProp(propName, value);
            return list[0];
        }

        //Returns a list of Clip with the same property and value.
        this.getClipListByProp = function (propName, value){
            var length = _clipList.length;
            var list   = [];
            var clip;
            for(var index = 0; index < length; index++){
                var clip = _clipList[index];
                if(clip[propName] == value){
                    list.push[clip];
                }
            }
            return list;
        }
        
        // CYCLE AND FRAME METHODS
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
            
            _canvas        = document.createElement(CANVAS);
            _canvas.width  = widthSetCycle*_totalFrames;
            _canvas.height = heightSetCycle;
            _context       = _canvas.getContext(D2);
            
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
                                   rowX,          0, 
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
            
            if(1 < _totalFrames){
                this.setSize(widthSetCycle, AUTO);
            }
        }
        
        var _playUntil = function (index){
            _increment = _frameIndex >= index ? -1 : 1;
            _endIndex  = index;
        }
        
        var getIndexByFrame = function(frame){
            if(isNaN(frame)){
                throw new Error("The frame must be an integer and is: " + frame);
            }
            indexFrame = frame - 1;
            indexFrame = indexFrame < 0 ? 0 : indexFrame;
            indexFrame = indexFrame >= _framesList.length ? _framesList.length-1 : indexFrame;
            
            return indexFrame;
        }
        
        // Play a cycle
        this.play = function(){
            var frameEvent  = _currentFrame;
            _lastTime       = Date.now();
            indexFrame      = _framesList.length-1;
            _lastAction     = PLAY;
            _fromIndexFrame = 0;
            _playUntil(indexFrame);
            emit(_self.CYCLE_START, {frame:frameEvent, action:_lastAction});
        }
        
        // Play a cycle from frame
        this.playFrom = function(frame){
            var frameEvent  = _currentFrame;
            _lastTime       = Date.now();
            indexFrame      = getIndexByFrame(frame);
            _currentFrame   = indexFrame+1;
            _frameIndex     = indexFrame;
            _fromIndexFrame = indexFrame;
            _lastAction     = PLAY_FROM;
            _playUntil(_framesList.length-1);
            emit(_self.CYCLE_START, {frame:frameEvent, action:_lastAction});
        }
        
        // Play cycle until frame
        this.playUntil = function(frame){
            var frameEvent  = _currentFrame;
            _lastTime       = Date.now();
            indexFrame      = getIndexByFrame(frame);
            _fromIndexFrame = _frameIndex;
            _lastAction     = PLAY_UNTIL;
            _playUntil(indexFrame);
            emit(_self.CYCLE_START, {frame:frameEvent, action:_lastAction});
        }
        
        // Play cycle between frames
        this.playBetween = function(fromFrame, untilFrame){
            var frameEvent  = _currentFrame;
            _lastTime       = Date.now();
            fromIndexFrame  = getIndexByFrame(fromFrame);
            untilIndexFrame = getIndexByFrame(untilFrame);
            _frameIndex     = fromIndexFrame;
            _fromIndexFrame = fromIndexFrame;
            _currentFrame   = fromIndexFrame+1;
            _lastAction     = PLAY_BETWEEN;
            _playUntil(untilIndexFrame);
            emit(_self.CYCLE_START, {frame:frameEvent, action:_lastAction});
        }
        
        // Stop cycle
        this.stop = function(){
            var frameEvent = _currentFrame;
            _lastTime      = Date.now();
            indexFrame     = _frameIndex;
            _currentFrame  = indexFrame+1;
            _endIndex      = indexFrame;
            _lastAction    = STOP;
            _currentFrame  = null;
            _lastAction    = null;
            emit(_self.CYCLE_START, {frame:frameEvent, action:_lastAction});
        }
        
        // Stop cycle at specific frame
        this.stopAt = function(frame){
            var frameEvent = _currentFrame;
            _lastTime      = Date.now();
            indexFrame     = getIndexByFrame(frame);
            _currentFrame  = indexFrame+1;
            _frameIndex    = Math.max(Math.min(indexFrame, _framesList.length), 0);
            _endIndex      = indexFrame;
            _lastAction    = STOP_AT;
            _currentFrame  = null;
            _lastAction    = null;
            emit(_self.CYCLE_START, {frame:frameEvent, action:_lastAction});
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
            var frameEvent = _currentFrame;
            _lastTime      = Date.now();
            indexFrame     = Math.max(Math.min(_frameIndex+1, _framesList.length), 0);
                           
            _currentFrame  = indexFrame+1;
            _frameIndex    = indexFrame;
            _endIndex      = indexFrame;
            _lastAction    = "nextFrame";
            emit(_self.CYCLE_START, {frame:frameEvent, action:_lastAction});
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
            var frameEvent = _currentFrame;
            _lastTime      = Date.now();
            indexFrame     = Math.max(Math.min(_frameIndex-1, _framesList.length), 0);
                           
            _currentFrame  = indexFrame+1;
            _frameIndex    = indexFrame;
            _endIndex      = indexFrame;
            _lastAction    = "prevFrame"; 
            emit(_self.CYCLE_START, {frame:frameEvent, action:_lastAction});
        }
        
        // Returns the totalFrames
        this.getTotalFrames = function(){
            return _totalFrames;
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
        
       // Returns if has button event handler
        this.hasButton = function(){
            return _hasButton;
        }
       
       // DEBUGGING
       this.debug = function(){
            
        }
        
        // HELPERS METHODS
        var emit = function(type, data){
            _emitter.emit(type, data);
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
            _currentFrame = indexRender+1;
            nowRender         = Date.now();
            
            if((nowRender - _lastTime) >= 1000/_frameRate){
                _lastTime = nowRender;
                if(_frameIndex !=  _endIndex){
                   _frameIndex += _increment;
                   _frameIndex = Math.max(0, _frameIndex);
                }else if(_increment != 0){
                    if(this.isLoop){
                        switch(_lastAction){
                            case PLAY_BETWEEN :
                            case PLAY_UNTIL :
                            case PLAY_FROM :
                            _frameIndex = _fromIndexFrame;
                                break;
                            case PLAY :
                                _frameIndex = 0;
                        }
                    }else{
                        _increment = 0;
                    }
                    
                    if(null != _lastAction){
                        emit(_self.CYCLE_END, {frame:_currentFrame, action:_lastAction});
                    }
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
            
            _innerCanvas.width  = bounds.width;
            _innerCanvas.height = bounds.height;
            
            _innerContext.save();
            _innerContext.globalAlpha = _self.alpha;
            
            var xXscale    = scaleXrender < 0 ? -_innerCanvas.width  : 0;
            var yYscale    = scaleYrender < 0 ? -_innerCanvas.height : 0;
            
            var translateX = (0.5 + xRender-minX+xXscale) << 0;
            var translateY = (0.5 + yRender-minY+yYscale) << 0;
            
            _innerContext.translate(translateX, translateY);
            _innerContext.rotate(rotationRender);
            
            scaleXrender = scaleXrender < 0 ? -1 : 1;
            scaleYrender = scaleYrender < 0 ? -1 : 1;
            
            _innerContext.scale(scaleXrender, scaleYrender);
            
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
                var pixel = _innerContext.getImageData(mouseX-minX, mouseY-minY, 1, 1).data;
                alphaRender = pixel[3];
                
                if(alphaRender > 0){
                    _clipMouse = _self;
                }
            }
            
            // MASK RENDER
            clipRender  = _mask;
            if(null != clipRender){
                clipData= clipRender.render(canvasWidth, canvasHeight, mouseX-minX, mouseY-minY, true);
                canvasRender = clipData.inner;
                if(null != canvasRender){
                    clipBounds = clipData.bounds;
                    x = clipBounds.minX;
                    y = clipBounds.minY;
                    x = (0.5 + (x-pivotXrender)* rx)        << 0;
                    y = (0.5 + (y-pivotYrender)* ry)        << 0;
                    w = (0.5 + (canvasRender.width   * rx)) << 0;
                    h = (0.5 + (canvasRender.height  * ry)) << 0;
                    _innerContext.globalCompositeOperation = DESTINATION_IN;
                    _innerContext.drawImage( canvasRender ,x ,y, w, h);
                    
                    alphaRender= _innerContext.getImageData(mouseX-minX, mouseY-minY, 1, 1).data[3];
                    if(alphaRender == 0){
                        _clipMouse = null;
                    }
                    
                    _innerContext.globalCompositeOperation = SOURCE_OVER;
                }
            }
            
            _innerContext.restore();
            renderMe();
            _innerCanvas.id = _self.name;
            
            var data        = {
                                  inner     : _innerCanvas, 
                                  clipMouse : _clipMouse, 
                                  bounds    : bounds, 
                                  x         : minX, 
                                  y         : minY
                              };
            
            emit(_self.RENDER, {});
            _self.debug(_innerCanvas, _self.name);
            return data;
        }
        
        // SET THE INITIAL IMAGE
        this.setImage(image);
    }
    
    // ::: PROPERTIES MEMBER ::: //
    var _mainCanvas = element;
    var _context    = _mainCanvas.getContext(D2);
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
        
        mouseCursor = DEFAULT;
        if(Boolean(_clipMouse) && _clipMouse.hasMouse()){
            mouseCursor = POINTER;
           
            if(_clipMouse != _lastClipOvered){
                resolveOut();
                _lastClipOvered = _clipMouse;
                _markToEmmit    = _clipMouse;
                _clipMouse.emitMouseEvent(MOUSE_OVER);
                _markToEmmit    = null;
             }
             
        }else {
            resolveOut();
        }
        _mainCanvas.style.cursor = mouseCursor;
    }
    
    var resolveOut = function(isLeave){
        if(Boolean(_lastClipOvered) && _lastClipOvered.hasMouse()){
            _markToEmmit = _lastClipOvered;
            _lastClipOvered.emitMouseEvent(MOUSE_OUT, _lastX, _lastY);
            if(isLeave){
                _lastClipOvered.emitMouseEvent(MOUSE_UP, _lastX, _lastY);
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
       //                                      canvasWidth, canvasHeight, mouseX, mouseY, asMask
        canvasData   = _stage.render(_mainCanvas.width, _mainCanvas.height, _lastX, _lastY, false);
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
        _mainContextOff       = _mainCanvasOff.getContext(D2);
        _mainCanvasOff.width  = _mainCanvas.width;
        _mainCanvasOff.height = _mainCanvas.height;
        
        _stage      = new Clip();
        _stage.name = STAGE;
        _stage.setImage(_mainCanvas);
        
        _mainCanvas.onmousemove = function(event) {
            event.preventDefault();
            _bounds  = _mainCanvas.getBoundingClientRect();
            _mouseX  = event.clientX;
            _mouseY  = event.clientY;
            _lastX   = (_mouseX - _bounds.left) * (_mainCanvas.width/_bounds.width);
            _lastY   = (_mouseY - _bounds.top) * (_mainCanvas.width/_bounds.width);
            hovering = resolveOver;
        };
        
        _mainCanvas.onclick = function(event){
            event.preventDefault();
            if(Boolean(_clipMouse) && _clipMouse.hasMouse()){
                _markToEmmit = _clipMouse;
                _clipMouse.emitMouseEvent(CLICK, _lastX, _lastY);
                _markToEmmit = null;
            }
        };
        
        _mainCanvas.onmousedown = function(event){
            event.preventDefault();
            if(Boolean(_clipMouse)&& _clipMouse.hasMouse()){
                _markToEmmit = _clipMouse;
                _clipMouse.emitMouseEvent(MOUSE_DOWN, _lastX, _lastY);
                _markToEmmit = null;
            }
        };
        
        _mainCanvas.onmouseup = function(event){
            event.preventDefault();
            if(Boolean(_clipMouse)&& _clipMouse.hasMouse()){
                _markToEmmit = _clipMouse;
                _clipMouse.emitMouseEvent(MOUSE_UP, _lastX, _lastY);
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