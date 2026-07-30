import { scrollToSection } from '../utils/scroll';

/** --- Data Definitions --- */

const QUICK_LINKS = [
  { label: 'Special Events', targetId: 'special-events' },
  { label: 'Panchang', targetId: 'daily-panchang' },
  { label: 'Store', targetId: `${import.meta.env.VITE_SITE_URL}/us/specials/astrology-products` },
  { label: 'Daily Horoscope', targetId: 'daily-widget' },
  { label: 'FAQ', targetId: 'faq-section' },
  { label: 'Membership', targetId: 'personalized-support' }
];

const SUPPORT_LINKS = [
  { label: 'support@astroved.com', href: 'mailto:support@astroved.com' },
  { label: 'Offline Payment', href: '/corporate-info/offline-payment' },
  { label: 'Contact Us', href: '/corporate-info/contact-us' },
  { label: 'Feedback', href: '/feedback' },
  { label: 'Site Map', href: '/corporate-info/sitemap' }
];

const CONTACT_INFO = [
  { title: 'Customer Care', lines: ['+91 9677391108', '+91 44 43419898'] },
  { title: 'Toll Free (India Only)', lines: ['1800 102 9098'] },
  { title: 'USA Contact', lines: ['+1 412-927 3625'] },
  { title: 'Whatsapp', lines: ['+91 9677391109'] }
];

/**
 * Returns the base Tailwind CSS classes for the main footer container.
 */
const getFooterBaseStyles = (): string => {
  return "relative z-10 bg-gradient-to-br from-ivory via-cream to-amber-50/30 dark:bg-gradient-to-br dark:from-[#0a0514] dark:via-[#1a0b2e] dark:to-[#0a0e17] backdrop-blur-xl border-t border-purple/10 dark:border-amber-500/40 dark:shadow-[0_0_15px_rgba(245,158,11,0.2)] py-8 md:py-8 px-6 transition-all duration-500 overflow-hidden";
};

/**
 * Returns the shared Tailwind CSS classes for footer section headings.
 */
const getHeadingStyles = (): string => {
  return "relative inline-block font-sans text-[15px] font-bold uppercase tracking-[0.1em] text-midnight dark:text-cream pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[3px] after:w-12 after:rounded-full after:bg-gradient-to-r after:from-saffron after:to-indigo dark:after:from-gold dark:after:to-purple";
};

/**
 * Returns the shared Tailwind CSS classes for standard footer text links.
 */
const getLinkStyles = (): string => {
  return "hover:text-orange-500 dark:hover:text-amber-400 hover:scale-[1.05] inline-block origin-left transition-all duration-200 text-left font-medium";
};

/**
 * Footer Component
 * 
 * Renders the global footer containing brand information, quick navigation links,
 * support links, contact details, and corporate office address.
 */
