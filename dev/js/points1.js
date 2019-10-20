var kasumi1 = new Kasumi("kasumi");
    kasumi1.setCanvasSize(200, 200);

//================Creating a canvas=================
kasumi1.createProgram();
//==========Defining and storing the geometry=======
kasumi1.createVertexBuffer([
    -0.5,0.5,0.0,
    0.0,0.5,0.0,
    -0.25,0.25,0.0, 
]);
//=========================Shaders========================
kasumi1.createVertexShader();

kasumi1.createFragmentShader();
kasumi1.activateShaders();
//======== Associating shaders to buffer objects ========
kasumi1.linkShadersToBuffers();
//============= Drawing the primitive ===============
kasumi1.drawPoints();
