"use client";

import React from "react";
import Link from "next/link";
import { UserCheck, Stethoscope, Building2, HeartPulse, ArrowUpRight } from "lucide-react";
import { useCare } from "@/context/CareContext";

export const WhyUsSection: React.FC = () => {
  const { openIntake } = useCare();

  const services = [
    {
      id: "guidance",
      title: "One-to-One Guidance",
      description: "A dedicated medical travel coordinator to manage appointments, hospital admissions, and personal translation.",
      icon: UserCheck,
      action: () => openIntake("Why Us - One-to-One Guidance"),
    },
    {
      id: "opinions",
      title: "Pre-Travel Opinions",
      description: "Comprehensive remote evaluations and preliminary treatment assessments from top Indian department heads.",
      icon: Stethoscope,
      action: () => openIntake("Why Us - Pre-Travel Opinions"),
    },
    {
      id: "pricing",
      title: "Direct Hospital Pricing",
      description: "Transparent hospital billing with zero hidden agency markups, itemized written quotes, and financial clarity.",
      icon: Building2,
      action: () => openIntake("Why Us - Direct Hospital Pricing"),
    },
    {
      id: "aftercare",
      title: "Continuous Aftercare",
      description: "Pre-departure fit-to-fly clearance, medical record transfer, and ongoing telemedicine follow-up after returning home.",
      icon: HeartPulse,
      action: () => openIntake("Why Us - Continuous Aftercare"),
    },
  ];

  return (
    <section id="why-us" className="py-16 sm:py-20 lg:py-24 bg-[#EAF5F4] border-b border-[#DCE5EB] w-full">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Centered Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
          {/* Pill Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#DCE5EB] text-xs font-semibold text-[#087F79] mb-4 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#087F79]" />
            <span>The YourMedicareTrip Difference</span>
          </div>

          {/* Main Headline */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-[2.65rem] font-bold text-[#102B46] tracking-tight leading-tight">
            More Than Medical Travel.
            <span className="block mt-1 text-[#087F79]">Personal Care Coordination.</span>
          </h2>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                onClick={item.action}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-[#DCE5EB] shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 cursor-pointer"
              >
                {/* Card Top */}
                <div>
                  {/* Circle Icon */}
                  <div className="w-12 h-12 rounded-full bg-[#102B46] text-white flex items-center justify-center mb-5 group-hover:bg-[#087F79] transition-colors shadow-2xs">
                    <Icon className="w-5 h-5 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-[#102B46] group-hover:text-[#087F79] transition-colors leading-snug">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[#627486] mt-2.5 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                {/* Card Bottom with Divider */}
                <div className="mt-6 pt-4 border-t border-[#DCE5EB]">
                  <span className="text-xs sm:text-sm font-semibold text-[#102B46] group-hover:text-[#087F79] inline-flex items-center gap-1 transition-colors">
                    <span>Learn More</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
