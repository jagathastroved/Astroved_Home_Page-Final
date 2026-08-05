import { useState, useEffect } from "react";
import {
  Sun,
  Moon,
  Menu,
  X,
  Sparkles,
  ShoppingBag,
  Map,
  Hand,
  Crown,
  Clock,
  Star,
  Coins,
  ShieldCheck,
  Gift,
  BookOpen,
  ChevronRight,
  Zap,
  Compass,
  Gem,
  Leaf,
  Flame,
  Eye,
  Heart,
  Users,
  TrendingUp,
  Calendar,
  Award,
  Settings,
  User,
  Mail,
  Phone,
  Building,
  FileText,
  ShoppingCart,
  Video,
  ChevronDown,
  CircleDot,
  Hexagon,
  Target,
  Medal,
  Search,
} from "lucide-react";
import { motion, AnimatePresence, Variants } from "motion/react";
import { useTheme } from "../context/ThemeProvider";
import { scrollToSection } from "../utils/scroll";
import { LoginModal } from "../components/sections/Account/LoginModel";
import { MyAccount } from "../components/sections/Account/MyAccount";
import "../components/sections/Account/Account.css";
import "./navbar.css";
/** --- Custom Hoisted SVG Icon Components to prevent TDZ errors --- */

// MessageCircle component for chat icon
function MessageCircle({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

// GalleryIcon component for gallery items
function GalleryIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  );
}

/** --- Data Definitions --- */

// Icon mapping for dropdown items using strictly safe and guaranteed exports
const ITEM_ICONS: Record<string, any> = {
  "Live Astrology Consultation": Users,
  "Instant Insight": Zap,
  "Consult & Counsel With Vijayalakshmi": User,
  "Nadi Astrology": Compass,
  "Talk To Astrologer": Mail,
  "Chat With Astrologer": MessageCircle,
  "Palm Reading": Hand,
  "Agastya Live Channel Reading": Eye,
  "Goddess Angali Channel Reading": Heart,
  "Karuppasamy Channel Reading": ShieldCheck,
  "Personalized Astrology Reports": TrendingUp,
  "Planetary Transit Reports": Calendar,
  "2026 Prediction Report": Award,
  "Coconut Smashing": Flame,
  Pradosham: Clock,
  "Rameshwaram Remedies": Map,
  "Planetary Remedies": Star,
  "Ancestral Remedies": Users,
  "Cow Feeding & Donation": Gift,
  "Dosha Remedies": ShieldCheck,
  "Kerala Remedies": Compass,
  "Proxy Mantra Writing": BookOpen,
  Homas: Flame,
  "Grand Homas": Crown,
  "AstroVed Temple Services": Building,
  "Instant Pooja And Homa": Sparkles,
  "Special Poojas": Star,
  "Special Abishekams": DropletIcon,
  "Online Priest Service": Users,
  "Energized Products": Zap,
  Rudraksha: Compass,
  Yantras: Hexagon,
  "Copper Amulets": ShieldCheck,
  Statues: Crown,
  Malas: Gem,
  Bracelets: Target,
  Pendants: Medal,
  "Incense Sticks": Flame,
  "Free Horoscope - Daily, Weekly & Monthly": Calendar,
  "Free Birth Chart Astrology Report": Map,
  "Free Birth Star Astrology Report": Star,
  "Free Moon Sign Report": Moon,
  "Free Numerology Report": TrendingUp,
  "Free Planetary Influence Report": ShieldCheck,
  "Free Hora Astrology Report": Clock,
  "Check Zodiac Compatibility": Users,
  "Panchang & Nakshatra": Compass,
  "More Astrology Services": Sparkles,
  "Full 30 2026": Calendar,
  Astropedia: BookOpen,
  Article: FileText,
  Blog: BookOpen,
  "Free 2026 Calendar": Calendar,
  Newsletter: Mail,
  "Contact Us": Mail,
  "AstroVed Apps": ShoppingBag,
  "Astrology Podcast": Users,
  "Events Calendar": Calendar,
  Gallery: GalleryIcon,
  "Store Reviews": Star,
  Testimonials: Users,
  "Live TV": Eye,
};

