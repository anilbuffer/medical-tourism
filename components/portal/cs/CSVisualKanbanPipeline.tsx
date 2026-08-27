"use client";

import React, { useState, useMemo } from "react";
import { PatientCase, PatientJourneyStage } from "@/types/portal";
import {
  Search,
  LayoutGrid,
  List,
  Plus,
  Phone,
  MessageSquare,
  ClipboardList,
  ChevronRight,
  Clock,
  Building2,
  Plane,
  DollarSign,
  AlertTriangle,
  CheckCircle2,
  FileText,
  User,
  ArrowRight,
} from "lucide-react";

interface CSVisualKanbanPipelineProps {
  cases: PatientCase[];
  onSelectCase: (caseId: string) => void;
  onOpenCallModal?: (patient: PatientCase) => void;
  onOpenWhatsAppModal?: (patient: PatientCase) => void;
  onOpenLogContactModal?: (patient: PatientCase) => void;
  onOpenNewIntake?: () => void;
}

type IntakeSourceFilter = "all" | "direct" | "hospital" | "vip";
type PipelineViewMode = "board" | "list";

interface KanbanColumnDef {
  id: string;
  title: string;
  stageKeys: PatientJourneyStage[];
  color: string;
  badgeBg: string;
  borderColor: string;
}

const KANBAN_COLUMNS: KanbanColumnDef[] = [
  {
    id: "intake_received",
    title: "1. INTAKE RECEIVED",
    stageKeys: ["lead"],
    color: "text-blue-700",
    badgeBg: "bg-blue-100 text-blue-800",
    borderColor: "border-t-blue-500",
  },
  {
    id: "clinical_triage",
    title: "2. CLINICAL TRIAGE",
    stageKeys: ["contacted", "documents_collected"],
    color: "text-purple-700",
    badgeBg: "bg-purple-100 text-purple-800",
    borderColor: "border-t-purple-500",
  },
  {
    id: "hospital_review",
    title: "3. HOSPITAL REVIEW",
    stageKeys: ["hospital_handover", "consultation"],
    color: "text-amber-700",
    badgeBg: "bg-amber-100 text-amber-800",
    borderColor: "border-t-amber-500",
  },
  {
    id: "quote_sent",
    title: "4. QUOTE SENT",
    stageKeys: ["quote", "payment"],
    color: "text-teal-700",
    badgeBg: "bg-teal-100 text-teal-800",
    borderColor: "border-t-teal-500",
  },
  {
    id: "booked_visas",
    title: "5. BOOKED & VISAS",
    stageKeys: ["booking", "treatment", "followup"],
    color: "text-emerald-700",
    badgeBg: "bg-emerald-100 text-emerald-800",
    borderColor: "border-t-emerald-500",
  },
];

function getCountryFlag(country?: string) {
  if (!country) return "🌐";
  if (country.includes("United Kingdom") || country.includes("UK")) return "🇬🇧";
  if (country.includes("United Arab Emirates") || country.includes("UAE") || country.includes("Dubai")) return "🇦🇪";
  if (country.includes("United States") || country.includes("USA")) return "🇺🇸";
  if (country.includes("Kenya")) return "🇰🇪";
  if (country.includes("Canada")) return "🇨🇦";
  if (country.includes("China")) return "🇨🇳";
  if (country.includes("India")) return "🇮🇳";
  return "🌐";
}

