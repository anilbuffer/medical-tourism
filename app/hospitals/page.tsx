"use client";

import React, { useState } from "react";
import Link from "next/link";
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
  ArrowLeft,
  ArrowRight,
  Search,
  Coffee,
} from "lucide-react";

export default function HospitalsPage() {
  const { t, language, openIntake } = useCare();
  const [selectedCity, setSelectedCity] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const cities = ["All", "New Delhi", "Mumbai", "Bengaluru", "Chennai"];

  const filteredHospitals = HOSPITALS.filter((hosp) => {
    const matchesCity = selectedCity === "All" || hosp.city.includes(selectedCity);
    const matchesSearch =
      hosp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hosp.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hosp.specialties.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCity && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 hover:text-teal-800"
          >
            <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
            <span>Back to Main Overview</span>
          </Link>
        </div>

        {/* Page Header */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-[#0B1E33] text-white rounded-3xl p-8 sm:p-12 mb-10 shadow-xl border border-slate-800">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>JCI & NABH Accredited Network</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Hospital Network & Centers of Excellence
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Discover India's highest-ranked quaternary medical destinations, equipped with hybrid surgical suites, proton therapy, robotic surgery, and dedicated international patient suites.
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/80 shadow-sm mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search hospitals or specialties..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-500">Destination City:</span>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-teal-500"
            >
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Hospitals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredHospitals.map((hosp) => (
            <div
              key={hosp.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 hover:border-teal-400 shadow-card hover:shadow-luxury-hover transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={hosp.image}
                    alt={hosp.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>

                  <div className="absolute top-4 left-4 flex flex-wrap gap-1.5">
                    {hosp.accreditations.map((acc, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-full bg-slate-900/85 backdrop-blur-md border border-white/20 text-teal-300 text-[10px] font-bold flex items-center gap-1"
                      >
                        <ShieldCheck className="w-3 h-3 text-teal-400" />
                        <span>{acc}</span>
                      </span>
                    ))}
                  </div>

                  <div className="absolute bottom-3 left-4 flex items-center gap-1 text-white text-xs font-semibold">
                    <MapPin className="w-3.5 h-3.5 text-teal-400" />
                    <span>{language === "ar" ? hosp.cityAr : hosp.city}, {hosp.state}</span>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <h3 className="text-2xl font-extrabold text-slate-900 group-hover:text-teal-700 transition-colors">
                    {language === "ar" ? hosp.nameAr : hosp.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {language === "ar" ? hosp.descriptionAr : hosp.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {hosp.specialties.map((spec, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg bg-teal-50 text-teal-800 text-xs font-semibold"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 space-y-3">
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-1.5">
                    <Bed className="w-4 h-4 text-slate-400" />
                    <span>{hosp.bedsCount} Inpatient Beds</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-slate-400" />
                    <span>{hosp.surgeonsCount}+ Senior Surgeons</span>
                  </div>
                </div>

                <button
                  onClick={() => openIntake(hosp.name)}
                  className="w-full py-3.5 rounded-xl bg-slate-900 hover:bg-teal-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <span>Coordinate Admission at {hosp.name}</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
