"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useCare } from "@/context/CareContext";
import { DOCTORS, Doctor } from "@/data/mockData";
import {
  Star,
  MapPin,
  Building,
  Video,
  Globe,
  Award,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Calendar,
} from "lucide-react";

export const DoctorsSection = () => {
  const { t, language, openDoctorModal, openIntake } = useCare();
  const [activeSpecialty, setActiveSpecialty] = useState("All");

  const specialtiesList = [
    "All",
    "Dental Implants",
    "Cosmetic & Aesthetic",
    "Ophthalmology / Eye Care",
    "Orthopedic Procedures",
    "Fertility / IVF",
  ];

  const filteredDoctors = activeSpecialty === "All"
    ? DOCTORS
    : DOCTORS.filter((d) => d.specialty === activeSpecialty);

  return (
    <section id="doctors" className="py-24 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-orange-500 mb-2">
            {t.doctors.eyebrow}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0D3B3F] tracking-tight leading-tight">
            {t.doctors.heading}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-500 leading-relaxed max-w-2xl mx-auto">
            {t.doctors.subheading}
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {specialtiesList.map((spec) => (
            <button
              key={spec}
              onClick={() => setActiveSpecialty(spec)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeSpecialty === spec
                  ? "bg-[#0D3B3F] text-white shadow-md shadow-teal-950/20"
                  : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                }`}
            >
              {spec}
            </button>
          ))}
        </div>

        {/* Doctor Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-3 gap-5">
          {filteredDoctors.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-card hover:shadow-luxury-hover transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5"
            >
              {/* Doctor Avatar Header */}
              <div className="relative h-60 w-full overflow-hidden bg-slate-100">
                <Image
                  src={doc.avatar}
                  alt={doc.name}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>

                {/* Rating Badge */}
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold flex items-center gap-1">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span>{doc.rating}</span>
                </div>

                {/* Experience Badge */}
                <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-teal-950/80 backdrop-blur-md border border-teal-500/30 text-teal-300 text-[11px] font-bold">
                  {doc.experienceYears}+ {t.doctors.experience}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div>
                    <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-teal-700 transition-colors">
                      {language === "ar" ? doc.nameAr : doc.name}
                    </h3>
                    <p className="text-xs font-semibold text-teal-700">
                      {language === "ar" ? doc.titleAr : doc.title}
                    </p>
                  </div>

                  {/* Hospital & City */}
                  <div className="space-y-1 text-xs text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{language === "ar" ? doc.hospitalAr : doc.hospital}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{language === "ar" ? doc.cityAr : doc.city}</span>
                    </div>
                  </div>

                  {/* Languages */}
                  <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{doc.languages.join(" · ")}</span>
                  </div>
                </div>

                {/* Video Availability Strip */}
                <div className="pt-2 border-t border-slate-100">
                  <div className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg flex items-center gap-1.5 mb-3">
                    <Video className="w-3 h-3 text-emerald-600 shrink-0" />
                    <span>{t.doctors.videoAvailable}</span>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => openDoctorModal(doc)}
                      className="py-2.5 px-3 rounded-xl border border-slate-200 hover:border-slate-300 text-slate-700 hover:text-slate-900 text-xs font-bold transition-all text-center"
                    >
                      {t.doctors.viewProfile}
                    </button>
                    <button
                      onClick={() => openDoctorModal(doc)}
                      className="py-2.5 px-3 rounded-xl bg-[#0D3B3F] hover:bg-[#072428] text-white text-xs font-bold transition-all text-center shadow-md shadow-teal-950/20"
                    >
                      {t.doctors.requestConsult}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
