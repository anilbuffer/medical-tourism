"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  GraduationCap,
  Star,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  MapPin,
  Clock,
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useCare } from "@/context/CareContext";

export const DoctorsSection = () => {
  const { openIntake } = useCare();
  const [api, setApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [totalSlides, setTotalSlides] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const doctors = [
    {
      id: "dr-jatinder-singla",
      name: "Dr. Jatinder Singla",
      specialty: "Senior Director — Orthopaedic & Robotic Joint Surgery",
      category: "Quaternary & Robotic Arthroplasty",
      experience: "25+ Years Experience",
      experienceYears: 25,
      education: "MBBS, MS (Orthopaedics), Fellowship in Joint Replacement",
      fellowships: "Adult Arthroplasty Fellow (UK & Germany)",
      hospital: "Fortis Hospital Mohali / Chandigarh Quaternary Hub",
      image: "/jatinder-singla.png",
      rating: 4.9,
      ratingText: "4.9",
      reviewsCount: "480+ Reviews",
      surgeries: "12,000+",
      successRate: "99.4% Clinical Success",
      technology: "Stryker Mako Robotic Joint Replacement & Computer Navigation",
      bio: "Internationally acclaimed pioneer in computer-navigated and robotic joint replacement. Trained at apex quaternary centers in the UK and Germany, Dr. Singla has completed over 12,000 successful joint replacements for overseas patients with rapid same-week ambulation protocols.",
      keyProcedures: [
        "Mako Robotic Total Knee",
        "Direct Anterior Hip Replacement",
        "Complex Revision Arthroplasty",
        "Minimally Invasive Joint Care",
      ],
    },
    {
      id: "dr-ashish-ahuja",
      name: "Dr. Ashish Ahuja",
      specialty: "Director & Chief Surgeon — Ophthalmology & Contoura Refractive Surgery",
      category: "Laser Ophthalmology & Refractive",
      experience: "22+ Years Experience",
      experienceYears: 22,
      education: "MBBS, MS (Ophthalmology), Cornea & Refractive Specialist",
      fellowships: "Fellow of International Council of Ophthalmology (FICO, London)",
      hospital: "Sangam Netralaya Super Speciality Eye Hospital, Mohali",
      image: "/ashish-ahuja.png",
      rating: 5.0,
      ratingText: "5.0",
      reviewsCount: "520+ Reviews",
      surgeries: "11,000+",
      successRate: "99.8% 20/20 Visual Acuity",
      technology: "Zeiss Lumera 700 & Alcon WaveLight EX500 Femtosecond Laser",
      bio: "Celebrated ophthalmic innovator specializing in blade-free personalized laser vision correction and premium trifocal cataract surgery. Using Zeiss Lumera 700 and Alcon EX500 technology, Dr. Ahuja has restored 20/20 eyesight for over 11,000 international travelers with painless 10-minute outpatient procedures.",
      keyProcedures: [
        "Blade-Free Contoura LASIK",
        "SMILE Pro Refractive",
        "Custom Trifocal IOLs",
        "Femto Robotic Cataract",
      ],
    },
    {
      id: "dr-vikas-gupta",
      name: "Dr. Vikas Gupta",
      specialty: "Chief Consultant & Director — Aesthetic & Reconstructive Plastic Surgery",
      category: "Cosmetic & Plastic Surgery",
      experience: "16+ Years Experience",
      experienceYears: 16,
      education: "MBBS, MS (General Surgery), MCh (Plastic Surgery)",
      fellowships: "International Society of Aesthetic Plastic Surgery (ISAPS)",
      hospital: "Profile Aesthetic & Cosmetic Surgery Institute, Ludhiana / Chandigarh",
      image: "/vikas-gupta.png",
      rating: 4.9,
      ratingText: "4.9",
      reviewsCount: "390+ Reviews",
      surgeries: "4,500+",
      successRate: "99.2% Satisfaction Rate",
      technology: "4D High-Definition VASER Ultrasound & Micro-Aire Liposculpture",
      bio: "Renowned plastic surgeon and body contouring authority recognized for natural, harmonious aesthetic outcomes and undetectable scarring. Operating in private JCI-grade surgical suites, Dr. Gupta delivers bespoke facial rejuvenation and high-definition VASER contouring backed by 100% confidential VIP recovery protocols.",
      keyProcedures: [
        "4D High-Definition VASER",
        "Preservation Rhinoplasty",
        "Gynecomastia & Mommy Makeover",
        "Deep Plane Facelift",
      ],
    },
    {
      id: "dr-sameer-malhotra",
      name: "Dr. Sameer Malhotra",
      specialty: "Senior Director & Chief Implantologist — Digital Dentistry",
      category: "Digital Oral Implantology",
      experience: "18+ Years Experience",
      experienceYears: 18,
      education: "BDS, MDS (Prosthodontics) — PGIMER & Bern University",
      fellowships: "International Congress of Oral Implantologists (ICOI USA), Swiss ITI",
      hospital: "Fortis Hospital Quaternary Dental Implant Centre, Chandigarh",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=800",
      rating: 4.9,
      ratingText: "4.9",
      reviewsCount: "450+ Reviews",
      surgeries: "8,500+",
      successRate: "99.6% Osseointegration Rate",
      technology: "Swiss Straumann, German Nobel Biocare & 3D Guided CBCT Stents",
      bio: "Pioneering dental implant director recognized across Europe and the GCC for immediate-load All-on-4 and All-on-6 digital full-arch dental restorations. Specializes in computerized 3D stereolithographic guided surgery, allowing overseas travelers to receive fixed, permanent teeth in just 3 to 5 days with Swiss lifetime warranties.",
      keyProcedures: [
        "All-on-4 / All-on-6 Immediate Load",
        "3D Guided Keyhole Implants",
        "Full-Mouth Zirconia Bridges",
        "Painless Bone Grafting",
      ],
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
      id="doctors"
      className="py-16 sm:py-24 bg-white relative border-t border-[#e2eaeb] font-sans"
    >
      {/* 1580px Expanded Container Matching Header, Hero, and Hospitals */}
      <div className="max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8 w-full">

        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 sm:mb-10 gap-6">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#0B5D68]" />
              <p className="text-[#0B5D68] font-heading font-semibold text-xs uppercase tracking-[0.2em]">
                EXPERT SURGICAL DIRECTORS
              </p>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-[#0C2338] leading-[1.14]">
              Meet Our Senior Medical Directors
            </h2>
            <p className="text-[#6B7C88] text-xs sm:text-sm leading-relaxed font-body mt-2 max-w-2xl">
              Audited department heads and chief surgeons with international fellowships, documented high-volume success, and dedicated concierge coordination for overseas patients.
            </p>
          </div>

          {/* Header Right: Carousel Navigation (Only Access Point) */}
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/doctors"
              className="text-xs font-heading font-semibold text-[#0B5D68] hover:underline flex items-center gap-1.5 transition-colors mr-2"
            >
              <span>Explore All Specialists</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            {/* Slide Index Counter */}
            <span className="text-xs font-semibold text-[#6B7C88] mr-1">
              {currentSlide + 1} / {totalSlides || doctors.length}
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={() => api?.scrollPrev()}
                disabled={!canScrollPrev}
                aria-label="Previous medical director"
                className={`w-10 h-10 rounded-full border border-[#DCE6EB] flex items-center justify-center transition-all cursor-pointer ${
                  canScrollPrev
                    ? "bg-white hover:bg-slate-100 text-[#0C2338] shadow-sm"
                    : "bg-[#ECF4F7] text-slate-300 border-[#DCE6EB]/60 cursor-not-allowed opacity-50"
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => api?.scrollNext()}
                disabled={!canScrollNext}
                aria-label="Next medical director"
                className={`w-10 h-10 rounded-full border border-transparent flex items-center justify-center transition-all cursor-pointer ${
                  canScrollNext
                    ? "bg-[#0B5D68] hover:bg-[#094b54] text-white shadow-sm"
                    : "bg-[#ECF4F7] text-slate-300 border-[#DCE6EB]/60 cursor-not-allowed opacity-50"
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
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {doctors.map((doc, index) => (
                <CarouselItem key={doc.id} className="basis-full">
                  <div className="group relative bg-white rounded-2xl sm:rounded-3xl border border-[#DCE6EB] hover:border-[#0B5D68]/40 shadow-sm hover:shadow-xl transition-all duration-400 overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[520px] lg:min-h-[560px]">

                    {/* LEFT SIDE: Big Image in Full Section / Card Height */}
                    <div className="lg:col-span-5 relative w-full h-[380px] sm:h-[460px] lg:h-full min-h-[380px] lg:min-h-[560px] bg-slate-100 overflow-hidden">
                      <Image
                        src={doc.image}
                        alt={doc.name}
                        fill
                        sizes="(max-width: 1024px) 100vw, 42vw"
                        className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                        priority={index === 0}
                      />

                      {/* Subtle Dark Gradient Overlay matching hospital cards */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0C2338]/85 via-black/20 to-transparent" />

                      {/* Top-Left: Accreditation Badge */}
                      <div className="absolute top-3.5 left-3.5 z-10">
                        <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] sm:text-[11px] font-heading font-medium uppercase tracking-wider shadow-sm flex items-center gap-1.5 border border-white/20">
                          <ShieldCheck className="w-3.5 h-3.5 text-[#0B8F83]" />
                          <span>SENIOR MEDICAL DIRECTOR</span>
                        </span>
                      </div>

                      {/* Top-Right: Rating Pill */}
                      <div className="absolute top-3.5 right-3.5 z-10">
                        <span className="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#0C2338] text-xs font-bold shadow-sm flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 fill-[#F0A126] text-[#F0A126]" />
                          <span>{doc.ratingText}</span>
                        </span>
                      </div>

                      {/* Bottom-Left & Bottom-Right Image Stats: Surgeries & Experience */}
                      <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded-md bg-black/60 backdrop-blur-sm text-white text-[11px] font-medium flex items-center gap-1">
                          <Award className="w-3 h-3 text-slate-300" />
                          <span>{doc.surgeries} Surgeries</span>
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-sm text-white text-[11px] font-medium flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-300" />
                          <span>{doc.experience}</span>
                        </span>
                      </div>
                    </div>

                    {/* RIGHT SIDE: Card Body Matching Hospital Card Aesthetics */}
                    <div className="lg:col-span-7 p-6 sm:p-7 lg:p-8 flex-1 flex flex-col justify-between bg-white">
                      <div>
                        {/* Eyebrow Category */}
                        <p className="text-[11px] font-heading font-extrabold uppercase tracking-wider text-[#0B5D68] mb-1">
                          {doc.category}
                        </p>

                        {/* Doctor Name */}
                        <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-[#0C2338] group-hover:text-[#0B5D68] transition-colors leading-snug mb-1">
                          {doc.name}
                        </h3>

                        {/* Specialty Designation */}
                        <p className="text-xs sm:text-sm font-semibold text-[#6B7C88] mb-2">
                          {doc.specialty}
                        </p>

                        {/* Location */}
                        <div className="flex items-center gap-1.5 text-xs text-[#6B7C88] font-medium mb-3.5">
                          <MapPin className="w-3.5 h-3.5 text-[#2C7FAF] shrink-0" />
                          <span className="truncate">{doc.hospital}</span>
                        </div>

                        {/* Clean Metric Row */}
                        <div className="flex items-center gap-6 py-2.5 border-y border-[#DCE6EB]/60 mb-4 text-xs">
                          <div>
                            <span className="text-[#6B7C88] font-heading font-bold text-[10px] uppercase tracking-wider block">Surgeries</span>
                            <span className="text-[#0C2338] font-heading font-extrabold text-sm sm:text-base">{doc.surgeries}</span>
                            <span className="text-[#0B8F83] text-[11px] font-semibold ml-1.5">({doc.successRate})</span>
                          </div>
                          <div className="h-6 w-px bg-[#DCE6EB]" />
                          <div>
                            <span className="text-[#6B7C88] font-heading font-bold text-[10px] uppercase tracking-wider block">Rating</span>
                            <div className="flex items-center gap-1">
                              <span className="text-[#0C2338] font-heading font-extrabold text-sm sm:text-base">{doc.ratingText}</span>
                              <Star className="w-3 h-3 fill-[#F0A126] text-[#F0A126]" />
                              <span className="text-[#6B7C88] text-[11px] font-medium">({doc.reviewsCount})</span>
                            </div>
                          </div>
                          <div className="h-6 w-px bg-[#DCE6EB]" />
                          <div>
                            <span className="text-[#6B7C88] font-heading font-bold text-[10px] uppercase tracking-wider block">Practice</span>
                            <span className="text-[#0C2338] font-heading font-extrabold text-sm sm:text-base">{doc.experienceYears}+ Years</span>
                          </div>
                        </div>

                        {/* Specialty Tags */}
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {doc.keyProcedures.map((proc, sIdx) => (
                            <span
                              key={sIdx}
                              className="px-2.5 py-1 rounded-md bg-[#ECF4F7] text-[#0B5D68] border border-[#DCE6EB] text-[11px] font-medium leading-none"
                            >
                              {proc}
                            </span>
                          ))}
                        </div>

                        {/* Bio Narrative */}
                        <p className="text-xs sm:text-sm text-[#6B7C88] leading-relaxed font-body mb-4">
                          {doc.bio}
                        </p>

                        {/* Technology & Credentials Box */}
                        <div className="bg-[#FCFDFD] rounded-xl p-3 border border-[#DCE6EB] space-y-1.5 mb-5 text-xs text-[#6B7C88]">
                          <div className="flex items-start gap-2 text-[#0C2338]">
                            <Sparkles className="w-3.5 h-3.5 text-[#0B5D68] shrink-0 mt-0.5" />
                            <span className="font-semibold line-clamp-1">{doc.technology}</span>
                          </div>
                          <div className="flex items-center gap-2 text-[#6B7C88] text-[11px]">
                            <GraduationCap className="w-3.5 h-3.5 text-[#2C7FAF] shrink-0" />
                            <span className="truncate">{doc.education} · {doc.fellowships}</span>
                          </div>
                        </div>
                      </div>

                      {/* Card Footer Actions */}
                      <div className="pt-3 border-t border-[#DCE6EB]/60 space-y-2">
                        <button
                          onClick={() => openIntake(doc.name)}
                          className="w-full py-2.5 px-4 rounded-xl bg-[#0B5D68] hover:bg-[#094b54] active:scale-[0.98] text-white font-heading font-bold text-xs uppercase tracking-wider shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer group/btn"
                        >
                          <span>Schedule Video Consult</span>
                          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                        </button>

                        <Link
                          href="/doctors"
                          className="w-full py-1 text-center text-xs font-semibold text-[#6B7C88] hover:text-[#0B5D68] transition-colors flex items-center justify-center gap-1"
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

      </div>
    </section>
  );
};

