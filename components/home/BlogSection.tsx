"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

export const BlogSection = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [totalSlides, setTotalSlides] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(true);
  const [canScrollNext, setCanScrollNext] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const blogs = [
    {
      id: "nhs-quaternary-care",
      title: "Why NHS Patients Are Choosing India for Quaternary Joint & Heart Surgery",
      excerpt:
        "Understanding the clinical safeguards, JCI accreditation, and how UK patients save up to 70% while skipping 18-month NHS queues.",
      category: "NHS Patients",
      date: "January 28, 2026",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80",
    },
    {
      id: "indian-medical-visas-guide",
      title: "Complete Guide to Indian Medical Visas (e-Med Visa) in 2026",
      excerpt:
        "Everything you need to know about eligibility, hospital invitation letters, attendant visas, and fast-track 48-hour approvals.",
      category: "Visa & Logistics",
      date: "January 28, 2026",
      readTime: "4 min read",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80",
    },
    {
      id: "hospital-accreditation-standards",
      title: "How to Evaluate Hospital Accreditation: JCI vs NABH Standards",
      excerpt:
        "What clinical accreditation actually means for infection rates, nurse-to-patient ratios, and surgical outcomes.",
      category: "Hospital Standards",
      date: "January 20, 2026",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80",
    },
    {
      id: "robotic-knee-vs-traditional",
      title: "Robotic Knee Surgery vs Traditional Arthroplasty: What the Data Shows",
      excerpt:
        "Comparing MAKO CT-guided navigation, implant longevity, muscle-sparing recovery times, and day-one ambulation.",
      category: "Orthopaedics",
      date: "January 10, 2026",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80",
    },
    {
      id: "flying-after-surgery-timeline",
      title: "Safe Fit-to-Fly Timelines: Air Travel Protocols Following Major Surgery",
      excerpt:
        "Clinical clearance criteria, DVT prophylaxis, in-flight mobility guidelines, and medical escort support for overseas flights.",
      category: "Travel & Recovery",
      date: "January 04, 2026",
      readTime: "4 min read",
      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80",
    },
    {
      id: "full-arch-dental-implants",
      title: "Full-Arch Digital Dental Implants: 5-Day Protocol for Overseas Patients",
      excerpt:
        "Immediate-load All-on-4 and All-on-6 digital protocols, Swiss Straumann fixtures, 3D CBCT stents, and permanent zirconia bridges.",
      category: "Digital Dentistry",
      date: "December 28, 2025",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80",
    },
  ];

  // Sync Carousel state
  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrentSlide(api.selectedScrollSnap());
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };

    setTotalSlides(api.scrollSnapList().length);
    onSelect();

    api.on("select", onSelect);
    api.on("reInit", onSelect);

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  // Auto-slide functionality (every 4.5 seconds, pauses on user hover)
  useEffect(() => {
    if (!api || isPaused) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 4500);

    return () => clearInterval(interval);
  }, [api, isPaused]);

  return (
    <section className="py-16 sm:py-24 bg-[#FCFDFD] border-t border-[#DCE6EB] font-sans">
      <div className="max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Navigation Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ECF4F7] border border-[#DCE6EB] text-[#0B5D68] text-xs font-heading font-bold uppercase tracking-wider mb-3.5 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#14B8A6] animate-pulse" />
              <BookOpen className="w-3.5 h-3.5 text-[#0B5D68]" />
              <span>CLINICAL GUIDES &amp; PATIENT EDUCATION</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] xl:text-[46px] font-heading font-extrabold text-[#0C2338] leading-[1.15] tracking-tight">
              Latest Insights &amp;{" "}
              <span className="text-[#0B5D68]">Preparation Guides.</span>
            </h2>
          </div>

          {/* Right Header: Link & Slider Navigation Arrows */}
          <div className="flex items-center gap-4 sm:gap-6 shrink-0">
            <Link
              href="/guides"
              className="inline-flex items-center gap-2 text-xs uppercase font-heading font-bold tracking-wider text-[#0B5D68] hover:text-[#0C2338] hover:underline transition-colors group"
            >
              <span>View All Guides &amp; Articles</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>

            {/* Slider Navigation Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => api?.scrollPrev()}
                aria-label="Previous clinical guides"
                className="w-10 h-10 rounded-full border border-[#DCE6EB] bg-white hover:bg-[#ECF4F7] text-[#0C2338] shadow-xs active:scale-95 transition-all flex items-center justify-center cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => api?.scrollNext()}
                aria-label="Next clinical guides"
                className="w-10 h-10 rounded-full bg-[#0B5D68] hover:bg-[#07434B] text-white shadow-xs active:scale-95 transition-all flex items-center justify-center cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Container (Auto-slides, pauses on hover) */}
        <div
          className="w-full"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-6 sm:-ml-8">
              {blogs.map((blog, idx) => (
                <CarouselItem
                  key={blog.id || idx}
                  className="pl-6 sm:pl-8 basis-full md:basis-1/2"
                >
                  <Link
                    href="/guides"
                    className="group cursor-pointer flex flex-col h-full focus:outline-none"
                  >
                    {/* Image Container with Inverted Bottom-Right Corner Notch */}
                    <div className="relative aspect-[16/10] sm:aspect-[16/9.5] w-full rounded-[28px] sm:rounded-[32px] overflow-hidden bg-slate-100 border border-[#DCE6EB] mb-5 shadow-sm group-hover:shadow-md transition-shadow">
                      <Image
                        src={blog.image}
                        alt={blog.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />

                      {/* Category Pill on Top-Left */}
                      <div className="absolute top-4 left-4 z-10">
                        <span className="px-3.5 py-1.5 rounded-full bg-[#0C2338]/85 backdrop-blur-md text-white text-[10px] sm:text-[11px] font-heading font-medium tracking-wider uppercase shadow-sm border border-white/20">
                          {blog.category}
                        </span>
                      </div>

                      {/* Signature Bottom-Right Corner Notch with Circular Arrow Button */}
                      <div className="absolute -bottom-1 -right-1 bg-[#FCFDFD] pt-3 pl-3 rounded-tl-[28px] z-10">
                        {/* Top Concave Inverted Fillet */}
                        <svg
                          className="absolute -top-6 right-0 w-6 h-6 text-[#FCFDFD] pointer-events-none"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M24 0 A 24 24 0 0 0 0 24 H 24 V 0 Z" />
                        </svg>

                        {/* Left Concave Inverted Fillet */}
                        <svg
                          className="absolute bottom-0 -left-6 w-6 h-6 text-[#FCFDFD] pointer-events-none"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M0 24 A 24 24 0 0 0 24 0 V 24 H 0 Z" />
                        </svg>

                        {/* Floating Action Button */}
                        <div
                          className={`w-13 h-13 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm group-hover:shadow-md ${
                            idx % 2 === 0
                              ? "bg-[#ECF4F7] text-[#0B5D68] border border-[#DCE6EB] group-hover:bg-[#F0A126] group-hover:text-[#0C2338] group-hover:border-[#F0A126]"
                              : "bg-white text-[#0C2338] border border-[#DCE6EB] group-hover:bg-[#F0A126] group-hover:text-[#0C2338] group-hover:border-[#F0A126]"
                          }`}
                        >
                          <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                        </div>
                      </div>
                    </div>

                    {/* Meta Date & Read Time */}
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#6B7C88] uppercase tracking-wider mb-2.5">
                      <span>{blog.date}</span>
                      <span>·</span>
                      <span>{blog.readTime.toUpperCase()}</span>
                    </div>

                    {/* Title */}
                    <h3 className="font-heading font-extrabold text-xl sm:text-2xl lg:text-[25px] text-[#0C2338] leading-snug group-hover:text-[#0B5D68] transition-colors mb-2.5 line-clamp-2">
                      {blog.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-xs sm:text-sm text-[#6B7C88] leading-relaxed line-clamp-2">
                      {blog.excerpt}
                    </p>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Slider Indicators & Controls Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-10 pt-6 border-t border-[#DCE6EB]/70">
            {/* Guide Slide Counter & Status */}
            <div className="flex items-center gap-2.5 text-xs font-semibold text-[#6B7C88]">
              <span className="font-heading font-bold text-[#0C2338]">
                Guide {String(currentSlide + 1).padStart(2, "0")}
              </span>
              <span>/</span>
              <span>{String(totalSlides || blogs.length).padStart(2, "0")}</span>
              <span className="text-slate-300">·</span>
              <span className="text-[11px] text-[#0B5D68] font-medium">
                {isPaused ? "Paused" : "Auto-sliding"}
              </span>
            </div>

            {/* Pagination Indicators (Clickable Dots / Pills) */}
            <div className="flex items-center gap-2">
              {Array.from({ length: totalSlides || blogs.length }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => api?.scrollTo(idx)}
                  aria-label={`Jump to guide slide ${idx + 1}`}
                  className={`h-2.5 transition-all duration-300 rounded-full cursor-pointer ${
                    currentSlide === idx
                      ? "w-8 bg-[#0B5D68] shadow-xs"
                      : "w-2.5 bg-[#DCE6EB] hover:bg-[#6B7C88]/50"
                  }`}
                />
              ))}
            </div>

            {/* Bottom Quick-Arrows for Easy Mobile / Tablet Navigation */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => api?.scrollPrev()}
                aria-label="Previous guide"
                className="w-9 h-9 rounded-full border border-[#DCE6EB] bg-white hover:bg-[#ECF4F7] text-[#0C2338] shadow-xs active:scale-95 transition-all flex items-center justify-center cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => api?.scrollNext()}
                aria-label="Next guide"
                className="w-9 h-9 rounded-full bg-[#0B5D68] hover:bg-[#07434B] text-white shadow-xs active:scale-95 transition-all flex items-center justify-center cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
