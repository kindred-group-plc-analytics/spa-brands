var functions = (utag.helpers && utag.helpers.functions) ? utag.helpers.functions : {};

b.campaign_tracking_code = functions.getTrackingCode();

if (!b.adb_section) {
    var section = (window.location.pathname !== '/' ? window.location.pathname.split('/')[1] : 'home');
    if (b.adb_section == 'promotions' || b.adb_section == 'tarjoukset') {
        // tarjoukset is the promotions listing page in KP;
        var promotionName = functions.getPromotionName();
        if (promotionName && promotionName !== '')
            b.adb_promotion_name = promotionName;
    }
}

if (!b.adb_pageName) {
    // If pageName has been defined upstream i.e. more specific extension do not update.
    if (b.brand == 'maria') {
    // Pass data Layer to Maria function.
    // Within the function, the proper page name is returned.
    b.adb_pageName = functions.getPageNameMaria(b);
} else {
    b.adb_pageName = functions.getPageName(b.navigationState);
}
}

// Game pages have on the URL the game version.
// Remove this to decrease granularity
if (b.adb_section == 'pelit' || b.adb_section == 'game') {
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

var adb_client_id_part = (b.clientId || b['cp.clientId'] || 'No ClientID');
var adb_cms = (b.cms || 'No CMS');
var adb_locale = (b.locale || 'No Locale');
var adb_jurisdiction = (b.jurisdiction || 'No Juristiction');
// var client_id = [(b.clientId || b['cp.clientId'] || 'No ClientID'), (b.cms || 'No CMS'), (b.locale || 'No Locale'), (b.jurisdiction || 'No Juristiction')];
var adb_client_id = [adb_client_id_part, adb_cms, adb_locale, adb_jurisdiction].join('^');

if (a == 'view') {
    b.adb_client_id = adb_client_id;
    // Persist client ID for link events that are missing the information.
    if (!b['cp.utag_main_adb_client_id'])
        utag.loader.SC('utag_main', { 'adb_client_id': adb_client_id + ';exp-session' });

    // Updated version - Variables are splitted so they can be used in rules.
    b.adb_client_id_part = adb_client_id_part;
    b.adb_locale = adb_locale;
    b.adb_cms = adb_cms;
    b.adb_jurisdiction = adb_jurisdiction;

    if (!b['cp.utag_main_adb_client_id_part'])
        utag.loader.SC('utag_main', { 'adb_client_id_part': adb_client_id_part + ';exp-session' });
    if (!b['cp.utag_main_adb_cms'])
        utag.loader.SC('utag_main', { 'adb_cms': adb_cms + ';exp-session' });
    if (!b['cp.utag_main_adb_locale'])
        utag.loader.SC('utag_main', { 'adb_locale': adb_locale + ';exp-session' });
    if (!b['cp.utag_main_adb_jurisdiction'])
        utag.loader.SC('utag_main', { 'adb_jurisdiction': adb_jurisdiction + ';exp-session' });

} else {
    b.adb_client_id = b['cp.utag_main_adb_client_id'];

    // Updated version - Variables are splitted so they can be used in rules.
    b.adb_client_id_part = b['cp.utag_main_adb_client_id_part'];
    b.adb_locale = b['cp.utag_main_adb_locale'];
    b.adb_cms = b['cp.utag_main_adb_cms'];
    b.adb_jurisdiction = b['cp.utag_main_adb_jurisdiction'];
}

b.full_page_url = window.location.href;

// Code that needs to execute only on page views and not on link events.
if (a == 'view') {
    // Over-write cookies only on view events.    
    utag.loader.SC('utag_main', {
        '_prevpage': b.adb_pageName + ';exp-session'
    });
    b.adb_previous_page_name = b['cp.utag_main__prevpage'];
    utag.loader.SC('utag_main', {
        '_prevnew_full_url': b.full_page_url + ';exp-session'
    });
    b.adb_previous_full_url = b['cp.utag_main__prevnew_full_url'];
}