"use client";

import React from "react";
import Link from "next/link";
import { useCare } from "@/context/CareContext";
import {
  FileText,
  Stethoscope,
  Plane,
  HeartHandshake,
  CheckCircle2,
  ArrowRight,
  Clock,
  ShieldCheck,
  Sparkles,
  ChevronRight,
  UploadCloud,
  FileCheck2,
} from "lucide-react";

interface JourneyStep {
  number: string;
  phase: string;
  timeframe: string;
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
  title: string;
  tagline: string;
  description: string;
  highlights: string[];
  actionLabel: string;
}

const STEPS: JourneyStep[] = [
  {
    number: "01",
    phase: "Phase 01",
    timeframe: "24–48 Hours",
    icon: FileText,
    iconColor: "text-[#087F79]",
    iconBg: "bg-[#EAF5F4]",
    title: "Share Medical Reports",
    tagline: "Confidential Clinical Review",
    description:
      "Submit your imaging scans, blood work, and diagnoses for rapid, confidential review by premier Indian quaternary hospital specialists.",
    highlights: [
      "Encrypted digital dossier review (HIPAA / GDPR)",
      "Chief surgical specialist evaluation",
      "100% free with zero upfront obligation",
    ],
    actionLabel: "Submit Reports",
  },
  {
    number: "02",
    phase: "Phase 02",
    timeframe: "Pre-Travel Days 2–4",
    icon: Stethoscope,
    iconColor: "text-[#0284C7]",
    iconBg: "bg-[#E0F2FE]",
    title: "Initial Consultation & Plan",
    tagline: "Video Call & Itemized Quotes",
    description:
      "Receive verified surgeon recommendations, accredited hospital options, transparent quotes, and expected recovery milestones.",
    highlights: [
      "Direct video consult with operating surgeon",
      "Itemized package pricing with zero hidden fees",
      "Detailed surgical & recovery timeline",
    ],
    actionLabel: "Book Consultation",
  },
  {
    number: "03",
    phase: "Phase 03",
    timeframe: "Arrival to Discharge",
    icon: Plane,
    iconColor: "text-[#D97706]",
    iconBg: "bg-[#FEF3C7]",
    title: "Travel & Hospital Care",
    tagline: "VIP Arrival & Bedside Care",
    description:
      "Full medical visa support, VIP airport reception, private luxury transfer, and a dedicated personal bedside care coordinator.",
    highlights: [
      "Express Indian Medical Visa invitation letters",
      "VIP airport pickup & direct hospital admission",
      "Personal bilingual bedside liaison & advocate",
    ],
    actionLabel: "View Travel Support",
  },
  {
    number: "04",
    phase: "Phase 04",
    timeframe: "Post-Discharge & Beyond",
    icon: HeartHandshake,
    iconColor: "text-[#16A34A]",
    iconBg: "bg-[#DCFCE7]",
    title: "Ongoing Support & Aftercare",
    tagline: "Safe Return & Follow-Up",
    description:
      "Pre-departure fit-to-fly clearance, post-discharge medication pack, and structured continuous telemedicine follow-ups after your return.",
    highlights: [
      "Formal fit-to-fly surgeon clearance dossier",
      "30-day medication pack with brand equivalents",
      "Continuous video check-ins after return home",
    ],
    actionLabel: "Explore Aftercare",
  },
];

