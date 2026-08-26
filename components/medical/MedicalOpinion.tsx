"use client";

import React, { useState } from "react";
import { useCare } from "@/context/CareContext";
import {
  FileText,
  Upload,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Sparkles,
  ArrowRight,
  Info,
  Clock,
  FileCheck,
} from "lucide-react";

export const MedicalOpinion = () => {
  const { t, language, openIntake } = useCare();
  const [selectedReportType, setSelectedReportType] = useState<string>("MRI / CT / X-Ray");

  const reportCategories = [
    { name: "MRI / CT / X-Ray", desc: "Diagnostic radiology imaging & DICOM files" },
    { name: "Blood & Pathology", desc: "Lab work, biopsy & genetic sequencing reports" },
    { name: "Prescription & Regimen", desc: "Current medication list & dosage history" },
    { name: "Discharge Summary", desc: "Hospital admission notes & previous surgical summaries" },
    { name: "Previous Diagnosis", desc: "Physician opinions & treatment proposals" },
  ];

  return (
    <section id="opinion" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-[#0C2438] rounded-3xl p-8 sm:p-12 lg:p-16 text-white shadow-2xl border border-slate-800 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Header info */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2ECDC5]/10 border border-[#2ECDC5]/30 text-[#2ECDC5] text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>{t.opinion.eyebrow}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight font-sans">
                {t.opinion.heading}
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {t.opinion.subheading}
              </p>

              {/* Guarantees */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2 text-xs text-slate-200">
                  <Clock className="w-4 h-4 text-[#2ECDC5] shrink-0" />
                  <span>24–48 Hour Review Turnaround</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-200">
                  <ShieldCheck className="w-4 h-4 text-[#2ECDC5] shrink-0" />
                  <span>Senior Director Clinical Panel</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-200">
                  <Lock className="w-4 h-4 text-[#2ECDC5] shrink-0" />
                  <span>100% Encrypted & Private</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-[#2ECDC5] shrink-0" />
                  <span>Zero Financial Obligation</span>
                </div>
              </div>
            </div>

            {/* Right Interactive Upload Selector */}
            <div className="lg:col-span-6">
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 space-y-5">
                <div className="text-xs font-bold uppercase tracking-wider text-[#2ECDC5]">
                  Select Document Category to Begin:
                </div>

                {/* Category Chips */}
                <div className="space-y-2">
                  {reportCategories.map((cat) => (
                    <button
                      key={cat.name}
                      onClick={() => setSelectedReportType(cat.name)}
                      className={`w-full text-left rtl:text-right p-3.5 rounded-xl transition-all border flex items-center justify-between ${selectedReportType === cat.name
                        ? "bg-[#2ECDC5]/15 border-[#2ECDC5]/60 text-white"
                        : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${selectedReportType === cat.name
                            ? "bg-[#2ECDC5] text-slate-950"
                            : "bg-white/10 text-slate-400"
                            }`}
                        >
                          <FileText className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white">{cat.name}</div>
                          <div className="text-[10px] text-slate-400">{cat.desc}</div>
                        </div>
                      </div>
                      {selectedReportType === cat.name && (
                        <CheckCircle2 className="w-4 h-4 text-[#2ECDC5]" />
                      )}
                    </button>
                  ))}
                </div>

                {/* Upload Action */}
                <button
                  onClick={() => openIntake(selectedReportType)}
                  className="w-full py-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#2ECDC5] via-[#2ECDC5] to-[#2abdb5]  shadow-xl shadow-[#283593]/20 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
                >
                  <Upload className="w-4 h-4" />
                  <span>{t.opinion.cta}</span>
                </button>

                {/* Clinical disclaimer */}
                <div className="flex items-start gap-2 text-[11px] text-slate-400 pt-2 border-t border-white/10">
                  <Info className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                  <p>{t.opinion.disclaimer}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
