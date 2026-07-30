import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus } from 'lucide-react';

const FAQ_DATA = [
  {
    id: 1,
    q: "How accurate are Vedic astrology predictions?",
    a: "Vedic astrology offers highly accurate insights by analyzing the precise positions of planets at your exact time and place of birth. While it highlights life patterns and potentials, the accuracy also depends on the astrologer's expertise and your own free will."
  },
  {
    id: 2,
    q: "What is the difference between a birth chart (Kundli) and a horoscope?",
    a: "A birth chart is a highly detailed, personalized snapshot of the sky at your exact moment of birth. In contrast, a general horoscope offers broader daily, monthly, or yearly predictions based only on your zodiac or moon sign."
  },
  {
    id: 3,
    q: "Why is Kundli matching recommended before marriage?",
    a: "Kundli matching is an ancient Vedic practice used to assess the deep compatibility between partners using principles like Guna Milan. It helps identify potential strengths and challenges in the relationship, making it a valuable tool for marital decisions."
  },
  {
    id: 4,
    q: "Why do so many people find astrology to be accurate?",
    a: "For thousands of years, astrology has provided deep insights into personality traits, strengths, and life paths. When interpreted by expert astrologers, these personalized readings resonate deeply and offer actionable guidance for navigating life's challenges."
  },
  {
    id: 5,
    q: "Why should I choose AstroVed for my astrology consultation?",
    a: "AstroVed connects you with highly qualified and authentic Vedic astrologers who offer personalized, expert guidance. Beyond accurate readings, we provide practical remedies, rituals, and energized products to help you overcome life's obstacles."
  },
  {
    id: 6,
    q: "Can online astrology accurately predict my future?",
    a: "Online astrology identifies upcoming trends and influences in areas like career, health, and relationships. While it doesn't provide absolute certainties, it equips you with the foresight needed to make confident and informed decisions."
  },
  {
    id: 7,
    q: "What kinds of questions can I ask during an astrology consultation?",
    a: "You can ask about any aspect of your life, including career moves, relationship compatibility, financial growth, health concerns, and auspicious timings (Muhurtha) for starting new ventures or making major life changes."
  },
  {
    id: 8,
    q: "Are astrological predictions fixed, or can I change my destiny?",
    a: "Astrology reveals your karmic tendencies, but it does not dictate a fixed fate. You possess free will. By applying Vedic remedies and making conscious, informed choices, you have the power to mitigate negative influences and shape your destiny."
  },
  {
    id: 9,
    q: "What are the main benefits of using Vedic astrology services?",
    a: "Vedic astrology provides profound personal clarity, helps you discover your true life purpose, offers effective remedies for ongoing problems, and guides you in choosing the most auspicious times for important life events."
  },
  {
    id: 10,
    q: "How reliable and secure are AstroVed's online services and app?",
    a: "AstroVed ensures the highest standards of privacy, accuracy, and customer satisfaction. Your personal birth data is securely encrypted and solely used to generate your personalized astrological charts."
  }
];

/**
 * Resolves the dynamic Tailwind CSS classes for the main FAQ card container.
 * 
 * @param isOpen - Whether the FAQ item is currently expanded
 */
const getFaqCardStyles = (isOpen: boolean): string => {
  const baseClasses = "rounded-2xl border transition-colors duration-300 overflow-hidden transform-gpu translate-z-0";
  const activeClasses = "border-amber-500/30 bg-white dark:bg-[#1a1f3c] shadow-lg shadow-amber-500/5";
  const inactiveClasses = "border-black/5 dark:border-amber-500/40 dark:shadow-[0_0_15px_rgba(245,158,11,0.2)] bg-white dark:bg-[#110c1c] hover:border-amber-500/20 hover:bg-gray-50 dark:hover:bg-[#1a1f3c]";
  return `${baseClasses} ${isOpen ? activeClasses : inactiveClasses}`;
};

/**
 * Resolves the dynamic Tailwind CSS classes for the FAQ question text.
 * 
 * @param isOpen - Whether the FAQ item is currently expanded
 */
const getFaqQuestionStyles = (isOpen: boolean): string => {
  const baseClasses = "font-sans text-sm sm:text-base tracking-wide font-medium transition-colors";
  const activeClasses = "text-amber-700 dark:text-amber-400";
  const inactiveClasses = "text-midnight dark:text-cream";
  return `${baseClasses} ${isOpen ? activeClasses : inactiveClasses}`;
};

/**
 * Resolves the dynamic Tailwind CSS classes for the Plus/Minus toggle icon.
 * 
 * @param isOpen - Whether the FAQ item is currently expanded
 */
const getFaqIconStyles = (isOpen: boolean): string => {
  const baseClasses = "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-transform transition-colors duration-300 transform-gpu";
  const activeClasses = "bg-amber-500/10 text-amber-600 dark:text-amber-400 rotate-45";
  const inactiveClasses = "bg-black/5 dark:bg-white/5 text-gray-400 group-hover:bg-amber-500/10 group-hover:text-amber-500";
  return `${baseClasses} ${isOpen ? activeClasses : inactiveClasses}`;
};

interface FAQItemData {
  id: number;
  q: string;
  a: string;
}

/**
 * Pure function to render a single FAQ accordion card.
 * This abstracts the heavy HTML markup away from the main component layout.
 * 
 * @param faqItem - The data object containing the question and answer
 * @param isOpen - Whether this specific card is currently expanded
 * @param onToggle - Callback to toggle the expansion state
 */
const renderFaqItem = (
  faqItem: FAQItemData,
  isOpen: boolean,
  onToggle: (id: number) => void
) => (
  <div key={faqItem.id} className={getFaqCardStyles(isOpen)}>
    <button
      onClick={() => onToggle(faqItem.id)}
      className="w-full px-6 py-6 text-left flex items-center justify-between gap-6 group"
    >
      <span className={getFaqQuestionStyles(isOpen)}>
        {faqItem.q}
      </span>
      <span className={getFaqIconStyles(isOpen)}>
        <Plus className="w-4 h-4" />
      </span>
    </button>

    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="overflow-hidden transform-gpu will-change-[height,opacity]"
        >
          <div className="px-6 pb-6 pt-2 border-t border-black/5 dark:border-amber-500/40 dark:shadow-[0_0_15px_rgba(245,158,11,0.2)]">
            <p className="font-body text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed font-light">
              {faqItem.a}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

export function FAQ() {
  const [openFaqId, setOpenFaqId] = useState<number | null>(null);

  return (
    <section className="py-4 md:py-6 px-6 max-w-7xl mx-auto z-10 relative" id="faq-section">

      {/* --- Background Ambient Glow Section --- */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-[300px] bg-purple-500/5 dark:bg-purple-500/10 blur-[100px] rounded-full pointer-events-none transform-gpu translate-z-0" />

      {/* --- Header Section --- */}
      <div className="text-center max-w-3xl mx-auto mb-8 relative z-10">
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-midnight dark:text-cream leading-tight font-bold mb-4">
          Frequently Asked <em className="text-amber-600 dark:text-amber-400 italic">Questions.</em>
        </h2>
      </div>

      {/* --- FAQ List Section --- */}
      <div className="max-w-3xl mx-auto space-y-4 relative z-10">
        {FAQ_DATA.map((faqItem) =>
          renderFaqItem(faqItem, openFaqId === faqItem.id, (id) => setOpenFaqId(openFaqId === id ? null : id))
        )}
      </div>

    </section>
  );
}
