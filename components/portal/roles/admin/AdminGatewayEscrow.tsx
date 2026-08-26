"use client";

import React, { useState } from "react";
import { PatientCase, AdminTab } from "@/types/portal";
import {
  Wallet,
  Receipt,
  CreditCard,
  CheckCircle2,
  Lock,
  ArrowUpRight,
  ShieldCheck,
  Search,
  Filter,
  DollarSign,
  Building2,
  RefreshCw,
  ArrowRight,
} from "lucide-react";

interface AdminGatewayEscrowProps {
  cases: PatientCase[];
  onNavigateTab?: (tab: AdminTab) => void;
}

export const AdminGatewayEscrow: React.FC<AdminGatewayEscrowProps> = ({ cases, onNavigateTab }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [providerFilter, setProviderFilter] = useState<string>("all");

  // Flatten payments with case context
  const allTransactions = cases.flatMap((c) =>
    (c.payments || []).map((p) => ({
      ...p,
      caseId: c.id,
      patientName: c.patientName || "Anonymous Patient",
      patientCountry: c.patientCountry || "Global",
      treatment: c.treatmentCategory || "General Medical",
      hospital: c.assignedHospitalId || "Medanta Hospital",
      hasDispute: c.hasBillingDispute || false,
    }))
  );

  const filteredTransactions = allTransactions.filter((t) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      (t.patientName || "").toLowerCase().includes(q) ||
      (t.caseId || "").toLowerCase().includes(q) ||
      (t.name || "").toLowerCase().includes(q) ||
      (t.transactionId || "").toLowerCase().includes(q) ||
      (t.gatewayReference || "").toLowerCase().includes(q);

    const matchesProvider =
      providerFilter === "all" ||
      (providerFilter === "stripe" && (t.paymentMethod || "").includes("card")) ||
      (providerFilter === "wire" && (t.paymentMethod || "").includes("wire"));

    return matchesSearch && matchesProvider;
  });

  const totalLocked = allTransactions
    .filter((t) => t.status === "completed" || (t.status as string) === "paid")
    .reduce((acc, t) => acc + (t.amountUsd || 0), 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#3F4EB4] bg-blue-50 px-2.5 py-0.5 rounded-full">
              Financial Ledger • Domain 4
            </span>
          </div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight mt-1">
            Gateway Transactions & Multi-Currency Escrow Vault
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time payment gateway transactions (Stripe / International SWIFT Wire), milestone locks, and multi-sig escrow disbursement ledger.
          </p>
        </div>

        {onNavigateTab && (
          <div className="flex items-center gap-2 shrink-0 flex-wrap">
            <button
              onClick={() => onNavigateTab("refund_approvals")}
              className="px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-800 text-xs font-bold border border-rose-200 flex items-center gap-1.5 cursor-pointer transition-colors shadow-xs"
            >
              <RefreshCw className="w-3.5 h-3.5 text-rose-600" />
              <span>Refund Approvals</span>
            </button>
            <button
              onClick={() => onNavigateTab("commission_payouts")}
              className="px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200 flex items-center gap-1.5 cursor-pointer transition-colors shadow-xs"
            >
              <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
              <span>Hospital Payouts</span>
            </button>
          </div>
        )}
      </div>

      {/* Escrow Vault Totals */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white/95 rounded-2xl p-4 border border-slate-200 shadow-xs">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Total Vault Held</span>
          <div className="text-2xl font-black text-slate-900 mt-1">${totalLocked.toLocaleString("en-US")}</div>
          <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full inline-block mt-2">
            Multi-Currency Escrow
          </span>
        </div>

        <div className="bg-white/95 rounded-2xl p-4 border border-slate-200 shadow-xs">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Disbursed to Hospitals</span>
          <div className="text-2xl font-black text-emerald-700 mt-1">$84,600</div>
          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full inline-block mt-2">
            Completed Milestones
          </span>
        </div>

        <div className="bg-white/95 rounded-2xl p-4 border border-slate-200 shadow-xs">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Pending Gateway Settlement</span>
          <div className="text-2xl font-black text-blue-700 mt-1">$14,250</div>
          <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full inline-block mt-2">
            T+2 Business Days
          </span>
        </div>

        <div className="bg-white/95 rounded-2xl p-4 border border-slate-200 shadow-xs">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Dispute Frozen Volume</span>
          <div className="text-2xl font-black text-rose-700 mt-1">$0.00</div>
          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full inline-block mt-2">
            0 Active Holds
          </span>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white/95 rounded-2xl border border-slate-200 shadow-sm p-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by Patient, Case ID, Reference (e.g. STRIPE_PI_...), or Stage…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-[#2ECDC5] focus:outline-none"
          />
        </div>

        <select
          value={providerFilter}
          onChange={(e) => setProviderFilter(e.target.value)}
          className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 font-bold focus:ring-2 focus:ring-[#2ECDC5] focus:outline-none cursor-pointer"
        >
          <option value="all">All Payment Gateways</option>
          <option value="stripe">Stripe Cards / Apple Pay</option>
          <option value="wire">SWIFT / International Bank Wire</option>
        </select>
      </div>

      {/* Transactions Table */}
      <div className="bg-white/95 rounded-2xl border border-slate-200 shadow-sm overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-slate-100 text-slate-400 uppercase text-[10px] font-black tracking-wider bg-slate-50/50">
              <th className="py-3.5 pl-5 text-left">Transaction & Case</th>
              <th className="py-3.5 text-left">Milestone Stage</th>
              <th className="py-3.5 text-left">Amount (USD)</th>
              <th className="py-3.5 text-left">Gateway / Method</th>
              <th className="py-3.5 text-left">Gateway Ref</th>
              <th className="py-3.5 text-left">Escrow Status</th>
              <th className="py-3.5 pr-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {filteredTransactions.map((tx, idx) => {
              const isPaid = tx.status === "completed" || (tx.status as string) === "paid";
              const stageName = tx.name || (tx.id ? String(tx.id).replace(/_/g, " ") : "Milestone Stage");
              const stageSub = tx.id ? `${String(tx.id).toUpperCase()} (${tx.percentage || 30}%)` : "ESCROW";
              const refId = tx.transactionId || tx.gatewayReference || `TX_ESC_${tx.caseId?.replace(/[^0-9]/g, "") || "00"}_${idx + 1}`;

              return (
                <tr key={`${tx.caseId}-${tx.id || idx}`} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 pl-5">
                    <div>
                      <div className="font-extrabold text-slate-900 text-xs flex items-center gap-1">
                        <span className="font-mono text-[#3F4EB4]">{tx.caseId}</span>
                        <span>• {tx.patientName}</span>
                      </div>
                      <div className="text-[11px] text-slate-500">{tx.patientCountry}</div>
                    </div>
                  </td>

                  <td className="py-4">
                    <div className="font-bold text-slate-800 text-xs">{stageName}</div>
                    <div className="text-[10px] text-slate-400 capitalize">{stageSub}</div>
                  </td>

                  <td className="py-4">
                    <span className="font-mono font-black text-sm text-slate-900">
                      ${(tx.amountUsd || 0).toLocaleString("en-US")}
                    </span>
                  </td>

                  <td className="py-4">
                    <span className="font-mono text-[11px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                      {tx.paymentMethod ? String(tx.paymentMethod).toUpperCase() : "STRIPE GATEWAY"}
                    </span>
                  </td>

                  <td className="py-4 font-mono text-[10px] text-slate-500">
                    {refId}
                  </td>

                  <td className="py-4">
                    <span
                      className={`inline-flex items-center gap-1 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border ${
                        isPaid
                          ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                          : "bg-amber-50 text-amber-800 border-amber-200"
                      }`}
                    >
                      {isPaid ? "🔒 Locked In Escrow" : "⏳ Pending Deposit"}
                    </span>
                  </td>

                  <td className="py-4 pr-5 text-right">
                    <button className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] cursor-pointer transition-colors">
                      Receipt
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
