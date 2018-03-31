function HTMLelement (type, attributes, text){
	var _type = type;
	var _text = text;
	var _children = [];
	var _attributes = {};
	var _element;
	addAttributes(attributes);
	function addAttributes(attributes){
		if(null == attributes){
			return;
		}
		
		for(var property in attributes){
			_attributes[property] = attributes[property];
		}
	}
	
	this.addChild = function(object){
		if(null == object){
			//Early return
			return;
		}
		_children.push(object);
	}
	
	this.getHTML = function(){
		_element = document.createElement(_type);
		
		if(null != _text){
			var text = document.createTextNode(_text);
			_element.appendChild(text);
		}
		
		for(var attribute in _attributes){
			_element.setAttribute(attribute, _attributes[attribute]);
		}
		
		var length = _children.length;
		var element;		
		for(var index = 0; index < length; index++){
			var element = _children[index].getHTML();
			_element.appendChild(element);
		}
		return _element;
	}
}

function createCategory(name, index){
	var article = new HTMLelement('article', {class:"container home-section title-background clearfix"});
	var div1    = new HTMLelement('div',     {class:"row clearfix"});
	var div2    = new HTMLelement('div',     {class:"column-12"});
	var div3    = new HTMLelement('div',     {class:"category-header"});
	var h2      = new HTMLelement('h2',      {id:"CategoryTitle"+index, contenteditable:"true"}, name);
	
	div3.addChild(h2);
	div2.addChild(div3);
	div1.addChild(div2);
	article.addChild(div1);
	
	return article;
}

function createItem(data, listIndex, itemIndex, isLast){
	var title1 = data[_title1];
	var last   = isLast ? " last" : "";
	var liItem = new HTMLelement('li', {class:"column-3 clearfix grid-item" + last, listIndex:listIndex, itemIndex:itemIndex});

	var img    = new HTMLelement('img', { width:"229"
										 ,height:"100%"
										 ,src:data[_pic1]
										 ,class:'grid-thumb'
										 ,alt:title1});						  
	var h3     = new HTMLelement('h3',   null, decodeURIComponent(title1));
	var p      = new HTMLelement('p',    null, data[_desc1]);
	var span1  = new HTMLelement('span', {class:'price1'},data[_price1]);
	var span2  = new HTMLelement('span', {class:'price'}, data[_price2]);

	liItem.addChild(img);
	liItem.addChild(h3);
	liItem.addChild(p);
	liItem.addChild(span1);
	liItem.addChild(span2);
	return liItem;
}

function ItemList(data, listIndex){
	var totalColumns = 4; 	
	var category     = createCategory(data.name, listIndex).getHTML();
	var editor       = getCategoryEditor(listIndex);
	var ul 		     = new HTMLelement('ul', {class:"row grid clearfix"}).getHTML();
		ul.innerHTML = "";
		
	var section      = new HTMLelement('section', {	id:"Category"+listIndex, class:"clearfix"}).getHTML();
	    section.appendChild(category);
		section.appendChild(editor);
	
	var list      = data.list;
	var length    = list.length;
	var lastIndex = length-1;
	var column    = 1;
	
	var isLast
	var data;
	var item;
	for(var index=0; index < length; index++, column++){
		data		   = siteModel.getItemByIndexes(listIndex, index);
		isLast         = totalColumns == column;
		item           = createItem(data, listIndex, index, isLast).getHTML();
		
		if(isLast){
			column = 0;
		}
		
		item.addEventListener("click", onItemClick);
		ul.appendChild(item);
	}
	
	categoryList.push(section);
	section.appendChild(ul);
	
	return section;
}

