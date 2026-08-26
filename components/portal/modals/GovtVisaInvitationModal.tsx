"use client";

import React from "react";
import {
  FileText,
  Download,
  Printer,
  ShieldCheck,
  CheckCircle2,
  X,
  Award,
  Globe,
  QrCode,
  Building2,
} from "lucide-react";
import { PatientCase } from "@/types/portal";

interface GovtVisaInvitationModalProps {
  isOpen: boolean;
  onClose: () => void;
  patientCase: PatientCase;
}

export const GovtVisaInvitationModal: React.FC<GovtVisaInvitationModalProps> = ({
  isOpen,
  onClose,
  patientCase,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] shadow-2xl flex flex-col overflow-hidden border border-slate-200">
        {/* Modal Action Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm font-extrabold flex items-center gap-2">
                Official Indian Medical Visa (M-Visa) Invitation Letter
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  MEA Verified
                </span>
              </div>
              <div className="text-[11px] text-slate-400">
                Registration Ref: MEA/MED/2026/089412 • Medanta The Medicity NCR
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Print Document"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Official Document Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 bg-slate-50 space-y-6 text-slate-900 font-serif scrollbar-thin">
          <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-sm border border-slate-200 space-y-6 relative overflow-hidden">
            {/* Watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] select-none">
              <Building2 className="w-96 h-96 text-slate-900" />
            </div>

            {/* Letterhead */}
            <div className="flex items-start justify-between border-b-2 border-slate-900 pb-4">
              <div>
                <h2 className="text-xl font-black tracking-tight text-slate-900 font-sans">
                  MEDANTA – THE MEDICITY
                </h2>
                <div className="text-xs text-slate-600 font-sans">
                  Multi-Super Specialty Institute & Organ Transplant Center
                </div>
                <div className="text-[11px] text-slate-500 font-sans">
                  Sector 38, Gurugram, Delhi NCR 122001, India • JCI & NABH Accredited
                </div>
              </div>

              <div className="text-right font-sans text-xs space-y-1">
                <div className="font-bold text-slate-900">REF: MEA/MED/2026/089412</div>
                <div className="text-slate-500">Date: August 25, 2026</div>
              </div>
            </div>

            {/* Recipient Embassy */}
            <div className="font-sans text-xs space-y-1 text-slate-700">
              <div className="font-bold text-slate-900">To,</div>
              <div>The Visa Officer / Consular General</div>
              <div>Embassy of India / Indian Consulate General, Dubai, UAE</div>
            </div>

            {/* Subject */}
            <div className="font-sans text-sm font-black text-slate-900 bg-slate-100 p-3 rounded-xl border border-slate-200">
              SUBJECT: OFFICIAL MEDICAL VISA (M-VISA) & MEDICAL ATTENDANT VISA (MX-VISA) INVITATION
            </div>

            {/* Body text */}
            <div className="text-xs text-slate-800 leading-relaxed space-y-3 font-sans">
              <p>Dear Sir / Madam,</p>
              <p>
                This is to certify that <strong>Mr. Tariq Al-Mansoor</strong>, Citizen of the United Arab Emirates, holding Passport No. <strong>N8941202</strong>, has been clinically evaluated and accepted for <strong>Living Donor Liver Transplant (LDLT)</strong> at Medanta – The Medicity under the primary care of <strong>Dr. Subhash Gupta</strong> (Chief Liver Transplant Surgeon).
              </p>
              <p>
                The planned surgical admission date is <strong>September 01, 2026</strong>. The patient requires one accompanying medical escort / companion, <strong>Mr. Faris Al-Mansoor</strong> (Passport: <strong>N8941203</strong>), who is also the cleared living organ donor.
              </p>
              <p>
                The hospital will be responsible for their clinical admission, surgical protocol, and comprehensive post-operative monitoring for approximately 14 days in our private isolation wing.
              </p>
            </div>

            {/* Clinical Schedule Table */}
            <div className="font-sans text-xs border border-slate-200 rounded-xl overflow-hidden">
              <div className="bg-slate-100 px-4 py-2 font-bold text-slate-900 border-b border-slate-200">
                Official Clinical Schedule Summary
              </div>
              <div className="p-4 grid grid-cols-2 gap-3 bg-slate-50/50">
                <div>
                  <span className="text-slate-500 block text-[10px]">Patient Name:</span>
                  <span className="font-bold text-slate-900">Tariq Al-Mansoor</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Attendant / Donor:</span>
                  <span className="font-bold text-slate-900">Faris Al-Mansoor</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Supervising Specialist:</span>
                  <span className="font-bold text-slate-900">Dr. Subhash Gupta (Chairman HPB)</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Expected Duration:</span>
                  <span className="font-bold text-slate-900">14 Days Hospital Stay</span>
                </div>
              </div>
            </div>

            {/* Official Seal and Signatures */}
            <div className="flex items-end justify-between pt-6 border-t border-slate-200 font-sans">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 border-2 border-slate-900 rounded-full flex flex-col items-center justify-center text-[8px] font-black text-slate-900 uppercase tracking-tighter text-center leading-none p-1">
                  <span>MEDANTA</span>
                  <span>* EMBOSSED *</span>
                  <span>OFFICIAL SEAL</span>
                </div>
                <div className="text-[10px] text-slate-500">
                  <div>MEA Registration Validated</div>
                  <div>Digital Hash: 89412-SHA256-IN</div>
                </div>
              </div>

              <div className="text-right space-y-1">
                <div className="font-serif italic font-bold text-sm text-slate-800">
                  Dr. Subhash Gupta
                </div>
                <div className="text-[11px] font-bold text-slate-900">Chief Liver Transplant Surgeon</div>
                <div className="text-[10px] text-slate-500">Medanta – The Medicity, Delhi NCR</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-white border-t border-slate-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-xs text-slate-600 font-bold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Valid for Indian e-Medical Visa Portal Upload</span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                alert("Official Indian Medical Visa Invitation Letter downloaded successfully!");
              }}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#1d8983] via-[#1baba4] to-[#1d8983] text-white text-xs font-black flex items-center gap-2 shadow-lg shadow-[#283593]/20 active:scale-95 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Official PDF Letter</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
