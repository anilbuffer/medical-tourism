"use client";

import React from "react";
import { useCare } from "@/context/CareContext";
import { ConfidentialMedicalAssessment } from "@/components/intake/ConfidentialMedicalAssessment";
import {
  ShieldCheck,
  CheckCircle2,
  Lock,
  Sparkles,
  Clock,
  Award,
  HeartHandshake,
} from "lucide-react";

export const IntakePreview = () => {
  const { language } = useCare();

  return (
    <section id="assessment" className="py-20 bg-slate-900 relative overflow-hidden text-white scroll-mt-16">
      <div id="confidential-assessment" className="-mt-16 pt-16 pointer-events-none"></div>
      {/* Ambient background lights */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#2ECDC5]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#3F4EB4]/8 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Context & Guarantees */}
          <div className="lg:col-span-5 space-y-6 text-left rtl:text-right">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2ECDC5]/10 border border-[#2ECDC5]/30 text-[#2ECDC5] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{language === "ar" ? "تقييم طبي مجاني وسري" : "Confidential Medical Assessment"}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {language === "ar" ? (
                <>
                  ابدأ استشارتك <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2ECDC5] to-[#5ADBD5]">
                    مع كبار الاستشاريين
                  </span>
                </>
              ) : (
                <>
                  Get a Free, <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2ECDC5] to-[#5ADBD5]">
                    Clinical Assessment
                  </span>
                </>
              )}
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {language === "ar"
                ? "شاركنا حالتك الطبية أو متطلباتك وسيقوم فريق التنسيق الطبي بمراجعة ملفك مع استشاريين معتمدين وتزويدك بخطة علاجية وتقدير مالي خلال 24 ساعة."
                : "Tell us about your medical needs. Our international clinical desk will review your case with board-certified Indian specialists and deliver tailored doctor recommendations and all-inclusive cost packages within 24 hours."}
            </p>

            {/* Key Clinical Guarantees */}
            <div className="pt-2 space-y-3.5 text-xs text-slate-300">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-lg bg-[#2ECDC5]/10 text-[#2ECDC5] flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span>Direct review by Senior Consultants & Chief Surgeons</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-lg bg-[#2ECDC5]/10 text-[#2ECDC5] flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <span>Fast 12–24 hour response with fixed package price options</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-lg bg-[#2ECDC5]/10 text-[#2ECDC5] flex items-center justify-center shrink-0">
                  <Lock className="w-4 h-4" />
                </div>
                <span>100% Medical Privacy & HIPAA-compliant confidentiality</span>
              </div>
            </div>
          </div>

          {/* Right Column: Confidential Assessment Multi-step Form */}
          <div className="lg:col-span-7">
            <ConfidentialMedicalAssessment isModal={false} />
          </div>
        </div>
      </div>
    </section>
  );
};
