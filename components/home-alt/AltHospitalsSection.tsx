"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  MapPin, 
  ArrowRight, 
  Building2, 
  ShieldCheck, 
  CheckCircle2, 
  Bed, 
  Activity, 
  FileCheck, 
  Sparkles,
  Calendar,
  Award
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCare } from "@/context/CareContext";

export const AltHospitalsSection = () => {
  const { openIntake } = useCare();

  const hospitals = [
    {
      name: "Max Super Speciality Hospital",
      tagline: "Quaternary Multi-Disciplinary Surgical Campus",
      location: "Chandigarh Road in Phase 6, Sahibzada Ajit Singh Nagar (Mohali), Punjab",
      image: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&q=80&w=1200",
      founded: "2011 (15+ Years Clinical Service)",
      accreditation: "NABH & NABL Dual Accredited",
      licenseNo: "NABH-2023-0891 (Valid through 2028)",
      procedures: "15,000+ Annual Surgical Procedures",
      beds: "200+ Tertiary & Robotic ICU Beds",
      highlights: [
        "Robotic MAKO Orthopaedic Arthroplasty Suite",
        "Bi-Plane Neurovascular & Hybrid Cardiac Cath Labs",
        "Dedicated International Patient Floor & Concierge Lounge",
        "NABH Certified In-House Transfusion & Blood Bank"
      ],
      badge: "Premier Quaternary Partner",
    },
    {
      name: "Profile Aesthetic Surgery Institute",
      tagline: "Dedicated Plastic & Reconstructive Center",
      location: "Ludhiana - Led by Dr. Vikas Gupta, Senior Aesthetic Surgeon",
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200",
      founded: "2008 (18+ Years Specialized Practice)",
      accreditation: "ISO 9001:2015 Quality Certified Facility",
      licenseNo: "ISO-QMS-2022-4412 (Verified Audit)",
      procedures: "2,500+ Aesthetic Transformations Annually",
      beds: "Dedicated Daycare & Private Recovery Suites",
      highlights: [
        "4D High-Definition VASER Ultrasonic Liposuction",
        "Ultra-Sterile Laminar Airflow Surgical Theaters",
        "Private VIP Recovery Lounge with Discreet Discharge",
        "Zero Cross-Infection Surgical Protocol Standard"
      ],
      badge: "Specialized Aesthetic Centre",
    },
    {
      name: "Sangam Netralaya Eye Institute",
      tagline: "Super-Specialty Ophthalmology & Refractive Center",
      location: "Ajitgarh, Punjab",
      image: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=1200",
      founded: "2002 (24+ Years Ophthalmology Legacy)",
      accreditation: "NABH Accredited Dedicated Eye Hospital",
      licenseNo: "NABH-EYE-2021-032 (Government Audited)",
      procedures: "8,000+ Lens, Cornea & Lasik Procedures Annually",
      beds: "Full Outpatient Ambulatory Surgical Center",
      highlights: [
        "Blade-Free Femto-LASIK & Contoura Vision Laser Suite",
        "Zeiss Lumera High-Precision Micro-Surgical Optics",
        "High-Resolution Wavefront Diagnostic Corneal Topography",
        "Same-Day Ambulatory Procedure & Fast-Track Release"
      ],
      badge: "Ophthalmology Excellence",
    },
  ];

  return (
    <section id="hospitals" className="py-24 sm:py-32 bg-gradient-to-b from-[#040E26] via-[#07183D] to-[#05122E] text-white relative overflow-hidden">
      {/* Ambient background glows */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.3, 0.15]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-vedara-blue/20 rounded-full blur-[160px] pointer-events-none" 
      />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-vedara-gold/10 rounded-full blur-[160px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-[2px] w-10 bg-vedara-gold" />
            <p className="text-vedara-gold font-bold text-xs uppercase tracking-[0.25em]">
              BEING STRAIGHT WITH YOU
            </p>
            <div className="h-[2px] w-10 bg-vedara-gold" />
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-white mb-8 leading-[1.12]">
            We&apos;re new. <br />
            <span className="italic font-light bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-300 bg-clip-text text-transparent">
              Our hospitals are not.
            </span>
          </h2>

          <div className="space-y-4 text-base sm:text-lg text-slate-300 font-light leading-relaxed">
            <p>
              You won&apos;t find hundreds of reviews for us, because we started this year. What you can verify today is every hospital we work with — when it was founded, what it&apos;s accredited to, when that accreditation expires, and how many of your procedure it does each year.
            </p>
            <p className="font-semibold text-white text-lg">
              That&apos;s the record that matters. We&apos;re the people who get you to it and stay beside you while you&apos;re there.
            </p>
          </div>
        </div>

        {/* Verifiable Credentials Header Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 p-5 sm:p-6 rounded-3xl bg-white/[0.06] border-2 border-vedara-cyan/30 shadow-glow backdrop-blur-2xl flex flex-wrap items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-vedara-cyan/20 text-vedara-cyan flex items-center justify-center font-bold shadow-md shadow-cyan-500/20">
              <FileCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-sm font-bold text-white flex items-center gap-1.5">
                <span>Independent Clinical Verification</span>
                <Sparkles className="w-3.5 h-3.5 text-vedara-gold" />
              </span>
              <p className="text-xs text-slate-300">Every facility license and accreditation certificate can be inspected prior to flight booking.</p>
            </div>
          </div>
          <span className="text-xs font-black text-vedara-gold uppercase tracking-wider flex items-center gap-1.5 bg-vedara-gold/15 px-3 py-1.5 rounded-full border border-vedara-gold/40">
            <ShieldCheck className="w-4 h-4" />
            <span>100% Publicly Audited</span>
          </span>
        </motion.div>

        {/* ── HORIZONTAL INSTITUTIONAL CREDIBILITY LEDGER (Distinct Layout) ── */}
        <div className="space-y-8">
          {hospitals.map((hosp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-gradient-to-r from-[#0B1E45]/95 via-[#071638]/95 to-[#040D26]/95 rounded-3xl overflow-hidden shadow-2xl border-2 border-white/15 hover:border-vedara-cyan/60 group transition-all duration-500"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
                
                {/* Left 5 Cols: Panoramic Architectural Photo with Stamps */}
                <div className="lg:col-span-5 relative min-h-[280px] lg:min-h-[360px] overflow-hidden bg-slate-950">
                  <Image
                    src={hosp.image}
                    alt={hosp.name}
                    fill
                    className="object-cover group-hover:scale-105 group-hover:brightness-105 transition-transform duration-700 ease-out"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/80 via-black/30 to-transparent" />
                  
                  {/* Floating Badges */}
                  <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                    <span className="px-3 py-1.5 rounded-full bg-vedara-deep/90 backdrop-blur-xl text-vedara-gold text-xs font-black uppercase tracking-wider border border-vedara-gold/50 shadow-lg">
                      {hosp.badge}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-xl text-vedara-cyan text-[11px] font-bold border border-white/20">
                      {hosp.accreditation}
                    </span>
                  </div>

                  {/* Bottom Location Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center gap-2 text-xs text-slate-200 bg-black/60 backdrop-blur-md p-2.5 rounded-xl border border-white/15">
                    <MapPin className="w-4 h-4 text-vedara-cyan shrink-0" />
                    <span className="truncate">{hosp.location}</span>
                  </div>
                </div>

                {/* Right 7 Cols: Verifiable Institutional Record */}
                <div className="lg:col-span-7 p-6 sm:p-8 md:p-10 flex flex-col justify-between">
                  <div>
                    {/* Header Row */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                      <div>
                        <h3 className="font-serif text-2xl sm:text-3xl text-white font-bold group-hover:text-amber-300 transition-colors">
                          {hosp.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-vedara-cyan font-medium">
                          {hosp.tagline}
                        </p>
                      </div>
                      <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5 bg-white/5 px-3 py-1 rounded-lg border border-white/10 self-start sm:self-auto">
                        <Calendar className="w-3.5 h-3.5 text-vedara-gold" />
                        <span>Est. {hosp.founded}</span>
                      </span>
                    </div>

                    {/* Verifiable Ledger Metrics Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-5 py-4 border-y border-white/10">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-vedara-cyan/15 flex items-center justify-center text-vedara-cyan shrink-0">
                          <Activity className="w-4.5 h-4.5" />
                        </div>
                        <div>
                          <div className="text-[10px] uppercase font-bold text-slate-400">Annual Surgical Volume</div>
                          <div className="text-xs sm:text-sm font-extrabold text-white">{hosp.procedures}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-vedara-gold/15 flex items-center justify-center text-vedara-gold shrink-0">
                          <Bed className="w-4.5 h-4.5" />
                        </div>
                        <div>
                          <div className="text-[10px] uppercase font-bold text-slate-400">Tertiary Capacity</div>
                          <div className="text-xs sm:text-sm font-extrabold text-white">{hosp.beds}</div>
                        </div>
                      </div>

                      <div className="sm:col-span-2 flex items-center gap-3 bg-white/[0.03] p-2.5 rounded-xl border border-white/10">
                        <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                        <div className="text-xs">
                          <span className="text-slate-400">Audited License Number: </span>
                          <span className="font-mono font-bold text-white text-xs">{hosp.licenseNo}</span>
                        </div>
                      </div>
                    </div>

                    {/* Infrastructure Highlights */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                      {hosp.highlights.map((high, hIdx) => (
                        <div key={hIdx} className="flex items-center gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-vedara-cyan shrink-0" />
                          <span>{high}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Action Footer */}
                  <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <span className="text-xs text-slate-400">
                      All clinical equipment inspected & certified for international procedures.
                    </span>
                    <Button
                      variant="gold"
                      size="default"
                      onClick={() => openIntake(hosp.name)}
                      className="text-vedara-deep font-black rounded-xl shadow-md shadow-amber-500/20 hover:scale-[1.02] transition-all cursor-pointer self-start sm:self-auto"
                    >
                      <span>Inquire About {hosp.name.split(" ")[0]}</span>
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
