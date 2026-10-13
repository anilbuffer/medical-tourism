"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  ArrowRight,
  ShieldCheck,
  Building2,
  Bed,
  Plane,
  Sparkles,
  ChevronRight,
  CheckCircle2,
  Stethoscope,
  Activity,
  Layers,
} from "lucide-react";
import { useCare } from "@/context/CareContext";

interface HospitalNode {
  id: string;
  name: string;
  shortName: string;
  location: string;
  city: string;
  image: string;
  accreditation: string;
  beds: string;
  airportTime: string;
  specialties: string[];
  keyHighlight: string;
  description: string;
  href: string;
  // Position coordinates on the interactive visual canvas (in percentages)
  x: number; // horizontal %
  y: number; // vertical %
}

const NETWORK_HOSPITALS: HospitalNode[] = [
  {
    id: "fortis-mohali",
    name: "Fortis Hospital Mohali",
    shortName: "Fortis Mohali",
    location: "Sector 62, Phase VIII, Mohali",
    city: "Mohali, Chandigarh Tricity",
    image: "/fortis-image.png",
    accreditation: "JCI & NABH Accredited",
    beds: "355 Beds",
    airportTime: "15 min to Airport (IXC)",
    specialties: ["Robotic Joint Replacement", "Cardiac Sciences", "Neurosciences", "IVF Fertility"],
    keyHighlight: "State-of-the-art Robotic Surgery Center with dedicated International Patient Lounge.",
    description:
      "A flagship quaternary care facility featuring 11 modular laminar-flow surgical suites, advanced Da Vinci robotic platform, and round-the-clock emergency medical teams.",
    href: "/hospitals",
    x: 46,
    y: 38,
  },
  {
    id: "max-mohali",
    name: "Max Super Speciality Hospital",
    shortName: "Max Mohali",
    location: "Phase 6, Mohali",
    city: "Mohali, Chandigarh Tricity",
    image: "/max-hospital.jpg",
    accreditation: "NABH & NABL Certified",
    beds: "230+ Beds",
    airportTime: "20 min to Airport (IXC)",
    specialties: ["Comprehensive Oncology", "Orthopaedics & Spine", "Kidney & Liver Care", "Ophthalmology"],
    keyHighlight: "TrueBeam Novalis Tx Linear Accelerator for precision radiation therapy.",
    description:
      "Premier multi-speciality medical institute equipped with cutting-edge cancer care suites, bone marrow transplant unit, and specialized post-operative care units.",
    href: "/hospitals",
    x: 34,
    y: 52,
  },
  {
    id: "apollo-chandigarh",
    name: "Apollo Hospitals & Clinics",
    shortName: "Apollo Clinics",
    location: "Sector 8C, Chandigarh",
    city: "Chandigarh City Hub",
    image: "/images/facilities/hybrid-cath-lab.jpg",
    accreditation: "NABH Certified",
    beds: "Specialist Center",
    airportTime: "18 min to Airport (IXC)",
    specialties: ["Interventional Cardiology", "Critical Care", "General & Laparoscopic Surgery"],
    keyHighlight: "Digital Bi-Plane Catheterization Lab with 24/7 cardiac emergency response.",
    description:
      "A prestigious medical institution offering high-precision diagnostic and interventional suites, expedited consultation pathways, and dedicated international liaisons.",
    href: "/hospitals",
    x: 62,
    y: 32,
  },
  {
    id: "healing-hospital",
    name: "Healing Super Speciality Hospital",
    shortName: "Healing Hospital",
    location: "Sector 34A, Chandigarh",
    city: "Chandigarh Central",
    image: "/images/facilities/robotic-surgery.jpg",
    accreditation: "NABH Accredited",
    beds: "100+ Beds",
    airportTime: "15 min to Airport (IXC)",
    specialties: ["Orthopaedics", "Cardiology", "Bariatric Surgery", "Plastic Surgery"],
    keyHighlight: "Advanced Mako Robotic Arm-Assisted joint replacement facility.",
    description:
      "Modern boutique hospital known for rapid post-operative mobilization protocols, tailored international patient suites, and personalized nursing care.",
    href: "/hospitals",
    x: 58,
    y: 65,
  },
  {
    id: "eden-hospital",
    name: "Eden Critical Care Hospital",
    shortName: "Eden Critical Care",
    location: "Industrial Area Phase 1, Chandigarh",
    city: "Chandigarh Hub",
    image: "/images/facilities/neurosciences-suite.jpg",
    accreditation: "NABH Certified",
    beds: "120+ Beds",
    airportTime: "12 min to Airport (IXC)",
    specialties: ["Neuro Intensive Care", "Trauma & Emergency", "Pulmonology"],
    keyHighlight: "Specialized Level-3 Neuro & Poly-Trauma Critical Care ICU.",
    description:
      "Equipped with advanced multi-slice CT, MRI, and dedicated isolation suites providing seamless intensive care management for international medical transfers.",
    href: "/hospitals",
    x: 74,
    y: 54,
  },
];

