"use client";

import React, { useState } from "react";
import {
  HeartHandshake,
  FileText,
  Lock,
  Clock,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Stethoscope,
  Download,
  Phone,
  Pill,
  Package,
  AlertTriangle,
  Video,
  Calendar,
  ArrowRight,
  ListChecks,
  Utensils,
} from "lucide-react";
import { PatientCase } from "@/types/portal";
import { WhatsAppContactModal } from "../../modals/WhatsAppContactModal";

interface PatientDischargeSummaryViewProps {
  patientCase: PatientCase;
  onNavigateTab?: (tabId: string) => void;
}

const PRE_OP_CHECKLIST = [
  { id: "fast", icon: Utensils, label: "Fasting Protocol", detail: "No solid food 8 hours before surgery, no water 4 hours before. Clear juices allowed up to 2 hrs." },
  { id: "meds", icon: Pill, label: "Medication Adjustments", detail: "Stop blood thinners (aspirin, warfarin) 7 days prior. Discuss diabetes meds with Dr. Gupta's team." },
  { id: "pack", icon: Package, label: "What to Pack for Hospital", detail: "Comfortable loose clothing (4 sets), toiletries, phone charger, medication list, and passport copy." },
  { id: "donor", icon: Stethoscope, label: "Living Donor Pre-op Tests", detail: "Your son Faris must complete blood typing, liver function tests, and CT scan by Sep 5." },
  { id: "forms", icon: FileText, label: "Consent Forms Ready", detail: "Ensure all 4 consent forms are signed before admission day. Check the Forms & Consents tab." },
];

