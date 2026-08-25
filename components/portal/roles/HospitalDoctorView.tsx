"use client";

import React, { useState } from "react";
import { PatientCase, ClinicalWorkspace, ConsultationOutcome } from "@/types/portal";
import { usePortal } from "@/lib/portal/store";
import { MOCK_ACCREDITATION_PROFILES } from "@/lib/portal/mockData";
import {
  Stethoscope,
  Building2,
  CheckCircle2,
  AlertCircle,
  XCircle,
  FileText,
  Video,
  ShieldCheck,
  Send,
  Activity,
  Clock,
  DollarSign,
  BadgeCheck,
  ToggleLeft,
  ToggleRight,
  AlertTriangle,
  CalendarClock,
  Lock,
  ChevronRight,
} from "lucide-react";

interface HospitalDoctorViewProps {
  cases: PatientCase[];
  onSelectCase: (caseId: string) => void;
  activeCaseId: string;
}

type HospitalTab = "case_info" | "accept_decline" | "clinical_workspace" | "tele_consult" | "accreditation";

export const HospitalDoctorView: React.FC<HospitalDoctorViewProps> = ({
  cases,
  onSelectCase,
  activeCaseId,
}) => {
  const { acceptCase, declineCase, saveClinicalWorkspace, updateConsultationOutcome, toggleConsultationRecording, currentUser } = usePortal();
  const activeCase = cases.find((c) => c.id === activeCaseId) || cases[0];
  const hospitalId = currentUser?.hospitalId || "hosp_medanta";
  const accreditation = MOCK_ACCREDITATION_PROFILES.find((a) => a.hospitalId === hospitalId);

  const [activeTab, setActiveTab] = useState<HospitalTab>("case_info");

  // Accept/Decline state
  const [declineReason, setDeclineReason] = useState("");
  const [declineError, setDeclineError] = useState("");
  const [actionFeedback, setActionFeedback] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  // Clinical Workspace state
  const [treatmentPlan, setTreatmentPlan] = useState(activeCase?.clinicalWorkspace?.treatmentPlan || "");
  const [expectedStayDays, setExpectedStayDays] = useState(activeCase?.clinicalWorkspace?.expectedStayDays || 0);
  const [costEstimateUsd, setCostEstimateUsd] = useState(activeCase?.clinicalWorkspace?.costEstimateUsd || 0);
  const [suitabilityDetermination, setSuitabilityDetermination] = useState<ClinicalWorkspace["suitabilityDetermination"]>(
    activeCase?.clinicalWorkspace?.suitabilityDetermination || "pending"
  );
  const [workspaceSaving, setWorkspaceSaving] = useState(false);
  const [workspaceSaved, setWorkspaceSaved] = useState(false);

  // Tele-consult state
  const [teleconsultOutcome, setTeleconsultOutcome] = useState<ConsultationOutcome>(
    activeCase?.consultation?.outcome || "pending"
  );
  const [teleconsultNotes, setTeleconsultNotes] = useState(activeCase?.consultation?.outcomeNotes || "");
  const [recordingToggle, setRecordingToggle] = useState(activeCase?.consultation?.recordingEnabled || false);
  const [recordingConsentChecked, setRecordingConsentChecked] = useState(false);
  const [recordingJurisdictionChecked, setRecordingJurisdictionChecked] = useState(false);
  const [teleconsultSaved, setTeleconsultSaved] = useState(false);

  const isAccepted = activeCase?.caseDecisionStatus === "accepted";
  const isDeclined = activeCase?.caseDecisionStatus === "declined";

  const showFeedback = (type: "success" | "error", msg: string) => {
    setActionFeedback({ type, msg });
    setTimeout(() => setActionFeedback(null), 4000);
  };

  const handleAccept = () => {
    if (!activeCase) return;
    acceptCase(activeCase.id);
    showFeedback("success", "Case accepted. Clinical Workspace is now unlocked.");
    setActiveTab("clinical_workspace");
  };

  const handleDecline = () => {
    if (!declineReason.trim()) {
      setDeclineError("A reason is required when declining a case.");
      return;
    }
    setDeclineError("");
    declineCase(activeCase.id, declineReason);
    showFeedback("success", "Case declined. Reason logged to audit trail. CS team notified for nurture.");
    setDeclineReason("");
  };

  const handleSaveWorkspace = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeCase) return;
    setWorkspaceSaving(true);
    setTimeout(() => {
      saveClinicalWorkspace(activeCase.id, {
        treatmentPlan,
        expectedStayDays,
        costEstimateUsd,
        suitabilityDetermination,
      });
      setWorkspaceSaving(false);
      setWorkspaceSaved(true);
      setTimeout(() => setWorkspaceSaved(false), 3000);
    }, 600);
  };

  const handleSaveTeleconsult = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeCase) return;
    updateConsultationOutcome(activeCase.id, teleconsultOutcome, teleconsultNotes);
    if (activeCase.consultation) {
      toggleConsultationRecording(activeCase.id, recordingToggle, recordingConsentChecked);
    }
    setTeleconsultSaved(true);
    setTimeout(() => setTeleconsultSaved(false), 3000);
  };

  const tabs: { id: HospitalTab; label: string; icon: React.ElementType; locked?: boolean }[] = [
    { id: "case_info", label: "Case & Documents", icon: FileText },
    { id: "accept_decline", label: "Accept / Decline", icon: CheckCircle2 },
    { id: "clinical_workspace", label: "Clinical Workspace", icon: Stethoscope, locked: !isAccepted },
    { id: "tele_consult", label: "Tele-Consultation", icon: Video, locked: !isAccepted },
    { id: "accreditation", label: "Accreditation Profile", icon: BadgeCheck },
  ];

  const getStatusBadge = (status: string) => {
    if (status === "accepted") return "bg-emerald-100 text-emerald-800 border border-emerald-200";
    if (status === "declined") return "bg-rose-100 text-rose-800 border border-rose-200";
    return "bg-amber-100 text-amber-800 border border-amber-200";
  };

  const getAccredStatusColor = (s: string) => {
    if (s === "active") return "text-emerald-700 bg-emerald-50 border-emerald-200";
    if (s === "expired") return "text-rose-700 bg-rose-50 border-rose-200";
    return "text-amber-700 bg-amber-50 border-amber-200";
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#071321] via-[#0B1E33] to-[#0D2642] rounded-2xl p-6 sm:p-8 text-white shadow-xl border border-slate-800/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#3F4EB4]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3F4EB4]/20 text-[#2ECDC5] text-xs font-bold tracking-wider uppercase mb-2 border border-[#3F4EB4]/30">
            <Stethoscope className="w-3.5 h-3.5 text-[#2ECDC5]" />
            Hospital & Doctor Clinical Portal
          </div>
          <h2 className="text-2xl font-black tracking-tight text-white">
            Assigned Cases — Clinical Workspace
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl">
            Logged in as <strong>{currentUser?.name || "Dr. Naresh Trehan"}</strong> •{" "}
            <strong>Medanta – The Medicity</strong>. Row-Level Security: only cases explicitly referred to this hospital are visible.
          </p>
        </div>
        <div className="relative z-10 flex flex-col gap-2 shrink-0">
          <div className="flex items-center gap-2 bg-emerald-500/20 px-4 py-2 rounded-xl border border-emerald-500/30 text-xs font-bold text-emerald-300">
            <ShieldCheck className="w-4 h-4" />
            <span>MFA Verified Session</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl border border-white/15 text-xs font-bold text-slate-200">
            <Building2 className="w-4 h-4 text-[#2ECDC5]" />
            <span>{cases.length} Assigned Cases</span>
          </div>
        </div>
      </div>

      {/* Global Feedback Banner */}
      {actionFeedback && (
        <div className={`px-5 py-3.5 rounded-2xl text-sm font-bold flex items-center gap-2.5 animate-in fade-in ${
          actionFeedback.type === "success"
            ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
            : "bg-rose-50 text-rose-800 border border-rose-200"
        }`}>
          {actionFeedback.type === "success" ? <CheckCircle2 className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
          {actionFeedback.msg}
        </div>
      )}

      {/* Grid: Cases + Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Col: Assigned Cases Queue */}
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-5 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] space-y-3">
          <h3 className="font-extrabold text-slate-900 text-sm pb-3 border-b border-slate-100 flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#3F4EB4]" />
            Assigned Case Queue
          </h3>
          <div className="space-y-2">
            {cases.map((c) => {
              const isSelected = c.id === activeCaseId;
              return (
                <button
                  key={c.id}
                  onClick={() => onSelectCase(c.id)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? "bg-gradient-to-r from-[#071321] via-[#0B1E33] to-[#0D2642] text-white border-slate-800 shadow-lg"
                      : "bg-white hover:bg-slate-50 text-slate-800 border-slate-200 shadow-2xs hover:-translate-y-0.5"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#2ECDC5]">{c.id}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      c.caseDecisionStatus === "accepted"
                        ? "bg-emerald-100 text-emerald-800"
                        : c.caseDecisionStatus === "declined"
                        ? "bg-rose-100 text-rose-800"
                        : "bg-amber-100 text-amber-800"
                    }`}>
                      {c.caseDecisionStatus === "accepted" ? "Accepted" : c.caseDecisionStatus === "declined" ? "Declined" : "Pending"}
                    </span>
                  </div>
                  <div className="font-black text-sm mt-1">{c.patientName}</div>
                  <div className={`text-xs truncate ${isSelected ? "text-slate-300" : "text-slate-500"}`}>
                    {c.clinicalSummary.recommendedProcedure || c.treatmentCategory}
                  </div>
                  <div className={`text-[11px] mt-1.5 ${isSelected ? "text-slate-400" : "text-slate-400"}`}>
                    {c.patientCountry}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right 2 Cols: Case Detail with Tabs */}
        {activeCase && (
          <div className="lg:col-span-2 space-y-4">
            {/* Case Header */}
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-5 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)]">
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div>
                  <span className="text-xs font-mono font-bold text-[#3F4EB4]">{activeCase.id}</span>
                  <h3 className="text-xl font-black text-slate-900 mt-0.5">{activeCase.patientName}</h3>
                  <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-3 flex-wrap">
                    <span>{activeCase.patientCountry}</span>
                    <span>•</span>
                    <span>{activeCase.treatmentCategory}</span>
                    <span>•</span>
                    <span>{activeCase.preferredLanguage}</span>
                  </div>
                </div>
                <span className={`text-xs font-extrabold px-3 py-1.5 rounded-full ${getStatusBadge(activeCase.caseDecisionStatus)}`}>
                  {activeCase.caseDecisionStatus === "accepted" ? "✓ Accepted" : activeCase.caseDecisionStatus === "declined" ? "✗ Declined" : "⏳ Pending Review"}
                </span>
              </div>
            </div>

            {/* Tab Bar */}
            <div className="flex overflow-x-auto gap-1.5 bg-white/95 rounded-2xl p-1.5 border border-slate-200 shadow-sm">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => !tab.locked && setActiveTab(tab.id)}
                  disabled={tab.locked}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-[#3F4EB4] to-[#2ECDC5] text-white shadow-sm"
                      : tab.locked
                      ? "text-slate-300 cursor-not-allowed"
                      : "text-slate-600 hover:bg-slate-100 cursor-pointer"
                  }`}
                >
                  {tab.locked ? <Lock className="w-3.5 h-3.5" /> : <tab.icon className="w-3.5 h-3.5" />}
                  {tab.label}
                  {tab.locked && <span className="text-[10px] bg-slate-100 text-slate-400 px-1.5 py-0.5 rounded-full">Accept First</span>}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] space-y-5">

              {/* ─── TAB: Case Info ─────────────────────────────────── */}
              {activeTab === "case_info" && (
                <div className="space-y-5">
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-2 mb-3">
                      <Activity className="w-4 h-4 text-[#3F4EB4]" />
                      Clinical Summary
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      {[
                        { label: "Chief Complaint", value: activeCase.clinicalSummary.chiefComplaint },
                        { label: "Diagnosis", value: activeCase.clinicalSummary.diagnosis },
                        { label: "Recommended Procedure", value: activeCase.clinicalSummary.recommendedProcedure },
                        { label: "Past Medical History", value: activeCase.clinicalSummary.pastMedicalHistory || "None reported" },
                        { label: "Allergies", value: activeCase.clinicalSummary.allergies?.join(", ") || "None known" },
                      ].map((f) => (
                        <div key={f.label} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{f.label}</div>
                          <div className="text-slate-800 font-semibold leading-relaxed">{f.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                        <FileText className="w-4 h-4 text-[#3F4EB4]" />
                        Case-Scoped Documents Only
                      </h4>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                        Prior history NOT visible (HIPAA / RBAC)
                      </span>
                    </div>
                    <div className="space-y-2">
                      {activeCase.documents.filter((d) => d.isCaseScoped !== false).map((d) => (
                        <div key={d.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between gap-3">
                          <div>
                            <div className="font-bold text-xs text-slate-900">{d.title}</div>
                            <div className="text-[11px] text-slate-500 mt-0.5">
                              v{d.currentVersion} • {d.versions[0]?.fileSize}
                            </div>
                          </div>
                          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                            d.status === "reviewed" ? "bg-emerald-100 text-emerald-800" :
                            d.status === "incomplete" ? "bg-rose-100 text-rose-800" :
                            "bg-amber-100 text-amber-800"
                          }`}>{d.status}</span>
                        </div>
                      ))}
                      {activeCase.documents.length === 0 && (
                        <div className="p-6 bg-slate-50 rounded-2xl text-center text-xs text-slate-400 border border-dashed border-slate-200">
                          No documents uploaded for this case yet.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* ─── TAB: Accept / Decline ────────────────────────────── */}
              {activeTab === "accept_decline" && (
                <div className="space-y-5">
                  {isAccepted && (
                    <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-black text-emerald-900 text-sm">Case Accepted</div>
                        <div className="text-xs text-emerald-700 mt-0.5">
                          Accepted by <strong>{activeCase.acceptedByDoctorName}</strong> on{" "}
                          {activeCase.acceptedAt ? new Date(activeCase.acceptedAt).toLocaleString() : "—"}
                        </div>
                        <div className="text-xs text-emerald-700 mt-1">Clinical Workspace and Tele-Consultation tabs are now unlocked.</div>
                      </div>
                    </div>
                  )}

                  {isDeclined && (
                    <div className="p-4 bg-rose-50 rounded-2xl border border-rose-200 flex items-start gap-3">
                      <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-black text-rose-900 text-sm">Case Declined</div>
                        <div className="text-xs text-rose-700 mt-0.5">
                          Declined on {activeCase.declinedAt ? new Date(activeCase.declinedAt).toLocaleString() : "—"}
                        </div>
                        <div className="text-xs text-rose-700 mt-1 font-medium">
                          Reason: {activeCase.declineReason}
                        </div>
                        <div className="text-xs text-rose-600 mt-1">Case moved to CS Nurture Queue for follow-up.</div>
                      </div>
                    </div>
                  )}

                  {!isAccepted && !isDeclined && (
                    <>
                      <div>
                        <h4 className="font-extrabold text-slate-900 text-sm mb-2">Review & Accept this Case</h4>
                        <p className="text-xs text-slate-600 leading-relaxed mb-4">
                          After accepting, you will gain access to the Clinical Workspace and Tele-Consultation. Your action is timestamped and attributed to your account.
                        </p>
                        <button
                          onClick={handleAccept}
                          className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-teal-600 hover:to-emerald-500 text-white font-extrabold text-sm shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <CheckCircle2 className="w-5 h-5" />
                          Accept Case & Unlock Clinical Workspace
                        </button>
                      </div>

                      <div className="border-t border-slate-100 pt-5">
                        <h4 className="font-extrabold text-slate-900 text-sm mb-2 flex items-center gap-2 text-rose-700">
                          <XCircle className="w-4 h-4" />
                          Decline Case
                        </h4>
                        <p className="text-xs text-slate-500 mb-3">
                          A reason is <strong>required</strong> when declining. This feeds the "case declined/redirected" audit pathway and is logged to your account. The CS team will see this reason and move the case to the Nurture queue.
                        </p>
                        <textarea
                          rows={3}
                          placeholder="e.g. Outside our specialty scope — recommend referral to spine surgery at Artemis Hospital. Patient's MRI shows C4–C7 myelopathy requiring ACDF, not TAVR..."
                          value={declineReason}
                          onChange={(e) => { setDeclineReason(e.target.value); setDeclineError(""); }}
                          className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3.5 text-xs text-slate-900 focus:ring-2 focus:ring-rose-400 focus:outline-none"
                        />
                        {declineError && (
                          <p className="text-xs text-rose-600 font-bold mt-1.5 flex items-center gap-1">
                            <AlertTriangle className="w-3.5 h-3.5" /> {declineError}
                          </p>
                        )}
                        <button
                          onClick={handleDecline}
                          className="mt-3 px-6 py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2 cursor-pointer"
                        >
                          <XCircle className="w-4 h-4" />
                          Decline & Log Reason to Audit Trail
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* ─── TAB: Clinical Workspace ───────────────────────────── */}
              {activeTab === "clinical_workspace" && (
                <form onSubmit={handleSaveWorkspace} className="space-y-5">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-sm">Clinical Workspace</h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        All fields are timestamped and attributed to your doctor account — system of record for clinical liability, separate from CS communication.
                      </p>
                    </div>
                    {workspaceSaved && (
                      <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                        <CheckCircle2 className="w-4 h-4" />
                        Saved to clinical record
                      </div>
                    )}
                  </div>

                  {activeCase.clinicalWorkspace?.lastUpdatedAt && (
                    <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 text-xs text-blue-800 flex items-center gap-2">
                      <CalendarClock className="w-4 h-4 text-blue-600 shrink-0" />
                      Last updated: {new Date(activeCase.clinicalWorkspace.lastUpdatedAt).toLocaleString()} by{" "}
                      <strong>{activeCase.clinicalWorkspace.submittedByDoctorName}</strong>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Treatment Plan *
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={treatmentPlan}
                      onChange={(e) => setTreatmentPlan(e.target.value)}
                      placeholder="Describe the proposed treatment protocol, surgical approach, pre-operative requirements, and post-operative care plan..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3.5 text-xs text-slate-900 focus:ring-2 focus:ring-[#2ECDC5] focus:outline-none transition-all resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Expected Length of Stay (days) *
                      </label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="number"
                          min={0}
                          required
                          value={expectedStayDays}
                          onChange={(e) => setExpectedStayDays(Number(e.target.value))}
                          className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-9 pr-3.5 py-3 text-xs text-slate-900 focus:ring-2 focus:ring-[#2ECDC5] focus:outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Cost Estimate (USD) *
                      </label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="number"
                          min={0}
                          required
                          value={costEstimateUsd}
                          onChange={(e) => setCostEstimateUsd(Number(e.target.value))}
                          className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-9 pr-3.5 py-3 text-xs text-slate-900 focus:ring-2 focus:ring-[#2ECDC5] focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Suitability Determination *
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { value: "suitable", label: "Suitable", icon: CheckCircle2, color: "emerald" },
                        { value: "needs_more_info", label: "Needs More Info", icon: AlertCircle, color: "amber" },
                        { value: "not_suitable", label: "Not Suitable", icon: XCircle, color: "rose" },
                      ].map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => setSuitabilityDetermination(opt.value as ClinicalWorkspace["suitabilityDetermination"])}
                          className={`p-3 rounded-2xl text-xs font-bold border transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                            suitabilityDetermination === opt.value
                              ? opt.color === "emerald" ? "bg-emerald-500 text-white border-emerald-500"
                                : opt.color === "amber" ? "bg-amber-500 text-white border-amber-500"
                                : "bg-rose-600 text-white border-rose-600"
                              : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                          }`}
                        >
                          <opt.icon className="w-3.5 h-3.5" />
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-800 flex items-start gap-2">
                    <Lock className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
                    <span>
                      <strong>Clinical Liability Notice:</strong> This record is timestamped and permanently attributed to your doctor account. It is the system-of-record for "who provided the clinical estimate" and is kept separate from CS communication to protect facilitator vs. clinical liability separation.
                    </span>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={workspaceSaving}
                      className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#2ECDC5] via-[#3F4EB4] to-[#283593] hover:from-[#283593] hover:to-[#2ECDC5] text-white font-extrabold text-xs shadow-md hover:shadow-xl transition-all duration-300 flex items-center gap-2 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      {workspaceSaving ? "Saving..." : "Save to Clinical Record"}
                    </button>
                  </div>
                </form>
              )}

              {/* ─── TAB: Tele-Consultation ────────────────────────────── */}
              {activeTab === "tele_consult" && (
                <form onSubmit={handleSaveTeleconsult} className="space-y-5">
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <h4 className="font-extrabold text-slate-900 text-sm">Tele-Consultation</h4>
                    {teleconsultSaved && (
                      <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                        <CheckCircle2 className="w-4 h-4" /> Outcome saved
                      </div>
                    )}
                  </div>

                  {/* Join Call CTA */}
                  <div className="p-4 bg-gradient-to-r from-[#071321] to-[#0D2642] rounded-2xl border border-slate-700 flex items-center justify-between gap-3">
                    <div>
                      <div className="text-white font-bold text-sm">Patient: {activeCase.patientName}</div>
                      <div className="text-slate-300 text-xs mt-0.5">
                        {activeCase.consultation
                          ? `Scheduled: ${new Date(activeCase.consultation.scheduledAt).toLocaleString()}`
                          : "No consultation scheduled yet"}
                      </div>
                    </div>
                    <a
                      href={activeCase.consultation?.meetingLink || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#2ECDC5] hover:bg-teal-400 text-slate-950 font-extrabold text-xs transition-all shadow-lg"
                    >
                      <Video className="w-4 h-4" />
                      Join Video Call
                    </a>
                  </div>

                  {/* Recording Gate */}
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-bold text-slate-900 text-xs">Session Recording</div>
                        <div className="text-[11px] text-slate-500 mt-0.5">OFF by default. Enabling requires patient consent and jurisdiction compliance check.</div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setRecordingToggle(!recordingToggle)}
                        className="cursor-pointer"
                      >
                        {recordingToggle
                          ? <ToggleRight className="w-8 h-8 text-[#2ECDC5]" />
                          : <ToggleLeft className="w-8 h-8 text-slate-400" />
                        }
                      </button>
                    </div>
                    {recordingToggle && (
                      <div className="space-y-2 pt-2 border-t border-slate-200 animate-in fade-in duration-200">
                        <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-800 flex items-start gap-2">
                          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
                          Recording is gated behind separate consent record and jurisdiction-specific legal check.
                        </div>
                        <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                          <input
                            type="checkbox"
                            checked={recordingConsentChecked}
                            onChange={(e) => setRecordingConsentChecked(e.target.checked)}
                            className="rounded"
                          />
                          Patient consent obtained for session recording (documented in consent record)
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                          <input
                            type="checkbox"
                            checked={recordingJurisdictionChecked}
                            onChange={(e) => setRecordingJurisdictionChecked(e.target.checked)}
                            className="rounded"
                          />
                          Jurisdiction-specific legal compliance verified for {activeCase.patientCountry}
                        </label>
                      </div>
                    )}
                  </div>

                  {/* Outcome Log */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2">Log Consultation Outcome *</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { value: "suitable", label: "Suitable", icon: CheckCircle2 },
                        { value: "needs_more_info", label: "Needs More Information", icon: AlertCircle },
                        { value: "not_suitable", label: "Not Suitable", icon: XCircle },
                      ].map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => setTeleconsultOutcome(opt.value as ConsultationOutcome)}
                          className={`p-3 rounded-2xl text-xs font-bold border transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                            teleconsultOutcome === opt.value
                              ? opt.value === "suitable" ? "bg-emerald-500 text-white border-emerald-500"
                                : opt.value === "needs_more_info" ? "bg-amber-500 text-white border-amber-500"
                                : "bg-rose-600 text-white border-rose-600"
                              : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                          }`}
                        >
                          <opt.icon className="w-3.5 h-3.5" />
                          <span>{opt.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Consultation Notes *</label>
                    <textarea
                      rows={4}
                      required
                      value={teleconsultNotes}
                      onChange={(e) => setTeleconsultNotes(e.target.value)}
                      placeholder="Document the consultation discussion, clinical findings observed during the call, next steps..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3.5 text-xs text-slate-900 focus:ring-2 focus:ring-[#2ECDC5] focus:outline-none resize-none"
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#2ECDC5] via-[#3F4EB4] to-[#283593] hover:from-[#283593] hover:to-[#2ECDC5] text-white font-extrabold text-xs shadow-md hover:shadow-xl transition-all duration-300 flex items-center gap-2 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      Save Consultation Outcome
                    </button>
                  </div>
                </form>
              )}

              {/* ─── TAB: Accreditation Profile ─────────────────────────── */}
              {activeTab === "accreditation" && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <h4 className="font-extrabold text-slate-900 text-sm">Hospital Accreditation Profile</h4>
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-500 border border-slate-200">
                      Admin-managed · Read-only
                    </span>
                  </div>

                  {accreditation ? (
                    <div className="space-y-4">
                      <div className="p-4 bg-gradient-to-r from-[#071321] to-[#0D2642] rounded-2xl border border-slate-700 text-white">
                        <div className="font-black text-lg">{accreditation.hospitalName}</div>
                        <div className="text-slate-300 text-xs mt-0.5">{accreditation.city}, {accreditation.country}</div>
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {accreditation.specialties.map((s) => (
                            <span key={s} className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-slate-300 border border-white/10">{s}</span>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                          { label: "JCI Accreditation", status: accreditation.jciStatus, expiry: accreditation.jciExpiry, icon: "🏥" },
                          { label: "NABH Accreditation", status: accreditation.nabhStatus, expiry: accreditation.nabhExpiry, icon: "⭐" },
                        ].map((acc) => (
                          <div key={acc.label} className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                            <div className="flex items-center justify-between mb-2">
                              <div className="font-bold text-slate-900 text-xs">{acc.icon} {acc.label}</div>
                              <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${getAccredStatusColor(acc.status)}`}>
                                {acc.status === "active" ? "✓ Active" : acc.status === "expired" ? "Expired" : "Pending Renewal"}
                              </span>
                            </div>
                            {acc.expiry && (
                              <div className="text-[11px] text-slate-500">
                                Expiry: <strong className="text-slate-700">{acc.expiry}</strong>
                              </div>
                            )}
                            <div className="text-[11px] text-slate-400 mt-1">Last audited: {accreditation.lastAuditedAt}</div>
                          </div>
                        ))}
                      </div>

                      <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 text-xs text-blue-800 flex items-start gap-2">
                        <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5 text-blue-600" />
                        These accreditation records feed patient-facing trust signals on the public portal. Records are maintained by Super Admin.
                      </div>
                    </div>
                  ) : (
                    <div className="p-8 bg-slate-50 rounded-2xl text-center text-sm text-slate-400 border border-dashed border-slate-200">
                      No accreditation profile found for this hospital.
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