export function Footer() {
  return (
    <footer className={getFooterBaseStyles()}>

      {/* --- Ambient Background Glow --- */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-purple/5 dark:bg-gold/5 rounded-[100%] blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-12 gap-x-4 gap-y-6 md:gap-6 lg:gap-12 mb-6 md:mb-8">

        {/* --- Logo & Brand Column Section --- */}
        <div className="col-span-2 md:col-span-3 lg:col-span-3 space-y-3 md:space-y-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/50 dark:bg-transparent p-2 rounded-xl dark:rounded-none shadow-sm dark:shadow-none border border-purple/5 dark:border-none transition-all">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="cursor-pointer hover:opacity-80 transition-opacity outline-none"
                aria-label="Scroll to top"
              >
                <img
                  src={`${import.meta.env.VITE_CDN_URL}/images/images-av/AstroVed-Logo.svg`}
                  alt="AstroVed Logo"
                  className="h-10 w-auto object-contain dark:brightness-110 drop-shadow-sm"
                />
              </button>
            </div>
          </div>
          <p className="font-body text-[15px] text-slate-800 dark:text-slate-200 leading-relaxed">
            Your trusted guide for expert astrological insights, horoscopes, and daily cosmic timings.
          </p>
        </div>

        {/* --- Quick Links Section --- */}
        <div className="col-span-1 lg:col-span-2 space-y-3 md:space-y-4">
          <h4 className={getHeadingStyles()}>Explore</h4>
          <ul className="space-y-2 text-[15px] text-slate-800 dark:text-slate-200 font-medium">
            {QUICK_LINKS.map((linkData, linkIndex) => (
              <li key={linkIndex}>
                {linkData.targetId.startsWith('http') ? (
                  <a
                    href={linkData.targetId}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={getLinkStyles()}
                  >
                    {linkData.label}
                  </a>
                ) : (
                  <button
                    onClick={() => scrollToSection(linkData.targetId)}
                    className={getLinkStyles()}
                  >
                    {linkData.label}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* --- Support Links Section --- */}
        <div className="col-span-1 lg:col-span-2 space-y-3 md:space-y-4">
          <h4 className={getHeadingStyles()}>Support</h4>
          <ul className="space-y-2 text-[15px] text-slate-800 dark:text-slate-200 font-medium">
            {SUPPORT_LINKS.map((supportItem, supportIndex) => (
              <li key={supportIndex}>
                <a href={supportItem.href} className={getLinkStyles()}>
                  {supportItem.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* --- Contact Details Section --- */}
        <div className="col-span-2 md:col-span-1 lg:col-span-2 space-y-3 md:space-y-4">
          <h4 className={getHeadingStyles()}>Connect</h4>
          <div className="grid grid-cols-2 md:grid-cols-1 gap-4 text-[15px] text-slate-800 dark:text-slate-200 font-medium">
            {CONTACT_INFO.map((contactBlock, blockIndex) => (
              <div key={blockIndex}>
                <p className="text-midnight dark:text-cream font-bold mb-1">
                  {contactBlock.title}
                </p>
                {contactBlock.lines.map((textLine, lineIndex) => (
                  <p key={lineIndex} className="text-[#4a5c71] dark:text-slate-300 font-medium">{textLine}</p>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* --- Corporate Office Address Section --- */}
        <div className="col-span-2 md:col-span-3 lg:col-span-3 space-y-3 md:space-y-4">
          <h4 className={getHeadingStyles()}>Corporate Office</h4>
          <div className="space-y-1.5 text-[15px] text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
            <p className="flex gap-2">
              <span>4th Floor, A-Block, Prince Info Park,<br />Plot No. 81-B, 2nd Main Road,<br />Ambattur Industrial Estate, Chennai 600058.</span>
            </p>
            <p className="flex gap-2">
              <span>Phone: +91-44-43419898</span>
            </p>
          </div>

        </div>

      </div>

      {/* --- App Download Badges & Trust Seals --- */}
      <div className="relative max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 mb-8 flex-wrap w-full">
        <div className="flex items-center gap-4">
          <a href="https://play.google.com/store/apps/details?id=com.astroved.birthchartnew&pli=1" target="_blank" rel="noopener noreferrer" className="hover:opacity-90 transition-opacity">
            <img src={`${import.meta.env.VITE_CDN_URL}/images/images-av/play-store.png`} alt="Get it on Google Play" className="h-10 w-auto" />
          </a>
          <a href="https://apps.apple.com/us/app/astroved-astrology-remedies/id1406242342" target="_blank" rel="noopener noreferrer" className="hover:opacity-90 transition-opacity">
            <img src={`${import.meta.env.VITE_CDN_URL}/images/images-av/app-store.png`} alt="Download on the App Store" className="h-10 w-auto" />
          </a>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 md:ml-auto">
          <img src={`${import.meta.env.VITE_SITE_URL}/new/images/astroved-iso.png`} alt="ISO 9001:2015 Certified" className="h-10 w-auto object-contain mix-blend-multiply dark:mix-blend-normal dark:bg-white/90 dark:px-2 dark:py-1 dark:rounded" />
          <img src={`${import.meta.env.VITE_CDN_URL}/images/images-av/years-of-services.png`} alt="Years of Service" className="h-12 w-auto object-contain dark:drop-shadow-sm" />
          <img src={`${import.meta.env.VITE_CDN_URL}/images/images-av/sectigo_trust_seal.jpg`} alt="Sectigo Trust Seal" className="h-10 w-auto object-contain mix-blend-multiply dark:mix-blend-normal dark:bg-white/90 dark:px-1 dark:rounded" />
          <img src={`${import.meta.env.VITE_CDN_URL}/images/images-av/podbean-logo.png`} alt="Podbean" className="h-10 w-auto object-contain mix-blend-multiply dark:mix-blend-normal dark:bg-white/90 dark:px-2 dark:py-1 dark:rounded" />
        </div>
      </div>

      {/* --- Social Icons & Legal Footer Bar Section --- */}
      <div className="relative max-w-7xl mx-auto pt-6 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-purple/10 dark:border-amber-500/20">

        {/* Social Icons */}
        <div className="av-social-icons w-full md:w-auto flex justify-center md:justify-start">
          <ul className="flex flex-wrap items-center justify-center md:justify-start gap-4 max-w-[300px] md:max-w-none">
            <li className="mr-1">
              <span className="font-serif text-[16px] font-bold text-midnight dark:text-cream">Follow us :</span>
            </li>
            <li>
              <a href="https://www.facebook.com/astroved" aria-label="Facebook" rel="nofollow" target="_blank" className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700 text-[#1877F2] transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover:border-[#1877F2] hover:shadow-lg hover:shadow-[#1877F2]/20">
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
              </a>
            </li>
            <li>
              <a href="https://whatsapp.com/channel/0029VaAG971AInPbquhYnI3u" aria-label="WhatsApp Channel" rel="nofollow" target="_blank" className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700 text-[#25D366] transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover:border-[#25D366] hover:shadow-lg hover:shadow-[#25D366]/20">
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
              </a>
            </li>
            <li>
              <a href="https://twitter.com/astroved" aria-label="X (formerly Twitter)" rel="nofollow" target="_blank" className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700 text-black dark:text-white transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover:border-black dark:hover:border-slate-600 hover:shadow-lg hover:shadow-black/10">
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
              </a>
            </li>
            <li>
              <a href="https://www.youtube.com/channel/UCLzw8opUlMnSA2TQfj34K9w" aria-label="YouTube" rel="nofollow" target="_blank" className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700 text-[#FF0000] transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover:border-[#FF0000] hover:shadow-lg hover:shadow-[#FF0000]/20">
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.015 3.015 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.376.55 9.376.55s7.505 0 9.377-.55a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/astroved/" aria-label="Instagram" rel="nofollow" target="_blank" className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700 text-[#E1306C] transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover:border-[#E1306C] hover:shadow-lg hover:shadow-[#E1306C]/20">
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/company/astroved-com" aria-label="LinkedIn" rel="nofollow" target="_blank" className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700 text-[#0A66C2] transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover:border-[#0A66C2] hover:shadow-lg hover:shadow-[#0A66C2]/20">
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
              </a>
            </li>
          </ul>
        </div>

        {/* Legal Text */}
        <div className="flex flex-col md:items-end gap-2 text-center md:text-right">
          <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-slate-500 dark:text-slate-500/80">
            &copy; {new Date().getFullYear()} AstroVed. All traditional rights reserved.
          </span>
          <div className="flex gap-4 justify-center md:justify-end text-[10px] font-bold uppercase tracking-[0.2em]">
            <a href={import.meta.env.VITE_SITE_URL} className="text-slate-400 dark:text-slate-500 hover:text-indigo dark:hover:text-cream transition-colors">Privacy Directives</a>
            <span className="text-purple/20 dark:text-slate-700">&bull;</span>
            <a href={import.meta.env.VITE_SITE_URL} className="text-slate-400 dark:text-slate-500 hover:text-indigo dark:hover:text-cream transition-colors">Calculations Disclaimer</a>
          </div>
        </div>
      </div>
    </footer>
  );
}


