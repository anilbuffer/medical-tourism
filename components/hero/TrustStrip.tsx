"use client";

import React from "react";
import { Award, Building2, Stethoscope, ShieldCheck } from "lucide-react";

export const TrustStrip = () => {
  return (
    <section className="bg-dark-3 py-16 flex items-center justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* The White Box representing the Trust Banner */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          
          <div className="flex flex-col items-center text-center px-4 w-full sm:w-1/4">
             <div className="w-16 h-16 mb-4 rounded-full flex items-center justify-center bg-orange-50 text-orange-600">
                <Award className="w-8 h-8" />
             </div>
             <h3 className="text-slate-900 font-bold text-sm sm:text-base mb-1.5">JCI & NABH accredited</h3>
             <p className="text-slate-500 text-xs tracking-wide">Verified 12 Aug 2021</p>
          </div>

          <div className="flex flex-col items-center text-center px-4 pt-8 sm:pt-0 w-full sm:w-1/4">
             <div className="w-16 h-16 mb-4 rounded-full flex items-center justify-center bg-green-50 text-green-600">
                <Building2 className="w-8 h-8" />
             </div>
             <h3 className="text-slate-900 font-bold text-sm sm:text-base mb-1.5">4 Partner hospitals</h3>
             <p className="text-slate-500 text-xs tracking-wide">Established 1996 - 2009</p>
          </div>

          <div className="flex flex-col items-center text-center px-4 pt-8 sm:pt-0 w-full sm:w-1/4">
             <div className="w-16 h-16 mb-4 rounded-full flex items-center justify-center bg-teal-50 text-teal-600">
                <Stethoscope className="w-8 h-8" />
             </div>
             <h3 className="text-slate-900 font-bold text-sm sm:text-base mb-1.5">Written specialist opinion</h3>
             <p className="text-slate-500 text-xs tracking-wide">within 24 hours</p>
          </div>

          <div className="flex flex-col items-center text-center px-4 pt-8 sm:pt-0 w-full sm:w-1/4">
             <div className="w-16 h-16 mb-4 rounded-full flex items-center justify-center bg-emerald-50 text-emerald-600">
                <ShieldCheck className="w-8 h-8" />
             </div>
             <h3 className="text-slate-900 font-bold text-sm sm:text-base mb-1.5">GlobalCare India Pvt Ltd</h3>
             <p className="text-slate-500 text-xs tracking-wide">CIN U74999HR1994CH1...</p>
          </div>

        </div>

        <div className="text-center mt-8">
           <a href="#" className="text-slate-400 hover:text-slate-300 text-sm font-medium transition-colors">
              Learn more about us &rarr;
           </a>
        </div>
      </div>
    </section>
  );
};
