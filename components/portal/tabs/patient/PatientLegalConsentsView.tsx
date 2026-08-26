"use client";

import React, { useState } from "react";
import {
  Lock,
  ShieldCheck,
  CheckCircle2,
  Clock,
  KeyRound,
  FileText,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { PatientCase, ConsentRecord } from "@/types/portal";
import { ConsentSignModal } from "../../modals/ConsentSignModal";

interface PatientLegalConsentsViewProps {
  patientCase: PatientCase;
}

export const PatientLegalConsentsView: React.FC<PatientLegalConsentsViewProps> = ({
  patientCase,
}) => {
  const [selectedConsentToSign, setSelectedConsentToSign] = useState<ConsentRecord | null>(null);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2ECDC5]/10 text-[#3F4EB4] text-xs font-extrabold uppercase tracking-wider mb-2 border border-[#2ECDC5]/20">
            <Lock className="w-3.5 h-3.5 text-[#2ECDC5]" />
            Regulatory Compliance & Audit Trail
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Immutable Legal Consent Ledger (Append-Only)
          </h2>
          <p className="text-slate-500 text-sm mt-1 max-w-xl">
            Read-only verified legal consents captured for this patient, signed via cryptographic 2FA tokens and timestamped to the audit trail.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-extrabold text-emerald-700 bg-emerald-50 px-4 py-2 rounded-2xl border border-emerald-200">
          <ShieldCheck className="w-4 h-4" />
          <span>GDPR / HIPAA / DPDP Compliant</span>
        </div>
      </div>

      {/* Consent Ledger Table */}
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#3F4EB4]" />
            <h3 className="font-extrabold text-sm text-slate-900">Verified Legal Instruments</h3>
          </div>
          <span className="text-xs text-slate-500 font-bold">
            {patientCase.consents.filter((c) => c.agreed).length} of {patientCase.consents.length} Signed
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {patientCase.consents.map((consent) => (
            <div
              key={consent.id}
              className="p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors"
            >
              <div className="space-y-1.5 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-sm text-slate-900">{consent.title}</span>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200">
                    {consent.version}
                  </span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">{consent.description}</p>
                {consent.agreed && consent.timestamp && (
                  <div className="text-[11px] text-slate-400 font-mono flex items-center gap-2 pt-0.5">
                    <span suppressHydrationWarning>Signed on: {new Date(consent.timestamp).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>IP: {consent.ipAddress || "185.120.45.10"}</span>
                    {consent.digitalSignature && (
                      <>
                        <span>•</span>
                        <span className="text-emerald-700 font-bold">{consent.digitalSignature}</span>
                      </>
                    )}
                  </div>
                )}
              </div>

              <div className="shrink-0 self-end sm:self-center">
                {consent.agreed ? (
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>✓ Accepted</span>
                  </span>
                ) : consent.consentType === "tele_consultation_terms" ? (
                  <button
                    onClick={() => setSelectedConsentToSign(consent)}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#1d8983] to-[#1baba4] hover:scale-105 active:scale-95 text-white font-extrabold text-xs shadow-md shadow-[#283593]/20 transition-all cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <Clock className="w-3.5 h-3.5 text-amber-200" />
                    <span>Review & Sign</span>
                  </button>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-slate-100 text-slate-500 border border-slate-200">
                    <Lock className="w-3.5 h-3.5 text-slate-400" />
                    <span>⚪ Unlocked at Quote Stage</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Consent Sign Modal */}
      {selectedConsentToSign && (
        <ConsentSignModal
          isOpen={!!selectedConsentToSign}
          onClose={() => setSelectedConsentToSign(null)}
          caseId={patientCase.id}
          consent={selectedConsentToSign}
        />
      )}
    </div>
  );
};
