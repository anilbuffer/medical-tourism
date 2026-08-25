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
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-100/80 text-teal-800 text-xs font-extrabold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>{t.caseStudy.eyebrow}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t.caseStudy.heading}
          </h2>
          <p className="mt-3 text-base text-slate-600">
            {t.caseStudy.subheading}
          </p>
        </div>

        {/* Story Selector Tabs */}
        <div className="flex justify-center gap-3 mb-10">
          {PATIENT_CASE_STUDIES.map((c, idx) => (
            <button
              key={c.id}
              onClick={() => setActiveStoryIdx(idx)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border ${
                activeStoryIdx === idx
                  ? "bg-slate-900 text-white border-slate-900 shadow-md"
                  : "bg-white text-slate-700 hover:bg-slate-100 border-slate-200"
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
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden ring-4 ring-slate-100 shadow-md shrink-0">
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
                <div className="bg-teal-50/70 border border-teal-100 rounded-xl p-3">
                  <div className="text-[10px] uppercase font-bold text-teal-700">Stay Duration</div>
                  <div className="text-sm font-extrabold text-slate-900 mt-0.5">{currentCase.stats.duration}</div>
                </div>
                <div className="bg-teal-50/70 border border-teal-100 rounded-xl p-3">
                  <div className="text-[10px] uppercase font-bold text-teal-700">Consultations</div>
                  <div className="text-sm font-extrabold text-slate-900 mt-0.5">{currentCase.stats.consultations}</div>
                </div>
                <div className="bg-teal-50/70 border border-teal-100 rounded-xl p-3">
                  <div className="text-[10px] uppercase font-bold text-teal-700">Coordinator</div>
                  <div className="text-sm font-extrabold text-slate-900 mt-0.5">{currentCase.stats.coordinator}</div>
                </div>
                <div className="bg-teal-50/70 border border-teal-100 rounded-xl p-3">
                  <div className="text-[10px] uppercase font-bold text-teal-700">Estimated Savings</div>
                  <div className="text-sm font-extrabold text-slate-900 mt-0.5">{currentCase.stats.savings}</div>
                </div>
              </div>
            </div>

            {/* Right Step-by-Step Visual Timeline */}
            <div className="lg:col-span-7 space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                Coordinated Care Timeline
              </h4>

              <div className="relative pl-6 rtl:pl-0 rtl:pr-6 border-l-2 rtl:border-l-0 rtl:border-r-2 border-slate-200 space-y-6">
                {currentCase.timeline.map((item, idx) => (
                  <div key={idx} className="relative group">
                    {/* Node Dot */}
                    <div className="absolute -left-[31px] rtl:-left-auto rtl:-right-[31px] top-1 w-4 h-4 rounded-full bg-white border-4 border-teal-600 group-hover:scale-125 transition-transform"></div>

                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-extrabold text-slate-900">
                          {language === "ar" ? item.stageAr : item.stage}
                        </span>
                        <span className="text-[10px] font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md">
                          {item.location}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {language === "ar" ? item.detailsAr : item.details}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => openIntake("Patient Journey Inquiry")}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-md transition-all group"
                >
                  <span>Plan a Similar Journey for Your Condition</span>
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
