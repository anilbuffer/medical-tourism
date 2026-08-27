"use client";

import React, { useState } from "react";
import {
  Lock,
  ShieldCheck,
  CheckCircle2,
  Clock,
  FileText,
  Phone,
  Calendar,
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
            Forms & Consents
          </h2>
          <p className="text-slate-500 text-sm mt-1 max-w-xl">
            A clear record of standard medical agreements you have reviewed and confirmed for your treatment journey.
          </p>
        </div>

        <a
          href="tel:+919810188412"
          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-black flex items-center gap-2 shadow-md shadow-emerald-600/20 active:scale-95 transition-all cursor-pointer shrink-0"
        >
          <Phone className="w-4 h-4" />
          <span>Call Ananya for Help</span>
        </a>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white/95 rounded-2xl p-4 border border-slate-200 shadow-sm text-center">
          <div className="text-2xl font-black text-emerald-700">{signedCount}</div>
          <div className="text-[11px] text-slate-500 font-bold mt-0.5">Signed & Ready</div>
        </div>
        <div className="bg-white/95 rounded-2xl p-4 border border-slate-200 shadow-sm text-center">
          <div className="text-2xl font-black text-amber-600">{totalCount - signedCount}</div>
          <div className="text-[11px] text-slate-500 font-bold mt-0.5">Pending Signature</div>
        </div>
        <div className="bg-white/95 rounded-2xl p-4 border border-slate-200 shadow-sm text-center">
          <div className="text-2xl font-black text-[#3F4EB4]">{totalCount}</div>
          <div className="text-[11px] text-slate-500 font-bold mt-0.5">Total Forms</div>
        </div>
      </div>

      {/* Agreements List (Clear, human, no backend jargon) */}
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#3F4EB4]" />
            <h3 className="font-extrabold text-base text-slate-900">Treatment Agreements</h3>
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
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{consent.description}</p>

                {consent.agreed && consent.timestamp && (
                  <div className="pt-1">
                    <div className="text-xs text-emerald-700 font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span suppressHydrationWarning>
                        Signed on {new Date(consent.timestamp).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })} • On file with Medanta Hospital
                      </span>
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
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#1d8983] to-[#1baba4] hover:scale-105 active:scale-95 text-white font-extrabold text-xs shadow-md shadow-[#1d8983]/20 transition-all cursor-pointer inline-flex items-center gap-1.5"
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

      {/* Friendly Reassurance Banner (Replaces cryptographic jargon) */}
      <div className="bg-emerald-50/70 border border-emerald-200 rounded-3xl p-5 sm:p-6 flex items-start gap-4">
        <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div>
          <div className="text-sm font-extrabold text-emerald-950">Safe & Official Records</div>
          <p className="text-xs text-emerald-800 mt-0.5 leading-relaxed">
            All signed forms are officially registered with Medanta Hospital and your care team in New Delhi. You can view or request printed copies anytime from your coordinator Ananya.
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
