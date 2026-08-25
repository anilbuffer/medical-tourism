"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useCare } from "@/context/CareContext";
import { SPECIALTIES, Specialty } from "@/data/mockData";
import {
  Smile,
  Sparkles,
  Eye,
  Activity,
  Baby,
  ArrowRight,
  Clock,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

export const SpecialtiesSection = () => {
  const { t, language, openIntake } = useCare();

  const getSpecialtyIcon = (id: string) => {
    switch (id) {
      case "dental":
        return Smile;
      case "cosmetic":
        return Sparkles;
      case "eye-care":
        return Eye;
      case "orthopedic":
      case "ortho":
        return Activity;
      case "fertility":
      case "women-children":
        return Baby;
      default:
        return Activity;
    }
  };

  return (
    <section id="specialties" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-orange-500 mb-2">
              {t.specialties.eyebrow}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0D3B3F] tracking-tight leading-tight">
              {t.specialties.heading}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-500 leading-relaxed">
              {t.specialties.subheading}
            </p>
          </div>

          <button
            onClick={() => openIntake()}
            className="inline-flex items-center gap-2 text-xs font-bold text-teal-700 hover:text-teal-800 tracking-wider uppercase group"
          >
            <span>{t.specialties.viewAll}</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 5 Core Specialties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SPECIALTIES.map((spec) => {
            const Icon = getSpecialtyIcon(spec.id);
            return (
              <div
                key={spec.id}
                className="group relative bg-white rounded-3xl overflow-hidden border border-slate-200/80 hover:border-teal-400 shadow-card hover:shadow-luxury-hover transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5"
              >
                {/* Visual Header */}
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={spec.image}
                    alt={spec.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>

                  {/* Icon badge floating */}
                  <div className="absolute top-4 left-4 w-11 h-11 rounded-2xl bg-white/90 backdrop-blur-md text-teal-700 flex items-center justify-center shadow-lg">
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Success Rate Pill */}
                  <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{spec.successRate} Success</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-teal-700 transition-colors mb-1.5">
                      {language === "ar" ? spec.nameAr : spec.name}
                    </h3>
                    <p className="text-xs text-teal-700 font-semibold mb-2.5">
                      {language === "ar" ? spec.taglineAr : spec.tagline}
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                      {language === "ar" ? spec.descriptionAr : spec.description}
                    </p>
                  </div>

                  {/* Procedures Tag Cloud */}
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Key Procedures
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {spec.procedures.slice(0, 3).map((proc, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-lg bg-slate-100 text-slate-700 text-[11px] font-medium"
                        >
                          {proc}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Footer Meta & Action */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="text-xs text-slate-500 font-medium flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>Stay: {spec.avgStay}</span>
                    </div>

                    <button
                      onClick={() => openIntake(spec.name)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 group-hover:text-teal-800"
                    >
                      <span>{t.specialties.explore}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                    </button>
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
