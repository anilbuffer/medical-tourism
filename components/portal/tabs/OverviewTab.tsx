"use client";

import React, { useState } from "react";
import { PatientCase, PatientDocument, PaymentStage, ConsentRecord } from "@/types/portal";
import { JourneyStepper } from "../JourneyStepper";
import { usePortal } from "@/lib/portal/store";
import {
  Video,
  Play,
  Calendar,
  Clock,
  Building2,
  Stethoscope,
  FileText,
  Upload,
  Layers,
  Lock,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  CreditCard,
  Receipt,
  Download,
  Plane,
  Car,
  MessageSquare,
  Send,
  Volume2,
  Eye,
  RefreshCw,
  Sparkles,
  ChevronRight,
  ExternalLink,
  Phone,
  Check,
  Award,
  Globe,
  Sliders,
  Plus,
} from "lucide-react";
import { VideoConsultationSDKModal } from "../modals/VideoConsultationSDKModal";
import { DicomViewerModal } from "../modals/DicomViewerModal";
import { GovtVisaInvitationModal } from "../modals/GovtVisaInvitationModal";
import { ConsentSignModal } from "../modals/ConsentSignModal";
import { PaymentEscrowModal } from "../modals/PaymentEscrowModal";
import { ReceiptModal } from "../modals/ReceiptModal";
import { WhatsAppContactModal } from "../modals/WhatsAppContactModal";

interface OverviewTabProps {
  patientCase: PatientCase;
  onNavigateTab: (tabId: string) => void;
}

const formatTimeSafe = (timestamp: string) => {
  try {
    const d = new Date(timestamp);
    let hours = d.getHours();
    const minutes = d.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    const strHours = hours.toString().padStart(2, "0");
    return `${strHours}:${minutes} ${ampm}`;
  } catch {
    return "04:30 PM";
  }
};

