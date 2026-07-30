import React from 'react';
import { motion, Variants } from 'motion/react';
import { CountUp } from '../ui/CountUp';
import { ShieldCheck, Award, LockKeyhole } from 'lucide-react';

/* Section & Background Styles */
const SECTION_STYLES = "relative w-full py-4 md:py-6 overflow-hidden transition-colors duration-500 border-y border-black/5 dark:border-amber-500/40 dark:shadow-[0_0_15px_rgba(245,158,11,0.2)] z-10";
const BG_PATTERN_STYLES = "absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none";
const BG_GLOW_STYLES = "absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.08)_0%,transparent_60%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.05)_0%,transparent_60%)] pointer-events-none";

/* Layout Styles */
const CONTAINER_STYLES = "max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8 lg:gap-12 items-center";

/* Title Styles */
const TITLE_CONTAINER_STYLES = "text-center md:text-left relative z-10";
const TITLE_LINE_STYLES = "absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-12 bg-gradient-to-b from-amber-400 to-amber-600 rounded-full hidden md:block";
const TITLE_SUB_STYLES = "text-xs font-mono uppercase tracking-[0.25em] text-amber-600 dark:text-amber-500 font-bold block mb-2";
const TITLE_MAIN_STYLES = "font-sans text-2xl md:text-3xl text-midnight dark:text-cream font-medium tracking-wide";

/* Card Styles */
const STAT_CARD_WRAPPER_STYLES = "relative group p-4 md:p-6 lg:p-8 transform-gpu backface-hidden";
const STAT_CARD_BG_STYLES = "absolute inset-0 bg-white dark:bg-[#110c1c] rounded-2xl border border-black/5 dark:border-amber-500/40 dark:shadow-[0_0_15px_rgba(245,158,11,0.2)] shadow-lg group-hover:shadow-amber-500/20 group-hover:border-amber-500/30 transition-shadow transition-colors duration-500";
const STAT_CONTENT_WRAPPER_STYLES = "flex flex-col items-center justify-center text-center relative z-10";
const ICON_CONTAINER_STYLES = "w-10 h-10 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-3";
const ICON_STYLES = "w-5 h-5";
const NUMBER_STYLES = "text-4xl md:text-5xl font-sans text-midnight dark:text-cream font-bold block mb-1";
const LABEL_STYLES = "text-[10px] font-mono text-gray-500 dark:text-gray-400 uppercase tracking-widest";

/**
 * Interface defining the properties for a single trust statistic card.
 */
interface TrustStatItem {
  icon: React.ElementType;
  countTo: number;
  countFrom?: number;
  duration: number;
  suffix?: string;
  label: string;
}

/**
 * Static array of trust statistics to render.
 */
const STATIC_TRUST_STATS: TrustStatItem[] = [
  {
    icon: Award,
    countTo: 2001,
    countFrom: 1980,
    duration: 2,
    label: "Year of Inception"
  },
  {
    icon: ShieldCheck,
    countTo: 180,
    duration: 1.8,
    suffix: "+",
    label: "Scholars & Astrologers"
  },
  {
    icon: LockKeyhole,
    countTo: 100,
    countFrom: 50,
    duration: 2.2,
    suffix: "%",
    label: "Certified Privacy Score"
  }
];

/**
 * Animation variants for the parent container holding the stats.
 */
const CONTAINER_VARIANTS: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 }
  }
};

/**
 * Animation variants for individual stat cards.
 */
const ITEM_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 15 } }
};

/**
 * TrustStats Component
 * 
 * Renders an animated banner displaying key platform statistics and trust signals.
 */
export function TrustStats() {
  return (
    <section className={SECTION_STYLES}>

      {/* --- Premium Animated Background Elements --- */}
      <div className={BG_PATTERN_STYLES} />
      <div className={BG_GLOW_STYLES} />

      {/* --- Main Layout Container --- */}
      <motion.div
        variants={CONTAINER_VARIANTS}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className={CONTAINER_STYLES}
      >

        {/* --- Title Area --- */}
        <motion.div variants={ITEM_VARIANTS} className={TITLE_CONTAINER_STYLES}>
          <div className={TITLE_LINE_STYLES} />
          <span className={TITLE_SUB_STYLES}>ESTABLISHED DHARMA</span>
          <span className={TITLE_MAIN_STYLES}>AstroVed<br className="hidden md:block" /> Verified</span>
        </motion.div>

        {/* --- Statistic Cards --- */}
        {STATIC_TRUST_STATS.map((statItem, itemIndex) => {
          const IconComponent = statItem.icon;
          return (
            <motion.div key={itemIndex} variants={ITEM_VARIANTS} className={STAT_CARD_WRAPPER_STYLES}>
              <div className={STAT_CARD_BG_STYLES} />
              <div className={STAT_CONTENT_WRAPPER_STYLES}>
                <div className={ICON_CONTAINER_STYLES}>
                  <IconComponent className={ICON_STYLES} />
                </div>
                <span className={NUMBER_STYLES}>
                  <CountUp
                    to={statItem.countTo}
                    from={statItem.countFrom}
                    duration={statItem.duration}
                    suffix={statItem.suffix}
                  />
                </span>
                <span className={LABEL_STYLES}>{statItem.label}</span>
              </div>
            </motion.div>
          );
        })}

      </motion.div>
    </section>
  );
}
