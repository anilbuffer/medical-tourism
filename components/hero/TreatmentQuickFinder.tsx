"use client";

import React, { useState } from "react";
import { useCare } from "@/context/CareContext";
import {
  Stethoscope,
  ArrowRight,
  ShieldCheck,
  Clock,
  Sparkles,
  Search,
  Building2,
  Globe2,
  Wallet,
  CheckCircle2,
  Calendar,
  Lock,
} from "lucide-react";

export const TreatmentQuickFinder = () => {
  const { language, openIntake, openChat, setCountry } = useCare();
  const [selectedSpecialty, setSelectedSpecialty] = useState("cardiac");
  const [selectedCountry, setSelectedCountry] = useState("GB");
  const [selectedTimeline, setSelectedTimeline] = useState("flexible");

  const fastTrackSpecialties = [
    { id: "Cardiology & Heart Surgery", label: "Cardiology", icon: "🫀" },
    { id: "Orthopedics & Robotic Joint Replacement", label: "Orthopedics", icon: "🦴" },
    { id: "Neurosurgery & Spine Procedures", label: "Neurosurgery", icon: "🧠" },
    { id: "Dental Implants & Smile Makeovers", label: "Dental Implants", icon: "🦷" },
    { id: "LASIK & Ophthalmology Eye Care", label: "Eye Care", icon: "👁️" },
    { id: "IVF & Reproductive Medicine", label: "IVF & Fertility", icon: "👶" },
  ];

  const handleQuickEstimate = (e: React.FormEvent) => {
    e.preventDefault();
    const treatmentNames: Record<string, string> = {
      cardiac: "Cardiology & Heart Surgery",
      orthopedic: "Robotic Joint Replacement",
      oncology: "Comprehensive Cancer Care",
      neuro: "Brain & Spine Surgery",
      dental: "Dental Implants & All-on-4",
      "eye-care": "LASIK & Cataract Eye Care",
      cosmetic: "Cosmetic & Aesthetic Surgery",
      ivf: "IVF & Reproductive Medicine",
      transplant: "Organ Transplant Consultation",
    };
    const title = treatmentNames[selectedSpecialty] || selectedSpecialty;
    openIntake(title);
  };

  return (
    <section id="treatment-finder" className="py-16 sm:py-20 bg-gradient-to-b from-slate-50 via-slate-100/50 to-slate-50 border-b border-slate-200/80 relative overflow-hidden">
      {/* Ambient background decoration */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#2ECDC5]/8 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#0284C7]/8 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-slate-200 shadow-2xl shadow-slate-300/40">

          {/* Header Strip */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-100 mb-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200/70 text-[#0D9488] text-xs font-bold uppercase tracking-wider mb-2.5">
                <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                <span>{language === "ar" ? "حاسبة التكلفة والبحث السريع" : "Instant Treatment & Cost Quick-Finder"}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight font-sans">
                {language === "ar"
                  ? "اختر علاجك واحصل على خطة علاجية وتقدير مالي خلال 24 ساعة"
                  : "Find Doctors, Compare Hospital Costs & Get Free Consultation"}
              </h2>
            </div>

            <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-teal-50/80 border border-teal-200/70 text-xs font-bold text-teal-800 shrink-0">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0D9488] animate-pulse"></span>
              <span>{language === "ar" ? "الرد خلال 12–24 ساعة" : "Average response: < 12 Hours"}</span>
            </div>
          </div>

          {/* Specialty Fast-Track Pills */}
          <div className="mb-8">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Stethoscope className="w-4 h-4 text-teal-600" />
              <span>{language === "ar" ? "التخصصات الطبية الأكثر طلباً:" : "Popular Medical Specialties:"}</span>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
              {fastTrackSpecialties.map((spec) => (
                <button
                  key={spec.id}
                  onClick={() => openIntake(spec.id)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-50 hover:bg-teal-50 border border-slate-200 hover:border-teal-400 text-xs font-bold text-slate-700 hover:text-teal-900 transition-all shadow-2xs hover:shadow-sm hover:-translate-y-0.5 group cursor-pointer"
                >
                  <span className="text-base">{spec.icon}</span>
                  <span>{spec.label}</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 -ml-1.5 group-hover:opacity-100 group-hover:ml-0 transition-all text-teal-600" />
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Multi-Field Quick Search Form */}
          <form onSubmit={handleQuickEstimate} className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-5 items-end bg-slate-50/80 p-5 sm:p-6 rounded-3xl border border-slate-200">

            {/* Field 1: Treatment / Specialty */}
            <div className="md:col-span-4">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 text-left rtl:text-right flex items-center gap-1.5">
                <Stethoscope className="w-4 h-4 text-teal-600" />
                <span>{language === "ar" ? "اختر العلاج أو الإجراء" : "Select Treatment / Procedure"}</span>
              </label>
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3.5 text-xs sm:text-sm text-slate-900 font-semibold focus:ring-2 focus:ring-[#2ECDC5] focus:border-teal-500 outline-none shadow-xs cursor-pointer"
              >
                <option value="cardiac">Cardiology & Heart Bypass / Valve Surgery</option>
                <option value="orthopedic">Robotic Total Knee & Hip Replacement</option>
                <option value="oncology">Comprehensive Cancer & Tumor Surgery</option>
                <option value="neuro">Brain, Neuro & Minimally Invasive Spine Surgery</option>
                <option value="dental">Full Mouth Dental Implants & All-on-4</option>
                <option value="eye-care">Custom Contoura LASIK & Cataract Care</option>
                <option value="cosmetic">Cosmetic, Plastic & Hair Restoration</option>
                <option value="ivf">IVF, ICSI & Advanced Fertility Care</option>
                <option value="transplant">Liver & Kidney Organ Transplant Evaluation</option>
              </select>
            </div>

            {/* Field 2: Country / Currency */}
            <div className="md:col-span-3">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 text-left rtl:text-right flex items-center gap-1.5">
                <Globe2 className="w-4 h-4 text-teal-600" />
                <span>{language === "ar" ? "بلد الإقامة" : "Your Residence Country"}</span>
              </label>
              <select
                value={selectedCountry}
                onChange={(e) => {
                  setSelectedCountry(e.target.value);
                  setCountry(e.target.value as any);
                }}
                className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3.5 text-xs sm:text-sm text-slate-900 font-semibold focus:ring-2 focus:ring-[#2ECDC5] focus:border-teal-500 outline-none shadow-xs cursor-pointer"
              >
                <option value="GB">United Kingdom (GBP)</option>
                <option value="CA">Canada (CAD)</option>
                <option value="AU">Australia (AUD)</option>
                <option value="AE">United Arab Emirates (AED)</option>
                <option value="SA">Saudi Arabia (SAR)</option>
                <option value="QA">Qatar (QAR)</option>
                <option value="OM">Oman (OMR)</option>
                <option value="US">United States (USD)</option>
              </select>
            </div>

            {/* Field 3: Travel Timeline */}
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 text-left rtl:text-right flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-teal-600" />
                <span>{language === "ar" ? "موعد السفر" : "Planned Travel"}</span>
              </label>
              <select
                value={selectedTimeline}
                onChange={(e) => setSelectedTimeline(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3.5 text-xs sm:text-sm text-slate-900 font-semibold focus:ring-2 focus:ring-[#2ECDC5] focus:border-teal-500 outline-none shadow-xs cursor-pointer"
              >
                <option value="immediate">Urgent (Within 2 wks)</option>
                <option value="1month">Next 1 Month</option>
                <option value="flexible">Exploring Options</option>
              </select>
            </div>

            {/* CTA Submit Button */}
            <div className="md:col-span-3">
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2.5 px-4 py-3.5 rounded-xl text-xs sm:text-sm font-extrabold text-slate-950 bg-gradient-to-r from-[#2ECDC5] via-[#5EEAD4] to-[#2ECDC5] hover:brightness-105 shadow-xl shadow-[#2ECDC5]/25 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer h-[50px]"
              >
                <span>{language === "ar" ? "احصل على التقدير المجاني" : "Get Free Quote"}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </button>
            </div>
          </form>

          {/* Trust Value Guarantees Row */}
          <div className="mt-6 pt-5 border-t border-slate-100 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-semibold text-slate-600">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
              <span>Free Specialist Second Opinion</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
              <span>48-Hour Medical Visa Support</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
              <span>Up to 70% Cost Savings</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
              <span>100% HIPAA & Data Privacy</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
