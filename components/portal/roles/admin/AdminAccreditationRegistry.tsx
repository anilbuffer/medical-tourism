"use client";

import React, { useState } from "react";
import { AccreditationProfile } from "@/types/portal";
import { MOCK_ACCREDITATION_PROFILES } from "@/lib/portal/mockData";
import {
  BadgeCheck,
  Building2,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Upload,
  Plus,
  FileCheck,
  Clock,
  Shield,
  X,
  ExternalLink,
} from "lucide-react";

export const AdminAccreditationRegistry: React.FC = () => {
  const [profiles, setProfiles] = useState<AccreditationProfile[]>(MOCK_ACCREDITATION_PROFILES);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [hospitalName, setHospitalName] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("India");
  const [jciExpiry, setJciExpiry] = useState("2027-04-15");
  const [nabhExpiry, setNabhExpiry] = useState("2026-12-31");

  const getDaysUntilExpiry = (dateStr?: string) => {
    if (!dateStr) return null;
    const diff = new Date(dateStr).getTime() - Date.now();
    return Math.ceil(diff / (1000 * 3600 * 24));
  };

  const handleAddHospital = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hospitalName || !city) return;

    const newProfile: AccreditationProfile = {
      hospitalId: `hosp_${Date.now()}`,
      hospitalName,
      city,
      country,
      jciStatus: "active",
      jciExpiry,
      nabhStatus: "active",
      nabhExpiry,
      lastAuditedAt: new Date().toISOString().split("T")[0],
      specialties: ["Cardiology", "Oncology", "Orthopedics"],
    };

    setProfiles((prev) => [newProfile, ...prev]);
    setIsAddModalOpen(false);
    setHospitalName("");
    setCity("");
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#3F4EB4] bg-blue-50 px-2.5 py-0.5 rounded-full">
              Legal Engine • Domain 2
            </span>
          </div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight mt-1">
            Hospital Accreditation Registry & Expiry Tracker
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Monitor JCI, NABH, and CAP international certifications, renewal deadlines, and compliance audit certificates.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#1d8983] via-[#1baba4] to-[#1d8983] text-white font-extrabold text-xs flex items-center gap-2 cursor-pointer shadow-md hover:scale-105 transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          Register Partner Hospital
        </button>
      </div>

      {/* Expiry Overview Banners */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white/95 rounded-2xl p-4 border border-slate-200 shadow-xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold shrink-0">
            <BadgeCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-black text-slate-900">
              {profiles.filter((p) => p.jciStatus === "active").length} / {profiles.length} JCI Active
            </div>
            <div className="text-[11px] font-bold text-slate-500">Gold Seal of Quality</div>
          </div>
        </div>

        <div className="bg-white/95 rounded-2xl p-4 border border-slate-200 shadow-xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#2ECDC5] flex items-center justify-center font-bold shrink-0">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-black text-slate-900">
              {profiles.filter((p) => p.nabhStatus === "active").length} / {profiles.length} NABH Active
            </div>
            <div className="text-[11px] font-bold text-slate-500">National Healthcare Board</div>
          </div>
        </div>

        <div className="bg-white/95 rounded-2xl p-4 border border-slate-200 shadow-xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-black text-amber-900">1 Pending Renewal</div>
            <div className="text-[11px] font-bold text-slate-500">Renewal due in &lt; 90 days</div>
          </div>
        </div>
      </div>

      {/* Hospital Accreditation Cards */}
      <div className="space-y-4">
        {profiles.map((acc) => {
          const jciDays = getDaysUntilExpiry(acc.jciExpiry);
          const nabhDays = getDaysUntilExpiry(acc.nabhExpiry);

          return (
            <div
              key={acc.hospitalId}
              className="bg-white/95 rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div>
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-[#3F4EB4]" />
                    <h3 className="font-black text-slate-900 text-base">{acc.hospitalName}</h3>
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    {acc.city}, {acc.country} • Last audited on: <strong>{acc.lastAuditedAt || "2025-10-12"}</strong>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-2.5">
                    {acc.specialties.map((s) => (
                      <span
                        key={s}
                        className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer transition-colors flex items-center gap-1">
                    <Upload className="w-3.5 h-3.5" /> Upload Certificate
                  </button>
                </div>
              </div>

              {/* Badges Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-2">
                {/* JCI Box */}
                <div
                  className={`p-4 rounded-xl border ${
                    acc.jciStatus === "active"
                      ? "bg-emerald-50/70 border-emerald-200"
                      : acc.jciStatus === "pending_renewal"
                      ? "bg-amber-50/70 border-amber-200"
                      : "bg-rose-50/70 border-rose-200"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="font-extrabold text-slate-900 flex items-center gap-1.5">
                      <BadgeCheck className="w-4 h-4 text-emerald-700" />
                      Joint Commission International (JCI)
                    </div>
                    <span
                      className={`text-[10px] font-black px-2 py-0.5 rounded-full border ${
                        acc.jciStatus === "active"
                          ? "bg-emerald-100 text-emerald-900 border-emerald-300"
                          : acc.jciStatus === "pending_renewal"
                          ? "bg-amber-100 text-amber-900 border-amber-300"
                          : "bg-rose-100 text-rose-900 border-rose-300"
                      }`}
                    >
                      {acc.jciStatus === "active" ? "✓ Active Valid" : "⚠️ Renewal Due"}
                    </span>
                  </div>

                  <div className="mt-2 text-slate-700 flex items-center justify-between">
                    <span>Valid Until: <strong>{acc.jciExpiry || "2027-03-15"}</strong></span>
                    {jciDays && (
                      <span className="font-bold text-[11px] text-slate-500">
                        ({jciDays} days remaining)
                      </span>
                    )}
                  </div>
                </div>

                {/* NABH Box */}
                <div
                  className={`p-4 rounded-xl border ${
                    acc.nabhStatus === "active"
                      ? "bg-emerald-50/70 border-emerald-200"
                      : "bg-amber-50/70 border-amber-200"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="font-extrabold text-slate-900 flex items-center gap-1.5">
                      <Shield className="w-4 h-4 text-teal-700" />
                      National Accreditation Board (NABH)
                    </div>
                    <span
                      className={`text-[10px] font-black px-2 py-0.5 rounded-full border ${
                        acc.nabhStatus === "active"
                          ? "bg-emerald-100 text-emerald-900 border-emerald-300"
                          : "bg-amber-100 text-amber-900 border-amber-300"
                      }`}
                    >
                      {acc.nabhStatus === "active" ? "✓ Active Valid" : "Pending Audit"}
                    </span>
                  </div>

                  <div className="mt-2 text-slate-700 flex items-center justify-between">
                    <span>Valid Until: <strong>{acc.nabhExpiry || "2026-11-30"}</strong></span>
                    {nabhDays && (
                      <span className="font-bold text-[11px] text-slate-500">
                        ({nabhDays} days remaining)
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Partner Hospital Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-black text-slate-900">Register Partner Hospital</h3>
                <p className="text-xs text-slate-500">Add institution to JCI/NABH tracking registry.</p>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-xl text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddHospital} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Hospital Official Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Artemis Health Institute"
                  value={hospitalName}
                  onChange={(e) => setHospitalName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-[#2ECDC5] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">City</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Gurugram"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:ring-2 focus:ring-[#2ECDC5] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Country</label>
                  <input
                    type="text"
                    required
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:ring-2 focus:ring-[#2ECDC5] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">JCI Expiry Date</label>
                  <input
                    type="date"
                    required
                    value={jciExpiry}
                    onChange={(e) => setJciExpiry(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:ring-2 focus:ring-[#2ECDC5] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">NABH Expiry Date</label>
                  <input
                    type="date"
                    required
                    value={nabhExpiry}
                    onChange={(e) => setNabhExpiry(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:ring-2 focus:ring-[#2ECDC5] focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#1d8983] via-[#1baba4] to-[#1d8983] text-white font-extrabold text-xs shadow-md cursor-pointer hover:scale-105 transition-all"
                >
                  Save to Registry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
