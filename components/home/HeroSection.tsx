"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useCare } from "@/context/CareContext";
import { ArrowRight, ShieldCheck, Plane, Clock, Star } from "lucide-react";

export const HeroSection: React.FC = () => {
  const { openIntake } = useCare();

  return (
    <section className="relative w-full overflow-hidden min-h-[580px] sm:min-h-[640px] lg:min-h-[700px] flex items-center border-b border-[#DCE5EB] py-20 sm:py-24 lg:py-28">
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

        {/* Left-Aligned Gradient Overlay for Maximum Text Contrast (as in reference image) */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0C2338]/95 via-[#0C2338]/85 to-[#0C2338]/40 sm:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C2338]/80 via-transparent to-[#0C2338]/40 sm:hidden" />
      </div>

      {/* Main Content Layer - Left-Aligned Container */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="max-w-2xl lg:max-w-3xl text-left space-y-6 sm:space-y-7">

          {/* Eyebrow Pill Tag with Bullet */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#087F79] animate-pulse" />
            <span className="text-white text-xs font-bold uppercase tracking-wider">
              YOUR HEALTH JOURNEY, PERSONALLY GUIDED
            </span>
          </div>

          {/* Main Headline */}
          <h1
            className="text-3xl xs:text-4xl sm:text-5xl lg:text-[3.65rem] font-extrabold !text-white leading-[1.12] tracking-tight"
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

          {/* Action Row: CTA Button + Social Proof Avatars (matching reference image) */}
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

          {/* Trust Highlights Strip */}
          <div className="pt-6 border-t border-white/15 flex flex-wrap items-center gap-5 sm:gap-8 text-xs sm:text-sm text-slate-300 font-medium">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-teal-300 shrink-0" />
              <span>JCI &amp; NABH Accredited Network</span>
            </div>
            <div className="flex items-center gap-2">
              <Plane className="w-4 h-4 text-[#F0A126] shrink-0" />
              <span>VIP Airport Meet &amp; Direct Transfer</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-teal-300 shrink-0" />
              <span>Zero Waitlists &bull; Immediate Scheduling</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};


