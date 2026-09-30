"use client";

import React from "react";
import Image from "next/image";
import { useCare } from "@/context/CareContext";

export const HeroSection = () => {
  const { openIntake } = useCare();

  return (
    <section className="relative min-h-[80vh] flex flex-col justify-center pt-32 pb-24">
      {/* ── Background Image ── */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&q=80"
          alt="World-Class Hospital Background"
          fill
          priority
          className="object-cover"
        />
        {/* Subtle black gradient for text readability (NO dark blue) */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
      </div>

      {/* ── Main Hero Content ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="max-w-2xl text-center lg:text-left">
          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-white mb-6">
            World-Class Care.<br />
            Personally<br />
            Coordinated.
          </h1>

          {/* Supporting Narrative */}
          <p className="text-base sm:text-lg text-slate-100 font-medium leading-relaxed mb-8">
            Access India&apos;s top 1% quaternary hospital network and board-certified chief
            surgeons. Complete end-to-end medical travel, express visa, and
            dedicated personal coordination.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-8">
            <button
              onClick={() => openIntake()}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-sm sm:text-base font-bold text-white bg-[#031126] hover:bg-[#06203D] shadow-lg transition-all"
            >
              Send us the reports
            </button>
            <a
              href="#journey"
              className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-3.5 text-sm font-semibold text-slate-200 hover:text-white transition-colors underline underline-offset-4"
            >
              See how it works &rarr;
            </a>
          </div>

          {/* Trust Highlights */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-3 text-sm font-medium text-white shadow-sm">
            <span className="flex items-center gap-1.5 drop-shadow-md">
              <span className="text-[#2ECDC5]">🎁</span> Free assessment
            </span>
            <span className="flex items-center gap-1.5 drop-shadow-md">
              <span className="text-[#2ECDC5]">🏥</span> You pay the hospital, never us
            </span>
            <span className="flex items-center gap-1.5 drop-shadow-md">
              <span className="text-[#2ECDC5]">🚫</span> No obligation
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