// Droplet icon fallback SVG
function DropletIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22a7 7 0 0 0 7-7c0-4.3-7-11-7-11S5 10.7 5 15a7 7 0 0 0 7 7z" />
    </svg>
  );
}

interface CurrentUser {
  fullName: string;
}
function readStoredUser(): CurrentUser | null {
  try {
    var GetName = document.cookie.match(
      new RegExp("(^| )" + "FullName" + "=([^;]+)"),
    );
    var match1 = GetName ? GetName[2] : null;
    var GetAuth = document.cookie.match(
      new RegExp("(^| )" + ".ASPXFORMSAUTH" + "=([^;]+)"),
    );
    var match2 = GetAuth ? GetAuth[2] : null;
    var GetCustomerId = document.cookie.match(
      new RegExp("(^| )" + "C_Id" + "=([^;]+)"),
    );
    var match3 = GetCustomerId ? GetCustomerId[2] : null;
    if (match3 != null) {
      const tempObj: CurrentUser = {
        fullName: match1 ?? "",
      };
      return tempObj;
    }
    return null;
  } catch {
    return null;
  }
}
const UserIcon = (
  <svg
    aria-hidden="true"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c0-4 4-6.5 8-6.5s8 2.5 8 6.5" />
  </svg>
);

/**
 * --- Shared Tailwind CSS Classes ---
 * RESPONSIVE STRATEGY:
 * Nav text, button text, logo size, padding and gaps all use clamp()
 * so they scale down SMOOTHLY as the viewport narrows below ~1170px —
 * no sudden jump, no overlap with the logo. The mobile hamburger only
 * kicks in below 900px, where there truly isn't room left to squeeze
 * (7 links + 2 buttons + logo).
 */

const HEADER_STYLES =
  "sticky top-0 z-50 bg-gradient-to-r from-[#f3e8ff]/95 via-[#fae8ff]/95 to-[#fce7f3]/95 dark:bg-gradient-to-r dark:from-[#1e1b4b]/95 dark:via-[#3b0764]/95 dark:to-[#0a0e17]/95 backdrop-blur-md transition-colors duration-500 shadow-sm";
const MOBILE_TOGGLE_STYLES =
  "max-[900px]:flex min-[901px]:hidden p-2 -ml-2 rounded-full border border-amber-400/25 text-purple-700 dark:text-amber-400 hover:bg-amber-400/10 transition-colors";

// Text scales smoothly with viewport width (clamp: min 12px, max 17px) so it never overlaps the logo/buttons as the screen narrows.
const DESKTOP_NAV_LINK_STYLES =
  "relative flex items-center gap-0.5 px-[clamp(2px,0.4vw,14px)] py-[clamp(6px,0.6vw,12px)] text-midnight/80 dark:text-cream/90 hover:text-amber-600 dark:hover:text-amber-400 transition-all duration-300 ease-out font-sans tracking-normal text-[clamp(12px,1.3vw,17px)] font-normal group whitespace-nowrap";
const THEME_TOGGLE_STYLES =
  "hidden relative p-1.5 lg:p-1.5 xl:p-2.5 rounded-full border border-amber-400/25 text-purple-700 dark:text-amber-400 hover:bg-amber-400/10 transition-all duration-300 shadow-sm";
const MOBILE_DRAWER_STYLES =
  "max-[900px]:flex min-[901px]:hidden fixed top-0 left-0 z-40 w-[85%] sm:w-80 h-[100dvh] overflow-hidden bg-[#F8F6FC] dark:bg-[#0a0514] shadow-2xl flex-col";
const MOBILE_NAV_LINK_WRAPPER_STYLES =
  "group flex items-center w-full p-3 rounded-xl hover:bg-midnight/5 dark:hover:bg-white/5 transition-all duration-300 relative z-10";

/* Buttons — text + padding both scale down with clamp() as the viewport narrows */

