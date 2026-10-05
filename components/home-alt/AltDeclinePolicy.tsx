"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldAlert, Check, XCircle, Stethoscope, FileText, HeartHandshake, Award } from "lucide-react";

export const AltDeclinePolicy = () => {
  return (
    <section className="py-24 sm:py-32 bg-gradient-to-b from-[#040E2A] via-[#091A3E] to-[#05122F] relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Ethical Statement Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative rounded-3xl p-8 sm:p-14 md:p-16 bg-gradient-to-b from-[#0B1E45]/95 via-[#071638]/95 to-[#040D26]/95 text-white border-2 border-vedara-gold/50 shadow-[0_0_80px_rgba(201,162,74,0.18)] text-center overflow-hidden"
        >
          {/* Decorative Subtle Radial Golden Aura */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-vedara-gold/20 rounded-full blur-[110px] pointer-events-none" />

          {/* Badge */}
          <div className="relative z-10 flex items-center justify-center gap-4 mb-8">
            <div className="h-[1px] w-12 bg-vedara-gold" />
            <p className="text-vedara-gold font-bold text-xs uppercase tracking-[0.3em]">
              WHAT WE WON&apos;T DO
            </p>
            <div className="h-[1px] w-12 bg-vedara-gold" />
          </div>

          {/* Stately Shield Icon with Golden Ring */}
          <div className="relative z-10 mx-auto w-20 h-20 rounded-3xl bg-white/5 border border-vedara-gold/50 flex items-center justify-center text-vedara-gold mb-8 shadow-glow">
            <ShieldAlert className="w-10 h-10" />
          </div>

          {/* Verbatim Headline */}
          <h2 className="relative z-10 text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-serif text-white leading-[1.2] mb-8 max-w-4xl mx-auto">
            If we believe a procedure isn&apos;t right for you, or we can&apos;t ensure the absolute highest standard of care, we simply won&apos;t arrange it.
          </h2>

          {/* Verbatim Body Copy */}
          <p className="relative z-10 text-lg sm:text-2xl font-light text-slate-300 max-w-3xl mx-auto leading-relaxed mb-12">
            We are not a booking agency. We are a clinical concierge. Our reputation rests entirely on your outcome.
          </p>

          {/* Three Pillar Guarantees */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t border-white/15 text-left">
            <div className="bg-white/[0.06] p-6 rounded-2xl border border-white/10 hover:border-vedara-cyan/40 transition-colors">
              <div className="flex items-center gap-3 mb-2.5">
                <div className="w-8 h-8 rounded-lg bg-vedara-cyan/20 flex items-center justify-center text-vedara-cyan">
                  <Stethoscope className="w-4.5 h-4.5" />
                </div>
                <h4 className="text-sm font-bold text-white">Independent Doctor Review</h4>
              </div>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                A non-operating clinician reviews your imaging first to independently confirm clinical indication.
              </p>
            </div>

            <div className="bg-white/[0.06] p-6 rounded-2xl border border-white/10 hover:border-vedara-gold/40 transition-colors">
              <div className="flex items-center gap-3 mb-2.5">
                <div className="w-8 h-8 rounded-lg bg-vedara-gold/20 flex items-center justify-center text-vedara-gold">
                  <FileText className="w-4.5 h-4.5" />
                </div>
                <h4 className="text-sm font-bold text-white">Zero Hidden Commissions</h4>
              </div>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Hospital invoices are paid directly with 100% itemized transparency. No inflated margins.
              </p>
            </div>

            <div className="bg-white/[0.06] p-6 rounded-2xl border border-white/10 hover:border-vedara-cyan/40 transition-colors">
              <div className="flex items-center gap-3 mb-2.5">
                <div className="w-8 h-8 rounded-lg bg-vedara-cyan/20 flex items-center justify-center text-vedara-cyan">
                  <HeartHandshake className="w-4.5 h-4.5" />
                </div>
                <h4 className="text-sm font-bold text-white">Safe Return Handover</h4>
              </div>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                We guarantee comprehensive translated surgical documentation for your doctor at home.
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
