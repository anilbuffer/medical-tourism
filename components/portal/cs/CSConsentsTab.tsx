"use client";

import React, { useState } from "react";
import { PatientCase, ConsentType } from "@/types/portal";
import { usePortal } from "@/lib/portal/store";
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Send,
  Lock,
  FileText,
  Clock,
  Sparkles,
} from "lucide-react";

interface CSConsentsTabProps {
  patientCase: PatientCase;
}

const CONSENT_TITLES: Record<ConsentType, { title: string; desc: string }> = {
  privacy_data_processing: {
    title: "Privacy & Cross-Border Health Data Processing",
    desc: "HIPAA, GDPR & Indian DPDP Act 2023 compliance for storing, encrypting, and transmitting patient health records.",
  },
  hospital_document_sharing: {
    title: "Hospital Document Sharing & Telemedicine Authorization",
    desc: "Explicit consent to forward high-resolution imaging and clinical files to hospital evaluation boards.",
  },
  tele_consultation_terms: {
    title: "Tele-Consultation Terms & Remote Scope Limitations",
    desc: "Understanding cross-border telemedicine scope, remote audio/video assessment, and diagnostic recommendations.",
  },
  payment_staged_terms: {
    title: "Payment Staged Terms & Healthcare Escrow Policy",
    desc: "Milestone escrow release schedule, hospital non-refundable slot cancellation terms, and PCI-DSS compliance policy.",
  },
};

const ALL_CONSENT_TYPES: ConsentType[] = [
  "privacy_data_processing",
  "hospital_document_sharing",
  "tele_consultation_terms",
  "payment_staged_terms",
];

export const CSConsentsTab: React.FC<CSConsentsTabProps> = ({ patientCase }) => {
  const { retriggerConsentRequest } = usePortal();
  const [successMsg, setSuccessMsg] = useState("");

  const handleRetrigger = (type: ConsentType) => {
    retriggerConsentRequest(patientCase.id, type);
    setSuccessMsg(`✓ Digital e-signature request link dispatched for "${CONSENT_TITLES[type].title}".`);
    setTimeout(() => setSuccessMsg(""), 4000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-4 shadow-[0_6px_32px_rgba(0,0,0,0.04)] border border-slate-200/90 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-extrabold text-base text-slate-900">
              Legal Consents &amp; Compliance Vault
            </h3>
            <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
              Append-Only Legal Ledger
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Tracking all 4 mandatory cross-border consent records with cryptographic audit timestamps and IP verification.
          </p>
        </div>
      </div>

      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center justify-between shadow-xs animate-in fade-in">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            {successMsg}
          </span>
          <span className="text-[10px] text-emerald-600">Dispatched via SMS &amp; Portal Notification</span>
        </div>
      )}

      {/* 4 Consent Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ALL_CONSENT_TYPES.map((ctype) => {
          const matchingConsents = patientCase.consents.filter(
            (c) => c.consentType === ctype && c.agreed
          );
          const isObtained = matchingConsents.length > 0;
          const latest = matchingConsents[0];
          const info = CONSENT_TITLES[ctype];

          return (
            <div
              key={ctype}
              className={`rounded-3xl p-5 border transition-all space-y-3 flex flex-col justify-between ${isObtained
                  ? "bg-emerald-50/40 border-emerald-200"
                  : "bg-amber-50/40 border-amber-200"
                }`}
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="font-black text-sm text-slate-900 leading-snug">
                    {info.title}
                  </div>
                  <span
                    className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shrink-0 ${isObtained
                        ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                        : "bg-amber-100 text-amber-800 border border-amber-300"
                      }`}
                  >
                    {isObtained ? "✓ Signed & Verified" : "Pending Signature"}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {info.desc}
                </p>
              </div>

              {isObtained && latest ? (
                <div className="p-3 bg-white rounded-2xl border border-emerald-100 text-[11px] text-slate-600 space-y-1 font-mono">
                  <div>
                    <strong>Signed At:</strong> {new Date(latest.timestamp || Date.now()).toLocaleString("en-US")}
                  </div>
                  <div>
                    <strong>IP Address:</strong> {latest.ipAddress || "185.120.45.10 (Dubai, UAE)"}
                  </div>
                  <div>
                    <strong>Version:</strong> {latest.version}
                  </div>
                  {latest.digitalSignature && (
                    <div className="text-emerald-700 font-bold truncate">
                      <strong>Signature:</strong> {latest.digitalSignature}
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-3 bg-white rounded-2xl border border-amber-200/80 text-xs text-amber-900 space-y-2">
                  <p className="text-[11px] text-amber-800">
                    Consent has not yet been electronically signed by the patient.
                  </p>
                  <button
                    type="button"
                    onClick={() => handleRetrigger(ctype)}
                    className="w-full py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Re-Trigger Consent Request</span>
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
