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
  Phone,
  MessageSquare,
} from "lucide-react";
import { PatientCase } from "@/types/portal";
import { GovtVisaInvitationModal } from "../../modals/GovtVisaInvitationModal";
import { WhatsAppContactModal } from "../../modals/WhatsAppContactModal";

interface PatientVisaChecklistViewProps {
  patientCase: PatientCase;
}

export const PatientVisaChecklistView: React.FC<PatientVisaChecklistViewProps> = ({
  patientCase,
}) => {
  const [isVisaModalOpen, setIsVisaModalOpen] = useState(false);
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2ECDC5]/10 text-[#3F4EB4] text-xs font-extrabold uppercase tracking-wider mb-2 border border-[#2ECDC5]/20">
            <Globe className="w-3.5 h-3.5 text-[#2ECDC5]" />
            Travel Clearance
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Visa & Entry Permission
          </h2>
          <p className="text-slate-500 text-sm mt-1 max-w-xl">
            Official Indian e-Medical Visa status and government hospital invitation letter for you and your companion.
          </p>
        </div>

        <div className="flex flex-col items-end gap-2 shrink-0">
          <button
            onClick={() => setIsVisaModalOpen(true)}
            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#1d8983] via-[#1baba4] to-[#1d8983] text-white text-xs font-black flex items-center gap-2 shadow-xl shadow-[#283593]/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <Download className="w-4 h-4 text-white" />
            <span>Download Visa Invitation Letter</span>
          </button>
          <div className="flex items-center gap-2 text-[11px] text-slate-500">
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-bold border border-emerald-200">v1.2 — Latest</span>
            <span>Updated Aug 20, 2026</span>
          </div>
        </div>
      </div>

      {/* Grid: Visa Status & Checklist Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Visa Approval Status Card */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Globe className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-base text-slate-900">e-Medical Visa Status</h3>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Approved
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center">
              <span className="text-slate-500 font-medium">Visa Reference:</span>
              <span className="font-mono font-bold text-slate-900">MEA/MED/2026/089412</span>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center">
              <span className="text-slate-500 font-medium">Visa Reference:</span>
              <span className="font-mono font-bold text-slate-900">MEA/MED/2026/089412</span>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center">
              <span className="text-slate-500 font-medium">Visa Type:</span>
              <span className="font-bold text-slate-900">Triple Entry e-Medical Visa (60 Days)</span>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center">
              <span className="text-slate-500 font-medium">Traveling Companion:</span>
              <span className="font-bold text-emerald-700">1 Attendant Approved (Faris Al-Mansoor)</span>
            </div>

            <div className="p-3.5 bg-emerald-50/70 rounded-2xl border border-emerald-200 text-emerald-950 font-medium leading-relaxed">
              <strong>Ready for Travel:</strong> Your visa clearance is active. Please keep a printed copy of your hospital invitation letter with your passport.
            </div>

            <div className="flex items-center gap-2 text-[11px] text-slate-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Last synced with MEA Government Portal: Aug 27, 2026 at 09:14 AM IST
            </div>
          </div>
        </div>

        {/* Airport Pickup Details Card */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#2ECDC5]/10 text-[#2ECDC5] flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-base text-slate-900">Airport VIP Pickup</h3>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Confirmed
            </span>
          </div>

          {/* Driver Card */}
          <div className="p-4 bg-gradient-to-br from-[#141d60]/5 to-[#3F4EB4]/5 rounded-2xl border border-[#3F4EB4]/15 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#3F4EB4] flex items-center justify-center text-white font-black text-lg">
                R
              </div>
              <div>
                <div className="font-extrabold text-slate-900">Driver: Ramesh Kumar</div>
                <div className="text-xs text-slate-500">Personal Chauffeur — Medanta VIP Fleet</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 bg-white rounded-xl border border-slate-100">
                <div className="text-slate-400 font-medium">Contact</div>
                <div className="font-bold text-slate-900 mt-0.5">+91-98110-43721</div>
              </div>
              <div className="p-2.5 bg-white rounded-xl border border-slate-100">
                <div className="text-slate-400 font-medium">Vehicle</div>
                <div className="font-bold text-slate-900 mt-0.5">Toyota Innova</div>
              </div>
              <div className="p-2.5 bg-white rounded-xl border border-slate-100">
                <div className="text-slate-400 font-medium">Registration</div>
                <div className="font-bold text-slate-900 mt-0.5">DL-01-CA-2847</div>
              </div>
              <div className="p-2.5 bg-white rounded-xl border border-slate-100">
                <div className="text-slate-400 font-medium">Pickup Location</div>
                <div className="font-bold text-slate-900 mt-0.5">Gate 5, T3 — IGI Airport</div>
              </div>
            </div>
            <div className="p-3 bg-amber-50 border border-amber-100 rounded-xl text-xs text-amber-700 font-medium">
              ✈ Your flight EK-512 arrives Aug 31 at 04:15 AM. Ramesh will be waiting at Gate 5 with a "Tariq Al-Mansoor" namecard.
            </div>
          </div>
        </div>
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-100 text-[#3F4EB4] flex items-center justify-center">
                <FileCheck className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-base text-slate-900">Travel Readiness Checklist</h3>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              All 4 Ready
            </span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-100 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-emerald-950 block">Official Hospital Invitation Letter</strong>
                <span className="text-slate-600 text-[11px]">Issued by Medanta Hospital with Director stamp</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-100 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-emerald-950 block">Flight Booking & Arrival Time</strong>
                <span className="text-slate-600 text-[11px]">Emirates EK-512 arriving Delhi on Aug 31 at 04:15 AM</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-100 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-emerald-950 block">Companion Attendant Visa</strong>
                <span className="text-slate-600 text-[11px]">Approved for son Faris Al-Mansoor</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-100 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-emerald-950 block">Passports Verified</strong>
                <span className="text-slate-600 text-[11px]">Valid for more than 6 months</span>
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
