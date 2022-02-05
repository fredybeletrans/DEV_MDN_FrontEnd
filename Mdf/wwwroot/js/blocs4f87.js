// Page ready

$(function(){
	extraNavFuncs(); // Extra Nav Functions
	setUpSpecialNavs(); // Set Up Special NavBars 
	setUpDropdownSubs(); // Set Up Dropdown Menu Support
	setUpLightBox(); // Add lightbox Support
	setUpVisibilityToggle(); // Add visibility Toggle Support
	addKeyBoardSupport(); // Add Keyboard Support - Used for Lightbox Nav
	
	$('a[onclick^="scrollToTarget"]').click(function(e){e.preventDefault()}); // Prevent page jump on scroll to links
	$('.nav-item [data-active-page]').addClass($('.nav-item [data-active-page]').attr('data-active-page')); // Apply Active Link Classes
/*	$('[data-toggle="tooltip"]').tooltip(); // Initialise Tool tips*/
});

// Loading page complete
$(window).on('load', function()
{
	animateWhenVisible();  // Activate animation when visible	
	$('#page-loading-blocs-notifaction').remove(); // Remove page loading UI
})

// Set Up Special NavBars 
function setUpSpecialNavs()
{
	$('.navbar-toggler').click(function(e)
	{ 
		var targetNav = $(this).closest('nav');
		var targetMenu = targetNav.find('ul.site-navigation');
		var newMenu = targetMenu.clone();
	
		if (targetMenu.parent().is('.fullscreen-nav, .sidebar-nav')) // Nav is Special
		{
			e.stopPropagation(); // Dont do this is normal menu in use
			targetMenu.parent().addClass('nav-special');
			
			if (!$(this).hasClass('selected-nav')) // Open Menu
			{
				$(this).addClass('selected-nav');
				var navClasses = targetNav.attr('class').replace('navbar','').replace('row','');
				var menuClasses = targetMenu.parent().attr('class').replace('navbar-collapse','').replace('collapse','');
				
				if ($('.content-tint').length =-1)
				{
					$('body').append('<div class="content-tint"></div>');
				}
				
				newMenu.insertBefore('.page-container').wrap('<div class="blocsapp-special-menu '+navClasses+'"><blocsnav class="'+menuClasses+'">');
				$('blocsnav').prepend('<a class="close-special-menu animated fadeIn" style="animation-delay:0.5s;"><div class="close-icon"></div></a>');
				//$('blocsnav').prepend('<div class="row"><div class="buscador-movil"><div id="ajaxsearchlite1" class="wpdreams_asl_container asl_w asl_m asl_m_1 hasASL"><div class="probox"><div class="promagnifier"><div class="innericon"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="512px" height="512px" viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve"><path id="magnifier-2-icon" d="M460.355,421.59L353.844,315.078c20.041-27.553,31.885-61.437,31.885-98.037 C385.729,124.934,310.793,50,218.686,50C126.58,50,51.645,124.934,51.645,217.041c0,92.106,74.936,167.041,167.041,167.041 c34.912,0,67.352-10.773,94.184-29.158L419.945,462L460.355,421.59z M100.631,217.041c0-65.096,52.959-118.056,118.055-118.056 c65.098,0,118.057,52.959,118.057,118.056c0,65.096-52.959,118.056-118.057,118.056C153.59,335.097,100.631,282.137,100.631,217.041 z"></path></svg></div></div><div class="prosettings" style="display:none;" data-opened="0"><div class="innericon"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="512px" height="512px" viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve"><polygon id="arrow-25-icon" transform="rotate(90 256 256)" points="142.332,104.886 197.48,50 402.5,256 197.48,462 142.332,407.113 292.727,256 "></polygon></svg></div></div><div class="proinput"><form autocomplete="off" aria-label="Ajax search form"><input aria-label="Search input" type="search" class="orig" name="phrase" placeholder="Buscar aquí..." value="" autocomplete="off"><input aria-label="Autocomplete input, do not use this" type="text" class="autocomplete" name="phrase" value="" autocomplete="off"><span class="loading"></span><input type="submit" value="Start search" style="width:0; height: 0; visibility: hidden;"></form></div><div class="proloading"><div class="asl_loader"><div class="asl_loader-inner asl_simple-circle"></div></div></div><div class="proclose" style="display: none;"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="512px" height="512px" viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve"><polygon id="x-mark-icon" points="438.393,374.595 319.757,255.977 438.378,137.348 374.595,73.607 255.995,192.225 137.375,73.622 73.607,137.352 192.246,255.983 73.622,374.625 137.352,438.393 256.002,319.734 374.652,438.378 "></polygon></svg></div></div></div><div id="asl_hidden_data"><svg style="position:absolute" height="0" width="0"><filter id="aslblur"><feGaussianBlur in="SourceGraphic" stdDeviation="4"></feGaussianBlur></filter></svg><svg style="position:absolute" height="0" width="0"><filter id="no_aslblur"></filter></svg></div><div class="asl_init_data wpdreams_asl_data_ct" style="display:none !important;" id="asl_init_id_1" data-asldata="ew0KICAgICJob21ldXJsIjogImh0dHA6Ly9nb2JpZXJuby51cmllbHJhbW9zLmNvbS8iLA0KICAgICJyZXN1bHRzdHlwZSI6ICJ2ZXJ0aWNhbCIsDQogICAgInJlc3VsdHNwb3NpdGlvbiI6ICJob3ZlciIsDQogICAgIml0ZW1zY291bnQiOiA0LA0KICAgICJpbWFnZXdpZHRoIjogNzAsDQogICAgImltYWdlaGVpZ2h0IjogNzAsDQogICAgInJlc3VsdGl0ZW1oZWlnaHQiOiAiNzBweCIsDQogICAgInNob3dhdXRob3IiOiAwLA0KICAgICJzaG93ZGF0ZSI6IDAsDQogICAgInNob3dkZXNjcmlwdGlvbiI6IDEsDQogICAgImNoYXJjb3VudCI6ICAwLA0KICAgICJkZWZhdWx0SW1hZ2UiOiAiaHR0cDovL2dvYmllcm5vLnVyaWVscmFtb3MuY29tL3dwLWNvbnRlbnQvcGx1Z2lucy9hamF4LXNlYXJjaC1saXRlL2ltZy9kZWZhdWx0LmpwZyIsDQogICAgImhpZ2hsaWdodCI6IDAsDQogICAgImhpZ2hsaWdodHdob2xld29yZHMiOiAxLA0KICAgICJzY3JvbGxUb1Jlc3VsdHMiOiAwLA0KICAgICJyZXN1bHRhcmVhY2xpY2thYmxlIjogMSwNCiAgICAiYXV0b2NvbXBsZXRlIjogew0KICAgICAgICAiZW5hYmxlZCIgOiAxLA0KICAgICAgICAibGFuZyIgOiAiZW4iDQogICAgfSwNCiAgICAidHJpZ2dlcm9udHlwZSI6IDEsDQogICAgInRyaWdnZXJfb25fY2xpY2siOiAwLA0KICAgICJ0cmlnZ2VyX29uX2ZhY2V0X2NoYW5nZSI6IDEsDQogICAgInNldHRpbmdzaW1hZ2Vwb3MiOiAicmlnaHQiLA0KICAgICJocmVzdWx0YW5pbWF0aW9uIjogImZ4LW5vbmUiLA0KICAgICJ2cmVzdWx0YW5pbWF0aW9uIjogImZ4LW5vbmUiLA0KICAgICJocmVzdWx0aGlkZWRlc2MiOiAiMSIsDQogICAgInByZXNjb250YWluZXJoZWlnaHQiOiAiNDAwcHgiLA0KICAgICJwc2hvd3N1YnRpdGxlIjogIjAiLA0KICAgICJwc2hvd2Rlc2MiOiAiMSIsDQogICAgImNsb3NlT25Eb2NDbGljayI6IDEsDQogICAgImlpZk5vSW1hZ2UiOiAiZGVzY3JpcHRpb24iLA0KICAgICJpaVJvd3MiOiAyLA0KICAgICJpaXRlbXNXaWR0aCI6IDIwMCwNCiAgICAiaWl0ZW1zSGVpZ2h0IjogMjAwLA0KICAgICJpaXNob3dPdmVybGF5IjogMSwNCiAgICAiaWlibHVyT3ZlcmxheSI6IDEsDQogICAgImlpaGlkZUNvbnRlbnQiOiAxLA0KICAgICJpaWFuaW1hdGlvbiI6ICIxIiwNCiAgICAiYW5hbHl0aWNzIjogIjAiLA0KICAgICJhbmFseXRpY3NTdHJpbmciOiAiIiwNCiAgICAicmVkaXJlY3RvbmNsaWNrIjogMSwNCiAgICAicmVkaXJlY3RDbGlja1RvIjogInJlc3VsdHNfcGFnZSIsDQogICAgInJlZGlyZWN0Q2xpY2tMb2MiOiAic2FtZSIsDQogICAgInJlZGlyZWN0X29uX2VudGVyIjogMSwNCiAgICAicmVkaXJlY3RFbnRlclRvIjogInJlc3VsdHNfcGFnZSIsDQogICAgInJlZGlyZWN0RW50ZXJMb2MiOiAic2FtZSIsDQogICAgInJlZGlyZWN0X3VybCI6ICI/cz17cGhyYXNlfSIsDQogICAgIm92ZXJyaWRld3BkZWZhdWx0IjogMCwNCiAgICAib3ZlcnJpZGVfbWV0aG9kIjogImdldCINCn0NCg=="></div></div></div>');
				animateNavItems(); // Animate Nav Items
				
				$('blocsnav').append('<div class="instituciones-movil"><a href="#" class="follow-icon-item"  style="animation-delay:0.5s;" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 230.32 37.319"><g id="Instituciones_ON" transform="translate(-65.68 -41.718)"><text id="Instituciones" transform="translate(126 73)" fill="#fff" font-size="20" font-family="MuseoSans-500, Museo Sans" font-weight="500"><tspan x="0" y="0">INSTITUCIONES</tspan></text><g id="Capa_2" data-name="Capa 2" transform="translate(65.679 41.718)"><g id="Capa_1" data-name="Capa 1"><path id="Trazado_206" data-name="Trazado 206" d="M38.973,24.2H35.167V18.3A1.311,1.311,0,0,0,34.6,17.06L20.654,8.138,20.6,8.109V6.089h6.135a.658.658,0,0,0,.652-.658V.658A.652.652,0,0,0,26.738,0H19.944a.658.658,0,0,0-.658.658V8.1h-.04L5.076,17.054A1.3,1.3,0,0,0,4.5,18.308a.853.853,0,0,0,0,.12V24.2H.658A.652.652,0,0,0,0,24.855V36.667a.652.652,0,0,0,.658.652H38.973a.652.652,0,0,0,.652-.652V24.855A.652.652,0,0,0,38.973,24.2ZM26.079,2.072V4.006H20.6V2.072ZM19.939,10.8l9.849,6.3H9.9ZM1.311,25.513H4.464V34.7H1.311ZM16.024,34.7H11.812V26.56a2.1,2.1,0,0,1,4.195,0Zm11.286,0H23.092V26.56a2.1,2.1,0,1,1,4.2,0Zm5.248,0H28.615V26.56a3.434,3.434,0,0,0-6.822,0V34.7h-4.47V26.56a3.434,3.434,0,0,0-6.827,0V34.7H7.062V19.738H32.541Zm5.774,0H35.185V25.513h3.159Z" fill="#fff"></path></g></g></g></svg></a></div>');
				$('blocsnav').append('<div class="transparencia-movil"><a href="https://www.transparencia.gob.sv" class="follow-icon-item"  style="animation-delay:0.5s;" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 257 42"><g id="Transparencia_ON" transform="translate(-63 -108)"><g id="Elipse_1" data-name="Elipse 1" transform="translate(63 108)" fill="none" stroke="#fff" stroke-width="4"><circle cx="15" cy="15" r="15" stroke="none"></circle><circle cx="15" cy="15" r="13" fill="none"></circle></g><line id="Línea_1" data-name="Línea 1" x2="12" y2="12" transform="translate(87.5 132.5)" fill="none" stroke="#fff" stroke-linecap="round" stroke-width="5"></line><text id="Portal_de" data-name="Portal de" transform="translate(115 124)" fill="#fff" font-size="15" font-family="MuseoSans-700, Museo Sans" font-weight="700"><tspan x="0" y="0">Portal de</tspan></text><text id="Transparencia" transform="translate(115 144)" fill="#fff" font-size="22" font-family="MuseoSans-700, Museo Sans" font-weight="700"><tspan x="0" y="0">Transparencia</tspan></text></g></svg></a></div>');
				setTimeout(function(){
					$('.blocsapp-special-menu blocsnav').addClass('open');
					$('.content-tint').addClass('on');
					$('body').addClass('lock-scroll');
				}, 10);
			}
			else // Close menu
			{
				$('.blocsapp-special-menu blocsnav').removeClass('open');
				$('.selected-nav').removeClass('selected-nav');
				
				setTimeout(function(){
					$('.blocsapp-special-menu').remove();
					$('body').removeClass('lock-scroll');
					$('.nav-special').removeClass('nav-special');
				}, 300);
			}
		}
	});
	
	// Close Special Menu with Tint Click	
	$('body').on("mousedown touchstart",".content-tint, .close-special-menu",function(e)
	{	
		$('.content-tint').removeClass('on');
		$('.selected-nav').click();
	
		setTimeout(function(){
			$('.content-tint').remove();
		}, 10);
	}
	).on("click",".blocsapp-special-menu a",function(e) // Close Menu On Link Click
	{	
		if (!$(e.target).closest('.dropdown-toggle').length)
		{
			$('.close-special-menu').mousedown();
		} 
	});
	
	// Animate Nav Items
	function animateNavItems()
	{
		var animationStyle = 'fadeInRight';
		var delay = 0;
		var increaseVal = 60;
	
		if ($('.blocsapp-special-menu blocsnav').hasClass('fullscreen-nav'))
		{
			animationStyle = 'fadeIn';
			increaseVal = 100;
		}
		else if ($('.blocsapp-special-menu').hasClass('nav-invert')) // Inverted Nav
		{
			animationStyle = 'fadeInLeft';
		}
	
		$('.blocsapp-special-menu blocsnav li').each(function()
		{
			if ($(this).parent().hasClass('dropdown-menu')) // Not A drop down
			{
				$(this).addClass('animated fadeIn');	
			}
			else
			{
				delay += increaseVal; 
				$(this).attr('style','animation-delay:'+delay+'ms').addClass('animated '+animationStyle);	
			}
		});
	}
}