export const OverviewTab: React.FC<OverviewTabProps> = ({ patientCase, onNavigateTab }) => {
  const { formatCurrency, currency, respondToQuote, sendPortalMessage, uploadDocument } = usePortal();

  // Interactive Modals State
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [dicomModalFileName, setDicomModalFileName] = useState<string | null>(null);
  const [isVisaModalOpen, setIsVisaModalOpen] = useState(false);
  const [selectedConsentToSign, setSelectedConsentToSign] = useState<ConsentRecord | null>(null);
  const [selectedPayStage, setSelectedPayStage] = useState<PaymentStage | null>(null);
  const [selectedReceiptStage, setSelectedReceiptStage] = useState<PaymentStage | null>(null);
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);

  // Quote Action State
  const [quoteDecision, setQuoteDecision] = useState<string>(patientCase.quote?.status || "sent");
  const [isVoicePlaying, setIsVoicePlaying] = useState(false);

  // Message chat quick input
  const [chatMessageText, setChatMessageText] = useState("");

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessageText.trim()) return;
    sendPortalMessage(patientCase.id, chatMessageText.trim());
    setChatMessageText("");
  };

  const handleAcceptQuote = () => {
    respondToQuote(patientCase.id, "accepted");
    setQuoteDecision("accepted");
  };

  const handleDeclineQuote = () => {
    if (confirm("Are you sure you want to decline this quote package?")) {
      respondToQuote(patientCase.id, "declined");
      setQuoteDecision("declined");
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 pb-16">
      {/* ========================================================================= */}
      {/* ROW 1: JOURNEY STEPPER & ACTIVE MILESTONE BANNER                         */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        {/* 1. Visual Case-Status Stepper (Horizontal Progress Bar) */}
        <JourneyStepper
          currentStage={patientCase.stage}
          onNavigateTab={onNavigateTab}
        />

        {/* 2. Priority Action Card (Dynamic Banner) */}
        <div className="bg-gradient-to-r from-[#141d60] via-[#1b2360] to-[#101e76] rounded-3xl p-6 sm:p-7 text-white shadow-xl border border-slate-800 relative overflow-hidden flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          {/* Ambient Glows */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#2ECDC5]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-64 h-64 bg-[#3F4EB4]/25 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-2 relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2ECDC5]/15 border border-[#2ECDC5]/30 text-xs font-black text-[#2ECDC5] backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Active Milestone 05 • Tele-Consultation Room Active</span>
            </div>

            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2.5">
              <span>Your Video Consultation is Confirmed</span>
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            </h1>

            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
              Scheduled for <strong className="text-white font-black">Thursday, Aug 27, 2026 at 03:30 PM (GST)</strong> with <strong className="text-[#2ECDC5] font-black">Dr. Subhash Gupta</strong> (Chief Liver Transplant Surgeon, Max Healthcare / Medanta The Medicity).
            </p>
          </div>

          {/* Action Button: Join Video Room (SDK) */}
          <div className="relative z-10 shrink-0 self-stretch sm:self-auto flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={() => setIsVideoModalOpen(true)}
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-gradient-to-r from-[#2ECDC5] via-[#1baba4] to-[#2abdb5] text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2.5 shadow-xl shadow-[#2ECDC5]/25 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer group"
            >
              <Play className="w-4 h-4 fill-slate-950 group-hover:translate-x-0.5 transition-transform" />
              <span>Join Video Room (SDK)</span>
            </button>
            <span className="text-[10px] text-slate-300 text-center block sm:hidden">
              Active 10 mins before call
            </span>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* ROW 2: MEDICAL DOCUMENTS & CONSENT MANAGEMENT                             */}
      {/* ========================================================================= */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Panel: Document Vault & Report Upload Tracker */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#3F4EB4]/10 text-[#3F4EB4] flex items-center justify-center">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-black text-sm text-slate-900">
                    Document Vault & Report Upload Tracker
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Drag-and-drop support for MRI/CT DICOM files, lab results, and passport scans
                  </p>
                </div>
              </div>

              <button
                onClick={() => onNavigateTab("docs_vault")}
                className="text-xs font-bold text-[#3F4EB4] hover:underline flex items-center gap-1"
              >
                <span>View All</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Document Status Table */}
            <div className="border border-slate-200/80 rounded-2xl overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-200 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
                  <tr>
                    <th className="p-3">Document Name</th>
                    <th className="p-3">Upload Date</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-center">Version</th>
                    <th className="p-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-sans">
                  {/* Doc 1: Abdominal_MRI_Scans.dicom */}
                  <tr className="hover:bg-slate-50/60 transition-colors">
                    <td className="p-3 font-extrabold text-slate-900 flex items-center gap-2">
                      <Layers className="w-3.5 h-3.5 text-[#3F4EB4]" />
                      <span className="truncate max-w-[140px] sm:max-w-[180px]">Abdominal_MRI_Scans.dicom</span>
                    </td>
                    <td className="p-3 text-slate-500">Aug 24, 2026</td>
                    <td className="p-3">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-50 text-emerald-700 border border-emerald-200">
                        🟢 Reviewed
                      </span>
                    </td>
                    <td className="p-3 text-center font-mono font-bold text-slate-600">v1.0</td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => setDicomModalFileName("Abdominal_MRI_Scans.dicom")}
                        className="px-3 py-1 rounded-xl bg-[#2ECDC5] text-slate-950 font-black text-[11px] hover:bg-[#28b8b0] active:scale-95 transition-all cursor-pointer inline-flex items-center gap-1 shadow-xs"
                      >
                        <Eye className="w-3 h-3" />
                        <span>View</span>
                      </button>
                    </td>
                  </tr>

                  {/* Doc 2: Blood_Work_Report.pdf */}
                  <tr className="hover:bg-slate-50/60 transition-colors">
                    <td className="p-3 font-extrabold text-slate-900 flex items-center gap-2">
                      <FileText className="w-3.5 h-3.5 text-amber-600" />
                      <span className="truncate max-w-[140px] sm:max-w-[180px]">Blood_Work_Report.pdf</span>
                    </td>
                    <td className="p-3 text-slate-500">Aug 25, 2026</td>
                    <td className="p-3">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-50 text-amber-800 border border-amber-200 animate-pulse">
                        🟡 Missing Page 2
                      </span>
                    </td>
                    <td className="p-3 text-center font-mono font-bold text-slate-600">v1.1</td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => onNavigateTab("docs_vault")}
                        className="px-2.5 py-1 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-[11px] active:scale-95 transition-all cursor-pointer inline-flex items-center gap-1 shadow-xs"
                      >
                        <RefreshCw className="w-3 h-3" />
                        <span>Re-Upload</span>
                      </button>
                    </td>
                  </tr>

                  {/* Doc 3: Passport_Copy_Patient.pdf */}
                  <tr className="hover:bg-slate-50/60 transition-colors">
                    <td className="p-3 font-extrabold text-slate-900 flex items-center gap-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="truncate max-w-[140px] sm:max-w-[180px]">Passport_Copy_Patient.pdf</span>
                    </td>
                    <td className="p-3 text-slate-500">Aug 25, 2026</td>
                    <td className="p-3">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-50 text-emerald-700 border border-emerald-200">
                        🟢 Verified
                      </span>
                    </td>
                    <td className="p-3 text-center font-mono font-bold text-slate-600">v1.0</td>
                    <td className="p-3 text-right">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-100 text-slate-600 font-extrabold text-[11px] border border-slate-200">
                        <Lock className="w-3 h-3 text-slate-400" />
                        <span>Locked</span>
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div
            onClick={() => onNavigateTab("docs_vault")}
            className="p-3.5 bg-slate-50 hover:bg-slate-100 rounded-2xl border border-dashed border-slate-300 text-center cursor-pointer transition-colors text-xs font-bold text-slate-700 flex items-center justify-center gap-2"
          >
            <Upload className="w-4 h-4 text-[#3F4EB4]" />
            <span>Drop additional MRI/CT scans or lab reports here</span>
          </div>
        </div>

        {/* Right Panel: Immutable Legal Consent Ledger (Append-Only) */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#2ECDC5]/10 text-[#3F4EB4] flex items-center justify-center">
                  <Lock className="w-4 h-4 text-[#3F4EB4]" />
                </div>
                <div>
                  <h3 className="font-black text-sm text-slate-900">
                    Immutable Legal Consent Ledger (Append-Only)
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Verified legal consents captured for this patient (Read-only cryptographic log)
                  </p>
                </div>
              </div>

              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                AUDIT LOGGED
              </span>
            </div>

            {/* Consent Items List */}
            <div className="space-y-2.5 text-xs">
              {/* Item 1: Privacy & Data Processing */}
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-start justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="font-extrabold text-slate-900">Privacy & Data Processing</span>
                  </div>
                  <p className="text-slate-500 text-[11px] pl-6">
                    Accepted on Aug 24, 2026 (v2.1 UK/EU) • Signed via 2FA Token
                  </p>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                  ✓ Verified
                </span>
              </div>

              {/* Item 2: Document Sharing with Hospital */}
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-start justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="font-extrabold text-slate-900">Document Sharing with Hospital</span>
                  </div>
                  <p className="text-slate-500 text-[11px] pl-6">
                    Accepted on Aug 24, 2026 (v1.4) • Medanta Surgical Review Board
                  </p>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                  ✓ Verified
                </span>
              </div>

              {/* Item 3: Tele-Consultation Terms */}
              <div className="p-3 bg-amber-50/50 rounded-2xl border border-amber-200/80 flex items-start justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                    <span className="font-extrabold text-slate-900">Tele-Consultation Terms</span>
                  </div>
                  <p className="text-slate-600 text-[11px] pl-6">
                    ⏳ Pending acceptance prior to joining video call
                  </p>
                </div>
                <button
                  onClick={() => {
                    const teleConsent = patientCase.consents.find(
                      (c) => c.consentType === "tele_consultation_terms"
                    );
                    setSelectedConsentToSign(
                      teleConsent || {
                        id: "cst_tele_01",
                        consentType: "tele_consultation_terms",
                        title: "Tele-Consultation Terms",
                        description: "Cross-border telemedicine advisory scope, limitations of remote audio/video assessment, and diagnostic recommendations.",
                        agreed: false,
                        timestamp: "",
                        ipAddress: "",
                        version: "v2.0",
                      }
                    );
                  }}
                  className="px-3 py-1 rounded-xl bg-gradient-to-r from-[#1d8983] to-[#1baba4] hover:scale-105 active:scale-95 text-white font-black text-[11px] shadow-sm shadow-[#283593]/20 transition-all cursor-pointer shrink-0"
                >
                  Review & Sign
                </button>
              </div>

              {/* Item 4: Payment & Cancellation Terms */}
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-start justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-slate-400 shrink-0" />
                    <span className="font-extrabold text-slate-700">Payment & Cancellation Terms</span>
                  </div>
                  <p className="text-slate-400 text-[11px] pl-6">
                    ⚪ Unlocked at Quote Stage
                  </p>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-500 border border-slate-200 shrink-0">
                  Staged
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-100">
            <span className="flex items-center gap-1 font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              HIPAA / GDPR / DPDP Verified
            </span>
            <button
              onClick={() => onNavigateTab("legal_consents")}
              className="text-[#3F4EB4] font-bold hover:underline"
            >
              Consent History Ledger →
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* ROW 3: SURGICAL QUOTE & FINANCIAL ESCROW                                 */}
      {/* ========================================================================= */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Panel: Surgical Package & Treatment Quote View */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#3F4EB4]/10 text-[#3F4EB4] flex items-center justify-center">
                  <CreditCard className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-black text-sm text-slate-900">
                    Surgical Package & Treatment Quote View
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Converted by CS from doctor's clinical estimate
                  </p>
                </div>
              </div>

              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-[#2ECDC5]/10 text-[#3F4EB4] border border-[#2ECDC5]/30">
                Fixed Estimate
              </span>
            </div>

            {/* Hospital & Procedure Header */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2 text-xs">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">Selected Hospital</span>
                  <strong className="text-slate-900 text-sm font-black">
                    Medanta – The Medicity, Delhi NCR
                  </strong>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">Surgical Team</span>
                  <strong className="text-[#3F4EB4] font-extrabold">Led by Dr. Subhash Gupta</strong>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-2 flex justify-between items-center">
                <span className="text-slate-600 font-medium">Procedure:</span>
                <span className="font-extrabold text-slate-900">Living Donor Liver Transplant (LDLT)</span>
              </div>
            </div>

            {/* Package Breakdown */}
            <div className="space-y-2 text-xs">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                Package Breakdown & Inclusions
              </span>
              <div className="space-y-1.5 font-sans">
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-slate-800">
                    <strong>Hospital Stay: 14 Days</strong> (Private Suite + ICU Isolation)
                  </span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-slate-800">
                    <strong>Surgeon & Anesthesia Fees:</strong> Included
                  </span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-slate-800">
                    <strong>Concierge Inclusions:</strong> 5-Star Executive Apartment for Attendant, Airport VIP Transfer, Dedicated Translator
                  </span>
                </div>
              </div>
            </div>

            {/* Total Amount Ribbon */}
            <div className="p-4 bg-gradient-to-r from-slate-900 to-[#141d60] rounded-2xl text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#2ECDC5] tracking-wider block">
                  Total Quote Amount
                </span>
                <span className="text-2xl font-black">{formatCurrency(28500)}</span>
              </div>
              <span className="text-[11px] text-slate-300 font-bold bg-white/10 px-3 py-1 rounded-xl border border-white/15">
                Multi-Currency
              </span>
            </div>
          </div>

          {/* Action Triggers */}
          <div className="grid grid-cols-3 gap-2 pt-1 border-t border-slate-100">
            <button
              onClick={handleAcceptQuote}
              className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs shadow-md shadow-emerald-600/20 active:scale-95 transition-all cursor-pointer text-center"
            >
              {quoteDecision === "accepted" ? "✓ Accepted" : "Accept Package"}
            </button>

            <button
              onClick={() => onNavigateTab("package_quote")}
              className="py-2.5 px-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors cursor-pointer text-center truncate"
            >
              Modify Package
            </button>

            <button
              onClick={handleDeclineQuote}
              className="py-2.5 px-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs transition-colors cursor-pointer text-center"
            >
              Decline
            </button>
          </div>
        </div>

        {/* Right Panel: Staged Payment & Escrow Status (PCI-DSS Compliant) */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <Receipt className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-black text-sm text-slate-900">
                    STAGED PAYMENT LEDGER (PCI-DSS Compliant)
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Milestone escrow release schedule with independent cancellation terms
                  </p>
                </div>
              </div>

              <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                SSL 256-BIT
              </span>
            </div>

            {/* Staged Payment Table */}
            <div className="border border-slate-200/80 rounded-2xl overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-200 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
                  <tr>
                    <th className="p-3">Stage</th>
                    <th className="p-3">Amount</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Policy Terms</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-sans">
                  {/* Stage 1: Deposit */}
                  <tr className="hover:bg-slate-50/60 transition-colors">
                    <td className="p-3">
                      <strong className="text-slate-900 block">Stage 1: Deposit</strong>
                      <span className="text-slate-400 text-[10px]">(Coordination)</span>
                    </td>
                    <td className="p-3 font-extrabold text-slate-900">{formatCurrency(3000)}</td>
                    <td className="p-3">
                      <button
                        onClick={() => {
                          const depStage = patientCase.payments.find((p) => p.id === "deposit");
                          setSelectedReceiptStage(
                            depStage || {
                              id: "deposit",
                              name: "Stage 1: Deposit (Coordination)",
                              percentage: 10.5,
                              amountUsd: 3000,
                              dueDate: "Completed",
                              status: "completed",
                              cancellationTerms: "Refundable up to 72h before visa processing.",
                              refundPolicy: "100% refundable upon official visa refusal.",
                              receiptNumber: "REC-88421",
                            }
                          );
                        }}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-colors cursor-pointer"
                        title="View Receipt"
                      >
                        🟢 Paid (Receipt #REC-88421)
                      </button>
                    </td>
                    <td className="p-3 text-slate-500 text-[11px] leading-tight">
                      Refundable up to 72h before visa processing
                    </td>
                  </tr>

                  {/* Stage 2: Advance */}
                  <tr className="hover:bg-slate-50/60 transition-colors">
                    <td className="p-3">
                      <strong className="text-slate-900 block">Stage 2: Advance</strong>
                      <span className="text-slate-400 text-[10px]">(Hospital Booking)</span>
                    </td>
                    <td className="p-3 font-extrabold text-slate-900">{formatCurrency(15000)}</td>
                    <td className="p-3">
                      <button
                        onClick={() => {
                          const advStage = patientCase.payments.find((p) => p.id === "advance");
                          setSelectedPayStage(
                            advStage || {
                              id: "advance",
                              name: "Stage 2: Advance (Hospital Booking)",
                              percentage: 52.6,
                              amountUsd: 15000,
                              dueDate: "Upon Package Acceptance",
                              status: "pending",
                              cancellationTerms: "Non-refundable after hospital suite reservation.",
                              refundPolicy: "Held in healthcare escrow.",
                            }
                          );
                        }}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100 transition-colors cursor-pointer"
                      >
                        🟡 Pending (Pay Escrow)
                      </button>
                    </td>
                    <td className="p-3 text-slate-500 text-[11px] leading-tight">
                      Non-refundable after hospital suite reservation
                    </td>
                  </tr>

                  {/* Stage 3: Final Settlement */}
                  <tr className="hover:bg-slate-50/60 transition-colors">
                    <td className="p-3">
                      <strong className="text-slate-900 block">Stage 3: Final</strong>
                      <span className="text-slate-400 text-[10px]">(Settlement)</span>
                    </td>
                    <td className="p-3 font-extrabold text-slate-900">{formatCurrency(10500)}</td>
                    <td className="p-3">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-slate-100 text-slate-600 border border-slate-200">
                        ⚪ Locked
                      </span>
                    </td>
                    <td className="p-3 text-slate-500 text-[11px] leading-tight">
                      Payable upon hospital check-in
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
            <span className="font-bold text-emerald-700 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Escrow Protection Active
            </span>
            <button
              onClick={() => onNavigateTab("payment_escrow")}
              className="text-[#3F4EB4] font-bold hover:underline"
            >
              Full Payment Ledger & Receipts →
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* ROW 4: TRAVEL ITINERARY, MEDICAL VISA & MESSAGES                          */}
      {/* ========================================================================= */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Panel: Consolidated Travel & Visa Checklist */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#3F4EB4]/10 text-[#3F4EB4] flex items-center justify-center">
                  <Plane className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-black text-sm text-slate-900">
                    Consolidated Travel & Visa Checklist
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    e-Medical Visa approval, flight schedule, and Gate 5 VIP arrival protocol
                  </p>
                </div>
              </div>

              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black bg-emerald-50 text-emerald-700 border border-emerald-200">
                🟢 Approved
              </span>
            </div>

            {/* Travel Items Breakdown */}
            <div className="space-y-3 text-xs font-sans">
              <div className="p-3.5 bg-emerald-50/50 rounded-2xl border border-emerald-100 flex items-center justify-between">
                <div>
                  <strong className="text-emerald-950 block text-xs">e-Medical Visa Status: 🟢 Approved</strong>
                  <span className="text-slate-500 text-[11px]">Official MEA Govt Registration MEA/MED/2026/089412</span>
                </div>
                <button
                  onClick={() => setIsVisaModalOpen(true)}
                  className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-[11px] shadow-sm shadow-emerald-600/20 cursor-pointer shrink-0"
                >
                  Download Letter
                </button>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-[10px] uppercase font-bold">Flight Manifest</span>
                  <span className="font-bold text-slate-900">Aug 31, 2026 at 04:15 AM</span>
                </div>
                <p className="font-extrabold text-slate-900">
                  EK-512 (Emirates) | Arriving Indira Gandhi Int'l Airport (DEL)
                </p>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-bold block">On-Ground Arrival Protocol</span>
                <p className="font-bold text-slate-800">
                  Private Chauffeur (Rajesh Varma) meeting at Gate 5 with personalized name sign board.
                </p>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Attendant Information</span>
                <p className="font-bold text-slate-800">
                  1 Escort permitted under e-Medical Attendant Visa (Son Faris Al-Mansoor).
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
            <span className="font-bold text-slate-700">Flight EK-512 Tracking Active</span>
            <button
              onClick={() => onNavigateTab("visa_checklist")}
              className="text-[#3F4EB4] font-bold hover:underline"
            >
              Visa & Logistics Center →
            </button>
          </div>
        </div>

        {/* Right Panel: Secure Communications Center */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
                    alt="Ananya Sharma"
                    className="w-10 h-10 rounded-2xl object-cover ring-2 ring-[#2ECDC5]/60 shadow-md"
                  />
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-white" />
                </div>
                <div>
                  <h3 className="font-black text-sm text-slate-900">
                    Secure Communications Center
                  </h3>
                  <p className="text-[11px] text-[#3F4EB4] font-bold">
                    Direct line with assigned Care Coordinator (Ananya S.)
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsWhatsAppOpen(true)}
                className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-extrabold text-[11px] border border-emerald-200 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </button>
            </div>

            {/* Voice Note Player simulation */}
            <div className="p-3.5 bg-gradient-to-r from-slate-900 to-[#141d60] rounded-2xl text-white space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-[#2ECDC5] font-extrabold flex items-center gap-1.5">
                  <Volume2 className="w-4 h-4" />
                  Voice Note from Ananya Sharma
                </span>
                <span className="text-slate-400 font-mono text-[10px]">0:42 min</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsVoicePlaying(!isVoicePlaying)}
                  className="w-8 h-8 rounded-full bg-[#2ECDC5] text-slate-950 flex items-center justify-center font-bold text-xs hover:bg-[#28b8b0] transition-colors cursor-pointer shrink-0"
                >
                  {isVoicePlaying ? "❚❚" : "▶"}
                </button>
                {/* Audio Waveform Bars */}
                <div className="flex-1 flex items-center gap-1 h-6">
                  {[40, 75, 30, 90, 60, 100, 45, 80, 55, 95, 70, 40, 85, 60, 30].map((height, i) => (
                    <span
                      key={i}
                      className={`flex-1 rounded-full transition-all ${
                        isVoicePlaying ? "bg-[#2ECDC5] animate-pulse" : "bg-slate-600"
                      }`}
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Threaded Message Stream */}
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1 text-xs scrollbar-thin">
              {patientCase.messages.map((msg) => {
                const isFromPatient = msg.senderRole === "patient";
                return (
                  <div
                    key={msg.id}
                    className={`p-3 rounded-2xl border space-y-1 ${
                      isFromPatient
                        ? "bg-[#3F4EB4]/5 border-[#3F4EB4]/20 ml-6"
                        : "bg-slate-50 border-slate-100 mr-6"
                    }`}
                  >
                    <div className="flex justify-between items-center text-[10px]">
                      <strong className={isFromPatient ? "text-[#3F4EB4]" : "text-slate-800"}>
                        {msg.senderName}
                      </strong>
                      <span className="text-slate-400 font-mono" suppressHydrationWarning>
                        {formatTimeSafe(msg.timestamp)}
                      </span>
                    </div>
                    <p className="text-slate-700 leading-relaxed font-sans">{msg.text}</p>
                  </div>
                );
              })}
            </div>

            {/* Send Box */}
            <form onSubmit={handleSendChat} className="flex gap-2 pt-1">
              <input
                type="text"
                value={chatMessageText}
                onChange={(e) => setChatMessageText(e.target.value)}
                placeholder="Message Care Coordinator Ananya..."
                className="flex-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#3F4EB4]"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-[#3F4EB4] hover:bg-[#34429e] text-white rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send</span>
              </button>
            </form>
          </div>

          {/* Clinical Safety Mediation Note */}
          <div className="p-2.5 bg-teal-50/60 rounded-xl border border-teal-100 text-[10px] text-teal-900 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-teal-700 shrink-0" />
            <span>
              <strong>Note:</strong> All communications are mediated through CS to preserve clinical safety and operational continuity.
            </span>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* INTERACTIVE MODALS                                                        */}
      {/* ========================================================================= */}
      {/* Video Consultation SDK Modal */}
      <VideoConsultationSDKModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        patientCase={patientCase}
      />

      {/* DICOM Viewer Modal */}
      {dicomModalFileName && (
        <DicomViewerModal
          isOpen={!!dicomModalFileName}
          onClose={() => setDicomModalFileName(null)}
          fileName={dicomModalFileName}
        />
      )}

      {/* Govt Visa Invitation Letter Modal */}
      <GovtVisaInvitationModal
        isOpen={isVisaModalOpen}
        onClose={() => setIsVisaModalOpen(false)}
        patientCase={patientCase}
      />

      {/* Consent Sign Modal */}
      {selectedConsentToSign && (
        <ConsentSignModal
          isOpen={!!selectedConsentToSign}
          onClose={() => setSelectedConsentToSign(null)}
          caseId={patientCase.id}
          consent={selectedConsentToSign}
        />
      )}

      {/* Escrow Payment Modal */}
      {selectedPayStage && (
        <PaymentEscrowModal
          isOpen={!!selectedPayStage}
          onClose={() => setSelectedPayStage(null)}
          caseId={patientCase.id}
          stage={selectedPayStage}
        />
      )}

      {/* Receipt Modal */}
      {selectedReceiptStage && (
        <ReceiptModal
          isOpen={!!selectedReceiptStage}
          onClose={() => setSelectedReceiptStage(null)}
          patientCase={patientCase}
          stage={selectedReceiptStage}
        />
      )}

      {/* WhatsApp Modal */}
      <WhatsAppContactModal
        isOpen={isWhatsAppOpen}
        onClose={() => setIsWhatsAppOpen(false)}
        patientCase={patientCase}
      />
    </div>
  );
};
