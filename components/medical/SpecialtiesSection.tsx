"use client";

import React from "react";
import Image from "next/image";

export const SpecialtiesSection = () => {
  const specialties = [
    {
      title: "Blood & marrow transplant",
      subtitle: "Life-saving care for blood disorders",
      tags: ["Transplant", "Haematology", "Immunology"],
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800",
    },
    {
      title: "Kidney & liver transplant",
      subtitle: "Restoring health, rebuilding lives",
      tags: ["Transplant", "Nephrology", "Hepatology"],
      image: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=800",
    },
    {
      title: "Cancer care",
      subtitle: "Advanced treatment. Better outcomes.",
      tags: ["Oncology", "Immunotherapy", "Radiation"],
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800",
    },
    {
      title: "Joint replacement & spine",
      subtitle: "Move better. Live fuller.",
      tags: ["Spine", "Orthopaedics", "Neurology"],
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800",
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-vedara-offwhite pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center sm:text-left mb-10">
          <p className="text-vedara-gold-muted font-bold text-xs uppercase tracking-wider mb-2">
            OUR SPECIALTIES
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-vedara-deep">
            Comprehensive care. World-class expertise.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {specialties.map((spec, idx) => (
            <div
              key={idx}
              className="group relative rounded-3xl overflow-hidden aspect-[4/5] min-h-[360px] shadow-lg cursor-pointer bg-slate-900"
            >
              <Image
                src={spec.image}
                alt={spec.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
              {/* Unified dark gradient overlay across all four cards for 100% legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark-1 via-dark-1/60 to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end">
                <h3 className="text-white font-bold text-xl mb-1 leading-snug">
                  {spec.title}
                </h3>
                <p className="text-slate-300 text-sm mb-4 line-clamp-1">
                  {spec.subtitle}
                </p>
                
                <div className="flex flex-wrap gap-1.5">
                  {spec.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 bg-white/15 backdrop-blur-md border border-white/20 text-white text-[10px] font-semibold rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
