"use client";

import React from "react";
import { PatientCase } from "@/types/portal";
import { usePortal } from "@/lib/portal/store";
import {
  ShieldAlert,
  Users,
  Clock,
  DollarSign,
  Activity,
  CheckCircle2,
  Lock,
  Sparkles,
  RotateCcw,
  Key,
} from "lucide-react";

interface SuperAdminViewProps {
  cases: PatientCase[];
}

export const SuperAdminView: React.FC<SuperAdminViewProps> = ({ cases }) => {
  const { currentUser, resetToDefaultData } = usePortal();

  const allAuditLogs = cases.flatMap((c) => c.auditLogs);

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
            Enterprise RBAC Matrix & Audit Intelligence
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl">
            Logged in as <strong>{currentUser?.name || "Rajesh Verma"}</strong> (Full Super Admin Scope). System health, Row-Level Security policies, and immutable system audit logs.
          </p>
        </div>

        <button
          onClick={resetToDefaultData}
          className="relative z-10 px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs font-extrabold flex items-center gap-2 border border-white/20 shadow-md hover:shadow-lg transition-all duration-300 shrink-0 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5 text-amber-300" />
          <span>Reset Demo Store to Factory Defaults</span>
        </button>
      </div>

      {/* RBAC Enforcement Summary Table */}
      <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] transition-all duration-300 space-y-4">
        <h3 className="font-black text-slate-900 text-lg flex items-center gap-2">
          <Lock className="w-5 h-5 text-[#3F4EB4]" />
          <span>Role-Based Access Control (RBAC) Matrix Policy</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 uppercase font-bold text-[10px]">
                <th className="pb-3">Role</th>
                <th className="pb-3">Access Scope</th>
                <th className="pb-3">Clinical Diagnosis</th>
                <th className="pb-3">Financial Escrow</th>
                <th className="pb-3">Enforcement Layer</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              <tr className="hover:bg-slate-50/80 transition-colors">
                <td className="py-3.5 font-bold text-slate-900">Public / Unauthenticated</td>
                <td className="py-3.5">Intake form only, no login</td>
                <td className="py-3.5 text-slate-400">None</td>
                <td className="py-3.5 text-slate-400">None</td>
                <td className="py-3.5 text-[#3F4EB4] font-bold">Client & API Route</td>
              </tr>
              <tr className="hover:bg-slate-50/80 transition-colors">
                <td className="py-3.5 font-bold text-slate-900">Patient Portal</td>
                <td className="py-3.5">Own case, own records only</td>
                <td className="py-3.5 text-emerald-700">Own records</td>
                <td className="py-3.5 text-emerald-700">Own staged payments</td>
                <td className="py-3.5 text-[#3F4EB4] font-bold">Database RLS Policy</td>
              </tr>
              <tr className="hover:bg-slate-50/80 transition-colors">
                <td className="py-3.5 font-bold text-slate-900">Hospital / Doctor</td>
                <td className="py-3.5">Only cases assigned to hospital/doctor</td>
                <td className="py-3.5 text-emerald-700 font-bold">Full Read / Write</td>
                <td className="py-3.5 text-slate-400">Restricted</td>
                <td className="py-3.5 text-[#3F4EB4] font-bold">Database RLS Policy</td>
              </tr>
              <tr className="hover:bg-slate-50/80 transition-colors">
                <td className="py-3.5 font-bold text-slate-900">Customer Support (CS)</td>
                <td className="py-3.5">All cases in assigned queue(s)</td>
                <td className="py-3.5 text-amber-700">View-only (No Edit)</td>
                <td className="py-3.5 text-slate-700">View Quote status</td>
                <td className="py-3.5 text-[#3F4EB4] font-bold">Field Redaction Filter</td>
              </tr>
              <tr className="hover:bg-slate-50/80 transition-colors">
                <td className="py-3.5 font-bold text-slate-900">Finance & Accounts</td>
                <td className="py-3.5">All payment records across cases</td>
                <td className="py-3.5 text-rose-700">Redacted (Unless dispute)</td>
                <td className="py-3.5 text-emerald-700 font-bold">Full Escrow Access</td>
                <td className="py-3.5 text-[#3F4EB4] font-bold">Query Sanitizer</td>
              </tr>
              <tr className="hover:bg-slate-50/80 transition-colors">
                <td className="py-3.5 font-bold text-slate-900">Super Admin</td>
                <td className="py-3.5">Full system configuration & audit</td>
                <td className="py-3.5 text-emerald-700 font-bold">Full Access</td>
                <td className="py-3.5 text-emerald-700 font-bold">Full Access</td>
                <td className="py-3.5 text-[#3F4EB4] font-bold">Unrestricted Master</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Audit Log Stream */}
      <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] transition-all duration-300 space-y-4">
        <h3 className="font-black text-slate-900 text-lg flex items-center gap-2">
          <Activity className="w-5 h-5 text-[#2ECDC5]" />
          <span>System Security & Action Audit Trail</span>
        </h3>

        <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
          {allAuditLogs.map((log) => (
            <div
              key={log.id}
              className="p-3 bg-slate-50/80 rounded-2xl border border-slate-200 text-xs flex items-center justify-between gap-4 font-mono hover:bg-slate-50 transition-colors"
            >
              <div>
                <span className="font-bold text-[#3F4EB4]">[{log.action}]</span>{" "}
                <span className="text-slate-800 font-sans">{log.details}</span>
              </div>
              <div className="text-slate-400 text-[10px] text-right shrink-0">
                {log.actorName} ({log.actorRole}) • {new Date(log.timestamp).toLocaleTimeString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
