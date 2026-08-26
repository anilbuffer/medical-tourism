"use client";

import React from "react";
import Image from "next/image";
import { useCare } from "@/context/CareContext";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Plane,
  HeartPulse,
  MessageSquare,
  Star,
  CheckCircle2,
  Clock,
  Wallet,
  PhoneCall,
  Lock,
  UserCheck,
  Stethoscope,
  Building2,
  Award,
} from "lucide-react";

export const HeroSection = () => {
  const { t, language, openIntake, openChat } = useCare();

  return (
    <section className="relative min-h-[90vh] lg:min-h-[92vh] flex items-center pt-28 pb-16 lg:pt-32 lg:pb-20 overflow-hidden bg-gradient-to-b from-[#031126] via-[#06203D] to-[#0A2E50] text-white">
      {/* ── 01. Atmospheric Lighting & Clinical Mesh Overlays ── */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#0284C7]/20 rounded-full blur-[140px] pointer-events-none -z-0"></div>
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-[#2ECDC5]/15 rounded-full blur-[120px] pointer-events-none -z-0"></div>
      <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-[#0D9488]/15 rounded-full blur-[100px] pointer-events-none -z-0"></div>

      {/* Subtle Dot Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#2ECDC5 1.2px, transparent 1.2px)`,
          backgroundSize: "32px 32px",
        }}
      ></div>

      {/* Subtle Medical EKG Pulse Wave Graphic at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none overflow-hidden opacity-25">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <path
            d="M0 60 L380 60 L400 35 L415 85 L430 20 L445 95 L460 60 L780 60 L800 40 L815 80 L830 25 L845 90 L860 60 L1180 60 L1200 45 L1215 75 L1230 30 L1245 85 L1260 60 L1440 60"
            stroke="url(#pulseGradient)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <defs>
            <linearGradient id="pulseGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2ECDC5" stopOpacity="0.1" />
              <stop offset="35%" stopColor="#2ECDC5" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#5EEAD4" stopOpacity="1" />
              <stop offset="70%" stopColor="#38BDF8" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#2ECDC5" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* ── 02. Main Hero Content Container ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">

          {/* ── Left Column: Presentable, High-Impact Content ── */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left rtl:lg:text-right">

            {/* Top Multi-Badge Trust Strip */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-2.5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#0D9488]/25 to-[#0284C7]/25 border border-[#2ECDC5]/40 text-[#2ECDC5] text-xs font-bold tracking-wider uppercase backdrop-blur-md shadow-sm shadow-teal-950/40">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2ECDC5] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2ECDC5]"></span>
                </span>
                <span>{language === "ar" ? "مكتب التنسيق الطبي الدولي" : "24/7 International Clinical Desk"}</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/80 border border-teal-500/30 text-slate-200 text-xs font-semibold backdrop-blur-sm">
                <ShieldCheck className="w-3.5 h-3.5 text-[#2ECDC5]" />
                <span>JCI & NABH Network</span>
              </div>

            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[54px] xl:text-6xl font-extrabold tracking-tight leading-[1.12] text-white font-sans">
              {language === "en" ? (
                <>
                  World-Class Care. <br className="hidden sm:inline" />
                  <span className="bg-gradient-to-r from-[#2ECDC5] via-[#5EEAD4] to-[#38BDF8] bg-clip-text text-transparent drop-shadow-sm">
                    Personally Coordinated.
                  </span>
                </>
              ) : (
                t.hero.headline
              )}
            </h1>

            {/* Supporting Narrative */}
            <p className="text-base sm:text-lg text-slate-200/95 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
              {language === "ar"
                ? "من أول استفسار طبي حتى استشارة كبار الاستشاريين، تنسيق المستشفى، تسهيل التأشيرة العلاجية والرعاية اللاحقة — فريق طبي مخصص يرافقك خطوة بخطوة إلى الهند."
                : "Access India's top 1% quaternary hospital network and board-certified chief surgeons. Complete end-to-end medical travel, express visa, and dedicated personal coordination."}
            </p>



            {/* Primary Action Buttons */}
            <div className="pt-2 space-y-3">
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
                <button
                  onClick={() => openIntake()}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-sm sm:text-base font-extrabold text-slate-950 bg-gradient-to-r from-[#2ECDC5] via-[#5EEAD4] to-[#2ECDC5] shadow-xl shadow-[#2ECDC5]/25 hover:brightness-105 hover:scale-[1.02] active:scale-[0.98] transition-all group cursor-pointer"
                >
                  <span>{language === "ar" ? "احصل على تقييم وعرض سعر مجاني" : "Get Free Quote"}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => openChat("I'd like to speak directly with an international care coordinator.")}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl text-sm font-bold text-white bg-slate-900/90 hover:bg-slate-800 border border-teal-500/40 hover:border-[#2ECDC5] backdrop-blur-md transition-all shadow-md cursor-pointer"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>{language === "ar" ? "تحدث مع منسق الرعاية" : "Talk to Care Coordinator"}</span>
                </button>
              </div>

              {/* Micro Trust Guarantee line */}
              <div className="flex items-center justify-center lg:justify-start gap-4 text-[11px] font-medium text-slate-300 pt-1">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2ECDC5]" />
                  <span>100% Free Consultation</span>
                </span>
                <span className="text-slate-600">•</span>
                <span className="flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-[#2ECDC5]" />
                  <span>HIPAA-Compliant Privacy</span>
                </span>
                <span className="text-slate-600">•</span>
                <span className="flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-[#2ECDC5]" />
                  <span>No Obligation</span>
                </span>
              </div>
            </div>

            {/* Social Proof / Patient Reviews Rating Card */}
            <div className="pt-2">
              <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-4 p-3.5 rounded-2xl bg-slate-900/70 border border-teal-500/20 backdrop-blur-md">
                {/* Real Country Flags Stack */}
                <div className="flex -space-x-2 rtl:space-x-reverse items-center">
                  {[
                    { flag: "🇬🇧", name: "UK" },
                    { flag: "🇦🇪", name: "UAE" },
                    { flag: "🇺🇸", name: "USA" },
                    { flag: "🇨🇦", name: "Canada" },
                    { flag: "🇸🇦", name: "KSA" },
                    { flag: "🇴🇲", name: "Oman" },
                    { flag: "🇦🇺", name: "Australia" },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      title={item.name}
                      className="w-8 h-8 rounded-full bg-slate-800 border-2 border-teal-400/50 flex items-center justify-center text-sm shadow-md select-none shrink-0"
                    >
                      {item.flag}
                    </div>
                  ))}
                </div>

                {/* Star Rating & Text */}
                <div className="flex flex-col items-start rtl:items-end text-left rtl:text-right">
                  <div className="flex items-center gap-1.5">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400 shrink-0" />
                      ))}
                    </div>
                    <span className="text-xs font-black text-amber-300">4.9 / 5</span>
                  </div>
                  <div className="text-xs text-slate-300 font-medium mt-0.5">
                    {language === "ar"
                      ? "تقييم 4.9/5 من أكثر من 1,450+ مريض دولي عبر 35+ دولة"
                      : "Rated 4.9/5 by 1,450+ international patients across 35+ countries"}
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* ── Right Column: Enhanced Medical Visual Showcase ── */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Glowing Background Radial Ring */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#2ECDC5]/30 to-[#0284C7]/20 rounded-3xl blur-2xl -z-10 scale-105"></div>

              {/* Main Visual Image Card */}
              <div className="relative h-[480px] sm:h-[540px] lg:h-[580px] w-full rounded-3xl overflow-hidden shadow-2xl shadow-slate-950/80 border-2 border-teal-500/30 ring-1 ring-white/15">
                <Image
                  src="/hero-doctor-patient.jpg"
                  alt="Doctor and Patient Consultation in World-Class Hospital"
                  fill
                  priority
                  className="object-cover object-[center_30%]"
                />
                {/* Soft Medical Gradient Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#031126]/85 via-transparent to-slate-950/20"></div>

                {/* Floating Badge 1: 24/7 Concierge Support (Top-Left on Image) */}
                <div className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-teal-500/40 flex items-center gap-2.5 z-20 shadow-lg">
                  <div className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2ECDC5] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#2ECDC5]"></span>
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-white leading-tight">
                      {language === "ar" ? "خدمة كونسيرج 24/7" : "24/7 Dedicated Concierge"}
                    </div>
                    <div className="text-[9px] text-[#2ECDC5] font-semibold">
                      {language === "ar" ? "متاح بالإنجليزية والعربية" : "Active • EN • AR • RU • FR"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Badge 2: Medical Visa Assistance (Top-Right) */}
              <div className="absolute -top-3 sm:-top-4 -right-2 sm:-right-4 bg-gradient-to-r from-[#0D9488] to-[#0A2E50] text-white px-3.5 sm:px-4 py-2 rounded-full shadow-xl shadow-slate-950/40 border border-teal-400/40 flex items-center gap-2 z-20 animate-float-delayed">
                <Plane className="w-4 h-4 text-amber-300 rotate-[-20deg] shrink-0" />
                <span className="text-xs sm:text-sm font-bold tracking-wide text-white whitespace-nowrap">
                  {t.hero.visaAssistance} (48h Express)
                </span>
              </div>

              {/* Floating Badge 3: Save up to 70% On Treatment (Middle-Right) */}
              <div className="absolute top-[40%] -right-2 sm:-right-8 bg-white/95 backdrop-blur-md text-slate-900 rounded-2xl p-2.5 sm:p-3.5 shadow-2xl shadow-slate-950/30 border border-teal-100 flex items-center gap-3 z-20 animate-float">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 border border-teal-200 flex items-center justify-center shrink-0 shadow-xs">
                  <Wallet className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-extrabold text-sm sm:text-base text-slate-900 leading-tight">
                    {t.hero.saveUpTo70}
                  </div>
                  <div className="text-[10px] sm:text-xs text-teal-700 font-bold leading-tight">
                    {language === "ar" ? "مقارنة بأسعار أمريكا وأوروبا" : "vs US & UK Hospital Costs"}
                  </div>
                </div>
              </div>

              {/* Floating Badge 4: JCI & NABH Accredited (Bottom-Left) */}
              <div className="absolute bottom-8 sm:bottom-12 -left-2 sm:-left-8 bg-white/95 backdrop-blur-md text-slate-900 rounded-2xl p-2.5 sm:p-3.5 shadow-2xl shadow-slate-950/30 border border-slate-100 flex items-center gap-3 z-20 animate-float-delayed">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 border border-blue-200 flex items-center justify-center shrink-0 shadow-xs">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-extrabold text-sm sm:text-base text-slate-900 leading-tight">
                    JCI & NABH
                  </div>
                  <div className="text-[10px] sm:text-xs text-slate-600 font-medium leading-tight">
                    {language === "ar" ? "50+ مستشفى معتمد دولياً" : "50+ Accredited Hospitals"}
                  </div>
                </div>
              </div>

              {/* Floating Badge 5: Free Video Consultation (Bottom-Right) */}
              <div
                onClick={() => openChat("I'd like to book a free video consultation with a specialist doctor.")}
                className="absolute -bottom-4 sm:-bottom-5 right-2 sm:right-4 bg-white/95 backdrop-blur-md text-slate-900 rounded-2xl p-2.5 sm:p-3.5 shadow-2xl shadow-slate-950/30 border border-emerald-100 flex items-center gap-3 z-20 hover:scale-105 transition-transform cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center shrink-0 shadow-xs">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-extrabold text-sm sm:text-base text-slate-900 leading-tight flex items-center gap-1.5">
                    <span>{language === "ar" ? "استشارة فيديو" : "Free Video Opinion"}</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  </div>
                  <div className="text-[10px] sm:text-xs text-emerald-700 font-semibold leading-tight">
                    {language === "ar" ? "مع كبار الجراحين والاستشاريين" : "With Senior Chief Specialists"}
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
