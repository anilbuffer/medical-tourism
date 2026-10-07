"use client";

import React from "react";
import { XCircle, CheckCircle2 } from "lucide-react";

export const CareCoordination1 = () => {
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
    <section className="py-12 sm:py-16 bg-white border-t border-[#E4E9ED]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-[#0070E0] font-bold text-xs uppercase tracking-widest mb-3">
            CARE COORDINATION
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
            Care doesn&apos;t Stop at the Hospital Door.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
            Your treatment is one part of the journey. Our concierge team coordinates every detail around it.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {tabs.map((tab, idx) => (
            <button
              key={idx}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-colors ${
                idx === 2 
                  ? "bg-[#0070E0] text-white" 
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="w-full">
          <div className="mb-10 text-center sm:text-left">
            <p className="text-[#007FFF] font-bold text-xs uppercase tracking-widest mb-2">
              AROUND THE TREATMENT
            </p>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3">
              The same trip, arranged two ways.
            </h3>
            <p className="text-slate-600 text-sm sm:text-base max-w-3xl">
              You can organise treatment in India yourself — plenty of people do. This is what each part looks like either way.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* DIY */}
            <div className="bg-rose-50 rounded-3xl p-6 sm:p-8 border border-rose-100">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-rose-500 border border-rose-200">
                  <XCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-lg">Arranging it yourself</h4>
                  <p className="text-xs text-rose-600 font-medium">Independent coordination</p>
                </div>
              </div>
              
              <div className="space-y-5">
                {comparison.map((item, idx) => (
                  <div key={idx} className="bg-white rounded-2xl p-4.5 shadow-sm border border-rose-100 relative">
                    <div className="absolute -left-2.5 -top-2.5 w-6 h-6 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 font-bold text-[10px] border border-white">
                      {idx + 1}
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed ml-2">{item.bad}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* With Us */}
            <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-[#007FFF]/20 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#007FFF]/5 rounded-full blur-3xl pointer-events-none" />
              <div className="flex items-center gap-3 mb-8 relative z-10">
                <div className="w-10 h-10 rounded-full bg-[#0070E0] flex items-center justify-center text-white shadow-sm border border-[#007FFF]">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-lg">With us</h4>
                  <p className="text-xs text-[#0070E0] font-medium">Personally coordinated care</p>
                </div>
              </div>
              
              <div className="space-y-5 relative z-10">
                {comparison.map((item, idx) => (
                  <div key={idx} className="bg-white rounded-2xl p-4.5 shadow-sm border border-[#E4E9ED] relative">
                    <div className="absolute -left-2.5 -top-2.5 w-6 h-6 rounded-full bg-[#0070E0] flex items-center justify-center text-white font-bold text-[10px] border border-white">
                      {idx + 1}
                    </div>
                    <p className="text-slate-800 font-medium text-sm leading-relaxed ml-2">{item.good}</p>
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
