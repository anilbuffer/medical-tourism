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
  { id: "lead", label: "1. Public Intake", shortLabel: "Intake", icon: FileText, tabTarget: "overview" },
  { id: "contacted", label: "2. CS Qualification", shortLabel: "CS Triage", icon: UserCheck, tabTarget: "overview" },
  { id: "documents_collected", label: "3. Documents", shortLabel: "Docs", icon: FolderOpen, tabTarget: "documents" },
  { id: "hospital_handover", label: "4. Hospital Handover", shortLabel: "Handover", icon: Building2, tabTarget: "consultation" },
  { id: "consultation", label: "5. Tele-Consult", shortLabel: "Consult", icon: Video, tabTarget: "consultation" },
  { id: "quote", label: "6. Quote & Package", shortLabel: "Quote", icon: CreditCard, tabTarget: "quote" },
  { id: "payment", label: "7. Staged Payments", shortLabel: "Payment", icon: Lock, tabTarget: "payments" },
  { id: "booking", label: "8. Logistics & Visa", shortLabel: "Booking", icon: Plane, tabTarget: "booking" },
  { id: "treatment", label: "9. Treatment In-Hospital", shortLabel: "Treatment", icon: HeartPulse, tabTarget: "overview" },
  { id: "followup", label: "10. Discharge & Follow-up", shortLabel: "Follow-up", icon: HeartHandshake, tabTarget: "recovery" },
];

export const JourneyStepper: React.FC<JourneyStepperProps> = ({
  currentStage,
  onNavigateTab,
}) => {
  const currentIndex = JOURNEY_STEPS.findIndex((s) => s.id === currentStage);
  const safeIndex = currentIndex >= 0 ? currentIndex : 0;

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-slate-100 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-teal-600" />
          <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-900">
            10-Stage Patient Journey Lifecycle Stepper
          </h3>
        </div>
        <span className="text-xs font-bold text-teal-700 bg-teal-50 px-3 py-0.5 rounded-full border border-teal-100">
          Step {safeIndex + 1} of 10 ({Math.round(((safeIndex + 1) / 10) * 100)}% Completed)
        </span>
      </div>

      {/* Responsive Horizontal Stepper Strip */}
      <div className="overflow-x-auto pb-2 pt-1 scrollbar-none">
        <div className="flex items-center min-w-[900px] justify-between relative">
          {/* Background Connecting Line */}
          <div className="absolute top-1/2 left-6 right-6 -translate-y-1/2 h-1 bg-slate-100 z-0" />
          <div
            className="absolute top-1/2 left-6 -translate-y-1/2 h-1 bg-gradient-to-r from-teal-500 to-emerald-500 transition-all duration-500 z-0"
            style={{
              width: `calc(${(safeIndex / (JOURNEY_STEPS.length - 1)) * 100}% - 24px)`,
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
                className={`relative z-10 flex flex-col items-center gap-1.5 group cursor-pointer transition-all ${
                  isCurrent ? "scale-105" : "hover:scale-105"
                }`}
              >
                {/* Step Circle */}
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${
                    isCompleted
                      ? "bg-emerald-600 text-white shadow-md"
                      : isCurrent
                      ? "bg-[#0E1F40] text-teal-300 ring-4 ring-teal-500/20 shadow-lg"
                      : "bg-slate-100 text-slate-400 group-hover:bg-slate-200"
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5 text-white" />
                  ) : (
                    <Icon className="w-4 h-4" />
                  )}
                </div>

                {/* Step Label */}
                <div className="text-center">
                  <div
                    className={`text-[11px] font-extrabold transition-colors ${
                      isCurrent
                        ? "text-[#0E1F40]"
                        : isCompleted
                        ? "text-emerald-700"
                        : "text-slate-400"
                    }`}
                  >
                    {step.shortLabel}
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
