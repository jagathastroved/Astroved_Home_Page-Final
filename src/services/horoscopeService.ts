import axios from 'axios';

export const fetchHoroscope = async (moonSign: string, apiPeriod: string) => {
    const getCookie = (name: string) => {
        const match = document.cookie.match(new RegExp('(^|;\\s*)' + name + '=([^;]*)'));
        return match ? decodeURIComponent(match[2]) : null;
    };

    const cookieTz = getCookie("timezone");
    const timeZone = encodeURIComponent(cookieTz || Intl.DateTimeFormat().resolvedOptions().timeZone);

    try {
        const response = await axios.get(`${import.meta.env.VITE_ASTROVED_API_URL}/python/horoscope/${moonSign}/${apiPeriod}/summary?timezone=${timeZone}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch horoscope');
    }
};
