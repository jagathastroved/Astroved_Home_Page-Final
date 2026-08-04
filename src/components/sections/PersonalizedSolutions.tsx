import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, ArrowRight, ArrowUpRight } from 'lucide-react';
import { scrollToSection } from '../../utils/scroll';
import astroved_store from '../../assets/personalized_solutions/astroved_store.png';
import Community_Fire from '../../assets/personalized_solutions/Community_Fire.png';
import Pilgrimage_Tours from '../../assets/personalized_solutions/Pilgrimage_Tours.png';

/**
 * Interface defining the structure for each personalized solution item.
 */
interface SolutionItem {
  id: number;
  title: string;
  tagline: string;
  description: string;
  cta: string;
  footerText?: string;
  image: string;
  mobileImage?: string;
  imagePosition: string;
  link: string | (() => void);
  isExternal: boolean;
}

/**
 * Static data configuration for all personalized solution cards.
 */
const SOLUTIONS: SolutionItem[] = [
  {
    id: 1,
    title: "Authentic Fire Rituals for Prosperity, Health, Love & Protection",
    tagline: "PRIEST SERVICES",
    description: "Book a homa performed by experienced temple priests. Your name and birth star are spoken in the sankalpam, and you receive the ritual video and prasad at home — wherever in the world you are.",
    cta: "BOOK A PRIEST NOW",
    footerText: "Guided rituals by expert priests, anywhere.",
    image: Community_Fire,
    imagePosition: "object-[center_15%]",
    link: "/priest-services?promo=SL_priest-services-1",
    isExternal: true
  },
  {
    id: 2,
    title: "Rudraksha, Yantras, Divine Statues & Malas — Energized Per Vedic Rules Before They Reach You",
    tagline: "ASTROVED SHOP",
    description: "Every product is blessed through traditional rituals before dispatch to bring positive energies into your home and workplace.",
    cta: "SHOP ENERGIZED PRODUCTS",
    footerText: "Ships across India & worldwide",
    image: astroved_store,
    imagePosition: "object-[center_30%]",
    link: "/us/specials/astrology-products?promo=SL_Energized_Products-2",
    isExternal: true
  },
  {
    id: 3,
    title: "Powerful Temple Yatras, Planned for You",
    tagline: "GUIDED PILGRIMAGE TOURS",
    description: "Guided pilgrimages to sacred temples — travel, priest access, and special darshan arranged, so you can focus on the prayer, not the planning.",
    cta: "VIEW UPCOMING TOURS",
    footerText: "Serving seekers across the globe",
    image: Pilgrimage_Tours,
    imagePosition: "object-[center_10%]",
    link: "/trip-c414.aspx?promo=SL_trip-3",
    isExternal: true
  }
];

/** --- Shared Tailwind CSS Classes --- */

/* Base Section & Headers */
const SECTION_WRAPPER_STYLES = "py-4 md:py-6 px-6 max-w-7xl mx-auto z-10";
const HEADER_CONTAINER_STYLES = "text-center max-w-3xl mx-auto mb-10";
const HEADER_SUBTITLE_STYLES = "text-amber-600 dark:text-amber-400 font-sans text-xs md:text-sm uppercase tracking-widest font-bold mb-3";
const HEADER_TITLE_STYLES = "font-serif text-3xl sm:text-4xl md:text-5xl text-midnight dark:text-cream leading-tight font-bold mb-4";
const HEADER_DESC_STYLES = "font-sans text-gray-500 dark:text-gray-400 text-sm md:text-base lg:text-lg leading-relaxed max-w-2xl mx-auto font-medium";

/* Desktop Grid Layout (Cards) */
const DESKTOP_GRID_STYLES = "hidden md:grid md:grid-cols-3 gap-6 lg:gap-8 items-stretch";
const DESKTOP_CARD_STYLES = "group overflow-hidden rounded-[2.5rem] bg-white dark:bg-[#0b0e14] border border-gray-200/80 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:border-[#b052ff]/40 hover:shadow-[0_8px_40px_rgba(176,82,255,0.25)] hover:-translate-y-1 transition-all duration-500 flex flex-col h-full relative";
const DESKTOP_IMG_WRAPPER_STYLES = "w-full h-64 lg:h-72 relative overflow-hidden rounded-t-[2.5rem] isolate";
const DESKTOP_CARD_CONTENT_STYLES = "px-5 lg:px-8 pb-8 pt-4 flex flex-col flex-grow z-10 relative";
const DESKTOP_HEADER_WRAPPER_STYLES = "min-h-[110px] lg:min-h-[125px] flex flex-col justify-start";
const TAGLINE_WRAPPER_STYLES = "flex items-center mb-3 lg:mb-4";
const TAGLINE_STYLES = "before:content-['✦'] before:mr-2.5 before:text-[#d946ef] flex items-center font-serif text-sm lg:text-base uppercase tracking-[0.25em] font-black text-transparent bg-clip-text bg-gradient-to-r from-[#8a2be2] to-[#d946ef] drop-shadow-sm leading-tight";
const DESKTOP_TITLE_STYLES = "font-sans text-base lg:text-xl xl:text-2xl text-gray-900 dark:text-white font-bold tracking-tight mb-2 lg:mb-3 leading-snug";
const DESKTOP_DESC_STYLES = "font-sans text-gray-600 dark:text-gray-300 text-xs lg:text-sm leading-relaxed mb-6 flex-grow";

