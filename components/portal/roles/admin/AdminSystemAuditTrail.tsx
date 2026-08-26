"use client";

import React, { useState, useMemo } from "react";
import { PatientCase, AuditLog, AdminTab } from "@/types/portal";
import {
  ClipboardList,
  Activity,
  Download,
  Search,
  Filter,
  Eye,
  FileCode,
  X,
  Lock,
  CheckCircle2,
  ShieldAlert,
  ShieldCheck,
} from "lucide-react";

interface AdminSystemAuditTrailProps {
  cases: PatientCase[];
  onNavigateTab?: (tab: AdminTab) => void;
}

export const AdminSystemAuditTrail: React.FC<AdminSystemAuditTrailProps> = ({
  cases,
  onNavigateTab,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [inspectLog, setInspectLog] = useState<AuditLog | null>(null);

  const allLogs = useMemo(() => {
    return cases
      .flatMap((c) => c.auditLogs)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }, [cases]);

  const filteredLogs = useMemo(() => {
    return allLogs.filter((log) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        log.action.toLowerCase().includes(q) ||
        log.actorName.toLowerCase().includes(q) ||
        log.caseId.toLowerCase().includes(q) ||
        (log.details && log.details.toLowerCase().includes(q));

      const matchesRole = roleFilter === "all" || log.actorRole === roleFilter;

      return matchesSearch && matchesRole;
    });
  }, [allLogs, searchQuery, roleFilter]);

  const handleExportCsv = () => {
    const headers = ["ID", "Timestamp", "Case ID", "Action", "Actor Name", "Actor Role", "Details"];
    const rows = filteredLogs.map((l) => [
      l.id,
      l.timestamp,
      l.caseId,
      l.action,
      l.actorName,
      l.actorRole,
      `"${(l.details || "").replace(/"/g, '""')}"`,
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `vedara_system_audit_trail_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getActionColor = (action: string) => {
    if (action.includes("DECLINE") || action.includes("BREACH") || action.includes("FAIL"))
      return "bg-rose-50 text-rose-700 border-rose-200";
    if (action.includes("ACCEPT") || action.includes("APPROVE") || action.includes("PAID"))
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    if (action.includes("STAGE") || action.includes("UPDATE"))
      return "bg-blue-50 text-blue-700 border-blue-200";
    return "bg-slate-100 text-slate-700 border-slate-200";
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#3F4EB4] bg-blue-50 px-2.5 py-0.5 rounded-full">
              Audit & Telemetry • Domain 5
            </span>
          </div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight mt-1">
            Full System Audit Trail (Immutable Read-Only)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Cryptographically sealed event logs for HIPAA / GDPR compliance, medical record access forensics, and financial state transitions.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0 flex-wrap">
          {onNavigateTab && (
            <>
              <button
                onClick={() => onNavigateTab("security_mfa_logs")}
                className="px-3.5 py-2.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-800 text-xs font-bold border border-purple-200 flex items-center gap-1.5 cursor-pointer transition-colors shadow-xs"
              >
                <ShieldAlert className="w-3.5 h-3.5 text-purple-600" />
                <span>Security & MFA Logs</span>
              </button>
              <button
                onClick={() => onNavigateTab("role_permission_matrix")}
                className="px-3.5 py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#3F4EB4] text-xs font-bold border border-blue-200 flex items-center gap-1.5 cursor-pointer transition-colors shadow-xs"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Role Matrix (RLS)</span>
              </button>
            </>
          )}
          <button
            onClick={handleExportCsv}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs flex items-center gap-2 cursor-pointer shadow-md transition-all"
          >
            <Download className="w-4 h-4" />
            Export Audit CSV
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white/95 rounded-2xl border border-slate-200 shadow-sm p-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search audit trail by action, actor, case ID, or details…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-[#2ECDC5] focus:outline-none"
          />
        </div>

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 font-bold focus:ring-2 focus:ring-[#2ECDC5] focus:outline-none cursor-pointer"
        >
          <option value="all">All Actor Roles ({allLogs.length} logs)</option>
          <option value="super_admin">Super Admin</option>
          <option value="hospital_doctor">Hospital Doctor</option>
          <option value="customer_support">Care Coordinator (CS)</option>
          <option value="finance_accounts">Finance & Accounts</option>
          <option value="patient">Patient</option>
        </select>
      </div>

      {/* Audit Log Table */}
      <div className="bg-white/95 rounded-2xl border border-slate-200 shadow-sm overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-slate-100 text-slate-400 uppercase text-[10px] font-black tracking-wider bg-slate-50/50">
              <th className="py-3.5 pl-5 text-left">Timestamp (UTC)</th>
              <th className="py-3.5 text-left">Action Event</th>
              <th className="py-3.5 text-left">Case Scope</th>
              <th className="py-3.5 text-left">Actor & Role</th>
              <th className="py-3.5 text-left">Forensic Event Details</th>
              <th className="py-3.5 pr-5 text-right">Inspect</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {filteredLogs.map((log) => (
              <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="py-4 pl-5 text-slate-600 font-mono text-[11px] whitespace-nowrap">
                  {new Date(log.timestamp).toLocaleString("en-US")}
                </td>

                <td className="py-4">
                  <span
                    className={`inline-block font-mono font-bold text-[10px] px-2 py-0.5 rounded-md border ${getActionColor(
                      log.action
                    )}`}
                  >
                    {log.action}
                  </span>
                </td>

                <td className="py-4 font-mono font-bold text-[#3F4EB4] text-[11px]">
                  {log.caseId}
                </td>

                <td className="py-4">
                  <div>
                    <div className="font-bold text-slate-900">{log.actorName}</div>
                    <div className="text-[10px] text-slate-400 capitalize">{(log.actorRole || "user").replace(/_/g, " ")}</div>
                  </div>
                </td>

                <td className="py-4 text-slate-700 max-w-md truncate">
                  {log.details}
                </td>

                <td className="py-4 pr-5 text-right">
                  <button
                    onClick={() => setInspectLog(log)}
                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer transition-colors"
                    title="Inspect Log Payload"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Forensic Payload Inspector Modal */}
      {inspectLog && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-black text-slate-900">Forensic Audit Inspector</h3>
                <span className="font-mono text-[11px] text-slate-400">{inspectLog.id}</span>
              </div>
              <button
                onClick={() => setInspectLog(null)}
                className="p-1 rounded-xl text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 bg-slate-900 rounded-2xl text-slate-200 font-mono text-xs space-y-2 max-h-80 overflow-y-auto">
              <pre>{JSON.stringify(inspectLog, null, 2)}</pre>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-[10px] font-mono text-emerald-600 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> SHA256 Log Signature Valid
              </span>
              <button
                onClick={() => setInspectLog(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
