"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import {
  ArrowRight,
  Clock,
  CheckCircle2,
  ShieldCheck,
  ChevronRight,
  Sparkles
} from "lucide-react";
import { useCare } from "@/context/CareContext";

export const SpecialtiesSection = () => {
  const { openIntake } = useCare();
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isClickScrolling = useRef(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (isClickScrolling.current) return;
    const numTabs = 5;
    const index = Math.min(
      Math.floor(latest * numTabs),
      numTabs - 1
    );
    if (index >= 0 && index !== activeStep) {
      setActiveStep(index);
    }
  });

  const handleTabClick = (idx: number) => {
    setActiveStep(idx);
    if (!sectionRef.current) return;

    const rect = sectionRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY || window.pageYOffset;
    const sectionTop = rect.top + scrollTop;
    const scrollableDistance = sectionRef.current.offsetHeight - window.innerHeight;

    if (scrollableDistance > 0) {
      const progress = (idx + 0.5) / 5;
      const targetY = sectionTop + progress * scrollableDistance;

      isClickScrolling.current = true;
      window.scrollTo({
        top: targetY,
        behavior: "smooth"
      });

      setTimeout(() => {
        isClickScrolling.current = false;
      }, 700);
    }
  };

  const specialties = [
    {
      id: "ortho",
      title: "Orthopaedics & Robotic Joint Replacement",
      shortTitle: "Orthopaedics & Joints",
      subtitle: "Move without pain. Walk independently on day one.",
      tags: ["Joints", "Spine", "Robotic Knee", "Hip Replacement", "MAKO System"],
      image: "https://images.unsplash.com/photo-1597764690523-15bea4c581c9?auto=format&fit=crop&q=80&w=1200",
      featuredBadge: "Most Requested Quaternary Care",
      stat: "11,00+ Surgeries",
      tech: "Robotic MAKO & NAVIO Navigation",
      savings: "Save 70% vs UK/US",
      stay: "7–14 Days",
      quote: "Direct anterior, muscle-sparing approaches enabling day-one independent ambulation with zero muscle detachment.",
      protocols: [
        "Mako Stryker CT-Guided 3D Robotic Navigation",
        "Sub-Millimeter Implant Alignment Precision",
        "Physiotherapist bedside within 6 hours of surgery",
        "FDA-Approved Zimmer Biomet & Stryker Titanium Implants"
      ]
    },
    {
      id: "dentistry",
      title: "Dentistry & Full-Arch Smile Architecture",
      shortTitle: "Dentistry & Implants",
      subtitle: "Complete full-mouth restoration with Swiss titanium implants.",
      tags: ["All-on-4", "All-on-6", "Zirconia Bridges", "CAD/CAM", "Cosmetic"],
      image: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=1200",
      featuredBadge: "Full-Arch Precision",
      stat: "99.4% Success Rate",
      tech: "3D CAD/CAM & Swiss Implants",
      savings: "Save 75% vs UK/US",
      stay: "3–7 Days",
      quote: "Immediate-load zirconia restorations and computer-guided implant placement delivered in a single clinical stay.",
      protocols: [
        "Nobel Biocare & Straumann Swiss Titanium Implants",
        "In-House CAD/CAM Precision Milling in 48 Hours",
        "Computer-Guided Flapless Minimally Invasive Surgery",
        "Lifetime Global Implant Warranty Certificate"
      ]
    },
    {
      id: "ivf",
      title: "IVF & Advanced Reproductive Medicine",
      shortTitle: "IVF & Fertility",
      subtitle: "Building families with state-of-the-art embryology suites.",
      tags: ["IVF", "ICSI", "PGT-A Screening", "Egg Freezing", "Zero Wait List"],
      image: "https://images.unsplash.com/photo-1625512239194-ab1ef761db86?auto=format&fit=crop&q=80&w=1200",
      featuredBadge: "Advanced Embryology Lab",
      stat: "68% Live Birth Rate",
      tech: "ICSI & PGT-A Genetic Screening",
      savings: "Save 65% vs UK/US",
      stay: "10–18 Days",
      quote: "State-of-the-art cleanroom IVF suites with zero wait times for donor cycles and comprehensive genetic testing.",
      protocols: [
        "Next-Generation Sequencing (NGS) Genetic Screening",
        "Laser-Assisted Hatching & Blastocyst Culture",
        "Time-Lapse Embryo Monitoring (EmbryoScope AI)",
        "Zero Wait Lists for Pre-Screened Donor Cycles"
      ]
    },
    {
      id: "cosmetic",
      title: "Cosmetic & High-Definition Plastic Surgery",
      shortTitle: "Cosmetic Surgery",
      subtitle: "Board-certified aesthetic surgery in private recovery suites.",
      tags: ["VASER 4D", "Rhinoplasty", "Facelift", "Mommy Makeover", "Hair Transplant"],
      image: "https://images.unsplash.com/photo-1621021544363-02108c715c1b?auto=format&fit=crop&q=80&w=1200",
      featuredBadge: "Board-Certified Plastic Surgeons",
      stat: "4,000+ Procedures",
      tech: "4D High-Definition VASER",
      savings: "Save 60% vs UK/US",
      stay: "5–10 Days",
      quote: "Artistic body contouring and natural facial aesthetic procedures in JCI-accredited surgical suites with undetectable scars.",
      protocols: [
        "VASER Ultrasonic High-Definition Fat Sculpting",
        "Preservation Rhinoplasty for Natural Facial Harmony",
        "Hyperbaric Oxygen Acceleration Recovery Suites",
        "Confidential Private Post-Op Recovery Concierge"
      ]
    },
    {
      id: "ophthalmology",
      title: "Ophthalmology & Contoura Vision Lasik",
      shortTitle: "Ophthalmology & Lasik",
      subtitle: "Blade-free eye surgery restoring crystalline 20/20 vision.",
      tags: ["Contoura Vision", "Femto-LASIK", "SMILE Pro", "Cataract", "Zeiss Lumera"],
      image: "https://images.unsplash.com/photo-1501621667575-af81f1f0bacc?auto=format&fit=crop&q=80&w=1200",
      featuredBadge: "Blade-Free Vision Correction",
      stat: "99.8% Precision",
      tech: "Blade-Free Contoura Vision",
      savings: "Save 70% vs UK/US",
      stay: "2–4 Days",
      quote: "Robotic Femto-LASIK, SMILE technology, and trifocal premium toric lenses restoring crystalline clarity within 24 hours.",
      protocols: [
        "22,000 Elevation Points Topography Mapping",
        "Alcon WaveLight EX500 Femtosecond Laser System",
        "Same-Day Outpatient Procedure — No Hospital Stay",
        "Immediate Functional Recovery Within 24 Hours"
      ]
    },
  ];

  const current = specialties[activeStep];

  return (
    <section
      id="treatments"
      ref={sectionRef}
      className="bg-[#f8fafb] text-[#1a2e30] border-t border-[#e2eaeb] relative w-full pt-10 sm:pt-20 pb-12 h-[350vh] lg:h-[400vh]"
    >
      {/* Sticky Container pinned under Navbar */}
      <div className="sticky top-16 lg:top-30 w-full z-20">
        {/* 1580px Expanded Container Matching Header and Hero */}
        <div className="max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8 w-full">

          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-4 sm:mb-8 gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#0B5D68]"></span>
                <p className="text-[#0B5D68] font-heading font-semibold text-xs uppercase tracking-[0.2em]">
                  QUATERNARY CLINICAL EXCELLENCE
                </p>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-[#0C2338] leading-[1.12]">
                Specialised Treatments.{" "}
                <span className="text-[#0B5D68] block sm:inline">
                  Celebrated Specialists.
                </span>
              </h2>
            </div>
            <p className="text-[#6B7C88] max-w-xl text-xs sm:text-sm leading-relaxed font-body">
              All surgeries are performed by Chief Specialists in JCI &amp; NABH-accredited tertiary hospitals with US-FDA approved implants, transparent packages, and zero waiting times.
            </p>
          </div>

          {/* ONE UNIFIED CARD: Tabs + Content inside the same card */}
          <div className="w-full rounded-xl bg-white border border-[#DCE6EB] shadow-sm overflow-hidden">

            {/* Top: Horizontal Tabs Bar Inside the Card */}
            <div className="px-4 sm:px-6 lg:px-8 py-5 sm:py-6 border-b border-[#DCE6EB]/60 bg-white">
              <div className="flex items-stretch gap-2.5 sm:gap-3.5 w-full overflow-x-auto no-scrollbar scroll-smooth">
                {specialties.map((spec, idx) => {
                  const isSelected = activeStep === idx;
                  return (
                    <button
                      key={spec.id}
                      onClick={() => handleTabClick(idx)}
                      className={`flex-1 min-w-[200px] lg:min-w-0 flex items-center gap-3 sm:gap-3.5 px-3.5 sm:px-4 py-3 rounded-xl transition-all duration-300 text-left cursor-pointer border ${isSelected
                        ? "bg-[#0B5D68] border-[#0B5D68] shadow-sm text-white"
                        : "bg-white hover:bg-[#ECF4F7]/60 border-[#DCE6EB] hover:border-[#0B5D68]/40"
                        }`}
                    >
                      {/* Number Circle Badge */}
                      <div
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-heading font-extrabold text-xs sm:text-sm shrink-0 transition-colors ${isSelected
                          ? "bg-white/20 text-white border border-white/30 backdrop-blur-sm shadow-sm"
                          : "bg-[#ECF4F7] text-[#0C2338]"
                          }`}
                      >
                        {idx + 1}
                      </div>

                      {/* 2-Line Text Content (Title + Savings Subtext) */}
                      <div className="flex flex-col min-w-0">
                        <span
                          className={`font-heading font-extrabold text-sm sm:text-base leading-tight transition-colors whitespace-nowrap truncate ${isSelected ? "text-white" : "text-[#0C2338]"
                            }`}
                        >
                          {spec.shortTitle}
                        </span>
                        <span
                          className={`text-xs font-medium leading-tight mt-0.5 transition-colors whitespace-nowrap truncate ${isSelected ? "text-teal-100" : "text-[#6B7C88]"
                            }`}
                        >
                          • {spec.savings}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom: Active Procedure Content Inside the Same Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="grid grid-cols-1 lg:grid-cols-12 items-stretch"
              >
                {/* Left: Procedure High-Resolution Visual - BIG & Flush to Card Edges */}
                <div className="lg:col-span-5 xl:col-span-6 relative w-full min-h-[380px] sm:min-h-[460px] lg:min-h-[540px] h-full overflow-hidden group">
                  <Image
                    src={current.image}
                    alt={current.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-70" />

                  {/* Top Left: Category Featured Badge */}
                  <div className="absolute top-6 left-6 z-10 flex flex-wrap gap-2">
                    <span className="px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-heading font-medium tracking-wider uppercase shadow-sm border border-white/20">
                      {current.featuredBadge}
                    </span>
                  </div>

                  {/* Bottom Right: Key Stat Pill */}
                  <div className="absolute bottom-6 right-6 z-10">
                    <span className="px-3.5 py-1.5 rounded-xl bg-white/95 backdrop-blur-md text-[#0C2338] text-xs font-bold shadow-md">
                      {current.stat}
                    </span>
                  </div>
                </div>

                {/* Right: Rich Clinical Narrative & Protocols */}
                <div className="lg:col-span-7 xl:col-span-6 p-6 sm:p-10 lg:p-12 xl:p-14 flex flex-col justify-between">
                  <div>
                    {/* Procedure Headline & Subtitle */}
                    <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0C2338] mb-2 leading-tight">
                      {current.title}
                    </h3>
                    <p className="text-[#0B5D68] text-sm sm:text-base font-bold mb-3 font-heading">
                      {current.subtitle}
                    </p>
                    <p className="text-[#6B7C88] text-sm sm:text-base leading-relaxed mb-6 font-normal font-body">
                      {current.quote}
                    </p>

                    {/* Protocol Highlights (2x2 Grid) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-8">
                      {current.protocols.map((proto, pIdx) => (
                        <div
                          key={pIdx}
                          className="flex items-start gap-2.5 text-xs sm:text-[13px] text-[#0C2338] bg-[#ECF4F7] p-3.5 rounded-xl border border-[#DCE6EB]"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#0B8F83] shrink-0 mt-0.5" />
                          <span className="font-medium leading-relaxed">{proto}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Procedure Bottom Bar: Stay Duration + Action Button */}
                  <div className="pt-6 border-t border-[#DCE6EB]/60 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#6B7C88]">
                      <Clock className="w-4 h-4 text-[#2C7FAF]" />
                      <span>Average In-Country Stay: <strong className="text-[#0C2338]">{current.stay}</strong></span>
                    </div>

                    <button
                      onClick={() => openIntake(current.title)}
                      className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#0B5D68] hover:bg-[#094b54] active:scale-95 text-white font-heading font-bold text-xs uppercase tracking-wider shadow-sm flex items-center justify-center gap-2.5 transition-all cursor-pointer group"
                    >
                      <span>Check Clinical Feasibility</span>
                      <ArrowRight className="w-4 h-4 text-white transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

