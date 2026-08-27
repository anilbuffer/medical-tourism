"use client";

import React, { useState } from "react";
import { PatientCase, PatientJourneyStage } from "@/types/portal";
import { usePortal } from "@/lib/portal/store";
import { CSInlineDicomViewer } from "./CSInlineDicomViewer";
import { CSQuoteBuilderWorkspace } from "./CSQuoteBuilderWorkspace";
import { CSMultiChannelChat } from "./CSMultiChannelChat";
import { CSHospitalOpinionsTab } from "./CSHospitalOpinionsTab";
import { CSItineraryWorkspace } from "./CSItineraryWorkspace";
import { CSConsentsTab } from "./CSConsentsTab";
import { CSExportPdfModal } from "./CSExportPdfModal";
import {
  ArrowLeft,
  Phone,
  MessageSquare,
  ClipboardList,
  Heart,
  Download,
  Clock,
  User,
  Calendar,
  Building2,
  Layers,
  FileText,
  Video,
  DollarSign,
  Plane,
  ShieldCheck,
  Activity,
  CheckCircle2,
  AlertTriangle,
  FileDown,
  Sparkles,
} from "lucide-react";

export type PatientDetailsSubTab =
  | "intake_overview"
  | "docs_scans"
  | "hospital_opinions"
  | "multichannel_chat"
  | "quote_builder"
  | "visas_concierge"
  | "consents_compliance";

interface CSPatientDetailsViewProps {
  patientCase: PatientCase;
  initialSubTab?: PatientDetailsSubTab;
  originLabel?: string;
  onBack: () => void;
  onOpenCallModal: (patient: PatientCase) => void;
  onOpenWhatsAppModal: (patient: PatientCase) => void;
  onOpenLogContactModal: (patient: PatientCase) => void;
  onOpenNurtureModal: (patient: PatientCase) => void;
}

