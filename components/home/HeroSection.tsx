"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useCare } from "@/context/CareContext";
import { ArrowRight, ShieldCheck, Plane, Clock, Sparkles } from "lucide-react";

export const HeroSection: React.FC = () => {
  const { openIntake } = useCare();

  return (
    <section className="relative w-full overflow-hidden min-h-[580px] sm:min-h-[640px] lg:min-h-[680px] flex items-center justify-center border-b border-[#DCE5EB] py-20 sm:py-24 lg:py-28">
      {/* Blurred Airport Background Image */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <Image
          src="/images/hero/airport-terminal-hero.jpg"
          alt="International airport terminal departure lounge"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-105 filter blur-[4px] sm:blur-[5px]"
        />

        {/* Ambient Gradient Overlays for High Contrast & Readability */}
        <div className="absolute inset-0 bg-white/70 backdrop-blur-[1px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#EAF5F4]/90 via-white/55 to-[#EAF5F4]/90" />
      </div>

      {/* Main Content Layer */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center">
        <div className="max-w-3xl mx-auto space-y-6 sm:space-y-7">

          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-[#DCE5EB] shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#087F79] animate-pulse" />
            <span className="text-[#087F79] text-xs font-bold uppercase tracking-wider">
              YOUR HEALTH JOURNEY, PERSONALLY GUIDED
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold text-[#102B46] leading-[1.12] tracking-tight">
            World-Class Medical Care in India.{" "}
            <span className="text-[#087F79] block mt-1">
              Personally Guided.
            </span>
          </h1>

          {/* Supporting Copy */}
          <p className="text-base sm:text-lg lg:text-xl text-[#41556B] font-normal leading-relaxed max-w-2xl mx-auto">
            Access renowned specialists and accredited hospital suites in India, with personalized concierge coordination from your first medical review through treatment and recovery.
          </p>

          {/* CTAs */}
          <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 sm:gap-5">
            {/* Primary CTA Pill */}
            <button
              onClick={() => openIntake("Hero Get a Free Medical Opinion")}
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#087F79] hover:bg-[#066f6a] active:scale-95 text-white font-bold text-sm sm:text-base tracking-wide transition-all duration-300 shadow-lg shadow-[#087F79]/30 hover:shadow-xl hover:shadow-[#087F79]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087F79] cursor-pointer group"
            >
              <span>Get a Free Medical Opinion</span>
              <ArrowRight className="w-4 h-4 text-white stroke-[2.5] transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            {/* Secondary CTA */}
            <Link
              href="/#treatments"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white hover:bg-white/90 active:scale-95 text-[#102B46] border border-[#DCE5EB] font-bold text-sm sm:text-base tracking-wide transition-all duration-300 shadow-sm hover:border-[#087F79]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087F79]"
            >
              <span>Explore Treatments</span>
            </Link>
          </div>

          {/* Trust Highlights */}
          <div className="pt-8 border-t border-[#102B46]/10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-[#52667A] font-medium">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#087F79]" />
              <span>JCI &amp; NABH Accredited Network</span>
            </div>
            <div className="flex items-center gap-2">
              <Plane className="w-4 h-4 text-[#F0A126]" />
              <span>VIP Airport Meet &amp; Direct Transfer</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#087F79]" />
              <span>Zero Waitlists &bull; Immediate Scheduling</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

