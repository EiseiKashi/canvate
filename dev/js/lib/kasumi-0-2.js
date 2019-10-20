function Kasumi(canvasReference){
    var WEB_GL_NAMES    = ["webgl", "experimental-webgl", "moz-webgl", "webkit-3d"];

    var _webGlId;
    var _canvas;
    var _context;
    var gl;
    var _bufferVertex;//vertex_buffer
    var _vertexShader;//_vertexShader

    var _indexList;
    var _fragmentShader;
    
    // PROPERTIES
    var _program;
    var _vertexList;

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
        
        checkGl();

        _context = gl;
    }

    this.setCanvasSize = function(width, height){
        checkGl();
        _canvas.width   = width;
        _canvas.height  = height;
    }

    // TO REPLACE ///////////////////////////////
    this.createProgram = function(){
        console.log("createProgram");
        checkGl();
        // Create a shader program object to store
        // the combined shader program
        _program = gl.createProgram();
    };

    this.createVertexBuffer = function(vertices){
        console.log("createVertexBuffer");
        _vertexList = vertices;

        // Create an empty buffer object to store the vertex buffer
        vertex_buffer = gl.createBuffer();
    
        //Bind appropriate array buffer to it
        gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
    
        // Pass the vertex data to the buffer
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(_vertexList), gl.STATIC_DRAW);
    
        // Unbind the buffer
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
    };

    // 4.
    this.createVertexShader = function(code){
        console.log("createVertexShader");
        console.log("日本一番！！！");
        // vertex shader source code
        vertCode =
            'attribute vec3 coordinates;' +

            'void main(void) {' +
                ' gl_Position = vec4(coordinates, 1.0);' +
                'gl_PointSize = 10.0;'+
            '}';
        code = vertCode;
        vertCode = getElementCode("vertex-shader");

        console.log(vertCode, typeof vertCode);
        console.log("/////////////////");
        console.log(code, typeof code);
        return
        // Create a vertex shader object
        vertShader = gl.createShader(gl.VERTEX_SHADER);
        
        // Attach vertex shader source code
        gl.shaderSource(vertShader, vertCode);

        // Compile the vertex shader
        gl.compileShader(vertShader);

        // Attach a vertex shader
        gl.attachShader(_program, vertShader); 
    };

    // 5.
    this.createFragmentShader = function(){
        // fragment shader source code
        fragCode =
            'void main(void) {' +
                ' gl_FragColor = vec4(0.0, 0.0, 0.0, 0.1);' +
            '}';

        // Create fragment shader object
        fragShader = gl.createShader(gl.FRAGMENT_SHADER);

        // Attach fragment shader source code
        gl.shaderSource(fragShader, fragCode);

        // Compile the fragmentt shader
        gl.compileShader(fragShader);

        // Attach a fragment shader
        gl.attachShader(_program, fragShader);
    };

    // 6.
    this.activateShaders = function(){
        // Link both programs
        gl.linkProgram(_program);
        // Use the combined shader program object
        gl.useProgram(_program);
    }

    // 7.
    this.linkShadersToBuffers = function(){
        // Bind vertex buffer object
        gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);

        // Get the attribute location
        coord = gl.getAttribLocation(_program, "coordinates");

        // Point an attribute to the currently bound VBO
        gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);

        // Enable the attribute
        gl.enableVertexAttribArray(coord);
    }

    // 8.
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
    /////////////////////////////////////////////

    // GETTERS
    this.getCanvas = function(){
        return _canvas;
    }

    this.getContext = function(){d
        return _context;
    }

    //HELPERS
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
        return elementHTML.text.split("\n").join(" ");
    }

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

    initialize(canvasReference);
}