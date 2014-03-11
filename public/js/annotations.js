$( document ).ready(function() {
	if($('.annotation').length == 0)
	{
		$(".meta-info-button").hide();
	} else {
		$(".meta-info-button a").click(function(){
			$(".annotation").toggle();

			$('html, body').animate({
				scrollTop: $(".annotation").first().offset().top
			}, 400);
		});
	}
});
