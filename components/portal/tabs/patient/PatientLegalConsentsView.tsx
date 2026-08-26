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
  Eye,
  Phone,
} from "lucide-react";
import { PatientCase, ConsentRecord } from "@/types/portal";
import { ConsentSignModal } from "../../modals/ConsentSignModal";
import { WhatsAppContactModal } from "../../modals/WhatsAppContactModal";

interface PatientLegalConsentsViewProps {
  patientCase: PatientCase;
}

export const PatientLegalConsentsView: React.FC<PatientLegalConsentsViewProps> = ({
  patientCase,
}) => {
  const [selectedConsentToSign, setSelectedConsentToSign] = useState<ConsentRecord | null>(null);
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2ECDC5]/10 text-[#3F4EB4] text-xs font-extrabold uppercase tracking-wider mb-2 border border-[#2ECDC5]/20">
            <Lock className="w-3.5 h-3.5 text-[#2ECDC5]" />
            Your Treatment Agreements
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Your Signed Agreements
          </h2>
          <p className="text-slate-500 text-sm mt-1 max-w-xl">
            A clear record of the consents and agreements you have reviewed and signed for your medical journey.
          </p>
        </div>

        <button
          onClick={() => setIsWhatsAppOpen(true)}
          className="px-5 py-3 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 text-xs font-bold flex items-center gap-2 shadow-xs transition-colors cursor-pointer shrink-0"
        >
          <Phone className="w-4 h-4 text-emerald-600" />
          <span>Questions about terms?</span>
        </button>
      </div>

      {/* Agreements List */}
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#3F4EB4]" />
            <h3 className="font-extrabold text-base text-slate-900">Treatment Agreements & Forms</h3>
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
                <div className="flex items-center gap-2.5">
                  <span className="font-extrabold text-base text-slate-900">{consent.title}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{consent.description}</p>
                {consent.agreed && consent.timestamp && (
                  <div className="text-[11px] text-emerald-700 font-medium flex items-center gap-2 pt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span suppressHydrationWarning>Agreed on {new Date(consent.timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                  </div>
                )}
              </div>

              <div className="shrink-0 self-end sm:self-center">
                {consent.agreed ? (
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Signed & On File</span>
                  </span>
                ) : consent.consentType === "tele_consultation_terms" ? (
                  <button
                    onClick={() => setSelectedConsentToSign(consent)}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#1d8983] to-[#1baba4] hover:scale-105 active:scale-95 text-white font-extrabold text-xs shadow-md shadow-[#283593]/20 transition-all cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <Clock className="w-3.5 h-3.5 text-amber-200" />
                    <span>Review & Agree</span>
                  </button>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-slate-100 text-slate-500 border border-slate-200">
                    <span>Available at Package Stage</span>
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

      {/* WhatsApp Modal */}
      <WhatsAppContactModal
        isOpen={isWhatsAppOpen}
        onClose={() => setIsWhatsAppOpen(false)}
        coordinatorName="Ananya Sharma"
        caseId={patientCase.id}
      />
    </div>
  );
};
