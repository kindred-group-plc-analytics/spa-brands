// Define Report Suites and brand name
var SUFFIX_DEV = 'dev';
var SUFFIX_PROD = 'prod';
var SPA_BRANDS_REPORT_SUITE = 'unibetlondonsinglepagebrands';

var brand = b.brand || '';

if (brand && brand !== '') {
    var domain = window.location.hostname;
    var domain_parts = domain.split('.');

    var sub_domain = domain_parts[0];
    var root_domain = domain_parts.splice(1)[0];

    var production_details = {
        'maria': {
            'subdomain': ['www', 'no', 'fi', 'eu', 'welcome'],
            'host': ['mariacasino'],
            'reportsuite': SPA_BRANDS_REPORT_SUITE
        },
        'igame': {
            'subdomain': ['www', 'fi', 'se', 'no'],
            'host': ['igame'],
            'reportsuite': SPA_BRANDS_REPORT_SUITE
        },
        'kolikkopelit': {
            'subdomain': ['www'],
            'host': ['kolikkopelit'],
            'reportsuite': SPA_BRANDS_REPORT_SUITE
        },
        'huone': {
            'subdomain': ['www'],
            'host': ['casinohuone'],
            'reportsuite': SPA_BRANDS_REPORT_SUITE
        }
    }

    var isProduction = true;

    if (!(production_details[brand] && (production_details[brand].subdomain.indexOf(sub_domain) > -1) &&
        (production_details[brand].host.indexOf(root_domain) > -1))) {
        isProduction = false;
    }

    var reportsuite = production_details[brand].reportsuite;
    if (isProduction) {
        // reportsuite += 'prod';
        reportsuite += SUFFIX_PROD;
    } else {
        reportsuite += SUFFIX_DEV;
    }

    b.adb_report_suite = reportsuite.toLowerCase();
    b.adb_site_brand = brand.toLowerCase();

    // Some link events do not have brand details.
    utag.adb_report_suite = utag.adb_report_suite || b.adb_report_suite;
    utag.adb_site_brand = utag.adb_site_brand || b.adb_site_brand;
} else {
    b.adb_report_suite = utag.adb_report_suite;
    b.adb_site_brand = utag.adb_site_brand;
}

if (!b.adb_report_suite) {
    b.adb_report_suite = SPA_BRANDS_REPORT_SUITE + SUFFIX_PROD;
}

// Temporary secondary server calls to the old report suites until completely switched-off
if (b.adb_site_brand == 'maria') {
    b.adb_report_suite += ',unibetlondonmaria' + SUFFIX_PROD;
} else if (b.adb_site_brand == 'igame') {
    b.adb_report_suite += ',unibetlondonigame' + SUFFIX_PROD;
}