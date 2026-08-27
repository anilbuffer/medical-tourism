"use client";

import React from "react";
import { PatientJourneyStage } from "@/types/portal";
import {
  LayoutDashboard,
  FileText,
  Video,
  CreditCard,
  Plane,
  HeartHandshake,
  Lock,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

interface JourneyStepperProps {
  currentStage: PatientJourneyStage;
  activeTab?: string;
  onSelectStage?: (stage: PatientJourneyStage) => void;
  onNavigateTab?: (tabId: string) => void;
}

interface StepMeta {
  id: string;
  label: string;
  shortLabel: string;
  icon: React.ElementType;
  tabTarget: string;
  includesStages: PatientJourneyStage[];
  includesTabs?: string[];
}

const JOURNEY_STEPS: StepMeta[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    shortLabel: "Dashboard",
    icon: LayoutDashboard,
    tabTarget: "overview",
    includesStages: ["lead", "contacted"],
    includesTabs: ["overview"],
  },
  {
    id: "documents",
    label: "My Documents",
    shortLabel: "Documents",
    icon: FileText,
    tabTarget: "docs_vault",
    includesStages: ["documents_collected"],
    includesTabs: ["docs_vault", "documents", "prescriptions_history"],
  },
  {
    id: "video_call",
    label: "Doctor Video Call",
    shortLabel: "Video Call",
    icon: Video,
    tabTarget: "upcoming_video",
    includesStages: ["hospital_handover", "consultation"],
    includesTabs: ["upcoming_video", "consultation", "doctor_opinions"],
  },
  {
    id: "package_price",
    label: "What's Included",
    shortLabel: "Package & Price",
    icon: CreditCard,
    tabTarget: "package_quote",
    includesStages: ["quote", "payment"],
    includesTabs: ["package_quote", "quote", "payment_escrow", "payments"],
  },
  {
    id: "trip_travel",
    label: "Trip & Travel",
    shortLabel: "Trip & Travel",
    icon: Plane,
    tabTarget: "visa_checklist",
    includesStages: ["booking", "treatment"],
    includesTabs: ["visa_checklist", "booking", "flight_hotel", "concierge_contact"],
  },
  {
    id: "recovery",
    label: "Recovery & Care",
    shortLabel: "Recovery",
    icon: HeartHandshake,
    tabTarget: "discharge_summary",
    includesStages: ["followup"],
    includesTabs: ["discharge_summary", "recovery", "post_treatment", "recovery_forms"],
  },
  {
    id: "consents",
    label: "Forms & Consents",
    shortLabel: "Consents",
    icon: Lock,
    tabTarget: "legal_consents",
    includesStages: [],
    includesTabs: ["legal_consents", "consents"],
  },
];

// Order of stages for "completed" determination
const STAGE_ORDER: PatientJourneyStage[] = [
  "lead", "contacted", "documents_collected", "hospital_handover",
  "consultation", "quote", "payment", "booking", "treatment", "followup",
];