// Extra Nav Functions
function extraNavFuncs()
{
	// Hide Menu On Item Click
	$(".site-navigation a").click(function(e)
	{
		if (!$(e.target).closest('.dropdown-toggle').length) // Prevent Dropdowns Closing on click
		{
			$(".navbar-collapse").collapse('hide');
		}
	});
	
	// Close Open Dropdown Menu When Another menu on same level is opened
	$("a.dropdown-toggle").click(function(e)
	{
		$(this).parent().addClass('target-open-menu');
		$(this).closest('.dropdown-menu').find('.dropdown.open').each(function(i) // Loop all Open Dropdowns
		{
			if (!$(this).hasClass('target-open-menu'))
			{
				$(this).removeClass('open');
			}
		});
		$('.target-open-menu').removeClass('target-open-menu');
	});
	
	// Handle Multi Level Dropdowns
	$( '.dropdown-menu a.dropdown-toggle' ).on( 'click', function ( e )
	{
        return openSubDropdown($(this));
	});
	
	// Handle Multi Level Dropdowns
	$('body').on("click",".dropdown-menu a.dropdown-toggle",function(e)
	{
        return openSubDropdown($(this));
	});

	// handle Sub Dropdowns
	function openSubDropdown(target)
	{
		var $el = target;
        var $parent = target.offsetParent( ".dropdown-menu" );
        if ( !target.next().hasClass( 'show' ) ) {
            target.parents( '.dropdown-menu' ).first().find( '.show' ).removeClass( "show" );
        }
        var $subMenu = target.next( ".dropdown-menu" );
        $subMenu.toggleClass( 'show' );
    
        target.parent( "li" ).toggleClass( 'show' );

        target.parents( 'li.nav-item.dropdown.show' ).on( 'hidden.bs.dropdown', function ( e ) {
            $( '.dropdown-menu .show' ).removeClass( "show" );
        } );
    
        if (!$parent.parent().hasClass( 'navbar-nav' ))
        {
        	if (!target.closest('.nav-special').length)
        	{
        		$el.next().css( { "top": $el[0].offsetTop, "left": $parent.outerWidth() - 4 } );
        	}
        }

        return false;
	}
}

