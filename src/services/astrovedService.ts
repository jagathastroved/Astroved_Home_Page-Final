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

export const fetchCitySuggestions = async (country: string, city: string) => {
    try {
        const pl = getPanchangLocation();
        const finalCountry = country || (pl && pl.Country) || "";
        const finalCity = city || (pl && pl.City) || "";
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/Panchang/PopulateCityBycountry/${encodeURIComponent(finalCountry)}/${encodeURIComponent(finalCity)}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch city suggestions');
    }
};

export const fetchPanchangData = async (timezone: string, lat: number, lng: number, localISOTime: string) => {
    try {
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

export const getUserCurrency = (): string => {
    // 1. Check cookies for currentcurrency
    const cookieCurrency = getCookie('currentcurrency');
    if (cookieCurrency) {
        return cookieCurrency;
    }

    const fl = getFetchLocation();
    const savedCountryName = (fl && fl.Country) ? fl.Country : null;
    if (savedCountryName) {
        const countryData = Object.values(CountryInfo).find(
            info => info.country_name.toLowerCase() === savedCountryName.toLowerCase()
        );
        console.log(countryData, "countryData")
        if (countryData) {
            return countryData.currencycode;
        }
    }

    return 'INR';
};

export const fetchSpecialEvents = async (currencyOverride?: string) => {
    try {
        const currency = currencyOverride || getUserCurrency();
        const response = await axios.get(`${import.meta.env.VITE_ASTROVED_PHP_API_URL}/new-home-slider/${currency}`);
        // console.log(`${import.meta.env.VITE_ASTROVED_PHP_API_URL}/new-home-slider/${currency}`)
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch special events');
    }
};

export const initializeLocationCookies = (): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        const fl = getFetchLocation();
        if (fl && fl.City) {
            // Cookies already initialized, don't overwrite user's manual changes
            window.dispatchEvent(new Event('locationCookiesInitialized'));
            return resolve(fl);
        }

        const setCookie = (name: string, value: string) => {
            const expires = new Date();
            expires.setTime(expires.getTime() + 7 * 24 * 60 * 60 * 1000);
            document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/`;
        };

        const dispatchAndResolve = (data: any, city: string, state: string, country: string, countrycode: string, timezone: string, lat: number, lng: number) => {

            const expires = new Date();
            expires.setTime(expires.getTime() + 7 * 24 * 60 * 60 * 1000);
            const expirydays = expires.toUTCString();

            document.cookie = "fetchLocation=Latitude=" + lat + "&Longititude=" + lng + "&City=" + city + "&State=" + state + "&Country=" + country + "&CountryCode=" + countrycode + "&TimeZone=" + timezone + ";expires=" + expirydays + ";path=/";
            document.cookie = "PanchangLocation=Latitude=" + lat + "&Longititude=" + lng + "&City=" + city + "&State=" + state + "&Country=" + country + "&CountryCode=" + countrycode + "&TimeZone=" + timezone + ";expires=" + expirydays + ";path=/";

            // Dispatch a custom event to notify components that depend on these cookies
            window.dispatchEvent(new Event('locationCookiesInitialized'));

            resolve({
                ...data,
                countryName: country,
                cityName: city,
                city: city,
                state: state,
                countrycode: countrycode,
                latitude: String(lat),
                longitude: String(lng),
                timezone: timezone
            });
        };

        const populateFromCityCountry = async (city: string, country: string, defaultLat: number, defaultLng: number) => {
            try {
                const response = await axios.get(`https://webservice.astroved.com/api/Panchang/PopulateCityBycountry/${encodeURIComponent(country)}/${encodeURIComponent(city)}`);
                const data = response.data;

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
                console.error('Failed to initialize location from IP. Using default fallback.', error);
                dispatchAndResolve({}, 'Chennai', 'Tamil Nadu', 'India', 'IN', 'Asia/Kolkata', 13.0827, 80.2707);
            }
        };

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
                    console.log('geolocation.getCurrentPosition', position);
                    try {
                        const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`, {
                            headers: {
                                "Accept": "application/json"
                            }
                        });

                        const data = await response.data;

                        if (data.address) {
                            const city = data.address.county || data.address.state_district || data.address.city || '';
                            const country = data.address.country || '';

                            await populateFromCityCountry(city, country, lat, lng);
                        } else {
                            console.warn("Location data not found, falling back to IP.");
                            defaultLocationBasedIp();
                        }
                    } catch (error) {
                        console.error("Error fetching location data:", error);
                        defaultLocationBasedIp();
                    }
                },
                (error) => {
                    console.error("Error getting location:", error.message);
                    defaultLocationBasedIp();
                },
                { timeout: 5000 }
            );
        } else {
            console.warn("Geolocation is not supported by this browser.");
            defaultLocationBasedIp();
        }
    });
};
