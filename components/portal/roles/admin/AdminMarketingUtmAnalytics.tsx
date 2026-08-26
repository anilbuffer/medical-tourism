"use client";

import React, { useMemo } from "react";
import { PatientCase, AdminTab } from "@/types/portal";
import {
  BarChart2,
  TrendingUp,
  Target,
  Globe,
  LayoutDashboard,
  DollarSign,
  Users,
  CheckCircle2,
  Layers,
  ClipboardList,
} from "lucide-react";

interface AdminMarketingUtmAnalyticsProps {
  cases: PatientCase[];
  onNavigateTab?: (tab: AdminTab) => void;
}

export const AdminMarketingUtmAnalytics: React.FC<AdminMarketingUtmAnalyticsProps> = ({
  cases,
  onNavigateTab,
}) => {
  // Compute UTM breakdown
  const utmData = useMemo(() => {
    const bySource: Record<
      string,
      { leads: number; conversions: number; revenue: number; cacEstimate: number }
    > = {
      "google-search-cardiology": { leads: 18, conversions: 7, revenue: 142000, cacEstimate: 420 },
      "meta-medical-travel-gcc": { leads: 24, conversions: 8, revenue: 168000, cacEstimate: 310 },
      "nhs-uk-waitlist-partners": { leads: 12, conversions: 5, revenue: 95000, cacEstimate: 280 },
      "direct-organic-referral": { leads: 15, conversions: 6, revenue: 110000, cacEstimate: 50 },
    };

    return Object.entries(bySource).map(([source, d]) => ({
      source,
      leads: d.leads,
      conversions: d.conversions,
      rate: Math.round((d.conversions / d.leads) * 100),
      revenue: d.revenue,
      cac: d.cacEstimate,
    }));
  }, []);

  // Compute Stage Funnel
  const funnelData = useMemo(() => {
    const stageCounts: Record<string, number> = {};
    cases.forEach((c) => {
      stageCounts[c.stage] = (stageCounts[c.stage] || 0) + 1;
    });

    const stages = [
      { id: "lead", label: "01. Lead Intake" },
      { id: "contacted", label: "02. Contacted / Triage" },
      { id: "documents_collected", label: "03. Docs Collected" },
      { id: "hospital_handover", label: "04. Hospital Handover" },
      { id: "consultation", label: "05. Tele-Consultation" },
      { id: "quote", label: "06. Quotation Issued" },
      { id: "payment", label: "07. Escrow Deposit" },
      { id: "booking", label: "08. Travel & Booking" },
      { id: "treatment", label: "09. Hospital Inpatient" },
      { id: "followup", label: "10. Recovery & Follow-up" },
    ];

    return stages.map((s) => ({
      ...s,
      count: stageCounts[s.id] || 0,
    }));
  }, [cases]);

  const maxFunnel = Math.max(...funnelData.map((d) => d.count), 1);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#3F4EB4] bg-blue-50 px-2.5 py-0.5 rounded-full">
              Audit & Telemetry • Domain 5
            </span>
          </div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight mt-1">
            Marketing Attribution & UTM Campaign Analytics
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Track international campaign conversion metrics, Customer Acquisition Cost (CAC), revenue attribution, and funnel progression.
          </p>
        </div>

        {onNavigateTab && (
          <div className="flex items-center gap-2 shrink-0 flex-wrap">
            <button
              onClick={() => onNavigateTab("case_master_directory")}
              className="px-3.5 py-2.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-[#1baba4] text-xs font-bold border border-teal-200 flex items-center gap-1.5 cursor-pointer transition-colors shadow-xs"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Case Directory</span>
            </button>
            <button
              onClick={() => onNavigateTab("system_audit_trail")}
              className="px-3.5 py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#3F4EB4] text-xs font-bold border border-blue-200 flex items-center gap-1.5 cursor-pointer transition-colors shadow-xs"
            >
              <ClipboardList className="w-3.5 h-3.5" />
              <span>System Audit Trail</span>
            </button>
          </div>
        )}
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white/95 rounded-2xl p-4 border border-slate-200 shadow-xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#3F4EB4] flex items-center justify-center font-bold shrink-0">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-black text-slate-900">$315 USD</div>
            <div className="text-[11px] font-bold text-slate-500">Blended CAC per Qualified Lead</div>
          </div>
        </div>

        <div className="bg-white/95 rounded-2xl p-4 border border-slate-200 shadow-xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold shrink-0">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-black text-emerald-700">37.2% Overall</div>
            <div className="text-[11px] font-bold text-slate-500">Inquiry-to-Treatment Conversion</div>
          </div>
        </div>

        <div className="bg-white/95 rounded-2xl p-4 border border-slate-200 shadow-xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#2ECDC5] flex items-center justify-center font-bold shrink-0">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-black text-slate-900">$515,000</div>
            <div className="text-[11px] font-bold text-slate-500">Attributed Treatment GMV</div>
          </div>
        </div>
      </div>

      {/* Campaign Performance Table */}
      <div className="bg-white/95 rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
          <BarChart2 className="w-4 h-4 text-[#3F4EB4]" />
          UTM Campaign Channel & Revenue Breakdown
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px] font-black tracking-wider bg-slate-50/50">
                <th className="pb-3 pt-3 pl-4 text-left">UTM Source / Campaign Tag</th>
                <th className="pb-3 pt-3 text-left">Leads Generated</th>
                <th className="pb-3 pt-3 text-left">Booked Surgeries</th>
                <th className="pb-3 pt-3 text-left">Conversion Rate</th>
                <th className="pb-3 pt-3 text-left">Estimated CAC</th>
                <th className="pb-3 pt-3 pr-4 text-right">Attributed Revenue</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {utmData.map((row) => (
                <tr key={row.source} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 pl-4 font-mono font-bold text-slate-900 text-xs">
                    {row.source}
                  </td>
                  <td className="py-3.5 text-slate-700">{row.leads} inquiries</td>
                  <td className="py-3.5 font-bold text-emerald-700">{row.conversions} treatments</td>
                  <td className="py-3.5">
                    <span className="font-black text-[#3F4EB4]">{row.rate}%</span>
                  </td>
                  <td className="py-3.5 font-mono text-slate-600">${row.cac}</td>
                  <td className="py-3.5 pr-4 text-right font-mono font-black text-sm text-slate-900">
                    ${row.revenue.toLocaleString("en-US")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Case Progression Funnel */}
      <div className="bg-white/95 rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
          <LayoutDashboard className="w-4 h-4 text-[#2ECDC5]" />
          10-Stage Patient Care Journey Funnel Progression
        </h3>

        <div className="space-y-3 pt-2">
          {funnelData.map((stage) => (
            <div key={stage.id} className="flex items-center gap-3 text-xs">
              <span className="text-[11px] font-bold text-slate-600 w-44 shrink-0">
                {stage.label}
              </span>
              <div className="flex-1 bg-slate-100 rounded-full h-4 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#1d8983] via-[#1baba4] to-[#2ECDC5] transition-all duration-500"
                  style={{
                    width: `${Math.max((stage.count / maxFunnel) * 100, stage.count > 0 ? 8 : 0)}%`,
                  }}
                />
              </div>
              <span className="font-mono font-black text-slate-900 w-8 text-right">
                {stage.count}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
