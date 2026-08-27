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
  ShieldCheck,
  FileCheck,
  AlertTriangle,
  Info,
  ExternalLink,
  RefreshCw,
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
  const [simulatedFileName, setSimulatedFileName] = useState("Abdominal_MRI_T2_Axial.dcm");
  const [isUploading, setIsUploading] = useState(false);
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
  const [previewDoc, setPreviewDoc] = useState<PatientDocument | null>(null);

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    setTimeout(() => {
      uploadDocument(
        patientCase.id,
        docTitle || "Medical Scan / Report",
        category,
        simulatedFileName,
        "48.5 MB",
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
    setSimulatedFileName(`${doc.title.replace(/\.[^/.]+$/, "")}_revised.pdf`);
    setUploadModalOpen(true);
  };

  const reviewedCount = patientCase.documents.filter((d) => d.status === "reviewed").length;
  const incompleteCount = patientCase.documents.filter((d) => d.status === "incomplete").length;
  const pendingCount = patientCase.documents.filter((d) => d.status === "pending_review").length;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2ECDC5]/10 text-[#3F4EB4] text-xs font-extrabold uppercase tracking-wider mb-2 border border-[#2ECDC5]/20">
            <FileText className="w-3.5 h-3.5 text-[#2ECDC5]" />
            Your Medical Records Vault
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Medical Documents & DICOM Scans
          </h2>
          <p className="text-slate-500 text-sm mt-1 max-w-xl">
            Upload and view your test results, MRI/CT DICOM scans, doctor letters, and passport copies in one secure place with instant coordinator verification.
          </p>
        </div>

        <button
          onClick={() => {
            setTargetDocId(undefined);
            setDocTitle("");
            setCategory("scan_imaging");
            setSimulatedFileName("Abdominal_CT_Scan_Pelvis.dcm");
            setUploadModalOpen(true);
          }}
          className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#1d8983] via-[#1baba4] to-[#1d8983] text-white text-xs font-black flex items-center gap-2 shadow-xl shadow-[#283593]/20 hover:scale-105 active:scale-95 transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Upload a Document</span>
        </button>
      </div>

      {/* Upload Guidance Banner for Large DICOM Scans */}
      <div className="bg-gradient-to-r from-blue-50 via-indigo-50/40 to-cyan-50 border border-blue-200/80 rounded-3xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-[#3F4EB4]/10 text-[#3F4EB4] flex items-center justify-center shrink-0 mt-0.5">
            <Info className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-extrabold text-slate-900">
              DICOM & High-Resolution Imaging Guidance
            </div>
            <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
              Large DICOM zip folders and raw MRI/CT datasets (&gt;50MB) upload smoothly on broadband. If your browser connection times out, you can tap WhatsApp below to send files directly to your coordinator.
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsWhatsAppOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-emerald-700 font-extrabold text-xs border border-emerald-300 shadow-sm flex items-center gap-1.5 shrink-0 transition-all cursor-pointer"
        >
          <Phone className="w-3.5 h-3.5 text-emerald-600" />
          <span>WhatsApp Upload Help</span>
        </button>
      </div>

      {/* Live Status Matrix Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 border border-slate-200 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Verified & Cleared</div>
              <div className="text-xl font-black text-emerald-700">{reviewedCount} Files</div>
            </div>
          </div>
          <span className="text-[11px] font-extrabold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
            Ready for Dr. Gupta
          </span>
        </div>

        <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 border border-slate-200 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Needs Revision</div>
              <div className="text-xl font-black text-amber-700">{incompleteCount} Files</div>
            </div>
          </div>
          <span className="text-[11px] font-extrabold px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
            Action Required
          </span>
        </div>

        <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 border border-slate-200 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#3F4EB4] flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Under Review</div>
              <div className="text-xl font-black text-[#3F4EB4]">{pendingCount} Files</div>
            </div>
          </div>
          <span className="text-[11px] font-extrabold px-2.5 py-1 rounded-full bg-blue-50 text-[#3F4EB4] border border-blue-200">
            In CS Queue
          </span>
        </div>
      </div>

      {/* Drag & Drop Upload Zone */}
      <div
        onClick={() => {
          setTargetDocId(undefined);
          setDocTitle("New Medical Scan / Lab Report");
          setCategory("scan_imaging");
          setSimulatedFileName("Liver_MRI_Volumetry_Scan.dcm");
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
          We accept DICOM datasets (.dcm, .zip), PDF medical reports, high-res scans, and passport IDs. Multi-file batch uploads supported.
        </p>
      </div>

      {/* Document Cards Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-lg font-black text-slate-900 tracking-tight">
            Your Medical Document Vault ({patientCase.documents.length})
          </h3>
          <span className="text-xs text-slate-500 font-medium">
            Protected with 256-bit HIPAA compliant AES encryption
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
              : "Aug 24, 2026";
            const fileSize = latestVersion?.fileSize || "14.2 MB";
            const fileName = latestVersion?.fileName || doc.title;
            const isDicom = doc.category === "scan_imaging" || fileName.toLowerCase().includes(".dcm");

            return (
              <div
                key={doc.id}
                className={`bg-white rounded-3xl p-6 border shadow-[0_6px_32px_rgba(0,0,0,0.06)] flex flex-col justify-between hover:shadow-xl transition-all group ${
                  doc.status === "incomplete" ? "border-amber-200 bg-amber-50/15" : "border-slate-200/90"
                }`}
              >
                <div>
                  {/* Card Header: Icon & Live Status Badge */}
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
                      {isDicom ? <Layers className="w-7 h-7" /> : <FileText className="w-7 h-7" />}
                    </div>

                    {doc.status === "reviewed" ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        Verified & Cleared
                      </span>
                    ) : doc.status === "incomplete" ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-amber-50 text-amber-700 border border-amber-300 animate-pulse">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                        Needs Revision
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-blue-50 text-[#3F4EB4] border border-blue-200">
                        <Clock className="w-3.5 h-3.5 text-[#3F4EB4]" />
                        Awaiting CS Review
                      </span>
                    )}
                  </div>

                  {/* Title & Category Tag */}
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                      {doc.category.replace("_", " ")}
                    </span>
                    {isDicom && (
                      <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-md bg-[#2ECDC5]/10 text-[#3F4EB4]">
                        DICOM Scan
                      </span>
                    )}
                  </div>

                  <h4 className="font-black text-slate-900 text-base tracking-tight mb-1 group-hover:text-[#3F4EB4] transition-colors">
                    {doc.title}
                  </h4>

                  <p className="text-xs text-slate-500">
                    Uploaded on {uploadDate} • {fileSize}
                  </p>

                  {/* Feedback / Explanatory Note if incomplete */}
                  {doc.status === "incomplete" && (
                    <div className="mt-3 p-3 bg-amber-50 rounded-2xl border border-amber-300/80 text-xs text-amber-950 font-medium space-y-1">
                      <div className="font-bold flex items-center gap-1 text-amber-800">
                        <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                        <span>CS Coordinator Note:</span>
                      </div>
                      <p className="italic text-[11px] text-amber-900 leading-snug">
                        {doc.csFeedback || "Page 2 (viral serology panel) was cut off or blurry. Please upload a clear photo."}
                      </p>
                    </div>
                  )}

                  {doc.status === "reviewed" && (
                    <p className="mt-2 text-xs text-emerald-700 font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Doctor verified & added to clinical briefing
                    </p>
                  )}
                </div>

                {/* Card Actions */}
                <div className="pt-5 mt-4 border-t border-slate-100 flex items-center gap-2">
                  {doc.status === "incomplete" ? (
                    <button
                      onClick={() => openReupload(doc)}
                      className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-white font-black text-xs transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/20"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload Missing Fix</span>
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          if (isDicom) {
                            setSelectedDicomModal(fileName);
                          } else {
                            setPreviewDoc(doc);
                          }
                        }}
                        className="flex-1 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#3F4EB4]" />
                        <span>{isDicom ? "Open DICOM Viewer" : "Quick Preview"}</span>
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
            <h4 className="font-extrabold text-base text-white">Need help sending your medical files?</h4>
            <p className="text-xs text-slate-200 mt-0.5">
              If uploading or scanning is tricky, you can take a clear phone photo and send it directly to Ananya on WhatsApp with your Case ID.
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

      {/* Inline Quick Preview Modal */}
      {previewDoc && (
        <div className="fixed inset-0 z-[120] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl p-6 sm:p-8 space-y-4 shadow-2xl border border-slate-200 animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#3F4EB4]/10 text-[#3F4EB4] flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-slate-900">{previewDoc.title}</h3>
                  <div className="text-xs text-slate-500">Document Verification Preview</div>
                </div>
              </div>
              <button
                onClick={() => setPreviewDoc(null)}
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 cursor-pointer"
              >
                Close
              </button>
            </div>

            {/* Document Preview Box */}
            <div className="p-8 bg-slate-50 rounded-2xl border border-slate-200 text-center space-y-3">
              <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <FileCheck className="w-8 h-8" />
              </div>
              <div className="font-extrabold text-sm text-slate-900">{previewDoc.title}</div>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Official medical record reviewed by Medanta Hospital. Status:{" "}
                <strong className="text-emerald-700">Verified & Attached to Case #{patientCase.id}</strong>
              </p>
              <div className="pt-2 flex justify-center gap-3">
                <button
                  onClick={() => alert(`Downloading verified copy of ${previewDoc.title}`)}
                  className="px-4 py-2 bg-[#3F4EB4] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" /> Download Verified Copy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {uploadModalOpen && (
        <div className="fixed inset-0 z-[120] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-200 animate-in fade-in duration-200">
            <div>
              <h3 className="text-xl font-black text-slate-900 tracking-tight">
                {targetDocId ? "Upload Revised Document" : "Upload Medical Document / Scan"}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Select your file, photo, or DICOM dataset. Your care coordinator Ananya will verify it within 2 hours.
              </p>
            </div>

            <form onSubmit={handleUpload} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-700 font-bold block mb-1.5">Document Title</label>
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
                  <option value="scan_imaging">Scan / MRI / CT / DICOM Dataset</option>
                  <option value="medical_report">Blood Test / Lab Report</option>
                  <option value="prescription">Doctor Prescription / Clinical Letter</option>
                  <option value="passport_id">Passport / ID Document</option>
                  <option value="other">Other Medical Document</option>
                </select>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center">
                <div className="w-10 h-10 rounded-xl bg-[#3F4EB4]/10 text-[#3F4EB4] flex items-center justify-center mx-auto mb-2">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="font-bold text-slate-800 text-xs">{simulatedFileName}</div>
                <span className="text-[11px] text-slate-400">Simulated file attached (48.5 MB)</span>
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
                    <span className="flex items-center gap-1.5">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Uploading & Indexing...
                    </span>
                  ) : (
                    <>
                      <Upload className="w-4 h-4" />
                      <span>Save & Submit to CS</span>
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
