"use client";

import React, { useState, useMemo } from "react";
import { PatientCase } from "@/types/portal";
import {
  Search,
  Phone,
  MessageSquare,
  ClipboardList,
  ArrowRight,
  Download,
  LayoutGrid,
  Table as TableIcon,
  User,
  Building2,
  Calendar,
  Layers,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ExternalLink,
} from "lucide-react";

interface CSMasterPatientDirectoryProps {
  cases: PatientCase[];
  onSelectCase: (caseId: string) => void;
  onOpenCallModal?: (patient: PatientCase) => void;
  onOpenWhatsAppModal?: (patient: PatientCase) => void;
  onOpenLogContactModal?: (patient: PatientCase) => void;
}

type DirectoryFilter = "all" | "new_referral" | "awaiting_hospital" | "quote_issued" | "booked";
type DirectoryViewMode = "table" | "grid";

interface ExtendedPatientRow {
  caseObj: PatientCase;
  age: number;
  gender: "Male" | "Female";
  countryShort: string;
  countryFlag: string;
  journeyStatusLabel: string;
  journeyStatusBadge: string;
  docsStatusLabel: string;
  docsStatusBadge: string;
  treatmentDisplay: string;
}

export const CSMasterPatientDirectory: React.FC<CSMasterPatientDirectoryProps> = ({
  cases,
  onSelectCase,
  onOpenCallModal,
  onOpenWhatsAppModal,
  onOpenLogContactModal,
}) => {
  const [activeFilter, setActiveFilter] = useState<DirectoryFilter>("all");
  const [viewMode, setViewMode] = useState<DirectoryViewMode>("table");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCaseIds, setSelectedCaseIds] = useState<string[]>([]);

  function getCountryFlag(country?: string) {
    if (!country) return "🌐";
    if (country.includes("United Kingdom") || country.includes("UK")) return "🇬🇧";
    if (country.includes("United Arab Emirates") || country.includes("UAE") || country.includes("Dubai")) return "🇦🇪";
    if (country.includes("United States") || country.includes("USA")) return "🇺🇸";
    if (country.includes("Kenya")) return "🇰🇪";
    if (country.includes("Canada")) return "🇨🇦";
    if (country.includes("China")) return "🇨🇳";
    if (country.includes("India")) return "🇮🇳";
    return "🌐";
  }

  function getCountryShort(country?: string) {
    if (!country) return "Global";
    if (country.includes("United Arab Emirates") || country.includes("UAE") || country.includes("Dubai")) return "UAE";
    if (country.includes("United Kingdom") || country.includes("UK")) return "UK";
    if (country.includes("United States") || country.includes("USA")) return "USA";
    if (country.includes("Kenya")) return "Kenya";
    if (country.includes("Canada")) return "Canada";
    if (country.includes("China")) return "China";
    if (country.includes("India")) return "India";
    return country;
  }

  // Build extended data rows with simulated demographic & clinical attributes
  const extendedRows: ExtendedPatientRow[] = useMemo(() => {
    return cases.map((c) => {
      let age = 52;
      let gender: "Male" | "Female" = "Male";
      let docsStatusLabel = "🟢 All Docs Complete";
      let docsStatusBadge = "bg-emerald-50 text-emerald-800 border-emerald-200";
      let journeyStatusLabel = "🟡 Hospital Review";
      let journeyStatusBadge = "bg-amber-50 text-amber-800 border-amber-200";
      let treatmentDisplay = c.clinicalSummary?.recommendedProcedure || c.treatmentCategory;

      if (c.patientName.includes("Tariq")) {
        age = 48;
        gender = "Male";
        journeyStatusLabel = "🟡 Hospital Review";
        journeyStatusBadge = "bg-amber-50 text-amber-800 border-amber-200";
        docsStatusLabel = "🔴 Missing Viral Serology";
        docsStatusBadge = "bg-rose-50 text-rose-800 border-rose-200";
        treatmentDisplay = "Living Donor Liver Transplant";
      } else if (c.patientName.includes("Eleanor")) {
        age = 72;
        gender = "Female";
        journeyStatusLabel = "🔴 Action Overdue";
        journeyStatusBadge = "bg-rose-50 text-rose-800 border-rose-300 animate-pulse";
        docsStatusLabel = "🟢 All Docs Complete";
        docsStatusBadge = "bg-emerald-50 text-emerald-800 border-emerald-200";
        treatmentDisplay = "Bilateral Robotic Knee Replacement";
      } else if (c.patientName.includes("John")) {
        age = 58;
        gender = "Male";
        journeyStatusLabel = "🔵 Quote Issued";
        journeyStatusBadge = "bg-blue-50 text-blue-800 border-blue-200";
        docsStatusLabel = "🟢 DICOM Scans Verified";
        docsStatusBadge = "bg-emerald-50 text-emerald-800 border-emerald-200";
        treatmentDisplay = "Robotic-Assisted Bilateral Total Knee Replacement";
      } else if (c.patientName.includes("Grace")) {
        age = 42;
        gender = "Female";
        journeyStatusLabel = "🟣 Clinical Triage";
        journeyStatusBadge = "bg-purple-50 text-purple-800 border-purple-200";
        docsStatusLabel = "🟡 Missing Coronal Slices";
        docsStatusBadge = "bg-amber-50 text-amber-800 border-amber-200";
        treatmentDisplay = "Complex Spine Decompression & Fusion";
      } else if (c.patientName.includes("David")) {
        age = 68;
        gender = "Male";
        journeyStatusLabel = "🟡 Hospital Review";
        journeyStatusBadge = "bg-amber-50 text-amber-800 border-amber-200";
        docsStatusLabel = "🟢 CT Angio Complete";
        docsStatusBadge = "bg-emerald-50 text-emerald-800 border-emerald-200";
        treatmentDisplay = "Transcatheter Aortic Valve Replacement (TAVR)";
      } else if (c.stage === "booking" || c.stage === "treatment") {
        age = 61;
        gender = "Male";
        journeyStatusLabel = "🟢 Booked & Active";
        journeyStatusBadge = "bg-emerald-50 text-emerald-800 border-emerald-200";
        docsStatusLabel = "🟢 All Docs Complete";
        docsStatusBadge = "bg-emerald-50 text-emerald-800 border-emerald-200";
      }

      return {
        caseObj: c,
        age,
        gender,
        countryShort: getCountryShort(c.patientCountry),
        countryFlag: getCountryFlag(c.patientCountry),
        journeyStatusLabel,
        journeyStatusBadge,
        docsStatusLabel,
        docsStatusBadge,
        treatmentDisplay,
      };
    });
  }, [cases]);

  // Filter logic
  const filteredRows = useMemo(() => {
    let list = extendedRows;

    if (activeFilter === "new_referral") {
      list = list.filter((r) => r.caseObj.stage === "lead" || r.caseObj.stage === "contacted");
    } else if (activeFilter === "awaiting_hospital") {
      list = list.filter(
        (r) => r.caseObj.stage === "hospital_handover" || r.caseObj.stage === "consultation"
      );
    } else if (activeFilter === "quote_issued") {
      list = list.filter((r) => r.caseObj.stage === "quote" || r.caseObj.stage === "payment");
    } else if (activeFilter === "booked") {
      list = list.filter((r) => r.caseObj.stage === "booking" || r.caseObj.stage === "treatment");
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (r) =>
          r.caseObj.patientName.toLowerCase().includes(q) ||
          r.caseObj.id.toLowerCase().includes(q) ||
          r.caseObj.treatmentCategory.toLowerCase().includes(q) ||
          r.caseObj.patientCountry.toLowerCase().includes(q)
      );
    }

    return list;
  }, [extendedRows, activeFilter, searchQuery]);

  // Checkbox multi-select helpers
  const isAllSelected = filteredRows.length > 0 && selectedCaseIds.length === filteredRows.length;
  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedCaseIds([]);
    } else {
      setSelectedCaseIds(filteredRows.map((r) => r.caseObj.id));
    }
  };

  const toggleSelectRow = (id: string) => {
    if (selectedCaseIds.includes(id)) {
      setSelectedCaseIds(selectedCaseIds.filter((item) => item !== id));
    } else {
      setSelectedCaseIds([...selectedCaseIds, id]);
    }
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* ========================================================================= */}
      {/* SEARCH, FILTER & VIEW TOGGLE TOOLBAR                                      */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-2xl p-4 shadow-[0_6px_32px_rgba(0,0,0,0.04)] border border-slate-200/90 space-y-4 transition-all group">
        {/* Top Row: Search Box + View Switcher (Table vs Grid) + Export */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="🔍 Search by patient name, condition, Patient ID (PT-2026-...), or country..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-full pl-11 pr-4 py-2.5 text-xs text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-[#2ECDC5] focus:outline-none font-medium"
            />
          </div>

          <div className="flex items-center gap-2.5 self-end lg:self-auto flex-wrap">
            {/* View Mode Toggle: Table (List) vs Grid */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => setViewMode("table")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${viewMode === "table"
                  ? "bg-[#101955] text-white shadow-2xs font-extrabold"
                  : "text-slate-600 hover:text-slate-900"
                  }`}
              >
                <TableIcon className="w-3.5 h-3.5" />
                <span>Table View</span>
              </button>

              <button
                onClick={() => setViewMode("grid")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${viewMode === "grid"
                  ? "bg-[#101955] text-white shadow-2xs font-extrabold"
                  : "text-slate-600 hover:text-slate-900"
                  }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Grid View</span>
              </button>
            </div>

            {/* CSV Export */}
            <button
              onClick={() => {
                const csvContent =
                  "data:text/csv;charset=utf-8,Patient ID,Name,Age,Gender,Country,Treatment,Journey Status,Docs Status,Stage\n" +
                  filteredRows
                    .map(
                      (r) =>
                        `${r.caseObj.id},${r.caseObj.patientName},${r.age},${r.gender},${r.countryShort},"${r.treatmentDisplay}","${r.journeyStatusLabel}","${r.docsStatusLabel}",${r.caseObj.stage}`
                    )
                    .join("\n");
                const encodedUri = encodeURI(csvContent);
                const link = document.createElement("a");
                link.setAttribute("href", encodedUri);
                link.setAttribute("download", "Master_Patient_Directory.csv");
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Bottom Row: Status Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {[
            { id: "all", label: `All Patients (${cases.length})` },
            { id: "new_referral", label: "New Referral" },
            { id: "awaiting_hospital", label: "Awaiting Hospital Review" },
            { id: "quote_issued", label: "Quote Issued" },
            { id: "booked", label: "Booked & Confirmed" },
          ].map((pill) => (
            <button
              key={pill.id}
              onClick={() => setActiveFilter(pill.id as any)}
              className={`px-4 py-2 rounded-2xl text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer ${activeFilter === pill.id
                ? "bg-[#101955] text-white shadow-xs"
                : "bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/80"
                }`}
            >
              {pill.label}
            </button>
          ))}
        </div>
      </div>

      {/* Multi-Select Status Banner */}
      {selectedCaseIds.length > 0 && (
        <div className="bg-slate-900 text-white rounded-2xl p-3 px-5 flex items-center justify-between shadow-md animate-in slide-in-from-top-2">
          <div className="text-xs font-bold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#2ECDC5] animate-ping" />
            <span>
              <strong className="text-[#2ECDC5]">{selectedCaseIds.length}</strong> patient cases selected
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedCaseIds([])}
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold cursor-pointer transition-colors"
            >
              Deselect All
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 1: MASTER DIRECTORY TABLE (LIST)                                     */}
      {/* ========================================================================= */}
      {viewMode === "table" ? (
        <div className="bg-white rounded-2xl  shadow-[0_6px_32px_rgba(0,0,0,0.04)] border border-slate-200/90  overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-100 text-slate-600 font-extrabold uppercase tracking-wider text-[11px]">
                  <th className="py-4 px-4 w-10">
                    <input
                      type="checkbox"
                      checked={isAllSelected}
                      onChange={toggleSelectAll}
                      className="w-4 h-4 rounded text-[#2ECDC5] focus:ring-[#2ECDC5] cursor-pointer"
                    />
                  </th>
                  <th className="py-4 px-4">Patient Details</th>
                  <th className="py-4 px-4">Journey Status</th>
                  <th className="py-4 px-4">Missing / Required Docs</th>
                  <th className="py-4 px-4">Primary Condition / Treatment</th>
                  <th className="py-4 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredRows.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-xs text-slate-400">
                      No patient records found matching your query.
                    </td>
                  </tr>
                ) : (
                  filteredRows.map((row) => {
                    const { caseObj: c } = row;
                    const isChecked = selectedCaseIds.includes(c.id);

                    return (
                      <tr
                        key={c.id}
                        onClick={() => onSelectCase(c.id)}
                        className={`hover:bg-slate-50/90 transition-all cursor-pointer group ${isChecked ? "bg-blue-50/40" : ""
                          }`}
                      >
                        {/* Checkbox */}
                        <td className="py-4 px-4" onClick={(e) => e.stopPropagation()}>
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleSelectRow(c.id)}
                            className="w-4 h-4 rounded text-[#2ECDC5] focus:ring-[#2ECDC5] cursor-pointer"
                          />
                        </td>

                        {/* Patient Details */}
                        <td className="py-4 px-4">
                          <div>
                            <div className="font-extrabold text-sm text-slate-900 group-hover:text-[#101955] transition-colors flex items-center gap-1.5">
                              <span>{c.patientName}</span>
                            </div>
                            <div className="text-xs text-slate-600 font-medium mt-0.5 flex items-center gap-1.5">
                              <span>{row.age} yrs</span>
                              <span className="text-slate-300">•</span>
                              <span>{row.gender}</span>
                              <span className="text-slate-300">•</span>
                              <span className="inline-flex items-center gap-1">
                                <span>{row.countryFlag}</span>
                                <span className="font-semibold text-slate-700">{row.countryShort}</span>
                              </span>
                            </div>
                            <div className="font-mono text-[10px] text-slate-400 font-bold mt-0.5">
                              {c.id}
                            </div>
                          </div>
                        </td>

                        {/* Journey Status */}
                        <td className="py-4 px-4">
                          <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black border ${row.journeyStatusBadge}`}
                          >
                            {row.journeyStatusLabel}
                          </span>
                        </td>

                        {/* Missing / Required Docs */}
                        <td className="py-4 px-4">
                          <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black border ${row.docsStatusBadge}`}
                          >
                            {row.docsStatusLabel}
                          </span>
                        </td>

                        {/* Primary Condition / Treatment */}
                        <td className="py-4 px-4">
                          <div className="font-extrabold text-xs text-slate-900">
                            {row.treatmentDisplay}
                          </div>
                          <div className="text-[11px] text-slate-500 mt-0.5">
                            Assigned: <strong className="text-slate-700">{c.assignedHospitalId?.replace("hosp_", "").toUpperCase() || "MEDANTA"}</strong>
                          </div>
                        </td>

                        {/* Actions: View Case + Quick Tools */}
                        <td className="py-4 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center justify-end gap-1.5">
                            {onOpenCallModal && (
                              <button
                                onClick={() => onOpenCallModal(c)}
                                className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 cursor-pointer transition-colors"
                                title="Call Patient"
                              >
                                <Phone className="w-3.5 h-3.5" />
                              </button>
                            )}
                            {onOpenWhatsAppModal && (
                              <button
                                onClick={() => onOpenWhatsAppModal(c)}
                                className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 cursor-pointer transition-colors"
                                title="WhatsApp Patient"
                              >
                                <MessageSquare className="w-3.5 h-3.5" />
                              </button>
                            )}
                            {onOpenLogContactModal && (
                              <button
                                onClick={() => onOpenLogContactModal(c)}
                                className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 cursor-pointer transition-colors"
                                title="Log Interaction"
                              >
                                <ClipboardList className="w-3.5 h-3.5" />
                              </button>
                            )}
                            <button
                              onClick={() => onSelectCase(c.id)}
                              className="px-3.5 py-1.5 rounded-xl bg-[#101955] hover:bg-[#1a2670] text-white font-black text-xs flex items-center gap-1.5 shadow-xs transition-all cursor-pointer ml-1 group/btn"
                            >
                              <span>View Case</span>
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
      ) : (
        /* ========================================================================= */
        /* VIEW 2: MASTER DIRECTORY GRID VIEW                                        */
        /* ========================================================================= */
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredRows.length === 0 ? (
            <div className="col-span-full bg-white rounded-3xl p-12 text-center text-xs text-slate-400 border border-slate-100">
              No patient records found matching your query.
            </div>
          ) : (
            filteredRows.map((row) => {
              const { caseObj: c } = row;
              return (
                <div
                  key={c.id}
                  onClick={() => onSelectCase(c.id)}
                  className="bg-white rounded-2xl p-4 shadow-[0_6px_32px_rgba(0,0,0,0.04)] border border-slate-200/90 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] transition-all cursor-pointer space-y-4 group flex flex-col justify-between"
                >
                  {/* Card Header: Avatar, Name, Country & ID */}
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#101955] to-[#1e2a78] text-white font-black text-lg flex items-center justify-center shadow-xs">
                          {row.countryFlag}
                        </div>
                        <div>
                          <h3 className="font-extrabold text-sm text-slate-900 group-hover:text-[#101955] transition-colors leading-snug">
                            {c.patientName}
                          </h3>
                          <div className="text-xs text-slate-500 font-medium flex items-center gap-1.5 mt-0.5">
                            <span>{row.age} yrs</span>
                            <span>•</span>
                            <span>{row.gender}</span>
                            <span>•</span>
                            <span className="font-semibold text-slate-700">{row.countryShort}</span>
                          </div>
                        </div>
                      </div>

                      <span className="font-mono text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                        {c.id}
                      </span>
                    </div>

                    {/* Condition / Procedure */}
                    <div className="bg-slate-50/80 rounded-2xl p-3 border border-slate-100 text-xs">
                      <div className="font-extrabold text-slate-900 truncate">{row.treatmentDisplay}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1">
                        <Building2 className="w-3 h-3 text-slate-400" />
                        <span>Hospital: <strong>{c.assignedHospitalId?.replace("hosp_", "").toUpperCase() || "MEDANTA"}</strong></span>
                      </div>
                    </div>

                    {/* Status Badges */}
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black border ${row.journeyStatusBadge}`}>
                        {row.journeyStatusLabel}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${row.docsStatusBadge}`}>
                        {row.docsStatusLabel}
                      </span>
                    </div>
                  </div>

                  {/* Card Bottom: Quick Actions + View Case Button */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1">
                      {onOpenCallModal && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenCallModal(c);
                          }}
                          className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 cursor-pointer"
                          title="Call Patient"
                        >
                          <Phone className="w-3.5 h-3.5" />
                        </button>
                      )}
                      {onOpenWhatsAppModal && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenWhatsAppModal(c);
                          }}
                          className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 cursor-pointer"
                          title="WhatsApp"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectCase(c.id);
                      }}
                      className="px-4 py-2 rounded-xl bg-[#101955] hover:bg-[#1a2670] text-white font-black text-xs flex items-center gap-1.5 shadow-xs transition-all cursor-pointer group/btn"
                    >
                      <span>View Case</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#2ECDC5] group-hover/btn:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};
