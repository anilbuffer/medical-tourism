'use client';

import React, { useCallback, useEffect, useId, useRef, useState } from "react";
import HeroSearchBox from "./HeroSearchBox";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

import { COUNTRIES, type Market } from '@/data/countriesData';

export type { Market };

export type HeroSlide = {
  src: string;
  /** Leave empty for decorative images. */
  alt?: string;
  /** Short caption shown in the chip, e.g. "Before you fly · we plan everything with you". */
  caption: string;
  /** Optional CSS object-position, e.g. "62% 50%". */
  focus?: string;
};

export type HeroSlideshowProps = {
  slides?: HeroSlide[];
  markets?: Market[];
  defaultMarketCode?: string;
  onMarketChange?: (market: Market) => void;
  /** Lines that rotate under the headline. */
  rotatingLines?: string[];
  primaryCta?: { label: string; href?: string; onClick?: () => void };
  secondaryCta?: { label: string; href?: string; onClick?: () => void };
  bookHref?: string;
  logoHref?: string;
  onMenuClick?: () => void;
  onOpenConsultation?: () => void;
  /** id of the section that follows the hero (used by the scroll cue). */
  nextSectionId?: string;
  /** Milliseconds each slide stays on screen. */
  slideDuration?: number;
  /** Whether to render the internal top header. Set to false if a global Navbar is used. */
  showHeader?: boolean;
  /** Whether to render the AI search bar inside the hero section. */
  showSearchBox?: boolean;
  searchPlaceholders?: string[];
  onSearch?: (query: string) => void;
};

/* ------------------------------------------------------------------ */
/* Defaults (3 slides in requested order: 1. airport, 2. doctor, 3. hills) */
/* ------------------------------------------------------------------ */

const DEFAULT_SLIDES: HeroSlide[] = [
  {
    src: "/images/hero/airport.jpg",
    alt: "Patient at airport embarking on medical journey",
    caption: "Before you fly · we plan everything with you",
    focus: "62% 50%",
  },
  {
    src: "/images/hero/doctor.jpg",
    alt: "Doctor with mask consulting with patient on medical scans",
    caption: "In Chandigarh · your doctor, your hospital",
  },
  {
    src: "/images/hero/hills.jpg",
    alt: "Patient relaxing on terrace overlooking serene green hills",
    caption: "Recovery in the hills · calm, quiet & cared for",
  },
];

const DEFAULT_LINES = [
  "Planned with your doctor before you fly",
  "Looked after every day you're in India",
  "Followed up once you're back home",
];

/* ------------------------------------------------------------------ */
/* Hooks                                                               */
/* ------------------------------------------------------------------ */

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}

