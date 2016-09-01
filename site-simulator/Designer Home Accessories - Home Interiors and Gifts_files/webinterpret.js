var _webinterpret = _webinterpret || {};
_webinterpret.plugin_version = 'webinterpret_js-1.0.0-magento';
_webinterpret.asset_path = 'https://d2leqgr9fez74i.cloudfront.net/common';
_webinterpret.store_locale = 'en_GB';
_webinterpret.store_url = 'https://www.design55online.co.uk';

/* Webinterpret */
var _webinterpret = _webinterpret || {};

_webinterpret.ui_version = '2.0';
_webinterpret.redirector_visible = false;

/* Piwik */
var _paq = _paq || [];

/* Google Analytics */
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','_analytics');

_analytics('create', 'UA-76313133-1', 'auto', 'webinterpret');
_analytics('webinterpret.set', {
    'dimension6': _webinterpret.product_id, // Product ID
    'dimension7': _webinterpret.plugin_version, // Plugin Version
    'dimension8': _webinterpret.ui_version // UI Version
});
_analytics('webinterpret.send', 'pageview');

/* querySelector polyfill */
if (!document.querySelectorAll) {
    document.querySelectorAll = function (selectors) {
        var style = document.createElement('style'), elements = [], element;
        document.documentElement.firstChild.appendChild(style);
        document._qsa = [];

        style.styleSheet.cssText = selectors + '{x-qsa:expression(document._qsa && document._qsa.push(this))}';
        window.scrollBy(0, 0);
        style.parentNode.removeChild(style);

        while (document._qsa.length) {
            element = document._qsa.shift();
            element.style.removeAttribute('x-qsa');
            elements.push(element);
        }
        document._qsa = null;
        return elements;
    };
}

if (!document.querySelector) {
    document.querySelector = function (selectors) {
        var elements = document.querySelectorAll(selectors);
        return (elements.length) ? elements[0] : null;
    };
}