const STAGE_LABEL_MAP: Record<string, string> = {
  lead: "New Leads",
  contacted: "Contacted",
  documents_collected: "Awaiting Docs",
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
  "lead",
  "contacted",
  "documents_collected",
  "hospital_handover",
  "consultation",
  "quote",
  "payment",
  "booking",
  "treatment",
  "followup",
  "nurture",
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

export const CSPatientDetailsView: React.FC<CSPatientDetailsViewProps> = ({
  patientCase,
  initialSubTab = "intake_overview",
  originLabel = "Directory",
  onBack,
  onOpenCallModal,
  onOpenWhatsAppModal,
  onOpenLogContactModal,
  onOpenNurtureModal,
}) => {
  const { updateStageWithReason, currentUser } = usePortal();
  const [activeSubTab, setActiveSubTab] = useState<PatientDetailsSubTab>(initialSubTab);
  const [chatPrefillTemplate, setChatPrefillTemplate] = useState<string>("");
  const [exportPdfOpen, setExportPdfOpen] = useState(false);

  // SLA Calculation
  const isSlaBreached = patientCase.slaBreached;
  const msLeft = new Date(patientCase.slaExpiresAt).getTime() - Date.now();
  const minLeft = Math.round(msLeft / 60000);

  const handleTriggerIncompleteAction = (docTitle: string, note: string) => {
    setChatPrefillTemplate(
      `Hello ${patientCase.patientName}! Our clinical review team checked your "${docTitle}". Remarks: ${note} Please re-upload the missing pages directly via your portal.`
    );
    setActiveSubTab("multichannel_chat");
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* Top Header Navigation Strip */}
      <div className="bg-slate-900 text-white rounded-3xl p-4 sm:px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-lg shadow-slate-900/10">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 text-[#2ECDC5] group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to {originLabel}</span>
          </button>
          <span className="text-slate-600 hidden sm:inline">•</span>
          <span className="text-xs font-bold text-slate-300 hidden sm:inline">
            Viewing Patient Case Profile
          </span>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            onClick={() => setExportPdfOpen(true)}
            className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <FileDown className="w-3.5 h-3.5 text-[#2ECDC5]" />
            <span>Export PDF Dossier</span>
          </button>
        </div>
      </div>

      {/* Patient Master HUD Card */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-sm shadow-slate-100/50 space-y-5">
        {/* Top: Demographics & Stage Selector & Quick Actions */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          {/* Left: Patient Avatar & Identity */}
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#101955] via-[#1a287b] to-[#101955] text-white font-black text-xl flex items-center justify-center shadow-md ring-2 ring-[#2ECDC5]/40 shrink-0">
              {getCountryFlag(patientCase.patientCountry)}
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                  {patientCase.patientName}
                </h2>
                <span className="font-mono text-xs font-bold text-[#101955] bg-blue-50 px-2.5 py-0.5 rounded-lg border border-blue-200">
                  {patientCase.id}
                </span>
                <span
                  className={`text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase ${
                    patientCase.stage === "nurture"
                      ? "bg-purple-100 text-purple-800"
                      : patientCase.stage === "treatment" || patientCase.stage === "booking"
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {STAGE_LABEL_MAP[patientCase.stage] || patientCase.stage}
                </span>
              </div>

              <div className="text-xs text-slate-500 font-medium mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                <span>{patientCase.patientCountry}</span>
                <span className="text-slate-300">•</span>
                <span>{patientCase.patientPhone}</span>
                <span className="text-slate-300">•</span>
                <span>{patientCase.patientEmail}</span>
                <span className="text-slate-300">•</span>
                <span className="font-bold text-[#101955]">{patientCase.treatmentCategory}</span>
              </div>
            </div>
          </div>

          {/* Right: Stage Control & Action Modals */}
          <div className="flex items-center gap-2 flex-wrap self-end lg:self-auto">
            {/* Live SLA Countdown Badge */}
            <div className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <span>
                SLA:{" "}
                <strong className={isSlaBreached ? "text-rose-600 font-black" : minLeft <= 30 ? "text-amber-600 font-black" : "text-emerald-700"}>
                  {isSlaBreached ? "🔴 Expired" : `${minLeft}m remaining`}
                </strong>
              </span>
            </div>

            {/* Stage Selector */}
            <select
              value={patientCase.stage}
              onChange={(e) =>
                updateStageWithReason(
                  patientCase.id,
                  e.target.value as PatientJourneyStage,
                  "Updated via Coordinator Patient Details HUD"
                )
              }
              className="bg-slate-50 border border-slate-200 text-xs font-extrabold text-slate-900 rounded-xl py-2 px-3 focus:ring-2 focus:ring-[#2ECDC5] focus:outline-none cursor-pointer"
            >
              {ALL_STAGES.map((s) => (
                <option key={s} value={s}>
                  Stage: {STAGE_LABEL_MAP[s] || s}
                </option>
              ))}
            </select>

            {/* Nurture Trigger */}
            <button
              onClick={() => onOpenNurtureModal(patientCase)}
              className="px-3 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-bold flex items-center gap-1.5 border border-purple-200 transition-all cursor-pointer"
              title="Move to Nurture Queue"
            >
              <Heart className="w-3.5 h-3.5" />
              <span>Nurture</span>
            </button>
          </div>
        </div>

        {/* Quick Communications & Action Strip */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => onOpenCallModal(patientCase)}
              className="px-4 py-2 rounded-xl bg-[#101955] hover:bg-[#1a2770] text-white font-black text-xs flex items-center gap-1.5 transition-all shadow-xs cursor-pointer transform hover:scale-[1.02]"
            >
              <Phone className="w-3.5 h-3.5 text-[#2ECDC5]" />
              <span>📞 Audio Call</span>
            </button>

            <button
              onClick={() => onOpenWhatsAppModal(patientCase)}
              className="px-4 py-2 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-black text-xs flex items-center gap-1.5 transition-all shadow-xs cursor-pointer transform hover:scale-[1.02]"
            >
              <MessageSquare className="w-3.5 h-3.5 text-slate-950" />
              <span>💬 WhatsApp Chat</span>
            </button>

            <button
              onClick={() => onOpenLogContactModal(patientCase)}
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 border border-slate-200 transition-all cursor-pointer"
            >
              <ClipboardList className="w-3.5 h-3.5 text-slate-600" />
              <span>📋 Log Interaction</span>
            </button>
          </div>

          <div className="text-xs text-slate-500 flex items-center gap-2">
            <span className="font-bold text-slate-700">Assigned Coordinator:</span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-900 font-extrabold border border-slate-200">
              {patientCase.assignedCoordinatorName || currentUser?.name || "Aisha Khan"}
            </span>
          </div>
        </div>

        {/* Sub-Navigation Tabs Strip */}
        <div className="flex overflow-x-auto gap-2 pt-3 border-t border-slate-100 scrollbar-none">
          {[
            { id: "intake_overview", label: "📋 Intake & Overview", icon: FileText },
            { id: "docs_scans", label: "📑 Docs & Scans (DICOM)", icon: Layers },
            { id: "hospital_opinions", label: "🏥 Hospital Opinions", icon: Building2 },
            { id: "multichannel_chat", label: "💬 Multi-Channel Chat", icon: MessageSquare },
            { id: "quote_builder", label: "💰 Quote Builder", icon: DollarSign },
            { id: "visas_concierge", label: "✈️ Visas & Flights", icon: Plane },
            { id: "consents_compliance", label: "🛡️ Consents & Audit", icon: ShieldCheck },
          ].map((tab) => {
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id as PatientDetailsSubTab)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? "bg-[#101955] text-white shadow-sm"
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200"
                }`}
              >
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Subtab Workspace Body */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-sm min-h-[520px]">
        {/* Tab 1: Intake & Overview */}
        {activeSubTab === "intake_overview" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <h4 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600" />
                Raw Intake Payload &amp; Chief Complaint
              </h4>
              <span className="text-xs text-slate-500">
                Source: <strong>{patientCase.utmSource || "Executive International Referral"}</strong>
              </span>
            </div>

            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 space-y-4">
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Chief Complaint / Medical Summary
                </div>
                <div className="font-medium text-slate-800 bg-white p-4 rounded-xl border border-slate-200 text-xs leading-relaxed">
                  {patientCase.clinicalSummary?.chiefComplaint ||
                    "International patient referral. Clinical records submitted and verified for tertiary medical tourism evaluation."}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-1">
                <button
                  onClick={() => setActiveSubTab("docs_scans")}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-1.5 border border-slate-200 transition-all shadow-xs cursor-pointer"
                >
                  <Layers className="w-3.5 h-3.5 text-[#101955]" />
                  <span>📑 Open DICOM PACS Viewer</span>
                </button>

                <button
                  onClick={() => setActiveSubTab("hospital_opinions")}
                  className="px-4 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs flex items-center gap-1.5 border border-blue-200 transition-all cursor-pointer"
                >
                  <Building2 className="w-3.5 h-3.5 text-blue-600" />
                  <span>🏥 View Hospital Opinions</span>
                </button>

                <button
                  onClick={() => setActiveSubTab("quote_builder")}
                  className="px-4 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center gap-1.5 border border-emerald-200 transition-all cursor-pointer"
                >
                  <DollarSign className="w-3.5 h-3.5 text-emerald-700" />
                  <span>💰 Build Package Quotation</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="text-[10px] font-bold text-slate-400 uppercase">Entry Path</div>
                <div className="font-bold text-slate-800 capitalize mt-0.5">
                  {patientCase.entryPath?.replace(/_/g, " ") || "Doctor Referred"}
                </div>
              </div>
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="text-[10px] font-bold text-slate-400 uppercase">Assigned Hospital</div>
                <div className="font-bold text-slate-800 mt-0.5">
                  {patientCase.assignedHospitalId?.replace("hosp_", "").toUpperCase() || "MEDANTA"}
                </div>
              </div>
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="text-[10px] font-bold text-slate-400 uppercase">Assigned Queue</div>
                <div className="font-bold text-slate-800 mt-0.5">
                  {patientCase.assignedQueue || "Cardiology_Tier1"}
                </div>
              </div>
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="text-[10px] font-bold text-slate-400 uppercase">Preferred Contact Time</div>
                <div className="font-bold text-slate-800 mt-0.5">
                  {patientCase.preferredContactTime || "09:00 - 17:00"}
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <h5 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-blue-600" />
                Full Status-Change Audit Timeline
              </h5>
              <div className="space-y-2 max-h-56 overflow-y-auto">
                {[...(patientCase.stageHistory || [])].reverse().map((event, idx) => (
                  <div key={event.id || idx} className="flex items-start gap-3 text-xs">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#2ECDC5] mt-1 shrink-0" />
                    <div className="flex-1">
                      <div className="font-black text-slate-900">
                        {event.fromStage ? STAGE_LABEL_MAP[event.fromStage] : "Lead Created"} →{" "}
                        {STAGE_LABEL_MAP[event.toStage] || event.toStage}
                      </div>
                      <div className="text-slate-500 text-[11px] mt-0.5">
                        {new Date(event.changedAt).toLocaleString("en-US")} ·{" "}
                        <span className="font-bold text-slate-700">{event.changedByName}</span> (
                        {event.changedByRole?.replace(/_/g, " ") || "coordinator"})
                        {event.reason && <span className="text-amber-600 ml-1">· Reason: {event.reason}</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Docs & Scans (DICOM) */}
        {activeSubTab === "docs_scans" && (
          <CSInlineDicomViewer
            patientCase={patientCase}
            onTriggerIncompleteAction={handleTriggerIncompleteAction}
          />
        )}

        {/* Tab 3: Hospital Opinions */}
        {activeSubTab === "hospital_opinions" && (
          <CSHospitalOpinionsTab
            patientCase={patientCase}
            onNavigateToQuote={() => setActiveSubTab("quote_builder")}
            onForwardToPatient={(summary) => {
              setChatPrefillTemplate(summary);
              setActiveSubTab("multichannel_chat");
            }}
          />
        )}

        {/* Tab 4: Multi-Channel Chat */}
        {activeSubTab === "multichannel_chat" && (
          <CSMultiChannelChat
            patientCase={patientCase}
            initialTemplateText={chatPrefillTemplate}
          />
        )}

        {/* Tab 5: Package & Quote Builder */}
        {activeSubTab === "quote_builder" && (
          <CSQuoteBuilderWorkspace patientCase={patientCase} />
        )}

        {/* Tab 6: Visas & Flights Itinerary */}
        {activeSubTab === "visas_concierge" && (
          <CSItineraryWorkspace patientCase={patientCase} />
        )}

        {/* Tab 7: Immutable Consents & Audit */}
        {activeSubTab === "consents_compliance" && (
          <CSConsentsTab patientCase={patientCase} />
        )}
      </div>

      {/* Export PDF Modal */}
      <CSExportPdfModal
        isOpen={exportPdfOpen}
        onClose={() => setExportPdfOpen(false)}
        patientCase={patientCase}
        quoteData={undefined}
      />
    </div>
  );
};
