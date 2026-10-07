"use client";

import React from "react";
import { UploadCloud, ArrowRight, Lock } from "lucide-react";

export const ConnectSection1 = () => {
  return (
    <section className="py-12 sm:py-16 bg-slate-50 border-t border-[#E4E9ED]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-[#0070E0] font-bold text-xs uppercase tracking-widest mb-3">
            LET&apos;S CONNECT
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4">
            Send us the reports. We&apos;ll tell you honestly whether to come.
          </h2>
          <p className="text-slate-600 max-w-3xl mx-auto text-lg font-light leading-relaxed">
            It costs nothing and commits you to nothing. If travelling isn&apos;t the right answer we&apos;ll say so, and tell you what to ask your own doctor instead.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Left Column: What happens next */}
          <div className="flex flex-col">
            <h3 className="text-2xl font-bold mb-8 text-slate-900">What happens next</h3>
            
            <div className="space-y-8 flex-1">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-[#007FFF]/10 border border-[#007FFF]/20 flex items-center justify-center font-bold text-[#0070E0] shrink-0 shadow-sm">1</div>
                <div>
                  <h4 className="font-bold text-lg mb-1 text-slate-900">Today.</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">We reply and tell you which records are still missing.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-[#007FFF]/10 border border-[#007FFF]/20 flex items-center justify-center font-bold text-[#0070E0] shrink-0 shadow-sm">2</div>
                <div>
                  <h4 className="font-bold text-lg mb-1 text-slate-900">Within 24 hours for urgent cases.</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">A specialist in the relevant field reads the file and gives a written opinion.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-[#007FFF]/10 border border-[#007FFF]/20 flex items-center justify-center font-bold text-[#0070E0] shrink-0 shadow-sm">3</div>
                <div>
                  <h4 className="font-bold text-lg mb-1 text-slate-900">By day three.</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">An itemised quote and a visa invitation letter — or a written explanation of why we&apos;ve said no.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-[#007FFF]/10 border border-[#007FFF]/20 flex items-center justify-center font-bold text-[#0070E0] shrink-0 shadow-sm">4</div>
                <div>
                  <h4 className="font-bold text-lg mb-1 text-slate-900">Then, if it&apos;s a &apos;yes&apos;.</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">A video call with the treating doctor, with your whole family in the room and an interpreter if you want one.</p>
                </div>
              </div>
            </div>

            <div className="mt-12 bg-white p-5 rounded-2xl border border-[#E4E9ED] flex gap-4 shadow-sm">
              <Lock className="w-6 h-6 text-[#0070E0] shrink-0" />
              <p className="text-xs text-slate-500 leading-relaxed">
                Records are encrypted, stored in the EU, and handled under India&apos;s DPDP Act 2023, the UK GDPR and equivalent local rules. Shared only with the clinician you approve. Data Protection Officer: dpo@mycaretourindia.com
              </p>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="bg-white rounded-3xl p-8 border border-[#E4E9ED] shadow-xl">
            <form className="space-y-4">
              <div className="mb-4">
                <label className="block text-xs font-bold text-slate-600 mb-1.5">Your name</label>
                <input type="text" className="w-full bg-slate-50 border border-[#E4E9ED] rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#0070E0] transition-colors" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5">Email address</label>
                  <input type="email" className="w-full bg-slate-50 border border-[#E4E9ED] rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#0070E0] transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5">Phone / WhatsApp (include code)</label>
                  <input type="tel" className="w-full bg-slate-50 border border-[#E4E9ED] rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#0070E0] transition-colors" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5">Where are you now?</label>
                  <input type="text" className="w-full bg-slate-50 border border-[#E4E9ED] rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#0070E0] transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5">Language preferred</label>
                  <select className="w-full bg-slate-50 border border-[#E4E9ED] rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#0070E0] transition-colors appearance-none">
                    <option>English</option>
                    <option>Arabic</option>
                    <option>French</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5">Tell us what&apos;s happening</label>
                <textarea rows={3} className="w-full bg-slate-50 border border-[#E4E9ED] rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-[#0070E0] transition-colors resize-none"></textarea>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5">Scans, reports, biopsy results</label>
                <div className="w-full border-2 border-dashed border-[#E4E9ED] hover:border-[#0070E0] rounded-xl p-6 text-center bg-slate-50 hover:bg-slate-100 transition-all cursor-pointer flex flex-col items-center gap-2">
                  <UploadCloud className="w-8 h-8 text-[#007FFF]" />
                  <span className="text-sm text-slate-600 font-medium">Drag and drop or browse files</span>
                </div>
              </div>

              <div className="flex items-start gap-3 mt-4">
                <input type="checkbox" className="mt-1 shrink-0 accent-[#0070E0]" />
                <label className="text-xs text-slate-500">
                  I&apos;m happy for Vedara to hold and review this health information to organise my care.
                </label>
              </div>

              <button type="button" className="w-full mt-6 px-6 py-4 rounded-xl bg-[#0070E0] hover:bg-[#007FFF] text-white text-sm font-bold shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer">
                <span>Get in touch</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
          
        </div>
      </div>
    </section>
  );
};
