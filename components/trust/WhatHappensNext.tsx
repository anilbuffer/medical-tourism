"use client";

import React from "react";
import { useCare } from "@/context/CareContext";
import {
  MessageSquareHeart,
  FileSearch,
  Layers,
  ThumbsUp,
  ShieldCheck,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export const WhatHappensNext = () => {
  const { t, language, openIntake } = useCare();

  const steps = [
    {
      num: "01",
      icon: MessageSquareHeart,
      title: t.whatNext.step1Title,
      description: t.whatNext.step1Desc,
    },
    {
      num: "02",
      icon: FileSearch,
      title: t.whatNext.step2Title,
      description: t.whatNext.step2Desc,
    },
    {
      num: "03",
      icon: Layers,
      title: t.whatNext.step3Title,
      description: t.whatNext.step3Desc,
    },
    {
      num: "04",
      icon: ThumbsUp,
      title: t.whatNext.step4Title,
      description: t.whatNext.step4Desc,
    },
    {
      num: "05",
      icon: ShieldCheck,
      title: t.whatNext.step5Title,
      description: t.whatNext.step5Desc,
    },
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-100/80 text-teal-800 text-xs font-extrabold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>{t.whatNext.eyebrow}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t.whatNext.heading}
          </h2>
          <p className="mt-3 text-base text-slate-600">
            {t.whatNext.subheading}
          </p>
        </div>

        {/* 5 Steps Linear Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-12">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="bg-slate-50 rounded-3xl p-6 border border-slate-200/80 hover:border-teal-400 hover:bg-white hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-8 h-8 rounded-full bg-teal-600 text-white font-extrabold text-xs flex items-center justify-center">
                      {step.num}
                    </span>
                    <Icon className="w-5 h-5 text-teal-600 group-hover:scale-110 transition-transform" />
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t border-slate-200/80 text-[10px] font-bold text-teal-700">
                  {language === "ar" ? `الخطوة ${idx + 1} من 5` : `Step ${idx + 1} of 5`}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Conversion Action */}
        <div className="text-center">
          <button
            onClick={() => openIntake()}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all group"
          >
            <span>{t.whatNext.cta}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

