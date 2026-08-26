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
  Plus,
  Phone,
  MessageSquare,
  HelpCircle,
  Clock,
  Sparkles,
} from "lucide-react";
import { PatientCase, PatientDocument } from "@/types/portal";
import { usePortal } from "@/lib/portal/store";
import { DicomViewerModal } from "../../modals/DicomViewerModal";
import { WhatsAppContactModal } from "../../modals/WhatsAppContactModal";

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
  const [simulatedFileName, setSimulatedFileName] = useState("Blood_Work_Report_Revised.pdf");
  const [isUploading, setIsUploading] = useState(false);
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    setTimeout(() => {
      uploadDocument(
        patientCase.id,
        docTitle || "Medical Scan / Report",
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
    setSimulatedFileName(`${doc.title.replace(".pdf", "")}_clear_copy.pdf`);
    setUploadModalOpen(true);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2ECDC5]/10 text-[#3F4EB4] text-xs font-extrabold uppercase tracking-wider mb-2 border border-[#2ECDC5]/20">
            <FileText className="w-3.5 h-3.5 text-[#2ECDC5]" />
            Your Medical Records
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Medical Documents & Scans
          </h2>
          <p className="text-slate-500 text-sm mt-1 max-w-xl">
            Upload and view your test results, MRI/CT scans, doctor letters, and passport copies in one secure place.
          </p>
        </div>

        <button
          onClick={() => {
            setTargetDocId(undefined);
            setDocTitle("");
            setCategory("scan_imaging");
            setSimulatedFileName("Abdominal_CT_Scan.pdf");
            setUploadModalOpen(true);
          }}
          className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#1d8983] via-[#1baba4] to-[#1d8983] text-white text-xs font-black flex items-center gap-2 shadow-xl shadow-[#283593]/20 hover:scale-105 active:scale-95 transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Upload a Document</span>
        </button>
      </div>

      {/* Drag & Drop Upload Zone */}
      <div
        onClick={() => {
          setTargetDocId(undefined);
          setDocTitle("New Medical Document");
          setCategory("scan_imaging");
          setSimulatedFileName("Doctor_Report_Recent.pdf");
          setUploadModalOpen(true);
        }}
        className="bg-white/95 border-2 border-dashed border-[#3F4EB4]/30 hover:border-[#2ECDC5] rounded-3xl p-8 text-center cursor-pointer transition-all duration-300 group hover:bg-[#2ECDC5]/5 shadow-[0_6px_32px_rgba(0,0,0,0.04)]"
      >
        <div className="w-14 h-14 rounded-2xl bg-[#3F4EB4]/10 text-[#3F4EB4] group-hover:bg-[#2ECDC5]/20 group-hover:text-[#2ECDC5] flex items-center justify-center mx-auto mb-3 transition-colors">
          <Upload className="w-6 h-6" />
        </div>
        <h4 className="text-base font-extrabold text-slate-900">
          Click or drop files here to upload
        </h4>
        <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
          We accept photos, PDFs, scans, and CD/DVD medical files. Any size or format is supported.
        </p>
      </div>

      {/* Human-Centered Document Cards Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-lg font-black text-slate-900 tracking-tight">
            Your Uploaded Records ({patientCase.documents.length})
          </h3>
          <span className="text-xs text-slate-500 font-medium">
            All files are reviewed by your medical team
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {patientCase.documents.map((doc) => {
            const latestVersion = doc.versions?.[0] || doc.versions?.[doc.versions.length - 1];
            const uploadDate = latestVersion?.uploadedAt
              ? new Date(latestVersion.uploadedAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : "Recent";
            const fileSize = latestVersion?.fileSize || "3.2 MB";
            const fileName = latestVersion?.fileName || doc.title;

            return (
              <div
                key={doc.id}
                className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-[0_6px_32px_rgba(0,0,0,0.06)] flex flex-col justify-between hover:shadow-xl hover:shadow-slate-200/40 transition-all group"
              >
                <div>
                  {/* Card Header: Icon & Status Dot */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                        doc.status === "reviewed"
                          ? "bg-emerald-100 text-emerald-700"
                          : doc.status === "incomplete"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-blue-100 text-[#3F4EB4]"
                      }`}
                    >
                      <FileText className="w-7 h-7" />
                    </div>

                    {doc.status === "reviewed" ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        Received
                      </span>
                    ) : doc.status === "incomplete" ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-amber-50 text-amber-700 border border-amber-200 animate-pulse">
                        <span className="w-2 h-2 rounded-full bg-amber-500" />
                        Needs another copy
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-blue-50 text-[#3F4EB4] border border-blue-200">
                        <span className="w-2 h-2 rounded-full bg-[#3F4EB4]" />
                        Under Review
                      </span>
                    )}
                  </div>

                  {/* Title & Details */}
                  <h4 className="font-black text-slate-900 text-base tracking-tight mb-1 group-hover:text-[#3F4EB4] transition-colors">
                    {doc.title}
                  </h4>

                  <p className="text-xs text-slate-500">
                    Uploaded on {uploadDate} • {fileSize}
                  </p>

                  {/* Feedback / Explanatory Note if incomplete */}
                  {doc.status === "incomplete" && (
                    <div className="mt-3 p-3 bg-amber-50 rounded-2xl border border-amber-200/70 text-xs text-amber-900 font-medium">
                      <strong>Note from coordinator:</strong>{" "}
                      {doc.csFeedback || "Page was blurry or incomplete. Please upload a clear photo or scan."}
                    </div>
                  )}

                  {doc.status === "reviewed" && (
                    <p className="mt-2 text-xs text-emerald-700 font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Doctor verified & ready
                    </p>
                  )}
                </div>

                {/* Card Actions */}
                <div className="pt-5 mt-4 border-t border-slate-100 flex items-center gap-2">
                  {doc.status === "incomplete" ? (
                    <button
                      onClick={() => openReupload(doc)}
                      className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload Clear Copy</span>
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => setSelectedDicomModal(fileName)}
                        className="flex-1 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#3F4EB4]" />
                        <span>View</span>
                      </button>

                      <button
                        onClick={() => {
                          alert(`Downloading ${doc.title}...`);
                        }}
                        className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
                        title="Download file"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Human Helper Banner */}
      <div className="bg-gradient-to-r from-[#141d60] via-[#1b2360] to-[#101e76] rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#2ECDC5]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="flex items-center gap-4 relative z-10">
          <img
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
            alt="Ananya Sharma"
            className="w-16 h-16 rounded-full object-cover ring-4 ring-white/20 shadow-lg shrink-0"
          />
          <div>
            <h4 className="font-extrabold text-base text-white">Need help sending your files?</h4>
            <p className="text-xs text-slate-200 mt-0.5">
              If uploading is tricky, you can take a phone photo and send it directly to Ananya on WhatsApp.
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsWhatsAppOpen(true)}
          className="relative z-10 px-6 py-3 rounded-2xl bg-[#2ECDC5] hover:bg-[#28b8b0] text-slate-950 font-black text-xs transition-all shadow-lg hover:scale-105 active:scale-95 cursor-pointer shrink-0 flex items-center gap-2"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Send via WhatsApp</span>
        </button>
      </div>

      {/* Upload Modal */}
      {uploadModalOpen && (
        <div className="fixed inset-0 z-[120] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-200 animate-in fade-in duration-200">
            <div>
              <h3 className="text-xl font-black text-slate-900 tracking-tight">
                {targetDocId ? "Upload New Copy" : "Upload Medical Document"}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Select your file or photo. Your care team will be notified immediately.
              </p>
            </div>

            <form onSubmit={handleUpload} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-700 font-bold block mb-1.5">Document Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Recent Blood Test, Liver MRI Scan"
                  value={docTitle}
                  onChange={(e) => setDocTitle(e.target.value)}
                  className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-[#2ECDC5]"
                />
              </div>

              <div>
                <label className="text-slate-700 font-bold block mb-1.5">Category</label>
                <select
                  value={category}
                  onChange={(e: any) => setCategory(e.target.value)}
                  className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-900"
                >
                  <option value="scan_imaging">Scan / MRI / CT / X-Ray</option>
                  <option value="medical_report">Blood Test / Lab Report</option>
                  <option value="prescription">Doctor Prescription / Letter</option>
                  <option value="passport_id">Passport / ID Document</option>
                  <option value="other">Other Document</option>
                </select>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center">
                <div className="w-10 h-10 rounded-xl bg-[#3F4EB4]/10 text-[#3F4EB4] flex items-center justify-center mx-auto mb-2">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="font-bold text-slate-800 text-xs">{simulatedFileName}</div>
                <span className="text-[11px] text-slate-400">Ready to attach (3.8 MB)</span>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setUploadModalOpen(false)}
                  className="flex-1 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUploading}
                  className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-[#1d8983] via-[#1baba4] to-[#1d8983] text-white font-black text-xs shadow-lg shadow-[#283593]/25 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  {isUploading ? (
                    <span>Uploading...</span>
                  ) : (
                    <>
                      <Upload className="w-4 h-4" />
                      <span>Save & Submit</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DICOM / Viewer Modal */}
      {selectedDicomModal && (
        <DicomViewerModal
          isOpen={!!selectedDicomModal}
          onClose={() => setSelectedDicomModal(null)}
          fileName={selectedDicomModal}
        />
      )}

      {/* WhatsApp Modal */}
      <WhatsAppContactModal
        isOpen={isWhatsAppOpen}
        onClose={() => setIsWhatsAppOpen(false)}
        coordinatorName="Ananya Sharma"
        caseId={patientCase.id}
      />
    </div>
  );
};
