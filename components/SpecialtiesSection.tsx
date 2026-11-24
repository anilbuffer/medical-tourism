'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Bone, Sparkles, Smile, Eye, Baby, HeartPulse, Plus, ArrowRight } from 'lucide-react';

export interface SpecialtyPillar {
  key: 'ortho' | 'plastic' | 'dental' | 'eye' | 'fertility' | 'cardiac';
  slug: string;
  categoryNumber: string;
  categoryLabel: string;
  title: string;
  shortTitle: string;
  tagline: string;
  tags: string[];
  startingPrice: string;
  savingsBadge: string;
  image: string;
  icon: 'bone' | 'sparkles' | 'smile' | 'eye' | 'baby' | 'heart';
  focus: {
    collapsed: string;
    open: string;
  };
}

export const SPECIALTIES_PILLARS: SpecialtyPillar[] = [
  {
    key: 'ortho',
    slug: 'orthopaedics',
    categoryNumber: '01',
    categoryLabel: 'SURGICAL',
    title: 'Orthopaedics & Joint Care',
    shortTitle: 'Orthopaedics',
    tagline: 'Robotic total & partial knee replacement and hip resurfacing by accredited hospital chiefs.',
    tags: ['Knee Replacement', 'Hip Replacement', 'Spine Surgery'],
    startingPrice: '$1,500 USD',
    savingsBadge: 'Save up to 69%',
    image: '/images/home/specialities/orthopaedics.jpg',
    icon: 'bone',
    focus: { collapsed: '50% 50%', open: '50% 50%' },
  },
  {
    key: 'plastic',
    slug: 'cosmetic',
    categoryNumber: '02',
    categoryLabel: 'AESTHETIC',
    title: 'Cosmetic Surgery',
    shortTitle: 'Cosmetic Surgery',
    tagline: 'Board-certified plastic surgeons providing natural aesthetic refinements in private accredited suites.',
    tags: ['Rhinoplasty', 'Breast Implants', 'Hair Transplant', 'Liposuction'],
    startingPrice: '$500 USD',
    savingsBadge: 'Save up to 75%',
    image: '/images/home/specialities/cosmetic-surgery.jpg',
    icon: 'sparkles',
    focus: { collapsed: '50% 50%', open: '50% 50%' },
  },
  {
    key: 'dental',
    slug: 'dental',
    categoryNumber: '03',
    categoryLabel: 'DENTISTRY',
    title: 'Dental Implants & Smile Design',
    shortTitle: 'Dental',
    tagline: 'Full-mouth rehabilitation with Swiss/German titanium implants and digital CAD/CAM crowns.',
    tags: ['All-on-4 Implants', 'Full Arch Zirconia', 'Porcelain Veneers'],
    startingPrice: '$500 USD',
    savingsBadge: 'Save up to 70%',
    image: '/images/home/specialities/dental.jpg',
    icon: 'smile',
    focus: { collapsed: '50% 50%', open: '50% 50%' },
  },
  {
    key: 'eye',
    slug: 'eye',
    categoryNumber: '04',
    categoryLabel: 'VISION',
    title: 'Eye Care & Refractive Surgery',
    shortTitle: 'Eye Care',
    tagline: 'Femtosecond bladeless LASIK, robotic cataract microsurgery and multifocal toric lens implants.',
    tags: ['Bladeless LASIK', 'Robotic Cataract', 'ICL Phakic Lens'],
    startingPrice: '$250 USD',
    savingsBadge: 'Save up to 65%',
    image: '/images/home/specialities/eye-care.jpg',
    icon: 'eye',
    focus: { collapsed: '50% 50%', open: '50% 50%' },
  },
  {
    key: 'fertility',
    slug: 'fertility',
    categoryNumber: '05',
    categoryLabel: 'FERTILITY',
    title: 'Fertility & IVF',
    shortTitle: 'Fertility',
    tagline: 'IVF and ICSI cycles at registered fertility centres, with doctors planning the treatment around your travel dates.',
    tags: ['IVF / ICSI', 'Embryo Freezing', 'IUI'],
    startingPrice: '$1,500 USD',
    savingsBadge: 'Save up to 50%',
    image: '/images/home/specialities/fertility.jpg',
    icon: 'baby',
    focus: { collapsed: '50% 50%', open: '50% 50%' },
  },
  {
    key: 'cardiac',
    slug: 'cardiac',
    categoryNumber: '06',
    categoryLabel: 'CARDIAC',
    title: 'Cardiology & Cardiac Surgery',
    shortTitle: 'Cardiac Sciences',
    tagline: 'Advanced catheter-based interventions, beating-heart CABG, and robotic cardiac surgery by pioneering hospital chiefs.',
    tags: ['Angioplasty & Stenting', 'Beating Heart CABG', 'Valve Replacement', 'Pacemaker & AICD'],
    startingPrice: 'N/A',
    savingsBadge: 'Quoted on review',
    image: '/images/home/specialities/cardiology.jpg',
    icon: 'heart',
    focus: { collapsed: '50% 50%', open: '50% 50%' },
  },
];

