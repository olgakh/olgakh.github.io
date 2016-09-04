// initialize overlay if
//  binding element choosen
//  screen is big enough
//  not yet initialized
if (_FMRSOverlaySettings && _FMRSOverlaySettings != ''  && typeof (_FMRSOverleyInitialized) == 'undefined') {
    _FMRSOverleyInitialized = true;
    //    alert('init');
    //jQuery.noConflict();
    jQuery(document).ready(function() {
        var selector = "#" + _FMRSBoxHostId + ", a[rel^='fmrs-button-host'],.fmrs-button-host";
        jQuery(selector).each(function(i) { this.href = _FMRSTargetURL; });

        jQuery(selector).FMRSBox(
			{
			    //			    theme: 'light_rounded',

			    theme: _FMRSOverlaySettings.boxTheme,
			    autoresize: false,
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
			}
			);


        
    });   //EO Ready
}//EO IF