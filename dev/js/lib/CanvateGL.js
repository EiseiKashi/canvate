import { handleEmptyString, handleHTMLElement, handleArray,} from '../errors/errorHandling.js';

export const CanvateGL = function (canvasReference){
    'use strict'

    const NAME = 'CanvateGL';
    const HTML_CANVAS_ELEMENT = 'HTMLCanvasElement';
    const WEBGL = 'webgl'
    const EXPERIMENTAL_WEBGL = 'experimental-webgl';
    const MOZ_WEBGL = 'moz-webgl'; 
    const WEBKIT_3D = 'webkit-3d';
    const WEB_GL_NAMES = [WEBGL, EXPERIMENTAL_WEBGL, MOZ_WEBGL, WEBKIT_3D];

    let _canvas = null;
    let _context = null;

    function initialize(){
        setCanvas();
        setContext();
    }

    function checkError(method){
        const error = _context.getError();
        if(0 != error){
            throw new Error(`${NAME}, WebGL context error when trying: ${method}. ${error}`);
        }
    }

    function setCanvas() {
        var isString = typeof canvasReference === 'string';
        if(isString){
            handleEmptyString(canvasReference, `${NAME} setCanvas, argument: canvasReference, must be a non empty String or a canvas HTMLElement.`);
            _canvas = document.querySelector(canvasReference);
        }else{
            _canvas = canvasReference;
        }

        handleHTMLElement(_canvas, `${NAME} setCanvas, argument: canvasReference, must be a non empty String or a canvas HTMLElement.`);

        if(_canvas.constructor.name != HTML_CANVAS_ELEMENT){
            throw new Error(`${NAME} setCanvas, property: _canvas, must be a non empty String or a canvas HTMLElement but got a: ${_canvas.constructor.name}`);
        }
    } 

    function setContext(){
        const length  = WEB_GL_NAMES.length;
        let errors = 'Failing to get a context with the following names:\n';
        let name;
        for (var index = 0; index < length; ++index) {
            name  = WEB_GL_NAMES[index];
            try {
                _context = _canvas.getContext(name);
                break;
            }catch(error) {
                errors += name + '\n';
            }
        }
        
        if(_context == null){
            throw new Error(`${NAME}, setContext, ${errors}`);
            return;
        }

        // Sets clear color to non-transparent dark blue and clears context
        _context.clearColor(0.0, 0.0, 0.5, 1.0);
        checkError('clearColor');
        _context.clear(_context.COLOR_BUFFER_BIT);
        checkError('clear');
    }

    initialize();
}