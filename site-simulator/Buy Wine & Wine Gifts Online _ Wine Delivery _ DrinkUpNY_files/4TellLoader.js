(function(a){a.addElement=function(b,e){var c=null;e?(c=document.createElement("link"),c.rel="stylesheet",c.href=b+"?"+a.version,document.getElementsByTagName("head")[0].appendChild(c)):(c=document.createElement("script"),c.type="text/javascript",c.async=!0,c.src=b+"?"+a.version,a.loadScript?a.loadScript.parentElement.insertBefore(c,a.loadScript):document.getElementsByTagName("head")[0].appendChild(c))};var b=function(){for(var b=document.getElementsByTagName("script"),e=null,c=-1,d=0;d<b.length;d++)if(c=
b[d].src.indexOf("4TellLoader"),!(0>c)){e=b[d];break}b={};if(null==e)return b;a.loadScript=e;b.loadpath=e.src.substring(0,c);d=e.src.replace(/^[^\?]+\??/,"");if(!d)return b;e=d.split(/[;&]/);for(d=0;d<e.length;d++){var f=e[d].split("=");f&&2==f.length&&(c=unescape(f[0]),f=unescape(f[1]),f=f.replace(/\+/g," "),b[c]=f)}return b}();a.alias=b.alias||a.alias;null==a.alias||1>a.alias.length||(a.mode=b.mode||a.mode,a.jq=a.jq||b.jq,a.loadpath=a.loadpath||b.loadpath,b=a.loadpath.indexOf("//"),0<b&&(a.loadpath=
a.loadpath.substring(b)),window!=window.top&&"object"==typeof window.top._4TellBoost&&(a.mode=window.top._4TellBoost.mode,a.version=window.top._4TellBoost.version),b=a.loadpath.indexOf(".blob"),3>b&&(a.loadpath="//4tcdn.blob.core.windows.net/4tjs3/",a.storAcct="4tcdn",a.mode="live",b=5),"undefined"==typeof a.mode?(a.storAcct=a.loadpath.substr(2,b-2),a.mode=0>a.storAcct.indexOf("stage")?"live":"stage"):(a.storAcct="stage"==a.mode?"4tcdnstage":"4tcdn",a.loadpath="//"+a.storAcct+a.loadpath.substring(b)),
"undefined"==typeof a.version&&(a.version=(new Date).getHours(),a.addElement(a.loadpath+"4TellV.js")),a.addElement(a.loadpath+"4TellLoadAsync.js"))})(window._4TellBoost=window._4TellBoost||{});
