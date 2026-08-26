"use client";

import React, { useState } from "react";
import { ConsentTextVersion, ConsentType, AdminTab } from "@/types/portal";
import { MOCK_CONSENT_TEXT_VERSIONS } from "@/lib/portal/mockData";
import {
  FileText,
  Globe,
  Plus,
  CheckCircle2,
  AlertTriangle,
  History,
  Eye,
  X,
  UploadCloud,
  FileCheck2,
  Plane,
  BadgeCheck,
} from "lucide-react";

interface AdminConsentVersioningProps {
  onNavigateTab?: (tab: AdminTab) => void;
}

export const AdminConsentVersioning: React.FC<AdminConsentVersioningProps> = ({ onNavigateTab }) => {
  const [versions, setVersions] = useState<ConsentTextVersion[]>(MOCK_CONSENT_TEXT_VERSIONS);
  const [selectedCountry, setSelectedCountry] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [previewVersion, setPreviewVersion] = useState<ConsentTextVersion | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const [newType, setNewType] = useState<ConsentType>("privacy_data_processing");
  const [newCountry, setNewCountry] = useState("United States");
  const [newVersionTag, setNewVersionTag] = useState("v3.0");
  const [newText, setNewText] = useState("");

  const filteredVersions = versions.filter((v) => {
    const matchesCountry = selectedCountry === "all" || v.country === selectedCountry;
    const matchesType = selectedType === "all" || v.consentType === selectedType;
    return matchesCountry && matchesType;
  });

  const handleToggleActive = (id: string) => {
    setVersions((prev) =>
      prev.map((v) => (v.id === id ? { ...v, isActive: !v.isActive } : v))
    );
  };

  const handleUploadVersion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVersionTag || !newText) return;

    const newEntry: ConsentTextVersion = {
      id: `ctv_${Date.now()}`,
      consentType: newType,
      country: newCountry,
      version: newVersionTag,
      text: newText,
      uploadedAt: new Date().toISOString(),
      uploadedByName: "Rajesh Verma (Super Admin)",
      isActive: true,
    };

    setVersions((prev) => [newEntry, ...prev]);
    setIsUploadModalOpen(false);
    setNewText("");
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
            Dynamic Consent Versioning & Multi-Jurisdiction Engine
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage GDPR, HIPAA, UAE MoH, and India DPDP consent texts with immutable revision tracking and per-country overrides.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0 flex-wrap">
          {onNavigateTab && (
            <>
              <button
                onClick={() => onNavigateTab("visa_rules")}
                className="px-3.5 py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#3F4EB4] text-xs font-bold border border-blue-200 flex items-center gap-1.5 cursor-pointer transition-colors shadow-xs"
              >
                <Plane className="w-3.5 h-3.5" />
                <span>Visa Rules</span>
              </button>
              <button
                onClick={() => onNavigateTab("accreditation_registry")}
                className="px-3.5 py-2.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-[#1baba4] text-xs font-bold border border-teal-200 flex items-center gap-1.5 cursor-pointer transition-colors shadow-xs"
              >
                <BadgeCheck className="w-3.5 h-3.5" />
                <span>Accreditation Registry</span>
              </button>
            </>
          )}
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#1d8983] via-[#1baba4] to-[#1d8983] text-white font-extrabold text-xs flex items-center gap-2 cursor-pointer shadow-md hover:scale-105 transition-all"
          >
            <Plus className="w-4 h-4" />
            Publish New Version
          </button>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="bg-white/95 rounded-2xl border border-slate-200 shadow-sm p-4 flex flex-col sm:flex-row gap-3">
        <div className="flex-1 flex gap-2 flex-wrap">
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 font-bold focus:ring-2 focus:ring-[#2ECDC5] focus:outline-none cursor-pointer"
          >
            <option value="all">All Jurisdictions / Countries</option>
            <option value="United Kingdom">United Kingdom (GDPR / NHS Data)</option>
            <option value="United States">United States (HIPAA / HITECH)</option>
            <option value="United Arab Emirates">United Arab Emirates (MoHAP)</option>
            <option value="Global">Global / Default Jurisdiction</option>
          </select>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 font-bold focus:ring-2 focus:ring-[#2ECDC5] focus:outline-none cursor-pointer"
          >
            <option value="all">All Consent Types</option>
            <option value="privacy_data_processing">Privacy & Data Processing</option>
            <option value="hospital_document_sharing">Hospital Record Sharing</option>
            <option value="tele_consultation_terms">Tele-Consultation Terms</option>
            <option value="surgical_travel_risk">Surgical Travel & Risk Disclosure</option>
          </select>
        </div>
      </div>

      {/* Version Table */}
      <div className="bg-white/95 rounded-2xl border border-slate-200 shadow-sm overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-slate-100 text-slate-400 uppercase text-[10px] font-black tracking-wider bg-slate-50/50">
              <th className="py-3.5 pl-5 text-left">Consent Clause / Type</th>
              <th className="py-3.5 text-left">Jurisdiction</th>
              <th className="py-3.5 text-left">Version</th>
              <th className="py-3.5 text-left">Effective Date</th>
              <th className="py-3.5 text-left">Uploaded By</th>
              <th className="py-3.5 text-left">Status</th>
              <th className="py-3.5 pr-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {filteredVersions.map((v) => (
              <tr key={v.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="py-4 pl-5">
                  <div className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-[#3F4EB4]" />
                    {(v.consentType || "CONSENT").replace(/_/g, " ").toUpperCase()}
                  </div>
                </td>

                <td className="py-4">
                  <span className="font-bold text-slate-800 flex items-center gap-1">
                    <Globe className="w-3 h-3 text-slate-400" />
                    {v.country}
                  </span>
                </td>

                <td className="py-4">
                  <span className="font-mono font-black text-xs text-[#3F4EB4] bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                    {v.version}
                  </span>
                </td>

                <td className="py-4 text-slate-600">
                  {new Date(v.uploadedAt).toLocaleDateString("en-US")}
                </td>

                <td className="py-4 text-slate-600 font-semibold">{v.uploadedByName}</td>

                <td className="py-4">
                  <button
                    onClick={() => handleToggleActive(v.id)}
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black border cursor-pointer transition-all ${
                      v.isActive
                        ? "bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100"
                        : "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200"
                    }`}
                  >
                    {v.isActive ? (
                      <>
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Active Enforced
                      </>
                    ) : (
                      "Archived Draft"
                    )}
                  </button>
                </td>

                <td className="py-4 pr-5 text-right">
                  <button
                    onClick={() => setPreviewVersion(v)}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] cursor-pointer transition-colors"
                  >
                    Preview Clause
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Preview Modal */}
      {previewVersion && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-black text-slate-900">
                  {(previewVersion.consentType || "CONSENT").replace(/_/g, " ").toUpperCase()} ({previewVersion.version})
                </h3>
                <span className="text-xs text-slate-500">Jurisdiction: {previewVersion.country}</span>
              </div>
              <button
                onClick={() => setPreviewVersion(null)}
                className="p-1 rounded-xl text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-800 leading-relaxed max-h-72 overflow-y-auto whitespace-pre-wrap font-serif">
              {previewVersion.text}
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-[11px] text-slate-500">Uploaded by: {previewVersion.uploadedByName}</span>
              <button
                onClick={() => setPreviewVersion(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-black text-slate-900">Publish New Legal Consent Clause</h3>
                <p className="text-xs text-slate-500">Increment revision version tag and publish live.</p>
              </div>
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="p-1 rounded-xl text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUploadVersion} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Consent Clause Type</label>
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value as ConsentType)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-bold focus:ring-2 focus:ring-[#2ECDC5] focus:outline-none cursor-pointer"
                >
                  <option value="privacy_data_processing">Privacy & Data Processing</option>
                  <option value="hospital_document_sharing">Hospital Record Sharing</option>
                  <option value="tele_consultation_terms">Tele-Consultation Terms</option>
                  <option value="surgical_travel_risk">Surgical Travel & Risk Disclosure</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Jurisdiction</label>
                  <input
                    type="text"
                    required
                    value={newCountry}
                    onChange={(e) => setNewCountry(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:ring-2 focus:ring-[#2ECDC5] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Version Tag</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. v3.1"
                    value={newVersionTag}
                    onChange={(e) => setNewVersionTag(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 font-mono focus:ring-2 focus:ring-[#2ECDC5] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Legal Text Clause</label>
                <textarea
                  rows={5}
                  required
                  placeholder="Enter full legal consent clause markdown or plain text..."
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:ring-2 focus:ring-[#2ECDC5] focus:outline-none font-mono"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#1d8983] via-[#1baba4] to-[#1d8983] text-white font-extrabold text-xs shadow-md cursor-pointer hover:scale-105 transition-all"
                >
                  Publish & Enforce
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
