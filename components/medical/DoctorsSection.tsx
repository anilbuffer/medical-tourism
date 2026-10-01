"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

export const DoctorsSection = () => {
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
      specialty: "Orthopedic Surgeon",
      category: "Orthopaedics",
      experience: "25 Years",
      education: "MBBS, MS - Orthopaedics",
      hospital: "",
      image: "/jatinder-singla.png",
    },
    {
      name: "Dr. Ashish Ahuja",
      specialty: "Ophthalmology",
      category: "Ophthalmology",
      experience: "22 Years",
      education: "MS (Ophthalmology)",
      hospital: "",
      image: "/ashish-ahuja.png",
    },
    {
      name: "Dr. Vikas Gupta",
      specialty: "Plastic Surgery",
      category: "Plastic Surgery",
      experience: "16 Years",
      education: "MCh - Plastic Surgery",
      hospital: "",
      image: "/vikas-gupta.png",
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

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  return (
    <section className="py-20 sm:py-32 bg-vedara-offwhite relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-[1px] w-8 bg-vedara-gold"></div>
            <p className="text-vedara-gold font-bold text-xs uppercase tracking-widest">
              DISTINGUISHED CLINICIANS
            </p>
            <div className="h-[1px] w-8 bg-vedara-gold"></div>
          </div>
          <h2 className="text-4xl sm:text-5xl font-serif text-vedara-deep leading-tight">
            Your surgeon, <br className="hidden sm:block" />
            <span className="italic font-light">described by what they&apos;ve done.</span>
          </h2>
        </motion.div>

        {/* Filter Tags */}
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {tags.map((tag, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(tag)}
              className={`px-6 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 ${
                activeTab === tag 
                  ? "bg-vedara-deep text-white shadow-lg scale-105" 
                  : "bg-white text-slate-500 hover:bg-slate-100 border border-slate-200 hover:border-slate-300"
              }`}
            >
              {tag}
            </button>
          ))}
        </motion.div>

        {/* Doctors Grid */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {displayDoctors.map((doc, idx) => (
              <motion.div
                key={doc.name}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="bg-white h-full rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 flex flex-col group border border-slate-100"
              >
                {/* Image */}
                <div className="relative w-full h-72 shrink-0 bg-slate-100 overflow-hidden">
                  <Image
                    src={doc.image}
                    alt={doc.name}
                    fill
                    className="object-cover object-top group-hover:scale-110 transition-transform duration-700 ease-out grayscale-[20%] group-hover:grayscale-0"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                
                {/* Details */}
                <div className="flex-1 min-w-0 p-6 flex flex-col justify-between bg-white">
                  <div>
                    <h3 className="font-serif text-xl text-vedara-deep truncate mb-1 group-hover:text-vedara-gold-hover transition-colors">
                      {doc.name}
                    </h3>
                    <div className="text-sm font-light text-slate-500 mb-5 line-clamp-2">
                      {doc.specialty}
                    </div>
                    
                    <div className="space-y-3">
                      {/* Exp */}
                      <div className="flex items-start gap-3">
                        <div className="min-w-0">
                          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Experience</div>
                          <div className="text-xs text-slate-700 font-medium">{doc.experience}</div>
                        </div>
                      </div>
                      {/* Edu */}
                      <div className="flex items-start gap-3">
                        <div className="min-w-0">
                          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Education</div>
                          <div className="text-xs text-slate-700 font-medium truncate">{doc.education}</div>
                        </div>
                      </div>
                      {/* Hosp */}
                      {doc.hospital && (
                        <div className="flex items-start gap-3">
                          <div className="min-w-0">
                            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Hospital</div>
                            <div className="text-xs text-slate-700 font-medium truncate">{doc.hospital}</div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <Button variant="link" render={<Link href="/doctors" />} className="p-0 text-sm font-semibold text-vedara-deep group-hover:text-vedara-gold transition-colors">
                        View Profile <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="mt-16 flex justify-center"
        >
          <Button
            variant="outlineNavy"
            size="xl"
            render={<Link href="/doctors" />}
            className="rounded-xl"
          >
              Meet our surgeons
          </Button>
        </motion.div>

      </div>
    </section>
  );
};
