(function (_4TellBoost, $, undefined) {
    _4TellBoost.CONFIG = {
        SiteInfo: {
            baseURL: "www.drinkupny.com",
            alias: "DrnkUpNY",
            GA_UA: "UA-18915578-1",
            platform: "4TellVs.js",
            addCartBtnAtts: "input class='vCSS_input_addtocart' value='Add to Cart' alt='Add to Cart'",
            spacerImage: "/v/vspfiles/templates/55/images/clear1x1.gif",
            emptyImage: "/v/vspfiles/templates/55/images/nophoto.gif",
            pricePrefix: "Price: ",
            salePricePrefix: "",
            includeBase: false,
            lazyOwl: true,
            custom:true,
            radarFlag: 1,
            siteEnable: true
        },
        PageSettings: {
            Home: [{
                enable: true,
                resultType: 5,
                numItems: 12,
                rotateRecs: true,
                caption: "Top Sellers",
                showCaption: false,
                productStyle: "product4T product4THome",
                divSelect: '.gt-ie9 #content_area img[src*="images/HomePage/FeaturedProducts.gif"] + br + table tbody tr',
                divPosition: "above",
                maxImageHeight: 150,
                carousel: {
                    items: 4,
                    itemsCustom: [[0,1],[480,2],[768,3],[992,4],[1200,4],[1400,4]],
                    scrollPerPage: true,
                    navigation: true,
                    lazyLoad:true,
                    navigationText: false,
                    pagination: false,
                    addClassActive: true
                },
                showBuyButton: true,
                showRatings: false,
                showPrice: true,
                wrapper: "<table width='100%' class='HOME4T'><tr></tr></table>",
                rawJS: {
                    perProduct: function(itemdata) {
                        if (itemdata.listPrice && itemdata.listPrice.length) {
                            itemdata.price = itemdata.listPrice;
                        }
                    },
                    postDisplay: function() {
                       $('.strikePrice.productPrice').each(function(){
                           var newPrice = $(this).html().replace('Price: ', '');
                          this.innerHTML = newPrice;
                       }); 
                    },
                    preDisplay: function () {
                        $('td[rowspan=2] img[src*=assets]').css('box-shadow', '2px 6px 9px #888');//Add drop-shadow to the main banner.
                    },
                    preInit: function(tout) {
                        tout.columns.custom.listPrice = "lp";
                        _4TellBoost.setCatId('1');
                        $('head').append('<link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">');
                    }
                },
                inCart: false
            }],
            ProductDetail: [{
                enable: true,
                resultType: 0,
                numItems: 8,
                caption: "Our customers also bought",
                captionStyle: "product4TCaption product4TCaptionPD1",
                productStyle: "product4T product4TPD1",
                divSelect: "table:has('b:contains(Browse for more products in the same category as this item)')",
                divPosition: "replace",
                carousel: {
                    items: 4,
                    itemsCustom: [[0,1],[480,2],[768,3],[992,4],[1200,4],[1400,4]],
                    scrollPerPage: true,
                    navigation: true,
                    lazyLoad:true,
                    navigationText: false,
                    pagination: false,
                    addClassActive: true
                },
                showRatings: false,
                maxImageHeight: 120,
                wrapper: "<table width='100%' class='PD14T'><tr></tr></table>",
                rawJS: {
                    preDisplay: function (tout) {
                        $('table#v65-product-related').remove();
                    },
                    perProduct: function(itemdata) {
                        if (itemdata.listPrice && itemdata.listPrice.length) {
                            itemdata.price = itemdata.listPrice;
                        }
                    },
                    preInit: function(tout) {
                        $('head').append('<link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">');
                        tout.columns.custom.listPrice = "lp";
                    }
                },
                inCart: false
            },
            {
               enable: true,
                resultType: 3,
                numItems: 6,
                caption: "customers also viewed",
                captionStyle: "product4TCaption product4TCaptionPD2",
                productStyle: "product4T product4TPD1",
                divSelect: '.colors_pricebox',
                divPosition: "append",
                carousel: {
                    items: 4,
                    itemsCustom: [[0,1],[480,2],[768,2],[992,2],[1200,2],[1400,2]],
                    scrollPerPage: true,
                    navigation: true,
                    lazyLoad:true,
                    navigationText: false,
                    pagination: false,
                    addClassActive: true
                },
                showRatings: false,
                maxImageHeight: 120,
                wrapper: "<table class='PD24T'><tr></tr></table>",
                rawJS: {
                    perProduct: function(itemdata) {
                        if (itemdata.listPrice && itemdata.listPrice.length) {
                            itemdata.price = itemdata.listPrice;
                        }
                    },
                    postDisplay: function() {
                       $('.strikePrice.productPrice').each(function(){
                           var newPrice = $(this).html().replace('Price: ', '');
                          this.innerHTML = newPrice;
                       }); 
                    },
                    preInit: function(tout) {
                        tout.columns.custom.listPrice = "lp";
                    }
                },
                inCart: false 
            }],
            Category: [{
                enable: false
            }],
            Search: [{
                enable: false

            }],
            AddToCart: [{
                enable: true,
                resultType: 0,
                numItems: 6,
                caption: "You may also like",
                captionStyle: "product4TCaption",
                productStyle: "product4T product4TVC",
                divSelect: 'form:has(input#IsAGift)',
                divPosition: "append",
                carousel: {
                    items: 2,
                    itemsCustom: [[0,1],[480,2]],
                    scrollPerPage: true,
                    navigation: true,
                    lazyLoad:true,
                    navigationText: false,
                    pagination: false,
                    addClassActive: true
                },
                responsive: {
                    1: {
                        divSelect: 'form:has(input#IsAGift)',
                        divPosition: "append",
                    },

                    2: {
                       divSelect: 'form:has(input#IsAGift)',
                       divPosition: "append",
                    },

                    3: {
                        divSelect: 'div:has(#image1):last',
                        divPosition: "below",
                    },

                    4: {
                        divSelect: 'div:has(#image1):last',
                        divPosition: "below",   
                    }
                },

                maxImageHeight: 110,
                showRatings: true,
                wrapper: "<table class='VC4T'><tr></tr></table>",
                rawJS: {
                    preInit: function(tout) {
                        $('head').append('<link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">');
                        tout.columns.custom.listPrice = "lp";
                    },
                    perProduct: function(itemdata) {
                        if (itemdata.listPrice && itemdata.listPrice.length) {
                            itemdata.price = itemdata.listPrice;
                        }
                    },
                    postDisplay: function() {
                       $('.strikePrice.productPrice').each(function(){
                           var newPrice = $(this).html().replace('Price: ', '');
                          this.innerHTML = newPrice;
                       }); 
                    },
                },
                inCart: true
            }]
        }
    };
}(window._4TellBoost = window._4TellBoost || {}, jQuery));