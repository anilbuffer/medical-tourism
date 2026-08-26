"use client";

import React, { useState } from "react";
import { PatientCase, PortalUser, AdminTab } from "@/types/portal";
import {
  Layers,
  Clock,
  AlertTriangle,
  UserCheck,
  Building2,
  Globe,
  Wallet,
  ShieldCheck,
  TrendingUp,
  Activity,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Lock,
  FileText,
  DollarSign,
  CheckCircle2,
  Plus,
  Sliders,
  Download,
  Zap,
  X,
  Search,
  ChevronRight,
  BarChart3,
  Star,
  ShieldAlert,
  ArrowUpRight,
  AlertCircle,
  Users,
  MapPin,
  Bot,
} from "lucide-react";

interface AdminDashboardOverviewProps {
  cases: PatientCase[];
  currentUser: PortalUser | null;
  onNavigateTab: (tab: AdminTab) => void;
  onResetDemoData: () => void;
}

export const AdminDashboardOverview: React.FC<AdminDashboardOverviewProps> = ({
  cases,
  currentUser,
  onNavigateTab,
  onResetDemoData,
}) => {
  const [activeChartDay, setActiveChartDay] = useState<string>("Wed");
  const [quickActionOpen, setQuickActionOpen] = useState(false);
  const [actionNotif, setActionNotif] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setActionNotif(msg);
    setTimeout(() => {
      setActionNotif(null);
    }, 4000);
  };

  // Row 1: 8 Metric Cards Data (Styled like top horizontal card ribbon)
  const metricCards = [
    {
      id: "active_pipeline",
      title: "Active Pipeline",
      currentValue: "1,420",
      unit: "cases",
      target: "N/A",
      delta: "+14% vs last week",
      deltaType: "success",
      icon: Layers,
      iconBg: "bg-teal-50 text-[#1baba4]",
      tab: "case_master_directory" as AdminTab,
    },
    {
      id: "unassigned_queue",
      title: "Intake Queue",
      currentValue: "38",
      unit: "leads",
      target: "< 50",
      delta: "32m SLA timer",
      deltaType: "warning",
      icon: Clock,
      iconBg: "bg-amber-50 text-amber-600",
      tab: "case_master_directory" as AdminTab,
    },
    {
      id: "sla_compliance",
      title: "SLA Compliance",
      currentValue: "96.8%",
      unit: "",
      target: "> 98%",
      delta: "12 cases breached",
      deltaType: "danger",
      icon: AlertTriangle,
      iconBg: "bg-rose-50 text-rose-600",
      tab: "sla_escalation_engine" as AdminTab,
    },
    {
      id: "cs_triage",
      title: "CS Triage Speed",
      currentValue: "22",
      unit: "mins",
      target: "< 30m",
      delta: "Target met",
      deltaType: "success",
      icon: UserCheck,
      iconBg: "bg-blue-50 text-[#3F4EB4]",
      tab: "internal_staff" as AdminTab,
    },
    {
      id: "hospital_review",
      title: "Hospital Review",
      currentValue: "4.2",
      unit: "hrs",
      target: "< 12h",
      delta: "Operational",
      deltaType: "success",
      icon: Building2,
      iconBg: "bg-purple-50 text-purple-600",
      tab: "hospital_doctors" as AdminTab,
    },
    {
      id: "visas_issued",
      title: "Visas Issued (24h)",
      currentValue: "19",
      unit: "cleared",
      target: "100%",
      delta: "0 delays (100%)",
      deltaType: "success",
      icon: Globe,
      iconBg: "bg-emerald-50 text-emerald-600",
      tab: "visa_rules" as AdminTab,
    },
    {
      id: "escrow_funds",
      title: "Escrow Funds",
      currentValue: "$1.82M",
      unit: "USD",
      target: "Multi-Sig",
      delta: "PCI-DSS active",
      deltaType: "success",
      icon: Wallet,
      iconBg: "bg-teal-50 text-[#1baba4]",
      tab: "gateway_escrow" as AdminTab,
    },
    {
      id: "audit_score",
      title: "Audit Score",
      currentValue: "100%",
      unit: "",
      target: "Append-Only",
      delta: "Immutable active",
      deltaType: "success",
      icon: ShieldCheck,
      iconBg: "bg-slate-100 text-slate-700",
      tab: "system_audit_trail" as AdminTab,
    },
  ];

  // Funnel Chart Weekly Velocity Data
  const chartDays = [
    { day: "Mon", leads: 120, docs: 82, hospital: 52, booked: 28 },
    { day: "Tue", leads: 145, docs: 98, hospital: 64, booked: 36 },
    { day: "Wed", leads: 138, docs: 92, hospital: 60, booked: 32 },
    { day: "Thu", leads: 160, docs: 108, hospital: 71, booked: 40 },
    { day: "Fri", leads: 152, docs: 102, hospital: 68, booked: 39 },
    { day: "Sat", leads: 98, docs: 65, hospital: 42, booked: 24 },
    { day: "Sun", leads: 85, docs: 58, hospital: 38, booked: 21 },
  ];

  // SLA Exceptions Data
  const [slaExceptions, setSlaExceptions] = useState([
    {
      id: "PT-2026-0412",
      market: "London, UK",
      source: "Google",
      journey: "Document Collection",
      wait: ">45 mins wait",
      delayedStep: "CS Intake Lead",
      assignedTo: "Unassigned",
      actionText: "Re-Assign Lead",
      resolved: false,
    },
    {
      id: "PT-2026-0389",
      market: "Dubai, UAE",
      source: "Direct",
      journey: "Hospital Handover",
      wait: ">26 hrs at Apollo",
      delayedStep: "Medical Review",
      assignedTo: "Dr. S. Gupta",
      actionText: "Ping Liaison",
      resolved: false,
    },
    {
      id: "PT-2026-0294",
      market: "Nairobi, Kenya",
      source: "WhatsApp",
      journey: "Staged Payment",
      wait: "Stalled 3 days",
      delayedStep: "Escrow Deposit Verification",
      assignedTo: "Finance Team",
      actionText: "Send Nudge",
      resolved: false,
    },
    {
      id: "PT-2026-0182",
      market: "Lagos, Nigeria",
      source: "Referral",
      journey: "Medical Visa Clearance",
      wait: ">48 hrs wait",
      delayedStep: "Embassy Medical Letter",
      assignedTo: "Visa Desk",
      actionText: "Fast-Track",
      resolved: false,
    },
  ]);

  const handleSlaAction = (id: string, actionName: string) => {
    setSlaExceptions((prev) =>
      prev.map((item) => (item.id === id ? { ...item, resolved: true } : item))
    );
    showNotification(`Triggered "${actionName}" for Case ${id}. Lead coordinator dispatched.`);
  };

  const handleExportAudit = () => {
    const csvContent =
      "Timestamp,Case ID,Actor,Role,Action,Details\n" +
      "2026-08-26 11:18 AM,PT-2026-00481,Sarah M.,customer_support,CASE_TRANSFERRED,Transferred to Apollo Hospital Desk\n" +
      "2026-08-26 11:05 AM,PT-2026-00479,System Cron,system,CONSENT_RECORDED,Event Type 2 Document Sharing Kenya\n" +
      "2026-08-26 10:45 AM,GLOBAL,Rajesh Verma,super_admin,RULES_UPDATED,Updated UK e-Medical Visa Matrix v3.2\n" +
      "2026-08-26 10:12 AM,PT-2026-00210,David Miller,finance_accounts,REFUND_EXECUTED,Executed partial refund $1200 Stage 1 Policy\n";

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `vedara_audit_export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showNotification("Immutable audit log exported successfully.");
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-16 font-sans">
      {/* Toast Notification */}
      {actionNotif && (
        <div className="fixed top-24 right-6 z-50 bg-white text-slate-900 px-4 py-3 rounded-2xl shadow-xl border border-slate-200 flex items-center gap-3 animate-in slide-in-from-top-4 duration-200">
          <div className="w-6 h-6 rounded-full bg-teal-50 text-[#1baba4] flex items-center justify-center shrink-0 border border-teal-200">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <span className="text-xs font-semibold text-slate-800">{actionNotif}</span>
          <button
            onClick={() => setActionNotif(null)}
            className="text-slate-400 hover:text-slate-700 p-1 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* TOP HEADER & GREETING BAR (Exact Reference Styling) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Good morning, {currentUser?.name || "Rajesh Verma"}!
          </h1>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Wednesday, August 26, 2026 • Real-Time Enterprise Governance & Cross-Border Telemetry
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
          <button
            onClick={() => onNavigateTab("internal_staff")}
            className="px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200/80 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <MapPin className="w-3.5 h-3.5 text-[#1baba4]" />
            <span>Track Care Teams</span>
          </button>
          <button
            onClick={() => onNavigateTab("case_master_directory")}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#1d8983] via-[#1baba4] to-[#1d8983] hover:opacity-95 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm hover:scale-[1.02]"
          >
            <Bot className="w-3.5 h-3.5 text-white" />
            <span>AI Briefing</span>
          </button>
          <button
            onClick={onResetDemoData}
            className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-900 border border-slate-200/80 transition-all cursor-pointer shadow-xs"
            title="Reset demo data"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ROW 1: METRIC CARD RIBBON (8 Clean Minimalist Cards in 8-Col Grid) */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
        {metricCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              onClick={() => onNavigateTab(card.tab)}
              className="bg-white rounded-2xl p-3.5 border border-slate-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-md hover:border-[#1baba4]/40 transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div className="flex items-start justify-between gap-1">
                <span className="text-[11px] font-semibold text-slate-500 leading-tight">
                  {card.title}
                </span>
                <div
                  className={`w-6 h-6 rounded-lg ${card.iconBg} flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}
                >
                  <Icon className="w-3 h-3" />
                </div>
              </div>

              <div className="mt-2.5">
                <div className="text-lg font-extrabold text-slate-900 leading-none">
                  {card.currentValue}{" "}
                  {card.unit && (
                    <span className="text-[10px] font-normal text-slate-400">
                      {card.unit}
                    </span>
                  )}
                </div>
                <div className="mt-1.5 flex items-center text-[10px] font-semibold">
                  <span
                    className={
                      card.deltaType === "danger"
                        ? "text-rose-600 font-bold"
                        : card.deltaType === "warning"
                        ? "text-amber-600 font-bold"
                        : "text-emerald-700"
                    }
                  >
                    {card.delta}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ROW 2: VISUAL ANALYTICS & SATISFACTION (2:1 Grid Like Reference) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left 2 Cols: Visits & Funnel Velocity */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-900">
                  Global Patient Journey & Conversion Velocity
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px] border border-emerald-200">
                  96% Target Velocity
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Intake volume through consultation, quote, and surgical escrow deposits.
              </p>
            </div>

            {/* Day Selector */}
            <div className="flex items-center bg-slate-50 p-1 rounded-xl border border-slate-200/60 gap-1">
              {chartDays.map((d) => (
                <button
                  key={d.day}
                  onClick={() => setActiveChartDay(d.day)}
                  className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                    activeChartDay === d.day
                      ? "bg-white text-slate-900 shadow-xs border border-slate-200/60"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  {d.day}
                </button>
              ))}
            </div>
          </div>

          {/* Bar Chart Canvas with Enhanced Harmonious Palette */}
          <div className="bg-slate-50/50 rounded-2xl p-4 border border-slate-100">
            <div className="grid grid-cols-7 gap-3 items-end h-44 pt-2">
              {chartDays.map((d) => {
                const isSelected = activeChartDay === d.day;
                return (
                  <div
                    key={d.day}
                    onClick={() => setActiveChartDay(d.day)}
                    className={`flex flex-col items-center gap-2 cursor-pointer p-2 rounded-xl transition-all ${
                      isSelected
                        ? "bg-white shadow-sm ring-1 ring-[#1baba4] border border-slate-200"
                        : "hover:bg-white/60"
                    }`}
                  >
                    <div className="w-full flex items-end justify-center gap-1.5 h-32">
                      {/* Series 1: Incoming Leads (Soft Neutral Slate) */}
                      <div
                        className="w-2.5 sm:w-3 bg-slate-300/80 hover:bg-slate-400 rounded-t-md transition-all"
                        style={{ height: `${(d.leads / 170) * 100}%` }}
                        title={`Incoming Leads: ${d.leads}`}
                      />
                      {/* Series 2: Docs Uploaded (Primary Cyan Teal) */}
                      <div
                        className="w-2.5 sm:w-3 bg-[#1baba4] hover:bg-[#189b94] rounded-t-md transition-all shadow-xs"
                        style={{ height: `${(d.docs / 170) * 100}%` }}
                        title={`Docs Uploaded: ${d.docs}`}
                      />
                      {/* Series 3: Hospital Accepted (Royal Indigo) */}
                      <div
                        className="w-2.5 sm:w-3 bg-[#3F4EB4] hover:bg-[#33409a] rounded-t-md transition-all shadow-xs"
                        style={{ height: `${(d.hospital / 170) * 100}%` }}
                        title={`Hospital Accepted: ${d.hospital}`}
                      />
                      {/* Series 4: Booked & Deposited (Deep Emerald Mint) */}
                      <div
                        className="w-2.5 sm:w-3 bg-emerald-600 hover:bg-emerald-700 rounded-t-md transition-all shadow-xs"
                        style={{ height: `${(d.booked / 170) * 100}%` }}
                        title={`Booked & Deposited: ${d.booked}`}
                      />
                    </div>
                    <span
                      className={`text-[11px] font-bold ${
                        isSelected ? "text-[#1baba4]" : "text-slate-500"
                      }`}
                    >
                      {d.day}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Harmonious Legend Bar */}
            <div className="flex items-center justify-center gap-4 text-[10px] font-semibold text-slate-600 pt-3 border-t border-slate-200/60 mt-3 flex-wrap">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-slate-300/80" /> Incoming Leads
              </span>
              <span className="flex items-center gap-1.5 font-bold text-slate-800">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#1baba4]" /> Docs Uploaded
              </span>
              <span className="flex items-center gap-1.5 font-bold text-slate-800">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#3F4EB4]" /> Hospital Accepted
              </span>
              <span className="flex items-center gap-1.5 font-bold text-slate-800">
                <span className="w-2.5 h-2.5 rounded-sm bg-emerald-600" /> Booked & Deposited
              </span>
            </div>
          </div>

          {/* Conversion Insights Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
              <span className="text-[10px] font-bold text-slate-400 uppercase">
                Lead ➔ Contacted
              </span>
              <div className="text-base font-extrabold text-slate-900 mt-0.5">88%</div>
              <div className="text-[10px] text-emerald-700 font-semibold mt-0.5">
                ✓ First-response under 22m
              </div>
            </div>

            <div className="p-3 bg-amber-50/60 rounded-2xl border border-amber-200/80">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-amber-900 uppercase">
                  Contacted ➔ Doc Uploaded
                </span>
                <span className="text-[9px] font-extrabold text-rose-700 bg-rose-100 px-1.5 py-0.2 rounded">
                  Drop-off
                </span>
              </div>
              <div className="text-base font-extrabold text-amber-950 mt-0.5">64%</div>
              <div className="text-[10px] text-amber-800 font-medium mt-0.5">
                Automated WhatsApp nudges queued
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
              <span className="text-[10px] font-bold text-slate-400 uppercase">
                Hospital Accepted ➔ Deposit
              </span>
              <div className="text-base font-extrabold text-slate-900 mt-0.5">41%</div>
              <div className="text-[10px] text-[#3F4EB4] font-semibold mt-0.5">
                Escrow Conversion Ratio
              </div>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Patient Satisfaction & Quality (Exact Gauge from Reference) */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">
              Patient Satisfaction & Quality
            </h3>
            <button
              onClick={() => onNavigateTab("system_audit_trail")}
              className="text-xs font-semibold text-[#1baba4] hover:underline cursor-pointer"
            >
              View all →
            </button>
          </div>

          {/* Radial Semi-Circle Arc Gauge (Speedometer Arc matching reference) */}
          <div className="flex flex-col items-center justify-center p-5 bg-slate-50/50 rounded-2xl border border-slate-100">
            <div className="relative w-48 h-28 flex items-center justify-center">
              <svg className="w-48 h-28" viewBox="0 0 160 95">
                {/* Background Track Arc */}
                <path
                  d="M 18 82 A 62 62 0 0 1 142 82"
                  fill="none"
                  stroke="#E2E8F0"
                  strokeWidth="11"
                  strokeLinecap="round"
                />
                {/* Value Track Arc (4.85 / 5.0 -> 97% progress) */}
                <path
                  d="M 18 82 A 62 62 0 0 1 142 82"
                  fill="none"
                  stroke="#1baba4"
                  strokeWidth="11"
                  strokeLinecap="round"
                  strokeDasharray="194.8"
                  strokeDashoffset="5.8"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              {/* Centered Rating Text inside the Arch */}
              <div className="absolute top-7 flex flex-col items-center justify-center text-center select-none">
                <span className="text-3xl font-black text-slate-900 tracking-tight leading-none">
                  4.85
                </span>
                <div className="flex items-center gap-1 text-amber-400 mt-1.5">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                </div>
                <span className="text-[11px] font-semibold text-slate-400 mt-1">out of 5.0</span>
              </div>
            </div>
          </div>

          {/* Component Progress Bars */}
          <div className="space-y-2.5 text-xs">
            <div>
              <div className="flex justify-between font-semibold text-slate-700 text-[11px] mb-1">
                <span>CS Empathy & Response Speed</span>
                <span className="font-bold text-slate-900">4.9</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                <div className="bg-[#1baba4] h-1.5 rounded-full" style={{ width: "98%" }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold text-slate-700 text-[11px] mb-1">
                <span>Hospital Clinical Response Time</span>
                <span className="font-bold text-slate-900">4.6</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: "92%" }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold text-slate-700 text-[11px] mb-1">
                <span>On-Ground Concierge & Transport</span>
                <span className="font-bold text-slate-900">4.9</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: "98%" }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ROW 3: SLA EXCEPTIONS & REVENUE LEAKAGE (Reference Style) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Left Panel: SLA Compliance & Active Exceptions */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">
              SLA Response Compliance
            </h3>
            <button
              onClick={() => onNavigateTab("sla_escalation_engine")}
              className="text-xs font-semibold text-[#1baba4] hover:underline"
            >
              Exceptions →
            </button>
          </div>

          <div className="flex items-center gap-4 p-3.5 bg-rose-50/60 rounded-2xl border border-rose-200/70">
            <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-rose-200"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-rose-500"
                  strokeDasharray="96.8, 100"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute text-xs font-black text-rose-700">96.8%</span>
            </div>
            <div>
              <div className="text-xs font-bold text-rose-950 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
                14 Cases At Risk Exceeding Limits
              </div>
              <p className="text-[11px] text-rose-800 mt-0.5">
                Unassigned queue delays may affect patient booking conversions.
              </p>
            </div>
          </div>

          {/* Exceptions Table */}
          <div className="space-y-2 text-xs">
            <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider block">
              High-Priority Action Exceptions
            </span>

            {slaExceptions.map((item) => (
              <div
                key={item.id}
                className="p-3 bg-slate-50/80 hover:bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center justify-between gap-3 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-[#3F4EB4] text-xs">
                      {item.id}
                    </span>
                    <span className="font-semibold text-slate-800 text-xs">
                      {item.market} ({item.source})
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    {item.journey} • <strong className="text-amber-800">{item.wait}</strong>
                  </div>
                </div>

                <div>
                  {item.resolved ? (
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-xl">
                      ✓ Escalated
                    </span>
                  ) : (
                    <button
                      onClick={() => handleSlaAction(item.id, item.actionText)}
                      className="px-2.5 py-1 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-950 font-bold text-[10px] border border-amber-300 transition-all cursor-pointer"
                    >
                      {item.actionText}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel: Revenue Leakage & Delay Offenders */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                Cost Leakage
              </span>
              <h3 className="text-sm font-bold text-slate-900 mt-1">
                Stalled Cases & Risk Exposure
              </h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">P0 Monitor</span>
          </div>

          <div className="p-4 bg-rose-50/40 rounded-2xl border border-rose-100">
            <div className="text-2xl font-black text-rose-700 leading-none">
              $42,000 <span className="text-xs font-semibold text-rose-900">USD</span>
            </div>
            <p className="text-[11px] text-rose-800 mt-1 font-medium">
              Estimated pipeline revenue at risk across 14 stalled clinical reviews.
            </p>
          </div>

          {/* Sub-Metric Cards */}
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/60">
              <span className="text-[9px] font-bold uppercase text-slate-400 block">Late Reviews</span>
              <span className="font-extrabold text-slate-900 text-xs">9.2 hrs</span>
            </div>
            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/60">
              <span className="text-[9px] font-bold uppercase text-slate-400 block">DICOM Stalled</span>
              <span className="font-extrabold text-slate-900 text-xs">3.1 hrs</span>
            </div>
            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/60">
              <span className="text-[9px] font-bold uppercase text-slate-400 block">Visa Holds</span>
              <span className="font-extrabold text-slate-900 text-xs">2.3 hrs</span>
            </div>
          </div>

          {/* Top Delay Offenders */}
          <div className="space-y-2 text-xs">
            <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider block">
              Top Delay Offenders:
            </span>

            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-900">Max Healthcare Oncology Queue</div>
                <div className="text-[10px] text-slate-500">Target 12h • Avg actual 18.4h</div>
              </div>
              <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-lg">
                +6.4h delay
              </span>
            </div>

            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-900">Cardiology Scan Triage (Medanta)</div>
                <div className="text-[10px] text-slate-500">4 cases awaiting DICOM radiologist review</div>
              </div>
              <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-lg">
                4 pending
              </span>
            </div>
          </div>

          <button
            onClick={() => showNotification("Dispatched batch SLA escalation notice to hospital medical directors.")}
            className="w-full py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-sm transition-all cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Trigger Batch Escalation Notice</span>
          </button>
        </div>
      </div>

      {/* ROW 4: FINANCIAL HEALTH & LIVE COMPLIANCE STREAM */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Financial Health Donut */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">
              Escrow Distribution & Financial Health
            </h3>
            <button
              onClick={() => onNavigateTab("gateway_escrow")}
              className="text-xs font-semibold text-[#1baba4] hover:underline"
            >
              Details →
            </button>
          </div>

          <div className="p-4 bg-slate-50/50 rounded-2xl border border-slate-150 flex flex-col sm:flex-row items-center gap-6">
            {/* Donut Visual */}
            <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-[#1baba4]"
                  strokeDasharray="55, 100"
                  strokeWidth="5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-purple-500"
                  strokeDasharray="30, 100"
                  strokeDashoffset="-55"
                  strokeWidth="5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-amber-500"
                  strokeDasharray="15, 100"
                  strokeDashoffset="-85"
                  strokeWidth="5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute text-center">
                <span className="text-[9px] text-slate-400 font-bold block leading-none">TOTAL</span>
                <span className="text-xs font-black text-slate-900">$1.82M</span>
              </div>
            </div>

            {/* Legend */}
            <div className="flex-1 space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#1baba4]" />
                  <span className="font-medium text-slate-600">Stage 1 (Held in Escrow)</span>
                </div>
                <span className="font-bold text-slate-900">55% ($1.0M)</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-purple-500" />
                  <span className="font-medium text-slate-600">Stage 2 (Hospital Advance)</span>
                </div>
                <span className="font-bold text-slate-900">30% ($546k)</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span className="font-medium text-slate-600">Stage 3 (Final Settlement)</span>
                </div>
                <span className="font-bold text-slate-900">15% ($273k)</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div
              onClick={() => onNavigateTab("refund_approvals")}
              className="p-3 bg-rose-50/50 hover:bg-rose-50 rounded-2xl border border-rose-200/80 cursor-pointer transition-colors"
            >
              <span className="text-[10px] font-bold text-rose-800 uppercase block">Pending Refunds</span>
              <span className="text-sm font-black text-rose-950">$14,500</span>
              <div className="text-[10px] text-rose-700 mt-0.5">2 cases pending approval</div>
            </div>

            <div
              onClick={() => onNavigateTab("commission_payouts")}
              className="p-3 bg-emerald-50/50 hover:bg-emerald-50 rounded-2xl border border-emerald-200/80 cursor-pointer transition-colors"
            >
              <span className="text-[10px] font-bold text-emerald-800 uppercase block">Scheduled Payouts</span>
              <span className="text-sm font-black text-emerald-950">$124,000</span>
              <div className="text-[10px] text-emerald-700 mt-0.5">This Friday (4 hospitals)</div>
            </div>
          </div>
        </div>

        {/* Live Immutable Audit Stream (Visit Feed Style) */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">
              Live Immutable Compliance Feed
            </h3>
            <button
              onClick={() => onNavigateTab("system_audit_trail")}
              className="text-xs font-semibold text-[#1baba4] hover:underline"
            >
              View all →
            </button>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-2.5 bg-slate-50/80 rounded-2xl border border-slate-200/80 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="text-[10px] font-mono text-slate-400 shrink-0">11:18 AM</span>
                <div className="w-6 h-6 rounded-full bg-blue-100 text-[#3F4EB4] font-bold text-[10px] flex items-center justify-center shrink-0">
                  SM
                </div>
                <div className="truncate">
                  <strong className="text-slate-900">Sarah M.</strong> transferred{" "}
                  <span className="font-mono text-[#3F4EB4] font-bold">PT-2026-00481</span> to Apollo
                </div>
              </div>
              <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 shrink-0">
                Logged
              </span>
            </div>

            <div className="p-2.5 bg-slate-50/80 rounded-2xl border border-slate-200/80 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="text-[10px] font-mono text-slate-400 shrink-0">11:05 AM</span>
                <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 font-bold text-[10px] flex items-center justify-center shrink-0">
                  CR
                </div>
                <div className="truncate">
                  <strong className="text-slate-900">System Cron</strong> recorded Consent Type 2 (Kenya)
                </div>
              </div>
              <span className="text-[9px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200 shrink-0">
                Encrypted
              </span>
            </div>

            <div className="p-2.5 bg-slate-50/80 rounded-2xl border border-slate-200/80 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="text-[10px] font-mono text-slate-400 shrink-0">10:45 AM</span>
                <div className="w-6 h-6 rounded-full bg-teal-100 text-[#1baba4] font-bold text-[10px] flex items-center justify-center shrink-0">
                  RV
                </div>
                <div className="truncate">
                  <strong className="text-slate-900">Super Admin</strong> updated UK e-Visa Rules v3.2
                </div>
              </div>
              <span className="text-[9px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200 shrink-0">
                Published
              </span>
            </div>

            <div className="p-2.5 bg-slate-50/80 rounded-2xl border border-slate-200/80 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="text-[10px] font-mono text-slate-400 shrink-0">10:12 AM</span>
                <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 font-bold text-[10px] flex items-center justify-center shrink-0">
                  DM
                </div>
                <div className="truncate">
                  <strong className="text-slate-900">Finance Lead</strong> executed $1,200 partial refund
                </div>
              </div>
              <span className="text-[9px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200 shrink-0">
                Settled
              </span>
            </div>
          </div>

          <button
            onClick={handleExportAudit}
            className="w-full py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-xs border border-slate-200 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-[#1baba4]" />
            <span>Export Full Cryptographic Audit Log (CSV)</span>
          </button>
        </div>
      </div>

      {/* FLOATING QUICK ACTIONS CAPSULE (Bottom-Right) */}
      <div className="fixed bottom-6 right-6 z-40">
        {quickActionOpen ? (
          <div className="bg-white rounded-3xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-200 text-slate-900 w-80 space-y-3 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#1baba4]" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Quick Actions
                </span>
              </div>
              <button
                onClick={() => setQuickActionOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-1.5 text-xs">
              <button
                onClick={() => onNavigateTab("internal_staff")}
                className="w-full flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 hover:bg-teal-50 text-slate-800 hover:text-[#1baba4] transition-colors cursor-pointer text-left font-semibold border border-slate-150"
              >
                <Plus className="w-3.5 h-3.5 text-[#1baba4]" />
                <span>+ Create Staff / CS Account</span>
              </button>

              <button
                onClick={() => onNavigateTab("routing_automation")}
                className="w-full flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 text-slate-800 hover:text-[#3F4EB4] transition-colors cursor-pointer text-left font-semibold border border-slate-150"
              >
                <Sliders className="w-3.5 h-3.5 text-[#3F4EB4]" />
                <span>Re-Route Lead Traffic</span>
              </button>

              <button
                onClick={() => onNavigateTab("consent_versioning")}
                className="w-full flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 hover:bg-purple-50 text-slate-800 hover:text-purple-700 transition-colors cursor-pointer text-left font-semibold border border-slate-150"
              >
                <FileText className="w-3.5 h-3.5 text-purple-600" />
                <span>Update Consent Text</span>
              </button>

              <button
                onClick={handleExportAudit}
                className="w-full flex items-center gap-2.5 p-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 transition-colors cursor-pointer text-left font-semibold border border-emerald-200"
              >
                <Download className="w-3.5 h-3.5 text-emerald-600" />
                <span>Export Audit CSV</span>
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setQuickActionOpen(true)}
            className="px-4 py-3 rounded-full bg-white text-slate-800 font-bold text-xs shadow-xl flex items-center gap-2 cursor-pointer hover:scale-105 transition-all border border-slate-200/90"
          >
            <Sparkles className="w-4 h-4 text-[#1baba4]" />
            <span>Super Admin Quick Actions</span>
          </button>
        )}
      </div>
    </div>
  );
};
