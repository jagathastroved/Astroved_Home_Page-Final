import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { fetchHoroscope } from '../../services/horoscopeService';
import { ArrowRight } from 'lucide-react';
import aquarius from '../../assets/horoscope/aquarius.png';
import aries from '../../assets/horoscope/aries.png';
import cancer from '../../assets/horoscope/cancer.png';
import capricorn from '../../assets/horoscope/capricorn.png';
import gemini from '../../assets/horoscope/gemini.png';
import leo from '../../assets/horoscope/leo.png';
import libra from '../../assets/horoscope/libra.png';
import pisces from '../../assets/horoscope/pisces.png';
import sagittarius from '../../assets/horoscope/sagittarius.png';
import scorpio from '../../assets/horoscope/scorpio.png';
import taurus from '../../assets/horoscope/taurus.png';
import virgo from '../../assets/horoscope/virgo.png';
import { ZodiacSign } from '../../types';

export const ZODIAC_SIGNS: ZodiacSign[] = [
  { name: 'Aries', sanskrit: 'Mesha', ruler: 'Mars (Mangala)', element: 'Fire', imageUrl: aries },
  { name: 'Taurus', sanskrit: 'Vrishabha', ruler: 'Venus (Shukra)', element: 'Earth', imageUrl: taurus },
  { name: 'Gemini', sanskrit: 'Mithuna', ruler: 'Mercury (Budha)', element: 'Air', imageUrl: gemini },
  { name: 'Cancer', sanskrit: 'Karka', ruler: 'Moon (Chandra)', element: 'Water', imageUrl: cancer },
  { name: 'Leo', sanskrit: 'Simha', ruler: 'Sun (Surya)', element: 'Fire', imageUrl: leo },
  { name: 'Virgo', sanskrit: 'Kanya', ruler: 'Mercury (Budha)', element: 'Earth', imageUrl: virgo },
  { name: 'Libra', sanskrit: 'Tula', ruler: 'Venus (Shukra)', element: 'Air', imageUrl: libra },
  { name: 'Scorpio', sanskrit: 'Vrishchika', ruler: 'Mars / Ketu', element: 'Water', imageUrl: scorpio },
  { name: 'Sagittarius', sanskrit: 'Dhanus', ruler: 'Jupiter (Guru)', element: 'Fire', imageUrl: sagittarius },
  { name: 'Capricorn', sanskrit: 'Makara', ruler: 'Saturn (Shani)', element: 'Earth', imageUrl: capricorn },
  { name: 'Aquarius', sanskrit: 'Kumbha', ruler: 'Saturn / Rahu', element: 'Air', imageUrl: aquarius },
  { name: 'Pisces', sanskrit: 'Meena', ruler: 'Jupiter / Ketu', element: 'Water', imageUrl: pisces }
];
import TargetCursor from '../ui/TargetCursor';

/**
 * Props for the Horoscope component.
 * NOTE: The `onCalculateChart` function is injected from the parent container (App.tsx).
 * It handles the action when a user clicks "View full details", usually scrolling them
 * to the birth chart form section of the page.
 */
interface HoroscopeProps {
  onCalculateChart: (zodiac: string) => void;
}

/**
 * Resolves the dynamic Tailwind CSS classes for the zodiac selection buttons.
 * 
 * @param isActive - Whether the current zodiac sign is actively selected
 */
const getZodiacButtonStyles = (isActive: boolean): string => {
  const baseClasses = "cursor-target relative p-4 rounded-[1.5rem] text-center flex flex-col items-center justify-center gap-3 transition-all duration-300 group";
  const activeClasses = "bg-white dark:bg-[#110c1c] shadow-xl scale-[1.02] border border-amber-500/30";
  const inactiveClasses = "bg-white dark:bg-[#110c1c] border border-black/5 dark:border-amber-500/40 dark:shadow-[0_0_15px_rgba(245,158,11,0.2)] hover:border-amber-500/20 hover:shadow-lg hover:scale-[1.02]";
  return `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`;
};

/**
 * Resolves the dynamic Tailwind CSS classes for the zodiac image border ring.
 * 
 * @param isActive - Whether the current zodiac sign is actively selected
 */
const getZodiacImageRingStyles = (isActive: boolean): string => {
  const baseClasses = "absolute inset-0 rounded-full border-2 transition-colors duration-300";
  const activeClasses = "border-amber-400 dark:border-amber-500";
  const inactiveClasses = "border-transparent group-hover:border-amber-400/50";
  return `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`;
};

/**
 * Resolves the dynamic Tailwind CSS classes for the zodiac text label.
 * 
 * @param isActive - Whether the current zodiac sign is actively selected
 */
