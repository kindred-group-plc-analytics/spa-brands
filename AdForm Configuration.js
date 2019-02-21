var functions = (utag.helpers && utag.helpers.functions) ? utag.helpers.functions : {};
var adf_timestamp = new Date().toString();

var adfPageName = function (adf_page_name) {
    var itm = "{";
    if (/^(loginSuccess|depositCompleted|registrationSuccessful|pageLoaded)$/.test(b.event_name)) {
        if (typeof (b.amount) != "undefined") itm += 'sl:"' + b.amount.toString() + '",';
        if (typeof (b.paymentTransactionId) != "undefined") itm += 'id:"' + b.paymentTransactionId + '",';
        if (typeof (b.userId) != "undefined") itm += 'sv1:"' + b.userId + '",';
        if (typeof (b.noOfDeposits) != "undefined") itm += 'sv2:"' + b.noOfDeposits.toString() + '",';
        if (typeof (b.adf_timestamp) != "undefined") itm += 'sv3:"' + adf_timestamp + '",';
        if (typeof (b.adb_section) != "undefined") itm += 'sv4:"' + b.adb_section + '",';
        if (typeof (b.currency) != "undefined") itm += 'sv5:"' + b.currency + '",';
        if (typeof (b['cp.utag_main_adform']) != "undefined") itm += 'sv20:"' + b['cp.utag_main_adform'] + '",';
    }
    itm += 'sv6:"' + adf_page_name + '"';
    itm += "}";
    itm = itm.replace(',}', '}');
    return encodeURIComponent(itm);
};

var chunk = function(input, prefix) {
    //split into 1000 char chunks
    var ch = input.match(/.{1,1000}/g);
    for (var i = 0; i < ch.length; i++) {
        //the first one has no suffix, then the second has suffix 2 etc
        var idx = i == 0 ? '' : (i+1).toString();
        b[prefix + idx] = ch[i];
    }
};

// User-friendly version of the page name for AdForm.
// var genericPageName = functions.getPageName(b.navigationState);

// URL version of the page name for AdForm.
var genericPageName = document.location.pathname;

// Clean up AdForm name - remove games version.
var re = /(-mobile)?[0-9\-]*((\/|:)play-for-fun)?$/;
genericPageName = genericPageName.replace(re, '');

if (b.event_name == 'depositCompleted') {
    genericPageName = 'Deposit Completed';
} else if (b.event_name == 'loginSuccess') {
    genericPageName = 'Login Completed';
} else if (b.event_name == 'registrationSuccessful') {
    genericPageName = 'Registration Completed';
}

var adf_itm = adfPageName(genericPageName);

chunk(adf_itm, 'adf_itm');