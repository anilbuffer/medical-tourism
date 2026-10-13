"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star, Video, Play, Sparkles } from "lucide-react";

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="stories" className="py-16 sm:py-20 lg:py-24 bg-white border-b border-[#DCE5EB]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF5F4] border border-[#087F79]/20 shadow-2xs mb-3.5">
              <span className="w-2 h-2 rounded-full bg-[#087F79] animate-pulse" />
              <span className="text-[#087F79] text-xs font-bold uppercase tracking-wider">
                PATIENT STORIES
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#102B46] tracking-tight leading-tight">
              Real Experiences. Personal Journeys.
            </h2>
            <p className="text-[#627486] text-sm sm:text-base mt-2.5 sm:mt-3 leading-relaxed font-normal">
              Listen to international patients who traveled with Your Medicare Trip for complex surgeries and personal hospital advocacy.
            </p>
          </div>

          <Link
            href="/stories"
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-white hover:bg-[#EAF5F4] text-[#102B46] hover:text-[#087F79] border border-[#DCE5EB] hover:border-[#087F79]/40 font-semibold text-sm transition-all duration-200 shadow-sm hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087F79]"
          >
            <span>Read All Stories</span>
            <ArrowRight className="w-4 h-4 text-[#087F79] transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 1 Split Primary Card + 2 Clean Story Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-stretch">

          {/* Left Column (7 Cols): Primary Featured Story Split Card */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-[#DCE5EB] shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col sm:flex-row group">

            {/* Patient Portrait Photo with Video Overlay */}
            <div className="relative w-full sm:w-1/2 min-h-[280px] sm:min-h-full bg-slate-100 overflow-hidden shrink-0">
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=700"
                alt="Michael K. - Bilateral Knee Replacement Patient"
                fill
                sizes="(max-width: 640px) 100vw, 350px"
                className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

              {/* Top-Left Badge: Video Coming Soon */}
              <div className="absolute top-3.5 left-3.5 z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#102B46]/90 backdrop-blur-md text-white text-xs font-semibold border border-white/20 shadow-md">
                  <span className="w-2 h-2 rounded-full bg-[#2ECDC5] animate-pulse" />
                  <Video className="w-3.5 h-3.5 text-[#2ECDC5]" />
                  <span>Video coming soon</span>
                </span>
              </div>

              {/* Center Play Button Watermark & Indicator */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center z-10 pointer-events-none">
                <div className="w-14 h-14 rounded-full bg-white/95 backdrop-blur-md flex items-center justify-center text-[#102B46] shadow-xl border border-white/40 transition-transform duration-300 group-hover:scale-110">
                  <Play className="w-6 h-6 fill-[#102B46] text-[#102B46] translate-x-0.5" />
                </div>
                <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-xs font-medium border border-white/10 shadow-sm">
                  <Video className="w-3 h-3 text-[#2ECDC5]" />
                  <span>Patient Interview &bull; Coming Soon</span>
                </div>
              </div>

              {/* Bottom Mobile Tag */}
              <div className="absolute bottom-3 left-3 right-3 z-10 text-white sm:hidden">
                <p className="text-xs font-semibold text-slate-200">Michael K. &bull; United Kingdom</p>
              </div>
            </div>

            {/* Dark Navy Quote Box */}
            <div className="w-full sm:w-1/2 bg-[#102B46] p-6 sm:p-7 text-white flex flex-col justify-between">
              <div>
                {/* Header Row with Rating and Video Coming Soon Pill */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-1 text-[#DDA34A]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>

                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/10 border border-white/15 text-[11px] font-semibold text-[#2ECDC5]">
                    <Video className="w-3 h-3 text-[#2ECDC5]" />
                    <span>[ Video coming soon ]</span>
                  </span>
                </div>

                <blockquote className="text-sm sm:text-base text-slate-100 italic leading-relaxed">
                  &ldquo;The care coordination was beyond my expectations. Having a dedicated coordinator meet me at Delhi airport and stay with me throughout made all the difference.&rdquo;
                </blockquote>
              </div>

              <div className="mt-6 pt-4 border-t border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-white text-base">
                      Michael K.
                    </p>
                    <p className="text-xs text-slate-300 mt-0.5">
                      United Kingdom &bull; Bilateral Knee Replacement
                    </p>
                    <p className="text-[11px] text-[#2ECDC5] mt-1 font-medium">
                      Fortis Hospital Mohali
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column (5 Cols): 2 Story Cards */}
          <div className="lg:col-span-5 flex flex-col gap-5 justify-between">
            {/* Story 1 */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#DCE5EB] shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-[#087F79] uppercase tracking-wider">
                    CARDIAC CARE
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#EAF5F4] border border-[#087F79]/20 text-[#087F79] text-[11px] font-semibold">
                      <Video className="w-3 h-3 text-[#087F79]" />
                      <span>[ Video coming soon ]</span>
                    </span>
                    <div className="flex items-center gap-0.5 text-[#DDA34A]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>

                <h3 className="font-bold text-base text-[#102B46] leading-snug group-hover:text-[#087F79] transition-colors">
                  Fatima Al-Mansoor &bull; Dubai, UAE
                </h3>
                <p className="text-xs sm:text-sm text-[#627486] mt-2 leading-relaxed">
                  &ldquo;From medical visa paperwork to direct admission at the cardiac unit, our personal manager handled everything seamlessly.&rdquo;
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#DCE5EB] flex items-center justify-between">
                <span className="text-xs text-[#627486]">Minimally Invasive CABG</span>
                <Link
                  href="/stories"
                  className="text-xs font-semibold text-[#087F79] hover:text-[#102B46] inline-flex items-center gap-1"
                >
                  <span>Read story</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Story 2 */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#DCE5EB] shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-[#087F79] uppercase tracking-wider">
                    SPINE SURGERY
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#EAF5F4] border border-[#087F79]/20 text-[#087F79] text-[11px] font-semibold">
                      <Video className="w-3 h-3 text-[#087F79]" />
                      <span>[ Video coming soon ]</span>
                    </span>
                    <div className="flex items-center gap-0.5 text-[#DDA34A]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>

                <h3 className="font-bold text-base text-[#102B46] leading-snug group-hover:text-[#087F79] transition-colors">
                  David Miller &bull; California, USA
                </h3>
                <p className="text-xs sm:text-sm text-[#627486] mt-2 leading-relaxed">
                  &ldquo;Saved more than $50,000 compared to private quotes in the US, with world-class surgical facilities and outstanding recovery staff.&rdquo;
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#DCE5EB] flex items-center justify-between">
                <span className="text-xs text-[#627486]">Robotic Spinal Decompression</span>
                <Link
                  href="/stories"
                  className="text-xs font-semibold text-[#087F79] hover:text-[#102B46] inline-flex items-center gap-1"
                >
                  <span>Read story</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

