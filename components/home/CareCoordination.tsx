"use client";

import React from "react";
import Image from "next/image";
import {
  Sparkles,
  FileText,
  Car,
  Building2,
  UserCheck,
  MessageSquare,
  ShieldCheck,
  ArrowRight,
  PhoneCall,
  CheckCircle2,
} from "lucide-react";
import { useCare } from "@/context/CareContext";

interface ConciergeService {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const CONCIERGE_SERVICES: ConciergeService[] = [
  {
    id: "visa",
    title: "Fast-Track Hospital Visa Letter",
    description:
      "Official medical visa invitation letter issued within 24 hours directly from the hospital medical directorate.",
    icon: FileText,
  },
  {
    id: "chauffeur",
    title: "Private Chauffeur Airport Transit",
    description:
      "Personal chauffeur with air-conditioned private vehicle meets you at arrivals, transferring you directly to your hotel.",
    icon: Car,
  },
  {
    id: "suites",
    title: "Handpicked Sanitized Recovery Suites",
    description:
      "Clean, vetted 4 or 5-star patient-recovery suites handpicked for hygiene, elevator access, and hospital proximity.",
    icon: Building2,
  },
  {
    id: "bedside",
    title: "In-Person Consultation Accompaniment",
    description:
      "Dedicated English-speaking coordinator accompanies you into clinical consultations ensuring complete clarity.",
    icon: UserCheck,
  },
  {
    id: "coordinator",
    title: "24/7 Named WhatsApp Coordinator",
    description:
      "One named coordinator who knows your case file inside-out, reachable 24/7 before, during, and after your stay.",
    icon: MessageSquare,
  },
  {
    id: "continuity",
    title: "Complete Digital Continuity Care Pack",
    description:
      "Translated digital records, surgical notes, imaging on drive, and medication timetable delivered to your home doctor.",
    icon: ShieldCheck,
  },
];

export const CareCoordination = () => {
  const { openIntake } = useCare();

  const handleWhatsAppDesk = () => {
    const text = encodeURIComponent(
      "Hello, I would like to inquire about Your Medicare Trip's End-to-End Concierge services. Can you help me?"
    );
    window.open(`https://wa.me/919876543210?text=${text}`, "_blank");
  };

  return (
    <section className="py-16 sm:py-24 bg-[#F5F7F6] border-t border-[#DCE6EB] font-sans">
      <div className="max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Full-Width 2-Column Layout Matching Reference Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-16">

          {/* LEFT COLUMN: Header & Stacked Concierge Service Cards */}
          <div className="lg:col-span-7 flex flex-col justify-center">

            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ECF4F7] border border-[#DCE6EB] text-[#0B5D68] text-xs font-heading font-bold uppercase tracking-wider mb-4 shadow-xs w-max">
              <span className="w-2 h-2 rounded-full bg-[#14B8A6] animate-pulse" />
              <Sparkles className="w-3.5 h-3.5 text-[#0B5D68]" />
              <span>END-TO-END CARE CONCIERGE</span>
            </div>

            {/* Main Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] xl:text-[46px] font-heading font-bold text-[#0C2338] leading-[1.15] tracking-tight mb-4">
              Care Doesn&apos;t Stop{" "}
              <span className="text-[#0e9d8d] block sm:inline">
                at the Hospital Door.
              </span>
            </h2>

            {/* Subtitle Description */}
            <p className="text-[#6B7C88] text-sm sm:text-base leading-relaxed font-normal mb-8 max-w-2xl">
              Your surgery is one part of the journey. Our concierge coordinates every single detail around it so you and your loved ones can focus 100% on healing.
            </p>

            {/* Stacked Concierge Cards (With Your Medicare Trip Concierge) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
              {CONCIERGE_SERVICES.map((service) => {
                const IconComponent = service.icon;
                return (
                  <div
                    key={service.id}
                    className="p-4 sm:p-5 rounded-2xl bg-white border border-[#DCE6EB] hover:border-[#0B5D68]/40 shadow-sm hover:shadow-md transition-all flex items-start gap-3.5 group"
                  >
                    {/* Icon Box with Soft Clinical Tint */}
                    <div className="w-11 h-11 rounded-xl bg-[#ECF4F7] border border-[#DCE6EB] flex items-center justify-center text-[#0B5D68] shrink-0 group-hover:bg-[#0B5D68] group-hover:text-white transition-colors">
                      <IconComponent className="w-5 h-5 transition-colors" />
                    </div>

                    {/* Content */}
                    <div className="min-w-0 flex-1">
                      <h3 className="font-heading font-bold text-sm sm:text-base text-[#0C2338] leading-snug mb-1 group-hover:text-[#0B5D68] transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-xs text-[#6B7C88] leading-relaxed font-normal">
                        {service.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

          {/* RIGHT COLUMN: Big Photography Canvas with Floating Specialist Card */}
          <div className="lg:col-span-5 relative w-full h-[480px] sm:h-[580px] lg:h-[660px] rounded-3xl overflow-hidden shadow-2xl border border-[#DCE6EB] bg-slate-100 group">

            {/* Big High-Definition Photograph */}
            <Image
              src="/hero-doctor-patient.jpg"
              alt="Medical Concierge Care"
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              priority
            />

            {/* Subtle Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0C2338]/85 via-transparent to-black/10 pointer-events-none" />

            {/* Top Badge: Verified Concierge Standard */}
            <div className="absolute top-5 left-5 z-10">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#0C2338]/85 backdrop-blur-md text-white text-[11px] font-heading font-bold uppercase tracking-wider border border-white/20 shadow-md">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#14B8A6]" />
                <span>1-on-1 Dedicated Concierge</span>
              </span>
            </div>

            {/* Floating Specialist / Coordinator Card Matching Reference Image */}
            <div className="absolute bottom-5 sm:bottom-6 left-5 sm:left-6 right-5 sm:right-6 z-20">
              <div className="bg-white rounded-2xl p-4 sm:p-4.5 shadow-2xl border border-white/60 flex items-center justify-between gap-3 sm:gap-4">

                {/* Avatar with Online Status Dot */}
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#0B5D68] shrink-0 bg-slate-100 shadow-sm">
                    <Image
                      src="/priya-sharma.jpg"
                      alt="Priya Sharma - Senior Care Coordinator"
                      fill
                      sizes="48px"
                      className="object-cover object-center"
                    />
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#14B8A6] rounded-full border-2 border-white shadow-xs" />
                  </div>

                  <div className="min-w-0">
                    <h4 className="font-heading font-bold text-sm text-[#0C2338] truncate">
                      Priya Sharma
                    </h4>
                    <p className="text-xs text-[#0B5D68] font-medium truncate">
                      Senior Care Coordinator
                    </p>
                  </div>
                </div>

                {/* Quick Action Button */}
                <button
                  onClick={handleWhatsAppDesk}
                  className="px-4 py-2.5 rounded-xl bg-[#0B5D68] hover:bg-[#07434B] active:scale-95 text-white font-heading font-bold text-xs uppercase tracking-wider transition-all shadow-sm flex items-center gap-1.5 shrink-0 cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#14B8A6]" />
                  <span>WhatsApp</span>
                </button>

              </div>
            </div>

          </div>

        </div>

        {/* WhatsApp Assistance Banner */}
        <div className="bg-[#0C2338] text-white rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-white/10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#0B5D68] flex items-center justify-center text-white shrink-0">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-xl text-white mb-1">
                Have questions about visas, hotels or flights?
              </h4>
              <p className="text-slate-300 text-xs sm:text-sm">
                Speak directly with an international care coordinator right now on WhatsApp.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {/* Secondary Action Button 2 */}
            <button
              onClick={handleWhatsAppDesk}
              className="px-6 py-3.5 rounded-xl bg-[#0B5D68] hover:bg-[#07434B] text-white font-heading font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-2 border border-[#14B8A6]/30 cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-[#14B8A6] animate-pulse"></span>
              <span>Chat on WhatsApp</span>
            </button>

            {/* Primary Action Button 1 */}
            <button
              onClick={() => openIntake("Concierge Request")}
              className="px-6 py-3.5 rounded-xl bg-[#F0A126] hover:bg-[#db8e18] text-[#0C2338] font-heading font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-[#F0A126]/20 cursor-pointer"
            >
              Request Call Back
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
