"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Lock, CheckCircle2, Mail, ShieldCheck } from "lucide-react";
import { useCare } from "@/context/CareContext";

export const ConnectSection: React.FC = () => {
  const { openIntake } = useCare();

  return (
    <section className="relative w-full overflow-hidden min-h-[560px] sm:min-h-[600px] lg:min-h-[640px] flex items-center bg-white border-t border-[#DCE5EB] py-14 sm:py-20 lg:py-24">
      {/* ========================================================
          FULL-WIDTH BACKGROUND BEDSIDE PHOTOGRAPH & GRADIENTS
         ======================================================== */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* On desktop (lg+), the photo is anchored on the right half so the nurse & patient are clearly visible and unobstructed */}
        <div className="absolute top-0 bottom-0 right-0 w-full lg:w-[58%] xl:w-[55%] overflow-hidden">
          <Image
            src="/images/connect/care-bedside.jpg"
            alt="Compassionate healthcare coordinator supporting patient at hospital bedside"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="object-cover object-[70%_25%] sm:object-[65%_25%] lg:object-[45%_25%]"
          />

          {/* Smooth Horizontal White Gradient Fade from Left Edge of Photo */}
          <div className="hidden lg:block absolute inset-y-0 left-0 w-48 xl:w-64 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
        </div>

        {/* Mobile & Tablet Soft White Shade Overlay */}
        <div className="lg:hidden absolute inset-0 bg-gradient-to-b from-white/92 via-white/85 to-white/90 backdrop-blur-xs z-10" />

        {/* Solid White Left Canvas for Desktop Typography */}
        <div className="hidden lg:block absolute inset-y-0 left-0 w-[45%] bg-white z-0" />

        {/* Ambient Subtle Brand Teal Glow for Added Depth */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] lg:w-[700px] h-[500px] lg:h-[700px] bg-[#087F79]/5 rounded-full blur-3xl pointer-events-none z-1" />
      </div>

      {/* ========================================================
          CONTENT CONTAINER & ULTRA PREMIUM RESPONSIVE LAYOUT
         ======================================================== */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* On Mobile/Tablet: Frosted Glass Protective Card; On Desktop: Clean Integrated Layout */}
        <div className="max-w-2xl lg:max-w-2xl bg-white/85 sm:bg-white/80 lg:bg-transparent backdrop-blur-md lg:backdrop-blur-none p-6 sm:p-8 lg:p-0 rounded-3xl lg:rounded-none border border-white/80 lg:border-none shadow-xl lg:shadow-none space-y-6 sm:space-y-7">
          
          {/* Eyebrow Pill Tag */}
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF5F4] border border-[#087F79]/20 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#087F79] animate-pulse" />
              <span className="text-[#087F79] text-xs font-bold uppercase tracking-wider">
                START YOUR JOURNEY TODAY
              </span>
            </div>
          </div>

          {/* Main Headline */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#102B46] tracking-tight leading-tight">
            Start the First Step on Your
            <span className="block mt-1 sm:mt-1.5 text-[#087F79]">Medical Journey</span>
          </h2>

          {/* Supporting Copy */}
          <p className="text-[#627486] text-sm sm:text-base leading-relaxed font-normal max-w-xl">
            Receive a free, confidential medical evaluation and itemized cost estimate from leading Indian hospital specialists within 24–48 hours.
          </p>

          {/* Action Row: Primary & Secondary CTAs */}
          <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            {/* Primary Action Button */}
            <button
              onClick={() => openIntake("Final Conversion CTA")}
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 rounded-lg bg-[#087F79] hover:bg-[#066f6a] text-white font-bold text-sm tracking-wide transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087F79] active:scale-[0.99]"
            >
              <span>Get a Free Medical Opinion</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            {/* Secondary Action Button */}
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 rounded-lg bg-white hover:bg-[#EAF5F4] text-[#102B46] hover:text-[#087F79] border border-[#DCE5EB] hover:border-[#087F79]/40 font-semibold text-sm tracking-wide transition-all duration-200 shadow-sm hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087F79] active:scale-[0.99]"
            >
              <Mail className="w-4 h-4 text-[#087F79]" />
              <span>Contact Our Care Team</span>
            </Link>
          </div>

          {/* Trust Checkmarks Grid */}
          <div className="pt-2 grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-3 sm:gap-5 lg:gap-6 text-xs text-[#102B46] font-medium">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#087F79] shrink-0" />
              <span>100% Confidential</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#087F79] shrink-0" />
              <span>No Obligations</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#087F79] shrink-0" />
              <span>24/7 Global Liaison</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#087F79] shrink-0" />
              <span>Direct Hospital Pricing</span>
            </div>
          </div>

          {/* Mobile Direct Hospital Pricing Assurance Pill */}
          <div className="lg:hidden pt-1">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#F8FAFC] border border-[#DCE5EB] text-[11px] text-[#627486]">
              <Lock className="w-3.5 h-3.5 text-[#087F79] shrink-0" />
              <span>Fast 24–48h confidential coordinator response</span>
            </div>
          </div>

        </div>

        {/* Floating Quality Assurance Card on Desktop (Right Side) */}
        <div className="hidden lg:block absolute bottom-12 right-8 xl:right-12 z-10 max-w-xs">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 border border-[#DCE5EB] shadow-xl flex items-center gap-3.5 hover:shadow-2xl transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-[#EAF5F4] flex items-center justify-center text-[#087F79] shrink-0 border border-[#087F79]/20">
              <Lock className="w-5 h-5 text-[#087F79]" />
            </div>
            <div>
              <p className="font-bold text-[#102B46] text-xs">Direct Hospital Pricing</p>
              <p className="text-[11px] text-[#627486] mt-0.5 leading-snug">Fast 24–48h confidential coordinator response</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

