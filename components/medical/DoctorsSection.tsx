"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const DoctorsSection = () => {
  const [activeTab, setActiveTab] = useState("All");
  
  const tags = [
    "All",
    "Transplant & Haematology",
    "Cardiac",
    "Oncology",
    "Orthopaedics",
    "Fertility",
  ];

  const doctors = [
    {
      name: "Dr. Ramesh Kumar Sen",
      specialty: "Orthopaedics & Joint Replacement",
      category: "Orthopaedics",
      experience: "38+ Years",
      education: "Ph.D Orthopaedics...",
      hospital: "MAX Healthcare",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=600",
    },
    {
      name: "Dr. Jamie Holmes",
      specialty: "Orthopaedics & Joint Replacement",
      category: "Orthopaedics",
      experience: "21+ Years",
      education: "MBBS, MS, M.Ch (Ortho)",
      hospital: "MAX Healthcare",
      image: "https://images.unsplash.com/photo-1622902046580-2b47f47f5471?auto=format&fit=crop&q=80&w=600",
    },
    {
      name: "Dr. Adrianne Silvers",
      specialty: "General Pediatrician",
      category: "Oncology",
      experience: "8 Years",
      education: "MBBS, MD (Internal...",
      hospital: "Multispecialty Hospital",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600",
    },
  ];

  const filteredDoctors = activeTab === "All" 
    ? doctors 
    : doctors.filter(doc => doc.category === activeTab || doc.specialty.includes(activeTab));

  const displayDoctors = filteredDoctors.length > 0 ? filteredDoctors : doctors;

  return (
    <section className="py-12 sm:py-16 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-orange-500 font-bold text-xs uppercase tracking-widest mb-3">
            DISTINGUISHED CLINICIANS
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F1340]">
            Your surgeon, described by what they&apos;ve done.
          </h2>
        </div>

        {/* Filter Tags */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {tags.map((tag, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(tag)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-colors ${
                activeTab === tag 
                  ? "bg-[#031126] text-white shadow-sm" 
                  : "bg-transparent text-slate-500 hover:bg-slate-100"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {displayDoctors.map((doc, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 hover:border-slate-200 hover:shadow-xl transition-all duration-300 flex flex-row group"
            >
              {/* Image - Fill Height */}
              <div className="relative w-36 sm:w-40 md:w-44 shrink-0 bg-slate-100 self-stretch min-h-[220px]">
                <Image
                  src={doc.image}
                  alt={doc.name}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 150px, 180px"
                />
              </div>
              
              {/* Details */}
              <div className="flex-1 min-w-0 p-5 sm:p-6 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-[15px] sm:text-base text-slate-900 truncate mb-1 group-hover:text-blue-900 transition-colors">
                    {doc.name}
                  </h3>
                  <div className="inline-block px-2.5 py-0.5 bg-orange-50 text-orange-700 text-[10px] font-bold rounded mb-3.5 max-w-full truncate">
                    {doc.specialty}
                  </div>
                  
                  <div className="space-y-2.5">
                    {/* Exp */}
                    <div className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-teal-50 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-[10px]">⭐</span>
                      </div>
                      <div className="min-w-0">
                        <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Years of Experience</div>
                        <div className="text-[11px] text-slate-800 font-medium">{doc.experience}</div>
                      </div>
                    </div>
                    {/* Edu */}
                    <div className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-teal-50 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-[10px]">🎓</span>
                      </div>
                      <div className="min-w-0">
                        <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Education</div>
                        <div className="text-[11px] text-slate-800 font-medium truncate">{doc.education}</div>
                      </div>
                    </div>
                    {/* Hosp */}
                    <div className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-teal-50 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-[10px]">🏥</span>
                      </div>
                      <div className="min-w-0">
                        <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Hospital</div>
                        <div className="text-[11px] text-slate-800 font-medium truncate">{doc.hospital}</div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 flex justify-end">
          <Link
            href="/doctors"
            className="px-6 py-3 rounded-xl bg-[#e5ca76] hover:bg-[#d6b754] text-slate-900 text-sm font-bold shadow-sm flex items-center gap-2 transition-colors cursor-pointer"
          >
            <span>View all doctors</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
};
