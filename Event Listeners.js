var formatDataLayer = function (dataLayer, event_name) {
    utag_data_custom = {};
    utag_data_custom['event_name'] = event_name;

    for (var property in dataLayer) {
        if (dataLayer.hasOwnProperty(property)) {
            utag_data_custom[property] = dataLayer[property];
        }
    }
    utag_data_custom['timestamp'] = new Date();

    return utag_data_custom;
}

var pageLoadWrapper = function (isFallbackPageView, event_sub_name) {

    var pageLoad = function pageLoad(evt) {

        if ((isFallbackPageView == false) ||
            (isFallbackPageView == true && !utag.pageLoadedFallback)) {

            var dataLayer = evt.detail;

            utag_data_custom = formatDataLayer(dataLayer, 'pageLoaded' );

            if (isFallbackPageView == true)
                utag_data_custom['page_loaded_fallback'] = true;

            if (event_sub_name)
                utag_data_custom['event_sub_name'] = event_sub_name;

            utag.pageLoadedFallback = true;
            utag.view(utag_data_custom);
        }
        /*
        utag.view({
            'event_name': 'pageLoaded',
            'user_id': window.cms.user.customerId,
            'is_app': window.cms.device.isApp,
            'timestamp': new Date(),
            'newly_auth': window.cms.user.newlyAuthenticated,
            'adf_channel': _satellite.cookie.get("AdformChannel")
        });
        */
    }
    return pageLoad;
}

var eventTrigger = function eventTrigger(evt) {

    var eventName = evt.type;
    var dataLayer = evt.detail;

    utag_data_custom = formatDataLayer(dataLayer, eventName);

    utag.link(utag_data_custom);
};

var dtmElement = document.getElementById('dtmEventTarget');

// Page View Event Listener
dtmElement.addEventListener('pageView', pageLoadWrapper(false));

// Fallback method incase dtmEvent is delayed.
// window.addEventListener("load", pageLoadWrapper(true));

dtmElement.addEventListener('loginSuccess', eventTrigger);

// Game Launch Event Listener
dtmElement.addEventListener('gameLaunch', eventTrigger);

// Bonus Accepted
dtmElement.addEventListener('bonusAccept', eventTrigger);

// Withdrawl Completed 
dtmElement.addEventListener('withdrawalCompleted', eventTrigger);

// Promotion Opt-in Event - Explicit promotions
dtmElement.addEventListener('PromotionOptIn', eventTrigger);