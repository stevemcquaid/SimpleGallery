SimpleGallery
=============
By: Tommy Doyle

A simple gallery element for a website written in Javascript and JQuery. The purpose behind this module is to provide a very basic and barebones gallery implementation that can be built upon and customized to the developer's needs.

Usage
---
SimpleGallery requires JQuery (2.0.3 tested) and gallery.css which must be included in the pages where the module. Additionally the page must include the following HTML in the body:

	<div class="gallery-overlay">
		<div class="gallery-content">
			<img id="gallery-left-button" src="leftarrow.png">
			<img id="gallery-right-button" src="rightarrow.png">
			<img class="gallery-overlay-image">
			<div class="gallery-overlay-description"></div>
		</div>
	</div>

To create your gallery add an html div with the class "image-gallery" somewhere in the body, where you wish the thumbnails of the images to go. Inside here is where you will create the gallery items. Gallery Items have the following format:

	<div class="gallery-item">
		<img src="image/path" alt="" class="gallery-thumbnail">
		<div class="gallery-description">
			Description of the item. This is just treated as a normal HTML block, so go crazy here.
		</div>
	</div>

Create a gallery item for each image you have. Note that the description div is just an HTML block so anything in there will be displayed in its HTML rendered format in the gallery display.

Features:
---------
SimpleGallery is not extraordinarily complex, fitting with its purpose, but does contain some nice features:

*	Auto-Resize with the window
*	Out of Range clicks exit the gallery
*	Esc key exists the gallery
*	Works decently well on mobile

To-Do
------
There's a few things I want to fix up...

*	The out of bounds range isn't quite accurate, can be made more precise
*	Mobile optimized format when viewed from such devices
*	Simplify the CSS, make more SASSy
*	Clean up the JS source
