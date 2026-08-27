"use client";

import React, { useState, useRef } from "react";
import { PatientCase, ConsentRecord, PaymentStage } from "@/types/portal";
import { JourneyStepper } from "../JourneyStepper";
import { usePortal } from "@/lib/portal/store";
import {
  Video,
  Play,
  FileText,
  Upload,
  Layers,
  Phone,
  MessageSquare,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  CreditCard,
  Plane,
  HeartHandshake,
  Lock,
  Users,
  ChevronRight,
  AlertCircle,
  X,
} from "lucide-react";
import { VideoConsultationSDKModal } from "../modals/VideoConsultationSDKModal";
import { DicomViewerModal } from "../modals/DicomViewerModal";
import { ConsentSignModal } from "../modals/ConsentSignModal";
import { WhatsAppContactModal } from "../modals/WhatsAppContactModal";

interface OverviewTabProps {
  patientCase: PatientCase;
  onNavigateTab: (tabId: string) => void;
  activeTab?: string;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({ patientCase, onNavigateTab, activeTab }) => {
  const { formatCurrency, uploadDocument } = usePortal();

  // Interactive Modals State
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [dicomModalFileName, setDicomModalFileName] = useState<string | null>(null);
  const [selectedConsentToSign, setSelectedConsentToSign] = useState<ConsentRecord | null>(null);
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
  const [familyDelegateOpen, setFamilyDelegateOpen] = useState(false);
  const [familyName, setFamilyName] = useState("");
  const [familyRelation, setFamilyRelation] = useState("");
  const [familyAdded, setFamilyAdded] = useState(false);
  const [uploadingDocId, setUploadingDocId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Tele-consultation consent status
  const teleConsentRecord = patientCase.consents.find(
    (c) => c.consentType === "tele_consultation_terms"
  );
  const isTeleConsentSigned = teleConsentRecord?.agreed;

  // Documents that need attention (incomplete with CS feedback)
  const incompleteDocs = patientCase.documents.filter(
    (d) => d.status === "incomplete"
  );
  const pendingDocs = patientCase.documents.filter(
    (d) => d.status === "pending_review"
  );

  const handleFamilyAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!familyName.trim()) return;
    setFamilyAdded(true);
    setTimeout(() => {
      setFamilyDelegateOpen(false);
      setFamilyAdded(false);
      setFamilyName("");
      setFamilyRelation("");
    }, 1800);
  };

