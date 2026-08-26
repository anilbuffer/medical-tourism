"use client";

import React, { useState } from "react";
import {
  CreditCard,
  Building2,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  ShieldCheck,
  Check,
  ChevronRight,
  Download,
  AlertCircle,
  HelpCircle,
  Lock,
} from "lucide-react";
import { PatientCase } from "@/types/portal";
import { usePortal } from "@/lib/portal/store";

interface PatientPackageQuoteViewProps {
  patientCase: PatientCase;
  onNavigateToPayments?: () => void;
}

export const PatientPackageQuoteView: React.FC<PatientPackageQuoteViewProps> = ({
  patientCase,
  onNavigateToPayments,
}) => {
  const { respondToQuote, formatCurrency, currency } = usePortal();
  const quote = patientCase.quote;
  const [decisionState, setDecisionState] = useState<"none" | "accepted" | "declined" | "change_requested">(
    quote?.status === "accepted" ? "accepted" : "none"
  );
  const [modNotes, setModNotes] = useState("");
  const [showModModal, setShowModModal] = useState(false);

  const handleAccept = () => {
    respondToQuote(patientCase.id, "accepted");
    setDecisionState("accepted");
    if (onNavigateToPayments) {
      setTimeout(() => onNavigateToPayments(), 600);
    }
  };

  const handleDecline = () => {
    if (confirm("Are you sure you want to decline this quotation package?")) {
      respondToQuote(patientCase.id, "declined", "Patient opted for alternative timing/tier.");
      setDecisionState("declined");
    }
  };

  const handleRequestMod = (e: React.FormEvent) => {
    e.preventDefault();
    respondToQuote(patientCase.id, "change_requested", modNotes);
    setDecisionState("change_requested");
    setShowModModal(false);
  };

  const totalAmount = quote?.totalCostUsd || 28500;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2ECDC5]/10 text-[#3F4EB4] text-xs font-extrabold uppercase tracking-wider mb-2 border border-[#2ECDC5]/20">
            <CreditCard className="w-3.5 h-3.5 text-[#2ECDC5]" />
            All-Inclusive Treatment Quotation Desk
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Surgical Package & Treatment Quote View
          </h2>
          <p className="text-slate-500 text-sm mt-1 max-w-xl">
            Complete hospital surgical quotation converted by Care Coordination from Dr. Subhash Gupta's clinical estimate.
          </p>
        </div>

        <div className="text-right">
          <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
            Total Package Amount
          </div>
          <div className="text-3xl font-black text-slate-900 mt-0.5">
            {formatCurrency(totalAmount)}
          </div>
          <div className="text-[11px] text-emerald-600 font-bold">
            All-Inclusive Escrow Guaranteed
          </div>
        </div>
      </div>

      {/* Package Breakdown Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Package Specs & Breakdown */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="font-extrabold text-base text-slate-900">
                  Living Donor Liver Transplant (LDLT)
                </h3>
                <div className="text-xs text-slate-500">
                  Medanta – The Medicity, Delhi NCR • Surgical Team: Led by Dr. Subhash Gupta
                </div>
              </div>

              <span className="px-3 py-1 rounded-full text-xs font-black bg-[#2ECDC5]/10 text-[#3F4EB4] border border-[#2ECDC5]/30">
                Premium VIP Tier
              </span>
            </div>

            {/* Inclusions list */}
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-3">
                Package Breakdown & Key Inclusions
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block">Hospital Stay: 14 Days</strong>
                    <span className="text-slate-500 text-[11px]">Private Suite + ICU Isolation</span>
                  </div>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block">Surgeon & Anesthesia Fees</strong>
                    <span className="text-slate-500 text-[11px]">Included (Led by Dr. Subhash Gupta)</span>
                  </div>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block">5-Star Executive Apartment</strong>
                    <span className="text-slate-500 text-[11px]">For Attendant / Living Donor</span>
                  </div>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block">Airport VIP Transfer & Translator</strong>
                    <span className="text-slate-500 text-[11px]">Chauffeur at Gate 5 + Arabic Translator</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Cost Breakdown Table */}
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-2">
                Itemized Cost Breakdown
              </span>
              <div className="border border-slate-200 rounded-2xl overflow-hidden text-xs">
                <div className="divide-y divide-slate-100">
                  <div className="p-3 flex justify-between bg-slate-50/50">
                    <span className="text-slate-600">Surgeon, Anesthesia & Clinical Board Fees</span>
                    <span className="font-bold text-slate-900">{formatCurrency(9000)}</span>
                  </div>
                  <div className="p-3 flex justify-between">
                    <span className="text-slate-600">Hospital Operating Theatre & Transplant Isolation</span>
                    <span className="font-bold text-slate-900">{formatCurrency(8500)}</span>
                  </div>
                  <div className="p-3 flex justify-between bg-slate-50/50">
                    <span className="text-slate-600">Living Donor Evaluation & Surgical Hepatectomy</span>
                    <span className="font-bold text-slate-900">{formatCurrency(5500)}</span>
                  </div>
                  <div className="p-3 flex justify-between">
                    <span className="text-slate-600">14 Nights Private Suite Accommodation & ICU</span>
                    <span className="font-bold text-slate-900">{formatCurrency(3500)}</span>
                  </div>
                  <div className="p-3 flex justify-between bg-slate-50/50">
                    <span className="text-slate-600">Executive Concierge Inclusions (Apartment, Airport Chauffeur, Translator)</span>
                    <span className="font-bold text-slate-900">{formatCurrency(2000)}</span>
                  </div>
                </div>
                <div className="p-4 bg-slate-100 font-extrabold flex justify-between text-sm border-t border-slate-200">
                  <span className="text-slate-900">Total Fixed Package Quote:</span>
                  <span className="text-emerald-700 font-black text-base">{formatCurrency(totalAmount)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Action Triggers & Decision Card */}
        <div className="space-y-6">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h4 className="font-black text-sm text-slate-900">Quotation Actions</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Review and confirm your treatment package. Accepting locks your operating room slot and initiates Stage 2 Advance escrow.
            </p>

            {decisionState === "accepted" ? (
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <div className="font-black text-sm text-emerald-900">Package Accepted</div>
                <p className="text-xs text-emerald-700">
                  Your living donor liver transplant slot is reserved. Proceed to staged escrow payments.
                </p>
                {onNavigateToPayments && (
                  <button
                    onClick={onNavigateToPayments}
                    className="w-full mt-2 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black shadow-md cursor-pointer"
                  >
                    Go to Escrow Ledger
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-2.5">
                <button
                  onClick={handleAccept}
                  className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs shadow-lg shadow-emerald-600/25 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  <span>Accept Package</span>
                </button>

                <button
                  onClick={() => setShowModModal(true)}
                  className="w-full py-3 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors cursor-pointer"
                >
                  Request Package Modification
                </button>

                <button
                  onClick={handleDecline}
                  className="w-full py-3 px-4 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs transition-colors cursor-pointer"
                >
                  Decline Package
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modification Request Modal */}
      {showModModal && (
        <div className="fixed inset-0 z-[120] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg p-6 space-y-4 shadow-2xl border border-slate-200">
            <h3 className="text-base font-extrabold text-slate-900">Request Package Modification</h3>
            <p className="text-xs text-slate-500">
              Let Care Coordinator Ananya know what adjustments you require (e.g. attendant apartment extension, private nurse, flight assistance).
            </p>
            <form onSubmit={handleRequestMod} className="space-y-4">
              <textarea
                rows={4}
                required
                value={modNotes}
                onChange={(e) => setModNotes(e.target.value)}
                placeholder="Describe your requested adjustments..."
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-900 focus:outline-none focus:border-[#3F4EB4]"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModModal(false)}
                  className="px-4 py-2 rounded-xl border text-xs font-bold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#2ECDC5] text-slate-950 text-xs font-black shadow-md"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
