"use client";

import React, { useState } from "react";
import { PatientCase, PatientTab, PatientNavGroup } from "@/types/portal";
import { OverviewTab } from "../tabs/OverviewTab";
import { PatientDicomVaultView } from "../tabs/patient/PatientDicomVaultView";
import { PatientPrescriptionsHistoryView } from "../tabs/patient/PatientPrescriptionsHistoryView";
import { PatientUpcomingVideoView } from "../tabs/patient/PatientUpcomingVideoView";
import { PatientDoctorOpinionsView } from "../tabs/patient/PatientDoctorOpinionsView";
import { PatientPackageQuoteView } from "../tabs/patient/PatientPackageQuoteView";
import { PatientPaymentEscrowView } from "../tabs/patient/PatientPaymentEscrowView";
import { PatientVisaChecklistView } from "../tabs/patient/PatientVisaChecklistView";
import { PatientFlightHotelView } from "../tabs/patient/PatientFlightHotelView";
import { PatientConciergeContactView } from "../tabs/patient/PatientConciergeContactView";
import { PatientDischargeSummaryView } from "../tabs/patient/PatientDischargeSummaryView";
import { PatientRecoveryFormsView } from "../tabs/patient/PatientRecoveryFormsView";
import { PatientLegalConsentsView } from "../tabs/patient/PatientLegalConsentsView";
import { MyMessagesTab } from "../tabs/MyMessagesTab";
import {
  LayoutDashboard,
  FileText,
  Video,
  CreditCard,
  Plane,
  HeartHandshake,
  Lock,
  Layers,
  Activity,
  Stethoscope,
  Receipt,
  Globe,
  Building2,
  Car,
  ShieldCheck,
} from "lucide-react";

export type { PatientTab, PatientNavGroup };

interface PatientViewProps {
  patientCase: PatientCase;
  activeTab?: PatientTab | string;
  onSelectTab?: (tab: PatientTab | string) => void;
}

