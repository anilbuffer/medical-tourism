"use client";

import React from "react";
import Image from "next/image";
import { useCare } from "@/context/CareContext";
import { motion } from "framer-motion";
import { ArrowRight, Headphones, Globe, BadgePercent, ShieldCheck } from "lucide-react";

export const HeroSection = () => {
  const { openIntake } = useCare();

  const stats = [
    {
      number: "1,500+",
      label: "International Patients Treated",
      icon: Globe,
    },
    {
      number: "70%",
      label: "Average Cost Savings vs UK/US",
      icon: BadgePercent,
    },
    {
      number: "24 / 7",
      label: "Personal English Medical Concierge",
      icon: Headphones,
    },
  ];

  return (
    <div className="w-full">
      <section className="relative min-h-[90vh] lg:min-h-[92vh] flex items-center pt-28 pb-16 lg:py-0 overflow-hidden bg-[#0C2338] text-white">
        {/* Full Section Background Banner Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero/banner.jpg"
            alt="International travelers arriving in India for quaternary medical care"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[75%_center] lg:object-right"
          />
          {/* Deep Brand Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0C2338] via-[#0C2338]/90 via-45% to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C2338]/90 via-transparent to-transparent lg:hidden pointer-events-none" />
        </div>

        {/* Main Expanded Container */}
        <div className="max-w-[1580px] mx-auto px-6 sm:px-12 lg:px-16 relative z-10 w-full h-full flex flex-col justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center min-h-[680px] lg:min-h-[760px]">

            {/* Left Column: Short Copy & One Primary CTA */}
            <div className="lg:col-span-7 xl:col-span-6 space-y-6 lg:space-y-7 py-8">

              {/* Eyebrow Label */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#ECF4F7] font-heading text-xs uppercase tracking-wider font-bold backdrop-blur-md"
              >
                <span className="w-2 h-2 rounded-full bg-[#F0A126] animate-pulse" />
                <span>Bespoke Medical Concierge</span>
              </motion.div>

              {/* Confident Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-[4rem] font-extrabold text-white leading-[1.12] tracking-tight"
              >
                World-Class Surgery.{" "}
                <span className="text-[#F0A126] block sm:inline">
                  Save 70%. Zero Waiting.
                </span>
              </motion.h1>

              {/* 1–2 Line Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-base sm:text-lg text-slate-200 font-normal leading-relaxed max-w-xl font-body"
              >
                Direct access to celebrated surgical directors in JCI-accredited hospitals with transparent pricing and your personal 1-on-1 concierge.
              </motion.p>

              {/* One Primary CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="pt-2 flex flex-wrap items-center gap-4 sm:gap-6"
              >
                <button
                  onClick={() => openIntake("Hero Consultation")}
                  className="inline-flex items-center gap-3 px-9 py-4 rounded-xl bg-[#F0A126] hover:bg-[#db8e18] active:scale-95 text-[#0C2338] font-heading font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 shadow-xl shadow-[#F0A126]/25 cursor-pointer group shrink-0"
                >
                  <span>Request Free Case Review</span>
                  <ArrowRight className="w-4 h-4 text-[#0C2338] stroke-[2.5] transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </motion.div>

            </div>

            {/* Right Column: Clean Floating Glass Badges */}
            <div className="lg:col-span-5 xl:col-span-6 relative h-[320px] sm:h-[420px] lg:h-[580px] flex items-center justify-center lg:justify-end pointer-events-none">

              {/* FLOATING BADGE 1: Clean Glass Pill (40+ Senior Directors) */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="absolute top-16 left-4 sm:left-8 lg:left-0 z-20 pointer-events-auto"
              >
                <div className="bg-[#0C2338]/90 backdrop-blur-md border border-white/20 rounded-2xl p-4 sm:p-5 shadow-2xl flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-[#0B5D68] text-white flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-6 h-6 text-[#F0A126]" />
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-extrabold font-heading text-white leading-tight">
                      40+ Chief Directors
                    </div>
                    <div className="text-xs text-slate-300 font-heading">
                      Audited Quaternary Specialists
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* FLOATING BADGE 2: Patient Outcome Pill */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="absolute bottom-12 right-2 sm:right-6 lg:right-6 z-20 pointer-events-auto"
              >
                <div className="bg-[#0C2338]/90 backdrop-blur-md border border-white/20 rounded-2xl px-5 py-3.5 shadow-2xl flex items-center gap-3.5">
                  <div className="flex -space-x-2 shrink-0">
                    <img
                      className="w-10 h-10 rounded-full ring-2 ring-white/60 object-cover"
                      src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&auto=format&fit=crop&q=80"
                      alt="Patient"
                    />
                    <img
                      className="w-10 h-10 rounded-full ring-2 ring-white/60 object-cover"
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80"
                      alt="Patient"
                    />
                    <img
                      className="w-10 h-10 rounded-full ring-2 ring-white/60 object-cover"
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80"
                      alt="Patient"
                    />
                  </div>
                  <div className="text-left">
                    <div className="text-lg sm:text-xl font-extrabold font-heading text-white leading-tight">
                      1,500+ Recovered
                    </div>
                    <div className="text-xs text-[#ECF4F7]/80">
                      UK, US &amp; Global Travelers
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>

          </div>
        </div>
      </section>

      {/* Trust & Clinical Stats Bar - Soft White Background with Whitespace */}
      <section
        aria-label="Clinical statistics and credentials"
        className="relative z-20 w-full bg-white border-y border-[#DCE6EB] py-8 sm:py-10"
      >
        <div className="max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="flex items-center gap-4 sm:gap-5"
                >
                  <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-[#F8FAFC] border border-[#DCE6EB] flex items-center justify-center shrink-0 shadow-xs">
                    <Icon className="w-6 h-6 text-[#0B5D68] stroke-[2]" />
                  </div>

                  <div className="flex flex-col justify-center">
                    <div className="text-2xl sm:text-3xl lg:text-[34px] font-bold font-heading text-[#0C2338] leading-none tracking-tight">
                      {stat.number}
                    </div>
                    <div className="text-xs sm:text-sm font-heading font-normal text-[#6B7C88] leading-snug mt-1.5">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
