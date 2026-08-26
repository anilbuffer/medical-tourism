"use client";

import React, { useState, useMemo } from "react";
import { PatientCase, PatientDocument, PatientJourneyStage, ConsentType } from "@/types/portal";
import { usePortal } from "@/lib/portal/store";
import {
  Users,
  Clock,
  CheckCircle2,
  FileText,
  Building2,
  Send,
  ShieldCheck,
  Eye,
  MessageSquare,
  Filter,
  Search,
  AlertTriangle,
  XCircle,
  Activity,
  StickyNote,
  Heart,
  DollarSign,
  ChevronDown,
  Inbox,
  RotateCcw,
} from "lucide-react";

export type CSTab = "overview" | "documents" | "consent" | "notes" | "handoff" | "quote_builder" | "messages";
export type QueueFilter = "all" | PatientJourneyStage;

interface CSQueueViewProps {
  cases: PatientCase[];
  onSelectCase: (caseId: string) => void;
  activeCaseId: string;
  activeTab?: CSTab;
  onSelectTab?: (tab: CSTab) => void;
}

const STAGE_LABEL_MAP: Record<string, string> = {
  lead: "New Leads",
  contacted: "Contacted",
  documents_collected: "Awaiting Documents",
  hospital_handover: "Handed to Hospital",
  consultation: "Consultation",
  quote: "Quote Sent",
  payment: "Payment",
  booking: "Booked",
  treatment: "In Treatment",
  followup: "Follow-up",
  nurture: "Nurture",
};

const ALL_STAGES: PatientJourneyStage[] = [
  "lead", "contacted", "documents_collected", "hospital_handover",
  "consultation", "quote", "payment", "booking", "treatment", "followup", "nurture"
];

function getSlaColor(slaExpiresAt: string, slaBreached: boolean): string {
  if (slaBreached) return "text-rose-600 bg-rose-50 border-rose-200";
  const msLeft = new Date(slaExpiresAt).getTime() - Date.now();
  const minLeft = msLeft / 60000;
  if (minLeft < 0) return "text-rose-600 bg-rose-50 border-rose-200";
  if (minLeft < 20) return "text-amber-700 bg-amber-50 border-amber-200";
  return "text-emerald-700 bg-emerald-50 border-emerald-200";
}

function getSlaLabel(slaExpiresAt: string, slaBreached: boolean): string {
  if (slaBreached) return "SLA Breached";
  const msLeft = new Date(slaExpiresAt).getTime() - Date.now();
  const minLeft = Math.round(msLeft / 60000);
  if (minLeft < 0) return "SLA Expired";
  if (minLeft > 120) return `${Math.round(minLeft / 60)}h left`;
  return `${minLeft}m left`;
}

const CONSENT_TYPE_LABELS: Record<ConsentType, string> = {
  privacy_data_processing: "Privacy & Data Processing",
  hospital_document_sharing: "Hospital Document Sharing",
  tele_consultation_terms: "Tele-Consultation Terms",
  payment_staged_terms: "Payment Staged Terms",
};

