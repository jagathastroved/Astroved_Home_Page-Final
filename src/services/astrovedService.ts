import axios from 'axios';
import { CountryInfo } from './countryCode';

export const fetchCitySuggestions = async (country: string, city: string) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/Panchang/PopulateCityBycountry/${encodeURIComponent(country)}/${encodeURIComponent(city)}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch city suggestions');
    }
};

export const fetchPanchangData = async (timezone: string, lat: number, lng: number, localISOTime: string) => {
    try {
        const encodedTz = btoa(timezone).replace(/=/g, '');
        const url = `${import.meta.env.VITE_ASTROVED_API_URL}/node/newpanchangam/${encodedTz}/${lat}/${lng}/${localISOTime}`;
        const response = await axios.get(url);
        // console.log('Punchang Data', response.data)
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch panchang data');
    }
};

export const fetchTodayContent = async (timezone: string, lat: number, lng: number, localISOTime: string) => {
    try {
        const encodedTz = btoa(timezone).replace(/=/g, '');
        const url = `${import.meta.env.VITE_ASTROVED_API_URL}/node/todaycontent/${encodedTz}/${lat}/${lng}/${localISOTime}`;
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch today content');
    }
};

export const getUserCurrency = (): string => {
    // 1. Check cookies for currentcurrency
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

    const cookieCurrency = getCookie('currentcurrency');
    if (cookieCurrency) {
        return cookieCurrency;
    }

    const savedCountryName = getCookie('country');
    if (savedCountryName) {
        const countryData = Object.values(CountryInfo).find(
            info => info.country_name.toLowerCase() === savedCountryName.toLowerCase()
        );
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

export const initializeLocationCookies = async () => {
    try {
        const response = await axios.get('https://www.astroved.com/new/Home/GetLocationBasedOnIp');
        const data = response.data;

        const lat = parseFloat(data.latitude);
        const lng = parseFloat(data.longitude);
        const city = data.city || 'Unknown';
        const countryCode = data.countryCode || 'Unknown';
        let country = data.countryCode || 'Unknown';
        if (CountryInfo[country]) {
            country = CountryInfo[country].country_name;
        }

        const timezone = data.timeZone || 'Asia/Kolkata';

        const setCookie = (name: string, value: string) => {
            const expires = new Date();
            expires.setTime(expires.getTime() + 365 * 24 * 60 * 60 * 1000);
            document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/`;
        };

        // Setting the cookies with the returned data
        setCookie("city", city);
        setCookie("countryCode", countryCode);
        setCookie("country", country);
        setCookie("timezone", timezone);
        setCookie("lat", String(lat));
        setCookie("lng", String(lng));

        // Dispatch a custom event to notify components that depend on these cookies
        window.dispatchEvent(new Event('locationCookiesInitialized'));

        const state = data.state || data.region || '';
        return {
            ...data,
            countryName: country,
            cityName: city,
            stateName: state
        };
    } catch (error) {
        console.error('Failed to initialize location from IP', error);
        throw new Error('Failed to initialize location from IP');
    }
};
