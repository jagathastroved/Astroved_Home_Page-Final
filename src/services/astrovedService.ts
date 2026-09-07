import axios from 'axios';
import { CountryInfo } from './countryCode';

const getCookie = (name: string) => {
    if (typeof document === 'undefined') return null;
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + '=')) {
            return decodeURIComponent(cookie.substring(name.length + 1));
        }
    }
    return null;
};

const getPanchangLocation = () => {
    const cookieString = getCookie("PanchangLocation");
    if (!cookieString) return null;
    const parts = cookieString.split('&');
    const locationObj: Record<string, string> = {};
    parts.forEach(part => {
        const [key, value] = part.split('=');
        if (key && value) {
            locationObj[key] = value;
        }
    });
    return locationObj;
};

const getFetchLocation = () => {
    const cookieString = getCookie("fetchLocation");
    if (!cookieString) return null;
    const parts = cookieString.split('&');
    const locationObj: Record<string, string> = {};
    parts.forEach(part => {
        const [key, value] = part.split('=');
        if (key && value) {
            locationObj[key] = value;
        }
    });
    return locationObj;
};

const citySuggestionsCache: Record<string, Promise<any>> = {};

export const fetchCitySuggestions = async (country: string, city: string) => {
    try {
        const pl = getPanchangLocation();
        const finalCountry = country || (pl && pl.Country) || "";
        const finalCity = city || (pl && pl.City) || "";

        const cacheKey = `${finalCountry}_${finalCity}`;
        if (citySuggestionsCache[cacheKey]) {
            return citySuggestionsCache[cacheKey];
        }

        const request = axios.get(`${import.meta.env.VITE_API_URL}/Panchang/PopulateCityBycountry/${encodeURIComponent(finalCountry)}/${encodeURIComponent(finalCity)}`)
            .then(response => response.data);

        citySuggestionsCache[cacheKey] = request;
        return await request;
    } catch (error) {
        throw new Error('Failed to fetch city suggestions');
    }
};

export const fetchPanchangData = async (timezone: string, lat: number, lng: number, localISOTime: string) => {
    try {
        await initializeLocationCookies();
        const pl = getPanchangLocation();
        const finalTimezone = (pl && pl.TimeZone) ? pl.TimeZone : timezone;
        const finalLat = (pl && pl.Latitude) ? parseFloat(pl.Latitude) : lat;
        const finalLng = (pl && pl.Longititude) ? parseFloat(pl.Longititude) : lng;

        const encodedTz = btoa(finalTimezone).replace(/=/g, '');
        const url = `${import.meta.env.VITE_ASTROVED_API_URL}/node/newpanchangam/${encodedTz}/${finalLat}/${finalLng}/${localISOTime}`;
        const response = await axios.get(url);
        // console.log('Punchang Data', response.data)
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch panchang data');
    }
};

export const fetchTodayContent = async (timezone: string, lat: number, lng: number, localISOTime: string) => {
    try {
        await initializeLocationCookies();
        const pl = getPanchangLocation();
        const finalTimezone = (pl && pl.TimeZone) ? pl.TimeZone : timezone;
        const finalLat = (pl && pl.Latitude) ? parseFloat(pl.Latitude) : lat;
        const finalLng = (pl && pl.Longititude) ? parseFloat(pl.Longititude) : lng;

        const encodedTz = btoa(finalTimezone).replace(/=/g, '');
        const url = `${import.meta.env.VITE_ASTROVED_API_URL}/node/todaycontent/${encodedTz}/${finalLat}/${finalLng}/${localISOTime}`;
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch today content');
    }
};

export const getUserCurrency = (countryNameOverride?: string): string => {
    // 1. Check cookies for currentcurrency
    const cookieCurrency = getCookie('currentcurrency');
    if (cookieCurrency) {
        return cookieCurrency;
    }

    const fl = getFetchLocation();
    const savedCountryName = countryNameOverride || (fl && fl.Country ? fl.Country : null);
    if (savedCountryName) {
        const countryData = Object.values(CountryInfo).find(
            info => info.country_name.toLowerCase() === savedCountryName.toLowerCase()
        );
        // console.log(countryData, "countryData")
        if (countryData) {
            return countryData.currencycode;
        }
    }

    return 'INR';
};

export const fetchSpecialEvents = async (currencyOverride?: string) => {
    try {
        const resolved = await initializeLocationCookies();
        const currency = currencyOverride || getUserCurrency(resolved.countryName);
        const response = await axios.get(`${import.meta.env.VITE_ASTROVED_PHP_API_URL}/new-home-slider/${currency}`);
        // console.log(`${import.meta.env.VITE_ASTROVED_PHP_API_URL}/new-home-slider/${currency}`)
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch special events');
    }
};

let pendingInitPromise: Promise<any> | null = null;

