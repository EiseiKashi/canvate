var renderOld = function(){
                bounds = calculateBounds ( rotationRender
                                          ,xRender         ,yRender
                                          ,-(pivotXrender) ,-(pivotYrender)
                                          ,widthRender     ,heightRender );
                minX   = bounds.minX;
                minY   = bounds.minY;
                maxX   = bounds.maxX;
                maxY   = bounds.maxY;
                
                _innerCanvas.width  = bounds.width;
                _innerCanvas.height = bounds.height;
                
                pivotX = -(pivotXrender);
                pivotY = -(pivotYrender);
                width  = widthRender;
                height = heightRender;
                
                _innerContext.save();
                _innerContext.globalAlpha = _self.alpha;
                _innerContext.translate(-minX+xRender, -minY+yRender);
                _innerContext.rotate(rotationRender);
                _innerContext.scale(scaleXrender, scaleYrender);
                
                _innerContext.drawImage( _self.canvas
                                        ,cropXrender     ,cropYrender
                                        ,cropWidthRender ,cropHeightRender
                                        ,pivotX
                                        ,pivotY
                                        ,width ,height );
                 
                 log = document.getElementById("log"+_id);
                    log.innerHTML = (minY + " | " + minY + " | " + maxX  + " | " + maxY);
                 _self.debug(minX, minY, );
                _innerContext.restore();
            }