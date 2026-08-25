"use client";

import React, { useState } from "react";
import { PatientCase, PatientDocument } from "@/types/portal";
import { usePortal } from "@/lib/portal/store";
import {
  Users,
  Clock,
  AlertTriangle,
  CheckCircle2,
  FileText,
  Building2,
  Phone,
  Mail,
  Send,
  Sparkles,
  ShieldCheck,
  Eye,
  MessageSquare,
  ArrowRight,
  Filter,
} from "lucide-react";

interface CSQueueViewProps {
  cases: PatientCase[];
  onSelectCase: (caseId: string) => void;
  activeCaseId: string;
}

export const CSQueueView: React.FC<CSQueueViewProps> = ({
  cases,
  onSelectCase,
  activeCaseId,
}) => {
  const { updateDocumentReviewStatus, updateCaseStage, currentUser } = usePortal();
  const [reviewModalDoc, setReviewModalDoc] = useState<{ caseId: string; doc: PatientDocument } | null>(
    null
  );
  const [reviewStatus, setReviewStatus] = useState<"reviewed" | "incomplete">("reviewed");
  const [reviewFeedback, setReviewFeedback] = useState("");

  const activeCase = cases.find((c) => c.id === activeCaseId) || cases[0];

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewModalDoc) return;
    updateDocumentReviewStatus(
      reviewModalDoc.caseId,
      reviewModalDoc.doc.id,
      reviewStatus,
      reviewFeedback || (reviewStatus === "reviewed" ? "Approved by CS Coordinator." : "Please re-upload clearer scans.")
    );
    setReviewModalDoc(null);
    setReviewFeedback("");
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#0E1F40] via-[#1A365D] to-teal-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-400/20 text-teal-300 text-xs font-bold tracking-wider uppercase mb-2 border border-teal-400/30">
            <Users className="w-3.5 h-3.5" />
            Customer Support (CS) Queue Desk
          </div>
          <h2 className="text-2xl font-black tracking-tight">
            International Patient Triage & SLA Monitor
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl">
            Logged in as <strong>{currentUser?.name}</strong> • Assigned Queues:{" "}
            {currentUser?.assignedQueues?.join(", ") || "Global Queue"}. (Clinical diagnosis fields are read-only per RBAC policy).
          </p>
        </div>

        <div className="flex items-center gap-3 bg-white/10 px-4 py-2.5 rounded-2xl backdrop-blur-sm border border-white/10 text-xs">
          <Clock className="w-4 h-4 text-amber-300" />
          <span>Tier-1 SLA Target: &lt; 45m</span>
        </div>
      </div>

      {/* Grid: Cases Queue & Case Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Col: Cases List */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-extrabold text-slate-900 text-sm">
              Assigned Queue ({cases.length} Cases)
            </h3>
            <span className="text-[11px] text-teal-700 font-bold bg-teal-50 px-2 py-0.5 rounded-full">
              Live Feed
            </span>
          </div>

          <div className="space-y-2">
            {cases.map((c) => {
              const isSelected = c.id === activeCaseId;
              const pendingDocs = c.documents.filter((d) => d.status === "pending_review").length;

              return (
                <button
                  key={c.id}
                  onClick={() => onSelectCase(c.id)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all ${
                    isSelected
                      ? "bg-slate-900 text-white border-slate-900 shadow-md"
                      : "bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-teal-400">{c.id}</span>
                    <span
                      className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded ${
                        isSelected ? "bg-white/20 text-white" : "bg-teal-100 text-teal-800"
                      }`}
                    >
                      {c.stage.replace("_", " ")}
                    </span>
                  </div>

                  <div className="font-black text-sm mt-1 truncate">{c.patientName}</div>
                  <div className={`text-xs mt-0.5 truncate ${isSelected ? "text-slate-300" : "text-slate-500"}`}>
                    {c.treatmentCategory} • {c.patientCountry}
                  </div>

                  <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[11px]">
                    <span className="flex items-center gap-1 text-amber-400">
                      <Clock className="w-3 h-3" />
                      <span>SLA: 45m</span>
                    </span>
                    {pendingDocs > 0 && (
                      <span className="font-bold text-teal-300">
                        {pendingDocs} doc{pendingDocs > 1 ? "s" : ""} pending review
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right 2 Cols: Selected Case Action & Document Review Desk */}
        {activeCase && (
          <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-mono font-bold text-teal-700">{activeCase.id}</span>
                <h3 className="text-xl font-black text-slate-900">{activeCase.patientName}</h3>
                <div className="text-xs text-slate-500 flex items-center gap-3 mt-0.5">
                  <span>Country: <strong>{activeCase.patientCountry}</strong></span>
                  <span>Queue: <strong>{activeCase.assignedQueue}</strong></span>
                  <span>Contact: {activeCase.patientPhone}</span>
                </div>
              </div>

              {/* Stage Transition Dropdown */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500">Stage:</span>
                <select
                  value={activeCase.stage}
                  onChange={(e) => updateCaseStage(activeCase.id, e.target.value as any)}
                  className="bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 rounded-xl p-2 focus:bg-white"
                >
                  <option value="lead">Lead</option>
                  <option value="contacted">Contacted</option>
                  <option value="documents_collected">Documents Collected</option>
                  <option value="hospital_handover">Hospital Handover</option>
                  <option value="consultation">Consultation</option>
                  <option value="quote">Quote Sent</option>
                  <option value="payment">Payment Stage</option>
                  <option value="booking">Booking / Visa</option>
                  <option value="treatment">Treatment In-Hospital</option>
                  <option value="followup">Follow-up</option>
                </select>
              </div>
            </div>

            {/* Document Review Section */}
            <div className="space-y-4">
              <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                <FileText className="w-4 h-4 text-teal-600" />
                <span>Patient Document Triage & Quality Review</span>
              </h4>

              {activeCase.documents.length === 0 ? (
                <div className="p-6 bg-slate-50 rounded-2xl text-center text-xs text-slate-500 border border-dashed border-slate-200">
                  No documents uploaded yet by this patient.
                </div>
              ) : (
                <div className="space-y-3">
                  {activeCase.documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-xs text-slate-900">{doc.title}</span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                            v{doc.currentVersion}
                          </span>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              doc.status === "reviewed"
                                ? "bg-emerald-100 text-emerald-800"
                                : doc.status === "incomplete"
                                ? "bg-rose-100 text-rose-800"
                                : "bg-amber-100 text-amber-800"
                            }`}
                          >
                            {doc.status}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          Latest: {doc.versions[0]?.fileName} ({doc.versions[0]?.fileSize})
                        </div>
                        {doc.csFeedback && (
                          <div className="text-[11px] text-slate-700 italic mt-1 bg-white p-2 rounded-lg border border-slate-200">
                            Note: {doc.csFeedback}
                          </div>
                        )}
                      </div>

                      <button
                        onClick={() =>
                          setReviewModalDoc({ caseId: activeCase.id, doc })
                        }
                        className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shrink-0 shadow-sm"
                      >
                        Review / Give Feedback
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Read-Only Clinical View Warning */}
            <div className="p-4 bg-blue-50/70 rounded-2xl border border-blue-200 text-xs text-blue-900 flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold">RBAC Access Boundary Enforcement:</strong>
                <span>
                  Customer Support role can view clinical complaint and diagnosis for qualification, but direct modification of clinical prescriptions and surgical suitability is strictly restricted to Hospital Specialists.
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Review Modal */}
      {reviewModalDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 space-y-5">
            <h3 className="text-lg font-black text-slate-900">
              Review Document: {reviewModalDoc.doc.title}
            </h3>

            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Set Status</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setReviewStatus("reviewed")}
                    className={`py-2.5 rounded-xl text-xs font-bold border transition-all ${
                      reviewStatus === "reviewed"
                        ? "bg-emerald-600 text-white border-emerald-600"
                        : "bg-slate-50 text-slate-700 border-slate-200"
                    }`}
                  >
                    Mark Reviewed & Verified
                  </button>
                  <button
                    type="button"
                    onClick={() => setReviewStatus("incomplete")}
                    className={`py-2.5 rounded-xl text-xs font-bold border transition-all ${
                      reviewStatus === "incomplete"
                        ? "bg-rose-600 text-white border-rose-600"
                        : "bg-slate-50 text-slate-700 border-slate-200"
                    }`}
                  >
                    Mark Incomplete / Missing
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Reviewer Notes for Patient
                </label>
                <textarea
                  rows={3}
                  placeholder={
                    reviewStatus === "incomplete"
                      ? "e.g. Please re-upload full high-res DICOM slice images, coronal series is missing."
                      : "Verified scan resolution and valve parameters."
                  }
                  value={reviewFeedback}
                  onChange={(e) => setReviewFeedback(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:bg-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setReviewModalDoc(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs"
                >
                  Save Review Decision
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
