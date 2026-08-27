"use client";

import React, { useState, useMemo, useEffect } from "react";
import { PatientCase, PatientJourneyStage } from "@/types/portal";
import { usePortal } from "@/lib/portal/store";
import { CSVisualKanbanPipeline } from "../cs/CSVisualKanbanPipeline";
import { CSMasterPatientDirectory } from "../cs/CSMasterPatientDirectory";
import { CSHospitalHandoversTable } from "../cs/CSHospitalHandoversTable";
import { CSTeleConsultationsTable } from "../cs/CSTeleConsultationsTable";
import { CSQuoteLedgerTable } from "../cs/CSQuoteLedgerTable";
import { CSVisasFlightsTable } from "../cs/CSVisasFlightsTable";
import { CSConciergeTable } from "../cs/CSConciergeTable";
import { CSDocumentVaultTable } from "../cs/CSDocumentVaultTable";
import { CSConsentsAuditTable } from "../cs/CSConsentsAuditTable";
import { CSPatientDetailsView, PatientDetailsSubTab } from "../cs/CSPatientDetailsView";
import { CSCallDialerModal } from "../cs/CSCallDialerModal";
import { CSLogContactModal } from "../cs/CSLogContactModal";
import { CSReassignConsultModal } from "../cs/CSReassignConsultModal";
import { VideoConsultationSDKModal } from "../modals/VideoConsultationSDKModal";
import { WhatsAppContactModal } from "../modals/WhatsAppContactModal";
import { PublicIntakeModal } from "../PublicIntakeModal";
import {
  Users,
  Clock,
  CheckCircle2,
  FileText,
  Building2,
  ShieldCheck,
  MessageSquare,
  Search,
  AlertTriangle,
  Heart,
  DollarSign,
  Video,
  Plane,
  Sparkles,
  Phone,
  Layers,
  ArrowRight,
  TrendingUp,
  Calendar,
  Hourglass,
  Timer,
  ChevronRight,
  UserCheck,
  RotateCcw,
  Zap,
} from "lucide-react";

export type CSTab =
  | "triage_queues"
  | "kanban_pipeline"
  | "patient_directory"
  | "raw_intake"
  | "master_cases"
  | "hospital_handovers"
  | "tele_consultations"
  | "quote_builder"
  | "visas_flights"
  | "concierge_hospitality"
  | "patient_messages"
  | "document_vault"
  | "consents_compliance";

export type CSViewMode =
  | "dashboard"
  | "kanban"
  | "directory"
  | "hospital_handovers"
  | "tele_consultations"
  | "quote_builder"
  | "visas_flights"
  | "concierge_hospitality"
  | "document_vault"
  | "consents_compliance"
  | "patient_details";

interface CSQueueViewProps {
  cases: PatientCase[];
  onSelectCase: (caseId: string) => void;
  activeCaseId: string;
  activeTab?: CSTab;
  onSelectTab?: (tab: CSTab) => void;
}

const TAB_TO_LABEL_MAP: Record<string, string> = {
  dashboard: "Dashboard Overview",
  kanban: "Kanban Pipeline",
  directory: "Master Directory",
  hospital_handovers: "Hospital Handovers",
  tele_consultations: "Tele-Consultations",
  quote_builder: "Quote Builder",
  visas_flights: "Visas & Flights",
  concierge_hospitality: "VIP Concierge",
  document_vault: "Document Vault",
  consents_compliance: "Consent Audit",
};

