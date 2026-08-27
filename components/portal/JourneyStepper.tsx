"use client";

import React, { useState } from "react";
import { PatientJourneyStage } from "@/types/portal";
import {
  FileText,
  Plane,
  HeartHandshake,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ArrowRight,
  Video,
  CreditCard,
  Building2,
  Car,
  Activity,
  Lock,
} from "lucide-react";

interface JourneyStepperProps {
  currentStage: PatientJourneyStage;
  activeTab?: string;
  onSelectStage?: (stage: PatientJourneyStage) => void;
  onNavigateTab?: (tabId: string) => void;
}

export interface BigPhaseMeta {
  id: "getting_ready" | "your_trip" | "recovery";
  phaseNumber: number;
  label: string;
  subtitle: string;
  icon: React.ElementType;
  primaryTab: string;
  stages: PatientJourneyStage[];
  granularSteps: {
    id: string;
    title: string;
    description: string;
    tabTarget: string;
    icon: React.ElementType;
    isComplete: (stageIndex: number) => boolean;
    isActive: (stageIndex: number, currentTab?: string) => boolean;
  }[];
}

const STAGE_ORDER: PatientJourneyStage[] = [
  "lead",
  "contacted",
  "documents_collected",
  "hospital_handover",
  "consultation",
  "quote",
  "payment",
  "booking",
  "treatment",
  "followup",
];

export const BIG_PHASES: BigPhaseMeta[] = [
  {
    id: "getting_ready",
    phaseNumber: 1,
    label: "Getting Ready",
    subtitle: "Documents, doctor video call & package confirmation",
    icon: FileText,
    primaryTab: "overview",
    stages: [
      "lead",
      "contacted",
      "documents_collected",
      "hospital_handover",
      "consultation",
      "quote",
      "payment",
    ],
    granularSteps: [
      {
        id: "step_docs",
        title: "Medical Documents & Scans",
        description: "Upload your test results, MRI/CT scans, and passport.",
        tabTarget: "docs_vault",
        icon: FileText,
        isComplete: (idx) => idx > 2,
        isActive: (idx, tab) => tab === "docs_vault" || idx <= 2,
      },
      {
        id: "step_video",
        title: "Video Call with Doctor",
        description: "Review test results with Chief Surgeon Dr. Subhash Gupta.",
        tabTarget: "upcoming_video",
        icon: Video,
        isComplete: (idx) => idx > 4,
        isActive: (idx, tab) => tab === "upcoming_video" || idx === 3 || idx === 4,
      },
      {
        id: "step_package",
        title: "What's Included & Package",
        description: "Review all-inclusive pricing, private suite, and payment steps.",
        tabTarget: "package_quote",
        icon: CreditCard,
        isComplete: (idx) => idx > 5,
        isActive: (idx, tab) => tab === "package_quote" || idx === 5,
      },
      {
        id: "step_payments",
        title: "Your Payments",
        description: "Pay Stage 1 booking deposit into secure healthcare escrow.",
        tabTarget: "payment_escrow",
        icon: CreditCard,
        isComplete: (idx) => idx > 6,
        isActive: (idx, tab) => tab === "payment_escrow" || idx === 6,
      },
      {
        id: "step_consents",
        title: "Forms & Consents",
        description: "Review and sign standard telemedicine & hospital forms.",
        tabTarget: "legal_consents",
        icon: Lock,
        isComplete: (idx) => idx > 6,
        isActive: (idx, tab) => tab === "legal_consents",
      },
    ],
  },
  {
    id: "your_trip",
    phaseNumber: 2,
    label: "Your Trip",
    subtitle: "Visa clearance, flight, 5-star hotel & airport pickup",
    icon: Plane,
    primaryTab: "visa_checklist",
    stages: ["booking"],
    granularSteps: [
      {
        id: "step_visa",
        title: "Visa & Entry Permission",
        description: "Official Indian e-Medical Visa and hospital invitation letter.",
        tabTarget: "visa_checklist",
        icon: Plane,
        isComplete: (idx) => idx > 7,
        isActive: (idx, tab) => tab === "visa_checklist" || idx === 7,
      },
      {
        id: "step_flight",
        title: "Flight & 5-Star Hotel Stay",
        description: "Flight EK-512 and 18-night suite at The Oberoi Gurugram.",
        tabTarget: "flight_hotel",
        icon: Building2,
        isComplete: (idx) => idx > 7,
        isActive: (idx, tab) => tab === "flight_hotel",
      },
      {
        id: "step_concierge",
        title: "Your Driver & Assistance",
        description: "Private chauffeur at Terminal 3, Gate 5 with coordinator support.",
        tabTarget: "concierge_contact",
        icon: Car,
        isComplete: (idx) => idx > 7,
        isActive: (idx, tab) => tab === "concierge_contact",
      },
    ],
  },
  {
    id: "recovery",
    phaseNumber: 3,
    label: "Recovery",
    subtitle: "Hospital care, discharge summary & daily check-ins",
    icon: HeartHandshake,
    primaryTab: "discharge_summary",
    stages: ["treatment", "followup"],
    granularSteps: [
      {
        id: "step_discharge",
        title: "Discharge Summary & Care Plan",
        description: "Post-op care instructions, translated prescriptions, and follow-up.",
        tabTarget: "discharge_summary",
        icon: HeartHandshake,
        isComplete: (idx) => idx >= 9,
        isActive: (idx, tab) => tab === "discharge_summary" || idx >= 8,
      },
      {
        id: "step_daily",
        title: "Daily Recovery Check-in",
        description: "Quick 1-minute daily health update for Dr. Gupta's nursing team.",
        tabTarget: "recovery_forms",
        icon: Activity,
        isComplete: (idx) => idx >= 9,
        isActive: (idx, tab) => tab === "recovery_forms",
      },
    ],
  },
];

