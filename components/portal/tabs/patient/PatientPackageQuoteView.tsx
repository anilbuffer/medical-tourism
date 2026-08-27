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
  ChevronDown,
  ChevronUp,
  Download,
  AlertCircle,
  HelpCircle,
  Phone,
  MessageSquare,
  Car,
  Globe,
  Hotel,
  Lock,
  AlertTriangle,
  Wallet,
} from "lucide-react";
import { PatientCase } from "@/types/portal";
import { usePortal } from "@/lib/portal/store";
import { WhatsAppContactModal } from "../../modals/WhatsAppContactModal";

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
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
  const [changeRequestSent, setChangeRequestSent] = useState(false);
  const [refundTermsOpen, setRefundTermsOpen] = useState(false);

  const handleAccept = () => {
    respondToQuote(patientCase.id, "accepted");
    setDecisionState("accepted");
    if (onNavigateToPayments) {
      setTimeout(() => onNavigateToPayments(), 600);
    }
  };

  const handleDecline = () => {
    if (confirm("Are you sure you want to decline this treatment package?")) {
      respondToQuote(patientCase.id, "declined", "Patient requested alternative dates/tier.");
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
            Your Treatment Package
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            What's Included & Price
          </h2>
          <p className="text-slate-500 text-sm mt-1 max-w-xl">
            A clear, all-inclusive price for your medical care, private hospital suite, 5-star apartment, and concierge support. No hidden fees.
          </p>
        </div>

        <div className="text-left sm:text-right bg-emerald-50/80 sm:bg-transparent p-4 sm:p-0 rounded-2xl border sm:border-0 border-emerald-200 w-full sm:w-auto">
          <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
            Total All-Inclusive Price
          </div>
          <div className="text-3xl font-black text-slate-900 mt-0.5">
            {formatCurrency(totalAmount)}
          </div>
          <div className="text-xs text-emerald-700 font-bold flex items-center gap-1 sm:justify-end mt-0.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Complete package covered</span>
          </div>
        </div>
      </div>

      {/* Package Breakdown Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: What's Included */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="font-extrabold text-lg text-slate-900">
                  Living Donor Liver Transplant Package
                </h3>
                <div className="text-xs text-slate-500 mt-0.5">
                  Medanta – The Medicity, Delhi NCR • Surgical Team Led by Dr. Subhash Gupta
                </div>
              </div>

              <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-50 text-emerald-700 border border-emerald-200">
                All-Inclusive
              </span>
            </div>

            {/* Inclusions list */}
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500 block mb-3">
                What's included in your package:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-slate-900 font-extrabold text-sm block">14 Days Hospital Stay</strong>
                    <span className="text-slate-600 text-xs">Private suite with bed for your family member + ICU care.</span>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-slate-900 font-extrabold text-sm block">All Surgeon & Medical Fees</strong>
                    <span className="text-slate-600 text-xs">Chief Surgeon Dr. Subhash Gupta, surgical team & anesthesia.</span>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-slate-900 font-extrabold text-sm block">5-Star Apartment (18 Nights)</strong>
                    <span className="text-slate-600 text-xs">The Oberoi Gurugram suite for your family member & recovery.</span>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-slate-900 font-extrabold text-sm block">Airport VIP Pickup & Drop</strong>
                    <span className="text-slate-600 text-xs">Private chauffeur at Airport Gate 5 and all hospital transfers.</span>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-slate-900 font-extrabold text-sm block">Personal Translator & Coordinator</strong>
                    <span className="text-slate-600 text-xs">24/7 dedicated support in Arabic and English by your side.</span>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-slate-900 font-extrabold text-sm block">All In-Hospital Medicines & Tests</strong>
                    <span className="text-slate-600 text-xs">All routine diagnostics, medications, and surgical consumables.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Simple Cost Breakdown */}
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500 block mb-2">
                Price Breakdown
              </span>
              <div className="border border-slate-200 rounded-2xl overflow-hidden text-xs">
                <div className="divide-y divide-slate-100">
                  <div className="p-3.5 flex justify-between bg-slate-50/60">
                    <span className="text-slate-700 font-medium">Surgeon, Anesthesia & Clinical Team Fees</span>
                    <span className="font-bold text-slate-900">{formatCurrency(9000)}</span>
                  </div>
                  <div className="p-3.5 flex justify-between">
                    <span className="text-slate-700 font-medium">Hospital Operating Room & Transplant Care</span>
                    <span className="font-bold text-slate-900">{formatCurrency(8500)}</span>
                  </div>
                  <div className="p-3.5 flex justify-between bg-slate-50/60">
                    <span className="text-slate-700 font-medium">Living Donor Tests & Evaluation</span>
                    <span className="font-bold text-slate-900">{formatCurrency(5500)}</span>
                  </div>
                  <div className="p-3.5 flex justify-between">
                    <span className="text-slate-700 font-medium">14 Nights Private Hospital Suite</span>
                    <span className="font-bold text-slate-900">{formatCurrency(3500)}</span>
                  </div>
                  <div className="p-3.5 flex justify-between bg-slate-50/60">
                    <span className="text-slate-700 font-medium">5-Star Apartment, Airport Chauffeur & Translator</span>
                    <span className="font-bold text-slate-900">{formatCurrency(2000)}</span>
                  </div>
                </div>
                <div className="p-4 bg-emerald-50 font-extrabold flex justify-between items-center text-sm border-t border-slate-200">
                  <span className="text-slate-900">Total Price:</span>
                  <span className="text-emerald-800 font-black text-lg">{formatCurrency(totalAmount)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Staged Escrow + Decision Actions */}
        <div className="space-y-5">

          {/* Staged Payment Roadmap */}
          <div className="bg-gradient-to-br from-[#141d60] via-[#1b2360] to-[#101e76] rounded-2xl p-3 sm:p-4 text-white shadow-xl border border-slate-800 space-y-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#2ECDC5]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="flex items-center gap-2.5 relative z-10">
              <div className="w-8 h-8 rounded-xl bg-[#2ECDC5]/20 flex items-center justify-center">
                <Wallet className="w-4 h-4 text-[#2ECDC5]" />
              </div>
              <div>
                <div className="text-sm font-black text-white">Staged Escrow Payment Plan</div>
                <div className="text-[11px] text-slate-300">Your funds are held in secure escrow at each stage</div>
              </div>
            </div>

            <div className="space-y-3 relative z-10">
              {/* Stage 1 */}
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-emerald-500/15 border border-emerald-400/30">
                <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-extrabold text-emerald-300">Stage 1 — Booking Deposit</div>
                  <div className="text-lg font-black text-white">{formatCurrency(3000)}</div>
                  <div className="text-[11px] text-slate-300">Escrow Held · Paid upon package acceptance</div>
                </div>
              </div>

              {/* Stage 2 */}
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/15">
                <div className="w-6 h-6 rounded-full bg-slate-600 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-[10px] font-black text-white">2</span>
                </div>
                <div className="flex-1">
                  <div className="text-xs font-extrabold text-slate-300">Stage 2 — Hospital Booking Advance</div>
                  <div className="text-lg font-black text-slate-200">{formatCurrency(15000)}</div>
                  <div className="text-[11px] text-slate-400">Due 30 days before procedure · Released to hospital</div>
                </div>
              </div>

              {/* Stage 3 */}
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/15">
                <div className="w-6 h-6 rounded-full bg-slate-600 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-[10px] font-black text-white">3</span>
                </div>
                <div className="flex-1">
                  <div className="text-xs font-extrabold text-slate-300">Stage 3 — Final Settlement</div>
                  <div className="text-lg font-black text-slate-200">{formatCurrency(10500)}</div>
                  <div className="text-[11px] text-slate-400">Due on hospital admission day</div>
                </div>
              </div>

              <div className="pt-1 flex justify-between items-center text-xs font-bold border-t border-white/10">
                <span className="text-slate-300">Total All-Inclusive:</span>
                <span className="text-[#2ECDC5] text-base font-black">{formatCurrency(totalAmount)}</span>
              </div>
            </div>
          </div>

          {/* Decision Actions */}
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-3 sm:p-4 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] space-y-4">
            <h4 className="font-black text-base text-slate-900">Ready to move forward?</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Accepting reserves your surgery slot with Dr. Gupta and triggers your Stage 1 deposit invoice.
            </p>

            {/* Refund & Cancellation Terms — expandable */}
            <div className="rounded-2xl border border-slate-200 overflow-hidden">
              <button
                onClick={() => setRefundTermsOpen(!refundTermsOpen)}
                className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer text-left"
              >
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  <span className="text-xs font-extrabold text-slate-700">Refund & Cancellation Terms</span>
                </div>
                {refundTermsOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </button>
              {refundTermsOpen && (
                <div className="px-4 py-3 text-xs text-slate-600 space-y-2 border-t border-slate-100">
                  <p><strong className="text-slate-800">Stage 1 Deposit ($3,000):</strong> Fully refundable if cancelled ≥ 30 days before admission.</p>
                  <p><strong className="text-slate-800">Stage 2 Advance ($15,000):</strong> 70% refundable if cancelled 15–30 days prior. Non-refundable &lt;15 days.</p>
                  <p><strong className="text-slate-800">Stage 3 Final ($10,500):</strong> Non-refundable once hospital admission occurs.</p>
                  <p className="text-[11px] text-slate-400 pt-1">All refund requests are reviewed by the Finance & Escrow Desk within 7 business days.</p>
                </div>
              )}
            </div>

            {decisionState === "accepted" ? (
              <div className="p-5 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <div className="font-black text-base text-emerald-900">Package Accepted!</div>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  Your treatment slot is reserved. Stage 1 deposit invoice has been triggered.
                </p>
                {onNavigateToPayments && (
                  <button
                    onClick={onNavigateToPayments}
                    className="w-full mt-2 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black shadow-md cursor-pointer"
                  >
                    View Your Payments
                  </button>
                )}
              </div>
            ) : changeRequestSent ? (
              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-center space-y-1.5">
                <div className="font-black text-sm text-amber-800">✓ Request Sent to Ananya!</div>
                <p className="text-xs text-amber-600">Your coordinator has received an urgent notification about your change request.</p>
              </div>
            ) : (
              <div className="space-y-3">
                <button
                  onClick={handleAccept}
                  className="w-full py-4 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-sm shadow-lg shadow-emerald-600/25 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Check className="w-5 h-5" />
                  <span>Accept This Package</span>
                </button>

                <button
                  onClick={() => setShowModModal(true)}
                  className="w-full py-3 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors cursor-pointer"
                >
                  Ask to Change or Add Something
                </button>

                <button
                  onClick={() => setIsWhatsAppOpen(true)}
                  className="w-full py-3 px-4 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 text-emerald-600" />
                  <span>Talk with Coordinator First</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modification Request Modal */}
      {showModModal && (
        <div className="fixed inset-0 z-[120] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg p-6 sm:p-8 space-y-4 shadow-2xl border border-slate-200 animate-in fade-in">
            <h3 className="text-lg font-extrabold text-slate-900">Request a Change</h3>
            <p className="text-xs text-slate-500">
              Let your Care Coordinator know what you'd like adjusted (e.g. longer hotel stay, extra family member, flight booking).
            </p>

            <form onSubmit={(e) => { e.preventDefault(); respondToQuote(patientCase.id, "change_requested", modNotes); setChangeRequestSent(true); setDecisionState("change_requested"); setShowModModal(false); }} className="space-y-4 text-xs">
              <div className="p-3 bg-amber-50 border border-amber-100 rounded-xl text-xs text-amber-700 font-medium">
                ⚡ This will create an urgent action item in Ananya's coordinator queue.
              </div>
              <textarea
                required
                rows={4}
                value={modNotes}
                onChange={(e) => setModNotes(e.target.value)}
                placeholder="Describe what you'd like changed (e.g. longer hotel stay, extra family room, different dates)..."
                className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-900 font-medium focus:outline-none focus:border-[#2ECDC5]"
              />

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowModModal(false)}
                  className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-700 font-bold text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-gradient-to-r from-[#1d8983] to-[#1baba4] hover:scale-105 active:scale-95 text-white rounded-xl font-bold text-xs shadow-md cursor-pointer"
                >
                  Send Urgent Request
                </button>
              </div>
            </form>
          </div>
        </div>
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
