"use client";

import React from "react";
import { useCare } from "@/context/CareContext";
import {
  Award,
  Cpu,
  Clock,
  HeartHandshake,
  Globe2,
  Sparkles,
  ShieldCheck,
  Zap,
} from "lucide-react";

export const WhyIndiaSection = () => {
  const { t, language } = useCare();

  const pillars = [
    {
      icon: Award,
      title: t.whyIndia.pillar1Title,
      description: t.whyIndia.pillar1Desc,
      stat: "100,000+",
      statLabel: "US/UK Trained Clinicians",
      accent: "from-teal-500 to-emerald-600",
    },
    {
      icon: Cpu,
      title: t.whyIndia.pillar2Title,
      description: t.whyIndia.pillar2Desc,
      stat: "Da Vinci Xi & Proton",
      statLabel: "Advanced Robotic Suites",
      accent: "from-blue-600 to-indigo-600",
    },
    {
      icon: Zap,
      title: t.whyIndia.pillar3Title,
      description: t.whyIndia.pillar3Desc,
      stat: "< 48 Hours",
      statLabel: "Zero Waiting Lists",
      accent: "from-amber-500 to-orange-600",
    },
    {
      icon: TrendingDownIcon,
      title: t.whyIndia.pillar4Title,
      description: t.whyIndia.pillar4Desc,
      stat: "65% – 85%",
      statLabel: "Cost Advantage",
      accent: "from-emerald-500 to-teal-700",
    },
    {
      icon: HeartHandshake,
      title: t.whyIndia.pillar5Title,
      description: t.whyIndia.pillar5Desc,
      stat: "1:1 Dedication",
      statLabel: "Personalized Concierge",
      accent: "from-purple-600 to-pink-600",
    },
  ];

  return (
    <section id="why-india" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100/80 text-teal-800 text-xs font-extrabold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>{t.whyIndia.eyebrow}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t.whyIndia.heading}
          </h2>
          <p className="mt-3 text-base text-slate-600">
            {t.whyIndia.subheading}
          </p>
        </div>

        {/* 5 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`bg-slate-50 rounded-3xl p-7 border border-slate-200/80 hover:border-teal-400 hover:bg-white hover:shadow-luxury-hover transition-all duration-300 flex flex-col justify-between group ${
                  idx === 0 ? "lg:col-span-2 lg:flex-row lg:items-center lg:gap-8" : ""
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.accent} flex items-center justify-center text-white shadow-md shadow-slate-900/10 group-hover:scale-110 transition-transform`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-lg">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Stat Callout */}
                <div className="pt-6 mt-4 lg:pt-0 lg:mt-0 border-t lg:border-t-0 border-slate-200/80 shrink-0">
                  <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm text-center min-w-[150px]">
                    <div className="text-xl font-extrabold text-slate-900 font-sans tracking-tight">
                      {item.stat}
                    </div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-teal-700 mt-0.5">
                      {item.statLabel}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

function TrendingDownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="22 17 13.5 8.5 8.5 13.5 2 7" />
      <polyline points="16 17 22 17 22 11" />
    </svg>
  );
}
