"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, GraduationCap, Award, Building2, Clock, ShieldCheck } from "lucide-react";

export const DoctorsSection: React.FC = () => {
  return (
    <section id="doctors" className="py-16 sm:py-20 lg:py-24 bg-[#EAF5F4] border-b border-[#DCE5EB]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">

          {/* Left Column: Section Heading & Intro */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-[#087F79] text-xs font-bold uppercase tracking-wider block">
              OUR MEDICAL NETWORK
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#102B46] tracking-tight leading-tight">
              Experienced Specialists &amp; Renowned Surgeons
            </h2>
            <p className="text-[#627486] text-sm sm:text-base leading-relaxed">
              Connect directly with distinguished department heads and senior surgeons with international training and decades of proven clinical outcomes.
            </p>
            <div className="pt-2">
              <Link
                href="/doctors"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#087F79] hover:text-[#102B46] transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087F79] rounded p-1"
              >
                <span>Meet Our Specialists</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Right Column: Featured Specialist Card */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl border border-[#DCE5EB] shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col sm:flex-row items-stretch">

              {/* Doctor Photo */}
              <div className="relative w-full sm:w-56 md:w-64 min-h-[260px] sm:min-h-full bg-slate-100 shrink-0 overflow-hidden">
                <Image
                  src="/jatinder-singla.png"
                  alt="Dr. Jatinder Singla - Senior Director & Chief Surgeon"
                  fill
                  sizes="(max-width: 640px) 100vw, 260px"
                  className="object-cover object-top"
                  priority
                />
              </div>

              {/* Doctor Info */}
              <div className="p-6 sm:p-7 flex flex-col justify-between flex-1">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#EAF5F4] text-[#087F79] text-[11px] font-bold">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#087F79]" />
                    <span>FEATURED SPECIALIST</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-[#102B46] mt-2 leading-snug">
                    Dr. Jatinder Singla
                  </h3>
                  <p className="text-xs sm:text-sm font-medium text-[#087F79] mt-0.5">
                    Senior Director &bull; Orthopaedics &amp; Robotic Joint Replacement
                  </p>

                  <div className="space-y-2 mt-4 pt-3 border-t border-[#DCE5EB]/70 text-xs text-[#627486]">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-3.5 h-3.5 text-[#087F79] shrink-0" />
                      <span>Fortis Hospital Mohali</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-[#087F79] shrink-0" />
                      <span>25+ Years Experience (15,000+ Surgeries)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-3.5 h-3.5 text-[#087F79] shrink-0" />
                      <span>MBBS, MS (Orthopaedics)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="w-3.5 h-3.5 text-[#087F79] shrink-0" />
                      <span>Fellowships: Arthroplasty (UK &amp; Germany)</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#DCE5EB] flex items-center justify-between">
                  <Link
                    href="/doctors"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#087F79] hover:bg-[#066f6a] text-white text-xs sm:text-sm font-semibold transition-all shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087F79]"
                  >
                    <span>View Specialist Profile</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    href="/doctors"
                    className="text-xs font-semibold text-[#087F79] hover:text-[#102B46] transition-colors"
                  >
                    All Doctors →
                  </Link>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
