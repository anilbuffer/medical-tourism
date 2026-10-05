"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Play, Star, CheckCircle, Quote, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export const AltTestimonialsSection = () => {
  const [playingVideo, setPlayingVideo] = useState(false);

  const testimonials = [
    {
      type: "text",
      name: "Kane Wilson",
      country: "Ghana",
      flag: "🇬🇭",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
      procedure: "Bilateral Knee Replacement",
      title: "They handled everything from day one.",
      content:
        "From the first report review to our arrival in India, everything was clear and organised. We always knew what was happening next.",
      date: "10/09/2026",
    },
    {
      type: "video",
      name: "Daniel Okafor",
      country: "UK",
      flag: "🇬🇧",
      procedure: "Cardiac Valve Surgery",
      title: "Saved over £45,000 with private NHS-level care",
      thumbnail: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800",
    },
    {
      type: "text",
      name: "Sarah Mwangi",
      country: "Kenya",
      flag: "🇰🇪",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
      procedure: "IVF with Genetic Screening",
      title: "We never felt alone.",
      content:
        "The hospital was excellent, but having someone coordinate the appointments, transfers and accommodation made the whole experience much easier for our family.",
      date: "10/09/2026",
    },
    {
      type: "text",
      name: "Arjun Mehta",
      country: "India",
      flag: "🇮🇳",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400",
      procedure: "Robotic Hip Arthroplasty",
      title: "The price was clear before we travelled.",
      content:
        "We received a written treatment estimate before booking our flights. There were no surprises about what was included or what we needed to arrange ourselves.",
      date: "10/09/2026",
    },
  ];

  return (
    <section id="testimonials" className="py-24 sm:py-32 bg-gradient-to-b from-[#05112A] via-[#08193D] to-[#040D26] text-white relative overflow-hidden">
      {/* Decorative ambient background glows */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.3, 0.15]
        }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-vedara-cyan/15 rounded-full blur-[160px] pointer-events-none" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-[2px] w-10 bg-vedara-gold" />
            <p className="text-vedara-gold font-bold text-xs uppercase tracking-[0.25em]">
              TESTIMONIALS
            </p>
            <div className="h-[2px] w-10 bg-vedara-gold" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white leading-tight">
            Patient experiences from across the world
          </h2>
          <p className="text-slate-300 text-sm sm:text-base font-light mt-3">
            Real families sharing their clinical outcomes, concierge experience, and savings.
          </p>
        </div>

        {/* Testimonials Grid with Hover Lift & Glow */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.35 }}
              className="bg-gradient-to-b from-[#0A1630]/95 via-[#061024]/95 to-[#020713]/95 rounded-3xl p-7 shadow-2xl border-2 border-white/15 hover:border-vedara-cyan/50 flex flex-col justify-between relative overflow-hidden group transition-all duration-300"
            >
              {t.type === "video" ? (
                <>
                  <div className="absolute inset-0 bg-slate-950 z-0">
                    <Image
                      src={t.thumbnail}
                      alt={t.name}
                      fill
                      className="object-cover opacity-65 group-hover:scale-105 group-hover:opacity-75 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020713] via-[#020713]/40 to-transparent" />
                  </div>

                  <div className="relative z-10 flex flex-col h-full min-h-[340px] justify-between">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-xs shadow-xs">
                          {t.flag}
                        </div>
                        <span className="text-white font-bold text-sm shadow-sm">{t.name}</span>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-bold text-emerald-300 uppercase tracking-wider border border-white/20">
                        Video Story
                      </span>
                    </div>

                    <div 
                      onClick={() => setPlayingVideo(true)}
                      className="self-center my-auto relative flex items-center justify-center cursor-pointer group/play"
                    >
                      {/* Pulsing Ripple Effect */}
                      <span className="animate-ping absolute inline-flex h-16 w-16 rounded-full bg-vedara-gold opacity-70" />
                      <div className="w-16 h-16 rounded-full bg-vedara-gold text-vedara-deep flex items-center justify-center shadow-lg shadow-black/60 group-hover/play:scale-110 transition-transform">
                        <Play className="w-7 h-7 fill-current ml-1" />
                      </div>
                    </div>

                    <div className="mt-auto">
                      <div className="text-xs text-vedara-cyan font-bold mb-1">{t.procedure}</div>
                      <div className="text-white font-serif text-base font-bold leading-snug">
                        &ldquo;{t.title}&rdquo;
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    {/* Header Row */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-full overflow-hidden bg-slate-900 border-2 border-vedara-cyan/40">
                          {t.avatar ? (
                            <Image src={t.avatar} alt={t.name} fill className="object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-xs font-bold text-white">
                              {t.name[0]}
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h4 className="font-bold text-white text-sm leading-none">{t.name}</h4>
                            <span className="text-xs">{t.flag}</span>
                          </div>
                          <span className="text-[11px] text-vedara-cyan font-semibold">{t.procedure}</span>
                        </div>
                      </div>
                    </div>

                    {/* Stars with Glow */}
                    <div className="flex items-center gap-1 text-amber-300 mb-3">
                      {[...Array(5)].map((_, sIdx) => (
                        <Star key={sIdx} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>

                    {/* Verbatim Title */}
                    <h3 className="font-serif font-bold text-base text-white mb-3 leading-snug group-hover:text-amber-300 transition-colors">
                      &quot;{t.title}&quot;
                    </h3>

                    {/* Verbatim Content */}
                    <p className="text-slate-300 text-xs sm:text-sm font-light leading-relaxed mb-6">
                      {t.content}
                    </p>
                  </div>

                  {/* Date & Verified Badge */}
                  <div className="pt-4 border-t border-white/15 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                    <span className="flex items-center gap-1 text-emerald-400 font-bold">
                      <CheckCircle className="w-3.5 h-3.5" />
                      Verified Patient
                    </span>
                    <span>{t.date}</span>
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 flex justify-center">
          <button
            type="button"
            className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-vedara-gold transition-colors group cursor-pointer"
          >
            <span>View more stories</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};
