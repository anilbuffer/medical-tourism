'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { BriefcaseMedical, Stethoscope, Heart, Plus, ArrowRight } from 'lucide-react';
import { useConsultation } from '@/components/providers/AppProviders';

export interface TreatmentPillar {
  key: 'medical' | 'checkup' | 'wellness';
  slug: string;
  title: string;
  cardLine: string;
  tags: string[];
  image: string;
  icon: 'medical' | 'stethoscope' | 'heart';
  focus: {
    collapsed: string;
    open: string;
  };
}

export const TREATMENT_PILLARS: TreatmentPillar[] = [
  {
    key: 'medical',
    slug: 'medical-treatments',
    title: 'Medical Treatments',
    cardLine: 'Specialist surgery at accredited hospitals, planned before you fly.',
    tags: ['Orthopaedics', 'IVF', 'Eye care', '+3 more'],
    image: '/images/treatments/medical.jpeg',
    icon: 'medical',
    focus: { collapsed: '72% 50%', open: '58% 50%' },
  },
  {
    key: 'checkup',
    slug: 'health-checkups',
    title: 'Health Check‑ups & Diagnostics',
    cardLine: 'Preventive check-ups and diagnostics, explained by a doctor.',
    tags: ['Full-body check-ups', 'Screening', 'Imaging'],
    image: '/images/treatments/checkup.jpeg',
    icon: 'stethoscope',
    focus: { collapsed: '42% 50%', open: '55% 50%' },
  },
  {
    key: 'wellness',
    slug: 'wellness',
    title: 'Wellness',
    cardLine: 'Recovery, rehabilitation and retreats in the Himalayan foothills.',
    tags: ['Recovery stays', 'Physiotherapy', 'Retreats'],
    image: '/images/treatments/wellness.jpeg',
    icon: 'heart',
    focus: { collapsed: '38% 50%', open: '50% 50%' },
  },
];

interface PillarIconProps {
  icon: 'medical' | 'stethoscope' | 'heart';
  size?: number;
}

const PillarIcon: React.FC<PillarIconProps> = ({ icon, size = 26 }) => {
  if (icon === 'medical') {
    return <BriefcaseMedical size={size} className="stroke-[1.8]" />;
  }
  if (icon === 'stethoscope') {
    return <Stethoscope size={size} className="stroke-[1.8]" />;
  }
  return <Heart size={size} className="stroke-[1.8]" />;
};

export interface FindYourTreatmentSectionProps {
  id?: string;
  defaultOpen?: 'medical' | 'checkup' | 'wellness';
  title?: React.ReactNode;
  subtitle?: string;
}

