function Kasumi(canvasReference){
    var WEB_GL_NAMES    = ["webgl", "experimental-webgl", "moz-webgl", "webkit-3d"];

    var _webGlId;
    var _canvas;
    var _context;
    var gl;

    var _pointsList; // vertices
    var _bufferVertex;//vertex_buffer
    var _vertexShader;//_vertexShader

    var _vertexList;
    var _indexList;
    var _fragmentShader;
    var _program;

     /*================Creating a canvas=================*/
    function initialize(canvasReference){
        _canvas = canvasReference;
        var isString = typeof canvasReference === "string";
        if(isString){
            _canvas = document.getElementById(canvasReference);
        }

        if(null == _canvas){
            throw new Error("Fail to get the canvas reference");
        }

        _context = createContext();
    }

    function createContext(){
        var length  = WEB_GL_NAMES.length;
				
        if(_webGlId == null){
            for (var index = 0; index < length; ++index) {
                _webGlId  = WEB_GL_NAMES[index];
                gl = _canvas.getContext(_webGlId);
                if(null != gl){
                    break;
                }
            }
        }else{
            gl = _canvas.getContext(_webGlId);
        }
        
        if(null == gl){
            throw new Error("The list of Web GL identifierd context are not suported: " + WEB_GL_NAMES);
        }
        _context = gl;
    }

    /*==========Defining and storing the geometry=======*/
    this.setVertexBuffer = function(points){
        if(null == gl ){
            throw new Error("The canvas and context must be set before.");
        }

        if(!isArray(points)){
            throw new Error(`The Array for the vertex buffer is not an Array\nargument was:${points}`);
        }

        _pointsList = points;

        // Create an empty buffer object to store the vertex buffer
        _bufferVertex = gl.createBuffer();

        //Bind appropriate array buffer to it
        gl.bindBuffer(gl.ARRAY_BUFFER, _bufferVertex);

        // Pass the vertex data to the buffer
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(_pointsList), gl.STATIC_DRAW);

        // Unbind the buffer
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
    }

    /*=========================Shaders========================*/
    this.createVertexProgramById = function(id){
        var type = typeof id;
        if(type.toLowerCase() != "string"){
            // Early return
            throw new Error(`The id must by a string,/nid=${id}"`);
            return;
        }

        var elementHTML = document.getElementById(id);
        if(null == elementHTML){
            // Early return
            throw new Error(`The element with id: ${id} doesnt exist.`);
        }

        this.createVertexProgram(elementHTML.text);
    }

    this.createVertexProgram = function(vertexCode){
        if(null == gl){
            throw new Error("The canvas and context must be set before.");
        }

        if(typeof vertexCode.toLowerCase() != "string"){
            throw new Error("The argument must be a string.\nargument was:`${vertexCode}`");
        }

        // Create a vertex shader object
        _vertexShader = gl.createShader(gl.VERTEX_SHADER);
    
        // Attach vertex shader source code
        gl.shaderSource(_vertexShader, vertexCode);

        // Compile the vertex shader
        gl.compileShader(_vertexShader);
    }

    /* INTERFACE */

    this.getCanvas = function(){
        return _canvas;
    }

    this.getContext = function(){d
        return _context;
    }

    initialize(canvasReference);
}