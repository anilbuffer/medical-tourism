"use client";

import React, { useState } from "react";
import { PatientCase, ClinicalWorkspace, ConsultationOutcome } from "@/types/portal";
import { usePortal } from "@/lib/portal/store";
import { MOCK_ACCREDITATION_PROFILES } from "@/lib/portal/mockData";
import { DoctorDashboardTab } from "./doctor/DoctorDashboardTab";
import { DicomViewerModal } from "../modals/DicomViewerModal";
import { VideoConsultationSDKModal } from "../modals/VideoConsultationSDKModal";
import { RequestCsDocumentModal } from "../modals/RequestCsDocumentModal";
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
  Sparkles,
  Layers,
  Eye,
  Mail,
  Search,
  Check,
  UserCheck,
  Globe,
  Radio,
} from "lucide-react";

export type HospitalTab =
  | "dashboard"
  | "case_info"
  | "accept_decline"
  | "clinical_workspace"
  | "tele_consult"
  | "accreditation";

interface HospitalDoctorViewProps {
  cases: PatientCase[];
  onSelectCase: (caseId: string) => void;
  activeCaseId: string;
  activeTab?: HospitalTab;
  onSelectTab?: (tab: HospitalTab) => void;
}

export const HospitalDoctorView: React.FC<HospitalDoctorViewProps> = ({
  cases,
  onSelectCase,
  activeCaseId,
  activeTab: controlledTab,
  onSelectTab: controlledOnSelectTab,
}) => {
  const {
    acceptCase,
    declineCase,
    saveClinicalWorkspace,
    updateConsultationOutcome,
    toggleConsultationRecording,
    currentUser,
  } = usePortal();

  const activeCase = cases.find((c) => c.id === activeCaseId) || cases[0];
  const hospitalId = currentUser?.hospitalId || "hosp_medanta";
  const accreditation = MOCK_ACCREDITATION_PROFILES.find((a) => a.hospitalId === hospitalId);

  const [internalTab, setInternalTab] = useState<HospitalTab>("case_info");
  const activeTab = controlledTab ?? internalTab;
  const setActiveTab = (tab: HospitalTab) => {
    if (controlledOnSelectTab) {
      controlledOnSelectTab(tab);
    } else {
      setInternalTab(tab);
    }
  };

  // Search & Filter in Assigned Cases list
  const [caseSearch, setCaseSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "accepted" | "declined" | "pending">("all");

  // Modals state
  const [isDicomOpen, setIsDicomOpen] = useState(false);
  const [dicomFileName, setDicomFileName] = useState("Abdominal_MRI_Scans.dicom");
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isRequestCsModalOpen, setIsRequestCsModalOpen] = useState(false);
  const [selectedDocForCs, setSelectedDocForCs] = useState<{ title: string; defaultNote: string }>({
    title: "Blood_Work_Report.pdf",
    defaultNote: "Missing Page 2 (Viral Serology & INR) — please request re-upload from patient.",
  });

  // Accept/Decline state
  const [declineReason, setDeclineReason] = useState("");
  const [declineError, setDeclineError] = useState("");
  const [actionFeedback, setActionFeedback] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  // Clinical Workspace & Candidacy state
  const [treatmentPlan, setTreatmentPlan] = useState(
    activeCase?.clinicalWorkspace?.treatmentPlan ||
    "Patient is an optimal LDLT candidate. Living donor right lobe graft volumetric ratio calculated at 68% standard liver volume. 14 Days planned hospital stay (Private Suite + ICU Isolation)."
  );
  const [expectedStayDays, setExpectedStayDays] = useState(activeCase?.clinicalWorkspace?.expectedStayDays || 14);
  const [icuDays, setIcuDays] = useState(3);
  const [vipRoomDays, setVipRoomDays] = useState(11);
  const [costEstimateUsd, setCostEstimateUsd] = useState(activeCase?.clinicalWorkspace?.costEstimateUsd || 28500);
  const [suitabilityDetermination, setSuitabilityDetermination] = useState<ClinicalWorkspace["suitabilityDetermination"]>(
    activeCase?.clinicalWorkspace?.suitabilityDetermination || "suitable"
  );
  const [workspaceSaving, setWorkspaceSaving] = useState(false);
  const [workspaceSaved, setWorkspaceSaved] = useState(false);

  // Tele-consult state
  const [teleconsultOutcome, setTeleconsultOutcome] = useState<ConsultationOutcome>(
    activeCase?.consultation?.outcome || "suitable"
  );
  const [teleconsultNotes, setTeleconsultNotes] = useState(
    activeCase?.consultation?.outcomeNotes ||
    "Living donor right lobe graft volumetric ratio calculated at 68% standard liver volume. Donor vascular anatomy cleared. Patient scheduled for pre-op clearance upon arrival."
  );
  const [recordingToggle, setRecordingToggle] = useState(activeCase?.consultation?.recordingEnabled || false);
  const [recordingConsentChecked, setRecordingConsentChecked] = useState(true);
  const [recordingJurisdictionChecked, setRecordingJurisdictionChecked] = useState(true);
  const [teleconsultSaved, setTeleconsultSaved] = useState(false);

  const isAccepted = activeCase?.caseDecisionStatus === "accepted";
  const isDeclined = activeCase?.caseDecisionStatus === "declined";

  // Pre-fill template helper
  const handleApplyTemplate = () => {
    setTreatmentPlan(
      "Patient is an optimal LDLT candidate. Living donor right lobe graft volumetric ratio calculated at 68% standard liver volume. 14 Days planned hospital stay (Private Suite + ICU Isolation)."
    );
    setExpectedStayDays(14);
    setIcuDays(3);
    setVipRoomDays(11);
    setCostEstimateUsd(28500);
    setSuitabilityDetermination("suitable");
  };

  const showFeedback = (type: "success" | "error", msg: string) => {
    setActionFeedback({ type, msg });
    setTimeout(() => setActionFeedback(null), 4500);
  };

  const handleAccept = () => {
    if (!activeCase) return;
    acceptCase(activeCase.id);
    showFeedback("success", "Case accepted by Dr. Subhash Gupta. Clinical Workspace and Tele-Consult unlocked.");
    setActiveTab("accept_decline");
  };

  const handleDecline = () => {
    if (!declineReason.trim()) {
      setDeclineError("A reason is required when declining a case for the clinical audit trail.");
      return;
    }
    setDeclineError("");
    declineCase(activeCase.id, declineReason);
    showFeedback("success", "Case declined. Reason logged to audit trail. CS team notified for scope redirection.");
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
      showFeedback("success", "Clinical Opinion saved and synchronized with CS Coordinator Desk & Patient Portal.");
      setTimeout(() => setWorkspaceSaved(false), 3500);
    }, 500);
  };

  const handleSaveTeleconsult = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeCase) return;
    updateConsultationOutcome(activeCase.id, teleconsultOutcome, teleconsultNotes);
    if (activeCase.consultation) {
      toggleConsultationRecording(activeCase.id, recordingToggle, recordingConsentChecked);
    }
    setTeleconsultSaved(true);
    showFeedback("success", "Tele-consultation outcome saved and populated to Patient Portal Doctor Video Call tab.");
    setTimeout(() => setTeleconsultSaved(false), 3500);
  };

  // Filtered cases for left panel
  const filteredCases = cases.filter((c) => {
    const matchesSearch =
      c.patientName.toLowerCase().includes(caseSearch.toLowerCase()) ||
      c.id.toLowerCase().includes(caseSearch.toLowerCase()) ||
      c.treatmentCategory.toLowerCase().includes(caseSearch.toLowerCase());

    if (!matchesSearch) return false;
    if (statusFilter === "all") return true;
    return c.caseDecisionStatus === statusFilter;
  });

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
      {/* Top Banner - Doctor Profile Snapshot & Security Gating */}
      <div className="bg-gradient-to-r from-[#141d60] via-[#1b2360] to-[#101e76] rounded-2xl p-6 sm:p-8 text-white shadow-xl border border-slate-800/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#3F4EB4]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3F4EB4]/25 text-[#2ECDC5] text-xs font-extrabold tracking-wider uppercase mb-2.5 border border-[#3F4EB4]/40">
            <Stethoscope className="w-3.5 h-3.5 text-[#2ECDC5]" />
            Doctor Profile Snapshot
          </div>
          <h2 className="text-2xl font-black tracking-tight text-white flex items-center gap-2 flex-wrap">
            <span>{currentUser?.name || "Dr. Subhash Gupta"}</span>
            <span className="text-slate-400 text-base font-normal">|</span>
            <span className="text-[#2ECDC5] text-base font-semibold">
              Chairman - Liver Transplant &amp; HPB Surgery
            </span>
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl font-medium">
            <strong>Medanta – The Medicity</strong> • Clinical workspace for surgical candidacy evaluations, DICOM imaging reviews, and secure tele-consultations.
          </p>
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row md:flex-col gap-2 shrink-0">
          <div className="flex items-center gap-2 bg-emerald-500/20 px-4 py-2 rounded-xl border border-emerald-500/30 text-xs font-bold text-emerald-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>HIPAA &amp; DISHA Compliant</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl border border-white/15 text-xs font-bold text-slate-200">
            <Building2 className="w-4 h-4 text-[#2ECDC5] shrink-0" />
            <span>Row-Level Security Active ({cases.length} Assigned Cases)</span>
          </div>
        </div>
      </div>

      {/* Global Feedback Banner */}
      {actionFeedback && (
        <div
          className={`px-5 py-3.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2.5 shadow-sm animate-in fade-in duration-200 ${actionFeedback.type === "success"
            ? "bg-emerald-50 text-emerald-900 border border-emerald-200"
            : "bg-rose-50 text-rose-900 border border-rose-200"
            }`}
        >
          {actionFeedback.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          ) : (
            <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
          )}
          <span>{actionFeedback.msg}</span>
        </div>
      )}

      {/* ─── SCREEN 1: DASHBOARD TAB ────────────────────────────────────────── */}
      {activeTab === "dashboard" && (
        <DoctorDashboardTab
          cases={cases}
          activeCaseId={activeCaseId}
          onSelectCase={onSelectCase}
          onNavigateTab={setActiveTab}
          onLaunchDicom={(fileName) => {
            setDicomFileName(fileName || "Abdominal_MRI_Scans.dicom");
            setIsDicomOpen(true);
          }}
          onLaunchVideoRoom={() => setIsVideoModalOpen(true)}
        />
      )}

      {/* ─── SCREEN 2: ASSIGNED CASES WORKSPACE (SCREEN A) ───────────────────── */}
      {activeTab === "case_info" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-[#3F4EB4] bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
                SCREEN A
              </span>
              <h3 className="text-base font-black text-slate-900">
                ASSIGNED CASE WORKSPACE — Case ID: {activeCase?.id || "PT-2026-089412"}
              </h3>
            </div>
            <span className="text-xs text-slate-500 hidden sm:inline-block">
              Two-panel high-density clinical dossier
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* LEFT PANEL: ASSIGNED CASES (2) */}
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-5 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[#3F4EB4]" />
                  LEFT PANEL: ASSIGNED CASES ({cases.length})
                </h4>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                  Live Queue
                </span>
              </div>

              {/* Searchbox in Left Panel */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter by Patient ID or Name..."
                  value={caseSearch}
                  onChange={(e) => setCaseSearch(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-3 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-[#3F4EB4] focus:outline-none"
                />
              </div>

              {/* Status Filter Chips */}
              <div className="flex gap-1 overflow-x-auto pb-1 text-[10px] font-bold">
                {(["all", "accepted", "declined", "pending"] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-2.5 py-1 rounded-lg capitalize transition-all cursor-pointer whitespace-nowrap ${statusFilter === st
                      ? "bg-[#3F4EB4] text-white shadow-xs"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                  >
                    {st}
                  </button>
                ))}
              </div>

              {/* Cases List */}
              <div className="space-y-2.5">
                {filteredCases.map((c) => {
                  const isSelected = c.id === activeCaseId;
                  const isAcc = c.caseDecisionStatus === "accepted";
                  const isDec = c.caseDecisionStatus === "declined";

                  return (
                    <button
                      key={c.id}
                      onClick={() => onSelectCase(c.id)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 cursor-pointer ${isSelected
                        ? "bg-gradient-to-r from-[#141d60] via-[#1b2360] to-[#101e76] text-white border-slate-800 shadow-lg ring-1 ring-white/20"
                        : "bg-white hover:bg-slate-50 text-slate-800 border-slate-200 shadow-2xs hover:-translate-y-0.5"
                        }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 font-mono text-xs font-bold">
                          <span>{isAcc ? "🟢" : isDec ? "🔴" : "🟡"}</span>
                          <span className={isSelected ? "text-[#2ECDC5]" : "text-[#3F4EB4]"}>
                            {c.id}
                          </span>
                        </div>
                        <span
                          className={`text-[10px] font-black px-2 py-0.5 rounded-full ${isAcc
                            ? "bg-emerald-100 text-emerald-800"
                            : isDec
                              ? "bg-rose-100 text-rose-800"
                              : "bg-amber-100 text-amber-800"
                            }`}
                        >
                          {isAcc ? "ACCEPTED" : isDec ? "DECLINED" : "PENDING"}
                        </span>
                      </div>

                      <div className="font-black text-sm mt-1.5">{c.patientName}</div>
                      <div
                        className={`text-xs truncate font-medium ${isSelected ? "text-slate-200" : "text-slate-600"
                          }`}
                      >
                        {c.clinicalSummary.recommendedProcedure || c.treatmentCategory}
                      </div>

                      <div
                        className={`text-[11px] mt-2 flex items-center justify-between ${isSelected ? "text-slate-300" : "text-slate-400"
                          }`}
                      >
                        <span>Referred: Aug {c.id === "PT-2026-089412" ? "24" : "20"}, 2026</span>
                        <span>{c.patientCountry}</span>
                      </div>
                    </button>
                  );
                })}

                {filteredCases.length === 0 && (
                  <div className="p-6 text-center text-xs text-slate-400 border border-dashed border-slate-200 rounded-xl">
                    No cases matching filter.
                  </div>
                )}
              </div>
            </div>

            {/* MAIN PANEL: CLINICAL DOSSIER */}
            {activeCase && (
              <div className="lg:col-span-2 space-y-5">
                {/* Dossier Header & Patient Snapshot */}
                <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] space-y-4">
                  <div className="flex items-start justify-between gap-3 flex-wrap pb-4 border-b border-slate-100">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-[#3F4EB4]">{activeCase.id}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-[#3F4EB4] border border-blue-200">
                          MAIN PANEL: CLINICAL DOSSIER ({activeCase.patientName})
                        </span>
                      </div>
                      <h3 className="text-2xl font-black text-slate-900 mt-1">{activeCase.patientName}</h3>
                    </div>
                    <span
                      className={`text-xs font-black px-3.5 py-1.5 rounded-full ${getStatusBadge(
                        activeCase.caseDecisionStatus
                      )}`}
                    >
                      {activeCase.caseDecisionStatus === "accepted"
                        ? "✓ Accepted for Surgery"
                        : activeCase.caseDecisionStatus === "declined"
                          ? "✗ Declined (Scope Redirect)"
                          : "⏳ Pending Evaluation"}
                    </span>
                  </div>

                  {/* Patient Snapshot Section */}
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider text-slate-400 mb-2">
                      PATIENT SNAPSHOT
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                        <div className="text-[10px] font-bold text-slate-400 uppercase">Origin &amp; Demographics</div>
                        <div className="font-bold text-slate-900 mt-0.5">
                          • Origin: {activeCase.id === "PT-2026-089412" ? "🇦🇪 Dubai, UAE" : "🇸🇬 Singapore"}
                        </div>
                        <div className="text-slate-600 mt-0.5">
                          • Age/Gender: {activeCase.id === "PT-2026-089412" ? "48y / Male" : "42y / Female"}
                        </div>
                      </div>

                      <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                        <div className="text-[10px] font-bold text-slate-400 uppercase">Language &amp; Contact</div>
                        <div className="font-bold text-slate-900 mt-0.5">
                          • Preferred Language: {activeCase.preferredLanguage}
                        </div>
                        <div className="text-slate-600 mt-0.5">
                          • Coordinator: {activeCase.assignedCoordinatorName || "Ananya Sharma"}
                        </div>
                      </div>

                      <div className="sm:col-span-2 p-3.5 bg-blue-50/70 rounded-xl border border-blue-200 text-xs">
                        <div className="text-[10px] font-bold text-blue-800 uppercase tracking-wider">
                          Primary Diagnosis &amp; Severity
                        </div>
                        <div className="font-bold text-slate-900 mt-1 text-sm">
                          • Primary Diagnosis: {activeCase.clinicalSummary.diagnosis}
                        </div>
                        <div className="text-slate-700 mt-1 leading-relaxed">
                          • Chief Complaint: {activeCase.clinicalSummary.chiefComplaint}
                        </div>
                        {activeCase.clinicalSummary.pastMedicalHistory && (
                          <div className="text-slate-600 text-[11px] mt-1">
                            • Past History: {activeCase.clinicalSummary.pastMedicalHistory}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Case-Scoped Medical Documents (HIPAA Gated) */}
                  <div className="pt-2">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-[#3F4EB4]" />
                        <h4 className="font-extrabold text-slate-900 text-sm">
                          CASE-SCOPED MEDICAL DOCUMENTS (HIPAA Gated)
                        </h4>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                        🔒 End-to-End Encrypted
                      </span>
                    </div>

                    <div className="space-y-3">
                      {/* Document 1: DICOM Scans */}
                      <div className="p-4 bg-slate-50/90 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs hover:border-[#3F4EB4]/40 transition-all">
                        <div className="space-y-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-base">📄</span>
                            <span className="font-bold text-xs text-slate-900 truncate">
                              Abdominal_MRI_Scans.dicom
                            </span>
                            <span className="text-[10px] text-slate-500 font-mono">(148.5 MB)</span>
                          </div>
                          <div className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-500" />
                            <span>Status: 🟢 Reviewed by Dr. Gupta (3.0T Liver Volumetric cleared)</span>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            setDicomFileName("Abdominal_MRI_Scans.dicom");
                            setIsDicomOpen(true);
                          }}
                          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#141d60] to-[#101e76] hover:from-[#1b2360] hover:to-[#141d60] text-white font-extrabold text-xs shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
                        >
                          <Eye className="w-3.5 h-3.5 text-[#2ECDC5]" />
                          <span>Launch DICOM Viewer</span>
                        </button>
                      </div>

                      {/* Document 2: Blood Work Report (Missing Page 2) */}
                      <div className="p-4 bg-slate-50/90 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs hover:border-amber-400 transition-all">
                        <div className="space-y-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-base">📄</span>
                            <span className="font-bold text-xs text-slate-900 truncate">
                              Blood_Work_Report.pdf
                            </span>
                            <span className="text-[10px] text-slate-500 font-mono">(2.4 MB)</span>
                          </div>
                          <div className="text-[11px] text-amber-700 font-semibold flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-amber-500" />
                            <span>Status: 🟡 Missing Page 2 (Serology &amp; INR)</span>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            setSelectedDocForCs({
                              title: "Blood_Work_Report.pdf",
                              defaultNote:
                                "Page 2 missing — please request patient re-upload viral serology (HBsAg, Anti-HCV) and INR coagulation panel before surgical evaluation.",
                            });
                            setIsRequestCsModalOpen(true);
                          }}
                          className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>Request via CS</span>
                        </button>
                      </div>

                      {/* Document 3: Donor Evaluation */}
                      {activeCase.id === "PT-2026-089412" && (
                        <div className="p-4 bg-slate-50/90 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
                          <div className="space-y-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-base">📄</span>
                              <span className="font-bold text-xs text-slate-900 truncate">
                                Living_Donor_Volumetric_Evaluation.pdf
                              </span>
                              <span className="text-[10px] text-slate-500 font-mono">(5.1 MB)</span>
                            </div>
                            <div className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-emerald-500" />
                              <span>Status: 🟢 Donor Faris (Son, 28y, B+) Cleared for Right Lobe Graft</span>
                            </div>
                          </div>

                          <span className="px-3 py-1.5 rounded-xl bg-slate-200 text-slate-700 text-xs font-bold shrink-0">
                            Verified Donor
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Bottom Navigation CTAs */}
                  <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                    <button
                      onClick={() => setActiveTab("accept_decline")}
                      className="px-5 py-3 rounded-2xl bg-gradient-to-r from-[#141d60] via-[#1b2360] to-[#101e76] hover:from-[#1b2360] hover:to-[#141d60] text-white font-extrabold text-xs shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <Stethoscope className="w-4 h-4 text-[#2ECDC5]" />
                      <span>Proceed to Surgical Candidacy Matrix</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ─── SCREEN 3: SURGICAL CANDIDACY & DECISION MATRIX (SCREEN B) ────────── */}
      {activeTab === "accept_decline" && (
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] space-y-6">
          <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100 flex-wrap">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-[#3F4EB4] bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
                  SCREEN B
                </span>
                <h3 className="text-xl font-black text-slate-900">
                  Surgical Candidacy &amp; Decision Matrix
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Interactive Clinical Candidacy Form for <strong>{activeCase?.patientName}</strong> ({activeCase?.id})
              </p>
            </div>

            <button
              type="button"
              onClick={handleApplyTemplate}
              className="px-3.5 py-2 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-900 font-extrabold text-xs border border-teal-200 shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#2ECDC5]" />
              <span>Load LDLT Standard Template</span>
            </button>
          </div>

          <form onSubmit={handleSaveWorkspace} className="space-y-6">
            {/* 1. Suitability Determination Radio Group */}
            <div className="space-y-2.5">
              <label className="block text-xs font-black uppercase tracking-wider text-slate-700">
                Suitability Determination (Radio Group) *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Option 1: Suitable */}
                <button
                  type="button"
                  onClick={() => setSuitabilityDetermination("suitable")}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-3 ${suitabilityDetermination === "suitable"
                    ? "bg-emerald-50/90 border-emerald-500 shadow-md ring-2 ring-emerald-500/20"
                    : "bg-slate-50 hover:bg-slate-100/70 border-slate-200"
                    }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${suitabilityDetermination === "suitable"
                      ? "border-emerald-600 bg-emerald-600 text-white"
                      : "border-slate-300 bg-white"
                      }`}
                  >
                    {suitabilityDetermination === "suitable" && <Check className="w-3.5 h-3.5" />}
                  </div>
                  <div>
                    <div className="font-extrabold text-xs text-slate-900">
                      Suitable for Surgical Intervention
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Graft ratio &amp; clinical indices meet surgical safety parameters.
                    </div>
                  </div>
                </button>

                {/* Option 2: Needs More Info */}
                <button
                  type="button"
                  onClick={() => setSuitabilityDetermination("needs_more_info")}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-3 ${suitabilityDetermination === "needs_more_info"
                    ? "bg-amber-50/90 border-amber-500 shadow-md ring-2 ring-amber-500/20"
                    : "bg-slate-50 hover:bg-slate-100/70 border-slate-200"
                    }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${suitabilityDetermination === "needs_more_info"
                      ? "border-amber-600 bg-amber-600 text-white"
                      : "border-slate-300 bg-white"
                      }`}
                  >
                    {suitabilityDetermination === "needs_more_info" && <Check className="w-3.5 h-3.5" />}
                  </div>
                  <div>
                    <div className="font-extrabold text-xs text-slate-900">
                      Needs More Info / Additional Diagnostics
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Pending repeat serology or supplemental cardiology telemetry.
                    </div>
                  </div>
                </button>

                {/* Option 3: Not Suitable */}
                <button
                  type="button"
                  onClick={() => setSuitabilityDetermination("not_suitable")}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-3 ${suitabilityDetermination === "not_suitable"
                    ? "bg-rose-50/90 border-rose-600 shadow-md ring-2 ring-rose-600/20"
                    : "bg-slate-50 hover:bg-slate-100/70 border-slate-200"
                    }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${suitabilityDetermination === "not_suitable"
                      ? "border-rose-600 bg-rose-600 text-white"
                      : "border-slate-300 bg-white"
                      }`}
                  >
                    {suitabilityDetermination === "not_suitable" && <Check className="w-3.5 h-3.5" />}
                  </div>
                  <div>
                    <div className="font-extrabold text-xs text-slate-900">
                      Not Suitable (Provide Reason)
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Redirects case to CS nurture queue for alternative referral.
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* 2. Clinical Treatment Plan (Rich Text Editor) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-black uppercase tracking-wider text-slate-700">
                  Clinical Treatment Plan (Rich Text Editor) *
                </label>
                <span className="text-[10px] text-slate-400">
                  Pre-filled template active
                </span>
              </div>
              <textarea
                rows={5}
                required
                value={treatmentPlan}
                onChange={(e) => setTreatmentPlan(e.target.value)}
                placeholder="Patient is an optimal LDLT candidate. Living donor right lobe graft volumetric ratio calculated at 68% standard liver volume. 14 Days planned hospital stay (Private Suite + ICU Isolation)."
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs sm:text-sm text-slate-900 focus:ring-2 focus:ring-[#2ECDC5] focus:outline-none transition-all leading-relaxed"
              />
              <div className="flex flex-wrap gap-2 text-[10px] text-slate-500">
                <span className="font-bold text-slate-700">Quick Insert:</span>
                <button
                  type="button"
                  onClick={() =>
                    setTreatmentPlan((prev) =>
                      prev + " Volumetric ratio 68%. Right hepatectomy without middle hepatic vein."
                    )
                  }
                  className="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
                >
                  + Graft Volumetric Spec
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setTreatmentPlan((prev) =>
                      prev + " Pre-op clearance: Repeat INR, Serum Creatinine, Cardiac ECHO."
                    )
                  }
                  className="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
                >
                  + Pre-op Protocol
                </button>
              </div>
            </div>

            {/* 3. Hospital Operational Parameters */}
            <div className="p-5 bg-slate-50/80 rounded-2xl border border-slate-200 space-y-4">
              <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#3F4EB4]" />
                Hospital Operational Parameters
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Expected Length of Stay */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Expected Length of Stay: [ {expectedStayDays} ] Days *
                  </label>
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="number"
                        min={1}
                        required
                        value={expectedStayDays}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setExpectedStayDays(val);
                          setVipRoomDays(Math.max(0, val - icuDays));
                        }}
                        className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-[#2ECDC5] focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-2">
                    <span>Breakdown:</span>
                    <strong className="text-[#3F4EB4]">{icuDays} Days ICU</strong>
                    <span>+</span>
                    <strong className="text-teal-700">{vipRoomDays} Days VIP Room</strong>
                  </div>
                </div>

                {/* Base Hospital Estimate */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Base Hospital Estimate (USD) *
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-600" />
                    <input
                      type="number"
                      min={1000}
                      step={500}
                      required
                      value={costEstimateUsd}
                      onChange={(e) => setCostEstimateUsd(Number(e.target.value))}
                      className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-xs font-black text-slate-900 focus:ring-2 focus:ring-[#2ECDC5] focus:outline-none"
                    />
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">
                    Timestamped &amp; attributed to Dr. Subhash Gupta&apos;s account for clinical liability separation.
                  </div>
                </div>
              </div>
            </div>

            {/* Liability Notice */}
            <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-2xl text-xs text-blue-900 flex items-start gap-2.5">
              <Lock className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                <strong>Clinical Liability Separation:</strong> This medical estimate is the system-of-record for surgeon liability. It auto-syncs with the CS Coordinator Quote Builder to form the official patient package.
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={handleAccept}
                className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-extrabold text-xs border border-emerald-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Accept Case on Hospital Record</span>
              </button>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <button
                  type="submit"
                  disabled={workspaceSaving}
                  className="px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-xs transition-all cursor-pointer"
                >
                  {workspaceSaving ? "Saving..." : "Save Clinical Opinion"}
                </button>

                <button
                  type="submit"
                  disabled={workspaceSaving}
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#141d60] via-[#1b2360] to-[#101e76] hover:from-[#1b2360] hover:to-[#141d60] text-white font-extrabold text-xs shadow-lg hover:shadow-xl transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5 text-[#2ECDC5]" />
                  <span>Submit &amp; Sync to CS Desk</span>
                </button>
              </div>
            </div>
          </form>

          {/* Decline Audit Trail Form (if declining) */}
          <div className="border-t border-slate-100 pt-6 mt-6">
            <h4 className="font-extrabold text-slate-900 text-sm mb-2 flex items-center gap-2 text-rose-700">
              <XCircle className="w-4 h-4" />
              Decline &amp; Redirect Case (Audit Gated)
            </h4>
            <p className="text-xs text-slate-500 mb-3">
              A reason is <strong>strictly required</strong> when declining a case. This feeds the audit trail and transfers the lead to the CS Nurture Queue.
            </p>
            <textarea
              rows={2}
              placeholder="e.g. Outside our specialty scope — recommend referral to spine surgery at Artemis Hospital..."
              value={declineReason}
              onChange={(e) => {
                setDeclineReason(e.target.value);
                setDeclineError("");
              }}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3.5 text-xs text-slate-900 focus:ring-2 focus:ring-rose-400 focus:outline-none"
            />
            {declineError && (
              <p className="text-xs text-rose-600 font-bold mt-1.5 flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" /> {declineError}
              </p>
            )}
            <button
              onClick={handleDecline}
              className="mt-3 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <XCircle className="w-4 h-4" />
              Decline &amp; Log Reason to Audit Trail
            </button>
          </div>
        </div>
      )}

      {/* ─── SCREEN 4: CLINICAL WORKSPACE ──────────────────────────────────── */}
      {activeTab === "clinical_workspace" && (
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] space-y-6">
          <div className="flex items-start justify-between gap-3 flex-wrap pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-xl font-black text-slate-900">Clinical Evaluation &amp; Surgical Workspace</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Timestamped system of record for clinical liability and surgical feasibility documentation.
              </p>
            </div>
            {activeCase?.clinicalWorkspace?.lastUpdatedAt && (
              <div className="flex items-center gap-2 text-xs text-emerald-800 bg-emerald-50 px-3.5 py-1.5 rounded-xl border border-emerald-200 font-bold">
                <CalendarClock className="w-4 h-4 text-emerald-600" />
                <span>Last Updated: {new Date(activeCase.clinicalWorkspace.lastUpdatedAt).toLocaleString("en-US")}</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <div className="font-extrabold text-xs text-slate-900 uppercase tracking-wider text-slate-400">
                  Primary Surgical Evaluation
                </div>
                <div className="font-black text-sm text-slate-900">{activeCase?.clinicalSummary.recommendedProcedure}</div>
                <p className="text-xs text-slate-700 leading-relaxed">{activeCase?.clinicalWorkspace?.treatmentPlan || treatmentPlan}</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <div className="font-extrabold text-xs text-slate-900 uppercase tracking-wider text-slate-400">
                  Volumetric &amp; Donor Graft Analysis
                </div>
                <div className="text-xs space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Living Donor Graft Ratio:</span>
                    <strong className="text-emerald-700">68% Standard Liver Volume</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Vascular Anatomy Clearance:</span>
                    <strong className="text-emerald-700">Cleared by Dr. Gupta (Aug 24)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">MELD-Na Score:</span>
                    <strong className="text-slate-900">24 (High Priority)</strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <div className="font-extrabold text-xs text-slate-900 uppercase tracking-wider text-slate-400">
                  Hospital Length of Stay &amp; Facility Allocation
                </div>
                <div className="text-xs space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Total Inpatient Stay:</span>
                    <strong className="text-[#3F4EB4]">{expectedStayDays} Days</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">ICU Isolation:</span>
                    <strong className="text-slate-900">3 Days (Dedicated Transplant ICU)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Private Suite:</span>
                    <strong className="text-slate-900">11 Days (VIP Post-Op Room)</strong>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-slate-200">
                    <span className="text-slate-500">Base Estimate:</span>
                    <strong className="text-emerald-700 font-mono text-sm">${costEstimateUsd.toLocaleString()} USD</strong>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-teal-50/70 rounded-2xl border border-teal-200 text-xs text-teal-900 space-y-1">
                <div className="font-extrabold">Doctor Signature Attribution</div>
                <div>Submitted by: <strong>Dr. Subhash Gupta</strong> (Chairman - Liver Transplant)</div>
                <div className="text-[10px] text-teal-700">Cryptographically sealed under MFA session token.</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── SCREEN 5: TELE-CONSULTATION (SCREEN C) ────────────────────────── */}
      {activeTab === "tele_consult" && (
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] space-y-6">
          {/* Session Header & Dual-Clock Badge */}
          <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100 flex-wrap">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-[#2ECDC5] bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-200">
                  LIVE VIDEO SUITE
                </span>
                <h3 className="text-xl font-black text-slate-900">
                  Tele-Consultation with {activeCase?.patientName || "Tariq Al-Mansoor"}
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Scheduled: Today, Aug 27 at 05:00 PM IST (03:30 PM GST) • Care Coordinator Ananya Sharma present as Arabic translator
              </p>
            </div>

            {/* Dual-Clock Badge */}
            <div className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2.5 rounded-2xl shadow-sm border border-slate-700 text-xs font-mono">
              <Clock className="w-4 h-4 text-[#2ECDC5]" />
              <div className="flex items-center gap-3">
                <div>
                  <span className="text-slate-400 text-[10px] block">INDIA (IST)</span>
                  <span className="font-black text-[#2ECDC5]">05:00 PM</span>
                </div>
                <div className="w-px h-6 bg-slate-700" />
                <div>
                  <span className="text-slate-400 text-[10px] block">DUBAI (GST)</span>
                  <span className="font-black text-white">03:30 PM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Video Call Container */}
          <div className="p-6 bg-gradient-to-br from-[#071321] via-[#0b1c33] to-[#071321] rounded-3xl border border-slate-800 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#2ECDC5]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-2 relative z-10 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-extrabold border border-emerald-500/30">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                WebRTC Secure Room Ready
              </div>
              <h4 className="text-lg font-black text-white">
                HD Video Room • Tariq Al-Mansoor &amp; Living Donor
              </h4>
              <p className="text-xs text-slate-300 max-w-md leading-relaxed">
                Encrypted peer-to-peer clinical stream (AES-256-GCM). DICOM screen sharing and real-time medical translation enabled.
              </p>
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
              <button
                type="button"
                onClick={() => setIsVideoModalOpen(true)}
                className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-gradient-to-r from-[#2ECDC5] to-teal-400 hover:from-teal-400 hover:to-[#2ECDC5] text-slate-950 font-black text-xs sm:text-sm shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <Video className="w-5 h-5 text-slate-950" />
                <span>Join Secure Video Room</span>
              </button>
            </div>
          </div>

          {/* Session Recording Toggle (Gated behind dual consent) */}
          <div className="p-5 bg-slate-50/90 rounded-2xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-extrabold text-slate-900 text-xs flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#3F4EB4]" />
                  Session Recording Toggle (Gated Compliance)
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  OFF by default. Gated behind dual patient-doctor jurisdiction consent.
                </div>
              </div>
              <button
                type="button"
                onClick={() => setRecordingToggle(!recordingToggle)}
                className="cursor-pointer"
              >
                {recordingToggle ? (
                  <ToggleRight className="w-8 h-8 text-[#2ECDC5]" />
                ) : (
                  <ToggleLeft className="w-8 h-8 text-slate-400" />
                )}
              </button>
            </div>

            {recordingToggle && (
              <div className="space-y-2 pt-3 border-t border-slate-200 animate-in fade-in duration-200 text-xs">
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-800 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
                  <span>
                    Dual-jurisdiction compliance active for <strong>United Arab Emirates (GST)</strong> and <strong>India (DISHA)</strong>.
                  </span>
                </div>
                <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-700">
                  <input
                    type="checkbox"
                    checked={recordingConsentChecked}
                    onChange={(e) => setRecordingConsentChecked(e.target.checked)}
                    className="rounded text-[#3F4EB4]"
                  />
                  Patient consent obtained for session recording (documented in consent record)
                </label>
                <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-700">
                  <input
                    type="checkbox"
                    checked={recordingJurisdictionChecked}
                    onChange={(e) => setRecordingJurisdictionChecked(e.target.checked)}
                    className="rounded text-[#3F4EB4]"
                  />
                  Jurisdiction-specific legal compliance verified for UAE patient
                </label>
              </div>
            )}
          </div>

          {/* Post-Consultation Log */}
          <form onSubmit={handleSaveTeleconsult} className="space-y-4 pt-2">
            <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#3F4EB4]" />
              Post-Consultation Log
            </h4>

            {/* Consultation Outcome */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                Consultation Outcome *
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: "suitable", label: "[✓] Suitable", icon: CheckCircle2, color: "emerald" },
                  { value: "needs_more_info", label: "[ ] Needs More Info", icon: AlertCircle, color: "amber" },
                  { value: "not_suitable", label: "[ ] Not Suitable", icon: XCircle, color: "rose" },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setTeleconsultOutcome(opt.value as ConsultationOutcome)}
                    className={`p-3 rounded-2xl text-xs font-bold border transition-all cursor-pointer flex items-center justify-center gap-1.5 ${teleconsultOutcome === opt.value
                      ? opt.color === "emerald"
                        ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                        : opt.color === "amber"
                          ? "bg-amber-500 text-white border-amber-500 shadow-xs"
                          : "bg-rose-600 text-white border-rose-600 shadow-xs"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                  >
                    <opt.icon className="w-3.5 h-3.5" />
                    <span>{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Clinical Follow-up Notes */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Clinical Follow-up Notes (Auto-populates Patient Portal Video Call Tab) *
              </label>
              <textarea
                rows={4}
                required
                value={teleconsultNotes}
                onChange={(e) => setTeleconsultNotes(e.target.value)}
                placeholder="Document findings discussed with patient and living donor..."
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3.5 text-xs text-slate-900 focus:ring-2 focus:ring-[#2ECDC5] focus:outline-none leading-relaxed"
              />
              <div className="text-[10px] text-slate-400 mt-1">
                Automatically populates the Patient Portal&apos;s Doctor Video Call tab upon submission.
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#141d60] via-[#1b2360] to-[#101e76] hover:from-[#1b2360] hover:to-[#141d60] text-white font-extrabold text-xs shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5 text-[#2ECDC5]" />
                <span>Save Consultation Outcome &amp; Sync to Patient Portal</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ─── SCREEN 6: HOSPITAL ACCREDITATION PROFILE ────────────────────────── */}
      {activeTab === "accreditation" && (
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-xl font-black text-slate-900">Hospital Accreditation &amp; Profile</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Official international accreditations, NABH &amp; JCI standards for <strong>Medanta – The Medicity</strong>.
              </p>
            </div>
            <span className="text-[10px] font-extrabold px-3 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
              Admin-Managed · Verified
            </span>
          </div>

          {accreditation ? (
            <div className="space-y-5">
              <div className="p-6 bg-gradient-to-r from-[#071321] via-[#0c1f38] to-[#071321] rounded-3xl border border-slate-700 text-white shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-black text-xl text-white">{accreditation.hospitalName}</h4>
                    <div className="text-slate-300 text-xs mt-0.5">
                      {accreditation.city}, {accreditation.country} • Dr. Subhash Gupta (Chairman - HPB &amp; Liver Transplant)
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-teal-500/20 text-[#2ECDC5] flex items-center justify-center font-bold">
                    <Building2 className="w-6 h-6" />
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  {accreditation.specialties.map((s) => (
                    <span
                      key={s}
                      className="text-[11px] font-bold px-3 py-1 rounded-full bg-white/10 text-slate-200 border border-white/10"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: "JCI International Accreditation", status: accreditation.jciStatus, expiry: accreditation.jciExpiry, icon: "🏥" },
                  { label: "NABH Super-Specialty Accreditation", status: accreditation.nabhStatus, expiry: accreditation.nabhExpiry, icon: "⭐" },
                ].map((acc) => (
                  <div key={acc.label} className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                        <span>{acc.icon}</span>
                        <span>{acc.label}</span>
                      </div>
                      <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full border ${getAccredStatusColor(acc.status)}`}>
                        {acc.status === "active" ? "✓ Active Valid" : acc.status === "expired" ? "Expired" : "Renewal In Progress"}
                      </span>
                    </div>
                    {acc.expiry && (
                      <div className="text-xs text-slate-600">
                        Expiry Date: <strong className="text-slate-900">{acc.expiry}</strong>
                      </div>
                    )}
                    <div className="text-[11px] text-slate-400">
                      Last Audited: {accreditation.lastAuditedAt} • Audit ID: #AUD-MEDANTA-2026
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl text-xs text-blue-900 flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>
                  Accreditation records feed patient-facing trust signals on the public portal. Medical credentials and operating suite licenses are audited annually by Super Admin.
                </span>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-xs text-slate-400 border border-dashed border-slate-200 rounded-2xl">
              No accreditation record found.
            </div>
          )}
        </div>
      )}

      {/* ─── MODALS ───────────────────────────────────────────────────────── */}
      {/* DICOM Viewer Modal */}
      <DicomViewerModal
        isOpen={isDicomOpen}
        onClose={() => setIsDicomOpen(false)}
        fileName={dicomFileName}
      />

      {/* Video Consultation SDK Modal */}
      {activeCase && (
        <VideoConsultationSDKModal
          isOpen={isVideoModalOpen}
          onClose={() => setIsVideoModalOpen(false)}
          patientCase={activeCase}
        />
      )}

      {/* Request CS Document Clarification Modal */}
      {activeCase && (
        <RequestCsDocumentModal
          isOpen={isRequestCsModalOpen}
          onClose={() => setIsRequestCsModalOpen(false)}
          patientCase={activeCase}
          docTitle={selectedDocForCs.title}
          defaultNote={selectedDocForCs.defaultNote}
        />
      )}
    </div>
  );
};