// const DESKTOP_KUNDALI_BTN = "hidden min-[901px]:block px-[clamp(8px,1.1vw,24px)] py-[clamp(6px,0.7vw,12px)] rounded-full bg-gradient-to-r from-purple-600 to-orange-500 text-white text-[clamp(11px,1.15vw,16px)] font-sans tracking-wide font-normal hover:shadow-lg hover:shadow-orange-500/30 hover:-translate-y-0.5 transition-all duration-300 whitespace-nowrap text-center border border-orange-400/30";
// const DESKTOP_SIGNIN_BTN = "hidden min-[901px]:block px-[clamp(8px,1.1vw,24px)] py-[clamp(6px,0.7vw,12px)] rounded-full backdrop-blur-sm bg-white/40 dark:bg-black/20 border border-midnight/20 dark:border-cream/20 text-midnight/90 dark:text-cream text-[clamp(11px,1.15vw,16px)] font-sans tracking-wide font-normal hover:bg-white/80 dark:hover:bg-white/10 hover:border-purple-500/50 hover:text-purple-700 transition-all duration-300 whitespace-nowrap text-center";

const DESKTOP_SIGNIN_BTN =
  "hidden min-[901px]:block px-[clamp(12px,1.5vw,24px)] py-[clamp(6px,0.7vw,12px)] rounded-[20px] bg-[#675df3] hover:bg-[#5249db] transition-colors text-white font-sans font-normal text-[clamp(11px,1.15vw,15px)] shadow-sm whitespace-nowrap text-center";
// Shared circular icon-button style for Search (mobile trigger) & Cart — scales with clamp() like everything else.
const ICON_BTN_STYLES =
  "relative flex items-center justify-center p-[clamp(6px,0.9vw,10px)] rounded-full border border-amber-400/25 text-purple-700 dark:text-amber-400 hover:bg-amber-400/10 transition-all duration-300 shrink-0";

// const MOBILE_KUNDALI_BTN = "relative w-full py-3.5 rounded-xl overflow-hidden group shadow-lg shadow-amber-500/25 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-orange-500 transition-colors inline-block text-center";

const MOBILE_SIGNIN_BTN =
  "relative w-full py-3.5 rounded-xl overflow-hidden group border-2 border-midnight/60 dark:border-cream/60 hover:bg-midnight/5 dark:hover:bg-cream/10 transition-colors coloroverwrite";

/** Stagger Animation Variants for Menu Items */
const dropdownVariants: Variants = {
  hidden: { opacity: 0, y: 10, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: 8,
    scale: 0.98,
    transition: { duration: 0.12, ease: "easeInOut" },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 5 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 350, damping: 25 },
  },
};

