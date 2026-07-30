import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ScrollText, PhoneCall } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { fetchSpecialEvents } from '../../services/astrovedService';

/**
 * Interface for static upcoming events to be used in the future.
 */
interface StaticEventItem {
  id: number;
  title: string;
  titleColor: string;
  tagline: string;
  taglineColor: string;
  deadline: string;
  deadlineColor: string;
  cta: string;
  buttonBg: string;
  buttonText: string;
  image: string;
  mobileImage: string;
}

/**
 * Interface defining the structure of the fetched event banners.
 */
interface EventBanner {
  title: string;
  image: string;
  tabletImage: string;
  mobileImage: string;
  sources: Array<{ media: string; srcSet: string }>;
  link: string;
  tabletLink: string;
  mobileLink: string;
}

/**
 * Interface defining the structure of the parsed API event items.
 */
interface ApiEventItem {
  id: number;
  isThreeBan: boolean;
  banners: EventBanner[];
  originalData: any;
}

/** --- Shared Tailwind CSS Classes --- */

/* Base Section & Headers */
const SECTION_WRAPPER_STYLES = "pt-2 md:pt-4 pb-3 md:pb-6 relative overflow-hidden transition-colors duration-500 z-10";
const CONTENT_WRAPPER_STYLES = "max-w-[1600px] mx-auto px-4 md:px-8 relative z-10";
const HEADER_CONTAINER_STYLES = "text-center w-full mx-auto mb-6 md:mb-5 lg:mb-3";
const HEADER_SUBTITLE_STYLES = "text-amber-600 dark:text-amber-400 font-sans text-xs md:text-sm uppercase tracking-widest font-bold mb-3";
const HEADER_TITLE_STYLES = "font-serif text-3xl sm:text-4xl md:text-5xl text-midnight dark:text-cream leading-tight font-bold mb-4";
const HEADER_DESC_STYLES = "block font-sans text-gray-500 dark:text-gray-400 text-sm sm:text-base md:text-sm lg:text-base leading-relaxed max-w-2xl mx-auto font-medium px-4 md:px-2 md:mt-1";

/* Carousel Container */
const CAROUSEL_WRAPPER_STYLES = "relative group px-0 touch-pan-y";
const CAROUSEL_BOX_STYLES = "overflow-hidden rounded-[2.5rem] bg-[#FFF5E1] transition-all duration-500 relative grid aspect-[42/52] min-[768px]:aspect-[80/29] min-[992px]:aspect-[160/38]";
const LOADING_CONTAINER_STYLES = "w-full h-full flex items-center justify-center col-start-1 row-start-1 z-20";
const LOADING_CONTENT_STYLES = "flex flex-col items-center gap-3";
const LOADING_TEXT_STYLES = "text-xs font-semibold text-amber-600 dark:text-amber-500 uppercase tracking-widest animate-pulse";

/* Carousel Images */
const MULTI_BANNER_WRAPPER_STYLES = "w-full h-full flex gap-3 md:gap-4 justify-between items-center";
const SINGLE_BANNER_WRAPPER_STYLES = "w-full h-full relative";
const MULTI_BANNER_IMG_STYLES = "w-full h-full object-cover rounded-[1rem] md:rounded-[1.5rem] transition-all duration-500 hover:scale-[1.03] shadow-sm hover:shadow-md";
const SINGLE_BANNER_IMG_STYLES = "w-full h-full object-cover rounded-[1.5rem] md:rounded-[2.5rem] bg-[#FFF5E1] border border-black/5 hover:border-[#facc15]/50 hover:shadow-[0_0_40px_rgba(250,204,21,0.2)] transition-all duration-500 group-hover/card:scale-[1.02]";

/* Navigation & Pagination */
const NAV_BTN_PREV_STYLES = "absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-black/50 border border-white/20 p-2 md:p-3 rounded-full text-white hover:bg-black/80 hover:scale-110 transition-all z-20 backdrop-blur-sm";
const NAV_BTN_NEXT_STYLES = "absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-black/50 border border-white/20 p-2 md:p-3 rounded-full text-white hover:bg-black/80 hover:scale-110 transition-all z-20 backdrop-blur-sm";
const PAGINATION_CONTAINER_STYLES = "absolute bottom-4 md:bottom-8 left-0 right-0 flex justify-center gap-2 z-20 pointer-events-none";

