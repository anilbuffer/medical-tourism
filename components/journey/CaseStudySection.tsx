"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useCare } from "@/context/CareContext";
import { PATIENT_CASE_STUDIES, PatientCaseStudy } from "@/data/mockData";
import {
  MapPin,
  Calendar,
  CheckCircle2,
  Quote,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Building,
  UserCheck,
} from "lucide-react";

export const CaseStudySection = () => {
  const { t, language, openIntake } = useCare();
  const [activeStoryIdx, setActiveStoryIdx] = useState(0);

  const currentCase = PATIENT_CASE_STUDIES[activeStoryIdx] || PATIENT_CASE_STUDIES[0];

  return (
    <section id="stories" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200/70 text-[#0D9488] text-xs font-bold uppercase tracking-wider mb-3">
            {t.caseStudy.eyebrow}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {t.caseStudy.heading}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-500 leading-relaxed max-w-2xl mx-auto">
            {t.caseStudy.subheading}
          </p>
        </div>

        {/* Story Selector Tabs */}
        <div className="flex justify-center gap-3 mb-10">
          {PATIENT_CASE_STUDIES.map((c, idx) => (
            <button
              key={c.id}
              onClick={() => setActiveStoryIdx(idx)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border cursor-pointer ${activeStoryIdx === idx
                ? "bg-slate-900 text-[#2ECDC5] border-teal-500/40 shadow-sm"
                : "bg-white text-slate-700 hover:bg-teal-50 hover:text-teal-900 border-slate-200"
                }`}
            >
              <span>{c.flag}</span>
              <span>
                {language === "ar" ? c.patientNameAr : c.patientName} ({language === "ar" ? c.countryAr : c.country})
              </span>
            </button>
          ))}
        </div>

        {/* Main Case Study Interactive Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-slate-200/80 shadow-card">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Patient & Outcome summary */}
            <div className="lg:col-span-5 space-y-6">
              <div className="flex items-center gap-4">
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden ring-4 ring-teal-100 shadow-md shrink-0">
                  <Image
                    src={currentCase.image}
                    alt={currentCase.patientName}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{currentCase.flag}</span>
                    <h3 className="text-xl font-extrabold text-slate-900">
                      {language === "ar" ? currentCase.patientNameAr : currentCase.patientName}
                    </h3>
                  </div>
                  <div className="text-xs text-slate-500 font-medium">
                    {language === "ar" ? currentCase.countryAr : currentCase.country}
                  </div>
                  <div className="text-xs font-bold text-teal-700 mt-1">
                    {language === "ar" ? currentCase.conditionAr : currentCase.condition}
                  </div>
                </div>
              </div>

              {/* Patient Quote */}
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 relative">
                <Quote className="w-8 h-8 text-teal-200 absolute top-3 right-3 rtl:left-3 rtl:right-auto" />
                <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed relative z-10">
                  "{language === "ar" ? currentCase.quoteAr : currentCase.quote}"
                </p>
              </div>

              {/* Journey Summary Stats Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-teal-50/70 border border-teal-200/60 rounded-xl p-3">
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Stay Duration</div>
                  <div className="text-sm font-extrabold text-teal-900 mt-0.5">{currentCase.stats.duration}</div>
                </div>
                <div className="bg-teal-50/70 border border-teal-200/60 rounded-xl p-3">
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Consultations</div>
                  <div className="text-sm font-extrabold text-teal-900 mt-0.5">{currentCase.stats.consultations}</div>
                </div>
                <div className="bg-teal-50/70 border border-teal-200/60 rounded-xl p-3">
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Coordinator</div>
                  <div className="text-sm font-extrabold text-teal-900 mt-0.5">{currentCase.stats.coordinator}</div>
                </div>
                <div className="bg-teal-50/70 border border-teal-200/60 rounded-xl p-3">
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Estimated Savings</div>
                  <div className="text-sm font-extrabold text-emerald-700 mt-0.5">{currentCase.stats.savings}</div>
                </div>
              </div>
            </div>

            {/* Right Step-by-Step Visual Timeline */}
            <div className="lg:col-span-7 space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                Coordinated Care Timeline
              </h4>

              <div className="space-y-4 relative before:absolute before:inset-0 before:left-3.5 rtl:before:left-auto rtl:before:right-3.5 before:w-0.5 before:bg-teal-200">
                {currentCase.timeline.map((step, idx) => (
                  <div key={idx} className="relative flex items-start gap-4">
                    <div className="w-7 h-7 rounded-full bg-teal-500 text-white flex items-center justify-center font-bold text-xs shrink-0 z-10 ring-4 ring-white shadow-xs">
                      {idx + 1}
                    </div>
                    <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 flex-1">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="font-bold text-xs sm:text-sm text-slate-900">
                          {language === "ar" ? step.stageAr : step.stage}
                        </span>
                        <span className="text-[10px] font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full">
                          {step.location}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {language === "ar" ? step.detailsAr : step.details}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 text-right rtl:text-left">
                <button
                  onClick={() => openIntake("Patient Journey Consult")}
                  className="inline-flex items-center gap-2 text-xs font-bold text-teal-700 hover:text-teal-900 group cursor-pointer"
                >
                  <span>Plan your care journey like {currentCase.patientName}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
