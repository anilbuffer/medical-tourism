"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Lock, CheckCircle2, Mail, ShieldCheck } from "lucide-react";
import { useCare } from "@/context/CareContext";

export const ConnectSection: React.FC = () => {
  const { openIntake } = useCare();

  return (
    <section className="relative w-full overflow-hidden min-h-[540px] sm:min-h-[580px] lg:min-h-[640px] flex items-center bg-white border-t border-[#DCE5EB] py-16 sm:py-20 lg:py-24">
      {/* Background Bedside Photograph (Full Width) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <Image
          src="/images/connect/care-bedside.jpg"
          alt="Compassionate healthcare coordinator and patient care at hospital bedside"
          fill
          priority
          sizes="100vw"
          className="object-cover object-right sm:object-center"
        />

        {/* White Gradient Shade Overlay for Crisp Readability & Contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/40 lg:via-white/90 lg:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/90 to-white/50 lg:hidden" />

        {/* Ambient Subtle Teal Glow */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-[#087F79]/5 rounded-full blur-3xl pointer-events-none" />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="max-w-2xl space-y-6 sm:space-y-7">
          
          {/* Eyebrow Pill Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF5F4] border border-[#087F79]/20 shadow-2xs mb-1">
            <span className="w-2 h-2 rounded-full bg-[#087F79] animate-pulse" />
            <span className="text-[#087F79] text-xs font-bold uppercase tracking-wider">
              START YOUR JOURNEY TODAY
            </span>
          </div>

          {/* Main Headline */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#102B46] tracking-tight leading-tight">
            Start the First Step on Your
            <span className="block mt-1.5 text-[#087F79]">Medical Journey</span>
          </h2>

          {/* Supporting Copy */}
          <p className="text-[#627486] text-sm sm:text-base leading-relaxed font-normal max-w-xl">
            Receive a free, confidential medical evaluation and itemized cost estimate from leading Indian hospital specialists within 24–48 hours.
          </p>

          {/* Action Row: CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4">
            {/* Primary CTA Button */}
            <button
              onClick={() => openIntake("Final Conversion CTA")}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-[#087F79] hover:bg-[#066f6a] text-white font-bold text-sm tracking-wide transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087F79]"
            >
              <span>Get a Free Medical Opinion</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            {/* Secondary CTA Button */}
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-white hover:bg-[#EAF5F4] text-[#102B46] hover:text-[#087F79] border border-[#DCE5EB] hover:border-[#087F79]/40 font-semibold text-sm tracking-wide transition-all duration-200 shadow-sm hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087F79]"
            >
              <Mail className="w-4 h-4 text-[#087F79]" />
              <span>Contact Our Care Team</span>
            </Link>
          </div>

          {/* Trust Checkmarks */}
          <div className="pt-2 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-[#102B46] font-medium">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#087F79]" />
              <span>100% Confidential</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#087F79]" />
              <span>No Obligations</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#087F79]" />
              <span>24/7 Global Liaison</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#087F79]" />
              <span>Direct Hospital Pricing</span>
            </div>
          </div>

        </div>

        {/* Floating Quality Assurance Card on Desktop (Right Side) */}
        <div className="hidden lg:block absolute bottom-12 right-8 xl:right-12 z-10 max-w-xs">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 border border-[#DCE5EB] shadow-lg flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#EAF5F4] flex items-center justify-center text-[#087F79] shrink-0">
              <Lock className="w-5 h-5 text-[#087F79]" />
            </div>
            <div>
              <p className="font-bold text-[#102B46] text-xs">Direct Hospital Pricing</p>
              <p className="text-[11px] text-[#627486] mt-0.5">Fast 24–48h confidential coordinator response</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

