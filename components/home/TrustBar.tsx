"use client";

import React from "react";
import { UserCheck, Stethoscope, Building2, HeartHandshake } from "lucide-react";

export const TrustBar: React.FC = () => {
  const trustIndicators = [
    {
      title: "Personalized Care Coordination",
      description: "Dedicated assistance before, during, and after your trip",
      icon: UserCheck,
    },
    {
      title: "Specialist Consultation Support",
      description: "Assistance arranging consultations with appropriate medical experts",
      icon: Stethoscope,
    },
    {
      title: "Hospital Coordination",
      description: "Support with appointments, admission arrangements, and communication",
      icon: Building2,
    },
    {
      title: "Travel & Recovery Assistance",
      description: "Practical help with travel, accommodation, and follow-up care",
      icon: HeartHandshake,
    },
  ];

  return (
    <section
      aria-label="Care navigation trust indicators"
      className="relative z-20 w-full bg-white border-b border-[#DCE5EB] py-8 sm:py-10"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* 4 Compact Trust Indicators */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {trustIndicators.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="flex items-center sm:items-start gap-3.5 group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#EAF5F4] flex items-center justify-center shrink-0 text-[#087F79] group-hover:scale-105 transition-transform">
                  <Icon className="w-5 h-5 text-[#087F79] stroke-[2]" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#102B46] leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#627486] font-normal leading-relaxed mt-0.5">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
