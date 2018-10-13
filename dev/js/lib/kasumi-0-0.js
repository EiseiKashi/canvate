var canvas          = document.createElement('canvas');
    canvas.width    = window.innerWidth;
    canvas.height   = window.innerHeight;
document.body.appendChild(canvas);

function Kasumi(canvasReference){
    var _webGlId;
    var _canvas;
    var gl;
    var _vertexList;
    var _vertexShader;
    var _fragmentShader;
    var _bufferVertex;
    var _program;

    function initialize(canvasReference){
        _canvas = canvasReference;
        var isString = typeof canvasReference === "string";
        if(isString){
            _canvas = document.getElementById(canvasReference);
        }

        if(null == _canvas){
            throw new Error("Fail to get the canvas reference");
        }
    }

    function getContext(){
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
        return gl;
    }
    
    this.setProgram = function(list, vertextSource, fragmentSource){
        // 1. Set the _canvas and the context
        gl = getContext();

        // 2. Set the geometry
        _vertexList     = list;
        _bufferVertex   = setBufferVertex(_vertexList);
        
        // 3. Create and compile shaders programs
        _program        = gl.createProgram();
        _vertexShader   = createAndCompileVertex(_program, vertextSource);
        _fragmentShader = createAndCompileFragment(_program, fragmentSource);
            // Link both programs
        gl.linkProgram(_program);
            // Use the combined shader program object
        gl.useProgram(_program);
        
        // 4. Link the shaders to the buffers
        setPosition(_program, _bufferVertex);
    }
    
    var setBufferVertex = function(list){
        // Create a buffer
        buffer = gl.createBuffer();
        // Add an ArrayBuffer
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        // Pass the Array to the ArrayBuffer
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(list), gl.STATIC_DRAW);
        // Unbind the buffer
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        return buffer;
    }
    
    var createAndCompileVertex = function(program, script){
        if(null == script){
            // Early return
            return;
        }
        //Create a vertex shader object
        var vertexShader = gl.createShader(gl.VERTEX_SHADER);
        //Attach vertex shader source code
        gl.shaderSource(vertexShader, script);
        //Compile the vertex shader
        gl.compileShader(vertexShader);
        // Attach a vertex shader
        gl.attachShader(program, vertexShader);

        return vertexShader;
    }

    var createAndCompileFragment = function(program, script){
        if(null == script){
            // Early return
            return;
        }
        //Create a fragment shader object
        fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
        //Attach fragment shader source code
        gl.shaderSource(fragmentShader, script);
        //Compile the fragment shader
        gl.compileShader(fragmentShader);
        // Attach a fragment shader
        gl.attachShader(program, fragmentShader);

        return fragmentShader
    }

    var setPosition = function(program, buffer){
        //Bind vertex buffer object
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        //Get the attribute location
        var position = gl.getAttribLocation(program, 'position');
        //point an attribute to the currently bound VBO
        gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
        //Enable the attribute
        gl.enableVertexAttribArray(position);
    }

    this.setBackground = function(color){
        // Clear the _canvas
        gl.clearColor.apply(gl, convertToRGB(color));
    }

    this.setColor = function(color){
        _program.color = gl.getUniformLocation(_program, 'color');
        gl.uniform4fv(_program.color, convertToRGB(color));
    }

    this.draw = function(){
        // Enable the depth test
        gl.enable(gl.DEPTH_TEST); 
        
        // Clear the color buffer bit
        gl.clear(gl.COLOR_BUFFER_BIT);

        // Set the view port
        gl.viewport(0,0,_canvas.width,_canvas.height);

        // Draw the triangle
        gl.drawArrays(gl.TRIANGLES, 0, _vertexList.length / 2);
    }

    initialize(canvasReference);
}

var vertexScript     =  [
                            'attribute vec2 position;',
                            'void main() {',
                                'gl_Position = vec4(position, 0.0, 1.0);',
                            '}'
                        ].join('\n');

var fragmentScript   =  [ 
                            'precision highp float;',
                            'uniform vec4 color;',
                            'void main() {',
                                'gl_FragColor = color;',
                            '}'
                        ].join('\n');

var vertices         =  [
                            -0.5,-0.5,
                            0.5,-0.5,
                            0.0,0.5
                        ];

var kasumi = new Kasumi(canvas);
    kasumi.setProgram(vertices, vertexScript, fragmentScript);
    kasumi.setColor("#550000");
    kasumi.setBackground("#FF0000");
    kasumi.draw();
