"use client";

import React, { useState, useMemo } from "react";
import { PatientCase } from "@/types/portal";
import {
  Search,
  Building2,
  Car,
  Languages,
  Wifi,
  UserCheck,
  ArrowRight,
  ShieldCheck,
  Phone,
  MessageSquare,
  Sparkles,
} from "lucide-react";

interface CSConciergeTableProps {
  cases: PatientCase[];
  onSelectCase: (caseId: string, subTab?: string) => void;
  onOpenCallModal?: (patient: PatientCase) => void;
  onOpenWhatsAppModal?: (patient: PatientCase) => void;
}

export const CSConciergeTable: React.FC<CSConciergeTableProps> = ({
  cases,
  onSelectCase,
  onOpenCallModal,
  onOpenWhatsAppModal,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("all");

  function getCountryFlag(country?: string) {
    if (!country) return "🌐";
    if (country.includes("United Kingdom") || country.includes("UK")) return "🇬🇧";
    if (country.includes("United Arab Emirates") || country.includes("UAE") || country.includes("Dubai")) return "🇦🇪";
    if (country.includes("United States") || country.includes("USA")) return "🇺🇸";
    if (country.includes("Kenya")) return "🇰🇪";
    if (country.includes("Canada")) return "🇨🇦";
    return "🌐";
  }

  // Build concierge records
  const conciergeRecords = useMemo(() => {
    return cases.map((c) => {
      let chauffeur = "Sukhvinder Singh (Mercedes V-Class)";
      let translator = "Dedicated Arabic Translator (Omar Al-Haddad)";
      let localAmenities = "Airtel 5G VIP SIM + Forex Card Active";
      let hospitalLiaison = "Ananya Sharma (Medanta International Desk)";
      let status = "Airport Pickup Scheduled";
      let statusBadge = "bg-amber-50 text-amber-800 border-amber-200";

      if (c.patientName.includes("Tariq")) {
        chauffeur = "Sukhvinder Singh (VIP Mercedes Van)";
        translator = "Arabic Medical Interpreter (Omar Al-Haddad)";
        localAmenities = "Pre-Activated 5G eSIM + ₹50,000 INR Forex";
        hospitalLiaison = "Aisha Khan (Medanta Suite Desk)";
        status = "VIP Meet & Greet Active";
        statusBadge = "bg-emerald-50 text-emerald-800 border-emerald-300 font-extrabold";
      } else if (c.patientName.includes("Eleanor")) {
        chauffeur = "Rajesh Verma (Toyota Innova Crysta)";
        translator = "English Concierge Coordinator";
        localAmenities = "Wi-Fi Dongle + Wheelchair Chaperone";
        hospitalLiaison = "Dr. Trehan Clinical Secretary";
        status = "Wheelchair Chaperone Allocated";
        statusBadge = "bg-blue-50 text-blue-800 border-blue-200";
      } else if (c.patientName.includes("David")) {
        chauffeur = "Amit Kumar (Luxury Sedan)";
        translator = "English / French Coordinator";
        localAmenities = "Local SIM Card Dispatched";
        hospitalLiaison = "Fortis Desk Liaison";
        status = "Hotel Check-in Confirmed";
        statusBadge = "bg-purple-50 text-purple-800 border-purple-200";
      }

      return {
        caseObj: c,
        chauffeur,
        translator,
        localAmenities,
        hospitalLiaison,
        status,
        statusBadge,
      };
    });
  }, [cases]);

  // Filtering
  const filteredRecords = useMemo(() => {
    let list = conciergeRecords;
    if (filterType !== "all") {
      list = list.filter((r) => r.status.toLowerCase().includes(filterType.toLowerCase()));
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (i) =>
          i.caseObj.patientName.toLowerCase().includes(q) ||
          i.chauffeur.toLowerCase().includes(q) ||
          i.translator.toLowerCase().includes(q) ||
          i.hospitalLiaison.toLowerCase().includes(q)
      );
    }
    return list;
  }, [conciergeRecords, filterType, searchQuery]);

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* Header & Search */}
      <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm shadow-slate-100/50 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <h2 className="text-lg font-black text-slate-900 tracking-tight">
                On-Ground VIP Concierge &amp; Hospitality Desk
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Dedicated translators, airport tarmac meet-and-greet, luxury chauffeur dispatch, and hospital escorts.
            </p>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search concierge, chauffeur, patient..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-[#2ECDC5] focus:outline-none"
            />
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {[
            { id: "all", label: `All Concierge Cases (${conciergeRecords.length})` },
            { id: "meet", label: "VIP Meet & Greet Active" },
            { id: "wheelchair", label: "Special Mobility / Wheelchair" },
            { id: "hotel", label: "Hotel Check-in Confirmed" },
          ].map((pill) => (
            <button
              key={pill.id}
              onClick={() => setFilterType(pill.id)}
              className={`px-3.5 py-1.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                filterType === pill.id
                  ? "bg-[#101955] text-white shadow-xs"
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/80"
              }`}
            >
              {pill.label}
            </button>
          ))}
        </div>
      </div>

      {/* Concierge List Table */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm shadow-slate-100/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-100 text-slate-600 font-extrabold uppercase tracking-wider text-[11px]">
                <th className="py-4 px-4">Patient</th>
                <th className="py-4 px-4">Dedicated Medical Translator</th>
                <th className="py-4 px-4">Airport Chauffeur Transfer</th>
                <th className="py-4 px-4">Local Amenities &amp; SIM</th>
                <th className="py-4 px-4">Hospital VIP Liaison</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRecords.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-xs text-slate-400">
                    No concierge assignments found.
                  </td>
                </tr>
              ) : (
                filteredRecords.map((item) => {
                  const { caseObj: c } = item;
                  return (
                    <tr
                      key={c.id}
                      onClick={() => onSelectCase(c.id, "visas_concierge")}
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

                      {/* Translator */}
                      <td className="py-4 px-4">
                        <div className="font-bold text-xs text-slate-800 flex items-center gap-1">
                          <Languages className="w-3.5 h-3.5 text-blue-600" />
                          <span>{item.translator}</span>
                        </div>
                      </td>

                      {/* Chauffeur */}
                      <td className="py-4 px-4">
                        <div className="text-xs text-slate-700 font-medium flex items-center gap-1">
                          <Car className="w-3.5 h-3.5 text-slate-400" />
                          <span>{item.chauffeur}</span>
                        </div>
                      </td>

                      {/* Local Amenities */}
                      <td className="py-4 px-4">
                        <div className="text-xs text-slate-600 font-medium flex items-center gap-1">
                          <Wifi className="w-3.5 h-3.5 text-teal-600" />
                          <span>{item.localAmenities}</span>
                        </div>
                      </td>

                      {/* Hospital Liaison */}
                      <td className="py-4 px-4">
                        <div className="text-xs text-slate-800 font-bold">{item.hospitalLiaison}</div>
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
                            onClick={() => onSelectCase(c.id, "visas_concierge")}
                            className="px-3.5 py-1.5 rounded-xl bg-[#101955] hover:bg-[#1a2670] text-white font-black text-xs flex items-center gap-1.5 shadow-xs transition-all cursor-pointer group/btn"
                          >
                            <span>Concierge</span>
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
