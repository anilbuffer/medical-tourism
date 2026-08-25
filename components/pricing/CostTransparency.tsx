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
      treatment: "Dental Implants (per tooth)",
      treatmentAr: "زراعة الأسنان (لكل سن)",
      uk: "$2,100",
      canada: "$2,400",
      australia: "$2,700",
      india: "$450",
      savings: "79%",
    },
    {
      treatment: "Rhinoplasty (Cosmetic)",
      treatmentAr: "تجميل الأنف (الترميمي)",
      uk: "$7,800",
      canada: "$8,500",
      australia: "$9,200",
      india: "$2,300",
      savings: "72%",
    },
    {
      treatment: "Cataract Surgery (per eye)",
      treatmentAr: "جراحة المياه البيضاء (لكل عين)",
      uk: "$3,400",
      canada: "$3,100",
      australia: "$3,600",
      india: "$900",
      savings: "73%",
    },
    {
      treatment: "Hip Replacement",
      treatmentAr: "استبدال مفصل الورك",
      uk: "$18,500",
      canada: "$21,000",
      australia: "$24,000",
      india: "$5,200",
      savings: "75%",
    },
    {
      treatment: "IVF Cycle",
      treatmentAr: "دورة علاج أطفال الأنابيب",
      uk: "$9,200",
      canada: "$11,000",
      australia: "$10,400",
      india: "$3,900",
      savings: "62%",
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
          <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#2ECDC5] mb-2">
            {t.cost.eyebrow}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#3851A2] tracking-tight leading-tight">
            {t.cost.heading}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-500 leading-relaxed max-w-2xl">
            {t.cost.subheading}
          </p>
        </div>

        {/* 2-Column Grid: 4 Feature Cards (Left) + Comparison Table (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: 4 Feature Cards (2x2 Grid) */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {features.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-3xl p-6 border border-slate-100 shadow-md shadow-slate-200/40 hover:shadow-xl hover:border-teal-300 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Peach/Orange Rounded Icon Container */}
                    <div className="w-11 h-11 rounded-2xl bg-[#2ECDC5]/15 text-[#2ECDC5] flex items-center justify-center mb-5">
                      <Icon className="w-5 h-5" />
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Treatment Cost Comparison Table (USD) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-xl shadow-slate-200/60">
              {/* Dark Header Strip */}
              <div className="bg-gradient-to-r from-[#283593] via-[#3F4EB4] to-[#283593] text-white px-6 py-4 font-bold text-sm sm:text-base tracking-tight">
                {t.cost.compareTitle}
              </div>

              {/* Sub-Header Column Labels */}
              <div className="bg-[#3F4EB4]/10 px-6 py-3 text-[11px] font-extrabold uppercase tracking-wider text-[#283593] grid grid-cols-12 gap-2 border-b border-slate-200">
                <div className="col-span-4">TREATMENT</div>
                <div className="col-span-1 text-center">UK</div>
                <div className="col-span-2 text-center">CANADA</div>
                <div className="col-span-2 text-center">AUSTRALIA</div>
                <div className="col-span-2 text-center text-[#283593] font-black">INDIA</div>
                <div className="col-span-1 text-center">SAVINGS</div>
              </div>

              {/* Data Rows */}
              <div className="divide-y divide-slate-100">
                {comparisonData.map((row, index) => (
                  <div
                    key={index}
                    onClick={() => openIntake(row.treatment)}
                    className="px-6 py-4 text-xs grid grid-cols-12 gap-2 items-center hover:bg-[#3F4EB4]/5 transition-colors cursor-pointer group"
                  >
                    {/* Treatment Name */}
                    <div className="col-span-4 font-bold text-slate-900 group-hover:text-[#3F4EB4] transition-colors leading-snug">
                      {language === "ar" ? row.treatmentAr : row.treatment}
                    </div>

                    {/* UK */}
                    <div className="col-span-1 text-center text-slate-500 font-medium">
                      {row.uk}
                    </div>

                    {/* Canada */}
                    <div className="col-span-2 text-center text-slate-500 font-medium">
                      {row.canada}
                    </div>

                    {/* Australia */}
                    <div className="col-span-2 text-center text-slate-500 font-medium">
                      {row.australia}
                    </div>

                    {/* India (Highlighted) */}
                    <div className="col-span-2 text-center font-black text-[#283593] text-sm">
                      {row.india}
                    </div>

                    {/* Savings Badge */}
                    <div className="col-span-1 flex justify-center">
                      <span className="px-2 py-0.5 rounded-full bg-[#2ECDC5]/15 text-[#1DA89F] font-bold text-[11px]">
                        {row.savings}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Table Footer Note */}
              <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span>{t.cost.disclaimer}</span>
                <button
                  onClick={() => openIntake()}
                  className="font-bold text-[#3F4EB4] hover:text-[#283593] flex items-center gap-1 shrink-0 ml-2"
                >
                  <span>{language === "ar" ? "طلب عرض سعر" : "Get Custom Quote"}</span>
                  <ArrowRight className="w-3 h-3 rtl:rotate-180" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
