async function init() {
    try {
        // Retrieve user's country code
        const countryCode = await getCountryCode();
        // Retrieve user's currency info based on country code
        const currencyInfo = getCurrencyInfo(countryCode);
        // console.log(`Currency Code: ${currencyInfo.currencyCode}, Currency Symbol: ${currencyInfo.currencySymbol}`);

    } catch (error) {
        console.error('Initialization error:', error);
    }
}

window.addEventListener("load", init);

function getCountryCode() {
    return new Promise((resolve, reject) => {
        // Check if LoginStatus cookie exists and is "Login Successfully"
        const loginStatus = getCookie('LoginStatus');
        if (loginStatus === "Login Successfully") {
            // Check if the currentcurrency cookie is available
            const currentCurrencyCookie = getCookie('currentcurrency');
            if (currentCurrencyCookie) {
                resolve(currentCurrencyCookie); // Use cookie value if available
                return;
            }
        }

        // Remove timezone mapping, use default
        resolve("US");

    });
}

function getCurrencyInfo(countryCode) {
    // Check if LoginStatus cookie exists and is "Login Successfully"
    const loginStatus = getCookie('LoginStatus');
    if (loginStatus === "Login Successfully") {
        // Check if the currencysymbol and currentcurrency cookies are available
        const currencySymbolCookie = getCookie('currencysymbol');
        const currentCurrencyCookie = getCookie('currentcurrency');

        // Use cookie values if available
        if (currentCurrencyCookie && currencySymbolCookie) {
            return {
                currencyCode: currentCurrencyCookie,
                currencySymbol: currencySymbolCookie
            };
        }
    }

    // Fallback to country info-based currency details
    const countryInfo = CountryInfo[countryCode];
    if (countryInfo) {
        return {
            currencyCode: countryInfo.currencycode,
            currencySymbol: countryInfo.currencysymbol
        };
    } else {
        return {
            currencyCode: "USD",
            currencySymbol: "$"
        };
    }
}

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

