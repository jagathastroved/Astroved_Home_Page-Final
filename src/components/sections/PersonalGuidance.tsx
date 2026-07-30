import { useRef, useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { AnimatedGrid } from '../ui/AnimatedGrid';
import { AnimatedCard } from '../ui/AnimatedCard';
import palm_leaf from '../../assets/personal_guidance/palm_leaf.png';
import personal_report from '../../assets/personal_guidance/personal_report.png';
import liveConsultationsImg from '../../assets/personal_guidance/live_consultations.png';
import liveConsultationsImg1 from '../../assets/personal_guidance/viji-mam.jpg';
import vijimam from '../../assets/personal_guidance/viji-mam.jpg';


/**
 * Interface defining the structure for Personal Guidance cards.
 */
interface ExpertItem {
  badgeText: string;
  title: string;
  desc: string;
  cta: string;
  footerText?: string;
  image: string;
  titleColor: string;
  link?: string;
  IsfooterTextBtn: Boolean;
}

/**
 * Static configuration for the Personal Guidance cards.
 */
const EXPERTS: ExpertItem[] = [
  {
    badgeText: "LIVE 1-ON-1 Consultations",
    title: "Talk with Senior Vedic Astrologer Vijayalakshmi right now.",
    desc: "Uncover hidden cosmic influences affecting your career and relationships. Vijayalakshmi Krishnan provides personalized remedies to help you overcome current challenges.\nConsult in English or Tamil.",
    cta: "BOOK CONSULTATION",
    footerText: "Slots available today • 100% private",
    image: vijimam,
    titleColor: "text-gray-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400",
    link: "/AstrologerScheduler.aspx?id=63143&promo=SL_Consult_and_Counsel-1",
    IsfooterTextBtn: false
  },
  {
    badgeText: "ANCIENT PALM-LEAF READING",
    title: "Your Destiny, Written Centuries Ago on Palm Leaves",
    desc: "Trained Nadi readers in the Vaitheeswaran Koil’s tradition locate your leaf from your thumb impression- revealing your past karma, your present chapter, and your future destiny, along with the specific remedies written for you.",
    cta: "GET MY NADI READING",
    footerText: "Live Reading • Translation • Recording",
    image: palm_leaf,
    titleColor: "text-gray-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400",
    link: "/nadi/nadi-astrology?promo=SL_nadi-astrology-2",
    IsfooterTextBtn: false
  },
  {
    badgeText: "WRITTEN FOR YOU",
    title: "Know What the Coming Year Holds For You",
    desc: "Detailed written reports on your career, marriage, and wealth. Understand the upcoming planetary dasha periods shaping the critical years ahead in your life. Know the right remedies recommended for you, included in the report. Prepared from your birth chart by our senior Vedic astrologers.",
    cta: "GET MY REPORT",
    footerText: "See a sample report →",
    image: personal_report,
    titleColor: "text-gray-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400",
    link: "/prediction-services-personalized-kundali-report-P88426.aspx?promo=SL_kundali-report-3",
    IsfooterTextBtn: true
  }
];

/** --- Shared Tailwind CSS Classes --- */

const SECTION_STYLES = "py-6 md:py-8 transition-colors duration-500 relative z-10";
const DIVIDER_TOP_STYLES = "absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-px bg-gradient-to-r from-transparent via-black/10 dark:via-white/10 to-transparent";
const DIVIDER_GLOW_STYLES = "absolute top-0 left-1/2 -translate-x-1/2 w-[40%] max-w-md h-[1px] bg-gradient-to-r from-transparent via-amber-500/30 dark:via-amber-400/50 to-transparent shadow-[0_0_15px_rgba(245,158,11,0.5)]";
const CONTENT_WRAPPER_STYLES = "max-w-7xl mx-auto px-6 relative z-10 mt-2";
const HEADER_SUBTITLE_STYLES = "text-amber-600 dark:text-amber-400 font-sans text-xs md:text-sm uppercase tracking-widest font-bold mb-3";
const HEADER_TITLE_STYLES = "font-serif text-3xl sm:text-4xl md:text-5xl text-midnight dark:text-cream leading-tight font-bold mb-4";
const GRID_CONTAINER_STYLES = "flex items-stretch overflow-x-auto snap-x snap-mandatory lg:grid lg:grid-cols-3 gap-6 lg:gap-8 mt-8 relative z-10 pb-12 pt-6 px-6 -mx-6 lg:mx-0 lg:px-4 lg:pb-16 no-scrollbar";
const CARD_STYLES = "snap-center shrink-0 w-[85%] sm:w-[50%] lg:w-full rounded-[2.5rem] flex flex-col group cursor-pointer overflow-hidden relative h-auto border border-black/5 dark:border-amber-500/40 dark:shadow-[0_0_15px_rgba(245,158,11,0.2)] shadow-xl hover:border-[#facc15]/50 hover:shadow-[0_0_40px_rgba(250,204,21,0.2)] transition-all duration-500 bg-white dark:bg-[#0a0e17] m-1";
const IMAGE_CONTAINER_STYLES = "relative w-full z-0 h-[180px] sm:h-[200px] md:h-[220px] lg:h-[260px] shrink-0 overflow-hidden";
const IMAGE_STYLES = "w-full h-full object-cover object-[center_20%] group-hover:scale-105 transition-transform duration-[1500ms] ease-out";
const IMAGE_GRADIENT_STYLES = "hidden";
const CARD_CONTENT_STYLES = "relative z-10 p-6 sm:p-8 flex flex-col flex-1 bg-white dark:bg-[#0a0e17]";
const CARD_ANIMATION_WRAPPER_STYLES = "flex flex-col h-full";
const BADGE_STYLES = "inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-2.5 rounded-full bg-yellow-50 dark:bg-amber-900/20 border border-yellow-200 dark:border-amber-700/50 text-amber-700 dark:text-amber-300 font-sans text-[10px] sm:text-xs md:text-sm uppercase tracking-wider sm:tracking-widest mb-4 w-fit max-w-full font-bold text-center leading-tight whitespace-nowrap";
const DESC_GRID_STYLES = "flex-grow";
const DESC_TEXT_STYLES = "font-body text-gray-700 dark:text-gray-300 text-sm lg:text-base leading-relaxed mb-6 mt-1 whitespace-pre-line";
const CTA_WRAPPER_STYLES = "inline-flex items-center justify-center gap-1.5 sm:gap-2 bg-amber-600 hover:bg-amber-500 dark:bg-amber-500 dark:hover:bg-amber-400 text-white dark:text-gray-900 font-sans text-[10px] sm:text-xs md:text-sm uppercase tracking-wider sm:tracking-widest font-bold px-3 sm:px-6 py-3 sm:py-3.5 rounded-xl transition-all duration-300 mt-auto shadow-lg shadow-amber-900/20 w-full group/btn whitespace-nowrap overflow-hidden";
const FOOTER_TEXT_STYLES = "mt-3 text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-sans font-medium text-center";

/**
 * Helper function to retrieve dynamic title styling combined with custom card colors.
 * @param titleColor - The specific color tailwind class for this expert's title.
 */
const getCardTitleStyles = (titleColor: string): string => {
  return `font-sans text-xl sm:text-2xl lg:text-2xl ${titleColor} font-bold leading-tight mb-2 transition-colors`;
};

/**
 * PersonalGuidance Component
 * Displays a responsive, horizontal-scrolling / grid layout of consultation services.
 */
export function PersonalGuidance() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [lastInteraction, setLastInteraction] = useState(0);

  /**
   * Auto-scroll functionality for mobile views.
   */
  useEffect(() => {
    const autoScrollInterval = setTimeout(() => {
      if (scrollRef.current && window.innerWidth < 1024) {
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
    <section className={SECTION_STYLES}>

      {/* --- Section Top Dividers --- */}
      <div className={DIVIDER_TOP_STYLES} />
      <div className={DIVIDER_GLOW_STYLES} />

      <div className={CONTENT_WRAPPER_STYLES}>

        {/* --- Header Section --- */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <p className={HEADER_SUBTITLE_STYLES}>
            PERSONAL GUIDANCE
          </p>
          <h2 className={HEADER_TITLE_STYLES}>
            Get Clear Answers on <em className="text-amber-600 dark:text-amber-400 italic">Career, Marriage, Money & Health.</em>
          </h2>
        </div>

        {/* --- Premium Cards Grid Section --- */}
        <AnimatedGrid
          ref={scrollRef}
          className={GRID_CONTAINER_STYLES}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          onTouchStart={() => setLastInteraction(Date.now())}
          onMouseDown={() => setLastInteraction(Date.now())}
        >
          {EXPERTS.map((expert, expertIndex) => (
            <AnimatedCard
              key={expertIndex}
              className={CARD_STYLES}
            >

              {/* --- Card Background Image (Stacked mobile, Overlay desktop) --- */}
              <div className={IMAGE_CONTAINER_STYLES}>
                <img
                  src={expert.image}
                  alt={expert.title}
                  className={IMAGE_STYLES}
                />
                <div className={IMAGE_GRADIENT_STYLES} />
              </div>

              {/* --- Card Foreground Content --- */}
              <div className={CARD_CONTENT_STYLES}>
                <div className={CARD_ANIMATION_WRAPPER_STYLES}>

                  {/* Badge */}
                  <span className={BADGE_STYLES}>
                    {expert.badgeText}
                  </span>

                  {/* Title */}
                  <h3 className={getCardTitleStyles(expert.titleColor)}>
                    {expert.title}
                  </h3>

                  {/* Description (Visible on mobile, Hover-reveal on desktop) */}
                  <div className={DESC_GRID_STYLES}>
                    <div className="overflow-hidden">
                      <p className={DESC_TEXT_STYLES}>
                        {expert.desc}
                      </p>
                    </div>
                  </div>

                  {/* CTA Link */}
                  {expert.link ? (
                    <a href={expert.link} target="_blank" rel="noopener noreferrer" className={CTA_WRAPPER_STYLES}>
                      {expert.cta} <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </a>
                  ) : (
                    <div className={CTA_WRAPPER_STYLES}>
                      {expert.cta} <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </div>
                  )}

                  {/* Footer Context Text */}
                  {expert.footerText && !expert.IsfooterTextBtn && (
                    <div className={FOOTER_TEXT_STYLES}>
                      {expert.footerText}
                    </div>
                  )}
                  {/* Footer Context Text */}
                  {expert.footerText && expert.IsfooterTextBtn && (
                    <a
                      href="/reacthome/reports/Sample Detailed Kundli Premium Report.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={FOOTER_TEXT_STYLES}
                    >
                      {expert.footerText}
                    </a>
                  )}

                </div>
              </div>

            </AnimatedCard>
          ))}
        </AnimatedGrid>
      </div>
    </section>
  );
}