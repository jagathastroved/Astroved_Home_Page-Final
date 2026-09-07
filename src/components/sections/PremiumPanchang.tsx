import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import {
  MapPin,
  Calendar,
  Clock,
  Sun,
  Sunset,
  Moon,
  MoonStar,
  Star,
  ChevronDown,
  ThumbsUp,
  AlertTriangle,
  Skull,
  Zap,
} from "lucide-react";
import {
  fetchCitySuggestions,
  fetchPanchangData,
  fetchTodayContent,
  initializeLocationCookies,
} from "../../services/astrovedService";
import { fetchCountries, searchLocation } from "../../services/locationService";

const Styles = {
  SECTION_STYLES: "relative py-4 pb-20 md:pb-6 md:py-6 overflow-hidden",
  BACKGROUND_GLOW_STYLES:
    "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-[600px] bg-indigo/5 dark:bg-gold/5 blur-[120px] rounded-full pointer-events-none",
  CONTENT_WRAPPER_STYLES: "max-w-7xl mx-auto px-4 sm:px-6 relative z-10",
  HEADER_CONTAINER_STYLES: "text-center max-w-3xl mx-auto mb-10",
  HEADER_SUBTITLE_STYLES:
    "text-amber-600 dark:text-amber-400 font-sans text-xs md:text-sm uppercase tracking-widest font-bold mb-3",
  HEADER_TITLE_STYLES:
    "font-serif text-3xl sm:text-4xl md:text-5xl text-midnight dark:text-cream leading-tight font-bold mb-4",
  HEADER_TITLE_HIGHLIGHT_STYLES: "text-amber-600 dark:text-amber-400 italic",
  HEADER_DESC_STYLES:
    "font-sans text-gray-500 dark:text-gray-400 text-sm md:text-base lg:text-lg leading-relaxed max-w-2xl mx-auto font-medium",
  MAIN_PANEL_STYLES:
    "bg-white dark:bg-[#0c0f24] rounded-[2rem] p-4 sm:p-6 lg:p-10 relative overflow-hidden shadow-2xl border border-black/5 dark:border-amber-500/40 dark:shadow-[0_0_15px_rgba(245,158,11,0.2)] hover:border-[#facc15]/50 hover:shadow-[0_0_40px_rgba(250,204,21,0.2)] transition-all duration-500",
  TOP_BAR_STYLES:
    "flex flex-col xl:flex-row justify-between items-center gap-6 border-b border-black/5 dark:border-amber-500/40 dark:shadow-[0_0_15px_rgba(245,158,11,0.2)] pb-4 mb-5 md:pb-8 md:mb-8",
  DATE_LOCATION_BUTTON_STYLES:
    "flex items-center gap-1 cursor-pointer hover:underline decoration-dotted text-slate-600 dark:text-slate-400",
  DOT_DIVIDER_STYLES: "text-purple/30 dark:text-gold/30",
  POPOVER_BACKDROP_STYLES:
    "fixed inset-0 bg-black/40 backdrop-blur-sm z-40 sm:hidden cursor-pointer",
  CALENDAR_POPOVER_STYLES:
    "fixed sm:absolute top-[25%] sm:top-full left-4 right-4 sm:left-0 sm:right-auto sm:translate-x-0 mx-auto sm:mx-0 mt-2 z-50 w-auto sm:w-[280px] max-w-[340px] sm:max-w-none p-4 bg-white dark:bg-[#110c1c] border border-black/10 dark:border-amber-500/40 rounded-2xl shadow-2xl flex flex-col text-slate-800 dark:text-cream select-none",
  LOCATION_POPOVER_STYLES:
    "fixed sm:absolute top-[25%] sm:top-full left-4 right-4 sm:left-0 sm:right-auto sm:translate-x-0 mx-auto sm:mx-0 mt-2 z-50 w-auto sm:w-[280px] max-w-[340px] sm:max-w-none max-h-[70vh] overflow-y-auto p-5 bg-white dark:bg-[#110c1c] border border-black/10 dark:border-amber-500/40 rounded-2xl shadow-2xl flex flex-col gap-4 text-left",
  LOCATION_INPUT_LABEL_STYLES:
    "text-[9px] font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase",
  LOCATION_SELECT_STYLES:
    "w-full bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-amber-500/30 rounded-xl px-3 py-2.5 text-xs text-slate-700 dark:text-cream focus:outline-none appearance-none cursor-pointer pr-8",
  LOCATION_INPUT_STYLES:
    "w-full bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-amber-500/30 rounded-xl px-3 py-2.5 text-xs text-slate-700 dark:text-cream focus:outline-none focus:border-purple/50 pr-8",
  SUGGESTIONS_CONTAINER_STYLES:
    "relative w-full max-h-48 overflow-y-auto bg-transparent z-50 flex flex-col divide-y divide-slate-100 dark:divide-slate-800",
  APPLY_LOCATION_BTN_STYLES:
    "w-full bg-[#2b1845] hover:bg-[#3d245f] text-white py-2.5 rounded-xl text-xs font-bold transition-all text-center shadow-md shadow-[#2b1845]/20 mt-1",
  ASTRO_TICKER_CONTAINER_STYLES:
    "grid grid-cols-2 sm:flex sm:flex-row items-center justify-center gap-4 sm:gap-6 bg-white/60 dark:bg-[#0c0f24]/50 backdrop-blur-md px-6 py-4 rounded-2xl border border-purple/10 dark:border-amber-500/40 dark:shadow-[0_0_15px_rgba(245,158,11,0.2)] w-full xl:w-auto shadow-sm dark:shadow-none",
  TICKER_ITEM_STYLES: "flex items-center gap-2",
  TICKER_DIVIDER_STYLES:
    "w-px h-8 bg-black/10 dark:bg-white/10 hidden sm:block",
  CONTENT_GRID_STYLES:
    "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8",
  DATA_BOX_BASE_STYLES:
    "bg-white/70 dark:bg-black/20 p-5 rounded-2xl border border-purple/10 dark:border-amber-500/40 dark:shadow-[0_0_15px_rgba(245,158,11,0.2)] shadow-sm space-y-3 relative overflow-hidden",
  DATA_BOX_ALT_STYLES:
    "bg-white/70 dark:bg-black/20 p-5 rounded-2xl border border-indigo/10 dark:border-amber-500/40 dark:shadow-[0_0_15px_rgba(245,158,11,0.2)] shadow-sm space-y-3 relative overflow-hidden",
  DATA_ROW_LABEL_STYLES:
    "text-xs md:text-sm font-bold text-slate-500 dark:text-slate-400 tracking-tight xl:tracking-normal",
  DATA_ROW_VALUE_STYLES:
    "text-xs md:text-sm font-medium text-slate-700 dark:text-slate-300 pl-6 text-left",
  DATA_DIVIDER_STYLES: "relative z-10 w-full h-px bg-black/5 dark:bg-white/5",
  ELEMENT_TITLE_STYLES:
    "text-sm md:text-base font-sans font-bold text-midnight dark:text-cream mb-4 flex items-center gap-2",
  ELEMENT_LIST_STYLES:
    "space-y-3 pl-2 border-l-2 border-purple/20 dark:border-gold/20",
  ELEMENT_ALT_LIST_STYLES:
    "space-y-3 pl-2 border-l-2 border-indigo/20 dark:border-saffron/20",
  ACTIVE_ITEM_TITLE_STYLES:
    "text-sm md:text-[15px] font-semibold text-midnight dark:text-cream flex items-center gap-2",
  ACTIVE_ALT_ITEM_TITLE_STYLES:
    "text-sm md:text-[15px] font-semibold text-midnight dark:text-cream flex flex-wrap items-center gap-2",
  ITEM_DATE_STYLES:
    "text-xs md:text-sm font-mono text-slate-600 dark:text-slate-400 mt-1",
  getCalendarDayStyles: function (
    isSelected: boolean,
    isToday: boolean,
    isCurrentMonth: boolean,
  ) {
    let base = "text-[11px] py-1 rounded-lg transition-all ";
    if (isSelected) {
      base += "bg-[#2b1845] text-white font-bold shadow-md";
    } else if (isToday) {
      base +=
        "border border-[#2b1845]/80 bg-[#ece9f2] dark:bg-[#2b1845]/30 dark:border-amber-500/50 text-[#2b1845] dark:text-amber-400 font-bold";
    } else if (isCurrentMonth) {
      base +=
        "text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5";
    } else {
      base +=
        "text-slate-300 dark:text-slate-600 hover:bg-slate-100/50 dark:hover:bg-white/5";
    }
    return base;
  },
};

