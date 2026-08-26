"use client";

import React, { useState } from "react";
import { PatientCase } from "@/types/portal";
import {
  Sparkles,
  RefreshCcw,
  Calendar,
  Send,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  ArrowRight,
  UserPlus,
  HeartHandshake,
} from "lucide-react";

interface AdminNurtureQueueProps {
  cases: PatientCase[];
}

export const AdminNurtureQueue: React.FC<AdminNurtureQueueProps> = ({ cases }) => {
  const [caseList, setCaseList] = useState<PatientCase[]>(cases);
  const [filterReason, setFilterReason] = useState<string>("all");

  const nurtureCases = caseList.filter(
    (c) => c.stage === "nurture" || c.caseDecisionStatus === "declined"
  );

  const filteredNurtures = nurtureCases.filter((c) => {
    if (filterReason === "all") return true;
    return c.nurtureEntry?.reason === filterReason || c.declineReason?.toLowerCase().includes(filterReason);
  });

  const handleReactivateCase = (caseId: string) => {
    setCaseList((prev) =>
      prev.map((c) =>
        c.id === caseId
          ? {
              ...c,
              stage: "contacted",
              caseDecisionStatus: "pending_review",
              stageHistory: [
                ...c.stageHistory,
                {
                  id: `sh_${Date.now()}`,
                  fromStage: "nurture",
                  toStage: "contacted",
                  changedAt: new Date().toISOString(),
                  changedByName: "Rajesh Verma (Super Admin)",
                  changedByRole: "super_admin",
                  reason: "Reactivated from Nurture Queue for second opinion referral.",
                },
              ],
            }
          : c
      )
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#3F4EB4] bg-blue-50 px-2.5 py-0.5 rounded-full">
              Journey Engine • Domain 3
            </span>
          </div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight mt-1">
            Nurture & Patient Re-engagement Queue
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Recover paused leads, hospital-declined cases, and budget mismatches with automated drip sequences and second opinions.
          </p>
        </div>

        <select
          value={filterReason}
          onChange={(e) => setFilterReason(e.target.value)}
          className="bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-bold focus:ring-2 focus:ring-[#2ECDC5] focus:outline-none cursor-pointer shrink-0 shadow-xs"
        >
          <option value="all">All Nurture Categories ({nurtureCases.length})</option>
          <option value="declined_by_hospital">Hospital Declined (Scope Mismatch)</option>
          <option value="paused_by_patient">Patient Paused / Travel Delayed</option>
          <option value="budget_mismatch">Budget / Pricing Adjustment</option>
        </select>
      </div>

      {/* Automated Campaign Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div className="p-4 rounded-2xl bg-white/95 border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-extrabold text-slate-900 text-xs">Second Opinion Broadcast</span>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
              Active Drip
            </span>
          </div>
          <p className="text-slate-500 text-[11px] leading-relaxed">
            Auto-routes declined cases to secondary accredited partner hospitals (e.g. Apollo / Fortis) for alternate surgical assessment.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white/95 border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-extrabold text-slate-900 text-xs">30-Day Visa & Medical Check</span>
            <span className="text-[10px] font-bold text-teal-700 bg-teal-100 px-2 py-0.5 rounded-full">
              Automated
            </span>
          </div>
          <p className="text-slate-500 text-[11px] leading-relaxed">
            Sends personalized WhatsApp update on doctor availability and hospital package discounts.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white/95 border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-extrabold text-slate-900 text-xs">Lead Recovery Rate</span>
            <span className="text-xs font-black text-[#3F4EB4]">28.4%</span>
          </div>
          <p className="text-slate-500 text-[11px] leading-relaxed">
            Over 28% of nurtured cases successfully reactivate into booked hospital treatments.
          </p>
        </div>
      </div>

      {/* Nurture Leads List */}
      <div className="bg-white/95 rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            Nurture Queue Roster
          </h3>
          <span className="text-[10px] font-bold text-slate-400">
            {filteredNurtures.length} Leads in Nurture
          </span>
        </div>

        {filteredNurtures.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-400">
            No cases currently in the nurture or recovery queue.
          </div>
        ) : (
          <div className="divide-y divide-slate-100 text-xs">
            {filteredNurtures.map((nCase) => (
              <div
                key={nCase.id}
                className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
              >
                <div className="space-y-1.5 max-w-xl">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono font-black text-[#3F4EB4]">{nCase.id}</span>
                    <strong className="text-slate-900 text-xs">{nCase.patientName}</strong>
                    <span className="text-slate-500">({nCase.patientCountry})</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                      {nCase.nurtureEntry?.reason?.replace(/_/g, " ") || "Hospital Declined"}
                    </span>
                  </div>

                  <div className="text-[11px] text-slate-600">
                    Treatment: <strong>{nCase.treatmentCategory}</strong> • Coordinator: <strong>{nCase.assignedCoordinatorName}</strong>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-700">
                    <strong>Nurture Notes:</strong>{" "}
                    {nCase.nurtureEntry?.notes ||
                      nCase.declineReason ||
                      "Outside cardiac scope. Exploring secondary hospital partner."}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleReactivateCase(nCase.id)}
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#1d8983] via-[#1baba4] to-[#1d8983] text-white font-extrabold text-xs shadow-md cursor-pointer hover:scale-105 transition-all flex items-center gap-1.5"
                  >
                    <RefreshCcw className="w-3.5 h-3.5" /> Reactivate Case
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
