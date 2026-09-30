"use client";

import React from "react";
import { ArrowRight, Info, ShieldCheck } from "lucide-react";

export const CostTransparency = () => {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-[#020B18] via-[#06203D] to-[#0A2E50] text-white relative overflow-hidden">
      {/* Ambient background glows for rich dynamic gradient depth */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-vedara-cyan/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[600px] h-[600px] bg-vedara-blue/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(46,205,197,0.12),transparent)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-vedara-gold font-bold text-xs uppercase tracking-widest mb-3">
            COST & FINANCIAL TRANSPARENCY
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4">
            The whole trip, not just the operating table.
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Surprise medical bills are impossible when every item — surgery, attendants, flights, hotel, and aftercare buffer — is quoted in writing before you board.
          </p>
        </div>

        {/* Top Calculator Section - Lightened Crisp Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-2xl mb-14 border border-white/10 bg-white">
          
          {/* Left: Input */}
          <div className="bg-slate-50 p-8 sm:p-12 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-slate-200/80">
            
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-6 rounded-full bg-vedara-deep text-white flex items-center justify-center text-xs font-bold">
                  1
                </div>
                <h3 className="font-bold text-slate-900">Select treatment category</h3>
              </div>
              <div className="flex gap-2 mb-4 pl-9">
                <button className="flex-1 py-2.5 rounded-xl bg-vedara-gold text-vedara-deep text-sm font-bold shadow-sm transition-all cursor-pointer">
                  Serious
                </button>
                <button className="flex-1 py-2.5 rounded-xl bg-white text-slate-600 text-sm font-semibold border border-slate-200 hover:bg-slate-100 transition-colors cursor-pointer">
                  Elective
                </button>
              </div>
              <div className="pl-9">
                <select className="w-full p-3.5 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm font-medium outline-none focus:border-vedara-gold">
                  <option>Choose treatment</option>
                  <option>Knee replacement (Bilateral)</option>
                  <option>Hip replacement (Robotic)</option>
                  <option>Blood & marrow transplant</option>
                  <option>Liver / Kidney transplant</option>
                  <option>Cardiac valve replacement</option>
                </select>
              </div>
            </div>

            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-6 rounded-full bg-vedara-deep text-white flex items-center justify-center text-xs font-bold">
                  2
                </div>
                <h3 className="font-bold text-slate-900">Number of attendants</h3>
              </div>
              <div className="pl-9">
                <select className="w-full p-3.5 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm font-medium outline-none focus:border-vedara-gold">
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
                  <div className="font-bold text-slate-900">$18,000 – $25,000</div>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-100">
                  <div className="flex items-center gap-2"><span className="text-slate-400">✈️</span> Return flights (all travelers)</div>
                  <div className="font-bold text-slate-900">$1,200</div>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-100">
                  <div className="flex items-center gap-2"><span className="text-slate-400">🏨</span> Accommodation (serviced apartment)</div>
                  <div className="font-bold text-slate-900">$1,800</div>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-100">
                  <div className="flex items-center gap-2"><span className="text-slate-400">👤</span> Attendant living allowance</div>
                  <div className="font-bold text-slate-900">$1,200</div>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-100">
                  <div className="flex items-center gap-2"><span className="text-slate-400">🚕</span> Airport & clinic VIP transfers</div>
                  <div className="font-bold text-slate-900">$400</div>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-100">
                  <div className="flex items-center gap-2"><span className="text-slate-400">💊</span> Take-home discharge medications</div>
                  <div className="font-bold text-slate-900">$300</div>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-100">
                  <div className="flex items-center gap-2"><span className="text-slate-400">🩺</span> Follow-up consult once home</div>
                  <div className="font-bold text-slate-900">$250</div>
                </div>
                <div className="flex justify-between items-center py-1">
                  <div className="flex items-center gap-2"><span className="text-slate-400">🛡️</span> 15% contingency buffer</div>
                  <div className="font-bold text-slate-900">$4,200</div>
                </div>
              </div>

              <div className="border-t-2 border-slate-100 pt-5 flex justify-between items-center mb-6">
                <div>
                  <div className="font-bold text-slate-900">Total All-In Trip</div>
                  <div className="text-[11px] text-slate-500 font-medium">Including flights, companion & lodging</div>
                </div>
                <div className="font-black text-2xl text-vedara-deep">$27,350 – $35,350</div>
              </div>
            </div>

            {/* Savings Callout - Clean Slate Container (No Green Accent) */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-start gap-3">
              <div className="text-vedara-gold shrink-0 mt-0.5">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <p className="text-xs text-slate-700 font-medium leading-relaxed">
                Privately in the UK or North America, this procedure alone costs $40,000 – $60,000. 
                With us, you save 20–35% with every single travel, attendant, and recovery cost counted.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Compare Section - Distinct Light Card on Dark Field */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h3 className="font-extrabold text-2xl text-vedara-deep flex items-center gap-2.5">
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
                <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider text-[11px]">
                  <th className="pb-4 font-bold">Treatment</th>
                  <th className="pb-4 font-bold text-vedara-deep">India, All-In Trip *</th>
                  <th className="pb-4 font-bold text-slate-500">At Home (Private)</th>
                  <th className="pb-4 font-bold text-slate-500">Wait Times At Home</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                <tr>
                  <td className="py-4 font-bold text-slate-900 flex items-center gap-2">
                    <span>🦴</span> Knee replacement (Bilateral)
                  </td>
                  <td className="py-4 font-black text-vedara-deep">$27,350 – $35,350</td>
                  <td className="py-4 text-slate-600 font-semibold">$120,000 – $180,000</td>
                  <td className="py-4 text-slate-500">12 – 18 months wait</td>
                </tr>
                <tr>
                  <td className="py-4 font-bold text-slate-900 flex items-center gap-2">
                    <span>🦵</span> Hip replacement (Robotic)
                  </td>
                  <td className="py-4 font-black text-vedara-deep">$11,200 – $16,800</td>
                  <td className="py-4 text-slate-600 font-semibold">$25,000 – $45,000</td>
                  <td className="py-4 text-slate-500">9 – 14 months wait</td>
                </tr>
                <tr>
                  <td className="py-4 font-bold text-slate-900 flex items-center gap-2">
                    <span>🦷</span> Full-arch dental rehabilitation
                  </td>
                  <td className="py-4 font-black text-vedara-deep">$8,400 – $12,600</td>
                  <td className="py-4 text-slate-600 font-semibold">$15,000 – $30,000</td>
                  <td className="py-4 text-slate-500">6 – 8 months wait</td>
                </tr>
                <tr>
                  <td className="py-4 font-bold text-slate-900 flex items-center gap-2">
                    <span>👶</span> IVF with ICSI & genetic screening
                  </td>
                  <td className="py-4 font-black text-vedara-deep">$10,500 – $15,000</td>
                  <td className="py-4 text-slate-600 font-semibold">$20,000 – $35,000</td>
                  <td className="py-4 text-slate-500">Limited NHS cycles</td>
                </tr>
                <tr>
                  <td className="py-4 font-bold text-slate-900 flex items-center gap-2">
                    <span>👁️</span> Advanced refractive & lens surgery
                  </td>
                  <td className="py-4 font-black text-vedara-deep">$20,000 – $28,000</td>
                  <td className="py-4 text-slate-600 font-semibold">$80,000 – $150,000</td>
                  <td className="py-4 text-slate-500">8 – 12 months wait</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-400 leading-relaxed">
              * &quot;India, All-In Trip&quot; includes return flights, attendant accommodations, local transfers, all clinical fees, medication and contingency buffer.
            </p>

            {/* Primary Action: Gold Button */}
            <button className="shrink-0 px-8 py-3.5 rounded-xl bg-vedara-gold hover:bg-vedara-gold-hover text-vedara-deep text-sm font-bold shadow-md flex items-center gap-2 transition-all cursor-pointer">
              <span>Get a written quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
