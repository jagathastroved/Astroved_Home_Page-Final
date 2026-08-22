import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { 
  ChevronLeft, ChevronRight, ArrowRight, Shield, Flame, Star, Droplets, Activity, Sword, Sun, Wind, Globe, Heart, ShieldCheck, UserCheck, Lock, HeadphonesIcon 
} from 'lucide-react';

import { 
  img_birth_star,
  img_ashtalakshmi,
  img_vaidhyanatha,
  img_muruga,
  img_ketu,
  img_durga,
  vedic_fire_lab,
  cosmic_planetary_blessing,
  sacred_shiva_pooja
} from '../../assets/Auspicious_portal';

const HOMA_POOJA_ITEMS = [
  { id: 1, title: 'Birth Star Pooja', description: 'Align your birth star for harmony and a prosperous life.', image: img_birth_star, Icon: Star, f1: 'Nakshatra Shanti', f2: 'Customized for your chart' },
  { id: 2, title: 'Ashtalakshmi Pooja', description: 'Invoke the blessings of the eight forms of wealth and abundance.', image: img_ashtalakshmi, Icon: Droplets, f1: 'Attract Wealth & Prosperity', f2: '8 Forms of Divine Blessings' },
  { id: 3, title: 'Vaidhyanatha Pooja', description: 'Seek divine protection and relief from health challenges.', image: img_vaidhyanatha, Icon: Shield, f1: 'Health & Healing', f2: 'Divine Protection' },
  { id: 4, title: 'Muruga Pooja', description: 'Overcome obstacles and achieve success in all your endeavors.', image: img_muruga, Icon: Flame, f1: 'Overcome Obstacles', f2: 'Victory & Success' },
  { id: 5, title: 'Ketu Pooja', description: 'Remove past karma and bring clarity and spiritual growth.', image: img_ketu, Icon: Activity, f1: 'Karmic Cleansing', f2: 'Spiritual Enlightenment' },
  { id: 6, title: 'Durga Pooja', description: 'Harness the divine power for protection and strength.', image: img_durga, Icon: Sword, f1: 'Divine Protection', f2: 'Courage & Strength' },
  { id: 7, title: 'Mercury Fire Lab', description: 'Enhance intellect, communication and professional growth.', image: vedic_fire_lab, Icon: Wind, f1: 'Career Growth', f2: 'Improved Communication' },
  { id: 8, title: 'Jupiter Fire Lab', description: 'Attract wisdom, prosperity and spiritual blessings.', image: cosmic_planetary_blessing, Icon: Globe, f1: 'Wisdom & Knowledge', f2: 'Financial Prosperity' },
  { id: 9, title: 'Venus Fire Lab', description: 'Invite love, harmony and happiness in relationships.', image: vedic_fire_lab, Icon: Flame, f1: 'Relationship Harmony', f2: 'Attract Love' },
  { id: 10, title: 'Saturn Fire Lab', description: 'Reduce obstacles and bring stability in life.', image: cosmic_planetary_blessing, Icon: Sun, f1: 'Overcome Delays', f2: 'Life Stability' },
  { id: 11, title: 'Kalyana Pooja', description: 'Blessings for a happy married life and strong relationships.', image: sacred_shiva_pooja, Icon: Heart, f1: 'Marital Bliss', f2: 'Find Ideal Partner' },
];

