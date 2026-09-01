"use client";

import React, { useState } from "react";
import {
  FileText,
  Send,
  X,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ShieldCheck,
  Building2,
  User,
  Clock,
} from "lucide-react";
import { usePortal } from "@/lib/portal/store";
import { PatientCase } from "@/types/portal";

interface RequestCsDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  patientCase: PatientCase;
  docTitle?: string;
  defaultNote?: string;
}

export const RequestCsDocumentModal: React.FC<RequestCsDocumentModalProps> = ({
  isOpen,
  onClose,
  patientCase,
  docTitle = "Blood_Work_Report.pdf",
  defaultNote = "Page 2 missing — please request patient re-upload viral serology (HBsAg, Anti-HCV) and INR coagulation panel before surgical evaluation.",
}) => {
  const { requestDocumentViaCs, currentUser } = usePortal();
  const [note, setNote] = useState(defaultNote);
  const [urgency, setUrgency] = useState<"urgent" | "standard">("urgent");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!note.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      requestDocumentViaCs(patientCase.id, docTitle, note.trim());
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 1500);
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-[130] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#141d60] via-[#1b2360] to-[#101e76] p-6 text-white relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-300 shadow-md">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-black tracking-wider uppercase text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded-full border border-amber-500/30">
                  Doctor ➔ CS Task Dispatch
                </span>
                <h3 className="font-extrabold text-base text-white mt-1">
                  Request Missing Diagnostics
                </h3>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Form Body */}
        {isSuccess ? (
          <div className="p-8 text-center space-y-3 animate-in zoom-in-95 duration-200">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="font-extrabold text-slate-900 text-lg">
              Clarification Request Dispatched!
            </h4>
            <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
              Task routed to Care Coordinator <strong>{patientCase.assignedCoordinatorName || "Ananya Sharma"}</strong>.
              Document marked as <em>Incomplete</em> and patient notified.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Case Snapshot Banner */}
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between text-xs">
              <div>
                <span className="font-mono text-slate-400 text-[10px] block">PATIENT CASE</span>
                <span className="font-bold text-slate-900">{patientCase.patientName}</span>
                <span className="text-slate-500 text-[11px] ml-1.5">({patientCase.id})</span>
              </div>
              <div className="text-right">
                <span className="font-mono text-slate-400 text-[10px] block">CARE COORDINATOR</span>
                <span className="font-semibold text-[#3F4EB4]">
                  {patientCase.assignedCoordinatorName || "Ananya Sharma"}
                </span>
              </div>
            </div>

            {/* Target Document */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Target Diagnostic Document
              </label>
              <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-2xl flex items-center gap-2.5 text-xs text-amber-900 font-semibold">
                <FileText className="w-4 h-4 text-amber-600 shrink-0" />
                <span className="truncate">{docTitle}</span>
              </div>
            </div>

            {/* Urgency */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Clinical Priority SLA
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setUrgency("urgent")}
                  className={`p-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    urgency === "urgent"
                      ? "bg-rose-500 text-white border-rose-500 shadow-xs"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Urgent (Surgical Gate)
                </button>
                <button
                  type="button"
                  onClick={() => setUrgency("standard")}
                  className={`p-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    urgency === "standard"
                      ? "bg-[#3F4EB4] text-white border-[#3F4EB4] shadow-xs"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" />
                  Standard Review
                </button>
              </div>
            </div>

            {/* Clinical Note textarea */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Instructions for Care Coordinator & Patient *
              </label>
              <textarea
                rows={4}
                required
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Specify missing pages, missing lab biomarkers, or high-resolution re-scan requirements..."
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3.5 text-xs text-slate-900 focus:ring-2 focus:ring-[#2ECDC5] focus:outline-none resize-none leading-relaxed"
              />
              <div className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                Dispatched under {currentUser?.name || "Dr. Subhash Gupta"}&apos;s verified clinician signature.
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !note.trim()}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-extrabold text-xs shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                {isSubmitting ? "Dispatching..." : "Send Request to CS Desk"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
