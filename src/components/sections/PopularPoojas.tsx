import { useCallback, useEffect, useState, useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import {
  ChevronLeft, ChevronRight, ArrowRight, CheckCircle2
} from 'lucide-react';
import axios from 'axios';

const getCurrencySymbol = (code: string) => {
  if (code === 'INR') return '₹';
  if (code === 'USD') return 'US $';
  if (code === 'MYR') return 'MYR';
  return code + ' ';
};

export function PopularPoojas() {
  const [currentCurrency, setCurrentCurrency] = useState("INR");
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
  const [jsonData, setJsonData] = useState([]);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const [arrowTop, setArrowTop] = useState(128); // Default top fallback

  const updateArrowPosition = useCallback(() => {
    if (imageWrapperRef.current) {
      setArrowTop(imageWrapperRef.current.offsetHeight / 2);
    }
  }, []);

  useEffect(() => {
    // Small timeout ensures the DOM has rendered the new layout and aspect-ratio before calculating
    const timeout = setTimeout(updateArrowPosition, 100);
    window.addEventListener('resize', updateArrowPosition);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener('resize', updateArrowPosition);
    };
  }, [updateArrowPosition, jsonData]);
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

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith('currentcurrency=')) {
          let val = cookie.substring('currentcurrency='.length);
          // Remove potential quotes around the value
          if (val.startsWith('"') && val.endsWith('"')) {
            val = val.slice(1, -1);
          }
          setCurrentCurrency(val);
          break;
        }
      }
    }
  }, []);

  useEffect(() => {
    const getPoojaAndHomaList = async () => {
      await axios.get('https://qa.astroved.com/json/Poojas&Homas.json').then((res) => {
        setJsonData(res.data)
      })
    }
    getPoojaAndHomaList();
  }, []);

  return (
    <section>
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">

        {/* Header */}
        <div className="text-center mb-4 max-w-3xl mx-auto">
          <p className="text-amber-600 dark:text-amber-400 font-sans text-xs md:text-sm uppercase tracking-widest font-bold mb-3">
            Experience the power of ancient vedic rituals
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-tight font-bold mb-2">
            <span className="text-midnight dark:text-cream">Authentic Poojas </span>
            <span className="text-amber-600 dark:text-amber-400 italic">& Homas</span>
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative group/carousel">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-4 py-4">
              {jsonData?.map((item: any, index: number) => {
                const priceObj = item.ProductPriceList?.find((p: any) => p.CurrencyCode === currentCurrency) || item.ProductPriceList?.[0];
                const currencySymbol = priceObj ? getCurrencySymbol(priceObj.CurrencyCode) : '';
                const listPrice = priceObj?.ListPrice;
                const sellingPrice = priceObj?.SellingPrice;

                return (
                  <div key={item.ProductId} className="pl-4 min-w-[260px] sm:min-w-[280px] md:min-w-[300px] lg:min-w-[280px] xl:min-w-[300px] max-w-[320px] flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_20%]">
                    <div className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-200 dark:border-slate-700 transition-all duration-300 flex flex-col h-full transform lg:hover:-translate-y-1 group">

                      {/* Padded Image Wrapper */}
                      <div className="p-3 pb-0 relative" ref={index === 0 ? imageWrapperRef : null}>
                        <div className="relative rounded-xl overflow-hidden bg-slate-100">
                          <img
                            src={item.image}
                            // src={item.image?.startsWith('http') ? item.image : `https://qa.astroved.com${item.image}`}
                            alt={item.title}
                            className="w-full aspect-[4/3] object-cover transform group-hover:scale-105 transition-transform duration-700"
                            loading="lazy"
                          />
                          {/* Subtle dark gradient overlay for text legibility */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60"></div>

                          {/* Overlay Badge */}
                          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur dark:bg-slate-800/95 text-[#D65324] text-[10px] font-bold px-4 py-1.5 rounded-full shadow-sm text-center whitespace-nowrap">
                            {item.badge}
                          </div>
                        </div>
                      </div>

                      <div className="p-5 flex flex-col flex-grow">
                        <h3 className="font-serif text-[18px] font-bold text-[#2d2d2d] dark:text-white mb-4 leading-snug">
                          {item.title}
                        </h3>

                        <p className="font-sans text-[14px] text-gray-500 dark:text-gray-400 mb-3 leading-relaxed">
                          {item.description}
                        </p>

                        {/* Details Rows */}
                        <div className="mt-auto space-y-3 mb-5">
                          {item.benefitsList?.map((benefit: string, index: number) => (
                            <div key={index} className="flex items-start text-[13px] text-gray-500 dark:text-gray-400 font-medium">
                              <CheckCircle2 className="w-4 h-4 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                              <span className="leading-tight">{benefit}</span>
                            </div>
                          ))}
                        </div>

                        {/* Price Section */}
                        <div className="flex items-center justify-between mb-4 border-t border-gray-100 dark:border-slate-700/50 pt-4">
                          <span className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Starts From</span>
                          <div className="flex items-baseline gap-1.5 ml-2 whitespace-nowrap">
                            {listPrice !== sellingPrice && listPrice != null && (
                              <span className="text-xs font-medium text-gray-400 line-through">
                                {currencySymbol} {listPrice}
                              </span>
                            )}
                            <span className="text-lg font-bold text-[#D65324] dark:text-amber-500 leading-none">
                              {currencySymbol} {sellingPrice}
                            </span>
                          </div>
                        </div>

                        {/* Full Width Orange Button */}
                        <a href={item.button.link}>
                          <button className="w-full py-3.5 bg-amber-600 hover:bg-amber-500 text-white text-[13px] font-bold rounded-xl transition-colors flex items-center justify-center group/btn shadow-md shadow-[#D65324]/20 uppercase tracking-wider">
                            {item.button.text}
                            <ArrowRight className="w-4 h-4 ml-2 transform group-hover/btn:translate-x-1 transition-transform" />
                          </button>
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={scrollPrev}
            disabled={!prevBtnEnabled}
            className="flex absolute top-[115px] md:top-[120px] lg:top-[125px] xl:top-[135px] left-1 md:-left-4 lg:-left-6 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-white/90 backdrop-blur dark:bg-slate-800/90 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.15)] items-center justify-center text-[#D65324] hover:bg-white dark:hover:bg-slate-700 transition-all z-10 disabled:opacity-50 disabled:cursor-not-allowed border border-gray-100 dark:border-slate-700"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 lg:w-7 lg:h-7" />
          </button>
          <button
            onClick={scrollNext}
            disabled={!nextBtnEnabled}
            className="flex absolute top-[115px] md:top-[120px] lg:top-[125px] xl:top-[135px] right-1 md:-right-4 lg:-right-6 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-white/90 backdrop-blur dark:bg-slate-800/90 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.15)] items-center justify-center text-[#D65324] hover:bg-white dark:hover:bg-slate-700 transition-all z-10 disabled:opacity-50 disabled:cursor-not-allowed border border-gray-100 dark:border-slate-700"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 lg:w-7 lg:h-7" />
          </button>
        </div>

        {/* View All Button */}
        <div className="flex justify-center mb-4 mt-4 md:mt-6">
          <a
            href="/pooja-c11.aspx"
            className="inline-flex items-center justify-center px-8 md:px-10 py-2.5 md:py-3 bg-transparent border-[2px] border-orange-500 text-orange-500 hover:bg-orange-600 hover:text-white dark:hover:bg-orange-500 dark:hover:text-white text-[13px] md:text-[14px] font-bold rounded-xl transition-colors duration-300 group/btn uppercase tracking-widest"
          >
            <span className="text-center">EXPLORE ALL POOJAS & HOMAS</span>
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2 shrink-0 transform group-hover/btn:translate-x-1.5 transition-transform" />
          </a>
        </div>

      </div>
    </section >
  );
}
