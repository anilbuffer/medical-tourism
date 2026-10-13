"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Sparkles, Mountain } from "lucide-react";
import { useCare } from "@/context/CareContext";

export const StayPlansSection: React.FC = () => {
  const { openIntake } = useCare();

  const essentialInclusions = [
    {
      title: "Vetted Hotel Close to Hospital",
      desc: "Quiet 3–4 star suite with elevator, room service & sanitisation",
    },
    {
      title: "Airport Pickup & Return Drop",
      desc: "Private AC vehicle, wheelchair accommodation available",
    },
    {
      title: "All Clinical Transfers",
      desc: "Pre-op labs, surgeon visits, scans and checkups",
    },
    {
      title: "One Family Companion Included",
      desc: "Companion bed in hospital room & meals during admission",
    },
    {
      title: "Daily In-Person Concierge Visit",
      desc: "Your named coordinator handles all scheduling & questions",
    },
  ];

  const premiumInclusions = [
    {
      title: "5-Star Luxury Hotel Accommodation",
      desc: "Hyatt, Taj or Marriott partner property for you & companion",
    },
    {
      title: "Dedicated Chauffeur & Luxury Vehicle On-Call",
      desc: "Exclusive private SUV on call throughout your entire stay",
    },
    {
      title: "VIP Fast-Track Airport Meet & Greet",
      desc: "Immigration escort and lounge access upon landing",
    },
  ];

  return (
    <section id="stay" className="relative py-16 sm:py-20 lg:py-24 bg-white border-b border-[#DCE5EB] overflow-hidden">

      {/* Background Luxury Hotel Suite Image & Soft Gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <Image
          src="/images/luxury-hotel-stay.jpg"
          alt="5-star luxury recovery suite"
          fill
          priority
          sizes="100vw"
          className="object-cover object-right"
        />
        {/* Horizontal gradient overlay: white fade on left for cards readability, open image on right */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 via-50% to-transparent" />
        {/* Vertical gradient on small screens to ensure full legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/95 to-white/90 lg:hidden" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF5F4] border border-[#DCE5EB] text-xs font-semibold text-[#087F79] mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#087F79]" />
              <Sparkles className="w-3.5 h-3.5 text-[#087F79]" />
              <span className="uppercase tracking-wider font-bold">Accommodation &amp; Recovery Plans</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#102B46] tracking-tight leading-tight">
              Choose How You Want to Stay.
            </h2>

            <p className="text-sm sm:text-base text-[#627486] mt-3.5 leading-relaxed">
              Two distinct plans. They differ in where you sleep, how you travel, and what you do while you recover — never in who operates on you or the quality of surgical care.
            </p>
          </div>

          {/* Action: Explore Stay Options */}
          <Link
            href="/getting-here"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#087F79] hover:text-[#102B46] transition-colors group shrink-0 py-2.5 px-5 rounded-full bg-white/90 backdrop-blur-xs border border-[#DCE5EB] shadow-2xs hover:shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087F79]"
          >
            <span>Explore Stay Options</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Dual Cards Grid (Essential vs Premium) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          <div className="lg:col-span-8 xl:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7 items-stretch">

              {/* Card 1: Essential Stay */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#DCE5EB] shadow-md hover:shadow-lg transition-all flex flex-col justify-between">
                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-[#DCE5EB]/60">
                    <span className="px-3 py-1 rounded-full bg-slate-100 text-[#102B46] text-xs font-semibold">
                      Essential Stay
                    </span>
                    <span className="text-xs font-medium text-[#627486]">
                      Vetted 3–4★ Suites
                    </span>
                  </div>

                  {/* Title & Desc */}
                  <h3 className="text-lg sm:text-xl font-bold text-[#102B46] mt-4 leading-snug">
                    Everything you need, nothing you don&apos;t
                  </h3>
                  <p className="text-xs sm:text-sm text-[#627486] mt-2 leading-relaxed font-normal">
                    Designed for patients who prefer a streamlined journey, resting in clean vetted 3–4 star suites close to the hospital.
                  </p>

                  {/* Inclusions List */}
                  <div className="mt-6 pt-4 border-t border-[#DCE5EB]/60">
                    <span className="text-[11px] font-bold tracking-wider text-[#102B46] uppercase block mb-3.5">
                      PACKAGE INCLUSIONS
                    </span>
                    <div className="space-y-3.5">
                      {essentialInclusions.map((item) => (
                        <div key={item.title} className="flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-[#087F79] shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs sm:text-sm font-bold text-[#102B46] leading-tight">
                              {item.title}
                            </p>
                            <p className="text-[11px] text-[#627486] mt-0.5 leading-relaxed">
                              {item.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card CTA */}
                <div className="mt-8 pt-4 border-t border-[#DCE5EB]/60">
                  <button
                    onClick={() => openIntake("Essential Stay Package Quote")}
                    className="w-full py-3.5 px-4 rounded-full border-2 border-[#102B46] text-[#102B46] hover:bg-[#102B46] hover:text-white font-bold text-xs tracking-wider uppercase transition-all duration-200 cursor-pointer shadow-2xs"
                  >
                    Get Written Quote for Essential
                  </button>
                  <p className="text-[11px] text-[#627486] text-center mt-2.5">
                    No commitment or fees until your written plan is ready
                  </p>
                </div>
              </div>

              {/* Card 2: Premium Concierge */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-[#087F79] shadow-xl hover:shadow-2xl transition-all flex flex-col justify-between relative">
                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-[#DCE5EB]/60">
                    <span className="px-3 py-1 rounded-full bg-[#087F79] text-white text-xs font-bold tracking-wide">
                      Premium Concierge
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#DDA34A] text-white text-[10px] font-extrabold uppercase tracking-wider shadow-2xs">
                      MOST POPULAR
                    </span>
                  </div>

                  {/* Title & Desc */}
                  <h3 className="text-lg sm:text-xl font-bold text-[#102B46] mt-4 leading-snug">
                    Room to recover with complete luxury
                  </h3>
                  <p className="text-xs sm:text-sm text-[#627486] mt-2 leading-relaxed font-normal">
                    For patients travelling with loved ones who prefer 5-star hospitality, dedicated private chauffeur, and restful post-op scenery.
                  </p>

                  {/* Inclusions List */}
                  <div className="mt-6 pt-4 border-t border-[#DCE5EB]/60">
                    <span className="text-[11px] font-bold tracking-wider text-[#087F79] uppercase block mb-3.5">
                      EVERYTHING IN ESSENTIAL, PLUS
                    </span>

                    {/* Highlight Box: Post-Recovery Himalayan Retreat Option */}
                    <div className="rounded-2xl p-3.5 bg-[#EAF5F4] border border-[#087F79]/20 flex items-start gap-3 mb-4">
                      <div className="w-8 h-8 rounded-xl bg-white border border-[#DCE5EB] flex items-center justify-center text-[#087F79] shrink-0 mt-0.5">
                        <Mountain className="w-4 h-4 text-[#087F79]" />
                      </div>
                      <div>
                        <h4 className="font-bold text-xs sm:text-sm text-[#102B46] leading-snug">
                          Post-Recovery Himalayan Retreat Option
                        </h4>
                        <p className="text-[11px] text-[#627486] mt-0.5 leading-relaxed">
                          Shimla or Kasauli luxury resort stay once surgeon grants fit to travel clearance.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3.5">
                      {premiumInclusions.map((item) => (
                        <div key={item.title} className="flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-[#087F79] shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs sm:text-sm font-bold text-[#102B46] leading-tight">
                              {item.title}
                            </p>
                            <p className="text-[11px] text-[#627486] mt-0.5 leading-relaxed">
                              {item.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card CTA */}
                <div className="mt-8 pt-4 border-t border-[#DCE5EB]/60">
                  <button
                    onClick={() => openIntake("Premium Concierge Package Quote")}
                    className="w-full py-3.5 px-4 rounded-full bg-[#087F79] hover:bg-[#066f6a] text-white font-bold text-xs tracking-wider uppercase transition-all duration-200 cursor-pointer shadow-md hover:shadow-lg"
                  >
                    Get Written Quote for Premium
                  </button>
                  <p className="text-[11px] text-[#627486] text-center mt-2.5">
                    All quotes sent in your local currency (USD, GBP, AUD, CAD)
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Right Area Column Spacer (for desktop background image view) */}
          <div className="hidden lg:block lg:col-span-4 xl:col-span-4" />

        </div>

        {/* Floating 5-Star Partner Hospitality Card (Bottom Right over Suite) */}
        <div className="hidden xl:block absolute bottom-8 right-8 z-20 max-w-[280px] bg-white/95 backdrop-blur-md rounded-2xl p-4 border border-[#DCE5EB] shadow-xl">
          <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#087F79]">
            <Sparkles className="w-3.5 h-3.5 text-[#087F79]" />
            <span>5-Star Partner Hospitality</span>
          </div>
          <p className="text-xs text-[#627486] mt-1.5 leading-relaxed">
            Handpicked luxury recovery suites from Taj, Hyatt &amp; Marriott with sanitized clinical protocols and peaceful garden terraces.
          </p>
          <div className="mt-3 pt-2.5 border-t border-[#DCE5EB] flex items-center justify-between text-[10px] font-extrabold text-[#102B46] tracking-wider uppercase">
            <span>Taj Hotels</span>
            <span>•</span>
            <span>Hyatt</span>
            <span>•</span>
            <span>Marriott</span>
          </div>
        </div>

      </div>
    </section>
  );
};
