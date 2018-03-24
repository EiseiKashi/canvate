var renderNew = function(){
                //65
                bounds = calculateBounds ( rotationRender
                                          ,xRender       ,yRender
                                          ,-pivotXrender ,-pivotYrender
                                          ,widthRender   ,heightRender );
                minX = bounds.minX;
                minY = bounds.minY;
                maxX = bounds.maxX;
                maxY = bounds.maxY;
                
                var clipBounds;
                var length = _clipList.length;
                for(indexRender = 0; indexRender < length; indexRender++){
                    clipRender = _clipList[indexRender];
                    clipData= clipRender.render(canvasWidth, canvasHeight, mouseX-this.x, mouseY-this.y);
                    canvasRender = clipData.canvas;
                    if(null != canvasRender){
                        clipBounds = clipData.bounds;
                        minX = Math.min(clipBounds.minX, minX);
                        minY = Math.min(clipBounds.minY, minY);
                        maxX = Math.max(clipBounds.maxX, maxX);
                        maxY = Math.max(clipBounds.maxY, maxY);
                    }
                }
                
                _innerCanvas.width  = bounds.width*scaleXrender;
                _innerCanvas.height = bounds.height*scaleYrender;
                
                pivotX = -pivotXrender;
                pivotY = -pivotYrender;
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
                 /*
                 var clip;
                 var length = _clipList.length;
                 for(var index=0; index < length; index++){
                     clip = _clipList[index].getBounds();
                     if(null != clip){
                         _innerContext.drawImage( clip.inner
                                                 ,pivotX+clip.minX
                                                 ,pivotY+clip.minY );
                        if(_self.name == "bkg"){ debugger }
                     }
                 }
                 */
                 log = document.getElementById("log"+_id);
                    log.innerHTML = (minY + " | " + minY + " | " + maxX  + " | " + maxY);
                 _self.debug(minX, minY, );
                _innerContext.restore();
            }