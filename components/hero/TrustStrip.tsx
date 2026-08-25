"use client";

import React from "react";
import { useCare } from "@/context/CareContext";
import { ShieldCheck, Award, Building2, Globe2 } from "lucide-react";

export const TrustStrip = () => {
  const { t } = useCare();

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
      <div className="bg-white rounded-2xl shadow-xl shadow-slate-900/5 border border-slate-100 p-4 sm:p-6 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
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
    </div>
  );
};
