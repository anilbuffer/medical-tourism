import React from "react";
import type { Metadata } from "next";

import { HeroSection } from "@/components/home/HeroSection";
import { TrustBar } from "@/components/home/TrustBar";
import { SpecialtiesSection } from "@/components/home/SpecialtiesSection";
import { WhyUsSection } from "@/components/home/WhyUsSection";
import { HospitalsSection } from "@/components/home/HospitalsSection";
import { DoctorsSection } from "@/components/home/DoctorsSection";
import { PatientJourney } from "@/components/home/PatientJourney";
import { StayPlansSection } from "@/components/home/StayPlansSection";
import { CostTransparency } from "@/components/home/CostTransparency";
import { CareCoordination } from "@/components/home/CareCoordination";
import { BlogSection } from "@/components/home/BlogSection";
import { ConnectSection } from "@/components/home/ConnectSection";

export const metadata: Metadata = {
  title: "Your Journey to Better Health Starts Here | Your Medicare Trip",
  description:
    "Access experienced specialists and leading hospitals in India, with personalized coordination from your first medical review through treatment and recovery.",
};

export default function HomePage() {
  return (
    <div className="w-full bg-white text-[#102B46] selection:bg-[#087F79]/20 selection:text-[#102B46] relative font-sans">
      {/* SECTION 01 · HERO */}
      <HeroSection />

      {/* SECTION 02 · TRUST BAR */}
      <TrustBar />

      {/* SECTION 03 · TREATMENTS */}
      <SpecialtiesSection />

      {/* SECTION 04 · WHY YOURMEDICARETRIP */}
      <WhyUsSection />

      {/* SECTION 05 · HOSPITALS */}
      <HospitalsSection />

      {/* SECTION 06 · DOCTORS */}
      <DoctorsSection />

      {/* SECTION 07 · PATIENT JOURNEY */}
      <PatientJourney />

      {/* SECTION 08 · STAY & TRAVEL */}
      <StayPlansSection />

      {/* SECTION 09 · TREATMENT COSTS */}
      <CostTransparency />

      {/* SECTION 10 · AFTERCARE */}
      <CareCoordination />

      {/* SECTION 11 · INSIGHTS */}
      <BlogSection />

      {/* SECTION 13 · FINAL CONVERSION */}
      <ConnectSection />
    </div>
  );
}