export const CSQueueView: React.FC<CSQueueViewProps> = ({
  cases,
  onSelectCase,
  activeCaseId,
  activeTab: controlledTab,
  onSelectTab: controlledOnSelectTab,
}) => {
  const {
    updateDocumentReviewStatus,
    updateStageWithReason,
    addCsNote,
    sendPortalMessage,
    moveToNurture,
    currentUser,
  } = usePortal();

  const [queueFilter, setQueueFilter] = useState<QueueFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [internalTab, setInternalTab] = useState<CSTab>("overview");
  const activeTab = controlledTab ?? internalTab;
  const setActiveTab = (tab: CSTab) => {
    if (controlledOnSelectTab) {
      controlledOnSelectTab(tab);
    } else {
      setInternalTab(tab);
    }
  };

  // Document review modal
  const [reviewModalDoc, setReviewModalDoc] = useState<{ caseId: string; doc: PatientDocument } | null>(null);
  const [reviewStatus, setReviewStatus] = useState<"reviewed" | "incomplete">("reviewed");
  const [reviewFeedback, setReviewFeedback] = useState("");

  // Stage override
  const [overrideStage, setOverrideStage] = useState<PatientJourneyStage>("lead");
  const [overrideReason, setOverrideReason] = useState("");
  const [showOverrideReason, setShowOverrideReason] = useState(false);
  const [overrideSaved, setOverrideSaved] = useState(false);

  // CS Notes
  const [noteText, setNoteText] = useState("");
  const [noteSaved, setNoteSaved] = useState(false);

  // Messages
  const [messageText, setMessageText] = useState("");

  // Quote Builder
  const [quoteTier, setQuoteTier] = useState<"basic" | "standard" | "premium">("standard");
  const [coordFee, setCoordFee] = useState(500);
  const [travelFee, setTravelFee] = useState(300);
  const [supportFee, setSupportFee] = useState(200);
  const [quoteSent, setQuoteSent] = useState(false);

  // Nurture modal
  const [nurtureModalOpen, setNurtureModalOpen] = useState(false);
  const [nurtureReason, setNurtureReason] = useState<"declined_by_hospital" | "paused_by_patient" | "budget_mismatch" | "not_ready" | "other">("paused_by_patient");
  const [nurtureNotes, setNurtureNotes] = useState("");
  const [nurtureFollowUp, setNurtureFollowUp] = useState("");

  const activeCase = cases.find((c) => c.id === activeCaseId) || cases[0];

  const filteredCases = useMemo(() => {
    let filtered = cases;
    if (queueFilter !== "all") {
      filtered = filtered.filter((c) => c.stage === queueFilter);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (c) => c.id.toLowerCase().includes(q) || c.patientName.toLowerCase().includes(q)
      );
    }
    return filtered;
  }, [cases, queueFilter, searchQuery]);

  const filterCounts = useMemo(() => {
    const counts: Record<string, number> = { all: cases.length };
    cases.forEach((c) => {
      counts[c.stage] = (counts[c.stage] || 0) + 1;
    });
    return counts;
  }, [cases]);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewModalDoc) return;
    updateDocumentReviewStatus(
      reviewModalDoc.caseId,
      reviewModalDoc.doc.id,
      reviewStatus,
      reviewFeedback || (reviewStatus === "reviewed" ? "Approved by CS." : "Please re-upload.")
    );
    setReviewModalDoc(null);
    setReviewFeedback("");
  };

  const handleStageOverride = () => {
    if (!activeCase) return;
    // Determine if skipping stages (simple heuristic: difference in index > 1)
    const currentIdx = ALL_STAGES.indexOf(activeCase.stage);
    const targetIdx = ALL_STAGES.indexOf(overrideStage);
    const isSkipping = targetIdx - currentIdx > 1;
    if (isSkipping && !overrideReason.trim()) {
      setShowOverrideReason(true);
      return;
    }
    updateStageWithReason(activeCase.id, overrideStage, overrideReason || undefined);
    setOverrideSaved(true);
    setShowOverrideReason(false);
    setOverrideReason("");
    setTimeout(() => setOverrideSaved(false), 3000);
  };

  const handleSaveNote = () => {
    if (!noteText.trim() || !activeCase) return;
    addCsNote(activeCase.id, noteText);
    setNoteText("");
    setNoteSaved(true);
    setTimeout(() => setNoteSaved(false), 3000);
  };

  const handleSendMessage = () => {
    if (!messageText.trim() || !activeCase) return;
    sendPortalMessage(activeCase.id, messageText);
    setMessageText("");
  };

  const handleMoveToNurture = () => {
    if (!activeCase) return;
    moveToNurture(activeCase.id, {
      reason: nurtureReason,
      notes: nurtureNotes,
      scheduledFollowUpAt: nurtureFollowUp ? new Date(nurtureFollowUp).toISOString() : undefined,
    });
    setNurtureModalOpen(false);
  };

  const FILTER_TABS: { id: QueueFilter; label: string }[] = [
    { id: "all", label: "All Cases" },
    { id: "lead", label: "New Leads" },
    { id: "contacted", label: "Contacted" },
    { id: "documents_collected", label: "Awaiting Docs" },
    { id: "hospital_handover", label: "Handed to Hospital" },
    { id: "quote", label: "Quote Sent" },
    { id: "booking", label: "Booked" },
    { id: "nurture", label: "Nurture" },
  ];

  const CS_TABS: { id: CSTab; label: string; icon: React.ElementType }[] = [
    { id: "overview", label: "Overview", icon: Activity },
    { id: "documents", label: "Documents", icon: FileText },
    { id: "consent", label: "Consent", icon: ShieldCheck },
    { id: "notes", label: "Notes", icon: StickyNote },
    { id: "handoff", label: "Handoff", icon: Building2 },
    { id: "quote_builder", label: "Quote Builder", icon: DollarSign },
    { id: "messages", label: "Messages", icon: MessageSquare },
  ];

  const ALL_CONSENT_TYPES: ConsentType[] = [
    "privacy_data_processing",
    "hospital_document_sharing",
    "tele_consultation_terms",
    "payment_staged_terms",
  ];

  return (
    <div className="space-y-5 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#141d60] via-[#1b2360] to-[#101e76] rounded-2xl p-6 sm:p-8 text-white shadow-xl border border-slate-800/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#2ECDC5]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2ECDC5]/15 text-[#2ECDC5] text-xs font-bold tracking-wider uppercase mb-2 border border-[#2ECDC5]/30">
            <Users className="w-3.5 h-3.5" />
            Customer Support Queue Desk
          </div>
          <h2 className="text-2xl font-black tracking-tight text-white">
            International Patient Triage & SLA Monitor
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl">
            Logged in as <strong>{currentUser?.name}</strong> • Queues:{" "}
            {currentUser?.assignedQueues?.join(", ") || "Global Queue"}. Clinical fields are read-only per RBAC.
          </p>
        </div>
        <div className="relative z-10 flex items-center gap-3 bg-white/10 px-4 py-2.5 rounded-2xl backdrop-blur-md border border-white/15 text-xs font-bold text-slate-200">
          <Clock className="w-4 h-4 text-[#2ECDC5]" />
          <span>Tier-1 SLA Target: &lt; 45m</span>
        </div>
      </div>

      {/* Queue Filter Tabs */}
      <div className="flex overflow-x-auto gap-1.5 bg-white/95 rounded-2xl p-1.5 border border-slate-200 shadow-sm">
        {FILTER_TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setQueueFilter(tab.id)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${queueFilter === tab.id
              ? "bg-gradient-to-r from-[#3abdb6] to-[#3fc1ba] text-white shadow-sm"
              : "text-slate-600 hover:bg-slate-100"
              }`}
          >
            {tab.label}
            {filterCounts[tab.id === "all" ? "all" : tab.id] > 0 && (
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${queueFilter === tab.id ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
                }`}>
                {filterCounts[tab.id === "all" ? "all" : tab.id] || 0}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search by Patient ID (PT-2026-…) or name…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white border border-slate-200 rounded-2xl pl-10 pr-4 py-3 text-xs text-slate-900 shadow-sm focus:ring-2 focus:ring-[#2ECDC5] focus:outline-none"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Col: Queue Table */}
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-extrabold text-slate-900 text-sm">
              Queue ({filteredCases.length} cases)
            </h3>
            <span className="text-[11px] text-[#3F4EB4] font-bold bg-[#2ECDC5]/10 px-2.5 py-0.5 rounded-full border border-[#2ECDC5]/20">
              Live Feed
            </span>
          </div>
          <div className="divide-y divide-slate-100 max-h-[640px] overflow-y-auto">
            {filteredCases.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400">No cases match this filter.</div>
            ) : (
              filteredCases.map((c) => {
                const isSelected = c.id === activeCaseId;
                const slaColor = getSlaColor(c.slaExpiresAt, c.slaBreached);
                const slaLabel = getSlaLabel(c.slaExpiresAt, c.slaBreached);
                const pendingDocs = c.documents.filter((d) => d.status === "pending_review").length;

                return (
                  <button
                    key={c.id}
                    onClick={() => onSelectCase(c.id)}
                    className={`w-full text-left p-4 transition-all duration-200 cursor-pointer ${isSelected
                      ? "bg-gradient-to-r from-[#071321] to-[#0D2642] text-white"
                      : "hover:bg-slate-50 text-slate-800"
                      }`}
                  >
                    {/* Row: Patient ID + SLA */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-[10px] font-bold text-[#2ECDC5]">{c.id}</span>
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full border ${slaColor}`}>
                        {slaLabel}
                      </span>
                    </div>
                    {/* Patient Name */}
                    <div className="font-black text-sm mt-1 truncate">{c.patientName}</div>
                    {/* Source + Treatment */}
                    <div className={`text-[11px] mt-0.5 truncate ${isSelected ? "text-slate-300" : "text-slate-500"}`}>
                      {c.utmSource || "direct"} · {c.treatmentCategory}
                    </div>
                    {/* Stage + Last contact */}
                    <div className="flex items-center justify-between mt-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isSelected
                        ? "bg-white/20 text-white"
                        : c.stage === "nurture" ? "bg-purple-100 text-purple-800"
                          : "bg-[#2ECDC5]/15 text-[#3F4EB4]"
                        }`}>
                        {STAGE_LABEL_MAP[c.stage] || c.stage}
                      </span>
                      {pendingDocs > 0 && (
                        <span className={`text-[10px] font-bold ${isSelected ? "text-amber-300" : "text-amber-600"}`}>
                          {pendingDocs} doc{pendingDocs > 1 ? "s" : ""} pending
                        </span>
                      )}
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Right 2 Cols: Case Detail Tabs */}
        {activeCase && (
          <div className="lg:col-span-2 space-y-4">
            {/* Case Header + Status Override */}
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-5 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)]">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 flex-wrap">
                <div>
                  <span className="text-xs font-mono font-bold text-[#3F4EB4]">{activeCase.id}</span>
                  <h3 className="text-lg font-black text-slate-900 mt-0.5">{activeCase.patientName}</h3>
                  <div className="text-xs text-slate-500 flex flex-wrap gap-x-3 gap-y-1 mt-0.5">
                    <span>{activeCase.patientCountry}</span>
                    <span>•</span>
                    <span>{activeCase.patientPhone}</span>
                    <span>•</span>
                    <span>{activeCase.patientEmail}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  {/* Manual Stage Override */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-500">Stage:</span>
                    <select
                      value={overrideStage || activeCase.stage}
                      onChange={(e) => {
                        const newStage = e.target.value as PatientJourneyStage;
                        setOverrideStage(newStage);
                        const currentIdx = ALL_STAGES.indexOf(activeCase.stage);
                        const targetIdx = ALL_STAGES.indexOf(newStage);
                        setShowOverrideReason(targetIdx - currentIdx > 1);
                      }}
                      className="bg-white border border-slate-300 text-xs font-extrabold text-slate-900 rounded-xl p-2 shadow-xs focus:ring-2 focus:ring-[#2ECDC5] focus:outline-none cursor-pointer"
                    >
                      {ALL_STAGES.map((s) => (
                        <option key={s} value={s}>{STAGE_LABEL_MAP[s] || s}</option>
                      ))}
                    </select>
                    <button
                      onClick={handleStageOverride}
                      className="px-3 py-2 rounded-xl bg-[#3F4EB4] hover:bg-[#283593] text-white text-xs font-bold transition-all cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                  <button
                    onClick={() => setNurtureModalOpen(true)}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-purple-100 hover:bg-purple-200 text-purple-800 text-xs font-bold transition-all cursor-pointer border border-purple-200"
                  >
                    <Heart className="w-3.5 h-3.5" />
                    Nurture
                  </button>
                </div>
              </div>

              {/* Reason required if skipping */}
              {showOverrideReason && (
                <div className="mt-3 animate-in fade-in">
                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-800 mb-2 flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
                    A reason is required when skipping stages (e.g. going from Lead directly to Booked).
                  </div>
                  <input
                    type="text"
                    placeholder="Reason for skipping stages..."
                    value={overrideReason}
                    onChange={(e) => setOverrideReason(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-[#2ECDC5] focus:outline-none"
                  />
                </div>
              )}
              {overrideSaved && (
                <div className="mt-2 text-xs font-bold text-emerald-700 flex items-center gap-1.5 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4" /> Stage updated with reason logged to audit trail.
                </div>
              )}
            </div>

            {/* Tab Bar */}
            <div className="flex overflow-x-auto gap-1 bg-white/95 rounded-2xl p-1.5 border border-slate-200 shadow-sm">
              {CS_TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${activeTab === tab.id
                    ? "bg-gradient-to-r from-[#3abdb6] to-[#3fc1ba] text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-100"
                    }`}
                >
                  <tab.icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] min-h-[300px]">

              {/* ─── Overview ───────────────────────────────────────── */}
              {activeTab === "overview" && (
                <div className="space-y-5">
                  <h4 className="font-extrabold text-slate-900 text-sm">Case Overview & Status Timeline</h4>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    {[
                      { label: "Source (UTM)", value: activeCase.utmSource || "—" },
                      { label: "Campaign", value: activeCase.utmCampaign || "—" },
                      { label: "Treatment", value: activeCase.treatmentCategory },
                      { label: "Assigned Queue", value: activeCase.assignedQueue },
                      { label: "Coordinator", value: activeCase.assignedCoordinatorName },
                      { label: "Language", value: activeCase.preferredLanguage },
                    ].map((f) => (
                      <div key={f.label} className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{f.label}</div>
                        <div className="font-semibold text-slate-800 truncate">{f.value}</div>
                      </div>
                    ))}
                  </div>

                  <div>
                    <h5 className="font-bold text-slate-900 text-xs mb-3 flex items-center gap-2">
                      <Activity className="w-3.5 h-3.5 text-[#3F4EB4]" />
                      Full Status-Change Timeline
                    </h5>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {[...(activeCase.stageHistory || [])].reverse().map((event, idx) => (
                        <div key={event.id || idx} className="flex items-start gap-3 text-xs">
                          <div className="w-2 h-2 rounded-full bg-[#2ECDC5] mt-1.5 shrink-0" />
                          <div className="flex-1">
                            <div className="font-bold text-slate-900">
                              {event.fromStage ? STAGE_LABEL_MAP[event.fromStage] : "Created"} → {STAGE_LABEL_MAP[event.toStage] || event.toStage}
                            </div>
                            <div className="text-slate-500 mt-0.5">
                              {new Date(event.changedAt).toLocaleString()} · <span className="font-semibold text-slate-700">{event.changedByName}</span> ({event.changedByRole?.replace("_", " ") || "system"})
                              {event.reason && <span className="text-amber-600 ml-1">· Reason: {event.reason}</span>}
                            </div>
                          </div>
                        </div>
                      ))}
                      {(!activeCase.stageHistory || activeCase.stageHistory.length === 0) && (
                        <div className="text-xs text-slate-400">No stage history available.</div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* ─── Documents ──────────────────────────────────────── */}
              {activeTab === "documents" && (
                <div className="space-y-4">
                  <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#3F4EB4]" />
                    Patient Documents — View, Upload & Review
                  </h4>
                  {activeCase.documents.length === 0 ? (
                    <div className="p-8 bg-slate-50 rounded-2xl text-center text-xs text-slate-400 border border-dashed border-slate-200">
                      No documents uploaded yet.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {activeCase.documents.map((doc) => (
                        <div key={doc.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-bold text-xs text-slate-900">{doc.title}</span>
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-200 text-slate-700">v{doc.currentVersion}</span>
                              <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${doc.status === "reviewed" ? "bg-emerald-100 text-emerald-800" :
                                doc.status === "incomplete" ? "bg-rose-100 text-rose-800" :
                                  "bg-amber-100 text-amber-800"
                                }`}>{doc.status}</span>
                            </div>
                            <div className="text-[11px] text-slate-500 mt-0.5">
                              {doc.versions[0]?.fileName} ({doc.versions[0]?.fileSize})
                            </div>
                            {doc.csFeedback && (
                              <div className="text-[11px] text-slate-700 italic mt-1 bg-white p-2 rounded-lg border border-slate-200">
                                Note: {doc.csFeedback}
                              </div>
                            )}
                          </div>
                          <button
                            onClick={() => setReviewModalDoc({ caseId: activeCase.id, doc })}
                            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#2ECDC5] to-[#3F4EB4] text-white font-extrabold text-xs shrink-0 cursor-pointer"
                          >
                            Review / Mark
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-dashed border-slate-200 text-xs text-slate-500 text-center">
                    Upload functionality: patient uploads documents through their portal. CS reviews and marks status here.
                  </div>
                </div>
              )}

              {/* ─── Consent ────────────────────────────────────────── */}
              {activeTab === "consent" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#3F4EB4]" />
                      Consent Records — All 4 Types
                    </h4>
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                      Append-Only — Past records immutable
                    </span>
                  </div>
                  <div className="space-y-3">
                    {ALL_CONSENT_TYPES.map((ctype) => {
                      const obtained = activeCase.consents.filter((c) => c.consentType === ctype);
                      return (
                        <div key={ctype} className={`p-4 rounded-2xl border ${obtained.length > 0 ? "bg-emerald-50 border-emerald-200" : "bg-slate-50 border-slate-200"}`}>
                          <div className="flex items-center justify-between gap-2 flex-wrap">
                            <div className="font-bold text-xs text-slate-900">{CONSENT_TYPE_LABELS[ctype]}</div>
                            <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${obtained.length > 0 ? "bg-emerald-100 text-emerald-800 border border-emerald-200" : "bg-slate-200 text-slate-500"
                              }`}>
                              {obtained.length > 0 ? `✓ ${obtained.length} record${obtained.length > 1 ? "s" : ""}` : "Not yet obtained"}
                            </span>
                          </div>
                          {obtained.map((rec) => (
                            <div key={rec.id} className="mt-2 text-[11px] text-slate-600 space-y-0.5">
                              <div><strong>Signed:</strong> {new Date(rec.timestamp).toLocaleString()}</div>
                              <div><strong>IP:</strong> {rec.ipAddress}</div>
                              <div><strong>Version:</strong> {rec.version}</div>
                              {rec.digitalSignature && <div><strong>Signature:</strong> {rec.digitalSignature}</div>}
                            </div>
                          ))}
                        </div>
                      );
                    })}
                  </div>
                  <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 text-xs text-blue-800 flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5 text-blue-600" />
                    Consent records are append-only. Past records cannot be edited — only new consent events can be logged. Records serve as legal evidence.
                  </div>
                </div>
              )}

              {/* ─── Notes ──────────────────────────────────────────── */}
              {activeTab === "notes" && (
                <div className="space-y-4">
                  <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                    <StickyNote className="w-4 h-4 text-[#3F4EB4]" />
                    CS Agent Notes
                  </h4>
                  <div>
                    <textarea
                      rows={3}
                      placeholder="Add internal CS note (not visible to patient)..."
                      value={noteText}
                      onChange={(e) => setNoteText(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3.5 text-xs text-slate-900 focus:ring-2 focus:ring-[#2ECDC5] focus:outline-none resize-none"
                    />
                    <div className="flex items-center justify-between mt-2">
                      {noteSaved && (
                        <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Note saved
                        </span>
                      )}
                      <div className="ml-auto">
                        <button
                          onClick={handleSaveNote}
                          disabled={!noteText.trim()}
                          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#2ECDC5] to-[#3F4EB4] text-white font-extrabold text-xs disabled:opacity-50 cursor-pointer"
                        >
                          Add Note
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3 max-h-72 overflow-y-auto">
                    {activeCase.csNotes.length === 0 ? (
                      <div className="text-xs text-slate-400 text-center py-4">No notes yet.</div>
                    ) : (
                      activeCase.csNotes.map((note) => (
                        <div key={note.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                          <div className="text-xs text-slate-800 leading-relaxed">{note.text}</div>
                          <div className="text-[11px] text-slate-500 mt-2">
                            {new Date(note.createdAt).toLocaleString()} · <strong>{note.authorName}</strong>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* ─── Handoff ────────────────────────────────────────── */}
              {activeTab === "handoff" && (
                <div className="space-y-4">
                  <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-[#3F4EB4]" />
                    Hospital / Doctor Handoff
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Assigned Hospital</div>
                      <div className="font-bold text-slate-900">{activeCase.assignedHospitalId || "—"}</div>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Assigned Doctor</div>
                      <div className="font-bold text-slate-900">{activeCase.assignedDoctorId || "—"}</div>
                    </div>
                  </div>
                  <div className={`p-4 rounded-2xl border ${activeCase.caseDecisionStatus === "accepted"
                    ? "bg-emerald-50 border-emerald-200"
                    : activeCase.caseDecisionStatus === "declined"
                      ? "bg-rose-50 border-rose-200"
                      : "bg-amber-50 border-amber-200"
                    }`}>
                    <div className="font-bold text-sm text-slate-900">
                      Hospital Decision:{" "}
                      <span className={
                        activeCase.caseDecisionStatus === "accepted" ? "text-emerald-700" :
                          activeCase.caseDecisionStatus === "declined" ? "text-rose-700" :
                            "text-amber-700"
                      }>
                        {activeCase.caseDecisionStatus === "accepted" ? "✓ Accepted" :
                          activeCase.caseDecisionStatus === "declined" ? "✗ Declined" :
                            "⏳ Pending Review"}
                      </span>
                    </div>
                    {activeCase.acceptedAt && (
                      <div className="text-xs text-slate-600 mt-1">
                        Accepted by <strong>{activeCase.acceptedByDoctorName}</strong> on {new Date(activeCase.acceptedAt).toLocaleString()}
                      </div>
                    )}
                    {activeCase.declineReason && (
                      <div className="text-xs text-rose-700 mt-1">
                        Decline Reason: <strong>{activeCase.declineReason}</strong>
                      </div>
                    )}
                  </div>
                  <div className="p-3.5 bg-blue-50 rounded-xl border border-blue-200 text-xs text-blue-800 flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5 text-blue-600" />
                    Hospital assignment is managed by CS. Hospital accept/decline is tracked here for visibility. If declined, move case to Nurture queue using the Nurture button.
                  </div>
                </div>
              )}

              {/* ─── Quote Builder ──────────────────────────────────── */}
              {activeTab === "quote_builder" && (
                <div className="space-y-5">
                  <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-[#3F4EB4]" />
                    Quote Builder — Convert Clinical Plan to Package
                  </h4>
                  {activeCase.clinicalWorkspace ? (
                    <>
                      <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700">
                        <div className="font-bold mb-1">Based on Clinical Workspace by {activeCase.clinicalWorkspace.submittedByDoctorName}:</div>
                        <div>Cost Estimate: <strong>${activeCase.clinicalWorkspace.costEstimateUsd.toLocaleString()}</strong> · LOS: <strong>{activeCase.clinicalWorkspace.expectedStayDays} days</strong></div>
                      </div>

                      {/* Tier Selection */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-2">Package Tier</label>
                        <div className="grid grid-cols-3 gap-2">
                          {(["basic", "standard", "premium"] as const).map((tier) => (
                            <button
                              key={tier}
                              onClick={() => setQuoteTier(tier)}
                              className={`p-3 rounded-xl text-xs font-bold border transition-all cursor-pointer capitalize ${quoteTier === tier
                                ? "bg-gradient-to-r from-[#3abdb6] to-[#3fc1ba] text-white border-transparent"
                                : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                                }`}
                            >
                              {tier}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Coordination/Travel/Support layers */}
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { label: "Coordination Fee (USD)", value: coordFee, setter: setCoordFee },
                          { label: "Travel Assistance (USD)", value: travelFee, setter: setTravelFee },
                          { label: "Support Layer (USD)", value: supportFee, setter: setSupportFee },
                        ].map((f) => (
                          <div key={f.label}>
                            <label className="block text-[10px] font-bold text-slate-600 mb-1">{f.label}</label>
                            <input
                              type="number"
                              value={f.value}
                              onChange={(e) => f.setter(Number(e.target.value))}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900"
                            />
                          </div>
                        ))}
                      </div>

                      {/* Total */}
                      <div className="p-4 bg-gradient-to-r from-[#071321] to-[#0D2642] rounded-2xl text-white">
                        <div className="text-xs text-slate-400">Total Package ({quoteTier})</div>
                        <div className="text-2xl font-black text-[#2ECDC5] mt-1">
                          ${(activeCase.clinicalWorkspace.costEstimateUsd + coordFee + travelFee + supportFee).toLocaleString()} USD
                        </div>
                      </div>

                      <button
                        onClick={() => { setQuoteSent(true); setTimeout(() => setQuoteSent(false), 3000); }}
                        className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#2ECDC5] to-[#3F4EB4] text-white font-extrabold text-sm flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Send className="w-4 h-4" />
                        {quoteSent ? "✓ Quote Sent to Patient!" : "Send Quote to Patient"}
                      </button>
                    </>
                  ) : (
                    <div className="p-8 bg-slate-50 rounded-2xl text-center text-xs text-slate-400 border border-dashed border-slate-200">
                      Clinical Workspace not yet submitted by the hospital doctor. Once the doctor saves their cost estimate and suitability, you can build the package quote here.
                    </div>
                  )}
                </div>
              )}

              {/* ─── Messages ───────────────────────────────────────── */}
              {activeTab === "messages" && (
                <div className="space-y-4">
                  <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-[#3F4EB4]" />
                    Patient-Facing Message Thread
                  </h4>
                  <div className="space-y-3 max-h-80 overflow-y-auto">
                    {activeCase.messages.length === 0 ? (
                      <div className="text-xs text-slate-400 text-center py-4">No messages yet.</div>
                    ) : (
                      activeCase.messages.map((msg) => {
                        const isCS = msg.senderRole === "cs_coordinator";
                        return (
                          <div key={msg.id} className={`flex ${isCS ? "justify-end" : "justify-start"}`}>
                            <div className={`max-w-[80%] p-3.5 rounded-2xl text-xs ${isCS
                              ? "bg-gradient-to-r from-[#3abdb6] to-[#3fc1ba] text-white"
                              : "bg-slate-100 text-slate-900"
                              }`}>
                              <div className="font-bold mb-1">{msg.senderName}</div>
                              <div className="leading-relaxed">{msg.text}</div>
                              <div className={`text-[10px] mt-1.5 ${isCS ? "text-white/70" : "text-slate-400"}`}>
                                {typeof msg.timestamp === "string" && msg.timestamp.includes("T")
                                  ? new Date(msg.timestamp).toLocaleString()
                                  : msg.timestamp}
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                  <div className="flex gap-2 pt-2 border-t border-slate-100">
                    <input
                      type="text"
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                      placeholder="Type message to patient..."
                      className="flex-1 bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:ring-2 focus:ring-[#2ECDC5] focus:outline-none"
                    />
                    <button
                      onClick={handleSendMessage}
                      className="px-4 py-3 rounded-xl bg-gradient-to-r from-[#2ECDC5] to-[#3F4EB4] text-white font-bold text-xs cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Nurture Queue Panel */}
      {queueFilter === "nurture" && cases.filter((c) => c.stage === "nurture").length > 0 && (
        <div className="bg-purple-50 border border-purple-200 rounded-2xl p-5 space-y-3">
          <h4 className="font-extrabold text-purple-900 text-sm flex items-center gap-2">
            <Heart className="w-4 h-4 text-purple-600" />
            Nurture Queue — Declined / Paused Cases for Follow-Up
          </h4>
          <p className="text-xs text-purple-700">
            These cases are not treated as closed/lost. Scheduled follow-ups ensure patients are re-engaged when ready.
          </p>
          {cases.filter((c) => c.stage === "nurture").map((c) => (
            <div key={c.id} className="p-4 bg-white rounded-2xl border border-purple-200">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div>
                  <span className="font-mono text-[10px] font-bold text-purple-600">{c.id}</span>
                  <div className="font-black text-sm text-slate-900">{c.patientName}</div>
                  {c.nurtureEntry && (
                    <div className="text-xs text-slate-600 mt-0.5">
                      Reason: <strong>{c.nurtureEntry.reason.replace(/_/g, " ")}</strong>
                      {c.nurtureEntry.scheduledFollowUpAt && (
                        <> · Follow-up: <strong>{new Date(c.nurtureEntry.scheduledFollowUpAt).toLocaleDateString()}</strong></>
                      )}
                    </div>
                  )}
                  {c.declineReason && (
                    <div className="text-xs text-rose-700 mt-0.5">Hospital decline reason: {c.declineReason}</div>
                  )}
                </div>
                <button
                  onClick={() => onSelectCase(c.id)}
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold cursor-pointer"
                >
                  View Case
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Document Review Modal */}
      {reviewModalDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 space-y-5">
            <h3 className="text-lg font-black text-slate-900">Review: {reviewModalDoc.doc.title}</h3>
            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Set Status</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { val: "reviewed", label: "Mark Reviewed & Verified" },
                    { val: "incomplete", label: "Mark Incomplete / Missing" },
                  ].map((opt) => (
                    <button
                      key={opt.val}
                      type="button"
                      onClick={() => setReviewStatus(opt.val as "reviewed" | "incomplete")}
                      className={`py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${reviewStatus === opt.val
                        ? opt.val === "reviewed" ? "bg-emerald-600 text-white border-emerald-600" : "bg-rose-600 text-white border-rose-600"
                        : "bg-slate-50 text-slate-700 border-slate-200"
                        }`}
                    >{opt.label}</button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Note for Patient</label>
                <textarea
                  rows={3}
                  placeholder={reviewStatus === "incomplete" ? "e.g. Please re-upload full DICOM slices..." : "Verified scan resolution..."}
                  value={reviewFeedback}
                  onChange={(e) => setReviewFeedback(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setReviewModalDoc(null)} className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs cursor-pointer">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs cursor-pointer">Save Review</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Nurture Modal */}
      {nurtureModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-5">
            <h3 className="text-lg font-black text-slate-900">Move to Nurture Queue</h3>
            <p className="text-xs text-slate-600">This case will be surfaced for scheduled follow-up rather than treated as closed/lost.</p>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Nurture Reason</label>
              <select
                value={nurtureReason}
                onChange={(e) => setNurtureReason(e.target.value as typeof nurtureReason)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 cursor-pointer"
              >
                <option value="declined_by_hospital">Declined by Hospital</option>
                <option value="paused_by_patient">Paused by Patient</option>
                <option value="budget_mismatch">Budget Mismatch</option>
                <option value="not_ready">Patient Not Ready</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Notes</label>
              <textarea
                rows={3}
                value={nurtureNotes}
                onChange={(e) => setNurtureNotes(e.target.value)}
                placeholder="Additional context for nurture follow-up..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Scheduled Follow-Up Date</label>
              <input
                type="date"
                value={nurtureFollowUp}
                onChange={(e) => setNurtureFollowUp(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900"
              />
            </div>
            <div className="flex gap-2 justify-end">
              <button onClick={() => setNurtureModalOpen(false)} className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs cursor-pointer">Cancel</button>
              <button onClick={handleMoveToNurture} className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs cursor-pointer">
                Move to Nurture
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
