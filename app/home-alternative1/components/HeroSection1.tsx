"use client";

import React from "react";
import { useCare } from "@/context/CareContext";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export const HeroSection1 = () => {
  const { openIntake } = useCare();

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15 + 0.2,
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1] as any,
      },
    }),
  };

  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex flex-col justify-end pb-20 sm:pb-32 overflow-hidden bg-slate-900">
      {/* â”€â”€ Background Video â”€â”€ */}
      <motion.div 
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0 w-full h-full z-0"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-center"
          aria-hidden="true"
        >
          <source src="/hero-section-journey-video.mp4" type="video/mp4" />
        </video>
        {/* Dark gradient overlay (scrim) */}
        <div 
          className="absolute inset-0 z-10" 
          style={{ background: "linear-gradient(96deg, rgba(8,24,44,.82) 0%, rgba(8,24,44,.76) 30%, rgba(8,24,44,.44) 56%, rgba(8,24,44,.10) 78%, rgba(8,24,44,0) 100%)" }}
        />
      </motion.div>

      {/* â”€â”€ Main Hero Content â”€â”€ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
        <div className="max-w-3xl">
          {/* Main Headline */}
          <motion.h1 
            custom={0} initial="hidden" animate="visible" variants={fadeUpVariants}
            className="text-5xl sm:text-5xl lg:text-6xl lg:leading-[1.1] font-serif text-white mb-8 drop-shadow-sm"
          >
            Best Medical Care &amp; Treatment in India
          </motion.h1>

          {/* Primary Action Buttons */}
          <motion.div 
            custom={3} initial="hidden" animate="visible" variants={fadeUpVariants}
            className="flex flex-wrap items-center gap-4 mt-10"
          >
            <a href="#doctors" className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md text-white text-sm font-semibold tracking-wide uppercase transition-all duration-300 shadow-lg">
              Doctors
            </a>
            <a href="#hospitals" className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md text-white text-sm font-semibold tracking-wide uppercase transition-all duration-300 shadow-lg">
              Hospitals
            </a>
            <a href="#journey" className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md text-white text-sm font-semibold tracking-wide uppercase transition-all duration-300 shadow-lg flex items-center group">
              Journey
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 ml-2">
                &rarr;
              </span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