export const timezoneCountryMap: Record<string, string> = {
    "Pacific/Midway": "US",
    "Pacific/Niue": "NU",
    "Pacific/Pago_Pago": "AS",
    "Pacific/Honolulu": "US",
    "America/Anchorage": "US",
    "America/Los_Angeles": "US",
    "America/Vancouver": "CA",
    "America/Tijuana": "MX",
    "America/Denver": "US",
    "America/Phoenix": "US",
    "America/Chicago": "US",
    "America/Mexico_City": "MX",
    "America/New_York": "US",
    "America/Toronto": "CA",
    "America/Halifax": "CA",
    "America/Sao_Paulo": "BR",
    "Atlantic/Azores": "PT",
    "Europe/London": "GB",
    "Europe/Dublin": "IE",
    "Europe/Lisbon": "PT",
    "Europe/Paris": "FR",
    "Europe/Brussels": "BE",
    "Europe/Berlin": "DE",
    "Europe/Rome": "IT",
    "Europe/Madrid": "ES",
    "Europe/Zurich": "CH",
    "Europe/Prague": "CZ",
    "Europe/Vienna": "AT",
    "Europe/Warsaw": "PL",
    "Europe/Stockholm": "SE",
    "Europe/Athens": "GR",
    "Europe/Bucharest": "RO",
    "Europe/Istanbul": "TR",
    "Africa/Cairo": "EG",
    "Africa/Johannesburg": "ZA",
    "Asia/Jerusalem": "IL",
    "Asia/Riyadh": "SA",
    "Asia/Dubai": "AE",
    "Asia/Karachi": "PK",
    "Asia/Kolkata": "IN",
    "Asia/Calcutta": "IN",
    "Asia/Dhaka": "BD",
    "Asia/Bangkok": "TH",
    "Asia/Kuala_Lumpur": "MY",
    "Asia/Singapore": "SG",
    "Asia/Manila": "PH",
    "Asia/Tokyo": "JP",
    "Asia/Seoul": "KR",
    "Asia/Hong_Kong": "HK",
    "Asia/Shanghai": "CN",
    "Asia/Taipei": "TW",
    "Asia/Jakarta": "ID",
    "Australia/Sydney": "AU",
    "Australia/Melbourne": "AU",
    "Australia/Brisbane": "AU",
    "Australia/Perth": "AU",
    "Pacific/Auckland": "NZ",
    "Pacific/Fiji": "FJ",
    "Pacific/Tongatapu": "TO",
    "Pacific/Apia": "WS",
    "Pacific/Guam": "GU",
    "Pacific/Port_Moresby": "PG",
    "Antarctica/McMurdo": "AQ",
    "Europe/Moscow": "RU",
    "Europe/Kiev": "UA",
    "Europe/Belgrade": "RS",
    "Europe/Amsterdam": "NL",
    "Europe/Copenhagen": "DK",
    "Europe/Helsinki": "FI",
    "Asia/Yerevan": "AM",
    "Asia/Tbilisi": "GE",
    "Asia/Baku": "AZ",
    "Asia/Almaty": "KZ",
    "Asia/Aqtobe": "KZ",
    "Asia/Novosibirsk": "RU",
    "Asia/Krasnoyarsk": "RU",
    "Asia/Vladivostok": "RU",
    "Asia/Magadan": "RU",
    "Indian/Mauritius": "MU",
    "Indian/Maldives": "MV",
    "Indian/Reunion": "RE",
    "Indian/Chagos": "IO",
    "Pacific/Guadalcanal": "SB",
    "Pacific/Noumea": "NC",
    "Africa/Lagos": "NG",
    "Africa/Nairobi": "KE",
    "Africa/Algiers": "DZ",
    "Africa/Casablanca": "MA",
    "Atlantic/Cape_Verde": "CV",
    "Atlantic/Reykjavik": "IS",
    "Atlantic/South_Georgia": "GS",
    "America/St_Johns": "CA",
    "America/Argentina/Buenos_Aires": "AR",
    "America/Argentina/Mendoza": "AR",
    "America/Caracas": "VE",
    "America/Lima": "PE",
    "America/Bogota": "CO",
    "America/Santiago": "CL",
    "America/Montevideo": "UY",
    "America/La_Paz": "BO",
    "America/Asuncion": "PY",
    "America/Havana": "CU",
    "America/Guatemala": "GT",
    "America/Panama": "PA",
    "America/Costa_Rica": "CR",
    "America/El_Salvador": "SV",
    "America/Tegucigalpa": "HN",
    "America/Kingston": "JM",
    "America/Port-au-Prince": "HT",
    "America/Dominica": "DM",
    "America/Barbados": "BB",
    "America/Belize": "BZ",
    "America/Nassau": "BS",
    "America/Bermuda": "BM",
    "America/Puerto_Rico": "PR",
    "America/Virgin": "VI",
    "Pacific/Easter": "CL",
    "Pacific/Galapagos": "EC"
};

