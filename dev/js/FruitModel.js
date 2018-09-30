'use strict'
function FruitModel(){
    var _self           = this;
    var _emitter        = new Shika(this);

    // SETTINGS //////////////////////////////////////////////////
    var _pathImage      = "images/";
    var _totalColumns   = 5;
    var _totalRows      = 3;
    var _totalTiles     = _totalColumns*_totalRows;
    var _balance        = 1000;
    var _bet            = 10;
    var _totalWin       = 0;
    var _totalBet       = 0;
    var _generalRatio   = .4;
    var _milliseconds   = 2500;
    var _uiList         = {
                             autoplay   : "autoplay-normal.png"
                            ,back       : "back-normal.png"
                            ,background : "game-background.jpg"
                            ,logo       : "game-logo.png"
                            ,info       : "info-normal.png"
                            ,minus      : "minus-normal.png"
                            ,paytable   : "paytable-normal.png"
                            ,plus       : "plus-normal.png"
                            ,sound      : "sound-normal.png"
                            ,quickspin  : "quickspin-normal.png"
                            ,spin       : "spin-normal.png"
                           }

    function Tile(id, amountValue, url, name){
        this.id             = id;
        this.amountValue    = amountValue;
        this.url            = url;
        this.name           = name;
    }

    var _itemList       = [
                            new Tile(   8
                                        ,{5:250, 4:200, 3:50}
                                        ,"symbol8.png"
                                        ,"sakura")
            
                            ,new Tile(   1
                                        ,{5:120, 4:60, 3:25}
                                        ,"symbol1.png"
                                        ,"suika")

                            ,new Tile(  9 
                                        ,
                                        {5:60, 4:25 ,3:10}
                                        ,"symbol9.png"
                                        ,"melon")

                            ,new Tile(   10
                                        ,
                                        {5:50, 4:20, 3:8}
                                        ,"symbol10.png"
                                        ,"mango")

                            ,new Tile(  4 
                                        ,
                                        {    5 : 40
                                            ,4 : 15
                                            ,3 : 7
                                         }
                                        ,"symbol4.png"
                                        ,"banana")

                            ,new Tile(  7 
                                        ,
                                        {    5 : 40
                                            ,4 : 15
                                            ,3 : 7
                                         }
                                        ,"symbol7.png"
                                        ,"pera")
            
                            ,new Tile(  3
                                        ,
                                        {    5 : 40
                                            ,4 : 15
                                            ,3 : 7
                                         }
                                        ,"symbol3.png"
                                        ,"orange")

                            ,new Tile(   2 
                                        ,
                                        {    5 : 25
                                            ,4 : 10
                                            ,3 : 5
                                         }
                                        ,"symbol2.png"
                                        ,"ringo")

                            ,new Tile(  6 
                                        ,{    5 : 40
                                            ,4 : 15
                                            ,3 : 7
                                         }
                                        ,"symbol6.png"
                                        ,"melocoton")

                            ,new Tile(   5 
                                        ,{    5 : 40
                                            ,4 : 15
                                            ,3 : 7
                                         }
                                        ,"symbol5.png"
                                        ,"lemon")
                          ];

    var _winnerLines    = [
                             [0,0,0,0,0]// Line 1
                            ,[1,1,1,1,1]// Line 2
                            ,[2,2,2,2,2]// Line 3
            
                            ,[0,1,2,1,0]// Valley
                            ,[2,1,0,1,2]// Mountain
            
                            ,[0,0,1,0,0]//eagle-up
                            ,[2,2,1,2,2]//eagle-down
            
                            ,[0,1,1,1,0]//bridge-up
                            ,[2,1,1,1,2]//bridge-down
            
                            ,[1,0,1,0,1]//sig-sag
                          ];

    // END SETTINGS //////////////////////////////////////////////////
    var _reelList       = [];
    

    this.LOADED = "loaded";

    this.loadData = function(){
        
        var url;
        
        for(var key in _uiList){
            url             = _uiList[key];
            url             = _pathImage + url;
            _uiList[key]    = url;
        }
        var item;
        length = _itemList.length;
        for(var index=0; index < length; index++){
            item        = _itemList[index];
            url         = _pathImage + item.url;
            item.url    = url;
        }
        
        _emitter.emit(_self.LOADED);
    }

    this.getBalance = function(){
        return _balance;
    }

    this.getBet = function(){
        return _bet;
    }

    this.chargeBet = function(){
        var data = null;
        if(_balance >= _bet){
            _balance  -= _bet;
            _totalBet += _bet;
            data = {totalBet:_totalBet, balance:_balance, totalWin:_totalWin};
            return data;
        }

        return data;
    }

    this.getWinnerLines = function(){
        return _winnerLines;
    }

    this.checkVictory = function(_currentSection){
        var wonLines = [];
        var targetIndex;
        var indexY;
        var prev;
        var line;
        var tile;
        var length = _winnerLines.length;

        var fromIndex   = _currentSection == 0 ? _totalTiles : _totalTiles*2;
        var toIndex     =  fromIndex+_totalTiles;
        var list        = _reelList.slice(fromIndex, toIndex);

        var winnerNames = ["Line 1", "Line 2", "Line 3", "Valley", "Mountain", "Falcon Up", "Falcon Down", "Bridge Up", "Bridge Down", "Sig-sag"];
        var wonList = [];
        for(var index=0; index < length; index++){
            line = _winnerLines[index];
            prev = null;
            var wonLines = [];
            for(var indexX=0; indexX < _totalColumns; indexX++){
                indexY          = line[indexX];
                targetIndex     = (indexX+indexY*_totalColumns);
                tile            = list[targetIndex];
                if(indexX > 0){
                    if(tile.id == prev){
                        wonLines.push({index:targetIndex, name:tile.name, tile:tile});
                    }else{
                        if(wonLines.length > 2){
                            wonList.push(wonLines);        
                        }
                        var wonLines = [];
                        wonLines.push({index:targetIndex, name:tile.name, tile:tile});
                    }
                }else{
                    wonLines.push({index:targetIndex, name:tile.name, tile:tile});
                }
                prev = tile.id;
            }
            
            if(wonLines.length > 2){
                wonList.push(wonLines);
            }
        }
        var contrastList = [];
        var contrastIndex;
        var totalWin = 0;
        var winner;
        var item;
        var wonLength;
        for(var index=0; index < wonList.length; index++){
            wonLines    = wonList[index];
            wonLines    = wonList[index];
            wonLength   = wonLines.length;
            for(var wonIndex=0; wonIndex < wonLength; wonIndex++){
                item            = wonLines[wonIndex]
                contrastIndex   = item.index;
                var tile        = item.tile;
                winner          = contrastList[contrastIndex+fromIndex];
                contrastList[contrastIndex+fromIndex] = true;
            }
            var amount  = Number(tile.amountValue[String(wonLength)]);
                amount *= wonLength;
            _totalWin  += amount;
        }
        
       return {contrastList:contrastList, fromIndex:fromIndex, totalWin:_totalWin, totalBet:_bet};
    }

    this.getReelList = function(){
        _reelList   = [];
        var length  = _totalRows*_totalColumns*4;

        for(var index=0; index < length; index++){
            var randomIndex = Math.floor(Math.random()*_itemList.length);
            _reelList.push(_itemList[randomIndex]);
        }

        /*
        //For test winner line
        _reelList[15] = _itemList[0];
        _reelList[16] = _itemList[0];
        _reelList[17] = _itemList[0];

        _reelList[30] = _itemList[0];
        _reelList[31] = _itemList[0];
        _reelList[32] = _itemList[0];

        _reelList[3] = _itemList[1];
        _reelList[4] = _itemList[1];
        */
        return _reelList;
    }

    this.getSymbolListPath = function(){
        var item;
        var symbolList = {};
        length = _itemList.length;
        for(var index=0; index < length; index++){
            item        = _itemList[index];
            symbolList[item.id] = item.url;
        }
        return symbolList;
    }

    this.getUIListPath = function(){
        return _uiList;
    }

    this.getSize = function(){
        return {
             totalColumns : _totalColumns
            ,totalRows    : _totalRows
        }
    }

    this.getGeneralRatio = function(){
        return _generalRatio;
    }

    this.getAutoPlayDelay = function(){
        return _milliseconds;
    }

    this.addEventListener = function(type, listener, context){
        _emitter.addEventListener(type, listener, context);
    }

    this.removeEventListener = function(){
        _emitter.removeEventListener(type, listener, context);
    }
}