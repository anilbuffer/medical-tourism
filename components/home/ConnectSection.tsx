"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Lock, CheckCircle2, Mail } from "lucide-react";
import { useCare } from "@/context/CareContext";

export const ConnectSection: React.FC = () => {
  const { openIntake } = useCare();

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Master Conversion Banner Card */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#102B46] via-[#123656] to-[#087F79] p-8 sm:p-12 lg:p-14 shadow-xl border border-white/15 text-white">

          {/* Ambient lighting glows */}
          <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-gradient-to-bl from-[#087F79]/40 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-gradient-to-tr from-[#102B46]/80 to-transparent rounded-full blur-2xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center relative z-10">

            {/* Left Column: Heading, Subhead, CTAs */}
            <div className="lg:col-span-7 space-y-5 sm:space-y-6">

              {/* Eyebrow Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#EAF5F4] text-xs font-semibold tracking-wider uppercase">
                <Lock className="w-3.5 h-3.5 text-[#DDA34A]" />
                <span>START YOUR JOURNEY TODAY</span>
              </div>

              {/* Headline */}
              <h2 className="text-2xl sm:text-3xl lg:text-[2.6rem] font-bold text-white tracking-tight leading-tight">
                Start the First Step on Your Medical Journey
              </h2>

              {/* Supporting Copy */}
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-lg font-normal">
                Receive a free, confidential medical evaluation and itemized cost estimate from leading Indian hospitals within 24–48 hours.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4">
                {/* Primary CTA Button */}
                <button
                  onClick={() => openIntake("Final Conversion CTA")}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-white hover:bg-[#EAF5F4] text-[#102B46] font-bold text-sm tracking-wide transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <span>Get a Free Medical Opinion</span>
                  <ArrowRight className="w-4 h-4 text-[#087F79] stroke-[2.5] transition-transform duration-200 group-hover:translate-x-1" />
                </button>

                {/* Secondary CTA Button */}
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/25 backdrop-blur-md font-semibold text-sm tracking-wide transition-all duration-200 shadow-sm hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <Mail className="w-4 h-4 text-white/90" />
                  <span>Contact Our Care Team</span>
                </Link>
              </div>

              {/* Reassurance Ticks */}
              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-200">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#2ECDC5]" />
                  <span>100% Confidential</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#2ECDC5]" />
                  <span>No Obligations</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#2ECDC5]" />
                  <span>24/7 Global Liaison</span>
                </div>
              </div>

            </div>

            {/* Right Column: Warm Photograph */}
            <div className="lg:col-span-5 relative">
              <div className="relative w-full h-[280px] sm:h-[340px] lg:h-[380px] rounded-2xl overflow-hidden shadow-xl border border-white/20 bg-slate-900">
                <Image
                  src="/images/connect/care-bedside.jpg"
                  alt="Doctor and care coordinator reviewing treatment options with patient"
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#102B46]/70 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-3 left-3 right-3 bg-[#102B46]/90 backdrop-blur-md rounded-xl p-3 border border-white/20 text-xs text-slate-200 flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-[#087F79] flex items-center justify-center text-white shrink-0">
                    <Lock className="w-3.5 h-3.5 text-[#DDA34A]" />
                  </div>
                  <div>
                    <p className="font-semibold text-white text-xs">Direct Hospital Pricing</p>
                    <p className="text-[11px] text-slate-300">Fast 24–48h confidential coordinator response</p>
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
