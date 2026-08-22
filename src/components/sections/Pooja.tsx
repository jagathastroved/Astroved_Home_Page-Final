import { ChandraMoon, guru_pushya_yoga, pradosham, Rahu_Ketu_Node_shift, sun_transit } from '../../assets/Auspicious_portal';

interface LiveMomentCard {
  id: string;
  title: string;
  tag: string;
  urgency: string;
  image: string;
  description: string;
}

const POOJA_MOMENTS: LiveMomentCard[] = [
  { id: 'p1', title: 'Guru Pushya Yoga Pooja', tag: 'Double Wealth Transit', urgency: 'Limited Seats', image: guru_pushya_yoga, description: 'Participate in this rare planetary alignment to attract immense wealth and prosperity into your life.' },
  { id: 'p2', title: 'Rahu-Ketu Node Shift Pooja', tag: '18-Month Cycle Launch', urgency: 'Auspicious Portal', image: Rahu_Ketu_Node_shift, description: 'Harness the power of the 18-month node shift to overcome obstacles and initiate new beginnings.' },
  { id: 'p3', title: 'Pradosham Karma Cleansing Pooja', tag: 'Twilight Energy Peak', urgency: 'Next 24 Hours', image: pradosham, description: 'Cleanse your deep-rooted karmic debts during this powerful twilight energy peak.' },
  { id: 'p4', title: 'Surya Sun Transit Pooja', tag: 'Intellectual Solar Inflow', urgency: 'This Week', image: sun_transit, description: 'Receive the intellectual and solar blessings of the Sun transit for career and personal growth.' },
  { id: 'p5', title: 'Chandra Moon Nakshatra Pooja', tag: 'Highest Healing Day', urgency: 'Auspicious Portal', image: ChandraMoon, description: 'Experience profound healing and emotional balance on this highest healing nakshatra day.' }
];

const HOMA_MOMENTS: LiveMomentCard[] = [
  { id: 'h1', title: 'Maha Ganapati Homa', tag: 'Obstacle Removal', urgency: 'Limited Seats', image: pradosham, description: 'Invoke the Supreme Elephant God to shatter all obstacles blocking your path to success.' },
  { id: 'h2', title: 'Navagraha Homa', tag: 'Planetary Balance', urgency: 'Auspicious Portal', image: sun_transit, description: 'Balance the energies of the nine planets to bring harmony and peace to your daily life.' },
  { id: 'h3', title: 'Sudarshana Homa', tag: 'Divine Protection', urgency: 'Next 24 Hours', image: guru_pushya_yoga, description: 'Seek divine protection from negative forces with the powerful Sudarshana chakra energy.' },
  { id: 'h4', title: 'Lakshmi Kubera Homa', tag: 'Wealth Attraction', urgency: 'This Week', image: ChandraMoon, description: 'Attract immense wealth, luxury, and financial stability with the blessings of Goddess Lakshmi.' },
  { id: 'h5', title: 'Rudra Homa', tag: 'Karma Clearing', urgency: 'Closes in 3 days', image: Rahu_Ketu_Node_shift, description: 'Clear deep karmic blockages and achieve spiritual liberation through this powerful Rudra homa.' }
];

