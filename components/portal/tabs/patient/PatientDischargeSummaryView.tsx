"use client";

import React, { useState } from "react";
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
  Phone,
} from "lucide-react";
import { PatientCase } from "@/types/portal";
import { WhatsAppContactModal } from "../../modals/WhatsAppContactModal";

interface PatientDischargeSummaryViewProps {
  patientCase: PatientCase;
}

export const PatientDischargeSummaryView: React.FC<PatientDischargeSummaryViewProps> = ({
  patientCase,
}) => {
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2ECDC5]/10 text-[#3F4EB4] text-xs font-extrabold uppercase tracking-wider mb-2 border border-[#2ECDC5]/20">
            <HeartHandshake className="w-3.5 h-3.5 text-[#2ECDC5]" />
            Post-Hospital Care
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Discharge Summary & Care Plan
          </h2>
          <p className="text-slate-500 text-sm mt-1 max-w-xl">
            Your final hospital discharge notes, medicine instructions for home, and recovery timeline will be published here after treatment.
          </p>
        </div>

        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-amber-50 text-amber-800 border border-amber-200 text-xs font-extrabold">
          <Clock className="w-4 h-4 text-amber-600" />
          <span>Available After Hospital Stay</span>
        </span>
      </div>

      {/* Discharge Preview Card */}
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#3F4EB4]/10 text-[#3F4EB4] flex items-center justify-center font-bold">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900">
                Official Hospital Discharge Report
              </h3>
              <div className="text-xs text-slate-500">
                Supervising Surgeon: Dr. Subhash Gupta • Medanta – The Medicity
              </div>
            </div>
          </div>

          <span className="text-xs font-bold text-slate-400">
            Pre-Treatment Phase
          </span>
        </div>

        <div className="p-8 bg-slate-50 rounded-3xl border border-slate-200 text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-slate-200/80 text-slate-600 flex items-center justify-center mx-auto mb-1">
            <Lock className="w-6 h-6 text-slate-500" />
          </div>
          <div className="font-extrabold text-base text-slate-800">
            Document Ready Upon Hospital Discharge
          </div>
          <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
            Your final hospital discharge summary, medication dosage schedule for home, and 12-month follow-up calendar will be placed here by your doctor on Day 14.
          </p>

          <div className="pt-2">
            <button
              onClick={() => setIsWhatsAppOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs border border-slate-200 inline-flex items-center gap-2 cursor-pointer transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-600" />
              <span>Questions about recovery? Ask Coordinator</span>
            </button>
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
