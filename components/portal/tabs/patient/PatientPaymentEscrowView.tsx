"use client";

import React, { useState } from "react";
import {
  CreditCard,
  CheckCircle2,
  Lock,
  Receipt,
  ShieldCheck,
  Phone,
  MessageSquare,
  Sparkles,
  ArrowRight,
  Clock,
  Wallet,
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

  // Active stage determination (focus on current milestone)
  const depositStage = patientCase.payments.find((p) => p.id === "deposit") || patientCase.payments[0];
  const advanceStage = patientCase.payments.find((p) => p.id === "advance") || patientCase.payments[1];
  const finalStage = patientCase.payments.find((p) => p.id === "final") || patientCase.payments[2];

  const isDepositPaid = depositStage?.status === "completed";
  const isAdvancePaid = advanceStage?.status === "completed";
  const isFinalPaid = finalStage?.status === "completed";

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2ECDC5]/10 text-[#3F4EB4] text-xs font-extrabold uppercase tracking-wider mb-2 border border-[#2ECDC5]/20">
            <Receipt className="w-3.5 h-3.5 text-[#2ECDC5]" />
            Clear & Simple Payments
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

      {/* Progressive Step-by-Step Payment Guidance (One stage at a time) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <div>
            <h3 className="text-lg font-black text-slate-900 tracking-tight">
              Payment Schedule & Explanations
            </h3>
            <p className="text-xs text-slate-500">
              Each payment is clearly linked to a specific step in your treatment
            </p>
          </div>
        </div>

        {/* Stage 1 Card */}
        <div
          className={`rounded-3xl p-6 sm:p-7 border transition-all ${
            isDepositPaid
              ? "bg-white border-slate-200/90 shadow-sm"
              : "bg-white border-[#2ECDC5] ring-2 ring-[#2ECDC5]/30 shadow-lg shadow-[#2ECDC5]/10"
          }`}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-base shrink-0 ${
                  isDepositPaid ? "bg-emerald-100 text-emerald-700" : "bg-[#141d60] text-[#2ECDC5]"
                }`}
              >
                {isDepositPaid ? <CheckCircle2 className="w-6 h-6" /> : "1"}
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h4 className="font-extrabold text-base text-slate-900">
                    Stage 1 — Booking Deposit
                  </h4>
                  {isDepositPaid ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-black bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Paid & Protected
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-50 text-amber-700 border border-amber-200 animate-pulse">
                      Due Now
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-600 leading-relaxed max-w-xl font-medium">
                  This payment secures your official government visa invitation letter and reserves your hospital priority booking.
                </p>

                <div className="text-[11px] text-slate-400">
                  Fully refundable if cancelled at least 30 days before hospital admission.
                </div>
              </div>
            </div>

            <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100 gap-3">
              <div className="text-left sm:text-right">
                <div className="text-xs text-slate-400 font-bold uppercase">Amount</div>
                <div className="text-xl font-black text-slate-900">{formatCurrency(3000)}</div>
              </div>

              {isDepositPaid ? (
                <button
                  onClick={() => setSelectedReceiptStage(depositStage)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-xs transition-colors cursor-pointer inline-flex items-center gap-1.5"
                >
                  <Receipt className="w-4 h-4 text-emerald-600" />
                  <span>View Receipt</span>
                </button>
              ) : (
                <button
                  onClick={() => setSelectedPayStage(depositStage)}
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs shadow-md shadow-emerald-600/25 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Pay {formatCurrency(3000)}</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Stage 2 Card */}
        <div
          className={`rounded-3xl p-6 sm:p-7 border transition-all ${
            isAdvancePaid
              ? "bg-white border-slate-200/90 shadow-sm"
              : isDepositPaid
              ? "bg-white border-[#2ECDC5] ring-2 ring-[#2ECDC5]/30 shadow-lg shadow-[#2ECDC5]/10"
              : "bg-slate-50/60 border-slate-200 opacity-75"
          }`}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-base shrink-0 ${
                  isAdvancePaid
                    ? "bg-emerald-100 text-emerald-700"
                    : isDepositPaid
                    ? "bg-[#141d60] text-[#2ECDC5]"
                    : "bg-slate-200 text-slate-500"
                }`}
              >
                {isAdvancePaid ? <CheckCircle2 className="w-6 h-6" /> : "2"}
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h4 className="font-extrabold text-base text-slate-900">
                    Stage 2 — Hospital Booking Advance
                  </h4>
                  {isAdvancePaid ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-black bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Paid & Protected
                    </span>
                  ) : isDepositPaid ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-50 text-amber-700 border border-amber-200 animate-pulse">
                      Active Step • Due by Aug 30
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-500 border border-slate-200">
                      Next Step
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-700 font-medium leading-relaxed max-w-xl">
                  This payment secures your surgery date with Dr. Subhash Gupta and reserves your private hospital suite. Due by <strong>Aug 30</strong>.
                </p>

                <div className="text-[11px] text-slate-400">
                  70% refundable if cancelled 15–30 days before procedure date.
                </div>
              </div>
            </div>

            <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100 gap-3">
              <div className="text-left sm:text-right">
                <div className="text-xs text-slate-400 font-bold uppercase">Amount</div>
                <div className="text-xl font-black text-slate-900">{formatCurrency(15000)}</div>
              </div>

              {isAdvancePaid ? (
                <button
                  onClick={() => setSelectedReceiptStage(advanceStage)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-xs transition-colors cursor-pointer inline-flex items-center gap-1.5"
                >
                  <Receipt className="w-4 h-4 text-emerald-600" />
                  <span>View Receipt</span>
                </button>
              ) : isDepositPaid ? (
                <button
                  onClick={() => setSelectedPayStage(advanceStage)}
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs shadow-md shadow-emerald-600/25 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Pay {formatCurrency(15000)}</span>
                </button>
              ) : (
                <span className="text-xs font-bold text-slate-400">
                  Unlocks after Stage 1
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Stage 3 Card (Progressive disclosure: clear and calm) */}
        <div className="bg-slate-50/60 rounded-3xl p-6 sm:p-7 border border-slate-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-slate-200 text-slate-500 flex items-center justify-center font-black text-base shrink-0">
                3
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h4 className="font-extrabold text-base text-slate-800">
                    Stage 3 — Final Settlement
                  </h4>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-500 border border-slate-200">
                    Payable at Hospital Check-in
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed max-w-xl">
                  You will only pay this remaining balance when you check in at Medanta Hospital in New Delhi on <strong>Sep 1</strong>.
                </p>

                <div className="text-[11px] text-slate-400">
                  Can be settled via international card or hospital billing counter.
                </div>
              </div>
            </div>

            <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100 gap-3">
              <div className="text-left sm:text-right">
                <div className="text-xs text-slate-400 font-bold uppercase">Amount</div>
                <div className="text-xl font-black text-slate-900">{formatCurrency(10500)}</div>
              </div>

              <span className="text-xs font-bold text-slate-400">
                Due upon arrival
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Human Protection Reassurance Banner */}
      <div className="bg-emerald-50/70 border border-emerald-200 rounded-3xl p-6 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-extrabold text-sm text-emerald-950">
              Protected Healthcare Account
            </h4>
            <p className="text-xs text-emerald-800 mt-0.5">
              Your payments are held securely in a dedicated medical account and released to the hospital only as each treatment stage is completed.
            </p>
          </div>
        </div>

        <a
          href="tel:+919810188412"
          className="text-xs font-black text-emerald-900 hover:underline cursor-pointer shrink-0"
        >
          Have questions? Call Coordinator
        </a>
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
