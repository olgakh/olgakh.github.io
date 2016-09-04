



function insertAfter(newElement,targetElement) {
	var parent = targetElement.parentNode;
 	if(parent.lastchild == targetElement) {
		parent.appendChild(newElement);
		} else { parent.insertBefore(newElement, targetElement.nextSibling); }
}

var trpdVideo, video, trpdProduct, sku = "";
var trpdLogged = false;
function initTreepodia() {
	if (location.pathname == "/ProductDetails.asp" || 
		location.pathname.indexOf("-p/") != -1 || 
		location.pathname.indexOf("_p/") != -1)
	{ 
		sku = global_Current_ProductCode;
		if (sku.indexOf('.') == 2) sku = sku.substring(3);
		sku = sku.replace('_',' ');
		trpdProduct = Treepodia.getProduct('UA-569E2A8D6CC63800', sku); 
		trpdProduct.requestVideo(videoHandlerFunc);
		addMeta();
	}
	
	else { try { initTreepodiaOther(); } catch (e) { } }
}

function videoHandlerFunc(videoController) 
{ 
	trpdVideo=videoController;
	trpdAddGACallBack(trpdVideo, "", sku, 1);
	if(videoController.hasVideos()) 
	{ 
		try { 
			if (true) { insertTrpdDialog(trpdVideo); } 
			else  { insertTrpdMovie(trpdVideo); } } catch (e) {}
	}
	try { insertAddToCart(); } catch (e) { } 
}		

function insertTrpdDialog(trpdVideo)
{
try
	{			
			var vidAnchor = document.createElement('div');  
			vidAnchor.setAttribute('style','display:inline-block;');
			vidAnchor.innerHTML = '<p><a id="video-btn" href="javascript:showVideoDialog(\'\', trpdVideo, \'black\')"><img style="border:0;width:310px" src="http://www.drinkupny.com/v/vspfiles/photos/video icon.jpg"></a></p>';
			
			var btnPar;
			try { btnPar = document.getElementById("product_photo_zoom_url"); }
			catch (e) { btnPar = document.getElementById("product_photo"); }
			insertAfter(vidAnchor, btnPar);
			
			trpdVideo.setPlayer('BlackRed');
		 	trpdVideo.setChromeless(true);
		 	trpdVideo.setAutoplay(false);
			trpdVideo.setMute(false);
			trpdVideo.setWmode('opaque');
			
			
			trpdVideo.addATCJavaScriptAction("Add To Cart", "document.getElementsByName('btnaddtocart')[0].click");
			trpdVideo.addShareItem("facebook"); 
			trpdVideo.addShareItem("twitter");
			trpdVideo.addShareItem("linkedin");			
	} catch (e) {}
}

function insertTrpdMovie(trpdVideo)
{
	try
	{	
		var vidPar = document.getElementById("trpdvid");
		if (vidPar != null) { video.show('trpdvid'); }
		else 
		{
			var vidLoc = document.createElement('div');
			vidLoc.setAttribute('id','trpdviddef');
			
			ovidPar = document.getElementById("ProductDetail_ProductDetails_div");
			var vidPar = document.createElement('center');
			
			if (vidPar != null)
			{
				vidPar.appendChild(document.createElement('br'));
				vidPar.appendChild(vidLoc);
				vidPar.appendChild(document.createElement('br'));
				ovidPar.appendChild(vidPar);
				trpdVideo.setPlayer('BlackRed');
		 		trpdVideo.setChromeless(true);
		 		trpdVideo.setAutoplay(false);
				trpdVideo.setMute(false);
				
				
				trpdVideo.addATCJavaScriptAction("Add To Cart", "document.getElementsByName('btnaddtocart')[0].click");
				trpdVideo.addShareItem("facebook"); 
				trpdVideo.addShareItem("twitter");
				trpdVideo.addShareItem("linkedin");
				trpdVideo.show('trpdviddef');
			}
				
			var vidAnchor = document.createElement('div');  
			vidAnchor.setAttribute('style','display:block;');
			vidAnchor.innerHTML = '<a href="javascript:goToVideo()"><img style="border:0;width:310px" src="http://www.drinkupny.com/v/vspfiles/photos/video icon.jpg"></a>';
			
			var btnPar;
			try { btnPar = document.getElementById("product_photo_zoom_url"); }
			catch (e) { btnPar = document.getElementById("product_photo"); }
			insertAfter(vidAnchor, btnPar);		
		}
	} catch (e) {}
}
	
function goToVideo() { window.scrollTo(0,((document.getElementById('trpdviddef').offsetTop)+(screen.height/2))) 

}
			
function logAddToCart() {
   try { trpdProduct.logAddToCart(); } catch (e) { }
   if(isPlayedVideo()) {
      trpdGASetEvent("", sku, "Checkout with video view");
   }
   else if (isCgVideo()) {
      trpdGASetEvent("", sku, "Checkout video control group");
   }
   else {
      trpdGASetEvent("", sku, "CheckOut without video view");
   } 
}
			
function insertAddToCart()
{
	var test = document.getElementsByName('btnaddtocart')[0].onclick;
	var test2 = document.getElementsByName("MainForm")[0].onsubmit;
	if (test != null)
	{
		document.getElementsByName('btnaddtocart')[0].setAttribute("onClick",'javascript:logAddToCart(); return addToCart(this.form, this);');
	}
	else 
	{
		try { trpdEvnt((document.getElementsByName("MainForm"))[0],'submit',handleAddToCart) } catch (e) { }
		try { trpdEvnt((document.getElementsByName("btnaddtowishlist"))[0],'click',trpdclicked2) } catch (e) { }
		try { trpdEvnt((document.getElementsByName("btnaddtocart"))[0],'click',trpdclicked) } catch (e) { }
	}
}

