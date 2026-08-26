"use client";

import React, { useState, useMemo } from "react";
import { PatientCase, PatientJourneyStage, AdminTab } from "@/types/portal";
import {
  Layers,
  Search,
  Filter,
  User,
  Building2,
  Stethoscope,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Eye,
  X,
  FileText,
  DollarSign,
  Shield,
  Activity,
  Wallet,
  Sparkles,
} from "lucide-react";

interface AdminCaseMasterDirectoryProps {
  cases: PatientCase[];
  onNavigateTab?: (tab: AdminTab) => void;
}

export const AdminCaseMasterDirectory: React.FC<AdminCaseMasterDirectoryProps> = ({
  cases,
  onNavigateTab,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [stageFilter, setStageFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [selectedCase, setSelectedCase] = useState<PatientCase | null>(null);

  const filteredCases = useMemo(() => {
    return cases.filter((c) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        c.patientName.toLowerCase().includes(q) ||
        c.id.toLowerCase().includes(q) ||
        c.patientEmail.toLowerCase().includes(q) ||
        c.treatmentCategory.toLowerCase().includes(q) ||
        (c.assignedCoordinatorName && c.assignedCoordinatorName.toLowerCase().includes(q));

      const matchesStage = stageFilter === "all" || c.stage === stageFilter;
      const matchesCategory = categoryFilter === "all" || c.treatmentCategory === categoryFilter;

      return matchesSearch && matchesStage && matchesCategory;
    });
  }, [cases, searchQuery, stageFilter, categoryFilter]);

  const categories = Array.from(new Set(cases.map((c) => c.treatmentCategory)));

  const getStageBadgeColor = (stage: PatientJourneyStage) => {
    switch (stage) {
      case "treatment":
      case "booking":
        return "bg-emerald-100 text-emerald-900 border-emerald-300";
      case "payment":
      case "quote":
        return "bg-blue-100 text-blue-900 border-blue-300";
      case "consultation":
      case "hospital_handover":
        return "bg-purple-100 text-purple-900 border-purple-300";
      case "documents_collected":
      case "contacted":
      case "lead":
        return "bg-teal-100 text-teal-900 border-teal-300";
      case "nurture":
        return "bg-amber-100 text-amber-900 border-amber-300";
      case "followup":
        return "bg-slate-100 text-slate-900 border-slate-300";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Bar */}
      <div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-black uppercase tracking-widest text-[#3F4EB4] bg-blue-50 px-2.5 py-0.5 rounded-full">
            Journey Engine • Domain 3
          </span>
        </div>
        <h2 className="text-xl font-black text-slate-900 tracking-tight mt-1">
          Global Case Master Directory
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Master registry of all international inquiries, patient stages, active escrows, coordinator assignments, and clinical workflows.
        </p>
      </div>

      {/* Filter and Search Toolbar */}
      <div className="bg-white/95 rounded-2xl border border-slate-200 shadow-sm p-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by Patient Name, Case ID (e.g. PT-2026), Email, or Treatment…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-[#2ECDC5] focus:outline-none"
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          <select
            value={stageFilter}
            onChange={(e) => setStageFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 font-bold focus:ring-2 focus:ring-[#2ECDC5] focus:outline-none cursor-pointer"
          >
            <option value="all">All Stages ({cases.length})</option>
            <option value="lead">Lead Intake</option>
            <option value="contacted">Contacted</option>
            <option value="documents_collected">Documents Collected</option>
            <option value="hospital_handover">Hospital Handover</option>
            <option value="consultation">Tele-Consultation</option>
            <option value="quote">Quotation Issued</option>
            <option value="payment">Staged Escrow Payment</option>
            <option value="booking">Travel & Booking</option>
            <option value="treatment">Hospital Inpatient Treatment</option>
            <option value="followup">Post-Treatment Recovery</option>
            <option value="nurture">Nurture Re-engagement</option>
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 font-bold focus:ring-2 focus:ring-[#2ECDC5] focus:outline-none cursor-pointer"
          >
            <option value="all">All Specialties</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Master Case Table */}
      <div className="bg-white/95 rounded-2xl border border-slate-200 shadow-sm overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-slate-100 text-slate-400 uppercase text-[10px] font-black tracking-wider bg-slate-50/50">
              <th className="py-3.5 pl-5 text-left">Case ID & Patient</th>
              <th className="py-3.5 text-left">Country</th>
              <th className="py-3.5 text-left">Specialty / Treatment</th>
              <th className="py-3.5 text-left">Stage</th>
              <th className="py-3.5 text-left">Assigned Coordinator</th>
              <th className="py-3.5 text-left">Escrow Paid</th>
              <th className="py-3.5 text-left">SLA Status</th>
              <th className="py-3.5 pr-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {filteredCases.map((c) => {
              const paidSum = c.payments
                .filter((p) => p.status === "completed")
                .reduce((sum, p) => sum + p.amountUsd, 0);

              return (
                <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 pl-5">
                    <div>
                      <div className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5">
                        <span className="font-mono text-[11px] text-[#3F4EB4]">{c.id}</span>
                        <span>• {c.patientName}</span>
                      </div>
                      <div className="text-[11px] text-slate-500">{c.patientEmail}</div>
                    </div>
                  </td>

                  <td className="py-4">
                    <span className="font-bold text-slate-800">{c.patientCountry}</span>
                  </td>

                  <td className="py-4">
                    <span className="font-bold text-slate-800">{c.treatmentCategory}</span>
                  </td>

                  <td className="py-4">
                    <span
                      className={`inline-block text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border ${getStageBadgeColor(
                        c.stage
                      )}`}
                    >
                      {(c.stage || "intake").replace(/_/g, " ")}
                    </span>
                  </td>

                  <td className="py-4">
                    <span className="font-bold text-slate-800">{c.assignedCoordinatorName || "Unassigned"}</span>
                  </td>

                  <td className="py-4">
                    <span className="font-mono font-bold text-emerald-700">
                      ${paidSum.toLocaleString()}
                    </span>
                  </td>

                  <td className="py-4">
                    {c.slaBreached ? (
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                        ⚠️ Breached
                      </span>
                    ) : (
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                        ✓ On Track
                      </span>
                    )}
                  </td>

                  <td className="py-4 pr-5 text-right">
                    <button
                      onClick={() => setSelectedCase(c)}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-[11px] cursor-pointer transition-colors flex items-center gap-1 ml-auto"
                    >
                      <Eye className="w-3.5 h-3.5" /> Dossier
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Case Dossier Slide-Over Modal */}
      {selectedCase && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
          <div className="w-full max-w-2xl bg-white h-full shadow-2xl overflow-y-auto p-6 sm:p-8 space-y-6 flex flex-col justify-between border-l border-slate-200">
            <div className="space-y-6">
              {/* Drawer Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-black text-[#3F4EB4]">{selectedCase.id}</span>
                    <span
                      className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border ${getStageBadgeColor(
                        selectedCase.stage
                      )}`}
                    >
                      {(selectedCase.stage || "intake").replace(/_/g, " ")}
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-slate-900 mt-1">{selectedCase.patientName}</h3>
                  <div className="text-xs text-slate-500">
                    {selectedCase.patientCountry} • {selectedCase.patientEmail} • {selectedCase.patientPhone}
                  </div>
                </div>

                <button
                  onClick={() => setSelectedCase(null)}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Quick Info Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-150">
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Treatment</span>
                  <strong className="text-slate-900">{selectedCase.treatmentCategory}</strong>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-150">
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Coordinator</span>
                  <strong className="text-slate-900">{selectedCase.assignedCoordinatorName}</strong>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-150">
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Quote Value</span>
                  <strong className="text-emerald-700">${selectedCase.quote?.totalCostUsd?.toLocaleString() || "18,500"}</strong>
                </div>
              </div>

              {/* Clinical Summary */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
                <h4 className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5">
                  <Stethoscope className="w-4 h-4 text-[#3F4EB4]" /> Clinical Summary & Diagnosis
                </h4>
                <div>
                  <span className="text-slate-500">Chief Complaint: </span>
                  <strong className="text-slate-800">{selectedCase.clinicalSummary.chiefComplaint}</strong>
                </div>
                <div>
                  <span className="text-slate-500">Diagnosis: </span>
                  <strong className="text-slate-800">{selectedCase.clinicalSummary.diagnosis}</strong>
                </div>
                <div>
                  <span className="text-slate-500">Recommended Procedure: </span>
                  <strong className="text-slate-800">{selectedCase.clinicalSummary.recommendedProcedure}</strong>
                </div>
              </div>

              {/* Stage Progression Timeline */}
              <div className="space-y-3">
                <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                  Stage Audit Timeline
                </h4>
                <div className="space-y-2 text-xs">
                  {selectedCase.stageHistory.map((hist, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-white rounded-xl border border-slate-200 flex items-start justify-between gap-3 text-[11px]"
                    >
                      <div>
                        <div className="font-bold text-slate-800">
                          {hist.fromStage ? `${hist.fromStage} → ` : ""}
                          <strong className="text-[#3F4EB4]">{hist.toStage}</strong>
                        </div>
                        {hist.reason && <div className="text-slate-500 mt-0.5">{hist.reason}</div>}
                      </div>
                      <div className="text-right text-slate-400 shrink-0">
                        <div>{hist.changedByName}</div>
                        <div>{new Date(hist.changedAt).toLocaleDateString()}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between flex-wrap gap-2">
              <button
                onClick={() => setSelectedCase(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer transition-colors"
              >
                Close Dossier
              </button>

              {onNavigateTab && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setSelectedCase(null);
                      onNavigateTab("gateway_escrow");
                    }}
                    className="px-3 py-2 rounded-xl bg-teal-50 hover:bg-teal-100 text-[#1baba4] font-bold text-xs flex items-center gap-1.5 cursor-pointer border border-teal-200 transition-colors"
                  >
                    <Wallet className="w-3.5 h-3.5" />
                    <span>View in Escrow Vault</span>
                  </button>
                  <button
                    onClick={() => {
                      setSelectedCase(null);
                      onNavigateTab("sla_escalation_engine");
                    }}
                    className="px-3 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#3F4EB4] font-bold text-xs flex items-center gap-1.5 cursor-pointer border border-blue-200 transition-colors"
                  >
                    <Clock className="w-3.5 h-3.5" />
                    <span>SLA Ladder</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
