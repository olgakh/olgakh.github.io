(function () {

    var CDN_URL = 'https://d2leqgr9fez74i.cloudfront.net';

    function buildHtml() {
        var productId = getProductId();
        if (productId) {
            var d = document;
            var container = d.createElement('div');
            container.id = 'wi-cr';
            var modal = d.createElement('div');
            var close = d.createElement('div');
            close.id = 'wi-cr-close';
            close.innerHtml = '&times;';
            var flag = d.createElement('img');
            flag.id = 'wi-cr-flag';
            var title = d.createElement('p');
            title.id = 'wi-cr-title';
            var text = d.createElement('p');
            text.id = 'wi-cr-text';
            var link = d.createElement('a');
            link.id = 'wi-cr-button';
            modal.appendChild(close);
            modal.appendChild(flag);
            modal.appendChild(title);
            modal.appendChild(text);
            modal.appendChild(link);
            container.appendChild(modal);
            d.body.insertBefore(container, null);
        }
    }

    function loadJavaScript() {
        var d = document;
        var s = d.getElementsByTagName('script')[0];
        var l = d.createElement('script');

        var u = CDN_URL + '/common/js/webinterpret.js';
        var productId = getProductId();
        var sanitizeUrl = (productId ? false : true);

        u = u + '?url=' + getStoreUrl(sanitizeUrl);
        if (productId) {
            u = u + '&product_id=' + productId;
        }

        l.type = 'text/javascript';
        l.async = true;
        l.src = u;
        s.parentNode.insertBefore(l, s);
    }

    function getStoreUrl(sanitizeUrl) {
        if (typeof(_webinterpret) == 'object' && _webinterpret.hasOwnProperty('store_url')) {
            return _webinterpret.store_url;
        }

        var url;
        if (sanitizeUrl) {
            url = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '');
        } else {
            url = document.URL;
        }

        return encodeURIComponent(url);
    }

    function getProductId() {
        if (typeof(__st) == 'object' && __st.hasOwnProperty('rid') && __st.hasOwnProperty('p') && __st.p == 'product') {
            return __st.rid;
        }
        if (typeof(_webinterpret) == 'object' && _webinterpret.hasOwnProperty('product_id')) {
            return _webinterpret.product_id;
        }
        return '';
    }

    function loadCss() {
        var d = document;
        var h = d.getElementsByTagName('head')[0];
        var l = d.createElement('link');
        l.rel = 'stylesheet';
        l.type = 'text/css';
        l.href = CDN_URL + '/common/css/webinterpret.css';
        l.media = 'all';
        h.appendChild(l);
    }

    function init() {
        buildHtml();
        loadCss();
        loadJavaScript();
    }

    if (document.readyState === 'complete') {
        init();
    } else {
        document.addEventListener('DOMContentLoaded', function (event) {
            init();
        });
    }
})();
