"use client";

import React from "react";
import { PatientCase } from "@/types/portal";
import {
  X,
  Printer,
  Download,
  ShieldCheck,
  Building2,
  Stethoscope,
  CheckCircle2,
  Calendar,
  DollarSign,
  HeartHandshake,
} from "lucide-react";

interface QuoteDataShape {
  baseCost: number;
  procedureName: string;
  hospitalName: string;
  doctorName: string;
  stayDays: number;
  icuDays: number;
  vipDays: number;
  tier: "basic" | "executive" | "imperial";
  tierCost: number;
  inclusions: string[];
  visaFee: number;
  airportFee: number;
  totalCost: number;
}

interface CSExportPdfModalProps {
  isOpen: boolean;
  onClose: () => void;
  patientCase: PatientCase;
  quoteData?: Partial<QuoteDataShape>;
}

const DEFAULT_QUOTE: QuoteDataShape = {
  baseCost: 0,
  procedureName: "Pending Evaluation",
  hospitalName: "To Be Confirmed",
  doctorName: "To Be Assigned",
  stayDays: 7,
  icuDays: 0,
  vipDays: 0,
  tier: "basic",
  tierCost: 0,
  inclusions: ["Pre-operative workup", "Surgery", "Standard ward accommodation", "Post-op follow-up"],
  visaFee: 150,
  airportFee: 80,
  totalCost: 0,
};

export const CSExportPdfModal: React.FC<CSExportPdfModalProps> = ({
  isOpen,
  onClose,
  patientCase,
  quoteData: quoteDataProp,
}) => {
  const quoteData: QuoteDataShape = { ...DEFAULT_QUOTE, ...quoteDataProp };
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-[150] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] shadow-2xl flex flex-col overflow-hidden text-slate-900 border border-slate-200">
        {/* Top Modal Controls */}
        <div className="h-16 px-6 bg-[#101955] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#2ECDC5] flex items-center justify-center text-slate-950 font-black">
              V
            </div>
            <div>
              <div className="font-extrabold text-sm text-white">
                Official International Medical Travel Quotation
              </div>
              <div className="text-[11px] text-slate-300">
                Case ID: {patientCase.id} • {patientCase.patientName}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-[#2ECDC5]" />
              <span>Print PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable PDF Canvas Area */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-8 bg-slate-50/50 print:bg-white print:p-0">
          {/* Branded Letterhead Header */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-black text-2xl tracking-tight text-[#101955]">
                    VEDARA CARE
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-md bg-[#2ECDC5]/15 text-[#101955] font-extrabold uppercase">
                    International
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Global Healthcare Concierge &amp; Certified Medical Tourism Gateway
                </p>
                <p className="text-[11px] text-slate-400">
                  Accredited by JCI &amp; NABH Partner Hospitals Network
                </p>
              </div>

              <div className="text-right text-xs text-slate-600">
                <div className="font-mono font-bold text-slate-900">
                  Quote Ref: VED-QT-2026-{patientCase.id.slice(-6)}
                </div>
                <div>Date: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</div>
                <div>Valid Until: 30 Days from Issue</div>
              </div>
            </div>

            {/* Patient & Hospital Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Patient Information
                </div>
                <div className="font-black text-slate-900 text-sm">{patientCase.patientName}</div>
                <div className="text-slate-600">{patientCase.patientCountry} • {patientCase.patientPhone}</div>
                <div className="text-slate-500 font-mono text-[11px]">{patientCase.id}</div>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Accredited Hospital &amp; Surgeon
                </div>
                <div className="font-black text-slate-900 text-sm">{quoteData.hospitalName}</div>
                <div className="text-slate-600">{quoteData.doctorName}</div>
                <div className="text-emerald-700 font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> JCI &amp; NABH Gold Accredited
                </div>
              </div>
            </div>

            {/* Line Items Breakdown Table */}
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#101955] text-white font-bold">
                  <tr>
                    <th className="py-3 px-4">Item &amp; Description</th>
                    <th className="py-3 px-4 text-center">Stay / Duration</th>
                    <th className="py-3 px-4 text-right">Amount (USD)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50/50">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900">
                        1. Clinical Base: {quoteData.procedureName}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        Surgeon Fees, Anesthesia, OT Charges, Living Donor Evaluation &amp; Pre-Op Diagnostic Panel
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-center font-semibold text-slate-700">
                      {quoteData.stayDays} Days ({quoteData.icuDays}d ICU + {quoteData.vipDays}d VIP Suite)
                    </td>
                    <td className="py-3.5 px-4 text-right font-bold text-slate-900">
                      ${quoteData.baseCost.toLocaleString("en-US")}
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50/50">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900 capitalize">
                        2. Concierge &amp; Hospitality ({quoteData.tier.replace("_", " ")} Tier)
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        {quoteData.inclusions.join(" • ")}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-center font-semibold text-slate-700">
                      Duration of Stay
                    </td>
                    <td className="py-3.5 px-4 text-right font-bold text-slate-900">
                      ${quoteData.tierCost.toLocaleString("en-US")}
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50/50">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900">
                        3. Travel &amp; Logistics Dispatch
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        Official e-Medical Visa Invitation processing ($150) + Airport Express VIP Chauffeur ($200)
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-center font-semibold text-slate-700">
                      Arrival Protocol
                    </td>
                    <td className="py-3.5 px-4 text-right font-bold text-slate-900">
                      ${(quoteData.visaFee + quoteData.airportFee).toLocaleString("en-US")}
                    </td>
                  </tr>

                  {/* Total Row */}
                  <tr className="bg-slate-100/80 font-black text-sm">
                    <td colSpan={2} className="py-4 px-4 text-slate-900 uppercase tracking-wider">
                      Total Estimated Package
                    </td>
                    <td className="py-4 px-4 text-right text-base text-[#101955]">
                      ${quoteData.totalCost.toLocaleString("en-US")} USD
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Escrow & Guarantee Badges */}
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 space-y-1">
              <div className="font-bold flex items-center gap-1.5 text-emerald-800">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Vedara Escrow &amp; Price Protection Guarantee
              </div>
              <p className="text-[11px] text-emerald-700 leading-relaxed">
                All patient payments are held in insured multi-currency healthcare escrow accounts and only disbursed to the hospital upon verified milestone completion. Unused ICU days are refunded at discharge.
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-100 border-t border-slate-200 flex items-center justify-end gap-3 shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-white hover:bg-slate-200 text-slate-700 font-bold text-xs border border-slate-200 transition-all cursor-pointer"
          >
            Close
          </button>
          <button
            onClick={handlePrint}
            className="px-5 py-2 rounded-xl bg-[#101955] hover:bg-[#1c2770] text-white font-extrabold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-md"
          >
            <Download className="w-4 h-4 text-[#2ECDC5]" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};
