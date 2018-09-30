'use strict'

function FruitView(id, generalRatio){
    var _self           = this;
    var _emitter        = new Shika(this);

    this.LOADED         = "complete";
    this.SPIN           = "spin";
    this.AUTOPLAY       = "autoplay"
    this.AUTOPLAY_STOP  = "autoplayStop"

    var _generalRatio   = generalRatio;
    
    var _numberList = {
         canvasWidth  : 1280
        ,canvasheight : 720

        ,_reelsWidth  : 1000
        ,_reelsHeight : 504
        ,_reelsX      : 140
        ,_reelsY      : 97
        ,_gap         : 300
    }

    for(var prop in _numberList){
        var value = _numberList[prop];
     _numberList[prop] = value * _generalRatio;
    }

    var _reelsWidth         = _numberList._reelsWidth;
    var _reelsHeight        = _numberList._reelsHeight;
    var _reelsX             = _numberList._reelsX;
    var _reelsY             = _numberList._reelsY;
    var _durationIn         = .7;
    var _durationOut        = .7;
    var _ratioLapsed        = .68;
    var _totalLoops         = 2;
    var _totalImages        = 0;
    var _counter            = 0;
    var _currentSection     = 0;
    var _animationCounter   = 0;
    var _isPlaying          = false;

    var _canvateList        = [];
    var _tileWidth;
    var _tileHeight;
    var _totalColumns;
    var _totalRows;
    var _maskContainer;
    var _columnsList;
    var _animationList;
    var _canvas;
    var _canvateMain;
    var _uiList;
    var _symbolList;
    var _currentReelList;
    var _reelContainer;
    var _blinkId;
    var _autoplayText;
    var _balanceText;
    var _creditText;
    var _totalText;
    var _totalWinText;
    var _totalBetText;
    var _titleBetText;

    this.SPIN_COMPLETE = "spinComplete";
    
    function ReelAnimation(reel){
        var _self           = this;
        var _isActive       = false;
        var _loopCounter    = 0;
        var _stateAnimation = {y:0};
        var _totalLoops
        var _animation;
        var _idInterval;

        this.play = function(delay){
            _isActive = true;
            clearInterval(_idInterval);
            _stateAnimation.y   = -_reelsHeight*3;
            _animation.formula  = "inBack";
            //reel.y = 
            _totalLoops = Math.round(Math.random()*3)+2
            _animation.play(_durationIn, delay);
        }

        function onTick(event){
            if(event.lapsed > _durationIn*_ratioLapsed){
                if(_isActive){
                    _animation.stop();
                    _loopCounter = 0;
                    _idInterval = setInterval(animateLoop, 10);
                }
            }
        }

        function animateLoop (){
            var y = reel.y +40;
             
            if(reel.y == 0){
                y = -reel.height +_numberList._reelsHeight;
                _loopCounter++
            }

            if(y > 0){
                y = 0;
            }

            reel.y = y;
            
            if(_loopCounter > _totalLoops){
                clearInterval(_idInterval);
                _stateAnimation.y =  _currentSection == 0 ? -_reelsHeight : -_reelsHeight*2;
                _animation.formula = "outBounce";
                _animation.play(_durationOut);
                _isActive = false;
                return
            }
        }

        function onComplete(){
            onAnimationComplete();
        }
        
        _animation = new Yasashiku();
        _animation.add(reel, _stateAnimation);
        _animation.formula = "inOutBack";
        _animation.addEventListener(_animation.EVENT_TICK, onTick);
        _animation.addEventListener(_animation.EVENT_COMPLETE, onComplete);
    }
    
    this.initialize = function(uiList, symbolList, totalColumns, totalRows){
        if(null == uiList){
            throw new Error("The parameter symbolList must be passed")
        }
        
        if(null == symbolList){
            throw new Error("The parameter symbolList must be passed")
        }

        _totalColumns = totalColumns;
        _totalRows    = totalRows;

        _canvas       = document.getElementById(id);
        _canvas.width = _numberList.canvasWidth;
        _canvas.height= _numberList.canvasheight;

        _tileWidth    = _numberList._reelsWidth  / _totalColumns;
        _tileHeight   = _numberList._reelsHeight / _totalRows;

        _canvateMain  = new Canvate(_canvas, false);
        _counter      = 0;
        _totalImages  = 0;

        for(var key in uiList){
            _totalImages++;
        }

        for(var key in symbolList){
            _totalImages++;
        }

        _uiList = {};
        var imageCanvate;
        for(var property in uiList){
            imageCanvate = _canvateMain.addNewByURL(uiList[property]);
            imageCanvate.addEventListener(_canvateMain.IMAGE_LOADED, onLoadImage);
            _uiList[property] = imageCanvate;
        }

        var url
        _symbolList = {};
        for(var key in symbolList){
            url = symbolList[key];
            imageCanvate = _canvateMain.addNewByURL(url);
            imageCanvate.addEventListener(_canvateMain.IMAGE_LOADED, onLoadImage);

            _symbolList[key] = imageCanvate;
        }
    }
    
    this.displayUI = function(){
        _canvateMain.removeAll();

        addAndSet(_uiList.background, 0, 0,  _numberList.canvasWidth/_generalRatio,  _numberList.canvasheight/_generalRatio);
        
        var x       = 0
        var y       = _numberList.canvasheight;
        var width   = _numberList.canvasWidth;
        var height  = 99 * _generalRatio;
        var color   = "#d1f1f7";
        var background1 = _canvateMain.addNewRect(x, y, width, height, color);
        background1.setPivot(0, 1);

        var x       = 114*_generalRatio;
        var width   = _numberList.canvasWidth/1.61;
        var height  = 90/2 * _generalRatio;
        var y       = _numberList.canvasheight- 106/2 * _generalRatio;
        var color   = "#0e8e9a";
        var background2 = _canvateMain.addNewRect(x, y, width, height, color);
        background2.setPivot(0, 1);

        var x       = 510*_generalRatio;
        var width   = _numberList.canvasWidth/3.2;
        var height  = 95 * _generalRatio;
        var y       = _numberList.canvasheight- 195/2 * _generalRatio;
        var color   = "#0e8e9a";
        var background3 = _canvateMain.addNewRect(x, y, width, height, color);
        background3.setPivot(0, 0);

        addAndSet(_uiList.back, 32, 26, 76, 76);
        addAndSet(_uiList.logo,  (_numberList.canvasWidth/2)/_generalRatio, 29, 230, 52);
        addAndSet(_uiList.paytable, 117, 626, 39, 39);
        addAndSet(_uiList.sound, 162, 626, 39, 39);
        addAndSet(_uiList.info, 117, 674, 39, 39);
        addAndSet(_uiList.quickspin, 162, 674, 39, 39);
        addAndSet(_uiList.plus, 653, 626, 39, 39);
        addAndSet(_uiList.minus, 653, 674, 39, 39);
        addAndSet(_uiList.autoplay, 956, 651, 142, 42);
        addAndSet(_uiList.spin, 1140, 573, 130, 130);

        _uiList.logo.setPivot(.5, 0);

        var x = _reelsX;
        var y = _reelsY;

        _columnsList    = [];
        _animationList  = [];

        _maskContainer  = _canvateMain.addNewRect(_reelsX, _reelsY, _reelsWidth, _reelsHeight, "white");
        
        _reelContainer  = _canvateMain.addNew();
        _reelContainer.setPosition(_reelsX, _reelsY);
        _reelContainer.setMask(_maskContainer);

        _autoplayText   = _canvateMain.addNew();
        _autoplayText.setText("AUTOPLAY",130*_generalRatio, 'sans-serif', "white", "center");
        _autoplayText.setPosition(60*_generalRatio,50*_generalRatio);
        _uiList.autoplay.add(_autoplayText);

        var x       = 210*_generalRatio;
        var width   = _numberList.canvasWidth/3.2;
        var height  = 95 * _generalRatio;
        var y       = _numberList.canvasheight * _generalRatio * 2.46;
        var color   = "#0e8e9a";
        _balanceText   = _canvateMain.addNew();
        _balanceText.setText("BALANCE:",25*_generalRatio, 'Roboto', color, "left");
        _balanceText.setPosition(x, y);
        _balanceText.setPivot(0, 1);

        var x       = 370*_generalRatio;
        var width   = _numberList.canvasWidth/3.2;
        var height  = 95 * _generalRatio;
        var y       = _numberList.canvasheight * _generalRatio * 2.46;
        var color   = "#0e8e9a";
        _creditText   = _canvateMain.addNew();
        _creditText.setText("£0",25*_generalRatio, 'Roboto', color, "left");
        _creditText.setPosition(x, y);
        _creditText.setPivot(0, 1);

        var x       = 710*_generalRatio;
        var width   = _numberList.canvasWidth/3.2;
        var height  = 95 * _generalRatio;
        var y       = _numberList.canvasheight * _generalRatio * 2.3;
        var color   = "#d1f1f7";
        _totalText   = _canvateMain.addNew();
        _totalText.setText("TOTAL WIN",25*_generalRatio, 'Roboto', color, "left");
        _totalText.setPosition(x, y);
        _totalText.setPivot(0, 1);
        _totalText.width = 180*_generalRatio;

        var x           = 710*_generalRatio;
        var width       = _numberList.canvasWidth/3.2;
        var height      = 95 * _generalRatio;
        var y           = _numberList.canvasheight * _generalRatio * 2.49;
        var color       = "#d1f1f7";
        _totalWinText   = _canvateMain.addNew();
        _totalWinText.setText("£0",40*_generalRatio, 'Roboto', color, "left");
        _totalWinText.setPosition(x, y);
        _totalWinText.setPivot(0, 1);
        _totalWinText.width = 250*_generalRatio;

        var x           = 518*_generalRatio;
        var width       = _numberList.canvasWidth/3.2;
        var height      = 95 * _generalRatio;
        var y           = _numberList.canvasheight * _generalRatio * 2.30;
        var color       = "#d1f1f7";
        _titleBetText   = _canvateMain.addNew();
        _titleBetText.setText("TOTAL BET",25*_generalRatio, 'Roboto', color, "left");
        _titleBetText.setPosition(x, y);
        _titleBetText.setPivot(0, 1);
        _titleBetText.fitToText();

        var x           = 540*_generalRatio;
        var width       = _numberList.canvasWidth/3.2;
        var height      = 95 * _generalRatio;
        var y           = _numberList.canvasheight * _generalRatio * 2.49;
        var color       = "#d1f1f7";
        _totalBetText   = _canvateMain.addNew();
        _totalBetText.setText("£0",35*_generalRatio, 'Roboto', color, "left");
        _totalBetText.setPosition(x, y);
        _totalBetText.setPivot(0, 1);
        _totalBetText.width = 300;


        for(var index = 0; index < _totalColumns; index++){
            var rect = _reelContainer.addNew();
                rect.setPosition(index*_tileWidth, -_reelsHeight);
            _columnsList.push(rect);
            var animation = new ReelAnimation(rect);
            _animationList.push(animation);
            animation.onAnimationComplete = onAnimationComplete;
        }

        setButtons();
    }

    this.displayReels = function(reelList, currentSection, isInitial){
        _currentReelList    = reelList;
        _currentSection     = currentSection;

        var indexY  = 0;
        var length  = _currentReelList.length;
        var indexX;
        var symbol;
        var canvate;
        var tile;

        var avoidFrom   = _currentSection == 0 ? _totalRows*2 : _totalRows;
        var avoidUntil  = avoidFrom + _totalRows;
        
        var margin      = _tileHeight/2;  
        for(var index=0; index < length; index++){
            indexX = index%_totalColumns;
            if(indexX == 0 && index > 0){
                indexY ++;
            }

            var column  = _columnsList[indexX];
            tile        = _currentReelList[index];
            symbol      = _symbolList[tile.id];

            if(isInitial){
                canvate = column.addNew(symbol.getImage());
                var animation = new Yasashiku();
                    animation.formula = "inOutBack";
                var state     = {alpha:1, scale:1}
                    animation.add(canvate, state);
                _canvateList.push({animation:animation, state:state});
                animation.play();
                canvate.setPosition( margin, _tileHeight*indexY+margin);
                canvate.setSize(_tileWidth, _tileHeight);
                canvate.setPivot(.5, .5)
            }else{
                var isInRange = (indexY >= avoidFrom && indexY < avoidUntil);
                if(!isInRange){
                    canvate = column.getAt(indexY);
                    canvate.setImage(symbol.getImage());
                }
            }
            var animationState = _canvateList[index];
            animationState.state.alpha = 1;
            animationState.state.scaleX = 1;
            animationState.state.scaleY = 1;
            animationState.animation.play(.7);
            
        }
        
        if(!isInitial){
            
            animateSpin();
        }
    }

    this.displayWinner = function(contrastList){
        if(contrastList.length == 0){
            return
        }
        var animationState;
        var alpha;
        var scale;
        var canvate;
        var length = _canvateList.length;
        for(var index=0; index < length; index++){
            alpha = contrastList[index] === true ? 1 : .7;
            scale = contrastList[index] === true ? 1 : .6;
            animationState = _canvateList[index];
            animationState.state.alpha = alpha;
            animationState.state.scaleX = scale;
            animationState.state.scaleY = scale;
            animationState.animation.play(2);
        }
    }

    this.displayBalance = function(balance){
        console.log(balance);
        _creditText.setText("£"+balance);
        _creditText.width = 300*_generalRatio;;
    }

    this.displayTotalWin = function(totalWin){
        _totalWinText.setText("£"+String(totalWin));
        _totalWinText.fitToText();
    }

    this.displayTotalBet = function(totalBet){
        _totalBetText.setText("£"+String(totalBet));
        _totalBetText.fitToText();
    }

    this.deactivateButtons = function(){
        _uiList.spin.removeEventListener(Shika.CLICK, onSpinClick);
        _reelContainer.removeEventListener(Shika.CLICK, onSpinClick);
        _uiList.autoplay.removeEventListener(Shika.CLICK, onAutoPlayInit);

        clearInterval(_blinkId);
        
        _uiList.spin.alpha      = 0.8;
        _reelContainer.alpha    = 0.8;
        _uiList.autoplay.alpha  = 0.8;
    }

    this.addEventListener = function(type, listener, context){
        _emitter.addEventListener(type, listener, context);
    }

    this.removeEventListener = function(type, listener, context){
        _emitter.removeEventListener(type, listener, context);
    }

    function addAndSet(canvate, x, y, width, height){
            canvate.setPosition(x*_generalRatio, y*_generalRatio);
            canvate.setSize(width*_generalRatio, height*_generalRatio);
            canvate.visible = true;
            canvate.resizeImageToCanvas();
        
        _canvateMain.add(canvate);
    }

    function setButtons(){
        _uiList.spin.addEventListener(Shika.CLICK, onSpinClick);
        _reelContainer.addEventListener(Shika.CLICK, onSpinClick);
        _uiList.autoplay.addEventListener(Shika.CLICK, onAutoPlayInit);
    }

    function animateSpin(){
        _isPlaying          = true;
        _animationCounter   = 0;
        var length          = _animationList.length;
        var delay           = 0;
        for(var index=0; index < length; index++){
            _animationList[index].play(delay, 5);
            delay += .05;
        }
    }

    function onLoadImage(event){
        event.target.visible = false;
        _counter ++;
        if(_counter == _totalImages){
            _emitter.emit(_self.LOADED);
        }
    }

    function onSpinClick(event){
        if(_isPlaying){
            // Early return
            return;
        }
        clearInterval(_blinkId);
        _autoplayText.alpha = 1;
        _emitter.emit(_self.SPIN);
        _emitter.emit(_self.AUTOPLAY_STOP);
    }

    function onAutoPlayInit(event){
        _autoplayText.alpha = 1;
        _uiList.autoplay.removeEventListener(Shika.CLICK, onAutoPlayInit);
        _uiList.autoplay.addEventListener(Shika.CLICK, onAutoPlayStop);
        clearInterval(_blinkId);
        _blinkId = setInterval(blinkAutoplay, 860);
        _emitter.emit(_self.AUTOPLAY);
    }

    function onAutoPlayStop(event){
        _autoplayText.alpha = 1;
        _uiList.autoplay.removeEventListener(Shika.CLICK, onAutoPlayStop);
        _uiList.autoplay.addEventListener(Shika.CLICK, onAutoPlayInit);
        clearInterval(_blinkId);
        _emitter.emit(_self.AUTOPLAY_STOP);
    }

    function blinkAutoplay(){
        _autoplayText.alpha = _autoplayText.alpha != 1 ? 1 : .5
    }

    function onAnimationComplete(){
        _animationCounter++;
        if(_animationCounter == _animationList.length){
            _isPlaying = false;
            _emitter.emit(_self.SPIN_COMPLETE)
        }
    }
}