"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Play, Star, Quote, ShieldCheck } from "lucide-react";
import { CommonCarousel } from "@/components/ui/common-carousel";

export const TestimonialsSection = () => {
  const testimonials = [
    {
      type: "text",
      name: "Kane Wilson",
      country: "Ghana",
      flag: "🇬🇭",
      procedure: "Bilateral Knee Replacement",
      title: "They handled every single detail from day one.",
      content: "From the first MRI review to our airport arrival in Mohali, everything was immaculate. Dr. Singla was incredible, and our coordinator was with us every single morning.",
      date: "August 2026",
      rating: 5,
    },
    {
      type: "video",
      name: "Daniel Okafor",
      country: "United Kingdom",
      flag: "🇬🇧",
      procedure: "Robotic Hip Arthroplasty",
      thumbnail: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600",
      quote: "Skipped an 18-month NHS wait and saved over £14,000. Walking independently in two weeks.",
    },
    {
      type: "text",
      name: "Sarah Mwangi",
      country: "Kenya",
      flag: "🇰🇪",
      procedure: "IVF with ICSI & PGT-A",
      title: "We never felt alone for a single moment.",
      content: "The hospital and embryology laboratory were world-class. Having someone coordinate our appointments, transfers, and serviced apartment took away all the stress.",
      date: "September 2026",
      rating: 5,
    },
    {
      type: "text",
      name: "Arjun & Priya Mehta",
      country: "Australia",
      flag: "🇦🇺",
      procedure: "Full-Arch Dental Implants",
      title: "The written price quote was 100% accurate.",
      content: "We received a fixed itemised treatment estimate before booking our flights. There were zero hidden surprises. The Swiss zirconia smile is phenomenal.",
      date: "July 2026",
      rating: 5,
    },
    {
      type: "video",
      name: "Lilian Omondi",
      country: "Kenya",
      flag: "🇰🇪",
      procedure: "Contoura Vision Lasik",
      thumbnail: "https://images.unsplash.com/photo-1531123897727-8f129e1bfa82?auto=format&fit=crop&q=80&w=600",
      quote: "Blade-free surgery was painless. Restored 20/20 vision the next morning.",
    }
  ];

  const carouselItems = testimonials.map((t, idx) => (
    <div key={idx} className="bg-white rounded-3xl p-6 sm:p-7 shadow-lg border border-[#e2eaeb] flex flex-col justify-between relative overflow-hidden group h-full min-h-[320px]">
      {t.type === "video" ? (
        <>
          <div className="absolute inset-0 bg-[#04272a] z-0">
            <Image src={t.thumbnail!} alt={t.name} fill className="object-cover opacity-50 group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#04272a] via-[#04272a]/60 to-transparent" />
          </div>
          
          <div className="relative z-10 flex flex-col h-full justify-between text-white">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold">
                {t.flag} {t.country}
              </span>
              <span className="px-2.5 py-1 rounded-full bg-[#e39b2d] text-slate-950 text-[10px] font-heading font-bold uppercase">
                Video Story
              </span>
            </div>

            <div className="my-auto text-center py-6">
              <div className="w-14 h-14 rounded-full bg-[#e39b2d] text-slate-950 flex items-center justify-center mx-auto mb-3 shadow-xl shadow-[#e39b2d]/30 group-hover:scale-110 transition-transform">
                <Play className="w-6 h-6 fill-slate-950 ml-0.5" />
              </div>
              <p className="text-xs sm:text-sm italic font-normal text-slate-200 line-clamp-2 px-2">
                &ldquo;{t.quote}&rdquo;
              </p>
            </div>

            <div className="pt-3 border-t border-white/20">
              <div className="font-heading font-bold text-base text-white">{t.name}</div>
              <div className="text-xs text-[#e39b2d] font-medium">{t.procedure}</div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col h-full justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                {t.flag} {t.country}
              </span>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#e39b2d] text-[#e39b2d]" />
                ))}
              </div>
            </div>

            <h4 className="font-heading font-bold text-base sm:text-lg text-slate-900 mb-2 leading-snug">
              &ldquo;{t.title}&rdquo;
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed mb-4">
              {t.content}
            </p>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <div>
              <div className="font-heading font-bold text-sm text-slate-900">{t.name}</div>
              <div className="text-xs text-[#0b5d63] font-medium">{t.procedure}</div>
            </div>
            <span className="text-[11px] text-slate-400 font-medium">{t.date}</span>
          </div>
        </div>
      )}
    </div>
  ));

  return (
    <section id="stories" className="py-16 sm:py-24 bg-[#f8fafb] border-t border-[#e2eaeb] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f0f8f9] border border-[#dbeff0] text-[#0b5d63] text-xs font-heading font-bold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-[#0b5d63]" />
            <span>PATIENT VOICES & VIDEO EXPERIENCES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-slate-900 mb-4 leading-tight">
            Trusted by Patients Across 45+ Countries
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            Real experiences from patients who travelled to India for quaternary surgery with our clinical concierge team.
          </p>
        </div>

        {/* Carousel */}
        <CommonCarousel
          opts={{ align: "start", loop: false }}
          className="w-full"
          itemClassName="md:basis-1/2 lg:basis-1/3 pl-4 sm:pl-6"
        >
          {carouselItems}
        </CommonCarousel>

      </div>
    </section>
  );
};
