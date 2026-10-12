"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  Compass,
  ArrowRight,
  ShieldCheck,
  Video,
  Plane,
  HeartPulse,
  Home,
  MessageSquare,
  Sparkles,
  Clock,
  CheckCircle2,
  ChevronRight,
  MapPin,
  Calendar,
} from "lucide-react";
import { useCare } from "@/context/CareContext";

export interface JourneyStepHighlight {
  label: string;
  detail: string;
}

export interface JourneyStepItem {
  id: string;
  stepNumber: string;
  stepPhase: string;
  navTitle: string;
  title: string;
  headline: string;
  description: string;
  image: string;
  imagePosition?: string;
  badge: string;
  stat: string;
  location: string;
  accompaniedBy: string;
  highlights: JourneyStepHighlight[];
  primaryCta: string;
  icon: React.ComponentType<{ className?: string }>;
}

const JOURNEY_STEPS: JourneyStepItem[] = [
  {
    id: "step-1",
    stepNumber: "01",
    stepPhase: "STAGE 01 · BEFORE YOU FLY",
    navTitle: "01 Case Review & Video Consult",
    title: "Meet Your Surgeon Before You Book",
    headline: "Free second opinion & direct video consultation from home.",
    description:
      "Share your medical scans from the comfort of home. Our medical director reviews your case and connects your family directly with your chief operating specialist, alongside a locked written quote.",
    image: "/images/connect/surgeon-consultation.jpg",
    imagePosition: "object-[75%_center]",
    badge: "100% Free · Zero Commitment",
    stat: "24–48h Specialist Review",
    location: "From Home (Pre-Travel)",
    accompaniedBy: "Quaternary Medical Director",
    highlights: [
      {
        label: "Zero-Cost Review",
        detail: "Free expert second opinion with no deposit or commitment",
      },
      {
        label: "Direct Video Consult",
        detail: "Live face-to-face consultation with your operating surgeon",
      },
      {
        label: "Locked Written Quote",
        detail: "Guaranteed all-inclusive surgery & hospital pricing",
      },
    ],
    primaryCta: "Free Review",
    icon: Video,
  },
  {
    id: "step-2",
    stepNumber: "02",
    stepPhase: "STAGE 02 · TRAVEL & VISA",
    navTitle: "02 Travel & Visa Concierge",
    title: "Zero Paperwork. Complete Travel Concierge.",
    headline: "We handle your medical visa, flight dates & companion stay.",
    description:
      "Your hospital invitation is issued within 24 hours. Your personal coordinator assists with e-Medical visas for you and your companion, plans travel dates, and books handpicked recovery suites.",
    image: "/images/hero/senior-couple-medical-trip.jpg",
    imagePosition: "object-[60%_center]",
    badge: "Fast-Track Visa Support",
    stat: "Companion Stay Included",
    location: "Global Admissions Desk",
    accompaniedBy: "International Travel Concierge",
    highlights: [
      {
        label: "24h Hospital Invitation",
        detail: "Accelerates expedited e-Medical visa approval",
      },
      {
        label: "Companion Included",
        detail: "Dedicated in-room attendant bed & daily meals",
      },
      {
        label: "Vetted 4 & 5-Star Suites",
        detail: "Sanitized recovery apartments close to your hospital",
      },
    ],
    primaryCta: "Plan Travel",
    icon: Plane,
  },
  {
    id: "step-3",
    stepNumber: "03",
    stepPhase: "STAGE 03 · HOSPITAL CARE",
    navTitle: "03 VIP Arrival & Surgery",
    title: "VIP Arrival & Quaternary Surgery",
    headline: "Chauffeured transit, zero waiting lists & JCI-accredited care.",
    description:
      "Met at arrivals by your private chauffeur and care coordinator. Settle in smoothly with priority hospital admission and surgery in world-class modular theatres with authentic US-FDA implants.",
    image: "/images/clinical-integrity-banner.jpg",
    imagePosition: "object-[75%_center]",
    badge: "JCI & NABH Accredited",
    stat: "Priority 24–48h Surgery",
    location: "Premier Hospital, New Delhi NCR",
    accompaniedBy: "Bedside Care Coordinator",
    highlights: [
      {
        label: "Gate-to-Bed Transit",
        detail: "Private airport pickup with wheelchair assistance if needed",
      },
      {
        label: "Dedicated Bedside Concierge",
        detail: "Stays with you and keeps family back home updated",
      },
      {
        label: "Zero Waiting Lists",
        detail: "Guaranteed surgical slot within 24–48 hours of landing",
      },
    ],
    primaryCta: "Explore Care",
    icon: HeartPulse,
  },
  {
    id: "step-4",
    stepNumber: "04",
    stepPhase: "STAGE 04 · RECOVERY & HOME",
    navTitle: "04 Recovery & Safe Return",
    title: "Supervised Rehab & Lifelong Continuity",
    headline: "Guided physiotherapy, fit-to-fly clearance & continuous support.",
    description:
      "Structured mobility rehab starts right away with daily concierge visits. Return home safely with fit-to-fly clearance, complete digital records, and lifetime access to your surgical team.",
    image: "/images/connect/care-bedside.jpg",
    imagePosition: "object-[70%_center]",
    badge: "Lifetime Care Guarantee",
    stat: "Fit-to-Fly Clearance Included",
    location: "Recovery Suite & Safe Return",
    accompaniedBy: "Physiotherapist & Local GP Desk",
    highlights: [
      {
        label: "Supervised Physiotherapy",
        detail: "Guided mobility program for confident walking",
      },
      {
        label: "Continuity Care Pack",
        detail: "Digital records and scans shared with your home doctor",
      },
      {
        label: "Lifetime Video Follow-Up",
        detail: "Direct surgeon contact whenever you need advice at home",
      },
    ],
    primaryCta: "Plan Recovery",
    icon: Home,
  },
];

