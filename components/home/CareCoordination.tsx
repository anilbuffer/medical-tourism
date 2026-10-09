"use client";

import React, { useState } from "react";
import { XCircle, CheckCircle2, ShieldCheck, MessageSquare, PhoneCall, Sparkles } from "lucide-react";
import { useCare } from "@/context/CareContext";

export const CareCoordination = () => {
  const { openIntake } = useCare();

  const comparison = [
    {
      bad: "Chasing busy hospital administration offices across multiple time zones and unanswered email threads.",
      good: "Official medical visa invitation letter issued within 24 hours directly from the hospital medical directorate.",
    },
    {
      bad: "Arriving after an exhausting 14-hour long-haul flight and navigating confusing airport taxi scams alone.",
      good: "Personal chauffeur with air-conditioned private vehicle meets you at the gate, transferring you directly to your hotel.",
    },
    {
      bad: "Searching hotel portals for accommodation near the hospital without knowing local safety or hygiene standards.",
      good: "Clean, vetted 4 or 5-star patient-recovery suites handpicked for hygiene, elevator access, and hospital proximity.",
    },
    {
      bad: "Navigating complex surgical consent conversations, drug protocols, and doctor consultations across language accents.",
      good: "Dedicated English-speaking coordinator accompanies you into clinical consultations ensuring 100% clarity.",
    },
    {
      bad: "Re-explaining your medical history and imaging scans to a different call-center agent every time you call.",
      good: "One named coordinator who knows your case file inside-out, reachable 24/7 on WhatsApp before and during your stay.",
    },
    {
      bad: "Leaving India with loose paper files, hoping your doctor back home can understand the post-operative instructions.",
      good: "Continuity Care Pack compiled: translated digital records, surgical notes, imaging on drive, and medication timetable.",
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#FCFDFD] border-t border-[#DCE6EB] font-sans">
      <div className="max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ECF4F7] border border-[#DCE6EB] text-[#0B5D68] text-xs font-heading font-bold uppercase tracking-wider mb-3.5 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#0B5D68]" />
            <span>END-TO-END CARE CONCIERGE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] xl:text-[46px] font-heading font-extrabold text-[#0C2338] mb-3 leading-[1.15] tracking-tight">
            <span className="text-[#0B5D68]">Care Doesn&apos;t Stop</span> at the Hospital Door.
          </h2>
          <p className="text-[#6B7C88] text-sm sm:text-base max-w-2xl mx-auto font-normal leading-relaxed">
            Your surgery is one part of the journey. Our concierge coordinates every single detail around it so you can focus 100% on healing.
          </p>
        </div>

        {/* Side by Side Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Without Coordination */}
          <div className="bg-[#ECF4F7]/40 rounded-3xl p-6 sm:p-8 border border-[#DCE6EB]">
            <div className="flex items-center gap-2.5 mb-6 pb-4 border-b border-[#DCE6EB]">
              <span className="w-6 h-6 rounded-full bg-[#DCE6EB] text-[#6B7C88] flex items-center justify-center font-bold text-xs shrink-0">✕</span>
              <h3 className="font-heading font-bold text-lg text-[#6B7C88]">
                Organising On Your Own (Stressful)
              </h3>
            </div>
            <div className="space-y-4">
              {comparison.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-[#DCE6EB] text-xs sm:text-sm text-[#6B7C88]">
                  <XCircle className="w-4 h-4 text-[#6B7C88] shrink-0 mt-0.5" />
                  <p className="leading-relaxed">{item.bad}</p>
                </div>
              ))}
            </div>
          </div>

          {/* With Your Medicare Trip */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#0B5D68] shadow-md">
            <div className="flex items-center gap-2.5 mb-6 pb-4 border-b border-[#DCE6EB]">
              <span className="w-6 h-6 rounded-full bg-[#0B5D68] text-white flex items-center justify-center font-bold text-xs shrink-0">✓</span>
              <h3 className="font-heading font-bold text-lg text-[#0C2338]">
                With Your Medicare Trip Concierge
              </h3>
            </div>
            <div className="space-y-4">
              {comparison.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-[#ECF4F7] border border-[#DCE6EB] text-xs sm:text-sm text-[#0C2338] shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-[#0B5D68] shrink-0 mt-0.5" />
                  <p className="leading-relaxed font-medium">{item.good}</p>
                </div>
              ))}
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
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-[#0B5D68] hover:bg-[#07434B] text-white font-heading font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-2 border border-white/10"
            >
              <span className="w-2 h-2 rounded-full bg-[#F0A126] animate-pulse"></span>
              <span>Chat on WhatsApp</span>
            </a>

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
