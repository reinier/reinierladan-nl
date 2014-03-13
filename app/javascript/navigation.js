$( document ).ready(function() {
	$('.open-navigation').click(function(){
		$('body').addClass('navigation-is-open');
	});

	$('.close-navigation').click(function(){
		$('body').removeClass('navigation-is-open');
	});
});