var _id	    = 0;
var _type   = 1;
var _title1 = 2;
var _desc1  = 3;
var _price1 = 4;
var _price2 = 5;
var _pic1	= 6;
var _order1 = 7;
var _order2 = 8;

function SiteModel () {
	var _self = this;
	
	var _lastTypeIndex;
	var _lastItemIndex;
	
	this.typeList;
	
	this.onGetData = function(){
		
	};
	
	this.getData = function(){
		var data = {};
		data.method    = "data";
		sendData(data);
	}
	
	function onloadData(data){
        try {
            _self.typeList = JSON.parse(decodeURIComponent(escape(data)));
            _self.onGetData();
        }catch (error){
            _self.typeList = JSON.parse(data);
            _self.onGetData();
        }
	}
	
	function sendData(data){
		var loader = new XMLHttpRequest();
			loader.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
				   onloadData(loader.responseText);
				}
			};
			loader.open("POST", "dat/gestor.php", true);
			loader.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=ISO-8859-1");
			var dataEncoded = encodeURIComponent (JSON.stringify(data));
			loader.send("data="+dataEncoded);
	}
	
	function getTypeOrder(){
		var length = _self.typeList.length;
		var typeOrder = [];
		for(var index = 0; index < length; index++){
			var name = _self.typeList[index].name;
			typeOrder.push(encodeURIComponent(name));
		}
		return typeOrder;
	}
	
	function getItemOrder(typeIndex){
		var list   = _self.typeList[typeIndex].list;
		var length = list.length;
		var itemOrder = [];
		for(var index = 0; index < length; index++){
			itemOrder.push(list[index][_id]);
		}
		return itemOrder;
	}
	
	function getItemObject(){
		var data = [
					""
					,"CATEGORIA"
					,"TITULO"
					,"XXX, Xxx, xx"
					,"$9999"
					,"$1111"
					,"img/ume.png"
					,0
					,0

					]
		return data;
	}
	
	function encodeData(data){
		data[_type]   = encodeURIComponent(data[_type]);
		data[_title1] = encodeURIComponent(data[_title1]);
		data[_desc1]  = encodeURIComponent(data[_desc1]);
		data[_price1] = encodeURIComponent(data[_price1]);
		data[_price2] = encodeURIComponent(data[_price2]);
		data[_pic1]   = encodeURIComponent(data[_pic1]);
		return data;
	}
	
	this.getListByIndex = function(index){
		return this.typeList[index]; 
	}
	
	this.getItemByIndexes = function(typeIndex, itemIndex){
		_lastTypeIndex = typeIndex;
		_lastItemIndex = itemIndex;
		var data = this.typeList[typeIndex].list[itemIndex];
		return data;
	}
	
	// Category
	// - Update
	this.saveListByIndex = function(index, type){
		var lastType    = this.typeList[index].name;
		var currentType = type;
		
		data = {};
		data.lastType    = encodeURIComponent(lastType);
		data.currentType = encodeURIComponent(currentType);
		data.method      = "updateType";
		sendData(data);
		
	}
	// - Forward-Backward
	this.moveListTo = function(index, step){
		var data = this.typeList[index];
		this.typeList.splice(index, 1);
		var inTo = Math.max(Math.min(index + step, this.typeList.length), 0);
		this.typeList.splice(inTo, 0, data);
		
		var typeOrder = getTypeOrder();
		var data = {};
			data.method    = "sortType";
			data.typeOrder = typeOrder;
		sendData(data);
		
		return inTo;
	}
	// - Insert
	this.addListAt = function(index){
		var item = getItemObject();
			item[_order1] = index;
			item[_order2] = 0;
		var data = {
			 name:"CATEGORIA"
			,list: [item]
		}
		this.typeList.splice(index, 0, data);
		
		var typeOrder = getTypeOrder();
		var data = {};
			data.method    = "insert";
			data.typeOrder = typeOrder;
			data.item	   = encodeData(item);
		sendData(data);
	}
	
	// Item
	// - Update
	this.saveItemByIndexes = function(typeIndex, itemIndex, data){
		var model 			= this.typeList[typeIndex].list[itemIndex];
			model[_title1]	= data[_title1];
			model[_desc1]	= data[_desc1];
			model[_price1]	= data[_price1];
			model[_price2]	= data[_price2];
			model[_pic1]	= data[_pic1];
			
		var data = {};
			data.method     = "updateItem";
			data.item       =  encodeData(model);
			
		sendData(data);
	}
	// - Delete
	this.deleteItemByIndexes = function(typeIndex, itemIndex){
		var idToDelete = this.typeList[typeIndex].list[itemIndex][_id];
		var data = {};
			data.idToDelete = idToDelete;
			data.method     = "deleteItem";
		sendData(data);
	}
	// - Move
	this.moveItemTo = function(typeIndex, itemIndex, step){
		var itemList = this.typeList[typeIndex].list;
		var index    = itemIndex + step;
		var max      = itemList.length-1;
		var min      = Math.min(index, max);
		var inTo     = Math.max(min, 0);
		data = itemList.splice(itemIndex, 1)[0];
		itemList.splice(inTo, 0, data);
		
		var data = {}
			data.method    = "sortItem";
			data.itemOrder = getItemOrder(typeIndex);
		sendData(data)
	}
	// - Add item
	this.addItemByIndex = function(typeIndex){
		var item = getItemObject();
		this.typeList[typeIndex].list.push(item);
		
		lastList = typeIndex;
		lastItem = this.typeList[typeIndex].list.length-1;
		
		var typeOrder = getTypeOrder();
		var data = {};
			data.method		= "insert";
			data.typeOrder	= typeOrder;
			item[_order2]	= lastItem;
			item[_type]		= this.typeList[typeIndex].name;
			data.item		= encodeData(item);
		sendData(data);
	}
	// - Upload
	this.uploadPic = function(file){

		if(file.files.length === 0){
			return;
		}
		var fileData = file.files[0];
		var formData = new FormData();
			formData.append('SelectedFile', fileData);

		var request = new XMLHttpRequest();
			request.onreadystatechange = function(){
				if(request.readyState == 4){
					var item = _self.getItemByIndexes(_lastTypeIndex,_lastItemIndex);
					var data 		 = {};
						data.picRoot = encodeURIComponent("http://ume-moda.com/editor/img/" + fileData.name);
						data.id		 = encodeURIComponent(item[_id]);
						data.method  = "updatePic";
					sendData(data);
				}
			};
			
			request.open('POST', 'dat/upload.php');
			request.send(formData);
	}
}

siteModel = new SiteModel();