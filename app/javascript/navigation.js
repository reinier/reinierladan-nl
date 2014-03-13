$( document ).ready(function() {
	$('.open-navigation').click(function(){

		if($('body').hasClass('navigation-is-open')){
			$('body').removeClass('navigation-is-open');
		} else {
			$('body').addClass('navigation-is-open');
		}
	});
});