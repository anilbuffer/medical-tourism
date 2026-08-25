"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { useCare } from "@/context/CareContext";
import { DOCTORS } from "@/data/mockData";
import {
  Star,
  MapPin,
  Building,
  Video,
  Globe,
  ChevronRight,
  ChevronLeft,
  Pause,
  Play,
} from "lucide-react";

export const DoctorsSection = () => {
  const { t, language, openDoctorModal, openIntake } = useCare();
  const [activeSpecialty, setActiveSpecialty] = useState("All");
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const specialtiesList = [
    "All",
    "Dental Implants",
    "Cosmetic & Aesthetic",
    "Ophthalmology / Eye Care",
    "Orthopedic Procedures",
    "Fertility / IVF",
  ];

  const filteredDoctors =
    activeSpecialty === "All"
      ? DOCTORS
      : DOCTORS.filter((d) => d.specialty === activeSpecialty);

  const totalItems = filteredDoctors.length;

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
    if (totalItems <= 1) return;
    const nextIndex = (activeIndex + 1) % totalItems;
    scrollToIndex(nextIndex);
  }, [activeIndex, totalItems, scrollToIndex]);

  const handlePrev = useCallback(() => {
    if (totalItems <= 1) return;
    const prevIndex = (activeIndex - 1 + totalItems) % totalItems;
    scrollToIndex(prevIndex);
  }, [activeIndex, totalItems, scrollToIndex]);

  // Reset index when specialty filter changes
  useEffect(() => {
    setActiveIndex(0);
    if (sliderRef.current) {
      sliderRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  }, [activeSpecialty]);

  // Auto slider timer
  useEffect(() => {
    if (isPaused || totalItems <= 1) return;
    const interval = setInterval(() => {
      handleNext();
    }, 4500);

    return () => clearInterval(interval);
  }, [isPaused, totalItems, handleNext]);

  // Sync active index when user scrolls/swipes manually
  const handleScroll = () => {
    if (!sliderRef.current) return;
    const container = sliderRef.current;
    const scrollLeft = Math.abs(container.scrollLeft);
    const card = container.children[0] as HTMLElement | undefined;
    if (card) {
      const cardWidth = card.offsetWidth + 20; // card width + gap
      const index = Math.round(scrollLeft / cardWidth);
      if (index >= 0 && index < totalItems && index !== activeIndex) {
        setActiveIndex(index);
      }
    }
  };

  return (
    <section id="doctors" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-6">
          <div className="max-w-2xl">
            <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-orange-500 mb-2">
              {t.doctors.eyebrow}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0D3B3F] tracking-tight leading-tight">
              {t.doctors.heading}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-500 leading-relaxed">
              {t.doctors.subheading}
            </p>
          </div>

          {/* Navigation Controls: Next / Prev Nav Buttons */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm">
              <button
                onClick={handlePrev}
                disabled={totalItems <= 1}
                aria-label="Previous Doctor"
                className="w-10 h-10 rounded-xl bg-slate-50 hover:bg-[#0D3B3F] text-slate-700 hover:text-white border border-slate-200/80 hover:border-[#0D3B3F] shadow-sm flex items-center justify-center transition-all duration-200 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed group"
              >
                <ChevronLeft className="w-5 h-5 rtl:rotate-180 group-hover:-translate-x-0.5 rtl:group-hover:translate-x-0.5 transition-transform" />
              </button>
              <button
                onClick={handleNext}
                disabled={totalItems <= 1}
                aria-label="Next Doctor"
                className="w-10 h-10 rounded-xl bg-slate-50 hover:bg-[#0D3B3F] text-slate-700 hover:text-white border border-slate-200/80 hover:border-[#0D3B3F] shadow-sm flex items-center justify-center transition-all duration-200 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed group"
              >
                <ChevronRight className="w-5 h-5 rtl:rotate-180 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {specialtiesList.map((spec) => (
            <button
              key={spec}
              onClick={() => setActiveSpecialty(spec)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeSpecialty === spec
                  ? "bg-[#0D3B3F] text-white shadow-md shadow-teal-950/20 scale-[1.02]"
                  : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {spec}
            </button>
          ))}
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
            className="flex gap-5 overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth pb-6 pt-2 px-1"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {filteredDoctors.map((doc, index) => {
              const isCurrent = activeIndex === index;
              return (
                <div
                  key={doc.id}
                  className={`w-[85vw] sm:w-[78vw] md:w-[calc(33.333%-14px)] lg:w-[385px] shrink-0 snap-start bg-white rounded-3xl overflow-hidden border ${
                    isCurrent ? "border-teal-400 shadow-luxury-hover" : "border-slate-200/80 shadow-card"
                  } hover:shadow-luxury-hover transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5`}
                >
                  {/* Doctor Avatar Header */}
                  <div className="relative h-60 w-full overflow-hidden bg-slate-100">
                    <Image
                      src={doc.avatar}
                      alt={doc.name}
                      fill
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>

                    {/* Rating Badge */}
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>{doc.rating}</span>
                    </div>

                    {/* Experience Badge */}
                    <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-teal-950/80 backdrop-blur-md border border-teal-500/30 text-teal-300 text-[11px] font-bold">
                      {doc.experienceYears}+ {t.doctors.experience}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div>
                        <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-teal-700 transition-colors">
                          {language === "ar" ? doc.nameAr : doc.name}
                        </h3>
                        <p className="text-xs font-semibold text-teal-700">
                          {language === "ar" ? doc.titleAr : doc.title}
                        </p>
                      </div>

                      {/* Hospital & City */}
                      <div className="space-y-1 text-xs text-slate-600">
                        <div className="flex items-center gap-1.5">
                          <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="truncate">{language === "ar" ? doc.hospitalAr : doc.hospital}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>{language === "ar" ? doc.cityAr : doc.city}</span>
                        </div>
                      </div>

                      {/* Languages */}
                      <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                        <Globe className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{doc.languages.join(" · ")}</span>
                      </div>
                    </div>

                    {/* Video Availability Strip */}
                    <div className="pt-2 border-t border-slate-100">
                      <div className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg flex items-center gap-1.5 mb-3">
                        <Video className="w-3 h-3 text-emerald-600 shrink-0" />
                        <span>{t.doctors.videoAvailable}</span>
                      </div>

                      {/* Actions */}
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => openDoctorModal(doc)}
                          className="py-2.5 px-3 rounded-xl border border-slate-200 hover:border-slate-300 text-slate-700 hover:text-slate-900 text-xs font-bold transition-all text-center"
                        >
                          {t.doctors.viewProfile}
                        </button>
                        <button
                          onClick={() => openDoctorModal(doc)}
                          className="py-2.5 px-3 rounded-xl bg-[#0D3B3F] hover:bg-[#072428] text-white text-xs font-bold transition-all text-center shadow-md shadow-teal-950/20"
                        >
                          {t.doctors.requestConsult}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Floating Next/Prev Side Arrows for Desktop (visible on slider hover) */}
          {totalItems > 1 && (
            <>
              <button
                onClick={handlePrev}
                aria-label="Previous Doctor"
                className="hidden md:flex absolute top-1/2 -left-4 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 text-slate-800 shadow-xl items-center justify-center opacity-0 group-hover/slider:opacity-100 transition-all duration-300 hover:bg-[#0D3B3F] hover:text-white hover:scale-105 active:scale-95"
              >
                <ChevronLeft className="w-6 h-6 rtl:rotate-180" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next Doctor"
                className="hidden md:flex absolute top-1/2 -right-4 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 text-slate-800 shadow-xl items-center justify-center opacity-0 group-hover/slider:opacity-100 transition-all duration-300 hover:bg-[#0D3B3F] hover:text-white hover:scale-105 active:scale-95"
              >
                <ChevronRight className="w-6 h-6 rtl:rotate-180" />
              </button>
            </>
          )}
        </div>

        {/* Bottom Slider Pagination Dots & Auto-Play Status Indicator */}
        {totalItems > 1 && (
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200/80">
            <div className="flex items-center gap-2">
              {filteredDoctors.map((doc, i) => (
                <button
                  key={doc.id}
                  onClick={() => scrollToIndex(i)}
                  aria-label={`Go to ${doc.name}`}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    activeIndex === i
                      ? "w-8 bg-[#0D3B3F] shadow-sm shadow-teal-950/30"
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
                className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-[#0D3B3F] transition-colors"
              >
                {isPaused ? (
                  <>
                    <Play className="w-3.5 h-3.5 text-[#0D3B3F] fill-[#0D3B3F]" />
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
        )}
      </div>
    </section>
  );
};
