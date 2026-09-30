"use client";

import React from "react";
import Image from "next/image";
import { MapPin, Star, ArrowRight } from "lucide-react";

export const HospitalsSection = () => {
  const hospitals = [
    {
      name: "MAX Super Speciality Hospital",
      location: "Sector 8C, Chandigarh",
      rating: "4.9 (1,240)",
      image: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&q=80",
    },
    {
      name: "Fortis Hospital Mohali",
      location: "Sector 8C, Chandigarh",
      rating: "4.9 (1,240)",
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80",
    },
    {
      name: "Healing Super Specialty Hospital",
      location: "Sector 8C, Chandigarh",
      rating: "4.9 (1,240)",
      image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80",
    },
    {
      name: "Sangam Netralaya",
      location: "Sector 8C, Chandigarh",
      rating: "4.9 (1,240)",
      image: "https://images.unsplash.com/photo-1538108149393-fbbd81893907?auto=format&fit=crop&q=80",
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-[#f8f9fa]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <p className="text-[#a58d34] font-bold text-xs uppercase tracking-widest mb-3">
            BEING STRAIGHT WITH YOU
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F1340] mb-6">
            We&apos;re new. Our <span className="italic text-[#0D9488]">hospitals</span> are not.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-4">
            You won&apos;t find hundreds of reviews for us, because we started this year. What you can verify today is every hospital we work with — when it was founded, what it&apos;s accredited to, when that accreditation expires, and how many of your procedure it does each year.
          </p>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            That&apos;s the record that matters. We&apos;re the people who get you to it and stay beside you while you&apos;re there.
          </p>
        </div>

        {/* Hospital Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {hospitals.map((hosp, idx) => (
            <div key={idx} className="bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100 flex flex-col group">
              <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                <Image
                  src={hosp.image}
                  alt={hosp.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-bold text-lg text-slate-900 leading-tight mb-2 h-12">
                  {hosp.name}
                </h3>
                
                <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-3">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{hosp.location}</span>
                </div>
                
                <div className="flex items-center gap-1.5 mb-6">
                  <div className="flex text-[#ffc107]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-slate-500">{hosp.rating}</span>
                </div>

                <div className="mt-auto">
                  <button className="w-full py-2.5 rounded-xl bg-[#031126] hover:bg-[#06203D] text-white text-xs font-bold transition-colors flex items-center justify-center gap-1">
                    <span>View Profile</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 flex justify-end">
          <button className="px-6 py-3 rounded-xl bg-[#ffeb3b] hover:bg-[#fdd835] text-slate-900 text-sm font-bold shadow-md flex items-center gap-2 transition-colors">
            <span>See the hospitals</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
