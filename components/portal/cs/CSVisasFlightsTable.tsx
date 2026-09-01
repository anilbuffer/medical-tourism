"use client";

import React, { useState, useMemo } from "react";
import { PatientCase } from "@/types/portal";
import {
  Search,
  Plane,
  FileCheck,
  Building2,
  Car,
  Calendar,
  Clock,
  ArrowRight,
  ShieldCheck,
  Phone,
  MessageSquare,
  Globe,
} from "lucide-react";

interface CSVisasFlightsTableProps {
  cases: PatientCase[];
  onSelectCase: (caseId: string, subTab?: string) => void;
  onOpenCallModal?: (patient: PatientCase) => void;
  onOpenWhatsAppModal?: (patient: PatientCase) => void;
}

export const CSVisasFlightsTable: React.FC<CSVisasFlightsTableProps> = ({
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

  // Build travel records
  const travelRecords = useMemo(() => {
    return cases.map((c) => {
      let visaStatus = "Issued (M-Visa e-Clearance)";
      let visaBadge = "bg-emerald-50 text-emerald-800 border-emerald-200";
      let flight = c.itinerary?.flightDetails?.flightNumber || "EK-512 (Emirates)";
      let arrival = "28 Aug, 09:30 IST (DEL T3)";
      let hotel = "The Oberoi, Gurgaon (Room 402)";
      let chauffeur = "Rajesh Kumar (+91 98110-XXXXX)";

      if (c.patientName.includes("Tariq")) {
        visaStatus = "Medical Visa Verified (e-Visa Approved)";
        visaBadge = "bg-emerald-50 text-emerald-800 border-emerald-200";
        flight = c.itinerary?.flightDetails?.flightNumber ? `${c.itinerary.flightDetails.flightNumber} (DXB → DEL)` : "EK-512 (DXB → DEL)";
        arrival = c.itinerary?.flightDetails?.arrivalDate ? `${c.itinerary.flightDetails.arrivalDate} at ${c.itinerary.flightDetails.arrivalTime}` : "Aug 31 at 04:15 AM IST (DEL T3)";
        hotel = c.itinerary?.hotelDetails?.name || "The Oberoi Gurugram (Executive Suite)";
        chauffeur = c.itinerary?.airportPickup?.driverName ? `${c.itinerary.airportPickup.driverName} (${c.itinerary.airportPickup.vehicleType || "Toyota Alphard VIP"})` : "Rajesh Varma (Toyota Alphard VIP)";
      } else if (c.patientName.includes("Eleanor")) {
        visaStatus = "Invitation Letter Dispatched";
        visaBadge = "bg-amber-50 text-amber-800 border-amber-200";
        flight = "BA-143 (LHR → DEL)";
        arrival = "Awaiting Flight Confirmation";
        hotel = "Taj City Centre, Gurugram";
        chauffeur = "Pending Flight Schedule";
      } else if (c.patientName.includes("David")) {
        visaStatus = "Application in Embassy Review";
        visaBadge = "bg-purple-50 text-purple-800 border-purple-200";
        flight = "UA-82 (EWR → DEL)";
        arrival = "Target Arrival: Next Tuesday";
        hotel = "Crowne Plaza, Gurugram";
        chauffeur = "Allocated";
      }

      return {
        caseObj: c,
        visaStatus,
        visaBadge,
        flight,
        arrival,
        hotel,
        chauffeur,
      };
    });
  }, [cases]);

  // Filter logic
  const filteredRecords = useMemo(() => {
    let list = travelRecords;
    if (filterType !== "all") {
      list = list.filter((r) => r.visaStatus.toLowerCase().includes(filterType.toLowerCase()));
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (i) =>
          i.caseObj.patientName.toLowerCase().includes(q) ||
          i.flight.toLowerCase().includes(q) ||
          i.hotel.toLowerCase().includes(q) ||
          i.caseObj.patientCountry.toLowerCase().includes(q)
      );
    }
    return list;
  }, [travelRecords, filterType, searchQuery]);

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* Header & Filters */}
      <div className="bg-white rounded-2xl p-4 shadow-[0_6px_32px_rgba(0,0,0,0.04)] border border-slate-200/90 space-y-4 transition-all group">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Plane className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-black text-slate-900 tracking-tight">
                Visas &amp; Flight Bookings Desk
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Embassy visa letters, FRRO compliance, flight manifest tracking, and airport arrival schedule.
            </p>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search flight, visa, hotel, patient..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-[#2ECDC5] focus:outline-none"
            />
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {[
            { id: "all", label: `All Travel Cases (${travelRecords.length})` },
            { id: "verified", label: "Visa Approved & Cleared" },
            { id: "dispatched", label: "Invitation Letter Dispatched" },
            { id: "review", label: "Embassy Review Active" },
          ].map((pill) => (
            <button
              key={pill.id}
              onClick={() => setFilterType(pill.id)}
              className={`px-3.5 py-1.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${filterType === pill.id
                ? "bg-[#101955] text-white shadow-xs"
                : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/80"
                }`}
            >
              {pill.label}
            </button>
          ))}
        </div>
      </div>

      {/* Travel List Table */}
      <div className="bg-white rounded-2xl  shadow-[0_6px_32px_rgba(0,0,0,0.04)] border border-slate-200/90  overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-100 text-slate-600 font-extrabold uppercase tracking-wider text-[11px]">
                <th className="py-4 px-4">Patient</th>
                <th className="py-4 px-4">Medical Visa Status</th>
                <th className="py-4 px-4">Flight &amp; Airline</th>
                <th className="py-4 px-4">Arrival ETA &amp; Terminal</th>
                <th className="py-4 px-4">Hotel Stay</th>
                <th className="py-4 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRecords.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-xs text-slate-400">
                    No travel or visa records found.
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
                        <div className="font-extrabold text-sm text-slate-900 group-hover:text-[#101955] transition-colors flex items-center gap-1.5 whitespace-nowrap">
                          <span>{c.patientName}</span>
                        </div>
                        <div className="text-xs text-slate-500 font-medium mt-0.5 flex items-center gap-1 whitespace-nowrap">
                          <span>{getCountryFlag(c.patientCountry)} {c.patientCountry}</span>
                          <span>•</span>
                          <span className="font-mono text-[10px] text-slate-400">{c.id}</span>
                        </div>
                      </td>

                      {/* Visa Status */}
                      <td className="py-4 px-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-black border whitespace-nowrap ${item.visaBadge}`}>
                          {item.visaStatus}
                        </span>
                      </td>

                      {/* Flight */}
                      <td className="py-4 px-4">
                        <div className="font-extrabold text-xs text-slate-900 flex items-center gap-1 whitespace-nowrap">
                          <Plane className="w-3.5 h-3.5 text-blue-600" />
                          <span>{item.flight}</span>
                        </div>
                      </td>

                      {/* Arrival ETA */}
                      <td className="py-4 px-4">
                        <div className="font-bold text-xs text-slate-800 flex items-center gap-1 whitespace-nowrap">
                          <Clock className="w-3 h-3 text-slate-400" />
                          <span>{item.arrival}</span>
                        </div>
                      </td>

                      {/* Hotel */}
                      <td className="py-4 px-4">
                        <div className="text-xs text-slate-700 font-medium truncate max-w-xs">{item.hotel}</div>
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
                            <span>Manage Itinerary</span>
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
