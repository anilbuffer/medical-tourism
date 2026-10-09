"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Compass,
  ArrowRight,
  Video,
  Plane,
  HeartPulse,
  Home,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { useCare } from "@/context/CareContext";

export interface JourneyStep {
  number: string;
  phase: string;
  title: string;
  description: string;
  image: string;
  tag: string;
  icon: React.ComponentType<{ className?: string }>;
}

const JOURNEY_STEPS: JourneyStep[] = [
  {
    number: "01",
    phase: "FROM YOUR HOME",
    title: "Free Case Review & Video Consult",
    description:
      "Share your existing scans. Meet your chief operating surgeon on a live family video consultation with a fixed-price written quote.",
    image: "/images/connect/surgeon-consultation.jpg",
    tag: "100% Free · Zero Upfront Fee",
    icon: Video,
  },
  {
    number: "02",
    phase: "BEFORE YOU FLY",
    title: "Visa, Travel & Companion Concierge",
    description:
      "Official hospital visa invitation in 24 hours. Companion stay, flight dates, and handpicked hotel suites managed seamlessly.",
    image: "/images/hero/senior-couple-medical-trip.jpg",
    tag: "24h Fast-Track Visa Support",
    icon: Plane,
  },
  {
    number: "03",
    phase: "SURGICAL ADMISSION",
    title: "VIP Arrival & Quaternary Surgery",
    description:
      "Chauffeur meets you at the gate. Surgery conducted in JCI sterile modular theatres with authentic US-FDA implants.",
    image: "/images/clinical-integrity-banner.jpg",
    tag: "Zero Waiting Lists · JCI Care",
    icon: HeartPulse,
  },
  {
    number: "04",
    phase: "SAFE RECOVERY",
    title: "Guided Recovery & Safe Return",
    description:
      "Supervised physiotherapy in quiet hotel suites, official fit-to-fly clearance, and digital surgical records sent to your home GP.",
    image: "/images/connect/care-bedside.jpg",
    tag: "Home GP Continuity Care",
    icon: Home,
  },
];

export const PatientJourney = () => {
  const { openIntake } = useCare();
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section
      id="journey"
      className="py-20 sm:py-28 lg:py-32 bg-white relative border-t border-[#DCE6EB] font-sans"
    >
      <div className="max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header: Spacious & Minimal */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-20 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ECF4F7] border border-[#DCE6EB] text-[#0B5D68] text-xs font-heading font-bold uppercase tracking-wider mb-4 shadow-xs">
              <Compass className="w-3.5 h-3.5 text-[#0B5D68]" />
              <span>THE CONCIERGE JOURNEY</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-heading font-extrabold text-[#0C2338] leading-[1.15] tracking-tight">
              From Your Living Room to{" "}
              <span className="text-[#0B5D68]">Full Recovery.</span>
            </h2>
            <p className="text-[#6B7C88] text-base sm:text-lg leading-relaxed font-normal mt-3">
              Four seamless phases personally managed by your dedicated medical concierge.
            </p>
          </div>

          <div className="hidden md:flex items-center gap-2 text-xs font-semibold text-[#6B7C88]">
            <span className="h-2 w-2 rounded-full bg-[#0B5D68]" />
            <span>End-to-End Escorted Care</span>
          </div>
        </div>

        {/* 4 Visual Storytelling Cards Grid (Airy & Premium) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16">
          {JOURNEY_STEPS.map((step, idx) => {
            const Icon = step.icon;
            const isSelected = activeStep === idx;

            return (
              <div
                key={step.number}
                onMouseEnter={() => setActiveStep(idx)}
                className={`group relative bg-[#FCFDFD] rounded-3xl border transition-all duration-300 p-6 sm:p-7 flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? "border-[#0B5D68] shadow-xl shadow-slate-200/60 -translate-y-1.5"
                    : "border-[#DCE6EB] shadow-xs hover:border-[#0B5D68]/40 hover:shadow-md"
                }`}
              >
                <div>
                  {/* Step Visual Image with Rounded Edges */}
                  <div className="relative aspect-[16/11] w-full rounded-2xl overflow-hidden mb-6 bg-slate-100 border border-[#DCE6EB]/60">
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    {/* Step Number Top-Left Pill */}
                    <div className="absolute top-3 left-3 z-10">
                      <span className="px-3 py-1 rounded-full bg-[#0C2338]/90 backdrop-blur-md text-[#F0A126] font-heading font-extrabold text-xs tracking-wider shadow-sm border border-white/20">
                        {step.number}
                      </span>
                    </div>

                    {/* Step Icon Top-Right */}
                    <div className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/95 backdrop-blur-md text-[#0B5D68] flex items-center justify-center shadow-sm">
                      <Icon className="w-4 h-4 text-[#0B5D68]" />
                    </div>
                  </div>

                  {/* Sub-label */}
                  <p className="text-[11px] font-heading font-bold uppercase tracking-wider text-[#0B5D68] mb-1.5">
                    {step.phase}
                  </p>

                  {/* Step Title */}
                  <h3 className="text-lg sm:text-xl font-heading font-extrabold text-[#0C2338] mb-2.5 leading-snug group-hover:text-[#0B5D68] transition-colors">
                    {step.title}
                  </h3>

                  {/* 1–2 Line Description */}
                  <p className="text-xs sm:text-sm text-[#6B7C88] leading-relaxed mb-6 font-normal">
                    {step.description}
                  </p>
                </div>

                {/* Bottom Hallmark Tag */}
                <div className="pt-4 border-t border-[#DCE6EB]/70 flex items-center gap-2 text-xs font-semibold text-[#0C2338]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0B5D68] shrink-0" />
                  <span className="truncate">{step.tag}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* One Primary CTA Bar with Generous Whitespace */}
        <div className="bg-[#F8FAFC] rounded-3xl border border-[#DCE6EB] p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="max-w-xl text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-[#0C2338] mb-1.5">
              Ready to explore your surgical options?
            </h3>
            <p className="text-xs sm:text-sm text-[#6B7C88] leading-relaxed">
              Receive an independent surgical feasibility review and guaranteed quote within 24–48 hours.
            </p>
          </div>

          <button
            onClick={() => openIntake("Patient Journey Concierge Plan")}
            className="w-full md:w-auto px-9 py-4 rounded-xl bg-[#F0A126] hover:bg-[#db8e18] active:scale-[0.98] text-[#0C2338] font-heading font-bold text-xs sm:text-sm uppercase tracking-wider shadow-md shadow-[#F0A126]/20 transition-all cursor-pointer flex items-center justify-center gap-2.5 shrink-0 group"
          >
            <span>Start Free Case Review</span>
            <ArrowRight className="w-4 h-4 text-[#0C2338] stroke-[2.4] transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
};
