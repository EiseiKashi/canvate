
const getIsNumber = function(number){
    if(null == number || isNaN(number)){
        return false;
    }
    return !isNaN(number);
}

export const isNumber = getIsNumber;

const isNaNumber = function(number){
    return !getIsNumber(number);
}
    
export const isNotNumber = isNaNumber;
    
export const isArray = function(list){
    return Array.isArray(list);
}
    
const handleArrayError = function(array, message){
const errorMessage = null != message ? `\n ${message}` : '';
    if(null == array){
        throw new Error(`Expected an Array but got null ${errorMessage}`);
    }
    if(!Array.isArray(array)){
        throw new Error(`Expected an Array but got: ${typeof array} with value of: ${array} ${errorMessage}`);
    }
}

export const handleArray = handleArrayError;

export const handleOutOfBound = function(list, index, message){
    handleArray(list, message);
    handleNumber(index, message);
    
    if(index != Math.round(index)){
        const errorMessage = null != message ? `\n ${message}` : '';
        throw new Error('The index must be an int Number. But got: ' + index + '. ' + message);
    }
    
    if(index < 0){
        throw new Error('The index must be a positive Number got: '+ index +'. ' + message);
    }
    
    if(index >= list.length){
        throw new Error('The index is out of bound, got: '+ index + ' and the length is: ' + list.length + '. ' + message);
    }
}

export const isObject = function(object){
    return (typeof object === "object") && (object !== null) ;
}

export const handleObject = function(object, message){
    const errorMessage = null != message ? `\n ${message}` : '';
    if(null == object){
        throw new Error(`Expected an Object but got null ${errorMessage}`);
    }
    
    if(typeof object != 'object'){
        throw new Error(`Expected an Object but got 『${typeof object}』 with value: 『${object}』 ${errorMessage}`);
    }
}

export const handleNotValidString = function(value, list, message){
    const errorMessage = message || '';
    handleArrayError(list);
    let length = list.length;
    const iterator = list.entries();
    for(const[index, word] of iterator){
        if(word == value){
            // Early return
            return;
        }
    }
    throw new Error(`The value must be a String and one of the follows values: ${list}. It got: ${value}. ${errorMessage}`);
}
    
export const handleNumber = function (numberTocheck, message){
    const errorMessage = message || '';
    if(isNaNumber(numberTocheck)){
        throw new Error(`Is not a Number error. Get: ${numberTocheck} ${errorMessage}`);
    }
}
    
export const handleString = function(value, message){
    const errorMessage = null != message ? `\n ${message}` : '';
    if(null == value){
        throw new Error(`Expected an String but got null ${errorMessage}`);
    }
    
    if(typeof value != 'string'){
        throw new Error(`Expected an String but got ${typeof value} with value: 『${JSON.stringify(value)}』 ${errorMessage}`);
    }
}

export const handleEmptyString = function(value, message){
    const errorMessage = null != message ? `\n ${message}` : '';
    handleString(value, errorMessage);
    if(0 == value.length){
        throw new Error(`Expected a non empty String ${errorMessage}`);
    }
}

export const handleNull = function (value, message){
    const errorMessage = message || '';
    
    if(null == value){
        throw new Error(`The value must not be null ${errorMessage}`);
    }
}

export const handleNullEmpty = function (value, message){
    const errorMessage = message || '';
    if(null == value || value == ''){
        throw new Error(`The value must not be null ${errorMessage}`);
    }
}

export const handleStringOrNumber = function (value, message){
    const errorMessage = message || '';
    if(isNumber(value)){
        return;
    }
    
    if(null == value || typeof value != 'string' || value.split(' ').join('') == ''){
        throw new Error(`The value must not be a Number or not empty String and got: '${value}' ${errorMessage}`);
    }
}

export const handleFunction = function(functionRef, message){
    const errorMessage = null != message ? `\n ${message}` : '';
    if(null == functionRef){
        throw new Error(`Expected a Function but got null ${errorMessage}`);
    }
    
    if(typeof functionRef != 'function'){
        throw new Error(`Expected a Function but got: ${typeof functionRef} with value of: ${functionRef} ${errorMessage}`);
    }
}

export const isHTMLElement = function(element){
    try{
        elementName = value.constructor.name;
    }catch(error){
        // Early return
       return false;
    }

    if(elementName == 'HTMLUnknownElement'){
        // Early return
        return false;
    }

    return true;
}

export const handleHTMLElement = function(value, message){
    const errorMessage = message || '';
    let elementName;
    try{
        elementName = value.constructor.name;
    }catch(error){
        throw new Error(`Expected an HTMLElement but got: ${typeof value} with value of: ${value} ${errorMessage}`);
    }

    if(elementName == 'HTMLUnknownElement'){
        throw new Error(`Expected an HTMLElement but got: ${typeof value} with value of: ${value} ${errorMessage}`);
    }
}