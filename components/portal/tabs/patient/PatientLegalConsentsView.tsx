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
  Hash,
  Globe,
  Calendar,
  Shield,
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

  const signedCount = patientCase.consents.filter((c) => c.agreed).length;
  const totalCount = patientCase.consents.length;

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

      {/* Progress Overview */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white/95 rounded-2xl p-4 border border-slate-200 shadow-sm text-center">
          <div className="text-2xl font-black text-emerald-700">{signedCount}</div>
          <div className="text-[11px] text-slate-500 font-bold mt-0.5">Signed</div>
        </div>
        <div className="bg-white/95 rounded-2xl p-4 border border-slate-200 shadow-sm text-center">
          <div className="text-2xl font-black text-amber-600">{totalCount - signedCount}</div>
          <div className="text-[11px] text-slate-500 font-bold mt-0.5">Pending</div>
        </div>
        <div className="bg-white/95 rounded-2xl p-4 border border-slate-200 shadow-sm text-center">
          <div className="text-2xl font-black text-[#3F4EB4]">{totalCount}</div>
          <div className="text-[11px] text-slate-500 font-bold mt-0.5">Total</div>
        </div>
      </div>

      {/* Agreements List */}
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#3F4EB4]" />
            <h3 className="font-extrabold text-base text-slate-900">Treatment Agreements & Forms</h3>
          </div>
          <span className="text-xs text-slate-500 font-bold">
            {signedCount} of {totalCount} Signed
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {patientCase.consents.map((consent) => (
            <div
              key={consent.id}
              className="p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-start justify-between gap-4 hover:bg-slate-50/50 transition-colors"
            >
              <div className="space-y-2 max-w-2xl flex-1">
                <div className="flex items-center gap-2.5">
                  <span className="font-extrabold text-base text-slate-900">{consent.title}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">
                    {consent.version}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{consent.description}</p>

                {consent.agreed && consent.timestamp && (
                  <div className="space-y-1 pt-1">
                    <div className="text-[11px] text-emerald-700 font-medium flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span suppressHydrationWarning>
                        Signed on {new Date(consent.timestamp).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                    {/* IP + Version Hash + Legal Verification */}
                    <div className="flex flex-wrap gap-2">
                      {consent.ipAddress && (
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-500 text-[10px] font-mono font-bold">
                          <Globe className="w-3 h-3" />
                          IP: {consent.ipAddress}
                        </div>
                      )}
                      {consent.digitalSignature && (
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-500 text-[10px] font-mono font-bold">
                          <Hash className="w-3 h-3" />
                          Hash: {consent.digitalSignature.slice(0, 12)}…
                        </div>
                      )}
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-500 text-[10px] font-bold">
                        <Shield className="w-3 h-3" />
                        {consent.version}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="shrink-0 self-end sm:self-start">
                {consent.agreed ? (
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Signed & On File</span>
                  </span>
                ) : (
                  <button
                    onClick={() => setSelectedConsentToSign(consent)}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#1d8983] to-[#1baba4] hover:scale-105 active:scale-95 text-white font-extrabold text-xs shadow-md shadow-[#283593]/20 transition-all cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <Clock className="w-3.5 h-3.5 text-amber-200" />
                    <span>Review & Sign</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Append-Only Ledger Sync Banner */}
      <div className="bg-gradient-to-r from-[#141d60]/5 via-[#1b2360]/5 to-[#101e76]/5 border border-[#3F4EB4]/20 rounded-2xl p-4 flex items-start gap-3">
        <div className="w-9 h-9 rounded-xl bg-[#3F4EB4]/10 flex items-center justify-center shrink-0">
          <ShieldCheck className="w-5 h-5 text-[#3F4EB4]" />
        </div>
        <div>
          <div className="text-sm font-extrabold text-[#141d60]">Cryptographic Append-Only Ledger</div>
          <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
            All signed consents are cryptographically sealed with your IP address, timestamp, and version hash — and automatically appended to the CS Compliance Audit Ledger. These records are immutable and legally binding across international jurisdictions.
          </p>
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
