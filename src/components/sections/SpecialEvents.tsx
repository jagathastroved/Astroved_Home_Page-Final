import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ScrollText, PhoneCall } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { fetchSpecialEvents } from "../../services/astrovedService";

/**
 * Interface defining the structure of a single banner (one image + link).
 * `sources` holds any <picture><source> variants found *inside that same
 * banner's own markup* — this is just for image-quality/bandwidth, NOT for
 * deciding which banner set (mobile vs desktop) to show.
 */
interface EventBanner {
  title: string;
  image: string;
  sources: Array<{ media: string; srcSet: string }>;
  link: string;
}

/**
 * Interface defining the structure of a parsed carousel item.
 * `isThreeBan` items render 1-3 banners side by side (desktop only, in this data set).
 */
interface ApiEventItem {
  id: number;
  isThreeBan: boolean;
  banners: EventBanner[];
}

/** --- Shared Tailwind CSS Classes --- */

/* Base Section & Headers */
const SECTION_WRAPPER_STYLES =
  "pt-2 md:pt-4 pb-3 md:pb-6 relative overflow-hidden transition-colors duration-500 z-10";
const CONTENT_WRAPPER_STYLES =
  "max-w-[1600px] mx-auto px-4 md:px-8 relative z-10";

/* Carousel Container */
const CAROUSEL_WRAPPER_STYLES = "relative group px-0 touch-pan-y";
const CAROUSEL_BOX_STYLES =
  "overflow-hidden rounded-[2.5rem] bg-[#FFF5E1] transition-all duration-500 relative grid aspect-[42/52] min-[768px]:aspect-[80/29] min-[992px]:aspect-[160/38]";
const LOADING_CONTAINER_STYLES =
  "w-full h-full flex items-center justify-center col-start-1 row-start-1 z-20";
const LOADING_CONTENT_STYLES = "flex flex-col items-center gap-3";
const LOADING_TEXT_STYLES =
  "text-xs font-semibold text-amber-600 dark:text-amber-500 uppercase tracking-widest animate-pulse";

/* Carousel Images */
const MULTI_BANNER_WRAPPER_STYLES =
  "w-full h-full flex gap-3 md:gap-4 justify-between items-center";
const SINGLE_BANNER_WRAPPER_STYLES = "w-full h-full relative";
const MULTI_BANNER_IMG_STYLES =
  "w-full h-full object-cover rounded-[1rem] md:rounded-[1.5rem] transition-all duration-500 hover:scale-[1.03] shadow-sm hover:shadow-md";
const SINGLE_BANNER_IMG_STYLES =
  "w-full h-full object-cover rounded-[1.5rem] md:rounded-[2.5rem] bg-[#FFF5E1] border border-black/5 hover:border-[#facc15]/50 hover:shadow-[0_0_40px_rgba(250,204,21,0.2)] transition-all duration-500 group-hover/card:scale-[1.02]";

/* Navigation & Pagination */
const NAV_BTN_PREV_STYLES =
  "absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-black/50 border border-white/20 p-2 md:p-3 rounded-full text-white hover:bg-black/80 hover:scale-110 transition-all z-20 backdrop-blur-sm";
const NAV_BTN_NEXT_STYLES =
  "absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-black/50 border border-white/20 p-2 md:p-3 rounded-full text-white hover:bg-black/80 hover:scale-110 transition-all z-20 backdrop-blur-sm";
const PAGINATION_CONTAINER_STYLES =
  "absolute bottom-4 md:bottom-8 left-0 right-0 flex justify-center gap-2 z-20 pointer-events-none";

/* Static CTA Buttons */
const CTA_BAR_CONTAINER_STYLES =
  "w-full flex flex-col md:flex-row justify-center items-center gap-4 sm:gap-6 md:gap-8 lg:gap-8 mt-4 sm:mt-5 lg:mt-3 mb-2 lg:mb-0 px-2 sm:px-6 md:px-10 lg:px-8 relative z-30";
const ASTRO_BTN_STYLES =
  "relative flex items-center justify-center rounded-full bg-gradient-to-r from-[#20033b] via-[#3a0c6a] to-[#510e8d] hover:to-[#5c0fa0] transition-all duration-300 shadow-[0_10px_30px_rgba(58,12,106,0.3)] hover:shadow-[0_10px_35px_rgba(176,82,255,0.5)] border-[2px] border-amber-400 hover:scale-[1.03] w-full max-w-[300px] sm:max-w-[340px] md:max-w-[360px] lg:max-w-[380px] h-[64px] sm:h-[72px] lg:h-[76px] group ml-5 sm:ml-6 md:ml-8 lg:ml-0 cursor-pointer";