interface JourneyStickyCardProps {
  step: JourneyStepItem;
  index: number;
  total: number;
  onOpenIntake: (title: string) => void;
}

const JourneyStickyCard: React.FC<JourneyStickyCardProps> = ({
  step,
  index,
  total,
  onOpenIntake,
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

  // Dynamic cursor spotlight coordinates
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
      opacity: 1,
    });
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setSpotlight((prev) => ({ ...prev, opacity: 0 }));
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `Hello, I would like to ask questions regarding Patient Journey Step ${step.stepNumber} (${step.title}). Can you guide me?`
    );
    window.open(`https://wa.me/919876543210?text=${message}`, "_blank");
  };

  const IconComponent = step.icon;

  return (
    <div
      id={`journey-step-${step.stepNumber}`}
      className="sticky w-full mb-[30vh] sm:mb-[42vh] lg:mb-40 last:mb-0"
      style={{
        zIndex: 10 + index,
        // Tactile stacked deck-of-cards animation with responsive sticky top
        top: `calc(clamp(4.25rem, 4rem + 1.5vw, 5.5rem) + ${index * 8}px)`,
      }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full rounded-[24px] sm:rounded-[28px] lg:rounded-[32px] overflow-hidden group transition-all duration-300 shadow-[0_25px_60px_rgba(0,0,0,0.3)] border border-white/20 bg-[#0C2338]"
      >
        {/* Full-Bleed High-Definition Visual Canvas (1580px Full Container) */}
        <div className="relative w-full min-h-[540px] sm:min-h-[620px] lg:min-h-[660px] xl:min-h-[700px] overflow-hidden flex items-center p-3 sm:p-0">

          {/* Background Image with Smooth Parallax Movement */}
          <motion.div
            style={{
              x: imageTranslateX,
              y: imageTranslateY,
            }}
            className="absolute -inset-6 w-[calc(100%+48px)] h-[calc(100%+48px)] pointer-events-none"
          >
            <Image
              src={step.image}
              alt={step.title}
              fill
              priority
              sizes="(max-width: 1580px) 100vw, 1580px"
              className={`object-cover ${step.imagePosition || "object-center"} scale-[1.03] transition-transform duration-700 group-hover:scale-[1.05]`}
            />
          </motion.div>

          {/* Cinematic Gradients for depth and crisp card readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/45 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0C2338]/95 via-[#0C2338]/70 via-50% to-transparent pointer-events-none" />

          {/* Dynamic Cursor Spotlight Effect */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300"
            style={{
              opacity: spotlight.opacity,
              background: `radial-gradient(650px circle at ${spotlight.x}px ${spotlight.y}px, rgba(255, 255, 255, 0.12), transparent 70%)`,
            }}
          />

          {/* Top Badges (Clinical Milestone & Stat Pill) - Visible on sm screens and up */}
          <div className="hidden sm:flex absolute top-6 right-7 z-10 items-center gap-2.5 origin-top-right">
            {/* Milestone Badge */}
            <div className="inline-flex items-center gap-1.5 h-8 px-3.5 rounded-full bg-white/95 backdrop-blur-md border border-[#DCE6EB] shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-[#0B5D68] shrink-0" />
              <span className="text-[11px] font-heading font-semibold tracking-wider uppercase text-[#0C2338]">
                {step.badge}
              </span>
            </div>

            {/* Timing / Stat Badge */}
            <div className="inline-flex items-center gap-1.5 h-8 px-3.5 rounded-full bg-white/95 backdrop-blur-md border border-[#DCE6EB] shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#0B5D68] shrink-0 animate-pulse" />
              <span className="text-[11px] font-heading font-semibold text-[#0B5D68]">
                {step.stat}
              </span>
            </div>
          </div>

          {/* Floating Dark Navy Glassmorphism Story Card */}
          <motion.div
            style={{
              x: contentTranslateX,
              y: contentTranslateY,
              transformStyle: "preserve-3d",
            }}
            className="relative z-20 w-full sm:w-[420px] lg:w-[460px] xl:w-[500px] sm:absolute sm:left-8 lg:left-12 sm:top-1/2 sm:-translate-y-1/2"
          >
            <div className="relative bg-[#0C2338]/92 backdrop-blur-2xl border border-white/20 rounded-2xl sm:rounded-3xl p-4 xs:p-5 sm:p-7 lg:p-8 text-white shadow-[0_30px_70px_rgba(0,0,0,0.65)] hover:border-white/30 transition-all overflow-hidden">

              {/* Subtle Top Cyan Glow Line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#2ECDC5] to-transparent opacity-80" />

              {/* Step Chapter Eyebrow & Progress Indicator */}
              <div className="flex items-center justify-between gap-2 mb-2.5 sm:mb-4">
                <div className="flex items-center gap-2 sm:gap-2.5">
                  <span className="w-6.5 h-6.5 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-[#0B5D68] to-[#084851] text-[#2ECDC5] border border-[#2ECDC5]/30 flex items-center justify-center font-heading font-bold text-[11px] sm:text-sm shadow-sm">
                    {step.stepNumber}
                  </span>
                  <span className="text-[11px] sm:text-[12px] font-heading font-medium tracking-wider text-[#2ECDC5]">
                    {step.stepPhase}
                  </span>
                </div>

                {/* 4-Step Narrative Progress Indicator */}
                <div className="flex items-center gap-1.5 px-2.5 py-0.5 sm:py-1 rounded-full bg-white/10 border border-white/15 text-[10px] sm:text-[11px] font-heading font-semibold text-slate-300">
                  <span>Step {index + 1} of {total}</span>
                </div>
              </div>

              {/* Step Title Header with Icon */}
              <div className="flex items-center gap-2.5 sm:gap-3.5 mb-1.5 sm:mb-4">
                <div className="w-8 h-8 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-[#F0A126] shrink-0 shadow-inner">
                  <IconComponent className="w-4 h-4 sm:w-5.5 sm:h-5.5 text-[#F0A126]" />
                </div>
                <h3 className="text-lg xs:text-base sm:text-xl lg:text-2xl font-heading font-semibold text-white">
                  {step.title}
                </h3>
              </div>

              {/* Narrative Value Hook */}
              <h4 className="text-xs sm:text-sm font-medium text-[#F0A126] leading-snug mb-2 sm:mb-2.5">
                {step.headline}
              </h4>

              {/* Short & Human Story Narrative */}
              <p className="text-xs sm:text-sm text-slate-200/90 leading-relaxed font-normal mb-3.5 sm:mb-5">
                {step.description}
              </p>

              {/* Visual Story Milestones (Clean, Scannable 2-Row Format) */}
              <div className="space-y-1.5 sm:space-y-2.5 mb-4 sm:mb-6 pt-2.5 sm:pt-4 border-t border-white/10">
                {step.highlights.map((item, hIdx) => (
                  <div
                    key={hIdx}
                    className="flex items-start gap-2 sm:gap-3 group/item"
                  >
                    <span className="w-4.5 h-4.5 sm:w-5.5 sm:h-5.5 rounded-full bg-[#0B5D68]/50 border border-[#2ECDC5]/40 flex items-center justify-center shrink-0 mt-0.5 text-[#2ECDC5] shadow-xs group-hover/item:border-[#2ECDC5] group-hover/item:bg-[#0B5D68]/80 transition-colors">
                      <CheckCircle2 className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-[#2ECDC5]" />
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5">
                        <span className="font-heading font-semibold text-xs sm:text-sm text-white tracking-tight">
                          {item.label}
                        </span>
                        <span className="text-slate-300 text-[11px] sm:text-[13px] font-normal">
                          — {item.detail}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Primary & Secondary Actions */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 pt-1">
                {/* Primary CTA */}
                <button
                  onClick={() => onOpenIntake(`Patient Journey Step ${step.stepNumber} — ${step.title}`)}
                  className="py-2.5 sm:py-3.5 px-4 sm:px-6 rounded-xl bg-gradient-to-r from-[#F0A126] to-[#e59518] hover:from-[#e59518] hover:to-[#d08210] active:scale-[0.98] text-[#0C2338] font-bold text-xs sm:text-[13px] uppercase tracking-wider shadow-lg shadow-[#F0A126]/20 flex items-center justify-center gap-2 transition-all cursor-pointer group/btn flex-1 whitespace-nowrap"
                >
                  <span className="whitespace-nowrap">{step.primaryCta}</span>
                  <ArrowRight className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-[#0C2338] stroke-[2.5] transition-transform group-hover/btn:translate-x-1 shrink-0" />
                </button>

                {/* Secondary CTA (WhatsApp) */}
                <button
                  onClick={handleWhatsApp}
                  className="py-2.5 sm:py-3.5 px-3.5 sm:px-5 rounded-xl bg-white/10 hover:bg-white/15 active:scale-[0.98] text-white font-bold text-xs sm:text-[13px] uppercase tracking-wider border border-white/20 flex items-center justify-center gap-2 transition-all cursor-pointer shrink-0 shadow-sm backdrop-blur-md whitespace-nowrap"
                >
                  <MessageSquare className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-[#25D366] shrink-0" />
                  <span className="whitespace-nowrap">WhatsApp</span>
                </button>
              </div>

              {/* Bottom Metadata Bar */}
              <div className="flex items-center justify-between pt-2.5 sm:pt-4 mt-2.5 sm:mt-4 border-t border-white/10 text-[10px] sm:text-xs text-slate-300 font-medium">
                <div className="flex items-center gap-1 sm:gap-1.5">
                  <MapPin className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-[#2ECDC5] shrink-0" />
                  <span className="truncate max-w-[130px] sm:max-w-[220px]">{step.location}</span>
                </div>
                <div className="flex items-center gap-1 sm:gap-1.5">
                  <ShieldCheck className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-[#F0A126] shrink-0" />
                  <span className="font-semibold text-slate-200 truncate max-w-[140px] sm:max-w-[200px]">
                    {step.accompaniedBy}
                  </span>
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
};

export const PatientJourney = () => {
  const { openIntake } = useCare();

  const scrollToStep = (id: string) => {
    const el = document.getElementById(`journey-step-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <section
      id="journey"
      className="bg-white text-[#0C2338] relative w-full pt-16 sm:pt-24 pb-20 sm:pb-28 border-t border-[#DCE6EB] font-sans"
    >
      {/* 1580px Expanded Container matching Header, Hero, and Specialties */}
      <div className="max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8 w-full">

        {/* 01. Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 sm:mb-12 gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ECF4F7] border border-[#DCE6EB] mb-3.5 shadow-xs">
              <Compass className="w-3.5 h-3.5 text-[#0B5D68]" />
              <p className="text-[#0B5D68] font-heading font-bold text-xs uppercase tracking-wider">
                PATIENT JOURNEY — STEP-BY-STEP CONCIERGE CARE
              </p>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-[36px] xl:text-[42px] font-heading font-bold text-[#0C2338] leading-[1.15] tracking-tight">
              Four Simple Steps to Your{" "}
              <span className="text-[#0B8F83] block sm:inline">
                World-Class Care in India.
              </span>
            </h2>
            <p className="text-[#6B7C88] text-sm sm:text-base leading-relaxed font-normal mt-2.5 max-w-2xl">
              From your living room to the surgical theatre and back home — transparent, reassuring, and completely managed by our concierge team with zero upfront fees.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-2 text-xs font-heading font-bold uppercase tracking-wider text-[#0B5D68] bg-[#ECF4F7] px-4 py-2.5 rounded-full border border-[#DCE6EB]">
            <Clock className="w-3.5 h-3.5 text-[#0B5D68]" />
            <span>Scroll Down to Experience All 4 Steps</span>
          </div>
        </div>

        {/* 02. Step Quick Jump Bar */}
        <div className="flex items-center gap-2.5 sm:gap-3 overflow-x-auto no-scrollbar pb-3 mb-8 sm:mb-12 -mx-4 px-4 sm:mx-0 sm:px-0">
          {JOURNEY_STEPS.map((step) => (
            <button
              key={step.id}
              onClick={() => scrollToStep(step.stepNumber)}
              className="flex items-center gap-2.5 px-3.5 sm:px-4 py-2 rounded-full bg-white hover:bg-[#ECF4F7] border border-[#DCE6EB] hover:border-[#0B5D68]/40 text-xs sm:text-sm text-[#0C2338] transition-all whitespace-nowrap cursor-pointer shadow-xs group shrink-0"
            >
              <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#ECF4F7] text-[#0B5D68] flex items-center justify-center text-[11px] sm:text-[12px] font-bold group-hover:bg-[#0B5D68] group-hover:text-white transition-colors">
                {step.stepNumber}
              </span>
              <span className="font-heading font-semibold text-[#0C2338]">
                {step.navTitle || step.title}
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-[#6B7C88] group-hover:translate-x-0.5 transition-transform" />
            </button>
          ))}
        </div>

        {/* 03. STICKY STACKING CARDS CONTAINER (1580px) */}
        <div className="relative">
          {JOURNEY_STEPS.map((step, index) => (
            <JourneyStickyCard
              key={step.id}
              step={step}
              index={index}
              total={JOURNEY_STEPS.length}
              onOpenIntake={openIntake}
            />
          ))}
        </div>

        {/* 04. Bottom Master Reassurance & Contact Ribbon */}
        <div className="mt-14 sm:mt-18 p-6 sm:p-8 rounded-3xl bg-white border border-[#DCE6EB] shadow-sm flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#ECF4F7] border border-[#DCE6EB] flex items-center justify-center text-[#0B5D68] shrink-0 shadow-xs">
              <ShieldCheck className="w-6 h-6 text-[#0B5D68]" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-heading font-bold text-[#0C2338]">
                Have questions or prefer speaking to a live care coordinator?
              </h4>
              <p className="text-xs sm:text-sm text-[#6B7C88] mt-1 max-w-2xl">
                Our coordinators speak plain English and can explain the complete medical journey for senior patients or family members over a friendly phone call or WhatsApp message.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto shrink-0">
            <button
              onClick={() => openIntake("Bottom Journey Ribbon — Start 4-Step Review")}
              className="px-6 py-3.5 rounded-xl bg-[#F0A126] hover:bg-[#db8e18] text-[#0C2338] font-heading font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Start Free 4-Step Review</span>
              <ArrowRight className="w-4 h-4 text-[#0C2338]" />
            </button>
            <a
              href="https://wa.me/919876543210?text=Hello%2C%20I%20have%20questions%20about%20the%204-step%20patient%20journey"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-[#0B5D68] hover:bg-[#094b54] text-white border border-transparent font-heading font-bold text-xs uppercase tracking-wider transition-all shadow-xs flex items-center justify-center gap-2 text-center"
            >
              <MessageSquare className="w-4 h-4 text-[#ffffff]" />
              <span className="text-[#ffffff]">WhatsApp Coordinator</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
