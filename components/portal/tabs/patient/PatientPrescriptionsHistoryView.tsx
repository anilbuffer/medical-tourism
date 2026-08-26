"use client";

import React, { useState } from "react";
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
  Phone,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import { PatientCase } from "@/types/portal";
import { WhatsAppContactModal } from "../../modals/WhatsAppContactModal";

interface PatientPrescriptionsHistoryViewProps {
  patientCase: PatientCase;
}

export const PatientPrescriptionsHistoryView: React.FC<PatientPrescriptionsHistoryViewProps> = ({
  patientCase,
}) => {
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2ECDC5]/10 text-[#3F4EB4] text-xs font-extrabold uppercase tracking-wider mb-2 border border-[#2ECDC5]/20">
            <Pill className="w-3.5 h-3.5 text-[#2ECDC5]" />
            Your Daily Health Plan
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Medications & Health Notes
          </h2>
          <p className="text-slate-500 text-sm mt-1 max-w-xl">
            A simple summary of your current medicines, pre-trip instructions, and health notes approved by Dr. Subhash Gupta.
          </p>
        </div>

        <button
          onClick={() => setIsWhatsAppOpen(true)}
          className="px-5 py-3 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 text-xs font-bold flex items-center gap-2 shadow-xs transition-colors cursor-pointer shrink-0"
        >
          <Phone className="w-4 h-4 text-emerald-600" />
          <span>Ask Coordinator About Medicines</span>
        </button>
      </div>

      {/* Medicines & Pre-Op Routine */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Medicines To Take */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Pill className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-base text-slate-900">
                Medicines to take before your trip
              </h3>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Active Routine
            </span>
          </div>

          <div className="space-y-3.5 text-xs">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1.5 hover:border-slate-200 transition-colors">
              <div className="flex items-center justify-between font-extrabold text-slate-900 text-sm">
                <span>Rifaximin 550mg</span>
                <span className="text-[11px] bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full font-bold">
                  Twice Daily (Morning & Night)
                </span>
              </div>
              <p className="text-slate-600 text-xs leading-relaxed">
                Protects your liver and keeps you healthy before travel. Keep taking this daily until your hospital check-in on Sep 1.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1.5 hover:border-slate-200 transition-colors">
              <div className="flex items-center justify-between font-extrabold text-slate-900 text-sm">
                <span>Water Pills (Spironolactone 50mg + Furosemide 20mg)</span>
                <span className="text-[11px] bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full font-bold">
                  Once Daily (With Breakfast)
                </span>
              </div>
              <p className="text-slate-600 text-xs leading-relaxed">
                Helps prevent fluid buildup and swelling. Take with water after morning meal.
              </p>
            </div>

            {/* Allergies Card */}
            <div className="p-4 bg-amber-50/70 rounded-2xl border border-amber-200 space-y-1">
              <div className="flex items-center gap-1.5 text-amber-900 font-extrabold text-xs">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Allergies & Sensitivities</span>
              </div>
              <p className="text-amber-950 font-bold text-xs">
                {patientCase.clinicalSummary.allergies?.join(", ") || "No known drug allergies reported."}
              </p>
              <span className="text-[11px] text-amber-700 block">
                If you develop any new reaction, let your coordinator know right away.
              </span>
            </div>
          </div>
        </div>

        {/* Doctor's Summary of Your Health */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#3F4EB4]/10 text-[#3F4EB4] flex items-center justify-center">
                <Stethoscope className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-base text-slate-900">
                Doctor's Health Summary
              </h3>
            </div>
            <span className="text-xs font-bold text-slate-500">
              Dr. Subhash Gupta
            </span>
          </div>

          <div className="space-y-3.5 text-xs">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
              <span className="text-slate-400 font-extrabold uppercase text-[10px]">
                Condition Being Treated
              </span>
              <p className="font-extrabold text-slate-900 text-sm">
                {patientCase.clinicalSummary.diagnosis}
              </p>
              <p className="text-slate-600 text-xs mt-1 leading-relaxed">
                Liver condition cleared for treatment with living donor transplant.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
              <span className="text-slate-400 font-extrabold uppercase text-[10px]">
                Living Donor Status
              </span>
              <p className="font-bold text-slate-900 text-xs">
                Son Faris Al-Mansoor (Age 28, Blood Group B+)
              </p>
              <p className="text-emerald-700 font-semibold text-xs mt-0.5 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Initial donor scan compatibility approved
              </p>
            </div>

            <div className="p-4 bg-blue-50/60 rounded-2xl border border-blue-100 space-y-1">
              <span className="text-[#3F4EB4] font-extrabold uppercase text-[10px]">
                What to bring to the hospital
              </span>
              <p className="text-slate-700 text-xs leading-relaxed">
                Please bring any current prescription boxes in their original packaging and your recent blood pressure/sugar log if applicable.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp Modal */}
      <WhatsAppContactModal
        isOpen={isWhatsAppOpen}
        onClose={() => setIsWhatsAppOpen(false)}
        coordinatorName="Ananya Sharma"
        caseId={patientCase.id}
      />
    </div>
  );
};
