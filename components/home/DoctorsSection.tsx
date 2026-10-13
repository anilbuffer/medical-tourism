"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  GraduationCap,
  Award,
  Building2,
  Clock,
  ShieldCheck,
  Star,
  CheckCircle2,
  Calendar,
  Sparkles,
} from "lucide-react";
import { useCare } from "@/context/CareContext";

export const DoctorsSection: React.FC = () => {
  const { openIntake } = useCare();

  return (
    <section id="doctors" className="py-16 sm:py-20 lg:py-24 bg-[#EAF5F4] border-b border-[#DCE5EB] relative overflow-hidden">
      {/* Soft Background Accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#087F79]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* Left Column: Section Heading, Value Props & Links */}
          <div className="lg:col-span-5 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#087F79]/20 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#087F79]" />
              <span className="text-[#087F79] text-xs font-bold uppercase tracking-wider">
                OUR MEDICAL NETWORK
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#102B46] tracking-tight leading-tight">
              Experienced Specialists &amp; Renowned Surgeons
            </h2>

            <p className="text-[#627486] text-sm sm:text-base leading-relaxed">
              Connect directly with distinguished department heads and senior surgeons with international fellowships and decades of proven clinical outcomes.
            </p>

            {/* Quick Benefits Bullet Points */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-white border border-[#087F79]/30 flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#087F79]" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#102B46]">Direct Chief Surgeon Care</h4>
                  <p className="text-xs text-[#627486]">Surgeries performed exclusively by senior directors, not junior residents.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-white border border-[#087F79]/30 flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#087F79]" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#102B46]">Pre-Travel Video Assessment</h4>
                  <p className="text-xs text-[#627486]">Review MRI scans and surgical plans with your surgeon before booking flights.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-white border border-[#087F79]/30 flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#087F79]" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#102B46]">Priority Admission Scheduling</h4>
                  <p className="text-xs text-[#627486]">Immediate surgical queue slots upon medical clearance with zero waitlists.</p>
                </div>
              </div>
            </div>

            <div className="pt-3">
              <Link
                href="/doctors"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-white hover:bg-[#EAF5F4] text-[#102B46] hover:text-[#087F79] border border-[#DCE5EB] hover:border-[#087F79]/40 font-semibold text-sm transition-all duration-200 shadow-sm hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087F79]"
              >
                <span>Meet All 45+ Specialists</span>
                <ArrowRight className="w-4 h-4 text-[#087F79] transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Right Column: Featured Specialist Card (Larger, prominent card with large image) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl border border-[#DCE5EB] shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col md:flex-row items-stretch group">

              {/* Large Doctor Photo with Overlay Badges */}
              <div className="relative w-full md:w-80 lg:w-[350px] min-h-[360px] md:min-h-[480px] bg-gradient-to-br from-[#087F79]/10 via-slate-100 to-[#102B46]/10 shrink-0 overflow-hidden">
                <Image
                  src="/jatinder-singla.png"
                  alt="Dr. Jatinder Singla - Senior Director & Chief Surgeon"
                  fill
                  sizes="(max-width: 768px) 100vw, 350px"
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  priority
                />

                {/* Subtle Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#102B46]/80 via-transparent to-black/10 md:hidden" />

                {/* Top Badge: Seniority / Experience Tag */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#102B46]/90 backdrop-blur-md text-white text-[11px] font-bold shadow-md border border-white/20">
                    <Star className="w-3.5 h-3.5 text-[#F0A126] fill-[#F0A126]" />
                    <span>25+ Years Mastery</span>
                  </span>
                </div>

                {/* Mobile Bottom Name Tag (on image) */}
                <div className="absolute bottom-4 left-4 right-4 z-10 text-white md:hidden">
                  <span className="text-xs text-teal-300 font-semibold block">Fortis Hospital Mohali</span>
                  <h3 className="text-xl font-bold">Dr. Jatinder Singla</h3>
                </div>
              </div>

              {/* Doctor Details & Credentials Panel */}
              <div className="p-7 sm:p-8 md:p-9 flex flex-col justify-between flex-1 bg-white">
                <div>
                  {/* Top Badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAF5F4] text-[#087F79] text-xs font-bold border border-[#087F79]/20">
                    <ShieldCheck className="w-4 h-4 text-[#087F79]" />
                    <span>FEATURED SPECIALIST · CHIEF SURGEON</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-[#102B46] mt-3 leading-tight hidden md:block">
                    Dr. Jatinder Singla
                  </h3>

                  <p className="text-xs sm:text-sm font-semibold text-[#087F79] mt-1.5 leading-snug">
                    Senior Director &bull; Orthopaedics &amp; Robotic Joint Replacement
                  </p>

                  {/* 3-Column Quick Surgery Stats Strip */}
                  <div className="grid grid-cols-3 gap-2 my-5 p-3 rounded-2xl bg-[#F8FAFC] border border-[#DCE5EB] text-center">
                    <div>
                      <p className="text-base sm:text-lg font-extrabold text-[#102B46]">15,000+</p>
                      <p className="text-[10px] sm:text-[11px] font-medium text-[#627486]">Surgeries</p>
                    </div>
                    <div className="border-x border-[#DCE5EB]">
                      <p className="text-base sm:text-lg font-extrabold text-[#087F79]">99.4%</p>
                      <p className="text-[10px] sm:text-[11px] font-medium text-[#627486]">Success Rate</p>
                    </div>
                    <div>
                      <p className="text-base sm:text-lg font-extrabold text-[#102B46]">UK &amp; Ger</p>
                      <p className="text-[10px] sm:text-[11px] font-medium text-[#627486]">Fellowships</p>
                    </div>
                  </div>

                  {/* Credentials & Institutional Badges */}
                  <div className="space-y-2.5 text-xs text-[#627486]">
                    <div className="flex items-center gap-2.5">
                      <div className="w-5 h-5 rounded-md bg-[#EAF5F4] flex items-center justify-center shrink-0">
                        <Building2 className="w-3.5 h-3.5 text-[#087F79]" />
                      </div>
                      <span className="font-medium text-[#102B46]">Fortis Hospital Mohali <span className="text-[#627486] font-normal">(JCI &amp; NABH Accredited)</span></span>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <div className="w-5 h-5 rounded-md bg-[#EAF5F4] flex items-center justify-center shrink-0">
                        <GraduationCap className="w-3.5 h-3.5 text-[#087F79]" />
                      </div>
                      <span>MBBS, MS (Orthopaedics), M.Ch (Orth)</span>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <div className="w-5 h-5 rounded-md bg-[#EAF5F4] flex items-center justify-center shrink-0">
                        <Award className="w-3.5 h-3.5 text-[#087F79]" />
                      </div>
                      <span>Fellowships: Arthroplasty (UK, Germany &amp; Switzerland)</span>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <div className="w-5 h-5 rounded-md bg-[#EAF5F4] flex items-center justify-center shrink-0">
                        <Sparkles className="w-3.5 h-3.5 text-[#087F79]" />
                      </div>
                      <span className="text-[#087F79] font-medium">Certified Mako Robotic Arm &amp; Minimally Invasive Joint Specialist</span>
                    </div>
                  </div>

                  {/* Specialty Focus Tags */}
                  <div className="mt-5 pt-4 border-t border-[#DCE5EB]">
                    <p className="text-[11px] uppercase tracking-wider font-semibold text-[#627486] mb-2">
                      Clinical Focus:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {["Robotic Knee Replacement", "Direct Anterior Hip", "Complex Revision Arthroplasty", "Joint Preservation"].map((spec) => (
                        <span
                          key={spec}
                          className="px-2.5 py-1 rounded-lg bg-[#EAF5F4] text-[#102B46] text-xs font-medium"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Action CTAs */}
                <div className="mt-7 pt-5 border-t border-[#DCE5EB] flex flex-col sm:flex-row items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => openIntake("Dr. Jatinder Singla - Orthopaedics")}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#087F79] hover:bg-[#066f6a] text-white text-xs sm:text-sm font-semibold transition-all shadow-sm hover:shadow-md cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087F79]"
                  >
                    <span>Request Case Review</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <Link
                    href="/doctors"
                    className="text-xs font-bold text-[#087F79] hover:text-[#102B46] transition-colors inline-flex items-center gap-1.5 py-2"
                  >
                    <span>View Full Profile</span>
                    <ArrowRight className="w-3.5 h-3.5" />
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

