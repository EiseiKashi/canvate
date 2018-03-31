// Navigation 0800-7777-678
function onCategoryClick(event){
	var button    = event.currentTarget;
	var index     = button.getAttribute("index");
	location.href = "#Category"+index;
}

function onItemClick(event){
	var target    = event.currentTarget;
	var listIndex = target.getAttribute("listIndex");
	var itemIndex = target.getAttribute("itemIndex");
	goToItemByIndexes(listIndex, itemIndex);
}

function goToItemByIndexes(listIndex, itemIndex){
	var data = siteModel.getItemByIndexes(listIndex, itemIndex);
	bigItem.display(data, listIndex, itemIndex);
}

// Editor Menu
function onCategoryEditorClick(index, child){
	child.show();
}

function onItemEditorClick(event){
	event.stopPropagation();
	var child = event.currentTarget;
	
	
	
	child.hide();
}

// Category editor
function saveCategory(index){
	var name = document.getElementById("CategoryTitle" + index).innerHTML;
	siteModel.saveListByIndex(index, name);
	reset();
}
	
function forwardCategory(index){
	var toIndex = siteModel.moveListTo(index, 1);
	reset();
	toCategoryByIndex(toIndex);
}
	
function backwardCategory(index){
	var toIndex = siteModel.moveListTo(index, -1);
	reset();
	toCategoryByIndex(toIndex);
}
	
function addCategory(index){
	index++;
	siteModel.addListAt(index);
	toCategoryByIndex(index);
}

function toCategoryByIndex(index){
	setTimeout(function(){
		location.href = "#Category"+(index);
		var title     = document.getElementById("CategoryTitle"+index);
			title.focus();
	}, 100);
}

// Item editor
function saveItem(listIndex, itemIndex, data){
	siteModel.saveItemByIndexes(listIndex, itemIndex, data);
}

function deleteItem(listIndex, itemIndex){
	siteModel.deleteItemByIndexes(listIndex, itemIndex);
	toCategoryByIndex(listIndex);
}
	
function forwardItem(listIndex, itemIndex){
	siteModel.moveItemTo(Number(listIndex), Number(itemIndex), 1);
	toCategoryByIndex(listIndex);
}
	
function backwardItem(listIndex, itemIndex){
	siteModel.moveItemTo(Number(listIndex), Number(itemIndex), -1);
	toCategoryByIndex(listIndex);
}
	
function addItem(listIndex){
	siteModel.addItemByIndex(listIndex);
}

function onDataLoaded(){
	if(siteModel.typeList.length == 0){
		siteModel.addListAt(0);
	}else{
		createProductList(siteModel.typeList);
	}
}

function reset(){
	bigItem.hide();
	
	var mainMenu	      = document.getElementById("MAIN-NAV");
	var productList	      = document.getElementById("PRODUCT-LIST");
	
	mainMenu.innerHTML    = "";
	productList.innerHTML = "";
	
	siteModel.onGetData = onDataLoaded;
	siteModel.getData();
}

// Initialization
function initialize(){
	reset();
}

initialize();