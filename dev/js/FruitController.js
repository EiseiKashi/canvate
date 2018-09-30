'use strict'
function FruitController(ModelConstructor, ViewConstructor, canvasId){
    var _self           = this;
    var _model          = new ModelConstructor();
    var _currentSection = 0;
    var _isActive       = true;
    var _isAutoPlay     = false;
    var _view;
    var _winnerLines    
    var _totalColumns;
    var _totalRows;
    var _totalTiles;
    var _listReel;
    var _idInterval;

    this.initialize = function(){
        _model.addEventListener(_model.LOADED, onDataLoaded);
        _model.loadData();
    }
    
    function onDataLoaded(){
        _winnerLines    = _model.getWinnerLines();
        var size        = _model.getSize();
        _totalColumns   = size.totalColumns;
        _totalRows      = size.totalRows;
        _totalTiles     = _totalColumns*_totalRows;
        
        _view           = new ViewConstructor(canvasId, _model.getGeneralRatio())
        _view.addEventListener(_view.LOADED,        onLoadImages);
        _view.addEventListener(_view.AUTOPLAY,      onSpinAutoplay);
        _view.addEventListener(_view.AUTOPLAY_STOP, onSpinStop);
        _view.addEventListener(_view.SPIN,          onSpinClick);
        _view.addEventListener(_view.SPIN_COMPLETE, onSpinComplete);

        _view.initialize (  _model.getUIListPath()
                            ,_model.getSymbolListPath()
                            ,_totalColumns
                            ,_totalRows               
                         );
    }

    function onLoadImages(){
        _view.displayUI();
        _listReel       = _model.getReelList();
        _currentSection = -1;
        displayReels(true);
    }

    function onSpinAutoplay(event){
        _isAutoPlay = true;
        if(!_isActive){
            // Early return
            return;
        }
        displayReels();
    }

    function onSpinStop(event){
        clearTimeout(_idInterval);
        _isAutoPlay = false;
    }

    function spinAutoplay(event){
        clearTimeout(_idInterval);
        _idInterval = setTimeout(onSpinAutoplay, _model.getAutoPlayDelay());
    }

    function onSpinClick(event){
        if(!_isActive){
            // Early return
            return;
        }
        displayReels();
    }

    function displayReels(isFirstTime){
        if(!isFirstTime){
            var data = _model.chargeBet();
        }

        if(null != data || isFirstTime){
            _isActive = true;
            _listReel = _model.getReelList();
            _view.displayReels(_listReel, _currentSection, isFirstTime);
            _view.displayBalance(_model.getBalance());
            if(!isFirstTime){
                _view.displayTotalBet(data.totalBet);
            }
        }else{
            _view.deactivateButtons();
        }
    }

    function onSpinComplete(event){
        checkVictory();
        _currentSection = 0 == _currentSection ? -1 : 0;
    }

    function checkVictory(){
        var result = _model.checkVictory(_currentSection);
        _view.displayWinner(result.contrastList, result.fromIndex);
        
        var totalWin = result.totalWin;
        if(totalWin > 0){
            _view.displayTotalWin(totalWin);
        }

        _isActive = true;
        if(_isAutoPlay){
            spinAutoplay();
        }
    }
}