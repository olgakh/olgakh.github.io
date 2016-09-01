// Wrap our code in a function
(function(){


// Start Config Preamble
// if __csGlobal__ is defined and has initialized set to true, then a different widget is already running
if (typeof(window.__csGlobal__)==="object" && (typeof(window.__csGlobal__.initialized)==="boolean" && window.__csGlobal__.initialized===true)) {
	return;
}
configVersion = 1;
adminClientId = "aRmfuz";
adminSiteId = "aRmfu2";
codeVersion = "v0.23.236";
clientId = "sDxLnj";
siteId = "GkPnWl";
widgetDomain = "app.cdn-cs.com";

buildId = "Tam10v"; // to invalidate css/images cache when rebuilding the bar.

// the site widget should load the admin widget and exit in case of the editor
if (document.location.href.indexOf("csmode=editor") > -1)   {
    if (clientId !== adminClientId) {
        var scriptURL = "//"+widgetDomain + "/b/"+adminClientId+"/" + adminSiteId + "/p/cs_all.js?invalidateCache="+buildId+"&admn=11";
        var scriptEl    = document.createElement("script");
        scriptEl.type   = "text/javascript";
        scriptEl.src    = scriptURL;
        scriptEl.async  = true;

        document.getElementsByTagName("head")[0].appendChild(scriptEl);

        return;
    }
}

window.__csGlobal__ = window.__csGlobal__ || {};
window.__csGlobal__.initialized = true;

// language
var defaultLanguagePack = {};
var languagePack = {
    couponIconLabel: "COUPON",
    closeLabel: "Close",
    // chat button
    longChatLabel : "Live Chat",
    chatOnlineTitle : "Have a question? Let us help you!",
    chatOfflineTitle : "Have a question? Please leave us a message.",
    chatAwayTitle : "Have a question? Let us help you!",
    // tooltips
    ttLikeButton : "Please click to Like our site",
    ttPlusOneButton : "Please +1 us if you like our site",
    ttPersonalShopper : "I'm your Personal Shopper",
    ttBarSearchBox : "Search a product in our catalog",
    ttCSBarLogo : "Bar powered by Commerce Sciences",
    ttCheckout : "Go to checkout",
    ttVisitFacebook : "Visit our Facebook page",
    ttVisitTwitter : "Visit our Twitter page",
    ttPinIt : "Pin a product",
    // Bar texts
    labelBarSearchDefault : "Search a product...",
    labelCheckoutBoldPart : "CHECK",
    labelCheckoutNormalPart : "OUT",
    // facebook
    fbThanksForLiking : "Thanks for Liking us!",
    fbSorryYouUnliked:  "I'm sorry you cancelled your Like",
    fbClickLikeAgain:   "Click Like again if you change your mind",

    // gplus
    gpThanksForPlusOne: "Thanks for your +1",
    gpSorryYouCancelled: "I'm sorry you cancelled your +1",
    fbClickPlusOneAgain: "click +1 again if you change your mind",


    // coupon
cpnAutomaticallyRedeemed: "Your {0} coupon will be automatically redeemed at checkout.",
    cpnThisIsYourCoupon: "This is your {0} coupon - it will be automatically redeemed at checkout.",
    cpnClickHereToRedeem:   "Click here to redeem your {0} coupon",
    cpnHereIsYourCoupon: "Here is your coupon",
    cpnEnterCouponToRedeem:    "Enter {0} at checkout to redeem it",
    cpnYouWonACoupon:    "You have won a {0} off coupon!"

};

var sitePlatform = "Magento-dashboard";
var barDisplayMode = "bar";
var displayModeVersion = "";
var siteUrl = "http://www.design55online.co.uk/";
var websiteTimezoneOffset = "0.0";
var websiteTimezoneLocation = "";
var dstNextTransitions = "[]";

// bind polyfill (taken and compiled from: https://gist.github.com/hendriklammers/3773114)
Function.prototype.bind||(Function.prototype.bind=function(b){function c(){return d.apply(this instanceof a&&b?this:b,e.concat(Array.prototype.slice.call(arguments)));}function a(){}if("function"!==typeof this)throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");var e=Array.prototype.slice.call(arguments,1),d=this;a.prototype=this.prototype;c.prototype=new a;return c;}); // jshint ignore:line

// Array indexof polyfill (taken and compiled from: http://stackoverflow.com/a/2790686/1130804)
"indexOf"in Array.prototype||(Array.prototype.indexOf=function(b,a){void 0===a&&(a=0);0>a&&(a+=this.length);0>a&&(a=0);for(var c=this.length;a<c;a++)if(a in this&&this[a]===b)return a;return-1});

// End Config Preamble


/**
 * Created by RoyK on 05/03/2015.
 */

// A subset of jQuery
//
/*
 	Supports: 	Execution on document ready 		$( function(){} )
				element Selection 					$("body #main .button")
				inner html replacement 					$("#button").html("yay<br/>");
				html value return					$(".content").html() -> "this was the content"
				html append							$(".content").append("<div>new child</div>")
 				outer html replacement				$("#button:), replaceWith("<button id='new_id'>");
				attribute change					$(".content").attr("src", "new source");
				get children						$(".element").children();
				get childNodes						$(".element").contents();
				filter								$(".elements").filter(function(){return toFilter;});
				get text of all children			$(".parent").text()
				extend								equivalent to jq.extend


*/

var csquery = (function() {

	function ElementWrapper(element) {
		this.element = element;
		this.contents = function() {
			if (this.element) {
				return new ElementsWrapper(this.element.childNodes);
			}
			return this;
		};
		this.children = function() {
			if (this.element) {
				return new ElementsWrapper(this.element.children);
			}
			return this;
		};
		this.replaceWith = function(str) {
			if (this.element && str) {
				var parent = this.element.parentNode;
				var tmp = document.createElement('div');
				tmp.innerHTML = str;
				tmp = tmp.childNodes[0];
				parent.replaceChild(tmp, this.element);
				this.element = tmp;
			}
			return this;
		};
		this.html = function(str) {
			if (this.element) {
				if (str) {
					this.element.innerHTML = str;
					return this;
				}
				return this.element.innerHTML;
			}
			return this;
		};
		this.text = function() {
			if (this.element) {
				var textNodesUnder = function(node){
					var all = [];
					for (node=node.firstChild;node;node=node.nextSibling){
						if (node.nodeType==3) all.push(node);
						else all = all.concat(textNodesUnder(node));
					}
					return all;
				};
				var nodes = textNodesUnder(this.element);
				var texts = "";
				for (var i=0; i<nodes.length; i++) {
					texts += nodes[i].textContent;
				}
				return texts;
			}
			return this;
		};
		this.append = function(str) {
			if (this.element && str) {
				this.element.innerHTML += str;
				return this;
			}
			return this;
		};
		this.attr = function(attrName, attrValue) {
			if (this.element && attrName) {
				if (attrValue) {
					this.element.setAttribute(attrName, attrValue);
					return this;
				} else {
					return this.element.getAttribute(attrName);
				}
			}
		};
	}
	function ElementsWrapper(elements) {
        if (elements === undefined) {
            return;
        }
		for (var i=0; i<elements.length; i++) {
			this.push(new ElementWrapper(elements[i]));
		}
		this.filter = function(filterFunc) {
			if (this.length && filterFunc && typeof(filterFunc)==="function") {
				var resElements = [];
				for (var i=0; i<this.length; i++) {
					if (filterFunc.call(this[i].element)) {
						resElements.push(this[i].element);
					}
				}
				return resElements;
			}
			return this;
		};
		this.contents = function() {
			if (this.length) {
				return this[0].contents();
			}
			return this;
		};
		this.children = function() {
			if (this.length) {
				return this[0].children();
			}
			return this;
		};
		this.html = function(str) {
			if (this.length) {
				if (str) {
					for (var i=0; i<this.length; i++) {
						this[i].html(str);
					}
				} else {
					return this[0].html();
				}
			}
			return this;
		};
		this.text = function() {
			if (this.length) {
				return this[0].text();
			}
			return this;
		};
		this.replaceWith = function(str) {
			if (this.length && str) {
				return this[0].replaceWith(str);
			}
			return this;
		};
		this.attr = function(attrName, attrValue) {
			if (this.length) {
				if (attrValue) {
					for (var i=0; i<this.length; i++) {
						this[i].attr(attrName, attrValue);
					}
				} else {
					return this[0].attr(attrName);
				}
			}
		};
		this.append = function(str) {
			if (this.length && str) {
				for (var i=0; i<this.length; i++) {
					this[0].append(str);
				}
			}
			return this;
		};
	}

	ElementsWrapper.prototype = Array.prototype;
	//saving the native js array constructor so we won't override it
    var arrProtoConstructor = Array.prototype.constructor; 
    ElementsWrapper.prototype.constructor = ElementsWrapper;
    Array.prototype.constructor= arrProtoConstructor;

	// docReady taken from:
	// https://github.com/jfriend00/docReady
	(function(funcName, baseObj) {
		// The public function name defaults to window.docReady
		// but you can pass in your own object and own function name and those will be used
		// if you want to put them in a different namespace
		funcName = funcName || "docReady";
		baseObj = baseObj || window;
		var readyList = [];
		var readyFired = false;
		var readyEventHandlersInstalled = false;

		// call this when the document is ready
		// this function protects itself against being called more than once
		function ready() {
			if (!readyFired) {
				// this must be set to true before we start calling callbacks
				readyFired = true;
				ret.isReady = true;
				for (var i = 0; i < readyList.length; i++) {
					// if a callback here happens to add new ready handlers,
					// the docReady() function will see that it already fired
					// and will schedule the callback to run right after
					// this event loop finishes so all handlers will still execute
					// in order and no new ones will be added to the readyList
					// while we are processing the list
					readyList[i].fn.call(window, readyList[i].ctx);
				}
				// allow any closures held by these functions to free
				readyList = [];
			}
		}

		function readyStateChange() {
			if ( document.readyState === "complete" ) {
				ready();
			}
		}

		// This is the one public interface
		// docReady(fn, context);
		// the context argument is optional - if present, it will be passed
		// as an argument to the callback
		baseObj[funcName] = function(callback, context) {
			// if ready has already fired, then just schedule the callback
			// to fire asynchronously, but right away
			if (readyFired) {
				setTimeout(function() {callback(context);}, 1);
				return;
			} else {
				// add the function and context to the list
				readyList.push({fn: callback, ctx: context});
			}
			// if document already ready to go, schedule the ready function to run
			if (document.readyState === "complete") {
				setTimeout(ready, 1);
			} else if (!readyEventHandlersInstalled) {
				// otherwise if we don't have event handlers installed, install them
				if (document.addEventListener) {
					// first choice is DOMContentLoaded event
					document.addEventListener("DOMContentLoaded", ready, false);
					// backup is window load event
					window.addEventListener("load", ready, false);
				} else {
					// must be IE
					document.attachEvent("onreadystatechange", readyStateChange);
					window.attachEvent("onload", ready);
				}
				readyEventHandlersInstalled = true;
			}
		};
	})	("docReady", this);

	function isArraylike( obj ) {
		var length = obj.length,
			type = csquery.type( obj );

		if ( type === "function" || csquery.isWindow( obj ) ) {
			return false;
		}

		if ( obj.nodeType === 1 && length ) {
			return true;
		}

		return type === "array" || length === 0 ||
			typeof length === "number" && length > 0 && ( length - 1 ) in obj;
	}
	// Populate the class2type map
	var class2type = {
			"[object Array]": "array",
			"[object Boolean]": "boolean",
			"[object Date]": "date",
			"[object Error]": "error",
			"[object Function]": "function",
			"[object Number]": "number",
			"[object Object]": "object",
			"[object RegExp]": "regexp",
			"[object String]": "string"
	};

	var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g ;

	var arrHelper = [];
	var concat = arrHelper.concat;

	var ret = function(arg) {
		if (typeof(arg)==="string") {
			// if the string seems to contain dom elements, convert it to dom
			if (arg.indexOf("<")>-1 && arg.indexOf(">")>-1) {
				var result;
				try {
					if ( window.DOMParser ) { // Standard
						result = new DOMParser().parseFromString( arg, "text/html" );
						// html->body->content
						result = result.children[0].children[1].children[0];
					} else { // IE
						result = new ActiveXObject( "Microsoft.XMLDOM" );
						result.async = "false";
						result.loadXML( arg );
					}
				} catch( e ) {
					result = undefined;
				}
				if (result) {
					return new ElementsWrapper([result]);
				}
				return null;
			}
			// note: the below can be optimized by using class or id selector methods if we know that the query needs only a class or an id
			var elements = document.querySelectorAll(arg);
			return new ElementsWrapper(elements);
		}
		if (typeof(arg)==="function") {
			this.docReady(arg);
			return new ElementsWrapper([document]);
		}
		if (typeof(arg)==="object") {
			return arg;
		}
		return [];
	};
	ret.csquery = true;
	ret.isReady = false;
	ret.extend = function() {
		var ind = 0;
		if (arguments.length===0) return;
		var target = arguments[ind];
		var deep = false;
		if (target===true) {
			deep = true;
			target = arguments[++ind];
		}
		ind++;
		function merge(a,b, deep) {
			for (var k in b) {
				if (b.hasOwnProperty(k)) {
					if (typeof(b[k])==="object") {
						if (deep) {
							a[k] = a[k] || (ret.isArray(b[k]) ? [] :  {} ) ;  // EB - clone array to array and object ot object
							a[k] = merge(a[k], b[k], deep);
						} else {
							a[k] = b[k];
						}
					} else {
						a[k] = b[k];
					}
				}
			}
			return a;
		}
		for (var i=ind; i<arguments.length; i++) {
			merge(target, arguments[i], deep);
		}
		return target;

	};

	//based on inArray function in http://code.jquery.com/jquery-1.11.1.js
	ret.inArray = function( elem, arr, i ) {
		var len;
		if ( arr ) {
			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;
			for ( ; i < len; i++ ) {
				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}
		return -1;
	};

	ret.grep = function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	};
	ret.map = function( elems, callback, arg ) {
		console.log("csquery.map was called");

			var value,
				i = 0,
				length = elems.length,
				isArray = isArraylike( elems ),
				mapret = [];

			// Go through the array, translating each of the items to their new values
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback( elems[ i ], i, arg );

					if ( value !== null ) {
						mapret.push( value );
					}
				}

				// Go through every key on the object,
			} else {
				for ( i in elems ) {
					value = callback( elems[ i ], i, arg );

					if ( value !== null ) {
						mapret.push( value );
					}
				}
			}

			// Flatten any nested arrays
			return concat.apply( [], mapret );
	};
	ret.isWindow = function( obj ) {
		/* jshint eqeqeq: false */
		return obj !== null && obj == obj.window;
	};
	ret.type = function( obj ) {
		if ( obj === null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
		class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	};
	ret.isArray = Array.isArray || function( obj ) {
		return ret.type( obj ) === "array";
	};
	ret.trim = function( text ) {
		return text === null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	};
	return ret;
})();

var CSArray = new function() {

    this.csreduce = function(array, callback , initialValue) {
        'use strict';
        if (array === null) {
            logError('CSArray.csreduce called on null or undefined');
            return initialValue;
        }
        if (typeof callback !== 'function') {
            logError(callback + ' is not a function');
            return initialValue;
        }
        var t = Object(array), len = t.length >>> 0, k = 0, value;
        if (arguments.length == 3) {
            value = arguments[2];
        } else {
            while (k < len && !(k in t)) {
                k++;
            }
            if (k >= len) {
                logError('CS Reduce of empty array with no initial value');
                return;
            }
            value = t[k++];
        }
        for (; k < len; k++) {
            if (k in t) {
                value = callback(value, t[k], k, t);
            }
        }
        return value;
    };

    this.csflatten = function (array) {
        'use strict';
        if (array === null) {
            logError('CSArray.csflatten called on null or undefined');
            return array;
        }

        return this.csreduce(array, function(a, b) {
            return a.concat(b);
        });
    };

    this.csfilter = function(array, fun/*, thisArg*/) {
        'use strict';

        if (array === void 0 || array === null) {
            logError("CSArray.csfilter called with a null array");
            return array;
        }

        var t = Object(array);
        var len = t.length >>> 0;
        if (typeof fun !== 'function') {
            logError("CSArray.csfilter should be called with a function");
            return array;
        }

        var res = [];
        var thisArg = arguments.length >= 3 ? arguments[2] : void 0;
        for (var i = 0; i < len; i++) {
            if (i in t) {
                var val = t[i];

                // NOTE: Technically this should Object.defineProperty at
                //       the next index, as push can be affected by
                //       properties on Object.prototype and Array.prototype.
                //       But that method's new, and collisions should be
                //       rare, so use the more-compatible alternative.
                if (fun.call(thisArg, val, i, t)) {
                    res.push(val);
                }
            }
        }

        return res;
    };

    this.csfilternulls = function (array) {
        'use strict';

        if (array === null) {
            logError("CSArray.csfilternulls called with a null array");
            return array;
        }

        return this.csfilter(array, function(element) {
            return element !== undefined && element !== null;
        });
    };

    this.csmap = function(array, callback, thisArg) {

        var T, A, k;

        if (array === null) {
            logError(' array is null or not defined');
            return array;
        }

        // 1. Let O be the result of calling ToObject passing the |this|
        //    value as the argument.
        var O = Object(array);

        // 2. Let lenValue be the result of calling the Get internal
        //    method of O with the argument "length".
        // 3. Let len be ToUint32(lenValue).
        var len = O.length >>> 0;

        // 4. If IsCallable(callback) is false, throw a TypeError exception.
        // See: http://es5.github.com/#x9.11
        if (typeof callback !== 'function') {
            logError(callback + ' is not a function');
            return array;
        }

        // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
        if (arguments.length > 1) {
            T = thisArg;
        }

        // 6. Let A be a new array created as if by the expression new Array(len)
        //    where Array is the standard built-in constructor with that name and
        //    len is the value of len.
        A = new Array(len);

        // 7. Let k be 0
        k = 0;

        // 8. Repeat, while k < len
        while (k < len) {

            var kValue, mappedValue;

            // a. Let Pk be ToString(k).
            //   This is implicit for LHS operands of the in operator
            // b. Let kPresent be the result of calling the HasProperty internal
            //    method of O with argument Pk.
            //   This step can be combined with c
            // c. If kPresent is true, then
            if (k in O) {

                // i. Let kValue be the result of calling the Get internal
                //    method of O with argument Pk.
                kValue = O[k];

                // ii. Let mappedValue be the result of calling the Call internal
                //     method of callback with T as the this value and argument
                //     list containing kValue, k, and O.
                mappedValue = callback.call(T, kValue, k, O);

                // iii. Call the DefineOwnProperty internal method of A with arguments
                // Pk, Property Descriptor
                // { Value: mappedValue,
                //   Writable: true,
                //   Enumerable: true,
                //   Configurable: true },
                // and false.

                // In browsers that support Object.defineProperty, use the following:
                // Object.defineProperty(A, k, {
                //   value: mappedValue,
                //   writable: true,
                //   enumerable: true,
                //   configurable: true
                // });

                // For best browser support, use the following:
                A[k] = mappedValue;
            }
            // d. Increase k by 1.
            k++;
        }

        // 9. return A
        return A;
    };

    this.csisarray = function(array) {
        if (Array.isArray) {
            return Array.isArray(array);
        } else {
            return Object.prototype.toString.call(array) === '[object Array]';
        }
    };
};

(function(){
    // Ron Gross 10/12/2012
    // A combination of:
    // 1. https://github.com/douglascrockford/JSON-js/blob/master/json2.js and
    // 2. https://github.com/douglascrockford/JSON-js/blob/master/json_parse.js
    //
    // It defines a JSON object if needed, like json2.js, but uses the parse implementation from json_parse.js (no eval)



    /*
        json_parse.js
        2012-06-20

        Public Domain.

        NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

        This file creates a json_parse function.

            json_parse(text, reviver)
                This method parses a JSON text to produce an object or array.
                It can throw a SyntaxError exception.

                The optional reviver parameter is a function that can filter and
                transform the results. It receives each of the keys and values,
                and its return value is used instead of the original value.
                If it returns what it received, then the structure is not modified.
                If it returns undefined then the member is deleted.

                Example:

                // Parse the text. Values that look like ISO date strings will
                // be converted to Date objects.

                myData = json_parse(text, function (key, value) {
                    var a;
                    if (typeof value === 'string') {
                        a =
    /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
                        if (a) {
                            return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
                                +a[5], +a[6]));
                        }
                    }
                    return value;
                });

        This is a reference implementation. You are free to copy, modify, or
        redistribute.

        This code should be minified before deployment.
        See http://javascript.crockford.com/jsmin.html

        USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
        NOT CONTROL.
    */

    /*members "", "\"", "\/", "\\", at, b, call, charAt, f, fromCharCode,
        hasOwnProperty, message, n, name, prototype, push, r, t, text
    */

    var json_parse = (function () {
        "use strict";

    // This is a function that can parse a JSON text, producing a JavaScript
    // data structure. It is a simple, recursive descent parser. It does not use
    // eval or regular expressions, so it can be used as a model for implementing
    // a JSON parser in other languages.

    // We are defining the function inside of another function to avoid creating
    // global variables.

        var at,     // The index of the current character
            ch,     // The current character
            escapee = {
                '"':  '"',
                '\\': '\\',
                '/':  '/',
                b:    '\b',
                f:    '\f',
                n:    '\n',
                r:    '\r',
                t:    '\t'
            },
            text,

            error = function (m) {

    // Call error when something is wrong.

                throw {
                    name:    'SyntaxError',
                    message: m,
                    at:      at,
                    text:    text
                };
            },

            next = function (c) {

    // If a c parameter is provided, verify that it matches the current character.

                if (c && c !== ch) {
                    error("Expected '" + c + "' instead of '" + ch + "'");
                }

    // Get the next character. When there are no more characters,
    // return the empty string.

                ch = text.charAt(at);
                at += 1;
                return ch;
            },

            number = function () {

    // Parse a number value.

                var number,
                    string = '';

                if (ch === '-') {
                    string = '-';
                    next('-');
                }
                while (ch >= '0' && ch <= '9') {
                    string += ch;
                    next();
                }
                if (ch === '.') {
                    string += '.';
                    while (next() && ch >= '0' && ch <= '9') {
                        string += ch;
                    }
                }
                if (ch === 'e' || ch === 'E') {
                    string += ch;
                    next();
                    if (ch === '-' || ch === '+') {
                        string += ch;
                        next();
                    }
                    while (ch >= '0' && ch <= '9') {
                        string += ch;
                        next();
                    }
                }
                number = +string;
                if (!isFinite(number)) {
                    error("Bad number");
                } else {
                    return number;
                }
            },

            string = function () {

    // Parse a string value.

                var hex,
                    i,
                    string = '',
                    uffff;

    // When parsing for string values, we must look for " and \ characters.

                if (ch === '"') {
                    while (next()) {
                        if (ch === '"') {
                            next();
                            return string;
                        }
                        if (ch === '\\') {
                            next();
                            if (ch === 'u') {
                                uffff = 0;
                                for (i = 0; i < 4; i += 1) {
                                    hex = parseInt(next(), 16);
                                    if (!isFinite(hex)) {
                                        break;
                                    }
                                    uffff = uffff * 16 + hex;
                                }
                                string += String.fromCharCode(uffff);
                            } else if (typeof escapee[ch] === 'string') {
                                string += escapee[ch];
                            } else {
                                break;
                            }
                        } else {
                            string += ch;
                        }
                    }
                }
                error("Bad string");
            },

            white = function () {

    // Skip whitespace.

                while (ch && ch <= ' ') {
                    next();
                }
            },

            word = function () {

    // true, false, or null.

                switch (ch) {
                case 't':
                    next('t');
                    next('r');
                    next('u');
                    next('e');
                    return true;
                case 'f':
                    next('f');
                    next('a');
                    next('l');
                    next('s');
                    next('e');
                    return false;
                case 'n':
                    next('n');
                    next('u');
                    next('l');
                    next('l');
                    return null;
                }
                error("Unexpected '" + ch + "'");
            },

            value,  // Place holder for the value function.

            array = function () {

    // Parse an array value.

                var array = [];

                if (ch === '[') {
                    next('[');
                    white();
                    if (ch === ']') {
                        next(']');
                        return array;   // empty array
                    }
                    while (ch) {
                        array.push(value());
                        white();
                        if (ch === ']') {
                            next(']');
                            return array;
                        }
                        next(',');
                        white();
                    }
                }
                error("Bad array");
            },

            object = function () {

    // Parse an object value.

                var key,
                    object = {};

                if (ch === '{') {
                    next('{');
                    white();
                    if (ch === '}') {
                        next('}');
                        return object;   // empty object
                    }
                    while (ch) {
                        key = string();
                        white();
                        next(':');
                        if (Object.hasOwnProperty.call(object, key)) {
                            error('Duplicate key "' + key + '"');
                        }
                        object[key] = value();
                        white();
                        if (ch === '}') {
                            next('}');
                            return object;
                        }
                        next(',');
                        white();
                    }
                }
                error("Bad object");
            };

        value = function () {

    // Parse a JSON value. It could be an object, an array, a string, a number,
    // or a word.

            white();
            switch (ch) {
            case '{':
                return object();
            case '[':
                return array();
            case '"':
                return string();
            case '-':
                return number();
            default:
                return ch >= '0' && ch <= '9' ? number() : word();
            }
        };

    // Return the json_parse function. It will have access to all of the above
    // functions and variables.

        return function (source, reviver) {
            var result;

            text = source;
            at = 0;
            ch = ' ';
            result = value();
            white();
            if (ch) {
                error("Syntax error");
            }

    // If there is a reviver function, we recursively walk the new structure,
    // passing each name/value pair to the reviver function for possible
    // transformation, starting with a temporary root object that holds the result
    // in an empty key. If there is not a reviver function, we simply return the
    // result.

            return typeof reviver === 'function'
                ? (function walk(holder, key) {
                    var k, v, value = holder[key];
                    if (value && typeof value === 'object') {
                        for (k in value) {
                            if (Object.prototype.hasOwnProperty.call(value, k)) {
                                v = walk(value, k);
                                if (v !== undefined) {
                                    value[k] = v;
                                } else {
                                    delete value[k];
                                }
                            }
                        }
                    }
                    return reviver.call(holder, key, value);
                }({'': result}, ''))
                : result;
        };
    }());



    /*
        json2.js
        2012-10-08

        Public Domain.

        NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

        See http://www.JSON.org/js.html


        This code should be minified before deployment.
        See http://javascript.crockford.com/jsmin.html

        USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
        NOT CONTROL.


        This file creates a global JSON object containing two methods: stringify
        and parse.

            JSON.stringify(value, replacer, space)
                value       any JavaScript value, usually an object or array.

                replacer    an optional parameter that determines how object
                            values are stringified for objects. It can be a
                            function or an array of strings.

                space       an optional parameter that specifies the indentation
                            of nested structures. If it is omitted, the text will
                            be packed without extra whitespace. If it is a number,
                            it will specify the number of spaces to indent at each
                            level. If it is a string (such as '\t' or '&nbsp;'),
                            it contains the characters used to indent at each level.

                This method produces a JSON text from a JavaScript value.

                When an object value is found, if the object contains a toJSON
                method, its toJSON method will be called and the result will be
                stringified. A toJSON method does not serialize: it returns the
                value represented by the name/value pair that should be serialized,
                or undefined if nothing should be serialized. The toJSON method
                will be passed the key associated with the value, and this will be
                bound to the value

                For example, this would serialize Dates as ISO strings.

                    Date.prototype.toJSON = function (key) {
                        function f(n) {
                            // Format integers to have at least two digits.
                            return n < 10 ? '0' + n : n;
                        }

                        return this.getUTCFullYear()   + '-' +
                             f(this.getUTCMonth() + 1) + '-' +
                             f(this.getUTCDate())      + 'T' +
                             f(this.getUTCHours())     + ':' +
                             f(this.getUTCMinutes())   + ':' +
                             f(this.getUTCSeconds())   + 'Z';
                    };

                You can provide an optional replacer method. It will be passed the
                key and value of each member, with this bound to the containing
                object. The value that is returned from your method will be
                serialized. If your method returns undefined, then the member will
                be excluded from the serialization.

                If the replacer parameter is an array of strings, then it will be
                used to select the members to be serialized. It filters the results
                such that only members with keys listed in the replacer array are
                stringified.

                Values that do not have JSON representations, such as undefined or
                functions, will not be serialized. Such values in objects will be
                dropped; in arrays they will be replaced with null. You can use
                a replacer function to replace those with JSON values.
                JSON.stringify(undefined) returns undefined.

                The optional space parameter produces a stringification of the
                value that is filled with line breaks and indentation to make it
                easier to read.

                If the space parameter is a non-empty string, then that string will
                be used for indentation. If the space parameter is a number, then
                the indentation will be that many spaces.

                Example:

                text = JSON.stringify(['e', {pluribus: 'unum'}]);
                // text is '["e",{"pluribus":"unum"}]'


                text = JSON.stringify(['e', {pluribus: 'unum'}], null, '\t');
                // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'

                text = JSON.stringify([new Date()], function (key, value) {
                    return this[key] instanceof Date ?
                        'Date(' + this[key] + ')' : value;
                });
                // text is '["Date(---current time---)"]'


            JSON.parse(text, reviver)
                This method parses a JSON text to produce an object or array.
                It can throw a SyntaxError exception.

                The optional reviver parameter is a function that can filter and
                transform the results. It receives each of the keys and values,
                and its return value is used instead of the original value.
                If it returns what it received, then the structure is not modified.
                If it returns undefined then the member is deleted.

                Example:

                // Parse the text. Values that look like ISO date strings will
                // be converted to Date objects.

                myData = JSON.parse(text, function (key, value) {
                    var a;
                    if (typeof value === 'string') {
                        a =
    /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
                        if (a) {
                            return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
                                +a[5], +a[6]));
                        }
                    }
                    return value;
                });

                myData = JSON.parse('["Date(09/09/2001)"]', function (key, value) {
                    var d;
                    if (typeof value === 'string' &&
                            value.slice(0, 5) === 'Date(' &&
                            value.slice(-1) === ')') {
                        d = new Date(value.slice(5, -1));
                        if (d) {
                            return d;
                        }
                    }
                    return value;
                });


        This is a reference implementation. You are free to copy, modify, or
        redistribute.
    */

    /*jslint evil: true, regexp: true */

    /*members "", "\b", "\t", "\n", "\f", "\r", "\"", JSON, "\\", apply,
        call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
        getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
        lastIndex, length, parse, prototype, push, replace, slice, stringify,
        test, toJSON, toString, valueOf
    */


    // Create a JSON object only if one does not already exist. We create the
    // methods in a closure to avoid creating global variables.

    if (typeof JSON !== 'object') {
        JSON = {};
    }

    (function () {
        'use strict';

        function f(n) {
            // Format integers to have at least two digits.
            return n < 10 ? '0' + n : n;
        }

        if (typeof Date.prototype.toJSON !== 'function') {

            Date.prototype.toJSON = function (key) {

                return isFinite(this.valueOf())
                    ? this.getUTCFullYear()     + '-' +
                        f(this.getUTCMonth() + 1) + '-' +
                        f(this.getUTCDate())      + 'T' +
                        f(this.getUTCHours())     + ':' +
                        f(this.getUTCMinutes())   + ':' +
                        f(this.getUTCSeconds())   + 'Z'
                    : null;
            };

            String.prototype.toJSON      =
                Number.prototype.toJSON  =
                Boolean.prototype.toJSON = function (key) {
                    return this.valueOf();
                };
        }

        var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
            escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
            gap,
            indent,
            meta = {    // table of character substitutions
                '\b': '\\b',
                '\t': '\\t',
                '\n': '\\n',
                '\f': '\\f',
                '\r': '\\r',
                '"' : '\\"',
                '\\': '\\\\'
            },
            rep;


        function quote(string) {

    // If the string contains no control characters, no quote characters, and no
    // backslash characters, then we can safely slap some quotes around it.
    // Otherwise we must also replace the offending characters with safe escape
    // sequences.

            escapable.lastIndex = 0;
            return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
                var c = meta[a];
                return typeof c === 'string'
                    ? c
                    : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
            }) + '"' : '"' + string + '"';
        }


        function str(key, holder) {

    // Produce a string from holder[key].

            var i,          // The loop counter.
                k,          // The member key.
                v,          // The member value.
                length,
                mind = gap,
                partial,
                value = holder[key];

    // If the value has a toJSON method, call it to obtain a replacement value.

            if (value && typeof value === 'object' &&
                    typeof value.toJSON === 'function') {
                value = value.toJSON(key);
            }

    // If we were called with a replacer function, then call the replacer to
    // obtain a replacement value.

            if (typeof rep === 'function') {
                value = rep.call(holder, key, value);
            }

    // What happens next depends on the value's type.

            switch (typeof value) {
            case 'string':
                return quote(value);

            case 'number':

    // JSON numbers must be finite. Encode non-finite numbers as null.

                return isFinite(value) ? String(value) : 'null';

            case 'boolean':
            case 'null':

    // If the value is a boolean or null, convert it to a string. Note:
    // typeof null does not produce 'null'. The case is included here in
    // the remote chance that this gets fixed someday.

                return String(value);

    // If the type is 'object', we might be dealing with an object or an array or
    // null.

            case 'object':

    // Due to a specification blunder in ECMAScript, typeof null is 'object',
    // so watch out for that case.

                if (!value) {
                    return 'null';
                }

    // Make an array to hold the partial results of stringifying this object value.

                gap += indent;
                partial = [];

    // Is the value an array?

                if (Object.prototype.toString.apply(value) === '[object Array]') {

    // The value is an array. Stringify every element. Use null as a placeholder
    // for non-JSON values.

                    length = value.length;
                    for (i = 0; i < length; i += 1) {
                        partial[i] = str(i, value) || 'null';
                    }

    // Join all of the elements together, separated with commas, and wrap them in
    // brackets.

                    v = partial.length === 0
                        ? '[]'
                        : gap
                        ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']'
                        : '[' + partial.join(',') + ']';
                    gap = mind;
                    return v;
                }

    // If the replacer is an array, use it to select the members to be stringified.

                if (rep && typeof rep === 'object') {
                    length = rep.length;
                    for (i = 0; i < length; i += 1) {
                        if (typeof rep[i] === 'string') {
                            k = rep[i];
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (gap ? ': ' : ':') + v);
                            }
                        }
                    }
                } else {

    // Otherwise, iterate through all of the keys in the object.

                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (gap ? ': ' : ':') + v);
                            }
                        }
                    }
                }

    // Join all of the member texts together, separated with commas,
    // and wrap them in braces.

                v = partial.length === 0
                    ? '{}'
                    : gap
                    ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}'
                    : '{' + partial.join(',') + '}';
                gap = mind;
                return v;
            }
        }

    // If the JSON object does not yet have a stringify method, give it one.

        if (typeof JSON.stringify !== 'function') {
            JSON.stringify = function (value, replacer, space) {

    // The stringify method takes a value and an optional replacer, and an optional
    // space parameter, and returns a JSON text. The replacer can be a function
    // that can replace values, or an array of strings that will select the keys.
    // A default replacer method can be provided. Use of the space parameter can
    // produce text that is more easily readable.

                var i;
                gap = '';
                indent = '';

    // If the space parameter is a number, make an indent string containing that
    // many spaces.

                if (typeof space === 'number') {
                    for (i = 0; i < space; i += 1) {
                        indent += ' ';
                    }

    // If the space parameter is a string, it will be used as the indent string.

                } else if (typeof space === 'string') {
                    indent = space;
                }

    // If there is a replacer, it must be a function or an array.
    // Otherwise, throw an error.

                rep = replacer;
                if (replacer && typeof replacer !== 'function' &&
                        (typeof replacer !== 'object' ||
                        typeof replacer.length !== 'number')) {
                    throw new Error('JSON.stringify');
                }

    // Make a fake root object containing our value under the key of ''.
    // Return the result of stringifying the value.

                return str('', {'': value});
            };
        }


    // If the JSON object does not yet have a parse method, give it one.

        if (typeof JSON.parse !== 'function') {
            JSON.parse = json_parse;
        }
    }());
})();

/**
 * Cross domain storage.
 * Based on: http://www.nczonline.net/blog/2010/09/07/learning-from-xauth-cross-domain-localstorage/
 * @author Juan Ramon Gonzalez Hidalgo
 * @param origin Iframe URL
 * @param path Path to iframe html file in origin
 * Source: https://github.com/juanrmn/localStorage-tools/blob/master/js/tools/cross_domain_storage.js
 */
function CDStorage(origin, path){
    this._iframe = null;
    this._iframeReady = false;
	this._origin = "https://app.cdn-cs.com/iframe.html";//origin;
    this._path = path;
    this._queue = [];
    this._requests = {};
	this._cache = {};
    this._id = 0;
	this._cachePromise = D();
    this._cookieItems= ["chosenVariants", "chosenVariantId", "context.session.visitState", "context.user.visitCount", "context.session.isAtSessionStart",
        "context.user.referrer.url", "context.user.referrer.search", "context.session.landingPage.url", "context.session.landingPage.search", "context.session.splitPage.url"];
	this.localShadowStorage = new LocalDomainStorage() ;

    this._check_supports = function(){
        try{
            return window.postMessage && window.JSON && window.localStorage !== null;
        }catch(e){
            return false;
        }
    };
    this.supported = this._check_supports() && !urlParams.csIgnoreIframe;
}

/** 
 * Cross domain storage
 */
CDStorage.prototype = {
    constructor: CDStorage,
    init: function(){
        var that = this;


		if(!this._iframe && this.supported){
			this._iframe = document.createElement("iframe");
			this._iframe.style.cssText = "display:none;position:absolute;width:1px;height:1px;left:-9999px;";
			this._iframe.width = 0;
			this._iframe.height = 0;
			if (document && document.readyState && (document.readyState === "complete" || document.readyState === "loaded" || document.readyState === "interactive"))
				document.body.appendChild(that._iframe);
			else {
				if (document && document.body && document.body.appendChild) { // EB - because of jquery bug when document.readyState=="loading" jq(document).ready doesn't work
					document.body.appendChild(that._iframe);
				} else {
					csquery(function () {
						document.body.appendChild(that._iframe);
					});
				}
			}
			if(window.addEventListener){
				this._iframe.addEventListener("load", function(){ that._iframeLoaded(); }, false);
				window.addEventListener("message", function(event){ that._handleMessage(event); }, false);
			}else if(this._iframe.attachEvent){
				this._iframe.attachEvent("onload", function(){ that._iframeLoaded(); }, false);
				window.attachEvent("onmessage", function(event){ that._handleMessage(event); });
			}
			this._iframe.src = this._origin + this._path;
			this.extendSession();
			this._loadCache();
		}
	},

    extendSession: function(callback) {
        var request = {
            type: 'extendSession'
        };
		this.localShadowStorage.extendSessionValues();
        return this._buildRequest(request, callback);
    },

    endSession: function(callback) {
        var request = {
            type: 'endSession'
        };
		this.localShadowStorage.removeSessionValues();
        return this._buildRequest(request, callback);
    },

	getAllItems: function(callback) {
		var request = {
            type: 'getAll'
		};
		return this._buildRequest(request, callback);
	},

	getAllItemsRaw: function(callback) {
		var request = {
            type: 'getAllRaw'
		};
		return this._buildRequest(request, callback);
	},

    fillContextWithCookieValues: function(context) {
        for (var i=0; i<this._cookieItems.length; i++) {
            var key = this._cookieItems[i];
            var value = this.getItem(key);
            if (value) {
                context.setValue(key, value);
            }
        }
    },

	getItem: function(key) {
		if (key.indexOf("cookie.")!==0 && !this._cache[key] && this.storedInCookie(key)) {
			key = "_cs."+siteId+"."+key;
			return getCookie(key);
		}
		return this._cache[key];
	},

	getAllItemsFromCache: function() {
		var all = {};
		for (var i in this._cache){
			all[i] = this._cache[i];
		}
		return all;
	},

    setItem: function(key, value, persistence){
		// persistence=true means: store forever. false=store for session (default value: 30 mins). otherwise, it should be a number in milliseconds.
		// but iframe.html expects the opposite (due to backward compatibility - old code was false: don't persist, true: persist. new code is true: persist forever. false: persist for session)
		// so we need to flip true and false before sending
		var fromCookie = key.indexOf("cookie.")===0;
		this._cache[key] = value;
		key = siteId+"."+key;
		if (!fromCookie && this.storedInCookie(key)) {
			key = "_cs."+key;
			var persistenceTime = persistence;
			if (persistence===true) {
				persistenceTime = persistentCookieDuration;
			}
			if (persistence===false) {
				persistenceTime = Duration.minutes(30);
			}
			setCookie(key, value, persistenceTime, null);
		} else {
			var that = this;
			this.onCacheReady().then(function() {
				if (persistence === true) {
					persistence = false;
				} else if (persistence === false) {
					persistence = true;
				}
				if (persistence === null) {
					persistence = false;
				}

				var request = {
					type: 'set',
					key: key,
					value: value,
					persistence: persistence
				};
				that.localShadowStorage.setSessionValue(request);
				that._buildRequest(request);
			});
		}
    },

    setItemRaw: function(key, rawValue){
		// unlike setItem() - here persistence is taken from the raw value received

		if (!this._cache.hasOwnProperty(key)) {  // Don't overwrite values that already exist in cache -
			if (this.isJsonWithProperty(rawValue, "value")) {
				var obj = JSON.parse(rawValue); // extract value from JSON entry (expiring object)
				this._cache[key] = obj.value;
			} else {
				this._cache[key] = rawValue;
			}
		}
		key = siteId+"."+key;

		// TODO: check if need to also set cookies from localBackupStorage like in setItem.
		var request = {
			type: 'setRaw',
			key: key,
			value: rawValue
		};
		// if key is missing from localShadowStorage - copy it there
		// Note: usually will already be in localShadowStorag since setItemRaw() is for restoring CDStorage from LocalShadowStorage -
		// but this is to be future proof in case restoring from other location
		if (!this.localShadowStorage.getRawByKey(key)) {  // localShadowStorgae uses same key as CDStorage - check if there's any entry there already (use raw in case of null)
			this.localShadowStorage.setDirectInStorage(key,rawValue);
		}
		this._buildRequest(request);
    },

	unsetItem: function(key) {
		// todo: Need to delete from cache as well?
		key = siteId+"."+key;
		var request = {
				type: 'unset',
				key: key
		};
		this.localShadowStorage.removeItem(key);
		return this._buildRequest(request);
	},

	unsetDomain: function(domain) {
		// todo: Need to delete from cache as well?
		var request = {
			type: 'unsetDomain',
			key: domain
		};
		this.localShadowStorage.unsetDomain(key);
		return this._buildRequest(request);
	},

	onCacheReady: function() {
		return this._cachePromise.promise;
	},

    //private methods
    _sendRequest: function(data){
        if(this._iframe){
            this._requests[data.request.id] = data;
            this._iframe.contentWindow.postMessage(JSON.stringify(data.request), this._origin);
        }
    },

    _iframeLoaded: function(){
        this._iframeReady = true;
        if(this._queue.length){
			while (this._queue.length) {
                this._sendRequest(this._queue.shift());
            }
        }
        this.onCacheReady().then((function() {
            for (var i = 0; i < this._cookieItems.length; i++) {
                var key = siteId + "." + this._cookieItems[i];
                var cookieKey = "_cs." + key;
                var cookieValue = getCookie(cookieKey);
                if (cookieValue) {
                    var request = {
                        type: 'set',
                        key: key,
                        value: cookieValue,
                        persistence: false
                    };
					this.localShadowStorage.setSessionValue(request);
                    this._buildRequest(request);
                }
            }
        }).bind(this));
    },

    _handleMessage: function(event){
        if(this._origin.indexOf(event.origin) !== -1) {
            var data = JSON.parse(event.data);
            if(typeof this._requests[data.id].deferred != 'undefined'){
                this._requests[data.id].deferred.resolve(data.value);
            }
            if(typeof this._requests[data.id].callback == 'function'){
                this._requests[data.id].callback(data.key, data.value);
            }
            delete this._requests[data.id];
        }
    },

	_buildRequest:function (request, callback) {
		if (this.supported) {
			request.id = ++this._id;
			var data = {
				request: request,
				callback: callback
			};
			data.deferred = D();

			if(this._iframeReady){
				this._sendRequest(data);
			}else{
				this._queue.push(data);
			}

			return data.deferred.promise;
		}
		return null;
	},

	// test if item is a JSON string, which contains a specific property
	isJsonWithProperty: function(jsonSuspect, prop) {
		try {
			var json = JSON.parse(jsonSuspect);
			return json.hasOwnProperty(prop) ;
		} catch (e) {
			return false;
		}
	},

	copyValuesToCacheAndLocalShadowStorage: function (valueJson){
		for (var k in valueJson) {
			if (valueJson.hasOwnProperty(k)) {
				// remove siteId, compare it to this siteId and store only the ones that match
				var _value = valueJson[k];
				var originalValue = _value;
				var originalKey = k;
				k = k.split(".");
				var _siteId = k.shift();
				if (_siteId===siteId) {
					var finalKey = k.join(".");
					// Don't overwrite values that already exist (e.g. goe)
					if (!this._cache.hasOwnProperty(finalKey)) {
						if (this.isJsonWithProperty(_value, "value")){
							var obj = JSON.parse(_value);
							_value = obj.value;
						}
						this._cache[finalKey] = _value;
					}
					// if key is missing from localShadowStorage - copy it there
					if (!this.localShadowStorage.getRawByKey(originalKey) ) {  // localShadowStorgae uses same key as CDStorage - check if there's any entry there already (use raw in case of null)
						this.localShadowStorage.setDirectInStorage(originalKey,originalValue);
					} else if (cdStroagePrioritizedOverShadowStorage) {
						// 3rd party storage takes precedence for specified items if cdStroagePrioritizedOverShadowStorage is true
						for (i=0; i<itemsToOverrideFromCDStorage.length ; i++) {
							if ( originalKey.indexOf(itemsToOverrideFromCDStorage[i]) !== -1 ) { // this key is in the overwrite items copy it over the local
								this.localShadowStorage.setDirectInStorage(originalKey,originalValue);
							}
						}
					}
				}
			}
		}
	},

	copyLocalShadowStoragetoCDStorage: function (){
		var value = this.localShadowStorage.getAllRaw();
		var allRaw = JSON.parse(value);
		for (var k in allRaw) {
			if (allRaw.hasOwnProperty(k)) {
				// remove siteId, compare it to this siteId and store only the ones that match
				var rawEntry = allRaw[k];

				k = k.split(".");
				var _siteId = k.shift();
				if (_siteId===siteId) { // Theoretically could happen if two tags on one domain, so make sure to take only relevant entries.
					var finalKey = k.join(".");
					this.setItemRaw(finalKey, rawEntry);
				}

			}
		}
	},

	_loadCache: function() {
		var that = this;
		this.getAllItemsRaw(function(key, value) {
			try {
				var valueJson = JSON.parse(value);
				that.copyValuesToCacheAndLocalShadowStorage.call(that,valueJson);
				that.copyLocalShadowStoragetoCDStorage.call(that);
				that._cachePromise.resolve(that._cache);
			}catch(e) {
				logError("Failed loading storage cache:" + e.name + ", details: " + e.message, e);
			}
		});
	},

	storedInCookie: function(key) {
		for (var k in this._cookieItems) {
            if (this._cookieItems.hasOwnProperty(k) && key.indexOf(this._cookieItems[k])>-1) {
				return true;
			}
		}
		return false;
	}
};

if (devMode) {
    exportFunc(function(origin, path) { return new CDStorage(origin, path); }, "getCD");
}

function LocalDomainStorage() {
    var debugMode = true;

    var sessionExpirationMS = 30 * 60 * 1000; // 30 minutes session

    // based on http://stackoverflow.com/questions/3609005/simple-javascript-encrypt-php-decrypt-with-shared-secret-key
    function str_rot13(text) {
        return text.replace(/[a-zA-Z]/g, function(c){ return String.fromCharCode((c <= "Z" ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26); });
    }


    function setItemInStorage(key, value) {
        if (debugMode) {
            localStorage.setItem(key, value);
        } else {
            // persist the obfuscated key + value
            localStorage.setItem(str_rot13(key), str_rot13(value));
        }
    }

    this.setDirectInStorage = function(key,value){
        localStorage.setItem(key, value);
    };

    function getValueFromStorage(key) {
        var value = localStorage.getItem(key);
        if (debugMode) {
            return value;
        }

        return value ? str_rot13(value) : value; // will remove obfuscation if needed.
    }

    this.removeItem = function(key) {
        localStorage.removeItem(key);
    };

    this.unsetDomain = function(key) {
        for (var k in localStorage) {
            if (k.split(".")[0] === key) {
                this.removeItem(k);
            }
        }
    };

    this.extendSessionValues = function() {
        for (var i = 0; i < localStorage.length; i++){
            var key = localStorage.key(i);
            var value = getValueFromStorage(key);
            if (isSessionObject(value)) {
                value = this.getByKey(key);
                if (value !== undefined) {
                    this.setSessionValue({key:key, value:value}); // extend the session object if not expired
                }
            }
        }
    };

    this.removeSessionValues = function() {
        var entriesToRemove = {} ;
        for (var i = 0; i < localStorage.length; i++){
            var key = localStorage.key(i);
            var value = getValueFromStorage(key);
            if (isSessionObject(value)) {
                entriesToRemove[key] = 1;
            }
        }
        for (var j in entriesToRemove) {
            this.removeItem(j); // object is no longer valid.
        }
    };

    this.setSessionValue = function(request) {
        // false - store forever
        if (request.persistence===false) {
            setItemInStorage(request.key, request.value);
        } else {
            var record = {value: request.value};
            var persistenceNum = parseInt(request.persistence, 10);
            var isSession = false;
            // true or NaN - no expiration received set default session persistence (30 mins)
            if (request.persistence===true || persistenceNum!==persistenceNum) {
                persistenceNum = sessionExpirationMS;
                isSession = true;
            }
            record.timestamp = new Date().getTime() + persistenceNum ;
            if (isSession) {
                record._csIsSession = true ; // mark as session expiration object (only the key existence matters, can have any value)
            }
            setItemInStorage(request.key, JSON.stringify(record));
        }
    };

    // test if item is a JSON string, which contains a specific property
    function isJsonWithProperty(jsonSuspect, prop) {
        try {
            var json = JSON.parse(jsonSuspect);
            return json.hasOwnProperty(prop) ;
        } catch (e) {
            return false;
        }
    }

    function isSessionObject(value) {
        return isJsonWithProperty(value, "_csIsSession");
    }

    function isExpiringObject(value) {
        return isJsonWithProperty(value, "timestamp");
    }

    this.getRawByKey = function(key) {
        var rawValue = getValueFromStorage(key);

        // check if this is an "expiring" variable:
        if (isExpiringObject(rawValue)) {
            var obj = JSON.parse(rawValue);
            if (new Date().getTime() > obj.timestamp) { // expired item
                rawValue = undefined;
                this.removeItem(key); // object is no longer valid.
            }
        }
        return rawValue;
    };

    this.getByKey = function(key) {
        var value = this.getRawByKey(key);
        if( isJsonWithProperty(value, "value") ) { // this is a JSON, extract the value
            var obj = JSON.parse(value);
            value=obj.value;
        }
        return value;
    };

    this.getAllRaw = function() {
        var value = {};
        for (var key in localStorage) {
            var entry = this.getRawByKey(key);
            if (typeof (entry) !== "undefined") {
                value[key] = this.getRawByKey(key);
            }
        }
        value = JSON.stringify(value);
        return value;
    };

}


var Duration = function(seconds){
    this.totalSeconds = seconds;
};
Duration.minutes = function(minutes) { return new Duration(minutes * 60);};
Duration.days = function(days){return Duration.minutes(60 * 24 * days);};


"use strict";
/*jshint undef: false */

var Observer = {

	_callbacks: {},

	trigger: function (/* String */ topic /* ... args */) {
		var subs = this._callbacks[topic.toLowerCase()],
			len = subs ? subs.length : 0;
		Array.prototype.shift.call(arguments);
		//can change loop or reverse array if the order matters
		while (len--) {
			subs[len].apply(this, arguments || []);
		}
		return this;
	},

	on: function (/* String */ topic, /* Function */ callback) {
		var storedName = topic.toLowerCase();
		var arr = this._callbacks[storedName];
		if (arr) {
			arr.push(callback);
		} else {
			this._callbacks[storedName] = [callback];
		}
		return this;
	},

	once: function (/* String */ topic, /* Function */ callback) {
		var scope = this;
		var storedName = topic.toLowerCase();
		var fn = function(){
			scope.off(storedName, fn);
			callback();
		};
		this.on(storedName, fn);
		return this;
	},

	off: function (/* String */ topic, /* Function? */ callback) {
		var storedName = topic.toLowerCase();
		if (!callback) {
			this._callbacks[storedName] = [];
		} else {
			var subs = this._callbacks[storedName];
			var len = subs ? subs.length : 0;
			while (len--) {
				if (subs[len] === callback) {
					subs.splice(len, 1);
				}
			}
		}
		return this;
	}

};



languageMgr = initLanguageMgr(languagePack, defaultLanguagePack);

function navigateTo(url) {
    setTimeout(function(){
        window.location = url;
    }, 300); // delay to allow tracking to report event

}
/**
 * Exports a function so it can be called from outside the Toolbar code
 * @param func
 */
function exportFunc(func, funcName) {
	// - Can't use func.name, because of minification
	window.__csGlobal__ = window.__csGlobal__ || {};
	window.__csGlobal__[funcName] = func;
}

/**
 * Exports an API functions so users can interact and influence our campaigns from outside
 * @param func
 */
function exportExternalApiFunc(func, funcName) {
    // - Can't use func.name, because of minification
    window.csGlobalApi = window.csGlobalApi || {};
    window.csGlobalApi[funcName] = func;
}


function getQueryStringParameterByName(name) {
    if (!name) {
        return null;
    }

    try {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]").toLowerCase();
        var searchLocation = location.search;
        if (searchLocation) {
            searchLocation = searchLocation.toLowerCase();
        }

        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
        var results = regex.exec(searchLocation);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    } catch (e) {
        logError("Failed to get parameter from query-string by name " + name, e);
        return null;
    }
}

function goToPage(targetPage, openNewWindow) {
	if (openNewWindow) {
		window.open(targetPage);
	} else {
        navigateTo(targetPage);
	}
}

// http://cherne.net/brian/resources/jquery.hoverIntent.html
function trackHoverIntent(element, handlerIn, handlerOut, selector) {

    // default configuration values
    var cfg = {
        interval: 300,
        sensitivity: 7,
        timeout: 500
    };

    if ( typeof handlerIn === "object" ) {
        cfg = extend(cfg, handlerIn );
    } else if (jq.isFunction(handlerOut)) {
        cfg = extend(cfg, { over: handlerIn, out: handlerOut, selector: selector } );
    } else {
        cfg = extend(cfg, { over: handlerIn, out: handlerIn, selector: handlerOut } );
    }

    // instantiate variables
    // cX, cY = current X and Y position of mouse, updated by mousemove event
    // pX, pY = previous X and Y position of mouse, set by mouseover and polling interval
    var cX, cY, pX, pY;

    // A private function for getting mouse position
    var track = function(ev) {
        cX = ev.pageX;
        cY = ev.pageY;
    };

    // A private function for comparing current and previous mouse position
    var compare = function(ev,ob) {
        ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
        // compare mouse positions to see if they've crossed the threshold
        if ( ( Math.abs(pX-cX) + Math.abs(pY-cY) ) < cfg.sensitivity ) {
            jq(ob).off("mousemove.hoverIntent",track);
            // set hoverIntent state to true (so mouseOut can be called)
            ob.hoverIntent_s = 1;
            return cfg.over.apply(ob,[ev]);
        } else {
            // set previous coordinates for next time
            pX = cX; pY = cY;
            // use self-calling timeout, guarantees intervals are spaced out properly (avoids JavaScript timer bugs)
            ob.hoverIntent_t = setTimeout( function(){compare(ev, ob);} , cfg.interval );
        }
    };

    // A private function for delaying the mouseOut function
    var delay = function(ev,ob) {
        ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
        ob.hoverIntent_s = 0;
        return cfg.out.apply(ob,[ev]);
    };

    // A private function for handling mouse 'hovering'
    var handleHover = function(e) {
        // copy objects to be passed into t (required for event object to be passed in IE)
        var ev = extend({},e);
        var ob = element;

        // cancel hoverIntent timer if it exists
        if (ob.hoverIntent_t) { ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t); }

        // if e.type == "mouseenter"
        if (e.type == "mouseenter") {
            // set "previous" X and Y position based on initial entry point
            pX = ev.pageX; pY = ev.pageY;
            // update "current" X and Y position based on mousemove
            jq(ob).on("mousemove.hoverIntent",track);
            // start polling interval (self-calling timeout) to compare mouse coordinates over time
            if (ob.hoverIntent_s != 1) { ob.hoverIntent_t = setTimeout( function(){compare(ev,ob);} , cfg.interval );}

            // else e.type == "mouseleave"
        } else {
            // unbind expensive mousemove event
            jq(ob).off("mousemove.hoverIntent",track);
            // if hoverIntent state is true, then call the mouseOut function after the specified delay
            if (ob.hoverIntent_s == 1) { ob.hoverIntent_t = setTimeout( function(){delay(ev,ob);} , cfg.timeout );}
        }
    };

    // listen for mouseenter and mouseleave
    return element.on({'mouseenter.hoverIntent':handleHover,'mouseleave.hoverIntent':handleHover}, cfg.selector);
}

function interpret(s) {
	/*jshint evil: true*/
	//eval(s); <-- even worse practice
	try {
		var f = new Function(s);
		f();
	}
	catch (err) {
		//graceful error handling in the case of malformed code
	}
}

// will return the current page name (lower-case), without extension, e.g cart
function getCurrentPageName() {
	var pathName = window.location.pathname;
	var extractName = function extractName(path) {
		return path.indexOf("/") == -1 ? path : path.substring(path.lastIndexOf('/') + 1);
	};
	var pageName = extractName(pathName);
	if (pageName==="") {
		if (pathName.lastIndexOf("/")==pathName.length-1) {
			pageName = extractName(pathName.substring(0, pathName.lastIndexOf("/")));
		}
	}
	return pageName.indexOf(".") == -1 ? pageName.toLowerCase() : pageName.substring(0, pageName.indexOf(".")).toLowerCase();
}

// Return true if the page matches the url mask, and the css selector
function findWithUrlMaskAndSelectors(urlMask, selector) {
	// sanity check to make sure at least one of urlMask and selector are defined
	if (!urlMask && !selector) {
		return false;
	}
	if (urlMask && document.location.href.indexOf(urlMask) == -1) {
		return false;
	}

	if (isNullOrUndefinedOrEmpty(selector)) {
		return true;
	}

	return jq(selector).length > 0;
}

function findElementsBySelectorArray(elementSelList) {
    if (elementSelList === null) {
        return null;
    }

	for (var i = 0; i < elementSelList.length; ++i) {
		var elements = jq(elementSelList[i]);
		if (elements.length > 0) {
			return elements;
		}
	}
	return null;
}

function getURLParameter(name) {
    return decodeURIComponent(
        (RegExp('[?|&]' + name + '=' + '(.+?)(&|$)').exec(location.search)||[null,null])[1]
    );
}

function serializeObjectAsUrlParam(obj) {
    // http://stackoverflow.com/a/6566471/11236
    var str = "";
    for (var key in obj) {
        if (str !== "") {
            str += "&";
        }
        //noinspection JSUnfilteredForInLoop
        str += key + "=" + obj[key];
    }
    return str;
}

//http://phpjs.org/functions/base64_encode/
function base64_encode(data, urlSafeMode) {
    var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    if (urlSafeMode) {
        b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789~-_";
    }
    var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
        ac = 0,
        enc = "",
        tmp_arr = [];

    if (!data) {
        return data;
    }

    do { // pack three octets into four hexets
        o1 = data.charCodeAt(i++);
        o2 = data.charCodeAt(i++);
        o3 = data.charCodeAt(i++);

        bits = o1 << 16 | o2 << 8 | o3;

        h1 = bits >> 18 & 0x3f;
        h2 = bits >> 12 & 0x3f;
        h3 = bits >> 6 & 0x3f;
        h4 = bits & 0x3f;

        // use hexets to index into b64, and append result to encoded string
        tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
    } while (i < data.length);

    enc = tmp_arr.join('');

    var r = data.length % 3;

    return (r ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3);
}

//http://phpjs.org/functions/base64_decode/
function base64_decode(data, urlSafeMode) {
    var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    if (urlSafeMode) {
        b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789~-_";
    }
    var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
        ac = 0,
        dec = "",
        tmp_arr = [];

    if (!data) {
        return data;
    }

    data += '';

    do { // unpack four hexets into three octets using index points in b64
        h1 = b64.indexOf(data.charAt(i++));
        h2 = b64.indexOf(data.charAt(i++));
        h3 = b64.indexOf(data.charAt(i++));
        h4 = b64.indexOf(data.charAt(i++));

        bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;

        o1 = bits >> 16 & 0xff;
        o2 = bits >> 8 & 0xff;
        o3 = bits & 0xff;

        if (h3 == 64) {
            tmp_arr[ac++] = String.fromCharCode(o1);
        } else if (h4 == 64) {
            tmp_arr[ac++] = String.fromCharCode(o1, o2);
        } else {
            tmp_arr[ac++] = String.fromCharCode(o1, o2, o3);
        }
    } while (i < data.length);

    dec = tmp_arr.join('');
    return dec;
}

function fillScreenSize(obj) {
    try {
        obj.screenH = window.screen.availHeight;
        obj.screenW = window.screen.availWidth;
    } catch (e) {
        logError("Failed to extract screen size", e);
    }
}

function extractReferrerAsExtraData() {
    try {
        var referrerSearchQuery = findReferrerSearchQuery();
        var uri = parseUri(document.referrer);
        var result = {
            dataType : "referrer",
            host : encodeURIComponent(uri.host),
            rawReferrer : encodeURIComponent(document.referrer)
        };
        if (referrerSearchQuery) {
            result.searchQuery = encodeURIComponent(referrerSearchQuery);
        }
        return result;
    } catch (e) {
        logError("unable to extract referrer: " + document.referrer, e);
        return {};
    }
}

function getCurrentURL() {
	return window.location.href;
}


// Check if n is a number
// http://stackoverflow.com/questions/18082/validate-numbers-in-javascript-isnumeric/1830844#1830844
function isNumber(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}

function shouldPassInformationToOtherDomain() {
    return secondDomainToPassDataUrl && secondDomainToPassDataUrl.indexOf(ignoreKnownSubDomains(document.domain)) === -1;
}

function passInformationToOtherDomain(id, data, specificUrl) {
	var checkoutIFrame = document.createElement("iframe");
	checkoutIFrame.setAttribute('id', id);
	checkoutIFrame.setAttribute('style', 'display:none');
	document.body.appendChild(checkoutIFrame);

	if (!specificUrl) {
		specificUrl = secondDomainToPassDataUrl;
	}

	checkoutIFrame.setAttribute('src', specificUrl + data);
	var cb = function(ev) {
		if (ev.origin === 'http://lib.store.yahoo.net') {
			if (ev.data && ev.data.indexOf("cookies_not_set")>-1) {
				var fields = {};
				fields[WAF_error] = ev.data;
				Tracker.triggerEvent(WAE_error, fields);
			}
		}
	};
	if (window.addEventListener) {
		window.addEventListener('message', cb, false);
	} else if (window.attachEvent) {
		window.attachEvent('message', cb);
	}
}

/* toolbar initialization and state control functions */

/* which toolbar version to present */
/* returns true if toolbar staged version found - and toolbar should be shown */
function checkToolbarCookie() {
	var cookieId = ckie_staging_cookie;
	if (hasUrlParam(forceHiddenFlag)) {
		clearCookie(cookieId);
		return false;
	}

	var stagingCookie = getCookie(cookieId);
	if (stagingCookie !== null) {
		return true;
	} else if (hasUrlParam(forceShowFlag)) {
		setCookie(cookieId, "current-version");
		return true;
	}
	return false;
}

// These are called after writing the toolbar to the DOM.
var postWriteToolbarEvents = [];

// Correct a url's protocol prefix (http/https) according to the document's protocol.
// If given a non-secure and a secure URL, return the one that matches the document's protocol.
function getCorrectUrlProtocol(url, secureUrl /*optional*/) {
    if (!url) {
        return url;
    }
	if (url.indexOf("//")===0) {
		return url;
	}
	// If we are in a secure domain and have a secureUrl, just return that.
	if (document.location.protocol==="https:" && secureUrl) {
        return secureUrl;
	}

    // do not "downgrade" existing https url to http (might be invalid without https).
    if (url.indexOf("https://") !== -1) {
        return url;
    }

	// Otherwise, remove previous protocol and append the correct one to url.

	url = url.replace(/https?:\x2F\x2F/i, "");
	return ((document.location.protocol == "https:") ? "https://" : "http://") + url;
}
// Change protocol from http to https for POST search on an https page.
// (e.g. our current page is https://lala.com, our search url is http://lala.com?q, and our method is POST. change searchurl to https://lala.com?q)
function fixSearchUrlProtocol(searchUrl, searchMethod) {
	if (searchUrl && searchMethod && fixSearchUrlProtocolEnabled) {
		if (document.location.protocol==="https:" && searchUrl.indexOf("http:")!==-1 && searchMethod.toLowerCase()==="post") {
			searchUrl = searchUrl.replace(/https?:\x2F\x2F/i, "");
			return "https://" + searchUrl;
		}
	}
	return searchUrl;
}

function detectUserBounce(handler) {

	var lastTime = new Date().getTime();
	var lastTriggerTime = -1;

	var bouncedTimeout = 0;
	var lastTimeDiff;
	var lastY;
	var lastX;
	var lastXSpeed;
	var lastYSpeed;
	var functionUsed = "";
	var maxBounceDelay = 35;
	var minSpeedToDeclareBounce = 2.5;
	var distanceFromEdge = 5;	// if next y is within this value or lower, declare a bounce
	if (bounceSensitivity>1) {
		maxBounceDelay = 0;
		minSpeedToDeclareBounce = 0;
	}
	if (bounceSensitivity>2) {
		distanceFromEdge = 15;
	}
	jq('html').mousemove(function(event) {
		try {
			if (bouncedTimeout) {
				clearTimeout(bouncedTimeout);
				bouncedTimeout = 0;
			}
			var mouseY = event.clientY;
			var mouseX = event.clientX;
			var now = new Date().getTime();
			var timeDiff = now - lastTime;
			if (timeDiff===0) {
				timeDiff = 1;
			}
			var nextMouseY = 1;
			var ySpeed;
			var xSpeed;
			if (lastY!==undefined && lastTimeDiff!==undefined) {
				var currentYDiff = mouseY - lastY;
				var currentXDiff = mouseX - lastX;
				// case 1:	Too much time elapsed since mouse move, can't rely on y delta to calculate velocity.
				//			Just take the current motion trend and move towards the same direction
				if (timeDiff>30) {
					if (currentYDiff===0) {
						ySpeed = 0;
					} else {
						ySpeed = (currentYDiff>0? 5: -5);
					}
					functionUsed = "a";
					lastYSpeed = undefined;
					lastXSpeed = undefined;
				} else {
					// case 2: 	Normal, continuous mouse movement
					//			Dampen the prediction by using the smallest of the last two time diffs.
					//			If there was a large time gap in this sampling, using the last sampling as a dampener
					//			usually prevents out-of-hand results.
					var smallestTD = Math.min(timeDiff, lastTimeDiff);
					ySpeed = (currentYDiff/timeDiff) * smallestTD;
					xSpeed = (currentXDiff/timeDiff) * smallestTD;
					functionUsed = "b";

				}
			}
			nextMouseY = mouseY+ySpeed;
			lastYSpeed = ySpeed;
			lastXSpeed = xSpeed;
			lastTime = now;
			lastTimeDiff = timeDiff;
			lastY = mouseY;
			lastX = mouseX;
			if (nextMouseY<=distanceFromEdge && Math.abs(ySpeed)>=minSpeedToDeclareBounce) {
				// Allow some milliseconds for the mouse to return to screen before announcing bounce
				// This should reduce edge cases where the mouse moved only momentarily outside
				// but is not really an intentional bounce.
				var bounceTime = Math.floor(Math.min(Math.max(timeDiff+5, lastTimeDiff+5), maxBounceDelay));
				bouncedTimeout = setTimeout(function() {
					var mouseData = {
								currentYDiff: currentYDiff,
								currentXDiff: currentXDiff,
								mouseY: mouseY,
								mouseX: mouseX,
								nextMouseY: nextMouseY,
								timeDiff: timeDiff,
								functionUsed: functionUsed,
								lastTimeDiff: lastTimeDiff,
								ySpeed: ySpeed,
								xSpeed: xSpeed,
								lastYSpeed: lastYSpeed,
								lastXSpeed: lastXSpeed
					};
					var timeSinceLastTrigger = now - lastTriggerTime;
					if (timeSinceLastTrigger < 500) {
						logDebug("Time since last trigger < 500 = " + timeSinceLastTrigger);
						return;
					}
					lastTriggerTime = now;
					handler(mouseData);
					}, bounceTime
				);
			}
		} catch (e) {
			logError("Error handling abandoned user", e);
		}
	});
}

var mouseActiveTimeoutID;
var mouseActiveTimeoutWait = 8000;
function mouseActiveTimeoutCB() {
	isMouseActive = false;
	mouseActiveTimeoutID = 0;
}
function listenToScrolls(sendEvents) {
    var $window = jq(window);
    // Adapted from: http://bassta.bg/2013/05/get-page-scrolling-percentage/
    var _calculateScrollPct = function() {
        var documentHeight = jq(document).height();
        var windowHeight = $window.height();
        var scrollTop = $window.scrollTop();
        var scrollPercent = parseInt(((scrollTop) / (documentHeight - windowHeight) * 100), 10);
        UserContext.setContext("context.scroll.percentage", scrollPercent);
    };
    $window.scroll(_calculateScrollPct);
    $window.resize(_calculateScrollPct);
    _calculateScrollPct();
}
function listenToMouseMoves(sendEvents) {
	var mouseMoving = false;
	var timeToWaitForStop = 2000;
	var waitTimeoutID = 0;
	var startX;
	var startY;
	var lastX;
	var lastY;
	var distanceX = 0;
	var distanceY = 0;
	var mouseDistanceToStart = 512;
	var waitTimeoutCB = function() {
		mouseMoving = false;
		if (sendEvents) {
			var distance = Math.round(Math.sqrt(distanceX*distanceX + distanceY*distanceY));
//			Tracker.triggerEvent(tbGAUserAction, tbGAMouseMovementEnded, {}, "distance:"+distance, "");
		}
		startX = undefined;
		startY = undefined;
		distanceX = 0;
		distanceY = 0;
	};
	jq('html').mousemove(function(event) {
		if (!mouseMoving && startX) {
			var dx = (event.clientX-startX);
			var dy = (event.clientY-startY);
			var distance = dx*dx + dy*dy;
			if (distance>=mouseDistanceToStart) {
				if (sendEvents) {
//					Tracker.triggerEvent(tbGAUserAction, tbGAMouseMovementStarted, {}, "", "");
				}
				mouseMoving = true;
				isMouseActive = true;
			}
		}
		if (mouseActiveTimeoutID) {
			clearTimeout(mouseActiveTimeoutID);
		}
		if (waitTimeoutID) {
			clearTimeout(waitTimeoutID);
		}
		if (mouseMoving) {
			mouseActiveTimeoutID = setTimeout(mouseActiveTimeoutCB, mouseActiveTimeoutWait);
			waitTimeoutID = setTimeout(waitTimeoutCB, timeToWaitForStop);
			if (lastX) {
				distanceX += Math.abs(lastX-event.clientX);
				distanceY += Math.abs(lastY-event.clientY);
			}
		}
		if (startX===undefined) {
			startX = event.clientX;
			startY = event.clientY;
		}
		lastX = event.clientX;
		lastY = event.clientY;
	});
}
function listenToPageFocus() {
	// Implementation adapted from:
	// http://stackoverflow.com/a/1060034/192550
	var hidden = "hidden";
	var v = 'visible';
	var h = 'hidden';
	var evtMap = {
		focus:v, focusin:v, pageshow:v, blur:h, focusout:h, pagehide:h
	};
	var onchange = function onFocusChange(ev) {
		ev = ev || window.event;
		var visibility;
		if (ev.type in evtMap) {
			visibility = evtMap[ev.type];
		}
		else {
			visibility = this[hidden] ? "hidden" : "visible";
		}
		isPageFocused = visibility!=="hidden";
		//Tracker.triggerEvent(tbGAUserAction, visibility==="hidden"?tbGAPageLostFocus:tbGAPageGotFocus, {}, "", "");
	};
	// Standards:
	if (hidden in document) 						document.addEventListener("visibilitychange", onchange);
	else if ((hidden = "mozHidden") in document) 	document.addEventListener("mozvisibilitychange", onchange);
	else if ((hidden = "webkitHidden") in document) document.addEventListener("webkitvisibilitychange", onchange);
	else if ((hidden = "msHidden") in document) 	document.addEventListener("msvisibilitychange", onchange);
	// IE 9 and lower:
	else if ('onfocusin' in document)				document.onfocusin = document.onfocusout = onchange;
	// All others:
	else window.onpageshow = window.onpagehide = window.onfocus = window.onblur = onchange;
}
runAfterBootstrap(function(){
	listenToPageFocus();
	var sendEvents = false;
	if (triggerMouseEventsUntilDate) {
		var today = new Date();
		var listenUntil = new Date(triggerMouseEventsUntilDate);
		sendEvents = today<=listenUntil;
	}
	listenToMouseMoves(sendEvents);
	listenToScrolls(sendEvents);
	if (triggerBounceEvents===true) {
		detectUserBounce(function(mouseData){
			// Add some more data
			mouseData.portHeight = jq(window).height();
			mouseData.portWidth = jq(window).width();
			var str = jq.param(mouseData);
			//Tracker.triggerEvent(tbGAUserAction, tbGAAbandonSite, {}, str, "");
			UserContext.setContext("context.flag.abandon", true, false);
		});
	}
});



function csEmailRegjsonp(data) {
    try {
        logDebug('email reg status: ' + JSON.stringify(data));
//        Tracker.reportEvent(tbGAUserAction, tbGANewsletterEmailSubscribedSuccessfully);
    } catch (e) {
        // nothing to do with it.
    }
}
exportFunc(csEmailRegjsonp, "csEmailRegjsonp");

function buildCSNewsletterUrl(fieldValues) {
	var valuesString = JSON.stringify(fieldValues);
    var url = newsletterSignupUrl + "?";
    url += "ver=2";
    url += "&cid=" + clientId;
    url += "&em=" + base64_encode(valuesString);
    if (geoRequired && geo && geo.locationObj) {
        if (typeof(geo.locationObj.city) != "undefined") {
            url += "&city=" + geo.locationObj.city;
        }
        if (typeof(geo.locationObj.country) != "undefined") {
            url += "&country=" + geo.locationObj.country;
        }
    }

    return url;
}


function csNewsletterSignup(fieldValues) {
    if (shouldSendCSNewsletterSignup) {
        // report to our server
        var csNewsletterUrl = buildCSNewsletterUrl(fieldValues);
        var callbackJsMethod = "__csGlobal__['csEmailRegjsonp']";
        add_script(csNewsletterUrl+"&callback="+callbackJsMethod, function () {
            logDebug("exit-targeting script was loaded");
        });
    }
}

function customNewsletterSignup(fieldValues) {

}

function getRandomSlot(slots) {
    var sum = 0;
    var rand = randomFloat(100);
    for (var i=0; i<slots.length; i++) {
        var slot = slots[i];
        sum += parseInt(slot.percent,10);
        if (rand<=sum) {
            return slot;
        }
    }
    return "na";
}

function randomFloat(top) {
    return Math.random() * top;
}




var UserContext = new function() {
	extend(this, Observer);
	this.providerName = "context";
	var changeTimeout;
	var context = {};
	var promises = {};
	var that = this;
    var initCompleted = false;

	this.setContext = function(name, value, persist) {
		if (isRunningInIFrame()) return;
		var parts = getContextNameParts(name);
		if (!parts) return;
		if (persist===undefined) {
			persist = parts.domain==="user" || parts.domain==="session";
		}
		if (!context.hasOwnProperty(parts.domain)) { context[parts.domain] = {}; }
		context[parts.domain][parts.key] = value;
		var persistent = parts.domain==="user";
		if (persist) {
			contextStorage.setItem(name, value, persistent);
		}
		if (promises.hasOwnProperty(name)) {
			while (promises[name].length) {
				var promise = promises[name].pop();
				if (typeof(promise)==="function") {
					promise.apply(this);
				}
			}
		}
		if (!changeTimeout) {
			changeTimeout = setTimeout(function() {
				UserContext.trigger("contextChange", that);
				changeTimeout = undefined;
			}, 0);
		}
	};
	/* 	Shortcut to set context variables related to url.
		Example:
		setUrlContext("context.session.landingPage", full_url) will create 3 entries:
		context.session.landingPage.url
	 	context.session.landingPage.search
	 	context.session.landingPage.params
	 */

	this.setUrlContext = function(name, value, persist) {
		this.setContext(name+".url", value, persist);
		this.setContext(name+".search", findSearchQuery(value, false), persist);
		// extract url params
		var valueArr = value.split("?");
		var queryOnly = [];
		if (valueArr.length>0) {
			// Just take the entire string after the first '?'
			valueArr.shift();
			var rightSide = valueArr.join("?");
			// remove hash
			queryOnly = rightSide.split("#")[0].split("&");
		}
		this.setContext(name+".params", queryOnly, persist);
	};

	this.getContext = function(name) {
		name = getContextNameParts(name);
		if (!name) return null;
		if (!context.hasOwnProperty(name.domain)) { return null; }
		var result = context[name.domain][name.key];
		if (name.domain==="flag") {
			setTimeout(function() {
				context[name.domain][name.key] = !context[name.domain][name.key];
			}, 0);
		}

		return result;
	};

	this.getProviderName = function() {
		return this.providerName;
	};

	this.getValue = this.getContext;

	this.getValuePromise = function(name) {
		var parts = getContextNameParts(name);
		if (!parts) return function(){};
		var value = that.getValue(name);
		var then;
		if (value) {
			then = function(cb) {
				cb();
			};
		} else {
			if (!promises.hasOwnProperty(name)) {
				promises[name] = [];
			}
			then = function(cb) {
				promises[name].push(cb);
			};
		}
		return {
			then: then
		};
	};

	this.reset = function() {
		context = {};
		contextStorage.unsetDomain(UserContext.getProviderName());
	};

	this.touch = function() {
		this.setContext("context.dummy.touch", true);
	};

	var getContextNameParts = function(name) {
		var parts = name.split(".");
		if (parts[0]!==that.getProviderName() || parts.length<3) return null;
		var result = {};
		parts.shift();	// get rid of provider name
		result.domain = parts.shift();
		result.key = parts.join(".");
		return result;
	};

	var isIFrameOnPage = function(){
		var allFrames = document.getElementsByTagName("iframe");
		var target;
		for(var i = 0, max = allFrames.length; i < max; i++){
			if (allFrames[i].src === "https://app.cdn-cs.com/iframe.html"){
				target = allFrames[i];
				break;
			}
		}
		return target;
	};

	this.init = function() {
		if (isRunningInIFrame()) return;
		if (!urlParams.csIgnoreIframe) {
			setTimeout(function() {
				// start with reporting us an error when user context is not initialized after X seconds.
				// need to think what can be done in such scenario.
				if (!that.initCompleted && !devMode) {
					var iFrameExists = isIFrameOnPage();
                    var errorMessage;
					if(!iFrameExists){
                        errorMessage = "It seems that the user context was not initialized (iFrame not on page).";
					}
					else{
                        errorMessage = "It seems that the user context was not initialized (iFrame on page).";
					}
                    logError(errorMessage, null, ERROR_USER_CONTEXT_NOT_INITIALIZED);
				}
			}, 5000);
		}

		contextStorage.onCacheReady().then(function(cache) {
			try {
				for (var k in cache) {
					if (!that.getValue(k)) {
						that.setContext(k, cache[k], false);
					}
				}

                that.initCompleted = true;
            }catch(e) {
				logError("Failed loading userContext:" + e.name + ", details: " + e.message, e);
			}
		});
	};
};
if (devMode) {
	exportFunc(UserContext, "userContext");
}


/**
 * Created by Eyal on 16/01/2016.
 */


var UrlFilter = new function() {

    var trim = function (str) {
        if (typeof str === 'string') {
            return str.trim ? str.trim() : str.replace(/^\s+|\s+$/gm,'') ;
        } else {
            return "";
        }
    };

    var parser = (function () {
        function parseUri(str) {
            var o = parseUri.options,
                m = o.parser[o.strictMode ? "strict" : "loose"].exec(str),
                uri = {},
                i = 14;

            while (i--) uri[o.key[i]] = m[i] || "";

            uri[o.q.name] = {};
            uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
                if ($1) uri[o.q.name][$1] = $2;
            });

            return uri;
        }

        parseUri.options = {
            strictMode: false,
            key: ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"],
            q: {
                name: "queryKey",
                parser: /(?:^|&)([^&=]*)=?([^&]*)/g
            },
            parser: {
                strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
                loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
            }
        };
        return parseUri;
    })();

    // strip trailing slash
    var stripSlash = function (__url) {
        if (__url[__url.length - 1] === "/") {
            __url = __url.split("/");
            __url.pop();
            __url = __url.join("/");
        }
        return __url;
    };

    var matchSingleItem = function(_url, itemToMatch, matchMode) {
        try {
            var found,pos;
            _url = trim(_url).toLowerCase() ;
            itemToMatch = trim(itemToMatch).toLowerCase() ;
            if (matchMode === "exact-match") { // no processing on matched items if exact match required
                return _url == itemToMatch;
            }

            switch (matchMode) {
                case "page-match":
                    // check only host and URI path
                    var urlParsed = parser(_url);
                    var matcherParsed = parser(itemToMatch);
                    // ignore missing trailing slash at end of URL
                    urlParsed.path = stripSlash(urlParsed.path);
                    matcherParsed.path = stripSlash(matcherParsed.path);
                    return urlParsed.host === matcherParsed.host && urlParsed.path === matcherParsed.path;

                case "is":
                case "is-not":
                    // strip http/https
                    if (_url.indexOf("//") > -1) {
                        _url = _url.split("//")[1];
                    }
                    if (itemToMatch.indexOf("//") > -1) {
                        itemToMatch = itemToMatch.split("//")[1];
                    }
                    // if the filtering string starts with www., add it so it'll match if needed
                    if (itemToMatch.indexOf("www.") === 0 && _url.indexOf("www.") === -1) {
                        _url = "www." + _url;
                    } else
                    // or, strip it if the matcher doesn't have it.
                    if (itemToMatch.indexOf("www.") === -1 && _url.indexOf("www.") === 0) {
                        _url = _url.split("www.")[1];
                    }
                    _url = stripSlash(_url);
                    itemToMatch = stripSlash(itemToMatch);
                    return _url === itemToMatch;

                case "url-contains":
                case "url-not-contains":
                    // check single item - check "contains" only - the logic of 'not' is in the caller
                    // note empty string should not match any URL
                    return itemToMatch.length > 0 && _url.indexOf(itemToMatch) !== -1;

                case "anywhere":
                case "always":
                    // don't filter
                    return false;
            }
        } catch (e) {
            logError("Error while attempting to determine if current URL is filtered");
            // we return null because this will cause the admin to re-ask for filtering. the widget itself will treat null as true(filtered)
            return null;
        }
    };

    this.isUrlFiltered = function (url, filterObj) {
        if (!filterObj) return;

        if (!filterObj.matcher) {
            filterObj.matcher = "";
        }

        filterObj.matchers = filterObj.matcher.split(",");
        var i;
        switch (filterObj.mode) {
            case "exact-match":
            case "page-match":
            case "is":
            case "url-contains":
                // inclusive matchers - enough to match one of the matchers in list
                for (i = 0; i < filterObj.matchers.length; i++) {
                    if (matchSingleItem(url, filterObj.matchers[i], filterObj.mode)) {
                        return false;  // a match here means we don't filter
                    }
                }
                return true;

            case "is-not":
            case "url-not-contains":
                // exclusive matchers - must not match any of the matchers in list
                var matched = false;
                for (i = 0; i < filterObj.matchers.length; i++) {
                    if (matchSingleItem(url, filterObj.matchers[i], filterObj.mode)) {
                        return true;   // a match to a single element means we filter
                    }
                }
                return false;

            case "anywhere":
            case "always":
                return false;  // if anywhere allowed - don't filter
        }

    };

    exportFunc(function (url, filterObj) {
            if (!devMode) return true;
            return this.isUrlFiltered(url, filterObj);
        }.bind(this),
        "isUrlFiltered"
    );

};

var DisplayerController = new function() {
	var campaigns = {};
	var that = this;

	var localStorageReady = false;

    this.persistenceDomain = "displayerController";

    this.getCampaignIdForVariant = function(variantId) {
        var variant = Campaigns.getVariant(variantId);
        if (variant) {
            return variant.campaignId;
        }
        return null;
    };

	this.setupCampaigns = function(campaignsConfig) {
		if (isRunningInIFrame()) return;
		for (var i=0; i<campaignsConfig.length; i++) {
			var campaign = campaignsConfig[i];
			this.setupCampaign(campaign);
		}
        this.clearOldGlobalChosenVariantCookie();
		contextStorage.onCacheReady().then(function(cache) {
            csquery(function() {  // EB / execute only once page is ready, i.e. campaign vairants have been registered.
                localStorageReady = true;
                loadPersistentDisplayer();
                loadTogglingDisplayer();
                executePendingExperiences(cache);
                // EB - touch the context one more time after all page and context events to evaluate all the rules again
                // not to miss any campaign that didn't trigger because the context was ready before the campaigns setup finished
                setTimeout( function() {
                    UserContext.touch();
                },0);
                // EB - cause campaigns that depend on dynamic content - like cookies or page content - to be evaluated every second once page and context completed loading
                setTimeout( function() {  // EB - temporary fix, make the timer into a timeout until can solve other bug - A/B changes are run multiple times
                    UserContext.touch();
                },1000);

            });
		});
	};

    this.getCampaignIds = function() {
        var collect = [];
        for (var i in campaigns){
            if (campaigns.hasOwnProperty(i)){
                collect.push(campaigns[i].id);
            }
        }
        return collect;
    };

    this.getCampaign = function(id) {
        if (typeof id == "string" && id.length > 0 && campaigns.hasOwnProperty(id)) {
            return campaigns[id];
        } else {
            return null;
        }
    };

    this.chooseVariant = function(campaignId) {
        var campaign = campaigns[campaignId];
        var chosenVariantId = getExperienceChosenVariantId(campaign.id);
        var url = window.location.href.toLowerCase();
        var noControlFlag = url.indexOf("csmode=nocontrol")>-1;
        var csVariant = urlParams.csvariant;
        if (csVariant) {
            if (csVariant.toLowerCase() === "nocontrol") {
                noControlFlag = true;
            } else if (csVariant.toLowerCase() === "forcecontrol") {
                chosenVariantId = Campaigns.getControlVariantIdForCampaign(campaignId);
            } else {
                chosenVariantId = csVariant;
            }
        }
        // If we don't have a stored variant, or the stored variant is defunct (i.e., it's no longer in the configuration [e.g. the user deleted the variant?])
        if (!chosenVariantId || !campaign.variantsConfig.hasOwnProperty(chosenVariantId)) {
            var done = true;
            // if we have a no control flag, repeat until we select a non-control
            if (window.__csGlobal__.noControlVariant || noControlFlag) {
                done = false;
            }
            var rescue = 10;
            do {
                chosenVariantId = getRandomSlot(campaign.variants).id;
                if (campaign.variantsConfig[chosenVariantId].displayer!=="control") {
                    done = true;
                }
                if (--rescue<=0) {
                    done = true;
                }
            }while(done===false);
        }
        storeExperienceChosenVariantId(campaign.id, chosenVariantId);
        return campaign.variantsConfig[chosenVariantId];
    };

    // since there is a limit in the size and amount of the cookies, we want to stop storing the chosen variant in a dedicated cookie (per camapaign)
    // and instead use one global cookie that will store the chosen variants in json map
    // since there are users out there with the old format cookies, need to delete (expire) them and store the chosen variants in the new global cookie
    this.clearOldChosenVariantCookie = function(campaignId) {
        var oldCookieName = "_cs."+siteId+".displayerController."+campaignId+".chosenVariantId";
        var chosenVariantId = getCookie(oldCookieName);
        if (chosenVariantId) {
            storeExperienceChosenVariantId(campaignId, chosenVariantId);
            // set the expiration to be in the past
            setCookie(oldCookieName, "DEL", null, null, "Thu, 18 Nov 2011 12:00:00 UTC");
        }
    };

    this.clearOldGlobalChosenVariantCookie = function() {
        var oldCookieName = "_cs."+siteId+".chosenVariants";
        var newCampaignToVariant = {};
        if (!campaigns || JSON.stringify(campaigns) === "{}") {
            setCookie(oldCookieName, JSON.stringify(newCampaignToVariant), persistentCookieDuration);
        } else {
            var chosenVariants = getCookie(oldCookieName);
            if (chosenVariants) {
                var campaignToVariant = {};
                try {
                    campaignToVariant = JSON.parse(chosenVariants);
                } catch(e) {}

                for (var campaignId in campaignToVariant) {
                    if (campaignId in campaigns) {
                        newCampaignToVariant[campaignId] = campaignToVariant[campaignId];
                    }
                }
                var newCookieValue = JSON.stringify(newCampaignToVariant);
                setCookie(oldCookieName, newCookieValue, persistentCookieDuration);
            }
        }
    };

    this.isEmailSubscriptionCampaignOnIphoneChrome = function (campaign) {
        function isEmailSubscriptionType(variants) {
            var isEmailSubscriptionCampaign = false;
            for (var variantId in variants) {
                if (variants.hasOwnProperty(variantId)) {
                    if (variants[variantId].experienceType === "lead") {
                        isEmailSubscriptionCampaign = true;
                        break;
                    }
                }
            }
            return isEmailSubscriptionCampaign;
        }
        // check if we currently in chrome on iPhone // CriOS is Chrome on iOS
        if (navigator.userAgent.indexOf("CriOS") > -1) {
            if (campaign.mobileSupported && campaign.displayer === "lightbox") {
                if (isEmailSubscriptionType(campaign.variantsConfig)) {
                    return true;
                }
            }
        }
        return false;
    };

	this.setupCampaign = function(campaign) {
        var that = this;
		campaigns[campaign.id] = campaign;
        Campaigns.registerCampaign(campaign.id, campaign);
        // make sure that the campaign will be evaluated/triggered on a dedicated device only
        if (!isMobile && !isHolisticEmailCampaignInvoked(campaign) && campaign.mobileSupported) {
            logDebug("Mobile campaign ("+campaign.id+") will not be evaluated/triggered on desktop device");
            campaigns[campaign.id].rejectReason = "Mobile campaign: not showing on non-mobile device" ;
            return;
        }
        if (isMobile && !campaign.mobileSupported) {
            logDebug("Desktop campaign ("+campaign.id+") will not be evaluated/triggered on mobile device");
            campaigns[campaign.id].rejectReason = "Non-mobile campaign: not showing on mobile device" ;
            return;
        }
        if (isMobile && !isMobileInWhiteList) {
            logDebug("Mobile campaign ("+campaign.id+") will not be evaluated/triggered on non-white list mobile device");
            campaigns[campaign.id].rejectReason = "Mobile campaign, but device not white-listed" ;
            return;
        }
        if (isMobile && this.isEmailSubscriptionCampaignOnIphoneChrome(campaign)) {
            logDebug("Mobile campaign ("+campaign.id+") will not be evaluated/triggered because email Subscription Mobile campaign doesn't execute in Chrome browser on Iphone device");
            campaigns[campaign.id].rejectReason = "Email Subscription Mobile campaign doesn't execute in Chrome browser on Iphone device" ;
            return;
        }
        this.clearOldChosenVariantCookie(campaign.id);

		contextStorage.onCacheReady().then(function(cache) {
			csquery(function() {
                Campaigns.createRulesEvaluatorForCampaignAndRegisterCampaignVariants(campaign);
                triggerNavigateSplitTestIfNeeded();
			});
        });
	};

	this.preloadAssets = function(objWithId) {
        var campaignId = objWithId.id;
        var campaign = campaigns[objWithId.id];
        if (!campaign) return;
        var variantId = campaign.chosenVariantId;
        var variantObj = Campaigns.getVariant(variantId);
        if (!variantObj || !variantObj.hasOwnProperty("behavior")) return;
		var templateParams = variantObj.behavior.templateParams;
		var toPreload = [];
        if (templateParams.widget && templateParams.widget.canvasType) {
            var experienceType = variantObj.behavior.experienceType;
            toPreload = Assets.preloadAssets(templateParams.widget, variantId, campaignId, experienceType);
        } else {
            for (var paramName in templateParams) {
                if (templateParams.hasOwnProperty(paramName)) {
                    if (paramName === "backgroundImage") {
                        var param = templateParams[paramName];
                        if (param.length > 0 && param.indexOf("http") === 0) {
                            toPreload.push(param);
                        }
                    }
                }
            }
        }
        jq(toPreload).each(function(){
			jq('<img/>')[0].src = this;
		});
	};

	var baseContextConstructor = function() {
		var dict = {};
		return {
			getValue: function(key) {
				return dict[key];
			},
			setValue: function(key, value) {
				dict[key] = value;
			}
		};
	};

	this.attemptBehaviorExecution = function(objWithId, satisfiedRules) {
        var campaign = campaigns[objWithId.id];
        if (!campaign) return;
        var variantId = campaign.chosenVariantId;

		//if (!variantId || !variantsMap.hasOwnProperty(variantId)) return;
		var variantObj = Campaigns.getVariant(variantId);
		if (!variantObj) return;
        // the rest of the flow expects to see the variant id as part of the objWithId
        objWithId = {id: variantId};
		var displayer;
        if (variantObj.behavior && canExecuteBehavior(variantObj.behavior, campaign, variantId)) {
			if (!localStorageReady) {
				CampaignOccurrences.persistPendingVariant(objWithId);
				return;
			}
            CampaignOccurrences.variantPending(objWithId.id);
            var shouldTriggerCampaignTriggered = true;
            if (variantObj && variantObj.behavior && variantObj.behavior) {
                displayer = variantObj.behavior.displayer;
            }
            if ((campaign.displayer === "contentChanger" || campaign.displayer === "splitter") && wasCampaignEventTriggered(ckie_contentChanger_triggered_triggered, variantObj.campaignId)) {
                    shouldTriggerCampaignTriggered = false;
            }
            if (shouldTriggerCampaignTriggered) {
                reportTriggeredCampaignEvent(WAE_campaignTriggered, objWithId, satisfiedRules);
                if (campaign.displayer === "contentChanger" || campaign.displayer === "splitter") {
                    storeCampaignEventTriggered(ckie_contentChanger_triggered_triggered, variantObj.campaignId);
                }
            }
            if (!variantObj.originalBehavior) {
                variantObj.originalBehavior = variantObj.behavior;
            }
			variantObj.behavior = replaceDynamicProperties(variantObj.behavior);
			executeBehavior(variantObj.behavior);
		} else {
			logDebug("Campaign execution aborted. id: ["+variantId+"]");
		}
	};

    var reportTriggeredCampaignEvent = function(eventName, objWithId, rules){
        var fields = buildCampaignEventParams(objWithId, rules);
        if (fields.hasOwnProperty(WAF_campaignId) && fields.hasOwnProperty(WAF_variant)) {
            Tracker.triggerEvent(eventName, fields);
        }
    };

	var buildCampaignEventParams = (function(objWithId, rules) {
        var fields = {};
		variant = Campaigns.getVariant(objWithId.id);
		if (variant) {
			fields[WAF_campaignId] = variant.campaignId;
			fields[WAF_campaignName] = campaigns[variant.campaignId].name;
			fields[WAF_variant] = objWithId.id;
			fields[WAF_variantName] = variant.behavior.label;
            if (variant.campaignId && campaigns[variant.campaignId] && campaigns[variant.campaignId].selectedGoal) {
                fields[WAF_campaignGoal] = campaigns[variant.campaignId].selectedGoal;
            }
			if (rules!==undefined) {
				fields[WAF_campaignRules] = [];
				for (var k in rules) {
					if (rules.hasOwnProperty(k)) {
						var rule = rules[k];
						fields[WAF_campaignRules].push(rule.id);
					}
				}
			}
		}
		return fields;
	}).bind(this);

	this.evaluateRules = function(contextProvider) {
        for (var c in campaigns) {
            var campaign = campaigns[c];
            if (campaign.evaluator) {
                campaign.evaluator.check(contextProvider);
            }
        }
	};

	// TODO: implement (return null when there's no next experience so bubbler knows to show minimized, otherwise return behavior configuration)
	this.getNextExperience = function() {
		return null;
	};

	function checkDynamicProperties(behavior) {
		var canExecute = true;
		for (var k in behavior.templateParams) {
			if (behavior.templateParams.hasOwnProperty(k) && typeof(behavior.templateParams[k]) === "string") {
				var dynamicProperties = extractDynamicProperties(behavior.templateParams[k]);
				for (var i = 0; i < dynamicProperties.length; i++) {
					var property = dynamicProperties[i];
					if (!dynamicPropertyTranslator(property)) {
						canExecute = false;
						break;
					}
				}
			}
		}
		return canExecute;
	}

    function isHolisticEmailCampaignInvoked(campaign) {
        if (urlParams && urlParams.hasOwnProperty("cmpn") && campaign.holisticCode) {
            if ("cmpn="+urlParams.cmpn === campaign.holisticCode) {
                return true;
            }
        }
        return false;
    }

    function reportInspectorBlockedReason(campaign,reason) {
        if (Inspector && Inspector.blockedReason){
            Inspector.blockedReason(campaign, reason);
        }
    }

    function reportInspectorShowCampaign(campaign,description) {
        if (Inspector && Inspector.campaignShown){
            Inspector.campaignShown(campaign, description);
        }
    }

	var canExecuteBehavior = function(behavior, campaign, variantId) {
		// Can't display if:
		// Bar is hidden
		// There's a suppressor URL parameter
		// if the campaign has a url filter and the current url doesn't match it
		// If the campaign doesn't support mobile, and we're on a mobile device
		// --if we're a contentChanger - we can return here as true. Otherwise->continue
		// There is an experience currently displaying/pending, the same type as the experience trying to appear
		// If we're a bubbler and there's a toggling displayer active (minimized view of some bubbler)
		// If this specific experience was already shown
		// If this experience type was shown too many times (according to the occurrence map)
		// if the displayer type was shown too many times
		// If there's a replacement rule that doesn't produce value (e.g. [[state]] but there's no geo state available)
		// If device targeting mismatch (tablet/desktop)
		var i;
		var canExecute = true;
        var campaignId = "no campaign id";
        if (campaign) {
            campaignId = campaign.id;
        }
        var holisticEmailCampaignInvoked = isHolisticEmailCampaignInvoked(campaign);
        if (!globalShowToolbar) return false;
        if (urlParams && urlParams.hasOwnProperty("cssuppress") && urlParams.cssuppress.toString()==="true") return false;
        var urlFiltered = UrlFilter.isUrlFiltered(window.location.href, campaign.urlFiltering);
        if (urlFiltered || urlFiltered===null) {
            logDebug("will not execute, reason: url filtered" + " campaign: " + campaignId + " variant " + variantId);
            reportInspectorBlockedReason(campaignId,"Blocked campaign " + campaignId + " by URL filtering");
            return false;
        }
        if (isMobile && !campaign.mobileSupported) {
            logDebug("will not execute, reason: running on mobile but mobile not supported" + " campaign: " + campaignId + " variant " + variantId);
            reportInspectorBlockedReason(campaignId,"Cannot run non-mobile campaign" +campaignId+ " on mobile");
            return false;
        }

        if (!isMobile && campaign.mobileSupported && !isHolisticEmailCampaignInvoked(campaign)) {
            logDebug("will not execute, reason: running on desktop but not desktop campaign" + " campaign: " + campaignId + " variant " + variantId);
            reportInspectorBlockedReason(campaignId,"Cannot run mobile campaign" +campaignId+ " on non-mobile");
            return false;
        }

        if (isMobile && !isMobileInWhiteList) {
            logDebug("Mobile campaign ("+campaign.id+") will not be evaluated/triggered on non-white list mobile device");
            reportInspectorBlockedReason(campaignId,"Cannot run mobile campaign" +campaignId+ " on non-white list mobile device");
            return false;
        }

        var targetDevices = campaign.deviceTargeting ? campaign.deviceTargeting : defaultDeviceTargeting; // defalt show to all
        if (isTablet && targetDevices.indexOf("tablet") == -1) { // tablet device, but tablet not in device targeting
            logDebug("will not execute, reason: tablet not in device targeting" + " campaign: " + campaignId + " variant " + variantId);
            reportInspectorBlockedReason(campaignId,"Campaign " + campaignId + " not targeted for tablets");
            return false;
        }
        if (!isTablet && !isMobile && targetDevices.indexOf("desktop") == -1) { // it's a desktop but desktop is not in device targeting
            logDebug("will not execute, reason: desktop device is not in device targeting" + " campaign: " + campaignId + " variant " + variantId);
            reportInspectorBlockedReason(campaignId,"Campaign " + campaignId + " not targeted for desktops");
            return false;
        }
        if (!CampaignOccurrences.shouldBlockCampaignIfRealEstateNotAvailable(behavior)) {
            return canExecute;
        }
        if (behavior.blockCanvasCampaign) {
            logDebug("will not execute, reason: " + behavior.blockCanvasCampaignReason);
            return false;
        }
        var blocking = CampaignOccurrences.findCampaignBlockingRealEstateForVariantInDisplaying(behavior);
        if (blocking !== false) {
            logDebug("may not execute, reason: there is currently displaying campaign" + " campaign: " + campaignId + " variant " + variantId);
            reportInspectorBlockedReason(campaignId, "Campaign " + campaignId + " blocked by displaying campaign "+ blocking);
            canExecute = false;
        }
        blocking = CampaignOccurrences.findCampaignBlockingRealEstateForVariantInPending(behavior);
        if (blocking !== false) {
            logDebug("may not execute, reason: there is currently pending campaign" + " campaign: " + campaignId + " variant " + variantId);
            reportInspectorBlockedReason(campaignId, "Campaign " + campaignId + " blocked by pending campaign "+ blocking);
            canExecute = false;
        }

        if (Campaigns.getVariantRealEstateType(behavior)==="bubbler"){
            var tgl =  getCookie(ckie_toggling_displayer);
            if (tgl) {
                try {
                    var togglingCampaignId = Campaigns.getVariant(tgl).campaignId;
                    logDebug("may not execute, reason: bubbler with toggling displayer" + " campaign: " + campaignId + " variant " + variantId);
                    reportInspectorBlockedReason(campaignId, "Campaign " + campaignId + " blocked by slide-out " + togglingCampaignId);
                } catch (e) {

                }
                canExecute = false;
            }
        }
        var timeLastExecuted = getBehaviorLastExecutionTime({id:variantId});
        if (!holisticEmailCampaignInvoked) {        	
            if (timeLastExecuted) { // if you want to re-see the experience again and again (for debugging), you can add && !devMode
                logDebug("may not execute, reason: was executed already" + " campaign: " + campaignId + " variant " + variantId);
                reportInspectorBlockedReason(campaignId, "Campaign " + campaignId + " was already shown");
                canExecute = false;
            }
            if (CampaignOccurrences.wasExperienceTypeLimitExceeded(behavior)) {
                canExecute = false;
            }
            if (CampaignOccurrences.wasRealEstateTypeLimitExceeded(behavior)) {
                canExecute = false;
            }
        }

        if (canExecute) {
            // check if there are dynamic properties that aren't translated
            canExecute = checkDynamicProperties(behavior);
            if (canExecute) {
                // check, if after translation, dynamic properties cause creatives to exceed length
                var tempBehavior = replaceDynamicProperties(behavior);
                for (var k in tempBehavior.templateParams) {
                    if (tempBehavior.templateParams.hasOwnProperty(k) && !behavior.templateParams.widget && behavior.expectedParams && behavior.expectedParams.hasOwnProperty(k)) {
                        var maxLength = behavior.expectedParams[k].maxLength;
                        if (maxLength) {
                            if (tempBehavior.templateParams[k].length > maxLength) {
                                logDebug("may not execute, reason: dynamic property too long" + " campaign: " + campaignId + " variant " + variantId);
                                reportInspectorBlockedReason(campaignId,"Blocked "+ campaignId + " - dynamic text too long");
                                canExecute = false;
                                break;
                            }
                        }
                    }
                }
            } else {
                logDebug("may not execute, reason: dynamic property translation failed" + " campaign: " + campaignId + " variant " + variantId);
                reportInspectorBlockedReason(campaignId,"Blocked "+ campaignId + " - dynamic text replacement not found");
            }
        }
        if (canExecute) {
            logDebug("will execute:"  + " campaign: " + campaignId + " variant " + variantId);            
        }
		return canExecute;
	};

    function triggerNavigateSplitTestIfNeeded() {
        var splitCampaignNavigatedCookieName = "_cs."+siteId+".splitter.navigated";
        var splitCampaignNavigatedVariant = getCookie(splitCampaignNavigatedCookieName);
        if (splitCampaignNavigatedVariant) {
            var objWithId = {};
            objWithId.id = splitCampaignNavigatedVariant;

            var campaignEventParams = buildCampaignEventParams(objWithId);
            //check if campaignEventParams contains any params
            if (Object.keys(campaignEventParams).length) {
                reportTriggeredCampaignEvent(WAE_campaignShown, objWithId);
                reportTriggeredCampaignEvent(WAE_campaignTriggered, objWithId);
                clearCookie(splitCampaignNavigatedCookieName);
            }
        }
    }

    /* jshint ignore:start */
    // There is 'Don't make functions within a loop' - ignore it for now
    this.preprocessAntiFlicker = function() {
        // iterate over the campaigns and pre-process A/B campaigns to prevent flicker later on
        for (var id in campaigns) {
            if (campaigns.hasOwnProperty(id)) {
                var campaign = campaigns[id];

                if (campaign.displayer==="contentChanger") { // currenty only preprocessing contentChanges
                    var evaluator = RulesEvaluatorsFactory.createRulesEvaluator(campaign);
                    evaluator.on("satisfied_"+campaign.id, (function(_campaign) {
                        return function() {
                            if (!_campaign.preprocessedAntiFlicker) {
                                try {
                                    var _variant = _campaign.variantsConfig[_campaign.chosenVariantId];
                                    if (_variant.displayer != "control" && canExecuteBehavior(_variant, _campaign, _variant.id)) {
                                        var _displayer = displayers[_variant.displayer];
                                        if (_displayer.preprocessCampaignAntiFlicker) { // not all displayers have antiFlicker methods
                                            _displayer.preprocessCampaignAntiFlicker(_variant);
                                        }
                                    }
                                } catch (e) {
                                    // do nothing, just protect so that we mark preprocessedAntiFlicker = true
                                }
                                _campaign.preprocessedAntiFlicker = true;
                            }
                        };
                    })(campaign));
                    var tempContext = baseContextConstructor();
                    contextStorage.fillContextWithCookieValues(tempContext);
                    evaluator.check(tempContext);


                }
            }
        }
    };
    /* jshint ignore:end */


    /* jshint ignore:start */
    // There is 'Don't make functions within a loop' - ignore it for now
    this.executeImmediateBehaviors = function() {
		if (urlParams && urlParams.hasOwnProperty("cssuppress") && urlParams.cssuppress.toString().indexOf("true")>-1) {
			return;
		}
		for (var id in campaigns) {
			if (campaigns.hasOwnProperty(id)) {
				var campaign = campaigns[id];
				if (campaign.displayer==="contentChanger" || campaign.displayer==="splitter") {
					//Make sure not to display none mobile supported campiagns
                    if (!globalShowToolbar){
                        logDebug("globalShowToolbar was turned off for campaign ("+campaign.id+")");
                        continue;
                    }
                    if (!isMobile && !isHolisticEmailCampaignInvoked(campaign) && campaign.mobileSupported) {
					    logDebug("Mobile campaign ("+campaign.id+") will not be evaluated/triggered on desktop device");
					    continue;
					}
					if (isMobile && !campaign.mobileSupported) {
					    logDebug("Desktop campaign ("+campaign.id+") will not be evaluated/triggered on mobile device");
                        continue;
					}
					if (isMobile && !isMobileInWhiteList) {
					    logDebug("Mobile campaign ("+campaign.id+") will not be evaluated/triggered on non-white list mobile device");
                        continue;
					}
					var urlFiltered = UrlFilter.isUrlFiltered(window.location.href, campaign.urlFiltering);
					if (urlFiltered) continue;
                    var evaluator = RulesEvaluatorsFactory.createRulesEvaluator(campaign);
                    evaluator.on("satisfied_"+campaign.id, (function(_campaign) {
                        return function() {
                            var _variant = _campaign.variantsConfig[_campaign.chosenVariantId];
                            _variant = replaceDynamicProperties(_variant);
                            var _displayer = displayers[_variant.displayer];
                            _displayer.show(_variant);
                        }
                    })(campaign));
                    var tempContext = baseContextConstructor();
                    contextStorage.fillContextWithCookieValues(tempContext);
                    evaluator.check(tempContext);
                }
            }
        }
    };
    /* jshint ignore:end */

	var executeBehavior = function(behavior, showImmediately, updateOccurrences) {
		if (showImmediately===undefined) {
			showImmediately = false;
		}
		if (updateOccurrences===undefined) {
			updateOccurrences = true;
		}
		var success = false;
		try {
			var displayerName = behavior.displayer;

            if (behavior.displayer === "control") {
                var variant = Campaigns.getVariant(behavior.id);
                if (variant) {
                    var campaign = campaigns[variant.campaignId];
                    if (campaign) {
                        var campaignDisplayer = campaign.displayer;
                        if (campaignDisplayer === "contentChanger") {
                            displayerName = "contentChangerControl";
                        }
                    }
                }
            }
            else if (isMobile) {
                if (!behavior.templateParams.widget) {
                    displayerName += "Mobile";
                }
            }

            if (behavior.templateParams.widget && behavior.templateParams.widget.canvasType) {
                var canvasCampaign = Campaigns.getCampaignByVariantId(behavior.id);
                success = canvasCampaign.triggerCampaign(behavior, showImmediately);

                if (!success) {
                    behavior.blockCanvasCampaign = true;
                    behavior.blockCanvasCampaignReason = "Canvas campaign execution aborted";
                    CampaignOccurrences.clearPendingVariant(behavior);
                }
            } else {
                var displayer = displayers[displayerName];
                if (displayer) {
                    success = displayer.show(behavior, showImmediately);
                }
            }
            if (success!==false) {
                if (updateOccurrences && behavior.id) {
                    // Do this before experience is actually displaying because we may need to block other experiences
                    // from displaying (so we won't show two coupons, for example, if they trigger simultaneously)
                    CampaignOccurrences.incrementOccurrencesForVariant(behavior);
                }
                CampaignOccurrences.persistPendingVariant(behavior);
                persistTogglingDisplayer(behavior);
            }
		}catch(e) {
			var _id = (behavior && behavior.id) ? " ["+behavior.id+"]" : "";
			logError("Error while attempting to execute campaign" + _id,e);
			success = false;
		}
		return success;

	};

	var persistTogglingDisplayer = function(behavior) {
		// If behavior has a minimized view, then persist the minimized view to be shown on next page)
		// (Behavior can't be toggled and persisted at the same time)
		if (behavior.togglingDisplayer && behavior.displayer!=="bar") {
			setCookie(ckie_toggling_displayer, behavior.id);
		}
	};

    this.clearTogglingDisplayerIfNeeded = function(campaigns) {
        for (var i=0; i<campaigns.length; i++) {
            clearTogglingDisplayerIfNeededForCampaign(campaigns[i]);
        }
    };

    var clearTogglingDisplayerIfNeededForCampaign = function(campaign) {
		var id = getCookie(ckie_toggling_displayer);
		if (id) {
            var removedOnConversion = removeTogglingDisplayerOnConversion();
            var removedDueToHolisticEmailCampaign = removeTogglingDisplayerDueToHolisticEmailCampaign(campaign);
            if (removedOnConversion || removedDueToHolisticEmailCampaign) {
                clearCookie(ckie_toggling_displayer);
			}
		}
	};

	var loadPersistentDisplayer = function() {
		var id = getCookie(ckie_persistent_displayer);
		if (id) {
			var persistentVariant = Campaigns.getVariant(id);
			var persistentCampaign = campaigns[persistentVariant.campaignId];
			var urlFiltered = true;
			
			if (persistentCampaign) {
           		urlFiltered = UrlFilter.isUrlFiltered(window.location.href, persistentCampaign.urlFiltering);
           	}
           	if (!urlFiltered) {
				if (persistentVariant && persistentVariant.behavior) {
					if (checkDynamicProperties(persistentVariant.behavior)) {
	                    if (!persistentVariant.originalBehavior) {
	                        persistentVariant.originalBehavior = persistentVariant.behavior;
	                    }
						persistentVariant.behavior = replaceDynamicProperties(persistentVariant.behavior);
						return executeBehavior(persistentVariant.behavior, true, false);
					}
				}
			}
		}
		return false;
	};

	var loadTogglingDisplayer = function () {
		var togglingDisplayerId = getCookie(ckie_toggling_displayer);
    	if (togglingDisplayerId) {
    		showBehaviorTogglingDisplayer({id: togglingDisplayerId}, true);
    	}
	};

	var removeTogglingDisplayerOnConversion = function() {
		if (typeof(window._cshq) !== "undefined") {
			if (typeof(window._cshq.push) === "function" && (window._cshq.length || window._cshq_conversionEvent)) {
				clearCookie(ckie_toggling_displayer);
				return true;
			}
		}
		return false;
	};

    var removeTogglingDisplayerDueToHolisticEmailCampaign = function(campaign) {
        if (isHolisticEmailCampaignInvoked(campaign)) {
            clearCookie(ckie_toggling_displayer);
            return true;
        }
        return false;
    };

	var extractDynamicProperties = function(paramValue) {
		var matches = paramValue.match(/\[\[(.*?)\]\]/g);
		var results = [];
		if (matches) {
			for (var i=0; i<matches.length; i++) {
				results.push(matches[i].substr(2,matches[i].length-4));
			}
		}
		return results;
	};

	var replaceDynamicProperties = function(behavior) {
		behavior = jq.extend(true, {}, behavior);
		for (var k in behavior.templateParams) {
			if (behavior.templateParams.hasOwnProperty(k) && typeof(behavior.templateParams[k])==="string") {
				behavior.templateParams[k] = replaceDynamicProperty(behavior.templateParams[k]);
			}
            if (behavior.templateParams.hasOwnProperty(k) && typeof(behavior.templateParams[k])==="object" && k === "selectors") {
                behavior.templateParams[k] = replaceDynamicPropertiesOnSelectors(behavior.templateParams[k]);
            }
		}
		return behavior;
	};

    //TODO implement a recursive method that iterates on JSON and replace the dynamic properties on string leaves
    //TODO currently just a dedicated method for the ab campaigns
    function replaceDynamicPropertiesOnSelectors(selectors) {
        for (var k in selectors) {
            if (selectors.hasOwnProperty(k)) {
                var selector = selectors[k];
                if (selector.changes) {
                    for (var i in selector.changes) {
                        if (selector.changes.hasOwnProperty(i)) {
                            var change = selector.changes[i].change;
                            if (change) {
                                selector.changes[i].change = replaceDynamicPropertyOnSelector(change);
                            }
                        }
                    }
                }
            }
        }
        return selectors;
    }


    var replaceDynamicPropertyOnSelector = function(value) {
        var dynamicProperties = extractDynamicProperties(value);
        for (var i=0; i<dynamicProperties.length; i++) {
            var property = dynamicProperties[i];
            var translated = dynamicPropertyTranslatorForSelector(property);
            translated = translated || "";
            value = value.replace("[[" + property + "]]", translated, "g");
        }
        return value;
    };

    // this is a dynamicPropertyTranslator() version that is used by ab test campaigns
    // it allows following patterns  [[property::DEFAULT_VALUE]]
    // we do want to implement the same for all the campaigns, however, due to potential regressions
    // and to flickering we duplicate the method
    // need to find time for refactoring so all the campaigns will use the same method
    var dynamicPropertyTranslatorForSelector = function(property) {
        property = property || "";
        var defaultValue = null;
        var propertyParts = property.split("::");
        if (propertyParts.length === 2) {
            property = propertyParts[0];
            defaultValue = propertyParts[1];
        }
        property = property.toLowerCase();
        var translatedValue = null;

        if (property==="timeofday") {
            var hour = parseInt(UserContext.getValue("context.page.hour"), 10);
            if (hour>=5 && hour <12) {
                translatedValue = "Morning";
            }
            if (hour>=12 && hour<18) {
                translatedValue = "Day";
            }
            if (hour>=18 && hour<21) {
                translatedValue = "Evening";
            }
            if (hour>=21 || hour<5) {
                translatedValue = "Night";
            }
        }
        else if (property==="state") {
            translatedValue = contextStorage.getItem("context.user.state");
        }
        else if (property==="country") {
            translatedValue = contextStorage.getItem("context.user.country");
        }
        else if (property==="city") {
            translatedValue = contextStorage.getItem("context.user.city");
        }
        else if (property==="keyword") {
            translatedValue = contextStorage.getItem("context.user.landingPage.search");
        }
        else if (property==="text1" || property==="text2" || property==="text3" || property==="firstname" || property==="lastname") {
            var params = UserContext.getValue("context.page.params") || [];
            params = params.concat(UserContext.getValue("context.session.landingPage.params") || []);
            if (params.length) {
                for (var i=0; i<params.length; i++) {
                    var param = params[i];
                    var paramParts = param.split("=");
                    if (paramParts.length && paramParts[0].toLowerCase()===property) {
                        translatedValue = decodeURIComponent(paramParts[1]);
                    }
                }
            }
        }
        return translatedValue || defaultValue;
    };

    var replaceDynamicProperty = function(value) {
		var dynamicProperties = extractDynamicProperties(value);
		for (var i=0; i<dynamicProperties.length; i++) {
			var property = dynamicProperties[i];
			var translated = dynamicPropertyTranslator(property);
            if (translated) {
				value = value.replace("[["+property+"]]", translated, "g");
            }
		}
		return value;
	};

    var dynamicPropertyTranslator = function(property) {
        property = property || "";
        property = property.toLowerCase();
        if (property==="timeofday") {
            var hour = parseInt(UserContext.getValue("context.page.hour"), 10);
            if (hour>=5 && hour <12) {
                return "Morning";
            }
            if (hour>=12 && hour<18) {
                return "Day";
            }
            if (hour>=18 && hour<21) {
                return "Evening";
            }
            if (hour>=21 || hour<5) {
                return "Night";
            }
        }
        if (property==="state") {
            return contextStorage.getItem("context.user.state");
        }
        if (property==="country") {
            return contextStorage.getItem("context.user.country");
        }
        if (property==="city") {
            return contextStorage.getItem("context.user.city");
        }
        if (property==="keyword") {
            return contextStorage.getItem("context.user.landingPage.search");
        }
        if (property==="text1" || property==="text2" || property==="text3" || property==="firstname" || property==="lastname") {
            var params = UserContext.getValue("context.page.params") || [];
            params = params.concat(UserContext.getValue("context.session.landingPage.params") || []);
            if (params.length) {
                for (var i=0; i<params.length; i++) {
                    var param = params[i];
                    var paramParts = param.split("=");
                    if (paramParts.length && paramParts[0].toLowerCase()===property) {
                        return decodeURIComponent(paramParts[1]);
                    }

                }
            }
        }
        return false;
    };


	// Campaign editor helper functions
	exportFunc(function(params, mobileEmulation) {
        if (!devMode) return;
		params = params || {};
		params = jq.extend(true, {}, params);
		// Don't attempt to execute things on displayers if we're using csquery
		if (typeof(jq.csquery)==="undefined" || !jq.csquery) {
			for (var _displayer in displayers) {
				if (displayers.hasOwnProperty(_displayer)) {
					var __displayer = displayers[_displayer];
					if (typeof(__displayer.kill) === "function") {
						__displayer.kill();
					}
				}
			}
		}
		var displayerName = params.displayer;		
		if (isMobile || mobileEmulation) {
			displayerName += "Mobile";
		}
        if (params.params.templateParams.widget && params.params.templateParams.widget.canvasType) {
            Campaigns.createCampaignForPreview().triggerCampaign(params.params, true);
            return true;
        } else {
            var displayer = displayers[displayerName];
            if (displayer) {
                params.params.id = "temp";
                if (displayerName !== "contentChanger") {
                    params.params = replaceDynamicProperties(params.params);
                }
                displayer.clearPrefetched();
                displayer.show(params.params, true, true);
                return true;
            }
        }
		return false;
	}, "executeBehaviorNow");

	exportFunc(function(params) {
		if (!devMode) return;
		params = params || {};
		params = jq.extend(true, {}, params);
		var displayerName = params.displayer;
		var displayer = displayers[displayerName];
		var result = null;
		if (displayer) {
			params.params = replaceDynamicProperties(params.params);
			displayer.clearPrefetched();
			result = displayer.getAsHTML(params.params);
		}
		return result;
	}, "getExperienceHTML");

	exportFunc(function(params) {
		if (!devMode) return;
		for (var _displayer in displayers) {
			if (_displayer.hasOwnProperty("kill")) {
				_displayer.kill();
			}
		}
        InjectorsRepository.hideInjectors();
		params = jq.extend(true, {}, params);
        var templateParams;
        if (params && params.params && params.params.templateParams) {
            templateParams = params.params.templateParams;
        }
        if (templateParams && templateParams.widget && templateParams.widget.canvasType) {
            Campaigns.createCampaignForPreview().triggerCampaign(params.params, true);
            return true;
        } else {
            var displayer = displayers[params.displayer];
            if (displayer) {
                params.params.id = "temp";
                params.params = replaceDynamicProperties(params.params);
                displayer.clearPrefetched();
                displayer.show(params.params);
                return true;
            }
		}
		return false;
	}, "displayPreview");

	exportFunc(function(params) {
		if (!devMode) return;
		params = jq.extend(true, {}, params);
		var displayer = displayers[params.displayer];
		if (displayer && !displayer.prefetched()) {
			params.params.id = "temp";
			params.params = replaceDynamicProperties(params.params);
			displayer.prepare(params.params);
			return true;
		}
		return false;
	}, "preparePreview");

	exportFunc(function() {
		if (!devMode) return;
		for (var k in displayers) {
			if (displayers.hasOwnProperty(k)) {
				var displayer = displayers[k];
				displayer.kill();
			}
		}
	}, "shutdownDisplayers");

	var getBehaviorLastExecutionTime = function(behavior) {
		return contextStorage.getItem(getPersistenceExecutionTimeKey(behavior.id));
	};

    var getExperienceChosenVariantId = function(id) {
        // the chosen variant is stored in the context as JSON which is actually a map from campaignId to variantId
        var chosenVariants = {};
        var chosenVariantsGlobalStorage = contextStorage.getItem(getPersistenceGlobalChosenVariantKey());
        if (chosenVariantsGlobalStorage) {
            try {
                chosenVariants = JSON.parse(chosenVariantsGlobalStorage);
            } catch(e) {}
            if (chosenVariants[id]) {
                return chosenVariants[id];
            }
        }
        // if could not find - the fallback is an old way where we had an item in context per campaign
        return contextStorage.getItem(getPersistenceChosenVariantIdKey(id));
    };

    var storeExperienceChosenVariantId = function(campaignId, variantId) {
        var chosenVariants = {};
        var chosenVariantsGlobalStorage = contextStorage.getItem(getPersistenceGlobalChosenVariantKey());
        if (chosenVariantsGlobalStorage) {
            try {
                chosenVariants = JSON.parse(chosenVariantsGlobalStorage);
            } catch(e) {}
        }
        chosenVariants[campaignId] = variantId;
        contextStorage.setItem(getPersistenceGlobalChosenVariantKey(), JSON.stringify(chosenVariants), true);
    };

    function wasCampaignEventTriggered(cookieName, campaignId) {
        if (!campaignId) {
            return false;
        }
        var campaignsStr = getCookie(cookieName);
        if (campaignsStr) {
            var campaigns = campaignsStr.split(",");
            for (var i in campaigns) {
                if (campaigns[i] === campaignId) {
                    return true;
                }
            }
        }
        return false;
    }

    function storeCampaignEventTriggered(cookieName, campaignId) {
        if (!campaignId) {
            return;
        }
        var newCampaignsStr = campaignId;
        var campaignsStr = getCookie(cookieName);
        if (campaignsStr) {
            var campaigns = campaignsStr.split(",");
            if (campaigns.indexOf(campaignId) === -1) {
                campaigns.push(campaignId);
            }
            newCampaignsStr = campaigns.join();
        }
        setCookie(cookieName, newCampaignsStr, Duration.minutes(30));
    }

	var experienceIsDisplaying = function(objWithId) {
        var shouldTriggerCampaignShown = true;
		if (objWithId && objWithId.id && contextStorage) {
			CampaignOccurrences.clearPendingVariant(objWithId);
            CampaignOccurrences.variantDisplaying(objWithId.id);
            contextStorage.setItem(getPersistenceExecutionTimeKey(objWithId.id), (Date.parse(new Date().toUTCString())), false);
			var campaignId;
            var displayer;
            var campaignDisplayer;
            var variant = Campaigns.getVariant(objWithId.id);
            if (variant) {
				campaignId = variant.campaignId;
				var behavior = variant.behavior;
                displayer = behavior.displayer;
				// For now, only bar behavior is persistent
                if (Campaigns.isBarCampaign(behavior.id) && shouldPersistBar) {
				    setCookie(ckie_persistent_displayer, objWithId.id, Duration.minutes(30));
				}
                var campaign = campaigns[variant.campaignId];
                campaignDisplayer = campaign.displayer;
                if ((campaignDisplayer==="contentChanger" || campaignDisplayer==="splitter") && wasCampaignEventTriggered(ckie_contentChanger_shown_triggered, campaignId)) {
                    shouldTriggerCampaignShown = false;
                }
			}
            if (shouldTriggerCampaignShown) {
                if (campaignId && variant) {
                    reportInspectorShowCampaign(campaignId, "Showing campaign "+ campaignId + " variant " + variant.behavior.id);
                }
                reportTriggeredCampaignEvent(WAE_campaignShown, objWithId);
                if (campaignDisplayer==="contentChanger" || campaignDisplayer==="splitter") {
                    storeCampaignEventTriggered(ckie_contentChanger_shown_triggered, campaignId);
                }
            }
		}
	};

	var experienceIsCancelled = function(objWithId) {
		CampaignOccurrences.clearPendingVariant(objWithId);
	};

	var experienceIsDoneDisplaying = function(objWithId) {
		try {
			if (objWithId) {
				if (objWithId.id) {
                    CampaignOccurrences.variantDoneDisplaying(objWithId.id);
                    reportTriggeredCampaignEvent(WAE_campaignClosed, objWithId);
					var persistentDisplayer = getCookie(ckie_persistent_displayer);
					if (persistentDisplayer===objWithId.id) {
						clearCookie(ckie_persistent_displayer);
					}
					showBehaviorTogglingDisplayer(objWithId);
				} else {
					showBehaviorFromToggle(objWithId);
				}
			}
		} catch(e) {
			var id = "[no id available]";
			if (objWithId && objWithId.hasOwnProperty("id")) {
				id = objWithId.id;
			}
			logError("error while closing campaign id["+id+"]", e);
		}
		StyledTTips.hideTooltip("fast");
	};

	var showBehaviorTogglingDisplayer = function(objWithId, showImmediately) {
		var variant = Campaigns.getVariant(objWithId.id);
		
		if (!variant) {
			return;
		}
		
		var togglingDisplayer = getTogglingDisplayer(objWithId);
		var togglingCampaign = campaigns[variant.campaignId];
		var urlFiltered = true;

		if (togglingCampaign) {
			urlFiltered = UrlFilter.isUrlFiltered(window.location.href, togglingCampaign.urlFiltering);
		}

		if (variant && variant.hasOwnProperty("behavior") && togglingDisplayer && !urlFiltered) {
			variant = variant.behavior;
			// Inherit parent's togglingDisplayer params, override with theirs (this will be created by the designer - it needs to take precedence)
			togglingDisplayer.templateParams = jq.extend(true, {}, togglingDisplayer.templateParams, variant.templateParams.togglingDisplayer);
			// copy specific properties we need from the parent
			var toCopy = ["verticalPosition"];
			while (toCopy.length) {
				var prop = toCopy.pop();
				if (variant.templateParams.hasOwnProperty(prop)) {
					togglingDisplayer.templateParams[prop] = variant.templateParams[prop];
				}
			}
			executeBehavior(togglingDisplayer, showImmediately, false);
		}
	};

	var getTogglingDisplayer = function(objWithId) {
		var variant = Campaigns.getVariant(objWithId.id);
		if (variant && variant.behavior) {
			variant = variant.behavior;
			if (variant && variant.hasOwnProperty("togglingDisplayer")) {
				return variant.togglingDisplayer;
			}
		}
		return null;
	};

	var showBehaviorFromToggle = function(toggleObj) {
		if (toggleObj.hasOwnProperty("nextBehavior") && toggleObj.nextBehavior.hasOwnProperty("id")) {
			var nextBehavior = Campaigns.getVariant(toggleObj.nextBehavior.id);
			if (nextBehavior) {
				nextBehavior.behavior = jq.extend(true, {}, toggleObj.nextBehavior.behavior, nextBehavior.behavior);
				executeBehavior(nextBehavior.behavior, false, false);
			}
		}
	};

	var getIdFromBehavior = function(behaviorObj) {
		if (behaviorObj.hasOwnProperty("id")) {
			return behaviorObj;
		}
		if (behaviorObj.hasOwnProperty("nextBehavior")) {
			return behaviorObj.nextBehavior;
		}
		return {};
	};

	var experienceHovered = (function(behaviorObj) {
		var objWithId = getIdFromBehavior(behaviorObj);
        reportTriggeredCampaignEvent(WAE_campaignHover, objWithId);
	}).bind(this);

	var experienceCTAClicked = (function(behaviorObj) {
		var objWithId = getIdFromBehavior(behaviorObj);
        reportTriggeredCampaignEvent(WAE_campaignClick, objWithId);
	}).bind(this);

	var init = function() {
		Observer.on("beforeDisplay", experienceIsDisplaying);
		Observer.on("cancelShow", experienceIsCancelled);
		Observer.on("hide", experienceIsDoneDisplaying);
		Observer.on("behaviorHover", experienceHovered);
		Observer.on("callToActionClick", experienceCTAClicked);
        Observer.on("geoContextUpdated", geoContextUpdated);
	};

	var executePendingExperiences = function(cache) {
		for (var k in cache) {
			if (k.indexOf(that.persistenceDomain)===0) {
				var parts = k.split(".");
				if (parts.length>2 && parts[2]==="pending" && cache[k]==="true") {
                    CampaignOccurrences.clearPendingVariant({id: parts[1]});
					that.attemptBehaviorExecution(parts[1]);
				}

			}
		}
        CampaignOccurrences.executeAllPendingVariants();
	};

	var getPersistenceExecutionTimeKey = function(id) {
		return that.persistenceDomain+"."+id+".displayTime";
	};

	this.getPersistencePendingKey = function(id) {
		return that.persistenceDomain+"."+id+".pending";
	};

	this.getPersistenceExperienceOccurrenceKey = function(experienceType) {
		return that.persistenceDomain+".experienceOccured."+experienceType;
	};

	this.getPersistenceDisplayerOccurrenceKey = function(experienceType) {
		return that.persistenceDomain+".displayerOccured."+experienceType;
	};

    var getPersistenceChosenVariantIdKey = function(id) {
        return that.persistenceDomain+"."+id+".chosenVariantId";
    };

    var getPersistenceGlobalChosenVariantKey = function() {
        return "chosenVariants";
    };

    var geoContextUpdated = function() {
        var seenVariants = {};
        var displayersToUpdate = CampaignOccurrences.currentlyDisplayingVariants();
        if (displayersToUpdate.length>0) {
            for (var i = 0; i < displayersToUpdate.length; i++) {
                var variant = Campaigns.getVariant(displayersToUpdate[i]);
                if (variant && variant.behavior && variant.behavior.displayer === "contentChanger" && !seenVariants[variant.behavior.id]) {
                    var displayer = displayers[variant.behavior.displayer];
                    if (displayer) {
                        if (!variant.originalBehavior) {
                            variant.originalBehavior = variant.behavior;
                        }
                        variant.behavior = replaceDynamicProperties(variant.originalBehavior);
                        displayer.kill();
                        displayer.show(variant.behavior, true);
                    }
                    seenVariants[variant.behavior.id] = true;
                }
            }
        }
    };

    init();
};


/**
 * Created by Eyal on 29/03/2016.
 */

var GATracker = new function() {
    var EVENT_CATEGORY = "Commerce Sciences" ;
    var reportedMissingGa = false;
    var reportedInvalidGaFields = false;

    this.reportEvent = function(event) {
        var eventAction = null ;
        // Tracked events are:
        switch (event[WAF_eventName]) {
            case WAE_campaignShown :
                eventAction = "Campaign Shown";
                break;
            case WAE_campaignHover :
                eventAction = "Campaign Hovered";
                break;
            case WAE_campaignClosed :
                eventAction = "Campaign Closed";
                break;
            case WAE_campaignClick :
                eventAction = "Campaign Clicked";
                break;
        }
        if (eventAction !== null) { // one of the GA tracked events
            var gaEvent = {
                hitType: 'event',
                eventCategory: EVENT_CATEGORY,
                eventAction: eventAction + " - " + event[WAF_campaignName],
                eventLabel: event[WAF_variantName],
                nonInteraction: 1
            };
            logDebug((reportGAEvents ? "GA event to report: " : "Not reporting to GA, reportGAEvents is false: ") + gaEvent.eventCategory + " > " + gaEvent.eventAction + " > " + gaEvent.eventLabel);
            if (reportGAEvents) {
                if (typeof(window.ga) !== 'function') {
                    if (!reportedMissingGa) {
                        logError("ERROR: Not reporting to GA, reportGAEvents is true but window.ga() is undefined - Note: analytics.js must be loaded before our safe-tag", null, ERROR_GA_NOT_INITIALIZED);
                        reportedMissingGa = true;
                    }
                    return;
                }
                if (gaEvent.eventCategory && gaEvent.eventAction && gaEvent.eventLabel) {
                    // report the event to the customer's GA tracker
                    window.ga('send',gaEvent);
                } else if (!reportedInvalidGaFields) {
                    logError("GA Event Tracking is on, but event is missing mandatory data: " +gaEvent.eventCategory + " > " + gaEvent.eventAction + " > " + gaEvent.eventLabel, null, ERROR_GA_FIELDS_NOT_COMPLETE);
                    reportedInvalidGaFields = true;
                }


            }
        }
    };

};



var Tracker = new function() {
	extend(this, Observer);
    // Like GA, we use 30 minutes sessions for now
    // https://developers.google.com/analytics/resources/concepts/gaConceptsCookies
    // If a user goes 30 minutes without a pageview, we break the next pageview into a new session
    this.sessionDuration = Duration.minutes(30);

    this.tagsVersion = 1; // to invalidate tags
    this.tagCookieLifetime = Duration.days(30);

	// events to ignore if resident cookie is set to active
	var bannedResidentEvents = [

	];

    var initializeMissingContextVariables = function() {
        if (!PersistFormSubmission.isFormSubmittedExistInContext()) {
            UserContext.setContext("context.user.formSubmitted", false);
        }
        if (getCartContents().length === 0)  { // if cart is empty or missing, make sure all cart context variables are initialized
            clearCartContents();
        }
    };

    this.init = function (cb) {
        var visitState = null;
		var u_id = getCookie(ckie_user_id); // save user_id to catch first visit
		var loadSession = (function() {
			this.baseImageUrl_ = getCorrectUrlProtocol(cdnServerDomain + "/__h.png?");            

			this.userId = this.readOrCreateUserId_();
			if (!u_id) {
				// new user
				this.initCounter_(ckie_session_count, persistentCookieDuration);
				this.initCounter_(ckie_global_event_counter, persistentCookieDuration);
				visitState = "New User";

			}

			var s_id = getCookie(ckie_session_id); // save session_id to catch session initialization
			this.sessionId = this.readOrCreateSessionId_();

			if (!u_id) { // new user, now with sessionId, so let's capture it for future new vs. returning detection.
				setCookie(ckie_session_init_id, this.sessionId, persistentCookieDuration);
			}
			var isNewSession = false;
			if (!s_id) {
				// this is the first request in this session
				this.initCounter_(ckie_event_counter);
				this.reportInitSession_();
				isNewSession = true;
				if (u_id) {
					// returning user, first session
					visitState = "Returning User";
				}
			}

            contextStorage.onCacheReady().then(function() {
                initializeMissingContextVariables();
                checkForEcommerceEvents();
            });

			UserContext.setContext("context.session.isAtSessionStart", isNewSession);            
			this.visitState = visitState;
            if (visitState) {
                var referrerExtraData = extractReferrerAsExtraData();
                // note:
                // we want to trigger page-view first, then the rest of the events
                // this will help triggering specific events first (such as 'visit product' etc.).
                //Tracker.triggerEvent(tbGASiteEvent, visitState);
                if (visitState==="New User") {

                    UserContext.setContext("context.user.visitCount", 1);
                    UserContext.setUrlContext("context.user.landingPage", document.location.toString());
                    if (referrerExtraData.rawReferrer) {
                        UserContext.setUrlContext("context.user.referrer", referrerExtraData.rawReferrer);
                    }                                      
                } else {
                    // not new user? then new session. Increase visit count by 1
                    contextStorage.onCacheReady().then(function() {
                        var previousCount = parseInt(contextStorage.getItem("context.user.visitCount"), 10);
                        if (isNumber(previousCount)) {                            
                            UserContext.setContext("context.user.visitCount", previousCount+1);
                        } else {                            
                            // handle edge case when changing tag on a site - the user_id and session_id remain, but visitCount become NsN - reset the user!
                            UserContext.setContext("context.user.visitCount", 1);
                        }                                              
                    });
                }
                UserContext.setContext("context.session.visitState", visitState);
                UserContext.setContext("context.session.time", (Date.parse(new Date().toUTCString())));
                UserContext.setUrlContext("context.session.landingPage", document.location.toString());
                UserContext.setContext("context.session.pagesVisited", 0);
                if (referrerExtraData.rawReferrer) {
                    UserContext.setUrlContext("context.session.referrer", referrerExtraData.rawReferrer);
                }
            }
            UserContext.setUrlContext("context.page", document.location.toString());
            UserContext.setContext("context.session.splitPage.url", document.location.toString());
            UserContext.setContext("context.page.time", (Date.parse(new Date().toUTCString())));
            UserContext.setContext("context.page.hour", (new Date().getHours().toString())); // 0-23
            UserContext.setContext("context.page.day", (new Date().getDay().toString()));  // 0-6 (Sunday is 0)



            cb(visitState);
            
		}).bind(this);
		if (!u_id) {
			// We're possibly crossing domains here. If so, reload cookies from context storage.
			if (clientId!=="aRmfuz" && siteUrl && siteUrl.indexOf(window.location.host)===-1) {
				contextStorage.onCacheReady().then(function() {
					u_id = getCookie(ckie_user_id);
					loadSession();
				});
			} else {
				loadSession();
			}
		} else {
			loadSession();
		}
    };

    /**
     * Fields is a hash map that will be translated to "key=value&key1=value1 etc.
     */
    this.triggerEvent = function(eventName, fields) {
		fields = fields || {};
        // push the event to the events queue (so listeners could execute, such as exp.js)
        var item = {event:eventName, fields:fields};
        csEventsQueue.push(item);
		this.trigger("event", item);

        reportEvent(eventName, fields);
    };


    this.isCurrentUserNew = function() {
        // if current session equals first one (persisted), then user is new, otherwise it's a "returning user".
        return this.sessionId === getCookie(ckie_session_init_id);
    };

    this.reportNoCookiesSupport = function() {
		// TODO: analytics event spec doesn't support this event. Either remove or add to the spec.
        // this method does not depend on any initialization to work -- orene 22/12/2012 (btw, the world didn't end, we are still alive, yay!)
//        try {
//            var event = {
//                eventName: tbNoCookieSupport,
//                category: tbGASiteEvent,
//                tbVis: "false",  // prefer string as we want to report also for boolean false
//                variant: "nocookie",
//                userId : "no-user-id",
//                sessionId : "no-session-id",
//                eventCounter : 1,
//                gEventCounter : 1,
//                clientId: clientId,
//                siteId: siteId,
//                codeVer: codeVersion,
//                url: document.URL,
//                userTime: new Date(),
//                userAgent: navigator.userAgent
//            };
//
//            var imageUrl = this.buildImageUrl(getCorrectUrlProtocol(cdnServerDomain + "/__h.png?"), event);
//            loadPixel(imageUrl);

//        } catch (e) {
//            // nothing to do about it, we cannot even use logError as nothing will be loaded in this case.
//        }
    };

    this.reportInvalidUrlDetected = function() {
		// TODO: analytics event spec doesn't support this event. Either remove or add to the spec.
        // this method does not depend on any initialization to work -- orene 02/04/2014
//        try {
//            var event = {
//                eventName: tbInvalidUrlForTag,
//                category: tbGASiteEvent,
//                tbVis: "false",  // prefer string as we want to report also for boolean false
//                variant: "tagurlmismatch",
//                userId : "no-user-id",
//                sessionId : "no-session-id",
//                eventCounter : 1,
//                gEventCounter : 1,
//                clientId: clientId,
//                siteId: siteId,
//                codeVer: codeVersion,
//                url: document.URL,
//                userTime: new Date(),
//                userAgent: navigator.userAgent
//            };
//
//            var imageUrl = this.buildImageUrl(getCorrectUrlProtocol(cdnServerDomain + "/__h.png?"), event);
//            loadPixel(imageUrl);
//
//        } catch (e) {
//            // nothing to do about it, we cannot even use logError as nothing will be loaded in this case.
//        }
    };

    this.reportBlockedEvents = function(geo, resetVariant) {
        for (var i=0; i<blockedEvents.length; i++) {
            var event = blockedEvents[i];
            this.sendEvent(event);
        }
    };

    this.prepareUrlAndLoadPixel = function(event) {
        var oldImageUrl = this.buildImageUrl(this.baseImageUrl_, event);
        var newImageUrl = oldImageUrl.replace(cdnServerDomain, newCdnServerDomain);

        switch (newLogServerMode) {
            case NewLogServerMode.Old:
                loadPixel(oldImageUrl);
                break;

            case NewLogServerMode.New:
                loadPixel(newImageUrl);
                break;

            case NewLogServerMode.Both:
                loadPixel(oldImageUrl);
                loadPixel(newImageUrl);
                break;

            default:
                //noinspection ExceptionCaughtLocallyJS
                throw new Error("Unknown mode " + newLogServerMode);
        }
    };

	var commonEventFields = (function(eventName) {
		var eventCounter = this.getAndIncrementCounter_(ckie_event_counter);
        var globalEventCounter = this.getAndIncrementCounter_(ckie_global_event_counter, persistentCookieDuration);
        var userDate = new Date();
        var currentSessionCount = getCookie(ckie_session_count);
            currentSessionCount = (!currentSessionCount) ? 1 : currentSessionCount-1; // cookie state is always +1 actual value -- orene
		var fields = {};
        fields[WAF_userAgent] = navigator.userAgent;
        fields[WAF_codeVersion] = codeVersion;
    	fields[WAF_siteId] = siteId;
		fields[WAF_eventName] = eventName;
		fields[WAF_supported] = "";	// TODO: Is client browser supported by us?
        fields[WAF_eventCounter] = eventCounter;
        fields[WAF_globalEventCounter] = globalEventCounter;
        fields[WAF_userTime] = userDate.getTime();
        fields[WAF_userTimeZone] = userDate.getTimezoneOffset();
        fields[WAF_sessionIndex] = currentSessionCount;
        fields[WAF_sessionId] = this.sessionId;
        fields[WAF_userId] = this.userId;
        fields[WAF_globalUserId] = "";// TODO: Network-wide unique user id, stored on 3rd-party cookie
        //fields[WAF_deviceType] = ""; // TODO: Computer/tablet/mobile
        fields[WAF_url] = document.URL;
        fields[WAF_urlPath] = document.location.pathname; // http://example.com/some/page.html -> '/some/page.html'
        fields[WAF_urlQuery] = document.location.search; // http://a.com/?some_param=1 -> '?some_param=1'
        fields[WAF_urlHost] = document.location.hostname;
        fields[WAF_urlFragment] = document.location.hash; // http://a.com/#heading -> '#heading'
        fields[WAF_parentPageCounter] = ""; // TODO: global_event_counter value for the page_view that preceded this event (will help with tabs and attributing actions to a specific page view)
        fields[WAF_globalEventId] = this.generateGUID();
        return fields;
	}).bind(this);

    var pageViewFields = (function() {
        var fields = {};
        //fields[WAF_browserFamily] = ""; // TODO: e.g. Internet Explorer, Chrome, Firefox, Safari Mobile. IMPORTANT: Safari != Safari mobile, also for Chrome and IE
        //fields[WAF_browserVersion] = ""; // TODO: Browser family + major version, e.g. Chrome 33
        fields[WAF_browserLanguage] = navigator.language || navigator.userLanguage || ""; // navigator.language or IE equivalent. E.g. en-US
        fields[WAF_screenHeight] = screen.height; // Height of screen in pixels, including OS chrome!
        fields[WAF_screenWidth] = screen.width; // Width in pixels
        fields[WAF_viewHeight] = jq(window).height();
        fields[WAF_viewWidth] = jq(window).width();
		try {
			fields[WAF_documentHeight] = jq(document).height();
			fields[WAF_documentWidth] = jq(document).height();
		}catch(e) {
			// sometimes calling this causes an exception in jquery for some reason?
		}

        fields[WAF_osName] = navigator.platform; // TODO: e.g. Windows, OSX, iOS. Investigate platform.js as a solution for this.
                                                 // See http://stackoverflow.com/questions/19877924/what-is-the-list-of-possible-values-for-navigator-platform-as-of-today
        fields[WAF_urlPort] = document.location.port;

        if (document.referrer) {
            // referrer: use DOM to parse so that parsing is consistent with document.location parsing
            var link = document.createElement("a");
            link.href = document.referrer;

            fields[WAF_referrer] = document.referrer;
            fields[WAF_referrerScheme] = link.protocol;
            fields[WAF_referrerHost] = link.hostname;
            fields[WAF_referrerPath] = link.pathname;
            fields[WAF_referrerPort] = link.port;
            fields[WAF_referrerQuery] = link.search;
            fields[WAF_referrerFragment] = link.hash;

            var query = findReferrerSearchQuery();
            if (query !== null) {
                var split = /(.+?)___(.+)/.exec(query);
                if (split !== null) {
                    fields[WAF_referrerSearchQuery] = split[2];
                    fields[WAF_referrerSearchQueryType] = split[1];
                } else {
                    //TODO: log?
                }
            }
        }
        return fields;
    }).bind(this);

    this.sendEvent = function(event) {
        var eventsToSuppress = [WAE_campaignTriggered];  // add more events here that we don't want to send a pixel for to save visible events in site waterfall
        this.logEventForDebug(event);
        if (devMode && !forceEventsOnDev) {
            return; // not interesting to report events to server on development mode.
        }
        // suppress events that have no meaning on the server to save resource loading events on page
        if (eventsToSuppress.indexOf(event[WAF_eventName]) === -1) {
            this.prepareUrlAndLoadPixel(event); // notify the data project
            GATracker.reportEvent(event) ; // notify customer GA (if integrated)
        }
    };

    var reportEvent = (function(name, fields) {
        try {
            var event = jq.extend({}, commonEventFields(name));
            var fieldsMethod = eventsFieldsMethods[name];
            if (typeof(fieldsMethod)==="function") {
                event = jq.extend(event, fieldsMethod());
            }
			event = jq.extend(event, fields);

            if (shouldBlockEventsOnGeo() && geoRequired) {
                // blocking report for events until geo is ready
                blockedEvents.push(event);
                return;
            }
            this.sendEvent(event);

        } catch (e) {
            logError("Error custom-tracking event", e);
        }
    }).bind(this);

    this.logEventForDebug = function(event) {
        if ((analyzeMode || debugMode) && window.console && window.console.log) {
            // call sendData for extension.
            var eventObj = {event: event[WAF_eventName], codeVer: event[WAF_codeVersion]};
			for (var k in event) {
				if (event.hasOwnProperty(k) && event[k]) {
					if (k!==WAF_eventName && k!==WAF_codeVersion) {
						eventObj[k] = event[k];
					}
				}
			}
            if (typeof sendDataToOnboard === "function") {
                sendDataToOnboard(eventObj); // for our "on-board" extension.
            }
			console.log(JSON.stringify(eventObj));
        }
    };

    this.buildImageUrl = function(baseImageUrl, event) {
        var imageUrl = baseImageUrl ? baseImageUrl : getCorrectUrlProtocol(cdnServerDomain + "/__h.png?");

        // Encode parameters
        var firstParameter = true;
        for (var key in event) {
            // Don't send parameters that are empty or undefined
            if (!event[key]) {
                continue;
            }

            if (firstParameter) {
                firstParameter = false;
            } else {
                imageUrl += "&";
            }
            imageUrl += key + "=" + encodeURIComponent(event[key]);
        }
        return imageUrl;
    };

    this.generateGUID = function() {
        return uuid.v4();
    };

    /**
     * Read or create an ID.
     *
     * opt_expiration - expiration time in days (session/transient cookie if undefined)
     */
    this.readOrCreateId_ = function(idType, opt_expiration) {
        var id = getCookie(idType);
        if (!id) {
            id = this.generateGUID();
            setCookie(idType, id, opt_expiration);
        }
        return id;
    };
	
    this.initCounter_ = function(counterName, opt_expiration) {
		var counter = 1; // init counter
		setCookie(counterName, counter+'', opt_expiration);
        return counter;
    };

    this.getAndIncrementCounter_ = function(counterName, opt_expiration) {
        var str_counter = getCookie(counterName);
		var counter=0;  // 0 should never be returned!
        if (!str_counter) {
            counter = 1;  // default to 1 if none found
        } else {
			counter=parseInt(str_counter, 10);
			if (!isNumber(counter)) {
				counter=1;  // default to 1 if not valid
			}
		}
		setCookie(counterName, (counter+1)+'', opt_expiration); // store the next number up
        return counter;
    };

    this.readOrCreateUserId_ = function() {
        return this.readOrCreateId_(ckie_user_id, persistentCookieDuration);
    };

    this.readOrCreateSessionId_ = function() {
        return this.readOrCreateId_(ckie_session_id, this.sessionDuration);
	};
    this.extendSession_ = function() {
        var sessionId = this.readOrCreateSessionId_();
        setCookie(ckie_session_id, sessionId, this.sessionDuration);
    };

    this.killSession = function(cb) {
        clearCookie(ckie_session_id);
        clearCookie(ckie_pageviews_state);
        clearCookie(ckie_event_counter);
        clearCookie(ckie_contentChanger_shown_triggered);
        clearCookie(ckie_contentChanger_triggered_triggered);
        contextStorage.endSession(cb);
    };
	
	this.reportInitSession_ = function() {
        // fill some extra parameters to report with Session Start.
        var opt_extraData = extractReferrerAsExtraData();
        fillScreenSize(opt_extraData);

        Tracker.triggerEvent(WAE_newSession);

        // only trigger a call to the 2nd domain if a url was given and it not from the same domain as the current document:
        if (shouldPassInformationToOtherDomain()) {
            // pass as extra parameter the values of user/session id, so it will be available in the 2nd domain.
            var dataToPass = csoverPrefix + this.userId + "_" + this.sessionId + "_" + getCookie(ckie_session_count);
            passInformationToOtherDomain('cschkifrm', dataToPass);
        }
	};

    this.getCartDefaultData = function() {
        var cartDefaultData = [
            {name: "cart",          key: "context.user.cart",           defaultValue: JSON.stringify([])},
            {name: "cartValue",     key: "context.user.cartValue",      defaultValue: 0.0},
            {name: "cartCount",     key: "context.user.cartCount",      defaultValue: 0},
            {name: "cartItemsSku",  key: "context.user.cartItemsSku",   defaultValue: ""}
        ];

        return cartDefaultData;
    };

	var eventsFieldsMethods = {
		"page_view": pageViewFields,
		"new_session": pageViewFields
	};
};

function pageView() {
	if (isRunningInIFrame()) return;
	currentVisitState = Tracker.visitState;

    incCookieValue(ckie_pageviews_state);

	Tracker.extendSession_();

	// report any special events, if needed, based on the visit state (new user, returning user etc.)
	contextStorage.onCacheReady().then(function() {
		var previousCount = parseInt(contextStorage.getItem("context.session.pagesVisited"), 10);
		if (previousCount!==previousCount) {
			previousCount = 0;
		}
		UserContext.setContext("context.session.pagesVisited", previousCount+1);
	});
    
	// report page-view
	Tracker.trigger("pageview_done");
	Tracker.pageViewDone = true;
	Tracker.triggerEvent(WAE_pageView);

}

// note: must be called after bootstrap
function checkForEcommerceEvents() {
    // check if we have any purchase-complete event registered.
    if (typeof(window._cshq) !== "undefined") {
        if (typeof(window._cshq.push) === "function" && window._cshq.length) {
            // got at least one! handle them now:
            handleEcommerceEventsInQueue(window._cshq);
        }
    } else {
        // no event was registered, let's define the queue ourselves so it would be available for them.
        window._cshq = [];
    }

    // register to push events so we'll process newly added item to the array immediately
    window._cshq.push = function(e) {
        var queue = [e];
        handleEcommerceEventsInQueue(queue);
    };
}

function handleEcommerceEventsInQueue(queue) {
    try {
        var item;
        while (queue.length > 0) {
            item = queue.shift(); // go over the items by order of insertion - important for cart events
            var fields = {};
            if (item[0] == "_reportConversion") {
                // mark that there was a conversion in _cshq
                window._cshq_conversionEvent = true;
                // trigger conversion event:
                fields = {};
                fields[WAF_orderId] = item[1];
                fields[WAF_total] = item[2];
                fields[WAF_currency] = item[3];
                fields[WAF_customerEmail] = item[4];
                Tracker.triggerEvent(WAE_purchaseComplete, fields);
                clearCartContents();
            } else if (item[0] == "_addToCart") {
                // trigger add to cart event:
                fields = {};
                if (typeof(item[1])=='object' && isNumber(item[1].Quantity) && isNumber(item[1].UnitPrice) &&
                       typeof(item[1].ProductId)=='string' && item[1].ProductId.length>0 &&
                       typeof(item[1].Denomination)=='string' && item[1].Denomination.length==3) {
                    handleAddToCart(item[1]);
                    fields[WAF_productId] = item[1].ProductId ;
                    fields[WAF_itemQuantity] = item[1].Quantity ;
                    fields[WAF_unitPrice] = item[1].UnitPrice;
                    fields[WAF_currency] = item[1].Denomination;
                    fields[WAF_itemName] = item[1].Name ? item[1].Name : "";
                    fields[WAF_itemCategory] = item[1].Category ? item[1].Category : "";
                    fields[WAF_itemVariation] = item[1].Variation ? item[1].Variation : "";
                    Tracker.triggerEvent(WAE_addToCart, fields);
                } else {
                    logError("Missing mandatory fields, ignoring event:", item[0]);
                }

            } else if (item[0] == "_updateCart") {
                // trigger event to add or override item count in cart if exists:
                if (typeof(item[1])=='object' && isNumber(item[1].Quantity) && isNumber(item[1].UnitPrice) &&
                       typeof(item[1].ProductId)=='string' && item[1].ProductId.length>0 &&
                       typeof(item[1].Denomination)=='string' && item[1].Denomination.length==3) {
                    handleUpdateCart(item[1]);
                } else {
                    logError("Missing mandatory fields, ignoring event:", item[0]);
                }

            } else if (item[0] == "_removeFromCart") {
                // trigger add to cart event:
                fields = {};
                if (typeof(item[1])=='object' && isNumber(item[1].Quantity) &&
                       typeof(item[1].ProductId)=='string' && item[1].ProductId.length>0) {
                    handleRemoveFromCart(item[1]);
                    fields[WAF_productId] = item[1].ProductId ;
                    fields[WAF_itemQuantity] = item[1].Quantity ;
                    Tracker.triggerEvent(WAE_removeFromCart, fields);
                } else {
                    logError("Missing mandatory fields, ignoring event:", item[0]);
                }

            } else if (item[0] == "_clearCart") {
                // clear the cart contents (for cart items to be added anew):
                Tracker.triggerEvent(WAE_clearCart, {});
                clearCartContents();
            } else {
                logError("Bad event code received in events queue, ignoring:", item[0]);
            }
        }
    } catch (e) {
        logError("Failed parsing e-commerce _cshq events", e);
    }
}


/*
    cart structure:
    { sku1: {"sku":itemID, "count":itemCount, extraData: {data received in _addToCart },
    }
 */

function getCartContents() {
    var userContextCart = UserContext.getContext("context.user.cart");
    try {
        return userContextCart ? JSON.parse(userContextCart) : [];
    } catch (e) {
        // invalid cart JSON string
    }
    return [];
}

function handleAddToCart(itemData) {
    // take cart contents from iframe
    contextStorage.onCacheReady().then(function() {
        // get cart from storage
        var userContextCart = UserContext.getContext("context.user.cart");
        var cart = userContextCart ? JSON.parse(userContextCart) : [] ;
        // find the item in cart, or add a new one
        var found = false;
        for (var item in cart){
            if (!cart.hasOwnProperty(item))
                continue;
            if (cart[item].ProductId == itemData.ProductId) {
                found = true;
                cart[item].Quantity = (parseInt(cart[item].Quantity,10) + parseInt(itemData.Quantity,10)).toString() ;  // increment item count in cart
                break;
            }
        }
        if (!found) {
            cart.push(itemData);  // new item not previously in cart
        }
        UserContext.setContext("context.user.cart",JSON.stringify(cart));  // save back the cart
        updateCartTotalAndCount(cart);
    });
}

function handleUpdateCart(itemData) {
    // take cart contents from iframe
    contextStorage.onCacheReady().then(function() {
        // get cart from storage
        var userContextCart = UserContext.getContext("context.user.cart");
        var cart = userContextCart ? JSON.parse(userContextCart) : [] ;
        // find the item in cart, or add a new one
        var found = false;
        var anyChange = true;
        fields = {};
        fields[WAF_productId] = itemData.ProductId ;
        fields[WAF_itemQuantity] = itemData.Quantity ;
        fields[WAF_unitPrice] = itemData.UnitPrice;
        fields[WAF_currency] = itemData.Denomination;
        fields[WAF_itemName] = itemData.Name ? itemData.Name : "";
        fields[WAF_itemCategory] = itemData.Category ? itemData.Category : "";
        fields[WAF_itemVariation] = itemData.Variation ? itemData.Variation : "";
        for (var item in cart){
            if (!cart.hasOwnProperty(item))
                continue;
            if (cart[item].ProductId == itemData.ProductId) {
                found = true;
                var cartCountForItem = parseInt(cart[item].Quantity,10);
                var newItemCountForItem = parseInt(itemData.Quantity,10);
                if (newItemCountForItem > cartCountForItem) {
                    // increment item count in cart
                    cart[item].Quantity = newItemCountForItem.toString() ;
                    if (isNumber(itemData.UnitPrice)) {
                        cart[item].UnitPrice = itemData.UnitPrice ;
                    }
                    fields[WAF_itemQuantity] = (newItemCountForItem - cartCountForItem).toString() ;
                    Tracker.triggerEvent(WAE_addToCart, fields);
                } else if (newItemCountForItem < cartCountForItem) {
                    // reduce item count in cart
                    if (newItemCountForItem > 0) {
                        cart[item].Quantity = newItemCountForItem.toString();
                        if (isNumber(itemData.UnitPrice)) {
                            cart[item].UnitPrice = itemData.UnitPrice ;
                        }
                    } else {
                        cart.splice(item,1); // delete the item if none left
                    }
                    fields[WAF_itemQuantity] = (cartCountForItem - newItemCountForItem).toString() ;
                    Tracker.triggerEvent(WAE_removeFromCart, fields);
                } else {
                    anyChange = false;
                }
                break;
            }
        }
        if (!found ) {
            if (itemData.Quantity > 0) {
                cart.push(itemData);  // new item not previously in cart
                Tracker.triggerEvent(WAE_addToCart, fields);
            } else {
                anyChange = false ;
            }
        }
        if (anyChange) {
            UserContext.setContext("context.user.cart", JSON.stringify(cart));  // save back the cart
            updateCartTotalAndCount(cart);
        }
    });
}

function handleRemoveFromCart(itemData) {
    // take cart contents from iframe
    contextStorage.onCacheReady().then(function() {
        // get cart from storage
        var userContextCart = UserContext.getContext("context.user.cart");
        var cart = userContextCart ? JSON.parse(userContextCart) : [] ;
        // find the item in cart, subtract from it
        var found = false;
        for (var item in cart){
            if (!cart.hasOwnProperty(item))
                continue;
            if (cart[item].ProductId == itemData.ProductId) {
                found = true;
                var newQuantity = parseInt(cart[item].Quantity,10) - parseInt(itemData.Quantity,10);
                if (newQuantity > 0) {
                    cart[item].Quantity = newQuantity.toString() ;  // increment item count in cart
                } else {
                    cart.splice(item,1); // delete the item if none left
                }
                break;
            }
        }
        if (!found) {
            logError("Bad item sku received in removeFromCart, ignoring");
        }
        UserContext.setContext("context.user.cart",JSON.stringify(cart));  // save back the cart
        updateCartTotalAndCount(cart);
    });
}

function updateCartTotalAndCount(cart) {
    // total the cart
    var cartValue = 0.0 ;
    var cartCount = 0 ;
    var cartItemsSku = CSArray.csmap(cart, function(item){
        return  item.ProductId;
    });
    
    if (cartItemsSku.length > 0) {
        cartItemsSku = CSArray.csfilternulls(cartItemsSku);
    }

    for (var item in cart){
        if (!cart.hasOwnProperty(item))
            continue;
        cartValue = cartValue + parseFloat(cart[item].UnitPrice) * parseInt(cart[item].Quantity,10) ;
        cartCount = cartCount + parseInt(cart[item].Quantity,10);
    }
    
    UserContext.setContext("context.user.cartValue", cartValue.toString());
    UserContext.setContext("context.user.cartCount", cartCount.toString());
    UserContext.setContext("context.user.cartItemsSku", cartItemsSku.join(","));    
}

function clearCartContents() {
    contextStorage.onCacheReady().then(function() {
        // total the cart
            var cartValue = 0.0 ;
            var cartCount = 0 ;
            var cart = [];
            var cartItemsSku = [];
            UserContext.setContext("context.user.cartValue",cartValue.toString());
            UserContext.setContext("context.user.cartCount",cartCount.toString());
            UserContext.setContext("context.user.cartItemsSku", cartItemsSku.join(","));
            UserContext.setContext("context.user.cart",JSON.stringify(cart));  // save back the cart
    });
}

function setDefaultCartContextOnInit() {
    var cartContextItems = Tracker.getCartDefaultData();
    cartContextItems.forEach(function(context) {
        if (!UserContext.getContext(context.key)) {
            UserContext.setContext(context.key, context.defaultValue);
        }
    });     
}

runAfterBootstrap(pageView);



function isLocalEnv() {
    if (document.URL.indexOf(".apphb.com/cs/site/") !== -1) {
        return true;
    }
    if (!TBBaseURL) {
        return false;
    }
    return TBBaseURL.indexOf("http://local.cdn-cs.com") !== -1;
}

// Supported overloads:
// logError("string");
// logError("string", exception);
// logError("string", exception, error_code);
var errorCounter = 0;
function logError(arg1, exception, error_code) {
    errorCounter++;
    var message = "ERROR LOG";
    if (typeof(error_code) != 'undefined' && error_code !== null && error_code.trim().length > 0) {
        message += "::" + error_code;
    }
    message += "\n\n" + arg1;

    try {
        if (typeof(Prototype) != 'undefined' && typeof(jq) != 'undefined') {
            // this can be helpful for collisions between the two libraries
            message += " (prototype v" + Prototype.Version + ", jquery v" + jq.fn.jquery +").";
        }
    } catch (e) {
        // eat it up!
    }

    if (typeof(exception) != 'undefined' && exception !== null) {
        message += ", exception-message: " + exception.message +", stacktrace: " + printStackTrace({e:exception}).join('\n\n');
    }

    if (errorCounter >= 10) {
        if (window.console && window.console.log) {
            window.console.log("[ERROR THRESHOLD] "+message);
        }
        return;
    }

	var wasReportedAsDebug = logDebug(message);
    if (!wasReportedAsDebug && window.console && window.console.log) {
        window.console.log(message);
    }

    if (isLocalEnv() || hasUrlParam("csbarErrors=1")) {
        alert(message);
    } else {
        // Production environment
		var fields = {};
		fields[WAF_error] = message;
        if (typeof(error_code) != 'undefined' && error_code !== null && error_code.trim().length > 0) {
            fields[WAF_error_code] = error_code;
        }
        Tracker.triggerEvent(WAE_error, fields);
    }
}

function logDebug(str) {
    if (!debugMode || !window.console || !window.console.log) {
        return false;
	}

    window.console.log("[cs-log] " + str);
    return true;
}

// Return example:
// nonUS = false or undefined: Oct 24th
// nonUS = true: 24.2.2014
function prettyPrintFutureDate(daysToAdd, nonUS) {
	var dt = new Date();
	dt.setDate(dt.getDate() + daysToAdd);

	var daysSuffixes = ["th","st","nd","rd"];
	var day = dt.getDate();
	var daySuffix = "";
	if (daysSuffixes.length>1) {
		daySuffix = daysSuffixes[(day-20)%10] || daysSuffixes[day] || daysSuffixes[0];
	}
	var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	var month = months[dt.getMonth()];
	if (nonUS) {
		return day+"."+(dt.getMonth()+1).toString()+"."+dt.getFullYear();
	} else {
		return month+" "+day+daySuffix;
	}

}
// Emulate jQuery.is() - it was introduced in 1.6, so we can't rely on it
function isAny(items, func) {
    var result = false;
    items.each(function() {
        if (func.call(this)) {
            result = true;
        }});
    return result;
}

// verify x is defined and not null
function checkHasValue(x) {
    if (typeof(x) == 'undefined' || x === null) {
        throw new Error("checkHasValue failed");
    }
    return x;
}

function isNullOrUndefinedOrEmpty(x) {
    return typeof(x) === 'undefined' || x === null || x === "";
}

function ignoreKnownSubDomains(domain) {
    // Note - duplicate code (in js+java, multiple places)
    // EB modified to handle correctly e.g. "jojostore.com"
    for (var i = 0; i < ignoreSubDomains.length; ++i) {
        var prefix = ignoreSubDomains[i];
        if ( domain.substring(0, prefix.length) === prefix ) {
            return domain.substring(prefix.length);
        }
    }
    return domain;
}

// http://stackoverflow.com/questions/10805874/remove-string-element-from-array
// usage: removeItemFromArray(arr, "item-to-remove"); <-- will apply it to the given array.
function removeItemFromArray(arr){
    var what, a= arguments, L= a.length, ax;
    while(L> 1 && arr.length){
        what= a[--L];
        while((ax= arr.indexOf(what))!= -1){
            arr.splice(ax, 1);
        }
    }
    return arr;
}

// Return the index of a string in arr that contains str, or -1 if such a string doesn't exist
// jQuery can't be used to implement this because it's not loaded yet.
function findSubStringInArray(str, arr) {
    for (var i = 0; i < arr.length; ++i) {
        if (arr[i].indexOf(str) != -1) {
            return i;
        }
    }
    return -1;
}

// Return the index of a string in arr that is contained in str, or -1 if such a string doesn't exist
function findStringInSubStringArray(str, arr) {
    for (var i = 0; i < arr.length; ++i) {
        if (str.indexOf(arr[i]) != -1) {
            return i;
        }
    }
    return -1;
}

// Returns true if one (or more) of the elements in the array exist in the given string.
function isArrayElementsInString(str, arr) {
    for (var i = 0; i < arr.length; ++i) {
        if (str.indexOf(arr[i]) != -1) {
            return true;
        }
    }
    return false;
}
// Returns true if one (or more) of the regular expressions in the array match the given string.
function isStringInRegexArray(str, arr) {
    for (var i = 0; i < arr.length; ++i) {
        if (str.search(arr[i]) != -1) {
            return true;
        }
    }
    return false;
}

// match two strings, treating the second as a regex.
function matchRegex(candidate, regex, flags) {
    try {
        var rgx = regex;
        flags = (typeof flags === 'string') ? flags : "";
        if (typeof regex === 'string' && typeof candidate === 'string') {
            rgx = new RegExp(regex, flags);
            return rgx.test(candidate);
        } else {
            return false;
        }
    } catch (e) {
        return false;
    }
}

// http://stackoverflow.com/questions/901115/get-query-string-values-in-javascript/2880929#2880929
// This will hold all the URL get parameters
var urlParams = {};
(function () {
    var e,
        a = /\+/g,  // Regex for replacing addition symbol with a space
        r = /([^&=]+)=?([^&]*)/g,
        d = function (s) { return decodeURIComponent(s.replace(a, " ")); },
        q = window.location.search.substring(1);

    while (true) {
        e = r.exec(q);
        if (!e) {
            break;
        }
        urlParams[d(e[1])] = d(e[2]);
    }
})();

function getURLParams() {
	return urlParams;
}

function hasUrlParam(paramAndValue) {
	// TODO - replace with urlParams.paramAndValue
	return document.location.href.indexOf(paramAndValue) > -1;
}

// Add an inline CSS block to the DOM's head.
// Useful for styles that can't wait for CSS download (like hiding elements)
function addInlineCss(css) {
    var styleElement = jq("<style type='text/css'>" + css + "</style>");
    jq("head").prepend(styleElement);
}

// A class that helps detect if we are hovering over a specific element.
// Initializes as 'false', regardless of the actual position because we just don't know at this point.
//
// For usage notes, see http://stackoverflow.com/questions/1273566/how-do-i-check-if-the-mouse-is-over-an-element-in-jquery/7704678#7704678
function HoverWatcher(selector){
    this.hovering = false;
    this.selector = selector;
    var self = this;

    this.isHoveringOver = function() {
        return self.hovering;
    };

    jq(selector).hover(function() {
        self.hovering = true;
    }, function() {
        self.hovering = false;
    });
}

// TODO - rename to loadImage
function preloadImage(imageUrl) {
    // add prefix if needed
    if (imageUrl.indexOf("http") !== 0) {
        imageUrl = TBBaseURL + "images/" + imageUrl;
    }
	(new Image).src = imageUrl;
}

function loadPixel(imageUrl) {
	if (useIframePixel) {
		if (!jq || !jq.isReady) {
			// use Iframe pixel if document isn't ready yet
			loadIframePixel(imageUrl);
			return;
		} else {
			// once document is loaded, stop using iframe pixel
			// and remove the iframe (after giving any event still pending in it time to complete)
			useIframePixel = false;
			setTimeout(function() {
				$(__iframe).remove();
				__iframe = undefined;
			}, 100);
		}
	}
	// add prefix if needed
    if (imageUrl.indexOf("http") !== 0) {
        imageUrl = TBBaseURL + "images/" + imageUrl;
    }
    var img = new Image(1, 1);
    img.src = imageUrl;
}

 var __iframe;
 function loadIframePixel(imageUrl) {
	 if (imageUrl.indexOf("http") !== 0) {
	 	imageUrl = TBBaseURL + "images/" + imageUrl;
	 }
	 //var img = new Image(1, 1);
	 //img.src = imageUrl;
	 try {
		 var needsInit = false;
		 if (!__iframe ) {
			 __iframe = document.createElement('iframe');
			 (__iframe || __iframe.frameElement).style.cssText = "width: 0; height: 0; border: 0";
			 jq("body").append(__iframe);
			 needsInit = true;
		 }
		 var __doc = __iframe.contentWindow.document;
		 if (needsInit) {
			 __doc.open().write('<body></body>');
			 __doc.close();
		 }
		 var scr = __doc.createElement('script');
		 // sanitize imageUrl so it won't break the script (if the event contains single quotes, appending this script will throw a syntax error)
		 imageUrl = imageUrl.replace(/'/g, '"');
		 var code = __doc.createTextNode("var img = new Image(1, 1); img.src='"+imageUrl+"';");
		 scr.appendChild(code);
		 logDebug(code);
		__doc.body.appendChild(scr);
	 } catch(e) {
	 }
 }

function findSearchQuery(url, forAnalytics) {
    forAnalytics = forAnalytics===false ? forAnalytics : true;
    var referrer = document.referrer || window.__csGlobal__.__referrer || "";
	var eak_search_query = referrer.match(/(?:\?|&)(?:q|p|query)=([^&]*)/);
	if (!eak_search_query) {
		return null;
	}

	var eak_keywords;
	try {
		eak_keywords = decodeURIComponent(eak_search_query[1]);
	} catch (e) {
		logError("Failed to decode URI component: " + eak_search_query[1] + ",  referrer = " + referrer, e);
		return null;
	}
	// Replace + with space and clear extra whitespace at both ends of the
	// search string
	eak_keywords = eak_keywords.replace(/\+/g, ' ').replace(/^\s\s*/, '').replace(/\s\s*$/, '');
    if (forAnalytics) {
        // Convert all characters to lower case
        eak_keywords = eak_keywords.toLowerCase();
        var prefix = "weirdPrefix___";
        if (document.location.search.match(/(?:gclid)|(?:cpc)/)) {
        	prefix = "cpc___";
        } else {
        	prefix = "other___";
        }
        eak_keywords = prefix + eak_keywords;
    }
	return eak_keywords;
}
// Find the Adwords search string, null if it doesn't exist
// http://www.tulos.fi/en/exact-adwords-keywords-google-analytics/
function findReferrerSearchQuery() {
	return findSearchQuery(document.referrer);
}

function findHighestZIndex(selector, excludeSelector) {
    var index_highest = {};
    index_highest.zIndex=0;
    index_highest.elementId="";
    index_highest.elementClass="";
    jq(selector).not(excludeSelector).each(
        function() {
            var index_current = parseInt(jq(this).css("z-index"), 10);
            if(index_current > index_highest.zIndex) {
                index_highest.zIndex = index_current;
                index_highest.elementId = this.id;
                index_highest.elementClass= jq(this).attr("class");
            }
        });
    return index_highest;
}

function parseUri(str) {
	var	o   = parseUri.options,
		m   = o.parser[o.strictMode ? "strict" : "loose"].exec(str),
		uri = {},
		i   = 14;

	while (i--) {
        uri[o.key[i]] = m[i] || "";
    }

	uri[o.q.name] = {};
	uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
		if ($1) {
            uri[o.q.name][$1] = $2;
        }
	});

	return uri;
}

parseUri.options = {
	strictMode: false,
	key: ["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],
	q:   {
		name:   "queryKey",
		parser: /(?:^|&)([^&=]*)=?([^&]*)/g
	},
	parser: {
		strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
		loose:  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
	}
};

function isRunningInIFrame(){
    try {
		if (urlParams.csIgnoreIframe) return false;
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}

function isPositiveInteger(x) {
    // http://stackoverflow.com/a/1019526/11236
    return (/^\d+$/).test(x);
}

/**
 * Compare two software version numbers (e.g. 1.7.1)
 * Returns:
 *
 *  0 if they're identical
 *  negative if v1 < v2
 *  positive if v1 > v2
 *  Nan if they in the wrong format
 *
 *  E.g.:
 *
 *  assert(version_number_compare("1.7.1", "1.6.10") > 0);
 *  assert(version_number_compare("1.7.1", "1.7.10") < 0);
 *
 *  "Unit tests": http://jsfiddle.net/ripper234/Xv9WL/27/
 *
 *  Taken from http://stackoverflow.com/a/6832721/11236
 */
function compareVersionNumbers(v1, v2){
    var v1parts = v1.split('.');
    var v2parts = v2.split('.');

    // First, validate both numbers are true version numbers
    function validateParts(parts) {
        for (var i = 0; i < parts.length; ++i) {
            if (!isPositiveInteger(parts[i])) {
                return false;
            }
        }
        return true;
    }
    if (!validateParts(v1parts) || !validateParts(v2parts)) {
        return NaN;
    }

    for (var i = 0; i < v1parts.length; ++i) {
        if (v2parts.length === i) {
            return 1;
        }

        if (v1parts[i] === v2parts[i]) {
            continue;
        }
        if (parseInt(v1parts[i], 10) > parseInt(v2parts[i], 10)) {
            return 1;
        }
        return -1;
    }

    if (v1parts.length != v2parts.length) {
        return -1;
    }

    return 0;
}

// Domain Public by Eric Wendelin http://eriwen.com/ (2008)
//                  Luke Smith http://lucassmith.name/ (2008)
//                  Loic Dachary <loic@dachary.org> (2008)
//                  Johan Euphrosine <proppy@aminche.com> (2008)
//                  Oyvind Sean Kinsey http://kinsey.no/blog (2010)
//                  Victor Homyakov <victor-homyakov@users.sourceforge.net> (2010)

/**
 * Main function giving a function stack trace with a forced or passed in Error
 *
 * @cfg {Error} e The error to create a stacktrace from (optional)
 * @cfg {Boolean} guess If we should try to resolve the names of anonymous functions
 * @return {Array} of Strings with functions, lines, files, and arguments where possible
 */
function printStackTrace(options) {
    options = options || {guess: true};
    var ex = options.e || null, guess = !!options.guess;
    var p = new printStackTrace.implementation(), result = p.run(ex);
    return (guess) ? p.guessAnonymousFunctions(result) : result;
}

printStackTrace.implementation = function() {
};

printStackTrace.implementation.prototype = {
    /**
     * @param {Error} ex The error to create a stacktrace from (optional)
     * @param {String} mode Forced mode (optional, mostly for unit tests)
     */
    run: function(ex, mode) {
        ex = ex || this.createException();
        // examine exception properties w/o debugger
        //for (var prop in ex) {alert("Ex['" + prop + "']=" + ex[prop]);}
        mode = mode || this.mode(ex);
        if (mode === 'other') {
            return this.other(arguments.callee);
        } else {
            return this[mode](ex);
        }
    },

    createException: function() {
        try {
            this.undef();
        } catch (e) {
            return e;
        }
    },

    /**
     * Mode could differ for different exception, e.g.
     * exceptions in Chrome may or may not have arguments or stack.
     *
     * @return {String} mode of operation for the exception
     */
    mode: function(e) {
        if (e['arguments'] && e.stack) {
            return 'chrome';
        } else if (e.stack && e.sourceURL) {
            return 'safari';
        } else if (typeof e.message === 'string' && typeof window !== 'undefined' && window.opera) {
            // e.message.indexOf("Backtrace:") > -1 -> opera
            // !e.stacktrace -> opera
            if (!e.stacktrace) {
                return 'opera9'; // use e.message
            }
            // 'opera#sourceloc' in e -> opera9, opera10a
            if (e.message.indexOf('\n') > -1 && e.message.split('\n').length > e.stacktrace.split('\n').length) {
                return 'opera9'; // use e.message
            }
            // e.stacktrace && !e.stack -> opera10a
            if (!e.stack) {
                return 'opera10a'; // use e.stacktrace
            }
            // e.stacktrace && e.stack -> opera10b
            if (e.stacktrace.indexOf("called from line") < 0) {
                return 'opera10b'; // use e.stacktrace, format differs from 'opera10a'
            }
            // e.stacktrace && e.stack -> opera11
            return 'opera11'; // use e.stacktrace, format differs from 'opera10a', 'opera10b'
        } else if (e.stack) {
            return 'firefox';
        }
        return 'other';
    },

    /**
     * Given a context, function name, and callback function, overwrite it so that it calls
     * printStackTrace() first with a callback and then runs the rest of the body.
     *
     * @param {Object} context of execution (e.g. window)
     * @param {String} functionName to instrument
     * @param {Function} function to call with a stack trace on invocation
     */
    instrumentFunction: function(context, functionName, callback) {
        context = context || window;
        var original = context[functionName];
        context[functionName] = function instrumented() {
            callback.call(this, printStackTrace().slice(4));
            return context[functionName]._instrumented.apply(this, arguments);
        };
        context[functionName]._instrumented = original;
    },

    /**
     * Given a context and function name of a function that has been
     * instrumented, revert the function to it's original (non-instrumented)
     * state.
     *
     * @param {Object} context of execution (e.g. window)
     * @param {String} functionName to de-instrument
     */
    deinstrumentFunction: function(context, functionName) {
        if (context[functionName].constructor === Function &&
            context[functionName]._instrumented &&
            context[functionName]._instrumented.constructor === Function) {
            context[functionName] = context[functionName]._instrumented;
        }
    },

    /**
     * Given an Error object, return a formatted Array based on Chrome's stack string.
     *
     * @param e - Error object to inspect
     * @return Array<String> of function calls, files and line numbers
     */
    chrome: function(e) {
        var stack = (e.stack + '\n').replace(/^\S[^\(]+?[\n$]/gm, '').
            replace(/^\s+(at eval )?at\s+/gm, '').
            replace(/^([^\(]+?)([\n$])/gm, '{anonymous}()@$1$2').
            replace(/^Object.<anonymous>\s*\(([^\)]+)\)/gm, '{anonymous}()@$1').split('\n');
        stack.pop();
        return stack;
    },

    /**
     * Given an Error object, return a formatted Array based on Safari's stack string.
     *
     * @param e - Error object to inspect
     * @return Array<String> of function calls, files and line numbers
     */
    safari: function(e) {
        return e.stack.replace(/\[native code\]\n/m, '').replace(/^@/gm, '{anonymous}()@').split('\n');
    },

    /**
     * Given an Error object, return a formatted Array based on Firefox's stack string.
     *
     * @param e - Error object to inspect
     * @return Array<String> of function calls, files and line numbers
     */
    firefox: function(e) {
        return e.stack.replace(/(?:\n@:0)?\s+$/m, '').replace(/^[\(@]/gm, '{anonymous}()@').split('\n');
    },

    opera11: function(e) {
        var ANON = '{anonymous}', lineRE = /^.*line (\d+), column (\d+)(?: in (.+))? in (\S+):$/;
        var lines = e.stacktrace.split('\n'), result = [];

        for (var i = 0, len = lines.length; i < len; i += 2) {
            var match = lineRE.exec(lines[i]);
            if (match) {
                var location = match[4] + ':' + match[1] + ':' + match[2];
                var fnName = match[3] || "global code";
                fnName = fnName.replace(/<anonymous function: (\S+)>/, "$1").replace(/<anonymous function>/, ANON);
                result.push(fnName + '@' + location + ' -- ' + lines[i + 1].replace(/^\s+/, ''));
            }
        }

        return result;
    },

    opera10b: function(e) {
        // "<anonymous function: run>([arguments not available])@file://localhost/G:/js/stacktrace.js:27\n" +
        // "printStackTrace([arguments not available])@file://localhost/G:/js/stacktrace.js:18\n" +
        // "@file://localhost/G:/js/test/functional/testcase1.html:15"
        var lineRE = /^(.*)@(.+):(\d+)$/;
        var lines = e.stacktrace.split('\n'), result = [];

        for (var i = 0, len = lines.length; i < len; i++) {
            var match = lineRE.exec(lines[i]);
            if (match) {
                var fnName = match[1]? (match[1] + '()') : "global code";
                result.push(fnName + '@' + match[2] + ':' + match[3]);
            }
        }

        return result;
    },

    /**
     * Given an Error object, return a formatted Array based on Opera 10's stacktrace string.
     *
     * @param e - Error object to inspect
     * @return Array<String> of function calls, files and line numbers
     */
    opera10a: function(e) {
        // "  Line 27 of linked script file://localhost/G:/js/stacktrace.js\n"
        // "  Line 11 of inline#1 script in file://localhost/G:/js/test/functional/testcase1.html: In function foo\n"
        var ANON = '{anonymous}', lineRE = /Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i;
        var lines = e.stacktrace.split('\n'), result = [];

        for (var i = 0, len = lines.length; i < len; i += 2) {
            var match = lineRE.exec(lines[i]);
            if (match) {
                var fnName = match[3] || ANON;
                result.push(fnName + '()@' + match[2] + ':' + match[1] + ' -- ' + lines[i + 1].replace(/^\s+/, ''));
            }
        }

        return result;
    },

    // Opera 7.x-9.2x only!
    opera9: function(e) {
        // "  Line 43 of linked script file://localhost/G:/js/stacktrace.js\n"
        // "  Line 7 of inline#1 script in file://localhost/G:/js/test/functional/testcase1.html\n"
        var ANON = '{anonymous}', lineRE = /Line (\d+).*script (?:in )?(\S+)/i;
        var lines = e.message.split('\n'), result = [];

        for (var i = 2, len = lines.length; i < len; i += 2) {
            var match = lineRE.exec(lines[i]);
            if (match) {
                result.push(ANON + '()@' + match[2] + ':' + match[1] + ' -- ' + lines[i + 1].replace(/^\s+/, ''));
            }
        }

        return result;
    },

    // Safari 5-, IE 9-, and others
    other: function(curr) {
        var ANON = '{anonymous}', fnRE = /function\s*([\w\-$]+)?\s*\(/i, stack = [], fn, args, maxStackSize = 10;
        while (curr && curr['arguments'] && stack.length < maxStackSize) {
            fn = fnRE.test(curr.toString()) ? RegExp.$1 || ANON : ANON;
            args = Array.prototype.slice.call(curr['arguments'] || []);
            stack[stack.length] = fn + '(' + this.stringifyArguments(args) + ')';
            curr = curr.caller;
        }
        return stack;
    },

    /**
     * Given arguments array as a String, subsituting type names for non-string types.
     *
     * @param {Arguments} args
     * @return {Array} of Strings with stringified arguments
     */
    stringifyArguments: function(args) {
        var result = [];
        var slice = Array.prototype.slice;
        for (var i = 0; i < args.length; ++i) {
            var arg = args[i];
            if (arg === undefined) {
                result[i] = 'undefined';
            } else if (arg === null) {
                result[i] = 'null';
            } else if (arg.constructor) {
                if (arg.constructor === Array) {
                    if (arg.length < 3) {
                        result[i] = '[' + this.stringifyArguments(arg) + ']';
                    } else {
                        result[i] = '[' + this.stringifyArguments(slice.call(arg, 0, 1)) + '...' + this.stringifyArguments(slice.call(arg, -1)) + ']';
                    }
                } else if (arg.constructor === Object) {
                    result[i] = '#object';
                } else if (arg.constructor === Function) {
                    result[i] = '#function';
                } else if (arg.constructor === String) {
                    result[i] = '"' + arg + '"';
                } else if (arg.constructor === Number) {
                    result[i] = arg;
                }
            }
        }
        return result.join(',');
    },

    sourceCache: {},

    /**
     * @return the text from a given URL
     */
    ajax: function(url) {
        var req = this.createXMLHTTPObject();
        if (req) {
            try {
                req.open('GET', url, false);
                //req.overrideMimeType('text/plain');
                //req.overrideMimeType('text/javascript');
                req.send(null);
                //return req.status == 200 ? req.responseText : '';
                return req.responseText;
            } catch (e) {
            }
        }
        return '';
    },

    /**
     * Try XHR methods in order and store XHR factory.
     *
     * @return <Function> XHR function or equivalent
     */
    createXMLHTTPObject: function() {
        var xmlhttp, XMLHttpFactories = [
            function() {
                return new XMLHttpRequest();
            }, function() {
                return new ActiveXObject('Msxml2.XMLHTTP');
            }, function() {
                return new ActiveXObject('Msxml3.XMLHTTP');
            }, function() {
                return new ActiveXObject('Microsoft.XMLHTTP');
            }
        ];
        for (var i = 0; i < XMLHttpFactories.length; i++) {
            try {
                xmlhttp = XMLHttpFactories[i]();
                // Use memoization to cache the factory
                this.createXMLHTTPObject = XMLHttpFactories[i];
                return xmlhttp;
            } catch (e) {
            }
        }
    },

    /**
     * Given a URL, check if it is in the same domain (so we can get the source
     * via Ajax).
     *
     * @param url <String> source url
     * @return False if we need a cross-domain request
     */
    isSameDomain: function(url) {
        return typeof location !== "undefined" && url.indexOf(location.hostname) !== -1; // location may not be defined, e.g. when running from nodejs.
    },

    /**
     * Get source code from given URL if in the same domain.
     *
     * @param url <String> JS source URL
     * @return <Array> Array of source code lines
     */
    getSource: function(url) {
        // TODO reuse source from script tags?
        if (!(url in this.sourceCache)) {
            this.sourceCache[url] = this.ajax(url).split('\n');
        }
        return this.sourceCache[url];
    },

    guessAnonymousFunctions: function(stack) {
        for (var i = 0; i < stack.length; ++i) {
            var reStack = /\{anonymous\}\(.*\)@(.*)/,
                reRef = /^(.*?)(?::(\d+))(?::(\d+))?(?: -- .+)?$/,
                frame = stack[i], ref = reStack.exec(frame);

            if (ref) {
                var m = reRef.exec(ref[1]);
                if (m) { // If falsey, we did not get any file/line information
                    var file = m[1], lineno = m[2], charno = m[3] || 0;
                    if (file && this.isSameDomain(file) && lineno) {
                        var functionName = this.guessAnonymousFunction(file, lineno, charno);
                        stack[i] = frame.replace('{anonymous}', functionName);
                    }
                }
            }
        }
        return stack;
    },

    guessAnonymousFunction: function(url, lineNo, charNo) {
        var ret;
        try {
            ret = this.findFunctionName(this.getSource(url), lineNo);
        } catch (e) {
            ret = 'getSource failed with url: ' + url + ', exception: ' + e.toString();
        }
        return ret;
    },

    findFunctionName: function(source, lineNo) {
        // FIXME findFunctionName fails for compressed source
        // (more than one function on the same line)
        // TODO use captured args
        // function {name}({args}) m[1]=name m[2]=args
        var reFunctionDeclaration = /function\s+([^(]*?)\s*\(([^)]*)\)/;
        // {name} = function ({args}) TODO args capture
        // /['"]?([0-9A-Za-z_]+)['"]?\s*[:=]\s*function(?:[^(]*)/
        var reFunctionExpression = /['"]?([0-9A-Za-z_]+)['"]?\s*[:=]\s*function\b/;
        // {name} = eval()
        var reFunctionEvaluation = /['"]?([0-9A-Za-z_]+)['"]?\s*[:=]\s*(?:eval|new Function)\b/;
        // Walk backwards in the source lines until we find
        // the line which matches one of the patterns above
        var code = "", line, maxLines = Math.min(lineNo, 20), m, commentPos;
        for (var i = 0; i < maxLines; ++i) {
            // lineNo is 1-based, source[] is 0-based
            line = source[lineNo - i - 1];
            commentPos = line.indexOf('//');
            if (commentPos >= 0) {
                line = line.substr(0, commentPos);
            }
            // TODO check other types of comments? Commented code may lead to false positive
            if (line) {
                code = line + code;
                m = reFunctionExpression.exec(code);
                if (m && m[1]) {
                    return m[1];
                }
                m = reFunctionDeclaration.exec(code);
                if (m && m[1]) {
                    //return m[1] + "(" + (m[2] || "") + ")";
                    return m[1];
                }
                m = reFunctionEvaluation.exec(code);
                if (m && m[1]) {
                    return m[1];
                }
            }
        }
        return '(?)';
    }
};

/**
 * Try to run the callback until it succeeds (returns truthy)
 * If it fails, it is rescheduled (a total of n times) until it succeeds or retries expire.
 *
 * This can be useful for stuff like "waiting" for external scripts to load
 */
function tryNTimes(callback, n, delayMillis, opt_giveUpCallback) {
    assert(jq.isFunction(callback), "Bad callback");
    assert(n >= 1);

    if (callback()) {
        // No retries needed
        return;
    }
    if (n === 1) {
        // Give up
        if (jq.isFunction(opt_giveUpCallback)) {
            opt_giveUpCallback();
        }
        return;
    }

    setTimeout(function(){
        tryNTimes(callback, n-1, delayMillis, opt_giveUpCallback);
    }, delayMillis);
}

function isUndefined(obj) {
    // From underscore.js
    return obj === void 0;
}

function assert(condition, msg) {
    if (!condition) {
        $.error(msg);
    }
}
// Similar functionality to jQuery.extend. Here so we can access it before jq loads
// implementation taken from: http://stackoverflow.com/questions/11197247/javascript-equivalent-of-jquerys-extend-method/11197343#11197343
function extend(){
	for(var i=1; i<arguments.length; i++)
		for(var key in arguments[i])
			if(arguments[i].hasOwnProperty(key))
				arguments[0][key] = arguments[i][key];
	return arguments[0];
}

/**
 * Created by Eyal on 28/03/2016.
 */


var TimeUtils = new function() {

    // compare two times in the HH:MM string format. Also accepts hh:mm:ss or hh:mmAM/PM etc.
    this.isTimeGreaterThan = function(t1, t2) {
        try {
            t1_2000 = Date.parse("2000/01/01 "+t1);
            t2_2000 = Date.parse("2000/01/01 "+t2);
            return t1_2000 > t2_2000;
        } catch (e) {
            logError("TimeUtils.isTimeGreaterThan: error comparing tims: ("+ t1 +"," + t2 + ") " + e.name);
        }
    };

    this.currentWebsiteTimeOfDay = function() {
        function leadingZero(str) {
            return ("00" + str).slice(-2);
        }
        try {
            var currentDate = new Date();
            var offset = (isNaN(parseFloat(websiteTimezoneOffset)) ? 0 : parseFloat(websiteTimezoneOffset)) + this.getStoreDSTOffset();
            currentDate.setHours(currentDate.getUTCHours() + offset);
            var currentStoreDate = currentDate;
            return leadingZero(currentStoreDate.getHours()) + ":" + leadingZero(currentStoreDate.getMinutes()) + ":" + leadingZero(currentStoreDate.getSeconds());
        } catch (e) {
            logError("TimeUtils.currentWebsiteTimeOfDay: error retrieving store time userDate=" + currentDate() + " websiteTimezoneOffset =" + websiteTimezoneOffset + e.name);
        }
    };

    this.getStoreDSTOffset = function () {
        return 1; // TODO = fix this to use dstNextTransitions[] once that value is properly passed to the widget
    };


};

function initLanguageMgr (languagePack, defaultPack) {
	languagePack = languagePack || {};
	defaultPack = defaultPack || {};
	var reportedErrors = {missing: [], incomplete: []};	// prevents the same error from being reported multiple times.
	return {
		get: function get(key, replacements) {
			replacements = replacements ||[];
			if (typeof("replacements")==="string") {
				replacements = [replacements];
			}
			var result = languagePack[key];
			if (result===undefined) {	// don't fall back to default language if encountered an empty key(only fall back on missing key)
				result = defaultPack[key];
			}
			if (result!==undefined) {
				for (var i=0; i<replacements.length; i++) {
					result = result.replace("{"+i+"}", replacements[i]);
				}
				// If some placeholders weren't replaced, report on incomplete translation
				if (result.match(/\{\d{1,}\}/)) {
					if (reportedErrors.incomplete[key]===undefined) {
						reportedErrors.incomplete[key] = true;
						logError("Incomplete translation:["+key+"]. Output translation:["+result+"]");
					}
				}
			} else {
				result = "";
				// report on missing translation (once per key)
				if (reportedErrors.missing[key] === undefined) {
					reportedErrors.missing[key] = true;
					logError("Missing translation key:["+key+"]", null);
				}
			}
			return result;
		},
		set: function set(key, value) {
			if (key && value) {
				languagePack[key] = value;
			} else {
				logError("LanguageMgr.Set invalid input. Key:["+key+"] Value:["+value+"]", null);
			}
		}
	};
}


function isMultipartCookie(value) {
	return value && value.indexOf("multipart-") === 0;
}

function getMultipartCookieSize(value) {
	return value ? value.substr(value.indexOf("-")+1) : 0;
}

function getMultipartCookieName(c_name, index) {
	return c_name+"_"+index;
}

function deleteMultipartCookie(c_name, value) {
	var parts = getMultipartCookieSize(value);
	for (var pi=1;pi<=parts;pi++) {
		clearCookie(getMultipartCookieName(c_name, pi));
	}
}

function verifyCsCookiesLength(c_name, c_value) {
    // make sure verification is needed and that it is not reported already on this page
    if (reportedOnUnhealthyCookiesState) { return; }
    // no need to check if all we set is a number (probably counters update, not really interesting)
    if (isNumber(c_value)) { return; }

    var i, name, value, totalLength=0, totalCookies= 0, errors=0, errorSummary="", cookies=document.cookie.split(";");
    for (i=0; i < cookies.length; i++) {
        name = cookies[i].substr(0, cookies[i].indexOf("="));
        value = cookies[i].substr(cookies[i].indexOf("=")+1);
        name = name.replace(/^\s+|\s+$/g,"");
        if (name.indexOf("_cs_") !== 0) {
            continue;
        }

        totalLength += value.length;
        totalCookies++;

        // validate single cookie length
        var oldCookieMaxLength = 2900; // 2900 is the old number to break cookies, keeping it for backward compatibility (reduce noise) -- orene 17/11/2013
        if (value && value.length > cookieLengthLimit && value.length !== oldCookieMaxLength) {
            errorSummary+="Cookie=" + name + " length=" + value.length + ", max=" + cookieLengthLimit + " ";
            errors++;
        }
    }

    // validate all of our cookies (together) length
    if (totalLength > totalCookieLengthLimit) {
        errorSummary+="Total cookies length=" + totalLength + ", max=" + totalCookieLengthLimit + " ";
        errors++;
    }
    // validate that the number of cookies we use is under the threshold
    if (totalCookies > totalCookieLimit) {
        errorSummary+="Total cookies=" + totalCookies + ", max=" + totalCookieLimit + " ";
        errors++;
    }

    if (errors > 0) {
        reportedOnUnhealthyCookiesState = true; // to avoid loops where logError would trigger more verification.
        logError(errors + " cookie verification errors: " + errorSummary);
    }
    //logDebug("Cookies verification ("+totalCookies+" with "+totalLength+" characters) found " + errors + " errors.");
}

/**
 * A hook function that can be overridden to specify the site cookie name prefix
 * Usable if there are site with same domain/subdomain (example: rtba.co and blog.rtba.co
 */
function getCookieNamePrefix() {
    return "";
}

/**
 * Get a cookie, return null if it doesn't exist
 */
function getCookie(c_name, decode, getRaw) {
    c_name = getCookieNamePrefix() + c_name;
	if (decode===undefined) {
		decode = true;
	}
	if (getRaw===undefined) {
		getRaw = false;
	}
	var i, name, value, cookies=document.cookie.split(";");
	for (i=0; i < cookies.length; i++) {
		name = cookies[i].substr(0, cookies[i].indexOf("="));
		value = cookies[i].substr(cookies[i].indexOf("=")+1);
		name = name.replace(/^\s+|\s+$/g,"");
		if (name !== c_name) {
            continue;
        }

        try {
            // backward compatibility handling (when we encoded and then compressed the cookie value):
            if (value && value.indexOf("lzw:") === 0) {
                clearCookie(c_name);
                return null;
            }
            if (getRaw) {
                return value;
            }
            var decoded;
            if (isMultipartCookie(value)) {

                // multipart cookie
                var parts = getMultipartCookieSize(value);
                var aggregatedCookieValue = "";
                for (var pi=1;pi<=parts;pi++) {
                    aggregatedCookieValue += getCookie(getMultipartCookieName(c_name, pi), false);
                }
                decoded = decodeURIComponent(aggregatedCookieValue);
            } else {
                // regular cookie
                decoded = decode ? decodeURIComponent(value) : value;
            }
            // Check if it's json that needs to be parsed.
            if (decoded && decoded.indexOf("jn:")===0) {
                var valueObj = JSON.parse(decoded.substring("jn:".length));
                // The cookie contains instructions on how to call a function
                // that recreates the saved object. Call the function.
                if (valueObj && valueObj.regenFunc) {
                    var func = valueObj.regenFunc;
                    var args = valueObj.regenArgs;
                    var funcComponents = func.split(".");
                    var finalFunc = uiAPI;	// Consider finding a better starting point than this.
                    for (var ii=0; ii<funcComponents.length; ii++) {
                        finalFunc = finalFunc[funcComponents[ii]];
                    }
					if (typeof(args)==="string") {
						args = JSON.parse(args);
					}
                    valueObj = finalFunc.apply(this, args);
                }
                return valueObj;
            }
            return decoded;
        } catch (ex) {
            logError("Was unable to decode the cookie '"+c_name+"' with value=" + value, ex);
            return null;
        }
	}
	return contextStorage ? contextStorage.getItem("cookie."+c_name) : null;
}

function setCookie(c_name, value, opt_exdays_duration, opt_domain, explicit_expire_date) {
    // add cookies that were before the .session. notation and must be stored as CD session objects
    var forceSessionCookies= [ckie_session_id , "addMoreHere"];
	// set a copy of the cookie in localStorage for cross-domain context preservation
	if (contextStorage) {
		contextStorage.onCacheReady().then(function () {
            try {
                var durationInMili = opt_exdays_duration ? opt_exdays_duration.totalSeconds * 1000 : false;
                if (c_name.indexOf(".session.")!==-1 || forceSessionCookies.indexOf && forceSessionCookies.indexOf(c_name) > -1 ) {
                    // if this is a session cookie, store as session expiration
                    durationInMili = false;
                }
                contextStorage.setItem("cookie." + c_name, (value===null) ? "null" : value.toString(), durationInMili);
            } catch(e) {
                logError("Failed to set cookie in contextStorage ["+c_name+":"+value+"]",e);
            }

    });
	}
    c_name = getCookieNamePrefix() + c_name;
	var expiresStr = "";
	if (opt_exdays_duration) {
		var exdate = new Date();
		exdate.setSeconds(exdate.getSeconds() + opt_exdays_duration.totalSeconds);
		expiresStr = "; expires=" + exdate.toUTCString();
	} else if (explicit_expire_date) {
        expiresStr = "; expires=" + explicit_expire_date;
    }

	if (!opt_domain) { // EB: by default, set cookies on base domain, ignoring known domain prefixes.
		opt_domain = ignoreKnownSubDomains(document.domain);
	}
	var tempValue = value;
    var origValue = value;
	if (value && typeof(value)==="object") {
		if (Object.prototype.toString.call(value)==="[object Object]") {
			try {
				if (value.regenFunc && value.regenArgs) {
					tempValue = {regenFunc:value.regenFunc, regenArgs:value.regenArgs};
				}
				tempValue = "jn:"+JSON.stringify(tempValue);
			} catch(e) {
				logError("Failed parsing object on cookie save:["+value+"]",e);
			}
		} else {
			// value is array, not yet supported.
			logError("Unable to set cookie when value is Array");
		}
	}
	value = tempValue;
	var encodedValue = encodeURIComponent(value);
	var cookieSuffix = ";path=/" + (opt_domain ? ";domain=" + opt_domain : "");

	// if the current cookie we're trying to set to contains a multipart-cookie, delete it first (to clear up garbage)
	cleanMultiparts(c_name);

	var c_value;
	if (encodedValue.length > cookieLengthLimit) {
		// we cannot set cookie with more than 3000 chars, see http://stackoverflow.com/questions/5381526/what-are-the-current-cookie-limits-in-modern-browsers
		// break it into multipart cookies
		var parts = Math.ceil(encodedValue.length / cookieLengthLimit);

		for (var i=1; i<=parts; i++) {
			var startIndex = (i - 1) * (cookieLengthLimit);
			var subValue = encodedValue.substr(startIndex, cookieLengthLimit);
			c_value = subValue + expiresStr + cookieSuffix;
			var cookieMultipartName = c_name + "_" + i;
			document.cookie=cookieMultipartName + "=" + c_value;
		}

		c_value = "multipart-"+parts + expiresStr + cookieSuffix;
		document.cookie=c_name + "=" + c_value;
	} else {

		// one single cookie suffice here
		c_value = encodedValue + expiresStr + cookieSuffix;
		document.cookie=c_name + "=" + c_value;
	}

    verifyCsCookiesLength(c_name, origValue);
}

function cleanMultiparts(c_name) {
	var header = getCookie(c_name, true, true);
	if (!isMultipartCookie(header)) {
        return;
    }

    deleteMultipartCookie(c_name, header);
}

function clearCookie(c_name) {
	setCookie(c_name, "", -1);
}

function incCookieValue(ckName) {
    var pageViewsState = getCookie(ckName);
    if (pageViewsState === null) {
        setCookie(ckName, 1);
    } else {
        setCookie(ckName, parseInt(pageViewsState, 10) + 1);
    }
}

/* generic utility functions for loading scripts  */

// Finds the URL of the current shopnips JS file.
// If the toolbar is loaded both from our domain and localhost
// the localhost version will be used
function findFunctionsUrl() {
    // This was based on ideas from http://stackoverflow.com/questions/984510/what-is-my-script-src-url
    // Changes were made to make it work when we're lazy-loading/injecting the script into the DOM.
    var scripts = document.getElementsByTagName('script');
    var i;
    var candidates = [];
    for (i = 0; i < scripts.length; ++i) {
        var script = scripts[i];
        var scriptUrl = getScriptUrl(script);
        // Any installation of the toolbar should be have a '/cs_all.js' file within a 'tbar' folder.
        if (typeof(scriptUrl) !== 'string')
            continue;

        // We support two naming conventions a.t.m.
        // TODO - migrate canaflora & weedecor to new style.
        if (scriptUrl.indexOf('cs_all.js') != -1 || // new style
            (scriptUrl.indexOf('tbar/') != -1 && scriptUrl.indexOf('/js/functions') != -1)) { // old style

            scriptUrl = scriptUrl.replace('//cdn-cs.com/', '//app.cdn-cs.com/'); // Fix broken tag references.
            candidates.push(scriptUrl);
        }
    }

    if (candidates.length === 0) {
        // Can happen for some IE 8 race conditions (e.g. http://www.mapleleash.com/)
        // We prefer to fallback on some same value rather than return undefined/null/throw
        return ((document.location.protocol == "https:") ? "https://" : "http://") + "app.cdn-cs.com/b/" + clientId + "/" + siteId + "/l/cs_all.js";
    }

    if (candidates.length === 1)
        return candidates[0];

    // Conflicts found.

    // If we have a specific version, prefer that
    var chosenIndex = findSubStringInArray("/ver/", candidates);
    if (chosenIndex != -1) {
        return candidates[chosenIndex];
    }

    // Next priority is /p/ over /l/
    chosenIndex = findSubStringInArray("/p/", candidates);
    if (chosenIndex != -1) {
        return candidates[chosenIndex];
    }

    // Otherwise, see if there's a match to the clientId/siteId that's in this file -
    // EB - added for case when empty tag file before our real tag caused us to load the CSS relative to the wrong empty tag
    chosenIndex = findSubStringInArray(clientId + "/" + siteId, candidates);
    if (chosenIndex != -1) {
        return candidates[chosenIndex];
    }

    // Otherwise, take any (fallback)
    return candidates[0];
}

function loadjscssfile(filename, filetype){
    var fileref;
    if (filetype=="js"){ //if filename is a external JavaScript file
        fileref = document.createElement('script');
        fileref.setAttribute("type","text/javascript");
        fileref.setAttribute("src", filename);
        fileref.setAttribute("async", true);
    } else if (filetype=="css"){ //if filename is an external CSS file
        fileref = document.createElement("link");
        fileref.setAttribute("rel", "stylesheet");
        fileref.setAttribute("type", "text/css");
        fileref.setAttribute("href", filename);
    }

    if (typeof fileref != "undefined") {
        document.getElementsByTagName("head")[0].appendChild(fileref);
    }
}

function add_script(scriptURL, onloadCB) {
    // TODO Ron Gross 24/10/2012 - currently on some browsers (e.g. IE8), onloadCB can be called also on 404
    // We need to add a parameter to it that tells it whether the script was loaded successfully or not.

  var called;
  var scriptEl    = document.createElement("script");
  scriptEl.type   = "text/javascript";
  scriptEl.src    = scriptURL;
  scriptEl.async  = true;

  function calltheCBcmn() {
      if (onloadCB) {
        onloadCB(scriptURL);
      }
  }

  if(typeof(scriptEl.addEventListener) != 'undefined') {
	/* The FF, Chrome, Safari, Opera way */
	scriptEl.addEventListener('load',calltheCBcmn,false);
  }
  else {
      // MS IE 8+
      // TODO - test with previous versions
      // Make sure to prevent double invocations
      called = false;
      scriptEl.attachEvent('onreadystatechange', function() {
          if (called) {
              return;
          }
          if (scriptEl.readyState == 'loaded' || scriptEl.readyState == 'complete') {
              called = true;
              calltheCBcmn();
          }
      });
  }
  document.getElementsByTagName("head")[0].appendChild(scriptEl);
}

function getScriptUrl(scriptTag) {
	if (scriptTag.getAttribute.length !== undefined) {
        return scriptTag.src;
    }
    return scriptTag.getAttribute('src', -1);
}

//     uuid.js
//
//     Copyright (c) 2010-2012 Robert Kieffer
//     MIT License - http://opensource.org/licenses/mit-license.php

(function() {
    var _global = this;

    // Unique ID creation requires a high quality random # generator.  We feature
    // detect to determine the best RNG source, normalizing to a function that
    // returns 128-bits of randomness, since that's what's usually required
    var _rng;

    // Node.js crypto-based RNG - http://nodejs.org/docs/v0.6.2/api/crypto.html
    //
    // Moderately fast, high quality
    if (typeof(require) == 'function') {
        try {
            var _rb = require('crypto').randomBytes;
            _rng = _rb && function() {return _rb(16);};
        } catch(e) {}
    }

    if (!_rng && _global.crypto && crypto.getRandomValues) {
        // WHATWG crypto-based RNG - http://wiki.whatwg.org/wiki/Crypto
        //
        // Moderately fast, high quality
        var _rnds8 = new Uint8Array(16);
        _rng = function whatwgRNG() {
            crypto.getRandomValues(_rnds8);
            return _rnds8;
        };
    }

    if (!_rng) {
        // Math.random()-based (RNG)
        //
        // If all else fails, use Math.random().  It's fast, but is of unspecified
        // quality.
        var  _rnds = new Array(16);
        _rng = function() {
            for (var i = 0, r; i < 16; i++) {
                if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
                _rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
            }

            return _rnds;
        };
    }

    // Buffer class to use
    var BufferClass = typeof(Buffer) == 'function' ? Buffer : Array;

    // Maps for number <-> hex string conversion
    var _byteToHex = [];
    var _hexToByte = {};
    for (var i = 0; i < 256; i++) {
        _byteToHex[i] = (i + 0x100).toString(16).substr(1);
        _hexToByte[_byteToHex[i]] = i;
    }

    // **`parse()` - Parse a UUID into it's component bytes**
    function parse(s, buf, offset) {
        var i = (buf && offset) || 0, ii = 0;

        buf = buf || [];
        s.toLowerCase().replace(/[0-9a-f]{2}/g, function(oct) {
            if (ii < 16) { // Don't overflow!
                buf[i + ii++] = _hexToByte[oct];
            }
        });

        // Zero out remaining bytes if string was short
        while (ii < 16) {
            buf[i + ii++] = 0;
        }

        return buf;
    }

    // **`unparse()` - Convert UUID byte array (ala parse()) into a string**
    function unparse(buf, offset) {
        var i = offset || 0, bth = _byteToHex;
        return  bth[buf[i++]] + bth[buf[i++]] +
            bth[buf[i++]] + bth[buf[i++]] + '-' +
            bth[buf[i++]] + bth[buf[i++]] + '-' +
            bth[buf[i++]] + bth[buf[i++]] + '-' +
            bth[buf[i++]] + bth[buf[i++]] + '-' +
            bth[buf[i++]] + bth[buf[i++]] +
            bth[buf[i++]] + bth[buf[i++]] +
            bth[buf[i++]] + bth[buf[i++]];
    }

    // **`v1()` - Generate time-based UUID**
    //
    // Inspired by https://github.com/LiosK/UUID.js
    // and http://docs.python.org/library/uuid.html

    // random #'s we need to init node and clockseq
    var _seedBytes = _rng();

    // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
    var _nodeId = [
        _seedBytes[0] | 0x01,
        _seedBytes[1], _seedBytes[2], _seedBytes[3], _seedBytes[4], _seedBytes[5]
    ];

    // Per 4.2.2, randomize (14 bit) clockseq
    var _clockseq = (_seedBytes[6] << 8 | _seedBytes[7]) & 0x3fff;

    // Previous uuid creation time
    var _lastMSecs = 0, _lastNSecs = 0;

    // See https://github.com/broofa/node-uuid for API details
    function v1(options, buf, offset) {
        var i = buf && offset || 0;
        var b = buf || [];

        options = options || {};

        var clockseq = options.clockseq !== null ? options.clockseq : _clockseq;

        // UUID timestamps are 100 nano-second units since the Gregorian epoch,
        // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
        // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
        // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
        var msecs = options.msecs !== null ? options.msecs : new Date().getTime();

        // Per 4.2.1.2, use count of uuid's generated during the current clock
        // cycle to simulate higher resolution clock
        var nsecs = options.nsecs !== null ? options.nsecs : _lastNSecs + 1;

        // Time since last uuid creation (in msecs)
        var dt = (msecs - _lastMSecs) + (nsecs - _lastNSecs)/10000;

        // Per 4.2.1.2, Bump clockseq on clock regression
        if (dt < 0 && options.clockseq === null) {
            clockseq = clockseq + 1 & 0x3fff;
        }

        // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
        // time interval
        if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === null) {
            nsecs = 0;
        }

        // Per 4.2.1.2 Throw error if too many uuids are requested
        if (nsecs >= 10000) {
            throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
        }

        _lastMSecs = msecs;
        _lastNSecs = nsecs;
        _clockseq = clockseq;

        // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
        msecs += 12219292800000;

        // `time_low`
        var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
        b[i++] = tl >>> 24 & 0xff;
        b[i++] = tl >>> 16 & 0xff;
        b[i++] = tl >>> 8 & 0xff;
        b[i++] = tl & 0xff;

        // `time_mid`
        var tmh = (msecs / 0x100000000 * 10000) & 0xfffffff;
        b[i++] = tmh >>> 8 & 0xff;
        b[i++] = tmh & 0xff;

        // `time_high_and_version`
        b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
        b[i++] = tmh >>> 16 & 0xff;

        // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
        b[i++] = clockseq >>> 8 | 0x80;

        // `clock_seq_low`
        b[i++] = clockseq & 0xff;

        // `node`
        var node = options.node || _nodeId;
        for (var n = 0; n < 6; n++) {
            b[i + n] = node[n];
        }

        return buf ? buf : unparse(b);
    }

    // **`v4()` - Generate random UUID**

    // See https://github.com/broofa/node-uuid for API details
    function v4(options, buf, offset) {
        // Deprecated - 'format' argument, as supported in v1.2
        var i = buf && offset || 0;

        if (typeof(options) == 'string') {
            buf = options == 'binary' ? new BufferClass(16) : null;
            options = null;
        }
        options = options || {};

        var rnds = options.random || (options.rng || _rng)();

        // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
        rnds[6] = (rnds[6] & 0x0f) | 0x40;
        rnds[8] = (rnds[8] & 0x3f) | 0x80;

        // Copy bytes to buffer, if provided
        if (buf) {
            for (var ii = 0; ii < 16; ii++) {
                buf[i + ii] = rnds[ii];
            }
        }

        return buf || unparse(rnds);
    }

    // Export public API
    var uuid = v4;
    uuid.v1 = v1;
    uuid.v4 = v4;
    uuid.parse = parse;
    uuid.unparse = unparse;
    uuid.BufferClass = BufferClass;


	// Publish as global (in browsers)
	var _previousRoot = _global.uuid;

	// **`noConflict()` - (browser only) to reset global 'uuid' var**
	uuid.noConflict = function() {
		_global.uuid = _previousRoot;
		return uuid;
	};
	_global.uuid = uuid;
}());

function doBlink(obj,start,finish,speed) {
    jq(obj).fadeOut(speed).fadeIn(speed);
    if(start!=finish) {
        start=start+1;
        doBlink(obj,start,finish,speed);
    }
}

var StyledTTips = new function() {
	// globals for ttip module
	var my$;
	var myOptions = {};
	var smtTip;
	var smtTipText;
	var smtTipNub;
	var smtMouseCoordsX;
	var smtMouseCoordsY;
	var smtTip_delay;
	var hideTTipInterval = 0;
	var restoreTitleElement=null;
	var hideTimeout=null;
	var that = this;

	function smtMouseMove(e){
		smtMouseCoordsX=e.pageX;
		smtMouseCoordsY=e.pageY;
		smtTipPosition();
	}

	this.hideTooltipForElement = function hideTooltipForElement(element, fadeSpeed) {
		if (!element || !element.length) {
			return;
		}
		that.hideTooltip(fadeSpeed);
		element.attr("title", element.data("smtTitle")); //add back title
		if (restoreTitleElement) {
			restoreTitleElement.attr("title", restoreTitleElement.data("smtTitle")); //add back title
			restoreTitleElement = null;
		}
	};

	this.hideTooltip = function hideTooltip(fadeSpeed) {
		if (!smtTip) return;
		if (hideTimeout)
			clearTimeout(hideTimeout);
		if(smtTip.is(":animated")){
			smtTip.hide();
		} else {
			smtTip.css("cursor", "auto");
			smtTip.fadeTo(fadeSpeed, 0, function () {
				smtTip.hide();}
			);
		}
		smtTip.off("click");
	};
	
	// EB: manually invoke a tooltip for an element, without the mouse hovering over it.
	this.showTooltipForElement = function showTooltipForElement(element, delay, duration, fadeSpeed, optionalMessage, positionOffset) {
		if (!element || !element.length || !element.is(":visible")) {
			return;
		}

		if (restoreTitleElement) {
			StyledTTips.hideTooltipForElement(restoreTitleElement,"fast");
			restoreTitleElement=null;
		}
		if (element.hasClass('cs-tooltip-disabled')){
			return;
		}
		if (!smtTipText) return;
		smtTip.stop();
		element.data("smtTitle", element.attr("title"));  // save aside the element title
		var theTitle = ((optionalMessage && optionalMessage.length>0) ? optionalMessage : element.data("smtTitle")); // get title from the element or from parameter optionalMessage
		element.attr("title", ""); //remove title to prevent native tooltip showing
		restoreTitleElement = element; // for restoring the title if another tooltip is activated (e.g. hovered) while this one is shown
		smtTipText.empty().append(theTitle); //set tooltip text
		smtTip.hide(); // hide the tooltip
		StyledTTips.smtFixedPosition(element, positionOffset);
		smtTip_delay = setTimeout(smtTip_fadeIn, delay); //set tooltip delay
		
		hideTimeout = setTimeout(function() {
				clearTimeout(smtTip_delay);
				StyledTTips.hideTooltipForElement(element,fadeSpeed);
			},duration);
	};


	this.smtFixedPosition = function(element, positionOffset){
		positionOffset = positionOffset || {left:0, top:0};
        // send t-tip to no mans land so that it doesn't break, add scrolls etc. and mess up the position calculation
        smtTip.css("left",-1000);
        smtTip.css("top",-1000);
        var position = element.offset();
		if (!position) return;	// some elements (window!) return null for offset(). Sanity check is required.
        smtMouseCoordsX = position.left + element.outerWidth(true)/2 + positionOffset.left - my$(window).scrollLeft();

        smtMouseCoordsY = position.top + 18 + positionOffset.top;

        // fix for jQuery bug offset() when html, body elements has 'height: 100%'. e.g. http://www.brilliancenewyork.com
        smtMouseCoordsY -= my$(window).scrollTop();

        smtTipPosition();
	};

	function smtTipPosition(){
		var cursor_tip_margin_x=-24; //horizontal space between the cursor and tooltip
		var cursor_tip_margin_y=-24; //vertical space between the cursor and tooltip
		smtTipNub.css("margin","0"); // zero the num width so it doesn't affect calculations
		var leftOffset=smtMouseCoordsX+cursor_tip_margin_x+my$(smtTip).outerWidth(true);
		var topOffset=smtMouseCoordsY+cursor_tip_margin_y-my$(smtTip).outerHeight(true);
        var theNubPos;
		if(leftOffset<=my$(window).width()){
			var leftPos = Math.max(5, smtMouseCoordsX+cursor_tip_margin_x);
			smtTip.css("left", leftPos);
			theNubPos = -cursor_tip_margin_x-5;
			smtTipNub.css("margin-left",theNubPos+"px");
		} else {
			var thePosX=smtMouseCoordsX-(cursor_tip_margin_x)-my$(smtTip).width();
			smtTip.css("left",thePosX);
			theNubPos=my$(smtTip).width()+cursor_tip_margin_x-5;
			smtTipNub.css("margin-left",theNubPos+"px");
		}
		if(topOffset>=0){
			smtTip.css("top",topOffset);
		} else {
			var thePosY=smtMouseCoordsY-(cursor_tip_margin_y);
			smtTip.css("top",thePosY);
		}
	}

	function smtTip_fadeIn(){
		clearTimeout(smtTip_delay);
		smtTip.fadeTo("fast",1);
	}

	this.initClickableToolTip = function (element, cb) {

		var hideTTip = function() {
			clearTimeout(smtTip_delay);
			my$(document).unbind("mousemove");
			StyledTTips.hideTooltipForElement(element,"fast");
		};
		element.off('mouseleave');
		element.mouseleave(function() {
			hideTTipInterval = setTimeout(hideTTip, 1000);
		});
		smtTip.mouseenter(function() {
			clearTimeout(hideTTipInterval);
		});
		smtTip.mouseleave(function() {
			hideTTipInterval = setTimeout(hideTTip, 1000);
		});
		element.mouseenter(function() {
			clearTimeout(hideTTipInterval);
			smtTip.click(cb);
			smtTip.css("cursor", "pointer");
		});
	};

	this.applyTooltips = function(containerSelector) {
		var $ = my$;
		$(containerSelector+" [title]").not("[title] [title]").each(function() {
			$(this).hover(function(e) {
				// mouseover
				var $this=$(this);
				if ($this.hasClass('cs-tooltip-disabled')){
					return;
				}
				if (restoreTitleElement) {
					StyledTTips.hideTooltipForElement(restoreTitleElement,"fast");
					restoreTitleElement=null;
				}
				clearInterval(hideTTipInterval);
				restoreTitleElement = $this;
				$this.data("smtTitle", $this.attr("title")); //store title
				var theTitle=$this.data("smtTitle");
				$this.attr("title", ""); //remove title to prevent native tooltip showing
				smtTipText.empty().append(theTitle); //set tooltip text
				smtTip.hide(); // hide the tooltip
				if (!theTitle || /^\s*$/.test(theTitle)) {
					return;
				}
				smtTip_delay = setTimeout(smtTip_fadeIn, myOptions.tip_delay_time); //set tooltip delay
				if (myOptions.fix_to_element=="on") {
					StyledTTips.smtFixedPosition($this);
				} else {
					if(myOptions.tip_follows_cursor=="off"){
						smtMouseMove(e);
					} else {
						$(document).bind("mousemove", function(event){
							smtMouseMove(event);
						});
					}
				}
			}, function() {
				// mouseout
				var $this=$(this);
				if(myOptions.tip_follows_cursor!="off"){
					$(document).unbind("mousemove");
				}
				clearTimeout(smtTip_delay);
				StyledTTips.hideTooltipForElement($this,"fast");
			});
		});
	};

	this.initTbTooltips = function ($, options) {
		var defaults = {
			tip_follows_cursor: "off",
			fix_to_element: "on",
			tip_delay_time: 350
		};
		my$ = $;
		myOptions = $.extend(true, {}, defaults, options);
		$("#holiRoot").append("<div id='tb-tooltip'><div id='tooltip-text'></div><div id='tooltip-nub'></div></div>"); //create the tooltip container
		smtTip=$("#tb-tooltip");
		smtTip.hide(); //hide it
		smtTipText=$("#tb-tooltip #tooltip-text");
		smtTipNub=$("#tb-tooltip #tooltip-nub");
		this.applyTooltips("#holiRoot");

	};
};




// in case of mismatch between barConfig and the one passed to the init, experiments will not be running.
// this to ensure compliance between the bar and the experiments (otherwise nasty bugs can occur).
var barApiVersion = 1;

var cdnServerDomain =  "app.cdn-cs.com";
var newCdnServerDomain = "l.app.cdn-cs.com";

var NewLogServerMode = {
    Old : "old",    // default, write to old CDN server
    Both : "both",  // write to both new & old servers
    New : "new"     // write only to new server (l.app.cdn-cs.com)
};
var newLogServerMode = NewLogServerMode.New;


// feature flags
var useIframePixel = false;
// cookies
var persistentCookieDuration = Duration.days(10 * 365);
var cdStroagePrioritizedOverShadowStorage = false;
var itemsToOverrideFromCDStorage = [];

// cookie keys
var ckie_toolbar_state="_cs_tbar_state",
	session_storage_ssnips_preview_ver="_cs_bar_preview_ver", // this holds the preview version number, or 'p' for the latest preview
    session_storage_ssnips_preview_mode="_cs_bar_preview_mode", // this holds the preview version number, or 'p' for the latest preview
	ckie_staging_cookie="_cs_staging_cookie",
	ckie_user_id="_cs_user_id",
	ckie_global_user_id="_cs_guser_id",
	ckie_session_id="_cs_session_id",
	ckie_session_init_id="_cs_session_init",
	ckie_session_count="_cs_session_count",
	ckie_event_counter="_cs_event_counter",
	ckie_global_event_counter="_cs_g_event_counter",
	ckie_tags="_cs_tags",
    ckie_pageviews_state = "_cs_pgv_state",
	ckie_last_location="_cs_last_loc",
    ckie_geo_received_reported="_cs_geo_received_reported",
	ckie_resident_state = "_cs_rsd_st",
	ckie_toggling_displayer = "_cs_tgl_disp",
	ckie_persistent_displayer = "_cs_prst_disp",
    ckie_contentChanger_shown_triggered = "_cs_con_change_show_triggered",
    ckie_contentChanger_triggered_triggered = "_cs_con_change_triggered_triggered";

// These are filled by the template engine from config_preamble.js, if they exist
var configVersion;
var codeVersion;

var debugMode = isLocalEnv();

var editor = null;
var analyzeMode = false;
var canvasEditor = null;
var persistentCsMode = true;
var devMode = debugMode;	// enabling this exposes APIs that allow inspection and alteration of functionality.
var inspectMode = false;	// exposes on-screen hot-spot and utilities
var inspectedCampaign = "";	// inspects a specific campaign id
var forceEventsOnDev = false; // the events are not sent on dev by default, set this flag to true if you still want them to be sent
var expectedUrlFormat = null;

var jQueryURL = "ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js";
var shouldWaitForJQuerySpecificVersion = false;
var jQueryGlobal = "jQuery"; 	// override to change the window.jQuery to something else (it will be used as so: window[jQueryGlobal])

// cookies verification
// based on practices taken from http://browsercookielimits.x64.me/
var cookieLengthLimit = 1500;
var totalCookieLengthLimit = 4050; // saving UTF-8?
var totalCookieLimit = 50;
var reportedOnUnhealthyCookiesState = false;

// event flags
var triggerMouseEventsUntilDate = "";	// format: yyyy-mm-dd,and the date entered is inclusive (e.g., triggerMouseEventsUntilDate="2013-10-23" - dispatch events until, and including, oct 23rd, 2013)
var triggerBounceEvents = true;
var bounceSensitivity = 1;	// 3: most sensitive, 1: least sensitive.

var isPageFocused = true;	// auto managed by the listenToPageFocus.
var isMouseActive = false;

// URL parameters that disable the experiment (key:value translate to varname=varvalue i.e {"off":"true"} => ?off=true
var barDisableParams = {};
// URL parameters that re-enable the experiment
var barReenableParams = {};

/* global toolbar variables */
var barstate=null,
	globalShowToolbar,
	TBar , //used just to see if the toolbar has already been loaded 
	jq , // JQuery library holder
	siteDomain;

// Can be overriden by customer to stem searches
// E.g. http://www.zfi-inc.com/search?q=k.p.o.s can be stemmed to
// http://www.zfi-inc.com/search?q=kpos

/* global toolbar widget variables */
var	balloonCloseClicked=false,
	balloonCloseCallback=null,
	defaultBalloonMiliseconds=9000, //  config parameter
	balloonMiliseconds=defaultBalloonMiliseconds;

var	defaultPopupWidgetMiliseconds=5000; //  config parameter

// Localization and configuration section
/* installation specific - site parameters */
var allJsUrl = findFunctionsUrl();
var TBBaseURL;
if (allJsUrl !== undefined) {
	TBBaseURL = allJsUrl.substr(0, allJsUrl.lastIndexOf("/")) + "/";
    if (TBBaseURL.indexOf("/ver/") === -1) {
        TBBaseURL += "../ver/" + configVersion + "/";
    }
}

// clientId and siteId will be injected (from server) in config_postamble.js
var clientId;
var siteId;
var buildId;

var rootContainerId = "holiRoot";

var ignoreSubDomains = ["us-dc1-order.", "us-dc2-order.", "order.", "www.", "app.", "www1.", "www2.", "store.", "shop.", "checkout.", "search."];

var supportedBrowsers = ["Chrome", "Firefox", "Safari", "MSIE", "IE11"];
var tabletBrowsersWhiteListRegex = [ /iPad.* AppleWebKit\/.* Version\/[789]\.\d.* Mobile.* Safari/ ]; // regex for tablets - they will get campaigns like desktop
var webViewerOnIPhoneRegex = /Mozilla\/5\.0 \(iPhone; CPU iPhone OS (8|9|(\d(\d)+))(_(\d)+)* like Mac OS X.*\) AppleWebKit\/(\d)+(\.(\d)+)* \(KHTML, like Gecko\)/;
var webViewerBrowsersWhiteListRegex = [webViewerOnIPhoneRegex];
var blacklistedBrowsers = ["MSIE 8"];
var mobileBrowsers = ["Mobile", "Android", "iPhone", "iPad", "Silk", "ARM", "IEMobile", "ZuneWP7"];
var whiteListMobileBrowsers = ["iPhone"];
var mobileBrowsersWhiteListRegex = [ /Android.* Chrome\/[.0-9]* Mobile/ ]; // Chrome on Android phones
var notSupportedMobileUseAgents = ["Opera", "OPiOS", "iCab", "UCWEB", "UCBrowser", "IEMobile"];
var defaultDeviceTargeting = "desktop-only";
var blacklistedUrls = [],
	blacklistedUrlsInBrowsers = [],
	toggleFlashObjects=true, // if true embeded objects (movies etc.) will "flash" after page appears, but won't appear in front of the Bar
	fixFlashObjectsFlag=true, // if true embeded objects (movies etc.) will be added with a <param> to make them not always on top
// Nothing will be loaded for these (no jQuery, analytics, ...)
	totallyBlackListedBrowseres = [];
var isMobile = false;
var isTablet = false;
var isMobileInWhiteList = false;
/* staging parameters - site defaults */
var getCSSFilePath = function () { return 'css/combined.' + buildId + '.css' };
var globalToolbarBypass=false; // set to true to completely bypass all toolbar code
// true to show the toolbar, false to visually hide the entire toolbar
// default is false, this is overriden to true in the '_on.js' variant
var defaultShowToolbar=false,
	forceShowFlag="csmode=1", // URL param: Force toolbar to be shown + set cookie
	forceHiddenFlag="csmode=0", // URL param: Force toolbar to be hidden + clear cookie
	forceMobileFlag="force=Mobile"; // url param

/* end Analytics string constants for reports */

var fixSearchUrlProtocolEnabled = false;

// Initialize dynamic runtime variables
var ua=navigator.userAgent;
var TBhref = document.location.href;
var isMobileUA=(ua.indexOf("Mobile")>-1) || (TBhref.indexOf(forceMobileFlag)>-1);


var currentVisitState;

var clickable_powered_by = true;

// Hides AND disables any facebook calls to expedite checkout process


var forceLoadOurOwnJquery = false;

var reportGAExceptions = true;
var reportGAEvents = false;  // by default don't report Holi campaigns events to customer GA

var forceBootstrapBarOnDocumentReady = false;

// queue of events the bar will raise (new user, returning user, page view, completed purchase etc.)
// match the relevant event names to PersonaType as needed
var csEventsQueue = [];

var contextStorage = null; // will be initialized on the bootstrap

// site's conversion url (last page in the checkout flow), will be override by the server:
var siteConversionUrl;

// useful in case we've got 2 domains (one for the site and one for the checkout process, such as pacificpillows.com that use Yahoo Store)
var csovrd;
var csoverPrefix = "#csovrd_";
var secondDomainToPassDataUrl;

// register external experiences (if needed for specific customers, via extraJavascript)
var supportedCountries = [];

var geoRequired = false; // default false - override per site if requires GEO API for Experiments
var initializeGeoAsync = false; // a flag to control 'Geo Received' event roll out on sites that geoRequired is false
var shouldBlockEventsOnGeo = function() { return supportedCountries.length > 0 }; // has to by dynamic (as supportedCountries are overwritten in extraJavascript)
var blockedEvents = [];

var geoApiScriptUrl = "app.cdn-cs.com/geo/v2/memory_cache.php";
var emailSubscriptionUrl = "https://app.cdn-cs.com/email-subscription.php";

var behaviorsConfiguration = [];
var valueKnownRules = [];
var couponCodesMap = null;
var displayers = {};


/**
 * Can be overriden per site. If this returns true, the bar is not shown on the current page.
 */
function customShouldHideBar(url) {
    return false;
}

var shouldSendCSNewsletterSignup = true;

// Resident states constants
var RESIDENT_START 	= "start";	// When experience is resident, this would be its state on the 1st page (implies experience has animation)
var RESIDENT_ACTIVE = "active";	// resident state on subsequent pages (implies experience doesn't have animation)
var RESIDENT_DONE 	= "done";	// when resident should be permanently hidden (e.g. purchase complete)
var RESIDENT_HIDDEN = "hidden";	// when resident should be temporarily hidden (e.g. checkout funnel)

var email_regex = /([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})/;
var phone_regex = /^[0-9()-]+$/;
var ten_digits_phone_regex = /^\d{10}$/;
var alphanumeric_regex = /^[\w\d\s]+$/i;
var dontValidateEmail = false;

var displayerConstructors = [];

var adminClientId;
var adminSiteId;
var widgetDomain;

var shouldUseNoConflict = true; //use no conflict to release jquery global variables after we loaded it and store it in cs scope
var shouldPersistBar = true; //always show bar in persistent way unless you override it in extra javascript

var confirmAndCloseTimeout = 5000; //timer count (in milliseconds) to close campaign after confirmation message   


// Widget Analytics Event names
var WAE_pageView = "page_view",
	WAE_newSession = "new_session",
	WAE_error = "error",
	WAE_gotGeo = "got_geo",
	WAE_campaignTriggered = "campaign_triggered",
	WAE_campaignShown = "campaign_shown",
	WAE_campaignClosed = "campaign_closed",
	WAE_campaignHover = "campaign_hover",
	WAE_campaignClick = "campaign_click";
	WAE_purchaseComplete = "purchase_complete";
	WAE_addToCart = "add_to_cart";
	WAE_removeFromCart = "remove_from_cart";
	WAE_clearCart = "clear_cart";
// Widget Analytics Field names
var WAF_codeVersion = "cv",
	WAF_siteId = "s",
	WAF_eventName ="e",
	WAF_extraData = "ed",
	WAF_eventCounter = "ec",
	WAF_globalEventCounter = "ge",
	WAF_parentPageCounter = "pc",
    WAF_globalEventId = "geid",
	WAF_supported = "su",
	WAF_error = "er",
    WAF_error_code = "erc",
	WAF_campaignId = "cid",
	WAF_campaignName = "cn",
    WAF_campaignGoal = "cg",
	WAF_campaignVersion = "cv",
	WAF_variant = "v",
	WAF_variantName = "vn",
	WAF_campaignRules = "cr",
	WAF_userId = "id",
	WAF_globalUserId = "gid",
	WAF_siteUserId = "uid",
	WAF_sessionIndex = "si",
	WAF_sessionId = "sid",
	WAF_userTime = "t",
	WAF_userTimeZone = "tz",
	WAF_userAgent = "ua",
	WAF_browserFamily = "bf",
	WAF_browserVersion = "vv",
	WAF_browserLanguage = "bl",
	WAF_osName = "os",
	WAF_deviceType = "dt",
	WAF_screenHeight = "sh",
	WAF_screenWidth = "sw",
	WAF_viewHeight = "vh",
	WAF_viewWidth = "vw",
	WAF_documentHeight = "dh",
	WAF_documentWidth = "dw",
	WAF_url = "u",
	WAF_urlScheme = "us",
	WAF_urlHost = "uh",
	WAF_urlPort = "upr",
	WAF_urlPath = "up",
	WAF_urlQuery = "uq",
	WAF_urlFragment = "uf",
	WAF_referrer = "r",
	WAF_referrerScheme = "rs",
	WAF_referrerHost = "rh",
	WAF_referrerPort = "rpr",
	WAF_referrerPath = "rp",
	WAF_referrerQuery = "rq",
	WAF_referrerFragment = "rf",
	WAF_referrerSearchQuery = "rsq",
	WAF_referrerSearchQueryType = "rsqt",
	WAF_country = "co",
	WAF_state = "st",
	WAF_region = "re",
	WAF_city = "ci",
	WAF_zipcode = "z",
	WAF_latitude = "la",
	WAF_longitude = "lo",
	WAF_orderId = "o",
	WAF_total = "ttl",
	WAF_customerEmail = "ce",
	WAF_currency = "cu",
    WAF_productId = "sk",
    WAF_itemQuantity = "iqt",
    WAF_unitPrice = "ipc",
    WAF_itemName = "inm",
    WAF_itemCategory = "icg",
    WAF_itemVariation = "ivt";

// Widget error codes
var ERROR_USER_CONTEXT_NOT_INITIALIZED = "1001",
	ERROR_GA_NOT_INITIALIZED = "1002",
	ERROR_GA_FIELDS_NOT_COMPLETE = "1003",
    ERROR_RULES_EVALUATION = "2001",
    ERROR_RULES_EVALUATION_IN_PAGE_CONTENTS_RULE = "2002",
    ERROR_GEO_INITIALIZATION_FAILED = "3001",
    ERROR_GEO_JSON_PARSE_FAILED = "3002",
    ERROR_GEO_DEBUG = "3003",
    ERROR_CANVAS_INJECTOR_NOT_FOUND = "4001",
    ERROR_CANVAS_ROOT_NOT_FOUND = "4002",
    ERROR_CANVAS_RENDERING_HTML_FAILED = "4003",
    ERROR_CANVAS_RENDERING_DISPLAYER_FAILED = "4004",
    ERROR_CANVAS_DYNAMIC_TEXT_FAILED = "4005",
    ERROR_CANVAS_FORM_SUBMISSION_MISSING_VARIANT = "4006",
    ERROR_CANVAS_FORM_SUBMISSION_MISSING_CAMPAIGN = "4007",
    ERROR_CANVAS_FORM_SUBMISSION_FORM_NOT_FOUND = "4008",
    ERROR_CANVAS_CONTAINER_NOT_FOUND = "4009",
    ERROR_CANVAS_CALL_TO_ACTION_FAILED = "4010",
    ERROR_AB_TEST_NO_ELEMENTs_MATCHED = "4011",
    ERROR_AB_TEST_MULTIPLE_ELEMENTs_MATCHED = "4012",
    ERROR_AB_TEST_ELEMENT_CONTENT_DOESNT_MATCH = "4013";
    ERROR_CANVAS_CUSTOM_CALL_TO_ACTION_FAILED = "4014";
    ERROR_EXTERNAL_API_CLOSE_CAMPAIGN_FAILED = "5001";



var ObserveUserActivation = new function(){
	var that = this;
	var currentlyObserving = false;	

	this.handleUserAction = function(e) {
		Observer.trigger('userIsActive');		
	};

	this.listenToEvents = function() {
		if (currentlyObserving) {
			return;
		} else {
			currentlyObserving = true;
			window.addEventListener("click", ObserveUserActivation.handleUserAction);
			window.addEventListener("scroll", ObserveUserActivation.handleUserAction);
			window.addEventListener("keypress", ObserveUserActivation.handleUserAction);
			window.addEventListener("mousedown", ObserveUserActivation.handleUserAction);
			window.addEventListener("mousemove", ObserveUserActivation.handleUserAction);
			window.addEventListener("touchstart", ObserveUserActivation.handleUserAction);			
		}	
	};
};

var RulesEvaluatorsFactory = new function() {
    var evaluators = {};

    this.createRulesEvaluator = function(campaign) {
        if (!evaluators[campaign.id]) {
            evaluators[campaign.id] = new RulesEvaluator(campaign, campaign.rules);
        }
        return evaluators[campaign.id];
    };
};

function RulesEvaluator(campaign, rules) {
    this.campaign = campaign;
    campaign.evaluator = this;
    this.id = campaign.id;
    this.rules = extend({}, rules);
	this.contextProvider = undefined;
	this.contexts = [];
	this.satisfiedRules = [];
	// each AND group pushes an object to this stack.
	// This object contains info on:
	// Whether any rule was evaluated within the AND group
	// Whether any "may change" rule was found within the AND group
	// At then end of the AND group, the object is popped and check to see if partial
	// needs to be triggered
	this.partialCheckStack = [];
	this.partialSatisfied = false;
	extend(this, Observer);

	function _isArray(val) {
		return Object.prototype.toString.call(val)==='[object Array]';
	}
	var init = (function() {
		initializeRulesGroup(this.rules);
	}).bind(this);

	// checkPartial will trigger 'satisfied' if the rules provided with the context provider evaluate as true. if a rule is defined and not provided in the provider, it is ignored
	// checkPartial==false will only trigger if all rules are evaluated to true.
	// (i.e. checkPartial==true means that satisfied is true as long as it's not false)
	this.check = function(contextProvider, checkPartial) {
		try {
			this.satisfiedRules = [];
			this.contextProvider = contextProvider;
			this.partialCheckStack = [];
			this.partialSatisfied = false;
			if (matchANDGroup(rules, checkPartial)) {
				this.reportTrigger(checkPartial);
			} else {
				if (checkPartial && this.partialSatisfied) {
					this.reportTrigger(checkPartial);
				}
			}
			if (!checkPartial && Inspector && Inspector.trackTargeting) {
				Inspector.trackTargeting(this.campaign, contextProvider);
			}
			// clean up flag rules
			for (var i=0; i<this.satisfiedRules.length; i++) {
				var rule = this.satisfiedRules[i];
				if (rule.key && rule.key.indexOf(".flag.")>-1) {
					rule.satisfied = undefined;
				}
			}
		} catch(e) {
			logError("Error while evaluating/executing rules", e, ERROR_RULES_EVALUATION);
		}
	};

	this.reportTrigger = function(checkPartial) {
        var chosenVariant = DisplayerController.chooseVariant(campaign.id);
        campaign.chosenVariantId = chosenVariant.id;
        var eventName = checkPartial ? "satisfiedPartial" : "satisfied_"+campaign.id;
        this.trigger(eventName, this, this.satisfiedRules);
	};

	var matchORGroup = (function(rules, checkPartial) {
		var elementNotSatisfied;
		for (var k in rules) {
			if (rules.hasOwnProperty(k)) {
				var element = rules[k];
				if (element.hasOwnProperty("orGroup")) {
					if (matchORGroup(element.orGroup, checkPartial)) return true;
				} else
				if (element.hasOwnProperty("andGroup")) {
					if (matchANDGroup(element.andGroup, checkPartial)) return true;
				} else {
					matchSingleRule(element);
					if (!checkPartial) {
						elementNotSatisfied = false;
						if (element.satisfied) {
							this.satisfiedRules.push(element);
							return true;
						}
					} else {
						if (element.satisfied===true) {
							return element.satisfied;
						}
						if (element.satisfied===false) {
							elementNotSatisfied = false;
						}
					}
				}
			}
		}
		return elementNotSatisfied;
	}).bind(this);

	var matchANDGroup = (function(rules, checkPartial) {
		// in partial matching, we want result to be falsy if no rules are matched (don't report 'triggered' if there are no partial matches)
		// so we have to set result to undefined rather than true. then, if we do get a match (either false or true) we initialize result.
		// if result is never initialized (we never got a match), the rulesEvaluator will not report a match, which is what we want.
		var result = checkPartial ? undefined : true;
		this.partialCheckStack.push({
			mayChangeFound: false,
			somethingEvaluated: false
		});
		for (var k in rules) {
			if (rules.hasOwnProperty(k)) {
				var element = rules[k];
				if (element.hasOwnProperty("orGroup") || element.hasOwnProperty("andGroup")) {
					var groupResult;
					if (element.hasOwnProperty("orGroup")) {
						groupResult = matchORGroup(element.orGroup, checkPartial);
					} else {
						groupResult = matchANDGroup(element.andGroup, checkPartial);
					}
					if (!checkPartial) {
						result = result && groupResult;
					} else {
						if (result===undefined && groupResult!==undefined) {
							result = true;
						}
						result = result && groupResult;
					}
				} else {
					matchSingleRule(element);


					if (!checkPartial) {
						if (element.satisfied) {
							this.satisfiedRules.push(element);
						}
						result = result && element.satisfied;
					} else {
						if (result===undefined && element.satisfied!==undefined) {
							result = true;
						}
						result = result && element.satisfied!==false;
					}
				}
			}
		}
		var satisfiedObj = this.partialCheckStack.pop();
		if (satisfiedObj.somethingEvaluated===false && satisfiedObj.mayChangeFound) {
			this.partialSatisfied = true;
		}
		return result;
	}).bind(this);

	var matchSingleRule = (function(rule) {
		if (!rule.key) {
			rule.satisfied = true;
			return;
		}
		if (rule.mayChangeDuringPageView) {
			this.partialCheckStack[this.partialCheckStack.length-1].mayChangeFound = true;
		}
		function valuesToArray(rule, value) {
			// Convert LHS and RHS to arrays if needed
			if (!_isArray(rule.value)) {
				if (typeof(rule.value)==="string") {
					rule.value = rule.value.split(", ");
				} else {
					rule.value = [rule.value];
				}
			}
			if (!_isArray(value)) {
				value = [value];
			}
			rule.value = jq.map(rule.value, function(element) {
				element = element ? element.toString().toLowerCase() : "";
				if (rule.key.indexOf("url")>-1) {
					element = jq.trim(element);
				}
				return element;
			});
			value = jq.map(value, function(element) {
				return element.toString().toLowerCase();
			});
			return {rule: rule, value: value};
		}

		function matchSingleCookie(matcher) {
			matcher = jq.trim(matcher);
			// assume no operator
			var cookieName = matcher;
			var matchValue = "";
			var operators = ['>=' ,'<=' ,'=' ,'!', '~', '>', '<' ];  // longer operators must come first so they will be found e.g. >= before >
			var op = ""; // default is no operator, only a cookie name
			var opPos = -1;
			// search for the first operator in matcher
			for (var i=0; i < operators.length ; i++) {
				var newOpPos = matcher.indexOf(operators[i]);
				if (newOpPos !== -1) { // found an operator
					if (opPos === -1  || newOpPos < opPos) { // it's before the one we have - save it
						opPos = newOpPos ;
						op = operators[i];
						cookieName = jq.trim(matcher.substring(0, opPos));
						matchValue = jq.trim(matcher.substring(opPos + op.length));
					}
				}
			}
			var cookieValue = getCookie(cookieName);
			if (cookieValue !== null && cookieValue !== undefined) {
				cookieValue = cookieValue.toLocaleLowerCase();
			} else {
				return false ; // cookie must be found for a cookie rule to be true
			}
			matchValue = matchValue.toLocaleLowerCase();
			switch (op) {
				case "" :
					return cookieValue !== null && cookieValue !== undefined ; // if no operator, just check if cookie exists (should always be true at this point...)
				case '=' :
					return cookieValue === matchValue ; // if = operator, check if cookie found and value matches the expected value
				case '!' :
					return cookieValue !== matchValue ; // if ! operator, check if cookie found and value doesn't equal the expected value
				case '~' :
					return matchRegex(cookieValue, matchValue, "i");
				// NOTE! The following assumes the numbers are numeric, otherwise the compare is false
				case '>' :
				case '<' :
				case '>=' :
				case '<=' :
					return compareNumerical(cookieValue, matchValue,op) ;
			}
			function compareNumerical(cookieValue, matchValue, op) {
				if (isNaN(parseFloat(cookieValue)) || isNaN(parseFloat(matchValue))) {
					return false;
				}
				cookieValue = parseFloat(cookieValue);
				matchValue = parseFloat(matchValue);
				switch (op) {
					case '>' :
						return cookieValue > matchValue;
					case '<' :
						return cookieValue < matchValue;
					case '>=' :
						return cookieValue >= matchValue ;
					case '<=' :
						return cookieValue <= matchValue ;
				}
			}

		}

		function isItemSkuInCart(sku, cartItems) {
			var isItemSkuFoundInCart = false;
			if (sku && typeof(sku) === "string") {
				sku = sku.toLowerCase().split(",");
			}

			/*can change it to csfilter instead of for loop*/
			for (i=0; i < sku.length; i++ ){
				if (cartItems.indexOf(jq.trim(sku[i])) > -1) {
					isItemSkuFoundInCart = true;
					break;
				}
			}

			return isItemSkuFoundInCart;
		}

		var o;
		var found=false;
		var commonElements;
		var matchedElements;
		var i;
		if (rule.key.indexOf("page.contents")>-1){
			// if searching in page contents, use special rule evaluator - don't search for the key's value from context
			if (!_isArray(rule.value)) {
				if (typeof(rule.value)==="string") {
					rule.value = rule.value.split(", ");
				} else {
					rule.value = [rule.value];
				}
			}
			matchedElements = jq.map(rule.value, function (element) {
				try {
					return (jq(element).length > 0);
				} catch(e) { // protect against syntax error in the selector
					logError("Error in page contents rule: \""+element +"\" "+ e.message, e, ERROR_RULES_EVALUATION_IN_PAGE_CONTENTS_RULE);
					return false;
				}
			});
			switch (rule.matcher) {
				case "contains":
					for (i in matchedElements) {
						if (matchedElements[i]===true) {
							rule.satisfied = true;
							found=true;
							break;
						}
					}
					rule.satisfied = found;
					break;
				case "not contains":
					for (i in matchedElements) {
						if (matchedElements[i]===true) {
							rule.satisfied = false;
							found=true;
							break;
						}
					}
					rule.satisfied = !found;
					break;
				default:
					throw "Invalid page contents matcher";
			}
		} else if(rule.key.indexOf("context.cookie")>-1) {
			// if searching in page contents, use special rule evaluator - don't search for the key's value from context
			if (!_isArray(rule.value)) {
				if (typeof(rule.value)==="string") {
					rule.value = rule.value.split(", ");
				} else {
					rule.value = [rule.value];
				}
			}
			for (i=0; i < rule.value.length; i++) {
				if (matchSingleCookie(rule.value[i])) {
					found=true;
					break;
				}
			}
			switch (rule.matcher) {
				case "contains":
					rule.satisfied = found;  // if even one found - contains rule is satisfied.
					break;
				case "not contains":
					rule.satisfied = !found;  // if none found - not contains rule is satisfied
					break;
				default:
					throw "Invalid cookie matcher";
			}
		/*can be remove but should be tested while removing*/
		/*this is unnecessary block of if - the else block (right after this) is doing this logic so this can be removed and check*/
		} else if (rule.key.indexOf("context.user.cartItemsSku") > -1) {
			var contextCart = contextStorage.getItem("context.user.cartItemsSku");
			if (typeof contextCart === 'string' && contextCart.length > 0 )  {
				var cartItems = contextCart.toLowerCase().split(",");
				var skuArray = rule.value;
				switch (rule.matcher) {
					case "eq":
						found = isItemSkuInCart(skuArray, cartItems);
						rule.satisfied = found;
						break;
					case "not eq":
						found = !isItemSkuInCart(skuArray, cartItems);
						rule.satisfied = found;
						break;
					default:
						throw "Invalid cart item sku matcher";
				}
			}
		} else if (rule.key.indexOf("context.websiteTime") > -1) {
				var fixTime = rule.value.replace(/([0-9])([ap]m)/i, "$1 $2");  // add space before am/pm
				switch (rule.matcher) {
					case "gt":
						rule.satisfied = TimeUtils.isTimeGreaterThan(TimeUtils.currentWebsiteTimeOfDay(), fixTime);
						break;
					case "lt":
						rule.satisfied = !TimeUtils.isTimeGreaterThan(TimeUtils.currentWebsiteTimeOfDay(), fixTime);
						break;
					default:
						throw "Invalid store time matcher";
				}
		} else {
			var value = this.contextProvider.getValue(rule.key);
			if (value!==null && value!==undefined) {
				if (rule.key.indexOf("url")>-1) {
					value = decodeURIComponent(value);
				}
				switch (rule.matcher) {
					case "gt":
						rule.satisfied = parseFloat(value) > parseFloat(rule.value);
						break;
					case "lt":
						rule.satisfied = parseFloat(value) < parseFloat(rule.value);
						break;
					case "eq":
					case "not eq":
						o = valuesToArray(rule, value);
						rule = o.rule;
						value = o.value;
						// Create an array of elements the two arrays share
						commonElements = jq.grep(value, function (element) {
							return jq.inArray(element, rule.value) !== -1;
						});
						rule.satisfied = rule.matcher === "eq" ? commonElements.length > 0 : commonElements.length === 0;
						break;
					case "contains":
                    case "not contains":
						o = valuesToArray(rule, value);
						rule = o.rule;
						value = o.value;
						commonElements = jq.map(value, function (element) {
							return jq.grep(rule.value, function (_element) {
								return element.indexOf(_element) !== -1;
							});
						});
						rule.satisfied = rule.matcher === "contains" ? commonElements.length > 0 : commonElements.length === 0;
						break;
					default:
						throw "Invalid matcher";
				}
			}
		}
		if (rule.satisfied!==undefined) {
			this.partialCheckStack[this.partialCheckStack.length-1].somethingEvaluated = true;
		}
	}).bind(this);

	var initializeRulesGroup = (function(rules) {
		if (!rules) return;
		for (var key in rules) {
			if (rules.hasOwnProperty(key)) {
				var rule = rules[key];
				initializeRulesGroup(rule.orGroup);
				initializeRulesGroup(rule.andGroup);
				if (rule.hasOwnProperty("key") && rule.key) {
					var keyParts = rule.key.split(".");
					if (keyParts[0]==="timer") {
						this.contexts.push(new RuleTimer(rule));
					}
				}
			}
		}
	}).bind(this);

	init();
}

function RuleTimer(rule) {
	extend(this, Observer);
	this.providerName = "timer";
	var that = this;
	var timeoutId;

	var init = function() {
		var contextKey = getUserContextKey();
		if (rule.key === "timer.page.time.idle") {
			ObserveUserActivation.listenToEvents();
			var milisecs = parseInt(rule.value, 10) * 1000;
			triggerAfter(milisecs);
			Observer.on("userIsActive", handleUserAction);
		} else {
			UserContext.getValuePromise(contextKey).then(function() {
				var startTimeVal = UserContext.getValue(contextKey);
				var startTime;
				var currentTime;
				if (typeof(startTimeVal)==="number") {
					startTime = startTimeVal;
					currentTime =(Date.parse(new Date().toUTCString()));
				} else {
					// compatibility with libraries that override date and return string instead of number for the above methods
					// (e.g. mootools)
					startTime = Date.parse(startTimeVal).getTime();
					currentTime = new Date().getTime();
				}
				
				var timeToCheck = parseInt(rule.value, 10) * 1000 + startTime;
				if (timeToCheck<currentTime) {
					triggerAfter(0);
				} else {
					var timeToNextCheck = (timeToCheck - currentTime) + 1000;
					triggerAfter(timeToNextCheck);
				}
				that.trigger("contextChange", that);
			});
		}
	};

	var handleUserAction = function() {
		that.kill();

		if (!rule.satisfied) {			
			var milisecs = parseInt(rule.value, 10) * 1000;			
			triggerAfter(milisecs);
		}
	};

	var triggerAfter = function(milisecs) {
		timeoutId = setTimeout(function() {
			timeoutId = undefined;
			that.trigger("contextChange", that);
		}, milisecs);
	};

	var getUserContextKey = function() {
		var keyParts = rule.key.split(".");
		return ["context", keyParts[1], "time"].join(".");
	};

	// return time in seconds since start time
	this.getValue = function(key) {
		if (key!==rule.key) return undefined;
		var currentTime = (Date.parse(new Date().toUTCString()));
		var startTime = UserContext.getValue(getUserContextKey());
		return (currentTime - startTime)/1000;
	};

	this.getProviderName = function() {
		return this.providerName;
	};

	this.kill = function() {
		if (timeoutId) {			
			clearTimeout(timeoutId);
		}
	};

	setTimeout(init, 0);
}

var geo = {
    locationObj : {
        city:"default",
        country: "default",
        state: null
    }
};

var persistGeoDuration = Duration.minutes(10*60); // save geo location for 10 hours - in case user moves

function reportGeoReceived() {
    var got_geo_reported = getCookie(ckie_geo_received_reported);
    if (got_geo_reported && got_geo_reported === "true") {
        // report only once
        return;
    }
    var location = getLocation();
    if (location !== null) {
        var geoEventValue = "";
        if (typeof(location.country) !== "undefined") {
            geoEventValue += "country=" + location.country;
        }
        if (typeof(location.city) !== "undefined") {
            geoEventValue += "&city=" + location.city;
        }

        // translate fields from Geo module names to analytics names (WAF_*)
        var mappings = {city: WAF_city, country: WAF_country, region: WAF_region},
            fields = {};
        for(var srcName in mappings) {
            if (location[srcName] !== undefined) {
                fields[mappings[srcName]] = location[srcName];
            }
        }

        // report event
        Tracker.triggerEvent(WAE_gotGeo, fields);
        // use persistGeoDuration just to be consistent with the duration we keep the location in local (cookie) cache.
        setCookie(ckie_geo_received_reported, "true", persistGeoDuration);
    }
}

function initGeo() {
    var lastLocation = getCookie(ckie_last_location); // try loading from cookie first
    if (lastLocation) {
        var decodedLocation = JSON.parse(base64_decode(lastLocation));
        if (decodedLocation && decodedLocation.country) {
            initGeoApi(base64_decode(lastLocation), true);
            // there is a possibility that the event was not sent once geo was loaded
            reportGeoReceived();
        }
        else {
            logDebug("initGeo - parse cookie failed - loading from Web");
            loadGeoFromWeb();
        }
    } else {
        loadGeoFromWeb();
    }
}

// initGeoApi function - used also as Callback by the geo JSONP script to init the geo API
function initGeoApi( location , fromCookie) {
	if (window.__csGlobal__ && window.__csGlobal__.geo) {
		logDebug("Geo API already initialized - exiting initGeoApi: location=" + location + "fromCookie=" + fromCookie);
		return;
	}
	var locationStr;
	try {
		if (typeof(location)==="string") {
			locationStr = location;
			geo.locationObj = JSON.parse(location) ;

		} else {
			locationStr = JSON.stringify(location);
			geo.locationObj = location;
		}
		if (!fromCookie) {
			var encodedLoc = base64_encode(locationStr);
			setCookie(ckie_last_location, encodedLoc, persistGeoDuration);
		}

        // geo is initialized, make sure that the user is "valid" for the current experiment:
        if (shouldBlockEventsOnGeo()) {
            // if the current user should be excluded (by geo), reset the user's variant and fix blocked events variants.
            // this is to make sure we won't report the user as a "valid" user.
            // reminder: some events (e.g. Page View) were reported before the geo was ready, so we had to "block" the reporting until it's done.
            var resetVariant = null;
            if (shouldChangeUserVariantByGeo(geo)) {
                resetVariant = changeUserVariantByGeo();
            }

            Tracker.reportBlockedEvents(geo, resetVariant);
            shouldBlockEventsOnGeo = function() { return false; }; // has to by dynamic (as supportedCountries are overwritten in extraJavascript)
        }
		// If some value is not returned, convert it to null so it won't trigger rules
		// e.g. we don't want to trigger "not from u.s" if a user from u.s got here but we didn't get their geo.
		if (!geo.locationObj.country) {
			geo.locationObj.country = null;
		}
		if (!geo.locationObj.state) {
			geo.locationObj.state = null;
		}
		if (!geo.locationObj.city) {
			geo.locationObj.city = null;
		}
		if (!geo.locationObj.region) {
			geo.locationObj.region = null;
		}
		UserContext.setContext("context.user.country", geo.locationObj.country);
        if (!geo.locationObj.state) {
            UserContext.setContext("context.user.state", geo.locationObj.region); // TODO: add independent region field
        } else {
            UserContext.setContext("context.user.state", geo.locationObj.state);
        }
		UserContext.setContext("context.user.city", geo.locationObj.city);
        Observer.trigger("geoContextUpdated");
		exportFunc(geo, "geo"); // init the geo global API
	} catch(exception) {
		logError("initGeoApi: failed to initialize Geo from JSON. location: " + location + " fromCookie:" + fromCookie, exception, ERROR_GEO_JSON_PARSE_FAILED);
	}
}

function loadGeoFromWeb() {
	var url = getCorrectUrlProtocol(geoApiScriptUrl);
    add_script(url, function () {
        setTimeout(function() {
			// once the script is loaded, it will initialize the global geo variable. -Verify it loaded successfully:
			if (!window.__csGlobal__ || !window.__csGlobal__.geo) {
				logError("GEO API failed to initialize: " + geoApiScriptUrl  + " via " + navigator.userAgent, null, ERROR_GEO_INITIALIZATION_FAILED);
				jq.ajax({
					type: 'GET',
					url: geoApiScriptUrl,
					error: function(data, err) {
						logError("GEO API debug. data["+data+"] error["+err+"]", null, ERROR_GEO_DEBUG);
					}
				});
				return;
			}

			reportGeoReceived();
        }, 0); // let the callback run outside the execution scope, so initGeoApi will be called and 'geo' will be placed on __csGlobal__
    });
}

function getLocation() {
    if (window.__csGlobal__ && window.__csGlobal__.geo) {
        return window.__csGlobal__.geo.locationObj;
    }
    return null;
}

exportFunc(initGeoApi,"initGeoApi");
exportFunc(initGeoApi,"initGeoAPI");
exportFunc(getLocation,"getLocation");


/**
 * Created by Eyal on 07/09/2015.
 */
var Inspector = new function() {

    var inspectorRoot ;
    var trackedCampaignId = null;
    var trackedCampaign = null;
    var showingOnCurrentPage = false;
    var trafficLightDrawn = false;
    var shown = false;
    var that=this;
    var lastContext ;
    window.Inspector = this;

    var bulletChar = '&#9899';
    var XChar = '&#10008;';
    var VChar = '&#10004;';

    this.init = function(campaignId) {
        if (isRunningInIFrame()) {  // in case sonme force-sets inspect mode by URL
            return;
        }
        bulletChar = (isTablet || isMobile) ? '&#x25CF;' : bulletChar; // replace characters on mobile because the desktop version doesn't accept colors
        VChar = (isTablet || isMobile) ? '&#x2713;' : VChar; // replace characters on mobile because the desktop version doesn't accept colors
        if (inspectMode){
            injectInspector();
            buildCampaignsMenu();
            this.setCampaign(campaignId);
            runAfterBootstrap(that.showContext);
            setInterval( (function() {
                that.showContext();
            }),300);
        }
    };

    this.changeCampaign = function(campaignId) {
        trafficLightDrawn = false;
        shown = false;
        showingOnCurrentPage = false;
        if (inspectMode){
            that.setCampaign(campaignId);
            persistCustomCsModeState("csInspectedCampaign", trackedCampaignId ? trackedCampaignId : ""); // for next reload
            resetDisplay();
            that.showContext();
            that.trackTargeting(trackedCampaign, lastContext);
        }
    };

    function resetDisplay() {
        inspectorRoot.find(".cs-inspector-traffic-light").html("");
        inspectorRoot.find(".cs-inspector-campaign-state").html("").removeClass("shown").removeClass("blocked");
    }


    this.setCampaign = function(campaignId) {  // allow to set campaign from outside after init
        trackedCampaignId = campaignId;
        trackedCampaign = DisplayerController.getCampaign(campaignId);
        setTitle();
        if (trackedCampaign !==null && trackedCampaign.hasOwnProperty("rejectReason")) {
            this.blockedReason(campaignId, trackedCampaign.rejectReason);
        }
        inspectorRoot.find(".cs-inspector-menu-item").removeClass("cs-selected");
        inspectorRoot.find("#setCampaign-"+campaignId).addClass("cs-selected"); // highlight selected in menu

    };

    this.showContext = function() {
        if (inspectMode) {
            var dump = "";
            var val, i ;
            var extra = "";
            var sortable = [];
            var cd = contextStorage.getAllItemsFromCache();

            for (var k in cd) { // sort the keys
                if (cd.hasOwnProperty(k)) {
                    sortable.push(k);
                }
            }
            sortable.sort();
            for (var si=0 ; si<sortable.length; si++) {
                i = sortable[si];
                if (i.toLowerCase().indexOf("time")>0){
                    var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
                    d.setUTCSeconds(cd[i]/1000);
                    val = d.toGMTString();
                } else {
                    val = cd[i];
                }
                if (i.indexOf("context.")===0) {
                    dump += "<span class='cs-label'>" + i.replace("context.","") + "</span>: " + val + "<br/>";
                } else {
                    extra += "<span class='cs-label'>" + i.replace("context.","") + "</span>: " + val + "<br/>";
                }
            }
            if (!shown) {
                inspectorRoot.find(".cs-inspector-status").html(
                    "<div class='cs-inspector-basic-context'>" + dump + "</div>" +
                    "<div class='cs-show-more'>&#9658; more</div>" +
                    "<div class='cs-inspector-extra-context' style='display: none;'>" + extra + "</div>");
                inspectorRoot.find(".cs-show-more").click(
                    function () {
                        if (inspectorRoot.find(".cs-inspector-extra-context:visible").length === 0) {
                            inspectorRoot.find(".cs-show-more").html("&#9660; less");
                        } else {
                            inspectorRoot.find(".cs-show-more").html("&#9658; more");
                        }
                        inspectorRoot.find(".cs-inspector-extra-context").toggle(400);
                    });
                shown = true;
            } else {
                inspectorRoot.find(".cs-inspector-status .cs-inspector-basic-context").html(dump);
                inspectorRoot.find(".cs-inspector-status .cs-inspector-extra-context").html(extra);
            }
        }
    };

    this.showHideInspector = function() {
        var mon = inspectorRoot.find(".cs-inspector-monitor");
        var c= "collapsed";
        if (mon.hasClass(c)) {
            mon.removeClass(c);
            persistCustomCsModeState("csInspectorView", "normal");
        } else {
            mon.addClass(c);
            persistCustomCsModeState("csInspectorView", "collapsed");
        }
    };

    function showState(message, state) {
        var bullet = state==="shown" ? VChar : XChar ;
        inspectorRoot.find(".cs-inspector-campaign-state").removeClass("shown blocked").addClass(state).html("<span class=\"cs-bullet\">"+ bullet +" </span> "+message+"<hr>");
    }

    this.blockedReason = function(campaign, reason) {

        if (inspectMode && campaign === trackedCampaignId && !showingOnCurrentPage) {
            try {
                showState(reason, "blocked");
            } catch (e) {
                logError("Error tracking campaign blocking reason: " + e.name+", details: "+e.message, e);
            }
        }
    };
    this.campaignShown= function(campaign, reason) {
        if (inspectMode && campaign === trackedCampaignId) {
            try {
                showState(reason, "shown");
                showingOnCurrentPage = true;
            } catch (e) {
                logError("Error tracking campaign show reason: " + e.name+", details: "+e.message, e);
            }
        }
    };

    this.trackTargeting = function(campaign, context) {
        if (context && context.hasOwnProperty("getProviderName") && context.getProviderName() !== "timer") {
            lastContext = context;  // save aside a recent context for campaign swaps
        }
        if (inspectMode && campaign.hasOwnProperty("id") && campaign.id === trackedCampaignId) {  // is this the inspected campaign?
            try {
                if (context && context.getProviderName) {
                    var updateOnly = trafficLightDrawn || context.getProviderName() === "timer" ;
                    var trafficLight = "";
                    if (campaign.rules.length === 0 ) {
                        trafficLight = trafficLightHtml(
                                [{key:"All Visitors",id:"cid-"+campaign.id,satisfied:true, matcher:"", value:"" }],
                                { getValue: function(){return "";} }
                        );
                    } else if (campaign.rules[0].hasOwnProperty("orGroup")) {
                        var orGroup = campaign.rules[0].orGroup;
                        for (var j = 0; j < orGroup.length; j++) {
                            if (!updateOnly){
                                trafficLight += trafficLightHtml(orGroup[j].andGroup, context) + ((j + 1 < orGroup.length) ? "\n<div>OR</div>\n" : "\n"); // create red/green html
                            } else {
                                updateTrafficLight(orGroup[j].andGroup, context);
                            }
                        }
                    } else {
                        if (!updateOnly){
                            trafficLight = trafficLightHtml(campaign.rules, context); // create red/green html
                        } else {
                            updateTrafficLight(campaign.rules, context);
                        }
                    }
                    if (!updateOnly) {
                        inspectorRoot.find(".cs-inspector-traffic-light").html(trafficLight + "<hr>");
                        trafficLightDrawn = true;
                    }
                }
            } catch (e) {
                logError("Error tracking campaign targeting: " + e.name+", details: "+e.message, e);
            }
        }

        function trafficLightHtml(ruleGroup, context) {
            var trafficLight = "<div class='cs-rule-group'>";
            for (var i = 0; i < ruleGroup.length; i++) {
                var rule = ruleGroup[i];
                trafficLight += ruleHtml(rule, context);
            }
            trafficLight += "</div>";
            return trafficLight;
        }

        function updateTrafficLight(ruleGroup, context) {  // only update the satisfied status and context values
            for (var i = 0; i < ruleGroup.length; i++) {
                var rule = ruleGroup[i];
                if (context.getValue(rule.key)) { // do we have a value in the current context provider?
                    inspectorRoot.find("#cs-"+rule.id).prop("title", context.getValue(rule.key));
                }
                if (rule.satisfied) { // do we have a value in the current context provider?
                    inspectorRoot.find("#cs-"+rule.id).addClass("satisfied");
                } else {
                    inspectorRoot.find("#cs-"+rule.id).removeClass("satisfied");
                }
            }
        }

        function ruleHtml(rule, context) {
            return "<div id='cs-"+rule.id+"' class='rule-row" + (rule.satisfied ? " satisfied" : "") + "' title='" + context.getValue(rule.key) + "'>" +
                    "<span class='cs-bullet'>"+bulletChar+" </span>" +
                    "<span class='cs-key'>" + rule.key.replace("context.", "").replace("timer.", "") + "</span>" +
                    "<span class='cs-matcher'> " + prettyMatcher(rule.matcher) + " </span>" +
                    "<span class='cs-value'>" + rule.value.toString() + "</span>" +
                "</div>";
        }

        function prettyMatcher(matcher) {
            var pretty = {
                "eq": "is",
                "gt": ">",
                "lt": "<",
                "not contains": "doesn't contain"
            };
            return pretty.hasOwnProperty(matcher) ? pretty[matcher] : matcher;
        }

    };

    function buildCampaignsMenu() {
        function entry(id) {
            var d = document.createElement("div");
            d.id = "setCampaign-" + id;
            var d$ = jq(d);
            d$.addClass("cs-inspector-menu-item");
            var thisCampaign = DisplayerController.getCampaign(id);
            d$.html(id.length>0 ? (id + mobileMark(thisCampaign, " (M)" )) : "None").click( function(event) {  // if no campaign id, entry sets tracked to none.
                that.changeCampaign(id);
            });
            return d$;
        }
        inspectorRoot.find("#setCampaignId").append("<div class=\"cs-campaigns-menu\"></div>");
        var campaigns = DisplayerController.getCampaignIds();
        for (var i=0 ; i<campaigns.length ; i++) {
            inspectorRoot.find("#setCampaignId .cs-campaigns-menu").append(entry(campaigns[i]));
        }
        inspectorRoot.find("#setCampaignId .cs-campaigns-menu").hide().append(entry(""));
    }

    function mobileMark(campaign, text) {
        if (campaign && campaign.hasOwnProperty('mobileSupported') && campaign.mobileSupported) {
            return  "<span class='" + (isMobile ? '' : 'cs-bold-error') + "'>" + text + "</span>";
        } else {
            return '';
        }
    }

    function about() {
        aboutStr =
            "About:" +
            "\nVersion: " + codeVersion +
            "\nCient Id: " + clientId +
            "\nSite Id: " + siteId +
            "\nWidgget bulld Id: " + buildId ;
        alert(aboutStr);
    }

    function setTitle(){
        var title = "";
        var lastBuild = getCustomCsModeState("csInspectedBuild");
        persistCustomCsModeState("csInspectedBuild", buildId); // save the current build to detect a newly Published builds
        if (lastBuild && lastBuild !== buildId) {
            title += "<span class='cs-emphasize'>Published (" + codeVersion + ") </span>" ;
        }

        if (typeof trackedCampaignId == "string" && trackedCampaignId.length > 0) {
            try {
                title += "Inspecting campaign: " + trackedCampaignId ;
                if (DisplayerController.getCampaignIds().indexOf(trackedCampaignId) == -1) {
                    title += "<span class='cs-bold-error'> - not found</span>" ;
                } else {
                    title += mobileMark(trackedCampaign, " (Mobile)" ) ;
                }
            } catch(e) {
                // just protect against DisplayerController return
            }
        }
        inspectorRoot.find(".cs-inspector-title").html(title);
    }

    function injectInspector() {
        inspectorRoot = jq("<div id=\"csInspectorRoot\"></div>").appendTo("#"+rootContainerId);

        var inspectorMenu = (function(inspectorRoot) {
            inspectorRoot.append(
                "<div class=\"cs-inspector-hotspot\">" +
                    "<div class=\"cs-inspector-menu\" style=\"display: none\">" +
                        "<div id=\"resetSession\" class=\"cs-inspector-menu-item\">Reset Session</div>" +
                        "<div id=\"setCampaignId\" class=\"cs-inspector-menu-item\">Inspect Campaign</div>" +
                        "<div id=\"csAbout\" class=\"cs-inspector-menu-item\">About</div>" +
                    "</div>"+
                "</div>");
            inspectorRoot.append(
                "<div class=\"cs-inspector-monitor\">" +
                    "<div class=\"cs-inspector-monitor-nub\">&#9660; Inspect</div>"+
                    "<div class=\"cs-inspector-monitor-content\">"+
                        "<div class=\"cs-inspector-monitor-close\">X</div>"+
                        "<div class=\"cs-inspector-title\"></div>" +
                        "<div class=\"cs-inspector-traffic-light\"></div>" +
                        "<div class=\"cs-inspector-campaign-state\"></div>" +
                        "<div class=\"cs-inspector-status\"></div>" +
                    "</div>" +
                "</div>");
            if (getCustomCsModeState("csInspectorView")==="collapsed"){
                inspectorRoot.find(".cs-inspector-monitor").addClass("collapsed");
            }

            inspectorRoot.find(".cs-inspector-monitor-nub, .cs-inspector-monitor-close").click(
                function () {
                    that.showHideInspector();
                });

            inspectorRoot.find(".cs-inspector-hotspot").click(function() {
                    inspectorRoot.find(".cs-inspector-hotspot .cs-inspector-menu").toggle();
                    var submenu = inspectorRoot.find(".cs-campaigns-menu");
                    if (submenu.is(":visible")){
                        submenu.hide();
                    }
                });

            inspectorRoot.find("#resetSession").click( function() {
                        Tracker.killSession();
                });

            inspectorRoot.find("#csAbout").click( function() {
                    about();
                });

            inspectorRoot.find("#setCampaignId").click( function(event) {
                    var submenu = inspectorRoot.find(".cs-campaigns-menu");
                    if (submenu.is(":visible")){
                        submenu.hide();
                    } else {
                        submenu.show();
                        event.stopPropagation();
                    }
                });
        });
        inspectorMenu(inspectorRoot);
    }

};

function BaseCampaign(config) {
    this.config = config;
    this.editingMode = urlParams.cseditormode ? urlParams.cseditormode==="edit" : false;
}

BaseCampaign.prototype.triggerCampaign = function(variant, showImmediately) {
    var actions = variant.templateParams.widget.actions;
    var campaignId = this.config.id;
    var variantId = variant.id;
    var experienceType = variant.experienceType;
    var canvasActions = CSArray.csmap(actions, function(action) {
        action.variantId = variantId;
        action.experienceType = experienceType;
        action.campaignId = campaignId;
        return ActionsFactory.createAction(action);
    });

    var actionEditingMode = this.editingMode;    
    var wasSuccessfullyTriggered = canvasActions.every(function(canvasAction) {
        return canvasAction.execute(actionEditingMode);
    });

    if (this.editingMode) {
        var injector = InjectorsRepository.injectorForCanvasType(variant.templateParams.widget.canvasType);
        injector.injectEditingCapabilities(variantId);
        Containers.registerContainer("canvas", injector.elementsContainerId);
    }
       
    return wasSuccessfullyTriggered;
};


var CampaignOccurrences = new function() {

    var experienceTypeOccurrenceMap = {
        "imageCallToActionMessage": 6,	// Message with image and CTA (includes both overalys and slide-out
        "lead": 3,	// Message
        "grantCoupon": 1  // Offer
    };

    this.displayerTypeOccurrenceMap = {
        "bar": 1,
        "bubbler": 4,
        "lightbox": 2,
        "canvasLightbox": 2
    };

    var currentlyDisplaying = [];
    var currentlyPending = [];

    this.variantDisplaying = function(variantId) {
        if (!Campaigns.isControlVariant(variantId) && currentlyDisplaying.indexOf(variantId) === -1) {
            currentlyDisplaying.push(variantId);
        }
    };

    this.variantDoneDisplaying = function(variantId) {
        var done;
        do {
            done = true;
            var indexOf = currentlyDisplaying.indexOf(variantId);
            if (indexOf>-1) {
                currentlyDisplaying.splice(indexOf, 1);
                done = false;
            }
        } while(done===false);
    };

    this.currentlyDisplayingVariants = function() {
        return currentlyDisplaying.slice(0);
    };

    this.executeAllPendingVariants = function() {
        while (currentlyPending.length) {
            DisplayerController.attemptBehaviorExecution(currentlyPending.pop());
        }
    };

    this.variantPending = function(id) {
        if (!Campaigns.isControlVariant(id) && currentlyPending.indexOf(id) === -1) {
            currentlyPending.push(id);
        }
    };

    this.persistPendingVariant = function(variant) {
        if (variant.hasOwnProperty("id") && !Campaigns.isControlVariant(variant.id)) {
            contextStorage.setItem(DisplayerController.getPersistencePendingKey(variant.id), "true", false);
            this.variantPending(variant.id);
        }
    };

    this.clearPendingVariant = function(variant) {
        contextStorage.unsetItem(DisplayerController.getPersistencePendingKey(variant.id));
        var done;
        do {
            done = true;
            var indexOf = currentlyPending.indexOf(variant.id);
            if (indexOf>-1) {
                currentlyPending.splice(indexOf, 1);
                done = false;
            }
        } while(done===false);
    };


    this.shouldBlockCampaignIfRealEstateNotAvailable = function(variant) {
        var realEstateType = Campaigns.getVariantRealEstateType(variant);
        return realEstateType !== "contentChanger" && realEstateType !== "splitter";
    };

    this.findCampaignBlockingRealEstateForVariantInDisplaying = function(variant) {
        return this.findCampaignBlockingRealEstateForVariant(variant, currentlyDisplaying);
    };

    this.findCampaignBlockingRealEstateForVariantInPending = function(variant) {
        return this.findCampaignBlockingRealEstateForVariant(variant, currentlyPending);
    };

    this.findCampaignBlockingRealEstateForVariant = function(variant, currentVariantIds) {
        var variantRealEstateType = Campaigns.getVariantRealEstateType(variant);

        var currentlyOccupiedRealEstateTypes = CSArray.csmap(currentVariantIds, function(variant) {
            return Campaigns.getVariantRealEstateTypeByVariantId(variant);
        });
        currentlyOccupiedRealEstateTypes = CSArray.csfilternulls(currentlyOccupiedRealEstateTypes);

        var blockingIndex  = currentlyOccupiedRealEstateTypes.indexOf(variantRealEstateType);
        if (blockingIndex > -1) {
            var blockingVariantId = currentVariantIds[blockingIndex];
            return Campaigns.getVariant(blockingVariantId).campaignId;
        } else {
            return false;
        }
    };

    this.wasRealEstateTypeLimitExceeded = function(variant) {
        var variantRealEstateType = Campaigns.getVariantRealEstateType(variant);
        if (this.displayerTypeOccurrenceMap.hasOwnProperty(variantRealEstateType)) {
            var displayerOccurrenceCount = parseInt(contextStorage.getItem(DisplayerController.getPersistenceDisplayerOccurrenceKey(variantRealEstateType)), 10);
            if (displayerOccurrenceCount === displayerOccurrenceCount && displayerOccurrenceCount >= this.displayerTypeOccurrenceMap[variantRealEstateType]) {
                var variantId = variant.id;
                var campaignId = Campaigns.campaignIdForVariant(variant);
                reportInspectorBlockedReason(campaignId,"Blocked "+ campaignId + ", "+variantRealEstateType +" can show "+ this.displayerTypeOccurrenceMap[variantRealEstateType]+ " time(s)");
                logDebug("may not execute, reason: displayer type occurrence limit exceeded" + " campaign: " + campaignId + " variant " + variantId +" " + variantRealEstateType +" can show "+ this.displayerTypeOccurrenceMap[variantRealEstateType]+ " time(s)");
                return true;
            }
        }
        return false;
    };

    this.wasExperienceTypeLimitExceeded = function(variant) {
        var experienceType = variant.experienceType;
        var experienceOccurrenceCount = parseInt(contextStorage.getItem(DisplayerController.getPersistenceExperienceOccurrenceKey(experienceType)), 10);
        if (experienceOccurrenceCount===experienceOccurrenceCount && experienceOccurrenceCount>=experienceTypeOccurrenceMap[experienceType]) {
            var variantId = variant.id;
            var campaignId = Campaigns.campaignIdForVariant(variant);
            logDebug("may not execute, reason: experience occurrence limit exceeded" + " campaign: " + campaignId + " variant " + variantId + ", " + experienceType +" can show "+ experienceTypeOccurrenceMap[experienceType]+ " time(s)");
            reportInspectorBlockedReason(campaignId,"Blocked " + campaignId + ", "+variant.experienceType +" can show "+ experienceTypeOccurrenceMap[experienceType]+ " time(s)");
            return true;
        }
        return false;
    };

    this.incrementOccurrencesForVariant = function(objWithId) {
        if (!Campaigns.isControlVariant(objWithId.id)) {
            var variant = Campaigns.getVariant(objWithId.id);
            this.incrementExperienceTypeOccurrenceForVariant(variant);
            this.incrementRealEstateTypeOccurrenceForVariant(variant);
        }
    };

    this.incrementRealEstateTypeOccurrenceForVariant = function(variant) {
        var variantRealEstateType = Campaigns.getVariantRealEstateType(variant.behavior);
        if (this.displayerTypeOccurrenceMap.hasOwnProperty(variantRealEstateType)) {
            var occurrenceCount = contextStorage.getItem(DisplayerController.getPersistenceDisplayerOccurrenceKey(variantRealEstateType)) || 0;
            contextStorage.setItem(DisplayerController.getPersistenceDisplayerOccurrenceKey(variantRealEstateType), parseInt(occurrenceCount, 10)+1, false);
        }
    };

    this.incrementExperienceTypeOccurrenceForVariant = function(variant) {
        var campaign = DisplayerController.getCampaign(variant.campaignId);
        var experienceType = Campaigns.getExperienceTypeForCampaign(campaign);
        if (experienceType) {
            var occurrenceCount = contextStorage.getItem(DisplayerController.getPersistenceExperienceOccurrenceKey(experienceType)) || 0;
            contextStorage.setItem(DisplayerController.getPersistenceExperienceOccurrenceKey(experienceType), parseInt(occurrenceCount, 10)+1, false);
        }
    };

    this.setDisplayerTypeOccurrenceMap = function(map) {
        this.displayerTypeOccurrenceMap = map;
    };

    this.setExperienceTypeOccurrenceMap = function(map) {
        this.experienceTypeOccurrenceMap = map;
    };

    function reportInspectorBlockedReason(campaign,reason) {
        if (Inspector && Inspector.blockedReason){
            Inspector.blockedReason(campaign, reason);
        }
    }
};

var Campaigns = new function() {

    var campaignCreators = {
        "campaign": {
            creator: function (config) {
                return new BaseCampaign(config);
            }
        }
    };

    var campaigns = {};
    var variants = {};
    var campaignsByVariantId = {};

    this.registerCampaign = function(campaignId, config) {
        if (campaigns[campaignId]) {
            return;
        }
        // store container by dom id
        var campaign = campaignCreators.campaign.creator.call(this, config);
        campaigns[campaignId] = campaign;
    };

    this.getCampaign = function(campaignId) {
        return campaigns[campaignId];
    };

    this.getVariant = function(variantId) {
        return variants[variantId];
    };

    this.getCampaignByVariantId = function(variantId) {
        return campaignsByVariantId[variantId];
    };

    this.createCampaignForPreview = function() {
        var config = {id:"previewCampaign"};
        return new BaseCampaign(config);
    };

    this.registerCampaignVariant = function(campaign, variant, evaluator) {
        variants[variant.id] = {behavior: campaign.variantsConfig[variant.id], evaluator: evaluator, campaignId: campaign.id};
        campaignsByVariantId[variant.id] = campaigns[campaign.id];
    };

    this.createRulesEvaluatorForCampaignAndRegisterCampaignVariants = function(campaign) {
        var evaluator = RulesEvaluatorsFactory.createRulesEvaluator(campaign);
        evaluator.on("satisfied_"+campaign.id, DisplayerController.attemptBehaviorExecution, campaign.id);
        for (var v=0; v < campaign.variants.length; v++) {
            var variant = campaign.variants[v];
            this.registerCampaignVariant(campaign, variant, evaluator);
        }
        var preload = function() {
            evaluator.on("satisfiedPartial", DisplayerController.preloadAssets);
            var tempContext = baseContextConstructor();
            for (var i = 0; i < valueKnownRules.length; i++) {
                var value = UserContext.getValue(valueKnownRules[i]);
                tempContext.setValue(valueKnownRules[i], value);
            }
            evaluator.check(tempContext, true);
        };
        if (Tracker.pageViewDone) {
            preload();
        } else {
            Tracker.on("pageview_done", preload);
        }

    };

    var baseContextConstructor = function() {
        var dict = {};
        return {
            getValue: function(key) {
                return dict[key];
            },
            setValue: function(key, value) {
                dict[key] = value;
            }
        };
    };

    this.getExperienceTypeForCampaign = function(campaign) {
        var liveVariant = this.getOneLiveVariantForCampaign(campaign);
        if (liveVariant) {
            return liveVariant.experienceType;
        }
        return null;
    };

    this.getOneLiveVariantForCampaign = function(campaign) {
        var liveVariants = this.getLiveVariantsForCampaign(campaign);
        if (liveVariants && liveVariants.length > 0) {
            return liveVariants[0];
        }
        return null;
    };

    this.getLiveVariantsForCampaign = function(campaign) {
        var variantsArray = this.variantsMapToArray(campaign.variantsConfig);
        return CSArray.csfilter(variantsArray, function(variant) {
            return variant.displayer !== "control";
        });
    };

    this.getControlVariantForCampaign = function(campaign) {
        var variantsArray = this.variantsMapToArray(campaign.variantsConfig);
        var controlVariants = CSArray.csfilter(variantsArray, function(variant) {
            return variant.displayer === "control";
        });
        if (!controlVariants || controlVariants.length != 1) {
            return null;
        }
        return controlVariants[0];
    };

    this.getControlVariantIdForCampaign = function(campaignId) {
        var campaign = DisplayerController.getCampaign(campaignId);
        var controlVariant = this.getControlVariantForCampaign(campaign);
        if (controlVariant) {
            return controlVariant.id;
        }
        return null;
    };

    this.variantsMapToArray = function(variantsMap) {
        var variantIds = Object.keys(variantsMap);
        return CSArray.csmap(variantIds, function(variantId) {
            return variantsMap[variantId];
        });
    };

    this.campaignIdForVariant = function(variant) {
        var campaignId = "no campaign id";
        var variantFromMap = this.getVariant(variant.id);
        if (variantFromMap) {
            campaignId = variantFromMap.campaignId;
        }
        return campaignId;
    };

    this.getVariantRealEstateTypeByVariantId = function(variantId) {
        var variant = this.getVariant(variantId);
        if (variant) {
            return this.getVariantRealEstateType(variant.behavior);
        }
        return null;
    };

    this.isCanvasVariant = function(variantId) {
        var variant = this.getVariant(variantId);
        if (variant && variant.behavior && variant.behavior.templateParams && variant.behavior.templateParams.widget) {
            return true;
        }
        return false;
    };

    this.getCanvasType = function(variantId) {
        var variant = this.getVariant(variantId);
        if (variant && variant.behavior && variant.behavior.templateParams && variant.behavior.templateParams.widget && variant.behavior.templateParams.widget.canvasType) {
            return variant.behavior.templateParams.widget.canvasType;
        }
        return null;
    };

    this.isBarCampaign = function(variantId) {
        if (this.isCanvasVariant(variantId)) {
            return this.getCanvasType(variantId) === "bar";
        } else {
            return variants[variantId].behavior.displayer === "bar";
        }
    };

    this.getVariantRealEstateType = function(variant) {
        if (this.isControlVariant(variant.id)) {
            var variantFromMap = this.getVariant(variant.id);
            var campaign = DisplayerController.getCampaign(variantFromMap.campaignId);
            variant = this.getOneLiveVariantForCampaign(campaign);
        }
        var variantRealEstateType;
        if (variant && this.isCanvasVariant(variant.id)) {
            variantRealEstateType = this.getCanvasType(variant.id);
        } else {
            variantRealEstateType = variant.displayer;
        }
        variantRealEstateType = this.getOriginalExperianceTypeByExperienceType(variantRealEstateType);
        
        return variantRealEstateType;
    };

    this.getOriginalExperianceTypeByExperienceType = function(experienceType) {
        switch(experienceType) {
            case ("modal") :
                experienceType = "lightbox";
                break;
            case ("slideout") :
                experienceType = "bubbler";
                break;            
        }

        return experienceType;        
    };

    this.isControlVariant = function(variantId) {
        var variant = this.getVariant(variantId);
        return variant && variant.behavior && variant.behavior.displayer === "control";
    };
};

var Templates = new function() {

    this.applyTemplate = function(template, config) {
        template = template.replace(/'/g, '"');

        return notMustache(template, config);
    };


    var notMustache = (function () {
        /*jshint evil: true */
        var cache = {};
        function prepTemplate(str) {
            str = str.replace(/isValid\(([^\)]*)\)/g, "(typeof $1 !== 'undefined' && !!$1 ) ");
            str = str.replace(/[\r\t\n]/g, " ");
            str = str.split("<%").join("\t");
            str = str.replace(/((^|%>)[^\t]*)'/g, "$1\r");
            str = str.replace(/\t=(.*?)%>/g, "',$1,'");
            str = str.split("\t").join("');");
            str = str.split("%>").join("p.push('");
            str = str.split("\r").join("\\'");
            str = "p.push('" + str + "');" ;
            return str;
        }
        return function notMustache(str, data) {
            var fn = !/\W/.test(str) ?
                cache[str] = cache[str] ||
                    notMustache(document.getElementById(str).innerHTML) :
                new Function("obj",
                    "var p=[],print=function(){p.push.apply(p,arguments);};" +
                    "with(obj){"+
                    prepTemplate(str) +
                    "}return p.join('');");
            return data ? fn(data) : fn;
        };
    })();


};

function TextPageChange(config) {
    BasePageChange.call(this, config);

    this.applyChange = function() {

    };
}


TextPageChange.prototype = new BasePageChange();
TextPageChange.prototype.constructor = TextPageChange;

function BaseFormSubmission(config) {
    this.config = config;
}

function TextElement(config, variantId) {
    BaseElement.call(this, config, variantId, "text");

    this.template = "<div " +
    "<%if (isValid('elementDomId')){%>"+ " id='<%=elementDomId%>' <% } %>" +
    " class='cs-element' " +
                        "style='" +
                            "<%if (isValid(style) && style['z-index'])   {%>"+ " z-index:<%=style['z-index']%>; <% } %>" +
                            "<%if (isValid(position) && position.top)    {%>"+ " top:<%=position.top%>; <% } %>" +
                            "<%if (isValid(position) && position.left)   {%>"+ " left:<%=position.left%>; <% } %>" +
                            "<%if (isValid(size) && size.width)      {%>"+ " width:<%=size.width%>; <% } %>" +
                            "<%if (isValid(size) && size.height)     {%>"+ " height:<%=size.height%>; <% } %> "  + "'>"  +

                        "<div " +
                                 "<%if (isValid(elementDomId)){%>"+ " id='<%=elementDomId%>-inner' <% } %>" +
                                 " class='cs-text cs-content-container " +
                                 "<%if (isValid(callToAction)){%>"+ " cs-cta-element <% } %> "  + "'>"  +
                            "<%=text%>" +
                        "</div>" +
                    "</div>";
}

TextElement.prototype = new BaseElement();
TextElement.prototype.constructor = TextElement;



function ImageSrcPageChange(config) {
    BasePageChange.call(this, config);

    this.applyChange = function() {
        var element = jq(this.config.selector);
        element.attr("src", this.config.changeValue);
    };
}


ImageSrcPageChange.prototype = new BasePageChange();
ImageSrcPageChange.prototype.constructor = ImageSrcPageChange;

var FormValidatorsFactory = new function() {

    var formValidatorsCreators = {
        "email": {
            creator: function (config, field) {
                return new EmailValidator(config, field);
            }
        },
        "phone": {
            creator: function (config, field) {
                return new PhoneValidator(config, field);
            }
        },
        "tenDigitsPhone": {
            creator: function (config, field) {
                return new TenDigitsPhoneValidator(config, field);
            }
        },
        "alphaNumeric": {
            creator: function (config, field) {
                return new AlphaNumericValidator(config, field);
            }
        },
        "required": {
            creator: function (config, field) {
                return new RequiredValidator(config, field);
            }
        }
    };

    this.createFormValidator = function(type, config, field) {
        if (formValidatorsCreators[type]) {
            var creator = formValidatorsCreators[type].creator;
            var validator = creator.call(this, config, field);
            return validator;
        }
        return null;
    };
};


function HtmlElement(config, variantId) {
    BaseElement.call(this, config, variantId, "html");
    this.shouldExecutSomthingAfterInject = true;

    this.template = "<div " +
    "<%if (isValid('elementDomId')){%>"+ " id='<%=elementDomId%>' <% } %>" +
    " class='cs-element' " +
                        "style='" +
                            "<%if (isValid(style) && style['z-index'])   {%>"+ " z-index:<%=style['z-index']%>; <% } %>" +
                            "<%if (isValid(position) && position.top)    {%>"+ " top:<%=position.top%>; <% } %>" +
                            "<%if (isValid(position) && position.left)   {%>"+ " left:<%=position.left%>; <% } %>" +
                            "<%if (isValid(size) && size.width)      {%>"+ " width:<%=size.width%>; <% } %>" +
                            "<%if (isValid(size) && size.height)     {%>"+ " height:<%=size.height%>; <% } %> "  + "'>"  +

                        "<div " +
                                 "<%if (isValid(elementDomId)){%>"+ " id='<%=elementDomId%>-inner' <% } %>" +
                                 " class='cs-custom-html cs-content-container " +
                                 "<%if (isValid(callToAction)){%>"+ " cs-cta-element <% } %> "  + "'>"  +
                            "<div class='cs-element-content'>" +
                                "<%=customHtml%>" +
                            "</div>" +
                        "</div>" +
                    "</div>";
}

HtmlElement.prototype = new BaseElement();
HtmlElement.prototype.constructor = HtmlElement;

HtmlElement.prototype.executeAfterElementInTheDom = function(editingMode) {
    if (this.config.customJavascript) {
        this.removeExistCustomHtmlScriptFromHead();
        this.injectCustomHtmlScriptToHead(this.config.customJavascript);
    }
};

HtmlElement.prototype.removeExistCustomHtmlScriptFromHead = function() {
    var csClassName = this.getCustomClassNameByElementGuid(this.config.elementGuid);
    var currentExistScriptTags = jq("."+csClassName);

    if (currentExistScriptTags.length) {
        currentExistScriptTags.remove();
    }
};

HtmlElement.prototype.injectCustomHtmlScriptToHead = function(customJsCode) {    
    if (customJsCode) {
        var that = this;
        customJsCode.forEach(function(script) {
            var scriptTag = that.createScriptTagWithJsCode(script.scriptInnerContent);
            that.apeendScriptTagToDocumentHead(scriptTag);                        
        });        
    }
};

HtmlElement.prototype.createScriptTagWithJsCode = function(jsCode) {
    var csClassName = this.getCustomClassNameByElementGuid(this.config.elementGuid);  
    var scriptTag = document.createElement("script");
    scriptTag.type = "text/javascript";
    scriptTag.innerText = jsCode;
    scriptTag.innerHTML = jsCode;
    
    scriptTag.classList.add(csClassName);        

    return scriptTag;
};

HtmlElement.prototype.apeendScriptTagToDocumentHead = function(scriptTag) {
    document.getElementsByTagName('head')[0].appendChild(scriptTag);
};

HtmlElement.prototype.getCustomClassNameByElementGuid = function(elementGuid) {
    return "cs-custom-js-guid-" + elementGuid; 
};


var CallToActionsFactory = new function() {

    var callToActionCreators = {
        "default": {
            creator: function (config, injector) {
                return new DefaultCallToAction(config, injector);
            }
        },
        "openLink": {
            creator: function (config, injector) {
                return new OpenLinkCallToAction(config, injector);
            }
        },
        "formButton": {
            creator: function (config, injector) {
                return new FormSubmissionCallToAction(config, injector);
            }
        },
        "customClose": {
            creator: function (config, injector) {
                return new DefaultCallToAction(config, injector);
            } 
        },
        "confirmAndClose": {
            creator: function (config, injector) {
                return new ConfirmAndCloseCallToAction(config, injector);
            }
        },
        "customJs": {
            creator: function (config, injector) {
                return new CustomJsCallToAction(config, injector);
            }
        }
    };


    this.createCallToAction = function(config, injector) {
        if (config.callToAction) {
            return this.createCallToActionByType(config.callToAction.type, config, injector);
        }
        return null;
    };

    this.createCallToActionByType = function(type, config, injector) {
        if (callToActionCreators[type]) {
            var creator = callToActionCreators[type].creator;
            var action = creator.call(this, config, injector);
            return action;
        }
        return null;
    };

    this.executeCallToActionByElement = function (element, actionType) {        
        var callToActionConfiguration = {
            callToAction: {type: actionType}
        };

        element = jq(element);
        //if multiple elements were sent get the first one
        if (element.length > 1) {
            element = jq(element[0]);
        }         

        var csElement = ElementsFactory.getElementByDomElement(element);
        var injector = InjectorsRepository.injectorForCanvasType(csElement.config.canvasType);
        

        //if we are in the editor return and don't execute any action
        if (injector.editingMode) {
            return;
        } 

        var action = this.createCallToAction(callToActionConfiguration, injector);
        if (action) {
            action.execute();
        } else {
            logError("Error handling call to action." + "action type: " + actionType + " didn't execute", ERROR_CANVAS_CUSTOM_CALL_TO_ACTION_FAILED);
        }
    };    
};


function StylePageChange(config) {
    BasePageChange.call(this, config);

    function stringEndsWith(str, suffix) {
        return str.indexOf(suffix, str.length - suffix.length) !== -1;
    }

    function styleToJson(elementStyle) {
        var styleParts = elementStyle.split(";");

        return CSArray.csreduce(styleParts, function(res, part) {
            var p = part.match(/^([^&]*?):(.*)$/);

            if (p && p.shift() && p.length === 2) {
                var styleAttribute = p[0].trim();
                var styleValue = p[1].trim();
                res[styleAttribute] = styleValue;
            }
            return res;
        }, {});
    }

    function jsonToStyle(json) {
        var keys = Object.keys(json);
        return CSArray.csreduce(keys, function(res, key) {
            return res + key+":"+json[key]+";";
        }, "");
    }

    this.applyChange = function() {
        var element = jq(config.selector);
        if (element) {
            var currentStyle = element.attr("style") || "";
            var styleJson = styleToJson(currentStyle);
            jq.extend(true, styleJson, config[config.changeType]);
            var newStyle = jsonToStyle(styleJson);
            element.attr("style", newStyle);
        }
    };
}



StylePageChange.prototype = new BasePageChange();
StylePageChange.prototype.constructor = StylePageChange;

function ImageElement(config, variantId) {
    BaseElement.call(this, config, variantId, "image");

    this.template = "<div " +
        "<%if (isValid('elementDomId_defined')){%>"+ " id='<%=elementDomId%>' <% } %>" +
            " class='cs-element' " +
            "style='" +
                "<%if ( isValid(style) && style['z-index'] )   {%>"+ " z-index:<%=style['z-index']%>; <% } %>" +
                "<%if ( isValid(position) && position.top )    {%>"+ " top:<%=position.top%>; <% } %>" +
                "<%if ( isValid(position) && position.left )   {%>"+ " left:<%=position.left%>; <% } %>" +
                "<%if ( isValid(position) && position.right )   {%>"+ " right:<%=position.right%>; <% } %>" +
                "<%if ( isValid(size) && size.width )      {%>"+ " width:<%=size.width%>; <% } %>" +
                "<%if ( isValid(size) && size.height )     {%>"+ " height:<%=size.height%>; <% } %> "  + "'>"  +

                "<div class='cs-image-outer' "+
                "style='" +
                    "<%if ( isValid(size) && size.width )      {%>"+ " width:<%=size.width%>; <% } %>" +
                    "<%if ( isValid(size) && size.height )     {%>"+ " height:<%=size.height%>; <% } %> "  + "'>"  +

                    "<div " +
                        "<%if ( isValid(elementDomId) ){%>"+ " id='<%=elementDomId%>-inner' <% } %>" +
                        " class='cs-image cs-content-container' " +
                        "style='" +
                        "<%if ( isValid(size) && size.width )      {%>"+ " width:<%=size.width%>; <% } %>" +
                        "<%if ( isValid(size) && size.height )     {%>"+ " height:<%=size.height%>; <% } %> "  + "'>"  +

                        "<img src='<%=url%>' class='cs-element-content " +
                            "<%if ( isValid(callToAction) ){%>"+ " cs-cta-element <% } %> '"   +
                            "style='" +
                            "<%if ( isValid(size) && size.width )      {%>"+ " width:<%=size.width%>; <% } %>" +
                            "<%if ( isValid(size) && size.height )     {%>"+ " height:<%=size.height%>; <% } %> "  + "'>"  +
                    "</div>" +
            "</div>" +
    "</div>";

}

ImageElement.prototype = new BaseElement();
ImageElement.prototype.constructor = ImageElement;


ImageElement.prototype.getDomIdForAttributeType = function(elementDomId, attribute) {
    if (attribute.indexOf("position.") > -1) {
        attribute = attribute.substring(attribute.indexOf("position.")+"position.".length);
    }
    if (attribute.indexOf("size.") > -1) {
        attribute = attribute.substring(attribute.indexOf("size.")+"size.".length);
    }
    if (attribute === "width") {
        return [ "#"+elementDomId, "#"+elementDomId+" .cs-image-outer", "#"+elementDomId+" .cs-image", "#"+elementDomId+" .cs-element-content"];
    }
    if (attribute === "height") {
        return [ "#"+elementDomId, "#"+elementDomId+" .cs-image-outer", "#"+elementDomId+" .cs-image", "#"+elementDomId+" .cs-element-content"];
    }
    if (attribute === "top") {
        return ["#"+elementDomId];
    }
    if (attribute === "left") {
        return ["#"+elementDomId];
    }
    if (attribute === "right") {
        return ["#"+elementDomId];
    }
    else {
        return StyleAttributes.elementIdForAttribute(elementDomId, attribute);
    }
};

ImageElement.prototype.fetchUrlsToPreload = function() {
    return [this.config.url];
};

function ButtonElement(config, variantId) {
    BaseElement.call(this, config, variantId, "button");    

    this.template = "<div " +
        "<%if (isValid(elementDomId)){%>"+ " id='<%=elementDomId%>' <% } %>" +
            " class='cs-element' " +
                "style='" +
                    "<%if ( isValid(style) && style['z-index'] )   {%>"+ " z-index:<%=style['z-index']%>; <% } %>" +
                    "<%if ( isValid(position) && position.top )    {%>"+ " top:<%=position.top%>; <% } %>" +
                    "<%if ( isValid(position) && position.left )   {%>"+ " left:<%=position.left%>; <% } %>" +
                    "<%if ( isValid(size) && size.width )      {%>"+ " width:<%=size.width%>; <% } %>" +
                    "<%if ( isValid(size) && size.height )     {%>"+ " height:<%=size.height%>; <% } %> "  + "'>"  +

                "<div " +
                    "<%if (isValid(elementDomId)){%>"+ " id='<%=elementDomId%>-inner'<% } %>" +
                        " class='cs-btn cs-content-container " +
                        "<%if ( isValid(callToAction) ){%>"+ " cs-cta-element <% } %> "  + "'>"  +
                            "<div class='cs-btn-text ' " +
                                "style=" +
                                    "<%if ( isValid(size) && size['line-height'] )     {%>"+ " height:<%=size['line-height']%>; <% } %> "  + "'>"  +
                            "<%=text%>" +
                    "</div>" +
        "</div>" +
    "</div>";

    // for backward compatibility - turn on track clicks for buttons with "openLink"
    this.callToActionToTrackClicks = function() {
        if (!this.config.trackClicks) {
            if (this.config.callToAction && this.config.callToAction.type === "openLink") {
                this.config.trackClicks = this.enabledTrackClicks();
            }
        }
    };
}

ButtonElement.prototype = new BaseElement();
ButtonElement.prototype.constructor = ButtonElement;

ButtonElement.prototype.init = function(editingMode) {
    BaseElement.prototype.init.call(this);
    this.callToActionToTrackClicks();
};

ButtonElement.prototype.onConfigChange = function () {
    this.config.size["line-height"] = this.config.size.height;
    if (this.config.style && this.config.style["border-width"]) {
        this.config.size["line-height"] = parseInt(this.config.size.height, 10) - 2 * parseInt((this.config.style["border-width"]), 10)+"px";
    }
};

ButtonElement.prototype.getPageChangeActions = function() {
    var pageChangeActions = BaseElement.prototype.getPageChangeActions.call(this);
    var elementDomId = this.config.elementDomId;
    var lineHeight = this.config.size["line-height"];
    var lineHeightPageChange = {
        changeType: "style",
        selector: "#"+elementDomId+" .cs-btn-text",
        style: {
            "line-height": lineHeight
        }
    };
    pageChangeActions.push(PageChangesFactory.createPageChange(lineHeightPageChange));
    return pageChangeActions;
};


function BaseElement(config, variantId, type) {
    this.config = config;
    if (variantId && variantId.indexOf("+") > -1) {
        this.variantId = variantId.replace(/\+/, "_plus_");
    } else {
        this.variantId = variantId;
    }
    this.type = type;
    this.pageChangeAttributes = ["size", "position", "style"];
}


BaseElement.prototype.init = function(editingMode) {
    this.config.variantId = this.variantId;
    this.config.elementId = this.variantId + "-" + this.config.elementGuid;
    this.config.elementDomId = this.config.elementId + "-" + this.type;
    if (editingMode) {
        this.config.editingMode = true;
    }
    if (editingMode && this.config.elements) {
        // if element contains other elements, it is a container (for example form)
        Containers.registerContainer(this.config.elementType, this.config.elementDomId);
    }
    if (this.config.size) {
        // will be used by resize
        this.config.originalSize = jq.extend(true, {}, this.config.size);
    }
};

BaseElement.prototype.generate = function() {
    if (this.config.text) {
        var textObj = DynamicTexts.replaceDynamicText(this.config.text);
        
        this.config.text = textObj.text;
        this.config.isValidDynamicText = textObj.isValidDynamicText;
    }

    return Templates.applyTemplate(this.template, this.config);
};

BaseElement.prototype.onConfigChange = function () {
    
};

BaseElement.prototype.executeAfterElementInTheDom = function () {
    
};

BaseElement.prototype.getPageChangeActions = function() {
    var configKeys = Object.keys(this.config);
    var that = this;
    var elementConfig = this.config;
    var elementDomId = this.config.elementDomId;
    if (this.pageChangeAttributes && this.pageChangeAttributes.length > 0) {
        var pageActionsForAttributes = CSArray.csmap(this.pageChangeAttributes, function(pageChangeAttribute) {
            if (configKeys.indexOf(pageChangeAttribute) > -1) {
                return pageChangesForAttribute(that, elementDomId, pageChangeAttribute, elementConfig);
            }
            return null;
        });
        // pageActionsForAttributes is an array of arrays of PageChanges
        // turn it into array of PageChanges
        if (pageActionsForAttributes.length > 0) {
            pageActionsForAttributes = CSArray.csfilternulls(pageActionsForAttributes);
            if (pageActionsForAttributes.length > 0) {
                pageActionsForAttributes = CSArray.csflatten(pageActionsForAttributes);
            }
        }
        return pageActionsForAttributes;
    }

    function pageChangesForAttribute(that, elementDomId, attribute, config) {
        var attributeKeys = Object.keys(config[attribute]);
        var pageChanges = CSArray.csmap(attributeKeys, function(attributeKey) {

            var selectors = that.getDomIdForAttributeType(elementDomId, attribute+"."+attributeKey);
            var pageChanges = [];
            if (selectors) {
                pageChanges = CSArray.csmap(selectors, function(selector) {
                    var change = {
                        changeType: attribute
                    };
                    change.selector = selector;
                    change[attribute] = {};
                    change[attribute][attributeKey] = elementConfig[attribute][attributeKey];
                    if (change.selector && change[attribute]) {
                        return PageChangesFactory.createPageChange(change);
                    } else {
                        return null;
                    }
                });
            }
            pageChanges = CSArray.csfilternulls(pageChanges);
            return pageChanges;
        });
        pageChanges = CSArray.csfilternulls(pageChanges);


        if (pageChanges.length > 0) {
            pageChanges = CSArray.csflatten(pageChanges);
        }

        return pageChanges;
    }
    return [];
};

BaseElement.prototype.getDomIdForAttributeType = function(elementDomId, attribute) {
    return StyleAttributes.elementIdForAttribute(elementDomId, attribute);
};

BaseElement.prototype.validationFailed = function(element, errorMessage) {
    var form = element.parent();
    var input = element.find("input");
    var tooltip = form.find(".cs-error-message-tooltip");
    
    input.addClass("invalid");
    tooltip.find(".cs-error-message-tooltip-text").text(errorMessage);
    centerTooltip(element, tooltip);
    
    tooltip.fadeIn(function(){
        tooltip.addClass("fadeIn");
    });

    setTimeout(function(){
        tooltip.fadeOut("slow", function(){
            input.removeClass("invalid");
            tooltip.removeClass("fadeIn");
        });
    }, 7000);
    logDebug("VALIDATION FAILED " + JSON.stringify(this.config) + " " + errorMessage);

    function centerTooltip(inputField, tooltip) {
        var inputFieldTop = parseInt(inputField.css("top"), 10);
        var inputFieldLeft = parseInt(inputField.css("left"), 10);
        var inputFieldWidht = inputField.width();
        var tooltipWidth = tooltip.width();

        var topPosition = inputFieldTop - 30;
        var leftPosition = inputFieldLeft + (inputFieldWidht - tooltipWidth) / 2;

        tooltip.css({"top": topPosition+"px", "left": leftPosition+"px"});
    }
};

BaseElement.prototype.fetchUrlsToPreload = function() {
    return [];
};


BaseElement.prototype.enabledTrackClicks = function() {
    var trackClicks = {};
    trackClicks.enabled = true;
    return trackClicks;
};


function BaseValidator(config, field) {
    this.config = config;
    this.field = field;
}

BaseValidator.prototype.validate = function() {
    if (this.field) {
        var fieldElement = this.field;
        var element = ElementsFactory.getElementById(fieldElement.elementId);
        if (element) {
            var val = element.getInputValue();
            if (val !== null && val !== undefined) {
                return !this.validateInternal(val);
            }
        }
    }
    return true;
};


function RemoveAttributeFromStylePageChange(config) {
    BasePageChange.call(this, config);

    function stringEndsWith(str, suffix) {
        return str.indexOf(suffix, str.length - suffix.length) !== -1;
    }

    function styleToJson(elementStyle) {
        var styleParts = elementStyle.split(";");

        return CSArray.csreduce(styleParts, function(res, part) {
            var p = part.match(/^([^&]*?):(.*)$/);

            if (p && p.shift() && p.length === 2) {
                var styleAttribute = p[0].trim();
                var styleValue = p[1].trim();
                res[styleAttribute] = styleValue;
            }
            return res;
        }, {});
    }

    function jsonToStyle(json) {
        var keys = Object.keys(json);
        return CSArray.csreduce(keys, function(res, key) {
            return res + key+":"+json[key]+";";
        }, "");
    }

    this.applyChange = function() {
        var element = jq(config.selector);
        var attribute = config.attribute;
        if (element) {
            var currentStyle = element.attr("style") || "";
            var styleJson = styleToJson(currentStyle);
            delete styleJson[attribute];
            var newStyle = jsonToStyle(styleJson);
            element.attr("style", newStyle);
        }
    };
}



RemoveAttributeFromStylePageChange.prototype = new BasePageChange();
RemoveAttributeFromStylePageChange.prototype.constructor = RemoveAttributeFromStylePageChange;


function FormTextInputElement(config, variantId) {
    BaseElement.call(this, config, variantId, "formTextInput");

    this.template = "<div " +
                        "<%if (isValid('elementDomId')){%>"+ " id='<%=elementDomId%>' <% } %>" +
                        " class='cs-element cs-ignore-container-click' " +
                        "style='" +
                            "<%if (isValid(style) && style['z-index'])   {%>"+ " z-index:<%=style['z-index']%>; <% } %>" +
                            "<%if (isValid(position) && position.top)    {%>"+ " top:<%=position.top%>; <% } %>" +
                            "<%if (isValid(position) && position.left)   {%>"+ " left:<%=position.left%>; <% } %>" +
                            "<%if (isValid(size) && size.width)      {%>"+ " width:<%=size.width%>; <% } %>" +
                            "<%if (isValid(size) && size.height)     {%>"+ " height:<%=size.height%>; <% } %> "  + "'>"  +

                        "<div " +
                                 "<%if (isValid(elementDomId)){%>"+ " id='<%=elementDomId%>-inner' <% } %>" +
                                 " class='cs-input cs-content-container " +
                                  "'>"  +
                            "<input " +
                                "<%if (isValid(placeholder) && placeholder.text){%> placeholder='<%=placeholder.text%>' type='text' name='email' <% } %>" +
                                "style='" +
                                    "<%if (isValid(editingMode))   {%>"+ " pointer-events: none; <% } %>" +
                                    "<%if (isValid(style) && style['font-size'])   {%>"+ "font-size:<%=style['font-size']%>; <% } %>" +
                                    "<%if (isValid(style) && style['padding-left'])   {%>"+ "padding-left:<%=style['padding-left']%>; <% } %>" +
                                    "<%if (isValid(style) && style['padding-right'])   {%>"+ "padding-right:<%=style['padding-right']%>; <% } %>" +
                                    "<%if (isValid(style) && style['text-align'])   {%>"+ "text-align:<%=style['text-align']%>; <% } %>" +
                                    "<%if (isValid(size) && size.height)     {%>"+ " height:<%=size.height%>; <% } %> "  + "'>" +                            
                        "</div>" +
                    "</div>";
}

FormTextInputElement.prototype = new BaseElement();
FormTextInputElement.prototype.constructor = FormTextInputElement;

FormTextInputElement.prototype.getInputValue = function() {
    var fieldSelector = "#"+this.config.elementDomId+" input";
    var field = jq(fieldSelector);
    if (field) {
        return field.val();
    }
    return null;
};

FormTextInputElement.prototype.getDomIdForAttributeType = function(elementDomId, attribute) {
    if (attribute.indexOf("style.") > -1) {
        attribute = attribute.substring(attribute.indexOf("style.")+"style.".length);
    }
    if (attribute.indexOf("position.") > -1) {
        attribute = attribute.substring(attribute.indexOf("position.")+"position.".length);
    }
    if (attribute.indexOf("size.") > -1) {
        attribute = attribute.substring(attribute.indexOf("size.")+"size.".length);
    }
    if (attribute === "color") {
        return ["#"+elementDomId+"-inner input"];
    }
    if (attribute === "font-size") {
        return ["#"+elementDomId+"-inner input"];
    }
    else if (attribute === "font-family") {
        return ["#"+elementDomId+"-inner input"];
    }
    else if (attribute === "font-style") {
        return ["#"+elementDomId+"-inner input"];
    }
    else if (attribute === "font-weight") {
        return ["#"+elementDomId+"-inner input"];
    }
    if (attribute === "background-color") {
        return ["#"+elementDomId+"-inner input"];
    }
    else if (attribute === "border-width") {
        return ["#"+elementDomId+"-inner input"];
    }
    else if (attribute === "border-radius") {
        return ["#"+elementDomId+"-inner input"];
    }
    else if (attribute === "border-style") {
        return ["#"+elementDomId+"-inner input"];
    }
    else if (attribute === "border-color") {
        return ["#"+elementDomId+"-inner input"];
    }
    else if (attribute === "text-align") {
        return ["#"+elementDomId+"-inner input"];
    }
    else {
        return StyleAttributes.elementIdForAttribute(elementDomId, attribute);
    }
};

FormTextInputElement.prototype.getPageChangeActions = function() {
    var pageChangeActions = BaseElement.prototype.getPageChangeActions.call(this);
    var elementDomId = this.config.elementDomId;
    if (this.config.size && this.config.size.height) {
        var height = this.config.size.height;
        var inputHeightPageChange = {
            changeType: "style",
            selector: "#"+elementDomId+" input",
            style: {
                "height": height
            }
        };
        pageChangeActions.push(PageChangesFactory.createPageChange(inputHeightPageChange));
    }
    return pageChangeActions;
};

function DefaultCallToAction(config, injector) {
    BaseCallToAction.call(this, config, injector);
}

DefaultCallToAction.prototype = new BaseCallToAction();
DefaultCallToAction.prototype.constructor = DefaultCallToAction;

DefaultCallToAction.prototype.execute = function() {
	var campaignIsCurrentlyActive = this.isCampaignVisible(this.injector);
	if (campaignIsCurrentlyActive) {
    	this.injector.hide();
    	return true;
	} else {		
		logDebug("trying to close " + this.injector.rootElementId + " campaign, but it already closed");
		return false;	
	}
    
};

DefaultCallToAction.prototype.isCampaignVisible = function(injector) {
	if (injector) {
 		return jq("#"+injector.elementsContainerParentId).is(":visible");
	}
};

function ModalInjector() {
    this.rootElementId = "csModal";
    this.elementsContainerId = "cs-modal-elements-container";
    this.elementsContainerParentId ="cs-modal-elements-container-parent";
    this._innerSelector = ".cs-lightbox-inner";
    this.shouldDelayToTheEndWhenInject = true;

    this.template = "<div class='cs-lightbox-outer cs-overlay'></div>" +
                        "<div id='cs-modal-elements-container-parent' class='cs-modal-inner cs-elements-container-parent " +
                            "<%if ( isValid(callToAction) ){%>"+ "cs-cta-container <% } %>" + "'"  +
                            "style='padding:0; " +
                                "<%if (isValid(style['background-color']))   {%>"+ " background-color:<%=style['background-color']%>; <% } %>" +
                                "<%if (isValid(style['background-size']))   {%>"+ " background-size:<%=style['background-size']%>; <% } %>" +
                                "<%if (isValid(style['background-repeat']))   {%>"+ " background-repeat:<%=style['background-repeat']%>; <% } %>" +
                                "<%if (isValid(style['background-image']))   {%>"+ " background-image:<%=style['background-image']%>; <% } %>" +
                                "<%if (isValid(style['z-index']))   {%>"+ " z-index:<%=style['z-index']%>; <% } %>" +

                                "<%if (isValid(size.width))      {%>"+ " width:<%=size.width%>; <% } %>" +
                                "<%if (isValid(size.height))     {%>"+ " height:<%=size.height%>; <% } %> " +
                                "<%if (isValid(style['border-radius']))   {%>"+ " border-radius:<%=style['border-radius']%>; <% } %>"  + "'>"  +
                            "<div class='cs-modal-elements-container cs-elements-container' id='cs-modal-elements-container'>" +
                            "</div>" +
                    "</div>";    
}

ModalInjector.prototype = new BaseInjector();
ModalInjector.prototype.constructor = ModalInjector;



ModalInjector.prototype.renderInterior = function() {
    var _containerSelector = "#" + this.rootElementId;
    var _hookParts = function _hookParts(that) {
        var _containerSelector = "#" + that.rootElementId;
        var inner = jq(_containerSelector + " .cs-modal-inner");
        BaseInjector.prototype.hookBasicEvents.call(that, inner);
        jq(_containerSelector + " .cs-lightbox-outer").click(function() {
            if (that.editingMode) return;
            that.hide();
        });
    };

    jq(_containerSelector).css("opacity","0");
    jq(_containerSelector).show();
    this.centerModal();
    _hookParts(this);
    jq(_containerSelector).css("opacity","1");
    
    return true;
};

ModalInjector.prototype.centerModal = function() {
    var container = jq("#"+this.elementsContainerParentId);
    var left = Math.floor(container.outerWidth(false) / -2);
    var top = Math.floor(container.outerHeight(false) / -2);
    
    container.css({"margin-left":left+"px", "margin-top":top+"px"});
};

ModalInjector.prototype.getContainerResizeConfiguration = function() {
    var that = this;
    var config = {
            handles: "all",
            containment: jq(".cs-overlay"),
            minWidth: 200,
            minHeight: 200,
            maxHeight: 470, //we support iphone 4 - device height is 480 so we limit the max resize height
            resize: function(){
                that.centerModal();
            },
            stop: this.afterStopResizing()
        };

    return config;    
};



function CustomJsCallToAction(config, injector) {
    BaseCallToAction.call(this, config, injector);
}

CustomJsCallToAction.prototype = new BaseCallToAction();
CustomJsCallToAction.prototype.constructor = CustomJsCallToAction;

CustomJsCallToAction.prototype.execute = function() {
    if (this.config.callToAction && this.config.callToAction.customJsCode) {
        //add js code to the head
        //timeout is set so the custom js action code will run when our widget code is done and all of the events were sent
        setTimeout(function(){
            var jsCode = this.config.callToAction.customJsCode;       
            var scriptTag = document.createElement("script");
                
            scriptTag.type = "text/javascript";
            scriptTag.innerText = jsCode;
            scriptTag.innerHTML = jsCode;

            document.getElementsByTagName('head')[0].appendChild(scriptTag);
        }.bind(this) , 0);
    }
    return true;
};



var DynamicTexts = new function() {    
    
    var init = function() {
        Observer.on("geoContextUpdated", updateDynamicTextValue);
    };

    var updateDynamicTextValue = function() {        
        var dynamicTextElements = document.getElementsByClassName("cs-dynamic-text");
        
        for (var i = 0; i < dynamicTextElements.length; i++) {
            var element = dynamicTextElements[i];
            var property = element.getAttribute("data-property");
            var value = dynamicTextsTranslator(property);

            element.innerHTML = value;
        }       
    };

    var extractDynamicTexts = function(text) {
        var matches = text.match(/\[\[(.*?)\]\]/g);
        var results = [];
        if (matches) {
            for (var i=0; i<matches.length; i++) {
                results.push(matches[i].substr(2,matches[i].length-4));
            }
        }
        return results;
    };

    var dynamicTextsTranslator = function(property) {
        property = property || "";
        var defaultValue = null;
        var propertyParts = property.split("::");
        if (propertyParts.length === 2) {
            property = propertyParts[0];
            defaultValue = propertyParts[1];
        }
        property = property.toLowerCase();
        var translatedValue = null;

        if (property==="timeofday") {
            var hour = parseInt(UserContext.getValue("context.page.hour"), 10);
            if (hour>=5 && hour <12) {
                translatedValue = "Morning";
            }
            if (hour>=12 && hour<18) {
                translatedValue = "Day";
            }
            if (hour>=18 && hour<21) {
                translatedValue = "Evening";
            }
            if (hour>=21 || hour<5) {
                translatedValue = "Night";
            }
        }
        else if (property==="state") {
            translatedValue = contextStorage.getItem("context.user.state");
        }
        else if (property==="country") {
            translatedValue = contextStorage.getItem("context.user.country");
        }
        else if (property==="city") {
            translatedValue = contextStorage.getItem("context.user.city");
        }
        else if (property==="keyword") {
            translatedValue = contextStorage.getItem("context.user.landingPage.search");
        }
        else if (property==="text1" || property==="text2" || property==="text3" || property==="firstname" || property==="lastname") {
            var params = UserContext.getValue("context.page.params") || [];
            params = params.concat(UserContext.getValue("context.session.landingPage.params") || []);
            if (params.length) {
                for (var i=0; i<params.length; i++) {
                    var param = params[i];
                    var paramParts = param.split("=");
                    if (paramParts.length && paramParts[0].toLowerCase()===property) {
                        translatedValue = decodeURIComponent(paramParts[1]);
                    }
                }
            }
        }
        return translatedValue || defaultValue;
    };

    this.replaceDynamicText = function(text) {
        var dynamicProperties = extractDynamicTexts(text);
        var textObj = {
            text: text,
            isValidDynamicText: true
        };

        for (var i = 0; i < dynamicProperties.length; i++) {
            var property = dynamicProperties[i];
            var translated = dynamicTextsTranslator(property);
            
            translated = translated || "";
            text = text.replace("[[" + property + "]]", "<span class='cs-dynamic-text' data-property=" + property + ">" + translated + "</span>", "g");
            
            textObj.text = text;
            if (!translated) {
                textObj.isValidDynamicText = false;
            }            
        }


        return textObj;
    };

    init();
};

function FormElement(config, variantId) {
    BaseElement.call(this, config, variantId, "form");
    this.container = true;

    this.template = "<div " +
                            "<%if (isValid('elementDomId')){%>"+ " id='<%=elementDomId%>' <% } %>" +
                                " class='cs-element' " +
                                "style='" +
                                "<%if (isValid(style) && style['z-index'])   {%>"+ " z-index:<%=style['z-index']%>; <% } %>" +
                                "<%if (isValid(position) && position.top)    {%>"+ " top:<%=position.top%>; <% } %>" +
                                "<%if (isValid(position) && position.left)   {%>"+ " left:<%=position.left%>; <% } %>" +
                                "<%if (isValid(size) && size.width)      {%>"+ " width:<%=size.width%>; <% } %>" +
                                "<%if (isValid(size) && size.height)     {%>"+ " height:<%=size.height%>; <% } %> "  + "'>"  +

                                    "<div " +
                                    "<%if (isValid(elementDomId)){%>"+ " id='<%=elementDomId%>-inner' <% } %>" +
                                    " class='cs-form cs-content-container " + "'"  +
                                    "style='width: 100%; height: 100%;' >"+
                                        "<%if (isValid(elementsHtml)){%>"+ " <%=elementsHtml%> <% } %>" +

                                        "<%if (!isValid(editingMode))   {%>"+ 
                                            "<div class='cs-error-message-tooltip'> " +
                                                "<div class='cs-error-message-tooltip-text'>Invalid text</div> " +
                                            "</div> " +
                                        "<% } %>" +
                                    "</div>" +                                    
                    "</div>";
}

FormElement.prototype = new BaseElement();
FormElement.prototype.constructor = FormElement;



FormElement.prototype.generate = function() {
    var injector = InjectorsRepository.injectorForCanvasType(this.config.canvasType);
    injector.registerKeyEventsOnInputFields();

    var canvasElements = injector.createElements(this.config.canvasType, this.config.variantId, this.config.elements, this.editingMode, this.config.experienceType, this.config.campaignId);
    var formElementId = this.config.elementId;
    canvasElements.forEach(function(canvasElement) {
        canvasElement.config.containerId = formElementId;
    });
    var elementsHtml = injector.generateForElements(canvasElements);

    this.config.elementsHtml = elementsHtml;
    return BaseElement.prototype.generate.call(this);
};


FormElement.prototype.getPageChangeActions = function() {
    var formPageActions = BaseElement.prototype.getPageChangeActions.call(this);
    var elementsPageActions = CSArray.csmap(this.config.elements, function(element) {
        var canvasElement = ElementsFactory.getElementById(element.elementId);
        return canvasElement.getPageChangeActions();
    });
    elementsPageActions.push(formPageActions);
    return CSArray.csflatten(elementsPageActions);
};




var ExternalApi = new function() {
    this.closeCampaignByElement = function(clickedElement) {
    	if (clickedElement) {
    		try {
    			CallToActionsFactory.executeCallToActionByElement(clickedElement, "customClose");
    		} catch (e) {
    			logError("External API 'closeCampaignByElement' function didn't get execute " + e + ". Probably the DOM element " + clickedElement[0] + "is not located inside our campaign", ERROR_EXTERNAL_API_CLOSE_CAMPAIGN_FAILED);    			
    		}
    	} else {
    		logError("closeCampaignByElement wasn't executed because element argument wasn't sent to the function", ERROR_EXTERNAL_API_CLOSE_CAMPAIGN_FAILED);
    	}
    	        
    };

    this.closeCampaignByElementSelector = function(selector) {
    	if (selector) {
    		try {
		 		CallToActionsFactory.executeCallToActionByElement(selector, "customClose");        
    		} catch (e) {
    			logError("External API 'closeCampaignByElementSelector' function didn't get execute " + e + ". Probably the DOM element " + selector[0] + "is not located inside our campaign", ERROR_EXTERNAL_API_CLOSE_CAMPAIGN_FAILED);    			
    		}
    	} else {
    		logError("closeCampaignByElementSelector wasn't executed because element argument wasn't sent to the function", ERROR_EXTERNAL_API_CLOSE_CAMPAIGN_FAILED);
    	}
    	
    };
};

exportExternalApiFunc(ExternalApi.closeCampaignByElement, "closeCampaignByElement");
exportExternalApiFunc(ExternalApi.closeCampaignByElementSelector, "closeCampaignByElementSelector");

function ChangeAction(config) {
    BaseAction.call(this, config);

}

ChangeAction.prototype = new BaseAction();
ChangeAction.prototype.constructor = ChangeAction;


ChangeAction.prototype.execute = function(editingMode) {
    PageChangesFactory.createPageChange(this.config).applyChange();
};

var ActionsFactory = new function() {

    var actionCreators = {
        "inject": {
            creator: function (config) {
                return new InjectAction(config);
            }
        },
        "change": {
            creator: function (config) {
                return new ChangeAction(config);
            }
        }
    };


    this.createAction = function(config) {
        var creator = actionCreators[config.actionType].creator;
        var action = creator.call(this, config);
        return action;
    };
};


function BasePageChange(config) {
    this.config = config;
}


function EmailCollectionFormSubmission(config) {
    BaseFormSubmission.call(this, config);
}

EmailCollectionFormSubmission.prototype = new BaseFormSubmission();
EmailCollectionFormSubmission.prototype.constructor = EmailCollectionFormSubmission;

EmailCollectionFormSubmission.prototype.submitForm = function(fields) {
    logDebug("Email Collection: " + fields);

    var emailSubscriptionUrl = buildEmailSubscriptionUrl(fields, this.config.campaignId, this.config.variantId);
    var callbackJsMethod = "__csGlobal__['csEmailRegjsonp']";
    add_script(emailSubscriptionUrl+"&callback="+callbackJsMethod, function () {
        logDebug("email subscription script was loaded");
    });
};

var buildEmailSubscriptionUrl = function buildCSNewsletterUrl(fields, campaignId, variantId) {
    var valuesString = JSON.stringify(fields);
    var url = emailSubscriptionUrl + "?";
    url += "ver=1";
    //if (devMode) {
    //	url += "&dev=1";
    //}
    url += "&clientId=" + encodeURIComponent(clientId);
    url += "&campaignId=" + encodeURIComponent(campaignId);
    url += "&variantId=" + encodeURIComponent(variantId);
    url += "&data=" + base64_encode(valuesString);
    if (geoRequired && geo && geo.locationObj) {
        if (typeof(geo.locationObj.city) != "undefined") {
            url += "&city=" + geo.locationObj.city;
        }
        if (typeof(geo.locationObj.state) != "undefined") {
            url += "&state=" + geo.locationObj.state;
        }
        if (typeof(geo.locationObj.country) != "undefined") {
            url += "&country=" + geo.locationObj.country;
        }
    }
    return url;
};

var Assets = new function() {

    this.preloadAssets = function(widget, variantId, campaignId, experienceType) {
        var actions = CSArray.csmap(widget.actions, function(action) {
            action.variantId = variantId;
            action.experienceType = experienceType;
            action.campaignId = campaignId;
            return ActionsFactory.createAction(action);
        });
        var urls = CSArray.csmap(actions, function(action) {
            return action.fetchUrlsToPreload(variantId, action.config);
        });
        urls = CSArray.csfilternulls(urls);
        urls = CSArray.csflatten(urls);
        urls = CSArray.csfilternulls(urls);
        return urls;
    };
};

function AnimationPageChange(config) {
    BasePageChange.call(this, config);


    this.applyChange = function() {
        var element = jq(config.selector);
        var animationType = config.animation;
        Animation.executeAnimation(element, animationType);
    };
}



AnimationPageChange.prototype = new BasePageChange();
AnimationPageChange.prototype.constructor = AnimationPageChange;

var PersistFormSubmission = new function() {

   this.setUserContextAfterFormSubmission = function(details) {
   		var inputFields = this.getFieldsTypesArray(details.inputFields);

        UserContext.setContext("context.user.formSubmitted", "true");
        UserContext.setContext("context.user.formSubmittedFields", inputFields);
        UserContext.setContext("context.user.formSubmittedCampaingId", details.campaignId);
        UserContext.setContext("context.user.formSubmittedDate", Date.parse(new Date().toUTCString()));        
    };

    this.isFormSubmittedExistInContext = function() {
    	return UserContext.getContext("context.user.formSubmitted");
    };

    this.getFieldsTypesArray = function(fields) {
    	return Object.keys(fields);
    };
};


function BaseInjector() {
    extend(this, Observer);
    this.rootElementId = null;
    this.elementsContainerId = null;
    this.elementsContainerParentId = null;
    this.editingMode = urlParams.cseditormode ? urlParams.cseditormode==="edit" : false;    


    this.alignmentAdjusters = {
        "right": function(canvasElement, injectConfig) {
            var widthInEdit = parseInt(injectConfig.widthInEdit, 10);
            var leftInEdit = parseInt(canvasElement.config.position.left, 10);
            if (widthInEdit && leftInEdit) {
                var distanceFromLeftInPercentage = (leftInEdit / widthInEdit) * 100;
                var currentBarWidth  = jq(document).outerWidth();
                var leftOnRuntime = (currentBarWidth * distanceFromLeftInPercentage) / 100;

                canvasElement.config.position.left = leftOnRuntime + "px";
            }

            return canvasElement;
        },
        "left": function(canvasElement, injectConfig) {
            return canvasElement;
        }
    };

    this.trackClicks = function(trackClicks) {
        if (trackClicks && trackClicks.enabled) {
            var behavior = {id: this.config.variantId};
            this.trigger('callToActionClick', behavior);
        }
    };
}

BaseInjector.prototype.inject = function(config, editingMode) {
    this.config = config;
    var canvasElements = this.createElements(config.canvasType, config.variantId, config.elements, editingMode, config.experienceType, config.campaignId);
    var variantData = {id: config.variantId};

    var success = this.injectContainer(config, canvasElements);
    if (success) {
        this.injectCanvasElements(canvasElements);
        canvasElements = ElementsFactory.getElementsForVariant(config.variantId);
        this.applyPageChanges(canvasElements);

        if (!this.editingMode && !this.checkDynamicTextValidation(canvasElements)) {            
            //this.config.id = this.config.variantId;
            //this.trigger("cancelShow", this.config);
            logDebug("didn't inject variant " + this.config.variantId + ", reason: dynamic text is missing a translated value or a default value");
            Inspector.blockedReason(config.campaignId, "Dynamic text is missing a translated value or a default value in variant " + config.variantId);            
            return false; 
        }
        
        if (this.shouldDelayToTheEndWhenInject) {
            setTimeout(this.render.bind(this), 0);
        } else {
            this.render();
        }        

        //CampaignOccurrences.clearPendingVariant(variantData);
        return true;
    }
    return success;
};

BaseInjector.prototype.checkDynamicTextValidation = function(canvasElements) {
    var elementsWithText = CSArray.csfilter(canvasElements, function(canvasElement) {        
        return canvasElement.config.text;
    });

    return elementsWithText.every(function(element) {        
        return element.config.isValidDynamicText;
    });    
};

BaseInjector.prototype.render = function(){
    this.renderInterior();
    this.handleEntranceAnimaitonEffect();
};

BaseInjector.prototype.handleEntranceAnimaitonEffect = function() {
    var injectorAnimationEffect = this.config.animation || "none";
    var container = jq("#" + this.elementsContainerParentId);
    var variantId = this.config.variantId;

    Animation.executeAnimation(container, injectorAnimationEffect, variantId, this);
};


BaseInjector.prototype.injectContainer = function(config, canvasElements) {
    var rootElement = document.getElementById(this.rootElementId);
    if (rootElement) {
        var html = Templates.applyTemplate(this.template, config);
        rootElement.innerHTML = html;
        if (!this.editingMode) {
            this.injectAlignedElements(config, canvasElements);
        }
        return true;
    } else {
        logError("Campaign root element (" + this.rootElementId + ") was not found, campaign will not be shown", null, ERROR_CANVAS_ROOT_NOT_FOUND);
        return false;
    }
};

BaseInjector.prototype.injectAlignedElements = function(config, canvasElements) {
    var canvasElementsToAlign = CSArray.csfilter(canvasElements, function(canvasElement) {
        return canvasElement.config.alignmentPosition !== null && canvasElement.config.alignmentPosition !== undefined;
    });
    var that = this;
    canvasElementsToAlign = CSArray.csmap(canvasElementsToAlign, function(canvasElement) {
        var alignmentPosition = canvasElement.config.alignmentPosition;
        return that.alignmentAdjusters[alignmentPosition].call(this, canvasElement, config);
    });
    this.injectElementsToContainer(canvasElementsToAlign, this.elementsContainerParentId, true);
};

BaseInjector.prototype.injectElementsToContainer = function(canvasElements, containerId, append) {
    var elementsHtml = this.generateForElements(canvasElements);

    var containerElement = document.getElementById(containerId);
    if (containerElement) {
        var appendTo = "";
        if (append) {
            containerElement.innerHTML += elementsHtml;
        } else {
            containerElement.innerHTML += elementsHtml;
        }        
    } else {
        logError("Container element " + containerId + " was not found in the document.", null, ERROR_CANVAS_CONTAINER_NOT_FOUND);
    }
};

BaseInjector.prototype.executeAfterElementsInjectedToContainer = function(canvasElements) {
    var elementsWithCallback = CSArray.csfilter(canvasElements, function(canvasElement){
        return canvasElement.shouldExecutSomthingAfterInject;
    });

    this.executeElementsCallback(elementsWithCallback);
};

BaseInjector.prototype.executeElementsCallback = function(elementsWithCallback) {
    elementsWithCallback.forEach(function(element){
        element.executeAfterElementInTheDom(element.editingMode);
    });
};

BaseInjector.prototype.injectCanvasElements = function(canvasElements) {
    if (!this.editingMode) {
        canvasElements = CSArray.csfilter(canvasElements, function(canvasElement) {
            return canvasElement.config.alignmentPosition === null || canvasElement.config.alignmentPosition === undefined;
        });
    }
    this.injectElementsToContainer(canvasElements, this.elementsContainerId, false);
    this.executeAfterElementsInjectedToContainer(canvasElements);
};

BaseInjector.prototype.createElements = function(canvasType, variantId, elements, editingMode, experienceType, campaignId) {
    return CSArray.csmap(elements, function(elementConfig) {
        elementConfig.canvasType = canvasType;
        elementConfig.experienceType = experienceType;
        elementConfig.campaignId = campaignId;
        return ElementsFactory.createElementAndRegister(elementConfig, variantId, editingMode);
    });
};

BaseInjector.prototype.registerKeyEventsOnInputFields = function() {
    function removeErrorMessage(e) {
        var input = jq(e.target);
        var form = input.parents(".cs-form");
        var errorMessageTooltip = form.find(".cs-error-message-tooltip");

        errorMessageTooltip.hide();
        input.removeClass("invalid");
    }
    jq("#"+this.rootElementId).on("keydown", ".cs-form .cs-input input.invalid", removeErrorMessage);
};

BaseInjector.prototype.generateForElements = function(canvasElements) {
    var elements = CSArray.csmap(canvasElements, function(element) {
        return element.generate();
    });
    return elements.join(" ");

};

BaseInjector.prototype.applyPageChanges = function(canvasElements) {
    var pageChangeActions = CSArray.csmap(canvasElements, function(element) {
        var pageActions = element.getPageChangeActions();
        return pageActions;
    });
    // pageChangeActions is an array of arrays of PageChanges
    // turn it into array of PageChanges
    if (pageChangeActions.length > 0) {
        pageChangeActions = CSArray.csfilternulls(pageChangeActions);
        if (pageChangeActions.length > 0) {
            pageChangeActions = CSArray.csflatten(pageChangeActions);
        }
    }
    pageChangeActions.forEach(function(pageChangeAction) {
        if (pageChangeAction) {
            pageChangeAction.applyChange();
        }
    });
};

// called when whole canvas is rendered in the editor
BaseInjector.prototype.injectEditingCapabilities = function(variantId) {
    var containerResizeConfig = this.getContainerResizeConfiguration();
    ElementEditing.injectResizeCapabilities(this.elementsContainerId, variantId, containerResizeConfig);
    ElementEditing.injectDragAndDropCapabilitiesToElements(this.elementsContainerId, variantId);
};

BaseInjector.prototype.injectHighlighterForSelector = function(selector) {
    ElementEditing.injectHighlighterForSelector(selector);
};

BaseInjector.prototype.constructTrackClicksConfig = function(config, clickedElement) {
    var clickedCSElement = ElementsUtils.findCSElement(clickedElement);
    if (clickedCSElement && clickedCSElement.attr("id")) {
        var elementDomId = clickedCSElement.attr("id");
        var element = ElementsFactory.getElementByDomId(elementDomId);
        if (element) {
            return element.config.trackClicks;
        }
    } else if (clickedElement.is(".cs-elements-container-parent")) {
        return this.config.trackClicks;
    }
};

BaseInjector.prototype.executeCallToAction = function(config, clickedElement) {
    var callToActions = this.constructCallToActions(config, clickedElement);
    var trackClicksConfig = this.constructTrackClicksConfig(config, clickedElement);
    var callToActionCompleted = callToActions.every(function(callToAction) {
        try {
            return callToAction.execute();
        } catch(e) {
            logError("Error handling call to action." + callToAction, e, ERROR_CANVAS_CALL_TO_ACTION_FAILED);
            return true;
        }
    });
    if (callToActionCompleted && trackClicksConfig) {
        this.trackClicks(trackClicksConfig);
    }
};

BaseInjector.prototype.constructCallToActions = function(config, clickedElement) {
    var callToActions = [];
    var clickedCSElement = ElementsUtils.findCSElement(clickedElement);
    if (clickedCSElement && clickedCSElement.attr("id")) {
        var elementDomId = clickedCSElement.attr("id");
        var element = ElementsFactory.getElementByDomId(elementDomId);
        if (element) {
            if (element.config.elementType) {
                var callToActionForExperienceType = CallToActionsFactory.createCallToActionByType(element.config.elementType, element.config, this);
                if (callToActionForExperienceType) {
                    callToActions.push(callToActionForExperienceType);
                }
            }
            this.constructCommonCallToActions(element.config, callToActions);
        }
    } else if (clickedElement.is(".cs-elements-container-parent")) {
        this.constructCommonCallToActions(this.config, callToActions);
    }
    return callToActions;
};

BaseInjector.prototype.constructCommonCallToActions = function(config, callToActions) {
    var campaignCallToAction = CallToActionsFactory.createCallToAction(config, this);
    if (campaignCallToAction) {
        callToActions.push(campaignCallToAction);
    }
    callToActions.push(CallToActionsFactory.createCallToAction({callToAction: {type: "default"}}, this));

};


BaseInjector.prototype.fetchUrlsToPreload = function(variantId, config) {
    var elements = CSArray.csmap(config.elements, function(element) {
        return ElementsFactory.createElement(element, variantId, false);
    });
    var urls = CSArray.csmap(elements, function(element) {
        return element.fetchUrlsToPreload();
    });
    urls = CSArray.csfilternulls(urls);
    urls = CSArray.csflatten(urls);
    urls = CSArray.csfilternulls(urls);

    if (config.style['background-image']) {
        var backgroundImageSetting = config.style['background-image'];
        if (backgroundImageSetting.indexOf("url") === 0) {
            // backgroundImageSetting is of form: url('https://d221pf3zshjqt9.cloudfront.net/static/assets/new_default_modal-kJhcOm-800w-480h.png')
            backgroundImageSetting = backgroundImageSetting.substring("url('".length, backgroundImageSetting.length-"')".length);
        }
        if (backgroundImageSetting.indexOf("http://") === 0 || backgroundImageSetting.indexOf("https://") === 0 || backgroundImageSetting.indexOf("//") === 0) {
            urls.push(backgroundImageSetting);
        }
    }
    return urls;
};

BaseInjector.prototype.getActualClickedContainerElement = function(clickedElement) {
    while (!clickedElement.hasClass("cs-elements-container-parent")) {
        if (clickedElement.hasClass("cs-cta-element") || clickedElement.hasClass("cs-ignore-container-click")) {
            // this a container click handler, but an element was marked as ignore or it is a 'call to action element', so need to get out
            return null;
        }
        clickedElement = clickedElement.parent();
    }
    return clickedElement;
};

BaseInjector.prototype.getActualClickedElement = function(clickedElement) {
    while (!clickedElement.is(".cs-cta-element, .cs-custom-close-element")) {
        clickedElement = clickedElement.parent();
    }
    return clickedElement;
};

BaseInjector.prototype.customClickHandler = function(e) {
    if (this.editingMode) return;
    var clickedElement = jq(e.target);
    var actionType;

    //for now we only have custom close action. When we'll add more custom classes this if statement should be change to a function that get a class name and returned the relevant action type 
    if (clickedElement.hasClass("cs-custom-close-element")) {
        actionType = "customClose";
    } else {
        var clickedElementClassList = clickedElement.attr("class");
        logError("class name is not what we expect. We expected 'cs-custom-close-element' class, but instead got " + clickedElementClassList);
    }

    if (actionType) {
        CallToActionsFactory.executeCallToActionByElement(clickedElement, actionType);
    }
};

BaseInjector.prototype.clickHandler = function(e, container) {
    if (this.editingMode) return;
    var clickedElement = jq(e.target);
    clickedElement = container ? this.getActualClickedContainerElement(clickedElement)
                                : this.getActualClickedElement(clickedElement);
    if (clickedElement) {
        var injector = InjectorsRepository.injectorForCanvasType(this.config.canvasType);
        injector.executeCallToAction(this.config, clickedElement);
    }
};

BaseInjector.prototype.hookBasicEvents = function($innerContainer) {
    var mouseOverContainer = false;
    var that = this;
    $innerContainer.on('mouseenter', function() {
        if (!mouseOverContainer) {
            mouseOverContainer = true;
            var behavior = {id: that.config.variantId};
            that.trigger('behaviorHover', behavior);
        }
    }).on('mouseleave', function(e) {
        mouseOverContainer = false;
    });
    var _containerSelector = "#"+ this.rootElementId;
    jq(_containerSelector + " .cs-cta-container").on('click', function(e) {
        that.clickHandler(e, true);
    });
    jq(_containerSelector + " .cs-cta-element").on('click', function(e) {
        that.clickHandler(e, false);
    });
    jq(_containerSelector + " .cs-custom-close-element").on('click', function(e) {
        that.customClickHandler(e, false);
    });
};

BaseInjector.prototype.hide = function() {
    var _containerSelector = "#" + this.rootElementId;
    jq(_containerSelector).hide();
    if (this.config && this.config.variantId) {
        this.trigger("hide", {id: this.config.variantId});
    }
};

BaseInjector.prototype.injectRoot = function() {
    jq("#"+rootContainerId).append(
        '<div id=' + this.rootElementId +' style="display: none;"></div>'
    );
};

BaseInjector.prototype.afterStopResizing = function() {
    var executeWhenResizeStop =  function( event, ui ) {
        var newWidth = parseInt(ui.size.width, 10);
        var newHeight = parseInt(ui.size.height, 10);
        var resizedId = "container";
        if (canvasEditor) {
            canvasEditor.elementResized(resizedId, newWidth, newHeight);
        }
    };

    return executeWhenResizeStop;
};

function SlideoutInjector() {
    this.rootElementId = "csSlideout";
    this.elementsContainerId = "cs-slideout-elements-container";
    this.elementsContainerParentId ="cs-slideout-elements-container-parent";
    this._innerSelector = ".cs-slideout-inner";
    this.shouldDelayToTheEndWhenInject = true;
    this.hasAnimationDelay = true;

    this.template = "<div id='cs-slideout-elements-container-parent' class='cs-slideout-inner cs-elements-container-parent " +
                        "<%if ( isValid(callToAction) ){%>"+ "cs-cta-container <% } %>" + "'"  +
                        "style='padding:0; " +
                            "<%if (isValid(style['background-color']))   {%>"+ " background-color:<%=style['background-color']%>; <% } %>" +
                            "<%if (isValid(style['background-size']))   {%>"+ " background-size:<%=style['background-size']%>; <% } %>" +
                            "<%if (isValid(style['background-repeat']))   {%>"+ " background-repeat:<%=style['background-repeat']%>; <% } %>" +
                            "<%if (isValid(style['background-image']))   {%>"+ " background-image:<%=style['background-image']%>; <% } %>" +
                            "<%if (isValid(style['z-index']))   {%>"+ " z-index:<%=style['z-index']%>; <% } %>" +

                            "<%if (isValid(size.width))      {%>"+ " width:<%=size.width%>; <% } %>" +
                            "<%if (isValid(size.height))     {%>"+ " height:<%=size.height%>; <% } %> " +
                            "<%if (isValid(position) && position.top )    {%>"+ " top:<%=position.top%>; <% } %>" +
                            "<%if (isValid(position) && position.left )    {%>"+ " left:<%=position.left%>; <% } %>" +
                            "<%if (isValid(style['border-radius']))   {%>"+ " border-radius:<%=style['border-radius']%>; <% } %>"  + "'>"  +                                                        
                        
                        "<div class='cs-slideout-elements-container cs-elements-container' id='cs-slideout-elements-container'>" +                                
                        "</div>" +
                    "</div>";    
}



SlideoutInjector.prototype = new BaseInjector();
SlideoutInjector.prototype.constructor = SlideoutInjector;



SlideoutInjector.prototype.renderInterior = function(){
    var _containerSelector = "#" + this.rootElementId;
    var container = jq("#" + this.elementsContainerParentId);
    var rootElement = jq(_containerSelector);
    var variantId = this.config.variantId;
    var _hookParts = function _hookParts(that) {
        var _containerSelector = "#" + that.rootElementId;
        var inner = jq(_containerSelector + " .cs-slideout-inner");
        BaseInjector.prototype.hookBasicEvents.call(that, inner);        
    };     
    this.direction = this.direction ? this.direction : "right";

    rootElement.css("opacity", "0");
    rootElement.show();                
    this.handleSlideoutPosition();
    _hookParts(this);
    rootElement.css("opacity", "1");
        
    return true;
};

SlideoutInjector.prototype.getContainerResizeConfiguration = function() {
    var that = this;
    var handlesConfig = this.getHandlesConfigBySlideoutDirection(this.direction);    
    var config = {
            handles: handlesConfig,
            containment: jq("html"),
            minWidth: 400,
            maxWidth: 900,
            minHeight: 120,
            maxHeight: 450,
            resize: function(event, ui) {
                that.executeDuringSlideOutResize(ui);
            },
            stop: function(event, ui) {
                that.executeAfterSlideOutResize(ui);
            }
        };

    return config;    
};

SlideoutInjector.prototype.getHandlesConfigBySlideoutDirection = function(direction) {
    //default is right
    var handlesDirections = "n, s, w, nw, sw";    
    if (direction === "left") {
        handlesDirections = "n, s, e, ne, sw";
    }

    return handlesDirections;
};

SlideoutInjector.prototype.executeDuringSlideOutResize = function(ui) {
    this.handleMarginTop(ui.element, ui.size.height);    
};

SlideoutInjector.prototype.executeAfterSlideOutResize = function(ui) {
    this.handleHorizontalPositionByDirection(this.direction);
    this.updateCanvasEditor();    
};

SlideoutInjector.prototype.updateCanvasEditor = function() {
    var container = jq("#" + this.elementsContainerParentId);
    var newWidth = parseInt(container.outerWidth(), 10);
    var newHeight = parseInt(container.outerHeight(), 10);
    var newTop = parseInt(container.css("top"), 10);
    var resizedId = "container";

    if (canvasEditor) {
        canvasEditor.elementResized(resizedId, newWidth, newHeight, newTop);
    }
};

SlideoutInjector.prototype.handleMarginTop = function(element, elementHeight) {
    var marginTop = elementHeight / -2;    
    element.css("margin-top", marginTop + "px");
};

SlideoutInjector.prototype.handleSlideoutPosition = function() {
    var container = jq(this._innerSelector);
    var direction = this.direction;
    
    this.handleVerticalPosition(container, this.config.verticalPosition);
    this.handleHorizontalPositionByDirection(direction);
};

SlideoutInjector.prototype.handleVerticalPosition = function(container, verticalPosition) {
    //in edit mode keep it center - because we don't have enough room for changing the position of the slideout in the current edit window   
    verticalPosition = verticalPosition && !this.editingMode ? verticalPosition : "center";
    if (verticalPosition === "center") {
        this.handleMarginTop(container, container.outerHeight());
    }
    this.removeVeticalAlignPositionClassesFromElement(container);  
    container.addClass("slideout-vertical-align-" + verticalPosition);
};

SlideoutInjector.prototype.removeVeticalAlignPositionClassesFromElement = function(element) {
    element.removeClass("slideout-vertical-align-center slideout-vertical-align-quarter slideout-vertical-align-bottom");
};

SlideoutInjector.prototype.handleHorizontalPositionByDirection = function(direction) {
    var page = jq("html");
    var pageWidht = page.outerWidth();
    var slideout = jq("#" + this.elementsContainerParentId);
    var slideoutWidth = slideout.outerWidth();
    var gapFromLeftOfThePage = 0;

    if (direction === "right") {
        gapFromLeftOfThePage = pageWidht - slideoutWidth;
    }

    slideout.css("left", gapFromLeftOfThePage + "px");
};


function FormSubmissionCallToAction(config, injector) {
    BaseCallToAction.call(this, config, injector);

    this.validateConfiguration = function() {
        if (!this.config.variantId) {
            logError("Failed handling form submission: could not find variant id.", null, ERROR_CANVAS_FORM_SUBMISSION_MISSING_VARIANT);
            return false;
        }
        if (!this.config.campaignId) {
            logError("Failed handling form submission: could not find campaignId.", null, ERROR_CANVAS_FORM_SUBMISSION_MISSING_CAMPAIGN);
            return false;
        }
        return true;
    };

    this.validateForm = function(formElement) {
        var validators = this.getValidators(formElement);

        var failedValidators = CSArray.csfilter(validators, function(validator) {
            return validator.validate();
        });
        if (failedValidators.length > 0) {
            var failedField = failedValidators[0].field;
            var failedFieldValidatorConfig = failedValidators[0].config;
            if (failedField) {
                var element = ElementsFactory.getElementById(failedField.elementId);
                var elementDom = jq("#"+element.config.elementDomId);
                if (element) {
                    element.validationFailed(elementDom, failedFieldValidatorConfig.errorMessage);
                }
            }
            return false;
        }
        return true;
    };

    this.getValidators = function(formElement) {
        var inputElements = CSArray.csfilter(formElement.config.elements, function(element) {
            return element.settings && element.settings.validation;
        });
        inputElements = ElementsFactory.sortElementsByTopPosition(inputElements);
        var validators = CSArray.csmap(inputElements, function(element) {
            return getValidatorsForElement(element);
        });
        validators = CSArray.csfilternulls(validators);
        validators = CSArray.csflatten(validators);
        validators = CSArray.csfilternulls(validators);
        return validators;
    };

    this.fetchFieldsForSubmission = function(formElement) {
        var inputElements = CSArray.csfilter(formElement.config.elements, function(element) {
            return element.settings && element.settings.fieldName;
        });

        var fields = CSArray.csreduce(inputElements, function(res, element) {
            var canvasElement = ElementsFactory.getElementById(element.elementId);
            var value = canvasElement.getInputValue();
            res[element.settings.fieldName] = value;
            return res;
        }, {});

        return fields;
    };    

    function getValidatorsForElement(element) {
        var validators = [];
        var validation = element.settings.validation;
        if (validation.required && validation.required.enabled) {
            validators.push(FormValidatorsFactory.createFormValidator("required", validation.required, element));
        }
        if (validation.input && validation.input.enabled && validation.input.type) {
            validators.push(FormValidatorsFactory.createFormValidator(validation.input.type, validation.input, element));
        }
        return validators;
    }

}

FormSubmissionCallToAction.prototype = new BaseCallToAction();
FormSubmissionCallToAction.prototype.constructor = FormSubmissionCallToAction;

FormSubmissionCallToAction.prototype.execute = function() {
    if (!this.validateConfiguration()) {
        return true;
    }
    var formElement = ElementsFactory.getElementById(this.config.containerId);
    if (formElement) {
        if (!this.validateForm(formElement)) {
            return false;
        }
    } else {
        logError("Failed handling form submission: could not find form element for container id: " + this.config.containerId, null, ERROR_CANVAS_FORM_SUBMISSION_FORM_NOT_FOUND);
    }

    var fields = this.fetchFieldsForSubmission(formElement);

    var config = this.config;
    var formSubmissions = CSArray.csmap(FormSubmissionFactory.supportedFormSubmissions, function(type) {
        return FormSubmissionFactory.createFormSubmission(type, config);
    });
    formSubmissions.forEach(function(formSubmission) {
        formSubmission.submitForm(fields);
    });
    
    var FormDetails = {
        campaignId: formElement.config.campaignId,
        inputFields: fields
    };

    PersistFormSubmission.setUserContextAfterFormSubmission(FormDetails);
    return true;
};





var PageChangesFactory = new function() {

    var pageChanges = {
        "text": function(config) {
            return new TextPageChange(config);
        },
        "image": function(config) {
            return new ImageSrcPageChange(config);
        },
        "link": function(config) {
            return new LinkUrlPageChange(config);
        },
        "style": function(config) {
            return new StylePageChange(config);
        },
        "removeStyle": function(config) {
            return new RemoveAttributeFromStylePageChange(config);
        },
        "position": function(config) {
            return new StylePageChange(config);
        },
        "size": function(config) {
            return new StylePageChange(config);
        },
        "animation": function(config) {
            return new AnimationPageChange(config);
        },
        "customHtml": function(config) {
            return new CustomHtmlPageChange(config);
        }        
    };

    this.createPageChange = function(config) {
        return pageChanges[config.changeType].call(this, config);
    };
};

var Animation = new function() {
	this.executeAnimation = function(element, animationType, variantId, injector) {				
		var animationExist = animationType !== "none";		
		element = jq(element);
		
		if (animationExist) {			
			this.showCampaignWithAnimation(element, animationType, injector, variantId);
		} else {
			this.triggerBeforeDisplayEvent(injector, variantId);
		}
	};

	this.showCampaignWithAnimation = function(element, animationType, injector, variantId) {
		var that = this;
		var animationEndEvents = "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";

		if (injector && !injector.editingMode && injector.hasAnimationDelay) {
			element.addClass("delayAnimation");
		}

		element.addClass("animated " + animationType).one(animationEndEvents, function() {
			var element = jq(this);
			that.executeOnAnimationEnd(element, animationType, injector, variantId);			            
        });
	};

	this.executeOnAnimationEnd = function(element, animationType, injector, variantId) {
		this.removeAnimationFromElement(element, animationType);
		this.triggerBeforeDisplayEvent(injector, variantId);
	};

	this.removeAnimationFromElement = function(element, animationType) {
		element.removeClass("animated " + animationType);		
	};

	this.triggerBeforeDisplayEvent = function (injector ,variantId) {
		if (injector && variantId) {
			injector.trigger("beforeDisplay", {id: variantId});
		}
	};
};

var InjectorsRepository = new function() {

    var injectorCreators = {
        modal: {
            creator: function () {
                return new ModalInjector();
            }
        },
        bar: {
            creator: function () {
                return new BarInjector();
            }
        },
        slideout: {
            creator: function () {
                return new SlideoutInjector();
            }
        }
    };

    var injectors = {};

    this.injectorForCanvasType = function(type) {
        var injector = injectors[type];
        if (!injector) {
            injector = injectorCreators[type].creator.call();
            injectors[type] = injector;
        }
        return injector;
    };

    this.injectRoots = function() {
        var injectorTypes = Object.keys(injectorCreators);
        var that = this;
        var injectors = CSArray.csmap(injectorTypes, function(type) {
            return that.injectorForCanvasType(type);
        });
        injectors.forEach(function(injector) {
            injector.injectRoot();
        });
    };

    this.hideInjectors = function() {
        var injectorTypes = Object.keys(injectors);
        injectorTypes.forEach(function(injectorType) {
            var injector = injectors[injectorType];
            injector.hide();
        });
    };
};

function EmailValidator(config, field) {
    BaseValidator.call(this, config, field);
}

EmailValidator.prototype = new BaseValidator();
EmailValidator.prototype.constructor = EmailValidator;

EmailValidator.prototype.validateInternal = function(val) {
    return val && val.match(email_regex);
};


function TenDigitsPhoneValidator(config, field) {
    BaseValidator.call(this, config, field);
}

TenDigitsPhoneValidator.prototype = new BaseValidator();
TenDigitsPhoneValidator.prototype.constructor = TenDigitsPhoneValidator;

TenDigitsPhoneValidator.prototype.validateInternal = function(val) {
    return val && val.match(ten_digits_phone_regex);
};


function OpenLinkCallToAction(config, injector) {
    BaseCallToAction.call(this, config, injector);
}

OpenLinkCallToAction.prototype = new BaseCallToAction();
OpenLinkCallToAction.prototype.constructor = OpenLinkCallToAction;

OpenLinkCallToAction.prototype.execute = function() {
    if (this.config.callToAction && this.config.callToAction.url) {
        var pageUrl = this.config.callToAction.url;
        var newTab = this.config.callToAction.newTab || false;
        if (newTab) {
            window.open(pageUrl, "_blank");
        } else {
            setTimeout(function () {
                window.location.href = pageUrl;
            }, 500); // wait for analytics to be sent
        }
    }
    return true;
};



function PhoneValidator(config, field) {
    BaseValidator.call(this, config, field);
}

PhoneValidator.prototype = new BaseValidator();
PhoneValidator.prototype.constructor = PhoneValidator;

PhoneValidator.prototype.validateInternal = function(val) {
    return val && val.match(phone_regex);
};


function CloseElement(config, variantId) {
    ImageElement.call(this, config, variantId);
    this.type = "close";
}

CloseElement.prototype = new BaseElement();
CloseElement.prototype.constructor = CloseElement;


function InjectAction(config) {
    BaseAction.call(this, config);

}

InjectAction.prototype = new BaseAction();
InjectAction.prototype.constructor = InjectAction;


InjectAction.prototype.execute = function(editingMode) {
    var injector = InjectorsRepository.injectorForCanvasType(this.config.canvasType);
    var wasSuccessfullyExecuted = false;
    if (injector) {
        wasSuccessfullyExecuted = injector.inject(this.config, editingMode);
    } else {
        logError("Could not find an injector of type " + this.config.canvasType + ", the campaign will not be injected", null, ERROR_CANVAS_INJECTOR_NOT_FOUND);
    }

    if (!wasSuccessfullyExecuted) {
        logDebug("Campaign won't be injected, reason: inject action of canvas type: " + this.config.canvasType + " didn't execute");
    }
    
    return wasSuccessfullyExecuted;
};

InjectAction.prototype.fetchUrlsToPreload = function(variantId, config) {
    var injector = InjectorsRepository.injectorForCanvasType(this.config.canvasType);
    if (injector) {
        return injector.fetchUrlsToPreload(variantId, config);
    }
    return [];
};



var FormSubmissionFactory = new function() {

   this.supportedFormSubmissions = ["emailCollection"];

    var formSubmissionCreators = {
        "emailCollection": {
            creator: function (config) {
                return new EmailCollectionFormSubmission(config);
            }
        }
    };

    this.createFormSubmission = function(type, config) {
        if (formSubmissionCreators[type]) {
            var creator = formSubmissionCreators[type].creator;
            var submission = creator.call(this, config);
            return submission;
        }
        return null;
    };
};


function RequiredValidator(config, field) {
    BaseValidator.call(this, config, field);
}

RequiredValidator.prototype = new BaseValidator();
RequiredValidator.prototype.constructor = RequiredValidator;

RequiredValidator.prototype.validateInternal = function(val) {
    return val && val.length > 0;
};


function FormButtonElement(config, variantId) {
    ButtonElement.call(this, config, variantId);
    this.type = "formButton";

    // for backward compatibility - turn on track clicks for form buttons
    this.callToActionToTrackClicks = function() {
        if (!this.config.trackClicks) {
            this.config.trackClicks = this.enabledTrackClicks();
        }
    };
}

FormButtonElement.prototype = new BaseElement();
FormButtonElement.prototype.constructor = FormButtonElement;

FormButtonElement.prototype.init = function(editingMode) {
    ButtonElement.prototype.init.call(this);
};

FormButtonElement.prototype.onConfigChange = function () {
    ButtonElement.prototype.onConfigChange.call(this);
};

FormButtonElement.prototype.getPageChangeActions = function() {
    return ButtonElement.prototype.getPageChangeActions.call(this);
};


function LabelElement(config, variantId) {
    TextElement.call(this, config, variantId);
    this.type = "label";
}

LabelElement.prototype = new BaseElement();
LabelElement.prototype.constructor = LabelElement;


var ElementsFactory = new function() {

    var elementCreators = {
        "text": {
            creator: function (config, variantId) {
                return new TextElement(config, variantId);
            }
        },
        "button": {
            creator: function (config, variantId) {
                return new ButtonElement(config, variantId);
            }
        },
        "image": {
            creator: function (config, variantId) {
                return new ImageElement(config, variantId);
            }
        },
        "close": {
            creator: function (config, variantId) {
                return new CloseElement(config, variantId);
            }
        },
        "form": {
            creator: function (config, variantId) {
                return new FormElement(config, variantId);
            }
        },
        "label": {
            creator: function (config, variantId) {
                return new LabelElement(config, variantId);
            }
        },
        "formButton": {
            creator: function (config, variantId) {
                return new FormButtonElement(config, variantId);
            }
        },
        "formTextInput": {
            creator: function (config, variantId) {
                return new FormTextInputElement(config, variantId);
            }
        },
        "html": {
            creator: function (config, variantId) {
                return new HtmlElement(config ,variantId);
            }
        }
    };

    var elements = {};
    var elementsByDomId = {};
    var elementsByGuid = {};
    var elementsByVariant = {};

    this.createElementAndRegister = function(config, variantId, editingMode) {
        var element = this.createElement(config, variantId, editingMode);
        elements[element.config.elementId] = element;
        elementsByDomId[element.config.elementDomId] = element;
        elementsByGuid[element.config.elementGuid] = element;
        if (!elementsByVariant[variantId]) {
            elementsByVariant[variantId] = [];
        }
        elementsByVariant[variantId].push(element);
        return element;
    };

    this.createElement = function(config, variantId, editingMode) {
        var creator = elementCreators[config.elementType].creator;
        var element = creator.call(this, config, variantId);
        element.editingMode = editingMode;
        element.init(editingMode);
        element.onConfigChange();
        return element;
    };

    this.getElementById = function(elementId) {
        return elements[elementId];
    };

    this.getElementByGuid = function(elementGuid) {
        return elementsByGuid[elementGuid];
    };

    this.getElementByDomElement = function(domElement) {
        var domId = domElement.attr("id");
        if (!domElement.hasClass("cs-element")) {
            var innerElement = domElement.closest(".cs-content-container");
            if (innerElement) {
                domId = innerElement.attr("id");
            }
        }
        if (domId) {
            return this.getElementByDomId(domId);
        }
        return null;
    };

    this.getElementByDomId = function(elementDomId) {
        return elementsByDomId[getCorrectElementDomId(elementDomId)];
    };

    this.getContainerDomId = function(elementDomId) {
        var canvasElement = this.getElementByDomId(elementDomId);
        if (canvasElement && canvasElement.config.containerId) {
            return this.getElementDomIdByElementId(canvasElement.config.containerId);
        }
        return null;
    };

    this.getElementDomIdByElementId = function(elementId) {
        var element = this.getElementById(elementId);
        if (element) {
            return element.config.elementDomId;
        }
        return null;
    };

    this.removeElementByDomId = function(elementDomId) {
        var element = elementsByDomId[elementDomId];
        var elementId = element.elementId;
        delete elementsByDomId[elementsByDomId];
        delete elements[elementId];
    };

    this.getElementsForVariant = function(variantId) {
        return elementsByVariant[variantId];
    };

    this.sortElementsByTopPosition = function(elements) {
        return elements.sort(function(elementA, elementB) {
            var topA = 0, topB = 0;
            if (elementA.position && elementA.position.top) {
                topA = parseInt(elementA.position.top, 10);
            }
            if (elementB.position && elementB.position.top) {
                topB = parseInt(elementB.position.top, 10);
            }
            return topA - topB;
        });
    };

    function getCorrectElementDomId(elementDomId) {
        if (isInnerElementDomId(elementDomId)) {
            return fetchElementDomIdFromInnerDomId(elementDomId);
        }
        return elementDomId;
    }

    function isInnerElementDomId(elementDomId) {
        var indexOfInner = elementDomId.indexOf("inner");
        // if the element dom id ends with "inner"
        if (indexOfInner > 0 && (elementDomId.length === indexOfInner + "inner".length)) {
            return true;
        }
        return false;
    }

    function fetchElementDomIdFromInnerDomId(innerElementDomId) {
        var indexOfInner = innerElementDomId.indexOf("inner");
        return innerElementDomId.substring(0, indexOfInner - 1);
    }
};



var ElementsUtils = new function() {
    this.findCSElement = function(element) {
        if (element.length > 0 && element[0].id === "holiRoot") {
            return null;
        }
        if (this.isCSElement(element)) {
            return element;
        }
        var parent = element.parent();
        if (parent) {
            return this.findCSElement(parent);
        }
        return null;
    };

    this.isCSElement = function(element) {
        var classes = element.attr("class");
        if (classes) {
            var classesArray = classes.split(" ");
            if (classesArray.indexOf("cs-element") > -1) {
                return true;
            }
        }
        return false;
    };    
};

function UrlFormSubmission(config) {
    BaseFormSubmission.call(this, config);
}

UrlFormSubmission.prototype = new BaseFormSubmission();
UrlFormSubmission.prototype.constructor = UrlFormSubmission;

UrlFormSubmission.prototype.submitForm = function(fields) {
    console.log("UrlFormSubmission", fields);
};

var StyleAttributes = new function() {

    this.elementIdForAttribute = function(elementDomId, attribute) {
        if (attribute.indexOf("style.") > -1) {
            attribute = attribute.substring(attribute.indexOf("style.")+"style.".length);
        }
        if (attribute.indexOf("position.") > -1) {
            attribute = attribute.substring(attribute.indexOf("position.")+"position.".length);
        }
        if (attribute.indexOf("size.") > -1) {
            attribute = attribute.substring(attribute.indexOf("size.")+"size.".length);
        }
        if (elementDomId === "cs-elements-container") {
            return [".cs-elements-container-parent"];
        } else {
            if (attribute === "background-color") {
                return ["#"+elementDomId+"-inner"];
            }
            else if (attribute === "border-width") {
                return ["#"+elementDomId+"-inner"];
            }
            else if (attribute === "border-style") {
                return ["#"+elementDomId+"-inner"];
            }
            else if (attribute === "border-color") {
                return ["#"+elementDomId+"-inner"];
            }
            else if (attribute === "border-radius") {
                return ["#"+elementDomId+"-inner"];
            }
            else if (attribute === "text-align") {
                return ["#"+elementDomId+"-inner"];
            }
            else if (attribute === "opacity") {
                return ["#"+elementDomId+"-inner"];
            }
            else if (attribute === "z-index") {
                return ["#"+elementDomId];
            }
            else if (attribute === "top") {
                return ["#"+elementDomId];
            }
            else if (attribute === "left") {
                return ["#"+elementDomId];
            }
            else if (attribute === "width") {
                return ["#"+elementDomId];
            }
            else if (attribute === "height") {
                return ["#"+elementDomId];
            }
            else if (attribute === "background-size") {
                return ["#"+elementDomId];
            }
            else if (attribute === "background-position") {
                return ["#"+elementDomId];
            }
            else if (attribute === "background-repeat") {
                return ["#"+elementDomId];
            }            
            else {
                return ["#"+elementDomId+" .cs-element-content"];
            }
        }
    };

};

function CustomHtmlPageChange(config) {
    BasePageChange.call(this, config);

    this.applyChange = function() {

    };
}


CustomHtmlPageChange.prototype = new BasePageChange();
CustomHtmlPageChange.prototype.constructor = CustomHtmlPageChange;

function BarInjector() {
    this.rootElementId = "csBar";
    this.elementsContainerId = "cs-bar-elements-container";
    this.elementsContainerParentId ="cs-bar-elements-container-parent";
    this._innerSelector = ".cs-bar-inner";
    this.shouldDelayToTheEndWhenInject = false;

    this.template = "<div class='cs-bar-outer cs-clearfix' style='<%if (isValid(size.height)) {%>"+ " margin-bottom:<%=size.height%>; <% } %>'>" +                                                
                        "<div id='cs-bar-elements-container-parent' class='cs-bar-inner cs-elements-container-parent " +
                            "<%if ( isValid(callToAction) ){%>"+ "cs-cta-container <% } %>" + "'"  +
                            "style='" +
                                "<%if (isValid(size.height))     {%>"+ " height:<%=size.height%>; <% } %> " +
                                "<%if (isValid(style['background-size']))   {%>"+ " background-size:<%=style['background-size']%>; <% } %>" +
                                "<%if (isValid(style['background-repeat']))   {%>"+ " background-repeat:<%=style['background-repeat']%>; <% } %>" +
                                "<%if (isValid(style['background-image']))   {%>"+ " background-image:<%=style['background-image']%>; <% } %>" +
                                "<%if (isValid(style['background-color']))   {%>"+ " background-color:<%=style['background-color']%>; <% } %>" +
                                "<%if (isValid(style['border']))   {%>"+ " border:<%=style['border']%>; <% } %>" +
                                "<%if (isValid(style['z-index']))   {%>"+ " z-index:<%=style['z-index']%>; <% } %>'>" +
                            "<div class='cs-bar-elements-container cs-elements-container cs-headline-container' id='cs-bar-elements-container'></div>" +
                        "</div>" +
                    "</div>";    
}

BarInjector.prototype = new BaseInjector();
BarInjector.prototype.constructor = BarInjector;



BarInjector.prototype.renderInterior = function() {
    jq("#"+this.rootElementId).show();
    var _containerSelector = "#" + this.rootElementId;
    var inner = jq(_containerSelector + " .cs-bar-inner");
    BaseInjector.prototype.hookBasicEvents.call(this, inner);
};

BarInjector.prototype.getContainerResizeConfiguration = function() {
    var config = {
            handles: "n",            
            minHeight: 40,
            maxHeight: 300, //when rotate the device this is the height of the iphone 4 device
            stop: this.afterStopResizing()
    };

    return config;
};

function ConfirmAndCloseCallToAction(config, injector) {
    BaseCallToAction.call(this, config, injector);
}

ConfirmAndCloseCallToAction.prototype = new BaseCallToAction();
ConfirmAndCloseCallToAction.prototype.constructor = ConfirmAndCloseCallToAction;

ConfirmAndCloseCallToAction.prototype.execute = function() {
	// 1. hide the targeted element
	// 2. show confirm message instead of the targeted element
	// 3. close the campaign after 5 seconds
	var elementToHide =  this.getElementByDomId();
	var container = elementToHide.parent();	
	var confirmMessageElement = this.createConfirmMessageElement();
	var injector = this.injector;

	//1
	elementToHide.hide();
	//2
	container.append(confirmMessageElement);
    
    //3
    setTimeout(function () {
    	var closeCampaignAction = CallToActionsFactory.createCallToAction({callToAction: {type: "default"}}, injector);
    	closeCampaignAction.execute();    	
    }, confirmAndCloseTimeout);
};

ConfirmAndCloseCallToAction.prototype.isCampaignVisible = function(injector) {
	if (injector) {
 		return jq("#"+injector.elementsContainerParentId).is(":visible");
	}
};

ConfirmAndCloseCallToAction.prototype.getElementByDomId = function() {
	return jq("#"+this.config.elementDomId);
};

ConfirmAndCloseCallToAction.prototype.createConfirmMessageElement = function() {
	var text = this.config.callToAction.confirmMessageText;
	var confirmMessageStyle = this.getElementStyleByDomId(this.config.elementDomId);
	var confirmMessageElement = jq("<div></div>");
	
	confirmMessageElement.text(text);
	confirmMessageElement.addClass("cs-confirm-message-element");
	confirmMessageElement.css("top", confirmMessageStyle.top);
	confirmMessageElement.css("left", confirmMessageStyle.left);
	confirmMessageElement.css("z-index", confirmMessageStyle.zIndex);	

	return confirmMessageElement;
};

ConfirmAndCloseCallToAction.prototype.getElementStyleByDomId = function(elementDomId) {
	var element = jq("#"+elementDomId);
	var elementStyle = {};

	elementStyle.top = element.css("top");
	elementStyle.left = element.css("left");
	elementStyle.zIndex = element.css("z-index");
	elementStyle.width = element.css("width");
	elementStyle.height = element.css("height");	

	return elementStyle;
};


function AlphaNumericValidator(config, field) {
    BaseValidator.call(this, config, field);
}

AlphaNumericValidator.prototype = new BaseValidator();
AlphaNumericValidator.prototype.constructor = AlphaNumericValidator;

AlphaNumericValidator.prototype.validateInternal = function(val) {
    return val && val.match(alphanumeric_regex);
};


function BaseAction(config) {
    this.config = config;

}

BaseAction.prototype.fetchUrlsToPreload = function(variantId, config) {
    return [];
};


function LinkUrlPageChange(config) {
    BasePageChange.call(this, config);

    this.applyChange = function() {
        var element = jq(config.selector);
        element.attr("href", this.config.changeValue);
    };
}


LinkUrlPageChange.prototype = new BasePageChange();
LinkUrlPageChange.prototype.constructor = LinkUrlPageChange;

function BaseCallToAction(config, injector) {
    this.config = config;
    this.injector = injector;
}






// EXTRA JAVASCRIPT STARTS HERE



// EXTRA JAVASCRIPT ENDS HERE



// EXPERIMENTS CONFIGURATION STARTS HERE

behaviorsConfiguration = JSON.parse(base64_decode('W3siaWQiOiIxQ011VUpzcUVqIiwidmFyaWFudHNDb25maWciOnsiM2M4dTIiOnsiaWQiOiIzYzh1MiIsInRlbXBsYXRlSFRNTCI6bnVsbCwidGVtcGxhdGVQYXJhbXMiOnsid2hpdGVMYWJlbCI6dHJ1ZX0sImV4cGVjdGVkUGFyYW1zIjpudWxsLCJleHBlcmllbmNlVHlwZSI6ImNvbnRyb2wiLCJsYWJlbCI6IkNvbnRyb2wiLCJkaXNwbGF5ZXIiOiJjb250cm9sIn0sImtsZTU5Ijp7ImlkIjoia2xlNTkiLCJ0ZW1wbGF0ZUhUTUwiOiJ7fSIsInRlbXBsYXRlUGFyYW1zIjp7InNlbGVjdG9ycyI6eyJib2R5ID4gZGl2LmNvbnRfaG9sZGVyID4gZGl2LmJhc2tldF9ob2xkZXIgPiBoMTpudGgtb2YtdHlwZSgxKSI6eyJjaGFuZ2VzIjpbeyJhY3RpdmUiOnRydWUsImNoYW5nZSI6IjxoMSBzdHlsZT1cInBvc2l0aW9uOiByZWxhdGl2ZTtcIj5TaG9wcGluZyBCYXNrZXRcbjxkaXYgc3R5bGU9XCJwb3NpdGlvbjogYWJzb2x1dGU7dG9wOiAtMTU1cHg7bGVmdDogLTEwcHg7XCI+PGltZyBzcmM9XCJodHRwczovL2QyMjFwZjN6c2hqcXQ5LmNsb3VkZnJvbnQubmV0L3N0YXRpYy9hc3NldHMvbG9nby00LUh3VzRBVi0xMjh3LTEwMWgucG5nXCIgYWx0PVwiXCI+PC9kaXY+XG48L2gxPiIsImNoYW5nZVR5cGUiOiJodG1sIiwib2xkU2VsZWN0b3IiOiJodG1sPmJvZHk+ZGl2Om50aC1jaGlsZCg3KT5kaXY6bnRoLWNoaWxkKDMpPmgxIiwib3JpZ2luYWxDb250ZW50IjoiPGgxPlNob3BwaW5nIEJhc2tldDwvaDE+In1dLCJvcmlnaW5hbEVsZW1lbnRDb250ZW50IjoiPGgxPlNob3BwaW5nIEJhc2tldDwvaDE+In19LCJ0eXBlIjoiY29udGVudENoYW5nZXIiLCJ3aGl0ZUxhYmVsIjp0cnVlfSwiZXhwZWN0ZWRQYXJhbXMiOnt9LCJleHBlcmllbmNlVHlwZSI6ImNvbnRlbnRDaGFuZ2VyIiwibGFiZWwiOiJWYXJpYW50IEIiLCJkaXNwbGF5ZXIiOiJjb250ZW50Q2hhbmdlciJ9fSwicnVsZXMiOltdLCJkaXNwbGF5ZXIiOiJjb250ZW50Q2hhbmdlciIsIm1vYmlsZVN1cHBvcnRlZCI6ZmFsc2UsInVybEZpbHRlcmluZyI6eyJtYXRjaGVyIjoiaHR0cDovL3d3dy5kZXNpZ241NW9ubGluZS5jby51ay9jaGVja291dC9jYXJ0LyIsIm1hdGNoZXJzIjpbImh0dHA6Ly93d3cuZGVzaWduNTVvbmxpbmUuY28udWsvY2hlY2tvdXQvY2FydC8iXSwibW9kZSI6InBhZ2UtbWF0Y2gifSwiZGV2aWNlVGFyZ2V0aW5nIjpudWxsLCJzZWxlY3RlZEdvYWwiOiJib3VuY2VSYXRlIiwibmFtZSI6IkEvQiB2ZXJpc2lnbiBjYXJ0IiwiZmlsdGVyaW5nVmFyaWFudElkIjoia2xlNTkiLCJ2YXJpYW50cyI6W3siaWQiOiIzYzh1MiIsInBlcmNlbnQiOjUwfSx7ImlkIjoia2xlNTkiLCJwZXJjZW50Ijo1MH1dfSx7ImlkIjoiMnB2RHhFeVpnbSIsInZhcmlhbnRzQ29uZmlnIjp7IndoQVlqIjp7ImlkIjoid2hBWWoiLCJ0ZW1wbGF0ZUhUTUwiOiI8JSBpZiAoaW1hZ2VVcmwpIHsgJT5cXHQ8ZGl2IGNsYXNzPSdjcy1jdGEtaWNvbi1vdXRlci1jb250YWluZXInPlxcdFxcdDxkaXYgY2xhc3M9J2NzLWN0YS1pY29uLWNvbnRhaW5lcic+XFx0XFx0XFx0PGltZyBjbGFzcz0nY3MtY3RhLWljb24nIHNyYz0nPCU9aW1hZ2VVcmwlPic+IFxcdFxcdDwvZGl2PlxcdDwvZGl2PjwlIH0gJT48ZGl2IGNsYXNzPSdjcy1jb250ZW50LWNvbnRhaW5lciBjcy1jdGEtY29udGVudC1jb250YWluZXInPiAgIDxkaXYgY2xhc3M9J2NzLWN0YS10aXRsZSBjcy10aXRsZSc+ICAgICAgIDwlPXRpdGxlJT4gICA8L2Rpdj4gICA8ZGl2IGNsYXNzPSdjcy1jdGEtY29udGVudCBjcy1jb250ZW50Jz4gICAgICAgPCU9Y29udGVudCU+ICAgPC9kaXY+PC9kaXY+PCUgaWYgKGNhbGxUb0FjdGlvbikgeyAlPlxcdDxkaXYgY2xhc3M9J2NzLWN0YS1idXR0b24tY29udGFpbmVyJz5cXHRcXHQ8YnV0dG9uIHR5cGU9J2J1dHRvbicgY2xhc3M9J2NzLWN0YS1idXR0b24nIDwlIGlmIChjdGFGb3JlZ3JvdW5kQ29sb3IgJiYgY3RhQmFja2dyb3VuZENvbG9yKSB7ICU+ICAgICAgIHN0eWxlPSdjb2xvcjogPCU9Y3RhRm9yZWdyb3VuZENvbG9yJT47IGJhY2tncm91bmQtY29sb3I6IDwlPWN0YUJhY2tncm91bmRDb2xvciU+Oyc8JSB9ICU+PlxcdFxcdFxcdDwlPWNhbGxUb0FjdGlvbiU+XFx0XFx0PC9idXR0b24+XFx0PC9kaXY+IDwlIH0gJT4iLCJ0ZW1wbGF0ZVBhcmFtcyI6eyJiYWNrZ3JvdW5kSW1hZ2UiOiJodHRwczovL2QyMjFwZjN6c2hqcXQ5LmNsb3VkZnJvbnQubmV0L3N0YXRpYy9hc3NldHMvc2xpZGUtb3V0LTUlMjUyLTNvM2NRZi00NDJ3LTEzM2guanBnIiwiYnViYmxlU3R5bGUiOnsiY29sb3IiOiIjMDAwMDAwIn0sImNhbGxUb0FjdGlvbiI6IkdPVCBJVCIsImNvbnRlbnQiOiIiLCJjdGFCYWNrZ3JvdW5kQ29sb3IiOiIjMGI4Yjk5IiwiY3RhRm9yZWdyb3VuZENvbG9yIjoiI2ZmZmZmZiIsIm9uU3VjY2VzcyI6IkNsb3NlIE92ZXJsYXkiLCJvcGVuSW5OZXdUYWIiOmZhbHNlLCJ0aXRsZSI6IiIsInRvcEhpZ2hsaWdodENvbG9yIjoidHJhbnNwYXJlbnQiLCJ0eXBlIjoiaW1hZ2VDYWxsVG9BY3Rpb25NZXNzYWdlIiwidXJsIjoiaHR0cDovL215c2l0ZS5jb20vZGVhbHMiLCJ2ZXJ0aWNhbFBvc2l0aW9uIjoiY2VudGVyIiwid2hpdGVMYWJlbCI6dHJ1ZX0sImV4cGVjdGVkUGFyYW1zIjp7ImNhbGxUb0FjdGlvbiI6eyJodG1saXplU3BhY2luZyI6dHJ1ZSwicmVtb3ZlVGFncyI6dHJ1ZX0sImNvbnRlbnQiOnsiaHRtbGl6ZVNwYWNpbmciOnRydWUsIm1heExlbmd0aCI6MTQwLCJyZW1vdmVUYWdzIjp0cnVlfSwiY3RhQmFja2dyb3VuZENvbG9yIjp7fSwiY3RhRm9yZWdyb3VuZENvbG9yIjp7fSwiaW1hZ2VVcmwiOnt9LCJzaG93RGVsYXkiOnsiZGVmYXVsdFZhbHVlIjoyMDAwfSwidGl0bGUiOnsiaHRtbGl6ZVNwYWNpbmciOnRydWUsIm1heExlbmd0aCI6NDIsInJlbW92ZVRhZ3MiOnRydWV9LCJ0cmFuc2l0aW9uX2luVGltZSI6eyJkZWZhdWx0VmFsdWUiOjUwMH0sInRyYW5zaXRpb25fb3V0VGltZSI6eyJkZWZhdWx0VmFsdWUiOjUwMH19LCJleHBlcmllbmNlVHlwZSI6ImltYWdlQ2FsbFRvQWN0aW9uTWVzc2FnZSIsImxhYmVsIjoiVmFyaWFudCBBIiwiZGlzcGxheWVyIjoiYnViYmxlciJ9LCJoRE1nViI6eyJpZCI6ImhETWdWIiwidGVtcGxhdGVIVE1MIjoiPCUgaWYgKGltYWdlVXJsKSB7ICU+XFx0PGRpdiBjbGFzcz0nY3MtY3RhLWljb24tb3V0ZXItY29udGFpbmVyJz5cXHRcXHQ8ZGl2IGNsYXNzPSdjcy1jdGEtaWNvbi1jb250YWluZXInPlxcdFxcdFxcdDxpbWcgY2xhc3M9J2NzLWN0YS1pY29uJyBzcmM9JzwlPWltYWdlVXJsJT4nPiBcXHRcXHQ8L2Rpdj5cXHQ8L2Rpdj48JSB9ICU+PGRpdiBjbGFzcz0nY3MtY29udGVudC1jb250YWluZXIgY3MtY3RhLWNvbnRlbnQtY29udGFpbmVyJz4gICA8ZGl2IGNsYXNzPSdjcy1jdGEtdGl0bGUgY3MtdGl0bGUnPiAgICAgICA8JT10aXRsZSU+ICAgPC9kaXY+ICAgPGRpdiBjbGFzcz0nY3MtY3RhLWNvbnRlbnQgY3MtY29udGVudCc+ICAgICAgIDwlPWNvbnRlbnQlPiAgIDwvZGl2PjwvZGl2PjwlIGlmIChjYWxsVG9BY3Rpb24pIHsgJT5cXHQ8ZGl2IGNsYXNzPSdjcy1jdGEtYnV0dG9uLWNvbnRhaW5lcic+XFx0XFx0PGJ1dHRvbiB0eXBlPSdidXR0b24nIGNsYXNzPSdjcy1jdGEtYnV0dG9uJyA8JSBpZiAoY3RhRm9yZWdyb3VuZENvbG9yICYmIGN0YUJhY2tncm91bmRDb2xvcikgeyAlPiAgICAgICBzdHlsZT0nY29sb3I6IDwlPWN0YUZvcmVncm91bmRDb2xvciU+OyBiYWNrZ3JvdW5kLWNvbG9yOiA8JT1jdGFCYWNrZ3JvdW5kQ29sb3IlPjsnPCUgfSAlPj5cXHRcXHRcXHQ8JT1jYWxsVG9BY3Rpb24lPlxcdFxcdDwvYnV0dG9uPlxcdDwvZGl2PiA8JSB9ICU+IiwidGVtcGxhdGVQYXJhbXMiOnsiYmFja2dyb3VuZEltYWdlIjoiaHR0cHM6Ly9kMjIxcGYzenNoanF0OS5jbG91ZGZyb250Lm5ldC9zdGF0aWMvYXNzZXRzL3VubmFtZWQtZ2pnTEdsLTQ0MnctMTMzaC5qcGciLCJidWJibGVTdHlsZSI6eyJjb2xvciI6IiMwMDAwMDAifSwiY2FsbFRvQWN0aW9uIjoiIiwiY29udGVudCI6IiIsImN0YUJhY2tncm91bmRDb2xvciI6IiMzNDk4ZGIiLCJjdGFGb3JlZ3JvdW5kQ29sb3IiOiIjZmZmZmZmIiwib25TdWNjZXNzIjoiT3BlbiBQYWdlIiwib3BlbkluTmV3VGFiIjpmYWxzZSwidGl0bGUiOiIiLCJ0b3BIaWdobGlnaHRDb2xvciI6InRyYW5zcGFyZW50IiwidHlwZSI6ImltYWdlQ2FsbFRvQWN0aW9uTWVzc2FnZSIsInVybCI6Imh0dHA6Ly9teXNpdGUuY29tL2RlYWxzIiwid2hpdGVMYWJlbCI6dHJ1ZX0sImV4cGVjdGVkUGFyYW1zIjp7ImNhbGxUb0FjdGlvbiI6eyJodG1saXplU3BhY2luZyI6dHJ1ZSwicmVtb3ZlVGFncyI6dHJ1ZX0sImNvbnRlbnQiOnsiaHRtbGl6ZVNwYWNpbmciOnRydWUsIm1heExlbmd0aCI6MTQwLCJyZW1vdmVUYWdzIjp0cnVlfSwiY3RhQmFja2dyb3VuZENvbG9yIjp7fSwiY3RhRm9yZWdyb3VuZENvbG9yIjp7fSwiaW1hZ2VVcmwiOnt9LCJzaG93RGVsYXkiOnsiZGVmYXVsdFZhbHVlIjoyMDAwfSwidGl0bGUiOnsiaHRtbGl6ZVNwYWNpbmciOnRydWUsIm1heExlbmd0aCI6NDIsInJlbW92ZVRhZ3MiOnRydWV9LCJ0cmFuc2l0aW9uX2luVGltZSI6eyJkZWZhdWx0VmFsdWUiOjUwMH0sInRyYW5zaXRpb25fb3V0VGltZSI6eyJkZWZhdWx0VmFsdWUiOjUwMH19LCJleHBlcmllbmNlVHlwZSI6ImltYWdlQ2FsbFRvQWN0aW9uTWVzc2FnZSIsImxhYmVsIjoiVmFyaWFudCBCIiwiZGlzcGxheWVyIjoiYnViYmxlciJ9LCJUNVBjdCI6eyJpZCI6IlQ1UGN0IiwidGVtcGxhdGVIVE1MIjpudWxsLCJ0ZW1wbGF0ZVBhcmFtcyI6eyJ3aGl0ZUxhYmVsIjp0cnVlfSwiZXhwZWN0ZWRQYXJhbXMiOnsic2hvd0RlbGF5Ijp7ImRlZmF1bHRWYWx1ZSI6MjAwMH0sInRyYW5zaXRpb25faW5UaW1lIjp7ImRlZmF1bHRWYWx1ZSI6NTAwfSwidHJhbnNpdGlvbl9vdXRUaW1lIjp7ImRlZmF1bHRWYWx1ZSI6NTAwfX0sImV4cGVyaWVuY2VUeXBlIjoiY29udHJvbCIsImxhYmVsIjoiQ29udHJvbCIsImRpc3BsYXllciI6ImNvbnRyb2wifX0sInJ1bGVzIjpbeyJpZCI6IlJiaDNrIiwia2V5IjoidGltZXIuc2Vzc2lvbi50aW1lIiwibWF0Y2hlciI6Imd0IiwibWF5Q2hhbmdlRHVyaW5nUGFnZVZpZXciOnRydWUsInJ1bGVHcm91cCI6IjlsRHBCIiwidmFsdWUiOiI2MCJ9LHsiaWQiOiJ0T3pyMCIsImtleSI6ImNvbnRleHQucGFnZS51cmwiLCJtYXRjaGVyIjoibm90IGNvbnRhaW5zIiwibWF5Q2hhbmdlRHVyaW5nUGFnZVZpZXciOmZhbHNlLCJydWxlR3JvdXAiOiI5bERwQiIsInZhbHVlIjoiL2NoZWNrb3V0L2NhcnQsIGNoZWNrb3V0L29uZXBhZ2UifV0sImRpc3BsYXllciI6ImJ1YmJsZXIiLCJtb2JpbGVTdXBwb3J0ZWQiOmZhbHNlLCJ1cmxGaWx0ZXJpbmciOiIiLCJmb3JtU3VibWlzc2lvbiI6bnVsbCwiZGV2aWNlVGFyZ2V0aW5nIjpudWxsLCJzZWxlY3RlZEdvYWwiOiJlbmdhZ2VtZW50IiwibmFtZSI6IkRlc2lnbmVkIEhlc2l0YW50IDIuMjQiLCJmaWx0ZXJpbmdWYXJpYW50SWQiOiJ3aEFZaiIsInZhcmlhbnRzIjpbeyJpZCI6IndoQVlqIiwicGVyY2VudCI6NTB9LHsiaWQiOiJoRE1nViIsInBlcmNlbnQiOjUwfSx7ImlkIjoiVDVQY3QiLCJwZXJjZW50IjowfV19XQ=='));
couponCodesMap = {};
valueKnownRules = JSON.parse(base64_decode('WyJjb250ZXh0LnBhZ2UudXJsIiwicHJlc2V0LmRheSIsInByZXNldC5uaWdodCIsInByZXNldC53ZWVrZGF5IiwicHJlc2V0LndlZWtlbmQiLCJjb250ZXh0LnVzZXIucmVmZXJyZXIudXJsIiwiY29udGV4dC51c2VyLnJlZmVycmVyLnNlYXJjaCIsImNvbnRleHQudXNlci5yZWZlcnJlci5wYXJhbXMiLCJjb250ZXh0LnVzZXIubGFuZGluZ1BhZ2UudXJsIiwiY29udGV4dC51c2VyLmxhbmRpbmdQYWdlLnNlYXJjaCIsImNvbnRleHQudXNlci5sYW5kaW5nUGFnZS5wYXJhbXMiLCJjb250ZXh0LnNlc3Npb24ubGFuZGluZ1BhZ2UudXJsIiwiY29udGV4dC5zZXNzaW9uLmxhbmRpbmdQYWdlLnNlYXJjaCIsImNvbnRleHQuc2Vzc2lvbi5sYW5kaW5nUGFnZS5wYXJhbXMiLCJjb250ZXh0LnBhZ2UudXJsIiwiY29udGV4dC5wYWdlLnNlYXJjaCIsImNvbnRleHQucGFnZS5wYXJhbXMiLCJjb250ZXh0LmNvb2tpZSIsImNvbnRleHQud2Vic2l0ZVRpbWUiXQ=='));

// EXPERIMENTS CONFIGURATION ENDS HERE




// Start Config Postamble


var csGAAccount = 'UA-18038249-8';
var siteDomain = 'www.design55online.co.uk';
var homepageUrl = 'http://www.design55online.co.uk/';
var globalConfig = {};
defaultShowToolbar = true;
if (window.__csGlobal__ && window.__csGlobal__.tvis !== undefined) { // Toolbar Visible
    // Allow overriding "hidden mode" from outside
    defaultShowToolbar = window.__csGlobal__.tvis;
}

supportedBrowsers = ["Chrome", "Safari", "MSIE", "Firefox","IE11"];



// style
var barStyleNarrow = '';


initializeGeoAsync=true;


// Platform overrides:
runAfterBootstrap(function() { logDebug("Store type detected: Magento-dashboard"); } );

// This line must be LAST, and followed by a newline


/*! http://mths.be/placeholder v2.0.8 by @mathias */
runAfterBootstrap(function() {
	(function(window, document, $) {

		// Opera Mini v7 doesn't support placeholder although its DOM seems to indicate so
		var isOperaMini = Object.prototype.toString.call(window.operamini) == '[object OperaMini]';
		var isInputSupported = 'placeholder' in document.createElement('input') && !isOperaMini;
		var isTextareaSupported = 'placeholder' in document.createElement('textarea') && !isOperaMini;
		var prototype = $.fn;
		var valHooks = $.valHooks;
		var propHooks = $.propHooks;
		var hooks;
		var placeholder;

		if (isInputSupported && isTextareaSupported) {

			placeholder = prototype.placeholder = function() {
				return this;
			};

			placeholder.input = placeholder.textarea = true;

		} else {

			placeholder = prototype.placeholder = function() {
				var $this = this;
				$this
					.filter((isInputSupported ? 'textarea' : ':input') + '[placeholder]')
					.not('.placeholder')
					.bind({
						'focus.placeholder': clearPlaceholder,
						'blur.placeholder': setPlaceholder
					})
					.data('placeholder-enabled', true)
					.trigger('blur.placeholder');
				return $this;
			};

			placeholder.input = isInputSupported;
			placeholder.textarea = isTextareaSupported;

			hooks = {
				'get': function(element) {
					var $element = $(element);

					var $passwordInput = $element.data('placeholder-password');
					if ($passwordInput) {
						return $passwordInput[0].value;
					}

					return $element.data('placeholder-enabled') && $element.hasClass('placeholder') ? '' : element.value;
				},
				'set': function(element, value) {
					var $element = $(element);

					var $passwordInput = $element.data('placeholder-password');
					if ($passwordInput) {
						return $passwordInput[0].value = value;
					}

					if (!$element.data('placeholder-enabled')) {
						return element.value = value;
					}
					if (value == '') {
						element.value = value;
						// Issue #56: Setting the placeholder causes problems if the element continues to have focus.
						if (element != safeActiveElement()) {
							// We can't use `triggerHandler` here because of dummy text/password inputs :(
							setPlaceholder.call(element);
						}
					} else if ($element.hasClass('placeholder')) {
						clearPlaceholder.call(element, true, value) || (element.value = value);
					} else {
						element.value = value;
					}
					// `set` can not return `undefined`; see http://jsapi.info/jquery/1.7.1/val#L2363
					return $element;
				}
			};

			if (!isInputSupported) {
				valHooks.input = hooks;
				propHooks.value = hooks;
			}
			if (!isTextareaSupported) {
				valHooks.textarea = hooks;
				propHooks.value = hooks;
			}

			$(function() {
				// Look for forms
				$(document).delegate('form', 'submit.placeholder', function() {
					// Clear the placeholder values so they don't get submitted
					var $inputs = $('.placeholder', this).each(clearPlaceholder);
					setTimeout(function() {
						$inputs.each(setPlaceholder);
					}, 10);
				});
			});

			// Clear placeholder values upon page reload
			$(window).bind('beforeunload.placeholder', function() {
				$('.placeholder').each(function() {
					this.value = '';
				});
			});

		}

		function args(elem) {
			// Return an object of element attributes
			var newAttrs = {};
			var rinlinejQuery = /^jQuery\d+$/;
			$.each(elem.attributes, function(i, attr) {
				if (attr.specified && !rinlinejQuery.test(attr.name)) {
					newAttrs[attr.name] = attr.value;
				}
			});
			return newAttrs;
		}

		function clearPlaceholder(event, value) {
			var input = this;
			var $input = $(input);
			if (input.value == $input.attr('placeholder') && $input.hasClass('placeholder')) {
				if ($input.data('placeholder-password')) {
					$input = $input.hide().next().show().attr('id', $input.removeAttr('id').data('placeholder-id'));
					// If `clearPlaceholder` was called from `$.valHooks.input.set`
					if (event === true) {
						return $input[0].value = value;
					}
					$input.focus();
				} else {
					input.value = '';
					$input.removeClass('placeholder');
					input == safeActiveElement() && input.select();
				}
			}
		}

		function setPlaceholder() {
			var $replacement;
			var input = this;
			var $input = $(input);
			var id = this.id;
			if (input.value == '') {
				if (input.type == 'password') {
					if (!$input.data('placeholder-textinput')) {
						try {
							$replacement = $input.clone().attr({ 'type': 'text' });
						} catch(e) {
							$replacement = $('<input>').attr($.extend(args(this), { 'type': 'text' }));
						}
						$replacement
							.removeAttr('name')
							.data({
								'placeholder-password': $input,
								'placeholder-id': id
							})
							.bind('focus.placeholder', clearPlaceholder);
						$input
							.data({
								'placeholder-textinput': $replacement,
								'placeholder-id': id
							})
							.before($replacement);
					}
					$input = $input.removeAttr('id').hide().prev().attr('id', id).show();
					// Note: `$input[0] != input` now!
				}
				$input.addClass('placeholder');
				$input[0].value = $input.attr('placeholder');
			} else {
				$input.removeClass('placeholder');
			}
		}

		function safeActiveElement() {
			// Avoid IE9 `document.activeElement` of death
			// https://github.com/mathiasbynens/jquery-placeholder/pull/99
			try {
				return document.activeElement;
			} catch (exception) {}
		}

	}(this, document, jq));
});


function Displayer(containerSelector, template, defaultSettings) {
	extend(this, Observer);
	this._template = template;
	this._defaultSettings = defaultSettings || {};
	this._activeSettings = undefined;
	this._prefetched = false;
	this._containerSelector = containerSelector;
	this._innerSelector = "";
	this._isAlive = true;	// isAlive is relevant to activeSettings and netMessage, not the experience's state.
	this._isVisible = false;
	this._skipShowEvents = false;
	this._wasShownbefore = false;
	this._sendResidentEvent = false;
	this._residentState = null;
	this._previewMode = false;
	this._runsOnCSQuery = false;
    this.editingMode = urlParams.cseditormode ? urlParams.cseditormode==="edit" : false;

}


Displayer.prototype.runsOnCSQuery = function() {
	return this._runsOnCSQuery;
};

Displayer.prototype.init = function() {
	var attrType = "id";
	if (this._containerSelector.indexOf(".")===0) {
		attrType = "class";
	}
	jq("#"+rootContainerId).append(
		'<div '+attrType+'="'+this._containerSelector.substr(1)+'" style="display: none;"></div>'
	);
};

Displayer.prototype.ctaHandlerCB = function() {
	this.kill();
};

Displayer.prototype.kill = function() {
	this.trigger("hide", this._activeSettings);
	jq(this._containerSelector).hide();
	this._isAlive = false;
	this._isVisible = false;
};

Displayer.prototype.getAsHTML = function(settings) {
	var defaultSettingsClone = jq.extend(true, {}, this._defaultSettings);
	settings = jq.extend(true, defaultSettingsClone, settings);
	settings = this._sanitizeParams(settings);
	this._activeSettings = settings;
	settings.templateParams.previewMode = false;
	if (!settings.templateParams.siteId) {
		settings.templateParams.siteId = siteId;
	}
	settings.templateParams._htmlRendering = true;
	return this._getAsHTML();
};

Displayer.prototype.show = function(settings, showImmediately, previewMode) {
	var success = false;
	var that = this;
	if (previewMode!==undefined) {
		this._previewMode = previewMode;
	}

	settings = settings || this._activeSettings;
	if (!settings) {
		return success;
	}
	if (!that._previewMode && that._isVisible) {
		return success;
	}
	settings.templateParams.previewMode = !!previewMode;
	settings.templateParams.siteId = siteId;
	if (showImmediately===undefined) {
		that._residentState = getResidentValue();
		if (that._residentState && that._residentState.state===RESIDENT_START) {
			that._sendResidentEvent = true;
			showImmediately = false;
		} else if (isResidentActive()) {
			if (that._residentState.minimized===false) {
				// If resident isn't minimized, don't trigger any "show balloon" events.
				that._skipShowEvents = true;
			} else {
				// If it's active and minimized, then if the user opens it, we want to send "show balloon again" event as well
				that._messageWasShownBefore = true;
			}
			if (that._isVisible) return success;	// Bubble already shows an experience.
			showImmediately = true;
			if (that._residentState.minimized) {
				if (settings.nextSettings) {
					settings = settings.nextSettings;
				}
				if (settings.minimizedSettings) {
					settings.minimizedSettings.enabled = true;
				} else {
					settings.minimizedSettings = {enabled: true};
				}
				that.showMinimized(settings, showImmediately);
				return success;
			}
		}
	}
	var defaultSettingsClone = jq.extend(true, {}, this._defaultSettings);
	settings = jq.extend(true, defaultSettingsClone, settings);
	if (settings.disabled) {
		return success;
	}
	settings = this._sanitizeParams(settings);

	this._isAlive = true;
	this._activeSettings = settings;
	if (settings.events) {
		jq.each(settings.events, function (eventName, cb) {
			that.on(eventName, cb);
		});
	}
	if (this._activeSettings.events) {
		jq.each(this._activeSettings.events, function (eventName, cb) {
			that.on(eventName, cb);
		});
	}
	that.trigger('beforeRender', settings);
	if (!that._prefetched) {
		success = that._injectHTML();
	} else {
		success = true;
	}
	this.trigger("beforeShow", this._activeSettings);
//	if (this._activeSettings.nextSettings) {
//		this.trigger('prepareNextMessage', this._activeSettings.nextSettings);
//	}
	return success;
};

Displayer.prototype.showSuccess = function() {
	var that = this;
	this._isVisible = true;
	this.initCloseButton();
	jq(this._containerSelector+" "+this._innerSelector).on('hover', function() {
		that.trigger('messageHover', that._activeSettings);
	});

	jq(this._containerSelector+" "+this._innerSelector).on('click', function() {
		that.trigger('messageClick', that._activeSettings);
	});

};

Displayer.prototype.showDelayed = function(cb) {
	if (this._activeSettings && this._activeSettings.showDelay>0) {
		setTimeout(cb, this._activeSettings.showDelay);
	} else {
		cb();
	}
};

Displayer.prototype.hide = function(cb) {
	this.trigger('beforeHide');

};

Displayer.prototype.postHide = function() {
	if (this._isAlive && this._activeSettings && this._activeSettings.nextSettings) {
		this._activeSettings.nextSettings.showDelay = 0;
		this._activeSettings.nextSettings.showDelayCB = undefined;
		this.trigger('nextMessage', this._activeSettings.nextSettings);
		this._isAlive = false;
	}
	this._isVisible = false;
};

Displayer.prototype.prepare = function(settings) {
	this._activeSettings = settings;
	jq(this._containerSelector).css("visibility", "hidden");
	jq(this._containerSelector).css("opacity", "0");
	jq(this._containerSelector).show();
	var defaultSettingsClone = extend({}, this._defaultSettings);
	this._activeSettings = jq.extend(true, defaultSettingsClone, this._activeSettings);
	this._activeSettings = this._sanitizeParams(this._activeSettings);
	var success = this._injectHTML(this._activeSettings);
	if (success) {
		this._prefetched = true;
		var that = this;
		setTimeout(function(){
			// If the experience was displayed immediately after it was prepared (i.e. prepare and show were called within the same
			// execution context), don't hide the experience, as it is supposed to be shown.
			if (that._isVisible) {
				jq(that._containerSelector).css("opacity", "1");
				jq(that._containerSelector).css("visibility", "visible");
				return;
			}
			jq(that._containerSelector).hide();
			jq(that._containerSelector).css("opacity", "1");
			jq(that._containerSelector).css("visibility", "visible");
		}, 0);
	}
};

Displayer.prototype.prefetched = function() {
	return this._prefetched;
};

Displayer.prototype.clearPrefetched = function() {
	this._prefetched = false;
};

// Protected

Displayer.prototype._getAsHTML = function() {
	var result = null;
	try {
		var settings = jq.extend(true, {}, this._activeSettings);
		this._resolveDynamicProperties(settings);
		settings.templateParams.cssProp = function (name, valueProp, postfix) {
			if (this.hasOwnProperty(valueProp)) {
				postfix = postfix || "";
				return name + ": " + this[valueProp] + postfix + "; ";
			} else {
				return "";
			}
		};
		settings.templateParams.opactiyStyle = function (valueProp) {
			if (this.hasOwnProperty(valueProp) && (typeof(this[valueProp]) === "number") && this[valueProp] >=0 && this[valueProp] <= 100) {
				var dec = (this[valueProp] / 100).toFixed(2);
				var pct = Math.round(this[valueProp]);
				return "opacity: " + dec + "; " +
					"filter: alpha(opacity="+pct+"); " +
					"-moz-opacity: "+dec+";";
			}
			return "";
		};
		settings.templateParams.textProp = function (valueProp) {
			if (this.hasOwnProperty(valueProp) && (typeof(this[valueProp]) === "string" || typeof(this[valueProp]) === "number" || typeof(this[valueProp])==="boolean")) {
				return this[valueProp];
			}
			return "";
		};
        settings.templateParams.booleanProp = function (valueProp) {
            if (this.hasOwnProperty(valueProp) && (typeof(this[valueProp])==="boolean")) {
                return this[valueProp];
            }
            return false;
        };


		settings.templateParams.cmpTernary = function (valueProp, equalsTo, ifYes, ifNo) {
			ifNo = ifNo || "";
			if (this.hasOwnProperty(valueProp)) {
				if (this[valueProp] === equalsTo) {
					return ifYes;
				}
			}
			return ifNo;
		};
		settings.templateParams.addAsUrlParam = function(urlProp, paramProp) {
			if (this.hasOwnProperty(urlProp) && this.hasOwnProperty(paramProp)) {
				var url = this[urlProp];
				var param = this[paramProp];
				var paramDelimiter = url && url.indexOf("?")>-1 ? "&" : "?";
				return paramDelimiter+param;
			}
			return "";
		};
		if (settings.templateHTML) {
			var experienceTemplate = settings.templateHTML.replace(/'/g, '"');
			settings.templateParams.__previewMode = this._previewMode;
			settings.templateParams._inner = tmpl(experienceTemplate)(settings.templateParams);
		} else {
			settings.templateParams._inner = "";
		}
		result = tmpl(this._template)(settings.templateParams);
	} catch(e) {
		logError("Error rendering html",e, ERROR_CANVAS_RENDERING_HTML_FAILED);
	}
	return result;
};
Displayer.prototype._injectHTML = function() {
	var success = false;
    try {
        var finalHTML = this._getAsHTML();
        jq(this._containerSelector).html(finalHTML);
        if (typeof(jq("").placeholder) !== "undefined") {
            jq(this._containerSelector + " input, " + this._containerSelector + " textarea").placeholder();
        }
        StyledTTips.applyTooltips(this._containerSelector);
        success = true;
	} catch(e) {
		logError("Error rendering displayer",e, ERROR_CANVAS_RENDERING_DISPLAYER_FAILED);
	}
	return success;
};

Displayer.prototype._hookBasicEvents = function($innerContainer) {
	var mouseOverContainer = false;
	var that = this;
	$innerContainer.on('mouseenter', function() {
		if (!mouseOverContainer) {
			mouseOverContainer = true;
			that.trigger('behaviorHover', that._activeSettings);
		}
	}).on('mouseleave', function(e) {
		mouseOverContainer = false;
	}).on('click', function() {
			that.trigger('behaviorClick', that._activeSettings);
	});
	var _ctaHandler;
	if (typeof(customCtaHandler) === "function") {
		_ctaHandler = customCtaHandler.bind(that);
	} else {
		// Get the correct call to action handler based on the experience type
		if (that._activeSettings.experienceType==="lead") {
			_ctaHandler = EmailSubscriptionHandler.call(that);
		} else {
			if (that._activeSettings.templateParams && that._activeSettings.templateParams.onSuccess &&
				(that._activeSettings.templateParams.onSuccess==="Open Page" || that._activeSettings.templateParams.onSuccess==="Open Page&Hide")) {
				_ctaHandler = URLRedirectHandler.call(that);
			} else {
				_ctaHandler = that.hide;

			}
		}
	}

	jq(that._containerSelector + " .cs-cta-button, " + that._containerSelector + " .cs-cta-element").on('click', function(e) {
        if (that.editingMode) return;
        that.trigger('callToActionClick', that._activeSettings);
        if (_ctaHandler) {
            _ctaHandler();
        }
	});

	jq(that._containerSelector + " .cs-widget-logo").on("click", function() {
		window.open("http://commercesciences.com/?a=vi1&c="+clientId, "_blank");
	});

	jq(that._containerSelector + " .cs-lead-input").on("keypress", function(e) {
		if(e.which===13) {
			that.trigger('callToActionClick', that._activeSettings);
			if (_ctaHandler) {
				_ctaHandler();
			}
		}
	});
};

Displayer.prototype._applyCSSOverrides = function(elementSelector) {
	var $elem = jq(this._containerSelector + " " + elementSelector);
	if ($elem.length>0 && this._activeSettings.cssOverrides) {
		var overrides = this._activeSettings.cssOverrides;
		for (var s in overrides) {
			if (overrides.hasOwnProperty(s)) {
				// using .attr('style') instead of .css allows us to support !important directives.
				var origStyleContent = $elem.attr('style');
				$elem.attr('style', origStyleContent + ";"+s+":"+overrides[s]);
			}
		}
	}
};

Displayer.prototype._getTextHeight = function($elem) {
	var html_org = $elem.html();
	var html_calc = '<span>' + html_org + '</span>';
	$elem.html(html_calc);
	var height = $elem.find('span:first').height();
	$elem.html(html_org);
	return height;
};

Displayer.prototype._resolveDynamicProperties = function(settings) {
	for (var propName in settings) {
		if (settings.hasOwnProperty(propName) && typeof(settings[propName])==="function") {
			settings[propName] = settings[propName](settings);
		}
	}
};
// Go over expected params. Make sure templateParams has all of them
// If value is object, merge the values to a single string using css annotation
// Apply sanitizing instructions (remove html tags, replace new lines, etc.)
// Accepted instructions:
// 		removeTags [bool]
// 		htmlizeSpacing [bool]
Displayer.prototype._sanitizeParams = function(settings) {
	var _params = jq.extend({}, settings);
	_params.templateParams = _params.templateParams || {};
	for (var k in _params.expectedParams) {
		if (_params.expectedParams.hasOwnProperty(k)) {
			// Fill in missing params. First try taking from base params object
			// Otherwise just fill in with empty string (to avoid exceptions in the template translation) or default value if provided
			if (!_params.templateParams.hasOwnProperty(k)) {
				if (_params.hasOwnProperty(k)) {
					_params.templateParams[k] = _params[k];
				} else {
					var defaultValue =  _params.expectedParams[k].defaultValue;
					_params.templateParams[k] = defaultValue ? defaultValue : "";
				}
			}
			var instructions = _params.expectedParams[k];
			var sanitized = _params.templateParams[k];
			if (sanitized.constructor===Object) {
				var finalSanitized = "";
				for (var kk in sanitized) {
					if (sanitized.hasOwnProperty(kk)) {
						finalSanitized += kk+":"+sanitized[kk]+";";
					}
				}
				sanitized = finalSanitized;
			}
			if (sanitized && instructions.constructor===Object) {
				if (instructions.removeTags) {
					sanitized = sanitized.replace(/&/g, "&amp;")
						.replace(/</g, "&lt;")
						.replace(/>/g, "&gt;")
						.replace(/"/g, "&quot;")
						.replace(/'/g, "&#039;");
				}
				if (instructions.htmlizeSpacing) {
					sanitized = sanitized.split(/[\n\r]/g).join("<br/>");
					sanitized = sanitized.split(/\s\s/g).join("&nbsp; ");
				}
			}
			_params.templateParams[k] = sanitized;
		}
	}
	return _params;
};

function DisplayerCloseButton() {
	var that = this;
	this.initCloseButton = function initCloseButton() {
		var closing = false;
		if (that._previewMode===true) return;
		jq(that._containerSelector+" .cs-msg-close-btn").click(function() {
			that.trigger("closeClick", that._activeSettings);
			if (!closing) {
				that.hide();
				closing = true;
			}
		});
	};
}

function DisplayerCloseTimer() {
	var that = this;
	this.hideTimerID = 0;
	this.startHideTimer = function startHideTimer(timeBeforeCountdownStart) {
		timeBeforeCountdownStart = timeBeforeCountdownStart || 0;
		if (that._activeSettings.autoHideActive) {
			that._activeSettings.closeInSecs = Math.round(that._activeSettings.autoHideTime / 1000);
			var setTimerHTML = function() {
				var timerHTML = that._activeSettings.hideTimerHTML.replace("<%=closeInSecs%>", that._activeSettings.closeInSecs);
				jq(that._containerSelector + " .cs-msg-sec-tmr-container").html(timerHTML);
				jq(that._containerSelector + " .cs-msg-sec-tmr-container").show();
			};
			if (that._previewMode!==true) {
				setTimeout(function() {
					that.stopHideTimer();
					that.hideTimerID = setInterval(function() {
						that._activeSettings.closeInSecs--;
						setTimerHTML();
						if (that._activeSettings.closeInSecs<=0) {
							that.stopHideTimer();
							that.hide();
						}
					}, 1000);
				}, timeBeforeCountdownStart);
			}
			setTimerHTML();
		}
	};

	this.stopHideTimer = function stopHideTimer() {
		if (that.hideTimerID) {
			clearInterval(that.hideTimerID);
			that.hideTimerID = 0;
		}
	};

}

function EmailSubscriptionHandler() {
	var buildEmailSubscriptionUrl = function buildCSNewsletterUrl(email, campaignId, variantId) {
		var valuesString = JSON.stringify({email:email});
		var url = emailSubscriptionUrl + "?";
		url += "ver=1";
		//if (devMode) {
		//	url += "&dev=1";
		//}
		url += "&clientId=" + encodeURIComponent(clientId);
		url += "&campaignId=" + encodeURIComponent(campaignId);
        url += "&variantId=" + encodeURIComponent(variantId);
		url += "&data=" + base64_encode(valuesString);
		if (geoRequired && geo && geo.locationObj) {
			if (typeof(geo.locationObj.city) != "undefined") {
				url += "&city=" + geo.locationObj.city;
			}
			if (typeof(geo.locationObj.state) != "undefined") {
				url += "&state=" + geo.locationObj.state;
			}
			if (typeof(geo.locationObj.country) != "undefined") {
				url += "&country=" + geo.locationObj.country;
			}
		}
        return url;
	};

	var validateEmail = function validateEmail(emailField, emailValue) {
        if (!emailValue.match(email_regex) && !dontValidateEmail ) {
            emailValidationFailed(emailField);
            return false;
        }
		return true;
	};

    var emailValidationFailed = function emailValidationFailed(emailField) {
        emailField.addClass("cs-lead-invalid-input");
        if (isMobile) {
        	//set top position as the element height so it will be placed at the top of the input
        	var toolTipHeight = jq("#cs-mobile-tb-tooltip").height();
        	jq("#cs-mobile-tb-tooltip").css({"top": -toolTipHeight});
            jq("#cs-mobile-tb-tooltip").show();
            setTimeout(function() {
                jq("#cs-mobile-tb-tooltip").hide();
            }, 5000);
        } else {
            var validationError = "The email you provided is not valid.";
            StyledTTips.showTooltipForElement(emailField, 300, 6000, 900, validationError);
        }
    };

	return (function() {
		try {
			var redirectHandler = URLRedirectHandler.call(this);
			var emailSelector = this._containerSelector + " .cs-lead-input";
			var emailField = jq(emailSelector);
			if (emailField.length != 1) {
				logError("Failed handling email subscription: could not find email field.");
				return false;
			}
			var emailValue = emailField.val();
			if (!this._activeSettings.id) {
				logError("Failed handling email subscription: could not find variant id field.");
				return false;
			}
			var campaignId = DisplayerController.getCampaignIdForVariant(this._activeSettings.id);
			if (!campaignId) {
				logError("Failed handling email subscription: could not find campaignId.");
				return false;
			}
			if (!validateEmail(emailField, emailValue)) {
				return false;
			}
			var emailSubscriptionUrl = buildEmailSubscriptionUrl(emailValue, campaignId, this._activeSettings.id);
			var callbackJsMethod = "__csGlobal__['csEmailRegjsonp']";
			add_script(emailSubscriptionUrl+"&callback="+callbackJsMethod, function () {
				logDebug("email subscription script was loaded");
			});

			var dataForContext = {campaignId: campaignId, inputFields: {email: emailValue}};
			PersistFormSubmission.setUserContextAfterFormSubmission(dataForContext);

			redirectHandler();
		}catch(e) {
			logError("Error handling email subscription", e);
		}
		return true;
	}).bind(this);
}

function URLRedirectHandler() {
	var popupWindow = function (pageUrl, windowAttrs) {
		// defaults - can be overridden by overrides
		var settings = {
			height: 600, // sets the height in pixels of the window.
			width: 600, // sets the width in pixels of the window.
			fullscreen: 0, // sets the width and height to full screen size
			toolbar: 0, // determines whether a toolbar (includes the forward and back buttons) is displayed {1 (YES) or 0 (NO)}.
			scrollbars: 0, // determines whether scrollbars appear on the window {1 (YES) or 0 (NO)}.
			status: 0, // whether a status line appears at the bottom of the window {1 (YES) or 0 (NO)}.
			resizable: 1, // whether the window can be resized {1 (YES) or 0 (NO)}. Can also be overloaded using resizable.
			left: 0, // left position when the window appears.
			top: 0, // top position when the window appears.
			center: 1, // should we center the window? {1 (YES) or 0 (NO)}. overrides top and left
			location: 0, // determines whether the address bar is displayed {1 (YES) or 0 (NO)}.
			menubar: 0 // determines whether the menu bar is displayed {1 (YES) or 0 (NO)}.
		};
		if (windowAttrs && typeof (windowAttrs)=="object" ){
			jq.extend(settings, windowAttrs);
		}

		// calculate fullscreen width and height
		if (settings.fullscreen == 1) {
			var agt = navigator.userAgent.toLowerCase();
			if (typeof window.innerWidth != 'undefined' && (agt.indexOf('chrome') > -1 || agt.indexOf('safari') > -1)) {
				settings.width = screen.width;
				settings.height = screen.height;
			} else if (typeof window.outerWidth != 'undefined') {
				// the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
				settings.width = window.outerWidth;
				settings.height = window.outerHeight;
			} else {
				settings.width = screen.width;
				settings.height = screen.height;
			}
		}
		// center the window
		if (settings.center == 1) {
			settings.top = (parseInt(screen.height,10) - (parseInt(settings.height,10) + 110)) / 2;
			settings.left = (parseInt(screen.width,10) - parseInt(settings.width,10)) / 2;
		}

		parameters = "location=" + settings.location + ",menubar=" + settings.menubar + ",height=" + settings.height + ",width=" + settings.width +
			",toolbar=" + settings.toolbar + ",scrollbars=" + settings.scrollbars + ",status=" + settings.status + ",resizable=" + settings.resizable +
			",left=" + settings.left + ",screenX=" + settings.left + ",top=" + settings.top + ",screenY=" + settings.top;
		window.open(pageUrl,"popUp",parameters);

	};
	return (function() {
		var newTab = this._activeSettings.templateParams.openInNewTab;
		var pageUrl = this._activeSettings.templateParams.url;
		var shouldOpenAndHideMessage = this._activeSettings.templateParams.onSuccess==="Open Page&Hide";
		var shouldOpenUrl = this._activeSettings.templateParams.onSuccess==="Open Page" || shouldOpenAndHideMessage;
		var shouldShowConfirmMessage = this._activeSettings.templateParams.onSuccess==="Confirm & Close";

		var that = this;
		if (shouldOpenUrl && pageUrl) {
			var windowAttrs = null;	// not yet supported
			if (!newTab || newTab === "false") {
				setTimeout(function () {
					window.location.href = pageUrl;
				}, 500); // wait for analytics to be sent
			} else if (newTab && newTab === "popup") {
				popupWindow(pageUrl, windowAttrs);
			} else { // open in a new tab
				window.open(pageUrl, "_blank");
			}
		}
		if (shouldShowConfirmMessage) {
			jq(".cs-cta-text-close-link").hide();
			jq(".cs-lead-input-container input.cs-lead-input").prop('disabled', true).css({ 'color':'#888','background-color':'#ddd'});
			jq(".cs-lead-button-container .cs-cta-button").fadeTo( 200, 0, function() {
				jq(".cs-lead-button-container .cs-cta-button").hide();
				jq(".cs-flash-confirm").css( "opacity", 0).show().fadeTo(50,1);
				setTimeout(function () {
					that.ctaHandlerCB();
				}, 3000); // Flash the message for 3 seconds before closing the overlay
			});
		} else if(shouldOpenAndHideMessage){
			this.hide();
		}

		else {
			this.ctaHandlerCB();
		}
	}).bind(this);
}

function Bubbler(containerSelector, template, defaultSettings) {

	Displayer.call(this, containerSelector, template, defaultSettings);
	DisplayerCloseButton.call(this);

	var initializePosition = function initializePosition(_box, cb, settings, isInPreview) {
		cb = cb || function(){};
		var direction = settings.direction;
		direction = direction || "left";
		var _performPositioning;
		if (_box) {
			if (!isInPreview) {
				_box.css("visibility", "hidden");	// Hide until we're sure it's in position
			}
			if (_box.css("display")==="none") {
				_box.css("display","block");
			}
		} else {
			return;
		}
		if (direction==="left" || direction==="right") {
			_performPositioning = initializePositionHorizontalMode(_box, direction, settings);
		} else {
			_performPositioning = initializePositionVerticalMode(_box, direction);
		}
		var positioningWrapper = function() {
			if (_performPositioning()) {
				_box.css("visibility", "visible");
				cb();
			} else {
				setTimeout(positioningWrapper, 50);
			}
		};
		positioningWrapper();
	};

	var initializePositionHorizontalMode = function(_box, direction, settings) {
		return function() {
			// Use hard coded values due to a race condition in the designer: the CSS may be loaded AFTER the preview
			// was displayed. For now all the bubblers are the same size so this will work.
			var outerWidth = 450;
			var outerHeight = 145;
			if (settings.templateParams.type==="minimized") {
				outerHeight = 70;
			}
			var startPosX = (outerWidth+10) * -1;
			var startPosY = (outerHeight/-2);
			_box.css(direction, startPosX+"px");
			_box.css("top", startPosY+"px");
			return true;
		};
	};

	var initializePositionVerticalMode = function(_box, direction) {
		return function() {
			if (_box.outerHeight(true)) {
				var startPosX = _box.outerWidth(true)/-2;
				var startPosY = (_box.outerHeight(true)+10) * -1;
				_box.css("left", startPosX+"px");
				_box.css(direction, startPosY+"px");
			} else {
				return false;
			}
			return true;
		};
	};

	var that = this;
	that._defaultSettings = jq.extend(true, {
		type: "basic",
		bubbleStyle: "",
		ancientBrowser: !!(jq.browser && jq.browser.msie && parseInt(jq.browser.version.substring(0, 2), 10) <= 8),
		title: "",
		message: "",
		messageStyle: "",
		showCloseButton: true,

		direction: "right",
		disabled: false,
		closeButtonClass: "",
		topHighlightColor: "#ff0000",
		positioningOffset: undefined,
		showDelayCB: undefined,
		autoAlignMessage: true,
		expectedParams: {
			ancientBrowser: {},
			direction: {},
			type: {},
			extraBubbleClass: {},
			backgroundImage: {},
			bubbleStyle: {},
			showCloseButton: {},
			whiteLabel: {},
			closeButtonClass: {},
			topHighlightColor: {}
		}
	}, that._defaultSettings);

	var _isAnimating = false;
	var _needsRerender = false;
	var _devMode = false;
	var _renderWaitLimit = 0;

	var _applyDynamicAdjustments = function() {
		var containerWasHidden = false;
		var containerMsgBox = jq(that._containerSelector);

		if (containerMsgBox.css("display")==="none") {
			containerMsgBox.css("visibiliy", "hidden");
			containerMsgBox.css("opacity", "0");
			containerMsgBox.show();
			containerWasHidden = true;
		}

		// make sure title stays in one line. If not, reduce title font size
		if (that._activeSettings.oneLineTitle) {
			var done;
			var safety = 50;
			var orig_size = parseInt(jq(that._containerSelector + " .cs-msg-title-top").css("font-size"),10);
			var cur_size = orig_size;
			do {
				safety--;
				done = true;
				var titleHeight = that._getTextHeight(jq(that._containerSelector + " .cs-msg-box .cs-msg-title-top"))/2;
				if (titleHeight>orig_size) {
					done = false;
					cur_size--;
					jq(that._containerSelector + " .cs-msg-title-top").css("font-size", cur_size+"px");
					jq(that._containerSelector + " .cs-msg-title-ghost").css("font-size", cur_size+"px");
				}
				if (safety<=0) {
					jq(that._containerSelector + " .cs-msg-title-top").css("font-size", orig_size);
					jq(that._containerSelector + " .cs-msg-title-ghost").css("font-size", orig_size);
					break;
				}
			} while(done===false);
		}


		var bubblerHeight = jq(that._containerSelector + " .cs-msg-box").outerHeight(true) ;
		var frameHeight = bubblerHeight -jq(that._containerSelector + " .cs-msg-title").outerHeight(true)-jq(that._containerSelector + " .cs-msg-title-divider").outerHeight(true);
		var messageContainer =jq(that._containerSelector + " .cs-msg-text");
		var msgContentsWrapper =jq(that._containerSelector + " .cs-msg-contents-wrapper");
		var msgContentsWrapperBorder = msgContentsWrapper.outerHeight() - msgContentsWrapper.innerHeight();
		var verticalCenter;
		var manualAligns;
		if (that._activeSettings.direction==="top" || that._activeSettings.direction==="bottom") {
			that._activeSettings.autoAlignMessage = false;
		}
		if (that._activeSettings.autoAlignMessage) {
			// center text vertically if needed (needed = no top/bottom style already applied to text)
			if (displayModeVersion==="v2" && msgContentsWrapper.length) {
				manualAligns = _getManualAlignments(msgContentsWrapper);
				if (!manualAligns.verticalAlign) {
					verticalCenter = (bubblerHeight - msgContentsWrapper.outerHeight(true))/2;
					msgContentsWrapper.css("padding-top", verticalCenter+"px");
				}
			} else {
				if (messageContainer.length) {
					manualAligns = _getManualAlignments(messageContainer);
					if (!manualAligns.verticalAlign) {
						verticalCenter = (frameHeight - messageContainer.outerHeight(true))/2;
						messageContainer.css("position", "relative");
						messageContainer.css("top", verticalCenter+"px");
					}
				}
			}
		}
		if (that._activeSettings.type==="imageCallToAction") {
			// Center image inside the bubble
			var imageWrapper;
			if (displayModeVersion==="v2") {
				var csMsgContentsWrapperPaddingLeft= 126;
				verticalCenter = (bubblerHeight + msgContentsWrapperBorder - that._activeSettings.imageHeight)/2;
				imageWrapper = jq(that._containerSelector + " .cs-image-wrapper");
				imageWrapper.css("height", that._activeSettings.imageHeight+"px");
				imageWrapper.css("width", that._activeSettings.imageWidth+"px");
				manualAligns = _getManualAlignments(imageWrapper);
				if (!manualAligns.horizontalAlign) {
					imageWrapper.css("left", (csMsgContentsWrapperPaddingLeft-that._activeSettings.imageWidth)/2+"px");
				}
				if (!manualAligns.verticalAlign) {
					imageWrapper.css("top", verticalCenter+"px");
				}
			} else {
				verticalCenter = (frameHeight - that._activeSettings.imageHeight)/2;
				imageWrapper = jq(that._containerSelector + " .cs-image-wrapper");
				imageWrapper.css("height", that._activeSettings.imageHeight+"px");
				imageWrapper.css("width", that._activeSettings.imageWidth+"px");

				manualAligns = _getManualAlignments(imageWrapper);
				if (!manualAligns.horizontalAlign) {
					imageWrapper.css("right", verticalCenter+"px");
				}
				if (!manualAligns.verticalAlign) {
					imageWrapper.css("bottom", verticalCenter+"px");
				}
			}
		}
		// Coupon offer box (10%, free shipping etc.) may need font size re-adjustment depending on how much text there is in it (actually, we'll measure the height).
		var $offerBox = jq(".cs-offer-box-text");
		var offerBoxTextHeight = $offerBox.outerHeight(true);
		if (offerBoxTextHeight && offerBoxTextHeight>parseInt($offerBox.css("max-height"), 10)) {
			$offerBox.css("font-size", "17px");
		}
		if (containerWasHidden) {
			containerMsgBox.hide();
			containerMsgBox.css("visibiliy", "visible");
			containerMsgBox.css("opacity", "1");
		}

	};

	// returns {verticalAlign:bool, horizontalAlign:bool} depending on whether container or its child has
	// relative positioning applied.
	var _getManualAlignments = function(container) {
		var styles = container.attr("style") ? container.attr("style").split(";"):[];
		var innerDiv = container.find("div,span");
		if (innerDiv.length>0) {
			styles = styles.concat(innerDiv.attr("style")? innerDiv.attr("style").split(";"):[]);
		}
		var res = {verticalAlign: false, horizontalAlign: false};
		for (var i=0; i<styles.length; i++) {
			var style = jq.trim(styles[i].split(":")[0]);
			if (style==="top" || style==="bottom") {
				res.verticalAlign = true;
			} else
			if (style==="right" || style==="left") {
				res.horizontalAlign = true;
			}
		}
		return res;
	};

	that.isAnimating= function() {
		return _isAnimating;
	};

	that.show = function(settings, showImmediately, previewMode) {
		var success = Displayer.prototype.show.call(this, settings, showImmediately, previewMode);
		if (!success) {
			return false;
		}
		_renderWaitLimit = 0;
		that.trigger('afterRender', settings);
		if (!that._previewMode) {
			jq(that._containerSelector).css("visibility", "hidden");
		}
		// backward compatibility
		if (!settings.templateParams.hasOwnProperty("showDelay")) {
			settings.templateParams.showDelay = 2000;
			settings.templateParams.transition_inTime = 500;
			settings.templateParams.transition_outTime = 500;
		}
		var renderCB = function() {
			var boxHeight = jq(that._containerSelector + " .cs-msg-box").outerHeight(true);
			// Make sure the bubble is rendered before applying any adjustments and positioning, or they may be screwed up.
			if (boxHeight===0 && _renderWaitLimit<5) {
				_renderWaitLimit++;
				setTimeout(renderCB, 0);
				return false;
			}
			that._isAlive = true;
			that._applyCSSOverrides();
			_applyDynamicAdjustments();
			that.initCloseButton();
			_initializePositions();
			_addUIEvents();
			that.trigger('beforeShow', settings);
			that._isVisible = true;
			jq(that._containerSelector).css("visibility", "visible");
			var bubbleCallback = function() {
				if (that._sendResidentEvent) {
					//					Tracker.triggerEvent(tbGAToolbarAction, tbGAResidetnActivated);
					that._residentState.state = RESIDENT_ACTIVE;
					setCookie(ckie_resident_state, that._residentState, persistentCookieDuration);
				}
				if (typeof that._activeSettings.showDelayCB === "function") {
					that._activeSettings.showDelayCB();
				}
			};
			if (that._previewMode) {
				_showBubble(bubbleCallback, showImmediately);
			} else {
				if (showImmediately || that._activeSettings.templateParams.showDelay === -1) {
					// show now
					that._activeSettings.templateParams.showDelay = 0;
				}
				setTimeout(function() {
					_showBubble(bubbleCallback, showImmediately);
				}, that._activeSettings.templateParams.showDelay);
			}
			return true;
		};
		return renderCB();
	};

	that.hide = function(cb) {
		cb = cb || function() {};
		if (that._isAnimating) {
			return;
		}
		that.trigger('beforeHide');
		_transitionOut(function() {
			that._isVisible = false;
			that.trigger("hide", that._activeSettings);
			that.trigger("destroy");
			cb();
		});
	};

	that.set = function(options) {
		extend(that._defaultSettings, options);
		if (that._activeSettings) {
			extend(that._activeSettings, options);
		}
		return that;
	};

	that.get = function(key) {
		if (that._activeSettings && that._activeSettings.hasOwnProperty(key)) {
			return that._activeSettings[key];
		}
		if (that._defaultSettings.hasOwnProperty(key)) {
			return that._defaultSettings;
		}
		return undefined;
	};

	// Private methods

	// Used instead of "show" when the bubble is already rendered and we just want to re-animate it back to stage.
	var _showBubble = function(cb, showImmediately) {
		var bubblerContainer = jq(that._containerSelector);
		that.trigger('beforeAnimate', that._activeSettings);
		// Let beforeShow's callback have a final chance to prevent the display of the bubble.
		if (that._activeSettings.disabled) {
			that.kill();
			that.trigger("cancelshow", that._activeSettings);
			return;
		}
		that._isVisible = true;
		cb = cb || function(){};

		// Check if we need to show events again (resident is not longer in auto-open mode)
		if (that._skipShowEvents) {
			var residentValue = getResidentValue();
			if (residentValue.state!==RESIDENT_ACTIVE) {
				that._skipShowEvents = false;
			}
		}
		if (that._skipShowEvents===false && that._wasShownbefore) {
			that.trigger('show-again', that._activeSettings);
		}
		that.trigger("beforeDisplay", that._activeSettings);
		bubblerContainer.show();
		_transitionIn(function() {
			that._isVisible = true;
			if (that._skipShowEvents===false) {
				that.trigger('show', that._activeSettings);
			}
			that._wasShownbefore = true;
			cb();
		}, showImmediately);
	};

	// Development use only!
	that.__enterDevMode = function(bubbleOpen) {
		if (!window.__csGlobal__.isDevMode()) {
			return;
		}
		_devMode = true;
	};

	var _initializePositions = function() {
		jq(that._containerSelector).css("position", "fixed");
		jq(that._containerSelector).css("width", "1px");	//fixed bug in windows Safari where the widget isn't shown
		initializePosition(jq(that._containerSelector + " .cs-msg-box"), null, that._activeSettings, that._previewMode);
		// Set defaults
		that._activeSettings.templateParams = that._activeSettings.templateParams || {};
		that._activeSettings.templateParams.verticalPosition = that._activeSettings.templateParams.verticalPosition || "center";

		// in designer preview, show only this mode:
		if (that._previewMode && (document.location.search.indexOf("admn=") !== -1)) {

			that._activeSettings.templateParams.verticalPosition = "center";
		}
		var offset = "";
		switch (that._activeSettings.templateParams.verticalPosition.toLowerCase()) {
			case "center": offset = "top: 50%"; break;
			case "quarter": offset = "bottom: 361px"; break;
			case "bottom": offset = "bottom: 218px"; break;
			default: offset = "top: 50%"; break;
		}
		that._activeSettings.positioningOffset = offset;
		var container = jq(that._containerSelector);
		// remove previous positioning attributes
		// (in preview, where we use only one instance and redraw it, we would get bottom: and top: and the first one will take over,
		// not necessarily the one we want)
		container.css("top", "");
		container.css("bottom", "");
		container.attr("style", container.attr("style")+";"+that._activeSettings.positioningOffset);
		jq(that._containerSelector).css(that._activeSettings.direction, 0);

		if (that._activeSettings.direction==="left" || that._activeSettings.direction==="right") {
			otherDirection = that._activeSettings.direction==="left"? "right":"left";
		} else {
			otherDirection = that._activeSettings.direction==="top"? "bottom":"top";
		}
		jq(that._containerSelector).css(otherDirection, "auto");
	};

	var _addUIEvents = function _addUIEvents() {
		var containerMsgBox = jq(that._containerSelector + " .cs-msg-box");
		Displayer.prototype._hookBasicEvents.call(that, containerMsgBox);
	};

	var _transitionIn = function _transitionIn(cb, showImmediately) {
		var o = {};
		o[that._activeSettings.direction] = "0px";
		if (showImmediately || _devMode || that._previewMode) {
			jq(that._containerSelector + " .cs-msg-box").show();
			jq(that._containerSelector + " .cs-msg-box").css(o);
			cb();
		} else {
			_isAnimating = true;
			jq(that._containerSelector + " .cs-msg-box").show().animate(o, that._activeSettings.templateParams.transition_inTime, function() {
				_isAnimating = false;
				cb();
			});
		}

	};

	var _transitionOut = function _transitionOut(cb) {
		if (_devMode || that._previewMode) {
			that._isVisible = false;
			that.trigger("close");
			cb();
			return;
		}
		that.trigger("close");
		_isAnimating = true;
		var elem = jq(that._containerSelector + " .cs-msg-box");
		var targetPos;
		var speed;
		targetPos = (elem.outerWidth(true)+10) * -1;
		var o = {};
		o[that._activeSettings.direction] = targetPos+"px";
		elem.animate(o, that._activeSettings.templateParams.transition_outTime, function() {
			elem.hide();
			_isAnimating = false;
			cb();
		});
	};

}
registerDisplayer("bubbler", function(containerSelector) {
	var template = ''+
		'<div class="cs-msg-wrapper<%= ancientBrowser ? " cs-ancient-browser" : ""%>">' +
			'<div class="cs-msg-box cs-msg-<%=direction%> cs-msg-<%=type%> <%=topHighlightColor==="transparent"?"cs-msg-no-top-line":""%> <%=extraBubbleClass%> <%=backgroundImage? "" : "cs-msg-nobg" %>" style="text-align: left; border-top-color:<%=topHighlightColor%>; <%=bubbleStyle? bubbleStyle : "" %><% if (backgroundImage) { %> background: url(<%=backgroundImage%>) no-repeat 0px -6px;<% } %>">' +
				'<% if(showCloseButton) { %> ' +
				'<div class="cs-msg-close-btn <%=closeButtonClass%>">' +
					'<div class="cs-msg-x-ph"> ' +
						'<div>' + /*languageMgr.get("closeLabel")*/"" + '</div>' +
					'</div>' +

				'</div>' +
				'<% } %>' +
				'<div class="cs-msg-contents-wrapper" >' +
					'<%=_inner%>' +
				'</div>' +
                '<% if(!whiteLabel) { %> ' +
				'<div class="cs-widget-logo">' +
				'	Not using Commerce Sciences yet?' +
				'</div>' +
                '<% } %>' +
			'</div>' +
		'</div>';
	containerSelector = containerSelector || "#csBubblerRoot";
	Bubbler.prototype = new Displayer();
	Bubbler.prototype.constructor = Bubbler;
	return new Bubbler(containerSelector, template);
});

function BubblerMobile(containerSelector, template, defaultSettings) {
	Displayer.call(this, containerSelector, template, defaultSettings);
	var that = this;

	this.show = function show(settings, showImmediately, previewMode) {
		var success = Displayer.prototype.show.call(that, settings, showImmediately, previewMode);
		if (!success) {
			return false;
		}
		jq(that._containerSelector).show();
	};
}

registerDisplayer("bubblerMobile", function(containerSelector) {
	var template = ''+
		'<div class="cs-msg-box cs-msg-<%=textProp("type")%> <%=textProp("topHighlightColor")==="transparent"?"cs-msg-no-top-line":""%> <%=textProp("extraBubbleClass")%> <%=textProp("backgroundImage")? "" : "cs-msg-nobg" %>" style="text-align: left; border-top-color:<%=textProp("topHighlightColor")%>; <%=textProp("bubbleStyle")? textProp("bubbleStyle") : "" %><% if (textProp("backgroundImage")) { %> background: url(<%=backgroundImage%>) 0px -6px; background-size: 100% 100%;<% } %>">'+
		'	<% if(!textProp("showCloseButton") || showCloseButton) { %> ' +
		'		<div class="cs-msg-close-btn <%=textProp("closeButtonClass")%>">' +
		'			<div class="cs-msg-x-ph"> ' +
		'				<div></div>' +
		'			</div>' +
		'		</div>' +
		'	<% } %>' +
		'	<div class="cs-msg-box-inner">'+
		'		<%=_inner%>' +
		'	</div>' +
		'</div>';
	containerSelector = containerSelector || "#csBubblerMRoot";
	BubblerMobile.prototype = new Displayer();
	BubblerMobile.prototype.constructor = BubblerMobile;
	return new BubblerMobile(containerSelector, template);
});

registerDisplayer("control", function(containerSelector) {

    function Control(containerSelector, template, defaultSettings) {

        Displayer.call(this, containerSelector, template, defaultSettings);

        this.show = function(settings, showImmediately, previewMode) {
            var that = this;
			settings = this._sanitizeParams(settings);
            setTimeout(function() {
				var delayTime = 0;
				if (!showImmediately) {
					if (settings.templateParams) {
						if (settings.templateParams.showDelay) {
							delayTime += settings.templateParams.showDelay;
						}
						if (settings.templateParams.transition_inTime) {
							delayTime += settings.templateParams.transition_inTime;
						}
					}
				}
				setTimeout(function() {
					that.trigger("beforeDisplay", settings);
				}, delayTime);
            }, 0);
			return true;
        };

		this.init = function() {
		};
    }

    Control.prototype = new Displayer();
    Control.prototype.constructor = Control;
    return new Control(containerSelector);
});

registerDisplayer("lightbox", function(containerSelector) {
	function Lightbox(containerSelector, template, defaultSettings) {
		Displayer.call(this, containerSelector, template, defaultSettings);
		DisplayerCloseButton.call(this);
		this._defaultSettings = {
			titleTextColor: '#303030',
			msgFontSize: 18,
			bubbleStyle: "",
			titleFontSize: 16,
			borderColor: '#b0b0b0',
			showCloseButton: false,
			type: "basic",
			title: "",
			showDelay: 0,
			showDelayCB: undefined,
			// Backward compatibility.. The template can render this if it's empty.
			powered_by: '<a href="http://commercesciences.com?a=bnc&c='+clientId+'" target="_blank">Powered By <span>Commerce Sciences</span></a>',
			landingPage: "",
			clientId: clientId,
			callback: undefined,
			callbackTriggerCursorStyle: "pointer",
			closeCallback: undefined,
			expectedParams: {
				ancientBrowser: {},
				direction: {},
				type: {},
				extraBubbleClass: {},
				backgroundImage: {},
				width: {},
				height: {},
				bubbleStyle: {},
				showCloseButton: {},
				closeButtonClass: {},
				contentAlign: {},
				headerMargin: {},
				whiteLabel: {}
			}
		};
		extend(this._defaultSettings, defaultSettings);
		this._containerSelector = containerSelector;
		this._innerSelector = ".cs-lightbox-inner";
		var that = this;

		this.show = function show(settings, showImmediately, previewMode) {
			var success = Displayer.prototype.show.call(that, settings, showImmediately, previewMode);
			if (!success) {
				return false;
			}
			var renderCB = function() {
				Displayer.prototype.showSuccess.call(that);
				jq(that._containerSelector).css("opacity","0");				
				jq(that._containerSelector).show();				
				_centerMessage();
				_hookParts();
				that.trigger("beforeShow", that._activeSettings);
				that.trigger("beforeDisplay", that._activeSettings);
				jq(that._containerSelector).css("opacity","1");
				that.trigger("show", that._activeSettings);
				if (typeof that._activeSettings.showDelayCB==="function") {
					that._activeSettings.showDelayCB();
				}
				that._prefetched = false;
				return success;

			};
			if (previewMode) {
				return renderCB();
			} else {
				var delay = that._activeSettings.showDelay;
				if (showImmediately) {
					delay = 0;
				}
				setTimeout(renderCB, delay);
				return true;
			}
		};

		this.hide = function hide(cb) {
			Displayer.prototype.hide.call(that, cb);
			cb = cb || function() {};
			jq(that._containerSelector).hide();
			that.trigger("hide", that._activeSettings);
			that._isVisible = false;
			cb();
			Displayer.prototype.postHide.call(that);
		};

		var _centerMessage = function _centerMessage() {
			var inner = jq(that._innerSelector);
			var left = Math.floor(Math.max(500, inner.outerWidth(true))/-2);
			var top = Math.floor(Math.max(400, inner.outerHeight(true))/-2);
			inner.css({"margin-left":left+"px", "margin-top":top+"px"});
		};

		var _hookParts = function _hookParts() {
			var inner = jq(that._containerSelector + " .cs-lightbox-inner");
			Displayer.prototype._hookBasicEvents.call(that, inner);
			jq(that._containerSelector + " .cs-lightbox-outer").click(function() {
				that.hide();
			});
		};
	}

	var template = 	'<div class="cs-lightbox-outer <%=cmpTernary("__previewMode", true, "cs-lightbox-outer-preview")%>" style="<%=opactiyStyle("overlayOpacity")%>"></div>' +
		'<div class="cs-lightbox-inner <%=backgroundImage? "" : "cs-lightbox-nobg" %>" style="<% if (backgroundImage) { %> background: url(<%=backgroundImage%>) no-repeat 0px 0px;<% } %> <% if (width) { %> width: <%=width%>px;<% } else {%> width: 500px; <%} %> <% if (height) { %> height: <%=height%>px;<% } else {%> height: 400px; <% } %>text-align: <%= contentAlign %>;<%=bubbleStyle? bubbleStyle : "" %>">' +
			'<div class="cs-msg-close-btn cs-msg-close-btn-x">' +
				'<div class="cs-msg-x-ph">' +
					'<div></div>' +
				'</div>' +
			'</div>' +
			'<div class="cs-msg-contents-wrapper">' +
				'<%=_inner%>' +
			'</div>' +
		'</div>' +
		'<% if(!whiteLabel) { %> ' +
			'<div class="cs-lightbox-powered-by <%=cmpTernary("__previewMode", true, "cs-lightbox-powered-by-preview")%>">' +
				'<span class="cs-widget-logo">Not using Commerce Sciences yet?</span>' +
			'</div>' +
		'<% } %> ';

	containerSelector = containerSelector || "#csLightboxRoot";
	Lightbox.prototype = new Displayer();
	Lightbox.prototype.constructor = Lightbox;
	return new Lightbox(containerSelector, template);
});

registerDisplayer("lightboxMobile", function(containerSelector) {
	function LightboxMobile(containerSelector, template, defaultSettings) {
		Displayer.call(this, containerSelector, template, defaultSettings);
		DisplayerCloseButton.call(this);
		this._defaultSettings = {
			titleTextColor: '#303030',
			msgFontSize: 18,
			bubbleStyle: "",
			titleFontSize: 16,
			borderColor: '#b0b0b0',
			showCloseButton: false,
			type: "basic",
			title: "",
			showDelay: 0,
			showDelayCB: undefined,
			// Backward compatibility.. The template can render this if it's empty.
			powered_by: '<a href="http://commercesciences.com?a=bnc&c='+clientId+'" target="_blank">Powered By <span>Commerce Sciences</span></a>',
			landingPage: "",
			clientId: clientId,
			callback: undefined,
			callbackTriggerCursorStyle: "pointer",
			closeCallback: undefined,
			expectedParams: {
				ancientBrowser: {},
				direction: {},
				type: {},
				extraBubbleClass: {},
				backgroundImage: {},
				bubbleStyle: {},
				showCloseButton: {},
				closeButtonClass: {},
				contentAlign: {},
				headerMargin: {},
				whiteLabel: {}
			}
		};
		extend(this._defaultSettings, defaultSettings);
		this._containerSelector = containerSelector;
		this._innerSelector = ".cs-lightbox-inner";
		var that = this;

		this.show = function show(settings, showImmediately, previewMode) {
			var success = Displayer.prototype.show.call(that, settings, showImmediately, previewMode);
			if (!success) {
				return false;
			}
			var renderCB = function() {
				Displayer.prototype.showSuccess.call(that);

				jq(that._containerSelector).css("opacity","0");				
				jq(that._containerSelector).show();
								
                var changeElementRelativeToScale = new scalingCalculations();
				var scale = changeElementRelativeToScale.getScale();
				if (scale && scale !== 1) {
					changeElementRelativeToScale.updateLightboxWidthScaling(scale);
					changeElementRelativeToScale.updateLightboxHeightScaling(scale);
					changeElementRelativeToScale.updateTopScaling(scale);
					changeElementRelativeToScale.updateFontSizeScaling(scale);
					changeElementRelativeToScale.updateMarginScaling(scale);
					changeElementRelativeToScale.updatePaddingScaling(scale);
                    changeElementRelativeToScale.updateLineHeightSizeScaling(scale);
				}														
				_centerMessage();
				_hookParts();
				that.trigger("beforeShow", that._activeSettings);
				that.trigger("beforeDisplay", that._activeSettings);
				jq(that._containerSelector).css("opacity","1");
				that.trigger("show", that._activeSettings);
				if (typeof that._activeSettings.showDelayCB==="function") {
					that._activeSettings.showDelayCB();
				}
				that._prefetched = false;
				return success;

			};
			if (previewMode) {
				return renderCB();
			} else {
				var delay = that._activeSettings.showDelay;
				if (showImmediately) {
					delay = 0;
				}
				setTimeout(renderCB, delay);
				return true;
			}
		};

		this.hide = function hide(cb) {
			Displayer.prototype.hide.call(that, cb);
			cb = cb || function() {};
			jq(that._containerSelector).hide();
			that.trigger("hide", that._activeSettings);
			that._isVisible = false;
			cb();
			Displayer.prototype.postHide.call(that);
		};

		var _centerMessage = function _centerMessage() {
			var inner = jq(that._innerSelector);
			var left = Math.floor(Math.max(500, inner.outerWidth(true))/-2);
			var top = Math.floor(Math.max(400, inner.outerHeight(true))/-2);
			//inner.css({"margin-left":left+"px", "margin-top":top+"px"});
		};

		var _hookParts = function _hookParts() {
			var inner = jq(that._containerSelector + " .cs-lightbox-inner");
			Displayer.prototype._hookBasicEvents.call(that, inner);
			jq(that._containerSelector + " .cs-lightbox-outer").click(function() {
				that.hide();
			});
		};

		function scalingCalculations() {
			this.updateLightboxWidthScaling = function(scale) {
				var unitType = "px";
				var modal = jq(that._innerSelector);

				//get width
				var modalCurrentWidth = parseInt(modal.css("width"), 10);
				var modalNewWidth = converParameterToRelaventScale(scale, modalCurrentWidth, unitType);
				modal.css("width", modalNewWidth);

				//get modal border-radius
				var modalCurrentBorderRadius = parseInt(modal.css("border-radius"), 10);
				var modalNewBorderRadius = converParameterToRelaventScale(scale, modalCurrentBorderRadius, unitType);
				modal.css("border-radius", modalNewBorderRadius);
			};
			this.updateLightboxHeightScaling = function(scale) {
				var unitType = "px";
				var modal = jq(that._innerSelector);

				//get width
				var modalCurrentHeight = parseInt(modal.css("height"), 10);
				var modalNewHeight = converParameterToRelaventScale(scale, modalCurrentHeight, unitType);
				modal.css("height", modalNewHeight);				
			};
			this.updateTopScaling = function(scale) {
				var unitType = "px";
				var inner = jq(that._innerSelector);
				var elementsToChange = inner.find('.cs-top-scaling');
				jq.each(elementsToChange, function(index, element) {
					var originalTop = jq(element).css("top");
					
					if (originalTop) {
						jq(element).attr("originalTop", originalTop);
						var newTop = converParameterToRelaventScale(scale, originalTop, unitType);
						jq(element).css("top", newTop);
					} else {
						return;
					}					
				});		
			};
			this.updateFontSizeScaling = function(scale) {
				var unitType = "%";
				var inner = jq(that._innerSelector);
				var elementsToChange = inner.find('.cs-font-scaling');
				jq.each(elementsToChange, function(index, element) {
					var parentFontSize = parseInt(jq(element).parent().css("font-size"), 10);
					var newFontSize = converParameterToRelaventScale(scale, parentFontSize, unitType);
					jq(element).css("font-size", newFontSize + "%");
				});				
			};
            this.updateLineHeightSizeScaling = function(scale) {
                var unitType = "px";
                var inner = jq(that._innerSelector);
                var elementsToChange = inner.find('.cs-line-height-scaling');
                jq.each(elementsToChange, function(index, element) {
                    var parentFontSize = parseInt(jq(element).parent().css("line-height"), 10);
                    var newFontSize = converParameterToRelaventScale(scale, parentFontSize, unitType);
                    jq(element).css("line-height", newFontSize + "px");
                });
            };

			this.updateMarginScaling = function(scale) {
				var unitType = "px";
				var inner = jq(that._innerSelector);
				var elementsToChange = inner.find('.cs-margin-scaling');
				jq.each(elementsToChange, function(index, element) {
					var originalMargin = jq(element).css("margin-top");
					
					if (originalMargin) {
						jq(element).attr("originalMargin", originalMargin);
						var newMargin = converParameterToRelaventScale(scale, originalMargin, unitType);
						jq(element).css("margin-top", newMargin);
					} else {
						return;
					}					
				});		
			};

			this.updatePaddingScaling = function(scale) {
				var unitType = "px";
				var inner = jq(that._innerSelector);
				var elementsToChange = inner.find('.cs-padding-scaling');
				jq.each(elementsToChange, function(index, element) {
					var originalPaddingTop = jq(element).css("padding-top");
					var originalPaddingLeft = jq(element).css("padding-left");
					
					if (originalPaddingTop && originalPaddingLeft) {
						jq(element).attr("originalPaddingTop", originalPaddingTop);
						jq(element).attr("originalPaddingLeft", originalPaddingLeft);
						var newPaddingTop = converParameterToRelaventScale(scale, originalPaddingTop, unitType);
						var newPaddingLeft = converParameterToRelaventScale(scale, originalPaddingLeft, unitType);
						if (jq(element).hasClass('cs-only-top-padding-scaling')) {
							jq(element).css("padding-top", newPaddingTop);
						}
						else if (jq(element).hasClass('cs-only-top-and-bottom-padding-scaling')) {
							jq(element).css("padding", newPaddingTop+"px" + " " + originalPaddingLeft);
						} else {
							jq(element).css("padding", newPaddingTop+"px" + " " + newPaddingLeft+"px");
						}
					} else {
						return;
					}					
				});		
			};
			
			this.updateOrientation = function() {
				this.orientation = window.orientation;

				if(this.orientation === undefined) {
					// No JavaScript orientation support. Work it out.
					if(document.documentElement.clientWidth > document.documentElement.clientHeight) this.orientation = 'landscape';
					else this.orientation = 'portrait';

				}
				else if(this.orientation === 0 || this.orientation === 180) this.orientation = 'portrait';
				else this.orientation = 'landscape'; // Assumed default, most laptop and PC screens.
			};

			// Get current scale
			//-------------------
			this.getScale = function() {
				this.viewportScale = undefined;

				// Get viewport width
				var viewportWidth = document.documentElement.clientWidth;

				// Abort. Screen width is greater than the viewport width (not fullscreen).
				if(screen.width > viewportWidth) {
					console.log('Aborted viewport scale measurement. Screen width > viewport width');
					return;
				}

				// Get the orientation corrected screen width
				this.updateOrientation();
				var screenWidth = screen.width;

				if(this.orientation === 'portrait') {					
					// Take smaller of the two dimensions
					//even if orientation is portarait but the width is bigger than height so the width is height
					if(screen.width > screen.height) {
						screenWidth = screen.height;
					}
				}
				else {
					// Take larger of the two dimensions
					if(screen.width < screen.height) {
						screenWidth = screen.height;	
					} 
				}

				// Calculate viewport scale
				this.viewportScale = screenWidth / window.innerWidth;
				return this.viewportScale;
			};

			this.update = function(callback) {
				// Clear timeout if already set
				if(this.timeout !== undefined) {
					clearTimeout(this.timeout);
					this.timeout = undefined;
				}

				if(this.delay > 0) {
					// Delay compensates for viewport bounce
					var viewScale = this;
					this.timeout = setTimeout(function() {
						viewScale.getScale();
						if(callback !== undefined) callback();
					}, this.delay);
				}
				else {
					// Immediate scale update
					this.getScale();
					if(callback !== undefined) callback();
				}
			};

			function converParameterToRelaventScale (scale, valueToScale, unitType) {
				valueToScale = parseInt(valueToScale, 10);
				var newValue = valueToScale;
				if (scale < 1) {
					if (unitType === "px") {
						newValue = parseInt( (valueToScale/scale).toFixed(0), 10 );
					} else { // than %
						newValue = parseInt( (100 / scale).toFixed(0), 10 );
					}
				} else if (scale > 1) {
					//handle when zoom
				}
				return newValue;	
				

				/*if (scale < 1) {
					var ratio = parseInt( (valueToScale * scale).toFixed(0), 10 );
					newValue = valueToScale + ratio;
				} else if (scale > 1) {
					//handle when zoom
				}
				
				return newValue;*/				
			}
		}
	}
	
	var template = 	'<div class="mobile-lightbox cs-lightbox-outer <%=cmpTernary("__previewMode", true, "cs-lightbox-outer-preview")%>" style="<%=opactiyStyle("overlayOpacity")%>"></div>' +
					'<div class="cs-lightbox-inner <%=backgroundImage? "" : "cs-lightbox-nobg" %>" style="<% if (backgroundImage) { %> background: url(<%=backgroundImage%>) no-repeat 0; background-size: cover;<% } %>text-align: <%= contentAlign %>;<%=bubbleStyle? bubbleStyle : "" %>; width:290px; height:335px">' +
						'<div class="cs-msg-close-btn cs-msg-close-btn-x"><span class="cs-font-scaling">x</span></div>' +								
						'<div class="cs-msg-contents-wrapper cs-padding-scaling">' +
							'<%=_inner%>' +
						'</div>' +
					'</div>';					

	containerSelector = containerSelector || "#csLightboxMobileRoot";
	LightboxMobile.prototype = new Displayer();
	LightboxMobile.prototype.constructor = LightboxMobile;
	return new LightboxMobile(containerSelector, template);
});



function BarDisplayer(containerSelector, template, defaultSettings) {
	Displayer.call(this, containerSelector, template, defaultSettings);
	DisplayerCloseButton.call(this);
	var that = this;
	this._defaultSettings = defaultSettings;
	this._containerSelector = containerSelector;
	this._innerSelector = ".cs-bar-displayer-inner";
	this._isAnimating = false;
	that._defaultSettings = jq.extend(true, {
		transition_inTime: 500,
		transition_outTime: 500
	}, this._defaultSettings);

	that.kill = function() {
		jq(".cs-margin-provider").remove();
		Displayer.prototype.kill.call(that);
	};

	that.ctaHandlerCB = function() {
		if (that._activeSettings.templateParams && that._activeSettings.templateParams.type==="lead") {
			that.kill();
		}
		// override parent to prevent closing the displayer on cta click.
	};

	that.show = function(settings, showImmediately, previewMode) {
		var success = Displayer.prototype.show.call(this, settings, showImmediately, previewMode);
		if (!success) {
			return false;
		}
		var $container = jq(that._containerSelector);
		that.trigger('afterRender', settings);
		that.trigger('beforeShow', settings);
		that.trigger("beforeDisplay", that._activeSettings);
		Displayer.prototype._hookBasicEvents.call(that, $container);
		_addMarginDiv();
		if (settings.templateParams.barMode==="inline") {
			_moveContainerToBodyBottom();
			$container.css("visibility", "hidden");
			$container.show();
			_keepFooterAtBottom();
			$container.css("visibility", "visible");
		} else {
			_addMarginToPageBottom();
			$container.show();
		}
		Displayer.prototype.showSuccess.call(that);

		return true;
	};

	that.hide = function() {
		if (that._isAnimating) {
			return;
		}
		that.trigger('beforeHide');
		_transitionOut(function() {
			that._isVisible = false;
			that.trigger("hide", that._activeSettings);
			that.trigger("destroy");
		});
	};

	var _transitionOut = function(cb) {
		that._isAnimating = true;
		that.trigger("close");
		_isAnimating = true;
		var $elem = jq(that._containerSelector + " .cs-msg-box");
		var targetPos;
		targetPos = $elem.outerHeight(true)*-1;
		var o = {
			bottom: targetPos+"px"
		};
		$elem.css("position", "fixed");
		$elem.css("bottom", "0");
		$elem.animate(o, that._activeSettings.transition_outTime, function() {
			$elem.hide();
			_isAnimating = false;
			cb();
		});
	};
	var _addMarginDiv = function() {
		jq("<div class='cs-margin-provider'></div>").appendTo(document.body);
	};
	var _moveContainerToBodyBottom = function() {
		jq(that._containerSelector).appendTo(document.body);
	};
	var _keepFooterAtBottom = function() {
		jq(that._containerSelector).prev().css("margin-bottom", "0");
		var screenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
		var bodyHeight = jQuery("body").outerHeight(true);
		if (screenHeight>bodyHeight) {
			jq(".cs-margin-provider").css("margin-bottom", (screenHeight - bodyHeight) + "px");
		}
		jq(window).resize(function() {
			_keepFooterAtBottom();
		});
	};
	var _addMarginToPageBottom = function() {
		jq(".cs-margin-provider").css("margin-bottom", "43px");
	};
}
registerDisplayer("bar", function(containerSelector) {
	var template = '' +
		'<div class="cs-bar-outer cs-msg-box cs-msg-<%=textProp("type")%> cs-bar-bottom <%=cmpTernary("barMode", "hovering", "cs-bar-hovering", "cs-bar-inline")%> <%=cmpTernary("topHighlightColor", "transparent", "no-border")%>" style="<%=cssProp("background-color","backgroundColor")%> <%=cssProp("border-color", "topHighlightColor")%> height:40px;">' +
		'	<% if (!textProp("whiteLabel") || !whiteLabel) { %> ' +
		'		<div class="cs-widget-logo cs-bar-logo"></div>' +
		'	<% } %> ' +
		'	<div class="cs-bar-inner">' +
		'		<div class="cs-content-container" style="<% if (textProp("backgroundImage")) { %> background-image: url(<%=backgroundImage%>); <% } %> <%=cmpTernary("repeatImage", false, "background-repeat:no-repeat; background-position:center;", "")%>">' +
		'			<%=textProp("_inner")%>' +
		'		</div>' +
		'	</div>' +
		'	<div class="cs-msg-close-btn"></div>' +
		'</div>';
	containerSelector = containerSelector || "#csBarDisplayerRoot";
	BarDisplayer.prototype = new Displayer();
	BarDisplayer.prototype.constructor = BarDisplayer;
	return new BarDisplayer(containerSelector, template);
});

function Basic(containerSelector, template, defaultSettings) {
	Displayer.call(this, containerSelector, template, defaultSettings);
	var that = this;

	this.show = function show(settings, showImmediately, previewMode) {
		var success = Displayer.prototype.show.call(that, settings, showImmediately, previewMode);
		if (!success) {
			return false;
		}
		jq(that._containerSelector).show();
	};
}

registerDisplayer("basic", function(containerSelector) {
	var template = ''+
		'<%=_inner%>' +
		'';
	containerSelector = containerSelector || "#csBasicRoot";
	Basic.prototype = new Displayer();
	Basic.prototype.constructor = Basic;
	return new Basic(containerSelector, template);
});

function ContentChanger() {
	extend(this, Observer);
	var that = this;

    var variantsSettingsForTracking = {};

	var foundSelectors = [];
	var logged_ERROR_AB_TEST_MULTIPLE_ELEMENTs_MATCHED = false;

    this.init = function() {

	};

    this.registerTrackClicksHandler = function(_activeSettings) {
        var variantId = _activeSettings.id;
        if (!variantsSettingsForTracking[variantId]) {
            variantsSettingsForTracking[variantId] = _activeSettings;
            var handler = trackClicksHandler(variantId);
            document.body.addEventListener('click', function(event) {
                if (event && event.target && event.target.classList && event.target.classList.contains(handler))  {
                    that.trigger('callToActionClick', variantsSettingsForTracking[variantId]);
                }
            });
        }
    };

	this.runsOnCSQuery = function() {
		return true;
	};

	this.kill = function() {
		this.hide();
	};

    function stringEndsWith(str, suffix) {
        return str.indexOf(suffix, str.length - suffix.length) !== -1;
    }


    function trackClicksHandler(variantId) {
        return "cs-ab-track-clicks_" + variantId;
    }

    function wasTrackClicksHandlerAdded(element, handler) {
        var classes = element.attr("class");
        if (classes && classes.length > 0) {
            var classesArray = classes.split(" ");
            classesArray = CSArray.csmap(classesArray, function(clazz) {
                return clazz ? clazz.trim() : clazz;
            });
            return classesArray.indexOf(handler) > -1;
        } else {
            return false;
        }
    }

    function addTrackClicksHandler(element, handler) {
        var classes = element.attr("class") ? element.attr("class") : "";
        classes += " " + handler;
        element.attr("class", classes);
    }

	function applyChange(changeObj, matcher, element) {
		var change = changeObj.change;
		var changeType = changeObj.changeType;
		switch(changeType) {
            case "trackClicks":
                var variantId = that._activeSettings.id;
                var handler = trackClicksHandler(variantId);
                var elementToUpdate = element;
                if (jq.csquery === true) {
                    elementToUpdate = element[0];
                }
                if (!wasTrackClicksHandlerAdded(elementToUpdate, handler)) {
                    addTrackClicksHandler(elementToUpdate, handler);
                }
                break;
            case "css":
				var currentStyle = element.attr("style") || "";
				// make sure to add our style only once
				if (!stringEndsWith(currentStyle, change)) {
					var newStyle = currentStyle;
					if (!stringEndsWith(newStyle, ";")) {
						newStyle += ";";
					}
					newStyle +=  change;
					element.attr("style", change);
				}
				break;
			case "href":
				element.attr("href", change);
				break;
			case "image":
				element.attr("src", change);
				break;
			case "text":
				function replaceTextRecursive(parentSource, parentTarget, depth) {
					var sourceTexts = parentSource.contents().filter(function () {
						return this.nodeType == 3 && /\S/.test(this.nodeValue);
					});
					var targetTexts = parentTarget.contents().filter(function () {
						return this.nodeType == 3 && /\S/.test(this.nodeValue);
					});
					var i;
					for (i = 0; i < sourceTexts.length; i++) {
						try {
							targetTexts[i].textContent = sourceTexts[i].textContent;
						} catch (e) {
							logDebug("tried replacing text but topology doesn't match: \"" + sourceTexts[i].textContent + "\"");
						}
					}
					iterateChildren(parentSource.children(), parentTarget.children(), depth + 1);
				}

				function iterateChildren(childrenSource, childrenTarget, depth) {
					if (childrenTarget.length && childrenTarget.length === childrenSource.length) {
						for (var i = 0; i < childrenSource.length; i++) {
							replaceTextRecursive(jq(childrenSource[i]), jq(childrenTarget[i]), depth);
						}
					}
				}

				var parsedContent = jq(change);

				// traverse nodes and replace content
				// go over all children of both elements
				iterateChildren(parsedContent, element, 0);
				break;
			case "html":
				//this line fixes a bug for multiple changes: after calling replaceWith the element is disconnected from the DOM, so we need to select it again using the matcher
				element = jq(matcher);
				element.replaceWith(change);
				break;
		}
	}

	function applySingleAntiFlickerPreProcess(changeObj, selector, variant) {
		var changeType = changeObj.changeType;
		switch(changeType) {
            case "css":
				var style = document.createElement('style');
				style.type = 'text/css';
				style.className = "cs-vid-" + variant.id;
				var change = selector + " { " + changeObj.change.replace(/;/g,"!important ; ") + " } ";
				if (style.styleSheet){
					style.styleSheet.cssText = change;
				} else {
					style.appendChild(document.createTextNode(change));
				}
				var head = document.head || document.getElementsByTagName('head')[0];
				head.appendChild(style);
				break;
		}
	}

	function compareAllowingProtocolChanges(element, originalContent,matcher) {
		return true;
/* EB: patch till better solution - don't compare elements content for now.
		// ignore whitespace because IE returns different pretty space when serializing an element

		var originalContentTemp = originalContent.replace("https:","http:").replace(/\s/g,"");  // ignore http / https changes to content
		var currentContentTemp = getOuterHTML(element) ;
		currentContentTemp = currentContentTemp.replace("https:","http:").replace(/\s/g,"").substr(0, originalContentTemp.length); // take same length content as original for compare
		if (currentContentTemp !== originalContentTemp) {
			logError("contentChanger: element contents doesn't match (" + matcher + ") original: (" +
				originalContentTemp.substr(0,100) + ((originalContentTemp.length>100 ) ? ("..." +  originalContentTemp.substr(-10)) : "") +
				") current: (" +
				currentContentTemp.substr(0,100) + ((currentContentTemp.length>100 ) ? ("..." +  currentContentTemp.substr(-10)) : "") +
				")", null, ERROR_AB_TEST_ELEMENT_CONTENT_DOESNT_MATCH);
		}
		return currentContentTemp === originalContentTemp ;
*/
	}

	function applyChanges(contentInfo, matcher, element) {
		var originalContent = contentInfo.originalElementContent;
		// don't replace if the content is not what we expect
        var wasShown = false;
		if (contentInfo.migrated || isElement(matcher, "table") || compareAllowingProtocolChanges(element,originalContent,matcher)) {
            for (var i = 0; i < contentInfo.changes.length; i++) {
                if (contentInfo.changes[i].active) {
                    element = jq(matcher);
                    if (contentInfo.migrated) {
                        contentInfo.changes[i].originalContent = getOuterHTML(element);
                    }
                    applyChange(contentInfo.changes[i], matcher, element);
                    wasShown = true;
                }
            }
        }
		return wasShown;
	}

	function applyAntiFlickerPreProcessingToSelector(contentInfo, selector, variant) {
		for (var i = 0; i < contentInfo.changes.length; i++) {
			try {
				if (contentInfo.changes[i].active) {
					applySingleAntiFlickerPreProcess(contentInfo.changes[i], selector, variant);
				}
			} catch (e) {
				// do nothing, just protect so that we continue looping in case just one change failed
			}
		}
	}

	function unApplyChange(changeObj, matcher, element) {
		var changeType = changeObj.changeType;
		var $originalContent = jq(changeObj.originalContent);
		switch(changeType) {
			case "css":
                if ($originalContent.attr("style")) {
                    element.attr("style", $originalContent.attr("style"));
                } else {
					element.removeAttr("style");
                }
				break;
			case "image":
				element.attr("src", $originalContent.attr("src"));
				break;
			case "text":
			case "html":
				//this line fixes a bug for multiple changes: after calling replaceWith the element is disconnected from the DOM, so we need to select it again using the matcher
				element = jq(matcher);
				element.replaceWith(getOuterHTML($originalContent));
				break;
		}
	}

	function unApplyChanges(contentInfo, matcher, element) {
		for (var i=0; i<contentInfo.changes.length; i++) {
			var change = contentInfo.changes[contentInfo.changes.length-1-i];
			if (change.active) {
				unApplyChange(change, matcher, element);
			}
		}
	}

	this.show = function(settings, showImmediately, previewMode) {
		if (navigator.userAgent.indexOf("MSIE 8.0")>-1 ||  navigator.userAgent.indexOf("MSIE 7.0")>-1  || !settings.templateParams) {
			this.trigger("cancelShow", settings);
			return false;
		}
		that._activeSettings = settings;
        this.registerTrackClicksHandler(that._activeSettings);
		this.trigger("beforeDisplay", settings);
		var wasShown = false;
		if (settings.templateParams.hasOwnProperty("selectors")) {
			var selectors = settings.templateParams.selectors;
			for (var selector in selectors ) {
				if (selectors.hasOwnProperty(selector) && foundSelectors.indexOf(selector) === -1) { // don't re-run the changes on the same selector if already found
					var contentInfo = selectors[selector];
					var element = jq(selector);
					if (element.length===1) {
						//foundSelectors.push(selector);
						var _wasShown = applyChanges(contentInfo, selector, element);
						// enough that one was shown to trigger event
						wasShown = wasShown || _wasShown;
					} else if (element.length > 1) {
						if (!this.logged_ERROR_AB_TEST_MULTIPLE_ELEMENTs_MATCHED) {
							logError("contentChanger: selector matched too many (" + element.length + ") elements (" + selector + ")", null, ERROR_AB_TEST_MULTIPLE_ELEMENTs_MATCHED);
							this.logged_ERROR_AB_TEST_MULTIPLE_ELEMENTs_MATCHED = true;
						}
					}
				}
			}
		}
		if (wasShown) {
			that.trigger('show', that._activeSettings);
		}
	};

	this.preprocessCampaignAntiFlicker = function(variant) {
		if (navigator.userAgent.indexOf("MSIE 8.0")>-1 ||  navigator.userAgent.indexOf("MSIE 7.0")>-1  || !variant.templateParams) {
			return ;
		}
		if (variant.templateParams.hasOwnProperty("selectors")) {
			var selectors = variant.templateParams.selectors;
			for (var selector in selectors ) {
				if (selectors.hasOwnProperty(selector)) {
					var contentInfo = selectors[selector];
					applyAntiFlickerPreProcessingToSelector(contentInfo, selector, variant);
				}
			}
		}
	};

	this.hide = function(cb) {
		cb = cb || function(){};
		var settings = that._activeSettings;
		if (settings && settings.templateParams.hasOwnProperty("selectors")) {
			var selectors = settings.templateParams.selectors;
			for (var matcher in selectors ) {
				if (selectors.hasOwnProperty(matcher)) {
					var contentInfo = selectors[matcher];
					var element = jq(matcher);
					if (element.length===1) {
						unApplyChanges(contentInfo, matcher, element);
					}
				}
			}
		}
		this.trigger("hide", that._activeSettings);
		cb();
	};

	this.prepare = function(settings) {

	};

	this.prefetched = function() {
		return false;
	};

	this.clearPrefetched = function() {
	};

	function isElement(selector, tag) {
        var _isElement = selector.split(">");
        return _isElement[_isElement.length-1].toLowerCase().indexOf(tag.toLowerCase()) > -1;
	}

	function getOuterHTML(element) {
		if (element && element.prop) {
			return element.prop("outerHTML");
		} else  if (element.length > 0 && element[0].element && element[0].element.outerHTML) {
			return element[0].element.outerHTML;
		}
		else {
			return "";
		}
	}
}

registerDisplayer("contentChanger", function() {
	return new ContentChanger();
});

function Splitter() {
    extend(this, Observer);
    var that = this;
    this.init = function() {

    };

    this.runsOnCSQuery = function() {
        return true;
    };

    this.kill = function() {
        this.hide();
    };

    this.show = function(settings, showImmediately, previewMode) {
        if (navigator.userAgent.indexOf("MSIE 8.0")>-1 ||  navigator.userAgent.indexOf("MSIE 7.0")>-1  || !settings.templateParams) {
            this.trigger("cancelShow", settings);
            return false;
        }
        that._activeSettings = settings;
        this.trigger("beforeDisplay", settings);
        var wasShown = false;
        if (settings.templateParams.hasOwnProperty("alternativeUrl") && settings.templateParams.alternativeUrl) {
            var targetUrl = settings.templateParams.alternativeUrl;
            if (targetUrl && (targetUrl.indexOf("http:") === 0 || targetUrl.indexOf("https:") === 0)) {
                var variantId = settings.id;
                setCookie("_cs."+siteId+".splitter.navigated", variantId);
                window.location.href = targetUrl;
                wasShown = true;
            }
        }
        if (wasShown) {
            that.trigger('show', that._activeSettings);
        }
    };

    this.hide = function(cb) {
        cb = cb || function(){};
        var settings = that._activeSettings;

        this.trigger("hide", that._activeSettings);
        cb();
    };

    this.prepare = function(settings) {

    };

    this.prefetched = function() {
        return false;
    };

    this.clearPrefetched = function() {
    };
}

registerDisplayer("splitter", function() {
    return new Splitter();
});

registerDisplayer("contentChangerControl", function(containerSelector) {

    function ContentChangerControl(containerSelector, template, defaultSettings) {

        Displayer.call(this, containerSelector, template, defaultSettings);

        extend(this, Observer);
        var that = this;

        var variantsSettingsForTracking = {};

        this.init = function() {

        };

        this.registerTrackClicksHandler = function(_activeSettings) {
            var variantId = _activeSettings.id;
            if (!variantsSettingsForTracking[variantId]) {
                variantsSettingsForTracking[variantId] = _activeSettings;
                var handler = trackClicksHandler(variantId);
                document.body.addEventListener('click', function(event) {
                    if (event && event.target && event.target.classList && event.target.classList.contains(handler))  {
                        that.trigger('callToActionClick', variantsSettingsForTracking[variantId]);
                    }
                });
            }
        };

        this.runsOnCSQuery = function() {
            return true;
        };

        function trackClicksHandler(variantId) {
            return "cs-ab-track-clicks-control_" + variantId;
        }

        function wasTrackClicksHandlerAdded(element, handler) {
            var classes = element.attr("class");
            if (classes && classes.length > 0) {
                var classesArray = classes.split(" ");
                classesArray = CSArray.csmap(classesArray, function(clazz) {
                    return clazz ? clazz.trim() : clazz;
                });
                return classesArray.indexOf(handler) > -1;
            } else {
                return false;
            }
        }

        function addTrackClicksHandler(element, handler) {
            var classes = element.attr("class") ? element.attr("class") : "";
            classes += " " + handler;
            element.attr("class", classes);
        }

        function applyChange(changeObj, matcher, element) {
            var changeType = changeObj.changeType;
            switch(changeType) {
                case "trackClicks":
                    var variantId = that._activeSettings.id;
                    var handler = trackClicksHandler(variantId);
                    var elementToUpdate = element;
                    if (jq.csquery === true) {
                        elementToUpdate = element[0];
                    }
                    if (!wasTrackClicksHandlerAdded(elementToUpdate, handler)) {
                        addTrackClicksHandler(elementToUpdate, handler);
                    }
                    break;
            }
        }

        function applyChanges(contentInfo, matcher, element) {
            var originalContent = contentInfo.originalElementContent;
            // don't replace if the content is not what we expect
            var wasShown = false;
            if (contentInfo.migrated || isElement(matcher, "table") || compareAllowingProtocolChanges(element,originalContent)) {
                for (var i = 0; i < contentInfo.changes.length; i++) {
                    if (contentInfo.changes[i].active) {
                        element = jq(matcher);
                        if (contentInfo.migrated) {
                            contentInfo.changes[i].originalContent = element.prop("outerHTML");
                        }
                        applyChange(contentInfo.changes[i], matcher, element);
                        wasShown = true;
                    }
                }
            }
            return wasShown;
        }

        this.show = function(settings, showImmediately, previewMode) {
            var that = this;
			settings = this._sanitizeParams(settings);
            setTimeout(function() {
				var delayTime = 0;
				if (!showImmediately) {
					if (settings.templateParams) {
						if (settings.templateParams.showDelay) {
							delayTime += settings.templateParams.showDelay;
						}
						if (settings.templateParams.transition_inTime) {
							delayTime += settings.templateParams.transition_inTime;
						}
					}
				}
				setTimeout(function() {
					that.trigger("beforeDisplay", settings);
				}, delayTime);
            }, 0);
            this.showContentChanger(settings, showImmediately, previewMode);
			return true;
        };

        this.showContentChanger = function(settings, showImmediately, previewMode) {
            if (navigator.userAgent.indexOf("MSIE 8.0")>-1 ||  navigator.userAgent.indexOf("MSIE 7.0")>-1  || !settings.templateParams) {
                this.trigger("cancelShow", settings);
                return false;
            }
            that._activeSettings = settings;
            this.registerTrackClicksHandler(that._activeSettings);
            var wasShown = false;
            if (settings.templateParams.hasOwnProperty("selectors")) {
                var selectors = settings.templateParams.selectors;
                for (var matcher in selectors ) {
                    if (selectors.hasOwnProperty(matcher)) {
                        var contentInfo = selectors[matcher];
                        var element = jq(matcher);
                        if (element.length===1) {
                            var _wasShown = applyChanges(contentInfo, matcher, element);
                            // enough that one was shown to trigger event
                            wasShown = wasShown || _wasShown;
                        }
                    }
                }
            }
        };

        function isElement(selector, tag) {
            var _isElement = selector.split(">");
            return _isElement[_isElement.length-1].toLowerCase().indexOf(tag.toLowerCase()) > -1;
        }

        function compareAllowingProtocolChanges(element, originalContent) {
            if (originalContent) {
                var originalContentTemp = originalContent.replace("https:","http:");  // ignore http / https changes to content
                var currentContentTemp = element.prop("outerHTML") ;
                currentContentTemp = currentContentTemp.replace("https:","http:").substr(0, originalContentTemp.length); // take same length content as original for compare
                return currentContentTemp.replace(/\s/g,"") === originalContentTemp.replace(/\s/g,"") ;  // ignore whitespace because IE returns different preetty spance when serializing an element
            }
            return true;
        }
    }

    ContentChangerControl.prototype = new Displayer();
    ContentChangerControl.prototype.constructor = ContentChangerControl;
    return new ContentChangerControl(containerSelector);
});

var funcsToRunAfterBootstrap_;
var funcsToRunBeforeBootstrap_;

function waitForJQuerySpecificVersion(){
	var jQueryVersion = null;
	if (typeof(jQuery) === 'function' && jQuery()) {
		jQueryVersion = jQuery.fn.jquery;
	}
	if(jQueryVersion && compareVersionNumbers(jQueryVersion, "1.11.1") >= 0){
		loadToolbar(false);
	}
	else{
		setTimeout(waitForJQuerySpecificVersion,100);
	}
}

function loadPrerequisitesAndWait() {
	window.__csGlobal__ = window.__csGlobal__ || {};
	if (window.__csGlobal__.loaded) {
		// We're trying to load ourselves twice for some reason. Let's not.
		return;
	}

	if (isBarVisible()) {
		loadjscssfile(TBBaseURL + getCSSFilePath(), 'css');
	}


	var jQueryVersion = null;
	if (typeof(jQuery) === 'function' && jQuery()) {
		jQueryVersion = jQuery.fn.jquery;
	}

	var minJqueryVersion = "1.7";
	var maxJqueryVersion = "1.11.1";

	// Load jQuery either if no jQuery exists, or it's too old
	var forceLoadJquery = !jQueryVersion || forceLoadOurOwnJquery ||
		compareVersionNumbers(jQueryVersion, minJqueryVersion) < 0 ||  // older than 1.7
		compareVersionNumbers(jQueryVersion, maxJqueryVersion) > 0; // newer than 1.11.1


	if (forceLoadJquery) {
		jq = csquery;
		if(!shouldWaitForJQuerySpecificVersion){
			var jQueryPath = getCorrectUrlProtocol(jQueryURL);
			add_script(jQueryPath, function () {
				loadToolbar(true);
			});
		}
		else{
			waitForJQuerySpecificVersion();
		}
		preloadToolbar();
	} else {
		jq = jQuery;
		preloadToolbar();
		loadToolbar(false);
	}

	window.__csGlobal__.loaded = true;
		window.__csGlobal__.jqloaded = forceLoadJquery;

}

// Is the current User Agent so bad we don't dare load anything?
function browserIsTotallyBanned() {
	if (!canUseCookies()) {
		return true; // no reason to load the bar or report analytics if the browser doesn't support cookies (we'll have terrible experience!)
	}
	if (!crossDomainStorageSupported()) {
		return true; // if browser doesn't support localStorage and postMessage and JSON - don't allow running
	}
	// test for <=ie7
	// Adapted from http://stackoverflow.com/a/6104133/1130804
	if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) {
		var ieVersion = Number(RegExp.$1);
		if (ieVersion<=7) {
			return true;
		}
	}
	// support external check
	if (typeof(externalIsBrowserT3otallyBanned) === typeof(Function)) {
		try {
			if (externalIsBrowserTotallyBanned()) {
				return true;
			}
		} catch (ex) {
			logError("Unable to call external validation to determine if to block by browser ("+navigor.userAgent+")", ex);
		}
	}

	return findStringInSubStringArray(navigator.userAgent, totallyBlackListedBrowseres) != -1;
}

var isCookiesSupported = null;
function canUseCookies() {
	if (isCookiesSupported !== null) {
		return isCookiesSupported; // return the cached version.
	}

	try {
		// http://stackoverflow.com/questions/4603289/how-to-detect-that-javascript-and-or-cookies-are-disabled
		var cookieEnabled = navigator.cookieEnabled;
		if (typeof navigator.cookieEnabled=="undefined" && !cookieEnabled) {
			document.cookie="testcookie";
			cookieEnabled = (document.cookie.indexOf("testcookie")!=-1);
		}
		if (!cookieEnabled) {
			Tracker.reportNoCookiesSupport();
		}

		isCookiesSupported = cookieEnabled;
		return cookieEnabled;
	} catch (e) {
		isCookiesSupported = true;
		return true; // prefer as default
	}
}

function crossDomainStorageSupported() {
		try{
			return window.postMessage && window.JSON && window.localStorage !== null;
		} catch(e){
			return false;
		}
}

function isCurrentUrlInExpectedFormat() {
	if (!expectedUrlFormat) {
		return true;
	}

	// should(?) replace with regex check
	return window.location.href.indexOf(expectedUrlFormat) > -1;

}

function getDefaultShouldShowToolbarForUser() {
	if (checkToolbarCookie()) {
		return true;
	}

	if (hasUrlParam(forceHiddenFlag)) {
		// double check here for the 'force hidden' flag
		return false;
	}

	var blacklist = false;
	// Check for ie6 (http://stackoverflow.com/questions/2196470/what-is-the-best-way-to-detect-internet-explorer-6-using-javascript)
	if (/\bMSIE 6/.test(navigator.userAgent) && !window.opera) {
		blacklist = true;
	}
	var shouldFilterOut = false;
	/* check BL / WL browsers */
	if (blacklist===true || isBlacklistedBrowser()) {
        return false;
    }
    if (!isSupportedBrowser()) {
		shouldFilterOut = true;
	}
    var mobileFlags = detectMobile();
    // if this is one of the webviewers we support - do not filter out
    if (shouldFilterOut && mobileFlags.isMobile && mobileFlags.isMobileInWhiteList) {
        if (isStringInRegexArray(navigator.userAgent, webViewerBrowsersWhiteListRegex) ) {
            shouldFilterOut = false;
        }
    }

    if (shouldFilterOut) {
        return false;
    }

    applyMobileFlags(mobileFlags);
    if (isMobile) {
		showCouponAlert();
	}

	return defaultShowToolbar;
}

function applyMobileFlags(mobileFlags) {
    if (mobileFlags.isMobile) {
        isMobile = mobileFlags.isMobile;
    }
    if (mobileFlags.isMobileInWhiteList) {
        isMobileInWhiteList = mobileFlags.isMobileInWhiteList;
    }
    if (mobileFlags.isTablet) {
        isTablet = mobileFlags.isTablet;
    }
}

function isBlacklistedBrowser() {
	return (findStringInSubStringArray(navigator.userAgent, blacklistedBrowsers) != -1);
}
function isSupportedBrowser() {
	// detect ie11
	if (findStringInSubStringArray("IE11", supportedBrowsers) >= 0) {
		if (navigator.appName==='Netscape' && navigator.userAgent.toLowerCase().indexOf("trident")!==-1) {
			return true;
		}
	}
	 if (isStringInRegexArray(navigator.userAgent, tabletBrowsersWhiteListRegex) ) {
		 return true;
	 }
	// detect everything else
	return (findStringInSubStringArray(navigator.userAgent, supportedBrowsers) != -1);
}

function detectMobile() {
    var mobileFlags = {isMobile:false, isMobileInWhiteList:false, isTablet:false};

	if (isStringInRegexArray(navigator.userAgent, tabletBrowsersWhiteListRegex) ) { // treat tablet like desktop
        mobileFlags.isMobile = false ;
        mobileFlags.isTablet = true ;
		return mobileFlags;
	}
	if (findStringInSubStringArray(navigator.userAgent, mobileBrowsers)!==-1) {
        mobileFlags.isMobile = true;
        if (findStringInSubStringArray(navigator.userAgent, whiteListMobileBrowsers)!==-1 ||
			isStringInRegexArray(navigator.userAgent, mobileBrowsersWhiteListRegex) ) {
            mobileFlags.isMobileInWhiteList = true;
            // on real site we want to support only iPhone Safari right now
            if (findStringInSubStringArray(navigator.userAgent, notSupportedMobileUseAgents)!==-1) {
                mobileFlags.isMobileInWhiteList = false;
            }
        }
	}
    return mobileFlags;
}

function showCouponAlert() {
	if (couponCodesMap) {
		for (var param in couponCodesMap) {
			if (couponCodesMap.hasOwnProperty(param) && hasUrlParam(param)) {
				alert("Welcome! Your coupon code is "+couponCodesMap[param]);
				return;
			}
		}
	}
}

function setZIndex() {
	var maxZIndex = findHighestZIndex("div:visible", "#"+rootContainerId+" *");
	if (maxZIndex.zIndex > 0) { // check there's an actual z-index set on a visible element of the page, and set bar in front of it.
		jq("#tb-tooltip").css("z-index", 99999999999989);
	}
	if (barstate != "init") {
		return;
	}
	setCookie(ckie_toolbar_state, "shown-default");
	barstate = "shown-default";
}

var observer = {};
var expAPI = {};

function getResidentValue() {
	return getCookie(ckie_resident_state);
}
function isResidentActive() {
	return getResidentState()===RESIDENT_ACTIVE;
}
// Called by experiment code
function setAsResident() {
	setResidentValue({minimized: false, state: RESIDENT_START}, false);
}

// Called by experiment code
function setAsMinimizedResident() {
	setResidentValue({minimized: true, state: RESIDENT_START}, false);
}

function setResidentValue(value, overwrite) {
	overwrite = typeof(overwrite)==="undefined" ? true : overwrite;
	if (overwrite || !getResidentValue()) {
		setCookie(ckie_resident_state, value, persistentCookieDuration);
	}
}

function setResidentState(state) {
	var residentValue = getResidentValue();
	if (residentValue && residentValue.state!==state) {
		residentValue.state = state;
		setCookie(ckie_resident_state, residentValue, persistentCookieDuration);
	}
}

function getResidentState() {
	var residentValue = getResidentValue();
	var state = "";
	if (residentValue) {
		state = residentValue.state;
	}
	return state;
}

function endResident() {
	setResidentState(RESIDENT_DONE);
}

function hideResident() {
	setResidentState(RESIDENT_HIDDEN);
}

function showResident() {
	if (getResidentState()===RESIDENT_HIDDEN) {
		setResidentState(RESIDENT_ACTIVE);
	}
}

function minimizeResident() {
	var residentValue = getResidentValue();
	if (residentValue && residentValue.state===RESIDENT_ACTIVE) {
		residentValue.minimized = true;
		setResidentValue(residentValue);
	}
}

function isBarVisible() {
	return globalShowToolbar;
}

function registerRulesEvaluator(trigger) {
	rulesEvaluators.push(trigger);
}

function registerDisplayer(name, initMethod) {
    if (name !== "canvasLightbox") {
        displayerConstructors.push({name:name, initMethod: initMethod});
    }
}

function initDisplayers() {
    var initDisplayer = function(displayerObj) {
		var displayer = displayerObj.initMethod();
		displayers[displayerObj.name] = displayer;
		// Listen to 'next message' rerouting requests
		// (e.g if lightbox has a next message that is displayed by bubbler, lightbox will send an event that will be
		// rerouted to bubbler from here)
		var nextMessageCB = function(settings) {
			if (settings.displayer && displayers[settings.displayer]) {
				displayers[settings.displayer].show(settings);
			}
		};
		displayer.on('nextMessage', nextMessageCB);
		displayer.on('prepareNextMessage', function(settings) {
			if (settings.displayer && displayers[settings.displayer]) {
				displayers[settings.displayer].prepare(settings);
			}
		});
		exportFunc(displayer, name);
	};
	while (displayerConstructors.length) {
		initDisplayer(displayerConstructors.pop());
	}
}

function initDisplayerContainers() {
	for (var k in displayers) {
		displayers[k].init();
	}
    InjectorsRepository.injectRoots();
}


function preloadToolbar() {
	observer = extend({}, Observer);
	if (!isRunningInIFrame()) {
		//todo: will need to support scenario where the storage will be on the root domain somehow. -- orene 29/7/2014
		contextStorage = new CDStorage(homepageUrl.replace("http://", "https://"), "");
		contextStorage.init();

		if (debugMode) {
			exportFunc(function() { return contextStorage; }, "getContextStorage");
		}
	} else {
		contextStorage = new CDStorage("", "");
	}
	initDisplayers();
	DisplayerController.setupCampaigns(behaviorsConfiguration);
	DisplayerController.preprocessAntiFlicker();
	executeAsSoonAsBodyExists(function() {
		DisplayerController.executeImmediateBehaviors();
	});
}
/**
 * Load the toolbar, render it (if needed) and report relevant analytics.
 * @param weLoadedJQuery - are we using the built-in jQuery, or did we load it ourselves?
 */
function loadToolbar(weLoadedJQuery) {
	jQueryGlobal = jQueryGlobal || "jQuery";
	try {
		if (!jq || typeof(jq.csquery)!=="undefined" && jq.csquery) {
			if (shouldUseNoConflict) {
				jq = weLoadedJQuery===true ? window[jQueryGlobal].noConflict(true) : window[jQueryGlobal];
			} else {
				jq = jQuery;
			}
		}
		window.__csGlobal__.jqvr = jq.fn.jquery;
		if (debugMode) {
			exportFunc(jq, "jqins");
		}




		// test jQuery version again. If it's not the version we expect, notify us
		if (compareVersionNumbers(jq.fn.jquery, "1.7") < 0 ||
			compareVersionNumbers(jq.fn.jquery, "1.11.1") > 0) {
			logError("LoadToolbar: Bad jQuery version detected. " + jq.fn.jquery);
		}


		UserContext.init();
        Tracker.init(function()  {
			// Execute listeners pre-bootstrap of bar
			executeListeners(funcsToRunBeforeBootstrap_, "pre-bootstrap");

			setupEventsHandler();
				DisplayerController.clearTogglingDisplayerIfNeeded(behaviorsConfiguration);
				for (var i=0; i<behaviorsConfiguration.length; i++) {
					DisplayerController.setupCampaign(behaviorsConfiguration[i]);
				}

			initBarAndRender();

		if (editor) {
			editor.initEditingListeners();
		}
            if (canvasEditor) {
                canvasEditor.initEditingListeners();
                CanvasCssHooks.setJqueryCssHooks();
            }

				// Init geo api only if required by config
				if (geoRequired) {
					initGeo();
				} else if (initializeGeoAsync) {
					// if geo was not required, still initialize it (asynchronously)
					// since we want to report the geo data
					setTimeout(function() {
						initGeo();
					}, 0);
				}

				// Load website's experiments file and register it to the bar's events

			// -- The following calls need document.ready to avoid possible race conditions (scraping needs html to exist) -- //
			//    NOTICE: on sites with very slow document.ready, we may lose some tracking events (checkout etc.). We saw it happen on bestofferbuy before (09/2012 orene)

			// Run post-bootstrap methods that registered to run after everything is loaded.
			runOnDocumentReady("post-bootstrap-listeners", function () {
				executeListeners(funcsToRunAfterBootstrap_, "post-bootstrap");


				// Expose a few internal functions & Run external registered callbacks
				if (window.__csGlobal__ && window.__csGlobal__.externalFuncsToRunAfterBootstrap) {
					executeListeners(window.__csGlobal__.externalFuncsToRunAfterBootstrap, "external-func-post-bootstrap");
				}
				window.__csIsLoaded__ = true;
			});
		});
	}
	catch (allerr) {
		logError("Error loading the bar: " + allerr.name + ", details: " + allerr.message, allerr);
	}
}

function setupEventsHandler() {
	Observer.on("contextChange", function(contextProvider) {
		DisplayerController.evaluateRules(contextProvider);
	});
}

function initInspector(campaignId) {
	if (typeof Inspector !== 'undefined') {
		Inspector.init(campaignId);
	}
}

// Goal: load and render the bar as fast as possible (avoid waiting for document.ready, if it's an option)
// Assumption: there is no scraping logic here, the code here doesn't depend on the content(html) of the body.
function initBarAndRender() {
	executeOptimisticallyByPageState("init-bar-on-doc-ready",
		function initBarOnDocReady() {
			TBar = 'loaded';
			if (isBarVisible()) {
				var $holiRoot = jq('<div id="'+rootContainerId+'" class="cs-root"/>');
				$holiRoot.appendTo(jq('body'));
				jq.each(postWriteToolbarEvents, function (index, event) {
					event();
				});
				initDisplayerContainers();
				initInspector(inspectedCampaign);
				setZIndex();
				StyledTTips.initTbTooltips(jq, { tip_follows_cursor: "off", tip_delay_time: 350, fix_to_element: "on" }); // can pick from off/on, was set to 350ms
				observer.trigger('barRendered');
			}
		}
	);
}

var runAfterCurrentScriptQueue = [];
function executeRunAfterCurrentScriptQueue() {
	var i;
	for (i = 0; i < runAfterCurrentScriptQueue.length; ++i) {
		var func = runAfterCurrentScriptQueue[i];
		func();
	}
	runAfterCurrentScriptQueue = [];
}

function runOnDocumentReady(context, func) {
	var wrappedFunc = function () {
		try {
			func();
		}
		catch (e) {
			logError("Error running " + context + ", on document.ready. Error name: " + e.name+", details: "+e.message, e);
		}
	};

	// isReady is undocumented, but exists in all jQuery versions
	// http://stackoverflow.com/a/6333617/11236
	// If it doesn't exist - no harm done, we'll just use jq.ready()
	if (jq.isReady) {
		// DOM Ready event was triggered already.
		// jQuery has a known bug (WONTFIX) where is one jQuery ready handler throws an exception,
		// this stops other jQuery ready handlers from executing.
		// http://bugs.jquery.com/ticket/10251
		//
		// So, to work around this, if ready() was already called, we'll launch the callback ourselves.
		// We use setTimeout(..., 0) to make func() run immediately after this code and not immediately
		// (just in case - it's more similar to the original behavior of jq.ready())
		//
		// We use a queue to ensure that the funcs are executed in order
		runAfterCurrentScriptQueue.push(wrappedFunc);
		setTimeout(executeRunAfterCurrentScriptQueue, 0);
	} else {
		// DOM Ready wasn't triggered yet, let's just call jq(document).ready()
		csquery(wrappedFunc);
	}

}

function executeAsSoonAsBodyExists(func) {
	var bodyState = "body already existed";
	var errorReported = false;

	var runIfBodyExists = function(func) {
		if (jq('body') !== null && jq('body').length === 1) {
			try {
				func();
				return true;
			}
			catch (e) {
				if (!errorReported) {
					logError("Error in executeAsSoonAsBodyExists(func) - state is: " + bodyState + ", error: " + e.name + ": " + e.message, e);
					errorReported = true;
				}
			}
		}
		return false;
	};

	if (!runIfBodyExists(func)) {
		// No success, try for 5sec every 50ms, then wait for onload.
		bodyState = "waited for body to exist";
		var count = 0 ;
		var t = setInterval(
			function() {
				if (count++ < 100) {
					if (runIfBodyExists(func)) {
						clearInterval(t);
					}
				} else {
					// timed out
					clearInterval(t);
					logError("Error in executeAsSoonAsBodyExists(func) - timeout exceeded, body not found. Defaulting to onload event");
					csquery(func);
				}
			}, 50);

	}
}

// Decide when to run the given function (document ready or now).
// if document's body is available - run the given function now.
// otherwise - will run the given function on document ready.
// (context: This was made as performance enhancement, making the bar visible as soon as possible.)
function executeOptimisticallyByPageState(context, func) {
	var isBodyAvailable = jq('body') !== null && jq('body').length === 1;

	if (isBodyAvailable && !forceBootstrapBarOnDocumentReady) {
		try {
			func();
		}
		catch (e) {
			logError("Error " + context + " (not waiting for document.ready): " + e.name+", details:"+e.message, e);
		}
	} else {
		runOnDocumentReady(context, func);
	}
}

function executeListeners(listeners, stage) {
	if (listeners) {
		listeners.executedAlready = true; // mark list as executed already
		jq(listeners).each(function () {
			try {
				this();
			} catch (e) {
				logError("Error running function (stage " + stage + "): " + e.name+", details: "+e.message, e);
			}
		});
	}
}

function addFunctionToList(func, list) {
	if (!list.executedAlready) {
		list.push(func);
	} else {
		// we already executed, just call the function already, async
		setTimeout(function () {
			try {
				func();
			} catch (e) {
				logError("Error running function: " + e.name+", details: "+e.message, e);
			}
		},0);
	}
}
// Adds func to a list of functions to be run after successful bootstrap
function runAfterBootstrap(func) {
	funcsToRunAfterBootstrap_ = funcsToRunAfterBootstrap_ || [];
	addFunctionToList(func, funcsToRunAfterBootstrap_);
}
if (devMode) {
	exportFunc(runAfterBootstrap, "runAfterBootstrap");
}

// Adds func to a list of functions to be run after successful bootstrap
function runBeforeBootstrap(func) {
	funcsToRunBeforeBootstrap_ = funcsToRunBeforeBootstrap_ || [];
	addFunctionToList(func, funcsToRunBeforeBootstrap_);
}

function isBlacklistedUrl() {
	var i;
	for (i = 0; i < blacklistedUrls.length; ++i) {
		if (document.location.href.indexOf(blacklistedUrls[i]) != -1) {
			return true;
		}
	}
	for (i = 0; i < blacklistedUrlsInBrowsers.length; ++i) {
		var rule = blacklistedUrlsInBrowsers[i];
		if (document.location.href.indexOf(rule.url) != -1 && findStringInSubStringArray(navigator.userAgent, rule.browsers) != -1) {
			return true;
		}
	}

	if (!isCurrentUrlInExpectedFormat()) {
		Tracker.reportInvalidUrlDetected();
		return true;
	}

	// all is good
	return false;
}

/////////////////////////////////////////
// The actual run trigger //
/////////////////////////////////////////

// Check if we want to skip executing this version entirely, and load the preview version instead
var loadPreviewVersion = false;
if (!allJsUrl) {
	logError("allJsUrl is not defined!");
}
var alreadyAfterRedirect = allJsUrl.indexOf("/l/") === -1; // not the real /l/ tag

// Make sure to all show preview/specific versions
if (alreadyAfterRedirect) {
	window.__csGlobal__ = window.__csGlobal__ || {};
	window.__csGlobal__.tvis = true;
	defaultShowToolbar = true;
}

// sessionStorage not supported in IE6/7 (http://stackoverflow.com/questions/7192405/most-elegant-way-to-check-sessionstorage-support)
if (typeof(sessionStorage) === 'undefined') {
	sessionStorage = {
		getItem: function() { return null; },
		setItem: function() { }
	};
}

if (urlParams.csmode === 'prod') {
	sessionStorage.removeItem(session_storage_ssnips_preview_ver);
} else {
	var needToLoadPreviewVersion = urlParams.csmode === 'preview' ||
		urlParams.csver ||
		sessionStorage.getItem(session_storage_ssnips_preview_ver) ||
		sessionStorage.getItem(session_storage_ssnips_preview_mode);

	if (needToLoadPreviewVersion && !alreadyAfterRedirect) { // prevent the preview version itself from redirecting again
		// Put us in preview mode for the rest of the session
		sessionStorage.setItem(session_storage_ssnips_preview_mode, false);

		// csver should be 'p' or positive number (any other value is considered unsafe thus we will reset it)
		var csver = urlParams.csver;
		csver = (csver && csver !== "p" && !isPositiveInteger(csver)) ? null : csver; // avoid tempering with it

		if (csver) {
			// Given specific override, so write it in cookie
			sessionStorage.setItem(session_storage_ssnips_preview_ver, urlParams.csver);
		} else {
			// Try to find a version in the cookie
			csver = sessionStorage.getItem(session_storage_ssnips_preview_ver);
			csver = (csver && csver !== "p" && !isPositiveInteger(csver)) ? null : csver; // avoid tempering with it
		}

		// Load the preview script version instead of the current javascript
		var previewVerLocation;
		if (csver && csver !== 'p') {
			// This is the usual way preview versions are loaded
			previewVerLocation = allJsUrl.replace("/l/", "/ver/" + csver + "/");
		} else {
			// Never actually used in production/preview
			setCookie(session_storage_ssnips_preview_ver, "p");
			previewVerLocation = allJsUrl.replace("/l/", "/p/");
		}
		previewVerLocation = previewVerLocation.replace("csmode=preview", "");
		previewVerLocation = previewVerLocation.replace("app.cdn-cs.com", "p.app.cdn-cs.com");

		var script = document.createElement('script');
		script.type = "text/javascript";
		script.src = previewVerLocation;
		document.getElementsByTagName('head')[0].appendChild(script);
		loadPreviewVersion = true;
	}
}


function persistCustomCsModeState(name, value) {
	try {
		sessionStorage.setItem(name, value);
	} catch (e){
		// protect iphone against no session storage in private mode
	}
	if (persistentCsMode) {
		setCookie(name, value, persistentCookieDuration);
	}
}
function getCustomCsModeState(name) {
	var val = null ;
	try {
		val = sessionStorage.getItem(name);
	} catch (e){
		// protect iphone against no session storage in private mode
	}
	if (!persistentCsMode) {
		return val;
	}
	// load it from the cookie if needed
	return (val !== null) ? val : getCookie(name);
}


function handleCustomCsMode() {
	// init the current running state according to persisted set flags
	analyzeMode = getCustomCsModeState("csAnalyzeMode") === "true";
	inspectMode = getCustomCsModeState("csInspectMode") === "true" && !isRunningInIFrame()  ; // don't inspect in dashboard
	inspectedCampaign = getCustomCsModeState("csInspectedCampaign");

	// get url switches to write modes in session storage
	var switchStart = window.location.href.indexOf("csmode=");
	if (switchStart!==-1) {
		var switchesStr = window.location.href.substring(switchStart);
		if (switchesStr.indexOf("&")!==-1) {
			switchesStr = switchesStr.substring(0, switchesStr.indexOf("&"));
		}
		switchesStr = switchesStr.substring(switchesStr.indexOf("=")+1);
		var switches = switchesStr.split(",");
		for (var i=0; i<switches.length; i++) {
			var modeSwitch = switches[i];
			// allow to hide/show the bar (for testing purpose)
			if (modeSwitch==="visible") {
				persistCustomCsModeState("csHiddenMode", "visible");

			} else if (modeSwitch==="hidden") {
				persistCustomCsModeState("csHiddenMode", "true");
			}

			if (modeSwitch==="noinspect") {
				persistCustomCsModeState("csInspectMode", "false");
				inspectMode = false;
				inspectedCampaign="";
				persistCustomCsModeState("csInspectedCampaign", inspectedCampaign);
			} else if (modeSwitch.indexOf("inspect") === 0 ) {  // inspect uses analyze
				persistCustomCsModeState("csInspectMode", "true");
				inspectMode = true;
				var mSw = modeSwitch.split(":"); // extract campaign id e.g. ?csmode=inspect:abc123
				if (mSw.length > 1) {
					inspectedCampaign = mSw[1];
					persistCustomCsModeState("csInspectedCampaign", inspectedCampaign);
				}
			}

			// allow to set the bar to analyze mode, where events will be printed nicely to the console.log as well.
			if (modeSwitch==="noanalyze") {
				persistCustomCsModeState("csAnalyzeMode", "false");
				analyzeMode = false;
			} else if (modeSwitch==="analyze") {
				persistCustomCsModeState("csAnalyzeMode", "true");
				analyzeMode = true;
			}

			// editor mode for content changer editing
			if (modeSwitch==="editor") {
				devMode = true;
				editor = new Editor();
			}

            // editor mode for canvas editing
            if (modeSwitch==="canvas") {
                devMode = true;
                canvasEditor = new CanvasEditor();
            }
			if (modeSwitch==="inspect") {
				devMode = true;
				inspectMode = true;
			}
			if (modeSwitch==="nocontrol") {
				window.__csGlobal__.disableControlVariant = true;
			}
		}
	}

	debugMode = analyzeMode || inspectMode;  // turn on extrea debug if either is active
	if (debugMode) {
		// restore window.console so it will work for websites which overwrite console.log (e.g. http://www.kinderwagen.com/)
		try {
			var myi = document.createElement('iframe');
			myi.style.display = 'none';
			document.body.appendChild(myi);
			window.console = myi.contentWindow.console;
		} catch (e) {
			// not interesting
		}
	}
}


if (getCustomCsModeState("csHiddenMode")==="true") {
	globalShowToolbar = false;
}
if (getCustomCsModeState("csHiddenMode")==="visible") {
	globalShowToolbar = true;
}

exportFunc(function() { return devMode; }, "isDevMode");
/* jshint ignore:start */
// Defer library (D)
/* (c) Jonathan Gotti - licence: https://github.com/malko/d.js/LICENCE.txt @version 0.7.0*/
!function(a){"use strict";function b(a){l(function(){throw a})}function c(b){return this.then(b,a)}function d(b){return this.then(a,b)}function e(b,c){return this.then(function(a){return m(b)?b.apply(null,n(a)?a:[a]):v.onlyFuncs?a:b},c||a)}function f(a){function b(){a()}return this.then(b,b),this}function g(a){return this.then(function(b){return m(a)?a.apply(null,n(b)?b.splice(0,0,void 0)&&b:[void 0,b]):v.onlyFuncs?b:a},function(b){return a(b)})}function h(c){return this.then(a,c?function(a){throw c(a),a}:b)}function i(a,b){var c=q(a);if(1===c.length&&n(c[0])){if(!c[0].length)return v.fulfilled([]);c=c[0]}var d=[],e=v(),f=c.length;if(f)for(var g=function(a){c[a]=v.promisify(c[a]),c[a].then(function(g){d[a]=b?c[a]:g,--f||e.resolve(d)},function(g){b?(d[a]=c[a],--f||e.resolve(d)):e.reject(g)})},h=0,i=f;i>h;h++)g(h);else e.resolve(d);return e.promise}function j(a,b){return a.then(m(b)?b:function(){return b})}function k(a){var b=q(a);1===b.length&&n(b[0])&&(b=b[0]);for(var c=v(),d=0,e=b.length,f=v.resolved();e>d;d++)f=j(f,b[d]);return c.resolve(f),c.promise}var l,m=function(a){return"function"==typeof a},n=function(a){return Array.isArray?Array.isArray(a):a instanceof Array},o=function(a){return!(!a||!(typeof a).match(/function|object/))},p=function(b){return b===!1||b===a||null===b},q=function(a,b){return[].slice.call(a,b)},r="undefined",s=typeof TypeError===r?Error:TypeError;if(typeof process!==r&&process.nextTick)l=process.nextTick;else if(typeof MessageChannel!==r){var t=new MessageChannel,u=[];t.port1.onmessage=function(){u.length&&u.shift()()},l=function(a){u.push(a),t.port2.postMessage(0)}}else l=function(a){setTimeout(a,0)};var v=function(b){function i(){if(0!==r){var a,b=t,c=0,d=b.length,e=~r?0:1;for(t=[];d>c;c++)(a=b[c][e])&&a(n)}}function j(a){function b(a){return function(b){return c?void 0:(c=!0,a(b))}}var c=!1;if(r)return this;try{var d=o(a)&&a.then;if(m(d)){if(a===u)throw new s("Promise can't resolve itself");return d.call(a,b(j),b(k)),this}}catch(e){return b(k)(e),this}return q(function(){n=a,r=1,i()}),this}function k(a){return r||q(function(){try{throw a}catch(b){n=b}r=-1,i()}),this}var n,q=(a!==b?b:v.alwaysAsync)?l:function(a){a()},r=0,t=[],u={then:function(a,b){var c=v();return t.push([function(b){try{p(a)?c.resolve(b):c.resolve(m(a)?a(b):v.onlyFuncs?b:a)}catch(d){c.reject(d)}},function(a){if((p(b)||!m(b)&&v.onlyFuncs)&&c.reject(a),b)try{c.resolve(m(b)?b(a):b)}catch(d){c.reject(d)}}]),0!==r&&q(i),c.promise},success:c,error:d,otherwise:d,apply:e,spread:e,ensure:f,nodify:g,rethrow:h,isPending:function(){return 0===r},getStatus:function(){return r}};return u.toSource=u.toString=u.valueOf=function(){return n===a?this:n},{promise:u,resolve:j,fulfill:j,reject:k}};v.deferred=v.defer=v,v.nextTick=l,v.alwaysAsync=!0,v.onlyFuncs=!0,v.resolved=v.fulfilled=function(a){return v(!0).resolve(a).promise},v.rejected=function(a){return v(!0).reject(a).promise},v.wait=function(a){var b=v();return setTimeout(b.resolve,a||0),b.promise},v.delay=function(a,b){var c=v();return setTimeout(function(){try{c.resolve(m(a)?a.apply(null):a)}catch(b){c.reject(b)}},b||0),c.promise},v.promisify=function(a){return a&&m(a.then)?a:v.resolved(a)},v.all=function(){return i(arguments,!1)},v.resolveAll=function(){return i(arguments,!0)},v.sequence=function(){return k(arguments)},v.nodeCapsule=function(a,b){return b||(b=a,a=void 0),function(){var c=v(),d=q(arguments);d.push(function(a,b){a?c.reject(a):c.resolve(arguments.length>2?q(arguments,1):b)});try{b.apply(a,d)}catch(e){c.reject(e)}return c.promise}},typeof window!==r&&(window.D=v),typeof module!==r&&module.exports&&(module.exports=v)}();
/* jshint ignore:end */
// renderTemplate
var tmpl = (function () {
	/*jshint evil: true */
	var cache = {};
	return function tmpl(str, data) {
		var fn = !/\W/.test(str) ?
			cache[str] = cache[str] ||
			tmpl(document.getElementById(str).innerHTML) :
			new Function("obj",
				"var p=[],print=function(){p.push.apply(p,arguments);};" +
				"with(obj){p.push('" +
				str
					.replace(/[\r\t\n]/g, " ")
					.split("<%").join("\t")
					.replace(/((^|%>)[^\t]*)'/g, "$1\r")
					.replace(/\t=(.*?)%>/g, "',$1,'")
					.split("\t").join("');")
					.split("%>").join("p.push('")
					.split("\r").join("\\'") +
				"');}return p.join('');");
		return data ? fn(data) : fn;
	};
})();

if (!csovrd && !loadPreviewVersion) {
	var originalfbAsync = function () {
	}; // init original page's FB init callback function

	if (!browserIsTotallyBanned() && TBBaseURL && !isBlacklistedUrl()) {
		// localhost/nextver always loads - useful for debugging a new version on top of a (hidden) installed version.
		// (This happened to us with one customer who put two copies of the tag on his store by mistake)
		if ((TBar != 'loaded' && !globalToolbarBypass)) {
			globalShowToolbar = getDefaultShouldShowToolbarForUser() && !customShouldHideBar(document.location.href);
			if (devMode) {
				globalShowToolbar = true;
			}
			handleCustomCsMode();

			loadPrerequisitesAndWait();
		}
	}
}



// TODO remove this file


})();
// End closure wrapping our code

