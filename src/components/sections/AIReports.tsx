import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import aiKundali from '../../assets/ai_reports/ai_kundali_north.png'
import aiNumerology from '../../assets/ai_reports/ai_numerology_numbers.png'

/** Configuration constants for carousel behavior */
const SWIPE_THRESHOLD = 50;
const AUTOPLAY_INTERVAL_MS = 5000;

interface AIReport {
  id: number;
  title: string;
  description: string;
  cta: string;
  image: string;
  link: string;
}

const aiReportList: AIReport[] = [
  {
    id: 1,
    title: "Free AI Kundali Report",
    description: "Get an instant, comprehensive analysis of your birth chart. Discover your planetary positions, doshas, and predictions powered by cutting-edge AI.",
    cta: "Generate Report",
    image: aiKundali,
    link: "/kundali-report/"
  },
  {
    id: 2,
    title: "Free AI Numerology Report",
    description: "Uncover the hidden meanings behind your numbers. Get an AI-driven report on your life path, expression, and soul urge numbers.",
    cta: "Generate Report",
    image: aiNumerology,
    link: "/numerology-report/"
  }
];

/**
 * Resolves the theme color for the report's CTA button based on its unique identifier.
 * This abstracts styling concerns away from the primary data structure.
 * 
 * @param id - The unique identifier of the report
 * @returns Tailwind CSS classes for the button background and hover state
 */
const getButtonColor = (id: number): string => {
  return id === 1
    ? "bg-[#a855f7] hover:bg-[#9333ea]"
    : "bg-[#f59e0b] hover:bg-[#d97706]";
};

/** Shared tailwind classes for carousel navigation buttons */
const NAV_BUTTON_CLASSES = "w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/80 hover:bg-white dark:bg-black/30 dark:hover:bg-black/50 backdrop-blur-md border border-gray-200 dark:border-white/10 flex items-center justify-center text-[#b052ff] dark:text-white transition-all hover:scale-110 focus:outline-none pointer-events-auto shadow-lg";

