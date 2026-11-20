'use client';

import React, {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ElementType,
  type ReactNode,
} from 'react';
import Link from 'next/link';
import { MessageSquare } from 'lucide-react';
import { useConsultation, useCountry } from '@/components/providers/AppProviders';
import styles from './SiteHeader.module.css';
import { COUNTRIES, COMPARISON_COUNTRIES, type CountryOption, type Market } from '@/data/countriesData';

/* ------------------------------------------------------------------ */
/* Types & Backwards Compatibility Exports                            */
/* ------------------------------------------------------------------ */

export { COUNTRIES, COMPARISON_COUNTRIES, type CountryOption, type Market };

export type NavLink = {
  label: string;
  href: string;
  description?: string;
  target?: string;
  rel?: string;
  isConsultation?: boolean;
};

export type NavItem = NavLink & {
  /** Items shown in a dropdown under this link (desktop only). */
  children?: NavLink[];
  /** id of a section on the current page. While it is on screen, this link is highlighted. */
  sectionId?: string;
};

export type NavGroup = { title: string; links: NavLink[] };

export interface SiteHeaderProps {
  primaryNav?: NavItem[];
  menuGroups?: NavGroup[];
  markets?: Market[];
  defaultMarketCode?: string;
  onMarketChange?: (market: Market) => void;
  bookHref?: string;
  bookLabel?: string;
  logoHref?: string;
  /** Pass Next.js Link (or custom router link) for client-side navigation. Defaults to <a>. */
  linkComponent?: ElementType;
  /** Extra content under the help card in the full-screen menu (e.g. WhatsApp). */
  menuFooter?: ReactNode;
  /** Hide while scrolling down, show again on scroll up. Default: true. */
  hideOnScroll?: boolean;
  /** px from the top before hiding starts. Default: about one screen height. */
  hideAfter?: number;
  /** Thin reading-progress line inside the pill. Default: true. */
  showProgress?: boolean;
  onOpenConsultation?: () => void;
  selectedCountry?: CountryOption;
  onSelectCountry?: (country: CountryOption) => void;
}

export type NavbarProps = SiteHeaderProps;

/* ------------------------------------------------------------------ */
/* Default content                                                    */
/* ------------------------------------------------------------------ */

const LOGIN_URL =
  process.env.NEXT_PUBLIC_LOGIN_URL ||
  'https://medical-tourism-7tbv.onrender.com/login';

const DEFAULT_PRIMARY_NAV: NavItem[] = [
  {
    label: 'Treatments',
    href: '/treatments',
    sectionId: 'treatments',
    children: [
      { label: 'Medical Treatments', href: '/treatments/medical-treatments', description: 'Surgery at accredited hospitals' },
      { label: 'Health Check-ups & Diagnostics', href: '/treatments/health-checkups', description: 'Full assessments, results in days' },
      { label: 'Wellness', href: '/treatments/wellness', description: 'Recovery, rehabilitation, retreats' },
      { label: 'All treatments & costs', href: '/treatments', description: 'Starting prices, itemised' },
    ],
  },
  { label: 'Hospitals', href: '/hospitals' },
  { label: 'Doctors', href: '/doctors' },
  {
    label: 'Care Services',
    href: '/care-services',
    sectionId: 'care-services',
    children: [
      { label: 'How It Works', href: '/how-it-works', description: 'Your journey, step by step' },
      { label: 'Care Coordination', href: '/care-services', description: 'One care manager throughout' },
      { label: 'Travel & Accommodation', href: '/destination', description: 'Visa letters, pickup and stay' },
      { label: 'Recovery & Aftercare', href: '/aftercare', description: "In India and once you're home" },
    ],
  },
  {
    label: 'Login',
    href: LOGIN_URL,
    target: '_blank',
    rel: 'noopener noreferrer',
  },
];

