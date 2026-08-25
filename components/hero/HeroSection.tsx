"use client";

import React from "react";
import Image from "next/image";
import { useCare } from "@/context/CareContext";
import {
  Sparkles,
  MessageSquare,
  ShieldCheck,
  Plane,
  Wallet,
  PhoneCall,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

export const HeroSection = () => {
  const { t, language, openIntake, openChat } = useCare();

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
          <div className="lg:col-span-6 space-y-6 sm:space-y-8 text-center lg:text-left rtl:lg:text-right">
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
              <a
                href="#assessment"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-base font-bold text-slate-950 bg-gradient-to-r from-teal-300 via-teal-200 to-emerald-300 shadow-xl shadow-teal-500/20 hover:shadow-teal-400/30 hover:scale-[1.02] active:scale-[0.98] transition-all group"
              >
                <span>{t.hero.primaryCta}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
              </a>

              <button
                onClick={() => openChat()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl text-sm font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/20 hover:border-white/30 backdrop-blur-md transition-all"
              >
                <MessageSquare className="w-4 h-4 text-teal-400" />
                <span>{t.hero.secondaryCta}</span>
              </button>
            </div>

            {/* Quick Guarantees Strip: Transparent Pricing, Dedicated Care Coordinator, No Hidden Costs */}
            <div className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-5 sm:gap-7 text-xs sm:text-sm text-slate-200 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                <span className="font-semibold">{t.hero.transparentPricing}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                <span className="font-semibold">{t.hero.dedicatedCoordinator}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                <span className="font-semibold">{t.hero.noHiddenCosts}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Doctor-Patient Hero Visual & Floating Badges */}
          <div className="lg:col-span-6 relative mt-6 lg:mt-0 px-2 sm:px-6">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Main Rounded Image Container */}
              <div className="relative rounded-[32px] sm:rounded-[40px] overflow-hidden border border-white/20 shadow-2xl shadow-slate-950/60 bg-slate-900 aspect-[4/4.2] sm:aspect-[4/4.3] w-full">
                <Image
                  src="/hero-doctor-patient.jpg"
                  alt="Doctor and Patient Care in India"
                  fill
                  className="object-cover object-top"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent pointer-events-none"></div>
              </div>

              {/* Floating Badge 2: Medical Visa Assistance (Top-Right) */}
              <div className="absolute -top-3 sm:-top-4 -right-2 sm:-right-4 bg-[#032626] text-white px-3.5 sm:px-4 py-2 rounded-full shadow-xl shadow-slate-950/30 border border-teal-500/40 flex items-center gap-2 z-20 animate-float-delayed">
                <Plane className="w-4 h-4 text-amber-400 rotate-[-20deg] shrink-0" />
                <span className="text-xs sm:text-sm font-bold tracking-wide text-white whitespace-nowrap">
                  {t.hero.visaAssistance}
                </span>
              </div>

              {/* Floating Badge 3: Save up to 70% On Treatment (Middle-Right) */}
              <div className="absolute top-[42%] -right-2 sm:-right-8 bg-white text-slate-900 rounded-2xl p-2.5 sm:p-3.5 shadow-xl shadow-slate-950/20 border border-slate-100 flex items-center gap-3 z-20 animate-float">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 border border-teal-100 flex items-center justify-center shrink-0">
                  <Wallet className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-extrabold text-sm sm:text-base text-slate-900 leading-tight">
                    {t.hero.saveUpTo70}
                  </div>
                  <div className="text-[10px] sm:text-xs text-slate-500 font-medium leading-tight">
                    {t.hero.onTreatment}
                  </div>
                </div>
              </div>

              {/* Floating Badge 4: JCI & NABH Accredited (Bottom-Left) */}
              <div className="absolute bottom-8 sm:bottom-12 -left-2 sm:-left-8 bg-white text-slate-900 rounded-2xl p-2.5 sm:p-3.5 shadow-xl shadow-slate-950/20 border border-slate-100 flex items-center gap-3 z-20 animate-float-delayed">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 border border-teal-100 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-extrabold text-sm sm:text-base text-slate-900 leading-tight">
                    JCI & NABH
                  </div>
                  <div className="text-[10px] sm:text-xs text-slate-500 font-medium leading-tight">
                    {language === "ar" ? "معتمدة دولياً" : "Accredited"}
                  </div>
                </div>
              </div>

              {/* Floating Badge 5: Free Consultation (Bottom-Right) */}
              <div
                onClick={() => openChat("I'd like to book a free consultation.")}
                className="absolute -bottom-4 sm:-bottom-5 right-2 sm:right-4 bg-white text-slate-900 rounded-2xl p-2.5 sm:p-3.5 shadow-xl shadow-slate-950/20 border border-slate-100 flex items-center gap-3 z-20 hover:scale-105 transition-transform cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 border border-teal-100 flex items-center justify-center shrink-0">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-extrabold text-sm sm:text-base text-slate-900 leading-tight">
                    {language === "ar" ? "استشارة" : "Free"}
                  </div>
                  <div className="text-[10px] sm:text-xs text-slate-500 font-medium leading-tight">
                    {language === "ar" ? "مجانية" : "Consultation"}
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
