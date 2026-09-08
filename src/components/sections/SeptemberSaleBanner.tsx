import { ArrowRight, CalendarDays } from 'lucide-react';
import bannerBgImage from '../../assets/Banner_image/sep_sale_banner.jpg';

export function SeptemberSaleBanner() {

  return (
    <section className="w-full flex justify-center p-2 md:p-4 font-sans">
      <div className="w-full max-w-[1200px] relative shadow-[0_4px_25px_rgba(0,0,0,0.06)] flex flex-col md:flex-row bg-[#f4ebd9] rounded-xl md:rounded-2xl border border-gray-200/80 group/banner overflow-hidden">

        {/* Left Section - Contains the image */}
        <div className="w-full md:w-[50%] h-[180px] sm:h-[240px] md:h-[280px] lg:h-[320px] xl:h-auto relative z-10 shrink-0">

          {/* Image Wrapper (overflow-hidden prevents scaling spill-over) */}
          <div className="absolute inset-0 rounded-t-xl md:rounded-l-xl md:rounded-tr-none overflow-hidden">
            {/* Background Image (Left side only) */}
            <div
              className="absolute inset-0 bg-cover bg-left bg-no-repeat transition-transform duration-1000 scale-100 origin-left group-hover/banner:scale-105"
              style={{ backgroundImage: `url(${bannerBgImage})` }}
            ></div>

            {/* Gradient Overlays for smooth blending into the content background */}
            <div className="hidden md:block absolute inset-y-0 right-0 w-1/3 bg-gradient-to-r from-transparent to-[#f4ebd9] z-10 pointer-events-none"></div>
            <div className="block md:hidden absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent to-[#f4ebd9] z-10 pointer-events-none"></div>
          </div>

          {/* Modern Premium Floating Offer Badge */}
          <div className="absolute z-30 group/badge 
                          bottom-3 right-3 
                          md:top-1/2 md:-translate-y-1/2 md:right-[13px] lg:right-[20px] md:bottom-auto">
            {/* Outer Glowing Blur */}
            <div className="absolute -inset-1.5 md:-inset-2 bg-[#ea580c] rounded-full blur-md md:blur-lg opacity-40 group-hover/badge:opacity-60 transition-opacity duration-500 animate-pulse"></div>

            {/* Main Badge Container (Reduced Size) */}
            <div className="relative flex flex-col items-center justify-center w-[70px] h-[70px] md:w-[90px] md:h-[90px] rounded-full bg-[#ea580c] shadow-[0_12px_30px_rgba(234,88,12,0.4)] border border-white/30 transform group-hover/badge:scale-110 group-hover/badge:rotate-3 transition-all duration-300">

              {/* Rotating inner ring for dynamic visual flair */}
              <div className="absolute inset-[3px] md:inset-[4px] rounded-full border-[1.5px] border-dashed border-white/80 animate-[spin_15s_linear_infinite]"></div>

              {/* Badge Content */}
              <div className="relative z-10 flex flex-col items-center justify-center w-full h-full pt-0.5 md:pt-1">
                <span className="font-sans font-bold text-[7px] md:text-[8px] tracking-[0.2em] uppercase text-orange-100 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)] mb-0.5">UP TO</span>
                <div className="flex items-start">
                  <span className="font-sans font-black text-[26px] md:text-[34px] leading-[0.85] tracking-tighter text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">50</span>
                  <span className="font-sans font-bold text-[12px] md:text-[16px] leading-none mt-0.5 md:mt-1 ml-0.5 text-orange-100 drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">%</span>
                </div>
                <span className="font-sans font-black text-[8px] md:text-[10px] tracking-wider leading-none text-orange-100 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)] mt-0.5 md:mt-1">OFF*</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section - Transparent background so the image's light right-side shows through */}
        <div className="relative w-full md:w-[50%] flex flex-col items-center justify-center p-4 pt-5 md:p-3 lg:py-3 lg:px-6 z-10 mt-0">
          <div className="relative z-10 flex flex-col items-center w-full justify-center -mt-1 lg:-mt-2">

            {/* Date Pill */}
            <div className="flex justify-center mb-1 md:mb-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/60 border border-[#df5b12]/20 rounded-full shadow-sm">
                <div className="flex items-center justify-center w-5 h-5 rounded-full bg-[#df5b12]">
                  <CalendarDays className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="text-[#5d4037] font-bold text-[12px] md:text-[14px] tracking-wide">
                  Sep. 1 - 30, 2026
                </span>
              </div>
            </div>

            {/* Title */}
            <div className="relative text-center w-full flex flex-col items-center mb-1 mt-0">
              <h1 className="flex flex-wrap justify-center items-baseline gap-x-2 md:gap-x-3 xl:gap-x-4">
                <span className="text-4xl sm:text-5xl md:text-[28px] lg:text-[32px] xl:text-[42px] font-bold text-[#3e2723] leading-none tracking-tight font-serif whitespace-nowrap">
                  September
                </span>
                <span className="text-4xl sm:text-5xl md:text-[28px] lg:text-[32px] xl:text-[42px] font-bold text-[#df5b12] italic leading-none tracking-tight font-serif whitespace-nowrap">
                  Sale
                </span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-[#5d4037] text-[15px] md:text-[18px] lg:text-[16px] xl:text-[20px] font-serif text-center max-w-[500px] leading-relaxed mb-1 md:mb-1.5">
              Strengthen what matters most with <span className="font-bold text-[#df5b12]">Divine blessings</span>.
            </p>

            <p className="text-[#ea580c] font-medium text-[12px] md:text-[13px] font-serif italic text-center mb-3">
              *Additional Membership Discounts Apply
            </p>

            {/* Button */}
            <div className="w-full flex justify-center mt-1">
              <button className="group/btn relative flex items-center justify-center gap-1.5 sm:gap-2 bg-[#df5b12] hover:bg-[#bf480d] text-white px-4 sm:px-6 md:px-4 lg:px-6 xl:px-8 py-2 md:py-2.5 xl:py-3 rounded-full shadow-lg transition-all duration-300 transform hover:-translate-y-1 w-auto max-w-full">
                <span className="font-sans font-bold text-[9px] sm:text-[11px] md:text-[9px] lg:text-[11px] xl:text-[13px] tracking-[0.1em] lg:tracking-[0.15em] xl:tracking-[0.2em] uppercase text-center whitespace-nowrap">EXPLORE SEPTEMBER BLESSINGS</span>
                <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 xl:w-5 xl:h-5 transition-transform duration-300 group-hover/btn:translate-x-1.5 text-white shrink-0" strokeWidth={2.5} />
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}