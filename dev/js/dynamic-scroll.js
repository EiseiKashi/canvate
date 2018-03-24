function onScroll = function {
	var element        = document.getElementById("id");
	var contentHeight  = element.offsetHeight;
	var scrollY        = window.pageYOffset != undefined ? 
							 window.pageYOffset
							 : 
							 document.documentElement.scrollTop;
							 
	var y              = scrollY + window.innerHeight;
	if(y >= contentHeight){
		element.innerHTML += "new data...";
	}
}

window.onscroll = onScroll;