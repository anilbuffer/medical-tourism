"use client";

import React from "react";
import { PatientCase } from "@/types/portal";
import { usePortal } from "@/lib/portal/store";
import {
  CreditCard,
  DollarSign,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  Clock,
  FileText,
  Lock,
  Building,
  Receipt,
} from "lucide-react";

interface FinanceViewProps {
  cases: PatientCase[];
}

export const FinanceView: React.FC<FinanceViewProps> = ({ cases }) => {
  const { currentUser } = usePortal();

  // Aggregate stats across all cases
  const allPayments = cases.flatMap((c) =>
    c.payments.map((p) => ({ ...p, caseId: c.id, patientName: c.patientName, dispute: c.hasBillingDispute }))
  );

  const totalCollectedUsd = allPayments
    .filter((p) => p.status === "completed")
    .reduce((sum, p) => sum + p.amountUsd, 0);

  const totalPendingUsd = allPayments
    .filter((p) => p.status === "pending")
    .reduce((sum, p) => sum + p.amountUsd, 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#0E1F40] via-[#112D4E] to-emerald-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-400/20 text-emerald-300 text-xs font-bold tracking-wider uppercase mb-2 border border-emerald-400/30">
            <DollarSign className="w-3.5 h-3.5" />
            Finance & Accounts Ledger Desk
          </div>
          <h2 className="text-2xl font-black tracking-tight">
            Healthcare Escrow & Staged Billing Reconciliation
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl">
            Logged in as <strong>{currentUser?.name || "David Miller"}</strong>. (Clinical records and diagnostic imaging are automatically redacted by database security policy, unless linked to a billing dispute).
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-3 bg-white/10 rounded-2xl text-right">
            <div className="text-[10px] text-slate-300 uppercase font-bold">Total Escrow Collected</div>
            <div className="text-xl font-black text-emerald-300">${totalCollectedUsd.toLocaleString()} USD</div>
          </div>
        </div>
      </div>

      {/* RLS Redaction Notice */}
      <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
        <Lock className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <div>
          <strong className="font-extrabold">Data Governance Policy Active (HIPAA / DPDP):</strong>
          <p className="mt-0.5 leading-relaxed">
            Finance roles have full row access across all financial payments and invoices, but patient diagnostic scan files and doctor clinical complaint notes are strictly masked.
          </p>
        </div>
      </div>

      {/* Payments Ledger Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 space-y-4">
        <h3 className="font-black text-slate-900 text-lg flex items-center gap-2">
          <Receipt className="w-5 h-5 text-teal-600" />
          <span>Cross-Border Staged Payment Transactions</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 uppercase font-bold text-[10px]">
                <th className="pb-3">Patient & Case ID</th>
                <th className="pb-3">Milestone Stage</th>
                <th className="pb-3">Amount (USD)</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Txn Ref / Receipt</th>
                <th className="pb-3">Terms Accepted</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {allPayments.map((p, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 font-bold text-slate-900">
                    <div>{p.patientName}</div>
                    <div className="text-[11px] font-mono text-teal-700">{p.caseId}</div>
                  </td>
                  <td className="py-3.5 font-semibold text-slate-700">{p.name}</td>
                  <td className="py-3.5 font-black text-slate-900">${p.amountUsd.toLocaleString()}</td>
                  <td className="py-3.5">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        p.status === "completed"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="py-3.5 font-mono text-[11px] text-slate-600">
                    {p.transactionId || "—"}
                  </td>
                  <td className="py-3.5 text-slate-500">
                    {p.termsAcceptedAt ? (
                      <span className="text-emerald-700 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Signed
                      </span>
                    ) : (
                      "Pending"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
