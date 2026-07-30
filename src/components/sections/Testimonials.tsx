import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight, Star } from 'lucide-react';
import astro_service from '../../assets/testimonials/astro_service.png';
import astro_promotion from '../../assets/testimonials/astro_promotion.png';
import { fetchTestimonialsData } from '../../services/testimonialService';

/**
 * Interface defining the expected structure of a testimonial fetched from the API.
 * Handles fallbacks since the API might return different key names.
 */
interface TestimonialItem {
  id?: number | string;
  content?: string;
  quote?: string;
  title?: string;
  name?: string;
  role?: string;
  stats?: string;
}

/**
 * Static image assets used in the layout.
 */
const BRAND_IMAGES = [astro_service, astro_promotion];

/** --- Shared Tailwind CSS Classes --- */

/* Main Section Layout */
const SECTION_WRAPPER_STYLES = "py-4 md:py-6 max-w-7xl mx-auto px-6 relative z-10";
const HEADER_CONTAINER_STYLES = "text-center max-w-3xl mx-auto mb-6";
const HEADER_TITLE_STYLES = "font-serif text-3xl sm:text-4xl md:text-5xl text-midnight dark:text-cream leading-tight font-bold mb-4";
const LAYOUT_CONTAINER_STYLES = "flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch max-w-6xl mx-auto";

/* Left Section: Image Graphic */
const LEFT_SECTION_WRAPPER_STYLES = "w-full lg:w-1/2 relative rounded-[2.5rem] overflow-hidden shadow-2xl border border-black/5 dark:border-amber-500/30 dark:shadow-[0_0_20px_rgba(245,158,11,0.15)] group flex-shrink-0";
const LEFT_SECTION_IMAGE_STYLES = "w-full h-full object-cover transform group-hover:scale-[1.03] transition-transform duration-[2s] ease-out";
const LEFT_SECTION_GRADIENT_STYLES = "absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60 mix-blend-multiply pointer-events-none";
const LEFT_SECTION_RING_STYLES = "absolute inset-0 pointer-events-none rounded-[2.5rem] ring-1 ring-inset ring-white/10";

/* Right Section: Testimonial Card */
const RIGHT_SECTION_WRAPPER_STYLES = "w-full lg:w-1/2 h-[340px] sm:h-[340px] lg:h-auto flex flex-col justify-center";
const CARD_CONTAINER_STYLES = "rounded-[2.5rem] bg-gradient-to-br from-amber-50/50 to-white dark:from-[#110c1c] dark:to-[#1a1225] border border-amber-100 dark:border-amber-500/30 dark:shadow-[0_0_25px_rgba(245,158,11,0.15)] p-6 lg:p-8 relative overflow-hidden shadow-2xl h-full flex flex-col justify-between";
const QUOTE_ICON_STYLES = "absolute top-8 right-10 text-amber-500/10 dark:text-amber-500/5 rotate-12";
const GLOW_BG_STYLES = "absolute top-0 left-0 w-64 h-64 bg-amber-500/10 dark:bg-amber-500/5 rounded-full blur-[60px] pointer-events-none";
const CONTENT_WRAPPER_STYLES = "relative z-10 flex-grow flex flex-col justify-center";

/* Typography & Content Layout */
const STAR_RATING_CONTAINER_STYLES = "flex gap-1 text-amber-500 -mt-1";
const STAR_ICON_STYLES = "w-3 h-3 md:w-4 md:h-4 fill-current";
const QUOTE_TEXT_STYLES = "font-body text-lg md:text-base text-midnight dark:text-cream leading-relaxed italic line-clamp-6 sm:line-clamp-5 lg:line-clamp-8";
const AUTHOR_NAME_STYLES = "font-sans text-lg md:text-xl text-midnight dark:text-cream uppercase tracking-widest font-bold";
const AUTHOR_ROLE_STYLES = "font-mono text-xs text-amber-600 dark:text-amber-400 uppercase tracking-widest mt-1.5";

/* Navigation Controls */
const NAV_CONTAINER_STYLES = "flex items-center justify-between pt-3 mt-3 border-t border-amber-200/50 dark:border-amber-500/20 relative z-10";
const DOTS_WRAPPER_STYLES = "flex items-center gap-2";
const BUTTONS_WRAPPER_STYLES = "flex gap-3";
const NAV_BUTTON_STYLES = "w-12 h-12 flex items-center justify-center rounded-full bg-white dark:bg-[#1a1225] border border-amber-200 dark:border-amber-500/40 shadow-sm text-midnight dark:text-cream hover:bg-amber-500 hover:text-white hover:border-amber-500 dark:hover:bg-amber-500 dark:hover:text-white active:scale-95 transition-all";
const NAV_ICON_STYLES = "w-5 h-5";

/**
 * Returns dynamic pagination dot styles based on active state.
 * @param isActive - True if the dot represents the currently active testimonial.
 */
const getDotIndicatorStyles = (isActive: boolean): string => {
  return `block h-[4px] rounded-full transition-all duration-500 ${isActive ? 'bg-amber-500 w-8' : 'bg-black/10 dark:bg-white/10 w-3 hover:bg-amber-500/50'
    }`;
};

/**
 * Calculates which dot should be active based on the current testimonial index.
 * It cycles 0, 1, 2, 0, 1, 2 for continuous rolling dots.
 */
const getActiveDotIndex = (currentIndex: number): number => {
  return currentIndex % 3;
};

