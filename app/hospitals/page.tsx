"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCare } from "@/context/CareContext";
import { HOSPITALS } from "@/data/mockData";
import {
  Building2,
  MapPin,
  ShieldCheck,
  Bed,
  Users,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  Search,
} from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

export default function HospitalsPage() {
  const { language, openIntake } = useCare();
  const [selectedHub, setSelectedHub] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const hubs = ["All", "Fortis Hospital (Mohali)", "Max Super Speciality", "Paras Health", "Healing Hospital (Sector 34)", "Eden Critical Care"];

  const filteredHospitals = HOSPITALS.filter((hosp) => {
    const matchesHub = selectedHub === "All" || hosp.name.toLowerCase().includes(selectedHub.toLowerCase().split(" ")[0]);
    const matchesSearch =
      hosp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hosp.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hosp.specialties.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesHub && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0b5d63] hover:text-[#04272a] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
            <span>Back to Main Overview</span>
          </Link>
        </div>

        {/* Page Header */}
        <div className="bg-gradient-to-br from-[#04272a] via-[#0b5d63] to-[#073c40] text-white rounded-3xl p-8 sm:p-12 mb-10 shadow-xl border border-[#0b5d63]/40">
          <div className="max-w-3xl space-y-4">
            <Badge
              variant="outline"
              size="lg"
              className="gap-2 px-3 py-1 font-bold uppercase tracking-wider backdrop-blur-md bg-white/10 border-[#e39b2d]/40 text-[#e39b2d] font-heading"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#e39b2d]" />
              <span>Chandigarh City · Multi-Class Hospital Network</span>
            </Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-heading">
              Multi-Class Hospitals & Super-Specialty Centers in Chandigarh
            </h1>
            <p className="text-teal-100/90 text-sm sm:text-base leading-relaxed font-body">
              Explore Chandigarh City&apos;s premier JCI & NABH accredited hospitals, featuring world-class robotic surgical suites, hybrid cath labs, cancer radiotherapy, and dedicated international patient care.
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/80 shadow-sm mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 z-10" />
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Chandigarh hospitals or specialties..."
              className="pl-10 h-11 rounded-xl focus-visible:ring-[#0b5d63]"
            />
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-500 font-heading">Hospital Institute:</span>
            <select
              value={selectedHub}
              onChange={(e) => setSelectedHub(e.target.value)}
              className="px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-[#0b5d63] outline-none"
            >
              {hubs.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Hospitals Grid (Shadcn Card System) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredHospitals.map((hosp) => (
            <Card
              key={hosp.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 hover:border-[#0b5d63]/40 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
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
                      <Badge
                        key={i}
                        variant="outline"
                        size="sm"
                        className="gap-1 bg-slate-900/85 backdrop-blur-md border-white/20 text-[#e39b2d] text-[10px] font-bold font-heading"
                      >
                        <ShieldCheck className="w-3 h-3 text-[#e39b2d]" />
                        <span>{acc}</span>
                      </Badge>
                    ))}
                  </div>

                  <div className="absolute bottom-3 left-4 flex items-center gap-1 text-white text-xs font-semibold">
                    <MapPin className="w-3.5 h-3.5 text-[#e39b2d]" />
                    <span>{language === "ar" ? hosp.cityAr : hosp.city}, {hosp.state}</span>
                  </div>
                </div>

                <CardContent className="p-6 space-y-4">
                  <h3 className="text-2xl font-extrabold text-slate-900 group-hover:text-[#0b5d63] transition-colors font-heading">
                    {language === "ar" ? hosp.nameAr : hosp.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-body">
                    {language === "ar" ? hosp.descriptionAr : hosp.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {hosp.specialties.map((spec, i) => (
                      <Badge
                        key={i}
                        variant="secondary"
                        size="default"
                        className="rounded-lg text-xs font-semibold px-2.5 py-1 bg-[#0b5d63]/10 text-[#0b5d63] hover:bg-[#0b5d63]/20"
                      >
                        {spec}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </div>

              <CardFooter className="p-6 pt-0 flex flex-col space-y-3 mt-auto">
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-2xl border border-slate-100 w-full">
                  <div className="flex items-center gap-1.5">
                    <Bed className="w-4 h-4 text-[#0b5d63]" />
                    <span>{hosp.bedsCount} Inpatient Beds</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-[#e39b2d]" />
                    <span>{hosp.surgeonsCount}+ Senior Surgeons</span>
                  </div>
                </div>

                <Button
                  variant="gold"
                  size="lg"
                  onClick={() => openIntake(hosp.name)}
                  className="w-full text-xs font-bold gap-2 rounded-xl font-heading uppercase tracking-wider"
                >
                  <span>Coordinate Admission at {hosp.name}</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
