import React, { useRef, useEffect, useState } from 'react';
import { ArrowRight, MapPin, CalendarDays } from 'lucide-react';
import shreemBrzeeImg from '../../assets/personalized_support/shreem_brzee_new.png';
import tarpanamNewImg from '../../assets/personalized_support/tarpanam_new.png';

/**
 * Interface defining the structure for continuous support solutions.
 */
interface SupportItem {
  id: number;
  title: string;
  tagline: string;
  description: string;
  cta: string;
  image: string;
  location?: string;
  date?: string;
  buttonColor: string;
  link?: string;
}

/**
 * Static configuration for the continuous support cards.
 */
const SUPPORT_SOLUTIONS: SupportItem[] = [
  {
    id: 1,
    title: "Shreem Brzee Membership",
    tagline: "Abundance & Prosperity",
    description: "Receive ongoing abundance-focused guidance, exclusive rituals, personalized recommendations, and premium spiritual resources.",
    cta: "Join Membership",
    image: shreemBrzeeImg,
    location: "AstroVed Astrology Center",
    date: "Available Year-Round",
    buttonColor: "bg-[#a855f7] hover:bg-[#9333ea]",
    link: "/us/specials/shreem-brzee-membership?promo=SL_shreem_brzee-1"
  },
  {
    id: 2,
    title: "Yearlong Tarpanam",
    tagline: "Ancestral Blessings",
    description: "Honor your ancestors throughout the year with scheduled sacred rituals performed by experienced temple priests.",
    cta: "Learn More",
    image: tarpanamNewImg,
    location: "Kasi & Rameswaram, India",
    date: "Starts next Amavasya",
    buttonColor: "bg-orange-500 hover:bg-orange-600",
    link: "/us/specials/tarpanam-ritual-package?promo=SL_tarpanam-2"
  }
];

/** --- Shared Tailwind CSS Classes --- */

/* Base Section & Headers */
const SECTION_WRAPPER_STYLES = "py-8 md:py-12 relative overflow-hidden transition-colors duration-500 z-10";
const CONTENT_WRAPPER_STYLES = "max-w-6xl mx-auto px-4 md:px-6 relative z-10";
const HEADER_CONTAINER_STYLES = "text-center max-w-3xl mx-auto mb-10 relative z-10";
const HEADER_SUBTITLE_STYLES = "text-amber-600 dark:text-amber-400 font-sans text-xs md:text-sm uppercase tracking-widest font-bold mb-3";
const HEADER_TITLE_STYLES = "font-serif text-3xl sm:text-4xl md:text-5xl text-midnight dark:text-cream leading-tight font-bold mb-4";
const HEADER_DESC_STYLES = "font-sans text-gray-500 dark:text-gray-400 text-sm md:text-base lg:text-lg leading-relaxed max-w-2xl mx-auto font-medium";

/* Responsive Grid / Mobile Carousel Layout */
const GRID_STYLES = "flex items-stretch overflow-x-auto md:overflow-visible snap-x snap-mandatory md:grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-10 pb-6 -mx-4 px-4 md:mx-0 md:px-0 md:pb-0 no-scrollbar";
const CARD_STYLES = "snap-center shrink-0 w-[85%] sm:w-[60%] md:w-full group flex flex-col bg-white dark:bg-[#131824] rounded-2xl overflow-hidden shadow-lg border border-slate-100 dark:border-slate-800 hover:shadow-xl hover:border-amber-400/30 transition-all duration-300";

/* Image Area */
const CARD_IMG_WRAPPER_STYLES = "relative w-full h-[260px] sm:h-[300px] md:h-[340px] lg:h-[380px] xl:h-[420px] overflow-hidden bg-slate-200 dark:bg-slate-800 shrink-0";
const CARD_IMG_STYLES = "w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out";

