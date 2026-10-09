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
    description: "Official medical visa invitation issued directly in 24 hours.",
    icon: FileText,
  },
  {
    id: "chauffeur",
    title: "Private Chauffeur Airport Transit",
    description: "Dedicated AC vehicle meets you at arrivals for door-to-door transit.",
    icon: Car,
  },
  {
    id: "suites",
    title: "Handpicked Sanitized Suites",
    description: "Quiet 4–5 star recovery suites vetted for elevator access and hygiene.",
    icon: Building2,
  },
  {
    id: "bedside",
    title: "In-Person Consultation Support",
    description: "Your English-speaking coordinator accompanies you to hospital visits.",
    icon: UserCheck,
  },
  {
    id: "coordinator",
    title: "24/7 Named Care Desk",
    description: "One single dedicated coordinator who knows your file inside-out.",
    icon: MessageSquare,
  },
  {
    id: "continuity",
    title: "Digital GP Continuity Pack",
    description: "Complete translated surgical notes and radiology sent to your home doctor.",
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
    <section className="py-20 sm:py-28 lg:py-32 bg-[#FFFFFF] border-t border-[#DCE6EB] font-sans">
      <div className="max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* 2-Column Visual Storytelling Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-16 sm:mb-20">

          {/* LEFT COLUMN: Header & 6 Clean 1-Line Concierge Cards */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ECF4F7] border border-[#DCE6EB] text-[#0B5D68] text-xs font-heading font-bold uppercase tracking-wider mb-4 shadow-xs w-max">
              <Sparkles className="w-3.5 h-3.5 text-[#0B5D68]" />
              <span>END-TO-END CARE CONCIERGE</span>
            </div>

            {/* Main Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-heading font-extrabold text-[#0C2338] leading-[1.15] tracking-tight mb-4">
              Care Doesn&apos;t Stop{" "}
              <span className="text-[#0B5D68] block sm:inline">
                at the Hospital Door.
              </span>
            </h2>

            {/* Subtitle Description */}
            <p className="text-[#6B7C88] text-base sm:text-lg leading-relaxed font-normal mb-8 max-w-2xl">
              Surgery is only one milestone. Our concierge coordinates every logistic around it so you and your family can focus entirely on healing.
            </p>

            {/* 6 Airy Concierge Cards with 1-Line Copy */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {CONCIERGE_SERVICES.map((service) => {
                const IconComponent = service.icon;
                return (
                  <div
                    key={service.id}
                    className="p-4 sm:p-5 rounded-2xl bg-[#FCFDFD] border border-[#DCE6EB] hover:border-[#0B5D68]/40 shadow-xs hover:shadow-md transition-all flex items-start gap-3.5 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#ECF4F7] border border-[#DCE6EB] flex items-center justify-center text-[#0B5D68] shrink-0 group-hover:bg-[#0B5D68] group-hover:text-white transition-colors">
                      <IconComponent className="w-4 h-4 transition-colors" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="font-heading font-bold text-sm text-[#0C2338] leading-snug mb-1 group-hover:text-[#0B5D68] transition-colors">
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
          <div className="lg:col-span-5 relative w-full h-[460px] sm:h-[540px] lg:h-[620px] rounded-3xl overflow-hidden shadow-xl border border-[#DCE6EB] bg-slate-100 group">
            
            <Image
              src="/hero-doctor-patient.jpg"
              alt="Medical Concierge Care"
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              priority
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#0C2338]/80 via-transparent to-black/10 pointer-events-none" />

            <div className="absolute top-5 left-5 z-10">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#0C2338]/85 backdrop-blur-md text-white text-[11px] font-heading font-bold uppercase tracking-wider border border-white/20 shadow-md">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#F0A126]" />
                <span>1-on-1 Dedicated Concierge</span>
              </span>
            </div>

            {/* Floating Specialist Card */}
            <div className="absolute bottom-5 sm:bottom-6 left-5 sm:left-6 right-5 sm:right-6 z-20">
              <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-xl border border-white/80 flex items-center justify-between gap-4">
                
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#0B5D68] shrink-0 bg-slate-100 shadow-sm">
                    <Image
                      src="/priya-sharma.jpg"
                      alt="Priya Sharma - Senior Care Coordinator"
                      fill
                      sizes="48px"
                      className="object-cover object-center"
                    />
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#10B981] rounded-full border-2 border-white shadow-xs" />
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

                <button
                  onClick={handleWhatsAppDesk}
                  className="px-4 py-2.5 rounded-xl bg-[#0B5D68] hover:bg-[#07434B] active:scale-95 text-white font-heading font-bold text-xs uppercase tracking-wider transition-all shadow-sm flex items-center gap-1.5 shrink-0 cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
                  <span>WhatsApp</span>
                </button>

              </div>
            </div>

          </div>

        </div>

        {/* Soft, Clean Assistance Banner (One Primary CTA) */}
        <div className="bg-[#F8FAFC] rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 border border-[#DCE6EB] shadow-xs">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white border border-[#DCE6EB] flex items-center justify-center text-[#0B5D68] shrink-0 shadow-xs">
              <MessageSquare className="w-6 h-6 text-[#0B5D68]" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-xl text-[#0C2338] mb-1">
                Have questions about travel, visas, or recovery suites?
              </h4>
              <p className="text-[#6B7C88] text-xs sm:text-sm">
                Speak directly with an international care coordinator right now.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0 w-full md:w-auto">
            <button
              onClick={() => openIntake("Concierge Coordination Request")}
              className="w-full md:w-auto px-8 py-3.5 rounded-xl bg-[#F0A126] hover:bg-[#db8e18] text-[#0C2338] font-heading font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-md shadow-[#F0A126]/20 flex items-center justify-center gap-2 cursor-pointer group"
            >
              <span>Speak With Care Coordinator</span>
              <ArrowRight className="w-4 h-4 text-[#0C2338] stroke-[2.4] transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
