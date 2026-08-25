"use client";

import React, { useState } from "react";
import { useCare } from "@/context/CareContext";
import {
  FileText,
  UserCheck,
  Calculator,
  Plane,
  HeartHandshake,
  Stethoscope,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Sparkles,
} from "lucide-react";

export const PatientJourney = () => {
  const { t, language, openIntake } = useCare();
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: "01",
      icon: FileText,
      title: t.journey.step1Title,
      description: t.journey.step1Desc,
      days: "Day 0 – 1",
      deliverable: "Digital Patient Profile & Clinical Dossier",
      details: "You share your medical history and recent scans securely. Our internal clinical reviewers organize your case for departmental evaluation.",
    },
    {
      num: "02",
      icon: UserCheck,
      title: t.journey.step2Title,
      description: t.journey.step2Desc,
      days: "Day 1 – 2",
      deliverable: "Multi-Specialist Match & Direct Video Consult",
      details: "We match you with 2–3 leading Senior Consultants and arrange an exploratory high-definition video consultation so you can speak directly with the surgeon.",
    },
    {
      num: "03",
      icon: Calculator,
      title: t.journey.step3Title,
      description: t.journey.step3Desc,
      days: "Day 2 – 3",
      deliverable: "Itemized Hospital Quotation & Clinical Roadmap",
      details: "You receive a clear breakdown of hospital stay length, implant brands, ICU duration, and transparent cost packages with zero hidden markups.",
    },
    {
      num: "04",
      icon: Plane,
      title: t.journey.step4Title,
      description: t.journey.step4Desc,
      days: "Day 4 – 7",
      deliverable: "Priority M-Visa & Curated Stay Booking",
      details: "We issue official hospital visa invitation letters for you and up to two attendants, book long-stay recovery apartments, and coordinate arrival logistics.",
    },
    {
      num: "05",
      icon: HeartHandshake,
      title: t.journey.step5Title,
      description: t.journey.step5Desc,
      days: "Treatment Week",
      deliverable: "Bedside Coordinator & Multilingual Companion",
      details: "VIP tarmac pickup, direct hospital admission, language translation, daily coordinator visits, and continuous updates to your family at home.",
    },
    {
      num: "06",
      icon: Stethoscope,
      title: t.journey.step6Title,
      description: t.journey.step6Desc,
      days: "Post-Discharge & Beyond",
      deliverable: "Tele-Rehab & Hometown Doctor Sync",
      details: "Follow-up telemedicine consultations at 30, 90, and 180 days, digitized health records in your pocket, and long-term medication coordination.",
    },
  ];

  return (
    <section id="journey" className="py-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-100/80 text-teal-800 text-xs font-extrabold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>{t.journey.eyebrow}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t.journey.heading}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            {t.journey.subheading}
          </p>
        </div>

        {/* 6 Steps Interactive Pathway */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isSelected = activeStep === idx;

            return (
              <div
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`relative rounded-3xl p-6 transition-all duration-300 cursor-pointer border flex flex-col justify-between ${
                  isSelected
                    ? "bg-gradient-to-br from-slate-900 via-slate-900 to-teal-950 text-white border-teal-500/50 shadow-xl shadow-teal-950/20 scale-[1.02]"
                    : "bg-white text-slate-900 border-slate-200/80 hover:border-teal-300 hover:shadow-lg shadow-sm"
                }`}
              >
                <div>
                  {/* Top Step Pill & Days */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`text-xs font-black px-2.5 py-1 rounded-full ${
                        isSelected
                          ? "bg-teal-400 text-slate-950"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {step.num}
                    </span>
                    <span
                      className={`text-xs font-semibold ${
                        isSelected ? "text-teal-300" : "text-slate-400"
                      }`}
                    >
                      {step.days}
                    </span>
                  </div>

                  {/* Icon & Title */}
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        isSelected
                          ? "bg-teal-500/20 text-teal-300 border border-teal-500/30"
                          : "bg-teal-50 text-teal-700"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3
                      className={`text-base font-bold tracking-tight ${
                        isSelected ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {step.title}
                    </h3>
                  </div>

                  <p
                    className={`text-xs sm:text-sm leading-relaxed mb-4 ${
                      isSelected ? "text-slate-300" : "text-slate-600"
                    }`}
                  >
                    {step.description}
                  </p>
                </div>

                {/* Key Deliverable Footer */}
                <div
                  className={`pt-3 border-t text-[11px] font-semibold flex items-center gap-1.5 ${
                    isSelected
                      ? "border-white/10 text-teal-300"
                      : "border-slate-100 text-slate-500"
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                  <span className="truncate">{step.deliverable}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Highlight Focus Drawer for Selected Step */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-card flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center font-bold text-lg shrink-0 shadow-md shadow-teal-600/20">
              {steps[activeStep].num}
            </div>
            <div>
              <div className="text-xs uppercase font-bold text-teal-700 tracking-wider">
                Step Spotlight: {steps[activeStep].title}
              </div>
              <p className="text-sm font-medium text-slate-700 mt-1 max-w-2xl">
                {steps[activeStep].details}
              </p>
            </div>
          </div>

          <button
            onClick={() => openIntake()}
            className="w-full md:w-auto px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs tracking-wide shadow-md transition-all shrink-0 flex items-center justify-center gap-2"
          >
            <span>Start With Step 01</span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </button>
        </div>
      </div>
    </section>
  );
};