export const initializeLocationCookies = (): Promise<any> => {
    const fl = getFetchLocation();
    if (fl && fl.City) {
        // Cookies already initialized, don't overwrite user's manual changes
        window.dispatchEvent(new Event('locationCookiesInitialized'));
        const standardizedFl = {
            ...fl,
            countryName: fl.Country,
            cityName: fl.City,
            city: fl.City,
            stateName: fl.State,
            state: fl.State,
            countrycode: fl.CountryCode,
            latitude: fl.Latitude,
            longitude: fl.Longititude,
            timezone: fl.TimeZone,
            timeZone: fl.TimeZone
        };
        return Promise.resolve(standardizedFl);
    }

    if (pendingInitPromise) {
        return pendingInitPromise;
    }

    pendingInitPromise = new Promise(async (resolve, reject) => {
        const dispatchAndResolve = (data: any, city: string, state: string, country: string, countrycode: string, timezone: string, lat: number, lng: number) => {

            const expires = new Date();
            expires.setTime(expires.getTime() + 7 * 24 * 60 * 60 * 1000);
            const expirydays = expires.toUTCString();

            document.cookie = "fetchLocation=Latitude=" + lat + "&Longititude=" + lng + "&City=" + city + "&State=" + state + "&Country=" + country + "&CountryCode=" + countrycode + "&TimeZone=" + timezone + ";expires=" + expirydays + ";path=/";
            document.cookie = "PanchangLocation=Latitude=" + lat + "&Longititude=" + lng + "&City=" + city + "&State=" + state + "&Country=" + country + "&CountryCode=" + countrycode + "&TimeZone=" + timezone + ";expires=" + expirydays + ";path=/";

            // Dispatch a custom event to notify components that depend on these cookies
            window.dispatchEvent(new Event('locationCookiesInitialized'));

            pendingInitPromise = null; // Clear the lock

            resolve({
                ...data,
                countryName: country,
                cityName: city,
                city: city,
                stateName: state,
                state: state,
                countrycode: countrycode,
                latitude: String(lat),
                longitude: String(lng),
                timezone: timezone,
                timeZone: timezone
            });
        };

        const populateFromCityCountry = async (city: string, country: string, defaultLat: number, defaultLng: number) => {
            try {
                const data = await fetchCitySuggestions(country, city);

                const locationData = Array.isArray(data) && data.length > 0 ? data[0] : data;

                const finalCity = locationData.City || city;
                const state = locationData.StateorProvince || '';
                const finalCountry = locationData.Country || country;
                const countryCode = locationData.CountryCode || '';
                const timezone = locationData.TimeZone || Intl.DateTimeFormat().resolvedOptions().timeZone;
                const finalLat = locationData.Latitude ? parseFloat(locationData.Latitude) : defaultLat;
                const finalLng = locationData.Longitude ? parseFloat(locationData.Longitude) : defaultLng;

                dispatchAndResolve(locationData, finalCity, state, finalCountry, countryCode, timezone, finalLat, finalLng);
            } catch (error) {
                console.error("Error populating city by country:", error);
                dispatchAndResolve({}, city, '', country, '', Intl.DateTimeFormat().resolvedOptions().timeZone, defaultLat, defaultLng);
            }
        };

        const defaultLocationBasedIp = async () => {
            try {
                const response = await axios.get('https://www.astroved.com/new/Home/GetLocationBasedOnIp');
                const data = response.data;
                const lat = parseFloat(data.latitude);
                const lng = parseFloat(data.longitude);
                const city = data.city || 'Chennai';
                const countryCode = data.countryCode || 'IN';

                let countryName = 'India';
                if (CountryInfo[countryCode]) {
                    countryName = CountryInfo[countryCode].country_name;
                }

                await populateFromCityCountry(city, countryName, lat, lng);
            } catch (error) {
                dispatchAndResolve({}, 'Chennai', 'Tamil Nadu', 'India', 'IN', 'Asia/Kolkata', 13.0827, 80.2707);
            }
        };

        // Try to get precise location via browser geolocation first
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
                    try {
                        const response = await axios.get(`${import.meta.env.VITE_OPENSTREETMAP_API_URL}/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`);
                        const data = response.data;
                        const city = data.address.city || data.address.town || data.address.village || data.address.county || 'Chennai';
                        const countryName = data.address.country || 'India';
                        await populateFromCityCountry(city, countryName, lat, lng);
                    } catch (error) {
                        console.error("Reverse geocoding failed, falling back to IP:", error);
                        defaultLocationBasedIp();
                    }
                },
                (error) => {
                    console.warn("User denied location or location fetch failed. Falling back to Astroved API via IP.");
                    defaultLocationBasedIp();
                },
                { timeout: 5000, enableHighAccuracy: false } // added timeout to prevent infinite loading
            );
        } else {
            console.warn("Geolocation not supported by this browser. Falling back to Astroved API via IP.");
            defaultLocationBasedIp();
        }
    });

    return pendingInitPromise;
};