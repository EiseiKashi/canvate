var Canvate = function (image){
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
        this.render(0, 0);
        var width  = this.bounds.width;
        var height = this.bounds.height;
        var ratio  = Math.min(maxWidth / width, maxHeight / height);
            width  = this.width  * ratio;
            height = this.height * ratio;
        
        this.setSize(width, height);
        
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

    this.setImage = function(image){
        if(null == image){
            // Early return
            return;
        }
        _image             = image;
        _image.crossOrigin = ANONYMOUS;
        
        _initialWidth  = image.naturalWidth;
        _initialHeight = image.naturalHeight;
        
        _initialWidth  = null == _initialWidth  ? image.width  : _initialWidth;
        _initialHeight = null == _initialHeight ? image.height : _initialHeight;

        this.width     = null == this.width  || 0 == this.width  ? _initialWidth  : this.width;
        this.height    = null == this.height || 0 == this.height ? _initialHeight : this.height;
        this.setSize(this.width, this.height);
        
        _text = null;
        
        _cropWidth  = null == _cropWidth  || 0 == _cropWidth  ? _initialWidth  : _cropWidth;
        _cropHeight = null == _cropHeight || 0 == _cropHeight ? _initialHeight : _cropHeight;
        
        this.setCycle(_cropX, _cropY, _cropWidth, _cropHeight);
        emit(_self.IMAGE_SET, {image:image})
    }

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
        
        _framesList.length = 0;
        var rowX;
        for(indexSetCycle=0; indexSetCycle < _totalFrames; indexSetCycle++){
            rowX = widthSetCycle*indexSetCycle;
            
            _framesList.push({
                                x      : tileXsetCycle,
                                y      : tileYsetCycle,
                                width  : widthSetCycle,
                                height : heightSetCycle
                            });
            
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
    
    this.setImageById = function(id){
        var image = document.getElementById(id);
            image.crossOrigin = ANONYMOUS;
        if(image == null){
            throw "There is no element with the id: " + id;
            return;
        }
        this.setImage(image);
        return image;
    }
    
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
    
    this.setMask = function(mask, type){
        if(null == mask){
            // Early return
            return;
        }
        _maskClip[mask.getId()] = this;
        _mask                   = mask;
    }
    
    this.removeMask = function(){
        if(_mask == null){
            // Early return
            return;
        }
        _maskClip[_mask.getId()] = null;
        delete _maskClip[_mask.getId()];
        _mask                    = null;
    }
    
    this.isMask = function(){
        return null != _maskClip[_id];
    }
    
    this.setBackground = function(fillStyle){
        this.background = fillStyle;
    }
    
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
    
    this.setText = function(text, size, font, color, textAlign, width, height, interline){
        size         = null == size         ? this.fontSize     : size;
        font         = null == font         ? this.font         : font;
        color        = null == color        ? this.fontColor    : color;
        width        = null == width        ? this.width        : width;
        height       = null == height       ? this.height       : height;
        interline    = null == interline    ? this.interline    : interline;
        textAlign    = null == textAlign    ? this.textAlign    : textAlign;
        
        var text = new Text(text, size, font, color, textAlign, width, height, interline);
        
        this.setImage(text.getCanvas());

        this.text         = text.text;
        this.fontSize     = text.size;
        this.font         = text.font;
        this.fontColor    = text.color;
        this.interline    = text.interline;
        this.textAlign    = text.textAlign;
    
        _text = text;
    }

    this.textToImage = function(){
        if(_text == null){
            return null
        }
        _isConvertion = true;
    }

    this.getTextWidth = function(){
        if(_text == null){
            return null
        }
        return _text.getWidth();
    }

    this.getTextHeight = function(){
        if(_text == null){
            return null
        }
        return _text.getHeight();
    }
    
    this.fitToText = function(){
        if(null == _text){
            return;
        }
        
        _text.getCanvas();
        this.width  = _text.getWidth();
        this.height = _text.getHeight();
    }
    
    this.getId  = function(){
        return _id;
    }
    
    this.getNew = function(image){
        return new Canvate(image);
    }
    
    this.addNew = function(image){
        var canvate = new Canvate(image);
        this.add(canvate);
        return canvate;
    }

    this.addNewById = function(id){
        var image = document.getElementById(id);
        if(null == image){
            throw new Error("The id HTML element '" + id +"' doesnt exist.");
        }

        var canvate = new Canvate(image);
        this.add(canvate);
        return canvate;
    }

    this.addNewByURL = function(url){
        if(null == url || 0 == url.length){
            throw new Error("The url must by NOT null or length 0.");
        }
        var canvate = new Canvate();
            canvate.loadImage(url);

        this.add(canvate);
        return canvate;
    }
    
    this.getAt = function(index){
        return _canvateList[index];
    }
    
    this.add = function(canvate){
        if(null == canvate || canvate == this){
            // Early return
            return;
        }
        
        this.addAt(canvate, _canvateList.length);
    }
    
    this.addAt = function(canvate, indexTarget){
        if(null == canvate || canvate == this || isNaN(indexTarget)){
            return;
        }
        
        var parent = canvate.getParent();
        if(parent != null){
            parent.remove(canvate);
        }
        _canvateList.splice(indexTarget, 0, canvate);
        _parent[canvate.getId()] = this;
        emit(_self.ADDED, {parent:parent});
    }
    
    this.remove = function(canvate){
        if(null == canvate || canvate == this){
            return;
        }
        var length = _canvateList.length;
        var temp;
        for(var index=0; index <length; index++){
            temp = _canvateList[index];
            if(temp == canvate){
                    return this.removeAt(index);
            }
        }
    }
    
    this.removeAt = function(indexTarget){
        if(isNaN(indexTarget || indexTarget < 0 || !(indexTarget < _canvateList.length))){
            return;
        }
        var canvate = _canvateList.splice(indexTarget, 1)[0];
        var parent = _parent[canvate.getId()];
            _parent[canvate.getId()] = null;
        emit(_self.REMOVED, {parent:parent});
        return canvate;
    }
    
    this.removeAll = function(){
        while(_canvateList.length > 0){
            this.removeAt(0);
        }
    }
    
    this.getTotal = function(){
        return _canvateList.length;
    }
    
    this.setDepth = function(canvate, indexTarget){
        if(null == canvate || canvate == this || isNaN(indexTarget)){
            return;
        }
        var indexTarget = Math.max(indexTarget, 0);
        var length      = _canvateList.length;
        var temp;
        for(var index   = 0; index <length; index++){
            temp     = _canvateList[index];
            if(temp == canvate){
                    _canvateList.splice(indexTarget, 0, _canvateList.splice(index, 1)[0]);
            }
        }
    }
    
    this.swap = function (canvate1, canvate2){
        if(null == canvate1 || null == canvate2){
            return;
        }
        
        var index1; var index2; var canvate;
        var index = _canvateList.length;
        while(--index > -1){
            canvate = _canvateList[index];
            if(canvate1 == canvate){
                index1 = index;
            }
            
            if(canvate2 == canvate){
                index2 = index;
            }
        }
        
        if(null != index1 && null != index2){
            var newcanvate1      = _canvateList[index1];
            var newcanvate2      = _canvateList[index2];
            _canvateList[index1] = newcanvate2;
            _canvateList[index2] = newcanvate1;
        }
    }
    
    this.toFront = function (canvate){
        if(null == canvate){
            return;
        }
        this.setDepth(canvate, _canvateList.length-1);
    }
    
    this.toBack = function (canvate){
        if(null == canvate){
            return;
        }
        this.setDepth(canvate, 0);
    }
    
    this.getParent = function (){
        return _parent[_id];
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
    
    this.play = function(){
        var frameEvent  = _currentFrame;
        _lastTime       = Date.now();
        indexFrame      = _framesList.length-1;
        _lastAction     = PLAY;
        _fromIndexFrame = 0;
        _playUntil(indexFrame);
        emit(_self.CYCLE_START, {frame:frameEvent, action:_lastAction});
    }
    
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
    
    this.playUntil = function(frame){
        var frameEvent  = _currentFrame;
        _lastTime       = Date.now();
        indexFrame      = getIndexByFrame(frame);
        _fromIndexFrame = _frameIndex;
        _lastAction     = PLAY_UNTIL;
        _playUntil(indexFrame);
        emit(_self.CYCLE_START, {frame:frameEvent, action:_lastAction});
    }
    
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
    
    var _onMouseDown = function(event){
        _isDraging = true;
        _dragX = _mouseX - _self.x;
        _dragY = _mouseY - _self.y;
        emit(DRAG);
    }

    var _onMouseUp = function(event){
        _isDraging = false;
        emit(DROP);
    }

    this.startDrag = function(){
        this.addEventListener(MOUSE_DOWN, _onMouseDown, this);
        this.addEventListener(MOUSE_UP, _onMouseUp, this);
    }
    
    this.stopDrag = function(){
        _isDraging = false;
        this.removeEventListener(MOUSE_DOWN, _onMouseDown, this);
        this.removeEventListener(MOUSE_UP, _onMouseUp, this);
    }

    this.emitMouseEvent = function(type, x, y){
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
    
    this.hasButton = function(){
        return _hasButton;
    }
    
    this.debug = function(){
        
    }
}