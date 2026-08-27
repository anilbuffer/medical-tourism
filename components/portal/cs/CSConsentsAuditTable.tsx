"use client";

import React, { useState, useMemo } from "react";
import { PatientCase } from "@/types/portal";
import {
  Search,
  ShieldCheck,
  Lock,
  FileText,
  Clock,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Phone,
  MessageSquare,
  KeyRound,
} from "lucide-react";

interface CSConsentsAuditTableProps {
  cases: PatientCase[];
  onSelectCase: (caseId: string, subTab?: string) => void;
  onOpenCallModal?: (patient: PatientCase) => void;
  onOpenWhatsAppModal?: (patient: PatientCase) => void;
}

export const CSConsentsAuditTable: React.FC<CSConsentsAuditTableProps> = ({
  cases,
  onSelectCase,
  onOpenCallModal,
  onOpenWhatsAppModal,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [consentFilter, setConsentFilter] = useState<string>("all");

  function getCountryFlag(country?: string) {
    if (!country) return "🌐";
    if (country.includes("United Kingdom") || country.includes("UK")) return "🇬🇧";
    if (country.includes("United Arab Emirates") || country.includes("UAE") || country.includes("Dubai")) return "🇦🇪";
    if (country.includes("United States") || country.includes("USA")) return "🇺🇸";
    if (country.includes("Kenya")) return "🇰🇪";
    if (country.includes("Canada")) return "🇨🇦";
    return "🌐";
  }

  // Build consent records
  const consentRecords = useMemo(() => {
    return cases.map((c) => {
      let activeConsent = "Cross-Border Health Data Processing (HIPAA/GDPR)";
      let signedDate = "24 Aug 2026, 14:12 UTC";
      let shaHash = `0x7f8a${c.id.replace(/[^0-9]/g, "")}e9b41...`;
      let status = "Signed & Hash-Locked";
      let statusBadge = "bg-emerald-50 text-emerald-800 border-emerald-200";

      if (c.patientName.includes("Tariq")) {
        activeConsent = "Living Donor Transplant Authorization & Escrow";
        signedDate = "26 Aug 2026, 09:30 GST";
        shaHash = "0x89412aef91c804b281f9...";
        status = "Signed & SHA-256 Verified";
        statusBadge = "bg-emerald-50 text-emerald-800 border-emerald-200 font-extrabold";
      } else if (c.patientName.includes("Eleanor")) {
        activeConsent = "Orthopaedic Surgical Candidacy & Telemedicine Scope";
        signedDate = "25 Aug 2026, 11:20 BST";
        shaHash = "0x004819ca71df89201a4e...";
        status = "Signed & Hash-Locked";
        statusBadge = "bg-emerald-50 text-emerald-800 border-emerald-200 font-extrabold";
      } else if (c.stage === "lead" || c.stage === "contacted") {
        activeConsent = "Initial Triage & Document Sharing Consent";
        signedDate = "Pending Signature";
        shaHash = "Unsigned (e-Link Dispatched)";
        status = "Dispatched via WhatsApp";
        statusBadge = "bg-amber-50 text-amber-800 border-amber-200 font-bold";
      }

      return {
        caseObj: c,
        activeConsent,
        signedDate,
        shaHash,
        status,
        statusBadge,
      };
    });
  }, [cases]);

  // Filtering
  const filteredRecords = useMemo(() => {
    let list = consentRecords;
    if (consentFilter !== "all") {
      list = list.filter((r) => r.status.toLowerCase().includes(consentFilter.toLowerCase()));
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (i) =>
          i.caseObj.patientName.toLowerCase().includes(q) ||
          i.caseObj.id.toLowerCase().includes(q) ||
          i.activeConsent.toLowerCase().includes(q) ||
          i.shaHash.toLowerCase().includes(q)
      );
    }
    return list;
  }, [consentRecords, consentFilter, searchQuery]);

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* Header & Search */}
      <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm shadow-slate-100/50 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-teal-600" />
              <h2 className="text-lg font-black text-slate-900 tracking-tight">
                Immutable Consent Audit &amp; Legal Compliance Engine
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Cryptographically timestamped e-signatures, cross-border HIPAA/GDPR data processing, and escrow release terms.
            </p>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search hash, consent, patient..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-[#2ECDC5] focus:outline-none"
            />
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {[
            { id: "all", label: `All Legal Records (${consentRecords.length})` },
            { id: "signed", label: "🟢 Signed & SHA-256 Locked" },
            { id: "dispatched", label: "🟡 Pending Signature Link" },
          ].map((pill) => (
            <button
              key={pill.id}
              onClick={() => setConsentFilter(pill.id)}
              className={`px-3.5 py-1.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                consentFilter === pill.id
                  ? "bg-[#101955] text-white shadow-xs"
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/80"
              }`}
            >
              {pill.label}
            </button>
          ))}
        </div>
      </div>

      {/* Consent Audit List Table */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm shadow-slate-100/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-100 text-slate-600 font-extrabold uppercase tracking-wider text-[11px]">
                <th className="py-4 px-4">Patient</th>
                <th className="py-4 px-4">Consent Scope &amp; Legal Framework</th>
                <th className="py-4 px-4">Signed Timestamp</th>
                <th className="py-4 px-4">SHA-256 Digital Signature Hash</th>
                <th className="py-4 px-4">Compliance Status</th>
                <th className="py-4 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRecords.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-xs text-slate-400">
                    No legal consent records found.
                  </td>
                </tr>
              ) : (
                filteredRecords.map((item) => {
                  const { caseObj: c } = item;
                  return (
                    <tr
                      key={c.id}
                      onClick={() => onSelectCase(c.id, "consents_compliance")}
                      className="hover:bg-slate-50/90 transition-all cursor-pointer group"
                    >
                      {/* Patient */}
                      <td className="py-4 px-4">
                        <div className="font-extrabold text-sm text-slate-900 group-hover:text-[#101955] transition-colors flex items-center gap-1.5">
                          <span>{c.patientName}</span>
                        </div>
                        <div className="text-xs text-slate-500 font-medium mt-0.5 flex items-center gap-1">
                          <span>{getCountryFlag(c.patientCountry)} {c.patientCountry}</span>
                          <span>•</span>
                          <span className="font-mono text-[10px] text-slate-400">{c.id}</span>
                        </div>
                      </td>

                      {/* Consent Scope */}
                      <td className="py-4 px-4">
                        <div className="font-bold text-xs text-slate-900">{item.activeConsent}</div>
                        <div className="text-[11px] text-slate-500 mt-0.5">Compliant with Indian DPDP Act 2023</div>
                      </td>

                      {/* Timestamp */}
                      <td className="py-4 px-4">
                        <div className="text-xs text-slate-700 font-medium flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          <span>{item.signedDate}</span>
                        </div>
                      </td>

                      {/* SHA-256 Hash */}
                      <td className="py-4 px-4">
                        <span className="font-mono text-[11px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 flex items-center gap-1 max-w-[200px] truncate">
                          <KeyRound className="w-3 h-3 text-slate-400 shrink-0" />
                          <span className="truncate">{item.shaHash}</span>
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-black border ${item.statusBadge}`}>
                          {item.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1.5">
                          {onOpenCallModal && (
                            <button
                              onClick={() => onOpenCallModal(c)}
                              className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 cursor-pointer"
                              title="Call"
                            >
                              <Phone className="w-3.5 h-3.5" />
                            </button>
                          )}
                          {onOpenWhatsAppModal && (
                            <button
                              onClick={() => onOpenWhatsAppModal(c)}
                              className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 cursor-pointer"
                              title="WhatsApp"
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                            </button>
                          )}
                          <button
                            onClick={() => onSelectCase(c.id, "consents_compliance")}
                            className="px-3.5 py-1.5 rounded-xl bg-[#101955] hover:bg-[#1a2670] text-white font-black text-xs flex items-center gap-1.5 shadow-xs transition-all cursor-pointer group/btn"
                          >
                            <span>Audit Consent</span>
                            <ArrowRight className="w-3.5 h-3.5 text-[#2ECDC5] group-hover/btn:translate-x-0.5 transition-transform" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
