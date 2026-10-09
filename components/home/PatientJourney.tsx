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

export interface JourneyStepItem {
  id: string;
  stepNumber: string;
  stepPhase: string;
  title: string;
  headline: string;
  description: string;
  image: string;
  badge: string;
  stat: string;
  location: string;
  accompaniedBy: string;
  guarantees: string[];
  primaryCta: string;
  icon: React.ComponentType<{ className?: string }>;
}

const JOURNEY_STEPS: JourneyStepItem[] = [
  {
    id: "step-1",
    stepNumber: "01",
    stepPhase: "PHASE 1 · BEFORE YOU FLY · 100% FREE",
    title: "Free Case Review & Video Consult",
    headline: "Send Your Reports. Meet Your Chief Surgeon on Video Before Booking Anything.",
    description:
      "Share your existing scans or paper records from your living room. Our quaternary medical director evaluates your file, provides an honest second opinion, and joins you and your family on a live video consultation with a guaranteed, fixed-price quote.",
    image: "/images/connect/surgeon-consultation.jpg",
    badge: "100% Free · No Upfront Fees",
    stat: "24–48h Specialist Review",
    location: "From the Comfort of Your Home",
    accompaniedBy: "Quaternary Medical Director",
    guarantees: [
      "100% Free Second Opinion — Zero deposit or booking commitment required",
      "Fixed All-Inclusive Written Quote — Surgery, stay, implants & concierge locked",
      "Live Family Video Call — Direct face-to-face consult with your operating surgeon",
    ],
    primaryCta: "Send Reports for Free Review",
    icon: Video,
  },
  {
    id: "step-2",
    stepNumber: "02",
    stepPhase: "PHASE 2 · TRAVEL & VISA BLUEPRINT · ZERO PAPERWORK",
    title: "Visa, Travel & Companion Concierge",
    headline: "We Handle Your Medical Visa, Companion Stay & Travel Logistics.",
    description:
      "Your official hospital invitation letter is issued within 24 hours. Your personal coordinator helps complete your Indian e-Medical Visa, organizes your attendant's permit alongside it, coordinates flight dates around surgery, and reserves vetted recovery suites.",
    image: "/images/hero/senior-couple-medical-trip.jpg",
    badge: "48h Fast-Track Visa Support",
    stat: "Companion Stay Included",
    location: "Global Admissions & Travel Desk",
    accompaniedBy: "International Travel Concierge",
    guarantees: [
      "Hospital Invitation Issued in 24 Hours — Ensuring fast-track e-Visa approval",
      "Family Companion Included — Dedicated hospital room bed & meals for your attendant",
      "Handpicked 4 & 5-Star Suites — Elevator access, sanitized kitchens & room service",
    ],
    primaryCta: "Request Travel Blueprint",
    icon: Plane,
  },
  {
    id: "step-3",
    stepNumber: "03",
    stepPhase: "PHASE 3 · ARRIVAL & SURGERY · ZERO WAITING LISTS",
    title: "VIP Arrival & Quaternary Surgery",
    headline: "Met at the Gate by Your Private Chauffeur & Personal Care Coordinator.",
    description:
      "No navigating unfamiliar airports alone. Your chauffeur transfers you directly to your accommodation in a private air-conditioned vehicle. Day two covers pre-op diagnostics. Day three is surgery in JCI-accredited sterile modular theatres with authentic US-FDA implants.",
    image: "/images/clinical-integrity-banner.jpg",
    badge: "JCI & NABH Quaternary Care",
    stat: "Priority 24–48h Admission",
    location: "Premier Quaternary Hospital, New Delhi NCR",
    accompaniedBy: "In-Person Bedside Concierge",
    guarantees: [
      "Gate-to-Bed Executive Transit — Met inside arrivals with wheelchair assistance if needed",
      "In-Person Named Coordinator — Sits with your family in the hospital and updates relatives back home",
      "Zero Waiting Lists — Reserved surgical date guaranteed within 24–48 hours of flight arrival",
    ],
    primaryCta: "Explore Hospital Facilities",
    icon: HeartPulse,
  },
  {
    id: "step-4",
    stepNumber: "04",
    stepPhase: "PHASE 4 · RECOVERY & RETURNING HOME · LIFETIME CARE",
    title: "Assisted Recovery & Safe Journey Home",
    headline: "Supervised Physical Therapy, Restful Recovery & Safe Flight Home.",
    description:
      "Begin physical therapy right away with daily concierge visits. Recover in a peaceful serviced apartment or scenic luxury Himalayan retreat. Receive comprehensive fit-to-fly clearance, digital surgical records, and scheduled video follow-up consultations back home.",
    image: "/images/connect/care-bedside.jpg",
    badge: "Lifetime Follow-Up Guarantee",
    stat: "Fit-to-Fly Certification Included",
    location: "Recovery Suite & Flight Clearance Home",
    accompaniedBy: "Physiotherapist & Local GP Desk",
    guarantees: [
      "Supervised Physiotherapy — Structured mobility program ensuring day-one independent walking",
      "Digital Continuity Care Pack — Translated surgical notes & radiology drives sent to your home doctor",
      "Lifetime Video Follow-Up — Direct access to your surgical team whenever you need advice at home",
    ],
    primaryCta: "Inquire About Recovery Packages",
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
      className="sticky w-full mb-24 sm:mb-36 lg:mb-44 last:mb-0"
      style={{
        zIndex: 10 + index,
        // Cascading sticky top position creates the tactile stacked deck-of-cards animation on scroll
        top: `calc(5.5rem + ${index * 14}px)`,
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
        className="relative w-full rounded-[20px] sm:rounded-[24px] lg:rounded-[32px] overflow-hidden group transition-all duration-300 shadow-[0_20px_50px_rgba(0,0,0,0.25)] border border-white/20"
      >
        {/* Full-Bleed High-Definition Visual Canvas (1580px Full Container) */}
        <div className="relative w-full min-h-[560px] sm:min-h-[620px] lg:min-h-[680px] xl:min-h-[720px] overflow-hidden">

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
              priority={index === 0}
              sizes="(max-width: 1580px) 100vw, 1580px"
              className="object-cover object-center scale-[1.04] transition-transform duration-700 group-hover:scale-[1.06]"
            />
          </motion.div>

          {/* Gradients ensuring photographic depth and crisp card readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/30 to-transparent pointer-events-none" />

          {/* Dynamic Cursor Spotlight Effect */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300"
            style={{
              opacity: spotlight.opacity,
              background: `radial-gradient(650px circle at ${spotlight.x}px ${spotlight.y}px, rgba(255, 255, 255, 0.12), transparent 70%)`,
            }}
          />

          {/* Top Badges (Clinical Milestone & Stat Pill) */}
          <div className="absolute top-5 sm:top-7 right-5 sm:right-7 z-10 flex flex-wrap items-center gap-2.5">
            {/* Milestone Badge */}
            <div className="inline-flex items-center gap-1.5 h-8 px-3.5 rounded-full bg-white/95 backdrop-blur-md border border-[#DCE6EB] shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-[#0B5D68] shrink-0" />
              <span className="text-[10px] sm:text-[11px] font-heading font-bold tracking-wider uppercase text-[#0C2338]">
                {step.badge}
              </span>
            </div>

            {/* Audited Timing / Stat Badge */}
            <div className="inline-flex items-center gap-1.5 h-8 px-3.5 rounded-full bg-white/95 backdrop-blur-md border border-[#DCE6EB] shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#0B5D68] shrink-0" />
              <span className="text-[10px] sm:text-[11px] font-heading font-bold text-[#0B5D68]">
                {step.stat}
              </span>
            </div>
          </div>

          {/* Floating Dark Navy Glassmorphism Content Card (Anchored on the left) */}
          <motion.div
            style={{
              x: contentTranslateX,
              y: contentTranslateY,
              transformStyle: "preserve-3d",
            }}
            className="absolute z-20 left-5 sm:left-10 lg:left-14 bottom-5 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 w-[calc(100%-2.5rem)] sm:w-[480px] lg:w-[540px]"
          >
            <div className="bg-[#0C2338]/95 backdrop-blur-xl border border-white/15 rounded-3xl p-6 sm:p-8 lg:p-9 text-white shadow-[0_25px_60px_rgba(0,0,0,0.7)] hover:border-white/25 transition-all">

              {/* Step Number Badge + Phase */}
              <div className="flex items-center gap-2.5 mb-3.5">
                <span className="w-8 h-8 rounded-lg bg-[#0B5D68] text-white flex items-center justify-center font-heading font-bold text-xs shadow-xs">
                  {step.stepNumber}
                </span>
                <span className="text-[11px] sm:text-xs font-heading font-bold uppercase tracking-wider text-[#14B8A6]">
                  {step.stepPhase}
                </span>
              </div>

              {/* Step Title Header with Icon */}
              <div className="flex items-center gap-3.5 mb-3">
                <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center text-[#F0A126] shrink-0 shadow-inner">
                  <IconComponent className="w-6 h-6 text-[#F0A126]" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold font-heading text-white tracking-tight leading-tight">
                    {step.title}
                  </h3>
                </div>
              </div>

              {/* Catchy Headline */}
              <h4 className="text-sm sm:text-base font-semibold text-[#ECF4F7] leading-snug mb-3">
                {step.headline}
              </h4>

              {/* Senior-Accessible Clear Description */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal mb-5">
                {step.description}
              </p>

              {/* Guarantees Checklist with Cyan Checkmarks */}
              <div className="space-y-2.5 mb-6 pt-3 border-t border-white/10">
                <p className="text-[11px] font-heading font-bold uppercase tracking-wider text-[#14B8A6]">
                  Guaranteed Standards at this Stage:
                </p>
                {step.guarantees.map((item, gIdx) => (
                  <div
                    key={gIdx}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200 font-medium"
                  >
                    <span className="w-4 h-4 rounded-full bg-[#0B5D68]/40 border border-[#14B8A6]/40 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3 h-3 text-[#14B8A6]" />
                    </span>
                    <span className="leading-snug">{item}</span>
                  </div>
                ))}
              </div>

              {/* Actions Area */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
                {/* Primary CTA (Gold #F0A126) */}
                <button
                  onClick={() => onOpenIntake(`Patient Journey Step ${step.stepNumber} — ${step.title}`)}
                  className="py-3.5 px-6 rounded-xl bg-[#F0A126] hover:bg-[#db8e18] active:scale-[0.98] text-[#0C2338] font-heading font-bold text-xs uppercase tracking-wider shadow-md shadow-[#F0A126]/20 flex items-center justify-center gap-2 transition-all cursor-pointer group/btn flex-1"
                >
                  <span className="text-[#0C2338]">{step.primaryCta}</span>
                  <ArrowRight className="w-4 h-4 text-[#0C2338] stroke-[2.5] transition-transform group-hover/btn:translate-x-1" />
                </button>

                {/* Secondary Action Button 2: bg-[#0B5D68] hover:bg-[#07434B] text-white */}
                <button
                  onClick={handleWhatsApp}
                  className="py-3.5 px-5 rounded-xl bg-[#0B5D68] hover:bg-[#07434B] active:scale-[0.98] text-white font-heading font-bold text-xs uppercase tracking-wider border border-[#14B8A6]/30 flex items-center justify-center gap-2 transition-all cursor-pointer shrink-0 shadow-sm"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#14B8A6]" />
                  <span>WhatsApp Desk</span>
                </button>
              </div>

              {/* Bottom Metadata Bar */}
              <div className="flex items-center justify-between pt-4 mt-4 border-t border-white/10 text-[11px] text-slate-400 font-medium">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate max-w-[200px]">{step.location}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#F0A126] shrink-0" />
                  <span className="font-semibold text-slate-200 truncate max-w-[180px]">
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
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] xl:text-[46px] font-heading font-extrabold text-[#0C2338] leading-[1.15] tracking-tight">
              Four Simple Steps to Your{" "}
              <span className="text-[#0e9d8d] block sm:inline">
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
        <div className="flex items-center gap-2.5 sm:gap-3 overflow-x-auto no-scrollbar pb-3 mb-8 sm:mb-12">
          {JOURNEY_STEPS.map((step) => (
            <button
              key={step.id}
              onClick={() => scrollToStep(step.stepNumber)}
              className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-white hover:bg-[#ECF4F7] border border-[#DCE6EB] hover:border-[#0B5D68]/40 text-xs sm:text-sm text-[#0C2338] transition-all whitespace-nowrap cursor-pointer shadow-xs group"
            >
              <span className="w-8 h-8 rounded-full bg-[#ECF4F7] text-[#0B5D68] flex items-center justify-center text-[12px] font-bold group-hover:bg-[#0B5D68] group-hover:text-white transition-colors">
                {step.stepNumber}
              </span>
              <span className="font-heading font-semibold text-[#0C2338]">
                {step.title}
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
        <div className="mt-14 sm:mt-18 p-6 sm:p-8 rounded-3xl bg-white border border-[#DCE6EB] shadow-lg flex flex-col lg:flex-row items-center justify-between gap-6">
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
              className="px-6 py-3.5 rounded-xl bg-[#0B5D68] hover:bg-[#07434B] text-white border border-transparent font-heading font-bold text-xs uppercase tracking-wider transition-all shadow-xs flex items-center justify-center gap-2 text-center"
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
