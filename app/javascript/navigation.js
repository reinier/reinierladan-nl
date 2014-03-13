$( document ).ready(function() {
	$('.open-navigation').click(function(){
		$('nav').toggle();
		$('body').toggleClass('navigation-is-open');
	});
});