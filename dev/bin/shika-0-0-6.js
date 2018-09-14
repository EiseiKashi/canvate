'use strict'

// ::: Shika ::: //
function Shika(target){

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
		
			var init = function(){
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
			}
		
			init();
		}
	
		return new KeyHandler(target);
	}
}