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
  HelpCircle,
  Phone,
} from "lucide-react";
import { PatientCase, PaymentStage } from "@/types/portal";
import { usePortal } from "@/lib/portal/store";
import { PaymentEscrowModal } from "../../modals/PaymentEscrowModal";
import { ReceiptModal } from "../../modals/ReceiptModal";
import { WhatsAppContactModal } from "../../modals/WhatsAppContactModal";

interface PatientPaymentEscrowViewProps {
  patientCase: PatientCase;
}

export const PatientPaymentEscrowView: React.FC<PatientPaymentEscrowViewProps> = ({
  patientCase,
}) => {
  const { formatCurrency, currency } = usePortal();
  const [selectedPayStage, setSelectedPayStage] = useState<PaymentStage | null>(null);
  const [selectedReceiptStage, setSelectedReceiptStage] = useState<PaymentStage | null>(null);
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);

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
            <Receipt className="w-3.5 h-3.5 text-[#2ECDC5]" />
            Simple Payment Steps
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Your Payments
          </h2>
          <p className="text-slate-500 text-sm mt-1 max-w-xl">
            Track and complete your treatment payments step by step. Your money is held in a protected healthcare account until each stage of care is delivered.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200 w-full sm:w-auto justify-between sm:justify-start">
          <div className="text-left sm:text-right">
            <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Paid So Far</div>
            <div className="text-lg font-black text-emerald-700">
              {formatCurrency(totalPaid)}
            </div>
          </div>
          <div className="h-8 w-px bg-slate-200" />
          <div className="text-left sm:text-right">
            <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Remaining Balance</div>
            <div className="text-lg font-black text-slate-900">
              {formatCurrency(remainingBalance)}
            </div>
          </div>
        </div>
      </div>

      {/* Staged Escrow Progress Tracker */}
      <div className="bg-gradient-to-br from-[#141d60] via-[#1b2360] to-[#101e76] rounded-3xl p-5 sm:p-7 text-white shadow-xl border border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#2ECDC5]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex items-center gap-2.5 mb-5 relative z-10">
          <div className="w-8 h-8 rounded-xl bg-[#2ECDC5]/20 flex items-center justify-center">
            <ShieldCheck className="w-4 h-4 text-[#2ECDC5]" />
          </div>
          <div>
            <div className="text-sm font-black text-white">Staged Escrow Payment Tracker</div>
            <div className="text-[11px] text-slate-300">Funds held securely at each milestone — released only upon delivery</div>
          </div>
        </div>

        <div className="relative z-10">
          {/* Progress Line */}
          <div className="absolute top-[22px] left-[24px] right-[24px] h-0.5 bg-white/10 rounded-full hidden sm:block" />
          <div
            className="absolute top-[22px] left-[24px] h-0.5 bg-gradient-to-r from-emerald-400 to-[#2ECDC5] rounded-full hidden sm:block"
            style={{ width: totalPaid >= 3000 ? (totalPaid >= 18000 ? "100%" : "50%") : "0%" }}
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Stage 1 */}
            <div className={`relative p-4 rounded-2xl border space-y-2 ${totalPaid >= 3000 ? "bg-emerald-500/15 border-emerald-400/30" : "bg-white/5 border-white/15"}`}>
              <div className="flex items-center gap-2">
                <div className={`w-11 h-11 rounded-full flex items-center justify-center font-black text-sm shadow-md ${totalPaid >= 3000 ? "bg-emerald-500 text-white" : "bg-slate-600 text-slate-300"}`}>
                  {totalPaid >= 3000 ? <CheckCircle2 className="w-5 h-5" /> : "1"}
                </div>
                <div>
                  <div className={`text-xs font-extrabold ${totalPaid >= 3000 ? "text-emerald-300" : "text-slate-300"}`}>Stage 1</div>
                  <div className="text-[11px] text-slate-400">Booking Deposit</div>
                </div>
              </div>
              <div className="text-xl font-black text-white">{formatCurrency(3000)}</div>
              <div className={`text-[11px] font-bold ${totalPaid >= 3000 ? "text-emerald-400" : "text-slate-400"}`}>
                {totalPaid >= 3000 ? "✓ Escrow Held" : "Pending payment"}
              </div>
            </div>

            {/* Stage 2 */}
            <div className={`relative p-4 rounded-2xl border space-y-2 ${totalPaid >= 18000 ? "bg-emerald-500/15 border-emerald-400/30" : "bg-white/5 border-white/15"}`}>
              <div className="flex items-center gap-2">
                <div className={`w-11 h-11 rounded-full flex items-center justify-center font-black text-sm shadow-md ${totalPaid >= 18000 ? "bg-emerald-500 text-white" : "bg-slate-600 text-slate-300"}`}>
                  {totalPaid >= 18000 ? <CheckCircle2 className="w-5 h-5" /> : "2"}
                </div>
                <div>
                  <div className={`text-xs font-extrabold ${totalPaid >= 18000 ? "text-emerald-300" : "text-slate-300"}`}>Stage 2</div>
                  <div className="text-[11px] text-slate-400">Hospital Advance</div>
                </div>
              </div>
              <div className="text-xl font-black text-white">{formatCurrency(15000)}</div>
              <div className="text-[11px] text-slate-400">Due 30 days before admission</div>
            </div>

            {/* Stage 3 */}
            <div className="relative p-4 rounded-2xl border space-y-2 bg-white/5 border-white/15">
              <div className="flex items-center gap-2">
                <div className="w-11 h-11 rounded-full bg-slate-600 text-slate-300 flex items-center justify-center font-black text-sm shadow-md">
                  3
                </div>
                <div>
                  <div className="text-xs font-extrabold text-slate-300">Stage 3</div>
                  <div className="text-[11px] text-slate-400">Final Settlement</div>
                </div>
              </div>
              <div className="text-xl font-black text-white">{formatCurrency(10500)}</div>
              <div className="text-[11px] text-slate-400">Due on hospital admission day</div>
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 mt-2 border-t border-white/10 text-xs font-bold">
            <span className="text-slate-300">Total Package:</span>
            <span className="text-[#2ECDC5] text-base font-black">{formatCurrency(totalPackageCost)}</span>
          </div>
        </div>
      </div>


      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-lg font-black text-slate-900 tracking-tight">
            Your 3 Payment Stages
          </h3>
          <span className="text-xs text-slate-500 font-medium">
            Stage 2 is active now
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {patientCase.payments.map((stage, idx) => {
            const isCompleted = stage.status === "completed";
            const isDueNow = stage.id === "advance" && !isCompleted;
            const isFuture = stage.id === "final" && !isCompleted;

            return (
              <div
                key={stage.id}
                className={`rounded-3xl p-6 sm:p-7 border transition-all ${
                  isDueNow
                    ? "bg-white border-[#2ECDC5] shadow-lg shadow-[#2ECDC5]/10 ring-2 ring-[#2ECDC5]/30"
                    : isCompleted
                    ? "bg-white border-slate-200/90 shadow-[0_6px_32px_rgba(0,0,0,0.04)]"
                    : "bg-slate-50/70 border-slate-200/60 opacity-80"
                }`}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    {/* Stage Number / Status Icon */}
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-base shrink-0 ${
                        isCompleted
                          ? "bg-emerald-100 text-emerald-700"
                          : isDueNow
                          ? "bg-[#141d60] text-[#2ECDC5] ring-2 ring-[#2ECDC5]/40"
                          : "bg-slate-200 text-slate-500"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-6 h-6" />
                      ) : (
                        <span>{idx + 1}</span>
                      )}
                    </div>

                    <div>
                      <div className="flex items-center gap-2.5">
                        <h4 className="font-extrabold text-base text-slate-900">
                          {stage.name}
                        </h4>

                        {isCompleted && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-black bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            Paid
                          </span>
                        )}

                        {isDueNow && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-50 text-amber-700 border border-amber-200 animate-pulse">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                            Due Now
                          </span>
                        )}

                        {isFuture && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-500 border border-slate-200">
                            Payable at Hospital
                          </span>
                        )}
                      </div>

                      {/* Plain Language Explanation */}
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed max-w-xl">
                        {stage.id === "deposit" && (
                          <span>
                            Secured your official government visa invitation letter and hospital priority booking.
                          </span>
                        )}
                        {stage.id === "advance" && (
                          <span className="font-medium text-slate-800">
                            This payment secures your surgery date and reserves your private hospital suite. Due by <strong>Aug 30</strong>.
                          </span>
                        )}
                        {stage.id === "final" && (
                          <span>
                            You will only pay this remaining balance when you check in at Medanta hospital on <strong>Sep 1</strong>.
                          </span>
                        )}
                      </p>

                      {stage.cancellationTerms && (
                        <span className="text-[11px] text-slate-400 block mt-1">
                          {stage.cancellationTerms}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Amount & Action */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100 gap-3">
                    <div className="text-left sm:text-right">
                      <div className="text-xs text-slate-400 font-bold uppercase">Amount</div>
                      <div className="text-xl font-black text-slate-900">
                        {formatCurrency(stage.amountUsd)}
                      </div>
                    </div>

                    {isCompleted ? (
                      <button
                        onClick={() => setSelectedReceiptStage(stage)}
                        className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-xs transition-colors cursor-pointer inline-flex items-center gap-1.5"
                      >
                        <Receipt className="w-4 h-4 text-emerald-600" />
                        <span>View Receipt</span>
                      </button>
                    ) : isDueNow ? (
                      <button
                        onClick={() => setSelectedPayStage(stage)}
                        className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs shadow-lg shadow-emerald-600/25 active:scale-95 transition-all cursor-pointer inline-flex items-center gap-2"
                      >
                        <CreditCard className="w-4 h-4" />
                        <span>Pay {formatCurrency(stage.amountUsd)}</span>
                      </button>
                    ) : (
                      <span className="text-slate-400 font-bold text-xs">
                        Unlocks at check-in
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reassurance Banner */}
      <div className="bg-emerald-50/70 border border-emerald-200 rounded-3xl p-6 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-extrabold text-sm text-emerald-950">
              Safe & Protected Payments
            </h4>
            <p className="text-xs text-emerald-800 mt-0.5">
              Your payments are held in certified healthcare escrow and released only as each medical step is completed.
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsWhatsAppOpen(true)}
          className="text-xs font-bold text-emerald-800 hover:underline cursor-pointer shrink-0"
        >
          Have payment questions? Talk to Coordinator
        </button>
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