export const CSQueueView: React.FC<CSQueueViewProps> = ({
  cases,
  onSelectCase,
  activeCaseId,
  activeTab: controlledTab,
  onSelectTab: controlledOnSelectTab,
}) => {
  const { currentUser, moveToNurture, allCases, bulkAssignCases } = usePortal();

  // Navigation and view state
  const [viewMode, setViewMode] = useState<CSViewMode>("dashboard");
  const [previousViewMode, setPreviousViewMode] = useState<CSViewMode>("dashboard");
  const [detailsInitialSubTab, setDetailsInitialSubTab] = useState<PatientDetailsSubTab>("intake_overview");

  // Filters for dashboard urgency queue
  const [queueFilter, setQueueFilter] = useState<"all" | "sla_expiring" | "lead" | "documents_collected">("all");
  const [coordinatorFilter, setCoordinatorFilter] = useState<"all" | "my_queue" | "unassigned">("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Base list of cases available for triage in CS Desk
  const baseCases = useMemo(() => {
    return (allCases && allCases.length > 0) ? allCases : (cases || []);
  }, [allCases, cases]);

  // Interactive Modals State
  const [intakeModalOpen, setIntakeModalOpen] = useState(false);
  const [callModalOpen, setCallModalOpen] = useState(false);
  const [selectedCallCase, setSelectedCallCase] = useState<PatientCase | null>(null);
  const [whatsAppModalOpen, setWhatsAppModalOpen] = useState(false);
  const [selectedWhatsAppCase, setSelectedWhatsAppCase] = useState<PatientCase | null>(null);
  const [logContactModalOpen, setLogContactModalOpen] = useState(false);
  const [selectedLogContactCase, setSelectedLogContactCase] = useState<PatientCase | null>(null);
  const [reassignModalOpen, setReassignModalOpen] = useState(false);
  const [selectedConsultationItem, setSelectedConsultationItem] = useState<{
    time: string;
    patientName: string;
    doctorName: string;
    hospital: string;
    caseId?: string;
  } | null>(null);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [selectedVideoCase, setSelectedVideoCase] = useState<PatientCase | null>(null);

  // Nurture modal state
  const [nurtureModalOpen, setNurtureModalOpen] = useState(false);
  const [selectedNurtureCase, setSelectedNurtureCase] = useState<PatientCase | null>(null);
  const [nurtureReason, setNurtureReason] = useState<
    "declined_by_hospital" | "paused_by_patient" | "budget_mismatch" | "not_ready" | "other"
  >("paused_by_patient");
  const [nurtureNotes, setNurtureNotes] = useState("");

  // Find active case
  const activeCase = useMemo(() => {
    return baseCases.find((c) => c.id === activeCaseId) || baseCases[0];
  }, [baseCases, activeCaseId]);

  // Find Tariq Al-Mansoor case for the today's tele-consultation widget
  const tariqCase = useMemo(() => {
    return (
      baseCases.find(
        (c) =>
          c.id === "PT-2026-089412" ||
          c.patientName.toLowerCase().includes("tariq")
      ) || baseCases[0]
    );
  }, [baseCases]);

  // Synchronize when controlled sidebar tab changes
  useEffect(() => {
    if (!controlledTab) return;

    if (controlledTab === "triage_queues" || controlledTab === "raw_intake") {
      setViewMode("dashboard");
    } else if (controlledTab === "kanban_pipeline") {
      setViewMode("kanban");
    } else if (controlledTab === "patient_directory" || controlledTab === "master_cases") {
      setViewMode("directory");
    } else if (controlledTab === "hospital_handovers") {
      setViewMode("hospital_handovers");
    } else if (controlledTab === "tele_consultations") {
      setViewMode("tele_consultations");
    } else if (controlledTab === "quote_builder") {
      setViewMode("quote_builder");
    } else if (controlledTab === "visas_flights") {
      setViewMode("visas_flights");
    } else if (controlledTab === "concierge_hospitality") {
      setViewMode("concierge_hospitality");
    } else if (controlledTab === "document_vault") {
      setViewMode("document_vault");
    } else if (controlledTab === "consents_compliance") {
      setViewMode("consents_compliance");
    }
  }, [controlledTab]);

  // Action: Open Unified Common Patient Details Page
  const handleOpenPatientDetails = (caseId: string, subTab: PatientDetailsSubTab = "intake_overview") => {
    onSelectCase(caseId);
    setPreviousViewMode(viewMode === "patient_details" ? "directory" : viewMode);
    setDetailsInitialSubTab(subTab);
    setViewMode("patient_details");
  };

  // Action: Back button from Patient Details
  const handleBackToOrigin = () => {
    setViewMode(previousViewMode || "dashboard");
  };

  // Scope live counts (independent of urgency filter)
  const scopeCounts = useMemo(() => {
    const currentName = currentUser?.name || "";
    const total = baseCases.length;
    const myQueue = baseCases.filter((c) => c.assignedCoordinatorName === currentName).length;
    const unassigned = baseCases.filter((c) => !c.assignedCoordinatorName || c.assignedCoordinatorName.trim() === "").length;
    return { total, myQueue, unassigned };
  }, [baseCases, currentUser]);

  // Urgency live counts (based on current scope filter & search)
  const urgencyCounts = useMemo(() => {
    let list = baseCases;
    const currentName = currentUser?.name || "";

    if (coordinatorFilter === "my_queue") {
      list = list.filter((c) => c.assignedCoordinatorName === currentName);
    } else if (coordinatorFilter === "unassigned") {
      list = list.filter((c) => !c.assignedCoordinatorName || c.assignedCoordinatorName.trim() === "");
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (c) =>
          c.id.toLowerCase().includes(q) ||
          c.patientName.toLowerCase().includes(q) ||
          c.treatmentCategory.toLowerCase().includes(q) ||
          c.patientCountry.toLowerCase().includes(q)
      );
    }

    const all = list.length;
    const urgent = list.filter((c) => {
      const msLeft = new Date(c.slaExpiresAt).getTime() - Date.now();
      return c.slaBreached || msLeft / 60000 <= 45 || c.slaTargetMinutes <= 45;
    }).length;
    const leads = list.filter((c) => c.stage === "lead" || c.stage === "contacted").length;
    const docs = list.filter((c) => c.stage === "documents_collected" || (c.documents && c.documents.length > 0)).length;

    return { all, urgent, leads, docs };
  }, [baseCases, coordinatorFilter, searchQuery, currentUser]);

  // Filtering cases for Dashboard urgency queue
  const filteredDashboardCases = useMemo(() => {
    let list = baseCases;
    const currentName = currentUser?.name || "";

    // 1. Scope Filter
    if (coordinatorFilter === "my_queue") {
      list = list.filter((c) => c.assignedCoordinatorName === currentName);
    } else if (coordinatorFilter === "unassigned") {
      list = list.filter((c) => !c.assignedCoordinatorName || c.assignedCoordinatorName.trim() === "");
    }

    // 2. Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (c) =>
          c.id.toLowerCase().includes(q) ||
          c.patientName.toLowerCase().includes(q) ||
          c.treatmentCategory.toLowerCase().includes(q) ||
          c.patientCountry.toLowerCase().includes(q) ||
          (c.clinicalSummary?.chiefComplaint && c.clinicalSummary.chiefComplaint.toLowerCase().includes(q)) ||
          (c.clinicalSummary?.diagnosis && c.clinicalSummary.diagnosis.toLowerCase().includes(q)) ||
          (c.assignedCoordinatorName && c.assignedCoordinatorName.toLowerCase().includes(q))
      );
    }

    // 3. Response-Time Urgency Filter
    if (queueFilter === "sla_expiring") {
      list = list.filter((c) => {
        const msLeft = new Date(c.slaExpiresAt).getTime() - Date.now();
        return c.slaBreached || msLeft / 60000 <= 45 || c.slaTargetMinutes <= 45;
      });
    } else if (queueFilter === "lead") {
      list = list.filter((c) => c.stage === "lead" || c.stage === "contacted");
    } else if (queueFilter === "documents_collected") {
      list = list.filter((c) => c.stage === "documents_collected" || (c.documents && c.documents.length > 0));
    }

    // 4. Strict SLA Urgency Sorting (Breached first, then least minutes remaining)
    return [...list].sort((a, b) => {
      if (a.slaBreached && !b.slaBreached) return -1;
      if (!a.slaBreached && b.slaBreached) return 1;
      const aTime = new Date(a.slaExpiresAt).getTime();
      const bTime = new Date(b.slaExpiresAt).getTime();
      return aTime - bTime;
    });
  }, [baseCases, queueFilter, coordinatorFilter, searchQuery, currentUser]);

  // Modal Handlers
  const handleOpenCallModal = (patient: PatientCase) => {
    setSelectedCallCase(patient);
    setCallModalOpen(true);
  };

  const handleOpenWhatsAppModal = (patient: PatientCase) => {
    setSelectedWhatsAppCase(patient);
    setWhatsAppModalOpen(true);
  };

  const handleOpenLogContactModal = (patient: PatientCase) => {
    setSelectedLogContactCase(patient);
    setLogContactModalOpen(true);
  };

  const handleOpenReassignModal = (item: {
    time: string;
    patientName: string;
    doctorName: string;
    hospital: string;
    caseId?: string;
  }) => {
    setSelectedConsultationItem(item);
    setReassignModalOpen(true);
  };

  const handleJoinVideoRoom = (patient: PatientCase) => {
    setSelectedVideoCase(patient);
    setVideoModalOpen(true);
  };

  const handleOpenNurtureModal = (patient: PatientCase) => {
    setSelectedNurtureCase(patient);
    setNurtureModalOpen(true);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* ========================================================================= */}
      {/* TOP METRIC STRIP (ROW OF 6 CARDS)                                         */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        <div className="bg-white rounded-2xl p-4 backdrop-blur-xl rounded-2xl p-3 sm:p-4 shadow-[0_6px_32px_rgba(0,0,0,0.04)] border border-slate-200/90 flex flex-col justify-between hover:shadow-[0_6px_32px_rgba(0,0,0,0.08)] transition-all group">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-bold text-slate-700 leading-snug">New Inquiries Today</span>
            <div className="w-8 h-8 rounded-full bg-[#E6F8F3] border border-emerald-200/80 flex items-center justify-center text-emerald-700 shrink-0">
              <Phone className="w-4 h-4 text-emerald-700" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-black text-slate-900 leading-none tracking-tight">14</div>
            <div className="mt-2">
              <span className="inline-block px-2.5 py-0.5 rounded-md bg-slate-100 font-mono text-[11px] font-bold text-slate-700">
                +3 vs yesterday
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 backdrop-blur-xl rounded-2xl p-3 sm:p-4 shadow-[0_6px_32px_rgba(0,0,0,0.04)] border border-slate-200/90 flex flex-col justify-between hover:shadow-[0_6px_32px_rgba(0,0,0,0.08)] transition-all group">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-bold text-slate-700 leading-snug">Awaiting Triage Call</span>
            <div className="w-8 h-8 rounded-full bg-[#FEF6E7] border border-amber-200/80 flex items-center justify-center text-amber-700 shrink-0">
              <Hourglass className="w-4 h-4 text-amber-700" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-black text-slate-900 leading-none tracking-tight">4</div>
            <div className="mt-2">
              <span className="inline-block px-2.5 py-0.5 rounded-md bg-slate-100 font-mono text-[11px] font-bold text-slate-700">
                Longest wait: 18m
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 backdrop-blur-xl rounded-2xl p-3 sm:p-4 shadow-[0_6px_32px_rgba(0,0,0,0.04)] border border-slate-200/90 flex flex-col justify-between hover:shadow-[0_6px_32px_rgba(0,0,0,0.08)] transition-all group">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-bold text-slate-700 leading-snug">Tele-Consults Scheduled</span>
            <div className="w-8 h-8 rounded-full bg-[#EEF2FF] border border-blue-200/80 flex items-center justify-center text-blue-700 shrink-0">
              <Calendar className="w-4 h-4 text-blue-700" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-black text-slate-900 leading-none tracking-tight">12</div>
            <div className="mt-2">
              <span className="inline-block px-2.5 py-0.5 rounded-md bg-slate-100 font-mono text-[11px] font-bold text-slate-700">
                4 today
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 backdrop-blur-xl rounded-2xl p-3 sm:p-4 shadow-[0_6px_32px_rgba(0,0,0,0.04)] border border-slate-200/90 flex flex-col justify-between hover:shadow-[0_6px_32px_rgba(0,0,0,0.08)] transition-all group">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-bold text-slate-700 leading-snug">Hospital Acceptance Rate</span>
            <div className="w-8 h-8 rounded-full bg-[#EBF8F5] border border-teal-200/80 flex items-center justify-center text-teal-700 shrink-0">
              <TrendingUp className="w-4 h-4 text-teal-700" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-black text-slate-900 leading-none tracking-tight">82%</div>
            <div className="mt-2">
              <span className="inline-block px-2.5 py-0.5 rounded-md bg-slate-100 font-mono text-[11px] font-bold text-slate-700">
                Target: 80–90%
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 backdrop-blur-xl rounded-2xl p-3 sm:p-4 shadow-[0_6px_32px_rgba(0,0,0,0.04)] border border-slate-200/90 flex flex-col justify-between hover:shadow-[0_6px_32px_rgba(0,0,0,0.08)] transition-all group">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-bold text-slate-700 leading-snug">Visa Clearance Rate</span>
            <div className="w-8 h-8 rounded-full bg-[#F3E8FF] border border-purple-200/80 flex items-center justify-center text-purple-700 shrink-0">
              <ShieldCheck className="w-4 h-4 text-purple-700" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-black text-slate-900 leading-none tracking-tight">94%</div>
            <div className="mt-2">
              <span className="inline-block px-2.5 py-0.5 rounded-md bg-slate-100 font-mono text-[11px] font-bold text-slate-700">
                Avg 24h issuance
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 backdrop-blur-xl rounded-2xl p-3 sm:p-4 shadow-[0_6px_32px_rgba(0,0,0,0.04)] border border-slate-200/90 flex flex-col justify-between hover:shadow-[0_6px_32px_rgba(0,0,0,0.08)] transition-all group">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-bold text-slate-700 leading-snug">Avg Time to Quote</span>
            <div className="w-8 h-8 rounded-full bg-[#F1F5F9] border border-slate-300 flex items-center justify-center text-slate-700 shrink-0">
              <Timer className="w-4 h-4 text-slate-700" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-black text-slate-900 leading-none tracking-tight">3.8 Hours</div>
            <div className="mt-2">
              <span className="inline-block px-2.5 py-0.5 rounded-md bg-slate-100 font-mono text-[11px] font-bold text-slate-700">
                Target: &lt; 6 Hours
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* VIEW ROUTING: DEDICATED TABLES / DASHBOARD / KANBAN / PATIENT DETAILS    */}
      {/* ========================================================================= */}
      {viewMode === "patient_details" && activeCase ? (
        /* Central Common Patient Details Page */
        <CSPatientDetailsView
          patientCase={activeCase}
          initialSubTab={detailsInitialSubTab}
          originLabel={TAB_TO_LABEL_MAP[previousViewMode] || "Directory"}
          onBack={handleBackToOrigin}
          onOpenCallModal={handleOpenCallModal}
          onOpenWhatsAppModal={handleOpenWhatsAppModal}
          onOpenLogContactModal={handleOpenLogContactModal}
          onOpenNurtureModal={handleOpenNurtureModal}
        />
      ) : viewMode === "kanban" ? (
        /* Kanban Pipeline View (Board & List) */
        <CSVisualKanbanPipeline
          cases={cases}
          onSelectCase={(id) => handleOpenPatientDetails(id, "intake_overview")}
          onOpenCallModal={handleOpenCallModal}
          onOpenWhatsAppModal={handleOpenWhatsAppModal}
          onOpenLogContactModal={handleOpenLogContactModal}
          onOpenNewIntake={() => setIntakeModalOpen(true)}
        />
      ) : viewMode === "directory" ? (
        /* Master Directory View (Table & Grid) */
        <CSMasterPatientDirectory
          cases={cases}
          onSelectCase={(id) => handleOpenPatientDetails(id, "intake_overview")}
          onOpenCallModal={handleOpenCallModal}
          onOpenWhatsAppModal={handleOpenWhatsAppModal}
          onOpenLogContactModal={handleOpenLogContactModal}
        />
      ) : viewMode === "hospital_handovers" ? (
        /* Case Execution 1: Hospital Handovers List Table */
        <CSHospitalHandoversTable
          cases={cases}
          onSelectCase={(id, subTab) => handleOpenPatientDetails(id, (subTab as any) || "hospital_opinions")}
          onOpenCallModal={handleOpenCallModal}
          onOpenWhatsAppModal={handleOpenWhatsAppModal}
        />
      ) : viewMode === "tele_consultations" ? (
        /* Case Execution 2: Tele-Consultation Schedule List Table */
        <CSTeleConsultationsTable
          cases={cases}
          onSelectCase={(id, subTab) => handleOpenPatientDetails(id, (subTab as any) || "hospital_opinions")}
          onJoinVideoRoom={handleJoinVideoRoom}
          onReassignConsult={handleOpenReassignModal}
          onOpenCallModal={handleOpenCallModal}
          onOpenWhatsAppModal={handleOpenWhatsAppModal}
        />
      ) : viewMode === "quote_builder" ? (
        /* Case Execution 3: Quote Proposals Ledger Table */
        <CSQuoteLedgerTable
          cases={cases}
          onSelectCase={(id, subTab) => handleOpenPatientDetails(id, (subTab as any) || "quote_builder")}
          onOpenCallModal={handleOpenCallModal}
          onOpenWhatsAppModal={handleOpenWhatsAppModal}
        />
      ) : viewMode === "visas_flights" ? (
        /* Logistics & Compliance 1: Visas & Flights Table */
        <CSVisasFlightsTable
          cases={cases}
          onSelectCase={(id, subTab) => handleOpenPatientDetails(id, (subTab as any) || "visas_concierge")}
          onOpenCallModal={handleOpenCallModal}
          onOpenWhatsAppModal={handleOpenWhatsAppModal}
        />
      ) : viewMode === "concierge_hospitality" ? (
        /* Logistics & Compliance 2: VIP Concierge Table */
        <CSConciergeTable
          cases={cases}
          onSelectCase={(id, subTab) => handleOpenPatientDetails(id, (subTab as any) || "visas_concierge")}
          onOpenCallModal={handleOpenCallModal}
          onOpenWhatsAppModal={handleOpenWhatsAppModal}
        />
      ) : viewMode === "document_vault" ? (
        /* Logistics & Compliance 3: Medical Document Vault Table */
        <CSDocumentVaultTable
          cases={cases}
          onSelectCase={(id, subTab) => handleOpenPatientDetails(id, (subTab as any) || "docs_scans")}
          onOpenCallModal={handleOpenCallModal}
          onOpenWhatsAppModal={handleOpenWhatsAppModal}
        />
      ) : viewMode === "consents_compliance" ? (
        /* Logistics & Compliance 4: Immutable Consent Audit Table */
        <CSConsentsAuditTable
          cases={cases}
          onSelectCase={(id, subTab) => handleOpenPatientDetails(id, (subTab as any) || "consents_compliance")}
          onOpenCallModal={handleOpenCallModal}
          onOpenWhatsAppModal={handleOpenWhatsAppModal}
        />
      ) : (
        /* ========================================================================= */
        /* DEFAULT: DASHBOARD VIEW (Metric Strip, Live SLA Queue, Widgets)          */
        /* ========================================================================= */
        <div className="space-y-5">
          {/* Dashboard Toolbar */}
          <div className="bg-white rounded-2xl p-3 sm:px-4 shadow-[0_6px_32px_rgba(0,0,0,0.04)] hover:shadow-[0_6px_32px_rgba(0,0,0,0.08)] border border-slate-200/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 transition-all group">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-slate-500 hidden md:inline">Scope Filter:</span>
              <div className="flex items-center bg-slate-100 p-1 rounded-xl gap-1">
                {[
                  { id: "all", label: "All Cases", count: scopeCounts.total },
                  { id: "my_queue", label: "My Queue", count: scopeCounts.myQueue },
                  { id: "unassigned", label: "⚡ Unassigned", count: scopeCounts.unassigned },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setCoordinatorFilter(f.id as any)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${coordinatorFilter === f.id
                      ? "bg-[#101955] text-white shadow-2xs font-extrabold"
                      : "text-slate-600 hover:text-slate-900"
                      }`}
                  >
                    <span>{f.label}</span>
                    <span
                      className={`px-1.5 py-0.2 rounded-md text-[10px] font-mono font-black ${coordinatorFilter === f.id
                        ? "bg-white/20 text-white"
                        : "bg-slate-200/80 text-slate-700"
                        }`}
                    >
                      {f.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search patient, condition, country..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-xl pl-8 pr-8 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#2ECDC5]/40 font-medium"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold cursor-pointer"
                  title="Clear search"
                >
                  ×
                </button>
              )}
            </div>
          </div>

          {/* SLA Urgency Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column (65% Width): Live SLA Urgency Queue */}
            <div className="lg:col-span-8 space-y-4">
              <div className="bg-white rounded-2xl p-4 backdrop-blur-xl  p-3 sm:p-4 shadow-[0_6px_32px_rgba(0,0,0,0.04)] border border-slate-200/90 hover:shadow-[0_6px_32px_rgba(0,0,0,0.08)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 transition-all group">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-black text-slate-900 tracking-tight">
                      Response-Time Urgency Queue
                    </h2>
                    <span className="px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-black uppercase tracking-wider animate-pulse">
                      ⚡ Live SLA Countdown
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    High-priority patient cases sorted strictly by SLA urgency countdown
                  </p>
                </div>

                <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
                  {[
                    { id: "all", label: "All", count: urgencyCounts.all },
                    { id: "sla_expiring", label: "🔥 Urgent", count: urgencyCounts.urgent },
                    { id: "lead", label: "Leads", count: urgencyCounts.leads },
                    { id: "documents_collected", label: "Docs", count: urgencyCounts.docs },
                  ].map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setQueueFilter(f.id as any)}
                      className={`px-2.5 py-1 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${queueFilter === f.id
                        ? "bg-[#101955] text-white shadow-xs"
                        : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200"
                        }`}
                    >
                      <span>{f.label}</span>
                      <span
                        className={`px-1.5 py-0.2 rounded-md text-[10px] font-mono font-black ${queueFilter === f.id
                          ? "bg-white/20 text-white"
                          : "bg-slate-200 text-slate-600"
                          }`}
                      >
                        {f.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic Queue Case Cards */}
              {filteredDashboardCases.length === 0 ? (
                <div className="bg-white rounded-3xl p-10 border border-slate-100 shadow-sm text-center space-y-4">
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400">
                    <Search className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-slate-900">No matching patient cases</h3>
                    <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                      No patient records match the selected scope ({coordinatorFilter.replace("_", " ")}) and urgency queue filters.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setCoordinatorFilter("all");
                      setQueueFilter("all");
                      setSearchQuery("");
                    }}
                    className="px-4 py-2 rounded-xl bg-[#101955] text-white text-xs font-bold shadow-xs hover:bg-[#1a2670] transition-all cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset All Filters</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredDashboardCases.map((patientCase) => {
                    const msLeft = new Date(patientCase.slaExpiresAt).getTime() - Date.now();
                    const minsLeft = Math.round(msLeft / 60000);
                    const isBreached = patientCase.slaBreached || msLeft < 0;
                    const isUrgent = isBreached || minsLeft <= 30;

                    const countryFlag = patientCase.patientCountry?.includes("UK")
                      ? "🇬🇧"
                      : patientCase.patientCountry?.includes("UAE")
                        ? "🇦🇪"
                        : patientCase.patientCountry?.includes("USA")
                          ? "🇺🇸"
                          : patientCase.patientCountry?.includes("Kenya")
                            ? "🇰🇪"
                            : patientCase.patientCountry?.includes("China")
                              ? "🇨🇳"
                              : "🌐";

                    const countryShort = patientCase.patientCountry?.includes("UK")
                      ? "UK"
                      : patientCase.patientCountry?.includes("UAE")
                        ? "UAE"
                        : patientCase.patientCountry?.includes("USA")
                          ? "USA"
                          : patientCase.patientCountry?.includes("Kenya")
                            ? "Kenya"
                            : patientCase.patientCountry?.includes("China")
                              ? "China"
                              : patientCase.patientCountry;

                    const requirementSnippet =
                      patientCase.treatmentCategory || "Specialist Evaluation & Clinical Triage";

                    const clinicalDetails =
                      patientCase.clinicalSummary?.chiefComplaint ||
                      patientCase.csNotes?.[0]?.text ||
                      patientCase.clinicalWorkspace?.treatmentPlan ||
                      "Comprehensive international patient case intake and clinical triage review.";

                    const hasIncompleteDocs = patientCase.documents?.some(
                      (d) => d.status === "incomplete" || d.status === "pending_review"
                    );

                    const isAssignedToMe =
                      Boolean(currentUser?.name && patientCase.assignedCoordinatorName === currentUser.name);

                    return (
                      <div
                        key={patientCase.id}
                        className={`bg-white rounded-2xl p-3 sm:p-4 border transition-all space-y-4 relative overflow-hidden group shadow-sm hover:shadow-md ${isBreached
                          ? "border-rose-300 shadow-rose-500/5 hover:border-rose-400"
                          : isUrgent
                            ? "border-rose-200/90 shadow-rose-500/5 hover:border-rose-300"
                            : patientCase.stage === "consultation"
                              ? "border-amber-200/80 shadow-amber-500/5 hover:border-amber-300"
                              : "border-slate-100 hover:border-[#2ECDC5]/60"
                          }`}
                      >
                        {/* Status color side bar */}
                        <div
                          className={`absolute top-0 left-0 bottom-0 w-2 ${isBreached
                            ? "bg-rose-600"
                            : isUrgent
                              ? "bg-rose-500"
                              : patientCase.stage === "consultation"
                                ? "bg-amber-500"
                                : patientCase.stage === "quote"
                                  ? "bg-purple-600"
                                  : patientCase.stage === "nurture"
                                    ? "bg-orange-500"
                                    : "bg-[#101955]"
                            }`}
                        />

                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                          <div className="flex items-center gap-2.5 flex-wrap">
                            <span
                              onClick={() => handleOpenPatientDetails(patientCase.id, "intake_overview")}
                              className="font-black text-lg text-slate-900 group-hover:text-[#101955] transition-colors cursor-pointer hover:underline"
                            >
                              {patientCase.patientName}
                            </span>
                            <span className="px-2.5 py-0.5 rounded-lg bg-slate-100 border border-slate-200 text-xs font-bold text-slate-800 flex items-center gap-1.5">
                              <span>{countryFlag}</span>
                              <span>{countryShort}</span>
                            </span>
                            <span className="font-mono text-[10px] text-slate-400 font-bold bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                              {patientCase.id}
                            </span>

                            {/* Stage / Urgency Badge */}
                            {isBreached ? (
                              <span className="px-2.5 py-0.5 rounded-lg bg-rose-100 text-rose-800 border border-rose-200 text-[11px] font-black tracking-wide flex items-center gap-1">
                                <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping inline-block" />
                                <span>🔴 SLA BREACHED • IMMEDIATE ESCALATION</span>
                              </span>
                            ) : patientCase.stage === "lead" ? (
                              <span className="px-2.5 py-0.5 rounded-lg bg-rose-100 text-rose-800 border border-rose-200 text-[11px] font-black tracking-wide flex items-center gap-1">
                                <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping inline-block" />
                                <span>🔴 URGENT INTAKE / SURGERY</span>
                              </span>
                            ) : patientCase.stage === "consultation" ? (
                              <span className="px-2.5 py-0.5 rounded-lg bg-amber-100 text-amber-900 border border-amber-200 text-[11px] font-black tracking-wide flex items-center gap-1">
                                <span className="w-2 h-2 rounded-full bg-amber-600 inline-block" />
                                <span>🟡 CLINICAL CONSULTATION</span>
                              </span>
                            ) : patientCase.stage === "quote" ? (
                              <span className="px-2.5 py-0.5 rounded-lg bg-purple-100 text-purple-900 border border-purple-200 text-[11px] font-black tracking-wide">
                                🟣 PACKAGE QUOTE ISSUED
                              </span>
                            ) : patientCase.stage === "nurture" ? (
                              <span className="px-2.5 py-0.5 rounded-lg bg-orange-100 text-orange-900 border border-orange-200 text-[11px] font-black tracking-wide">
                                🟠 NURTURE FOLLOW-UP
                              </span>
                            ) : (
                              <span className="px-2.5 py-0.5 rounded-lg bg-blue-100 text-blue-900 border border-blue-200 text-[11px] font-black tracking-wide">
                                🔵 {patientCase.stage.replace("_", " ").toUpperCase()}
                              </span>
                            )}
                          </div>

                          {/* SLA Wait Indicator */}
                          <div
                            className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold flex items-center gap-1.5 shrink-0 ${isBreached
                              ? "bg-rose-100 text-rose-800 border border-rose-300 ring-2 ring-rose-400/40 animate-pulse"
                              : isUrgent
                                ? "bg-rose-50 text-rose-700 border border-rose-300 ring-2 ring-rose-400/40 animate-pulse"
                                : minsLeft <= 60
                                  ? "bg-amber-50 text-amber-900 border border-amber-300 ring-2 ring-amber-400/40"
                                  : "bg-slate-100 text-slate-700 border border-slate-200"
                              }`}
                          >
                            <Clock className={`w-3.5 h-3.5 ${isBreached || isUrgent ? "text-rose-600" : "text-amber-700"}`} />
                            <span>
                              {isBreached
                                ? "SLA Breached"
                                : minsLeft > 0
                                  ? `Wait: ${minsLeft}m`
                                  : "Due Now"}
                            </span>
                          </div>
                        </div>

                        {/* Clinical summary & requirements */}
                        <div className="bg-slate-50/90 rounded-2xl p-3.5 border border-slate-100 text-xs space-y-1.5">
                          <div className="font-extrabold text-slate-900 flex items-center justify-between gap-2 flex-wrap">
                            <div className="flex items-center gap-2">
                              <span className="text-[#101955]">Requirement:</span>
                              <span>{requirementSnippet}</span>
                            </div>
                            <div className="flex items-center gap-2 text-[11px]">
                              {patientCase.assignedCoordinatorName ? (
                                <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-bold flex items-center gap-1">
                                  <Users className="w-3 h-3 text-slate-500" />
                                  <span>{patientCase.assignedCoordinatorName}</span>
                                  {isAssignedToMe && (
                                    <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-1 rounded">
                                      You
                                    </span>
                                  )}
                                </span>
                              ) : (
                                <span className="px-2 py-0.5 rounded-md bg-amber-50 border border-amber-200 text-amber-800 font-black flex items-center gap-1 animate-pulse">
                                  <Zap className="w-3 h-3 text-amber-600" />
                                  <span>Unassigned Lead</span>
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="text-slate-600 text-[11px] leading-relaxed">
                            {clinicalDetails}
                          </div>

                          {hasIncompleteDocs && (
                            <div className="mt-1 px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200 text-[11px] font-bold text-amber-800 flex items-center gap-1.5">
                              <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                              <span>
                                Documents: Scans uploaded • Missing items or clinical review pending
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Action buttons row */}
                        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <button
                              onClick={() => handleOpenCallModal(patientCase)}
                              className="px-4 py-2 rounded-xl bg-[#101955] hover:bg-[#1a2670] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer transform hover:scale-[1.02]"
                            >
                              <Phone className="w-3.5 h-3.5 text-[#2ECDC5]" />
                              <span>Call Patient</span>
                            </button>

                            <button
                              onClick={() => handleOpenWhatsAppModal(patientCase)}
                              className="px-4 py-2 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 text-xs font-black flex items-center gap-1.5 shadow-xs transition-all cursor-pointer transform hover:scale-[1.02]"
                            >
                              <MessageSquare className="w-3.5 h-3.5 text-slate-950" />
                              <span>WhatsApp</span>
                            </button>

                            <button
                              onClick={() => handleOpenLogContactModal(patientCase)}
                              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 border border-slate-200 transition-all cursor-pointer"
                            >
                              <FileText className="w-3.5 h-3.5 text-slate-600" />
                              <span>Log Contact</span>
                            </button>

                            {!patientCase.assignedCoordinatorName && (
                              <button
                                onClick={() => {
                                  const agentName = currentUser?.name || "Care Coordinator";
                                  bulkAssignCases([patientCase.id], agentName);
                                }}
                                className="px-3.5 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-black flex items-center gap-1.5 border border-indigo-200 transition-all cursor-pointer"
                              >
                                <UserCheck className="w-3.5 h-3.5 text-indigo-600" />
                                <span>Claim Lead</span>
                              </button>
                            )}
                          </div>

                          <button
                            onClick={() => handleOpenPatientDetails(patientCase.id, "intake_overview")}
                            className="px-3.5 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-extrabold flex items-center gap-1 transition-all cursor-pointer border border-blue-200 self-end sm:self-auto group/btn"
                          >
                            <span>View Case</span>
                            <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Right Column (35% Width): Consultations Widget & Pipeline Funnel */}
            <div className="lg:col-span-4 space-y-5">
              {/* Today's Tele-Consultations Widget */}
              <div className="bg-white rounded-2xl p-4 backdrop-blur-xl rounded-3xl p-5 sm:p-6 shadow-[0_6px_32px_rgba(0,0,0,0.04)] border border-slate-200/90 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                      <Video className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-black text-sm text-slate-900 leading-tight">
                        Today’s Tele-Consultations
                      </h3>
                      <span className="text-[11px] font-bold text-slate-400">2 Live Sessions Scheduled</span>
                    </div>
                  </div>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                </div>

                <div className="space-y-3">
                  <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-100 space-y-3 hover:border-slate-200 transition-all">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="font-extrabold text-xs text-slate-900">
                          14:30 IST • Tariq Al-Mansoor
                        </div>
                        <div className="text-[11px] text-slate-600 mt-0.5 font-medium">
                          with <span className="font-bold text-slate-800">Dr. Subhash Gupta</span> (Medanta)
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 text-[10px] font-black">
                        In 52m
                      </span>
                    </div>

                    <div className="flex items-center gap-2 pt-3 border-t border-slate-200/60">
                      <button
                        onClick={() =>
                          handleOpenReassignModal({
                            time: "Today 14:30 IST",
                            patientName: "Tariq Al-Mansoor",
                            doctorName: "Dr. Subhash Gupta",
                            hospital: "Medanta",
                            caseId: "PT-2026-089412",
                          })
                        }
                        className="flex-1 py-2.5 px-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200 flex items-center justify-center gap-1 transition-all cursor-pointer"
                      >
                        <span>Reassign</span>
                      </button>

                      <button
                        onClick={() => tariqCase && handleJoinVideoRoom(tariqCase)}
                        className="flex-1 py-2.5 px-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black flex items-center justify-center gap-1 shadow-[0_6px_32px_rgba(0,0,0,0.04)] transition-all cursor-pointer"
                      >
                        <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                        <span>Join Room</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pipeline Funnel Snapshot Widget */}
              <div className="bg-white backdrop-blur-xl rounded-3xl p-5 sm:p-6 shadow-[0_6px_32px_rgba(0,0,0,0.04)] border border-slate-200/90 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                      <Layers className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-black text-sm text-slate-900 leading-tight">
                        Pipeline Funnel Snapshot
                      </h3>
                      <span className="text-[11px] font-bold text-slate-400">Active Velocity</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                    +14% vs Bench
                  </span>
                </div>

                <div className="space-y-3.5">
                  <div>
                    <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                      <span className="text-slate-700">New Intake</span>
                      <span className="font-black text-slate-900">14 cases (100%)</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: "100%" }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                      <span className="text-slate-700">Hospital Handover</span>
                      <span className="font-black text-slate-900">5 cases (35.7%)</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div className="bg-amber-500 h-2 rounded-full" style={{ width: "35.7%" }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                      <span className="text-slate-700">Quote Issued</span>
                      <span className="font-black text-slate-900">3 cases (21.4%)</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div className="bg-emerald-600 h-2 rounded-full" style={{ width: "21.4%" }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* INTERACTIVE MODALS                                                        */}
      {/* ========================================================================= */}
      <PublicIntakeModal
        isOpen={intakeModalOpen}
        onClose={() => setIntakeModalOpen(false)}
      />

      {selectedCallCase && (
        <CSCallDialerModal
          isOpen={callModalOpen}
          onClose={() => setCallModalOpen(false)}
          patientCase={selectedCallCase}
        />
      )}

      {selectedWhatsAppCase && (
        <WhatsAppContactModal
          isOpen={whatsAppModalOpen}
          onClose={() => setWhatsAppModalOpen(false)}
          patientCase={selectedWhatsAppCase}
        />
      )}

      {selectedLogContactCase && (
        <CSLogContactModal
          isOpen={logContactModalOpen}
          onClose={() => setLogContactModalOpen(false)}
          patientCase={selectedLogContactCase}
        />
      )}

      {selectedConsultationItem && (
        <CSReassignConsultModal
          isOpen={reassignModalOpen}
          onClose={() => setReassignModalOpen(false)}
          consultationItem={selectedConsultationItem}
        />
      )}

      {selectedVideoCase && (
        <VideoConsultationSDKModal
          isOpen={videoModalOpen}
          onClose={() => setVideoModalOpen(false)}
          patientCase={selectedVideoCase}
        />
      )}

      {nurtureModalOpen && (selectedNurtureCase || activeCase) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <h3 className="text-lg font-black text-slate-900">Move to Nurture Queue</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              This case will be scheduled for periodic re-engagement rather than treated as closed/lost.
            </p>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Nurture Reason</label>
              <select
                value={nurtureReason}
                onChange={(e) => setNurtureReason(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 cursor-pointer"
              >
                <option value="paused_by_patient">Paused by Patient (Needs Time / Family Discussion)</option>
                <option value="declined_by_hospital">Hospital Declined (Seeking Alternative Center)</option>
                <option value="budget_mismatch">Budget Mismatch</option>
                <option value="not_ready">Not Clinically Ready for Travel</option>
                <option value="other">Other Reason</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Follow-up Notes</label>
              <textarea
                rows={3}
                placeholder="Details regarding follow-up timeline and patient preferences..."
                value={nurtureNotes}
                onChange={(e) => setNurtureNotes(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setNurtureModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  const targetCase = selectedNurtureCase || activeCase;
                  if (targetCase) {
                    moveToNurture(targetCase.id, {
                      reason: nurtureReason,
                      notes: nurtureNotes,
                      scheduledFollowUpAt: new Date(Date.now() + 14 * 24 * 3600 * 1000).toISOString(),
                    });
                  }
                  setNurtureModalOpen(false);
                }}
                className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs cursor-pointer"
              >
                Confirm Move to Nurture
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