/* Common Button Styles */
const CTA_CONTAINER_STYLES = "mt-auto flex flex-col justify-start w-full";
const CTA_ALIGNER_STYLES = "flex justify-center w-full min-h-[44px]";
const DESKTOP_CTA_STYLES = "flex w-full justify-center items-center gap-1.5 px-3 lg:px-6 py-2.5 lg:py-3 rounded-full bg-amber-600 hover:bg-amber-500 text-white font-sans font-semibold tracking-wide text-[9px] lg:text-xs hover:scale-105 transition-transform shadow-md text-center leading-tight cursor-pointer";
const FOOTER_TEXT_STYLES = "mt-2 text-xs lg:text-sm text-gray-500 dark:text-gray-400 font-medium font-sans min-h-[32px] text-center lg:text-center";

const MOBILE_CONTAINER_STYLES = "md:hidden relative group px-0 touch-pan-y";
const MOBILE_CAROUSEL_BOX_STYLES = "overflow-hidden rounded-[2.5rem] bg-white dark:bg-[#0b0e14] border border-gray-200/80 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:border-[#b052ff]/40 hover:shadow-[0_8px_40px_rgba(176,82,255,0.25)] transition-all duration-500 relative h-[670px] lg:h-[450px]";
const MOBILE_CARD_INNER_STYLES = "group/card flex flex-col lg:flex-row h-full relative";
const MOBILE_DESKTOP_IMG_OVERLAY_STYLES = "hidden lg:block absolute top-0 bottom-0 left-0 w-[55%] overflow-hidden pointer-events-none";
const MOBILE_IMG_WRAPPER_STYLES = "lg:hidden absolute top-0 inset-x-0 h-[220px] overflow-hidden pointer-events-none rounded-t-[2.5rem]";
const MOBILE_GRADIENT_OVERLAY_STYLES = "absolute inset-0 bg-gradient-to-t from-[#f8f9fa] dark:from-[#0b0e14] to-transparent h-24 top-auto bottom-0";
const MOBILE_CONTENT_CONTAINER_STYLES = "w-full lg:w-[45%] ml-auto px-6 pb-20 pt-[240px] sm:px-12 lg:p-16 flex flex-col justify-center items-center lg:items-start text-center lg:text-left z-10 relative h-full lg:mt-0 lg:pt-0";
const MOBILE_TAGLINE_WRAPPER_STYLES = "flex items-center justify-center lg:justify-start mb-5 relative z-20 w-full";
const MOBILE_TAGLINE_STYLES = "before:content-['✦'] before:mr-2.5 before:text-[#d946ef] flex items-center font-serif text-sm md:text-base uppercase tracking-[0.25em] font-black text-transparent bg-clip-text bg-gradient-to-r from-[#8a2be2] to-[#d946ef] drop-shadow-sm relative z-20";
const MOBILE_TITLE_STYLES = "font-sans text-[1.35rem] leading-tight lg:text-3xl lg:leading-snug text-gray-900 dark:text-white font-bold tracking-tight mb-4";
const MOBILE_DESC_STYLES = "font-sans text-gray-600 dark:text-gray-300 text-sm md:text-base leading-relaxed mb-6 max-w-sm mx-auto lg:mx-0";
const MOBILE_CTA_ALIGNER_STYLES = "flex justify-center w-full mb-3";
const MOBILE_CTA_STYLES = "inline-flex w-full max-w-[280px] justify-center items-center gap-1.5 px-4 py-3 rounded-full bg-amber-600 hover:bg-amber-500 text-white font-sans font-semibold tracking-wide text-xs sm:text-sm hover:scale-105 transition-transform shadow-lg text-center cursor-pointer";
const MOBILE_FOOTER_TEXT_STYLES = "text-xs text-gray-500 dark:text-gray-400 font-medium font-sans";
const NAV_BUTTONS_CONTAINER_STYLES = "absolute top-[17%] -translate-y-1/2 left-0 right-0 flex justify-between px-2 sm:px-4 md:-mx-6 pointer-events-none z-20";
const NAV_BUTTON_STYLES = "w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/80 hover:bg-white dark:bg-black/30 dark:hover:bg-black/50 backdrop-blur-md border border-gray-200 dark:border-white/10 flex items-center justify-center text-[#b052ff] dark:text-white transition-all hover:scale-110 pointer-events-auto shadow-lg";
const PAGINATION_CONTAINER_STYLES = "absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-50 lg:bottom-8 lg:right-12 lg:left-auto lg:translate-x-0";