export const PatientDischargeSummaryView: React.FC<PatientDischargeSummaryViewProps> = ({
  patientCase,
  onNavigateTab,
}) => {
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);

  // Determine if we're in post-treatment follow-up stage
  const isPostTreatment = patientCase.stage === "followup" || patientCase.stage === "treatment";
  const isPreTreatment = !isPostTreatment;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2ECDC5]/10 text-[#3F4EB4] text-xs font-extrabold uppercase tracking-wider mb-2 border border-[#2ECDC5]/20">
            <HeartHandshake className="w-3.5 h-3.5 text-[#2ECDC5]" />
            {isPreTreatment ? "Pre-Op Preparation" : "Post-Hospital Care"}
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            {isPreTreatment ? "Pre-Op Preparation Guide" : "Discharge Summary & Care Plan"}
          </h2>
          <p className="text-slate-500 text-sm mt-1 max-w-xl">
            {isPreTreatment
              ? "Everything you need to do before your procedure to ensure a smooth and safe surgery."
              : "Your final hospital discharge notes, medicine instructions for home, and recovery timeline."}
          </p>
        </div>

        {isPostTreatment ? (
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-extrabold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Discharged — Plan Active</span>
          </span>
        ) : (
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-amber-50 text-amber-800 border border-amber-200 text-xs font-extrabold">
            <Clock className="w-4 h-4 text-amber-600" />
            <span>Pre-Treatment Phase</span>
          </span>
        )}
      </div>

      {isPreTreatment ? (
        /* ─── PRE-OP PREPARATION GUIDE ─── */
        <div className="space-y-5">
          {/* Surgery Date Alert */}
          <div className="flex items-center gap-4 bg-[#141d60]/5 border border-[#3F4EB4]/20 rounded-2xl p-4">
            <div className="w-10 h-10 rounded-xl bg-[#3F4EB4]/10 flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5 text-[#3F4EB4]" />
            </div>
            <div>
              <div className="text-sm font-extrabold text-slate-800">Planned Surgery: September 14, 2026</div>
              <div className="text-xs text-slate-500">Medanta – The Medicity, Gurugram • Dr. Subhash Gupta's team</div>
            </div>
          </div>

          {/* Pre-Op Checklist Cards */}
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] overflow-hidden">
            <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#2ECDC5]/10 text-[#2ECDC5] flex items-center justify-center">
                <ListChecks className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-slate-900">Pre-Surgery Checklist</h3>
                <p className="text-xs text-slate-500">Complete these steps before your surgery date</p>
              </div>
            </div>

            <div className="divide-y divide-slate-100">
              {PRE_OP_CHECKLIST.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.id} className="p-5 sm:p-6 flex items-start gap-4">
                    <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-slate-600" />
                    </div>
                    <div>
                      <div className="text-sm font-extrabold text-slate-900">{item.label}</div>
                      <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{item.detail}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Important Warnings */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div className="text-sm font-extrabold text-amber-800">Important — Do NOT do this before surgery</div>
              <ul className="text-xs text-amber-700 space-y-1 list-disc pl-4">
                <li>Do not take blood-thinning medications (aspirin, ibuprofen) for 7 days prior</li>
                <li>Do not drink alcohol for at least 2 weeks before the procedure</li>
                <li>Do not eat after midnight the night before surgery</li>
                <li>Do not use herbal supplements without clearing with Dr. Gupta's team</li>
              </ul>
            </div>
          </div>

          {/* Discharge Preview Card (Locked) */}
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)]">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#3F4EB4]/10 text-[#3F4EB4] flex items-center justify-center font-bold">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-slate-900">Official Hospital Discharge Report</h3>
                  <div className="text-xs text-slate-500">Supervising Surgeon: Dr. Subhash Gupta • Medanta – The Medicity</div>
                </div>
              </div>
              <span className="text-xs font-bold text-slate-400">Pre-Treatment Phase</span>
            </div>

            <div className="p-8 bg-slate-50 rounded-3xl border border-slate-200 text-center space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-slate-200/80 text-slate-600 flex items-center justify-center mx-auto mb-1">
                <Lock className="w-6 h-6 text-slate-500" />
              </div>
              <div className="font-extrabold text-base text-slate-800">Document Ready Upon Hospital Discharge</div>
              <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                Your final hospital discharge summary, medication dosage schedule for home, and 12-month follow-up calendar will be placed here by your doctor on Day 14.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setIsWhatsAppOpen(true)}
                  className="px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs border border-slate-200 inline-flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Questions about recovery? Ask Coordinator</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* ─── POST-DISCHARGE CARE PLAN (Unlocked) ─── */
        <div className="space-y-5">
          {/* Post-Discharge Activation Banner */}
          <div className="flex items-center gap-4 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-4 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-extrabold text-emerald-800">Discharge Summary Unlocked</div>
              <div className="text-xs text-emerald-600 mt-0.5">CS has uploaded your EHR and discharge summary from Medanta.</div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {onNavigateTab && (
              <button
                onClick={() => onNavigateTab("recovery_forms")}
                className="bg-white/95 rounded-3xl p-5 border border-slate-200 shadow-sm text-left hover:shadow-md hover:border-[#2ECDC5]/30 transition-all cursor-pointer group"
              >
                <div className="w-9 h-9 rounded-xl bg-[#2ECDC5]/10 flex items-center justify-center mb-3">
                  <ListChecks className="w-5 h-5 text-[#2ECDC5]" />
                </div>
                <div className="text-sm font-extrabold text-slate-900 group-hover:text-[#1baba4] transition-colors">Daily Recovery Check-in</div>
                <div className="text-xs text-slate-500 mt-0.5">Submit today's pain level & mobility status</div>
                <div className="flex items-center gap-1 text-xs font-bold text-[#2ECDC5] mt-2">Start Check-in <ArrowRight className="w-3 h-3" /></div>
              </button>
            )}

            <div className="bg-white/95 rounded-3xl p-5 border border-slate-200 shadow-sm">
              <div className="w-9 h-9 rounded-xl bg-[#3F4EB4]/10 flex items-center justify-center mb-3">
                <FileText className="w-5 h-5 text-[#3F4EB4]" />
              </div>
              <div className="text-sm font-extrabold text-slate-900">Prescription Translation</div>
              <div className="text-xs text-slate-500 mt-0.5">English → Arabic (ready for download)</div>
              <button className="flex items-center gap-1 text-xs font-bold text-[#3F4EB4] mt-2 cursor-pointer hover:underline">
                <Download className="w-3 h-3" /> Download Arabic PDF
              </button>
            </div>

            <div className="bg-white/95 rounded-3xl p-5 border border-slate-200 shadow-sm">
              <div className="w-9 h-9 rounded-xl bg-violet-100 flex items-center justify-center mb-3">
                <Video className="w-5 h-5 text-violet-600" />
              </div>
              <div className="text-sm font-extrabold text-slate-900">30-Day Follow-up Call</div>
              <div className="text-xs text-slate-500 mt-0.5">With Dr. Gupta — Scheduled Oct 14, 2026</div>
              <div className="flex items-center gap-1 text-xs font-bold text-emerald-600 mt-2">
                <CheckCircle2 className="w-3 h-3" /> Slot Confirmed
              </div>
            </div>
          </div>

          {/* Discharge Summary Document */}
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-slate-900">Discharge Summary — Medanta Hospital</h3>
                  <div className="text-xs text-slate-500">Issued: Sept 28, 2026 • Dr. Subhash Gupta</div>
                </div>
              </div>
              <button className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-colors">
                <Download className="w-3.5 h-3.5" /> Download PDF
              </button>
            </div>

            <div className="space-y-3 text-sm text-slate-700">
              <p><strong className="text-slate-900">Diagnosis:</strong> End-stage liver cirrhosis — Living Donor Liver Transplant performed successfully.</p>
              <p><strong className="text-slate-900">Procedure:</strong> Right lobe LDLT from son Faris Al-Mansoor. Operation time: 9h 20min. No major complications.</p>
              <p><strong className="text-slate-900">Discharge Condition:</strong> Stable. Liver enzymes normalizing. Immunosuppression initiated.</p>
              <p><strong className="text-slate-900">Home Medications:</strong> Tacrolimus 2mg BD, Mycophenolate 500mg BD, Prednisolone 5mg OD — translation available in Arabic.</p>
              <p><strong className="text-slate-900">Follow-up:</strong> Liver function tests weekly for 4 weeks. Video consultation at 30 days (Oct 14, 2026).</p>
            </div>
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
