// templatemo 467 easy profile

// PRELOADER

$(window).load(function(){
    $('.preloader').delay(1000).fadeOut("slow"); // set duration in brackets    
});

// HOME BACKGROUND SLIDESHOW
$(function(){
    jQuery(document).ready(function() {
		$('body').backstretch([
	 		 "images/bkgd1.jpg", 
	 		 "images/bkgd2.jpg",
			 "images/bkgd3.jpg"
	 			], 	{duration: 3200, fade: 1300});
		});
})