// Scroll to target
function scrollToTarget(D,T)
{
	var speed = 'slow';
	
	if (D == 0) // Next Bloc
	{
		D = $(T).closest('.bloc').height();
	}
	else if (D == 1) // Top of page
	{
		D = 0;
	}
	else if (D == 2) // Bottom of page
	{
		D = $(document).height();
	}
	else // Specific Bloc
	{
		D = $(D).offset().top;
		if ($('.sticky-nav').length) // Sticky Nav in use
		{
			D -= $('.sticky-nav').outerHeight();
		}
	}
	
	if ($(T).is("[data-scroll-speed]")) // Use asigned scroll speed
	{
		speed = $(T).attr('data-scroll-speed');
		
		if (parseInt(speed)) // Is an integer
		{
			speed = parseInt(speed);
		}
	}


	$('html,body').animate({scrollTop:D}, speed);
	$(".navbar-collapse").collapse('hide');	
}

// Animate when visible
function animateWhenVisible()
{
	hideAll(); // Hide all animation elements
	inViewCheck(); // Initail check on page load
	
	$(window).scroll(function()
	{		
		inViewCheck(); // Check object visability on page scroll
		scrollToTopView(); // ScrollToTop button visability toggle
		stickyNavToggle(); // Sticky nav toggle
	});		
};

