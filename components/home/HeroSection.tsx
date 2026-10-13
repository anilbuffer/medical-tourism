"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useCare } from "@/context/CareContext";
import { ArrowRight } from "lucide-react";

export const HeroSection: React.FC = () => {
  const { openIntake } = useCare();

  return (
    <section className="relative w-full overflow-hidden bg-[#EAF5F4] text-[#102B46] pt-14 pb-16 sm:pt-18 sm:pb-20 lg:pt-20 lg:pb-24 border-b border-[#DCE5EB]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-center">

          {/* Left Column: Eyebrow, Headline, Copy, CTAs, Microcopy */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-7">

            {/* Eyebrow */}
            <div className="text-[#087F79] text-xs font-bold tracking-wider uppercase">
              YOUR HEALTH JOURNEY, PERSONALLY GUIDED
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-[3.35rem] font-bold text-[#102B46] leading-[1.14] tracking-tight">
              World-Class Medical Care in India.{" "}
              <span className="text-[#087F79] block mt-1">
                Personally Guided.
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-[#627486] font-normal leading-relaxed max-w-xl">
              Access experienced specialists and leading hospitals in India, with personalized coordination from your first medical review through treatment and recovery.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-5">
              {/* Primary CTA Pill */}
              <button
                onClick={() => openIntake("Hero Get a Free Medical Opinion")}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 sm:py-4 rounded-full bg-[#087F79] hover:bg-[#066f6a] active:scale-95 text-white font-semibold text-sm sm:text-base tracking-wide transition-all duration-300 shadow-md shadow-[#087F79]/20 hover:shadow-lg hover:shadow-[#087F79]/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087F79] cursor-pointer group"
              >
                <span>Get a Free Medical Opinion</span>
                <ArrowRight className="w-4 h-4 text-white stroke-[2.5] transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              {/* Secondary CTA */}
              <Link
                href="/#treatments"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 sm:py-4 rounded-full bg-white hover:bg-white/80 active:scale-95 text-[#102B46] border border-[#DCE5EB] font-semibold text-sm sm:text-base tracking-wide transition-all duration-300 shadow-2xs hover:border-[#087F79]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087F79]"
              >
                <span>Explore Treatments</span>
              </Link>
            </div>

            {/* Trust Microcopy */}
            <div className="pt-2">
              <p className="text-xs sm:text-sm text-[#627486] font-medium flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#087F79]" />
                <span>Personal guidance. Clear next steps. Support throughout your journey.</span>
              </p>
            </div>

          </div>

          {/* Right Column: Authentic Healthcare Photograph */}
          <div className="lg:col-span-5 relative">
            <div className="relative w-full h-[360px] xs:h-[420px] sm:h-[460px] lg:h-[500px] rounded-3xl overflow-hidden shadow-lg border border-[#DCE5EB] bg-slate-100">
              <Image
                src="/hero-doctor-patient.jpg"
                alt="Compassionate healthcare specialist consulting with patient in modern hospital"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover object-center"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