function webinterpret_getText (locale) {
    var textMap = {
        en_US: {
            discount: {
                title: 'Shopping from the<br> United States?',
                text: 'You are eligible for European VAT exemption which will make you <strong>save {{VAT_exemption}}%</strong>',
                button: 'I want to save {{VAT_exemption}}%',
                underButton: 'No, I don\'t want the savings',
                footerClick: 'Click here',
                footerLink: 'to SAVE {{VAT_exemption}}% by claiming European VAT exemption on all products.',
                footerMobile: 'Click here and save {{VAT_exemption}}%'
            },
            noDiscount: {
                title: 'Shopping from the<br> United States?',
                text: 'Save time, shop in <strong>English and Dollars</strong> in our US store.',
                button: 'Continue shopping',
                underButton: 'Not shipping to the United States? Click here',
                footerClick: 'Save time,',
                footerLink: 'shop in English and Dollars in our US store',
                footerMobile: 'Shop in our US store.'
            }
        },
        en_AU: {
            discount: {
                title: 'Shopping from<br> Australia?',
                text: 'You are eligible for European VAT exemption which will make you save <strong>{{VAT_exemption}}%</strong>',
                button: 'I want to save {{VAT_exemption}}%',
                underButton: 'No, I don\'t want the savings',
                footerClick: 'Click here',
                footerLink: 'to SAVE {{VAT_exemption}}% by claiming European VAT exemption on all products.',
                footerMobile: 'Click here and save {{VAT_exemption}}%'
            },
            noDiscount: {
                title: 'Shopping from<br> Australia?',
                text: 'Save time, shop in <strong>English and Australian Dollars</strong> in our Australian store.',
                button: 'Continue shopping',
                underButton: 'Not shipping to Australia? Click here',
                footerClick: 'Save time,',
                footerLink: 'shop in English and Australian Dollars in our Australian store.',
                footerMobile: 'Shop in our Australian store.'
            }
        },
        en_CA: {
            discount: {
                title: 'Shopping from<br> Canada?',
                text: 'You are eligible for European VAT exemption which will make you save <strong>{{VAT_exemption}}%</strong>',
                button: 'I want to save {{VAT_exemption}}%',
                underButton: 'No, I don\'t want the savings',
                footerClick: 'Click here',
                footerLink: 'to SAVE {{VAT_exemption}}% by claiming European VAT exemption on all products.',
                footerMobile: 'Click here and save {{VAT_exemption}}%'
            },
            noDiscount: {
                title: 'Shopping from<br> Canada?',
                text: 'Save time, shop in <strong>English and Canadian Dollars</strong> in our Canadian store.',
                button: 'Continue shopping',
                underButton: 'Not shipping to Canada? Click here',
                footerClick: 'Save time,',
                footerLink: 'shop in English and Canadian Dollars in our Canadian store.',
                footerMobile: 'Shop in our Canadian store.'
            }
        },
        en_GB: {
            discount: {
                title: 'Shopping from<br> the United Kingdom?',
                text: 'Save time, shop in <strong>English and British Pounds</strong> in our UK store.',
                button: 'Continue shopping',
                underButton: 'Not shipping to the UK? Click here',
                footerClick: 'Click here',
                footerLink: 'to view in your language',
                footerMobile: 'Shop in our UK store.'
            },
            noDiscount: {
                title: 'Shopping from<br> the United Kingdom?',
                text: 'Save time, shop in <strong>English and British Pounds</strong> in our UK store.',
                button: 'Continue shopping',
                underButton: 'Not shipping to the United Kingdom? Click here',
                footerClick: 'Click here',
                footerLink: 'to view in your language',
                footerMobile: 'Shop in our UK store.'
            }
        },
        en_IE: {
            discount: {
                title: 'Shopping from<br> Ireland?',
                text: 'Save time, shop in <strong>Ireland and Euros</strong> in our Irish store.',
                button: 'Continue shopping',
                underButton: 'Not shipping to Ireland? Click here',
                footerClick: 'Click here',
                footerLink: 'to view in your language',
                footerMobile: 'Shop in our Irish Store.'
            },
            noDiscount: {
                title: 'Shopping from<br> Ireland?',
                text: 'Save time, shop in <strong>Ireland and Euros</strong> in our Irish store.',
                button: 'Continue shopping',
                underButton: 'Not shipping to Ireland? Click here',
                footerClick: 'Click here',
                footerLink: 'to view in your language',
                footerMobile: 'Shop in our Irish Store.'
            }
        },
        de_DE: {
            discount: {
                title: 'Kaufen Sie aus<br> Deutschland aus ein?',
                text: 'Sparen Sie Zeit, shoppen Sie auf <strong>Deutsch und in Euros</strong> in unserem deutschen Shop.',
                button: 'Weiter einkaufen',
                underButton: 'Nicht nach Deutschland versenden, hier klicken',
                footerClick: 'Hier klicken',
                footerLink: 'um den Inhalt auf Deutsch zu sehen',
                footerMobile: 'Kaufen im die deutschen laden.'
            },
            noDiscount: {
                title: 'Kaufen Sie aus<br> Deutschland aus ein?',
                text: 'Sparen Sie Zeit, shoppen Sie auf <strong>Deutsch und in Euros</strong> in unserem deutschen Shop.',
                button: 'Weiter einkaufen',
                underButton: 'Nicht nach Deutschland versenden, hier klicken',
                footerClick: 'Hier klicken',
                footerLink: 'um den Inhalt auf Deutsch zu sehen',
                footerMobile: 'Kaufen im die deutschen laden.'
            }
        },
        de_AT: {
            discount: {
                title: 'Kaufen Sie aus<br> Österreich aus ein?',
                text: 'Sparen Sie Zeit, shoppen Sie auf <strong>Deutsch und in Euros</strong> in unserem Österreich Shop.',
                button: 'Weiter einkaufen',
                underButton: 'Nicht nach Österreich versenden, hier klicken',
                footerClick: 'Hier klicken',
                footerLink: 'um den Inhalt auf Deutsch zu sehen',
                footerMobile: 'Kaufen im die österreichischen laden'
            },
            noDiscount: {
                title: 'Kaufen Sie aus<br> Österreich aus ein?',
                text: 'Sparen Sie Zeit, shoppen Sie auf <strong>Deutsch und in Euros</strong> in unserem Österreich Shop.',
                button: 'Weiter einkaufen',
                underButton: 'Nicht nach Österreich versenden, hier klicken',
                footerClick: 'Hier klicken',
                footerLink: 'um den Inhalt auf Deutsch zu sehen',
                footerMobile: 'Kaufen im die österreichischen laden'
            }
        },
        de_CH: {
            discount: {
                title: 'Kaufen Sie aus<br> Schweiz aus ein?',
                text: 'Sparen Sie Zeit, shoppen Sie auf <strong>Deutsch und in CHF</strong> in unserem Schweiz Shop.',
                button: 'Weiter einkaufen',
                underButton: 'Nicht nach Schweiz versenden, hier klicken',
                footerClick: 'Hier klicken',
                footerLink: 'um den Inhalt auf Schweizer Deutsch zu sehen',
                footerMobile: 'Kaufen im die Schweizer laden'
            },
            noDiscount: {
                title: 'Kaufen Sie aus<br> Schweiz aus ein?',
                text: 'Sparen Sie Zeit, shoppen Sie auf <strong>Deutsch und in CHF</strong> in unserem Schweiz Shop.',
                button: 'Weiter einkaufen',
                underButton: 'Nicht nach Schweiz versenden, hier klicken',
                footerClick: 'Hier klicken',
                footerLink: 'um den Inhalt auf Schweizer Deutsch zu sehen',
                footerMobile: 'Kaufen im die Schweizer laden'
            }
        },
        fr_FR: {
            discount: {
                title: 'Vous souhaitez faire votre<br> shopping en France?',
                text: 'Gagnez du temps, faites vos achats en <strong>français et en euros</strong> dans le magasin français.',
                button: 'Poursuivre mes achats',
                underButton: 'Ne pas expédier en France, cliquer ici',
                footerClick: 'Cliquer ici',
                footerLink: 'pour afficher dans votre langue',
                footerMobile: 'Acheter aux magasin Français.'
            },
            noDiscount: {
                title: 'Vous souhaitez faire votre<br> shopping en France?',
                text: 'Gagnez du temps, faites vos achats en <strong>français et en euros</strong> dans le magasin français.',
                button: 'Poursuivre mes achats',
                underButton: 'Ne pas expédier en France, cliquer ici',
                footerClick: 'Cliquer ici',
                footerLink: 'pour afficher dans votre langue',
                footerMobile: 'Acheter aux magasin Français.'
            }
        },
        fr_BE: {
            discount: {
                title: 'Vous souhaitez faire votre<br> shopping en Belgique?',
                text: 'Gagnez du temps, faites vos achats en <strong>français et en euros</strong> dans le magasin français.',
                button: 'Poursuivre mes achats',
                underButton: 'Ne pas expédier en Belgique, cliquer ici',
                footerClick: 'Cliquer ici',
                footerLink: 'pour afficher dans votre langue',
                footerMobile: 'Acheter aux magasin Belgique.'
            },
            noDiscount: {
                title: 'Vous souhaitez faire votre<br> shopping en Belgique?',
                text: 'Gagnez du temps, faites vos achats en <strong>français et en euros</strong> dans le magasin français.',
                button: 'Poursuivre mes achats',
                underButton: 'Ne pas expédier en Belgique, cliquer ici',
                footerClick: 'Cliquer ici',
                footerLink: 'pour afficher dans votre langue',
                footerMobile: 'Acheter aux magasin Belgique.'
            }
        },
        it_IT: {
            discount: {
                title: 'Acquisti<br> dall\'Italia?',
                text: 'Risparmia tempo, acquista in <strong>Italiano e in Euro</strong> nel nostro Negozio Italiano.',
                button: 'Prosegui con gli acquisti',
                underButton: 'Clicca qui se la spedizione non è in Italia.',
                footerClick: 'Clicca qui',
                footerLink: 'per visualizzare il contenuto in italiano',
                footerMobile: 'Acquista nel Negozio Italiano'
            },
            noDiscount: {
                title: 'Acquisti<br> dall\'Italia?',
                text: 'Risparmia tempo, acquista in <strong>Italiano e in Euro</strong> nel nostro Negozio Italiano.',
                button: 'Prosegui con gli acquisti',
                underButton: 'Clicca qui se la spedizione non è in Italia.',
                footerClick: 'Clicca qui',
                footerLink: 'per visualizzare il contenuto in italiano',
                footerMobile: 'Acquista nel Negozio Italiano'
            }
        },
        es_ES: {
            discount: {
                title: '¿Está comprando desde<br> España?',
                text: 'Ahorre tiempo, haga su compra en <strong>español y utilizando el euro</strong> en nuestra tienda española.',
                button: 'Continuar comprando',
                underButton: 'No envíe a España? haga clic aquí',
                footerClick: 'Clic aquí',
                footerLink: 'para visualizar el contenido en español',
                footerMobile: 'Cuempra en el negocio Español'
            },
            noDiscount: {
                title: '¿Está comprando desde<br> España?',
                text: 'Ahorre tiempo, haga su compra en <strong>español y utilizando el euro</strong> en nuestra tienda española.',
                button: 'Continuar comprando',
                underButton: 'No envíe a España? haga clic aquí',
                footerClick: 'Clic aquí',
                footerLink: 'para visualizar el contenido en español',
                footerMobile: 'Cuempra en el negocio Español'
            }
        },
        uk_UA: {
            discount: {
                title: 'Купуєте в <br> Україні?',
                text: 'Чи маєте Ви право на звільнення від ПДВ в Європі, що дозволить Вам  <strong>зекономити {{VAT_exemption}}%</strong>',
                button: 'Я хочу зекономити {{VAT_exemption}}%',
                underButton: 'Ні, мені не потрібна знижка',
                footerClick: 'Тисніть сюди',
                footerLink: 'ЗАОЩАДИТИ {{VAT_exemption}}% вимагаючи звільнення від європейського ПДВ на всі товари.',
                footerMobile: 'Тисніть тут і заощаджуйте {{VAT_exemption}}%'
            },
            noDiscount: {
                title: 'Купуєте в <br>Україні?',
                text: 'Бережіть свій час, магазин <strong>Вашою мовою</strong> на нашому українському магазині.',
                button: 'Продовжити шопінг',
                underButton: 'Без доставки в Україну? Тисніть сюди',
                footerClick: 'Зберегти час,',
                footerLink: 'Магазин Вашою мовою на нашому українському магазині',
                footerMobile: 'Купуйте в нашому українському магазині.'
            }
        },
        sr_RS: {
            discount: {
                title: 'Kupujete iz<br> Srbije?',
                text: 'Imate pravo na evropsko oslobađanje od PDV-a koje će vam <strong>uštedeti {{VAT_exemption}}%</strong>',
                button: 'Želim da uštedim {{VAT_exemption}}%',
                underButton: 'Ne, ne želim uštedu',
                footerClick: 'Kliknite ovde',
                footerLink: 'da biste UŠTEDELI {{VAT_exemption}}% tako što ćete potvrditi evropsko oslobađanje od PDV-a za sve proizvode.',
                footerMobile: 'Kliknite ovde i uštedite {{VAT_exemption}}%'
            },
            noDiscount: {
                title: 'Kupujete iz<br> Srbije?',
                text: 'Uštedite vreme, kupujte na <strong>svom jeziku</strong> u našoj srpskoj prodavnici.',
                button: 'Nastavite sa kupovinom',
                underButton: 'Ne isporučuje se u Srbiji? Kliknite ovde',
                footerClick: 'Uštedite vreme,',
                footerLink: 'kupujte na svom jeziku u našoj srpskoj prodavnici',
                footerMobile: 'Kupujte u našoj srpskoj prodavnici.'
            }
        },
        sl_SI: {
            discount: {
                title: 'Nakupujete iz <br>Slovenije?',
                text: 'Prihranite čas, nakupujte v <strong>svojem jeziku</strong> v naši slovenski trgovini.',
                button: 'Nadaljuj z nakupovanjem',
                underButton: 'Ne pošiljamo v Slovenijo? Pritisnite tukaj',
                footerClick: 'Prihranite čas,',
                footerLink: 'nakupujte v svojem jeziku v naši slovenski trgovini',
                footerMobile: 'Nakupujte v naši slovenski trgovini.'
            },
            noDiscount: {
                title: 'Nakupujete iz<br> Slovenije?',
                text: 'Prihranite čas, nakupujte v <strong>svojem jeziku</strong> v naši slovenski trgovini.',
                button: 'Nadaljuj z nakupovanjem',
                underButton: 'Ne pošiljamo v Slovenijo? Pritisnite tukaj',
                footerClick: 'Prihranite čas,',
                footerLink: 'nakupujte v svojem jeziku v naši slovenski trgovini',
                footerMobile: 'Nakupujte v naši slovenski trgovini.'
            }
        },
        sk_SK: {
            discount: {
                title: 'Nakupovanie zo<br> Slovenska',
                text: 'Ušetrite čas, nakupujte vo <strong>svojom jazyku</strong> v našom slovenskom obchode.',
                button: 'Pokračovať v nakupovaní',
                underButton: 'Bez doručenia na Slovensko? Kliknite sem',
                footerClick: 'Ušetrite čas,',
                footerLink: 'nakupujte vo svojom jazyku v našom slovenskom obchode',
                footerMobile: 'Nakupujte v našom slovenskom obchode.'
            },
            noDiscount: {
                title: 'Nakupovanie zo<br> Slovenska',
                text: 'Ušetrite čas, nakupujte vo <strong>svojom jazyku</strong> v našom slovenskom obchode.',
                button: 'Pokračovať v nakupovaní',
                underButton: 'Bez doručenia na Slovensko? Kliknite sem',
                footerClick: 'Ušetrite čas,',
                footerLink: 'nakupujte vo svojom jazyku v našom slovenskom obchode',
                footerMobile: 'Nakupujte v našom slovenskom obchode.'
            }
        },
        ro_RO: {
            discount: {
                title: 'Faceți cumpărături din<br> România?',
                text: 'Economisiți timp, faceți cumpărături în <strong>limba română</strong> în magazinul nostru românesc.',
                button: 'Continuare cumpărături',
                underButton: 'Nu livrați către România? Dați clic aici',
                footerClick: 'Economisiți timp,',
                footerLink: 'faceți cumpărături în limba română în magazinul nostru românesc',
                footerMobile: 'Faceți cumpărături în magazinul nostru românesc.'
            },
            noDiscount: {
                title: 'Faceți cumpărături din<br> România?',
                text: 'Economisiți timp, faceți cumpărături în <strong>limba română</strong> în magazinul nostru românesc.',
                button: 'Continuare cumpărături',
                underButton: 'Nu livrați către România? Dați clic aici',
                footerClick: 'Economisiți timp,',
                footerLink: 'faceți cumpărături în limba română în magazinul nostru românesc',
                footerMobile: 'Faceți cumpărături în magazinul nostru românesc.'
            }
        },
        pt_PT: {
            discount: {
                title: 'Compra a partir de<br> Portugal?',
                text: 'Poupe tempo, compre <strong>na sua linguagem e moeda</strong> na nossa loja portuguesa.',
                button: 'Continue comprando',
                underButton: 'Não é para enviar para Portugal? Clique aqui',
                footerClick: 'Poupe tempo,',
                footerLink : 'compre na nossa loja Portuguesa utilizando a sua linguagem e a sua moeda'
            },
            noDiscount: {
                title: 'Compra a partir de<br> Portugal?',
                text: 'Poupe tempo, compre <strong>na sua linguagem e moeda</strong> na nossa loja portuguesa.',
                button: 'Continue comprando',
                underButton: 'Não é para enviar para Portugal? Clique aqui',
                footerClick: 'Poupe tempo,',
                footerLink : 'compre na nossa loja Portuguesa utilizando a sua linguagem e a sua moeda'
            }
        },
        pl_PL: {
            discount: {
                title: 'Robisz zakupy z<br> Polski?',
                text: 'Oszczędź czas, zrób zakupy w <strong>swoim języku i walucie</strong> w naszym polskim sklepie.',
                button: 'Kontynuuj zakupy',
                underButton: 'Nie robisz zakupów z Polski? Kliknij tutaj',
                footerClick: 'Oszczędź czas,',
                footerLink: 'zrób zakupy w swoim języku i walucie w naszym polskim sklepie',
                footerMobile: 'zrób zakupy w naszym polskim sklepie.'
            },
            noDiscount: {
                title: 'Robisz zakupy z<br> Polski?',
                text: 'Oszczędź czas, zrób zakupy w <strong>swoim języku i walucie</strong> w naszym polskim sklepie.',
                button: 'Kontynuuj zakupy',
                underButton: 'Nie robisz zakupów z Polski? Kliknij tutaj',
                footerClick: 'Oszczędź czas,',
                footerLink: 'zrób zakupy w swoim języku i walucie w naszym polskim sklepie',
                footerMobile: 'zrób zakupy w naszym polskim sklepie.'
            }
        },
        nl_NL: {
            discount: {
                title: 'Winkelen in<br> Nederland?',
                text: 'Bespaar tijd, en winkel in  <strong>uw eigen taal</strong> in onze Nederlandse winkel.',
                button: 'Ga door met winkelen',
                underButton: 'Niet verzenden naar Nederland? Klik hier',
                footerClick: 'Bespaar tijd,',
                footerLink: 'Winkel in jouw taal in onze winkel',
                footerMobile: 'Winkel in onze Nederlandse winkel.'
            },
            noDiscount: {
                title: 'Winkelen in<br> Nederland?',
                text: 'Bespaar tijd, en winkel in  <strong>uw eigen taal</strong> in onze Nederlandse winkel.',
                button: 'Ga door met winkelen',
                underButton: 'Niet verzenden naar Nederland? Klik hier',
                footerClick: 'Bespaar tijd,',
                footerLink: 'Winkel in jouw taal in onze winkel',
                footerMobile: 'Winkel in onze Nederlandse winkel.'
            }
        },
        lv_LV: {
            discount: {
                title: 'Iepirkšanās no<br> Latvijas?',
                text: 'Ietaupiet laiku, iepērkoties <strong>savā valodā</strong> mūsu Latvijas veikalā.',
                button: 'Turpināt iepirkšanos',
                underButton: 'Vai nepiegādā uz Latviju? Klikšķiniet šeit!',
                footerClick: 'Ietaupiet laiku,',
                footerLink: 'iepērkoties savā valodā mūsu Latvijas veikalā',
                footerMobile: 'Iepirkšanās mūsu Latvijas veikalā!'
            },
            noDiscount: {
                title: 'Iepirkšanās no<br> Latvijas?',
                text: 'Ietaupiet laiku, iepērkoties <strong>savā valodā</strong> mūsu Latvijas veikalā.',
                button: 'Turpināt iepirkšanos',
                underButton: 'Vai nepiegādā uz Latviju? Klikšķiniet šeit!',
                footerClick: 'Ietaupiet laiku,',
                footerLink: 'iepērkoties savā valodā mūsu Latvijas veikalā',
                footerMobile: 'Iepirkšanās mūsu Latvijas veikalā!'
            }
        },
        lt_LT: {
            discount: {
                title: 'Apsipirkimas<br> Lietuvoje?',
                text: 'Taupykite laiką, apsipirkite <strong>gimtąja kalba</strong> mūsų parduotuvėje Lietuvoje. ',
                button: 'Tęsti apsipirkimą',
                underButton: 'Į Lietuvą nesiunčiame? Spustelėti čia',
                footerClick: 'Taupykite laiką',
                footerLink: 'apsipirkite gimtąja kalba mūsų Lietuvos parduotuvėje',
                footerMobile: 'Apsipirkite mūsų Lietuvos parduotuvėje'
            },
            noDiscount: {
                title: 'Apsipirkimas<br> Lietuvoje?',
                text: 'Taupykite laiką, apsipirkite <strong>gimtąja kalba</strong> mūsų parduotuvėje Lietuvoje. ',
                button: 'Tęsti apsipirkimą',
                underButton: 'Į Lietuvą nesiunčiame? Spustelėti čia',
                footerClick: 'Taupykite laiką',
                footerLink: 'apsipirkite gimtąja kalba mūsų Lietuvos parduotuvėje',
                footerMobile: 'Apsipirkite mūsų Lietuvos parduotuvėje'
            }
        },
        hu_HU: {
            discount: {
                title: 'Vásárlás<br> Magyaországról?',
                text: 'Takarítson meg időt, vásároljon <strong>saját nyelvén és valutájában</strong>magyarországi üzletünkben',
                button: 'Vásárlás folytatása',
                underButton: 'Nem szállít Magyarországra? Kattintson ide. ',
                footerClick: 'Takarítson meg időt',
                footerLink: 'vásároljon saját nyelvén és valutájában a magyarországi üzletünkben',
                footerMobile: 'Vásároljon magyarországi üzletünkben.'
            },
            noDiscount: {
                title: 'Vásárlás<br> Magyaországról?',
                text: 'Takarítson meg időt, vásároljon <strong>saját nyelvén és valutájában</strong>magyarországi üzletünkben',
                button: 'Vásárlás folytatása',
                underButton: 'Nem szállít Magyarországra? Kattintson ide.',
                footerClick: 'Takarítson meg időt',
                footerLink: 'vásároljon saját nyelvén és valutájában a magyarországi üzletünkben',
                footerMobile: 'Vásároljon magyarországi üzletünkben.'
            }
        },
        hr_HR: {
            discount: {
                title: 'Kupovina iz<br> Hrvatske?',
                text: 'Uštedite na vremenu, kupujte na  <strong>svom jeziku</strong> u našem hrvatskom dućanu.',
                button: 'Nastavi kupovinu',
                underButton: 'Nema dostave u Hrvatsku? Kliknite ovdje',
                footerClick: 'Uštedite na vremenu',
                footerLink: 'kupujte na svom jeziku u našem hrvatskom dućanu',
                footerMobile: 'Kupujte u našem hrvatskom dućanu.'
            },
            noDiscount: {
                title: 'Kupovina iz<br> Hrvatske?',
                text: 'Uštedite na vremenu, kupujte na  <strong>svom jeziku</strong> u našem hrvatskom dućanu.',
                button: 'Nastavi kupovinu',
                underButton: 'Nema dostave u Hrvatsku? Kliknite ovdje',
                footerClick: 'Uštedite na vremenu',
                footerLink: 'kupujte na svom jeziku u našem hrvatskom dućanu',
                footerMobile: 'Kupujte u našem hrvatskom dućanu.'
            }
        },
        fi_FI: {
            discount: {
                title: 'Tee ostoksia<br> Suomessa',
                text: 'Säästä aikaa tekemällä ostoksesi <strong>omalla kielelläsi</strong> suomalaisessa kaupassamme.',
                button: 'Jatka ostoksia',
                underButton: 'Toimitus muualle kuin Suomeen? Napsauta tästä',
                footerClick: 'Säästä aikaa,',
                footerLink: 'tee ostoksia omalla kielelläsi suomalaisessa kaupassamme',
                footerMobile: 'Tee ostoksia suomalaisessa kaupassamme.'
            },
            noDiscount: {
                title: 'Tee ostoksia<br> Suomessa',
                text: 'Säästä aikaa tekemällä ostoksesi <strong>omalla kielelläsi</strong> suomalaisessa kaupassamme.',
                button: 'Jatka ostoksia',
                underButton: 'Toimitus muualle kuin Suomeen? Napsauta tästä',
                footerClick: 'Säästä aikaa,',
                footerLink: 'tee ostoksia omalla kielelläsi suomalaisessa kaupassamme',
                footerMobile: 'Tee ostoksia suomalaisessa kaupassamme.'
            }
        },
        et_EE: {
            discount: {
                title: 'Teed sisseoste<br> Eestist?',
                text: 'Säästa aega, tee meie Eesti poes sisseostud <strong>oma keeles</strong>.',
                button: 'Jätka ostude tegemist',
                underButton: 'Ei tarni Eestisse? Klõpsa siia',
                footerClick: 'Säästa aega',
                footerLink: 'tee meie Eesti poes sisseostud oma keeles',
                footerMobile: 'tee sisseostud meie USA poes'
            },
            noDiscount: {
                title: 'Teed sisseoste<br> Eestist?',
                text: 'Säästa aega, tee meie Eesti poes sisseostud <strong>oma keeles</strong>.',
                button: 'Jätka ostude tegemist',
                underButton: 'Ei tarni Eestisse? Klõpsa siia',
                footerClick: 'Säästa aega',
                footerLink: 'tee meie Eesti poes sisseostud oma keeles',
                footerMobile: 'tee sisseostud meie USA poes'
            }
        },
        el_GR: {
            discount: {
                title: 'Αγορές από την<br> Ελλάδα;',
                text: 'Εξοικονομήστε χρόνο, ψωνίστε στην<strong>γλώσσα και στο νόμισμά σας</strong> στο Ελληνικό μας κατάστημα.',
                button: 'Συνεχίστε τις αγορές',
                underButton: 'Δεν στέλνουν στην Ελλάδα; Κάντε κλικ εδώ',
                footerClick: 'Εξοικονομήστε χρόνο,',
                footerLink: 'Ψωνίστε στην γλώσσα και στο νόμισμά σας στο Ελληνικό μας κατάστημα.',
                footerMobile: 'Ψωνίστε στο Ελληνικό μας κατάστημα.'
            },
            noDiscount: {
                title: 'Αγορές από την<br> Ελλάδα;',
                text: 'Εξοικονομήστε χρόνο, ψωνίστε στην<strong>γλώσσα και στο νόμισμά σας</strong> στο Ελληνικό μας κατάστημα.',
                button: 'Συνεχίστε τις αγορές',
                underButton: 'Δεν στέλνουν στην Ελλάδα; Κάντε κλικ εδώ',
                footerClick: 'Εξοικονομήστε χρόνο,',
                footerLink: 'Ψωνίστε στην γλώσσα και στο νόμισμά σας στο Ελληνικό μας κατάστημα.',
                footerMobile: 'Ψωνίστε στο Ελληνικό μας κατάστημα.'
            }
        },
        da_DK: {
            discount: {
                title: 'Køber du fra<br> Danmark?',
                text: 'Spar tid, køb ind på <strong>dit eget sprog og med egen valuta</strong> i vores danske butik.',
                button: 'Fortsæt indkøb',
                underButton: 'Ikke levering til Danmark? Klik her',
                footerClick: 'Spar tid',
                footerLink: 'køb ind på dit eget sprog og med egen valuta i vores danske butik',
                footerMobile: 'Køb ini vores danske butik.'
            },
            noDiscount: {
                title: 'Køber du fra<br> Danmark?',
                text: 'Spar tid, køb ind på <strong>dit eget sprog og med egen valuta</strong> i vores danske butik.',
                button: 'Fortsæt indkøb',
                underButton: 'Ikke levering til Danmark? Klik her',
                footerClick: 'Spar tid',
                footerLink: 'køb ind på dit eget sprog og med egen valuta i vores danske butik',
                footerMobile: 'Køb ini vores danske butik.'
            }
        },
        no_NO: {
            discount: {
                title: 'Handler du fra<br> Norge?',
                text: 'Du slipper å betale europeisk MVA, dermed <strong>sparer du {{VAT_exemption}}%</strong>',
                button: 'Jeg vil spare {{VAT_exemption}}%',
                underButton: 'Nei, jeg er ikke interessert i å spare',
                footerClick: 'Klikk her',
                footerLink: 'for å SPARE {{VAT_exemption}}% ved å bekrefte ditt fritak fra europeisk MVA på alle produkter.',
                footerMobile: 'Klikk her og spar {{VAT_exemption}}%'
            },
            noDiscount: {
                title: 'Handler du fra<br> Norge?',
                text: 'Spar tid og handle på <strong>på norsk og med norske kroner</strong> i vår norske butikk.',
                button: 'Fortsett handelen',
                underButton: 'Skal dette ikke fraktes til Norge? Klikk her',
                footerClick: 'Spar tid,',
                footerLink: 'handle på norsk og med norske kroner i vår norske butikk.',
                footerMobile: 'Handle i vår norske butikk.'
            }
        },
        cs_CZ: {
            discount: {
                title: 'Nakupování z<br> České republiky?',
                text: 'Ušetřete čas, nakupujte ve <strong>svém jazyce a měně</strong> v našem českém obchodě.',
                button: 'Pokračujte v nakupování',
                underButton: 'Zboží nebude zasíláno do České republiky? Klikněte sem',
                footerClick: 'Ušetřete čas,',
                footerLink: 'nakupujte ve svém jazyce v našem českém obchodě',
                footerMobile: 'Nakupujte v našem českém obchodě.'
            },
            noDiscount: {
                title: 'Nakupování z<br> České republiky?',
                text: 'Ušetřete čas, nakupujte ve <strong>svém jazyce a měně</strong> v našem českém obchodě.',
                button: 'Pokračujte v nakupování',
                underButton: 'Zboží nebude zasíláno do České republiky? Klikněte sem',
                footerClick: 'Ušetřete čas,',
                footerLink: 'nakupujte ve svém jazyce v našem českém obchodě',
                footerMobile: 'Nakupujte v našem českém obchodě.'
            }
        },
        bs_BA: {
            discount: {
                title: 'Da li ste obavili kupovinu iz<br> Bosne i Hercegovine?',
                text: 'Imate pravo na oslobađanje od PDV-a za Evropu na osnovu čega možete <strong>uštedjeti %</strong>',
                button: 'Želim da ostvarim uštedu od %',
                underButton: 'Ne, ne želim da ostvarim uštedu',
                footerClick: 'Kliknite ovdje',
                footerLink: 'kako biste UŠTEDJELI % tako što ćete tražiti oslobađanje od PDV-a na sve proizvode.',
                footerMobile: 'Kliknite ovdje i uštedite %'
            },
            noDiscount: {
                title: 'Da li ste obavili kupovinu iz<br> Bosne i Hercegovine?',
                text: 'Uštedite vrijeme, kupujući <strong>na svom jeziku</strong> u našoj bosanskoj radnji.',
                button: 'Nastavite sa kupovinom',
                underButton: 'Dostava se ne vrši u Bosnu i Hercegovinu? Kliknite ovdje',
                footerClick: 'Uštedite vrijeme,',
                footerLink: 'kupujući na svom jeziku u našoj bosanskoj radnji',
                footerMobile: 'Kupujte u našoj bosanskoj radnji.'
            }
        },
        bg_BG: {
            discount: {
                title: 'Пазарувате от<br> България?',
                text: 'Спестете време и пазарувайте на <strong>своя език</strong> в българския ни магазин.',
                button: 'Продължаване с пазаруването',
                underButton: 'Няма доставка до България? Кликнете тук',
                footerClick: 'Спестете време,',
                footerLink: 'пазарувайте на своя език в българския ни магазин',
                footerMobile: 'Пазарувайте в българския ни магазин.'
            },
            noDiscount: {
                title: 'Пазарувате от<br> България?',
                text: 'Спестете време и пазарувайте на <strong>своя език</strong> в българския ни магазин.',
                button: 'Продължаване с пазаруването',
                underButton: 'Няма доставка до България? Кликнете тук',
                footerClick: 'Спестете време,',
                footerLink: 'пазарувайте на своя език в българския ни магазин',
                footerMobile: 'Пазарувайте в българския ни магазин.'
            }
        },
    }

    return textMap[locale];
}

