
(function(jQuery) {
    jQuery.FMRSBox = { version: '1.1.1' };

    jQuery.fn.FMRSBox = function(settings) {
        settings = jQuery.extend({
            animationSpeed: 'normal', /* fast/slow/normal */
            opacity: 0.80, /* Value between 0 and 1 */
            allowresize: false, /* true/false */
            default_width: 1000,
            default_height: 800,
            counter_separator_label: '/', /* The separator for the gallery counter 1 "of" 2 */
            theme: 'light_rounded', /* light_rounded / dark_rounded / light_square / dark_square / facebook */
            hideflash: true, /* Hides all the flash object on a page, set to TRUE if flash appears over FMRSBox */
            wmode: 'opaque', /* Set the flash wmode attribute */
            modal: true, /* If set to true, only the close button will close the window */
            changepicturecallback: function() { }, /* Called everytime an item is shown/changed */
            callback: function() { }, /* Called when FMRSBox is closed */
            markup: '<div class="pp_pic_holder"> \
						<div class="pp_top"> \
							<div class="pp_left"></div> \
							<div class="pp_middle"></div> \
							<div class="pp_right"></div> \
						</div> \
						<div class="pp_content_container"> \
							<div class="pp_left"> \
							<div class="pp_right"> \
								<div class="pp_content"> \
									<div class="pp_loaderIcon"></div> \
									<div class="pp_fade"> \
									    <a class="pp_close" href="#">Close</a> \
										<div class="pp_hoverContainer"> \
										</div> \
										<div id="pp_full_res"></div> \
									</div> \
								</div> \
							</div> \
							</div> \
						</div> \
					</div> \
					<div class="pp_overlay"></div> \
					',
            iframe_markup: '<iframe src ="{path}" width="{width}" height="{height}" frameborder="no"></iframe>'
        }, settings);

        // Fallback to a supported theme for IE6

        if (/\bMSIE 6/.test(navigator.userAgent) && !window.opera) {
            settings.theme = "light_square";
        }
                
        if (jQuery('.pp_overlay').size() == 0) _buildOverlay(); // If the overlay is not there, inject it!

        // Global variables accessible only by FMRSBox
        var doresize = true, correctSizes,

        // Cached selectors
		jQuerypp_pic_holder,  jQuerypp_overlay,

        // FMRSBox container specific
		pp_contentHeight, pp_contentWidth, pp_containerHeight, pp_containerWidth,

        // Window size
		windowHeight = jQuery(window).height(), windowWidth = jQuery(window).width(),

        //Gallery specific
		setPosition = 0,

        // Global elements
		scrollPos = _getScroll();

        // Window/Keyboard events
        jQuery(window).scroll(function() { scrollPos = _getScroll(); _resizeOverlay(); _centerOverlay(); });
        jQuery(window).resize(function() { _resizeOverlay(); _centerOverlay(); });
        jQuery(document).keydown(function(e) {
            if (jQuerypp_pic_holder.is(':visible'))
                switch (e.keyCode) {
                case 27:
                        jQuery.FMRSBox.close();
                    break;
            };

        }); //END Initialize
        
        // Bind the code to each links
        jQuery(this).each(function() {
            jQuery(this).bind('click', function() {
                _self = this; // Fix scoping

                // Find out if the picture is part of a set
                theRel = jQuery(this).attr('rel');
                galleryRegExp = /\[(?:.*)\]/;
                theGallery = galleryRegExp.exec(theRel);

                // Build the gallery array
                var images = new Array(), titles = new Array(), descriptions = new Array();

                images = jQuery(this).attr('href');
                titles = (jQuery(this).find('img').attr('alt')) ? jQuery(this).find('img').attr('alt') : '';
                descriptions = (jQuery(this).attr('title')) ? jQuery(this).attr('title') : '';


                jQuery.FMRSBox.open(images, titles, descriptions);
                return false;
            });
        }); //END Bind code to links

//        alert('before bind');
        /**
        * Opens the FMRSBox modal box.
        * @param image {String,Array} Full path to the image to be open, can also be an array containing full images paths.
        * @param title {String,Array} The title to be displayed with the picture, can also be an array containing all the titles.
        * @param description {String,Array} The description to be displayed with the picture, can also be an array containing all the descriptions.
        */
        jQuery.FMRSBox.open = function(gallery_images, gallery_titles, gallery_descriptions) {
            // To fix the bug with IE select boxes            
            if (/\bMSIE 6/.test(navigator.userAgent) && !window.opera) {
                jQuery('select').css('visibility', 'hidden');
            }

            if (settings.hideflash) jQuery('object,embed').css('visibility', 'hidden'); // Hide the flash

            // Convert everything to an array in the case it's a single item
            images = jQuery.makeArray(gallery_images);
            titles = jQuery.makeArray(gallery_titles);
            descriptions = jQuery.makeArray(gallery_descriptions);

            image_set = (jQuery(images).size() > 0) ? true : false; // Find out if it's a set

            jQuery('.pp_loaderIcon').show(); // Do I need to explain?

            // Fade the content in
            jQuerypp_overlay.show().fadeTo(settings.animationSpeed, settings.opacity);

            // Display the current position
            jQuerypp_pic_holder.find('.currentTextHolder').text((setPosition + 1) + settings.counter_separator_label + jQuery(images).size());


            // Get the dimensions
            movie_width = (parseFloat(grab_param('width', images[setPosition]))) ? grab_param('width', images[setPosition]) : settings.default_width.toString();
            movie_height = (parseFloat(grab_param('height', images[setPosition]))) ? grab_param('height', images[setPosition]) : settings.default_height.toString();



            // Fade the holder
            jQuerypp_pic_holder.fadeIn(function() {
                imgPreloader = "";
                // Inject the proper content
                switch (_getFileType(images[setPosition])) {
                    case 'iframe':
                        correctSizes = _fitToViewport(movie_width, movie_height); // Fit item to viewport

                        frame_url = images[setPosition];
                        frame_url = frame_url.substr(0, frame_url.indexOf('iframe') - 1);

                        toInject = settings.iframe_markup.replace(/{width}/g, correctSizes['width']).replace(/{height}/g, correctSizes['height']).replace(/{path}/g, frame_url);

                        break;

                };

                if (!imgPreloader) {
                    jQuerypp_pic_holder.find('#pp_full_res')[0].innerHTML = toInject;

                    // Show content
                    _showContent();
                };
            });

        }; //END Open



        /**
        * Closes the FMRSBox modal box.
        */
        jQuery.FMRSBox.close = function() {
            jQuerypp_pic_holder.find('object,embed').css('visibility', 'hidden');

            jQuery('div.pp_pic_holder,div.ppt,.pp_fade').fadeOut(settings.animationSpeed);

            jQuerypp_overlay.fadeOut(settings.animationSpeed, function() {
                jQuery('#pp_full_res').html(''); // Kill the opened content

                jQuerypp_pic_holder.attr('style', '').find('div:not(.pp_hoverContainer)').attr('style', ''); // Reset the width and everything that has been set.
                _resizeOverlay();
                _centerOverlay(); // Center it

                // To fix the bug with IE select boxes                
                if (/\bMSIE 6/.test(navigator.userAgent) && !window.opera) {
                    jQuery('select').css('visibility', 'visible');
                }

                // Show the flash
                if (settings.hideflash) jQuery('object,embed').css('visibility', 'visible');

                setPosition = 0;
                settings.callback();
            });
            doresize = true;
        };

        /**
        * Set the proper sizes on the containers and animate the content in.
        */
        _showContent = function() {
            //            alert('in _showContent');
            jQuery('.pp_loaderIcon').hide();

            // Calculate the opened top position of the pic holder
            
            projectedTop = scrollPos['scrollTop'] + ((windowHeight)/1.1 - (correctSizes['containerHeight'])); //EVFIX
            

            // Resize the content holder
            jQuerypp_pic_holder.find('.pp_content').animate({ 'height': correctSizes['contentHeight'] }, settings.animationSpeed);

            // Resize picture the holder
            jQuerypp_pic_holder.animate({
                'top': projectedTop,
                'left': (windowWidth / 2) - (correctSizes['containerWidth'] / 2),
                'width': correctSizes['containerWidth']
            }, settings.animationSpeed, function() {
                jQuerypp_pic_holder.find('.pp_hoverContainer,#fullResImage').height(correctSizes['height']).width(correctSizes['width']);

                // Fade the new image
                jQuerypp_pic_holder.find('.pp_fade').fadeIn(settings.animationSpeed);

                // Show the nav
                if (image_set && _getFileType(images[setPosition]) == "image") { jQuerypp_pic_holder.find('.pp_hoverContainer').show(); } else { jQuerypp_pic_holder.find('.pp_hoverContainer').hide(); }

                // Callback!
                settings.changepicturecallback();
            });

        };

        /**
        * Hide the content...DUH!
        */
        function _hideContent(callback) {
            // Fade out the current picture
            jQuerypp_pic_holder.find('#pp_full_res object,#pp_full_res embed').css('visibility', 'hidden');
            jQuerypp_pic_holder.find('.pp_fade').fadeOut(settings.animationSpeed, function() {
                jQuery('.pp_loaderIcon').show();

                if (callback) callback();
            });

        
        }


        /**
        * Resize the item dimensions if it's bigger than the viewport
        * @param width {integer} Width of the item to be opened
        * @param height {integer} Height of the item to be opened
        * @return An array containin the "fitted" dimensions
        */
        function _fitToViewport(width, height) {
            hasBeenResized = false;

            _getDimensions(width, height);

            // Define them in case there's no resize needed
            imageWidth = width;
            imageHeight = height;

            if (((pp_containerWidth > windowWidth) || (pp_containerHeight > windowHeight)) && doresize && settings.allowresize) {
                //TODO: EV add code for low resolution fallback
                hasBeenResized = true;
                notFitting = true;

                while (notFitting) {
                    if ((pp_containerWidth > windowWidth)) {
                        imageWidth = (windowWidth - 200);
                        imageHeight = (height / width) * imageWidth;
                    } else if ((pp_containerHeight > windowHeight)) {
                        imageHeight = (windowHeight - 200);
                        imageWidth = (width / height) * imageHeight;
                    } else {
                        notFitting = false;
                    };

                    pp_containerHeight = imageHeight;
                    pp_containerWidth = imageWidth;
                };

                _getDimensions(imageWidth, imageHeight);
            };

            return {
                width: Math.floor(imageWidth),
                height: Math.floor(imageHeight),
                containerHeight: Math.floor(pp_containerHeight),
                containerWidth: Math.floor(pp_containerWidth) + 40,
                contentHeight: Math.floor(pp_contentHeight),
                contentWidth: Math.floor(pp_contentWidth),
                resized: hasBeenResized
            };
        };

        /**
        * Get the containers dimensions according to the item size
        * @param width {integer} Width of the item to be opened
        * @param height {integer} Height of the item to be opened
        */
        function _getDimensions(width, height) {

            width = parseFloat(width);
            height = parseFloat(height);

            pp_contentHeight = height + 0;
            pp_contentWidth = width;
            pp_containerHeight = pp_contentHeight  + jQuerypp_pic_holder.find('.pp_top').height() ;
            pp_containerWidth = width;
        }

        function _getFileType(itemSrc) {
            if (itemSrc.indexOf('iframe') != -1) {
                return 'iframe'
            } else if (itemSrc.substr(0, 1) == '#') {
                return 'inline';
            } else {
                return 'image';
            };
        };

        function _centerOverlay() {
            if (doresize) {
                scrollPos = _getScroll();
                //                alert('_centerOverlay()');
                titleHeight = 0;
                contentHeight = jQuerypp_pic_holder.height();
                contentwidth = jQuerypp_pic_holder.width();

                				projectedTop = (windowHeight/2) + scrollPos['scrollTop'] - ((contentHeight+titleHeight)/2);
                //projectedTop = windowHeight/1.2 + scrollPos['scrollTop'] - ((contentHeight + titleHeight)); //EV fix
                

                jQuerypp_pic_holder.css({
                    'top': projectedTop,
                    'left': (windowWidth / 2) + scrollPos['scrollLeft'] - (contentwidth / 2)
                });

               


            };
        };

        function _getScroll() {
            if (self.pageYOffset) {
                return { scrollTop: self.pageYOffset, scrollLeft: self.pageXOffset };
            } else if (document.documentElement && document.documentElement.scrollTop) { // Explorer 6 Strict
                return { scrollTop: document.documentElement.scrollTop, scrollLeft: document.documentElement.scrollLeft };
            } else if (document.body) {// all other Explorers
                return { scrollTop: document.body.scrollTop, scrollLeft: document.body.scrollLeft };
            };
        };

        function _resizeOverlay() {
            windowHeight = jQuery(window).height();
            windowWidth = jQuery(window).width();

            jQuerypp_overlay.css({
                'height': jQuery(document).height()
            });
        };

        // add background overlay over the document 
        function _buildOverlay() {
            // Inject the markup
            jQuery('body').append(settings.markup);

            // Set my global selectors
            jQuerypp_pic_holder = jQuery('.pp_pic_holder');
            jQuerypp_overlay = jQuery('div.pp_overlay');

            jQuerypp_pic_holder.attr('class', 'pp_pic_holder ' + settings.theme); // Set the proper theme

            jQuerypp_overlay
				.css({
				    'opacity': 0,
				    'height': jQuery(document).height()
				})
				.bind('click', function() {
				    if (!settings.modal)
				        jQuery.FMRSBox.close();
				});

            jQuery('a.pp_close').bind('click', function() { jQuery.FMRSBox.close(); return false; });

        };

        _centerOverlay(); // Center it
    };

    function grab_param(name, url) {
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regexS = "[\\?&]" + name + "=([^&#]*)";
        var regex = new RegExp(regexS);
        var results = regex.exec(url);
        if (results == null)
            return "";
        else
            return results[1];
    }
})(jQuery);