export function PopularRituals() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: 'start',
      loop: false, // Don't loop, so it stops at the end
      skipSnaps: false,
      dragFree: false, // Set to false so it snaps perfectly to the card
    },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  );

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section>
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <p className="text-[#D65324] dark:text-amber-500 text-sm md:text-[13px] font-bold tracking-widest uppercase mb-3">
            Experience the power of ancient vedic rituals
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-black dark:text-white leading-tight font-bold">
            Popular Poojas <span className="text-[#D65324] dark:text-amber-500">&amp; Homas</span>
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative group/carousel">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-4 py-4">
              {HOMA_POOJA_ITEMS.map((item) => (
                <div key={item.id} className="pl-4 min-w-[260px] sm:min-w-[280px] md:min-w-[300px] lg:min-w-[280px] xl:min-w-[300px] max-w-[320px] flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_20%]">
                  <div className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 dark:border-slate-700 transition-all duration-300 flex flex-col h-full transform lg:hover:-translate-y-1 group">
                    
                    {/* Padded Image Wrapper */}
                    <div className="p-3 pb-0 relative">
                      <div className="relative h-[180px] rounded-xl overflow-hidden bg-slate-100">
                        <img 
                          src={item.image} 
                          alt={item.title}
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
                          loading="lazy"
                        />
                        {/* Subtle dark gradient overlay for text legibility */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60"></div>
                        
                        {/* Overlay Badge */}
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur dark:bg-slate-800/95 text-[#D65324] text-[10px] font-bold px-4 py-1.5 rounded-full shadow-sm text-center whitespace-nowrap">
                          {item.title.split(' ')[0]} Special
                        </div>
                      </div>
                    </div>

                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="font-serif text-[18px] font-bold text-[#2d2d2d] dark:text-white mb-2 leading-snug line-clamp-2">
                        {item.title}
                      </h3>
                      
                      <p className="font-sans text-[14px] text-gray-500 dark:text-gray-400 mb-5 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>

                      {/* Details Rows */}
                      <div className="mt-auto space-y-3 mb-6">
                        <div className="flex items-start text-[13px] text-gray-500 dark:text-gray-400 font-medium">
                          <ShieldCheck className="w-4 h-4 mr-2 text-amber-500 flex-shrink-0 mt-0.5" />
                          <span className="leading-tight">{item.f1}</span>
                        </div>
                        <div className="flex items-start text-[13px] text-gray-500 dark:text-gray-400 font-medium">
                          <UserCheck className="w-4 h-4 mr-2 text-amber-500 flex-shrink-0 mt-0.5" />
                          <span className="leading-tight">{item.f2}</span>
                        </div>
                      </div>

                      {/* Full Width Orange Button */}
                      <button className="w-full py-3.5 bg-[#D65324] hover:bg-[#b0401b] text-white text-[13px] font-bold rounded-xl transition-colors flex items-center justify-center group/btn shadow-md shadow-[#D65324]/20 uppercase tracking-wider">
                        PARTICIPATE
                        <ArrowRight className="w-4 h-4 ml-2 transform group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Explore All Rituals Card */}
              <div className="pl-4 min-w-[260px] sm:min-w-[280px] md:min-w-[300px] lg:min-w-[280px] xl:min-w-[300px] max-w-[320px] flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_20%]">
                <div className="bg-amber-50/50 dark:bg-slate-800 rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-amber-200/50 dark:border-slate-700 transition-all duration-300 flex flex-col h-full transform lg:hover:-translate-y-1 group p-6 justify-center items-center text-center">
                  <div className="w-16 h-16 bg-white dark:bg-slate-700 rounded-full flex items-center justify-center shadow-md text-[#D65324] mb-6">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
                      <path d="M12 2C12 2 12.5 7.5 17 9.5C12.5 11.5 12 17 12 17C12 17 11.5 11.5 7 9.5C11.5 7.5 12 2 12 2Z" fill="currentColor"/>
                    </svg>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#2d2d2d] dark:text-white mb-3">
                    Explore All Rituals
                  </h3>
                  <p className="font-sans text-[13px] text-gray-500 dark:text-gray-400 mb-8 px-4">
                    Discover more poojas and homas for every need and occasion.
                  </p>
                  <a 
                    href="/all-poojas"
                    className="w-full py-3.5 bg-white dark:bg-slate-800 border-2 border-[#D65324] text-[#D65324] hover:bg-[#D65324] hover:text-white dark:hover:bg-[#D65324] dark:hover:text-white text-[13px] font-bold rounded-xl transition-colors flex items-center justify-center group/btn uppercase tracking-wider"
                  >
                    VIEW ALL
                    <ArrowRight className="w-4 h-4 ml-1.5 transform group-hover/btn:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>

            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={scrollPrev}
            disabled={!prevBtnEnabled}
            className="flex absolute top-[102px] left-1 md:-left-4 lg:-left-6 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-white/90 backdrop-blur dark:bg-slate-800/90 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.15)] items-center justify-center text-[#D65324] hover:bg-white dark:hover:bg-slate-700 transition-all z-10 disabled:opacity-0 disabled:cursor-not-allowed border border-gray-100 dark:border-slate-700"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 lg:w-7 lg:h-7" />
          </button>
          <button
            onClick={scrollNext}
            disabled={!nextBtnEnabled}
            className="flex absolute top-[102px] right-1 md:-right-4 lg:-right-6 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-white/90 backdrop-blur dark:bg-slate-800/90 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.15)] items-center justify-center text-[#D65324] hover:bg-white dark:hover:bg-slate-700 transition-all z-10 disabled:opacity-0 disabled:cursor-not-allowed border border-gray-100 dark:border-slate-700"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 lg:w-7 lg:h-7" />
          </button>
        </div>

        {/* Bottom Features Banner */}
        <div className="mt-8 md:mt-12 bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-slate-700">
          <div className="flex flex-col sm:flex-row sm:flex-wrap sm:justify-center lg:justify-between items-start sm:items-center gap-y-4 gap-x-6 lg:gap-2 px-2 sm:px-1 max-w-fit sm:max-w-none mx-auto">
            
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <ShieldCheck className="w-4 h-4 md:w-5 md:h-5 text-amber-600" />
              <span className="font-serif text-[12px] md:text-[15px] font-semibold whitespace-nowrap">Authentic Vedic Rituals</span>
            </div>
            
            <div className="hidden lg:block w-px h-6 bg-gray-200 dark:bg-slate-700"></div>
            
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <UserCheck className="w-4 h-4 md:w-5 md:h-5 text-amber-600" />
              <span className="font-serif text-[12px] md:text-[15px] font-semibold whitespace-nowrap">Experienced Priests</span>
            </div>

            <div className="hidden lg:block w-px h-6 bg-gray-200 dark:bg-slate-700"></div>
            
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 md:w-5 md:h-5 text-amber-600">
                <path d="M12 2C12 2 12.5 7.5 17 9.5C12.5 11.5 12 17 12 17C12 17 11.5 11.5 7 9.5C11.5 7.5 12 2 12 2Z" fill="currentColor"/>
              </svg>
              <span className="font-serif text-[12px] md:text-[15px] font-semibold whitespace-nowrap">Personalized Poojas</span>
            </div>

            <div className="hidden lg:block w-px h-6 bg-gray-200 dark:bg-slate-700"></div>
            
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <Lock className="w-4 h-4 md:w-5 md:h-5 text-amber-600" />
              <span className="font-serif text-[12px] md:text-[15px] font-semibold whitespace-nowrap">Secure &amp; Easy Booking</span>
            </div>

            <div className="hidden lg:block w-px h-6 bg-gray-200 dark:bg-slate-700"></div>
            
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <HeadphonesIcon className="w-4 h-4 md:w-5 md:h-5 text-amber-600" />
              <span className="font-serif text-[12px] md:text-[15px] font-semibold whitespace-nowrap">24/7 Support</span>
            </div>
            
          </div>
        </div>

      </div>
    </section>
  );
}
