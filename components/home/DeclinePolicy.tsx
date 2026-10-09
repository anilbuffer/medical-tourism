"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, CheckCircle } from "lucide-react";
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

        {/* 03. Section Content Layer */}
        <div className="max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* Left Column: Clinical Integrity Guarantee Content */}
            <div className="lg:col-span-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#ECF4F7] font-heading text-xs uppercase tracking-wider font-bold mb-4 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-[#F0A126] animate-pulse" />
                <span>CLINICAL INTEGRITY GUARANTEE</span>
              </div>

              {/* Main Headline */}
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] xl:text-[46px] font-heading font-extrabold text-white leading-[1.15] mb-4 tracking-tight max-w-3xl">
                If we believe a procedure isn&apos;t right for you, or cannot ensure the highest standard of care, we simply won&apos;t arrange it.
              </h2>

              {/* Description Body */}
              <p className="text-sm sm:text-base text-white/85 leading-relaxed max-w-2xl mb-6 font-normal">
                We are not a booking agency or medical broker. We are an international clinical concierge. Our reputation rests entirely on your clinical outcome and long-term wellbeing.
              </p>

              {/* Action Button */}
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <button
                  onClick={() => openIntake("Clinical Integrity Consultation")}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#F0A126] hover:bg-[#db8e18] active:scale-[0.98] text-[#0C2338] font-heading font-bold text-xs uppercase tracking-wider shadow-xl transition-all cursor-pointer group"
                >
                  <span>Learn About Clinical Feasibility</span>
                  <span className="text-[#0C2338] font-extrabold text-sm transition-transform group-hover:translate-x-1">→</span>
                </button>
              </div>

              {/* 3 Key Trust Pillars */}
              <div className="flex flex-wrap items-center gap-2.5 text-xs text-white/90">
                <span className="px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-[#F0A126]" />
                  Independent Senior Specialist Review
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-[#F0A126]" />
                  Zero Financial Pressure or Booking Quotas
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-[#F0A126]" />
                  Direct Communication With Your Home Physician
                </span>
              </div>
            </div>

            {/* Right Column: Watch Video Play Button & Medical Shield Watermark */}
            <div className="lg:col-span-4 flex items-center justify-start lg:justify-end gap-6 sm:gap-8 pt-4 lg:pt-0">
              {/* Watch Video Button */}
              <button
                onClick={() => setVideoOpen(true)}
                className="group flex flex-col items-center gap-2.5 text-center cursor-pointer transition-transform hover:scale-105 select-none"
                aria-label="Watch Clinical Protocol Video"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white text-[#0C2338] flex items-center justify-center shadow-2xl group-hover:bg-[#F0A126] group-hover:text-[#0C2338] transition-all shrink-0">
                  <Play className="w-6 h-6 fill-current ml-1" />
                </div>
                <span className="font-heading font-extrabold text-xs sm:text-sm tracking-wider uppercase text-white drop-shadow-sm group-hover:text-[#F0A126] transition-colors whitespace-nowrap">
                  WATCH VIDEO
                </span>
              </button>

              {/* Large Shield with Medical Cross Watermark */}
              <div className="hidden sm:flex items-center justify-center pointer-events-none select-none opacity-85">
                <svg
                  viewBox="0 0 120 140"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-24 h-28 sm:w-28 sm:h-36 md:w-36 md:h-44 text-white/90"
                >
                  <path
                    d="M60 10L106 28V68C106 100 60 130 60 130C60 130 14 100 14 68V28L60 10Z"
                    stroke="currentColor"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M60 42V94M34 68H86"
                    stroke="currentColor"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
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