export function Pooja() {
  return (
    <section className="py-6 md:py-8 border-y border-black/10 dark:border-amber-500/40 dark:shadow-[0_0_15px_rgba(245,158,11,0.2)] relative overflow-hidden transition-colors duration-500 z-10 bg-slate-50 dark:bg-[#0a0514]" id="live-moments">
      <div className="max-w-7xl mx-auto px-6 mb-12 flex flex-col items-center justify-center text-center relative z-20">
        <span className="font-2xl uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400 font-bold block mb-4">
          LIVE HOROLOGICAL STREAM
        </span>
        <h2 className="font-sans text-4xl md:text-5xl text-midnight dark:text-cream tracking-wider">
          Auspicious Portals & Transits
        </h2>
      </div>

      {/* Marquee dual-row stream */}
      <div className="space-y-6 relative w-full overflow-hidden">
        {/* Row 1 - Left to Right (Poojas) */}
        <div className="flex w-fit animate-[marquee_40s_linear_infinite] hover:[animation-play-state:paused] gap-6 py-2">
          {[...POOJA_MOMENTS, ...POOJA_MOMENTS, ...POOJA_MOMENTS].map((item, idx) => {
            return (
              <a
                href={`#${item.id}`}
                key={`${item.id}-r1-${idx}`}
                className="w-[280px] h-[350px] rounded-[1.5rem] flex flex-col bg-white/90 dark:bg-[#0B1221]/90 backdrop-blur-xl border border-gray-200 dark:border-slate-800 shadow-xl dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] flex-shrink-0 group hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 relative z-10 p-3"
              >
                {/* Image Section */}
                <div className="relative w-full h-[140px] rounded-[1.25rem] overflow-hidden mb-3 bg-slate-50">
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
                  {/* Badge */}
                  <span className="text-amber-600 dark:text-amber-500 font-sans text-[9px] uppercase tracking-[0.2em] font-extrabold mb-1.5 block">
                    {item.tag}
                  </span>

                  {/* Title */}
                  <h4 className="font-serif text-[18px] font-bold text-[#0a192f] dark:text-white tracking-tight mb-2 leading-tight line-clamp-2">{item.title}</h4>
                  
                  {/* Description (Full text) */}
                  <p className="font-sans text-gray-500 dark:text-slate-300 text-[12px] leading-relaxed mb-3 flex-1">{item.description}</p>
                  
                  {/* CTA Button */}
                  <div className="mt-auto pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-center">
                    <div className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#e67e22] to-[#d35400] group-hover:from-[#d35400] group-hover:to-[#c0392b] text-white font-sans text-[10px] uppercase tracking-widest font-extrabold px-6 py-2.5 rounded-full transition-all duration-300 w-full shadow-[0_8px_20px_-5px_rgba(230,126,34,0.4)] group-hover:shadow-[0_12px_25px_-5px_rgba(230,126,34,0.5)] cursor-pointer">
                      Participate
                    </div>
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        {/* Row 2 - Right to Left (Homas) */}
        <div className="flex w-fit animate-[marquee-reverse_40s_linear_infinite] hover:[animation-play-state:paused] gap-6 py-2">
          {[...HOMA_MOMENTS, ...HOMA_MOMENTS, ...HOMA_MOMENTS].map((item, idx) => {
            return (
              <a
                href={`#${item.id}`}
                key={`${item.id}-r2-${idx}`}
                className="w-[280px] h-[350px] rounded-[1.5rem] flex flex-col bg-white/90 dark:bg-[#0B1221]/90 backdrop-blur-xl border border-gray-200 dark:border-slate-800 shadow-xl dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] flex-shrink-0 group hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 relative z-10 p-3"
              >
                {/* Image Section */}
                <div className="relative w-full h-[140px] rounded-[1.25rem] overflow-hidden mb-3 bg-slate-50">
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
                  {/* Badge */}
                  <span className="text-amber-600 dark:text-amber-500 font-sans text-[9px] uppercase tracking-[0.2em] font-extrabold mb-1.5 block">
                    {item.tag}
                  </span>

                  {/* Title */}
                  <h4 className="font-serif text-[18px] font-bold text-[#0a192f] dark:text-white tracking-tight mb-2 leading-tight line-clamp-2">{item.title}</h4>
                  
                  {/* Description (Full text) */}
                  <p className="font-sans text-gray-500 dark:text-slate-300 text-[12px] leading-relaxed mb-3 flex-1">{item.description}</p>
                  
                  {/* CTA Button */}
                  <div className="mt-auto pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-center">
                    <div className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#e67e22] to-[#d35400] group-hover:from-[#d35400] group-hover:to-[#c0392b] text-white font-sans text-[10px] uppercase tracking-widest font-extrabold px-6 py-2.5 rounded-full transition-all duration-300 w-full shadow-[0_8px_20px_-5px_rgba(230,126,34,0.4)] group-hover:shadow-[0_12px_25px_-5px_rgba(230,126,34,0.5)] cursor-pointer">
                      Participate
                    </div>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        @keyframes marquee-reverse {
          0% { transform: translateX(-33.333%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </section>
  );
}