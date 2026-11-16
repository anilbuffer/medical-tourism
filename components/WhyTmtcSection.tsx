'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  MapPin,
  Plane,
  Languages,
  Trees,
  Mountain,
  Utensils,
  Hospital,
  Bed,
  ArrowRight,
} from 'lucide-react';
import { useCountry, useConsultation } from '@/components/providers/AppProviders';

// ============================================================================
// CONFIGURATION OBJECT
// All copy, data, coordinates, and routes are stored here.
// Edit this config without touching the component markup.
// ============================================================================
export const CHANDIGARH_TRICITY_CONFIG = {
  // 1. Place pill
  placePill: {
    label: 'Chandigarh · Mohali · Panchkula',
  },

  // 2. Heading
  heading: 'A calm city to be treated in, and to recover in.',

  // 3. Sub-line
  subline: 'The same calibre of private hospitals, without the traffic and crowds of a metro.',

  // 4. Five points
  points: [
    {
      id: 'close-to-everything',
      label: 'Close to everything',
      /* TBC: the drive times */
      proof: 'Airport to hospital in about 30 minutes.',
      icon: 'plane' as const,
      bg: '#E6E8FA',
      iconColor: '#3E4BB8',
    },
    {
      id: 'spoken-languages',
      label: 'Spoken languages',
      /* TBC: the interpreter languages */
      proof: 'English, Hindi and Punjabi everywhere; Arabic, Bengali and Russian interpreters on request.',
      icon: 'languages' as const,
      bg: '#FDEBDD',
      iconColor: '#C2581A',
    },
    {
      id: 'calmer-city',
      label: 'A calmer city to recover in',
      proof: 'Planned sectors, wide roads and green spaces.',
      icon: 'trees' as const,
      bg: '#E1F3E7',
      iconColor: '#1F7A43',
    },
    {
      id: 'hills-nearby',
      label: 'Hills nearby',
      /* TBC: the drive times */
      /* TBC: the recovery stay location */
      proof: 'Kasauli is about two hours away for a quieter recovery.',
      icon: 'mountain' as const,
      bg: '#EFE6FA',
      iconColor: '#6E3FB0',
    },
    {
      id: 'familiar-food',
      label: 'Food that feels familiar',
      proof: 'Halal and vegetarian options are easy to find.',
      icon: 'utensils' as const,
      bg: '#FBE4E8',
      iconColor: '#B83A55',
    },
  ],

  // 5. Button
  cta: {
    label: 'Plan your trip',
    href: '#consultation',
  },

  // Map configuration & layers (Taller 600 x 720 coordinate space for generous breathing room)
  map: {
    ariaLabel:
      'Illustrated map of the Chandigarh tricity. Chandigarh Airport to the partner hospitals in Mohali is about 30 minutes, and the recovery stay is about 10 minutes from the hospitals. An optional hill stay in Kasauli, 1,900 m, is about 2 hours\' drive up into the hills.',
    disclaimer: 'Illustration, not to scale',

    // Pines around Kasauli framing the hills [x, y, scale]
    pines: [
      { x: 360, y: 155, scale: 0.85 },
      { x: 380, y: 140, scale: 0.75 },
      { x: 455, y: 130, scale: 0.9 },
      { x: 480, y: 110, scale: 0.8 },
      { x: 530, y: 115, scale: 1 },
      { x: 555, y: 135, scale: 0.85 },
      { x: 520, y: 155, scale: 0.9 },
      { x: 565, y: 150, scale: 0.7 },
    ],

    // Region labels inside SVG (Spacious cartographic positioning)
    regionLabels: {
      chandigarh: { text: 'CHANDIGARH', x: 330, y: 490 },
      mohali: { text: 'MOHALI', x: 70, y: 460 },
      panchkula: { text: 'PANCHKULA', x: 535, y: 430 },
      // Placed inside the serene lake water body
      lake: { text: 'Sukhna Lake', x: 385, y: 274 },
    },

    // HTML Overlays: Pins with large vertical separation across the 720px space
    pins: {
      airport: {
        x: 360,
        y: 635,
        label: 'Chandigarh Airport',
        color: '#0B2545',
      },
      hospitals: {
        x: 155,
        y: 500,
        label: 'Partner hospitals',
        color: '#007FFF', // azure (the key stop)
      },
      recovery: {
        /* TBC: the recovery stay location */
        x: 265,
        y: 385,
        label: 'Recovery stay',
        color: '#0B2545',
      },
      kasauli: {
        /* TBC: the recovery stay location */
        x: 420,
        y: 135,
        color: '#1F7A43',
        card: {
          title: 'Kasauli hills',
          line1: '1,900 m · Quiet, cooler',
          line2: 'recovery stays',
        },
      },
    },

    // Drive-time chips - spacious positioning along the open route arcs
    chips: {
      airportToHospital: {
        /* TBC: the drive times */
        text: '≈ 30 min',
        x: 245,
        y: 590,
        mobileX: 245,
        mobileY: 595,
        bg: '#0067D1',
      },
      hospitalToRecovery: {
        /* TBC: the drive times */
        text: '≈ 10 min',
        x: 195,
        y: 445,
        bg: '#0067D1',
      },
      recoveryToKasauli: {
        /* TBC: the drive times */
        text: 'Optional hill stay · ≈ 2 hr',
        x: 455,
        y: 335,
        bg: '#1F7A43',
      },
    },
  },

  // Flight routes for each country
  /* TBC: the flight routes for each country */
  countries: {
    AE: { city: 'Dubai', line: 'About 3½ hours direct, longer with a connection' },
    SA: { city: 'Riyadh', line: 'One stop via Delhi' },
    OM: { city: 'Muscat', line: 'One stop via Delhi' },
    BD: { city: 'Dhaka', line: 'One stop via Delhi' },
    NG: { city: 'Lagos', line: 'Connecting via the Gulf and Delhi' },
    KE: { city: 'Nairobi', line: 'One stop via Mumbai or Delhi' },
    UZ: { city: 'Tashkent', line: 'One stop via Delhi' },
    KZ: { city: 'Almaty', line: 'One stop via Delhi' },
    GB: { city: 'London', line: 'One stop via Delhi' },
    CA: { city: 'Toronto', line: 'One stop via Delhi' },
    DE: { city: 'Frankfurt', line: 'One stop via Delhi' },
  } as Record<string, { city: string; line: string }>,

  defaultCountryCode: 'AE',
};