/**
 * Calculates which testimonial index to jump to when a progress dot is clicked,
 * keeping it within the current "page" of 3 items.
 */
const getIndexForDot = (dotIndex: number, currentIndex: number, totalCount: number): number => {
  const base = currentIndex - (currentIndex % 3);
  const target = base + dotIndex;
  return target >= totalCount ? totalCount - 1 : target;
};

/**
 * Testimonials Component
 * 
 * Fetches and displays client feedback via an animated carousel, alongside a premium graphic.
 */
export function Testimonials() {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  /**
   * Auto-scroll timer logic. Pauses when unmounted.
   */
  useEffect(() => {
    if (!testimonials.length) return;

    const interval = setInterval(() => {
      setActiveTestimonial((prev) =>
        prev < testimonials.length - 1 ? prev + 1 : 0
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials]);

  /**
   * Fetches testimonials from the service on mount.
   */
  useEffect(() => {
    const getTestimonials = async () => {
      try {
        const data = await fetchTestimonialsData();
        setTestimonials(data);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };
    getTestimonials();
  }, []);

  // Pre-calculate variables
  const currentTestimonial = testimonials[activeTestimonial];
  const hasTestimonials = testimonials.length > 0;
  const numDots = hasTestimonials ? Math.min(3, testimonials.length) : 0;
  const activeDotIndex = hasTestimonials ? getActiveDotIndex(activeTestimonial) : 0;
  const dotsArray = Array.from({ length: numDots }, (_, i) => i);

  return (
    <>
      <section className={SECTION_WRAPPER_STYLES} id="trust-platform">

        {/* --- Main Section Header --- */}
        <div className={HEADER_CONTAINER_STYLES}>
          <h2 className={HEADER_TITLE_STYLES}>
            Client <em className="text-amber-600 dark:text-amber-400 italic">Testimonials.</em>
          </h2>
        </div>

        <div className={LAYOUT_CONTAINER_STYLES}>

          {/* --- Left Section: Full Graphic --- */}
          <div className={LEFT_SECTION_WRAPPER_STYLES}>
            <img
              src={BRAND_IMAGES[1]}
              alt="Authentic Vedic Astrology Service and Rituals"
              className={LEFT_SECTION_IMAGE_STYLES}
            />
            <div className={LEFT_SECTION_GRADIENT_STYLES} />
            <div className={LEFT_SECTION_RING_STYLES} />
          </div>

          {/* --- Right Section: Premium Testimonials Feedback Card --- */}
          <div className={RIGHT_SECTION_WRAPPER_STYLES}>
            <div className={CARD_CONTAINER_STYLES}>

              {/* Decorative Quote Icon & Soft Background Glow */}
              <div className={QUOTE_ICON_STYLES}>
                <svg aria-hidden="true" width="100" height="100" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.017 21L16.41 14.9096H10.605L10.605 3H21L21 14.9096L17.757 21H14.017ZM3.412 21L5.805 14.9096H0L0 3H10.395L10.395 14.9096L7.152 21H3.412Z" />
                </svg>
              </div>
              <div className={GLOW_BG_STYLES} />

              {/* --- Card Content --- */}
              <div className={CONTENT_WRAPPER_STYLES}>
                {!hasTestimonials ? null : (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTestimonial}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                      className="space-y-3"
                    >
                      {/* Star Rating */}
                      <div className={STAR_RATING_CONTAINER_STYLES}>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className={STAR_ICON_STYLES} />
                        ))}
                      </div>

                      {/* Review Quote */}
                      <blockquote className={QUOTE_TEXT_STYLES}>
                        "{currentTestimonial?.content || currentTestimonial?.quote}"
                      </blockquote>

                      {/* Author Details */}
                      <div>
                        <h4 className={AUTHOR_NAME_STYLES}>
                          {currentTestimonial?.title || currentTestimonial?.name}
                        </h4>
                        {(currentTestimonial?.role || currentTestimonial?.stats) && (
                          <p className={AUTHOR_ROLE_STYLES}>
                            {currentTestimonial?.role || ''} {currentTestimonial?.stats ? `· ${currentTestimonial?.stats}` : ''}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                )}
              </div>

              {/* --- Navigation Controls --- */}
              {hasTestimonials && (
                <div className={NAV_CONTAINER_STYLES}>

                  {/* Pagination Dots */}
                  <div className={DOTS_WRAPPER_STYLES}>
                    {dotsArray.map((dotIndex) => (
                      <button
                        key={dotIndex}
                        onClick={() => setActiveTestimonial(getIndexForDot(dotIndex, activeTestimonial, testimonials.length))}
                        className="p-2"
                      >
                        <span className={getDotIndicatorStyles(activeDotIndex === dotIndex)} />
                      </button>
                    ))}
                  </div>

                  {/* Left / Right Arrows */}
                  <div className={BUTTONS_WRAPPER_STYLES}>
                    <button
                      onClick={() => setActiveTestimonial((prev) => prev > 0 ? prev - 1 : testimonials.length - 1)}
                      className={NAV_BUTTON_STYLES}
                    >
                      <ArrowLeft className={NAV_ICON_STYLES} />
                    </button>
                    <button
                      onClick={() => setActiveTestimonial((prev) => (prev < testimonials.length - 1 ? prev + 1 : 0))}
                      className={NAV_BUTTON_STYLES}
                    >
                      <ArrowRight className={NAV_ICON_STYLES} />
                    </button>
                  </div>

                </div>
              )}

            </div>
          </div>

        </div>
      </section>
    </>
  );
}