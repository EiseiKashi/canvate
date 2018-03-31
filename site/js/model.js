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
	this.typeList;
	
	this.onGetData = function(){
		
	};
	
	this.getData = function(){
		var data = {};
		data.method    = "data";
		sendData(data);
	}
	
	function onloadData(data){
		_self.typeList = JSON.parse(decodeURIComponent(data));
		_self.onGetData();
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
	
	this.getItemByIndexes = function(listIndex, itemIndex){
		var data = this.typeList[listIndex].list[itemIndex];
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
	this.saveItemByIndexes = function(listIndex, itemIndex, data){
		var model 			= this.typeList[listIndex].list[itemIndex];
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
	this.deleteItemByIndexes = function(listIndex, itemIndex){
		var idToDelete = this.typeList[listIndex].list[itemIndex][_id];
		var data = {};
			data.idToDelete = idToDelete;
			data.method     = "typeOrder";
		sendData(data);
	}
	// - Move
	this.moveItemTo = function(listIndex, itemIndex, step){
		var itemList = this.typeList[listIndex].list;
		var index    = itemIndex + step;
		var max      = itemList.length-1;
		var min      = Math.min(index, max);
		var inTo     = Math.max(min, 0);
		data = itemList.splice(itemIndex, 1)[0];
		itemList.splice(inTo, 0, data);
		
		var data = {}
			data.method    = "sortItem";
			data.itemOrder = getItemOrder(listIndex);
		sendData(data)
	}
	// - Add item
	this.addItemByIndex = function(listIndex){
		var item = getItemObject();
		this.typeList[listIndex].list.push(item);
	}
}

siteModel = new SiteModel();