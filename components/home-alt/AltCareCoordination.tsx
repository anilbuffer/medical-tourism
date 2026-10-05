"use client";

import React, { useState } from "react";
import Image from "next/image";
import { XCircle, CheckCircle2, MessageSquare, ArrowRight, ShieldCheck, PhoneCall, Sparkles, UserCheck, Shield } from "lucide-react";
import { useCare } from "@/context/CareContext";
import { Button } from "@/components/ui/button";

export const AltCareCoordination = () => {
  const { openChat } = useCare();
  const [activeTab, setActiveTab] = useState("With us / on your own");

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
    <section id="concierge" className="py-24 sm:py-32 bg-gradient-to-b from-[#040D28] via-[#07183B] to-[#05112A] text-white relative overflow-hidden">
      {/* Decorative ambient subtle circle */}
      <div className="absolute top-1/3 right-0 w-[550px] h-[550px] bg-vedara-cyan/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-[500px] h-[500px] bg-vedara-blue/20 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-[2px] w-10 bg-vedara-gold" />
            <p className="text-vedara-gold font-bold text-xs uppercase tracking-[0.25em]">
              CARE COORDINATION
            </p>
            <div className="h-[2px] w-10 bg-vedara-gold" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white mb-4 leading-tight">
            Care doesn&apos;t Stop at the Hospital Door.
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
            Your treatment is one part of the journey. Our concierge team coordinates every detail around it.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-16">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeTab === tab 
                  ? "bg-vedara-cyan text-[#020713] font-black shadow-lg shadow-cyan-500/25 scale-105" 
                  : "bg-white/10 text-white/70 hover:bg-white/20 border border-white/15"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ── Main Comparison Container ── */}
        <div className="w-full">
          <div className="mb-12 text-center sm:text-left flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="text-vedara-gold font-bold text-xs uppercase tracking-[0.2em] mb-2">
                AROUND THE TREATMENT
              </p>
              <h3 className="text-2xl sm:text-3xl font-serif text-white">
                The same trip, arranged two ways.
              </h3>
              <p className="text-slate-300 text-sm sm:text-base max-w-3xl font-light mt-1">
                You can organise treatment in India yourself — plenty of people do. This is what each part looks like either way.
              </p>
            </div>

            <button
              type="button"
              onClick={() => openChat("Hi, could you explain how care coordination works for my treatment?")}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/[0.08] hover:bg-white/[0.15] text-vedara-cyan border border-white/20 text-xs font-bold transition-all cursor-pointer self-center sm:self-auto shadow-md backdrop-blur-xl"
            >
              <MessageSquare className="w-4 h-4 text-vedara-cyan" />
              <span>Ask a Coordinator</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            
            {/* Left Column: DIY (Arranging it yourself) */}
            <div className="bg-gradient-to-b from-rose-950/40 via-[#180812]/90 to-[#0F040A]/95 rounded-3xl p-6 sm:p-10 border-2 border-rose-500/30 shadow-2xl flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-4 mb-8 pb-5 border-b border-rose-500/20">
                  <div className="w-12 h-12 rounded-2xl bg-rose-500/20 flex items-center justify-center text-rose-400 shadow-xs border border-rose-500/30">
                    <XCircle className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="font-serif text-2xl font-bold text-white">Arranging it yourself</h4>
                    <p className="text-xs text-rose-400 font-medium">Independent coordination & multiple middlemen</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {comparison.map((item, idx) => (
                    <div 
                      key={idx} 
                      className="bg-black/40 rounded-2xl p-5 shadow-xs border border-rose-500/20 relative hover:border-rose-400/40 transition-colors"
                    >
                      <div className="flex items-start gap-3.5">
                        <span className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-300 font-black text-xs flex items-center justify-center shrink-0 mt-0.5 border border-rose-500/30">
                          {idx + 1}
                        </span>
                        <p className="text-slate-300 text-sm leading-relaxed">{item.bad}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-5 border-t border-rose-500/20 flex items-center gap-2 text-xs text-rose-400 font-semibold">
                <span>Result: Unpredictable delays, anxiety, translation issues & fragmented records.</span>
              </div>
            </div>

            {/* Right Column: With Us */}
            <div className="bg-gradient-to-b from-[#0C2248]/95 via-[#081838]/95 to-[#040F26]/95 rounded-3xl p-6 sm:p-10 border-2 border-cyan-500/40 shadow-[0_0_50px_rgba(46,205,197,0.2)] flex flex-col justify-between relative overflow-hidden backdrop-blur-2xl">
              {/* Subtle top-right accent */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-vedara-cyan/20 rounded-full blur-3xl pointer-events-none" />

              <div>
                <div className="flex items-center gap-4 mb-8 pb-5 border-b border-white/15">
                  <div className="w-12 h-12 rounded-2xl bg-vedara-cyan/20 border border-vedara-cyan/40 flex items-center justify-center text-vedara-cyan shadow-md shadow-cyan-500/20">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="font-serif text-2xl font-bold text-white">With us</h4>
                    <p className="text-xs text-vedara-cyan font-bold">Personally coordinated clinical concierge</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {comparison.map((item, idx) => (
                    <div 
                      key={idx} 
                      className="bg-white/[0.04] rounded-2xl p-5 shadow-sm border border-white/10 relative hover:border-vedara-cyan/50 transition-colors"
                    >
                      <div className="flex items-start gap-3.5">
                        <span className="w-6 h-6 rounded-full bg-vedara-cyan text-[#020713] font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <p className="text-slate-100 font-semibold text-sm leading-relaxed">{item.good}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-5 border-t border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <span className="text-xs text-slate-200 font-bold flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-vedara-gold" />
                  <span>One dedicated clinical coordinator from initial scan review to full recovery</span>
                </span>
                <span className="px-3.5 py-1 rounded-full bg-vedara-cyan/20 text-vedara-cyan border border-vedara-cyan/40 text-xs font-black self-start sm:self-auto shadow-glow">
                  Standard in All Trips
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
