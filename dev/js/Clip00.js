    // ::: CLIP ::: //
    var ClipClass = function (image){
        clipCounter++;
        var _id            = "clip" + clipCounter;
        _allClipList[_id]  = this;
        
        this.name          = _id;
        this.canvas;
        this.framesList    = [];
        this.image         = new Image();
        this.x             = 0;
        this.y             = 0;
        this.width         = null;
        this.height        = null;
        this.cropX         = 0;
        this.cropY         = 0;
        this.cropWidth     = null;
        this.cropHeight    = null;
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
        this.fillStyle     = null;
        
        var _isLoading     = false;
        var _isLoop        = false;
        var _self          = this;
        var _canvasOff     = document.createElement("canvas");
        var _contextOff    = _canvasOff.getContext('2d');
        var _clipList      = [];
        var _initialWidth  = null;
        var _initialHeight = null;
        var _mask;
        var _preWidth;
        var _preHeight;
        var _fillStyle;
        var _imageCanvas;
        var _clipMouse;
        var _maskId;
        var _fitSide = null;
        
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
        
        if(null != _duplicatedClips[_id]){
            var data = _duplicatedClips[_id].data;
            var clip = _duplicatedClips[_id].clip;
            
            _isLoop             = data._isLoop;
            _clipList           = data._clipList;
            _isBackground       = data._isBackground;
            _initialWidth       = data._initialWidth;
            _initialHeight      = data._initialHeight;
            _colorBackground    = data._colorBackground;
            _mask               = data._mask;
            _earlyWidth         = data._earlyWidth;
            _earlyHeight        = data._earlyHeight;
            _fillStyle          = data._fillStyle;
            _clipMouse          = data._clipMouse;
            _displayBackground  = data._displayBackground;
            _maskId             = data._maskId;
            
            this.canvas         = data.canvas;
            this.context        = data.context;
            this.canvas         = clip.canvas;
            this.image          = clip.image;
            this.x              = clip.x;
            this.y              = clip.y;
            this.width          = clip.width;
            this.height         = clip.height;
            this.cropX          = clip.cropX;
            this.cropY          = clip.cropY;
            this.cropWidth      = clip.cropWidth;
            this.cropHeight     = clip.cropHeight;
            this.alpha          = clip.alpha;
            this.scaleX         = clip.scaleX;
            this.scaleY         = clip.scaleY;
            this.rotation       = clip.rotation;
            this.pivotX         = clip.pivotX;
            this.pivotY         = clip.pivotY;
            this.frameIndex     = clip.frameIndex;
            this.totalFrames    = clip.totalFrames;
            this.frameRate      = clip.frameRate;
            this.increment      = clip.increment;
            this.visible        = clip.visible;
            
            _duplicatedClips[_id] = {};
            _duplicatedClips[_id] =  undefined;
        }
        
        this.duplicate = function(){
            var data = {}
            var canvas    = document.createElement("canvas");
            var context   = canvas.getContext("2d");
            canvas.width  = this.canvas.width;
            canvas.height = this.canvas.height;
            context.drawImage(this.canvas, 0, 0);
            
            data._framesList = [];
            var length       = _framesList.length;
            var frame;
            for(var index = 0; index < length; index++){
                frame = _framesList[index];
                var obj = {};
                for(var props in frame){
                    obj[props] = frame[props];
                    data._framesList.push(obj);
                }
            }
            
            data.canvas         = canvas;
            data.context        = context;
            data._isLoop        = _isLoop;
            data._clipList      = _clipList.slice();
            data._initialWidth  = _initialWidth;
            data._initialHeight = _initialHeight;
            data._mask          = _mask;
            data._clipMouse     = _clipMouse;
            data._maskId        = _maskId;
            
            var clip = this.getClip(this.image);
            var obj  = {clip : this, data : data};
            _duplicatedClips[clip.id()] = obj;
        }
        
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
        
        this.setImage = function(image){
            if(null == image){
                // Early return
                return;
            }
            
            this.image          = image;
            this.canvas         = document.createElement('canvas');
            this.canvas.width   = image.width;
            this.canvas.height  = image.height;
            var imageContext    = this.canvas.getContext('2d');
            imageContext.drawImage(image, 0, 0, image.width, image.height);
            
            _initialWidth       = image.width;
            _initialHeight      = image.height;
            
            this.setSize(this.width, this.height);
            
            this.width      = null == this.width      ? _initialWidth  : this.width;
            this.height     = null == this.height     ? _initialHeight : this.height;
            this.cropWidth  = null == this.cropWidth  ? _initialWidth  : this.cropWidth;
            this.cropHeight = null == this.cropHeight ? _initialHeight : this.cropHeight;
            
            this.setCycle({x:this.cropX, y:this.cropY, width:this.cropWidth, height:this.cropHeight});
        }
        
        this.setCycle = function(tile){
            tileXsetCycle    = this.cropX        = null == tile.x      || isNaN(tile.x)      ? this.cropX      : tile.x;
            tileYsetCycle    = this.cropY        = null == tile.y      || isNaN(tile.y)      ? this.cropY      : tile.y;
            widthSetCycle    = this.cropWidth    = null == tile.width  || isNaN(tile.width)  ? this.cropWidth  : tile.width;
            heightSetCycle   = this.cropHeight   = null == tile.height || isNaN(tile.height) ? this.cropHeight : tile.height;
            
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
            
            this.framesList.length = 0;
            var rowX;
            for(indexSetCycle=0; indexSetCycle < this.totalFrames; indexSetCycle++){
                rowX = widthSetCycle*indexSetCycle;
                
                this.framesList.push({
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
        
        // FRAMES
        this.clearFrames = function(){
            this.framesList.length  = 0;
            this.canvas.width       = 0;
            this.canvas.height      = 0;
        }
        
        this.addFrame = function(x, y, width, height){
            var x      = null == x      ? this.cropX      : x;
            var y      = null == y      ? this.cropY      : y;
            var width  = null == width  ? this.cropWidth  : width;
            var height = null == height ? this.cropHeight : height;
            
            lastWidth         = this.canvas.width;
            tempCanvas.width  = lastWidth + width;
            tempCanvas.height = Math.max(this.canvas.height, height);
            
            tempContext.drawImage(this.canvas, 0,0);
            
            this.framesList.push({
                                    x      : lastWidth + x, 
                                    y      : y, 
                                    width  : width, 
                                    height : height
                                });
                                
            tempContext.drawImage(this.image, 
                                  x, y, 
                                  width, height, 
                                  lastWidth + x, 0, 
                                  width, height);
            
            this.canvas.width  = tempCanvas.width;
            this.canvas.height = tempCanvas.height;
            this.context.drawImage(tempCanvas, 0, 0);
        }
        
        this.captureCrop = function(image, x, y, width, height){
            if(null == image){
                return;
            }
            var x      = null == x      ? 0            : x;
            var y      = null == y      ? 0            : y;
            var width  = null == width  ? image.width  : width;
            var height = null == height ? image.height : height;
            
            lastWidth         = this.canvas.width;
            tempCanvas.width  = lastWidth + width;
            tempCanvas.height = Math.max(this.canvas.height, height);
            
            tempContext.drawImage(this.canvas, 0,0);
            
            this.framesList.push({
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
        
        this.loadImage = function(url, onLoad, onError){
            this.canvas = null;
            _initialWidth   = null;
            _initialHeight  = null;
            
            var image        = new Image();
                image.onload = function() {
                    _self.setImage(image);
                    if(typeof onLoad === "function"){
                        onLoad(image);
                    }
                }
                
                image.onerror = function(){
                    if(typeof onError === "function"){
                        onError(_self, url);
                    }
                }
                
                image.src = url + '?' + new Date().getTime();
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
        
        var resetSize = function(){
            _self.width        = null;
            _self.height       = null;
            _self.cropWidth    = null;
            _self.cropHeight   = null;
        }
        
        this.hideOverflow = function(width, height){
            var canvas        = document.createElement('canvas');
                canvas.width  = width;
                canvas.height = height;
            resetSize();
            this.setImage(canvas);
            this.render(canvasWidthLast, canvasHeightLast, mouseXLast, mouseYLast, asMaskLast);
        }
        
        //CHILDREN
        this.getRect = function(width, height, color){
            var clip = this.getClip();
                clip.setRect(width, height, color);
            return clip;
        }
        
        this.setRect = function(width, height, color){
            if(null == width || null == height || isNaN(width) || isNaN(height)){
                return;
            }
            
            resetSize();
            
            var canvas            = document.createElement("canvas");
                canvas.width      = width;
                canvas.height     = height;
           
            var context           = canvas.getContext("2d");
                context.fillStyle = color;
                context.fillRect(0,0,width,height);
            
            var img = document.createElement("img");
                img.src = canvas.toDataURL('image/png');
            
            this.setImage(canvas);
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
            
            if(null == this.canvas){
                var image        = new Image();
                    image.width  = this.width ==  null ? _mainCanvas.width  : this.width;
                    image.height = this.height == null ? _mainCanvas.height : this.height;
                this.setImage(image);
            }
            
            var parent = clip.parent();
            if(parent != null){
                parent.removeClip(clip);
            }
            _clipList.splice(indexTarget, 0, clip);
            _parentClip[clip.id()] = this;
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
            _parentClip[clip.id()] = null;
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
        
        this.switchShapes = function (clip1, clip2){
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
        
        this.oneDepthBack = function (clip){
            if(null == clip){
                return;
            }
            var length      = _clipList.length;
            var indexTarget = Math.min(Math.max(indexTarget, 0), length-1);
            
            var clipTmp;
            for(var index=0; index <length; index++){
                clipTmp = _clipList[index];
                if(clipTmp == clip){
                    var indexTarget = Math.min(Math.max(index-1, 0), length-1);
                    _clipList.splice(indexTarget, 0, _clipList.splice(index, 1)[0]);
                }
            }
        }
        
        this.onDepthFront = function (clip){
            if(null == clip){
                return;
            }
            var length      = _clipList.length;
            var indexTarget = Math.min(Math.max(indexTarget, 0), length-1);
            
            var clipTmp;
            for(var index=0; index <length; index++){
                clipTmp = _clipList[index];
                if(clipTmp == clip){
                    var indexTarget = Math.min(Math.max(index+1, 0), length-1);
                    _clipList.splice(indexTarget, 0, _clipList.splice(index, 1)[0]);
                }
            }
        }
        
        // FRAME
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
            indexFrame = indexFrame >= _self.framesList.length ? _self.framesList.length-1 : indexFrame;
            
            return indexFrame;
        }
        
        this.play = function(onFrame){
            if(onFrame != null){
                this.onFrame = onFrame;
            }
            _self.lastTime   = Date.now();
            indexFrame       = _self.framesList.length-1;
            _self.lastAction = "play";
            _playUntil(indexFrame);
        }
        
        this.playLoop = function(onFrame){
            if(onFrame != null){
                this.onFrame = onFrame;
            }
            _self.lastTime   = Date.now();
            indexFrame       = _self.framesList.length-1;
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
            _playUntil(_self.framesList.length-1);
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
            _self.frameIndex   = Math.max(Math.min(indexFrame, this.framesList.length), 0);
            _self.endIndex     = indexFrame;
            _self.lastAction   = "stopAt";
        }
        
        this.nextFrame = function(onFrame){
            if(_self.frameIndex >= _self.framesList.length-1){
                // Early return
                return;
            }
            
            if(onFrame != null){
                this.onFrame = onFrame;
            }
            
            _self.lastTime     = Date.now();
            indexFrame         = Math.max(Math.min(_self.frameIndex+1, this.framesList.length), 0);
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
            indexFrame         = Math.max(Math.min(_self.frameIndex-1, this.framesList.length), 0);
            _self.currentFrame = indexFrame+1;
            _self.frameIndex   = indexFrame;
            _self.endIndex     = indexFrame;
            _self.lastAction   = "prevFrame";
        }
        
        this.debug = function(){
            
        }
        
        // RENDER
        this.setMask = function(mask, type){
            // source-over     : default
            // source-in       : renders source only in the intersections
            // source-out      : renders source only in the non intersections
                
            // source-atop     : renders the base and the interseccion with source
                
            // destination-in  : renders base only in the intersections
            // destination-out : renders base only in the non intersection
                
            // xor             : erases only intersection
            
            if(null == mask){
                // Early return
                return;
            }
            
            _maskClip[mask.id()] = this;
            _typeMask            = _maskTypes[type] || _maskTypes.mask;
            _mask                = mask;
        }
        
        this.removeMask = function(){
            if(_mask == null){
                // Early return
                return;
            }
            _typeMask = "source-over";
            _maskClip[_mask.id()] = null;
            _mask = null;
        }
        this.log = function(){}
        var canvasWidthLast
        var canvasHeightLast
        var mouseXLast
        var mouseYLast
        var asMaskLast
        this.render = function(canvasWidth, canvasHeight, mouseX, mouseY, asMask){
            canvasWidthLast  = canvasWidth
            canvasHeightLast = canvasHeight
            mouseXLast       = mouseX
            mouseYLast       = mouseY
            asMaskLast       = asMask
            if(null == this.canvas || false == this.visible || this.isMask() && !asMask){
                return {};
            }
            _clipMouse        = null
            _canvasOff.width  = 0;
            _canvasOff.height = 0;
            
            _canvasOff.width  = Math.max(canvasWidth, this.width);
            _canvasOff.height = Math.max(canvasHeight, this.height);
            
            indexRender     = this.frameIndex;
            cropDataRender  = this.framesList[indexRender];
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
            
            if((nowRender - this.lastTime) >= 1000/this.frameRate){//Is time to render?
                this.lastTime = nowRender;
                if(this.frameIndex !=  this.endIndex){
                   this.frameIndex += this.increment;
                   this.frameIndex = Math.max(0, this.frameIndex);
                }else if(this.increment != 0){
                    this.increment = 0;
                    if(this.onFrame != null){
                        this.onFrame(this.currentFrame, Math.floor(this.cropY/this.cropHeight), this.lastAction);
                    }
                    if(this.lastAction == "playLoop"){
                        this.frameIndex = 0;
                        this.playLoop(this.onFrame);
                    }
                }
            }
            
            _contextOff.save();
            widthRender      = (0.5 + this.width)  << 0;
            heightRender     = (0.5 + this.height) << 0;
            cropXrender      = (0.5 + this.cropX)  << 0;
            cropYrender      = (0.5 + this.cropY)  << 0;
            cropWidthRender  = (0.5 + this.cropWidth)  << 0;
            cropHeightRender = (0.5 + this.cropHeight) << 0;
            pivotXrender     = (0.5 + this.pivotX*widthRender)  << 0;
            pivotYrender     = (0.5 + this.pivotY*heightRender) << 0;
            xRender          = (0.5 + this.x) << 0;
            yRender          = (0.5 + this.y) << 0;
            rotationRender   = this.rotation * (Math.PI*2)/360;
            scaleXrender     = this.scaleX
            scaleYrender     = this.scaleY
            
            this.debug({  x:xRender
                         ,y:yRender
                         ,width:widthRender*scaleXrender
                         ,height:heightRender*scaleYrender
                         ,pivotX:xRender-(widthRender*scaleXrender*this.pivotX)
                         ,pivotY:yRender-(heightRender*scaleYrender*this.pivotY)
                         ,radians:rotationRender
                       })
            _contextOff.globalAlpha = this.alpha;
            _contextOff.translate(xRender, yRender);
            _contextOff.rotate(rotationRender);
            _contextOff.scale(scaleXrender, scaleYrender);
            
            if(this.fillStyle != null){
                _contextOff.fillStyle = this.fillStyle;
                _contextOff.fillRect(-pivotXrender, 
                                     -pivotYrender, 
                                     widthRender, 
                                     heightRender);
            }
            
            _contextOff.drawImage( this.canvas
                                  ,cropXrender,     cropYrender
                                  ,cropWidthRender, cropHeightRender
                                  ,-pivotXrender,   -pivotYrender
                                  ,widthRender,     heightRender);
             
            // RENDER CHILDREN
            var length = _clipList.length;
            for(indexRender = 0; indexRender < length; indexRender++){
                clipRender = _clipList[indexRender];
                clipData= clipRender.render(canvasWidth, canvasHeight, mouseX-this.x, mouseY-this.y);
                canvasRender = clipData.canvas;
                if(null != canvasRender){
                    _contextOff.drawImage( canvasRender
                                          ,cropXrender,     cropYrender
                                          ,cropWidthRender, cropHeightRender
                                          ,-pivotXrender,   -pivotYrender
                                          ,widthRender,     heightRender);
                    if(null != clipData.clip){
                        _clipMouse = clipData.clip;
                    }
                }
            }
            
            // MASK RENDER
            clipRender  = _mask;
            if(null != clipRender){
                clipData = clipRender.render(canvasWidth, canvasHeight, mouseX-this.x, mouseY-this.y, true);
                canvasRender = clipData.canvas;
                if(null != canvasRender){
                    _contextOff.globalCompositeOperation = 'destination-in';
                    _contextOff.drawImage( canvasRender
                                          ,cropXrender,     cropYrender
                                          ,cropWidthRender, cropHeightRender
                                          ,-pivotXrender,   -pivotYrender
                                          ,widthRender,     heightRender);
                    
                    alphaRender= _contextOff.getImageData(mouseX, mouseY, 1, 1).data[3];
                    if(alphaRender == 0){
                        _clipMouse = null;
                    }
                }
                _contextOff.globalCompositeOperation = 'source-over';
            }else if (null == _clipMouse){
                var pixel = _contextOff.getImageData(mouseX, mouseY, 1, 1).data;
                alphaRender = pixel[3];
                
                if(alphaRender > 0){
                    _clipMouse = this;
                }
            }
            
            _contextOff.restore();
            
            // RETURN CANVAS AND CLIP MOUSE
            return {canvas:_canvasOff, clip:_clipMouse};
        }
        
        // SET THE INITIAL IMAGE
        this.setImage(image);
    }