export const JourneyStepper: React.FC<JourneyStepperProps> = ({
  currentStage,
  activeTab,
  onNavigateTab,
}) => {
  const [showDetailedMilestones, setShowDetailedMilestones] = useState(false);
  const currentStageIndex = STAGE_ORDER.indexOf(currentStage);

  // Determine current active phase index
  let activePhaseIndex = 0;
  if (currentStageIndex >= 7 && currentStageIndex <= 7) {
    activePhaseIndex = 1; // Your Trip
  } else if (currentStageIndex >= 8) {
    activePhaseIndex = 2; // Recovery
  }

  // If user is actively looking at a tab in another phase, reflect that gently
  if (activeTab) {
    if (["visa_checklist", "flight_hotel", "concierge_contact", "booking"].includes(activeTab)) {
      activePhaseIndex = 1;
    } else if (["discharge_summary", "recovery_forms", "recovery", "post_treatment"].includes(activeTab)) {
      activePhaseIndex = 2;
    } else if (["overview", "docs_vault", "upcoming_video", "package_quote", "payment_escrow", "legal_consents", "prescriptions_history", "doctor_opinions"].includes(activeTab)) {
      activePhaseIndex = 0;
    }
  }

  const getPhaseStatus = (idx: number): "completed" | "active" | "upcoming" => {
    if (idx < activePhaseIndex) return "completed";
    if (idx === activePhaseIndex) return "active";
    return "upcoming";
  };

  return (
    <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-5 sm:p-7 shadow-[0_6px_32px_rgba(0,0,0,0.06)] border border-slate-200/90 space-y-5">
      {/* Stepper Header Strip */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#2ECDC5] to-[#1baba4] flex items-center justify-center text-white shadow-md shadow-[#2ECDC5]/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                Your Treatment Journey
              </h3>
              <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                Phase {activePhaseIndex + 1} of 3: {BIG_PHASES[activePhaseIndex]?.label}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              3 simple stages designed to make your care seamless and stress-free
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowDetailedMilestones(!showDetailedMilestones)}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
        >
          <span>{showDetailedMilestones ? "Hide detailed steps" : "View 10-step checklist breakdown"}</span>
          {showDetailedMilestones ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* 3 Big Phases Visual Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
        {BIG_PHASES.map((phase, idx) => {
          const status = getPhaseStatus(idx);
          const isCompleted = status === "completed";
          const isActive = status === "active";
          const PhaseIcon = phase.icon;

          return (
            <div
              key={phase.id}
              onClick={() => onNavigateTab && onNavigateTab(phase.primaryTab)}
              className={`relative rounded-3xl p-5 border transition-all duration-300 cursor-pointer flex flex-col justify-between group select-none ${
                isActive
                  ? "bg-gradient-to-b from-[#141d60] via-[#1b2360] to-[#101e76] text-white border-[#2ECDC5]/60 shadow-xl shadow-[#141d60]/20 ring-2 ring-[#2ECDC5]/40"
                  : isCompleted
                  ? "bg-emerald-50/50 border-emerald-200 text-slate-800 hover:bg-emerald-50"
                  : "bg-slate-50/80 border-slate-200/70 text-slate-500 hover:bg-slate-100 hover:border-slate-300"
              }`}
            >
              {/* Card Top: Phase Badge & Status */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-sm transition-transform group-hover:scale-105 ${
                      isActive
                        ? "bg-[#2ECDC5] text-slate-950 shadow-md shadow-[#2ECDC5]/30"
                        : isCompleted
                        ? "bg-emerald-600 text-white shadow-sm"
                        : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : <span>{phase.phaseNumber}</span>}
                  </div>

                  <span
                    className={`text-[11px] font-black px-2.5 py-0.5 rounded-full ${
                      isActive
                        ? "bg-[#2ECDC5]/20 text-[#2ECDC5] border border-[#2ECDC5]/30 animate-pulse"
                        : isCompleted
                        ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                        : "bg-slate-200/70 text-slate-500"
                    }`}
                  >
                    {isCompleted ? "✓ Completed" : isActive ? "Current Phase" : "Upcoming"}
                  </span>
                </div>

                <h4
                  className={`text-lg font-black tracking-tight leading-tight ${
                    isActive ? "text-white" : isCompleted ? "text-emerald-950" : "text-slate-700"
                  }`}
                >
                  {phase.label}
                </h4>

                <p
                  className={`text-xs mt-1 leading-relaxed ${
                    isActive ? "text-slate-200" : isCompleted ? "text-slate-600" : "text-slate-400"
                  }`}
                >
                  {phase.subtitle}
                </p>
              </div>

              {/* Card Footer Indicator */}
              <div
                className={`pt-4 mt-3 border-t text-xs font-extrabold flex items-center justify-between ${
                  isActive
                    ? "border-white/15 text-[#2ECDC5]"
                    : isCompleted
                    ? "border-emerald-200 text-emerald-700"
                    : "border-slate-200 text-slate-400"
                }`}
              >
                <span>{isActive ? "You are here" : isCompleted ? "All milestones ready" : "Unlocks after Phase 2"}</span>
                <ArrowRight className={`w-3.5 h-3.5 transition-transform group-hover:translate-x-1 ${isActive ? "text-[#2ECDC5]" : ""}`} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Collapsed 10-Step Granular Milestone Breakdown (Details View) */}
      {showDetailedMilestones && (
        <div className="pt-2 animate-in fade-in duration-200">
          <div className="bg-slate-50/80 rounded-3xl p-5 sm:p-6 border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-black text-slate-900">
                  Detailed 10-Step Milestone Breakdown
                </h4>
                <p className="text-xs text-slate-500">
                  Granular milestone view for your coordinator and family
                </p>
              </div>
              <span className="text-xs font-bold text-slate-400">
                Click any step to view its details
              </span>
            </div>

            <div className="space-y-4">
              {BIG_PHASES.map((phase) => (
                <div key={phase.id} className="space-y-2">
                  <div className="text-[11px] font-black uppercase tracking-wider text-slate-500 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#3F4EB4]" />
                    <span>Phase {phase.phaseNumber}: {phase.label}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                    {phase.granularSteps.map((step) => {
                      const completed = step.isComplete(currentStageIndex);
                      const StepIcon = step.icon;

                      return (
                        <button
                          key={step.id}
                          type="button"
                          onClick={() => onNavigateTab && onNavigateTab(step.tabTarget)}
                          className={`p-3.5 rounded-2xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                            completed
                              ? "bg-white border-emerald-200 text-slate-800 shadow-2xs hover:border-emerald-300"
                              : "bg-white/80 border-slate-200 text-slate-700 hover:border-[#2ECDC5]"
                          }`}
                        >
                          <div
                            className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                              completed
                                ? "bg-emerald-100 text-emerald-700"
                                : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            {completed ? <CheckCircle2 className="w-4 h-4" /> : <StepIcon className="w-4 h-4" />}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="font-extrabold text-xs text-slate-900 truncate">
                              {step.title}
                            </div>
                            <p className="text-[11px] text-slate-500 leading-snug line-clamp-2 mt-0.5">
                              {step.description}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
