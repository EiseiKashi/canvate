/* "VERSION 0.2.18"
# Web GL

minified by https://javascript-minifier.com/
*/
'use strict';

// ::: CANVATE ::: //
function Canvate(element) {
    
    window.isArray = function(array){
        return Object.prototype.toString.call(array) === '[object Array]';
    }

    window.isNumber = function(number){
		var isNull   = null == number;
		var isNotN   = isNaN(number);
		var isString;
		if(!isNull){
			isString = number.length != undefined;
		}
		var isNotAnumber = isNull || isNotN  ||  isString;
		if( isNotAnumber){
			return false;
		}
		return true;
    }
    
    window.isNotNumber = function(number){
		return !isNumber(number);
    }
    
    window.Delegator = function(functionReference, context){
        return function(){
            functionReference.apply(context, arguments);
        }
    }

    window.COLOR_NAMES = {
        aliceblue               : "#F0F8FF" 	
       ,antiquewhite 	        : "#FAEBD7"	 	
       ,aqua 	                : "#00FFFF"	 	
       ,aquamarine 	            : "#7FFFD4"	 	
       ,azure 	                : "#F0FFFF"	 	
       ,beige 	                : "#F5F5DC"	 	
       ,bisque 	                : "#FFE4C4"	 	
       ,black 	                : "#000000"	 	
       ,blanchedalmond 	        : "#FFEBCD"	 	
       ,blue 	                : "#0000FF"	 	
       ,blueviolet 	            : "#8A2BE2"	 	
       ,brown 	                : "#A52A2A"	 	
       ,burlywood               : "#DEB887"	 	
       ,cadetblue               : "#5F9EA0"	 	
       ,chartreuse              : "#7FFF00"	 	
       ,chocolate               : "#D2691E"	 	
       ,coral                   : "#FF7F50"	 	
       ,cornflowerblue          : "#6495ED"	 	
       ,cornsilk                : "#FFF8DC"	 	
       ,crimson                 : "#DC143C"	 	
       ,cyan                    : "#00FFFF"	 	
       ,darkblue                : "#00008B"	 	
       ,darkcyan                : "#008B8B"	 	
       ,darkgoldenrod           : "#B8860B"	 	
       ,darkgray                : "#A9A9A9"	 	
       ,darkgrey                : "#A9A9A9"	 	
       ,darkgreen               : "#006400"	 	
       ,darkkhaki               : "#BDB76B"	 	
       ,darkmagenta             : "#8B008B"	 	
       ,darkolivegreen          : "#556B2F"	 	
       ,darkorange 	            : "#FF8C00"	 	
       ,darkorchid 	            : "#9932CC"	 	
       ,darkred 	            : "#8B0000"	 	
       ,darksalmon 	            : "#E9967A"	 	
       ,darkseagreen 	        : "#8FBC8F"	 	
       ,darkslateblue 	        : "#483D8B"	 	
       ,darkslategray 	        : "#2F4F4F"	 	
       ,darkslategrey 	        : "#2F4F4F"	 	
       ,darkturquoise 	        : "#00CED1"	 	
       ,darkviolet 	            : "#9400D3"	 	
       ,deeppink 	            : "#FF1493"	 	
       ,deepskyblue 	        : "#00BFFF"	 	
       ,dimbray 	            : "#696969"	 	
       ,dimgrey 	            : "#696969"	 	
       ,dodgerblue 	            : "#1E90FF"	 	
       ,firebrick 	            : "#B22222"	 	
       ,floralwhite 	        : "#FFFAF0"	 	
       ,forestgreen 	        : "#228B22"	 	
       ,fuchsia 	            : "#FF00FF"	 	
       ,gainsboro 	            : "#DCDCDC"	 	
       ,ghostwhite 	            : "#F8F8FF"	 	
       ,gold 	                : "#FFD700"	 	
       ,goldenrod 	            : "#DAA520"	 	
       ,gray 	                : "#808080"	 	
       ,grey 	                : "#808080"	 	
       ,green 	                : "#008000"	 	
       ,greenyellow 	        : "#ADFF2F"	 	
       ,honeydew 	            : "#F0FFF0"	 	
       ,hotpink 	            : "#FF69B4"	 	
       ,indianred  	            : "#CD5C5C"	 	
       ,indigo  	            : "#4B0082"	 	
       ,ivory 	                : "#FFFFF0"	 	
       ,khaki 	                : "#F0E68C"	 	
       ,lavender    	        : "#E6E6FA"	 	
       ,lavenderblush 	        : "#FFF0F5"	 	
       ,lawngreen 	            : "#7CFC00"	 	
       ,lemonchiffon 	        : "#FFFACD"	 	
       ,lightblue 	            : "#ADD8E6"	 	
       ,lightcoral 	            : "#F08080"	 	
       ,lightcyan 	            : "#E0FFFF"	 	
       ,lightgoldenrodyellow    : "#FAFAD2"	 	
       ,lightgray 	            : "#D3D3D3"	 	
       ,lightgrey 	            : "#D3D3D3"	 	
       ,lightgreen 	            : "#90EE90"	 	
       ,lightpink 	            : "#FFB6C1"	 	
       ,lightsalmon 	        : "#FFA07A"	 	
       ,lightseagreen 	        : "#20B2AA"	 	
       ,lightskyblue 	        : "#87CEFA"	 	
       ,lightslategray 	        : "#778899"	 	
       ,lightslategrey 	        : "#778899"	 	
       ,lightsteelblue 	        : "#B0C4DE"	 	
       ,lightyellow 	        : "#FFFFE0"	 	
       ,lime 	                : "#00FF00"	 	
       ,limegreen 	            : "#32CD32"	 	
       ,linen 	                : "#FAF0E6"	 	
       ,magenta 	            : "#FF00FF"	 	
       ,maroon 	                : "#800000"	 	
       ,mediumaquamarine 	    : "#66CDAA"	 	
       ,mediumblue 	            : "#0000CD"	 	
       ,mediumorchid 	        : "#BA55D3"	 	
       ,mediumpurple 	        : "#9370DB"	 	
       ,mediumseagreen 	        : "#3CB371"	 	
       ,mediumslateblue 	    : "#7B68EE"	 	
       ,mediumspringgreen 	    : "#00FA9A"	 	
       ,mediumturquoise 	    : "#48D1CC"	 	
       ,mediumvioletred 	    : "#C71585"	 	
       ,midnightblue 	        : "#191970"	 	
       ,mintcream 	            : "#F5FFFA"	 	
       ,mistyrose 	            : "#FFE4E1"	 	
       ,moccasin 	            : "#FFE4B5"	 	
       ,navajowhite 	        : "#FFDEAD"	 	
       ,navy 	                : "#000080"	 	
       ,oldlace 	            : "#FDF5E6"	 	
       ,olive 	                : "#808000"	 	
       ,olivedrab 	            : "#6B8E23"	 	
       ,orange 	                : "#FFA500"	 	
       ,orangered 	            : "#FF4500"	 	
       ,orchid 	                : "#DA70D6"	 	
       ,palegoldenrod 	        : "#EEE8AA"	 	
       ,palegreen 	            : "#98FB98"	 	
       ,paleturquoise 	        : "#AFEEEE"	 	
       ,palevioletred 	        : "#DB7093"	 	
       ,papayawhip 	            : "#FFEFD5"	 	
       ,peachpuff 	            : "#FFDAB9"	 	
       ,peru 	                : "#CD853F"	 	
       ,pink 	                : "#FFC0CB"	 	
       ,plum 	                : "#DDA0DD"	 	
       ,powderblue 	            : "#B0E0E6"	 	
       ,purple 	                : "#800080"	 	
       ,rebeccapurple 	        : "#663399"	 	
       ,red 	                : "#FF0000"	 	
       ,rosybrown 	            : "#BC8F8F"	 	
       ,royalblue 	            : "#4169E1"	 	
       ,saddlebrown 	        : "#8B4513"	 	
       ,salmon 	                : "#FA8072"	 	
       ,sandybrown 	            : "#F4A460"	 	
       ,seagreen 	            : "#2E8B57"	 	
       ,seashell 	            : "#FFF5EE"	 	
       ,sienna 	                : "#A0522D"	 	
       ,silver 	                : "#C0C0C0"	 	
       ,skyblue 	            : "#87CEEB"	 	
       ,slateblue 	            : "#6A5ACD"	 	
       ,slategray 	            : "#708090"	 	
       ,slategrey 	            : "#708090"	 	
       ,snow    	            : "#FFFAFA"	 	
       ,springgreen             : "#00FF7F"	 	
       ,steelblue 	            : "#4682B4"	 	
       ,tan 	                : "#D2B48C"	 	
       ,teal 	                : "#008080"	 	
       ,thistle 	            : "#D8BFD8"	 	
       ,tomato 	                : "#FF6347"	 	
       ,turquoise 	            : "#40E0D0"	 	
       ,violet 	                : "#EE82EE"	 	
       ,wheat 	                : "#F5DEB3"	 	
       ,white   	            : "#FFFFFF"	 	
       ,whitesmoke 	            : "#F5F5F5"
       ,yellow 	                : "#FFFF00"
       ,yellowgreen             : "#9ACD32"
    }

    window.convertToRGB = function(hex, alpha){
        alpha   = isNotNumber(alpha) ? 1 : alpha;
        hex     = isNumber(hex) ? hex.toString(16) : hex;
        // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
        hex = hex.toLowerCase() in COLOR_NAMES ? COLOR_NAMES[hex] : hex;
        
        var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function(m, r, g, b) {
            return r + r + g + g + b + b;
        });
    
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? [parseInt(result[1], 16)/255, parseInt(result[2], 16)/255, parseInt(result[3], 16)/255, alpha]
                        :
                        [0, 0, 0, alpha];
    }

    var isString = typeof element === "string";
    if(isString){
        element = document.getElementById(element);
        if(null == element){
            throw "There is no element with the 'id': " + element;
        }
    }
    
    var vendors  = ['ms', 'moz', 'webkit', 'o'];
    
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame  = window[vendors[x]+'CancelAnimationFrame'] 
                                     || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
    
    if (!window.requestAnimationFrame){
        window.requestAnimationFrame = function(callback) {
            var id         = window.setTimeout(callback, 8);
            return id;
        };
    }
    
    if (!window.cancelAnimationFrame){
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        }
    }
    
    var MOUSE_OVER      = Shika.MOUSE_OVER;
    var MOUSE_OUT       = Shika.MOUSE_OUT;
    var MOUSE_UP        = Shika.UP;
    var MOUSE_DOWN      = Shika.MOUSE_DOWN;
    var MOUSE_LEAVE     = Shika.MOUSE_LEAVE;
    var CLICK           = Shika.CLICK;
    var DRAG            = Shika.DRAG;
    var DROP            = Shika.DROP;

    var FUNCTION        = Shika.FUNCTION;
    var OBJECT          = Shika.OBJECT;
    
    var CANVAS          = "canvas";
    var D2              = "2d";
    var WEB_GL_NAMES    = ["webgl", "experimental-webgl", "moz-webgl", "webkit-3d"];
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
    
    var _pixelRatio     = window.devicePixelRatio ? window.devicePixelRatio : 1.0;
    var _textProperties = ["text", "size", "font", "color", "interline", "textAlign", "width", "height", "isWordWrap"]
    var _parent         = {};
    var _maskClip       = {};
    var counter         = 0;
    var hovering        = function(){};
    var _date           = new Date();
    
    var WEB_GL;
    var _mainCanvas;
    var _mainContext;
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

    var getCanvasContextWebGL = function(canvas, atributes){
        if(!window.WebGLRenderingContext){
            throw new Error("Web GL is not supported.");
        }

        {   // ATRIBUTES
            /*
            debug:true
            ,alpha: true;                           //Boolean that indicates if the canvas contains an alpha buffer.
            ,antialias: true;                       //Boolean that indicates whether or not to perform anti-aliasing.
            ,depth: true;                           //Boolean that indicates that the drawing buffer has a depth buffer of at least 16 bits.
            ,failIfMajorPerformanceCaveat: false    //Boolean that indicates if a context will be created if the system performance is low.
            ,powerPreference: "default"             //A hint to the user agent indicating what configuration of GPU is suitable for the WebGL context. Possible values are:
                                                    //"default": Let the user agent decide which GPU configuration is most suitable. This is the default value.
                                                    //"consolhigh-performance": Prioritizes rendering performance over power consumption.
                                                    //"low-power": Prioritizes power saving over rendering performance.
            ,premultipliedAlpha: true               //Boolean that indicates that the page compositor will assume the drawing buffer contains colors with pre-multiplied alpha.
            ,preserveDrawingBuffer:true             //If the value is true the buffers will not be cleared and will preserve their values until cleared or overwritten by the author.
            ,stencil: true                          //Boolean that indicates that the drawing buffer has a stencil buffer of at least 8 bits.
        */}
        var canvas  = document.createElement(CANVAS);
        var length  = WEB_GL_NAMES.length;
        var context = null;
        
        if(WEB_GL == null){
            for (var index = 0; index < length; ++index) {
                WEB_GL  = WEB_GL_NAMES[index];
                context = canvas.getContext(WEB_GL, atributes);
                if(null != context){
                    break;
                }
            }
        }else{
            context = canvas.getContext(WEB_GL, atributes);
        }
        
        if(null == context){
            throw new Error("The list of Web GL identifierd context are not suported: " + WEB_GL_NAMES);
        }

        return {canvas:canvas, context:context};
    }

    var getCanvasContext = function(){
        if(getCanvasContext != getCanvasContextFallback){
            getCanvasContext = getCanvasContextFallback;
            getContext       = getContextFallback;
        }

        return getCanvasContext();
    };

    var getContext = function(canvas){
        if(getContext != getContextFallback){
            getCanvasContext = getCanvasContextFallback;
            getContext       = getContextFallback;
        }

        return getContext(canvas);
    }

    var getContextFallback = function(canvas){
        return canvas.getContext(D2);
    }

    var getCanvasContextFallback = function(){
        var canvas = document.createElement(CANVAS);
        return {canvas:canvas, context:canvas.getContext(D2)};
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
        
        this.text             = String(text);
        this.size             = isNumber(size)      ? size          : DEFAULT_SIZE;
        this.font             = null == font        ? DEFAULT_FONT  : font;
        this.color            = null == color       ? DEFAULT_COLOR : color;
        this.width            = isNumber(width)     ? width         : null;
        this.height           = isNumber(height)    ? height        : null;
        this.interline        = isNumber(interline) ? interline     : DEFAULT_INTERLINE;
        this.textAlign        = null == textAlign   ? DEFAULT_ALIGN : textAlign; // center | left | right
        this.isWordWrap       = true;
        this.naturalWidth;
        this.naturalHeight;
        
        //this.text, size, font, color, width, height
        
        var _canvasText       = document.createElement(CANVAS);
        var _contextText      = _canvasText.getContext(D2);
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
                return _canvasText;
            }
            
            _contextText.textAlign    = _self.textAlign;
            _contextText.textBaseline = DEFAULT_BASE_LINE;
            _contextText.fillStyle    = _self.color;
            _contextText.font         = _self.size + "px " + _self.font;
            
            var text              = _self.text;
                text              = null == text ? "" : text;
            maxWidth              = null == _self.width  ? Math.ceil(_contextText.measureText(text).width) : _self.width;
            maxHeight             = null == _self.height ? _self.interline * _self.size                : _self.height;
            
            /* START OF WRAPPING */
            if(_self.isWordWrap){
                _lineHeight      = _self.interline * _self.size;
                _lineList.length = 0;
                var yText        = 0;
                var lineWidth    = Math.ceil(_contextText.measureText(text).width);
                    _textWidth   = lineWidth;
                var line         = "";
                
                ////////////////////////
                var wordList    = text.split(' ');
                var tempText;
                var metrics;
                var length = wordList.length;
                for (var index = 0; index < length; index++) {
                    tempText    = wordList[index];
                    metrics     = _contextText.measureText(tempText);
                    while (metrics.width > maxWidth) {
                        tempText    = tempText.substring(0, tempText.length - 1);
                        metrics     = _contextText.measureText(tempText);
                    }
                    if (wordList[index] != tempText) {
                        wordList.splice(index + 1, 0,  wordList[index].substr(tempText.length))
                        wordList[index] = tempText;
                    }  
            
                    tempText    = line + wordList[index] + ' ';  
                    metrics     = _contextText.measureText(tempText);
                    
                    if (metrics.width > maxWidth && index > 0) {
                        _lineList.push(line);
                        line    = wordList[index] + ' ';
                    }
                    else {
                        line = tempText;
                    }
                }
                 
                _lineList.push(line);
               // _contextText.fillText(line, x, y);
            }
    
            /* END OF WRAPPING */
            _textHeight           = yText + _lineHeight;
            
            _canvasText.width         = _self.naturalWidth  = maxWidth;
            _canvasText.height        = _self.naturalHeight = maxHeight;
            
            _contextText.textAlign    = _self.textAlign;
            _contextText.textBaseline = DEFAULT_BASE_LINE;
            _contextText.fillStyle    = _self.color;
            _contextText.font         = _self.size + "px " + _self.font;
            
            switch(_self.textAlign){
                case LEFT:
                x = 0
                break
                case CENTER:
                x = _canvasText.width/2;
                break;
                case RIGHT:
                x = _canvasText.width
                break;
            }
            
            var line;
            var yText  = 0;
            var length = _lineList.length;
            for(var index=0; index < length; index++){
                line = _lineList[index];
                _contextText.fillText(line, x, yText);
                yText += _lineHeight;
            }
            
            _isTheSame = isTheSame;
            
            return _canvasText;
        }
        
        this.getHeight = function(){
            return _textHeight;
        }
        
        this.getWidth  = function(){
            return _textWidth;
        }
    }

    var _canvateListById = {};
    
    // ::: CANVATE ::: //
    var Canvate = function (image, isWebGL){
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

        var AUTO                = "auto";

        var _image;         
        var _increment          = 0;
        var _frameIndex         = 0;
        var _frameRate          = 60;
        var _totalFrames        = 1;
        var _cropX              = 0;
        var _cropY              = 0;
        var _cropWidth          = 0;
        var _cropHeight         = 0;
        var _emitter            = new Shika(this);
        
        var _canvateList        = [];
        _canvateListById[_id]   = _canvateList;
        
        var _framesList         = [];
        var _initialWidth       = null;
        var _initialHeight      = null;
        var _isMask             = false;
        var _mask               = null;
        var _isDraging          = false;
        
        var canvasContext;         
        var _innerCanvas;
        var _innerContext;

        var _webGLCanvas;
        var _webGLContext;

        if(isWebGL){
            canvasContext   = getCanvasContextWebGL();       
            _webGLCanvas    = canvasContext.canvas;
            _webGLContext   = canvasContext.context;
        }

        var canvasContext   = getCanvasContext();
        _innerCanvas        = canvasContext.canvas;
        _innerContext       = canvasContext.context;

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
        var _isLoading = false;
        
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
            if(isNumber(x)){
                _self.x = x;
            }
            
            if(isNumber(y)){
                _self.y = y;
            }
        }

        this.setSize = function(width, height){
            var isNotWidth  = isNotNumber(width)  && width  != AUTO;
            var isNotHeight = isNotNumber(height) && height != AUTO;
            
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
            
            _self.width  = width;
            _self.height = height;
        }
        
        this.setScale = function(x, y){
            if(isNumber(x)){
                _self.scaleX = x;
            }
            
            if(isNumber(y)){
                _self.scaleY = y;
            }
        }

        this.setPivot = function(x, y){
            if(isNumber(x)){
                _self.pivotX = x;
            }
            
            if(isNumber(y)){
                _self.pivotY = y;
            }
        }
        
        this.fitInto = function(maxWidth, maxHeight, offsetX, offsetY){
            if(isNotNumber(maxWidth) || isNotNumber(maxHeight)){
                return;
            }
            
            if(isNotNumber(offsetX)){
                offsetX = 0;
            }
            
            if(isNotNumber(offsetY)){
                offsetY = 0;
            }
            _self.render(0, 0);
            var width  = _self.bounds.width;
            var height = _self.bounds.height;
            var ratio  = Math.min(maxWidth / width, maxHeight / height);
                width  = _self.width  * ratio;
                height = _self.height * ratio;
            
                _self.setSize(width, height);
            
            var x  = Math.floor((maxWidth-width)/2);
            var y  = Math.floor((maxHeight-height)/2);
            
            _self.x = x + (_self.pivotX * width)  + offsetX;
            _self.y = y + (_self.pivotY * height) + offsetY;
            
        }
        
        this.setAutoWidth = function(){
            _self.setSize(AUTO, _self.height);
        }

        this.setAutoHeight = function(){
            _self.setSize(_self.width, AUTO);
        }
        
        this.crop = function(x, y, width, height, finalWidth, finalHeight){
            var x               = null == x      ? _cropX      : x;
            var y               = null == y      ? _cropY      : y;
            var width           = null == width  ? _cropWidth  : width;
            var height          = null == height ? _cropHeight : height;
                         
            _self.width         = null;
            _self.height        = null;
            _cropWidth          = null;
            _cropHeight         = null;
            
            var canvasContext   = getCanvasContext();
            var canvas          = canvasContext.canvas;
                canvas.width    = width;
                canvas.height   = height;
           
            finalWidth          = isNumber(finalWidth)  ? finalWidth  : width;
            finalHeight         = isNumber(finalHeight) ? finalHeight : height; 
            
            var context         = canvasContext.context;
                context.drawImage(_image, x, y, width, height, 0, 0, finalWidth, finalHeight);
            
            var img             = document.createElement(IMG);
                img.src         = canvas.toDataURL(IMG_PNG);
            
            _self.setImage(img);
            _self.setSize(finalWidth, finalHeight);
        }

        this.resizeImageToCanvas = function(){/*
            var canvas = _self.render(0, 0, true).inner;
            var img             = document.createElement(IMG);
                img.src         = canvas.toDataURL(IMG_PNG);
            
            _self.setImage(img);
            _self.setSize(_self.width, _self.height);*/
        }

        this.flat = function(){
            var canvas = _self.render(0, 0, true).inner;
            //_self.removeAll();
            //_self.setImage(canvas);
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

            _self.width     = null == _self.width  || 0 == _self.width  ? _initialWidth  : _self.width;
            _self.height    = null == _self.height || 0 == _self.height ? _initialHeight : _self.height;
            _self.setSize(_self.width, _self.height);
            
            _text = null;
            
            _cropWidth  = null == _cropWidth  || 0 == _cropWidth  ? _initialWidth  : _cropWidth;
            _cropHeight = null == _cropHeight || 0 == _cropHeight ? _initialHeight : _cropHeight;
            
            _self.setCycle(_cropX, _cropY, _cropWidth, _cropHeight);
            emit(_self.IMAGE_SET, {image:image})
        }

        this.getImage = function(){
            return _image;
        }
        
        // CYCLE AND FRAME METHODS
        // Sets the Cycle animation
        this.setCycle = function(x, y, width, height, gapX, gapY, totalFrames){
            tileXsetCycle  = _cropX      = isNumber(x)      ? x      : _cropX;     
            tileYsetCycle  = _cropY      = isNumber(y)      ? y      : _cropY; 
            widthSetCycle  = _cropWidth  = isNumber(width)  ? width  : _cropWidth;
            heightSetCycle = _cropHeight = isNumber(height) ? height : _cropHeight; 
            
            gapX = isNumber(gapX) ? gapX : 0;
            gapY = isNumber(gapY) ? gapY : 0;
            
            if(isNotNumber(totalFrames)){
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
                _self.setSize(widthSetCycle, AUTO);
            }
        }
        
        this.setImageById = function(id){
            var image = document.getElementById(id);
            if(image == null){
                throw "There is no element with the id: " + id;
                return;
            }
            _self.setImage(image);
            return image;
        }
        
        var date = new Date();

        //Load image from SRC
        this.loadImage = function(src, isAntiCache){
            _isLoading       = true; 
            var image        = new Image();
                image.onload = function() {
                    _self.setImage(image);
                    emit(_self.IMAGE_LOADED, {image:image, src:src});
                    _isLoading = false;
                }
                
                image.onerror = function(event){
                    emit(_self.IMAGE_ERROR, {src:src});
                    _isLoading = false;
                }
                var antiCache     = isAntiCache ? '?' + date.getTime() : "";
                image.src         = src + antiCache;
        }
        
        //Set mask wit another clip
        this.setMask = function(mask, type){
            if(null == mask){
                // Early return
                return;
            }
            _maskClip[mask.getId()] = _self;
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
            if(isNotNumber(width) || isNotNumber(height)){
                return;
            }
            
            _self.width  = null;
            _self.height = null;
            _cropWidth   = null;
            _cropHeight  = null;
            
            var canvasContext     = getCanvasContext();
            var canvas            = canvasContext.canvas;
                canvas.width      = width;
                canvas.height     = height;
           
            var context           = canvasContext.context;
                context.fillStyle = color;
                context.fillRect(0,0,width,height);
            
            var img               = document.createElement(IMG);
                img.src           = canvas.toDataURL(IMG_PNG);
            
            this.setImage(canvas);
        }
        
        // Canvate TEXT
        this.setText = function(text, size, font, color, textAlign, width, height, interline){
            size         = null == size         ? _self.fontSize     : size;
            font         = null == font         ? _self.font         : font;
            color        = null == color        ? _self.fontColor    : color;
            width        = null == width        ? _self.width        : width;
            height       = null == height       ? _self.height       : height;
            interline    = null == interline    ? _self.interline    : interline;
            textAlign    = null == textAlign    ? _self.textAlign    : textAlign;
            
            var text = new Text(text, size, font, color, textAlign, width, height, interline);
            
            _self.setImage(text.getCanvas());

            _self.text         = text.text;
            _self.fontSize     = text.size;
            _self.font         = text.font;
            _self.fontColor    = text.color;
            _self.interline    = text.interline;
            _self.textAlign    = text.textAlign;
     
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
            _self.width  = _text.getWidth();
            _self.height = _text.getHeight();
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
        
        // Add new Canvate Web GL
        this.addNewWebGL = function(){
            var canvate = new Canvate(image, true);
            _self.add(canvate);
            return canvate;
        }

        // Add new Canvate
        this.addNew = function(image){
            var canvate = new Canvate(image);
            _self.add(canvate);
            return canvate;
        }

        this.addNewById = function(id){
            var image = document.getElementById(id);
            if(null == image){
                throw new Error("The id HTML element '" + id +"' doesnt exist.");
            }

            var canvate = _self.addNew(image);
            return canvate;
        }

        this.addNewByURL = function(url){
            if(null == url || 0 == url.length){
                throw new Error("The url must by NOT null or length 0.");
            }
            var canvate = _self.addNew();
                canvate.loadImage(url);

            _self.add(canvate);
            return canvate;
        }

        this.addNewRect = function(x, y, width, height, color){
            var canvate = _self.addNew();
                canvate.setRect(width, height, color);
                canvate.setPosition(x, y);
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
            
            _self.addAt(canvate, _canvateList.length);
        }
        
        // Add canvate at specific depth
        this.addAt = function(canvate, indexTarget){
            if(null == canvate || canvate == _self || isNotNumber(indexTarget)){
                return;
            }
            
            var parent = canvate.getParent();
            if(parent != null){
                parent.remove(canvate);
            }
            _canvateList.splice(indexTarget, 0, canvate);
            _parent[canvate.getId()] = _self;
            emit(_self.ADDED, {parent:parent});
        }

        // Replace Canvate
        this.replace = function(canvate, withCanvate){

            if(null == canvate || null == withCanvate){
                return;
            }

            var index = _canvateList.indexOf(canvate);
            if(index != -1){
                var canvate = _canvateList.splice(index, 1, withCanvate)[0];
                return canvate;
            }else{
                return null;
            }
        }

        // Replace Canvate at certain depth
        this.replaceAt = function(indexTarget, canvate){
            if(null == canvate || canvate == _self){
                return;
            }
            
            if(isNotNumber(indexTarget || indexTarget < 0 || !(indexTarget < _canvateList.length))){
                return;
            }
            var temp                    = _canvateList[indexTarget]; 
            _canvateList[indexTarget]   = canvate;

            return temp;
        }
        
        // Remove Canvate
        this.remove = function(canvate){
            if(null == canvate || canvate == _self){
                return;
            }
            var length = _canvateList.length;
            var temp;
            for(var index=0; index <length; index++){
                temp = _canvateList[index];
                if(temp == canvate){
                     return _self.removeAt(index);
                }
            }
        }
        
        // Remove Canvate at certaiin depth
        this.removeAt = function(indexTarget){
            if(isNotNumber(indexTarget || indexTarget < 0 || !(indexTarget < _canvateList.length))){
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
                _self.removeAt(0);
            }
        }
        
        // Get total canvate
        this.getTotal = function(){
            return _canvateList.length;
        }
        
        // Set the depth of specific Canvate
        this.setDepth = function(indexTarget){
            if(isNotNumber(indexTarget)){
                throw new Error("The depth value must be a Number")
                return;
            }
            var parent      = _self.getParent();
            if(null == parent){
                return;
            }

            var list        = _canvateListById[parent.getId()];
            if(null == list){
                return;
            }

            var length      = list.length;
            var indexTarget = Math.round(Math.min(Math.max(indexTarget, 0), length-1));
            var index       = list.indexOf(_self);

            if(index > -1){
                list.splice(indexTarget, 0, list.splice(index, 1)[0]);
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
        this.toFront = function (){
            var parent      = _self.getParent();
            if(null == parent){
                return;
            }

            var list        = _canvateListById[parent.getId()];
            if(null == list){
                return;
            }
            _self.setDepth(list.length-1);
        }
        
        // Bring a Canvate to back
        this.toBack = function (){
            _self.setDepth(0);
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
            if(isNotNumber(frame)){
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
                if(_self.isLoop){
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
                if(_self.isLoop){
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
            if(null == frameRate || isNotNumber(frameRate)){
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
            this.addEventListener(MOUSE_DOWN, _onMouseDown, _self);
            this.addEventListener(MOUSE_UP, _onMouseUp, _self);
        }
        
        this.stopDrag = function(){
            _isDraging = false;
            this.removeEventListener(MOUSE_DOWN, _onMouseDown, _self);
            this.removeEventListener(MOUSE_UP, _onMouseUp, _self);
        }

        // EVENT HANDLING
        this.emitMouseEvent = function(type, x, y){
            if(_markToEmmit == _self){
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
        //Cnavate render
        this.render = function(mouseX, mouseY, isMasking){
            _mouseX         = isNumber(mouseX) ? mouseX : 0;
            _mouseY         = isNumber(mouseY) ? mouseY : 0;
			_self.realWidth  = 0;
            _self.realHeight = 0;
            
            var isNOTmasking = null != _maskClip[_self.getId()] && !isMasking;
            if(!isWebGL && ( _canvateList.length == 0 && null == _image) || false == _self.visible || isNOTmasking || _isLoading){
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
                var name = _self.name;
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
                    if(_self.isLoop){
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
                _text.text       = _self.text;
                _text.size       = _self.fontSize;
                _text.font       = _self.font;
                _text.color      = _self.fontColor;
                _text.interline  = _self.interline;
                _text.textAlign  = _self.textAlign;
                _text.isWordWrap = _self.isWordWrap;
                _text.width      = _self.width;
                _text.height     = _self.height;
                
                _image           = _text.getCanvas();

                _initialWidth    = _cropWidth  = _self.width;
                _initialHeight   = _cropHeight = _self.height;
            }
            
            if(_isDraging){
                _self.x = _mouseX-_dragX;
                _self.y = _mouseY-_dragY;
            }
            
            xRender          = _self.x;
            yRender          = _self.y;
            scaleXrender     = _self.scaleX;
            scaleYrender     = _self.scaleY;
            widthRender      = _self.width  * scaleXrender;
            heightRender     = _self.height * scaleYrender;
            pivotXrender     = _self.pivotX * widthRender  *scaleXrender;
            pivotYrender     = _self.pivotY * heightRender *scaleYrender;
            cropXrender      = _cropX;
            cropYrender      = _cropY;
            cropWidthRender  = _cropWidth;
            cropHeightRender = _cropHeight;
            rotationRender   = _self.rotation * (Math.PI)/180;
            
            var minX;var minY;var maxX;var maxY;var pivotX;var pivotY;
            var bounds;var canvateBounds;var inner;
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
                rx = isNotNumber(rx) ? 1 : rx;
                ry = isNotNumber(ry) ? 1 : ry;
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
                data   = canvateRender.render(_mouseX-_self.x, _mouseY-_self.y, 
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
            
            if(isWebGL || _webGLCanvas){
                _webGLContext.viewportWidth     = _webGLCanvas.width  = _self.width;
                _webGLContext.viewportHeight    = _webGLCanvas.height = _self.height;
                var colorArgs                   = convertToRGB("blueviolet");
                var colorArgs                   = convertToRGB("#ff0000");
                inner                           = _webGLCanvas;
                _webGLContext.clearColor.apply(_webGLContext, colorArgs);
                _webGLContext.clear(_webGLContext.COLOR_BUFFER_BIT);
            }else{    
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
                
                var canvas;var x;var y;var w;var h;
                
                var canvate;
                var length = renderList.length;
                for(var index=0; index < length; index++){
                    canvate = renderList[index];
                    canvas = canvate.canvas;
                    if(null != canvate && 0 != canvas.width && 0 != canvas.height){
                        x = (canvate.x-pivotXrender)* rx;
                        y = (canvate.y-pivotYrender)* ry;
                        w = (canvas.width  * rx);
                        h = (canvas.height * ry);
                        _innerContext.drawImage(canvas ,0, 0, canvas.width, canvas.height
                                                    ,x ,y, w, h);
                    }
                }
                
                if(_hasMouse){
                    var pixel = _innerContext.getImageData(_mouseX-minX, _mouseY-minY, 1, 1).data;
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
                        x = (x-pivotXrender)* rx;
                        y = (y-pivotYrender)* ry;
                        w = canvasRender.width   * rx;
                        h = canvasRender.height  * ry;
                        _innerContext.globalCompositeOperation = DESTINATION_IN;

                        _innerContext.drawImage( canvasRender, 0, 0, canvasRender.width, canvasRender.height
                                                            , x-_self.x ,y-_self.y, w, h);
                        alphaRender= _innerContext.getImageData(mouseX-minX, mouseY-minY, 1, 1).data[3];
                        if(alphaRender == 0){
                            _canvateMouse = null;
                        }
                        
                        _innerContext.globalCompositeOperation = SOURCE_OVER;
                    }
                
                }
                
                _innerContext.restore();

                inner = _innerCanvas;
            }

            _innerCanvas.id = _self.name;
            var data = {
                           inner            : inner
                           ,canvateMouse    : _canvateMouse
                           ,bounds          : bounds
                           ,x               : minX
                           ,y               : minY
                       };
            
            emit(_self.RENDER, {});

            if(_isConvertion){
                _isConvertion = false;
                _self.setImage(_image);
            }
            
            _self.bounds     = bounds;
            _self.realWidth  = bounds.width;
            _self.realHeight = bounds.height;
            
            return data;
        }

        var renderWebGL = function(mouseX, mouseY, isMasking){
            _mouseX         = isNumber(mouseX) ? mouseX : 0;
            _mouseY         = isNumber(mouseY) ? mouseY : 0;
			_self.realWidth  = 0;
            _self.realHeight = 0;
            
            var isNOTmasking = null != _maskClip[_self.getId()] && !isMasking;
            if((_canvateList.length == 0 && null == _image) || false == _self.visible || isNOTmasking || _isLoading){
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
                var name = _self.name;
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
                    if(_self.isLoop){
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
                _text.text       = _self.text;
                _text.size       = _self.fontSize;
                _text.font       = _self.font;
                _text.color      = _self.fontColor;
                _text.interline  = _self.interline;
                _text.textAlign  = _self.textAlign;
                _text.isWordWrap = _self.isWordWrap;
                _text.width      = _self.width;
                _text.height     = _self.height;
                
                _image           = _text.getCanvas();

                _initialWidth    = _cropWidth  = _self.width;
                _initialHeight   = _cropHeight = _self.height;
            }
            
            if(_isDraging){
                _self.x = _mouseX-_dragX;
                _self.y = _mouseY-_dragY;
            }
            
            xRender          = _self.x;
            yRender          = _self.y;
            scaleXrender     = _self.scaleX;
            scaleYrender     = _self.scaleY;
            widthRender      = _self.width  * scaleXrender;
            heightRender     = _self.height * scaleYrender;
            pivotXrender     = _self.pivotX * widthRender  *scaleXrender;
            pivotYrender     = _self.pivotY * heightRender *scaleYrender;
            cropXrender      = _cropX;
            cropYrender      = _cropY;
            cropWidthRender  = _cropWidth;
            cropHeightRender = _cropHeight;
            rotationRender   = _self.rotation * (Math.PI)/180;
            
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
                rx = isNotNumber(rx) ? 1 : rx;
                ry = isNotNumber(ry) ? 1 : ry;
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
                data   = canvateRender.render(_mouseX-_self.x, _mouseY-_self.y, 
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
            
            var canvas;var x;var y;var w;var h;
            
            var canvate;
            var length = renderList.length;
            for(var index=0; index < length; index++){
                canvate = renderList[index];
                canvas = canvate.canvas;
                if(null != canvate && 0 != canvas.width && 0 != canvas.height){
                    x = (canvate.x-pivotXrender)* rx;
                    y = (canvate.y-pivotYrender)* ry;
                    w = (canvas.width  * rx);
                    h = (canvas.height * ry);
                    _innerContext.drawImage(canvas ,0, 0, canvas.width, canvas.height
                                                   ,x ,y, w, h);
                }
            }
            
            if(_hasMouse){
                var pixel = _innerContext.getImageData(_mouseX-minX, _mouseY-minY, 1, 1).data;
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
                    x = (x-pivotXrender)* rx;
                    y = (y-pivotYrender)* ry;
                    w = canvasRender.width   * rx;
                    h = canvasRender.height  * ry;
                    _innerContext.globalCompositeOperation = DESTINATION_IN;

                    _innerContext.drawImage( canvasRender, 0, 0, canvasRender.width, canvasRender.height
                                                         , x-_self.x ,y-_self.y, w, h);
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
                           inner            : _innerCanvas
                           ,canvateMouse    : _canvateMouse
                           ,bounds          : bounds
                           ,x               : minX
                           ,y               : minY
                       };
            
            emit(_self.RENDER, {});

            if(_isConvertion){
                _isConvertion = false;
                _self.setImage(_image);
            }
            
            _self.bounds     = bounds;
            _self.realWidth  = bounds.width;
            _self.realHeight = bounds.height;
            
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
            var hasMouse = _canvateMouse.hasMouse()
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
            _lastOvered     = null;
            _canvateMouse   = null;
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
            _mainContext.drawImage(canvasUpdate, 0, 0, canvasUpdate.width, canvasUpdate.height, 
                                            canvasData.x, canvasData.y, canvasUpdate.width, canvasUpdate.height);
            canvateMouse = canvasData.canvateMouse;
            if(null != canvateMouse){
                _canvateMouse = canvateMouse;
            }
        }
        hovering();
       // _mainContext.drawImage(_mainCanvasOff, 0, 0);
        setTimeout(update, 10);
    }
    
     // ::: INITIALIZATION ::: //
    var initialize = function() {
        _mainCanvas             = element;
        _mainContext                = getContext(_mainCanvas);

        _mainCanvas.width       = _mainCanvas.width;
        _mainCanvas.height      = _mainCanvas.height;
        
        _mainCanvasOff          = _mainCanvas.cloneNode();
        _mainContextOff         = getContext(_mainCanvasOff);
        _mainCanvasOff.width    = _mainCanvas.width;
        _mainCanvasOff.height   = _mainCanvas.height;
        
        _stage      = new Canvate();
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
        
        var _mainEmitter = new Shika(_mainCanvas);
        update();
    }
    
    initialize();
    return _stage;
 };

// ::: Shika ::: //
(function Shika(target){
    'use strict'
	Shika.MOUSE_OVER   = "mouseOver";
	Shika.MOUSE_OUT    = "mouseOut";
	Shika.MOUSE_UP     = "mouseUp";
	Shika.MOUSE_DOWN   = "mouseDown";
	Shika.MOUSE_LEAVE  = "mouseLeave";
	Shika.CLICK        = "click";
	Shika.DROP         = "drop";
	Shika.DRAG         = "drag";
	Shika.DRAGING      = "draging";	
	Shika.FUNCTION     = "function";
	Shika.OBJECT       = "object";
	Shika.ADD		     = "add";
	Shika.REMOVE		 = "remove";
	Shika.RENDER		 = "render";

	var _typeCounter   = 0;
	var _hasMouse      = false;
					   
	var CONTEXT        = 0;
	var LISTENER       = 1;
	var _target        = target;
	
	var _listenerTypes = {};
	var _listenerList;
	
	var listener;
	
	this.addEventListener = function(type, listener, context){
		if(null == type || type == "" || typeof listener !== Shika.FUNCTION ){
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
			case Shika.CLICK :
			case Shika.MOUSE_OVER :
			case Shika.MOUSE_OUT :
			case Shika.MOUSE_DOWN :
			case Shika.MOUSE_UP :
			case Shika.MOUSE_LEAVE :
			case Shika.DRAG :
			case Shika.DROP :
			_typeCounter++;
			break;
		}
		
		_hasMouse = _typeCounter > 0;
		return _hasMouse;
	}
	
	this.removeEventListener = function(type, listenerToRemove, context){
		if(null == type || type == "" || typeof listenerToRemove !== Shika.FUNCTION ){
			return;
		}
		
		_listenerList = _listenerTypes[type];
		if(null == _listenerList){
			return
		}
		
		var length = _listenerList.length;
		for(var index=0; index < length; index++){
			listener = _listenerList[index];
			
			if(listener[LISTENER] == listenerToRemove && 
			   listener[CONTEXT]  == context){
				_listenerTypes[type].splice(index, 1);
				switch(type){
					case Shika.CLICK :
                    case Shika.MOUSE_OVER :
                    case Shika.MOUSE_OUT :
                    case Shika.MOUSE_DOWN :
                    case Shika.MOUSE_UP :
                    case Shika.MOUSE_LEAVE :
                    case Shika.DRAG :
                    case Shika.DROP :
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
		var _listenerList = _listenerTypes[type];
		if(undefined === _listenerList){
			return
		}
		data        = null == data || typeof data != Shika.OBJECT ? {} : data;
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

	Shika.getKeyHandler = function(target){
		var KeyHandler = function(target){
			'use strict'
		
			var _self	     = this;
			var DOWN		 = "Down";
			var UP  		 = "Up";
			var ENIE         = "enie";
		
			var _userKeyList = {
								 up		: "ArrowUp"
								,down	: "ArrowDown"
								,left	: "ArrowLeft"
								,right	: "ArrowRight"
								,space	: "Space"
								,tab	: "Tab"
								,shift	:"ShiftLeft" // ShiftRight
								,alt	:"AltLeft" // AltRight
								,enter	:"Enter"
							}
			
			var _mapKeyList	= {};
			var _downKeyList = [];
			
			var _emitter;
			
			this.onDown = function(key, listener, context){
				key      = key.toLowerCase();
				var type = _userKeyList[key];
				if(null != type){
					_emitter.addEventListener(key+DOWN, listener, context);
				}
			}
		
			this.onUp = function(key, listener, context){
				key      = key.toLowerCase();
				var type = _userKeyList[key];
		
				if(null != type){
					_emitter.addEventListener(key+UP, listener, context);
				}
			}
		
			this.removeDown = function(key, listener, context){
				var type = _userKeyList[key];
		
				if(null != type){
					_emitter.removeEventListener(type+DOWN, listener, context);
				}
			}
		
			this.removeUp = function(key, listener, context){
				var type = _mapKeyList[key];
		
				if(null != type){
					_emitter.renoveEventListener(type+UP, listener, context);
				}
			}
		
			this.isDown = function(key){
				return _downKeyList.indexOf(key) > -1;
			}
		
			var onkeydown = function(event){
				emit(event.code, DOWN);
			}
		
			var onkeyup = function(event){
				emit(event.code, UP);
			}
		
			var emit = function(code, sufix){
				var key = _mapKeyList[code];
				if(null != key){
					key = key.toLowerCase() == "semicolon" ? "ñ" : key;
					var index = _downKeyList.indexOf(key);
		
					if(DOWN == sufix){
						if(index == -1){
							_downKeyList.push(key);
						}
					}else{
						if(index > -1){
							_downKeyList.splice(key, 1);
						}
					}
					_emitter.emit(key+sufix, key);
				}
			}
		
			var init = (function(){
				var letterList = "Q,W,E,R,T,Y,U,I,O,P,A,S,D,F,G,H,J,K,L,Z,X,C,V,B,N,M".split(",");
				var length = letterList.length;
				var letter;
				for(var index=0; index < length; index++){
					letter = letterList[index];
					_userKeyList[letter.toLowerCase()] = "Key"+letter;
		
					if(index < 10){
						_userKeyList[index] = "Digit"+index;
					}
				}
		
				_userKeyList["semicolon"] = "Semicolon";
				var value;
				for(var userKey in _userKeyList){
					value = _userKeyList[userKey];
					_mapKeyList[value] = userKey;
				}
		
				_userKeyList.ShiftRight	= "shift";
				_userKeyList.AltRight	= "alt";
				
				_emitter = new Shika(this);
		
				target.addEventListener("keydown", onkeydown);
				target.addEventListener("keyup", onkeyup);
			})
		
			init();
		}
	
		return new KeyHandler(target);
	}
})