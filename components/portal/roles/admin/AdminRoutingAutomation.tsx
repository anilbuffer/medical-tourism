"use client";

import React, { useState } from "react";
import { QueueRoutingRule } from "@/types/portal";
import { MOCK_ROUTING_RULES } from "@/lib/portal/mockData";
import {
  Sliders,
  Plus,
  Edit2,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Filter,
  X,
  Cpu,
  Layers,
  Clock,
  UserCheck,
} from "lucide-react";

export const AdminRoutingAutomation: React.FC = () => {
  const [rules, setRules] = useState<QueueRoutingRule[]>(MOCK_ROUTING_RULES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [keywords, setKeywords] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [targetQueue, setTargetQueue] = useState("Cardiology_Tier1");
  const [priority, setPriority] = useState<"Critical" | "High" | "Medium" | "Standard">("High");
  const [coordinator, setCoordinator] = useState("Aisha Khan");
  const [autoEscalate, setAutoEscalate] = useState(30);

  const handleToggleRule = (id: string) => {
    setRules((prev) =>
      prev.map((r) => (r.id === id ? { ...r, active: !r.active } : r))
    );
  };

  const handleAddRule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !keywords) return;

    const newRule: QueueRoutingRule = {
      id: `route_rule_${Date.now()}`,
      name,
      keywords: keywords.split(",").map((k) => k.trim()),
      specialty: specialty || "General Medicine",
      targetQueue,
      priorityLevel: priority,
      targetCoordinatorLead: coordinator,
      autoEscalateMinutes: autoEscalate,
      active: true,
    };

    setRules((prev) => [newRule, ...prev]);
    setIsModalOpen(false);
    setName("");
    setKeywords("");
    setSpecialty("");
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
            Routing & Queue Automation Logic
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            NLP keyword classification, automated specialty dispatching, coordinator load balancing, and VIP triage routing triggers.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#1d8983] via-[#1baba4] to-[#1d8983] text-white font-extrabold text-xs flex items-center gap-2 cursor-pointer shadow-md hover:scale-105 transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          Create Automation Rule
        </button>
      </div>

      {/* Rules Engine Cards */}
      <div className="space-y-3">
        {rules.map((rule) => (
          <div
            key={rule.id}
            className={`bg-white/95 rounded-2xl border p-5 space-y-3 transition-all ${
              rule.active ? "border-slate-200 shadow-xs" : "border-slate-200/60 opacity-60 bg-slate-50"
            }`}
          >
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div>
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-[#3F4EB4]" />
                  <h3 className="font-extrabold text-slate-900 text-sm">{rule.name}</h3>
                  <span
                    className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full border ${
                      rule.priorityLevel === "Critical"
                        ? "bg-rose-50 text-rose-800 border-rose-200"
                        : rule.priorityLevel === "High"
                        ? "bg-amber-50 text-amber-800 border-amber-200"
                        : "bg-blue-50 text-blue-800 border-blue-200"
                    }`}
                  >
                    {rule.priorityLevel} Priority
                  </span>
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  Specialty: <strong>{rule.specialty}</strong> • Auto-Escalate: <strong>{rule.autoEscalateMinutes}m</strong>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleToggleRule(rule.id)}
                  className={`text-[10px] font-black uppercase px-3 py-1 rounded-xl border cursor-pointer transition-all ${
                    rule.active
                      ? "bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100"
                      : "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200"
                  }`}
                >
                  {rule.active ? "✓ Active Rule" : "Paused"}
                </button>
              </div>
            </div>

            {/* Keyword Match Tags */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-150 text-xs space-y-1.5">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                Trigger Keyword Patterns:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {rule.keywords.map((kw) => (
                  <span
                    key={kw}
                    className="font-mono text-[11px] font-bold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[#3F4EB4]"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </div>

            {/* Target Queue Info */}
            <div className="pt-1 flex items-center justify-between text-xs text-slate-600">
              <div className="flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-slate-400" />
                Dispatches To: <strong className="text-slate-900 font-mono">{rule.targetQueue}</strong>
              </div>
              <div className="flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5 text-slate-400" />
                Lead Officer: <strong className="text-slate-900">{rule.targetCoordinatorLead}</strong>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Rule Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-black text-slate-900">Create Queue Routing Rule</h3>
                <p className="text-xs text-slate-500">Configure keyword trigger matching and coordinator dispatching.</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-xl text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddRule} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Rule Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Spine & Neurosurgery EMEA"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-[#2ECDC5] focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Trigger Keywords (Comma-separated)
                </label>
                <input
                  type="text"
                  required
                  placeholder="spine, scoliosis, brain, tumor, disc, laminectomy"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:ring-2 focus:ring-[#2ECDC5] focus:outline-none font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Destination Queue</label>
                  <select
                    value={targetQueue}
                    onChange={(e) => setTargetQueue(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 font-bold focus:ring-2 focus:ring-[#2ECDC5] focus:outline-none cursor-pointer"
                  >
                    <option value="Cardiology_Tier1">Cardiology_Tier1</option>
                    <option value="Oncology_EMEA">Oncology_EMEA</option>
                    <option value="Orthopedics_MENA">Orthopedics_MENA</option>
                    <option value="Executive_VIP_Queue">Executive_VIP_Queue</option>
                    <option value="General_Global">General_Global</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Priority Level</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 font-bold focus:ring-2 focus:ring-[#2ECDC5] focus:outline-none cursor-pointer"
                  >
                    <option value="Critical">Critical (10m SLA)</option>
                    <option value="High">High (30m SLA)</option>
                    <option value="Medium">Medium (45m SLA)</option>
                    <option value="Standard">Standard (60m SLA)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Coordinator Lead</label>
                  <input
                    type="text"
                    required
                    value={coordinator}
                    onChange={(e) => setCoordinator(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:ring-2 focus:ring-[#2ECDC5] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Auto-Escalate (Mins)</label>
                  <input
                    type="number"
                    min={5}
                    max={120}
                    value={autoEscalate}
                    onChange={(e) => setAutoEscalate(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 font-mono focus:ring-2 focus:ring-[#2ECDC5] focus:outline-none"
                  />
                </div>
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
                  Save Automation Rule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