  const handleUploadMissing = (docId: string) => {
    setUploadingDocId(docId);
    fileInputRef.current?.click();
  };

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && uploadingDocId) {
      const doc = patientCase.documents.find((d) => d.id === uploadingDocId);
      const sizeStr = `${(file.size / (1024 * 1024)).toFixed(1)} MB`;
      uploadDocument(
        patientCase.id,
        doc?.title || file.name,
        doc?.category || "medical_report",
        file.name,
        sizeStr,
        uploadingDocId
      );
    }
    setUploadingDocId(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 pb-16">
      {/* Hidden file input for missing doc upload */}
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept=".pdf,.jpg,.jpeg,.png,.dcm"
        onChange={handleFileSelected}
      />

      <JourneyStepper
        currentStage={patientCase.stage}
        activeTab={activeTab || "overview"}
        onNavigateTab={onNavigateTab}
      />

      {/* CS Sync Alert — Incomplete Document Notices */}
      {incompleteDocs.length > 0 && (
        <div className="space-y-3">
          {incompleteDocs.map((doc) => (
            <div
              key={doc.id}
              className="flex items-start gap-4 bg-amber-50 border border-amber-300/60 rounded-2xl p-4 shadow-sm"
            >
              <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
                <AlertCircle className="w-5 h-5 text-amber-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-extrabold text-amber-900">{doc.title} — Needs Revision</div>
                {doc.csFeedback && (
                  <div className="text-xs text-amber-700 mt-0.5 font-medium">
                    CS Note: <span className="italic">{doc.csFeedback}</span>
                  </div>
                )}
              </div>
              <button
                onClick={() => handleUploadMissing(doc.id)}
                className="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-white font-black text-xs transition-all cursor-pointer shadow-md shadow-amber-500/25"
              >
                <Upload className="w-3.5 h-3.5" />
                Upload Fix
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Primary Action Banner */}
      <section>
        <div className="bg-gradient-to-r from-[#141d60] via-[#1b2360] to-[#101e76] rounded-3xl p-6 sm:p-10 text-white shadow-xl border border-slate-800 relative overflow-hidden flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#2ECDC5]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-64 h-64 bg-[#3F4EB4]/25 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-4 relative z-10 max-w-2xl">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-3">
              <span>Video call with your doctor</span>
              <span className="inline-block w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
            </h1>

            <p className="text-md text-slate-200 font-medium">
              You are scheduled to meet with <strong>Dr. Subhash Gupta</strong> on{" "}
              <strong className="text-white">Thursday, Aug 27 at 03:30 PM IST</strong>.
            </p>

            {/* Dual Timezone Mini-Display */}
            <div className="flex flex-wrap gap-3 pt-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 border border-white/20 text-xs font-bold backdrop-blur-sm">
                <span className="text-[#2ECDC5]">🕐 02:00 PM</span>
                <span className="text-slate-300">GST — Dubai, UAE</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 border border-white/20 text-xs font-bold backdrop-blur-sm">
                <span className="text-amber-300">🕞 03:30 PM</span>
                <span className="text-slate-300">IST — New Delhi, India</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-3">
              {!isTeleConsentSigned ? (
                <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-200 text-sm font-bold backdrop-blur-sm">
                  <AlertTriangle className="w-5 h-5 text-amber-300 shrink-0" />
                  <span>Please review and sign the terms before joining.</span>
                  <button
                    onClick={() => {
                      setSelectedConsentToSign(
                        teleConsentRecord || {
                          id: "cst_tele_01",
                          consentType: "tele_consultation_terms",
                          title: "Tele-Consultation Terms",
                          description:
                            "Cross-border telemedicine advisory scope, limitations of remote audio/video assessment, and diagnostic recommendations.",
                          agreed: false,
                          timestamp: "",
                          ipAddress: "",
                          version: "v2.0",
                        }
                      );
                    }}
                    className="ml-2 px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs transition-colors cursor-pointer"
                  >
                    Review terms
                  </button>
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-200 text-sm font-bold backdrop-blur-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span>Terms accepted. You're ready to join!</span>
                </div>
              )}
            </div>
          </div>

          <div className="relative z-10 shrink-0 self-stretch sm:self-auto flex flex-col items-center sm:items-end gap-3">
            {/* Gated Join Button — disabled when consent not signed */}
            <div className="relative group">
              <button
                onClick={() => {
                  if (!isTeleConsentSigned) return;
                  setIsVideoModalOpen(true);
                }}
                disabled={!isTeleConsentSigned}
                className={`w-full sm:w-auto px-8 py-5 rounded-2xl font-black text-base flex items-center justify-center gap-3 shadow-xl transition-all duration-200 ${
                  isTeleConsentSigned
                    ? "bg-[#2ECDC5] hover:bg-[#28b8b0] text-slate-950 hover:scale-105 active:scale-95 cursor-pointer shadow-[#2ECDC5]/25"
                    : "bg-slate-600/60 text-slate-400 cursor-not-allowed opacity-70"
                }`}
              >
                <Video className="w-6 h-6" />
                <span>Join Video Room</span>
              </button>
              {!isTeleConsentSigned && (
                <div className="absolute -bottom-8 left-0 right-0 text-center">
                  <span className="text-xs text-amber-300 font-bold">⚠ Sign consent first</span>
                </div>
              )}
            </div>
            <span className="text-xs text-slate-300 font-medium mt-2">
              Room opens 10 minutes prior
            </span>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Your Documents */}
        <section className="lg:col-span-2 flex flex-col gap-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xl font-black text-slate-900 tracking-tight">Your Documents</h2>
            <button
              onClick={() => onNavigateTab("docs_vault")}
              className="text-sm font-bold text-[#3F4EB4] hover:text-[#283593] hover:underline cursor-pointer transition-colors"
            >
              View all
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 flex-1">
            {patientCase.documents.slice(0, 4).map((doc) => {
              const isIncomplete = doc.status === "incomplete";
              const isPending = doc.status === "pending_review";
              const isReviewed = doc.status === "reviewed";

              return (
                <div
                  key={doc.id}
                  className={`bg-white p-5 rounded-3xl shadow-[0_6px_32px_rgba(0,0,0,0.06)] border flex flex-col gap-3 hover:shadow-2xl transition-all h-full ${
                    isIncomplete
                      ? "border-amber-200 bg-amber-50/30"
                      : "border-slate-200/90"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center ring-1 ${
                        isReviewed
                          ? "bg-emerald-100 text-emerald-600 ring-emerald-50"
                          : isIncomplete
                          ? "bg-amber-100 text-amber-600 ring-amber-50"
                          : "bg-blue-100 text-blue-600 ring-blue-50"
                      }`}
                    >
                      <FileText className="w-6 h-6" />
                    </div>
                    <div
                      className={`w-3 h-3 rounded-full shadow-sm ${
                        isReviewed
                          ? "bg-emerald-500 shadow-emerald-500/40"
                          : isIncomplete
                          ? "bg-amber-500 animate-pulse shadow-amber-500/40"
                          : "bg-blue-400 shadow-blue-400/40"
                      }`}
                      title={isReviewed ? "Verified & Cleared" : isIncomplete ? "Needs Revision" : "Awaiting Review"}
                    />
                  </div>
                  <div className="mt-auto pt-1">
                    <h3 className="font-extrabold text-slate-900 text-base tracking-tight">{doc.title}</h3>
                    {isReviewed && (
                      <p className="text-xs text-emerald-700 font-bold flex items-center gap-1 mt-0.5">
                        <CheckCircle2 className="w-3 h-3" /> Verified & Cleared
                      </p>
                    )}
                    {isPending && (
                      <p className="text-xs text-blue-600 font-bold mt-0.5">Awaiting CS Review</p>
                    )}
                    {isIncomplete && (
                      <div className="space-y-2 mt-1">
                        <p className="text-xs text-amber-700 font-bold">Needs Revision</p>
                        {doc.csFeedback && (
                          <p className="text-[11px] text-amber-600 italic leading-snug">{doc.csFeedback}</p>
                        )}
                        <button
                          onClick={() => handleUploadMissing(doc.id)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-white font-black text-[11px] transition-all cursor-pointer shadow-sm"
                        >
                          <Upload className="w-3 h-3" />
                          Upload Fix
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {patientCase.documents.length === 0 && (
              <>
                {/* Fallback static cards when no docs */}
                <div className="bg-white p-6 rounded-3xl shadow-[0_6px_32px_rgba(0,0,0,0.06)] border border-slate-200/90 flex flex-col gap-4 hover:shadow-2xl hover:shadow-slate-200/50 transition-all h-full">
                  <div className="flex justify-between items-start">
                    <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 ring-1 ring-emerald-50">
                      <FileText className="w-7 h-7" />
                    </div>
                    <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/40" title="Received" />
                  </div>
                  <div className="mt-auto pt-4">
                    <h3 className="font-extrabold text-slate-900 text-lg tracking-tight">MRI Scans</h3>
                    <p className="text-sm text-emerald-700 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Verified & Cleared
                    </p>
                  </div>
                </div>

                <div className="bg-amber-50/30 p-6 rounded-3xl shadow-[0_6px_32px_rgba(0,0,0,0.06)] border border-amber-200 flex flex-col gap-4 hover:shadow-2xl hover:shadow-slate-200/50 transition-all h-full">
                  <div className="flex justify-between items-start">
                    <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600 ring-1 ring-amber-50">
                      <FileText className="w-7 h-7" />
                    </div>
                    <div className="w-3 h-3 rounded-full bg-amber-500 animate-pulse shadow-sm shadow-amber-500/40" title="Needs Attention" />
                  </div>
                  <div className="mt-auto pt-4">
                    <h3 className="font-extrabold text-slate-900 text-lg tracking-tight">Blood Work</h3>
                    <p className="text-xs text-amber-700 font-bold">Needs Revision</p>
                    <p className="text-[11px] text-amber-600 italic">Missing Page 2 - Viral Serology panel</p>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-white font-black text-[11px] transition-all cursor-pointer shadow-sm mt-2"
                    >
                      <Upload className="w-3 h-3" />
                      Upload Missing Page 2
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </section>

        {/* Your Care Coordinator */}
        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-black text-slate-900 tracking-tight px-1">Your Coordinator</h2>
          <div className="bg-gradient-to-b from-white to-slate-50/30 p-6 rounded-3xl shadow-[0_6px_32px_rgba(0,0,0,0.06)] border border-slate-200/90 flex flex-col items-center text-center h-full hover:shadow-2xl hover:shadow-slate-200/50 transition-all">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=250&auto=format&fit=crop&q=80"
              alt="Ananya Sharma"
              className="w-20 h-20 rounded-full object-cover shadow-lg border-4 border-white mb-3"
            />
            <div className="mb-4">
              <h3 className="font-black text-lg text-slate-900 tracking-tight">Ananya Sharma</h3>
              <p className="text-sm text-slate-500 leading-relaxed px-2 mt-1">I'm here to help you with your journey. Call or message me anytime.</p>
            </div>

            <div className="flex gap-3 w-full mt-auto">
              <button
                onClick={() => onNavigateTab("messages")}
                className="flex-1 bg-white hover:bg-slate-50 text-slate-700 py-3 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                Message
              </button>
              <button
                onClick={() => setIsWhatsAppOpen(true)}
                className="flex-1 bg-gradient-to-b from-[#2ECDC5] to-[#28b8b0] hover:from-[#28b8b0] hover:to-[#22a49d] text-white py-3 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-[0_6px_32px_rgba(0,0,0,0.06)] border border-[#28b8b0] cursor-pointer"
              >
                <Phone className="w-4 h-4" />
                Call me
              </button>
            </div>
          </div>

          {/* Family Delegate Card */}
          <div className="bg-white p-4 rounded-3xl shadow-[0_6px_32px_rgba(0,0,0,0.06)] border border-slate-200/90">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-xl bg-[#3F4EB4]/10 flex items-center justify-center">
                <Users className="w-4 h-4 text-[#3F4EB4]" />
              </div>
              <span className="text-sm font-black text-slate-800">Family Access</span>
            </div>
            <p className="text-xs text-slate-500 mb-3">Add a family member to view your journey, hotel, and updates.</p>
            <button
              onClick={() => setFamilyDelegateOpen(true)}
              className="w-full py-2.5 rounded-xl bg-[#3F4EB4]/10 hover:bg-[#3F4EB4]/20 text-[#3F4EB4] font-black text-xs border border-[#3F4EB4]/20 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Users className="w-3.5 h-3.5" />
              Add Family Member
            </button>
          </div>
        </section>
      </div>

      {/* Future stages sneak peek */}
      <section className="flex flex-col gap-4 pt-4">
        <h2 className="text-xl font-black text-slate-900 tracking-tight px-1">Coming Up Next</h2>
        <div className="bg-white shadow-[0_6px_32px_rgba(0,0,0,0.06)] border border-slate-200/90 rounded-3xl p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full blur-3xl pointer-events-none -mr-32 -mt-32" />

          <div className="flex flex-col md:flex-row gap-8 relative z-10">
            <button
              onClick={() => onNavigateTab("package_quote")}
              className="flex-1 flex gap-5 group text-left cursor-pointer"
            >
              <div className="w-14 h-14 bg-slate-50 rounded-2xl shadow-[0_6px_32px_rgba(0,0,0,0.06)] border border-slate-200/90 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <CreditCard className="w-6 h-6 text-slate-400 group-hover:text-[#3F4EB4] transition-colors" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 text-lg tracking-tight group-hover:text-[#3F4EB4] transition-colors">
                  Your Treatment Package
                </h3>
                <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                  Living Donor Liver Transplant — $28,500 all-inclusive. View the staged payment breakdown.
                </p>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-[#3F4EB4] mt-2">
                  View Package <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </button>

            <div className="hidden md:block w-px bg-gradient-to-b from-transparent via-slate-200 to-transparent" />

            <button
              onClick={() => onNavigateTab("visa_checklist")}
              className="flex-1 flex gap-5 group text-left cursor-pointer"
            >
              <div className="w-14 h-14 bg-slate-50 rounded-2xl shadow-[0_6px_32px_rgba(0,0,0,0.06)] border border-slate-200/90 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Plane className="w-6 h-6 text-slate-400 group-hover:text-[#2ECDC5] transition-colors" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 text-lg tracking-tight group-hover:text-[#2ECDC5] transition-colors">
                  Travel & Visa
                </h3>
                <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                  e-Medical Visa approved. Flight EK-512 booked. Driver Ramesh will meet you at Gate 5.
                </p>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-[#2ECDC5] mt-2">
                  View Travel Plans <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* Interactive Modals */}
      <VideoConsultationSDKModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        patientCase={patientCase}
      />

      {dicomModalFileName && (
        <DicomViewerModal
          isOpen={!!dicomModalFileName}
          onClose={() => setDicomModalFileName(null)}
          fileName={dicomModalFileName}
        />
      )}

      {selectedConsentToSign && (
        <ConsentSignModal
          isOpen={!!selectedConsentToSign}
          onClose={() => setSelectedConsentToSign(null)}
          caseId={patientCase.id}
          consent={selectedConsentToSign}
        />
      )}

      {/* WhatsApp / Call Modal */}
      <WhatsAppContactModal
        isOpen={isWhatsAppOpen}
        onClose={() => setIsWhatsAppOpen(false)}
        coordinatorName="Ananya Sharma"
        caseId={patientCase.id}
      />

      {/* Family Delegate Modal */}
      {familyDelegateOpen && (
        <div className="fixed inset-0 z-[120] bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden border border-slate-200">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#141d60] via-[#1b2360] to-[#101e76] p-6 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#2ECDC5]/20 text-[#2ECDC5] border border-[#2ECDC5]/40 flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base">Add Family Member</h3>
                  <div className="text-xs text-slate-300">Read-only access to your itinerary & updates</div>
                </div>
              </div>
              <button
                onClick={() => setFamilyDelegateOpen(false)}
                className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleFamilyAdd} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-extrabold text-slate-700 mb-1.5">Full Name *</label>
                <input
                  type="text"
                  value={familyName}
                  onChange={(e) => setFamilyName(e.target.value)}
                  placeholder="e.g. Faris Al-Mansoor"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#2ECDC5]/50 text-sm font-medium text-slate-800 bg-slate-50"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-extrabold text-slate-700 mb-1.5">Relationship</label>
                <input
                  type="text"
                  value={familyRelation}
                  onChange={(e) => setFamilyRelation(e.target.value)}
                  placeholder="e.g. Son, Daughter, Spouse"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#2ECDC5]/50 text-sm font-medium text-slate-800 bg-slate-50"
                />
              </div>

              <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 text-xs text-blue-700 font-medium">
                🔒 This person will have <strong>read-only</strong> access to your hotel bookings, itinerary, and doctor updates. They cannot modify anything.
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#1d8983] to-[#1baba4] text-white font-black text-sm shadow-md hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
              >
                {familyAdded ? "✓ Family Member Added!" : "Grant Read-Only Access"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
