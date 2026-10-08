"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring } from "framer-motion";
import { 
  ArrowRight, 
  Sparkles, 
  Clock, 
  Stethoscope, 
  ShieldCheck, 
  ChevronRight, 
  Zap, 
  Activity, 
  CheckCircle2,
  BadgePercent,
  Cpu
} from "lucide-react";
import { useCare } from "@/context/CareContext";
import { Button } from "@/components/ui/button";

export const SpecialtiesSection = () => {
  const { openIntake } = useCare();
  const [activeStep, setActiveStep] = useState(0);

  const specialties = [
    {
      id: "ortho",
      title: "Orthopaedics & Joint Replacement",
      shortTitle: "Orthopaedics",
      subtitle: "Move better. Live fuller.",
      tags: ["Joints", "Spine", "Sports Medicine", "Robotic Knee", "Hip Replacement"],
      image: "https://images.unsplash.com/photo-1597764690523-15bea4c581c9?auto=format&fit=crop&q=80&w=1200",
      featuredBadge: "Most Requested Quaternary Care",
      stat: "15,000+ Surgeries",
      tech: "Robotic MAKO & NAVIO Navigation",
      savings: "Save 70% vs UK",
      stay: "7–14 Days",
      quote: "Direct anterior, muscle-sparing approaches enabling day-one independent ambulation with zero muscle detachment.",
      protocols: [
        "Mako Stryker CT-Guided 3D Planning",
        "Sub-Millimeter Implant Precision",
        "Physiotherapist bedside within 6 hours",
        "FDA-Approved Zimmer Biomet & Stryker Implants"
      ]
    },
    {
      id: "dentistry",
      title: "Dentistry & Smile Architecture",
      shortTitle: "Dentistry",
      subtitle: "Comprehensive dental care & smile restoration",
      tags: ["Implants", "Cosmetic", "Orthodontics", "All-on-4", "Zirconia"],
      image: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=1200",
      featuredBadge: "Full-Arch Precision",
      stat: "99.4% Success Rate",
      tech: "3D CAD/CAM & Swiss Implants",
      savings: "Save 75% vs UK",
      stay: "3–7 Days",
      quote: "Immediate-load zirconia restorations and computer-guided implant placement delivered in a single clinical stay.",
      protocols: [
        "Nobel Biocare & Straumann Swiss Titanium",
        "In-House CAD/CAM Milling in 48h",
        "Computer-Guided Flapless Surgery",
        "Lifetime Global Implant Warranty"
      ]
    },
    {
      id: "ivf",
      title: "IVF & Advanced Fertility",
      shortTitle: "IVF & Fertility",
      subtitle: "Building families with advanced care",
      tags: ["IVF", "Reproductive", "Maternity", "ICSI", "PGT-A Screening"],
      image: "https://images.unsplash.com/photo-1625512239194-ab1ef761db86?auto=format&fit=crop&q=80&w=1200",
      featuredBadge: "Advanced Embryology Lab",
      stat: "68% Live Birth Rate",
      tech: "ICSI & PGT-A Genetic Screening",
      savings: "Save 65% vs UK",
      stay: "10–18 Days",
      quote: "State-of-the-art cleanroom IVF suites with zero wait times for donor cycles and comprehensive genetic testing.",
      protocols: [
        "Next-Generation Sequencing (NGS) Genetics",
        "Laser-Assisted Hatching Technology",
        "Time-Lapse Embryo Monitoring (EmbryoScope)",
        "Zero Wait Lists for Donor Cycles"
      ]
    },
    {
      id: "cosmetic",
      title: "Cosmetic & Reconstructive Surgery",
      shortTitle: "Cosmetic Surgery",
      subtitle: "Enhancing natural beauty & confidence",
      tags: ["Aesthetics", "Plastic Surgery", "Reconstructive", "VASER 4D", "Rhinoplasty"],
      image: "https://images.unsplash.com/photo-1621021544363-02108c715c1b?auto=format&fit=crop&q=80&w=1200",
      featuredBadge: "Board-Certified Plastic Surgeons",
      stat: "4,000+ Procedures",
      tech: "4D High-Definition VASER",
      savings: "Save 60% vs UK",
      stay: "5–10 Days",
      quote: "Artistic body contouring and natural facial aesthetic procedures in JCI-accredited surgical suites with undetectable scars.",
      protocols: [
        "VASER Ultrasonic Fat Preservation",
        "Preservation Rhinoplasty Techniques",
        "Hyperbaric Oxygen Recovery Suites",
        "Confidential Private Recovery Villa"
      ]
    },
    {
      id: "ophthalmology",
      title: "Ophthalmology & Contoura Vision",
      shortTitle: "Ophthalmology",
      subtitle: "Advanced eye care & vision correction",
      tags: ["Lasik", "Cataract", "Retina", "Blade-Free", "Zeiss Lumera"],
      image: "https://images.unsplash.com/photo-1501621667575-af81f1f0bacc?auto=format&fit=crop&q=80&w=1200",
      featuredBadge: "Blade-Free Vision Restoration",
      stat: "99.8% Precision",
      tech: "Blade-Free Contoura Vision",
      savings: "Save 70% vs UK",
      stay: "2–4 Days",
      quote: "Robotic Femto-LASIK, SMILE technology, and trifocal premium toric lenses restoring crystalline 20/20 clarity.",
      protocols: [
        "22,000 Elevation Points Topography",
        "Alcon WaveLight EX500 Laser System",
        "Same-Day Outpatient Release",
        "Immediate Functional Recovery"
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
      id="specialties" 
      className="bg-white text-slate-900 border-t border-[#E4E9ED] relative w-full py-12 sm:py-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-[2px] w-10 bg-[#007FFF]" />
              <p className="text-[#0070E0] font-bold text-xs uppercase tracking-[0.25em]">
                OUR SPECIALTIES
              </p>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-slate-900 leading-[1.12]">
              Comprehensive care. <br />
              <span className="italic font-light text-slate-600">
                World-class expertise.
              </span>
            </h2>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-start relative mt-12">
          {/* Left Column: Progress Tracker (Sticky) */}
          <div className="lg:w-1/3 lg:sticky lg:top-28 flex flex-col gap-4">
            {specialties.map((spec, idx) => {
              const isSelected = activeStep === idx;
              return (
                <button
                  key={spec.id}
                  onClick={() => handleScrollTo(spec.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-300 relative overflow-hidden focus:outline-none ${
                    isSelected
                      ? "bg-slate-50 border-[#007FFF] shadow-md scale-105"
                      : "bg-white border-slate-100 opacity-60 hover:opacity-100 hover:border-slate-200"
                  }`}
                >
                  {isSelected && (
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#007FFF]" />
                  )}
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 transition-colors ${
                      isSelected 
                        ? "bg-[#0070E0] text-white" 
                        : "bg-slate-100 text-slate-500"
                    }`}>
                      <Stethoscope className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className={`text-base font-bold transition-colors ${
                        isSelected ? "text-[#0070E0]" : "text-slate-700"
                      }`}>
                        {spec.shortTitle}
                      </h3>
                      <div className="text-xs text-slate-500 font-medium mt-0.5">
                        {spec.savings} • {spec.stay}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Content Display (Scrolling) */}
          <div className="lg:w-2/3 flex flex-col gap-12">
            {specialties.map((current) => (
              <div
                key={current.id}
                id={`spec-${current.id}`}
                className="w-full rounded-3xl bg-white border border-[#E4E9ED] shadow-xl p-6 sm:p-8 flex flex-col justify-between"
              >
                <div>
                  <div className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden mb-8">
                    <Image
                      src={current.image}
                      alt={current.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-2">
                      <span className="px-3 py-1.5 rounded-full bg-white/90 text-[#0070E0] text-xs font-bold uppercase tracking-wider shadow-sm">
                        {current.featuredBadge}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-serif text-3xl sm:text-4xl text-slate-900 mb-3">
                    {current.title}
                  </h3>
                  <p className="text-[#0070E0] text-sm sm:text-base font-medium mb-5">
                    {current.subtitle}
                  </p>
                  <p className="text-slate-600 text-base leading-relaxed mb-8 font-light">
                    {current.quote}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    {current.protocols.map((proto, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-2.5 text-xs text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <CheckCircle2 className="w-4 h-4 text-[#0070E0] shrink-0 mt-0.5" />
                        <span className="font-medium leading-relaxed">{proto}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-[#E4E9ED] flex justify-end">
                  <Button
                    onClick={() => openIntake(current.title)}
                    className="bg-[#0070E0] hover:bg-[#007FFF] text-white rounded-xl px-8 py-5 font-bold shadow-sm"
                  >
                    Check Clinical Feasibility
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

