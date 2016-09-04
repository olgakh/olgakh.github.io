var _FMRSBoxHostId = '';
var _FMRSOverlaySettings = '';
var _FMRSTargetURL = '';
//var _FMRSOverleyInitialized = false;

function FMRS() {
    this.host = 'FindMyRingSize.com',
    this.assetsBase = '//findmyringsize.com',
    this.client = '',
    this.clientMode = 'premium',
    this.ssl = 'unset',
    this.disabled = false,
    this.targetUrl = '',
    this.defaultValues = '',
    this.key = '',
    this.polling = false,
    this.returnUrl = document.location,
    this.mode = 'link',
    this.theme = '',
    this.overlaySettings = { boxTheme: "facebook", shadowOverlay: true },
    this.language = 'en',
    //Hack for Premium account
    this.loading = 'first',
    this.initialize = function (params) {
        for (key in params) {
            this[key] = params[key];
        }
        this.key = Math.floor(Math.random() * 1000000);
        this.generatetargetUrl();
        this.setMode();
    },
this.generatetargetUrl = function () {
    var url = '';
    url += '//';
    if (this.clientMode.toLowerCase() != 'standard') {
        url += this.client + '.' + this.host + '/'; //premium clients have subdomain
    }
    else {
        url += this.host + '/';
    }
    url += '?rUrl=' + escape(this.returnUrl);
    url += '&client=' + escape(this.client);
    url += '&hashKey=' + this.key;
    url += '&theme=' + this.theme;
    url += '&ln=' + this.language;
    //Hack for Premium
    url += '&load=' + this.loading;
    if (this.defaultValues != '') url += '&' + this.defaultValues;
    if (this.ssl == false) url += '&secure=false';
    if (this.disabled) url += '&disable=true';
    if (this.autoResize == false) url += '&scrolling=true';
    this.targetUrl = url;
},
    // ###
    // used by initialize function to preload the lightbox scripts and css
    // ###
this.setMode = function () {

    if (this.mode == 'overlay') {
        // preload dependencies
        if (typeof jQuery == 'undefined') {
            loadjscssfile(this.assetsBase + '/shared/embed/js/jquery-1.4.1.min.js', 'js');
        }
        loadjscssfile(this.assetsBase + '/shared/fmrsbox/js/jquery.FMRSBox.js', 'js');
        loadjscssfile(this.assetsBase + '/shared/fmrsbox/css/FMRSBox.css', 'css');
        loadjscssfile(this.assetsBase + '/shared/fmrsbox/js/FMRSBoxCaller.js', 'js');

    }

},
this.isFunction = function (object) {
    return typeof object === "function";
},
this.determineSecurity = function () {
    if (this.ssl == true) return 'https://';
    else return 'http://';
},

this.bind = function (elem) {

    if (this.mode == 'overlay') {
        var iframeHeight = 600;
        if (screen.height < 799) {
            iframeHeight= 625;
        }


        this.targetUrl += '&iframe=true&width=1000&height=' + iframeHeight;
        // bind fmrsbox to the hyperlink

        _FMRSBoxHostId = elem;
        _FMRSOverlaySettings = this.overlaySettings;

    }

    var link = document.getElementById(elem);
    if (link != undefined && link != null) {
        // if link is referenced by ID bind it directly, otherwise overlay code will do the binding job
        link.href = this.targetUrl;
    }

    _FMRSTargetURL = this.targetUrl;


},

this.openFMRS = function () {

},


this.addEvent = function (obj, type, fn) {
    if (obj.attachEvent) {
        obj["e" + type + fn] = fn;
        obj[type + fn] = function () { obj["e" + type + fn](window.event) };
        obj.attachEvent("on" + type, obj[type + fn]);
    }
    else {
        obj.addEventListener(type, fn, false);
    }
},
this.bindMethod = function (method, scope) {
    return function () {
        method.apply(scope, arguments);
    }
}

function loadjscssfile(filename, filetype) {
    if (filetype == "js") { //if filename is a external JavaScript file
//        var fileref = document.createElement('script')
//        fileref.setAttribute("type", "text/javascript")
        //        fileref.setAttribute("src", filename)

        document.write("<script src='"+filename+"'><\/script>"); 
        
    }
    else if (filetype == "css") { //if filename is an external CSS file
//        var fileref = document.createElement("link")
//        fileref.setAttribute("rel", "stylesheet")
//        fileref.setAttribute("type", "text/css")
    //        fileref.setAttribute("href", filename)
    document.write("<link href='" + filename + "' type='text/css' rel='stylesheet'>"); 
    }
    if (typeof fileref != "undefined")
        document.getElementsByTagName("head")[0].appendChild(fileref)
}

}
