"use client";

import React from "react";
import Image from "next/image";
import { ShieldCheck, Mountain, CheckCircle2, Sparkles } from "lucide-react";
import { useCare } from "@/context/CareContext";

export const StayPlansSection = () => {
  const { openIntake } = useCare();

  return (
    <section id="stay" className="relative w-full py-16 sm:py-24 overflow-hidden font-sans border-t border-[#DCE6EB] bg-white">
      {/* Full-Width Luxury Hotel Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/luxury-hotel-stay.jpg"
          alt="Luxury 5-Star Hotel Stay & Recovery Retreat"
          fill
          priority
          sizes="100vw"
          className="object-cover object-right"
        />
        {/* Soft White Overlay: Solid on Mobile for pristine card contrast, Fading on Desktop so Hotel Room is Clearly Visible on the right */}
        <div className="absolute inset-0 bg-white/92 lg:bg-transparent lg:bg-gradient-to-r lg:from-white lg:via-white/95 lg:via-50% lg:to-transparent pointer-events-none" />
        <div className="hidden lg:block absolute inset-y-0 left-0 w-[68%] bg-gradient-to-r from-white via-white/95 to-transparent pointer-events-none" />

        {/* Subtle Top & Bottom Edge Blends */}
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">

          {/* LEFT SIDE: Header & Both Presentable Cards (Spans 8 columns on LG) */}
          <div className="lg:col-span-8 xl:col-span-8 flex flex-col justify-center">

            {/* Section Header */}
            <div className="max-w-2xl mb-8 sm:mb-12">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ECF4F7] border border-[#DCE6EB] text-[#0B5D68] text-xs font-heading font-bold uppercase tracking-wider mb-3.5 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#14B8A6] animate-pulse" />
                <Sparkles className="w-3.5 h-3.5 text-[#0B5D68]" />
                <span>ACCOMMODATION &amp; RECOVERY PLANS</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-[42px] xl:text-[45px] font-heading font-extrabold text-[#0C2338] mb-3 leading-[1.15] tracking-tight">
                Choose How You Want to Stay.{" "}
                <span className="text-[#0e9d8d] block sm:inline">
                  Transparent All-In Packages.
                </span>
              </h2>

              <p className="text-[#6B7C88] text-sm sm:text-base leading-relaxed max-w-xl font-normal">
                Two distinct plans. They differ in where you sleep, how you travel, and what you do while you recover — never in who operates on you or the quality of surgical care.
              </p>
            </div>

            {/* Side-by-Side Presentable Cards on Left Side */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-7 items-stretch">

              {/* Card 1: Essential Stay */}
              <div className="bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl p-5 xs:p-6 sm:p-7 border border-[#DCE6EB] shadow-xl hover:shadow-2xl transition-all flex flex-col justify-between group hover:-translate-y-1">
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="inline-block px-3 py-1 bg-[#ECF4F7] text-[#0C2338] text-xs font-heading font-bold rounded-full border border-[#DCE6EB]">
                      Essential Stay
                    </span>
                    <span className="text-xs font-heading font-semibold text-[#6B7C88]">
                      Vetted 3–4★ Suites
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-[#0C2338] mb-2 leading-tight">
                    Everything you need, nothing you don&apos;t
                  </h3>

                  <p className="text-[#6B7C88] text-xs sm:text-sm mb-5 leading-relaxed">
                    Designed for patients who prefer a streamlined journey, resting in clean vetted 3–4 star suites close to the hospital.
                  </p>

                  <div className="h-px bg-[#DCE6EB] w-full mb-5" />

                  <p className="text-xs font-heading font-bold uppercase tracking-wider text-[#6B7C88] mb-4">
                    Package Inclusions
                  </p>

                  <div className="space-y-3.5 text-xs sm:text-sm text-[#0C2338]">
                    <div className="flex items-start gap-3">
                      <span className="text-[#0B5D68] font-bold text-base leading-none mt-0.5">✓</span>
                      <div>
                        <h4 className="font-bold text-[#0C2338]">Vetted Hotel Close to Hospital</h4>
                        <p className="text-xs text-[#6B7C88] mt-0.5">Quiet 3–4 star suite with elevator, room service &amp; sanitisation</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <span className="text-[#0B5D68] font-bold text-base leading-none mt-0.5">✓</span>
                      <div>
                        <h4 className="font-bold text-[#0C2338]">Airport Pickup &amp; Return Drop</h4>
                        <p className="text-xs text-[#6B7C88] mt-0.5">Private AC vehicle, wheelchair accommodation available</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <span className="text-[#0B5D68] font-bold text-base leading-none mt-0.5">✓</span>
                      <div>
                        <h4 className="font-bold text-[#0C2338]">All Clinical Transfers</h4>
                        <p className="text-xs text-[#6B7C88] mt-0.5">Pre-op labs, surgeon visits, scans and checkups</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <span className="text-[#0B5D68] font-bold text-base leading-none mt-0.5">✓</span>
                      <div>
                        <h4 className="font-bold text-[#0C2338]">One Family Companion Included</h4>
                        <p className="text-xs text-[#6B7C88] mt-0.5">Companion bed in hospital room &amp; meals during admission</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <span className="text-[#0B5D68] font-bold text-base leading-none mt-0.5">✓</span>
                      <div>
                        <h4 className="font-bold text-[#0C2338]">Daily In-Person Concierge Visit</h4>
                        <p className="text-xs text-[#6B7C88] mt-0.5">Your named coordinator handles all scheduling &amp; questions</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-7 pt-5 border-t border-[#DCE6EB]">
                  <button
                    onClick={() => openIntake("Essential Plan")}
                    className="w-full py-3.5 bg-[#F0A126] hover:bg-[#db8e18] active:scale-[0.99] text-[#0C2338] font-heading font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-[#F0A126]/25 cursor-pointer"
                  >
                    Get Written Quote for Essential
                  </button>
                  <p className="text-center text-[11px] text-[#6B7C88] mt-2.5">
                    No commitment or fees until your written plan is ready
                  </p>
                </div>
              </div>

              {/* Card 2: Premium Concierge */}
              <div className="bg-white/98 backdrop-blur-md rounded-2xl sm:rounded-3xl p-5 xs:p-6 sm:p-7 border-2 border-[#0e9d8d] shadow-2xl hover:shadow-[0_20px_50px_rgba(11,93,104,0.25)] transition-all flex flex-col justify-between relative group hover:-translate-y-1">

                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="inline-block px-3 py-1 bg-[#0e9d8d] text-[#ffffff] text-xs font-heading font-bold rounded-full shadow-xs">
                      Premium Concierge
                    </div>
                    <span className="px-3 py-1 rounded-full bg-[#F0A126] text-[#0C2338] text-[10px] font-heading font-bold tracking-wider uppercase shadow-xs">
                      Most Popular
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-heading font-bold text-[#0C2338] mb-2 leading-tight">
                    Room to recover with complete luxury
                  </h3>

                  <p className="text-[#6B7C88] text-xs sm:text-sm mb-5 leading-relaxed">
                    For patients travelling with loved ones who prefer 5-star hospitality, dedicated private chauffeur, and restful post-op scenery.
                  </p>

                  <div className="h-px bg-[#DCE6EB] w-full mb-5" />

                  <p className="text-xs font-heading font-bold uppercase tracking-wider text-[#0B5D68] mb-4">
                    Everything in Essential, plus
                  </p>

                  <div className="space-y-3.5 text-xs sm:text-sm text-[#0C2338]">
                    {/* Special Highlight Box */}
                    <div className="bg-[#ECF4F7] border border-[#DCE6EB] rounded-2xl p-3.5 flex items-start gap-3 shadow-xs">
                      <Mountain className="w-5 h-5 text-[#0B5D68] shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-[#0C2338] text-xs sm:text-sm">Post-Recovery Himalayan Retreat Option</h4>
                        <p className="text-[11px] sm:text-xs text-[#6B7C88] mt-0.5">Shimla or Kasauli luxury resort stay once surgeon grants fit-to-travel clearance.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <span className="text-[#0B5D68] font-bold text-base leading-none mt-0.5">✓</span>
                      <div>
                        <h4 className="font-bold text-[#0C2338]">5-Star Luxury Hotel Accommodation</h4>
                        <p className="text-xs text-[#6B7C88] mt-0.5">Hyatt, Taj or Marriott partner property for you &amp; companion</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <span className="text-[#0B5D68] font-bold text-base leading-none mt-0.5">✓</span>
                      <div>
                        <h4 className="font-bold text-[#0C2338]">Dedicated Chauffeur &amp; Luxury Vehicle On-Call</h4>
                        <p className="text-xs text-[#6B7C88] mt-0.5">Exclusive private SUV on call throughout your entire stay</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <span className="text-[#0B5D68] font-bold text-base leading-none mt-0.5">✓</span>
                      <div>
                        <h4 className="font-bold text-[#0C2338]">VIP Fast-Track Airport Meet &amp; Greet</h4>
                        <p className="text-xs text-[#6B7C88] mt-0.5">Immigration escort and lounge access upon landing</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-7 pt-5 border-t border-[#DCE6EB]">
                  <button
                    onClick={() => openIntake("Premium Plan")}
                    className="w-full py-3.5 bg-[#0e9d8d] hover:bg-[#07434B] text-white font-heading font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-[#0B5D68]/30 cursor-pointer"
                  >
                    Get Written Quote for Premium
                  </button>
                  <p className="text-center text-[11px] text-[#6B7C88] mt-2.5">
                    All quotes sent in your local currency (USD, GBP, AUD, CAD)
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* RIGHT SIDE: Open Luxury Hotel View with Floating Hospitality Badge */}
          <div className="hidden lg:flex lg:col-span-4 xl:col-span-4 flex-col justify-end items-end h-full pt-24">
            <div className="bg-white/92 backdrop-blur-xl border border-white/80 p-5 rounded-3xl shadow-2xl max-w-xs text-left hover:bg-white transition-all">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ECF4F7] text-[#0B5D68] text-[11px] font-heading font-bold uppercase tracking-wider mb-2.5">
                <Sparkles className="w-3.5 h-3.5 text-[#F0A126]" />
                <span>5-Star Partner Hospitality</span>
              </div>
              <p className="text-xs text-[#0C2338] font-semibold leading-relaxed mb-3">
                Handpicked luxury recovery suites from Taj, Hyatt &amp; Marriott with sanitized clinical protocols and peaceful garden terraces.
              </p>
              <div className="flex items-center gap-3 pt-2.5 border-t border-[#DCE6EB] text-[11px] font-heading font-bold text-[#6B7C88]">
                <span>TAJ HOTELS</span>
                <span>·</span>
                <span>HYATT</span>
                <span>·</span>
                <span>MARRIOTT</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
