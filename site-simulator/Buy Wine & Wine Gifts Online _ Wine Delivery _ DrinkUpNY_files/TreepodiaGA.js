var playedVideo = false;
var trpdCallbackCategory;
var trpdCallbackAction;
var trpdCallbackLabel;
var trpdCallbackValue;
var _gaq = _gaq || new Array();

function trpdAddGACallBack(video, category, SKU, value) {
	if (video.hasVideos()) 
	{
		try { video.addCallback('play', 'trpdEvtVideoPlay'); } catch (e) { }
		trpdCallbackCategory = category;
		trpdCallbackAction = SKU;
		trpdCallbackLabel = "Play Video";
		trpdCallbackValue = value;
		
		if (video.isControlGroup()) 
		{
			trpdCallbackLabel = "Video Control Group";
			trpdSetCookie("videoCG", "true", expiryDate, "/");
			_gaq.push(['_trackEvent', trpdCallbackCategory, trpdCallbackAction, trpdCallbackLabel, trpdCallbackValue]);
		}
	}
}

function trpdEvtVideoPlay()
{
	playedVideo = true;
	var cookieToday = new Date(); 
	var expiryDate = new Date(cookieToday.getTime() + (365 * 86400000));
	trpdSetCookie("playedVideo", "true", expiryDate, "/");
	_gaq.push(['_trackEvent', trpdCallbackCategory, trpdCallbackAction, trpdCallbackLabel, trpdCallbackValue]);
}

function trpdGASetEvent(category, SKU, label, value) {
			_gaq.push(['_trackEvent', category, SKU, label,value]);
}

function trpdSetCookie (name,value,expires,path,theDomain,secure) { 
   value = escape(value);
   var theCookie = name + "=" + value + 
   ((expires)    ? "; expires=" + expires.toGMTString() : "") + 
   ((path)       ? "; path="    + path   : "") + 
   ((theDomain)  ? "; domain="  + theDomain : "") + 
   ((secure)     ? "; secure"            : ""); 
   document.cookie = theCookie;
} 

function trpdGetCookie(Name) { 
   var search = Name + "=" 
   if (document.cookie.length > 0) { // if there are any cookies 
      var offset = document.cookie.indexOf(search) 
      if (offset != -1) { // if cookie exists 
         offset += search.length 
         // set index of beginning of value 
         var end = document.cookie.indexOf(";", offset) 
         // set index of end of cookie value 
         if (end == -1) end = document.cookie.length 
         return unescape(document.cookie.substring(offset, end)) 
      } 
   } 
} 

function isPlayedVideo()
{
var retVal = false;
var playedVideoCookieVal=trpdGetCookie("playedVideo");

  if (playedVideoCookieVal!=null && playedVideoCookieVal!="" && playedVideoCookieVal!="0")
  {
  retVal = true;
  }
return retVal
}

function isCgVideo()
{
var retVal = false;
var cgVideoCookieVal=trpdGetCookie("videoCG");

  if (cgVideoCookieVal!=null && cgVideoCookieVal!="" && cgVideoCookieVal!="0")
  {
  retVal = true;
  }
return retVal
}