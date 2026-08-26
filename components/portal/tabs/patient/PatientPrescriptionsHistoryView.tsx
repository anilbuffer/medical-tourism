"use client";

import React from "react";
import {
  FileText,
  Stethoscope,
  Pill,
  Heart,
  Calendar,
  Clock,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { PatientCase } from "@/types/portal";

interface PatientPrescriptionsHistoryViewProps {
  patientCase: PatientCase;
}

export const PatientPrescriptionsHistoryView: React.FC<PatientPrescriptionsHistoryViewProps> = ({
  patientCase,
}) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2ECDC5]/10 text-[#3F4EB4] text-xs font-extrabold uppercase tracking-wider mb-2 border border-[#2ECDC5]/20">
            <Pill className="w-3.5 h-3.5 text-[#2ECDC5]" />
            Clinical Records & Medical Regimen
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Prescriptions & Health History
          </h2>
          <p className="text-slate-500 text-sm mt-1 max-w-xl">
            Pre-operative medications, hepatic baseline measurements, known allergies, and donor evaluation history.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-extrabold text-emerald-700 bg-emerald-50 px-4 py-2 rounded-2xl border border-emerald-200">
          <CheckCircle2 className="w-4 h-4" />
          <span>Cleared for LDLT Protocol</span>
        </div>
      </div>

      {/* Clinical Diagnosis & Health Baseline */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Chief Diagnosis & History */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <Stethoscope className="w-5 h-5 text-[#3F4EB4]" />
            <h3 className="font-extrabold text-sm text-slate-900">Clinical Diagnosis Summary</h3>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
              <span className="text-slate-400 font-bold uppercase text-[10px]">Primary Diagnosis</span>
              <p className="font-extrabold text-slate-900 text-sm leading-snug">
                {patientCase.clinicalSummary.diagnosis}
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
              <span className="text-slate-400 font-bold uppercase text-[10px]">Chief Complaint & Presentation</span>
              <p className="text-slate-700 leading-relaxed font-medium">
                {patientCase.clinicalSummary.chiefComplaint}
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
              <span className="text-slate-400 font-bold uppercase text-[10px]">Medical History & Donor Status</span>
              <p className="text-slate-700 leading-relaxed font-medium">
                {patientCase.clinicalSummary.pastMedicalHistory}
              </p>
            </div>
          </div>
        </div>

        {/* Current Regimen & Pre-Op Directives */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <Pill className="w-5 h-5 text-emerald-600" />
            <h3 className="font-extrabold text-sm text-slate-900">Pre-Operative Medication Directives</h3>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 bg-emerald-50/50 rounded-2xl border border-emerald-100 space-y-1.5">
              <div className="flex items-center justify-between font-extrabold text-emerald-900">
                <span>Rifaximin 550mg</span>
                <span className="text-[10px] bg-emerald-100 px-2 py-0.5 rounded-full text-emerald-800">Twice Daily</span>
              </div>
              <p className="text-slate-600 text-[11px]">
                Hepatic encephalopathy prophylaxis. Continue until hospital check-in on Sep 1.
              </p>
            </div>

            <div className="p-3.5 bg-emerald-50/50 rounded-2xl border border-emerald-100 space-y-1.5">
              <div className="flex items-center justify-between font-extrabold text-emerald-900">
                <span>Spironolactone 50mg + Furosemide 20mg</span>
                <span className="text-[10px] bg-emerald-100 px-2 py-0.5 rounded-full text-emerald-800">Once Daily (Morning)</span>
              </div>
              <p className="text-slate-600 text-[11px]">
                Ascites and fluid balance management. Monitor serum electrolytes.
              </p>
            </div>

            <div className="p-3.5 bg-amber-50/60 rounded-2xl border border-amber-200/80 space-y-1">
              <span className="text-amber-800 font-extrabold uppercase text-[10px] flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                Allergies & Sensitivities
              </span>
              <p className="text-amber-950 font-bold">
                {patientCase.clinicalSummary.allergies?.join(", ") || "None Reported"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
