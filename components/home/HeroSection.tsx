"use client";

import React from "react";
import Image from "next/image";
import { useCare } from "@/context/CareContext";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export const HeroSection = () => {
  const { openIntake } = useCare();

  const stats = [
    {
      number: "99.2%",
      label: "Clinical Success Rate",
      color: "text-[#F0A126]",
    },
    {
      number: "1,500+",
      label: "International Patients Treated",
      color: "text-[#F0A126]",
    },
    {
      number: "70%",
      label: "Average Cost Savings vs UK/US",
      color: "text-[#F0A126]",
    },
    {
      number: "24 / 7",
      label: "Dedicated English Concierge",
      color: "text-[#F0A126]",
    },
  ];

  return (
    <div className="w-full font-sans">
      <section className="relative min-h-[92vh] lg:min-h-screen flex items-center pt-28 pb-16 lg:py-0 overflow-hidden bg-[#0C2338] text-white">
        {/* 01. Full Section Background Banner Image - Senior Couple Airport Medical Trip */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero/banner.jpg"
            alt="Mature senior couple arriving in India airport for medical travel with masks and trolley luggage"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[75%_center] lg:object-right"
          />
          {/* Deep Brand Gradient Overlay: Solid on left for pristine text readability, fading cleanly to reveal the senior couple on the right */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0C2338] via-[#0C2338]/90 via-40% to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C2338]/90 via-transparent to-transparent lg:hidden pointer-events-none" />
        </div>

        {/* Vertical "Scroll for more" on left margin */}
        <div className="hidden xl:flex absolute left-8 bottom-16 items-center gap-2 text-xs text-white/75 tracking-widest font-heading font-medium -rotate-90 origin-left z-20 pointer-events-none select-none">
          <span>&larr; Scroll for more</span>
        </div>

        {/* Main Expanded Container */}
        <div className="max-w-[1580px] mx-auto px-6 sm:px-12 lg:px-16 relative z-10 w-full h-full flex flex-col justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center min-h-[750px] lg:min-h-[820px]">

            {/* 02. Left Column: Pure & Spacious Typography */}
            <div className="lg:col-span-7 xl:col-span-6 space-y-6 lg:space-y-8 py-8">

              {/* Small Eyebrow Label */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0B5D68]/30 border border-[#0B5D68]/50 text-[#ECF4F7] font-heading text-xs sm:text-sm font-semibold tracking-wide backdrop-blur-sm"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#0B8F83]"></span>
                <span>Expert Medical Travel Care</span>
              </motion.div>

              {/* Confident Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-[4.15rem] font-extrabold text-white leading-[1.14] tracking-tight"
              >
                World-Class Surgical Care in India.{" "}
                <span className="text-[#F0A126]">
                  Save Up to 70%. Zero Waiting.
                </span>
              </motion.h1>

              {/* Subtitle Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-base sm:text-lg text-slate-200 font-normal leading-relaxed max-w-2xl font-body"
              >
                Direct access to top quaternary hospital directors, transparent guaranteed pricing, and your dedicated English-speaking care coordinator from arrival to recovery.
              </motion.p>

              {/* Hero CTA Button - Primary Teal */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="pt-2 flex items-center"
              >
                <button
                  onClick={() => openIntake()}
                  className="inline-flex items-center gap-3 px-8 sm:px-10 py-4 rounded-full bg-[#0B5D68] hover:bg-[#094b54] active:scale-95 text-white font-heading font-bold text-sm sm:text-base tracking-wider uppercase transition-all duration-300 shadow-xl shadow-[#0B5D68]/30 hover:shadow-2xl hover:shadow-[#0B5D68]/45 cursor-pointer group"
                >
                  <span>Book an Appointment</span>
                  <ArrowRight className="w-5 h-5 text-white stroke-[2.2] transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </motion.div>

            </div>

            {/* 03. Right Column: Floating Badges */}
            <div className="lg:col-span-5 xl:col-span-6 relative h-[380px] sm:h-[480px] lg:h-[650px] flex items-center justify-center lg:justify-end pointer-events-none">

              {/* FLOATING BADGE 1: Security Shield Crest (40+ Doctors) */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="absolute top-20 left-4 sm:left-8 lg:-left-6 xl:left-18 z-20 pointer-events-auto"
              >
                <div className="relative w-[124px] sm:w-[136px] h-[148px] sm:h-[162px] flex flex-col items-center justify-center pt-2 pb-5 px-3 select-none filter drop-shadow-2xl">
                  {/* SVG Security Shield Silhouette Outline & Background */}
                  <svg
                    viewBox="0 0 140 165"
                    className="absolute inset-0 w-full h-full"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <linearGradient id="shieldBg" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#0C2338" stopOpacity="0.92" />
                        <stop offset="100%" stopColor="#071624" stopOpacity="0.96" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M 70,6 C 92,19 116,19 130,21 C 135,21.5 137,24 137,28 L 137,82 C 137,122 102,150 70,160 C 38,150 3,122 3,82 L 3,28 C 3,24 5,21.5 10,21 C 24,19 48,19 70,6 Z"
                      fill="url(#shieldBg)"
                      stroke="#DCE6EB"
                      strokeWidth="2"
                      strokeOpacity="0.6"
                    />
                  </svg>

                  {/* Overlapping Doctor Avatars */}
                  <div className="relative z-10 flex items-center justify-center -space-x-2.5 mb-1 pt-1">
                    <img
                      className="w-6 h-6 rounded-full ring-1 ring-white/70 object-cover opacity-80"
                      src="https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=100"
                      alt="Doctor"
                    />
                    <img
                      className="w-7 h-7 rounded-full ring-1.5 ring-white/90 object-cover z-1"
                      src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=100"
                      alt="Doctor"
                    />
                    {/* Center Prominent Avatar */}
                    <img
                      className="w-9 h-9 rounded-full ring-2 ring-white object-cover z-10 shadow-md"
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120"
                      alt="Doctor"
                    />
                    <img
                      className="w-7 h-7 rounded-full ring-1.5 ring-white/90 object-cover z-1"
                      src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=100"
                      alt="Doctor"
                    />
                    <img
                      className="w-6 h-6 rounded-full ring-1 ring-white/70 object-cover opacity-80"
                      src="https://images.unsplash.com/photo-1594824813689-53744be65e08?auto=format&fit=crop&q=80&w=100"
                      alt="Doctor"
                    />
                  </div>

                  {/* 40+ Bold Number */}
                  <div className="relative z-10 text-2xl sm:text-[26px] font-black font-heading text-white leading-none tracking-tight mt-1">
                    40+
                  </div>

                  {/* Doctors Subtext */}
                  <div className="relative z-10 text-xs sm:text-[13px] text-white/90 font-heading font-medium tracking-wide mt-0.5">
                    Chief Doctors
                  </div>
                </div>
              </motion.div>

              {/* FLOATING BADGE 2: Pill (150K+ Satisfied Patients) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="absolute bottom-10 sm:bottom-14 right-2 sm:right-6 lg:right-4 xl:right-10 z-20 pointer-events-auto"
              >
                <div className="bg-[#0C2338]/95 backdrop-blur-md border border-[#DCE6EB]/20 rounded-full px-5 py-2.5 sm:px-6 sm:py-3 shadow-2xl flex items-center gap-3.5">
                  {/* Patient Avatars */}
                  <div className="flex -space-x-2 shrink-0">
                    <img
                      className="w-12 h-12 rounded-full ring-1.5 ring-white/60 object-cover"
                      src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&auto=format&fit=crop&q=80"
                      alt="Patient"
                    />
                    <img
                      className="w-12 h-12 rounded-full ring-1.5 ring-white/60 object-cover"
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80"
                      alt="Patient"
                    />
                    <img
                      className="w-12 h-12 rounded-full ring-1.5 ring-white/60 object-cover"
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80"
                      alt="Patient"
                    />
                  </div>
                  <div className="shrink-0 text-left">
                    <div className="text-xl sm:text-2xl font-extrabold font-heading text-white leading-tight">
                      150K+
                    </div>
                    <div className="text-[14px] sm:text-[16px] text-[#ECF4F7]/80 font-body leading-tight">
                      Satisfied Patients
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>

          </div>
        </div>
      </section>

      {/* 04. Big Impact Trust & Clinical Stats Bar - Soft Blue Background #ECF4F7 */}
      <section
        aria-label="Clinical statistics and patient credentials"
        className="relative z-20 w-full bg-[#ECF4F7] border-y border-[#DCE6EB] py-8 sm:py-10"
      >
        <div className="max-w-[1580px] mx-auto px-6 sm:px-12 lg:px-16 w-full">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex flex-col justify-center px-2 sm:px-4 lg:px-6 group transition-transform duration-300 hover:-translate-y-0.5"
              >
                <div
                  className={`text-2xl sm:text-3xl lg:text-4xl xl:text-[42px] font-bold font-heading ${stat.color} leading-none tracking-tight group-hover:scale-[1.02] transition-transform duration-300 origin-left`}
                >
                  {stat.number}
                </div>
                <div className="text-xs sm:text-sm font-heading font-semibold text-[#0C2338] leading-snug mt-2.5 sm:mt-3 max-w-[220px]">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

