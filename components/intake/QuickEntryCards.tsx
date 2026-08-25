"use client";

import React from "react";
import { useCare } from "@/context/CareContext";
import { Stethoscope, UserCheck, FileText, Plane, ArrowRight } from "lucide-react";

export const QuickEntryCards = () => {
  const { t, openIntake, openChat } = useCare();

  const cards = [
    {
      icon: Stethoscope,
      title: t.quickEntry.card1Title,
      description: t.quickEntry.card1Desc,
      cta: t.quickEntry.card1Cta,
      badge: "50+ Procedures",
      accent: "from-teal-500 to-teal-700",
      borderHover: "group-hover:border-teal-500/50",
      action: () => {
        const el = document.getElementById("specialties");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      icon: UserCheck,
      title: t.quickEntry.card2Title,
      description: t.quickEntry.card2Desc,
      cta: t.quickEntry.card2Cta,
      badge: "120+ Consultants",
      accent: "from-blue-600 to-indigo-700",
      borderHover: "group-hover:border-blue-500/50",
      action: () => {
        const el = document.getElementById("doctors");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      icon: FileText,
      title: t.quickEntry.card3Title,
      description: t.quickEntry.card3Desc,
      cta: t.quickEntry.card3Cta,
      badge: "24h Response",
      accent: "from-amber-500 to-amber-700",
      borderHover: "group-hover:border-amber-500/50",
      action: () => openIntake("Medical Opinion"),
    },
    {
      icon: Plane,
      title: t.quickEntry.card4Title,
      description: t.quickEntry.card4Desc,
      cta: t.quickEntry.card4Cta,
      badge: "End-to-End VIP",
      accent: "from-emerald-500 to-teal-700",
      borderHover: "group-hover:border-emerald-500/50",
      action: () => openChat("I'd like to plan my medical trip to India."),
    },
  ];

  return (
    <section className="py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold uppercase tracking-wider mb-3">
            Quick Patient Entry
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t.quickEntry.heading}
          </h2>
          <p className="mt-3 text-base text-slate-600">
            {t.quickEntry.subheading}
          </p>
        </div>

        {/* 4 Premium Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                onClick={card.action}
                className={`group relative bg-white rounded-2xl p-6 shadow-card hover:shadow-luxury-hover border border-slate-200/80 ${card.borderHover} transition-all duration-300 cursor-pointer flex flex-col justify-between hover:-translate-y-1.5`}
              >
                <div>
                  {/* Top Bar with Icon & Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.accent} flex items-center justify-center text-white shadow-md shadow-slate-900/10 group-hover:scale-110 transition-transform`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 group-hover:bg-teal-50 group-hover:text-teal-700 transition-colors">
                      {card.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors mb-2">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {card.description}
                  </p>
                </div>

                {/* Bottom CTA Link */}
                <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-teal-700 group-hover:text-teal-800">
                  <span>{card.cta}</span>
                  <div className="w-7 h-7 rounded-full bg-teal-50 group-hover:bg-teal-600 group-hover:text-white flex items-center justify-center transition-colors">
                    <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
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