/* Content Area */
const CARD_CONTENT_WRAPPER = "flex flex-col flex-1 p-6 sm:p-8 relative";
const TAGLINE_STYLES = "text-[10px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-widest text-amber-600 dark:text-amber-400 mb-3 block text-center pb-3 border-b border-slate-100 dark:border-slate-800/50 whitespace-nowrap overflow-hidden text-ellipsis";
const TITLE_STYLES = "font-serif text-xl md:text-2xl text-slate-900 dark:text-white font-bold leading-tight mb-3 text-center";
const DESC_STYLES = "font-sans text-slate-600 dark:text-slate-400 text-sm md:text-[15px] leading-relaxed mb-6 text-center";

/* List Info (Location, Date) */
const INFO_LIST_STYLES = "flex flex-col gap-3 mt-auto mb-6";
const INFO_ITEM_STYLES = "flex items-start gap-2.5 text-xs sm:text-sm text-slate-500 dark:text-slate-400";
const ICON_STYLES = "w-4 h-4 text-amber-500 shrink-0 mt-0.5";

/* CTA Button */
const CTA_WRAPPER = "w-full mt-auto";

export function PersonalizedSupport() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [lastInteraction, setLastInteraction] = useState(0);

  /**
   * Auto-scroll functionality for mobile views.
   */
  useEffect(() => {
    const autoScrollInterval = setTimeout(() => {
      if (scrollRef.current && window.innerWidth < 768) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 20) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollRef.current.scrollBy({ left: clientWidth * 0.85, behavior: 'smooth' });
        }
      }
      setLastInteraction(Date.now());
    }, 5000);

    return () => clearTimeout(autoScrollInterval);
  }, [lastInteraction]);

  return (
    <section id="personalized-support" className={SECTION_WRAPPER_STYLES}>
      <div className={CONTENT_WRAPPER_STYLES}>

        {/* --- Header Section --- */}
        <div className={HEADER_CONTAINER_STYLES}>
          <p className={HEADER_SUBTITLE_STYLES}>
            CONTINUOUS SUPPORT
          </p>
          <h2 className={HEADER_TITLE_STYLES}>
            Ongoing Blessings <em className="text-amber-600 dark:text-amber-400 italic">for Your Family.</em>
          </h2>
          <p className={HEADER_DESC_STYLES}>
            For devotees who want continuous support — not one-time remedies.
          </p>
        </div>

        {/* --- Responsive Card Grid & Mobile Carousel --- */}
        <div
          ref={scrollRef}
          className={GRID_STYLES}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          onTouchStart={() => setLastInteraction(Date.now())}
          onMouseDown={() => setLastInteraction(Date.now())}
        >
          {SUPPORT_SOLUTIONS.map((support) => (
            <div key={support.id} className={CARD_STYLES}>

              {/* Top Banner Image */}
              <div className={CARD_IMG_WRAPPER_STYLES}>
                <img
                  src={support.image}
                  alt={support.title}
                  className={CARD_IMG_STYLES}
                />
              </div>

              {/* Bottom Content Area */}
              <div className={CARD_CONTENT_WRAPPER}>
                <span className={TAGLINE_STYLES}>
                  {support.tagline}
                </span>

                <h3 className={TITLE_STYLES}>
                  {support.title}
                </h3>

                <p className={DESC_STYLES}>
                  {support.description}
                </p>

                {/* Icons List (Optional based on data) */}
                <div className={INFO_LIST_STYLES}>
                  {support.location && (
                    <div className={INFO_ITEM_STYLES}>
                      <MapPin className={ICON_STYLES} />
                      <span>{support.location}</span>
                    </div>
                  )}
                  {support.date && (
                    <div className={INFO_ITEM_STYLES}>
                      <CalendarDays className={ICON_STYLES} />
                      <span>{support.date}</span>
                    </div>
                  )}
                </div>

                <div className={CTA_WRAPPER}>
                  {support.link ? (
                    <a href={support.link} target="_blank" rel="noopener noreferrer" className={`w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-lg text-white font-bold text-sm tracking-widest uppercase transition-colors shadow-md cursor-pointer ${support.buttonColor}`}>
                      {support.cta}
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  ) : (
                    <button className={`w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-lg text-white font-bold text-sm tracking-widest uppercase transition-colors shadow-md cursor-pointer ${support.buttonColor}`}>
                      {support.cta}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
