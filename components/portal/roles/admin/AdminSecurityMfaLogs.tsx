"use client";

import React, { useState } from "react";
import { SecurityMfaLog } from "@/types/portal";
import { MOCK_SECURITY_MFA_LOGS } from "@/lib/portal/mockData";
import {
  ShieldAlert,
  KeyRound,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Globe,
  Fingerprint,
  RotateCcw,
  Zap,
  Server,
} from "lucide-react";

export const AdminSecurityMfaLogs: React.FC = () => {
  const [logs, setLogs] = useState<SecurityMfaLog[]>(MOCK_SECURITY_MFA_LOGS);
  const [globalMfaEnforced, setGlobalMfaEnforced] = useState(true);
  const [threatFilter, setThreatFilter] = useState<string>("all");

  const filteredLogs = logs.filter(
    (l) => threatFilter === "all" || l.threatLevel === threatFilter
  );

  const getThreatBadge = (level: string) => {
    switch (level) {
      case "critical":
        return "bg-rose-100 text-rose-900 border-rose-300";
      case "high":
        return "bg-amber-100 text-amber-900 border-amber-300";
      case "medium":
        return "bg-blue-100 text-blue-900 border-blue-300";
      default:
        return "bg-emerald-100 text-emerald-900 border-emerald-300";
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Bar */}
      <div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-black uppercase tracking-widest text-[#3F4EB4] bg-blue-50 px-2.5 py-0.5 rounded-full">
            Audit & Telemetry • Domain 5
          </span>
        </div>
        <h2 className="text-xl font-black text-slate-900 tracking-tight mt-1">
          Security & MFA Enforcement Logs
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Real-time authentication telemetry, hardware FIDO2 / TOTP challenge verification, IP rate-limiting, and unauthorized access mitigations.
        </p>
      </div>

      {/* Security Telemetry Posture Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white/95 rounded-2xl p-5 border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase text-slate-500 block">MFA Enforcement</span>
            <div className="text-xl font-black text-emerald-700 mt-1">Mandatory Enabled</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Staff & Doctor Portals</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold shrink-0">
            <Fingerprint className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white/95 rounded-2xl p-5 border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase text-slate-500 block">Threat Mitigation</span>
            <div className="text-xl font-black text-slate-900 mt-1">0 Critical Breaches</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Rate Limit Protection Active</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold shrink-0">
            <Lock className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white/95 rounded-2xl p-5 border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase text-slate-500 block">Active Auth Sessions</span>
            <div className="text-xl font-black text-slate-900 mt-1">12 Sessions</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Auto-revoke after 60 min idle</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#2ECDC5] flex items-center justify-center font-bold shrink-0">
            <KeyRound className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Filter and Threat Level Selection */}
      <div className="bg-white/95 rounded-2xl border border-slate-200 shadow-sm p-4 flex items-center justify-between flex-wrap gap-3">
        <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
          Authentication & Authorization Event Stream
        </h3>

        <select
          value={threatFilter}
          onChange={(e) => setThreatFilter(e.target.value)}
          className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-bold focus:ring-2 focus:ring-[#2ECDC5] focus:outline-none cursor-pointer"
        >
          <option value="all">All Threat Levels ({logs.length})</option>
          <option value="critical">Critical (Probe / Attack Blocked)</option>
          <option value="high">High (RLS Escalation Blocked)</option>
          <option value="medium">Medium (MFA Drift / Failure)</option>
          <option value="normal">Normal (Successful Login / Audit)</option>
        </select>
      </div>

      {/* Security Logs Stream Table */}
      <div className="bg-white/95 rounded-2xl border border-slate-200 shadow-sm overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-slate-100 text-slate-400 uppercase text-[10px] font-black tracking-wider bg-slate-50/50">
              <th className="py-3.5 pl-5 text-left">Timestamp</th>
              <th className="py-3.5 text-left">Security Event Type</th>
              <th className="py-3.5 text-left">Account Subject</th>
              <th className="py-3.5 text-left">IP Address & Origin</th>
              <th className="py-3.5 text-left">Client & Threat Level</th>
              <th className="py-3.5 pr-5 text-left">Event Forensic Telemetry</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {filteredLogs.map((log) => (
              <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="py-4 pl-5 text-slate-600 font-mono text-[11px] whitespace-nowrap">
                  {new Date(log.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
                </td>

                <td className="py-4">
                  <span className="font-mono font-bold text-[10px] uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200">
                    {(log.eventType || "EVENT").replace(/_/g, " ")}
                  </span>
                </td>

                <td className="py-4">
                  <div className="font-bold text-slate-900">{log.userName}</div>
                  <div className="text-[10px] text-slate-400 capitalize">{(log.userRole || "user").replace(/_/g, " ")}</div>
                </td>

                <td className="py-4 font-mono text-[11px] text-slate-600">
                  {log.ipAddress}
                </td>

                <td className="py-4">
                  <span
                    className={`inline-block text-[10px] font-black uppercase px-2 py-0.5 rounded-full border ${getThreatBadge(
                      log.threatLevel
                    )}`}
                  >
                    {log.threatLevel} Threat
                  </span>
                </td>

                <td className="py-4 pr-5 text-slate-700 max-w-sm">
                  <div className="text-[11px] leading-snug">{log.details}</div>
                  <div className="text-[10px] text-slate-400 font-mono mt-0.5">{log.deviceInfo}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
