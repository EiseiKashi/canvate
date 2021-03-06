var canvas;
var gl;
var vertices;
var vertex_buffer;
var vertCode;
var vertShader;
var fragCode;
var fragShader;
var shaderProgram;
var coord;

// 1.
function createGL(){
	canvas = document.getElementById('my_Canvas');
	gl = canvas.getContext('experimental-webgl'); 
};

// 2.
function createProgram(){
	// Create a shader program object to store
	// the combined shader program
	shaderProgram = gl.createProgram();
};

// 3.
function createVertexBuffer(){
	vertices = [
		-0.5,0.5,0.0,
		0.0,0.5,0.0,
		-0.25,0.25,0.0, 
	];

	// Create an empty buffer object to store the vertex buffer
	vertex_buffer = gl.createBuffer();

	//Bind appropriate array buffer to it
	gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);

	// Pass the vertex data to the buffer
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

	// Unbind the buffer
	gl.bindBuffer(gl.ARRAY_BUFFER, null);
};

// 4.
function createVertexShader(){
	// vertex shader source code
	vertCode =
		'attribute vec3 coordinates;' +

		'void main(void) {' +
			' gl_Position = vec4(coordinates, 1.0);' +
			'gl_PointSize = 10.0;'+
		'}';

	// Create a vertex shader object
	vertShader = gl.createShader(gl.VERTEX_SHADER);
	
	// Attach vertex shader source code
	gl.shaderSource(vertShader, vertCode);

	// Compile the vertex shader
	gl.compileShader(vertShader);

	// Attach a vertex shader
	gl.attachShader(shaderProgram, vertShader); 
};

// 5.
function createFragmentShader(){
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
	gl.attachShader(shaderProgram, fragShader);
};

// 6.
function activateShaders(){
	// Link both programs
	gl.linkProgram(shaderProgram);
	// Use the combined shader program object
	gl.useProgram(shaderProgram);
}

// 7.
function linkShadersToBuffers(){
	// Bind vertex buffer object
	gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);

	// Get the attribute location
	coord = gl.getAttribLocation(shaderProgram, "coordinates");

	// Point an attribute to the currently bound VBO
	gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);

	// Enable the attribute
	gl.enableVertexAttribArray(coord);
}

// 8.
function drawPoints(){
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

/*================Creating a canvas=================*/
createGL();
createProgram();
/*==========Defining and storing the geometry=======*/
createVertexBuffer();
/*=========================Shaders========================*/
createVertexShader();
createFragmentShader();
activateShaders();
/*======== Associating shaders to buffer objects ========*/
linkShadersToBuffers();
/*============= Drawing the primitive ===============*/
drawPoints();