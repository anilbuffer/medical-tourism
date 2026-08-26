"use client";

import React, { useState } from "react";
import { PatientCase, RefundRequest, AdminTab } from "@/types/portal";
import {
  RefreshCw,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Receipt,
  DollarSign,
  ShieldCheck,
  User,
  Wallet,
  ShieldAlert,
} from "lucide-react";

interface AdminRefundApprovalsProps {
  cases: PatientCase[];
  onNavigateTab?: (tab: AdminTab) => void;
}

export const AdminRefundApprovals: React.FC<AdminRefundApprovalsProps> = ({ cases, onNavigateTab }) => {
  // Extract all refund requests
  const [refunds, setRefunds] = useState<RefundRequest[]>([
    {
      id: "ref_req_001",
      caseId: "PT-2026-008492",
      paymentStageId: "intake_deposit",
      amountUsd: 1500,
      reason: "Patient travel delayed due to unexpected family medical emergency. Requesting full initial intake deposit refund.",
      requestedAt: new Date(Date.now() - 14 * 3600 * 1000).toISOString(),
      requestedByName: "Robert Vance",
      status: "pending_approval",
    },
    {
      id: "ref_req_002",
      caseId: "PT-2026-009104",
      paymentStageId: "booking_deposit",
      amountUsd: 4250,
      reason: "Clinical evaluation completed. Patient unable to proceed with surgical travel at this time. 85% rule applicable.",
      requestedAt: new Date(Date.now() - 36 * 3600 * 1000).toISOString(),
      requestedByName: "Aisha Khan (Care Coordinator)",
      status: "pending_approval",
    },
  ]);

  const handleApprove = (reqId: string) => {
    setRefunds((prev) =>
      prev.map((r) =>
        r.id === reqId
          ? {
              ...r,
              status: "approved",
              approvedByName: "Rajesh Verma (Super Admin)",
              approvedAt: new Date().toISOString(),
            }
          : r
      )
    );
  };

  const handleReject = (reqId: string) => {
    setRefunds((prev) =>
      prev.map((r) =>
        r.id === reqId
          ? {
              ...r,
              status: "rejected",
              approvedByName: "Rajesh Verma (Super Admin)",
              approvedAt: new Date().toISOString(),
            }
          : r
      )
    );
  };

  const pendingRefunds = refunds.filter((r) => r.status === "pending_approval");
  const processedRefunds = refunds.filter((r) => r.status !== "pending_approval");

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
            Refund Approval Center & Escrow Reversals
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Dual-authorization sign-off for patient refund claims, stage-wise deduction audits, and automated Stripe/SWIFT reversals.
          </p>
        </div>

        {onNavigateTab && (
          <div className="flex items-center gap-2 shrink-0 flex-wrap">
            <button
              onClick={() => onNavigateTab("refund_escrow_rules")}
              className="px-3.5 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-800 text-xs font-bold border border-purple-200 flex items-center gap-1.5 cursor-pointer transition-colors shadow-xs"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-purple-600" />
              <span>Refund Stage Rules</span>
            </button>
            <button
              onClick={() => onNavigateTab("gateway_escrow")}
              className="px-3.5 py-2 rounded-xl bg-teal-50 hover:bg-teal-100 text-[#1baba4] text-xs font-bold border border-teal-200 flex items-center gap-1.5 cursor-pointer transition-colors shadow-xs"
            >
              <Wallet className="w-3.5 h-3.5" />
              <span>Escrow Vault</span>
            </button>
          </div>
        )}
      </div>

      {/* Pending Requests Queue */}
      <div className="space-y-4">
        <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-600" />
          Pending Refund Review Queue ({pendingRefunds.length})
        </h3>

        {pendingRefunds.length === 0 ? (
          <div className="bg-white/95 rounded-2xl border border-slate-200 shadow-sm p-8 text-center text-xs text-slate-400">
            ✓ No refund requests pending Super Admin approval.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pendingRefunds.map((req) => (
              <div
                key={req.id}
                className="bg-white/95 rounded-2xl border border-amber-200 shadow-sm p-5 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-black text-[#3F4EB4] bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                      {req.caseId}
                    </span>
                    <span className="text-lg font-black text-rose-700">
                      ${req.amountUsd.toLocaleString("en-US")} USD
                    </span>
                  </div>

                  <div className="text-xs text-slate-700">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Claimed by:</span>
                    <strong>{req.requestedByName}</strong> on {new Date(req.requestedAt).toLocaleString("en-US")}
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-800 leading-relaxed">
                    <strong className="block text-slate-900 mb-0.5">Stated Justification:</strong>
                    {req.reason}
                  </div>

                  <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200/80 text-[11px] text-amber-900 space-y-1">
                    <div className="font-bold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-amber-700" /> Compliance Stage Rule Check:
                    </div>
                    <div>Payment Stage: <strong className="font-mono">{req.paymentStageId}</strong></div>
                    <div>Calculated Escrow Retention: <strong>$0.00 (100% Eligible)</strong></div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                  <button
                    onClick={() => handleReject(req.id)}
                    className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-rose-50 hover:text-rose-700 text-slate-700 font-bold text-xs cursor-pointer transition-colors"
                  >
                    Reject Claim
                  </button>
                  <button
                    onClick={() => handleApprove(req.id)}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#1d8983] via-[#1baba4] to-[#1d8983] text-white font-extrabold text-xs shadow-md cursor-pointer hover:scale-105 transition-all"
                  >
                    Approve & Reverse Escrow
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Historical Processed Refunds Table */}
      {processedRefunds.length > 0 && (
        <div className="bg-white/95 rounded-2xl border border-slate-200 shadow-sm p-5 space-y-3">
          <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
            Approved & Executed Refund Ledger
          </h3>
          <div className="divide-y divide-slate-100 text-xs">
            {processedRefunds.map((r) => (
              <div key={r.id} className="py-3 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900">
                    <span className="font-mono text-[#3F4EB4]">{r.caseId}</span> • ${r.amountUsd} USD
                  </div>
                  <div className="text-[11px] text-slate-500">{r.reason}</div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-black uppercase text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    ✓ Approved by {r.approvedByName}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
