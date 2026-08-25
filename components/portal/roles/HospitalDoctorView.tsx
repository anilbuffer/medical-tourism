"use client";

import React, { useState } from "react";
import { PatientCase, ConsultationOutcome } from "@/types/portal";
import { usePortal } from "@/lib/portal/store";
import {
  Stethoscope,
  Building2,
  Calendar,
  CheckCircle2,
  AlertCircle,
  XCircle,
  FileText,
  Video,
  Sparkles,
  ShieldCheck,
  Send,
  Activity,
} from "lucide-react";

interface HospitalDoctorViewProps {
  cases: PatientCase[];
  onSelectCase: (caseId: string) => void;
  activeCaseId: string;
}

export const HospitalDoctorView: React.FC<HospitalDoctorViewProps> = ({
  cases,
  onSelectCase,
  activeCaseId,
}) => {
  const { updateConsultationOutcome, currentUser } = usePortal();
  const activeCase = cases.find((c) => c.id === activeCaseId) || cases[0];

  const [outcome, setOutcome] = useState<ConsultationOutcome>("suitable");
  const [outcomeNotes, setOutcomeNotes] = useState(
    "Patient is an optimal candidate for TAVR. Right transfemoral approach indicated. Estimated hospital stay: 4 days."
  );
  const [redirectSpecialty, setRedirectSpecialty] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleOutcomeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeCase) return;
    setIsSaving(true);
    setTimeout(() => {
      updateConsultationOutcome(activeCase.id, outcome, outcomeNotes, redirectSpecialty);
      setIsSaving(false);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    }, 600);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#0E1F40] via-[#1F3160] to-indigo-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-400/20 text-indigo-300 text-xs font-bold tracking-wider uppercase mb-2 border border-indigo-400/30">
            <Stethoscope className="w-3.5 h-3.5" />
            Hospital & Doctor Specialist Workspace
          </div>
          <h2 className="text-2xl font-black tracking-tight">
            Assigned Clinical Consultations & Candidacy Review
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl">
            Logged in as <strong>{currentUser?.name || "Dr. Naresh Trehan"}</strong> • Hospital:{" "}
            <strong>Medanta - The Medicity</strong>. (Row-Level Security isolates only cases explicitly referred to this hospital).
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white/10 px-4 py-2.5 rounded-2xl border border-white/10 text-xs font-bold">
          <Building2 className="w-4 h-4 text-teal-300" />
          <span>{cases.length} Assigned Cases</span>
        </div>
      </div>

      {/* Grid: Cases & Specialist Desk */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Col: Assigned Cases */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 space-y-3">
          <h3 className="font-extrabold text-slate-900 text-sm pb-3 border-b border-slate-100">
            Assigned Surgical Cases
          </h3>

          <div className="space-y-2">
            {cases.map((c) => {
              const isSelected = c.id === activeCaseId;
              return (
                <button
                  key={c.id}
                  onClick={() => onSelectCase(c.id)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all ${
                    isSelected
                      ? "bg-indigo-950 text-white border-indigo-950 shadow-md"
                      : "bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-indigo-300">{c.id}</span>
                    <span
                      className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded ${
                        isSelected ? "bg-white/20 text-white" : "bg-indigo-100 text-indigo-800"
                      }`}
                    >
                      {c.stage}
                    </span>
                  </div>
                  <div className="font-black text-sm mt-1">{c.patientName}</div>
                  <div className={`text-xs truncate ${isSelected ? "text-slate-300" : "text-slate-500"}`}>
                    {c.clinicalSummary.recommendedProcedure || c.treatmentCategory}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right 2 Cols: Clinical Recommendation Form */}
        {activeCase && (
          <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-mono font-bold text-indigo-700">{activeCase.id}</span>
                <h3 className="text-xl font-black text-slate-900">{activeCase.patientName}</h3>
                <div className="text-xs text-slate-500 mt-0.5">
                  Age/Gender: 68Y / F • Country: {activeCase.patientCountry}
                </div>
              </div>

              {savedSuccess && (
                <div className="p-2 px-3 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1.5 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Clinical Outcome Saved!</span>
                </div>
              )}
            </div>

            {/* Diagnostic Imaging Gallery */}
            <div className="space-y-3">
              <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                <Activity className="w-4 h-4 text-indigo-600" />
                <span>Uploaded Medical Scans & DICOM Data</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeCase.documents.map((d) => (
                  <div key={d.id} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs">
                    <div className="font-bold text-slate-900 truncate">{d.title}</div>
                    <div className="text-slate-500 text-[11px] mt-0.5">
                      Ver {d.currentVersion} • {d.versions[0]?.fileSize}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Clinical Outcome Form */}
            <form onSubmit={handleOutcomeSubmit} className="space-y-4 pt-2 border-t border-slate-100">
              <h4 className="font-extrabold text-slate-900 text-sm">
                Record Clinical Suitability & Second Opinion
              </h4>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Consultation Outcome Decision *
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setOutcome("suitable")}
                    className={`p-3 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 ${
                      outcome === "suitable"
                        ? "bg-emerald-600 text-white border-emerald-600"
                        : "bg-slate-50 text-slate-700 border-slate-200"
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Suitable for Surgery</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setOutcome("needs_more_info")}
                    className={`p-3 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 ${
                      outcome === "needs_more_info"
                        ? "bg-amber-600 text-white border-amber-600"
                        : "bg-slate-50 text-slate-700 border-slate-200"
                    }`}
                  >
                    <AlertCircle className="w-4 h-4" />
                    <span>Needs More Scans</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setOutcome("not_suitable")}
                    className={`p-3 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 ${
                      outcome === "not_suitable"
                        ? "bg-rose-600 text-white border-rose-600"
                        : "bg-slate-50 text-slate-700 border-slate-200"
                    }`}
                  >
                    <XCircle className="w-4 h-4" />
                    <span>Not Suitable</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Doctor&apos;s Clinical Assessment & Surgical Protocol *
                </label>
                <textarea
                  rows={3}
                  required
                  value={outcomeNotes}
                  onChange={(e) => setOutcomeNotes(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:bg-white"
                />
              </div>

              {outcome === "not_suitable" && (
                <div>
                  <label className="block text-xs font-bold text-rose-800 mb-1">
                    Redirect Specialty or Alternative Recommendation
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Recommend Medical Management or Non-Invasive Cardiac Rehab"
                    value={redirectSpecialty}
                    onChange={(e) => setRedirectSpecialty(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900"
                  />
                </div>
              )}

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs shadow-md transition-all flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Publish Specialist Evaluation</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
