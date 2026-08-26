"use client";

import React, { useState } from "react";
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
  Phone,
  MessageSquare,
} from "lucide-react";
import { PatientCase } from "@/types/portal";
import { WhatsAppContactModal } from "../../modals/WhatsAppContactModal";

interface PatientDoctorOpinionsViewProps {
  patientCase: PatientCase;
}

export const PatientDoctorOpinionsView: React.FC<PatientDoctorOpinionsViewProps> = ({
  patientCase,
}) => {
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2ECDC5]/10 text-[#3F4EB4] text-xs font-extrabold uppercase tracking-wider mb-2 border border-[#2ECDC5]/20">
            <Stethoscope className="w-3.5 h-3.5 text-[#2ECDC5]" />
            Doctor's Clinical Notes
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Doctor's Evaluation & Written Advice
          </h2>
          <p className="text-slate-500 text-sm mt-1 max-w-xl">
            Official written treatment plan, surgical candidacy approval, and hospital stay roadmap from Dr. Subhash Gupta.
          </p>
        </div>

        <button
          onClick={() => {
            alert("Official Clinical Opinion PDF downloaded successfully!");
          }}
          className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#1d8983] via-[#1baba4] to-[#1d8983] text-white text-xs font-black flex items-center gap-2 shadow-xl shadow-[#283593]/20 hover:scale-105 active:scale-95 transition-all cursor-pointer shrink-0"
        >
          <Download className="w-4 h-4" />
          <span>Download Doctor's Letter (PDF)</span>
        </button>
      </div>

      {/* Main Opinion Document Card */}
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] space-y-6">
        {/* Doctor Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="flex items-center gap-4">
            <img
              src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80"
              alt="Dr. Subhash Gupta"
              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-[#3F4EB4]/20 shadow-md"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-slate-900">Dr. Subhash Gupta</h3>
                <span className="text-[11px] font-extrabold px-3 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Approved for Treatment
                </span>
              </div>
              <div className="text-xs text-slate-500 font-bold">
                Chief Liver Transplant Surgeon & Chairman HPB
              </div>
              <div className="text-xs text-[#3F4EB4] font-semibold mt-0.5">
                Medanta – The Medicity Hospital, Delhi NCR
              </div>
            </div>
          </div>

          <div className="text-left sm:text-right text-xs text-slate-500">
            <span className="font-bold text-slate-900 block font-mono">REPORT #2026-89412</span>
            <span>Issued: August 24, 2026</span>
          </div>
        </div>

        {/* Written Treatment Plan in Plain Language */}
        <div className="space-y-5 text-xs">
          {/* Approval Card */}
          <div className="p-5 bg-emerald-50/70 rounded-2xl border border-emerald-200 text-emerald-950 leading-relaxed">
            <div className="flex items-center gap-2 font-black text-emerald-900 text-sm mb-1">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>Surgical Candidacy Confirmed</span>
            </div>
            <p className="text-xs font-medium">
              After reviewing the MRI scans and clinical blood tests, Dr. Gupta confirms that Tariq Al-Mansoor is an ideal candidate for a living donor liver transplant. Initial donor tests with biological son Faris show excellent compatibility.
            </p>
          </div>

          {/* 4 Steps of Treatment */}
          <div>
            <h4 className="text-sm font-extrabold text-slate-900 mb-3">
              What your hospital stay will look like:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                <strong className="text-slate-900 font-extrabold text-xs block">
                  1. Pre-Admission Check (Day 1)
                </strong>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Arrival at Medanta. Routine confirmatory blood work, final ultrasound check, and meeting your care nurses.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                <strong className="text-slate-900 font-extrabold text-xs block">
                  2. Surgery Day (Day 3)
                </strong>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Living donor transplant procedure led by Chief Surgeon Dr. Subhash Gupta and the dedicated transplant surgical team.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                <strong className="text-slate-900 font-extrabold text-xs block">
                  3. In-Hospital Recovery (Days 4–7)
                </strong>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Careful round-the-clock monitoring and gradual resumption of light movements with nurse assistance.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                <strong className="text-slate-900 font-extrabold text-xs block">
                  4. Private Room & Discharge (Days 8–14)
                </strong>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Transfer to your private suite with your family member, dietary plan transition, and discharge clearance for local hotel stay.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Stat Pill Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center">
              <span className="text-slate-400 text-[10px] uppercase font-bold block">Hospital Duration</span>
              <span className="text-base font-black text-slate-900">14 Days</span>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center">
              <span className="text-slate-400 text-[10px] uppercase font-bold block">Room Type</span>
              <span className="text-base font-black text-slate-900">Private Suite + Companion Bed</span>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center">
              <span className="text-slate-400 text-[10px] uppercase font-bold block">Estimated Package</span>
              <span className="text-base font-black text-emerald-700">$28,500 USD (All-Inclusive)</span>
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
