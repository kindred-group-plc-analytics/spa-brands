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

            // ADC-1004 - Treat login pop-up as link and not view.
            // A utag.link event treats previous page information differently than a utag.view event.
            if (dataLayer.navigationState === 'login') {
                // Custom event name is sent as pageLoaded so that the generic Page Views Feed in ES still works.
                eventTrigger(evt, 'pageLoaded');
            } else {
                utag_data_custom = formatDataLayer(dataLayer, 'pageLoaded');

                if (isFallbackPageView == true)
                    utag_data_custom['page_loaded_fallback'] = true;

                if (event_sub_name)
                    utag_data_custom['event_sub_name'] = event_sub_name;

                utag.pageLoadedFallback = true;
                utag.view(utag_data_custom);
            }
        }
    }
    return pageLoad;
}

var eventTrigger = function eventTrigger(evt, customEventName) {

    var eventName
    if (customEventName)
        eventName = customEventName;
    else
        eventName = evt.type;
    var dataLayer = evt.detail;

    utag_data_custom = formatDataLayer(dataLayer, eventName);

    utag.link(utag_data_custom);
};

var dtmElement = document.getElementById('dtmEventTarget');

// Page View
dtmElement.addEventListener('pageView', pageLoadWrapper(false));

// Fallback method incase dtmEvent is delayed.
// window.addEventListener("load", pageLoadWrapper(true));

// Login
dtmElement.addEventListener('loginSuccess', eventTrigger);

// Registration
dtmElement.addEventListener('registrationSuccessful', eventTrigger);

// Game Launch
dtmElement.addEventListener('gameLaunch', eventTrigger);

// Bonus Accepted
dtmElement.addEventListener('bonusAccept', eventTrigger);

// Withdrawl Completed 
dtmElement.addEventListener('withdrawalCompleted', eventTrigger);

// Deposit Requested
dtmElement.addEventListener('depositCompleted', eventTrigger);

// Promotion Opt-in Event - Explicit promotions
dtmElement.addEventListener('PromotionOptIn', eventTrigger);