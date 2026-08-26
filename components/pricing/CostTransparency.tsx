"use client";

import React from "react";
import { useCare } from "@/context/CareContext";
import {
  ShieldCheck,
  Wallet,
  HeartHandshake,
  Plane,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export const CostTransparency = () => {
  const { t, language, openIntake } = useCare();

  const comparisonData = [
    {
      treatment: "Total Knee / Hip Replacement",
      treatmentAr: "استبدال مفصل الركبة / الورك بالروبوت",
      uk: "$18,000",
      canada: "$22,000",
      australia: "$24,000",
      india: "$4,800",
      savings: "77%",
    },
    {
      treatment: "IVF + ICSI Cycle",
      treatmentAr: "دورة أطفال الأنابيب والحقن المجهري",
      uk: "$11,500",
      canada: "$13,000",
      australia: "$12,500",
      india: "$3,500",
      savings: "72%",
    },
    {
      treatment: "Single Dental Implant (Crown incl.)",
      treatmentAr: "زراعة السن الواحد (شامل التاج)",
      uk: "$2,400",
      canada: "$2,800",
      australia: "$3,100",
      india: "$650",
      savings: "77%",
    },
    {
      treatment: "Blade-Free LASIK (Both Eyes)",
      treatmentAr: "تصحيح النظر بالفيمتو ليزك (للعينين)",
      uk: "$3,600",
      canada: "$3,400",
      australia: "$3,800",
      india: "$1,100",
      savings: "70%",
    },
    {
      treatment: "Rhinoplasty (Nose Reshaping)",
      treatmentAr: "تجميل وترميم الأنف (Rhinoplasty)",
      uk: "$7,500",
      canada: "$8,200",
      australia: "$8,800",
      india: "$1,600",
      savings: "79%",
    },
  ];

  const features = [
    {
      icon: ShieldCheck,
      title: language === "ar" ? "مستشفيات معتمدة دولياً" : "Only Accredited Hospitals",
      desc:
        language === "ar"
          ? "جميع المستشفيات الشريكة حاصلة على اعتمادات JCI أو NABH أو ISO ويعاد تقييمها سنوياً."
          : "Every partner hospital is JCI, NABH or ISO certified and re-verified annually.",
    },
    {
      icon: Wallet,
      title: language === "ar" ? "أسعار وباقات ثابتة وشفافة" : "Transparent Fixed Quotes",
      desc:
        language === "ar"
          ? "تقدير مالي مكتوب ومفصل قبل سفرك. لا رسوم مخفية أو تكاليف غير معلنة عند الوصول."
          : "Written cost estimates before you fly. No hidden surcharges on arrival.",
    },
    {
      icon: HeartHandshake,
      title: language === "ar" ? "منسق رعاية طبي خاص" : "One Dedicated Coordinator",
      desc:
        language === "ar"
          ? "نقطة اتصال شخصية واحدة ترافقك وتتواصل معك عبر مختلف المناطق الزمنية."
          : "A single point of contact across time zones for your whole journey.",
    },
    {
      icon: Plane,
      title: language === "ar" ? "إجراءات التأشيرة والسفر" : "Visa & Travel Handled",
      desc:
        language === "ar"
          ? "تسهيل خطابات التأشيرة العلاجية، وحجوزات الطيران، والإقامة الفندقية والمواصلات."
          : "Medical visa letters, flights, stay and local transfers arranged for you.",
    },
  ];

  return (
    <section id="costs" className="py-20 sm:py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200/70 text-[#0D9488] text-xs font-bold uppercase tracking-wider mb-3">
            {t.cost.eyebrow}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {t.cost.heading}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-500 leading-relaxed max-w-2xl">
            {t.cost.subheading}
          </p>
        </div>

        {/* Row 1: 4 Feature Cards in a Single Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10 sm:mb-12">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 border border-slate-100 shadow-md shadow-slate-200/40 hover:shadow-xl hover:border-teal-400 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Icon Container */}
                  <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center mb-5 border border-teal-100">
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Row 2: Full Width Treatment Cost Comparison Table */}
        <div className="w-full">
          <div className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-xl shadow-slate-200/60">
            {/* Header Strip */}
            <div className="bg-gradient-to-r from-[#031126] via-[#06203D] to-[#0A2E50] text-white px-4 sm:px-8 py-4 sm:py-5 font-bold text-sm sm:text-base tracking-tight flex items-center justify-between">
              <span>{t.cost.compareTitle}</span>
              <span className="text-xs text-[#2ECDC5] font-semibold hidden sm:inline-flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
                <Sparkles className="w-3.5 h-3.5" />
                Verified Hospital Network Estimates
              </span>
            </div>

            {/* Scrollable Container for Mobile Viewports */}
            <div className="overflow-x-auto scrollbar-thin">
              <div className="min-w-[560px] sm:min-w-0">
                {/* Sub-Header Column Labels */}
                <div className="bg-teal-50/80 px-4 sm:px-8 py-3.5 text-[11px] font-extrabold uppercase tracking-wider text-[#0D9488] grid grid-cols-12 gap-2 border-b border-teal-100">
                  <div className="col-span-4">TREATMENT</div>
                  <div className="col-span-1 text-center">UK</div>
                  <div className="col-span-2 text-center">CANADA</div>
                  <div className="col-span-2 text-center">AUSTRALIA</div>
                  <div className="col-span-2 text-center text-teal-900 font-black">INDIA</div>
                  <div className="col-span-1 text-center">SAVINGS</div>
                </div>

                {/* Data Rows */}
                <div className="divide-y divide-slate-100">
                  {comparisonData.map((row, index) => (
                    <div
                      key={index}
                      onClick={() => openIntake(row.treatment)}
                      className="px-4 sm:px-8 py-4 sm:py-4.5 text-xs sm:text-sm grid grid-cols-12 gap-2 items-center hover:bg-teal-50/50 transition-colors cursor-pointer group"
                    >
                      {/* Treatment Name */}
                      <div className="col-span-4 font-bold text-slate-900 group-hover:text-teal-700 transition-colors leading-snug">
                        {language === "ar" ? row.treatmentAr : row.treatment}
                      </div>

                      {/* UK */}
                      <div className="col-span-1 text-center text-slate-600 font-medium">
                        {row.uk}
                      </div>

                      {/* Canada */}
                      <div className="col-span-2 text-center text-slate-600 font-medium">
                        {row.canada}
                      </div>

                      {/* Australia */}
                      <div className="col-span-2 text-center text-slate-600 font-medium">
                        {row.australia}
                      </div>

                      {/* India (Highlighted) */}
                      <div className="col-span-2 text-center font-black text-teal-700 text-sm sm:text-base">
                        {row.india}
                      </div>

                      {/* Savings */}
                      <div className="col-span-1 text-center">
                        <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-bold text-xs border border-emerald-200">
                          {row.savings}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Table Footer Note */}
            <div className="px-4 sm:px-8 py-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>Includes surgeon fees, hospital admission, standard implants, nursing & transfers.</span>
              </div>
              <button
                onClick={() => openIntake()}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 hover:text-teal-900 transition-colors cursor-pointer"
              >
                <span>Request Custom Hospital Quotation</span>
                <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
