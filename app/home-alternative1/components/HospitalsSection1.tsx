"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CommonCarousel } from "@/components/ui/common-carousel";

export const HospitalsSection1 = () => {
  const hospitals = [
    {
      name: "Fortis",
      location: "Mohali",
      image: "/fortis-image.png",
    },
    {
      name: "Max Hospital",
      location: "Chandigarh Road in Phase 6, Sahibzada Ajit Singh Nagar (Mohali), Punjab",
      image: "/max-hospital.jpg",
    },
    {
      name: "Profile Cosmetic Surgery",
      location: "Ludhiana - Dr. Vikas Gupta, Surgeon",
      image: "/profileaestheticsurgery.png",
    },
    {
      name: "Sangam Netralaya",
      location: "Ajitgarh, Punjab",
      image: "/sangam-netralaya.webp",
    },
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as any } },
  };

  return (
    <section className="py-12 sm:py-16 bg-white relative border-t border-[#E4E9ED]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-slate-900 mb-6 leading-tight">
            Featured Hospitals
          </h2>
          <p className="text-base sm:text-lg text-slate-500 font-light leading-relaxed">
            World-class hospitals handpicked for quality, accreditation, and patient outcomes
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
                className="group relative h-[400px] w-full overflow-hidden rounded-2xl border-0 shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer mx-auto"
              >
                <Image
                  src={hosp.image}
                  alt={hosp.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                {/* Gradient overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent transition-opacity duration-300" />
                
                {/* Content at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 flex flex-col justify-end">
                  <h3 className="font-serif text-2xl text-white leading-tight mb-3">
                    {hosp.name}
                  </h3>
                  <div className="flex items-start gap-3 text-sm text-white/90 font-light mb-4">
                    <MapPin className="w-4 h-4 text-white shrink-0 mt-0.5" />
                    <span className="leading-relaxed drop-shadow-md line-clamp-2">{hosp.location}</span>
                  </div>
                  
                  <div className="flex items-center text-sm font-semibold tracking-wide text-white group-hover:text-[#007FFF] transition-colors duration-300">
                    <span>View Hospital Profile</span>
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
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
          className="mt-16 flex justify-center"
        >
          <Button
            variant="outline"
            size="xl"
            render={<Link href="/hospitals" />}
            className="rounded-xl border-[#0070E0] text-[#0070E0] hover:bg-[#0070E0] hover:text-white transition-colors"
          >
              See the full hospital network
          </Button>
        </motion.div>

      </div>
    </section>
  );
};
