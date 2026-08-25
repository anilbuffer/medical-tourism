"use client";

import React from "react";
import { HeroSection } from "@/components/hero/HeroSection";
import { TrustStrip } from "@/components/hero/TrustStrip";
import { QuickEntryCards } from "@/components/intake/QuickEntryCards";
import { IntakePreview } from "@/components/intake/IntakePreview";
import { PatientJourney } from "@/components/journey/PatientJourney";
import { SpecialtiesSection } from "@/components/medical/SpecialtiesSection";
import { DoctorsSection } from "@/components/medical/DoctorsSection";
import { HospitalsSection } from "@/components/medical/HospitalsSection";
import { CostTransparency } from "@/components/pricing/CostTransparency";
import { WhyIndiaSection } from "@/components/concierge/WhyIndiaSection";
import { ConciergeSection } from "@/components/concierge/ConciergeSection";
import { CoordinatorSpotlight } from "@/components/concierge/CoordinatorSpotlight";
import { CaseStudySection } from "@/components/journey/CaseStudySection";
import { MedicalOpinion } from "@/components/medical/MedicalOpinion";
import { GlobalSupport } from "@/components/trust/GlobalSupport";
import { WhatHappensNext } from "@/components/trust/WhatHappensNext";
import { TrustSafety } from "@/components/trust/TrustSafety";
import { FaqSection } from "@/components/trust/FaqSection";
import { FinalCtaSection } from "@/components/trust/FinalCtaSection";

export default function HomePage() {
  return (
    <div className="w-full">
      {/* 02. Hero Section */}
      <HeroSection />

      {/* Hero Trust Strip Overlay */}
      <TrustStrip />

      {/* 03. Quick Patient Entry */}
      <QuickEntryCards />

      {/* 04. “Start Your Care Journey” Intake Preview */}
      <IntakePreview />

      {/* 05. The Patient Journey */}
      <PatientJourney />

      {/* 06. Featured Specialties */}
      <SpecialtiesSection />

      {/* 07. Featured Doctors */}
      <DoctorsSection />

      {/* 08. Hospital Network */}
      <HospitalsSection />

      {/* 09. Treatment Cost Transparency */}
      <CostTransparency />

      {/* 10. Why India? Evidence-Driven Decision */}
      <WhyIndiaSection />

      {/* 11. Premium Medical Concierge (Dark Luxury) */}
      <ConciergeSection />

      {/* 12. “Meet Your Care Coordinator” (Human-Centered) */}
      <CoordinatorSpotlight />

      {/* 13. Realistic Patient Journey Story (Case Study Proof) */}
      <CaseStudySection />

      {/* 14. Medical Opinion Section */}
      <MedicalOpinion />

      {/* 15. International Patient Support */}
      <GlobalSupport />

      {/* 16. “What Happens After I Enquire?” */}
      <WhatHappensNext />

      {/* 17. Trust, Safety & Data Privacy */}
      <TrustSafety />

      {/* 18. FAQ Accordion */}
      <FaqSection />

      {/* 19. Final Conversion Section */}
      <FinalCtaSection />
    </div>
  );
}
