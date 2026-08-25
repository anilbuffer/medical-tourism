"use client";

import React from "react";
import { useCare } from "@/context/CareContext";
import { Lock, Users, ShieldCheck, FileCheck, Sparkles, CheckCircle2 } from "lucide-react";

export const TrustSafety = () => {
  const { t, language } = useCare();

  const pillars = [
    {
      icon: Lock,
      title: t.trust.pillar1Title,
      description: t.trust.pillar1Desc,
      tag: "HIPAA & GDPR Aligned",
    },
    {
      icon: Users,
      title: t.trust.pillar2Title,
      description: t.trust.pillar2Desc,
      tag: "Clinical Personnel Only",
    },
    {
      icon: ShieldCheck,
      title: t.trust.pillar3Title,
      description: t.trust.pillar3Desc,
      tag: "100% Itemized Invoicing",
    },
  ];

  return (
    <section className="py-20 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-card">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-orange-500 mb-2">
              {t.trust.eyebrow}
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0D3B3F] tracking-tight leading-tight">
              {t.trust.heading}
            </h2>
          </div>

          {/* 3 Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {pillars.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-200/80 flex items-center gap-1.5 text-[11px] font-bold text-teal-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                    <span>{item.tag}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Policy Links */}
          <div className="text-center pt-4 border-t border-slate-100 text-xs text-slate-500 font-medium">
            <span>{t.trust.policyLinks}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
