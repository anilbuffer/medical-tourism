"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Video, Award, CheckCircle2, Calendar, Star, Stethoscope, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCare } from "@/context/CareContext";

export const AltDoctorsSection = () => {
  const { openIntake } = useCare();
  const [activeTab, setActiveTab] = useState("All");

  const tags = ["All", "Orthopaedics", "Ophthalmology", "Plastic Surgery"];

  const doctors = [
    {
      name: "Dr. Jatinder Singla",
      specialty: "Orthopedic Surgeon",
      category: "Orthopaedics",
      experience: "25 Years",
      education: "MBBS, MS - Orthopaedics",
      fellowship: "Joint Replacement Fellow (UK & Germany)",
      surgicalCount: "8,500+ Arthroplasties",
      hospital: "Max Super Specialty Hospital, Mohali",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=1000",
      quote: "Direct anterior approach knee replacement with patient walking independently within 4 hours post-op.",
      rating: "4.98",
      reviews: "320+ International Reviews",
    },
    {
      name: "Dr. Ashish Ahuja",
      specialty: "Ophthalmology",
      category: "Ophthalmology",
      experience: "22 Years",
      education: "MS (Ophthalmology)",
      fellowship: "Cornea & Refractive Fellow (AIIMS New Delhi)",
      surgicalCount: "12,000+ Lens & Lasik Surgeries",
      hospital: "Sangam Netralaya, Punjab",
      image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=1000",
      quote: "Precision wavefront-guided blade-free Femto-LASIK and customized trifocal toric intraocular implants.",
      rating: "4.96",
      reviews: "410+ International Reviews",
    },
    {
      name: "Dr. Vikas Gupta",
      specialty: "Plastic Surgery",
      category: "Plastic Surgery",
      experience: "16 Years",
      education: "MCh - Plastic Surgery",
      fellowship: "Aesthetic Surgery Fellow (ISAPS Switzerland)",
      surgicalCount: "4,000+ Aesthetic Transformations",
      hospital: "Profile Cosmetic Surgery, Ludhiana",
      image: "https://images.unsplash.com/photo-1594824813571-638f02614d3f?auto=format&fit=crop&q=80&w=1000",
      quote: "High-definition 4D VASER contouring and natural preservation rhinoplasty with undetectable scars.",
      rating: "4.95",
      reviews: "280+ International Reviews",
    },
  ];

  const filteredDoctors = activeTab === "All"
    ? doctors
    : doctors.filter(doc => doc.category === activeTab || doc.specialty.includes(activeTab));

  return (
    <section id="doctors" className="py-24 sm:py-32 bg-gradient-to-b from-[#05122E] via-[#071638] to-[#03091E] text-white relative overflow-hidden">
      {/* Decorative ambient lighting */}
      <motion.div 
        animate={{ 
          scale: [1, 1.25, 1],
          opacity: [0.15, 0.35, 0.15]
        }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-vedara-cyan/20 rounded-full blur-[160px] pointer-events-none" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-[2px] w-10 bg-vedara-gold" />
            <p className="text-vedara-gold font-bold text-xs uppercase tracking-[0.25em]">
              DISTINGUISHED CLINICIANS
            </p>
            <div className="h-[2px] w-10 bg-vedara-gold" />
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-white leading-[1.12]">
            Your surgeon, <br className="hidden sm:block" />
            <span className="italic font-light bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-300 bg-clip-text text-transparent">
              described by what they&apos;ve done.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300 font-light mt-4">
            Every consultant in our network has led senior surgical units in national quaternary centers for over 15 years.
          </p>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-16">
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setActiveTab(tag)}
              className={`px-6 py-2.5 rounded-full text-xs font-bold tracking-wide transition-all duration-300 cursor-pointer ${
                activeTab === tag 
                  ? "bg-gradient-to-r from-vedara-cyan via-teal-400 to-vedara-blue text-[#020713] shadow-glow font-black scale-105" 
                  : "bg-white/[0.08] text-slate-300 hover:bg-white/15 border border-white/15 backdrop-blur-md"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Doctors Showcase Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
          <AnimatePresence mode="popLayout">
            {filteredDoctors.map((doc) => (
              <motion.div
                key={doc.name}
                layout
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ duration: 0.4 }}
                className="bg-gradient-to-b from-[#0A1630]/95 via-[#061024]/95 to-[#020713]/95 rounded-3xl overflow-hidden shadow-2xl border-2 border-white/15 hover:border-vedara-cyan/60 flex flex-col justify-between group transition-all duration-500"
              >
                <div>
                  {/* Portrait Image Container */}
                  <div className="relative w-full h-84 bg-slate-950 overflow-hidden">
                    <Image
                      src={doc.image}
                      alt={doc.name}
                      fill
                      className="object-cover object-top group-hover:scale-105 group-hover:brightness-105 transition-transform duration-700 ease-out"
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020713] via-[#020713]/35 to-transparent" />
                    
                    {/* Live Video Indicator */}
                    <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1 rounded-full bg-black/70 backdrop-blur-xl text-emerald-300 text-xs font-bold border border-emerald-400/40">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Video Review Ready</span>
                    </div>

                    {/* Rating Pill */}
                    <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-vedara-deep/85 backdrop-blur-xl text-vedara-gold text-xs font-bold border border-vedara-gold/40">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{doc.rating}</span>
                    </div>

                    {/* Surgical Count Badge on Image */}
                    <div className="absolute bottom-3 left-4 right-4 z-10 flex items-center justify-between text-white text-xs">
                      <span className="px-3 py-1 rounded-full bg-vedara-gold text-vedara-deep text-xs font-black shadow-md">
                        {doc.experience} Experience
                      </span>
                      <span className="text-[11px] font-bold text-vedara-cyan bg-black/70 px-2.5 py-1 rounded-full backdrop-blur-md border border-white/10">
                        {doc.surgicalCount}
                      </span>
                    </div>
                  </div>

                  {/* Body Details */}
                  <div className="p-8">
                    <h3 className="font-serif text-2xl text-white group-hover:text-amber-300 transition-colors mb-1">
                      {doc.name}
                    </h3>
                    <div className="text-sm font-bold text-vedara-cyan mb-3">
                      {doc.specialty}
                    </div>

                    <p className="text-xs text-slate-300 font-light italic mb-6 leading-relaxed bg-white/[0.05] p-3.5 rounded-xl border border-white/10">
                      &ldquo;{doc.quote}&rdquo;
                    </p>

                    {/* Credentials Stack */}
                    <div className="space-y-3 pt-2 mb-6">
                      <div className="flex items-start gap-2.5">
                        <Award className="w-4 h-4 text-vedara-gold shrink-0 mt-0.5" />
                        <div>
                          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                            Degrees & Education
                          </div>
                          <div className="text-xs text-slate-200 font-semibold">{doc.education}</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5">
                        <Sparkles className="w-4 h-4 text-vedara-cyan shrink-0 mt-0.5" />
                        <div>
                          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                            Fellowship Training
                          </div>
                          <div className="text-xs text-slate-200 font-medium">{doc.fellowship}</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5">
                        <Stethoscope className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                        <div>
                          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                            Primary Operating Center
                          </div>
                          <div className="text-xs text-slate-200 font-medium">{doc.hospital}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Actions Bar */}
                <div className="p-8 pt-0 mt-auto border-t border-white/15 pt-5 flex items-center justify-between gap-3">
                  <Button
                    variant="link"
                    render={<Link href="/doctors" />}
                    className="p-0 text-sm font-bold text-white hover:text-vedara-gold transition-colors"
                  >
                    <span>View Profile</span>
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1.5 transition-transform" />
                  </Button>

                  <Button
                    variant="gold"
                    size="sm"
                    onClick={() => openIntake(doc.specialty)}
                    className="text-vedara-deep font-extrabold rounded-xl text-xs shadow-md px-4 hover:scale-105 transition-all"
                  >
                    <Calendar className="w-3.5 h-3.5 mr-1" />
                    <span>Book Video Consult</span>
                  </Button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 flex justify-center">
          <Button
            variant="gold"
            size="xl"
            render={<Link href="/doctors" />}
            className="rounded-2xl font-extrabold text-vedara-deep shadow-[0_0_35px_rgba(201,162,74,0.45)] hover:shadow-[0_0_55px_rgba(201,162,74,0.7)] hover:scale-105 transition-all px-9"
          >
            <span>Meet our surgeons</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

      </div>
    </section>
  );
};
