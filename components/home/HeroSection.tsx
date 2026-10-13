"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useCare } from "@/context/CareContext";
import { ArrowRight, ShieldCheck, Plane, Clock, Star, CheckCircle2, Sparkles } from "lucide-react";

export const HeroSection: React.FC = () => {
  const { openIntake } = useCare();

  return (
    <section className="relative w-full overflow-hidden min-h-[580px] sm:min-h-[640px] lg:min-h-[700px] flex items-center border-b border-[#DCE5EB] py-16 sm:py-20 lg:py-24">
      {/* Blurred Airport Background Image */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <Image
          src="/images/hero/airport-terminal-hero.jpg"
          alt="International airport terminal departure lounge"
          fill
          priority
          sizes="100vw"
          className="object-cover object-right sm:object-center scale-105 filter blur-[3px] sm:blur-[4px]"
        />

        {/* Ambient Gradient Overlay for Readability & Depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0C2338]/95 via-[#0C2338]/85 to-[#0C2338]/60" />
      </div>

      {/* Main Content Layer - 2 Column Split Layout */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-center">

          {/* Left Column (7 cols): Eyebrow, Heading, Paragraph, CTA & Social Proof */}
          <div className="lg:col-span-7 text-left space-y-6 sm:space-y-7">

            {/* Eyebrow Pill Tag with Bullet */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#087F79] animate-pulse" />
              <span className="text-white text-xs font-bold uppercase tracking-wider">
                YOUR HEALTH JOURNEY, PERSONALLY GUIDED
              </span>
            </div>

            {/* Main Headline */}
            <h1
              className="text-3xl xs:text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-[3.85rem] font-extrabold !text-white leading-[1.12] tracking-tight"
              style={{ color: "#ffffff" }}
            >
              World-Class Medical Care in India.{" "}
              <span className="text-teal-300 block mt-1.5 sm:mt-1" style={{ color: "#5eead4" }}>
                Personally Guided.
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg lg:text-xl text-slate-200 font-normal leading-relaxed max-w-xl">
              Access renowned specialists and accredited hospital suites in India, with personalized concierge coordination from your first medical review through flight transit, treatment, and recovery.
            </p>

            {/* Action Row: CTA Button + Social Proof Avatars */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-7">
              {/* Primary CTA Button */}
              <button
                onClick={() => openIntake("Hero Get a Free Medical Opinion")}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#087F79] hover:bg-[#066f6a] active:scale-95 text-white font-bold text-sm sm:text-base tracking-wide transition-all duration-300 shadow-lg shadow-[#087F79]/30 hover:shadow-xl hover:shadow-[#087F79]/40 cursor-pointer group shrink-0"
              >
                <span>Get a Free Medical Opinion</span>
                <ArrowRight className="w-4 h-4 text-white stroke-[2.5] transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              {/* Social Proof: Avatars + Reviews Tag */}
              <div className="flex items-center gap-3">
                <div className="flex items-center -space-x-2.5 shrink-0">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-md bg-slate-200">
                    <Image
                      src="/priya-sharma.jpg"
                      alt="Patient"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-md bg-slate-200">
                    <Image
                      src="/doctor-center-portrait.jpg"
                      alt="Care Specialist"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[#102B46] border-2 border-white flex items-center justify-center text-white text-xs font-bold shadow-md">
                    5k+
                  </div>
                </div>

                <div className="text-xs sm:text-sm text-slate-200 font-medium leading-tight">
                  <div className="flex items-center gap-1.5 text-amber-400 font-bold text-xs">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-white text-xs font-bold">4.9 / 5</span>
                  </div>
                  <span className="text-slate-300 text-xs block mt-0.5">
                    Over 5,000+ Patient Reviews
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column (5 cols): Blurry Frosted Glass Card with the 3 Key Assurances */}
          <div className="lg:col-span-5 w-full flex justify-center lg:justify-end">
            <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 sm:p-7 shadow-2xl text-white relative overflow-hidden group hover:border-white/30 transition-all duration-300">
              
              {/* Soft Ambient Inner Glow */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-teal-400/10 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#F0A126]/10 rounded-full blur-2xl pointer-events-none" />

              {/* Card Header */}
              <div className="relative z-10 flex items-center justify-between pb-4 mb-5 border-b border-white/15">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-teal-300 animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-wider text-teal-200">
                    CARE ASSURANCE &amp; STANDARDS
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-slate-200 bg-white/10 px-2.5 py-0.5 rounded-full border border-white/15">
                  Verified
                </span>
              </div>

              {/* 3 Well-Designed Assurance Items */}
              <div className="relative z-10 space-y-4">

                {/* Item 1: JCI & NABH Accredited Network */}
                <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="w-11 h-11 rounded-xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-300 shrink-0 shadow-xs">
                    <ShieldCheck className="w-5 h-5 text-teal-300" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white leading-snug">
                      JCI &amp; NABH Accredited Network
                    </h3>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      International clinical protocols, modular robotic operating suites &amp; certified patient safety.
                    </p>
                  </div>
                </div>

                {/* Item 2: VIP Airport Meet & Direct Transfer */}
                <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="w-11 h-11 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-[#F0A126] shrink-0 shadow-xs">
                    <Plane className="w-5 h-5 text-[#F0A126]" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white leading-snug">
                      VIP Airport Meet &amp; Direct Transfer
                    </h3>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      Dedicated AC vehicle, baggage coordination &amp; personal care coordinator greeting you at the gate.
                    </p>
                  </div>
                </div>

                {/* Item 3: Zero Waitlists • Immediate Scheduling */}
                <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="w-11 h-11 rounded-xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-300 shrink-0 shadow-xs">
                    <Clock className="w-5 h-5 text-teal-300" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white leading-snug">
                      Zero Waitlists &bull; Immediate Scheduling
                    </h3>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      Direct surgical queue slots led exclusively by senior department heads upon arrival.
                    </p>
                  </div>
                </div>

              </div>

              {/* Card Footer Microcopy */}
              <div className="relative z-10 mt-5 pt-4 border-t border-white/15 flex items-center justify-between text-xs text-slate-300">
                <span className="flex items-center gap-1.5 font-medium text-[11px] sm:text-xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-300" /> 100% Itemised Hospital Billing
                </span>
                <Link
                  href="/#why-us"
                  className="text-teal-300 hover:text-white font-semibold text-xs inline-flex items-center gap-1 transition-colors"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};