export const HospitalsSection: React.FC = () => {
  const [activeHospitalId, setActiveHospitalId] = useState<string>(NETWORK_HOSPITALS[0].id);
  const [filterSpecialty, setFilterSpecialty] = useState<string>("All");
  const { openIntake } = useCare();

  const activeHospital =
    NETWORK_HOSPITALS.find((h) => h.id === activeHospitalId) || NETWORK_HOSPITALS[0];

  const filterOptions = ["All", "Robotic Surgery", "Cardiology", "Oncology", "Orthopaedics"];

  const filteredHospitals =
    filterSpecialty === "All"
      ? NETWORK_HOSPITALS
      : NETWORK_HOSPITALS.filter((h) =>
          h.specialties.some((s) => s.toLowerCase().includes(filterSpecialty.toLowerCase()))
        );

  return (
    <section id="hospitals" className="py-16 sm:py-20 lg:py-24 bg-[#F8FAFC] border-b border-[#DCE5EB] relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#087F79]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#102B46]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAF5F4] border border-[#087F79]/20 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#087F79] animate-pulse" />
              <span className="text-[#087F79] text-xs font-bold uppercase tracking-wider">
                OUR MEDICAL NETWORK
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#102B46] tracking-tight leading-tight">
              Accredited Hospital Network & Surgical Hubs
            </h2>
            <p className="text-[#627486] text-sm sm:text-base mt-2.5 leading-relaxed">
              Explore premier JCI & NABH accredited partner facilities in India. Interact with the medical network hub below to view surgical infrastructure, certifications, and international amenities.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/hospitals"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-[#087F79] hover:bg-[#066661] transition-all px-5 py-2.5 rounded-xl shadow-xs group"
            >
              <span>Explore All Hospitals</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          <span className="text-xs font-semibold text-[#627486] uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-[#087F79]" /> Filter Hubs:
          </span>
          {filterOptions.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => setFilterSpecialty(opt)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all shrink-0 cursor-pointer ${
                filterSpecialty === opt
                  ? "bg-[#102B46] text-white shadow-xs"
                  : "bg-white text-[#627486] hover:text-[#102B46] border border-[#DCE5EB] hover:border-[#102B46]/30"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>

        {/* Interactive Main Canvas & Focus Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Left: Creative Interactive Visual Network Map (7 cols) */}
          <div className="lg:col-span-7 bg-[#0C1F33] rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden flex flex-col justify-between shadow-xl border border-[#1A3A5A] min-h-[440px] sm:min-h-[520px]">
            {/* Tech Blueprint & Grid Background */}
            <div
              className="absolute inset-0 opacity-15 pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(#087F79 1px, transparent 1px), linear-gradient(to right, #1A3A5A 1px, transparent 1px), linear-gradient(to bottom, #1A3A5A 1px, transparent 1px)",
                backgroundSize: "28px 28px, 56px 56px, 56px 56px",
              }}
            />

            {/* Glowing Accent Glows */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#087F79]/20 rounded-full blur-[90px] pointer-events-none" />
            <div className="absolute bottom-10 right-10 w-60 h-60 bg-[#F0A126]/10 rounded-full blur-[80px] pointer-events-none" />

            {/* Canvas Header Bar */}
            <div className="relative z-10 flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#087F79] animate-ping" />
                <span className="text-xs font-bold text-teal-300 tracking-wider uppercase">
                  Chandigarh Tricity Healthcare Corridor · Live Network
                </span>
              </div>
              <span className="text-[11px] font-medium text-slate-400 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
                5 Premier Partner Centers
              </span>
            </div>

            {/* Interactive Map Surface with SVG Network Grid & Coordinates */}
            <div className="relative z-10 flex-1 my-6 min-h-[300px] flex items-center justify-center">
              {/* SVG Connecting Corridors & Radar Rings */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                {/* Connecting Transit Lines */}
                <line x1="46%" y1="38%" x2="34%" y2="52%" stroke="#087F79" strokeWidth="1.5" strokeDasharray="4 4" strokeOpacity="0.4" />
                <line x1="46%" y1="38%" x2="62%" y2="32%" stroke="#087F79" strokeWidth="1.5" strokeDasharray="4 4" strokeOpacity="0.5" />
                <line x1="62%" y1="32%" x2="58%" y2="65%" stroke="#087F79" strokeWidth="1.5" strokeDasharray="4 4" strokeOpacity="0.4" />
                <line x1="58%" y1="65%" x2="74%" y2="54%" stroke="#087F79" strokeWidth="1.5" strokeDasharray="4 4" strokeOpacity="0.4" />
                <line x1="34%" y1="52%" x2="58%" y2="65%" stroke="#087F79" strokeWidth="1" strokeDasharray="2 4" strokeOpacity="0.25" />

                {/* Radar Orbit Concentric Circles centered around Tricity */}
                <circle cx="50%" cy="45%" r="80" stroke="#087F79" strokeWidth="1" strokeOpacity="0.15" fill="none" />
                <circle cx="50%" cy="45%" r="140" stroke="#087F79" strokeWidth="1" strokeOpacity="0.1" fill="none" strokeDasharray="6 6" />
                <circle cx="50%" cy="45%" r="200" stroke="#087F79" strokeWidth="1" strokeOpacity="0.05" fill="none" />
              </svg>

              {/* Interactive Hospital Pins */}
              {NETWORK_HOSPITALS.map((hospital) => {
                const isActive = hospital.id === activeHospitalId;
                const isMatchingFilter = filteredHospitals.some((h) => h.id === hospital.id);

                return (
                  <button
                    key={hospital.id}
                    type="button"
                    onClick={() => setActiveHospitalId(hospital.id)}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 group text-left cursor-pointer transition-all duration-300 ${
                      isMatchingFilter ? "opacity-100 scale-100" : "opacity-40 scale-90"
                    }`}
                    style={{ left: `${hospital.x}%`, top: `${hospital.y}%` }}
                    aria-label={`Select ${hospital.name}`}
                  >
                    {/* Pulsing Beacon Ring for Active Pin */}
                    {isActive && (
                      <span className="absolute -inset-3 rounded-full bg-[#087F79]/40 animate-ping pointer-events-none" />
                    )}

                    <div
                      className={`relative flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-300 shadow-lg ${
                        isActive
                          ? "bg-[#087F79] border-teal-300 text-white scale-110 shadow-teal-500/30 ring-4 ring-[#087F79]/30"
                          : "bg-[#102B46]/95 border-white/20 text-slate-200 hover:border-teal-400 hover:bg-[#163659]"
                      }`}
                    >
                      <MapPin
                        className={`w-4 h-4 shrink-0 transition-colors ${
                          isActive ? "text-white" : "text-teal-400 group-hover:text-teal-300"
                        }`}
                      />
                      <span className="text-xs font-semibold whitespace-nowrap hidden sm:inline">
                        {hospital.shortName}
                      </span>
                    </div>

                    {/* Popover Mini Tooltip on Hover */}
                    <div
                      className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 pointer-events-none transition-all duration-200 ${
                        isActive
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0"
                      }`}
                    >
                      <div className="bg-[#081524] border border-teal-500/40 text-teal-200 text-[10px] font-semibold px-2 py-1 rounded shadow-xl whitespace-nowrap">
                        {hospital.accreditation}
                      </div>
                    </div>
                  </button>
                );
              })}

              {/* Central Map Legend Overlay */}
              <div className="absolute bottom-2 left-2 bg-[#081524]/90 backdrop-blur-md border border-white/10 rounded-xl p-3 text-[11px] text-slate-300 space-y-1.5 hidden sm:block">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#087F79]" />
                  <span>JCI & NABH Verified Partner</span>
                </div>
                <div className="flex items-center gap-2">
                  <Plane className="w-3 h-3 text-[#F0A126]" />
                  <span>15–20 Mins from Chandigarh Int&apos;l (IXC)</span>
                </div>
              </div>
            </div>

            {/* Bottom Quick Hub Switcher Bar */}
            <div className="relative z-10 pt-3 border-t border-white/10 flex items-center gap-2 overflow-x-auto scrollbar-none">
              <span className="text-[11px] font-semibold text-slate-400 shrink-0 mr-1">
                Select Partner:
              </span>
              {NETWORK_HOSPITALS.map((h) => (
                <button
                  key={h.id}
                  type="button"
                  onClick={() => setActiveHospitalId(h.id)}
                  className={`text-xs px-2.5 py-1 rounded-lg shrink-0 transition-colors cursor-pointer ${
                    h.id === activeHospitalId
                      ? "bg-[#087F79] text-white font-semibold"
                      : "bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {h.shortName}
                </button>
              ))}
            </div>
          </div>

          {/* Right: Focused Active Hospital Showcase Card (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-[#DCE5EB] shadow-lg flex flex-col justify-between transition-all duration-300">
            <div>
              {/* Photo & Badge Preview */}
              <div className="relative h-52 sm:h-56 w-full rounded-2xl overflow-hidden mb-6 bg-slate-100 group">
                <Image
                  src={activeHospital.image}
                  alt={activeHospital.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#102B46]/80 via-transparent to-transparent" />

                {/* Accreditation Badge */}
                <div className="absolute top-3.5 left-3.5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#102B46]/95 backdrop-blur-md text-white text-xs font-semibold shadow-xs border border-white/20">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#087F79]" />
                    <span>{activeHospital.accreditation}</span>
                  </span>
                </div>

                {/* Bottom Photo Title Info */}
                <div className="absolute bottom-3 left-3.5 right-3.5 text-white">
                  <div className="flex items-center gap-1.5 text-xs text-teal-200 mb-0.5">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{activeHospital.city}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white leading-tight">
                    {activeHospital.name}
                  </h3>
                </div>
              </div>

              {/* Quick Metrics Bar */}
              <div className="grid grid-cols-2 gap-2.5 mb-5 p-3 rounded-xl bg-[#F8FAFC] border border-[#DCE5EB]">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#EAF5F4] flex items-center justify-center shrink-0">
                    <Bed className="w-4 h-4 text-[#087F79]" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-semibold text-[#627486]">Capacity</p>
                    <p className="text-xs font-bold text-[#102B46]">{activeHospital.beds}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center shrink-0">
                    <Plane className="w-4 h-4 text-[#F0A126]" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-semibold text-[#627486]">Transit</p>
                    <p className="text-xs font-bold text-[#102B46]">{activeHospital.airportTime}</p>
                  </div>
                </div>
              </div>

              {/* Infrastructure Highlight */}
              <div className="mb-4">
                <div className="flex items-start gap-2 p-2.5 rounded-xl bg-[#EAF5F4]/60 border border-[#087F79]/20 text-[#102B46]">
                  <Sparkles className="w-4 h-4 text-[#087F79] shrink-0 mt-0.5" />
                  <p className="text-xs font-medium leading-relaxed">
                    <span className="font-bold text-[#087F79]">Specialized Hub:</span>{" "}
                    {activeHospital.keyHighlight}
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#627486] leading-relaxed mb-5">
                {activeHospital.description}
              </p>

              {/* Key Specialties Pills */}
              <div className="mb-6">
                <p className="text-[11px] uppercase tracking-wider font-semibold text-[#627486] mb-2 flex items-center gap-1.5">
                  <Stethoscope className="w-3 h-3 text-[#087F79]" /> Priority Specialties:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {activeHospital.specialties.map((spec) => (
                    <span
                      key={spec}
                      className="px-2.5 py-1 rounded-lg bg-[#EAF5F4] text-[#102B46] text-xs font-medium"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-4 border-t border-[#DCE5EB] flex flex-col sm:flex-row gap-2.5">
              <button
                type="button"
                onClick={() => openIntake(activeHospital.name)}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#087F79] hover:bg-[#066661] text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
              >
                <span>Request Case Review</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <Link
                href={activeHospital.href}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-[#DCE5EB] hover:border-[#102B46] text-[#102B46] text-xs font-semibold transition-colors"
              >
                <span>View Full Profile</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

