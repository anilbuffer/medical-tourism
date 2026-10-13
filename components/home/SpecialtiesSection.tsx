"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const SpecialtiesSection: React.FC = () => {
  const treatments = [
    {
      id: "orthopaedics",
      title: "Orthopaedics & Joint Replacement",
      description:
        "Explore treatment options for joint conditions with guidance on suitable specialists and hospitals.",
      image: "/images/specialties/orthopaedics.jpg",
      href: "/treatments",
    },
    {
      id: "cardiac",
      title: "Cardiac Care",
      description:
        "Understand your options for cardiac assessment and treatment with support coordinating specialist consultations.",
      image: "/images/specialties/cardiology.jpg",
      href: "/treatments",
    },
    {
      id: "neurosurgery",
      title: "Neurosurgery",
      description:
        "Explore specialist-led assessment and treatment options for neurological and neurosurgical conditions.",
      image: "/images/specialties/neurology.jpg",
      href: "/treatments",
    },
  ];

  return (
    <section id="treatments" className="py-16 sm:py-20 lg:py-24 bg-white border-b border-[#DCE5EB]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-[#087F79] text-xs font-bold uppercase tracking-wider block mb-2">
              EXPLORE TREATMENT OPTIONS
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#102B46] tracking-tight leading-tight">
              Specialized Treatment. A More Personal Approach.
            </h2>
            <p className="text-[#627486] text-sm sm:text-base mt-2.5 leading-relaxed">
              Explore treatment options and receive guidance tailored to your medical needs.
            </p>
          </div>

          <Link
            href="/treatments"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#087F79] hover:text-[#102B46] transition-colors group shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087F79] rounded p-1"
          >
            <span>Explore All Treatments</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Three Premium Image-Led Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {treatments.map((treatment) => (
            <div
              key={treatment.id}
              className="group rounded-2xl overflow-hidden bg-white border border-[#DCE5EB] shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col hover:-translate-y-1"
            >
              {/* Large Medical Photograph */}
              <div className="relative h-60 sm:h-64 w-full overflow-hidden bg-slate-100">
                <Image
                  src={treatment.image}
                  alt={treatment.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#102B46] group-hover:text-[#087F79] transition-colors leading-snug">
                    {treatment.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#627486] mt-2.5 leading-relaxed font-normal">
                    {treatment.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#DCE5EB] flex items-center justify-between">
                  <Link
                    href={treatment.href}
                    className="text-xs sm:text-sm font-semibold text-[#087F79] hover:text-[#102B46] inline-flex items-center gap-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087F79] rounded"
                  >
                    <span>Explore Treatment</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Section Level CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/treatments"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-white hover:bg-[#EAF5F4] text-[#102B46] border border-[#DCE5EB] font-semibold text-sm transition-all duration-200 shadow-2xs hover:border-[#087F79]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087F79]"
          >
            <span>Explore All Treatments</span>
            <ArrowRight className="w-4 h-4 text-[#087F79]" />
          </Link>
        </div>
      </div>
    </section>
  );
};
