"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldAlert, CheckCircle, ShieldCheck } from "lucide-react";

export const DeclinePolicy = () => {
  return (
    <section className="py-16 sm:py-24 bg-white border-t border-[#e2eaeb] font-sans">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-[#f8fafb] rounded-3xl p-8 sm:p-14 border border-slate-200/80 shadow-md"
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-[#0b5d63]" />
            <p className="text-[#0b5d63] font-heading font-semibold text-xs uppercase tracking-[0.2em] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#0b5d63]" />
              <span>CLINICAL INTEGRITY GUARANTEE</span>
            </p>
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-extrabold text-slate-900 leading-[1.2] mb-6 max-w-4xl mx-auto">
            If we believe a procedure isn&apos;t right for you, or cannot ensure the highest standard of care, we simply won&apos;t arrange it.
          </h2>
          
          <p className="text-base sm:text-lg font-normal text-slate-600 max-w-3xl mx-auto leading-relaxed mb-8">
            We are not a booking agency or medical broker. We are an international clinical concierge. Our reputation rests entirely on your clinical outcome and long-term wellbeing.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3.5 text-xs font-semibold text-slate-800">
            <span className="px-4 py-2.5 rounded-xl bg-white border border-slate-200/80 shadow-sm flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#0b5d63]" />
              Independent Senior Specialist Review
            </span>
            <span className="px-4 py-2.5 rounded-xl bg-white border border-slate-200/80 shadow-sm flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#0b5d63]" />
              Zero Financial Pressure or Booking Quotas
            </span>
            <span className="px-4 py-2.5 rounded-xl bg-white border border-slate-200/80 shadow-sm flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#0b5d63]" />
              Direct Communication With Your Home Physician
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