export const CountryInfo: Record<string, { country_name: string; currencycode: string; currencysymbol: string }> = {
    "AF": {
        "country_name": "Afghanistan",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "AL": {
        "country_name": "Albania",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "DZ": {
        "country_name": "Algeria",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "AS": {
        "country_name": "American Samoa",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "AD": {
        "country_name": "Andorra",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "AO": {
        "country_name": "Angola",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "AI": {
        "country_name": "Anguilla",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "AQ": {
        "country_name": "Antarctica",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "AG": {
        "country_name": "Antigua and Barbuda",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "AR": {
        "country_name": "Argentina",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "AM": {
        "country_name": "Armenia",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "AW": {
        "country_name": "Aruba",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "AU": {
        "country_name": "Australia",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "AT": {
        "country_name": "Austria",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "AZ": {
        "country_name": "Azerbaijan",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "BS": {
        "country_name": "Bahamas",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "BH": {
        "country_name": "Bahrain",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "BD": {
        "country_name": "Bangladesh",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "BB": {
        "country_name": "Barbados",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "BY": {
        "country_name": "Belarus",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "BE": {
        "country_name": "Belgium",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "BZ": {
        "country_name": "Belize",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "BJ": {
        "country_name": "Benin",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "BM": {
        "country_name": "Bermuda",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "BT": {
        "country_name": "Bhutan",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "BO": {
        "country_name": "Bolivia",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "BQ": {
        "country_name": "Bonaire, Sint Eustatius and Saba",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "BA": {
        "country_name": "Bosnia and Herzegovina",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "BW": {
        "country_name": "Botswana",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "BV": {
        "country_name": "Bouvet Island",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "BR": {
        "country_name": "Brazil",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "IO": {
        "country_name": "British Indian Ocean Territory",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "BN": {
        "country_name": "Brunei Darussalam",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "BG": {
        "country_name": "Bulgaria",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "BF": {
        "country_name": "Burkina Faso",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "BI": {
        "country_name": "Burundi",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "CV": {
        "country_name": "Cabo Verde",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "KH": {
        "country_name": "Cambodia",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "CM": {
        "country_name": "Cameroon",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "CA": {
        "country_name": "Canada",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "KY": {
        "country_name": "Cayman Islands",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "CF": {
        "country_name": "Central African Republic",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "TD": {
        "country_name": "Chad",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "CL": {
        "country_name": "Chile",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "CN": {
        "country_name": "China",
        "currencycode": "MYR",
        "currencysymbol": "MYR"
    },
    "CX": {
        "country_name": "Christmas Island",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "CC": {
        "country_name": "Cocos (Keeling) Islands",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "CO": {
        "country_name": "Colombia",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "KM": {
        "country_name": "Comoros",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "CD": {
        "country_name": "Congo, Democratic Republic of the",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "CG": {
        "country_name": "Congo, Republic of the",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "CK": {
        "country_name": "Cook Islands",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "CR": {
        "country_name": "Costa Rica",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "HR": {
        "country_name": "Croatia",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "CU": {
        "country_name": "Cuba",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "CW": {
        "country_name": "Curaçao",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "CY": {
        "country_name": "Cyprus",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "CZ": {
        "country_name": "Czech Republic",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "DK": {
        "country_name": "Denmark",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "DJ": {
        "country_name": "Djibouti",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "DM": {
        "country_name": "Dominica",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "DO": {
        "country_name": "Dominican Republic",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "EC": {
        "country_name": "Ecuador",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "EG": {
        "country_name": "Egypt",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "SV": {
        "country_name": "El Salvador",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "GQ": {
        "country_name": "Equatorial Guinea",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "ER": {
        "country_name": "Eritrea",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "EE": {
        "country_name": "Estonia",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "SZ": {
        "country_name": "Swaziland",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "ET": {
        "country_name": "Ethiopia",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "FK": {
        "country_name": "Falkland Islands",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "FO": {
        "country_name": "Faroe Islands",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "FJ": {
        "country_name": "Fiji",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "FI": {
        "country_name": "Finland",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "FR": {
        "country_name": "France",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "GF": {
        "country_name": "French Guiana",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "PF": {
        "country_name": "French Polynesia",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "GA": {
        "country_name": "Gabon",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "GM": {
        "country_name": "Gambia",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "GE": {
        "country_name": "Georgia",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "DE": {
        "country_name": "Germany",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "GH": {
        "country_name": "Ghana",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "GI": {
        "country_name": "Gibraltar",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "GR": {
        "country_name": "Greece",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "GL": {
        "country_name": "Greenland",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "GD": {
        "country_name": "Grenada",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "GP": {
        "country_name": "Guadeloupe",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "GU": {
        "country_name": "Guam",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "GT": {
        "country_name": "Guatemala",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "GG": {
        "country_name": "Guernsey",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "GN": {
        "country_name": "Guinea",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "GW": {
        "country_name": "Guinea-Bissau",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "GY": {
        "country_name": "Guyana",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "HT": {
        "country_name": "Haiti",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "HM": {
        "country_name": "Heard Island and McDonald Islands",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "VA": {
        "country_name": "Holy See",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "HN": {
        "country_name": "Honduras",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "HK": {
        "country_name": "Hong Kong",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "HU": {
        "country_name": "Hungary",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "IS": {
        "country_name": "Iceland",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "IN": {
        "country_name": "India",
        "currencycode": "INR",
        "currencysymbol": "₹"
    },
    "ID": {
        "country_name": "Indonesia",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "IR": {
        "country_name": "Iran",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "IQ": {
        "country_name": "Iraq",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "IE": {
        "country_name": "Ireland",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "IM": {
        "country_name": "Isle of Man",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "IL": {
        "country_name": "Israel",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "IT": {
        "country_name": "Italy",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "JM": {
        "country_name": "Jamaica",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "JP": {
        "country_name": "Japan",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "JE": {
        "country_name": "Jersey",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "JO": {
        "country_name": "Jordan",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "KZ": {
        "country_name": "Kazakhstan",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "KE": {
        "country_name": "Kenya",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "KI": {
        "country_name": "Kiribati",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "KP": {
        "country_name": "Korea, Democratic People's Republic of",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "KR": {
        "country_name": "Korea, Republic of",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "KW": {
        "country_name": "Kuwait",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "KG": {
        "country_name": "Kyrgyzstan",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "LA": {
        "country_name": "Lao People's Democratic Republic",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "LV": {
        "country_name": "Latvia",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "LB": {
        "country_name": "Lebanon",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "LS": {
        "country_name": "Lesotho",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "LR": {
        "country_name": "Liberia",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "LY": {
        "country_name": "Libya",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "LI": {
        "country_name": "Liechtenstein",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "LT": {
        "country_name": "Lithuania",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "LU": {
        "country_name": "Luxembourg",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "MO": {
        "country_name": "Macao",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "MG": {
        "country_name": "Madagascar",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "MW": {
        "country_name": "Malawi",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "MY": {
        "country_name": "Malaysia",
        "currencycode": "MYR",
        "currencysymbol": "MYR"
    },
    "MV": {
        "country_name": "Maldives",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "ML": {
        "country_name": "Mali",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "MT": {
        "country_name": "Malta",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "MH": {
        "country_name": "Marshall Islands",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "MQ": {
        "country_name": "Martinique",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "MR": {
        "country_name": "Mauritania",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "MU": {
        "country_name": "Mauritius",
        "currencycode": "INR",
        "currencysymbol": "₹"
    },
    "YT": {
        "country_name": "Mayotte",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "MX": {
        "country_name": "Mexico",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "FM": {
        "country_name": "Micronesia",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "MD": {
        "country_name": "Moldova",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "MC": {
        "country_name": "Monaco",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "MN": {
        "country_name": "Mongolia",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "ME": {
        "country_name": "Montenegro",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "MS": {
        "country_name": "Montserrat",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "MA": {
        "country_name": "Morocco",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "MZ": {
        "country_name": "Mozambique",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "MM": {
        "country_name": "Myanmar",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "NA": {
        "country_name": "Namibia",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "NR": {
        "country_name": "Nauru",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "NP": {
        "country_name": "Nepal",
        "currencycode": "INR",
        "currencysymbol": "₹"
    },
    "NL": {
        "country_name": "Netherlands",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "NC": {
        "country_name": "New Caledonia",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "NZ": {
        "country_name": "New Zealand",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "NI": {
        "country_name": "Nicaragua",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "NE": {
        "country_name": "Niger",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "NG": {
        "country_name": "Nigeria",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "NU": {
        "country_name": "Niue",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "NF": {
        "country_name": "Norfolk Island",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "MP": {
        "country_name": "Northern Mariana Islands",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "NO": {
        "country_name": "Norway",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "OM": {
        "country_name": "Oman",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "PK": {
        "country_name": "Pakistan",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "PW": {
        "country_name": "Palau",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "PS": {
        "country_name": "Palestine",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "PA": {
        "country_name": "Panama",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "PG": {
        "country_name": "Papua New Guinea",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "PY": {
        "country_name": "Paraguay",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "PE": {
        "country_name": "Peru",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "PH": {
        "country_name": "Philippines",
        "currencycode": "MYR",
        "currencysymbol": "MYR"
    },
    "PN": {
        "country_name": "Pitcairn",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "PL": {
        "country_name": "Poland",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "PT": {
        "country_name": "Portugal",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "PR": {
        "country_name": "Puerto Rico",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "QA": {
        "country_name": "Qatar",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "RE": {
        "country_name": "Réunion",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "RO": {
        "country_name": "Romania",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "RU": {
        "country_name": "Russian Federation",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "RW": {
        "country_name": "Rwanda",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "BL": {
        "country_name": "Saint Barthélemy",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "SH": {
        "country_name": "Saint Helena",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "KN": {
        "country_name": "Saint Kitts and Nevis",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "LC": {
        "country_name": "Saint Lucia",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "MF": {
        "country_name": "Saint Martin (French part)",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "SX": {
        "country_name": "Sint Maarten (Dutch part)",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "PM": {
        "country_name": "Saint Pierre and Miquelon",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "VC": {
        "country_name": "Saint Vincent and the Grenadines",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "WS": {
        "country_name": "Samoa",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "SM": {
        "country_name": "San Marino",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "ST": {
        "country_name": "Sao Tome and Principe",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "SA": {
        "country_name": "Saudi Arabia",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "SN": {
        "country_name": "Senegal",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "RS": {
        "country_name": "Serbia",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "SC": {
        "country_name": "Seychelles",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "SL": {
        "country_name": "Sierra Leone",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "SG": {
        "country_name": "Singapore",
        "currencycode": "MYR",
        "currencysymbol": "MYR"
    },
    "SK": {
        "country_name": "Slovakia",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "SI": {
        "country_name": "Slovenia",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "SB": {
        "country_name": "Solomon Islands",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "SO": {
        "country_name": "Somalia",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "ZA": {
        "country_name": "South Africa",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "GS": {
        "country_name": "South Georgia and the South Sandwich Islands",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "SS": {
        "country_name": "South Sudan",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "ES": {
        "country_name": "Spain",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "LK": {
        "country_name": "Sri Lanka",
        "currencycode": "INR",
        "currencysymbol": "₹"
    },
    "SD": {
        "country_name": "Sudan",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "SR": {
        "country_name": "Suriname",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "SJ": {
        "country_name": "Svalbard and Jan Mayen",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "SE": {
        "country_name": "Sweden",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "CH": {
        "country_name": "Switzerland",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "SY": {
        "country_name": "Syrian Arab Republic",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "TW": {
        "country_name": "Taiwan, Province of China",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "TJ": {
        "country_name": "Tajikistan",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "TZ": {
        "country_name": "Tanzania, United Republic of",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "TH": {
        "country_name": "Thailand",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "TG": {
        "country_name": "Togo",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "TK": {
        "country_name": "Tokelau",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "TO": {
        "country_name": "Tonga",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "TT": {
        "country_name": "Trinidad and Tobago",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "TN": {
        "country_name": "Tunisia",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "TR": {
        "country_name": "Turkey",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "TM": {
        "country_name": "Turkmenistan",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "TC": {
        "country_name": "Turks and Caicos Islands",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "TV": {
        "country_name": "Tuvalu",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "UG": {
        "country_name": "Uganda",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "UA": {
        "country_name": "Ukraine",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "AE": {
        "country_name": "United Arab Emirates",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "GB": {
        "country_name": "United Kingdom",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "US": {
        "country_name": "United States",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "UY": {
        "country_name": "Uruguay",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "UZ": {
        "country_name": "Uzbekistan",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "VU": {
        "country_name": "Vanuatu",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "VE": {
        "country_name": "Venezuela",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "VN": {
        "country_name": "Viet Nam",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "WF": {
        "country_name": "Wallis and Futuna",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "EH": {
        "country_name": "Western Sahara",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "YE": {
        "country_name": "Yemen",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "ZM": {
        "country_name": "Zambia",
        "currencycode": "USD",
        "currencysymbol": "US $"
    },
    "ZW": {
        "country_name": "Zimbabwe",
        "currencycode": "USD",
        "currencysymbol": "US $"
    }
};