const getZodiacNameStyles = (isActive: boolean): string => {
  const baseClasses = "block text-[10px] font-sans tracking-wider uppercase font-semibold leading-none transition-colors";
  const activeClasses = "text-amber-700 dark:text-amber-400";
  const inactiveClasses = "text-midnight/70 dark:text-cream/70 group-hover:text-amber-600 dark:group-hover:text-amber-400";
  return `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`;
};

/**
 * Resolves the dynamic Tailwind CSS classes for the time period tabs (Today, Week, Month).
 * 
 * @param isActive - Whether the current time tab is actively selected
 */
const getTabButtonStyles = (isActive: boolean): string => {
  const baseClasses = "flex-1 sm:flex-none px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg text-[10px] sm:text-xs font-mono uppercase tracking-[0.15em] font-bold transition-all duration-300 cursor-pointer";
  const activeClasses = "bg-white dark:bg-midnight text-amber-600 dark:text-amber-400 shadow-sm";
  const inactiveClasses = "text-gray-500 hover:text-midnight dark:hover:text-cream";
  return `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`;
};

/**
 * Shared classes for the large Glass Panel container on the right column.
 */
const getGlassPanelStyles = (): string => {
  return "h-full rounded-[2.5rem] bg-white dark:bg-[#110c1c] p-8 sm:p-12 border border-black/5 dark:border-amber-500/40 dark:shadow-[0_0_15px_rgba(245,158,11,0.2)] relative overflow-hidden shadow-2xl transition-all duration-500 flex flex-col";
};

/**
 * Shared classes for the "View full details" primary button.
 */
const getDetailsButtonStyles = (): string => {
  return "w-full sm:w-auto px-6 py-4 rounded-xl bg-midnight dark:bg-white text-white dark:text-midnight hover:bg-amber-600 dark:hover:bg-amber-400 hover:text-white font-sans text-[10px] sm:text-xs tracking-widest uppercase font-bold transition-all shadow-md flex items-center justify-center gap-3 group/btn flex-shrink-0 cursor-pointer";
};

/**
 * Horoscope Component
 * 
 * Displays the 12 zodiac signs and fetches the daily/weekly/monthly horoscope 
 * summary from the Astroved API for the selected sign.
 */
