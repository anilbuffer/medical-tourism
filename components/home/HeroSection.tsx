"use client";

import React from "react";
import Image from "next/image";
import { useCare } from "@/context/CareContext";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

export const HeroSection = () => {
  const { openIntake } = useCare();

  return (
    <section className="relative min-h-[92vh] lg:min-h-screen flex items-center pt-28 pb-16 lg:py-0 overflow-hidden bg-[#062c30] font-sans text-white">
      {/* 01. Full Section Background Banner Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/hero-doctor.jpg"
          alt="Expert Medical Healthcare in India"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[75%_center] lg:object-right"
        />
        {/* Deep Brand Gradient Overlay: Solid on left for crisp readability, fading smoothly on the right */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#062c30] via-[#062c30]/95 via-45% to-black/20 lg:to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#062c30] via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Vertical "Scroll for more" on left margin - Matches Medixal Reference */}
      <div className="hidden xl:flex absolute left-8 bottom-16 items-center gap-2 text-xs text-white/75 tracking-widest font-heading font-medium -rotate-90 origin-left z-20 pointer-events-none select-none">
        <span>&larr; Scroll for more</span>
      </div>

      {/* Main Expanded Container */}
      <div className="max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-16 relative z-10 w-full h-full flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center min-h-[750px] lg:min-h-[820px]">
          
          {/* 02. Left Column: Medixal-Style Pure & Spacious Typography */}
          <div className="lg:col-span-7 xl:col-span-6 space-y-6 lg:space-y-8 py-8 lg:py-0 lg:pl-6 xl:pl-10">
            
            {/* Small Eyebrow Label */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-teal-100/90 font-heading text-sm sm:text-base font-semibold tracking-wide"
            >
              Expert Medical Treatment
            </motion.div>

            {/* Confident, Clean Headline - Exact Medixal Reference Styling */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-[4.25rem] font-extrabold text-white leading-[1.12] tracking-tight"
            >
              We Follow A<br />
              Holistic Approach<br />
              to Health care.
            </motion.h1>

            {/* Reassuring, Uncrowded Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-base sm:text-lg text-white/90 font-normal leading-relaxed max-w-xl font-body"
            >
              World-class quaternary hospitals, celebrated chief surgeons, and comprehensive 1-on-1 care coordination in India with up to 70% cost savings and zero wait times.
            </motion.p>

            {/* Medixal-Style Clean CTA: Play Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="pt-2 flex flex-wrap items-center gap-6"
            >
              <button
                onClick={() => openIntake()}
                className="inline-flex items-center gap-3 text-base sm:text-lg font-bold text-white hover:text-white/80 transition-colors group cursor-pointer font-heading"
              >
                <div className="w-12 h-12 rounded-full bg-white/15 border border-white/30 group-hover:bg-white group-hover:text-[#0b5d63] flex items-center justify-center transition-all duration-300 shrink-0 shadow-lg">
                  <Play className="w-4 h-4 fill-current ml-0.5 text-white group-hover:text-[#0b5d63]" />
                </div>
                <span>See How We Works</span>
              </button>
            </motion.div>

          </div>

          {/* 03. Right Column: Floating Badges over the Full-Bleed Doctor Background */}
          <div className="lg:col-span-5 xl:col-span-6 relative h-[380px] sm:h-[480px] lg:h-[650px] flex items-center justify-center lg:justify-end pointer-events-none">
            
            {/* FLOATING BADGE 1: Medixal Shield Crest (870+ Doctors) */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="absolute top-12 left-4 sm:left-10 lg:left-6 xl:left-12 z-20 pointer-events-auto"
            >
              <div className="w-24 sm:w-28 py-3.5 px-2 bg-[#062c30]/90 backdrop-blur-md border border-white/25 rounded-2xl rounded-b-[2rem] shadow-2xl flex flex-col items-center text-center">
                {/* Doctor Mini Avatar Stack */}
                <div className="flex -space-x-2 mb-1.5">
                  <img
                    className="w-7 h-7 rounded-full ring-1.5 ring-white object-cover"
                    src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=100"
                    alt="Doctor"
                  />
                  <img
                    className="w-7 h-7 rounded-full ring-1.5 ring-white object-cover"
                    src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=100"
                    alt="Doctor"
                  />
                  <img
                    className="w-7 h-7 rounded-full ring-1.5 ring-white object-cover"
                    src="https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=100"
                    alt="Doctor"
                  />
                </div>
                <span className="text-xl sm:text-2xl font-extrabold font-heading text-white leading-none">
                  870+
                </span>
                <span className="text-[11px] text-white/80 font-heading font-medium tracking-wide mt-0.5">
                  Doctors
                </span>
              </div>
            </motion.div>

            {/* FLOATING BADGE 2: Medixal Pill (150K+ Satisfied Patients) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="absolute bottom-10 sm:bottom-14 right-2 sm:right-6 lg:right-4 xl:right-10 z-20 pointer-events-auto"
            >
              <div className="bg-[#042023]/95 backdrop-blur-md border border-white/20 rounded-full px-5 py-2.5 sm:px-6 sm:py-3 shadow-2xl flex items-center gap-3.5">
                {/* Patient Avatars */}
                <div className="flex -space-x-2 shrink-0">
                  <img
                    className="w-8 h-8 rounded-full ring-1.5 ring-white/60 object-cover"
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&auto=format&fit=crop&q=80"
                    alt="Patient"
                  />
                  <img
                    className="w-8 h-8 rounded-full ring-1.5 ring-white/60 object-cover"
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80"
                    alt="Patient"
                  />
                  <img
                    className="w-8 h-8 rounded-full ring-1.5 ring-white/60 object-cover"
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80"
                    alt="Patient"
                  />
                </div>
                <div className="shrink-0 text-left">
                  <div className="text-sm sm:text-base font-extrabold font-heading text-white leading-tight">
                    150K+
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-white/75 font-body leading-tight">
                    Satisfied Patients
                  </div>
                </div>
              </div>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
};

