"use client";

import React, { useState } from "react";
import { ArrowRight, Info, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export const CostTransparency1 = () => {
  const [planType, setPlanType] = useState<"economical" | "premium">("premium");

  return (
    <section className="py-12 sm:py-16 bg-slate-50 border-t border-[#E4E9ED]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-[#0070E0] font-bold text-xs uppercase tracking-widest mb-3">
            COST & FINANCIAL TRANSPARENCY
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4">
            The whole trip, not just the operating table.
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Surprise medical bills are impossible when every item — surgery, attendants, flights, hotel, and aftercare buffer — is quoted in writing before you board.
          </p>
        </div>

        {/* Top Calculator Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-sm border border-[#E4E9ED] bg-white mb-14">
          
          {/* Left: Input */}
          <div className="p-8 sm:p-12 flex flex-col border-b lg:border-b-0 lg:border-r border-[#E4E9ED]">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-6 rounded-full bg-[#007FFF] text-white flex items-center justify-center text-xs font-bold">1</div>
                <h3 className="font-bold text-slate-900">Select Plan Type</h3>
              </div>
              <div className="flex gap-2 mb-4 pl-9">
                <Button 
                  onClick={() => setPlanType("economical")}
                  className={`flex-1 transition-all ${planType === "economical" ? "bg-[#0070E0] text-white hover:bg-[#007FFF]" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
                >
                  Economical
                </Button>
                <Button 
                  onClick={() => setPlanType("premium")}
                  className={`flex-1 transition-all ${planType === "premium" ? "bg-[#0070E0] text-white hover:bg-[#007FFF]" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
                >
                  Premium
                </Button>
              </div>
            </div>

            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-6 rounded-full bg-[#007FFF] text-white flex items-center justify-center text-xs font-bold">2</div>
                <h3 className="font-bold text-slate-900">Number of attendants</h3>
              </div>
              <div className="pl-9">
                <select className="w-full p-3.5 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm font-medium outline-none focus:border-[#007FFF]">
                  <option>1 attendant (included in base plan)</option>
                  <option>2 attendants</option>
                  <option>Travelling alone (bedside nurse arranged)</option>
                </select>
              </div>
            </div>

            <div className="mt-auto pl-9">
              <div className="flex items-start gap-2.5 text-slate-500">
                <Info className="w-4 h-4 shrink-0 mt-0.5 text-slate-400" />
                <p className="text-xs leading-relaxed">
                  Indicative only. Your formal written quote is itemized and fixed before travel.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Output */}
          <div className="bg-white p-8 sm:p-12 flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-lg mb-6">Itemized estimate</h3>
              <div className="space-y-3.5 text-sm text-slate-600 mb-6">
                <div className="flex justify-between items-center py-1 border-b border-slate-100">
                  <div className="flex items-center gap-2"><span className="text-slate-400">🏥</span> Treatment range</div>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-100">
                  <div className="flex items-center gap-2"><span className="text-slate-400">✈️</span> Return flights (all travelers)</div>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-100">
                  <div className="flex items-center gap-2"><span className="text-slate-400">🏨</span> Accommodation (serviced apartment)</div>
                </div>
                {planType === "premium" && (
                  <>
                    <div className="flex justify-between items-center py-1 border-b border-slate-100">
                      <div className="flex items-center gap-2"><span className="text-slate-400">👤</span> Attendant living allowance</div>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-slate-100">
                      <div className="flex items-center gap-2"><span className="text-slate-400">🚕</span> Airport & clinic VIP transfers</div>
                    </div>
                  </>
                )}
                <div className="flex justify-between items-center py-1 border-b border-slate-100">
                  <div className="flex items-center gap-2"><span className="text-slate-400">💊</span> Take-home discharge medications</div>
                </div>
                {planType === "premium" && (
                  <div className="flex justify-between items-center py-1 border-b border-slate-100">
                    <div className="flex items-center gap-2"><span className="text-slate-400">🩺</span> Follow-up consult once home</div>
                  </div>
                )}
                <div className="flex justify-between items-center py-1 border-b border-slate-100">
                  <div className="flex items-center gap-2"><span className="text-slate-400">🛡️</span> 15% contingency buffer</div>
                </div>
              </div>
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
