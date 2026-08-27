"use client";

import React, { useState, useMemo } from "react";
import { PatientCase } from "@/types/portal";
import {
  Search,
  DollarSign,
  Receipt,
  ArrowRight,
  ShieldCheck,
  Building2,
  Phone,
  MessageSquare,
  Clock,
  CheckCircle2,
  FileText,
  CreditCard,
} from "lucide-react";

interface CSQuoteLedgerTableProps {
  cases: PatientCase[];
  onSelectCase: (caseId: string, subTab?: string) => void;
  onOpenCallModal?: (patient: PatientCase) => void;
  onOpenWhatsAppModal?: (patient: PatientCase) => void;
}

export const CSQuoteLedgerTable: React.FC<CSQuoteLedgerTableProps> = ({
  cases,
  onSelectCase,
  onOpenCallModal,
  onOpenWhatsAppModal,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  function getCountryFlag(country?: string) {
    if (!country) return "🌐";
    if (country.includes("United Kingdom") || country.includes("UK")) return "🇬🇧";
    if (country.includes("United Arab Emirates") || country.includes("UAE") || country.includes("Dubai")) return "🇦🇪";
    if (country.includes("United States") || country.includes("USA")) return "🇺🇸";
    if (country.includes("Kenya")) return "🇰🇪";
    if (country.includes("Canada")) return "🇨🇦";
    return "🌐";
  }

  // Build quote records
  const quoteRecords = useMemo(() => {
    return cases.map((c) => {
      let packageTier = "Gold Executive";
      let amountUsd = c.quote?.totalCostUsd || 18500;
      let quoteStatus = "Sent to Patient";
      let quoteStatusBadge = "bg-blue-50 text-blue-800 border-blue-200";
      let escrowStatus = "Awaiting Escrow Deposit";
      let hospital = c.assignedHospitalId?.replace("hosp_", "").toUpperCase() || "MEDANTA";

      if (c.patientName.includes("Tariq")) {
        packageTier = "VIP Platinum Care";
        amountUsd = 36000;
        quoteStatus = "Drafting Custom Options";
        quoteStatusBadge = "bg-amber-50 text-amber-800 border-amber-200";
        escrowStatus = "Quote Under Review";
      } else if (c.patientName.includes("Eleanor")) {
        packageTier = "Gold Surgical";
        amountUsd = 14200;
        quoteStatus = "Ready for Issuance";
        quoteStatusBadge = "bg-purple-50 text-purple-800 border-purple-200";
        escrowStatus = "NHS Fast-Track Tier";
      } else if (c.patientName.includes("John")) {
        packageTier = "Silver Essential";
        amountUsd = 16800;
        quoteStatus = "Sent to Patient";
        quoteStatusBadge = "bg-blue-50 text-blue-800 border-blue-200";
        escrowStatus = "Deposit Pending";
      } else if (c.stage === "booking" || c.stage === "treatment") {
        quoteStatus = "Accepted & Funded";
        quoteStatusBadge = "bg-emerald-50 text-emerald-800 border-emerald-200";
        escrowStatus = "Escrow Vault Locked";
      }

      return {
        caseObj: c,
        packageTier,
        amountUsd,
        quoteStatus,
        quoteStatusBadge,
        escrowStatus,
        hospital,
      };
    });
  }, [cases]);

  // Filtering
  const filteredQuotes = useMemo(() => {
    let list = quoteRecords;
    if (statusFilter !== "all") {
      list = list.filter((q) => q.quoteStatus.toLowerCase().includes(statusFilter.toLowerCase()));
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (item) =>
          item.caseObj.patientName.toLowerCase().includes(q) ||
          item.caseObj.id.toLowerCase().includes(q) ||
          item.packageTier.toLowerCase().includes(q) ||
          item.hospital.toLowerCase().includes(q) ||
          item.caseObj.treatmentCategory.toLowerCase().includes(q)
      );
    }
    return list;
  }, [quoteRecords, statusFilter, searchQuery]);

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* Header Info & Filters */}
      <div className="bg-white rounded-2xl p-4 shadow-[0_6px_32px_rgba(0,0,0,0.04)] border border-slate-200/90 space-y-4 transition-all group">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-emerald-600" />
              <h2 className="text-lg font-black text-slate-900 tracking-tight">
                Package Quotations &amp; Financial Proposals
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Multi-tiered treatment quotes, margin calculators, multi-currency conversions, and escrow milestones.
            </p>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search quote, package, patient..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-[#2ECDC5] focus:outline-none"
            />
          </div>
        </div>

        {/* Status Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {[
            { id: "all", label: `All Quotes (${quoteRecords.length})` },
            { id: "draft", label: "Drafting / In Progress" },
            { id: "sent", label: "Sent to Patient" },
            { id: "accepted", label: "Accepted & Escrow Funded" },
          ].map((pill) => (
            <button
              key={pill.id}
              onClick={() => setStatusFilter(pill.id)}
              className={`px-3.5 py-1.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${statusFilter === pill.id
                ? "bg-[#101955] text-white shadow-xs"
                : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/80"
                }`}
            >
              {pill.label}
            </button>
          ))}
        </div>
      </div>

      {/* Quote Ledger Table */}
      <div className="bg-white rounded-2xl  shadow-[0_6px_32px_rgba(0,0,0,0.04)] border border-slate-200/90  overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-100 text-slate-600 font-extrabold uppercase tracking-wider text-[11px]">
                <th className="py-4 px-4">Patient</th>
                <th className="py-4 px-4">Package Tier &amp; Treatment</th>
                <th className="py-4 px-4">Hospital Partner</th>
                <th className="py-4 px-4">Total Package Cost</th>
                <th className="py-4 px-4">Quote Status</th>
                <th className="py-4 px-4">Escrow Milestone</th>
                <th className="py-4 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredQuotes.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-xs text-slate-400">
                    No quotations found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredQuotes.map((item) => {
                  const { caseObj: c } = item;
                  return (
                    <tr
                      key={c.id}
                      onClick={() => onSelectCase(c.id, "quote_builder")}
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

                      {/* Package Tier */}
                      <td className="py-4 px-4">
                        <div className="font-extrabold text-xs text-slate-900">{item.packageTier}</div>
                        <div className="text-[11px] text-slate-500 mt-0.5 truncate max-w-xs">{c.treatmentCategory}</div>
                      </td>

                      {/* Hospital */}
                      <td className="py-4 px-4">
                        <div className="font-bold text-xs text-slate-800 flex items-center gap-1">
                          <Building2 className="w-3.5 h-3.5 text-blue-600" />
                          <span>{item.hospital}</span>
                        </div>
                      </td>

                      {/* Total Cost */}
                      <td className="py-4 px-4">
                        <div className="font-black text-sm text-emerald-800 font-mono">
                          ${item.amountUsd.toLocaleString()} USD
                        </div>
                        <div className="text-[10px] text-slate-400">Fixed Comprehensive</div>
                      </td>

                      {/* Quote Status */}
                      <td className="py-4 px-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-black border ${item.quoteStatusBadge}`}>
                          {item.quoteStatus}
                        </span>
                      </td>

                      {/* Escrow Status */}
                      <td className="py-4 px-4">
                        <span className="text-xs text-slate-600 font-bold flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                          <span>{item.escrowStatus}</span>
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
                            onClick={() => onSelectCase(c.id, "quote_builder")}
                            className="px-3.5 py-1.5 rounded-xl bg-[#101955] hover:bg-[#1a2670] text-white font-black text-xs flex items-center gap-1.5 shadow-xs transition-all cursor-pointer group/btn"
                          >
                            <span>Open Builder</span>
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
