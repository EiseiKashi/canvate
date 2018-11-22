var vertexScript1     = [
    'attribute vec3 position;' ,

    'void main(void) {' ,
    ' gl_Position = vec4(position, 1.0);' ,
    'gl_PointSize = 10.0;',
    '}'
].join('\n');


var fragmentScript1   = [ 
    'void main(void) {',
    ' gl_FragColor = vec4(0.0, 0.0, 0.0, 0.1);',
    '}'
].join('\n');

var vertices1        =  [
    -0.5,0.5,0.0,
    0.0,0.5,0.0,
    -0.25,0.25,0.0, 
];


var kasumi1 = new Kasumi("kasumi");
kasumi1.createPointDrawer(vertices1, vertexScript1, fragmentScript1, 'coordinates');


kasumi1.setColor("yellow");
kasumi1.setBackground("orchid");
kasumi1.draw();
