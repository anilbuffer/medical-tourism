import React from "react";
import type { Metadata } from "next";
import { AltHeroSection } from "@/components/home-alt/AltHeroSection";
import { AltSpecialtiesSection } from "@/components/home-alt/AltSpecialtiesSection";
import { AltHospitalsSection } from "@/components/home-alt/AltHospitalsSection";
import { AltDoctorsSection } from "@/components/home-alt/AltDoctorsSection";
import { AltPatientJourney } from "@/components/home-alt/AltPatientJourney";
import { AltDeclinePolicy } from "@/components/home-alt/AltDeclinePolicy";
import { AltCostTransparency } from "@/components/home-alt/AltCostTransparency";
import { AltCareCoordination } from "@/components/home-alt/AltCareCoordination";
import { AltTestimonialsSection } from "@/components/home-alt/AltTestimonialsSection";
import { AltBlogSection } from "@/components/home-alt/AltBlogSection";
import { AltConnectSection } from "@/components/home-alt/AltConnectSection";
import { AltQuickNav } from "@/components/home-alt/AltQuickNav";

export const metadata: Metadata = {
  title: "Alternative Experience | International Care Concierge — Your Medicare Trip",
  description:
    "An elevated, bespoke medical travel concierge variant helping international patients discover premier Indian surgical specialists, accredited hospitals, transparent all-inclusive costs, and compassionate 1-on-1 care coordination.",
  keywords: [
    "Medical Tourism India",
    "International Patient Concierge",
    "Robotic Surgery India",
    "Accredited Hospitals India",
    "Cost Transparency Medical Travel",
    "JCI Hospitals India",
  ],
};

export default function HomeAlternativePage() {
  return (
    <div className="w-full bg-[#030718] text-white selection:bg-vedara-cyan/30 selection:text-vedara-cyan relative overflow-x-clip">
      {/* Global Ambient Aurora Atmosphere */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Subtle architectural dot grid pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.04)_1px,transparent_0)] [background-size:32px_32px] opacity-70" />
        
        {/* Top cyan-sapphire atmospheric glow */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-gradient-to-b from-vedara-cyan/10 via-vedara-blue/15 to-transparent blur-[160px] opacity-60" />
        
        {/* Mid-page indigo warm gold accent glow */}
        <div className="absolute top-[35%] right-[-10%] w-[800px] h-[800px] bg-gradient-to-br from-vedara-blue/10 via-vedara-gold/5 to-transparent blur-[180px] opacity-50" />
        
        {/* Lower page deep teal emerald radiance */}
        <div className="absolute top-[70%] left-[-10%] w-[900px] h-[900px] bg-gradient-to-tr from-teal-500/8 via-vedara-cyan/10 to-transparent blur-[200px] opacity-50" />
      </div>

      <div className="relative z-10">
        {/* 1. Hero Section with Live Assessment Configurator */}
        <AltHeroSection />

        {/* 2. Specialties Section with Bento Category Showcase */}
        <AltSpecialtiesSection />

        {/* 3. Hospitals Section with Verifiable Accreditations & Volume */}
        <AltHospitalsSection />

        {/* 4. Doctors Section with Fellowship Details & 24h Telehealth */}
        <AltDoctorsSection />

        {/* 5. Patient Journey with Interactive 6-Stage Milestone Stepper */}
        <AltPatientJourney />

        {/* 6. Decline Policy Ethical Seal */}
        <AltDeclinePolicy />

        {/* 7. Cost Transparency with Real-Time Calculator & Benchmark Table */}
        <AltCostTransparency />

        {/* 8. Care Coordination (DIY vs With Us) */}
        <AltCareCoordination />

        {/* 9. Verified Patient Testimonials & Video Stories */}
        <AltTestimonialsSection />

        {/* 10. Clinical Blog, News & Editorial Guides */}
        <AltBlogSection />

        {/* 11. Connect & Encrypted Medical Record Intake Portal */}
        <AltConnectSection />

        {/* 12. Floating Navigation Assistant */}
        <AltQuickNav />
      </div>
    </div>
  );
}