export const JourneyStepper: React.FC<JourneyStepperProps> = ({
  currentStage,
  activeTab,
  onNavigateTab,
}) => {
  const currentStageIndex = STAGE_ORDER.indexOf(currentStage);

  // Determine active step index — prefer tab match, fall back to stage
  let activeStepIndex = JOURNEY_STEPS.findIndex(
    (s) => activeTab && s.includesTabs?.includes(activeTab)
  );
  if (activeStepIndex < 0) {
    activeStepIndex = JOURNEY_STEPS.findIndex((s) =>
      s.includesStages.includes(currentStage)
    );
  }
  const safeIndex = activeStepIndex >= 0 ? activeStepIndex : 0;

  // Compute which steps are "completed" based on journey stage progress
  const getStepStatus = (step: StepMeta, idx: number): "completed" | "active" | "upcoming" => {
    if (idx === safeIndex) return "active";
    // A step is completed if ALL its associated stages are past the current stage
    const maxStageIdx = Math.max(
      ...step.includesStages.map((s) => STAGE_ORDER.indexOf(s)),
      -1
    );
    if (maxStageIdx >= 0 && maxStageIdx < currentStageIndex) return "completed";
    if (idx < safeIndex) return "completed";
    return "upcoming";
  };

  const completedCount = JOURNEY_STEPS.filter((s, i) => getStepStatus(s, i) === "completed").length;

  return (
    <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-5 sm:p-6 shadow-[0_6px_32px_rgba(0,0,0,0.06)] border border-slate-200/90 space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#2ECDC5] to-[#1baba4] flex items-center justify-center text-white shadow-md shadow-[#2ECDC5]/20">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 flex items-center gap-2">
              Your Journey
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                Step {safeIndex + 1} of {JOURNEY_STEPS.length}
              </span>
            </h3>
            <p className="text-[11px] text-slate-500">
              {completedCount} of {JOURNEY_STEPS.length} milestones complete
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-[#3F4EB4] bg-[#3F4EB4]/5 px-3.5 py-1.5 rounded-full border border-[#3F4EB4]/15">
          <span className="w-2 h-2 rounded-full bg-[#2ECDC5] animate-pulse" />
          <span>Active: {JOURNEY_STEPS[safeIndex]?.label}</span>
        </div>
      </div>

      {/* 7-Node Horizontal Stepper Strip */}
      <div className="overflow-x-auto pb-3 pt-2 scrollbar-none">
        <div className="flex items-start min-w-[700px] justify-between relative px-5">
          {/* Background Connecting Line */}
          <div className="absolute top-[18px] left-10 right-10 h-0.5 bg-slate-200/80 z-0 rounded-full" />
          <div
            className="absolute top-[18px] left-10 h-0.5 bg-gradient-to-r from-emerald-500 via-[#2ECDC5] to-[#3F4EB4] transition-all duration-700 z-0 rounded-full shadow-sm"
            style={{
              width: safeIndex === 0
                ? "0%"
                : `calc(${(safeIndex / (JOURNEY_STEPS.length - 1)) * 100}% - 20px)`,
            }}
          />

          {JOURNEY_STEPS.map((step, idx) => {
            const status = getStepStatus(step, idx);
            const isCompleted = status === "completed";
            const isCurrent = status === "active";
            const Icon = step.icon;

            return (
              <button
                key={step.id}
                onClick={() => onNavigateTab && onNavigateTab(step.tabTarget)}
                className={`relative z-10 flex flex-col items-center gap-2 group cursor-pointer transition-all duration-200 ${
                  isCurrent ? "scale-110" : "hover:scale-105"
                }`}
                title={`Navigate to ${step.label}`}
              >
                {/* Step Circle */}
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all relative ${
                    isCompleted
                      ? "bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-md shadow-emerald-500/20 ring-2 ring-emerald-200"
                      : isCurrent
                      ? "bg-gradient-to-br from-[#141d60] via-[#1b2360] to-[#101e76] text-[#2ECDC5] ring-4 ring-[#2ECDC5]/40 shadow-xl shadow-[#283593]/30"
                      : "bg-slate-100 text-slate-400 group-hover:bg-slate-200/80 group-hover:text-slate-600 border border-slate-200/60"
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  ) : (
                    <Icon className="w-4 h-4" />
                  )}

                  {isCurrent && (
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#2ECDC5] ring-2 ring-white animate-ping" />
                  )}
                </div>

                {/* Step Label */}
                <div className="text-center max-w-[72px]">
                  <div
                    className={`text-[10px] font-black leading-tight transition-colors ${
                      isCurrent
                        ? "text-[#141d60] underline decoration-[#2ECDC5] decoration-2 underline-offset-2"
                        : isCompleted
                        ? "text-emerald-700"
                        : "text-slate-400 group-hover:text-slate-600"
                    }`}
                  >
                    {step.shortLabel}
                  </div>
                  <div className="text-[9px] font-semibold text-slate-400 capitalize mt-0.5">
                    {isCompleted ? "✓ Done" : isCurrent ? "Active" : "Upcoming"}
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
