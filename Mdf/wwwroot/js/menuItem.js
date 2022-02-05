
$(".menu-item").hover(function () {
	var dropdown = $(this).find(".dropdown:first");
	dropdown.addClass("show");
	dropdown.addClass("open");
	dropdown.find("a:first").attr("aria-expanded", true);
	var dropdown_menu = dropdown.find(".dropdown-menu:first");
	dropdown_menu.addClass("show");
	dropdown_menu.addClass("open");
	var parent_id = dropdown.closest("ul").attr("id");
	if (parent_id !== "menu-principal") {
		dropdown_menu.attr("style", "top: 0px; left: 235px;");
	}
});

$(".menu-item").mouseleave(function () {
	var dropdown = $(this).find(".dropdown:first");
	dropdown.removeClass("show");
	dropdown.removeClass("open");
	dropdown.find("a:first").attr("aria-expanded", false);
	var dropdown_menu = dropdown.find(".dropdown-menu:first");
	dropdown_menu.removeClass("show");
	dropdown_menu.removeClass("open");
	var parent_id = dropdown.closest("ul").attr("id");
	if (parent_id !== "menu-principal") {
		dropdown_menu.removeAttr("style");
	}
});
