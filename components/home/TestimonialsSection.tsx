"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Sparkles, ShieldCheck } from "lucide-react";
import { useCare } from "@/context/CareContext";

// Bespoke Large Double Quote Icon
const QuoteIcon = () => (
  <svg
    className="w-10 h-10 text-[#0B5D68]/20"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-.808 0-1.89-.319-2.748-1.179Zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-.808 0-1.89-.319-2.748-1.179Z" />
  </svg>
);

interface PatientTestimonial {
  id: string;
  name: string;
  recoveryTag: string;
  country: string;
  procedure: string;
  hospital: string;
  quote: string;
  avatar: string;
  savings: string;
}

const testimonials: PatientTestimonial[] = [
  {
    id: "arnulfo",
    name: "Arnulfo Seibert",
    recoveryTag: "Cardiac Recovery",
    country: "United States 🇺🇸",
    procedure: "Minimally Invasive Cardiac Valve Repair",
    hospital: "Fortis Escorts Heart Institute",
    quote:
      "The cardiology team didn't just treat my condition — they gave me back my life. From the first video review to post-surgery rehab, every moment was handled with genuine warmth and world-class surgical expertise.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300",
    savings: "Saved $78,000 vs US",
  },
  {
    id: "kane",
    name: "Kane Wilson",
    recoveryTag: "Orthopaedic Recovery",
    country: "Accra, Ghana 🇬🇭",
    procedure: "Bilateral Robotic Knee Replacement",
    hospital: "Fortis Hospital Mohali",
    quote:
      "Dr. Singla's Mako robotic knee replacement had me walking independently in days. My personal care coordinator stayed with our family every step of the way.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300",
    savings: "Saved $24,000 vs UK Private",
  },
  {
    id: "daniel",
    name: "Daniel Okafor",
    recoveryTag: "Joint Arthroplasty Recovery",
    country: "London, United Kingdom 🇬🇧",
    procedure: "Robotic Hip Arthroplasty (MAKO)",
    hospital: "Max Super Speciality Hospital",
    quote:
      "Skipped an 18-month NHS surgical waiting list and saved over £14,000. Executive chauffeured airport pickup, private hospital suite, and completely pain-free recovery.",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=300",
    savings: "Saved £14,000 vs NHS Wait",
  },
];

export const TestimonialsSection = () => {
  const { openIntake } = useCare();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const current = testimonials[currentIndex];

  return (
    <section id="stories" className="w-full py-20 sm:py-28 lg:py-32 font-sans border-t border-[#DCE6EB] bg-[#FCFDFD]">
      <div className="max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Header: Minimal & Breathable */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ECF4F7] border border-[#DCE6EB] text-[#0B5D68] text-xs font-heading font-bold uppercase tracking-wider mb-4 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#0B5D68]" />
              <span>PATIENT STORIES &amp; CLINICAL OUTCOMES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-heading font-extrabold text-[#0C2338] leading-[1.15] tracking-tight">
              Real Journeys.{" "}
              <span className="text-[#0B5D68]">Documented Recoveries.</span>
            </h2>
            <p className="text-[#6B7C88] text-base sm:text-lg leading-relaxed font-normal mt-3">
              Hear directly from international patients who chose India for life-changing quaternary surgeries.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-end">
            <button
              onClick={handlePrev}
              aria-label="Previous story"
              className="w-10 h-10 rounded-full bg-white hover:bg-slate-100 text-[#0C2338] border border-[#DCE6EB] flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next story"
              className="w-10 h-10 rounded-full bg-[#0B5D68] hover:bg-[#07434B] text-white flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Story Card: Soft Light Background with Editorial Image & Short Quote */}
        <div className="bg-white rounded-3xl border border-[#DCE6EB] p-8 sm:p-12 lg:p-14 shadow-xl shadow-slate-200/50 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Visual Story Canvas */}
          <div className="lg:col-span-5 relative w-full aspect-[4/3] sm:aspect-[16/11] rounded-2xl overflow-hidden bg-slate-100 border border-[#DCE6EB]">
            <Image
              src="/images/testimonials/doctor-portrait.jpg"
              alt="Clinical Specialist reviewing patient case"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0C2338]/85 via-transparent to-transparent" />
            
            <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between text-white text-xs">
              <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 font-heading font-medium">
                {current.hospital}
              </span>
              <span className="px-3 py-1 rounded-full bg-[#F0A126] text-[#0C2338] font-heading font-bold">
                {current.savings}
              </span>
            </div>
          </div>

          {/* Right Column: Short Quote & Verified Details */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <QuoteIcon />
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#F0A126] text-[#F0A126]" />
                  ))}
                </div>
              </div>

              {/* 1–2 Line Impactful Quote */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-xl sm:text-2xl lg:text-[25px] font-heading font-extrabold text-[#0C2338] leading-relaxed mb-6">
                    &ldquo;{current.quote}&rdquo;
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Patient Attribution */}
            <div className="pt-6 border-t border-[#DCE6EB] flex items-center gap-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#0B5D68] shrink-0 bg-slate-100">
                <Image
                  src={current.avatar}
                  alt={current.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-heading font-extrabold text-base sm:text-lg text-[#0C2338] leading-tight">
                  {current.name}
                </h3>
                <p className="text-xs text-[#6B7C88] mt-0.5 font-medium">
                  {current.procedure} · <span className="text-[#0B5D68]">{current.country}</span>
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