interface SpecialtyIconProps {
  icon: 'bone' | 'sparkles' | 'smile' | 'eye' | 'baby' | 'heart';
  size?: number;
}

const SpecialtyIcon: React.FC<SpecialtyIconProps> = ({ icon, size = 24 }) => {
  if (icon === 'bone') {
    return <Bone size={size} className="stroke-[1.8]" />;
  }
  if (icon === 'sparkles') {
    return <Sparkles size={size} className="stroke-[1.8]" />;
  }
  if (icon === 'smile') {
    return <Smile size={size} className="stroke-[1.8]" />;
  }
  if (icon === 'baby') {
    return <Baby size={size} className="stroke-[1.8]" />;
  }
  if (icon === 'heart') {
    return <HeartPulse size={size} className="stroke-[1.8]" />;
  }
  return <Eye size={size} className="stroke-[1.8]" />;
};

export interface SpecialtiesSectionProps {
  id?: string;
  defaultOpen?: 'ortho' | 'plastic' | 'dental' | 'eye' | 'fertility' | 'cardiac';
  title?: React.ReactNode;
  subtitle?: string;
}

export const SpecialtiesSection: React.FC<SpecialtiesSectionProps> = ({
  id = 'specialties',
  defaultOpen = 'ortho',
  title,
  subtitle = 'World-class surgical care across high-demand procedures — reviewed by senior surgeons before you fly.',
}) => {
  const [activeKey, setActiveKey] = useState<string>(defaultOpen);
  const pointerTypeRef = useRef<string>('mouse');
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const handlePointerDown = (e: React.PointerEvent) => {
    pointerTypeRef.current = e.pointerType;
  };

  const handleMouseEnter = (key: string) => {
    if (pointerTypeRef.current !== 'touch') {
      setActiveKey(key);
    }
  };

  const handleClick = (e: React.MouseEvent, key: string) => {
    if (pointerTypeRef.current === 'touch' && activeKey !== key) {
      e.preventDefault();
      setActiveKey(key);
      return;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const nextIndex =
      (index + (e.key === 'ArrowRight' ? 1 : SPECIALTIES_PILLARS.length - 1)) %
      SPECIALTIES_PILLARS.length;
    cardRefs.current[nextIndex]?.focus();
    setActiveKey(SPECIALTIES_PILLARS[nextIndex].key);
  };

  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="relative py-20 sm:py-24 lg:py-28 bg-[#fafcfb] overflow-hidden select-none transition-colors"
    >
      {/* Soft Ambient Radial Background Glows matching existing theme */}
      <div
        aria-hidden="true"
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[720px] h-[360px] bg-emerald-100/35 rounded-full blur-[120px] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-24 -left-20 w-[450px] h-[450px] bg-amber-100/40 rounded-full blur-[100px] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-24 -right-20 w-[500px] h-[450px] bg-emerald-100/40 rounded-full blur-[100px] pointer-events-none"
      />

      <div className="relative z-20 max-w-[1240px] mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0b383e]/5 text-[#0b383e] text-xs font-bold tracking-widest uppercase mb-4"
          >
            <span className="w-2 h-2 rounded-full bg-[#059669]"></span>
            Center of Clinical Excellence
          </motion.div>

          <motion.h2
            id={`${id}-title`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-[39px] lg:text-[72px] font-semibold tracking-[-1.5px] lg:tracking-[-1.75px] leading-[1.1] lg:leading-none text-balance"
            style={{ color: 'var(--color-primary)' }}
          >
            {title || (
              <>
                Explore our core{' '}
                <span
                  className="px-2.5 py-0.5 rounded-xl inline-block font-semibold"
                  style={{
                    backgroundColor:
                      'var(--color-heading-highlight, rgba(139, 210, 234, 0.28))',
                    color: 'var(--color-primary)',
                  }}
                >
                  specialities
                </span>
              </>
            )}
          </motion.h2>

          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 text-base sm:text-lg leading-relaxed text-gray-700 font-normal max-w-2xl mx-auto"
            >
              {subtitle}
            </motion.p>
          )}
        </div>

        {/* Accordion Cards Row */}
        <div className="mt-12 sm:mt-16 flex flex-col md:flex-row gap-2.5 md:gap-3.5 md:h-[490px]">
          {SPECIALTIES_PILLARS.map((specialty, index) => {
            const isActive = activeKey === specialty.key;

            return (
              <Link
                key={specialty.key}
                href={`/treatments/medical-treatments?specialty=${specialty.slug}`}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                role="region"
                aria-label={`${specialty.title}: ${specialty.tagline}`}
                aria-current={isActive ? 'true' : undefined}
                onPointerDown={handlePointerDown}
                onMouseEnter={() => handleMouseEnter(specialty.key)}
                onClick={(e) => handleClick(e, specialty.key)}
                onFocus={(e) => {
                  if (e.currentTarget.matches(':focus-visible')) {
                    setActiveKey(specialty.key);
                  }
                }}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className={`group relative overflow-hidden rounded-[20px] sm:rounded-[22px] min-w-0 isolate text-white outline-none cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.22,0.8,0.24,1)] focus-visible:ring-4 focus-visible:ring-[#5cc8e6] ${
                  isActive
                    ? 'md:flex-[2.8] h-[430px] sm:h-[450px] md:h-full shadow-[0_20px_50px_rgba(9,57,57,0.28)]'
                    : 'md:flex-1 h-[104px] md:h-full shadow-sm hover:shadow-md'
                }`}
              >
                {/* Background Photography */}
                <img
                  src={specialty.image}
                  alt={specialty.title}
                  style={{
                    objectPosition: isActive ? specialty.focus.open : specialty.focus.collapsed,
                  }}
                  className={`absolute inset-0 w-full h-full object-cover -z-20 transition-all duration-700 ease-[cubic-bezier(0.22,0.8,0.24,1)] ${
                    isActive ? 'scale-100' : 'scale-105'
                  }`}
                  loading="lazy"
                />

                {/* Dark Cinematic Gradient Overlays */}
                <div
                  className={`absolute inset-0 -z-10 transition-opacity duration-500 pointer-events-none ${
                    isActive
                      ? 'bg-gradient-to-t from-[#071e1d]/95 via-[#071e1d]/60 to-[#071e1d]/25'
                      : 'bg-gradient-to-b from-[#08201f]/35 via-[#08201f]/55 to-[#08201f]/90'
                  }`}
                />

                {/* Mini View (Visible when collapsed on desktop, or horizontal header when collapsed on mobile) */}
                <div
                  className={`absolute inset-0 transition-opacity duration-300 z-10 ${
                    isActive ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'
                  }`}
                  aria-hidden={isActive}
                >
                  {/* Desktop Layout (md and up): icon top-left, plus top-right, number & heading at bottom */}
                  <div className="hidden md:flex flex-col justify-between h-full p-3.5 sm:p-4 lg:p-6 relative">
                    {/* Top Row: Icon tile & Plus Button */}
                    <div className="flex items-start justify-between w-full">
                      <span className="w-[44px] h-[44px] lg:w-[52px] lg:h-[52px] rounded-[12px] lg:rounded-[14px] grid place-items-center bg-white/15 border border-white/20 backdrop-blur-md text-white flex-none">
                        <SpecialtyIcon icon={specialty.icon} size={22} />
                      </span>

                      <span
                        className="w-[30px] h-[30px] lg:w-[34px] lg:h-[34px] rounded-full border border-white/45 grid place-items-center text-white transition-all duration-200 group-hover:bg-white group-hover:text-[#093939] group-hover:border-white pointer-events-auto"
                        aria-hidden="true"
                      >
                        <Plus className="w-3.5 h-3.5 lg:w-4 lg:h-4 stroke-[2.2]" />
                      </span>
                    </div>

                    {/* Bottom: Item Number & Heading */}
                    <div className="text-left min-w-0">
                      <div className="text-[10px] lg:text-[11px] font-bold tracking-widest text-[#9fe0d4] uppercase truncate">
                        {specialty.categoryNumber} / {specialty.categoryLabel}
                      </div>
                      <h3 className="text-base lg:text-[21px] font-bold text-white mt-1 leading-tight truncate">
                        {specialty.shortTitle}
                      </h3>
                    </div>
                  </div>

                  {/* Mobile Layout (< md): horizontal bar inside 104px card */}
                  <div className="flex md:hidden h-full px-5 items-center justify-between gap-4 relative">
                    <div className="flex items-center gap-3.5 min-w-0 pr-12 text-left">
                      <span className="w-[48px] h-[48px] rounded-[14px] grid place-items-center bg-white/15 border border-white/20 backdrop-blur-md text-white flex-none">
                        <SpecialtyIcon icon={specialty.icon} size={22} />
                      </span>
                      <div className="min-w-0">
                        <div className="text-[10px] font-bold tracking-widest text-[#9fe0d4] uppercase">
                          {specialty.categoryNumber} / {specialty.categoryLabel}
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-white leading-tight mt-0.5 truncate">
                          {specialty.shortTitle}
                        </h3>
                      </div>
                    </div>

                    {/* Plus Button */}
                    <span
                      className="w-[34px] h-[34px] rounded-full border border-white/45 grid place-items-center text-white flex-none absolute right-5 top-1/2 -translate-y-1/2 pointer-events-auto"
                      aria-hidden="true"
                    >
                      <Plus className="w-4 h-4 stroke-[2.2]" />
                    </span>
                  </div>
                </div>

                {/* Full View (Visible when expanded) */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      key="full-content"
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.35, delay: 0.08, ease: 'easeOut' }}
                      className="absolute inset-0 p-5 sm:p-7 md:p-8 flex flex-col justify-between"
                      aria-hidden={!isActive}
                    >
                      {/* Top Bar: Icon, Eyebrow & Savings Badge */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span className="w-[52px] h-[52px] rounded-[14px] grid place-items-center bg-white/15 border border-white/20 backdrop-blur-md text-white flex-none">
                            <SpecialtyIcon icon={specialty.icon} size={26} />
                          </span>
                          <div>
                            <div className="text-xs font-bold tracking-widest text-[#9fe0d4] uppercase">
                              {specialty.categoryNumber} / {specialty.categoryLabel}
                            </div>
                            <div className="text-xs text-white/70 font-medium">
                              0{index + 1} / 0{SPECIALTIES_PILLARS.length}
                            </div>
                          </div>
                        </div>

                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#059669] text-white shadow-sm flex items-center gap-1.5 flex-none">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-200 animate-pulse"></span>
                          {specialty.savingsBadge}
                        </span>
                      </div>

                      {/* Center / Bottom: Title, Description, Tags & CTAs */}
                      <div className="space-y-3.5 mt-auto">
                        <h3 className="text-2xl sm:text-[32px] md:text-[34px] font-bold text-white leading-tight tracking-tight">
                          {specialty.title}
                        </h3>

                        <p className="text-xs sm:text-sm md:text-[15px] text-[#e3f1ee] max-w-[540px] leading-relaxed font-normal">
                          {specialty.tagline}
                        </p>

                        {/* Procedure Tags */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {specialty.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs font-medium text-white px-3 py-1 rounded-full bg-white/15 border border-white/20 backdrop-blur-md"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Bottom Bar: Starting Price & Consultation CTA */}
                        <div className="pt-3 border-t border-white/20 flex items-center justify-between gap-3 flex-wrap sm:flex-nowrap">
                          <div>
                            <span className="text-[10px] sm:text-[11px] font-semibold text-gray-300 uppercase tracking-wider block">
                              {specialty.startingPrice === 'N/A' ? 'Pricing' : 'Starting from'}
                            </span>
                            <span className="text-lg sm:text-xl font-extrabold text-[#8bd2ea]">
                              {specialty.startingPrice}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <span
                              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full bg-white text-[#093939] group-hover:bg-[#8fd8ec] font-bold text-xs sm:text-sm transition-all shadow-md group-hover:gap-2.5 flex-none cursor-pointer"
                            >
                              <span>Explore {specialty.shortTitle}</span>
                              <ArrowRight className="w-4 h-4 stroke-[2.2]" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SpecialtiesSection;

