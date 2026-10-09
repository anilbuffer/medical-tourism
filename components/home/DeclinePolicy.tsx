"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, CheckCircle, ShieldCheck } from "lucide-react";
import { useCare } from "@/context/CareContext";

export const DeclinePolicy = () => {
  const { openIntake } = useCare();
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <>
      <section className="relative overflow-hidden bg-[#0A2540] text-white py-16 sm:py-20 lg:py-24 font-sans border-t border-[#DCE6EB]">
        {/* 01. High-Resolution Clinical Photography Background */}
        <div className="absolute inset-0 pointer-events-none select-none z-0">
          <Image
            src="/images/clinical-integrity-banner.jpg"
            alt="Senior specialist surgeons evaluating medical case diagnostics"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          {/* Deep Navy/Blue Clinical Color Overlay matching reference style */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0C2338]/95 via-[#0A2E4E]/90 to-[#0C2338]/95 backdrop-blur-[0.5px]" />
        </div>

        {/* 02. Section Content Layer */}
        <div className="max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

            {/* Left Column: Clinical Integrity Guarantee Content & Action Buttons */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#ECF4F7] font-heading text-xs uppercase tracking-wider font-bold mb-4 backdrop-blur-md w-max">
                <span className="w-2 h-2 rounded-full bg-[#14B8A6] animate-pulse" />
                <span>CLINICAL INTEGRITY GUARANTEE</span>
              </div>

              {/* Main Headline */}
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] xl:text-[46px] font-heading font-extrabold text-white leading-[1.15] mb-4 tracking-tight max-w-3xl">
                If we believe a procedure isn&apos;t right for you, or cannot ensure the highest standard of care, we simply won&apos;t arrange it.
              </h2>

              {/* Description Body */}
              <p className="text-sm sm:text-base text-white/85 leading-relaxed max-w-2xl mb-8 font-normal">
                We are not a booking agency or medical broker. We are an international clinical concierge. Our reputation rests entirely on your clinical outcome and long-term wellbeing.
              </p>

              {/* Action Buttons Row: [Learn About Clinical Feasibility] AND [Watch Video] Side-by-Side */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-5 mb-8">
                {/* Primary Action Button 1: bg-[#F0A126] */}
                <button
                  onClick={() => openIntake("Clinical Integrity Consultation")}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#F0A126] hover:bg-[#db8e18] active:scale-[0.98] text-[#0C2338] font-heading font-bold text-xs uppercase tracking-wider shadow-xl transition-all cursor-pointer group shrink-0"
                >
                  <span>Learn About Clinical Feasibility</span>
                  <span className="text-[#0C2338] font-extrabold text-sm transition-transform group-hover:translate-x-1">→</span>
                </button>

                {/* Secondary Action Button 2: bg-[#0B5D68] hover:bg-[#07434B] text-white */}
                <button
                  onClick={() => setVideoOpen(true)}
                  className="inline-flex items-center gap-3 px-6 py-3.5 rounded-xl bg-[#0B5D68] hover:bg-[#07434B] active:scale-[0.98] border border-[#14B8A6]/30 text-white cursor-pointer transition-all group select-none shadow-lg shrink-0"
                  aria-label="Watch Clinical Protocol Video"
                >
                  <div className="w-8 h-8 rounded-full bg-white text-[#0C2338] flex items-center justify-center shadow-md group-hover:bg-[#F0A126] group-hover:text-[#0C2338] transition-all shrink-0">
                    <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                  </div>
                  <span className="font-heading font-bold text-xs tracking-wider uppercase text-white group-hover:text-[#F0A126] transition-colors whitespace-nowrap">
                    WATCH VIDEO
                  </span>
                </button>
              </div>

              {/* 3 Key Trust Pillars */}
              <div className="flex flex-wrap items-center gap-2.5 text-xs sm:text-sm text-white/90">
                <span className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/15 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#14B8A6]" />
                  Independent Senior Specialist Review
                </span>
                <span className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/15 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#14B8A6]" />
                  Zero Financial Pressure or Booking Quotas
                </span>
                <span className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/15 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#14B8A6]" />
                  Direct Communication With Your Home Physician
                </span>
              </div>
            </div>

            {/* Right Column: Big Security Shield Badge Aligned with Left Content Height */}
            <div className="lg:col-span-5 flex items-center justify-center lg:justify-end">
              <div className="relative w-[320px] sm:w-[380px] lg:w-[420px] xl:w-[460px] h-[400px] sm:h-[460px] lg:h-[490px] xl:h-[510px] flex flex-col items-center justify-center select-none group transition-transform duration-500 hover:scale-[1.02]">
                
                {/* Custom Scaled SVG Shield Silhouette */}
                <svg
                  viewBox="0 0 320 380"
                  className="absolute inset-0 w-full h-full drop-shadow-[0_30px_60px_rgba(0,0,0,0.8)]"
                >
                  <defs>
                    <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#0A243A" stopOpacity="0.98" />
                      <stop offset="50%" stopColor="#081D2F" stopOpacity="0.96" />
                      <stop offset="100%" stopColor="#05131F" stopOpacity="0.98" />
                    </linearGradient>
                  </defs>

                  {/* Outer Shield Path */}
                  <path
                    d="M 160, 12 C 200, 12 250, 22 296, 48 C 296, 150 280, 245 160, 368 C 40, 245 24, 150 24, 48 C 70, 22 120, 12 160, 12 Z"
                    fill="url(#shieldGrad)"
                    stroke="rgba(255, 255, 255, 0.55)"
                    strokeWidth="4"
                  />
                  {/* Inner Accent Contour */}
                  <path
                    d="M 160, 24 C 196, 24 240, 33 282, 56 C 282, 146 268, 232 160, 348 C 52, 232 38, 146 38, 56 C 80, 33 124, 24 160, 24 Z"
                    fill="none"
                    stroke="#14B8A6"
                    strokeWidth="2"
                    strokeOpacity="0.8"
                  />
                </svg>

                {/* Shield Content Layer (Centered & Proportional) */}
                <div className="relative z-10 flex flex-col items-center justify-center px-6 pt-2 text-center">
                  
                  {/* Row of Overlapping Doctor Avatars (Large & Impactful) */}
                  <div className="flex items-center justify-center mb-4 sm:mb-5 pt-2">
                    {/* Doctor 1 (Far Left) */}
                    <div className="relative w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full overflow-hidden border-2 border-white/60 -mr-3 sm:-mr-4 opacity-80 bg-slate-200 shrink-0 shadow-sm">
                      <Image
                        src="/vikas-gupta.png"
                        alt="Specialist"
                        fill
                        className="object-cover object-top"
                      />
                    </div>

                    {/* Doctor 2 (Mid Left) */}
                    <div className="relative w-14 h-14 sm:w-16 sm:h-16 lg:w-18 lg:h-18 rounded-full overflow-hidden border-2 border-white/85 -mr-3 sm:-mr-4 z-10 bg-slate-200 shrink-0 shadow-lg">
                      <Image
                        src="/jatinder-singla.png"
                        alt="Specialist"
                        fill
                        className="object-cover object-top"
                      />
                    </div>

                    {/* Doctor 3 (Center Featured Large) */}
                    <div className="relative w-18 h-18 sm:w-22 sm:h-22 lg:w-24 lg:h-24 rounded-full overflow-hidden border-4 border-white z-20 bg-slate-200 shrink-0 shadow-2xl scale-105 ring-2 ring-[#0B5D68]/30">
                      <Image
                        src="/images/testimonials/doctor-portrait.jpg"
                        alt="Chief Medical Director"
                        fill
                        className="object-cover object-top"
                      />
                    </div>

                    {/* Doctor 4 (Mid Right) */}
                    <div className="relative w-14 h-14 sm:w-16 sm:h-16 lg:w-18 lg:h-18 rounded-full border-2 border-white/85 -ml-3 sm:-mr-4 z-10 bg-slate-200 shrink-0 shadow-lg overflow-hidden">
                      <Image
                        src="/images/hero/hero-doctor.jpg"
                        alt="Specialist"
                        fill
                        className="object-cover object-top"
                      />
                    </div>

                    {/* Doctor 5 (Far Right) */}
                    <div className="relative w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full overflow-hidden border-2 border-white/60 -ml-3 sm:-ml-4 opacity-80 bg-slate-200 shrink-0 shadow-sm">
                      <Image
                        src="/ashish-ahuja.png"
                        alt="Specialist"
                        fill
                        className="object-cover object-top"
                      />
                    </div>
                  </div>

                  {/* Big Number "40+" */}
                  <div className="font-heading font-extrabold text-5xl sm:text-6xl lg:text-[68px] text-white tracking-tight leading-none drop-shadow-xl">
                    40+
                  </div>

                  {/* Label: Chief Doctors */}
                  <div className="font-heading font-bold text-lg sm:text-xl lg:text-2xl text-white mt-2 tracking-wide drop-shadow-md">
                    Chief Doctors
                  </div>

                  {/* Subtitle Pill */}
                  <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs sm:text-sm font-heading font-bold uppercase tracking-wider text-[#F0A126] mt-3 backdrop-blur-md shadow-sm">
                    <ShieldCheck className="w-4 h-4 text-[#F0A126]" />
                    <span>Audited Senior Specialists</span>
                  </div>

                  {/* Secondary Reassurance */}
                  <p className="text-xs sm:text-sm text-white/70 font-medium mt-2 max-w-[260px] leading-tight">
                    UK, German &amp; US Board-Certified Specialists
                  </p>

                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Video Modal */}
      <AnimatePresence>
        {videoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setVideoOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/20 aspect-video"
            >
              <button
                onClick={() => setVideoOpen(false)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center cursor-pointer transition-colors"
                aria-label="Close Video"
              >
                <X className="w-5 h-5" />
              </button>
              <video
                src="/hero-section-video.mp4"
                controls
                autoPlay
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
