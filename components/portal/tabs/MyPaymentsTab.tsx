"use client";

import React, { useState } from "react";
import { PatientCase, PaymentStage, PaymentStageId } from "@/types/portal";
import { usePortal } from "@/lib/portal/store";
import {
  CreditCard,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Lock,
  Download,
  FileText,
  AlertCircle,
  X,
  Sparkles,
  DollarSign,
  ArrowRight,
  Receipt,
  Building,
  Check,
} from "lucide-react";

interface MyPaymentsTabProps {
  patientCase: PatientCase;
}

export const MyPaymentsTab: React.FC<MyPaymentsTabProps> = ({ patientCase }) => {
  const { payStage, recordConsent } = usePortal();

  // Payment Modal State
  const [selectedStageForPayment, setSelectedStageForPayment] = useState<PaymentStage | null>(null);
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "wire" | "swift" | "crypto">("card");
  const [isProcessing, setIsProcessing] = useState(false);

  // Receipt Modal State
  const [activeReceiptStage, setActiveReceiptStage] = useState<PaymentStage | null>(null);

  const totalPackageCost = patientCase.payments.reduce((sum, p) => sum + p.amountUsd, 0);
  const totalPaid = patientCase.payments
    .filter((p) => p.status === "completed")
    .reduce((sum, p) => sum + p.amountUsd, 0);
  const remainingBalance = totalPackageCost - totalPaid;

  const handleOpenPayment = (stage: PaymentStage) => {
    setSelectedStageForPayment(stage);
    setTermsAgreed(false);
    setPaymentMethod("card");
  };

  const handleExecutePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStageForPayment || !termsAgreed) return;

    setIsProcessing(true);

    setTimeout(() => {
      // 1. Record mandatory consent for this stage's terms
      recordConsent(
        patientCase.id,
        "payment_staged_terms",
        `${selectedStageForPayment.name} Terms Acceptance`,
        selectedStageForPayment.cancellationTerms,
        selectedStageForPayment.id
      );

      // 2. Pay stage
      const result = payStage(patientCase.id, selectedStageForPayment.id, paymentMethod);

      setIsProcessing(false);
      setSelectedStageForPayment(null);
    }, 1000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2ECDC5]/10 text-[#3F4EB4] text-xs font-bold tracking-wider uppercase mb-2 border border-[#2ECDC5]/20">
            <Lock className="w-3.5 h-3.5 text-[#2ECDC5]" />
            Healthcare Escrow & Staged Settlement
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Staged Milestone Payments
          </h2>
          <p className="text-slate-500 text-sm mt-1 max-w-xl">
            Pay safely in 3 milestones. Each stage contains independent cancellation & refund terms which must be accepted prior to checkout. Funds are protected in certified escrow.
          </p>
        </div>

        {/* Balance Metrics */}
        <div className="flex items-center gap-3 bg-slate-50/80 p-3 rounded-2xl border border-slate-200 shadow-xs">
          <div className="px-3 py-1 text-right">
            <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Total Paid</div>
            <div className="text-base font-extrabold text-[#3F4EB4]">
              ${totalPaid.toLocaleString()} USD
            </div>
          </div>
          <div className="h-8 w-px bg-slate-200" />
          <div className="px-3 py-1">
            <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Remaining</div>
            <div className="text-base font-extrabold text-slate-900">
              ${remainingBalance.toLocaleString()} USD
            </div>
          </div>
        </div>
      </div>

      {/* 3 Staged Payment Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {patientCase.payments.map((stage, idx) => {
          const isCompleted = stage.status === "completed";
          const isCurrentActive =
            !isCompleted &&
            (idx === 0 || patientCase.payments[idx - 1].status === "completed");

          return (
            <div
              key={stage.id}
              className={`rounded-2xl p-6 border flex flex-col justify-between transition-all duration-300 ${isCompleted
                ? "bg-white/95 backdrop-blur-xl border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)]"
                : isCurrentActive
                  ? "bg-white/95 backdrop-blur-xl border-[#2ECDC5] shadow-[0_10px_40px_rgba(46,205,197,0.15)] ring-2 ring-[#2ECDC5]/30 hover:-translate-y-1"
                  : "bg-slate-50/70 border-slate-200 opacity-75"
                }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider ${isCompleted
                      ? "bg-emerald-100 text-emerald-800"
                      : isCurrentActive
                        ? "bg-[#2ECDC5]/20 text-[#3F4EB4]"
                        : "bg-slate-200 text-slate-700"
                      }`}
                  >
                    Stage {idx + 1} • {stage.percentage}%
                  </span>
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5 text-[#2ECDC5]" />
                  ) : (
                    <Clock className="w-5 h-5 text-slate-400" />
                  )}
                </div>

                <div>
                  <h3 className="font-extrabold text-slate-900 text-lg">{stage.name}</h3>
                  <div className="text-2xl font-black text-slate-900 mt-2">
                    ${stage.amountUsd.toLocaleString()}{" "}
                    <span className="text-xs font-bold text-slate-500">USD</span>
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5 font-medium">
                    Due: {stage.dueDate}
                  </div>
                </div>

                {/* Terms Box */}
                <div className="p-3.5 bg-slate-50/80 rounded-2xl text-xs space-y-2 border border-slate-200">
                  <div className="font-bold text-slate-800 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#2ECDC5]" />
                    <span>Refund & Cancellation Terms:</span>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    {stage.cancellationTerms}
                  </p>
                  <div className="text-[11px] font-semibold text-[#3F4EB4] pt-1 border-t border-slate-200/60">
                    Policy: {stage.refundPolicy}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-6">
                {isCompleted ? (
                  <button
                    onClick={() => setActiveReceiptStage(stage)}
                    className="w-full py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Receipt className="w-4 h-4 text-[#2ECDC5]" />
                    <span>View Official Receipt</span>
                  </button>
                ) : isCurrentActive ? (
                  <button
                    onClick={() => handleOpenPayment(stage)}
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#2ECDC5] via-[#2ECDC5] to-[#2abdb5]  text-white font-extrabold text-xs shadow-xl shadow-[#283593]/25 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Lock className="w-4 h-4" />
                    <span>Accept Terms & Pay Stage</span>
                  </button>
                ) : (
                  <div className="text-center py-2.5 text-xs text-slate-400 font-bold">
                    Unlocks after previous stage
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ================= Payment Checkout & Terms Acceptance Modal ================= */}
      {selectedStageForPayment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-xs uppercase font-extrabold tracking-wider text-teal-700">
                  Staged Escrow Checkout
                </span>
                <h3 className="text-xl font-black text-slate-900">
                  {selectedStageForPayment.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedStageForPayment(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleExecutePayment} className="space-y-4">
              {/* Payment Amount Card */}
              <div className="p-4 bg-slate-900 text-white rounded-2xl flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-400 uppercase">Amount Due Now</div>
                  <div className="text-2xl font-black text-emerald-400">
                    ${selectedStageForPayment.amountUsd.toLocaleString()} USD
                  </div>
                </div>
                <div className="text-xs text-slate-300 text-right">
                  <span>Protected by Healthcare Escrow</span>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Select Payment Method
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("card")}
                    className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${paymentMethod === "card"
                      ? "bg-[#0E1F40] text-white border-[#0E1F40]"
                      : "bg-slate-50 text-slate-700 border-slate-200"
                      }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Credit / Debit Card</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("swift")}
                    className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${paymentMethod === "swift"
                      ? "bg-[#0E1F40] text-white border-[#0E1F40]"
                      : "bg-slate-50 text-slate-700 border-slate-200"
                      }`}
                  >
                    <Building className="w-4 h-4" />
                    <span>International SWIFT Wire</span>
                  </button>
                </div>
              </div>

              {/* Mandatory Cancellation Terms Agreement (Enforced) */}
              <div className="p-4 bg-amber-50/80 rounded-2xl border border-amber-200 space-y-2.5">
                <div className="font-extrabold text-xs text-amber-900 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  <span>Mandatory Cancellation & Refund Terms</span>
                </div>
                <p className="text-xs text-amber-950 leading-relaxed">
                  {selectedStageForPayment.cancellationTerms}
                </p>

                <div className="flex items-start gap-2.5 pt-2 border-t border-amber-200">
                  <input
                    type="checkbox"
                    id="agree_stage_terms"
                    required
                    checked={termsAgreed}
                    onChange={(e) => setTermsAgreed(e.target.checked)}
                    className="mt-0.5 w-4 h-4 text-teal-600 focus:ring-teal-500 rounded border-amber-300 cursor-pointer"
                  />
                  <label
                    htmlFor="agree_stage_terms"
                    className="text-xs font-bold text-slate-900 cursor-pointer leading-tight"
                  >
                    I have read and explicitly agree to the refund & cancellation terms for this {selectedStageForPayment.name}.
                  </label>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-1 text-[11px] text-slate-500 font-semibold">
                  <Lock className="w-3.5 h-3.5 text-emerald-600" />
                  <span>256-Bit SSL Encrypted Checkout</span>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing || !termsAgreed}
                  className="px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs shadow-md transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Authorizing Escrow...</span>
                    </>
                  ) : (
                    <>
                      <span>Complete Secure Payment</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= Receipt Preview Modal ================= */}
      {activeReceiptStage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Receipt className="w-6 h-6 text-teal-600" />
                <h3 className="text-xl font-black text-slate-900">Official Payment Receipt</h3>
              </div>
              <button
                onClick={() => setActiveReceiptStage(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Receipt Body */}
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 font-mono text-xs text-slate-800">
              <div className="flex justify-between">
                <span className="text-slate-500">Receipt No:</span>
                <span className="font-bold text-slate-900">{activeReceiptStage.receiptNumber || "REC-2026-8492-01"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Transaction ID:</span>
                <span className="font-bold text-slate-900">{activeReceiptStage.transactionId || "TXN_STRIPE_984129480"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Patient:</span>
                <span className="font-bold text-slate-900">{patientCase.patientName} ({patientCase.id})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Milestone:</span>
                <span className="font-bold text-slate-900">{activeReceiptStage.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Payment Method:</span>
                <span className="font-bold text-slate-900 uppercase">{activeReceiptStage.paymentMethod || "CARD"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Date Paid:</span>
                <span className="font-bold text-slate-900">
                  {activeReceiptStage.paidAt ? new Date(activeReceiptStage.paidAt).toUTCString() : "Verified"}
                </span>
              </div>
              <div className="pt-2 border-t border-slate-300 flex justify-between text-sm">
                <span className="font-bold text-slate-900">Total Settled:</span>
                <span className="font-black text-emerald-700">${activeReceiptStage.amountUsd.toLocaleString()} USD</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setActiveReceiptStage(null)}
                className="flex-1 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs"
              >
                Close Receipt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
