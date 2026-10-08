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
    <section className="py-16 sm:py-24 bg-white border-t border-[#e2eaeb] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f0f8f9] border border-[#dbeff0] text-[#0b5d63] text-xs font-heading font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#0b5d63]" />
            <span>END-TO-END CARE CONCIERGE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-slate-900 mb-4 leading-tight">
            Care Doesn&apos;t Stop at the Hospital Door.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-normal">
            Your surgery is one part of the journey. Our concierge coordinates every single detail around it so you can focus 100% on healing.
          </p>
        </div>

        {/* Side by Side Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Without Coordination */}
          <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200">
            <div className="flex items-center gap-2.5 mb-6 pb-4 border-b border-slate-200">
              <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center font-bold text-xs shrink-0">✕</span>
              <h3 className="font-heading font-bold text-lg text-slate-700">
                Organising On Your Own (Stressful)
              </h3>
            </div>
            <div className="space-y-4">
              {comparison.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-600">
                  <XCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">{item.bad}</p>
                </div>
              ))}
            </div>
          </div>

          {/* With Your Medicare Trip */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#0b5d63] shadow-md">
            <div className="flex items-center gap-2.5 mb-6 pb-4 border-b border-[#dbeff0]">
              <span className="w-6 h-6 rounded-full bg-[#0b5d63] text-white flex items-center justify-center font-bold text-xs shrink-0">✓</span>
              <h3 className="font-heading font-bold text-lg text-[#073f43]">
                With Your Medicare Trip Concierge
              </h3>
            </div>
            <div className="space-y-4">
              {comparison.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-[#f8fafb] border border-slate-200/80 text-xs sm:text-sm text-slate-800 shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-[#0b5d63] shrink-0 mt-0.5" />
                  <p className="leading-relaxed font-medium">{item.good}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* WhatsApp Assistance Banner */}
        <div className="bg-[#04272a] text-white rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#0b5d63] flex items-center justify-center text-white shrink-0">
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
              className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-heading font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
              <span>Chat on WhatsApp</span>
            </a>

            <button
              onClick={() => openIntake("Concierge Request")}
              className="px-6 py-3.5 rounded-xl bg-[#e39b2d] hover:bg-[#a35f0b] text-slate-950 hover:text-white font-heading font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
            >
              Request Call Back
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
