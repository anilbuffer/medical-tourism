"use client";

import React from "react";
import { motion } from "framer-motion";

export const DeclinePolicy = () => {
  return (
    <section className="py-24 sm:py-32 bg-vedara-offwhite border-t border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-[1px] w-12 bg-vedara-gold"></div>
            <p className="text-vedara-gold font-bold text-xs uppercase tracking-widest">
              WHAT WE WON'T DO
            </p>
            <div className="h-[1px] w-12 bg-vedara-gold"></div>
          </div>
          
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-vedara-deep leading-[1.15] mb-10 max-w-4xl mx-auto">
            If we believe a procedure isn't right for you, or we can't ensure the absolute highest standard of care, we simply won't arrange it.
          </h2>
          
          <p className="text-xl sm:text-2xl font-light text-slate-600 max-w-3xl mx-auto leading-relaxed">
            We are not a booking agency. We are a clinical concierge. Our reputation rests entirely on your outcome.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
