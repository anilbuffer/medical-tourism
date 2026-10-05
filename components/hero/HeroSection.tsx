"use client";

import React from "react";

import { useCare } from "@/context/CareContext";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export const HeroSection = () => {
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
    <section className="relative min-h-[90vh] md:min-h-screen flex flex-col justify-center overflow-hidden bg-vedara-deep">
      {/* ── Background Image with Parallax effect ── */}
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
          preload="auto"
          poster="/hero-image.png"
          className="absolute inset-0 w-full h-full object-cover object-center"
          aria-hidden="true"
        >
          <source src="/hero-section-video.mp4" type="video/mp4" />
        </video>
        {/* Refined gradient overlay for deeper contrast and luxury feel */}
        <div className="absolute inset-0 bg-gradient-to-t from-vedara-deep via-vedara-deep/60 to-transparent z-10" />
        <div className="absolute inset-0 bg-black/30 z-10" />
      </motion.div>

      {/* ── Main Hero Content ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full pt-20">
        <div className="max-w-3xl">
          {/* Accent Line */}
          <motion.div 
            custom={0} initial="hidden" animate="visible" variants={fadeUpVariants}
            className="flex items-center gap-4 mb-6"
          >
            <div className="h-[1px] w-12 bg-vedara-gold"></div>
            <span className="text-vedara-gold text-sm md:text-base font-semibold tracking-[0.2em] uppercase">
              International Care Concierge
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1 
            custom={1} initial="hidden" animate="visible" variants={fadeUpVariants}
            className="text-5xl sm:text-5xl lg:text-6xl lg:leading-[1.1] font-serif text-white mb-8 drop-shadow-lg"
          >
            Your treatment journey, handled from start to finish.
          </motion.h1>

          {/* Supporting Narrative */}
          <motion.p 
            custom={2} initial="hidden" animate="visible" variants={fadeUpVariants}
            className="text-lg sm:text-xl text-white/80 font-light leading-relaxed mb-10 max-w-xl drop-shadow-md"
          >
            We help you find the right surgeon and hospital in India, and coordinate everything around your treatment — from the first time a specialist reviews your scans to the day your records are back with your doctor at home.
          </motion.p>

          {/* Primary Action Buttons */}
          <motion.div 
            custom={3} initial="hidden" animate="visible" variants={fadeUpVariants}
            className="flex flex-col sm:flex-row items-start gap-4"
          >
            <Button
              variant="gold"
              size="xl"
              onClick={() => openIntake()}
              className="w-full sm:w-auto text-vedara-deep hover:shadow-glow-indigo transition-all duration-300"
            >
              Start Your Journey
            </Button>
            <Button
              variant="glass"
              size="xl"
              render={<a href="#journey" />}
              className="w-full sm:w-auto group"
            >
              Explore The Experience
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 ml-2">
                &rarr;
              </span>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
