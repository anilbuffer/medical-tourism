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

          {/* Right Column (5 cols): Blurry Frosted Glass Card with the 3 Key Assurances */}
          {/* Right Column (5 cols): Highly Highlighted Luminous Luxury Stepper Card */}
          <div className="lg:col-span-5 w-full flex justify-center lg:justify-end">
            <div className="w-full max-w-md bg-white/95 backdrop-blur-2xl border-2 border-white rounded-3xl p-6 sm:p-7 shadow-[0_24px_60px_-12px_rgba(0,0,0,0.4)] text-[#102B46] relative overflow-hidden group hover:shadow-[0_28px_70px_-10px_rgba(8,127,121,0.3)] transition-all duration-300">

              {/* Ambient Highlighting Glow Orbs */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#087F79]/15 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#F0A126]/15 rounded-full blur-2xl pointer-events-none" />

              {/* Card Header Bar */}
              <div className="relative z-10 flex items-center justify-between pb-4 mb-4 border-b border-[#DCE5EB]">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EAF5F4] border border-[#087F79]/30 shadow-2xs">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#087F79] animate-pulse" />
                  <span className="text-xs font-extrabold uppercase tracking-wider text-[#087F79]">
                    CARE ASSURANCE &amp; STANDARDS
                  </span>
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#087F79] text-white text-[11px] font-bold shadow-xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-white" />
                  <span>Verified</span>
                </span>
              </div>

              {/* Connected Visual Assurance Steps */}
              <div className="relative z-10 space-y-3.5">

                {/* Vertical Continuous Connecting Timeline Rail */}
                <div className="absolute left-[23px] top-6 bottom-6 w-0.5 bg-gradient-to-b from-[#087F79] via-[#F0A126] to-[#087F79] z-0 opacity-40 pointer-events-none" />

                {/* Step 01: JCI & NABH Accredited Network */}
                <div className="relative z-10 p-3.5 sm:p-4 rounded-2xl bg-white hover:bg-[#EAF5F4]/60 border border-[#DCE5EB] hover:border-[#087F79] shadow-xs hover:shadow-md transition-all duration-200 group/step">
                  <div className="flex items-start gap-3.5">
                    {/* Stepper Node & Icon */}
                    <div className="relative shrink-0">
                      <div className="w-11 h-11 rounded-2xl bg-[#EAF5F4] border-2 border-white flex items-center justify-center text-[#087F79] shadow-sm group-hover/step:scale-105 group-hover/step:bg-[#087F79] group-hover/step:text-white transition-all duration-200">
                        <ShieldCheck className="w-5 h-5 transition-colors" />
                      </div>
                      <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#087F79] text-white text-[9px] font-extrabold flex items-center justify-center shadow-xs">
                        1
                      </span>
                    </div>

                    {/* Step Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1.5 mb-0.5">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#087F79]">
                          STEP 01 &bull; ACCREDITATION
                        </span>
                        <span className="text-[10px] font-bold text-[#087F79] bg-[#EAF5F4] px-2 py-0.5 rounded-full border border-[#087F79]/20">
                          Top Tier
                        </span>
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-[#102B46] leading-snug group-hover/step:text-[#087F79] transition-colors">
                        JCI &amp; NABH Accredited Network
                      </h3>
                      <p className="text-xs text-[#627486] mt-1 leading-relaxed font-normal">
                        International clinical protocols, modular robotic operating suites &amp; certified patient safety.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step 02: VIP Airport Meet & Direct Transfer */}
                <div className="relative z-10 p-3.5 sm:p-4 rounded-2xl bg-white hover:bg-amber-50/60 border border-[#DCE5EB] hover:border-[#F0A126] shadow-xs hover:shadow-md transition-all duration-200 group/step">
                  <div className="flex items-start gap-3.5">
                    {/* Stepper Node & Icon */}
                    <div className="relative shrink-0">
                      <div className="w-11 h-11 rounded-2xl bg-amber-50 border-2 border-white flex items-center justify-center text-[#D97706] shadow-sm group-hover/step:scale-105 group-hover/step:bg-[#D97706] group-hover/step:text-white transition-all duration-200">
                        <Plane className="w-5 h-5 transition-colors" />
                      </div>
                      <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#D97706] text-white text-[9px] font-extrabold flex items-center justify-center shadow-xs">
                        2
                      </span>
                    </div>

                    {/* Step Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1.5 mb-0.5">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#D97706]">
                          STEP 02 &bull; ARRIVAL &amp; TRANSIT
                        </span>
                        <span className="text-[10px] font-bold text-[#D97706] bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                          15–20m Corridor
                        </span>
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-[#102B46] leading-snug group-hover/step:text-[#D97706] transition-colors">
                        VIP Airport Meet &amp; Direct Transfer
                      </h3>
                      <p className="text-xs text-[#627486] mt-1 leading-relaxed font-normal">
                        Dedicated AC vehicle, baggage coordination &amp; personal care coordinator greeting you at the gate.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step 03: Zero Waitlists • Immediate Scheduling */}
                <div className="relative z-10 p-3.5 sm:p-4 rounded-2xl bg-white hover:bg-teal-50/60 border border-[#DCE5EB] hover:border-[#087F79] shadow-xs hover:shadow-md transition-all duration-200 group/step">
                  <div className="flex items-start gap-3.5">
                    {/* Stepper Node & Icon */}
                    <div className="relative shrink-0">
                      <div className="w-11 h-11 rounded-2xl bg-teal-50 border-2 border-white flex items-center justify-center text-[#087F79] shadow-sm group-hover/step:scale-105 group-hover/step:bg-[#087F79] group-hover/step:text-white transition-all duration-200">
                        <Clock className="w-5 h-5 transition-colors" />
                      </div>
                      <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#087F79] text-white text-[9px] font-extrabold flex items-center justify-center shadow-xs">
                        3
                      </span>
                    </div>

                    {/* Step Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1.5 mb-0.5">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#087F79]">
                          STEP 03 &bull; FAST-TRACK ACCESS
                        </span>
                        <span className="text-[10px] font-bold text-[#087F79] bg-teal-50 px-2 py-0.5 rounded-full border border-[#087F79]/20">
                          Priority Slot
                        </span>
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-[#102B46] leading-snug group-hover/step:text-[#087F79] transition-colors">
                        Zero Waitlists &bull; Immediate Scheduling
                      </h3>
                      <p className="text-xs text-[#627486] mt-1 leading-relaxed font-normal">
                        Direct surgical queue slots led exclusively by senior department heads upon arrival.
                      </p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Card Footer Strip */}
              <div className="relative z-10 mt-4 pt-3.5 border-t border-[#DCE5EB] flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 font-semibold text-[#102B46] text-[11px] sm:text-xs">
                  <CheckCircle2 className="w-4 h-4 text-[#087F79] shrink-0" />
                  <span>100% Itemised Hospital Billing</span>
                </span>
                <Link
                  href="/#why-us"
                  className="text-[#087F79] hover:text-[#066f6a] font-bold text-xs inline-flex items-center gap-1 transition-colors px-2 py-1 rounded-md hover:bg-[#EAF5F4]"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};