function webinterpret_replaceTags(text, data, variables) {
    // Receives text to replace, response data and list of variables to replace in text
    // text tags and array of variables should match
    variables.forEach(function(variable) {
        var re = new RegExp('{{' + variable + '}}', "g");
        text = text.replace(re, data[variable]);
    });
    return text;
}

function webinterpret_urlEncode(str) {
    str = (str + '').toString();
    return encodeURIComponent(str)
        .replace(/!/g, '%21')
        .replace(/'/g, '%27')
        .replace(/\(/g, '%28')
        .replace(/\)/g, '%29')
        .replace(/\*/g, '%2A')
        .replace(/%20/g, '+');
}

function webinterpret_httpBuildQuery(formdata, numeric_prefix, arg_separator) {
    var value, key, tmp = [],
        that = this;

    var _http_build_query_helper = function(key, val, arg_separator) {
        var k, tmp = [];
        if (val === true) {
            val = '1';
        } else if (val === false) {
            val = '0';
        }
        if (val != null) {
            if (typeof val === 'object') {
                for (k in val) {
                    if (val[k] != null) {
                        tmp.push(_http_build_query_helper(key + '[' + k + ']', val[k], arg_separator));
                    }
                }
                return tmp.join(arg_separator);
            } else if (typeof val !== 'function') {
                return webinterpret_urlEncode(key) + '=' + webinterpret_urlEncode(val);
            } else {
                throw new Error('There was an error processing for webinterpret_httpBuildQuery().');
            }
        } else {
            return '';
        }
    };

    if (!arg_separator) {
        arg_separator = '&';
    }
    for (key in formdata) {
        value = formdata[key];
        if (numeric_prefix && !isNaN(key)) {
            key = String(numeric_prefix) + key;
        }
        var query = _http_build_query_helper(key, value, arg_separator);
        if (query !== '') {
            tmp.push(query);
        }
    }

    return tmp.join(arg_separator);
}

function webinterpret_trackEvent(category, data) {
    data = data || {};
    category = typeof category !== 'undefined' ? category : 'unknown';
    data.category = category;

    if (typeof _webinterpret.store_locale !== 'undefined') {
        data.store_locale = _webinterpret.store_locale;
    }
    if (typeof _webinterpret.visitor_locale !== 'undefined') {
        data.visitor_locale = _webinterpret.visitor_locale;
    }
    if (typeof _webinterpret.store_url !== 'undefined') {
        data.store_url = _webinterpret.store_url;
    }
    if (typeof _webinterpret.product_id !== 'undefined') {
        data.product_id = _webinterpret.product_id;
    }
    if (typeof _webinterpret.plugin_version !== 'undefined') {
        data.script_version = _webinterpret.plugin_version;
    }
    if (typeof _webinterpret.ui_version !== 'undefined') {
        data.ui_version = _webinterpret.ui_version;
    }

    if (window._paq) {
        _paq.push(['trackEvent', category, webinterpret_httpBuildQuery(data)]);
    }
    if (window._analytics) {
        if (typeof data.name !== 'undefined') {
            data.label = data.name.substring(0, 500);
        }else{
            data.label = '';
        }

        // check if the fields are set
        if (typeof data.category === 'undefined' || data.category === '') {
            data.category = 'not_set';
        }

        if (typeof data.action === 'undefined' || data.action === '') {
            data.action = 'not_set';
        }

        if (typeof data.label === 'undefined' || data.label === '') {
            data.label = 'not_set';
        }

        // @see https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference#eventAction
        // Google accepts 500 bytes long action and label (be careful though as non-standard chars in UTF-8 can take
        // up to 4 bytes)
        _analytics('webinterpret.send', 'event', data.category, data.action.substring(0,500), data.label);
    }
}

function webinterpret_extend() {
    var extended = {};

    for(key in arguments) {
        var argument = arguments[key];
        for (prop in argument) {
            if (Object.prototype.hasOwnProperty.call(argument, prop)) {
                extended[prop] = argument[prop];
            }
        }
    }

    return extended;
}

window.onbeforeunload = function () {
    if(_webinterpret.redirector_visible) {
        webinterpret_trackEvent('redirector.success', { action: 'close', name: 'page_closed' });
    }
};

/* Webinterpret.RedirectModal */
(function() {

    Webinterpret = new Object();

    Webinterpret.RedirectModal = function(el, footer, options) {
        var base = this;

        // Current time
        base.now = function() {
            return (new Date()).getTime();
        };

        // Modal expiry
        base.expires = function() {
            return base.now() + base.options.expires * 1000;
        };

        // Test if user has closed modal
        base.isHidden = function(id) {
            return (parseInt(localStorage.getItem('webinterpret-redirect-hide-' + id)) >= base.now());
        }

        // Test if user is VAT exemption eligible
        base.hasDiscount = function(exemption) {
            return exemption ? true : false;
        }

        // Convert URL to protocol relative URL
        base.protocolRelativeUrl = function(url) {
            url = url.replace('http://', '//');
            url = url.replace('https://', '//');
            return url;
        }

        // Generate HTML structure
        base.generateHTML = function(discount) {
            if(discount) {
                el.innerHTML = "<div id='wi-cr-container'><section id='wi-cr-modal' class='wi-cr-modal--discount'><div id='wi-cr-badge' class='wi-600'><span id='wi-cr-discount'></span><sub id='wi-cr-percentage'>%</sub></div><h1 id='wi-cr-title' class='wi-t-uppercase wi-600'></h1><hr id='wi-sep'><img id='wi-cr-logo'><p id='wi-cr-text'></p><a id='wi-cr-button' class='wi-t-uppercase wi-600'></a><div id='wi-cr-close'></div></section></div>";
            } else {
                el.innerHTML = "<div id='wi-cr-container'><section id='wi-cr-modal'><h1 id='wi-cr-title' class='wi-t-uppercase wi-600'></h1><hr id='wi-sep'><img id='wi-cr-logo'><p id='wi-cr-text'></p><a id='wi-cr-button' class='wi-t-uppercase wi-600'></a><div id='wi-cr-close'></div></section></div>";
            }
        }

        // Generate FOOTER structure
        base.generateBar = function(data) {
            if(data.hasOwnProperty('flag')) {
                data.flag = data.flag.replace('/media/webinterpret', _webinterpret.asset_path+'/img');
            } else {
                data.flag = null;
            }
            footer.innerHTML = "<a id='wi-fixedBar-button' href='" + data.url + "'>" +
                "<div id='wi-flag'>" +
                "<img src='" + data.flag + "' alt='" + data.country_code + "'>" +
                "</div>" +
                "<span class='wi-hidden-xs'><span class='wi-link'>" + webinterpret_replaceTags(webinterpret_getText(data.locale_code)[data.translation].footerClick, data, ['VAT_exemption']) + "</span> " + webinterpret_replaceTags(webinterpret_getText(data.locale_code)[data.translation].footerLink, data, ['VAT_exemption']) + "</span>" +
                "<span class='wi-link wi-visible-xs'>" + webinterpret_replaceTags(webinterpret_getText(data.locale_code)[data.translation].footerMobile, data, ['VAT_exemption']) + "</span>" +
                "</a>";
        }

        // Fill modal with content
        base.fill = function(data) {
            if(base.hasDiscount(data.VAT_exemption)){
                document.querySelector('#wi-cr-discount').innerHTML = '-' + data.VAT_exemption;
            }
            document.querySelector('#wi-cr-logo').setAttribute('src', base.protocolRelativeUrl(data.store_logo));
            document.querySelector('#wi-cr-title').innerHTML = webinterpret_getText(data.locale_code)[data.translation].title;
            document.querySelector('#wi-cr-text').innerHTML = webinterpret_replaceTags(webinterpret_getText(data.locale_code)[data.translation].text, data, ['VAT_exemption']);
            document.querySelector('#wi-cr-button').innerHTML = webinterpret_replaceTags(webinterpret_getText(data.locale_code)[data.translation].button, data, ['VAT_exemption']);
            document.querySelector('#wi-cr-button').setAttribute('href', data.url);
            document.querySelector('#wi-cr-close').innerHTML = webinterpret_getText(data.locale_code)[data.translation].underButton;
        };

        //check for ie version
        base.isIE = function () {
            var myNav = navigator.userAgent.toLowerCase();
            return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
        }

        // Display or hide modal
        base.display = function(state) {
            var wi_cr = document.querySelector("#wi-cr"),
                wi_footer = document.querySelector("#wi-fixedBar");

            if (state === true) {
                wi_cr.classList.add('wi-is-visible');
                wi_footer.classList.remove('wi-is-visible');
                _webinterpret.redirector_visible = true;
                // webinterpret_trackEvent('redirector.success', { action: 'show', name: '' });
            } else {
                wi_cr.classList.remove('wi-is-visible');
                wi_footer.classList.add('wi-is-visible');
                wi_footer.classList.remove('wi-is-hidden');
                _webinterpret.redirector_visible = false;
            }

            if (base.isIE == 8) {
                var timeout;
                function update_position() {
                    var modal = document.querySelector('#wi-cr-modal');
                    modal.style.top = ((wi_cr.offsetHeight() - modal.offsetHeight()) / 2) + 'px !important';
                    modal.style.top = ((wi_cr.offsetHeight() - modal.offsetHeight()) / 2) + 'px !important';
                }
                update_position();
                window.onresize = function(){
                    clearTimeout(timeout);
                    timeout = setTimeout(update_position, 500);
                };
            }
        };

        //handle ajax success
        base.handleAjaxSuccess = function(data) {
            if (!data || (typeof data != 'object')) {
                webinterpret_trackEvent('redirector.fail', { action: 'error', name: 'data_not_found' });
                return;
            }
            /* set custom GA dimensions based on AJAX response */
            // store shortname
            if(data.hasOwnProperty('store_short_name')) {
                window._analytics('webinterpret.set', 'dimension2', data.store_short_name);
            } else {
                window._analytics('webinterpret.set', 'dimension2', 'not_set');
            }

            // store platform
            if(data.hasOwnProperty('platform')) {
                window._analytics('webinterpret.set', 'dimension3', data.platform);
            }

            // store status
            if(data.hasOwnProperty('store_status')) {
                window._analytics('webinterpret.set', 'dimension4', data.store_status);
            } else {
                window._analytics('webinterpret.set', 'dimension4', 'not_set');
            }

            // store country
            if(data.hasOwnProperty('store_country_code')) {
                window._analytics('webinterpret.set', 'dimension5', data.store_country_code);
            }

            // visitor location
            if(data.hasOwnProperty('country_code')) {
                window._analytics('webinterpret.set', 'dimension9', data.country_code);
            }

            // foreign traffic
            if(data.hasOwnProperty('foreign_traffic')) {
                window._analytics('webinterpret.set', 'dimension10', (data.foreign_traffic === true ? '1' : '0'));
            }
            
            // send to translation on demand
            if(data.hasOwnProperty('send_to_ae')) {
                webinterpret_trackEvent('redirector.data', { action: 'send_to_ae', name: data.country_code, message: '' });
            }

            if (data.hasOwnProperty('status') && data.status == 'error') {
                if (data.hasOwnProperty('errors') && (data.errors.constructor === Array)) {
                    if (data.errors.length > 0 && data.errors[0].hasOwnProperty('name')) {
                        var errorCode = data.errors[0].name.toLowerCase();
                        var errorMessage = '';
                        if (data.errors[0].hasOwnProperty('description')) {
                            errorMessage = data.errors[0].description;
                        }
                        if(data.country_code == '') data.country_code = 'not_set';
                        if(data.store_status == '') data.store_status = 'not_set';
                        switch (errorCode) {
                            case 'notsupportedcountry':
                                webinterpret_trackEvent('redirector.fail', { action: 'country_not_enabled', name: data.country_code, message: errorMessage });
                                break;
                            case 'country_code':
                                webinterpret_trackEvent('redirector.fail', { action: 'country_unsupported', name: data.country_code, message: errorMessage });
                                break;
                            case 'is_active':
                                webinterpret_trackEvent('redirector.fail', { action: 'store_status', name: data.store_status, message: errorMessage });
                                break;
                            case 'store_url':
                                webinterpret_trackEvent('redirector.fail', { action: 'error', name: 'store_url_not_found', message: errorMessage });
                                break;
                            case 'id':
                                webinterpret_trackEvent('redirector.fail', { action: 'not_imported', name: 'not_set', message: errorMessage });
                                break;
                            case 'iplocationerror':
                                webinterpret_trackEvent('redirector.fail', { action: 'error', name: 'geo_ip_error', message: errorMessage });
                                break;
                            case 'noremoteaddress':
                                webinterpret_trackEvent('redirector.fail', { action: 'error', name: 'no_remote_address', message: errorMessage });
                                break;
                            case 'availability':
                                webinterpret_trackEvent('redirector.fail', { action: 'not_translated', name: data.country_code, message: errorMessage });
                                break;
                            case 'not_imported_oos':
                                webinterpret_trackEvent('redirector.fail', { action: 'not_imported', name: 'out_of_stock', message: errorMessage });
                                break;
                            case 'not_imported_pt':
                                webinterpret_trackEvent('redirector.fail', { action: 'not_imported', name: 'unsupported_product_type', message: errorMessage });
                                break;
                            case 'not_imported':
                                webinterpret_trackEvent('redirector.fail', { action: 'not_imported', name: 'not_set', message: errorMessage });
                                break;
                            case 'out_of_stock':
                                webinterpret_trackEvent('redirector.fail', { action: 'out_of_stock', name: 'not_set', message: errorMessage });
                                break;
                            case 'blacklisted':
                                webinterpret_trackEvent('redirector.fail', { action: 'blacklisted', name: 'not_set', message: errorMessage });
                                break;
                            default:
                                webinterpret_trackEvent('redirector.fail', { action: 'error', name: 'error_unknown_' + errorCode, message: errorMessage });
                        }
                        return;
                    }
                }
                webinterpret_trackEvent('redirector.fail', { action: 'error', name: 'no_error_code_found' });
                return;
            }
            if (!data.hasOwnProperty('available')) {
                webinterpret_trackEvent('redirector.fail', { action: 'error', name: 'availability_status_not_found' });
                return;
            }

            // don't generate the HTML for redirector or footer bar if they won't get displayed
            if (data.available === false) {
                return;
            }

            try {
                window._webinterpret.visitor_locale = data.country_code;

                if(typeof _webinterpret.store_ext_available !== 'undefined' && _webinterpret.store_ext_available == 'yes') {
                    data.url = _webinterpret.store_url + '/glopal/' + data.locale_code + '/p-' + _webinterpret.product_id + '.html';
                }
                if(data.url && base.options.utm) {
                    if (data.url.indexOf("?") > -1) {
                        data.url = String(data.url) + '&' + base.options.utm;
                    } else {
                        data.url = String(data.url) + '?' + base.options.utm;
                    }
                }
                //temporary hardcoded exceptions for testing purposes
                if(data.store_short_name !== 'undefined' && data.store_short_name == 'uutensil') { _webinterpret.automatic_redirect = 'yes'; }

                // Automatic redirection without showing modal
                if(typeof _webinterpret.automatic_redirect !== 'undefined' && _webinterpret.automatic_redirect == 'yes') {
                    webinterpret_trackEvent('redirector.success', { action: 'open', name: 'automatic_redirection' });
                    window.location.replace(data.url);
                    return;
                }

                // Check if we have VAT exemption
                if(base.hasDiscount(data.VAT_exemption)) {
                    //Remove floating point from VAT
                    if(data.VAT_exemption % 1 != 0) {
                        webinterpret_trackEvent('redirector.fail', { action: 'error', name: 'vat_decimal_value' });
                    }
                    // Rounds down
                    data.VAT_exemption = Math.floor(data.VAT_exemption);

                    data.translation = 'discount';
                    base.generateHTML(true)
                } else {
                    data.translation = 'noDiscount';
                    base.generateHTML(false);
                }
                base.generateBar(data);

                // Click on close button
                document.querySelector('#wi-cr-close').onclick = function() {
                    base.display(false);
                    localStorage.setItem('webinterpret-redirect-hide-' + _webinterpret.product_id, base.expires().toString());
                    webinterpret_trackEvent('redirector.success', { action: 'close', name: 'minimize_modal_button' });
                };

                // Click on page background
                if (base.options.closeOnPageBackgroundClick) {
                    document.querySelector('#wi-cr-container').onclick  = function(e) {
                        if (e.target != this) {
                            return;
                        }
                        localStorage.setItem('webinterpret-redirect-hide-' + _webinterpret.product_id, base.expires().toString());
                        base.display(false);
                        webinterpret_trackEvent('redirector.success', { action: 'close', name: 'minimize_page_background' });
                    };
                }

                // Click on OK button
                document.querySelector('#wi-cr-button').onclick = function(e) {
                    if (e.target != this) {
                        return;
                    }
                    window.onbeforeunload = null;
                    webinterpret_trackEvent('redirector.success', { action: 'open', name: 'button' });
                };

                // Click on OK fixed bar button
                document.querySelector('#wi-fixedBar-button').onclick = function() {
                    window.onbeforeunload = null;
                    webinterpret_trackEvent('redirector.success', { action: 'open', name: 'minimized' });
                };

                base.fill(data);

                //Hide localStorage has info
                if (base.isHidden(_webinterpret.product_id)) {
                    // webinterpret_trackEvent('redirector.start_minimized', { action: 'auto', name: 'open' });
                    base.display(false);
                } else {
                    base.display(true);
                }
            } catch (err) {
                webinterpret_trackEvent('redirector.fail', { action: 'error', name: 'show_modal_failed' });
            }

        }

        // Initialize modal
        base.init = function() {
            try {
                base.options = webinterpret_extend({}, Webinterpret.RedirectModal.defaultOptions, options);

                //run ajax
                var request = new XMLHttpRequest();
                request.onreadystatechange = function() {
                    if(request.readyState === 4) {
                        window._analytics('webinterpret.set', 'dimension1', request.status.toString());

                        data = JSON.parse(request.response);

                        //on success
                        if(request.status === 200) {
                            base.handleAjaxSuccess(data);
                            //on server error
                        } else {
                            webinterpret_trackEvent('redirector.fail', { action: 'error', name: 'error_'+request.status });
                        }
                    }
                }
                request.onerror = function() {
                    webinterpret_trackEvent('redirector.fail', { action: 'error', name: 'ajax_error_' + request.statusText });
                }
                request.open('GET', base.options.url);
                request.send();

            } catch (e) {
                webinterpret_trackEvent('redirector.fail', { action: 'error', name: 'init_modal_failed' });
            }
        };
        base.init();
    };

    Webinterpret.RedirectModal.defaultOptions = {
        url : null,
        utm : null,
        expires : 3600,
        closeOnPageBackgroundClick : false,
    };

    var _webinterpret_launchRedirectModal = function() {
        try {
            if (!_webinterpret.hasOwnProperty('product_redirect_url') || !_webinterpret.hasOwnProperty('product_redirect_utm')) {
                return;
            }
            if (document.querySelectorAll('#wi-cr').length < 1) {
                var div = document.createElement('div');
                div.id = 'wi-cr';
                document.body.insertBefore(div, null);
            }
            if (document.querySelectorAll('#wi-fixedBar').length < 1) {
                var div = document.createElement('div');
                div.id = 'wi-fixedBar';
                div.className = 'wi-is-hidden';
                document.body.insertBefore(div, null);
            }
            var options = {
                url : _webinterpret.product_redirect_url,
                utm : _webinterpret.product_redirect_utm,
            };
            var wi = new Webinterpret.RedirectModal(document.querySelector('#wi-cr'), document.querySelector('#wi-fixedBar') , options);
        } catch (e) {
            webinterpret_trackEvent('redirector.fail', { action: 'error', name: 'launch_modal_failed' });
        }
    }

    // Should we show the redirector?
    if (_webinterpret.hasOwnProperty('product_id') && _webinterpret.product_id.length > 0) {
        _webinterpret_launchRedirectModal();
    }

})();
var _paq = _paq || [];
_paq.push(['trackPageView']);
_paq.push(['enableLinkTracking']);
(function() {
var u='https://analytics.glopal.com/';
_paq.push(['setTrackerUrl', u+'piwik.php']);
_paq.push(['setSiteId', 5]);
var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
g.type='text/javascript'; g.async=true; g.defer=true; g.src=u+'piwik.js'; s.parentNode.insertBefore(g,s);
})();
