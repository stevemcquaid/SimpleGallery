/*

Gallery Script
--------------
Gallery script that gathers elements identified by the gallery-item class 
and then forms a dynamic gallery that appears when a tumbnail is clicked on.


By: Tommy Doyle

*/

var galleryItems;
var currentIndex;
var galleryOpen;

$(window).ready(function() {
	$(".gallery-overlay").hide();

	$("#gallery-left-button").click(previousItem);
	$("#gallery-right-button").click(nextItem);

	document.addEventListener("keydown",handleKeyboardInput,false);
	window.addEventListener("resize",windowResized,true);

	galleryOpen = false;

	galleryItems = $(".gallery-item").map(function(i,e){
		var thumbnail = $(e).find(".gallery-thumbnail");
		var image = $(e).find(".gallery-thumbnail").attr("src");
		var text = $(e).find(".gallery-description");
		return {"thumbnail" : thumbnail, "image" : image, "text" : text};
	});

	galleryItems.each(function(index,item){
		var image = item["image"];
		var text = item["text"];
		var thumbnail = item["thumbnail"];
		text.remove();

		thumbnail.click(function(e) {
			galleryOpen = true;
			currentIndex = index;
			openItem(image,text);
		});
	});

	resetOverlayEvents();
});

var openItem = function(image,text) {
	$(".gallery-overlay").show();
	$(".gallery-overlay-description").html(text);
	$(".gallery-overlay-image").attr("src",""+image);
	$(".gallery-overlay-image").load(windowResized);
	
};

var closeItem = function() {
	$(".gallery-overlay").hide();
	$(".gallery-overlay-description").html("");
	$(".gallery-overlay-image").attr("src","");
	galleryOpen = false;
}

var nextItem = function(){
	if (currentIndex+1 < galleryItems.length)
		currentIndex++;
	else
		currentIndex = 0;

	var item = galleryItems[currentIndex];
	var image = item["image"];
	var text = item["text"];

	openItem(image,text);
}

var previousItem = function() {
	if (currentIndex-1 >= 0)
		currentIndex--;
	else
		currentIndex = galleryItems.length-1;

	var item = galleryItems[currentIndex];
	var image = item["image"];
	var text = item["text"];

	openItem(image,text);
}

var resetOverlayEvents = function() {
	$(".gallery-overlay").click(function(e){
		var galleryMinX = $(".gallery-content").position().left;
		var galleryMinY = $(".gallery-content").position().top;
		var galleryMaxX = galleryMinX + $(".gallery-content").width();
		var galleryMaxY = galleryMinX + $(".gallery-content").height();

		if((e.pageX < galleryMinX-100)
			|| (e.pageX > galleryMaxX+100) 
			|| (e.pageY < galleryMinY)
			|| (e.pageY > galleryMaxY)){
			closeItem();
			return true;
		}
		else {
			return false;
		}
	});
}

var handleKeyboardInput = function(e){
	//Right Arrow
	if(e.keyCode === 39 && galleryOpen) {
		nextItem();
		return true;
	}
	//Left Arrow
	else if(e.keyCode === 37 && galleryOpen) {
		previousItem();
		return true;
	}

	//Escape Key Pressed
	else if(e.keyCode === 27 && galleryOpen) {
		closeItem();
		return true;
	}
	else {
		return false;
	}
}

var calculateMaxHeight = function() {
	var screenHeight = window.innerHeight;
	var descriptionHeight = $(".gallery-overlay-description").height();
	var maxHeight = screenHeight - descriptionHeight - 200;
	return maxHeight;
}

var calculateMaxWidth = function() {
	var screenWidth = window.innerWidth;
	var maxWidth = screenWidth - 250;
	return maxWidth;
}

var windowResized = function() {
	resetOverlayEvents();
	$(".gallery-overlay-description").css("max-width",calculateMaxWidth());
	$(".gallery-overlay-image").css("max-height",calculateMaxHeight());
	$(".gallery-overlay-image").css("max-width",calculateMaxWidth());
}