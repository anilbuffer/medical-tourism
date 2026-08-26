"use client";

import React, { useState, useMemo } from "react";
import { PatientCase, UserRole, AdminTab } from "@/types/portal";
import {
  Shield,
  ShieldCheck,
  ShieldAlert,
  Lock,
  Users,
  Building2,
  Stethoscope,
  Wallet,
  FileCheck,
  Globe,
  Activity,
  Layers,
  Key,
  RotateCcw,
  FileText,
  Search,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Plus,
  X,
  Sparkles,
  UserCheck,
  Sliders,
  Eye,
  EyeOff,
  AlertCircle,
} from "lucide-react";

interface AdminPermissionMatrixProps {
  cases: PatientCase[];
  onNavigateTab?: (tab: AdminTab) => void;
}

interface RoleDefinition {
  id: UserRole | string;
  name: string;
  category: "internal" | "hospital";
  tier: string;
  userCount: number;
  icon: any;
  description: string;
  isSystemRole: boolean;
}

interface ModulePermission {
  id: string;
  name: string;
  category: "operations" | "compliance" | "financial" | "system" | "clinical";
  badgeTag: string;
  description: string;
  accessLevel: "Full (Read & Write)" | "Read Only" | "No Access" | "Custom";
  scopeBoundary:
    | "Unscoped (All Platform Data)"
    | "Assigned Queues Only"
    | "Assigned Hospital Only"
    | "Own Cases Only";
  subFieldsExpanded?: boolean;
  sensitiveControls: {
    clinicalNotes: boolean;
    demographics: boolean;
    billingBalance: boolean;
    medicalScans: boolean;
  };
}

