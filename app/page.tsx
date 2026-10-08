import React from "react";
import type { Metadata } from "next";

import { HeroSection } from "@/components/home/HeroSection";
import { SpecialtiesSection } from "@/components/home/SpecialtiesSection";
import { HospitalsSection } from "@/components/home/HospitalsSection";
import { DoctorsSection } from "@/components/home/DoctorsSection";
import { PatientJourney } from "@/components/home/PatientJourney";
import { DeclinePolicy } from "@/components/home/DeclinePolicy";
import { CostTransparency } from "@/components/home/CostTransparency";
import { CareCoordination } from "@/components/home/CareCoordination";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { BlogSection } from "@/components/home/BlogSection";
import { ConnectSection } from "@/components/home/ConnectSection";

export const metadata: Metadata = {
  title: "Best Medical Service & Treatments in India | Your Medicare Trip",
  description:
    "An elevated, bespoke medical travel concierge helping international patients discover premier Indian surgical specialists, accredited hospitals, transparent all-inclusive costs, and compassionate 1-on-1 care coordination.",
};

export default function HomePage() {
  return (
    <div className="w-full bg-[#f8fafb] text-[#1a2e30] selection:bg-[#e39b2d]/30 selection:text-[#0b5d63] relative font-sans">
      <HeroSection />
      <SpecialtiesSection />
      <HospitalsSection />
      <DoctorsSection />
      <PatientJourney />
      <DeclinePolicy />
      <CostTransparency />
      <CareCoordination />
      <TestimonialsSection />
      <BlogSection />
      <ConnectSection />
    </div>
  );
}
