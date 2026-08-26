"use client";

import React from "react";
import { useCare } from "@/context/CareContext";
import {
  Plane,
  Car,
  Hotel,
  Languages,
  FileCheck,
  UserCheck,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export const ConciergeSection = () => {
  const { t, language, openChat } = useCare();

  const perks = [
    {
      icon: Plane,
      title: t.concierge.perk1Title,
      description: t.concierge.perk1Desc,
    },
    {
      icon: Car,
      title: t.concierge.perk2Title,
      description: t.concierge.perk2Desc,
    },
    {
      icon: Hotel,
      title: t.concierge.perk3Title,
      description: t.concierge.perk3Desc,
    },
    {
      icon: Languages,
      title: t.concierge.perk4Title,
      description: t.concierge.perk4Desc,
    },
    {
      icon: FileCheck,
      title: t.concierge.perk5Title,
      description: t.concierge.perk5Desc,
    },
    {
      icon: UserCheck,
      title: t.concierge.perk6Title,
      description: t.concierge.perk6Desc,
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-[#061019] via-[#0B192C] to-[#061019] text-white relative overflow-hidden">
      {/* Background glow lines */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#3F4EB4]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#2ECDC5]/8 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#2ECDC5] mb-2">
            {t.concierge.eyebrow}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-sans">
            {t.concierge.heading}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
            {t.concierge.subheading}
          </p>
        </div>

        {/* 6 Luxury Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {perks.map((perk, idx) => {
            const Icon = perk.icon;
            return (
              <div
                key={idx}
                className="bg-white/5 backdrop-blur-md rounded-3xl p-7 border border-white/10 hover:border-[#2ECDC5]/50 hover:bg-white/10 transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#2ECDC5]/10 border border-[#2ECDC5]/30 flex items-center justify-center text-[#2ECDC5] mb-5 group-hover:scale-110 group-hover:bg-[#2ECDC5]/10 group-hover:text-[#2ECDC5] transition-all">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#2ECDC5] transition-colors">
                    {perk.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {perk.description}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-white/10 flex items-center gap-1.5 text-[11px] font-semibold text-[#2ECDC5]">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Complimentary Coordination</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Banner */}
        <div className="text-center">
          <button
            onClick={() => openChat("I'd like to understand more about your concierge services.")}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl text-sm font-bold text-white  bg-gradient-to-r from-[#1d8983] via-[#1baba4] to-[#1d8983] shadow-xl shadow-[#283593]/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <span>{t.concierge.cta}</span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </button>
        </div>
      </div>
    </section>
  );
};