/* Static CTA Buttons */
const CTA_BAR_CONTAINER_STYLES = "w-full flex flex-col md:flex-row justify-center items-center gap-4 sm:gap-6 md:gap-8 lg:gap-8 mt-4 sm:mt-5 lg:mt-3 mb-2 lg:mb-0 px-2 sm:px-6 md:px-10 lg:px-8 relative z-30";
const ASTRO_BTN_STYLES = "relative flex items-center justify-center rounded-full bg-gradient-to-r from-[#20033b] via-[#3a0c6a] to-[#510e8d] hover:to-[#5c0fa0] transition-all duration-300 shadow-[0_10px_30px_rgba(58,12,106,0.3)] hover:shadow-[0_10px_35px_rgba(176,82,255,0.5)] border-[2px] border-amber-400 hover:scale-[1.03] w-full max-w-[300px] sm:max-w-[340px] md:max-w-[360px] lg:max-w-[380px] h-[64px] sm:h-[72px] lg:h-[76px] group ml-5 sm:ml-6 md:ml-8 lg:ml-0 cursor-pointer";
const ASTRO_ICON_WRAPPER_STYLES = "absolute left-[-20px] sm:left-[-24px] top-1/2 -translate-y-1/2 w-[64px] h-[64px] sm:w-[72px] sm:h-[72px] lg:w-[76px] lg:h-[76px] rounded-full border-[2.5px] border-amber-400 bg-gradient-to-b from-[#2a0854] to-[#120224] flex items-center justify-center shadow-lg z-20 group-hover:scale-105 transition-transform duration-300";
const HOMA_BTN_STYLES = "relative flex items-center justify-center rounded-full bg-gradient-to-r from-[#983800] via-[#c65104] to-[#ea6b06] hover:to-[#f2740d] transition-all duration-300 shadow-[0_10px_30px_rgba(198,81,4,0.3)] hover:shadow-[0_10px_35px_rgba(245,158,11,0.5)] border-[2px] border-amber-400 hover:scale-[1.03] w-full max-w-[300px] sm:max-w-[340px] md:max-w-[360px] lg:max-w-[380px] h-[64px] sm:h-[72px] lg:h-[76px] group ml-5 sm:ml-6 md:ml-8 lg:ml-0 cursor-pointer";
const HOMA_ICON_WRAPPER_STYLES = "absolute left-[-20px] sm:left-[-24px] top-1/2 -translate-y-1/2 w-[64px] h-[64px] sm:w-[72px] sm:h-[72px] lg:w-[76px] lg:h-[76px] rounded-full border-[2.5px] border-amber-400 bg-gradient-to-b from-[#8f3a00] to-[#3a1500] flex items-center justify-center shadow-lg z-20 group-hover:scale-105 transition-transform duration-300";
const CTA_TEXT_WRAPPER_STYLES = "z-10 text-center w-full px-14 sm:px-16";
const CTA_TITLE_STYLES = "font-serif text-white text-[17px] sm:text-[19px] lg:text-[22px] font-bold tracking-wide drop-shadow-md leading-tight whitespace-nowrap";
const CTA_ARROW_WRAPPER_STYLES = "absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-full bg-white flex items-center justify-center shadow-md z-10 group-hover:translate-x-1 transition-transform duration-300 shrink-0";
const CTA_ARROW_ICON_ASTRO_STYLES = "w-4 h-4 sm:w-5 sm:h-5 lg:w-5 lg:h-5 text-purple-800 stroke-[2.5]";
const CTA_ARROW_ICON_HOMA_STYLES = "w-4 h-4 sm:w-5 sm:h-5 lg:w-5 lg:h-5 text-orange-800 stroke-[2.5]";

/**
 * Returns dynamic visibility classes for multi-banner arrays.
 * @param index - Index of the banner in the array.
 */
const getMultiBannerVisibilityStyles = (index: number): string => {
  return `flex-1 ${index === 1 ? 'hidden md:block' : index === 2 ? 'hidden lg:block' : 'block'}`;
};

/**
 * Returns dynamic pagination dot styles based on active state.
 * @param isActive - Whether the dot represents the current slide.
 */
const getPaginationDotStyles = (isActive: boolean): string => {
  return `h-1.5 rounded-full transition-all duration-300 pointer-events-auto ${isActive ? 'bg-amber-400 w-6' : 'bg-white/30 hover:bg-white/50 w-1.5'}`;
};

