"use client";

import React, { useState } from "react";
import { PatientCase, RecoveryCheckIn } from "@/types/portal";
import { usePortal } from "@/lib/portal/store";
import {
  HeartHandshake,
  Activity,
  FileCheck,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Download,
  Sparkles,
  ShieldCheck,
  Send,
  Sliders,
  ChevronRight,
} from "lucide-react";

interface PostTreatmentTabProps {
  patientCase: PatientCase;
}

export const PostTreatmentTab: React.FC<PostTreatmentTabProps> = ({ patientCase }) => {
  const { submitRecoveryReport } = usePortal();

  // Recovery Check-in Form State
  const [daysPostOp, setDaysPostOp] = useState(3);
  const [painLevel, setPainLevel] = useState(2);
  const [mobilityStatus, setMobilityStatus] = useState<RecoveryCheckIn["mobilityStatus"]>(
    "walking_independently"
  );
  const [incisionHealing, setIncisionHealing] = useState<RecoveryCheckIn["incisionHealing"]>(
    "clean_dry"
  );
  const [feverReported, setFeverReported] = useState(false);
  const [medicationAdherence, setMedicationAdherence] =
    useState<RecoveryCheckIn["medicationAdherence"]>("taking_as_prescribed");
  const [patientNotes, setPatientNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const handleSubmitCheckin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      submitRecoveryReport(patientCase.id, {
        daysPostOp,
        painLevel,
        mobilityStatus,
        incisionHealing,
        feverReported,
        medicationAdherence,
        patientNotes: patientNotes || "Recovering smoothly at hotel/home.",
      });

      setIsSubmitting(false);
      setSubmittedSuccess(true);
      setTimeout(() => setSubmittedSuccess(false), 4000);
    }, 600);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold tracking-wider uppercase mb-2 border border-emerald-100">
            <HeartHandshake className="w-3.5 h-3.5" />
            6-Month Longitudinal Care Protocol
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Post-Treatment Recovery & Discharge Vault
          </h2>
          <p className="text-slate-500 text-sm mt-1 max-w-xl">
            Access hospital discharge summaries, scheduled cross-border tele-followup dates, and log patient-reported recovery indicators for coordinator review.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-50 px-4 py-2.5 rounded-2xl border border-slate-200 text-xs font-bold text-slate-700">
          <ShieldCheck className="w-4 h-4 text-teal-600" />
          <span>Post-Op Care Desk Active</span>
        </div>
      </div>

      {/* Grid: Discharge Documents & Tele-Followups */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Discharge Vault */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-slate-100 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-teal-600" />
              <span>Official Hospital Discharge Vault</span>
            </h3>
            <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              Verified
            </span>
          </div>

          <div className="space-y-3">
            {[
              {
                title: "Complete Hospital Discharge Summary & Operative Report",
                meta: "Issued by Medanta Cardiac Center • Signed by Dr. Trehan",
                size: "4.8 MB PDF",
              },
              {
                title: "30-Day Medication Prescription & Tapering Schedule",
                meta: "Aspirin 75mg, Clopidogrel 75mg, Atorvastatin 20mg",
                size: "1.2 MB PDF",
              },
              {
                title: "Post-Procedure Echocardiogram Baseline Video Report",
                meta: "Post-TAVR valve gradient 9 mmHg (Optimal outcome)",
                size: "18.4 MB DICOM",
              },
            ].map((d, i) => (
              <div
                key={i}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3"
              >
                <div>
                  <div className="text-xs font-bold text-slate-900">{d.title}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{d.meta}</div>
                </div>
                <button className="p-2 rounded-xl bg-white hover:bg-slate-100 text-teal-700 border border-slate-200 shadow-sm shrink-0">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Scheduled Follow-up Milestones */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-slate-100 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
              <Calendar className="w-5 h-5 text-indigo-600" />
              <span>Cross-Border Tele-Followup Schedule</span>
            </h3>
            <span className="text-xs text-indigo-700 font-bold bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200">
              3 Slots Reserved
            </span>
          </div>

          <div className="space-y-3">
            {[
              {
                label: "Day 7 Early Recovery Tele-Check",
                date: "7 Days Post-Discharge",
                status: "Upcoming",
                desc: "Incision review with surgical nursing officer via HD video.",
              },
              {
                label: "Day 30 Surgeon Outcome Review",
                date: "30 Days Post-Discharge",
                status: "Scheduled",
                desc: "Direct follow-up with Dr. Naresh Trehan to assess exercise tolerance.",
              },
              {
                label: "Day 90 Long-Term Valve Calibration",
                date: "90 Days Post-Discharge",
                status: "Scheduled",
                desc: "Remote review of home-country Doppler Echo loop.",
              },
            ].map((f, i) => (
              <div
                key={i}
                className="p-4 rounded-2xl bg-indigo-50/40 border border-indigo-100 flex items-start justify-between gap-3"
              >
                <div>
                  <div className="text-xs font-bold text-slate-900">{f.label}</div>
                  <div className="text-[11px] text-indigo-700 font-semibold mt-0.5">{f.date}</div>
                  <p className="text-[11px] text-slate-500 mt-1">{f.desc}</p>
                </div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 shrink-0">
                  {f.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Patient-Reported Recovery Check-In Form */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <Activity className="w-5 h-5 text-teal-600" />
              <span>Patient-Reported Recovery Check-In</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Structured self-reported recovery metrics. (Note: For emergency care, contact coordinator Aisha directly).
            </p>
          </div>

          {submittedSuccess && (
            <div className="p-2 px-3 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1.5 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Check-in submitted & logged!</span>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmitCheckin} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Days Post-Op */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Days Post-Discharge / Op
              </label>
              <input
                type="number"
                min={0}
                max={180}
                value={daysPostOp}
                onChange={(e) => setDaysPostOp(parseInt(e.target.value, 10))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold text-slate-900 focus:bg-white"
              />
            </div>

            {/* Pain Scale (1-10) */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold text-slate-700">Pain Level (1 - 10)</label>
                <span className="text-xs font-black text-teal-700">{painLevel} / 10</span>
              </div>
              <input
                type="range"
                min={1}
                max={10}
                value={painLevel}
                onChange={(e) => setPainLevel(parseInt(e.target.value, 10))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-semibold">
                <span>1 (Mild)</span>
                <span>5 (Moderate)</span>
                <span>10 (Severe)</span>
              </div>
            </div>

            {/* Mobility */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Current Mobility
              </label>
              <select
                value={mobilityStatus}
                onChange={(e) => setMobilityStatus(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-semibold text-slate-900 focus:bg-white"
              >
                <option value="walking_independently">Walking independently without aid</option>
                <option value="walking_assisted">Walking with assistance / cane</option>
                <option value="bedrest">Resting in bed / light sitting</option>
                <option value="full_normal">Full normal mobility resumed</option>
              </select>
            </div>

            {/* Incision Healing */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Incision Site Condition
              </label>
              <select
                value={incisionHealing}
                onChange={(e) => setIncisionHealing(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-semibold text-slate-900 focus:bg-white"
              >
                <option value="clean_dry">Clean, dry & healing normally</option>
                <option value="slight_redness">Slight redness around edges</option>
                <option value="swelling">Mild localized swelling</option>
                <option value="discharge_noted">Discharge noted (Coordinator notified)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Medication Adherence
              </label>
              <select
                value={medicationAdherence}
                onChange={(e) => setMedicationAdherence(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-semibold text-slate-900 focus:bg-white"
              >
                <option value="taking_as_prescribed">Taking all medications on schedule</option>
                <option value="missed_doses">Missed occasional dose</option>
                <option value="side_effects_felt">Experienced mild side effects</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Any fever or elevated temperature?
              </label>
              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setFeverReported(false)}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                    !feverReported
                      ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                      : "bg-slate-50 text-slate-600 border-slate-200"
                  }`}
                >
                  No Fever (&lt; 37.5°C)
                </button>
                <button
                  type="button"
                  onClick={() => setFeverReported(true)}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                    feverReported
                      ? "bg-rose-50 text-rose-800 border-rose-300"
                      : "bg-slate-50 text-slate-600 border-slate-200"
                  }`}
                >
                  Yes, Fever Reported
                </button>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Patient Recovery Notes / Symptoms
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Feeling good energy today, took a 15-minute gentle walk in hotel lobby."
              value={patientNotes}
              onChange={(e) => setPatientNotes(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#0E1F40] to-[#0A8982] hover:from-[#132A56] hover:to-[#0C9F97] text-white font-extrabold text-xs shadow-md transition-all flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Logging Recovery Data...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Today&apos;s Recovery Check-In</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Previous Check-In Log */}
        {patientCase.recoveryCheckIns.length > 0 && (
          <div className="pt-4 border-t border-slate-100 space-y-3">
            <h4 className="font-extrabold text-slate-900 text-sm">Past Check-In History</h4>
            <div className="space-y-2">
              {patientCase.recoveryCheckIns.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 bg-slate-50 rounded-2xl text-xs flex items-center justify-between gap-3 border border-slate-200"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-slate-900">Day {item.daysPostOp}</span>
                    <span className="text-slate-500">
                      Pain: <strong>{item.painLevel}/10</strong>
                    </span>
                    <span className="text-slate-500">Mobility: {item.mobilityStatus.replace("_", " ")}</span>
                    <span className="text-slate-600 italic truncate max-w-xs">
                      &quot;{item.patientNotes}&quot;
                    </span>
                  </div>
                  <div className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Coordinator Acknowledged</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
