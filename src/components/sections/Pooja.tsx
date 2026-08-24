import { useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { 
  vedic_fire_lab,
  cosmic_planetary_blessing,
  img_birth_star,
  img_ashtalakshmi,
  img_vaidhyanatha,
  img_muruga,
  img_ketu,
  img_durga,
  img_sun,
  img_moon,
  img_mars,
  sacred_shiva_pooja
} from '../../assets/popularPoojas&homas';
interface LiveMomentCard {
  id: string;
  title: string;
  tag: string;
  urgency: string;
  image: string;
  description: string;
}

const POOJA_MOMENTS: LiveMomentCard[] = [
  { id: 'p1', title: 'Birth Star Pooja', tag: 'Auspicious Portal', urgency: 'Limited Seats', image: img_birth_star, description: 'Your birth star holds the key to your destiny. Honor your Janma Nakshatra for lifelong blessings.' },
  { id: 'p2', title: 'Ashtalakshmi Pooja', tag: 'Wealth Attraction', urgency: 'Auspicious Portal', image: img_ashtalakshmi, description: 'Ashtalakshmi embodies the eight divine forms of wealth. Invoke her supreme grace for abundant prosperity.' },
  { id: 'p3', title: 'Vaidhyanatha Pooja', tag: 'Divine Protection', urgency: 'Next 24 Hours', image: img_vaidhyanatha, description: 'Shield yourself against health disorders. This powerful spiritual therapy encircles you with healing positive vibrations.' },
  { id: 'p4', title: 'Muruga Pooja', tag: 'Obstacle Removal', urgency: 'This Week', image: img_muruga, description: 'Muruga combines exceptional courage and supreme intelligence. Secure your victory over all forms of negativity.' },
  { id: 'p5', title: 'Ketu Pooja', tag: 'Karma Clearing', urgency: 'Auspicious Portal', image: img_ketu, description: 'Ketu acts as a powerful karmic agent. Clear past karma and fulfill your deep spiritual quests.' },
  { id: 'p6', title: 'Durga Pooja', tag: 'Divine Protection', urgency: 'Limited Seats', image: img_durga, description: 'Durga is the aggressive form of divine Shakti. Harness her infinite protective power against all obstacles.' }
];

const HOMA_MOMENTS: LiveMomentCard[] = [
  { id: 'h1', title: 'Sun Fire Lab', tag: 'Planetary Blessings', urgency: 'Limited Seats', image: img_sun, description: 'Cause your energies to align with the Sun. Maximize planetary vibrations for ultimate success and authority.' },
  { id: 'h2', title: 'Moon Fire Lab', tag: 'Planetary Blessings', urgency: 'Auspicious Portal', image: img_moon, description: 'The Moon directly rules your mind and emotions. Balance your inner self and promote lasting peace.' },
  { id: 'h3', title: 'Mars Fire Lab', tag: 'Planetary Blessings', urgency: 'Next 24 Hours', image: img_mars, description: 'Mars is a fiercely passionate planet. Gain immense courage and overcome any financial hurdles you face.' },
  { id: 'h4', title: 'Mercury Fire Lab', tag: 'Planetary Blessings', urgency: 'This Week', image: vedic_fire_lab, description: 'Sharpen your intellect and hone your oratory skills. Keep the powers of profound learning within your grasp.' },
  { id: 'h5', title: 'Jupiter Fire Lab', tag: 'Planetary Blessings', urgency: 'Limited Seats', image: cosmic_planetary_blessing, description: 'Jupiter is the great teacher of humankind. Attract his divine blessings for success and higher wisdom.' },
  { id: 'h6', title: 'Venus Fire Lab', tag: 'Planetary Blessings', urgency: 'Auspicious Portal', image: vedic_fire_lab, description: 'Venus governs divine creativity and the female gender. Harness her energy for longevity, wealth, and happiness.' },
  { id: 'h7', title: 'Saturn Fire Lab', tag: 'Planetary Blessings', urgency: 'Next 24 Hours', image: cosmic_planetary_blessing, description: 'Appease the powerful planet Saturn. Overcome life’s greatest trials and let him guide you to the right path.' },
  { id: 'h8', title: 'Rahu Fire Lab', tag: 'Planetary Blessings', urgency: 'This Week', image: vedic_fire_lab, description: 'Make the best use of your circumstances. Overwhelm your adversaries and lead the life you truly desire.' }
];

const CarouselRow = ({ items, reverse = false }: { items: LiveMomentCard[], reverse?: boolean }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const repeatedItems = Array(20).fill(items).flat();
  
  // Shared state for scroll logic
  const state = useRef({
    isHovered: false,
    isDragging: false,
    isSnapping: false,
    isScrolling: false,
    snapTimeout: undefined as NodeJS.Timeout | undefined,
    scrollTimeout: undefined as NodeJS.Timeout | undefined,
    hoverTimeout: undefined as NodeJS.Timeout | undefined,
  });

  // Initialize scroll position to the middle to allow immediate swiping in both directions
  useEffect(() => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      // Use double requestAnimationFrame to ensure layout and images are calculated
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const singleSetWidth = container.scrollWidth / 20; // We now use 20 sets
          container.scrollLeft = singleSetWidth * 10; // Start exactly in the middle
        });
      });
    }
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let animationId: number;
    let lastTime: number;
    let exactScrollLeft: number | null = null;

    const handleScroll = () => {
      state.current.isScrolling = true;
      clearTimeout(state.current.scrollTimeout);
      state.current.scrollTimeout = setTimeout(() => {
        state.current.isScrolling = false;
        // Sync accumulator with reality once manual scroll physically stops
        if (container) exactScrollLeft = container.scrollLeft;
      }, 150); // 150ms without scroll events means momentum/snapping has physically stopped
    };

    const startScroll = (time: number) => {
      if (!lastTime) lastTime = time;
      const deltaTime = time - lastTime;
      lastTime = time;

      const container = scrollRef.current;
      if (!container) return;

      if (exactScrollLeft === null) {
        exactScrollLeft = container.scrollLeft;
      }

      const singleSetWidth = container.scrollWidth / 20; // We now use 20 sets
      
      // Original 40s marquee speed was roughly 38-40 pixels per second.
      // This ensures identical speed on 60Hz laptops and 120Hz mobile screens.
      const pixelsPerSecond = 40; 
      const scrollAmount = (pixelsPerSecond * deltaTime) / 1000;

      // Do not auto-scroll if currently hovered, dragging, OR waiting for snap to finish
      if (!state.current.isHovered && !state.current.isDragging && !state.current.isSnapping) {
        if (reverse) {
          exactScrollLeft -= scrollAmount;
        } else {
          exactScrollLeft += scrollAmount;
        }
        // Apply the precise float to the container. 
        // The browser will truncate to int, but our exactScrollLeft preserves the fraction!
        container.scrollLeft = exactScrollLeft;
      } else {
        // Keep accumulator synced with the actual scroll while the user interacts
        exactScrollLeft = container.scrollLeft;
      }

      // Seamless wrap boundary enforcement
      // We only wrap when the carousel has physically stopped moving (!isScrolling) and finger is off (!isDragging).
      // This is independent of the 3-second auto-scroll pause.
      if (!state.current.isDragging && !state.current.isScrolling) {
        if (container.scrollLeft <= singleSetWidth * 4) {
          // If drifting too far left, jump forward to the middle
          exactScrollLeft += singleSetWidth * 10;
          container.scrollLeft = exactScrollLeft;
        } else if (container.scrollLeft >= singleSetWidth * 16) {
          // If drifting too far right, jump back to the middle
          exactScrollLeft -= singleSetWidth * 10;
          container.scrollLeft = exactScrollLeft;
        }
      }

      animationId = requestAnimationFrame(startScroll);
    };

    animationId = requestAnimationFrame(startScroll);

    // Initial 3-second delay on page load before auto-scroll begins
    state.current.isSnapping = true;
    state.current.snapTimeout = setTimeout(() => {
      state.current.isSnapping = false;
    }, 3000);

    const handleMouseEnter = () => {
      clearTimeout(state.current.hoverTimeout);
      state.current.isHovered = true; // Pause scrolling when mouse enters
      
      // Force auto-scroll to resume after 5 seconds even if the mouse is still hovering
      state.current.hoverTimeout = setTimeout(() => {
        state.current.isHovered = false;
      }, 5000);
    };
    
    const handleMouseLeave = () => {
      // If they move the mouse away before 5 seconds, resume immediately
      clearTimeout(state.current.hoverTimeout);
      state.current.isHovered = false;
    };
    
    const handleTouchStart = () => {
      state.current.isDragging = true;
      state.current.isSnapping = false; // Cancel any existing snap wait
      clearTimeout(state.current.snapTimeout);
      if (container) {
        container.style.scrollSnapType = 'x mandatory';
      }
    };
    
    const handleTouchEnd = () => {
      state.current.isDragging = false;
      state.current.isSnapping = true; // Block auto-scroll so the browser can snap
      state.current.snapTimeout = setTimeout(() => {
        state.current.isSnapping = false;
        if (!state.current.isDragging && container) {
          container.style.scrollSnapType = 'none';
        }
      }, 3000); // 3 seconds wait after swipe before auto-scroll resumes
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('touchstart', handleTouchStart);
    container.addEventListener('touchend', handleTouchEnd);

    return () => {
      cancelAnimationFrame(animationId);
      clearTimeout(state.current.snapTimeout);
      clearTimeout(state.current.scrollTimeout);
      clearTimeout(state.current.hoverTimeout);
      container.removeEventListener('scroll', handleScroll);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [reverse]);

  const scrollByAmount = (amount: number) => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      
      // Pause auto-scroll for 3 seconds when clicking buttons
      state.current.isSnapping = true;
      clearTimeout(state.current.snapTimeout);
      
      // Temporarily enable snapping so the browser perfectly aligns the card to the center
      container.style.scrollSnapType = 'x mandatory';
      
      state.current.snapTimeout = setTimeout(() => {
        state.current.isSnapping = false;
        if (!state.current.isDragging) {
          container.style.scrollSnapType = 'none';
        }
      }, 3000);
      
      // Scroll by approximately one card width. 
      // The browser's snapping engine will catch it and perfectly center the nearest card!
      const scrollDist = amount > 0 ? 310 : -310;
      container.scrollBy({ left: scrollDist, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative group w-full flex">
      {/* Left Button (Always Visible) */}
      <button 
        onClick={() => scrollByAmount(-350)}
        className="flex absolute top-[80px] left-2 md:left-4 z-30 w-10 h-10 md:w-12 md:h-12 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-full shadow-[0_0_15px_rgba(0,0,0,0.1)] items-center justify-center text-amber-600 hover:bg-amber-50 dark:hover:bg-slate-700 transition-all"
        aria-label="Scroll left"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Scroll Container */}
      <div 
        ref={scrollRef}
        className="flex w-full overflow-x-auto gap-4 md:gap-6 py-4 px-2 items-stretch"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', scrollSnapType: 'none' }}
      >
        {/* We duplicate items 20 times to provide an absolutely massive endless runway for fast swipers */}
        {repeatedItems.map((item, idx) => (
          <a
            href={`#${item.id}`}
            key={`${item.id}-c-${idx}`}
            className="w-[280px] h-full min-h-[350px] rounded-[1.5rem] flex flex-col bg-white/90 dark:bg-[#0B1221]/90 backdrop-blur-xl border border-gray-200 dark:border-slate-800 shadow-xl dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] flex-shrink-0 snap-center snap-always group hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 relative z-10 p-3"
          >
            {/* Image Section */}
            <div className="relative w-full h-[140px] flex-shrink-0 rounded-[1.25rem] overflow-hidden mb-2 bg-slate-50">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2 left-2 bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-900/50 rounded-full px-2 py-1 flex items-center gap-1.5 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
                  <span className="text-[8px] text-rose-700 dark:text-rose-400 font-sans font-bold uppercase tracking-[0.1em]">{item.urgency}</span>
              </div>
            </div>

            {/* Text Section */}
            <div className="flex flex-col flex-1 px-1 pb-1">
              <span className="text-amber-600 dark:text-amber-500 font-sans text-[9px] uppercase tracking-[0.2em] font-extrabold mb-1 block">
                {item.tag}
              </span>
              <h4 className="font-serif text-[18px] font-bold text-[#0a192f] dark:text-white tracking-tight mb-1 leading-tight line-clamp-2">
                {item.title}
              </h4>
              <p className="font-sans text-gray-500 dark:text-slate-300 text-[12px] leading-relaxed mb-2 flex-1">{item.description}</p>
              
              <div className="mt-auto pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-center">
                <div className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#e67e22] to-[#d35400] group-hover:from-[#d35400] group-hover:to-[#c0392b] text-white font-sans text-[10px] uppercase tracking-widest font-extrabold px-6 py-2.5 rounded-full transition-all duration-300 w-full shadow-[0_8px_20px_-5px_rgba(230,126,34,0.4)] group-hover:shadow-[0_12px_25px_-5px_rgba(230,126,34,0.5)] cursor-pointer">
                  Participate
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Right Button (Always Visible) */}
      <button 
        onClick={() => scrollByAmount(350)}
        className="flex absolute top-[80px] right-2 md:right-4 z-30 w-10 h-10 md:w-12 md:h-12 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-full shadow-[0_0_15px_rgba(0,0,0,0.1)] items-center justify-center text-amber-600 hover:bg-amber-50 dark:hover:bg-slate-700 transition-all"
        aria-label="Scroll right"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};

export function Pooja() {
  return (
    <section className="pt-4 md:pt-6 pb-0 border-y border-black/10 dark:border-amber-500/40 dark:shadow-[0_0_15px_rgba(245,158,11,0.2)] relative overflow-hidden transition-colors duration-500 z-10" id="live-moments">
      <div className="max-w-7xl mx-auto px-6 mb-6 flex flex-col items-center justify-center text-center relative z-20">
        <span className="text-amber-600 dark:text-amber-400 font-sans text-xs md:text-sm uppercase tracking-widest font-bold mb-2 text-center block w-full">
          EXPERIENCE THE POWER OF ANCIENT VEDIC RITUALS
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-tight font-bold mb-2">
          <span className="text-midnight dark:text-cream">Authentic Poojas </span>
          <span className="text-[#d35400] dark:text-orange-400">& Homas</span>
        </h2>
      </div>

      {/* Dual-row stream - Full Width */}
      <div className="space-y-6 relative w-full overflow-hidden">
        {/* Row 1 - Left to Right (Poojas) */}
        <CarouselRow items={POOJA_MOMENTS} reverse={false} />

        {/* Row 2 - Right to Left (Homas) */}
        <CarouselRow items={HOMA_MOMENTS} reverse={true} />
      </div>
      <style>{`
        /* Hide scrollbar for Chrome, Safari and Opera */
        .overflow-x-auto::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}