"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  ArrowRight,
  Clock,
  ShieldCheck,
  Check,
  ChevronRight
} from "lucide-react";
import { useCare } from "@/context/CareContext";

// Bespoke High-Precision Medical Icons matching the exact aesthetic of the reference
const CardiologyIcon = () => (
  <svg className="w-6 h-6 text-[#0B5D68]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    <path d="M12 5.5v4" />
    <path d="M10 9h4" />
  </svg>
);

const NeurologyIcon = () => (
  <svg className="w-6 h-6 text-[#0B5D68]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.5 2A4.5 4.5 0 0 0 5 6.5c0 .6.1 1.2.3 1.7A4 4 0 0 0 4 12a4 4 0 0 0 2 3.5c-.3.6-.5 1.3-.5 2A4.5 4.5 0 0 0 10 22h.5" />
    <path d="M14.5 2A4.5 4.5 0 0 1 19 6.5c0 .6-.1 1.2-.3 1.7A4 4 0 0 1 20 12a4 4 0 0 1-2 3.5c.3.6.5 1.3.5 2A4.5 4.5 0 0 1 14 22h-.5" />
    <path d="M12 4v16" />
    <path d="M9 10h6" />
    <path d="M8 15h8" />
  </svg>
);

const OrthopaedicsIcon = () => (
  <svg className="w-6 h-6 text-[#0B5D68]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 10c.7-.7 1.6-1 2.5-1a3.5 3.5 0 1 1 0 7c-.9 0-1.8-.3-2.5-1l-10-10C6.3 4.3 5.4 4 4.5 4a3.5 3.5 0 1 0 0 7c.9 0 1.8-.3 2.5-1Z" />
    <circle cx="12" cy="12" r="2.5" />
    <path d="M12 9v-2m0 10v-2m-3-3H7m10 0h-2" />
  </svg>
);

const DentistryIcon = () => (
  <svg className="w-6 h-6 text-[#0B5D68]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2C8.5 2 6 4.5 6 8c0 3.5 1.5 6 3 10 1 2.5 1.5 4 3 4s2-1.5 3-4c1.5-4 3-6.5 3-10 0-3.5-2.5-6-6-6Z" />
    <path d="M9 8c.5-1.5 1.5-2 3-2s2.5.5 3 2" />
    <path d="M9 13h6" />
    <path d="M10 16h4" />
  </svg>
);

interface SpecialtyItem {
  id: string;
  title: string;
  tagline: string;
  subtitle: string;
  cardSide: "left" | "right";
  image: string;
  badge: string;
  stat: string;
  stay: string;
  savings: string;
  protocols: string[];
  icon: React.ComponentType;
}

