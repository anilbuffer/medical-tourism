"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export const HospitalsSection = () => {
  const hospitals = [
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

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  return (
    <section className="py-20 sm:py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-[1px] w-8 bg-vedara-gold"></div>
            <p className="text-vedara-gold font-bold text-xs uppercase tracking-widest">
              BEING STRAIGHT WITH YOU
            </p>
            <div className="h-[1px] w-8 bg-vedara-gold"></div>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-vedara-deep mb-8 leading-tight">
            We&apos;re new. <br />
            <span className="italic font-light">Our hospitals are not.</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-500 font-light leading-relaxed mb-6">
            You won&apos;t find hundreds of reviews for us, because we started this year. What you can verify today is every hospital we work with — when it was founded, what it&apos;s accredited to, when that accreditation expires, and how many of your procedure it does each year.
          </p>
          <p className="text-base sm:text-lg text-slate-500 font-light leading-relaxed">
            That&apos;s the record that matters. We&apos;re the people who get you to it and stay beside you while you&apos;re there.
          </p>
        </motion.div>

        {/* Hospital Cards */}
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10"
        >
          {hospitals.map((hosp, idx) => (
            <motion.div key={idx} variants={fadeUp}>
              <Card
                className="bg-vedara-offwhite rounded-2xl overflow-hidden shadow-sm border-none flex flex-col h-full group hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
              >
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-white flex items-center justify-center p-6">
                  <Image
                    src={hosp.image}
                    alt={hosp.name}
                    fill
                    className="object-contain p-8 group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                
                <CardContent className="p-8 flex flex-col flex-1 pb-6">
                  <CardTitle className="font-serif text-2xl text-vedara-deep leading-tight mb-4">
                    {hosp.name}
                  </CardTitle>
                  
                  <div className="flex items-start gap-3 text-sm text-slate-500 mb-4 font-light">
                    <MapPin className="w-4 h-4 text-vedara-gold shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{hosp.location}</span>
                  </div>
                </CardContent>

                <CardFooter className="p-8 pt-0 mt-auto">
                  <Button
                    variant="link"
                    className="w-full text-sm font-semibold tracking-wide text-vedara-deep hover:text-vedara-gold p-0 justify-between group-hover:px-2 transition-all duration-300"
                    render={<Link href="/hospitals" />}
                  >
                      <span>View Hospital Profile</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="mt-16 flex justify-center"
        >
          <Button
            variant="outlineNavy"
            size="xl"
            render={<Link href="/hospitals" />}
            className="rounded-xl"
          >
              See the full hospital network
          </Button>
        </motion.div>

      </div>
    </section>
  );
};
