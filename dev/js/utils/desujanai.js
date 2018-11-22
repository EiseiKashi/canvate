window.isNumber = function(number){
    var isNull   = null == number;
    var isNotN   = isNaN(number);
    var isString;
    if(!isNull){
        isString = number.length != undefined;
    }
    var isNotAnumber = isNull || isNotN  ||  isString;
    if( isNotAnumber){
        return false;
    }
    return true;
}

window.isNotNumber = function(number){
    return !isNumber(number);
}

window.isArray = function(array){
    return Object.prototype.toString.call(array) === '[object Array]';
}