// Set Up Dropdown Menu Support
function setUpDropdownSubs()
{
	$('ul.dropdown-menu [data-toggle=dropdown]').on('click', function(event)
	{
		event.preventDefault(); 
		event.stopPropagation(); 
		$(this).parent().siblings().removeClass('open');
		$(this).parent().toggleClass('open');
		
		var targetMenu = $(this).parent().children('.dropdown-menu');
		var leftVal = targetMenu.offset().left+targetMenu.width();
		if (leftVal > $(window).width())
		{
			targetMenu.addClass('dropmenu-flow-right');
		}
	});
}

// Sticky Nav Bar Toggle On / Off
function stickyNavToggle()
{
	var offsetVal = 0; // offset Value
	var classes = "sticky"; // Classes
	var targetContainer = $('.page-container');
	var isFillScreenSticky = $('.sticky-nav').hasClass('fill-bloc-top-edge');
	
	if (isFillScreenSticky) // Nav in hero Bloc
	{
		console.log('fill screen');
		targetContainer = $('.fill-bloc-top-edge.sticky-nav').parent();
		offsetVal = $('.sticky-nav').height();
		classes = "sticky animated fadeInDown"; 
	}
	
	if ($(window).scrollTop() > offsetVal)
	{  
		if (!$('.sticky-nav').hasClass('sticky')) // Add Sticky
		{
			$('.sticky-nav').addClass(classes);
			offsetVal = $('.sticky-nav').height();

			if (isFillScreenSticky)
			{
				// Set BG Color
				var bgColor = targetContainer.css('background-color');
				if (bgColor == "rgba(0, 0, 0, 0)") bgColor = '#FFFFFF';
				$('.sticky-nav').css('background', bgColor);

				offsetVal += parseInt(targetContainer.css('padding-top')); 
			}

			targetContainer.css('padding-top',offsetVal);
		}
	}
	else if ($('.sticky-nav').hasClass('sticky')) // Remove Sticky
	{
		$('.sticky-nav').removeClass(classes).removeAttr('style');
		targetContainer.removeAttr('style');
	}	
}