export const PatientView: React.FC<PatientViewProps> = ({
  patientCase,
  activeTab: controlledTab,
  onSelectTab: controlledOnSelectTab,
}) => {
  const [internalTab, setInternalTab] = useState<string>("overview");
  const activeTab = controlledTab ?? internalTab;

  const setActiveTab = (tab: string) => {
    if (controlledOnSelectTab) {
      controlledOnSelectTab(tab);
    } else {
      setInternalTab(tab);
    }
  };

  const incompleteDocsCount =
    patientCase.documents.filter((d) => d.status === "incomplete").length || undefined;

  // 7 Revised Navigation Domains Configuration matching human-centered flow
  const NAV_GROUPS: {
    id: PatientNavGroup;
    label: string;
    icon: React.ElementType;
    items: {
      id: string;
      aliasIds?: string[];
      label: string;
      icon: React.ElementType;
      badge?: number;
    }[];
  }[] = [
    {
      id: "dashboard_group",
      label: "Dashboard",
      icon: LayoutDashboard,
      items: [
        {
          id: "overview",
          label: "Dashboard Overview",
          icon: LayoutDashboard,
        },
      ],
    },
    {
      id: "medical_records_group",
      label: "My Documents",
      icon: FileText,
      items: [
        {
          id: "docs_vault",
          aliasIds: ["documents"],
          label: "Medical Documents & Scans",
          icon: Layers,
          badge: incompleteDocsCount,
        },
        {
          id: "prescriptions_history",
          label: "Medications & Health Notes",
          icon: FileText,
        },
      ],
    },
    {
      id: "consultations_group",
      label: "Doctor Video Call",
      icon: Video,
      items: [
        {
          id: "upcoming_video",
          aliasIds: ["consultation"],
          label: "Video Call with Doctor",
          icon: Video,
        },
        {
          id: "doctor_opinions",
          label: "Doctor's Notes & Advice",
          icon: Stethoscope,
        },
      ],
    },
    {
      id: "quote_payments_group",
      label: "What's Included & Price",
      icon: CreditCard,
      items: [
        {
          id: "package_quote",
          aliasIds: ["quote"],
          label: "What's Included",
          icon: CreditCard,
        },
        {
          id: "payment_escrow",
          aliasIds: ["payments"],
          label: "Your Payments",
          icon: Receipt,
        },
      ],
    },
    {
      id: "travel_logistics_group",
      label: "Trip & Travel",
      icon: Plane,
      items: [
        {
          id: "visa_checklist",
          aliasIds: ["booking"],
          label: "Visa & Entry Permission",
          icon: Globe,
        },
        {
          id: "flight_hotel",
          label: "Flight & Hotel Stay",
          icon: Building2,
        },
        {
          id: "concierge_contact",
          label: "Your Driver & Assistance",
          icon: Car,
        },
      ],
    },
    {
      id: "recovery_group",
      label: "Recovery & Care",
      icon: HeartHandshake,
      items: [
        {
          id: "discharge_summary",
          aliasIds: ["recovery", "post_treatment"],
          label: "Discharge Summary & Care Plan",
          icon: FileText,
        },
        {
          id: "recovery_forms",
          label: "Daily Recovery Check-in",
          icon: Activity,
        },
      ],
    },
    {
      id: "privacy_consents_group",
      label: "Forms & Consents",
      icon: Lock,
      items: [
        {
          id: "legal_consents",
          aliasIds: ["consents"],
          label: "Your Signed Agreements",
          icon: ShieldCheck,
        },
      ],
    },
  ];

  // Find active group and item
  const currentGroup =
    NAV_GROUPS.find((g) =>
      g.items.some(
        (i) => i.id === activeTab || (i.aliasIds && i.aliasIds.includes(activeTab))
      )
    ) || NAV_GROUPS[0];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Sub-Navigation Secondary Pill Bar for Active Group (When category has multiple sub-tabs) */}
      {currentGroup.items.length > 1 && (
        <div className="bg-white/95 backdrop-blur-md rounded-2xl p-1.5 border border-slate-200 shadow-xs flex items-center gap-1.5 overflow-x-auto">
          {currentGroup.items.map((item) => {
            const isActive =
              activeTab === item.id ||
              (item.aliasIds && item.aliasIds.includes(activeTab));
            const ItemIcon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-r from-[#1d8983] via-[#1baba4] to-[#1d8983] text-white shadow-sm font-black"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 font-bold"
                }`}
              >
                <ItemIcon className={`w-3.5 h-3.5 ${isActive ? "text-white" : "text-slate-500"}`} />
                <span>{item.label}</span>
                {typeof item.badge === "number" && item.badge > 0 && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                      isActive ? "bg-white text-[#1d8983]" : "bg-[#2ECDC5] text-slate-950"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Render Appropriate Sub-Module Component */}
      {activeTab === "overview" && (
        <OverviewTab
          patientCase={patientCase}
          onNavigateTab={(tabId) => setActiveTab(tabId)}
          activeTab={activeTab}
        />
      )}

      {(activeTab === "docs_vault" || activeTab === "documents") && (
        <PatientDicomVaultView patientCase={patientCase} />
      )}

      {activeTab === "prescriptions_history" && (
        <PatientPrescriptionsHistoryView patientCase={patientCase} />
      )}

      {(activeTab === "upcoming_video" || activeTab === "consultation") && (
        <PatientUpcomingVideoView patientCase={patientCase} onNavigateTab={setActiveTab} />
      )}

      {activeTab === "doctor_opinions" && (
        <PatientDoctorOpinionsView patientCase={patientCase} />
      )}

      {(activeTab === "package_quote" || activeTab === "quote") && (
        <PatientPackageQuoteView
          patientCase={patientCase}
          onNavigateToPayments={() => setActiveTab("payment_escrow")}
        />
      )}

      {(activeTab === "payment_escrow" || activeTab === "payments") && (
        <PatientPaymentEscrowView patientCase={patientCase} />
      )}

      {(activeTab === "visa_checklist" || activeTab === "booking") && (
        <PatientVisaChecklistView patientCase={patientCase} />
      )}

      {activeTab === "flight_hotel" && (
        <PatientFlightHotelView patientCase={patientCase} />
      )}

      {activeTab === "concierge_contact" && (
        <PatientConciergeContactView patientCase={patientCase} />
      )}

      {(activeTab === "discharge_summary" ||
        activeTab === "recovery" ||
        activeTab === "post_treatment") && (
        <PatientDischargeSummaryView patientCase={patientCase} onNavigateTab={setActiveTab} />
      )}

      {activeTab === "recovery_forms" && (
        <PatientRecoveryFormsView patientCase={patientCase} />
      )}

      {(activeTab === "legal_consents" || activeTab === "consents") && (
        <PatientLegalConsentsView patientCase={patientCase} />
      )}

      {activeTab === "messages" && <MyMessagesTab patientCase={patientCase} />}
    </div>
  );
};
