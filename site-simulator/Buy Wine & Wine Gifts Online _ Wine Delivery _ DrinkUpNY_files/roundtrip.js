window.__adroll||(function(){function m(){this.exp=5E4;this.eexp=720;this.pv=1E11*Math.random();this.__adc="__ar_v4";this._nad=0;this._lce=null;this._loaded=this._broken=!1;this._url=2E3;this._kwl=300;this._r={};this._logs=[]};m.prototype.cookieEnabled=function(a){if(this._global("adroll_ext_network")||this._global("adroll_optout")||this._broken)return!1;if(2<=this._nad||a)return this._lce;this.set("_te_","1");return"1"===this.get("_te_")?(this.del("_te_"),0<this._nad&&!this.get(this.__adc)?this._lce=!1:this._lce=!0):this._lce=!1};
m.prototype.get=function(a){var b=window.document.cookie;if(null===b)return this._broken=!0,null;var c;0>b.indexOf(a+"=")?b=null:(a=b.indexOf(a+"=")+a.length+1,c=b.indexOf(";",a),-1===c&&(c=b.length),b=b.substring(a,c),b=""===b?null:window.unescape(b));return b};
m.prototype.set=function(a,b,c){var d;c&&"number"===typeof c?(d=new Date,d.setTime(d.getTime()+36E5*c),c=d.toGMTString(),c="; expires="+c):c="";d="; domain="+window.location.hostname;b=window.escape(b);window.document.cookie=a+"="+b+c+"; path=/"+d};m.prototype.del=function(a){this.set(a,"",-8760)};
m.prototype.check_cookie=function(a,b){if(this._global("adroll_ext_network")||this._global("adroll_optout"))return"";for(var c=a.split("|"),d=c.length-1;0<=d;d--)if(c[d]){var e=c[d].split(":");b===e[0]&&(e[2]=""+(parseInt(e[2])+1),c[d]=e.join(":"))}return c.join("|")};m.prototype.handle=function(a){var b=this.get(this.__adc)||"";-1!==b.indexOf(a)?this.set(this.__adc,this.check_cookie(b,a),this.exp):(a=[b,[a,this.get_date(this.eexp),"1"].join(":")].join("|"),this.set(this.__adc,a,this.exp))};
m.prototype.expire_old=function(){if(!this._global("adroll_ext_network")&&!this._global("adroll_optout")){for(var a=this.get_date(!1),b=this.get(this.__adc),b=b?b.split("|"):[""],c=[],d=b.length-1;0<=d;d--)b[d]&&b[d].split(":")[1]>a&&c.push(b[d]);this.set(this.__adc,c.join("|"),this.exp)}};m.prototype.get_date=function(a){var b=new Date;a&&b.setTime(b.getTime()+36E5*a);a=""+b.getUTCFullYear();var c=b.getUTCMonth(),c=10<=c?c:"0"+c,b=b.getUTCDate();return[a,c,10<=b?b:"0"+b].join("")};m.prototype.generate_link=function(){return""};m.prototype.view=function(a){var b=new window.Image;b.src=this._srv("/view/"+a);b.setAttribute("width","1");b.setAttribute("height","1");b.setAttribute("border","0");this._head().appendChild(b)};m.prototype.set_cookie=function(){};
m.prototype.reset=function(){this._set_global("adroll_c_id",null);this._set_global("adroll_url_macro","");this._set_global("adroll_c_macro","");this._set_global("adroll_cpm_macro","");this._set_global("adroll_ext_network",null);this._set_global("adroll_subnetwork",null);this._set_global("adroll_ad_payload",null);this._set_global("adroll_win_notif",null)};m.prototype.set_pixel_cookie=function(a,b,c){this._global("adroll_optout")||(this.handle(a),this.handle(b),this.handle(c),this.pixel_loaded())};
m.prototype.add_pixel_load_callback=function(a){this._loaded?a():this._ensure_global("adroll_callbacks",[]).push(a)};m.prototype.pixel_loaded=function(){this._loaded=!0;for(var a=this._ensure_global("adroll_callbacks",[]),b=0;b<a.length;b++)a[b].called||(a[b](),a[b].called=!0)};m.prototype.addLoadEvent=function(a){if(this._has_global("__adroll_loaded")&&this._global("__adroll_loaded")||this._has_global("_adroll_ie")&&this._global("_adroll_ie")||/msie/i.test(window.navigator.userAgent))return a();if(/WebKit/i.test(window.navigator.userAgent)){var b=window.setInterval(function(){/loaded|complete/.test(window.document.readyState)&&window.clearInterval(b);a()},10);return null}var c=window.onload;window.onload=function(){a();c&&c()}};
m.prototype._head=function(){return(window.document.getElementsByTagName("head")||[null])[0]||(window.document.getElementsByTagName("body")||[null])[0]||window.document.getElementsByTagName("script")[0].parentNode};m.prototype.external_data_to_qs=function(a){var b=[],c=this.get_external_data();if(!c)return null;for(var d in c)c.hasOwnProperty(d)&&b.push(this.normalize_var(window.escape(""+d)+"="+window.escape(""+c[d]),!1));b=b.join("&");a&&(b=window.escape(b));return"adroll_external_data="+b};
m.prototype.replace_external_data=function(a){var b=this.get_external_data(),c=this.get_conversion_value(),d=null,e;if(b)for(e in b)b.hasOwnProperty(e)&&(d=new RegExp("\\["+e+"\\]","gi"),a=a.replace(d,b[e]),d=new RegExp("\\["+e+"_ESC\\]","gi"),a=a.replace(d,window.escape(b[e])));if(c)for(e in c)c.hasOwnProperty(e)&&(d=new RegExp("\\["+e+"\\]","gi"),a=a.replace(d,c[e]),d=new RegExp("\\["+e+"_ESC\\]","gi"),a=a.replace(d,window.escape(c[e])));return a};
m.prototype.get_external_data=function(){if(this._has_global("adroll_custom_data")){var a=this._global("adroll_custom_data"),b={},c;for(c in a)a.hasOwnProperty(c)&&(b[c.toLowerCase()]=a[c]);return b}return null};
m.prototype.get_conversion_value=function(){var a=this._ensure_global("adroll_currency",null),b=this._ensure_global("adroll_conversion_value",null),c=this._ensure_global("adroll_conversion_value_in_dollars",null);return b?{conv_value:""+b,currency:a}:c?{conv_value:""+parseInt(100*c),currency:"USC"}:null};m.prototype._has_global=function(a){return this._is_defined(this._global(a))};m.prototype._global=function(a){return window[a]};m.prototype._set_global=function(a,b){window[a]=b};m.prototype._unset_global=function(a){delete window[a]};m.prototype._ensure_global=function(a,b){this._has_global(a)||this._set_global(a,b);return this._global(a)};m.prototype.macro_values=function(){var a=this._ensure_global("adroll_cpm_macro",null),b=this._ensure_global("adroll_url_macro",null),c=this._ensure_global("adroll_c_macro",null),d=this._ensure_global("adroll_subnetwork",null),e=this._ensure_global("adroll_ad_payload",null),n=this._ensure_global("adroll_win_notif",null),p={r:/^\$\{.*\}$/i,g:/^%%.*%%$/i,b:/^\[.*\]$/i,x:/^\$\{.*\}$/i,t:/INSERTCLICKTRACKER/}[this._global("adroll_ext_network")],p=this._is_defined(p)?p:/CANNOT_MATCH_THIS/,q={};a&&!p.test(a)&&
(q.adroll_cpm_macro=a);b&&!p.test(b)&&(q.adroll_url_macro=b);c&&!p.test(c)&&(q.adroll_c_macro=c);d&&!p.test(d)&&(q.adroll_subnetwork=d);e&&!p.test(e)&&(q.adroll_ad_payload=e);n&&!p.test(n)&&(q.adroll_win_notif=n);return q};m.prototype.format_macros=function(a,b,c,d){return this.macro_url_params(this.macro_values(),a,b,c,d)};
m.prototype.macro_url_params=function(a,b,c,d,e){e=this._is_defined(e)?e:!1;var n=d?window.escape:function(a){return a},p=a.adroll_cpm_macro,q=a.adroll_url_macro,l=c?a.adroll_c_macro:null,k=[],h=b?this.parseUri(b):null,h=h?this.endswith(h.path,".tp"):!1;!h&&e&&k.push(["desturl",""]);l&&0===l.indexOf("http")?(e=n,"g"===this._global("adroll_ext_network")&&(e=d?function(a){return a}:window.unescape),k.push(["clickurl",e(l)])):h&&e&&k.push(["clickurl",""]);this._global("adroll_ext_network")&&k.push(["adroll_network",
this._global("adroll_ext_network")]);p&&k.push(["cpm",p]);a.adroll_subnetwork&&k.push(["adroll_subnetwork",a.adroll_subnetwork]);a.adroll_ad_payload&&k.push(["adroll_ad_payload",a.adroll_ad_payload]);q&&(a=this.parseUri(window.unescape(q)),k.push(["site_url",n("http://"+a.host)]),c&&(k.push(["adroll_width",n(this._global("adroll_width"))]),k.push(["adroll_height",n(this._global("adroll_height"))])));this.log("Macros found "+this.serialize(k));return b?this.buildurl(b,k):this.serialize(k)};
m.prototype.serialize=function(a){if(a.length){for(var b=[],c=a.length-1;0<=c;c--)b.push(a[c].join("="));return b.join("&")}return""};m.prototype.endswith=function(a,b){return-1!==a.indexOf(b,a.length-b.length)};m.prototype.buildurl=function(a,b){var c=this.serialize(b),d=a.indexOf("?");return c?d===a.length-1?a+c:-1!==d?"&"===a[a.length-1]?a+c:a+"&"+c:a+"?"+c:a};m.prototype.md5=function(){function a(a,b){var c=(a&65535)+(b&65535);return(a>>16)+(b>>16)+(c>>16)<<16|c&65535}function b(b,c,d,h,f,g){c=a(a(c,b),a(h,g));return a(c<<f|c>>>32-f,d)}function c(a,c,d,h,f,g,e){return b(c&d|~c&h,a,c,f,g,e)}function d(a,c,d,h,f,g,e){return b(c&h|d&~h,a,c,f,g,e)}function e(a,c,d,h,f,g,e){return b(d^(c|~h),a,c,f,g,e)}function n(n,l){var k=n[0],h=n[1],f=n[2],g=n[3],k=c(k,h,f,g,l[0],7,-680876936),g=c(g,k,h,f,l[1],12,-389564586),f=c(f,g,k,h,l[2],17,606105819),h=c(h,f,g,k,l[3],
22,-1044525330),k=c(k,h,f,g,l[4],7,-176418897),g=c(g,k,h,f,l[5],12,1200080426),f=c(f,g,k,h,l[6],17,-1473231341),h=c(h,f,g,k,l[7],22,-45705983),k=c(k,h,f,g,l[8],7,1770035416),g=c(g,k,h,f,l[9],12,-1958414417),f=c(f,g,k,h,l[10],17,-42063),h=c(h,f,g,k,l[11],22,-1990404162),k=c(k,h,f,g,l[12],7,1804603682),g=c(g,k,h,f,l[13],12,-40341101),f=c(f,g,k,h,l[14],17,-1502002290),h=c(h,f,g,k,l[15],22,1236535329),k=d(k,h,f,g,l[1],5,-165796510),g=d(g,k,h,f,l[6],9,-1069501632),f=d(f,g,k,h,l[11],14,643717713),h=d(h,
f,g,k,l[0],20,-373897302),k=d(k,h,f,g,l[5],5,-701558691),g=d(g,k,h,f,l[10],9,38016083),f=d(f,g,k,h,l[15],14,-660478335),h=d(h,f,g,k,l[4],20,-405537848),k=d(k,h,f,g,l[9],5,568446438),g=d(g,k,h,f,l[14],9,-1019803690),f=d(f,g,k,h,l[3],14,-187363961),h=d(h,f,g,k,l[8],20,1163531501),k=d(k,h,f,g,l[13],5,-1444681467),g=d(g,k,h,f,l[2],9,-51403784),f=d(f,g,k,h,l[7],14,1735328473),h=d(h,f,g,k,l[12],20,-1926607734),k=b(h^f^g,k,h,l[5],4,-378558),g=b(k^h^f,g,k,l[8],11,-2022574463),f=b(g^k^h,f,g,l[11],16,1839030562),
h=b(f^g^k,h,f,l[14],23,-35309556),k=b(h^f^g,k,h,l[1],4,-1530992060),g=b(k^h^f,g,k,l[4],11,1272893353),f=b(g^k^h,f,g,l[7],16,-155497632),h=b(f^g^k,h,f,l[10],23,-1094730640),k=b(h^f^g,k,h,l[13],4,681279174),g=b(k^h^f,g,k,l[0],11,-358537222),f=b(g^k^h,f,g,l[3],16,-722521979),h=b(f^g^k,h,f,l[6],23,76029189),k=b(h^f^g,k,h,l[9],4,-640364487),g=b(k^h^f,g,k,l[12],11,-421815835),f=b(g^k^h,f,g,l[15],16,530742520),h=b(f^g^k,h,f,l[2],23,-995338651),k=e(k,h,f,g,l[0],6,-198630844),g=e(g,k,h,f,l[7],10,1126891415),
f=e(f,g,k,h,l[14],15,-1416354905),h=e(h,f,g,k,l[5],21,-57434055),k=e(k,h,f,g,l[12],6,1700485571),g=e(g,k,h,f,l[3],10,-1894986606),f=e(f,g,k,h,l[10],15,-1051523),h=e(h,f,g,k,l[1],21,-2054922799),k=e(k,h,f,g,l[8],6,1873313359),g=e(g,k,h,f,l[15],10,-30611744),f=e(f,g,k,h,l[6],15,-1560198380),h=e(h,f,g,k,l[13],21,1309151649),k=e(k,h,f,g,l[4],6,-145523070),g=e(g,k,h,f,l[11],10,-1120210379),f=e(f,g,k,h,l[2],15,718787259),h=e(h,f,g,k,l[9],21,-343485551);n[0]=a(k,n[0]);n[1]=a(h,n[1]);n[2]=a(f,n[2]);n[3]=
a(g,n[3])}var p="0123456789abcdef".split("");return function(a){var b=a;/[\x80-\xFF]/.test(b)&&(b=unescape(encodeURI(b)));var c=b.length;a=[1732584193,-271733879,-1732584194,271733878];var d;for(d=64;d<=b.length;d+=64){for(var f=b.substring(d-64,d),g=[],e=void 0,e=0;64>e;e+=4)g[e>>2]=f.charCodeAt(e)+(f.charCodeAt(e+1)<<8)+(f.charCodeAt(e+2)<<16)+(f.charCodeAt(e+3)<<24);n(a,g)}b=b.substring(d-64);f=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];for(d=0;d<b.length;d++)f[d>>2]|=b.charCodeAt(d)<<(d%4<<3);f[d>>2]|=
128<<(d%4<<3);if(55<d)for(n(a,f),d=0;16>d;d++)f[d]=0;f[14]=8*c;n(a,f);for(b=0;b<a.length;b++){c=a;d=b;f=a[b];g="";for(e=0;4>e;e++)g+=p[f>>8*e+4&15]+p[f>>8*e&15];c[d]=g}return a.join("")}}();m.prototype._gurl=function(){var a=window.location;return this.normalize_url(a.pathname+a.search)};
m.prototype.extract_pid=function(a,b,c){function d(a){return a?(a=new RegExp(a,"gi"),!!a.exec(q)):null}a||(a={});var e=b=null,n=null,p=null,q=this._gurl(),l=this.get_external_data();l&&(e=l.product_id,b=l.product_group,n=l.product_action,p=l.adroll_product_category_id);if(!e&&a.regexp_group&&!("string"===a.regexp_group&&a.regexp_group instanceof String)&&"html"===a.regexp_group.scheme){if(d(a.blacklist_regexp)||!0!==d(a.regexp))return"";e=this.get_product_id_from_dom(a.regexp_group)}else if(!e){if(d(a.blacklist_regexp))return"";
e=this.get_product_id_from_url(q,a.regexp,a.regexp_group)}b||!a.product_group_group||"string"===a.product_group_group&&a.product_group_group instanceof String||"html"!==a.product_group_group.scheme?b||a.product_group_regexp&&(b=this.get_product_id_from_url(q,a.product_group_regexp,a.product_group_group)):b=this.get_product_id_from_dom(a.product_group_group);if(!e)return null;a={product_id:e,product_group:b,product_action:n,product_category:p};c&&c(a);return a};
m.prototype.get_pid=function(a){this.extract_pid(a,"adroll",function(a){if(a){var c=a.product_id,d=a.product_group,e=a.product_action,n=a.product_category;a=[];var p;if(c instanceof Array)for(p=0;p<c.length;p++)a.push(["adroll_product_id",this.normalize_var((c[p]+"").toLowerCase(),!0)]);else a.push(["adroll_product_id",this.normalize_var((c+"").toLowerCase(),!0)]);if(n instanceof Array)for(p=0;p<n.length;p++)a.push(["adroll_product_category_id",this.normalize_var((n[p]+"").toLowerCase(),!0)]);else n&&
a.push(["adroll_product_category_id",this.normalize_var((n+"").toLowerCase(),!0)]);d&&a.push(["adroll_product_group",this.normalize_var((d+"").toLowerCase(),!0)]);e&&a.push(["adroll_product_action",this.normalize_var((e+"").toLowerCase(),!0)]);(c=this.external_data_to_qs(!0))&&a.push([c]);c=this._srv(this.buildurl("/p/"+this._global("adroll_adv_id")+"/",a));d=window.document.createElement("img");d.src=c;d.height=d.width=1;d.border=0;this._head().appendChild(d)}}.bind(this))};
m.prototype.get_product_id_from_dom=function(a){var b=null,c;a.path&&(window.jQuery?(c=window.jQuery(a.path),c.length&&(c=c.eq(0),b="text"===a.attribute?c.text():c.attr(a.attribute))):window.Prototype&&window.$$?(c=window.$$(a.path),c.length&&(c=c[0],b="text"===a.attribute?c.innerText&&!window.opera?c.innerText:c.innerHTML.stripScripts().unescapeHTML().replace(/[\n\r\s]+/g," "):c.readAttribute(a.attribute))):window.YUI?(c=window.YUI().use("node"),c.one&&(c=c.one(a.path),b=null,c&&(b="text"===a.attribute?
c.get("text"):c.getAttribute(a.attribute)))):window.$$&&(c=window.$$(a.path),c.length&&(c=c[0],b="text"===a.attribute?c.get("text"):c.getProperty(a.attribute))));if(b&&(b=b.replace(/^\s\s*/,"").replace(/\s\s*$/,""),a.regular_expression&&a.regular_expression_replace))if(c=new RegExp(a.regular_expression,"gi"),b=c.exec(b),null!==b){a=a.regular_expression_replace;for(c=0;c<b.length;c++)a=a.replace(new RegExp("\\\\"+c,"gi"),b[c]||"");b=a}else b="";return b};
m.prototype.get_product_id_from_url=function(a,b,c){var d=null;try{d=parseInt(c)}catch(e){}return null!==d&&!isNaN(d)&&b&&(a=(new RegExp(b,"gi")).exec(a),null!==a&&d in a)?a[d]:null};m.prototype.render_pixel_code=function(a,b){this.expire_old();var c=this._srv("/pixel"),d=window.document.createElement("script");d.setAttribute("async","true");d.type="text/javascript";var e=this.get_keywords();this.addLoadEvent(function(n){return function(){var p=[];try{p.push("adroll_s_ref="+window.escape(window.document.referrer))}catch(g){}try{p.push("keyw="+window.escape(e))}catch(g){}try{n._has_global("adroll_segments")&&p.push("name="+window.escape(n._global("adroll_segments").toLowerCase()))}catch(g){}try{var q=
n.get_conversion_value();q.conv_value&&p.push("conv_value="+q.conv_value);q.currency&&p.push("adroll_currency="+q.currency)}catch(g){}try{if(n._has_email()){var l=n._global("adroll_email"),l=l.replace(/^\s+|\s+$/g,""),k=l.toLowerCase();n.is_already_hashed(k)?p.push("hashed_email="+k):n.is_email_valid(l)?p.push("hashed_email="+n.md5(k)):(p.push("data_error=email"),p.push("data_error_message=invalid_format"))}}catch(g){}try{if(n._has_user_identifier()){var h=n._global("adroll_user_identifier"),h=h.replace(/^\s\s*/,
"").replace(/\s\s*$/,"");p.push("user_identifier="+n.md5(h))}}catch(g){}try{n._has_email()||n._has_user_identifier()||n.findAndSetEmailVarCustomData()}catch(g){}try{var f=n.external_data_to_qs(!0);f&&p.push(f)}catch(g){}p=n.get_base_url(c,a,b,null,"",p);d.src=p;n._head().appendChild(d)}}(this));this.addLoadEvent(function(a){return function(){var b=a._global("adroll");if(b&&"object"===typeof b){b.identify=function(){return a.identify.apply(a,arguments)};b.track=function(){return a.track.apply(a,arguments)};
for(var c,d,e=0;e<b.length;e++)c=b[e][0],d=b[e][1],"identify"===c?a.identify.apply(a,d):"track"===c&&a.track.apply(a,d);(b=a.get_conversion_value())&&a.track("adroll:conversion",b);(b=a.extract_pid({},"adroll",null))&&a.track("adroll:productView",b)}}}(this))};
m.prototype.render_ad_code=function(a,b,c,d){d=this._is_defined(d)?d:null;if(!this._is_defined(this._r[b])||d){var e=["width="+this._global("adroll_width"),"height="+this._global("adroll_height"),"x=0","y=0"];if(c)this.log("Rendering test ad "+c+" in space "+b),e.push("test_ad="+c),a=this.get_url(a,b,null,"ad",e);else if(d){this.log("Rendering adgroup "+d);c=this.macro_values();var n=this.macro_url_params(c,!1,!1,!1,!1);e.push(n);this.render_win_notification(c);a=this.get_url(a,b,d,null,e)}else this.log("Rendering ad space "+
b),a=this.get_url(a,b,null,"ad",e);this.expire_old();window.document.write('<script src="'+a+'">\x3c/script>');this._nad+=1;this._r[b]=1}};m.prototype.render_win_notification=function(a){if(a.adroll_cpm_macro&&a.adroll_win_notif){var b=new window.Image,c=this._secure()?"https://":"http://";b.src=c+a.adroll_win_notif+a.adroll_cpm_macro;b.setAttribute("width","1");b.setAttribute("height","1");b.setAttribute("border","0");this._head().appendChild(b)}};
m.prototype.get_base_url=function(a,b,c,d,e,n){a=a+"/"+b+"/"+c+(d?"/"+d:"")+(e?"/"+e:"");var p="";this.cookieEnabled(!1)?(p=window.escape(this.get_eids()),a+="?pv="+this.pv+"&cookie="+p):a+="?no-cookies=1&pv="+this.pv;n&&(a+="&"+n.join("&"));if(a.length>this._url){this.del(this.__adc);if(a.length-p.length>this._url)return"#";this.log("Url was too big, shrinking it");return this.get_url(b,c,d,e,n)}this.log("Generated url: "+a);return a};
m.prototype.get_url=function(a,b,c,d,e){var n=c?this._srv("/c"):this._srv("/r");return this.get_base_url(n,a,b,c,d,e)};m.prototype.get_eids=function(){if(this._global("adroll_ext_network")||this._global("adroll_optout"))return"";try{for(var a=this.get(this.__adc),b=a?a.split("|"):"",a=[],c=b.length-1;0<=c;c--)if(b[c]){var d=b[c].split(":");a.push([d[0],d[2]].join(":"))}return a.join("|")}catch(e){return this.del(this.__adc),""}};m.prototype.record_user=function(a){var b="adroll_conversion_value adroll_conversion_value_in_dollars adroll_segments adroll_email adroll_user_identifier adroll_currency".split(" "),c,d;a=a||{};var e={adroll_email:!0,adroll_user_identifier:!0};for(c=0;c<b.length;c++){try{this._unset_global(b[c])}catch(n){}if(b[c]in a){b[c]in e?this._set_global(b[c],window.escape(a[b[c]])):this._set_global(b[c],a[b[c]]);try{delete a[b[c]]}catch(n){}}}try{this._unset_global("adroll_custom_data")}catch(n){}for(d in a)if(a.hasOwnProperty(d)){this._set_global("adroll_custom_data",
a);break}this.render_pixel_code(this._global("adroll_adv_id"),this._global("adroll_pix_id"))};
m.prototype.record_adroll_email=function(a){if(this._has_email()){var b=this._global("adroll_email"),b=b.replace(/^\s+|\s+$/g,""),c,d=b.toLowerCase();this.is_already_hashed(d)?c=d:this.is_email_valid(b)&&(c=this.md5(d));b=new window.Image;c="https://d.adroll.com/id/"+this._global("adroll_adv_id")+"/?hashed_email="+c;a&&(c+="&idsource="+a);b.src=c;b.setAttribute("width","1");b.setAttribute("height","1");b.setAttribute("border","0");this._head().appendChild(b)}};
m.prototype._send_plain_text_identifiers=function(a,b,c){if((a||b)&&c){var d=new window.Image;c="https://d.adroll.com/id/"+this._global("adroll_adv_id")+"/?idsource="+c;a&&(a=a.replace(/^\s+|\s+$/g,"").toLowerCase(),c+="&email="+window.encodeURIComponent(a)+"&hashed_email="+this.md5(a));b&&(c+="&user_identifier="+window.encodeURIComponent(b));d.src=c;d.setAttribute("width","1");d.setAttribute("height","1");d.setAttribute("border","0");this._head().appendChild(d)}};
m.prototype._has_email=function(){return this._has_global("adroll_email")&&"username@example.com"!==this._global("adroll_email")};m.prototype._has_user_identifier=function(){return this._has_global("adroll_user_identifier")&&"example_user_id"!==this._global("adroll_user_identifier")};m.prototype.is_already_hashed=function(a){return/^[a-f0-9]{32}$/.test(a)};
m.prototype.getEmailVar=function(a,b,c){if(0===b)return null;var d,e;for(e in a){if(30<Date.now()-c)return null;if(Object.prototype.hasOwnProperty.call(a,e)&&a[e]!==a){if("string"===typeof a[e]&&""!==a[e]&&255>a[e].length&&-1<a[e].indexOf("@")&&-1===a[e].indexOf(" ")&&this.is_email_valid(a[e]))return'["'+e+'"]';if("object"===typeof a[e]&&a!==window&&(d=this.getEmailVar(a[e],b-1,c)))return'["'+e+'"]'+d}}};
m.prototype.findAndSetEmailVarCustomData=function(){if(0===Math.round(100*Math.random())%10){var a,b={dataLayer:this._global("dataLayer"),window:window},c=Date.now(),d;for(d in b)if(b.hasOwnProperty(d)&&this._is_defined(b[d])&&(a=this.getEmailVar(b[d],4,c))){this._ensure_global("adroll_custom_data",{}).email_var=d+a;break}}};m.prototype.is_email_valid=function(a){return/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(a)};
m.prototype.identify=function(a,b){(a.email||a.userId)&&this._send_plain_text_identifiers(a.email,a.userId,b||"adroll-identify");a.email&&this._set_global("adroll_email",a.email);"function"===typeof this.lightswitchIdentify?this.lightswitchIdentify(a):(this.identifyQueue=this.identifyQueue||[],this.identifyQueue.push(a))};m.prototype.track=function(a,b){"function"===typeof this.lightswitchTrack?this.lightswitchTrack(a,b):(this.trackQueue=this.trackQueue||[],this.trackQueue.push([a,b]))};m.prototype._is_defined=function(a){return"undefined"!==typeof a};m.prototype.normalize_var=function(a,b){if(!a)return"";a=a.toString().substr(0,this._kwl).replace(/,/gi,".");b&&(a=window.escape(a));return a};m.prototype.get_keywords=function(){try{var a=window.document.referrer||"";if(!a)return"";var b=this.parseUri(a);return-1!==b.host.indexOf("www.google.")?b.queryKey.q.substring(0,this._kwl):-1!==b.host.indexOf("bing.com")?b.queryKey.q.substring(0,this._kwl):""}catch(c){return""}};
m.prototype.parseUri=function(a){a=/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/.exec(a);for(var b={queryKey:{}},c=14,d="source protocol authority userInfo user password host port relative path directory file query anchor".split(" ");c--;)b[d[c]]=a[c]||"";b[d[12]].replace(/(?:^|&)([^&=]*)=?([^&]*)/g,function(a,c,d){c&&(b.queryKey[c]=d)});return b};
m.prototype._secure=function(){return!0};m.prototype._protocol=function(){return window.document.location.protocol};m.prototype._native=function(){try{return"http"!==this._protocol().slice(0,4)}catch(a){return!0}};m.prototype._srv=function(a){a=this._is_defined(a)?a:"";return"https://d.adroll.com"+a};m.prototype._cdn=function(a){a=this._is_defined(a)?a:"";return this._secure()?"https://s.adroll.com"+a:"http://a.adroll.com"+a};m.prototype.log=function(a){this._logs.push(a)};
m.prototype.read_log=function(a){return this._logs.join(a?"\n":"<br>\n")};m.prototype.normalize_url=function(a){return a.toLowerCase()};window.__adroll=window.__adroll||new m;}());
(function(a){a.adroll_optout=!1;a.adroll_ext_network=null;a.adroll_callbacks="undefined"===typeof a.adroll_callbacks?[]:a.adroll_callbacks;a.__adroll.render_pixel_code(a.adroll_adv_id,a.adroll_pix_id)})(window);
