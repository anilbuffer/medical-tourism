"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { useCare } from "@/context/CareContext";

// Bespoke Large Double Quote Icon matching the reference layout
const QuoteIcon = () => (
  <svg
    className="w-12 h-12 sm:w-16 sm:h-16 text-[#F0A126]"
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
  rating: number;
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
      "The cardiology team didn't just treat my condition — they gave me back my confidence. From the first emergency call to post-surgery rehab, every moment was handled with genuine warmth and world-class expertise. I'm grateful beyond words.",
    rating: 5,
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
      "The orthopaedic team didn't just treat my severe knee osteoarthritis — they gave me back my life and independent mobility. From the initial MRI review to our airport arrival and post-op physical rehabilitation, every single moment was handled with genuine warmth and world-class surgical expertise. I was walking independently within 10 days.",
    rating: 5,
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
      "Skipped an 18-month NHS surgical waitlist and saved over £14,000. My dedicated concierge met us at Delhi airport with an executive car, escorted us through hospital admissions, and visited my serviced apartment every morning. The Stryker titanium implant and muscle-sparing surgery let me return home fully pain-free.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=300",
    savings: "Saved £14,000 vs NHS Wait",
  },
  {
    id: "sarah",
    name: "Sarah & David Mwangi",
    recoveryTag: "Fertility & Embryology Care",
    country: "Nairobi, Kenya 🇰🇪",
    procedure: "IVF with ICSI & PGT-A Genetics",
    hospital: "Healing Super Speciality Hospital",
    quote:
      "The embryology cleanrooms and advanced genetic testing protocols were far superior to anything available back home. Having a dedicated care coordinator organize all consultations, pharmacy protocols, and private hospital transfers took away 100% of the travel anxiety. We welcomed our healthy baby girl this spring.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300",
    savings: "68% Success Rate on Cycle 1",
  },
  {
    id: "lilian",
    name: "Lilian Omondi",
    recoveryTag: "Laser Refractive Vision Recovery",
    country: "Mombasa, Kenya 🇰🇪",
    procedure: "Contoura Vision Blade-Free LASIK",
    hospital: "Sangam Netralaya Eye Hospital",
    quote:
      "Blade-free topography-guided surgery took just 10 minutes per eye and was completely painless. Dr. Ahuja tested my cornea with 22,000 elevation points. I woke up the very next morning with crystal-clear 20/20 vision without eyeglasses for the first time in 20 years.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300",
    savings: "Outpatient • 24h Recovery",
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
    <section id="stories" className="w-full relative overflow-hidden font-sans border-t border-b border-[#DCE6EB] bg-[#0C2338]">
      
      {/* 01. Desktop Edge-to-Edge Split Background */}
      <div className="hidden lg:grid absolute inset-0 grid-cols-12 pointer-events-none">
        {/* Left half: Deep Navy with subtle ambient teal radial glow */}
        <div className="col-span-7 xl:col-span-6 bg-gradient-to-br from-[#0C2338] via-[#091F33] to-[#061726] relative">
          <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-[#0B5D68]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-[#14B8A6]/10 rounded-full blur-3xl pointer-events-none" />
        </div>
        
        {/* Right half: clinical doctor photo to the edge */}
        <div className="col-span-5 xl:col-span-6 relative bg-slate-900 overflow-hidden">
          <Image
            src="/images/testimonials/doctor-portrait.jpg"
            alt="Chief Clinical Specialist reviewing patient case"
            fill
            priority
            sizes="50vw"
            className="object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20" />
          
          {/* Bottom Review Ribbon on Photo */}
          <div className="absolute bottom-8 left-8 right-8 z-10 flex justify-center">
            <div className="w-full max-w-md px-6 py-3.5 rounded-full bg-[#0B5D68]/95 backdrop-blur-md text-white shadow-2xl border border-[#14B8A6]/40 flex items-center justify-center gap-3">
              <Sparkles className="w-4 h-4 text-[#F0A126] fill-[#F0A126] shrink-0" />
              <span className="text-xs sm:text-sm font-heading font-bold tracking-wide">
                Rated 4.9 out of 5 based on 5K+ global reviews
              </span>
              <Sparkles className="w-4 h-4 text-[#14B8A6] fill-[#14B8A6] shrink-0" />
            </div>
          </div>
        </div>
      </div>

      {/* 02. Content Layer: Aligned with the 1580px Container Grid */}
      <div className="max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[640px] xl:min-h-[720px]">
          
          {/* Left Column: Aligned with Container */}
          <div className="lg:col-span-7 xl:col-span-6 py-16 sm:py-20 lg:py-24 pr-0 lg:pr-12 xl:pr-16 flex flex-col justify-between text-white">
            
            {/* Header Area */}
            <div>
              {/* Badge with vibrant #14B8A6 pulse */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-[#14B8A6]/30 text-[#ECF4F7] text-xs font-heading font-bold uppercase tracking-wider mb-5 backdrop-blur-md shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#14B8A6] animate-pulse" />
                <span>REAL STORIES • CLINICAL OUTCOMES</span>
              </div>

              {/* Headline */}
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] xl:text-[46px] font-heading font-extrabold text-white leading-[1.15] mb-8 lg:mb-10 tracking-tight">
                What Our Patients &amp; Families Say About Their{" "}
                <span className="text-[#14B8A6]">Journey.</span>
              </h2>

              {/* Quote Mark Icon + 5 Stars Row */}
              <div className="flex items-center justify-between mb-8 pb-1">
                <QuoteIcon />
                <div className="flex items-center gap-1.5">
                  {[...Array(current.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 sm:w-6 sm:h-6 fill-[#F0A126] text-[#F0A126]"
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Testimonial Quote with Smooth Motion */}
            <div className="my-auto py-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <p className="text-slate-100 text-base sm:text-lg lg:text-[19px] leading-relaxed font-body font-normal max-w-2xl min-h-[110px]">
                    &ldquo;{current.quote}&rdquo;
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Patient Details & Carousel Arrows Row */}
            <div className="pt-8 sm:pt-10 border-t border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              {/* Patient Avatar + Info */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.25 }}
                  className="flex items-center gap-4 sm:gap-5"
                >
                  <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-[#14B8A6] shrink-0 shadow-lg ring-2 ring-white/10">
                    <Image
                      src={current.avatar}
                      alt={current.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2.5">
                      <h3 className="font-heading font-bold text-lg sm:text-xl text-white leading-tight">
                        {current.name}
                      </h3>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#14B8A6]/20 border border-[#14B8A6]/40 text-[#14B8A6] text-[11px] font-heading font-bold">
                        {current.savings}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 font-medium font-body mt-1">
                      {current.recoveryTag} · <span className="text-[#ECF4F7]">{current.country}</span>
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Controls: Secondary Button 2 + Primary Button 1 styling */}
              <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
                <button
                  onClick={handlePrev}
                  aria-label="Previous testimonial"
                  className="w-12 h-12 rounded-full bg-white/10 hover:bg-[#0B5D68] text-white flex items-center justify-center transition-all duration-300 cursor-pointer border border-white/20 active:scale-95 shadow-sm group"
                >
                  <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" />
                </button>
                <button
                  onClick={handleNext}
                  aria-label="Next testimonial"
                  className="w-12 h-12 rounded-full bg-[#F0A126] hover:bg-[#db8e18] text-[#0C2338] flex items-center justify-center transition-all duration-300 cursor-pointer border border-[#F0A126] active:scale-95 shadow-md shadow-[#F0A126]/30 group"
                >
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column Spacer for Desktop */}
          <div className="hidden lg:block lg:col-span-5 xl:col-span-6 pointer-events-none" />
        </div>
      </div>

      {/* 03. Mobile-Only Photo & Ribbon Block */}
      <div className="block lg:hidden relative w-full h-[460px] bg-slate-900 overflow-hidden">
        <Image
          src="/images/testimonials/doctor-portrait.jpg"
          alt="Chief Clinical Specialist reviewing patient case"
          fill
          sizes="100vw"
          className="object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
        <div className="absolute bottom-6 left-4 right-4 z-10 flex justify-center">
          <div className="w-full max-w-md px-5 py-3 rounded-full bg-[#0B5D68]/95 backdrop-blur-md text-white shadow-2xl border border-[#14B8A6]/40 flex items-center justify-center gap-2.5">
            <Sparkles className="w-4 h-4 text-[#F0A126] fill-[#F0A126] shrink-0" />
            <span className="text-xs font-heading font-bold tracking-wide">
              Rated 4.9 out of 5 based on 5K+ reviews
            </span>
            <Sparkles className="w-4 h-4 text-[#14B8A6] fill-[#14B8A6] shrink-0" />
          </div>
        </div>
      </div>

    </section>
  );
};
