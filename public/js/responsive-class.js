function set_responsive_class(viewportwidth){

	/* Small phones */
	if (viewportwidth > 480) {
		$("body").attr("data-viewport-bigger-than-mobile", "true");
	}

	/* Big phones */
	if (viewportwidth > 767) {
		$("body").attr("data-viewport-bigger-than-mobilelarge", "true");
	}

	/* Tablet portrait */
	if (viewportwidth > 979) {

		$("body").attr("data-viewport-bigger-than-tabletportrait", "true");
	}

	/* Desktop small and tablet landscape */
	if (viewportwidth > 1200) {
		$("body").attr("data-viewport-bigger-than-tablet", "true");
	}

	/* --------------------------------------- */

	/* Small phones */
	if (viewportwidth <= 480) {
		$("body").attr("data-viewport-is", "viewport-is-mobile");
		$("body").attr("data-viewport-bigger-than-mobile", "false");

	/* Big phones */
	} else if (viewportwidth <= 767) {
		$("body").attr("data-viewport-is", "viewport-is-mobilelarge");
		$("body").attr("data-viewport-bigger-than-mobilelarge", "false");

	/* Tablet portrait */
	} else if (viewportwidth <= 979) {
		$("body").attr("data-viewport-is", "viewport-is-tabletportrait");
		$("body").attr("data-viewport-bigger-than-tabletportrait", "false");

	/* Desktop small and tablet landscape */
	} else if (viewportwidth <= 1200) {
		$("body").attr("data-viewport-is", "viewport-is-tablet");
		$("body").attr("data-viewport-bigger-than-tablet", "false");

	/* Desktop above 1200px wide */
	} else {
		$("body").attr("data-viewport-is", "viewport-is-desktop");
	}

}

/* Set right data attribute on body everytime the viewport width changes */
$(window).resize(function() {
	set_responsive_class(document.documentElement.clientWidth);
});