const ASTRO_ICON_WRAPPER_STYLES =
  "absolute left-[-20px] sm:left-[-24px] top-1/2 -translate-y-1/2 w-[64px] h-[64px] sm:w-[72px] sm:h-[72px] lg:w-[76px] lg:h-[76px] rounded-full border-[2.5px] border-amber-400 bg-gradient-to-b from-[#2a0854] to-[#120224] flex items-center justify-center shadow-lg z-20 group-hover:scale-105 transition-transform duration-300";
const HOMA_BTN_STYLES =
  "relative flex items-center justify-center rounded-full bg-gradient-to-r from-[#983800] via-[#c65104] to-[#ea6b06] hover:to-[#f2740d] transition-all duration-300 shadow-[0_10px_30px_rgba(198,81,4,0.3)] hover:shadow-[0_10px_35px_rgba(245,158,11,0.5)] border-[2px] border-amber-400 hover:scale-[1.03] w-full max-w-[300px] sm:max-w-[340px] md:max-w-[360px] lg:max-w-[380px] h-[64px] sm:h-[72px] lg:h-[76px] group ml-5 sm:ml-6 md:ml-8 lg:ml-0 cursor-pointer";
const HOMA_ICON_WRAPPER_STYLES =
  "absolute left-[-20px] sm:left-[-24px] top-1/2 -translate-y-1/2 w-[64px] h-[64px] sm:w-[72px] sm:h-[72px] lg:w-[76px] lg:h-[76px] rounded-full border-[2.5px] border-amber-400 bg-gradient-to-b from-[#8f3a00] to-[#3a1500] flex items-center justify-center shadow-lg z-20 group-hover:scale-105 transition-transform duration-300";
const CTA_TEXT_WRAPPER_STYLES = "z-10 text-center w-full px-14 sm:px-16";
const CTA_TITLE_STYLES =
  "font-serif text-white text-[17px] sm:text-[19px] lg:text-[22px] font-bold tracking-wide drop-shadow-md leading-tight whitespace-nowrap";
const CTA_ARROW_WRAPPER_STYLES =
  "absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-full bg-white flex items-center justify-center shadow-md z-10 group-hover:translate-x-1 transition-transform duration-300 shrink-0";
const CTA_ARROW_ICON_ASTRO_STYLES =
  "w-4 h-4 sm:w-5 sm:h-5 lg:w-5 lg:h-5 text-purple-800 stroke-[2.5]";
const CTA_ARROW_ICON_HOMA_STYLES =
  "w-4 h-4 sm:w-5 sm:h-5 lg:w-5 lg:h-5 text-orange-800 stroke-[2.5]";

/**
 * Returns dynamic visibility classes for multi-banner (three-ban) arrays.
 * @param index - Index of the banner in the array.
 */
const getMultiBannerVisibilityStyles = (index: number): string => {
  return `flex-1 ${index === 1 ? "hidden md:block" : index === 2 ? "hidden lg:block" : "block"}`;
};

/**
 * Returns dynamic pagination dot styles based on active state.
 * @param isActive - Whether the dot represents the current slide.
 */
const getPaginationDotStyles = (isActive: boolean): string => {
  return `h-1.5 rounded-full transition-all duration-300 pointer-events-auto ${isActive ? "bg-amber-400 w-6" : "bg-white/30 hover:bg-white/50 w-1.5"}`;
};

/**
 * Parses a WordPress carousel HTML document into a normalized event list.
 * This is used SEPARATELY for desktop_content and mobile_content — they are
 * independent carousels with different item counts/structures, so they are
 * never zipped together by index.
 *
 * @param htmlDoc - Parsed HTML document (desktop or mobile content).
 * @param itemSelector - CSS selector for each slide/item wrapper
 *   ('.carousel-item' for desktop_content, '.slide' for mobile_content).
 */
const parseCarouselDoc = (
  htmlDoc: Document,
  itemSelector: string,
): ApiEventItem[] => {
  const items = htmlDoc.querySelectorAll(itemSelector);

  return Array.from(items).map((item, index) => {
    const threeBanContainer = item.querySelector(".three-ban");

    if (threeBanContainer) {
      // Multi-banner row (e.g. Saturn Transit / Pratyangira Devi / Shreem Brzee)
      const anchors = threeBanContainer.querySelectorAll("a");
      const banners: EventBanner[] = Array.from(anchors).map((anchor) => {
        const img = anchor.querySelector("img");
        return {
          title: img
            ? img.getAttribute("alt") ||
              img.getAttribute("title") ||
              "Special Event"
            : "Special Event",
          image: img ? img.getAttribute("src") || "" : "",
          sources: [],
          link: anchor.getAttribute("href") || "",
        };
      });

      return {
        id: index + 1,
        isThreeBan: true,
        banners,
      };
    }

    // Single banner slide
    const img = item.querySelector("img");
    const anchor = item.querySelector("a");
    const picture = item.querySelector("picture");

    const sources: Array<{ media: string; srcSet: string }> = [];
    if (picture) {
      picture.querySelectorAll("source").forEach((src) => {
        sources.push({
          media: src.getAttribute("media") || "",
          srcSet: src.getAttribute("srcset") || "",
        });
      });
    }

    return {
      id: index + 1,
      isThreeBan: false,
      banners: [
        {
          title: img
            ? img.getAttribute("alt") ||
              img.getAttribute("title") ||
              "Special Event"
            : "Special Event",
          image: img ? img.getAttribute("src") || "" : "",
          sources,
          link: anchor ? anchor.getAttribute("href") || "" : "",
        },
      ],
    };
  });
};