function trpdEvnt(obj,val,func) 
{ 
	try 
	{ 
		if (obj.addEventListener) { obj.addEventListener(val,func,false);	} 
		else { obj.attachEvent('on'+val,func); }
	} catch (e) { }
}
	
function trpdclicked() { clickBut = (document.getElementsByName("btnaddtocart"))[0]; }
function trpdclicked2() { clickBut = (document.getElementsByName("btnaddtowishlist"))[0]; }

function trpdSubmit()
{
	try { trpdLogged = true; clickBut.click(); } catch (e) { document.forms['MainForm'].submit(); }
}

function handleAddToCart(e) 
{
	if (trpdLogged) return true;
	else 
	{ 
		try 
		{
			if (e) 
			{
				try 
				{
					e.stopPropagation();
					e.preventDefault();
				} catch (ex) {}
			}
			trpdProduct.logAddToCart(trpdSubmit);
			return false;
		} catch (e) { return true; }
	}
}

function addMeta()
{
	var meta1 = document.createElement('meta');
	var meta2 = document.createElement('meta');
	var meta3 = document.createElement('meta');
	var meta4 = document.createElement('meta');
	var meta5 = document.createElement('meta');
	var meta6 = document.createElement('meta');
	var meta7 = document.createElement('meta');
	var meta8 = document.createElement('meta');
	var meta9 = document.createElement('meta');
	var link1 = document.createElement('link');
	
	meta1.setAttribute('property','og:video');
	meta1.setAttribute('content','https://api.treepodia.com/video/compact.swf?player_api_base=https://api.treepodia.com/video/overlay/&amp;player_chromeless=true&amp;player_skin_on_top=false&amp;bgcolor=0xffffff&amp;video_auto_play=true&amp;video_play_on_click=true&amp;player_allow_full_screen=true&amp;player_callback=_trpd_vid_cbk_0&amp;player_show_logo=true&amp;audio_init_mute=false&amp;video_url=https://api.treepodia.com/video/get/UA-569E2A8D6CC63800/'+global_Current_ProductCode);
	meta2.setAttribute('property','og:video:secure_url');
	meta2.setAttribute('content','https://api.treepodia.com/video/compact.swf?player_api_base=https://api.treepodia.com/video/overlay/&amp;player_chromeless=true&amp;player_skin_on_top=false&amp;bgcolor=0xffffff&amp;video_auto_play=true&amp;video_play_on_click=true&amp;player_allow_full_screen=true&amp;player_callback=_trpd_vid_cbk_0&amp;player_show_logo=true&amp;audio_init_mute=false&amp;video_url=https://api.treepodia.com/video/get/UA-569E2A8D6CC63800/'+global_Current_ProductCode);
	meta3.setAttribute('property','og:video:type');
	meta3.setAttribute('content','video/mp4');
	meta4.setAttribute('property','og:video:width');
	meta4.setAttribute('content','640');
	meta5.setAttribute('property','og:video:height');
	meta5.setAttribute('content','360');
	meta6.setAttribute('name','medium');
	meta6.setAttribute('content','video');
	meta7.setAttribute('name','video_height');
	meta7.setAttribute('content','640');
	meta8.setAttribute('name','video_width');
	meta8.setAttribute('content','360');
	meta9.setAttribute('name','video_type');
	meta9.setAttribute('content','video/mp4');
	link1.setAttribute('rel','video_src');
	link1.setAttribute('href','https://api.treepodia.com/video/compact.swf?player_api_base=https://api.treepodia.com/video/overlay/&amp;player_chromeless=true&amp;player_skin_on_top=false&amp;bgcolor=0xffffff&amp;video_auto_play=true&amp;video_play_on_click=true&amp;player_allow_full_screen=true&amp;player_callback=_trpd_vid_cbk_0&amp;player_show_logo=true&amp;audio_init_mute=false&amp;video_url=https://api.treepodia.com/video/get/UA-569E2A8D6CC63800/'+global_Current_ProductCode);
	
	trpdHead.appendChild(meta1);
	trpdHead.appendChild(meta2);
	trpdHead.appendChild(meta3);
	trpdHead.appendChild(meta4);
	trpdHead.appendChild(meta5);
	trpdHead.appendChild(meta6);
	trpdHead.appendChild(meta7);
	trpdHead.appendChild(meta8);
	trpdHead.appendChild(meta9);
	trpdHead.appendChild(link1);
}

var trpdHead = document.getElementsByTagName('head')[0];
var trpdScript = document.createElement('script');
trpdScript.type = 'text/javascript';
trpdHead.appendChild(trpdScript);
trpdScript.src = 'https://api.treepodia.com/video/Treepodia.js';

if (true) {
	document.write(unescape("%3Cscript src='https://dxa05szpct2ws.cloudfront.net/utils/trpdDialog/video-dialog.min.js' type='text/javascript'%3E%3C/script%3E")); 
}

document.write(unescape("%3Cscript src='" + document.location.protocol + "//dxa05szpct2ws.cloudfront.net/TreepodiaGA.js' type='text/javascript'%3E%3C/script%3E"));
