"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useCare } from "@/context/CareContext";
import { CARE_COORDINATOR, DOCTORS, TRUSTED_COUNTRIES } from "@/data/mockData";
import {
  Sparkles,
  MessageSquare,
  ShieldCheck,
  Calendar,
  Clock,
  Video,
  CheckCircle2,
  MapPin,
  Star,
  ArrowRight,
  Activity,
} from "lucide-react";

export const HeroSection = () => {
  const { t, language, openIntake, openChat, openDoctorModal } = useCare();
  const [activeCityNode, setActiveCityNode] = useState<string>("Sector 62 Hub");

  const cityHubs = [
    { name: "Sector 62 Hub", count: "Fortis Quaternary Hospital", x: "32%", y: "28%" },
    { name: "Phase 6 Hub", count: "Max Super Speciality", x: "24%", y: "58%" },
    { name: "Sector 34 Hub", count: "Healing Multi-Specialty", x: "36%", y: "78%" },
    { name: "Tricity Corridor", count: "Paras Quaternary Center", x: "44%", y: "82%" },
    { name: "Phase 1 Hub", count: "Eden Critical Care", x: "38%", y: "65%" },
  ];

  return (
    <section className="relative min-h-[92vh] pt-28 pb-20 bg-gradient-to-b from-[#071321] via-[#0B1E33] to-[#0D2642] text-white overflow-hidden flex flex-col justify-center">
      {/* Background Decorative Ambient Lights */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-500/15 rounded-full blur-3xl pointer-events-none animate-pulse-slow"></div>
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -top-10 -right-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Subtle Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline, Narrative & CTAs */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left rtl:lg:text-right">
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-950/80 border border-teal-500/30 text-teal-300 text-xs font-semibold tracking-wider uppercase backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping"></span>
              <span>{t.hero.eyebrow}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-white font-sans">
              {language === "en" ? (
                <>
                  World-Class Care. <br className="hidden sm:inline" />
                  <span className="bg-gradient-to-r from-teal-300 via-teal-200 to-amber-200 bg-clip-text text-transparent">
                    Personally Coordinated.
                  </span>
                </>
              ) : (
                t.hero.headline
              )}
            </h1>

            {/* Supporting Copy */}
            <p className="text-slate-300 text-base sm:text-lg lg:text-xl font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {t.hero.subheadline}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => openIntake()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-base font-bold text-slate-950 bg-gradient-to-r from-teal-300 via-teal-200 to-emerald-300 shadow-xl shadow-teal-500/20 hover:shadow-teal-400/30 hover:scale-[1.02] active:scale-[0.98] transition-all group"
              >
                <span>{t.hero.primaryCta}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => openChat()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl text-sm font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/20 hover:border-white/30 backdrop-blur-md transition-all"
              >
                <MessageSquare className="w-4 h-4 text-teal-400" />
                <span>{t.hero.secondaryCta}</span>
              </button>
            </div>

            {/* Quick Guarantees Strip */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-300 font-medium">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Zero Agency Markups</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                <span>JCI & NABH Hospitals</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Priority M-Visa Stamping</span>
              </div>
            </div>

            {/* Trusted By Patients From */}
            <div className="pt-4 border-t border-white/10 space-y-2.5">
              <div className="text-[11px] font-extrabold uppercase tracking-widest text-teal-300/90 flex items-center justify-center lg:justify-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse"></span>
                <span>{language === "ar" ? "موثوق من مرضى" : "TRUSTED BY PATIENTS FROM"}</span>
              </div>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-2.5">
                {TRUSTED_COUNTRIES.map((c) => (
                  <div
                    key={c.code}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 backdrop-blur-md transition-all shadow-sm group"
                  >
                    <span className="px-1.5 py-0.5 rounded bg-teal-500/25 text-teal-300 font-mono text-[10px] font-bold border border-teal-400/30">
                      {c.code}
                    </span>
                    <span className="text-xs font-semibold text-slate-100 group-hover:text-white transition-colors">
                      {language === "ar" ? c.nameAr : c.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Visual & Floating Cards */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            {/* Visual Container */}
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Center Main Stage Card */}
              <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-gradient-to-b from-slate-800/80 to-slate-900/90 shadow-2xl backdrop-blur-xl p-6">
                {/* Doctor-Patient Editorial Visual scene */}
                <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden mb-5">
                  <Image
                    src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800"
                    alt="International Patient Care Coordinator in India"
                    fill
                    className="object-cover object-center"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

                  {/* Overlay Badge */}
                  <div className="absolute top-3 left-3 bg-slate-950/80 border border-white/20 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span className="text-[11px] font-semibold text-white tracking-wide">
                      Live Coordination Desk
                    </span>
                  </div>

                  {/* Location Hub Indicator */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-200">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-teal-400" />
                      <span>Premier Multi-Class Institutes in Chandigarh City</span>
                    </div>
                  </div>
                </div>

                {/* Healthcare Network Interactive Node Hubs */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
                    <span>Key Medical Hubs in Chandigarh</span>
                    <span className="text-teal-400">Direct Flight Access (IXC)</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {cityHubs.slice(0, 3).map((city) => (
                      <button
                        key={city.name}
                        onClick={() => setActiveCityNode(city.name)}
                        className={`p-2 rounded-xl text-left rtl:text-right transition-all border ${
                          activeCityNode === city.name
                            ? "bg-teal-500/20 border-teal-400/50 text-white"
                            : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
                        }`}
                      >
                        <div className="text-xs font-bold">{city.name}</div>
                        <div className="text-[10px] text-teal-300">{city.count}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating Card 1: Care Coordinator Assigned (Top-Right / Left depending on layout) */}
              <div className="absolute -top-6 -right-4 sm:-right-8 bg-white/95 text-slate-900 rounded-2xl p-3.5 shadow-2xl border border-teal-100 backdrop-blur-md max-w-[240px] animate-float z-20">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={CARE_COORDINATOR.avatar}
                      alt={CARE_COORDINATOR.name}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-teal-500"
                    />
                    <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-white"></span>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-teal-700">
                      {t.hero.coordinatorAssigned}
                    </div>
                    <div className="text-xs font-extrabold text-slate-900">
                      {language === "ar" ? CARE_COORDINATOR.nameAr : CARE_COORDINATOR.name}
                    </div>
                    <div className="text-[10px] text-slate-500">
                      {language === "ar" ? "رعاية المرضى الدوليين" : "International Patient Care"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Card 2: Specialist Match Found (Bottom-Left) */}
              <div
                onClick={() => openDoctorModal(DOCTORS[0])}
                className="absolute -bottom-6 -left-4 sm:-left-8 bg-slate-900/95 text-white rounded-2xl p-3.5 shadow-2xl border border-teal-500/40 backdrop-blur-md max-w-[260px] animate-float-delayed z-20 cursor-pointer hover:border-teal-400 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-600/30 border border-teal-400/50 flex items-center justify-center text-teal-300 shrink-0">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1">
                      <Star className="w-2.5 h-2.5 fill-amber-400" />
                      <span>{t.hero.specialistMatch}</span>
                    </div>
                    <div className="text-xs font-bold truncate">
                      {language === "ar" ? DOCTORS[0].nameAr : DOCTORS[0].name}
                    </div>
                    <div className="text-[10px] text-teal-300 truncate">
                      {language === "ar" ? DOCTORS[0].specialtyAr : DOCTORS[0].specialty} · 19+ Yrs
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Card 3: Next Step Tele-Consultation (Center-Right overlay) */}
              <div className="hidden sm:flex absolute top-1/2 -right-10 transform -translate-y-1/2 bg-slate-950/90 text-white rounded-xl px-3.5 py-2.5 shadow-xl border border-white/20 backdrop-blur-md items-center gap-2.5 z-20">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Video className="w-4 h-4" />
                </div>
                <div className="text-left rtl:text-right">
                  <div className="text-[9px] uppercase tracking-wider font-bold text-slate-400">
                    {t.hero.nextStep}
                  </div>
                  <div className="text-xs font-semibold text-emerald-300">
                    {language === "ar" ? "غداً · 4:30 م بتوقيت الهند" : "Tomorrow · 4:30 PM IST"}
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
