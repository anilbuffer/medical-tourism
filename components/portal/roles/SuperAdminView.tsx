"use client";

import React, { useState } from "react";
import { PatientCase, AdminTab, AdminNavGroup } from "@/types/portal";
import { usePortal } from "@/lib/portal/store";
import { AdminDashboardOverview } from "./admin/AdminDashboardOverview";
import { AdminInternalStaff } from "./admin/AdminInternalStaff";
import { AdminHospitalDoctors } from "./admin/AdminHospitalDoctors";
import { AdminPermissionMatrix } from "./admin/AdminPermissionMatrix";
import { AdminConsentVersioning } from "./admin/AdminConsentVersioning";
import { AdminVisaRules } from "./admin/AdminVisaRules";
import { AdminRefundEscrowRules } from "./admin/AdminRefundEscrowRules";
import { AdminAccreditationRegistry } from "./admin/AdminAccreditationRegistry";
import { AdminCaseMasterDirectory } from "./admin/AdminCaseMasterDirectory";
import { AdminSlaEscalationEngine } from "./admin/AdminSlaEscalationEngine";
import { AdminNurtureQueue } from "./admin/AdminNurtureQueue";
import { AdminGatewayEscrow } from "./admin/AdminGatewayEscrow";
import { AdminCommissionPayouts } from "./admin/AdminCommissionPayouts";
import { AdminRefundApprovals } from "./admin/AdminRefundApprovals";
import { AdminSystemAuditTrail } from "./admin/AdminSystemAuditTrail";
import { AdminSecurityMfaLogs } from "./admin/AdminSecurityMfaLogs";
import { AdminMarketingUtmAnalytics } from "./admin/AdminMarketingUtmAnalytics";
import { AdminGeoSlaTimers } from "./admin/AdminGeoSlaTimers";
import { AdminRoutingAutomation } from "./admin/AdminRoutingAutomation";
import {
  LayoutDashboard,
  Users,
  Shield,
  Layers,
  Wallet,
  ClipboardList,
  Settings,
  RotateCcw,
  ChevronRight,
  Sparkles,
} from "lucide-react";

export type { AdminTab };

interface SuperAdminViewProps {
  cases: PatientCase[];
  activeTab?: AdminTab;
  onSelectTab?: (tab: AdminTab) => void;
}

