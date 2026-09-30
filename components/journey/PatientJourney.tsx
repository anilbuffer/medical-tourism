"use client";

import React from "react";
import Image from "next/image";

export const PatientJourney = () => {
  return (
    <section className="py-12 sm:py-16 bg-[#f8f9fa] border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <p className="text-[#a58d34] font-bold text-xs uppercase tracking-widest mb-3">
              Your journey
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F1340]">
              From your first message to your<br className="hidden sm:block" />
              first day back at work.
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-400 tracking-widest">STEP</span>
            <span className="px-3 py-1 rounded-full bg-[#f4f6dc] text-[#a58d34] text-sm font-black border border-[#e5ca76]">
              5 <span className="text-[#a58d34]/60 font-medium">/ 6</span>
            </span>
          </div>
        </div>

        {/* Timeline Visualization (Simplified for the layout) */}
        <div className="relative mb-20 hidden md:block">
          <div className="absolute top-6 left-0 right-0 h-0.5 bg-slate-200"></div>
          
          <div className="flex justify-between relative z-10">
            {/* Step 1 */}
            <div className="flex flex-col items-center w-32">
              <div className="w-12 h-12 rounded-full bg-[#f4f6dc] border-4 border-white flex items-center justify-center text-[#a58d34] text-sm font-bold shadow-sm mb-3">
                1
              </div>
              <div className="text-[10px] text-slate-400 font-bold uppercase mb-1">3 Wks Before</div>
              <div className="text-xs text-slate-600 text-center font-medium">Send your X-Rays</div>
            </div>
            
            {/* Step 2 */}
            <div className="flex flex-col items-center w-32">
              <div className="w-12 h-12 rounded-full bg-[#f4f6dc] border-4 border-white flex items-center justify-center text-[#a58d34] text-sm font-bold shadow-sm mb-3">
                2
              </div>
              <div className="text-[10px] text-slate-400 font-bold uppercase mb-1">2 Wks Before</div>
              <div className="text-xs text-slate-600 text-center font-medium">MEET YOUR SURGEON</div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center w-32">
              <div className="w-12 h-12 rounded-full bg-[#f4f6dc] border-4 border-white flex items-center justify-center text-[#a58d34] text-sm font-bold shadow-sm mb-3">
                3
              </div>
              <div className="text-[10px] text-slate-400 font-bold uppercase mb-1">10 Days Before</div>
              <div className="text-xs text-slate-600 text-center font-medium">Visa & flights</div>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col items-center w-32">
              <div className="w-12 h-12 rounded-full bg-[#f4f6dc] border-4 border-white flex items-center justify-center text-[#a58d34] text-sm font-bold shadow-sm mb-3">
                4
              </div>
              <div className="text-[10px] text-slate-400 font-bold uppercase mb-1">3 Days Before</div>
              <div className="text-xs text-slate-600 text-center font-medium">Arrive & assessment</div>
            </div>

            {/* Step 5 (Active) */}
            <div className="flex flex-col items-center w-32">
              <div className="w-12 h-12 rounded-full bg-[#a58d34] border-4 border-white flex items-center justify-center text-white text-sm font-bold shadow-md mb-3 scale-110">
                5
              </div>
              <div className="text-[10px] text-slate-500 font-bold uppercase mb-1">Day 3</div>
              <div className="text-xs text-slate-900 text-center font-bold">Surgery</div>
            </div>
          </div>
        </div>

        {/* Selected Step Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left / Main Content */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col sm:flex-row gap-6">
            <div className="relative w-full sm:w-48 h-48 rounded-3xl overflow-hidden shrink-0 shadow-md">
              <Image 
                src="https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=400" 
                alt="Surgery" 
                fill 
                className="object-cover" 
              />
            </div>
            <div className="pt-2">
              <div className="text-[#a58d34] text-sm font-bold mb-1">Day 3</div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Surgery</h3>
              <p className="text-slate-600 text-sm leading-relaxed max-w-lg">
                Met inside arrivals, not outside the terminal. Nothing clinical on day one. 
                Day two is bloods, imaging and your anesthetic review — and if anything changes 
                the plan, you hear it in person that day.
              </p>
            </div>
          </div>

          {/* Right Content / Info Box */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="bg-[#f4f6dc] rounded-3xl p-8 h-full border border-[#e5ca76]/30">
              <p className="text-[#a58d34] font-bold text-sm leading-snug mb-6">
                The day everyone dreads and almost nobody remembers:
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-[#a58d34] text-xs font-bold shrink-0">A</div>
                  <div>
                    <div className="text-xs text-slate-500 font-bold mb-0.5">Where</div>
                    <div className="text-sm text-slate-800 font-medium">Partner hospital, Mohali</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-[#a58d34] text-xs font-bold shrink-0">B</div>
                  <div>
                    <div className="text-xs text-slate-500 font-bold mb-0.5">With you</div>
                    <div className="text-sm text-slate-800 font-medium">Your surgeon - family waiting</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
