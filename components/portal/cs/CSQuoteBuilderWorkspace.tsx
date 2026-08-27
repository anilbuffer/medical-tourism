"use client";

import React, { useState, useMemo } from "react";
import { PatientCase, QuotePackage } from "@/types/portal";
import { usePortal } from "@/lib/portal/store";
import { CSExportPdfModal } from "./CSExportPdfModal";
import {
  DollarSign,
  Building2,
  Stethoscope,
  Car,
  Plane,
  ShieldCheck,
  CheckCircle2,
  Send,
  FileText,
  Save,
  Sparkles,
  Layers,
  HelpCircle,
  Clock,
} from "lucide-react";

interface CSQuoteBuilderWorkspaceProps {
  patientCase: PatientCase;
}

export const CSQuoteBuilderWorkspace: React.FC<CSQuoteBuilderWorkspaceProps> = ({
  patientCase,
}) => {
  const { savePackageQuote, currentUser } = usePortal();

  // Clinical Base state (defaulting to imported values from doctor's opinion or case data)
  const defaultClinicalCost =
    patientCase.clinicalWorkspace?.costEstimateUsd ||
    (patientCase.id === "PT-2026-089412" ? 22000 : 7200);

  const [clinicalBaseCost, setClinicalBaseCost] = useState<number>(defaultClinicalCost);
  const [procedureTitle, setProcedureTitle] = useState<string>(
    patientCase.clinicalSummary?.recommendedProcedure ||
      "Living Donor Liver Transplant (LDLT)"
  );
  const [stayDays, setStayDays] = useState<number>(
    patientCase.clinicalWorkspace?.expectedStayDays || 14
  );
  const [icuDays, setIcuDays] = useState<number>(3);
  const [vipDays, setVipDays] = useState<number>(11);

  // Concierge Tier selection: Basic ($0), Executive Suite ($2,500), VIP Imperial Villa ($5,000)
  const [selectedTier, setSelectedTier] = useState<"basic" | "executive" | "imperial">(
    "executive"
  );

  const TIER_PRICES: Record<string, number> = {
    basic: 0,
    executive: 2500,
    imperial: 5000,
  };

  // Inclusions checkboxes
  const [inclusions, setInclusions] = useState({
    chauffeur: true,
    interpreter: true,
    halalMeals: true,
    attendantSuite: true,
    physioRehab: false,
  });

  // Travel & Logistics dispatch fees
  const [visaFee, setVisaFee] = useState<number>(150);
  const [airportFee, setAirportFee] = useState<number>(200);

  // Status feedback
  const [saveStatus, setSaveStatus] = useState<string>("");
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);

  // Dynamic Total Calculation
  const totalEstimatedPackage = useMemo(() => {
    const tierCost = TIER_PRICES[selectedTier] || 0;
    const additionalRehab = inclusions.physioRehab ? 800 : 0;
    return clinicalBaseCost + tierCost + additionalRehab + visaFee + airportFee;
  }, [clinicalBaseCost, selectedTier, inclusions, visaFee, airportFee]);

  const activeInclusionsList = useMemo(() => {
    const list: string[] = [];
    if (inclusions.chauffeur) list.push("Private Chauffeur Sedan (Airport & Hospital Transfers)");
    if (inclusions.interpreter) list.push(`Native ${patientCase.preferredLanguage || "Arabic"} Medical Interpreter`);
    if (inclusions.halalMeals) list.push("Halal & Custom Clinical Diet Plan");
    if (inclusions.attendantSuite) list.push("5-Star Executive Attendant Apartment with Kitchenette");
    if (inclusions.physioRehab) list.push("Extended 7-Day Fast-Track Physiotherapy & Rehab");
    return list;
  }, [inclusions, patientCase.preferredLanguage]);

  const handleSaveDraft = () => {
    const quotePayload: Partial<QuotePackage> = {
      treatmentName: procedureTitle,
      hospitalName: patientCase.assignedHospitalId === "hosp_medanta" ? "Medanta – The Medicity" : "Apollo Hospitals",
      doctorName: patientCase.assignedDoctorId === "doc_gupta" ? "Dr. Subhash Gupta" : "Lead Surgeon",
      city: "Delhi NCR, India",
      totalCostUsd: totalEstimatedPackage,
      tier: selectedTier === "imperial" ? "premium" : selectedTier === "executive" ? "standard" : "basic",
      status: "draft",
      costBreakdown: {
        hospitalChargesUsd: clinicalBaseCost * 0.45,
        surgeonAndAnesthesiaUsd: clinicalBaseCost * 0.4,
        implantsAndMedicationUsd: clinicalBaseCost * 0.15,
        stayAndIcuUsd: 0,
        vipConciergeAndLogisticsUsd: TIER_PRICES[selectedTier],
        companionStayUsd: 0,
        coordinationFeeUsd: 0,
        travelAssistanceUsd: visaFee,
        supportLayerUsd: airportFee,
      },
      inclusions: activeInclusionsList,
      exclusions: ["International flights from home country"],
    };

    savePackageQuote(patientCase.id, quotePayload);
    setSaveStatus("💾 Draft quote saved successfully!");
    setTimeout(() => setSaveStatus(""), 4000);
  };

  const handleSendToPatient = () => {
    const quotePayload: Partial<QuotePackage> = {
      treatmentName: procedureTitle,
      hospitalName: patientCase.assignedHospitalId === "hosp_medanta" ? "Medanta – The Medicity" : "Apollo Hospitals",
      doctorName: patientCase.assignedDoctorId === "doc_gupta" ? "Dr. Subhash Gupta" : "Dr. Ashok Rajgopal",
      city: "Delhi NCR / Chennai, India",
      totalCostUsd: totalEstimatedPackage,
      tier: selectedTier === "imperial" ? "premium" : selectedTier === "executive" ? "standard" : "basic",
      status: "sent",
      costBreakdown: {
        hospitalChargesUsd: clinicalBaseCost * 0.45,
        surgeonAndAnesthesiaUsd: clinicalBaseCost * 0.4,
        implantsAndMedicationUsd: clinicalBaseCost * 0.15,
        stayAndIcuUsd: 0,
        vipConciergeAndLogisticsUsd: TIER_PRICES[selectedTier],
        companionStayUsd: 0,
        coordinationFeeUsd: 0,
        travelAssistanceUsd: visaFee,
        supportLayerUsd: airportFee,
      },
      inclusions: activeInclusionsList,
      exclusions: ["International airfare from home country"],
    };

    savePackageQuote(patientCase.id, quotePayload);
    setSaveStatus("🚀 Package Quote sent directly to Patient Portal!");
    setTimeout(() => setSaveStatus(""), 4000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#101955] to-[#1e2a78] text-white rounded-3xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#2ECDC5] text-xs font-bold uppercase tracking-wider mb-2 border border-white/10">
            <DollarSign className="w-3.5 h-3.5" />
            Interactive Package &amp; Quote Builder
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            Case: {patientCase.id} — {patientCase.patientName}
          </h3>
          <p className="text-slate-300 text-xs mt-1">
            Dynamic Line-Item Editor: Clinical Base + Hospitality Tiers + Travel Logistics.
          </p>
        </div>

        <div className="bg-white/10 px-4 py-2.5 rounded-2xl border border-white/10 text-right self-end md:self-auto">
          <div className="text-[10px] uppercase font-bold text-slate-300">Live Estimated Total</div>
          <div className="text-2xl font-black text-[#2ECDC5]">
            ${totalEstimatedPackage.toLocaleString("en-US")} USD
          </div>
        </div>
      </div>

      {saveStatus && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center justify-between shadow-xs animate-in fade-in">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            {saveStatus}
          </span>
          <span className="text-[10px] text-emerald-600">Updated in RBAC Audit Ledger</span>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────────────── */}
      {/* SECTION 1: CLINICAL BASE                                                   */}
      {/* ─────────────────────────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-black text-xs">
              1
            </div>
            <div>
              <h4 className="font-black text-sm text-slate-900 uppercase tracking-tight">
                Clinical Base (Imported from Doctor's Evaluation)
              </h4>
              <p className="text-[11px] text-slate-500">
                Led by Dr. Subhash Gupta • Medanta – The Medicity
              </p>
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            ✓ Doctor Candidacy Cleared
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">
              Procedure Name
            </label>
            <input
              type="text"
              value={procedureTitle}
              onChange={(e) => setProcedureTitle(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-[#2ECDC5] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">
              Base Clinical Cost (USD)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-slate-400">$</span>
              <input
                type="number"
                value={clinicalBaseCost}
                onChange={(e) => setClinicalBaseCost(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-4 py-3 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-[#2ECDC5] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Hospital Stay Breakdown */}
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-600" />
            <span className="font-bold text-slate-800">
              Planned Hospital Stay: {stayDays} Days Total
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-600 font-medium">
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400">ICU Isolation:</span>
              <input
                type="number"
                value={icuDays}
                onChange={(e) => setIcuDays(Number(e.target.value))}
                className="w-14 bg-white border border-slate-300 rounded-lg px-2 py-1 text-center font-bold text-slate-900"
              />
              <span>Days</span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-slate-400">VIP Room:</span>
              <input
                type="number"
                value={vipDays}
                onChange={(e) => setVipDays(Number(e.target.value))}
                className="w-14 bg-white border border-slate-300 rounded-lg px-2 py-1 text-center font-bold text-slate-900"
              />
              <span>Days</span>
            </div>

            <span className="text-emerald-700 font-bold bg-emerald-100/60 px-2 py-0.5 rounded-md">
              Included in Base
            </span>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────────────── */}
      {/* SECTION 2: CONCIERGE & HOSPITALITY LAYERS                                  */}
      {/* ─────────────────────────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
          <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-black text-xs">
            2
          </div>
          <div>
            <h4 className="font-black text-sm text-slate-900 uppercase tracking-tight">
              Concierge &amp; Hospitality Layers (Select Tier)
            </h4>
            <p className="text-[11px] text-slate-500">
              Select premium package tier &amp; customize ground care inclusions
            </p>
          </div>
        </div>

        {/* 3 Tier Selector Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { id: "basic", label: "Basic Care", price: 0, desc: "Standard Hospital Stay + Digital Assistance" },
            { id: "executive", label: "Executive Suite", price: 2500, desc: "5-Star Attendant Apartment + Chauffeur + Translator", popular: true },
            { id: "imperial", label: "VIP Imperial Villa", price: 5000, desc: "Luxury Private Villa + Dedicated 24/7 Care Escort + Halal Chef" },
          ].map((t) => {
            const isSelected = selectedTier === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setSelectedTier(t.id as any)}
                className={`p-4 rounded-2xl text-left border-2 transition-all cursor-pointer relative ${
                  isSelected
                    ? "bg-purple-50/50 border-purple-600 shadow-md ring-1 ring-purple-600"
                    : "bg-slate-50 border-slate-200 hover:bg-slate-100"
                }`}
              >
                {t.popular && (
                  <span className="absolute -top-2.5 right-3 bg-purple-600 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-full shadow-xs">
                    Recommended
                  </span>
                )}
                <div className="flex items-center justify-between mb-1">
                  <span className="font-black text-sm text-slate-900">{t.label}</span>
                  <span className="font-mono font-bold text-xs text-purple-700">
                    {t.price === 0 ? "Included" : `+$${t.price.toLocaleString("en-US")}`}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 leading-tight">{t.desc}</p>
              </button>
            );
          })}
        </div>

        {/* Inclusions Checkboxes */}
        <div className="pt-2">
          <label className="block text-xs font-bold text-slate-700 mb-2">
            Tier Inclusions &amp; Add-ons:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <label className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 cursor-pointer">
              <input
                type="checkbox"
                checked={inclusions.chauffeur}
                onChange={(e) => setInclusions({ ...inclusions, chauffeur: e.target.checked })}
                className="w-4 h-4 rounded text-purple-600 focus:ring-purple-600 cursor-pointer"
              />
              <span className="font-bold text-slate-800">
                Private Chauffeur Sedan (Gate 5 VIP Pickup &amp; Hospital Runs)
              </span>
            </label>

            <label className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 cursor-pointer">
              <input
                type="checkbox"
                checked={inclusions.interpreter}
                onChange={(e) => setInclusions({ ...inclusions, interpreter: e.target.checked })}
                className="w-4 h-4 rounded text-purple-600 focus:ring-purple-600 cursor-pointer"
              />
              <span className="font-bold text-slate-800">
                Native Arabic / Language Interpreter (24/7 Bedside &amp; Rounds)
              </span>
            </label>

            <label className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 cursor-pointer">
              <input
                type="checkbox"
                checked={inclusions.halalMeals}
                onChange={(e) => setInclusions({ ...inclusions, halalMeals: e.target.checked })}
                className="w-4 h-4 rounded text-purple-600 focus:ring-purple-600 cursor-pointer"
              />
              <span className="font-bold text-slate-800">
                Halal Certified &amp; Custom Clinical Gourmet Diet
              </span>
            </label>

            <label className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 cursor-pointer">
              <input
                type="checkbox"
                checked={inclusions.attendantSuite}
                onChange={(e) => setInclusions({ ...inclusions, attendantSuite: e.target.checked })}
                className="w-4 h-4 rounded text-purple-600 focus:ring-purple-600 cursor-pointer"
              />
              <span className="font-bold text-slate-800">
                5-Star Executive Attendant Apartment with Kitchenette
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────────────── */}
      {/* SECTION 3: TRAVEL & LOGISTICS DISPATCH                                     */}
      {/* ─────────────────────────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
          <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-black text-xs">
            3
          </div>
          <div>
            <h4 className="font-black text-sm text-slate-900 uppercase tracking-tight">
              Travel &amp; Logistics Dispatch
            </h4>
            <p className="text-[11px] text-slate-500">
              Embassy e-Medical Visa processing &amp; Airport VIP terminal reception
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">
              Visa Assistance Fee (USD)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-slate-400">$</span>
              <input
                type="number"
                value={visaFee}
                onChange={(e) => setVisaFee(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-4 py-3 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-[#2ECDC5] focus:outline-none"
              />
            </div>
            <p className="text-[10px] text-slate-400 mt-1">
              Includes MEA Govt Invitation Code generation &amp; fast-track verification.
            </p>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">
              Airport Express VIP Reception (USD)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-slate-400">$</span>
              <input
                type="number"
                value={airportFee}
                onChange={(e) => setAirportFee(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-4 py-3 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-[#2ECDC5] focus:outline-none"
              />
            </div>
            <p className="text-[10px] text-slate-400 mt-1">
              Includes baggage assist, customs fast-track, and meet-and-greet at gate.
            </p>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────────────── */}
      {/* TOTAL ESTIMATED PACKAGE & ACTIONS                                          */}
      {/* ─────────────────────────────────────────────────────────────────────────── */}
      <div className="bg-[#101955] rounded-3xl p-6 sm:p-8 text-white shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <span className="text-xs uppercase font-extrabold text-[#2ECDC5] tracking-wider">
              Total Estimated Package Breakdown
            </span>
            <div className="text-3xl sm:text-4xl font-black text-white mt-1">
              ${totalEstimatedPackage.toLocaleString("en-US")} USD
            </div>
            <p className="text-xs text-slate-300 mt-1">
              Includes Clinical Base (${clinicalBaseCost.toLocaleString()}) +{" "}
              {selectedTier.toUpperCase()} Concierge ($
              {TIER_PRICES[selectedTier].toLocaleString()}) + Logistics ($
              {(visaFee + airportFee).toLocaleString()})
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-2xl border border-white/10 text-xs font-bold text-slate-200">
            <ShieldCheck className="w-4 h-4 text-[#2ECDC5]" />
            <span>Escrow Protected</span>
          </div>
        </div>

        {/* Action Buttons Row */}
        <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
          <button
            onClick={handleSaveDraft}
            className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-2 border border-white/15 transition-all cursor-pointer shadow-sm"
          >
            <Save className="w-4 h-4 text-[#2ECDC5]" />
            <span>Save Draft</span>
          </button>

          <button
            onClick={() => setIsPdfModalOpen(true)}
            className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-2 border border-white/15 transition-all cursor-pointer shadow-sm"
          >
            <FileText className="w-4 h-4 text-[#2ECDC5]" />
            <span>Export PDF Quote</span>
          </button>

          <button
            onClick={handleSendToPatient}
            className="px-7 py-3 rounded-2xl bg-gradient-to-r from-[#2ECDC5] to-[#1baba4] hover:from-[#28b8b0] hover:to-[#179a94] text-slate-950 font-black text-xs flex items-center gap-2 shadow-lg transition-all cursor-pointer transform hover:scale-[1.02]"
          >
            <Send className="w-4 h-4" />
            <span>Send Package to Patient Portal</span>
          </button>
        </div>
      </div>

      {/* Branded PDF Quote Modal */}
      <CSExportPdfModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
        patientCase={patientCase}
        quoteData={{
          baseCost: clinicalBaseCost,
          procedureName: procedureTitle,
          hospitalName: patientCase.assignedHospitalId === "hosp_medanta" ? "Medanta – The Medicity" : "Apollo Hospitals",
          doctorName: patientCase.assignedDoctorId === "doc_gupta" ? "Dr. Subhash Gupta" : "Lead Surgeon",
          stayDays,
          icuDays,
          vipDays,
          tier: selectedTier,
          tierCost: TIER_PRICES[selectedTier],
          inclusions: activeInclusionsList,
          visaFee,
          airportFee,
          totalCost: totalEstimatedPackage,
        }}
      />
    </div>
  );
};
