"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Award, GraduationCap, Video, Stethoscope, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCare } from "@/context/CareContext";

export const DoctorsSection = () => {
  const { openIntake } = useCare();
  const [activeTab, setActiveTab] = useState("All");
  
  const tags = [
    "All",
    "Orthopaedics",
    "Ophthalmology",
    "Plastic Surgery",
  ];

  const doctors = [
    {
      name: "Dr. Jatinder Singla",
      specialty: "Senior Director — Orthopaedic & Robotic Joint Surgery",
      category: "Orthopaedics",
      experience: "25+ Years Experience",
      education: "MBBS, MS - Orthopaedics, Fellowship in Joint Replacement",
      hospital: "Fortis Hospital & Quaternary Centres",
      image: "/jatinder-singla.png",
      rating: "4.9 / 5.0",
      surgeries: "12,000+ Joint Surgeries",
    },
    {
      name: "Dr. Ashish Ahuja",
      specialty: "Director — Ophthalmology & Contoura Refractive Surgery",
      category: "Ophthalmology",
      experience: "22+ Years Experience",
      education: "MBBS, MS (Ophthalmology), Cornea & Refractive Specialist",
      hospital: "Sangam Netralaya Super Speciality Eye Hospital",
      image: "/ashish-ahuja.png",
      rating: "5.0 / 5.0",
      surgeries: "15,000+ Laser Procedures",
    },
    {
      name: "Dr. Vikas Gupta",
      specialty: "Chief Consultant — Aesthetic & Reconstructive Plastic Surgery",
      category: "Plastic Surgery",
      experience: "16+ Years Experience",
      education: "MBBS, MS - General Surgery, MCh - Plastic Surgery",
      hospital: "Profile Aesthetic & Cosmetic Surgery Institute",
      image: "/vikas-gupta.png",
      rating: "4.9 / 5.0",
      surgeries: "4,500+ Aesthetic Surgeries",
    },
  ];

  const filteredDoctors = activeTab === "All" 
    ? doctors 
    : doctors.filter(doc => doc.category === activeTab || doc.specialty.includes(activeTab));

  const displayDoctors = filteredDoctors.length > 0 ? filteredDoctors : doctors;

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as any } },
  };

  return (
    <section id="doctors" className="py-16 sm:py-24 bg-[#f8fafb] relative border-t border-[#e2eaeb] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f0f8f9] border border-[#dbeff0] text-[#0b5d63] text-xs font-heading font-bold uppercase tracking-wider mb-3">
            <Stethoscope className="w-3.5 h-3.5 text-[#e39b2d]" />
            <span>EXPERT SURGICAL DIRECTORS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-slate-900 mb-4 leading-tight">
            Meet Our Senior Medical Directors
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            Every specialist in our network is a vetted department director with international credentials, recognized track records, and dedicated care for overseas patients.
          </p>
        </motion.div>

        {/* Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-12">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTab(tag)}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-heading font-bold transition-all duration-200 cursor-pointer ${
                activeTab === tag
                  ? "bg-[#0b5d63] text-white shadow-md shadow-[#0b5d63]/20"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Doctor Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {displayDoctors.map((doc) => (
              <motion.div
                key={doc.name}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 flex flex-col group border border-[#e2eaeb]"
              >
                {/* Doctor Image with Experience Overlay */}
                <div className="relative w-full h-80 shrink-0 bg-slate-100 overflow-hidden">
                  <Image
                    src={doc.image}
                    alt={doc.name}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#04272a]/85 via-transparent to-transparent" />
                  
                  {/* Top Rating Badge */}
                  <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#a35f0b] text-xs font-bold shadow-sm">
                    <Star className="w-3.5 h-3.5 fill-[#e39b2d] text-[#e39b2d]" />
                    <span>{doc.rating}</span>
                  </div>

                  {/* Bottom Stats Badge on Image */}
                  <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between text-white text-xs">
                    <span className="font-semibold text-slate-200">{doc.experience}</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#e39b2d] text-slate-950 font-heading font-bold text-[11px]">
                      {doc.surgeries}
                    </span>
                  </div>
                </div>
                
                {/* Details Section */}
                <div className="flex-1 p-6 sm:p-7 flex flex-col justify-between bg-white">
                  <div>
                    <h3 className="font-heading font-extrabold text-2xl text-slate-900 mb-1 group-hover:text-[#0b5d63] transition-colors">
                      {doc.name}
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold text-[#0b5d63] mb-4 line-clamp-2">
                      {doc.specialty}
                    </p>
                    
                    <div className="space-y-2.5 text-xs text-slate-600 border-t border-slate-100 pt-3">
                      <div className="flex items-start gap-2">
                        <GraduationCap className="w-4 h-4 text-[#e39b2d] shrink-0 mt-0.5" />
                        <span className="font-medium text-slate-700">{doc.education}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Award className="w-4 h-4 text-[#e39b2d] shrink-0 mt-0.5" />
                        <span className="font-medium text-slate-700">{doc.hospital}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-6 pt-5 border-t border-slate-100 flex items-center gap-3">
                    <button
                      onClick={() => openIntake(doc.name)}
                      className="flex-1 py-3 px-4 rounded-xl bg-[#0b5d63] hover:bg-[#073f43] text-white font-heading font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                    >
                      <Video className="w-3.5 h-3.5 text-[#e39b2d]" />
                      <span>Video Consult</span>
                    </button>

                    <Link 
                      href="/doctors" 
                      className="p-3 rounded-xl border border-slate-200 hover:border-[#0b5d63] text-slate-600 hover:text-[#0b5d63] transition-colors"
                      title="View Full Profile"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>

                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* View All Doctors CTA */}
        <div className="mt-14 text-center">
          <Link
            href="/doctors"
            className="inline-flex items-center gap-2 text-sm font-heading font-bold text-[#0b5d63] hover:text-[#e39b2d] transition-colors group cursor-pointer"
          >
            <span>View All Doctors & Surgical Specialists Across India</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

      </div>
    </section>
  );
};
