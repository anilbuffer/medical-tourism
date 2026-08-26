"use client";

import React, { useState } from "react";
import {
  CreditCard,
  CheckCircle2,
  Clock,
  Lock,
  Download,
  Receipt,
  Sparkles,
  ShieldCheck,
  Building,
  ArrowRight,
  AlertCircle,
} from "lucide-react";
import { PatientCase, PaymentStage } from "@/types/portal";
import { usePortal } from "@/lib/portal/store";
import { PaymentEscrowModal } from "../../modals/PaymentEscrowModal";
import { ReceiptModal } from "../../modals/ReceiptModal";

interface PatientPaymentEscrowViewProps {
  patientCase: PatientCase;
}

export const PatientPaymentEscrowView: React.FC<PatientPaymentEscrowViewProps> = ({
  patientCase,
}) => {
  const { formatCurrency, currency } = usePortal();
  const [selectedPayStage, setSelectedPayStage] = useState<PaymentStage | null>(null);
  const [selectedReceiptStage, setSelectedReceiptStage] = useState<PaymentStage | null>(null);

  const totalPackageCost = patientCase.payments.reduce((sum, p) => sum + p.amountUsd, 0) || 28500;
  const totalPaid = patientCase.payments
    .filter((p) => p.status === "completed")
    .reduce((sum, p) => sum + p.amountUsd, 0);
  const remainingBalance = totalPackageCost - totalPaid;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2ECDC5]/10 text-[#3F4EB4] text-xs font-extrabold uppercase tracking-wider mb-2 border border-[#2ECDC5]/20">
            <Lock className="w-3.5 h-3.5 text-[#2ECDC5]" />
            Healthcare Escrow & Staged Settlement
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Staged Payment Ledger (PCI-DSS Compliant)
          </h2>
          <p className="text-slate-500 text-sm mt-1 max-w-xl">
            Funds are securely held in certified healthcare escrow until clinical milestones are unlocked.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-200">
          <div className="px-3 py-1 text-right">
            <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Total Paid</div>
            <div className="text-base font-black text-emerald-700">
              {formatCurrency(totalPaid)}
            </div>
          </div>
          <div className="h-8 w-px bg-slate-200" />
          <div className="px-3 py-1 text-right">
            <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Remaining</div>
            <div className="text-base font-black text-slate-900">
              {formatCurrency(remainingBalance)}
            </div>
          </div>
        </div>
      </div>

      {/* Staged Payment Table */}
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Receipt className="w-4 h-4 text-[#3F4EB4]" />
            <h3 className="font-extrabold text-sm text-slate-900">Staged Milestone Breakdown</h3>
          </div>
          <span className="text-xs text-emerald-700 font-bold flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" />
            <span>Escrow Vault Active</span>
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200/80 text-[11px] font-extrabold text-slate-600 uppercase tracking-wider">
              <tr>
                <th className="p-4">Stage</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Status</th>
                <th className="p-4">Policy Terms</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-sans">
              {patientCase.payments.map((stage) => (
                <tr key={stage.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4">
                    <div className="font-extrabold text-slate-900">{stage.name}</div>
                    <div className="text-[11px] text-slate-500">
                      {stage.id === "deposit"
                        ? "Coordination & M-Visa Invitation"
                        : stage.id === "advance"
                        ? "Hospital Suite & OT Booking"
                        : "Hospital Check-in & Admission"}
                    </div>
                  </td>

                  <td className="p-4 font-black text-slate-900 text-sm">
                    {formatCurrency(stage.amountUsd)}
                  </td>

                  <td className="p-4">
                    {stage.status === "completed" ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        🟢 Paid ({stage.receiptNumber || "REC-88421"})
                      </span>
                    ) : stage.id === "advance" ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-amber-50 text-amber-700 border border-amber-200 animate-pulse">
                        <span className="w-2 h-2 rounded-full bg-amber-500" />
                        🟡 Pending
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-slate-100 text-slate-600 border border-slate-200">
                        <span className="w-2 h-2 rounded-full bg-slate-400" />
                        ⚪ Locked
                      </span>
                    )}
                  </td>

                  <td className="p-4 text-slate-600 max-w-xs leading-relaxed">
                    {stage.cancellationTerms}
                  </td>

                  <td className="p-4 text-right">
                    {stage.status === "completed" ? (
                      <button
                        onClick={() => setSelectedReceiptStage(stage)}
                        className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-xs transition-colors cursor-pointer inline-flex items-center gap-1.5"
                      >
                        <Receipt className="w-3.5 h-3.5 text-emerald-600" />
                        <span>View Receipt</span>
                      </button>
                    ) : stage.id === "advance" ? (
                      <button
                        onClick={() => setSelectedPayStage(stage)}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs shadow-md shadow-emerald-600/20 active:scale-95 transition-all cursor-pointer inline-flex items-center gap-1.5"
                      >
                        <CreditCard className="w-3.5 h-3.5" />
                        <span>Pay Escrow ({formatCurrency(stage.amountUsd)})</span>
                      </button>
                    ) : (
                      <span className="text-slate-400 font-bold text-xs">
                        Payable at Check-in
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Escrow Modal */}
      {selectedPayStage && (
        <PaymentEscrowModal
          isOpen={!!selectedPayStage}
          onClose={() => setSelectedPayStage(null)}
          caseId={patientCase.id}
          stage={selectedPayStage}
        />
      )}

      {/* Receipt Modal */}
      {selectedReceiptStage && (
        <ReceiptModal
          isOpen={!!selectedReceiptStage}
          onClose={() => setSelectedReceiptStage(null)}
          patientCase={patientCase}
          stage={selectedReceiptStage}
        />
      )}
    </div>
  );
};
