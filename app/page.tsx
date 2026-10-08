import React from "react";
import type { Metadata } from "next";
import { Quicksand } from "next/font/google";

import { Header } from "@/components/home/Header";
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
import { Footer } from "@/components/home/Footer";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Best Medical Service/Treatment in India | Your Medicare Trip",
  description:
    "An elevated, bespoke medical travel concierge variant helping international patients discover premier Indian surgical specialists, accredited hospitals, transparent all-inclusive costs, and compassionate 1-on-1 care coordination.",
};

export default function HomePage() {
  return (
    <div className={`w-full bg-white text-slate-900 selection:bg-[#007FFF]/20 selection:text-[#0070E0] relative font-sans home-alt-container ${quicksand.className}`}>
      
      <style>{`
        .home-alt-container,
        .home-alt-container .font-sans, 
        .home-alt-container .font-serif {
          font-family: ${quicksand.style.fontFamily} !important;
        }
      `}</style>

      {/* 
        Separation tentpole logic: 
        All-white backgrounds remove main tool for separating sections. 
        Separation here comes from a single hairline (#E4E9ED) 
        plus one full-bleed azure panel sitting at roughly a third of the way down, 
        acting as the page's tentpole. 
      */}

      <Header />

      <main>
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
      </main>

      <Footer />

    </div>
  );
}
