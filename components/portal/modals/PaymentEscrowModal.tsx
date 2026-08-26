"use client";

import React, { useState } from "react";
import {
  CreditCard,
  Lock,
  ShieldCheck,
  CheckCircle2,
  X,
  Sparkles,
  Building,
  ArrowRight,
  DollarSign,
  Receipt,
  AlertCircle,
} from "lucide-react";
import { usePortal } from "@/lib/portal/store";
import { PaymentStage } from "@/types/portal";

interface PaymentEscrowModalProps {
  isOpen: boolean;
  onClose: () => void;
  caseId: string;
  stage: PaymentStage | null;
}

export const PaymentEscrowModal: React.FC<PaymentEscrowModalProps> = ({
  isOpen,
  onClose,
  caseId,
  stage,
}) => {
  const { payStage, formatCurrency, currency } = usePortal();
  const [paymentMethod, setPaymentMethod] = useState<"card" | "wire" | "swift" | "crypto">("card");
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen || !stage) return null;

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsAgreed) return;

    setIsProcessing(true);
    setTimeout(() => {
      payStage(caseId, stage.id, paymentMethod);
      setIsProcessing(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-[120] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#141d60] via-[#1b2360] to-[#101e76] p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base leading-tight">PCI-DSS Escrow Gateway</h3>
              <div className="text-xs text-emerald-300">
                {stage.name} • Certified Healthcare Escrow
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handlePay} className="p-6 space-y-4">
          {/* Amount Display */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
            <div>
              <div className="text-[10px] uppercase font-extrabold tracking-wider text-slate-400">
                Milestone Amount Due
              </div>
              <div className="text-2xl font-black text-slate-900 mt-0.5">
                {formatCurrency(stage.amountUsd)}
              </div>
            </div>

            <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-50 text-amber-800 border border-amber-200">
              Escrow Protected
            </span>
          </div>

          {/* Cancellation Terms */}
          <div className="p-3.5 bg-amber-50/60 rounded-2xl border border-amber-200/80 text-xs text-amber-950 space-y-1">
            <div className="font-bold flex items-center gap-1.5 text-amber-900">
              <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
              <span>Milestone Policy Terms</span>
            </div>
            <p className="text-[11px] leading-relaxed text-amber-800">
              {stage.cancellationTerms || "Non-refundable after hospital suite reservation. Funds held in certified healthcare escrow until check-in."}
            </p>
          </div>

          {/* Payment Method Selector */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              Select Settlement Method
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod("card")}
                className={`p-3 rounded-2xl border flex items-center gap-2 text-xs font-bold transition-all cursor-pointer ${
                  paymentMethod === "card"
                    ? "bg-[#3F4EB4]/10 border-[#3F4EB4] text-[#3F4EB4]"
                    : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span>Credit / Debit Card</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("swift")}
                className={`p-3 rounded-2xl border flex items-center gap-2 text-xs font-bold transition-all cursor-pointer ${
                  paymentMethod === "swift"
                    ? "bg-[#3F4EB4]/10 border-[#3F4EB4] text-[#3F4EB4]"
                    : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                }`}
              >
                <Building className="w-4 h-4" />
                <span>SWIFT / Wire Transfer</span>
              </button>
            </div>
          </div>

          {/* Checkbox agreement */}
          <div className="flex items-start gap-2.5 p-3 bg-slate-50 rounded-2xl border border-slate-200">
            <input
              type="checkbox"
              id="escrow-terms-agreed"
              checked={termsAgreed}
              onChange={(e) => setTermsAgreed(e.target.checked)}
              className="mt-0.5 w-4 h-4 text-[#3F4EB4] rounded border-slate-300 focus:ring-[#3F4EB4] cursor-pointer"
            />
            <label htmlFor="escrow-terms-agreed" className="text-xs text-slate-700 font-semibold cursor-pointer">
              I agree to the milestone terms and authorize locking {formatCurrency(stage.amountUsd)} in healthcare escrow.
            </label>
          </div>

          {/* Footer Actions */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-700">
              <ShieldCheck className="w-4 h-4" />
              <span>TLS 1.3 / PCI-DSS L1</span>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!termsAgreed || isProcessing}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 disabled:opacity-50 text-white text-xs font-black shadow-lg shadow-emerald-600/20 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span>{isProcessing ? "Processing Escrow..." : `Pay ${formatCurrency(stage.amountUsd)}`}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
