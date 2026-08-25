"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useCare } from "@/context/CareContext";
import { HOSPITALS, Hospital } from "@/data/mockData";
import {
  Building2,
  MapPin,
  ShieldCheck,
  Bed,
  Users,
  Plane,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Coffee,
} from "lucide-react";

export const HospitalsSection = () => {
  const { t, language, openIntake, openChat } = useCare();
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);

  return (
    <section id="hospitals" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100/80 text-teal-800 text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span>{t.hospitals.eyebrow}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {t.hospitals.heading}
            </h2>
            <p className="mt-3 text-base text-slate-600">
              {t.hospitals.subheading}
            </p>
          </div>

          <button
            onClick={() => openIntake("Hospital Selection")}
            className="inline-flex items-center gap-2 text-xs font-bold text-teal-700 hover:text-teal-800 tracking-wider uppercase group"
          >
            <span>{t.hospitals.exploreNetwork}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 3 Premium Hospital Showcase Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {HOSPITALS.slice(0, 3).map((hosp) => (
            <div
              key={hosp.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 hover:border-teal-400 shadow-card hover:shadow-luxury-hover transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5"
            >
              {/* Image Banner */}
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  src={hosp.image}
                  alt={hosp.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>

                {/* Accreditation Badges */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-1.5">
                  {hosp.accreditations.slice(0, 2).map((acc, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-full bg-slate-900/85 backdrop-blur-md border border-white/20 text-teal-300 text-[10px] font-bold flex items-center gap-1"
                    >
                      <ShieldCheck className="w-3 h-3 text-teal-400" />
                      <span>{acc}</span>
                    </span>
                  ))}
                </div>

                {/* Location City */}
                <div className="absolute bottom-3 left-4 flex items-center gap-1 text-white text-xs font-semibold">
                  <MapPin className="w-3.5 h-3.5 text-teal-400" />
                  <span>{language === "ar" ? hosp.cityAr : hosp.city}, India</span>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-teal-700 transition-colors">
                    {language === "ar" ? hosp.nameAr : hosp.name}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                    {language === "ar" ? hosp.descriptionAr : hosp.description}
                  </p>

                  {/* Specialties tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {hosp.specialties.map((spec, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg bg-teal-50 text-teal-800 text-[11px] font-semibold"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Metrics & International Amenities */}
                <div className="pt-4 border-t border-slate-100 space-y-3">
                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <Bed className="w-4 h-4 text-slate-400" />
                      <span>{hosp.bedsCount} {t.hospitals.beds}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-slate-400" />
                      <span>{hosp.surgeonsCount}+ {t.hospitals.surgeons}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-xl">
                    <div className="flex items-center gap-1.5">
                      <Coffee className="w-3.5 h-3.5 text-teal-600" />
                      <span>Dedicated VIP Int'l Lounge</span>
                    </div>
                    <div className="flex items-center gap-1 text-slate-600 font-medium">
                      <Plane className="w-3 h-3 text-slate-400" />
                      <span>{hosp.airportDistance}</span>
                    </div>
                  </div>

                  {/* CTA */}
                  <button
                    onClick={() => openIntake(hosp.name)}
                    className="w-full py-3 rounded-xl bg-slate-900 hover:bg-teal-700 text-white text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-sm"
                  >
                    <span>Request Care at {hosp.name.split(" ")[0]}</span>
                    <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
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
