// Events Debugging.
function addListenerMulti(el, s, fn) {
    s.split(' ').forEach(e => el.addEventListener(e, fn, false));
}

var dtmELement = document.getElementById('dtmEventTarget');

var mainEvents = ['pageLoaded', 'frankelPageView'];
var promoEvents = ['PromotionOptIn', 'promoDetailsAction'];
var moneyEvents = ['SetDepositLimit', 'betAdd', 'betPlace', 'betPlaceFiller', 'bonusAccept', 'depositRequested', 'withdrawalCompleted'];
var gameEvents = ['GameLaunch', 'sportbookEvents'];
var randomEvents = ['exclusion', 'registrationSuccessful'];

var allEvents = mainEvents.concat(promoEvents).concat(moneyEvents).concat(gameEvents).concat(randomEvents);

//var eventsList = 'pageLoaded depositRequested registrationSuccessful withdrawalCompleted GameLaunch bonusAccept' +
//    ' promoDetailsAction exclusion SetDepositLimit bonusAccept PromotionOptIn loginSuccess sportbookEvents';

var callBackFunction = function (evt) {
    console.debug('-== Tealium Debugging Events : ' + evt.type + ' Start ==-');
    console.debug(evt);
    console.debug('-== Tealium Debugging Events : ' + evt.type + ' End ==-');
};

/*
document.getElementById('dtmEventTarget').addEventListener('sportbookEvents',function(ev){
    console.error('SPORTBOOK EVENT')
});*/
addListenerMulti(dtmELement, allEvents.join(' '), callBackFunction);


/*
* Test Handler
*/
var promoCallToAction = 'div[data-test-name=promotion-item] div[data-test-name=viewContainer] a[data-test-name=Button]'
$(document).click(promoCallToAction, function (ev) {
    console.log($(ev).text());
});


document.addEventListener('click', function (e) {
    debugger;
    //    if(e.target && e.target.id== 'brnPrepend'){//do something}
})


function gtagGlobalTag(id) {
    (function (d, script) {

        id = 'AW-816009983';
        script = document.createElement('script');
        script.src = '//www.googletagmanager.com/gtag/js?id=' + id
        script.type = 'text/javascript';
        script.async = true;
        script.onload = window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag('js', new Date());
        gtag('config', id);
        d.getElementsByTagName('head')[0].appendChild(script);


    }(document))
};

gtagGlobalTag('AW-816009983'); // ADC-291 (Adwords tracking)

var listenDepositStart = function (evt) {
    var payload = JSON.parse(evt.data);
    if (payload.type === 'paymentMethodLoaded') {
        // Trigger Tracking   
        debugger;
    }
}

window.addEventListener('message',listenDepositStart);