"use client";

import React from "react";
import { HeroSection } from "@/components/hero/HeroSection";
import { TreatmentQuickFinder } from "@/components/hero/TreatmentQuickFinder";
import { TrustStrip } from "@/components/hero/TrustStrip";
import { QuickEntryCards } from "@/components/intake/QuickEntryCards";
import { IntakePreview } from "@/components/intake/IntakePreview";
import { PatientJourney } from "@/components/journey/PatientJourney";
import { PopularTreatments } from "@/components/medical/PopularTreatments";
import { SpecialtiesSection } from "@/components/medical/SpecialtiesSection";
import { DoctorsSection } from "@/components/medical/DoctorsSection";
import { HospitalsSection } from "@/components/medical/HospitalsSection";
import { CostTransparency } from "@/components/pricing/CostTransparency";
import { BlogSection } from "@/components/resources/BlogSection";
import { ConciergeSection } from "@/components/concierge/ConciergeSection";
import { CoordinatorSpotlight } from "@/components/concierge/CoordinatorSpotlight";
import { CaseStudySection } from "@/components/journey/CaseStudySection";
import { GlobalSupport } from "@/components/trust/GlobalSupport";
import { TrustSafety } from "@/components/trust/TrustSafety";
import { FaqSection } from "@/components/trust/FaqSection";
import { FinalCtaSection } from "@/components/trust/FinalCtaSection";

export default function HomePage() {
  return (
    <div className="w-full">
      {/* 01. Hero Banner Section */}
      <HeroSection />

      {/* 02. Global Trust & Accreditation Strip */}
      <TrustStrip />

      {/* 03. Instant Treatment & Cost Quick-Finder (Dedicated Section) */}
      <TreatmentQuickFinder />

      {/* 04. Quick Patient Entry Pathways */}
      <QuickEntryCards />

      {/* 05. “Start Your Care Journey” Intake Preview */}
      <IntakePreview />

      {/* 05. The Patient Journey */}
      <PatientJourney />

      {/* 06. Popular Treatments (Priority Services) */}
      <PopularTreatments />

      {/* 07. Featured Specialties */}
      <SpecialtiesSection />

      {/* 07. Featured Doctors */}
      <DoctorsSection />

      {/* 08. Hospital Network */}
      <HospitalsSection />

      {/* 09. Treatment Cost Transparency */}
      <CostTransparency />

      {/* 10. Guides & Resources (Blog) */}
      <BlogSection />

      {/* 11. Premium Medical Concierge (Dark Luxury) */}
      <ConciergeSection />

      {/* 12. “Meet Your Care Coordinator” (Human-Centered) */}
      <CoordinatorSpotlight />

      {/* 13. Realistic Patient Journey Story (Case Study Proof) */}
      <CaseStudySection />

      {/* 14. International Patient Support */}
      <GlobalSupport />

      {/* 15. Trust, Safety & Data Privacy */}
      <TrustSafety />

      {/* 16. FAQ Accordion */}
      <FaqSection />

      {/* 17. Final Conversion Section */}
      <FinalCtaSection />
    </div>
  );
}