const specialties: SpecialtyItem[] = [
  {
    id: "cardiology",
    title: "Cardiology",
    tagline: "Cardiac Sciences & Surgery",
    subtitle: "Advanced cardiac diagnostics, interventional procedures, and preventive heart wellness.",
    cardSide: "left",
    image: "/images/specialties/cardiology.jpg",
    badge: "Accredited Quaternary Heart Center",
    stat: "99.4% Surgical Success",
    stay: "5–10 Days",
    savings: "Save 75% vs US/UK",
    protocols: [
      "24/7 Dedicated Cardiac Cath Lab",
      "ECG, 3D Echo & TMT Diagnostics",
      "Top interventional cardiologists & CABG teams"
    ],
    icon: CardiologyIcon
  },
  {
    id: "neurology",
    title: "Neurology",
    tagline: "Neuro Sciences & Spine Care",
    subtitle: "Comprehensive brain, spine & nerve care — stroke management, epilepsy surgery & rehab.",
    cardSide: "right",
    image: "/images/specialties/neurology.jpg",
    badge: "Advanced Neuro-Surgical Suite",
    stat: "12,500+ Procedures",
    stay: "7–14 Days",
    savings: "Save 70% vs US/UK",
    protocols: [
      "Advanced Neuro-Imaging (3T MRI & PET-CT)",
      "Specialised Stroke Recovery Unit",
      "Robotic & AI-Powered Neuro-Rehab"
    ],
    icon: NeurologyIcon
  },
  {
    id: "orthopaedics",
    title: "Orthopaedics",
    tagline: "Robotic Joint Replacement & Spine",
    subtitle: "Move without pain. Walk independently on day one with robotic sub-millimeter precision.",
    cardSide: "left",
    image: "/images/specialties/orthopaedics.jpg",
    badge: "MAKO Robotic Navigation Suite",
    stat: "11,000+ Surgeries",
    stay: "7–12 Days",
    savings: "Save 70% vs US/UK",
    protocols: [
      "Mako Stryker 3D CT-Guided Robotic Navigation",
      "Muscle-sparing anterior approach & sub-mm fit",
      "Physiotherapy & mobility within 6 hours"
    ],
    icon: OrthopaedicsIcon
  },
  {
    id: "dentistry",
    title: "Cosmetic Dentistry",
    tagline: "Full-Arch Smile Architecture",
    subtitle: "Complete full-mouth restoration with Swiss titanium implants & immediate-load zirconia.",
    cardSide: "right",
    image: "/images/specialties/dentistry.jpg",
    badge: "CAD/CAM Digital Smile Studio",
    stat: "99.8% Implant Integration",
    stay: "3–7 Days",
    savings: "Save 80% vs US/UK",
    protocols: [
      "All-on-4 & All-on-6 Swiss Titanium Implants",
      "In-House 48h CAD/CAM Monolithic Zirconia",
      "Lifetime Global Implant Warranty Certificate"
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
  const springConfig = { damping: 24, stiffness: 180, mass: 0.5 };
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

  const isLeft = specialty.cardSide === "left";
  const IconComponent = specialty.icon;

  return (
    <div
      id={`specialty-${specialty.id}`}
      className="sticky w-full mb-24 sm:mb-32 lg:mb-40 last:mb-0"
      style={{
        zIndex: 10 + index,
        // Cascading sticky top position creates a natural stacked deck of cards
        top: `calc(5.5rem + ${index * 14}px)`
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
        className="relative w-full rounded-[24px] sm:rounded-[32px] lg:rounded-[36px] overflow-hidden border border-[#DCE6EB] bg-white shadow-[0_-12px_32px_rgba(12,35,56,0.08),0_24px_55px_rgba(12,35,56,0.12)] group transition-all duration-300"
      >
        {/* Full-Bleed High-Definition Visual Canvas */}
        <div className="relative w-full min-h-[520px] sm:min-h-[580px] lg:min-h-[620px] xl:min-h-[660px] overflow-hidden bg-slate-100">
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

          {/* Subtle natural gradients ensuring clear clinical photography and legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/15 pointer-events-none" />
          <div
            className={`absolute inset-0 pointer-events-none ${
              isLeft
                ? "bg-gradient-to-r from-[#0C2338]/60 via-[#0C2338]/20 to-transparent"
                : "bg-gradient-to-l from-[#0C2338]/60 via-[#0C2338]/20 to-transparent"
            }`}
          />

          {/* Dynamic Cursor Spotlight Effect */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300"
            style={{
              opacity: spotlight.opacity,
              background: `radial-gradient(650px circle at ${spotlight.x}px ${spotlight.y}px, rgba(255, 255, 255, 0.16), transparent 70%)`
            }}
          />

          {/* Top Badges (Clinical Authority Pill & Stat Pill) */}
          <div
            className={`absolute top-5 sm:top-7 z-10 flex flex-wrap items-center gap-2.5 ${
              isLeft ? "right-5 sm:right-7" : "left-5 sm:left-7"
            }`}
          >
            {/* Accreditation Badge */}
            <div className="inline-flex items-center gap-2 h-8 px-3.5 rounded-full bg-white/95 backdrop-blur-md border border-[#DCE6EB] shadow-sm hover:border-[#0B5D68]/30 transition-colors">
              <ShieldCheck className="w-3.5 h-3.5 text-[#0B5D68] shrink-0" />
              <span className="text-[11px] font-heading font-bold tracking-wider uppercase text-[#0C2338]">
                {specialty.badge}
              </span>
            </div>

            {/* Audited Clinical Stat Badge */}
            <div className="hidden sm:inline-flex items-center gap-2 h-8 px-3.5 rounded-full bg-white/95 backdrop-blur-md border border-[#DCE6EB] shadow-sm hover:border-[#0B8F83]/30 transition-colors">
              <span className="w-2 h-2 rounded-full bg-[#0B8F83] shrink-0" />
              <span className="text-[11px] font-heading font-bold text-[#0B5D68]">
                {specialty.stat}
              </span>
            </div>
          </div>

          {/* Content Card (Positioned Left or Right with 3D Depth Shift) */}
          <motion.div
            style={{
              x: contentTranslateX,
              y: contentTranslateY,
              transformStyle: "preserve-3d"
            }}
            className={`absolute z-20 ${
              isLeft
                ? "left-4 sm:left-8 lg:left-14 bottom-4 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2"
                : "right-4 sm:right-8 lg:right-14 bottom-4 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2"
            } w-[calc(100%-2rem)] sm:w-[420px] lg:w-[460px]`}
          >
            {/* Ultra-Luxury Frosted White Content Card */}
            <div className="bg-white/95 sm:bg-white/96 backdrop-blur-xl border border-white/90 ring-1 ring-slate-900/5 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-9 text-[#0C2338] shadow-[0_20px_50px_rgba(12,35,56,0.18),0_4px_12px_rgba(12,35,56,0.06)] hover:shadow-[0_25px_60px_rgba(12,35,56,0.22)] transition-all">
              {/* Header: Specialty Icon Badge & Title */}
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 rounded-2xl bg-[#ECF4F7] border border-[#DCE6EB] flex items-center justify-center text-[#0B5D68] shrink-0 shadow-sm">
                  <IconComponent />
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#0C2338] tracking-tight leading-tight">
                    {specialty.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-[#0B5D68] font-bold uppercase tracking-wider font-heading mt-0.5">
                    {specialty.tagline}
                  </p>
                </div>
              </div>

              {/* Clinical Description */}
              <p className="text-[#5A6E7C] text-xs sm:text-sm leading-relaxed font-body mb-5 font-normal">
                {specialty.subtitle}
              </p>

              {/* 3 High-Impact Protocols with Green Double-Ticks */}
              <div className="space-y-2.5 mb-6">
                {specialty.protocols.map((item, pIdx) => (
                  <div
                    key={pIdx}
                    className="flex items-start gap-2.5 text-xs sm:text-[13px] text-[#0C2338] font-medium"
                  >
                    <div className="w-4 h-4 rounded-full bg-[#0B8F83]/15 flex items-center justify-center shrink-0 mt-0.5 text-[#0B8F83]">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <span className="leading-snug">{item}</span>
                  </div>
                ))}
              </div>

              {/* Action Button (Brand Standard: #F0A126 Background, #0C2338 Text) */}
              <button
                onClick={() => onOpenIntake(specialty.title)}
                className="w-full py-3.5 px-6 rounded-xl bg-[#F0A126] hover:bg-[#db8e18] active:scale-[0.98] text-[#0C2338] font-heading font-extrabold text-xs uppercase tracking-wider shadow-md shadow-[#F0A126]/25 hover:shadow-lg hover:shadow-[#F0A126]/35 flex items-center justify-center gap-2 transition-all cursor-pointer group"
              >
                <span>Consult {specialty.title} Specialist</span>
                <ArrowRight className="w-4 h-4 text-[#0C2338] stroke-[2.5] transition-transform group-hover:translate-x-1" />
              </button>

              {/* Bottom Metadata: In-Country Stay & Cost Savings */}
              <div className="flex items-center justify-between pt-4 mt-4 border-t border-[#DCE6EB] text-[11px] text-[#5A6E7C] font-medium font-body">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#0B5D68]" />
                  <span>
                    Stay: <strong className="text-[#0C2338] font-bold">{specialty.stay}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[#0B8F83]">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span className="font-extrabold">{specialty.savings}</span>
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
      className="bg-[#F4F8FA] text-[#0C2338] relative w-full pt-16 sm:pt-24 pb-24 sm:pb-32 border-t border-b border-[#DCE6EB]"
    >
      {/* 1580px Expanded Full-Width Container matching Site Standards */}
      <div className="max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 sm:mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B5D68]/10 border border-[#0B5D68]/20 mb-3.5">
              <span className="h-2 w-2 rounded-full bg-[#0B5D68] animate-pulse"></span>
              <p className="text-[#0B5D68] font-heading font-semibold text-xs uppercase tracking-[0.2em]">
                QUATERNARY CLINICAL EXCELLENCE
              </p>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-heading font-extrabold text-[#0C2338] leading-[1.15]">
              Specialised Treatments.{" "}
              <span className="text-[#0B5D68] block sm:inline">
                Celebrated Specialists.
              </span>
            </h2>
          </div>
          <p className="text-[#5A6E7C] max-w-xl text-xs sm:text-sm lg:text-base leading-relaxed font-body">
            All procedures are performed by Chief Surgeons in JCI &amp; NABH-accredited tertiary hospitals with US-FDA approved implants, transparent packages, and zero waitlist delays.
          </p>
        </div>

        {/* Specialty Quick Jump Bar */}
        <div className="flex items-center gap-2.5 sm:gap-3 overflow-x-auto no-scrollbar pb-3 mb-8 sm:mb-12">
          {specialties.map((spec, idx) => (
            <button
              key={spec.id}
              onClick={() => scrollToSpecialty(spec.id)}
              className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-white hover:bg-[#ECF4F7] border border-[#DCE6EB] hover:border-[#0B5D68]/40 text-xs sm:text-sm text-[#0C2338] transition-all whitespace-nowrap cursor-pointer shadow-sm group"
            >
              <span className="w-5 h-5 rounded-full bg-[#ECF4F7] text-[#0B5D68] flex items-center justify-center text-[10px] font-bold group-hover:bg-[#0B5D68] group-hover:text-white transition-colors">
                0{idx + 1}
              </span>
              <span className="font-heading font-semibold text-[#0C2338]">{spec.title}</span>
              <ChevronRight className="w-3.5 h-3.5 text-[#6B7C88] group-hover:translate-x-0.5 transition-transform" />
            </button>
          ))}
        </div>

        {/* STICKY STACKING CARDS CONTAINER */}
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
