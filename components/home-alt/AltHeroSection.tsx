"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldCheck, 
  Clock, 
  FileCheck2, 
  Sparkles, 
  ChevronRight, 
  PhoneCall, 
  CalendarCheck,
  CheckCircle2,
  Stethoscope,
  Star,
  Video,
  Award,
  ArrowUpRight,
  PlaneTakeoff,
  BadgePercent,
  Activity,
  HeartHandshake
} from "lucide-react";
import { useCare } from "@/context/CareContext";
import { Button } from "@/components/ui/button";

export const AltHeroSection = () => {
  const { openIntake, openChat } = useCare();
  const [activeSpecialtyIndex, setActiveSpecialtyIndex] = useState(0);

  const previewSpecialties = [
    {
      name: "Orthopaedics & Joint Replacement",
      short: "Orthopaedics",
      savings: "Save up to $85,000",
      avgCost: "$11,200 All-In",
      ukCost: "$60,000+ UK Private",
      stay: "7–12 Days",
      topDoctor: "Dr. Jatinder Singla (25 Yrs)",
      hospital: "Max Quaternary Hospital",
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1000",
    },
    {
      name: "Dentistry & Full Arch Implants",
      short: "Dental",
      savings: "Save up to $22,000",
      avgCost: "$8,400 All-In",
      ukCost: "$28,000+ UK Private",
      stay: "3–7 Days",
      topDoctor: "Max Dental Implantology Unit",
      hospital: "Max Healthcare Mohali",
      image: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=1000",
    },
    {
      name: "IVF & Fertility Care",
      short: "Fertility",
      savings: "Save up to $18,000",
      avgCost: "$10,500 All-In",
      ukCost: "$28,000+ UK Private",
      stay: "10–16 Days",
      topDoctor: "Senior Embryology Panel",
      hospital: "NABH Accredited IVF Suite",
      image: "https://images.unsplash.com/photo-1625512239194-ab1ef761db86?auto=format&fit=crop&q=80&w=1000",
    },
    {
      name: "Cosmetic & Plastic Surgery",
      short: "Cosmetic",
      savings: "Save up to $16,000",
      avgCost: "$7,800 All-In",
      ukCost: "$24,000+ UK Private",
      stay: "5–9 Days",
      topDoctor: "Dr. Vikas Gupta (MCh)",
      hospital: "Profile Aesthetic Surgery",
      image: "https://images.unsplash.com/photo-1621021544363-02108c715c1b?auto=format&fit=crop&q=80&w=1000",
    },
  ];

  const currentPreview = previewSpecialties[activeSpecialtyIndex];

  return (
    <section className="relative min-h-[96vh] lg:min-h-screen flex flex-col justify-between overflow-hidden bg-gradient-to-b from-[#030718] via-[#05112E] to-[#030718] text-white">
      {/* ── Background Imagery & Floating Animated Light Orbs ── */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          initial={{ scale: 1.15, opacity: 0.5 }}
          animate={{ scale: 1, opacity: 0.35 }}
          transition={{ duration: 3.5, ease: "easeOut" }}
          className="relative w-full h-full"
        >
          <Image
            src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=2000"
            alt="World-Class Medical Concierge in India"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        </motion.div>
        
        {/* Layered cinematic gradient vignette */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#030718] via-[#030718]/90 to-[#030718]/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030718] via-transparent to-[#030718]/70" />
        
        {/* Floating Animated Gradient Orbs for Vibrant Depth */}
        <motion.div 
          animate={{ 
            y: [0, -35, 0],
            x: [0, 20, 0],
            scale: [1, 1.15, 1],
            opacity: [0.25, 0.45, 0.25]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/5 w-[550px] h-[550px] bg-gradient-to-tr from-vedara-blue via-indigo-600 to-vedara-cyan/30 rounded-full blur-[150px] pointer-events-none" 
        />
        
        <motion.div 
          animate={{ 
            y: [0, 30, 0],
            x: [0, -25, 0],
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.38, 0.2]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 right-1/6 w-[650px] h-[650px] bg-gradient-to-br from-vedara-cyan via-teal-500 to-vedara-blue/40 rounded-full blur-[160px] pointer-events-none" 
        />
        
        <motion.div 
          animate={{ 
            scale: [0.9, 1.1, 0.9],
            opacity: [0.15, 0.3, 0.15]
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 left-1/3 w-[700px] h-[250px] bg-gradient-to-r from-amber-400/20 via-vedara-gold/25 to-yellow-300/10 rounded-full blur-[130px] pointer-events-none" 
        />
      </div>

      {/* ── Hero Main Grid ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-28 sm:pt-36 lg:pt-40 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Stately Typography & Narrative */}
          <div className="lg:col-span-7 xl:col-span-7">
            {/* Live Status Beacon */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.08] border border-white/20 backdrop-blur-2xl mb-6 shadow-glow"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-vedara-cyan opacity-90" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-vedara-cyan" />
              </span>
              <span className="text-vedara-gold text-xs sm:text-sm font-bold tracking-[0.2em] uppercase">
                International Care Concierge
              </span>
              <span className="text-white/30">|</span>
              <span className="text-emerald-300 text-xs font-semibold flex items-center gap-1">
                <Activity className="w-3.5 h-3.5" />
                <span>14 Senior Specialists On-Duty</span>
              </span>
            </motion.div>

            {/* Main Headline with Metallic Gold Gradient */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl sm:text-6xl lg:text-[66px] font-serif text-white leading-[1.08] mb-6 tracking-tight drop-shadow-xl"
            >
              Your treatment journey, <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-amber-200 via-vedara-gold-light to-amber-400 bg-clip-text text-transparent italic font-light">
                handled from start to finish.
              </span>
            </motion.h1>

            {/* Supporting Narrative */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base sm:text-xl text-slate-200 font-light leading-relaxed mb-8 max-w-2xl drop-shadow-sm"
            >
              We help you find the right surgeon and hospital in India, and coordinate everything around your treatment — from the first time a specialist reviews your scans to the day your records are back with your doctor at home.
            </motion.p>

            {/* Primary Action Buttons with Glowing Hover Effects */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10"
            >
              <Button
                variant="gold"
                size="xl"
                onClick={() => openIntake(currentPreview.name)}
                className="relative overflow-hidden text-vedara-deep font-extrabold transition-all duration-300 rounded-2xl shadow-[0_0_35px_rgba(201,162,74,0.45)] hover:shadow-[0_0_55px_rgba(201,162,74,0.75)] hover:scale-[1.02] active:scale-[0.98] px-8"
              >
                <span className="relative z-10 flex items-center gap-1.5">
                  <span>Start Your Journey</span>
                  <ChevronRight className="w-5 h-5 ml-1" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-shimmer" />
              </Button>

              <Button
                variant="glass"
                size="xl"
                render={<a href="#journey" />}
                className="group rounded-2xl border-white/20 text-white hover:bg-white/15 backdrop-blur-2xl transition-all duration-300 hover:scale-[1.02]"
              >
                <span>Explore The Experience</span>
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-2 ml-2 text-vedara-cyan">
                  &rarr;
                </span>
              </Button>

              <button
                type="button"
                onClick={() => openChat("Hello! I would like to speak directly with an international care coordinator.")}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-white/[0.08] hover:bg-white/[0.15] text-white hover:border-vedara-cyan/50 border border-white/15 transition-all duration-300 text-sm font-semibold cursor-pointer backdrop-blur-xl hover:shadow-glow"
              >
                <PhoneCall className="w-4 h-4 text-vedara-cyan animate-pulse" />
                <span>Talk to Coordinator</span>
              </button>
            </motion.div>

            {/* Trust Indicator Grid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-white/15"
            >
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-vedara-gold shrink-0 drop-shadow-sm" />
                <span className="text-xs text-slate-200 font-medium">JCI & NABH Hospitals</span>
              </div>
              <div className="flex items-center gap-2.5">
                <FileCheck2 className="w-5 h-5 text-vedara-cyan shrink-0 drop-shadow-sm" />
                <span className="text-xs text-slate-200 font-medium">Fixed Written Price Guarantee</span>
              </div>
              <div className="flex items-center gap-2.5 col-span-2 sm:col-span-1">
                <Clock className="w-5 h-5 text-vedara-gold shrink-0 drop-shadow-sm" />
                <span className="text-xs text-slate-200 font-medium">24h Senior Doctor Opinion</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Multi-Layer Glassmorphic Clinical Feasibility Card */}
          <div className="lg:col-span-5 xl:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] as any }}
              className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-[#0C1A38]/95 via-[#08132B]/95 to-[#030918]/95 border-2 border-vedara-cyan/30 shadow-[0_0_60px_rgba(46,205,197,0.2)] backdrop-blur-3xl overflow-hidden hover:border-vedara-cyan/50 transition-colors duration-500"
            >
              {/* Vibrant Ambient Glow Highlights within Card */}
              <div className="absolute top-0 right-0 w-72 h-72 bg-vedara-cyan/25 rounded-full blur-[90px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-72 h-72 bg-amber-400/20 rounded-full blur-[90px] pointer-events-none" />

              {/* Card Header with Specialty Selector Tabs */}
              <div className="relative z-10 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-vedara-cyan to-vedara-blue flex items-center justify-center text-white shadow-md shadow-cyan-500/30">
                      <Stethoscope className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white">Live Clinical Feasibility</h3>
                      <p className="text-[11px] text-vedara-cyan font-medium">Verified Quaternary Procedures</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-vedara-gold/20 text-vedara-gold text-[10px] font-extrabold uppercase tracking-wider border border-vedara-gold/40 shadow-xs">
                    Zero Obligation
                  </span>
                </div>

                {/* Animated Micro Tabs */}
                <div className="grid grid-cols-4 gap-1.5 p-1.5 rounded-2xl bg-black/50 border border-white/15 backdrop-blur-xl">
                  {previewSpecialties.map((spec, sIdx) => (
                    <button
                      key={spec.short}
                      type="button"
                      onClick={() => setActiveSpecialtyIndex(sIdx)}
                      className={`relative py-2.5 px-1 text-center rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer truncate ${
                        activeSpecialtyIndex === sIdx
                          ? "bg-gradient-to-r from-vedara-cyan via-teal-400 to-vedara-blue text-[#020713] shadow-md shadow-cyan-500/25 font-black scale-[1.03]"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      {spec.short}
                    </button>
                  ))}
                </div>
              </div>

              {/* Active Specialty Visual Showcase */}
              <div className="relative z-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentPreview.short}
                    initial={{ opacity: 0, y: 12, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -12, scale: 0.98 }}
                    transition={{ duration: 0.35 }}
                    className="space-y-4"
                  >
                    {/* Visual Card Image with Floating Stat Badges */}
                    <div className="relative w-full h-48 rounded-2xl overflow-hidden bg-slate-950 border border-white/20 shadow-inner group/img">
                      <Image
                        src={currentPreview.image}
                        alt={currentPreview.name}
                        fill
                        className="object-cover group-hover/img:scale-105 transition-transform duration-700 ease-out"
                        sizes="(max-width: 640px) 100vw, 400px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />
                      
                      {/* Floating Savings Tag with Glow */}
                      <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-vedara-deep/90 backdrop-blur-xl text-vedara-gold text-xs font-black border border-vedara-gold/50 shadow-md">
                        <BadgePercent className="w-4 h-4 text-amber-300" />
                        <span>{currentPreview.savings}</span>
                      </div>

                      {/* Video Review Tag */}
                      <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-xl text-emerald-300 text-[10px] font-bold border border-emerald-400/40">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span>24h Video Review</span>
                      </div>

                      {/* Bottom Info Banner on Image */}
                      <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between text-white">
                        <div>
                          <div className="text-xs font-bold truncate max-w-[210px]">{currentPreview.topDoctor}</div>
                          <div className="text-[11px] text-vedara-cyan font-semibold">{currentPreview.hospital}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-[10px] text-slate-300 uppercase font-semibold">Typical Stay</div>
                          <div className="text-xs font-bold text-white">{currentPreview.stay}</div>
                        </div>
                      </div>
                    </div>

                    {/* Price Comparison Widget */}
                    <div className="p-4 rounded-2xl bg-white/[0.07] border border-white/15 backdrop-blur-md flex items-center justify-between shadow-inner">
                      <div>
                        <div className="text-[11px] text-slate-300 uppercase tracking-wider font-semibold">
                          India All-In Package
                        </div>
                        <div className="text-2xl font-serif font-extrabold text-white">
                          {currentPreview.avgCost}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-[11px] text-rose-300 uppercase tracking-wider font-semibold">
                          At Home (Private)
                        </div>
                        <div className="text-base font-bold text-rose-300 line-through">
                          {currentPreview.ukCost}
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <Button
                      variant="gold"
                      size="lg"
                      onClick={() => openIntake(currentPreview.name)}
                      className="w-full text-vedara-deep font-extrabold rounded-xl shadow-[0_0_25px_rgba(201,162,74,0.4)] hover:shadow-[0_0_40px_rgba(201,162,74,0.65)] hover:scale-[1.02] transition-all"
                    >
                      <CalendarCheck className="w-4 h-4 mr-2" />
                      <span>Check Doctor Availability for {currentPreview.short}</span>
                    </Button>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Coordinator Online Footer */}
              <div className="relative z-10 mt-5 pt-4 border-t border-white/15 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative w-9 h-9 rounded-full overflow-hidden border-2 border-vedara-cyan/60 shadow-md shadow-cyan-500/20">
                    <Image
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200"
                      alt="Care Coordinator"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-1">
                      <span>Aisha Khan</span>
                      <Award className="w-3 h-3 text-vedara-gold" />
                    </div>
                    <div className="text-[10px] text-vedara-cyan font-semibold">Lead International Coordinator</div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Online now</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Key Metrics Ribbon Bar ── */}
      <div className="relative z-10 border-t border-cyan-500/20 bg-gradient-to-r from-[#03081A]/95 via-[#061438]/95 to-[#03081A]/95 backdrop-blur-2xl py-6 shadow-[0_-15px_40px_rgba(0,0,0,0.5)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold font-serif text-white">60% – 80%</div>
              <div className="text-xs text-slate-300 font-medium mt-1">Average Cost Savings vs UK/US</div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold font-serif text-vedara-gold">24 Hours</div>
              <div className="text-xs text-slate-300 font-medium mt-1">Specialist Second Opinion Turnaround</div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold font-serif text-vedara-cyan">15+ Years</div>
              <div className="text-xs text-slate-300 font-medium mt-1">Average Surgeon Experience</div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold font-serif text-white">0 Days</div>
              <div className="text-xs text-slate-300 font-medium mt-1">Surgical Wait Times</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
