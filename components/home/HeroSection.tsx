"use client";

import React, { useState } from "react";
import { useCare } from "@/context/CareContext";
import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Stethoscope, 
  Plane, 
  Clock, 
  PhoneCall,
  CalendarCheck
} from "lucide-react";

export const HeroSection = () => {
  const { openIntake } = useCare();
  const [selectedSpecialty, setSelectedSpecialty] = useState("Orthopaedics");
  const [patientCountry, setPatientCountry] = useState("United Kingdom");

  const specialtiesList = [
    "Orthopaedics & Joint Replacement",
    "Cardiology & Heart Surgery",
    "Dentistry & Full-Mouth Implants",
    "IVF & Fertility Treatment",
    "Cosmetic & Plastic Surgery",
    "Ophthalmology & Eye Surgery",
    "Oncology & Cancer Care",
    "Neuro & Spine Surgery"
  ];

  const countriesList = [
    "United Kingdom",
    "Australia",
    "United States",
    "Canada",
    "Kenya",
    "Nigeria",
    "United Arab Emirates",
    "Ghana",
    "Tanzania",
    "South Africa",
    "Other Country"
  ];

  const handleQuickInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    openIntake(selectedSpecialty);
  };

  return (
    <section className="relative min-h-screen flex items-center pt-28 pb-16 sm:pb-24 overflow-hidden bg-[#04272a] font-sans">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-center scale-105 filter brightness-[0.75]"
          aria-hidden="true"
        >
          <source src="/hero-section-journey-video.mp4" type="video/mp4" />
        </video>
        {/* Deep Teal Scrim Overlay */}
        <div 
          className="absolute inset-0 z-10" 
          style={{ 
            background: "linear-gradient(115deg, rgba(4,39,42,0.94) 0%, rgba(7,63,67,0.88) 45%, rgba(11,93,99,0.55) 80%, rgba(4,39,42,0.85) 100%)" 
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Catchy Jost Headline & Narrative */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Trust Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#0b5d63]/80 border border-[#e39b2d]/40 backdrop-blur-md text-white text-xs font-semibold tracking-wide shadow-sm"
            >
              <span className="flex h-2 w-2 rounded-full bg-[#e39b2d] animate-pulse" />
              <span className="text-[#e39b2d] font-bold uppercase tracking-wider text-[11px] font-heading">
                JCI & NABH Accredited Network
              </span>
              <span className="text-white/40">•</span>
              <span className="text-slate-200">Zero Advance Consultation Fee</span>
            </motion.div>

            {/* Catchy Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.08] tracking-tight drop-shadow-md"
            >
              World-Class Surgical Care in India.{" "}
              <span className="text-[#e39b2d] block sm:inline">
                Save Up to 70%. Zero Waiting.
              </span>
            </motion.h1>

            {/* Subhead narrative */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-200 font-normal leading-relaxed max-w-2xl"
            >
              Direct patient access to India’s most celebrated surgical directors, quaternary hospitals, fixed guaranteed pricing, and your personal 1-on-1 English-speaking clinical concierge from arrival to recovery.
            </motion.p>

            {/* Trust Bullet Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 pt-2"
            >
              <div className="flex items-center gap-2 text-xs font-medium text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-[#e39b2d] shrink-0" />
                <span>Written Fixed Price</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-[#e39b2d] shrink-0" />
                <span>Named Chief Surgeons</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-[#e39b2d] shrink-0" />
                <span>VIP Airport Pickup</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-[#e39b2d] shrink-0" />
                <span>Medical Visa Support</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-[#e39b2d] shrink-0" />
                <span>6 Months Follow-up</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-[#e39b2d] shrink-0" />
                <span>1-on-1 Care Manager</span>
              </div>
            </motion.div>

            {/* Quick Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap items-center gap-3.5 pt-4"
            >
              <button
                onClick={() => openIntake()}
                className="px-7 py-3.5 rounded-xl bg-[#e39b2d] hover:bg-[#a35f0b] text-slate-950 hover:text-white font-heading font-bold text-sm tracking-wide uppercase transition-all duration-300 shadow-xl shadow-[#e39b2d]/25 flex items-center gap-2 group cursor-pointer"
              >
                <span>Check Eligibility & Get Quote</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <a
                href="#doctors"
                className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md text-white text-sm font-semibold tracking-wide transition-all duration-300"
              >
                Browse Surgeons
              </a>

              <a
                href="#hospitals"
                className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md text-white text-sm font-semibold tracking-wide transition-all duration-300"
              >
                Accredited Hospitals
              </a>
            </motion.div>

          </div>

          {/* Right Column: Modern High-Converting Quick Estimate Card */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/20 text-[#1a2e30]"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#0b5d63] block font-heading">
                    Instant Concierge Intake
                  </span>
                  <h3 className="text-xl sm:text-2xl font-heading font-bold text-slate-900">
                    Get Your Free Treatment Plan
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-[#0b5d63]/10 flex items-center justify-center text-[#0b5d63]">
                  <CalendarCheck className="w-5 h-5" />
                </div>
              </div>

              <form onSubmit={handleQuickInquiry} className="space-y-4">
                {/* Specialty Select */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5 font-heading">
                    Required Specialty or Treatment
                  </label>
                  <select
                    value={selectedSpecialty}
                    onChange={(e) => setSelectedSpecialty(e.target.value)}
                    className="w-full px-3.5 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0b5d63] focus:bg-white transition-all"
                  >
                    {specialtiesList.map((spec, i) => (
                      <option key={i} value={spec}>
                        {spec}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Country of Residence */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5 font-heading">
                    Travelling From
                  </label>
                  <select
                    value={patientCountry}
                    onChange={(e) => setPatientCountry(e.target.value)}
                    className="w-full px-3.5 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0b5d63] focus:bg-white transition-all"
                  >
                    {countriesList.map((c, i) => (
                      <option key={i} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Reassurance Feature Grid inside Card */}
                <div className="bg-[#f0f8f9] rounded-2xl p-4 border border-[#dbeff0] space-y-2">
                  <div className="flex items-center gap-2 text-xs font-medium text-[#073f43]">
                    <ShieldCheck className="w-4 h-4 text-[#0b5d63] shrink-0" />
                    <span>Free surgeon opinion within 24–48 hours</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-medium text-[#073f43]">
                    <Clock className="w-4 h-4 text-[#0b5d63] shrink-0" />
                    <span>No waiting list — procedure in days, not months</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-medium text-[#073f43]">
                    <Plane className="w-4 h-4 text-[#0b5d63] shrink-0" />
                    <span>Free visa invitation & hotel coordination</span>
                  </div>
                </div>

                {/* Submit CTA */}
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-[#0b5d63] hover:bg-[#073f43] text-white font-heading font-bold text-sm tracking-wider uppercase transition-all shadow-lg shadow-[#0b5d63]/25 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Stethoscope className="w-4 h-4 text-[#e39b2d]" />
                  <span>Request Clinical Estimate</span>
                </button>

                <p className="text-[11px] text-center text-slate-500 pt-1">
                  🔒 Strictly Confidential & HIPAA Compliant • 100% Free
                </p>
              </form>
            </motion.div>
          </div>

        </div>

        {/* Bottom Trust Stat Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-14 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-6 text-white"
        >
          <div>
            <div className="text-2xl sm:text-3xl font-heading font-bold text-[#e39b2d]">99.2%</div>
            <div className="text-xs text-slate-300 font-medium mt-0.5">Clinical Success Rate</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-heading font-bold text-white">15,000+</div>
            <div className="text-xs text-slate-300 font-medium mt-0.5">International Patients Treated</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-heading font-bold text-[#e39b2d]">70%</div>
            <div className="text-xs text-slate-300 font-medium mt-0.5">Average Cost Savings vs UK/US</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-heading font-bold text-white">24 / 7</div>
            <div className="text-xs text-slate-300 font-medium mt-0.5">Dedicated English Concierge</div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
