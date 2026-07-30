import axios from 'axios';

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
        console.log('Punchang Data', response.data)
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
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(';').shift();
        return null;
    };
    
    const cookieCurrency = getCookie('currentcurrency');
    if (cookieCurrency) {
        return cookieCurrency;
    }
    
    // 2. Check localStorage for location fallback
    const savedLocation = localStorage.getItem('panchang_location_name');
    if (!savedLocation) {
        return 'USD';
    }
    
    const normalizedLocation = savedLocation.toLowerCase();
    if (normalizedLocation.includes('india')) {
        return 'INR';
    }
    
    if (normalizedLocation.includes('malaysia')) {
        return 'MYR';
    }
    
    return 'USD';
};

export const fetchSpecialEvents = async (currencyOverride?: string) => {
    try {
        const currency = currencyOverride || getUserCurrency();
        const response = await axios.get(`${import.meta.env.VITE_ASTROVED_PHP_API_URL}/new-home-slider/${currency}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch special events');
    }
};