/**
 * Navbar Component
 * Top-level global navigation component for the application.
 * Fully responsive: text size stays fixed at every breakpoint,
 * padding/gaps shrink with viewport width instead.
 */

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [activeMobileSubMenu, setActiveMobileSubMenu] = useState<string | null>(
    null,
  );
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [navLinks, setNavLinks] = useState<any[]>([]);
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(() =>
    readStoredUser(),
  );
  const [isAccountPanelOpen, setAccountPanelOpen] = useState(false);
  const [isPanelOpen, setPanelOpen] = useState(false);
  const [placeholder, setPlaceholder] = useState("Search...");

  useEffect(() => {
    let isMounted = true;

    async function loadCartCount() {
      const count = await updatecartCount();
      //if (isMounted)
      setCartCount(count);
    }

    loadCartCount();

    return () => {
      isMounted = false;
    };
  }, []);
  const openLoginPanel = async () => {
    setPanelOpen(true);
    setAccountPanelOpen(false);
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    fetch("/mainmenunew.json")
      .then((res) => res.json())
      .then((data) => {
        const formatUrl = (url: string) => {
          if (!url || url === "javascript:void(0)") return undefined;
          if (url.startsWith("http")) return url;
          return `${import.meta.env.VITE_SITE_URL}${url.startsWith("/") ? url : "/" + url}`;
        };

        const formatted = data
          .filter((menu: any) => menu.name !== "108 Divya Desam")
          .map((menu: any) => {
            let icon = Sparkles;
            let label = menu.name;

            return {
              label: label,
              id: menu.name.toLowerCase().replace(/\s+/g, "-"),
              href: formatUrl(menu.link),
              icon: icon,
              color: "text-purple-600 dark:text-purple-400",
              items:
                menu.sub && menu.sub.length > 0
                  ? menu.sub.map((s: any) => ({
                      label: s.name,
                      href: formatUrl(s.link),
                    }))
                  : undefined,
            };
          });
        setNavLinks(formatted);
      })
      .catch((err) => console.error("Error fetching menu:", err));
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = (targetId: string) => {
    setIsMobileMenuOpen(false);
    setTimeout(() => scrollToSection(targetId), 300);
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery("");
  };

  const handleMobileLinkClick = (navItem: any) => {
    if (navItem.items) {
      // Toggle accordion submenu in mobile drawer
      setActiveMobileSubMenu(
        activeMobileSubMenu === navItem.label ? null : navItem.label,
      );
    } else {
      if (navItem.href) {
        window.location.href = navItem.href;
      } else {
        handleNavClick(navItem.id);
      }
    }
  };

  const handleSearch = () => {
    const trimmed = searchQuery.trim();

    if (trimmed !== "") {
      window.location.href = "/?s=" + encodeURIComponent(trimmed);
    } else {
      setPlaceholder("Explore Your Astrological Solutions");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    } else if (e.key === "Escape") {
      closeSearch();
    }
  };

  const refreshCartCount = async () => {
    const count = await updatecartCount();
    setCartCount(count);
  };

  useEffect(() => {
    let isMounted = true;

    async function loadCartCount() {
      const count = await updatecartCount();
      if (isMounted) setCartCount(count);
    }

    loadCartCount();

    return () => {
      isMounted = false;
    };
  }, []);

  const GotoCheckout = () => {
    window.location.href = "/shoppingcart.aspx";
  };
  const updatecartCount = async () => {
    try {
      debugger;
      const response = await fetch("/mycartnew.aspx", {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Cart count request failed: ${response.status}`);
      }

      const text = await response.text();
      const match = text.match(/id=["']lblcount["']>(\d+)</);
      const count = match ? parseInt(match[1], 10) : 0;
      return isNaN(count) ? 0 : count;
    } catch {
      return 0;
    }
  };

  return (
    <>
      <header className={HEADER_STYLES}>
        <div className="relative w-full max-w-[1600px] mx-auto flex items-center justify-between px-[clamp(10px,2vw,24px)] py-3 gap-2">
          {/* --- Floating Dropdown Search (All Screen Sizes) --- */}
          <AnimatePresence>
            {isSearchOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full right-4 z-50 flex items-center gap-2.5 px-4 py-3 mt-2 w-[calc(100vw-32px)] sm:w-80 rounded-2xl bg-white/95 dark:bg-[#0a0514]/95 backdrop-blur-xl shadow-2xl border border-purple-200/50 dark:border-purple-800/50"
              >
                <Search className="w-5 h-5 text-purple-700 dark:text-amber-400 shrink-0" />
                <input
                  autoFocus
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={placeholder}
                  className="flex-1 min-w-0 bg-transparent outline-none text-[16px] text-midnight dark:text-cream placeholder:text-midnight/40 dark:placeholder:text-cream/40"
                />
                <button
                  onClick={closeSearch}
                  aria-label="Close search"
                  className="shrink-0 p-1.5 rounded-full text-purple-700 dark:text-amber-400 hover:bg-amber-400/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* --- Logo & Mobile Toggle --- */}
          <div className="flex items-center gap-1.5 lg:gap-3 shrink-0">
            <button
              className={MOBILE_TOGGLE_STYLES}
              onClick={() => {
                const willOpen = !isMobileMenuOpen;
                setIsMobileMenuOpen(willOpen);
                if (willOpen) setIsSearchOpen(false);
              }}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="cursor-pointer hover:opacity-80 transition-opacity shrink-0"
            >
              <img
                src={`${import.meta.env.VITE_CDN_URL}/images/images-av/AstroVed-Logo.svg`}
                alt="AstroVed Logo"
                className="h-[clamp(22px,3vw,40px)] w-auto max-w-[clamp(85px,10vw,150px)] object-contain brightness-100 dark:brightness-110"
              />
            </button>
          </div>

          {/* --- Desktop Navigation --- */}
          <nav className="hidden min-[901px]:flex flex-1 justify-end items-center gap-[clamp(0px,0.15vw,3px)] pr-[clamp(2px,0.8vw,16px)] font-medium min-w-0">
            {navLinks.map((navItem, index) => (
              <div
                key={navItem.label}
                className="relative py-2 shrink-0"
                onMouseEnter={() =>
                  navItem.items && setHoveredLink(navItem.label)
                }
                onMouseLeave={() => setHoveredLink(null)}
              >
                {navItem.href ? (
                  <a href={navItem.href} className={DESKTOP_NAV_LINK_STYLES}>
                    {navItem.label}
                    {navItem.items && (
                      <ChevronDown className="w-2.5 h-2.5 xl:w-3 xl:h-3 opacity-50 group-hover:opacity-100 transition-opacity" />
                    )}
                    <span className="absolute -bottom-1 left-0 w-full h-[2.5px] bg-gradient-to-r from-[#9333ea] to-orange-500 rounded-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out shadow-[0_0_8px_rgba(249,115,22,0.4)]" />
                  </a>
                ) : (
                  <button
                    onClick={() => handleNavClick(navItem.id)}
                    className={DESKTOP_NAV_LINK_STYLES}
                  >
                    {navItem.label}
                    {navItem.items && (
                      <ChevronDown className="w-2.5 h-2.5 xl:w-3 xl:h-3 opacity-50 group-hover:opacity-100 transition-opacity" />
                    )}
                    <span className="absolute -bottom-1 left-0 w-full h-[2.5px] bg-gradient-to-r from-[#9333ea] to-orange-500 rounded-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out shadow-[0_0_8px_rgba(249,115,22,0.4)]" />
                  </button>
                )}

                {/* Professional Divided List Dropdown with Mapped Symbols */}
                <AnimatePresence>
                  {navItem.items && hoveredLink === navItem.label && (
                    <motion.div
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className={`absolute top-full mt-2 backdrop-blur-2xl rounded-2xl p-2 z-50 border
                      bg-white/95 border-purple-200/50 shadow-[0_15px_45px_rgba(93,95,239,0.08)]
                      dark:bg-[#080512]/98 dark:border-purple-900/30 dark:shadow-[0_20px_50px_rgba(0,0,0,0.75)]
                      w-[320px] flex flex-col gap-0 ${
                        navLinks.length - index <= 2
                          ? "right-0"
                          : "left-1/2 -translate-x-1/2"
                      }`}
                    >
                      {/* Glowing Top Slim Divider */}
                      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-purple-500 dark:via-amber-400 to-transparent pointer-events-none" />

                      <div className="flex flex-col gap-0 overflow-y-auto overscroll-contain max-h-[45vh] pr-2 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-track]:my-2 [&::-webkit-scrollbar-thumb]:bg-[#d0cff6] dark:[&::-webkit-scrollbar-thumb]:bg-[#675df3]/50 [&::-webkit-scrollbar-thumb]:rounded-full">
                        {navItem.items.map((item: any, idx: number) => {
                          const Icon = ITEM_ICONS[item.label] || Sparkles;
                          return (
                            <div key={idx} className="flex flex-col">
                              {idx > 0 && (
                                <div className="border-t border-dotted border-purple-300/50 dark:border-purple-800/50 w-[90%] mx-auto" />
                              )}
                              <motion.a
                                href={item.href}
                                variants={itemVariants}
                                className="group relative flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-150 cursor-pointer min-w-0
                                hover:bg-[#a855f7]/5 dark:hover:bg-amber-400/5"
                              >
                                {/* Celestial Mapped Symbol Icon */}
                                <Icon className="w-4 h-4 lg:w-4 lg:h-4 2xl:w-5 2xl:h-5 text-[#9333ea]/70 dark:text-amber-400/80 group-hover:scale-110 transition-transform duration-200 flex-shrink-0" />

                                <span className="font-sans text-[15px] lg:text-[16px] 2xl:text-[18px] font-normal text-slate-700 dark:text-cream/90 group-hover:text-[#7e22ce] dark:group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all duration-200 text-left whitespace-normal break-words leading-snug flex-1 pr-4">
                                  {item.label}
                                </span>

                                <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-60 transition-opacity duration-200 text-[#9333ea] dark:text-amber-400 flex-shrink-0" />
                              </motion.a>
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* --- Desktop Actions & Theme Toggle --- */}
          <div className="flex items-center justify-end gap-[clamp(4px,0.6vw,10px)] shrink-0">
            {/* Search — icon-only trigger, opens full-width overlay below navbar */}
            <button
              onClick={() => {
                setIsSearchOpen(true);
                setIsMobileMenuOpen(false);
              }}
              aria-label="Open search"
              className={ICON_BTN_STYLES}
            >
              <Search className="w-[18px] h-[18px]" />
            </button>

            {/* Cart — same icon button at every screen size */}
            <button
              aria-label="Cart"
              className={ICON_BTN_STYLES}
              onClick={GotoCheckout}
            >
              <ShoppingCart className="w-[clamp(15px,1.1vw,19px)] h-[clamp(15px,1.1vw,19px)]" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center min-w-[20px] h-[20px] px-1 rounded-full bg-orange-500 text-white text-[12px] font-bold leading-none">
                  {cartCount}
                </span>
              )}
            </button>

            {/* {currentUser ? (
              <button onClick={() => setAccountPanelOpen(true)} aria-label="User Account" className={ICON_BTN_STYLES}>
                <User className="w-[clamp(15px,1.1vw,19px)] h-[clamp(15px,1.1vw,19px)]" />
              </button>
            ) : (
              <button className={DESKTOP_SIGNIN_BTN} onClick={openLoginPanel}>Sign In</button>
            )} */}
            {currentUser ? (
              <button
                type="button"
                className="user-chip"
                onClick={() => setAccountPanelOpen(true)}
              >
                <span className="user-chip__icon">{UserIcon}</span>
                <span className="user-chip__name">{currentUser.fullName}</span>
              </button>
            ) : (
              <button className={DESKTOP_SIGNIN_BTN} onClick={openLoginPanel}>
                Sign In
              </button>
            )}
            <button
              onClick={toggleTheme}
              className={THEME_TOGGLE_STYLES}
              aria-label="Toggle Theme"
            >
              <AnimatePresence mode="wait">
                {theme === "light" ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.35 }}
                  >
                    <Sun className="w-4 h-4 sm:w-5 sm:h-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.35 }}
                  >
                    <Moon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* --- Mobile Drawer --- */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="max-[900px]:block min-[901px]:hidden fixed inset-0 z-30 bg-black/40 backdrop-blur-sm"
              />
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className={MOBILE_DRAWER_STYLES}
              >
                {/* Drawer Header with Logo and Close Button */}
                <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-200/50 dark:border-gray-800">
                  <img
                    src={`${import.meta.env.VITE_CDN_URL}/images/images-av/AstroVed-Logo.svg`}
                    alt="AstroVed Logo"
                    className="h-7 w-auto object-contain brightness-100 dark:brightness-110"
                  />
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-full bg-[#EBE9FE] dark:bg-purple-900/40 text-[#675df3] dark:text-purple-300 hover:bg-[#d0cff6] dark:hover:bg-purple-800/40 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Drawer Scrollable Content */}
                <div className="flex-1 px-6 pb-12 flex flex-col relative z-10 overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-gray-700 [&::-webkit-scrollbar-thumb]:rounded-full">
                  <nav className="flex flex-col relative">
                    {navLinks.map((navItem, itemIndex) => {
                      const isSubMenuOpen =
                        activeMobileSubMenu === navItem.label;
                      return (
                        <div
                          key={navItem.id}
                          className="flex flex-col border-b border-gray-200/60 dark:border-gray-800/60"
                        >
                          <motion.button
                            onClick={() => handleMobileLinkClick(navItem)}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              delay: itemIndex * 0.05 + 0.05,
                              duration: 0.3,
                              type: "spring",
                            }}
                            className="group flex items-center justify-between w-full py-4 text-left"
                          >
                            <span
                              className={`font-sans text-[16px] sm:text-[17px] font-normal tracking-wide transition-colors whitespace-nowrap ${isSubMenuOpen ? "text-[#675df3]" : "text-midnight/80 dark:text-cream/90"}`}
                            >
                              {navItem.label}
                            </span>

                            {/* Chevron matching design */}
                            {navItem.items && (
                              <ChevronDown
                                className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${isSubMenuOpen ? "rotate-180 text-[#675df3]" : ""}`}
                              />
                            )}
                          </motion.button>

                          {/* Collapsible Mobile/Tablet Submenu Accordion */}
                          <AnimatePresence initial={false}>
                            {navItem.items && isSubMenuOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{
                                  duration: 0.25,
                                  ease: "easeInOut",
                                }}
                                className="overflow-y-auto pr-2 mb-3 max-h-[350px] [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#d0cff6] dark:[&::-webkit-scrollbar-thumb]:bg-[#675df3]/50 [&::-webkit-scrollbar-thumb]:rounded-full flex flex-col gap-0"
                              >
                                {navItem.items.map(
                                  (subItem: any, subIdx: number) => {
                                    const SubIcon =
                                      ITEM_ICONS[subItem.label] || Sparkles;
                                    return (
                                      <a
                                        key={subIdx}
                                        href={subItem.href}
                                        onClick={() => {
                                          setIsMobileMenuOpen(false);
                                        }}
                                        className="flex items-center gap-4 py-3.5 border-b border-gray-100 dark:border-gray-800/50 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800/20 transition-colors"
                                      >
                                        <SubIcon
                                          className="w-[18px] h-[18px] text-[#675df3] dark:text-[#8880f5] flex-shrink-0"
                                          strokeWidth={1.5}
                                        />
                                        <span className="font-sans text-[15px] font-medium text-gray-700 dark:text-gray-300 whitespace-normal leading-snug">
                                          {subItem.label}
                                        </span>
                                      </a>
                                    );
                                  },
                                )}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </nav>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: navLinks.length * 0.05 + 0.1,
                      duration: 0.4,
                    }}
                    className="mt-auto pt-8 flex flex-col"
                  >
                    {/* {currentUser ? (
                      <button className="flex items-center justify-center gap-2 w-full py-3.5 rounded-[20px] bg-purple-100 dark:bg-purple-900/40 hover:bg-purple-200 dark:hover:bg-purple-800/40 transition-colors text-purple-700 dark:text-purple-300 font-sans font-medium text-[15px] shadow-sm" onClick={() => { setIsMobileMenuOpen(false); setAccountPanelOpen(true); }}>
                        <User className="w-5 h-5" />
                        <span>My Account</span>
                      </button>
                    ) : (
                      <button className="w-full py-3.5 rounded-[20px] bg-[#675df3] hover:bg-[#5249db] transition-colors text-white font-sans font-normal text-[15px] shadow-sm" onClick={openLoginPanel}>
                        Sign In
                      </button>
                    )} */}
                    {currentUser ? (
                      <button
                        type="button"
                        className="user-chip"
                        onClick={() => {
                          setAccountPanelOpen(true);
                          setPanelOpen(false);
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        <span className="user-chip__icon">{UserIcon}</span>
                        <span className="user-chip__name">
                          {currentUser.fullName}
                        </span>
                      </button>
                    ) : (
                      <button
                        className={MOBILE_SIGNIN_BTN}
                        onClick={openLoginPanel}
                      >
                        Sign In
                      </button>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>
      {isPanelOpen && (
        <div className="panel-backdrop" onClick={() => setPanelOpen(false)} />
      )}
      <aside
        className={`login-panell ${isPanelOpen ? "login-panell--open" : ""}`}
      >
        <LoginModal onClose={() => setPanelOpen(false)} />
      </aside>
      <aside
        className={`account-panel ${isAccountPanelOpen ? "account-panel--open" : ""}`}
      >
        <MyAccount onClose={() => setAccountPanelOpen(false)} />
      </aside>
    </>
  );
}
