import React, { useState, useEffect } from 'react';
import { ArrowRight, CalendarDays, Percent, ShieldCheck, Headphones } from 'lucide-react';
import desktopBgImage from '../../assets/Banner_image/astroved_all_products_bg.jpg';
import mobileBgImage from '../../assets/Banner_image/mobile_spiritual_bg.jpg';

export function SeptemberSaleBanner() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Helper to extract TimeZone from the fetchLocation cookie
    const getCookieTimezone = () => {
      try {
        const match = document.cookie.match(/(?:^|;\s*)fetchLocation=([^;]*)/);
        if (match) {
          const params = new URLSearchParams(match[1]);
          const tz = params.get('TimeZone');
          if (tz) return tz;
        }
      } catch (e) {
        console.error('Error reading timezone cookie', e);
      }
      return Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
    };

    const userTimeZone = getCookieTimezone();

    const updateTimer = () => {
      const now = new Date();
      // Get the current time as a string formatted in the target timezone
      const tzTimeString = now.toLocaleString("en-US", { timeZone: userTimeZone });
      const nowInTz = new Date(tzTimeString).getTime();

      // Parse the target end date as a local time in that timezone
      const targetInTz = new Date('09/30/2026 23:59:59').getTime();

      const distance = targetInTz - nowInTz;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
        return true;
      } else {
        setIsVisible(false);
        return false;
      }
    };

    // Run immediately on mount to prevent flashing if already expired
    if (updateTimer()) {
      const interval = setInterval(() => {
        if (!updateTimer()) {
          clearInterval(interval);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, []);

  if (!isVisible) return null;

  const padZero = (num: number) => num.toString().padStart(2, '0');

  return (
    <section className="w-full flex justify-center p-4 md:p-8 font-sans">
      <div className="w-full max-w-[1200px] relative shadow-[0_4px_25px_rgba(0,0,0,0.06)] flex flex-col lg:flex-row bg-[#fcf9f2] rounded-xl lg:rounded-2xl border border-gray-200/80 group/banner">

        {/* Desktop Full Background Image Wrapper (hidden on mobile/tablet) */}
        <div className="hidden lg:block absolute inset-0 overflow-hidden rounded-xl md:rounded-2xl z-0">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover/banner:scale-[1.02]"
            style={{ backgroundImage: `url(${desktopBgImage})` }}
          ></div>
        </div>

        {/* Top Right Ribbon (Breaks out of container) */}
        <div className="absolute -top-3 lg:-top-5 right-6 md:right-8 lg:right-12 z-50">
          {/* Left Fold tucking under the card */}
          <div className="absolute top-[12px] lg:top-[20px] -left-2 w-0 h-0 border-t-[8px] border-t-[#7f1d1d] border-l-[8px] border-l-transparent z-0"></div>
          {/* Ribbon Body */}
          <div className="relative z-10 bg-gradient-to-r from-[#dc2626] to-[#b91c1c] text-white px-5 md:px-8 py-2 md:py-2.5 rounded-b-xl rounded-tr-xl shadow-[0_6px_15px_rgba(220,38,38,0.25)] flex flex-col items-center justify-center text-center leading-tight">
            <span className="font-serif font-black text-[13px] md:text-[15px] tracking-widest uppercase drop-shadow-sm">LIMITED OFFER</span>
          </div>
        </div>


        {/* Floating Timer for Tablet/Mobile (Positioned directly below the Ribbon) */}
        <div className="flex lg:hidden absolute top-[32px] min-[375px]:top-[36px] md:top-[56px] right-2 md:right-8 z-40 items-center gap-0.5 min-[375px]:gap-1 sm:gap-1.5 md:gap-2">
          <div className="flex flex-col items-center justify-center w-9 h-9 min-[375px]:w-10 min-[375px]:h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-white/95 backdrop-blur-sm rounded-lg border border-red-200 shadow-[0_4px_12px_rgba(0,0,0,0.15)] relative overflow-hidden">
            <span className="text-red-600 font-black text-[14px] min-[375px]:text-[16px] sm:text-[18px] md:text-[22px] leading-none z-10">{padZero(timeLeft.days)}</span>
            <span className="text-[7px] min-[375px]:text-[8px] sm:text-[9px] md:text-[10px] text-red-500 font-black uppercase tracking-wider z-10 mt-0.5">Days</span>
          </div>
          <span className="text-white font-black text-[14px] min-[375px]:text-[16px] sm:text-[18px] md:text-[22px] relative -top-[1.5px] min-[375px]:-top-[2px] sm:-top-[3px] md:-top-[4px] animate-[pulse_1s_ease-in-out_infinite] drop-shadow-[0_0_6px_rgba(255,255,255,0.9)]">:</span>
          <div className="flex flex-col items-center justify-center w-9 h-9 min-[375px]:w-10 min-[375px]:h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-white/95 backdrop-blur-sm rounded-lg border border-red-200 shadow-[0_4px_12px_rgba(0,0,0,0.15)] relative overflow-hidden">
            <span className="text-red-600 font-black text-[14px] min-[375px]:text-[16px] sm:text-[18px] md:text-[22px] leading-none z-10">{padZero(timeLeft.hours)}</span>
            <span className="text-[7px] min-[375px]:text-[8px] sm:text-[9px] md:text-[10px] text-red-500 font-black uppercase tracking-wider z-10 mt-0.5">Hrs</span>
          </div>
          <span className="text-white font-black text-[14px] min-[375px]:text-[16px] sm:text-[18px] md:text-[22px] relative -top-[1.5px] min-[375px]:-top-[2px] sm:-top-[3px] md:-top-[4px] animate-[pulse_1s_ease-in-out_infinite] drop-shadow-[0_0_6px_rgba(255,255,255,0.9)]">:</span>
          <div className="flex flex-col items-center justify-center w-9 h-9 min-[375px]:w-10 min-[375px]:h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-white/95 backdrop-blur-sm rounded-lg border border-red-200 shadow-[0_4px_12px_rgba(0,0,0,0.15)] relative overflow-hidden">
            <span className="text-red-600 font-black text-[14px] min-[375px]:text-[16px] sm:text-[18px] md:text-[22px] leading-none z-10">{padZero(timeLeft.minutes)}</span>
            <span className="text-[7px] min-[375px]:text-[8px] sm:text-[9px] md:text-[10px] text-red-500 font-black uppercase tracking-wider z-10 mt-0.5">Mins</span>
          </div>
          <span className="text-white font-black text-[14px] min-[375px]:text-[16px] sm:text-[18px] md:text-[22px] relative -top-[1.5px] min-[375px]:-top-[2px] sm:-top-[3px] md:-top-[4px] animate-[pulse_1s_ease-in-out_infinite] drop-shadow-[0_0_6px_rgba(255,255,255,0.9)]">:</span>
          <div className="flex flex-col items-center justify-center w-9 h-9 min-[375px]:w-10 min-[375px]:h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-white/95 backdrop-blur-sm rounded-lg border border-red-200 shadow-[0_4px_12px_rgba(0,0,0,0.15)] relative overflow-hidden">
            <span className="text-red-600 font-black text-[14px] min-[375px]:text-[16px] sm:text-[18px] md:text-[22px] leading-none z-10">{padZero(timeLeft.seconds)}</span>
            <span className="text-[7px] min-[375px]:text-[8px] sm:text-[9px] md:text-[10px] text-red-500 font-black uppercase tracking-wider z-10 mt-0.5">Secs</span>
          </div>
        </div>

        {/* Left Spacer Section - Contains the Mobile/Tablet image */}
        <div className="w-full lg:w-[50%] h-[260px] sm:h-[340px] md:h-[500px] lg:h-auto relative z-10 shrink-0">

          {/* Mobile/Tablet Background Image */}
          <div
            className="block lg:hidden absolute inset-0 bg-cover bg-top transition-transform duration-1000 group-hover/banner:scale-[1.02] rounded-t-xl"
            style={{ backgroundImage: `url(${mobileBgImage})` }}
          ></div>

          {/* Gradient fade to blend image seamlessly with the background color - REMOVED AS PER USER REQUEST */}
          {/* <div className="block lg:hidden absolute bottom-0 left-0 right-0 h-16 sm:h-24 bg-gradient-to-t from-[#fcf9f2] to-transparent z-10"></div> */}
          {/* Modern Premium Floating Offer Badge */}
          <div className="absolute top-2 left-2 md:top-8 md:left-8 z-20 group/badge">
            {/* Outer Glowing Blur */}
            <div className="absolute -inset-1.5 md:-inset-2 bg-[#ea580c] rounded-full blur-md md:blur-lg opacity-40 group-hover/badge:opacity-60 transition-opacity duration-500 animate-pulse"></div>

            {/* Main Badge Container */}
            <div className="relative flex flex-col items-center justify-center w-[100px] h-[100px] md:w-[130px] md:h-[130px] rounded-full bg-[#ea580c] shadow-[0_12px_30px_rgba(234,88,12,0.4)] border border-white/30 transform group-hover/badge:scale-110 group-hover/badge:rotate-3 transition-all duration-300">

              {/* Rotating inner ring for dynamic visual flair */}
              <div className="absolute inset-[3px] md:inset-[5px] rounded-full border-[1.5px] border-dashed border-white/80 animate-[spin_15s_linear_infinite]"></div>

              {/* Badge Content */}
              <div className="relative z-10 flex flex-col items-center justify-center w-full h-full pt-1 md:pt-1.5">
                <span className="font-sans font-bold text-[9px] md:text-[11px] tracking-[0.2em] uppercase text-orange-100 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)] mb-0.5">UP TO</span>
                <div className="flex items-start">
                  <span className="font-sans font-black text-[38px] md:text-[52px] leading-[0.85] tracking-tighter text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">45</span>
                  <span className="font-sans font-bold text-[16px] md:text-[24px] leading-none mt-0.5 md:mt-1 ml-0.5 text-orange-100 drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">%</span>
                </div>
                <span className="font-sans font-black text-[11px] md:text-[14px] tracking-wider leading-none text-orange-100 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)] mt-1">OFF*</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section - Transparent background so the image's light right-side shows through */}
        <div className="relative w-full lg:w-[50%] flex flex-col justify-between p-4 md:p-5 lg:p-5 z-10 mt-0">

          <div className="relative z-10 flex flex-col items-center md:items-start w-full h-full justify-between">
            <div className="w-full">
              {/* Premium Date & Timer Section */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-3 mb-4 w-full">

                {/* Left Side: Premium Date Pill */}
                <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-gradient-to-r from-purple-50 to-white border border-purple-100 rounded-full shadow-sm">
                  <div className="flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-br from-[#7c3aed] to-[#4c1d95] shadow-[0_2px_8px_rgba(124,58,237,0.3)]">
                    <CalendarDays className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-[#4c1d95] font-bold text-[12px] md:text-[15px] lg:text-[13px] tracking-wide">
                    Sep. 1 - 30, 2026
                  </span>
                </div>

                {/* Right Side: Visual Timer (Desktop Only) */}
                <div className="hidden lg:flex items-center gap-1.5 self-center z-10">
                  <div className="flex flex-col items-center justify-center w-10 h-10 md:w-11 md:h-11 bg-white/95 backdrop-blur-sm rounded-lg border border-red-200 shadow-sm relative overflow-hidden">
                    <span className="text-red-600 font-black text-[14px] md:text-[16px] leading-none z-10">{padZero(timeLeft.days)}</span>
                    <span className="text-[7px] md:text-[8px] text-red-500 font-bold uppercase tracking-wider z-10 mt-0.5">Days</span>
                  </div>
                  <span className="text-red-500 font-black text-[14px] md:text-[16px] relative -top-[2px] md:-top-[3px] animate-[pulse_1s_ease-in-out_infinite] drop-shadow-[0_0_8px_rgba(239,68,68,0.9)]">:</span>
                  <div className="flex flex-col items-center justify-center w-10 h-10 md:w-11 md:h-11 bg-white/95 backdrop-blur-sm rounded-lg border border-red-200 shadow-sm relative overflow-hidden">
                    <span className="text-red-600 font-black text-[14px] md:text-[16px] leading-none z-10">{padZero(timeLeft.hours)}</span>
                    <span className="text-[7px] md:text-[8px] text-red-500 font-bold uppercase tracking-wider z-10 mt-0.5">Hrs</span>
                  </div>
                  <span className="text-red-500 font-black text-[14px] md:text-[16px] relative -top-[2px] md:-top-[3px] animate-[pulse_1s_ease-in-out_infinite] drop-shadow-[0_0_8px_rgba(239,68,68,0.9)]">:</span>
                  <div className="flex flex-col items-center justify-center w-10 h-10 md:w-11 md:h-11 bg-white/95 backdrop-blur-sm rounded-lg border border-red-200 shadow-sm relative overflow-hidden">
                    <span className="text-red-600 font-black text-[14px] md:text-[16px] leading-none z-10">{padZero(timeLeft.minutes)}</span>
                    <span className="text-[7px] md:text-[8px] text-red-500 font-bold uppercase tracking-wider z-10 mt-0.5">Mins</span>
                  </div>
                  <span className="text-red-500 font-black text-[14px] md:text-[16px] relative -top-[2px] md:-top-[3px] animate-[pulse_1s_ease-in-out_infinite] drop-shadow-[0_0_8px_rgba(239,68,68,0.9)]">:</span>
                  <div className="flex flex-col items-center justify-center w-10 h-10 md:w-11 md:h-11 bg-white/95 backdrop-blur-sm rounded-lg border border-red-200 shadow-sm relative overflow-hidden">
                    <span className="text-red-600 font-black text-[14px] md:text-[16px] leading-none z-10">{padZero(timeLeft.seconds)}</span>
                    <span className="text-[7px] md:text-[8px] text-red-500 font-bold uppercase tracking-wider z-10 mt-0.5">Secs</span>
                  </div>
                </div>
              </div>

              {/* Title - Premium & Elegant Design */}
              <div className="relative text-center md:text-left mb-2 w-full flex flex-col items-center md:items-start">

                <h1 className="flex flex-wrap justify-center md:justify-start items-baseline gap-x-3 lg:gap-x-3 xl:gap-x-4">
                  <span className="text-4xl sm:text-5xl md:text-[56px] lg:text-[42px] xl:text-[52px] font-black text-transparent bg-clip-text bg-gradient-to-br from-[#2e1065] via-[#4c1d95] to-[#7c3aed] leading-none tracking-tight font-serif drop-shadow-sm pb-1 whitespace-nowrap">
                    SEPTEMBER
                  </span>
                  <span className="text-3xl sm:text-4xl md:text-[48px] lg:text-[36px] xl:text-[44px] italic font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#b45309] to-[#d97706] leading-none tracking-wider font-serif whitespace-nowrap">
                    Sale
                  </span>
                </h1>
              </div>

              {/* Description */}
              <p className="text-gray-800 text-[13px] md:text-xl lg:text-[15px] font-medium text-center md:text-left max-w-[480px] leading-relaxed mb-3 mt-1.5">
                Strengthen what matters most with <span className="font-extrabold text-[#5b21b6] bg-[#f5f3ff] px-1.5 py-0.5 rounded border border-[#ede9fe]">Divine blessings</span> and authentic Vedic products.
              </p>

              {/* Bottom Premium Trust Bar */}
              <div className="flex flex-row justify-between items-center w-full gap-1.5 min-[375px]:gap-2 md:gap-4 mt-auto bg-white/60 backdrop-blur-md rounded-xl md:rounded-2xl py-2 md:py-2.5 px-1.5 min-[375px]:px-2 md:px-4 border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.1)]">

                <div className="group/trust flex flex-row items-center justify-center gap-1 md:gap-2 flex-1 relative xl:after:block after:hidden after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:h-4 after:w-px after:bg-purple-200">
                  <Percent className="w-3.5 h-3.5 md:w-5 md:h-5 text-[#7c3aed] group-hover/trust:scale-110 transition-transform duration-300 shrink-0" strokeWidth={2.5} />
                  <span className="text-[7.5px] min-[375px]:text-[8.5px] sm:text-[10px] lg:text-[12px] xl:text-[13px] font-black text-[#4c1d95] leading-none tracking-tight md:tracking-wide whitespace-nowrap mt-0.5">UP TO 45% OFF*</span>
                </div>

                <div className="group/trust flex flex-row items-center justify-center gap-1 md:gap-2 flex-1 relative xl:after:block after:hidden after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:h-4 after:w-px after:bg-purple-200">
                  <ShieldCheck className="w-3.5 h-3.5 md:w-5 md:h-5 text-[#7c3aed] group-hover/trust:scale-110 transition-transform duration-300 shrink-0" strokeWidth={2.5} />
                  <span className="text-[7.5px] min-[375px]:text-[8.5px] sm:text-[10px] lg:text-[12px] xl:text-[13px] font-black text-[#4c1d95] leading-none tracking-tight md:tracking-wide whitespace-nowrap mt-0.5">100% SECURE</span>
                </div>

                <div className="group/trust flex flex-row items-center justify-center gap-1 md:gap-2 flex-1">
                  <Headphones className="w-3.5 h-3.5 md:w-5 md:h-5 text-[#7c3aed] group-hover/trust:scale-110 transition-transform duration-300 shrink-0" strokeWidth={2.5} />
                  <span className="text-[7.5px] min-[375px]:text-[8.5px] sm:text-[10px] lg:text-[12px] xl:text-[13px] font-black text-[#4c1d95] leading-none tracking-tight md:tracking-wide whitespace-nowrap mt-0.5">EXPERT SUPPORT</span>
                </div>
              </div>

              {/* Highly Attractive Button */}
              <div className="w-full flex justify-center mt-3 md:mt-4 -mb-2">
                <button className="group/btn relative w-full sm:w-auto flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#ea580c] to-[#f97316] hover:from-[#f97316] hover:to-[#ea580c] text-white px-6 md:px-12 lg:px-8 xl:px-12 py-3 md:py-4 lg:py-3.5 rounded-xl shadow-[0_12px_30px_rgba(234,88,12,0.35)] transition-all duration-300 transform hover:-translate-y-1">
                  <span className="font-serif font-black text-[13px] md:text-[18px] lg:text-[14px] xl:text-[15px] tracking-widest uppercase drop-shadow-sm text-center">EXPLORE SEPTEMBER BLESSINGS</span>
                  <ArrowRight className="w-4 h-4 md:w-6 md:h-6 lg:w-5 lg:h-5 transition-transform duration-300 group-hover/btn:translate-x-1.5 text-white shrink-0" strokeWidth={3} />
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
