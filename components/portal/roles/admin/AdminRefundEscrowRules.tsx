"use client";

import React, { useState } from "react";
import { RefundCancellationRule, PaymentStageId } from "@/types/portal";
import { MOCK_REFUND_RULES } from "@/lib/portal/mockData";
import {
  ShieldAlert,
  Wallet,
  RefreshCcw,
  Percent,
  CheckCircle2,
  AlertTriangle,
  Plus,
  Edit2,
  X,
  Lock,
} from "lucide-react";

export const AdminRefundEscrowRules: React.FC = () => {
  const [rules, setRules] = useState<RefundCancellationRule[]>(MOCK_REFUND_RULES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRule, setEditingRule] = useState<RefundCancellationRule | null>(null);

  const [stage, setStage] = useState<PaymentStageId>("intake_deposit");
  const [percentage, setPercentage] = useState<number>(100);
  const [description, setDescription] = useState("");
  const [conditions, setConditions] = useState("");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingRule) {
      setRules((prev) =>
        prev.map((r) =>
          r.id === editingRule.id
            ? {
                ...r,
                paymentStage: stage,
                refundPercentage: percentage,
                description,
                conditions,
                lastUpdatedAt: new Date().toISOString(),
              }
            : r
        )
      );
    } else {
      const newRule: RefundCancellationRule = {
        id: `refund_rule_${Date.now()}`,
        paymentStage: stage,
        refundPercentage: percentage,
        description: description || `${stage} cancellation policy`,
        conditions,
        lastUpdatedAt: new Date().toISOString(),
      };
      setRules((prev) => [...prev, newRule]);
    }
    setIsModalOpen(false);
    setEditingRule(null);
  };

  const handleOpenEdit = (rule: RefundCancellationRule) => {
    setEditingRule(rule);
    setStage(rule.paymentStage);
    setPercentage(rule.refundPercentage);
    setDescription(rule.description);
    setConditions(rule.conditions);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#3F4EB4] bg-blue-50 px-2.5 py-0.5 rounded-full">
              Legal Engine • Domain 2
            </span>
          </div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight mt-1">
            Stage-Wise Refund & Escrow Retention Rules
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Define programmatic escrow hold releases, cancellation deduction penalties, and hospital dispute override formulas.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingRule(null);
            setStage("intake_deposit");
            setPercentage(100);
            setDescription("");
            setConditions("");
            setIsModalOpen(true);
          }}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#1d8983] via-[#1baba4] to-[#1d8983] text-white font-extrabold text-xs flex items-center gap-2 cursor-pointer shadow-md hover:scale-105 transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          Add Stage Rule
        </button>
      </div>

      {/* Refund Policy Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rules.map((rule) => {
          const isFullRefund = rule.refundPercentage === 100;
          const isNoRefund = rule.refundPercentage === 0;

          return (
            <div
              key={rule.id}
              className="bg-white/95 rounded-2xl border border-slate-200 shadow-sm p-5 space-y-3 flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-black uppercase tracking-wider text-[#3F4EB4] bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                    {(rule.paymentStage || "STAGE").replace(/_/g, " ")}
                  </span>
                  <span
                    className={`text-sm font-black px-2.5 py-0.5 rounded-full ${
                      isFullRefund
                        ? "bg-emerald-100 text-emerald-900 border border-emerald-200"
                        : isNoRefund
                        ? "bg-rose-100 text-rose-900 border border-rose-200"
                        : "bg-amber-100 text-amber-900 border border-amber-200"
                    }`}
                  >
                    {rule.refundPercentage}% Refundable
                  </span>
                </div>

                <div className="font-extrabold text-slate-900 text-xs">
                  {rule.description || `${rule.paymentStage} terms`}
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-150 text-[11px] text-slate-700 leading-relaxed">
                  <strong className="text-slate-900 block mb-0.5">Conditions & Deductions:</strong>
                  {rule.conditions}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="text-slate-400">
                  Updated: {new Date(rule.lastUpdatedAt).toLocaleDateString()}
                </span>
                <button
                  onClick={() => handleOpenEdit(rule)}
                  className="font-bold text-[#3F4EB4] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Edit2 className="w-3 h-3" /> Edit Policy
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Escrow Dispute Hold Policy Info Box */}
      <div className="bg-purple-50 border border-purple-200 rounded-2xl p-5 space-y-2">
        <div className="flex items-center gap-2">
          <Lock className="w-4 h-4 text-purple-700 shrink-0" />
          <h4 className="font-black text-purple-950 text-sm">Escrow Lock & Multi-Sig Dispute Safeguard</h4>
        </div>
        <p className="text-xs text-purple-900 leading-relaxed">
          When a patient or hospital raises a billing dispute, the milestone disbursement is automatically frozen in the multi-currency escrow vault. Neither party can release funds until Super Admin signs off through the Refund Approval Center.
        </p>
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-black text-slate-900">
                  {editingRule ? "Edit Refund & Escrow Policy" : "Add Stage Refund Rule"}
                </h3>
                <p className="text-xs text-slate-500">Configure escrow hold percentages and cancellation deductions.</p>
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
                <label className="font-bold text-slate-700 block mb-1">Journey Payment Milestone</label>
                <select
                  value={stage}
                  onChange={(e) => setStage(e.target.value as PaymentStageId)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-bold focus:ring-2 focus:ring-[#2ECDC5] focus:outline-none cursor-pointer"
                >
                  <option value="intake_deposit">intake_deposit (Stage 1)</option>
                  <option value="booking_deposit">booking_deposit (Stage 2)</option>
                  <option value="hospital_admission">hospital_admission (Stage 3)</option>
                  <option value="discharge_settlement">discharge_settlement (Stage 4)</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Refundable Percentage (%): <strong className="text-[#3F4EB4]">{percentage}%</strong>
                </label>
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={5}
                  value={percentage}
                  onChange={(e) => setPercentage(Number(e.target.value))}
                  className="w-full cursor-pointer accent-[#2ECDC5]"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>0% (Non-refundable)</span>
                  <span>50% (Partial)</span>
                  <span>100% (Full Refund)</span>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Policy Description</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 100% refund if cancelled before doctor review"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:ring-2 focus:ring-[#2ECDC5] focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Conditions, Deductions & Terms</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Explain deduction breakdown (e.g. $250 administrative fee retained for visa letter)..."
                  value={conditions}
                  onChange={(e) => setConditions(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:ring-2 focus:ring-[#2ECDC5] focus:outline-none"
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
                  Save Policy Rule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
