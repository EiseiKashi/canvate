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

    this.setCanvasSize = function(width, height){
        checkGl();
        _canvas.width   = width;
        _canvas.height  = height;
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
    }

    /*=========================Shaders========================*/
    // VERTEX program
    this.createVertexProgramById = function(id){
        checkGl();
        var code = getElementCode(id);
        this.createVertexProgram(code);
    }

    this.createVertexProgram = function(code){
        // Create a vertex shader object
        _vertexShader = compileProgram(code, gl.FRAGMENT_SHADER);
        // Attach a fragment shader
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

        checkLog();
    }


    /*======== Associating shaders to buffer objects ========*/
    this.setPointsVariable = function(name){
        checkGl();

        // Bind vertex buffer object
        gl.bindBuffer(gl.ARRAY_BUFFER, _bufferVertex);
            
        // Get the attribute location
		var variable = gl.getAttribLocation(_program, name);

		// Point an attribute to the currently bound VBO
		gl.vertexAttribPointer(variable, 3, gl.FLOAT, false, 0, 0);

		// Enable the attribute
		gl.enableVertexAttribArray(variable);
    }

    this.drawPoints = function(){
        // Clear the canvas
        gl.clearColor(0.5, 0.5, 0.5, 0.9);

        // Enable the depth test
        gl.enable(gl.DEPTH_TEST);

        // Clear the color buffer bit
        gl.clear(gl.COLOR_BUFFER_BIT);

        // Set the view port
        gl.viewport(0,0,canvas.width,canvas.height);

        // Draw the triangle
        gl.drawArrays(gl.POINTS, 0, 3);
    }

    // GETTERS
    this.getCanvas = function(){
        return _canvas;
    }

    this.getContext = function(){d
        return _context;
    }

    //HELPERS
    function checkLog(){
        var message = "";
        if(null != _vertexShader){
            message = gl.getShaderInfoLog(_vertexShader);
            if (message.length > 0) {
                /* message may be an error or a warning */
                throw "Vertex Shader Error: " + message;
            }
        }

        if(null != _fragmentShader){
            message = gl.getShaderInfoLog(_fragmentShader);
            if (message.length > 0) {
                /* message may be an error or a warning */
                throw "Fragment Shader Error: " + message;
            }
        }

        message = gl.getProgramInfoLog(_program);
        if (message.length > 0) {
            /* message may be an error or a warning */
            throw "Program ERROR: " + message;
        }
    }

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
        return elementHTML.innerHTML;
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