/**
 * Returns the CSS class for an image inside a card, applying the object position.
 * @param imagePosition - The tailwind class for object positioning.
 */
const getDesktopImageStyles = (imagePosition: string): string => {
  return `w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1500ms] ease-out ${imagePosition}`;
};

/**
 * Returns the CSS class for an image inside the mobile carousel, applying the object position.
 * @param imagePosition - The tailwind class for object positioning.
 * @param isDesktopView - True if it's the desktop override inside the carousel.
 */
const getCarouselImageStyles = (imagePosition: string, isDesktopView: boolean): string => {
  if (isDesktopView) {
    return `w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-[1500ms] ease-out ${imagePosition}`;
  }
  return `w-full h-full object-cover ${imagePosition}`;
};

/**
 * Returns dynamic pagination dot styles based on active state.
 * @param isActive - Whether the current dot matches the active slide index.
 */
const getPaginationDotStyles = (isActive: boolean): string => {
  return `transition-all duration-500 rounded-full ${isActive
    ? 'w-6 h-1.5 bg-[#b052ff] dark:bg-[#b052ff] shadow-sm'
    : 'w-1.5 h-1.5 bg-gray-400 hover:bg-gray-500 dark:bg-white/40 dark:hover:bg-white/60 shadow-sm'
    }`;
};

/**
 * PersonalizedSolutions Component
 * 
 * Displays different spiritual services/remedies in a standard grid on desktop 
 * and a swipeable carousel on mobile devices.
 */
