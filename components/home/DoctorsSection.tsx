"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  GraduationCap,
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
  Video,
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
  education: string;
  fellowships: string;
  hospital: string;
  image: string;
  surgeries: string;
  successRate: string;
  technology: string;
  bio: string;
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
      education: "MBBS, MS (Orthopaedics), Fellowship in Joint Replacement",
      fellowships: "Adult Arthroplasty Fellow (UK & Germany)",
      hospital: "Fortis Hospital Mohali / Chandigarh Quaternary Hub",
      image: "/jatinder-singla.png",
      surgeries: "12,000+",
      successRate: "99.4% Joint Stability",
      technology: "Stryker Mako Robotic Joint Replacement & CT Computer Navigation",
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
      experience: "22+ Years Lead Practice",
      experienceYears: 22,
      education: "MBBS, MS (Ophthalmology), Cornea & Refractive Specialist",
      fellowships: "Fellow of International Council of Ophthalmology (FICO, London)",
      hospital: "Sangam Netralaya Super Speciality Eye Hospital, Mohali",
      image: "/ashish-ahuja.png",
      surgeries: "11,000+",
      successRate: "99.8% Visual Acuity",
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
      experience: "16+ Years Lead Practice",
      experienceYears: 16,
      education: "MBBS, MS (General Surgery), MCh (Plastic Surgery)",
      fellowships: "International Society of Aesthetic Plastic Surgery (ISAPS)",
      hospital: "Profile Aesthetic & Cosmetic Surgery Institute, Ludhiana / Chandigarh",
      image: "/vikas-gupta.png",
      surgeries: "4,500+",
      successRate: "99.2% Clinical Satisfaction",
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
      experience: "18+ Years Lead Practice",
      experienceYears: 18,
      education: "BDS, MDS (Prosthodontics) — PGIMER & Bern University",
      fellowships: "International Congress of Oral Implantologists (ICOI USA), Swiss ITI",
      hospital: "Fortis Hospital Quaternary Dental Implant Centre, Chandigarh",
      image: "/images/testimonials/doctor-portrait.jpg",
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

  const handleWhatsAppConsult = (doctor: DoctorProfile) => {
    const text = encodeURIComponent(
      `Hello, I would like to inquire about consulting with ${doctor.name} (${doctor.specialty}). Can you guide me on case review and availability?`
    );
    window.open(`https://wa.me/919876543210?text=${text}`, "_blank");
  };

  return (
    <section
      id="doctors"
      className="py-16 sm:py-24 bg-white relative border-t border-[#DCE6EB] font-sans"
    >
      <div className="max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8 w-full">

        {/* 01. Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 sm:mb-12 gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ECF4F7] border border-[#DCE6EB] text-[#0B5D68] text-xs font-heading font-bold uppercase tracking-wider mb-3.5 shadow-xs">
              <span className="h-2 w-2 rounded-full bg-[#14B8A6] animate-pulse" />
              <span>EXPERT SURGICAL DIRECTORS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] xl:text-[46px] font-heading font-extrabold text-[#0C2338] leading-[1.15] tracking-tight">
              Meet Our Senior Medical Directors.{" "}
              <span className="text-[#0e9d8d] block sm:inline">
                Celebrated Surgical Leads.
              </span>
            </h2>
            <p className="text-[#6B7C88] text-base sm:text-lg leading-relaxed font-normal mt-2.5 max-w-2xl">
              Audited department heads and chief surgeons with international fellowships, documented high-volume practice, and dedicated concierge coordination for overseas patients.
            </p>
          </div>

          {/* Header Controls: Slide Counter & Carousel Arrows */}
          <div className="flex items-center justify-between sm:justify-end gap-2.5 sm:gap-3 w-full sm:w-auto shrink-0">
            <Link
              href="/doctors"
              className="text-xs font-heading font-bold uppercase tracking-wider text-[#0B5D68] hover:text-[#0C2338] hover:underline flex items-center gap-1.5 transition-colors mr-1 sm:mr-2"
            >
              <span>Explore All Specialists</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <span className="text-xs font-semibold text-[#6B7C88] mr-1">
              {currentSlide + 1} / {totalSlides || doctors.length}
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={() => api?.scrollPrev()}
                disabled={!canScrollPrev}
                aria-label="Previous medical director"
                className={`w-10 h-10 rounded-full border border-[#DCE6EB] flex items-center justify-center transition-all cursor-pointer ${canScrollPrev
                  ? "bg-white hover:bg-[#ECF4F7] text-[#0C2338] shadow-xs active:scale-95"
                  : "bg-[#0e9d8d] text-slate-300 border-[#DCE6EB]/60 cursor-not-allowed opacity-50"
                  }`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => api?.scrollNext()}
                disabled={!canScrollNext}
                aria-label="Next medical director"
                className={`w-10 h-10 rounded-full border border-transparent flex items-center justify-center transition-all cursor-pointer ${canScrollNext
                  ? "bg-[#0e9d8d] hover:bg-[#07434B] text-white shadow-xs active:scale-95"
                  : "bg-[#0e9d8d] text-slate-300 border-[#DCE6EB]/60 cursor-not-allowed opacity-50"
                  }`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* 02. Auto-Sliding Grand Showcase Carousel (Pauses on Hover) */}
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
                  <div className="bg-white rounded-3xl border border-[#DCE6EB] shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-0 lg:min-h-[640px]">

                    {/* LEFT SIDE: Big Photographic Canvas */}
                    <div className="lg:col-span-5 relative w-full h-[320px] xs:h-[380px] sm:h-[480px] lg:h-full min-h-[320px] xs:min-h-[380px] sm:min-h-[480px] lg:min-h-[640px] bg-slate-900 overflow-hidden">
                      <Image
                        src={doc.image}
                        alt={doc.name}
                        fill
                        priority={index === 0}
                        sizes="(max-width: 1024px) 100vw, 42vw"
                        className="object-cover object-top transition-transform duration-700 ease-out hover:scale-105"
                      />

                      {/* Photographic Vignette Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0C2338]/95 via-[#0C2338]/25 to-transparent pointer-events-none" />

                      {/* Top-Left: Senior Accreditation Badge with Icon */}
                      <div className="absolute top-3.5 xs:top-4 sm:top-6 left-3.5 xs:left-4 sm:left-6 z-10">
                        <span className="px-3 xs:px-3.5 py-1.5 rounded-full bg-[#0C2338]/85 backdrop-blur-md text-white text-[10px] xs:text-[11px] font-heading font-bold uppercase tracking-wider shadow-md flex items-center gap-1.5 border border-white/20">
                          <ShieldCheck className="w-3.5 h-3.5 text-white" />
                          <span className="text-white">SENIOR SURGICAL LEAD</span>
                        </span>
                      </div>

                      {/* Top-Right: Verified Experience Badge with Icon (No Ratings) */}
                      <div className="absolute top-3.5 xs:top-4 sm:top-6 right-3.5 xs:right-4 sm:right-6 z-10">
                        <span className="px-2.5 xs:px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-[#0C2338] text-[11px] xs:text-xs font-heading font-bold shadow-md flex items-center gap-1.5 border border-[#DCE6EB]">
                          <Award className="w-3.5 h-3.5 text-[#F0A126]" />
                          <span>{doc.experience}</span>
                        </span>
                      </div>

                      {/* Bottom Image Info Card with Little Icons */}
                      <div className="absolute bottom-3.5 xs:bottom-4 sm:bottom-6 left-3.5 xs:left-4 sm:left-6 right-3.5 xs:right-4 sm:right-6 z-10">
                        <div className="p-3 xs:p-4 rounded-2xl bg-[#0C2338]/90 backdrop-blur-md border border-white/15 text-white shadow-xl space-y-1.5 xs:space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-[#ECF4F7]/70 uppercase tracking-wider font-heading font-semibold text-[9px] xs:text-[10px] flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-[#F0A126]" />
                              <span>QUATERNARY HUB</span>
                            </span>
                            <span className="font-semibold text-white text-right truncate max-w-[200px] text-[11px] xs:text-xs">
                              {doc.hospital}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-xs pt-1.5 border-t border-white/10">
                            <span className="text-[#ECF4F7]/70 uppercase tracking-wider font-heading font-semibold text-[9px] xs:text-[10px] flex items-center gap-1">
                              <Activity className="w-3 h-3 text-[#F0A126]" />
                              <span>SURGICAL VOLUME</span>
                            </span>
                            <span className="font-semibold text-[#F0A126] text-right text-[11px] xs:text-xs">
                              {doc.surgeries} Cases
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* RIGHT SIDE: Catchy Typography, Little Icons & Action Buttons */}
                    <div className="lg:col-span-7 p-5 xs:p-6 sm:p-8 lg:p-12 flex flex-col justify-between bg-white">
                      <div>
                        {/* Eyebrow Specialty Category with Icon */}
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ECF4F7] text-[#0B5D68] text-xs font-heading font-bold uppercase tracking-wider mb-2.5">
                          <Sparkles className="w-3 h-3 text-[#0B5D68]" />
                          <span>{doc.category}</span>
                        </div>

                        {/* Doctor Name */}
                        <h3 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-[34px] text-[#0C2338] leading-[1.2] tracking-tight mb-1.5">
                          {doc.name}
                        </h3>

                        {/* Full Designation with Award Icon */}
                        <p className="text-sm sm:text-base font-semibold text-[#0B5D68] mb-2 flex items-center gap-1.5">
                          <Award className="w-4 h-4 text-[#0B5D68] shrink-0" />
                          <span>{doc.specialty}</span>
                        </p>

                        {/* Hospital Location with MapPin Icon */}
                        <div className="flex items-center gap-2 text-xs sm:text-sm text-[#6B7C88] font-medium mb-5">
                          <MapPin className="w-4 h-4 text-[#0B5D68] shrink-0" />
                          <span>{doc.hospital}</span>
                        </div>

                        {/* 03 High-Impact Trust Metric Cards (Each with Little Icons) */}
                        <div className="grid grid-cols-3 gap-1.5 xs:gap-2.5 sm:gap-4 p-3 xs:p-3.5 sm:p-4 rounded-2xl bg-[#F5F7F6] border border-[#DCE6EB] mb-6">

                          {/* Metric 1: Surgeries with Activity Icon */}
                          <div>
                            <span className="text-[#6B7C88] font-heading font-bold text-[9px] xs:text-[10px] sm:text-xs uppercase tracking-wider flex items-center gap-1">
                              <Activity className="w-3 h-3 text-[#0B5D68]" />
                              <span>Procedures</span>
                            </span>
                            <span className="text-[#0C2338] font-heading font-extrabold text-sm xs:text-base sm:text-xl lg:text-2xl block mt-0.5">
                              {doc.surgeries}
                            </span>
                            <span className="text-[#0B5D68] text-[10px] xs:text-[11px] sm:text-xs font-semibold flex items-center gap-1 mt-0.5 truncate">
                              <CheckCircle2 className="w-3 h-3 text-[#14B8A6] shrink-0" />
                              <span>{doc.successRate}</span>
                            </span>
                          </div>

                          {/* Metric 2: Experience with Clock Icon */}
                          <div className="border-x border-[#DCE6EB] px-1.5 xs:px-2.5 sm:px-4">
                            <span className="text-[#6B7C88] font-heading font-bold text-[9px] xs:text-[10px] sm:text-xs uppercase tracking-wider flex items-center gap-1">
                              <Clock className="w-3 h-3 text-[#0B5D68]" />
                              <span>Experience</span>
                            </span>
                            <span className="text-[#0C2338] font-heading font-extrabold text-sm xs:text-base sm:text-xl lg:text-2xl block mt-0.5">
                              {doc.experienceYears}+ Yrs
                            </span>
                            <span className="text-[#0B5D68] text-[10px] xs:text-[11px] sm:text-xs font-semibold block truncate mt-0.5">
                              Director
                            </span>
                          </div>

                          {/* Metric 3: Credentials with GraduationCap Icon */}
                          <div>
                            <span className="text-[#6B7C88] font-heading font-bold text-[9px] xs:text-[10px] sm:text-xs uppercase tracking-wider flex items-center gap-1">
                              <GraduationCap className="w-3 h-3 text-[#0B5D68]" />
                              <span>Credentials</span>
                            </span>
                            <span className="text-[#0C2338] font-heading font-extrabold text-xs sm:text-sm lg:text-base block mt-0.5 line-clamp-1">
                              International
                            </span>
                            <span className="text-[#0B5D68] text-[10px] xs:text-[11px] sm:text-xs font-semibold block truncate mt-0.5">
                              {doc.fellowships.split("(")[0].trim()}
                            </span>
                          </div>
                        </div>

                        {/* Senior-Accessible Clear Bio Narrative */}
                        <p className="text-sm sm:text-base text-[#475467] leading-relaxed font-normal mb-5">
                          {doc.bio}
                        </p>

                        {/* Key Surgical Specializations with Little Procedure Bullet Icons */}
                        <div className="mb-5">
                          <p className="text-xs font-heading font-bold uppercase tracking-wider text-[#0C2338] mb-2 flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#0B5D68]" />
                            <span>Key Surgical Procedures:</span>
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {doc.keyProcedures.map((proc, sIdx) => (
                              <span
                                key={sIdx}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#ECF4F7] text-[#0B5D68] border border-[#DCE6EB] text-xs font-medium"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-[#14B8A6]" />
                                <span>{proc}</span>
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Technology & Credentials Box with Little Icons */}
                        <div className="bg-[#ECF4F7] rounded-2xl p-4 border border-[#DCE6EB] space-y-2.5 mb-6">

                          {/* Education with GraduationCap Icon */}
                          <div className="flex items-start gap-2.5 text-[#6B7C88] pt-2 border-t border-[#DCE6EB]/60">
                            <GraduationCap className="w-4 h-4 text-[#0B5D68] shrink-0 mt-0.5" />
                            <div className="text-xs text-[#475467]">
                              <strong className="text-[#0C2338] mr-1">Medical Education:</strong>
                              <span>{doc.education} · {doc.fellowships}</span>
                            </div>
                          </div>

                          {/* Video Consult Availability with Video Icon */}
                          <div className="flex items-center gap-2.5 text-[#0B5D68] pt-2 border-t border-[#DCE6EB]/60">
                            <Video className="w-4 h-4 text-[#0B5D68] shrink-0" />
                            <span className="text-xs font-semibold">
                              Live Video Consultations Available with Chief Specialist
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Catchy Action Buttons Area */}
                      <div className="pt-4 border-t border-[#DCE6EB] space-y-3">
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                          {/* Primary High-Intent Button 1 (Gold Accent) */}
                          <button
                            onClick={() => openIntake(`Doctor Consult — ${doc.name}`)}
                            className="px-4 sm:px-7 py-3.5 sm:py-4 rounded-xl bg-[#F0A126] hover:bg-[#db8e18] active:scale-[0.98] text-[#0C2338] font-heading font-bold text-xs sm:text-sm uppercase tracking-wider shadow-md shadow-[#F0A126]/20 transition-all cursor-pointer flex items-center justify-center gap-2 group/btn flex-1 text-center"
                          >
                            <Calendar className="w-4 h-4 text-[#0C2338] shrink-0" />
                            <span>Schedule Video Consult with {doc.name.split(" ")[1]}</span>
                            <ArrowRight className="w-4 h-4 text-[#0C2338] stroke-[2.4] transition-transform group-hover/btn:translate-x-1 shrink-0" />
                          </button>

                          {/* Secondary Action Button 2 (Medical Teal #0B5D68) */}
                          <button
                            onClick={() => handleWhatsAppConsult(doc)}
                            className="px-4 sm:px-6 py-3.5 sm:py-4 rounded-xl bg-[#0B5D68] hover:bg-[#07434B] active:scale-[0.98] text-white font-heading font-bold text-xs sm:text-sm uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 shrink-0 shadow-sm"
                          >
                            <MessageSquare className="w-4 h-4 text-[#fff] shrink-0" />
                            <span className="text-[#fff]">WhatsApp Care Desk</span>
                          </button>
                        </div>

                        <div className="flex items-center justify-between text-xs text-[#6B7C88] px-1">
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-[#0B5D68]" />
                            <span>Zero upfront fee · Response within 24 hours</span>
                          </span>
                          <Link
                            href="/doctors"
                            className="font-semibold text-[#0B5D68] hover:text-[#0C2338] hover:underline flex items-center gap-1 transition-colors"
                          >
                            <span>View Full Profile</span>
                            <ChevronRight className="w-3.5 h-3.5" />
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