export const PatientJourney: React.FC = () => {
  const { openIntake } = useCare();

  return (
    <section id="journey" className="py-16 sm:py-20 lg:py-24 bg-white border-b border-[#DCE5EB] relative overflow-hidden">
      {/* Ambient Radial Depth Glow */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#087F79]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#102B46]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ========================================================
            ROW 01: SECTION HEADER ROW
           ======================================================== */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-2xl">
            {/* Eyebrow Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF5F4] border border-[#087F79]/20 shadow-2xs mb-3.5">
              <span className="w-2 h-2 rounded-full bg-[#087F79] animate-pulse" />
              <span className="text-[#087F79] text-xs font-bold uppercase tracking-wider">
                HOW IT WORKS
              </span>
            </div>

            {/* Main Headline */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#102B46] tracking-tight leading-tight">
              Guiding You Through Your Treatment Journey
            </h2>

            {/* Descriptive Subtext */}
            <p className="text-[#627486] text-sm sm:text-base mt-2.5 sm:mt-3 leading-relaxed font-normal">
              From confidential medical review to hospital discharge and safe travel home—a coordinated roadmap designed for peace of mind.
            </p>
          </div>

          {/* Action CTA Button */}
          <div className="shrink-0">
            <button
              onClick={() => openIntake("How It Works - Contact Us")}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-[#087F79] hover:bg-[#066f6a] text-white font-semibold text-sm tracking-wide transition-all duration-200 shadow-sm hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087F79] cursor-pointer"
            >
              <span>Contact Care Team</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ========================================================
            ROW 02: CONNECTED TIMELINE PROGRESS CONDUIT (DESKTOP)
           ======================================================== */}
        <div className="hidden lg:block mb-8 px-4">
          <div className="relative flex items-center justify-between">
            {/* Connecting Track Line */}
            <div className="absolute top-1/2 left-10 right-10 -translate-y-1/2 h-0.5 bg-gradient-to-r from-[#087F79]/30 via-[#087F79] to-[#16A34A]/40 z-0" />

            {/* 4 Pipeline Milestones */}
            {STEPS.map((step, idx) => (
              <div key={step.number} className="relative z-10 flex flex-col items-center">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#DCE5EB] shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-[#087F79] animate-ping" />
                  <span className="text-[11px] font-bold text-[#102B46]">
                    Step {step.number} &bull; {step.timeframe}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================
            ROW 03: 4 VISUAL STEP CARDS (RESPONSIVE GRID)
           ======================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-[#DCE5EB] shadow-md hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Top Glowing Gradient Accent Bar on Hover */}
                <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#087F79] to-[#2ECDC5] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  {/* Card Header: Step Pill & Timeframe Badge */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="w-11 h-11 rounded-2xl bg-[#102B46] group-hover:bg-[#087F79] text-white flex items-center justify-center font-extrabold text-base shadow-sm transition-colors duration-300">
                      {step.number}
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F8FAFC] text-[#627486] text-[11px] font-bold border border-[#DCE5EB] shadow-2xs">
                      <Clock className="w-3 h-3 text-[#087F79]" />
                      <span>{step.timeframe}</span>
                    </div>
                  </div>

                  {/* Icon & Tagline */}
                  <div className="flex items-center gap-3 my-3">
                    <div className={`w-11 h-11 rounded-2xl ${step.iconBg} ${step.iconColor} flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-[#087F79] block">
                        {step.phase}
                      </span>
                      <span className="text-xs font-semibold text-[#627486] leading-tight block">
                        {step.tagline}
                      </span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-bold text-[#102B46] group-hover:text-[#087F79] transition-colors leading-snug mt-2">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#627486] mt-2 leading-relaxed font-normal">
                    {step.description}
                  </p>

                  {/* Highlights Deliverables List */}
                  <div className="mt-5 pt-4 border-t border-[#DCE5EB] space-y-2.5">
                    {step.highlights.map((item, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-2 text-xs text-[#102B46]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#087F79] shrink-0 mt-0.5" />
                        <span className="leading-snug text-[#102B46] font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Bottom CTA Button */}
                <div className="mt-6 pt-4 border-t border-[#DCE5EB]/60">
                  <button
                    type="button"
                    onClick={() => openIntake(`${step.number} - ${step.title}`)}
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#F8FAFC] group-hover:bg-[#087F79] text-[#102B46] group-hover:text-white text-xs font-bold border border-[#DCE5EB] group-hover:border-[#087F79] transition-all duration-200 cursor-pointer shadow-2xs"
                  >
                    <span>{step.actionLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* ========================================================
            ROW 04: BOTTOM CLINICAL ASSURANCE STRIP
           ======================================================== */}
        <div className="mt-12 sm:mt-16 p-6 sm:p-8 rounded-3xl bg-[#F8FAFC] border border-[#DCE5EB] flex flex-col lg:flex-row items-center justify-between gap-6 shadow-sm">
          {/* Trust Guarantees */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full lg:w-auto">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#EAF5F4] flex items-center justify-center text-[#087F79] shrink-0 border border-[#087F79]/20">
                <ShieldCheck className="w-5 h-5 text-[#087F79]" />
              </div>
              <div>
                <p className="font-bold text-[#102B46] text-xs sm:text-sm">100% Confidential</p>
                <p className="text-[11px] text-[#627486]">Encrypted HIPAA/GDPR clinical transfer</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-[#F0A126] shrink-0 border border-amber-200/50">
                <Clock className="w-5 h-5 text-[#F0A126]" />
              </div>
              <div>
                <p className="font-bold text-[#102B46] text-xs sm:text-sm">Zero Surgical Waitlists</p>
                <p className="text-[11px] text-[#627486]">Direct priority slots with senior surgeons</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0 border border-emerald-200/50">
                <Sparkles className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="font-bold text-[#102B46] text-xs sm:text-sm">Personal Bedside Care</p>
                <p className="text-[11px] text-[#627486]">Dedicated liaison from arrival to recovery</p>
              </div>
            </div>
          </div>

          {/* Action CTA */}
          <button
            type="button"
            onClick={() => openIntake("Patient Journey Assurance Banner")}
            className="w-full lg:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-[#087F79] hover:bg-[#066f6a] text-white text-xs sm:text-sm font-bold shadow-sm hover:shadow-md transition-all shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087F79] active:scale-[0.99]"
          >
            <span>Start Your Journey</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