export function PersonalizedSolutions() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  /**
   * Captures the initial X coordinate of a user's touch for swiping.
   */
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  /**
   * Tracks the user's finger movement along the X axis during a swipe.
   */
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  /**
   * Evaluates if the swipe distance breached the threshold to trigger a slide change.
   */
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) nextSlide();
    if (distance < -50) prevSlide();
  };

  /**
   * Advances the carousel to the next slide, wrapping around if at the end.
   */
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === SOLUTIONS.length - 1 ? 0 : prev + 1));
  };

  /**
   * Reverses the carousel to the previous slide, wrapping around if at the beginning.
   */
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? SOLUTIONS.length - 1 : prev - 1));
  };

  /**
   * Auto-scroll functionality for the mobile carousel.
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      nextSlide();
    }, 5000);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  return (
    <section className={SECTION_WRAPPER_STYLES} id="auspicious-actions">

      {/* --- Section Header --- */}
      <div className={HEADER_CONTAINER_STYLES}>
        <p className={HEADER_SUBTITLE_STYLES}>
          REMEDIES THAT REACH YOU AT HOME
        </p>
        <h2 className={HEADER_TITLE_STYLES}>
          Book Rituals & Remedies in Your <em className="text-amber-600 dark:text-amber-400 italic">Name.</em>
        </h2>
        {/* <p className={HEADER_DESC_STYLES}>
          Performed by temple-trained priests — you watch from home, the blessings reach your family
        </p> */}
      </div>

      {/* --- Desktop/Tablet Grid View (No Carousel) --- */}
      <div className={DESKTOP_GRID_STYLES}>
        {SOLUTIONS.map((solution, itemIndex) => (
          <div key={itemIndex} className={DESKTOP_CARD_STYLES}>
            <div className={DESKTOP_IMG_WRAPPER_STYLES}>
              <img
                src={solution.image}
                alt={solution.title}
                className={getDesktopImageStyles(solution.imagePosition)}
              />
            </div>

            <div className={DESKTOP_CARD_CONTENT_STYLES}>

              {/* Badge & Title */}
              <div className={DESKTOP_HEADER_WRAPPER_STYLES}>
                <div className={TAGLINE_WRAPPER_STYLES}>
                  <span className={TAGLINE_STYLES}>
                    {solution.tagline}
                  </span>
                </div>
                <h3 className={DESKTOP_TITLE_STYLES}>
                  {solution.title}
                </h3>
              </div>

              {/* Description */}
              <p className={DESKTOP_DESC_STYLES}>
                {solution.description}
              </p>

              {/* CTA & Footer Text */}
              <div className={CTA_CONTAINER_STYLES}>
                <div className={CTA_ALIGNER_STYLES}>
                  {solution.isExternal ? (
                    <a
                      href={solution.link as string}
                      target="_blank"

                      className={DESKTOP_CTA_STYLES}
                    >
                      {solution.cta} <ArrowUpRight className="w-3.5 h-3.5 flex-shrink-0" />
                    </a>
                  ) : (
                    <button
                      onClick={solution.link as () => void}
                      className={DESKTOP_CTA_STYLES}
                    >
                      {solution.cta} <ArrowRight className="w-3.5 h-3.5 flex-shrink-0" />
                    </button>
                  )}
                </div>

                <div className={FOOTER_TEXT_STYLES}>
                  {solution.footerText || ""}
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* --- Mobile Carousel View --- */}
      <div
        className={MOBILE_CONTAINER_STYLES}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className={MOBILE_CAROUSEL_BOX_STYLES}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="w-full h-full absolute inset-0"
            >
              {(() => {
                const currentSolution = SOLUTIONS[currentIndex];
                return (
                  <div className={MOBILE_CARD_INNER_STYLES}>

                    {/* Background Image (Desktop override inside carousel) */}
                    <div className={MOBILE_DESKTOP_IMG_OVERLAY_STYLES}>
                      <img
                        src={currentSolution.image}
                        alt={currentSolution.title}
                        className={getCarouselImageStyles(currentSolution.imagePosition, true)}
                        style={{
                          WebkitMaskImage: 'linear-gradient(to right, black 85%, transparent 100%)',
                          maskImage: 'linear-gradient(to right, black 85%, transparent 100%)'
                        }}
                      />
                    </div>

                    {/* Background Image (Mobile & Tablet) */}
                    <div className={MOBILE_IMG_WRAPPER_STYLES}>
                      <picture>
                        <source media="(min-width: 768px)" srcSet={currentSolution.image} />
                        <img
                          src={currentSolution.mobileImage || currentSolution.image}
                          alt={currentSolution.title}
                          className={getCarouselImageStyles(currentSolution.imagePosition, false)}
                        />
                      </picture>
                      <div className={MOBILE_GRADIENT_OVERLAY_STYLES}></div>
                    </div>

                    {/* Content Section */}
                    <div className={MOBILE_CONTENT_CONTAINER_STYLES}>
                      <div className="w-full">

                        {/* Tagline Badge */}
                        <div className={MOBILE_TAGLINE_WRAPPER_STYLES}>
                          <span className={MOBILE_TAGLINE_STYLES}>
                            {currentSolution.tagline}
                          </span>
                        </div>

                        {/* Title & Description */}
                        <h3 className={MOBILE_TITLE_STYLES}>
                          {currentSolution.title}
                        </h3>
                        <p className={MOBILE_DESC_STYLES}>
                          {currentSolution.description}
                        </p>

                        {/* CTA Buttons */}
                        <div className={MOBILE_CTA_ALIGNER_STYLES}>
                          {currentSolution.isExternal ? (
                            <a
                              href={currentSolution.link as string}
                              target="_blank"

                              className={MOBILE_CTA_STYLES}
                            >
                              {currentSolution.cta} <ArrowUpRight className="w-3.5 h-3.5" />
                            </a>
                          ) : (
                            <button
                              onClick={currentSolution.link as () => void}
                              className={MOBILE_CTA_STYLES}
                            >
                              {currentSolution.cta} <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>

                        {/* Footer Context Text */}
                        {currentSolution.footerText && (
                          <div className={MOBILE_FOOTER_TEXT_STYLES}>
                            {currentSolution.footerText}
                          </div>
                        )}

                      </div>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* --- Carousel Navigation Controls --- */}
        <div className={NAV_BUTTONS_CONTAINER_STYLES}>
          <button
            onClick={prevSlide}
            className={NAV_BUTTON_STYLES}
            aria-label="Previous event"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <button
            onClick={nextSlide}
            className={NAV_BUTTON_STYLES}
            aria-label="Next event"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* --- Carousel Pagination Indicators --- */}
        <div className={PAGINATION_CONTAINER_STYLES}>
          {SOLUTIONS.map((_, itemIndex) => (
            <button
              key={itemIndex}
              onClick={() => setCurrentIndex(itemIndex)}
              className={getPaginationDotStyles(itemIndex === currentIndex)}
              aria-label={`Go to slide ${itemIndex + 1}`}
            />
          ))}
        </div>
      </div>

    </section>
  );
}
