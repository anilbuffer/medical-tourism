"use client";

import React from "react";
import { XCircle, CheckCircle2 } from "lucide-react";

export const CareCoordination = () => {
  const tabs = [
    "Along the journey",
    "What you won't have to do",
    "With us / on your own",
    "The inclusion ledger",
    "One person, six jobs"
  ];

  const comparison = [
    {
      bad: "Chasing hospitals for invitation letters across time zones and email threads.",
      good: "Invitation letter and visa support — we coordinate the paperwork directly with the hospital.",
    },
    {
      bad: "Arriving after a long flight and figuring out unfamiliar transport on your own.",
      good: "Airport pickup and local transport to your hotel and medical appointments.",
    },
    {
      bad: "Finding accommodation near the hospital without knowing what \"near\" really means.",
      good: "Carefully selected accommodation vetted for cleanliness, safety, and proximity.",
    },
    {
      bad: "Navigating medical consultations and consent conversations across language barriers.",
      good: "Interpreter support ensuring you understand every word of your consultation.",
    },
    {
      bad: "Re-explaining your medical history to a different person every time you call.",
      good: "One dedicated coordinator who knows your case inside out, available via WhatsApp.",
    },
    {
      bad: "Leaving hospital with a stack of records and hoping nothing important is missing.",
      good: "Your Continuity Pack, cleanly organised and translated for your doctor at home.",
    }
  ];

  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-[#3f51b5] font-bold text-xs uppercase tracking-widest mb-3">
            CARE COORDINATION
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F1340] mb-4">
            Care doesn&apos;t Stop at the Hospital Door.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
            Your treatment is one part of the journey. Our concierge team coordinates every detail around it.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-16">
          {tabs.map((tab, idx) => (
            <button
              key={idx}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-colors ${
                idx === 2 
                  ? "bg-[#0F1340] text-white" 
                  : "bg-[#f8f9fa] text-slate-500 hover:bg-slate-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content Section - Full Container Width matching max-w-7xl */}
        <div className="w-full">
          <div className="mb-10 text-center sm:text-left">
            <p className="text-[#a58d34] font-bold text-xs uppercase tracking-widest mb-2">
              AROUND THE TREATMENT
            </p>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F1340] mb-3">
              The same trip, arranged two ways.
            </h3>
            <p className="text-slate-600 text-sm sm:text-base max-w-3xl">
              You can organise treatment in India yourself — plenty of people do. This is what each part looks like either way.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            
            {/* Left Column: DIY */}
            <div className="bg-[#fff8f8] rounded-3xl p-6 sm:p-8 border border-red-100">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-full bg-red-100/80 flex items-center justify-center text-red-500">
                  <XCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-lg">Arranging it yourself</h4>
                  <p className="text-xs text-slate-500">Independent coordination</p>
                </div>
              </div>
              
              <div className="space-y-5">
                {comparison.map((item, idx) => (
                  <div key={idx} className="bg-white rounded-2xl p-4.5 shadow-xs border border-red-100/60 relative">
                    <div className="absolute -left-2.5 -top-2.5 w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-[10px] border border-slate-200">
                      {idx + 1}
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed">{item.bad}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: With Us - Unified Palette (No Green Accents) */}
            <div className="bg-[#f8faff] rounded-3xl p-6 sm:p-8 border border-[#0F1340]/10 shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-full bg-[#0F1340] flex items-center justify-center text-[#C9A24A]">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-lg">With us</h4>
                  <p className="text-xs text-[#0F1340]/70 font-medium">Personally coordinated care</p>
                </div>
              </div>
              
              <div className="space-y-5">
                {comparison.map((item, idx) => (
                  <div key={idx} className="bg-white rounded-2xl p-4.5 shadow-xs border border-slate-200/80 relative">
                    <div className="absolute -left-2.5 -top-2.5 w-5 h-5 rounded-full bg-[#0F1340] flex items-center justify-center text-[#C9A24A] font-bold text-[10px]">
                      {idx + 1}
                    </div>
                    <p className="text-slate-800 font-medium text-sm leading-relaxed">{item.good}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
