!function(e,n,t){function o(e,n){return typeof e===n}function r(){var e,n,t,r,s,i,a;for(var l in C)if(C.hasOwnProperty(l)){if(e=[],n=C[l],n.name&&(e.push(n.name.toLowerCase()),n.options&&n.options.aliases&&n.options.aliases.length))for(t=0;t<n.options.aliases.length;t++)e.push(n.options.aliases[t].toLowerCase());for(r=o(n.fn,"function")?n.fn():n.fn,s=0;s<e.length;s++)i=e[s],a=i.split("."),1===a.length?x[a[0]]=r:(!x[a[0]]||x[a[0]]instanceof Boolean||(x[a[0]]=new Boolean(x[a[0]])),x[a[0]][a[1]]=r),g.push((r?"":"no-")+a.join("-"))}}function s(e){var n=b.className,t=x._config.classPrefix||"";if(S&&(n=n.baseVal),x._config.enableJSClass){var o=new RegExp("(^|\\s)"+t+"no-js(\\s|$)");n=n.replace(o,"$1"+t+"js$2")}x._config.enableClasses&&(n+=" "+t+e.join(" "+t),S?b.className.baseVal=n:b.className=n)}function i(){return"function"!=typeof n.createElement?n.createElement(arguments[0]):S?n.createElementNS.call(n,"http://www.w3.org/2000/svg",arguments[0]):n.createElement.apply(n,arguments)}function a(e,n){return!!~(""+e).indexOf(n)}function l(e){return e.replace(/([a-z])-([a-z])/g,function(e,n,t){return n+t.toUpperCase()}).replace(/^-/,"")}function f(e,n){return function(){return e.apply(n,arguments)}}function u(e,n,t){var r;for(var s in e)if(e[s]in n)return t===!1?e[s]:(r=n[e[s]],o(r,"function")?f(r,t||n):r);return!1}function c(e){return e.replace(/([A-Z])/g,function(e,n){return"-"+n.toLowerCase()}).replace(/^ms-/,"-ms-")}function d(){var e=n.body;return e||(e=i(S?"svg":"body"),e.fake=!0),e}function p(e,t,o,r){var s,a,l,f,u="modernizr",c=i("div"),p=d();if(parseInt(o,10))for(;o--;)l=i("div"),l.id=r?r[o]:u+(o+1),c.appendChild(l);return s=i("style"),s.type="text/css",s.id="s"+u,(p.fake?p:c).appendChild(s),p.appendChild(c),s.styleSheet?s.styleSheet.cssText=e:s.appendChild(n.createTextNode(e)),c.id=u,p.fake&&(p.style.background="",p.style.overflow="hidden",f=b.style.overflow,b.style.overflow="hidden",b.appendChild(p)),a=t(c,e),p.fake?(p.parentNode.removeChild(p),b.style.overflow=f,b.offsetHeight):c.parentNode.removeChild(c),!!a}function m(n,o){var r=n.length;if("CSS"in e&&"supports"in e.CSS){for(;r--;)if(e.CSS.supports(c(n[r]),o))return!0;return!1}if("CSSSupportsRule"in e){for(var s=[];r--;)s.push("("+c(n[r])+":"+o+")");return s=s.join(" or "),p("@supports ("+s+") { #modernizr { position: absolute; } }",function(e){return"absolute"==getComputedStyle(e,null).position})}return t}function h(e,n,r,s){function f(){c&&(delete E.style,delete E.modElem)}if(s=!o(s,"undefined")&&s,!o(r,"undefined")){var u=m(e,r);if(!o(u,"undefined"))return u}for(var c,d,p,h,v,y=["modernizr","tspan","samp"];!E.style&&y.length;)c=!0,E.modElem=i(y.shift()),E.style=E.modElem.style;for(p=e.length,d=0;p>d;d++)if(h=e[d],v=E.style[h],a(h,"-")&&(h=l(h)),E.style[h]!==t){if(s||o(r,"undefined"))return f(),"pfx"!=n||h;try{E.style[h]=r}catch(e){}if(E.style[h]!=v)return f(),"pfx"!=n||h}return f(),!1}function v(e,n,t,r,s){var i=e.charAt(0).toUpperCase()+e.slice(1),a=(e+" "+k.join(i+" ")+i).split(" ");return o(n,"string")||o(n,"undefined")?h(a,n,r,s):(a=(e+" "+T.join(i+" ")+i).split(" "),u(a,n,t))}function y(e,n,o){return v(e,t,t,n,o)}var g=[],C=[],w={_version:"3.3.1",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,n){var t=this;setTimeout(function(){n(t[e])},0)},addTest:function(e,n,t){C.push({name:e,fn:n,options:t})},addAsyncTest:function(e){C.push({name:null,fn:e})}},x=function(){};x.prototype=w,x=new x,x.addTest("geolocation","geolocation"in navigator);var b=n.documentElement,S="svg"===b.nodeName.toLowerCase();x.addTest("srcset","srcset"in i("img"));var _="Moz O ms Webkit",k=w._config.usePrefixes?_.split(" "):[];w._cssomPrefixes=k;var T=w._config.usePrefixes?_.toLowerCase().split(" "):[];w._domPrefixes=T;var P={elem:i("modernizr")};x._q.push(function(){delete P.elem});var E={style:P.elem.style};x._q.unshift(function(){delete E.style}),w.testAllProps=v,w.testAllProps=y,function(){x.addTest("csscolumns",function(){var e=!1,n=y("columnCount");try{(e=!!n)&&(e=new Boolean(e))}catch(e){}return e});for(var e,n,t=["Width","Span","Fill","Gap","Rule","RuleColor","RuleStyle","RuleWidth","BreakBefore","BreakAfter","BreakInside"],o=0;o<t.length;o++)e=t[o].toLowerCase(),n=y("column"+t[o]),("breakbefore"===e||"breakafter"===e||"breakinside"==e)&&(n=n||y(t[o])),x.addTest("csscolumns."+e,n)}(),x.addTest("flexbox",y("flexBasis","1px",!0)),r(),s(g),delete w.addTest,delete w.addAsyncTest;for(var z=0;z<x._q.length;z++)x._q[z]();e.Modernizr=x}(window,document);