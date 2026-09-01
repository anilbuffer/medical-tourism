"use client";

import React, { useState } from "react";
import { PatientCase, AdminTab } from "@/types/portal";
import {
  Clock,
  AlertTriangle,
  Zap,
  CheckCircle2,
  Users,
  RotateCcw,
  ArrowRight,
  ShieldAlert,
  Sliders,
  Globe,
} from "lucide-react";

interface AdminSlaEscalationEngineProps {
  cases: PatientCase[];
  onNavigateTab?: (tab: AdminTab) => void;
}

export const AdminSlaEscalationEngine: React.FC<AdminSlaEscalationEngineProps> = ({
  cases,
  onNavigateTab,
}) => {
  const [activeCases, setActiveCases] = useState<PatientCase[]>(cases);

  const breachedCases = activeCases.filter((c) => c.slaBreached);
  const onTrackCases = activeCases.filter((c) => !c.slaBreached);

  const handleResolveBreach = (caseId: string) => {
    setActiveCases((prev) =>
      prev.map((c) =>
        c.id === caseId
          ? {
              ...c,
              slaBreached: false,
              assignedCoordinatorName: "Aisha Khan (Triage Lead)",
              lastContactAt: new Date().toISOString(),
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
            SLA & Escalation Rules Engine
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time triage response telemetry, automated escalation ladders, and emergency queue reassignment controllers.
          </p>
        </div>

        {onNavigateTab && (
          <div className="flex items-center gap-2 shrink-0 flex-wrap">
            <button
              onClick={() => onNavigateTab("geo_sla_timers")}
              className="px-3.5 py-2 rounded-xl bg-teal-50 hover:bg-teal-100 text-[#1baba4] text-xs font-bold border border-teal-200 flex items-center gap-1.5 cursor-pointer transition-colors shadow-xs"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Geo Timers</span>
            </button>
            <button
              onClick={() => onNavigateTab("routing_automation")}
              className="px-3.5 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#3F4EB4] text-xs font-bold border border-blue-200 flex items-center gap-1.5 cursor-pointer transition-colors shadow-xs"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Routing Rules</span>
            </button>
          </div>
        )}
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white/95 rounded-2xl p-4 border border-slate-200 shadow-xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-black text-slate-900">{onTrackCases.length} Cases On-Track</div>
            <div className="text-[11px] font-bold text-slate-500">Tier 1 & 2 SLA Met</div>
          </div>
        </div>

        <div className="bg-white/95 rounded-2xl p-4 border border-slate-200 shadow-xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-black text-rose-900">{breachedCases.length} Active SLA Breaches</div>
            <div className="text-[11px] font-bold text-slate-500">Escalated to Super Admin</div>
          </div>
        </div>

        <div className="bg-white/95 rounded-2xl p-4 border border-slate-200 shadow-xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#2ECDC5] flex items-center justify-center font-bold shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-black text-slate-900">18 min Avg</div>
            <div className="text-[11px] font-bold text-slate-500">Global First-Response Latency</div>
          </div>
        </div>
      </div>

      {/* Escalation Rules Chain Flow */}
      <div className="bg-white/95 rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-500" />
          3-Tier Automated Escalation Ladder Protocol
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 text-xs">Tier 1: Coordinator Triage</span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                0 - 30 mins
              </span>
            </div>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Assigned queue coordinator receives lead ping via mobile push & email. First contact must be logged within 30 minutes.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-950 text-xs">Tier 2: Lead Escalation</span>
              <span className="text-[10px] font-bold text-amber-900 bg-amber-200 px-2 py-0.5 rounded-full">
                30 - 60 mins
              </span>
            </div>
            <p className="text-amber-900 text-[11px] leading-relaxed">
              If uncontacted after 30 mins, inquiry is broadcast to Secondary On-Shift Coordinators with high-priority audio alert.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-rose-50/70 border border-rose-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-rose-950 text-xs">Tier 3: Executive Breach</span>
              <span className="text-[10px] font-bold text-rose-900 bg-rose-200 px-2 py-0.5 rounded-full">
                &gt; 60 mins
              </span>
            </div>
            <p className="text-rose-900 text-[11px] leading-relaxed">
              Trigger Super Admin notification banner, log breach to immutable compliance ledger, and auto-reassign to Lead Desk.
            </p>
          </div>
        </div>
      </div>

      {/* Active Breaches List */}
      <div className="bg-white/95 rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-600" />
            Active SLA Breaches & Overdue Triage Cases
          </h3>
          <span className="text-[10px] font-bold text-slate-400">
            {breachedCases.length} Breaches Detected
          </span>
        </div>

        {breachedCases.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-400">
            ✓ All active inquiries and patient tasks are within target SLA thresholds.
          </div>
        ) : (
          <div className="divide-y divide-slate-100 text-xs">
            {breachedCases.map((bCase) => (
              <div
                key={bCase.id}
                className="p-4 flex items-center justify-between gap-4 flex-wrap hover:bg-slate-50 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-black text-rose-700">{bCase.id}</span>
                    <span className="font-bold text-slate-900">{bCase.patientName}</span>
                    <span className="text-slate-500">({bCase.patientCountry})</span>
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Treatment: <strong>{bCase.treatmentCategory}</strong> • Queue: <strong>{bCase.assignedQueue}</strong>
                  </div>
                  <div className="text-[10px] text-rose-600 font-bold">
                    Target SLA: {bCase.slaTargetMinutes} mins • Elapsed: &gt; 90 mins (Breached)
                  </div>
                </div>

                <button
                  onClick={() => handleResolveBreach(bCase.id)}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#1d8983] via-[#1baba4] to-[#1d8983] text-white font-extrabold text-xs shadow-md cursor-pointer hover:scale-105 transition-all flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Reassign & Clear Breach
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
