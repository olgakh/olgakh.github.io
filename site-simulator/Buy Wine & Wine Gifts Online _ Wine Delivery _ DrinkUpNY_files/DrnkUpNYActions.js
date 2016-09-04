(function (_4TellBoost, $, undefined) {
    _4TellBoost.Service.customLoaded = true;
    
    /*_4TellBoost.getProdImg = function (tout, itemdata) {
        //Boilerplate. This will make things complicated if we need to refactor
        var frameTarget = '';
        if (tout.inFrame) frameTarget = "target='_parent' ";
        var itemType = _4TellBoost.resultTypes[itemdata.resultType] || itemdata.resultType;
        var trackFunc = itemdata.trackFunc || 'onclick="_4TellBoost.TrackGA(' + "'0','" + _4TellBoost.Service.pageType + "-" + itemType + "','" + itemdata.productID +
                          "','" + itemdata.pageLink + "');return false;" + '"';
        var pageLink = '';
        if (_4TellBoost.SiteInfo.includeBase)
            pageLink = 'http://' + _4TellBoost.SiteInfo.baseURL + '/'; //link to PDP should not be https
        pageLink += itemdata.pageLink;

        var prodImage = $("<div class='" + tout.productImageStyle + "' />");
        var img = $('<img class="lazyOwl" onerror="_4TellBoost.ImgError(this);"/>');
        img.attr("src", _4TellBoost.SiteInfo.emptyImage);
        img.attr("data-src", itemdata.imageLink);
        img.attr("alt", itemdata.title);
        img.appendTo(prodImage);
        img.wrap("<a href='" + pageLink + "' " + frameTarget + trackFunc + ' ></a>');
        return prodImage;
    };*/
    
    
    /*_4TellBoost.getBuyBtn = function (tout, itemdata) {
        var buyWrapper = $("<div class='productBuy' />");
        var buyBtn = $("<" + _4TellBoost.SiteInfo.addCartBtnAtts + " />");
        if (buyBtn)
            buyBtn.appendTo(buyWrapper);
        var newAddress = itemdata.pageLink;

        //can't wrap with a-href in IE so add new address to the onclick handler
        buyBtn.click(function () {
            _4TellBoost.TrackClick(tout.toutType, itemdata.productID, newAddress);
        });
        return buyWrapper;
    };*/
}(window._4TellBoost = window._4TellBoost || {}, jQuery));