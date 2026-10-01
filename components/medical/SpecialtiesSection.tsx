"use client";

import React from "react";
import Image from "next/image";
import { CommonCarousel } from "@/components/ui/common-carousel";
import { motion } from "framer-motion";

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

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as any } },
  };

  return (
    <section className="py-20 sm:py-32 bg-vedara-offwhite overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
          className="text-center sm:text-left mb-16 max-w-2xl"
        >
          <div className="flex items-center justify-center sm:justify-start gap-4 mb-4">
            <div className="h-[1px] w-8 bg-vedara-gold"></div>
            <p className="text-vedara-gold font-bold text-xs uppercase tracking-wider">
              OUR SPECIALTIES
            </p>
          </div>
          <h2 className="text-4xl sm:text-5xl font-serif text-vedara-deep leading-tight">
            Comprehensive care. <br className="hidden sm:block" />
            <span className="italic font-light">World-class expertise.</span>
          </h2>
        </motion.div>

        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}
        >
          <CommonCarousel
            itemClassName="pl-6 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
            className="w-full max-w-[100vw]"
          >
            {specialties.map((spec, idx) => (
              <div
                key={idx}
                className="group relative rounded-2xl overflow-hidden aspect-[4/5] min-h-[400px] shadow-lg cursor-pointer bg-slate-900 h-full border border-black/5"
              >
                <Image
                  src={spec.image}
                  alt={spec.title}
                  fill
                  className="object-cover group-hover:scale-110 group-hover:rotate-1 transition-all duration-700 ease-out"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-vedara-deep/90 via-vedara-deep/20 to-transparent transition-opacity duration-500"></div>
                
                <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-white font-serif text-2xl mb-2 leading-snug">
                    {spec.title}
                  </h3>
                  <p className="text-white/80 font-light text-sm mb-5 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {spec.subtitle}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {spec.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] uppercase tracking-wider font-medium rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </CommonCarousel>
        </motion.div>
      </div>
    </section>
  );
};
