"use client";

import React, { useState } from "react";
import { PatientCase, QuotePackage } from "@/types/portal";
import { usePortal } from "@/lib/portal/store";
import {
  CreditCard,
  Building2,
  UserCheck,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Clock,
  Sparkles,
  FileText,
  DollarSign,
  ShieldCheck,
  Plane,
  Home,
  Check,
  X,
  MessageSquare,
  ArrowRight,
} from "lucide-react";

interface MyQuoteTabProps {
  patientCase: PatientCase;
  onNavigateToPayments?: () => void;
}

export const MyQuoteTab: React.FC<MyQuoteTabProps> = ({ patientCase, onNavigateToPayments }) => {
  const { respondToQuote } = usePortal();
  const quote = patientCase.quote;

  const [declineModalOpen, setDeclineModalOpen] = useState(false);
  const [changeRequestModalOpen, setChangeRequestModalOpen] = useState(false);
  const [declineReason, setDeclineReason] = useState("");
  const [changeNotes, setChangeNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!quote) {
    return (
      <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-sm space-y-4">
        <div className="w-16 h-16 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center mx-auto">
          <Clock className="w-8 h-8" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">Customized Quote in Preparation</h3>
          <p className="text-slate-500 text-sm max-w-md mx-auto mt-1">
            Coordinator Aisha Khan is negotiating all-inclusive hospital rates and specialist fees based on your diagnostic review. Your itemized quote will be posted here shortly.
          </p>
        </div>
      </div>
    );
  }

  const handleAccept = () => {
    respondToQuote(patientCase.id, "accepted");
    if (onNavigateToPayments) {
      onNavigateToPayments();
    }
  };

  const handleDeclineSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!declineReason) return;
    setIsSubmitting(true);
    setTimeout(() => {
      respondToQuote(patientCase.id, "declined", declineReason);
      setIsSubmitting(false);
      setDeclineModalOpen(false);
    }, 500);
  };

  const handleChangeRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!changeNotes) return;
    setIsSubmitting(true);
    setTimeout(() => {
      respondToQuote(patientCase.id, "change_requested", changeNotes);
      setIsSubmitting(false);
      setChangeRequestModalOpen(false);
    }, 500);
  };

  const isAccepted = quote.status === "accepted";
  const isDeclined = quote.status === "declined";
  const isChangeRequested = quote.status === "change_requested";

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Card */}
      <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2ECDC5]/10 text-[#3F4EB4] text-xs font-bold tracking-wider uppercase mb-2 border border-[#2ECDC5]/20">
            <Sparkles className="w-3.5 h-3.5 text-[#2ECDC5]" />
            Official Itemized Package Quote
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {quote.treatmentName}
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            Quote Reference: <span className="font-mono font-bold text-slate-800">{quote.quoteNumber}</span> • Valid until{" "}
            <span className="font-semibold text-slate-800">{new Date(quote.validUntil).toLocaleDateString("en-US")}</span>
          </p>
        </div>

        {/* Status Badge */}
        {isAccepted && (
          <div className="px-4 py-2.5 rounded-2xl bg-[#2ECDC5]/15 text-[#3F4EB4] font-extrabold text-xs flex items-center gap-2 border border-[#2ECDC5]/30">
            <CheckCircle2 className="w-4 h-4 text-[#2ECDC5]" />
            <span>Quote Accepted & Payment Stage Active</span>
          </div>
        )}
        {isDeclined && (
          <div className="px-4 py-2.5 rounded-2xl bg-amber-100 text-amber-800 font-extrabold text-xs flex items-center gap-2 border border-amber-300">
            <Clock className="w-4 h-4 text-amber-600" />
            <span>Routed to Care Nurture Queue</span>
          </div>
        )}
        {isChangeRequested && (
          <div className="px-4 py-2.5 rounded-2xl bg-blue-100 text-blue-800 font-extrabold text-xs flex items-center gap-2 border border-blue-300">
            <HelpCircle className="w-4 h-4 text-blue-600" />
            <span>Revision Under Review by CS</span>
          </div>
        )}
      </div>

      {/* Main Breakdown Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Itemized Line Items & Inclusions */}
        <div className="lg:col-span-2 bg-white/95 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] transition-all duration-300 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <h3 className="font-extrabold text-slate-900 text-lg">Itemized Cost Structure (USD)</h3>
            <span className="text-xs text-slate-500 font-medium">Transparent Fixed-Price Guarantee</span>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3.5 bg-slate-50/80 rounded-2xl border border-slate-100 text-xs sm:text-sm hover:bg-slate-50 transition-colors">
              <span className="font-semibold text-slate-700">Hospital Charges & Operating Theatre Fees</span>
              <span className="font-extrabold text-slate-900">
                ${quote.costBreakdown.hospitalChargesUsd.toLocaleString("en-US")}
              </span>
            </div>

            <div className="flex items-center justify-between p-3.5 bg-slate-50/80 rounded-2xl border border-slate-100 text-xs sm:text-sm hover:bg-slate-50 transition-colors">
              <span className="font-semibold text-slate-700">Lead Surgeon Fee & Anesthesiology Team</span>
              <span className="font-extrabold text-slate-900">
                ${quote.costBreakdown.surgeonAndAnesthesiaUsd.toLocaleString("en-US")}
              </span>
            </div>

            <div className="flex items-center justify-between p-3.5 bg-slate-50/80 rounded-2xl border border-slate-100 text-xs sm:text-sm hover:bg-slate-50 transition-colors">
              <span className="font-semibold text-slate-700">Implants, Consumables & High-End Bioprosthetic Valve</span>
              <span className="font-extrabold text-slate-900">
                ${quote.costBreakdown.implantsAndMedicationUsd.toLocaleString("en-US")}
              </span>
            </div>

            <div className="flex items-center justify-between p-3.5 bg-slate-50/80 rounded-2xl border border-slate-100 text-xs sm:text-sm hover:bg-slate-50 transition-colors">
              <span className="font-semibold text-slate-700">Hospital Stay (1 Night Cardiac ICU + 3 Nights Deluxe Room)</span>
              <span className="font-extrabold text-slate-900">
                ${quote.costBreakdown.stayAndIcuUsd.toLocaleString("en-US")}
              </span>
            </div>

            <div className="flex items-center justify-between p-3.5 bg-slate-50/80 rounded-2xl border border-slate-100 text-xs sm:text-sm hover:bg-slate-50 transition-colors">
              <span className="font-semibold text-slate-700">VIP Concierge, Airport Transfers & Medical Interpreter</span>
              <span className="font-extrabold text-slate-900">
                ${quote.costBreakdown.vipConciergeAndLogisticsUsd.toLocaleString("en-US")}
              </span>
            </div>

            <div className="flex items-center justify-between p-3.5 bg-slate-50/80 rounded-2xl border border-slate-100 text-xs sm:text-sm hover:bg-slate-50 transition-colors">
              <span className="font-semibold text-slate-700">Companion In-Room Stay & Meal Plan</span>
              <span className="font-extrabold text-slate-900">
                ${quote.costBreakdown.companionStayUsd.toLocaleString("en-US")}
              </span>
            </div>
          </div>

          {/* Total Cost Highlight Banner */}
          <div className="p-6 bg-gradient-to-r from-[#141d60] via-[#1b2360] to-[#101e76] rounded-2xl text-white flex items-center justify-between shadow-xl border border-slate-800/80 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#2ECDC5]/15 rounded-full blur-2xl pointer-events-none" />
            <div className="relative z-10">
              <div className="text-xs uppercase tracking-wider text-[#2ECDC5] font-bold">Total All-Inclusive Package</div>
              <div className="text-xs text-slate-300 mt-0.5">No hidden emergency surcharges or extra bed fees</div>
            </div>
            <div className="relative z-10 text-3xl font-black text-white">
              ${quote.totalCostUsd.toLocaleString("en-US")} <span className="text-xs font-bold text-[#2ECDC5]">USD</span>
            </div>
          </div>

          {/* Comprehensive Inclusions & Exclusions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-100 space-y-2">
              <div className="font-extrabold text-xs text-emerald-900 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>What is Included</span>
              </div>
              <ul className="space-y-1.5 text-xs text-emerald-950">
                {quote.inclusions.map((inc, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <div className="font-extrabold text-xs text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <XCircle className="w-4 h-4 text-slate-500" />
                <span>Exclusions / Separate</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-600">
                {quote.exclusions.map((exc, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-slate-400 font-bold">•</span>
                    <span>{exc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right Col: Decision Actions & Policy */}
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] transition-all duration-300 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <h3 className="font-black text-slate-900 text-lg">Patient Package Decision</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Once you accept this quote, your case moves to Staged Payments (15% Deposit) to confirm hospital reservation and generate your official Indian Medical Visa invitation letter.
            </p>

            <div className="p-4 bg-[#2ECDC5]/10 rounded-2xl border border-[#2ECDC5]/20 text-xs text-[#3F4EB4] space-y-2">
              <div className="font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#2ECDC5]" />
                <span>Escrow Refund Guarantee</span>
              </div>
              <p className="text-slate-700 leading-relaxed">
                If your visa is not approved by the Indian Embassy, your deposit is 100% refundable upon receipt of refusal notice.
              </p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-3">
            {!isAccepted && (
              <button
                onClick={handleAccept}
                className="w-full py-4 rounded-2xl  bg-gradient-to-r from-[#1d8983] via-[#1baba4] to-[#1d8983] text-white font-extrabold text-sm shadow-xl shadow-[#283593]/25 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Check className="w-5 h-5" />
                <span>Accept Quote & Proceed to Staged Payment</span>
              </button>
            )}

            {isAccepted && (
              <button
                onClick={onNavigateToPayments}
                className="w-full py-4 rounded-2xl  bg-gradient-to-r from-[#1d8983] via-[#1baba4] to-[#1d8983] text-white font-extrabold text-sm shadow-xl shadow-[#283593]/25 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                <CreditCard className="w-5 h-5" />
                <span>Go to Staged Payments Dashboard</span>
              </button>
            )}

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setChangeRequestModalOpen(true)}
                className="py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-all cursor-pointer"
              >
                Request Changes
              </button>
              <button
                onClick={() => setDeclineModalOpen(true)}
                className="py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs border border-rose-200 transition-all cursor-pointer"
              >
                Decline Quote
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ================= Request Changes Modal ================= */}
      {changeRequestModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-xl font-black text-slate-900">Request Quotation Changes</h3>
              <button
                onClick={() => setChangeRequestModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleChangeRequestSubmit} className="space-y-4">
              <p className="text-xs text-slate-600">
                Let coordinator Aisha Khan know what you would like adjusted (e.g. room category upgrade, alternative travel dates, other hospital options).
              </p>
              <textarea
                rows={4}
                required
                placeholder="e.g. I would like to explore 5-star hotel apartment options for my companion during my stay..."
                value={changeNotes}
                onChange={(e) => setChangeNotes(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setChangeRequestModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !changeNotes}
                  className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs"
                >
                  Submit Revision Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= Decline Quote Modal (Routes to Nurture) ================= */}
      {declineModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-xl font-black text-rose-900">Decline Treatment Quote</h3>
              <button
                onClick={() => setDeclineModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleDeclineSubmit} className="space-y-4">
              <p className="text-xs text-slate-600">
                Please let us know your reason. Your case will not be closed — it will route to our Patient Care Nurture desk to assist you at your preferred pace.
              </p>
              <select
                value={declineReason}
                onChange={(e) => setDeclineReason(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-semibold text-slate-900 focus:bg-white"
                required
              >
                <option value="">Select primary reason...</option>
                <option value="Budget / Financial Timing">Budget / Seeking financing or sponsorship</option>
                <option value="Postponing Travel to Later Date">Postponing travel to later this year</option>
                <option value="Seeking Local Treatment in Home Country">Seeking local treatment in home country</option>
                <option value="Prefer Alternative Hospital or Doctor">Prefer alternative hospital or doctor recommendation</option>
                <option value="Other Personal Reasons">Other personal reasons</option>
              </select>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setDeclineModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !declineReason}
                  className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs"
                >
                  Confirm & Route to Nurture Desk
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
