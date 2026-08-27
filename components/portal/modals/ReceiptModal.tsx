"use client";

import React from "react";
import {
  Receipt,
  Download,
  Printer,
  CheckCircle2,
  X,
  Building2,
  ShieldCheck,
} from "lucide-react";
import { usePortal } from "@/lib/portal/store";
import { PaymentStage, PatientCase } from "@/types/portal";

interface ReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  patientCase: PatientCase;
  stage: PaymentStage | null;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({
  isOpen,
  onClose,
  patientCase,
  stage,
}) => {
  const { formatCurrency } = usePortal();

  if (!isOpen || !stage) return null;

  return (
    <div className="fixed inset-0 z-[120] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[90vh]">
        {/* Top Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center justify-center">
              <Receipt className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm font-extrabold flex items-center gap-2">
                Payment Receipt
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300">
                  Paid & Protected
                </span>
              </div>
              <div className="text-[11px] text-slate-400">
                Receipt #{stage.receiptNumber || "REC-88421"}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
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

        {/* Receipt Printable Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 bg-slate-50 space-y-6 text-slate-900 font-sans scrollbar-thin">
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200 space-y-6">
            <div className="flex items-start justify-between border-b border-slate-200 pb-4">
              <div>
                <h3 className="font-black text-xl text-slate-900 tracking-tight">
                  VEDARA CARE INTERNATIONAL
                </h3>
                <div className="text-xs text-slate-500">
                  Cross-Border Patient Care & Medical Travel Settlement
                </div>
                <div className="text-[11px] text-slate-400">
                  Tax Registration: IN-MED-2026-GST9921
                </div>
              </div>

              <div className="text-right text-xs space-y-1">
                <div className="font-bold text-slate-900 font-mono">
                  {stage.receiptNumber || "REC-88421"}
                </div>
                <div className="text-slate-500">
                  Date: {new Date(stage.paidAt || Date.now()).toLocaleDateString("en-US")}
                </div>
              </div>
            </div>

            {/* Bill To Info */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-0.5">
                <span className="text-slate-400 text-[10px] uppercase font-bold block">
                  Patient
                </span>
                <div className="font-extrabold text-slate-900">{patientCase.patientName}</div>
                <div className="text-slate-600 font-mono text-[11px]">{patientCase.id}</div>
                <div className="text-slate-500">{patientCase.patientCountry}</div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-0.5">
                <span className="text-slate-400 text-[10px] uppercase font-bold block">
                  Hospital & Treatment
                </span>
                <div className="font-extrabold text-slate-900">Medanta – The Medicity</div>
                <div className="text-slate-600">Living Donor Liver Transplant</div>
                <div className="text-slate-500">Supervising: Dr. Subhash Gupta</div>
              </div>
            </div>

            {/* Itemized Line Table */}
            <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-slate-100 border-b border-slate-200 text-[11px] font-bold text-slate-700">
                  <tr>
                    <th className="p-3">Description</th>
                    <th className="p-3 text-center">Stage</th>
                    <th className="p-3 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="p-3">
                      <div className="font-bold text-slate-900">{stage.name}</div>
                      <div className="text-[11px] text-slate-500">
                        {stage.cancellationTerms}
                      </div>
                    </td>
                    <td className="p-3 text-center font-mono text-[11px]">
                      {stage.id.toUpperCase()}
                    </td>
                    <td className="p-3 text-right font-black text-slate-900">
                      {formatCurrency(stage.amountUsd)}
                    </td>
                  </tr>
                </tbody>
                <tfoot className="bg-slate-50 border-t border-slate-200 font-bold">
                  <tr>
                    <td colSpan={2} className="p-3 text-right text-slate-600">
                      Total Paid into Medical Account:
                    </td>
                    <td className="p-3 text-right font-black text-emerald-700 text-sm">
                      {formatCurrency(stage.amountUsd)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Security stamp */}
            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
              <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>Verified Healthcare Escrow Certificate</span>
              </div>
              <span className="font-mono">REF: 98412-SUCCESS</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-white border-t border-slate-200 flex items-center justify-between shrink-0">
          <span className="text-xs text-slate-500">Official Medical Care Invoice</span>
          <button
            onClick={() => {
              alert("Official receipt PDF downloaded successfully!");
            }}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#1d8983] via-[#1baba4] to-[#1d8983] text-white text-xs font-black flex items-center gap-2 shadow-lg shadow-[#1d8983]/20 active:scale-95 transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download Official PDF Receipt</span>
          </button>
        </div>
      </div>
    </div>
  );
};
