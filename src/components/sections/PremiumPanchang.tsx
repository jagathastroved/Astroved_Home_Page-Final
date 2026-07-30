import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { MapPin, Calendar, Clock, Sun, Sunset, Moon, MoonStar, Star, ChevronDown, ThumbsUp, AlertTriangle, Skull, Zap } from 'lucide-react';
import { fetchCitySuggestions, fetchPanchangData, fetchTodayContent } from '../../services/astrovedService';
import { fetchCountries, searchLocation, reverseGeocode } from '../../services/locationService';

const Styles = {
    SECTION_STYLES: "relative py-4 pb-20 md:pb-6 md:py-6 overflow-hidden",
    BACKGROUND_GLOW_STYLES: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-[600px] bg-indigo/5 dark:bg-gold/5 blur-[120px] rounded-full pointer-events-none",
    CONTENT_WRAPPER_STYLES: "max-w-7xl mx-auto px-4 sm:px-6 relative z-10",
    HEADER_CONTAINER_STYLES: "text-center max-w-3xl mx-auto mb-10",
    HEADER_SUBTITLE_STYLES: "text-amber-600 dark:text-amber-400 font-sans text-xs md:text-sm uppercase tracking-widest font-bold mb-3",
    HEADER_TITLE_STYLES: "font-serif text-3xl sm:text-4xl md:text-5xl text-midnight dark:text-cream leading-tight font-bold mb-4",
    HEADER_TITLE_HIGHLIGHT_STYLES: "text-amber-600 dark:text-amber-400 italic",
    HEADER_DESC_STYLES: "font-sans text-gray-500 dark:text-gray-400 text-sm md:text-base lg:text-lg leading-relaxed max-w-2xl mx-auto font-medium",
    MAIN_PANEL_STYLES: "bg-white dark:bg-[#0c0f24] rounded-[2rem] p-4 sm:p-6 lg:p-10 relative overflow-hidden shadow-2xl border border-black/5 dark:border-amber-500/40 dark:shadow-[0_0_15px_rgba(245,158,11,0.2)] hover:border-[#facc15]/50 hover:shadow-[0_0_40px_rgba(250,204,21,0.2)] transition-all duration-500",
    TOP_BAR_STYLES: "flex flex-col xl:flex-row justify-between items-center gap-6 border-b border-black/5 dark:border-amber-500/40 dark:shadow-[0_0_15px_rgba(245,158,11,0.2)] pb-4 mb-5 md:pb-8 md:mb-8",
    DATE_LOCATION_BUTTON_STYLES: "flex items-center gap-1 cursor-pointer hover:underline decoration-dotted text-slate-600 dark:text-slate-400",
    DOT_DIVIDER_STYLES: "text-purple/30 dark:text-gold/30",
    POPOVER_BACKDROP_STYLES: "fixed inset-0 bg-black/40 backdrop-blur-sm z-40 sm:hidden cursor-pointer",
    CALENDAR_POPOVER_STYLES: "fixed sm:absolute top-[25%] sm:top-full left-4 right-4 sm:left-0 sm:right-auto sm:translate-x-0 mx-auto sm:mx-0 mt-2 z-50 w-auto sm:w-[280px] max-w-[340px] sm:max-w-none p-4 bg-white dark:bg-[#110c1c] border border-black/10 dark:border-amber-500/40 rounded-2xl shadow-2xl flex flex-col text-slate-800 dark:text-cream select-none",
    LOCATION_POPOVER_STYLES: "fixed sm:absolute top-[25%] sm:top-full left-4 right-4 sm:left-0 sm:right-auto sm:translate-x-0 mx-auto sm:mx-0 mt-2 z-50 w-auto sm:w-[280px] max-w-[340px] sm:max-w-none max-h-[70vh] overflow-y-auto p-5 bg-white dark:bg-[#110c1c] border border-black/10 dark:border-amber-500/40 rounded-2xl shadow-2xl flex flex-col gap-4 text-left",
    LOCATION_INPUT_LABEL_STYLES: "text-[9px] font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase",
    LOCATION_SELECT_STYLES: "w-full bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-amber-500/30 rounded-xl px-3 py-2.5 text-xs text-slate-700 dark:text-cream focus:outline-none appearance-none cursor-pointer pr-8",
    LOCATION_INPUT_STYLES: "w-full bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-amber-500/30 rounded-xl px-3 py-2.5 text-xs text-slate-700 dark:text-cream focus:outline-none focus:border-purple/50 pr-8",
    SUGGESTIONS_CONTAINER_STYLES: "relative w-full mt-2 max-h-48 overflow-y-auto bg-white dark:bg-[#181226] border border-slate-200 dark:border-amber-500/30 rounded-xl shadow-inner z-50 flex flex-col divide-y divide-slate-100 dark:divide-slate-800",
    APPLY_LOCATION_BTN_STYLES: "w-full bg-[#2b1845] hover:bg-[#3d245f] text-white py-2.5 rounded-xl text-xs font-bold transition-all text-center shadow-md shadow-[#2b1845]/20 mt-1",
    ASTRO_TICKER_CONTAINER_STYLES: "grid grid-cols-2 sm:flex sm:flex-row items-center justify-center gap-4 sm:gap-6 bg-white/60 dark:bg-[#0c0f24]/50 backdrop-blur-md px-6 py-4 rounded-2xl border border-purple/10 dark:border-amber-500/40 dark:shadow-[0_0_15px_rgba(245,158,11,0.2)] w-full xl:w-auto shadow-sm dark:shadow-none",
    TICKER_ITEM_STYLES: "flex items-center gap-2",
    TICKER_DIVIDER_STYLES: "w-px h-8 bg-black/10 dark:bg-white/10 hidden sm:block",
    CONTENT_GRID_STYLES: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8",
    DATA_BOX_BASE_STYLES: "bg-white/70 dark:bg-black/20 p-5 rounded-2xl border border-purple/10 dark:border-amber-500/40 dark:shadow-[0_0_15px_rgba(245,158,11,0.2)] shadow-sm space-y-3 relative overflow-hidden",
    DATA_BOX_ALT_STYLES: "bg-white/70 dark:bg-black/20 p-5 rounded-2xl border border-indigo/10 dark:border-amber-500/40 dark:shadow-[0_0_15px_rgba(245,158,11,0.2)] shadow-sm space-y-3 relative overflow-hidden",
    DATA_ROW_LABEL_STYLES: "text-xs md:text-sm font-bold text-slate-500 dark:text-slate-400 tracking-tight xl:tracking-normal",
    DATA_ROW_VALUE_STYLES: "text-xs md:text-sm font-medium text-slate-700 dark:text-slate-300 pl-6 text-left",
    DATA_DIVIDER_STYLES: "relative z-10 w-full h-px bg-black/5 dark:bg-white/5",
    ELEMENT_TITLE_STYLES: "text-sm md:text-base font-sans font-bold text-midnight dark:text-cream mb-4 flex items-center gap-2",
    ELEMENT_LIST_STYLES: "space-y-3 pl-2 border-l-2 border-purple/20 dark:border-gold/20",
    ELEMENT_ALT_LIST_STYLES: "space-y-3 pl-2 border-l-2 border-indigo/20 dark:border-saffron/20",
    ACTIVE_ITEM_TITLE_STYLES: "text-sm md:text-[15px] font-semibold text-midnight dark:text-cream flex items-center gap-2",
    ACTIVE_ALT_ITEM_TITLE_STYLES: "text-sm md:text-[15px] font-semibold text-midnight dark:text-cream flex flex-wrap items-center gap-2",
    ITEM_DATE_STYLES: "text-xs md:text-sm font-mono text-slate-600 dark:text-slate-400 mt-1",
    CHART_CONTAINER_STYLES: "bg-white/80 dark:bg-[#080b1a] rounded-2xl p-6 w-full max-w-[280px] flex flex-col items-center justify-center relative overflow-hidden border border-purple/10 dark:border-gold/10 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] dark:shadow-2xl transition-colors duration-500",
    CHART_GRID_STYLES: "grid grid-cols-4 grid-rows-4 gap-[2px] bg-purple/20 dark:bg-gold/30 p-[2px] relative z-10 w-full aspect-square rounded-sm mx-auto shadow-[0_0_20px_rgba(104,105,249,0.05)] dark:shadow-[0_0_30px_rgba(251,191,36,0.05)] transition-colors duration-500",
    CHART_CELL_STYLES: "bg-white dark:bg-[#0c0f24] flex items-center justify-center p-1 relative group hover:bg-purple/5 dark:hover:bg-indigo/20 transition-colors cursor-default overflow-hidden",
    CHART_CELL_TEXT_STYLES: "text-[10px] font-mono text-slate-600 dark:text-cream/60 group-hover:text-purple dark:group-hover:text-gold transition-colors font-bold dark:font-semibold text-center",
    CENTER_CHART_CELL_STYLES: "col-span-2 row-span-2 bg-ivory/50 dark:bg-[#080b1a] flex flex-col items-center justify-center relative border border-purple/5 dark:border-gold/10",
    getCalendarDayStyles: function (isSelected: boolean, isToday: boolean, isCurrentMonth: boolean) {
        let base = "text-[11px] py-1 rounded-lg transition-all ";
        if (isSelected) {
            base += "bg-[#2b1845] text-white font-bold shadow-md";
        } else if (isToday) {
            base += "border border-[#2b1845]/80 bg-[#ece9f2] dark:bg-[#2b1845]/30 dark:border-amber-500/50 text-[#2b1845] dark:text-amber-400 font-bold";
        } else if (isCurrentMonth) {
            base += "text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5";
        } else {
            base += "text-slate-300 dark:text-slate-600 hover:bg-slate-100/50 dark:hover:bg-white/5";
        }
        return base;
    }
};

