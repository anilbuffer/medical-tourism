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
      education: "Ph.D Orthopaedics, MS, MBBS",
      hospital: "MAX Super Speciality Hospital",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600",
    },
    {
      name: "Dr. Jamie Holmes",
      specialty: "Orthopaedics & Joint Replacement",
      category: "Orthopaedics",
      experience: "21+ Years",
      education: "MBBS, MS, M.Ch (Ortho)",
      hospital: "Fortis Hospital Mohali",
      image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=600",
    },
    {
      name: "Dr. Adrianne Silvers",
      specialty: "Oncology & Haematology Care",
      category: "Oncology",
      experience: "18+ Years",
      education: "MBBS, MD, DM (Clinical Oncology)",
      hospital: "Healing Super Specialty Hospital",
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
          <p className="text-[#a58d34] font-bold text-xs uppercase tracking-widest mb-3">
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
                  ? "bg-[#0F1340] text-white shadow-sm" 
                  : "bg-transparent text-slate-500 hover:bg-slate-100"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Doctors Grid - Unmistakably Unified Set */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {displayDoctors.map((doc, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100 hover:border-slate-200 hover:shadow-xl transition-all duration-300 flex flex-col sm:flex-row group"
            >
              {/* Image - Fill Height with identical head-and-shoulders portrait ratio */}
              <div className="relative w-full sm:w-40 md:w-44 h-56 sm:h-auto shrink-0 bg-slate-100 self-stretch">
                <Image
                  src={doc.image}
                  alt={doc.name}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, 180px"
                />
              </div>
              
              {/* Details */}
              <div className="flex-1 min-w-0 p-5 sm:p-6 flex flex-col justify-between">
                <div>
                  {/* Unified Board-Certified Badge across all three cards */}
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#0F1340]/5 text-[#0F1340] border border-[#0F1340]/10 mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C9A24A]"></span>
                    <span>Verified Clinician</span>
                  </div>

                  <h3 className="font-bold text-base text-slate-900 truncate mb-1 group-hover:text-[#0F1340] transition-colors">
                    {doc.name}
                  </h3>
                  <div className="text-xs font-medium text-slate-500 mb-3.5 line-clamp-1">
                    {doc.specialty}
                  </div>
                  
                  {/* Metadata Stats - Neutral Slate Icons, No Clashing Green */}
                  <div className="space-y-2.5">
                    {/* Exp */}
                    <div className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center shrink-0 mt-0.5 text-slate-600">
                        <span className="text-[10px]">⭐</span>
                      </div>
                      <div className="min-w-0">
                        <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Years of Experience</div>
                        <div className="text-[11px] text-slate-800 font-medium">{doc.experience}</div>
                      </div>
                    </div>
                    {/* Edu */}
                    <div className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center shrink-0 mt-0.5 text-slate-600">
                        <span className="text-[10px]">🎓</span>
                      </div>
                      <div className="min-w-0">
                        <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Education</div>
                        <div className="text-[11px] text-slate-800 font-medium truncate">{doc.education}</div>
                      </div>
                    </div>
                    {/* Hosp */}
                    <div className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center shrink-0 mt-0.5 text-slate-600">
                        <span className="text-[10px]">🏥</span>
                      </div>
                      <div className="min-w-0">
                        <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Hospital</div>
                        <div className="text-[11px] text-slate-800 font-medium truncate">{doc.hospital}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100">
                  <Link
                    href="/doctors"
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#0F1340] hover:text-[#C9A24A] transition-colors"
                  >
                    <span>View Profile</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA - Secondary Action: Outlined Navy */}
        <div className="mt-12 flex justify-end">
          <Link
            href="/doctors"
            className="px-6 py-3 rounded-xl border-2 border-[#0F1340] text-[#0F1340] hover:bg-[#0F1340] hover:text-white text-sm font-bold shadow-xs flex items-center gap-2 transition-all cursor-pointer"
          >
            <span>View all doctors</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
};
