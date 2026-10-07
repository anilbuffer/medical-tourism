import React from "react";
import type { Metadata } from "next";

import { Header1 } from "./components/Header1";
import { HeroSection1 } from "./components/HeroSection1";
import { SpecialtiesSection1 } from "./components/SpecialtiesSection1";
import { HospitalsSection1 } from "./components/HospitalsSection1";
import { DoctorsSection1 } from "./components/DoctorsSection1";
import { PatientJourney1 } from "./components/PatientJourney1";
import { DeclinePolicy1 } from "./components/DeclinePolicy1";
import { CostTransparency1 } from "./components/CostTransparency1";
import { CareCoordination1 } from "./components/CareCoordination1";
import { TestimonialsSection1 } from "./components/TestimonialsSection1";
import { BlogSection1 } from "./components/BlogSection1";
import { ConnectSection1 } from "./components/ConnectSection1";
import { Footer1 } from "./components/Footer1";

export const metadata: Metadata = {
  title: "Best Medical Service/Treatment in India | Your Medicare Trip",
  description:
    "An elevated, bespoke medical travel concierge variant helping international patients discover premier Indian surgical specialists, accredited hospitals, transparent all-inclusive costs, and compassionate 1-on-1 care coordination.",
};

export default function HomeAlternative1Page() {
  return (
    <div className="w-full bg-white text-slate-900 selection:bg-[#007FFF]/20 selection:text-[#0070E0] relative font-sans">
      
      {/* 
        Separation tentpole logic: 
        All-white backgrounds remove main tool for separating sections. 
        Separation here comes from a single hairline (#E4E9ED) 
        plus one full-bleed azure panel sitting at roughly a third of the way down, 
        acting as the page's tentpole. 
      */}

      <Header1 />

      <main>
        <HeroSection1 />
        
        <SpecialtiesSection1 />

        <HospitalsSection1 />

        <DoctorsSection1 />

        <PatientJourney1 />

        <DeclinePolicy1 />

        <CostTransparency1 />

        <CareCoordination1 />

        <TestimonialsSection1 />

        <BlogSection1 />

        <ConnectSection1 />
      </main>

      <Footer1 />

    </div>
  );
}
