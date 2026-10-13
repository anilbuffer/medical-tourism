"use client";

import React from "react";
import Image from "next/image";
import { 
  Building2, 
  ClipboardCheck, 
  Plane, 
  Video, 
  Pill, 
  HeartHandshake,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  PhoneCall
} from "lucide-react";
import { useCare } from "@/context/CareContext";

export const CareCoordination: React.FC = () => {
  const { openIntake } = useCare();

  const inHospitalFeatures = [
    {
      title: "In-Hospital Bedside Liaison",
      desc: "Daily in-person bedside visits, translating medical consultations and communicating directly with your treating surgical unit.",
      icon: Building2,
      badge: "On-Ground",
    },
    {
      title: "Pre-Departure Evaluation",
      desc: "Comprehensive clinical review, wound checks, and specialist clearance before discharging from hospital to your recovery suite.",
      icon: ClipboardCheck,
      badge: "Clinical Check",
    },
    {
      title: "Fit-to-Fly Certification",
      desc: "Official medical clearances, flight safety documentation, and airline medical desk approvals secured for a worry-free return.",
      icon: Plane,
      badge: "Travel Clearance",
    },
  ];

  const homeContinuityFeatures = [
    {
      title: "Scheduled Teleconsultations",
      desc: "Structured follow-up video consultations with your operating chief surgeon after returning to your home country.",
      icon: Video,
      badge: "Surgeon Video",
    },
    {
      title: "Prescription & Dossier Handover",
      desc: "Full supply of post-op medications with international brand equivalents, translated medical records, and digital scans.",
      icon: Pill,
      badge: "Full Supply",
    },
    {
      title: "24/7 Dedicated Coordinator",
      desc: "Direct WhatsApp and phone hotline for ongoing recovery questions, symptom monitoring, and local GP handover assistance.",
      icon: HeartHandshake,
      badge: "24/7 Hotline",
    },
  ];

  return (
    <section id="aftercare" className="py-16 sm:py-20 lg:py-24 bg-[#F8FAFC] border-b border-[#DCE5EB] relative overflow-hidden">
      {/* Subtle Background Ambiance */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#087F79]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-[#102B46]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF5F4] border border-[#087F79]/20 text-xs font-bold text-[#087F79] mb-4 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#087F79] animate-pulse" />
            <span className="uppercase tracking-wider">Aftercare &amp; Continuity</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#102B46] tracking-tight leading-tight">
            The Right Choice for Your
            <span className="block mt-1.5 text-[#087F79]">Healthcare &amp; Recovery Needs</span>
          </h2>

          <p className="text-[#627486] text-sm sm:text-base mt-4 leading-relaxed font-normal">
            From daily bedside advocacy in India to follow-up video consultations back in your home country, our medical continuity team protects your healing journey every step of the way.
          </p>
        </div>

        {/* 3-Column Master Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* ========================================================
              LEFT COLUMN: PHASE 01 — IN-HOSPITAL CARE (3 CARDS)
             ======================================================== */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#DCE5EB]">
              <span className="text-xs font-bold uppercase tracking-wider text-[#087F79]">
                Phase 01 &bull; In-Hospital Support
              </span>
              <span className="text-[11px] font-semibold text-[#627486] bg-white px-2 py-0.5 rounded-full border border-[#DCE5EB]">
                On-Ground
              </span>
            </div>

            {inHospitalFeatures.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="bg-white rounded-2xl p-5 sm:p-6 border border-[#DCE5EB] hover:border-[#087F79]/40 hover:shadow-md transition-all duration-200 flex-1 flex flex-col justify-center group"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="w-11 h-11 rounded-xl bg-[#EAF5F4] border border-[#087F79]/15 flex items-center justify-center text-[#087F79] group-hover:bg-[#087F79] group-hover:text-white transition-colors duration-200 shrink-0">
                      <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                    </div>
                    <span className="text-[11px] font-semibold text-[#087F79] bg-[#EAF5F4] px-2.5 py-1 rounded-full">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#102B46] group-hover:text-[#087F79] transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#627486] mt-2 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* ========================================================
              CENTER COLUMN: DEDICATED CARE COORDINATOR SHOWCASE
             ======================================================== */}
          <div className="lg:col-span-4 flex flex-col">
            <div className="relative rounded-3xl overflow-hidden border border-[#DCE5EB] bg-gradient-to-b from-[#EAF5F4] via-white to-[#F8FAFC] shadow-xl hover:shadow-2xl transition-all duration-300 flex-1 flex flex-col justify-between group min-h-[480px] lg:min-h-full">
              
              {/* Top Floating Badge */}
              <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-[#102B46] text-xs font-bold shadow-sm border border-[#DCE5EB]">
                  <span className="w-2 h-2 rounded-full bg-[#087F79] animate-pulse" />
                  <span>Personal Care Liaison</span>
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#102B46]/90 backdrop-blur-md text-white text-[11px] font-semibold shadow-sm">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#2ECDC5]" />
                  <span>100% Dedicated</span>
                </span>
              </div>

              {/* Portrait Doctor Image */}
              <div className="relative w-full h-[360px] sm:h-[400px] lg:h-[440px] mt-10">
                <Image
                  src="/doctor-care-coordinator.jpg"
                  alt="Doctor Care Coordinator & Continuity Lead"
                  fill
                  sizes="(max-width: 1024px) 100vw, 400px"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                {/* Soft gradient blend at bottom of image */}
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white via-white/80 to-transparent" />
              </div>

              {/* Bottom Information Card */}
              <div className="p-6 relative z-10 bg-white border-t border-[#DCE5EB] -mt-6 rounded-b-3xl">
                <div className="flex items-center gap-2 mb-1.5">
                  <Sparkles className="w-4 h-4 text-[#087F79]" />
                  <span className="text-xs font-bold text-[#087F79] uppercase tracking-wider">
                    Continuity of Care Director
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#102B46] leading-tight">
                  Dr. Ananya Sharma
                </h3>
                <p className="text-xs text-[#627486] mt-1 leading-relaxed">
                  Direct medical liaison accompanying you from bedside discharge in India to your full recovery back home.
                </p>

                {/* Micro tags */}
                <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-[#DCE5EB]">
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#102B46] bg-[#EAF5F4] px-2.5 py-1 rounded-md">
                    <CheckCircle2 className="w-3 h-3 text-[#087F79]" />
                    Bedside Visits
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#102B46] bg-[#EAF5F4] px-2.5 py-1 rounded-md">
                    <CheckCircle2 className="w-3 h-3 text-[#087F79]" />
                    Fit-to-Fly Lead
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#102B46] bg-[#EAF5F4] px-2.5 py-1 rounded-md">
                    <CheckCircle2 className="w-3 h-3 text-[#087F79]" />
                    Home Video Consults
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* ========================================================
              RIGHT COLUMN: PHASE 02 — HOME CONTINUITY (3 CARDS)
             ======================================================== */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#DCE5EB]">
              <span className="text-xs font-bold uppercase tracking-wider text-[#087F79]">
                Phase 02 &bull; Home Recovery &amp; Video
              </span>
              <span className="text-[11px] font-semibold text-[#627486] bg-white px-2 py-0.5 rounded-full border border-[#DCE5EB]">
                Global Care
              </span>
            </div>

            {homeContinuityFeatures.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="bg-white rounded-2xl p-5 sm:p-6 border border-[#DCE5EB] hover:border-[#087F79]/40 hover:shadow-md transition-all duration-200 flex-1 flex flex-col justify-center group"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="w-11 h-11 rounded-xl bg-[#EAF5F4] border border-[#087F79]/15 flex items-center justify-center text-[#087F79] group-hover:bg-[#087F79] group-hover:text-white transition-colors duration-200 shrink-0">
                      <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                    </div>
                    <span className="text-[11px] font-semibold text-[#087F79] bg-[#EAF5F4] px-2.5 py-1 rounded-full">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#102B46] group-hover:text-[#087F79] transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#627486] mt-2 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>

        {/* Bottom Assurance Action Bar */}
        <div className="mt-10 sm:mt-12 bg-white rounded-2xl p-5 sm:p-6 border border-[#DCE5EB] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-[#102B46]">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#087F79] shrink-0" />
              <span className="font-semibold">Zero Communication Gap</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#087F79] shrink-0" />
              <span className="font-semibold">Complete Medical Record Pack</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#087F79] shrink-0" />
              <span className="font-semibold">Surgeon Follow-up Guaranteed</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => openIntake("Care Coordination & Aftercare Inquiry")}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-[#087F79] hover:bg-[#066f6a] text-white text-xs sm:text-sm font-semibold transition-all shadow-sm hover:shadow-md cursor-pointer shrink-0"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Connect with Care Team</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};