const preloadImages = async (events: ApiEventItem[]) => {
  const promises = events.flatMap((event) =>
    event.banners.map(
      (banner) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = () => resolve();
          img.onerror = () => resolve();
          img.src = banner.image;
        }),
    ),
  );

  await Promise.all(promises);
};

/**
 * SpecialEvents Component
 *
 * Fetches dynamic events from an external API. desktop_content and
 * mobile_content are parsed into two SEPARATE carousels (they are not the
 * same list at different resolutions — mobile drops some desktop banners
 * and adds its own). The component watches actual viewport width and
 * renders only the matching carousel, so mobile screens only ever show
 * banners that came from mobile_content, and desktop only ever shows
 * banners from desktop_content.
 */
export function SpecialEvents() {
  const [desktopEvents, setDesktopEvents] = useState<ApiEventItem[]>([]);
  const [mobileEvents, setMobileEvents] = useState<ApiEventItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isMobile, setIsMobile] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // The carousel actually shown right now — mobile_content on small screens,
  // desktop_content everywhere else.
  const displayEvents = isMobile ? mobileEvents : desktopEvents;

  /**
   * Tracks real viewport width so we know which parsed carousel to show.
   */
  useEffect(() => {
    const checkViewport = () => setIsMobile(window.innerWidth < 768);
    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  /**
   * Reset to the first slide whenever we switch between the mobile and
   * desktop carousels (they have different lengths/content).
   */
  useEffect(() => {
    setCurrentIndex(0);
  }, [isMobile]);

  /**
   * Fetches event carousel HTML from the WordPress API and parses
   * desktop_content and mobile_content independently.
   */
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        const data = await fetchSpecialEvents();

        if (Array.isArray(data) && data.length > 0) {
          const parser = new DOMParser();

          const desktop = data[0].desktop_content
            ? parseCarouselDoc(
                parser.parseFromString(data[0].desktop_content, "text/html"),
                ".carousel-item",
              )
            : [];

          const mobile = data[0].mobile_content
            ? parseCarouselDoc(
                parser.parseFromString(data[0].mobile_content, "text/html"),
                ".slide",
              )
            : [];

          await preloadImages([...desktop, ...mobile]);

          setDesktopEvents(desktop);
          setMobileEvents(mobile);
          setCurrentIndex(0);
        }
      } catch (err) {
        console.error("Error fetching special events:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  /** Swipe gesture start logic. */
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  /** Swipe gesture move logic. */
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  /** Swipe gesture end logic, determining slide direction. */
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) nextSlide();
    if (distance < -50) prevSlide();
  };

  /** Advances the carousel to the next slide. */
  const nextSlide = () => {
    if (displayEvents.length === 0) return;
    setDirection(1);
    setCurrentIndex((prev) =>
      prev === displayEvents.length - 1 ? 0 : prev + 1,
    );
  };

  /** Reverses the carousel to the previous slide. */
  const prevSlide = () => {
    if (displayEvents.length === 0) return;
    setDirection(-1);
    setCurrentIndex((prev) =>
      prev === 0 ? displayEvents.length - 1 : prev - 1,
    );
  };

  /** Auto-scroll timer. */
  useEffect(() => {
    if (displayEvents.length <= 1) return;
    const timer = setTimeout(() => {
      nextSlide();
    }, 5000);
    return () => clearTimeout(timer);
  }, [displayEvents, currentIndex]);

  const ready = !isLoading && displayEvents.length > 0;
  const activeEvent = ready ? displayEvents[currentIndex] : null;

  return (
    <section id="special-events" className={SECTION_WRAPPER_STYLES}>
      <div className={CONTENT_WRAPPER_STYLES}>
        {/* --- Carousel Container --- */}
        <div
          className={CAROUSEL_WRAPPER_STYLES}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className={CAROUSEL_BOX_STYLES}>
            {!ready || !activeEvent ? (
              /* Loading Indicator */
              <div className={LOADING_CONTAINER_STYLES}>
                <div className={LOADING_CONTENT_STYLES}>
                  <svg
                    className="animate-spin h-8 w-8 text-amber-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span className={LOADING_TEXT_STYLES}>Loading Events...</span>
                </div>
              </div>
            ) : (
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={`${isMobile ? "mobile" : "desktop"}-${currentIndex}`}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="w-full h-full cursor-pointer flex flex-col items-center justify-center col-start-1 row-start-1"
                  onClick={() => {
                    if (!activeEvent.isThreeBan) {
                      const link = activeEvent.banners[0]?.link;
                      if (link) {
                        window.open(link, "_blank", "noopener,noreferrer");
                      }
                    }
                  }}
                >
                  {activeEvent.isThreeBan ? (
                    <div className={MULTI_BANNER_WRAPPER_STYLES}>
                      {activeEvent.banners.map((banner, bannerIndex) => (
                        <a
                          key={bannerIndex}
                          href={banner.link}
                          target="_blank"
                          className={getMultiBannerVisibilityStyles(
                            bannerIndex,
                          )}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <img
                            src={banner.image}
                            alt={banner.title}
                            className={MULTI_BANNER_IMG_STYLES}
                          />
                        </a>
                      ))}
                    </div>
                  ) : (
                    <div className={SINGLE_BANNER_WRAPPER_STYLES}>
                      <picture>
                        {activeEvent.banners[0].sources.map((src, srcIndex) => (
                          <source
                            key={srcIndex}
                            media={src.media}
                            srcSet={src.srcSet}
                          />
                        ))}
                        <img
                          src={activeEvent.banners[0].image}
                          alt={activeEvent.banners[0].title}
                          className={SINGLE_BANNER_IMG_STYLES}
                        />
                      </picture>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            )}
          </div>

          {/* Navigation Controls */}
          {displayEvents.length > 1 && (
            <>
              <button onClick={prevSlide} className={NAV_BTN_PREV_STYLES}>
                <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
              </button>
              <button onClick={nextSlide} className={NAV_BTN_NEXT_STYLES}>
                <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            </>
          )}

          {/* Pagination Indicators */}
          <div className={PAGINATION_CONTAINER_STYLES}>
            {displayEvents.map((_, itemIndex) => (
              <button
                key={itemIndex}
                onClick={() => setCurrentIndex(itemIndex)}
                className={getPaginationDotStyles(currentIndex === itemIndex)}
              />
            ))}
          </div>
        </div>

        {/* --- Premium Static Theme CTA Bar --- */}
        <div className={CTA_BAR_CONTAINER_STYLES}>
          {/* Talk to Astrologer Button */}
          <a
            href="https://www.astroved.com/AstrologerScheduler.aspx?id=115&promo=SL_SP_LAC-1"
            target="_blank"
            className={ASTRO_BTN_STYLES}
          >
            <div className={ASTRO_ICON_WRAPPER_STYLES}>
              <PhoneCall
                className="w-8 h-8 lg:w-9 lg:h-9 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] fill-white/20"
                strokeWidth={1.5}
              />
            </div>
            <div className={CTA_TEXT_WRAPPER_STYLES}>
              <span className={CTA_TITLE_STYLES}>Talk to Astrologer</span>
            </div>
            <div className={CTA_ARROW_WRAPPER_STYLES}>
              <ChevronRight className={CTA_ARROW_ICON_ASTRO_STYLES} />
            </div>
          </a>

          {/* Free Kundali Button */}
          <a
            href="/kundali-report/"
            target="_blank"
            className={HOMA_BTN_STYLES}
          >
            <div className={HOMA_ICON_WRAPPER_STYLES}>
              <ScrollText
                className="w-8 h-8 lg:w-9 lg:h-9 text-orange-200 drop-shadow-[0_0_8px_rgba(245,158,11,0.8)] fill-orange-500/30"
                strokeWidth={1.5}
              />
            </div>
            <div className={CTA_TEXT_WRAPPER_STYLES}>
              <span className={CTA_TITLE_STYLES}>Free Kundali</span>
            </div>
            <div className={CTA_ARROW_WRAPPER_STYLES}>
              <ChevronRight className={CTA_ARROW_ICON_HOMA_STYLES} />
            </div>
          </a>
        </div>
      </div>

      {/* --- Infinite Scrolling Banner --- */}
      <div className="w-full bg-[#0b1120] border-t border-b border-white/10 overflow-hidden py-2.5 relative z-20 marquee-container mt-4 md:mt-8">
        <div className="animate-marquee">
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className="flex gap-12 px-6 items-center text-gray-300 text-sm sm:text-base md:text-lg font-medium whitespace-nowrap"
            >
              <span>✦ 25 years of Vedic tradition — Since 2001</span>
              <span>✦ 3 Lakh+ rituals performed in devotees' names</span>
              <span>✦ 200+ Vedic scholars & priests on our team</span>
              <span>✦ 4.8★ from devotees in 50+ countries</span>
              <span>✦ 100% private— your birth details are never shared</span>
              <span>✦ Watch your ritual— video of every ceremony</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