function usePageVisible() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const update = () => setVisible(document.visibilityState === "visible");
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);
  return visible;
}

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export default function HeroSlideshow({
  slides = DEFAULT_SLIDES,
  markets = COUNTRIES,
  defaultMarketCode = "SA",
  onMarketChange,
  primaryCta = { label: "Book a free consultation", href: "#consultation" },
  secondaryCta = { label: "How it works", href: "#how-it-works" },
  bookHref = "#consultation",
  logoHref = "/",
  onMenuClick,
  onOpenConsultation,
  nextSectionId = "services",
  slideDuration = 3500,
  showHeader = false,
  showSearchBox = true,
  searchPlaceholders,
  onSearch,
}: HeroSlideshowProps) {
  const reducedMotion = usePrefersReducedMotion();
  const pageVisible = usePageVisible();
  const gradientId = useId().replace(/:/g, "");

  /* ---------- Slideshow ---------- */
  const [active, setActive] = useState(0);
  const [cycle, setCycle] = useState(0);

  const goTo = useCallback(
    (index: number) => {
      setActive(((index % slides.length) + slides.length) % slides.length);
      setCycle((c) => c + 1);
    },
    [slides.length]
  );

  useEffect(() => {
    if (reducedMotion || !pageVisible || slides.length < 2) return;
    const t = window.setTimeout(() => goTo(active + 1), slideDuration);
    return () => window.clearTimeout(t);
  }, [active, cycle, reducedMotion, pageVisible, slides.length, slideDuration, goTo]);


  /* ---------- Market switcher ---------- */
  const [market, setMarket] = useState<Market>(
    () => markets.find((m) => m.code === defaultMarketCode) ?? markets[0]
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const marketRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (defaultMarketCode) {
      const found = markets.find((m) => m.code === defaultMarketCode);
      if (found) setMarket(found);
    }
  }, [defaultMarketCode, markets]);

  useEffect(() => {
    if (!menuOpen) return;
    const onClick = (e: MouseEvent) => {
      if (!marketRef.current?.contains(e.target as Node)) setMenuOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const chooseMarket = (m: Market) => {
    setMarket(m);
    setMenuOpen(false);
    onMarketChange?.(m);
  };

  const handlePrimaryClick = (e: React.MouseEvent) => {
    if (primaryCta.onClick) {
      e.preventDefault();
      primaryCta.onClick();
    } else if (onOpenConsultation) {
      e.preventDefault();
      onOpenConsultation();
    }
  };

  const handleSecondaryClick = (e: React.MouseEvent) => {
    if (secondaryCta.onClick) {
      e.preventDefault();
      secondaryCta.onClick();
    }
  };

  const handleBookClick = (e: React.MouseEvent) => {
    if (onOpenConsultation) {
      e.preventDefault();
      onOpenConsultation();
    }
  };

  return (
    <section className="hero-slideshow relative isolate overflow-hidden flex flex-col min-h-[max(600px,calc(100svh-110px))] md:h-screen md:min-h-[640px] bg-[#081b35] text-white" aria-labelledby="hero-title">
      {/* ---------- Background slideshow ---------- */}
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
        {slides.map((s, i) => (
          <div
            key={s.src}
            className={`hero-slide absolute inset-0 transition-opacity duration-700 ${
              i === active ? "hero-slide-active opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <img
              src={s.src}
              alt={s.alt || ""}
              style={s.focus ? { objectPosition: s.focus } : undefined}
              className="w-full h-full object-cover"
              loading={i === 0 ? "eager" : "lazy"}
              decoding="async"
            />
          </div>
        ))}
      </div>
      <div className="hero-shade absolute inset-0 z-[1] pointer-events-none" />

      {/* ---------- Header (Optional when Navbar is present) ---------- */}
      {showHeader ? (
        <header className="relative z-10 pt-[calc(env(safe-area-inset-top,0px)+22px)] px-4 sm:px-6">
          <div className="max-w-[1320px] mx-auto grid grid-cols-[1fr_auto_1fr] items-center gap-3">
            <div className="relative justify-self-start" ref={marketRef}>
              <button
                type="button"
                className="inline-flex items-center gap-2 h-11 px-4 rounded-full border border-white/30 bg-white/6 text-white text-sm font-bold hover:bg-white/15 transition-colors cursor-pointer"
                aria-haspopup="menu"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((o) => !o)}
              >
                <span>{market.label}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                </svg>
                <span className="sr-only">Change the country you are travelling from</span>
              </button>
              {menuOpen && (
                <ul className="absolute top-[calc(100%+10px)] left-0 z-20 min-w-[210px] m-0 p-2 list-none bg-white text-gray-900 rounded-2xl shadow-2xl border border-gray-100" role="menu">
                  {markets.map((m) => (
                    <li key={m.code} role="none">
                      <button
                        type="button"
                        role="menuitemradio"
                        aria-checked={m.code === market.code}
                        className={`flex items-center justify-between w-full p-2.5 rounded-xl border-0 bg-transparent text-sm font-semibold text-left cursor-pointer transition-colors hover:bg-cyan-50 ${
                          m.code === market.code ? "bg-cyan-50 text-cyan-900" : ""
                        }`}
                        onClick={() => chooseMarket(m)}
                      >
                        <span>{m.label}</span>
                        {m.city && <small className="text-gray-400 font-semibold">{m.city}</small>}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <a className="inline-flex items-center gap-2.5 text-white font-extrabold text-base sm:text-lg tracking-tight no-underline whitespace-nowrap" href={logoHref} aria-label="Your Medicare Trip home">
              <span className="w-9 h-9 rounded-lg bg-[#3ba4e6] grid place-items-center">
                <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 4v16M4 12h16" stroke="#fff" strokeWidth="3.2" strokeLinecap="round" />
                </svg>
              </span>
              YOUR MEDICARE TRIP
            </a>

            <div className="justify-self-end flex items-center gap-3">
              <a 
                className="hidden sm:inline-flex items-center h-12 px-6 rounded-full bg-white text-gray-900 no-underline font-semibold text-sm hover:bg-gray-100 transition-colors shadow-md" 
                href={bookHref} 
                onClick={handleBookClick}
              >
                Send Enquiry
              </a>
              <button type="button" className="w-11 h-11 rounded-full border border-white/35 bg-transparent text-white grid place-items-center cursor-pointer hover:bg-white/10 transition-colors" aria-label="Open menu" onClick={onMenuClick}>
                <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>
        </header>
      ) : (
        <div className="relative z-10 w-full pt-[calc(env(safe-area-inset-top,0px)+120px)] sm:pt-[calc(env(safe-area-inset-top,0px)+135px)]" aria-hidden="true" />
      )}

      {/* ---------- Copy ---------- */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-4 sm:px-6 py-8 sm:py-10">
        <div className="max-w-[1320px] w-full mx-auto flex flex-col items-center text-center gap-6 sm:gap-8">
          <h1 id="hero-title" className="m-0 text-white font-extrabold text-[38px] sm:text-[54px] lg:text-[70px] leading-[1.08] tracking-[-0.03em] text-balance">
            <span className="hero-line1 block">Doctor-Led Care in India,</span>{" "}
            <span className="hero-line2 block mt-1">
              <span className="hero-highlight relative inline-block isolate">
                <svg className="hero-blob" viewBox="0 0 300 100" preserveAspectRatio="none" aria-hidden="true">
                  <defs>
                    <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0.4">
                      <stop offset="0" stopColor="#2F9BE8" stopOpacity="0.75" />
                      <stop offset="0.55" stopColor="#4FBEDC" stopOpacity="0.6" />
                      <stop offset="1" stopColor="#8FD8E8" stopOpacity="0.32" />
                    </linearGradient>
                  </defs>
                  <path
                    fill={`url(#${gradientId})`}
                    d="M7 34 C 16 8, 86 5, 158 9 C 226 13, 290 3, 296 38 C 301 74, 262 95, 160 91 C 72 88, 9 99, 4 66 C 2 54, 3 44, 7 34 Z"
                  />
                </svg>
                All the Way Home.
              </span>
            </span>
          </h1>

          {/* ---------- AI Search Box UI ---------- */}
          {showSearchBox && (
            <div className="w-full flex justify-center mt-1 sm:mt-2">
              <HeroSearchBox
                placeholders={searchPlaceholders}
                onSearch={onSearch}
              />
            </div>
          )}

          <div className="hero-rise flex flex-wrap justify-center gap-3.5 sm:gap-4 -mt-2 sm:-mt-3" style={{ animationDelay: "500ms" }}>
            <a 
              className="inline-flex items-center justify-center gap-2.5 h-14 px-8 rounded-full font-bold text-base bg-[#8fd8e8] text-[#0d2b52] hover:bg-[#a8e3ef] hover:-translate-y-0.5 transition-all shadow-lg cursor-pointer no-underline" 
              href={primaryCta.href || "#consultation"}
              onClick={handlePrimaryClick}
            >
              <span>{primaryCta.label}</span>
              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a 
              className="inline-flex items-center justify-center gap-2 h-14 px-8 rounded-full font-bold text-base text-white border-[1.5px] border-white/55 bg-white/5 hover:bg-white/15 hover:-translate-y-0.5 transition-all cursor-pointer no-underline" 
              href={secondaryCta.href || "#how-it-works"}
              onClick={handleSecondaryClick}
            >
              {secondaryCta.label}
            </a>
          </div>
        </div>
      </div>


      {/* ---------- Scroll cue ---------- */}
      <a className="relative z-10 flex flex-col items-center gap-2 pb-14 text-white/80 hover:text-white transition-colors cursor-pointer text-xs font-extrabold tracking-[0.14em] uppercase no-underline" href={`#${nextSectionId}`}>
        <span className="hero-cue-track relative w-[26px] h-[42px] rounded-[14px] border-2 border-white/60" aria-hidden="true" />
        <span>Scroll to see how we look after you</span>
      </a>
    </section>
  );
}
