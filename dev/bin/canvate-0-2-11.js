/* "VERSION 0.2.11"
# FIX addNewByURL and addNewById

minified by https://javascript-minifier.com/
*/
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
    var MOUSE_LEAVE     = "mouseLeave";
    var CLICK           = "click";
    var DRAG            = "drag";
    var DROP            = "drop";
    var FUNCTION        = "function";
    var OBJECT          = "object";
    var CANVAS          = "canvas";
    var D2              = "2d";
    var IMG             = "img";
    var IMG_PNG         = "image/png";
    var DESTINATION_IN  = "destination-in";
    var SOURCE_OVER     = "source-over";
    var SOURCE_IN       = "source-in";
    var CANVATE         = "canvate";
    var PLAY            = "play";
    var PLAY_FROM       = "playFrom";
    var PLAY_UNTIL      = "playUntil";
    var PLAY_BETWEEN    = "playBetween";
    var STOP            = "stop";
    var STOP_AT         = "stopAt";
    var DEFAULT         = "default";
    var POINTER         = "pointer";
    var STAGE           = "canvateStage";
    var _textProperties = ["text", "size", "font", "color", "interline", "textAlign", "width", "height", "isWordWrap"]
    var _parent         = {};
    var _maskClip       = {};
    var counter         = 0;
    var _mainCanvas     = element;
    var _context        = _mainCanvas.getContext(D2);
    var hovering        = function(){};
    var _markToEmmit;
    var _mainCanvasOff;
    var _mainContextOff;
    var _lastX;
    var _lastY;
    var _mouseX;
    var _mouseY;
    var _bounds;
    var _lastOvered;
    var _canvateMouse;
    var _stage;
    var mouseCursor;
    var canvasUpdate;
    var canvasData;
    var canvateMouse;

    // ::: EMITTER ::: //
    var Emitter = function(target){
        'use strict';
        var _typeCounter   = 0;
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
                case MOUSE_OVER :
                case MOUSE_OUT :
                case MOUSE_DOWN : 
                case MOUSE_UP :
                case MOUSE_LEAVE : 
                case MOUSE_LEAVE : 
                case DRAG :
                case DROP :
                _typeCounter++;
                break;
            }
            
            _hasMouse = true;
            return _hasMouse;
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
                        case MOUSE_OVER :
                        case MOUSE_OUT :
                        case MOUSE_DOWN : 
                        case MOUSE_UP :
                        case MOUSE_LEAVE : 
                        case MOUSE_LEAVE : 
                        case DRAG :
                        case DROP :
                        _typeCounter--;
                        break;
                    }
                    _typeCounter = Math.min(_typeCounter, 0);
                    _hasMouse = _typeCounter > 0;
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
    
    // ::: TEXT ::: //
    var Text = function(text, size, font, color, textAlign, width, height, interline){
        'use strict';
        var _self             = this;
        var LEFT              = "left";
        var CENTER            = "center";
        var RIGHT             = "right";
        var DEFAULT_FONT      = "sans-serif";
        var DEFAULT_COLOR     = "black";
        var DEFAULT_SIZE      = 12;
        var DEFAULT_INTERLINE = 1.313;
        var DEFAULT_ALIGN     = LEFT;
        var DEFAULT_BASE_LINE = "top";
        
        this.text             = text;
        this.size             = null == size || 
                                isNaN(size)          ? DEFAULT_SIZE  : size;
        this.font             = null == font         ? DEFAULT_FONT      : font;
        this.color            = null == color        ? DEFAULT_COLOR     : color;
        this.width            = null == width  || isNaN(width)  ? null : width;
        this.height           = null == height || isNaN(height) ? null : height;
        this.interline        = null == interline || 
                                isNaN(interline)     ? DEFAULT_INTERLINE : interline;
        this.textAlign        = null == textAlign    ? DEFAULT_ALIGN     : textAlign; // center | left | right
        this.isWordWrap       = true;
        this.naturalWidth;
        this.naturalHeight;
        
        //this.text, size, font, color, width, height
        
        var _canvas           = document.createElement(CANVAS);
        var _context          = _canvas.getContext(D2);
        var _isTheSame        = false;
        var _lastProperties   = [];
        var _lineList         = [];
        
        var _textHeight;
        var _textWidth;
        var _lineHeight;
        
        var property;var value;var index;var line;var e1;var e2;
        var edge; var remainder;var maxWidth;var maxHeight;

        this.getCanvas = function(){
            var isTheSame = true;
            var length    = _textProperties.length;
            for(index = 0; index < length; index++){
                property = _textProperties[index];
                value    = _self[property];
                if(_lastProperties[index] != value){
                    isTheSame = false;
                }
                _lastProperties[index] = value;
            }
            
            if(isTheSame && _isTheSame){
                return _canvas;
            }
            
            _context.textAlign    = _self.textAlign;
            _context.textBaseline = DEFAULT_BASE_LINE;
            _context.fillStyle    = _self.color;
            _context.font         = _self.size + "px " + _self.font;
            
            var text              = _self.text;

            maxWidth              = null == this.width  ? Math.ceil(_context.measureText(text).width) : this.width;
            maxHeight             = null == this.height ? _self.interline * _self.size                : this.height;
            
            /* START OF WRAPPING */
            if(this.isWordWrap){
                _lineHeight      = _self.interline * _self.size;
                _lineList.length = 0;
                var yText        = 0;
                var lineWidth    = Math.ceil(_context.measureText(text).width);
                    _textWidth   = lineWidth;
                var reminder     = "";
                var isLarger     = false;
                var line;
                while(lineWidth > maxWidth){
                    e1 = text.indexOf('-');
                    e2 = text.indexOf(' ');
                    
                    if(e1 > 0 || e2 > 0){
                        if(e1 == -1 ){
                            edge = e2;
                        }else if(e2 == -1){
                            edge = e1;
                        }else{
                            edge = Mat.min(e1, e2)
                        }
                        line      = text.slice(0, edge + (e2==edge?1:0));
                        remainder = text.slice(edge + 1);
                        _lineList.push(line);
                        yText += _lineHeight;
                        if(!isLarger){
                            isLarger   = true;
                            _textWidth = 0;
                        }
                        lineWidth  = Math.ceil(_context.measureText(remainder).width);
                        _textWidth = Math.max(Math.ceil(_context.measureText(line).width), _textWidth);
                        
                        text       = remainder;
                        continue;
                    }
                    break
                }
                _lineList.push(text);
            }
            /* END OF WRAPPING */
            _textHeight           = yText + _lineHeight;
            
            _canvas.width         = this.naturalWidth  = maxWidth;
            _canvas.height        = this.naturalHeight = maxHeight;
            
            _context.textAlign    = _self.textAlign;
            _context.textBaseline = DEFAULT_BASE_LINE;
            _context.fillStyle    = _self.color;
            _context.font         = _self.size + "px " + _self.font;
            
            var length = _lineList.length;
            var yText  = 0;
            var line;
            switch(_self.textAlign){
                case LEFT:
                    x = 0
                break
                case CENTER:
                    x = _canvas.width/2;
                break;
                case RIGHT:
                    x = _canvas.width
                break;
            }
            for(var index=0; index < length; index++){
                line = _lineList[index];
                _context.fillText(line, x, yText);
                yText += _lineHeight;
            }
            
            _isTheSame = isTheSame;
            
            return _canvas;
        }
        
        this.getHeight = function(){
            return _textHeight;
        }
        
        this.getWidth  = function(){
            return _textWidth;
        }
    }
    
    // ::: CANVATE ::: //
    var Canvate = function (image){
        'use strict';
        
        var _self         = this;
                          
        this.TEXT_SET     = "textSet";
        this.IMAGE_SET    = "imageSet";
        this.IMAGE_LOADED = "imageLoaded";
        this.IMAGE_ERROR  = "imageError";
        this.ADDED    	  = "added";
        this.REMOVED  	  = "removed";
        this.CYCLE_END    = "cycleEnd";
        this.CYCLE_START  = "cycleStart";
        this.RENDER       = "render";
        
        counter++;
        var _id           = CANVATE + counter;
                            
        this.name         = _id;
        this.x            = 0;
        this.y            = 0;
        this.width        = null;
        this.height       = null;
        this.alpha        = 1;
        this.scaleX       = 1;
        this.scaleY       = 1;
        this.rotation     = 0;
        this.pivotX       = 0;
        this.pivotY       = 0;
        this.visible      = true;
        this.isLoop       = false;
        this.background   = null;
        this.isWordWrap   = true;
        
        this.text;
        this.font;
        this.fontSize;
        this.fontColor;
        this.interline;
        this.textAlign;
        
        this.bounds;

        var AUTO           = "auto";

        var _image;         
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
        var _canvateList   = [];
        var _framesList    = [];
        var _initialWidth  = null;
        var _initialHeight = null;
        var _isMask        = false;
        var _mask          = null;
        var _isDraging     = false;
        var _mouseX;
        var _mouseY;
        var _canvateMouse;
        var _lineHeight;
        var _hasMouse;
        var _fromIndexFrame;
        var _endIndex;
        var _currentFrame;
        var _lastTime;
        var _lastAction;
        var _text;
        var _isConvertion;
        var _dragX;
        var _dragY;
        
        // HELPERS VARIABLES
        var tileXsetCycle;var tileYsetCycle;var widthSetCycle;var heightSetCycle;
        var indexSetCycle;var gapX;var gapY;var tempCanvas;var tempContext;
        var lastWidth;var indexFrame;var fromIndexFrame;var untilIndexFrame;
        var indexRender;var cropDataRender;var nowRender;var xRender;var yRender;
        var widthRender;var heightRender;var cropXrender;var cropYrender;var bounds;
        var cropWidthRender;var cropHeightRender;var pivotXrender;var pivotYrender;
        var alphaRender;var canvasRender;var canvateRender;var rotationRender;
        var scaleXrender;var scaleYrender; var data;
        
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
                img.src         = canvas.toDataURL(IMG_PNG);
            
            this.setImage(canvas);
            this.setSize(finalWidth, finalHeight);
        }

        //IMAGE METHODS
        // Sets the image Canvate
        this.setImage = function(image){
            if(null == image){
                // Early return
                return;
            }
            _image             = image;
            
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
            if(image == null){
                throw "There is no element with the id: " + id;
                return;
            }
            this.setImage(image);
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
                image.src         = src + antiCache;
        }
        
        //Set mask wit another clip
        this.setMask = function(mask, type){
            if(null == mask){
                // Early return
                return;
            }
            _maskClip[mask.getId()] = this;
            _mask                   = mask;
        }
        
        //Remove the mask
        this.removeMask = function(){
            if(_mask == null){
                // Early return
                return;
            }
            _maskClip[_mask.getId()] = null;
            delete _maskClip[_mask.getId()];
            _mask                    = null;
        }
        
        // Returns if is a mask
        this.isMask = function(){
            return null != _maskClip[_id];
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
                img.src           = canvas.toDataURL(IMG_PNG);
            
            this.setImage(canvas);
        }
        
        // Canvate TEXT
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
        
        // CHILDREN METHODS
        // Returns the id
        this.getId  = function(){
            return _id;
        }
        
        // Get new Canvate
        this.getNew = function(image){
            return new Canvate(image);
        }
        
        // Add new Canvate
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

            var canvate = this.addNew(image);
            return canvate;
        }

        this.addNewByURL = function(url){
            if(null == url || 0 == url.length){
                throw new Error("The url must by NOT null or length 0.");
            }
            var canvate = this.addNew();
                canvate.loadImage(url);

            this.add(canvate);
            return canvate;
        }
        
        // Get the Canvate by depth
        this.getAt = function(index){
            return _canvateList[index];
        }
        
        // Add canvate
        this.add = function(canvate){
            if(null == canvate || canvate == this){
                // Early return
                return;
            }
            
            this.addAt(canvate, _canvateList.length);
        }
        
        // Add canvate at specific depth
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
        
        // Remove Canvate
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
        
        // Remove Canvate at certaiin depth
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
        
        // Remove all Canvate
        this.removeAll = function(){
            while(_canvateList.length > 0){
                this.removeAt(0);
            }
        }
        
        // Get total canvate
        this.getTotal = function(){
            return _canvateList.length;
        }
        
        // Set the depth of specific Canvate
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
        
        // Interchange the depth of 2 Canvate
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
        
        // Bring a Canvate to front
        this.toFront = function (canvate){
            if(null == canvate){
                return;
            }
            this.setDepth(canvate, _canvateList.length-1);
        }
        
        // Bring a Canvate to back
        this.toBack = function (canvate){
            if(null == canvate){
                return;
            }
            this.setDepth(canvate, 0);
        }
        
        // Returns the parent
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
        
        /* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */
        /* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */
        /*  R E N D E R                 R E N D E R                  R E N D E R  */
        /* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */
        /* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */
        
        this.render = function(mouseX, mouseY, isMasking){
            _mouseX         = mouseX;
            _mouseY         = mouseY;
			this.realWidth  = 0;
            this.realHeight = 0;
            
            var isNOTmasking = null != _maskClip[this.getId()] && !isMasking;
            if((_canvateList.length == 0 && null == _image) || false == this.visible || isNOTmasking){
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
            
            if(null != _text){
                _text.text       = this.text;
                _text.size       = this.fontSize;
                _text.font       = this.font;
                _text.color      = this.fontColor;
                _text.interline  = this.interline;
                _text.textAlign  = this.textAlign;
                _text.isWordWrap = this.isWordWrap;
                _text.width      = this.width;
                _text.height     = this.height;
                
                _image           = _text.getCanvas();

                _initialWidth    = _cropWidth  = this.width;
                _initialHeight   = _cropHeight = this.height;
            }
            
            if(_isDraging){
                this.x = _mouseX-_dragX;
                this.y = _mouseY-_dragY;
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
            var bounds;var canvateBounds;
            var renderList = [];
            
            minX = null;
            minY = null;
            maxX = null;
            maxY = null;
            
            if(null != _image){
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
            if(null != _image){
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
            
            var canvateBounds;
            
            _canvateMouse = null;
            var positionX = xRender-pivotXrender;
            var positionY = yRender-pivotYrender;
            var length    = _canvateList.length;
            
            for(indexRender = 0; indexRender < length; indexRender++){
                canvateRender = _canvateList[indexRender];
                data   = canvateRender.render(mouseX-_self.x, mouseY-_self.y, 
                                               false);
                canvasRender = data.inner;
                if(null != canvasRender){
                    canvateBounds = data.bounds;
                    renderList.push({canvas:data.inner, x:canvateBounds.minX, y:canvateBounds.minY});
                    
                    if(Boolean(data.canvateMouse)){
                        _canvateMouse = data.canvateMouse;
                    }
                    
                    if(null != minX){
                        minX = Math.min((canvateBounds.minX+positionX)*rx, minX);
                        minY = Math.min((canvateBounds.minY+positionY)*ry, minY);
                        maxX = Math.max((canvateBounds.maxX+positionX)*rx, maxX);
                        maxY = Math.max((canvateBounds.maxY+positionY)*ry, maxY);
                    }else{
                        minX = (canvateBounds.minX+positionX)*rx;
                        minY = (canvateBounds.minY+positionY)*ry;
                        maxX = (canvateBounds.maxX+positionX)*rx;
                        maxY = (canvateBounds.maxY+positionY)*ry;
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
            
            var translateX = xRender-minX+xXscale;
            var translateY = yRender-minY+yYscale;
            
            _innerContext.translate(translateX, translateY);
            _innerContext.rotate(rotationRender);
            
            scaleXrender = scaleXrender < 0 ? -1 : 1;
            scaleYrender = scaleYrender < 0 ? -1 : 1;
            
            _innerContext.scale(scaleXrender, scaleYrender);
            
            if(_self.background != null){
                _innerContext.fillStyle = _self.background;
                _innerContext.fillRect(0, 0, _innerCanvas.width ,_innerCanvas.height );
            }
            
            if(null != _image && 0 != _image.width && 0 != _image.height){
                _innerContext.drawImage( _image
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
            /*
                sakura.add(fuji)
                sakura.setMask()
                Draw the enmasked in the mask
            */
            
            var canvas;var x;var y;var w;var h;
            
            var canvate;
            var length = renderList.length;
            for(var index=0; index < length; index++){
                canvate = renderList[index];
                if(null != canvate && 0 != canvate.canvas.width && 0 != canvate.canvas.height){
                    canvas = canvate.canvas;
                    x = (canvate.x-pivotXrender)* rx;
                    y = (canvate.y-pivotYrender)* ry;
                    w = (canvas.width  * rx);
                    h = (canvas.height * ry);
                    _innerContext.drawImage( canvate.canvas ,x ,y, w, h);
                }
            }
            
            if(_hasMouse){
                var pixel = _innerContext.getImageData(mouseX-minX, mouseY-minY, 1, 1).data;
                alphaRender = pixel[3];
                
                if(alphaRender > 0){
                    _canvateMouse = _self;
                }
            }

            // MASK RENDER
            if(null != _mask){
                data = _mask.render(mouseX-_self.x, mouseY-_self.y, true);
                canvasRender = data.inner;
                if(null != canvasRender){
                    canvateBounds = data.bounds;
                    x = canvateBounds.minX;
                    y = canvateBounds.minY;
                    x = (0.5 + (x-pivotXrender)* rx)        << 0;
                    y = (0.5 + (y-pivotYrender)* ry)        << 0;
                    w = (0.5 + (canvasRender.width   * rx)) << 0;
                    h = (0.5 + (canvasRender.height  * ry)) << 0;
                    _innerContext.globalCompositeOperation = DESTINATION_IN;

                    _innerContext.drawImage( canvasRender ,x ,y, w, h);
                    console.log("V2")
                    alphaRender= _innerContext.getImageData(mouseX-minX, mouseY-minY, 1, 1).data[3];
                    if(alphaRender == 0){
                        _canvateMouse = null;
                    }
                    
                    _innerContext.globalCompositeOperation = SOURCE_OVER;
                }
            
            }
            
            _innerContext.restore();
            _innerCanvas.id = _self.name;
            var data = {
                           inner        : _innerCanvas, 
                           canvateMouse : _canvateMouse, 
                           bounds       : bounds, 
                           x            : minX, 
                           y            : minY
                       };
            
            emit(_self.RENDER, {});

            if(_isConvertion){
                _isConvertion = false;
                this.setImage(_image);
            }
            
            this.bounds     = bounds;
            this.realWidth  = bounds.width;
            this.realHeight = bounds.height;
            
            return data;
        }
        
        // SET THE INITIAL IMAGE
        this.setImage(image);
    }
    
    // ::: BUTTON ::: //
    var resolveOver = function(){
        
        if(undefined == _lastX || undefined == _lastY){
            return;
        }
        
        mouseCursor = DEFAULT;
        if(null != _canvateMouse && _canvateMouse.hasMouse()){
            mouseCursor = POINTER;
           
            if(_canvateMouse != _lastOvered){
                resolveOut();
                _lastOvered = _canvateMouse;
                _markToEmmit    = _canvateMouse;
                if(null != _canvateMouse){
                    _canvateMouse.emitMouseEvent(MOUSE_OVER, _lastX, _lastY);
                }
                _markToEmmit    = null;
             }
             
        }else {
            resolveOut();
        }
        _mainCanvas.style.cursor = mouseCursor;
    }
    
    var resolveOut = function(isLeave){
        var hasMouse = Boolean(_lastOvered) && _lastOvered.hasMouse();
        if(hasMouse){
            _markToEmmit = _lastOvered;
            _lastOvered.emitMouseEvent(MOUSE_OUT, _lastX, _lastY);
            if(isLeave){
                _lastOvered.emitMouseEvent(MOUSE_UP, _lastX, _lastY);
            }
            _lastOvered = null;
            _canvateMouse      = null;
            _markToEmmit    = null;
        }
    }
    
    // ::: RENDER ::: //
    var update = function (){
        _canvateMouse         = null;
        _mainCanvas.width     = _stage.width;
        _mainCanvas.height    = _stage.height;
        _mainCanvasOff.width  = _stage.width;
        _mainCanvasOff.height = _stage.height;
        canvasData            = _stage.render(_lastX, _lastY);
        canvasUpdate          = canvasData.inner;

        var willDraw = Boolean(canvasUpdate) && 0 != canvasUpdate.width && 0 != canvasUpdate.height;
        if(willDraw){
            _context.drawImage(canvasUpdate, canvasData.x, canvasData.y);
            canvateMouse = canvasData.canvateMouse;
            if(null != canvateMouse){
                _canvateMouse = canvateMouse;
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
        
        _stage      = new Canvate();
        _stage.name = STAGE;
        _stage.setImage(_mainCanvas);
        
        delete _stage.setImage;
        delete _stage.setText;
        delete _stage.setImageById;
        delete _stage.loadImage;
        
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
            if(null !=_canvateMouse && _canvateMouse.hasMouse()){
                _markToEmmit = _canvateMouse;
                _canvateMouse.emitMouseEvent(CLICK, _lastX, _lastY);
                _markToEmmit = null;
            }
        };
        
        _mainCanvas.onmousedown = function(event){
            event.preventDefault();
            if(null !=_canvateMouse && _canvateMouse.hasMouse()){
                _markToEmmit = _canvateMouse;
                _canvateMouse.emitMouseEvent(MOUSE_DOWN, _lastX, _lastY);
                _markToEmmit = null;
            }
        };
        
        _mainCanvas.onmouseup = function(event){
            event.preventDefault();
            if(null !=_canvateMouse && _canvateMouse.hasMouse()){
                _markToEmmit = _canvateMouse;
                _canvateMouse.emitMouseEvent(MOUSE_UP, _lastX, _lastY);
                _markToEmmit = null;
            }
        };
        
        window.onmouseleave = function(event){
            resolveOut(true);
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