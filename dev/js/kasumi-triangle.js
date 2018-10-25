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

var canvas          = document.createElement('canvas');
    canvas.width    = window.innerWidth;
    canvas.height   = window.innerHeight;
document.body.appendChild(canvas);

var kasumi = new Kasumi(canvas);
kasumi.createTriangleDrawer(vertices, vertexScript, fragmentScript);
kasumi.setColor("#550000");
kasumi.setBackground("#FF0000");
kasumi.draw();