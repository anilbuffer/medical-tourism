"use client";

import React, { useState, useMemo } from "react";
import { PortalUser, PatientCase, AdminTab, UserRole } from "@/types/portal";
import { MOCK_PORTAL_USERS } from "@/lib/portal/mockData";
import {
  Users,
  UserCheck,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Lock,
  Mail,
  Phone,
  Search,
  Filter,
  Plus,
  Sliders,
  X,
  Clock,
  Sparkles,
  MoreVertical,
  Shield,
  Layers,
  Key,
  RotateCcw,
  FileText,
  Building2,
  Globe,
  Check,
  UserPlus,
  ShieldAlert,
  ArrowRight,
} from "lucide-react";

interface AdminInternalStaffProps {
  cases: PatientCase[];
  onNavigateTab?: (tab: AdminTab) => void;
}

export const AdminInternalStaff: React.FC<AdminInternalStaffProps> = ({ cases, onNavigateTab }) => {
  const [users, setUsers] = useState<PortalUser[]>(() => {
    // Enrich mock users with branch/scope and last login details if missing
    return MOCK_PORTAL_USERS.map((u, idx) => ({
      ...u,
      branchScope:
        u.role === "super_admin"
          ? "Central Headquarters / Global"
          : u.role === "customer_support"
          ? idx % 2 === 0
            ? "GCC & MENA Regional Desk"
            : "Africa & EMEA Regional Desk"
          : u.role === "hospital_doctor"
          ? "Apollo Hospitals Tier-1 Desk"
          : u.role === "finance_accounts"
          ? "Central Headquarters / Escrow Vault"
          : "Linked to 1 Patient Client",
      lastLogin:
        idx === 0
          ? "Today, 8:42 AM"
          : idx === 1
          ? "Today, 9:15 AM"
          : idx === 2
          ? "Yesterday, 4:15 PM"
          : idx === 3
          ? "Today, 11:20 AM"
          : idx === 4
          ? "3 days ago"
          : "Never logged in",
      status: (u.isActive ? "active" : "invited") as "active" | "invited" | "suspended",
    }));
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [branchFilter, setBranchFilter] = useState<string>("all");
  const [selectedUser, setSelectedUser] = useState<PortalUser | null>(null);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [actionNotif, setActionNotif] = useState<string | null>(null);

  // Invite Form State
  const [inviteName, setInviteName] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<UserRole>("customer_support");
  const [inviteBranch, setInviteBranch] = useState("GCC & MENA Regional Desk");
  const [inviteMfa, setInviteMfa] = useState(true);

  const showNotification = (msg: string) => {
    setActionNotif(msg);
    setTimeout(() => {
      setActionNotif(null);
    }, 4000);
  };

  // KPI Metrics Calculation
  const totalActiveUsers = users.filter((u) => u.isActive).length;
  const superAdminCount = users.filter((u) => u.role === "super_admin").length;
  const definedRolesCount = 8;
  const pendingInvitesCount = users.filter((u) => !u.isActive).length || 2;

  // Filtered Users
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        (u.name || "").toLowerCase().includes(q) ||
        (u.email || "").toLowerCase().includes(q) ||
        ((u as any).branchScope || "").toLowerCase().includes(q);

      const matchesRole = roleFilter === "all" || u.role === roleFilter;
      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && u.isActive) ||
        (statusFilter === "invited" && !u.isActive);

      const matchesBranch =
        branchFilter === "all" ||
        ((u as any).branchScope || "").toLowerCase().includes(branchFilter.toLowerCase());

      return matchesSearch && matchesRole && matchesStatus && matchesBranch;
    });
  }, [users, searchQuery, roleFilter, statusFilter, branchFilter]);

  const handleInviteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteName || !inviteEmail) return;

    const newUser: PortalUser = {
      id: `user_${Date.now()}`,
      name: inviteName,
      email: inviteEmail,
      role: inviteRole,
      isActive: true,
      mfaEnforced: inviteMfa,
      country: "Global Desk",
      phone: "+1 (555) 019-2831",
      assignedQueues: ["General_Global", "Intake_P1"],
    };

    (newUser as any).branchScope = inviteBranch;
    (newUser as any).lastLogin = "Invited just now";
    (newUser as any).status = "active";

    setUsers([newUser, ...users]);
    setIsInviteModalOpen(false);
    setInviteName("");
    setInviteEmail("");
    showNotification(`Account invite dispatched to ${inviteEmail} with MFA pre-enforced.`);
  };

  const handleToggleMfa = (userId: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          const updated = { ...u, mfaEnforced: !u.mfaEnforced };
          showNotification(
            `MFA requirement ${updated.mfaEnforced ? "enforced" : "relaxed"} for ${u.name}.`
          );
          return updated;
        }
        return u;
      })
    );
  };

  const handleToggleActive = (userId: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          const updated = { ...u, isActive: !u.isActive };
          showNotification(
            `User account for ${u.name} marked as ${updated.isActive ? "Active" : "Suspended"}.`
          );
          return updated;
        }
        return u;
      })
    );
  };

  const getRoleBadgeStyle = (role: string) => {
    switch (role) {
      case "super_admin":
        return "bg-slate-900 text-white border-slate-900";
      case "customer_support":
        return "bg-slate-100 text-slate-800 border-slate-200/80";
      case "hospital_doctor":
        return "bg-purple-50 text-purple-800 border-purple-200/80";
      case "finance_accounts":
        return "bg-emerald-50 text-emerald-800 border-emerald-200/80";
      case "patient":
        return "bg-blue-50 text-[#3F4EB4] border-blue-200/80";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case "super_admin":
        return "Super Admin";
      case "customer_support":
        return "CS Coordinator / Intake Lead";
      case "hospital_doctor":
        return "Hospital Desk Doctor / Liaison";
      case "finance_accounts":
        return "Billing & Escrow Finance Staff";
      case "patient":
        return "Client (Patient / Family)";
      default:
        return (role || "Staff").replace(/_/g, " ");
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

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

      {/* TOP HEADER & TITLE BAR (Exact Reference 1 Styling) */}
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
            Manage agency-wide user accounts, regional desk scope assignments, and configure 8-role granular access matrices.
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
              setUsers(MOCK_PORTAL_USERS);
              showNotification("Reset user directory to system defaults.");
            }}
            className="px-3 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-900 border border-slate-200/80 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs text-xs font-medium"
            title="Reset Defaults"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>
        </div>
      </div>

      {/* TOP 4 KPI METRIC CARDS RIBBON (Exact Reference Layout) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Active Users */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#1baba4] flex items-center justify-center shrink-0 border border-teal-100">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 leading-none">{totalActiveUsers}</div>
            <div className="text-[11px] font-semibold text-slate-500 mt-1">Active Platform Users</div>
          </div>
        </div>

        {/* Card 2: Super Admin Owners */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#3F4EB4] flex items-center justify-center shrink-0 border border-blue-100">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 leading-none">{superAdminCount}</div>
            <div className="text-[11px] font-semibold text-slate-500 mt-1">Super Admin Owners</div>
          </div>
        </div>

        {/* Card 3: Defined Roles */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 border border-purple-100">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 leading-none">{definedRolesCount}</div>
            <div className="text-[11px] font-semibold text-slate-500 mt-1">Defined Roles (Internal / Hospital)</div>
          </div>
        </div>

        {/* Card 4: Pending Invites */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100">
            <Key className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 leading-none">{pendingInvitesCount}</div>
            <div className="text-[11px] font-semibold text-slate-500 mt-1">Pending Account Invites</div>
          </div>
        </div>
      </div>

      {/* SUB-NAVIGATION PILL TABS */}
      <div className="flex items-center gap-2">
        <button
          className="px-4 py-2 rounded-2xl bg-teal-50 text-[#1baba4] font-bold text-xs border border-teal-200/80 flex items-center gap-2 shadow-xs cursor-pointer"
        >
          <Users className="w-4 h-4" />
          <span>Users</span>
          <span className="px-2 py-0.5 rounded-full bg-[#1baba4] text-white text-[10px] font-bold">
            {filteredUsers.length}
          </span>
        </button>

        <button
          onClick={() => onNavigateTab && onNavigateTab("role_permission_matrix")}
          className="px-4 py-2 rounded-2xl bg-white hover:bg-slate-50 text-slate-600 font-bold text-xs border border-slate-200/80 flex items-center gap-2 shadow-xs transition-all cursor-pointer"
        >
          <Lock className="w-4 h-4 text-slate-400" />
          <span>Roles & Permissions</span>
          <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold">
            {definedRolesCount}
          </span>
        </button>
      </div>

      {/* FILTER TOOLBAR & INVITE ACTION (Exact Reference 1 Layout) */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-3">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, email, or regional scope..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200/80 rounded-2xl pl-9 pr-4 py-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-[#1baba4] focus:outline-none placeholder-slate-400 font-medium"
            />
          </div>

          <button
            onClick={() => setIsInviteModalOpen(true)}
            className="w-full sm:w-auto px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#1d8983] via-[#1baba4] to-[#1d8983] hover:opacity-95 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-sm transition-all shrink-0 hover:scale-[1.02]"
          >
            <UserPlus className="w-4 h-4 text-white" />
            <span>+ Invite User</span>
          </button>
        </div>

        {/* 3 Dropdown Filter Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-100">
          <div>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-3 py-2 text-xs text-slate-700 font-semibold focus:outline-none focus:ring-2 focus:ring-[#1baba4] cursor-pointer"
            >
              <option value="all">All Roles ({definedRolesCount})</option>
              <option value="super_admin">Super Admin</option>
              <option value="customer_support">CS Coordinator / Intake Lead</option>
              <option value="hospital_doctor">Hospital Desk Doctor / Liaison</option>
              <option value="finance_accounts">Billing & Escrow Finance Staff</option>
              <option value="patient">Client (Patient)</option>
            </select>
          </div>

          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-3 py-2 text-xs text-slate-700 font-semibold focus:outline-none focus:ring-2 focus:ring-[#1baba4] cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active (Enforced)</option>
              <option value="invited">Pending Invite</option>
            </select>
          </div>

          <div>
            <select
              value={branchFilter}
              onChange={(e) => setBranchFilter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-3 py-2 text-xs text-slate-700 font-semibold focus:outline-none focus:ring-2 focus:ring-[#1baba4] cursor-pointer"
            >
              <option value="all">All Regional Desks & Hospital Scopes</option>
              <option value="Headquarters">Central Headquarters / Global</option>
              <option value="GCC">GCC & MENA Regional Desk</option>
              <option value="Africa">Africa & EMEA Regional Desk</option>
              <option value="Apollo">Apollo Hospitals Tier-1 Desk</option>
              <option value="Escrow">Central Headquarters / Escrow Vault</option>
            </select>
          </div>
        </div>
      </div>

      {/* USER MANAGEMENT TABLE (Exact Reference 1 Table Design) */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.02)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 uppercase text-[10px] font-black tracking-wider bg-slate-50/50">
                <th className="py-3.5 pl-6">USER</th>
                <th className="py-3.5 px-4">ROLE</th>
                <th className="py-3.5 px-4">BRANCH / SCOPE</th>
                <th className="py-3.5 px-4">STATUS</th>
                <th className="py-3.5 px-4">MFA</th>
                <th className="py-3.5 px-4">LAST LOGIN</th>
                <th className="py-3.5 pr-6 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredUsers.map((u) => {
                const isAct = u.isActive;
                const initials = getInitials(u.name);
                const branch = (u as any).branchScope || "Central Headquarters";
                const lastLog = (u as any).lastLogin || "Today, 8:42 AM";

                return (
                  <tr
                    key={u.id}
                    className="hover:bg-slate-50/70 transition-colors group cursor-pointer"
                    onClick={() => setSelectedUser(u)}
                  >
                    {/* User Column */}
                    <td className="py-3.5 pl-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0 border border-slate-200 group-hover:border-[#1baba4]/60 group-hover:text-[#1baba4] transition-colors">
                          {initials}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                            <span>{u.name}</span>
                          </div>
                          <div className="text-[11px] text-slate-400 font-normal">{u.email}</div>
                        </div>
                      </div>
                    </td>

                    {/* Role Column */}
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block text-[10px] font-bold px-2.5 py-0.5 rounded-md border ${getRoleBadgeStyle(
                          u.role
                        )}`}
                      >
                        {getRoleDisplayName(u.role)}
                      </span>
                    </td>

                    {/* Branch / Scope Column */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5 text-slate-600 text-xs">
                        <Lock className="w-3 h-3 text-slate-400 shrink-0" />
                        <span className="truncate max-w-[200px]">{branch}</span>
                      </div>
                    </td>

                    {/* Status Column */}
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-800">
                        <span
                          className={`w-2 h-2 rounded-full inline-block ${
                            isAct ? "bg-emerald-500" : "bg-amber-500"
                          }`}
                        />
                        {isAct ? "Active" : "Invited"}
                      </span>
                    </td>

                    {/* MFA Column */}
                    <td className="py-3.5 px-4">
                      {u.mfaEnforced ? (
                        <div className="w-6 h-6 rounded-lg bg-teal-50 text-[#1baba4] flex items-center justify-center border border-teal-200" title="MFA Enforced">
                          <ShieldCheck className="w-3.5 h-3.5" />
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-lg bg-slate-100 text-slate-400 flex items-center justify-center border border-slate-200" title="MFA Pending">
                          <Key className="w-3 h-3" />
                        </div>
                      )}
                    </td>

                    {/* Last Login Column */}
                    <td className="py-3.5 px-4 text-[11px] text-slate-500 font-mono">
                      {lastLog}
                    </td>

                    {/* Actions Column */}
                    <td className="py-3.5 pr-6 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedUser(u);
                        }}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                        title="Manage User Permissions"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="p-8 text-center text-slate-400 text-xs">
            No matching users found for the selected query and filters.
          </div>
        )}
      </div>

      {/* SLIDE-OVER USER PERMISSIONS & SCOPE DRAWER */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white h-full shadow-2xl overflow-y-auto p-6 space-y-6 flex flex-col justify-between border-l border-slate-200">
            <div className="space-y-5">
              {/* Drawer Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-teal-50 text-[#1baba4] font-bold text-sm flex items-center justify-center border border-teal-200">
                    {getInitials(selectedUser.name)}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{selectedUser.name}</h3>
                    <div className="text-xs text-slate-400">{selectedUser.email}</div>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedUser(null)}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* User Scope Details */}
              <div className="space-y-3 text-xs">
                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-500">Assigned RBAC Role</span>
                    <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] border ${getRoleBadgeStyle(selectedUser.role)}`}>
                      {getRoleDisplayName(selectedUser.role)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-slate-200/60">
                    <span className="font-bold text-slate-500">Desk / Branch Scope</span>
                    <span className="font-semibold text-slate-800">
                      {(selectedUser as any).branchScope || "Central Headquarters"}
                    </span>
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-slate-200/60">
                    <span className="font-bold text-slate-500">MFA Security Policy</span>
                    <span className={`font-bold ${selectedUser.mfaEnforced ? "text-teal-700" : "text-amber-700"}`}>
                      {selectedUser.mfaEnforced ? "Enforced (Active)" : "Optional"}
                    </span>
                  </div>
                </div>

                {/* Queue Access Matrix for CS Agents */}
                {selectedUser.role === "customer_support" && (
                  <div className="p-3.5 bg-blue-50/50 rounded-2xl border border-blue-200/80 space-y-2">
                    <span className="font-bold text-slate-800 block text-xs">
                      Assigned Queue Intake Boundaries
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {(selectedUser.assignedQueues || ["General_Global", "Cardiology_Tier1"]).map((q) => (
                        <span key={q} className="px-2.5 py-1 rounded-lg bg-white border border-blue-200 text-[#3F4EB4] font-mono font-bold text-[10px]">
                          {q}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Security Actions */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">
                  Security Interventions
                </span>

                <button
                  onClick={() => handleToggleMfa(selectedUser.id)}
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-teal-50 text-slate-800 hover:text-[#1baba4] font-bold text-xs border border-slate-200 transition-colors flex items-center justify-between cursor-pointer"
                >
                  <span>{selectedUser.mfaEnforced ? "Disable Strict MFA" : "Enforce Hardware MFA / TOTP"}</span>
                  <ShieldCheck className="w-4 h-4" />
                </button>

                <button
                  onClick={() => handleToggleActive(selectedUser.id)}
                  className={`w-full py-2.5 px-3 rounded-xl font-bold text-xs border transition-colors flex items-center justify-between cursor-pointer ${
                    selectedUser.isActive
                      ? "bg-rose-50 text-rose-800 border-rose-200 hover:bg-rose-100"
                      : "bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100"
                  }`}
                >
                  <span>{selectedUser.isActive ? "Suspend User Account" : "Re-Activate Account"}</span>
                  <AlertTriangle className="w-4 h-4" />
                </button>
              </div>
            </div>

            <button
              onClick={() => setSelectedUser(null)}
              className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors cursor-pointer"
            >
              Done & Close
            </button>
          </div>
        </div>
      )}

      {/* INVITE USER MODAL DIALOG */}
      {isInviteModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-lg w-full shadow-2xl border border-slate-200 space-y-5 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">Invite New User to Platform</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Configure role, regional desk scope boundary, and security policies.
                </p>
              </div>
              <button
                onClick={() => setIsInviteModalOpen(false)}
                className="p-1 rounded-xl text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleInviteSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rachel Miller, RN"
                  value={inviteName}
                  onChange={(e) => setInviteName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-[#1baba4] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Corporate Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="rachel.m@vedaracare.com"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-[#1baba4] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Assigned Role</label>
                  <select
                    value={inviteRole}
                    onChange={(e) => setInviteRole(e.target.value as UserRole)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-[#1baba4]"
                  >
                    <option value="customer_support">CS Coordinator / Intake Lead</option>
                    <option value="hospital_doctor">Hospital Desk Doctor</option>
                    <option value="finance_accounts">Finance & Escrow Staff</option>
                    <option value="super_admin">Super Admin</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Regional Branch / Scope</label>
                  <select
                    value={inviteBranch}
                    onChange={(e) => setInviteBranch(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-[#1baba4]"
                  >
                    <option value="Central Headquarters / Global">Central Headquarters</option>
                    <option value="GCC & MENA Regional Desk">GCC & MENA Desk</option>
                    <option value="Africa & EMEA Regional Desk">Africa & EMEA Desk</option>
                    <option value="Apollo Hospitals Tier-1 Desk">Apollo Hospitals Desk</option>
                  </select>
                </div>
              </div>

              <div className="p-3 bg-teal-50/60 rounded-xl border border-teal-200/80 flex items-center justify-between">
                <div>
                  <div className="font-bold text-teal-950">Enforce Multi-Factor Authentication (MFA)</div>
                  <div className="text-[10px] text-teal-800">Requires authenticator app upon first login</div>
                </div>
                <input
                  type="checkbox"
                  checked={inviteMfa}
                  onChange={(e) => setInviteMfa(e.target.checked)}
                  className="w-4 h-4 text-[#1baba4] rounded border-slate-300 focus:ring-[#1baba4] cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsInviteModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#1d8983] via-[#1baba4] to-[#1d8983] hover:opacity-95 text-white font-bold text-xs cursor-pointer shadow-sm transition-all"
                >
                  Send Invitation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
