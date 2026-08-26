"use client";

import React from "react";
import {
  FileText,
  Stethoscope,
  Building2,
  CheckCircle2,
  Calendar,
  Sparkles,
  ShieldCheck,
  Download,
  Award,
} from "lucide-react";
import { PatientCase } from "@/types/portal";

interface PatientDoctorOpinionsViewProps {
  patientCase: PatientCase;
}

export const PatientDoctorOpinionsView: React.FC<PatientDoctorOpinionsViewProps> = ({
  patientCase,
}) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2ECDC5]/10 text-[#3F4EB4] text-xs font-extrabold uppercase tracking-wider mb-2 border border-[#2ECDC5]/20">
            <Stethoscope className="w-3.5 h-3.5 text-[#2ECDC5]" />
            Hospital Review & Written Clinical Plans
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Doctor Opinions & Written Treatment Plans
          </h2>
          <p className="text-slate-500 text-sm mt-1 max-w-xl">
            Official written treatment plan, surgical candidacy determinations, and hospital admission protocols from Dr. Subhash Gupta.
          </p>
        </div>

        <button
          onClick={() => {
            alert("Official Clinical Opinion PDF downloaded successfully!");
          }}
          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-[#1d8983] via-[#1baba4] to-[#1d8983] text-white text-xs font-black flex items-center gap-2 shadow-xl shadow-[#283593]/20 active:scale-95 transition-all cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>Download Written Opinion PDF</span>
        </button>
      </div>

      {/* Main Opinion Document Card */}
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        {/* Doctor Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-5">
          <div className="flex items-center gap-4">
            <img
              src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80"
              alt="Dr. Subhash Gupta"
              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-[#3F4EB4]/20 shadow-md"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-slate-900">Dr. Subhash Gupta</h3>
                <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Transplant Director Clearance
                </span>
              </div>
              <div className="text-xs text-slate-500 font-bold">
                Chief Liver Transplant Surgeon & Chairman HPB
              </div>
              <div className="text-xs text-[#3F4EB4] font-semibold mt-0.5">
                Medanta – The Medicity, Delhi NCR (JCI Accredited)
              </div>
            </div>
          </div>

          <div className="text-right text-xs text-slate-500">
            <span className="font-bold text-slate-900 block font-mono">OPINION-2026-89412</span>
            <span>Issued: August 24, 2026</span>
          </div>
        </div>

        {/* Written Treatment Plan */}
        <div className="space-y-4 text-xs">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-1">
              Surgical Candidacy Determination
            </span>
            <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-100 text-emerald-950 font-medium leading-relaxed">
              <strong className="text-emerald-900 font-extrabold">CANDIDATE CLEARED: </strong>
              The patient demonstrates end-stage liver disease secondary to NASH with MELD-Na of 24. Donor graft volumetric ratio with biological son (Faris, 28yo, B+) is calculated at 68% SLV. Anatomical clearance confirmed on 3.0T MRI DICOM.
            </div>
          </div>

          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-1">
              Comprehensive Surgical & In-Hospital Plan
            </span>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-slate-800 leading-relaxed font-sans space-y-2">
              <p>
                <strong>1. Pre-Admission (Day 1):</strong> Arrival at Medanta. Repeat liver function test, viral serology confirmation (re-check missing page 2 items), and living donor final vascular Doppler cross-match.
              </p>
              <p>
                <strong>2. Operative Procedure (Day 3):</strong> Living Donor Liver Transplant (LDLT) with right lobe graft harvest without middle hepatic vein inclusion. Dual team simultaneous hepatectomy and recipient implantation.
              </p>
              <p>
                <strong>3. ICU Isolation & Post-Op (Days 4–7):</strong> Intensive Care Isolation monitoring with continuous Doppler hepatic artery flows and baseline Tacrolimus titration.
              </p>
              <p>
                <strong>4. Step-Down Deluxe Suite (Days 8–14):</strong> Oral diet re-introduction, mobilization, companion support accommodation, and discharge clearance.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 text-center">
              <span className="text-slate-400 text-[10px] uppercase font-bold block">Hospital Stay</span>
              <span className="text-base font-black text-slate-900">14 Days</span>
            </div>
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 text-center">
              <span className="text-slate-400 text-[10px] uppercase font-bold block">ICU Isolation</span>
              <span className="text-base font-black text-slate-900">4 Days Included</span>
            </div>
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 text-center">
              <span className="text-slate-400 text-[10px] uppercase font-bold block">Estimated Package</span>
              <span className="text-base font-black text-emerald-700">$28,500 USD</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
