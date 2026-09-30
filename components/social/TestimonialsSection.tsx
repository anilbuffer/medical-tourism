"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Play } from "lucide-react";

export const TestimonialsSection = () => {
  const testimonials = [
    {
      type: "text",
      name: "Kane Wilson",
      country: "Ghana",
      title: "They handled everything from day one.",
      content: "From the first report review to our arrival in India, everything was clear and organised. We always knew what was happening next.",
      date: "10/09/2026"
    },
    {
      type: "video",
      name: "Daniel Okafor",
      country: "UK",
      thumbnail: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400"
    },
    {
      type: "text",
      name: "Sarah Mwangi",
      country: "Kenya",
      title: "We never felt alone.",
      content: "The hospital was excellent, but having someone coordinate the appointments, transfers and accommodation made the whole experience much easier for our family.",
      date: "10/09/2026"
    },
    {
      type: "text",
      name: "Arjun Mehta",
      country: "India",
      title: "The price was clear before we travelled.",
      content: "We received a written treatment estimate before booking our flights. There were no surprises about what was included or what we needed to arrange ourselves.",
      date: "10/09/2026"
    }
  ];

  return (
    <section className="py-12 sm:py-16 bg-[#f8f9fa]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[#a58d34] font-bold text-xs uppercase tracking-widest mb-3">
            TESTIMONIALS
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F1340]">
            Patient experiences from across the world
          </h2>
        </div>

        {/* Masonry/Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-6 shadow-md border border-slate-100 flex flex-col relative overflow-hidden group">
              {t.type === "video" ? (
                <>
                  <div className="absolute inset-0 bg-slate-900 z-0">
                    <Image src={t.thumbnail} alt={t.name} fill className="object-cover opacity-60" />
                  </div>
                  <div className="relative z-10 flex flex-col h-full min-h-[300px]">
                    <div className="flex items-center gap-2 mb-auto">
                      <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-xs">🇬🇧</div>
                      <span className="text-white font-bold text-sm shadow-sm">{t.name}</span>
                    </div>
                    <div className="self-center my-auto w-14 h-14 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center text-white cursor-pointer hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 fill-current" />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs">
                      {t.country === "Ghana" ? "🇬🇭" : t.country === "Kenya" ? "🇰🇪" : "🇮🇳"}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{t.name}</h4>
                    </div>
                  </div>
                  <h3 className="font-bold text-lg text-slate-800 mb-4 leading-tight">
                    &quot;{t.title}&quot;
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1">
                    {t.content}
                  </p>
                  <div className="text-xs text-slate-400 font-medium">
                    {t.date}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA - Text Link */}
        <div className="mt-12 flex justify-center">
          <button className="inline-flex items-center gap-2 text-sm font-bold text-[#0F1340] hover:text-[#C9A24A] transition-colors group cursor-pointer">
            <span>View more stories</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};
