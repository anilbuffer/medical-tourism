"use client";

import React, { useState, useRef } from "react";
import { PatientCase, ConsentRecord, PatientDocument } from "@/types/portal";
import { JourneyStepper } from "../JourneyStepper";
import { usePortal } from "@/lib/portal/store";
import {
  Video,
  FileText,
  Upload,
  Phone,
  MessageSquare,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  CreditCard,
  Plane,
  HeartHandshake,
  Users,
  ChevronRight,
  AlertCircle,
  X,
  Sparkles,
  ArrowRight,
  Clock,
  ShieldCheck,
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

export const OverviewTab: React.FC<OverviewTabProps> = ({
  patientCase,
  onNavigateTab,
  activeTab,
}) => {
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

  // Video call consent status
  const teleConsentRecord = patientCase.consents.find(
    (c) => c.consentType === "tele_consultation_terms"
  );
  const isTeleConsentSigned = teleConsentRecord?.agreed;

  // Incomplete documents that need a fix
  const incompleteDocs = patientCase.documents.filter((d) => d.status === "incomplete");
  const reviewedDocs = patientCase.documents.filter((d) => d.status === "reviewed");
  const pendingDocs = patientCase.documents.filter((d) => d.status === "pending_review");

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

  // Determine the SINGLE primary action for the "What do I need to do right now?" banner
  const getPrimaryAction = () => {
    if (!isTeleConsentSigned) {
      return {
        badge: "Action Required",
        title: "Review & sign terms for your doctor video call",
        description: "Dr. Subhash Gupta is scheduled to meet with you on Thursday at 02:00 PM GST. Please review and confirm your consent before joining the video room.",
        buttonText: "Review & Sign Terms",
        buttonAction: () => {
          setSelectedConsentToSign(
            teleConsentRecord || {
              id: "cst_tele_01",
              consentType: "tele_consultation_terms",
              title: "Video Call with Your Doctor",
              description: "Terms for cross-border medical video advisory and remote diagnostic review.",
              agreed: false,
              timestamp: "",
              ipAddress: "",
              version: "v2.0",
            }
          );
        },
        buttonIcon: FileText,
        urgency: "high",
      };
    }

    if (incompleteDocs.length > 0) {
      const firstDoc = incompleteDocs[0];
      return {
        badge: "Document Needs Attention",
        title: `Upload clear copy: ${firstDoc.title}`,
        description: firstDoc.csFeedback || "Coordinator note: Please re-upload a clear photo of this document to finalize your hospital review.",
        buttonText: "Upload Missing Copy",
        buttonAction: () => handleUploadMissing(firstDoc.id),
        buttonIcon: Upload,
        urgency: "medium",
      };
    }

    return {
      badge: "Scheduled Appointment",
      title: "Join video call with Chief Surgeon Dr. Subhash Gupta",
      description: "Thursday, Aug 27 at 02:00 PM (Dubai Time) / 03:30 PM (India Time). Your medical room is prepared and ready.",
      buttonText: "Join Video Call Room",
      buttonAction: () => setIsVideoModalOpen(true),
      buttonIcon: Video,
      urgency: "ready",
    };
  };

  const primaryAction = getPrimaryAction();

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

      {/* ========================================================================= */}
      {/* 01. SINGLE OBVIOUS BANNER: "What do I need to do right now?" (1 Clear Action) */}
      {/* ========================================================================= */}
      <section>
        <div className="bg-gradient-to-r from-[#141d60] via-[#1b2360] to-[#101e76] rounded-3xl p-6 sm:p-9 text-white shadow-xl border border-slate-800 relative overflow-hidden flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#2ECDC5]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-64 h-64 bg-[#3F4EB4]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-3.5 relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2ECDC5]/20 text-[#2ECDC5] border border-[#2ECDC5]/30 text-xs font-black uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#2ECDC5] animate-pulse" />
              <span>What do I need to do right now?</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
              {primaryAction.title}
            </h1>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
              {primaryAction.description}
            </p>

            {/* Dual Timezone Mini-Display */}
            <div className="flex flex-wrap gap-2.5 pt-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 border border-white/20 text-xs font-bold backdrop-blur-sm">
                <span className="text-[#2ECDC5]">🕐 02:00 PM GST</span>
                <span className="text-slate-300">Dubai, UAE (Your Time)</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 border border-white/20 text-xs font-bold backdrop-blur-sm">
                <span className="text-amber-300">🕞 03:30 PM IST</span>
                <span className="text-slate-300">New Delhi, India</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 shrink-0 self-stretch sm:self-auto flex flex-col items-stretch sm:items-end gap-2">
            <button
              onClick={primaryAction.buttonAction}
              className="px-8 py-4 sm:py-5 rounded-2xl bg-[#2ECDC5] hover:bg-[#28b8b0] text-slate-950 font-black text-base shadow-xl shadow-[#2ECDC5]/30 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center gap-3 cursor-pointer"
            >
              <primaryAction.buttonIcon className="w-5 h-5 fill-slate-950" />
              <span>{primaryAction.buttonText}</span>
            </button>
            <span className="text-xs text-slate-300 text-center sm:text-right font-medium">
              Takes less than 1 minute • Secured
            </span>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 02. 3 BIG PHASES STEPPER: Getting Ready → Your Trip → Recovery */}
      {/* ========================================================================= */}
      <JourneyStepper
        currentStage={patientCase.stage}
        activeTab={activeTab || "overview"}
        onNavigateTab={onNavigateTab}
      />

      {/* ========================================================================= */}
      {/* 03. MAIN 2-COLUMN VIEW: "Here's what you need to do next" + Human Care Team */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Columns: ONE Card at a time — "Here's what you need to do next" */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between px-1">
            <div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">
                Here's what you need to do next
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                One simple task at a time to keep your medical trip on track
              </p>
            </div>
          </div>

          {/* SINGLE Primary Next Action Card (High Focus, No Competing Cards) */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#141d60] to-[#1b2360] text-[#2ECDC5] flex items-center justify-center shadow-lg shadow-[#141d60]/15 shrink-0">
                  <Video className="w-7 h-7" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black uppercase tracking-wider text-[#3F4EB4]">
                      Step 1 of 3
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Confirmed Call
                    </span>
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mt-0.5 tracking-tight">
                    Video call with Dr. Subhash Gupta
                  </h3>
                  <div className="text-xs text-slate-500">
                    Chief Liver Transplant Surgeon • Medanta – The Medicity Hospital
                  </div>
                </div>
              </div>

              <div className="text-left sm:text-right text-xs bg-slate-50 sm:bg-transparent p-3 sm:p-0 rounded-xl w-full sm:w-auto">
                <div className="text-slate-400 font-bold uppercase text-[10px]">When</div>
                <div className="font-extrabold text-slate-900 text-sm">Thursday, Aug 27</div>
                <div className="text-xs text-[#3F4EB4] font-bold">02:00 PM GST (Dubai)</div>
              </div>
            </div>

            {/* Explanatory summary */}
            <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
              <p className="text-sm font-medium text-slate-800">
                You will meet Dr. Gupta online to review your MRI scans and blood tests, discuss your transplant plan, and ask any questions before traveling to India.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block font-bold">Family Welcome</strong>
                    <span className="text-slate-500 text-[11px]">Your son Faris is encouraged to join the call with you.</span>
                  </div>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block font-bold">No Special Software</strong>
                    <span className="text-slate-500 text-[11px]">Works easily inside your phone or computer browser.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100">
              <div className="text-xs text-slate-500 font-medium">
                Questions or changes? Press the call button to talk with Ananya.
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => onNavigateTab("upcoming_video")}
                  className="flex-1 sm:flex-none px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors cursor-pointer"
                >
                  View Call Details
                </button>

                <button
                  onClick={() => {
                    if (!isTeleConsentSigned) {
                      primaryAction.buttonAction();
                    } else {
                      setIsVideoModalOpen(true);
                    }
                  }}
                  className="flex-1 sm:flex-none px-6 py-3 rounded-2xl bg-gradient-to-r from-[#1d8983] via-[#1baba4] to-[#1d8983] text-white font-black text-xs shadow-md shadow-[#1d8983]/25 hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Video className="w-4 h-4" />
                  <span>{isTeleConsentSigned ? "Join Video Call" : "Sign Terms to Join"}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Clean Document Cards (Plain Language: "Received", "Verified", "Needs another copy" - No spreadsheets!) */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-lg text-slate-900 tracking-tight">
                  Your Documents & Scans
                </h3>
                <p className="text-xs text-slate-500">
                  {reviewedDocs.length} verified and ready for Dr. Gupta
                </p>
              </div>
              <button
                onClick={() => onNavigateTab("docs_vault")}
                className="text-xs font-bold text-[#3F4EB4] hover:underline cursor-pointer flex items-center gap-1"
              >
                <span>View all</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              {patientCase.documents.slice(0, 4).map((doc) => {
                const isReviewed = doc.status === "reviewed";
                const isIncomplete = doc.status === "incomplete";

                return (
                  <div
                    key={doc.id}
                    className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                      isIncomplete
                        ? "bg-amber-50/50 border-amber-300/80"
                        : "bg-slate-50/60 border-slate-200"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                            isReviewed
                              ? "bg-emerald-100 text-emerald-700"
                              : isIncomplete
                              ? "bg-amber-100 text-amber-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          <FileText className="w-4 h-4" />
                        </div>

                        {isReviewed && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            Verified
                          </span>
                        )}

                        {isIncomplete && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-200 animate-pulse">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                            Needs another copy
                          </span>
                        )}

                        {!isReviewed && !isIncomplete && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-600 border border-slate-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                            Received
                          </span>
                        )}
                      </div>

                      <div className="font-extrabold text-slate-900 text-sm">{doc.title}</div>

                      {isIncomplete && doc.csFeedback && (
                        <p className="text-[11px] text-amber-800 mt-1 italic leading-snug">
                          Note: {doc.csFeedback}
                        </p>
                      )}
                    </div>

                    {isIncomplete && (
                      <button
                        onClick={() => handleUploadMissing(doc.id)}
                        className="mt-3 w-full py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-white font-black text-xs shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <Upload className="w-3 h-3" />
                        <span>Upload Fix</span>
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Real Person Care Coordinator + Call Me Button */}
        <div className="space-y-6">
          {/* Care Coordinator Spotlight Card with Real Face & Prominent "Call Me" */}
          <div className="bg-gradient-to-b from-white to-slate-50/50 rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] flex flex-col items-center text-center space-y-4">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=250&auto=format&fit=crop&q=80"
                alt="Ananya Sharma"
                className="w-24 h-24 rounded-3xl object-cover shadow-xl ring-4 ring-[#2ECDC5]/40"
              />
              <span className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-emerald-500 ring-2 ring-white flex items-center justify-center">
                <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
              </span>
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-200 mb-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>Available Now</span>
              </div>
              <h3 className="font-black text-xl text-slate-900 tracking-tight">Ananya Sharma</h3>
              <p className="text-xs text-[#3F4EB4] font-bold mt-0.5">Your Personal Care Coordinator</p>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed px-2">
                "Don't worry if anything feels unclear. Press the call button below and I will help you right away."
              </p>
            </div>

            {/* Prominent "Call Me" & Message Action Buttons */}
            <div className="w-full space-y-2.5 pt-2">
              <a
                href="tel:+919810188412"
                className="w-full py-4 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-sm shadow-xl shadow-emerald-600/25 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2.5"
              >
                <Phone className="w-5 h-5" />
                <span>Call Ananya</span>
              </a>

              <button
                onClick={() => setIsWhatsAppOpen(true)}
                className="w-full py-3 px-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs border border-slate-200 transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span>Message on WhatsApp</span>
              </button>
            </div>
          </div>

          {/* Family Access Card */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#3F4EB4]/10 text-[#3F4EB4] flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-slate-900">Family Member Access</h4>
                <p className="text-[11px] text-slate-500">Let your family follow your journey</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Add your son or spouse so they can view your flight, hotel, and doctor updates from their phone.
            </p>

            <button
              onClick={() => setFamilyDelegateOpen(true)}
              className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Users className="w-3.5 h-3.5" />
              <span>Add Family Member</span>
            </button>
          </div>
        </div>
      </div>

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
            <div className="bg-gradient-to-r from-[#141d60] via-[#1b2360] to-[#101e76] p-6 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#2ECDC5]/20 text-[#2ECDC5] border border-[#2ECDC5]/40 flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base">Add Family Member</h3>
                  <div className="text-xs text-slate-300">View-only access to itinerary & updates</div>
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
                🔒 This person will have <strong>view-only</strong> access to hotel bookings, itinerary, and doctor updates.
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#1d8983] to-[#1baba4] text-white font-black text-sm shadow-md hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
              >
                {familyAdded ? "✓ Family Member Added!" : "Grant View-Only Access"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
