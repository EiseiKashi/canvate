window.Canvate = function(element) {
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
    
    var calculateBounds = function(theta,xx,yy,pivotX,pivotY,wwidth,hheight){
        var pivotXX;
        var pivotYY;
        var minX;
        var minY;
        var maxX;
        var maxY;
        var cos;
        var sin;
        var pxc;
        var pys;
        var pxs;
        var pyc;
        var pxw;
        var pyh
        var pwc;
        var pws;
        var phs;
        var phc;
        var x1;
        var y1;
        var x2;
        var y2;
        var x3;
        var y3;
        var x4;
        var y4;
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
        pwc = pxw * cos;
        pws = pxw * sin;
        phs = pyh * sin;
        phc = pyh * cos;
        x1  = pxc - pys + xx;
        y1  = pxs + pyc + yy;
        x2  = pwc - pys + xx;
        y2  = pws + pyc + yy;
        x3  = pwc- phs + xx;
        y3  = pws + phc + yy;
        x4  = pxc - phs + xx;
        y4  = pxs + phc + yy;
        
        minX = Math.min(Math.min(x1, x2), Math.min(x3, x4));
        minY = Math.min(Math.min(y1, y2), Math.min(y3, y4));
        
        maxX = Math.max(Math.max(x1, x2), Math.max(x3, x4));
        maxY = Math.max(Math.max(y1, y2), Math.max(y3, y4));
        
        return { minX   : minX        ,minY    : minY, 
                 maxX   : maxX        ,maxY    : maxY, 
                 width  : Math.abs(maxX-minX)   ,height  : Math.abs(maxY-minY)};
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
        
        this.TEXT_SET     = "textSet";
        this.IMAGE_SET    = "imageSet";
        this.IMAGE_LOADED = "imageLoaded";
        this.IMAGE_ERROR  = "imageError";
        this.CLIP_ADDED   = "clipAdded";
        this.CLIP_REMOVED = "clipRemoved";
        this.FRAME_UPDATE = "frameUpdate";
        this.RENDER       = "render";
        
        clipCounter++;
        var _id            = "clip" + clipCounter;
        _allClipList[_id]  = this;
        this.name          = _id;
        this.canvas;
        this.image         = new Image();
        this.image.crossOrigin = "Anonymous";
        this.x             = 0;
        this.y             = 0;
        this.width         = 0;
        this.height        = 0;
        this.cropX         = 0;
        this.cropY         = 0;
        this.cropWidth     = 0;
        this.cropHeight    = 0;
        this.alpha         = 1;
        this.scaleX        = 1;
        this.scaleY        = 1;
        this.rotation      = 0;
        this.pivotX        = 0;
        this.pivotY        = 0;
        this.frameIndex    = 0;
        this.totalFrames   = 1;
        this.frameRate     = 60;
        this.increment     = 0;
        this.visible       = true;
        this.background    = null;
        this.text;
        this.interline     = 1.313;
        this.fontSize      = 12;
        this.font          = "sans-serif";
        this.textAlign     = "start"; // end | center | left | right
        this.textBaseline  = "top";//bottom | middle
        this.fontColor     = "black";
        
        var _self          = this;
        var _isLoop        = false;
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
        
        var tileXsetCycle;
        var tileYsetCycle;
        var widthSetCycle;
        var heightSetCycle;
        var indexSetCycle;
        var gapX;
        var gapY;
        var tempCanvas  = document.createElement("canvas");
        var tempContext = tempCanvas.getContext("2d");
        var lastWidth;
        var indexFrame;
        var fromIndexFrame;
        var untilIndexFrame;
        var indexRender;
        var cropDataRender;
        var nowRender;
        var xRender;
        var yRender;
        var widthRender;
        var heightRender;
        var cropXrender;
        var cropYrender;
        var cropWidthRender;
        var cropHeightRender;
        var pivotXrender;
        var pivotYrender;
        var alphaRender;
        var canvasRender;
        var clipRender;
        var rotationRender;
        var scaleXrender;
        var scaleYrender;
        var bounds;
        
        // GETTERS
        this.findClipByName = function (name){
            for(var id in _allClipList){
                var clip = _allClipList[id];
                if(clip.name == name){
                    return _allClipList[id];
                }
            }
        }
        
        this.id  = function(){
            return _id;
        }
        
        this.parent = function (){
            return _parentClip[_id];
        }
        
        this.isMask = function(){
            return _maskClip[_id];
        }
        
        this.hasButton = function(){
            return _hasButton;
        }
        
        // SETTERS
        this.setPivot = function(num){
            var isNum = !(num == null || isNaN(num));
            if(!isNum){
                return;
            }
            
            this.pivotX = this.pivotY = num;
        }
        
        this.setScale = function(num){
            var isNum = !(num == null || isNaN(num));
            if(!isNum){
                return;
            }
            
            this.scaleX = this.scaleY = num;
        }
        
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
        
        this.setSize = function(width, height){
            var isNotWidth  = (width  == null) || (isNaN(width)  && width  != "auto");
            var isNotHeight = (height == null) || (isNaN(height) && height != "auto");
            
            if(isNotWidth || isNotHeight || (width == "auto" && height=="auto")){
                return;
            }
            
            if(null != _initialWidth || null != _initialHeight){
                if(width == "auto"){
                    width  = (this.height / _initialHeight) * _initialWidth;
                }
                
                if(height == "auto"){
                    height = (width / _initialWidth)   * _initialHeight;
                }
            }
            
            this.width   = width;
            this.height  = height;
        }
        
        this.setViewPort = function(width, height){
            if(null == width || null == height || isNaN(width) || isNaN(height)){
                return;
            }
            _canvasWidth  = width;
            _canvasHeight = height;
        }
        
        this.resetViewPort = function(){
            _canvasWidth  = null;
            _canvasHeight = null;
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
            
            this.setSize(Math.floor(width), "auto");
            
            var x  = Math.floor((maxWidth-width)/2);
            var y  = Math.floor((maxHeight-height)/2);
            
            this.x = x + (this.pivotX * width)  + offsetX;
            this.y = y + (this.pivotY * height) + offsetY;
        }
        
        this.fitHeight = function(){
            this.setSize("auto", this.height);
        }
        
        this.fitWidth = function(){
            this.setSize(this.width, "auto");
        }
        
        this.setImage = function(image, width, height){
            if(null == image){
                // Early return
                return;
            }
            
            this.image         = image;
            this.image.crossOrigin = "Anonymous";
            _initialWidth      = image.width;
            _initialHeight     = image.height;
            this.canvas        = document.createElement('canvas');
            this.canvas.width  = _initialWidth;
            this.canvas.height = _initialHeight;
            var imageContext   = this.canvas.getContext('2d');
            imageContext.drawImage(image, 0, 0, _initialWidth, _initialHeight);
            
            this.setSize(width ==undefined?this.width :width, 
                         height==undefined?this.height:height);
            
            this.width      = null == this.width      || 0 == this.width      ? _initialWidth  : this.width;
            this.height     = null == this.height     || 0 == this.height     ? _initialHeight : this.height;
            this.cropWidth  = null == this.cropWidth  || 0 == this.cropWidth  ? _initialWidth  : this.cropWidth;
            this.cropHeight = null == this.cropHeight || 0 == this.cropHeight ? _initialHeight : this.cropHeight;
            
            this.setCycle({x:this.cropX, y:this.cropY, width:this.cropWidth, height:this.cropHeight});
            emit(this.IMAGE_SET, {image:image})
        }
        
        this.setCycle = function(tile){
            tileXsetCycle  = this.cropX      = null == tile.x      || isNaN(tile.x)      ? this.cropX      : tile.x;
            tileYsetCycle  = this.cropY      = null == tile.y      || isNaN(tile.y)      ? this.cropY      : tile.y;
            widthSetCycle  = this.cropWidth  = null == tile.width  || isNaN(tile.width)  ? this.cropWidth  : tile.width;
            heightSetCycle = this.cropHeight = null == tile.height || isNaN(tile.height) ? this.cropHeight : tile.height;
            
            gapX             = null == tile.gapX || isNaN(tile.gapX) ? 0 : tile.gapX;
            gapY             = null == tile.gapY || isNaN(tile.gapY) ? 0 : tile.gapY;
            
            if(null == tile.totalFrames || isNaN(tile.totalFrames)){
                var totalWidth  = Math.floor(this.image.width/widthSetCycle);
                var totalHeight = Math.floor(this.image.height/heightSetCycle);
                totalFrames     = this.totalFrames = totalWidth * totalHeight;
            }
            
            if(this.totalFrames == 0){
                this.totalFrames = 1;
            }
            
            canvas        = document.createElement('canvas');
            canvas.width  = widthSetCycle*this.totalFrames;
            canvas.height = heightSetCycle;
            context       = canvas.getContext('2d');
            this.canvas   = canvas;
            this.context  = context;
            
            _framesList.length = 0;
            var rowX;
            for(indexSetCycle=0; indexSetCycle < this.totalFrames; indexSetCycle++){
                rowX = widthSetCycle*indexSetCycle;
                
                _framesList.push({
                                        x      : rowX,
                                        y      : 0,
                                        width  : widthSetCycle,
                                        height : heightSetCycle
                                    });
                
                context.drawImage(this.image, 
                                  tileXsetCycle, tileYsetCycle, 
                                  widthSetCycle, heightSetCycle, 
                                  rowX, 0, 
                                  widthSetCycle, heightSetCycle);
                
                tileXsetCycle += widthSetCycle;
                if(tileXsetCycle >= _initialWidth){
                    tileXsetCycle = 0;
                    tileYsetCycle += heightSetCycle;
                    if(this.cropY > _initialHeight){
                        throw new Error("The total frames is out of bound");
                    }
                }
            }
        }
        
        this.setBackground = function(fillStyle){
            this.background = fillStyle;
        }
        
        this.setText = function(text, size, font, color){
            this.text      = text;
            this.fontSize  = null == size  ? this.fontSize  : 12;
            this.font      = null == font  ? this.font      : font;
            this.fontColor = null == color ? this.fontColor : color;
            emit(this.TEXT_SET, {text:this.text});
        }
        
        this.setRect = function(width, height, color){
            if(null == width || null == height || isNaN(width) || isNaN(height)){
                return;
            }
            
            _self.width        = null;
            _self.height       = null;
            _self.cropWidth    = null;
            _self.cropHeight   = null;
            
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
        this.captureCrop = function(image, x, y, width, height){
            if(null == image){
                return;
            }
            image.crossOrigin = "Anonymous";
            var x      = null == x      ? 0            : x;
            var y      = null == y      ? 0            : y;
            var width  = null == width  ? image.width  : width;
            var height = null == height ? image.height : height;
            
            lastWidth         = this.canvas.width;
            tempCanvas.width  = lastWidth + width;
            tempCanvas.height = Math.max(this.canvas.height, height);
            
            tempContext.drawImage(this.canvas, 0,0);
            
            _framesList.push({
                                    x      : lastWidth + x, 
                                    y      : y, 
                                    width  : width, 
                                    height : height
                                });
                                
            tempContext.drawImage(image, 
                                  x, y, 
                                  width, height, 
                                  lastWidth + x, 0, 
                                  width, height);
            
            this.canvas.width  = tempCanvas.width;
            this.canvas.height = tempCanvas.height;
            this.context.drawImage(tempCanvas, 0, 0);
        }
        
        this.loadImage = function(url, width, height){
            this.canvas = null;
            _initialWidth   = null;
            _initialHeight  = null;
            
            var image        = new Image();
                image.onload = function() {
                    _self.setImage(image, width, height);
                    emit(this.IMAGE_LOADED, {image:image})
                }
                
                image.onerror = function(event){
                    emit(this.IMAGE_ERROR, {url:url})
                }
                
                image.src = url + '?' + new Date().getTime();
                image.crossOrigin = "Anonymous";
        }
        
        this.cropImage = function(x, y, width, height){
            var x       = null == x      ? this.cropX      : x;
            var y       = null == y      ? this.cropY      : y;
            var width   = null == width  ? this.cropWidth  : width;
            var height  = null == height ? this.cropHeight : height;
            this.width  = width;
            this.height = height;
            this.setCycle({x:x, y:y, width:width, height:height});
        }
        
        //CHILDREN
        this.getRect = function(width, height, color){
            var clip = this.getClip();
                clip.setRect(width, height, color);
            return clip;
        }
        
        this.getClip = function(image){
            return new Clip(image);
        }
        
        this.addNewClip = function(image){
            var clip = new Clip(image);
            this.addClip(clip);
            return clip;
        }
        
        this.getClipAt = function(index){
            return _clipList[index];
        }
        
        this.addClip = function(clip, width, height){
            if(null == clip || clip == this){
                // Early return
                return;
            }
            
            this.addClipAt(clip, _clipList.length);
        }
        
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
            emit(this.CLIP_ADDED, {parent:parent});
        }
        
        this.removeClip = function(clip){
            if(null == clip || clip == this){
                return;
            }
            var length = _clipList.length;
            var clipTmp;
            for(var index=0; index <length; index++){
                clipTmp = _clipList[index];
                if(clipTmp == clip){
                     this.removeClipAt(index);
                }
            }
        }
        
        this.removeClipAt = function(indexTarget){
            if(isNaN(indexTarget || indexTarget < 0 || !(indexTarget < _clipList.length))){
                return;
            }
            var clip = _clipList.splice(indexTarget, 1)[0];
            var parent = _parentClip[clip.id()];
                _parentClip[clip.id()] = null;
            emit(this.CLIP_REMOVED, {parent:parent});
            return clip;
        }
        
        this.removeAllClips = function(){
            while(_clipList.length > 0){
                this.removeClipAt(0);
            }
        }
        
        this.getTotalClip = function(){
            return _clipList.length;
        }
        
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
        
        this.swapClips = function (clip1, clip2){
            if(null == clip1 || null == clip2){
                return;
            }
            
            var index1;
            var index2;
            var clip;
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
        
        this.toFront = function (clip){
            if(null == clip){
                return;
            }
            this.setDepth(clip, _clipList.length-1);
        }
        
        this.toBack = function (clip){
            if(null == clip){
                return;
            }
            this.setDepth(clip, 0);
        }
        
        // FRAME
        this.clearFrames = function(){
            _framesList.length  = 0;
            this.canvas.width   = 0;
            this.canvas.height  = 0;
        }
        
        var _playUntil = function (index){
            _self.increment = _self.frameIndex >= index ? -1 : 1;
            _self.endIndex  = index;
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
        
        this.play = function(onFrame){
            if(onFrame != null){
                this.onFrame = onFrame;
            }
            _self.lastTime   = Date.now();
            indexFrame       = _framesList.length-1;
            _self.lastAction = "play";
            _playUntil(indexFrame);
        }
        
        this.playLoop = function(onFrame){
            if(onFrame != null){
                this.onFrame = onFrame;
            }
            _self.lastTime   = Date.now();
            indexFrame       = _framesList.length-1;
            _self.lastAction = "playLoop";
            _playUntil(indexFrame);
        }
        
        this.playFrom = function(frame, onFrame){
            if(onFrame != null){
                this.onFrame = onFrame;
            }
            _self.lastTime     = Date.now();
            indexFrame         = getIndexByFrame(frame);
            _self.currentFrame = indexFrame+1;
            _self.frameIndex   = indexFrame;
            _self.lastAction = "playFrom";
            _playUntil(_framesList.length-1);
        }
        
        this.playUntil = function(frame, onFrame){
            if(onFrame != null){
                this.onFrame = onFrame;
            }
            _self.lastTime   = Date.now();
            indexFrame       = getIndexByFrame(frame);
            _self.lastAction = "playUntil";
            _playUntil(indexFrame);
        }
        
        this.playBetween = function(fromFrame, untilFrame, onFrame){
            if(onFrame != null){
                this.onFrame = onFrame;
            }
            _self.lastTime   = Date.now();
            fromIndexFrame   = getIndexByFrame(fromFrame);
            untilIndexFrame  = getIndexByFrame(untilFrame);
            _self.frameIndex = fromIndexFrame;
            if(_self.frameIndex == -1){
                debugger;
            }
            _self.currentFrame = fromIndexFrame+1;
            _self.lastAction   = "playBetween";
            _playUntil(untilIndexFrame);
        }
        
        this.stop = function(onFrame){
            if(onFrame != null){
                this.onFrame = onFrame;
            }
            _self.lastTime     = Date.now();
            indexFrame         = _self.frameIndex;
            _self.currentFrame = indexFrame+1;
            _self.endIndex     = indexFrame;
            _self.lastAction   = "stop";
        }
        
        this.stopAt = function(frame, onFrame){
            if(onFrame != null){
                this.onFrame = onFrame;
            }
            _self.lastTime     = Date.now();
            indexFrame         = getIndexByFrame(frame);
            _self.currentFrame = indexFrame+1;
            _self.frameIndex   = Math.max(Math.min(indexFrame, _framesList.length), 0);
            _self.endIndex     = indexFrame;
            _self.lastAction   = "stopAt";
        }
        
        this.nextFrame = function(onFrame){
            if(_self.frameIndex >= _framesList.length-1){
                // Early return
                return;
            }
            
            if(onFrame != null){
                this.onFrame = onFrame;
            }
            
            _self.lastTime     = Date.now();
            indexFrame         = Math.max(Math.min(_self.frameIndex+1, _framesList.length), 0);
            _self.currentFrame = indexFrame+1;
            _self.frameIndex   = indexFrame;
            _self.endIndex     = indexFrame;
            _self.lastAction   = "nextFrame";
        }
        
        this.prevFrame = function(onFrame){
            if(_self.frameIndex == 0){
                // Early return
                return;
            }
            
            if(onFrame != null){
                this.onFrame = onFrame;
            }
            
            _self.lastTime     = Date.now();
            indexFrame         = Math.max(Math.min(_self.frameIndex-1, _framesList.length), 0);
            _self.currentFrame = indexFrame+1;
            _self.frameIndex   = indexFrame;
            _self.endIndex     = indexFrame;
            _self.lastAction   = "prevFrame";
        }
        
        // RENDER
        this.setMask = function(mask, type){
            if(null == mask){
                // Early return
                return;
            }
            
            _maskClip[mask.id()] = this;
            _typeMask            = _maskTypes[type] || _maskTypes.mask;
            _mask                = mask;
        }
        
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
            _self.debug(type);
            if(_markToEmmit == this){
                emit(type, {x:x-_self.x, y:y-_self.y});
            }
        }
        
        this.hasMouse = function(){
            return _hasMouse;
        }
        
        this.addEventListener = function (type, listener, context){
            _emitter.addEventListener(type, listener, context);
            _hasMouse = _emitter.hasMouse();
        }
        
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
            
            if((_clipList.length == 0 && null == this.canvas) || false == this.visible || this.isMask() && !asMask){
                return {};
            }
            
            indexRender     = this.frameIndex;
            cropDataRender  = _framesList[indexRender];
            try{
                this.cropX      = cropDataRender.x;
                this.cropY      = cropDataRender.y;
                this.cropWidth  = cropDataRender.width;
                this.cropHeight = cropDataRender.height;
            }catch(error){
                var name = this.name;
                //debugger
            }
            
            // FRAME RENDER
            this.currentFrame = indexRender+1;
            nowRender         = Date.now();
            
            if((nowRender - this.lastTime) >= 1000/this.frameRate){
                this.lastTime = nowRender;
                if(this.frameIndex !=  this.endIndex){
                   this.frameIndex += this.increment;
                   this.frameIndex = Math.max(0, this.frameIndex);
                }else if(this.increment != 0){
                    this.increment = 0;
                    emit(this.FRAME_UPDATE, {frame:this.currentFrame, action:this.lastAction})
                    
                    if(this.lastAction == "playLoop"){
                        this.frameIndex = 0;
                        this.playLoop(this.onFrame);
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
            cropXrender      = this.cropX;
            cropYrender      = this.cropY;
            cropWidthRender  = this.cropWidth;
            cropHeightRender = this.cropHeight;
            rotationRender   = this.rotation * (Math.PI)/180;
            
            ///////////////////////////////////////////////////////////////////
            var minX;
            var minY;
            var maxX;
            var maxY;
            
            var pivotX;
            var pivotY;
            var bounds;
            var clipBounds;
            var renderList = [];
            ///////////////////////////////////////////////////////////////////
            
            var renderNew = function(){
                minX = null;
                minY = null;
                maxX = null;
                maxY = null;
                if(null != _self.canvas){
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
                if(null != _self.canvas){
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
                
                if(null != _self.canvas){
                    cropXrender      = (0.5 + cropXrender)      << 0;
                    cropYrender      = (0.5 + cropYrender)      << 0;
                    cropWidthRender  = (0.5 + cropWidthRender)  << 0;
                    cropHeightRender = (0.5 + cropHeightRender) << 0;
                    pivotXrender     = (0.5 + pivotXrender)     << 0;
                    pivotYrender     = (0.5 + pivotYrender)     << 0;
                    widthRender      = (0.5 + widthRender)      << 0;
                    heightRender     = (0.5 + heightRender)     << 0;
                    
                    _innerContext.drawImage( _self.canvas
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
                
                var canvas;
                var x;
                var y;
                var w;
                var h;
                
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
            _self.debug(_clipMouse);
            return data;
        }
        
        // SET THE INITIAL IMAGE
        this.setImage(image);
    }
    
    // ::: PROPERTIES MEMBER ::: //
    var _mainCanvas = element;
    var _context    = _mainCanvas.getContext("2d");
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
    var hovering = function(){};
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