// ---------------------------------------------------------------------------
// Cookie helpers
// ---------------------------------------------------------------------------
const getCookie = (name: string) => {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(?:^|;\\s*)" + name + "=([^;]+)"));
  if (!match) return null;
  const decoded = decodeURIComponent(match[1]);
  if (name === "city" || name === "country" || name === "countryCode") {
    return decoded.replace(/_/g, " ");
  }
  return decoded;
};

const setCookie = (name: string, value: string, days = 30) => {
  if (typeof document === "undefined") return;
  const d = new Date();
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${d.toUTCString()};path=/`;
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

// ---------------------------------------------------------------------------
// Location resolution helpers
// ---------------------------------------------------------------------------
const ASTROVED_IP_LOCATION_ENDPOINT =
  "https://astroved.com/new/Home/GetLocationBasedOnIp";

type ResolvedLocation = {
  lat: number;
  lng: number;
  city: string;
  state?: string;
  countryCode: string;
  timezone?: string;
};

/** Resolves the user's location via the AstroVed IP-lookup API. */
const detectLocationFromNetwork = async (): Promise<ResolvedLocation> => {
  const response = await fetch(ASTROVED_IP_LOCATION_ENDPOINT);
  if (!response.ok) throw new Error("AstroVed IP location API failed");

  const data = await response.json();
  const lat = data.latitude;
  const lng = data.longitude;
  // console.log('responce', data, 'lat', lat)
  if (!lat || !lng) {
    throw new Error("AstroVed IP location API returned no coordinates");
  }

  return {
    lat: parseFloat(lat),
    lng: parseFloat(lng),
    city: data.city || "Unknown",
    state: data.state || "unKnown",
    countryCode: data.countryCode || "unKnown",
    timezone: data.timeZone || "Asia/Kolkata",
  };
};

export function PremiumPanchang() {
  const [panchangData, setPanchangData] = useState<any>(null);
  const [todayContentData, setTodayContentData] = useState<any>(null);
  const [locationName, setLocationName] = useState<string>(() => {
    const pl = getPanchangLocation();
    if (pl) {
      const parts = [];
      if (pl.City && pl.City !== "Unknown") parts.push(pl.City);
      if (pl.State && pl.State !== "Unknown") parts.push(pl.State);
      if (pl.Country && pl.Country !== "Unknown") parts.push(pl.Country);
      if (parts.length > 0) return parts.join(", ");
    }
    return "";
  });
  const [coordinates, setCoordinates] = useState<{
    lat: number;
    lng: number;
  } | null>(() => {
    const pl = getPanchangLocation();
    return pl && pl.Latitude && pl.Longititude ? { lat: parseFloat(pl.Latitude), lng: parseFloat(pl.Longititude) } : null;
  });
  const [timezone, setTimezone] = useState<string>(() => {
    const pl = getPanchangLocation();
    if (pl && pl.TimeZone) return pl.TimeZone;
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone || "Asia/Kolkata";
    } catch (e) {
      return "Asia/Kolkata";
    }
  });
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLocationReady, setIsLocationReady] = useState<boolean>(() => {
    return !!getPanchangLocation();
  });

  // Custom Calendar & Location popover states
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [calendarYear, setCalendarYear] = useState<number>(
    new Date().getFullYear(),
  );
  const [calendarMonth, setCalendarMonth] = useState<number>(
    new Date().getMonth(),
  );
  const [tempCountry, setTempCountry] = useState(() => {
    const pl = getPanchangLocation();
    if (pl && pl.Country) return pl.Country;
    return "";
  });
  const [tempCity, setTempCity] = useState(() => {
    const pl = getPanchangLocation();
    if (pl && pl.City) return pl.City;
    return "";
  });
  const [citySuggestions, setCitySuggestions] = useState<any[]>([]);
  const [isSearchingCities, setIsSearchingCities] = useState(false);
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [searchCountry, setSearchCountry] = useState("");
  const [countriesList, setCountriesList] = useState<any[]>([]);
  const [isCitySelected, setIsCitySelected] = useState(false);
  const isDetectingLocation = useRef(false);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  /**
   * Applies a resolved location (coords + timezone + display name) to state
   * and persists it to cookies. Single source of truth for "committing" a
   * location, used by auto-detection, search, and manual selection flows.
   */
  const applyLocation = (
    lat: number,
    lng: number,
    tz: string | undefined,
    name: string,
  ) => {
    setCoordinates({ lat, lng });
    const effectiveTz = tz || timezone || "Asia/Kolkata";
    setTimezone(effectiveTz);
    setLocationName(name);

    const parts = name.split(",");
    const city = parts[0]?.trim() || "";
    const country = parts[parts.length - 1]?.trim() || "";
    const state = parts.length > 2 ? parts[1]?.trim() : "";

    const pl = getPanchangLocation();
    const currentCountryCode = (pl && pl.CountryCode) ? pl.CountryCode : "";
    const currentState = state || ((pl && pl.State) ? pl.State : "");
    const expires = new Date();
    expires.setTime(expires.getTime() + 7 * 24 * 60 * 60 * 1000);
    const expirydays = expires.toUTCString();
    document.cookie = "PanchangLocation=Latitude=" + lat + "&Longititude=" + lng + "&TimeZone=" + effectiveTz + "&City=" + city + "&State=" + currentState + "&Country=" + country + "&CountryCode=" + currentCountryCode + ";expires=" + expirydays + ";path=/";
  };

  useEffect(() => {
    fetchCountries()
      .then((data) => {
        const countriesArray = Array.isArray(data)
          ? data
          : data.Countries ||
          data.Data ||
          (typeof data === "object" &&
            Object.values(data).find(Array.isArray)) ||
          [];
        setCountriesList(countriesArray);
      })
      .catch((err) => console.error("Error fetching countries:", err));
  }, []);

  // Auto-detect the user's location on first load: Cloudflare headers first,
  // AstroVed IP-lookup API as fallback. Skipped entirely if a location is
  // already saved in cookies.
  useEffect(() => {
    if (getPanchangLocation()) {
      setIsLocationReady(true);
      return;
    }

    if (isDetectingLocation.current) return;
    isDetectingLocation.current = true;

    const detectLocation = async () => {
      try {
        const resolved = await initializeLocationCookies();
        const countryName = resolved.countryName || "Unknown";
        const stateName = resolved.stateName;
        const statePart = stateName && stateName !== "Unknown" ? `${stateName}, ` : "";
        let formattedName = resolved.locationName || `${resolved.city || "Unknown"}, ${statePart}${countryName}`;

        try {
          const astrovedLocData = await fetchCitySuggestions(countryName, resolved.city || "Unknown");
          if (Array.isArray(astrovedLocData) && astrovedLocData.length > 0) {
            const match = astrovedLocData[0];
            const statePart = match.StateorProvince && match.StateorProvince !== "Unknown" ? `${match.StateorProvince}, ` : "";
            formattedName = `${match.City || resolved.city || "Unknown"}, ${statePart}${match.Country || countryName}`;
          }
        } catch (e) {
          console.error("Astroved location enrichment failed:", e);
        }

        applyLocation(
          parseFloat(resolved.latitude),
          parseFloat(resolved.longitude),
          resolved.timeZone || "Asia/Kolkata",
          formattedName,
        );
        setTempCity(resolved.city || "Unknown");
        setTempCountry(countryName);
      } catch (err) {
        console.error("Unable to auto-detect location:", err);
      } finally {
        setIsLocationReady(true);
      }
    };

    detectLocation();
  }, []);

  useEffect(() => {
    const handleOutsideClick = () => {
      setIsCalendarOpen(false);
      setIsLocationOpen(false);
      setCitySuggestions([]);
      setIsCountryDropdownOpen(false);
      setSearchCountry("");
    };
    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, []);

  // Prevent body scroll when popovers are open on mobile screens
  useEffect(() => {
    const isMobile = window.innerWidth < 640;
    if ((isLocationOpen || isCalendarOpen) && isMobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isLocationOpen, isCalendarOpen]);

  // Fetch city suggestions dynamically as user types with debounce
  useEffect(() => {
    if (!tempCountry || !tempCity || tempCity.length < 3) {
      setCitySuggestions([]);
      return;
    }

    const delayDebounce = setTimeout(async () => {
      setIsSearchingCities(true);
      try {
        const results = await fetchCitySuggestions(tempCountry, tempCity);
        if (!results || results.length === 0) {
          setCitySuggestions([]);
          return;
        }

        const formattedCities = results.map((item: any) => {
          let disp = "";
          if (item.City) {
            const parts = [
              item.City,
              item.StateorProvince,
              item.Country,
            ].filter(Boolean);
            disp = parts.join(", ");
          } else {
            disp = item.display_name || item.name || "";
          }
          return {
            name:
              item.City || item.name || item.display_name?.split(",")[0] || "",
            displayName: disp,
            stateName: item.StateorProvince || "Unknown",
            lat: item.Latitude ? parseFloat(item.Latitude) : 0,
            lng: item.Longitude ? parseFloat(item.Longitude) : 0,
            timeZone: item.TimeZone,
            country: item.Country,
          };
        });

        // First deduplicate by exactly matching display names
        const uniqueByDisplayName = Array.from(
          new Map(
            formattedCities.map((item: any) => [item.displayName, item]),
          ).values(),
        ) as any[];

        // Then remove the redundant short versions (e.g. if "Chennai" exists and "Chennai, Tamil Nadu, India" exists, drop "Chennai")
        const finalCities = uniqueByDisplayName.filter((city) => {
          if (city.displayName === city.name) {
            const hasBetter = uniqueByDisplayName.some(
              (c) =>
                c.name.toLowerCase() === city.name.toLowerCase() &&
                c.displayName.length > city.name.length,
            );
            return !hasBetter;
          }
          return true;
        });

        setCitySuggestions(finalCities);
      } catch (err) {
        console.error("Error fetching city autocomplete suggestions:", err);
        setCitySuggestions([]);
      } finally {
        setIsSearchingCities(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [tempCity, tempCountry]);

  /**
   * Formats an ISO string to a readable 12-hour time format, stripping incorrect API timezone offsets.
   * @param {string} [isoString] - The ISO date string to format.
   * @returns {string} - The formatted time string, e.g., '05:51 AM'.
   */
  const formatTime = (isoString?: string) => {
    if (!isoString) return "";
    try {
      const str = isoString.trim();

      // 1. If string already has explicit AM/PM
      const match12 = str.match(/(\d{1,2}):(\d{2})(?::\d{2})?\s*(AM|PM)/i);
      if (match12) {
        const hours = match12[1].padStart(2, "0");
        const minutes = match12[2];
        const ampm = match12[3].toUpperCase();
        return `${hours}:${minutes} ${ampm}`;
      }

      // 2. Parse 24-hour time directly from raw API string (e.g. "2026-08-29T19:13:12" -> "07:13 PM")
      // Never use Date object timezone calculations to preserve exact API wall-clock response time.
      const match24 = str.match(/(?:T|\s|^)(\d{1,2}):(\d{2})/);
      if (match24) {
        let hours = parseInt(match24[1], 10);
        const minutes = match24[2];
        const ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12;
        if (hours === 0) hours = 12;
        const formattedHours = String(hours).padStart(2, "0");
        return `${formattedHours}:${minutes} ${ampm}`;
      }

      return str;
    } catch (e) {
      return "";
    }
  };

  /**
   * Formats a start and end ISO string into a readable date range, preserving exact API response times.
   * @param {string} [start] - The start date ISO string.
   * @param {string} [end] - The end date ISO string.
   * @returns {string} - The formatted date range.
   */
  const formatDateRange = (start?: string, end?: string) => {
    if (!start || !end) return "";
    try {
      const formatSingle = (isoStr: string) => {
        const timeFormatted = formatTime(isoStr);
        const dateMatch = isoStr.match(/(\d{4})-(\d{2})-(\d{2})/);
        if (dateMatch) {
          const monthIndex = parseInt(dateMatch[2], 10) - 1;
          const day = parseInt(dateMatch[3], 10);
          const monthNames = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ];
          const monthStr = monthNames[monthIndex] || "";
          return `${monthStr} ${String(day).padStart(2, "0")}, ${timeFormatted}`;
        }
        return timeFormatted;
      };

      return `${formatSingle(start)} — ${formatSingle(end)}`;
    } catch (e) {
      return "";
    }
  };

  /**
   * Converts camelCase or PascalCase string to spaced text.
   * @param {string} [str] - The string to format.
   * @returns {string} - The formatted readable string.
   */
  const formatCamelCase = (str?: string) => {
    if (!str) return "";
    return str.replace(/([A-Z])/g, " $1").trim();
  };

  /**
   * Computes and formats the active Hora from panchangData.Horas array or panchangData.hora object.
   */
  const getCurrentHoraInfo = (data: any) => {
    if (!data) return "";
    if (data?.hora?.HoraName) {
      const horaName = data.hora.HoraName.toLowerCase().includes("hora")
        ? data.hora.HoraName
        : `${data.hora.HoraName} Hora`;
      return horaName;
    }

    if (Array.isArray(data?.Horas) && data.Horas.length > 0) {
      const nowMs = Date.now();
      const match =
        data.Horas.find((h: any) => {
          if (!h?.StartTime || !h?.EndTime) return false;
          const sDate = new Date(h.StartTime);
          const eDate = new Date(h.EndTime);
          return nowMs >= sDate.getTime() && nowMs <= eDate.getTime();
        }) || data.Horas[0];

      if (match?.HoraName) {
        const horaName = match.HoraName.toLowerCase().includes("hora")
          ? match.HoraName
          : `${match.HoraName} Hora`;
        const timeRange =
          match.StartTime && match.EndTime
            ? ` (${formatTime(match.StartTime)} — ${formatTime(match.EndTime)})`
            : "";
        return `${horaName}${timeRange}`;
      }
    }
    return "";
  };

  /**
   * Safely formats YYYY-MM-DD into a localized date string without UTC timezone shifts.
   */
  const formatSelectedDate = (dateStr: string) => {
    if (!dateStr) return "";
    const parts = dateStr.split("-").map(Number);
    if (parts.length === 3) {
      const dateObj = new Date(parts[0], parts[1] - 1, parts[2]);
      return dateObj.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    }
    return dateStr;
  };

  // Sync calendar picker month/year when selectedDate updates
  useEffect(() => {
    const parts = selectedDate.split("-").map(Number);
    if (parts.length === 3) {
      setCalendarYear(parts[0]);
      setCalendarMonth(parts[1] - 1);
    }
  }, [selectedDate]);

  // Fetch when coordinates, date, or timezone changes
  useEffect(() => {
    if (!isLocationReady || !coordinates) return;

    let active = true;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const tz = timezone;
        const now = new Date();

        const todayDateStr = new Intl.DateTimeFormat('en-CA', {
          timeZone: tz,
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }).format(now);

        let currentTime = "00:00:00";
        if (selectedDate === todayDateStr) {
          currentTime = new Intl.DateTimeFormat('en-GB', {
            timeZone: tz,
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          }).format(now).replace(/,/g, '').trim();
        }
        const localISOTime = `${selectedDate}T${currentTime}`;
        const [panchangData, contentData] = await Promise.all([
          fetchPanchangData(tz, coordinates.lat, coordinates.lng, localISOTime),
          fetchTodayContent(tz, coordinates.lat, coordinates.lng, localISOTime),
        ]);

        if (active) {
          // console.log("Panchang Response:", panchangData);
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
    // Guard with optional chaining: coordinates can be null on first render
    // before geolocation resolves, which previously threw a TypeError here.
  }, [
    coordinates?.lat,
    coordinates?.lng,
    selectedDate,
    timezone,
    isLocationReady,
  ]);

  const handleLocationSearch = async (query: string) => {
    if (!query.trim()) return;
    try {
      const data = await searchLocation(query);
      if (!data || data.length === 0) return;

      const newLat = parseFloat(data[0].lat);
      const newLng = parseFloat(data[0].lon);

      const displayName = data[0].display_name;
      const parts = displayName.split(",");
      const city = parts[0]?.trim() || "";
      const country = parts[parts.length - 1]?.trim() || "";
      const formattedDisplay =
        city && country ? `${city}, ${country}` : displayName;

      applyLocation(newLat, newLng, undefined, formattedDisplay);

      // Try resolving a more precise timezone/name via the AstroVed API
      if (city && country) {
        try {
          const astrovedLocData = await fetchCitySuggestions(country, city);
          if (Array.isArray(astrovedLocData) && astrovedLocData.length > 0) {
            const match = astrovedLocData[0];
            const finalName = `${match.City || city}, ${match.StateorProvince}, ${match.Country}`;
            applyLocation(newLat, newLng, match.TimeZone, finalName);
          }
        } catch (e) {
          console.error(
            "Astroved location API lookup inside handleLocationSearch failed:",
            e,
          );
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
        isCurrentMonth: false,
      });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        day: i,
        month: month,
        year: year,
        isCurrentMonth: true,
      });
    }

    // Next month days
    const remaining = 42 - days.length;
    for (let i = 1; i <= remaining; i++) {
      days.push({
        day: i,
        month: month === 11 ? 0 : month + 1,
        year: month === 11 ? year + 1 : year,
        isCurrentMonth: false,
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

  const handleSelectDay = (dayObj: {
    day: number;
    month: number;
    year: number;
  }) => {
    const pad = (num: number) => String(num).padStart(2, "0");
    const formatted = `${dayObj.year}-${pad(dayObj.month + 1)}-${pad(dayObj.day)}`;
    setSelectedDate(formatted);
    setIsCalendarOpen(false);
  };

  const handleApplyLocation = async () => {
    setIsLocationOpen(false);
    const query = `${tempCity}, ${tempCountry}`;

    try {
      // Try OpenStreetMap (Nominatim) first
      const osmResults = await searchLocation(query);
      if (!osmResults || osmResults.length === 0) {
        throw new Error("OpenStreetMap returned no results");
      }

      const newLat = parseFloat(osmResults[0].lat);
      const newLng = parseFloat(osmResults[0].lon);
      const displayName = osmResults[0].display_name;
      const parts = displayName.split(",");
      const city = parts[0]?.trim() || tempCity;
      const country = parts[parts.length - 1]?.trim() || tempCountry;
      const formattedDisplay =
        city && country ? `${city}, ${country}` : displayName;

      applyLocation(newLat, newLng, undefined, formattedDisplay);

      // Enrich with Astroved for a more precise state/timezone, if available.
      // This is a best-effort enrichment, not a fallback — OSM already succeeded.
      try {
        const astrovedLocData = await fetchCitySuggestions(country, city);
        if (Array.isArray(astrovedLocData) && astrovedLocData.length > 0) {
          const match = astrovedLocData[0];
          const finalName = `${match.City || city}, ${match.StateorProvince}, ${match.Country}`;
          applyLocation(newLat, newLng, match.TimeZone, finalName);
        }
      } catch (enrichError) {
        console.error("Astroved enrichment failed (OSM result kept):", enrichError);
      }
    } catch (osmError) {
      console.warn(
        "OpenStreetMap lookup failed, falling back to Astroved's PopulateCityBycountry API:",
        osmError,
      );

      // Fallback: Astroved's PopulateCityBycountry API
      try {
        const data = await fetchCitySuggestions(tempCountry, tempCity);
        if (Array.isArray(data) && data.length > 0) {
          const match = data[0];
          const newLat = parseFloat(match.Latitude);
          const newLng = parseFloat(match.Longitude);
          const finalName = `${match.City || tempCity}, ${match.StateorProvince}, ${match.Country}`;
          applyLocation(newLat, newLng, match.TimeZone, finalName);
        }
      } catch (astrovedError) {
        console.error("Astroved fallback also failed:", astrovedError);
      }
    }
  };

  return (
    <section className={Styles.SECTION_STYLES} id="daily-panchang">
      {/* Background glow */}
      <div className={Styles.BACKGROUND_GLOW_STYLES} />

      <div className={Styles.CONTENT_WRAPPER_STYLES}>
        <div className={Styles.HEADER_CONTAINER_STYLES}>
          <p className={Styles.HEADER_SUBTITLE_STYLES}>DAILY TIMINGS</p>
          <h2 className={Styles.HEADER_TITLE_STYLES}>
            Today's Panchang —{" "}
            <em className={Styles.HEADER_TITLE_HIGHLIGHT_STYLES}>
              Your Auspicious Timings.
            </em>
          </h2>
          <p className={Styles.HEADER_DESC_STYLES}>
            Live for{" "}
            <strong className="font-bold text-gray-700 dark:text-gray-300">
              {locationName.split(",")[0]}
            </strong>{" "}
            (auto-detected). Timings update automatically for your location.
          </p>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={Styles.MAIN_PANEL_STYLES}
        >
          {isLoading && (
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/50 dark:bg-[#0c0f24]/50 backdrop-blur-sm">
              <div className="flex flex-col items-center gap-3">
                <div className="w-10 h-10 border-4 border-purple/30 border-t-purple rounded-full animate-spin"></div>
                <span className="text-sm font-bold text-slate-600 dark:text-slate-300 animate-pulse">
                  Calculating auspicious timings...
                </span>
              </div>
            </div>
          )}
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
                      <span>{formatSelectedDate(selectedDate)}</span>
                    </button>

                    {isCalendarOpen && (
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className={Styles.CALENDAR_POPOVER_STYLES}
                      >
                        {/* Calendar Header */}
                        <div className="flex items-center justify-between mb-4 px-2">
                          <button
                            onClick={handlePrevMonth}
                            className="text-purple-600 dark:text-gold hover:opacity-75 text-lg font-bold"
                          >
                            «
                          </button>
                          <span className="font-serif font-bold text-sm text-midnight dark:text-cream">
                            {months[calendarMonth]} {calendarYear}
                          </span>
                          <button
                            onClick={handleNextMonth}
                            className="text-purple-600 dark:text-gold hover:opacity-75 text-lg font-bold"
                          >
                            »
                          </button>
                        </div>

                        {/* Weekday Titles */}
                        <div className="grid grid-cols-7 gap-1 text-center mb-2">
                          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(
                            (d) => (
                              <span
                                key={d}
                                className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase"
                              >
                                {d}
                              </span>
                            ),
                          )}
                        </div>

                        {/* Grid Days */}
                        <div className="grid grid-cols-7 gap-1 text-center">
                          {getCalendarDays(calendarYear, calendarMonth).map(
                            (dayObj, itemIndex) => {
                              const isSelected =
                                selectedDate ===
                                `${dayObj.year}-${String(dayObj.month + 1).padStart(2, "0")}-${String(dayObj.day).padStart(2, "0")}`;
                              const today = new Date();
                              const isToday =
                                dayObj.day === today.getDate() &&
                                dayObj.month === today.getMonth() &&
                                dayObj.year === today.getFullYear();
                              return (
                                <button
                                  key={itemIndex}
                                  onClick={() => handleSelectDay(dayObj)}
                                  className={Styles.getCalendarDayStyles(
                                    isSelected,
                                    isToday,
                                    dayObj.isCurrentMonth,
                                  )}
                                >
                                  {dayObj.day}
                                </button>
                              );
                            },
                          )}
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
                          <h4 className="font-serif font-bold text-base text-midnight dark:text-cream">
                            Update Location
                          </h4>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsLocationOpen(false);
                            }}
                            className="text-slate-500 hover:text-slate-800 dark:hover:text-cream font-bold text-lg leading-none"
                          >
                            &times;
                          </button>
                        </div>

                        {/* Country Dropdown */}
                        <div className="flex flex-col gap-1 relative z-20">
                          <label className={Styles.LOCATION_INPUT_LABEL_STYLES}>
                            Country
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              value={tempCountry}
                              onChange={(e) => {
                                setTempCountry(e.target.value);
                                setIsCountryDropdownOpen(true);
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                                setIsCountryDropdownOpen(true);
                              }}
                              className={Styles.LOCATION_INPUT_STYLES}
                              placeholder="Search country..."
                            />
                            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />

                            {isCountryDropdownOpen && (
                              <div
                                className={Styles.SUGGESTIONS_CONTAINER_STYLES}
                              >
                                {(Array.isArray(countriesList)
                                  ? countriesList
                                  : []
                                )
                                  .filter((c) =>
                                    (c.CountryName1 || c.CountryName || "")
                                      .toLowerCase()
                                      .includes(tempCountry.toLowerCase()),
                                  )
                                  .map((c) => (
                                    <button
                                      key={c.Id}
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setTempCountry(
                                          c.CountryName1 || c.CountryName,
                                        );
                                        setTempCity("");
                                        setIsCountryDropdownOpen(false);
                                      }}
                                      className="w-full text-left px-3 py-2 text-xs text-slate-700 dark:text-cream hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer font-medium"
                                    >
                                      {c.CountryName1 || c.CountryName}
                                    </button>
                                  ))}
                                {(Array.isArray(countriesList)
                                  ? countriesList
                                  : []
                                ).filter((c) =>
                                  (c.CountryName1 || c.CountryName || "")
                                    .toLowerCase()
                                    .includes(tempCountry.toLowerCase()),
                                ).length === 0 && (
                                    <div className="p-3 text-xs text-slate-500 text-center">
                                      No countries found.
                                    </div>
                                  )}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* City Input */}
                        <div className="flex flex-col gap-1 relative z-10">
                          <label className={Styles.LOCATION_INPUT_LABEL_STYLES}>
                            City
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              value={tempCity}
                              onChange={(e) => {
                                setTempCity(e.target.value);
                                setIsCitySelected(false);
                              }}
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
                            <div
                              className={Styles.SUGGESTIONS_CONTAINER_STYLES}
                            >
                              {citySuggestions.map(
                                (suggestion: any, itemIndex: number) => (
                                  <button
                                    key={itemIndex}
                                    onClick={() => {
                                      setTempCity(suggestion.name);
                                      setIsCitySelected(true);
                                      setCitySuggestions([]);
                                      setIsLocationOpen(false);
                                      applyLocation(
                                        suggestion.lat,
                                        suggestion.lng,
                                        suggestion.timeZone,
                                        suggestion.displayName
                                      );
                                    }}
                                    className="w-full text-left px-3 py-2 text-xs text-slate-700 dark:text-cream hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer font-medium"
                                  >
                                    {suggestion.displayName}
                                  </button>
                                ),
                              )}
                            </div>
                          )}
                          {tempCity.length >= 3 &&
                            !isSearchingCities &&
                            citySuggestions.length === 0 &&
                            tempCountry &&
                            !isCitySelected &&
                            tempCity !== locationName.split(",")[0].trim() && (
                              <div
                                className={Styles.SUGGESTIONS_CONTAINER_STYLES}
                              >
                                <div className="p-3 text-xs text-slate-500 text-center">
                                  No city found.
                                </div>
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
                  <span className="text-[9px] uppercase tracking-wider font-bold text-slate-500 dark:text-slate-500">
                    Sunrise
                  </span>
                  <span className="text-xs font-mono font-semibold text-midnight dark:text-cream">
                    {formatTime(panchangData?.SunriseTime)}
                  </span>
                </div>
              </div>
              <div className={Styles.TICKER_DIVIDER_STYLES} />
              <div className={Styles.TICKER_ITEM_STYLES}>
                <Sunset className="w-5 h-5 text-amber-500" />
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase tracking-wider font-bold text-slate-500 dark:text-slate-500">
                    Sunset
                  </span>
                  <span className="text-xs font-mono font-semibold text-midnight dark:text-cream">
                    {formatTime(panchangData?.SunsetTime)}
                  </span>
                </div>
              </div>
              <div className={Styles.TICKER_DIVIDER_STYLES} />
              <div className={Styles.TICKER_ITEM_STYLES}>
                <Moon className="w-5 h-5 text-purple-500 dark:text-purple-300" />
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase tracking-wider font-bold text-slate-500 dark:text-slate-500">
                    Moonrise
                  </span>
                  <span className="text-xs font-mono font-semibold text-midnight dark:text-cream">
                    {formatTime(
                      panchangData?.MoonRiseTime || panchangData?.MoonriseTime,
                    )}
                  </span>
                </div>
              </div>
              <div className={Styles.TICKER_DIVIDER_STYLES} />
              <div className={Styles.TICKER_ITEM_STYLES}>
                <MoonStar className="w-5 h-5 text-purple-500 dark:text-purple-300" />
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase tracking-wider font-bold text-slate-500 dark:text-slate-500">
                    Moonset
                  </span>
                  <span className="text-xs font-mono font-semibold text-midnight dark:text-cream">
                    {formatTime(
                      panchangData?.MoonSetTime || panchangData?.MoonsetTime,
                    )}
                  </span>
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
                  <span
                    className={`${Styles.DATA_ROW_LABEL_STYLES} flex items-center gap-2`}
                  >
                    <ThumbsUp className="w-4 h-4 text-emerald-500" />
                    Good Time (Gulikai)
                  </span>
                  <span className={Styles.DATA_ROW_VALUE_STYLES}>
                    {panchangData?.specialKalas?.GoodTimeStart &&
                      panchangData?.specialKalas?.GoodTimeEnd
                      ? `${formatTime(panchangData.specialKalas.GoodTimeStart)} — ${formatTime(panchangData.specialKalas.GoodTimeEnd)}`
                      : "--"}
                  </span>
                </div>
                <div className={Styles.DATA_DIVIDER_STYLES} />
                <div className="relative z-10 flex flex-col items-start w-full gap-1">
                  <span
                    className={`${Styles.DATA_ROW_LABEL_STYLES} flex items-center gap-2`}
                  >
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                    Danger Time (Yamagandam)
                  </span>
                  <span className={Styles.DATA_ROW_VALUE_STYLES}>
                    {panchangData?.specialKalas?.DangerTimeStart &&
                      panchangData?.specialKalas?.DangerTimeEnd
                      ? `${formatTime(panchangData.specialKalas.DangerTimeStart)} — ${formatTime(panchangData.specialKalas.DangerTimeEnd)}`
                      : "--"}
                  </span>
                </div>
                <div className={Styles.DATA_DIVIDER_STYLES} />
                <div className="relative z-10 flex flex-col items-start w-full gap-1">
                  <span
                    className={`${Styles.DATA_ROW_LABEL_STYLES} flex items-center gap-2`}
                  >
                    <Skull className="w-4 h-4 text-red-500" />
                    Poison Time (Rahu Kalam)
                  </span>
                  <span className={Styles.DATA_ROW_VALUE_STYLES}>
                    {panchangData?.specialKalas?.PoisonTimeStart &&
                      panchangData?.specialKalas?.PoisonTimeEnd
                      ? `${formatTime(panchangData.specialKalas.PoisonTimeStart)} — ${formatTime(panchangData.specialKalas.PoisonTimeEnd)}`
                      : "--"}
                  </span>
                </div>
              </div>
            </div>

            {/* Child 4: Additional Elements Box */}
            <div className="md:col-start-1 md:row-start-2 lg:col-start-1 lg:row-start-2 h-full w-full">
              <div className={Styles.DATA_BOX_ALT_STYLES}>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo/5 blur-[20px] rounded-full pointer-events-none" />
                <div className="relative z-10 flex flex-col items-start w-full gap-1">
                  <span
                    className={`${Styles.DATA_ROW_LABEL_STYLES} flex items-center gap-2`}
                  >
                    <Clock className="w-4 h-4 text-purple-500 dark:text-purple-400" />
                    Current Hora
                  </span>
                  <span className={Styles.DATA_ROW_VALUE_STYLES}>
                    {getCurrentHoraInfo(panchangData) || "--"}
                  </span>
                </div>
                <div className={Styles.DATA_DIVIDER_STYLES} />
                <div className="relative z-10 flex flex-col items-start w-full gap-1">
                  <span
                    className={`${Styles.DATA_ROW_LABEL_STYLES} flex items-center gap-2`}
                  >
                    <Zap className="w-4 h-4 text-purple-500 dark:text-purple-400" />
                    Energy (Yoga)
                  </span>
                  <span className={Styles.DATA_ROW_VALUE_STYLES}>
                    {panchangData?.yoga?.YogaName || "--"}
                  </span>
                </div>
                <div className={Styles.DATA_DIVIDER_STYLES} />
                <div className="relative z-10 flex flex-col items-start w-full gap-1">
                  <span
                    className={`${Styles.DATA_ROW_LABEL_STYLES} flex items-center gap-2`}
                  >
                    <Calendar className="w-4 h-4 text-purple-500 dark:text-purple-400" />
                    Half-Lunar Day
                  </span>
                  <span className={Styles.DATA_ROW_VALUE_STYLES}>
                    {panchangData?.karana?.KaranaName || "--"}
                  </span>
                </div>
              </div>
            </div>

            {/* Child 2: Tithi & Quick Info */}
            <div className="md:col-start-2 md:row-start-1 lg:col-start-2 lg:row-start-1 h-full w-full">
              {/* Tithi Timings */}
              <div className="bg-white/40 dark:bg-black/10 p-5 rounded-2xl border border-purple/5 dark:border-white/5">
                <h3 className={Styles.ELEMENT_TITLE_STYLES}>
                  <Moon className="w-4 h-4 text-purple dark:text-gold" /> Lunar
                  Day (Tithi)
                </h3>
                <div className={Styles.ELEMENT_LIST_STYLES}>
                  <div className="pl-4 relative">
                    <div className="absolute top-1.5 -left-[5px] w-2 h-2 rounded-full bg-purple dark:bg-gold" />
                    <p className={Styles.ACTIVE_ITEM_TITLE_STYLES}>
                      {formatCamelCase(panchangData?.tithi?.TithiName) ||
                        "--"}
                      <span className="w-3 h-3 rounded-full border border-midnight dark:border-cream flex items-center justify-center overflow-hidden">
                        <span className="w-1.5 h-3 bg-midnight dark:bg-cream block mr-auto" />
                      </span>
                    </p>
                    <p className={Styles.ITEM_DATE_STYLES}>
                      {formatDateRange(
                        panchangData?.tithi?.TithiStart,
                        panchangData?.tithi?.TithiEnd,
                      ) || "--"}
                    </p>
                  </div>
                  <div className="pl-4 relative opacity-80 mt-3">
                    <div className="absolute top-1.5 -left-[5px] w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700" />
                    <p className={Styles.ACTIVE_ITEM_TITLE_STYLES}>
                      {formatCamelCase(panchangData?.tithi?.NextTithiName) ||
                        "--"}
                    </p>
                    <p className={Styles.ITEM_DATE_STYLES}>
                      {formatDateRange(
                        panchangData?.tithi?.TithiEnd,
                        panchangData?.tithi?.NextTithiEnd,
                      ) || "--"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Child 3: Nakshatram */}
            <div className="md:col-start-2 md:row-start-2 lg:col-start-3 lg:row-start-1 h-full w-full">
              <div className="pt-5 pl-5 h-full">
                <h3 className={Styles.ELEMENT_TITLE_STYLES}>
                  <Star className="w-4 h-4 text-indigo dark:text-saffron" />{" "}
                  Star Details (Nakshatra)
                </h3>
                <div className={Styles.ELEMENT_ALT_LIST_STYLES}>
                  <div className="pl-4 relative">
                    <div className="absolute top-1.5 -left-[5px] w-2 h-2 rounded-full bg-indigo dark:bg-saffron" />
                    <p className={Styles.ACTIVE_ALT_ITEM_TITLE_STYLES}>
                      {panchangData?.nakshatra?.NakshatraName || "--"}
                      <span className="text-[10px] bg-purple-500/10 dark:bg-saffron/10 px-2 py-0.5 rounded text-purple-600 dark:text-saffron/80 uppercase tracking-wider">
                        Active
                      </span>
                    </p>
                    <p className={Styles.ITEM_DATE_STYLES}>
                      {formatDateRange(
                        panchangData?.nakshatra?.NakshatraStart,
                        panchangData?.nakshatra?.NakshatraEnd,
                      ) || "--"}
                    </p>
                  </div>
                  <div className="pl-4 relative opacity-80 mt-3">
                    <div className="absolute top-1.5 -left-[5px] w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700" />
                    <p className="text-[13px] font-semibold text-midnight dark:text-cream">
                      {panchangData?.nakshatra?.NextNakshatraName || "--"}
                    </p>
                    <p className={Styles.ITEM_DATE_STYLES}>
                      {formatDateRange(
                        panchangData?.nakshatra?.NakshatraEnd,
                        panchangData?.nakshatra?.NextNakshatraEnd,
                      ) || "--"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Child 5: To-Do & Avoid spanning 2 columns on desktop */}
            <div className="md:col-span-2 md:row-start-3 lg:col-span-2 lg:col-start-2 lg:row-start-2 h-full w-full">
              <div className={Styles.DATA_BOX_BASE_STYLES}>
                <div className="grid grid-cols-[80px_1fr] gap-y-4 gap-x-2 items-start">
                  <span className="text-[11px] md:text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400 pt-[2px]">
                    To Do
                  </span>
                  <span className="text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                    {todayContentData?.DosDonts?.Dos || "--"}
                  </span>

                  <span className="text-[11px] md:text-xs font-bold uppercase tracking-widest text-purple-600 dark:text-purple-400 pt-[2px]">
                    Avoid
                  </span>
                  <span className="text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                    {todayContentData?.DosDonts?.Donts || "--"}
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