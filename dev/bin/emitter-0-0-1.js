
window.MOUSE_OVER      = "mouseOver";
window.MOUSE_OUT       = "mouseOut";
window.MOUSE_UP        = "mouseUp";
window.MOUSE_DOWN      = "mouseDown";
window.MOUSE_LEAVE     = "mouseLeave";
window.CLICK           = "click";
window.DROP            = "drop";
window.DRAG            = "drag";
window.DRAGING         = "draging";
window.FUNCTION        = "function";
window.OBJECT          = "object";

// ::: EMITTER ::: //
window.Emitter = function(target){
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

// ::: KEY HANDLER ::: //
window.KeyHandler = function(target){
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
	
	var _emitter;
	
	this.onKeyDown = function(key, listener, context){
		key      = key.toLowerCase();
		var type = _userKeyList[key];

		if(null != type){
			_emitter.addEventListener(key+DOWN, listener, context);
		}
	}

	this.onKeyUp = function(key, listener, context){
		key      = key.toLowerCase();
		var type = _userKeyList[key];

		if(null != type){
			_emitter.addEventListener(key+UP, listener, context);
		}
	}

	this.removeKeyDown = function(key, listener, context){
			var type = _userKeyList[key];

			if(null != type){
				_emitter.removeEventListener(type+DOWN, listener, context);
			}
		}

	this.removeKeyUp = function(key, listener, context){
		var type = _mapKeyList[key];

		if(null != type){
			_emitter.renoveEventListener(type+UP, listener, context);
		}
	}

	var onkeydown = function(event){
		emit(event.code, DOWN);
	}

	var onkeyup = function(event){
		emit(event.code, UP);
	}

	var emit = function(code, sufix){
		var key = _mapKeyList[code];
			key = key == "enie" ? "ñ" : key;
		if(null != key){
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

		_userKeyList["enie"] = "Semicolon";
		var value;
		for(var userKey in _userKeyList){
			value = _userKeyList[userKey];
			_mapKeyList[value] = userKey;
		}

		_userKeyList.ShiftRight	= "shift";
		_userKeyList.AltRight	= "alt";
		
		_emitter = new Emitter(this);

		target.addEventListener("keydown", onkeydown);
		target.addEventListener("keyup", onkeyup);
	}

	init();
}