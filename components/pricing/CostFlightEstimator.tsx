"use client";

import React, { useState } from "react";
import { useCare, COUNTRY_CURRENCY_MAP } from "@/context/CareContext";
import { TREATMENT_COSTS } from "@/data/mockData";
import { Plane, Clock, Wallet, CheckCircle2, ArrowRight, Activity, MapPin } from "lucide-react";
import { CountryCode } from "@/data/translations";

const COUNTRY_LOGISTICS: Record<CountryCode | "US", { flight: string; visa: string }> = {
  GB: { flight: "8h 30m (Direct from LHR)", visa: "e-Visa (24-48h)" },
  CA: { flight: "14h 20m (1 Stop via DXB)", visa: "e-Visa (48h)" },
  AU: { flight: "12h 15m (1 Stop via SIN)", visa: "e-Visa (24-48h)" },
  AE: { flight: "3h 20m (Direct from DXB)", visa: "Visa on Arrival / e-Visa" },
  SA: { flight: "4h 15m (Direct from RUH)", visa: "e-Visa (24h)" },
  QA: { flight: "3h 45m (Direct from DOH)", visa: "e-Visa (24h)" },
  OM: { flight: "2h 50m (Direct from MCT)", visa: "e-Visa (24h)" },
  US: { flight: "15h 30m (Direct from JFK)", visa: "e-Visa (48-72h)" },
};

