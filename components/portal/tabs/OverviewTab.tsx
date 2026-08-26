"use client";

import React, { useState } from "react";
import { PatientCase } from "@/types/portal";
import { JourneyStepper } from "../JourneyStepper";
import {
  Calendar,
  Clock,
  MapPin,
  MessageSquare,
  DollarSign,
  ChevronRight,
  CheckCircle2,
  FileText,
  AlertTriangle,
  Activity,
  Heart,
  Send,
  X,
  Sparkles,
  ShieldCheck,
  Building2,
  Stethoscope,
  Copy,
  Check,
  UserCheck,
  Plane,
  Lock,
  Video,
  CreditCard,
  HeartHandshake,
  HelpCircle,
  ExternalLink,
} from "lucide-react";

interface OverviewTabProps {
  patientCase: PatientCase;
  onNavigateTab: (tabId: string) => void;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({ patientCase, onNavigateTab }) => {
  const [copiedId, setCopiedId] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<any | null>(null);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  // Extract first name (e.g. "Elena" from "Elena Rostova" or "Robert" from "Robert Vance")
  const firstName = patientCase.patientName.split(" ")[0] || "Patient";

  const handleCopyId = () => {
    navigator.clipboard.writeText(patientCase.id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  // Staged payment calculations
  const totalCost = patientCase.quote?.totalCostUsd || patientCase.payments.reduce((acc, p) => acc + p.amountUsd, 0) || 9800;
  const totalPaid = patientCase.payments
    .filter((p) => p.status === "completed")
    .reduce((acc, p) => acc + p.amountUsd, 0);
  const remainingCost = totalCost - totalPaid;

  // Unsigned consents or pending documents
  const pendingDocsCount = patientCase.documents.filter((d) => d.status === "pending_review" || d.status === "incomplete").length;
  const unreadMessagesCount = patientCase.messages.filter((m) => !m.isRead && m.senderRole !== "patient").length;

  // Activity Feed tailored for International Medical Tourism Lifecycle
  const activityFeed = [
    {
      id: "act-1",
      type: "hospital_eval",
      icon: Stethoscope,
      iconColor: "text-[#2ECDC5]",
      iconBg: "bg-[#2ECDC5]/10",
      title: "Specialist Surgical Board Review Completed",
      timestamp: "Today at 11:30 AM",
      description: `Dr. Naresh Trehan reviewed high-resolution 2D Echocardiogram & Annulus CT. Procedural clearance issued.`,
      details: {
        actor: "Dr. Naresh Trehan (Chief Cardiac Surgeon, Medanta)",
        items: [
          "Aortic valve orifice measurement confirmed: 0.7 cm²",
          "Edwards SAPIEN 3 Ultra 26mm valve pre-selected",
          "Transfemoral vascular approach cleared with minimal risk",
        ],
        notes: "Candidate has optimal arterial caliber. All-inclusive hospital quotation and care itinerary cleared.",
      },
    },
    {
      id: "act-2",
      type: "visa_issued",
      icon: Plane,
      iconColor: "text-[#3F4EB4]",
      iconBg: "bg-[#3F4EB4]/10",
      title: "Official Indian Medical Visa (M-Visa) Invitation Dispatched",
      timestamp: "Yesterday",
      description: "Official Medanta embassy invitation letter generated with MEA registry code VED/MED/2026/8492.",
      details: {
        actor: "Visa & Embassy Clearance Cell",
        items: [
          "M-Visa invitation PDF uploaded to Document Vault",
          "Medical Attendant Visa (MX-Visa) companion clearance included",
          "Indian e-Visa online portal submission instructions provided",
        ],
        notes: "Expedited processing typically completes in 24 to 48 hours for UK & US citizens.",
      },
    },
    {
      id: "act-3",
      type: "escrow_received",
      icon: DollarSign,
      iconColor: "text-emerald-600",
      iconBg: "bg-emerald-50",
      title: "Staged Escrow Milestone Confirmed",
      timestamp: "2 days ago",
      description: `Commitment Deposit ($${patientCase.payments[0]?.amountUsd || 1470} USD) locked in certified healthcare escrow.`,
      details: {
        actor: "Vedara Healthcare Escrow & Finance",
        items: [
          "Staged milestone locked in escrow protection",
          "Official payment receipt REC-2026-08492-01 issued",
          "Refund guarantee active under Visa Denied terms",
        ],
        notes: "Hospital room reservation and surgeon operating theatre slot locked.",
      },
    },
  ];

  const handleSendFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackText.trim()) return;
    setFeedbackSubmitted(true);
    setTimeout(() => {
      setFeedbackSubmitted(false);
      setIsFeedbackOpen(false);
      setFeedbackText("");
    }, 1600);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-12">
      {/* 01. Greeting & Prominent Permanent Patient ID Ribbon */}
      <div className="bg-gradient-to-r from-[#141d60] via-[#1b2360] to-[#101e76] rounded-3xl p-6 sm:p-7 text-white shadow-xl border border-slate-800/80 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        {/* Glow accents */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#2ECDC5]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-64 h-64 bg-[#3F4EB4]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-semibold text-[#2ECDC5] backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Vedara International Care Desk • Tier 1 Fast-Track</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Welcome, <span className="bg-gradient-to-r from-[#2ECDC5] via-[#5ADBD5] to-[#2ECDC5] bg-clip-text text-transparent">{patientCase.patientName}</span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            {patientCase.clinicalSummary.recommendedProcedure || patientCase.treatmentCategory} • {patientCase.patientCountry}
          </p>
        </div>

        {/* Prominent Permanent Patient ID Card */}
        <div className="relative z-10 bg-white/10 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-white/20 shadow-xl flex flex-col items-start sm:items-end gap-2 shrink-0 self-stretch sm:self-auto">
          <div className="text-[10px] uppercase font-extrabold tracking-wider text-slate-300">
            Permanent Patient ID
          </div>
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-xl sm:text-2xl font-black text-[#2ECDC5] tracking-wider">
              {patientCase.id}
            </span>
            <button
              onClick={handleCopyId}
              className="p-2 rounded-xl bg-white/15 hover:bg-white/25 text-white transition-all text-xs flex items-center gap-1 cursor-pointer"
              title="Copy Patient ID"
            >
              {copiedId ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
          <div className="text-[11px] text-slate-300 flex items-center gap-1.5 pt-0.5">
            <span className="w-2 h-2 rounded-full bg-[#2ECDC5] animate-pulse" />
            <span>SLA: 45m Response • Queue: {patientCase.assignedQueue}</span>
          </div>
        </div>
      </div>

      {/* 02. Visual 10-Stage Case-Status Stepper Component */}
      <JourneyStepper
        currentStage={patientCase.stage}
        onNavigateTab={onNavigateTab}
      />

      {/* 03. 4 Quick Summary Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Assigned Hospital & Specialist */}
        <div
          onClick={() => onNavigateTab("consultation")}
          className="bg-white/95 backdrop-blur-xl rounded-2xl p-5 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-[#3F4EB4]/40 transition-all duration-300 flex items-center justify-between cursor-pointer group"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-[#3F4EB4]/10 text-[#3F4EB4] border border-[#3F4EB4]/20 flex items-center justify-center shrink-0">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-medium text-slate-500">Hospital & Doctor</div>
              <div className="text-sm font-extrabold text-slate-900 truncate max-w-[130px]">
                {patientCase.consultation?.doctorName || "Dr. Naresh Trehan"}
              </div>
              <div className="text-[11px] font-semibold text-[#3F4EB4] truncate max-w-[130px]">
                Medanta The Medicity
              </div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#3F4EB4] group-hover:translate-x-0.5 transition-all" />
        </div>

        {/* Card 2: Document Vault Status */}
        <div
          onClick={() => onNavigateTab("documents")}
          className="bg-white/95 backdrop-blur-xl rounded-2xl p-5 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-[#2ECDC5]/50 transition-all duration-300 flex items-center justify-between cursor-pointer group relative"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-[#2ECDC5]/10 text-[#3F4EB4] border border-[#2ECDC5]/20 flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5 text-[#3F4EB4]" />
            </div>
            <div>
              <div className="text-xs font-medium text-slate-500">Document Vault</div>
              <div className="text-sm font-extrabold text-slate-900">
                {patientCase.documents.length} Records Uploaded
              </div>
              <div className="text-[11px] font-semibold text-[#2ECDC5]">
                {pendingDocsCount > 0 ? `${pendingDocsCount} Pending Review` : "All Verified"}
              </div>
            </div>
          </div>
          {pendingDocsCount > 0 && (
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500 ring-2 ring-white" />
          )}
        </div>

        {/* Card 3: Staged Payment & Escrow */}
        <div
          onClick={() => onNavigateTab("payments")}
          className="bg-white/95 backdrop-blur-xl rounded-2xl p-5 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-emerald-300 transition-all duration-300 flex items-center justify-between cursor-pointer group"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center justify-center shrink-0">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-medium text-slate-500">Escrow Payments</div>
              <div className="text-sm font-extrabold text-slate-900">
                ${totalPaid.toLocaleString()} Paid
              </div>
              <div className="text-[11px] font-semibold text-emerald-700">
                ${remainingCost.toLocaleString()} Remaining
              </div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-700 group-hover:translate-x-0.5 transition-all" />
        </div>

        {/* Card 4: Messages & Coordinator */}
        <div
          onClick={() => onNavigateTab("messages")}
          className="bg-white/95 backdrop-blur-xl rounded-2xl p-5 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-[#3F4EB4]/40 transition-all duration-300 flex items-center justify-between cursor-pointer group relative"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-[#3F4EB4]/10 text-[#283593] border border-[#3F4EB4]/20 flex items-center justify-center shrink-0">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-medium text-slate-500">Care Coordinator</div>
              <div className="text-sm font-extrabold text-slate-900">
                {patientCase.assignedCoordinatorName || "Aisha Khan"}
              </div>
              <div className="text-[11px] font-semibold text-[#2ECDC5]">
                {unreadMessagesCount > 0 ? `${unreadMessagesCount} Unread Msg` : "Online • Ready to Assist"}
              </div>
            </div>
          </div>
          {unreadMessagesCount > 0 && (
            <div className="w-2.5 h-2.5 rounded-full bg-[#2ECDC5] shadow-xs ring-2 ring-white" />
          )}
        </div>
      </div>

      {/* 04. Two-Column Layout: Clinical Summary & Upcoming Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (Wide ~65%): Clinical Case Brief & Activity Stream */}
        <div className="lg:col-span-2 space-y-6">
          {/* Clinical Diagnostic Case Brief Card */}
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Stethoscope className="w-5 h-5 text-[#3F4EB4]" />
                <h2 className="text-base font-extrabold text-slate-900">Clinical Case Summary</h2>
              </div>
              <span className="text-xs font-bold text-[#3F4EB4] bg-[#3F4EB4]/10 px-3 py-1 rounded-full border border-[#3F4EB4]/20">
                JCI Board Evaluated
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 bg-slate-50/80 rounded-2xl border border-slate-100 space-y-1">
                <span className="text-slate-500 font-medium">Chief Complaint</span>
                <p className="font-extrabold text-slate-900 leading-relaxed">
                  {patientCase.clinicalSummary.chiefComplaint}
                </p>
              </div>

              <div className="p-3.5 bg-slate-50/80 rounded-2xl border border-slate-100 space-y-1">
                <span className="text-slate-500 font-medium">Primary Clinical Diagnosis</span>
                <p className="font-extrabold text-slate-900 leading-relaxed">
                  {patientCase.clinicalSummary.diagnosis}
                </p>
              </div>

              <div className="p-3.5 bg-teal-50/60 rounded-2xl border border-teal-100 space-y-1 sm:col-span-2">
                <span className="text-teal-800 font-bold uppercase tracking-wider text-[10px]">
                  Recommended Procedure & Target Hospital
                </span>
                <p className="font-black text-slate-900 text-sm">
                  {patientCase.clinicalSummary.recommendedProcedure} — Medanta The Medicity (Dr. Naresh Trehan)
                </p>
              </div>
            </div>
          </div>

          {/* Recent Journey Activity Stream */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-1">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#3F4EB4]" />
                <h2 className="text-base font-extrabold text-slate-900">Journey Progress & Clinical Activity</h2>
              </div>
            </div>

            <div className="space-y-3">
              {activityFeed.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.id}
                    className="bg-white/95 backdrop-blur-xl rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-slate-300 transition-all duration-300"
                  >
                    <div className="flex items-start gap-3.5">
                      <div className={`w-10 h-10 rounded-2xl ${item.iconBg} ${item.iconColor} flex items-center justify-center shrink-0 mt-0.5`}>
                        <Icon className="w-5 h-5" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="text-sm font-extrabold text-slate-900">{item.title}</h3>
                          <span className="text-xs text-slate-400 whitespace-nowrap">{item.timestamp}</span>
                        </div>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">{item.description}</p>
                        <button
                          onClick={() => setSelectedActivity(item)}
                          className="inline-flex items-center gap-1 text-xs font-bold text-[#3F4EB4] hover:text-[#283593] mt-2.5 transition-colors cursor-pointer"
                        >
                          <span>View full details</span>
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column (~35%): Care Team & Quick Next Steps */}
        <div className="space-y-6">
          {/* Next Key Action Card */}
          <div className="bg-gradient-to-br from-[#141d60] via-[#1b2360] to-[#101e76] rounded-3xl p-6 text-white shadow-xl border border-slate-800/80 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-[#2ECDC5] uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Next Immediate Milestone</span>
            </div>

            <h3 className="text-lg font-black text-white">
              {patientCase.stage === "lead" || patientCase.stage === "contacted"
                ? "Upload Your Diagnostic Records"
                : patientCase.stage === "documents_collected"
                  ? "Join Scheduled Tele-Consultation"
                  : patientCase.stage === "consultation"
                    ? "Review Itemized Package Quote"
                    : patientCase.stage === "quote"
                      ? "Accept Quote & Pay Commitment Deposit"
                      : patientCase.stage === "payment"
                        ? "Download Indian M-Visa Invitation"
                        : patientCase.stage === "booking"
                          ? "Prepare Departure & Airport Chauffeur Meet"
                          : "Log Post-Op Recovery Status"}
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed">
              {patientCase.stage === "booking"
                ? "Your flight arrival at Delhi Terminal 3 is scheduled for Sept 1st. Chauffeur Sandeep Sharma is assigned."
                : "Keep your care journey on fast-track by completing the active stage."}
            </p>

            <button
              onClick={() => {
                if (patientCase.stage === "quote") onNavigateTab("quote");
                else if (patientCase.stage === "payment") onNavigateTab("payments");
                else if (patientCase.stage === "booking") onNavigateTab("booking");
                else if (patientCase.stage === "consultation") onNavigateTab("consultation");
                else onNavigateTab("documents");
              }}
              className="w-full py-3 rounded-2xl  bg-gradient-to-r from-[#1d8983] via-[#1baba4] to-[#1d8983] text-white font-extrabold text-xs shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>View Milestone Details</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Assigned Care Team Card */}
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] space-y-4">
            <h3 className="font-extrabold text-slate-900 text-base">Your Dedicated Care Team</h3>

            {/* Coordinator Aisha Khan */}
            <div className="flex items-center justify-between p-3.5 bg-slate-50/80 rounded-2xl border border-slate-100 hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-[#2ECDC5]/40 shadow-xs">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
                    alt="Aisha Khan"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#2ECDC5] rounded-full ring-2 ring-white" />
                </div>
                <div>
                  <div className="text-xs font-black text-slate-900">Aisha Khan</div>
                  <div className="text-[11px] text-[#2ECDC5] font-semibold">Lead International Coordinator</div>
                </div>
              </div>

              <button
                onClick={() => onNavigateTab("messages")}
                className="w-8 h-8 rounded-xl bg-[#2ECDC5]/10 text-[#3F4EB4] hover:bg-[#2ECDC5] hover:text-slate-950 flex items-center justify-center transition-all cursor-pointer"
                title="Message Aisha"
              >
                <MessageSquare className="w-4 h-4" />
              </button>
            </div>

            {/* Chief Surgeon Dr. Naresh Trehan */}
            <div className="flex items-center justify-between p-3.5 bg-slate-50/80 rounded-2xl border border-slate-100 hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-[#3F4EB4]/40 shadow-xs">
                  <img
                    src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80"
                    alt="Dr. Naresh Trehan"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#2ECDC5] rounded-full ring-2 ring-white" />
                </div>
                <div>
                  <div className="text-xs font-black text-slate-900">Dr. Naresh Trehan</div>
                  <div className="text-[11px] text-[#3F4EB4] font-semibold">Chief Cardiac Surgeon & Chairman</div>
                </div>
              </div>

              <button
                onClick={() => onNavigateTab("consultation")}
                className="w-8 h-8 rounded-xl bg-[#3F4EB4]/10 text-[#283593] hover:bg-[#283593] hover:text-white flex items-center justify-center transition-all cursor-pointer"
                title="View Consultation Room"
              >
                <Video className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Bottom Right "Give Feedback" Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsFeedbackOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-full  bg-gradient-to-r from-[#1d8983] via-[#1baba4] to-[#1d8983] text-white font-bold text-xs shadow-xl shadow-[#283593]/35 hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          <MessageSquare className="w-4 h-4 text-amber-300" />
          <span>Care Feedback</span>
        </button>
      </div>

      {/* Activity Details Modal */}
      {selectedActivity && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className={`w-8 h-8 rounded-xl ${selectedActivity.iconBg} ${selectedActivity.iconColor} flex items-center justify-center`}>
                  {React.createElement(selectedActivity.icon, { className: "w-4 h-4" })}
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900">{selectedActivity.title}</h3>
                  <p className="text-[11px] text-slate-400">{selectedActivity.timestamp}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedActivity(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-2xl">
                <span className="text-slate-500 font-medium">Logged By / Actor:</span>
                <p className="font-bold text-slate-900 mt-0.5">{selectedActivity.details.actor}</p>
              </div>

              <div>
                <span className="text-slate-500 font-medium">Verified Actions:</span>
                <ul className="mt-1.5 space-y-1">
                  {selectedActivity.details.items.map((item: string, i: number) => (
                    <li key={i} className="flex items-center gap-2 text-slate-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2ECDC5]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3 bg-[#2ECDC5]/10 border border-[#2ECDC5]/20 rounded-2xl">
                <span className="text-[#3F4EB4] font-bold">Clinical Care Note:</span>
                <p className="text-slate-700 mt-0.5">{selectedActivity.details.notes}</p>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setSelectedActivity(null)}
                className="w-full py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Give Feedback Modal */}
      {isFeedbackOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#2ECDC5]/15 text-[#3F4EB4] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-[#3F4EB4]" />
                </div>
                <h3 className="text-sm font-extrabold text-slate-900">Share Your Care Feedback</h3>
              </div>
              <button
                onClick={() => setIsFeedbackOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {feedbackSubmitted ? (
              <div className="p-6 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-[#2ECDC5] mx-auto animate-bounce" />
                <p className="text-sm font-extrabold text-slate-900">Thank You for Your Feedback!</p>
                <p className="text-xs text-slate-500">Your care coordinator Aisha Khan and hospital surgical team have received your note.</p>
              </div>
            ) : (
              <form onSubmit={handleSendFeedback} className="space-y-3">
                <p className="text-xs text-slate-600 leading-relaxed">
                  How was your experience with your treatment consultation and care team? Your feedback directly helps us ensure the highest standard of international medical care.
                </p>
                <textarea
                  rows={4}
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  placeholder="Type your feedback or request here..."
                  className="w-full p-3 rounded-2xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#2ECDC5] resize-none"
                  required
                />
                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsFeedbackOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl  bg-gradient-to-r from-[#1d8983] via-[#1baba4] to-[#1d8983] text-white text-xs font-bold shadow-md shadow-[#283593]/30 flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Feedback</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
