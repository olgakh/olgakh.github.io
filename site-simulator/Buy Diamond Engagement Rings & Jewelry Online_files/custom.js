/*
 * jQuery Superfish Menu Plugin - v1.7.4
 * Copyright (c) 2013 Joel Birch
 *
 * Dual licensed under the MIT and GPL licenses:
 *	http://www.opensource.org/licenses/mit-license.php
 *	http://www.gnu.org/licenses/gpl.html
 */
;(function (jQuery) {
	
	jQuery(document).ready(function(){
		 if (jQuery(this).width() < 700) {
		//jQuery('#header_sec').scrollToFixed();     
                
                
                jQuery('h3#trigger_link1').click(function() {
			jQuery('ul#target_link1').slideToggle(1000);
			return false;
		});
                jQuery('h3#trigger_link2').click(function() {
			jQuery('ul#target_link2').slideToggle(1000);
			return false;
		});
                jQuery('h3#trigger_link3').click(function() {
			jQuery('ul#target_link3').slideToggle(1000);
			return false;
		});
                
    }	
		
	/*
		 var exampleOptions = {
          speed: 'fast'
        }
        // initialise plugin
        var example = jQuery('#menu').superfish(exampleOptions);

        // buttons to demonstrate Superfish's public methods
        jQuery('.destroy').on('click', function(){
          example.superfish('destroy');
        });

        jQuery('.init').on('click', function(){
          example.superfish(exampleOptions);
        });

        jQuery('.open').on('click', function(){
          example.children('li:first').superfish('show');
        });

        jQuery('.close').on('click', function(){
          example.children('li:first').superfish('hide');
        });
		
		
    // initialise plugin Account01
        var example_01 = jQuery('#menu-01').superfish(exampleOptions);

        // buttons to demonstrate Superfish's public methods
        jQuery('.destroy').on('click', function(){
          example_01.superfish('destroy');
        });

        jQuery('.init').on('click', function(){
          example_01.superfish(exampleOptions);
        });

        jQuery('.open').on('click', function(){
          example_01.children('li:first').superfish('show');
        });

        jQuery('.close').on('click', function(){
          example_01.children('li:first').superfish('hide');
        });
	*/	
		
/*-------------Responsive menu js----------------------*/
				// initialise plugin
		// jQuery('#menu').slicknav();
                // var height = jQuery(window).height();
                // jQuery('.sf-mega').css({'max-height': height, 'overflow-y':'auto'});
                 
		 //jQuery("body").css("display", "none");
/*-------------Page transition js----------------------*/
    jQuery("body").fadeIn(500);
	jQuery("a.transition").click(function(event){
		event.preventDefault();
		linkLocation = this.href;
		$("body").fadeOut(450, redirectPage);		
	});
	function redirectPage() {
		window.location = linkLocation;
	}; jQuery(window).scroll(function(){
            if (jQuery(this).scrollTop() > 100) {
                jQuery('.scrollup').fadeIn();
            } else {
                jQuery('.scrollup').fadeOut();
            }
        });
/*-------------Account js----------------------*/
        jQuery('.scrollup').click(function(){
            jQuery("html, body").animate({ scrollTop: 0 }, 600);
            return false;
        });
		jQuery('a#trigger').click(function() {
			jQuery('div#target').slideToggle(1000);
			return false;
		});
			});
	})(jQuery);
	



		


	