"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { 
  ArrowRight, 
  Sparkles, 
  Clock, 
  Stethoscope, 
  ShieldCheck, 
  ChevronRight, 
  CheckCircle2,
  Cpu,
  BadgePercent
} from "lucide-react";
import { useCare } from "@/context/CareContext";

export const SpecialtiesSection = () => {
  const { openIntake } = useCare();
  const [activeStep, setActiveStep] = useState(0);

  const specialties = [
    {
      id: "ortho",
      title: "Orthopaedics & Robotic Joint Replacement",
      shortTitle: "Orthopaedics & Joints",
      subtitle: "Move without pain. Walk independently on day one.",
      tags: ["Joints", "Spine", "Robotic Knee", "Hip Replacement", "MAKO System"],
      image: "https://images.unsplash.com/photo-1597764690523-15bea4c581c9?auto=format&fit=crop&q=80&w=1200",
      featuredBadge: "Most Requested Quaternary Care",
      stat: "15,000+ Surgeries",
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = specialties.findIndex((s) => `spec-${s.id}` === entry.target.id);
            if (index !== -1) setActiveStep(index);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px" }
    );

    specialties.forEach((spec) => {
      const el = document.getElementById(`spec-${spec.id}`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [specialties]);

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(`spec-${id}`);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <section 
      id="treatments" 
      className="bg-[#f8fafb] text-[#1a2e30] border-t border-[#e2eaeb] relative w-full py-16 sm:py-24 font-sans"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Section Header with Catchy Jost Typography */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="h-2 w-2 rounded-full bg-[#e39b2d]"></span>
              <p className="text-[#0b5d63] font-heading font-bold text-xs uppercase tracking-[0.2em]">
                QUATERNARY CLINICAL EXCELLENCE
              </p>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-slate-900 leading-[1.12]">
              Specialised Treatments.{" "}
              <span className="text-[#0b5d63] block sm:inline">
                Celebrated Specialists.
              </span>
            </h2>
          </div>
          <p className="text-slate-600 max-w-md text-sm sm:text-base leading-relaxed">
            All surgeries are performed by Chief Specialists in JCI-accredited tertiary hospitals with US-FDA approved implants and zero waiting times.
          </p>
        </div>

        {/* Content Grid */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Sticky Category Selector */}
          <div className="lg:w-1/3 w-full lg:sticky lg:top-28 flex flex-col gap-2.5 z-20">
            {specialties.map((spec, idx) => {
              const isSelected = activeStep === idx;
              return (
                <button
                  key={spec.id}
                  onClick={() => handleScrollTo(spec.id)}
                  className={`text-left p-4 rounded-2xl transition-all duration-300 border flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? "bg-white border-[#0b5d63] shadow-lg shadow-[#0b5d63]/10 ring-1 ring-[#0b5d63]/20"
                      : "bg-white/60 hover:bg-white border-transparent hover:border-slate-200"
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-heading font-bold text-sm shrink-0 transition-colors ${
                      isSelected 
                        ? "bg-[#0b5d63] text-white" 
                        : "bg-slate-100 text-slate-600"
                    }`}>
                      {idx + 1}
                    </div>
                    <div>
                      <h3 className={`font-heading font-bold text-sm sm:text-base transition-colors ${
                        isSelected ? "text-[#0b5d63]" : "text-slate-700"
                      }`}>
                        {spec.shortTitle}
                      </h3>
                      <div className="text-xs text-[#a35f0b] font-medium mt-0.5">
                        {spec.savings} • {spec.stay}
                      </div>
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? "text-[#e39b2d] translate-x-1" : "text-slate-300"}`} />
                </button>
              );
            })}
          </div>

          {/* Right Column: Detailed Procedure Cards */}
          <div className="lg:w-2/3 flex flex-col gap-10">
            {specialties.map((current) => (
              <div
                key={current.id}
                id={`spec-${current.id}`}
                className="w-full rounded-3xl bg-white border border-[#e2eaeb] shadow-xl p-6 sm:p-8 flex flex-col justify-between hover:border-[#0b5d63]/30 transition-all"
              >
                <div>
                  <div className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden mb-8">
                    <Image
                      src={current.image}
                      alt={current.title}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-2">
                      <span className="px-3.5 py-1.5 rounded-full bg-[#04272a]/85 backdrop-blur-md text-[#e39b2d] text-xs font-heading font-bold uppercase tracking-wider shadow-md">
                        {current.featuredBadge}
                      </span>
                    </div>
                    <div className="absolute bottom-4 right-4 z-10">
                      <span className="px-3.5 py-1.5 rounded-xl bg-white/95 backdrop-blur-md text-[#0b5d63] text-xs font-bold shadow-md">
                        {current.stat}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
                    {current.title}
                  </h3>
                  <p className="text-[#0b5d63] text-sm sm:text-base font-semibold mb-4">
                    {current.subtitle}
                  </p>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                    {current.quote}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-8">
                    {current.protocols.map((proto, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-2.5 text-xs text-slate-700 bg-[#f0f8f9] p-3.5 rounded-xl border border-[#dbeff0]">
                        <CheckCircle2 className="w-4 h-4 text-[#0b5d63] shrink-0 mt-0.5" />
                        <span className="font-medium leading-relaxed">{proto}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                    <Clock className="w-4 h-4 text-[#e39b2d]" />
                    <span>Average In-Country Stay: <strong className="text-slate-800">{current.stay}</strong></span>
                  </div>

                  <button
                    onClick={() => openIntake(current.title)}
                    className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#0b5d63] hover:bg-[#073f43] text-white font-heading font-bold text-xs uppercase tracking-wider shadow-md shadow-[#0b5d63]/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <span>Check Clinical Feasibility</span>
                    <ArrowRight className="w-4 h-4 text-[#e39b2d]" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