// Icon map for the 5 points
const ICON_MAP = {
  plane: Plane,
  languages: Languages,
  trees: Trees,
  mountain: Mountain,
  utensils: Utensils,
};

export interface WhyTmtcSectionProps {
  market?: string;
}

export const WhyTmtcSection: React.FC<WhyTmtcSectionProps> = ({ market }) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isIn, setIsIn] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Read country from context or fallback to prop / AE
  let selectedCountryCode: string | undefined;
  try {
    const countryCtx = useCountry();
    if (countryCtx?.selectedCountry?.code) {
      selectedCountryCode = countryCtx.selectedCountry.code.toUpperCase();
    }
  } catch {
    // Fallback if rendered outside AppProviders
  }

  // Consultation modal trigger if available
  let openConsultation: ((treatment?: string) => void) | undefined;
  try {
    const consultationCtx = useConsultation();
    openConsultation = consultationCtx?.openConsultation;
  } catch {
    // Fallback if rendered outside AppProviders
  }

  // Resolve country data
  const resolvedCode = (market || selectedCountryCode || CHANDIGARH_TRICITY_CONFIG.defaultCountryCode).toUpperCase();
  const countryData =
    CHANDIGARH_TRICITY_CONFIG.countries[resolvedCode] ||
    CHANDIGARH_TRICITY_CONFIG.countries[CHANDIGARH_TRICITY_CONFIG.defaultCountryCode];

  // IntersectionObserver: triggers animation at >= 30% visibility, resets when under 8% visibility
  useEffect(() => {
    const node = sectionRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setIsIn(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio >= 0.3) {
            setIsIn(true);
          } else if (entry.intersectionRatio < 0.08) {
            setIsIn(false);
          }
        });
      },
      {
        threshold: [0, 0.08, 0.3, 0.5, 1.0],
      }
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
    };
  }, []);

  // Standard smooth easing curves
  const easeStandard: [number, number, number, number] = [0.2, 0.7, 0.2, 1];
  const easeSpring: [number, number, number, number] = [0.34, 1.6, 0.64, 1];

  return (
    <section
      ref={sectionRef}
      id="chandigarh-tricity"
      aria-labelledby="chandigarh-tricity-heading"
      className="w-full bg-surface-dim py-16 lg:py-24 transition-colors duration-300 font-sans"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Card with Project Standard Border & Shadow */}
        <div className="bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-9 lg:p-12 shadow-sm">
          {/* Two-Column Responsive Grid with balanced desktop stretch */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* ========================================================= */}
            {/* LEFT COLUMN: Project Standard Typography                  */}
            {/* ========================================================= */}
            <div className="lg:col-span-6 flex flex-col items-start w-full">
              
              {/* 1. Place Pill (Standard Eyebrow Badge) */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-5 bg-white border border-gray-200 shadow-xs">
                <MapPin className="w-3.5 h-3.5 text-[#0067D1] shrink-0" strokeWidth={2} />
                <span className="font-bold text-gray-800 tracking-tight">
                  {CHANDIGARH_TRICITY_CONFIG.placePill.label}
                </span>
              </div>

              {/* 2. Heading (H2 - Project Standard) */}
              <h2
                id="chandigarh-tricity-heading"
                className="text-v2-title font-semibold tracking-[-1px] lg:tracking-[-2px] leading-[40px] lg:leading-[1.1] text-left text-balance"
                style={{ color: 'var(--color-primary)' }}
              >
                {CHANDIGARH_TRICITY_CONFIG.heading}
              </h2>

              {/* 3. Sub-line (Project Standard muted description) */}
              <p className="mt-4 text-base leading-6 text-medium font-normal max-w-xl">
                {CHANDIGARH_TRICITY_CONFIG.subline}
              </p>

              {/* 4. Five Points (Animated with Framer Motion) */}
              <div className="flex flex-col gap-4 mt-7 mb-8 w-full">
                {CHANDIGARH_TRICITY_CONFIG.points.map((pt, idx) => {
                  const IconComponent = ICON_MAP[pt.icon];
                  return (
                    <motion.div
                      key={pt.id}
                      initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                      animate={
                        shouldReduceMotion || isIn
                          ? { opacity: 1, y: 0 }
                          : { opacity: 0, y: 24 }
                      }
                      transition={
                        shouldReduceMotion
                          ? { duration: 0 }
                          : {
                              duration: 0.65,
                              delay: 0.2 + idx * 0.1,
                              ease: easeStandard,
                            }
                      }
                      className="flex items-start gap-3.5 group"
                    >
                      <div
                        className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0 shadow-xs transition-transform group-hover:scale-105"
                        style={{ backgroundColor: pt.bg }}
                      >
                        <IconComponent
                          className="w-5 h-5"
                          style={{ color: pt.iconColor }}
                          strokeWidth={1.8}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </div>
                      <div className="flex-1 min-w-0 pt-0.5">
                        <div className="text-sm sm:text-base font-semibold text-gray-900 leading-snug">
                          {pt.label}
                        </div>
                        <div className="mt-0.5 text-xs sm:text-sm text-gray-500 font-normal leading-relaxed">
                          {pt.proof}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* 5. Button (Project Standard Primary Pill CTA) */}
              <div className="w-full sm:w-auto">
                <a
                  href={CHANDIGARH_TRICITY_CONFIG.cta.href}
                  onClick={(e) => {
                    if (openConsultation) {
                      e.preventDefault();
                      openConsultation('Chandigarh Tricity');
                    }
                  }}
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full font-bold text-sm text-white shadow-md transition-all duration-200 hover:scale-105 hover:brightness-110 hover:shadow-lg cursor-pointer w-full sm:w-auto text-center focus-visible:outline focus-visible:outline-3 focus-visible:outline-[#007FFF] focus-visible:outline-offset-3"
                  style={{ backgroundColor: 'var(--color-primary)' }}
                >
                  <span>{CHANDIGARH_TRICITY_CONFIG.cta.label}</span>
                  <ArrowRight className="w-4 h-4" style={{ color: 'var(--color-secondary)' }} />
                </a>
              </div>

            </div>

            {/* ========================================================= */}
            {/* RIGHT COLUMN: Tall, Spacious Framer-Motion Map            */}
            {/* ========================================================= */}
            <div className="lg:col-span-6 w-full flex items-center justify-center">
              {/* Outer relative wrapper holding Map & Country card */}
              <div className="relative w-full max-w-[560px] lg:max-w-none">
                
                {/* Map Container (Increased Height: aspect-[600/720] min-h-[580px] sm:min-h-[640px] lg:min-h-[700px]) */}
                <div
                  role="img"
                  aria-label={CHANDIGARH_TRICITY_CONFIG.map.ariaLabel}
                  className="relative w-full aspect-[600/720] min-h-[580px] sm:min-h-[640px] lg:min-h-[700px] rounded-2xl sm:rounded-3xl overflow-hidden select-none bg-[#EEF4FA] shadow-xs border border-gray-100/70"
                >
                  {/* Background SVG Illustration (viewBox: 600 x 720) */}
                  <svg
                    viewBox="0 0 600 720"
                    className="w-full h-full block"
                    aria-hidden="true"
                  >
                    <defs>
                      {/* Hill ridge vertical linear gradients */}
                      <linearGradient id="fm-back-ridge-grad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#B9CCE4" />
                        <stop offset="100%" stopColor="#EEF4FA" />
                      </linearGradient>
                      <linearGradient id="fm-front-ridge-grad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="10%" stopColor="#A6CDB1" />
                        <stop offset="100%" stopColor="#EEF4FA" />
                      </linearGradient>
                      <linearGradient id="fm-foothills-grad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#D6E9DA" />
                        <stop offset="100%" stopColor="#EEF4FA" />
                      </linearGradient>

                      {/* Route 3 SVG reveal mask powered by Framer Motion pathLength */}
                      <mask id="fm-route3-mask" maskUnits="userSpaceOnUse">
                        <motion.path
                          d="M265,385 C330,365 420,360 470,335 C510,315 525,280 500,250 L435,225 L485,190 L425,165 L420,135"
                          fill="none"
                          stroke="#FFFFFF"
                          strokeWidth={12}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          initial={shouldReduceMotion ? false : { pathLength: 0 }}
                          animate={
                            shouldReduceMotion || isIn
                              ? { pathLength: 1 }
                              : { pathLength: 0 }
                          }
                          transition={
                            shouldReduceMotion
                              ? { duration: 0 }
                              : {
                                  duration: 1.4,
                                  delay: 2.3,
                                  ease: easeStandard,
                                }
                          }
                        />
                      </mask>
                    </defs>

                    {/* 1. Background rect */}
                    <rect width="600" height="720" fill="#EEF4FA" />

                    {/* 2. Three hill ridges filling the top third (Framer Motion fade up) */}
                    {/* Back ridge (highest, 3.2s) */}
                    <motion.path
                      d="M0 240V100C60 70 110 35 175 46C240 57 280 15 350 23C420 30 450 5 510 12C550 18 580 2 600 9V240Z"
                      fill="url(#fm-back-ridge-grad)"
                      initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
                      animate={
                        shouldReduceMotion || isIn
                          ? { opacity: 1, y: 0 }
                          : { opacity: 0, y: 14 }
                      }
                      transition={
                        shouldReduceMotion
                          ? { duration: 0 }
                          : { duration: 0.9, delay: 3.2, ease: easeStandard }
                      }
                    />

                    {/* Front ridge (green Shivalik, 3.4s) */}
                    <motion.path
                      d="M0 260V160C60 140 110 110 170 122C230 134 280 90 345 100C400 108 430 82 478 88C520 94 560 72 600 84V260Z"
                      fill="url(#fm-front-ridge-grad)"
                      initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
                      animate={
                        shouldReduceMotion || isIn
                          ? { opacity: 1, y: 0 }
                          : { opacity: 0, y: 14 }
                      }
                      transition={
                        shouldReduceMotion
                          ? { duration: 0 }
                          : { duration: 0.9, delay: 3.4, ease: easeStandard }
                      }
                    />

                    {/* Foothills (pale, 3.5s) */}
                    <motion.path
                      d="M0 290V210C80 190 150 205 230 192C310 180 380 200 450 186C520 174 570 194 600 186V290Z"
                      fill="url(#fm-foothills-grad)"
                      initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
                      animate={
                        shouldReduceMotion || isIn
                          ? { opacity: 1, y: 0 }
                          : { opacity: 0, y: 14 }
                      }
                      transition={
                        shouldReduceMotion
                          ? { duration: 0 }
                          : { duration: 0.9, delay: 3.5, ease: easeStandard }
                      }
                    />

                    {/* 3. Pines around Kasauli (Framer Motion pop in from 3.5s, 60ms apart) */}
                    {CHANDIGARH_TRICITY_CONFIG.map.pines.map((pine, idx) => (
                      <g
                        key={`pine-${idx}`}
                        transform={`translate(${pine.x}, ${pine.y}) scale(${pine.scale})`}
                      >
                        <motion.path
                          d="M0-16L9 0H-9ZM0-8L11 9H-11ZM-1.5 9H1.5V14H-1.5Z"
                          fill="#4F8F63"
                          style={{ transformOrigin: '0px 14px' }}
                          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0 }}
                          animate={
                            shouldReduceMotion || isIn
                              ? { opacity: 1, scale: 1 }
                              : { opacity: 0, scale: 0 }
                          }
                          transition={
                            shouldReduceMotion
                              ? { duration: 0 }
                              : {
                                  duration: 0.45,
                                  delay: 3.5 + idx * 0.06,
                                  ease: [0.34, 1.5, 0.64, 1],
                                }
                          }
                        />
                      </g>
                    ))}

                    {/* 4. Chandigarh sector grid (y: 420, rotated -12 deg) */}
                    <g transform="translate(310, 420) rotate(-12)">
                      {Array.from({ length: 4 }).flatMap((_, row) =>
                        Array.from({ length: 5 }).map((_, col) => (
                          <rect
                            key={`chd-sec-${row}-${col}`}
                            x={-112 + col * 46}
                            y={-82 + row * 42}
                            width={40}
                            height={36}
                            rx={5}
                            fill="#E5EDF6"
                          />
                        ))
                      )}
                      {/* Green Leisure Valley strip */}
                      <rect x={-24} y={-92} width={12} height={178} rx={6} fill="#D6EBDA" />
                    </g>

                    {/* 5. Mohali grid (y: 520, rotated -12 deg) */}
                    <g transform="translate(140, 520) rotate(-12)" opacity={0.65}>
                      {Array.from({ length: 3 }).flatMap((_, row) =>
                        Array.from({ length: 3 }).map((_, col) => (
                          <rect
                            key={`moh-sec-${row}-${col}`}
                            x={-66 + col * 46}
                            y={-60 + row * 42}
                            width={40}
                            height={36}
                            rx={5}
                            fill="#E8EEF5"
                          />
                        ))
                      )}
                    </g>

                    {/* 6. Sukhna Lake (around y: 270) */}
                    <path
                      d="M346 270C356 248 400 242 420 258C438 274 422 296 394 298C368 300 338 290 346 270Z"
                      fill="#B9D7F1"
                    />

                    {/* 7 & 8. Spacious Routes & Casings */}
                    {/* Route 1 Casing (white, stroke 8, delay 0.5s over 0.9s) */}
                    <motion.path
                      d="M360,635 C290,635 210,590 155,500"
                      fill="none"
                      stroke="#FFFFFF"
                      strokeWidth={8}
                      strokeLinecap="round"
                      initial={shouldReduceMotion ? false : { pathLength: 0 }}
                      animate={
                        shouldReduceMotion || isIn
                          ? { pathLength: 1 }
                          : { pathLength: 0 }
                      }
                      transition={
                        shouldReduceMotion
                          ? { duration: 0 }
                          : { duration: 0.9, delay: 0.5, ease: easeStandard }
                      }
                    />
                    {/* Route 1 Solid Azure Line */}
                    <motion.path
                      d="M360,635 C290,635 210,590 155,500"
                      fill="none"
                      stroke="#007FFF"
                      strokeWidth={3.5}
                      strokeLinecap="round"
                      initial={shouldReduceMotion ? false : { pathLength: 0 }}
                      animate={
                        shouldReduceMotion || isIn
                          ? { pathLength: 1 }
                          : { pathLength: 0 }
                      }
                      transition={
                        shouldReduceMotion
                          ? { duration: 0 }
                          : { duration: 0.9, delay: 0.5, ease: easeStandard }
                      }
                    />

                    {/* Route 2 Casing (white, stroke 8, delay 1.6s over 0.5s) */}
                    <motion.path
                      d="M155,500 C180,450 215,405 265,385"
                      fill="none"
                      stroke="#FFFFFF"
                      strokeWidth={8}
                      strokeLinecap="round"
                      initial={shouldReduceMotion ? false : { pathLength: 0 }}
                      animate={
                        shouldReduceMotion || isIn
                          ? { pathLength: 1 }
                          : { pathLength: 0 }
                      }
                      transition={
                        shouldReduceMotion
                          ? { duration: 0 }
                          : { duration: 0.5, delay: 1.6, ease: easeStandard }
                      }
                    />
                    {/* Route 2 Solid Azure Line */}
                    <motion.path
                      d="M155,500 C180,450 215,405 265,385"
                      fill="none"
                      stroke="#007FFF"
                      strokeWidth={3.5}
                      strokeLinecap="round"
                      initial={shouldReduceMotion ? false : { pathLength: 0 }}
                      animate={
                        shouldReduceMotion || isIn
                          ? { pathLength: 1 }
                          : { pathLength: 0 }
                      }
                      transition={
                        shouldReduceMotion
                          ? { duration: 0 }
                          : { duration: 0.5, delay: 1.6, ease: easeStandard }
                      }
                    />

                    {/* Route 3 (Dotted Green climbing in switchbacks into Kasauli at 420, 135) */}
                    <g mask="url(#fm-route3-mask)">
                      {/* Route 3 Casing */}
                      <path
                        d="M265,385 C330,365 420,360 470,335 C510,315 525,280 500,250 L435,225 L485,190 L425,165 L420,135"
                        fill="none"
                        stroke="#FFFFFF"
                        strokeWidth={8}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      {/* Route 3 Dotted Green Line */}
                      <path
                        d="M265,385 C330,365 420,360 470,335 C510,315 525,280 500,250 L435,225 L485,190 L425,165 L420,135"
                        fill="none"
                        stroke="#2E8B57"
                        strokeWidth={3.5}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeDasharray="2 8"
                      />
                    </g>

                    {/* 9. Region Text in SVG */}
                    <text
                      x={CHANDIGARH_TRICITY_CONFIG.map.regionLabels.chandigarh.x}
                      y={CHANDIGARH_TRICITY_CONFIG.map.regionLabels.chandigarh.y}
                      textAnchor="middle"
                      fill="#8395A8"
                      fontSize={11.5}
                      fontWeight={800}
                      letterSpacing="0.16em"
                    >
                      {CHANDIGARH_TRICITY_CONFIG.map.regionLabels.chandigarh.text}
                    </text>
                    <text
                      x={CHANDIGARH_TRICITY_CONFIG.map.regionLabels.mohali.x}
                      y={CHANDIGARH_TRICITY_CONFIG.map.regionLabels.mohali.y}
                      textAnchor="middle"
                      fill="#8395A8"
                      fontSize={11.5}
                      fontWeight={800}
                      letterSpacing="0.16em"
                    >
                      {CHANDIGARH_TRICITY_CONFIG.map.regionLabels.mohali.text}
                    </text>
                    <text
                      x={CHANDIGARH_TRICITY_CONFIG.map.regionLabels.panchkula.x}
                      y={CHANDIGARH_TRICITY_CONFIG.map.regionLabels.panchkula.y}
                      textAnchor="middle"
                      fill="#8395A8"
                      fontSize={11.5}
                      fontWeight={800}
                      letterSpacing="0.16em"
                    >
                      {CHANDIGARH_TRICITY_CONFIG.map.regionLabels.panchkula.text}
                    </text>
                    {/* Sukhna Lake positioned inside the lake water body */}
                    <text
                      x={CHANDIGARH_TRICITY_CONFIG.map.regionLabels.lake.x}
                      y={CHANDIGARH_TRICITY_CONFIG.map.regionLabels.lake.y}
                      textAnchor="middle"
                      fill="#3B658A"
                      fontSize={11}
                      fontStyle="italic"
                      fontWeight={700}
                    >
                      {CHANDIGARH_TRICITY_CONFIG.map.regionLabels.lake.text}
                    </text>
                  </svg>

                  {/* =================================================== */}
                  {/* HTML OVERLAYS: Cleanly Spaced Pins, Labels & Chips  */}
                  {/* =================================================== */}

                  {/* 1. Airport Pin at (360, 635) */}
                  <motion.div
                    initial={shouldReduceMotion ? false : { opacity: 0, y: -12, scale: 0.65 }}
                    animate={
                      shouldReduceMotion || isIn
                        ? { opacity: 1, y: 0, scale: 1 }
                        : { opacity: 0, y: -12, scale: 0.65 }
                    }
                    transition={
                      shouldReduceMotion
                        ? { duration: 0 }
                        : { duration: 0.6, delay: 0.2, ease: easeSpring }
                    }
                    whileHover={{ scale: 1.08 }}
                    className="absolute z-10 pointer-events-auto flex items-center"
                    style={{
                      left: `${(CHANDIGARH_TRICITY_CONFIG.map.pins.airport.x / 600) * 100}%`,
                      top: `${(CHANDIGARH_TRICITY_CONFIG.map.pins.airport.y / 720) * 100}%`,
                      transform: 'translate(-18px, -50%)',
                    }}
                  >
                    <div
                      className="w-[34px] h-[34px] sm:w-[36px] sm:h-[36px] rounded-full border-2 sm:border-[2.5px] border-white flex items-center justify-center shadow-md shrink-0 z-10"
                      style={{ backgroundColor: CHANDIGARH_TRICITY_CONFIG.map.pins.airport.color }}
                    >
                      <Plane className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" strokeWidth={1.8} />
                    </div>
                    {/* Label to the right */}
                    <div className="-ml-2 pl-3.5 pr-3 py-1 bg-white text-[#0B2545] text-[11px] sm:text-[12px] font-bold rounded-full shadow-xs border border-gray-200/60 whitespace-nowrap">
                      {CHANDIGARH_TRICITY_CONFIG.map.pins.airport.label}
                    </div>
                  </motion.div>

                  {/* 2. Partner Hospitals Pin at (155, 500) - Azure */}
                  <motion.div
                    initial={shouldReduceMotion ? false : { opacity: 0, y: -12, scale: 0.65 }}
                    animate={
                      shouldReduceMotion || isIn
                        ? { opacity: 1, y: 0, scale: 1 }
                        : { opacity: 0, y: -12, scale: 0.65 }
                    }
                    transition={
                      shouldReduceMotion
                        ? { duration: 0 }
                        : { duration: 0.6, delay: 1.3, ease: easeSpring }
                    }
                    whileHover={{ scale: 1.08 }}
                    className="absolute z-10 pointer-events-auto flex flex-col items-center"
                    style={{
                      left: `${(CHANDIGARH_TRICITY_CONFIG.map.pins.hospitals.x / 600) * 100}%`,
                      top: `${(CHANDIGARH_TRICITY_CONFIG.map.pins.hospitals.y / 720) * 100}%`,
                      transform: 'translate(-50%, -18px)',
                    }}
                  >
                    <div
                      className="w-[34px] h-[34px] sm:w-[36px] sm:h-[36px] rounded-full border-2 sm:border-[2.5px] border-white flex items-center justify-center shadow-md shrink-0 z-10"
                      style={{ backgroundColor: CHANDIGARH_TRICITY_CONFIG.map.pins.hospitals.color }}
                    >
                      <Hospital className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" strokeWidth={1.8} />
                    </div>
                    {/* Label below pin */}
                    <div className="mt-1.5 px-2.5 py-1 bg-white text-[#0B2545] text-[11px] sm:text-[12px] font-bold rounded-full shadow-xs border border-gray-200/60 whitespace-nowrap">
                      {CHANDIGARH_TRICITY_CONFIG.map.pins.hospitals.label}
                    </div>
                  </motion.div>

                  {/* 3. Recovery Stay Pin at (265, 385) */}
                  <motion.div
                    initial={shouldReduceMotion ? false : { opacity: 0, y: -12, scale: 0.65 }}
                    animate={
                      shouldReduceMotion || isIn
                        ? { opacity: 1, y: 0, scale: 1 }
                        : { opacity: 0, y: -12, scale: 0.65 }
                    }
                    transition={
                      shouldReduceMotion
                        ? { duration: 0 }
                        : { duration: 0.6, delay: 2.05, ease: easeSpring }
                    }
                    whileHover={{ scale: 1.08 }}
                    className="absolute z-10 pointer-events-auto flex items-center"
                    style={{
                      left: `${(CHANDIGARH_TRICITY_CONFIG.map.pins.recovery.x / 600) * 100}%`,
                      top: `${(CHANDIGARH_TRICITY_CONFIG.map.pins.recovery.y / 720) * 100}%`,
                      transform: 'translate(-18px, -50%)',
                    }}
                  >
                    <div
                      className="w-[34px] h-[34px] sm:w-[36px] sm:h-[36px] rounded-full border-2 sm:border-[2.5px] border-white flex items-center justify-center shadow-md shrink-0 z-10"
                      style={{ backgroundColor: CHANDIGARH_TRICITY_CONFIG.map.pins.recovery.color }}
                    >
                      <Bed className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" strokeWidth={1.8} />
                    </div>
                    {/* Label attached cleanly to the right */}
                    <div className="-ml-2 pl-3.5 pr-3 py-1 bg-white text-[#0B2545] text-[11px] sm:text-[12px] font-bold rounded-full shadow-xs border border-gray-200/60 whitespace-nowrap">
                      {CHANDIGARH_TRICITY_CONFIG.map.pins.recovery.label}
                    </div>
                  </motion.div>

                  {/* 4. Kasauli Pin at (420, 135) - drops in at 3.7s right as Route 3 reaches Kasauli */}
                  <motion.div
                    initial={shouldReduceMotion ? false : { opacity: 0, y: -12, scale: 0.65 }}
                    animate={
                      shouldReduceMotion || isIn
                        ? { opacity: 1, y: 0, scale: 1 }
                        : { opacity: 0, y: -12, scale: 0.65 }
                    }
                    transition={
                      shouldReduceMotion
                        ? { duration: 0 }
                        : { duration: 0.6, delay: 3.7, ease: easeSpring }
                    }
                    whileHover={{ scale: 1.08 }}
                    className="absolute z-10 pointer-events-auto"
                    style={{
                      left: `${(CHANDIGARH_TRICITY_CONFIG.map.pins.kasauli.x / 600) * 100}%`,
                      top: `${(CHANDIGARH_TRICITY_CONFIG.map.pins.kasauli.y / 720) * 100}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    <div
                      className="w-[34px] h-[34px] sm:w-[36px] sm:h-[36px] rounded-full border-2 sm:border-[2.5px] border-white flex items-center justify-center shadow-md"
                      style={{ backgroundColor: CHANDIGARH_TRICITY_CONFIG.map.pins.kasauli.color }}
                    >
                      <Mountain className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" strokeWidth={1.8} />
                    </div>
                  </motion.div>

                  {/* Kasauli Hills Card: Positioned safely below-left of pin using right/top (never clips right edge, drops in at 3.7s) */}
                  <motion.div
                    initial={shouldReduceMotion ? false : { opacity: 0, y: -12, scale: 0.9 }}
                    animate={
                      shouldReduceMotion || isIn
                        ? { opacity: 1, y: 0, scale: 1 }
                        : { opacity: 0, y: -12, scale: 0.9 }
                    }
                    transition={
                      shouldReduceMotion
                        ? { duration: 0 }
                        : { duration: 0.6, delay: 3.7, ease: easeSpring }
                    }
                    whileHover={{ scale: 1.03 }}
                    className="absolute z-20 pointer-events-auto bg-white rounded-2xl p-3 sm:p-3.5 shadow-[0_8px_24px_rgba(0,0,0,0.08)] flex items-center gap-3 w-[205px] sm:w-[215px] border border-gray-100/80"
                    style={{
                      right: `${((600 - CHANDIGARH_TRICITY_CONFIG.map.pins.kasauli.x + 10) / 600) * 100}%`,
                      top: `${((CHANDIGARH_TRICITY_CONFIG.map.pins.kasauli.y + 18) / 720) * 100}%`,
                    }}
                  >
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#E1F3E7] flex items-center justify-center shrink-0">
                      <Trees className="w-5 h-5 text-[#1F7A43]" strokeWidth={1.8} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[13px] sm:text-[13.5px] font-bold text-[#0B2545] leading-snug">
                        {CHANDIGARH_TRICITY_CONFIG.map.pins.kasauli.card.title}
                      </div>
                      <div className="text-[11px] sm:text-[11.5px] text-[#5B6470] leading-snug mt-0.5">
                        {CHANDIGARH_TRICITY_CONFIG.map.pins.kasauli.card.line1}
                        <br />
                        {CHANDIGARH_TRICITY_CONFIG.map.pins.kasauli.card.line2}
                      </div>
                    </div>
                  </motion.div>

                  {/* Drive-time Chips - Placed along open, spacious route segments */}
                  {/* Chip 1: ≈ 30 min (Midpoint of Route 1, delay 1.4s) */}
                  <motion.div
                    initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.85 }}
                    animate={
                      shouldReduceMotion || isIn
                        ? { opacity: 1, scale: 1 }
                        : { opacity: 0, scale: 0.85 }
                    }
                    transition={
                      shouldReduceMotion
                        ? { duration: 0 }
                        : { duration: 0.5, delay: 1.4, ease: easeStandard }
                    }
                    className="absolute z-15 pointer-events-auto whitespace-nowrap text-[10.5px] sm:text-[11px] font-bold text-white px-2.5 py-1 rounded-full shadow-xs -translate-x-1/2 -translate-y-1/2"
                    style={{
                      left: `${(CHANDIGARH_TRICITY_CONFIG.map.chips.airportToHospital.x / 600) * 100}%`,
                      top: `${(CHANDIGARH_TRICITY_CONFIG.map.chips.airportToHospital.y / 720) * 100}%`,
                      backgroundColor: CHANDIGARH_TRICITY_CONFIG.map.chips.airportToHospital.bg,
                    }}
                  >
                    {CHANDIGARH_TRICITY_CONFIG.map.chips.airportToHospital.text}
                  </motion.div>

                  {/* Chip 2: ≈ 10 min (Midpoint of Route 2, delay 2.1s) */}
                  <motion.div
                    initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.85 }}
                    animate={
                      shouldReduceMotion || isIn
                        ? { opacity: 1, scale: 1 }
                        : { opacity: 0, scale: 0.85 }
                    }
                    transition={
                      shouldReduceMotion
                        ? { duration: 0 }
                        : { duration: 0.5, delay: 2.1, ease: easeStandard }
                    }
                    className="absolute z-15 pointer-events-auto whitespace-nowrap text-[10.5px] sm:text-[11px] font-bold text-white px-2.5 py-1 rounded-full shadow-xs -translate-x-1/2 -translate-y-1/2"
                    style={{
                      left: `${(CHANDIGARH_TRICITY_CONFIG.map.chips.hospitalToRecovery.x / 600) * 100}%`,
                      top: `${(CHANDIGARH_TRICITY_CONFIG.map.chips.hospitalToRecovery.y / 720) * 100}%`,
                      backgroundColor: CHANDIGARH_TRICITY_CONFIG.map.chips.hospitalToRecovery.bg,
                    }}
                  >
                    {CHANDIGARH_TRICITY_CONFIG.map.chips.hospitalToRecovery.text}
                  </motion.div>

                  {/* Chip 3: Optional hill stay · ≈ 2 hr (Scenic switchback route, delay 2.6s) */}
                  <motion.div
                    initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.85 }}
                    animate={
                      shouldReduceMotion || isIn
                        ? { opacity: 1, scale: 1 }
                        : { opacity: 0, scale: 0.85 }
                    }
                    transition={
                      shouldReduceMotion
                        ? { duration: 0 }
                        : { duration: 0.5, delay: 2.6, ease: easeStandard }
                    }
                    className="absolute z-15 pointer-events-auto whitespace-nowrap text-[10.5px] sm:text-[11px] font-bold text-white px-2.5 py-1 rounded-full shadow-xs -translate-x-1/2 -translate-y-1/2"
                    style={{
                      left: `${(CHANDIGARH_TRICITY_CONFIG.map.chips.recoveryToKasauli.x / 600) * 100}%`,
                      top: `${(CHANDIGARH_TRICITY_CONFIG.map.chips.recoveryToKasauli.y / 720) * 100}%`,
                      backgroundColor: CHANDIGARH_TRICITY_CONFIG.map.chips.recoveryToKasauli.bg,
                    }}
                  >
                    {CHANDIGARH_TRICITY_CONFIG.map.chips.recoveryToKasauli.text}
                  </motion.div>

                  {/* Disclaimer note in bottom-right corner */}
                  <div className="absolute right-3.5 bottom-3 text-[10.5px] italic text-[#7C8A99] pointer-events-none select-none">
                    {CHANDIGARH_TRICITY_CONFIG.map.disclaimer}
                  </div>

                </div>

                {/* Country Card: Floating bottom-left badge with glassmorphism */}
                <motion.div
                  key={resolvedCode}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                  animate={
                    shouldReduceMotion || isIn
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 16 }
                  }
                  transition={
                    shouldReduceMotion
                      ? { duration: 0 }
                      : { duration: 0.65, delay: 0.3, ease: easeStandard }
                  }
                  whileHover={{ scale: 1.02 }}
                  className="relative sm:absolute sm:left-4 sm:bottom-4 mt-3 sm:mt-0 p-3 rounded-2xl bg-white/95 backdrop-blur-md border border-gray-100 sm:border-white/80 shadow-xs sm:shadow-md flex items-center gap-2.5 z-20 pointer-events-auto max-w-full sm:max-w-[230px]"
                >
                  <div className="w-8 h-8 rounded-full bg-[#EAF3FC] flex items-center justify-center shrink-0">
                    <Plane className="w-4 h-4 text-[#0067D1]" strokeWidth={2} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs sm:text-[13px] font-bold text-gray-900 leading-snug">
                      From {countryData.city}
                    </div>
                    <div className="text-[10.5px] sm:text-xs text-gray-500 leading-tight mt-0.5 line-clamp-2">
                      {countryData.line}
                    </div>
                  </div>
                </motion.div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyTmtcSection;
