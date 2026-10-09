"use client";

import React from "react";
import Image from "next/image";
import { ShieldCheck, Mountain, CheckCircle2, Sparkles } from "lucide-react";
import { useCare } from "@/context/CareContext";

export const StayPlansSection = () => {
  const { openIntake } = useCare();

  return (
    <section id="stay" className="relative w-full py-20 sm:py-28 overflow-hidden font-sans">
      {/* Full-Width Luxury Hotel Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/luxury-hotel-stay.jpg"
          alt="Luxury 5-Star Hotel Stay & Recovery Retreat"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Rich Dark Navy & Frosted Medical Vignette Overlay for Crisp Contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0C2338]/92 via-[#0C2338]/85 to-[#0C2338]/95 backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10 max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#F0A126] text-xs font-heading font-bold uppercase tracking-wider mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#F0A126]" />
            <span>ACCOMMODATION &amp; RECOVERY PLANS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[44px] xl:text-[48px] font-heading font-extrabold text-white mb-4 leading-[1.15] tracking-tight">
            Choose How You Want to Stay.{" "}
            <span className="text-[#F0A126] block sm:inline">
              Transparent All-In Packages.
            </span>
          </h2>

          <p className="text-slate-200 text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
            Two distinct plans. They differ in where you sleep, how you travel, and what you do while you recover — never in who operates on you or the quality of surgical care.
          </p>
        </div>

        {/* Side-by-Side Presentation Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
          
          {/* Card 1: Essential Stay */}
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 sm:p-10 border border-white/40 shadow-2xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)] transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="inline-block px-3.5 py-1 bg-[#ECF4F7] text-[#0C2338] text-xs font-heading font-bold rounded-full border border-[#DCE6EB]">
                  Essential Stay
                </span>
                <span className="text-xs font-heading font-semibold text-[#6B7C88]">
                  Vetted 3–4★ Suites
                </span>
              </div>

              <h3 className="text-2xl sm:text-[26px] font-heading font-extrabold text-[#0C2338] mb-2 leading-tight">
                Everything you need, nothing you don&apos;t
              </h3>

              <p className="text-[#6B7C88] text-xs sm:text-sm mb-6 leading-relaxed">
                Designed for patients who prefer a streamlined journey, resting in clean vetted 3–4 star suites close to the hospital.
              </p>
              
              <div className="h-px bg-[#DCE6EB] w-full mb-6" />
              
              <p className="text-xs font-heading font-bold uppercase tracking-wider text-[#6B7C88] mb-5">
                Package Inclusions
              </p>
              
              <div className="space-y-4 text-xs sm:text-sm text-[#0C2338]">
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
            
            <div className="mt-8 pt-6 border-t border-[#DCE6EB]">
              <button 
                onClick={() => openIntake("Essential Plan")}
                className="w-full py-4 bg-[#F0A126] hover:bg-[#db8e18] active:scale-[0.99] text-[#0C2338] font-heading font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-[#F0A126]/25 cursor-pointer"
              >
                Get Written Quote for Essential
              </button>
              <p className="text-center text-[11px] text-[#6B7C88] mt-3">
                No commitment or fees until your written plan is ready
              </p>
            </div>
          </div>

          {/* Card 2: Premium Concierge */}
          <div className="bg-white/98 backdrop-blur-xl rounded-3xl p-8 sm:p-10 border-2 border-[#0B5D68] shadow-2xl hover:shadow-[0_25px_60px_rgba(11,93,104,0.35)] transition-all flex flex-col justify-between relative group">
            
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="inline-block px-3.5 py-1 bg-[#ECF4F7] text-[#0B5D68] border border-[#DCE6EB] text-xs font-heading font-bold rounded-full">
                  Premium Concierge
                </div>
                <span className="px-3.5 py-1 rounded-full bg-[#F0A126] text-[#0C2338] text-[10px] font-heading font-bold tracking-wider uppercase shadow-xs">
                  Most Popular
                </span>
              </div>

              <h3 className="text-2xl sm:text-[26px] font-heading font-extrabold text-[#0C2338] mb-2 leading-tight">
                Room to recover with complete luxury
              </h3>

              <p className="text-[#6B7C88] text-xs sm:text-sm mb-6 leading-relaxed">
                For patients travelling with loved ones who prefer 5-star hospitality, dedicated private chauffeur, and restful post-op scenery.
              </p>
              
              <div className="h-px bg-[#DCE6EB] w-full mb-6" />
              
              <p className="text-xs font-heading font-bold uppercase tracking-wider text-[#0B5D68] mb-5">
                Everything in Essential, plus
              </p>
              
              <div className="space-y-4 text-xs sm:text-sm text-[#0C2338]">
                {/* Special Highlight Box */}
                <div className="bg-[#ECF4F7] border border-[#CFE4DE] rounded-2xl p-4 flex items-start gap-3 shadow-xs">
                  <Mountain className="w-5 h-5 text-[#0B5D68] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-[#0C2338] text-sm">Post-Recovery Himalayan Retreat Option</h4>
                    <p className="text-xs text-[#6B7C88] mt-0.5">Shimla or Kasauli luxury resort stay once surgeon grants fit-to-travel clearance.</p>
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
            
            <div className="mt-8 pt-6 border-t border-[#DCE6EB]">
              <button 
                onClick={() => openIntake("Premium Plan")}
                className="w-full py-4 bg-[#0B5D68] hover:bg-[#084851] active:scale-[0.99] text-white font-heading font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-[#0B5D68]/30 cursor-pointer"
              >
                Get Written Quote for Premium
              </button>
              <p className="text-center text-[11px] text-[#6B7C88] mt-3">
                All quotes sent in your local currency (USD, GBP, AUD, CAD)
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
