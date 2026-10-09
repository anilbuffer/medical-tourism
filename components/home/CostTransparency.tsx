"use client";

import React, { useState } from "react";
import { ArrowRight, Info, ShieldCheck, Check, Sparkles, Building, Car, Mountain } from "lucide-react";
import { useCare } from "@/context/CareContext";

export const CostTransparency = () => {
  const { openIntake } = useCare();

  return (
    <section id="costs" className="py-16 sm:py-24 bg-[#ECF4F7] border-t border-[#DCE6EB] font-sans">
      <div className="max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-4xl mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#DCE6EB] text-[#0B5D68] text-xs font-heading font-bold uppercase tracking-wider mb-3 shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-[#0B5D68]" />
            <span>TRANSPARENT ALL-INCLUSIVE PRICING</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-[#0C2338] mb-4 leading-tight">
            Choose How You Want to Stay
          </h2>
          <p className="text-[#6B7C88] text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
            Two distinct plans. They differ in where you sleep, how you travel, and what you do while you recover — never in who operates on you or the quality of care.
          </p>
        </div>

        {/* Side-by-Side Plans */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Essential Plan */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#DCE6EB] shadow-md hover:shadow-xl transition-all flex flex-col">
            <div className="inline-block px-3 py-1 bg-[#ECF4F7] text-[#0C2338] text-xs font-heading font-bold rounded-full mb-6 w-max">
              Essential Stay
            </div>
            <h3 className="text-2xl font-heading font-extrabold text-[#0C2338] mb-2">
              Everything you need, nothing you don&apos;t
            </h3>
            <p className="text-[#6B7C88] text-xs sm:text-sm mb-6 leading-relaxed">
              Designed for patients who prefer a streamlined journey, resting in clean vetted 3–4 star suites close to the hospital.
            </p>
            
            <div className="h-px bg-[#DCE6EB] w-full mb-6" />
            
            <p className="text-xs font-heading font-bold uppercase tracking-wider text-[#6B7C88] mb-5">Package Inclusions</p>
            
            <div className="space-y-4 flex-1 text-xs sm:text-sm text-[#0C2338]">
              <div className="flex items-start gap-3">
                <span className="text-[#0B8F83] font-bold mt-0.5">✓</span>
                <div>
                  <h4 className="font-bold text-[#0C2338]">Vetted Hotel Close to Hospital</h4>
                  <p className="text-xs text-[#6B7C88] mt-0.5">Quiet 3–4 star suite with elevator, room service & sanitisation</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#0B8F83] font-bold mt-0.5">✓</span>
                <div>
                  <h4 className="font-bold text-[#0C2338]">Airport Pickup & Return Drop</h4>
                  <p className="text-xs text-[#6B7C88] mt-0.5">Private AC vehicle, wheelchair accommodation available</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#0B8F83] font-bold mt-0.5">✓</span>
                <div>
                  <h4 className="font-bold text-[#0C2338]">All Clinical Transfers</h4>
                  <p className="text-xs text-[#6B7C88] mt-0.5">Pre-op labs, surgeon visits, scans and checkups</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#0B8F83] font-bold mt-0.5">✓</span>
                <div>
                  <h4 className="font-bold text-[#0C2338]">One Family Companion Included</h4>
                  <p className="text-xs text-[#6B7C88] mt-0.5">Companion bed in hospital room & meals during admission</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#0B8F83] font-bold mt-0.5">✓</span>
                <div>
                  <h4 className="font-bold text-[#0C2338]">Daily In-Person Concierge Visit</h4>
                  <p className="text-xs text-[#6B7C88] mt-0.5">Your named coordinator handles all scheduling & questions</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-[#DCE6EB]">
              <button 
                onClick={() => openIntake("Essential Plan")}
                className="w-full py-4 bg-[#F0A126] hover:bg-[#db8e18] text-[#0C2338] font-heading font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-[#F0A126]/20 cursor-pointer"
              >
                Get Written Quote for Essential
              </button>
              <p className="text-center text-[11px] text-[#6B7C88] mt-3">No commitment or fees until your written plan is ready</p>
            </div>
          </div>

          {/* Premium Concierge Plan */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 border-2 border-[#0B5D68] shadow-xl flex flex-col relative">
            <div className="flex items-center justify-between mb-6">
              <div className="inline-block px-3.5 py-1 bg-[#ECF4F7] text-[#0B5D68] border border-[#DCE6EB] text-xs font-heading font-bold rounded-full">
                Premium Concierge
              </div>
              <span className="px-3 py-1 rounded-full bg-[#F0A126] text-white text-[10px] font-heading font-bold tracking-wider uppercase shadow-xs">
                Most Popular
              </span>
            </div>

            <h3 className="text-2xl font-heading font-extrabold text-[#0C2338] mb-2">
              Room to recover with complete luxury
            </h3>
            <p className="text-[#6B7C88] text-xs sm:text-sm mb-6 leading-relaxed">
              For patients travelling with loved ones who prefer 5-star hospitality, dedicated private chauffeur, and restful post-op scenery.
            </p>
            
            <div className="h-px bg-[#DCE6EB] w-full mb-6" />
            
            <p className="text-xs font-heading font-bold uppercase tracking-wider text-[#0B5D68] mb-5">Everything in Essential, plus</p>
            
            <div className="space-y-4 flex-1 text-xs sm:text-sm text-[#0C2338]">
              <div className="bg-[#ECF4F7] border border-[#DCE6EB] rounded-2xl p-4 flex items-start gap-3">
                <Mountain className="w-5 h-5 text-[#0B5D68] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-[#0C2338] text-sm">Post-Recovery Himalayan Retreat Option</h4>
                  <p className="text-xs text-[#6B7C88] mt-0.5">Shimla or Kasauli luxury resort stay once surgeon grants fit-to-travel clearance.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-[#0B8F83] font-bold mt-0.5">✓</span>
                <div>
                  <h4 className="font-bold text-[#0C2338]">5-Star Luxury Hotel Accommodation</h4>
                  <p className="text-xs text-[#6B7C88] mt-0.5">Hyatt, Taj or Marriott partner property for you & companion</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="text-[#0B8F83] font-bold mt-0.5">✓</span>
                <div>
                  <h4 className="font-bold text-[#0C2338]">Dedicated Chauffeur & Luxury Vehicle On-Call</h4>
                  <p className="text-xs text-[#6B7C88] mt-0.5">Exclusive private SUV on call throughout your entire stay</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-[#0B8F83] font-bold mt-0.5">✓</span>
                <div>
                  <h4 className="font-bold text-[#0C2338]">VIP Fast-Track Airport Meet & Greet</h4>
                  <p className="text-xs text-[#6B7C88] mt-0.5">Immigration escort and lounge access upon landing</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-[#DCE6EB]">
              <button 
                onClick={() => openIntake("Premium Plan")}
                className="w-full py-4 bg-[#F0A126] hover:bg-[#db8e18] text-[#0C2338] font-heading font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-[#F0A126]/20 cursor-pointer"
              >
                Get Written Quote for Premium
              </button>
              <p className="text-center text-[11px] text-[#6B7C88] mt-3">All quotes sent in your local currency (USD, GBP, AUD, CAD)</p>
            </div>
          </div>
        </div>

        {/* Global Cost Comparison Table */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-lg border border-[#DCE6EB]">
          <div className="mb-8">
            <h3 className="font-heading font-extrabold text-2xl text-[#0C2338] mb-2">
              All-Inclusive Cost Comparison
            </h3>
            <p className="text-sm text-[#6B7C88]">
              Direct comparison between an all-in medical travel journey to India vs private out-of-pocket costs at home.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-[#DCE6EB] text-[#6B7C88] font-heading font-bold uppercase tracking-wider text-[11px]">
                  <th className="pb-3.5 text-[#0C2338]">Treatment Procedure</th>
                  <th className="pb-3.5 text-[#0B5D68]">India All-In Package *</th>
                  <th className="pb-3.5 text-[#6B7C88]">UK / US Private Rate</th>
                  <th className="pb-3.5 text-[#6B7C88]">NHS / Public Wait Times</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DCE6EB]/60 text-[#0C2338]">
                <tr className="hover:bg-[#ECF4F7]/40 transition-colors">
                  <td className="py-4 font-bold text-[#0C2338]">🦴 Knee Replacement (Bilateral Robotic)</td>
                  <td className="py-4 font-heading font-bold text-[#0B5D68] text-base tabular-nums">$9,500 – $13,500</td>
                  <td className="py-4 text-[#6B7C88] font-medium tabular-nums">$38,000 – $65,000</td>
                  <td className="py-4 text-[#6B7C88] font-medium">12 – 18 Months Waiting</td>
                </tr>
                <tr className="hover:bg-[#ECF4F7]/40 transition-colors">
                  <td className="py-4 font-bold text-[#0C2338]">🦵 Hip Replacement (Direct Anterior)</td>
                  <td className="py-4 font-heading font-bold text-[#0B5D68] text-base tabular-nums">$8,200 – $11,500</td>
                  <td className="py-4 text-[#6B7C88] font-medium tabular-nums">$32,000 – $52,000</td>
                  <td className="py-4 text-[#6B7C88] font-medium">10 – 14 Months Waiting</td>
                </tr>
                <tr className="hover:bg-[#ECF4F7]/40 transition-colors">
                  <td className="py-4 font-bold text-[#0C2338]">🦷 Full-Arch Dental (All-on-4 / Zirconia)</td>
                  <td className="py-4 font-heading font-bold text-[#0B5D68] text-base tabular-nums">$4,800 – $7,200</td>
                  <td className="py-4 text-[#6B7C88] font-medium tabular-nums">$22,000 – $38,000</td>
                  <td className="py-4 text-[#6B7C88] font-medium">6 – 9 Months Waiting</td>
                </tr>
                <tr className="hover:bg-[#ECF4F7]/40 transition-colors">
                  <td className="py-4 font-bold text-[#0C2338]">👶 IVF Cycle with ICSI & PGT-A</td>
                  <td className="py-4 font-heading font-bold text-[#0B5D68] text-base tabular-nums">$4,200 – $6,500</td>
                  <td className="py-4 text-[#6B7C88] font-medium tabular-nums">$14,000 – $24,000</td>
                  <td className="py-4 text-[#6B7C88] font-medium">Strict Age/NHS Caps</td>
                </tr>
                <tr className="hover:bg-[#ECF4F7]/40 transition-colors">
                  <td className="py-4 font-bold text-[#0C2338]">👁️ Contoura Vision Lasik (Both Eyes)</td>
                  <td className="py-4 font-heading font-bold text-[#0B5D68] text-base tabular-nums">$1,400 – $1,900</td>
                  <td className="py-4 text-[#6B7C88] font-medium tabular-nums">$5,500 – $8,000</td>
                  <td className="py-4 text-[#6B7C88] font-medium">Not Covered by NHS</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-8 pt-5 border-t border-[#DCE6EB] flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[#6B7C88] leading-relaxed max-w-2xl">
              * "India All-In Package" includes surgeon fees, pre-op diagnostics, theatre fees, US-FDA implant costs, inpatient stay, attendant accommodation, and local transport.
            </p>
            <button
              onClick={() => openIntake("Cost Comparison Consultation")}
              className="px-7 py-3 rounded-xl bg-[#F0A126] hover:bg-[#db8e18] text-[#0C2338] font-heading font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-[#F0A126]/20 flex items-center gap-2 cursor-pointer"
            >
              <span>Get Itemised Written Quote</span>
              <ArrowRight className="w-4 h-4 text-[#0C2338] stroke-[2.4]" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
