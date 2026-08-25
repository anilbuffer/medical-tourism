"use client";

import React, { useState, useMemo } from "react";
import { PatientCase } from "@/types/portal";
import { usePortal } from "@/lib/portal/store";
import {
  MOCK_PORTAL_USERS,
  MOCK_ACCREDITATION_PROFILES,
  MOCK_CONSENT_TEXT_VERSIONS,
  MOCK_VISA_CHECKLIST_RULES,
  MOCK_REFUND_RULES,
  MOCK_SLA_THRESHOLDS,
} from "@/lib/portal/mockData";
import {
  ShieldAlert,
  Users,
  Activity,
  Lock,
  Key,
  RotateCcw,
  BadgeCheck,
  FileText,
  Settings,
  Download,
  Filter,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Building2,
  Globe,
  BarChart2,
  LayoutDashboard,
  ClipboardList,
  UserCog,
  Shield,
  Clock,
} from "lucide-react";

export type AdminTab = "user_mgmt" | "compliance_config" | "accreditation" | "audit_reporting" | "system_config";

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
  const [internalTab, setInternalTab] = useState<AdminTab>("user_mgmt");
  const activeTab = controlledTab ?? internalTab;
  const setActiveTab = (tab: AdminTab) => {
    if (controlledOnSelectTab) {
      controlledOnSelectTab(tab);
    } else {
      setInternalTab(tab);
    }
  };

  // User mgmt
  const [userSearch, setUserSearch] = useState("");

  // Audit log filter
  const [auditRoleFilter, setAuditRoleFilter] = useState<string>("all");
  const [auditSearchQuery, setAuditSearchQuery] = useState("");

  const allAuditLogs = useMemo(
    () => cases.flatMap((c) => c.auditLogs).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()),
    [cases]
  );

  const filteredAuditLogs = useMemo(() => {
    let logs = allAuditLogs;
    if (auditRoleFilter !== "all") {
      logs = logs.filter((l) => l.actorRole === auditRoleFilter);
    }
    if (auditSearchQuery.trim()) {
      const q = auditSearchQuery.toLowerCase();
      logs = logs.filter(
        (l) =>
          l.action.toLowerCase().includes(q) ||
          l.actorName.toLowerCase().includes(q) ||
          (l.details || "").toLowerCase().includes(q) ||
          l.caseId.toLowerCase().includes(q)
      );
    }
    return logs;
  }, [allAuditLogs, auditRoleFilter, auditSearchQuery]);

  const filteredUsers = useMemo(() => {
    if (!userSearch.trim()) return MOCK_PORTAL_USERS;
    const q = userSearch.toLowerCase();
    return MOCK_PORTAL_USERS.filter(
      (u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.role.includes(q)
    );
  }, [userSearch]);

  // CAC / Funnel data
  const cac_data = useMemo(() => {
    const bySource: Record<string, { leads: number; conversions: number }> = {};
    cases.forEach((c) => {
      const src = c.utmSource || "direct";
      if (!bySource[src]) bySource[src] = { leads: 0, conversions: 0 };
      bySource[src].leads += 1;
      if (["booking", "treatment", "followup"].includes(c.stage)) {
        bySource[src].conversions += 1;
      }
    });
    return Object.entries(bySource).map(([source, d]) => ({
      source,
      leads: d.leads,
      conversions: d.conversions,
      rate: d.leads > 0 ? Math.round((d.conversions / d.leads) * 100) : 0,
    }));
  }, [cases]);

  const funnel_data = useMemo(() => {
    const stageCounts: Record<string, number> = {};
    cases.forEach((c) => {
      stageCounts[c.stage] = (stageCounts[c.stage] || 0) + 1;
    });
    const stages = ["lead", "contacted", "documents_collected", "hospital_handover", "consultation", "quote", "payment", "booking", "treatment", "followup"];
    return stages.map((s) => ({ stage: s, count: stageCounts[s] || 0 }));
  }, [cases]);

  const ADMIN_TABS: { id: AdminTab; label: string; icon: React.ElementType }[] = [
    { id: "user_mgmt", label: "User & Role Mgmt", icon: UserCog },
    { id: "compliance_config", label: "Compliance & Config", icon: ClipboardList },
    { id: "accreditation", label: "Accreditation", icon: BadgeCheck },
    { id: "audit_reporting", label: "Audit & Reporting", icon: BarChart2 },
    { id: "system_config", label: "System Config", icon: Settings },
  ];

  const ROLE_COLORS: Record<string, string> = {
    patient: "bg-blue-100 text-blue-800",
    hospital_doctor: "bg-purple-100 text-purple-800",
    customer_support: "bg-teal-100 text-teal-800",
    finance_accounts: "bg-emerald-100 text-emerald-800",
    super_admin: "bg-amber-100 text-amber-800",
  };

  const getAuditActionColor = (action: string) => {
    if (action.includes("DECLINED") || action.includes("FAILED") || action.includes("MISMATCH")) return "text-rose-700 bg-rose-50";
    if (action.includes("ACCEPTED") || action.includes("APPROVED") || action.includes("COMPLETED")) return "text-emerald-700 bg-emerald-50";
    if (action.includes("GRANT") || action.includes("ENABLED")) return "text-amber-700 bg-amber-50";
    return "text-slate-700 bg-slate-50";
  };

  const STAGE_LABELS: Record<string, string> = {
    lead: "Lead",
    contacted: "Contacted",
    documents_collected: "Docs Collected",
    hospital_handover: "Hospital Handover",
    consultation: "Consultation",
    quote: "Quote",
    payment: "Payment",
    booking: "Booking",
    treatment: "Treatment",
    followup: "Follow-up",
  };

  const maxFunnelCount = Math.max(...funnel_data.map((d) => d.count), 1);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#071321] via-[#0B1E33] to-[#0D2642] rounded-2xl p-6 sm:p-8 text-white shadow-xl border border-slate-800/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#3F4EB4]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3F4EB4]/20 text-[#2ECDC5] text-xs font-bold tracking-wider uppercase mb-2 border border-[#3F4EB4]/30">
            <Key className="w-3.5 h-3.5 text-[#2ECDC5]" />
            Super Admin Control Center
          </div>
          <h2 className="text-2xl font-black tracking-tight text-white">
            Enterprise Governance, RBAC & Compliance
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl">
            Logged in as <strong>{currentUser?.name || "Rajesh Verma"}</strong> (Full Super Admin Scope).
            System health, RLS policies, compliance config, and immutable audit logs.
          </p>
        </div>
        <button
          onClick={resetToDefaultData}
          className="relative z-10 px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs font-extrabold flex items-center gap-2 border border-white/20 transition-all cursor-pointer shrink-0"
        >
          <RotateCcw className="w-3.5 h-3.5 text-amber-300" />
          Reset Demo Data
        </button>
      </div>

      {/* Tab Bar */}
      <div className="flex overflow-x-auto gap-1.5 bg-white/95 rounded-2xl p-1.5 border border-slate-200 shadow-sm">
        {ADMIN_TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === tab.id
                ? "bg-gradient-to-r from-[#3F4EB4] to-[#2ECDC5] text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <tab.icon className="w-3.5 h-3.5" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {/* ─── USER MANAGEMENT ────────────────────────────────────────────── */}
      {activeTab === "user_mgmt" && (
        <div className="space-y-5">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h3 className="font-black text-slate-900 text-lg">User & Role Management</h3>
              <p className="text-xs text-slate-500 mt-0.5">Create, deactivate, assign queues, and enforce MFA policy across all roles.</p>
            </div>
            <button className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#3F4EB4] to-[#2ECDC5] text-white font-extrabold text-xs flex items-center gap-2 cursor-pointer shadow-md">
              + Create Account
            </button>
          </div>

          {/* Search */}
          <input
            type="text"
            placeholder="Search users by name, email, or role…"
            value={userSearch}
            onChange={(e) => setUserSearch(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-2xl px-4 py-3 text-xs text-slate-900 focus:ring-2 focus:ring-[#2ECDC5] focus:outline-none"
          />

          {/* Users Table */}
          <div className="bg-white/95 rounded-2xl border border-slate-200 shadow-sm overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 uppercase text-[10px] font-bold">
                  <th className="pb-3 pt-4 pl-5 text-left">User</th>
                  <th className="pb-3 pt-4 text-left">Role</th>
                  <th className="pb-3 pt-4 text-left">MFA</th>
                  <th className="pb-3 pt-4 text-left">Status</th>
                  <th className="pb-3 pt-4 pr-5 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 pl-5">
                      <div className="flex items-center gap-3">
                        {u.avatar && <img src={u.avatar} alt={u.name} className="w-8 h-8 rounded-full object-cover" />}
                        <div>
                          <div className="font-bold text-slate-900">{u.name}</div>
                          <div className="text-[11px] text-slate-500">{u.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${ROLE_COLORS[u.role] || "bg-slate-100 text-slate-700"}`}>
                        {u.role.replace(/_/g, " ")}
                      </span>
                    </td>
                    <td className="py-4">
                      {u.mfaEnforced ? (
                        <span className="flex items-center gap-1 text-emerald-700 font-bold text-[10px]">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Enforced
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-amber-600 font-bold text-[10px]">
                          <AlertTriangle className="w-3.5 h-3.5" /> Not Enforced
                        </span>
                      )}
                    </td>
                    <td className="py-4">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${u.isActive !== false ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"}`}>
                        {u.isActive !== false ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="py-4 pr-5">
                      <div className="flex items-center gap-2">
                        <button className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer transition-all">Edit</button>
                        <button className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-rose-50 hover:bg-rose-100 text-rose-700 cursor-pointer transition-all">Deactivate</button>
                        {!u.mfaEnforced && (
                          <button className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-amber-50 hover:bg-amber-100 text-amber-700 cursor-pointer transition-all">Enforce MFA</button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* RBAC Summary */}
          <div className="bg-white/95 rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
            <h4 className="font-black text-slate-900 text-sm flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#3F4EB4]" />
              RBAC Enforcement Matrix
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px] font-bold">
                    <th className="pb-3 text-left">Role</th>
                    <th className="pb-3 text-left">Access Scope</th>
                    <th className="pb-3 text-left">Clinical</th>
                    <th className="pb-3 text-left">Financial</th>
                    <th className="pb-3 text-left">Enforcement</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {[
                    { role: "Patient Portal", scope: "Own case, own records only", clinical: "Own records", financial: "Own staged payments", enforcement: "DB RLS Policy" },
                    { role: "Hospital / Doctor", scope: "Only cases assigned to hospital/doctor (RLS)", clinical: "Full R/W", financial: "Restricted", enforcement: "DB RLS Policy" },
                    { role: "Customer Support", scope: "All cases in assigned queue(s)", clinical: "View-only (No Edit)", financial: "View quote status", enforcement: "Field Redaction" },
                    { role: "Finance & Accounts", scope: "All payment records — no clinical by default", clinical: "Redacted (Dispute only)", financial: "Full Escrow Access", enforcement: "Query Sanitizer" },
                    { role: "Super Admin", scope: "Full system config & audit", clinical: "Full Access", financial: "Full Access", enforcement: "Unrestricted Master" },
                  ].map((row) => (
                    <tr key={row.role} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 font-bold text-slate-900">{row.role}</td>
                      <td className="py-3 text-slate-600 max-w-[200px]">{row.scope}</td>
                      <td className="py-3 text-slate-700">{row.clinical}</td>
                      <td className="py-3 text-slate-700">{row.financial}</td>
                      <td className="py-3 font-bold text-[#3F4EB4]">{row.enforcement}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ─── COMPLIANCE & CONFIG ─────────────────────────────────────────── */}
      {activeTab === "compliance_config" && (
        <div className="space-y-5">
          <div>
            <h3 className="font-black text-slate-900 text-lg">Compliance & Configuration</h3>
            <p className="text-xs text-slate-500 mt-0.5">Manage consent texts, visa checklists, refund rules, and marketing compliance.</p>
          </div>

          {/* Consent Text Versioning */}
          <div className="bg-white/95 rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-black text-slate-900 text-sm flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#3F4EB4]" />
                Consent Text Versioning (Per Consent Type × Country)
              </h4>
              <button className="px-3 py-1.5 rounded-xl bg-[#3F4EB4] text-white text-xs font-bold cursor-pointer">+ Upload New Version</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px] font-bold">
                    <th className="pb-3 text-left">Consent Type</th>
                    <th className="pb-3 text-left">Country</th>
                    <th className="pb-3 text-left">Version</th>
                    <th className="pb-3 text-left">Uploaded By</th>
                    <th className="pb-3 text-left">Status</th>
                    <th className="pb-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {MOCK_CONSENT_TEXT_VERSIONS.map((ctv) => (
                    <tr key={ctv.id} className="hover:bg-slate-50">
                      <td className="py-3 font-semibold text-slate-800">{ctv.consentType.replace(/_/g, " ")}</td>
                      <td className="py-3 text-slate-600">{ctv.country}</td>
                      <td className="py-3 font-mono font-bold text-[#3F4EB4]">{ctv.version}</td>
                      <td className="py-3 text-slate-600">{ctv.uploadedByName}</td>
                      <td className="py-3">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${ctv.isActive ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-600"}`}>
                          {ctv.isActive ? "Active" : "Archived"}
                        </span>
                      </td>
                      <td className="py-3">
                        <button className="text-[10px] font-bold text-[#3F4EB4] hover:underline cursor-pointer">View / Edit</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Visa Checklist Rules */}
          <div className="bg-white/95 rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-black text-slate-900 text-sm flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#3F4EB4]" />
                Visa Document Checklist Rules (Per Patient Home Country)
              </h4>
              <button className="px-3 py-1.5 rounded-xl bg-[#3F4EB4] text-white text-xs font-bold cursor-pointer">+ Add Country Rule</button>
            </div>
            <div className="space-y-3">
              {MOCK_VISA_CHECKLIST_RULES.map((rule) => (
                <div key={rule.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-bold text-slate-900 text-xs">{rule.patientHomeCountry}</div>
                    <span className="text-[10px] text-slate-500">Updated: {new Date(rule.lastUpdatedAt).toLocaleDateString()}</span>
                  </div>
                  <div className="space-y-1">
                    {rule.requiredDocuments.map((d, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                        {d.mandatory ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> : <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" />}
                        {d.name} {d.note && <span className="text-slate-400">({d.note})</span>}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Refund Rules */}
          <div className="bg-white/95 rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-black text-slate-900 text-sm flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#3F4EB4]" />
                Refund / Cancellation Rules (Per Payment Stage)
              </h4>
              <button className="px-3 py-1.5 rounded-xl bg-[#3F4EB4] text-white text-xs font-bold cursor-pointer">+ Add Rule</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px] font-bold">
                    <th className="pb-3 text-left">Stage</th>
                    <th className="pb-3 text-left">Refund %</th>
                    <th className="pb-3 text-left">Conditions</th>
                    <th className="pb-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {MOCK_REFUND_RULES.map((r) => (
                    <tr key={r.id} className="hover:bg-slate-50">
                      <td className="py-3 font-bold text-slate-900 capitalize">{r.paymentStage}</td>
                      <td className="py-3">
                        <span className={`font-black text-sm ${r.refundPercentage === 100 ? "text-emerald-700" : r.refundPercentage === 0 ? "text-rose-700" : "text-amber-700"}`}>
                          {r.refundPercentage}%
                        </span>
                      </td>
                      <td className="py-3 text-slate-600 max-w-xs">{r.conditions}</td>
                      <td className="py-3">
                        <button className="text-[10px] font-bold text-[#3F4EB4] hover:underline cursor-pointer">Edit</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Marketing / Advertising flag */}
          <div className="p-5 bg-amber-50 border border-amber-200 rounded-2xl space-y-2">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
              <h4 className="font-black text-amber-900 text-sm">Advertising / Marketing Content Flag</h4>
            </div>
            <p className="text-xs text-amber-800">
              Marketing content flagged for compliance review will appear here. All promotional materials require sign-off before publishing.
            </p>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full">0 items pending review</span>
              <button className="px-3 py-1.5 text-xs font-bold text-amber-700 bg-amber-100 hover:bg-amber-200 rounded-xl cursor-pointer">Review Queue</button>
            </div>
          </div>
        </div>
      )}

      {/* ─── ACCREDITATION MANAGEMENT ───────────────────────────────────── */}
      {activeTab === "accreditation" && (
        <div className="space-y-5">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h3 className="font-black text-slate-900 text-lg">Accreditation Management</h3>
              <p className="text-xs text-slate-500 mt-0.5">Maintain JCI/NABH records, expiry dates, and documents for all partner hospitals.</p>
            </div>
            <button className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#3F4EB4] to-[#2ECDC5] text-white font-extrabold text-xs cursor-pointer shadow-md">
              + Add Hospital
            </button>
          </div>
          <div className="space-y-4">
            {MOCK_ACCREDITATION_PROFILES.map((acc) => (
              <div key={acc.hospitalId} className="bg-white/95 rounded-2xl border border-slate-200 shadow-sm p-6">
                <div className="flex items-start justify-between gap-3 flex-wrap mb-4">
                  <div>
                    <div className="font-black text-slate-900 text-base">{acc.hospitalName}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{acc.city}, {acc.country}</div>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {acc.specialties.map((s) => (
                        <span key={s} className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">{s}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer">Edit</button>
                    <button className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold cursor-pointer">Deactivate</button>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {[
                    { label: "JCI Accreditation", status: acc.jciStatus, expiry: acc.jciExpiry },
                    { label: "NABH Accreditation", status: acc.nabhStatus, expiry: acc.nabhExpiry },
                  ].map((item) => (
                    <div key={item.label} className={`p-4 rounded-xl border ${
                      item.status === "active" ? "bg-emerald-50 border-emerald-200" :
                      item.status === "expired" ? "bg-rose-50 border-rose-200" :
                      "bg-amber-50 border-amber-200"
                    }`}>
                      <div className="flex items-center justify-between">
                        <div className="font-bold text-slate-900">{item.label}</div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                          item.status === "active" ? "bg-emerald-100 text-emerald-800 border-emerald-200" :
                          item.status === "expired" ? "bg-rose-100 text-rose-800 border-rose-200" :
                          "bg-amber-100 text-amber-800 border-amber-200"
                        }`}>
                          {item.status === "active" ? "✓ Active" : item.status === "expired" ? "Expired" : "Pending Renewal"}
                        </span>
                      </div>
                      {item.expiry && (
                        <div className="text-slate-600 mt-1">Expiry: <strong>{item.expiry}</strong></div>
                      )}
                      <button className="mt-2 text-[10px] font-bold text-[#3F4EB4] hover:underline cursor-pointer">View / Upload Document</button>
                    </div>
                  ))}
                </div>
                <div className="text-[11px] text-slate-500 mt-3">Last audited: {acc.lastAuditedAt}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ─── AUDIT & REPORTING ──────────────────────────────────────────── */}
      {activeTab === "audit_reporting" && (
        <div className="space-y-5">
          <h3 className="font-black text-slate-900 text-lg">Audit & Reporting</h3>

          {/* Audit Log Viewer */}
          <div className="bg-white/95 rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <h4 className="font-black text-slate-900 text-sm flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#2ECDC5]" />
                Full Audit Log Viewer
              </h4>
              <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-800 text-xs font-bold cursor-pointer border border-emerald-200">
                <Download className="w-3.5 h-3.5" />
                Export CSV
              </button>
            </div>

            {/* Filters */}
            <div className="flex gap-3 flex-wrap">
              <input
                type="text"
                placeholder="Search by action, actor, case ID…"
                value={auditSearchQuery}
                onChange={(e) => setAuditSearchQuery(e.target.value)}
                className="flex-1 min-w-0 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:ring-2 focus:ring-[#2ECDC5] focus:outline-none"
              />
              <select
                value={auditRoleFilter}
                onChange={(e) => setAuditRoleFilter(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-bold focus:ring-2 focus:ring-[#2ECDC5] focus:outline-none cursor-pointer"
              >
                <option value="all">All Roles</option>
                <option value="public">Public</option>
                <option value="patient">Patient</option>
                <option value="hospital_doctor">Hospital Doctor</option>
                <option value="customer_support">Customer Support</option>
                <option value="finance_accounts">Finance</option>
                <option value="super_admin">Super Admin</option>
              </select>
            </div>

            <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
              {filteredAuditLogs.length === 0 ? (
                <div className="text-xs text-slate-400 text-center py-6">No audit logs match your filter.</div>
              ) : (
                filteredAuditLogs.map((log) => (
                  <div
                    key={log.id}
                    className="p-3.5 rounded-xl border border-slate-200 text-xs flex items-start justify-between gap-4 hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <span className={`inline-block font-bold px-2 py-0.5 rounded-md text-[10px] mb-1 ${getAuditActionColor(log.action)}`}>
                        [{log.action}]
                      </span>
                      <div className="text-slate-700 mt-0.5 leading-relaxed truncate">{log.details}</div>
                      <div className="text-slate-500 text-[11px] mt-0.5 font-mono">{log.caseId}</div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="font-bold text-slate-900 text-[11px]">{log.actorName}</div>
                      <div className="text-slate-400 text-[10px]">{log.actorRole.replace(/_/g, " ")}</div>
                      <div className="text-slate-400 text-[10px]">{new Date(log.timestamp).toLocaleString()}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* CAC / Source Performance */}
          <div className="bg-white/95 rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
            <h4 className="font-black text-slate-900 text-sm flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-[#3F4EB4]" />
              CAC / Source Performance (UTM Data)
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px] font-bold">
                    <th className="pb-3 text-left">Source</th>
                    <th className="pb-3 text-left">Leads</th>
                    <th className="pb-3 text-left">Conversions</th>
                    <th className="pb-3 text-left">Conv. Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {cac_data.map((row) => (
                    <tr key={row.source} className="hover:bg-slate-50">
                      <td className="py-3 font-semibold text-slate-800 font-mono">{row.source}</td>
                      <td className="py-3 text-slate-700">{row.leads}</td>
                      <td className="py-3 text-emerald-700 font-bold">{row.conversions}</td>
                      <td className="py-3">
                        <span className={`font-black ${row.rate >= 50 ? "text-emerald-700" : row.rate >= 25 ? "text-amber-700" : "text-rose-700"}`}>
                          {row.rate}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Case Funnel */}
          <div className="bg-white/95 rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
            <h4 className="font-black text-slate-900 text-sm flex items-center gap-2">
              <LayoutDashboard className="w-4 h-4 text-[#3F4EB4]" />
              Case Funnel (By Stage)
            </h4>
            <div className="space-y-2.5">
              {funnel_data.map((d) => (
                <div key={d.stage} className="flex items-center gap-3">
                  <div className="text-[10px] font-bold text-slate-500 uppercase w-28 shrink-0">{STAGE_LABELS[d.stage] || d.stage}</div>
                  <div className="flex-1 bg-slate-100 rounded-full h-4 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#3F4EB4] to-[#2ECDC5] transition-all duration-500"
                      style={{ width: `${Math.max((d.count / maxFunnelCount) * 100, d.count > 0 ? 5 : 0)}%` }}
                    />
                  </div>
                  <div className="text-xs font-black text-slate-900 w-6 text-right">{d.count}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ─── SYSTEM CONFIG ──────────────────────────────────────────────── */}
      {activeTab === "system_config" && (
        <div className="space-y-5">
          <div>
            <h3 className="font-black text-slate-900 text-lg">System Configuration</h3>
            <p className="text-xs text-slate-500 mt-0.5">SLA thresholds per market, queue routing rules, and system resets.</p>
          </div>

          {/* SLA Thresholds */}
          <div className="bg-white/95 rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-black text-slate-900 text-sm flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#3F4EB4]" />
                SLA Timer Thresholds Per Market
              </h4>
              <button className="px-3 py-1.5 rounded-xl bg-[#3F4EB4] text-white text-xs font-bold cursor-pointer">+ Add Market</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px] font-bold">
                    <th className="pb-3 text-left">Market</th>
                    <th className="pb-3 text-left">Tier 1 SLA</th>
                    <th className="pb-3 text-left">Tier 2 SLA</th>
                    <th className="pb-3 text-left">Escalation</th>
                    <th className="pb-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {MOCK_SLA_THRESHOLDS.map((s) => (
                    <tr key={s.market} className="hover:bg-slate-50">
                      <td className="py-3 font-bold text-slate-900">{s.market}</td>
                      <td className="py-3 text-emerald-700 font-bold">{s.tier1Minutes}m</td>
                      <td className="py-3 text-amber-700 font-bold">{s.tier2Minutes}m</td>
                      <td className="py-3 text-rose-700 font-bold">{s.escalationMinutes}m</td>
                      <td className="py-3">
                        <button className="text-[10px] font-bold text-[#3F4EB4] hover:underline cursor-pointer">Edit</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Queue Routing Rules */}
          <div className="bg-white/95 rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-black text-slate-900 text-sm flex items-center gap-2">
                <Filter className="w-4 h-4 text-[#3F4EB4]" />
                Queue Routing Rules
              </h4>
              <button className="px-3 py-1.5 rounded-xl bg-[#3F4EB4] text-white text-xs font-bold cursor-pointer">+ Add Rule</button>
            </div>
            <div className="space-y-2">
              {[
                { keyword: "cardiac, heart, TAVR, TAVI", queue: "Cardiology_Tier1", priority: "High" },
                { keyword: "cancer, oncology, chemotherapy, CyberKnife", queue: "Oncology_EMEA", priority: "High" },
                { keyword: "orthopedic, joint, knee, hip, spine", queue: "Orthopedics_MENA", priority: "Medium" },
                { keyword: "(all others)", queue: "General_Global", priority: "Standard" },
              ].map((rule, idx) => (
                <div key={idx} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs flex items-center justify-between gap-3 flex-wrap">
                  <div>
                    <div className="font-bold text-slate-900">Keywords: <span className="font-mono text-[#3F4EB4]">{rule.keyword}</span></div>
                    <div className="text-slate-500 mt-0.5">→ Queue: <strong>{rule.queue}</strong> · Priority: <strong>{rule.priority}</strong></div>
                  </div>
                  <button className="text-[10px] font-bold text-[#3F4EB4] hover:underline cursor-pointer">Edit</button>
                </div>
              ))}
            </div>
          </div>

          {/* Danger Zone */}
          <div className="p-5 bg-rose-50 border border-rose-200 rounded-2xl space-y-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-700 shrink-0" />
              <h4 className="font-black text-rose-900 text-sm">Danger Zone — Demo Reset</h4>
            </div>
            <p className="text-xs text-rose-700">Resets all demo data back to factory defaults. This cannot be undone.</p>
            <button
              onClick={resetToDefaultData}
              className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-extrabold flex items-center gap-2 cursor-pointer transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset All Demo Data to Factory Defaults
            </button>
          </div>
        </div>
      )}
    </div>
  );
};


