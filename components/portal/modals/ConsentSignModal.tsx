"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  CheckCircle2,
  Lock,
  FileText,
  X,
  Sparkles,
  KeyRound,
  Check,
} from "lucide-react";
import { usePortal } from "@/lib/portal/store";
import { ConsentRecord } from "@/types/portal";

interface ConsentSignModalProps {
  isOpen: boolean;
  onClose: () => void;
  caseId: string;
  consent: ConsentRecord | null;
}

export const ConsentSignModal: React.FC<ConsentSignModalProps> = ({
  isOpen,
  onClose,
  caseId,
  consent,
}) => {
  const { recordConsent } = usePortal();
  const [signatureName, setSignatureName] = useState("Tariq Al-Mansoor");
  const [agreedCheckbox, setAgreedCheckbox] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !consent) return null;

  const handleSign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedCheckbox || !signatureName.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      recordConsent(
        caseId,
        consent.consentType,
        consent.title,
        consent.description,
        consent.paymentStageId
      );
      setIsSubmitting(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-[120] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#141d60] via-[#1b2360] to-[#101e76] p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#2ECDC5]/20 text-[#2ECDC5] border border-[#2ECDC5]/40 flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base leading-tight">{consent.title}</h3>
              <div className="text-xs text-slate-300">
                Version {consent.version} • Cryptographic Append-Only Ledger
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSign} className="p-6 space-y-4">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs text-slate-700 leading-relaxed max-h-56 overflow-y-auto scrollbar-thin">
            <div className="font-bold text-slate-900 text-sm">{consent.title}</div>
            <p>{consent.description}</p>
            <p className="text-slate-500 text-[11px]">
              By providing your electronic signature below, you confirm that you have read, understood, and consented to the clinical evaluation scope, cross-border telemedicine advisory terms, and data processing procedures under HIPAA, GDPR, and Indian DPDP Act 2023.
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              Digital Signature (Full Legal Name)
            </label>
            <input
              type="text"
              required
              value={signatureName}
              onChange={(e) => setSignatureName(e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-900 focus:outline-none focus:border-[#3F4EB4]"
              placeholder="e.g. Tariq Al-Mansoor"
            />
          </div>

          <div className="flex items-start gap-3 p-3 bg-teal-50/60 rounded-2xl border border-teal-100">
            <input
              type="checkbox"
              id="consent-agreed"
              checked={agreedCheckbox}
              onChange={(e) => setAgreedCheckbox(e.target.checked)}
              className="mt-0.5 w-4 h-4 text-[#3F4EB4] rounded border-slate-300 focus:ring-[#3F4EB4] cursor-pointer"
            />
            <label htmlFor="consent-agreed" className="text-xs text-teal-900 font-semibold cursor-pointer">
              I acknowledge and execute this legal instrument with the full legal effect of a handwritten signature.
            </label>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <div className="text-[10px] text-slate-400 font-mono">
              IP: 185.120.45.10 (Dubai) • SHA256 Verification
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!agreedCheckbox || !signatureName.trim() || isSubmitting}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#1d8983] via-[#1baba4] to-[#1d8983] disabled:opacity-50 text-white text-xs font-black shadow-lg shadow-[#283593]/20 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
              >
                <KeyRound className="w-3.5 h-3.5" />
                <span>{isSubmitting ? "Signing..." : "Digitally Sign & Seal"}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