export function PremiumPanchang() {
    const [panchangData, setPanchangData] = useState<any>(null);
    const [todayContentData, setTodayContentData] = useState<any>(null);
    const [locationName, setLocationName] = useState<string>(() => {
        return localStorage.getItem('panchang_location_name') || 'Chennai, Tamil Nadu, India';
    });
    const [coordinates, setCoordinates] = useState(() => {
        const lat = localStorage.getItem('panchang_lat');
        const lng = localStorage.getItem('panchang_lng');
        return lat && lng ? { lat: parseFloat(lat), lng: parseFloat(lng) } : { lat: 13.08784, lng: 80.27847 };
    });
    const [timezone, setTimezone] = useState<string>(() => {
        const tz = localStorage.getItem('panchang_timezone');
        if (tz) return tz;
        try {
            return Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Kolkata';
        } catch (e) {
            return 'Asia/Kolkata';
        }
    });
    const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // Custom Calendar & Location popover states
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [isLocationOpen, setIsLocationOpen] = useState(false);
    const [calendarYear, setCalendarYear] = useState<number>(new Date().getFullYear());
    const [calendarMonth, setCalendarMonth] = useState<number>(new Date().getMonth());
    const [tempCountry, setTempCountry] = useState('India');
    const [tempCity, setTempCity] = useState('Chennai');
    const [citySuggestions, setCitySuggestions] = useState<any[]>([]);
    const [isSearchingCities, setIsSearchingCities] = useState(false);
    const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
    const [searchCountry, setSearchCountry] = useState('');
    const [countriesList, setCountriesList] = useState<any[]>([]);

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    useEffect(() => {
        fetchCountries()
            .then(data => {
                const countriesArray = Array.isArray(data) ? data : (data.Countries || data.Data || (typeof data === 'object' && Object.values(data).find(Array.isArray)) || []);
                setCountriesList(countriesArray);
            })
            .catch(err => console.error("Error fetching countries:", err));
    }, []);

    useEffect(() => {
        const handleOutsideClick = () => {
            setIsCalendarOpen(false);
            setIsLocationOpen(false);
            setCitySuggestions([]);
            setIsCountryDropdownOpen(false);
            setSearchCountry('');
        };
        window.addEventListener('click', handleOutsideClick);
        return () => window.removeEventListener('click', handleOutsideClick);
    }, []);

    // Prevent body scroll when popovers are open on mobile screens
    useEffect(() => {
        const isMobile = window.innerWidth < 640;
        if ((isLocationOpen || isCalendarOpen) && isMobile) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isLocationOpen, isCalendarOpen]);

    // Fetch city suggestions dynamically as user types with debounce
    useEffect(() => {
        if (!tempCity.trim() || tempCity === locationName.split(',')[0].trim()) {
            setCitySuggestions([]);
            return;
        }

        const delayDebounce = setTimeout(async () => {
            try {
                setIsSearchingCities(true);
                const data = await fetchCitySuggestions(tempCountry, tempCity);
                if (Array.isArray(data)) {
                    // Remove duplicates by City name
                    const uniqueData = Array.from(new Map(data.map((item: any) => [item.City, item])).values());
                    // Sort suggestions alphabetically by City name
                    const sorted = [...uniqueData].sort((a: any, b: any) => {
                        const cityA = a.City || '';
                        const cityB = b.City || '';
                        return cityA.localeCompare(cityB);
                    });
                    setCitySuggestions(sorted);
                } else {
                    setCitySuggestions([]);
                }
            } catch (err) {
                console.error("Error fetching city autocomplete suggestions:", err);
                setCitySuggestions([]);
            } finally {
                setIsSearchingCities(false);
            }
        }, 400);

        return () => clearTimeout(delayDebounce);
    }, [tempCity, tempCountry]);

    /**
     * Formats an ISO string to a readable 12-hour time format.
     * @param {string} [isoString] - The ISO date string to format.
     * @returns {string} - The formatted time string, e.g., '05:51 AM'.
     */
    const formatTime = (isoString?: string) => {
        if (!isoString) return '';
        try {
            const date = new Date(isoString);
            return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
        } catch (e) {
            return '';
        }
    };

    /**
     * Formats a start and end ISO string into a readable date range.
     * @param {string} [start] - The start date ISO string.
     * @param {string} [end] - The end date ISO string.
     * @returns {string} - The formatted date range.
     */
    const formatDateRange = (start?: string, end?: string) => {
        if (!start || !end) return '';
        try {
            const sDate = new Date(start);
            const eDate = new Date(end);
            const options: Intl.DateTimeFormatOptions = { month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true };
            return `${sDate.toLocaleDateString('en-US', options)} — ${eDate.toLocaleDateString('en-US', options)}`;
        } catch (e) {
            return '';
        }
    };

    /**
     * Converts camelCase or PascalCase string to spaced text.
     * @param {string} [str] - The string to format.
     * @returns {string} - The formatted readable string.
     */
    const formatCamelCase = (str?: string) => {
        if (!str) return '';
        return str.replace(/([A-Z])/g, ' $1').trim();
    };

    // Sync calendar picker month/year when selectedDate updates
    useEffect(() => {
        const d = new Date(selectedDate);
        setCalendarYear(d.getFullYear());
        setCalendarMonth(d.getMonth());
    }, [selectedDate]);

    // Auto-detect location on mount
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
                    setCoordinates({ lat, lng });
                    localStorage.setItem('panchang_lat', String(lat));
                    localStorage.setItem('panchang_lng', String(lng));
                    localStorage.setItem('panchang_location_permission', 'granted');

                    try {
                        const geoData = await reverseGeocode(lat, lng);
                        if (geoData && geoData.address) {
                            const city = geoData.address.city || geoData.address.town || geoData.address.village || geoData.address.municipality || geoData.address.county || geoData.address.city_district || geoData.address.suburb || geoData.address.state || 'Detected Location';
                            const state = geoData.address.state || '';
                            const country = geoData.address.country || 'India';
                            const statePart = state ? `${state}, ` : '';
                            const formattedName = `${city}, ${statePart}${country}`;
                            setLocationName(formattedName);
                            localStorage.setItem('panchang_location_name', formattedName);
                            setTempCity(city);
                            setTempCountry(country);

                            // Retrieve exact timezone & normalized location from Astroved API
                            try {
                                const astrovedLocData = await fetchCitySuggestions(country, city);
                                if (Array.isArray(astrovedLocData) && astrovedLocData.length > 0) {
                                    const match = astrovedLocData[0];
                                    if (match.TimeZone) {
                                        setTimezone(match.TimeZone);
                                        localStorage.setItem('panchang_timezone', match.TimeZone);
                                    }
                                    const matchStatePart = match.StateorProvince ? `${match.StateorProvince}, ` : '';
                                    const finalFormattedName = `${match.City}, ${matchStatePart}${match.Country}`;
                                    setLocationName(finalFormattedName);
                                    localStorage.setItem('panchang_location_name', finalFormattedName);
                                }
                            } catch (err) {
                                console.error("Failed to fetch Astroved exact location/timezone:", err);
                            }
                        }
                    } catch (err) {
                        console.error("Reverse geocoding failed on mount:", err);
                    }
                },
                (error) => {
                    console.warn("Geolocation permission denied on mount, using default:", error);
                    // If denied, use default fallback and do NOT save it to localStorage
                    // so that on next reload we will query geolocation again.
                    localStorage.removeItem('panchang_location_permission');
                    localStorage.removeItem('panchang_location_name');
                    localStorage.removeItem('panchang_lat');
                    localStorage.removeItem('panchang_lng');
                    localStorage.removeItem('panchang_timezone');

                    setLocationName('Chennai, Tamil Nadu, India');
                    setCoordinates({ lat: 13.08784, lng: 80.27847 });
                    setTimezone('Asia/Kolkata');
                }
            );
        }
    }, []);

    // Fetch when coordinates, date, or timezone changes
    useEffect(() => {
        let active = true;

        const fetchData = async () => {
            try {
                setIsLoading(true);
                const tz = timezone;
                const localISOTime = `${selectedDate}T00:00:00`;
                const [panchangData, contentData] = await Promise.all([
                    fetchPanchangData(tz, coordinates.lat, coordinates.lng, localISOTime),
                    fetchTodayContent(tz, coordinates.lat, coordinates.lng, localISOTime)
                ]);

                if (active) {
                    setPanchangData(panchangData);
                }

                if (active && Array.isArray(contentData) && contentData.length > 0) {
                    setTodayContentData(contentData[0]);
                }

            } catch (err) {
                console.error("[Panchang] API fetch failed:", err);
            } finally {
                if (active) {
                    setIsLoading(false);
                }
            }
        };

        fetchData();

        return () => {
            active = false;
        };
    }, [coordinates, selectedDate, timezone]);

    const handleLocationSearch = async (query: string) => {
        if (!query.trim()) return;
        try {
            const data = await searchLocation(query);
            if (data && data.length > 0) {
                const newLat = parseFloat(data[0].lat);
                const newLng = parseFloat(data[0].lon);
                setCoordinates({ lat: newLat, lng: newLng });
                localStorage.setItem('panchang_lat', String(newLat));
                localStorage.setItem('panchang_lng', String(newLng));

                const displayName = data[0].display_name;
                const parts = displayName.split(',');
                const city = parts[0]?.trim() || '';
                const country = parts[parts.length - 1]?.trim() || '';
                const formattedDisplay = city && country ? `${city}, ${country}` : displayName;
                setLocationName(formattedDisplay);
                localStorage.setItem('panchang_location_name', formattedDisplay);

                // Try resolving timezone via Astroved API since nominatim succeeded
                if (city && country) {
                    try {
                        const astrovedLocData = await fetchCitySuggestions(country, city);
                        if (Array.isArray(astrovedLocData) && astrovedLocData.length > 0) {
                            const match = astrovedLocData[0];
                            if (match.TimeZone) {
                                setTimezone(match.TimeZone);
                                localStorage.setItem('panchang_timezone', match.TimeZone);
                            }
                            const matchStatePart = match.StateorProvince ? `${match.StateorProvince}, ` : '';
                            const finalName = `${match.City}, ${matchStatePart}${match.Country}`;
                            setLocationName(finalName);
                            localStorage.setItem('panchang_location_name', finalName);
                        }
                    } catch (e) {
                        console.error("Astroved location API lookup inside handleLocationSearch failed:", e);
                    }
                }
            }
        } catch (err) {
            console.error("Geocoding query failed:", err);
        }
    };

    /**
     * Calculates the days to display in the calendar picker for a given month/year.
     * @param {number} year - The target year.
     * @param {number} month - The target month.
     * @returns {Array} - Array of objects representing the days to display.
     */
    const getCalendarDays = (year: number, month: number) => {
        const firstDayIndex = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const daysInPrevMonth = new Date(year, month, 0).getDate();

        const days = [];

        // Prev month days
        for (let i = firstDayIndex - 1; i >= 0; i--) {
            days.push({
                day: daysInPrevMonth - i,
                month: month === 0 ? 11 : month - 1,
                year: month === 0 ? year - 1 : year,
                isCurrentMonth: false
            });
        }

        // Current month days
        for (let i = 1; i <= daysInMonth; i++) {
            days.push({
                day: i,
                month: month,
                year: year,
                isCurrentMonth: true
            });
        }

        // Next month days
        const remaining = 42 - days.length;
        for (let i = 1; i <= remaining; i++) {
            days.push({
                day: i,
                month: month === 11 ? 0 : month + 1,
                year: month === 11 ? year + 1 : year,
                isCurrentMonth: false
            });
        }

        return days;
    };

    const handlePrevMonth = () => {
        if (calendarMonth === 0) {
            setCalendarMonth(11);
            setCalendarYear(calendarYear - 1);
        } else {
            setCalendarMonth(calendarMonth - 1);
        }
    };

    const handleNextMonth = () => {
        if (calendarMonth === 11) {
            setCalendarMonth(0);
            setCalendarYear(calendarYear + 1);
        } else {
            setCalendarMonth(calendarMonth + 1);
        }
    };

    const handleSelectDay = (dayObj: { day: number; month: number; year: number }) => {
        const pad = (num: number) => String(num).padStart(2, '0');
        const formatted = `${dayObj.year}-${pad(dayObj.month + 1)}-${pad(dayObj.day)}`;
        setSelectedDate(formatted);
        setIsCalendarOpen(false);
    };

    const handleApplyLocation = async () => {
        setIsLocationOpen(false);
        try {
            // Try Astroved's PopulateCityBycountry API first
            const data = await fetchCitySuggestions(tempCountry, tempCity);
            if (Array.isArray(data) && data.length > 0) {
                const match = data[0];
                const newLat = parseFloat(match.Latitude);
                const newLng = parseFloat(match.Longitude);
                setCoordinates({ lat: newLat, lng: newLng });
                localStorage.setItem('panchang_lat', String(newLat));
                localStorage.setItem('panchang_lng', String(newLng));
                if (match.TimeZone) {
                    setTimezone(match.TimeZone);
                    localStorage.setItem('panchang_timezone', match.TimeZone);
                }
                const matchStatePart = match.StateorProvince ? `${match.StateorProvince}, ` : '';
                const finalName = `${match.City}, ${matchStatePart}${match.Country}`;
                setLocationName(finalName);
                localStorage.setItem('panchang_location_name', finalName);
                return;
            }
        } catch (err) {
            console.error("Astroved location API failed, falling back to Nominatim:", err);
        }

        // Fallback: search using OSM Nominatim
        const query = `${tempCity}, ${tempCountry}`;
        await handleLocationSearch(query);
    };

    const planetAbbrs: Record<string, string> = {
        'Sun': 'Su', 'Moon': 'Mo', 'Mars': 'Ma', 'Mercury': 'Me',
        'Jupiter': 'Ju', 'Venus': 'Ve', 'Saturn': 'Sa', 'Rahu': 'Ra', 'Ketu': 'Ke', 'Lagna': 'Asc'
    };

    /**
     * Maps an astrological sign index to the planets occupying it.
     * @param {number} signIndex - The zodiac sign index (0-11).
     * @returns {string[]} - Array of abbreviated planet names in the sign.
     */
    const getPlanetsForSign = (signIndex: number) => {
        if (!panchangData || !panchangData.PositionList) {
            const staticPositions: Record<number, string[]> = {
                0: [], 1: ['Su'], 2: ['Mo'], 3: ['Me'], 4: ['Ra'], 5: ['Ju'], 6: [], 7: ['Sa'], 8: [], 9: [], 10: ['Ke'], 11: ['Ve']
            };
            return staticPositions[signIndex] || [];
        }

        const list = panchangData.PositionList;
        const result: string[] = [];
        list.forEach((planet: any) => {
            const longVal = parseFloat(planet.LongitudeCalculations?.LongitudeValue || '0');
            const calculatedSignIdx = Math.floor(longVal / 30);
            if (calculatedSignIdx === signIndex) {
                const abbr = planetAbbrs[planet.PlanetPlanetName];
                if (abbr) {
                    result.push(abbr);
                }
            }
        });
        return result;
    };

    return (
        <section className={Styles.SECTION_STYLES} id="daily-panchang">
            {/* Background glow */}
            <div className={Styles.BACKGROUND_GLOW_STYLES} />

            <div className={Styles.CONTENT_WRAPPER_STYLES}>
                <div className={Styles.HEADER_CONTAINER_STYLES}>
                    <p className={Styles.HEADER_SUBTITLE_STYLES}>
                        DAILY TIMINGS
                    </p>
                    <h2 className={Styles.HEADER_TITLE_STYLES}>
                        Today's Panchang — <em className={Styles.HEADER_TITLE_HIGHLIGHT_STYLES}>Your Auspicious Timings.</em>
                    </h2>
                    <p className={Styles.HEADER_DESC_STYLES}>
                        Live for <strong className="font-bold text-gray-700 dark:text-gray-300">{locationName.split(',')[0]}</strong> (auto-detected). Timings update automatically for your location.
                    </p>
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className={Styles.MAIN_PANEL_STYLES}
                >
                    {/* Top Astronomical Header Bar */}
                    <div className={Styles.TOP_BAR_STYLES}>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold to-orange-500 flex items-center justify-center shadow-lg shadow-gold/20 shrink-0">
                                <Sun className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h2 className="font-sans text-2xl md:text-3xl text-midnight dark:text-cream font-bold tracking-wide">
                                    Panchang
                                </h2>
                                <div className="flex flex-wrap items-center gap-3 mt-1 text-[13px] font-medium text-slate-500 dark:text-slate-400">
                                    <div className="relative">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setIsCalendarOpen(!isCalendarOpen);
                                                setIsLocationOpen(false);
                                            }}
                                            className={Styles.DATE_LOCATION_BUTTON_STYLES}
                                        >
                                            <Calendar className="w-3.5 h-3.5 text-purple dark:text-gold" />
                                            <span>
                                                {new Date(selectedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                            </span>
                                        </button>

                                        {isCalendarOpen && (
                                            <div
                                                onClick={(e) => e.stopPropagation()}
                                                className={Styles.CALENDAR_POPOVER_STYLES}
                                            >
                                                {/* Calendar Header */}
                                                <div className="flex items-center justify-between mb-4 px-2">
                                                    <button onClick={handlePrevMonth} className="text-purple-600 dark:text-gold hover:opacity-75 text-lg font-bold">«</button>
                                                    <span className="font-serif font-bold text-sm text-midnight dark:text-cream">{months[calendarMonth]} {calendarYear}</span>
                                                    <button onClick={handleNextMonth} className="text-purple-600 dark:text-gold hover:opacity-75 text-lg font-bold">»</button>
                                                </div>

                                                {/* Weekday Titles */}
                                                <div className="grid grid-cols-7 gap-1 text-center mb-2">
                                                    {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
                                                        <span key={d} className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">{d}</span>
                                                    ))}
                                                </div>

                                                {/* Grid Days */}
                                                <div className="grid grid-cols-7 gap-1 text-center">
                                                    {getCalendarDays(calendarYear, calendarMonth).map((dayObj, itemIndex) => {
                                                        const isSelected = selectedDate === `${dayObj.year}-${String(dayObj.month + 1).padStart(2, '0')}-${String(dayObj.day).padStart(2, '0')}`;
                                                        const today = new Date();
                                                        const isToday = dayObj.day === today.getDate() &&
                                                            dayObj.month === today.getMonth() &&
                                                            dayObj.year === today.getFullYear();
                                                        return (
                                                            <button
                                                                key={itemIndex}
                                                                onClick={() => handleSelectDay(dayObj)}
                                                                className={Styles.getCalendarDayStyles(isSelected, isToday, dayObj.isCurrentMonth)}
                                                            >
                                                                {dayObj.day}
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <span className={Styles.DOT_DIVIDER_STYLES}>&bull;</span>

                                    <div className="relative">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setIsLocationOpen(!isLocationOpen);
                                                setIsCalendarOpen(false);
                                            }}
                                            className={Styles.DATE_LOCATION_BUTTON_STYLES}
                                        >
                                            <MapPin className="w-3.5 h-3.5 text-indigo dark:text-saffron" />
                                            <span>{locationName}</span>
                                        </button>

                                        {isLocationOpen && (
                                            <div
                                                onClick={(e) => e.stopPropagation()}
                                                className={Styles.LOCATION_POPOVER_STYLES}
                                            >
                                                <div className="flex justify-between items-center">
                                                    <h4 className="font-serif font-bold text-base text-midnight dark:text-cream">Update Location</h4>
                                                    <button onClick={(e) => { e.stopPropagation(); setIsLocationOpen(false); }} className="text-slate-500 hover:text-slate-800 dark:hover:text-cream font-bold text-lg leading-none">&times;</button>
                                                </div>

                                                {/* Country Dropdown */}
                                                <div className="flex flex-col gap-1 relative z-20">
                                                    <label className={Styles.LOCATION_INPUT_LABEL_STYLES}>Country</label>
                                                    <div className="relative">
                                                        <button
                                                            type="button"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setIsCountryDropdownOpen(!isCountryDropdownOpen);
                                                            }}
                                                            className={Styles.LOCATION_SELECT_STYLES + " flex items-center justify-between text-left"}
                                                        >
                                                            <span className="truncate">{tempCountry}</span>
                                                        </button>
                                                        <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />

                                                        {isCountryDropdownOpen && (
                                                            <div className={Styles.SUGGESTIONS_CONTAINER_STYLES}>
                                                                <div className="p-2 border-b border-slate-100 dark:border-slate-800 sticky top-0 bg-white dark:bg-[#181226]">
                                                                    <input
                                                                        type="text"
                                                                        placeholder="Search country..."
                                                                        value={searchCountry}
                                                                        onChange={(e) => setSearchCountry(e.target.value)}
                                                                        className="w-full bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-amber-500/30 rounded-lg px-2 py-1.5 text-xs text-slate-700 dark:text-cream focus:outline-none focus:border-purple/50"
                                                                        onClick={(e) => e.stopPropagation()}
                                                                    />
                                                                </div>
                                                                {(Array.isArray(countriesList) ? countriesList : []).filter(c => (c.CountryName1 || c.CountryName || "").toLowerCase().includes(searchCountry.toLowerCase())).map((c) => (
                                                                    <button
                                                                        key={c.Id}
                                                                        type="button"
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            setTempCountry(c.CountryName1);
                                                                            setIsCountryDropdownOpen(false);
                                                                            setSearchCountry('');
                                                                        }}
                                                                        className="w-full text-left px-3 py-2 text-xs text-slate-700 dark:text-cream hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer font-medium"
                                                                    >
                                                                        {c.CountryName1}
                                                                    </button>
                                                                ))}
                                                                {(Array.isArray(countriesList) ? countriesList : []).filter(c => (c.CountryName || "").toLowerCase().includes(searchCountry.toLowerCase())).length === 0 && (
                                                                    <div className="p-3 text-xs text-slate-500 text-center">No countries found.</div>
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* City Input */}
                                                <div className="flex flex-col gap-1 relative z-10">
                                                    <label className={Styles.LOCATION_INPUT_LABEL_STYLES}>City</label>
                                                    <div className="relative">
                                                        <input
                                                            type="text"
                                                            value={tempCity}
                                                            onChange={(e) => setTempCity(e.target.value)}
                                                            className={Styles.LOCATION_INPUT_STYLES}
                                                            placeholder="Enter city"
                                                        />
                                                        {isSearchingCities && (
                                                            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
                                                                <span className="w-3.5 h-3.5 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Autocomplete Suggestions */}
                                                    {citySuggestions.length > 0 && (
                                                        <div className={Styles.SUGGESTIONS_CONTAINER_STYLES}>
                                                            {citySuggestions.map((suggestion: any, itemIndex: number) => (
                                                                <button
                                                                    key={itemIndex}
                                                                    onClick={() => {
                                                                        setTempCity(suggestion.City);
                                                                        const newLat = parseFloat(suggestion.Latitude);
                                                                        const newLng = parseFloat(suggestion.Longitude);
                                                                        setCoordinates({ lat: newLat, lng: newLng });
                                                                        localStorage.setItem('panchang_lat', String(newLat));
                                                                        localStorage.setItem('panchang_lng', String(newLng));
                                                                        if (suggestion.TimeZone) {
                                                                            setTimezone(suggestion.TimeZone);
                                                                            localStorage.setItem('panchang_timezone', suggestion.TimeZone);
                                                                        }
                                                                        const statePart = suggestion.StateorProvince ? `${suggestion.StateorProvince}, ` : '';
                                                                        const formattedName = `${suggestion.City}, ${statePart}${suggestion.Country}`;
                                                                        setLocationName(formattedName);
                                                                        localStorage.setItem('panchang_location_name', formattedName);
                                                                        setCitySuggestions([]);
                                                                        setIsLocationOpen(false);
                                                                    }}
                                                                    className="w-full text-left px-3 py-2 text-xs text-slate-700 dark:text-cream hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer font-medium"
                                                                >
                                                                    {suggestion.City}{suggestion.StateorProvince ? `, ${suggestion.StateorProvince}` : ''}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>

                                                <button
                                                    onClick={handleApplyLocation}
                                                    className={Styles.APPLY_LOCATION_BTN_STYLES}
                                                >
                                                    Apply Location
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Astronomy Ticker */}
                        <div className={Styles.ASTRO_TICKER_CONTAINER_STYLES}>
                            <div className={Styles.TICKER_ITEM_STYLES}>
                                <Sun className="w-5 h-5 text-amber-500" />
                                <div className="flex flex-col">
                                    <span className="text-[9px] uppercase tracking-wider font-bold text-slate-500 dark:text-slate-500">Sunrise</span>
                                    <span className="text-xs font-mono font-semibold text-midnight dark:text-cream">{formatTime(panchangData?.SunriseTime) || '5:51 AM'}</span>
                                </div>
                            </div>
                            <div className={Styles.TICKER_DIVIDER_STYLES} />
                            <div className={Styles.TICKER_ITEM_STYLES}>
                                <Sunset className="w-5 h-5 text-amber-500" />
                                <div className="flex flex-col">
                                    <span className="text-[9px] uppercase tracking-wider font-bold text-slate-500 dark:text-slate-500">Sunset</span>
                                    <span className="text-xs font-mono font-semibold text-midnight dark:text-cream">{formatTime(panchangData?.SunsetTime) || '6:35 PM'}</span>
                                </div>
                            </div>
                            <div className={Styles.TICKER_DIVIDER_STYLES} />
                            <div className={Styles.TICKER_ITEM_STYLES}>
                                <Moon className="w-5 h-5 text-purple-500 dark:text-purple-300" />
                                <div className="flex flex-col">
                                    <span className="text-[9px] uppercase tracking-wider font-bold text-slate-500 dark:text-slate-500">Moonrise</span>
                                    <span className="text-xs font-mono font-semibold text-midnight dark:text-cream">{formatTime(panchangData?.MoonriseTime) || '9:54 PM'}</span>
                                </div>
                            </div>
                            <div className={Styles.TICKER_DIVIDER_STYLES} />
                            <div className={Styles.TICKER_ITEM_STYLES}>
                                <MoonStar className="w-5 h-5 text-purple-500 dark:text-purple-300" />
                                <div className="flex flex-col">
                                    <span className="text-[9px] uppercase tracking-wider font-bold text-slate-500 dark:text-slate-500">Moonset</span>
                                    <span className="text-xs font-mono font-semibold text-midnight dark:text-cream">{formatTime(panchangData?.MoonsetTime) || '10:00 AM'}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={Styles.CONTENT_GRID_STYLES}>

                        {/* Child 1: Auspicious & Inauspicious Timings */}
                        <div className="md:col-start-1 md:row-start-1 lg:col-start-1 lg:row-start-1 h-full w-full">
                            <div className={Styles.DATA_BOX_BASE_STYLES}>
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 blur-[20px] rounded-full pointer-events-none" />
                                <div className="relative z-10 flex flex-col items-start w-full gap-1">
                                    <span className={`${Styles.DATA_ROW_LABEL_STYLES} flex items-center gap-2`}>
                                        <ThumbsUp className="w-4 h-4 text-emerald-500" />
                                        Good Time (Gulikai)
                                    </span>
                                    <span className={Styles.DATA_ROW_VALUE_STYLES}>
                                        {panchangData?.specialKalas?.GoodTimeStart && panchangData?.specialKalas?.GoodTimeEnd
                                            ? `${formatTime(panchangData.specialKalas.GoodTimeStart)} — ${formatTime(panchangData.specialKalas.GoodTimeEnd)}`
                                            : '09:00 AM — 10:30 AM'}
                                    </span>
                                </div>
                                <div className={Styles.DATA_DIVIDER_STYLES} />
                                <div className="relative z-10 flex flex-col items-start w-full gap-1">
                                    <span className={`${Styles.DATA_ROW_LABEL_STYLES} flex items-center gap-2`}>
                                        <AlertTriangle className="w-4 h-4 text-amber-500" />
                                        Danger Time (Yamagandam)
                                    </span>
                                    <span className={Styles.DATA_ROW_VALUE_STYLES}>
                                        {panchangData?.specialKalas?.DangerTimeStart && panchangData?.specialKalas?.DangerTimeEnd
                                            ? `${formatTime(panchangData.specialKalas.DangerTimeStart)} — ${formatTime(panchangData.specialKalas.DangerTimeEnd)}`
                                            : '01:30 PM — 03:00 PM'}
                                    </span>
                                </div>
                                <div className={Styles.DATA_DIVIDER_STYLES} />
                                <div className="relative z-10 flex flex-col items-start w-full gap-1">
                                    <span className={`${Styles.DATA_ROW_LABEL_STYLES} flex items-center gap-2`}>
                                        <Skull className="w-4 h-4 text-red-500" />
                                        Poison Time (Rahu Kalam)
                                    </span>
                                    <span className={Styles.DATA_ROW_VALUE_STYLES}>
                                        {panchangData?.specialKalas?.PoisonTimeStart && panchangData?.specialKalas?.PoisonTimeEnd
                                            ? `${formatTime(panchangData.specialKalas.PoisonTimeStart)} — ${formatTime(panchangData.specialKalas.PoisonTimeEnd)}`
                                            : '03:00 PM — 04:30 PM'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Child 4: Additional Elements Box */}
                        <div className="md:col-start-1 md:row-start-2 lg:col-start-1 lg:row-start-2 h-full w-full">
                            <div className={Styles.DATA_BOX_ALT_STYLES}>
                                <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo/5 blur-[20px] rounded-full pointer-events-none" />
                                <div className="relative z-10 flex flex-col items-start w-full gap-1">
                                    <span className={`${Styles.DATA_ROW_LABEL_STYLES} flex items-center gap-2`}>
                                        <Zap className="w-4 h-4 text-purple-500 dark:text-purple-400" />
                                        Energy (Yoga)
                                    </span>
                                    <span className={Styles.DATA_ROW_VALUE_STYLES}>{panchangData?.yoga?.YogaName || 'Siddhi'}</span>
                                </div>
                                <div className={Styles.DATA_DIVIDER_STYLES} />
                                <div className="relative z-10 flex flex-col items-start w-full gap-1">
                                    <span className={`${Styles.DATA_ROW_LABEL_STYLES} flex items-center gap-2`}>
                                        <Calendar className="w-4 h-4 text-purple-500 dark:text-purple-400" />
                                        Half-Lunar Day
                                    </span>
                                    <span className={Styles.DATA_ROW_VALUE_STYLES}>{panchangData?.karana?.KaranaName || 'Kaarthar'}</span>
                                </div>
                            </div>
                        </div>

                        {/* Child 2: Tithi & Quick Info */}
                        <div className="md:col-start-2 md:row-start-1 lg:col-start-2 lg:row-start-1 h-full w-full">
                            {/* Tithi Timings */}
                            <div className="bg-white/40 dark:bg-black/10 p-5 rounded-2xl border border-purple/5 dark:border-white/5">
                                <h3 className={Styles.ELEMENT_TITLE_STYLES}>
                                    <Moon className="w-4 h-4 text-purple dark:text-gold" /> Lunar Day (Tithi)
                                </h3>
                                <div className={Styles.ELEMENT_LIST_STYLES}>
                                    <div className="pl-4 relative">
                                        <div className="absolute top-1.5 -left-[5px] w-2 h-2 rounded-full bg-purple dark:bg-gold" />
                                        <p className={Styles.ACTIVE_ITEM_TITLE_STYLES}>
                                            {formatCamelCase(panchangData?.tithi?.TithiName) || 'Krishna Paksha Chathurthi'}
                                            <span className="w-3 h-3 rounded-full border border-midnight dark:border-cream flex items-center justify-center overflow-hidden">
                                                <span className="w-1.5 h-3 bg-midnight dark:bg-cream block mr-auto" />
                                            </span>
                                        </p>
                                        <p className={Styles.ITEM_DATE_STYLES}>
                                            {formatDateRange(panchangData?.tithi?.TithiStart, panchangData?.tithi?.TithiEnd) || 'Jul 03, 11:20 AM — Jul 04, 12:40 PM'}
                                        </p>
                                    </div>
                                    <div className="pl-4 relative opacity-80 mt-3">
                                        <div className="absolute top-1.5 -left-[5px] w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700" />
                                        <p className={Styles.ACTIVE_ITEM_TITLE_STYLES}>
                                            {formatCamelCase(panchangData?.tithi?.NextTithiName) || 'Krishna Paksha Panchami'}
                                        </p>
                                        <p className={Styles.ITEM_DATE_STYLES}>
                                            {formatDateRange(panchangData?.tithi?.TithiEnd, panchangData?.tithi?.NextToNextTithiEnd || panchangData?.tithi?.NextTithiEnd) || 'Jul 04, 12:40 PM — Jul 05, 01:31 PM'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Child 3: Nakshatram */}
                        <div className="md:col-start-2 md:row-start-2 lg:col-start-3 lg:row-start-1 h-full w-full">
                            <div className="pt-5 pl-5 h-full">
                                <h3 className={Styles.ELEMENT_TITLE_STYLES}>
                                    <Star className="w-4 h-4 text-indigo dark:text-saffron" /> Star Details (Nakshatra)
                                </h3>
                                <div className={Styles.ELEMENT_ALT_LIST_STYLES}>
                                    <div className="pl-4 relative">
                                        <div className="absolute top-1.5 -left-[5px] w-2 h-2 rounded-full bg-indigo dark:bg-saffron" />
                                        <p className={Styles.ACTIVE_ALT_ITEM_TITLE_STYLES}>
                                            {panchangData?.nakshatra?.NakshatraName || 'Avittam'}
                                            <span className="text-[10px] bg-purple-500/10 dark:bg-saffron/10 px-2 py-0.5 rounded text-purple-600 dark:text-saffron/80 uppercase tracking-wider">Active</span>
                                        </p>
                                        <p className={Styles.ITEM_DATE_STYLES}>
                                            {formatDateRange(panchangData?.nakshatra?.NakshatraStart, panchangData?.nakshatra?.NakshatraEnd) || 'Jul 03, 11:46 AM — Jul 04, 01:43 PM'}
                                        </p>
                                    </div>
                                    <div className="pl-4 relative opacity-80 mt-3">
                                        <div className="absolute top-1.5 -left-[5px] w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700" />
                                        <p className="text-[13px] font-semibold text-midnight dark:text-cream">
                                            {panchangData?.nakshatra?.NextNakshatraName || 'Sadhayam'}
                                        </p>
                                        <p className={Styles.ITEM_DATE_STYLES}>
                                            {formatDateRange(panchangData?.nakshatra?.NakshatraEnd, panchangData?.nakshatra?.NextToNextNakshatraEnd || panchangData?.nakshatra?.NextNakshatraEnd) || 'Jul 04, 01:43 PM — Jul 05, 03:12 PM'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Child 5: To-Do & Avoid spanning 2 columns on desktop */}
                        <div className="md:col-span-2 md:row-start-3 lg:col-span-2 lg:col-start-2 lg:row-start-2 h-full w-full">
                            <div className={Styles.DATA_BOX_BASE_STYLES}>
                                <div className="grid grid-cols-[80px_1fr] gap-y-4 gap-x-2 items-start">
                                    <span className="text-[11px] md:text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400 pt-[2px]">To Do</span>
                                    <span className="text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                                        {todayContentData?.DosDonts?.Dos || 'Monetary transactions, litigation, progressive acts'}
                                    </span>

                                    <span className="text-[11px] md:text-xs font-bold uppercase tracking-widest text-purple-600 dark:text-purple-400 pt-[2px]">Avoid</span>
                                    <span className="text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                                        {todayContentData?.DosDonts?.Donts || 'Travel, new meetings, important signings'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}