(function(a){a.FinalLoadSequence=function(){if(3>a.CONFIG.SiteInfo.blobId){var b="undefined"==typeof jQuery().scrollable||!jQuery.tools.version||!jQuery.tools.version.length;b||(jqtVer=jQuery.tools.version.split("."),b=3>jqtVer.length||2>Number(jqtVer[0].substring(1))&&2>Number(jqtVer[1])&&3>Number(jqtVer[2]));b&&a.addElement(a.loadpath+"jquery.tools.min.js")}else"undefined"==typeof a.jq.fn.owlCarousel&&a.addElement(a.loadpath+"owl.carousel.js");"undefined"!=typeof a.CONFIG.SiteInfo.lazyOwl&&a.CONFIG.SiteInfo.lazyOwl||
"undefined"!=typeof a.jq.fn.jail||a.addElement(a.loadpath+"jail.min.js");a.addElement(a.loadpath+"4TellBoost.js")};"undefined"==typeof a.jq&&("undefined"!=typeof $jQueryModern?a.jq=$jQueryModern:"undefined"!=typeof jQuery&&(a.jq=jQuery));a.jqLoad="undefined"==typeof a.jq||!a.jq.fn.jquery||!a.jq.fn.jquery.length;if(!a.jqLoad){var c=a.jq.fn.jquery.split(".");a.jqLoad=2>c.length||2>Number(c[0])&&7>Number(c[1])}a.jqLoad&&a.addElement("//ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js");"undefined"!=
typeof JSON&&"undefined"!=typeof JSON.stringify||a.addElement(a.loadpath+"json2.js");var d=setInterval(function(){if("undefined"!=typeof jQuery){if(a.jqLoad){var b=jQuery.fn.jquery.split(".");if(2>b.length||2>Number(b[0])&&7>Number(b[1]))return}clearInterval(d);if(a.jqLoad||"undefined"==typeof a.jq)a.jq=jQuery;a.addElement(a.loadpath+"config/"+a.alias+".css",!0);a.addElement(a.loadpath+"config/"+a.alias+".js");var c=setInterval(function(){if("undefined"!=typeof a.CONFIG&&"undefined"!=typeof a.CONFIG.PageSettings&&
(clearInterval(c),a.CONFIG.SiteInfo&&a.CONFIG.SiteInfo.noConflict&&(a.jq=jQuery.noConflict(!0)),a.CONFIG.SiteInfo&&a.CONFIG.SiteInfo.siteEnable)){"undefined"!=typeof a.CONFIG.SiteInfo.radarFlag&&1==a.CONFIG.SiteInfo.radarFlag&&function(a,b,c,d,f){function e(){var a=b.createElement("script");a.async=!0;a.src="//radar.cedexis.com/1/12791/radar.js";b.body.appendChild(a)}(function(){for(var a=[/\bMSIE (5|6)/i],b=a.length;b--;)if(a[b].test(navigator.userAgent))return!1;return!0})()&&("complete"!==b.readyState?
(c=a[c])?c(f,e,!1):(c=a[d])&&c("on"+f,e):e())}(window,document,"addEventListener","attachEvent","load");if("undefined"==typeof a.CONFIG.SiteInfo.blobId){var b=a.loadpath.indexOf("4tjs")+4,b=a.loadpath.substr(b,1);a.CONFIG.SiteInfo.blobId=a.jq.isNumeric(b)?Number(b):0}a.loadpath="//"+a.storAcct+".blob.core.windows.net/4tjs"+(1<a.CONFIG.SiteInfo.blobId?a.CONFIG.SiteInfo.blobId:"")+"/";if("undefined"==typeof a.CONFIG.SiteInfo.loadDelayObject)setTimeout(a.FinalLoadSequence,a.CONFIG.SiteInfo.loadDelayTime||
0);else var d=setInterval(function(){"undefined"!=typeof a.CONFIG.SiteInfo.loadDelayObject&&a.CONFIG.SiteInfo.loadDelayObject.length&&"undefined"==a.jq(a.CONFIG.SiteInfo.loadDelayObject)||(clearInterval(d),setTimeout(a.FinalLoadSequence,a.CONFIG.SiteInfo.loadDelayTime||0))},200)}},20)}},20)})(window._4TellBoost=window._4TellBoost||{});