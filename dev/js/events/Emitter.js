import { handleNotValidString, handleObject, handleFunction, handleArray } from '../errors/errorHandling.js';

export const Emitter = function (target, validTypes) {
    handleObject(target, 'Emitter constructor: target');
    handleArray(validTypes, 'Emitter constructor: validTypes');
    
    const _target = target;
    const _validTypes = validTypes;
    const _eventListeners = {};

    let hasMouse = 0;

    this.addEventListener = function (type, methodToAdd, contextToAdd) {
        handleNotValidString(type, _validTypes);
        handleFunction(methodToAdd);
        if (null != contextToAdd) {
        handleObject(contextToAdd);
        }

        let list = _eventListeners[type]
        if (null == list) {
            list = _eventListeners[type] = [];
        }

        const iterator = list.entries()
        for (const[index, listener] of iterator) {
            if (methodToAdd == listener[0] && contextToAdd == listener[1]) {
                return;
            }
        }

        list.push([methodToAdd, contextToAdd]);
    }

    this.removeEventListener = function (type, methodToRemove, contextToRemove) {
        handleNotValidString(type, _validTypes);
        handleFunction(methodToRemove);
        if (null != contextToRemove) {
            handleObject(contextToRemove);
        }
        const list = _eventListeners[type]
        if (null == list) {
            return;
        }

        const iterator = list.entries()
        for (const[index, listener] of iterator) {
            if (methodToRemove == listener[0] && contextToRemove == listener[1]) {
                list.splice(index, 1);
                return;
            }
        }
    }

    this.removeAllListeners = function(){
        _eventListeners = {};
    }

    this.addAllListeners = function(methodToAdd, contextToAdd){
        handleFunction(methodToAdd);
        if (null != contextToAdd) {
            handleObject(contextToAdd);
        }

        var length = validTypes.length;
        for(var index = 0; index < length; index++){
            this.addEventListener(validTypes[index], methodToAdd, contextToAdd);
        }
    }

    this.emitEvent = function (type, data) {
        handleNotValidString(type, _validTypes);
        const list = _eventListeners[type];
        if (null == list) {
            return;
        }

        setTimeout( function(){
            list.forEach(listener => {
                listener[0].apply( listener[1], [{target:_target, data, type}])
            })
        }, 0);
    }
}


const MOUSE_OVER = 'mouseover';
const MOUSE_OUT = 'mouseout';
const MOUSE_UP = 'mouseup';
const MOUSE_DOWN = 'mousedown';
const MOUSE_LEAVE = 'mouseleave';
const MOUSE_ENTER = 'mouseenter';
const TOUCH_START = 'touchstart';
const TOUCH_CANCEL = 'touchcancel';
const TOUCH_END = 'touchend';
const TOUCH_MOVE = 'touchmove';
const TOUCH_MOVE = 'touchstart';
const CLICK = 'click';
const DBLCLICK = 'dblclick';
const DROP = 'drop';
const DRAG = 'drag';
const DRAGING = 'draging';
const DRAG_ENTER = 'dragenter';
const DRAG_LEAVE = 'dragleave';
const DRAG_OVER = 'dragover';
const DRAG_START = 'dragstart';
const DRAG_END = 'dragend';

const mouseTypes = [MOUSE_OVER, MOUSE_OUT, MOUSE_UP, MOUSE_DOWN, MOUSE_LEAVE, MOUSE_ENTER, TOUCH_START, TOUCH_CANCEL, TOUCH_END, TOUCH_MOVE, TOUCH_MOVE, CLICK, DBLCLICK, DROP, DRAG, DRAGING, DRAG_ENTER, DRAG_LEAVE, DRAG_OVER, DRAG_START, DRAG_END, CONTEXT_MENU, WHEEL];