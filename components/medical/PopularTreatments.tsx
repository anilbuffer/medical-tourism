"use client";

import React from "react";
import { useCare } from "@/context/CareContext";
import { Smile, Sparkles, Eye, Bone, Baby, ArrowRight } from "lucide-react";

export const PopularTreatments = () => {
  const { t, language, formatPrice, openIntake } = useCare();

  const treatments = [
    {
      id: "dental",
      icon: Smile,
      title: t.popularTreatments.dental,
      usdPrice: 450,
      badge: "Dental",
    },
    {
      id: "cosmetic",
      icon: Sparkles,
      title: t.popularTreatments.cosmetic,
      usdPrice: 2300,
      badge: "Aesthetics",
    },
    {
      id: "eye",
      icon: Eye,
      title: t.popularTreatments.eye,
      usdPrice: 900,
      badge: "Vision",
    },
    {
      id: "ortho",
      icon: Bone,
      title: t.popularTreatments.ortho,
      usdPrice: 5200,
      badge: "Joints",
    },
    {
      id: "fertility",
      icon: Baby,
      title: t.popularTreatments.fertility,
      usdPrice: 3900,
      badge: "IVF Care",
    },
  ];

  return (
    <section id="treatments" className="py-20 bg-gradient-to-b from-white via-slate-50/50 to-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200/70 text-[#0D9488] text-xs font-bold uppercase tracking-wider mb-3">
            {t.popularTreatments.eyebrow}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {t.popularTreatments.heading}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-500 leading-relaxed max-w-2xl">
            {t.popularTreatments.subheading}
          </p>
        </div>

        {/* 5 Treatment Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {treatments.map((treatment) => {
            const Icon = treatment.icon;
            return (
              <div
                key={treatment.id}
                onClick={() => openIntake(treatment.title)}
                className="group relative bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-md shadow-slate-200/50 hover:shadow-2xl hover:border-teal-400 hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center cursor-pointer justify-between"
              >
                {/* Icon in soft teal rounded circle */}
                <div className="w-14 h-14 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-[#2ECDC5] group-hover:text-slate-950 transition-all shadow-inner">
                  <Icon className="w-6 h-6" />
                </div>

                {/* Title */}
                <div className="w-full flex-1 flex flex-col justify-center">
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors mb-2 leading-snug">
                    {treatment.title}
                  </h3>
                  <div className="text-xs font-semibold text-slate-400">
                    {t.popularTreatments.startingFrom}
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-teal-600 mt-1 tracking-tight">
                    {formatPrice(treatment.usdPrice)}
                  </div>
                </div>

                {/* Subtle Hover Call to Action */}
                <div className="mt-4 pt-3 border-t border-slate-100 w-full flex items-center justify-center gap-1 text-[11px] font-bold text-teal-700 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>{language === "ar" ? "احجز استشارة" : "Get Free Quote"}</span>
                  <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

