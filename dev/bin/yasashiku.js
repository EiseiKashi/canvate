/*
Author: Eisei Kashi - 07/2018
*/
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

function Yasashiku (){
    {//Formula list, credits: Robert Penner
        Math.linearTween = function (t, b, c, d) {
            return c*t/d + b;
        };
    
        Math.inQuad = function (t, b, c, d) {
            return c*(t/=d)*t + b;
        };
        Math.outQuad = function (t, b, c, d) {
            return -c *(t/=d)*(t-2) + b;
        };
        Math.inOutQuad = function (t, b, c, d) {
            if ((t/=d/2) < 1) return c/2*t*t + b;
            return -c/2 * ((--t)*(t-2) - 1) + b;
        };
    
        Math.inCubic = function (t, b, c, d) {
            return c*(t/=d)*t*t + b;
        };
        Math.outCubic = function (t, b, c, d) {
            return c*((t=t/d-1)*t*t + 1) + b;
        };
        Math.inOutCubic = function (t, b, c, d) {
            if ((t/=d/2) < 1) return c/2*t*t*t + b;
            return c/2*((t-=2)*t*t + 2) + b;
        };
    
        Math.inQuart = function (t, b, c, d) {
            return c*(t/=d)*t*t*t + b;
        };
        Math.outQuart = function (t, b, c, d) {
            return -c * ((t=t/d-1)*t*t*t - 1) + b;
        };
        Math.inOutQuart = function (t, b, c, d) {
            if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
            return -c/2 * ((t-=2)*t*t*t - 2) + b;
        };
    
        Math.inQuint = function (t, b, c, d) {
            return c*(t/=d)*t*t*t*t + b;
        };
        Math.outQuint = function (t, b, c, d) {
            return c*((t=t/d-1)*t*t*t*t + 1) + b;
        };
        Math.inOutQuint = function (t, b, c, d) {
            if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
            return c/2*((t-=2)*t*t*t*t + 2) + b;
        };
    
        Math.inSine = function (t, b, c, d) {
            return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
        };
        Math.outSine = function (t, b, c, d) {
            return c * Math.sin(t/d * (Math.PI/2)) + b;
        };
        Math.inOutSine = function (t, b, c, d) {
            return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
        };
    
        Math.inExpo = function (t, b, c, d) {
            return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
        };
        Math.outExpo = function (t, b, c, d) {
            return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
        };
        Math.inOutExpo = function (t, b, c, d) {
            if (t==0) return b;
            if (t==d) return b+c;
            if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
            return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
        };
    
        Math.inCirc = function (t, b, c, d) {
            return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
        };
        Math.outCirc = function (t, b, c, d) {
            return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
        };
        Math.inOutCirc = function (t, b, c, d) {
            if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
            return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
        };
    
        /////////// ELASTIC EASING: exponentially decaying sine wave  //////////////
    
        // t: current time, b: beginning value, c: change in value, d: duration, a: amplitude (optional), p: period (optional)
        // t and d can be in frames or seconds/milliseconds
        Math.inElastic = function (t, b, c, d, a, p) {
            if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
            if (a < Math.abs(c)) { a=c; var s=p/4; }
            else var s = p/(2*Math.PI) * Math.asin (c/a);
            return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
        };
        Math.outElastic = function (t, b, c, d, a, p) {
            if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
            if (a < Math.abs(c)) { a=c; var s=p/4; }
            else var s = p/(2*Math.PI) * Math.asin (c/a);
            return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
        };
        Math.inOutElastic = function (t, b, c, d, a, p) {
            if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
            if (a < Math.abs(c)) { a=c; var s=p/4; }
            else var s = p/(2*Math.PI) * Math.asin (c/a);
            if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
            return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
        };
    
        // back easing in - backtracking slightly, then reversing direction and moving to target
        // t: current time, b: beginning value, c: change in value, d: duration, s: overshoot amount (optional)
        // t and d can be in frames or seconds/milliseconds
        // s controls the amount of overshoot: higher s means greater overshoot
        // s has a default value of 1.70158, which produces an overshoot of 10 percent
        // s==0 produces cubic easing with no overshoot
        Math.inBack = function (t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            return c*(t/=d)*t*((s+1)*t - s) + b;
        };
        // back easing out - moving towards target, overshooting it slightly, then reversing and coming back to target
        Math.outBack = function (t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
        };
        // back easing in/out - backtracking slightly, then reversing direction and moving to target,
        // then overshooting target, reversing, and finally coming back to target
        Math.inOutBack = function (t, b, c, d, s) {
            if (s == undefined) s = 1.70158; 
            if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
            return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
        };
    
        /////////// BOUNCE EASING: exponentially decaying parabolic bounce  //////////////
    
        // bounce easing in
        // t: current time, b: beginning value, c: change in position, d: duration
        Math.inBounce = function (t, b, c, d) {
            return c - Math.outBounce (d-t, 0, c, d) + b;
        };
        // bounce easing out
        Math.outBounce = function (t, b, c, d) {
            if ((t/=d) < (1/2.75)) {
                return c*(7.5625*t*t) + b;
            } else if (t < (2/2.75)) {
                return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
            } else if (t < (2.5/2.75)) {
                return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
            } else {
                return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
            }
        };
        // bounce easing in/out
        Math.inOutBounce = function (t, b, c, d) {
            if (t < d/2) return Math.inBounce (t*2, 0, c, d) * .5 + b;
            return Math.outBounce (t*2-d, 0, c, d) * .5 + c*.5 + b;
        };
    }

    function Yasashiku(){
        'use strict'
        Yasashiku.EVENT_START       = this.EVENT_START      = "start";
        Yasashiku.EVENT_COMPLETE    = this.EVENT_COMPLETE   = "complete";
        Yasashiku.EVENT_TICK        = this.EVENT_TICK       = "tick";
        Yasashiku.EVENT_STOP        = this.EVENT_STOP       = "stop";
        Yasashiku.EVENT_PAUSE       = this.EVENT_PAUSE      = "pause";

        var _self           = this;
        var _emitter        = new Shika(this);
        var _stateList      = [];
        var _lastTime       = 0;
        var _lapsed         = 0;
        var _duration       = 1000;
        var _ratio          = 0;
        var _isLast         = false;
        var _formulaName    = "inOutQuad";
        var _formula        = Math[_formulaName];
        var _isActive       = false;
        
        var _idTime;
        
        this.seconds; 
        this.formula;

        var StatesFromTo = function(target, to){
            var from    = {};
            
            this.from   = from;
            this.to     = to;
            this.target = target;

            this.update = function(){
                for(var property in to){
                    var fromStr = target[property];
                    from[property] = fromStr == "" ? 0 : fromStr;
                }
            }
        }

        var stateCounter = 0;
        this.add = function(stateFrom, stateTo){
            _stateList.push(new StatesFromTo(stateFrom, stateTo));
            return stateCounter++;
        }

        this.removeByIndex = function(index){
            if(isNumber(index) && index > 0){
                _stateList.splice(Math.round(index), 1);
            }
        }

        var playDelay = function(){
            _isActive       = true;
            _formula        = Math[_formulaName];
            _lastTime       = Date.now();
            _lapsed         = 0;

            var length = _stateList.length;
            for(var index = 0; index <length; index++){
                _stateList[index].update();
            }
            update();
            emit(_self.EVENT_START);
        }

        this.play = function(seconds, delay){
            if(isNumber(seconds)){
                _self.seconds = seconds;
            }
            cancelAnimationFrame(_idTime);
            if(!isNumber(delay)){
                delay = 0;
            }
            setTimeout(playDelay, delay*1000);
        }

        this.stop = function(){
            cancelAnimationFrame(_idTime);
            _isActive   = false;
            _duration   = 0;
            emit(_self.EVENT_STOP);
        }

        this.pause = function(){
            _isActive = false;
            emit(_self.EVENT_PAUSE);
        }

        this.addEventListener = function(type, listener, context){
            _emitter.addEventListener(type, listener, context);
        }

        this.removeEventListener = function(type, listener, context){
            _emitter.removeEventListener(type, listener, context);
        }

        var emit = function(type){
            _emitter.emit(type, {   
                                     ratio      : _ratio
                                    ,seconds    : _duration/1000
                                    ,lapsed     : _lapsed/1000
                                    ,isLast     : _isLast
                                    ,isPlaying  : _isActive
                                });
        }

        var laps;
        var update = function(){
            if(!_isActive){
                return;
            }

            if(isNumber(_self.seconds)){
                _duration       = _self.seconds * 1000;
            }else{
                _self.seconds   = _duration/1000;
            }

            if(_duration == 0){
                // Early return
                return;
            }

            if(_self.formula in Math){
                _formulaName = _self.formula;
            }else{
                _self.formula = _formulaName;  
            }

            _formula    = Math[_formulaName];

            var now     = Date.now();
            laps        = now - _lastTime;
            _lapsed     += laps;
            _lastTime   = now;

            if(_duration <= _lapsed){
                _ratio      = 1;
                _isActive   = false;
            }else{
                _ratio = _formula(_lapsed, 0, 1, _duration);
            }

            var length = _stateList.length;
            var from;
            var to;
            var target;
            var states;
            var fromNum;
            var toStr;
            var toNum;
            var unit;
            for(var index=0; index < length; index++){
                states = _stateList[index];
                to     = states.to;
                from   = states.from;
                target = states.target;
                for(var property in to){
                    fromNum = parseFloat(from[property]);
                    toNum   = toStr = to[property];
                    unit = 0;
                    if(typeof toStr == "string"){
                        toNum   = parseFloat(toStr);
                        unit    = toStr.replace(toNum, "");
                        if(unit == ""){
                            unit = 0;
                        }
                    }
                    
                    target[property] = (fromNum + (toNum - fromNum)*_ratio)+unit;
                }
            }

            if(!_isActive){
                _isLast = true;
                _self.stop();
                emit(_self.EVENT_TICK);
                emit(_self.EVENT_COMPLETE);
                _isLast = false;
                cancelAnimationFrame(_idTime);
            }else{
                cancelAnimationFrame(_idTime);
                _idTime = requestAnimationFrame(update);
                emit(_self.EVENT_TICK);
            }
            
        }
    }

    return new Yasashiku();
}