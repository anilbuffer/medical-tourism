"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
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
  const [activeCategory, setActiveCategory] = useState("All Hospitals");

  const categories = [
    "All Hospitals",
    "Quaternary & Robotic",
    "Cosmetic & Plastic Surgery",
    "Laser Ophthalmology",
  ];

  const hospitals = [
    {
      id: "fortis-mohali",
      name: "Fortis Hospital Mohali",
      category: "Quaternary & Robotic",
      location: "Mohali, Punjab — North India Hub",
      airportDistance: "15 Mins from Chandigarh Int'l Airport (IXC)",
      image: "/fortis-image.png",
      accreditation: "JCI & NABH Accredited",
      rating: 4.9,
      reviewsCount: "1,240+ Patients",
      beds: "355+ Quaternary Beds",
      ots: "11 Modular Robotic OTs",
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
      image: "/max-hospital.jpg",
      accreditation: "NABH & NABL Accredited",
      rating: 4.8,
      reviewsCount: "980+ Patients",
      beds: "230+ Dedicated Beds",
      ots: "9 Modular Advanced OTs",
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
      image: "/profileaestheticsurgery.png",
      accreditation: "ISO & Quality Healthcare Certified",
      rating: 4.9,
      reviewsCount: "520+ Patients",
      beds: "Boutique Private Suites",
      ots: "Specialised Sterile Aesthetic OTs",
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
      image: "/sangam-netralaya.webp",
      accreditation: "NABH Eye Care Centre of Excellence",
      rating: 5.0,
      reviewsCount: "850+ Patients",
      beds: "Day-Care Surgical Suites",
      ots: "Zeiss & Alcon Ultra-Clean OTs",
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
      image: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&q=80&w=800",
      accreditation: "JCI & NABH Certified Network",
      rating: 4.9,
      reviewsCount: "1,150+ Patients",
      beds: "220+ Quaternary Beds",
      ots: "Hybrid Cath Labs & Modular OTs",
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
      image: "https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&q=80&w=800",
      accreditation: "NABH Accredited Healthcare",
      rating: 4.7,
      reviewsCount: "720+ Patients",
      beds: "150+ Dedicated Beds",
      ots: "Minimally Invasive Endosuites",
      specialties: ["Spine Surgery", "Organ Transplant", "Joint Reconstruction", "Urology"],
      tech: "4K HD Endoscopy & Laparoscopy Suites",
      amenities: "1-on-1 Doctor Care & Rapid Recovery Discharge",
      highlight: "High-touch boutique super-speciality hospital celebrated for personalized care and rapid patient recovery.",
    },
  ];

  const filteredHospitals =
    activeCategory === "All Hospitals"
      ? hospitals
      : hospitals.filter((h) => h.category === activeCategory);

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

  // Re-initialize scroll when category filter changes
  useEffect(() => {
    if (api) {
      api.scrollTo(0);
    }
  }, [activeCategory, api]);

  return (
    <section
      id="hospitals"
      className="py-16 sm:py-24 bg-white relative border-t border-[#e2eaeb] font-sans"
    >
      {/* 1580px Expanded Container Matching Header, Hero, and Specialties */}
      <div className="max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8 w-full">

        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 sm:mb-10 gap-6">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="h-2 w-2 rounded-full bg-[#e39b2d] animate-pulse" />
              <p className="text-[#0b5d63] font-heading font-bold text-xs uppercase tracking-[0.22em]">
                GLOBAL ACCREDITED HEALTHCARE NETWORK
              </p>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-slate-900 leading-[1.14]">
              Featured Partner Hospitals.{" "}
              <span className="text-[#0b5d63] block sm:inline">
                World-Class Clinical Institutions.
              </span>
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-body mt-2.5 max-w-2xl">
              Audited quaternary institutions with JCI and NABH accreditations, cutting-edge robotic surgical theatres, dedicated international patient lounges, and priority direct admission.
            </p>
          </div>

          {/* Header Right: Carousel Navigation & View All link */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/hospitals"
              className="text-xs font-heading font-bold text-[#0b5d63] hover:text-[#04272a] hover:underline flex items-center gap-1.5 transition-colors mr-2"
            >
              <span>Explore All 15+ Hospitals</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <div className="flex items-center gap-2">
              <button
                onClick={() => api?.scrollPrev()}
                disabled={!canScrollPrev}
                aria-label="Previous hospital slide"
                className={`w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center transition-all cursor-pointer ${
                  canScrollPrev
                    ? "bg-white hover:bg-slate-100 text-slate-800 shadow-sm"
                    : "bg-slate-50 text-slate-300 border-slate-100 cursor-not-allowed opacity-50"
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => api?.scrollNext()}
                disabled={!canScrollNext}
                aria-label="Next hospital slide"
                className={`w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center transition-all cursor-pointer ${
                  canScrollNext
                    ? "bg-[#0b5d63] hover:bg-[#073f43] text-white shadow-sm"
                    : "bg-slate-50 text-slate-300 border-slate-100 cursor-not-allowed opacity-50"
                }`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-6 sm:mb-8">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-heading font-bold whitespace-nowrap transition-all duration-200 cursor-pointer border ${
                  isSelected
                    ? "bg-[#0b5d63] border-[#0b5d63] text-white shadow-sm"
                    : "bg-white hover:bg-slate-50 border-slate-200 text-slate-700"
                }`}
              >
                {cat}
              </button>
            );
          })}
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
              {filteredHospitals.map((hosp) => (
                <CarouselItem
                  key={hosp.id}
                  className="pl-4 sm:pl-6 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <div className="group relative bg-white rounded-2xl sm:rounded-3xl border border-[#e2eaeb] hover:border-[#0b5d63]/50 shadow-sm hover:shadow-xl transition-all duration-400 overflow-hidden flex flex-col justify-between h-full">
                    {/* Media Top Container */}
                    <div className="relative h-56 sm:h-60 w-full overflow-hidden bg-slate-100 shrink-0">
                      <Image
                        src={hosp.image}
                        alt={hosp.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      {/* Subtle Dark Gradient Overlay for Badges & Text Contrast */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#04272a]/85 via-black/20 to-transparent" />

                      {/* Top-Left: Accreditation Badge */}
                      <div className="absolute top-3.5 left-3.5 z-10">
                        <span className="px-2.5 py-1 rounded-full bg-[#04272a]/90 backdrop-blur-md text-[#e39b2d] text-[10px] sm:text-[11px] font-heading font-bold uppercase tracking-wider shadow-sm flex items-center gap-1.5 border border-[#e39b2d]/30">
                          <ShieldCheck className="w-3.5 h-3.5 text-[#e39b2d]" />
                          <span>{hosp.accreditation}</span>
                        </span>
                      </div>

                      {/* Top-Right: Rating Pill */}
                      <div className="absolute top-3.5 right-3.5 z-10">
                        <span className="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-slate-900 text-xs font-bold shadow-sm flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 fill-[#e39b2d] text-[#e39b2d]" />
                          <span>{hosp.rating.toFixed(1)}</span>
                        </span>
                      </div>

                      {/* Bottom-Left Image Stats: Bed Capacity & OTs */}
                      <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded-md bg-black/60 backdrop-blur-sm text-white text-[11px] font-medium flex items-center gap-1">
                          <Bed className="w-3 h-3 text-[#e39b2d]" />
                          <span>{hosp.beds}</span>
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-[#0b5d63]/90 backdrop-blur-sm text-teal-100 text-[11px] font-medium flex items-center gap-1">
                          <Building2 className="w-3 h-3 text-[#e39b2d]" />
                          <span>{hosp.ots}</span>
                        </span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between bg-white">
                      <div>
                        {/* Eyebrow Category */}
                        <p className="text-[11px] font-heading font-extrabold uppercase tracking-wider text-[#0b5d63] mb-1">
                          {hosp.category}
                        </p>

                        {/* Hospital Name */}
                        <h3 className="font-heading font-extrabold text-lg sm:text-xl text-slate-900 group-hover:text-[#0b5d63] transition-colors leading-snug mb-1.5 line-clamp-1">
                          {hosp.name}
                        </h3>

                        {/* Location */}
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-3">
                          <MapPin className="w-3.5 h-3.5 text-[#e39b2d] shrink-0" />
                          <span className="truncate">{hosp.location}</span>
                        </div>

                        {/* Specialty Tags */}
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {hosp.specialties.slice(0, 3).map((spec, sIdx) => (
                            <span
                              key={sIdx}
                              className="px-2.5 py-1 rounded-md bg-[#f0f8f9] text-[#0b5d63] border border-[#dbeff0] text-[11px] font-medium leading-none"
                            >
                              {spec}
                            </span>
                          ))}
                        </div>

                        {/* Technology & Airport Distance Box */}
                        <div className="bg-[#f8fafb] rounded-xl p-3 border border-slate-100 space-y-1.5 mb-5 text-xs">
                          <div className="flex items-start gap-2 text-slate-800">
                            <Sparkles className="w-3.5 h-3.5 text-[#0b5d63] shrink-0 mt-0.5" />
                            <span className="font-semibold line-clamp-1">{hosp.tech}</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-500 text-[11px]">
                            <Plane className="w-3.5 h-3.5 text-[#e39b2d] shrink-0" />
                            <span className="truncate">{hosp.airportDistance}</span>
                          </div>
                        </div>
                      </div>

                      {/* Card Footer Actions */}
                      <div className="pt-3 border-t border-slate-100 space-y-2">
                        <button
                          onClick={() => openIntake(hosp.name)}
                          className="w-full py-2.5 px-4 rounded-xl bg-[#0b5d63] hover:bg-[#073f43] active:scale-[0.98] text-white font-heading font-bold text-xs uppercase tracking-wider shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer group/btn"
                        >
                          <span>Check Hospital Availability</span>
                          <ArrowRight className="w-3.5 h-3.5 text-[#e39b2d] transition-transform group-hover/btn:translate-x-1" />
                        </button>

                        <Link
                          href="/hospitals"
                          className="w-full py-1 text-center text-xs font-semibold text-slate-600 hover:text-[#0b5d63] transition-colors flex items-center justify-center gap-1"
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
        </div>

        {/* Global Hospital Partnership Standards Banner */}
        <div className="mt-12 sm:mt-16 rounded-2xl sm:rounded-3xl bg-[#f0f8f9] border border-[#dbeff0] p-6 sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#0b5d63] text-white flex items-center justify-center shrink-0 shadow-sm">
                <ShieldCheck className="w-5 h-5 text-[#e39b2d]" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-sm text-slate-900">JCI & NABH Audited</h4>
                <p className="text-xs text-slate-600 leading-relaxed mt-1">
                  Surgeries conducted strictly in certified sterile modular OTs with zero infection compromises.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#0b5d63] text-white flex items-center justify-center shrink-0 shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-[#e39b2d]" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-sm text-slate-900">Zero Waiting Lists</h4>
                <p className="text-xs text-slate-600 leading-relaxed mt-1">
                  Priority admission and reserved surgical dates guaranteed within 24–48 hours of flight arrival.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#0b5d63] text-white flex items-center justify-center shrink-0 shadow-sm">
                <Award className="w-5 h-5 text-[#e39b2d]" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-sm text-slate-900">US-FDA Hardware</h4>
                <p className="text-xs text-slate-600 leading-relaxed mt-1">
                  Only authentic Stryker, Zimmer Biomet, Da Vinci, and Zeiss navigation systems utilized.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#0b5d63] text-white flex items-center justify-center shrink-0 shadow-sm">
                <Building2 className="w-5 h-5 text-[#e39b2d]" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-sm text-slate-900">Dedicated Global Desks</h4>
                <p className="text-xs text-slate-600 leading-relaxed mt-1">
                  Private lounges, airport limousine pickup, currency exchange, and medical visa facilitation.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-[#dbeff0] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs sm:text-sm text-slate-700 font-medium text-center sm:text-left">
              Looking for specialized hospital centers across North India, Delhi NCR, or Mumbai?
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Link
                href="/hospitals"
                className="w-full sm:w-auto px-7 py-3 rounded-full bg-[#0b5d63] hover:bg-[#073f43] text-white font-heading font-bold text-xs uppercase tracking-wider transition-all shadow-sm flex items-center justify-center gap-2"
              >
                <span>Explore All 15+ Partner Hospitals</span>
                <ArrowRight className="w-4 h-4 text-[#e39b2d]" />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

