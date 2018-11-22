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

        // Create a shader program
        _program = gl.createProgram();
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
        
        checkGl();

        _context = gl;
    }

    /*==========Defining and storing the geometry=======*/
    this.setPointsBuffer = function(points){
        checkGl();

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

        // Bind vertex buffer object
        gl.bindBuffer(gl.ARRAY_BUFFER, _bufferVertex);
    }

    /*=========================Shaders========================*/
    // VERTEX program
    this.createVertexProgramById = function(id){
        checkGl();
        var code = getElementCode(id);
        this.createVertexProgram(code);
    }

    this.createVertexProgram = function(code){
        _vertexShader = compileProgram(code, gl.VERTEX_SHADER);
        // Attach a vertex shader
        gl.attachShader(_program, _vertexShader);
    }

    // FRAGMENT program
    this.createFragmentProgramById = function(id){
        checkGl();
        var code = getElementCode(id);
        this.createFragmentProgram(code);
    }

    this.createFragmentProgram = function(code){
        _fragmentShader = compileProgram(code, gl.FRAGMENT_SHADER);
        // Attach a fragment shader
        gl.attachShader(_program, _fragmentShader); 
    }

    this.startProgram = function(){
        checkGl();

        // Link both programs
        gl.linkProgram(_program);

        // Use the combined shader program object
        gl.useProgram(_program);
    }


    /*======== Associating shaders to buffer objects ========*/
    this.setPointsVariable = function(name){
        checkGl();

        // Get the attribute location
		var variable = gl.getAttribLocation(_program, name);

		// Point an attribute to the currently bound VBO
		gl.vertexAttribPointer(variable, 3, gl.FLOAT, false, 0, 0);

		// Enable the attribute
		gl.enableVertexAttribArray(variable);
    }

    // GETTERS
    this.getCanvas = function(){
        return _canvas;
    }

    this.getContext = function(){d
        return _context;
    }

    //HELPERS
    function checkGl(){
        if(null == gl){
            throw new Error("The list of Web GL identifierd context are not suported: " + WEB_GL_NAMES);
        }
    }

    function getElementCode(id){
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
        return elementHTML.text;
    }

    function compileProgram (code, type){
        checkGl();

        if(typeof code.toLowerCase() != "string"){
            throw new Error("The argument must be a string.\nargument was:`${code}`");
        }

        // Create a vertex shader object
        shader = gl.createShader(type);
    
        // Attach vertex shader source code
        gl.shaderSource(shader, code);

        // Compile the vertex shader
        gl.compileShader(shader);

        return shader;
    }

    initialize(canvasReference);
}