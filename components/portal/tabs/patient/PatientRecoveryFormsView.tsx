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
  Smile,
  Meh,
  Frown,
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
      patientNotes: notes || "Pre-trip health update submitted. Feeling well.",
      coordinatorReply: "Care team acknowledged your daily report.",
    });
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 4000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2ECDC5]/10 text-[#3F4EB4] text-xs font-extrabold uppercase tracking-wider mb-2 border border-[#2ECDC5]/20">
            <Activity className="w-3.5 h-3.5 text-[#2ECDC5]" />
            Daily Health Check
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Daily Recovery Check-in
          </h2>
          <p className="text-slate-500 text-sm mt-1 max-w-xl">
            A quick 1-minute daily update so your care coordinator and doctor can track how you are feeling.
          </p>
        </div>

        <span className="px-4 py-2 rounded-2xl text-xs font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4" />
          <span>Care Team Connected</span>
        </span>
      </div>

      {/* Form Container */}
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] space-y-6">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-base font-extrabold text-slate-900">How are you feeling today?</h3>
          <p className="text-xs text-slate-500">
            Your answers are reviewed by Care Coordinator Ananya Sharma and Dr. Gupta's nursing team.
          </p>
        </div>

        {isSubmitted && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 text-emerald-900 text-xs font-bold animate-in fade-in">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>Thank you! Your daily check-in has been sent directly to Ananya Sharma.</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 text-xs">
          {/* Pain Rating */}
          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-slate-900 font-extrabold text-sm">
                Pain or Discomfort Level: <span className="text-[#3F4EB4]">{painLevel} of 10</span>
              </label>
              <div className="flex items-center gap-1 text-slate-500 text-xs font-bold">
                {painLevel <= 3 ? (
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <Smile className="w-4 h-4" /> Mild / Comfortable
                  </span>
                ) : painLevel <= 6 ? (
                  <span className="text-amber-700 font-bold flex items-center gap-1">
                    <Meh className="w-4 h-4" /> Moderate
                  </span>
                ) : (
                  <span className="text-rose-700 font-bold flex items-center gap-1">
                    <Frown className="w-4 h-4" /> Significant
                  </span>
                )}
              </div>
            </div>

            <input
              type="range"
              min="0"
              max="10"
              value={painLevel}
              onChange={(e) => setPainLevel(Number(e.target.value))}
              className="w-full accent-[#2ECDC5] cursor-pointer h-2 bg-slate-200 rounded-lg"
            />
            <div className="flex justify-between text-[11px] text-slate-400 font-semibold">
              <span>0 (No Pain)</span>
              <span>5 (Manageable)</span>
              <span>10 (Severe Pain)</span>
            </div>
          </div>

          {/* Mobility & Wound Healing */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-slate-800 font-extrabold block mb-1.5">How is your walking and movement?</label>
              <select
                value={mobility}
                onChange={(e: any) => setMobility(e.target.value)}
                className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-900 font-bold focus:outline-none focus:border-[#2ECDC5]"
              >
                <option value="walking_independently">Walking independently & easily</option>
                <option value="walking_assisted">Walking with assistance / cane</option>
                <option value="bedrest">Resting mostly in bed / sitting</option>
                <option value="full_normal">Full normal daily energy</option>
              </select>
            </div>

            <div>
              <label className="text-slate-800 font-extrabold block mb-1.5">Wound or Incision Condition</label>
              <select
                value={incision}
                onChange={(e: any) => setIncision(e.target.value)}
                className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-900 font-bold focus:outline-none focus:border-[#2ECDC5]"
              >
                <option value="clean_dry">Clean, dry, and healing normally</option>
                <option value="slight_redness">Mild redness / minor tightness</option>
                <option value="swelling">Localized swelling or discomfort</option>
                <option value="discharge_noted">Fluid discharge noted (Request review)</option>
              </select>
            </div>
          </div>

          {/* Medicines taken */}
          <div>
            <label className="text-slate-800 font-extrabold block mb-1.5">Did you take all your medicines today?</label>
            <select
              value={adherence}
              onChange={(e: any) => setAdherence(e.target.value)}
              className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-900 font-bold focus:outline-none focus:border-[#2ECDC5]"
            >
              <option value="taking_as_prescribed">Yes, took all prescribed medicines on time</option>
              <option value="missed_doses">Missed one dose today</option>
              <option value="side_effects_felt">Experienced mild nausea / dizziness</option>
            </select>
          </div>

          {/* Any other notes */}
          <div>
            <label className="text-slate-800 font-extrabold block mb-1.5">
              Any message or question for your coordinator? (Optional)
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Slept well last night, feeling energized."
              className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-900 font-medium focus:outline-none focus:border-[#2ECDC5]"
            />
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-[#1d8983] via-[#1baba4] to-[#1d8983] text-white font-black text-xs shadow-lg shadow-[#283593]/20 hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>Send Today's Update</span>
          </button>
        </form>
      </div>
    </div>
  );
};
