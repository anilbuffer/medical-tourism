'use client';

import React, {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import Link from 'next/link';
import { MessageSquare, ChevronDown, ArrowRight, Calendar } from 'lucide-react';
import { useConsultation, useCountry } from '@/components/providers/AppProviders';
import { COUNTRIES, type CountryOption, type Market } from '@/data/countriesData';
import { CountryFlag } from '@/components/CountryFlag';
import {
  DEFAULT_PRIMARY_NAV,
  DEFAULT_MENU_GROUPS,
  type NavLink,
  type NavItem,
  type NavGroup,
} from '@/data/navigationData';
import { CountrySelectModal } from './CountrySelectModal';
import { BrandLogo } from './BrandLogo';
import styles from './SiteHeader.module.css';

/* ------------------------------------------------------------------ */
/* Types                                                              */
/* ------------------------------------------------------------------ */

export type { NavLink, NavItem, NavGroup };

export interface SiteHeaderProps {
  primaryNav?: NavItem[];
  menuGroups?: NavGroup[];
  markets?: Market[];
  onMarketChange?: (market: Market) => void;
  bookLabel?: string;
  logoHref?: string;
  menuFooter?: ReactNode;
  hideOnScroll?: boolean;
  hideAfter?: number;
  showProgress?: boolean;
  onOpenConsultation?: () => void;
  selectedCountry?: CountryOption;
  onSelectCountry?: (country: CountryOption) => void;
}

export type NavbarProps = SiteHeaderProps;

/* ------------------------------------------------------------------ */
/* Helper Components                                                  */
/* ------------------------------------------------------------------ */

function LogoMark() {
  return (
    <svg className={styles.logoMark} viewBox="0 0 40 40" aria-hidden="true">
      <rect width="40" height="40" rx="10" fill="#8ED3EE" />
      <path d="M20 11v18M11 20h18" stroke="#0E3B3D" strokeWidth="4.2" strokeLinecap="round" />
    </svg>
  );
}

function Flag({ country }: { country: CountryOption }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      {country.code !== 'OT' ? (
        <CountryFlag code={country.code} />
      ) : (
        <span className="text-sm">🌐</span>
      )}
      <span className={styles.flagCode}>{country.code}</span>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Component                                                          */
/* ------------------------------------------------------------------ */

export const SiteHeader: React.FC<SiteHeaderProps> = ({
  primaryNav = DEFAULT_PRIMARY_NAV,
  menuGroups = DEFAULT_MENU_GROUPS,
  markets = COUNTRIES,
  onMarketChange,
  bookLabel = 'Send Enquiry',
  logoHref = '/',
  menuFooter,
  hideOnScroll = true,
  hideAfter,
  showProgress = true,
  onOpenConsultation,
  selectedCountry: propSelectedCountry,
}) => {
  const { setOpen } = useConsultation();
  const { selectedCountry: ctxSelectedCountry } = useCountry();

  const handleOpenConsultation = onOpenConsultation || (() => setOpen(true));

  // Directly consume country from props or context without redundant local state
  const currentCountry = propSelectedCountry || ctxSelectedCountry || markets[0];

  const menuId = useId();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [countryModalOpen, setCountryModalOpen] = useState(false);
  const [origin, setOrigin] = useState('calc(100% - 60px) 60px');

  const rootRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);

  const keepVisible = menuOpen || openDropdown !== null || countryModalOpen;
  const keepVisibleRef = useRef(keepVisible);
  keepVisibleRef.current = keepVisible;

  // Compute visibility directly instead of cascading setState in useEffect
  const isHidden = hidden && !keepVisible;

  const sectionIds = primaryNav.map((i) => i.sectionId).filter(Boolean) as string[];
  const sectionKey = sectionIds.join('|');

  // Notify parent on market change if callback provided
  useEffect(() => {
    if (onMarketChange && currentCountry) {
      onMarketChange(currentCountry);
    }
  }, [currentCountry, onMarketChange]);

  /* ---------- Scroll: bar -> pill, hide/reveal, progress, active section ---------- */
  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;
    const ids = sectionKey ? sectionKey.split('|') : [];

    const update = () => {
      ticking = false;
      const y = Math.max(0, window.scrollY);
      const dy = y - lastY;
      const vh = window.innerHeight;

      setScrolled(y > 40);

      // Hide on scroll down, reveal on scroll up
      if (!hideOnScroll || keepVisibleRef.current || y < (hideAfter ?? vh * 0.9)) {
        setHidden(false);
        lastY = y;
      } else if (dy > 8) {
        setHidden(true);
        lastY = y;
      } else if (dy < -4) {
        setHidden(false);
        lastY = y;
      }

      // Reading progress written directly to CSS custom property
      const max = document.documentElement.scrollHeight - vh;
      rootRef.current?.style.setProperty('--progress', max > 0 ? Math.min(1, y / max).toFixed(4) : '0');

      // Detect active on-screen section
      let current: string | null = null;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= vh * 0.4 && r.bottom > vh * 0.4) current = id;
      }
      setActiveSection(current);
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    };
    const onFocusIn = () => setHidden(false);
    const root = rootRef.current;

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    root?.addEventListener('focusin', onFocusIn);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      root?.removeEventListener('focusin', onFocusIn);
    };
  }, [hideOnScroll, hideAfter, sectionKey]);

  /* ---------- Full-screen menu handlers & focus trap ---------- */
  const openMenu = () => {
    const r = burgerRef.current?.getBoundingClientRect();
    if (r) setOrigin(`${Math.round(r.left + r.width / 2)}px ${Math.round(r.top + r.height / 2)}px`);
    setOpenDropdown(null);
    setCountryModalOpen(false);
    setMenuOpen(true);
  };

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    burgerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const html = document.documentElement;
    const prevOverflow = html.style.overflow;
    html.style.overflow = 'hidden';

    const focusTimer = window.setTimeout(() => {
      overlayRef.current?.querySelector<HTMLElement>('a, button')?.focus();
    }, 150);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeMenu();
        return;
      }
      if (e.key === 'Tab' && overlayRef.current) {
        const items = [
          burgerRef.current,
          ...Array.from(overlayRef.current.querySelectorAll<HTMLElement>('a, button, select')),
        ].filter(Boolean) as HTMLElement[];
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      html.style.overflow = prevOverflow;
      window.clearTimeout(focusTimer);
      document.removeEventListener('keydown', onKey);
    };
  }, [menuOpen, closeMenu]);

  /* ---------- Dropdown outside click & Escape handling ---------- */
  useEffect(() => {
    if (!openDropdown) return;
    const onClick = (e: MouseEvent) => {
      const t = e.target as Node;
      if (openDropdown && !navRef.current?.contains(t)) setOpenDropdown(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('click', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('click', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [openDropdown]);

  const hoverOpen = (label: string) => {
    window.clearTimeout(closeTimer.current);
    setOpenDropdown(label);
  };

  const hoverClose = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpenDropdown(null), 160);
  };

  const handleBookClick = (e: React.MouseEvent) => {
    e.preventDefault();
    closeMenu();
    handleOpenConsultation();
  };

  const handleNavClick = (href?: string, e?: React.MouseEvent) => {
    if (!href) return;
    if (href.startsWith('#') || href.startsWith('/#')) {
      const hash = href.startsWith('/#') ? href.slice(1) : href;
      const target = document.querySelector(hash);
      if (target) {
        e?.preventDefault();
        closeMenu();
        setOpenDropdown(null);
        target.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    closeMenu();
    setOpenDropdown(null);
  };

  return (
    <div
      ref={rootRef}
      className={[
        styles.root,
        scrolled ? styles.isScrolled : '',
        isHidden ? styles.isHidden : '',
        menuOpen ? styles.isOpen : '',
      ].filter(Boolean).join(' ')}
    >
      {/* ---------- Bar / pill ---------- */}
      <header className={styles.pill}>
        <Link className={styles.logo} href={logoHref} aria-label="Your Medicare Trip home">
          <BrandLogo
            variant="navbar"
            className={`h-auto transition-all duration-300 ${
              scrolled
                ? 'w-[105px] sm:w-[130px]'
                : 'w-[150px] sm:w-[200px]'
            }`}
            priority
          />
        </Link>

        <nav className={styles.nav} aria-label="Main" ref={navRef}>
          <ul>
            {primaryNav.map((item) => {
              const active = !!item.sectionId && item.sectionId === activeSection;
              const cls = `${styles.navLink} ${active ? styles.isActive : ''}`;

              return item.children?.length ? (
                <li
                  key={item.label}
                  className={styles.hasDrop}
                  onMouseEnter={() => hoverOpen(item.label)}
                  onMouseLeave={hoverClose}
                >
                  <button
                    type="button"
                    className={cls}
                    aria-expanded={openDropdown === item.label}
                    onClick={() => setOpenDropdown((d) => (d === item.label ? null : item.label))}
                  >
                    <span>{item.label}</span>
                    <ChevronDown className={styles.navChevron} size={14} />
                  </button>

                  {openDropdown === item.label && (
                    <div className={styles.dropdown}>
                      <ul>
                        {item.children.map((c, ci) => (
                          <li key={`${item.label}-${c.label}-${ci}`}>
                            <Link
                              href={c.href}
                              target={c.target}
                              rel={c.target === '_blank' ? (c.rel || 'noopener noreferrer') : c.rel}
                              onClick={(e) => handleNavClick(c.href, e)}
                            >
                              <strong>{c.label}</strong>
                              {c.description && <small>{c.description}</small>}
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <Link
                        className={styles.dropAll}
                        href={item.href}
                        target={item.target}
                        rel={item.target === '_blank' ? (item.rel || 'noopener noreferrer') : item.rel}
                        onClick={(e) => handleNavClick(item.href, e)}
                      >
                        <span>View all {item.label.toLowerCase()}</span>
                        <ArrowRight size={18} />
                      </Link>
                    </div>
                  )}
                </li>
              ) : (
                <li key={item.label}>
                  <Link
                    className={cls}
                    href={item.href}
                    target={item.target}
                    rel={item.target === '_blank' ? (item.rel || 'noopener noreferrer') : item.rel}
                    aria-current={active ? 'location' : undefined}
                    onClick={(e) => handleNavClick(item.href, e)}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className={styles.actions}>
          <div className={styles.market}>
            <button
              type="button"
              className={styles.marketBtn}
              aria-haspopup="dialog"
              aria-expanded={countryModalOpen}
              onClick={() => setCountryModalOpen(true)}
            >
              <Flag country={currentCountry} />
              <span className={styles.srOnly}>Travelling from {currentCountry.label}. Change country</span>
            </button>
          </div>

          <button
            type="button"
            className={styles.book}
            onClick={handleBookClick}
          >
            <Calendar size={18} />
            <span className={styles.bookLabel}>{bookLabel}</span>
          </button>

          <button
            ref={burgerRef}
            type="button"
            className={styles.burger}
            aria-expanded={menuOpen}
            aria-controls={menuId}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => (menuOpen ? closeMenu() : openMenu())}
          >
            <span className={styles.burgerLines} aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
          </button>
        </div>

        {showProgress && (
          <span className={styles.progress} aria-hidden="true">
            <i />
          </span>
        )}
      </header>

      {/* ---------- Full-screen menu ---------- */}
      <div
        id={menuId}
        ref={overlayRef}
        className={styles.overlay}
        style={{ ['--origin' as string]: origin }}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        aria-hidden={!menuOpen}
      >
        <div className={styles.overlayInner}>
          <div className={styles.groups}>
            {menuGroups.map((group, gi) => (
              <section key={`${group.title}-${gi}`}>
                <h2 className={styles.groupTitle}>
                  <span>{String(gi + 1).padStart(2, '0')}</span>
                  <i aria-hidden="true" />
                  {group.title}
                </h2>
                <ul>
                  {group.links.map((link, li) => {
                    const delay = 160 + (gi * 4 + li) * 35;
                    return (
                      <li key={`${group.title}-${link.label}-${li}`} style={{ transitionDelay: menuOpen ? `${delay}ms` : '0ms' }}>
                        {link.isConsultation ? (
                          <button
                            type="button"
                            className={styles.menuLink}
                            onClick={() => {
                              closeMenu();
                              setOpen(true);
                            }}
                          >
                            <span>{link.label}</span>
                            <ArrowRight size={22} />
                          </button>
                        ) : (
                          <Link
                            className={styles.menuLink}
                            href={link.href || '#'}
                            target={link.target}
                            rel={link.target === '_blank' ? (link.rel || 'noopener noreferrer') : link.rel}
                            onClick={(e) => handleNavClick(link.href, e)}
                          >
                            <span>{link.label}</span>
                            <ArrowRight size={22} />
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </section>
            ))}
          </div>

          <aside className={styles.help}>
            <p className={styles.helpTitle}>Need help planning your treatment?</p>
            <button
              type="button"
              className={styles.helpBtn}
              onClick={handleBookClick}
            >
              <Calendar size={18} />
              <span>{bookLabel}</span>
            </button>
            <p className={styles.helpNote}>Talk to our dedicated care coordination team.</p>

            <a
              href="https://wa.me/447587399811?text=Hi%20Your%20Medicare%20Trip,%20I%20would%20like%20to%20consult%20regarding%20treatment"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full mt-2 py-3 px-4 rounded-full font-bold text-xs border border-white/20 text-white hover:bg-white/10 flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-[#8ed3ee]" />
              <span>Chat on WhatsApp</span>
            </a>

            {menuFooter}

            <div className={styles.overlayMarket}>
              <span>Travelling from</span>
              <button
                type="button"
                className={styles.overlayMarketBtn}
                onClick={() => {
                  closeMenu();
                  setCountryModalOpen(true);
                }}
              >
                <Flag country={currentCountry} />
                <span>{currentCountry.label || currentCountry.name}</span>
              </button>
            </div>
          </aside>
        </div>
      </div>

      {/* ---------- Country Select Modal ---------- */}
      <CountrySelectModal
        isOpen={countryModalOpen}
        onClose={() => setCountryModalOpen(false)}
      />
    </div>
  );
};

export const Navbar = SiteHeader;
export default SiteHeader;
