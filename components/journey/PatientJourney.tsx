"use client";

import React from "react";
import { useCare } from "@/context/CareContext";
import { ArrowRight, Sparkles } from "lucide-react";

export const PatientJourney = () => {
  const { t, language, openIntake } = useCare();

  const steps = [
    {
      num: "01",
      title: t.journey.step1Title,
      description: t.journey.step1Desc,
    },
    {
      num: "02",
      title: t.journey.step2Title,
      description: t.journey.step2Desc,
    },
    {
      num: "03",
      title: t.journey.step3Title,
      description: t.journey.step3Desc,
    },
    {
      num: "04",
      title: t.journey.step4Title,
      description: t.journey.step4Desc,
    },
    {
      num: "05",
      title: t.journey.step5Title,
      description: t.journey.step5Desc,
    },
    {
      num: "06",
      title: t.journey.step6Title,
      description: t.journey.step6Desc,
    },
  ];

  return (
    <section id="journey" className="py-20 sm:py-24 bg-gradient-to-b from-[#031126] via-[#06203D] to-[#0A2E50] relative overflow-hidden text-white">
      {/* Subtle radial ambient backdrop */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#0284C7]/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-[#2ECDC5]/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#0D9488]/20 to-[#0284C7]/20 border border-[#2ECDC5]/40 text-[#2ECDC5] text-xs font-bold uppercase tracking-wider mb-3 backdrop-blur-md">
            {t.journey.eyebrow}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4 font-sans">
            {t.journey.heading}
          </h2>
          <p className="text-sm sm:text-base text-slate-200/90 leading-relaxed max-w-3xl">
            {t.journey.subheading}
          </p>
        </div>

        {/* 6 Guided Steps Cards (3x2 Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {steps.map((step, idx) => (
            <div
              key={idx}
              onClick={() => openIntake()}
              className="group relative bg-slate-900/80 hover:bg-slate-900 rounded-3xl p-7 sm:p-8 border border-teal-500/25 hover:border-teal-400 shadow-xl shadow-slate-950/40 hover:shadow-2xl hover:shadow-teal-500/10 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between cursor-pointer"
            >
              <div>
                {/* Number */}
                <div className="text-2xl sm:text-3xl font-black text-[#2ECDC5] mb-4 group-hover:scale-105 transition-transform inline-block">
                  {step.num}
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-[#5EEAD4] transition-colors mb-2.5 leading-snug">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Hover CTA Indicator */}
              <div className="mt-6 pt-4 border-t border-teal-500/20 flex items-center justify-between text-xs font-semibold text-[#2ECDC5] opacity-80 group-hover:opacity-100 transition-opacity">
                <span>{language === "ar" ? "ابدأ هذه الخطوة" : "Start this step"}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