// Hide all animation elements
function hideAll()
{
	$('.animated').each(function(i)
	{	
		if (!$(this).closest('.hero').length) // Dont hide hero object
		{
			$(this).removeClass('animated').addClass('hideMe');
		}
	});
}

// Check if object is inView
function inViewCheck()
{	
	$($(".hideMe").get().reverse()).each(function(i)
	{	
		var target = jQuery(this);
		var a = target.offset().top + target.height();
		var b = $(window).scrollTop() + $(window).height();
		
		if (target.height() > $(window).height()) // If object height is greater than window height
		{
			a = target.offset().top;
		}
		
		if (a < b) 
		{	
			var objectClass = target.attr('class').replace('hideMe' , 'animated');
			target.css('visibility','hidden').removeAttr('class');
			setTimeout(function(){target.attr('class',objectClass).css('visibility','visible');},0.01);
			
			// Remove animtion when spent
			target.on("webkitAnimationEnd mozAnimationEnd oAnimationEnd animationEnd", function(event) {
			    $(this).removeClass($(this).attr('data-appear-anim-style'))
			});					
		}
	});
};

// ScrollToTop button toggle
function scrollToTopView()
{
	if ($(window).scrollTop() > $(window).height()/3)
	{	
		if (!$('.scrollToTop').hasClass('showScrollTop'))
		{
			$('.scrollToTop').addClass('showScrollTop');
		}	
	}
	else
	{
		$('.scrollToTop').removeClass('showScrollTop');
	}
};


