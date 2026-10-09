"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  ArrowRight,
  Clock,
  ShieldCheck,
  ChevronRight
} from "lucide-react";
import { useCare } from "@/context/CareContext";

// Bespoke Double-Tick Icon matching the brand palette
const DoubleCheckIcon = () => (
  <svg
    className="w-4 h-4 text-[#14B8A6] shrink-0"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 6L7 17l-4-4" />
    <path d="M22 10l-7.5 7.5-2-2" />
  </svg>
);

// Bespoke High-Precision Medical Icons matching brand palette
const CardiologyIcon = () => (
  <svg className="w-8 h-8 text-[#14B8A6]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    <path d="M12 5.5v4" />
    <path d="M10 9h4" />
  </svg>
);

const NeurologyIcon = () => (
  <svg className="w-8 h-8 text-[#14B8A6]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.5 2A4.5 4.5 0 0 0 5 6.5c0 .6.1 1.2.3 1.7A4 4 0 0 0 4 12a4 4 0 0 0 2 3.5c-.3.6-.5 1.3-.5 2A4.5 4.5 0 0 0 10 22h.5" />
    <path d="M14.5 2A4.5 4.5 0 0 1 19 6.5c0 .6-.1 1.2-.3 1.7A4 4 0 0 1 20 12a4 4 0 0 1-2 3.5c.3.6.5 1.3.5 2A4.5 4.5 0 0 1 14 22h-.5" />
    <path d="M12 4v16" />
    <path d="M9 10h6" />
    <path d="M8 15h8" />
  </svg>
);

const OrthopaedicsIcon = () => (
  <svg className="w-8 h-8 text-[#14B8A6]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 10c.7-.7 1.6-1 2.5-1a3.5 3.5 0 1 1 0 7c-.9 0-1.8-.3-2.5-1l-10-10C6.3 4.3 5.4 4 4.5 4a3.5 3.5 0 1 0 0 7c.9 0 1.8-.3 2.5-1Z" />
    <circle cx="12" cy="12" r="2.5" />
    <path d="M12 9v-2m0 10v-2m-3-3H7m10 0h-2" />
  </svg>
);

const DentistryIcon = () => (
  <svg className="w-6 h-6 text-[#14B8A6]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2C8.5 2 6 4.5 6 8c0 3.5 1.5 6 3 10 1 2.5 1.5 4 3 4s2-1.5 3-4c1.5-4 3-6.5 3-10 0-3.5-2.5-6-6-6Z" />
    <path d="M9 8c.5-1.5 1.5-2 3-2s2.5.5 3 2" />
    <path d="M9 13h6" />
    <path d="M10 16h4" />
  </svg>
);

interface SpecialtyItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  badge: string;
  stat: string;
  stay: string;
  bullets: string[];
  icon: React.ComponentType;
  cardSide?: "left" | "right";
}

const specialties: SpecialtyItem[] = [
  {
    id: "cardiology",
    title: "Cardiology",
    subtitle: "Advanced cardiac diagnostics, interventional procedures, and preventive heart wellness.",
    image: "/images/specialties/cardiology.jpg",
    badge: "Quaternary Heart Center",
    stat: "99.4% Surgical Success",
    stay: "5–10 Days",
    cardSide: "left",
    bullets: [
      "24/7 Cardiac Cath Lab",
      "ECG, Echo & TMT",
      "Top interventional cardiologists"
    ],
    icon: CardiologyIcon
  },
  {
    id: "neurology",
    title: "Neurology",
    subtitle: "Comprehensive brain, spine & nerve care — stroke management, epilepsy surgery & rehab.",
    image: "/images/specialties/neurology.jpg",
    badge: "Advanced Neuro Suite",
    stat: "12,500+ Procedures",
    stay: "7–14 Days",
    cardSide: "left",
    bullets: [
      "Advanced Neuro-Imaging",
      "Stroke Recovery Unit",
      "Robotic Neuro-Rehab"
    ],
    icon: NeurologyIcon
  },
  {
    id: "orthopaedics",
    title: "Orthopaedics",
    subtitle: "Move without pain. Walk independently on day one with robotic sub-millimeter precision.",
    image: "/images/specialties/orthopaedics.jpg",
    badge: "MAKO Robotic Center",
    stat: "11,000+ Surgeries",
    stay: "7–14 Days",
    cardSide: "left",
    bullets: [
      "Mako Stryker 3D Navigation",
      "Sub-Millimeter Alignment",
      "FDA-Approved Stryker Implants"
    ],
    icon: OrthopaedicsIcon
  },
  {
    id: "dentistry",
    title: "Dentistry",
    subtitle: "Complete full-mouth restoration with Swiss titanium implants & 48-hour CAD/CAM zirconia.",
    image: "/images/specialties/dentistry.jpg",
    badge: "CAD/CAM Smile Studio",
    stat: "99.8% Implant Success",
    stay: "3–7 Days",
    cardSide: "left",
    bullets: [
      "All-on-4 / All-on-6 Swiss Titanium",
      "In-House 48h CAD/CAM Milling",
      "Lifetime Implant Warranty"
    ],
    icon: DentistryIcon
  }
];

