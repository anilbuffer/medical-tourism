"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePortal } from "@/lib/portal/store";
import { PersonaSwitcher } from "./PersonaSwitcher";
import { PublicIntakeModal } from "./PublicIntakeModal";
import { OverviewTab } from "./tabs/OverviewTab";
import { PatientDicomVaultView } from "./tabs/patient/PatientDicomVaultView";
import { PatientPrescriptionsHistoryView } from "./tabs/patient/PatientPrescriptionsHistoryView";
import { PatientUpcomingVideoView } from "./tabs/patient/PatientUpcomingVideoView";
import { PatientDoctorOpinionsView } from "./tabs/patient/PatientDoctorOpinionsView";
import { PatientPackageQuoteView } from "./tabs/patient/PatientPackageQuoteView";
import { PatientPaymentEscrowView } from "./tabs/patient/PatientPaymentEscrowView";
import { PatientVisaChecklistView } from "./tabs/patient/PatientVisaChecklistView";
import { PatientFlightHotelView } from "./tabs/patient/PatientFlightHotelView";
import { PatientConciergeContactView } from "./tabs/patient/PatientConciergeContactView";
import { PatientDischargeSummaryView } from "./tabs/patient/PatientDischargeSummaryView";
import { PatientRecoveryFormsView } from "./tabs/patient/PatientRecoveryFormsView";
import { PatientLegalConsentsView } from "./tabs/patient/PatientLegalConsentsView";
import { WhatsAppContactModal } from "./modals/WhatsAppContactModal";
import { MyDocumentsTab } from "./tabs/MyDocumentsTab";
import { MyConsentsTab } from "./tabs/MyConsentsTab";
import { MyConsultationTab } from "./tabs/MyConsultationTab";
import { MyQuoteTab } from "./tabs/MyQuoteTab";
import { MyPaymentsTab } from "./tabs/MyPaymentsTab";
import { MyBookingTab } from "./tabs/MyBookingTab";
import { MyMessagesTab } from "./tabs/MyMessagesTab";
import { PostTreatmentTab } from "./tabs/PostTreatmentTab";
import { CSQueueView, CSTab } from "./roles/CSQueueView";
import { HospitalDoctorView, HospitalTab } from "./roles/HospitalDoctorView";
import { FinanceView, FinanceTab } from "./roles/FinanceView";
import { SuperAdminView, AdminTab } from "./roles/SuperAdminView";
import {
  LayoutDashboard,
  FileText,
  Lock,
  Video,
  CreditCard,
  DollarSign,
  Plane,
  MessageSquare,
  HeartHandshake,
  Bell,
  PanelLeft,
  ChevronDown,
  ChevronRight,
  ArrowLeft,
  LogOut,
  X,
  Sparkles,
  Activity,
  ShieldCheck,
  StickyNote,
  Building2,
  Stethoscope,
  BadgeCheck,
  CheckCircle2,
  Receipt,
  Wallet,
  RefreshCcw,
  RefreshCw,
  BarChart2,
  ShieldAlert,
  UserCog,
  Shield,
  ClipboardList,
  Settings,
  Users,
  UserCheck,
  Globe,
  KeyRound,
  Sliders,
  Clock,
  Car,
  Layers,
  Zap,
} from "lucide-react";
import { UserRole } from "@/types/portal";

export interface PatientDashboardProps {
  portalRole?: UserRole;
}

