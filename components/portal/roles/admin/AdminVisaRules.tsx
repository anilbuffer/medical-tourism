"use client";

import React, { useState } from "react";
import { VisaChecklistRule, AdminTab } from "@/types/portal";
import { MOCK_VISA_CHECKLIST_RULES } from "@/lib/portal/mockData";
import {
  Globe,
  Plane,
  CheckCircle2,
  AlertTriangle,
  Plus,
  Edit2,
  Trash2,
  X,
  FileText,
  Clock,
  ShieldAlert,
} from "lucide-react";

interface AdminVisaRulesProps {
  onNavigateTab?: (tab: AdminTab) => void;
}

export const AdminVisaRules: React.FC<AdminVisaRulesProps> = ({ onNavigateTab }) => {
  const [rules, setRules] = useState<VisaChecklistRule[]>(MOCK_VISA_CHECKLIST_RULES);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newCountry, setNewCountry] = useState("");
  const [newDocName, setNewDocName] = useState("");
  const [newDocMandatory, setNewDocMandatory] = useState(true);
  const [newDocNote, setNewDocNote] = useState("");

  const handleAddRule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCountry || !newDocName) return;

    const existingIndex = rules.findIndex(
      (r) => r.patientHomeCountry.toLowerCase() === newCountry.toLowerCase()
    );

    if (existingIndex >= 0) {
      // Add document to existing country
      const updated = [...rules];
      updated[existingIndex].requiredDocuments.push({
        name: newDocName,
        mandatory: newDocMandatory,
        note: newDocNote || undefined,
      });
      updated[existingIndex].lastUpdatedAt = new Date().toISOString();
      setRules(updated);
    } else {
      // New country rule
      const newRule: VisaChecklistRule = {
        id: `visa_rule_${Date.now()}`,
        patientHomeCountry: newCountry,
        requiredDocuments: [
          { name: newDocName, mandatory: newDocMandatory, note: newDocNote || undefined },
          { name: "Valid Passport (Minimum 6 months validity)", mandatory: true },
          { name: "Official Hospital Medical Visa Invitation (FRRO)", mandatory: true },
        ],
        lastUpdatedAt: new Date().toISOString(),
      };
      setRules((prev) => [newRule, ...prev]);
    }

    setIsAddModalOpen(false);
    setNewCountry("");
    setNewDocName("");
    setNewDocNote("");
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
            Medical Visa & Travel Checklist Rules Engine
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Configurable mandatory entry documents, FRRO compliance letters, and embassy guidelines per patient origin country.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0 flex-wrap">
          {onNavigateTab && (
            <>
              <button
                onClick={() => onNavigateTab("consent_versioning")}
                className="px-3.5 py-2.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-[#1baba4] text-xs font-bold border border-teal-200 flex items-center gap-1.5 cursor-pointer transition-colors shadow-xs"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Consent Engine</span>
              </button>
              <button
                onClick={() => onNavigateTab("refund_escrow_rules")}
                className="px-3.5 py-2.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-800 text-xs font-bold border border-purple-200 flex items-center gap-1.5 cursor-pointer transition-colors shadow-xs"
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Refund Rules</span>
              </button>
            </>
          )}
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#1d8983] via-[#1baba4] to-[#1d8983] text-white font-extrabold text-xs flex items-center gap-2 cursor-pointer shadow-md hover:scale-105 transition-all"
          >
            <Plus className="w-4 h-4" />
            Add Country Requirement
          </button>
        </div>
      </div>

      {/* Rules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {rules.map((rule) => (
          <div
            key={rule.id}
            className="bg-white/95 rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#3F4EB4] flex items-center justify-center font-bold">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-black text-slate-900 text-sm">{rule.patientHomeCountry}</h3>
                  <span className="text-[10px] text-slate-400">
                    Updated: {new Date(rule.lastUpdatedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <span className="text-[10px] font-black bg-teal-50 text-teal-800 border border-teal-200 px-2 py-0.5 rounded-full">
                {rule.requiredDocuments.filter((d) => d.mandatory).length} Mandatory Docs
              </span>
            </div>

            {/* Checklist Items */}
            <div className="space-y-2 text-xs">
              {rule.requiredDocuments.map((doc, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-xl bg-slate-50 border border-slate-150 flex items-start justify-between gap-3"
                >
                  <div className="flex items-start gap-2 min-w-0">
                    {doc.mandatory ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <div className="font-bold text-slate-800 text-xs">
                        {doc.name}{" "}
                        {doc.mandatory && (
                          <span className="text-rose-600 text-[10px] font-black">*Required</span>
                        )}
                      </div>
                      {doc.note && <div className="text-[11px] text-slate-500 mt-0.5">{doc.note}</div>}
                    </div>
                  </div>

                  <span
                    className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${
                      doc.mandatory ? "bg-rose-50 text-rose-700" : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {doc.mandatory ? "Mandatory" : "Optional"}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-slate-400" />
                Avg Embassy Turnaround: <strong>48-72 Hours</strong>
              </span>
              <button
                onClick={() => {
                  setNewCountry(rule.patientHomeCountry);
                  setIsAddModalOpen(true);
                }}
                className="text-[#3F4EB4] font-bold hover:underline cursor-pointer"
              >
                + Add Document
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Document / Country Rule Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-black text-slate-900">Add Visa Document Rule</h3>
                <p className="text-xs text-slate-500">Configure entry document requirements by country.</p>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-xl text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddRule} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Patient Origin Country</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Nigeria, Saudi Arabia, Australia"
                  value={newCountry}
                  onChange={(e) => setNewCountry(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-[#2ECDC5] focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Required Document Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Yellow Fever Vaccination Certificate"
                  value={newDocName}
                  onChange={(e) => setNewDocName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-[#2ECDC5] focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Guideline Note (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Must be taken at least 10 days prior to travel departure"
                  value={newDocNote}
                  onChange={(e) => setNewDocNote(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-[#2ECDC5] focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="mandatoryToggle"
                  checked={newDocMandatory}
                  onChange={(e) => setNewDocMandatory(e.target.checked)}
                  className="rounded text-[#3F4EB4] focus:ring-[#2ECDC5] cursor-pointer"
                />
                <label htmlFor="mandatoryToggle" className="text-xs font-bold text-slate-800 cursor-pointer">
                  Mandatory for Travel Clearance (Blocks Stage Transition if missing)
                </label>
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
                  Save Rule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
