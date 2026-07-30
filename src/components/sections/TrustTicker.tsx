import React from 'react';
import { ShieldCheck, Star, Users, Award, Lock, Sparkles } from 'lucide-react';

/* Container & Layout Styles */
const CONTAINER_STYLES = "w-full bg-[#f8f9fa] dark:bg-[#06020a] border-b border-black/5 dark:border-amber-500/20 py-4 md:py-5 overflow-hidden flex items-center relative z-20 shadow-sm dark:shadow-[0_4px_30px_rgba(245,158,11,0.05)]";
const MARQUEE_WRAPPER_STYLES = "flex w-fit animate-[marquee_45s_linear_infinite] whitespace-nowrap items-center";

/* Decorative Gradients & Fades */
const DECORATIVE_EDGE_TOP_STYLES = "absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-500/40 to-transparent";
const DECORATIVE_EDGE_BOTTOM_STYLES = "absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/40 to-transparent";
const FADE_EDGE_LEFT_STYLES = "absolute left-0 top-0 bottom-0 w-16 md:w-40 bg-gradient-to-r from-[#f8f9fa] dark:from-[#06020a] to-transparent z-10 pointer-events-none";
const FADE_EDGE_RIGHT_STYLES = "absolute right-0 top-0 bottom-0 w-16 md:w-40 bg-gradient-to-l from-[#f8f9fa] dark:from-[#06020a] to-transparent z-10 pointer-events-none";

/* Individual Trust Card Styles */
const ITEM_CARD_STYLES = "flex items-center mx-3 md:mx-4 group cursor-default bg-white/60 dark:bg-[#1a0b2e]/40 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-full px-4 py-2 md:px-6 md:py-2.5 hover:bg-white dark:hover:bg-[#1a0b2e]/80 hover:border-amber-500/40 transition-all duration-500 hover:-translate-y-1 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(245,158,11,0.1)]";
const ITEM_ICON_WRAPPER_STYLES = "w-7 h-7 md:w-9 md:h-9 rounded-full bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-500/20 dark:to-orange-500/20 flex items-center justify-center mr-3 group-hover:scale-110 group-hover:rotate-12 group-hover:shadow-[0_0_15px_rgba(245,158,11,0.4)] transition-all duration-300";
const ITEM_ICON_STYLES = "w-3.5 h-3.5 md:w-4 md:h-4 text-amber-700 dark:text-amber-400";
const ITEM_TEXT_STYLES = "font-sans font-bold text-[10px] md:text-[11px] tracking-[0.15em] text-midnight/80 dark:text-cream/90 uppercase group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors duration-300";

/**
 * Data model for a single trust metric displayed in the ticker.
 */
interface TrustStat {
  text: string;
  icon: React.ElementType;
}

/**
 * Source of truth for trust metrics. Kept static to prevent unnecessary re-renders.
 */
const TRUST_STATS: TrustStat[] = [
  { text: "Legacy of 25 Years", icon: Award },
  { text: "Trusted by Millions", icon: Users },
  { text: "Expert Vedic Priests", icon: Sparkles },
  { text: "4.8/5 Global Rating", icon: Star },
  { text: "100% Data Privacy", icon: Lock },
  { text: "Verified Remedies", icon: ShieldCheck }
];

/**
 * Multiplication factor for the marquee items.
 * Renders 4 identical sets to guarantee the infinite scrolling animation 
 * never shows a blank gap, regardless of viewport width.
 */
const MARQUEE_DUPLICATE_GROUPS = [0, 1, 2, 3];

/**
 * TrustTicker
 * 
 * A continuously scrolling marquee component used to display trust signals.
 * Utilizes hardware-accelerated CSS animations for performance.
 */
export function TrustTicker() {
  return (
    <div className={CONTAINER_STYLES}>
      
      {/* Top/Bottom subtle borders for depth integration */}
      <div className={DECORATIVE_EDGE_TOP_STYLES} />
      <div className={DECORATIVE_EDGE_BOTTOM_STYLES} />
      
      {/* Left/Right feathering masks to smoothly obscure entering/exiting items */}
      <div className={FADE_EDGE_LEFT_STYLES} />
      <div className={FADE_EDGE_RIGHT_STYLES} />

      {/* Primary marquee track. width-fit allows the content to dictate boundaries for the keyframe translation */}
      <div className={MARQUEE_WRAPPER_STYLES}>
        {MARQUEE_DUPLICATE_GROUPS.map((groupIndex) => (
          <React.Fragment key={groupIndex}>
            {TRUST_STATS.map((stat, itemIndex) => {
              const IconComponent = stat.icon;
              return (
                <div 
                  key={`${groupIndex}-${itemIndex}`} 
                  className={ITEM_CARD_STYLES}
                >
                  <div className={ITEM_ICON_WRAPPER_STYLES}>
                    <IconComponent className={ITEM_ICON_STYLES} />
                  </div>
                  <span className={ITEM_TEXT_STYLES}>
                    {stat.text}
                  </span>
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>

      {/* 
        Injecting marquee keyframes locally to scope the animation.
        The -33.333% translation precisely shifts the flex container by 1/3 of its 
        total expanded width, creating a seamless loop given the duplicate groups.
      */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
      `}</style>
    </div>
  );
}