export function AIReports() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  /**
   * Records the initial X coordinate when a touch event begins.
   */
  const handleTouchStart = (event: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(event.targetTouches[0].clientX);
  };

  /**
   * Updates the final X coordinate as the user drags their finger.
   */
  const handleTouchMove = (event: React.TouchEvent) => {
    setTouchEnd(event.targetTouches[0].clientX);
  };

  /**
   * Calculates the swipe distance and triggers navigation if the threshold is met.
   */
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const swipeDistance = touchStart - touchEnd;

    if (swipeDistance > SWIPE_THRESHOLD) nextSlide();
    if (swipeDistance < -SWIPE_THRESHOLD) prevSlide();
  };

  const nextSlide = () => {
    setCurrentIndex((previousIndex) => (previousIndex === aiReportList.length - 1 ? 0 : previousIndex + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((previousIndex) => (previousIndex === 0 ? aiReportList.length - 1 : previousIndex - 1));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, AUTOPLAY_INTERVAL_MS);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-4 md:py-6 px-6 max-w-4xl mx-auto z-10 relative" id="ai-reports">
      <div className="max-w-3xl mx-auto text-center mb-6">
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-midnight dark:text-cream leading-tight font-bold mb-4">
          Advanced AI <em className="text-amber-600 dark:text-amber-400 italic">Insights.</em>
        </h2>
      </div>

      {/* --- Desktop Grid Layout Section --- */}
      <div className="hidden md:grid md:grid-cols-2 gap-6 lg:gap-8 max-w-3xl mx-auto">
        {aiReportList.map((report) => (
          <div key={report.id} className="group overflow-hidden rounded-[2.5rem] bg-[#f8f9fa] dark:bg-[#0b0e14] border border-gray-100 dark:border-white/5 hover:border-[#b052ff]/30 hover:shadow-[0_0_30px_rgba(176,82,255,0.15)] transition-all duration-500 flex flex-col h-full relative">
            <div className="w-full h-56 lg:h-60 relative overflow-hidden rounded-t-[2.5rem]">
              <img
                src={report.image}
                alt={report.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-[1500ms] ease-out"
              />
            </div>

            <div className="px-6 pb-6 pt-4 flex flex-col flex-grow z-10 relative">
              <h3 className="font-serif text-xl lg:text-2xl text-midnight dark:text-white font-bold tracking-tight mb-2 leading-tight text-center">
                {report.title}
              </h3>
              <p className="font-body text-gray-600 dark:text-gray-300 text-xs sm:text-sm leading-relaxed mb-5 flex-grow text-justify">
                {report.description}
              </p>

              <div className="mt-auto flex justify-center">
                <a
                  href={report.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full ${getButtonColor(report.id)} text-white font-semibold tracking-wide text-xs hover:scale-105 transition-transform shadow-md`}
                >
                  {report.cta} <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- Mobile Carousel Layout Section --- */}
      <div
        className="md:hidden relative group px-0 touch-pan-y"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Mobile Carousel Content Section */}
        <div className="overflow-hidden rounded-[2.5rem] bg-[#f8f9fa] dark:bg-[#0b0e14] border border-gray-100 dark:border-white/5 hover:border-[#b052ff]/30 hover:shadow-[0_0_40px_rgba(176,82,255,0.15)] transition-all duration-500 relative h-[460px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="w-full h-full absolute inset-0"
            >
              {(() => {
                const report = aiReportList[currentIndex];
                return (
                  <div className="group/card flex flex-col h-full relative">
                    <div className="w-full h-[220px] pointer-events-none overflow-hidden rounded-t-[2.5rem] z-10 shrink-0">
                      <img
                        src={report.image}
                        alt={report.title}
                        className="w-full h-full object-cover object-center group-hover/card:scale-105 transition-transform duration-[1500ms] ease-out"
                      />
                    </div>

                    <div className="absolute inset-0 w-full h-full pointer-events-none rounded-[2.5rem] z-0">
                      <div className="absolute inset-0 bg-gradient-to-t from-[#f8f9fa] dark:from-[#0b0e14] via-transparent to-transparent bottom-0 h-1/2"></div>
                    </div>

                    <div className="w-full px-6 pt-5 pb-10 flex flex-col justify-start items-center text-center z-20 relative flex-grow">
                      <h3 className="font-serif text-[20px] xs:text-xl text-midnight dark:text-white font-bold tracking-tight mb-2 leading-tight">
                        {report.title}
                      </h3>
                      <p className="font-body text-gray-600 dark:text-gray-300 text-xs sm:text-sm leading-relaxed mb-5 max-w-sm mx-auto">
                        {report.description}
                      </p>

                      <div className="w-full flex justify-center">
                        <a
                          href={report.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex w-full max-w-[240px] justify-center items-center gap-1.5 px-4 py-2.5 rounded-full ${getButtonColor(report.id)} text-white font-semibold tracking-wide text-xs hover:scale-105 transition-transform shadow-lg pointer-events-auto`}
                        >
                          {report.cta} <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mobile Navigation Buttons Section */}
        <div className="absolute top-[85px] -translate-y-1/2 left-0 right-0 flex justify-between px-2 sm:px-4 md:-mx-6 pointer-events-none z-30">
          <button onClick={prevSlide} className={NAV_BUTTON_CLASSES} aria-label="Previous report">
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <button onClick={nextSlide} className={NAV_BUTTON_CLASSES} aria-label="Next report">
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Mobile Pagination Indicators Section */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-50">
          {aiReportList.map((_, reportIndex) => (
            <button
              key={reportIndex}
              onClick={() => setCurrentIndex(reportIndex)}
              className={`transition-all duration-500 rounded-full ${reportIndex === currentIndex
                ? 'w-6 h-1.5 bg-[#b052ff] dark:bg-[#b052ff] shadow-sm'
                : 'w-1.5 h-1.5 bg-gray-400 hover:bg-gray-500 dark:bg-white/40 dark:hover:bg-white/60 shadow-sm'
                }`}
              aria-label={`Go to slide ${reportIndex + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}