interface InteractiveCardProps {
  specialty: SpecialtyItem;
  index: number;
  total: number;
  onOpenIntake: (title: string) => void;
}

const SpecialtyStickyCard: React.FC<InteractiveCardProps> = ({
  specialty,
  index,
  total,
  onOpenIntake
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Buttery-smooth spring physics for cursor parallax
  const springConfig = { damping: 25, stiffness: 180, mass: 0.5 };
  const mouseXSpring = useSpring(x, springConfig);
  const mouseYSpring = useSpring(y, springConfig);

  // 3D tilt angles for the full-width visual card
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [3, -3]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-3, 3]);

  // Subtle opposite parallax translation for the background photograph
  const imageTranslateX = useTransform(mouseXSpring, [-0.5, 0.5], [12, -12]);
  const imageTranslateY = useTransform(mouseYSpring, [-0.5, 0.5], [12, -12]);

  // Forward parallax translation for the floating content card
  const contentTranslateX = useTransform(mouseXSpring, [-0.5, 0.5], [-16, 16]);
  const contentTranslateY = useTransform(mouseYSpring, [-0.5, 0.5], [-16, 16]);

  // Interactive cursor spotlight coordinates
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(relX);
    y.set(relY);
    setSpotlight({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      opacity: 1
    });
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setSpotlight(prev => ({ ...prev, opacity: 0 }));
  };

  const isLeft = specialty.cardSide !== "right";
  const IconComponent = specialty.icon;

  return (
    <div
      id={`specialty-${specialty.id}`}
      className="sticky w-full mb-[45vh] sm:mb-[55vh] lg:mb-44 last:mb-0"
      style={{
        zIndex: 10 + index,
        // Fluid responsive sticky top offset prevents cards from clipping on shorter mobile screens
        top: `calc(clamp(4.25rem, 4rem + 1.5vw, 5.5rem) + ${index * 8}px)`
      }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d"
        }}
        className="relative w-full rounded-[20px] sm:rounded-[24px] lg:rounded-[30px] overflow-hidden group transition-all duration-300"
      >
        {/* Full-Bleed High-Definition Visual Canvas (1580px Full Container) */}
        <div className="relative w-full min-h-[500px] xs:min-h-[540px] sm:min-h-[600px] lg:min-h-[640px] xl:min-h-[680px] overflow-hidden">
          {/* Background Image with Smooth Parallax Movement */}
          <motion.div
            style={{
              x: imageTranslateX,
              y: imageTranslateY
            }}
            className="absolute -inset-6 w-[calc(100%+48px)] h-[calc(100%+48px)] pointer-events-none"
          >
            <Image
              src={specialty.image}
              alt={specialty.title}
              fill
              priority={index === 0}
              sizes="(max-width: 1580px) 100vw, 1580px"
              className="object-cover object-center scale-[1.04] transition-transform duration-700 group-hover:scale-[1.06]"
            />
          </motion.div>

          {/* Gradients ensuring photographic vibrancy and crisp card readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/20 pointer-events-none" />
          <div
            className={`absolute inset-0 pointer-events-none ${isLeft
              ? "bg-gradient-to-r from-black/55 via-black/25 to-transparent"
              : "bg-gradient-to-l from-black/55 via-black/25 to-transparent"
              }`}
          />

          {/* Dynamic Cursor Spotlight Effect */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300"
            style={{
              opacity: spotlight.opacity,
              background: `radial-gradient(650px circle at ${spotlight.x}px ${spotlight.y}px, rgba(255, 255, 255, 0.12), transparent 70%)`
            }}
          />

          {/* Top Badges (Clinical Authority Pill & Stat Pill) with responsive positioning */}
          <div
            className={`absolute top-3 xs:top-4 sm:top-7 z-10 flex flex-wrap items-center gap-2 sm:gap-2.5 scale-90 sm:scale-100 origin-top ${isLeft ? "right-3 xs:right-4 sm:right-7 origin-top-right" : "left-3 xs:left-4 sm:left-7 origin-top-left"
              }`}
          >
            {/* Accreditation Badge */}
            <div className="inline-flex items-center gap-1.5 h-7 sm:h-8 px-2.5 sm:px-3 rounded-full bg-white/95 backdrop-blur-md border border-[#14B8A6] shadow-sm">
              <ShieldCheck className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-[#14B8A6] shrink-0" />
              <span className="text-[10px] sm:text-[11px] font-heading font-semibold tracking-wider uppercase text-[#14B8A6]">
                {specialty.badge}
              </span>
            </div>

            {/* Audited Clinical Stat Badge */}
            <div className="hidden xs:inline-flex items-center gap-1.5 h-7 sm:h-8 px-2.5 sm:px-3 rounded-full bg-white/95 backdrop-blur-md border border-[#14B8A6] shadow-sm">
              <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-[#14B8A6] shrink-0" />
              <span className="text-[10px] sm:text-[11px] font-heading font-semibold text-[#14B8A6]">
                {specialty.stat}
              </span>
            </div>
          </div>

          {/* Floating Content Card - Snug padding & fluid width on mobile screens */}
          <motion.div
            style={{
              x: contentTranslateX,
              y: contentTranslateY,
              transformStyle: "preserve-3d"
            }}
            className={`absolute z-20 ${isLeft
              ? "left-3 xs:left-4 sm:left-10 lg:left-16 bottom-3 xs:bottom-4 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2"
              : "right-3 xs:right-4 sm:right-10 lg:right-16 bottom-3 xs:bottom-4 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2"
              } w-[calc(100%-1.5rem)] xs:w-[calc(100%-2rem)] sm:w-[420px] lg:w-[450px]`}
          >
            {/* Dark Navy Rounded Card with vibrant #14B8A6 accents */}
            <div className="bg-[#0C2338]/95 backdrop-blur-xl border border-white/15 rounded-2xl sm:rounded-3xl p-4.5 xs:p-5 sm:p-8 lg:p-9 text-white shadow-[0_25px_60px_rgba(0,0,0,0.7)] hover:border-[#14B8A6]/60 transition-all">

              {/* Top Row: Square-Rounded Icon Box + Title */}
              <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                <div className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-[#14B8A6]/30 border border-[#14B8A6]/60 flex items-center justify-center text-[#14B8A6] shrink-0 shadow-inner">
                  <IconComponent />
                </div>
                <h3 className="text-xl xs:text-2xl sm:text-3xl font-bold font-heading text-white tracking-tight leading-tight">
                  {specialty.title}
                </h3>
              </div>

              {/* Subtitle / Description */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-body mb-4 sm:mb-6 line-clamp-2 xs:line-clamp-3 sm:line-clamp-none">
                {specialty.subtitle}
              </p>

              {/* Bullet Points with Gold Double-Ticks */}
              <div className="space-y-2 sm:space-y-3 mb-5 sm:mb-8">
                {specialty.bullets.map((bullet, bIdx) => (
                  <div
                    key={bIdx}
                    className="flex items-center gap-2.5 sm:gap-3 text-xs sm:text-sm text-slate-200 font-medium"
                  >
                    <DoubleCheckIcon />
                    <span className="truncate xs:whitespace-normal">{bullet}</span>
                  </div>
                ))}
              </div>

              {/* Action Button: Primary Action Button 1 */}
              <button
                onClick={() => onOpenIntake(specialty.title)}
                className="w-full py-3 sm:py-3.5 px-5 sm:px-6 rounded-xl bg-[#F0A126] hover:bg-[#db8e18] active:scale-[0.98] text-[#0C2338] font-heading font-bold text-[11px] sm:text-xs uppercase tracking-wider shadow-md shadow-[#F0A126]/20 flex items-center justify-center gap-2 transition-all cursor-pointer group"
              >
                <span>CHECK CLINICAL FEASIBILITY</span>
                <ArrowRight className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-[#ffffff] stroke-[2.5] transition-transform group-hover:translate-x-1" />
              </button>

              {/* Bottom Metadata Bar */}
              <div className="flex items-center justify-between pt-3 sm:pt-4 mt-3 sm:mt-5 border-t border-white/10 text-[10px] sm:text-[11px] text-slate-400 font-medium font-body">
                <div className="flex items-center gap-1 sm:gap-1.5">
                  <Clock className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-slate-400" />
                  <span>
                    Stay: <strong className="text-slate-200">{specialty.stay}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-1 sm:gap-1.5 text-slate-300">
                  <ShieldCheck className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-[#14B8A6]" />
                  <span className="font-semibold text-slate-200">Verified Pricing</span>
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
};

export const SpecialtiesSection = () => {
  const { openIntake } = useCare();

  const scrollToSpecialty = (id: string) => {
    const el = document.getElementById(`specialty-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <section
      id="treatments"
      className="bg-[#F5F7F6] text-[#0C2338] relative w-full pt-16 sm:pt-24 pb-20 sm:pb-28 border-t border-[#DCE6EB] font-sans"
    >
      {/* 1580px Expanded Container matching Header and Hero */}
      <div className="max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8 sm:py-3.5 w-full">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 sm:mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ECF4F7] border border-[#DCE6EB] mb-3.5 shadow-xs">
              <span className="h-2 w-2 rounded-full bg-[#14B8A6] animate-pulse"></span>
              <p className="text-[#0B5D68] font-heading font-bold text-xs uppercase tracking-wider">
                QUATERNARY CLINICAL EXCELLENCE
              </p>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[32px] xl:text-[40px] font-heading font-bold text-[#0C2338] leading-[1.15] tracking-tight">
              Specialised Treatments.{" "}
              <span className="text-[#0e9d8d] block sm:inline">
                Celebrated Specialists.
              </span>
            </h2>
          </div>
          <p className="text-[#6B7C88] max-w-xl text-sm sm:text-base leading-relaxed font-normal">
            All procedures are performed by Chief Surgeons in JCI &amp; NABH-accredited tertiary hospitals with US-FDA approved implants, transparent packages, and zero waitlist delays.
          </p>
        </div>

        {/* Specialty Quick Jump Bar */}
        <div className="flex items-center gap-2.5 sm:gap-3 overflow-x-auto no-scrollbar pb-3 mb-8 sm:mb-12 -mx-4 px-4 sm:mx-0 sm:px-0">
          {specialties.map((spec, idx) => (
            <button
              key={spec.id}
              onClick={() => scrollToSpecialty(spec.id)}
              className="flex items-center gap-2.5 px-3.5 sm:px-4 py-2 rounded-full bg-white hover:bg-[#ECF4F7] border border-[#DCE6EB] hover:border-[#0B5D68]/40 text-xs sm:text-sm text-[#0C2338] transition-all whitespace-nowrap cursor-pointer shadow-xs group shrink-0"
            >
              <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#ECF4F7] text-[#0B5D68] flex items-center justify-center text-[11px] sm:text-[12px] font-bold group-hover:bg-[#0B5D68] group-hover:text-white transition-colors">
                0{idx + 1}
              </span>
              <span className="font-heading font-semibold text-[#0C2338]">{spec.title}</span>
              <ChevronRight className="w-3.5 h-3.5 text-[#6B7C88] group-hover:translate-x-0.5 transition-transform" />
            </button>
          ))}
        </div>

        {/* STICKY STACKING CARDS CONTAINER (1580px) */}
        <div className="relative">
          {specialties.map((specialty, index) => (
            <SpecialtyStickyCard
              key={specialty.id}
              specialty={specialty}
              index={index}
              total={specialties.length}
              onOpenIntake={openIntake}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
