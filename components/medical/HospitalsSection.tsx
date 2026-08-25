"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useCare } from "@/context/CareContext";
import { HOSPITALS, Hospital } from "@/data/mockData";
import { MapPin, Sparkles, ChevronRight, Star } from "lucide-react";

export const HospitalsSection = () => {
  const { t, language, openIntake, openChat } = useCare();
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);

  // Focus on the 4 premier Chandigarh City hospitals
  const chandigarhHospitals = HOSPITALS.slice(0, 4);

  return (
    <section id="hospitals" className="py-20 sm:py-24 bg-[#F8FAFC] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-orange-500 mb-2">
              {t.hospitals.eyebrow}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0D3B3F] tracking-tight leading-tight">
              {t.hospitals.heading}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-500 leading-relaxed">
              {t.hospitals.subheading}
            </p>
          </div>

          <button
            onClick={() => openIntake("Chandigarh Hospital Selection")}
            className="inline-flex items-center gap-2 text-xs font-bold text-teal-700 hover:text-teal-800 tracking-wider uppercase group shrink-0"
          >
            <span>{t.hospitals.exploreNetwork}</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 4 Hospital Cards Grid (Matching Provided Screenshot) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {chandigarhHospitals.map((hosp) => (
            <div
              key={hosp.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-md shadow-slate-200/50 hover:shadow-2xl hover:border-teal-300 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
              onClick={() => openIntake(`Hospital: ${hosp.name}`)}
            >
              {/* Top Hospital Photo */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                <Image
                  src={hosp.image}
                  alt={hosp.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Body Content */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  {/* Hospital Title */}
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors leading-snug">
                    {language === "ar" ? hosp.nameAr : hosp.name}
                  </h3>

                  {/* Location Pin */}
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium mt-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{language === "ar" ? hosp.cityAr : hosp.city}</span>
                  </div>

                  {/* Rating Stars & Reviews */}
                  <div className="flex items-center gap-1.5 mt-2.5">
                    <div className="flex text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-slate-800">
                      {hosp.rating || 4.8}
                    </span>
                    <span className="text-xs text-slate-400">
                      ({hosp.reviewsCount ? hosp.reviewsCount.toLocaleString() : "850"})
                    </span>
                  </div>

                  {/* Specialty Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-3.5">
                    {hosp.specialties.slice(0, 3).map((spec, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-full bg-teal-50/80 text-teal-700 text-[11px] font-semibold border border-teal-100/60"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Buttons: View Profile & Compare */}
                <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openIntake(`Hospital Profile: ${hosp.name}`);
                    }}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-[#0D3B3F] hover:bg-[#072428] text-white font-bold text-xs text-center transition-colors shadow-sm"
                  >
                    View Profile
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openChat(`Hello, I would like to compare ${hosp.name} in Chandigarh with other options.`);
                    }}
                    className="py-2.5 px-3.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs text-center transition-colors"
                  >
                    Compare
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
