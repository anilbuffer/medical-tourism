"use client";

import React, { useState } from "react";
import { HospitalPayoutBatch } from "@/types/portal";
import { MOCK_HOSPITAL_PAYOUTS } from "@/lib/portal/mockData";
import {
  DollarSign,
  Building2,
  CheckCircle2,
  Clock,
  Send,
  Download,
  AlertTriangle,
  Receipt,
  FileCheck,
} from "lucide-react";

export const AdminCommissionPayouts: React.FC = () => {
  const [payouts, setPayouts] = useState<HospitalPayoutBatch[]>(MOCK_HOSPITAL_PAYOUTS);

  const handleApproveBatch = (batchId: string) => {
    setPayouts((prev) =>
      prev.map((p) =>
        p.id === batchId
          ? {
              ...p,
              status: "processing",
              approvedByName: "Rajesh Verma (Super Admin)",
              approvedAt: new Date().toISOString(),
            }
          : p
      )
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Bar */}
      <div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-black uppercase tracking-widest text-[#3F4EB4] bg-blue-50 px-2.5 py-0.5 rounded-full">
            Financial Ledger • Domain 4
          </span>
        </div>
        <h2 className="text-xl font-black text-slate-900 tracking-tight mt-1">
          Hospital Commission Splits & Payout Batches
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Settlement accounting, Vedara platform revenue share deductions, and SWIFT/IBAN wire dispatches to partner hospitals.
        </p>
      </div>

      {/* Payout Batches Table */}
      <div className="bg-white/95 rounded-2xl border border-slate-200 shadow-sm overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-slate-100 text-slate-400 uppercase text-[10px] font-black tracking-wider bg-slate-50/50">
              <th className="py-3.5 pl-5 text-left">Hospital Partner</th>
              <th className="py-3.5 text-left">Settlement Period</th>
              <th className="py-3.5 text-left">Gross Revenue</th>
              <th className="py-3.5 text-left">Platform Fee</th>
              <th className="py-3.5 text-left">Net Hospital Wire</th>
              <th className="py-3.5 text-left">SWIFT / IBAN Routing</th>
              <th className="py-3.5 text-left">Batch Status</th>
              <th className="py-3.5 pr-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {payouts.map((batch) => (
              <tr key={batch.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="py-4 pl-5">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-[#3F4EB4]" />
                    <div>
                      <div className="font-extrabold text-slate-900 text-xs">{batch.hospitalName}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{batch.id} • {batch.caseCount} Cases</div>
                    </div>
                  </div>
                </td>

                <td className="py-4 text-slate-600 font-bold">
                  {batch.periodStart} to {batch.periodEnd}
                </td>

                <td className="py-4 font-mono font-bold text-slate-900">
                  ${batch.grossAmountUsd.toLocaleString()}
                </td>

                <td className="py-4">
                  <span className="font-mono text-emerald-700 font-bold">
                    ${batch.platformFeeUsd.toLocaleString()} ({batch.platformFeePercentage}%)
                  </span>
                </td>

                <td className="py-4 font-mono font-black text-sm text-[#3F4EB4]">
                  ${batch.netPayoutUsd.toLocaleString()}
                </td>

                <td className="py-4 font-mono text-[10px] text-slate-500">
                  <div>SWIFT: <strong>{batch.bankSwiftCode}</strong></div>
                  <div className="truncate max-w-[120px]">{batch.bankIban}</div>
                </td>

                <td className="py-4">
                  <span
                    className={`inline-block text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border ${
                      batch.status === "disbursed"
                        ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                        : batch.status === "processing"
                        ? "bg-blue-50 text-blue-800 border-blue-200"
                        : "bg-amber-50 text-amber-800 border-amber-200"
                    }`}
                  >
                    {(batch.status || "STATUS").replace(/_/g, " ")}
                  </span>
                </td>

                <td className="py-4 pr-5 text-right">
                  {batch.status === "pending_approval" ? (
                    <button
                      onClick={() => handleApproveBatch(batch.id)}
                      className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#1d8983] via-[#1baba4] to-[#1d8983] text-white font-extrabold text-[11px] shadow-sm cursor-pointer hover:scale-105 transition-all"
                    >
                      Approve Payout
                    </button>
                  ) : (
                    <button className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-bold text-[11px] cursor-pointer flex items-center gap-1 ml-auto">
                      <Download className="w-3 h-3" /> Voucher
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
