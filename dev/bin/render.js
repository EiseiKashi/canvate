/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */
        /* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */
        /*  R E N D E R                 R E N D E R                  R E N D E R  */
        /* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */
        /* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */
        
        this.render = function(mouseX, mouseY){
            _mouseX         = mouseX;
            _mouseY         = mouseY;
			this.realWidth  = 0;
            this.realHeight = 0;
			
            if((_canvateList.length == 0 && null == _image) || false == this.visible){
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
            
            if(_isMask){
                _innerContext.globalCompositeOperation = SOURCE_IN;
            }
            
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
            
            _innerContext.globalCompositeOperation = SOURCE_OVER;
            
            if(_hasMouse){
                var pixel = _innerContext.getImageData(mouseX-minX, mouseY-minY, 1, 1).data;
                alphaRender = pixel[3];
                
                if(alphaRender > 0){
                    _canvateMouse = _self;
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