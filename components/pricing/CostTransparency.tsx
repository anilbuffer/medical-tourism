"use client";

import React from "react";
import { ArrowRight, Info, CheckCircle2 } from "lucide-react";

export const CostTransparency = () => {
  return (
    <section className="py-12 sm:py-16 bg-[#031126]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-white font-bold text-xs uppercase tracking-widest mb-3">
            COST & HOW WE&apos;RE PAID
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
            The whole trip, not just the operating table.
          </h2>
        </div>

        {/* Top Calculator Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-2xl mb-12">
          
          {/* Left: Input */}
          <div className="bg-[#f4f6dc] p-8 sm:p-12 flex flex-col justify-center">
            
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-6 rounded-full bg-[#0F1340] text-white flex items-center justify-center text-xs font-bold">1</div>
                <h3 className="font-bold text-slate-800">Select treatment</h3>
              </div>
              <div className="flex gap-2 mb-4 pl-9">
                <button className="flex-1 py-2 rounded-lg bg-[#e5ca76] text-slate-800 text-sm font-bold shadow-sm">
                  Serious
                </button>
                <button className="flex-1 py-2 rounded-lg bg-white text-slate-500 text-sm font-medium border border-slate-200">
                  Elective
                </button>
              </div>
              <div className="pl-9">
                <select className="w-full p-3 rounded-xl border border-slate-200 bg-white text-slate-500 text-sm outline-none">
                  <option>Choose treatment</option>
                </select>
              </div>
            </div>

            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-6 rounded-full bg-[#0F1340] text-white flex items-center justify-center text-xs font-bold">2</div>
                <h3 className="font-bold text-slate-800">Number of attendants</h3>
              </div>
              <div className="pl-9">
                <select className="w-full p-3 rounded-xl border border-slate-200 bg-white text-slate-500 text-sm outline-none">
                  <option>Select Number of attendants</option>
                </select>
              </div>
            </div>

            <div className="mt-auto pl-9">
              <div className="flex items-start gap-2 text-slate-500">
                <Info className="w-4 h-4 shrink-0 mt-0.5" />
                <p className="text-xs leading-relaxed">
                  Indicative only. your written quote is itemized and fixed before you travel.
                </p>
              </div>
            </div>
            
          </div>

          {/* Right: Output */}
          <div className="bg-white p-8 sm:p-12">
            <h3 className="font-bold text-slate-800 mb-6">Itemized estimate</h3>
            
            <div className="space-y-4 text-sm text-slate-600 mb-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2"><span className="text-teal-600">🏥</span> Treatment range</div>
                <div className="font-medium text-slate-800">$18,000 - $25,000</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2"><span className="text-teal-600">✈️</span> Return flights (all travelers)</div>
                <div className="font-medium text-slate-800">$1,200</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2"><span className="text-teal-600">🏨</span> Accommodation (actual stay length)</div>
                <div className="font-medium text-slate-800">$1,800</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2"><span className="text-teal-600">👤</span> Attendant living costs</div>
                <div className="font-medium text-slate-800">$1,200</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2"><span className="text-teal-600">🚕</span> Transfers (airport, hospital, local)</div>
                <div className="font-medium text-slate-800">$400</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2"><span className="text-teal-600">💊</span> Take-home medication</div>
                <div className="font-medium text-slate-800">$300</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2"><span className="text-teal-600">🩺</span> Care once home</div>
                <div className="font-medium text-slate-800">$250</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2"><span className="text-teal-600">🛡️</span> 15% buffer</div>
                <div className="font-medium text-slate-800">$4,200</div>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-6 flex justify-between items-center mb-6">
              <div className="font-bold text-slate-900">Total (Per person)</div>
              <div className="font-extrabold text-xl text-slate-900">$27,350 - $35,350</div>
            </div>

            <div className="bg-[#f0f9f0] border border-[#c8e6c9] rounded-2xl p-4 flex gap-3">
              <div className="text-green-600 shrink-0 mt-0.5">🔒</div>
              <p className="text-xs text-green-800 font-medium leading-relaxed">
                Privately at home this costs about $40,000 - $60,000 for the procedure alone. 
                You&apos;d save roughly 20-35% once the whole trip is counted, not just the surgery.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Compare Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 bg-[#f4f6dc] rounded-3xl p-8">
            <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
              <span className="text-xl">📊</span> How it compares
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-200/50 text-slate-500">
                    <th className="pb-3 font-medium">Treatment</th>
                    <th className="pb-3 font-medium">India, all - in trip</th>
                    <th className="pb-3 font-medium">At home</th>
                    <th className="pb-3 font-medium">Availability at home</th>
                  </tr>
                </thead>
                <tbody className="text-slate-800">
                  <tr className="border-b border-slate-200/50">
                    <td className="py-4 font-medium flex items-center gap-2"><span className="text-slate-400">🦴</span> Knee replacement</td>
                    <td className="py-4 font-bold">$27,350 - $35,350</td>
                    <td className="py-4 text-slate-500">$120,000 - $180,000</td>
                    <td className="py-4 text-slate-500">Limited / long wait</td>
                  </tr>
                  <tr className="border-b border-slate-200/50">
                    <td className="py-4 font-medium flex items-center gap-2"><span className="text-slate-400">🦵</span> Hip replacement</td>
                    <td className="py-4 font-bold">$11,200 - $16,800</td>
                    <td className="py-4 text-slate-500">$25,000 - $45,000</td>
                    <td className="py-4 text-slate-500">Widely available</td>
                  </tr>
                  <tr className="border-b border-slate-200/50">
                    <td className="py-4 font-medium flex items-center gap-2"><span className="text-slate-400">🦷</span> Full-arch dental implants</td>
                    <td className="py-4 font-bold">$8,400 - $12,600</td>
                    <td className="py-4 text-slate-500">$15,000 - $30,000</td>
                    <td className="py-4 text-slate-500">Limited / long wait</td>
                  </tr>
                  <tr className="border-b border-slate-200/50">
                    <td className="py-4 font-medium flex items-center gap-2"><span className="text-slate-400">👶</span> IVF with ICSI</td>
                    <td className="py-4 font-bold">$10,500 - $15,000</td>
                    <td className="py-4 text-slate-500">$20,000 - $35,000</td>
                    <td className="py-4 text-slate-500">Limited</td>
                  </tr>
                  <tr>
                    <td className="py-4 font-medium flex items-center gap-2"><span className="text-slate-400">👁️</span> Cataract & lens surgery</td>
                    <td className="py-4 font-bold">$20,000 - $28,000</td>
                    <td className="py-4 text-slate-500">$80,000 - $150,000</td>
                    <td className="py-4 text-slate-500">Limited / long wait</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-[10px] text-[#a58d34] mt-6 leading-relaxed">
              *&quot;India, all-in trip&quot; includes flights, accommodation, one attendant, transfers, medication and buffer — not the surgical fee alone.
            </p>
            <div className="mt-6 flex justify-center">
              <button className="px-6 py-3 rounded-xl bg-[#5c6bc0] hover:bg-[#3f51b5] text-white text-sm font-bold shadow-md flex items-center gap-2 transition-colors">
                <span>Get a written quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="bg-[#f4f6dc] rounded-3xl p-8 h-fit">
            <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
              <span className="text-xl">💡</span> How we&apos;re paid
            </h3>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#a58d34] shrink-0 mt-0.5" />
                <span className="text-sm font-medium text-slate-800">Flat fee (not a commission)</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#a58d34] shrink-0 mt-0.5" />
                <span className="text-sm font-medium text-slate-800">Disclosed upfront, in writing</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#a58d34] shrink-0 mt-0.5" />
                <span className="text-sm font-medium text-slate-800">Identical at every hospital</span>
              </div>
            </div>

            <p className="text-sm font-bold text-slate-900 italic">
              No hidden markups.<br/>No percentage of your treatment cost.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
