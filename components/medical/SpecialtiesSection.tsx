"use client";

import React from "react";
import Image from "next/image";
import { CommonCarousel } from "@/components/ui/common-carousel";

export const SpecialtiesSection = () => {
  const specialties = [
    {
      title: "Dentistry",
      subtitle: "Comprehensive dental care & smile restoration",
      tags: ["Implants", "Cosmetic", "Orthodontics"],
      image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=800",
    },
    {
      title: "Orthopaedics & Joint Replacement",
      subtitle: "Move better. Live fuller.",
      tags: ["Joints", "Spine", "Sports Medicine"],
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800",
    },
    {
      title: "IVF & Fertility",
      subtitle: "Building families with advanced care",
      tags: ["IVF", "Reproductive", "Maternity"],
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800",
    },
    {
      title: "Cosmetic Surgery",
      subtitle: "Enhancing natural beauty & confidence",
      tags: ["Aesthetics", "Plastic Surgery", "Reconstructive"],
      image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=800",
    },
    {
      title: "Ophthalmology",
      subtitle: "Advanced eye care & vision correction",
      tags: ["Lasik", "Cataract", "Retina"],
      image: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&q=80&w=800",
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-vedara-offwhite pt-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center sm:text-left mb-10">
          <p className="text-vedara-gold-muted font-bold text-xs uppercase tracking-wider mb-2">
            OUR SPECIALTIES
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-vedara-deep">
            Comprehensive care. World-class expertise.
          </h2>
        </div>

        <CommonCarousel
          itemClassName="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
          className="w-full max-w-[100vw]"
        >
          {specialties.map((spec, idx) => (
            <div
              key={idx}
              className="group relative rounded-3xl overflow-hidden aspect-[4/5] min-h-[360px] shadow-lg cursor-pointer bg-slate-900 h-full"
            >
              <Image
                src={spec.image}
                alt={spec.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
              {/* Unified dark gradient overlay across all cards for 100% legibility */}
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
        </CommonCarousel>
      </div>
    </section>
  );
};