export function Horoscope({ onCalculateChart }: HoroscopeProps) {
  const [selectedZodiac, setSelectedZodiac] = useState('Aries');
  const [horoscopeTab, setHoroscopeTab] = useState<'Today' | 'Week' | 'Month'>('Today');
  const [horoscopeData, setHoroscopeData] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const contentRef = useRef<HTMLDivElement>(null);

  /**
   * Fetches the horoscope data from the Astroved API based on the currently
   * selected Zodiac sign and the active time period tab (Today, Week, Month).
   */
  React.useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const moonSign = selectedZodiac.toLowerCase();
        let apiPeriod = horoscopeTab.toLowerCase();

        // Map UI tab names to API expected period formats
        if (apiPeriod === 'today') apiPeriod = 'daily';
        else if (apiPeriod === 'week') apiPeriod = 'weekly';
        else if (apiPeriod === 'month') apiPeriod = 'monthly';

        const timeZone = encodeURIComponent(Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Kolkata');
        const responseData = await fetchHoroscope(moonSign, apiPeriod, timeZone);

        console.log('Horoscope API Success:', responseData);

        if (isMounted) {
          setHoroscopeData(responseData.summary || 'Horoscope data is currently unavailable. Please try again later.');
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Horoscope API Failed:", error);
        if (isMounted) {
          setHoroscopeData('Horoscope data is currently unavailable. Please try again later.');
          setIsLoading(false);
        }
      }
    };

    fetchData();
    return () => { isMounted = false; };
  }, [selectedZodiac, horoscopeTab]);

  /** 
   * Pre-calculate the active zodiac data to avoid redundant Array.find() calls in the render tree 
   */
  const activeZodiacData = ZODIAC_SIGNS.find(zodiacSign => zodiacSign.name === selectedZodiac);

  return (
    <section className="py-4 md:py-6 relative overflow-hidden" id="daily-widget">
      <TargetCursor
        targetSelector=".cursor-target"
        spinDuration={2}
        hideDefaultCursor={false}
        parallaxOn={true}
        cursorColor="#f59e0b" // amber-500
        cursorColorOnTarget="#f59e0b"
      />

      {/* --- Ambient Background Glow --- */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[300px] bg-amber-500/5 dark:bg-amber-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* --- Header Section --- */}
        <div className="text-center max-w-3xl mx-auto mb-4">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-midnight dark:text-cream leading-tight font-bold mb-4">
            Daily <em className="text-amber-600 dark:text-amber-400 italic">Horoscope.</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 w-full max-w-6xl mx-auto">

          {/* --- Left Column: 12 Sign Grid Selector --- */}
          <div className="lg:col-span-4 flex flex-col space-y-4">
            <span className="text-xs md:text-sm font-mono uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 font-semibold mb-2">
              Select Sign
            </span>

            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-3 gap-3">
              {ZODIAC_SIGNS.map((zodiacSign) => {
                const isActive = selectedZodiac === zodiacSign.name;
                return (
                  <button
                    key={zodiacSign.name}
                    onClick={() => {
                      setSelectedZodiac(zodiacSign.name);
                      if (window.innerWidth < 1024) {
                        setTimeout(() => {
                          contentRef.current?.scrollIntoView({ behavior: 'smooth' });
                        }, 50);
                      }
                    }}
                    className={getZodiacButtonStyles(isActive)}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeZodiacGlow"
                        className="absolute inset-0 rounded-[1.5rem] bg-amber-500/5 dark:bg-amber-500/10 z-0 pointer-events-none"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}

                    <div className="relative z-10 w-12 h-12 rounded-full p-0.5 bg-white dark:bg-midnight shadow-sm">
                      <div className={getZodiacImageRingStyles(isActive)} />
                      <img src={zodiacSign.imageUrl} alt={zodiacSign.name} className="w-full h-full rounded-full object-cover" />
                    </div>

                    <div className="z-10">
                      <span className={getZodiacNameStyles(isActive)}>
                        {zodiacSign.name}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* --- Right Column: Tabbed Horoscope Details Panel --- */}
          <div ref={contentRef} className="lg:col-span-8 relative group h-full scroll-mt-24">

            {/* Ambient hover glow behind card */}
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/20 to-purple-500/20 rounded-[3rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />

            <div className={getGlassPanelStyles()}>

              {/* --- Active Zodiac Banner Section --- */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between flex-wrap gap-6">
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shadow-lg border border-black/5 dark:border-amber-500/40 dark:shadow-[0_0_15px_rgba(245,158,11,0.2)] flex-shrink-0">
                    <img
                      src={activeZodiacData?.imageUrl}
                      alt={selectedZodiac}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-sans text-2xl sm:text-3xl text-midnight dark:text-cream tracking-wide font-medium flex items-center gap-3">
                      {selectedZodiac} ({activeZodiacData?.sanskrit}) <span className="text-amber-500/40 text-xl font-light hidden sm:inline">·</span>
                      {/* <span className="text-gray-400 dark:text-gray-500 text-xl hidden sm:inline"></span> */}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 mt-3">
                      <span className="px-2 py-1 rounded-md bg-black/5 dark:bg-white/5 text-[9px] sm:text-[10px] font-mono text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                        Ruler: {activeZodiacData?.ruler}
                      </span>
                      <span className="px-2 py-1 rounded-md bg-black/5 dark:bg-white/5 text-[9px] sm:text-[10px] font-mono text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                        Element: {activeZodiacData?.element}
                      </span>
                    </div>
                  </div>
                </div>

                {/* --- Time Period Tabs Section --- */}
                <div className="flex bg-black/5 dark:bg-white/5 p-1 rounded-xl border border-black/5 dark:border-amber-500/40 dark:shadow-[0_0_15px_rgba(245,158,11,0.2)] w-full sm:w-fit self-start lg:self-auto flex-shrink-0">
                  {(['Today', 'Week', 'Month'] as const).map((timeTab) => {
                    const isActive = horoscopeTab === timeTab;
                    return (
                      <button
                        key={timeTab}
                        onClick={() => setHoroscopeTab(timeTab)}
                        className={getTabButtonStyles(isActive)}
                      >
                        {timeTab}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* --- Horoscope API Content Section --- */}
              <div className="flex-1 mt-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${selectedZodiac}-${horoscopeTab}`}
                    initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="space-y-4"
                  >
                    {isLoading ? (
                      <div className="animate-pulse space-y-3">
                        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-5/6"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-4/6"></div>
                      </div>
                    ) : (
                      <p className="font-body text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed font-light">
                        {horoscopeData}
                      </p>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* --- Bottom Interactive Action Section --- */}
              <div className="mt-4 pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <button
                  onClick={() => window.open(`${import.meta.env.VITE_SITE_URL}/horoscopes/daily-horoscope/${selectedZodiac.toLowerCase()}`, '_blank')}
                  className={getDetailsButtonStyles()}
                >
                  View full details
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}