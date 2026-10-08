"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowRight, ShieldCheck, Award, Bed, Building2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { CommonCarousel } from "@/components/ui/common-carousel";

export const HospitalsSection = () => {
  const hospitals = [
    {
      name: "Fortis Hospital",
      location: "Mohali, Punjab — North India Hub",
      image: "/fortis-image.png",
      accreditation: "JCI & NABH Accredited",
      specialties: "Cardiac Surgery, Robotic Oncology, Orthopaedics",
      beds: "350+ Quaternary Beds",
    },
    {
      name: "Max Super Speciality Hospital",
      location: "Mohali / Chandigarh Capital Region",
      image: "/max-hospital.jpg",
      accreditation: "NABH & NABL Accredited",
      specialties: "Neurosciences, Kidney Transplant, Joint Replacement",
      beds: "200+ Dedicated Beds",
    },
    {
      name: "Profile Cosmetic Surgery Institute",
      location: "Ludhiana — Led by Dr. Vikas Gupta",
      image: "/profileaestheticsurgery.png",
      accreditation: "ISO & Quality Healthcare Certified",
      specialties: "High-Definition VASER, Rhinoplasty, Body Contouring",
      beds: "Boutique Private Suites",
    },
    {
      name: "Sangam Netralaya Eye Hospital",
      location: "Ajitgarh / Mohali, Punjab",
      image: "/sangam-netralaya.webp",
      accreditation: "NABH Eye Care Centre of Excellence",
      specialties: "Contoura Blade-Free Lasik, Micro-Incision Cataract",
      beds: "Specialised Day-Care Suites",
    },
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as any } },
  };

  return (
    <section id="hospitals" className="py-16 sm:py-24 bg-white relative border-t border-[#e2eaeb] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f0f8f9] border border-[#dbeff0] text-[#0b5d63] text-xs font-heading font-bold uppercase tracking-wider mb-3">
            <Award className="w-3.5 h-3.5 text-[#e39b2d]" />
            <span>GLOBAL STANDARDS OF CARE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-slate-900 mb-4 leading-tight">
            Featured Partner Hospitals
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            World-class institutions rigorously audited for clinical outcomes, stringent infection control, and international patient hospitality.
          </p>
        </motion.div>

        {/* Hospital Carousel */}
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}
        >
          <CommonCarousel
            opts={{ align: "start", loop: false }}
            className="w-full"
            itemClassName="md:basis-1/2 lg:basis-1/3 xl:basis-1/3 pl-4 sm:pl-6"
          >
            {hospitals.map((hosp, idx) => (
              <Card
                key={idx}
                className="group relative h-[420px] w-full overflow-hidden rounded-3xl border border-[#e2eaeb] shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer mx-auto flex flex-col justify-end"
              >
                <Image
                  src={hosp.image}
                  alt={hosp.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                
                {/* Gradient overlay for readability with deep teal hint */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#04272a]/95 via-[#073f43]/40 to-transparent transition-opacity duration-300" />
                
                {/* Top Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#0b5d63] text-xs font-heading font-bold tracking-wide shadow-sm flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#e39b2d]" />
                    <span>{hosp.accreditation}</span>
                  </span>
                </div>

                {/* Content at bottom */}
                <div className="relative z-10 p-6 sm:p-7 flex flex-col justify-end">
                  <h3 className="font-heading font-bold text-2xl text-white leading-tight mb-2 group-hover:text-[#e39b2d] transition-colors">
                    {hosp.name}
                  </h3>
                  
                  <div className="flex items-start gap-2 text-xs text-slate-200 font-normal mb-3">
                    <MapPin className="w-3.5 h-3.5 text-[#e39b2d] shrink-0 mt-0.5" />
                    <span className="leading-snug line-clamp-1">{hosp.location}</span>
                  </div>

                  <div className="text-xs text-slate-300 mb-4 line-clamp-1">
                    <strong className="text-white">Specialties:</strong> {hosp.specialties}
                  </div>
                  
                  <div className="flex items-center justify-between pt-3 border-t border-white/15 text-xs font-heading font-bold tracking-wide text-white group-hover:text-[#e39b2d] transition-colors duration-300">
                    <span>View Hospital Facilities</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>

                {/* Full card clickable link */}
                <Link href="/hospitals" className="absolute inset-0 z-10">
                  <span className="sr-only">View {hosp.name} profile</span>
                </Link>
              </Card>
            ))}
          </CommonCarousel>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="mt-14 flex justify-center"
        >
          <Link
            href="/hospitals"
            className="px-8 py-3.5 rounded-xl border-2 border-[#0b5d63] text-[#0b5d63] hover:bg-[#0b5d63] hover:text-white font-heading font-bold text-xs uppercase tracking-wider transition-all shadow-sm hover:shadow-md"
          >
            See The Full Accredited Hospital Network
          </Link>
        </motion.div>

      </div>
    </section>
  );
};
