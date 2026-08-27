"use client";

import React, { useState, useMemo } from "react";
import { PatientCase } from "@/types/portal";
import {
  Search,
  Building2,
  Stethoscope,
  Clock,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  FileCheck,
  Sparkles,
  Phone,
  MessageSquare,
  Filter,
} from "lucide-react";

interface CSHospitalHandoversTableProps {
  cases: PatientCase[];
  onSelectCase: (caseId: string, subTab?: string) => void;
  onOpenCallModal?: (patient: PatientCase) => void;
  onOpenWhatsAppModal?: (patient: PatientCase) => void;
}

export const CSHospitalHandoversTable: React.FC<CSHospitalHandoversTableProps> = ({
  cases,
  onSelectCase,
  onOpenCallModal,
  onOpenWhatsAppModal,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [hospitalFilter, setHospitalFilter] = useState<string>("all");

  function getCountryFlag(country?: string) {
    if (!country) return "🌐";
    if (country.includes("United Kingdom") || country.includes("UK")) return "🇬🇧";
    if (country.includes("United Arab Emirates") || country.includes("UAE") || country.includes("Dubai")) return "🇦🇪";
    if (country.includes("United States") || country.includes("USA")) return "🇺🇸";
    if (country.includes("Kenya")) return "🇰🇪";
    if (country.includes("Canada")) return "🇨🇦";
    return "🌐";
  }

  // Filter cases relevant to hospital handover or opinion review
  const handoverCases = useMemo(() => {
    let list = cases.map((c) => {
      let hospitalName = "Medanta – The Medicity, Delhi NCR";
      let doctorName = "Dr. Subhash Gupta";
      let status = "Board Reviewing";
      let statusColor = "bg-amber-50 text-amber-800 border-amber-200";
      let slaHours = "2.4h turnaround";

      if (c.patientName.includes("Tariq")) {
        hospitalName = "Medanta – The Medicity";
        doctorName = "Dr. Subhash Gupta (Liver Transplant)";
        status = "Opinion Received";
        statusColor = "bg-emerald-50 text-emerald-800 border-emerald-200";
        slaHours = "Slot Offered (14:30 IST)";
      } else if (c.patientName.includes("Eleanor")) {
        hospitalName = "Fortis Memorial Research Institute";
        doctorName = "Dr. Naresh Trehan / Dr. Ashok Seth";
        status = "Urgent Surgical Board";
        statusColor = "bg-rose-50 text-rose-800 border-rose-300 animate-pulse";
        slaHours = "Priority SLA: 12m";
      } else if (c.patientName.includes("John")) {
        hospitalName = "Apollo Hospitals, Chennai";
        doctorName = "Dr. Ashok Rajgopal (Orthopaedics)";
        status = "Opinion Ready";
        statusColor = "bg-blue-50 text-blue-800 border-blue-200";
        slaHours = "Quote Pending";
      } else if (c.patientName.includes("David")) {
        hospitalName = "Max Super Speciality Hospital, Saket";
        doctorName = "Dr. Balbir Singh (Cardiology)";
        status = "CT Angio Evaluation";
        statusColor = "bg-purple-50 text-purple-800 border-purple-200";
        slaHours = "TAVR Sizing";
      }

      return {
        ...c,
        hospitalName,
        doctorName,
        handoverStatus: status,
        handoverStatusColor: statusColor,
        slaHours,
      };
    });

    if (hospitalFilter !== "all") {
      list = list.filter((c) => c.hospitalName.toLowerCase().includes(hospitalFilter.toLowerCase()));
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (c) =>
          c.patientName.toLowerCase().includes(q) ||
          c.id.toLowerCase().includes(q) ||
          c.hospitalName.toLowerCase().includes(q) ||
          c.doctorName.toLowerCase().includes(q) ||
          c.treatmentCategory.toLowerCase().includes(q)
      );
    }

    return list;
  }, [cases, hospitalFilter, searchQuery]);

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* Header Info & Filters */}
      <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm shadow-slate-100/50 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-black text-slate-900 tracking-tight">
                Hospital Handovers &amp; Clinical Board Reviews
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Live multi-hospital dispatch board, surgical candidacy reviews, and doctor opinion tracking.
            </p>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search hospital, doctor, patient..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-[#2ECDC5] focus:outline-none"
            />
          </div>
        </div>

        {/* Hospital Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {[
            { id: "all", label: "All Partner Hospitals" },
            { id: "Medanta", label: "Medanta Medicity" },
            { id: "Apollo", label: "Apollo Hospitals" },
            { id: "Fortis", label: "Fortis Healthcare" },
            { id: "Max", label: "Max Super Speciality" },
          ].map((pill) => (
            <button
              key={pill.id}
              onClick={() => setHospitalFilter(pill.id)}
              className={`px-3.5 py-1.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                hospitalFilter === pill.id
                  ? "bg-[#101955] text-white shadow-xs"
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/80"
              }`}
            >
              {pill.label}
            </button>
          ))}
        </div>
      </div>

      {/* List Table */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm shadow-slate-100/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-100 text-slate-600 font-extrabold uppercase tracking-wider text-[11px]">
                <th className="py-4 px-4">Patient</th>
                <th className="py-4 px-4">Target Hospital &amp; Center</th>
                <th className="py-4 px-4">Assigned Specialist</th>
                <th className="py-4 px-4">Evaluation Status</th>
                <th className="py-4 px-4">Turnaround SLA</th>
                <th className="py-4 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {handoverCases.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-xs text-slate-400">
                    No hospital handovers found.
                  </td>
                </tr>
              ) : (
                handoverCases.map((c) => (
                  <tr
                    key={c.id}
                    onClick={() => onSelectCase(c.id, "hospital_opinions")}
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

                    {/* Hospital */}
                    <td className="py-4 px-4">
                      <div className="font-extrabold text-xs text-slate-900 flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-blue-600" />
                        <span>{c.hospitalName}</span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{c.treatmentCategory}</div>
                    </td>

                    {/* Specialist */}
                    <td className="py-4 px-4">
                      <div className="font-bold text-xs text-slate-800 flex items-center gap-1">
                        <Stethoscope className="w-3.5 h-3.5 text-slate-400" />
                        <span>{c.doctorName}</span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-4 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-black border ${c.handoverStatusColor}`}>
                        {c.handoverStatus}
                      </span>
                    </td>

                    {/* Turnaround SLA */}
                    <td className="py-4 px-4">
                      <div className="font-mono text-xs font-bold text-slate-700 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{c.slaHours}</span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1.5">
                        {onOpenCallModal && (
                          <button
                            onClick={() => onOpenCallModal(c)}
                            className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 cursor-pointer"
                            title="Call Patient"
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
                          onClick={() => onSelectCase(c.id, "hospital_opinions")}
                          className="px-3.5 py-1.5 rounded-xl bg-[#101955] hover:bg-[#1a2670] text-white font-black text-xs flex items-center gap-1.5 shadow-xs transition-all cursor-pointer group/btn"
                        >
                          <span>View Opinions</span>
                          <ArrowRight className="w-3.5 h-3.5 text-[#2ECDC5] group-hover/btn:translate-x-0.5 transition-transform" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
