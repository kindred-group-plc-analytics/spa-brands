var functions = (utag.helpers && utag.helpers.functions) ? utag.helpers.functions : {};

b.campaign_tracking_code = functions.getTrackingCode();

var section = (window.location.pathname !== '/' ? window.location.pathname.split('/')[1] : 'home');
b.adb_section = section;
if (section == 'promotions' || section == 'tarjoukset') {
    // tarjoukset is the promotions listing page in KP;
    var promotionName = functions.getPromotionName();
    if (promotionName && promotionName !== '')
        b.adb_promotion_name = promotionName;
}

if (b.brand == 'maria') {
    // Pass data Layer to Maria function.
    // Within the function, the proper page name is returned.
    b.adb_pageName = functions.getPageNameMaria(b);
} else {
    b.adb_pageName = functions.getPageName(b.navigationState);
}

// Game pages have on the URL the game version.
// Remove this to decrease granularity
if (section == 'pelit' || section == 'game') {
    var re = /(-mobile)?[0-9\-]*((\/|:)play-for-fun)?$/;
    b.adb_pageName = b.adb_pageName.toString().replace(re, '');
}

b.adb_logged_in = functions.getLoginStatus();

b.adb_domain = window.location.hostname;

b.customer_id = b.userId || '';

b.adb_currency_code = b.currency || 'GBP';

b.adb_new_repeat = functions.getNewRepeat();

b.adb_time_parting = functions.timeParting('n', '0');

b.adb_timestamp = Math.round(new Date().getTime() / 1000).toString();

b.adb_launch_build_date = utag.cfg.v || '';

var client_id = [(b.clientId || b['cp.clientId'] || 'No ClientID'), (b.cms || 'No CMS'), (b.locale || 'No Locale'), (b.jurisdiction || 'No Juristiction')];
var client_id = client_id.join('^');

if (a == 'view') {
    b.adb_client_id = client_id;
    // Persist client ID for link events that are missing the information.
    if (!b['cp.utag_main_adb_client_id'])
        utag.loader.SC('utag_main', { 'adb_client_id': client_id + ';exp-session' });
} else {
    b.adb_client_id = b['cp.utag_main_adb_client_id'];
}

b.full_page_url = window.location.href;

// Code that needs to execute only on page views and not on link events.
if (a == 'view') {
    b.adb_previous_page_name = b['cp.utag_main__prevpage'];
    utag.loader.SC('utag_main', {
        '_prevpage': b.adb_pageName + ';exp-session'
    });

    b.adb_previous_full_url = b['cp.utag_main__prevnew_full_url'];
    utag.loader.SC('utag_main', {
        '_prevnew_full_url': b.full_page_url + ';exp-session'
    });
}