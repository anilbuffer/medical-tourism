import React from "react";
import { HeroSection } from "@/components/hero/HeroSection";
import { TrustStrip } from "@/components/hero/TrustStrip";
import { SpecialtiesSection } from "@/components/medical/SpecialtiesSection";
import { HospitalsSection } from "@/components/medical/HospitalsSection";
import { DoctorsSection } from "@/components/medical/DoctorsSection";
import { PatientJourney } from "@/components/journey/PatientJourney";
import { CostTransparency } from "@/components/pricing/CostTransparency";
import { HowWeArePaid } from "@/components/pricing/HowWeArePaid";
import { CareCoordination } from "@/components/concierge/CareCoordination";
import { TestimonialsSection } from "@/components/social/TestimonialsSection";
import { BlogSection } from "@/components/resources/BlogSection";
import { ConnectSection } from "@/components/trust/ConnectSection";

export default function HomePage() {
  return (
    <div className="w-full bg-vedara-offwhite">
      <HeroSection />
      <TrustStrip />
      <SpecialtiesSection />
      <HospitalsSection />
      <DoctorsSection />
      <PatientJourney />
      <CostTransparency />
      <HowWeArePaid />
      <CareCoordination />
      <TestimonialsSection />
      <BlogSection />
      <ConnectSection />
    </div>
  );
}
