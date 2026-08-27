"use client";

import React, { useState, useMemo } from "react";
import { PatientCase } from "@/types/portal";
import {
  Search,
  FileText,
  Layers,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Phone,
  MessageSquare,
  Clock,
  ExternalLink,
} from "lucide-react";

interface CSDocumentVaultTableProps {
  cases: PatientCase[];
  onSelectCase: (caseId: string, subTab?: string) => void;
  onOpenCallModal?: (patient: PatientCase) => void;
  onOpenWhatsAppModal?: (patient: PatientCase) => void;
}

export const CSDocumentVaultTable: React.FC<CSDocumentVaultTableProps> = ({
  cases,
  onSelectCase,
  onOpenCallModal,
  onOpenWhatsAppModal,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [docFilter, setDocFilter] = useState<string>("all");

  function getCountryFlag(country?: string) {
    if (!country) return "🌐";
    if (country.includes("United Kingdom") || country.includes("UK")) return "🇬🇧";
    if (country.includes("United Arab Emirates") || country.includes("UAE") || country.includes("Dubai")) return "🇦🇪";
    if (country.includes("United States") || country.includes("USA")) return "🇺🇸";
    if (country.includes("Kenya")) return "🇰🇪";
    if (country.includes("Canada")) return "🇨🇦";
    return "🌐";
  }

  // Build document records
  const docRecords = useMemo(() => {
    return cases.map((c) => {
      let docCount = c.documents?.length || 4;
      let dicomSeries = "Multi-Slice MRI & Contrast CT";
      let statusLabel = "Verified by Clinical Review";
      let statusBadge = "bg-emerald-50 text-emerald-800 border-emerald-200";
      let lastUploaded = "Today, 10:15 IST";

      if (c.patientName.includes("Tariq")) {
        docCount = 5;
        dicomSeries = "Abdominal MRI + Tri-Phase Liver CT";
        statusLabel = "Missing Viral Serology (Requested)";
        statusBadge = "bg-rose-50 text-rose-800 border-rose-200 font-bold";
        lastUploaded = "Today, 11:20 IST";
      } else if (c.patientName.includes("Eleanor")) {
        docCount = 6;
        dicomSeries = "Bilateral Knee AP/Lat Weight-Bearing X-Rays";
        statusLabel = "All Imaging Verified";
        statusBadge = "bg-emerald-50 text-emerald-800 border-emerald-200 font-bold";
        lastUploaded = "Yesterday, 17:45 BST";
      } else if (c.patientName.includes("Grace")) {
        docCount = 3;
        dicomSeries = "Lumbosacral Spine MRI";
        statusLabel = "Missing Coronal Slices (Page 4)";
        statusBadge = "bg-amber-50 text-amber-800 border-amber-200 font-bold";
        lastUploaded = "2 days ago";
      } else if (c.patientName.includes("David")) {
        docCount = 4;
        dicomSeries = "CT Coronary Angiogram (DICOM 512x512)";
        statusLabel = "DICOM PACS Loaded";
        statusBadge = "bg-blue-50 text-blue-800 border-blue-200 font-bold";
        lastUploaded = "Today, 08:30 IST";
      }

      return {
        caseObj: c,
        docCount,
        dicomSeries,
        statusLabel,
        statusBadge,
        lastUploaded,
      };
    });
  }, [cases]);

  // Filtering
  const filteredRecords = useMemo(() => {
    let list = docRecords;
    if (docFilter !== "all") {
      list = list.filter((r) => r.statusLabel.toLowerCase().includes(docFilter.toLowerCase()));
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (i) =>
          i.caseObj.patientName.toLowerCase().includes(q) ||
          i.caseObj.id.toLowerCase().includes(q) ||
          i.dicomSeries.toLowerCase().includes(q) ||
          i.statusLabel.toLowerCase().includes(q)
      );
    }
    return list;
  }, [docRecords, docFilter, searchQuery]);

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* Header & Filters */}
      <div className="bg-white rounded-2xl p-4 shadow-[0_6px_32px_rgba(0,0,0,0.04)] border border-slate-200/90 space-y-4 transition-all group">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-black text-slate-900 tracking-tight">
                Medical Document Vault &amp; DICOM PACS Repository
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Zero-footprint web DICOM viewer, clinical scan integrity check, slice completeness, and document OCR.
            </p>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search scan, document, patient..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-[#2ECDC5] focus:outline-none"
            />
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {[
            { id: "all", label: `All Patient Records (${docRecords.length})` },
            { id: "verified", label: "🟢 Scans Verified" },
            { id: "missing", label: "🟡 Missing Pages / Slices" },
            { id: "pacs", label: "🔵 DICOM PACS Loaded" },
          ].map((pill) => (
            <button
              key={pill.id}
              onClick={() => setDocFilter(pill.id)}
              className={`px-3.5 py-1.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${docFilter === pill.id
                ? "bg-[#101955] text-white shadow-xs"
                : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/80"
                }`}
            >
              {pill.label}
            </button>
          ))}
        </div>
      </div>

      {/* Document Vault List Table */}
      <div className="bg-white rounded-2xl  shadow-[0_6px_32px_rgba(0,0,0,0.04)] border border-slate-200/90  overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-100 text-slate-600 font-extrabold uppercase tracking-wider text-[11px]">
                <th className="py-4 px-4">Patient</th>
                <th className="py-4 px-4">Files Uploaded</th>
                <th className="py-4 px-4">DICOM PACS Imaging Series</th>
                <th className="py-4 px-4">Review Status &amp; Integrity</th>
                <th className="py-4 px-4">Last Activity</th>
                <th className="py-4 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRecords.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-xs text-slate-400">
                    No medical document records found.
                  </td>
                </tr>
              ) : (
                filteredRecords.map((item) => {
                  const { caseObj: c } = item;
                  return (
                    <tr
                      key={c.id}
                      onClick={() => onSelectCase(c.id, "docs_scans")}
                      className="hover:bg-slate-50/90 transition-all cursor-pointer group"
                    >
                      {/* Patient */}
                      <td className="py-4 px-4">
                        <div className="font-extrabold text-sm text-slate-900 group-hover:text-[#101955] transition-colors flex items-center gap-1.5 whitespace-nowrap">
                          <span>{c.patientName}</span>
                        </div>
                        <div className="text-xs text-slate-500 font-medium mt-0.5 flex items-center gap-1 whitespace-nowrap">
                          <span>{getCountryFlag(c.patientCountry)} {c.patientCountry}</span>
                          <span>•</span>
                          <span className="font-mono text-[10px] text-slate-400 whitespace-nowrap">{c.id}</span>
                        </div>
                      </td>

                      {/* File Count */}
                      <td className="py-4 px-4">
                        <div className="font-bold text-xs text-slate-800 flex items-center gap-1.5 whitespace-nowrap">
                          <FileText className="w-3.5 h-3.5 text-blue-600" />
                          <span>{item.docCount} Documents</span>
                        </div>
                      </td>

                      {/* DICOM Series */}
                      <td className="py-4 px-4">
                        <div className="font-bold text-xs text-slate-900 whitespace-nowrap">{item.dicomSeries}</div>
                        <div className="text-[11px] text-slate-500 mt-0.5 whitespace-nowrap">Category: {c.treatmentCategory}</div>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-black border ${item.statusBadge} whitespace-nowrap`}>
                          {item.statusLabel}
                        </span>
                      </td>

                      {/* Last Activity */}
                      <td className="py-4 px-4">
                        <div className="text-xs text-slate-600 font-medium flex items-center gap-1 whitespace-nowrap">
                          <Clock className="w-3 h-3 text-slate-400" />
                          <span>{item.lastUploaded}</span>
                        </div>
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
                            onClick={() => onSelectCase(c.id, "docs_scans")}
                            className="px-3.5 py-1.5 rounded-xl bg-[#101955] hover:bg-[#1a2670] text-white font-black text-xs flex items-center gap-1.5 shadow-xs transition-all cursor-pointer group/btn"
                          >
                            <span>Open DICOM Viewer</span>
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
