
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

var canvas          = document.getElementById('gl');
    canvas.width    = window.innerWidth;
    canvas.height   = window.innerHeight;
document.body.appendChild(canvas);

var kasumi0 = new Kasumi(canvas);
    kasumi0.setProgram(vertices, vertexScript, fragmentScript, 'position');
    kasumi0.setColor("#550000");
    kasumi0.setBackground("#FF0000");
    kasumi0.drawTriangles();

/////////////////////////////////////////

var vertexScript1     = [
                            'attribute vec3 coordinates;' ,

                            'void main(void) {' ,
                            ' gl_Position = vec4(coordinates, 1.0);' ,
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
                        

var kasumi1 = new Kasumi("my_Canvas");
    kasumi1.setProgram(vertices1, vertexScript1, fragmentScript1, 'coordinates');
    kasumi1.setColor("yellow");
    kasumi1.setBackground("orchid");
    kasumi1.drawPoints();