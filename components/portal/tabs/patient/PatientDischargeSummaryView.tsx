"use client";

import React from "react";
import {
  HeartHandshake,
  FileText,
  Lock,
  Clock,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Stethoscope,
  Download,
} from "lucide-react";
import { PatientCase } from "@/types/portal";

interface PatientDischargeSummaryViewProps {
  patientCase: PatientCase;
}

export const PatientDischargeSummaryView: React.FC<PatientDischargeSummaryViewProps> = ({
  patientCase,
}) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2ECDC5]/10 text-[#3F4EB4] text-xs font-extrabold uppercase tracking-wider mb-2 border border-[#2ECDC5]/20">
            <HeartHandshake className="w-3.5 h-3.5 text-[#2ECDC5]" />
            Post-Op Telemetry & Discharge Records
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Post-Op Discharge Summary
          </h2>
          <p className="text-slate-500 text-sm mt-1 max-w-xl">
            Official discharge summary, surgical graft operative notes, and 12-month post-transplant immunosuppression regimen.
          </p>
        </div>

        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-amber-50 text-amber-800 border border-amber-200 text-xs font-extrabold">
          <Clock className="w-4 h-4 text-amber-600" />
          <span>Unlocks Post-Hospital Discharge</span>
        </span>
      </div>

      {/* Discharge Preview Card */}
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#3F4EB4]/10 text-[#3F4EB4] flex items-center justify-center font-bold">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-slate-900">
                Hospital Discharge Summary & Operative Protocol
              </h3>
              <div className="text-xs text-slate-500">
                Supervising Surgeon: Dr. Subhash Gupta • Medanta – The Medicity
              </div>
            </div>
          </div>

          <span className="text-xs font-bold text-slate-400 font-mono">
            STATUS: PRE-ADMISSION
          </span>
        </div>

        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-200 text-slate-600 flex items-center justify-center mx-auto">
            <Lock className="w-6 h-6" />
          </div>
          <div className="font-extrabold text-sm text-slate-800">
            Document Generated Following Surgical Discharge
          </div>
          <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
            Your final hospital discharge summary, liver graft biopsy records, and home-country follow-up protocol will be published here upon completion of your 14-day in-hospital treatment.
          </p>
        </div>
      </div>
    </div>
  );
};