// Toggle Visibility
function setUpVisibilityToggle()
{
	$(document).on('click', '[data-toggle-visibility]', function(e)
	{
		e.preventDefault();
		var targetID = $(this).attr('data-toggle-visibility');
		if (targetID.indexOf(',')!=-1) // Is Array
		{
			var targeArray = targetID.split(',');
			
			$.each(targeArray, function(i) // Loop Array
			{
				toggleVisibility($('#'+targeArray[i]));
			});
		}
		else // Single
		{
			toggleVisibility($('#'+targetID));
		}
		
		function toggleVisibility(T)
		{
			if (T.is('img')) // Image
			{
				T.toggle();
			}
			else if (T.is('.row, .bloc-group')) // Rows
			{
				T.toggleClass('d-flex');
			}
			else // Other
			{
				T.slideToggle();
			}
		}
	});
}

// Light box support
function setUpLightBox()
{
	window.targetLightbox;
	
	$(document).on('click', '[data-lightbox]', function(e) // Create Lightbox Modal
	{
		e.preventDefault();
		targetLightbox = $(this);
		var lightBoxPath = targetLightbox.attr('data-lightbox');
		var lightBoxAutoPlay = targetLightbox.attr('data-autoplay');
		var captionData ='<p class="lightbox-caption">'+targetLightbox.attr('data-caption')+'</p>';
		var galleryID = 'no-gallery-set';
		var lightBoxFrame = targetLightbox.attr('data-frame');
		
		if (targetLightbox.attr('data-gallery-id')) // Has a gallery ID so use it
		{
			galleryID = targetLightbox.attr('data-gallery-id');
		}
		
		var autoplay = ""; // No Auto Play default

		if (lightBoxAutoPlay == 1) // Add Auto Play
		{
			autoplay = "autoplay";
		}

		var customModal = $('<div id="lightbox-modal" class="modal fade"><div class="modal-dialog modal-dialog-centered modal-lg"><div class="modal-content '+lightBoxFrame+' blocs-lb-container"><button id="blocs-lightbox-close-btn" type="button" class="close-lightbox" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><div class="modal-body"><a href="#" class="prev-lightbox" aria-label="prev"><span class="fa fa-chevron-left"></span></a><a href="#" class="next-lightbox" aria-label="next"><span class="fa fa-chevron-right"></span></a><img id="lightbox-image" class="img-fluid mx-auto d-block" src="'+lightBoxPath+'"><div id="lightbox-video-container" class="embed-responsive embed-responsive-16by9"><video controls '+autoplay+' class="embed-responsive-item"><source id="lightbox-video" src="'+lightBoxPath+'" type="video/mp4"></video></div>'+captionData+'</div></div></div></div>');
		$('body').append(customModal);
		
		if (lightBoxFrame == "fullscreen-lb") // Full Screen Light Box
		{
			$('#lightbox-modal').addClass('fullscreen-modal').append('<a class="close-full-screen-modal animated fadeIn" style="animation-delay:0.5s;" onclick="$(\'#lightbox-modal\').modal(\'hide\');"><div class="close-icon"></div></a>');
			$('#blocs-lightbox-close-btn').remove();
		}
		
		if (lightBoxPath.substring(lightBoxPath.length-4) == ".mp4") // Video Object
		{
			$('#lightbox-image, .lightbox-caption').removeClass('d-block').hide();
			$('#lightbox-video-container').show();
		}
		else // Image Object
		{
			$('#lightbox-image,.lightbox-caption').addClass('d-block').show();
			$('#lightbox-video-container').hide();
			
			if (!targetLightbox.attr('data-caption')) // No caption data
			{
				$('.lightbox-caption').removeClass('d-block').hide();
			}
		}
		
		$('#lightbox-modal').modal('show');
		
		if (galleryID == 'no-gallery-set') // No Gallery ID
		{
			// Handle navigation buttons (next - prev)
			if ($('a[data-lightbox]').index(targetLightbox) == 0)
			{
				$('.prev-lightbox').hide();
			}
			if ($('a[data-lightbox]').index(targetLightbox) == $('a[data-lightbox]').length-1)
			{
				$('.next-lightbox').hide();
			}
		}
		else // Has Gallery ID
		{
			// Handle navigation buttons (next - prev)
			if ($('a[data-gallery-id="'+galleryID+'"]').index(targetLightbox) == 0)
			{
				$('.prev-lightbox').hide();
			}
			if ($('a[data-gallery-id="'+galleryID+'"]').index(targetLightbox) == $('a[data-gallery-id="'+galleryID+'"]').length-1)
			{
				$('.next-lightbox').hide();
			}
		}
		
		addLightBoxSwipeSupport(); // Add Swipe Support
	}
	).on('hidden.bs.modal', '#lightbox-modal', function () // Handle destroy modal 
	{
		$('#lightbox-modal').remove();
	})
	
	$(document).on('click', '.next-lightbox, .prev-lightbox', function(e) 
	{
		e.preventDefault();
		var galleryID = 'no-gallery-set';
		var idx = $('a[data-lightbox]').index(targetLightbox);
		var next = $('a[data-lightbox]').eq(idx+1) // Next
		
		if (targetLightbox.attr('data-gallery-id')) // Has Gallery ID so Use
		{
			galleryID = targetLightbox.attr('data-gallery-id'); // ID
			idx = $('a[data-gallery-id="'+galleryID+'"]').index(targetLightbox); // Index
			next = $('a[data-gallery-id="'+galleryID+'"]').eq(idx+1) // Next
		}
		
		if ($(this).hasClass('prev-lightbox'))
		{
			next = $('a[data-gallery-id="'+galleryID+'"]').eq(idx-1) // Prev
			
			if (galleryID == 'no-gallery-set') // No Gallery ID
			{
				next = $('a[data-lightbox]').eq(idx-1) // Prev
			}
		}
		
		var nextContentPath = next.attr('data-lightbox');
		
		if (nextContentPath.substring(nextContentPath.length-4) == ".mp4") // Video Object
		{
			var lightBoxAutoPlay = next.attr('data-autoplay');
			var autoplay = ""; // No Auto Play default

			if (lightBoxAutoPlay == 1) // Add Auto Play
			{
				autoplay = "autoplay";
			}
			
			$('#lightbox-image, .lightbox-caption').removeClass('d-block').hide();
			$('#lightbox-video-container').show().html('<video controls '+autoplay+' class="embed-responsive-item"><source id="lightbox-video" src="'+nextContentPath+'" type="video/mp4"></video>');	
		}
		else // Image Object
		{
			$('#lightbox-image').attr('src',nextContentPath).addClass('d-block').show();
			$('#lightbox-video-container').hide();
			$('.lightbox-caption').removeClass('d-block').hide();
			
			if (next.attr('data-caption'))
			{
				$('.lightbox-caption').html(next.attr('data-caption')).show();
			}
		}
		
		targetLightbox = next;	
		
		// Handle navigation buttons (next - prev)
		$('.next-lightbox, .prev-lightbox').hide();	
		
		if (galleryID == 'no-gallery-set') // No Gallery ID
		{
			if ($('a[data-lightbox]').index(next) != $('a[data-lightbox]').length-1)
			{
				$('.next-lightbox').show();
			}
			if ($('a[data-lightbox]').index(next) > 0)
			{
				$('.prev-lightbox').show();
			}
		}
		else // Has Gallery ID
		{
			if ($('a[data-gallery-id="'+galleryID+'"]').index(next) != $('a[data-gallery-id="'+galleryID+'"]').length-1)
			{
				$('.next-lightbox').show();
			}
			if ($('a[data-gallery-id="'+galleryID+'"]').index(next) > 0)
			{
				$('.prev-lightbox').show();
			}
		}
	});
}


// Add Keyboard Support
function addKeyBoardSupport()
{
	$(window).keydown(function(evt)
	{		
	  	if (evt.which == 37) // Arrow Left
	  	{
			if ($('.prev-lightbox').is(':visible')) // Lightbox Back
			{
				$('.prev-lightbox').click();
			}
	  	}
	  	else if (evt.which == 39) // Arrow Right
	  	{
			if ($('.next-lightbox').is(':visible')) // Lightbox Forward
			{
				$('.next-lightbox').click();
			}
	  	}
	});
}

// Add Lightbox Swipe Support
function addLightBoxSwipeSupport()
{
	if ($("#lightbox-image").length) // Has Carousels
	{
		// Allow Swipes
		$("#lightbox-image").swipe(
		{
			swipeLeft:function(event, direction, distance, duration, fingerCount)
			{
				if ($('.next-lightbox').is(':visible'))
				{
					$('.next-lightbox').click();
				}
			},
			swipeRight: function()
			{
				if ($('.prev-lightbox').is(':visible'))
				{
					$('.prev-lightbox').click();
				}
			},
			threshold:0
		});
	}
}