export const AdminPermissionMatrix: React.FC<AdminPermissionMatrixProps> = ({
  cases,
  onNavigateTab,
}) => {
  const [selectedRoleId, setSelectedRoleId] = useState<string>("super_admin");
  const [moduleFilterCategory, setModuleFilterCategory] = useState<string>("all");
  const [moduleSearchQuery, setModuleSearchQuery] = useState("");
  const [roleSearchQuery, setRoleSearchQuery] = useState("");
  const [actionNotif, setActionNotif] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setActionNotif(msg);
    setTimeout(() => {
      setActionNotif(null);
    }, 4000);
  };

  // System Roles Registry
  const [roles, setRoles] = useState<RoleDefinition[]>([
    {
      id: "super_admin",
      name: "Super Admin",
      category: "internal",
      tier: "Internal Staff Tier",
      userCount: 2,
      icon: Shield,
      description:
        "Platform owner / IT administrator with full unscoped system control, user management, and security audit access.",
      isSystemRole: true,
    },
    {
      id: "customer_support",
      name: "CS Coordinator / Intake Lead",
      category: "internal",
      tier: "Internal Staff Tier",
      userCount: 5,
      icon: UserCheck,
      description:
        "Manages inbound referral intake pipeline to hospital handover, client profile creation, and initial SLA response triage.",
      isSystemRole: true,
    },
    {
      id: "finance_accounts",
      name: "Billing & Escrow Finance Staff",
      category: "internal",
      tier: "Internal Staff Tier",
      userCount: 2,
      icon: Wallet,
      description:
        "Controls multi-currency escrow vaults, Stripe gateway reconciliation, partner hospital commission payouts, and refund authorizations.",
      isSystemRole: true,
    },
    {
      id: "qa_compliance",
      name: "QA & Compliance Officer",
      category: "internal",
      tier: "Internal Staff Tier",
      userCount: 1,
      icon: FileCheck,
      description:
        "Audits HIPAA/GDPR legal consent versioning, hospital JCI/NABH accreditations, country visa rules, and cryptographic audit streams.",
      isSystemRole: true,
    },
    {
      id: "hospital_liaison",
      name: "Hospital Desk Liaison",
      category: "hospital",
      tier: "Hospital Account Tier",
      userCount: 4,
      icon: Building2,
      description:
        "Partner hospital admissions liaison reviewing incoming medical files, preparing customized quotes, and confirming bed availability.",
      isSystemRole: true,
    },
    {
      id: "hospital_doctor",
      name: "Consultant Doctor / Surgeon",
      category: "hospital",
      tier: "Clinical Tier",
      userCount: 6,
      icon: Stethoscope,
      description:
        "Accredited medical specialist reviewing patient medical reports, issuing clinical opinions, and executing surgical treatment plans.",
      isSystemRole: true,
    },
    {
      id: "radiologist_scan",
      name: "Radiologist / Scan Triage",
      category: "hospital",
      tier: "Clinical Tier",
      userCount: 2,
      icon: Activity,
      description:
        "Specialized imaging triage evaluating DICOM MRI, CT, and X-ray scans before formal surgical quote generation.",
      isSystemRole: true,
    },
    {
      id: "concierge_logistics",
      name: "Concierge & Logistics Lead",
      category: "internal",
      tier: "Support Tier",
      userCount: 3,
      icon: Globe,
      description:
        "Coordinates embassy medical visa invitation letters, airport transit dispatch, and patient companion accommodations.",
      isSystemRole: true,
    },
  ]);

  // Permissions Matrix per Role
  const [rolePermissions, setRolePermissions] = useState<Record<string, ModulePermission[]>>({
    super_admin: [
      {
        id: "case_journey",
        name: "Case Journey & Queues",
        category: "operations",
        badgeTag: "OPERATIONS",
        description: "Global intake pipeline, SLA routing rules, and nurture queue.",
        accessLevel: "Full (Read & Write)",
        scopeBoundary: "Unscoped (All Platform Data)",
        subFieldsExpanded: true,
        sensitiveControls: {
          clinicalNotes: true,
          demographics: true,
          billingBalance: true,
          medicalScans: true,
        },
      },
      {
        id: "client_profile",
        name: "Patients / Client Profile",
        category: "operations",
        badgeTag: "OPERATIONS",
        description: "Client demographics, clinical care plans, insurance billing details, and face sheets.",
        accessLevel: "Full (Read & Write)",
        scopeBoundary: "Unscoped (All Platform Data)",
        subFieldsExpanded: false,
        sensitiveControls: {
          clinicalNotes: true,
          demographics: true,
          billingBalance: true,
          medicalScans: true,
        },
      },
      {
        id: "clinical_workspace",
        name: "Clinical Workspace & Scans",
        category: "clinical",
        badgeTag: "CLINICAL",
        description: "DICOM scan viewer, treatment quotes, and surgical opinions.",
        accessLevel: "Full (Read & Write)",
        scopeBoundary: "Unscoped (All Platform Data)",
        subFieldsExpanded: false,
        sensitiveControls: {
          clinicalNotes: true,
          demographics: true,
          billingBalance: true,
          medicalScans: true,
        },
      },
      {
        id: "financial_ledger",
        name: "Financial & Escrow Vault",
        category: "financial",
        badgeTag: "FINANCIAL",
        description: "Multi-currency escrow vaults, Stripe gateway logs, and payouts.",
        accessLevel: "Full (Read & Write)",
        scopeBoundary: "Unscoped (All Platform Data)",
        subFieldsExpanded: false,
        sensitiveControls: {
          clinicalNotes: true,
          demographics: true,
          billingBalance: true,
          medicalScans: true,
        },
      },
      {
        id: "compliance_legal",
        name: "Compliance & Legal Engine",
        category: "compliance",
        badgeTag: "COMPLIANCE",
        description: "Consent versioning, country visa rules, and accreditation registry.",
        accessLevel: "Full (Read & Write)",
        scopeBoundary: "Unscoped (All Platform Data)",
        subFieldsExpanded: false,
        sensitiveControls: {
          clinicalNotes: true,
          demographics: true,
          billingBalance: true,
          medicalScans: true,
        },
      },
      {
        id: "system_audit",
        name: "System Audit & Security Logs",
        category: "system",
        badgeTag: "SECURITY",
        description: "Cryptographically sealed audit logs, MFA enforcement, and UTM tracking.",
        accessLevel: "Full (Read & Write)",
        scopeBoundary: "Unscoped (All Platform Data)",
        subFieldsExpanded: false,
        sensitiveControls: {
          clinicalNotes: true,
          demographics: true,
          billingBalance: true,
          medicalScans: true,
        },
      },
    ],
    customer_support: [
      {
        id: "case_journey",
        name: "Case Journey & Queues",
        category: "operations",
        badgeTag: "OPERATIONS",
        description: "Global intake pipeline, SLA routing rules, and nurture queue.",
        accessLevel: "Full (Read & Write)",
        scopeBoundary: "Assigned Queues Only",
        subFieldsExpanded: true,
        sensitiveControls: {
          clinicalNotes: true,
          demographics: true,
          billingBalance: false,
          medicalScans: true,
        },
      },
      {
        id: "client_profile",
        name: "Patients / Client Profile",
        category: "operations",
        badgeTag: "OPERATIONS",
        description: "Client demographics, clinical care plans, insurance billing details, and face sheets.",
        accessLevel: "Full (Read & Write)",
        scopeBoundary: "Assigned Queues Only",
        subFieldsExpanded: false,
        sensitiveControls: {
          clinicalNotes: true,
          demographics: true,
          billingBalance: false,
          medicalScans: true,
        },
      },
      {
        id: "clinical_workspace",
        name: "Clinical Workspace & Scans",
        category: "clinical",
        badgeTag: "CLINICAL",
        description: "DICOM scan viewer, treatment quotes, and surgical opinions.",
        accessLevel: "Read Only",
        scopeBoundary: "Assigned Queues Only",
        subFieldsExpanded: false,
        sensitiveControls: {
          clinicalNotes: true,
          demographics: true,
          billingBalance: false,
          medicalScans: true,
        },
      },
      {
        id: "financial_ledger",
        name: "Financial & Escrow Vault",
        category: "financial",
        badgeTag: "FINANCIAL",
        description: "Multi-currency escrow vaults, Stripe gateway logs, and payouts.",
        accessLevel: "No Access",
        scopeBoundary: "Own Cases Only",
        subFieldsExpanded: false,
        sensitiveControls: {
          clinicalNotes: false,
          demographics: false,
          billingBalance: false,
          medicalScans: false,
        },
      },
      {
        id: "compliance_legal",
        name: "Compliance & Legal Engine",
        category: "compliance",
        badgeTag: "COMPLIANCE",
        description: "Consent versioning, country visa rules, and accreditation registry.",
        accessLevel: "Read Only",
        scopeBoundary: "Unscoped (All Platform Data)",
        subFieldsExpanded: false,
        sensitiveControls: {
          clinicalNotes: false,
          demographics: true,
          billingBalance: false,
          medicalScans: false,
        },
      },
      {
        id: "system_audit",
        name: "System Audit & Security Logs",
        category: "system",
        badgeTag: "SECURITY",
        description: "Cryptographically sealed audit logs, MFA enforcement, and UTM tracking.",
        accessLevel: "No Access",
        scopeBoundary: "Own Cases Only",
        subFieldsExpanded: false,
        sensitiveControls: {
          clinicalNotes: false,
          demographics: false,
          billingBalance: false,
          medicalScans: false,
        },
      },
    ],
  });

  const selectedRole = useMemo(() => {
    return roles.find((r) => r.id === selectedRoleId) || roles[0];
  }, [roles, selectedRoleId]);

  const activePermissions = useMemo(() => {
    return rolePermissions[selectedRoleId] || rolePermissions["super_admin"] || [];
  }, [rolePermissions, selectedRoleId]);

  const filteredPermissions = useMemo(() => {
    return activePermissions.filter((m) => {
      const q = moduleSearchQuery.toLowerCase();
      const matchesSearch =
        m.name.toLowerCase().includes(q) || m.description.toLowerCase().includes(q);
      const matchesCat =
        moduleFilterCategory === "all" || m.category === moduleFilterCategory;
      return matchesSearch && matchesCat;
    });
  }, [activePermissions, moduleSearchQuery, moduleFilterCategory]);

  const handleAccessLevelChange = (moduleId: string, level: any) => {
    setRolePermissions((prev) => {
      const currentList = prev[selectedRoleId] || prev["super_admin"];
      const updated = currentList.map((m) =>
        m.id === moduleId ? { ...m, accessLevel: level } : m
      );
      return { ...prev, [selectedRoleId]: updated };
    });
    showNotification(`Updated Access Level to "${level}" for ${moduleId}.`);
  };

  const handleScopeBoundaryChange = (moduleId: string, boundary: any) => {
    setRolePermissions((prev) => {
      const currentList = prev[selectedRoleId] || prev["super_admin"];
      const updated = currentList.map((m) =>
        m.id === moduleId ? { ...m, scopeBoundary: boundary } : m
      );
      return { ...prev, [selectedRoleId]: updated };
    });
    showNotification(`Updated Scope Boundary to "${boundary}" for ${moduleId}.`);
  };

  const handleToggleSubFields = (moduleId: string) => {
    setRolePermissions((prev) => {
      const currentList = prev[selectedRoleId] || prev["super_admin"];
      const updated = currentList.map((m) =>
        m.id === moduleId ? { ...m, subFieldsExpanded: !m.subFieldsExpanded } : m
      );
      return { ...prev, [selectedRoleId]: updated };
    });
  };

  const handleToggleSensitiveControl = (
    moduleId: string,
    key: keyof ModulePermission["sensitiveControls"]
  ) => {
    setRolePermissions((prev) => {
      const currentList = prev[selectedRoleId] || prev["super_admin"];
      const updated = currentList.map((m) => {
        if (m.id === moduleId) {
          const updatedControls = {
            ...m.sensitiveControls,
            [key]: !m.sensitiveControls[key],
          };
          return { ...m, sensitiveControls: updatedControls };
        }
        return m;
      });
      return { ...prev, [selectedRoleId]: updated };
    });
    showNotification(`Toggled sensitive permission field "${key}".`);
  };

  const filteredRoles = useMemo(() => {
    return roles.filter((r) =>
      r.name.toLowerCase().includes(roleSearchQuery.toLowerCase())
    );
  }, [roles, roleSearchQuery]);

  const internalRoles = filteredRoles.filter((r) => r.category === "internal");
  const hospitalRoles = filteredRoles.filter((r) => r.category === "hospital");

  return (
    <div className="space-y-6 animate-in fade-in duration-300 font-sans pb-12">
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

      {/* TOP HEADER & TITLE BAR (Exact Reference 2 Styling) */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              User Management & Roles (RBAC)
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-teal-50 text-[#1baba4] text-[11px] font-bold border border-teal-200/80 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              HIPAA & DPDP Compliant
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Manage agency-wide user accounts, branch scope assignments, and configure 8-role granular access matrices.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => onNavigateTab && onNavigateTab("system_audit_trail")}
            className="px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200/80 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <FileText className="w-3.5 h-3.5 text-[#1baba4]" />
            <span>System Audit Log</span>
          </button>
          <button
            onClick={() => {
              showNotification("Reset all role permission policies to system defaults.");
            }}
            className="px-3 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-900 border border-slate-200/80 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs text-xs font-medium"
            title="Reset Defaults"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>
        </div>
      </div>

      {/* TOP 4 KPI METRIC CARDS RIBBON */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#1baba4] flex items-center justify-center shrink-0 border border-teal-100">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 leading-none">24</div>
            <div className="text-[11px] font-semibold text-slate-500 mt-1">Active Platform Users</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#3F4EB4] flex items-center justify-center shrink-0 border border-blue-100">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 leading-none">2</div>
            <div className="text-[11px] font-semibold text-slate-500 mt-1">Super Admin Owners</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 border border-purple-100">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 leading-none">8</div>
            <div className="text-[11px] font-semibold text-slate-500 mt-1">Defined Roles (Internal / Hospital)</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100">
            <Key className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 leading-none">2</div>
            <div className="text-[11px] font-semibold text-slate-500 mt-1">Pending Account Invites</div>
          </div>
        </div>
      </div>

      {/* SUB-NAVIGATION PILL TABS */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => onNavigateTab && onNavigateTab("internal_staff")}
          className="px-4 py-2 rounded-2xl bg-white hover:bg-slate-50 text-slate-600 font-bold text-xs border border-slate-200/80 flex items-center gap-2 shadow-xs transition-all cursor-pointer"
        >
          <Users className="w-4 h-4 text-slate-400" />
          <span>Users</span>
          <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold">
            24
          </span>
        </button>

        <button
          className="px-4 py-2 rounded-2xl bg-teal-50 text-[#1baba4] font-bold text-xs border border-teal-200/80 flex items-center gap-2 shadow-xs cursor-pointer"
        >
          <Lock className="w-4 h-4" />
          <span>Roles & Permissions</span>
          <span className="px-2 py-0.5 rounded-full bg-[#1baba4] text-white text-[10px] font-bold">
            8
          </span>
        </button>
      </div>

      {/* 2-COLUMN SPLIT LAYOUT (Exact Reference 2 Layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: SYSTEM ROLES LIST (4 Cols) */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-5 border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-4">
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900">System Roles (8)</h2>
              <span className="text-[10px] text-slate-400 font-mono">RBAC Matrix</span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">Select a role to configure permissions.</p>
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search roles..."
              value={roleSearchQuery}
              onChange={(e) => setRoleSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200/80 rounded-xl pl-8 pr-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1baba4]"
            />
          </div>

          {/* INTERNAL STAFF ROLES */}
          <div className="space-y-2">
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">
              Internal Staff Roles ({internalRoles.length})
            </span>

            <div className="space-y-1.5">
              {internalRoles.map((r) => {
                const isSelected = selectedRoleId === r.id;
                const Icon = r.icon;
                return (
                  <div
                    key={r.id}
                    onClick={() => setSelectedRoleId(r.id)}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer flex flex-col gap-1.5 ${
                      isSelected
                        ? "bg-slate-50/80 border-[#1baba4] shadow-xs ring-1 ring-[#1baba4]"
                        : "bg-white border-slate-200/80 hover:bg-slate-50/50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon
                          className={`w-3.5 h-3.5 ${
                            isSelected ? "text-[#1baba4]" : "text-slate-500"
                          }`}
                        />
                        <span
                          className={`font-bold text-xs ${
                            isSelected ? "text-slate-900" : "text-slate-700"
                          }`}
                        >
                          {r.name}
                        </span>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold">
                        👤 {r.userCount}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                      {r.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* HOSPITAL & CLINICAL ROLES */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">
              Hospital & Clinical Roles ({hospitalRoles.length})
            </span>

            <div className="space-y-1.5">
              {hospitalRoles.map((r) => {
                const isSelected = selectedRoleId === r.id;
                const Icon = r.icon;
                return (
                  <div
                    key={r.id}
                    onClick={() => setSelectedRoleId(r.id)}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer flex flex-col gap-1.5 ${
                      isSelected
                        ? "bg-slate-50/80 border-[#1baba4] shadow-xs ring-1 ring-[#1baba4]"
                        : "bg-white border-slate-200/80 hover:bg-slate-50/50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon
                          className={`w-3.5 h-3.5 ${
                            isSelected ? "text-[#1baba4]" : "text-slate-500"
                          }`}
                        />
                        <span
                          className={`font-bold text-xs ${
                            isSelected ? "text-slate-900" : "text-slate-700"
                          }`}
                        >
                          {r.name}
                        </span>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold">
                        👤 {r.userCount}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                      {r.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <button
            onClick={() => showNotification("Custom Role Builder opened.")}
            className="w-full py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ New Custom Role</span>
          </button>
        </div>

        {/* RIGHT COLUMN: PERMISSION MATRIX EDITOR (8 Cols) */}
        <div className="lg:col-span-8 space-y-4">
          {/* Selected Role Scope Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-slate-900">{selectedRole.name}</h2>
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold text-[10px] border border-slate-200">
                    System Role
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-teal-50 text-[#1baba4] font-bold text-[10px] border border-teal-200">
                    {selectedRole.tier}
                  </span>
                </div>
              </div>

              <button
                onClick={() => showNotification(`Reset ${selectedRole.name} permissions to default.`)}
                className="text-xs font-semibold text-slate-500 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Defaults</span>
              </button>
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs text-slate-600 leading-relaxed font-medium">
              {selectedRole.description}
            </div>

            {/* Sub-Filters Pill Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <div className="flex items-center bg-slate-50 p-1 rounded-2xl border border-slate-200/80 gap-1 w-full sm:w-auto overflow-x-auto">
                <button
                  onClick={() => setModuleFilterCategory("all")}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    moduleFilterCategory === "all"
                      ? "bg-white text-slate-900 shadow-xs border border-slate-200/60"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  All Modules (6)
                </button>
                <button
                  onClick={() => setModuleFilterCategory("operations")}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    moduleFilterCategory === "operations"
                      ? "bg-white text-slate-900 shadow-xs border border-slate-200/60"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  Operations
                </button>
                <button
                  onClick={() => setModuleFilterCategory("clinical")}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    moduleFilterCategory === "clinical"
                      ? "bg-white text-slate-900 shadow-xs border border-slate-200/60"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  Clinical
                </button>
                <button
                  onClick={() => setModuleFilterCategory("financial")}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    moduleFilterCategory === "financial"
                      ? "bg-white text-slate-900 shadow-xs border border-slate-200/60"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  Financial
                </button>
                <button
                  onClick={() => setModuleFilterCategory("system")}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    moduleFilterCategory === "system"
                      ? "bg-white text-slate-900 shadow-xs border border-slate-200/60"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  System
                </button>
              </div>

              <div className="relative w-full sm:w-48">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter modules..."
                  value={moduleSearchQuery}
                  onChange={(e) => setModuleSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200/80 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1baba4]"
                />
              </div>
            </div>
          </div>

          {/* PERMISSIONS MATRIX LIST & SENSITIVE CONTROLS */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.02)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 uppercase text-[10px] font-black tracking-wider bg-slate-50/50">
                    <th className="py-3.5 pl-6">MODULE NAME</th>
                    <th className="py-3.5 px-4">ACCESS LEVEL</th>
                    <th className="py-3.5 px-4">SCOPE BOUNDARY</th>
                    <th className="py-3.5 pr-6 text-right">SENSITIVE CONTROLS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {filteredPermissions.map((mod) => (
                    <React.Fragment key={mod.id}>
                      <tr className="hover:bg-slate-50/70 transition-colors">
                        {/* Module Name */}
                        <td className="py-4 pl-6 align-top">
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-slate-900 text-xs">{mod.name}</span>
                              <span className="px-1.5 py-0.2 rounded text-[9px] font-extrabold bg-slate-100 text-slate-600 border border-slate-200">
                                {mod.badgeTag}
                              </span>
                            </div>
                            <div className="text-[11px] text-slate-400 mt-0.5 max-w-xs leading-relaxed">
                              {mod.description}
                            </div>
                          </div>
                        </td>

                        {/* Access Level Dropdown */}
                        <td className="py-4 px-4 align-top">
                          <select
                            value={mod.accessLevel}
                            onChange={(e) => handleAccessLevelChange(mod.id, e.target.value)}
                            className="bg-emerald-50 text-emerald-900 border border-emerald-300 rounded-xl px-2.5 py-1.5 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#1baba4] cursor-pointer"
                          >
                            <option value="Full (Read & Write)">Full (Read & Write)</option>
                            <option value="Read Only">Read Only</option>
                            <option value="No Access">No Access</option>
                            <option value="Custom">Custom</option>
                          </select>
                        </td>

                        {/* Scope Boundary Dropdown */}
                        <td className="py-4 px-4 align-top">
                          <select
                            value={mod.scopeBoundary}
                            onChange={(e) => handleScopeBoundaryChange(mod.id, e.target.value)}
                            className="bg-slate-50 text-slate-800 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#1baba4] cursor-pointer"
                          >
                            <option value="Unscoped (All Platform Data)">Unscoped (All Platform Data)</option>
                            <option value="Assigned Queues Only">Assigned Queues Only</option>
                            <option value="Assigned Hospital Only">Assigned Hospital Only</option>
                            <option value="Own Cases Only">Own Cases Only</option>
                          </select>
                        </td>

                        {/* Sensitive Controls Action */}
                        <td className="py-4 pr-6 text-right align-top">
                          <button
                            onClick={() => handleToggleSubFields(mod.id)}
                            className="text-xs font-bold text-[#1baba4] hover:underline flex items-center gap-1 ml-auto cursor-pointer"
                          >
                            {mod.subFieldsExpanded ? "Hide Sub-Fields ▾" : "Show Sub-Fields ▸"}
                          </button>
                        </td>
                      </tr>

                      {/* Expandable Sensitive Field-Level Controls (Exact Reference 2 Box) */}
                      {mod.subFieldsExpanded && (
                        <tr>
                          <td colSpan={4} className="bg-slate-50/80 p-5 border-b border-slate-100">
                            <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-3">
                              <div className="flex items-center gap-2">
                                <ShieldAlert className="w-3.5 h-3.5 text-amber-500" />
                                <span className="text-xs font-bold text-slate-800">
                                  Sensitive Field-Level Access Control ({mod.name})
                                </span>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                                {/* Toggle 1: Clinical Notes */}
                                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60 flex items-center justify-between">
                                  <div>
                                    <div className="font-bold text-slate-800">Clinical Notes & Care Plan</div>
                                    <div className="text-[10px] text-slate-400">PHI, diagnosis codes, nursing notes, and care plan details.</div>
                                  </div>
                                  <input
                                    type="checkbox"
                                    checked={mod.sensitiveControls.clinicalNotes}
                                    onChange={() => handleToggleSensitiveControl(mod.id, "clinicalNotes")}
                                    className="w-4 h-4 text-[#1baba4] rounded border-slate-300 focus:ring-[#1baba4] cursor-pointer"
                                  />
                                </div>

                                {/* Toggle 2: Demographics */}
                                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60 flex items-center justify-between">
                                  <div>
                                    <div className="font-bold text-slate-800">Demographics & Insurance</div>
                                    <div className="text-[10px] text-slate-400">Client contact info, emergency contacts, and passport info.</div>
                                  </div>
                                  <input
                                    type="checkbox"
                                    checked={mod.sensitiveControls.demographics}
                                    onChange={() => handleToggleSensitiveControl(mod.id, "demographics")}
                                    className="w-4 h-4 text-[#1baba4] rounded border-slate-300 focus:ring-[#1baba4] cursor-pointer"
                                  />
                                </div>

                                {/* Toggle 3: Billing Balance */}
                                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60 flex items-center justify-between">
                                  <div>
                                    <div className="font-bold text-slate-800">Billing & Account Balance</div>
                                    <div className="text-[10px] text-slate-400">Client escrow balances, quotes, invoices, and payment ledger.</div>
                                  </div>
                                  <input
                                    type="checkbox"
                                    checked={mod.sensitiveControls.billingBalance}
                                    onChange={() => handleToggleSensitiveControl(mod.id, "billingBalance")}
                                    className="w-4 h-4 text-[#1baba4] rounded border-slate-300 focus:ring-[#1baba4] cursor-pointer"
                                  />
                                </div>

                                {/* Toggle 4: Medical Scans */}
                                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60 flex items-center justify-between">
                                  <div>
                                    <div className="font-bold text-slate-800">Restricted Medical Scans (DICOM)</div>
                                    <div className="text-[10px] text-slate-400">High-resolution radiological imaging and specialist scans.</div>
                                  </div>
                                  <input
                                    type="checkbox"
                                    checked={mod.sensitiveControls.medicalScans}
                                    onChange={() => handleToggleSensitiveControl(mod.id, "medicalScans")}
                                    className="w-4 h-4 text-[#1baba4] rounded border-slate-300 focus:ring-[#1baba4] cursor-pointer"
                                  />
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
