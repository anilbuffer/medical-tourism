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
      accent: "from-teal-500 to-emerald-500",
    },
    {
      icon: ShieldCheck,
      value: t.hero.trust2,
      label: t.hero.trust2Label,
      accent: "from-amber-500 to-amber-600",
    },
    {
      icon: Building2,
      value: t.hero.trust3,
      label: t.hero.trust3Label,
      accent: "from-teal-400 to-cyan-500",
    },
    {
      icon: Globe2,
      value: t.hero.trust4,
      label: t.hero.trust4Label,
      accent: "from-emerald-400 to-teal-600",
    },
  ];

  return (
    <div className="relative z-10 -mt-8 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl shadow-xl shadow-slate-900/5 border border-slate-100 p-4 sm:p-6 space-y-4">
        {/* Top 4 KPI Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          {trustItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`flex items-center gap-3.5 ${
                  idx > 0 ? "pt-3 sm:pt-0 sm:pl-6 rtl:sm:pl-0 rtl:sm:pr-6" : ""
                }`}
              >
                <div
                  className={`w-11 h-11 rounded-xl bg-gradient-to-br ${item.accent} flex items-center justify-center text-white shadow-md shadow-teal-900/10 shrink-0`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight font-sans">
                    {item.value}
                  </div>
                  <div className="text-xs font-semibold text-slate-500 tracking-wide">
                    {item.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Trusted Countries Strip */}
        <div className="pt-4 border-t border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
          <div className="font-bold text-slate-700 uppercase tracking-wider text-[11px] flex items-center gap-2 shrink-0">
            <span className="w-2 h-2 rounded-full bg-teal-500"></span>
            <span>{language === "ar" ? "موثوق من مرضى" : "TRUSTED BY PATIENTS FROM"}</span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {TRUSTED_COUNTRIES.map((c) => (
              <span
                key={c.code}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200/90 text-slate-800 font-medium text-[11px] hover:bg-teal-50 hover:text-teal-900 hover:border-teal-300 transition-colors shadow-2xs"
              >
                <span className="px-1 py-0.2 rounded bg-teal-100 text-teal-800 font-mono text-[9px] font-bold">
                  {c.code}
                </span>
                <span className="font-semibold text-slate-700">{language === "ar" ? c.nameAr : c.name}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