export const SuperAdminView: React.FC<SuperAdminViewProps> = ({
  cases,
  activeTab: controlledTab,
  onSelectTab: controlledOnSelectTab,
}) => {
  const { currentUser, resetToDefaultData } = usePortal();
  const [internalTab, setInternalTab] = useState<AdminTab>("dashboard_overview");
  const activeTab = controlledTab ?? internalTab;

  const setActiveTab = (tab: AdminTab) => {
    if (controlledOnSelectTab) {
      controlledOnSelectTab(tab);
    } else {
      setInternalTab(tab);
    }
  };

  const pendingRefundsTotal = cases
    .flatMap((c) => c.refundRequests || [])
    .filter((r) => r.status === "pending_approval").length;
  const breachedSlaTotal = cases.filter((c) => c.slaBreached).length;
  const nurtureTotal = cases.filter((c) => c.stage === "nurture").length;

  // 7 Revised Navigation Domains Configuration matching exact user specification
  const NAV_GROUPS: {
    id: AdminNavGroup;
    label: string;
    icon: React.ElementType;
    items: { id: AdminTab; label: string; badge?: number }[];
  }[] = [
      {
        id: "dashboard_group",
        label: "Overview",
        icon: LayoutDashboard,
        items: [{ id: "dashboard_overview", label: "Overview" }],
      },
      {
        id: "user_rbac_group",
        label: "User Management",
        icon: Users,
        items: [
          { id: "internal_staff", label: "Internal Staff & CS Agents" },
          { id: "hospital_doctors", label: "Hospital Accounts & Doctors" },
          { id: "role_permission_matrix", label: "Role Permission Matrix (RLS)" },
        ],
      },
      {
        id: "compliance_legal_group",
        label: "Compliance and Legal Engine",
        icon: Shield,
        items: [
          { id: "consent_versioning", label: "Dynamic Consent Versioning" },
          { id: "visa_rules", label: "Visa Checklist Rules Table" },
          { id: "refund_escrow_rules", label: "Stage-Wise Refund & Escrow Rules" },
          { id: "accreditation_registry", label: "Accreditation Registry (JCI/NABH)", badge: 1 },
        ],
      },
      {
        id: "case_queues_group",
        label: "CaseJourney & Queues",
        icon: Layers,
        items: [
          { id: "case_master_directory", label: "Global Case Master Directory", badge: cases.length > 0 ? cases.length : undefined },
          { id: "sla_escalation_engine", label: "SLA & Escalation Rules Engine", badge: breachedSlaTotal > 0 ? breachedSlaTotal : undefined },
          { id: "nurture_queue", label: "Nurture & Re-engagement Queue", badge: nurtureTotal > 0 ? nurtureTotal : undefined },
        ],
      },
      {
        id: "financial_ledger_group",
        label: "Finance & Escrow",
        icon: Wallet,
        items: [
          { id: "gateway_escrow", label: "Gateway Transactions & Escrow" },
          { id: "commission_payouts", label: "Hospital Commission & Payouts" },
          { id: "refund_approvals", label: "Refund Approval Center", badge: pendingRefundsTotal > 0 ? pendingRefundsTotal : undefined },
        ],
      },
      {
        id: "system_audit_group",
        label: "System Audit and Logs",
        icon: ClipboardList,
        items: [
          { id: "system_audit_trail", label: "Full System Audit Trail (Read-Only)" },
          { id: "security_mfa_logs", label: "Security & MFA Enforcement Logs" },
          { id: "marketing_utm_analytics", label: "Marketing Attribution & UTM Analytics" },
        ],
      },
      {
        id: "system_config_group",
        label: "System Configuration",
        icon: Settings,
        items: [
          { id: "geo_sla_timers", label: "SLA Timers per Geographic Market" },
          { id: "routing_automation", label: "Routing & Queue Automation Logic" },
        ],
      },
    ];

  // Find active group and item
  const currentGroup =
    NAV_GROUPS.find((g) => g.items.some((i) => i.id === activeTab)) || NAV_GROUPS[0];
  const currentItem =
    currentGroup.items.find((i) => i.id === activeTab) || currentGroup.items[0];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Sub-Navigation Secondary Pill Bar for Active Group */}
      {currentGroup.items.length > 1 && (
        <div className="bg-white/95 backdrop-blur-md rounded-2xl p-1.5 border border-slate-200 shadow-xs flex items-center gap-1.5 overflow-x-auto">
          {currentGroup.items.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${isActive
                  ? "bg-gradient-to-r from-[#1d8983] via-[#1baba4] to-[#1d8983] text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
              >
                <span>{item.label}</span>
                {typeof item.badge === "number" && item.badge > 0 && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-black ${isActive ? "bg-white text-[#1d8983]" : "bg-[#2ECDC5] text-slate-950"
                      }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Render Appropriate Sub-Module Component */}
      {activeTab === "dashboard_overview" && (
        <AdminDashboardOverview
          cases={cases}
          currentUser={currentUser}
          onNavigateTab={setActiveTab}
          onResetDemoData={resetToDefaultData}
        />
      )}

      {activeTab === "internal_staff" && (
        <AdminInternalStaff cases={cases} onNavigateTab={setActiveTab} />
      )}

      {activeTab === "hospital_doctors" && (
        <AdminHospitalDoctors cases={cases} onNavigateTab={setActiveTab} />
      )}

      {activeTab === "role_permission_matrix" && (
        <AdminPermissionMatrix cases={cases} onNavigateTab={setActiveTab} />
      )}

      {activeTab === "consent_versioning" && (
        <AdminConsentVersioning onNavigateTab={setActiveTab} />
      )}

      {activeTab === "visa_rules" && (
        <AdminVisaRules onNavigateTab={setActiveTab} />
      )}

      {activeTab === "refund_escrow_rules" && (
        <AdminRefundEscrowRules onNavigateTab={setActiveTab} />
      )}

      {activeTab === "accreditation_registry" && (
        <AdminAccreditationRegistry onNavigateTab={setActiveTab} />
      )}

      {activeTab === "case_master_directory" && (
        <AdminCaseMasterDirectory cases={cases} onNavigateTab={setActiveTab} />
      )}

      {activeTab === "sla_escalation_engine" && (
        <AdminSlaEscalationEngine cases={cases} onNavigateTab={setActiveTab} />
      )}

      {activeTab === "nurture_queue" && (
        <AdminNurtureQueue cases={cases} onNavigateTab={setActiveTab} />
      )}

      {activeTab === "gateway_escrow" && (
        <AdminGatewayEscrow cases={cases} onNavigateTab={setActiveTab} />
      )}

      {activeTab === "commission_payouts" && (
        <AdminCommissionPayouts onNavigateTab={setActiveTab} />
      )}

      {activeTab === "refund_approvals" && (
        <AdminRefundApprovals cases={cases} onNavigateTab={setActiveTab} />
      )}

      {activeTab === "system_audit_trail" && (
        <AdminSystemAuditTrail cases={cases} onNavigateTab={setActiveTab} />
      )}

      {activeTab === "security_mfa_logs" && (
        <AdminSecurityMfaLogs onNavigateTab={setActiveTab} />
      )}

      {activeTab === "marketing_utm_analytics" && (
        <AdminMarketingUtmAnalytics cases={cases} onNavigateTab={setActiveTab} />
      )}

      {activeTab === "geo_sla_timers" && (
        <AdminGeoSlaTimers onNavigateTab={setActiveTab} />
      )}

      {activeTab === "routing_automation" && (
        <AdminRoutingAutomation onNavigateTab={setActiveTab} />
      )}
    </div>
  );
};
