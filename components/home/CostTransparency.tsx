"use client";

import React, { useState } from "react";
import { ArrowRight, Info, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export const CostTransparency = () => {
  const [planType, setPlanType] = useState<"economical" | "premium">("premium");

  return (
    <section className="py-12 sm:py-16 bg-slate-50 border-t border-[#E4E9ED]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-4xl mb-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4">
            Choose how you want to stay
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl">
            Two plans. They differ in where you sleep, how you travel and what you do while you recover — never in who operates on you.
          </p>
        </div>

        <div className="w-full h-px bg-[#0070E0] mb-10" />

        {/* Identical Medical Care Section */}
        <div className="mb-14">
          <div className="flex items-start gap-4 mb-6">
            <ShieldCheck className="w-6 h-6 text-[#0070E0] shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Your medical care is identical in both</h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-3xl">
                The plan you pick changes your stay, not your treatment. Nobody gets a different surgeon, a cheaper implant or a shorter recovery because of what they paid.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pl-0 sm:pl-10">
            <div className="flex items-center gap-3 text-sm text-slate-700 font-medium"><span className="text-[#0070E0]">✓</span> The same surgeon</div>
            <div className="flex items-center gap-3 text-sm text-slate-700 font-medium"><span className="text-[#0070E0]">✓</span> The same hospital and theatre</div>
            <div className="flex items-center gap-3 text-sm text-slate-700 font-medium"><span className="text-[#0070E0]">✓</span> The same implant or device</div>
            <div className="flex items-center gap-3 text-sm text-slate-700 font-medium"><span className="text-[#0070E0]">✓</span> The same room and nursing care</div>
            <div className="flex items-center gap-3 text-sm text-slate-700 font-medium"><span className="text-[#0070E0]">✓</span> The same six months of follow-up</div>
            <div className="flex items-center gap-3 text-sm text-slate-700 font-medium"><span className="text-[#0070E0]">✓</span> The same fixed quote before you fly</div>
          </div>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Essential Card */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm flex flex-col">
            <div className="inline-block px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-full mb-6 w-max">Essential</div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">Everything you need, nothing you don't</h3>
            <p className="text-slate-600 text-sm mb-8 leading-relaxed">
              For patients who'd rather keep the trip simple and spend the time resting close to the hospital.
            </p>
            
            <div className="h-px bg-slate-100 w-full mb-8" />
            
            <p className="text-sm font-semibold text-slate-500 mb-6">Your stay includes</p>
            
            <div className="space-y-6 flex-1">
              <div className="flex items-start gap-3">
                <span className="text-[#0070E0] mt-0.5">✓</span>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Hotel near the hospital</h4>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#0070E0] mt-0.5">✓</span>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Airport pickup and drop</h4>
                  <p className="text-xs text-slate-500 mt-1">Air-conditioned sedan, wheelchair accessible if you need it</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#0070E0] mt-0.5">✓</span>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">All hospital transfers</h4>
                  <p className="text-xs text-slate-500 mt-1">Every consultation, scan and follow-up visit</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#0070E0] mt-0.5">✓</span>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">One attendant included</h4>
                  <p className="text-xs text-slate-500 mt-1">A bed in your room, meals during your admission</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#0070E0] mt-0.5">✓</span>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Daily coordinator visit</h4>
                  <p className="text-xs text-slate-500 mt-1">The same named person, every day you're here</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#0070E0] mt-0.5">✓</span>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Arrival kit</h4>
                  <p className="text-xs text-slate-500 mt-1">Local SIM, currency exchange</p>
                </div>
              </div>
            </div>
            
            <div className="mt-10">
              <Button className="w-full py-6 bg-white border border-slate-200 text-slate-900 hover:bg-slate-50 font-bold rounded-xl transition-all shadow-sm">
                Get a quote for Essential
              </Button>
              <p className="text-center text-xs text-slate-400 mt-4">No payment until the quote is in writing</p>
            </div>
          </div>

          {/* Premium Card */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 border-2 border-[#0070E0] shadow-md flex flex-col relative">
            <div className="inline-block px-3 py-1 bg-[#E6F0FA] text-[#0070E0] text-xs font-bold rounded-full mb-6 w-max">Premium</div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">Room to recover properly</h3>
            <p className="text-slate-600 text-sm mb-8 leading-relaxed">
              For patients travelling with family, or anyone who'd rather the trip felt like more than a hospital stay.
            </p>
            
            <div className="h-px bg-slate-100 w-full mb-8" />
            
            <p className="text-sm font-semibold text-slate-500 mb-6">Everything in Essential, and</p>
            
            <div className="space-y-6 flex-1">
              <div className="bg-[#f8faff] border border-[#d6e6f5] rounded-2xl p-5 flex items-start gap-3">
                <span className="text-[#0070E0] mt-0.5">✓</span>
                <div>
                  <h4 className="font-bold text-[#0070E0] text-sm mb-1">A day in the Himalayas</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">Shimla or Kasauli, about three hours from the hospital — arranged once your surgeon has cleared you to travel, and never before.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#0070E0] mt-0.5">✓</span>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Five-star hotel</h4>
                  <p className="text-xs text-slate-500 mt-1">You and your companion</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#0070E0] mt-0.5">✓</span>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Private car and driver for your whole stay</h4>
                  <p className="text-xs text-slate-500 mt-1">Luxury sedan or SUV, on call, not shared with other patients</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#0070E0] mt-0.5">✓</span>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Airport meet-and-greet</h4>
                  <p className="text-xs text-slate-500 mt-1">Fast-track immigration, met before you reach the queue</p>
                </div>
              </div>
            </div>
            
            <div className="mt-10">
              <Button className="w-full py-6 bg-[#0070E0] text-white hover:bg-[#007FFF] font-bold rounded-xl transition-all shadow-md">
                Get a quote for Premium
              </Button>
              <p className="text-center text-xs text-slate-400 mt-4">No payment until the quote is in writing</p>
            </div>
          </div>
        </div>

        {/* Bottom Compare Section */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-[#E4E9ED]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h3 className="font-extrabold text-2xl text-slate-900 flex items-center gap-2.5">
                <span>How it compares</span>
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                Direct comparison between an all-in medical travel journey versus local private healthcare.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-[#E4E9ED] text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                  <th className="pb-4 font-bold text-slate-600">Treatment</th>
                  <th className="pb-4 font-bold text-[#0070E0]">India, All-In Trip *</th>
                  <th className="pb-4 font-bold text-slate-500">At Home (Private)</th>
                  <th className="pb-4 font-bold text-slate-500">Wait Times At Home</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                <tr>
                  <td className="py-4 font-bold text-slate-900 flex items-center gap-2"><span>🦴</span> Knee replacement (Bilateral)</td>
                  <td className="py-4 font-black text-[#0070E0] num tabular-nums">$27,350 – $35,350</td>
                  <td className="py-4 text-slate-600 font-semibold num tabular-nums">$120,000 – $180,000</td>
                  <td className="py-4 text-slate-500 num tabular-nums">12 – 18 months wait</td>
                </tr>
                <tr>
                  <td className="py-4 font-bold text-slate-900 flex items-center gap-2"><span>🦵</span> Hip replacement (Robotic)</td>
                  <td className="py-4 font-black text-[#0070E0] num tabular-nums">$11,200 – $16,800</td>
                  <td className="py-4 text-slate-600 font-semibold num tabular-nums">$25,000 – $45,000</td>
                  <td className="py-4 text-slate-500 num tabular-nums">9 – 14 months wait</td>
                </tr>
                <tr>
                  <td className="py-4 font-bold text-slate-900 flex items-center gap-2"><span>🦷</span> Full-arch dental rehabilitation</td>
                  <td className="py-4 font-black text-[#0070E0] num tabular-nums">$8,400 – $12,600</td>
                  <td className="py-4 text-slate-600 font-semibold num tabular-nums">$15,000 – $30,000</td>
                  <td className="py-4 text-slate-500 num tabular-nums">6 – 8 months wait</td>
                </tr>
                <tr>
                  <td className="py-4 font-bold text-slate-900 flex items-center gap-2"><span>👶</span> IVF with ICSI & genetic screening</td>
                  <td className="py-4 font-black text-[#0070E0] num tabular-nums">$10,500 – $15,000</td>
                  <td className="py-4 text-slate-600 font-semibold num tabular-nums">$20,000 – $35,000</td>
                  <td className="py-4 text-slate-500">Limited NHS cycles</td>
                </tr>
                <tr>
                  <td className="py-4 font-bold text-slate-900 flex items-center gap-2"><span>👁️</span> Advanced refractive & lens surgery</td>
                  <td className="py-4 font-black text-[#0070E0] num tabular-nums">$20,000 – $28,000</td>
                  <td className="py-4 text-slate-600 font-semibold num tabular-nums">$80,000 – $150,000</td>
                  <td className="py-4 text-slate-500 num tabular-nums">8 – 12 months wait</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 pt-4 border-t border-[#E4E9ED] flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-500 leading-relaxed max-w-2xl">
              * "India, All-In Trip" includes return flights, attendant accommodations, local transfers, all clinical fees, medication and contingency buffer.
            </p>
            <Button className="shrink-0 px-8 py-3.5 rounded-xl text-sm font-bold shadow-sm flex items-center gap-2 bg-[#0070E0] hover:bg-[#007FFF] text-white">
              <span>Get a written quote</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

      </div>
    </section>
  );
};