export const PatientDashboard: React.FC<PatientDashboardProps> = ({ portalRole }) => {
  const router = useRouter();
  const {
    currentUser,
    availableUsers,
    loginAs,
    activeCase,
    visibleCases,
    setActiveCaseId,
    logout,
    currency,
    setCurrency,
    language,
    setLanguage,
  } = usePortal();

  // If a specific portalRole is provided and currentUser is not of that role, switch to the default user for that role
  useEffect(() => {
    if (portalRole && (!currentUser || currentUser.role !== portalRole)) {
      const matchingUser = availableUsers.find((u) => u.role === portalRole);
      if (matchingUser) {
        loginAs(matchingUser);
      }
    }
  }, [portalRole, currentUser?.role, availableUsers, loginAs]);

  // Determine effective role
  const effectiveRole: UserRole = portalRole || currentUser?.role || "patient";

  const [activeTab, setActiveTab] = useState<string>("overview");
  const [isIntakeModalOpen, setIsIntakeModalOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [copiedId, setCopiedId] = useState(false);
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);

  // Role checks based on effectiveRole
  const isCS = effectiveRole === "customer_support";
  const isDoctor = effectiveRole === "hospital_doctor";
  const isFinance = effectiveRole === "finance_accounts";
  const isAdmin = effectiveRole === "super_admin";

  // Dedicated role configuration for Sidebar & Header
  const portalConfig = useMemo(() => {
    switch (effectiveRole) {
      case "customer_support": {
        const pendingDocsTotal = visibleCases.reduce(
          (acc, c) => acc + c.documents.filter((d) => d.status === "pending_review").length,
          0
        );
        const unreadMsgsTotal = visibleCases.reduce(
          (acc, c) => acc + c.messages.filter((m) => !m.isRead && m.senderRole === "patient").length,
          0
        );
        const newLeadsTotal = visibleCases.filter((c) => c.stage === "lead" || c.stage === "contacted").length;

        return {
          portalBadge: "Coordinator Workspace",
          headerTitle: "Care Coordinator Desk",
          portalSubtitle: "International Triage & SLA Monitor",
          roleTag: "Care Coordinator Lead",
          userName: currentUser?.name || "Aisha Khan",
          userSubtitle: "Triage & CS Queue Lead",
          avatar: currentUser?.avatar,
          defaultTab: "overview",
          menus: [
            {
              id: "overview",
              label: "Triage & SLA Queue",
              icon: Activity,
              badge: newLeadsTotal > 0 ? newLeadsTotal : undefined,
            },
            {
              id: "documents",
              label: "Document Verification",
              icon: FileText,
              badge: pendingDocsTotal > 0 ? pendingDocsTotal : undefined,
            },
            {
              id: "consent",
              label: "Consent Tracking",
              icon: ShieldCheck,
            },
            {
              id: "notes",
              label: "Coordinator Notes",
              icon: StickyNote,
            },
            {
              id: "handoff",
              label: "Hospital Handoff",
              icon: Building2,
            },
            {
              id: "quote_builder",
              label: "Quotation Desk",
              icon: DollarSign,
            },
            {
              id: "messages",
              label: "Patient Messages",
              icon: MessageSquare,
              badge: unreadMsgsTotal > 0 ? unreadMsgsTotal : undefined,
            },
          ],
        };
      }

      case "hospital_doctor": {
        const activeDoctorCases = visibleCases.length;
        return {
          portalBadge: "Doctor & Hospital Portal",
          headerTitle: "Chief Surgeon Clinical Desk",
          portalSubtitle: "Diagnostic Evaluation & Surgical Candidacy",
          roleTag: "Chief Surgeon",
          userName: currentUser?.name || "Dr. Naresh Trehan",
          userSubtitle: "Specialist • Medanta Hospital",
          avatar: currentUser?.avatar,
          defaultTab: "case_info",
          menus: [
            {
              id: "case_info",
              label: "Assigned Cases",
              icon: FileText,
              badge: activeDoctorCases > 0 ? activeDoctorCases : undefined,
            },
            {
              id: "accept_decline",
              label: "Surgical Candidacy",
              icon: CheckCircle2,
            },
            {
              id: "clinical_workspace",
              label: "Clinical Workspace",
              icon: Stethoscope,
            },
            {
              id: "tele_consult",
              label: "Tele-Consultation",
              icon: Video,
            },
            {
              id: "accreditation",
              label: "Hospital Accreditation",
              icon: BadgeCheck,
            },
          ],
        };
      }

      case "finance_accounts": {
        return {
          portalBadge: "Finance & Escrow Desk",
          headerTitle: "Finance & Escrow Gateway",
          portalSubtitle: "Multi-Currency Escrow & Wire Reconciliation",
          roleTag: "Finance & Escrow Director",
          userName: currentUser?.name || "David Miller",
          userSubtitle: "International Escrow & Billing",
          avatar: currentUser?.avatar,
          defaultTab: "payment_ledger",
          menus: [
            {
              id: "payment_ledger",
              label: "Payment Ledger",
              icon: Receipt,
            },
            {
              id: "escrow",
              label: "Milestone Escrow Desk",
              icon: Wallet,
            },
            {
              id: "refunds",
              label: "Refunds & Cancellations",
              icon: RefreshCcw,
            },
            {
              id: "reconciliation",
              label: "Hospital Reconciliation",
              icon: BarChart2,
            },
            {
              id: "dispute",
              label: "Disputes & Bill Audits",
              icon: ShieldAlert,
            },
          ],
        };
      }

      case "super_admin": {
        const pendingRefundsTotal = visibleCases
          .flatMap((c) => c.refundRequests || [])
          .filter((r) => r.status === "pending_approval").length;
        const breachedSlaTotal = visibleCases.filter((c) => c.slaBreached).length;
        const nurtureTotal = visibleCases.filter((c) => c.stage === "nurture").length;

        return {
          portalBadge: "Super Admin Governance",
          headerTitle: "Super Admin Governance Console",
          portalSubtitle: "System RBAC, Legal Engine, Escrow Vault & System Telemetry",
          roleTag: "Super Admin (Root Scope)",
          userName: currentUser?.name || "Rajesh Verma",
          userSubtitle: "Chief Compliance Officer",
          avatar: currentUser?.avatar,
          defaultTab: "dashboard_overview",
          menus: [
            {
              id: "dashboard_overview",
              label: "Overview",
              icon: LayoutDashboard,
              group: "dashboard_group",
              subTabs: ["dashboard_overview"],
            },
            {
              id: "internal_staff",
              label: "User and Access Management",
              icon: Users,
              group: "user_rbac_group",
              subTabs: ["internal_staff", "hospital_doctors", "role_permission_matrix"],
            },
            {
              id: "consent_versioning",
              label: "Compliance and Legal Engine",
              icon: Shield,
              group: "compliance_legal_group",
              subTabs: ["consent_versioning", "visa_rules", "refund_escrow_rules", "accreditation_registry"],
              badge: 1,
            },
            {
              id: "case_master_directory",
              label: "CaseJourney & Queues",
              icon: Layers,
              group: "case_queues_group",
              subTabs: ["case_master_directory", "sla_escalation_engine", "nurture_queue"],
              badge: breachedSlaTotal > 0 ? breachedSlaTotal : (nurtureTotal > 0 ? nurtureTotal : undefined),
            },
            {
              id: "gateway_escrow",
              label: "Financial and PaymentsLedger",
              icon: Wallet,
              group: "financial_ledger_group",
              subTabs: ["gateway_escrow", "commission_payouts", "refund_approvals"],
              badge: pendingRefundsTotal > 0 ? pendingRefundsTotal : undefined,
            },
            {
              id: "system_audit_trail",
              label: "System Audit and Logs",
              icon: ClipboardList,
              group: "system_audit_group",
              subTabs: ["system_audit_trail", "security_mfa_logs", "marketing_utm_analytics"],
            },
            {
              id: "geo_sla_timers",
              label: "System Configuration",
              icon: Settings,
              group: "system_config_group",
              subTabs: ["geo_sla_timers", "routing_automation"],
            },
          ],
          adminNavGroups: [
            {
              id: "dashboard_group",
              label: "Overview",
              icon: LayoutDashboard,
              items: [
                {
                  id: "dashboard_overview",
                  label: "Overview",
                  icon: LayoutDashboard,
                },
              ],
            },
            {
              id: "user_rbac_group",
              label: "User and Access Management",
              icon: Users,
              items: [
                {
                  id: "internal_staff",
                  label: "Internal Staff & CS Agents",
                  icon: UserCheck,
                },
                {
                  id: "hospital_doctors",
                  label: "Hospital Accounts & Doctors",
                  icon: Building2,
                },
                {
                  id: "role_permission_matrix",
                  label: "Role Permission Matrix (RLS)",
                  icon: Lock,
                },
              ],
            },
            {
              id: "compliance_legal_group",
              label: "Compliance and Legal Engine",
              icon: Shield,
              items: [
                {
                  id: "consent_versioning",
                  label: "Dynamic Consent Versioning",
                  icon: FileText,
                },
                {
                  id: "visa_rules",
                  label: "Visa Checklist Rules Table",
                  icon: Globe,
                },
                {
                  id: "refund_escrow_rules",
                  label: "Stage-Wise Refund & Escrow Rules",
                  icon: ShieldAlert,
                },
                {
                  id: "accreditation_registry",
                  label: "Accreditation Registry (JCI/NABH)",
                  icon: BadgeCheck,
                  badge: 1,
                },
              ],
            },
            {
              id: "case_queues_group",
              label: "CaseJourney & Queues",
              icon: Layers,
              items: [
                {
                  id: "case_master_directory",
                  label: "Global Case Master Directory",
                  icon: Layers,
                  badge: visibleCases.length > 0 ? visibleCases.length : undefined,
                },
                {
                  id: "sla_escalation_engine",
                  label: "SLA & Escalation Rules Engine",
                  icon: Clock,
                  badge: breachedSlaTotal > 0 ? breachedSlaTotal : undefined,
                },
                {
                  id: "nurture_queue",
                  label: "Nurture & Re-engagement Queue",
                  icon: Sparkles,
                  badge: nurtureTotal > 0 ? nurtureTotal : undefined,
                },
              ],
            },
            {
              id: "financial_ledger_group",
              label: "Financial and PaymentsLedger",
              icon: Wallet,
              items: [
                {
                  id: "gateway_escrow",
                  label: "Gateway Transactions & Escrow",
                  icon: Receipt,
                },
                {
                  id: "commission_payouts",
                  label: "Hospital Commission & Payouts",
                  icon: DollarSign,
                },
                {
                  id: "refund_approvals",
                  label: "Refund Approval Center",
                  icon: RefreshCw,
                  badge: pendingRefundsTotal > 0 ? pendingRefundsTotal : undefined,
                },
              ],
            },
            {
              id: "system_audit_group",
              label: "System Audit and Logs",
              icon: ClipboardList,
              items: [
                {
                  id: "system_audit_trail",
                  label: "Full System Audit Trail (Read-Only)",
                  icon: Activity,
                },
                {
                  id: "security_mfa_logs",
                  label: "Security & MFA Enforcement Logs",
                  icon: KeyRound,
                },
                {
                  id: "marketing_utm_analytics",
                  label: "Marketing Attribution & UTM Analytics",
                  icon: BarChart2,
                },
              ],
            },
            {
              id: "system_config_group",
              label: "System Configuration",
              icon: Settings,
              items: [
                {
                  id: "geo_sla_timers",
                  label: "SLA Timers per Geographic Market",
                  icon: Clock,
                },
                {
                  id: "routing_automation",
                  label: "Routing & Queue Automation Logic",
                  icon: Sliders,
                },
              ],
            },
          ],
        };
      }

      default: {
        // Patient Portal (Default)
        return {
          portalBadge: "International Patient Desk",
          headerTitle: "Unified Patient Care Portal",
          portalSubtitle: "End-to-End Medical Travel & Surgical Escrow Gateway",
          roleTag: "International Patient (Verified)",
          userName: activeCase?.patientName || currentUser?.name || "Tariq Al-Mansoor",
          userSubtitle: `${activeCase?.id || "PT-2026-089412"} • ${activeCase?.patientCountry || "United Arab Emirates"}`,
          avatar: currentUser?.avatar,
          defaultTab: "overview",
          menus: [
            {
              id: "overview",
              label: "DASHBOARD",
              icon: LayoutDashboard,
              subTabs: ["overview"],
            },
            {
              id: "docs_vault",
              label: "MY MEDICAL RECORD",
              icon: FileText,
              subTabs: ["docs_vault", "prescriptions_history", "documents"],
              badge: activeCase?.documents.filter((d) => d.status === "incomplete").length || undefined,
            },
            {
              id: "upcoming_video",
              label: "CONSULTATIONS",
              icon: Video,
              subTabs: ["upcoming_video", "doctor_opinions", "consultation"],
            },
            {
              id: "package_quote",
              label: "QUOTE & PAYMENTS",
              icon: CreditCard,
              subTabs: ["package_quote", "payment_escrow", "quote", "payments"],
            },
            {
              id: "visa_checklist",
              label: "TRAVEL & LOGISTICS",
              icon: Plane,
              subTabs: ["visa_checklist", "flight_hotel", "concierge_contact", "booking"],
            },
            {
              id: "discharge_summary",
              label: "RECOVERY & FOLLOW-UP",
              icon: HeartHandshake,
              subTabs: ["discharge_summary", "recovery_forms", "recovery", "post_treatment"],
            },
            {
              id: "legal_consents",
              label: "PRIVACY & CONSENTS",
              icon: Lock,
              subTabs: ["legal_consents", "consents"],
            },
          ],
          patientNavGroups: [
            {
              id: "dashboard_group",
              label: "DASHBOARD",
              icon: LayoutDashboard,
              items: [
                {
                  id: "overview",
                  label: "Active Journey Overview",
                  icon: LayoutDashboard,
                },
              ],
            },
            {
              id: "medical_records_group",
              label: "MY MEDICAL RECORD",
              icon: FileText,
              items: [
                {
                  id: "docs_vault",
                  label: "Document Vault & DICOM Scans",
                  icon: Layers,
                  badge: activeCase?.documents.filter((d) => d.status === "incomplete").length || undefined,
                },
                {
                  id: "prescriptions_history",
                  label: "Prescriptions & Health History",
                  icon: FileText,
                },
              ],
            },
            {
              id: "consultations_group",
              label: "CONSULTATIONS",
              icon: Video,
              items: [
                {
                  id: "upcoming_video",
                  label: "Upcoming Video Calls",
                  icon: Video,
                },
                {
                  id: "doctor_opinions",
                  label: "Doctor Opinions & Written Plans",
                  icon: Stethoscope,
                },
              ],
            },
            {
              id: "quote_payments_group",
              label: "QUOTE & PAYMENTS",
              icon: CreditCard,
              items: [
                {
                  id: "package_quote",
                  label: "Package Details",
                  icon: CreditCard,
                },
                {
                  id: "payment_escrow",
                  label: "Payment History & Receipts",
                  icon: Receipt,
                },
              ],
            },
            {
              id: "travel_logistics_group",
              label: "TRAVEL & LOGISTICS",
              icon: Plane,
              items: [
                {
                  id: "visa_checklist",
                  label: "Visa Checklist & Letters",
                  icon: Globe,
                },
                {
                  id: "flight_hotel",
                  label: "Flight & Accommodation Details",
                  icon: Building2,
                },
                {
                  id: "concierge_contact",
                  label: "On-Ground Concierge Contact",
                  icon: Car,
                },
              ],
            },
            {
              id: "recovery_group",
              label: "RECOVERY & FOLLOW-UP",
              icon: HeartHandshake,
              items: [
                {
                  id: "discharge_summary",
                  label: "Post-Op Discharge Summary",
                  icon: FileText,
                },
                {
                  id: "recovery_forms",
                  label: "Structured Recovery Check-in Forms",
                  icon: Activity,
                },
              ],
            },
            {
              id: "privacy_consents_group",
              label: "PRIVACY & CONSENTS",
              icon: Lock,
              items: [
                {
                  id: "legal_consents",
                  label: "Legal Consent History (Read-Only)",
                  icon: ShieldCheck,
                },
              ],
            },
          ],
        };
      }
    }
  }, [currentUser, activeCase, visibleCases]);

  // Synchronize activeTab when role changes if current tab is not part of role's menus or subTabs
  useEffect(() => {
    const validIds = [
      ...portalConfig.menus.flatMap((m: any) => [m.id, ...(m.subTabs || [])]),
      ...((portalConfig as any).patientNavGroups?.flatMap((g: any) => g.items.map((i: any) => i.id)) || []),
      ...((portalConfig as any).adminNavGroups?.flatMap((g: any) => g.items.map((i: any) => i.id)) || []),
      "documents",
      "consents",
      "consultation",
      "quote",
      "payments",
      "booking",
      "messages",
      "recovery",
      "post_treatment",
    ];
    if (!validIds.includes(activeTab)) {
      setActiveTab(portalConfig.defaultTab);
    }
  }, [portalConfig, activeTab]);

  // Logout action with smooth redirect to /login
  const handleLogout = () => {
    setProfileDropdownOpen(false);
    setMobileMenuOpen(false);
    logout();
    router.push("/login");
  };

  // Main Website action with smooth redirect to /
  const handleGoToMainSite = () => {
    setProfileDropdownOpen(false);
    setMobileMenuOpen(false);
    router.push("/");
  };

  const currentTabObj =
    portalConfig.menus.find(
      (m: any) => m.id === activeTab || (m.subTabs && m.subTabs.includes(activeTab))
    ) || portalConfig.menus[0];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex">
      {/* 01. Left Sidebar Navigation (Desktop) - Styled Exactly Like Home Banner */}
      <aside
        className={`hidden md:flex flex-col bg-gradient-to-b from-[#141d60] via-[#1b2360] to-[#101e76] text-white transition-all duration-300 z-40 shrink-0 select-none ${sidebarOpen ? "w-64" : "w-20"
          } min-h-screen border-r border-slate-800/80 sticky top-0 h-screen relative`}
      >
        {/* Ambient Banner Glows inside Sidebar */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-48 h-48 bg-[#3F4EB4]/20 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-0 w-48 h-48 bg-[#2ECDC5]/15 rounded-full blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
              backgroundSize: "24px 24px",
            }}
          />
        </div>

        {/* Edge Toggle Button (Floating cleanly on sidebar border, tri-color symmetric palette) */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="hidden md:flex absolute -right-4 top-6 z-50 w-8 h-8 rounded-full  bg-gradient-to-r from-[#1d8983] via-[#1baba4] to-[#1d8983] active:scale-95 text-white items-center justify-center shadow-xl ring-2 ring-white transition-all duration-200 hover:scale-110 cursor-pointer"
          title={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          <PanelLeft className={`w-4 h-4 text-white transition-transform duration-300 ${!sidebarOpen ? "rotate-180" : ""}`} />
        </button>

        {/* Top Logo / Brand Header */}
        <div className={`h-20 flex items-center border-b border-slate-800/80 relative z-10 transition-all ${sidebarOpen ? "px-5 gap-3" : "justify-center px-2"}`}>
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2ECDC5] via-[#1baba4] to-[#2abdb5] flex items-center justify-center shadow-lg shadow-[#283593]/30 ring-1 ring-[#2ECDC5]/50 group-hover:scale-105 transition-transform shrink-0">
              <span className="text-white font-black text-lg font-serif">V</span>
            </div>
            {sidebarOpen && (
              <div className="min-w-0 animate-in fade-in duration-200">
                <div className="flex items-center gap-1.5 leading-none">
                  <span className="font-extrabold tracking-widest text-base text-white group-hover:text-[#2ECDC5] transition-colors">
                    VEDARA
                  </span>
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#2ECDC5] animate-pulse"></span>
                </div>
                <span className="text-[9px] uppercase font-semibold tracking-wider text-[#2ECDC5] leading-tight block mt-0.5 truncate max-w-[150px]">
                  {portalConfig.portalBadge}
                </span>
              </div>
            )}
          </Link>
        </div>

        {/* Navigation Menus */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5 scrollbar-none relative z-10">
          {(portalConfig as any).patientNavGroups && sidebarOpen ? (
            <div className="space-y-4">
              {(portalConfig as any).patientNavGroups.map((group: any) => {
                const GroupIcon = group.icon;
                return (
                  <div key={group.id} className="space-y-1">
                    <div className="px-3 py-1 text-[10px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <GroupIcon className="w-3 h-3 text-[#2ECDC5]" />
                      <span>{group.label}</span>
                    </div>
                    <div className="space-y-1">
                      {group.items.map((item: any) => {
                        const ItemIcon = item.icon || GroupIcon;
                        const isActive = activeTab === item.id;
                        return (
                          <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                              isActive
                                ? "bg-gradient-to-r from-[#23b3ab] via-[#1baba4] to-[#1d8983] text-white shadow-md shadow-[#283593]/30 font-extrabold"
                                : "text-slate-300 hover:text-white hover:bg-white/5"
                            }`}
                          >
                            <ItemIcon className={`w-3.5 h-3.5 shrink-0 ${isActive ? "text-white" : "text-slate-400"}`} />
                            <span className="truncate">{item.label}</span>
                            {typeof item.badge === "number" && item.badge > 0 && (
                              <span className="ml-auto px-1.5 py-0.5 rounded-full text-[9px] font-black bg-amber-500 text-slate-950">
                                {item.badge}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            portalConfig.menus.map((menu: any) => {
              const Icon = menu.icon;
              const isActive =
                activeTab === menu.id ||
                (menu.subTabs && menu.subTabs.includes(activeTab));

              return (
                <button
                  key={menu.id}
                  onClick={() => {
                    setActiveTab(menu.id);
                  }}
                  title={!sidebarOpen ? menu.label : undefined}
                  className={`w-full flex items-center rounded-2xl text-xs font-bold transition-all relative group cursor-pointer ${
                    sidebarOpen ? "gap-3.5 px-4 py-3" : "justify-center px-0 py-3.5"
                  } ${
                    isActive
                      ? "bg-gradient-to-r from-[#23b3ab] via-[#1baba4] to-[#1d8983] text-white shadow-lg shadow-[#283593]/35 font-extrabold"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 shrink-0 transition-colors ${
                      isActive ? "text-white" : "text-slate-400 group-hover:text-[#2ECDC5]"
                    }`}
                  />
                  {sidebarOpen && <span className="truncate">{menu.label}</span>}

                  {/* Badge Indicator */}
                  {typeof menu.badge === "number" && menu.badge > 0 && sidebarOpen && (
                    <span
                      className={`ml-auto px-2 py-0.5 rounded-full text-[10px] font-black ${
                        isActive ? "bg-white text-[#283593]" : "bg-[#2ECDC5] text-slate-950"
                      }`}
                    >
                      {menu.badge}
                    </span>
                  )}
                  {typeof menu.badge === "number" && menu.badge > 0 && !sidebarOpen && (
                    <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-[#2ECDC5] ring-2 ring-[#0B1E33]" />
                  )}
                </button>
              );
            })
          )}
        </div>

        {/* Bottom Actions & Profile Pill */}
        <div className="p-3 border-t border-slate-800/80 relative z-30 space-y-2">
          {/* Quick Exit Action Buttons (Visible when sidebar is expanded) */}
          {sidebarOpen && (
            <div className="grid grid-cols-2 gap-1.5 pb-1 animate-in fade-in duration-200">
              <button
                onClick={handleGoToMainSite}
                className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-[11px] font-bold border border-white/10 transition-all cursor-pointer"
                title="Return to Main Website"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-[#2ECDC5]" />
                <span className="truncate">Main Site</span>
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-rose-950/30 hover:bg-rose-900/50 text-rose-300 hover:text-rose-100 text-[11px] font-bold border border-rose-900/40 transition-all cursor-pointer"
                title="Log Out of Portal"
              >
                <LogOut className="w-3.5 h-3.5 text-rose-400" />
                <span className="truncate">Sign Out</span>
              </button>
            </div>
          )}

          {/* User Profile Pill */}
          <button
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            className={`w-full flex items-center rounded-2xl hover:bg-white/10 transition-all text-left cursor-pointer ${sidebarOpen ? "gap-3 p-2" : "justify-center p-2"
              }`}
            title={!sidebarOpen ? portalConfig.userName : undefined}
          >
            <div className="relative w-9 h-9 rounded-full bg-gradient-to-br from-[#2ECDC5] via-[#1baba4] to-[#2abdb5] text-white font-bold flex items-center justify-center shrink-0 ring-2 ring-[#2ECDC5]/50 shadow-md overflow-hidden">
              {portalConfig.avatar ? (
                <img
                  src={portalConfig.avatar}
                  alt={portalConfig.userName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span>{portalConfig.userName.charAt(0)}</span>
              )}
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#2ECDC5] ring-2 ring-[#071321]" />
            </div>

            {sidebarOpen && (
              <>
                <div className="min-w-0 flex-1 animate-in fade-in duration-200">
                  <div className="text-xs font-black text-white truncate">
                    {portalConfig.userName}
                  </div>
                  <div className="text-[11px] text-[#2ECDC5] font-bold truncate">
                    {portalConfig.userSubtitle}
                  </div>
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${profileDropdownOpen ? "rotate-180" : ""}`} />
              </>
            )}
          </button>

          {/* Profile Dropdown Backdrop & Popup */}
          {profileDropdownOpen && (
            <>
              {/* Click-outside backdrop */}
              <div
                className="fixed inset-0 z-40"
                onClick={() => setProfileDropdownOpen(false)}
              />

              {/* 100% Solid Opaque Dropdown Card */}
              <div
                className={`absolute bottom-full mb-3 bg-[#0B1E33] rounded-2xl p-2.5 shadow-[0_20px_60px_rgba(0,0,0,0.6)] border border-slate-700/90 text-xs space-y-1.5 z-50 animate-in fade-in zoom-in-95 duration-150 text-white ${sidebarOpen ? "left-3 right-3" : "left-3 w-60"
                  }`}
              >
                {/* Header with User Info */}
                <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center gap-2.5 mb-1.5">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2ECDC5] via-[#1baba4] to-[#2abdb5] text-white font-bold text-xs flex items-center justify-center shrink-0 ring-1 ring-[#2ECDC5]/60 overflow-hidden">
                    {portalConfig.avatar ? (
                      <img
                        src={portalConfig.avatar}
                        alt={portalConfig.userName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span>{portalConfig.userName.charAt(0)}</span>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-extrabold text-white text-xs truncate">
                      {portalConfig.userName}
                    </div>
                    <div className="text-[10px] text-[#2ECDC5] font-bold truncate">
                      {portalConfig.roleTag}
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleGoToMainSite}
                  className="w-full flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-800/60 hover:bg-slate-700/80 text-white font-bold text-left transition-colors border border-slate-700/40 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4 text-[#2ECDC5] shrink-0" />
                  <span className="text-white font-bold text-xs">Return to Main Site</span>
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 p-2.5 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 hover:text-rose-100 font-bold text-left transition-colors border border-rose-900/40 cursor-pointer"
                >
                  <LogOut className="w-4 h-4 text-rose-400 shrink-0" />
                  <span className="text-xs">Sign Out / Log Out</span>
                </button>
              </div>
            </>
          )}
        </div>
      </aside>

      {/* 02. Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] md:hidden bg-slate-950/80 backdrop-blur-xs flex">
          <div className="w-72 bg-gradient-to-b from-[#141d60] via-[#1b2360] to-[#101e76] text-white flex flex-col h-full p-4 space-y-4 animate-in slide-in-from-left duration-200 border-r border-slate-800">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#2ECDC5] via-[#1baba4] to-[#2abdb5] flex items-center justify-center font-bold text-white ring-1 ring-[#2ECDC5]/40">
                  V
                </div>
                <div className="flex flex-col">
                  <span className="font-extrabold text-sm text-white tracking-wider">VEDARA</span>
                  <span className="text-[9px] text-[#2ECDC5] uppercase font-semibold truncate max-w-[140px]">
                    {portalConfig.portalBadge}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 rounded-xl text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4">
              {(portalConfig as any).patientNavGroups ? (
                <div className="space-y-4">
                  {(portalConfig as any).patientNavGroups.map((group: any) => {
                    const GroupIcon = group.icon;
                    return (
                      <div key={group.id} className="space-y-1">
                        <div className="px-2 py-1 text-[10px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                          <GroupIcon className="w-3.5 h-3.5 text-[#2ECDC5]" />
                          <span>{group.label}</span>
                        </div>
                        <div className="space-y-1">
                          {group.items.map((item: any) => {
                            const ItemIcon = item.icon || GroupIcon;
                            const isActive = activeTab === item.id;
                            return (
                              <button
                                key={item.id}
                                onClick={() => {
                                  setActiveTab(item.id);
                                  setMobileMenuOpen(false);
                                }}
                                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                                  isActive
                                    ? "bg-gradient-to-r from-[#1d8983] via-[#1baba4] to-[#1d8983] text-white font-extrabold shadow-md"
                                    : "text-slate-300 hover:text-white hover:bg-white/5"
                                }`}
                              >
                                <ItemIcon className="w-4 h-4 shrink-0" />
                                <span className="truncate">{item.label}</span>
                                {typeof item.badge === "number" && item.badge > 0 && (
                                  <span className="ml-auto px-2 py-0.5 rounded-full text-[10px] bg-amber-500 text-slate-950 font-black">
                                    {item.badge}
                                  </span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                portalConfig.menus.map((menu: any) => {
                  const Icon = menu.icon;
                  const isActive =
                    activeTab === menu.id ||
                    (menu.subTabs && menu.subTabs.includes(activeTab));

                  return (
                    <button
                      key={menu.id}
                      onClick={() => {
                        setActiveTab(menu.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                        isActive
                          ? "bg-gradient-to-r from-[#1d8983] via-[#1baba4] to-[#1d8983] text-white font-extrabold shadow-md"
                          : "text-slate-300 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{menu.label}</span>
                      {typeof menu.badge === "number" && menu.badge > 0 && (
                        <span className="ml-auto px-2 py-0.5 rounded-full text-[10px] bg-[#2ECDC5] text-slate-950 font-black">
                          {menu.badge}
                        </span>
                      )}
                    </button>
                  );
                })
              )}
            </div>

            {/* Mobile Drawer Bottom Actions */}
            <div className="pt-3 border-t border-slate-800 space-y-2">
              <button
                onClick={handleGoToMainSite}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold transition-all cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 text-[#2ECDC5]" />
                <span>Return to Main Website</span>
              </button>
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 text-xs font-bold transition-all cursor-pointer"
              >
                <LogOut className="w-4 h-4 text-rose-400" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
          <div className="flex-1" onClick={() => setMobileMenuOpen(false)} />
        </div>
      )}

      {/* 03. Main Viewport Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* ========================================================================= */}
        {/* TOP UTILITY HEADER STRIP (Patient Portal Permanent sequential tag & HUD)  */}
        {/* ========================================================================= */}
        {!isCS && !isDoctor && !isFinance && !isAdmin && (
          <div className="bg-slate-950 text-white px-4 sm:px-8 py-2 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs shrink-0 z-30">
            {/* Left: Patient Identifier & Coordinator */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              {/* Permanent Patient ID Tag */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-900 border border-slate-800 text-[11px] font-mono">
                <span className="text-slate-400">Patient ID:</span>
                <span className="font-bold text-[#2ECDC5]">
                  {activeCase?.id || "PT-2026-089412"}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard?.writeText(activeCase?.id || "PT-2026-089412");
                    setCopiedId(true);
                    setTimeout(() => setCopiedId(false), 2000);
                  }}
                  className="p-1 hover:text-white text-slate-400 transition-colors cursor-pointer"
                  title="Copy Patient ID"
                >
                  {copiedId ? (
                    <span className="text-[10px] text-emerald-400 font-sans font-bold">Copied!</span>
                  ) : (
                    <KeyRound className="w-3 h-3" />
                  )}
                </button>
              </div>

              {/* Assigned Coordinator with 1-Click WhatsApp Trigger */}
              <div className="hidden sm:flex items-center gap-1.5 text-[11px]">
                <span className="text-slate-400">Assigned Coordinator:</span>
                <button
                  onClick={() => setIsWhatsAppOpen(true)}
                  className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/25 transition-all font-bold cursor-pointer"
                  title="Open Instant WhatsApp"
                >
                  <MessageSquare className="w-3 h-3 text-emerald-400" />
                  <span>Ananya Sharma (WhatsApp)</span>
                </button>
              </div>

              {/* Emergency Hotline */}
              <div className="hidden lg:flex items-center gap-1 text-[11px] text-slate-300">
                <span className="text-slate-400">24/7 International Desk:</span>
                <a
                  href="tel:+18008332722"
                  className="text-amber-300 hover:text-amber-200 font-bold hover:underline"
                >
                  +1 (800) 833-2722
                </a>
              </div>
            </div>

            {/* Right: Personalization Controls (Language & Currency) */}
            <div className="flex items-center gap-3">
              {/* Currency Selector */}
              <div className="flex items-center gap-1 bg-slate-900 p-0.5 rounded-xl border border-slate-800">
                {(["USD", "GBP", "AED"] as const).map((c) => (
                  <button
                    key={c}
                    onClick={() => setCurrency(c)}
                    className={`px-2 py-0.5 rounded-lg text-[10px] font-black transition-all cursor-pointer ${
                      currency === c
                        ? "bg-[#2ECDC5] text-slate-950 shadow-xs"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {c === "USD" ? "$ USD" : c === "GBP" ? "£ GBP" : "AED د.إ"}
                  </button>
                ))}
              </div>

              {/* Language Switcher */}
              <div className="flex items-center gap-1 bg-slate-900 p-0.5 rounded-xl border border-slate-800">
                {(["en", "ar", "fr"] as const).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLanguage(l)}
                    className={`px-2 py-0.5 rounded-lg text-[10px] font-bold uppercase transition-all cursor-pointer ${
                      language === l
                        ? "bg-[#3F4EB4] text-white shadow-xs"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Top Header Bar - Clean Frosted Background & Sticky */}
        <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-slate-200/90 px-4 sm:px-8 h-20 flex items-center justify-between gap-4 text-slate-900 shadow-xs transition-all">
          {/* Left Title & Collapse Button */}
          <div className="flex items-center gap-3 sm:gap-4 relative z-10">
            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 hover:text-slate-900 border border-slate-200/80 shadow-xs transition-colors cursor-pointer"
              title="Open Navigation Menu"
            >
              <PanelLeft className="w-4 h-4 text-[#3F4EB4]" />
            </button>

            {/* Desktop / LG Screen Sidebar Toggle Button */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="hidden md:flex p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 hover:text-slate-900 border border-slate-200/80 shadow-xs transition-all cursor-pointer items-center justify-center group"
              title={sidebarOpen ? "Minimize sidebar" : "Expand sidebar"}
              aria-label={sidebarOpen ? "Minimize sidebar" : "Expand sidebar"}
            >
              <PanelLeft className={`w-4 h-4 text-[#3F4EB4] group-hover:scale-110 transition-transform duration-300 ${!sidebarOpen ? "rotate-180" : ""}`} />
            </button>

            <div>
              {isAdmin && (portalConfig as any).adminNavGroups ? (
                (() => {
                  const activeGroup = (portalConfig as any).adminNavGroups?.find((g: any) =>
                    g.items.some((i: any) => i.id === activeTab)
                  );
                  const activeItem = activeGroup?.items.find((i: any) => i.id === activeTab);

                  return (
                    <div>
                      {activeGroup && activeGroup.id !== "dashboard_group" && (
                        <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">
                          <span>Governance</span>
                          <ChevronRight className="w-2.5 h-2.5 text-slate-400" />
                          <span className="text-slate-600">{activeGroup.label}</span>
                        </div>
                      )}
                      <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight leading-tight">
                        {activeItem?.label || portalConfig.headerTitle}
                      </h2>
                    </div>
                  );
                })()
              ) : (
                <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  {currentTabObj?.label || portalConfig.headerTitle}
                </h2>
              )}
              <span className="text-[10px] font-bold text-[#3F4EB4] uppercase tracking-widest hidden sm:flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2ECDC5] inline-block animate-pulse" />
                {portalConfig.portalSubtitle}
              </span>
            </div>
          </div>

          {/* Right Header Action Utilities */}
          <div className="flex items-center gap-2 sm:gap-2.5 relative z-10">
            {/* Back to Website (Desktop & Tablet) */}
            <button
              onClick={handleGoToMainSite}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 border border-slate-200/80 shadow-xs transition-all group cursor-pointer"
              title="Return to Main Website"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#3F4EB4] group-hover:-translate-x-0.5 transition-transform" />
              <span className="hidden sm:inline">Main Website</span>
              <span className="sm:hidden">Home</span>
            </button>

            {/* Persona Switcher (RBAC Tester) */}
            <PersonaSwitcher />

            {/* Notification Bell Button */}
            <button
              onClick={() => {
                if (portalConfig.menus.some((m) => m.id === "messages")) {
                  setActiveTab("messages");
                }
              }}
              className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-slate-100 hover:bg-slate-200/80 border border-slate-200/80 flex items-center justify-center text-slate-700 shadow-xs transition-all cursor-pointer"
              title="Notifications"
            >
              <Bell className="w-4 h-4 text-slate-600" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#2ECDC5] ring-2 ring-white" />
            </button>

            {/* Sign Out Action Button in Header */}
            <button
              onClick={handleLogout}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-600 hover:text-rose-700 border border-rose-200 flex items-center justify-center shadow-xs transition-all cursor-pointer"
              title="Sign Out / Log Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Main Body Content Container */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          {/* If CS Role -> CS Queue View */}
          {isCS && (
            <CSQueueView
              cases={visibleCases}
              activeCaseId={activeCase?.id || ""}
              onSelectCase={setActiveCaseId}
              activeTab={activeTab as CSTab}
              onSelectTab={(tab) => setActiveTab(tab)}
            />
          )}

          {/* If Hospital Doctor Role -> Hospital Doctor View */}
          {isDoctor && (
            <HospitalDoctorView
              cases={visibleCases}
              activeCaseId={activeCase?.id || ""}
              onSelectCase={setActiveCaseId}
              activeTab={activeTab as HospitalTab}
              onSelectTab={(tab) => setActiveTab(tab)}
            />
          )}

          {/* If Finance Role -> Finance View */}
          {isFinance && (
            <FinanceView
              cases={visibleCases}
              activeTab={activeTab as FinanceTab}
              onSelectTab={(tab) => setActiveTab(tab)}
            />
          )}

          {/* If Super Admin Role -> Super Admin View */}
          {isAdmin && (
            <SuperAdminView
              cases={visibleCases}
              activeTab={activeTab as AdminTab}
              onSelectTab={(tab) => setActiveTab(tab)}
            />
          )}

          {/* Patient View (Default) */}
          {!isCS && !isDoctor && !isFinance && !isAdmin && activeCase && (
            <>
              {activeTab === "overview" && (
                <OverviewTab
                  patientCase={activeCase}
                  onNavigateTab={(tabId) => setActiveTab(tabId)}
                />
              )}
              {(activeTab === "docs_vault" || activeTab === "documents") && (
                <PatientDicomVaultView patientCase={activeCase} />
              )}
              {activeTab === "prescriptions_history" && (
                <PatientPrescriptionsHistoryView patientCase={activeCase} />
              )}
              {(activeTab === "upcoming_video" || activeTab === "consultation") && (
                <PatientUpcomingVideoView patientCase={activeCase} />
              )}
              {activeTab === "doctor_opinions" && (
                <PatientDoctorOpinionsView patientCase={activeCase} />
              )}
              {(activeTab === "package_quote" || activeTab === "quote") && (
                <PatientPackageQuoteView
                  patientCase={activeCase}
                  onNavigateToPayments={() => setActiveTab("payment_escrow")}
                />
              )}
              {(activeTab === "payment_escrow" || activeTab === "payments") && (
                <PatientPaymentEscrowView patientCase={activeCase} />
              )}
              {(activeTab === "visa_checklist" || activeTab === "booking") && (
                <PatientVisaChecklistView patientCase={activeCase} />
              )}
              {activeTab === "flight_hotel" && (
                <PatientFlightHotelView patientCase={activeCase} />
              )}
              {activeTab === "concierge_contact" && (
                <PatientConciergeContactView patientCase={activeCase} />
              )}
              {(activeTab === "discharge_summary" || activeTab === "recovery" || activeTab === "post_treatment") && (
                <PatientDischargeSummaryView patientCase={activeCase} />
              )}
              {activeTab === "recovery_forms" && (
                <PatientRecoveryFormsView patientCase={activeCase} />
              )}
              {(activeTab === "legal_consents" || activeTab === "consents") && (
                <PatientLegalConsentsView patientCase={activeCase} />
              )}
              {activeTab === "messages" && <MyMessagesTab patientCase={activeCase} />}
            </>
          )}
        </main>
      </div>

      {/* WhatsApp Modal Trigger */}
      {activeCase && (
        <WhatsAppContactModal
          isOpen={isWhatsAppOpen}
          onClose={() => setIsWhatsAppOpen(false)}
          patientCase={activeCase}
        />
      )}

      {/* Public Intake Modal */}
      <PublicIntakeModal
        isOpen={isIntakeModalOpen}
        onClose={() => setIsIntakeModalOpen(false)}
      />
    </div>
  );
};