export const CSVisualKanbanPipeline: React.FC<CSVisualKanbanPipelineProps> = ({
  cases,
  onSelectCase,
  onOpenCallModal,
  onOpenWhatsAppModal,
  onOpenLogContactModal,
  onOpenNewIntake,
}) => {
  const [sourceFilter, setSourceFilter] = useState<IntakeSourceFilter>("all");
  const [viewMode, setViewMode] = useState<PipelineViewMode>("board");
  const [searchQuery, setSearchQuery] = useState("");

  // Filtered dataset
  const filteredCases = useMemo(() => {
    let list = cases;

    if (sourceFilter === "direct") {
      list = list.filter((c) => c.entryPath === "general_enquiry" || !c.entryPath);
    } else if (sourceFilter === "hospital") {
      list = list.filter((c) => c.entryPath === "hospital_referred" || c.entryPath === "doctor_referred");
    } else if (sourceFilter === "vip") {
      list = list.filter((c) => c.utmSource?.includes("vip") || c.utmSource?.includes("concierge"));
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (c) =>
          c.patientName.toLowerCase().includes(q) ||
          c.id.toLowerCase().includes(q) ||
          c.treatmentCategory.toLowerCase().includes(q) ||
          c.patientCountry.toLowerCase().includes(q)
      );
    }

    return list;
  }, [cases, sourceFilter, searchQuery]);

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* ========================================================================= */}
      {/* FILTER TOOLBAR                                                            */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-100 shadow-sm shadow-slate-100/50 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        {/* Left: Stage Source Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none w-full lg:w-auto">
          {[
            { id: "all", label: "All Intakes" },
            { id: "direct", label: "Direct Inquiries" },
            { id: "hospital", label: "Hospital Referred" },
            { id: "vip", label: "VIP Concierge" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSourceFilter(tab.id as any)}
              className={`px-3.5 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                sourceFilter === tab.id
                  ? "bg-[#101955] text-white shadow-xs"
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/80"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Right: Search + View Switcher + Quick Add */}
        <div className="flex items-center gap-2.5 w-full lg:w-auto justify-between lg:justify-end flex-wrap">
          {/* Search Box */}
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Filter pipeline..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-[#2ECDC5] focus:outline-none"
            />
          </div>

          {/* View Switcher: Board vs List */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setViewMode("board")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === "board"
                  ? "bg-[#101955] text-white shadow-2xs font-extrabold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Board View</span>
            </button>

            <button
              onClick={() => setViewMode("list")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === "list"
                  ? "bg-[#101955] text-white shadow-2xs font-extrabold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>List View</span>
            </button>
          </div>

          {/* New Intake Action */}
          {onOpenNewIntake && (
            <button
              onClick={onOpenNewIntake}
              className="px-4 py-2 rounded-xl bg-[#2ECDC5] hover:bg-[#20bdb5] text-slate-950 font-black text-xs flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
              <span>New Lead</span>
            </button>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 5-COLUMN KANBAN BOARD VIEW                                                */}
      {/* ========================================================================= */}
      {viewMode === "board" ? (
        <div className="overflow-x-auto pb-6 scrollbar-thin">
          <div className="flex gap-4 min-w-[1200px] items-start">
            {KANBAN_COLUMNS.map((col) => {
              const colCases = filteredCases.filter((c) => col.stageKeys.includes(c.stage));

              return (
                <div
                  key={col.id}
                  className={`flex-1 bg-white rounded-3xl p-4 border border-slate-100 shadow-sm shadow-slate-100/50 border-t-4 ${col.borderColor}`}
                >
                  {/* Column Header */}
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                    <span className="font-black text-xs text-slate-900 uppercase tracking-wider">
                      {col.title} ({colCases.length})
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${col.badgeBg}`}>
                      {colCases.length}
                    </span>
                  </div>

                  {/* Cards Stack */}
                  <div className="space-y-3 min-h-[450px]">
                    {colCases.length === 0 ? (
                      <div className="p-6 text-center text-xs text-slate-400 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
                        No active cases
                      </div>
                    ) : (
                      colCases.map((c) => {
                        const totalDocs = c.documents?.length || 0;
                        const reviewedDocs = c.documents?.filter((d) => d.status === "reviewed").length || 0;
                        const hasIncomplete = c.documents?.some((d) => d.status === "incomplete");
                        const isOverdue = c.slaBreached;

                        return (
                          <div
                            key={c.id}
                            onClick={() => onSelectCase(c.id)}
                            className="bg-white rounded-2xl p-4 border border-slate-100 shadow-2xs hover:shadow-md hover:border-[#2ECDC5] transition-all cursor-pointer space-y-3 group"
                          >
                            {/* Top: Patient Name & Flag */}
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <div className="font-black text-sm text-slate-900 group-hover:text-[#101955] transition-colors flex items-center gap-1.5">
                                  <span>👤 {c.patientName}</span>
                                </div>
                                <div className="text-xs text-slate-500 font-medium mt-0.5 flex items-center gap-1">
                                  <span>{getCountryFlag(c.patientCountry)} {c.patientCountry}</span>
                                  <span>•</span>
                                  <span className="truncate max-w-[120px]">{c.treatmentCategory.split("&")[0]}</span>
                                </div>
                              </div>
                              <span className="font-mono text-[9px] font-bold text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-200">
                                {c.id}
                              </span>
                            </div>

                            {/* Tag: Docs status & Stage Tag */}
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-bold font-mono border border-slate-200">
                                🏷️ [ {reviewedDocs}/{Math.max(totalDocs, 2)} Docs ]
                              </span>

                              {isOverdue && (
                                <span className="px-2 py-0.5 rounded-md bg-rose-100 text-rose-800 text-[10px] font-black animate-pulse flex items-center gap-1">
                                  <AlertTriangle className="w-3 h-3" />
                                  <span>⚠️ Action Overdue</span>
                                </span>
                              )}

                              {!isOverdue && hasIncomplete && (
                                <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 text-[10px] font-black">
                                  🟡 Missing Serology/Scans
                                </span>
                              )}

                              {!isOverdue && !hasIncomplete && c.stage === "hospital_handover" && (
                                <span className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 text-[10px] font-bold">
                                  🏥 Medanta (Dr. Gupta)
                                </span>
                              )}

                              {c.quote?.totalCostUsd && (c.stage === "quote" || c.stage === "payment") && (
                                <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-black">
                                  💰 ${c.quote.totalCostUsd.toLocaleString()} USD
                                </span>
                              )}
                            </div>

                            {/* Coordinator & Quick Actions Bar */}
                            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 gap-2">
                              <div className="flex items-center gap-1 font-medium truncate">
                                <User className="w-3 h-3 text-slate-400 shrink-0" />
                                <span className="truncate">{c.assignedCoordinatorName || "Aisha"}</span>
                              </div>

                              <div className="flex items-center gap-1.5 shrink-0">
                                {onOpenCallModal && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      onOpenCallModal(c);
                                    }}
                                    className="p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200"
                                    title="Call"
                                  >
                                    <Phone className="w-3 h-3" />
                                  </button>
                                )}
                                {onOpenWhatsAppModal && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      onOpenWhatsAppModal(c);
                                    }}
                                    className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200"
                                    title="WhatsApp"
                                  >
                                    <MessageSquare className="w-3 h-3" />
                                  </button>
                                )}
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onSelectCase(c.id);
                                  }}
                                  className="px-2.5 py-1 rounded-lg bg-[#101955] hover:bg-[#1a2670] text-white font-extrabold text-[10px] flex items-center gap-1 shadow-2xs group/btn"
                                >
                                  <span>View Case</span>
                                  <ArrowRight className="w-3 h-3 text-[#2ECDC5] group-hover/btn:translate-x-0.5 transition-transform" />
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* ========================================================================= */
        /* LIST VIEW FALLBACK                                                        */
        /* ========================================================================= */
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="divide-y divide-slate-100">
            {filteredCases.map((c) => (
              <div
                key={c.id}
                onClick={() => onSelectCase(c.id)}
                className="p-4 sm:p-5 hover:bg-slate-50/80 transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-slate-100 flex items-center justify-center font-black text-sm text-slate-700 group-hover:bg-[#101955] group-hover:text-white transition-colors">
                    {getCountryFlag(c.patientCountry)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-sm text-slate-900 group-hover:text-[#101955]">
                        {c.patientName}
                      </span>
                      <span className="font-mono text-xs text-slate-400">{c.id}</span>
                      <span className="text-xs text-slate-500 font-medium">({c.patientCountry})</span>
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">{c.treatmentCategory}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-auto">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-800">
                    {c.stage.replace(/_/g, " ").toUpperCase()}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectCase(c.id);
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-[#101955] hover:bg-[#1a2670] text-white font-extrabold text-xs flex items-center gap-1 group/btn"
                  >
                    <span>View Case</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#2ECDC5] group-hover/btn:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
