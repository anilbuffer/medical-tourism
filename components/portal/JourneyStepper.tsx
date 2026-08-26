"use client";

import React from "react";
import { PatientJourneyStage } from "@/types/portal";
import {
  FileText,
  Plane,
  HeartHandshake,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

interface JourneyStepperProps {
  currentStage: PatientJourneyStage;
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
}

const JOURNEY_STEPS: StepMeta[] = [
  {
    id: "getting_ready",
    label: "Getting Ready",
    shortLabel: "Getting Ready",
    icon: FileText,
    tabTarget: "overview",
    includesStages: [
      "lead",
      "contacted",
      "documents_collected",
      "hospital_handover",
      "consultation",
      "quote",
      "payment",
    ],
  },
  {
    id: "your_trip",
    label: "Your Trip",
    shortLabel: "Your Trip",
    icon: Plane,
    tabTarget: "visa_checklist",
    includesStages: ["booking", "treatment"],
  },
  {
    id: "recovery",
    label: "Recovery",
    shortLabel: "Recovery",
    icon: HeartHandshake,
    tabTarget: "discharge_summary",
    includesStages: ["followup"],
  },
];

export const JourneyStepper: React.FC<JourneyStepperProps> = ({
  currentStage,
  onNavigateTab,
}) => {
  // Determine which of the 3 phases we are currently in
  const activePhaseIndex = JOURNEY_STEPS.findIndex((phase) =>
    phase.includesStages.includes(currentStage)
  );
  const safeIndex = activePhaseIndex >= 0 ? activePhaseIndex : 0; // Default to phase 1

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
                Phase {safeIndex + 1} of 3
              </span>
            </h3>
            <p className="text-[11px] text-slate-500">
              Track your progress toward a successful recovery
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-[#3F4EB4] bg-[#3F4EB4]/5 px-3.5 py-1.5 rounded-full border border-[#3F4EB4]/15">
          <span className="w-2 h-2 rounded-full bg-[#2ECDC5] animate-pulse" />
          <span>Active Phase: {JOURNEY_STEPS[safeIndex]?.label}</span>
        </div>
      </div>

      {/* Responsive Horizontal Stepper Strip */}
      <div className="overflow-x-auto pb-3 pt-2 scrollbar-none">
        <div className="flex items-center min-w-[600px] justify-between relative px-8">
          {/* Background Connecting Line */}
          <div className="absolute top-[20px] left-16 right-16 h-1 bg-slate-200/80 z-0 rounded-full" />
          <div
            className="absolute top-[20px] left-16 h-1 bg-gradient-to-r from-emerald-500 via-[#2ECDC5] to-[#3F4EB4] transition-all duration-500 z-0 rounded-full shadow-sm"
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
                <div className="text-center">
                  <div
                    className={`text-sm font-black leading-tight transition-colors ${
                      isCurrent
                        ? "text-[#141d60] font-extrabold underline decoration-[#2ECDC5] decoration-2 underline-offset-4"
                        : isCompleted
                        ? "text-emerald-700"
                        : "text-slate-400 group-hover:text-slate-600"
                    }`}
                  >
                    {step.shortLabel}
                  </div>
                  <div className="text-[10px] font-semibold text-slate-400 capitalize truncate mt-0.5">
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

