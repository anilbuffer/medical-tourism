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
          src="/hero-image.png"
          alt="Personalized Medical Travel and Quaternary Care in India"
          fill
          priority
          quality={95}
          className="object-cover object-center"
        />
        {/* Subtle black gradient overlay for text & navbar readability (NO dark blue) */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 lg:bg-gradient-to-l lg:from-black/85 lg:via-black/50 lg:to-transparent"></div>
      </div>

      {/* ── Main Hero Content ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="max-w-2xl ml-auto text-center lg:text-right">
          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-white mb-6 drop-shadow-md">
            World-Class Care.<br />
            Personally<br />
            Coordinated.
          </h1>

          {/* Supporting Narrative */}
          <p className="text-base sm:text-lg text-slate-100 font-medium leading-relaxed mb-8 drop-shadow-sm max-w-xl lg:ml-auto">
            Access India&apos;s top 1% quaternary hospital network and board-certified chief
            surgeons. Complete end-to-end medical travel, express visa, and
            dedicated personal coordination.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-end gap-4 mb-8">
            <button
              onClick={() => openIntake()}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-sm sm:text-base font-bold text-vedara-deep bg-vedara-gold hover:bg-vedara-gold-hover shadow-lg transition-all cursor-pointer"
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
          <div className="flex flex-wrap items-center justify-center lg:justify-end gap-x-6 gap-y-3 text-sm font-medium text-white shadow-sm">
            <span className="flex items-center gap-1.5 drop-shadow-md">
              <span className="text-vedara-cyan">🎁</span> Free assessment
            </span>
            <span className="flex items-center gap-1.5 drop-shadow-md">
              <span className="text-vedara-cyan">🏥</span> You pay the hospital, never us
            </span>
            <span className="flex items-center gap-1.5 drop-shadow-md">
              <span className="text-vedara-cyan">🚫</span> No obligation
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
