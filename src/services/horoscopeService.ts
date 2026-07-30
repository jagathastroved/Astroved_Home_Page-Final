import axios from 'axios';

export const fetchHoroscope = async (moonSign: string, apiPeriod: string, timeZone: string) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_ASTROVED_API_URL}/python/horoscope/${moonSign}/${apiPeriod}/summary?timezone=${timeZone}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch horoscope');
    }
};
