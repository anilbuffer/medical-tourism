"use client";

import React, { useState } from "react";
import { PatientCase, PatientDocument, DocumentStatus } from "@/types/portal";
import { usePortal } from "@/lib/portal/store";
import {
  FileText,
  Upload,
  Clock,
  CheckCircle2,
  AlertCircle,
  History,
  Download,
  Eye,
  FilePlus,
  Tag,
  X,
  Sparkles,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface MyDocumentsTabProps {
  patientCase: PatientCase;
}

export const MyDocumentsTab: React.FC<MyDocumentsTabProps> = ({ patientCase }) => {
  const { uploadDocument } = usePortal();

  // Upload Modal State
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [targetDocId, setTargetDocId] = useState<string | undefined>(undefined); // for version upgrade
  const [docTitle, setDocTitle] = useState("");
  const [category, setCategory] = useState<PatientDocument["category"]>("medical_report");
  const [simulatedFileName, setSimulatedFileName] = useState("");
  const [simulatedFileSize, setSimulatedFileSize] = useState("3.4 MB");
  const [isUploading, setIsUploading] = useState(false);

  // Version History Drawer / Modal State
  const [selectedDocForHistory, setSelectedDocForHistory] = useState<PatientDocument | null>(null);

  // Filter tab
  const [filterCategory, setFilterCategory] = useState<string>("all");

  const openNewUpload = () => {
    setTargetDocId(undefined);
    setDocTitle("");
    setCategory("medical_report");
    setSimulatedFileName("Cardiac_MRI_HighResolution_2026.pdf");
    setSimulatedFileSize("6.2 MB");
    setIsUploadOpen(true);
  };

  const openReuploadVersion = (doc: PatientDocument) => {
    setTargetDocId(doc.id);
    setDocTitle(doc.title);
    setCategory(doc.category);
    setSimulatedFileName(`${doc.title.replace(/[^a-zA-Z0-9]/g, "_")}_v${doc.currentVersion + 1}_revised.pdf`);
    setSimulatedFileSize("7.1 MB");
    setIsUploadOpen(true);
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!simulatedFileName) return;

    setIsUploading(true);
    setTimeout(() => {
      uploadDocument(
        patientCase.id,
        docTitle || "Medical Scan / Diagnostic Report",
        category,
        simulatedFileName,
        simulatedFileSize,
        targetDocId
      );
      setIsUploading(false);
      setIsUploadOpen(false);
    }, 600);
  };

  const filteredDocs = patientCase.documents.filter((doc) => {
    if (filterCategory === "all") return true;
    return doc.category === filterCategory;
  });

  const getStatusBadge = (status: DocumentStatus) => {
    switch (status) {
      case "reviewed":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Reviewed & Verified
          </span>
        );
      case "incomplete":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200 animate-pulse">
            <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
            Incomplete - Re-upload Needed
          </span>
        );
      case "pending_review":
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            Pending Clinical Review
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header Card */}
      <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2ECDC5]/10 text-[#3F4EB4] text-xs font-bold tracking-wider uppercase mb-2 border border-[#2ECDC5]/20">
            <ShieldCheck className="w-3.5 h-3.5 text-[#2ECDC5]" />
            HIPAA & DPDP Compliant Vault
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Medical Documents & Diagnostic Vault
          </h2>
          <p className="text-slate-500 text-sm mt-1 max-w-xl">
            Upload diagnostic scans, lab reports, previous prescriptions, and passport for visa clearance. Re-uploads preserve complete audit version history.
          </p>
        </div>

        <button
          onClick={openNewUpload}
          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-[#2ECDC5] via-[#2ECDC5] to-[#2abdb5]  text-white font-bold text-sm shadow-md hover:shadow-xl transition-all duration-300 flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <Upload className="w-4 h-4" />
          <span>Upload New Record</span>
        </button>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {[
          { id: "all", label: "All Documents" },
          { id: "scan_imaging", label: "Scans & Imaging (DICOM / MRI / CT)" },
          { id: "medical_report", label: "Lab & Clinical Reports" },
          { id: "passport_id", label: "Passport & Visa IDs" },
          { id: "prescription", label: "Prescriptions & History" },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setFilterCategory(f.id)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${filterCategory === f.id
              ? "bg-gradient-to-r from-[#2ECDC5] via-[#2ECDC5] to-[#2abdb5] text-white shadow-md font-extrabold"
              : "bg-white/95 backdrop-blur-xl text-slate-600 border border-slate-200 shadow-xs hover:border-[#2ECDC5]/40 hover:bg-slate-50"
              }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Documents List */}
      {filteredDocs.length === 0 ? (
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-12 text-center border border-dashed border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#2ECDC5]/10 text-[#3F4EB4] flex items-center justify-center mx-auto">
            <FileText className="w-8 h-8 text-[#2ECDC5]" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800">No documents found in this category</h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto mt-1">
              Upload your diagnostic reports or previous hospital discharge files so our doctors can evaluate your case.
            </p>
          </div>
          <button
            onClick={openNewUpload}
            className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#2ECDC5] via-[#2ECDC5] to-[#2abdb5]  text-white font-bold text-xs inline-flex items-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <Upload className="w-4 h-4" />
            Upload Document Now
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredDocs.map((doc) => {
            const latestVersion = doc.versions[0] || {
              fileName: "Report.pdf",
              fileSize: "2.4 MB",
              uploadedAt: new Date().toISOString(),
              uploadedBy: "Patient",
            };

            return (
              <div
                key={doc.id}
                className="bg-white/95 backdrop-blur-xl rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-[#2ECDC5]/40 transition-all duration-300 space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-[#2ECDC5]/10 text-[#3F4EB4] flex items-center justify-center shrink-0 font-bold border border-[#2ECDC5]/20">
                      <FileText className="w-6 h-6 text-[#3F4EB4]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-extrabold text-slate-900 text-base">{doc.title}</h4>
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                          Version {doc.currentVersion}
                        </span>
                        {getStatusBadge(doc.status)}
                      </div>
                      <div className="text-xs text-slate-500 mt-1 flex items-center gap-3 flex-wrap">
                        <span>File: <strong className="text-slate-700">{latestVersion.fileName}</strong></span>
                        <span>Size: {latestVersion.fileSize}</span>
                        <span>Uploaded: {new Date(latestVersion.uploadedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 sm:self-center">
                    {doc.versions.length > 1 && (
                      <button
                        onClick={() => setSelectedDocForHistory(doc)}
                        className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                        title="View Version History"
                      >
                        <History className="w-3.5 h-3.5 text-slate-500" />
                        <span>History ({doc.versions.length})</span>
                      </button>
                    )}

                    <button
                      onClick={() => openReuploadVersion(doc)}
                      className="px-3.5 py-2 rounded-xl bg-[#2ECDC5]/10 hover:bg-[#2ECDC5]/20 text-[#3F4EB4] font-bold text-xs flex items-center gap-1.5 border border-[#2ECDC5]/30 transition-all cursor-pointer"
                    >
                      <Upload className="w-3.5 h-3.5 text-[#2ECDC5]" />
                      <span>Re-upload New Ver</span>
                    </button>
                  </div>
                </div>

                {/* CS Feedback or Incomplete Note Banner */}
                {doc.csFeedback && (
                  <div
                    className={`p-3.5 rounded-2xl text-xs flex items-start gap-2.5 ${doc.status === "incomplete"
                      ? "bg-rose-50 border border-rose-200 text-rose-800 font-medium"
                      : "bg-emerald-50 border border-emerald-200 text-emerald-800 font-medium"
                      }`}
                  >
                    <AlertCircle
                      className={`w-4 h-4 shrink-0 mt-0.5 ${doc.status === "incomplete" ? "text-rose-600" : "text-emerald-600"
                        }`}
                    />
                    <div>
                      <strong className="block font-bold">
                        {doc.status === "incomplete" ? "Clinical Feedback (Action Required):" : "Coordinator Review Note:"}
                      </strong>
                      <span>{doc.csFeedback}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ================= Upload Document Modal ================= */}
      {isUploadOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-xl font-black text-slate-900">
                  {targetDocId ? "Re-upload Document (Version Archive)" : "Upload Medical Record"}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {targetDocId
                    ? "Old version will be archived; new version sent for clinical review."
                    : "Encrypted direct hospital upload"}
                </p>
              </div>
              <button
                onClick={() => setIsUploadOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Document Title / Description *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 2D Echo Doppler Loop Scan"
                  value={docTitle}
                  onChange={(e) => setDocTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>

              {!targetDocId && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Document Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full bg-white border border-slate-300 rounded-2xl p-3.5 text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-[#2ECDC5] focus:outline-none font-bold shadow-xs cursor-pointer"
                  >
                    <option value="scan_imaging" className="bg-white text-slate-900 font-medium">Diagnostic Imaging (MRI, CT, DICOM, X-Ray)</option>
                    <option value="medical_report" className="bg-white text-slate-900 font-medium">Clinical & Pathology Lab Reports</option>
                    <option value="prescription" className="bg-white text-slate-900 font-medium">Prior Prescriptions & Physician Notes</option>
                    <option value="passport_id" className="bg-white text-slate-900 font-medium">Passport Bio Page / Visa Documents</option>
                    <option value="prior_history" className="bg-white text-slate-900 font-medium">Previous Discharge Summaries</option>
                    <option value="other" className="bg-white text-slate-900 font-medium">Other Supporting Documents</option>
                  </select>
                </div>
              )}

              {/* Simulated File Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Selected File (PDF, DICOM, JPEG, PNG)
                </label>
                <div className="p-4 bg-teal-50/60 rounded-2xl border-2 border-dashed border-teal-200 text-center space-y-2">
                  <FileText className="w-8 h-8 text-teal-600 mx-auto" />
                  <input
                    type="text"
                    value={simulatedFileName}
                    onChange={(e) => setSimulatedFileName(e.target.value)}
                    className="w-full text-center bg-white border border-teal-200 rounded-lg p-2 text-xs font-bold text-slate-800"
                  />
                  <div className="text-[11px] text-teal-700 font-medium">
                    File Size: {simulatedFileSize} • Security: AES-256 Cloud Vault
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsUploadOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUploading || !simulatedFileName}
                  className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  {isUploading ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Encrypting & Uploading...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-3.5 h-3.5" />
                      <span>{targetDocId ? "Save New Version" : "Upload File"}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= Version History Drawer / Modal ================= */}
      {selectedDocForHistory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-xl font-black text-slate-900">
                  Version History & Audit Log
                </h3>
                <p className="text-xs text-slate-500 mt-0.5 truncate max-w-sm">
                  {selectedDocForHistory.title}
                </p>
              </div>
              <button
                onClick={() => setSelectedDocForHistory(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
              {selectedDocForHistory.versions.map((ver, idx) => (
                <div
                  key={ver.version}
                  className={`p-4 rounded-2xl border ${idx === 0
                    ? "bg-teal-50/70 border-teal-200"
                    : "bg-slate-50 border-slate-200 opacity-80"
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-xs text-slate-900">
                      Version {ver.version} {idx === 0 && "(Active Current)"}
                    </span>
                    <span className="text-[11px] text-slate-500">
                      {new Date(ver.uploadedAt).toLocaleString()}
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-slate-700 mt-1">
                    {ver.fileName} ({ver.fileSize})
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Uploaded by: {ver.uploadedBy}
                  </div>
                  {ver.csNotes && (
                    <div className="mt-2 pt-2 border-t border-slate-200/60 text-[11px] text-slate-600 italic">
                      Reviewer Note: &quot;{ver.csNotes}&quot;
                    </div>
                  )}
                </div>
              ))}
            </div>

            <button
              onClick={() => setSelectedDocForHistory(null)}
              className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs"
            >
              Close History View
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
