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
  Star,
} from "lucide-react";

export const HeroSection = () => {
  const { t, language, openIntake, openChat } = useCare();

  return (
    <section className="relative min-h-[92vh] pt-28 pb-20 bg-gradient-to-b from-[#071321] via-[#0B1E33] to-[#0D2642] text-white overflow-hidden flex flex-col justify-center">
      {/* Background Decorative Ambient Lights */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#3F4EB4]/15 rounded-full blur-3xl pointer-events-none animate-pulse-slow"></div>
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#2ECDC5]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -top-10 -right-10 w-80 h-80 bg-[#3F4EB4]/10 rounded-full blur-3xl pointer-events-none"></div>

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
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2ECDC5]/10 border border-[#2ECDC5]/30 text-[#2ECDC5] text-xs font-semibold tracking-wider uppercase backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#2ECDC5] animate-ping"></span>
              <span>{t.hero.eyebrow}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-white font-sans">
              {language === "en" ? (
                <>
                  World-Class Care. <br className="hidden sm:inline" />
                  <span className="bg-gradient-to-r from-[#2ECDC5] via-[#5ADBD5] to-[#2ECDC5] bg-clip-text text-transparent">
                    Personally Coordinated.
                  </span>
                </>
              ) : (
                t.hero.headline
              )}
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
              {t.hero.subheadline}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => openIntake()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-base font-bold text-white bg-gradient-to-r from-[#2ECDC5] via-[#3F4EB4] to-[#283593] hover:from-[#283593] hover:to-[#2ECDC5] shadow-xl shadow-[#283593]/25 hover:scale-[1.02] active:scale-[0.98] transition-all group"
              >
                <span>{t.hero.primaryCta}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => openChat()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl text-sm font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/15 hover:border-[#2ECDC5]/40 backdrop-blur-md transition-all"
              >
                <MessageSquare className="w-4 h-4 text-[#2ECDC5]" />
                <span>{t.hero.secondaryCta}</span>
              </button>
            </div>

            {/* Social Proof / Patient Reviews Rating */}
            <div className="pt-2 flex items-center justify-center lg:justify-start gap-4">
              {/* Stacked Initial Badges */}
              <div className="flex -space-x-2.5 rtl:space-x-reverse items-center">
                {[
                  { initials: "SW", bg: "bg-[#06433e]" },
                  { initials: "AF", bg: "bg-[#074e48]" },
                  { initials: "MD", bg: "bg-[#053d37]" },
                  { initials: "FO", bg: "bg-[#084b44]" },
                  { initials: "JL", bg: "bg-[#03342e]" },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className={`w-9 h-9 rounded-full ${item.bg} border-2 border-white flex items-center justify-center text-[11px] font-bold text-white tracking-wider shrink-0 select-none shadow-md`}
                  >
                    {item.initials}
                  </div>
                ))}
              </div>

              {/* Stars and Rating Text */}
              <div className="flex flex-col items-start rtl:items-end text-left rtl:text-right">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-[#F58220] text-[#F58220] shrink-0"
                    />
                  ))}
                </div>
                <div className="text-xs sm:text-sm text-slate-300 font-medium mt-1">
                  {language === "ar"
                    ? "تقييم 4.9/5 من أكثر من 1200+ مريض دولي"
                    : "Rated 4.9/5 by 1200+ international patients"}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Visual Image Card */}
              <div className="relative h-[480px] sm:h-[560px] lg:h-[600px] w-full rounded-3xl overflow-hidden shadow-2xl shadow-slate-950/50 border border-slate-700/60 ring-1 ring-white/10">
                <Image
                  src="/hero-doctor-patient.jpg"
                  alt="Doctor and Patient Consultation in Hospital"
                  fill
                  priority
                  className="object-cover object-[center_35%]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-black/10"></div>

                {/* Floating Badge 1: 24/7 Concierge Support (Top-Left) */}
                <div className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-slate-700/80 flex items-center gap-2.5 z-20 shadow-lg">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#2ECDC5] animate-pulse"></div>
                  <div>
                    <div className="text-[11px] font-bold text-white leading-tight">
                      {language === "ar" ? "خدمة كونسيرج 24/7" : "24/7 Dedicated Concierge"}
                    </div>
                    <div className="text-[9px] text-[#2ECDC5] font-semibold">
                      {language === "ar" ? "متصل الآن" : "Active & Available"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Badge 2: Medical Visa Assistance (Top-Right) */}
              <div className="absolute -top-3 sm:-top-4 -right-2 sm:-right-4 bg-[#283593] text-white px-3.5 sm:px-4 py-2 rounded-full shadow-xl shadow-slate-950/30 border border-[#3F4EB4]/40 flex items-center gap-2 z-20 animate-float-delayed">
                <Plane className="w-4 h-4 text-amber-400 rotate-[-20deg] shrink-0" />
                <span className="text-xs sm:text-sm font-bold tracking-wide text-white whitespace-nowrap">
                  {t.hero.visaAssistance}
                </span>
              </div>

              {/* Floating Badge 3: Save up to 70% On Treatment (Middle-Right) */}
              <div className="absolute top-[42%] -right-2 sm:-right-8 bg-white text-slate-900 rounded-2xl p-2.5 sm:p-3.5 shadow-xl shadow-slate-950/20 border border-slate-100 flex items-center gap-3 z-20 animate-float">
                <div className="w-10 h-10 rounded-xl bg-[#3F4EB4]/10 text-[#283593] border border-[#3F4EB4]/20 flex items-center justify-center shrink-0">
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
                <div className="w-10 h-10 rounded-xl bg-[#3F4EB4]/10 text-[#283593] border border-[#3F4EB4]/20 flex items-center justify-center shrink-0">
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
                <div className="w-10 h-10 rounded-xl bg-[#3F4EB4]/10 text-[#283593] border border-[#3F4EB4]/20 flex items-center justify-center shrink-0">
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
