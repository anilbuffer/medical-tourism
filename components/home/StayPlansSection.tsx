"use client";

import React from "react";
import Image from "next/image";
import { Sparkles, Mountain, ArrowRight, ShieldCheck } from "lucide-react";
import { useCare } from "@/context/CareContext";

export const StayPlansSection = () => {
  const { openIntake } = useCare();

  return (
    <section id="stay" className="relative w-full py-20 sm:py-28 overflow-hidden font-sans border-t border-[#DCE6EB] bg-white">
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
        {/* Soft White Overlay: Solid on Left for Perfect Card Contrast, Fading to Transparent on Right */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 via-50% to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 left-0 w-full lg:w-[68%] bg-gradient-to-r from-white via-white/95 to-transparent pointer-events-none" />
        
        {/* Subtle Edge Blends */}
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* LEFT SIDE: Header & Both Presentable Cards (Spans 8 columns on LG) */}
          <div className="lg:col-span-8 flex flex-col justify-center">
            
            {/* Section Header: Short Copy */}
            <div className="max-w-2xl mb-10 sm:mb-12">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ECF4F7] border border-[#DCE6EB] text-[#0B5D68] text-xs font-heading font-bold uppercase tracking-wider mb-3.5 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#0B5D68]" />
                <span>ACCOMMODATION &amp; RECOVERY PLANS</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-heading font-extrabold text-[#0C2338] mb-3 leading-[1.15] tracking-tight">
                Choose How You Want to Stay.{" "}
                <span className="text-[#0B5D68] block sm:inline">
                  All-Inclusive Packages.
                </span>
              </h2>

              <p className="text-[#6B7C88] text-base leading-relaxed max-w-xl font-normal">
                Two distinct plans differing only in hotel tier and transport — never in surgical excellence or doctor attention.
              </p>
            </div>

            {/* Side-by-Side Presentable Cards on Left Side */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-7 items-stretch">
              
              {/* Card 1: Essential Stay */}
              <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-7 border border-[#DCE6EB] shadow-xl hover:shadow-2xl transition-all flex flex-col justify-between group hover:-translate-y-1">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-block px-3 py-1 bg-[#ECF4F7] text-[#0C2338] text-xs font-heading font-bold rounded-full border border-[#DCE6EB]">
                      Essential Stay
                    </span>
                    <span className="text-xs font-heading font-semibold text-[#6B7C88]">
                      Vetted 3–4★ Suites
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-[#0C2338] mb-1.5 leading-tight">
                    Everything you need, nothing you don&apos;t
                  </h3>

                  <p className="text-[#6B7C88] text-xs sm:text-sm mb-5 leading-relaxed">
                    Clean, quiet suites close to the hospital with daily concierge check-ins.
                  </p>
                  
                  <div className="h-px bg-[#DCE6EB] w-full mb-4" />
                  
                  <div className="space-y-3 text-xs sm:text-sm text-[#0C2338]">
                    <div className="flex items-start gap-2.5">
                      <span className="text-[#0B5D68] font-bold text-sm leading-none mt-0.5">✓</span>
                      <div>
                        <h4 className="font-bold text-[#0C2338]">Vetted 3–4★ Hotel Near Hospital</h4>
                        <p className="text-xs text-[#6B7C88]">Elevator access, room service &amp; sanitisation</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <span className="text-[#0B5D68] font-bold text-sm leading-none mt-0.5">✓</span>
                      <div>
                        <h4 className="font-bold text-[#0C2338]">Airport &amp; Clinical Transfers</h4>
                        <p className="text-xs text-[#6B7C88]">Private AC vehicle for all doctor visits</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <span className="text-[#0B5D68] font-bold text-sm leading-none mt-0.5">✓</span>
                      <div>
                        <h4 className="font-bold text-[#0C2338]">Family Companion Included</h4>
                        <p className="text-xs text-[#6B7C88]">In-room hospital bed &amp; meals for attendant</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <span className="text-[#0B5D68] font-bold text-sm leading-none mt-0.5">✓</span>
                      <div>
                        <h4 className="font-bold text-[#0C2338]">Daily Named Concierge Visits</h4>
                        <p className="text-xs text-[#6B7C88]">Hands-on bedside coordination throughout</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-7 pt-5 border-t border-[#DCE6EB]">
                  <button 
                    onClick={() => openIntake("Essential Plan")}
                    className="w-full py-3.5 bg-[#F0A126] hover:bg-[#db8e18] active:scale-[0.99] text-[#0C2338] font-heading font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-[#F0A126]/20 cursor-pointer"
                  >
                    Get Written Quote for Essential
                  </button>
                  <p className="text-center text-[11px] text-[#6B7C88] mt-2">
                    Zero deposit or fees until your plan is finalized
                  </p>
                </div>
              </div>

              {/* Card 2: Premium Concierge */}
              <div className="bg-white/98 backdrop-blur-md rounded-3xl p-6 sm:p-7 border-2 border-[#0B5D68] shadow-2xl hover:shadow-[0_20px_50px_rgba(11,93,104,0.2)] transition-all flex flex-col justify-between relative group hover:-translate-y-1">
                
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="inline-block px-3 py-1 bg-[#0B5D68] text-white text-xs font-heading font-bold rounded-full shadow-xs">
                      Premium Concierge
                    </div>
                    <span className="px-3 py-1 rounded-full bg-[#F0A126] text-[#0C2338] text-[10px] font-heading font-bold tracking-wider uppercase shadow-xs">
                      Most Popular
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-[#0C2338] mb-1.5 leading-tight">
                    Room to recover with complete luxury
                  </h3>

                  <p className="text-[#6B7C88] text-xs sm:text-sm mb-5 leading-relaxed">
                    5-star hospitality, dedicated on-call private chauffeur, and scenic retreat options.
                  </p>
                  
                  <div className="h-px bg-[#DCE6EB] w-full mb-4" />
                  
                  <div className="space-y-3 text-xs sm:text-sm text-[#0C2338]">
                    {/* Highlight Box */}
                    <div className="bg-[#ECF4F7] border border-[#CFE4DE] rounded-xl p-3 flex items-start gap-2.5 shadow-xs">
                      <Mountain className="w-4 h-4 text-[#0B5D68] shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-[#0C2338] text-xs">Post-Op Himalayan Retreat Option</h4>
                        <p className="text-[11px] text-[#6B7C88]">Luxury resort convalescence once cleared by surgeon</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <span className="text-[#0B5D68] font-bold text-sm leading-none mt-0.5">✓</span>
                      <div>
                        <h4 className="font-bold text-[#0C2338]">5-Star Hotel (Taj, Hyatt or Marriott)</h4>
                        <p className="text-xs text-[#6B7C88]">Luxury king suite for you &amp; companion</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2.5">
                      <span className="text-[#0B5D68] font-bold text-sm leading-none mt-0.5">✓</span>
                      <div>
                        <h4 className="font-bold text-[#0C2338]">Dedicated Chauffeur &amp; SUV On-Call</h4>
                        <p className="text-xs text-[#6B7C88]">Private vehicle on standby for your trip</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <span className="text-[#0B5D68] font-bold text-sm leading-none mt-0.5">✓</span>
                      <div>
                        <h4 className="font-bold text-[#0C2338]">VIP Fast-Track Airport Service</h4>
                        <p className="text-xs text-[#6B7C88]">Personal escort and lounge access upon landing</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-7 pt-5 border-t border-[#DCE6EB]">
                  <button 
                    onClick={() => openIntake("Premium Plan")}
                    className="w-full py-3.5 bg-[#0B5D68] hover:bg-[#084851] active:scale-[0.99] text-white font-heading font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-[#0B5D68]/25 cursor-pointer"
                  >
                    Get Written Quote for Premium
                  </button>
                  <p className="text-center text-[11px] text-[#6B7C88] mt-2">
                    Delivered in your local currency (USD, GBP, AUD, CAD)
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* RIGHT SIDE: Open Luxury Hotel View with Floating Hospitality Badge */}
          <div className="hidden lg:flex lg:col-span-4 flex-col justify-end items-end h-full pt-20">
            <div className="bg-white/95 backdrop-blur-xl border border-white/80 p-5 rounded-3xl shadow-xl max-w-xs text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ECF4F7] text-[#0B5D68] text-[11px] font-heading font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#F0A126]" />
                <span>5-Star Partner Hospitality</span>
              </div>
              <p className="text-xs text-[#0C2338] font-semibold leading-relaxed mb-3">
                Handpicked luxury recovery suites from Taj, Hyatt &amp; Marriott with peaceful garden terraces.
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-[#DCE6EB] text-[11px] font-heading font-bold text-[#6B7C88]">
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
