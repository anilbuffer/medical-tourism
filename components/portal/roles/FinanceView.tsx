"use client";

import React, { useState, useMemo } from "react";
import { PatientCase } from "@/types/portal";
import { usePortal } from "@/lib/portal/store";
import {
  DollarSign,
  CheckCircle2,
  AlertTriangle,
  Lock,
  FileText,
  Search,
  RefreshCcw,
  Receipt,
  Shield,
  ShieldAlert,
  BarChart2,
  Download,
  Clock,
  TrendingUp,
  Wallet,
  PiggyBank,
  AlertCircle,
  Eye,
  EyeOff,
} from "lucide-react";

export type FinanceTab = "payment_ledger" | "escrow" | "refunds" | "reconciliation" | "dispute";

interface FinanceViewProps {
  cases: PatientCase[];
  activeTab?: FinanceTab;
  onSelectTab?: (tab: FinanceTab) => void;
}

export const FinanceView: React.FC<FinanceViewProps> = ({
  cases,
  activeTab: controlledTab,
  onSelectTab: controlledOnSelectTab,
}) => {
  const { initiateRefund, grantBillingDisputeAccess, currentUser } = usePortal();
  const [internalTab, setInternalTab] = useState<FinanceTab>("payment_ledger");
  const activeTab = controlledTab ?? internalTab;
  const setActiveTab = (tab: FinanceTab) => {
    if (controlledOnSelectTab) {
      controlledOnSelectTab(tab);
    } else {
      setInternalTab(tab);
    }
  };
  const [searchQuery, setSearchQuery] = useState("");
  const [reconcileFilter, setReconcileFilter] = useState<"all" | "unreconciled" | "reconciled">("all");

  // Refund modal state
  const [refundModal, setRefundModal] = useState<{ case: PatientCase; stageId: "deposit" | "advance" | "final" } | null>(null);
  const [refundAmount, setRefundAmount] = useState(0);
  const [refundReason, setRefundReason] = useState("");
  const [refundSaved, setRefundSaved] = useState(false);

  // Dispute modal state
  const [disputeModal, setDisputeModal] = useState<PatientCase | null>(null);
  const [disputeReason, setDisputeReason] = useState("");
  const [disputeSaved, setDisputeSaved] = useState(false);

  const filteredCases = useMemo(() => {
    let result = cases;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (c) => c.id.toLowerCase().includes(q) || c.patientName.toLowerCase().includes(q)
      );
    }
    return result;
  }, [cases, searchQuery]);

  // Portfolio metrics
  const totalRevenue = useMemo(
    () =>
      cases.flatMap((c) => c.payments).filter((p) => p.status === "completed").reduce((sum, p) => sum + p.amountUsd, 0),
    [cases]
  );
  const totalPending = useMemo(
    () =>
      cases.flatMap((c) => c.payments).filter((p) => p.status === "pending").reduce((sum, p) => sum + p.amountUsd, 0),
    [cases]
  );
  const totalRefundRequested = useMemo(
    () =>
      cases.flatMap((c) => c.refundRequests || []).reduce((sum, r) => sum + r.amountUsd, 0),
    [cases]
  );

  const escrowCases = useMemo(
    () =>
      cases.filter((c) =>
        c.payments.some((p) => p.status === "completed" && (p.id === "deposit" || p.id === "advance"))
      ),
    [cases]
  );

  const allPayments = useMemo(
    () =>
      cases.flatMap((c) =>
        c.payments.map((p) => ({
          ...p,
          caseId: c.id,
          patientName: c.patientName,
        }))
      ),
    [cases]
  );

  const reconciliationItems = useMemo(() => {
    let items = allPayments.filter((p) => p.status === "completed");
    if (reconcileFilter === "unreconciled") {
      items = items.filter((p) => !p.reconciled);
    } else if (reconcileFilter === "reconciled") {
      items = items.filter((p) => p.reconciled);
    }
    return items;
  }, [allPayments, reconcileFilter]);

  const handleRefundSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!refundModal) return;
    initiateRefund(refundModal.case.id, refundModal.stageId, refundAmount, refundReason);
    setRefundSaved(true);
    setTimeout(() => {
      setRefundModal(null);
      setRefundAmount(0);
      setRefundReason("");
      setRefundSaved(false);
    }, 2000);
  };

  const handleDisputeAccess = (e: React.FormEvent) => {
    e.preventDefault();
    if (!disputeModal) return;
    grantBillingDisputeAccess(disputeModal.id, disputeReason);
    setDisputeSaved(true);
    setTimeout(() => {
      setDisputeModal(null);
      setDisputeReason("");
      setDisputeSaved(false);
    }, 2000);
  };

  const FINANCE_TABS: { id: FinanceTab; label: string; icon: React.ElementType }[] = [
    { id: "payment_ledger", label: "Payment Ledger", icon: FileText },
    { id: "escrow", label: "Escrow Monitor", icon: PiggyBank },
    { id: "refunds", label: "Refunds", icon: RefreshCcw },
    { id: "reconciliation", label: "Reconciliation", icon: Receipt },
    { id: "dispute", label: "Billing Disputes", icon: ShieldAlert },
  ];

  const getStatusBadge = (status: string) => {
    if (status === "completed") return "bg-emerald-100 text-emerald-800 border-emerald-200";
    if (status === "failed") return "bg-rose-100 text-rose-800 border-rose-200";
    return "bg-amber-100 text-amber-800 border-amber-200";
  };

  const getRefundStatusBadge = (status: string) => {
    if (status === "approved" || status === "processed") return "bg-emerald-100 text-emerald-800";
    if (status === "rejected") return "bg-rose-100 text-rose-800";
    return "bg-amber-100 text-amber-800";
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#071321] via-[#0B1E33] to-[#0D2642] rounded-2xl p-6 sm:p-8 text-white shadow-xl border border-slate-800/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-300 text-xs font-bold tracking-wider uppercase mb-2 border border-emerald-500/30">
            <DollarSign className="w-3.5 h-3.5" />
            Finance & Accounts Portal
          </div>
          <h2 className="text-2xl font-black tracking-tight text-white">
            Escrow Management & Payment Reconciliation
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl">
            Logged in as <strong>{currentUser?.name || "David Miller"}</strong> (Finance & Accounts).{" "}
            <span className="text-amber-300">Clinical data is redacted by default (RBAC boundary). Access only granted for active billing disputes.</span>
          </p>
        </div>
        {/* Key metrics */}
        <div className="relative z-10 flex items-center gap-3 flex-wrap shrink-0">
          <div className="flex items-center gap-2 bg-emerald-500/20 px-4 py-2.5 rounded-xl border border-emerald-500/30 text-xs font-bold text-emerald-300">
            <TrendingUp className="w-4 h-4" />
            <span>Revenue: ${totalRevenue.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-2 bg-amber-500/20 px-4 py-2.5 rounded-xl border border-amber-500/30 text-xs font-bold text-amber-300">
            <Clock className="w-4 h-4" />
            <span>Pending: ${totalPending.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* RBAC Notice */}
      <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-3">
        <Lock className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-800">
          <strong>Finance Role RBAC Boundary:</strong> Clinical records (medical reports, consultation notes, treatment plans) are not accessible by default.
          Dispute-based clinical access is available only when a billing dispute is active and access has been explicitly granted with an audit trail.
          This boundary prevents finance team members from accessing protected health information (PHI) outside of their operational scope.
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Revenue (Paid)", value: `$${totalRevenue.toLocaleString()}`, icon: DollarSign, color: "emerald" },
          { label: "Escrow Held (Pending)", value: `$${totalPending.toLocaleString()}`, icon: Wallet, color: "amber" },
          { label: "Refunds Requested", value: `$${totalRefundRequested.toLocaleString()}`, icon: RefreshCcw, color: "rose" },
          { label: "Cases in Escrow", value: escrowCases.length.toString(), icon: PiggyBank, color: "blue" },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-white/95 rounded-2xl p-5 border border-slate-200 shadow-sm flex items-start gap-3">
            <div className={`p-2.5 rounded-xl ${kpi.color === "emerald" ? "bg-emerald-100" :
              kpi.color === "amber" ? "bg-amber-100" :
                kpi.color === "rose" ? "bg-rose-100" :
                  "bg-blue-100"
              }`}>
              <kpi.icon className={`w-5 h-5 ${kpi.color === "emerald" ? "text-emerald-700" :
                kpi.color === "amber" ? "text-amber-700" :
                  kpi.color === "rose" ? "text-rose-700" :
                    "text-blue-700"
                }`} />
            </div>
            <div>
              <div className="text-xl font-black text-slate-900">{kpi.value}</div>
              <div className="text-[11px] text-slate-500 mt-0.5">{kpi.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto gap-1.5 bg-white/95 rounded-2xl p-1.5 border border-slate-200 shadow-sm">
        {FINANCE_TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${activeTab === tab.id
              ? "bg-gradient-to-r from-[#3abdb6] to-[#3fc1ba] text-white shadow-sm"
              : "text-slate-600 hover:bg-slate-100"
              }`}
          >
            <tab.icon className="w-3.5 h-3.5" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white/95 rounded-2xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] p-6">

        {/* ─── PAYMENT LEDGER ─────────────────────────────────────────── */}
        {activeTab === "payment_ledger" && (
          <div className="space-y-5">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <h4 className="font-black text-slate-900 text-sm flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#3F4EB4]" />
                Full Payment Ledger
              </h4>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search patient..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-3 py-2 text-xs text-slate-900 w-44"
                  />
                </div>
                <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-800 text-xs font-bold cursor-pointer border border-emerald-200">
                  <Download className="w-3.5 h-3.5" />
                  Export CSV
                </button>
              </div>
            </div>

            {/* Finance Note: Clinical Data NOT accessible */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 flex items-start gap-2">
              <EyeOff className="w-4 h-4 shrink-0 mt-0.5 text-slate-400" />
              <span>Patient medical records, clinical summaries, and treatment plans are <strong>NOT displayed</strong> in the Finance portal. Only financial transaction data is shown below.</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px] font-bold">
                    <th className="pb-3 text-left">Patient</th>
                    <th className="pb-3 text-left">Stage</th>
                    <th className="pb-3 text-left">Amount</th>
                    <th className="pb-3 text-left">Status</th>
                    <th className="pb-3 text-left">Method</th>
                    <th className="pb-3 text-left">Receipt</th>
                    <th className="pb-3 text-left">Gateway Ref</th>
                    <th className="pb-3 text-left">Paid At</th>
                    <th className="pb-3 text-left">Reconciled</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredCases.flatMap((c) =>
                    c.payments.map((p) => (
                      <tr key={`${c.id}-${p.id}`} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3">
                          <div className="font-bold text-slate-900">{c.patientName}</div>
                          <div className="font-mono text-[10px] text-slate-500">{c.id}</div>
                        </td>
                        <td className="py-3 font-semibold capitalize text-slate-800">{p.id}</td>
                        <td className="py-3">
                          <span className="font-black text-slate-900">${p.amountUsd.toLocaleString()}</span>
                          <span className="text-slate-500 ml-1">{p.currency || "USD"}</span>
                        </td>
                        <td className="py-3">
                          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${getStatusBadge(p.status)}`}>
                            {p.status}
                          </span>
                        </td>
                        <td className="py-3 text-slate-600 capitalize">{p.paymentMethod || "—"}</td>
                        <td className="py-3 font-mono text-[11px] text-slate-700">{p.receiptNumber || "—"}</td>
                        <td className="py-3 font-mono text-[11px] text-slate-700">{p.gatewayReference || "—"}</td>
                        <td className="py-3 text-slate-600">{p.paidAt ? new Date(p.paidAt).toLocaleDateString() : "—"}</td>
                        <td className="py-3">
                          {p.status === "completed" ? (
                            p.reconciled ? (
                              <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-700">
                                <CheckCircle2 className="w-3.5 h-3.5" /> Yes
                              </span>
                            ) : (
                              <span className="flex items-center gap-1 text-[10px] font-bold text-amber-600">
                                <AlertTriangle className="w-3.5 h-3.5" /> Pending
                              </span>
                            )
                          ) : <span className="text-slate-400 text-[10px]">—</span>}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ─── ESCROW MONITOR ────────────────────────────────────────── */}
        {activeTab === "escrow" && (
          <div className="space-y-5">
            <h4 className="font-black text-slate-900 text-sm flex items-center gap-2">
              <PiggyBank className="w-4 h-4 text-[#3F4EB4]" />
              Escrow Monitor — Staged Payment Control
            </h4>
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-200 text-xs text-blue-800 flex items-start gap-2">
              <Shield className="w-4 h-4 shrink-0 mt-0.5 text-blue-600" />
              Advance payment funds are held in healthcare escrow and released to the hospital only upon patient physical admission confirmation. Final payment is settled post-discharge and reconciled against the actual hospital bill.
            </div>

            {escrowCases.length === 0 ? (
              <div className="p-8 bg-slate-50 rounded-2xl text-center text-xs text-slate-400 border border-dashed border-slate-200">
                No cases currently have funds in escrow.
              </div>
            ) : (
              <div className="space-y-4">
                {escrowCases.map((c) => (
                  <div key={c.id} className="bg-slate-50 rounded-2xl border border-slate-200 p-5">
                    <div className="flex items-start justify-between gap-3 flex-wrap mb-4">
                      <div>
                        <span className="font-mono text-[10px] font-bold text-[#3F4EB4]">{c.id}</span>
                        <div className="font-black text-slate-900 text-sm mt-0.5">{c.patientName}</div>
                        <div className="text-xs text-slate-500">{c.patientCountry}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-slate-500">Total Contract Value</div>
                        <div className="text-xl font-black text-emerald-700">${c.quote?.totalCostUsd?.toLocaleString() || "—"}</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {c.payments.map((p) => (
                        <div key={p.id} className="flex items-center justify-between gap-3 text-xs p-3 bg-white rounded-xl border border-slate-200">
                          <div>
                            <div className="font-bold text-slate-900">{p.name}</div>
                            {p.status === "completed" && (
                              <div className="text-slate-500 text-[11px] mt-0.5">
                                {p.paidAt ? `Paid: ${new Date(p.paidAt).toLocaleDateString()}` : ""} · {p.transactionId || "—"}
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-3 shrink-0">
                            <span className="font-black text-slate-900">${p.amountUsd.toLocaleString()}</span>
                            <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${getStatusBadge(p.status)}`}>{p.status}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ─── REFUNDS ──────────────────────────────────────────────── */}
        {activeTab === "refunds" && (
          <div className="space-y-5">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <h4 className="font-black text-slate-900 text-sm flex items-center gap-2">
                <RefreshCcw className="w-4 h-4 text-[#3F4EB4]" />
                Refund Management
              </h4>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-slate-500" />
              Refunds over $2,000 require Super Admin approval before processing. Automated approval applies for amounts ≤ $2,000 based on configured refund rules.
            </div>

            {/* Initiate New Refund */}
            <div className="border border-slate-200 rounded-2xl p-5 space-y-4">
              <h5 className="font-bold text-slate-900 text-xs">Initiate a Refund</h5>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px] font-bold">
                      <th className="pb-3 text-left">Patient</th>
                      <th className="pb-3 text-left">Case</th>
                      <th className="pb-3 text-left">Deposit</th>
                      <th className="pb-3 text-left">Advance</th>
                      <th className="pb-3 text-left">Final</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredCases.filter((c) => c.payments.some((p) => p.status === "completed")).map((c) => (
                      <tr key={c.id} className="hover:bg-slate-50">
                        <td className="py-3 font-bold text-slate-900">{c.patientName}</td>
                        <td className="py-3 font-mono text-[10px] text-slate-500">{c.id}</td>
                        {(["deposit", "advance", "final"] as const).map((stageId) => {
                          const p = c.payments.find((p) => p.id === stageId);
                          const existingRefund = (c.refundRequests || []).find((r) => r.paymentStageId === stageId);
                          return (
                            <td key={stageId} className="py-3">
                              {p?.status === "completed" ? (
                                existingRefund ? (
                                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${getRefundStatusBadge(existingRefund.status)}`}>
                                    Refund: {existingRefund.status}
                                  </span>
                                ) : (
                                  <button
                                    onClick={() => { setRefundModal({ case: c, stageId }); setRefundAmount(p.amountUsd); }}
                                    className="px-3 py-1.5 rounded-lg bg-rose-100 hover:bg-rose-200 text-rose-800 font-bold cursor-pointer text-[10px] border border-rose-200"
                                  >
                                    Initiate (${p.amountUsd.toLocaleString()})
                                  </button>
                                )
                              ) : (
                                <span className="text-slate-300 text-[10px]">—</span>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Existing Refund Requests */}
            <div className="border border-slate-200 rounded-2xl p-5 space-y-4">
              <h5 className="font-bold text-slate-900 text-xs">Existing Refund Requests</h5>
              {cases.flatMap((c) => (c.refundRequests || []).map((r) => ({ ...r, patientName: c.patientName }))).length === 0 ? (
                <div className="text-xs text-slate-400 text-center py-4">No refund requests yet.</div>
              ) : (
                <div className="space-y-3">
                  {cases.flatMap((c) => (c.refundRequests || []).map((r) => ({ ...r, patientName: c.patientName }))).map((r) => (
                    <div key={r.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between gap-3 flex-wrap text-xs">
                      <div>
                        <div className="font-bold text-slate-900">{r.patientName}</div>
                        <div className="text-slate-600 mt-0.5">Stage: <strong>{r.paymentStageId}</strong> · Amount: <strong>${r.amountUsd.toLocaleString()}</strong></div>
                        <div className="text-slate-500 mt-0.5">Reason: {r.reason}</div>
                        <div className="text-slate-400 mt-0.5 text-[11px]">By {r.requestedByName} · {new Date(r.requestedAt).toLocaleString()}</div>
                      </div>
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${getRefundStatusBadge(r.status)}`}>
                        {r.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ─── RECONCILIATION ───────────────────────────────────────── */}
        {activeTab === "reconciliation" && (
          <div className="space-y-5">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <h4 className="font-black text-slate-900 text-sm flex items-center gap-2">
                <Receipt className="w-4 h-4 text-[#3F4EB4]" />
                Transaction Reconciliation
              </h4>
              <div className="flex items-center gap-2">
                <select
                  value={reconcileFilter}
                  onChange={(e) => setReconcileFilter(e.target.value as typeof reconcileFilter)}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-bold cursor-pointer focus:ring-2 focus:ring-[#2ECDC5] focus:outline-none"
                >
                  <option value="all">All Completed Transactions</option>
                  <option value="unreconciled">Unreconciled Only</option>
                  <option value="reconciled">Reconciled Only</option>
                </select>
                <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-800 text-xs font-bold cursor-pointer border border-emerald-200">
                  <Download className="w-3.5 h-3.5" /> Export
                </button>
              </div>
            </div>

            {reconciliationItems.length === 0 ? (
              <div className="p-8 bg-slate-50 rounded-2xl text-center text-xs text-slate-400 border border-dashed border-slate-200">No transactions match this filter.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px] font-bold">
                      <th className="pb-3 text-left">Patient</th>
                      <th className="pb-3 text-left">Stage</th>
                      <th className="pb-3 text-left">Amount</th>
                      <th className="pb-3 text-left">Receipt</th>
                      <th className="pb-3 text-left">Gateway Ref</th>
                      <th className="pb-3 text-left">Paid At</th>
                      <th className="pb-3 text-left">Reconciled</th>
                      <th className="pb-3 text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {reconciliationItems.map((item) => (
                      <tr key={`${item.caseId}-${item.id}`} className="hover:bg-slate-50">
                        <td className="py-3">
                          <div className="font-bold text-slate-900">{item.patientName}</div>
                          <div className="font-mono text-[10px] text-slate-500">{item.caseId}</div>
                        </td>
                        <td className="py-3 font-semibold capitalize text-slate-800">{item.id}</td>
                        <td className="py-3 font-black text-slate-900">${item.amountUsd.toLocaleString()}</td>
                        <td className="py-3 font-mono text-[11px] text-slate-700">{item.receiptNumber || "—"}</td>
                        <td className="py-3 font-mono text-[11px] text-slate-700">{item.gatewayReference || "—"}</td>
                        <td className="py-3 text-slate-600">{item.paidAt ? new Date(item.paidAt).toLocaleDateString() : "—"}</td>
                        <td className="py-3">
                          {item.reconciled ? (
                            <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-700">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Yes
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-[10px] font-bold text-amber-600">
                              <AlertTriangle className="w-3.5 h-3.5" /> Pending
                            </span>
                          )}
                        </td>
                        <td className="py-3">
                          {!item.reconciled && (
                            <button className="px-3 py-1.5 rounded-lg bg-[#3F4EB4] hover:bg-[#283593] text-white font-bold text-[10px] cursor-pointer">
                              Mark Reconciled
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ─── BILLING DISPUTES ─────────────────────────────────────── */}
        {activeTab === "dispute" && (
          <div className="space-y-5">
            <h4 className="font-black text-slate-900 text-sm flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-[#3F4EB4]" />
              Billing Disputes & Clinical Access Grants
            </h4>

            <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div className="text-xs text-amber-800">
                <strong>Strict Access Control:</strong> Finance staff do not have access to clinical data by default. When a billing dispute is active, a Super Admin or Finance Lead may grant temporary (48h) read-only access to the relevant clinical record for reconciliation purposes. Every access grant is logged immutably to the audit trail.
              </div>
            </div>

            {/* Cases with billing dispute flag */}
            <div className="space-y-3">
              {cases.filter((c) => c.hasBillingDispute).length === 0 ? (
                <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center text-xs text-emerald-700 font-semibold">
                  ✓ No active billing disputes across all cases.
                </div>
              ) : (
                cases.filter((c) => c.hasBillingDispute).map((c) => (
                  <div key={c.id} className="p-5 bg-rose-50 border border-rose-200 rounded-2xl space-y-3">
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                      <div>
                        <span className="font-mono text-[10px] font-bold text-rose-700">{c.id}</span>
                        <div className="font-black text-slate-900 text-sm">{c.patientName}</div>
                        <div className="text-xs text-rose-700 mt-0.5">Dispute: {c.billingDisputeNotes}</div>
                      </div>
                      {c.billingDisputeAccessGrants && c.billingDisputeAccessGrants.length > 0 && (
                        <div className="text-xs text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-xl">
                          Clinical access granted — expires {new Date(c.billingDisputeAccessGrants[c.billingDisputeAccessGrants.length - 1].expiresAt!).toLocaleString()}
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Grant Access Section */}
            <div className="border border-slate-200 rounded-2xl p-5 space-y-3">
              <h5 className="font-bold text-slate-900 text-xs">Request Clinical Access for Dispute Reconciliation</h5>
              <p className="text-xs text-slate-500">Select a case to grant temporary (48h) read-only clinical data access. This action is logged and audited.</p>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px] font-bold">
                      <th className="pb-3 text-left">Patient</th>
                      <th className="pb-3 text-left">Stage</th>
                      <th className="pb-3 text-left">Dispute</th>
                      <th className="pb-3 text-left">Access</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {cases.map((c) => (
                      <tr key={c.id} className="hover:bg-slate-50">
                        <td className="py-3 font-bold text-slate-900">{c.patientName}</td>
                        <td className="py-3 text-slate-600 capitalize">{c.stage}</td>
                        <td className="py-3">
                          {c.hasBillingDispute
                            ? <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full">Active Dispute</span>
                            : <span className="text-[10px] text-slate-400">None</span>
                          }
                        </td>
                        <td className="py-3">
                          {c.hasBillingDispute && c.billingDisputeAccessGrants && c.billingDisputeAccessGrants.length > 0 ? (
                            <span className="flex items-center gap-1 text-[10px] font-bold text-amber-700">
                              <Eye className="w-3.5 h-3.5" /> Access Active
                            </span>
                          ) : (
                            <button
                              onClick={() => setDisputeModal(c)}
                              className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-bold text-[10px] cursor-pointer"
                            >
                              Grant Access
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Refund Initiation Modal */}
      {refundModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-100 space-y-5">
            <h3 className="text-lg font-black text-slate-900">Initiate Refund</h3>
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700">
              <div>Patient: <strong>{refundModal.case.patientName}</strong></div>
              <div>Payment Stage: <strong className="capitalize">{refundModal.stageId}</strong></div>
              <div>Original Amount: <strong>${refundModal.case.payments.find((p) => p.id === refundModal.stageId)?.amountUsd.toLocaleString()}</strong></div>
            </div>
            {refundSaved ? (
              <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5" /> Refund initiated and logged to audit trail!
              </div>
            ) : (
              <form onSubmit={handleRefundSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Refund Amount (USD)</label>
                  <input
                    type="number"
                    required
                    min={1}
                    max={refundModal.case.payments.find((p) => p.id === refundModal.stageId)?.amountUsd}
                    value={refundAmount}
                    onChange={(e) => setRefundAmount(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900"
                  />
                  {refundAmount > 2000 && (
                    <p className="text-[11px] text-amber-700 mt-1 flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" /> Amount exceeds $2,000 — will require Super Admin approval.
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Reason (Required)</label>
                  <textarea
                    rows={3}
                    required
                    value={refundReason}
                    onChange={(e) => setRefundReason(e.target.value)}
                    placeholder="e.g. Visa rejected by embassy — full deposit refund per cancellation policy..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 resize-none"
                  />
                </div>
                <div className="flex gap-2 justify-end">
                  <button type="button" onClick={() => setRefundModal(null)} className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs cursor-pointer">Cancel</button>
                  <button type="submit" className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs cursor-pointer">
                    Initiate Refund
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Dispute Access Grant Modal */}
      {disputeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-100 space-y-5">
            <h3 className="text-lg font-black text-slate-900">Grant Billing Dispute Clinical Access</h3>
            <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 text-amber-700" />
              <span>This will grant 48-hour read-only access to clinical records for <strong>{disputeModal.patientName}</strong>. The action will be logged immutably to the audit trail. Access expires after 48 hours.</span>
            </div>
            {disputeSaved ? (
              <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5" /> Access granted and logged to audit trail!
              </div>
            ) : (
              <form onSubmit={handleDisputeAccess} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Reason for Access (Required)</label>
                  <textarea
                    rows={3}
                    required
                    value={disputeReason}
                    onChange={(e) => setDisputeReason(e.target.value)}
                    placeholder="e.g. Patient disputes $450 consumables charge not listed in original quote. Need to cross-reference clinical discharge report..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 resize-none"
                  />
                </div>
                <div className="flex gap-2 justify-end">
                  <button type="button" onClick={() => setDisputeModal(null)} className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs cursor-pointer">Cancel</button>
                  <button type="submit" className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs cursor-pointer">
                    Grant Access & Log
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
