var functions = (utag.helpers && utag.helpers.functions) ? utag.helpers.functions : {};

b.campaign_tracking_code = functions.getTrackingCode();

if (!b.adb_section) {
    b.adb_section = (window.location.pathname !== '/' ? window.location.pathname.split('/')[1] : 'home');
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
b.adb_new_repeat = functions.getNewRepeat(b.adb_logged_in);
b.adb_time_parting = functions.timeParting('n', '0');
b.adb_timestamp = Math.round(new Date().getTime() / 1000).toString();
b.adb_launch_build_date = utag.cfg.v || '';

// Client ID and locale information section
var adb_client_id_part = (b.clientId || b['cp.clientId'] || 'No ClientID');
var adb_cms = (b.cms || 'No CMS');
var adb_locale = (b.locale || 'No Locale');
var adb_jurisdiction = (b.jurisdiction || 'No Juristiction');
var adb_client_id = [adb_cms, adb_client_id_part, adb_locale, adb_jurisdiction].join('^');

// Home Page finding methods
//
var hpFindingMethod = functions.storageManagement._getStorage('sessionStorage', 'homePageFindingMethod');
if (hpFindingMethod) {
    b.adb_evar5 = hpFindingMethod;
    functions.storageManagement._deleteStorage('sessionStorage', 'homePageFindingMethod');
}

if (a == 'view') {
    b.adb_client_id = adb_client_id;
    functions.storageManagement._setStorage('sessionStorage', 'adb_client_id', adb_client_id);
    // Persist client ID for link events that are missing the information.
    // if (!b['cp.utag_main_adb_client_id'])
    //     utag.loader.SC('utag_main', { 'adb_client_id': adb_client_id + ';exp-session' });

    // Updated version - Variables are splitted so they can be used in rules.
    b.adb_client_id_part = adb_client_id_part;
    functions.storageManagement._setStorage('sessionStorage', 'adb_client_id_part', adb_client_id_part);
    b.adb_locale = adb_locale;
    functions.storageManagement._setStorage('sessionStorage', 'adb_locale', adb_locale);
    b.adb_cms = adb_cms;
    functions.storageManagement._setStorage('sessionStorage', 'adb_cms', adb_cms);
    b.adb_jurisdiction = adb_jurisdiction;
    functions.storageManagement._setStorage('sessionStorage', 'adb_jurisdiction', adb_jurisdiction);

} else {
    // b.adb_client_id = b['cp.utag_main_adb_client_id'];
    b.adb_client_id = functions.storageManagement._getStorage('sessionStorage', 'adb_client_id');

    // Updated version - Variables are splitted so they can be used in rules.
    // b.adb_client_id_part = b['cp.utag_main_adb_client_id_part'];
    b.adb_client_id_part = functions.storageManagement._getStorage('sessionStorage', 'adb_client_id_part');

    //b.adb_locale = b['cp.utag_main_adb_locale'];
    b.adb_locale = functions.storageManagement._getStorage('sessionStorage', 'adb_locale');

    // b.adb_cms = b['cp.utag_main_adb_cms'];
    b.adb_cms = functions.storageManagement._getStorage('sessionStorage', 'adb_cms');

    // b.adb_jurisdiction = b['cp.utag_main_adb_jurisdiction'];
    b.adb_jurisdiction = functions.storageManagement._getStorage('sessionStorage', 'adb_jurisdiction');
}

b.full_page_url = window.location.href;


// Previous page information section
if (a === 'view') {
    // Set logic using sessionStorage.
    b.adb_previous_full_url = functions.storageManagement._getStorage('sessionStorage', 'adb_prevnew_full_url');
    b.adb_previous_page_name = functions.storageManagement._getStorage('sessionStorage', 'adb_previous_page_name');

    functions.storageManagement._setStorage('sessionStorage', 'adb_prevnew_full_url', b.full_page_url);
    functions.storageManagement._setStorage('sessionStorage', 'adb_previous_page_name', b.adb_pageName);

    // For link events, need to maintain the original values from the previous page and not the current
    functions.storageManagement._setStorage('sessionStorage', 'adb_prevnew_full_url_link', b.adb_previous_full_url);
    functions.storageManagement._setStorage('sessionStorage', 'adb_previous_page_name_link', b.adb_previous_page_name);
} else if (a === 'link') {
    b.adb_previous_full_url = functions.storageManagement._getStorage('sessionStorage', 'adb_prevnew_full_url_link');
    b.adb_previous_page_name = functions.storageManagement._getStorage('sessionStorage', 'adb_previous_page_name_link');
}