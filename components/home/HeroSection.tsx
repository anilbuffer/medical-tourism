"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useCare } from "@/context/CareContext";
import { ArrowRight, ShieldCheck, Plane, Clock, Star, CheckCircle2, Sparkles } from "lucide-react";

export const HeroSection: React.FC = () => {
  const { openIntake } = useCare();

  return (
    <section className="relative w-full overflow-hidden min-h-[680px] sm:min-h-[760px] lg:min-h-[820px] xl:min-h-[860px] flex items-center border-b border-[#DCE5EB] py-20 sm:py-28 lg:py-32 xl:py-36">
      {/* Indian Medical Care Floor Scenario Background with Atmospheric Blur */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <Image
          src="/images/connect/indian-medical-care-floor.jpg"
          alt="Modern Indian medical care hospital floor scenario with doctors, patient suites, and caring clinical staff"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center lg:object-[65%_35%] scale-105 filter blur-[2px] sm:blur-[3px]"
        />

        {/* Ambient Gradient Overlay for Readability & Depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0C2338]/80 via-[#0C2338]/60 to-[#0C2338]/40" />
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
              className="text-3xl xs:text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-[3.85rem] font-bold !text-white leading-[1.12] tracking-tight"
              style={{ color: "#ffffff" }}
            >
              World-Class Medical Care in India.{" "}
              <span className="text-teal-300 block mt-1.5 sm:mt-1" style={{ color: "#5eead4" }}>
                Personally Guided.
              </span>
            </h1>

            {/* Action Row: CTA Button + Social Proof Avatars */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-7">
              {/* Primary CTA Button */}
              <button
                onClick={() => openIntake("Hero Get a Free Medical Opinion")}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-lg bg-[#087F79] hover:bg-[#066f6a] active:scale-[0.98] text-white font-bold text-sm sm:text-base tracking-wide transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer group shrink-0"
              >
                <span>Get a Free Medical Opinion</span>
                <ArrowRight className="w-4 h-4 text-white stroke-[2.2] transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            </div>

          </div>



        </div>
      </div>
    </section>
  );
};



