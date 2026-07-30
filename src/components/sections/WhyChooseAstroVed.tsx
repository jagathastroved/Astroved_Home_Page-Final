import React from 'react';
import { Target, Flame, HeartHandshake, Award, Globe2, LockKeyhole } from 'lucide-react';

/* =========================================
   STYLE CONSTANTS & HELPERS
   ========================================= */

/* Layout & Typography Styles */
const SECTION_STYLES = "py-6 md:py-8 relative overflow-hidden z-10";
const CONTAINER_STYLES = "max-w-7xl mx-auto px-6 relative z-10";

const HEADER_CONTAINER_STYLES = "text-center max-w-3xl mx-auto mb-8 relative z-10";
const SUBTITLE_STYLES = "text-amber-600 dark:text-amber-400 font-sans text-xs md:text-sm uppercase tracking-widest font-bold mb-3";
const TITLE_STYLES = "font-serif text-3xl sm:text-4xl md:text-5xl text-midnight dark:text-cream leading-tight font-bold mb-4";
const TITLE_HIGHLIGHT_STYLES = "text-amber-600 dark:text-amber-400 italic";

/* Glassmorphism Panel Styles */
const PANEL_CONTAINER_STYLES = "bg-white/60 dark:bg-[#1a0b2e]/40 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-[2rem] p-6 shadow-[0_4px_30px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_30px_-4px_rgba(245,158,11,0.05)] relative overflow-hidden group/panel";
const GLOW_TOP_RIGHT_STYLES = "absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-[100px] pointer-events-none transition-opacity duration-700 group-hover/panel:bg-amber-500/10";
const GLOW_BOTTOM_LEFT_STYLES = "absolute bottom-0 left-0 w-64 h-64 bg-purple-500/5 rounded-full blur-[80px] pointer-events-none transition-opacity duration-700 group-hover/panel:bg-purple-500/10";

/* Grid & Card Content Styles */
const GRID_CONTAINER_STYLES = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 relative z-10";
const CARD_WRAPPER_STYLES = "flex flex-col items-center text-center gap-3 group p-3 md:p-4 rounded-2xl hover:bg-white dark:hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-black/5 dark:hover:border-white/5 hover:shadow-sm";
const TEXT_WRAPPER_STYLES = "flex flex-col h-full w-full items-center";
const CARD_TITLE_STYLES = "font-sans font-bold text-[13px] md:text-base text-midnight dark:text-cream mb-1.5 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors leading-tight px-2";
const CARD_DESC_STYLES = "font-body text-gray-600 dark:text-gray-400 text-xs md:text-sm leading-relaxed px-2";

/**
 * Computes dynamic Tailwind classes for the icon bounding box.
 * @param baseGradient - The Tailwind gradient class string specific to this reason's theme.
 */
const getIconContainerStyles = (baseGradient: string): string => {
  return `w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br ${baseGradient} flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 shadow-inner`;
};

/**
 * Computes dynamic Tailwind classes for the SVG icon.
 * @param baseColor - The Tailwind text color class specific to this reason's theme.
 */
const getIconStyles = (baseColor: string): string => {
  return `w-5 h-5 md:w-6 md:h-6 ${baseColor}`;
};

/* =========================================
   TYPES & DATA
   ========================================= */

/**
 * Data model for an individual value proposition displayed in the grid.
 */
interface ReasonItem {
  title: string;
  desc: string;
  icon: React.ElementType;
  color: string;
  iconColor: string;
}

/**
 * Source of truth for the 'Why Choose AstroVed' feature list.
 * Kept strictly static outside the render cycle to prevent needless reconciliation.
 */
const REASONS: ReasonItem[] = [
  {
    title: "The right remedy, personally selected for you.",
    desc: "We study your chart and timing first - then recommend only what you need.",
    icon: Target,
    color: "from-blue-500/20 to-cyan-500/20",
    iconColor: "text-blue-600 dark:text-cyan-400"
  },
  {
    title: "Real priests, real rituals",
    desc: "Every homa is performed by temple-trained priests - with your name in the sankalpam and rituals done as per Vedic texts.",
    icon: Flame,
    color: "from-orange-500/20 to-amber-500/20",
    iconColor: "text-orange-600 dark:text-amber-400"
  },
  {
    title: "Genuine Guidance",
    desc: "Honest Vedic guidance. No fear, no false promises",
    icon: HeartHandshake,
    color: "from-pink-500/20 to-rose-500/20",
    iconColor: "text-pink-600 dark:text-rose-400"
  },
  {
    title: "Serving devotees since 2000",
    desc: "25 years of Vedic services, 3 lakh+ rituals, devotees in 50+ countries.",
    icon: Award,
    color: "from-purple-500/20 to-fuchsia-500/20",
    iconColor: "text-purple-600 dark:text-fuchsia-400"
  },
  {
    title: "Join from anywhere in the world",
    desc: "We perform at the temple - you watch live and receive the blessings at home.",
    icon: Globe2,
    color: "from-emerald-500/20 to-teal-500/20",
    iconColor: "text-emerald-600 dark:text-teal-400"
  },
  {
    title: "Your birth details stay private. Always.",
    desc: "Never shared. Never sold. Used only for your readings and rituals.",
    icon: LockKeyhole,
    color: "from-slate-500/20 to-gray-500/20",
    iconColor: "text-slate-600 dark:text-gray-400"
  }
];

/* =========================================
   MAIN COMPONENT
   ========================================= */

/**
 * WhyChooseAstroVed
 * 
 * Renders a highly responsive grid of value propositions. Employs localized
 * glassmorphism and subtle hover interactions to create a premium feel.
 */
export function WhyChooseAstroVed() {
  return (
    <section className={SECTION_STYLES} id="why-choose">
      <div className={CONTAINER_STYLES}>

        {/* Section Header */}
        <div className={HEADER_CONTAINER_STYLES}>
          <p className={SUBTITLE_STYLES}>OUR PROMISE</p>
          <h2 className={TITLE_STYLES}>
            Why Devotees Choose <em className={TITLE_HIGHLIGHT_STYLES}>AstroVed.</em>
          </h2>
        </div>

        {/* Core Content Layer (Glassmorphism constraints applied here) */}
        <div className={PANEL_CONTAINER_STYLES}>

          {/* Ambient lighting tied to parent hover states via group-hover */}
          <div className={GLOW_TOP_RIGHT_STYLES} />
          <div className={GLOW_BOTTOM_LEFT_STYLES} />

          {/* Dynamic Grid Topology */}
          <div className={GRID_CONTAINER_STYLES}>
            {REASONS.map((reason, itemIndex) => {
              const IconComponent = reason.icon;
              return (
                <div key={itemIndex} className={CARD_WRAPPER_STYLES}>

                  {/* Icon Rendering Layer */}
                  <div className={getIconContainerStyles(reason.color)}>
                    <IconComponent className={getIconStyles(reason.iconColor)} />
                  </div>

                  {/* Text Rendering Layer */}
                  <div className={TEXT_WRAPPER_STYLES}>
                    <h3 className={CARD_TITLE_STYLES}>
                      {reason.title}
                    </h3>
                    <p className={CARD_DESC_STYLES}>
                      {reason.desc}
                    </p>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}