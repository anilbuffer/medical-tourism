"use client";

import React, { useState } from "react";
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
  HeartHandshake
} from "lucide-react";
import { VideoConsultationSDKModal } from "../modals/VideoConsultationSDKModal";
import { DicomViewerModal } from "../modals/DicomViewerModal";
import { ConsentSignModal } from "../modals/ConsentSignModal";

interface OverviewTabProps {
  patientCase: PatientCase;
  onNavigateTab: (tabId: string) => void;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({ patientCase, onNavigateTab }) => {
  const { formatCurrency, uploadDocument } = usePortal();

  // Interactive Modals State
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [dicomModalFileName, setDicomModalFileName] = useState<string | null>(null);
  const [selectedConsentToSign, setSelectedConsentToSign] = useState<ConsentRecord | null>(null);

  // Tele-consultation consent status
  const teleConsentRecord = patientCase.consents.find(
    (c) => c.consentType === "tele_consultation_terms"
  );
  const isTeleConsentSigned = teleConsentRecord?.agreed;

  return (
    <div className="space-y-8 animate-in fade-in duration-300 pb-16">
      <JourneyStepper
        currentStage={patientCase.stage}
        onNavigateTab={onNavigateTab}
      />

      {/* Primary Action Banner */}
      <section>
        <div className="bg-gradient-to-r from-[#141d60] via-[#1b2360] to-[#101e76] rounded-3xl p-6 sm:p-10 text-white shadow-xl border border-slate-800 relative overflow-hidden flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#2ECDC5]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-64 h-64 bg-[#3F4EB4]/25 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-4 relative z-10 max-w-2xl">
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white flex items-center gap-3">
              <span>Video call with your doctor</span>
              <span className="inline-block w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
            </h1>

            <p className="text-lg text-slate-200 font-medium">
              You are scheduled to meet with <strong>Dr. Subhash Gupta</strong> on <strong className="text-white">Thursday, Aug 27 at 03:30 PM IST</strong>.
            </p>

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
            <button
              onClick={() => setIsVideoModalOpen(true)}
              className="w-full sm:w-auto px-8 py-5 rounded-2xl bg-[#2ECDC5] hover:bg-[#28b8b0] text-slate-950 font-black text-base flex items-center justify-center gap-3 shadow-xl shadow-[#2ECDC5]/25 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer group"
            >
              <Video className="w-6 h-6 fill-slate-950 group-hover:scale-110 transition-transform" />
              <span>Join Video Room</span>
            </button>
            <span className="text-xs text-slate-300 font-medium">
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
            <div className="bg-white p-6 rounded-3xl shadow-[0_6px_32px_rgba(0,0,0,0.06)] border border-slate-200/90 flex flex-col gap-4 hover:shadow-2xl hover:shadow-slate-200/50 transition-all h-full">
              <div className="flex justify-between items-start">
                <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 ring-1 ring-emerald-50">
                  <FileText className="w-7 h-7" />
                </div>
                <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/40" title="Received" />
              </div>
              <div className="mt-auto pt-4">
                <h3 className="font-extrabold text-slate-900 text-lg tracking-tight">MRI Scans</h3>
                <p className="text-sm text-slate-500 font-medium">Received Aug 24</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-[0_6px_32px_rgba(0,0,0,0.06)] border border-slate-200/90 flex flex-col gap-4 hover:shadow-2xl hover:shadow-slate-200/50 transition-all h-full">
              <div className="flex justify-between items-start">
                <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600 ring-1 ring-amber-50">
                  <FileText className="w-7 h-7" />
                </div>
                <div className="w-3 h-3 rounded-full bg-amber-500 animate-pulse shadow-sm shadow-amber-500/40" title="Needs Attention" />
              </div>
              <div className="mt-auto pt-4">
                <h3 className="font-extrabold text-slate-900 text-lg tracking-tight">Blood Work</h3>
                <p className="text-sm text-amber-600 font-bold">Needs another copy</p>
              </div>
            </div>
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
                className="flex-1 bg-white hover:bg-slate-50 text-slate-700 py-3 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all border border-slate-200 shadow-sm cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                Message
              </button>
              <button
                className="flex-1 bg-gradient-to-b from-[#2ECDC5] to-[#28b8b0] hover:from-[#28b8b0] hover:to-[#22a49d] text-white py-3 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-md shadow-[#2ECDC5]/20 border border-[#28b8b0] cursor-pointer"
              >
                <Phone className="w-4 h-4" />
                Call me
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Future stages sneak peek */}
      <section className="flex flex-col gap-4 pt-4">
        <h2 className="text-xl font-black text-slate-900 tracking-tight px-1">Coming Up Next</h2>
        <div className="bg-white shadow-[0_6px_32px_rgba(0,0,0,0.06)] border border-slate-200/90 rounded-3xl p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full blur-3xl pointer-events-none -mr-32 -mt-32" />

          <div className="flex flex-col md:flex-row gap-8 relative z-10">
            <div className="flex-1 flex gap-5 group">
              <div className="w-14 h-14 bg-slate-50 rounded-2xl shadow-[0_6px_32px_rgba(0,0,0,0.06)] border border-slate-200/90 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <CreditCard className="w-6 h-6 text-slate-400 group-hover:text-[#3F4EB4] transition-colors" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 text-lg tracking-tight">Your payments</h3>
                <p className="text-sm text-slate-500 mt-1 leading-relaxed">You will receive a quote and payment options after your video call.</p>
              </div>
            </div>

            <div className="hidden md:block w-px bg-gradient-to-b from-transparent via-slate-200 to-transparent" />

            <div className="flex-1 flex gap-5 group">
              <div className="w-14 h-14 bg-slate-50 rounded-2xl shadow-[0_6px_32px_rgba(0,0,0,0.06)] border border-slate-200/90 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Plane className="w-6 h-6 text-slate-400 group-hover:text-[#2ECDC5] transition-colors" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 text-lg tracking-tight">Travel Plans</h3>
                <p className="text-sm text-slate-500 mt-1 leading-relaxed">We will help you arrange visas and flights once your surgery date is secured.</p>
              </div>
            </div>
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
    </div>
  );
};