export const CostFlightEstimator = () => {
  const { language, t, setCountry, currency, formatPrice } = useCare();
  const [selectedTreatmentId, setSelectedTreatmentId] = useState(TREATMENT_COSTS[0].id);
  const [selectedCountry, setSelectedCountry] = useState<CountryCode | "US">("GB");
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const selectedTreatment = TREATMENT_COSTS.find((t) => t.id === selectedTreatmentId) || TREATMENT_COSTS[0];
  const logistics = COUNTRY_LOGISTICS[selectedCountry];

  // Derive home cost based on selected country
  let homeCostUsd = selectedTreatment.usCostUsd;
  if (selectedCountry === "GB") homeCostUsd = selectedTreatment.ukCostUsd;
  else if (selectedCountry === "AE" || selectedCountry === "SA" || selectedCountry === "QA" || selectedCountry === "OM") {
    homeCostUsd = selectedTreatment.uaeCostUsd;
  }

  // Calculate savings
  const avgIndiaCost = (selectedTreatment.indiaCostUsd.min + selectedTreatment.indiaCostUsd.max) / 2;
  const avgHomeCost = (homeCostUsd.min + homeCostUsd.max) / 2;
  const savingsPercent = Math.round(((avgHomeCost - avgIndiaCost) / avgHomeCost) * 100);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 5000);
      setEmail("");
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-teal-800 text-xs font-bold uppercase tracking-wider mb-4">
            <Activity className="w-4 h-4 text-teal-600" />
            <span>{t.estimatorWidget.eyebrow}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-6 font-sans">
            {t.estimatorWidget.heading}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Form & Selection (Steps 1 & 3) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8">
              <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-teal-600 text-white flex items-center justify-center text-xs">1</span>
                {t.estimatorWidget.step1}
              </h3>
              
              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    {t.estimatorWidget.treatmentLabel}
                  </label>
                  <select
                    value={selectedTreatmentId}
                    onChange={(e) => setSelectedTreatmentId(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3.5 text-sm text-slate-900 font-semibold focus:ring-2 focus:ring-[#2ECDC5] outline-none shadow-xs cursor-pointer"
                  >
                    {TREATMENT_COSTS.map((tItem) => (
                      <option key={tItem.id} value={tItem.id}>
                        {language === "ar" ? tItem.nameAr : tItem.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    {t.estimatorWidget.countryLabel}
                  </label>
                  <select
                    value={selectedCountry}
                    onChange={(e) => {
                      const code = e.target.value as CountryCode | "US";
                      setSelectedCountry(code);
                      if (code !== "US" && COUNTRY_CURRENCY_MAP[code]) {
                        setCountry(code);
                      }
                    }}
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3.5 text-sm text-slate-900 font-semibold focus:ring-2 focus:ring-[#2ECDC5] outline-none shadow-xs cursor-pointer"
                  >
                    <option value="GB">United Kingdom</option>
                    <option value="CA">Canada</option>
                    <option value="AU">Australia</option>
                    <option value="AE">United Arab Emirates</option>
                    <option value="SA">Saudi Arabia</option>
                    <option value="QA">Qatar</option>
                    <option value="OM">Oman</option>
                    <option value="US">United States</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-[#0A2E50] border border-[#3F4EB4]/30 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl shadow-[#0A2E50]/20">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#2ECDC5]/10 rounded-full blur-2xl pointer-events-none"></div>
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2 relative z-10">
                <span className="w-6 h-6 rounded-full bg-[#2ECDC5] text-slate-900 flex items-center justify-center text-xs">3</span>
                {t.estimatorWidget.step3}
              </h3>
              
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-6 text-center animate-in fade-in zoom-in duration-300">
                  <div className="w-12 h-12 rounded-full bg-[#2ECDC5]/20 flex items-center justify-center mb-3">
                    <CheckCircle2 className="w-6 h-6 text-[#2ECDC5]" />
                  </div>
                  <p className="font-bold text-teal-100">{t.estimatorWidget.successMessage}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                  <div>
                    <label className="block text-xs font-bold text-teal-100 uppercase tracking-wider mb-2">
                      {t.estimatorWidget.emailLabel}
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t.estimatorWidget.emailPlaceholder}
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-400 focus:ring-2 focus:ring-[#2ECDC5] outline-none transition-all"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl text-sm font-extrabold text-slate-950 bg-[#2ECDC5] hover:bg-[#5EEAD4] shadow-lg shadow-[#2ECDC5]/20 transition-all cursor-pointer"
                  >
                    <span>{t.estimatorWidget.submitBtn}</span>
                    <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Display Data (Step 2) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200 shadow-xl shadow-slate-200/50 h-full">
              <h3 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs">2</span>
                {t.estimatorWidget.step2}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Cost in India */}
                <div className="bg-teal-50/50 rounded-2xl p-5 border border-teal-100/50">
                  <div className="flex items-center gap-2 text-teal-700 text-xs font-bold uppercase tracking-wider mb-2">
                    <MapPin className="w-4 h-4" />
                    <span>{t.estimatorWidget.costInIndia}</span>
                  </div>
                  <div className="text-3xl font-black text-slate-900 mb-1">
                    {formatPrice(selectedTreatment.indiaCostUsd.min)} - {formatPrice(selectedTreatment.indiaCostUsd.max)}
                  </div>
                  <p className="text-xs text-slate-500 font-medium">{currency} equivalent</p>
                </div>

                {/* Cost at Home */}
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                  <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">
                    <MapPin className="w-4 h-4" />
                    <span>{t.estimatorWidget.costAtHome}</span>
                  </div>
                  <div className="text-3xl font-black text-slate-400 mb-1 line-through decoration-slate-300">
                    {formatPrice(homeCostUsd.min)} - {formatPrice(homeCostUsd.max)}
                  </div>
                  <p className="text-xs text-slate-400 font-medium">Average local cost</p>
                </div>
              </div>

              {/* Savings Highlight */}
              <div className="mb-8 flex items-center gap-4 bg-gradient-to-r from-teal-500 to-[#0A2E50] p-4 rounded-2xl text-white shadow-md">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                  <Wallet className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-sm font-bold text-teal-100 uppercase tracking-wider mb-0.5">{t.estimatorWidget.savings}</div>
                  <div className="text-2xl font-black">Up to {savingsPercent}% less</div>
                </div>
              </div>

              {/* Travel Logistics */}
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50/50">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                    <Plane className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{t.estimatorWidget.flightTime}</h4>
                    <p className="text-sm text-slate-600 mt-0.5">{logistics.flight}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50/50">
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{t.estimatorWidget.visaDuration}</h4>
                    <p className="text-sm text-slate-600 mt-0.5">{logistics.visa}</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
