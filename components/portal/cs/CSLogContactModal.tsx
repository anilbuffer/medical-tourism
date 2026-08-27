"use client";

import React, { useState } from "react";
import {
  ClipboardList,
  Phone,
  MessageSquare,
  Mail,
  Calendar,
  Clock,
  CheckCircle2,
  X,
  User,
  ShieldCheck,
  Tag,
  AlertTriangle,
} from "lucide-react";
import { PatientCase } from "@/types/portal";
import { usePortal } from "@/lib/portal/store";

interface CSLogContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  patientCase: PatientCase;
}

export const CSLogContactModal: React.FC<CSLogContactModalProps> = ({
  isOpen,
  onClose,
  patientCase,
}) => {
  const { addCsNote, currentUser } = usePortal();

  const [channel, setChannel] = useState<"phone" | "whatsapp" | "email" | "video">("phone");
  const [outcome, setOutcome] = useState<string>("connected_docs_pending");
  const [summaryNote, setSummaryNote] = useState("");
  const [scheduleCallback, setScheduleCallback] = useState(false);
  const [callbackTime, setCallbackTime] = useState("Tomorrow 10:00 AM");
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!summaryNote.trim()) return;

    const channelLabels: Record<string, string> = {
      phone: "Phone Call",
      whatsapp: "WhatsApp Message",
      email: "Direct Email",
      video: "Video Consultation",
    };

    const outcomeLabels: Record<string, string> = {
      connected_docs_pending: "Connected: Missing Medical Docs Requested",
      connected_consult_agreed: "Connected: Tele-Consultation Scheduled",
      quote_reviewed: "Connected: Package Quote Presented",
      left_message: "Patient Unavailable: Left Detailed Message",
      callback_needed: `Callback Scheduled (${callbackTime})`,
      escalated_to_doctor: "Escalated to Hospital Super-Specialist",
    };

    const noteContent = `[Contact Log - ${channelLabels[channel]}] Outcome: ${
      outcomeLabels[outcome] || outcome
    }. Summary: ${summaryNote}${scheduleCallback ? ` (Follow-up Reminder: ${callbackTime})` : ""}`;

    addCsNote(patientCase.id, noteContent);
    setIsSaved(true);

    setTimeout(() => {
      onClose();
      setIsSaved(false);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-[130] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden border border-slate-200 flex flex-col animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#101955] to-[#1d2770] p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-[#2ECDC5] ring-1 ring-white/20">
              <ClipboardList className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base leading-tight">Log Patient Contact</h3>
              <p className="text-xs text-slate-300">
                Case: <strong className="text-white">{patientCase.patientName}</strong> ({patientCase.id})
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="p-6 space-y-4 flex-1 overflow-y-auto">
          {/* Channel Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">Communication Channel</label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { id: "phone", label: "Phone", icon: Phone },
                { id: "whatsapp", label: "WhatsApp", icon: MessageSquare },
                { id: "email", label: "Email", icon: Mail },
                { id: "video", label: "Video Call", icon: Calendar },
              ].map((item) => {
                const Icon = item.icon;
                const isSelected = channel === item.id;
                return (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => setChannel(item.id as any)}
                    className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-xs font-bold transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#101955] text-white border-[#101955] shadow-xs"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    <Icon className={`w-4 h-4 mb-1 ${isSelected ? "text-[#2ECDC5]" : "text-slate-500"}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Outcome Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Contact Outcome / Status</label>
            <select
              value={outcome}
              onChange={(e) => setOutcome(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 font-medium focus:ring-2 focus:ring-[#2ECDC5] focus:outline-none cursor-pointer"
            >
              <option value="connected_docs_pending">
                🟢 Spoke with Patient — Incomplete Medical Scans Requested
              </option>
              <option value="connected_consult_agreed">
                🟢 Spoke with Patient — Doctor Tele-Consultation Confirmed
              </option>
              <option value="quote_reviewed">
                🟢 Spoke with Patient — Package Quotation & Financials Explained
              </option>
              <option value="left_message">
                🟡 No Answer / Busy — Left Follow-up Message on WhatsApp & Email
              </option>
              <option value="callback_needed">🟡 Patient Requested Callback at Scheduled Time</option>
              <option value="escalated_to_doctor">
                🟣 Clinical Escalation to Hospital Surgical Evaluation Board
              </option>
            </select>
          </div>

          {/* Summary / Notes Field */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Discussion Notes & Key Action Items <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={3}
              required
              placeholder="e.g., Verified symptoms, patient confirmed having recent MRI disc. Advised on 14-day turnaround and hospital quote breakdown..."
              value={summaryNote}
              onChange={(e) => setSummaryNote(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:ring-2 focus:ring-[#2ECDC5] focus:outline-none resize-none"
            />
          </div>

          {/* Schedule Callback Toggle */}
          <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200 space-y-2">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={scheduleCallback}
                onChange={(e) => setScheduleCallback(e.target.checked)}
                className="rounded text-[#2ECDC5] focus:ring-[#2ECDC5] w-4 h-4 cursor-pointer"
              />
              <span className="text-xs font-bold text-slate-800">Set Follow-Up / Callback Reminder</span>
            </label>

            {scheduleCallback && (
              <div className="pt-2 animate-in fade-in">
                <input
                  type="text"
                  value={callbackTime}
                  onChange={(e) => setCallbackTime(e.target.value)}
                  placeholder="e.g. Tomorrow at 15:00 IST / 13:30 GST"
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:ring-2 focus:ring-[#2ECDC5] focus:outline-none"
                />
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="pt-2 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Logged by {currentUser?.name || "Care Coordinator"}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-[#101955] hover:bg-[#1a2770] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4 text-[#2ECDC5]" />
                <span>{isSaved ? "Saved!" : "Save Contact Log"}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