const DEFAULT_MENU_GROUPS: NavGroup[] = [
  {
    title: 'Explore',
    links: [
      { label: 'Treatments & costs', href: '/treatments' },
      { label: 'Specialties', href: '/treatments/medical-treatments' },
      { label: 'Hospitals', href: '/hospitals' },
      { label: 'Doctors', href: '/doctors' },
    ],
  },
  {
    title: 'Your Care Journey',
    links: [
      { label: 'How It Works', href: '/how-it-works' },
      { label: 'Care Coordination', href: '/care-services' },
      { label: 'Destination & Stay', href: '/destination' },
      { label: 'Patient Journeys', href: '/#stories' },
    ],
  },
  {
    title: 'Help & Support',
    links: [
      { label: 'Frequently Asked Questions', href: '/faqs' },
      { label: 'Patient guides', href: '/guides' },
      { label: 'Contact Us', href: '#', isConsultation: true },
      { label: 'Why Choose Us', href: '/why-choose-us' },
      {
        label: 'Login',
        href: LOGIN_URL,
        target: '_blank',
        rel: 'noopener noreferrer',
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Icons                                                              */
/* ------------------------------------------------------------------ */

function LogoMark() {
  return (
    <svg className={styles.logoMark} viewBox="0 0 40 40" aria-hidden="true">
      <rect width="40" height="40" rx="10" fill="#8ED3EE" />
      <path d="M20 11v18M11 20h18" stroke="#0E3B3D" strokeWidth="4.2" strokeLinecap="round" />
    </svg>
  );
}

function Chevron({ className }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Arrow() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M8 3v4M16 3v4M3.5 10h17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function Flag({ market }: { market: Market }) {
  if (market.flagSrc) {
    return <img className={styles.flag} src={market.flagSrc} alt="" width={24} height={16} />;
  }
  return <span className={styles.flagCode}>{market.code}</span>;
}

/* ------------------------------------------------------------------ */
/* Component                                                          */
/* ------------------------------------------------------------------ */

export const SiteHeader: React.FC<SiteHeaderProps> = ({
  primaryNav = DEFAULT_PRIMARY_NAV,
  menuGroups = DEFAULT_MENU_GROUPS,
  markets = COUNTRIES,
  defaultMarketCode = 'AE',
  onMarketChange,
  bookLabel = 'Send Enquiry',
  logoHref = '/',
  menuFooter,
  hideOnScroll = true,
  hideAfter,
  showProgress = true,
  onOpenConsultation,
  selectedCountry: propSelectedCountry,
  onSelectCountry: propOnSelectCountry,
}) => {
  const { setOpen } = useConsultation();
  const { selectedCountry: ctxSelectedCountry, setSelectedCountry: ctxSetSelectedCountry } = useCountry();

  const handleOpenConsultation = onOpenConsultation || (() => setOpen(true));
  const currentCountryCode = propSelectedCountry?.code || ctxSelectedCountry?.code || defaultMarketCode || 'AE';

  const menuId = useId();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [marketOpen, setMarketOpen] = useState(false);
  const [market, setMarket] = useState<Market>(() => {
    return markets.find((m) => m.code === currentCountryCode) ?? markets[0];
  });
  const [origin, setOrigin] = useState('calc(100% - 60px) 60px');

  const rootRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const marketRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);

  const keepVisible = menuOpen || openDropdown !== null || marketOpen;
  const keepVisibleRef = useRef(keepVisible);
  keepVisibleRef.current = keepVisible;

  const sectionIds = primaryNav.map((i) => i.sectionId).filter(Boolean) as string[];
  const sectionKey = sectionIds.join('|');

  useEffect(() => {
    if (keepVisible) setHidden(false);
  }, [keepVisible]);

  // Sync when selectedCountry changes in AppProviders
  useEffect(() => {
    if (ctxSelectedCountry) {
      const match = markets.find((m) => m.code === ctxSelectedCountry.code);
      if (match) setMarket(match);
    }
  }, [ctxSelectedCountry, markets]);

  /* ---------- Scroll: bar → pill, hide/reveal, progress, active section ---------- */
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

      // Reading progress (written straight to a CSS variable, no re-render)
      const max = document.documentElement.scrollHeight - vh;
      rootRef.current?.style.setProperty('--progress', max > 0 ? Math.min(1, y / max).toFixed(4) : '0');

      // Section currently on screen
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

  /* ---------- Full-screen menu ---------- */
  const openMenu = () => {
    const r = burgerRef.current?.getBoundingClientRect();
    if (r) setOrigin(`${Math.round(r.left + r.width / 2)}px ${Math.round(r.top + r.height / 2)}px`);
    setOpenDropdown(null);
    setMarketOpen(false);
    setMenuOpen(true);
  };

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    burgerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (overlayRef.current) overlayRef.current.inert = !menuOpen;
  }, [menuOpen]);

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

  /* ---------- Dropdowns + market menu: close on outside click / Escape ---------- */
  useEffect(() => {
    if (!openDropdown && !marketOpen) return;
    const onClick = (e: MouseEvent) => {
      const t = e.target as Node;
      if (openDropdown && !navRef.current?.contains(t)) setOpenDropdown(null);
      if (marketOpen && !marketRef.current?.contains(t)) setMarketOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenDropdown(null);
        setMarketOpen(false);
      }
    };
    document.addEventListener('click', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('click', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [openDropdown, marketOpen]);

  const hoverOpen = (label: string) => {
    window.clearTimeout(closeTimer.current);
    setOpenDropdown(label);
  };
  const hoverClose = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpenDropdown(null), 160);
  };

  const chooseMarket = (m: Market) => {
    setMarket(m);
    setMarketOpen(false);
    onMarketChange?.(m);

    // Sync with AppProviders
    const countryMatch: CountryOption = COUNTRIES.find((c) => c.code === m.code) || COUNTRIES[0];
    if (propOnSelectCountry) {
      propOnSelectCountry(countryMatch);
    } else if (ctxSetSelectedCountry) {
      ctxSetSelectedCountry(countryMatch);
    }
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

  let linkIndex = 0;

  return (
    <div
      ref={rootRef}
      className={[
        styles.root,
        scrolled ? styles.isScrolled : '',
        hidden ? styles.isHidden : '',
        menuOpen ? styles.isOpen : '',
      ].filter(Boolean).join(' ')}
    >
      {/* ---------- Bar / pill ---------- */}
      <header className={styles.pill}>
        <Link className={styles.logo} href={logoHref} aria-label="Your Medicare Trip home">
          <LogoMark />
          <span className={styles.wordmark}>YOUR MEDICARE TRIP</span>
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
                    <Chevron className={styles.navChevron} />
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
                        <Arrow />
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
          <div className={styles.market} ref={marketRef}>
            <button
              type="button"
              className={styles.marketBtn}
              aria-haspopup="menu"
              aria-expanded={marketOpen}
              onClick={() => setMarketOpen((o) => !o)}
            >
              <Flag market={market} />
              <Chevron />
              <span className={styles.srOnly}>Travelling from {market.label}. Change country</span>
            </button>
            {marketOpen && (
              <ul className={styles.marketMenu} role="menu">
                {markets.map((m) => (
                  <li key={m.code} role="none">
                    <button
                      type="button"
                      role="menuitemradio"
                      aria-checked={m.code === market.code}
                      onClick={() => chooseMarket(m)}
                    >
                      <Flag market={m} />
                      <span>{m.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button
            type="button"
            className={styles.book}
            onClick={handleBookClick}
          >
            <CalendarIcon />
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
                    const delay = 160 + linkIndex++ * 35;
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
                            <Arrow />
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
                            <Arrow />
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
              <CalendarIcon />
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

            <label className={styles.overlayMarket}>
              <span>Travelling from</span>
              <select
                value={market.code}
                onChange={(e) => {
                  const m = markets.find((x) => x.code === e.target.value);
                  if (m) chooseMarket(m);
                }}
              >
                {markets.map((m) => (
                  <option key={m.code} value={m.code}>
                    {m.label}
                  </option>
                ))}
              </select>
            </label>
          </aside>
        </div>
      </div>
    </div>
  );
};

export const Navbar = SiteHeader;
export default SiteHeader;
