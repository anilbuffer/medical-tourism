"use client";

import React, { useState } from "react";
import { SlaThreshold } from "@/types/portal";
import { MOCK_SLA_THRESHOLDS } from "@/lib/portal/mockData";
import {
  Clock,
  Globe,
  Plus,
  Edit2,
  CheckCircle2,
  AlertTriangle,
  Zap,
  X,
} from "lucide-react";

export const AdminGeoSlaTimers: React.FC = () => {
  const [thresholds, setThresholds] = useState<SlaThreshold[]>(MOCK_SLA_THRESHOLDS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMarket, setEditingMarket] = useState<SlaThreshold | null>(null);

  const [market, setMarket] = useState("");
  const [tier1, setTier1] = useState(30);
  const [tier2, setTier2] = useState(60);
  const [escalation, setEscalation] = useState(90);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingMarket) {
      setThresholds((prev) =>
        prev.map((t) =>
          t.market === editingMarket.market
            ? { ...t, market, tier1Minutes: tier1, tier2Minutes: tier2, escalationMinutes: escalation }
            : t
        )
      );
    } else {
      setThresholds((prev) => [
        ...prev,
        { market, tier1Minutes: tier1, tier2Minutes: tier2, escalationMinutes: escalation },
      ]);
    }
    setIsModalOpen(false);
    setEditingMarket(null);
  };

  const handleOpenEdit = (item: SlaThreshold) => {
    setEditingMarket(item);
    setMarket(item.market);
    setTier1(item.tier1Minutes);
    setTier2(item.tier2Minutes);
    setEscalation(item.escalationMinutes);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#3F4EB4] bg-blue-50 px-2.5 py-0.5 rounded-full">
              System Config • Domain 6
            </span>
          </div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight mt-1">
            SLA Timers per Geographic Market
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure regional first-response deadlines, coordinator shift buffers, and automated tier escalation timers by territory.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingMarket(null);
            setMarket("");
            setTier1(30);
            setTier2(60);
            setEscalation(90);
            setIsModalOpen(true);
          }}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#1d8983] via-[#1baba4] to-[#1d8983] text-white font-extrabold text-xs flex items-center gap-2 cursor-pointer shadow-md hover:scale-105 transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          Add Market Region
        </button>
      </div>

      {/* Market Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {thresholds.map((item) => (
          <div
            key={item.market}
            className="bg-white/95 rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4 hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-[#3F4EB4]" />
                  <h3 className="font-black text-slate-900 text-sm">{item.market}</h3>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                  ● 24/7 Coverage
                </span>
              </div>

              {/* SLA Tiers Breakdown */}
              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200/80 flex items-center justify-between">
                  <span className="font-bold text-emerald-950">Tier 1 Coordinator SLA</span>
                  <span className="font-black font-mono text-emerald-800 text-sm">
                    {item.tier1Minutes} mins
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/80 flex items-center justify-between">
                  <span className="font-bold text-amber-950">Tier 2 Escalation Warning</span>
                  <span className="font-black font-mono text-amber-800 text-sm">
                    {item.tier2Minutes} mins
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-rose-50/70 border border-rose-200/80 flex items-center justify-between">
                  <span className="font-bold text-rose-950">Executive Breach Threshold</span>
                  <span className="font-black font-mono text-rose-800 text-sm">
                    {item.escalationMinutes} mins
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-[11px] text-slate-400">Timezone Auto-Shift Active</span>
              <button
                onClick={() => handleOpenEdit(item)}
                className="font-bold text-[#3F4EB4] hover:underline flex items-center gap-1 cursor-pointer text-xs"
              >
                <Edit2 className="w-3 h-3" /> Edit Thresholds
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-black text-slate-900">
                  {editingMarket ? "Edit Geographic SLA Timers" : "Add Market Region"}
                </h3>
                <p className="text-xs text-slate-500">Configure response thresholds in minutes.</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-xl text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Market Name / Region</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. North America, GCC & Middle East"
                  value={market}
                  onChange={(e) => setMarket(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-[#2ECDC5] focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Tier 1 Coordinator First-Response (Minutes)
                </label>
                <input
                  type="number"
                  required
                  min={5}
                  max={120}
                  value={tier1}
                  onChange={(e) => setTier1(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:ring-2 focus:ring-[#2ECDC5] focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Tier 2 Secondary Escalation (Minutes)
                </label>
                <input
                  type="number"
                  required
                  min={10}
                  max={240}
                  value={tier2}
                  onChange={(e) => setTier2(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:ring-2 focus:ring-[#2ECDC5] focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Executive Breach Alert Limit (Minutes)
                </label>
                <input
                  type="number"
                  required
                  min={15}
                  max={360}
                  value={escalation}
                  onChange={(e) => setEscalation(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:ring-2 focus:ring-[#2ECDC5] focus:outline-none font-mono"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#1d8983] via-[#1baba4] to-[#1d8983] text-white font-extrabold text-xs shadow-md cursor-pointer hover:scale-105 transition-all"
                >
                  Save Timers
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
