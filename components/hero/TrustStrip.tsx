"use client";

import React from "react";
import { useCare } from "@/context/CareContext";
import { TRUSTED_COUNTRIES } from "@/data/mockData";
import { ShieldCheck, Award, Building2, Globe2 } from "lucide-react";

export const TrustStrip = () => {
  const { t, language } = useCare();

  const trustItems = [
    {
      icon: Award,
      value: t.hero.trust1,
      label: t.hero.trust1Label,
      accent: "from-[#0D9488] to-[#0A2E50]",
    },
    {
      icon: ShieldCheck,
      value: t.hero.trust2,
      label: t.hero.trust2Label,
      accent: "from-[#2ECDC5] to-[#0D9488]",
    },
    {
      icon: Building2,
      value: t.hero.trust3,
      label: t.hero.trust3Label,
      accent: "from-[#0284C7] to-[#0D9488]",
    },
    {
      icon: Globe2,
      value: t.hero.trust4,
      label: t.hero.trust4Label,
      accent: "from-[#2ECDC5] to-[#0284C7]",
    },
  ];

  return (
    <section className="bg-white border-b border-slate-200/90 py-8 sm:py-10 relative z-10 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {/* Top 4 KPI Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
            {trustItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className={`flex items-center gap-4 ${
                    idx > 0 ? "pt-4 sm:pt-0 sm:pl-8 rtl:sm:pl-0 rtl:sm:pr-8" : ""
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.accent} flex items-center justify-center text-white shadow-md shadow-teal-900/15 shrink-0`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight font-sans">
                      {item.value}
                    </div>
                    <div className="text-xs sm:text-sm font-semibold text-slate-500 tracking-wide mt-0.5">
                      {item.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Trusted Countries Strip */}
          <div className="pt-5 border-t border-slate-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4 text-xs">
            <div className="font-extrabold text-slate-800 uppercase tracking-wider text-[11px] flex items-center gap-2 shrink-0">
              <span className="w-2.5 h-2.5 rounded-full bg-[#2ECDC5] animate-pulse"></span>
              <span>{language === "ar" ? "موثوق من مرضى" : "TRUSTED BY PATIENTS FROM"}</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {TRUSTED_COUNTRIES.map((c) => (
                <span
                  key={c.code}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-medium text-xs hover:bg-teal-50 hover:text-teal-900 hover:border-teal-400 transition-colors shadow-2xs"
                >
                  <span className="px-1.5 py-0.5 rounded bg-teal-100 text-teal-900 font-mono text-[10px] font-bold">
                    {c.code}
                  </span>
                  <span className="font-semibold text-slate-800">{language === "ar" ? c.nameAr : c.name}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
