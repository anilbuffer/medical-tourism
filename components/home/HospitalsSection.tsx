"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  ArrowRight,
  ShieldCheck,
  Award,
  Bed,
  Building2,
  Star,
  Sparkles,
  Plane,
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
      location: "Mohali, Punjab — North India Hub",
      airportDistance: "15 Mins from Chandigarh Int'l Airport (IXC)",
      image: "/images/facilities/robotic-surgery.jpg",
      accreditation: "JCI & NABH Accredited",
      rating: 4.9,
      reviewsCount: "1,240+ Patients",
      beds: "355+ Quaternary Beds",
      ots: "11 Robotic OTs",
      specialties: ["Robotic Joint Replacement", "Cardiac Sciences", "Robotic Oncology", "Organ Transplant"],
      tech: "Da Vinci Xi & Stryker Mako Robotics",
      amenities: "Dedicated International Patient Lounge & Concierge",
      highlight: "North India's premier JCI-accredited tertiary center for complex joint and cardiac surgeries.",
    },
    {
      id: "max-mohali",
      name: "Max Super Speciality Hospital",
      category: "Quaternary & Robotic",
      location: "Mohali / Chandigarh Capital Region",
      airportDistance: "20 Mins from Chandigarh Int'l Airport (IXC)",
      image: "/images/facilities/mako-robotic-joint.jpg",
      accreditation: "NABH & NABL Accredited",
      rating: 4.8,
      reviewsCount: "980+ Patients",
      beds: "230+ Dedicated Beds",
      ots: "9 Modular OTs",
      specialties: ["Neurosciences", "Kidney Transplant", "Joint Replacement", "Cancer Radiotherapy"],
      tech: "TrueBeam STx Linac & Da Vinci Robot",
      amenities: "Private VIP Suites & Dedicated Patient Coordinators",
      highlight: "Quaternary hospital recognized for high-complexity organ transplants and precision oncology.",
    },
    {
      id: "profile-ludhiana",
      name: "Profile Cosmetic Surgery Institute",
      category: "Cosmetic & Plastic Surgery",
      location: "Ludhiana — Led by Dr. Vikas Gupta",
      airportDistance: "Chauffeured Airport Transit Available",
      image: "/images/facilities/cosmetic-surgery.jpg",
      accreditation: "ISO & Quality Certified",
      rating: 4.9,
      reviewsCount: "520+ Patients",
      beds: "Private VIP Suites",
      ots: "Sterile Aesthetic OTs",
      specialties: ["High-Definition VASER", "Rhinoplasty", "3D Liposuction", "Body Contouring"],
      tech: "VASER Ultrasound & Micro-Aire Liposculpture",
      amenities: "100% Confidential VIP Recovery & Private Care",
      highlight: "Boutique surgical aesthetic institute celebrated for global precision body contouring and cosmetic facial artistry.",
    },
    {
      id: "sangam-mohali",
      name: "Sangam Netralaya Eye Hospital",
      category: "Laser Ophthalmology",
      location: "Ajitgarh / Mohali, Punjab",
      airportDistance: "15 Mins from Chandigarh Int'l Airport (IXC)",
      image: "/images/facilities/laser-ophthalmology.jpg",
      accreditation: "NABH Eye Care Centre of Excellence",
      rating: 5.0,
      reviewsCount: "850+ Patients",
      beds: "Day-Care Suites",
      ots: "Zeiss & Alcon OTs",
      specialties: ["Blade-Free Contoura LASIK", "SMILE Pro Refractive", "Micro-Cataract", "Trifocal IOLs"],
      tech: "Zeiss Lumera 700 & Alcon EX500 Laser",
      amenities: "Same-Day Outpatient & 24h Visual Recovery",
      highlight: "Ophthalmic center of excellence with 20,000+ laser procedures, restoring 20/20 vision in 24 hours.",
    },
    {
      id: "apollo-chandigarh",
      name: "Apollo Hospitals & Clinics",
      category: "Quaternary & Robotic",
      location: "Sector 8C, Chandigarh City",
      airportDistance: "15 Mins from Chandigarh Int'l Airport (IXC)",
      image: "/images/facilities/hybrid-cath-lab.jpg",
      accreditation: "JCI & NABH Certified",
      rating: 4.9,
      reviewsCount: "1,150+ Patients",
      beds: "220+ Quaternary Beds",
      ots: "Hybrid Cath Labs",
      specialties: ["Cardiac Care", "Orthopaedics", "Medical Oncology", "Critical Care"],
      tech: "3T MRI & Bi-Plane Vascular Cath Lab",
      amenities: "International Patient Lounge & Currency Desk",
      highlight: "Flagship Apollo healthcare facility delivering comprehensive clinical programs and rapid admission.",
    },
    {
      id: "healing-chandigarh",
      name: "Healing Super Speciality Hospital",
      category: "Quaternary & Robotic",
      location: "Sector 34, Chandigarh Central",
      airportDistance: "18 Mins from Chandigarh Int'l Airport (IXC)",
      image: "/images/facilities/neurosciences-suite.jpg",
      accreditation: "NABH Accredited Healthcare",
      rating: 4.7,
      reviewsCount: "720+ Patients",
      beds: "150+ Dedicated Beds",
      ots: "Endosurgical Suites",
      specialties: ["Spine Surgery", "Organ Transplant", "Joint Reconstruction", "Urology"],
      tech: "4K HD Endoscopy & Laparoscopy Suites",
      amenities: "1-on-1 Doctor Care & Rapid Recovery Discharge",
      highlight: "High-touch boutique super-speciality hospital celebrated for personalized care and rapid patient recovery.",
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
      className="py-16 sm:py-24 bg-[#ffffff] relative border-t border-[#DCE6EB] font-sans"
    >
      {/* 1580px Expanded Container Matching Header, Hero, and Specialties */}
      <div className="max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8 w-full">

        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 sm:mb-10 gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ECF4F7] border border-[#DCE6EB] text-[#0B5D68] text-xs font-heading font-bold uppercase tracking-wider mb-3.5 shadow-xs">
              <span className="h-2 w-2 rounded-full bg-[#14B8A6] animate-pulse" />
              <span>GLOBAL ACCREDITED HEALTHCARE NETWORK</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[32px] xl:text-[40px] font-heading font-bold text-[#0C2338] leading-[1.15] tracking-tight">
              Featured Partner Hospitals.{" "}
              <span className="text-[#0e9d8d] block sm:inline">
                World-Class Clinical Institutions.
              </span>
            </h2>
            <p className="text-[#6B7C88] text-sm sm:text-base leading-relaxed font-normal mt-2.5 max-w-2xl">
              Audited quaternary institutions with JCI and NABH accreditations, cutting-edge robotic surgical theatres, dedicated international patient lounges, and priority direct admission.
            </p>
          </div>

          {/* Header Right: Carousel Navigation & View All link */}
          <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto shrink-0">
            <Link
              href="/hospitals"
              className="text-xs font-heading font-bold uppercase tracking-wider text-[#0B5D68] hover:text-[#0C2338] hover:underline flex items-center gap-1.5 transition-colors mr-1 sm:mr-2"
            >
              <span>Explore All 15+ Hospitals</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <div className="flex items-center gap-2">
              <button
                onClick={() => api?.scrollPrev()}
                disabled={!canScrollPrev}
                aria-label="Previous hospital slide"
                className={`w-10 h-10 rounded-full border border-[#DCE6EB] flex items-center justify-center transition-all cursor-pointer ${canScrollPrev
                  ? "bg-white hover:bg-[#ECF4F7] text-[#0C2338] shadow-sm active:scale-95"
                  : "bg-white/60 text-slate-300 border-[#DCE6EB]/60 cursor-not-allowed opacity-50"
                  }`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => api?.scrollNext()}
                disabled={!canScrollNext}
                aria-label="Next hospital slide"
                className={`w-10 h-10 rounded-full border border-transparent flex items-center justify-center transition-all cursor-pointer ${canScrollNext
                  ? "bg-[#0e9d8d] hover:bg-[#0a8678] text-white shadow-sm active:scale-95"
                  : "bg-white/60 text-slate-300 border-[#DCE6EB]/60 cursor-not-allowed opacity-50"
                  }`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Showcase */}
        <div className="w-full">
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: false,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4 sm:-ml-6">
              {hospitals.map((hosp) => (
                <CarouselItem
                  key={hosp.id}
                  className="pl-4 sm:pl-6 basis-full sm:basis-1/2 lg:basis-1/3"
                >
                  <div className="group relative bg-white rounded-2xl sm:rounded-3xl border border-[#DCE6EB] hover:border-[#0B5D68]/40 shadow-sm hover:shadow-xl transition-all duration-400 overflow-hidden flex flex-col justify-between h-full">
                    {/* Media Top Container */}
                    <div className="relative h-56 xs:h-64 sm:h-80 w-full overflow-hidden bg-slate-100 shrink-0">
                      <Image
                        src={hosp.image}
                        alt={hosp.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      {/* Subtle Dark Gradient Overlay for Badges & Text Contrast */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0C2338]/85 via-black/20 to-transparent" />

                      {/* Top-Left: Accreditation Badge */}
                      <div className="absolute top-3.5 left-3.5 z-10">
                        <span className="px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md text-white text-[10px] sm:text-[11px] font-heading font-medium uppercase tracking-wider shadow-sm flex items-center gap-1.5 border border-white/20">
                          <ShieldCheck className="w-3.5 h-3.5 text-white" />
                          <span className="text-white">{hosp.accreditation}</span>
                        </span>
                      </div>

                      {/* Top-Right: Audited Facility Pill */}
                      <div className="absolute top-3.5 right-3.5 z-10">
                        <span className="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#0C2338] text-[11px] font-heading font-bold shadow-sm flex items-center gap-1 border border-white/40">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#0B5D68]" />
                          <span>Audited Center</span>
                        </span>
                      </div>

                      {/* Bottom-Left Image Stats: Bed Capacity & OTs */}
                      <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded-md bg-[#0e9d8d] backdrop-blur-sm text-white text-[11px] font-medium flex items-center gap-1">
                          <Bed className="w-3 h-3 text-slate-300" />
                          <span>{hosp.beds}</span>
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-[#0e9d8d] backdrop-blur-sm text-white text-[11px] font-medium flex items-center gap-1">
                          <Building2 className="w-3 h-3 text-slate-300" />
                          <span>{hosp.ots}</span>
                        </span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between bg-white">
                      <div>
                        {/* Eyebrow Category */}
                        <p className="text-[11px] font-heading font-bold uppercase tracking-wider text-[#0e9d8d] mb-1">
                          {hosp.category}
                        </p>

                        {/* Hospital Name */}
                        <div className="h-14 flex items-center mb-1.5">
                          <h3 className="font-heading font-extrabold text-lg sm:text-xl text-[#0C2338] group-hover:text-[#0B5D68] transition-colors leading-snug line-clamp-2">
                            {hosp.name}
                          </h3>
                        </div>

                        {/* Location */}
                        <div className="flex items-center gap-1.5 text-xs text-[#6B7C88] font-medium mb-3">
                          <MapPin className="w-3.5 h-3.5 text-[#0B5D68] shrink-0" />
                          <span className="truncate">{hosp.location}</span>
                        </div>

                        {/* Specialty Tags */}
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {hosp.specialties.slice(0, 3).map((spec, sIdx) => (
                            <span
                              key={sIdx}
                              className="px-2.5 py-1 rounded-md bg-[#ECF4F7] text-[#0B5D68] border border-[#DCE6EB] text-[11px] font-medium leading-none"
                            >
                              {spec}
                            </span>
                          ))}
                        </div>

                        {/* Technology & Airport Distance Box */}
                        <div className="bg-[#FCFDFD] rounded-xl p-3 border border-[#DCE6EB] space-y-1.5 mb-5 text-xs">
                          {/* <div className="flex items-start gap-2 text-[#0C2338]">
                            <Sparkles className="w-3.5 h-3.5 text-[#0B5D68] shrink-0 mt-0.5" />
                            <span className="font-semibold line-clamp-1">{hosp.tech}</span>
                          </div> */}
                          <div className="flex items-center gap-2 text-[#6B7C88] text-[11px]">
                            <Plane className="w-3.5 h-3.5 text-[#0B5D68] shrink-0" />
                            <span className="truncate">{hosp.airportDistance}</span>
                          </div>
                        </div>
                      </div>

                      {/* Card Footer Actions */}
                      <div className="pt-3 border-t border-[#DCE6EB]/60 space-y-2">
                        <button
                          onClick={() => openIntake(hosp.name)}
                          className="w-full py-3 px-4 rounded-xl bg-[#F0A126] hover:bg-[#db8e18] active:scale-[0.98] text-[#0C2338] font-heading font-bold text-xs uppercase tracking-wider shadow-md shadow-[#F0A126]/20 flex items-center justify-center gap-2 transition-all cursor-pointer group/btn"
                        >
                          <span>Check Hospital Availability</span>
                          <ArrowRight className="w-3.5 h-3.5 text-[#0C2338] stroke-[2.4] transition-transform group-hover/btn:translate-x-1" />
                        </button>

                        <Link
                          href="/hospitals"
                          className="w-full py-1 text-center text-xs font-semibold text-[#0e9d8d] hover:text-[#14B8A6] hover:underline transition-colors flex items-center justify-center gap-1"
                        >
                          <span>View Facilities & Profiles</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Slide Indicator Dots */}
          {totalSlides > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              {Array.from({ length: totalSlides }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => api?.scrollTo(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${currentSlide === idx
                    ? "w-8 bg-[#0B5D68]"
                    : "w-2 bg-slate-200 hover:bg-slate-300"
                    }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Global Hospital Partnership Standards Banner */}
        <div className="mt-12 sm:mt-16 rounded-2xl sm:rounded-3xl bg-white border border-[#DCE6EB] p-6 sm:p-8 lg:p-10 shadow-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#ECF4F7] text-[#0B5D68] flex items-center justify-center shrink-0 border border-[#DCE6EB]">
                <ShieldCheck className="w-5 h-5 text-[#0B5D68]" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-sm text-[#0C2338]">JCI & NABH Audited</h4>
                <p className="text-xs text-[#6B7C88] leading-relaxed mt-1">
                  Surgeries conducted strictly in certified sterile modular OTs with zero infection compromises.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#ECF4F7] text-[#0B5D68] flex items-center justify-center shrink-0 border border-[#DCE6EB]">
                <CheckCircle2 className="w-5 h-5 text-[#0B5D68]" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-sm text-[#0C2338]">Zero Waiting Lists</h4>
                <p className="text-xs text-[#6B7C88] leading-relaxed mt-1">
                  Priority admission and reserved surgical dates guaranteed within 24–48 hours of flight arrival.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#ECF4F7] text-[#0B5D68] flex items-center justify-center shrink-0 border border-[#DCE6EB]">
                <Award className="w-5 h-5 text-[#0B5D68]" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-sm text-[#0C2338]">US-FDA Hardware</h4>
                <p className="text-xs text-[#6B7C88] leading-relaxed mt-1">
                  Only authentic Stryker, Zimmer Biomet, Da Vinci, and Zeiss navigation systems utilized.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#ECF4F7] text-[#0B5D68] flex items-center justify-center shrink-0 border border-[#DCE6EB]">
                <Building2 className="w-5 h-5 text-[#0B5D68]" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-sm text-[#0C2338]">Dedicated Global Desks</h4>
                <p className="text-xs text-[#6B7C88] leading-relaxed mt-1">
                  Private lounges, airport limousine pickup, currency exchange, and medical visa facilitation.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-[#DCE6EB] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs sm:text-sm text-[#0C2338] font-medium text-center sm:text-left">
              Looking for specialized hospital centers across North India, Delhi NCR, or Mumbai?
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Link
                href="/hospitals"
                className="w-full sm:w-auto px-7 py-3 rounded-xl bg-[#F0A126] hover:bg-[#db8e18] text-[#0C2338] font-heading font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-[#F0A126]/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Explore All 15+ Partner Hospitals</span>
                <ArrowRight className="w-4 h-4 text-[#0C2338] stroke-[2.4]" />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

