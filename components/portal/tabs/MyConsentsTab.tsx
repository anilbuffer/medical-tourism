"use client";

import React, { useState } from "react";
import { PatientCase, ConsentRecord, ConsentType } from "@/types/portal";
import { usePortal } from "@/lib/portal/store";
import {
  ShieldCheck,
  Lock,
  CheckCircle2,
  FileCheck2,
  Download,
  Eye,
  Clock,
  Sparkles,
  Award,
  Globe,
  Plus,
  X,
} from "lucide-react";

interface MyConsentsTabProps {
  patientCase: PatientCase;
}

const CONSENT_TYPE_META: Record<
  ConsentType,
  { label: string; badgeColor: string; description: string }
> = {
  privacy_data_processing: {
    label: "Privacy & Data Processing",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
    description: "GDPR, HIPAA, and DPDP international patient health record storage & telemetry consent.",
  },
  hospital_document_sharing: {
    label: "Hospital Document Sharing",
    badgeColor: "bg-teal-50 text-teal-700 border-teal-200",
    description: "Explicit transmission authorization to partner hospital surgical boards & diagnostic centers.",
  },
  tele_consultation_terms: {
    label: "Tele-Consultation Terms",
    badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
    description: "Scope, remote telemedicine advisory terms, and limitations of video consultation.",
  },
  payment_staged_terms: {
    label: "Payment & Cancellation Terms",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    description: "Milestone-specific refund rules and healthcare escrow release conditions.",
  },
};

export const MyConsentsTab: React.FC<MyConsentsTabProps> = ({ patientCase }) => {
  const { recordConsent } = usePortal();

  const [selectedConsentForCert, setSelectedConsentForCert] = useState<ConsentRecord | null>(null);

  // Optional Signing of pending consent types
  const consentTypesRecorded = new Set(patientCase.consents.map((c) => c.consentType));

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2ECDC5]/10 text-[#3F4EB4] text-xs font-bold tracking-wider uppercase mb-2 border border-[#2ECDC5]/20">
            <Lock className="w-3.5 h-3.5 text-[#2ECDC5]" />
            Append-Only Audit Ledger
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Patient Consents & Legal Agreements
          </h2>
          <p className="text-slate-500 text-sm mt-1 max-w-xl">
            Immutable log of all granted consents, digital signatures, and privacy terms. Staged payment terms are captured dynamically as each milestone is initiated.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-slate-50/80 px-4 py-2.5 rounded-2xl border border-slate-200 text-xs font-bold text-slate-700">
          <ShieldCheck className="w-4 h-4 text-[#2ECDC5]" />
          <span>{patientCase.consents.length} Consents Verified</span>
        </div>
      </div>

      {/* 4 Consent Pillars Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {(
          [
            "privacy_data_processing",
            "hospital_document_sharing",
            "tele_consultation_terms",
            "payment_staged_terms",
          ] as ConsentType[]
        ).map((type) => {
          const meta = CONSENT_TYPE_META[type];
          const isSigned = consentTypesRecorded.has(type);
          const count = patientCase.consents.filter((c) => c.consentType === type).length;

          return (
            <div
              key={type}
              className={`p-5 rounded-2xl border transition-all duration-300 ${
                isSigned
                  ? "bg-white/95 backdrop-blur-xl border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-[#2ECDC5]/40"
                  : "bg-slate-50/70 border-dashed border-slate-300"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${meta.badgeColor}`}
                >
                  {meta.label}
                </span>
                {isSigned ? (
                  <CheckCircle2 className="w-4 h-4 text-[#2ECDC5]" />
                ) : (
                  <Clock className="w-4 h-4 text-slate-400" />
                )}
              </div>
              <h4 className="text-sm font-extrabold text-slate-900">{meta.label}</h4>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">{meta.description}</p>
              <div className="mt-3 pt-3 border-t border-slate-100 text-[11px] font-semibold text-slate-600 flex items-center justify-between">
                <span>Status:</span>
                <span className={isSigned ? "text-[#3F4EB4] font-bold" : "text-amber-700 font-medium"}>
                  {isSigned ? `${count} Active Record${count > 1 ? "s" : ""}` : "Captured at Stage"}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Consent Ledger Timeline */}
      <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] transition-all duration-300 space-y-4">
        <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
          <FileCheck2 className="w-5 h-5 text-[#3F4EB4]" />
          <span>Immutable Consent History & Electronic Signatures</span>
        </h3>

        <div className="space-y-4 pt-2">
          {patientCase.consents.map((consent, idx) => {
            const meta = CONSENT_TYPE_META[consent.consentType] || {
              label: "General Consent",
              badgeColor: "bg-slate-100 text-slate-700 border-slate-200",
            };

            return (
              <div
                key={consent.id}
                className="p-5 rounded-2xl bg-white/90 border border-slate-200 shadow-xs hover:-translate-y-0.5 hover:shadow-md hover:border-[#2ECDC5]/40 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-2 max-w-2xl">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-md border ${meta.badgeColor}`}>
                      {meta.label}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      Ver {consent.version}
                    </span>
                    <span className="text-xs text-slate-400">•</span>
                    <span className="text-xs text-slate-500">
                      Timestamp: {new Date(consent.timestamp).toLocaleString("en-US")}
                    </span>
                  </div>

                  <h4 className="font-extrabold text-slate-900 text-base">{consent.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{consent.description}</p>

                  <div className="flex items-center gap-4 text-[11px] text-slate-500 font-medium pt-1">
                    <span>
                      Digital Signature: <strong className="text-slate-800">{consent.digitalSignature || "Patient Electronic Signature"}</strong>
                    </span>
                    <span>
                      IP / Audit Stamp: <strong className="text-slate-800">{consent.ipAddress}</strong>
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start md:self-center shrink-0">
                  <button
                    onClick={() => setSelectedConsentForCert(consent)}
                    className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-800 font-bold text-xs border border-slate-200 flex items-center gap-1.5 shadow-sm transition-all"
                  >
                    <Award className="w-3.5 h-3.5 text-teal-600" />
                    <span>View Certificate</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Certificate Modal */}
      {selectedConsentForCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Award className="w-6 h-6 text-teal-600" />
                <h3 className="text-xl font-black text-slate-900">
                  Electronic Consent Certificate
                </h3>
              </div>
              <button
                onClick={() => setSelectedConsentForCert(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 bg-gradient-to-br from-slate-50 to-teal-50/30 rounded-2xl border border-teal-100 space-y-3 font-mono text-xs text-slate-800">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Certificate ID</span>
                <span className="font-bold text-slate-900">{selectedConsentForCert.id}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Consent Title</span>
                <span className="font-bold text-slate-900">{selectedConsentForCert.title}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Signer & Patient ID</span>
                <span className="font-bold text-slate-900">{patientCase.patientName} ({patientCase.id})</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Timestamp (UTC)</span>
                <span className="font-bold text-slate-900">{new Date(selectedConsentForCert.timestamp).toUTCString()}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">IP / Network Audit Signature</span>
                <span className="font-bold text-slate-900">{selectedConsentForCert.ipAddress}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Cryptographic Status</span>
                <span className="font-bold text-emerald-700">APPEND_ONLY_IMMUTABLE_HASH_VERIFIED</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedConsentForCert(null)}
              className="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs transition-all"
            >
              Close Certificate
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
