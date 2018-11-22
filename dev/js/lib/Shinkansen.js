/*
	Version 0.1.0
	# Change alghoritm 0.1.0
*/

function Shinkansen (){
	'use strict'

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
	
	var isNumber = function(number){
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
	
	var _orderCounter = 0;

	var Node3d = function(view, width, height){
		'use strict'
		_self = this;

		//----------------------------------------------
		// Public properties
		//----------------------------------------------
		this.width 	= width;
		this.height	= height;
		this.render = function(x, y, z){
			var style			= view.style; 
				style.display	= visible ? "inline" : "none";
				style.left   	= x + "px";
				style.top    	= y + "px";
				style.width  	= (z*_self.width)  + "px";
				style.height 	= (z*_self.height) + "px";
				style.zIndex 	= index;
		}
	}

	var Clip3D = function (object2D, object3D, view) {
		'use strict';

		var _order		 = ++_orderCounter;

		//----------------------------------------------
		// Public properties
		//----------------------------------------------
		this.object2D	 = object2D;
		this.object3D	 = object3D;
		this.view		 = view;
		
		this.getOrder = function(){
			return _order;
		}
		
		object3D.x 		 = 0;
		object3D.y 		 = 0;
		object3D.z 		 = 0;
		object3D.scale	 = 1;
		object3D.visible = true;
	}

	var Shinkansen = function() {
		'use strict';
		var _self = this;
		
		//----------------------------------------------
		// Public properties
		//----------------------------------------------
		this.cameraX;
		this.cameraY;
		this.cameraZ;
		this.focalLength;
		this.rotation;
		this.vertRotation;
		this.offsetX	= 0;
		this.offsetY	= 0;

		//----------------------------------------------
		// INTERFACE
		//----------------------------------------------

		this.add = function(object2D, view, data){
			if(typeof object2D != 'object'){
				object2D = {};
			}

			object2D.x		= isNumber(object2D.x) ? object2D.x : 0;
			object2D.y		= isNumber(object2D.y) ? object2D.y : 0;
			object2D.z		= isNumber(object2D.z) ? object2D.z : 0;

			var object3D		= {}
				object3D.x		= 0;
				object3D.y		= 0;
				object3D.z		= 0;
				object3D.index	= _orderCounter;
			
			var clip = new Clip3D(object2D, object3D, view);
			_clipList.push(clip);

			emitEvent(Shinkansen.ADD, clip);

			return {object2D:object2D, object3D:object3D, view:view, data:data};
		}

		this.remove = function (clip) {
			var object3D = clip.object3D;
			var length	= _clipList.length;
			var clip;
			for(var index=0; index < length; index++){
				clip = _clipList[index];
				if(clip.object3D == object3D){
					_clipList.splice(index, 1);
				}
			}
			emitEvent(Shinkansen.REMOVE, clip);
		}

		this.addNode = function(view, width, heigth){
			var node = new Node3d(view, width, heigth);
			var clip = this.add({x:0, y:0, z:0}, view);
			return clip;
		}
		
		this.addEventListener = function (type, listener, context){
			_emitter.addEventListener(type, listener, context);
		}
		
		this.removeEventListener = function (type, listener, context){
			_emitter.removeEventListener(type, listener, context);
		}

		//----------------------------------------------
		// Private properties
		//----------------------------------------------
		var _cameraX		= 0;
		var _cameraY		= 0;
		var _focalLength	= 300;
		var _rotation		= 0;
		var PI2				= Math.PI * 2;
		var _cameraZ		= 0;
		var _vertRotation	= 0;
		var _offsetX		= 0;
		var _offsetY		= 0;
		var _emitter		= new Emitter(this);
		var _clipList		= new Array();
		
		//----------------------------------------------
		// Helpers properties
		//----------------------------------------------
		var clip; var x; var y; var z; var tempX; var tempY; var tempZ;
		var pane; var pitch; var object2D; var object3D; var length;
		
		//----------------------------------------------
		// Helpers
		//----------------------------------------------
		var doRender = function() {
			length = _clipList.length;
			if(0 == length){
				// Early return
				return;
			}
			
			if(_cameraX != _self.cameraX){
				if(isNumber(_self.cameraX)){
					_cameraX = _self.cameraX;
				}else{
					_self.cameraX = _cameraX;
				}
			}

			if(_cameraY != _self.cameraY){
				if(isNumber(_self.cameraY)){
					_cameraY = _self.cameraY;
				}else{
					_self.cameraY = _cameraY;
				}
			}

			if(_cameraZ != _self.cameraZ){
				if(isNumber(_self.cameraZ)){
					_cameraZ = _self.cameraZ;
				}else{
					_self.cameraZ = _cameraZ;
				}
			}

			if(_focalLength != _self.focalLength){
				if(isNumber(_self.focalLength)){
					_focalLength = _self.focalLength;
				}else{
					_self.focalLength = _focalLength;
				}
			}

			if(_offsetX != _self.offsetX){
				if(isNumber(_self.offsetX)){
					_offsetX = _self.offsetX;
				}else{
					_self.offsetX = _offsetX;
				}
			}

			if(_offsetY != _self.offsetY){
				if(isNumber(_self.offsetY)){
					_offsetY = _self.offsetY;
				}else{
					_self.offsetY = _offsetY;
				}
			}

			if(isNumber(_self.rotation) && _self.rotation != _rotation){
				_self.rotation = _rotation = ((_self.rotation%360)+360)%360;
			}else{
				_self.rotation = _rotation;
			}

			if(isNumber(_self.vertRotation) && _self.vertRotation != _vertRotation){
				_self.vertRotation = _vertRotation = ((_self.vertRotation%360)+360)%360;
			}else{
				_self.vertRotation = _vertRotation;
			}

			for(var index=0; index < length; index++){
				clip			= _clipList[index];
				object2D		= clip.object2D;
				object3D		= clip.object3D;
				
				x				= object2D.x - _cameraX;
				y				= object2D.y - _cameraY;
				z				= object2D.z - _cameraZ;
				
				pane		= _rotation * (PI2/360);
				pitch		= _vertRotation * (PI2/360);
				
				// YAW
				tempX	= Math.cos(pane)*x - Math.sin(pane)*z;
				tempZ	= Math.sin(pane)*x + Math.cos(pane)*z;
				x		= tempX;
				z		= tempZ;

				// PITCH
				tempY	= Math.cos(pitch)*y - Math.sin(pitch)*z;
				tempZ	= Math.sin(pitch)*y + Math.cos(pitch)*z;
				y		= tempY;
				z		= tempZ;
				
				var div = (_focalLength + z)
					div = div == 0 ? 0.00000000000000000000000000000001 : div;
				z = _focalLength/div;

				object3D.x 		= _offsetX + x * z;
				object3D.y		= _offsetY + y * z;
				object3D.z		= z;
				object3D.visible= z > 0;
			}
			
			_clipList.sort(sortList);
			
			for(var index=0; index < length; index++){
				_clipList[index].object3D.index = index;
			}
			
			emitEvent(RENDER);
		}

		var emitEvent = function(type, data){
			_emitter.emit(type, data);
		}

		var sortList = function(clipA, clipB){
			var az; var bz; var a3d; var b3d;
			a3d = clipA.object3D;
			b3d = clipB.object3D;
			az  = a3d.z;
			bz  = b3d.z;
			
			if(az == bz){
				az = clipA.getOrder();
				bz = clipB.getOrder();
			}

			if(az > bz){
				return 1;
			}
			
			if(az < bz){
				return -1;
			}
		}
		
		var update = function(){
			requestAnimationFrame(update);
			doRender();
		}

		update();
	}

	return new Shinkansen();
}