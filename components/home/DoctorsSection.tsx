"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  GraduationCap,
  Award,
  Building2,
  ShieldCheck,
  Star,
  CheckCircle2,
} from "lucide-react";
import { useCare } from "@/context/CareContext";

interface FeaturedDoctor {
  id: string;
  name: string;
  shortName: string;
  title: string;
  department: string;
  experience: string;
  image: string;
  hospital: string;
  hospitalAccreditation: string;
  degrees: string;
  fellowships: string;
  highlight: string;
  stats: {
    surgeries: string;
    successRate: string;
    fellowshipLocale: string;
  };
  focusTags: string[];
}

const FEATURED_DOCTORS: FeaturedDoctor[] = [
  {
    id: "dr-jatinder-singla",
    name: "Dr. Jatinder Singla",
    shortName: "Dr. Singla · Joint Surgery",
    title: "Senior Director & Chief Surgeon",
    department: "Orthopaedics & Robotic Joint Replacement",
    experience: "25+ Years Mastery",
    image: "/jatinder-singla.png",
    hospital: "Fortis Hospital Mohali",
    hospitalAccreditation: "JCI & NABH Accredited",
    degrees: "MBBS, MS (Orthopaedics), M.Ch (Orth)",
    fellowships: "Fellowships: Arthroplasty (UK, Germany & Switzerland)",
    highlight: "Certified Mako Robotic Arm & Minimally Invasive Joint Specialist",
    stats: {
      surgeries: "15,000+",
      successRate: "99.4%",
      fellowshipLocale: "UK & Ger",
    },
    focusTags: [
      "Robotic Knee Replacement",
      "Direct Anterior Hip",
      "Complex Revision Arthroplasty",
      "Joint Preservation",
    ],
  },
  {
    id: "dr-vikas-gupta",
    name: "Dr. Vikas Gupta",
    shortName: "Dr. Gupta · Cardiology",
    title: "Director & Head of Cardiac Sciences",
    department: "Interventional Cardiology & Structural Heart",
    experience: "22+ Years Mastery",
    image: "/vikas-gupta.png",
    hospital: "Max Super Speciality Hospital Mohali",
    hospitalAccreditation: "JCI & NABH Accredited",
    degrees: "MBBS, MD (Medicine), DM (Cardiology), FACC (USA)",
    fellowships: "Fellow of American College of Cardiology (FACC, USA) & UK",
    highlight: "Pioneer in Complex Radial Angioplasty & TAVI Valve Implants",
    stats: {
      surgeries: "12,000+",
      successRate: "99.2%",
      fellowshipLocale: "USA & UK",
    },
    focusTags: [
      "Complex Coronary Angioplasty",
      "TAVI / TAVR Valve Replacement",
      "Heart Failure Management",
      "Radial Artery Access",
    ],
  },
  {
    id: "dr-ashish-ahuja",
    name: "Dr. Ashish Ahuja",
    shortName: "Dr. Ahuja · Bariatric",
    title: "Senior Consultant & Metabolic Specialist",
    department: "Bariatric & Minimal Access Metabolic Surgery",
    experience: "19+ Years Mastery",
    image: "/ashish-ahuja.png",
    hospital: "Healing Super Speciality Hospital Chandigarh",
    hospitalAccreditation: "NABH Accredited Hub",
    degrees: "MBBS, MS (Surgery), FIAGES, FALS (Bariatric)",
    fellowships: "Fellow International College of Robotic Surgeons (USA)",
    highlight: "Certified Robotic Bariatric & Single-Incision Laparoscopic Lead",
    stats: {
      surgeries: "7,500+",
      successRate: "99.1%",
      fellowshipLocale: "USA & Asia",
    },
    focusTags: [
      "Robotic Gastric Bypass",
      "Sleeve Gastrectomy",
      "Metabolic Diabetes Surgery",
      "Single-Incision Laparoscopy",
    ],
  },
];

