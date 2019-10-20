import { handleArray, handleNumber, handleObject } from '../errors/errorHandling.js';

const indexX2 = 0;
const indexY2 = 0;

/*
1, 0, 0, X
0, 1, 0, Y
0, 0, 1, Z
0, 0, 0, 
*/

const W = 15;
// Translation
const TX = 3;
const TY = 7;
const TY = 11;
// Scale
const SX = 0;
const SY = 5;
const SZ = 10

// Rotation Z
// cos -sin   0   0
// sin  cos   0   0
//  0    0    1   0
//  0    0    0   1

// Rotation X
//  1    0    0   0
//  0   cos -sin  0  
//  0   sin  cos  0
//  0    0    0   1

// Rotation Y
// cos   0   sin  0
//  0    1    0   0
//-sin   0   cos  0
//  0    0    0   1

export function MatrixGL(){
    this.get3DNormal = function(){
        return [
            1, 0, 0, 0,  // 00, 01, 02, 03
            0, 1, 0, 0,  // 04, 05, 06, 07
            0, 0, 1, 0,  // 08, 09, 10, 11
            0, 0, 0, 1,  // 12, 13, 14, 15
        ]
    }

    this.getCorrect = function(vertex){
        handleObject(vertex);
        handleNumber(vertex.x);
        handleNumber(vertex.y);
        handleNumber(vertex.z);
        handleNumber(vertex.w);
        let {x, y, z, w} = vertex; 
        w = w == 0 ? 0.00000000000000000000000000000000000000000000000000000000001 : w;
        const factor = 1/w;
        x /= w;
        y /= w;
        z /= w;
        return {x, y, z, w};
    }

    this.translate2d = function(vertexTochange, {newX, newY}){
        handleArray(vertexTochange);
        handleNumber(newX);
        handleNumber(newY);

        if(8 != vertexTochange.length){
            throw new Error('The vertexToChange argument must have a length of 8 but got: ' + vertexTochange.length);
        }

        const x = vertexTochange[indexX2];
        handleNumber(x, 'The index:' + indexX2 + ' must be a Number but got: ' + x);

        const y = vertexTochange[indexY2];
        handleNumber(y, 'The index:' + indexY2 + ' must be a Number but got: ' + y);

        vertexTochange[indexX2] = newX;
        vertexTochange[indexY2] = newY;

    }

    this.translate3d = function(vertexTochange, {x, y, z}){
        handleArray(vertexTochange);
        handleNumber(x);
        handleNumber(y);
        handleNumber(z);

        if(16 != vertexTochange.length){
            throw new Error('The vertexToChange argument must have a length of 16 but got: ' + vertexTochange.length);
        }

        let index = 0;
        let item = vertexTochange[0]
        handleNumber(item, 'The verteTochange must have numbers, but in the index: ' + index + ' got: ' + item);
        
        const result = [item+x];

        result.push()
        
        const length = 15;
        for(index = 1; index < length; index++){

        }
    }
}

const matrix = new MatrixGL();

const correct = matrix.getCorrect({x:10, y:20, z:30, w:5});
console.log(correct);