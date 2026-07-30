import { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Flame, Clock, ChevronLeft, ChevronRight, Gift, HeartHandshake, Flower2, Music, Home, Coins } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import divine_statues from "../../assets/Special_events/divine_statues.jpg";
import donate_homa from "../../assets/Special_events/donate_homa.png";
import birthday_cake from "../../assets/Special_events/birthday_cake.png";

/** --- Custom Hook for Auto Carousel --- */
function useAutoCarousel(itemsCount: number, interval: number = 5000) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === itemsCount - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? itemsCount - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      nextSlide();
    }, interval);
    return () => clearTimeout(timer);
  }, [itemsCount, interval, currentIndex]);

  return { currentIndex, direction, nextSlide, prevSlide, setCurrentIndex };
}

const RITUAL_EVENTS: any[] = [
  {
    id: 1,
    title: "The Living Divine Presence at the Chennai Homa Center",
    image: divine_statues,
    description: "Dr. Pillai connected with the divine forms and experienced them as living spiritual presences. Sponsor the ongoing worship of these living divine statues to help support the daily rituals at the Chennai Homa Center.",
    bullets: [
      { icon: <Home className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />, text: "Pooja, Abhishekam, Archana" },
      { icon: <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />, text: "Homa fire rituals" },
      { icon: <Music className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />, text: "Mantra chanting", fullWidth: true }
    ],
    urgencyText: "SPONSOR THE ONGOING WORSHIP",
    buttonText: "SPONSOR NOW",
    link: "/us/specials/deity-statue-sponsporship-program?promo=SL_deity_statue_sponsporship_program-1",
    badgeText: "DIVINE PRESENCE",
    headerTitle: "Sponsor Living",
    headerItalic: "Divine Statues."
  },
  {
    id: 2,
    title: "Monthly Ashtalakshmi Homa by Donation",
    description: "Experience the divine technology of Fire Labs to reverse karma and overcome financial obstacles. AstroVed offers this special monthly Homa by donation so financial constraints are never a barrier to receiving divine blessings.",
    image: donate_homa,
    bullets: [
      { icon: <Flower2 className="w-4 h-4 sm:w-5 sm:h-5 text-pink-500" />, text: "Invoke 8 Forms of Wealth Lakshmi" },
      { icon: <Coins className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />, text: "Overcome financial obstacles & debt burdens" },
      { icon: <HeartHandshake className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500" />, text: "Participate by donating any amount you can contribute", fullWidth: true }
    ],
    urgencyText: "REVERSE KARMA & PROSPER IN LIFE",
    buttonText: "DONATE NOW",
    link: "/donate-homa.aspx?promo=SL_DONATEHOMA-2",
    badgeText: "MONTHLY HOMA",
    headerTitle: "Reverse Karma &",
    headerItalic: "Overcome Obstacles."
  },
  {
    id: 3,
    title: "Special Birthday Rituals",
    description: "Powerful Birthday Poojas & Homas to Remove Obstacles & Welcome Success. Enhance your blessings with additional recommended services carefully chosen to support your personal goals and intentions.",
    image: birthday_cake,
    bullets: [
      { icon: <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />, text: "Remove Obstacles & Welcome Success" },
      { icon: <Gift className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />, text: "Save up to 40% on Birthday Rituals" },
      { icon: <HeartHandshake className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />, text: "Begin your blessed year now", fullWidth: true }
    ],
    urgencyText: "SAVE UP TO 40% ON BIRTHDAY RITUAL",
    buttonText: "EXPLORE SERVICES",
    link: "/us/specials/birthday-ritual-packages?promo=SL_birthdayritual-3",
    badgeText: "BIRTHDAY BLESSINGS",
    headerTitle: "Welcome Success",
    headerItalic: "in Your New Year."
  }
];

/** --- Promo Carousel Data & Styles --- */
const PROMO_MESSAGES = [
  {
    id: 1,
    icon: <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />,
    text: "Guru Purnima special rituals now open — registrations close 29 July.",
    cta: "Participate",
    link: "#"
  },
  {
    id: 2,
    icon: <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />,
    text: "New: Exclusive Skanda Shashti 6-Day Power Rituals available.",
    cta: "Book Now",
    link: "#"
  },
  {
    id: 3,
    icon: <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500" />,
    text: "Early bird discount: 15% off all Homas booked this week.",
    cta: "Claim Offer",
    link: "#"
  }
];

const PROMO_BAR_WRAPPER = "w-full max-w-5xl mx-auto px-4 sm:px-6 mb-6 md:mb-8 relative z-20 mt-8";
const PROMO_BAR_CONTAINER = "relative overflow-hidden rounded-2xl sm:rounded-full bg-gradient-to-r from-amber-900 via-rose-950 to-purple-950 dark:from-amber-950 dark:via-rose-950/80 dark:to-indigo-950/80 border border-amber-500/20 shadow-[0_0_20px_rgba(245,158,11,0.15)] flex items-center justify-center p-0.5 group cursor-pointer";
const PROMO_INNER_GLOW = "absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500";
const PROMO_CONTENT_WRAPPER = "w-full flex items-center justify-center py-2.5 sm:py-3 px-4 relative z-10 min-h-[48px] sm:min-h-[52px]";

/** --- Modern Top/Bottom Layout CSS Classes --- */
const SECTION_STYLES = "py-6 md:py-8 relative z-10 w-full transition-colors duration-500 overflow-hidden";
const CONTENT_WRAPPER_STYLES = "max-w-7xl mx-auto px-4 md:px-6 relative z-10 flex flex-col items-center gap-4 md:gap-6";

/* --- TOP SECTION (Typography) --- */
const TOP_SECTION_STYLES = "flex flex-col items-center text-center w-full min-h-[160px] sm:min-h-[140px] md:min-h-[130px] relative z-20";

const HEADER_TITLE_STYLES = "font-serif text-3xl sm:text-4xl md:text-5xl text-midnight mr-2 dark:text-cream leading-tight font-bold";
const HEADER_ITALIC_STYLES = "font-serif text-3xl sm:text-4xl md:text-5xl text-amber-600 dark:text-amber-400 italic leading-tight font-bold";

/* --- BOTTOM SECTION (Content Card & Action) --- */
const BOTTOM_SECTION_STYLES = "w-full relative px-2 md:px-6";

const DECORATIVE_BLOB_STYLES = "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-gradient-to-tr from-amber-200/40 to-rose-200/40 dark:from-amber-900/20 dark:to-rose-900/20 rounded-full blur-[80px] -z-10 pointer-events-none";

const CONTENT_CARD_STYLES = "h-full w-full rounded-[2rem] p-5 md:p-5 lg:p-8 flex flex-col bg-white/90 dark:bg-[#0B1221]/90 lg:bg-white lg:dark:bg-white backdrop-blur-xl lg:backdrop-blur-none border border-white/50 dark:border-slate-800 lg:border-gray-100 lg:dark:border-gray-100 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] lg:shadow-[0_15px_50px_-15px_rgba(0,0,0,0.08)] lg:dark:shadow-[0_15px_50px_-15px_rgba(0,0,0,0.08)] relative z-10";

const BADGE_STYLES = "text-amber-600 dark:text-amber-500 font-sans text-xs md:text-sm uppercase tracking-[0.25em] font-extrabold mb-4 block text-center md:text-left";
const TITLE_STYLES = "text-xl md:text-base lg:text-3xl xl:text-[32px] font-black lg:font-bold text-slate-900 dark:text-white lg:text-[#0a192f] lg:dark:text-[#0a192f] font-serif tracking-tight mb-3 md:mb-2 lg:mb-4 leading-tight md:whitespace-nowrap lg:whitespace-normal lg:break-words text-center md:text-left";
const DESC_TEXT_STYLES = "font-sans text-slate-600 dark:text-slate-300 lg:text-gray-500 lg:dark:text-gray-500 text-sm md:text-sm lg:text-[15px] leading-relaxed mb-3 md:mb-3 lg:mb-4 text-center md:text-left";

const LIST_CONTAINER_STYLES = "grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-2 lg:gap-3 mb-3 md:mb-3 lg:mb-4 w-full";
const LIST_ITEM_STYLES = "flex items-center bg-slate-50/50 dark:bg-slate-800/50 lg:bg-[#F9F9FB] lg:dark:bg-[#F9F9FB] rounded-xl lg:rounded-2xl p-2 md:p-2 lg:p-3 border border-slate-100 dark:border-slate-700/50 lg:border-[#F0F0F4] lg:dark:border-[#F0F0F4] font-sans font-semibold text-slate-700 dark:text-slate-300 lg:text-slate-600 lg:dark:text-slate-600 text-sm md:text-[13px] lg:text-sm leading-tight lg:leading-snug";
const ICON_WRAPPER_STYLES = "w-6 h-6 md:w-6 md:h-6 lg:w-7 lg:h-7 rounded-full bg-white dark:bg-slate-700 lg:bg-transparent lg:dark:bg-transparent flex items-center justify-center shrink-0 mr-2 lg:mr-2.5 shadow-sm lg:shadow-none border border-slate-100 dark:border-slate-600 lg:border-transparent lg:dark:border-transparent text-sm lg:text-base";

const URGENCY_WRAPPER_STYLES = "flex items-start lg:items-center gap-2 border border-rose-200 dark:border-rose-900/50 lg:border-[#FFD6DC] lg:dark:border-[#FFD6DC] bg-rose-50 dark:bg-rose-900/20 lg:bg-[#FFF0F2] lg:dark:bg-[#FFF0F2] rounded-2xl lg:rounded-full px-4 lg:px-5 py-2.5 lg:py-3 mb-4 w-full sm:w-fit shadow-sm lg:shadow-none mx-auto md:mx-0 text-left";
const URGENCY_DOT_STYLES = "w-2.5 h-2.5 md:w-2 md:h-2 lg:w-2.5 lg:h-2.5 rounded-full bg-rose-500 lg:bg-[#E83E8C] lg:dark:bg-[#E83E8C] shadow-[0_0_8px_rgba(244,63,94,0.4)] lg:shadow-[0_0_8px_rgba(232,62,140,0.4)] lg:dark:shadow-[0_0_8px_rgba(232,62,140,0.4)] animate-pulse shrink-0 mt-[3px] lg:mt-0";
const URGENCY_TEXT_STYLES = "text-[10px] sm:text-[10px] lg:text-xs text-rose-700 dark:text-rose-400 lg:text-[#C6165B] lg:dark:text-[#C6165B] font-sans font-bold uppercase tracking-[0.15em] lg:tracking-[0.1em] leading-snug";

const ACTION_ROW_STYLES = "mt-auto flex flex-col items-center justify-center gap-3 md:gap-2 lg:gap-4 w-full border-t border-slate-100 dark:border-slate-800 lg:border-transparent lg:dark:border-transparent pt-5 md:pt-4 lg:pt-2";
const CTA_WRAPPER_STYLES = "inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#e67e22] to-[#d35400] hover:from-[#d35400] hover:to-[#c0392b] lg:from-[#E27625] lg:to-[#E27625] lg:hover:from-[#d35400] lg:hover:to-[#d35400] text-white font-sans text-xs sm:text-xs lg:text-sm uppercase tracking-widest font-extrabold px-8 lg:px-10 py-3.5 rounded-full transition-all duration-300 w-full sm:w-auto shadow-[0_10px_25px_-5px_rgba(230,126,34,0.4)] hover:shadow-[0_15px_35px_-5px_rgba(230,126,34,0.5)] lg:shadow-[0_8px_20px_-5px_rgba(226,118,37,0.4)] lg:hover:shadow-[0_12px_25px_-5px_rgba(226,118,37,0.5)] hover:-translate-y-1 lg:hover:-translate-y-0.5 mx-auto text-center whitespace-nowrap shrink-0 cursor-pointer";
const SUB_CTA_TEXT_STYLES = "text-[11px] sm:text-[11px] lg:text-[14px] text-slate-500 dark:text-slate-400 lg:text-gray-500 lg:dark:text-gray-500 font-sans font-medium text-center flex flex-wrap items-center justify-center gap-1.5";

export function Rituals() {
  const [currentPromo, setCurrentPromo] = useState(0);

  const { currentIndex, direction, nextSlide, prevSlide, setCurrentIndex } = useAutoCarousel(RITUAL_EVENTS.length, 6000);
  const currentEvent = RITUAL_EVENTS[currentIndex];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPromo((prev) => (prev + 1) % PROMO_MESSAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className={SECTION_STYLES}>
      <div className={CONTENT_WRAPPER_STYLES}>
        {/* --- TOP SECTION: Standard Section Title --- */}
        <div className={TOP_SECTION_STYLES}>
          <AnimatePresence mode="popLayout">
            <motion.div
              key={currentEvent.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="flex flex-col items-center absolute w-full"
            >
              <span className={BADGE_STYLES}>{currentEvent.badgeText}</span>
              <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 mt-2 mb-4">
                <h2 className={HEADER_TITLE_STYLES}>
                  {currentEvent.headerTitle}
                </h2>
                <span className={HEADER_ITALIC_STYLES}>
                  {currentEvent.headerItalic}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* --- BOTTOM SECTION: Wide Content Card Carousel --- */}
        <div className="w-full relative px-0">
          <div className={DECORATIVE_BLOB_STYLES} />

          {/* Left/Right Floating Arrows (Fixed outside the track) */}
          <button
            onClick={prevSlide}
            className="absolute left-2 md:left-4 lg:left-6 top-[150px] md:top-[45%] lg:top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.12)] border border-slate-100 hover:scale-110 transition-transform z-30 text-slate-800"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-2 md:right-4 lg:right-6 top-[150px] md:top-[45%] lg:top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.12)] border border-slate-100 hover:scale-110 transition-transform z-30 text-slate-800"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          <div className="w-full relative overflow-hidden pb-8 flex">
            <AnimatePresence mode="popLayout" initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                initial={{ x: direction === 1 ? "100%" : "-100%", opacity: 0.5 }}
                animate={{ x: "0%", opacity: 1 }}
                exit={{ x: direction === 1 ? "-100%" : "100%", opacity: 0.5 }}
                transition={{ type: "spring", stiffness: 250, damping: 30, mass: 0.8 }}
                className="w-full shrink-0 px-2 md:px-8 lg:px-10 cursor-grab active:cursor-grabbing"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(e, { offset, velocity }) => {
                  if (offset.x < -50 || velocity.x < -500) {
                    nextSlide();
                  } else if (offset.x > 50 || velocity.x > 500) {
                    prevSlide();
                  }
                }}
              >
                <div className={CONTENT_CARD_STYLES}>
                  <div className="flex flex-col lg:flex-row gap-4 md:gap-6 lg:gap-10 w-full">
                    {/* --- Left Column: Image --- */}
                    <div className={`w-full lg:w-[45%] shrink-0 flex flex-col order-first lg:mb-0 relative min-h-[220px] md:min-h-[350px] lg:min-h-[280px] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden ${currentEvent.id === 3 ? 'bg-[#120d0a]' : ''}`}>
                      <img
                        src={currentEvent.image}
                        alt={currentEvent.title}
                        className={`w-full h-full absolute inset-0 ${currentEvent.id === 3 ? 'object-contain object-center py-2' : 'object-cover'}`}
                      />
                    </div>

                    {/* --- Right Column: Content --- */}
                    <div className="w-full lg:w-[55%] flex flex-col min-w-0 lg:pr-16 pt-4 lg:pt-0">
                      <h3 className={TITLE_STYLES}>{currentEvent.title}</h3>

                      {/* Description */}
                      <p className={DESC_TEXT_STYLES}>
                        {currentEvent.description}
                      </p>

                      {/* Bullet Points */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-2 lg:gap-3 mb-5 md:mb-4 lg:mb-5 w-full">
                        {currentEvent.bullets.map((bullet: any, idx: number) => (
                          <div key={idx} className={`${LIST_ITEM_STYLES} ${bullet.fullWidth ? 'md:col-span-2' : ''}`}>
                            <div className={ICON_WRAPPER_STYLES}>{bullet.icon}</div>
                            <span>{bullet.text}</span>
                          </div>
                        ))}
                      </div>

                      {/* Urgency Pill */}
                      <div className={URGENCY_WRAPPER_STYLES}>
                        <span className={URGENCY_DOT_STYLES}></span>
                        <span className={URGENCY_TEXT_STYLES}>{currentEvent.urgencyText}</span>
                      </div>

                      {/* Action Row */}
                      <div className="mt-auto flex flex-col sm:flex-row items-center justify-between gap-3 md:gap-4 w-full border-t border-slate-100 dark:border-slate-800 lg:border-transparent lg:dark:border-transparent pt-3 md:pt-4">
                        <span className={SUB_CTA_TEXT_STYLES}>
                          <span className="font-bold text-slate-800 dark:text-slate-200 lg:text-[#0a192f] lg:dark:text-[#0a192f] text-sm lg:text-[14px]">{currentEvent.priceText}</span>
                          <span>{currentEvent.deliveryText}</span>
                        </span>
                        <a href={currentEvent.link} target="_blank" rel="noopener noreferrer" className={CTA_WRAPPER_STYLES}>
                          {currentEvent.buttonText} <ArrowRight className="w-5 h-5 lg:w-4 lg:h-4 ml-1" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center mt-2 relative z-20 w-full pb-4">
            <div className="flex gap-2 items-center">
              {RITUAL_EVENTS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-8 bg-[#d35400]' : 'w-2 bg-slate-300 hover:bg-slate-400'}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* --- PROMO SLIDER --- */}
        {/* <div className={PROMO_BAR_WRAPPER}>
          <div className={PROMO_BAR_CONTAINER}>
            <div className={PROMO_INNER_GLOW} />
            <div className={PROMO_CONTENT_WRAPPER}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPromo}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="flex flex-col sm:flex-row items-center gap-1 sm:gap-3 text-center sm:text-left"
                >
                  <div className="flex items-center gap-2">
                    {PROMO_MESSAGES[currentPromo].icon}
                    <span className="text-white text-xs sm:text-sm md:text-[15px] font-sans font-medium tracking-wide">
                      {PROMO_MESSAGES[currentPromo].text}
                    </span>
                  </div>
                  <a
                    href={PROMO_MESSAGES[currentPromo].link}
                    className="inline-flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-bold text-xs sm:text-sm tracking-widest uppercase transition-colors shrink-0 mt-1 sm:mt-0"
                  >
                    {PROMO_MESSAGES[currentPromo].cta}
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </a>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
}