const preloadImages = async (events: ApiEventItem[]) => {
  const promises = events.flatMap((event) =>
    event.banners.flatMap((banner) => {
      const images = [banner.image];

      if (banner.tabletImage) {
        images.push(banner.tabletImage);
      }
      if (banner.mobileImage) {
        images.push(banner.mobileImage);
      }

      return images.map(
        (src) =>
          new Promise<void>((resolve) => {
            const img = new Image();

            img.onload = () => resolve();
            img.onerror = () => resolve();

            img.src = src;
          })
      );
    })
  );

  await Promise.all(promises);
};

/**
 * SpecialEvents Component
 * 
 * Fetches dynamic events from an external API and renders them in an interactive carousel,
 * alongside static premium CTA buttons.
 */
export function SpecialEvents() {
  const [displayEvents, setDisplayEvents] = useState<ApiEventItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  /**
   * Fetches event carousel HTML from the WordPress API, parses it using DOMParser,
   * and normalizes the data into state-friendly objects.
   */
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        const data = await fetchSpecialEvents();

        if (Array.isArray(data) && data.length > 0 && data[0].desktop_content) {
          const parser = new DOMParser();
          const doc = parser.parseFromString(data[0].desktop_content, 'text/html');
          const tabletDoc = data[0].tablet_content ? parser.parseFromString(data[0].tablet_content, 'text/html') : null;
          const mobileDoc = data[0].mobile_content ? parser.parseFromString(data[0].mobile_content, 'text/html') : null;

          const carouselItems = doc.querySelectorAll('.carousel-item');
          const tabletCarouselItems = tabletDoc ? tabletDoc.querySelectorAll('.carousel-item') : [];
          const mobileCarouselItems = mobileDoc ? mobileDoc.querySelectorAll('.carousel-item') : [];

          if (carouselItems.length > 0) {
            const parsedEvents = Array.from(carouselItems).map((item, index) => {
              const tabletItem = tabletCarouselItems[index];
              const mobileItem = mobileCarouselItems[index];
              
              const threeBanContainer = item.querySelector('.three-ban');
              const tabletThreeBanContainer = tabletItem ? tabletItem.querySelector('.three-ban') : null;
              const mobileThreeBanContainer = mobileItem ? mobileItem.querySelector('.three-ban') : null;

              if (threeBanContainer) {
                const anchors = threeBanContainer.querySelectorAll('a');
                const tabletAnchors = tabletThreeBanContainer ? tabletThreeBanContainer.querySelectorAll('a') : [];
                const mobileAnchors = mobileThreeBanContainer ? mobileThreeBanContainer.querySelectorAll('a') : [];

                const banners = Array.from(anchors).map((anchor, bIndex) => {
                  const tabletAnchor = tabletAnchors[bIndex];
                  const mobileAnchor = mobileAnchors[bIndex];
                  
                  const img = anchor.querySelector('img');
                  const tabletImg = tabletAnchor ? tabletAnchor.querySelector('img') : null;
                  const mobileImg = mobileAnchor ? mobileAnchor.querySelector('img') : null;
                  
                  const title = img ? (img.getAttribute('alt') || img.getAttribute('title') || 'Special Event') : 'Special Event';
                  const image = img ? img.getAttribute('src') || '' : '';
                  const tabletImage = tabletImg ? tabletImg.getAttribute('src') || image : image;
                  const mobileImage = mobileImg ? mobileImg.getAttribute('src') || image : image;
                  
                  const link = anchor.getAttribute('href') || '';
                  const tabletLink = tabletAnchor ? tabletAnchor.getAttribute('href') || link : link;
                  const mobileLink = mobileAnchor ? mobileAnchor.getAttribute('href') || link : link;

                  return {
                    title,
                    image,
                    tabletImage,
                    mobileImage,
                    sources: [],
                    link,
                    tabletLink,
                    mobileLink,
                  };
                });

                return {
                  id: index + 1,
                  isThreeBan: true,
                  banners,
                  originalData: null
                };
              } else {
                const img = item.querySelector('img');
                const anchor = item.querySelector('a');
                const picture = item.querySelector('picture');

                const tabletAnchor = tabletItem ? tabletItem.querySelector('a') : null;
                const tabletImg = tabletItem ? tabletItem.querySelector('img') : null;
                const mobileAnchor = mobileItem ? mobileItem.querySelector('a') : null;
                const mobileImg = mobileItem ? mobileItem.querySelector('img') : null;

                let sources: Array<{ media: string; srcSet: string }> = [];
                if (picture) {
                  const sourceElements = picture.querySelectorAll('source');
                  sourceElements.forEach(src => {
                    sources.push({
                      media: src.getAttribute('media') || '',
                      srcSet: src.getAttribute('srcset') || ''
                    });
                  });
                } else {
                  // Fallback if no picture tag
                  const source = item.querySelector('picture source');
                  if (source && source.getAttribute('srcset')) {
                    sources.push({
                      media: '(max-width: 767px)',
                      srcSet: source.getAttribute('srcset') || ''
                    });
                  }
                }

                const title = img ? (img.getAttribute('alt') || img.getAttribute('title') || 'Special Event') : 'Special Event';
                const image = img ? img.getAttribute('src') || '' : '';

                let tabletImage = image;
                if (tabletImg) {
                  tabletImage = tabletImg.getAttribute('src') || image;
                }
                
                let mobileImage = image;
                if (mobileImg) {
                  mobileImage = mobileImg.getAttribute('src') || image;
                } else if (sources.length > 0) {
                  mobileImage = sources[0].srcSet;
                }

                const link = anchor ? anchor.getAttribute('href') || '' : '';
                const tabletLink = tabletAnchor ? tabletAnchor.getAttribute('href') || link : link;
                const mobileLink = mobileAnchor ? mobileAnchor.getAttribute('href') || link : link;

                return {
                  id: index + 1,
                  isThreeBan: false,
                  banners: [
                    {
                      title,
                      image,
                      tabletImage,
                      mobileImage,
                      sources,
                      link,
                      tabletLink,
                      mobileLink,
                    }
                  ],
                  originalData: null
                };
              }
            });

            await preloadImages(parsedEvents);
            setDisplayEvents(parsedEvents);
            setCurrentIndex(0);
            setIsLoading(false);
          } else {
            setIsLoading(false);
          }
        } else {
          setIsLoading(false);
        }
      } catch (err: any) {
        console.error('Error fetching special events:', err);
        setError(err.message || 'Failed to fetch');
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  /**
   * Swipe gesture start logic.
   */
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  /**
   * Swipe gesture move logic.
   */
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  /**
   * Swipe gesture end logic, determining slide direction.
   */
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) nextSlide();
    if (distance < -50) prevSlide();
  };

  /**
   * Advances the carousel to the next slide.
   */
  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === displayEvents.length - 1 ? 0 : prev + 1));
  };

  /**
   * Reverses the carousel to the previous slide.
   */
  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? displayEvents.length - 1 : prev - 1));
  };

  /**
   * Auto-scroll timer.
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      nextSlide();
    }, 5000);
    return () => clearTimeout(timer);
  }, [displayEvents, currentIndex]);

  // Image preloading is now handled in fetchEvents

  const ready = !isLoading && displayEvents.length > 0;

  return (
    <section id="special-events" className={SECTION_WRAPPER_STYLES}>
      <div className={CONTENT_WRAPPER_STYLES} >

        {/* --- Header --- */}
        {/* <div className={HEADER_CONTAINER_STYLES}> */}
        {/* <p className={HEADER_SUBTITLE_STYLES}>
            LIVE THIS WEEK
          </p> */}
        {/* <h2 className={HEADER_TITLE_STYLES}>
            Current Divine Powertimes & <em className="text-amber-600 dark:text-amber-400 italic font-bold">Special Events.</em>
          </h2>
          <p className={HEADER_DESC_STYLES} style={{ maxWidth: '100%' }}>
            Explore current AstroVed programs timed to sacred dates, deity blessings, temple traditions, and remedy windows.
          </p>
        </div> */}

        {/* --- Carousel Container --- */}
        <div
          className={CAROUSEL_WRAPPER_STYLES}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className={CAROUSEL_BOX_STYLES}>
            {!ready ? (
              /* Loading Indicator */
              <div className={LOADING_CONTAINER_STYLES}>
                <div className={LOADING_CONTENT_STYLES}>
                  <svg className="animate-spin h-8 w-8 text-amber-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span className={LOADING_TEXT_STYLES}>Loading Events...</span>
                </div>
              </div>
            ) : (
              <>

                {/* Animated Carousel Slides */}
                <AnimatePresence initial={false} custom={direction}>
                  {displayEvents.length > 0 && (
                    <motion.div
                      key={currentIndex}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.02 }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                      className="w-full h-full cursor-pointer flex flex-col items-center justify-center col-start-1 row-start-1"
                      onClick={() => {
                        if (!displayEvents[currentIndex].isThreeBan) {
                          const banner = displayEvents[currentIndex].banners[0];
                          const getLink = () => {
                            if (typeof window === 'undefined') return banner?.link;
                            if (window.innerWidth <= 767) return banner?.mobileLink || banner?.link;
                            if (window.innerWidth <= 1024) return banner?.tabletLink || banner?.link;
                            return banner?.link;
                          };
                          const link = getLink();
                          if (link) {
                            window.open(link, '_blank', 'noopener,noreferrer');
                          }
                        }
                      }}
                    >
                      {displayEvents[currentIndex].isThreeBan ? (
                        <div className={MULTI_BANNER_WRAPPER_STYLES}>
                          {displayEvents[currentIndex].banners.map((banner, bannerIndex) => {
                            const getLink = () => {
                              if (typeof window === 'undefined') return banner.link;
                              if (window.innerWidth <= 767) return banner.mobileLink || banner.link;
                              if (window.innerWidth <= 1024) return banner.tabletLink || banner.link;
                              return banner.link;
                            };
                            return (
                            <a
                              key={bannerIndex}
                              href={getLink()}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={getMultiBannerVisibilityStyles(bannerIndex)}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <picture>
                                <source media="(max-width: 767px)" srcSet={banner.mobileImage} />
                                <source media="(min-width: 768px) and (max-width: 1024px)" srcSet={banner.tabletImage} />
                                <img
                                  src={banner.image}
                                  alt={banner.title}
                                  className={MULTI_BANNER_IMG_STYLES}
                                />
                              </picture>
                            </a>
                            );
                          })}
                        </div>
                      ) : (
                        <div className={SINGLE_BANNER_WRAPPER_STYLES}>
                          <picture>
                            <source media="(max-width: 767px)" srcSet={displayEvents[currentIndex].banners[0].mobileImage} />
                            <source media="(min-width: 768px) and (max-width: 1024px)" srcSet={displayEvents[currentIndex].banners[0].tabletImage} />
                            {displayEvents[currentIndex].banners[0].sources.map((src, srcIndex) => (
                              <source key={srcIndex} media={src.media} srcSet={src.srcSet} />
                            ))}
                            <img
                              src={displayEvents[currentIndex].banners[0].image}
                              alt={displayEvents[currentIndex].banners[0].title}
                              className={SINGLE_BANNER_IMG_STYLES}
                            />
                          </picture>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            )}
          </div>

          {/* Navigation Controls */}
          <button
            onClick={prevSlide}
            className={NAV_BTN_PREV_STYLES}
          >
            <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
          </button>
          <button
            onClick={nextSlide}
            className={NAV_BTN_NEXT_STYLES}
          >
            <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
          </button>

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
          <a href="https://www.astroved.com/AstrologerScheduler.aspx?id=115&promo=SL_SP_LAC-1" target="_blank" rel="noopener noreferrer" className={ASTRO_BTN_STYLES}>
            <div className={ASTRO_ICON_WRAPPER_STYLES}>
              <PhoneCall className="w-8 h-8 lg:w-9 lg:h-9 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] fill-white/20" strokeWidth={1.5} />
            </div>
            <div className={CTA_TEXT_WRAPPER_STYLES}>
              <span className={CTA_TITLE_STYLES}>
                Talk to Astrologer
              </span>
            </div>
            <div className={CTA_ARROW_WRAPPER_STYLES}>
              <ChevronRight className={CTA_ARROW_ICON_ASTRO_STYLES} />
            </div>
          </a>

          {/* Free Kundali Button */}
          <a href="/kundali-report/" target="_blank" rel="noopener noreferrer" className={HOMA_BTN_STYLES}>
            <div className={HOMA_ICON_WRAPPER_STYLES}>
              <ScrollText className="w-8 h-8 lg:w-9 lg:h-9 text-orange-200 drop-shadow-[0_0_8px_rgba(245,158,11,0.8)] fill-orange-500/30" strokeWidth={1.5} />
            </div>
            <div className={CTA_TEXT_WRAPPER_STYLES}>
              <span className={CTA_TITLE_STYLES}>
                Free Kundali
              </span>
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
            <div key={i} className="flex gap-12 px-6 items-center text-gray-300 text-sm sm:text-base md:text-lg font-medium whitespace-nowrap">
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