"use client";

import React, { useState } from "react";
import { PatientCase } from "@/types/portal";
import { usePortal } from "@/lib/portal/store";
import {
  Building2,
  Stethoscope,
  CheckCircle2,
  AlertTriangle,
  Clock,
  DollarSign,
  ShieldCheck,
  Send,
  Sparkles,
  Layers,
  ArrowRight,
  FileCheck,
} from "lucide-react";

interface CSHospitalOpinionsTabProps {
  patientCase: PatientCase;
  onNavigateToQuote?: () => void;
  onForwardToPatient?: (opinionSummary: string) => void;
}

export const CSHospitalOpinionsTab: React.FC<CSHospitalOpinionsTabProps> = ({
  patientCase,
  onNavigateToQuote,
  onForwardToPatient,
}) => {
  const { currentUser } = usePortal();
  const [forwardSuccess, setForwardSuccess] = useState(false);

  const docName =
    patientCase.acceptedByDoctorName ||
    patientCase.clinicalWorkspace?.submittedByDoctorName ||
    (patientCase.assignedDoctorId === "doc_gupta"
      ? "Dr. Subhash Gupta"
      : patientCase.assignedDoctorId === "doc_ashok_rajgopal"
      ? "Dr. Ashok Rajgopal"
      : "Lead Surgeon");

  const hospitalName =
    patientCase.assignedHospitalId === "hosp_medanta"
      ? "Medanta – The Medicity, Delhi NCR"
      : patientCase.assignedHospitalId === "hosp_apollo"
      ? "Apollo Hospitals, Chennai"
      : "Fortis Memorial Research Institute";

  const suitability =
    patientCase.clinicalWorkspace?.suitabilityDetermination ||
    (patientCase.caseDecisionStatus === "accepted" ? "suitable" : "pending");

  const stayDays = patientCase.clinicalWorkspace?.expectedStayDays || 14;
  const icuDays = 3;
  const roomDays = Math.max(1, stayDays - icuDays);

  const costEstimate =
    patientCase.clinicalWorkspace?.costEstimateUsd ||
    (patientCase.id === "PT-2026-089412" ? 22000 : 7200);

  const minRange = Math.round(costEstimate * 0.95);
  const maxRange = Math.round(costEstimate * 1.15);

  const writtenOpinion =
    patientCase.clinicalWorkspace?.treatmentPlan ||
    (patientCase.id === "PT-2026-089412"
      ? "Patient Tariq Al-Mansoor is an optimal candidate for Living Donor Liver Transplant (LDLT). Living donor Faris Al-Mansoor evaluated (blood group B+ compatible). Right lobe graft volumetric ratio calculated at 68% standard liver volume with clean vascular bifurcation. Surgical team cleared for immediate scheduling upon Page 2 serology confirmation."
      : "Patient evaluated for Bilateral Total Knee Replacement. Stryker Mako robotic CT-guided navigation recommended. Fast-track physical therapy protocol with 5 days hospital stay.");

  const handleForward = () => {
    if (onForwardToPatient) {
      onForwardToPatient(
        `Doctor Opinion from ${docName} (${hospitalName}): Patient cleared as ${suitability.toUpperCase()}. Estimated length of stay: ${stayDays} days (${icuDays}d ICU + ${roomDays}d Room). Cost range: $${minRange.toLocaleString()} - $${maxRange.toLocaleString()} USD.`
      );
    }
    setForwardSuccess(true);
    setTimeout(() => setForwardSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Handoff Status Strip */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-base text-slate-900">
              Hospital Handover &amp; Clinical Determination Desk
            </span>
            <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
              Clinical System of Record
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Official evaluation record timestamped to surgeon account per hospital liability governance.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {onNavigateToQuote && (
            <button
              onClick={onNavigateToQuote}
              className="px-4 py-2.5 rounded-xl bg-[#101955] hover:bg-[#1c2770] text-white text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-md"
            >
              <DollarSign className="w-3.5 h-3.5 text-[#2ECDC5]" />
              <span>Import to Quote Builder</span>
            </button>
          )}
        </div>
      </div>

      {forwardSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center justify-between animate-in fade-in">
          <span>✓ Doctor Opinion Summary prepared for patient communication.</span>
        </div>
      )}

      {/* Structured Doctor Opinion Card (Core Requirement) */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden space-y-0">
        {/* Surgeon Header Banner */}
        <div className="bg-gradient-to-r from-[#101955] to-[#1c2770] p-6 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#2ECDC5] to-[#1baba4] flex items-center justify-center font-bold text-slate-950 shadow-md">
              <Stethoscope className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-lg font-black text-white">{docName}</h4>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-white/20 text-[#2ECDC5] border border-white/20">
                  Chief Surgeon Opinion
                </span>
              </div>
              <p className="text-xs text-slate-300 flex items-center gap-1.5 mt-0.5">
                <Building2 className="w-3.5 h-3.5 text-[#2ECDC5]" />
                {hospitalName}
              </p>
            </div>
          </div>

          {/* Suitability Determination Badge */}
          <div className="self-end sm:self-auto">
            {suitability === "suitable" ? (
              <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-emerald-500 text-slate-950 font-black text-xs shadow-md">
                <CheckCircle2 className="w-4 h-4" />
                Clinically Suitable for Surgery
              </span>
            ) : suitability === "needs_more_info" ? (
              <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-amber-400 text-slate-950 font-black text-xs shadow-md">
                <AlertTriangle className="w-4 h-4" />
                Needs Additional DICOM Scans
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-rose-500 text-white font-black text-xs shadow-md">
                <AlertTriangle className="w-4 h-4" />
                Declined by Hospital
              </span>
            )}
          </div>
        </div>

        {/* 3 Core Structured Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100 bg-slate-50/70 border-b border-slate-100">
          {/* 1. Clinical Suitability */}
          <div className="p-5 space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              1. Suitability Determination
            </span>
            <div className="text-base font-black text-slate-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Optimal Candidate (LDLT)
            </div>
            <p className="text-[11px] text-slate-500">
              Living Donor Right Lobe cleared at 68% SLV.
            </p>
          </div>

          {/* 2. Estimated Length of Stay */}
          <div className="p-5 space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              2. Estimated Stay (ICU vs. Room)
            </span>
            <div className="text-base font-black text-slate-900 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-blue-600" />
              {stayDays} Days Total Planned
            </div>
            <div className="text-[11px] text-slate-600 font-semibold flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 text-[10px]">
                {icuDays} Days ICU Isolation
              </span>
              <span className="px-2 py-0.5 rounded-md bg-purple-100 text-purple-800 text-[10px]">
                {roomDays} Days VIP Suite
              </span>
            </div>
          </div>

          {/* 3. Base Clinical Treatment Cost Range */}
          <div className="p-5 space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              3. Base Clinical Treatment Cost
            </span>
            <div className="text-base font-black text-[#101955] flex items-center gap-1">
              ${minRange.toLocaleString("en-US")} – ${maxRange.toLocaleString("en-US")} USD
            </div>
            <p className="text-[11px] text-slate-500">
              Baseline: ${costEstimate.toLocaleString("en-US")} (All-inclusive surgery &amp; donor OT)
            </p>
          </div>
        </div>

        {/* Written Surgical Evaluation Opinion */}
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h5 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-blue-600" />
              Surgeon's Written Clinical Statement
            </h5>
            <span className="text-[11px] font-mono text-slate-400">
              Timestamp: {new Date().toLocaleDateString("en-US")}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed font-medium">
            {writtenOpinion}
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Verified against Medanta Institutional Review Board</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleForward}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Send className="w-3.5 h-3.5 text-blue-600" />
                <span>Forward to Patient</span>
              </button>

              {onNavigateToQuote && (
                <button
                  onClick={onNavigateToQuote}
                  className="px-4 py-2 rounded-xl bg-[#2ECDC5] hover:bg-[#28b8b0] text-slate-950 text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
                >
                  <span>Build Package Quote</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
