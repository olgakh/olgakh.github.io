Event.observe(window, 'load', function() {
		//var iDiv = document.createElement('div');
		//iDiv.id = 'output-div';
		//iDiv.className = 'output-div';
		///document.getElementsByClassName('footer-container')[0].appendChild(iDiv);
                jQuery('body').append('<div id="output-div"></div>'); 

	});
function loadCallForPriceForm(reloadurl)
{

    new Ajax.Request(reloadurl, {
		method: 'post',
		parameters: Form.serialize($('product_addtocart_form')),
        onSuccess: function(transport) {
            /*$('output-div').innerHTML = "";
             $('output-div').innerHTML = transport.responseText;
             $('output-div').addClassName('output-div');*/
            var json = transport.responseText.evalJSON();
            var displayString = json.message;
            if(json.success) {
                //jQuery('body').append('<div id="output-div"></div>');  /// already there in window load
                jQuery('#output-div').html('');
                //jQuery('#output-div').html(json.request_form);
                
//                jQuery.fancybox({
//                    type: 'ajax',
//                    width:400,
//                    height:300,
//                    fitToView: false,
//                    content: jQuery('#output-div'),
//                    modal: false
//                });

            var fnc_bx_strt = '<div class="fancybox-overlay fancybox-overlay-fixed" style="width: auto; height: auto; display: block;"><div tabindex="-1" class="fancybox-wrap fancybox-desktop fancybox-type-inline fancybox-opened" style="width: 675px; height: auto; position: absolute; top: 15%; left: 25%; opacity: 1; overflow: visible;"><div class="fancybox-skin" style="padding: 15px; width: auto; height: auto;"><div class="fancybox-outer"><div class="fancybox-inner" style="overflow: auto; width: 675px; height: 420px;"><div style="" id="bannerpopup-image">';
            var fnc_bx_end = '</div></div></div><a href="javascript:;" class="fancybox-item fancybox-close" title="Close" onclick="return closePopup();"></a></div></div></div>';
            //alert(jQuery(json.request_form));
            jQuery('#output-div').html(fnc_bx_strt + json.request_form + fnc_bx_end);
            jQuery('#output-div').css('display','block');
            
            }
        }
	});
}


function submitcallforpriceform(f,submiturl){
        new Ajax.Request(submiturl, {
            method: 'post',
            parameters:Form.serialize($('cp_form')),
            onSuccess: function(transport) {
                var json = transport.responseText.evalJSON();
                var displayString = json.message;
                if(json.success) {
                    jQuery('#messages_product_view').html('<ul class="messages"><li class="success-msg"><ul><li><span>'+displayString+'</span></li></ul></li></ul>');
                    //jQuery.fancybox.close();
                    closePopup();
                }
                else
                {
                    jQuery('#messages_product_view').html('<ul class="messages"><li class="error-msg"><ul><li><span>'+displayString+'</span></li></ul></li></ul>');
                }
            }
        });
}

function closePopup() {
    jQuery('#output-div').css('display','none');
}
