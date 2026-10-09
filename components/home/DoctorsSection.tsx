"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  MapPin,
  Clock,
  MessageSquare,
  CheckCircle2,
  Calendar,
  Activity,
  GraduationCap,
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useCare } from "@/context/CareContext";

export interface DoctorProfile {
  id: string;
  name: string;
  specialty: string;
  category: string;
  experience: string;
  experienceYears: number;
  hospital: string;
  image: string;
  surgeries: string;
  successRate: string;
  shortBio: string;
  keyProcedures: string[];
}

export const DoctorsSection = () => {
  const { openIntake } = useCare();
  const [api, setApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [totalSlides, setTotalSlides] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const doctors: DoctorProfile[] = [
    {
      id: "dr-jatinder-singla",
      name: "Dr. Jatinder Singla",
      specialty: "Senior Director — Orthopaedic & Robotic Joint Surgery",
      category: "Quaternary & Robotic Arthroplasty",
      experience: "25+ Years Lead Practice",
      experienceYears: 25,
      hospital: "Fortis Hospital Mohali / Chandigarh Quaternary Hub",
      image: "/jatinder-singla.png",
      surgeries: "12,000+",
      successRate: "99.4% Joint Stability",
      shortBio:
        "Trained at apex quaternary centers in the UK and Germany, Dr. Singla has completed over 12,000 successful robotic joint replacements with same-week ambulation protocols.",
      keyProcedures: [
        "Mako Robotic Total Knee",
        "Direct Anterior Hip Replacement",
        "Complex Revision Arthroplasty",
      ],
    },
    {
      id: "dr-ashish-ahuja",
      name: "Dr. Ashish Ahuja",
      specialty: "Director & Chief Surgeon — Ophthalmology & Refractive Surgery",
      category: "Laser Ophthalmology & Refractive",
      experience: "22+ Years Lead Practice",
      experienceYears: 22,
      hospital: "Sangam Netralaya Super Speciality Eye Hospital",
      image: "/ashish-ahuja.png",
      surgeries: "11,000+",
      successRate: "99.8% Visual Acuity",
      shortBio:
        "Fellow of the International Council of Ophthalmology (London) specializing in blade-free Contoura Vision LASIK and custom trifocal lenses with painless outpatient protocols.",
      keyProcedures: [
        "Blade-Free Contoura LASIK",
        "SMILE Pro Refractive",
        "Custom Trifocal IOLs",
      ],
    },
    {
      id: "dr-vikas-gupta",
      name: "Dr. Vikas Gupta",
      specialty: "Chief Consultant & Director — Aesthetic & Reconstructive Surgery",
      category: "Cosmetic & Plastic Surgery",
      experience: "16+ Years Lead Practice",
      experienceYears: 16,
      hospital: "Profile Aesthetic & Cosmetic Surgery Institute",
      image: "/vikas-gupta.png",
      surgeries: "4,500+",
      successRate: "99.2% Satisfaction",
      shortBio:
        "International aesthetic surgery authority delivering bespoke facial rejuvenation and high-definition VASER body contouring backed by 100% confidential VIP recovery protocols.",
      keyProcedures: [
        "4D High-Definition VASER",
        "Preservation Rhinoplasty",
        "Deep Plane Facelift",
      ],
    },
    {
      id: "dr-sameer-malhotra",
      name: "Dr. Sameer Malhotra",
      specialty: "Senior Director & Chief Implantologist — Digital Dentistry",
      category: "Digital Oral Implantology",
      experience: "18+ Years Lead Practice",
      experienceYears: 18,
      hospital: "Fortis Hospital Quaternary Dental Implant Centre",
      image: "/images/testimonials/doctor-portrait.jpg",
      surgeries: "8,500+",
      successRate: "99.6% Success",
      shortBio:
        "Pioneering full-arch dental director recognized across Europe for immediate-load All-on-4 and All-on-6 digital restorations with Swiss lifetime implant warranties.",
      keyProcedures: [
        "All-on-4 / All-on-6 Immediate Load",
        "3D Guided Keyhole Implants",
        "Full-Mouth Zirconia Bridges",
      ],
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

  // Auto-slide functionality (every 5 seconds, pauses on user hover)
  useEffect(() => {
    if (!api || isPaused) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [api, isPaused]);

  return (
    <section
      id="doctors"
      className="py-20 sm:py-28 lg:py-32 bg-[#FCFDFD] relative border-t border-[#DCE6EB] font-sans"
    >
      <div className="max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Section Header: Breathable Typography */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ECF4F7] border border-[#DCE6EB] text-[#0B5D68] text-xs font-heading font-bold uppercase tracking-wider mb-4 shadow-xs">
              <span className="h-2 w-2 rounded-full bg-[#0B5D68] animate-pulse" />
              <span>EXPERT SURGICAL DIRECTORS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-heading font-extrabold text-[#0C2338] leading-[1.15] tracking-tight">
              Meet Our Senior Medical Leads.{" "}
              <span className="text-[#0B5D68] block sm:inline">
                Celebrated Directors.
              </span>
            </h2>
            <p className="text-[#6B7C88] text-base sm:text-lg leading-relaxed font-normal mt-3">
              Audited department heads and chief surgeons with international fellowships and documented high-volume outcomes.
            </p>
          </div>

          {/* Header Controls */}
          <div className="flex items-center gap-4 sm:gap-6 shrink-0">
            <Link
              href="/doctors"
              className="text-xs font-heading font-bold uppercase tracking-wider text-[#0B5D68] hover:text-[#0C2338] hover:underline flex items-center gap-1.5 transition-colors"
            >
              <span>Explore All Specialists</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <span className="text-xs font-semibold text-[#6B7C88]">
              {currentSlide + 1} / {totalSlides || doctors.length}
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={() => api?.scrollPrev()}
                disabled={!canScrollPrev}
                aria-label="Previous medical director"
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
                aria-label="Next medical director"
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

        {/* Grand Showcase Carousel */}
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
            <CarouselContent>
              {doctors.map((doc, index) => (
                <CarouselItem key={doc.id} className="basis-full">
                  <div className="bg-white rounded-3xl border border-[#DCE6EB] shadow-xl shadow-slate-200/50 overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[520px] lg:min-h-[580px]">

                    {/* LEFT SIDE: Big Photographic Canvas */}
                    <div className="lg:col-span-5 relative w-full h-[360px] sm:h-[440px] lg:h-full min-h-[360px] lg:min-h-[580px] bg-slate-900 overflow-hidden">
                      <Image
                        src={doc.image}
                        alt={doc.name}
                        fill
                        priority={index === 0}
                        sizes="(max-width: 1024px) 100vw, 42vw"
                        className="object-cover object-top transition-transform duration-700 ease-out hover:scale-105"
                      />

                      {/* Subtle Photographic Vignette */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0C2338]/90 via-[#0C2338]/20 to-transparent pointer-events-none" />

                      {/* Top-Left: Senior Accreditation Badge */}
                      <div className="absolute top-4 sm:top-6 left-4 sm:left-6 z-10">
                        <span className="px-3.5 py-1.5 rounded-full bg-[#0C2338]/85 backdrop-blur-md text-white text-[11px] font-heading font-bold uppercase tracking-wider shadow-sm flex items-center gap-1.5 border border-white/20">
                          <ShieldCheck className="w-3.5 h-3.5 text-[#F0A126]" />
                          <span>SURGICAL LEAD</span>
                        </span>
                      </div>

                      {/* Bottom Hospital & Volume Card */}
                      <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 z-10">
                        <div className="p-4 rounded-2xl bg-[#0C2338]/85 backdrop-blur-md border border-white/15 text-white shadow-lg space-y-1.5">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-white/70 uppercase tracking-wider font-heading font-semibold text-[10px]">
                              Quaternary Hospital
                            </span>
                            <span className="font-semibold text-white text-right truncate max-w-[200px]">
                              {doc.hospital}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-xs pt-1.5 border-t border-white/10">
                            <span className="text-white/70 uppercase tracking-wider font-heading font-semibold text-[10px]">
                              Documented Experience
                            </span>
                            <span className="font-semibold text-[#F0A126]">
                              {doc.experience}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* RIGHT SIDE: Concise Editorial Copy & One Primary CTA */}
                    <div className="lg:col-span-7 p-7 sm:p-10 lg:p-12 flex flex-col justify-between bg-white">
                      <div>
                        {/* Eyebrow Specialty Category */}
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ECF4F7] text-[#0B5D68] text-xs font-heading font-bold uppercase tracking-wider mb-2.5">
                          <Sparkles className="w-3 h-3 text-[#0B5D68]" />
                          <span>{doc.category}</span>
                        </div>

                        {/* Doctor Name */}
                        <h3 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-[34px] text-[#0C2338] leading-tight tracking-tight mb-1.5">
                          {doc.name}
                        </h3>

                        {/* Full Designation */}
                        <p className="text-sm sm:text-base font-semibold text-[#0B5D68] mb-5 flex items-center gap-1.5">
                          <Award className="w-4 h-4 text-[#0B5D68] shrink-0" />
                          <span>{doc.specialty}</span>
                        </p>

                        {/* 3 High-Impact Trust Metric Cards */}
                        <div className="grid grid-cols-3 gap-3 sm:gap-4 p-4 rounded-2xl bg-[#FAFCFD] border border-[#DCE6EB] mb-6">
                          <div>
                            <span className="text-[#6B7C88] font-heading font-bold text-[10px] sm:text-xs uppercase tracking-wider block">
                              Surgeries
                            </span>
                            <span className="text-[#0C2338] font-heading font-extrabold text-lg sm:text-xl block mt-0.5">
                              {doc.surgeries}
                            </span>
                          </div>

                          <div className="border-x border-[#DCE6EB] px-3 sm:px-4">
                            <span className="text-[#6B7C88] font-heading font-bold text-[10px] sm:text-xs uppercase tracking-wider block">
                              Clinical Success
                            </span>
                            <span className="text-[#0B5D68] font-heading font-extrabold text-lg sm:text-xl block mt-0.5">
                              {doc.successRate}
                            </span>
                          </div>

                          <div>
                            <span className="text-[#6B7C88] font-heading font-bold text-[10px] sm:text-xs uppercase tracking-wider block">
                              Lead Practice
                            </span>
                            <span className="text-[#0C2338] font-heading font-extrabold text-lg sm:text-xl block mt-0.5">
                              {doc.experienceYears}+ Years
                            </span>
                          </div>
                        </div>

                        {/* Concise 1–2 Line Bio */}
                        <p className="text-sm sm:text-base text-[#475467] leading-relaxed font-normal mb-6">
                          {doc.shortBio}
                        </p>

                        {/* Key Surgical Procedures (3 Clean Tags) */}
                        <div className="mb-6">
                          <p className="text-xs font-heading font-bold uppercase tracking-wider text-[#0C2338] mb-2.5">
                            Key Procedures:
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {doc.keyProcedures.map((proc, sIdx) => (
                              <span
                                key={sIdx}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#ECF4F7] text-[#0B5D68] border border-[#DCE6EB] text-xs font-medium"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-[#0B5D68]" />
                                <span>{proc}</span>
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Catchy Action Area: One Primary CTA */}
                      <div className="pt-6 border-t border-[#DCE6EB]">
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-3">
                          <button
                            onClick={() => openIntake(`Doctor Consult — ${doc.name}`)}
                            className="px-8 py-4 rounded-xl bg-[#F0A126] hover:bg-[#db8e18] active:scale-[0.98] text-[#0C2338] font-heading font-bold text-xs sm:text-sm uppercase tracking-wider shadow-md shadow-[#F0A126]/20 transition-all cursor-pointer flex items-center justify-center gap-2 group/btn flex-1"
                          >
                            <Calendar className="w-4 h-4 text-[#0C2338]" />
                            <span>Schedule Video Consult with {doc.name.split(" ")[1]}</span>
                            <ArrowRight className="w-4 h-4 text-[#0C2338] stroke-[2.4] transition-transform group-hover/btn:translate-x-1" />
                          </button>
                        </div>

                        <div className="flex items-center justify-between text-xs text-[#6B7C88] px-1">
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-[#0B5D68]" />
                            <span>Zero upfront fee · Written second opinion in 24–48 hours</span>
                          </span>
                          <Link
                            href="/doctors"
                            className="font-semibold text-[#0B5D68] hover:text-[#0C2338] hover:underline"
                          >
                            Full Profile &rarr;
                          </Link>
                        </div>
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
