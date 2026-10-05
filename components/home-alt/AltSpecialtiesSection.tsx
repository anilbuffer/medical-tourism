"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
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

export const AltSpecialtiesSection = () => {
  const { openIntake } = useCare();
  const [selectedSpecialty, setSelectedSpecialty] = useState(0);

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

  const current = specialties[selectedSpecialty];

  return (
    <section id="specialties" className="py-24 sm:py-32 bg-gradient-to-b from-[#030718] via-[#05112E] to-[#040E26] text-white relative overflow-hidden">
      {/* Dynamic Ambient Background Glows */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.3, 0.15]
        }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 right-0 w-[650px] h-[650px] bg-vedara-cyan/20 rounded-full blur-[170px] pointer-events-none" 
      />
      <motion.div 
        animate={{ 
          scale: [1.1, 0.95, 1.1],
          opacity: [0.12, 0.25, 0.12]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-vedara-gold/15 rounded-full blur-[160px] pointer-events-none" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-[2px] w-10 bg-vedara-gold" />
              <p className="text-vedara-gold font-bold text-xs uppercase tracking-[0.25em]">
                OUR SPECIALTIES
              </p>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-white leading-[1.12]">
              Comprehensive care. <br />
              <span className="italic font-light bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-300 bg-clip-text text-transparent">
                World-class expertise.
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-3 text-xs font-semibold">
            <span className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/[0.07] border border-white/15 backdrop-blur-xl text-slate-200 shadow-md">
              <ShieldCheck className="w-4 h-4 text-vedara-gold" />
              <span>Accredited Centers Only</span>
            </span>
            <span className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-vedara-cyan/15 border border-vedara-cyan/40 text-vedara-cyan shadow-glow">
              <Zap className="w-4 h-4 text-vedara-cyan" />
              <span>Zero Wait Lists</span>
            </span>
          </div>
        </div>

        {/* ── INTERACTIVE CLINICAL COMMAND CENTER (Distinct Layout: Split Suite) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Interactive Specialty Selector Deck */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-3">
            <div className="space-y-3">
              {specialties.map((spec, idx) => {
                const isSelected = selectedSpecialty === idx;
                return (
                  <button
                    key={spec.id}
                    type="button"
                    onClick={() => setSelectedSpecialty(idx)}
                    className={`w-full text-left p-4 sm:p-5 rounded-2xl border-2 transition-all duration-300 cursor-pointer relative overflow-hidden group ${
                      isSelected
                        ? "bg-gradient-to-r from-[#0C2248] via-[#081B3C] to-[#041026] border-vedara-cyan shadow-[0_0_35px_rgba(46,205,197,0.3)] scale-[1.02]"
                        : "bg-white/[0.03] border-white/10 hover:bg-white/[0.06] hover:border-white/25"
                    }`}
                  >
                    {/* Active Indicator Glow Bar */}
                    {isSelected && (
                      <motion.div
                        layoutId="specialtyActiveGlow"
                        className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-vedara-cyan to-vedara-gold"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}

                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3.5">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 transition-colors ${
                          isSelected 
                            ? "bg-vedara-cyan text-[#020713] shadow-md shadow-cyan-500/30" 
                            : "bg-white/10 text-slate-300 group-hover:text-white"
                        }`}>
                          <Stethoscope className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className={`text-sm sm:text-base font-bold transition-colors ${
                            isSelected ? "text-white" : "text-slate-300 group-hover:text-white"
                          }`}>
                            {spec.shortTitle}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[11px] text-vedara-cyan font-semibold flex items-center gap-1">
                              <BadgePercent className="w-3 h-3" />
                              <span>{spec.savings}</span>
                            </span>
                            <span className="text-white/30">•</span>
                            <span className="text-[11px] text-slate-400 flex items-center gap-1">
                              <Clock className="w-3 h-3 text-vedara-gold" />
                              <span>{spec.stay}</span>
                            </span>
                          </div>
                        </div>
                      </div>

                      <ChevronRight className={`w-5 h-5 shrink-0 transition-transform ${
                        isSelected 
                          ? "text-vedara-cyan translate-x-1" 
                          : "text-white/30 group-hover:text-white/70 group-hover:translate-x-1"
                      }`} />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Live Coordinator Fast-Track Note */}
            <div className="p-4 rounded-2xl bg-[#071432]/80 border border-white/10 flex items-center justify-between text-xs text-slate-300 mt-2">
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-vedara-gold shrink-0" />
                <span>Need a procedure not listed? We coordinate all quaternary surgeries.</span>
              </span>
              <button
                type="button"
                onClick={() => openIntake("Custom Quaternary Surgery")}
                className="text-vedara-cyan font-bold hover:underline shrink-0 ml-2 cursor-pointer"
              >
                Inquire
              </button>
            </div>
          </div>

          {/* Right Column: Featured Theater Stage for the Selected Specialty */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, scale: 0.98, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: -15 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="h-full rounded-3xl bg-gradient-to-br from-[#0B1E45]/95 via-[#071638]/95 to-[#040D26]/95 border-2 border-vedara-cyan/40 shadow-2xl p-6 sm:p-8 md:p-10 flex flex-col justify-between relative overflow-hidden backdrop-blur-2xl"
              >
                {/* Radial Glow within Featured Stage */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-vedara-cyan/20 rounded-full blur-[90px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-vedara-gold/15 rounded-full blur-[90px] pointer-events-none" />

                <div>
                  {/* Top Imagery Showcase with Floating Badges */}
                  <div className="relative w-full h-64 sm:h-72 rounded-2xl overflow-hidden bg-slate-950 border border-white/20 mb-6 shadow-2xl group">
                    <Image
                      src={current.image}
                      alt={current.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />

                    {/* Floating Badges */}
                    <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-2">
                      <span className="px-3 py-1.5 rounded-full bg-vedara-gold text-vedara-deep text-xs font-black uppercase tracking-wider shadow-lg">
                        {current.featuredBadge}
                      </span>
                      <span className="px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-xl text-vedara-cyan text-xs font-bold border border-white/20">
                        {current.savings}
                      </span>
                    </div>

                    <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-xl text-emerald-300 text-xs font-bold border border-emerald-400/30">
                      <Activity className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{current.stat}</span>
                    </div>

                    {/* Technology Ribbon at Bottom of Image */}
                    <div className="absolute bottom-3 left-4 right-4 z-10 flex items-center justify-between text-xs text-white">
                      <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg border border-white/15">
                        <Cpu className="w-3.5 h-3.5 text-vedara-cyan" />
                        <span className="font-semibold text-slate-200">{current.tech}</span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg border border-white/15 text-amber-300 font-bold">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Stay: {current.stay}</span>
                      </div>
                    </div>
                  </div>

                  {/* Title & Clinical Quote */}
                  <h3 className="font-serif text-3xl sm:text-4xl text-white mb-2 leading-tight">
                    {current.title}
                  </h3>
                  <p className="text-vedara-cyan text-sm sm:text-base font-medium mb-4">
                    {current.subtitle}
                  </p>
                  <p className="text-slate-300 text-sm leading-relaxed mb-6 font-light">
                    {current.quote}
                  </p>

                  {/* Clinical Protocols Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6">
                    {current.protocols.map((proto, pIdx) => (
                      <div key={pIdx} className="flex items-center gap-2 text-xs text-slate-200 bg-white/[0.04] p-2.5 rounded-xl border border-white/10">
                        <CheckCircle2 className="w-4 h-4 text-vedara-cyan shrink-0" />
                        <span className="font-medium">{proto}</span>
                      </div>
                    ))}
                  </div>

                  {/* Sub-Specialty Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {current.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-3 py-1 rounded-lg bg-white/10 backdrop-blur-md text-slate-200 text-xs font-semibold border border-white/15"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Footer */}
                <div className="pt-6 border-t border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="text-xs text-slate-300">
                    <span className="text-white font-bold">Fixed Price Written Guarantee</span> · No waitlists
                  </div>
                  <Button
                    variant="gold"
                    size="lg"
                    onClick={() => openIntake(current.title)}
                    className="text-vedara-deep font-black rounded-xl shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.02] transition-all cursor-pointer"
                  >
                    <span>Check Clinical Feasibility & Quote</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
};
