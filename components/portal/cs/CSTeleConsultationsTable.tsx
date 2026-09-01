"use client";

import React, { useState, useMemo } from "react";
import { PatientCase } from "@/types/portal";
import {
  Search,
  Video,
  Calendar,
  Clock,
  User,
  Building2,
  ArrowRight,
  Sparkles,
  Phone,
  MessageSquare,
  RefreshCw,
  CheckCircle2,
  Play,
} from "lucide-react";

interface CSTeleConsultationsTableProps {
  cases: PatientCase[];
  onSelectCase: (caseId: string, subTab?: string) => void;
  onJoinVideoRoom: (patient: PatientCase) => void;
  onReassignConsult: (item: {
    time: string;
    patientName: string;
    doctorName: string;
    hospital: string;
    caseId?: string;
  }) => void;
  onOpenCallModal?: (patient: PatientCase) => void;
  onOpenWhatsAppModal?: (patient: PatientCase) => void;
}

export const CSTeleConsultationsTable: React.FC<CSTeleConsultationsTableProps> = ({
  cases,
  onSelectCase,
  onJoinVideoRoom,
  onReassignConsult,
  onOpenCallModal,
  onOpenWhatsAppModal,
}) => {
  const [statusFilter, setStatusFilter] = useState<"all" | "today" | "upcoming" | "completed">("all");
  const [searchQuery, setSearchQuery] = useState("");

  function getCountryFlag(country?: string) {
    if (!country) return "🌐";
    if (country.includes("United Kingdom") || country.includes("UK")) return "🇬🇧";
    if (country.includes("United Arab Emirates") || country.includes("UAE") || country.includes("Dubai")) return "🇦🇪";
    if (country.includes("United States") || country.includes("USA")) return "🇺🇸";
    if (country.includes("Kenya")) return "🇰🇪";
    if (country.includes("Canada")) return "🇨🇦";
    return "🌐";
  }

  // Build simulated consultation sessions
  const consultList = useMemo(() => {
    return cases.map((c, idx) => {
      let time = "Today 14:30 IST";
      let doctor = "Dr. Subhash Gupta (Liver Transplant)";
      let hospital = "Medanta – The Medicity";
      let roomId = `VED-${c.id.replace("PT-2026-", "")}`;
      let status: "today" | "upcoming" | "completed" = idx % 2 === 0 ? "today" : "upcoming";
      let statusLabel = "Scheduled Today";
      let statusBadge = "bg-amber-50 text-amber-800 border-amber-200";

      if (c.patientName.includes("Tariq")) {
        time = "Thursday, Aug 27, 03:30 PM GST (02:00 PM GST)";
        doctor = c.consultation?.doctorName || "Dr. Subhash Gupta";
        hospital = c.consultation?.doctorHospital || "Medanta – The Medicity";
        status = "today";
        statusLabel = "🟢 Live Room Ready";
        statusBadge = "bg-emerald-50 text-emerald-800 border-emerald-300 font-extrabold animate-pulse";
      } else if (c.patientName.includes("David")) {
        time = "Today 17:00 IST";
        doctor = "Dr. Ashok Seth";
        hospital = "Fortis Memorial";
        status = "today";
        statusLabel = "Confirmed Today";
        statusBadge = "bg-blue-50 text-blue-800 border-blue-200";
      } else if (c.patientName.includes("Eleanor")) {
        time = "Tomorrow 11:00 BST";
        doctor = "Dr. Naresh Trehan";
        hospital = "Medanta Medicity";
        status = "upcoming";
        statusLabel = "Upcoming";
        statusBadge = "bg-purple-50 text-purple-800 border-purple-200";
      } else if (c.patientName.includes("John")) {
        time = "Yesterday 16:00 IST";
        doctor = "Dr. Ashok Rajgopal";
        hospital = "Apollo Chennai";
        status = "completed";
        statusLabel = "Completed (Recording Saved)";
        statusBadge = "bg-slate-100 text-slate-700 border-slate-200";
      }

      return {
        caseObj: c,
        time,
        doctor,
        hospital,
        roomId,
        status,
        statusLabel,
        statusBadge,
      };
    });
  }, [cases]);

  // Filtering logic
  const filteredConsults = useMemo(() => {
    let list = consultList;
    if (statusFilter !== "all") {
      list = list.filter((item) => item.status === statusFilter);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (i) =>
          i.caseObj.patientName.toLowerCase().includes(q) ||
          i.doctor.toLowerCase().includes(q) ||
          i.hospital.toLowerCase().includes(q) ||
          i.roomId.toLowerCase().includes(q)
      );
    }
    return list;
  }, [consultList, statusFilter, searchQuery]);

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* Header Info & Search */}
      <div className="bg-white rounded-2xl p-4 shadow-[0_6px_32px_rgba(0,0,0,0.04)] border border-slate-200/90 space-y-4 transition-all group">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Video className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-black text-slate-900 tracking-tight">
                Tele-Consultation Room &amp; Video Call Schedules
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Secure WebRTC video rooms, doctor reassignments, live translations, and diagnostic screensharing.
            </p>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search session, doctor, patient..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-[#2ECDC5] focus:outline-none"
            />
          </div>
        </div>

        {/* Status Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {[
            { id: "all", label: `All Consultations (${consultList.length})` },
            { id: "today", label: "🔴 Scheduled Today" },
            { id: "upcoming", label: "Upcoming Sessions" },
            { id: "completed", label: "Completed / Recorded" },
          ].map((pill) => (
            <button
              key={pill.id}
              onClick={() => setStatusFilter(pill.id as any)}
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

      {/* Consultations List Table */}
      <div className="bg-white rounded-2xl  shadow-[0_6px_32px_rgba(0,0,0,0.04)] border border-slate-200/90  overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-100 text-slate-600 font-extrabold uppercase tracking-wider text-[11px]">
                <th className="py-4 px-4">Date &amp; Time</th>
                <th className="py-4 px-4">Patient Case</th>
                <th className="py-4 px-4">Specialist &amp; Hospital</th>
                <th className="py-4 px-4">Video Room ID</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredConsults.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-xs text-slate-400">
                    No tele-consultation sessions found.
                  </td>
                </tr>
              ) : (
                filteredConsults.map((item) => {
                  const { caseObj: c } = item;
                  return (
                    <tr
                      key={c.id}
                      onClick={() => onSelectCase(c.id, "hospital_opinions")}
                      className="hover:bg-slate-50/90 transition-all cursor-pointer group"
                    >
                      {/* Date & Time */}
                      <td className="py-4 px-4">
                        <div className="font-extrabold text-xs text-slate-900 flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-blue-600" />
                          <span>{item.time}</span>
                        </div>
                      </td>

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

                      {/* Specialist */}
                      <td className="py-4 px-4">
                        <div className="font-bold text-xs text-slate-800">{item.doctor}</div>
                        <div className="text-[11px] text-slate-500 mt-0.5">{item.hospital}</div>
                      </td>

                      {/* Video Room ID */}
                      <td className="py-4 px-4">
                        <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                          {item.roomId}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-black border ${item.statusBadge}`}>
                          {item.statusLabel}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() =>
                              onReassignConsult({
                                time: item.time,
                                patientName: c.patientName,
                                doctorName: item.doctor,
                                hospital: item.hospital,
                                caseId: c.id,
                              })
                            }
                            className="px-2.5 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200 cursor-pointer flex items-center gap-1"
                            title="Reassign Doctor"
                          >
                            <RefreshCw className="w-3 h-3 text-slate-500" />
                            <span className="hidden sm:inline">Reassign</span>
                          </button>

                          <button
                            onClick={() => onJoinVideoRoom(c)}
                            className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs flex items-center gap-1 shadow-xs cursor-pointer"
                          >
                            <Play className="w-3 h-3 fill-current" />
                            <span>Join Video</span>
                          </button>

                          <button
                            onClick={() => onSelectCase(c.id)}
                            className="px-3 py-1.5 rounded-xl bg-[#101955] hover:bg-[#1a2670] text-white font-bold text-xs flex items-center gap-1 cursor-pointer"
                          >
                            <span>Case</span>
                            <ArrowRight className="w-3.5 h-3.5 text-[#2ECDC5]" />
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
