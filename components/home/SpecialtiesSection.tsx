"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Sparkles, Activity, Eye, Bone, Heart, Scissors } from "lucide-react";
import { useCare } from "@/context/CareContext";

interface SpecialtyCardItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  badge: string;
  stat: string;
  icon: React.ComponentType<{ className?: string }>;
}

const SPECIALTIES_DATA: SpecialtyCardItem[] = [
  {
    id: "orthopaedics",
    title: "Robotic Joint Surgery",
    subtitle: "Quaternary Orthopaedics",
    description:
      "Stryker Mako 3D computer-navigated knee and hip arthroplasty with muscle-sparing same-week ambulation.",
    image: "/images/specialties/orthopaedics.jpg",
    badge: "Mako 3D Navigation",
    stat: "99.4% Joint Stability",
    icon: Bone,
  },
  {
    id: "cardiology",
    title: "Quaternary Cardiology",
    subtitle: "Interventional & Structural",
    description:
      "Advanced valve repair, off-pump coronary bypass, and complex cardiac interventions in sterile cath labs.",
    image: "/images/specialties/cardiology.jpg",
    badge: "24/7 Cardiac Suite",
    stat: "99.2% Surgical Success",
    icon: Heart,
  },
  {
    id: "ophthalmology",
    title: "Laser Eye Surgery & SMILE",
    subtitle: "Refractive Ophthalmology",
    description:
      "Blade-free Contoura Vision LASIK, SMILE Pro, and custom trifocal cataract lenses for rapid 20/20 recovery.",
    image: "/images/facilities/laser-ophthalmology.jpg",
    badge: "Zeiss & Alcon Suite",
    stat: "99.8% Visual Acuity",
    icon: Eye,
  },
  {
    id: "cosmetics",
    title: "Aesthetic & Plastic Surgery",
    subtitle: "Body Contouring & Facial",
    description:
      "4D High-Definition VASER liposculpture, deep plane facelifts, and rhinoplasty with 100% confidential VIP care.",
    image: "/images/facilities/cosmetic-surgery.jpg",
    badge: "VASER Ultrasound",
    stat: "VIP Private Suites",
    icon: Sparkles,
  },
];

export const SpecialtiesSection = () => {
  const { openIntake } = useCare();

  return (
    <section
      id="specialties"
      className="py-20 sm:py-28 lg:py-32 bg-[#FAFCFD] relative border-t border-[#DCE6EB] font-sans"
    >
      <div className="max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header: Short Copy & Airy Spacing */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 sm:mb-18 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ECF4F7] border border-[#DCE6EB] text-[#0B5D68] text-xs font-heading font-bold uppercase tracking-wider mb-4 shadow-xs">
              <Activity className="w-3.5 h-3.5 text-[#0B5D68]" />
              <span>CLINICAL SPECIALTIES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-heading font-extrabold text-[#0C2338] leading-[1.15] tracking-tight">
              Premier Surgical Disciplines.{" "}
              <span className="text-[#0B5D68]">Audited Outcomes.</span>
            </h2>
            <p className="text-[#6B7C88] text-base sm:text-lg leading-relaxed font-normal mt-3">
              Chief surgeons performing advanced procedures in JCI-accredited tertiary medical centers.
            </p>
          </div>

          <Link
            href="/treatments"
            className="inline-flex items-center gap-2 text-xs uppercase font-heading font-bold tracking-wider text-[#0B5D68] hover:text-[#0C2338] hover:underline transition-colors group shrink-0"
          >
            <span>View All Medical Procedures</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 4 Premium Visual Storytelling Cards (2x2 Clean Airy Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 mb-16">
          {SPECIALTIES_DATA.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                onClick={() => openIntake(`${item.title} Consultation`)}
                className="group relative bg-white rounded-3xl border border-[#DCE6EB] hover:border-[#0B5D68]/40 shadow-xs hover:shadow-xl transition-all duration-400 overflow-hidden cursor-pointer flex flex-col justify-between"
              >
                {/* Visual Image Banner with Subtle Hover Scale */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  {/* Subtle Top-Left Category Pill */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3.5 py-1.5 rounded-full bg-[#0C2338]/85 backdrop-blur-md text-white text-[11px] font-heading font-medium tracking-wider uppercase shadow-sm border border-white/20">
                      {item.badge}
                    </span>
                  </div>

                  {/* Outcome Stat Pill Top-Right */}
                  <div className="absolute top-4 right-4 z-10">
                    <span className="px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-[#0C2338] text-[11px] font-heading font-bold shadow-sm border border-[#DCE6EB] flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#0B5D68]" />
                      <span>{item.stat}</span>
                    </span>
                  </div>
                </div>

                {/* Card Body with 1–2 Line Descriptions */}
                <div className="p-7 sm:p-8 flex-1 flex flex-col justify-between bg-white">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-[#ECF4F7] text-[#0B5D68] flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-[#0B5D68]" />
                      </div>
                      <span className="text-xs font-heading font-bold uppercase tracking-wider text-[#0B5D68]">
                        {item.subtitle}
                      </span>
                    </div>

                    <h3 className="font-heading font-extrabold text-2xl sm:text-[26px] text-[#0C2338] group-hover:text-[#0B5D68] transition-colors mb-2.5 leading-snug">
                      {item.title}
                    </h3>

                    {/* Strict 1–2 Line Description */}
                    <p className="text-xs sm:text-sm text-[#6B7C88] leading-relaxed line-clamp-2 mb-6">
                      {item.description}
                    </p>
                  </div>

                  {/* Single Clean Interactive Trigger */}
                  <div className="pt-4 border-t border-[#DCE6EB]/70 flex items-center justify-between text-xs font-heading font-bold uppercase tracking-wider text-[#0B5D68] group-hover:text-[#0C2338] transition-colors">
                    <span>Inquire About Treatment</span>
                    <div className="w-8 h-8 rounded-full bg-[#ECF4F7] text-[#0B5D68] group-hover:bg-[#0B5D68] group-hover:text-white flex items-center justify-center transition-all">
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* One Primary Bottom Action */}
        <div className="text-center">
          <button
            onClick={() => openIntake("Specialty Case Evaluation")}
            className="inline-flex items-center gap-3 px-9 py-4 rounded-xl bg-[#F0A126] hover:bg-[#db8e18] active:scale-[0.98] text-[#0C2338] font-heading font-bold text-xs sm:text-sm uppercase tracking-wider shadow-md shadow-[#F0A126]/20 transition-all cursor-pointer group"
          >
            <span>Request Specialist Case Review</span>
            <ArrowRight className="w-4 h-4 text-[#0C2338] stroke-[2.4] transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
};
