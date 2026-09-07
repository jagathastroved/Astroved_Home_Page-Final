import axios from 'axios';
import { initializeLocationCookies } from './astrovedService';

export const fetchHoroscope = async (moonSign: string, apiPeriod: string) => {
    await initializeLocationCookies();
    const getCookie = (name: string) => {
        const match = document.cookie.match(new RegExp('(^|;\\s*)' + name + '=([^;]*)'));
        return match ? decodeURIComponent(match[2]) : null;
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

    const fl = getFetchLocation();
    const cookieTz = fl ? fl.TimeZone : null;
    const timeZone = encodeURIComponent(cookieTz || Intl.DateTimeFormat().resolvedOptions().timeZone);

    try {
        const response = await axios.get(`${import.meta.env.VITE_ASTROVED_API_URL}/python/horoscope/${moonSign}/${apiPeriod}/summary?timezone=${timeZone}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch horoscope');
    }
};
