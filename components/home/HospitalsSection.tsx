"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  ArrowRight,
  ShieldCheck,
  Award,
  Building2,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useCare } from "@/context/CareContext";

export const HospitalsSection = () => {
  const { openIntake } = useCare();
  const [api, setApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [totalSlides, setTotalSlides] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const hospitals = [
    {
      id: "fortis-mohali",
      name: "Fortis Hospital Mohali",
      category: "Quaternary & Robotic",
      location: "Mohali / Chandigarh Hub",
      image: "/images/facilities/robotic-surgery.jpg",
      accreditation: "JCI & NABH Accredited",
      highlight:
        "North India's premier JCI tertiary center for complex robotic joint and cardiac surgeries.",
    },
    {
      id: "max-mohali",
      name: "Max Super Speciality Hospital",
      category: "Quaternary & Robotic",
      location: "Mohali / Chandigarh Region",
      image: "/images/facilities/mako-robotic-joint.jpg",
      accreditation: "NABH & NABL Accredited",
      highlight:
        "Quaternary hospital recognized for Da Vinci precision oncology and complex organ transplants.",
    },
    {
      id: "profile-ludhiana",
      name: "Profile Cosmetic Surgery Institute",
      category: "Aesthetic & Plastic Surgery",
      location: "Ludhiana — Led by Dr. Vikas Gupta",
      image: "/images/facilities/cosmetic-surgery.jpg",
      accreditation: "ISO & Quality Certified",
      highlight:
        "Boutique surgical aesthetic institute celebrated for 4D VASER contouring and facial artistry.",
    },
    {
      id: "sangam-mohali",
      name: "Sangam Netralaya Eye Hospital",
      category: "Laser Ophthalmology",
      location: "Ajitgarh / Mohali, Punjab",
      image: "/images/facilities/laser-ophthalmology.jpg",
      accreditation: "NABH Centre of Excellence",
      highlight:
        "Specialized ophthalmic hospital equipped with Zeiss Lumera 700 and blade-free Contoura LASIK suites.",
    },
  ];

  // Sync Embla carousel state
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

  return (
    <section
      id="hospitals"
      className="py-20 sm:py-28 lg:py-32 bg-[#FFFFFF] relative border-t border-[#DCE6EB] font-sans"
    >
      <div className="max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Section Header: Minimal & Breathable */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ECF4F7] border border-[#DCE6EB] text-[#0B5D68] text-xs font-heading font-bold uppercase tracking-wider mb-4 shadow-xs">
              <Building2 className="w-3.5 h-3.5 text-[#0B5D68]" />
              <span>ACCREDITED HOSPITAL NETWORK</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-heading font-extrabold text-[#0C2338] leading-[1.15] tracking-tight">
              Featured Partner Hospitals.{" "}
              <span className="text-[#0B5D68] block sm:inline">
                World-Class Centers.
              </span>
            </h2>
            <p className="text-[#6B7C88] text-base sm:text-lg leading-relaxed font-normal mt-3">
              Audited quaternary institutions with JCI and NABH accreditations, robotic surgical theatres, and zero waiting lists.
            </p>
          </div>

          {/* Header Right: Carousel Navigation & Link */}
          <div className="flex items-center gap-4 sm:gap-6 shrink-0">
            <Link
              href="/hospitals"
              className="text-xs font-heading font-bold uppercase tracking-wider text-[#0B5D68] hover:text-[#0C2338] hover:underline flex items-center gap-1.5 transition-colors"
            >
              <span>Explore All 15+ Hospitals</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <div className="flex items-center gap-2">
              <button
                onClick={() => api?.scrollPrev()}
                disabled={!canScrollPrev}
                aria-label="Previous hospital slide"
                className={`w-10 h-10 rounded-full border border-[#DCE6EB] flex items-center justify-center transition-all cursor-pointer ${
                  canScrollPrev
                    ? "bg-white hover:bg-slate-100 text-[#0C2338] shadow-xs active:scale-95"
                    : "bg-[#F8FAFC] text-slate-300 border-[#DCE6EB]/60 cursor-not-allowed opacity-40"
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => api?.scrollNext()}
                disabled={!canScrollNext}
                aria-label="Next hospital slide"
                className={`w-10 h-10 rounded-full border border-transparent flex items-center justify-center transition-all cursor-pointer ${
                  canScrollNext
                    ? "bg-[#0B5D68] hover:bg-[#07434B] text-white shadow-xs active:scale-95"
                    : "bg-[#F8FAFC] text-slate-300 border-[#DCE6EB]/60 cursor-not-allowed opacity-40"
                }`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Showcase: Airy, Focused Cards */}
        <div className="w-full mb-16">
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: false,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-6 sm:-ml-8">
              {hospitals.map((hosp) => (
                <CarouselItem
                  key={hosp.id}
                  className="pl-6 sm:pl-8 basis-full sm:basis-1/2 lg:basis-1/3"
                >
                  <div
                    onClick={() => openIntake(`Hospital Inquiries: ${hosp.name}`)}
                    className="group relative bg-[#FCFDFD] rounded-3xl border border-[#DCE6EB] hover:border-[#0B5D68]/40 shadow-xs hover:shadow-xl transition-all duration-400 overflow-hidden flex flex-col justify-between h-full cursor-pointer"
                  >
                    {/* Media Top Container */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 shrink-0">
                      <Image
                        src={hosp.image}
                        alt={hosp.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />

                      {/* Top-Left: Accreditation Badge */}
                      <div className="absolute top-3.5 left-3.5 z-10">
                        <span className="px-3 py-1 rounded-full bg-[#0C2338]/85 backdrop-blur-md text-white text-[11px] font-heading font-medium uppercase tracking-wider shadow-sm flex items-center gap-1.5 border border-white/20">
                          <ShieldCheck className="w-3.5 h-3.5 text-[#F0A126]" />
                          <span>{hosp.accreditation}</span>
                        </span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between bg-[#FCFDFD]">
                      <div>
                        {/* Eyebrow Category */}
                        <p className="text-[11px] font-heading font-bold uppercase tracking-wider text-[#0B5D68] mb-1.5">
                          {hosp.category}
                        </p>

                        {/* Hospital Name */}
                        <h3 className="font-heading font-extrabold text-xl text-[#0C2338] group-hover:text-[#0B5D68] transition-colors mb-2 leading-snug line-clamp-1">
                          {hosp.name}
                        </h3>

                        {/* Location */}
                        <div className="flex items-center gap-1.5 text-xs text-[#6B7C88] font-medium mb-3">
                          <MapPin className="w-3.5 h-3.5 text-[#0B5D68] shrink-0" />
                          <span className="truncate">{hosp.location}</span>
                        </div>

                        {/* 1–2 Line Clinical Highlight */}
                        <p className="text-xs sm:text-sm text-[#6B7C88] leading-relaxed line-clamp-2 mb-6 font-normal">
                          {hosp.highlight}
                        </p>
                      </div>

                      {/* Single Clean Interactive Trigger */}
                      <div className="pt-4 border-t border-[#DCE6EB]/70 flex items-center justify-between text-xs font-heading font-bold uppercase tracking-wider text-[#0B5D68] group-hover:text-[#0C2338] transition-colors">
                        <span>Check Hospital Availability</span>
                        <div className="w-8 h-8 rounded-full bg-[#ECF4F7] text-[#0B5D68] group-hover:bg-[#0B5D68] group-hover:text-white flex items-center justify-center transition-all">
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        {/* Minimalist 4-Pillar Hospital Standards Strip */}
        <div className="rounded-3xl bg-[#F8FAFC] border border-[#DCE6EB] p-8 sm:p-10 shadow-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-white text-[#0B5D68] flex items-center justify-center shrink-0 border border-[#DCE6EB] shadow-xs">
                <ShieldCheck className="w-5 h-5 text-[#0B5D68]" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-sm text-[#0C2338]">JCI &amp; NABH Audited</h4>
                <p className="text-xs text-[#6B7C88] leading-relaxed mt-1">
                  Sterile modular operating theatres with zero infection compromises.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-white text-[#0B5D68] flex items-center justify-center shrink-0 border border-[#DCE6EB] shadow-xs">
                <CheckCircle2 className="w-5 h-5 text-[#0B5D68]" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-sm text-[#0C2338]">Zero Waiting Lists</h4>
                <p className="text-xs text-[#6B7C88] leading-relaxed mt-1">
                  Priority admission and surgical dates reserved within 24–48 hours.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-white text-[#0B5D68] flex items-center justify-center shrink-0 border border-[#DCE6EB] shadow-xs">
                <Award className="w-5 h-5 text-[#0B5D68]" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-sm text-[#0C2338]">US-FDA Hardware</h4>
                <p className="text-xs text-[#6B7C88] leading-relaxed mt-1">
                  Stryker, Zimmer Biomet, Da Vinci, and Zeiss systems exclusively.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-white text-[#0B5D68] flex items-center justify-center shrink-0 border border-[#DCE6EB] shadow-xs">
                <Building2 className="w-5 h-5 text-[#0B5D68]" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-sm text-[#0C2338]">Dedicated Global Desks</h4>
                <p className="text-xs text-[#6B7C88] leading-relaxed mt-1">
                  Private lounges, airport limousine pickup, and medical visa facilitation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