function BigItem(){
	var cont   = document.getElementById("BIG-ITEM");
	var image  = document.getElementById("BIG-IMAGE");
	var title1 = document.getElementById("BIG-TITLE-1");
	var desc1  = document.getElementById("BIG-DESC-1");
	var before = document.getElementById("BIG-PRICE-1");
	var now    = document.getElementById("BIG-PRICE");
	var buy    = document.getElementById("BIG-BUY");
	var pic    = document.getElementById("BIG-PIC");
	
	var closeButton = document.getElementById("BIG-CLOSE");
		closeButton.addEventListener("click", onClose);
		
	function onClose(event){
		event.stopPropagation();
		cont.style = "display:none;";
		setTimeout(function(){
			window.scroll(0, _lastTopScroll);
		}, 50)
	}
	
	var _itemIndex;
	var _listIndex;
	var _lastTopScroll = 0;
	
	var doc = window.document;
	
	var autoResize = function(){
		setTimeout(function(){
			desc1.style.cssText = 'height:auto;';
			desc1.style.cssText = 'height:' + desc1.scrollHeight + 'px';
		},0);
	}
	
	desc1.addEventListener("keydown", autoResize);
	
	this.display = function(data, listIndex, itemIndex){
		_listIndex = listIndex;
		_itemIndex = itemIndex;
		var pic1   = data[_pic1];
		var name   = data[_title1];
		var desc   = data[_desc1];
		var price1 = data[_price1];
		var price2 = data[_price2];
		var pic1   = data[_pic1];
		
		image.src = pic1;
		image.alt = name;
		
		title1.innerHTML = name;
		desc1.value      = desc; 
		before.innerHTML = price1;
		now.innerHTML    = price2;
		pic.innerHTML    = pic1;
		
		cont.style       = "display:block";
		
		_lastTopScroll = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
		window.scroll(0,0);
	}
	
	this.hide = function(){
		cont.style = "display:none";
	}
	
	var editor		 = document.getElementById("SUB-MENU-BIG");
		editor.style = "display:block";
		editor.addEventListener("click", onEditorClick);
	
	var drop = editor.getElementsByClassName("dropdown-menu")[0];
		drop.addEventListener("mouseleave", onLeave);
	
	function onEditorClick(event){
		event.stopPropagation();
		if(isEditorVisible){
			editor.hide();
		}else{
			editor.show();
		}
	}
	
	function onLeave(event){
		editor.hide();
	}
	
	var isEditorVisible;
	editor.hide = function(){
		drop.style = "display:none";
		editor.addEventListener("click", onEditorClick);
		isEditorVisible = false;
	}
	
	editor.show = function(){
		drop.style = "display:block";
		editor.removeEventListener("click", onEditorClick);
		isEditorVisible = true;
	}
	
	var saveButton		= editor.getElementsByClassName("save-item")[0];
	var deleteButton	= editor.getElementsByClassName("delete-item")[0];
	var backwardButton	= editor.getElementsByClassName("backward-item")[0];
	var forwardButton	= editor.getElementsByClassName("forward-item")[0];
	var addButton		= editor.getElementsByClassName("add-item")[0];
	
	saveButton.addEventListener		("click", onSave);
	deleteButton.addEventListener	("click", onDelete);
	backwardButton.addEventListener	("click", onBackward);
	forwardButton.addEventListener	("click", onForward);
	addButton.addEventListener		("click", onAddItem);
	
	function onSave(event){
		var data    	= [];
		data[_title1]	= title1.innerHTML;
		data[_desc1]	= desc1.value;
		data[_price1]	= before.innerHTML;
		data[_price2]	= now.innerHTML;
		data[_pic1]		= pic.innerHTML;
		
		saveItem(_listIndex, _itemIndex, data);
		editor.hide();
	}
	
	function onDelete(event){
		event.stopPropagation();
		deleteItem(_listIndex, _itemIndex);
		editor.hide();
	}
	
	function onForward(event){
		forwardItem(_listIndex, _itemIndex);
		editor.hide();
	}
	
	function onBackward(event){
		backwardItem(_listIndex, _itemIndex);
		editor.hide();
	}
	
	function onAddItem(event){
		addItem(_listIndex);
		editor.hide();
	}
}

function createProductList(senbuList){
	var ulNav           = document.getElementById("MAIN-NAV");
		ulNav.innerHTML = "";
		
	var li;
	var a;
	var itemList;
	var list;
	
	var productList           = document.getElementById("PRODUCT-LIST");
		productList.innerHTML = "";
		
	var length      = senbuList.length;
	for(var index=0; index < length; index++){
		itemList = senbuList[index];
		list     = new ItemList(itemList, index);
		productList.appendChild(list);
		
		a  = new HTMLelement("a", null, itemList.name);
		li = new HTMLelement("li", {index:index});
		li.addChild(a);
		li = li.getHTML();
		li.onclick = onCategoryClick;
		ulNav.appendChild(li);
	}
}

function getCategoryEditor(index){
	var editor		 = document.getElementById("SUB-MENU").cloneNode(true);
		editor.style = "display:block";
		editor.setAttribute("index", index);
		editor.addEventListener("click", onEditorClick);
	
	var drop = editor.getElementsByClassName("dropdown-menu")[0];
		drop.addEventListener("mouseleave", onLeave);
	
	function onEditorClick(event){
		onCategoryEditorClick(index, editor);
		editor.removeEventListener("click", onEditorClick);
	}
	
	function onLeave(event){
		editor.hide();
	}
	
	editor.hide = function(){
		drop.style = "display:none";
		editor.addEventListener("click", onEditorClick);
	}
	
	editor.show = function(){
		drop.style = "display:block";
		editor.removeEventListener("click", onEditorClick);
	}
	
	var saveButton		= editor.getElementsByClassName("save-item")[0];
	var forwardButton	= editor.getElementsByClassName("forward-item")[0];
	var backwardButton	= editor.getElementsByClassName("backward-item")[0];
	var addButton		= editor.getElementsByClassName("add-item")[0];
	
	saveButton.addEventListener		("click", onSave);
	forwardButton.addEventListener	("click", onForward);
	backwardButton.addEventListener	("click", onBackward);
	addButton.addEventListener		("click", onAddCategory);
	// Category EDITOR
	function onSave(event){
		event.stopPropagation();
		saveCategory(index);
		editor.hide();
	}
	
	function onBackward(event){
		event.stopPropagation();
		backwardCategory(index);
		editor.hide();
	}
	
	function onForward(event){
		event.stopPropagation();
		forwardCategory(index);
		editor.hide();
	}
	
	function onAddCategory(event){
		event.stopPropagation();
		addCategory(index);
		editor.hide();
	}
	
	return editor;
}

var categoryList = [];
var bigItem      = new BigItem();