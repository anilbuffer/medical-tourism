"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { useCare } from "@/context/CareContext";
import { SPECIALTIES } from "@/data/mockData";
import {
  Smile,
  Sparkles,
  Eye,
  Activity,
  Baby,
  ArrowRight,
  Clock,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  Pause,
  Play,
} from "lucide-react";

export const SpecialtiesSection = () => {
  const { t, language, openIntake } = useCare();
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const totalItems = SPECIALTIES.length;

  const getSpecialtyIcon = (id: string) => {
    switch (id) {
      case "dental":
        return Smile;
      case "cosmetic":
        return Sparkles;
      case "eye-care":
        return Eye;
      case "orthopedic":
      case "ortho":
        return Activity;
      case "fertility":
      case "women-children":
        return Baby;
      default:
        return Activity;
    }
  };

  const scrollToIndex = useCallback(
    (index: number) => {
      if (!sliderRef.current) return;
      const container = sliderRef.current;
      const children = container.children;
      if (children && children[index]) {
        const target = children[index] as HTMLElement;
        container.scrollTo({
          left: target.offsetLeft - container.offsetLeft,
          behavior: "smooth",
        });
        setActiveIndex(index);
      }
    },
    []
  );

  const handleNext = useCallback(() => {
    const nextIndex = (activeIndex + 1) % totalItems;
    scrollToIndex(nextIndex);
  }, [activeIndex, totalItems, scrollToIndex]);

  const handlePrev = useCallback(() => {
    const prevIndex = (activeIndex - 1 + totalItems) % totalItems;
    scrollToIndex(prevIndex);
  }, [activeIndex, totalItems, scrollToIndex]);

  // Auto slider timer
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      handleNext();
    }, 4200);

    return () => clearInterval(interval);
  }, [isPaused, handleNext]);

  // Sync active index when user scrolls/swipes manually
  const handleScroll = () => {
    if (!sliderRef.current) return;
    const container = sliderRef.current;
    const scrollLeft = Math.abs(container.scrollLeft);
    const card = container.children[0] as HTMLElement | undefined;
    if (card) {
      const cardWidth = card.offsetWidth + 24; // card width + gap
      const index = Math.round(scrollLeft / cardWidth);
      if (index >= 0 && index < totalItems && index !== activeIndex) {
        setActiveIndex(index);
      }
    }
  };

  return (
    <section id="specialties" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Title & Nav Buttons */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-orange-500 mb-2">
              {t.specialties.eyebrow}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0D3B3F] tracking-tight leading-tight">
              {t.specialties.heading}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-500 leading-relaxed">
              {t.specialties.subheading}
            </p>
          </div>

          {/* Navigation Controls: View All + Prev & Next Buttons */}
          <div className="flex items-center gap-4 shrink-0">
            <button
              onClick={() => openIntake()}
              className="inline-flex items-center gap-2 text-xs font-bold text-teal-700 hover:text-teal-800 tracking-wider uppercase group mr-2"
            >
              <span>{t.specialties.viewAll}</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
            </button>

            <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-200/80 shadow-sm">
              <button
                onClick={handlePrev}
                aria-label="Previous Specialty"
                className="w-10 h-10 rounded-xl bg-white hover:bg-teal-600 text-slate-700 hover:text-white border border-slate-200/70 hover:border-teal-600 shadow-sm flex items-center justify-center transition-all duration-200 active:scale-95 group"
              >
                <ChevronLeft className="w-5 h-5 rtl:rotate-180 group-hover:-translate-x-0.5 rtl:group-hover:translate-x-0.5 transition-transform" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next Specialty"
                className="w-10 h-10 rounded-xl bg-white hover:bg-teal-600 text-slate-700 hover:text-white border border-slate-200/70 hover:border-teal-600 shadow-sm flex items-center justify-center transition-all duration-200 active:scale-95 group"
              >
                <ChevronRight className="w-5 h-5 rtl:rotate-180 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Auto Slider Container */}
        <div
          className="relative group/slider"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          {/* Slider Scroll Area */}
          <div
            ref={sliderRef}
            onScroll={handleScroll}
            className="flex gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth pb-6 pt-2 px-1"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {SPECIALTIES.map((spec, index) => {
              const Icon = getSpecialtyIcon(spec.id);
              const isCurrent = activeIndex === index;
              return (
                <div
                  key={spec.id}
                  className={`w-[85vw] sm:w-[78vw] md:w-[calc(33.333%-16px)] lg:w-[389px] shrink-0 snap-start group relative bg-white rounded-3xl overflow-hidden border ${
                    isCurrent ? "border-teal-400 shadow-luxury-hover" : "border-slate-200/80 shadow-card"
                  } hover:border-teal-400 hover:shadow-luxury-hover transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5`}
                >
                  {/* Visual Header */}
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={spec.image}
                      alt={spec.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>

                    {/* Icon badge floating */}
                    <div className="absolute top-4 left-4 w-11 h-11 rounded-2xl bg-white/90 backdrop-blur-md text-teal-700 flex items-center justify-center shadow-lg">
                      <Icon className="w-5 h-5" />
                    </div>

                    {/* Success Rate Pill */}
                    <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{spec.successRate} Success</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-teal-700 transition-colors mb-1.5">
                        {language === "ar" ? spec.nameAr : spec.name}
                      </h3>
                      <p className="text-xs text-teal-700 font-semibold mb-2.5">
                        {language === "ar" ? spec.taglineAr : spec.tagline}
                      </p>
                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                        {language === "ar" ? spec.descriptionAr : spec.description}
                      </p>
                    </div>

                    {/* Procedures Tag Cloud */}
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                        Key Procedures
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {spec.procedures.slice(0, 3).map((proc, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded-lg bg-slate-100 text-slate-700 text-[11px] font-medium"
                          >
                            {proc}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Footer Meta & Action */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div className="text-xs text-slate-500 font-medium flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>Stay: {spec.avgStay}</span>
                      </div>

                      <button
                        onClick={() => openIntake(spec.name)}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 group-hover:text-teal-800"
                      >
                        <span>{t.specialties.explore}</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Floating Next/Prev Side Arrows for Desktop (visible on slider hover) */}
          <button
            onClick={handlePrev}
            aria-label="Previous Specialty"
            className="hidden md:flex absolute top-1/2 -left-4 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 text-slate-800 shadow-xl items-center justify-center opacity-0 group-hover/slider:opacity-100 transition-all duration-300 hover:bg-teal-600 hover:text-white hover:scale-105 active:scale-95"
          >
            <ChevronLeft className="w-6 h-6 rtl:rotate-180" />
          </button>
          <button
            onClick={handleNext}
            aria-label="Next Specialty"
            className="hidden md:flex absolute top-1/2 -right-4 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 text-slate-800 shadow-xl items-center justify-center opacity-0 group-hover/slider:opacity-100 transition-all duration-300 hover:bg-teal-600 hover:text-white hover:scale-105 active:scale-95"
          >
            <ChevronRight className="w-6 h-6 rtl:rotate-180" />
          </button>
        </div>

        {/* Bottom Slider Pagination Dots & Auto-Play Status Indicator */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
          <div className="flex items-center gap-2">
            {SPECIALTIES.map((spec, i) => (
              <button
                key={spec.id}
                onClick={() => scrollToIndex(i)}
                aria-label={`Go to ${spec.name}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  activeIndex === i
                    ? "w-8 bg-teal-600 shadow-sm shadow-teal-600/30"
                    : "w-2.5 bg-slate-200 hover:bg-slate-300"
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
            <span className="font-semibold text-slate-700">
              {activeIndex + 1} / {totalItems}
            </span>
            <span className="w-1 h-1 rounded-full bg-slate-300" />
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-teal-700 transition-colors"
            >
              {isPaused ? (
                <>
                  <Play className="w-3.5 h-3.5 text-teal-600 fill-teal-600" />
                  <span>Resume Auto-play</span>
                </>
              ) : (
                <>
                  <Pause className="w-3.5 h-3.5 text-slate-400" />
                  <span>Auto-sliding (Pause)</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
