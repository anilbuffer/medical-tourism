"use client";

import React from "react";
import { PatientCase } from "@/types/portal";
import {
  Stethoscope,
  Building2,
  CheckCircle2,
  AlertCircle,
  XCircle,
  FileText,
  Video,
  ShieldCheck,
  Activity,
  Clock,
  DollarSign,
  BadgeCheck,
  ChevronRight,
  Sparkles,
  Layers,
  ArrowUpRight,
  UserCheck,
  Calendar,
  AlertTriangle,
  HeartHandshake,
  TrendingUp,
} from "lucide-react";
import { HospitalTab } from "../HospitalDoctorView";

interface DoctorDashboardTabProps {
  cases: PatientCase[];
  activeCaseId: string;
  onSelectCase: (caseId: string) => void;
  onNavigateTab: (tab: HospitalTab) => void;
  onLaunchDicom: (fileName?: string) => void;
  onLaunchVideoRoom: () => void;
}

export const DoctorDashboardTab: React.FC<DoctorDashboardTabProps> = ({
  cases,
  activeCaseId,
  onSelectCase,
  onNavigateTab,
  onLaunchDicom,
  onLaunchVideoRoom,
}) => {
  const activeCase = cases.find((c) => c.id === activeCaseId) || cases[0];
  const acceptedCasesCount = cases.filter((c) => c.caseDecisionStatus === "accepted").length;
  const pendingCasesCount = cases.filter((c) => c.caseDecisionStatus === "pending_review").length;
  const scheduledConsultsCount = cases.filter((c) => c.consultation && c.consultation.status === "scheduled").length;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Clinical Snapshot & KPI Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Assigned Cases */}
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-5 border border-slate-200 shadow-sm relative overflow-hidden group hover:border-[#3F4EB4]/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Assigned Cases
            </span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#3F4EB4] flex items-center justify-center font-black text-xs">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 mt-2">{cases.length}</div>
          <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 mt-1">
            <span>• Row-Level Security Active</span>
          </div>
        </div>

        {/* KPI 2: Accepted for Surgery */}
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-5 border border-slate-200 shadow-sm relative overflow-hidden group hover:border-emerald-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider ">
              Accepted for Surgery
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black text-xs">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 mt-2">{acceptedCasesCount}</div>
          <div className="flex items-center gap-1 text-[11px] font-bold text-slate-500 mt-1">
            <span>LDLT Candidate (Tariq Al-Mansoor)</span>
          </div>
        </div>

        {/* KPI 3: Scheduled Consults */}
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-5 border border-slate-200 shadow-sm relative overflow-hidden group hover:border-[#2ECDC5]/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Tele-Consultations
            </span>
            <div className="w-8 h-8 rounded-xl bg-teal-50 text-[#2ECDC5] flex items-center justify-center font-black text-xs">
              <Video className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 mt-2">{scheduledConsultsCount || 1}</div>
          <div className="flex items-center gap-1 text-[11px] font-bold text-teal-700 mt-1">
            <span>Today 05:00 PM IST (03:30 PM GST)</span>
          </div>
        </div>

        {/* KPI 4: Compliance & SLA */}
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-5 border border-slate-200 shadow-sm relative overflow-hidden group hover:border-purple-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              SLA & Security
            </span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-black text-xs">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 mt-2">100%</div>
          <div className="flex items-center gap-1 text-[11px] font-bold text-purple-700 mt-1">
            <span>HIPAA & DISHA Verified</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Urgent Clinical Queue + Quick Action Launchpad */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Time-Urgency Clinical Queue */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)]">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <div>
                <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#3F4EB4]" />
                  Time-Urgency Clinical Queue
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  High-priority assigned cases requiring surgical opinion, DICOM review, or tele-consultation
                </p>
              </div>
              <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-blue-50 text-[#3F4EB4] border border-blue-200">
                {cases.length} Total Patients
              </span>
            </div>

            <div className="space-y-3">
              {cases.map((c) => {
                const isSelected = c.id === activeCaseId;
                const isAccepted = c.caseDecisionStatus === "accepted";
                const isDeclined = c.caseDecisionStatus === "declined";

                return (
                  <div
                    key={c.id}
                    className={`p-4 rounded-2xl border transition-all duration-300 ${isSelected
                      ? "bg-slate-50/90 border-[#3F4EB4]/40 shadow-md ring-1 ring-[#3F4EB4]/20"
                      : "bg-white hover:bg-slate-50/60 border-slate-200 shadow-2xs"
                      }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-[#3F4EB4]">{c.id}</span>
                          <span
                            className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full whitespace-nowrap ${isAccepted
                              ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                              : isDeclined
                                ? "bg-rose-100 text-rose-800 border border-rose-200"
                                : "bg-amber-100 text-amber-800 border border-amber-200"
                              }`}
                          >
                            {isAccepted ? "🟢 Accepted for Surgery" : isDeclined ? "🔴 Declined (Scope Redirect)" : "🟡 Pending Review"}
                          </span>
                          {c.id === "PT-2026-089412" && (
                            <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 border border-teal-200">
                              Tele-Consult Today 05:00 PM IST
                            </span>
                          )}
                        </div>

                        <div className="font-black text-slate-900 text-sm">{c.patientName}</div>
                        <div className="text-xs text-slate-600 font-medium">
                          {c.clinicalSummary.recommendedProcedure || c.treatmentCategory}
                        </div>
                        <div className="text-[11px] text-slate-400 flex items-center gap-3 whitespace-nowrap">
                          <span>Origin: {c.patientCountry}</span>
                          <span>•</span>
                          <span>Language: {c.preferredLanguage}</span>
                          <span>•</span>
                          <span>Coordinator: {c.assignedCoordinatorName || "Ananya Sharma"}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-wrap">
                        <button
                          onClick={() => {
                            onSelectCase(c.id);
                            onNavigateTab("case_info");
                          }}
                          className="px-3 py-2 rounded-xl bg-slate-200 hover:bg-slate-200 text-slate-800 text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1"
                        >
                          <FileText className="w-3.5 h-3.5 text-[#3F4EB4]" />
                          Dossier
                        </button>

                        {isAccepted && (
                          <button
                            onClick={() => {
                              onSelectCase(c.id);
                              onNavigateTab("tele_consult");
                            }}
                            className="px-3 py-2 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-900 text-xs font-extrabold border border-teal-200 transition-all cursor-pointer flex items-center gap-1"
                          >
                            <Video className="w-3.5 h-3.5 text-[#2ECDC5]" />
                            Consult Room
                          </button>
                        )}

                        <button
                          onClick={() => {
                            onSelectCase(c.id);
                            onNavigateTab("accept_decline");
                          }}
                          className="px-3.5 py-2 rounded-xl bg-[#3F4EB4] hover:bg-[#34429e] text-white text-xs font-extrabold shadow-sm transition-all cursor-pointer flex items-center gap-1"
                        >
                          <span>Decision</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Clinical Workload & Volumetric Study Card */}
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#2ECDC5]" />
              Active Surgical Candidate Snapshot • LDLT Protocol
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  MELD-Na Score
                </div>
                <div className="text-xl font-black text-slate-900 mt-1">24</div>
                <div className="text-[11px] text-amber-700 mt-0.5">High Priority Transfusion</div>
              </div>
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Donor Graft Volumetric Ratio
                </div>
                <div className="text-xl font-black text-emerald-700 mt-1">68%</div>
                <div className="text-[11px] text-emerald-600 mt-0.5">Optimal Right Lobe Graft</div>
              </div>
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Hospital Length of Stay
                </div>
                <div className="text-xl font-black text-[#3F4EB4] mt-1">14 Days</div>
                <div className="text-[11px] text-slate-500 mt-0.5">3d ICU + 11d VIP Suite</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Quick Action Launchpad */}
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-[#141d60] via-[#1b2360] to-[#101e76] rounded-2xl p-6 text-white shadow-xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-teal-500/20 text-[#2ECDC5] flex items-center justify-center font-bold">
                <Sparkles className="w-4 h-4" />
              </div>
              <h4 className="font-extrabold text-sm text-white">Clinical Quick Launchpad</h4>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Instant access to diagnostic radiology workstations, live tele-consultation rooms, and surgical opinion matrix.
            </p>

            <div className="space-y-2.5 pt-2">
              {/* Launch DICOM */}
              <button
                onClick={() => onLaunchDicom("Abdominal_MRI_Scans.dicom")}
                className="w-full p-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white font-extrabold text-xs transition-all flex items-center justify-between cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <Layers className="w-4 h-4 text-[#2ECDC5]" />
                  <span>Launch 3.0T DICOM PACS Viewer</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
              </button>

              {/* Enter Video Room */}
              <button
                onClick={onLaunchVideoRoom}
                className="w-full p-3.5 rounded-xl bg-[#2ECDC5] hover:bg-teal-400 text-slate-950 font-black text-xs shadow-lg transition-all flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Video className="w-4 h-4 text-slate-950" />
                  <span>Enter HD Video Consultation Suite</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-950" />
              </button>

              {/* Draft Surgical Candidacy */}
              <button
                onClick={() => onNavigateTab("accept_decline")}
                className="w-full p-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white font-extrabold text-xs transition-all flex items-center justify-between cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <Stethoscope className="w-4 h-4 text-amber-400" />
                  <span>Draft Surgical Candidacy Matrix</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
              </button>

              {/* View Accreditation Profile */}
              <button
                onClick={() => onNavigateTab("accreditation")}
                className="w-full p-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white font-extrabold text-xs transition-all flex items-center justify-between cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <BadgeCheck className="w-4 h-4 text-emerald-400" />
                  <span>Medanta Accreditation & JCI Credentials</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
              </button>
            </div>
          </div>

          {/* Hospital Row-Level Security Badge Card */}
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-5 border border-slate-200 shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-xs font-extrabold text-slate-900">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Row-Level Security & Compliance</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Dr. Subhash Gupta&apos;s session is protected by MFA and isolated to cases assigned directly to <strong>Medanta – The Medicity</strong>. Facilitator liability and clinical records are cryptographically separated.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
