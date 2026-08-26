"use client";

import React, { useState } from "react";
import {
  Plane,
  FileCheck,
  Download,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ShieldCheck,
  Award,
  Globe,
  ExternalLink,
} from "lucide-react";
import { PatientCase } from "@/types/portal";
import { GovtVisaInvitationModal } from "../../modals/GovtVisaInvitationModal";

interface PatientVisaChecklistViewProps {
  patientCase: PatientCase;
}

export const PatientVisaChecklistView: React.FC<PatientVisaChecklistViewProps> = ({
  patientCase,
}) => {
  const [isVisaModalOpen, setIsVisaModalOpen] = useState(false);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2ECDC5]/10 text-[#3F4EB4] text-xs font-extrabold uppercase tracking-wider mb-2 border border-[#2ECDC5]/20">
            <Plane className="w-3.5 h-3.5 text-[#2ECDC5]" />
            Consular & Embassy Visa Cell
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Consolidated Travel & Medical Visa Checklist
          </h2>
          <p className="text-slate-500 text-sm mt-1 max-w-xl">
            Official Indian Medical Visa (e-Medical Visa) status, Ministry of External Affairs registration, and companion attendant clearance.
          </p>
        </div>

        <button
          onClick={() => setIsVisaModalOpen(true)}
          className="px-5 py-3.5 rounded-2xl bg-gradient-to-r from-[#1d8983] via-[#1baba4] to-[#1d8983] text-white text-xs font-black flex items-center gap-2 shadow-xl shadow-[#283593]/25 hover:scale-105 active:scale-95 transition-all cursor-pointer shrink-0"
        >
          <Award className="w-4 h-4 text-amber-300" />
          <span>Download Official Govt Invitation Letter</span>
        </button>
      </div>

      {/* Grid: Visa Status & Checklist Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Visa Approval Status Card */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <Globe className="w-5 h-5 text-[#3F4EB4]" />
              <h3 className="font-extrabold text-sm text-slate-900">e-Medical Visa Clearance</h3>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              🟢 Approved
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center">
              <span className="text-slate-500 font-medium">MEA Registry Reference:</span>
              <span className="font-mono font-bold text-slate-900">MEA/MED/2026/089412</span>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center">
              <span className="text-slate-500 font-medium">Visa Category:</span>
              <span className="font-bold text-slate-900">Triple Entry e-Medical Visa (60 Days)</span>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center">
              <span className="text-slate-500 font-medium">Attendant Companion Visa:</span>
              <span className="font-bold text-emerald-700">1 Escort Approved (Faris Al-Mansoor)</span>
            </div>
          </div>
        </div>

        {/* Visa Checklist Items */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <FileCheck className="w-5 h-5 text-emerald-600" />
              <h3 className="font-extrabold text-sm text-slate-900">Visa Requirements Checklist</h3>
            </div>
            <span className="text-xs font-bold text-slate-500">4 of 4 Completed</span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="p-3 rounded-2xl bg-emerald-50/60 border border-emerald-100 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-emerald-950 block">Official Govt Invitation Letter</strong>
                <span className="text-slate-600 text-[11px]">Issued by Medanta with Medical Director stamp</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-emerald-50/60 border border-emerald-100 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-emerald-950 block">Flight Booking & Arrival Manifest</strong>
                <span className="text-slate-600 text-[11px]">EK-512 Emirates arriving DEL Aug 31 at 04:15 AM</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-emerald-50/60 border border-emerald-100 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-emerald-950 block">Attendant Visa Protocol</strong>
                <span className="text-slate-600 text-[11px]">1 Escort permitted under e-Medical Attendant Visa</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-emerald-50/60 border border-emerald-100 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-emerald-950 block">Passport Scans Verified</strong>
                <span className="text-slate-600 text-[11px]">Minimum 6 months validity confirmed</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Official Invitation Letter Modal */}
      <GovtVisaInvitationModal
        isOpen={isVisaModalOpen}
        onClose={() => setIsVisaModalOpen(false)}
        patientCase={patientCase}
      />
    </div>
  );
};
