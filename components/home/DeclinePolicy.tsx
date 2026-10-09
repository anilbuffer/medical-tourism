"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, CheckCircle2, ShieldCheck, ArrowRight } from "lucide-react";
import { useCare } from "@/context/CareContext";

export const DeclinePolicy = () => {
  const { openIntake } = useCare();
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <>
      <section className="relative overflow-hidden bg-[#F8FAFC] py-20 sm:py-28 font-sans border-t border-[#DCE6EB]">
        {/* Soft Ambient Radial Glow for Depth without Clutter */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#ECF4F7] rounded-full blur-3xl pointer-events-none opacity-60" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#F0A126]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Left Column: Short Copy, Airy Hierarchy & One Primary CTA */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              {/* Refined Eyebrow */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#DCE6EB] text-[#0B5D68] text-xs font-heading font-bold uppercase tracking-wider mb-5 shadow-xs w-max">
                <ShieldCheck className="w-4 h-4 text-[#0B5D68]" />
                <span>CLINICAL INTEGRITY GUARANTEE</span>
              </div>

              {/* Punchy Confident Headline */}
              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-heading font-extrabold text-[#0C2338] leading-[1.15] mb-4 tracking-tight max-w-2xl">
                If a procedure isn&apos;t right for you,{" "}
                <span className="text-[#0B5D68]">we simply won&apos;t arrange it.</span>
              </h2>

              {/* Strict 1–2 Line Reassuring Description */}
              <p className="text-base sm:text-lg text-[#6B7C88] leading-relaxed max-w-2xl mb-8 font-normal">
                We are an independent clinical concierge, not a booking broker. Our surgical directors assess each case file strictly on clinical merit with zero sales quotas.
              </p>

              {/* Clear CTA Row: One Primary CTA + Subtle Video Trigger */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-8">
                {/* One Primary CTA Button */}
                <button
                  onClick={() => openIntake("Clinical Integrity Feasibility Review")}
                  className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-[#F0A126] hover:bg-[#db8e18] active:scale-[0.98] text-[#0C2338] font-heading font-bold text-xs sm:text-sm uppercase tracking-wider shadow-md shadow-[#F0A126]/20 transition-all cursor-pointer group"
                >
                  <span>Check Clinical Feasibility</span>
                  <ArrowRight className="w-4 h-4 text-[#0C2338] stroke-[2.4] transition-transform group-hover:translate-x-1" />
                </button>

                {/* Subtle Clean Video Trigger */}
                <button
                  onClick={() => setVideoOpen(true)}
                  className="inline-flex items-center gap-3 px-5 py-3.5 rounded-xl bg-white hover:bg-slate-50 border border-[#DCE6EB] text-[#0C2338] shadow-xs cursor-pointer transition-all group"
                  aria-label="Watch Clinical Protocol Video"
                >
                  <div className="w-7 h-7 rounded-full bg-[#ECF4F7] text-[#0B5D68] flex items-center justify-center group-hover:bg-[#0B5D68] group-hover:text-white transition-colors shrink-0">
                    <Play className="w-3 h-3 fill-current ml-0.5" />
                  </div>
                  <span className="font-heading font-bold text-xs tracking-wider uppercase text-[#0C2338]">
                    Watch 2-Min Video
                  </span>
                </button>
              </div>

              {/* 3 Clean Trust Tags (Single-Line Highlights) */}
              <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-[#0C2338]">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#DCE6EB] font-medium text-xs text-[#0C2338] shadow-xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0B5D68]" />
                  Independent Specialist Review
                </span>
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#DCE6EB] font-medium text-xs text-[#0C2338] shadow-xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0B5D68]" />
                  Zero Financial Quotas
                </span>
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#DCE6EB] font-medium text-xs text-[#0C2338] shadow-xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0B5D68]" />
                  Home Doctor Continuity
                </span>
              </div>
            </div>

            {/* Right Column: Clean, Airy Luxury Clinical Card with Doctor Portraits */}
            <div className="lg:col-span-5 flex items-center justify-center lg:justify-end">
              <div className="relative w-full max-w-[460px] bg-white rounded-3xl border border-[#DCE6EB] p-8 sm:p-10 shadow-xl shadow-slate-200/50 flex flex-col items-center text-center">

                {/* Refined Overlapping Doctor Avatars */}
                <div className="flex items-center justify-center mb-6 pt-2">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white -mr-3 shadow-md bg-slate-100 shrink-0">
                    <Image
                      src="/vikas-gupta.png"
                      alt="Specialist"
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-white -mr-3 shadow-md z-10 bg-slate-100 shrink-0">
                    <Image
                      src="/jatinder-singla.png"
                      alt="Specialist"
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-xl z-20 bg-slate-100 shrink-0 ring-2 ring-[#0B5D68]/20">
                    <Image
                      src="/images/testimonials/doctor-portrait.jpg"
                      alt="Chief Medical Director"
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-white -ml-3 shadow-md z-10 bg-slate-100 shrink-0">
                    <Image
                      src="/priya-sharma.jpg"
                      alt="Care Coordinator"
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white -ml-3 shadow-md bg-slate-100 shrink-0">
                    <Image
                      src="/ashish-ahuja.png"
                      alt="Specialist"
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                </div>

                {/* Big Stat */}
                <div className="font-heading font-extrabold text-5xl sm:text-6xl text-[#0C2338] tracking-tight leading-none mb-2">
                  40+
                </div>

                {/* Label */}
                <div className="font-heading font-bold text-xl text-[#0C2338] mb-1">
                  Senior Surgical Directors
                </div>

                <p className="text-xs sm:text-sm text-[#6B7C88] max-w-[280px] leading-relaxed mb-5">
                  UK, German, and US-fellowship trained department heads reviewing every case.
                </p>

                {/* Trust Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ECF4F7] border border-[#DCE6EB] text-xs font-heading font-bold uppercase tracking-wider text-[#0B5D68]">
                  <ShieldCheck className="w-4 h-4 text-[#0B5D68]" />
                  <span>Audited Quaternary Specialists</span>
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