export const DoctorsSection: React.FC = () => {
  const { openIntake } = useCare();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Auto Slider Timer (slides every 6 seconds, pauses on mouse hover / touch)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % FEATURED_DOCTORS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? FEATURED_DOCTORS.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % FEATURED_DOCTORS.length);
  };

  // Touch Swipe Gesture Handlers for Ultra Smooth Mobile Navigation
  const minSwipeDistance = 45;

  const onTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    setIsPaused(false);
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

  const currentDoctor = FEATURED_DOCTORS[currentIndex];

  return (
    <section
      id="doctors"
      className="py-14 sm:py-20 lg:py-24 bg-[#EAF5F4] border-b border-[#DCE5EB] relative overflow-hidden"
    >
      {/* Soft Background Ambient Illumination */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#087F79]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#102B46]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ========================================================
            ROW 01: SECTION HEADING ROW (Badge, Headline & Actions)
           ======================================================== */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 sm:mb-10">
          <div className="max-w-2xl">
            {/* Section Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#087F79]/20 shadow-2xs mb-3.5">
              <span className="w-2 h-2 rounded-full bg-[#087F79] animate-pulse" />
              <span className="text-[#087F79] text-xs font-bold uppercase tracking-wider">
                OUR MEDICAL NETWORK
              </span>
            </div>

            {/* Main Headline */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#102B46] tracking-tight leading-tight">
              Experienced Specialists &amp; Renowned Surgeons
            </h2>

            {/* Descriptive Subtext */}
            <p className="text-[#627486] text-sm sm:text-base mt-2.5 leading-relaxed font-normal">
              Connect directly with distinguished department heads and senior surgeons with international fellowships and decades of proven clinical outcomes.
            </p>
          </div>

          {/* Auto Slider Indicator Dots */}
          <div className="flex items-center gap-2 shrink-0">
            {FEATURED_DOCTORS.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to specialist ${idx + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  idx === currentIndex
                    ? "w-8 h-2.5 bg-[#087F79]"
                    : "w-2.5 h-2.5 bg-[#DCE5EB] hover:bg-[#087F79]/40"
                }`}
              />
            ))}
          </div>
        </div>

        {/* ========================================================
            ROW 02: FEATURED SPECIALIST CARD (SEPARATE ROW AUTO SLIDER)
           ======================================================== */}
        <div
          className="w-full relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Main Card Container (Responsive: Column on Mobile, Side-by-Side on Tablet & Desktop) */}
          <div className="bg-white rounded-3xl border border-[#DCE5EB] shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col md:flex-row items-stretch group">

            {/* Left Column: Doctor Portrait Photo */}
            <div className="relative w-full md:w-[320px] lg:w-[380px] xl:w-[420px] h-[340px] sm:h-[400px] md:h-auto md:min-h-[500px] bg-gradient-to-br from-[#087F79]/10 via-slate-100 to-[#102B46]/10 shrink-0 overflow-hidden">
              <Image
                key={currentDoctor.id}
                src={currentDoctor.image}
                alt={`${currentDoctor.name} - ${currentDoctor.title}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 380px, 420px"
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                priority
              />
            </div>

            {/* Right Column: Doctor Details, Stats, Credentials & CTAs */}
            <div className="p-5 sm:p-7 lg:p-9 xl:p-10 flex flex-col justify-between flex-1 bg-white">
              <div>
                {/* Header Strip with Badge & Experience */}
                <div className="flex flex-wrap items-center justify-between gap-2.5">
                  <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full bg-[#EAF5F4] text-[#087F79] text-[11px] sm:text-xs font-bold border border-[#087F79]/20">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#087F79]" />
                    <span>FEATURED SPECIALIST · CHIEF SURGEON</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-[#F8FAFC] text-[#102B46] text-[11px] sm:text-xs font-bold border border-[#DCE5EB] shadow-2xs">
                      <Star className="w-3.5 h-3.5 text-[#F0A126] fill-[#F0A126]" />
                      <span>{currentDoctor.experience}</span>
                    </span>

                    <span className="text-xs font-bold text-[#627486] bg-slate-100 px-2.5 py-1 rounded-md hidden lg:inline-block">
                      Specialist {currentIndex + 1} of {FEATURED_DOCTORS.length}
                    </span>
                  </div>
                </div>

                {/* Doctor Name & Department (Always Clearly Visible on ALL viewports) */}
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#102B46] mt-3 leading-tight">
                  {currentDoctor.name}
                </h3>

                <p className="text-xs sm:text-sm font-semibold text-[#087F79] mt-1 sm:mt-1.5 leading-snug">
                  {currentDoctor.title} &bull; {currentDoctor.department}
                </p>

                {/* 3-Column Surgery Stats Strip (Fluid Responsive Sizing) */}
                <div className="grid grid-cols-3 gap-2 my-4 sm:my-5 p-3 sm:p-3.5 rounded-2xl bg-[#F8FAFC] border border-[#DCE5EB] text-center">
                  <div>
                    <p className="text-sm sm:text-lg lg:text-xl font-extrabold text-[#102B46] leading-tight">
                      {currentDoctor.stats.surgeries}
                    </p>
                    <p className="text-[10px] sm:text-xs font-medium text-[#627486] mt-0.5">Surgeries Done</p>
                  </div>
                  <div className="border-x border-[#DCE5EB]">
                    <p className="text-sm sm:text-lg lg:text-xl font-extrabold text-[#087F79] leading-tight">
                      {currentDoctor.stats.successRate}
                    </p>
                    <p className="text-[10px] sm:text-xs font-medium text-[#627486] mt-0.5">Clinical Success</p>
                  </div>
                  <div>
                    <p className="text-sm sm:text-lg lg:text-xl font-extrabold text-[#102B46] leading-tight truncate px-0.5" title={currentDoctor.stats.fellowshipLocale}>
                      {currentDoctor.stats.fellowshipLocale}
                    </p>
                    <p className="text-[10px] sm:text-xs font-medium text-[#627486] mt-0.5">Fellowships</p>
                  </div>
                </div>

                {/* Credentials & Institutional Badges */}
                <div className="space-y-2 sm:space-y-2.5 text-xs text-[#627486]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-md bg-[#EAF5F4] flex items-center justify-center shrink-0">
                      <Building2 className="w-3.5 h-3.5 text-[#087F79]" />
                    </div>
                    <span className="font-medium text-[#102B46]">
                      {currentDoctor.hospital}{" "}
                      <span className="text-[#627486] font-normal">({currentDoctor.hospitalAccreditation})</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-md bg-[#EAF5F4] flex items-center justify-center shrink-0">
                      <GraduationCap className="w-3.5 h-3.5 text-[#087F79]" />
                    </div>
                    <span className="line-clamp-1">{currentDoctor.degrees}</span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-md bg-[#EAF5F4] flex items-center justify-center shrink-0">
                      <Award className="w-3.5 h-3.5 text-[#087F79]" />
                    </div>
                    <span className="line-clamp-1">{currentDoctor.fellowships}</span>
                  </div>
                </div>

                {/* Clinical Focus Tags */}
                <div className="mt-4 sm:mt-5 pt-3.5 sm:pt-4 border-t border-[#DCE5EB]">
                  <p className="text-[11px] uppercase tracking-wider font-semibold text-[#627486] mb-2">
                    Primary Clinical Specialties:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {currentDoctor.focusTags.map((spec) => (
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

              {/* Bottom Action CTAs + Pagination Controls */}
              <div className="mt-6 pt-5 border-t border-[#DCE5EB] flex flex-col sm:flex-row items-center justify-between gap-3.5">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => openIntake(`${currentDoctor.name} - ${currentDoctor.department}`)}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#087F79] hover:bg-[#066f6a] text-white text-xs sm:text-sm font-semibold transition-all shadow-sm hover:shadow-md cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087F79] active:scale-[0.99]"
                  >
                    <span>Request Case Review</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <Link
                    href="/doctors"
                    className="text-xs font-bold text-[#087F79] hover:text-[#102B46] transition-colors inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg hover:bg-[#EAF5F4]"
                  >
                    <span>View Profile</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* Slider Dot Indicators on Card */}
                <div className="flex items-center gap-1.5">
                  {FEATURED_DOCTORS.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setCurrentIndex(idx)}
                      className={`h-2 transition-all rounded-full cursor-pointer ${
                        idx === currentIndex
                          ? "w-7 bg-[#087F79]"
                          : "w-2 bg-[#DCE5EB] hover:bg-[#087F79]/40"
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>

            </div>

          </div>

          {/* Quick Specialist Switcher Tabs & Auto-slide Badge */}
          <div className="mt-4 sm:mt-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-1">
            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 scrollbar-none snap-x">
              <span className="text-[11px] font-semibold text-[#627486] uppercase tracking-wider shrink-0 mr-1">
                Featured Specialists:
              </span>
              {FEATURED_DOCTORS.map((doc, idx) => (
                <button
                  key={doc.id}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all shrink-0 cursor-pointer flex items-center gap-1.5 shadow-2xs snap-start ${
                    idx === currentIndex
                      ? "bg-[#087F79] text-white font-semibold"
                      : "bg-white text-[#627486] hover:text-[#102B46] border border-[#DCE5EB] hover:bg-slate-50"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      idx === currentIndex ? "bg-white" : "bg-[#087F79]"
                    }`}
                  />
                  <span>{doc.shortName}</span>
                </button>
              ))}
            </div>

            {/* Auto slide active indicator */}
            <div className="hidden sm:flex items-center gap-2 text-xs text-[#627486] shrink-0">
              <span
                className={`w-2 h-2 rounded-full ${
                  isPaused ? "bg-amber-400" : "bg-[#087F79] animate-pulse"
                }`}
              />
              <span className="text-[11px] font-medium">
                {isPaused ? "Auto-slider paused on touch/hover" : "Auto-sliding (6s interval)"}
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
