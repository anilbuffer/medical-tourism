"use client";

import React, { useState } from "react";
import { useCare } from "@/context/CareContext";
import { TREATMENT_COSTS, TreatmentCost } from "@/data/mockData";
import { CurrencyPicker } from "@/components/ui/CurrencyPicker";
import {
  Calculator,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Calendar,
  Sparkles,
  ArrowRight,
  TrendingDown,
  Info,
} from "lucide-react";

export const CostTransparency = () => {
  const { t, language, formatPrice, formatPriceRange, openIntake } = useCare();
  const [selectedTreatment, setSelectedTreatment] = useState<TreatmentCost>(TREATMENT_COSTS[0]);

  return (
    <section id="costs" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100/80 text-teal-800 text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span>{t.cost.eyebrow}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {t.cost.heading}
            </h2>
            <p className="mt-3 text-base text-slate-600">
              {t.cost.subheading}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-500">Currency:</span>
            <CurrencyPicker />
          </div>
        </div>

        {/* Treatment Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {TREATMENT_COSTS.slice(0, 3).map((item) => {
            const isSelected = selectedTreatment.id === item.id;
            return (
              <div
                key={item.id}
                onClick={() => setSelectedTreatment(item)}
                className={`rounded-3xl p-6 transition-all duration-300 cursor-pointer border flex flex-col justify-between ${
                  isSelected
                    ? "bg-white border-teal-500 shadow-xl shadow-teal-900/10 ring-2 ring-teal-500/20"
                    : "bg-white border-slate-200/80 hover:border-slate-300 shadow-sm"
                }`}
              >
                <div>
                  {/* Specialty Tag */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full">
                      {language === "ar" ? item.specialtyAr : item.specialty}
                    </span>
                    {item.popular && (
                      <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                        Most Requested
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-extrabold text-slate-900 mb-2">
                    {language === "ar" ? item.nameAr : item.name}
                  </h3>

                  {/* Price Range */}
                  <div className="py-3 px-4 rounded-2xl bg-slate-50 border border-slate-100 my-3">
                    <div className="text-[11px] font-semibold text-slate-500">
                      {t.cost.estimatedCost}
                    </div>
                    <div className="text-xl font-extrabold text-slate-900 tracking-tight text-teal-800 font-sans mt-0.5">
                      {formatPriceRange(item.indiaCostUsd.min, item.indiaCostUsd.max)}
                    </div>
                  </div>

                  {/* Typical Stay & Recovery */}
                  <div className="space-y-1.5 text-xs text-slate-600">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">{t.cost.typicalStay}</span>
                      <span className="font-bold text-slate-800">{item.typicalStayDays}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">{t.cost.recoveryTime}</span>
                      <span className="font-bold text-slate-800">{item.recoveryWeeks}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-teal-700">
                  <span>View Package Inclusions</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Deep Dive & Global Comparison for Selected Treatment */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-card">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Inclusions list */}
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-700">
                <CheckCircle2 className="w-4 h-4 text-teal-600" />
                <span>Indicative Package Inclusions · {selectedTreatment.name}</span>
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900">
                What's Covered in Your Coordinated Care Package
              </h3>
              <ul className="space-y-2.5">
                {(language === "ar"
                  ? selectedTreatment.inclusionsAr
                  : selectedTreatment.inclusions
                ).map((inc, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Comparison Table */}
            <div className="lg:col-span-6 bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase font-bold text-teal-400">Global Cost Comparison</div>
                  <div className="text-sm font-extrabold text-white mt-0.5">
                    {selectedTreatment.name}
                  </div>
                </div>
                <div className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full text-xs font-bold flex items-center gap-1">
                  <TrendingDown className="w-3.5 h-3.5" />
                  <span>Up to 80% Savings</span>
                </div>
              </div>

              {/* Comparison rows */}
              <div className="space-y-2.5 text-xs">
                {/* India Row */}
                <div className="bg-teal-950/80 border border-teal-500/40 rounded-xl p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-teal-200">
                    <span>🇮🇳 India (Vedara Partner Hospital)</span>
                  </div>
                  <div className="text-sm font-black text-emerald-400">
                    {formatPriceRange(selectedTreatment.indiaCostUsd.min, selectedTreatment.indiaCostUsd.max)}
                  </div>
                </div>

                {/* UAE Row */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center justify-between text-slate-300">
                  <span>🇦🇪 UAE (Private Hospital)</span>
                  <span className="font-semibold">{formatPriceRange(selectedTreatment.uaeCostUsd.min, selectedTreatment.uaeCostUsd.max)}</span>
                </div>

                {/* UK Row */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center justify-between text-slate-300">
                  <span>🇬🇧 United Kingdom (Private)</span>
                  <span className="font-semibold">{formatPriceRange(selectedTreatment.ukCostUsd.min, selectedTreatment.ukCostUsd.max)}</span>
                </div>

                {/* US Row */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center justify-between text-slate-300">
                  <span>🇺🇸 United States (Self-Pay)</span>
                  <span className="font-semibold">{formatPriceRange(selectedTreatment.usCostUsd.min, selectedTreatment.usCostUsd.max)}</span>
                </div>
              </div>

              <button
                onClick={() => openIntake(selectedTreatment.name)}
                className="w-full py-3 bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-300 hover:to-emerald-300 text-slate-950 font-bold text-xs rounded-xl shadow-lg transition-all"
              >
                Request Exact Quotation for {selectedTreatment.name}
              </button>
            </div>
          </div>

          {/* Legal Disclaimer Note */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex items-start gap-2 text-xs text-slate-400">
            <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            <p>{t.cost.disclaimer}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
