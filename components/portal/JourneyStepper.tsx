"use client";

import React from "react";
import { PatientJourneyStage } from "@/types/portal";
import {
  FileText,
  UserCheck,
  FolderOpen,
  Building2,
  Video,
  CreditCard,
  Lock,
  Plane,
  HeartPulse,
  HeartHandshake,
  CheckCircle2,
  Clock,
  Sparkles,
} from "lucide-react";

interface JourneyStepperProps {
  currentStage: PatientJourneyStage;
  onSelectStage?: (stage: PatientJourneyStage) => void;
  onNavigateTab?: (tabId: string) => void;
}

interface StepMeta {
  id: PatientJourneyStage;
  label: string;
  shortLabel: string;
  icon: React.ElementType;
  tabTarget: string;
}

const JOURNEY_STEPS: StepMeta[] = [
  { id: "lead", label: "1. Intake", shortLabel: "1. Intake", icon: FileText, tabTarget: "overview" },
  { id: "contacted", label: "2. Contacted", shortLabel: "2. Contacted", icon: UserCheck, tabTarget: "overview" },
  { id: "documents_collected", label: "3. Documents Collected", shortLabel: "3. Documents", icon: FolderOpen, tabTarget: "docs_vault" },
  { id: "hospital_handover", label: "4. Hospital Review", shortLabel: "4. Review", icon: Building2, tabTarget: "doctor_opinions" },
  { id: "consultation", label: "5. Tele-Consultation", shortLabel: "5. Tele-Consult", icon: Video, tabTarget: "upcoming_video" },
  { id: "quote", label: "6. Quote", shortLabel: "6. Quote", icon: CreditCard, tabTarget: "package_quote" },
  { id: "payment", label: "7. Payment", shortLabel: "7. Payment", icon: Lock, tabTarget: "payment_escrow" },
  { id: "booking", label: "8. Logistics", shortLabel: "8. Logistics", icon: Plane, tabTarget: "visa_checklist" },
  { id: "treatment", label: "9. Treatment", shortLabel: "9. Treatment", icon: HeartPulse, tabTarget: "overview" },
  { id: "followup", label: "10. Follow-up", shortLabel: "10. Follow-up", icon: HeartHandshake, tabTarget: "discharge_summary" },
];

export const JourneyStepper: React.FC<JourneyStepperProps> = ({
  currentStage,
  onNavigateTab,
}) => {
  const currentIndex = JOURNEY_STEPS.findIndex((s) => s.id === currentStage);
  const safeIndex = currentIndex >= 0 ? currentIndex : 4; // Default to step 5 (tele-consultation)

  return (
    <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-5 sm:p-6 shadow-[0_6px_32px_rgba(0,0,0,0.06)] border border-slate-200/90 space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#2ECDC5] to-[#1baba4] flex items-center justify-center text-white shadow-md shadow-[#2ECDC5]/20">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-900 flex items-center gap-2">
              Visual Case-Status Stepper
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                Phase {safeIndex + 1} of 10 Active
              </span>
            </h3>
            <p className="text-[11px] text-slate-500">Live progress tracking of international clinical treatment lifecycle</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-[#3F4EB4] bg-[#3F4EB4]/5 px-3.5 py-1.5 rounded-full border border-[#3F4EB4]/15">
          <span className="w-2 h-2 rounded-full bg-[#2ECDC5] animate-pulse" />
          <span>Active Phase: {JOURNEY_STEPS[safeIndex]?.label}</span>
        </div>
      </div>

      {/* Responsive Horizontal Stepper Strip */}
      <div className="overflow-x-auto pb-3 pt-2 scrollbar-none">
        <div className="flex items-center min-w-[960px] justify-between relative px-2">
          {/* Background Connecting Line */}
          <div className="absolute top-[20px] left-8 right-8 h-1 bg-slate-200/80 z-0 rounded-full" />
          <div
            className="absolute top-[20px] left-8 h-1 bg-gradient-to-r from-emerald-500 via-[#2ECDC5] to-[#3F4EB4] transition-all duration-500 z-0 rounded-full shadow-sm"
            style={{
              width: `calc(${(safeIndex / (JOURNEY_STEPS.length - 1)) * 100}% - 32px)`,
            }}
          />

          {JOURNEY_STEPS.map((step, idx) => {
            const isCompleted = idx < safeIndex;
            const isCurrent = idx === safeIndex;
            const Icon = step.icon;

            return (
              <button
                key={step.id}
                onClick={() => onNavigateTab && onNavigateTab(step.tabTarget)}
                className={`relative z-10 flex flex-col items-center gap-2 group cursor-pointer transition-all ${
                  isCurrent ? "scale-110" : "hover:scale-105"
                }`}
                title={`Navigate to ${step.label}`}
              >
                {/* Step Circle */}
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all relative ${
                    isCompleted
                      ? "bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-md shadow-emerald-500/20 ring-2 ring-emerald-200"
                      : isCurrent
                      ? "bg-gradient-to-br from-[#141d60] via-[#1b2360] to-[#101e76] text-[#2ECDC5] ring-4 ring-[#2ECDC5]/40 shadow-xl shadow-[#283593]/30"
                      : "bg-slate-100 text-slate-400 group-hover:bg-slate-200/80 group-hover:text-slate-600 border border-slate-200/60"
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5 text-white" />
                  ) : (
                    <Icon className="w-4 h-4" />
                  )}

                  {isCurrent && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#2ECDC5] ring-2 ring-white animate-ping" />
                  )}
                </div>

                {/* Step Label */}
                <div className="text-center max-w-[85px]">
                  <div
                    className={`text-[11px] font-black leading-tight transition-colors ${
                      isCurrent
                        ? "text-[#141d60] font-extrabold underline decoration-[#2ECDC5] decoration-2 underline-offset-4"
                        : isCompleted
                        ? "text-emerald-700"
                        : "text-slate-400 group-hover:text-slate-600"
                    }`}
                  >
                    {step.shortLabel}
                  </div>
                  <div className="text-[9px] font-semibold text-slate-400 capitalize truncate mt-0.5">
                    {isCompleted ? "Verified" : isCurrent ? "In Progress" : "Upcoming"}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
