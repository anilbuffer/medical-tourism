"use client";

import React, { useState } from "react";
import {
  FileText,
  Upload,
  Layers,
  CheckCircle2,
  AlertCircle,
  Eye,
  Download,
  Lock,
  Sparkles,
  ShieldCheck,
  RefreshCw,
  X,
  FilePlus,
  Plus,
} from "lucide-react";
import { PatientCase, PatientDocument } from "@/types/portal";
import { usePortal } from "@/lib/portal/store";
import { DicomViewerModal } from "../../modals/DicomViewerModal";

interface PatientDicomVaultViewProps {
  patientCase: PatientCase;
}

export const PatientDicomVaultView: React.FC<PatientDicomVaultViewProps> = ({ patientCase }) => {
  const { uploadDocument } = usePortal();
  const [selectedDicomModal, setSelectedDicomModal] = useState<string | null>(null);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [targetDocId, setTargetDocId] = useState<string | undefined>(undefined);
  const [docTitle, setDocTitle] = useState("");
  const [category, setCategory] = useState<PatientDocument["category"]>("scan_imaging");
  const [simulatedFileName, setSimulatedFileName] = useState("Blood_Work_Report_v1.2_Revised.pdf");
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    setTimeout(() => {
      uploadDocument(
        patientCase.id,
        docTitle || "Medical Scan / Diagnostic Report",
        category,
        simulatedFileName,
        "3.8 MB",
        targetDocId
      );
      setIsUploading(false);
      setUploadModalOpen(false);
    }, 600);
  };

  const openReupload = (doc: PatientDocument) => {
    setTargetDocId(doc.id);
    setDocTitle(doc.title);
    setCategory(doc.category);
    setSimulatedFileName(`${doc.title.replace(".pdf", "")}_v1.2_complete.pdf`);
    setUploadModalOpen(true);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2ECDC5]/10 text-[#3F4EB4] text-xs font-extrabold uppercase tracking-wider mb-2 border border-[#2ECDC5]/20">
            <Layers className="w-3.5 h-3.5 text-[#2ECDC5]" />
            Diagnostic PACS & Document Vault
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Document Vault & DICOM Scans
          </h2>
          <p className="text-slate-500 text-sm mt-1 max-w-xl">
            Upload and view high-resolution volumetric CT/MRI DICOM scans, pathology reports, and verified passport records.
          </p>
        </div>

        <button
          onClick={() => {
            setTargetDocId(undefined);
            setDocTitle("");
            setCategory("scan_imaging");
            setSimulatedFileName("Abdominal_CT_3D_Volumetric.dicom");
            setUploadModalOpen(true);
          }}
          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-[#1d8983] via-[#1baba4] to-[#1d8983] text-white text-xs font-black flex items-center gap-2 shadow-xl shadow-[#283593]/20 active:scale-95 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Upload New Diagnostic File</span>
        </button>
      </div>

      {/* Drag & Drop Upload Zone */}
      <div
        onClick={() => {
          setTargetDocId(undefined);
          setDocTitle("Diagnostic Imaging Series");
          setCategory("scan_imaging");
          setSimulatedFileName("Volumetric_Hepatic_Study.dicom");
          setUploadModalOpen(true);
        }}
        className="bg-white/95 border-2 border-dashed border-[#3F4EB4]/30 hover:border-[#2ECDC5] rounded-3xl p-8 text-center cursor-pointer transition-all duration-300 group hover:bg-[#2ECDC5]/5"
      >
        <div className="w-14 h-14 rounded-2xl bg-[#3F4EB4]/10 text-[#3F4EB4] group-hover:bg-[#2ECDC5]/20 group-hover:text-[#2ECDC5] flex items-center justify-center mx-auto mb-3 transition-colors">
          <Upload className="w-6 h-6" />
        </div>
        <h4 className="text-sm font-extrabold text-slate-900">
          Drag and drop MRI / CT DICOM files, lab results, clinical history, or passport scans
        </h4>
        <p className="text-xs text-slate-500 mt-1">
          Supports DICOM (.dcm/.dicom), PDF, high-resolution JPEG, and ZIP archives up to 500 MB.
        </p>
      </div>

      {/* Documents Table */}
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#3F4EB4]" />
            <h3 className="font-extrabold text-sm text-slate-900">Document Status Ledger</h3>
          </div>
          <span className="text-xs text-slate-500 font-bold">
            {patientCase.documents.length} Records on File
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200/80 text-[11px] font-extrabold text-slate-600 uppercase tracking-wider">
              <tr>
                <th className="p-4">Document Name</th>
                <th className="p-4">Category</th>
                <th className="p-4">Upload Date</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-center">Version</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-sans">
              {patientCase.documents.map((doc) => {
                const latestVersion = doc.versions[doc.versions.length - 1];
                const isDicom = doc.title.toLowerCase().includes("dicom") || doc.title.toLowerCase().includes("mri");
                const isPassport = doc.title.toLowerCase().includes("passport");

                return (
                  <tr key={doc.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-slate-100 text-[#3F4EB4] flex items-center justify-center shrink-0 border border-slate-200">
                          {isDicom ? <Layers className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                        </div>
                        <div>
                          <div className="font-extrabold text-slate-900">{doc.title}</div>
                          <div className="text-[11px] text-slate-500">
                            {latestVersion?.fileSize || "2.4 MB"}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="p-4 text-slate-600 font-medium capitalize">
                      {isDicom ? "Imaging Scan" : isPassport ? "Identity" : "Pathology"}
                    </td>

                    <td className="p-4 text-slate-600 font-medium" suppressHydrationWarning>
                      {latestVersion?.uploadedAt
                        ? new Date(latestVersion.uploadedAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })
                        : "Aug 24, 2026"}
                    </td>

                    <td className="p-4">
                      {isPassport ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <span className="w-2 h-2 rounded-full bg-emerald-500" />
                          🟢 Verified for Visa
                        </span>
                      ) : doc.status === "reviewed" ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <span className="w-2 h-2 rounded-full bg-emerald-500" />
                          🟢 Reviewed
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-amber-50 text-amber-700 border border-amber-200 animate-pulse">
                          <span className="w-2 h-2 rounded-full bg-amber-500" />
                          🟡 Missing Page 2
                        </span>
                      )}
                    </td>

                    <td className="p-4 text-center font-mono text-xs font-bold text-slate-700">
                      v1.{doc.versions.length > 1 ? "1" : "0"}
                    </td>

                    <td className="p-4 text-right">
                      {isDicom ? (
                        <button
                          onClick={() => setSelectedDicomModal(doc.title)}
                          className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#1d8983] to-[#1baba4] text-white font-extrabold text-xs shadow-md shadow-[#283593]/20 hover:scale-105 active:scale-95 transition-all cursor-pointer inline-flex items-center gap-1.5"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View DICOM</span>
                        </button>
                      ) : doc.status === "incomplete" ? (
                        <button
                          onClick={() => openReupload(doc)}
                          className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs shadow-md shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all cursor-pointer inline-flex items-center gap-1.5"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                          <span>Re-Upload</span>
                        </button>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-600 text-xs font-extrabold border border-slate-200">
                          <Lock className="w-3.5 h-3.5 text-slate-500" />
                          <span>Locked</span>
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* DICOM Modal */}
      {selectedDicomModal && (
        <DicomViewerModal
          isOpen={!!selectedDicomModal}
          onClose={() => setSelectedDicomModal(null)}
          fileName={selectedDicomModal}
        />
      )}

      {/* Upload/Re-Upload Modal */}
      {uploadModalOpen && (
        <div className="fixed inset-0 z-[120] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-extrabold text-slate-900">
                {targetDocId ? "Re-Upload Revised Document" : "Upload Medical Document"}
              </h3>
              <button onClick={() => setUploadModalOpen(false)} className="p-1 rounded-lg text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpload} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">Document Title</label>
                <input
                  type="text"
                  required
                  value={docTitle}
                  onChange={(e) => setDocTitle(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-bold"
                  placeholder="e.g. Blood_Work_Report.pdf"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">Simulated File Name</label>
                <input
                  type="text"
                  value={simulatedFileName}
                  onChange={(e) => setSimulatedFileName(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-mono"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setUploadModalOpen(false)}
                  className="px-4 py-2 rounded-xl border text-xs font-bold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUploading}
                  className="px-5 py-2 rounded-xl bg-[#2ECDC5] text-slate-950 text-xs font-black shadow-md"
                >
                  {isUploading ? "Uploading..." : "Save to Vault"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
