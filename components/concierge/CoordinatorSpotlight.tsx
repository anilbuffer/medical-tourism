"use client";

import React from "react";
import Image from "next/image";
import { useCare } from "@/context/CareContext";
import { CARE_COORDINATOR } from "@/data/mockData";
import {
  MessageSquare,
  Globe,
  Clock,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  HeartHandshake,
  CheckCircle2,
} from "lucide-react";

export const CoordinatorSpotlight = () => {
  const { t, language, openChat } = useCare();

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-teal-900 via-slate-900 to-[#0B1E33] rounded-3xl p-8 sm:p-12 lg:p-16 text-white shadow-2xl border border-teal-800/40 relative overflow-hidden">
          {/* Subtle Ambient Light */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-teal-500/20 rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Coordinator Photo & Badges */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-sm">
                <div className="relative h-80 sm:h-96 rounded-3xl overflow-hidden ring-4 ring-white/10 shadow-2xl">
                  <Image
                    src={CARE_COORDINATOR.avatar}
                    alt={CARE_COORDINATOR.name}
                    fill
                    className="object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>

                  {/* Availability Badge */}
                  <div className="absolute bottom-4 left-4 bg-slate-950/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span className="text-xs font-bold text-white tracking-wide">
                      🟢 {t.coordinator.responseSpeed}
                    </span>
                  </div>
                </div>

                {/* Floating Micro Card */}
                <div className="absolute -top-4 -right-4 sm:-right-6 bg-white text-slate-900 rounded-2xl p-3.5 shadow-xl border border-slate-100 max-w-[200px]">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-teal-700">
                    Active Patients
                  </div>
                  <div className="text-sm font-extrabold text-slate-900 mt-0.5">
                    {CARE_COORDINATOR.activePatients} Families
                  </div>
                  <div className="text-[10px] text-slate-500">
                    Currently under care
                  </div>
                </div>
              </div>
            </div>

            {/* Right Coordinator Information */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left rtl:lg:text-right">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-300 text-xs font-bold uppercase tracking-wider">
                <HeartHandshake className="w-3.5 h-3.5 text-amber-300" />
                <span>{t.coordinator.eyebrow}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight font-sans">
                {t.coordinator.heading}
              </h2>

              {/* Coordinator Name & Role */}
              <div className="space-y-1">
                <div className="text-2xl font-bold text-teal-300">
                  {language === "ar" ? CARE_COORDINATOR.nameAr : CARE_COORDINATOR.name}
                </div>
                <div className="text-sm text-slate-300 font-medium">
                  {language === "ar" ? CARE_COORDINATOR.roleAr : CARE_COORDINATOR.role}
                </div>
              </div>

              {/* Personal Quote */}
              <div className="bg-white/5 border-l-4 rtl:border-l-0 rtl:border-r-4 border-teal-400 rounded-r-2xl rtl:rounded-r-none rtl:rounded-l-2xl p-4 sm:p-6 backdrop-blur-md">
                <p className="text-sm sm:text-base text-slate-200 italic leading-relaxed">
                  "{language === "ar" ? CARE_COORDINATOR.quoteAr : CARE_COORDINATOR.quote}"
                </p>
              </div>

              {/* Languages */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs">
                <span className="font-bold text-slate-300 flex items-center gap-1.5">
                  <Globe className="w-4 h-4 text-teal-400" />
                  <span>{t.coordinator.languages}</span>
                </span>
                {(language === "ar" ? CARE_COORDINATOR.languagesAr : CARE_COORDINATOR.languages).map(
                  (lang, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-full bg-teal-950/80 border border-teal-500/40 text-teal-200 font-semibold"
                    >
                      {lang}
                    </span>
                  )
                )}
              </div>

              {/* CTA */}
              <div className="pt-2">
                <button
                  onClick={() => openChat("Hello Aisha, I would like to enquire about treatment in India.")}
                  className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl text-sm font-bold text-slate-950 bg-gradient-to-r from-teal-300 via-teal-200 to-emerald-300 hover:from-teal-200 hover:to-emerald-200 shadow-xl shadow-teal-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all group"
                >
                  <MessageSquare className="w-4 h-4 text-slate-950" />
                  <span>{t.coordinator.messageBtn}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
