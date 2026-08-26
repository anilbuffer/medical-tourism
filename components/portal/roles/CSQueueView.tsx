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
  X,
  Activity,
  StickyNote,
  Heart,
  DollarSign,
  ChevronDown,
  Inbox,
  RotateCcw,
} from "lucide-react";

export type CSTab = "overview" | "intake" | "documents" | "consent" | "notes" | "handoff" | "quote_builder" | "messages";
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
    bulkAssignCases,
    bulkUpdateStage,
    bulkSendMessage,
    currentUser,
  } = usePortal();

  const [queueFilter, setQueueFilter] = useState<QueueFilter>("all");
  const [coordinatorFilter, setCoordinatorFilter] = useState<"my_queue" | "team_queue" | "unassigned">("my_queue");
  const [viewMode, setViewMode] = useState<"list" | "board">("list");
  const [selectedCases, setSelectedCases] = useState<string[]>([]);
  const [showBulkMessage, setShowBulkMessage] = useState(false);
  const [bulkMessageText, setBulkMessageText] = useState("");

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
    if (coordinatorFilter === "my_queue" && currentUser?.name) {
      filtered = filtered.filter((c) => c.assignedCoordinatorName === currentUser.name);
    } else if (coordinatorFilter === "unassigned") {
      filtered = filtered.filter((c) => !c.assignedCoordinatorName);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (c) => c.id.toLowerCase().includes(q) || c.patientName.toLowerCase().includes(q)
      );
    }
    return filtered;
  }, [cases, queueFilter, coordinatorFilter, searchQuery, currentUser]);

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
    { id: "intake", label: "Intake", icon: FileText },
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
      <div className="bg-[#101955] rounded-[24px] p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative overflow-hidden mb-6">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1e2a78] text-[#2ECDC5] text-xs font-bold tracking-wider uppercase mb-4 border border-[#2a3891]">
            <Users className="w-4 h-4" />
            Customer Support Queue Desk
          </div>
          <h2 className="text-[28px] font-bold tracking-tight text-white mb-2">
            International Patient Triage & SLA Monitor
          </h2>
          <p className="text-slate-300 text-sm max-w-2xl">
            Logged in as <strong>{currentUser?.name}</strong> • Queues:{" "}
            {currentUser?.assignedQueues?.join(", ") || "Global Queue"}.<br />
            Clinical fields are read-only per RBAC.
          </p>
        </div>
        <div className="relative z-10 flex items-center gap-3 bg-white/10 px-5 py-3 rounded-full backdrop-blur-md border border-white/10 text-sm font-bold text-slate-200">
          <Clock className="w-4 h-4 text-[#2ECDC5]" />
          <span>Tier-1 SLA Target: &lt; 45m</span>
        </div>
      </div>

      {/* Queue Filter Tabs & View Toggle */}
      <div className="bg-white rounded-[24px] p-5 border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] space-y-5 mb-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex overflow-x-auto gap-2 sm:gap-6 items-center">
            {FILTER_TABS.map((tab) => {
              const isActive = queueFilter === tab.id;
              const count = filterCounts[tab.id === "all" ? "all" : tab.id] || 0;
              const isNurture = tab.id === "nurture";
              
              if (isNurture) {
                return (
                  <button
                    key={tab.id}
                    onClick={() => setQueueFilter(tab.id)}
                    className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${isActive ? "bg-[#2ECDC5] text-white shadow-md" : "bg-[#2ECDC5] text-white hover:bg-[#28b8b0]"}`}
                  >
                    {tab.label}
                  </button>
                );
              }
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setQueueFilter(tab.id)}
                  className={`flex items-center gap-2 text-sm font-bold transition-all whitespace-nowrap cursor-pointer pb-1 border-b-2 ${isActive
                    ? "border-[#2ECDC5] text-slate-900"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                    }`}
                >
                  {tab.label}
                  {count > 0 && tab.id === "all" && (
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold bg-slate-100 text-slate-600`}>
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
          <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-full border border-slate-100">
            <button
              onClick={() => setViewMode("list")}
              className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all cursor-pointer ${viewMode === "list" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
            >
              List View
            </button>
            <button
              onClick={() => setViewMode("board")}
              className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all cursor-pointer ${viewMode === "board" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
            >
              Board View
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="flex overflow-x-auto gap-2 bg-slate-50 p-1 rounded-full border border-slate-100 shrink-0">
            {[
              { id: "my_queue", label: "My Queue" },
              { id: "team_queue", label: "Team Queue" },
              { id: "unassigned", label: "Unassigned" },
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setCoordinatorFilter(f.id as any)}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all cursor-pointer ${coordinatorFilter === f.id ? "bg-[#101955] text-white shadow-md" : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"}`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by Patient ID (PT-2026-…) or name…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-full pl-11 pr-4 py-3 text-sm text-slate-600 focus:ring-2 focus:ring-[#2ECDC5] focus:outline-none placeholder:text-slate-300"
            />
          </div>
        </div>
      </div>

      {/* Bulk Action Bar */}
      {selectedCases.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-3 flex flex-wrap items-center justify-between shadow-sm sticky top-4 z-40 gap-3">
          <div className="text-sm font-bold text-blue-900 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            {selectedCases.length} case{selectedCases.length > 1 ? "s" : ""} selected
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => {
                bulkAssignCases(selectedCases, currentUser?.name || "CS Agent");
                setSelectedCases([]);
              }}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
            >
              Claim (Assign to Me)
            </button>
            <button
              onClick={() => {
                bulkUpdateStage(selectedCases, "nurture");
                setSelectedCases([]);
              }}
              className="px-3 py-1.5 bg-purple-100 hover:bg-purple-200 text-purple-700 text-xs font-bold rounded-lg border border-purple-200 transition-colors cursor-pointer"
            >
              Move to Nurture
            </button>
            <button
              onClick={() => setShowBulkMessage(true)}
              className="px-3 py-1.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 text-xs font-bold rounded-lg border border-emerald-200 transition-colors cursor-pointer"
            >
              Bulk Message
            </button>
            <button
              onClick={() => setSelectedCases([])}
              className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold rounded-lg transition-colors cursor-pointer"
            >
              Clear Selection
            </button>
          </div>
        </div>
      )}

      {viewMode === "board" ? (
        <div className="flex overflow-x-auto gap-4 pb-4 snap-x min-h-[600px] items-start">
          {ALL_STAGES.map((stage) => {
            const stageCases = filteredCases.filter(c => c.stage === stage);
            if (queueFilter !== "all" && queueFilter !== stage) return null;
            return (
              <div key={stage} className="min-w-[320px] w-[320px] bg-slate-100/80 rounded-2xl p-3 flex flex-col snap-start border border-slate-200 shadow-sm"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  const caseId = e.dataTransfer.getData("caseId");
                  if (caseId) {
                    updateStageWithReason(caseId, stage, "Moved via Kanban board");
                  }
                }}
              >
                <div className="font-extrabold text-slate-800 text-sm mb-3 flex items-center justify-between px-1">
                  {STAGE_LABEL_MAP[stage] || stage}
                  <span className="bg-slate-200 text-slate-700 px-2.5 py-0.5 rounded-full text-[10px] font-bold shadow-xs border border-slate-300/50">{stageCases.length}</span>
                </div>
                <div className="flex-1 overflow-y-auto space-y-3 pr-1 max-h-[700px] scrollbar-thin scrollbar-thumb-slate-300">
                  {stageCases.map(c => {
                    const isSelected = selectedCases.includes(c.id);
                    const isGlobalSelected = c.id === activeCaseId;
                    const slaColor = getSlaColor(c.slaExpiresAt, c.slaBreached);
                    const slaLabel = getSlaLabel(c.slaExpiresAt, c.slaBreached);
                    return (
                      <div 
                        key={c.id} 
                        draggable 
                        onDragStart={(e) => e.dataTransfer.setData("caseId", c.id)}
                        className={`bg-white rounded-xl p-3 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border transition-all cursor-pointer ${isGlobalSelected ? "ring-2 ring-[#2ECDC5] border-transparent" : "border-slate-200 hover:border-[#2ECDC5]/50 hover:shadow-md"}`}
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2">
                            <input 
                              type="checkbox" 
                              checked={isSelected} 
                              onChange={(e) => {
                                e.stopPropagation();
                                setSelectedCases(prev => e.target.checked ? [...prev, c.id] : prev.filter(id => id !== c.id));
                              }}
                              className="rounded text-[#2ECDC5] focus:ring-[#2ECDC5] cursor-pointer"
                            />
                            <span className="font-mono text-[10px] font-bold text-[#3F4EB4] bg-[#3F4EB4]/5 px-1.5 py-0.5 rounded-md">{c.id}</span>
                          </div>
                          <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${slaColor}`}>
                            {slaLabel}
                          </span>
                        </div>
                        <div className="font-black text-sm text-slate-900 truncate" onClick={() => onSelectCase(c.id)}>{c.patientName}</div>
                        <div className="text-[10px] text-slate-500 mt-1 truncate" onClick={() => onSelectCase(c.id)}>{c.utmSource || "direct"} · {c.treatmentCategory}</div>
                        <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-100" onClick={() => onSelectCase(c.id)}>
                          <div className="flex items-center gap-1.5 max-w-[70%]">
                            <div className="w-4 h-4 rounded-full bg-slate-200 flex items-center justify-center text-[8px] font-bold text-slate-600 shrink-0">
                              {(c.assignedCoordinatorName || "U")[0]}
                            </div>
                            <span className="text-[9px] font-bold text-slate-600 truncate">
                              {c.assignedCoordinatorName || "Unassigned"}
                            </span>
                          </div>
                          <button className="text-[10px] text-[#2ECDC5] font-bold group flex items-center gap-0.5">
                            View <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                  {stageCases.length === 0 && (
                    <div className="text-center py-6 text-xs text-slate-400 border-2 border-dashed border-slate-200 rounded-xl">
                      Drop case here
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-[24px] border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col mb-6">
          {/* List Header */}
          <div className="p-5 border-b border-slate-50 flex items-center justify-between shrink-0 bg-slate-50/50">
            <div className="flex items-center gap-3">
              <input 
                type="checkbox" 
                checked={filteredCases.length > 0 && selectedCases.length === filteredCases.length}
                onChange={(e) => setSelectedCases(e.target.checked ? filteredCases.map(c => c.id) : [])}
                className="rounded text-[#2ECDC5] focus:ring-[#2ECDC5] cursor-pointer w-4 h-4"
              />
              <h3 className="font-bold text-slate-900 text-[15px]">
                Scheduled Shifts List ({filteredCases.length})
              </h3>
            </div>
            <span className="text-[11px] text-[#2ECDC5] font-bold bg-[#2ECDC5]/10 px-3 py-1 rounded-full border border-[#2ECDC5]/20">
              Live Feed
            </span>
          </div>
          
          {/* Table Container */}
          <div className="w-full overflow-x-auto min-h-[500px]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 text-[10px] uppercase font-bold text-slate-500 tracking-wider border-b border-slate-100">
                  <th className="py-4 pl-5 pr-4 w-12"></th>
                  <th className="py-4 px-4 whitespace-nowrap cursor-pointer hover:text-slate-700">DATE &amp; TIME ↑↓</th>
                  <th className="py-4 px-4 whitespace-nowrap cursor-pointer hover:text-slate-700">PATIENT ↑↓</th>
                  <th className="py-4 px-4 whitespace-nowrap cursor-pointer hover:text-slate-700">CAREGIVER ↑↓</th>
                  <th className="py-4 px-4 whitespace-nowrap cursor-pointer hover:text-slate-700">STATUS ↑↓</th>
                  <th className="py-4 px-4 whitespace-nowrap cursor-pointer hover:text-slate-700">REGION ↑↓</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredCases.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-sm text-slate-400">No cases match this filter.</td>
                  </tr>
                ) : (
                  filteredCases.map((c) => {
                    const isSelected = selectedCases.includes(c.id);
                    const slaColor = getSlaColor(c.slaExpiresAt, c.slaBreached);
                    const slaLabel = getSlaLabel(c.slaExpiresAt, c.slaBreached);
                    const pendingDocs = c.documents.filter((d) => d.status === "pending_review").length;

                    return (
                      <tr 
                        key={c.id}
                        onClick={() => onSelectCase(c.id)}
                        className={`hover:bg-slate-50 transition-colors cursor-pointer group`}
                      >
                        <td className="py-4 pl-5 pr-4" onClick={e => e.stopPropagation()}>
                          <input 
                            type="checkbox" 
                            checked={isSelected}
                            onChange={(e) => {
                              setSelectedCases(prev => e.target.checked ? [...prev, c.id] : prev.filter(id => id !== c.id));
                            }}
                            className="rounded text-[#2ECDC5] focus:ring-[#2ECDC5] cursor-pointer"
                          />
                        </td>
                        <td className="py-4 px-4 align-top">
                          <div className="flex flex-col gap-1 items-start">
                            <span className="font-mono text-xs font-bold text-[#2ECDC5]">{c.id}</span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${slaColor} whitespace-nowrap`}>
                              {slaLabel}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-4 align-top">
                          <div className="font-black text-sm text-slate-900 group-hover:text-[#2ECDC5] transition-colors">{c.patientName}</div>
                          <div className="text-[11px] text-slate-500 mt-1">{c.utmSource || "direct"} · {c.treatmentCategory}</div>
                        </td>
                        <td className="py-4 px-4 align-top">
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-600 shrink-0">
                              {(c.assignedCoordinatorName || "U")[0]}
                            </div>
                            <span className={`text-xs font-semibold ${c.assignedCoordinatorName ? "text-slate-700" : "text-slate-400 italic"}`}>
                              {c.assignedCoordinatorName || "Unassigned"}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-4 align-top">
                          <div className="flex flex-col gap-1 items-start">
                            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                                c.stage === "nurture" ? "bg-purple-100 text-purple-800"
                                : c.stage === "lead" ? "bg-rose-50 text-rose-700"
                                : c.stage === "contacted" ? "bg-amber-100 text-amber-800"
                                : "bg-emerald-50 text-emerald-700"
                              }`}>
                              {STAGE_LABEL_MAP[c.stage] || c.stage}
                            </span>
                            {pendingDocs > 0 && (
                              <span className="text-[10px] font-bold text-amber-600 mt-1 whitespace-nowrap">
                                {pendingDocs} doc{pendingDocs > 1 ? "s" : ""} pending
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-4 align-top">
                          <div className="text-sm text-slate-600">{c.patientCountry}</div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

      )}

      {/* Case Detail XL Modal Overlay */}
      {activeCase && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-slate-950/40 backdrop-blur-sm animate-in fade-in" onClick={() => onSelectCase("")}>
          <div className="bg-slate-50 w-full max-w-6xl max-h-full rounded-[24px] shadow-2xl flex flex-col overflow-hidden relative" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-6 bg-white border-b border-slate-100 shrink-0">
                <h2 className="text-xl font-bold text-slate-900">Case Details: {activeCase.patientName}</h2>
                <button onClick={() => onSelectCase("")} className="p-2 rounded-full hover:bg-slate-100 text-slate-500 cursor-pointer transition-colors">
                    <X className="w-5 h-5" />
                </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 lg:p-8">
              <div className="space-y-6">
                {/* Case Header + Status Override */}
                <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 flex-wrap">
                <div>
                  <span className="text-xs font-mono font-bold text-[#4B6BFB]">{activeCase.id}</span>
                  <h3 className="text-2xl font-bold text-slate-900 mt-1">{activeCase.patientName}</h3>
                  <div className="text-sm text-slate-500 flex flex-wrap gap-x-4 gap-y-2 mt-2 font-medium">
                    <span>{activeCase.patientCountry}</span>
                    <span className="text-slate-300">•</span>
                    <span>{activeCase.patientPhone}</span>
                    <span className="text-slate-300">•</span>
                    <span>{activeCase.patientEmail}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-wrap mt-4 sm:mt-0">
                  {/* Manual Stage Override */}
                  <div className="flex items-center gap-3 bg-slate-50 p-1.5 rounded-full border border-slate-100">
                    <span className="text-sm font-bold text-slate-500 pl-3">Stage:</span>
                    <select
                      value={overrideStage || activeCase.stage}
                      onChange={(e) => {
                        const newStage = e.target.value as PatientJourneyStage;
                        setOverrideStage(newStage);
                        const currentIdx = ALL_STAGES.indexOf(activeCase.stage);
                        const targetIdx = ALL_STAGES.indexOf(newStage);
                        setShowOverrideReason(targetIdx - currentIdx > 1);
                      }}
                      className="bg-white border border-slate-200 text-sm font-bold text-slate-900 rounded-full py-1.5 px-4 shadow-sm focus:ring-2 focus:ring-[#4B6BFB] focus:outline-none cursor-pointer"
                    >
                      {ALL_STAGES.map((s) => (
                        <option key={s} value={s}>{STAGE_LABEL_MAP[s] || s}</option>
                      ))}
                    </select>
                    <button
                      onClick={handleStageOverride}
                      className="px-5 py-1.5 rounded-full bg-[#4B6BFB] hover:bg-[#3A56D4] text-white text-sm font-bold transition-all cursor-pointer shadow-md"
                    >
                      Apply
                    </button>
                  </div>
                  <button
                    onClick={() => setNurtureModalOpen(true)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-purple-50 hover:bg-purple-100 text-purple-700 text-sm font-bold transition-all cursor-pointer border border-purple-100"
                  >
                    <Heart className="w-4 h-4" />
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
            <div className="flex overflow-x-auto gap-2 bg-white rounded-2xl p-2 border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
              {CS_TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${activeTab === tab.id
                    ? "bg-[#2ECDC5] text-white shadow-md"
                    : "text-slate-600 hover:bg-slate-50"
                    }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] min-h-[300px]">

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
                              {new Date(event.changedAt).toLocaleString("en-US")} · <span className="font-semibold text-slate-700">{event.changedByName}</span> ({event.changedByRole?.replace("_", " ") || "system"})
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

              {/* ─── Intake ───────────────────────────────────────── */}
              {activeTab === "intake" && (
                <div className="space-y-5 animate-in fade-in duration-300">
                  <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#3F4EB4]" />
                    Raw Intake Form Data
                  </h4>
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4 text-xs">
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Patient Message / Chief Complaint</div>
                      <div className="font-medium text-slate-800 bg-white p-3 rounded-xl border border-slate-200 leading-relaxed min-h-[60px]">
                        {activeCase.clinicalSummary?.chiefComplaint || "No message provided."}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Preferred Contact Time</div>
                        <div className="font-semibold text-slate-800">{activeCase.preferredContactTime || "—"}</div>
                      </div>
                      <div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Entry Path</div>
                        <div className="font-semibold text-slate-800 capitalize">{activeCase.entryPath?.replace(/_/g, " ") || "—"}</div>
                      </div>
                      <div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Referred Hospital</div>
                        <div className="font-semibold text-slate-800">{activeCase.referredHospitalId || "—"}</div>
                      </div>
                      <div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Referred Doctor</div>
                        <div className="font-semibold text-slate-800">{activeCase.referredDoctorId || "—"}</div>
                      </div>
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
                              <div><strong>Signed:</strong> {new Date(rec.timestamp).toLocaleString("en-US")}</div>
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
                            {new Date(note.createdAt).toLocaleString("en-US")} · <strong>{note.authorName}</strong>
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
                        Accepted by <strong>{activeCase.acceptedByDoctorName}</strong> on {new Date(activeCase.acceptedAt).toLocaleString("en-US")}
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
                        <div>Cost Estimate: <strong>${activeCase.clinicalWorkspace.costEstimateUsd.toLocaleString("en-US")}</strong> · LOS: <strong>{activeCase.clinicalWorkspace.expectedStayDays} days</strong></div>
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
                          ${(activeCase.clinicalWorkspace.costEstimateUsd + coordFee + travelFee + supportFee).toLocaleString("en-US")} USD
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
                                  ? new Date(msg.timestamp).toLocaleString("en-US")
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
            </div>
          </div>
        </div>
      )}

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
                        <> · Follow-up: <strong>{new Date(c.nurtureEntry.scheduledFollowUpAt).toLocaleDateString("en-US")}</strong></>
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

      {/* Bulk Message Modal */}
      {showBulkMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-5">
            <h3 className="text-lg font-black text-slate-900">Send Bulk Message</h3>
            <p className="text-xs text-slate-600">This message will be sent to {selectedCases.length} patient(s).</p>
            <textarea
              rows={4}
              value={bulkMessageText}
              onChange={(e) => setBulkMessageText(e.target.value)}
              placeholder="Type your message here..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:ring-2 focus:ring-[#2ECDC5] focus:outline-none"
            />
            <div className="flex gap-2 justify-end">
              <button onClick={() => setShowBulkMessage(false)} className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs cursor-pointer">Cancel</button>
              <button 
                onClick={() => {
                  bulkSendMessage(selectedCases, bulkMessageText);
                  setShowBulkMessage(false);
                  setSelectedCases([]);
                  setBulkMessageText("");
                }} 
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs cursor-pointer"
                disabled={!bulkMessageText.trim()}
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