export const FindYourTreatmentSection: React.FC<FindYourTreatmentSectionProps> = ({
  id = 'find-your-treatment',
  defaultOpen = 'medical',
  title,
  subtitle = 'Treatment, prevention and recovery, all planned and coordinated by the same care team.',
}) => {
  const [activeKey, setActiveKey] = useState<string>(defaultOpen);
  const pointerTypeRef = useRef<string>('mouse');
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const { openConsultation } = useConsultation();

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
      (index + (e.key === 'ArrowRight' ? 1 : TREATMENT_PILLARS.length - 1)) %
      TREATMENT_PILLARS.length;
    cardRefs.current[nextIndex]?.focus();
    setActiveKey(TREATMENT_PILLARS[nextIndex].key);
  };

  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="relative py-20 sm:py-24 lg:py-28 bg-[#fafcfb] overflow-hidden select-none transition-colors"
    >
      {/* Soft Ambient Radial Background Glows matching CareServicesSection */}
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
        {/* Section Heading following CareServicesSection convention */}
        <div className="max-w-4xl mx-auto text-center">
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
                Find your{' '}
                <span
                  className="px-2.5 py-0.5 rounded-xl inline-block font-semibold"
                  style={{
                    backgroundColor:
                      'var(--color-heading-highlight, rgba(139, 210, 234, 0.25))',
                    color: 'var(--color-primary)',
                  }}
                >
                  treatment
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
              className="mt-4 text-base leading-6 text-medium font-normal max-w-xl mx-auto"
            >
              {subtitle}
            </motion.p>
          )}
        </div>

        {/* Accordion Cards Row */}
        <div className="mt-12 sm:mt-16 flex flex-col md:flex-row gap-2.5 md:gap-3.5 md:h-[460px]">
          {TREATMENT_PILLARS.map((pillar, index) => {
            const isActive = activeKey === pillar.key;
            const numberFormatted = `0${index + 1}`;

            return (
              <Link
                key={pillar.key}
                href={`#treatments`}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                role="region"
                aria-label={`${pillar.title}: ${pillar.cardLine}`}
                aria-current={isActive ? 'true' : undefined}
                onPointerDown={handlePointerDown}
                onMouseEnter={() => handleMouseEnter(pillar.key)}
                onClick={(e) => handleClick(e, pillar.key)}
                onFocus={(e) => {
                  if (e.currentTarget.matches(':focus-visible')) {
                    setActiveKey(pillar.key);
                  }
                }}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className={`group relative overflow-hidden rounded-[20px] sm:rounded-[22px] min-w-0 isolate text-white outline-none cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.22,0.8,0.24,1)] focus-visible:ring-4 focus-visible:ring-[#5cc8e6] ${
                  isActive
                    ? 'md:flex-[2] h-[390px] sm:h-[400px] md:h-full shadow-[0_18px_40px_rgba(9,57,57,0.22)]'
                    : 'md:flex-1 h-[104px] md:h-full shadow-sm hover:shadow-md'
                }`}
              >
                {/* Background Image */}
                <img
                  src={pillar.image}
                  alt={pillar.title}
                  style={{
                    objectPosition: isActive ? pillar.focus.open : pillar.focus.collapsed,
                  }}
                  className={`absolute inset-0 w-full h-full object-cover -z-20 transition-all duration-700 ease-[cubic-bezier(0.22,0.8,0.24,1)] ${
                    isActive ? 'scale-100' : 'scale-105'
                  }`}
                  loading="lazy"
                />

                {/* Dark Gradient Overlays */}
                <div
                  className={`absolute inset-0 -z-10 transition-opacity duration-500 pointer-events-none ${
                    isActive
                      ? 'bg-gradient-to-t from-[#071e1d]/90 via-[#071e1d]/55 to-transparent'
                      : 'bg-gradient-to-b from-[#08201f]/25 via-[#08201f]/40 to-[#08201f]/90'
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
                  <div className="hidden md:flex flex-col justify-between h-full p-6 relative">
                    {/* Top Row: Icon tile */}
                    <span className="w-[58px] h-[58px] rounded-[14px] grid place-items-center bg-white/15 border border-white/20 backdrop-blur-md text-white flex-none">
                      <PillarIcon icon={pillar.icon} />
                    </span>

                    {/* Top Right: Plus Button */}
                    <span
                      className="absolute top-6 right-6 w-[34px] h-[34px] rounded-full border border-white/45 grid place-items-center text-white transition-all duration-200 group-hover:bg-white group-hover:text-[#093939] group-hover:border-white pointer-events-auto"
                      aria-hidden="true"
                    >
                      <Plus className="w-4 h-4 stroke-[2.2]" />
                    </span>

                    {/* Bottom: Item Number & Heading */}
                    <div className="text-left">
                      <div className="text-xs font-bold tracking-widest text-[#9fe0d4]">
                        {numberFormatted}
                      </div>
                      <h3 className="text-xl lg:text-[23px] font-bold text-white mt-1.5 leading-tight">
                        {pillar.title}
                      </h3>
                    </div>
                  </div>

                  {/* Mobile Layout (< md): horizontal bar inside 104px card */}
                  <div className="flex md:hidden h-full px-5 items-center justify-between gap-4 relative">
                    <div className="flex items-center gap-3.5 min-w-0 pr-12 text-left">
                      <span className="w-[52px] h-[52px] rounded-[14px] grid place-items-center bg-white/15 border border-white/20 backdrop-blur-md text-white flex-none">
                        <PillarIcon icon={pillar.icon} />
                      </span>
                      <div className="min-w-0">
                        <div className="text-[11px] font-bold tracking-widest text-[#9fe0d4]">
                          {numberFormatted}
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-white leading-tight mt-0.5 truncate">
                          {pillar.title}
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
                      transition={{ duration: 0.35, delay: 0.1, ease: 'easeOut' }}
                      className="absolute inset-x-0 bottom-0 p-5 sm:p-7 md:p-8 flex flex-col justify-end"
                      aria-hidden={!isActive}
                    >
                      {/* Number with Total */}
                      <div className="text-xs font-bold tracking-widest text-[#9fe0d4]">
                        {numberFormatted}{' '}
                        <span className="opacity-55">/ 0{TREATMENT_PILLARS.length}</span>
                      </div>

                      {/* Full Title */}
                      <h3 className="text-2xl sm:text-[32px] font-bold text-white leading-tight tracking-tight mt-1">
                        {pillar.title}
                      </h3>

                      {/* Line Description */}
                      <p className="text-sm sm:text-base text-[#e3f1ee] max-w-[420px] mt-2 mb-4 leading-normal font-normal">
                        {pillar.cardLine}
                      </p>

                      {/* Bottom Bar: Tags & Explore CTA */}
                      <div className="flex items-start sm:items-center justify-between gap-3 sm:gap-4 flex-col sm:flex-row">
                        <div className="flex flex-wrap gap-1.5">
                          {pillar.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs sm:text-[13px] font-semibold text-white px-3 py-1 rounded-full bg-white/15 border border-white/20 backdrop-blur-md"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <span
                          onClick={(e) => {
                            e.stopPropagation();
                            openConsultation(pillar.title);
                          }}
                          className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-full bg-white text-[#093939] hover:bg-[#8fd8ec] font-bold text-sm sm:text-[14.5px] transition-all shadow-md group-hover:gap-3 flex-none cursor-pointer"
                        >
                          Explore
                          <ArrowRight className="w-4 h-4 stroke-[2.2]" />
                        </span>
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

export default FindYourTreatmentSection;
