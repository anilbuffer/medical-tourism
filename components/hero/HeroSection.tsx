"use client";

import React from "react";
import Image from "next/image";
import { useCare } from "@/context/CareContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const HeroSection = () => {
  const { openIntake } = useCare();

  return (
    <section className="relative min-h-[80vh] flex flex-col justify-center pt-32 pb-24">
      {/* ── Background Image ── */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <Image
          src="/hero-image.png"
          alt="Personalized Medical Travel and Quaternary Care in India"
          fill
          priority
          className="object-cover object-center"
        />
        {/* Subtle black gradient overlay for text & navbar readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 lg:bg-gradient-to-l lg:from-black/85 lg:via-black/50 lg:to-transparent"></div>
      </div>

      {/* ── Main Hero Content ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="max-w-2xl ml-auto text-center lg:text-right">
          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-white mb-6 drop-shadow-md">
            World-Class Care.<br />
            Personally<br />
            Coordinated.
          </h1>

          {/* Supporting Narrative */}
          <p className="text-base sm:text-lg text-slate-100 font-medium leading-relaxed mb-8 drop-shadow-sm max-w-xl lg:ml-auto">
            Access India&apos;s top 1% quaternary hospital network and board-certified chief
            surgeons. Complete end-to-end medical travel, express visa, and
            dedicated personal coordination.
          </p>

          {/* Primary Action Buttons (Shadcn Button with brand variants) */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-end gap-4 mb-8">
            <Button
              variant="gold"
              size="xl"
              onClick={() => openIntake()}
              className="w-full sm:w-auto"
            >
              Send us the reports
            </Button>
            <Button
              variant="link"
              render={<a href="#journey" />}
              className="w-full sm:w-auto text-slate-200 hover:text-white underline underline-offset-4 text-sm font-semibold"
            >
              See how it works &rarr;
            </Button>
          </div>

          {/* Trust Highlights (Shadcn Badge with glass variant) */}
          <div className="flex flex-wrap items-center justify-center lg:justify-end gap-2.5 sm:gap-3 text-sm font-medium">
            <Badge variant="glass" size="lg" className="gap-1.5 px-3 py-1.5 text-white/95 border-white/20">
              <span className="text-vedara-cyan">🎁</span> Free assessment
            </Badge>
            <Badge variant="glass" size="lg" className="gap-1.5 px-3 py-1.5 text-white/95 border-white/20">
              <span className="text-vedara-cyan">🏥</span> You pay the hospital, never us
            </Badge>
            <Badge variant="glass" size="lg" className="gap-1.5 px-3 py-1.5 text-white/95 border-white/20">
              <span className="text-vedara-cyan">🚫</span> No obligation
            </Badge>
          </div>
        </div>
      </div>
    </section>
  );
};
