"use client";

import React, { useState } from "react";
import { ArrowRight, Info, ShieldCheck, Check, Sparkles, Building, Car, Mountain } from "lucide-react";
import { useCare } from "@/context/CareContext";

export const CostTransparency = () => {
  const { openIntake } = useCare();

  return (
    <section id="costs" className="py-16 sm:py-24 bg-[#f8fafb] border-t border-[#e2eaeb] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-4xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f0f8f9] border border-[#dbeff0] text-[#0b5d63] text-xs font-heading font-bold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-[#0b5d63]" />
            <span>TRANSPARENT ALL-INCLUSIVE PRICING</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-slate-900 mb-4 leading-tight">
            Choose How You Want to Stay
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
            Two distinct plans. They differ in where you sleep, how you travel, and what you do while you recover — never in who operates on you or the quality of care.
          </p>
        </div>

        {/* Identical Medical Care Guarantee Banner */}
        <div className="mb-14 bg-white rounded-3xl p-6 sm:p-8 border border-[#e2eaeb] shadow-sm">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-10 h-10 rounded-2xl bg-[#0b5d63]/10 flex items-center justify-center text-[#0b5d63] shrink-0 mt-0.5">
              <ShieldCheck className="w-5 h-5 text-[#0b5d63]" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-heading font-bold text-slate-900 mb-1">
                Your medical care is identical in both packages
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-3xl">
                The plan you select changes your comfort and stay, not your treatment. Nobody gets a junior surgeon, a cheaper implant, or a rushed recovery because of what they choose.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 pt-2 border-t border-slate-100">
            <div className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
              <span className="text-[#0b5d63] font-bold">✓</span> Same Chief Surgeon & Operating Theatre
            </div>
            <div className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
              <span className="text-[#0b5d63] font-bold">✓</span> Same JCI / NABH Quaternary Hospital
            </div>
            <div className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
              <span className="text-[#0b5d63] font-bold">✓</span> Same US-FDA Approved Implants & Tech
            </div>
            <div className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
              <span className="text-[#0b5d63] font-bold">✓</span> Same Private Inpatient Nursing Care
            </div>
            <div className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
              <span className="text-[#0b5d63] font-bold">✓</span> 6 Months Post-Op Telemedicine
            </div>
            <div className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
              <span className="text-[#0b5d63] font-bold">✓</span> Written Guaranteed Price Quote
            </div>
          </div>
        </div>

        {/* Side-by-Side Plans */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Essential Plan */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#e2eaeb] shadow-md hover:shadow-xl transition-all flex flex-col">
            <div className="inline-block px-3 py-1 bg-slate-100 text-slate-700 text-xs font-heading font-bold rounded-full mb-6 w-max">
              Essential Stay
            </div>
            <h3 className="text-2xl font-heading font-extrabold text-slate-900 mb-2">
              Everything you need, nothing you don&apos;t
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm mb-6 leading-relaxed">
              Designed for patients who prefer a streamlined journey, resting in clean vetted 3–4 star suites close to the hospital.
            </p>
            
            <div className="h-px bg-slate-100 w-full mb-6" />
            
            <p className="text-xs font-heading font-bold uppercase tracking-wider text-slate-400 mb-5">Package Inclusions</p>
            
            <div className="space-y-4 flex-1 text-xs sm:text-sm text-slate-700">
              <div className="flex items-start gap-3">
                <span className="text-[#0b5d63] font-bold mt-0.5">✓</span>
                <div>
                  <h4 className="font-bold text-slate-900">Vetted Hotel Close to Hospital</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Quiet 3–4 star suite with elevator, room service & sanitisation</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#0b5d63] font-bold mt-0.5">✓</span>
                <div>
                  <h4 className="font-bold text-slate-900">Airport Pickup & Return Drop</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Private AC vehicle, wheelchair accommodation available</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#0b5d63] font-bold mt-0.5">✓</span>
                <div>
                  <h4 className="font-bold text-slate-900">All Clinical Transfers</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Pre-op labs, surgeon visits, scans and checkups</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#0b5d63] font-bold mt-0.5">✓</span>
                <div>
                  <h4 className="font-bold text-slate-900">One Family Companion Included</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Companion bed in hospital room & meals during admission</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#0b5d63] font-bold mt-0.5">✓</span>
                <div>
                  <h4 className="font-bold text-slate-900">Daily In-Person Concierge Visit</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Your named coordinator handles all scheduling & questions</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-slate-100">
              <button 
                onClick={() => openIntake("Essential Plan")}
                className="w-full py-4 bg-white border-2 border-[#0b5d63] text-[#0b5d63] hover:bg-[#0b5d63] hover:text-white font-heading font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-sm cursor-pointer"
              >
                Get Written Quote for Essential
              </button>
              <p className="text-center text-[11px] text-slate-400 mt-3">No commitment or fees until your written plan is ready</p>
            </div>
          </div>

          {/* Premium Concierge Plan */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 border-2 border-[#0b5d63] shadow-xl flex flex-col relative">
            <div className="flex items-center justify-between mb-6">
              <div className="inline-block px-3.5 py-1 bg-[#f0f8f9] text-[#0b5d63] border border-[#dbeff0] text-xs font-heading font-bold rounded-full">
                Premium Concierge
              </div>
              <span className="px-3 py-1 rounded-full bg-[#0b5d63] text-white text-[10px] font-heading font-bold tracking-wider uppercase">
                Most Popular
              </span>
            </div>

            <h3 className="text-2xl font-heading font-extrabold text-slate-900 mb-2">
              Room to recover with complete luxury
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm mb-6 leading-relaxed">
              For patients travelling with loved ones who prefer 5-star hospitality, dedicated private chauffeur, and restful post-op scenery.
            </p>
            
            <div className="h-px bg-slate-100 w-full mb-6" />
            
            <p className="text-xs font-heading font-bold uppercase tracking-wider text-[#0b5d63] mb-5">Everything in Essential, plus</p>
            
            <div className="space-y-4 flex-1 text-xs sm:text-sm text-slate-700">
              <div className="bg-[#f8fafb] border border-slate-200/80 rounded-2xl p-4 flex items-start gap-3">
                <Mountain className="w-5 h-5 text-[#0b5d63] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-[#073f43] text-sm">Post-Recovery Himalayan Retreat Option</h4>
                  <p className="text-xs text-slate-600 mt-0.5">Shimla or Kasauli luxury resort stay once surgeon grants fit-to-travel clearance.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-[#0b5d63] font-bold mt-0.5">✓</span>
                <div>
                  <h4 className="font-bold text-slate-900">5-Star Luxury Hotel Accommodation</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Hyatt, Taj or Marriott partner property for you & companion</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="text-[#0b5d63] font-bold mt-0.5">✓</span>
                <div>
                  <h4 className="font-bold text-slate-900">Dedicated Chauffeur & Luxury Vehicle On-Call</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Exclusive private SUV on call throughout your entire stay</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-[#0b5d63] font-bold mt-0.5">✓</span>
                <div>
                  <h4 className="font-bold text-slate-900">VIP Fast-Track Airport Meet & Greet</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Immigration escort and lounge access upon landing</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-slate-100">
              <button 
                onClick={() => openIntake("Premium Plan")}
                className="w-full py-4 bg-[#0b5d63] hover:bg-[#073f43] text-white font-heading font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer"
              >
                Get Written Quote for Premium
              </button>
              <p className="text-center text-[11px] text-slate-400 mt-3">All quotes sent in your local currency (USD, GBP, AUD, CAD)</p>
            </div>
          </div>
        </div>

        {/* Global Cost Comparison Table */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-lg border border-[#e2eaeb]">
          <div className="mb-8">
            <h3 className="font-heading font-extrabold text-2xl text-slate-900 mb-2">
              All-Inclusive Cost Comparison
            </h3>
            <p className="text-sm text-slate-600">
              Direct comparison between an all-in medical travel journey to India vs private out-of-pocket costs at home.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-[#e2eaeb] text-slate-400 font-heading font-bold uppercase tracking-wider text-[11px]">
                  <th className="pb-3.5 text-slate-700">Treatment Procedure</th>
                  <th className="pb-3.5 text-[#0b5d63]">India All-In Package *</th>
                  <th className="pb-3.5 text-slate-600">UK / US Private Rate</th>
                  <th className="pb-3.5 text-slate-600">NHS / Public Wait Times</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 font-bold text-slate-900">🦴 Knee Replacement (Bilateral Robotic)</td>
                  <td className="py-4 font-heading font-bold text-[#0b5d63] text-base tabular-nums">$9,500 – $13,500</td>
                  <td className="py-4 text-slate-500 font-medium tabular-nums">$38,000 – $65,000</td>
                  <td className="py-4 text-slate-600 font-medium">12 – 18 Months Waiting</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 font-bold text-slate-900">🦵 Hip Replacement (Direct Anterior)</td>
                  <td className="py-4 font-heading font-bold text-[#0b5d63] text-base tabular-nums">$8,200 – $11,500</td>
                  <td className="py-4 text-slate-500 font-medium tabular-nums">$32,000 – $52,000</td>
                  <td className="py-4 text-slate-600 font-medium">10 – 14 Months Waiting</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 font-bold text-slate-900">🦷 Full-Arch Dental (All-on-4 / Zirconia)</td>
                  <td className="py-4 font-heading font-bold text-[#0b5d63] text-base tabular-nums">$4,800 – $7,200</td>
                  <td className="py-4 text-slate-500 font-medium tabular-nums">$22,000 – $38,000</td>
                  <td className="py-4 text-slate-600 font-medium">6 – 9 Months Waiting</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 font-bold text-slate-900">👶 IVF Cycle with ICSI & PGT-A</td>
                  <td className="py-4 font-heading font-bold text-[#0b5d63] text-base tabular-nums">$4,200 – $6,500</td>
                  <td className="py-4 text-slate-500 font-medium tabular-nums">$14,000 – $24,000</td>
                  <td className="py-4 text-slate-600 font-medium">Strict Age/NHS Caps</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 font-bold text-slate-900">👁️ Contoura Vision Lasik (Both Eyes)</td>
                  <td className="py-4 font-heading font-bold text-[#0b5d63] text-base tabular-nums">$1,400 – $1,900</td>
                  <td className="py-4 text-slate-500 font-medium tabular-nums">$5,500 – $8,000</td>
                  <td className="py-4 text-slate-600 font-medium">Not Covered by NHS</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-8 pt-5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-500 leading-relaxed max-w-2xl">
              * "India All-In Package" includes surgeon fees, pre-op diagnostics, theatre fees, US-FDA implant costs, inpatient stay, attendant accommodation, and local transport.
            </p>
            <button
              onClick={() => openIntake("Cost Comparison Consultation")}
              className="px-7 py-3 rounded-xl bg-[#0b5d63] hover:bg-[#073f43] text-white font-heading font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <span>Get Itemised Written Quote</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
