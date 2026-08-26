"use client";

import React, { useState } from "react";
import {
  HeartHandshake,
  Activity,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Send,
  Calendar,
  Clock,
  ShieldCheck,
} from "lucide-react";
import { PatientCase } from "@/types/portal";
import { usePortal } from "@/lib/portal/store";

interface PatientRecoveryFormsViewProps {
  patientCase: PatientCase;
}

export const PatientRecoveryFormsView: React.FC<PatientRecoveryFormsViewProps> = ({
  patientCase,
}) => {
  const { submitRecoveryReport } = usePortal();
  const [painLevel, setPainLevel] = useState<number>(1);
  const [mobility, setMobility] = useState<
    "bedrest" | "walking_assisted" | "walking_independently" | "full_normal"
  >("walking_independently");
  const [incision, setIncision] = useState<
    "clean_dry" | "slight_redness" | "discharge_noted" | "swelling"
  >("clean_dry");
  const [fever, setFever] = useState(false);
  const [adherence, setAdherence] = useState<
    "taking_as_prescribed" | "missed_doses" | "side_effects_felt"
  >("taking_as_prescribed");
  const [notes, setNotes] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitRecoveryReport(patientCase.id, {
      daysPostOp: 0,
      painLevel,
      mobilityStatus: mobility,
      incisionHealing: incision,
      feverReported: fever,
      medicationAdherence: adherence,
      patientNotes: notes || "Pre-admission check-in recorded. Feeling prepared.",
      coordinatorReply: "Care team acknowledged your baseline report.",
    });
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2ECDC5]/10 text-[#3F4EB4] text-xs font-extrabold uppercase tracking-wider mb-2 border border-[#2ECDC5]/20">
            <Activity className="w-3.5 h-3.5 text-[#2ECDC5]" />
            Post-Op Remote Monitoring
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Structured Recovery Check-in Forms
          </h2>
          <p className="text-slate-500 text-sm mt-1 max-w-xl">
            Submit daily telemetry, vital signs, pain metrics, and medication adherence reports directly to Care Coordinator Ananya Sharma.
          </p>
        </div>

        <span className="px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4" />
          <span>Active Tele-Monitoring</span>
        </span>
      </div>

      {/* Form Container */}
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-base font-extrabold text-slate-900">Daily Health & Recovery Questionnaire</h3>
          <p className="text-xs text-slate-500">
            Reports are logged into your immutable patient audit trail and reviewed by the clinical triage desk.
          </p>
        </div>

        {isSubmitted && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 text-emerald-900 text-xs font-bold animate-in fade-in">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>Thank you! Your recovery report has been logged and sent to Care Coordinator Ananya Sharma.</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 text-xs">
          <div>
            <label className="text-slate-700 font-bold block mb-2">
              Pain Rating Level: <strong className="text-[#3F4EB4] text-sm">{painLevel} / 10</strong>
            </label>
            <input
              type="range"
              min="0"
              max="10"
              value={painLevel}
              onChange={(e) => setPainLevel(Number(e.target.value))}
              className="w-full accent-[#2ECDC5] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-medium mt-1">
              <span>0 (No Pain)</span>
              <span>5 (Moderate)</span>
              <span>10 (Severe)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-slate-700 font-bold block mb-1.5">Mobility Status</label>
              <select
                value={mobility}
                onChange={(e: any) => setMobility(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-900 font-bold"
              >
                <option value="walking_independently">Walking Independently</option>
                <option value="walking_assisted">Walking Assisted (Cane / Attendant)</option>
                <option value="bedrest">Bedrest / Restricted</option>
                <option value="full_normal">Full Normal Mobility</option>
              </select>
            </div>

            <div>
              <label className="text-slate-700 font-bold block mb-1.5">Wound / Incision Status</label>
              <select
                value={incision}
                onChange={(e: any) => setIncision(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-900 font-bold"
              >
                <option value="clean_dry">Clean & Dry (Normal Healing)</option>
                <option value="slight_redness">Slight Redness / Mild Swelling</option>
                <option value="discharge_noted">Fluid Discharge Noted (Reported)</option>
                <option value="swelling">Localized Swelling</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-slate-700 font-bold block mb-1.5">Medication Adherence</label>
              <select
                value={adherence}
                onChange={(e: any) => setAdherence(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-900 font-bold"
              >
                <option value="taking_as_prescribed">Taking All Medications as Prescribed</option>
                <option value="missed_doses">Missed Doses (Detail in notes)</option>
                <option value="side_effects_felt">Side Effects Felt (Consult Doctor)</option>
              </select>
            </div>

            <div>
              <label className="text-slate-700 font-bold block mb-1.5">Fever / Temperature Elevation</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setFever(false)}
                  className={`flex-1 p-3 rounded-2xl border text-xs font-bold transition-all cursor-pointer ${
                    !fever ? "bg-emerald-50 border-emerald-300 text-emerald-800" : "bg-slate-50 border-slate-200 text-slate-700"
                  }`}
                >
                  No Fever (&lt; 37.5°C)
                </button>
                <button
                  type="button"
                  onClick={() => setFever(true)}
                  className={`flex-1 p-3 rounded-2xl border text-xs font-bold transition-all cursor-pointer ${
                    fever ? "bg-rose-50 border-rose-300 text-rose-800" : "bg-slate-50 border-slate-200 text-slate-700"
                  }`}
                >
                  Fever (&ge; 38.0°C)
                </button>
              </div>
            </div>
          </div>

          <div>
            <label className="text-slate-700 font-bold block mb-1.5">Patient Notes & Symptoms</label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Describe your general wellness, appetite, or any questions for the care team..."
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-900 focus:outline-none focus:border-[#3F4EB4]"
            />
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#1d8983] via-[#1baba4] to-[#1d8983] text-white font-black text-xs shadow-lg shadow-[#283593]/20 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Submit Recovery Check-in</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
