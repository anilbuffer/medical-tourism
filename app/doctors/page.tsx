"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCare } from "@/context/CareContext";
import { DOCTORS, Doctor } from "@/data/mockData";
import {
  Star,
  Building,
  MapPin,
  Globe,
  Video,
  Award,
  Search,
  Filter,
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  Calendar,
} from "lucide-react";

export default function DoctorsPage() {
  const { t, language, openDoctorModal, openIntake } = useCare();
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");
  const [selectedCity, setSelectedCity] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const specialties = ["All", "Cardiac Sciences", "Cancer Care (Oncology)", "Orthopedics & Joint Replacement", "Transplant Medicine"];
  const cities = ["All", "New Delhi", "Mumbai", "Gurugram / Delhi NCR", "Chennai", "Bengaluru"];

  const filteredDoctors = DOCTORS.filter((doc) => {
    const matchesSpecialty = selectedSpecialty === "All" || doc.specialty === selectedSpecialty;
    const matchesCity = selectedCity === "All" || doc.city.includes(selectedCity);
    const matchesSearch =
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.hospital.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSpecialty && matchesCity && matchesSearch;
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
              <span>Verified Senior Clinicians</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Indian Specialist Consultants & Surgeons
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Connect with globally acclaimed medical directors, chief surgeons, and department heads across India's premier quaternary institutes.
            </p>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/80 shadow-sm mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search doctor, hospital, keyword..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500">Specialty:</span>
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-teal-500"
              >
                {specialties.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500">City:</span>
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
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDoctors.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 hover:border-teal-400 shadow-card hover:shadow-luxury-hover transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Doctor Avatar Header */}
                <div className="relative h-64 w-full overflow-hidden bg-slate-100">
                  <Image
                    src={doc.avatar}
                    alt={doc.name}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>

                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-slate-900/85 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{doc.rating}</span>
                  </div>

                  <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-teal-950/85 backdrop-blur-md border border-teal-500/30 text-teal-300 text-[11px] font-bold">
                    {doc.experienceYears}+ Years Experience
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-teal-700 transition-colors">
                      {language === "ar" ? doc.nameAr : doc.name}
                    </h3>
                    <p className="text-xs font-semibold text-teal-700">
                      {language === "ar" ? doc.titleAr : doc.title}
                    </p>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{language === "ar" ? doc.hospitalAr : doc.hospital}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{language === "ar" ? doc.cityAr : doc.city}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {language === "ar" ? doc.bioAr : doc.bio}
                  </p>

                  <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{doc.languages.join(" · ")}</span>
                  </div>
                </div>
              </div>

              {/* Action Strip */}
              <div className="p-6 pt-0 space-y-2">
                <div className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg flex items-center gap-1.5 mb-2">
                  <Video className="w-3 h-3 text-emerald-600" />
                  <span>Next Video Slot: {doc.nextAvailable}</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => openDoctorModal(doc)}
                    className="py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 text-xs font-bold text-slate-700 text-center"
                  >
                    View Bio & Slots
                  </button>
                  <button
                    onClick={() => openDoctorModal(doc)}
                    className="py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold text-center shadow-md shadow-teal-600/20"
                  >
                    Book Video Call
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
