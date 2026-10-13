"use client";

import React from "react";
import { useCare } from "@/context/CareContext";

export const PatientJourney: React.FC = () => {
  const { openIntake } = useCare();

  const steps = [
    {
      number: "01",
      title: "01. Share Medical Reports",
      description: "Submit your diagnosis and imaging scans for rapid, confidential review by premier Indian surgeons.",
    },
    {
      number: "02",
      title: "02. Initial Consultation & Plan",
      description: "Receive verified specialist recommendations, hospital options, transparent quotes, and expected recovery timelines.",
    },
    {
      number: "03",
      title: "03. Travel & Hospital Care",
      description: "Full medical visa support, airport VIP reception, and a dedicated personal bedside care coordinator.",
    },
    {
      number: "04",
      title: "04. Ongoing Support & Aftercare",
      description: "Pre-departure clearance, post-discharge medication handover, and continuous telemedicine follow-up after return.",
    },
  ];

  return (
    <section id="journey" className="py-16 sm:py-20 lg:py-24 bg-white border-b border-[#DCE5EB]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top Header Row: Left Eyebrow + Headline, Right Action Button */}
        <div className="flex flex-col md:flex-row md:items-start justify-between mb-16 sm:mb-20 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF5F4] border border-[#087F79]/20 shadow-2xs mb-3.5">
              <span className="w-2 h-2 rounded-full bg-[#087F79] animate-pulse" />
              <span className="text-[#087F79] text-xs font-bold uppercase tracking-wider">
                HOW IT WORKS
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#102B46] tracking-tight leading-tight">
              Guiding You Through Your Treatment Journey
            </h2>
            <p className="text-[#627486] text-sm sm:text-base mt-2.5 sm:mt-3 leading-relaxed font-normal">
              From confidential medical review to hospital discharge and safe travel home—a coordinated roadmap designed for peace of mind.
            </p>
          </div>

          <div className="shrink-0 pt-2">
            <button
              onClick={() => openIntake("How It Works - Contact Us")}
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-[#087F79] hover:bg-[#066f6a] text-white font-semibold text-sm tracking-wide transition-all duration-200 shadow-sm hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087F79] cursor-pointer"
            >
              <span>Contact Us</span>
            </button>
          </div>
        </div>

        {/* Desktop 4-Step Staggered Layout with Connecting Wavy Dashed Curve */}
        <div className="hidden lg:block relative pb-4">

          {/* Connecting Wavy Dashed SVG Curve */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
            viewBox="0 0 1000 240"
            preserveAspectRatio="none"
            fill="none"
          >
            {/* From Box 1 (top: 100, 48) -> Box 2 (bottom: 270, 192) */}
            <path
              d="M 100 48 C 185 48, 185 192, 270 192"
              stroke="#087F79"
              strokeWidth="2"
              strokeDasharray="6 6"
              strokeLinecap="round"
              className="opacity-40"
            />
            {/* From Box 2 (bottom: 350, 192) -> Box 3 (top: 520, 48) */}
            <path
              d="M 350 192 C 435 192, 435 48, 520 48"
              stroke="#087F79"
              strokeWidth="2"
              strokeDasharray="6 6"
              strokeLinecap="round"
              className="opacity-40"
            />
            {/* From Box 3 (top: 600, 48) -> Box 4 (bottom: 770, 192) */}
            <path
              d="M 600 48 C 685 48, 685 192, 770 192"
              stroke="#087F79"
              strokeWidth="2"
              strokeDasharray="6 6"
              strokeLinecap="round"
              className="opacity-40"
            />
            {/* Outgoing Tail from Box 4 */}
            <path
              d="M 850 192 C 875 192, 905 195, 930 198"
              stroke="#087F79"
              strokeWidth="2"
              strokeDasharray="6 6"
              strokeLinecap="round"
              className="opacity-40"
            />
          </svg>

          {/* 4-Column Staggered Grid */}
          <div className="grid grid-cols-4 gap-8 relative z-10">

            {/* Step 1: Box TOP, Text BOTTOM */}
            <div className="flex flex-col">
              <div className="h-[96px] flex items-center">
                <div className="w-20 h-20 rounded-2xl bg-[#087F79] text-white flex items-center justify-center font-bold text-3xl shadow-sm hover:scale-105 transition-transform duration-300">
                  {steps[0].number}
                </div>
              </div>
              <div className="h-[48px]" />
              <div className="h-[96px] flex flex-col justify-center">
                <h3 className="font-bold text-base text-[#102B46] leading-snug">
                  {steps[0].title}
                </h3>
                <p className="text-xs sm:text-sm text-[#627486] mt-2 leading-relaxed font-normal">
                  {steps[0].description}
                </p>
              </div>
            </div>

            {/* Step 2: Text TOP, Box BOTTOM */}
            <div className="flex flex-col">
              <div className="h-[96px] flex flex-col justify-center">
                <h3 className="font-bold text-base text-[#102B46] leading-snug">
                  {steps[1].title}
                </h3>
                <p className="text-xs sm:text-sm text-[#627486] mt-2 leading-relaxed font-normal">
                  {steps[1].description}
                </p>
              </div>
              <div className="h-[48px]" />
              <div className="h-[96px] flex items-center">
                <div className="w-20 h-20 rounded-2xl bg-[#087F79] text-white flex items-center justify-center font-bold text-3xl shadow-sm hover:scale-105 transition-transform duration-300">
                  {steps[1].number}
                </div>
              </div>
            </div>

            {/* Step 3: Box TOP, Text BOTTOM */}
            <div className="flex flex-col">
              <div className="h-[96px] flex items-center">
                <div className="w-20 h-20 rounded-2xl bg-[#087F79] text-white flex items-center justify-center font-bold text-3xl shadow-sm hover:scale-105 transition-transform duration-300">
                  {steps[2].number}
                </div>
              </div>
              <div className="h-[48px]" />
              <div className="h-[96px] flex flex-col justify-center">
                <h3 className="font-bold text-base text-[#102B46] leading-snug">
                  {steps[2].title}
                </h3>
                <p className="text-xs sm:text-sm text-[#627486] mt-2 leading-relaxed font-normal">
                  {steps[2].description}
                </p>
              </div>
            </div>

            {/* Step 4: Text TOP, Box BOTTOM */}
            <div className="flex flex-col">
              <div className="h-[96px] flex flex-col justify-center">
                <h3 className="font-bold text-base text-[#102B46] leading-snug">
                  {steps[3].title}
                </h3>
                <p className="text-xs sm:text-sm text-[#627486] mt-2 leading-relaxed font-normal">
                  {steps[3].description}
                </p>
              </div>
              <div className="h-[48px]" />
              <div className="h-[96px] flex items-center">
                <div className="w-20 h-20 rounded-2xl bg-[#087F79] text-white flex items-center justify-center font-bold text-3xl shadow-sm hover:scale-105 transition-transform duration-300">
                  {steps[3].number}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Mobile / Tablet Responsive Timeline */}
        <div className="block lg:hidden relative">
          {/* Vertical Dashed Line */}
          <div className="absolute left-[38px] top-6 bottom-6 w-0.5 border-l-2 border-dashed border-[#087F79]/40 z-0" />

          <div className="space-y-8 relative z-10">
            {steps.map((step) => (
              <div key={step.number} className="flex items-start gap-5">
                <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-[#087F79] text-white flex items-center justify-center font-bold text-2xl sm:text-3xl shrink-0 shadow-sm">
                  {step.number}
                </div>
                <div className="pt-2">
                  <h3 className="font-bold text-base text-[#102B46] leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#627486] mt-1.5 leading-relaxed font-normal">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
